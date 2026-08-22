/**
 * OrgFlow — Validation & Integrity Engine
 * Version: 3.0.0
 * 
 * Performs DFS circular dependency detection, self-manager reporting check,
 * missing parent detector, overlapping effective date assignment check, and ambiguous reference validation.
 */

import employeeResolver, { RESOLUTION_STATUS } from './employeeResolver.js';

export const VALIDATION_ERROR_CODES = {
    CIRCULAR_REPORTING: 'CIRCULAR_REPORTING',
    SELF_REPORTING: 'SELF_REPORTING',
    MISSING_MANAGER: 'MISSING_MANAGER',
    AMBIGUOUS_REFERENCE: 'AMBIGUOUS_REFERENCE',
    OVERLAPPING_ASSIGNMENT: 'OVERLAPPING_ASSIGNMENT',
    INVALID_ASSIGNMENT: 'INVALID_ASSIGNMENT'
};

export class ValidationEngine {
    /**
     * Validates employee hierarchy and assignment data integrity.
     * 
     * @param {Array<Object>} employeeList Normalized employee list
     * @param {Array<Object>} assignmentList Assignment history log
     * @returns {Object} Validation report with errors and warning lists
     */
    validateIntegrity(employeeList = [], assignmentList = []) {
        const errors = [];
        const warnings = [];

        // 1. Ambiguous Reference Check
        employeeList.forEach(emp => {
            const res = employeeResolver.resolveEmployee(emp.codeNumber, employeeList);
            if (res.status === RESOLUTION_STATUS.AMBIGUOUS) {
                errors.push({
                    code: VALIDATION_ERROR_CODES.AMBIGUOUS_REFERENCE,
                    recordId: emp.recordId,
                    employeeRef: emp.codeNumber,
                    message: `Ambiguous employee reference '${emp.codeNumber}' matched multiple records.`
                });
            }
        });

        // 2. Self-Manager & Missing Manager Check
        employeeList.forEach(emp => {
            if (emp.managerRef) {
                const empRef = String(emp.codeNumber).trim();
                const mgrRef = String(emp.managerRef).trim();

                // Self-reporting
                if (empRef === mgrRef) {
                    errors.push({
                        code: VALIDATION_ERROR_CODES.SELF_REPORTING,
                        recordId: emp.recordId,
                        employeeRef: empRef,
                        message: `Employee '${empRef}' cannot be assigned as their own manager.`
                    });
                } else {
                    // Check if manager exists
                    const mgrRes = employeeResolver.resolveEmployee(mgrRef, employeeList);
                    if (mgrRes.status === RESOLUTION_STATUS.NOT_FOUND) {
                        warnings.push({
                            code: VALIDATION_ERROR_CODES.MISSING_MANAGER,
                            recordId: emp.recordId,
                            employeeRef: empRef,
                            managerRef: mgrRef,
                            message: `Manager reference '${mgrRef}' not found for employee '${empRef}'.`
                        });
                    }
                }
            }
        });

        // 3. DFS Circular Reporting Detection
        const visited = new Set();
        const recursionStack = new Set();

        const dfsCheckCycle = (empRef, currentPath = []) => {
            const res = employeeResolver.resolveEmployee(empRef, employeeList);
            if (res.status !== RESOLUTION_STATUS.MATCHED) return;

            const internalId = res.internalId;
            if (recursionStack.has(internalId)) {
                // Cycle detected!
                const cyclePath = [...currentPath, empRef];
                errors.push({
                    code: VALIDATION_ERROR_CODES.CIRCULAR_REPORTING,
                    cyclePath,
                    message: `Circular reporting line detected: ${cyclePath.join(' -> ')}`
                });
                return;
            }

            if (visited.has(internalId)) return;

            visited.add(internalId);
            recursionStack.add(internalId);

            const emp = res.employee;
            if (emp.managerRef) {
                dfsCheckCycle(emp.managerRef, [...currentPath, empRef]);
            }

            recursionStack.delete(internalId);
        };

        employeeList.forEach(emp => {
            if (emp.codeNumber) {
                dfsCheckCycle(emp.codeNumber, []);
            }
        });

        // 4. Overlapping Assignment Check
        const empAssignments = new Map();
        assignmentList.forEach(asg => {
            const empRef = String(asg.employeeRef || '').trim();
            if (!empRef) return;

            if (!empAssignments.has(empRef)) empAssignments.set(empRef, []);
            empAssignments.get(empRef).push(asg);
        });

        empAssignments.forEach((asgList, empRef) => {
            for (let i = 0; i < asgList.length; i++) {
                for (let j = i + 1; j < asgList.length; j++) {
                    const a1 = asgList[i];
                    const a2 = asgList[j];

                    const start1 = new Date(a1.effectiveStartDate).getTime();
                    const end1 = a1.effectiveEndDate ? new Date(a1.effectiveEndDate).getTime() : Infinity;

                    const start2 = new Date(a2.effectiveStartDate).getTime();
                    const end2 = a2.effectiveEndDate ? new Date(a2.effectiveEndDate).getTime() : Infinity;

                    if (start1 < end2 && start2 < end1) {
                        errors.push({
                            code: VALIDATION_ERROR_CODES.OVERLAPPING_ASSIGNMENT,
                            employeeRef: empRef,
                            assignmentId1: a1.assignmentId,
                            assignmentId2: a2.assignmentId,
                            message: `Overlapping assignment dates detected for employee '${empRef}'.`
                        });
                    }
                }
            }
        });

        return {
            isValid: errors.length === 0,
            errorCount: errors.length,
            warningCount: warnings.length,
            errors,
            warnings
        };
    }
}

export const validationEngine = new ValidationEngine();
export default validationEngine;
