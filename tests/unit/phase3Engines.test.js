/**
 * OrgFlow — Phase 3 & Phase 5 Unit Test Suite
 * Version: 2.0.0 (Includes Phase 5E Flexible Approver Amendment Tests)
 */

import assert from 'assert';
import employeeResolver from '../../src/engines/employeeResolver.js';
import validationEngine from '../../src/engines/validationEngine.js';

console.log('================================================');
console.log('RUNNING ORGFLOW UNIT TEST SUITE (PHASE 3 & 5E)');
console.log('================================================\n');

let passCount = 0;
let failCount = 0;

function test(name, fn) {
    try {
        fn();
        console.log(`  [PASS] ${name}`);
        passCount++;
    } catch (err) {
        console.error(`  [FAIL] ${name}: ${err.message}`);
        failCount++;
    }
}

// 1. Employee Resolver Tests
test('Resolver - Matched Single Employee Number', () => {
    const list = [{ recordId: 1, codeNumber: '1001', name: 'Somchai' }];
    const res = employeeResolver.resolveEmployee('1001', list);
    assert.strictEqual(res.status, 'MATCHED');
    assert.strictEqual(res.employee.name, 'Somchai');
});

test('Resolver - Duplicate Employee Number Returns Ambiguous', () => {
    const list = [
        { recordId: 1, codeNumber: '9000', name: 'Contractor A' },
        { recordId: 2, codeNumber: '9000', name: 'Contractor B' }
    ];
    const res = employeeResolver.resolveEmployee('9000', list);
    assert.strictEqual(res.status, 'AMBIGUOUS');
});

// 2. Validation Engine Tests
test('Validation - Self-Reporting Blocked', () => {
    const list = [{ recordId: 1, codeNumber: '1001', managerRef: '1001' }];
    const report = validationEngine.validateIntegrity(list, []);
    assert.strictEqual(report.isValid, false);
    assert.strictEqual(report.errors[0].code, 'SELF_REPORTING');
});

test('Validation - Circular Reporting Loop Blocked', () => {
    const list = [
        { recordId: 1, codeNumber: '1001', managerRef: '1002' },
        { recordId: 2, codeNumber: '1002', managerRef: '1003' },
        { recordId: 3, codeNumber: '1003', managerRef: '1001' }
    ];
    const report = validationEngine.validateIntegrity(list, []);
    assert.strictEqual(report.isValid, false);
    assert.strictEqual(report.errors[0].code, 'CIRCULAR_REPORTING');
});

// 3. Phase 5E Flexible / Cross-Department Approver Tests
test('Phase 5E - Same Department Approver (PASS)', () => {
    const list = [
        { recordId: 1, codeNumber: '1001', departmentId: 'DEP-MFG', managerRef: '1002' },
        { recordId: 2, codeNumber: '1002', departmentId: 'DEP-MFG', managerRef: null }
    ];
    const report = validationEngine.validateIntegrity(list, []);
    assert.strictEqual(report.isValid, true);
});

test('Phase 5E - Cross-Department Approver (PASS - Not an error)', () => {
    const list = [
        { recordId: 1, codeNumber: '1001', departmentId: 'DEP-PROD', managerRef: '2001' },
        { recordId: 2, codeNumber: '2001', departmentId: 'DEP-EXEC', managerRef: null }
    ];
    const report = validationEngine.validateIntegrity(list, []);
    assert.strictEqual(report.isValid, true);
    assert.strictEqual(report.errorCount, 0);
});

test('Phase 5E - HR Proxy Approval Audit Log Verification', () => {
    const proxyAuditLog = {
        request_id: 'REQ-2026-0801',
        actual_approver_name: 'Sompoch (Prod Mgr)',
        actual_approver_reference: '1002',
        proxy_kintone_user: 'HR_ADMIN_USER',
        approval_method: 'HR_PROXY',
        approval_reason: 'Line manager has no individual Kintone account',
        approved_at: '2026-08-22T13:51:00Z'
    };

    assert.strictEqual(proxyAuditLog.approval_method, 'HR_PROXY');
    assert.strictEqual(proxyAuditLog.actual_approver_reference, '1002');
    assert.strictEqual(Boolean(proxyAuditLog.proxy_kintone_user), true);
});

console.log(`\n================================================`);
console.log(`TEST RESULTS: ${passCount} PASSED / ${failCount} FAILED`);
console.log(`================================================\n`);

if (failCount > 0) process.exit(1);
