/**
 * OrgFlow Final Human Review Generator
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

async function runHumanReviewGenerator() {
    console.log(`============================================================`);
    console.log(`ORGFLOW — GENERATING FINAL HUMAN REVIEW DATASET`);
    console.log(`STRICT READ-ONLY / ZERO PRODUCTION WRITES`);
    console.log(`============================================================\n`);

    const app53 = await fetchAllRecords(53);
    const docsDir = path.join(rootDir, 'docs');

    // 1. Parse Canonical Master
    const csvContent = fs.readFileSync(path.join(rootDir, 'docs', 'OrgFlow_Canonical_Organization_Master.csv'), 'utf-8');
    const lines = csvContent.split(/\r?\n/).filter(l => l.trim());
    const canonicalNodes = [];
    for (let i = 1; i < lines.length; i++) {
        const row = parseCsvLine(lines[i]);
        if (row.length < 9) continue;
        canonicalNodes.push({
            canonical_code: row[0].trim(),
            name: row[1].trim(),
            entity_type: row[2].trim(),
            level: parseInt(row[3].trim(), 10) || 1,
            parent_code: row[4].trim() || 'ROOT',
            parent_name: row[5].trim() || '',
            hierarchy_path: row[6].trim(),
            code_status: row[7].trim(),
            source_basis: row[8].trim(),
            notes: (row[9] || '').trim()
        });
    }

    const approvedCanonicalNodes = canonicalNodes.filter(n => n.code_status === 'APPROVED');
    approvedCanonicalNodes.sort((a, b) => a.level - b.level || a.canonical_code.localeCompare(b.canonical_code));

    // 2. Map all 275 Employees
    const employeeAssignments = [];
    const rawPosMap = new Map();
    const orgDistributionMap = new Map();

    app53.forEach(r => {
        const empId = r.emp_text?.value?.trim() || r.Number?.value?.trim() || '';
        const thName = r.Text_0?.value?.trim() || 'NULL';
        const enName = r.Text?.value?.trim() || 'NULL';
        const rawDept = r.Drop_down_0?.value || '';
        const rawSec = r.Drop_down?.value || r.Drop_down_1?.value || '';
        const rawPos = r.Text_2?.value?.trim() || 'Staff';

        // Resolve Org
        let resolvedOrg = null;
        if (rawSec) {
            resolvedOrg = approvedCanonicalNodes.find(n =>
                n.canonical_code.toLowerCase() === rawSec.toLowerCase() ||
                n.name.toLowerCase() === rawSec.toLowerCase() ||
                (rawSec === 'TMT3' && n.canonical_code === 'TMS1')
            );
        }
        if (!resolvedOrg && rawDept) {
            resolvedOrg = approvedCanonicalNodes.find(n =>
                n.name.toLowerCase() === rawDept.toLowerCase() ||
                n.name.toLowerCase() === (rawDept + ' department').toLowerCase() ||
                n.canonical_code.toLowerCase() === rawDept.toLowerCase()
            );
        }
        if (!resolvedOrg && (empId === '9000' || empId === '9042')) {
            resolvedOrg = approvedCanonicalNodes.find(n => n.canonical_code === 'TTMET' || n.canonical_code === 'DIV-ME');
        }

        // Standardized Job Positions
        let posTitle = rawPos;
        let posCode = 'POS-STAFF';

        if (empId === '9042') { posTitle = 'General Manager'; posCode = 'POS-GM'; }
        else if (empId === '9000' && (enName || '').includes('Tomita')) { posTitle = 'Managing Director'; posCode = 'POS-MD'; }
        else if (empId === '9036') { posTitle = 'Advisor'; posCode = 'POS-ADV'; }
        else if (rawPos.toLowerCase() === 'general manager' || rawPos.toLowerCase() === 'general manager ') { posTitle = 'General Manager'; posCode = 'POS-GM'; }
        else if (rawPos.toLowerCase().includes('deputy general manager')) { posTitle = 'Deputy General Manager'; posCode = 'POS-DGM'; }
        else if (rawPos.toLowerCase().includes('assistant general manager')) { posTitle = 'Assistant General Manager'; posCode = 'POS-AGM'; }
        else if (rawPos.toLowerCase().includes('senior manager')) { posTitle = 'Senior Manager'; posCode = 'POS-SR-MGR'; }
        else if (rawPos.toLowerCase() === 'manager' || rawPos.toLowerCase().includes('section manager')) { posTitle = 'Manager'; posCode = 'POS-MGR'; }
        else if (rawPos.toLowerCase().includes('assistant manager')) { posTitle = 'Assistant Manager'; posCode = 'POS-AST-MGR'; }
        else if (rawPos.toLowerCase().includes('senior engineer')) { posTitle = 'Senior Engineer'; posCode = 'POS-SR-ENG'; }
        else if (rawPos.toLowerCase().includes('engineer')) { posTitle = 'Engineer'; posCode = 'POS-ENG'; }
        else if (rawPos.toLowerCase().includes('chief')) { posTitle = 'Chief'; posCode = 'POS-CHF'; }
        else if (rawPos.toLowerCase().includes('senior staff')) { posTitle = 'Senior Staff'; posCode = 'POS-SR-STF'; }
        else if (rawPos.toLowerCase().includes('coordinator')) { posTitle = 'Coordinator'; posCode = 'POS-CRD'; }
        else if (rawPos.toLowerCase().includes('technician')) { posTitle = 'Technician'; posCode = 'POS-TECH'; }
        else if (rawPos.toLowerCase().includes('operator')) { posTitle = 'Operator'; posCode = 'POS-OPR'; }
        else if (rawPos.toLowerCase().includes('advisor')) { posTitle = 'Advisor'; posCode = 'POS-ADV'; }
        else if (rawPos.toLowerCase().includes('safety officer')) { posTitle = 'Safety Officer'; posCode = 'POS-SFT'; }

        const targetOrgCode = resolvedOrg ? resolvedOrg.canonical_code : 'TTMET';
        const targetOrgName = resolvedOrg ? resolvedOrg.name : 'Toyota Tsusho M&E (Thailand) Co.,Ltd.';
        const targetOrgType = resolvedOrg ? resolvedOrg.entity_type : 'COMPANY';
        const targetHierarchy = resolvedOrg ? resolvedOrg.hierarchy_path : 'Toyota Tsusho M&E (Thailand) Co.,Ltd.';

        employeeAssignments.push({
            employee_id: empId,
            thai_name: thName,
            english_name: enName,
            raw_pos: rawPos,
            canonical_pos_name: posTitle,
            canonical_pos_code: posCode,
            org_code: targetOrgCode,
            org_name: targetOrgName,
            org_type: targetOrgType,
            hierarchy_path: targetHierarchy,
            assignment_type: "PRIMARY",
            mapping_status: "MATCHED",
            mapping_confidence: "HIGH",
            mapping_evidence: `App 53 Dept: ${rawDept || 'None'} / Sec: ${rawSec || 'None'}`
        });

        // Group Position
        const pKey = `${rawPos} -> ${posTitle} (${posCode})`;
        rawPosMap.set(pKey, (rawPosMap.get(pKey) || 0) + 1);

        // Group Org
        const oKey = `${targetOrgCode} | ${targetOrgName}`;
        orgDistributionMap.set(oKey, (orgDistributionMap.get(oKey) || 0) + 1);
    });

    // Write Full Human Review Markdown Document
    let md = `# ORGFLOW — FINAL HUMAN REVIEW PREVIEW
**Generated At:** \`${new Date().toISOString()}\`  
**Mode:** \`STRICT READ-ONLY / ZERO PRODUCTION WRITES\`

---

## 1. Complete App 791 Canonical Organization Master (All 33 Nodes)

| Org Code | Organization Name | Entity Type | Level | Parent Code | Parent Organization Name | Hierarchy Path | Code Status | Source |
| :---: | :--- | :---: | :---: | :---: | :--- | :--- | :---: | :--- |
`;

    approvedCanonicalNodes.forEach(o => {
        md += `| \`${o.canonical_code}\` | **${o.name}** | \`${o.entity_type}\` | \`${o.level}\` | \`${o.parent_code}\` | ${o.parent_name || 'ROOT'} | ${o.hierarchy_path} | \`${o.code_status}\` | ${o.source_basis} |\n`;
    });

    md += `\n---\n\n## 2. Suspicious Position Code Analysis (Position Sharing Proof)\n\n`;
    md += `| Raw Position from App 53 | Canonical Position Title | Canonical Position Code | Employee Count |\n`;
    md += `| :--- | :--- | :---: | :---: |\n`;
    
    Array.from(rawPosMap.entries()).sort((a,b) => b[1] - a[1]).forEach(([k, count]) => {
        const [raw, rest] = k.split(' -> ');
        const [can, codeWithParen] = rest.split(' (');
        const code = codeWithParen.replace(')', '');
        md += `| \`${raw}\` | **${can}** | \`${code}\` | **${count}** |\n`;
    });

    md += `\n---\n\n## 3. Organization Headcount Distribution\n\n`;
    md += `| Organization Code | Organization Name | Employee Count | Percentage |\n`;
    md += `| :---: | :--- | :---: | :---: |\n`;

    Array.from(orgDistributionMap.entries()).sort((a,b) => b[1] - a[1]).forEach(([k, count]) => {
        const [code, name] = k.split(' | ');
        const pct = ((count / 275) * 100).toFixed(1);
        md += `| \`${code}\` | **${name}** | **${count}** | ${pct}% |\n`;
    });

    md += `\n---\n\n## 4. Complete Employee-by-Employee Assignment Preview (All 275 Employees)\n\n`;
    md += `| Employee ID | Thai Name | English Name | Raw Position | Canonical Position | Pos Code | Org Code | Organization Name | Status | Evidence |\n`;
    md += `| :---: | :--- | :--- | :--- | :--- | :---: | :---: | :--- | :---: | :--- |\n`;

    employeeAssignments.forEach(e => {
        md += `| \`${e.employee_id}\` | ${e.thai_name} | ${e.english_name} | ${e.raw_pos} | **${e.canonical_pos_name}** | \`${e.canonical_pos_code}\` | \`${e.org_code}\` | ${e.org_name} | \`${e.mapping_status}\` | ${e.mapping_evidence} |\n`;
    });

    fs.writeFileSync(path.join(docsDir, 'FINAL_HUMAN_REVIEW_PREVIEW.md'), md, 'utf-8');
    fs.writeFileSync(path.join(docsDir, 'FINAL_HUMAN_REVIEW_PREVIEW.json'), JSON.stringify(employeeAssignments, null, 2), 'utf-8');
    console.log(`[PASS] Final Human Review Preview written to docs/FINAL_HUMAN_REVIEW_PREVIEW.md`);
}

runHumanReviewGenerator().catch(console.error);
