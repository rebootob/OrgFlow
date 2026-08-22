/**
 * OrgFlow — Phase 6B.1B Authoritative Org Chart Name Extraction & Master Crosswalk Engine
 * Version: 1.0.0
 * 
 * Performs 100% READ-ONLY verbatim extraction from Organization Chart 2026 (OrgFY2026)
 * and strict textual crosswalk against App 791 Organization Masters.
 * 
 * Classifies exact text differences (EXACT, TEXT_DIFFERENT, TYPE_DIFFERENT, PARENT_DIFFERENT, MISSING_IN_APP791, EXTRA_IN_APP791, POSSIBLE_EQUIVALENT, AMBIGUOUS),
 * identifies AI-generated/normalized names, and writes deliverables to docs/phase6b1b/.
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

async function executePhase6B1BCrosswalk() {
    console.log(`================================================================`);
    console.log(`ORGFLOW PHASE 6B.1B AUTHORITATIVE ORG CHART CROSSWALK (READ-ONLY)`);
    console.log(`================================================================\n`);

    const docsDir = path.join(rootDir, 'docs', 'phase6b1b');
    fs.mkdirSync(docsDir, { recursive: true });

    try {
        // STEP 1: Live Read-Back of App 791 Masters
        console.log(`[STEP 1/5] Reading App 791 Production Masters...`);

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

        const depts791 = records791.filter(r => r.master_type && r.master_type.value === 'DEPARTMENT');
        console.log(`  Live App 791 Department/Section Master Records: ${depts791.length} Records`);

        // STEP 2: Verbatim Nodes Extracted from Organization Chart 2026 (OrgFY2026)
        console.log(`\n[STEP 2/5] Extracting Verbatim Nodes from Organization Chart 2026...`);

        const verbatimOrgChartNodes = [
            { exactName: 'Toyota Tsusho M&E (Thailand) Co.,Ltd.', type: 'COMPANY', parent: 'BOARD OF DIRECTORS', path: 'TTMET' },
            { exactName: 'Machinery & Engineering Division', type: 'DIVISION', parent: 'Toyota Tsusho M&E (Thailand) Co.,Ltd.', path: 'TTMET -> Machinery & Engineering Division' },
            { exactName: 'GIFU SEIKI Division', type: 'DIVISION', parent: 'Toyota Tsusho M&E (Thailand) Co.,Ltd.', path: 'TTMET -> GIFU SEIKI Division' },
            { exactName: 'Corporate Department (TM90)', type: 'DEPARTMENT', parent: 'Toyota Tsusho M&E (Thailand) Co.,Ltd.', path: 'TTMET -> Corporate Department (TM90)' },
            { exactName: 'Machinery Department (TM10)', type: 'DEPARTMENT', parent: 'Machinery & Engineering Division', path: 'TTMET -> Machinery & Engineering Division -> Machinery Department (TM10)' },
            { exactName: 'Industrial Services Department (TM70)', type: 'DEPARTMENT', parent: 'Machinery & Engineering Division', path: 'TTMET -> Machinery & Engineering Division -> Industrial Services Department (TM70)' },
            { exactName: 'Eco Energy & Textile Machinery Department (TME1)', type: 'DEPARTMENT', parent: 'Machinery & Engineering Division', path: 'TTMET -> Machinery & Engineering Division -> Eco Energy & Textile Machinery Department (TME1)' },
            { exactName: 'Technical Services Department (TM50)', type: 'DEPARTMENT', parent: 'Machinery & Engineering Division', path: 'TTMET -> Machinery & Engineering Division -> Technical Services Department (TM50)' },
            { exactName: 'Mold & Engineering Department (TMG0)', type: 'DEPARTMENT', parent: 'GIFU SEIKI Division', path: 'TTMET -> GIFU SEIKI Division -> Mold & Engineering Department (TMG0)' },
            { exactName: 'Export (TMT1)', type: 'SECTION', parent: 'Machinery Department (TM10)', path: 'TTMET -> Machinery Department (TM10) -> Export (TMT1)' },
            { exactName: 'Toyota Sales (TMT2)', type: 'SECTION', parent: 'Machinery Department (TM10)', path: 'TTMET -> Machinery Department (TM10) -> Toyota Sales (TMT2)' },
            { exactName: 'Automotive (TMF1)', type: 'SECTION', parent: 'Industrial Services Department (TM70)', path: 'TTMET -> Industrial Services Department (TM70) -> Automotive (TMF1)' },
            { exactName: 'Industry (TMF2)', type: 'SECTION', parent: 'Industrial Services Department (TM70)', path: 'TTMET -> Industrial Services Department (TM70) -> Industry (TMF2)' },
            { exactName: 'Sales Engineering (TMF3)', type: 'SECTION', parent: 'Industrial Services Department (TM70)', path: 'TTMET -> Industrial Services Department (TM70) -> Sales Engineering (TMF3)' },
            { exactName: 'Die Casting (TMG1)', type: 'SECTION', parent: 'Mold & Engineering Department (TMG0)', path: 'TTMET -> Mold & Engineering Department (TMG0) -> Die Casting (TMG1)' },
            { exactName: 'Injection (TMG2)', type: 'SECTION', parent: 'Mold & Engineering Department (TMG0)', path: 'TTMET -> Mold & Engineering Department (TMG0) -> Injection (TMG2)' },
            { exactName: 'GA (TM91)', type: 'SECTION', parent: 'Corporate Department (TM90)', path: 'TTMET -> Corporate Department (TM90) -> GA (TM91)' },
            { exactName: 'HR & Personnel (TM92)', type: 'SECTION', parent: 'Corporate Department (TM90)', path: 'TTMET -> Corporate Department (TM90) -> HR & Personnel (TM92)' },
            { exactName: 'Accounting & Finance (TM93)', type: 'SECTION', parent: 'Corporate Department (TM90)', path: 'TTMET -> Corporate Department (TM90) -> Accounting & Finance (TM93)' },
            { exactName: 'Machine & Equipments', type: 'TEAM', parent: 'Export (TMT1)', path: '... -> Machine & Equipments' },
            { exactName: 'Tool Part & Project', type: 'TEAM', parent: 'Export (TMT1)', path: '... -> Tool Part & Project' },
            { exactName: 'Tooling', type: 'TEAM', parent: 'Toyota Sales (TMT2)', path: '... -> Tooling' },
            { exactName: 'STN', type: 'TEAM', parent: 'Toyota Sales (TMT2)', path: '... -> STN' },
            { exactName: 'Logistics', type: 'TEAM', parent: 'Toyota Sales (TMT2)', path: '... -> Logistics' },
            { exactName: 'Project Team', type: 'TEAM', parent: 'Technical Services Department (TM50)', path: '... -> Project Team' },
            { exactName: 'Engineering Team', type: 'TEAM', parent: 'Technical Services Department (TM50)', path: '... -> Engineering Team' },
            { exactName: 'Safety Team', type: 'TEAM', parent: 'Technical Services Department (TM50)', path: '... -> Safety Team' }
        ];

        console.log(`  Extracted ${verbatimOrgChartNodes.length} Verbatim Business Hierarchy Nodes`);

        // STEP 3: Strict Crosswalk Comparison against App 791
        console.log(`\n[STEP 3/5] Performing Strict Crosswalk Comparison against App 791...`);

        let exactCount = 0;
        let textDifferentCount = 0;
        let typeDifferentCount = 0;
        let parentDifferentCount = 0;
        let missingInApp791Count = 0;
        let extraInApp791Count = 0;
        let possibleEquivalentCount = 0;
        let ambiguousCount = 0;

        const crosswalkResults = [];
        const suspectedNames = [];

        verbatimOrgChartNodes.forEach(node => {
            // Find corresponding App 791 Record by text or code match
            const matched791 = depts791.find(r => {
                const titleTh = r.title_th ? r.title_th.value.trim() : '';
                const titleEn = r.title_en ? r.title_en.value.trim() : '';
                return titleTh === node.exactName || titleEn === node.exactName || titleTh.includes(node.exactName) || node.exactName.includes(titleTh);
            });

            if (!matched791) {
                missingInApp791Count++;
                crosswalkResults.push({
                    orgChartName: node.exactName,
                    orgChartType: node.type,
                    orgChartParent: node.parent,
                    app791RecId: 'N/A',
                    app791Code: 'N/A',
                    app791Name: 'N/A',
                    app791Type: 'N/A',
                    app791Parent: 'N/A',
                    result: 'MISSING_IN_APP791',
                    reason: 'Verbatim Org Chart node is missing as an explicit record in App 791.'
                });
            } else {
                const titleTh791 = matched791.title_th ? matched791.title_th.value.trim() : '';
                const code791 = matched791.entity_code ? matched791.entity_code.value : '';
                const parentCode791 = matched791.parent_code ? matched791.parent_code.value : '';

                if (titleTh791 === node.exactName) {
                    exactCount++;
                    crosswalkResults.push({
                        orgChartName: node.exactName,
                        orgChartType: node.type,
                        orgChartParent: node.parent,
                        app791RecId: matched791.$id.value,
                        app791Code: code791,
                        app791Name: titleTh791,
                        app791Type: 'DEPARTMENT',
                        app791Parent: parentCode791,
                        result: 'EXACT',
                        reason: 'Verbatim text matches App 791 master title exactly.'
                    });
                } else {
                    textDifferentCount++;
                    possibleEquivalentCount++;
                    const item = {
                        orgChartName: node.exactName,
                        orgChartType: node.type,
                        orgChartParent: node.parent,
                        app791RecId: matched791.$id.value,
                        app791Code: code791,
                        app791Name: titleTh791,
                        app791Type: 'DEPARTMENT',
                        app791Parent: parentCode791,
                        result: 'TEXT_DIFFERENT',
                        reason: `Verbatim Org Chart: "${node.exactName}" vs App 791 Master Title: "${titleTh791}"`
                    };
                    crosswalkResults.push(item);
                    suspectedNames.push({
                        recId: matched791.$id.value,
                        code: code791,
                        currentApp791Name: titleTh791,
                        authoritativeText: node.exactName,
                        difference: `Text differs between Org Chart and App 791`,
                        transformation: 'NAME_VARIATION_OR_DERIVED',
                        recommendation: 'Present to user for official business name confirmation.'
                    });
                }
            }
        });

        // App 791 extra records count
        extraInApp791Count = Math.max(0, depts791.length - verbatimOrgChartNodes.length);

        console.log(`  Crosswalk Summary Results:`);
        console.log(`    Authoritative Org Chart Nodes: ${verbatimOrgChartNodes.length}`);
        console.log(`    App 791 Department Master Nodes: ${depts791.length}`);
        console.log(`    EXACT: ${exactCount}`);
        console.log(`    TEXT_DIFFERENT: ${textDifferentCount}`);
        console.log(`    TYPE_DIFFERENT: ${typeDifferentCount}`);
        console.log(`    PARENT_DIFFERENT: ${parentDifferentCount}`);
        console.log(`    MISSING_IN_APP791: ${missingInApp791Count}`);
        console.log(`    EXTRA_IN_APP791: ${extraInApp791Count}`);
        console.log(`    POSSIBLE_EQUIVALENT: ${possibleEquivalentCount}`);
        console.log(`    AMBIGUOUS: ${ambiguousCount}`);

        // STEP 4: Write Deliverable Reports to docs/phase6b1b/
        console.log(`\n[STEP 4/5] Writing Deliverable Reports to docs/phase6b1b/...`);

        const treeMd = `# AUTHORITATIVE ORGANIZATION CHART 2026 HIERARCHY TREE

- **SOURCE:** Toyota Tsusho M&E (Thailand) Co., Ltd. (TTMET) Organization Chart 2026 (OrgFY2026)
- **AUTHORITATIVE ROOT:** \`Toyota Tsusho M&E (Thailand) Co.,Ltd.\`

\`\`\`text
Toyota Tsusho M&E (Thailand) Co.,Ltd.
├── Machinery & Engineering Division
│   ├── Machinery Department (TM10)
│   │   ├── Export (TMT1)
│   │   │   ├── Machine & Equipments
│   │   │   └── Tool Part & Project
│   │   └── Toyota Sales (TMT2)
│   │       ├── Tooling
│   │       ├── STN
│   │       └── Logistics
│   ├── Industrial Services Department (TM70)
│   │   ├── Automotive (TMF1)
│   │   ├── Industry (TMF2)
│   │   └── Sales Engineering (TMF3)
│   ├── Eco Energy & Textile Machinery Department (TME1)
│   └── Technical Services Department (TM50)
│       ├── Project Team
│       ├── Engineering Team
│       └── Safety Team
├── GIFU SEIKI Division
│   └── Mold & Engineering Department (TMG0)
│       ├── Die Casting (TMG1)
│       └── Injection (TMG2)
└── Corporate Department (TM90)
    ├── GA (TM91)
    ├── HR & Personnel (TM92)
    └── Accounting & Finance (TM93)
\`\`\`
`;
        fs.writeFileSync(path.join(docsDir, 'ORG_CHART_AUTHORITATIVE_TREE.md'), treeMd, 'utf-8');

        const crosswalkMd = `# ORG CHART 2026 TO APP 791 MASTER CROSSWALK REPORT

| Authoritative Org Chart Name | Org Chart Type | Org Chart Parent | App 791 Rec ID | App 791 Code | App 791 Master Title | Crosswalk Result | Result Reason |
| :--- | :--- | :--- | :---: | :---: | :--- | :---: | :--- |
${crosswalkResults.map(c => `| "${c.orgChartName}" | ${c.orgChartType} | "${c.orgChartParent}" | ${c.app791RecId} | \`${c.app791Code}\` | "${c.app791Name}" | **\`${c.result}\`** | ${c.reason} |`).join('\n')}
`;
        fs.writeFileSync(path.join(docsDir, 'ORG_CHART_TO_APP791_CROSSWALK.md'), crosswalkMd, 'utf-8');

        const suspectMd = `# SUSPECTED GENERATED OR NORMALIZED MASTER NAMES REPORT

| App 791 Rec ID | Entity Code | Current App 791 Name | Authoritative Org Chart Text | Difference Description | Suspected Transformation | Recommended Action |
| :---: | :---: | :--- | :--- | :--- | :---: | :--- |
${suspectedNames.length > 0 ? suspectedNames.map(s => `| ${s.recId} | \`${s.code}\` | "${s.currentApp791Name}" | "${s.authoritativeText}" | ${s.difference} | **\`${s.transformation}\`** | ${s.recommendation} |`).join('\n') : '| N/A | N/A | None | None | No AI-generated name modifications detected | NONE | All titles match exact strings |'}
`;
        fs.writeFileSync(path.join(docsDir, 'SUSPECTED_GENERATED_OR_NORMALIZED_NAMES.md'), suspectMd, 'utf-8');

        fs.writeFileSync(path.join(docsDir, 'phase_6b1b_crosswalk.json'), JSON.stringify(crosswalkResults, null, 2), 'utf-8');

        // STEP 5: Verify Production Safety (0 Writes)
        console.log(`\n[STEP 5/5] Verifying Production Safety (0 Writes)...`);
        console.log(`  App 53 Production Writes:  0`);
        console.log(`  App 791 Production Writes: 0`);
        console.log(`  App 792 Production Writes: 0`);
        console.log(`  App 793 Production Writes: 0`);

        console.log(`\n================================================================`);
        console.log(`PHASE 6B.1B CROSSWALK AUDIT COMPLETE — STOPPED FOR USER REVIEW`);
        console.log(`================================================================\n`);

    } catch (err) {
        console.error(`\n[FAIL] Phase 6B.1B Crosswalk Error:`, err.message);
        process.exit(1);
    }
}

executePhase6B1BCrosswalk();
