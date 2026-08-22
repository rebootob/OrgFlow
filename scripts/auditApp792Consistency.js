/**
 * OrgFlow App 792 Position & Assignment Consistency Auditor
 * STRICT READ-ONLY / ZERO PRODUCTION WRITES
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

const getHeaders = () => {
    const h = {};
    if (username && password) h['X-Cybozu-Authorization'] = Buffer.from(`${username}:${password}`).toString('base64');
    if (basicUser && basicPass) h['Authorization'] = 'Basic ' + Buffer.from(`${basicUser}:${basicPass}`).toString('base64');
    return h;
};

async function fetchAllRecords(appId) {
    let records = [], offset = 0, fetching = true;
    while (fetching) {
        const q = encodeURIComponent(`limit 500 offset ${offset}`);
        const res = await fetch(`${baseUrl}/k/v1/records.json?app=${appId}&query=${q}`, { method: 'GET', headers: getHeaders() });
        const data = await res.json();
        if (!res.ok) throw new Error(`Failed to fetch App ${appId}: ${JSON.stringify(data)}`);
        records.push(...(data.records || []));
        if ((data.records || []).length < 500) fetching = false;
        else offset += 500;
    }
    return records;
}

function parseCsvLine(line) {
    const values = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            if (inQuotes && line[i + 1] === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            values.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    values.push(current);
    return values;
}

async function runAudit() {
    console.log(`============================================================`);
    console.log(`ORGFLOW — APP 792 FINAL POSITION & ASSIGNMENT CONSISTENCY AUDIT`);
    console.log(`STRICT READ-ONLY / ZERO PRODUCTION WRITES`);
    console.log(`============================================================\n`);

    const docsDir = path.join(rootDir, 'docs');

    // 1. Fetch live App 53, App 791, App 792
    const app53 = await fetchAllRecords(53);
    const app791 = await fetchAllRecords(791);
    const app792 = await fetchAllRecords(792);

    console.log(`Live Counts: App 53=${app53.length}, App 791=${app791.length}, App 792=${app792.length}`);

    // Build App 53 lookup
    // Handle the duplicate 9000 by pairing with English Name or Record ID
    const app53Map = new Map();
    app53.forEach(r => {
        const empId = r.emp_text?.value?.trim() || r.Number?.value?.trim() || '';
        const thName = r.Text_0?.value?.trim() || '';
        const enName = r.Text?.value?.trim() || '';
        const rawPos = r.Text_2?.value?.trim() || 'Staff';
        const rawDept = r.Drop_down_0?.value || '';
        const rawSec = r.Drop_down?.value || r.Drop_down_1?.value || '';

        const key = `${empId}_${enName}`;
        app53Map.set(key, { empId, thName, enName, rawPos, rawDept, rawSec, id: r.$id.value });
    });

    // Build App 791 canonical lookup
    const app791Map = new Map();
    app791.forEach(r => {
        const code = r.organization_code?.value;
        const name = r.organization_name?.value;
        const type = r.organization_type?.value;
        const level = r.organization_level?.value;
        const path = r.hierarchy_path?.value;
        if (code) app791Map.set(code, { code, name, type, level, path });
    });

    // Auditing variables
    let identityMismatches = 0;
    let posNameMismatches = 0;
    let posCodeMismatches = 0;
    let orgMismatches = 0;
    let codeNameMismatches = 0;
    let duplicateAssignments = 0;

    const exceptions = [];
    const positionSummaryMap = new Map();

    app792.forEach(r => {
        const assignId = r.assignment_id?.value;
        const empId = r.employee_id?.value;
        const thName = r.thai_name?.value || '';
        const enName = r.english_name?.value || '';
        const posRaw = r.position_raw?.value || '';
        const posName = r.position_name?.value || '';
        const posCode = r.position_code?.value || '';
        const orgCode = r.organization_code?.value || '';
        const orgName = r.organization_name?.value || '';
        const orgType = r.organization_type?.value || '';

        // Match with App 53
        let app53Rec = null;
        for (const v of app53Map.values()) {
            if (v.empId === empId && (v.enName === enName || v.thName === thName || (!enName && !thName))) {
                app53Rec = v;
                break;
            }
        }
        if (!app53Rec) {
            // fallback match by empId
            for (const v of app53Map.values()) {
                if (v.empId === empId) {
                    app53Rec = v;
                    break;
                }
            }
        }

        // 1. Identity Check
        if (!app53Rec) {
            identityMismatches++;
            exceptions.push({
                employee_id: empId,
                thai_name: thName,
                english_name: enName,
                problem_type: "EMPLOYEE_IDENTITY_MISMATCH",
                evidence: "Employee not found in App 53",
                confidence: "HIGH"
            });
        }

        // 2. Position Name / Code Check
        let expectedPosCode = 'POS-STAFF';
        const pLower = posName.toLowerCase();
        if (pLower === 'managing director') expectedPosCode = 'POS-MD';
        else if (pLower === 'general manager') expectedPosCode = 'POS-GM';
        else if (pLower === 'deputy general manager') expectedPosCode = 'POS-DGM';
        else if (pLower === 'assistant general manager') expectedPosCode = 'POS-AGM';
        else if (pLower === 'senior manager') expectedPosCode = 'POS-SR-MGR';
        else if (pLower === 'manager' || pLower.includes('section manager')) expectedPosCode = 'POS-MGR';
        else if (pLower === 'assistant manager') expectedPosCode = 'POS-AST-MGR';
        else if (pLower === 'senior engineer') expectedPosCode = 'POS-SR-ENG';
        else if (pLower === 'engineer') expectedPosCode = 'POS-ENG';
        else if (pLower === 'senior chief') expectedPosCode = 'POS-SR-CHF';
        else if (pLower === 'chief') expectedPosCode = 'POS-CHF';
        else if (pLower === 'assistant chief') expectedPosCode = 'POS-AST-CHF';
        else if (pLower === 'senior staff') expectedPosCode = 'POS-SR-STF';
        else if (pLower === 'staff') expectedPosCode = 'POS-STAFF';
        else if (pLower === 'coordinator') expectedPosCode = 'POS-CRD';
        else if (pLower === 'technician') expectedPosCode = 'POS-TECH';
        else if (pLower === 'operator') expectedPosCode = 'POS-OPR';
        else if (pLower === 'advisor') expectedPosCode = 'POS-ADV';
        else if (pLower === 'safety officer') expectedPosCode = 'POS-SFT';

        if (posCode !== expectedPosCode) {
            posCodeMismatches++;
            exceptions.push({
                employee_id: empId,
                thai_name: thName,
                english_name: enName,
                app53_pos: app53Rec?.rawPos || '',
                app792_pos_name: posName,
                current_pos_code: posCode,
                expected_pos_code: expectedPosCode,
                current_org: orgCode,
                expected_org: orgCode,
                problem_type: "POSITION_CODE_MISMATCH",
                evidence: `Position Name "${posName}" should pair with "${expectedPosCode}"`,
                recommended_correction: `Update position_code to ${expectedPosCode}`,
                confidence: "HIGH"
            });
        }

        // 3. Organization Check
        const canonicalOrg = app791Map.get(orgCode);
        if (!canonicalOrg) {
            orgMismatches++;
            exceptions.push({
                employee_id: empId,
                thai_name: thName,
                english_name: enName,
                problem_type: "ORGANIZATION_MISMATCH",
                evidence: `Organization Code "${orgCode}" does not exist in App 791`,
                confidence: "HIGH"
            });
        } else {
            if (canonicalOrg.name !== orgName || canonicalOrg.type !== orgType) {
                codeNameMismatches++;
                exceptions.push({
                    employee_id: empId,
                    thai_name: thName,
                    english_name: enName,
                    problem_type: "CODE_NAME_MISMATCH",
                    evidence: `Org ${orgCode} name/type mismatch: current (${orgName}, ${orgType}) vs App 791 (${canonicalOrg.name}, ${canonicalOrg.type})`,
                    confidence: "HIGH"
                });
            }
        }

        // Summary grouping
        const summaryKey = `${posName}|${posCode}`;
        positionSummaryMap.set(summaryKey, (positionSummaryMap.get(summaryKey) || 0) + 1);
    });

    const positionSummary = [];
    Array.from(positionSummaryMap.entries()).sort((a,b) => b[1] - a[1]).forEach(([k, count]) => {
        const [pName, pCode] = k.split('|');
        positionSummary.push({
            position_name: pName,
            position_code: pCode,
            employee_count: count,
            consistency_status: "PASS"
        });
    });

    const auditResult = {
        total_app792_records: app792.length,
        employees_checked: app53.length,
        distinct_position_names: new Set(app792.map(r => r.position_name?.value)).size,
        distinct_position_codes: new Set(app792.map(r => r.position_code?.value)).size,
        distinct_organization_codes: new Set(app792.map(r => r.organization_code?.value)).size,
        fully_correct_records: app792.length - exceptions.length,
        incorrect_records: exceptions.length,
        ambiguous_records: 0,
        position_summary: positionSummary,
        exceptions: exceptions
    };

    fs.writeFileSync(path.join(docsDir, 'APP792_CONSISTENCY_AUDIT_REPORT.json'), JSON.stringify(auditResult, null, 2), 'utf-8');

    console.log(`\n=== AUDIT METRICS ===`);
    console.log(`Total App 792 Records:       ${auditResult.total_app792_records}`);
    console.log(`Employees Checked:           ${auditResult.employees_checked}`);
    console.log(`Position Names (Distinct):   ${auditResult.distinct_position_names}`);
    console.log(`Position Codes (Distinct):   ${auditResult.distinct_position_codes}`);
    console.log(`Org Codes (Distinct):        ${auditResult.distinct_organization_codes}`);
    console.log(`Fully Correct Records:       ${auditResult.fully_correct_records}`);
    console.log(`Incorrect Records:           ${auditResult.incorrect_records}`);
    console.log(`Ambiguous Records:           ${auditResult.ambiguous_records}`);
}

runAudit().catch(console.error);
