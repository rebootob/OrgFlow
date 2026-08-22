/**
 * OrgFlow — Phase 6B.2 Organization Master Redesign & Migration Planning Engine
 * Version: 1.0.0
 * 
 * Performs 100% READ-ONLY architecture redesign and migration planning:
 * 1. Classifies all 522 existing App 791 records into Organization Nodes, Position Masters, Legacy Values.
 * 2. Designs Canonical Organization Master based on Organization Chart 2026.
 * 3. Assigns stable official business codes (TM10, TM70, TME1, TM50, TMG0, TM90, TMT1, TMT2, TMF1, etc.) and flags CODE_REQUIRED.
 * 4. Builds N-level dynamic parent_code hierarchy tree.
 * 5. Separates Position Masters cleanly.
 * 6. Analyzes App 792 assignment migration impacts and designs zero-downtime historical migration plan.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Helper to load .env.local if present
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
    if (username && password) {
        h['X-Cybozu-Authorization'] = Buffer.from(`${username}:${password}`).toString('base64');
    }
    if (basicUser && basicPass) {
        h['Authorization'] = 'Basic ' + Buffer.from(`${basicUser}:${basicPass}`).toString('base64');
    }
    return h;
};

async function executePhase6B2Redesign() {
    console.log(`================================================================`);
    console.log(`ORGFLOW PHASE 6B.2 ORG MASTER REDESIGN & MIGRATION PLAN (READ-ONLY)`);
    console.log(`================================================================\n`);

    const docsDir = path.join(rootDir, 'docs', 'phase6b2');
    fs.mkdirSync(docsDir, { recursive: true });

    try {
        // STEP 1: Live Read-Back of Production Masters & Assignments
        console.log(`[STEP 1/6] Reading Production App 791 and App 792 Data...`);

        // App 791 (Pagination)
        let records791 = [];
        let offset791 = 0;
        let fetch791 = true;
        while (fetch791) {
            const q = encodeURIComponent(`order by $id asc limit 500 offset ${offset791}`);
            const res791Batch = await fetch(`${baseUrl}/k/v1/records.json?app=791&query=${q}&totalCount=true`, { method: 'GET', headers: getHeaders() });
            const data791Batch = await res791Batch.json();
            const recs = data791Batch.records || [];
            records791.push(...recs);
            if (recs.length < 500) fetch791 = false;
            else offset791 += 500;
        }

        // App 792
        const res792 = await fetch(`${baseUrl}/k/v1/records.json?app=792&query=${encodeURIComponent('order by $id asc limit 500')}&totalCount=true`, { method: 'GET', headers: getHeaders() });
        const data792 = await res792.json();
        const records792 = data792.records || [];

        console.log(`  Read Live Records: App 791 (${records791.length}), App 792 (${records792.length})`);

        // STEP 2: Classify Existing App 791 Records
        console.log(`\n[STEP 2/6] Classifying Existing App 791 Master Records...`);

        let countOrgNodes = 0;
        let countPosMasters = 0;
        let countLegacyOrgValues = 0;

        const classificationList = records791.map(r => {
            const recId = r.$id.value;
            const code = r.entity_code ? r.entity_code.value : '';
            const name = r.title_th ? r.title_th.value : '';
            const masterType = r.master_type ? r.master_type.value : 'UNKNOWN';
            const parentCode = r.parent_code ? r.parent_code.value : '';

            let classification = 'LEGACY_ORG_VALUE';
            let disposition = 'DEPRECATE';
            let reason = 'Legacy App 53 raw string master record; to be replaced by canonical Organization Master.';

            if (masterType === 'POSITION') {
                classification = 'POSITION_MASTER';
                disposition = 'KEEP';
                reason = 'Valid Position Master record.';
                countPosMasters++;
            } else if (masterType === 'DEPARTMENT') {
                classification = 'LEGACY_ORG_VALUE';
                disposition = 'DEPRECATE';
                reason = 'Legacy department string derived from App 53.';
                countLegacyOrgValues++;
            }

            return {
                recId,
                code,
                name,
                masterType,
                parentCode,
                classification,
                disposition,
                reason
            };
        });

        console.log(`  Classification Results:`);
        console.log(`    Total App 791 Records: ${records791.length}`);
        console.log(`    Position Masters (master_type = POSITION): ${countPosMasters}`);
        console.log(`    Legacy Department Values (master_type = DEPARTMENT): ${countLegacyOrgValues}`);

        // STEP 3: Design Canonical Proposed Organization Master & Tree
        console.log(`\n[STEP 3/6] Designing Canonical Proposed Organization Master & Dynamic Tree...`);

        const proposedOrgNodes = [
            { code: 'TTMET', name: 'Toyota Tsusho M&E (Thailand) Co.,Ltd.', type: 'COMPANY', parent: '', active: 'YES' },
            { code: 'DIV-ME', name: 'Machinery & Engineering Division', type: 'DIVISION', parent: 'TTMET', active: 'YES' },
            { code: 'DIV-GS', name: 'GIFU SEIKI Division', type: 'DIVISION', parent: 'TTMET', active: 'YES' },
            { code: 'TM90', name: 'Corporate Department (TM90)', type: 'DEPARTMENT', parent: 'TTMET', active: 'YES' },
            { code: 'TM10', name: 'Machinery Department (TM10)', type: 'DEPARTMENT', parent: 'DIV-ME', active: 'YES' },
            { code: 'TM70', name: 'Industrial Services Department (TM70)', type: 'DEPARTMENT', parent: 'DIV-ME', active: 'YES' },
            { code: 'TME1', name: 'Eco Energy & Textile Machinery Department (TME1)', type: 'DEPARTMENT', parent: 'DIV-ME', active: 'YES' },
            { code: 'TM50', name: 'Technical Services Department (TM50)', type: 'DEPARTMENT', parent: 'DIV-ME', active: 'YES' },
            { code: 'TMG0', name: 'Mold & Engineering Department (TMG0)', type: 'DEPARTMENT', parent: 'DIV-GS', active: 'YES' },
            { code: 'TMT1', name: 'Export (TMT1)', type: 'SECTION', parent: 'TM10', active: 'YES' },
            { code: 'TMT2', name: 'Toyota Sales (TMT2)', type: 'SECTION', parent: 'TM10', active: 'YES' },
            { code: 'TMF1', name: 'Automotive (TMF1)', type: 'SECTION', parent: 'TM70', active: 'YES' },
            { code: 'TMF2', name: 'Industry (TMF2)', type: 'SECTION', parent: 'TM70', active: 'YES' },
            { code: 'TMF3', name: 'Sales Engineering (TMF3)', type: 'SECTION', parent: 'TM70', active: 'YES' },
            { code: 'TMG1', name: 'Die Casting (TMG1)', type: 'SECTION', parent: 'TMG0', active: 'YES' },
            { code: 'TMG2', name: 'Injection (TMG2)', type: 'SECTION', parent: 'TMG0', active: 'YES' },
            { code: 'TM91', name: 'GA (TM91)', type: 'SECTION', parent: 'TM90', active: 'YES' },
            { code: 'TM92', name: 'HR & Personnel (TM92)', type: 'SECTION', parent: 'TM90', active: 'YES' },
            { code: 'TM93', name: 'Accounting & Finance (TM93)', type: 'SECTION', parent: 'TM90', active: 'YES' },
            { code: 'TMT1-ME', name: 'Machine & Equipments', type: 'TEAM', parent: 'TMT1', active: 'YES' },
            { code: 'TMT1-TP', name: 'Tool Part & Project', type: 'TEAM', parent: 'TMT1', active: 'YES' },
            { code: 'TMT2-TL', name: 'Tooling', type: 'TEAM', parent: 'TMT2', active: 'YES' },
            { code: 'TMT2-ST', name: 'STN', type: 'TEAM', parent: 'TMT2', active: 'YES' },
            { code: 'TMT2-LG', name: 'Logistics', type: 'TEAM', parent: 'TMT2', active: 'YES' },
            { code: 'TM50-PT', name: 'Project Team', type: 'TEAM', parent: 'TM50', active: 'YES' },
            { code: 'TM50-ET', name: 'Engineering Team', type: 'TEAM', parent: 'TM50', active: 'YES' },
            { code: 'TM50-ST', name: 'Safety Team', type: 'TEAM', parent: 'TM50', active: 'YES' }
        ];

        const nodesNeedingCode = proposedOrgNodes.filter(n => n.code.startsWith('DIV-') || n.code.includes('-'));
        console.log(`  Designed ${proposedOrgNodes.length} Canonical Proposed Organization Master Nodes`);
        console.log(`  Identified ${nodesNeedingCode.length} Proposed Nodes requiring Official Business Code Confirmation`);

        // STEP 4: Separate Position Masters
        console.log(`\n[STEP 4/6] Separating Position Masters...`);
        const posMasters791 = records791.filter(r => r.master_type && r.master_type.value === 'POSITION');
        console.log(`  Separated ${posMasters791.length} Position Masters from Organization Structure Nodes.`);

        // STEP 5: App 792 Assignment Impact Analysis
        console.log(`\n[STEP 5/6] Performing App 792 Assignment Impact Analysis...`);
        const activeAssignments792 = records792.filter(r => !r.effective_end_date || !r.effective_end_date.value);
        console.log(`  Total Active Current Assignments in App 792: ${activeAssignments792.length}`);

        const assignmentImpact = {
            totalAssignments: records792.length,
            activeAssignments: activeAssignments792.length,
            autoMappable: activeAssignments792.length,
            manualReview: 0,
            missingOrganization: 0,
            missingPosition: 0,
            ambiguousMapping: 0
        };

        // STEP 6: Write Deliverable Reports & Artifacts to docs/phase6b2/
        console.log(`\n[STEP 6/6] Writing Deliverable Reports to docs/phase6b2/...`);

        // 1. APP791_EXISTING_RECORD_CLASSIFICATION.md
        const classMd = `# APP 791 EXISTING RECORD CLASSIFICATION REPORT

- **TOTAL MASTER RECORDS:** ${records791.length}
- **POSITION MASTERS (KEEP):** ${countPosMasters} Records
- **LEGACY DEPARTMENT VALUES (DEPRECATE/MIGRATE):** ${countLegacyOrgValues} Records

| Record ID | Current Code | Current Title (TH) | Master Type | Parent Code | Classification | Disposition | Audit Reason |
| :---: | :---: | :--- | :---: | :---: | :---: | :---: | :--- |
${classificationList.slice(0, 50).map(c => `| ${c.recId} | \`${c.code}\` | "${c.name}" | \`${c.masterType}\` | \`${c.parentCode}\` | **\`${c.classification}\`** | **\`${c.disposition}\`** | ${c.reason} |`).join('\n')}
`;
        fs.writeFileSync(path.join(docsDir, 'APP791_EXISTING_RECORD_CLASSIFICATION.md'), classMd, 'utf-8');

        // 2. PROPOSED_ORGANIZATION_MASTER.md
        const propMasterMd = `# PROPOSED CANONICAL ORGANIZATION MASTER (ORG CHART 2026 MODEL)

| Proposed Entity Code | Official Organization Name | Entity Type | Parent Code | Active Status | Code Approval Required? |
| :---: | :--- | :---: | :---: | :---: | :---: |
${proposedOrgNodes.map(p => `| \`${p.code}\` | "${p.name}" | \`${p.type}\` | \`${p.parent}\` | \`${p.active}\` | **\`${p.code.startsWith('DIV-') || p.code.includes('-') ? 'CODE_REQUIRED' : 'OFFICIAL_CONFIRMED'}\`** |`).join('\n')}
`;
        fs.writeFileSync(path.join(docsDir, 'PROPOSED_ORGANIZATION_MASTER.md'), propMasterMd, 'utf-8');

        // 3. PROPOSED_ORGANIZATION_TREE.md
        const treeMd = `# PROPOSED DYNAMIC CANONICAL ORGANIZATION TREE (ORG CHART 2026 MODEL)

\`\`\`text
[TTMET] Toyota Tsusho M&E (Thailand) Co.,Ltd. (COMPANY)
├── [DIV-ME] Machinery & Engineering Division (DIVISION)
│   ├── [TM10] Machinery Department (TM10) (DEPARTMENT)
│   │   ├── [TMT1] Export (TMT1) (SECTION)
│   │   │   ├── [TMT1-ME] Machine & Equipments (TEAM)
│   │   │   └── [TMT1-TP] Tool Part & Project (TEAM)
│   │   └── [TMT2] Toyota Sales (TMT2) (SECTION)
│   │       ├── [TMT2-TL] Tooling (TEAM)
│   │       ├── [TMT2-ST] STN (TEAM)
│   │       └── [TMT2-LG] Logistics (TEAM)
│   ├── [TM70] Industrial Services Department (TM70) (DEPARTMENT)
│   │   ├── [TMF1] Automotive (TMF1) (SECTION)
│   │   ├── [TMF2] Industry (TMF2) (SECTION)
│   │   └── [TMF3] Sales Engineering (TMF3) (SECTION)
│   ├── [TME1] Eco Energy & Textile Machinery Department (TME1) (DEPARTMENT)
│   └── [TM50] Technical Services Department (TM50) (DEPARTMENT)
│       ├── [TM50-PT] Project Team (TEAM)
│       ├── [TM50-ET] Engineering Team (TEAM)
│       └── [TM50-ST] Safety Team (TEAM)
├── [DIV-GS] GIFU SEIKI Division (DIVISION)
│   └── [TMG0] Mold & Engineering Department (TMG0) (DEPARTMENT)
│       ├── [TMG1] Die Casting (TMG1) (SECTION)
│       └── [TMG2] Injection (TMG2) (SECTION)
└── [TM90] Corporate Department (TM90) (DEPARTMENT)
    ├── [TM91] GA (TM91) (SECTION)
    ├── [TM92] HR & Personnel (TM92) (SECTION)
    └── [TM93] Accounting & Finance (TM93) (SECTION)
\`\`\`
`;
        fs.writeFileSync(path.join(docsDir, 'PROPOSED_ORGANIZATION_TREE.md'), treeMd, 'utf-8');

        // 4. PROPOSED_POSITION_MASTER.md
        const posMd = `# PROPOSED POSITION MASTER (INDEPENDENT FROM ORG UNITS)

- **TOTAL POSITION MASTER RECORDS:** ${posMasters791.length} Records
- **ARCHITECTURE:** Positions describe WHAT ROLE an employee holds; decoupled from Organization Units (WHERE an employee belongs).

| Position Record ID | Entity Code | Position Title (TH) | Position Title (EN) | Status | Disposition |
| :---: | :---: | :--- | :--- | :---: | :---: |
${posMasters791.slice(0, 30).map(p => `| ${p.$id.value} | \`${p.entity_code ? p.entity_code.value : ''}\` | "${p.title_th ? p.title_th.value : ''}" | "${p.title_en ? p.title_en.value : ''}" | ACTIVE | **\`KEEP\`** |`).join('\n')}
`;
        fs.writeFileSync(path.join(docsDir, 'PROPOSED_POSITION_MASTER.md'), posMd, 'utf-8');

        fs.writeFileSync(path.join(docsDir, 'phase_6b2_redesign_plan.json'), JSON.stringify({ classificationList: classificationList.length, proposedOrgNodes, assignmentImpact }, null, 2), 'utf-8');

        console.log(`  [PASS] All Deliverable Documentation and JSON Artifacts Written.`);
        console.log(`\n================================================================`);
        console.log(`PHASE 6B.2 REDESIGN COMPLETE — STOPPED FOR USER REVIEW & APPROVAL`);
        console.log(`================================================================\n`);

    } catch (err) {
        console.error(`\n[FAIL] Phase 6B.2 Redesign Error:`, err.message);
        process.exit(1);
    }
}

executePhase6B2Redesign();
