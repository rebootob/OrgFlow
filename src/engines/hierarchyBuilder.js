/**
 * OrgFlow — Hierarchy Builder Engine
 * Version: 3.0.0
 * 
 * Constructs O(N) Hash Map tree structures for Organization Charts and Manager-Subordinate reporting lines.
 * Detects orphan nodes, unassigned staff, and multiple organization depth levels.
 */

import employeeResolver, { RESOLUTION_STATUS } from './employeeResolver.js';

export class HierarchyBuilder {
    /**
     * Builds a complete Manager-Subordinate Hierarchy Tree from employee & assignment data.
     * 
     * @param {Array<Object>} employeeList List of normalized employee records
     * @param {Array<Object>} assignmentList List of current/historical assignment records
     * @returns {Object} Tree structure with root nodes, orphans, and metrics
     */
    buildReportingTree(employeeList = [], assignmentList = []) {
        const nodeMap = new Map();
        const rootNodes = [];
        const orphanNodes = [];
        const ambiguousNodes = [];

        // Step 1: Create Node Entries in O(N)
        employeeList.forEach(emp => {
            const res = employeeResolver.resolveEmployee(emp.codeNumber, employeeList);

            if (res.status === RESOLUTION_STATUS.AMBIGUOUS) {
                ambiguousNodes.push({
                    recordId: emp.recordId,
                    employeeRef: emp.codeNumber,
                    name: emp.nameTH || emp.nameEN,
                    reason: 'AMBIGUOUS_EMPLOYEE_REFERENCE'
                });
                return;
            }

            const internalId = res.internalId || `ORG-APP53-${emp.recordId}`;
            nodeMap.set(internalId, {
                internalId,
                employeeRef: emp.codeNumber,
                empText: emp.emp_text,
                nameTH: emp.nameTH,
                nameEN: emp.nameEN,
                department: emp.departmentId,
                position: emp.positionId,
                managerRef: emp.managerRef || null,
                managerInternalId: null,
                subordinates: [],
                directReportCount: 0,
                totalReportCount: 0,
                level: 0,
                isOrphan: false
            });
        });

        // Step 2: Link Manager & Subordinates in O(N)
        nodeMap.forEach(node => {
            if (!node.managerRef) {
                // No manager assigned -> Root Candidate
                node.level = 1;
                rootNodes.push(node);
            } else {
                const managerRes = employeeResolver.resolveEmployee(node.managerRef, employeeList);
                if (managerRes.status === RESOLUTION_STATUS.MATCHED && nodeMap.has(managerRes.internalId)) {
                    const managerNode = nodeMap.get(managerRes.internalId);
                    node.managerInternalId = managerRes.internalId;
                    managerNode.subordinates.push(node);
                    managerNode.directReportCount++;
                } else {
                    // Manager reference not found -> Orphan Node
                    node.isOrphan = true;
                    node.level = 1;
                    orphanNodes.push(node);
                }
            }
        });

        // Step 3: Compute Total Subordinate Counts and Depth Levels recursively
        const computeSubordinateMetrics = (node, currentDepth) => {
            node.level = currentDepth;
            let total = node.subordinates.length;

            node.subordinates.forEach(sub => {
                total += computeSubordinateMetrics(sub, currentDepth + 1);
            });

            node.totalReportCount = total;
            return total;
        };

        rootNodes.forEach(root => computeSubordinateMetrics(root, 1));
        orphanNodes.forEach(orphan => computeSubordinateMetrics(orphan, 1));

        return {
            totalNodes: nodeMap.size,
            rootCount: rootNodes.length,
            orphanCount: orphanNodes.length,
            ambiguousCount: ambiguousNodes.length,
            roots: rootNodes,
            orphans: orphanNodes,
            ambiguous: ambiguousNodes
        };
    }
}

export const hierarchyBuilder = new HierarchyBuilder();
export default hierarchyBuilder;
