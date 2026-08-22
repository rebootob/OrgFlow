/**
 * OrgFlow Phase 7.3A: Blocking Exception Resolution Before App 791 Production Repair
 * STRICT READ-ONLY / ZERO PRODUCTION WRITES
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const phase7Dir = path.join(rootDir, 'docs', 'phase7');
const exceptions = JSON.parse(fs.readFileSync(path.join(phase7Dir, 'PHASE_7_2_ALL_EXCEPTIONS.json'), 'utf-8'));
const canonicalPositions = JSON.parse(fs.readFileSync(path.join(phase7Dir, 'CANONICAL_POSITION_MASTER_PROPOSED.json'), 'utf-8'));
const canonicalOrgs = JSON.parse(fs.readFileSync(path.join(phase7Dir, 'CANONICAL_ORGANIZATION_MASTER_PROPOSED.json'), 'utf-8'));

// 1. The 7 Unresolved Position Employees Analysis
const pos7 = [
    {
        empId: "259",
        thName: "นางสาวปิยาภรณ์  แก้วดี",
        enName: "Ms.Piyaphorn  Kaewdee",
        app53RecId: "491",
        rawPosValue: "Safety Officer&  ISO Control",
        sourceFieldCode: "Text_2",
        sourceFieldLabel: "Position",
        currentApp791PosRef: "POS-125",
        currentApp791PosName: "Ms.Piyaphorn Kaewdee",
        proposedCanonicalPosCode: "POS-019",
        proposedCanonicalPosName: "Safety Officer",
        whyFailed: "Raw string contains compound '&  ISO Control' with double space",
        candidateMatches: ["Safety Officer (POS-019)"],
        confidence: "HIGH",
        recommendedResolution: "Map to existing canonical Safety Officer (POS-019) as primary job title",
        resolutionType: "NORMALIZATION_ONLY"
    },
    {
        empId: "9042",
        thName: "NULL (Expatriate)",
        enName: "Mr.Shinichiro  Sato",
        app53RecId: "507",
        rawPosValue: "EMPTY",
        sourceFieldCode: "Text_2",
        sourceFieldLabel: "Position",
        currentApp791PosRef: "POS-141",
        currentApp791PosName: "Mr.Shinichiro Sato",
        proposedCanonicalPosCode: "POS-038",
        proposedCanonicalPosName: "General Manager",
        whyFailed: "Text_2 field is blank in App 53",
        candidateMatches: ["General Manager (POS-038) per Org Chart Org.FY2026_Rev.2"],
        confidence: "HIGH",
        recommendedResolution: "Assign General Manager (POS-038) based on Org.FY2026_Rev.2 division header",
        resolutionType: "HUMAN_REVIEW_REQUIRED"
    },
    {
        empId: "0120",
        thName: "นางสาวสุธาดา  ใจมนต์",
        enName: "Ms.Suthada  Chaimon",
        app53RecId: "477",
        rawPosValue: "Marketing  Chief",
        sourceFieldCode: "Text_2",
        sourceFieldLabel: "Position",
        currentApp791PosRef: "POS-111",
        currentApp791PosName: "Ms.Suthada Chaimon",
        proposedCanonicalPosCode: "POS-022",
        proposedCanonicalPosName: "Chief",
        whyFailed: "Raw string 'Marketing  Chief' contains double space and functional prefix",
        candidateMatches: ["Chief (POS-022)", "Marketing Staff (POS-002)"],
        confidence: "HIGH",
        recommendedResolution: "Map to Chief (POS-022) with Marketing as function",
        resolutionType: "NORMALIZATION_ONLY"
    },
    {
        empId: "9020",
        thName: "NULL (Expatriate)",
        enName: "Mrs.Utsugi Rina",
        app53RecId: "403",
        rawPosValue: "Section  Manager",
        sourceFieldCode: "Text_2",
        sourceFieldLabel: "Position",
        currentApp791PosRef: "POS-037",
        currentApp791PosName: "Mrs.Utsugi Rina",
        proposedCanonicalPosCode: "POS-029",
        proposedCanonicalPosName: "Manager",
        whyFailed: "Raw string contains 'Section  Manager' with double space",
        candidateMatches: ["Manager (POS-029)"],
        confidence: "HIGH",
        recommendedResolution: "Map to Manager (POS-029)",
        resolutionType: "NORMALIZATION_ONLY"
    },
    {
        empId: "9026",
        thName: "นายทาคุโร  อิโนะอุเอะ",
        enName: "Mr.Takuro",
        app53RecId: "392",
        rawPosValue: "Senior  Manager",
        sourceFieldCode: "Text_2",
        sourceFieldLabel: "Position",
        currentApp791PosRef: "POS-026",
        currentApp791PosName: "Mr.Takuro",
        proposedCanonicalPosCode: "POS-029",
        proposedCanonicalPosName: "Manager",
        whyFailed: "Raw string contains 'Senior  Manager' with double space",
        candidateMatches: ["Manager (POS-029)"],
        confidence: "HIGH",
        recommendedResolution: "Map to Manager (POS-029) or retain Senior Manager as canonical title",
        resolutionType: "EXISTING_CANONICAL_POSITION"
    },
    {
        empId: "9000",
        thName: "NULL (Expatriate)",
        enName: "Tomita",
        app53RecId: "390",
        rawPosValue: "EMPTY",
        sourceFieldCode: "Text_2",
        sourceFieldLabel: "Position",
        currentApp791PosRef: "POS-024",
        currentApp791PosName: "Tomita",
        proposedCanonicalPosCode: "POS-052",
        proposedCanonicalPosName: "Managing Director",
        whyFailed: "Text_2 field is blank in App 53",
        candidateMatches: ["Managing Director (POS-052) per Org.FY2026_Rev.2"],
        confidence: "HIGH",
        recommendedResolution: "Assign Managing Director (POS-052) based on Org Chart",
        resolutionType: "HUMAN_REVIEW_REQUIRED"
    },
    {
        empId: "9036",
        thName: "NULL (Expatriate)",
        enName: "Ms.Erika  Gaya",
        app53RecId: "358",
        rawPosValue: "EMPTY",
        sourceFieldCode: "Text_2",
        sourceFieldLabel: "Position",
        currentApp791PosRef: "POS-000",
        currentApp791PosName: "Ms.Erika Gaya",
        proposedCanonicalPosCode: "POS-055",
        proposedCanonicalPosName: "Advisor",
        whyFailed: "Text_2 field is blank in App 53",
        candidateMatches: ["Advisor (POS-055)"],
        confidence: "HIGH",
        recommendedResolution: "Assign Advisor (POS-055) based on executive appointment record",
        resolutionType: "HUMAN_REVIEW_REQUIRED"
    }
];

// 2. The 3 Unresolved Organization Employees Analysis
const org3 = [
    {
        empId: "9000",
        thName: "NULL (Expatriate)",
        enName: "Tomita",
        app53RecId: "390",
        rawCompany: "N/A",
        rawDiv: "N/A",
        rawDept: "EMPTY",
        rawSec: "EMPTY",
        rawTeam: "EMPTY",
        currentOrgRef: "ROOT",
        expectedCanonicalCompany: "TTMET / Toyota Tsusho M&E (Thailand) Co.,Ltd.",
        expectedCanonicalDiv: "N/A",
        expectedCanonicalDept: "N/A (Corporate Executive)",
        expectedCanonicalSec: "N/A",
        expectedCanonicalTeam: "N/A",
        exactPath: "TTMET",
        whyFailed: "App 53 Dept/Sec dropdowns are unselected (President/MD level)",
        candidateNode: "TTMET (COMPANY)",
        evidence: "Org.FY2026_Rev.2 Root Executive Level",
        confidence: "HIGH",
        recommendedResolution: "Assign directly to TTMET (Company Root Node)"
    },
    {
        empId: "9028",
        thName: "NULL (Expatriate)",
        enName: "Mr.Mitsukazu Imoto",
        app53RecId: "388",
        rawCompany: "N/A",
        rawDiv: "N/A",
        rawDept: "EMPTY",
        rawSec: "TMT3",
        rawTeam: "EMPTY",
        currentOrgRef: "N/A",
        expectedCanonicalCompany: "TTMET / Toyota Tsusho M&E (Thailand) Co.,Ltd.",
        expectedCanonicalDiv: "DIV-ME / Machinery & Engineering Division",
        expectedCanonicalDept: "TMS0 / Technical Services Department",
        expectedCanonicalSec: "TMS1 / Technical Services",
        expectedCanonicalTeam: "N/A",
        exactPath: "TTMET -> Machinery & Engineering Division -> Technical Services Department -> Technical Services",
        whyFailed: "Dept dropdown empty; Section contains legacy code 'TMT3'",
        candidateNode: "TMS1 (Technical Services Section)",
        evidence: "Org.FY2026_Rev.2 Technical Services Department tree",
        confidence: "HIGH",
        recommendedResolution: "Map TMT3 legacy code to TMS1 (Technical Services Section)"
    },
    {
        empId: "0142",
        thName: "นายชิษณุพงศ์  กมลไชยอนันต์",
        enName: "Mr. Chisanupong  Kamolchaianan",
        app53RecId: "542",
        rawCompany: "N/A",
        rawDiv: "N/A",
        rawDept: "Machinery",
        rawSec: "EMPTY",
        rawTeam: "EMPTY",
        currentOrgRef: "N/A",
        expectedCanonicalCompany: "TTMET / Toyota Tsusho M&E (Thailand) Co.,Ltd.",
        expectedCanonicalDiv: "DIV-ME / Machinery & Engineering Division",
        expectedCanonicalDept: "TMT1 / Machinery Department",
        expectedCanonicalSec: "TMT1 / Export (or General Machinery Pool)",
        expectedCanonicalTeam: "N/A",
        exactPath: "TTMET -> Machinery & Engineering Division -> Machinery Department",
        whyFailed: "Section dropdown empty; Dept is 'Machinery'",
        candidateNode: "TMT1 (Machinery Department)",
        evidence: "Org.FY2026_Rev.2 Machinery Department",
        confidence: "HIGH",
        recommendedResolution: "Assign to TMT1 (Machinery Department Level Node)"
    }
];

// 3. Complete List of All 41 Human Review Items with Blocking Flag
const all41Items = exceptions.map((e, idx) => {
    let blocking = 'NO';
    let reason = '';

    if (e.problem_category === 'DUPLICATE_EMPLOYEE_ID_IN_APP53') {
        blocking = 'YES';
        reason = 'Two employees share ID #9000; must be disambiguated before assignment linking.';
    } else if (e.problem_category === 'UNRESOLVED_POSITION_STRING') {
        blocking = 'YES';
        reason = 'Position string in App 53 must be resolved to a canonical Position Master code.';
    } else if (e.problem_category === 'UNRESOLVED_ORGANIZATION_STRING') {
        blocking = 'YES';
        reason = 'Legacy organization abbreviation must be confirmed to official FY2026 section code.';
    } else if (e.problem_category === 'MISSING_AUTHORITATIVE_THAI_NAME') {
        blocking = 'NO';
        reason = 'Informational only. Japanese expats & special records legitimately lack Thai name in App 53; does not block structural rebuild.';
    }

    return {
        review_id: `REV-${String(idx + 1).padStart(3, '0')}`,
        affected_app: 'App 53 / App 791',
        record_id: e.app791_rec_id || 'N/A',
        employee_id: e.employee_id,
        entity_type: e.problem_category.includes('POSITION') ? 'POSITION' : (e.problem_category.includes('ORGANIZATION') ? 'ORGANIZATION' : 'EMPLOYEE'),
        current_value: e.current_value,
        proposed_value: e.expected_value,
        problem_category: e.problem_category,
        authoritative_source: e.authoritative_source,
        reason_human_review_required: reason,
        recommended_action: e.recommended_repair,
        confidence: e.confidence,
        blocking_production: blocking
    };
});

// 4. Grouping by Root Cause
const rootCauseGroups = {};
all41Items.forEach(item => {
    if (!rootCauseGroups[item.problem_category]) {
        rootCauseGroups[item.problem_category] = {
            count: 0,
            ids: [],
            blocking: item.blocking_production,
            can_resolve_deterministically: item.blocking_production === 'YES' ? 'YES (with approved mapping rules)' : 'N/A'
        };
    }
    rootCauseGroups[item.problem_category].count++;
    rootCauseGroups[item.problem_category].ids.push(item.employee_id);
});

// 5. Overlap Analysis
const blockingItems = all41Items.filter(i => i.blocking_production === 'YES');
const nonBlockingItems = all41Items.filter(i => i.blocking_production === 'NO');

fs.writeFileSync(path.join(phase7Dir, 'PHASE_7_3A_41_REVIEW_ITEMS.json'), JSON.stringify(all41Items, null, 2), 'utf-8');
fs.writeFileSync(path.join(phase7Dir, 'PHASE_7_3A_POS7_ANALYSIS.json'), JSON.stringify(pos7, null, 2), 'utf-8');
fs.writeFileSync(path.join(phase7Dir, 'PHASE_7_3A_ORG3_ANALYSIS.json'), JSON.stringify(org3, null, 2), 'utf-8');

console.log('Total Review Items:', all41Items.length);
console.log('  Blocking Items:', blockingItems.length);
console.log('  Non-Blocking Items:', nonBlockingItems.length);
console.log('  Position Unresolved in Review:', pos7.length);
console.log('  Org Unresolved in Review:', org3.length);
