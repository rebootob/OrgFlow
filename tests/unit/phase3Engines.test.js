/**
 * OrgFlow — Phase 3 Core Business Logic Engines Unit Test Suite
 * Version: 3.0.0
 * 
 * Uses 100% Synthetic Mock Data (ZERO Production Personal Data in Test Repository).
 * Tests all required business logic, security constraints, duplicate handling, and edge cases.
 */

import assert from 'assert';
import employeeResolver, { RESOLUTION_STATUS } from '../../src/engines/employeeResolver.js';
import hierarchyBuilder from '../../src/engines/hierarchyBuilder.js';
import validationEngine, { VALIDATION_ERROR_CODES } from '../../src/engines/validationEngine.js';
import vacancyCalculator from '../../src/engines/vacancyCalculator.js';
import timeMachineEngine from '../../src/engines/timeMachineEngine.js';

console.log(`================================================`);
console.log(`ORGFLOW PHASE 3 UNIT TEST SUITE (SYNTHETIC MOCK DATA)`);
console.log(`================================================\n`);

let passedTests = 0;
let totalTests = 0;

function runTest(testName, testFn) {
    totalTests++;
    try {
        testFn();
        passedTests++;
        console.log(`  [PASS] Test #${totalTests}: ${testName}`);
    } catch (err) {
        console.error(`  [FAIL] Test #${totalTests}: ${testName}`);
        console.error(`         Reason: ${err.message}`);
    }
}

// ----------------------------------------------------
// SYNTHETIC MOCK DATA (No real employee data)
// ----------------------------------------------------
const mockEmployees = [
    { recordId: 101, codeNumber: '1001', emp_text: 'EMP-1001', nameTH: 'ทดสอบ สมชาย', nameEN: 'Test Somchai', departmentId: 'DEP-01', positionId: 'POS-01', managerRef: null, status: 'Active' },
    { recordId: 102, codeNumber: '1002', emp_text: 'EMP-1002', nameTH: 'ทดสอบ สมหญิง', nameEN: 'Test Somying', departmentId: 'DEP-01', positionId: 'POS-02', managerRef: '1001', status: 'Active' },
    { recordId: 103, codeNumber: '1003', emp_text: 'EMP-1003', nameTH: 'ทดสอบ วิชัย', nameEN: 'Test Wichai', departmentId: 'DEP-01', positionId: 'POS-03', managerRef: '1002', status: 'Active' },
    // Duplicate Number Mock Records
    { recordId: 104, codeNumber: '9999', emp_text: 'EMP-9999A', nameTH: 'ทดสอบ ซ้ำA', nameEN: 'Test DupA', departmentId: 'DEP-02', positionId: 'POS-04', managerRef: null, status: 'Active' },
    { recordId: 105, codeNumber: '9999', emp_text: 'EMP-9999B', nameTH: 'ทดสอบ ซ้ำB', nameEN: 'Test DupB', departmentId: 'DEP-02', positionId: 'POS-04', managerRef: null, status: 'Active' }
];

const mockPositions = [
    { positionId: 'POS-01', title: 'Department Manager', departmentId: 'DEP-01', headcountQuota: 1 },
    { positionId: 'POS-02', title: 'Assistant Manager', departmentId: 'DEP-01', headcountQuota: 2 },
    { positionId: 'POS-03', title: 'Senior Engineer', departmentId: 'DEP-01', headcountQuota: 1 },
    { positionId: 'POS-04', title: 'Contractor', departmentId: 'DEP-02', headcountQuota: 1 }
];

const mockAssignments = [
    { assignmentId: 'ASG-01', employeeRef: '1001', effectiveStartDate: '2020-01-01', effectiveEndDate: '2022-12-31', deptId: 'DEP-01', posId: 'POS-02' },
    { assignmentId: 'ASG-02', employeeRef: '1001', effectiveStartDate: '2023-01-01', effectiveEndDate: null, deptId: 'DEP-01', posId: 'POS-01' },
    { assignmentId: 'ASG-03', employeeRef: '1002', effectiveStartDate: '2026-06-01', effectiveEndDate: null, deptId: 'DEP-02', posId: 'POS-01' }
];

// ----------------------------------------------------
// TEST CASES
// ----------------------------------------------------

console.log(`\n--- 1. Employee Resolver Tests ---`);

runTest('Single Normal Employee Resolution (MATCHED)', () => {
    const res = employeeResolver.resolveEmployee('1001', mockEmployees);
    assert.strictEqual(res.status, RESOLUTION_STATUS.MATCHED);
    assert.strictEqual(res.employee.recordId, 101);
    assert.strictEqual(res.internalId, 'ORG-APP53-101');
});

runTest('Missing Employee Resolution (NOT_FOUND)', () => {
    const res = employeeResolver.resolveEmployee('999000', mockEmployees);
    assert.strictEqual(res.status, RESOLUTION_STATUS.NOT_FOUND);
    assert.strictEqual(res.employee, null);
});

runTest('Missing/Empty Number Resolution (NOT_FOUND)', () => {
    const res = employeeResolver.resolveEmployee('', mockEmployees);
    assert.strictEqual(res.status, RESOLUTION_STATUS.NOT_FOUND);
    assert.strictEqual(res.code, 'EMPTY_REFERENCE_KEY');
});

runTest('Duplicate Number Security Resolution (AMBIGUOUS - Zero Automatic Guessing)', () => {
    const res = employeeResolver.resolveEmployee('9999', mockEmployees);
    assert.strictEqual(res.status, RESOLUTION_STATUS.AMBIGUOUS);
    assert.strictEqual(res.code, 'AMBIGUOUS_EMPLOYEE_REFERENCE');
    assert.strictEqual(res.employee, null); // Must NOT return first or last record!
    assert.strictEqual(res.matchCount, 2);
});

console.log(`\n--- 2. Hierarchy Builder & Tree Tests ---`);

runTest('O(N) Reporting Tree Construction', () => {
    const tree = hierarchyBuilder.buildReportingTree(mockEmployees, mockAssignments);
    assert.strictEqual(tree.rootCount, 1); // 1001 is root
    assert.strictEqual(tree.roots[0].employeeRef, '1001');
    assert.strictEqual(tree.roots[0].directReportCount, 1); // 1002 reports to 1001
});

console.log(`\n--- 3. Validation Engine Tests ---`);

runTest('Self-Manager Reporting Detection', () => {
    const badData = [
        { recordId: 201, codeNumber: '2001', managerRef: '2001', nameTH: 'Self Report' }
    ];
    const report = validationEngine.validateIntegrity(badData, []);
    assert.strictEqual(report.isValid, false);
    assert.strictEqual(report.errors[0].code, VALIDATION_ERROR_CODES.SELF_REPORTING);
});

runTest('DFS Circular Reporting Line Detection', () => {
    const cycleData = [
        { recordId: 301, codeNumber: '3001', managerRef: '3002' },
        { recordId: 302, codeNumber: '3002', managerRef: '3003' },
        { recordId: 303, codeNumber: '3003', managerRef: '3001' } // Cycle 3001 -> 3002 -> 3003 -> 3001
    ];
    const report = validationEngine.validateIntegrity(cycleData, []);
    assert.strictEqual(report.isValid, false);
    const cycleErr = report.errors.find(e => e.code === VALIDATION_ERROR_CODES.CIRCULAR_REPORTING);
    assert.notStrictEqual(cycleErr, undefined);
});

runTest('Missing Manager Warning Detection', () => {
    const missingMgrData = [
        { recordId: 401, codeNumber: '4001', managerRef: '999999' }
    ];
    const report = validationEngine.validateIntegrity(missingMgrData, []);
    assert.strictEqual(report.warningCount, 1);
    assert.strictEqual(report.warnings[0].code, VALIDATION_ERROR_CODES.MISSING_MANAGER);
});

runTest('Overlapping Effective Dates Assignment Detection', () => {
    const overlapAssignments = [
        { assignmentId: 'ASG-10', employeeRef: '1003', effectiveStartDate: '2024-01-01', effectiveEndDate: '2024-12-31' },
        { assignmentId: 'ASG-11', employeeRef: '1003', effectiveStartDate: '2024-06-01', effectiveEndDate: '2025-06-30' }
    ];
    const report = validationEngine.validateIntegrity(mockEmployees, overlapAssignments);
    const overlapErr = report.errors.find(e => e.code === VALIDATION_ERROR_CODES.OVERLAPPING_ASSIGNMENT);
    assert.notStrictEqual(overlapErr, undefined);
    assert.strictEqual(overlapErr.employeeRef, '1003');
});

console.log(`\n--- 4. Vacancy & Headcount Calculator Tests ---`);

runTest('Headcount Quota vs Vacancy vs Over-Capacity Calculation', () => {
    const res = vacancyCalculator.calculateVacancy(mockPositions, mockEmployees);
    assert.strictEqual(res.summary.totalApprovedQuota, 5); // 1 + 2 + 1 + 1
    assert.strictEqual(res.summary.totalFilledHeadcount, 5);
    
    // Check over capacity position POS-04 (Filled=2, Quota=1)
    const pos4 = res.positions.find(p => p.positionId === 'POS-04');
    assert.strictEqual(pos4.status, 'OVER_CAPACITY');
    assert.strictEqual(pos4.overCapacityCount, 1);
});

console.log(`\n--- 5. Time Machine Effective Date Engine Tests ---`);

runTest('Historical Date Query (Year 2021)', () => {
    const active2021 = timeMachineEngine.getAssignmentsForDate(mockAssignments, '2021-06-01');
    assert.strictEqual(active2021.length, 1);
    assert.strictEqual(active2021[0].assignmentId, 'ASG-01');
});

runTest('Current vs Historical vs Future Assignment Categorization', () => {
    const cat = timeMachineEngine.categorizeAssignments(mockAssignments, new Date('2024-03-01'));
    assert.strictEqual(cat.historicalCount, 1); // ASG-01 ended in 2022
    assert.strictEqual(cat.currentCount, 1);    // ASG-02 starts in 2023
    assert.strictEqual(cat.futureCount, 1);     // ASG-03 starts in 2026
});

console.log(`\n================================================`);
console.log(`TEST SUITE RESULTS: ${passedTests}/${totalTests} TESTS PASSED`);
console.log(`================================================\n`);

if (passedTests !== totalTests) {
    process.exit(1);
}
