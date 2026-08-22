import fs from 'fs';
import path from 'path';

const orgNodes = JSON.parse(fs.readFileSync('docs/phase7/CANONICAL_ORGANIZATION_MASTER_PROPOSED.json', 'utf-8'));
const posMaster = JSON.parse(fs.readFileSync('docs/phase7/CANONICAL_POSITION_MASTER_PROPOSED.json', 'utf-8'));
const app791Crosswalk = JSON.parse(fs.readFileSync('docs/phase7/APP791_LEGACY_TO_CANONICAL_CROSSWALK.json', 'utf-8'));
const empAssignments = JSON.parse(fs.readFileSync('docs/phase7/EMPLOYEE_CURRENT_ASSIGNMENT_PROPOSED.json', 'utf-8'));
const empIdAudit = JSON.parse(fs.readFileSync('docs/phase7/APP53_EMPLOYEE_IDENTITY_AUDIT.json', 'utf-8'));
const thEnAudit = JSON.parse(fs.readFileSync('docs/phase7/APP53_THAI_ENGLISH_AUDIT.json', 'utf-8'));
const app792Deps = JSON.parse(fs.readFileSync('docs/phase7/APP792_HISTORY_DEPENDENCY_CROSSWALK.json', 'utf-8'));

// 1. Build Org Nodes Table
const orgTableRows = orgNodes.map((n, idx) => {
    const legacy = app791Crosswalk.find(l => l.proposed_canonical_code === n.entity_code || l.official_fy2026_name === n.name_en);
    const legacyName = legacy ? (legacy.old_en || legacy.old_th || 'N/A') : 'N/A';
    const nameChanged = legacy && legacyName !== n.name_en ? 'YES' : 'NO';
    const parentChanged = legacy && legacy.old_type !== n.entity_type ? 'YES' : 'NO';
    const typeChanged = legacy && legacy.old_type !== n.entity_type ? 'YES' : 'NO';

    return {
        no: idx + 1,
        code: n.entity_code,
        type: n.entity_type,
        name: n.name_en,
        parentCode: n.parent_entity_code,
        parentName: n.parent_entity_name,
        path: n.hierarchy_path,
        source: n.source_document,
        ref: n.source_reference,
        legacyName,
        nameChanged,
        parentChanged,
        typeChanged,
        confidence: n.confidence,
        status: 'READY_FOR_REVIEW'
    };
});

fs.writeFileSync('docs/phase7/org_table_rows.json', JSON.stringify(orgTableRows, null, 2));

// 2. Build Pos Table Rows
const posTableRows = posMaster.map(p => {
    return {
        code: p.position_code,
        title: p.position_name_en,
        sourceApp: 'App 53',
        sourceField: p.source_field,
        count: p.employee_count,
        sampleEmpIds: p.sample_app53_records.join(', '),
        legacyPosRefs: `POS-xxx (Mapped to ${p.employee_count} employees)`,
        confidence: p.confidence,
        status: 'READY_FOR_REVIEW'
    };
});

fs.writeFileSync('docs/phase7/pos_table_rows.json', JSON.stringify(posTableRows, null, 2));

console.log('Processed org rows:', orgTableRows.length, 'pos rows:', posTableRows.length);
