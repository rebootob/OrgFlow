/**
 * OrgFlow — Before / After Simulation Engine
 * Performs in-memory impact analysis of proposed organizational changes.
 * 100% READ-ONLY / ZERO PRODUCTION WRITES.
 */

export class SimulationEngine {
    constructor(dataStore) {
        this.dataStore = dataStore;
    }

    /**
     * Simulates proposed organizational changes against the active baseline.
     * @param {Object} currentAssignment Current App 792 record
     * @param {Object} proposedDelta Proposed values { proposed_position_code, proposed_position_name, proposed_organization_code, proposed_organization_name, proposed_assignment_type, effective_date }
     * @returns {Object} Simulation analysis and comparative delta
     */
    simulateImpact(currentAssignment, proposedDelta) {
        if (!currentAssignment || !proposedDelta) {
            return { valid: false, errors: ['Missing assignment or proposed parameters'] };
        }

        const employeeId = currentAssignment.employee_id;
        const currentOrgCode = currentAssignment.organization_code;
        const proposedOrgCode = proposedDelta.proposed_organization_code;
        const currentPosCode = currentAssignment.position_code;
        const proposedPosCode = proposedDelta.proposed_position_code;

        // Verify proposed organization exists in App 791
        const proposedOrg = this.dataStore.getOrgByCode(proposedOrgCode);
        const currentOrg = this.dataStore.getOrgByCode(currentOrgCode);
        const orgValidation = !!proposedOrg;

        // Verify proposed position is recognized
        const posValidation = !!(proposedDelta.proposed_position_code && proposedDelta.proposed_position_name);

        const warnings = [];
        const errors = [];

        if (!orgValidation) {
            errors.push(`Proposed Organization Code "${proposedOrgCode}" does not exist in App 791 Canonical Master.`);
        }

        if (!posValidation) {
            errors.push('Proposed Position Code and Title must be specified.');
        }

        // Circular Reporting Check (if proposed manager specified)
        if (proposedDelta.proposed_manager_id) {
            if (proposedDelta.proposed_manager_id === employeeId) {
                errors.push('Employee cannot be assigned as their own manager (Circular reporting violation).');
            }
        }

        // Check if change is identical (No-op)
        const isIdentical = (currentOrgCode === proposedOrgCode && currentPosCode === proposedPosCode && currentAssignment.assignment_type === proposedDelta.proposed_assignment_type);
        if (isIdentical) {
            warnings.push('Proposed assignment is identical to current active assignment.');
        }

        // Calculate Headcount Impacts
        const sourceOrgStats = this.dataStore.getOrgHeadcount(currentOrgCode);
        const targetOrgStats = proposedOrgCode !== currentOrgCode ? this.dataStore.getOrgHeadcount(proposedOrgCode) : sourceOrgStats;

        const isTransfer = currentOrgCode !== proposedOrgCode;

        const headcountImpact = {
            sourceOrg: {
                code: currentOrgCode,
                name: currentAssignment.organization_name,
                before: sourceOrgStats.directHeadcount,
                after: isTransfer ? Math.max(0, sourceOrgStats.directHeadcount - 1) : sourceOrgStats.directHeadcount,
                delta: isTransfer ? -1 : 0
            },
            targetOrg: {
                code: proposedOrgCode,
                name: proposedOrg ? proposedOrg.organization_name : proposedDelta.proposed_organization_name,
                before: targetOrgStats.directHeadcount,
                after: isTransfer ? targetOrgStats.directHeadcount + 1 : targetOrgStats.directHeadcount,
                delta: isTransfer ? +1 : 0
            }
        };

        // Construct Side-by-Side BEFORE vs AFTER Models
        const beforeState = {
            employee_id: employeeId,
            english_name: currentAssignment.english_name,
            thai_name: currentAssignment.thai_name,
            position_code: currentAssignment.position_code,
            position_name: currentAssignment.position_name,
            organization_code: currentAssignment.organization_code,
            organization_name: currentAssignment.organization_name,
            organization_type: currentAssignment.organization_type,
            assignment_type: currentAssignment.assignment_type || 'PRIMARY',
            assignment_status: 'CURRENT',
            effective_start_date: currentAssignment.effective_start_date
        };

        const afterState = {
            employee_id: employeeId,
            english_name: currentAssignment.english_name,
            thai_name: currentAssignment.thai_name,
            position_code: proposedDelta.proposed_position_code,
            position_name: proposedDelta.proposed_position_name,
            organization_code: proposedDelta.proposed_organization_code,
            organization_name: proposedOrg ? proposedOrg.organization_name : proposedDelta.proposed_organization_name,
            organization_type: proposedOrg ? proposedOrg.organization_type : proposedDelta.proposed_organization_type,
            assignment_type: proposedDelta.proposed_assignment_type || 'PRIMARY',
            assignment_status: 'CURRENT (PROPOSED)',
            effective_start_date: proposedDelta.effective_date
        };

        const changedFields = [];
        if (beforeState.position_code !== afterState.position_code) changedFields.push('position_code');
        if (beforeState.position_name !== afterState.position_name) changedFields.push('position_name');
        if (beforeState.organization_code !== afterState.organization_code) changedFields.push('organization_code');
        if (beforeState.organization_name !== afterState.organization_name) changedFields.push('organization_name');
        if (beforeState.assignment_type !== afterState.assignment_type) changedFields.push('assignment_type');

        return {
            valid: errors.length === 0,
            errors,
            warnings,
            isTransfer,
            changedFields,
            headcountImpact,
            beforeState,
            afterState,
            simulatedTimestamp: new Date().toISOString()
        };
    }
}

export default SimulationEngine;
