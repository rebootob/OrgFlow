/**
 * OrgFlow — Employee Identity Resolution Engine
 * Version: 3.0.0
 * 
 * Enforces strict identity resolution for ORGFLOW_EMPLOYEE_REFERENCE_KEY (Number).
 * Strictly forbids automatic fallback, guessing from name/emp_text, or selecting first/last records on ambiguous matches.
 */

export const RESOLUTION_STATUS = {
    MATCHED: 'MATCHED',
    NOT_FOUND: 'NOT_FOUND',
    AMBIGUOUS: 'AMBIGUOUS'
};

export class EmployeeResolver {
    /**
     * Resolves an employee identity by external reference key (Number).
     * 
     * @param {String|Number} employeeRef External Reference Key (Number)
     * @param {Array<Object>} employeeList List of normalized employee objects
     * @returns {Object} Resolution Result
     */
    resolveEmployee(employeeRef, employeeList = []) {
        if (employeeRef === null || employeeRef === undefined || String(employeeRef).trim() === '') {
            return {
                status: RESOLUTION_STATUS.NOT_FOUND,
                code: 'EMPTY_REFERENCE_KEY',
                employeeRef: null,
                employee: null,
                internalId: null
            };
        }

        const targetRef = String(employeeRef).trim();

        // Search for exact matches on Field Code 'Number' (codeNumber / Number)
        const matches = employeeList.filter(emp => {
            const numVal = emp.codeNumber !== undefined && emp.codeNumber !== null ? String(emp.codeNumber).trim() : '';
            return numVal === targetRef;
        });

        // 0 Matches = NOT_FOUND
        if (matches.length === 0) {
            return {
                status: RESOLUTION_STATUS.NOT_FOUND,
                code: 'EMPLOYEE_NOT_FOUND',
                employeeRef: targetRef,
                employee: null,
                internalId: null
            };
        }

        // 1 Match = MATCHED
        if (matches.length === 1) {
            const emp = matches[0];
            const internalId = emp.internalId || `ORG-APP53-${emp.recordId || 'REC'}`;
            return {
                status: RESOLUTION_STATUS.MATCHED,
                code: 'RESOLVED_SINGLE_MATCH',
                employeeRef: targetRef,
                employee: {
                    ...emp,
                    internalId
                },
                internalId
            };
        }

        // > 1 Match = AMBIGUOUS (Strict Governance Rule: DO NOT GUESS OR SELECT FIRST/LAST RECORD)
        return {
            status: RESOLUTION_STATUS.AMBIGUOUS,
            code: 'AMBIGUOUS_EMPLOYEE_REFERENCE',
            employeeRef: targetRef,
            employee: null,
            internalId: null,
            matchCount: matches.length,
            ambiguousRecordIds: matches.map(m => m.recordId),
            message: `[SECURITY SECURITY ALERT] Reference '${targetRef}' matched ${matches.length} records. Business transaction blocked until explicit resolution.`
        };
    }
}

export const employeeResolver = new EmployeeResolver();
export default employeeResolver;
