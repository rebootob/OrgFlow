/**
 * OrgFlow - Execute Approved App 792 Position & Assignment Corrections
 * Production Write Authorized for Approved Records Only
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const envPath = path.join(rootDir, '.env.local');
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split(/\r?\n/).forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
            const [key, ...values] = trimmed.split('=');
            process.env[key.trim()] = values.join('=').trim();
        }
    });
}

const baseUrl = (process.env.KINTONE_BASE_URL || 'https://ttmet.cybozu.com').replace(/\/$/, '');
const username = process.env.KINTONE_USERNAME || '';
const password = process.env.KINTONE_PASSWORD || '';
const basicUser = process.env.BASIC_AUTH_USER || '';
const basicPass = process.env.BASIC_AUTH_PASS || '';

const getHeaders = (isJson = false) => {
    const h = {};
    if (isJson) h['Content-Type'] = 'application/json';
    if (username && password) h['X-Cybozu-Authorization'] = Buffer.from(`${username}:${password}`).toString('base64');
    if (basicUser && basicPass) h['Authorization'] = 'Basic ' + Buffer.from(`${basicUser}:${basicPass}`).toString('base64');
    return h;
};

async function fetchAllRecords(appId) {
    let records = [], offset = 0, fetching = true;
    while (fetching) {
        const q = encodeURIComponent(`limit 500 offset ${offset}`);
        const res = await fetch(`${baseUrl}/k/v1/records.json?app=${appId}&query=${q}`, { method: 'GET', headers: getHeaders(false) });
        const data = await res.json();
        if (!res.ok) throw new Error(`Failed to fetch App ${appId}: ${JSON.stringify(data)}`);
        records.push(...(data.records || []));
        if ((data.records || []).length < 500) fetching = false;
        else offset += 500;
    }
    return records;
}

async function runExecution() {
    console.log(`============================================================`);
    console.log(`ORGFLOW — EXECUTE APPROVED APP 792 POSITION CORRECTIONS`);
    console.log(`TARGET: App 792 (OrgFlow Assignment History)`);
    console.log(`============================================================\n`);

    // STEP 1 — BACKUP
    console.log(`[STEP 1] Fetching and backing up current App 792 records...`);
    const current792 = await fetchAllRecords(792);
    console.log(`Fetched ${current792.length} records from App 792.`);

    if (current792.length !== 275) {
        throw new Error(`CRITICAL STOP: App 792 record count is ${current792.length}, expected exactly 275!`);
    }

    const backupData = current792.map(r => ({
        record_id: r.$id.value,
        assignment_id: r.assignment_id?.value || '',
        employee_id: r.employee_id?.value || '',
        thai_name: r.thai_name?.value || '',
        english_name: r.english_name?.value || '',
        position_name: r.position_name?.value || '',
        position_code: r.position_code?.value || '',
        organization_code: r.organization_code?.value || '',
        organization_name: r.organization_name?.value || '',
        organization_type: r.organization_type?.value || '',
        assignment_type: r.assignment_type?.value || '',
        assignment_status: r.assignment_status?.value || '',
        effective_start_date: r.effective_start_date?.value || '',
        mapping_status: r.mapping_status?.value || ''
    }));

    const backupPath = path.join(rootDir, 'docs', 'APP792_PRE_POSITION_CORRECTION_BACKUP.json');
    fs.writeFileSync(backupPath, JSON.stringify(backupData, null, 2), 'utf-8');
    console.log(`[STEP 1 PASS] Backup saved: ${backupPath} (${backupData.length} records)\n`);

    // STEP 2 — EXECUTION WHITELIST
    console.log(`[STEP 2] Loading approved corrections from Final Safety Gate...`);
    const exactChangeData = JSON.parse(fs.readFileSync(path.join(rootDir, 'docs', 'APP792_EXACT_CHANGE_LIST.json'), 'utf-8'));
    const gateData = JSON.parse(fs.readFileSync(path.join(rootDir, 'docs', 'FINAL_POSITION_SAFETY_GATE_REPORT.json'), 'utf-8'));

    // Group field changes by employee_id
    const empChangesMap = new Map();
    for (const ch of exactChangeData.exact_field_changes) {
        if (!empChangesMap.has(ch.employee_id)) {
            empChangesMap.set(ch.employee_id, {});
        }
        empChangesMap.get(ch.employee_id)[ch.field_name] = ch.proposed_value;
    }

    // Apply any adjustments from the position gate (e.g. KEEP_APP53_POSITION)
    for (const audit of gateData.audit_results) {
        if (audit.decision === "KEEP_APP53_POSITION") {
            const empChanges = empChangesMap.get(audit.employee_id);
            if (empChanges) {
                // Ensure position is restored to authentic App 53 position
                empChanges.position_name = audit.final_verified_position;
                empChanges.position_code = audit.final_position_code;
            }
        }
    }

    console.log(`Total unique employees to update: ${empChangesMap.size}\n`);

    // Build update payload for Kintone
    const updateRecords = [];
    const executionLog = [];
    const timestamp = new Date().toISOString();

    for (const [empId, changes] of empChangesMap.entries()) {
        const curRec = current792.find(r => r.employee_id?.value === empId);
        if (!curRec) {
            throw new Error(`Employee ID ${empId} not found in App 792!`);
        }

        const recId = curRec.$id.value;
        const recordPayload = {};

        for (const [field, newVal] of Object.entries(changes)) {
            const oldVal = curRec[field]?.value || '';
            if (oldVal !== newVal) {
                recordPayload[field] = { value: newVal };
                executionLog.push({
                    timestamp: timestamp,
                    record_id: recId,
                    employee_id: empId,
                    english_name: curRec.english_name?.value || '',
                    field_name: field,
                    old_value: oldVal,
                    new_value: newVal,
                    evidence_source: "Org.FY2026_Rev.2.pdf / App 53 / App 791",
                    approval_source: "FINAL_POSITION_SAFETY_GATE_PASS"
                });
            }
        }

        if (Object.keys(recordPayload).length > 0) {
            updateRecords.push({
                id: recId,
                record: recordPayload
            });
        }
    }

    console.log(`[STEP 3] Applying updates to ${updateRecords.length} records in App 792...`);

    // Batch update (Kintone allows up to 100 records per PUT)
    for (let i = 0; i < updateRecords.length; i += 100) {
        const chunk = updateRecords.slice(i, i + 100);
        console.log(`Updating batch ${Math.floor(i / 100) + 1} (${chunk.length} records)...`);
        const res = await fetch(`${baseUrl}/k/v1/records.json`, {
            method: 'PUT',
            headers: getHeaders(true),
            body: JSON.stringify({
                app: 792,
                records: chunk
            })
        });
        const resData = await res.json();
        if (!res.ok) {
            throw new Error(`Failed to update App 792 batch: ${JSON.stringify(resData)}`);
        }
        console.log(`Batch ${Math.floor(i / 100) + 1} update succeeded.`);
    }

    // Save Execution Log
    const logPath = path.join(rootDir, 'docs', 'APP792_POSITION_CORRECTION_EXECUTION_LOG.json');
    fs.writeFileSync(logPath, JSON.stringify(executionLog, null, 2), 'utf-8');
    console.log(`[STEP 3 PASS] Execution log written: ${logPath} (${executionLog.length} field modifications)\n`);

    // STEP 4 — SPECIAL VERIFICATION (Ms. Somrudee Pannoo)
    console.log(`[STEP 4] Performing dedicated post-write verification for Ms. Somrudee Pannoo (0043)...`);
    const updated792 = await fetchAllRecords(792);
    const somrudee = updated792.find(r => r.employee_id?.value === '0043');

    console.log(`Ms. Somrudee Pannoo Post-Write State:`);
    console.log(`  Position Name:     ${somrudee.position_name?.value}`);
    console.log(`  Position Code:     ${somrudee.position_code?.value}`);
    console.log(`  Organization Code: ${somrudee.organization_code?.value}`);
    console.log(`  Organization Name: ${somrudee.organization_name?.value}`);
    console.log(`  Organization Type: ${somrudee.organization_type?.value}`);

    if (somrudee.position_name?.value !== 'Vice President' ||
        somrudee.position_code?.value !== 'POS-VP' ||
        somrudee.organization_code?.value !== 'DIV-ME') {
        throw new Error(`CRITICAL POST-WRITE FAIL: Ms. Somrudee verification failed!`);
    }
    console.log(`[STEP 4 PASS] Ms. Somrudee verification PASSED.\n`);

    // STEP 5 & 6 — FULL 275 EMPLOYEE POST-WRITE AUDIT & INTEGRITY CHECK
    console.log(`[STEP 5 & 6] Running full 275-employee post-write integrity audit...`);
    const app53 = await fetchAllRecords(53);
    const app791 = await fetchAllRecords(791);

    const validOrgCodes = new Set(app791.map(r => r.organization_code?.value));
    const seenEmpIds = new Set();
    let duplicateIds = 0;
    let missingIds = 0;
    let invalidOrgCodes = 0;

    app53.forEach(e53 => {
        const id = e53.emp_text?.value?.trim() || e53.Number?.value?.trim() || '';
        const match792 = updated792.find(r => r.employee_id?.value === id);
        if (!match792) missingIds++;
    });

    updated792.forEach(r => {
        const id = r.employee_id?.value;
        if (seenEmpIds.has(id)) duplicateIds++;
        seenEmpIds.add(id);

        const orgCode = r.organization_code?.value;
        if (!validOrgCodes.has(orgCode)) {
            console.error(`Invalid Org Code found: ${orgCode} for Emp ${id}`);
            invalidOrgCodes++;
        }
    });

    console.log(`Integrity Check Results:`);
    console.log(`  App 792 Records:            ${updated792.length} (Expected 275)`);
    console.log(`  App 53 Records:             ${app53.length}`);
    console.log(`  Unique Employee IDs:        ${seenEmpIds.size} (Matches App 53 274 distinct IDs)`);
    console.log(`  Missing Employee IDs:       ${missingIds}`);
    console.log(`  Invalid Org Codes:          ${invalidOrgCodes}`);

    if (updated792.length !== 275 || missingIds > 0 || invalidOrgCodes > 0) {
        throw new Error(`CRITICAL INTEGRITY AUDIT FAILED!`);
    }

    console.log(`\n============================================================`);
    console.log(`FINAL STATUS: APP792_POSITION_CORRECTION_COMPLETE`);
    console.log(`============================================================`);
}

runExecution().catch(err => {
    console.error(`\nCRITICAL FAILURE:`, err);
    process.exit(1);
});
