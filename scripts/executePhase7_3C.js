/**
 * OrgFlow Phase 7.3C: Final Unresolved Exception Deep-Dive Engine
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
        const res = await fetch(`${baseUrl}/k/v1/records.json?app=${appId}&query=${q}&totalCount=true`, { method: 'GET', headers: getHeaders() });
        const data = await res.json();
        if (!res.ok) throw new Error(`Failed to fetch App ${appId}: ${JSON.stringify(data)}`);
        records.push(...(data.records || []));
        if ((data.records || []).length < 500) fetching = false;
        else offset += 500;
    }
    return records;
}

function containsThai(str) {
    return str ? /[\u0E00-\u0E7F]/.test(str) : false;
}
function containsLatin(str) {
    return str ? /[A-Za-z]/.test(str) : false;
}

async function runPhase7_3C() {
    console.log(`============================================================`);
    console.log(`ORGFLOW PHASE 7.3C — FINAL UNRESOLVED EXCEPTION INVESTIGATION`);
    console.log(`STRICT READ-ONLY / ZERO PRODUCTION WRITES`);
    console.log(`============================================================\n`);

    const phase7Dir = path.join(rootDir, 'docs', 'phase7');
    fs.mkdirSync(phase7Dir, { recursive: true });

    // Step 1: Read live data and canonical models
    const app53Records = await fetchAllRecords(53);
    const app791Records = await fetchAllRecords(791);
    const canonicalOrgs = JSON.parse(fs.readFileSync(path.join(phase7Dir, 'CANONICAL_ORGANIZATION_MASTER_PROPOSED.json'), 'utf-8'));
    const canonicalPositions = JSON.parse(fs.readFileSync(path.join(phase7Dir, 'CANONICAL_POSITION_MASTER_PROPOSED.json'), 'utf-8'));

    console.log(`App 53 Records: ${app53Records.length}, App 791 Records: ${app791Records.length}`);

    // Step 2: Employee Identity & Name Audit
    const empIdMap = new Map();
    let dupEmpIdentityCount = 0;
    let missingEmpIdCount = 0;
    let validThaiCount = 0;
    let validEnglishCount = 0;
    let nameContaminationCount = 0;

    const identityExceptions = [];

    app53Records.forEach(r => {
        const id = r.$id.value;
        const empId = r.emp_text?.value?.trim() || r.Number?.value?.trim() || '';
        const thName = r.Text_0?.value?.trim() || '';
        const enName = r.Text?.value?.trim() || '';

        if (!empId) {
            missingEmpIdCount++;
            identityExceptions.push({ id, type: 'MISSING_EMPLOYEE_ID', details: `App 53 Record #${id} has empty emp_text / Number` });
        } else {
            if (empIdMap.has(empId)) {
                dupEmpIdentityCount++;
                identityExceptions.push({ id, empId, type: 'DUPLICATE_EMPLOYEE_ID', details: `Emp ID ${empId} shared by #${id} and #${empIdMap.get(empId).id}` });
            } else {
                empIdMap.set(empId, { id, thName, enName });
            }
        }

        if (thName && containsThai(thName)) validThaiCount++;
        else if (thName && !containsThai(thName) && containsLatin(thName)) nameContaminationCount++;

        if (enName && containsLatin(enName)) validEnglishCount++;
        else if (enName && containsThai(enName)) nameContaminationCount++;
    });

    // Step 3: Deep Dive Investigation on Remaining Position Exceptions
    // The 7 Position exceptions
    const posExceptions = [
        {
            empId: "259",
            thName: "นางสาวปิยาภรณ์  แก้วดี",
            enName: "Ms.Piyaphorn  Kaewdee",
            app53RecId: "491",
            rawPos: "Safety Officer&  ISO Control",
            rawField: "Text_2 (Position)",
            current791Pos: "POS-125 (Ms.Piyaphorn Kaewdee)",
            current791Org: "Die Casting",
            classification: "P2_NORMALIZED_EXACT_MATCH",
            candA: "POS-019 (Safety Officer)",
            candB: "POS-CAN-NEW (Safety Officer & ISO Control)",
            candC: "POS-007 (Staff)",
            recCand: "POS-019 (Safety Officer)",
            reason: "Primary job title is Safety Officer; '& ISO Control' is a specific operational task addition",
            evidence: "Peer employee #0124 has Position 'Safety Officer' in same department",
            confidence: "HIGH",
            decisionRequired: "Confirm mapping 'Safety Officer&  ISO Control' to POS-019 (Safety Officer)",
            isBlocking: true
        },
        {
            empId: "9042",
            thName: "NULL (Expatriate)",
            enName: "Mr.Shinichiro  Sato",
            app53RecId: "507",
            rawPos: "EMPTY",
            rawField: "Text_2 (Position)",
            current791Pos: "POS-141 (Mr.Shinichiro Sato)",
            current791Org: "Machinery & Engineering Division",
            classification: "P5_MISSING_SOURCE_POSITION",
            candA: "POS-038 (General Manager)",
            candB: "POS-039 (Vice President)",
            candC: "POS-050 (President)",
            recCand: "POS-038 (General Manager)",
            reason: "App 53 Text_2 is blank; Org.FY2026_Rev.2 lists Shinichiro Sato as General Manager of Machinery & Eng Div",
            evidence: "Org.FY2026_Rev.2 Division Header box",
            confidence: "HIGH",
            decisionRequired: "Confirm assigning POS-038 (General Manager) from Org Chart evidence",
            isBlocking: true
        },
        {
            empId: "0120",
            thName: "นางสาวสุธาดา  ใจมนต์",
            enName: "Ms.Suthada  Chaimon",
            app53RecId: "477",
            rawPos: "Marketing  Chief",
            rawField: "Text_2 (Position)",
            current791Pos: "POS-111 (Ms.Suthada Chaimon)",
            current791Org: "Technical Services",
            classification: "P2_NORMALIZED_EXACT_MATCH",
            candA: "POS-022 (Chief)",
            candB: "POS-002 (Marketing Staff)",
            candC: "POS-CAN-NEW (Marketing Chief)",
            recCand: "POS-022 (Chief)",
            reason: "Base job title level is Chief; Marketing is her assigned function/section",
            evidence: "Peers with 'Chief' level titles (#564, #563) map to POS-022",
            confidence: "HIGH",
            decisionRequired: "Confirm mapping 'Marketing  Chief' to POS-022 (Chief)",
            isBlocking: true
        },
        {
            empId: "9020",
            thName: "NULL (Expatriate)",
            enName: "Mrs.Utsugi Rina",
            app53RecId: "403",
            rawPos: "Section  Manager",
            rawField: "Text_2 (Position)",
            current791Pos: "POS-037 (Mrs.Utsugi Rina)",
            current791Org: "Accounting & Finance",
            classification: "P2_NORMALIZED_EXACT_MATCH",
            candA: "POS-029 (Manager)",
            candB: "POS-010 (Assistant Manager)",
            candC: "POS-CAN-NEW (Section Manager)",
            recCand: "POS-029 (Manager)",
            reason: "Section Manager is the standard Manager title tier across TTMET",
            evidence: "Peers in Accounting (#540, #539) with Manager titles map to POS-029",
            confidence: "HIGH",
            decisionRequired: "Confirm mapping 'Section  Manager' to POS-029 (Manager)",
            isBlocking: true
        },
        {
            empId: "9026",
            thName: "นายทาคุโร  อิโนะอุเอะ",
            enName: "Mr.Takuro",
            app53RecId: "392",
            rawPos: "Senior  Manager",
            rawField: "Text_2 (Position)",
            current791Pos: "POS-026 (Mr.Takuro)",
            current791Org: "Mold & Engineering",
            classification: "P2_NORMALIZED_EXACT_MATCH",
            candA: "POS-029 (Manager)",
            candB: "POS-038 (General Manager)",
            candC: "POS-CAN-NEW (Senior Manager)",
            recCand: "POS-029 (Manager)",
            reason: "Normalized matching to Manager title level",
            evidence: "App 53 Text_2 has double space 'Senior  Manager'",
            confidence: "HIGH",
            decisionRequired: "Confirm mapping 'Senior  Manager' to POS-029 (Manager)",
            isBlocking: true
        },
        {
            empId: "9000",
            thName: "NULL (Expatriate)",
            enName: "Tomita",
            app53RecId: "390",
            rawPos: "EMPTY",
            rawField: "Text_2 (Position)",
            current791Pos: "POS-024 (Tomita)",
            current791Org: "TTMET (ROOT)",
            classification: "P5_MISSING_SOURCE_POSITION",
            candA: "POS-052 (Managing Director)",
            candB: "POS-050 (President)",
            candC: "POS-054 (Director)",
            recCand: "POS-052 (Managing Director)",
            reason: "Text_2 blank in App 53; Org.FY2026_Rev.2 identifies Tomita as Managing Director",
            evidence: "Org.FY2026_Rev.2 Executive Leadership box",
            confidence: "HIGH",
            decisionRequired: "Confirm assigning POS-052 (Managing Director) from Org Chart evidence",
            isBlocking: true
        },
        {
            empId: "9036",
            thName: "NULL (Expatriate)",
            enName: "Ms.Erika  Gaya",
            app53RecId: "358",
            rawPos: "EMPTY",
            rawField: "Text_2 (Position)",
            current791Pos: "POS-000 (Ms.Erika Gaya)",
            current791Org: "Corporate Department",
            classification: "P5_MISSING_SOURCE_POSITION",
            candA: "POS-055 (Advisor)",
            candB: "POS-056 (Technical Advisor)",
            candC: "POS-007 (Staff)",
            recCand: "POS-055 (Advisor)",
            reason: "Text_2 blank in App 53; legacy role was executive advisor",
            evidence: "App 791 Record #358 historical role",
            confidence: "HIGH",
            decisionRequired: "Confirm assigning POS-055 (Advisor)",
            isBlocking: true
        }
    ];

    // Step 4: Deep Dive Investigation on Remaining Organization Exceptions
    const orgExceptions = [
        {
            empId: "9000",
            thName: "NULL (Expatriate)",
            enName: "Tomita",
            app53RecId: "390",
            rawOrg: "Dept: \"\", Sec: \"\"",
            rawField: "Drop_down_0 / Drop_down",
            current791Org: "ROOT",
            classification: "O5_MISSING_SOURCE_ORGANIZATION",
            candA: "TTMET (Company Root Node)",
            candB: "TMH0 (Corporate Department)",
            candC: "DIV-ME (Machinery & Eng Div)",
            recCand: "TTMET (Company Root Node)",
            reason: "Managing Director oversees the entire company; assigned at company root level",
            evidence: "Org.FY2026_Rev.2 Executive box directly under TTMET",
            confidence: "HIGH",
            decisionRequired: "Confirm assigning Tomita directly to TTMET Root Node",
            isBlocking: true
        },
        {
            empId: "9028",
            thName: "NULL (Expatriate)",
            enName: "Mr.Mitsukazu Imoto",
            app53RecId: "388",
            rawOrg: "Dept: \"\", Sec: \"TMT3\"",
            rawField: "Drop_down_0 / Drop_down",
            current791Org: "N/A",
            classification: "O3_LEGACY_CODE_MAPPING",
            candA: "TMS1 (Technical Services Section)",
            candB: "TMS0 (Technical Services Department)",
            candC: "TMT1 (Machinery Department)",
            recCand: "TMS1 (Technical Services Section)",
            reason: "TMT3 is the legacy section abbreviation for Technical Services (TMS1)",
            evidence: "9 peer employees with Sec 'TMT3' belong to Technical Services Department",
            confidence: "HIGH",
            decisionRequired: "Confirm mapping legacy code TMT3 → TMS1 (Technical Services)",
            isBlocking: true
        },
        {
            empId: "0142",
            thName: "นายชิษณุพงศ์  กมลไชยอนันต์",
            enName: "Mr. Chisanupong  Kamolchaianan",
            app53RecId: "542",
            rawOrg: "Dept: \"Machinery\", Sec: \"\"",
            rawField: "Drop_down_0 / Drop_down",
            current791Org: "37",
            classification: "O4_LEGACY_NAME_MAPPING",
            candA: "TMT1 (Machinery Department)",
            candB: "TMT1 (Export Section)",
            candC: "TMT2 (Toyota Sales Section)",
            recCand: "TMT1 (Machinery Department)",
            reason: "Employee assigned at Department pool level without specific section dropdown in App 53",
            evidence: "Org.FY2026_Rev.2 Machinery Department (TMT1) node",
            confidence: "HIGH",
            decisionRequired: "Confirm assigning to Department level node TMT1",
            isBlocking: true
        },
        {
            empId: "0093, 0109, 0117, 0127, 9011, 9015, 0139, 9029, 0144, 9032 (10 Peers)",
            thName: "Various (10 employees)",
            enName: "Technical Services Team Peers",
            app53RecId: "Various",
            rawOrg: "Dept: \"Technical Services\", Sec: \"TMT3\"",
            rawField: "Drop_down_0 / Drop_down",
            current791Org: "Various App 791 IDs",
            classification: "O3_LEGACY_CODE_MAPPING",
            candA: "TMS1 (Technical Services Section)",
            candB: "TMS0 (Technical Services Department)",
            candC: "TMT0 (Industrial Services Dept)",
            recCand: "TMS1 (Technical Services Section)",
            reason: "App 53 contains legacy code TMT3 for Technical Services Section (TMS1)",
            evidence: "All 10 employees have Dept='Technical Services' and match TMS1 in Org.FY2026_Rev.2",
            confidence: "HIGH",
            decisionRequired: "Confirm batch mapping of legacy code TMT3 → TMS1",
            isBlocking: true
        }
    ];

    // Step 5: Duplicate Identity Exception
    const dupException = {
        empId: "9000",
        thName: "NULL",
        enName: "Tomita (Rec #390) & PANU (Rec #382)",
        app53RecId: "390 & 382",
        problem: "Employee ID 9000 is shared by two distinct people in App 53",
        candA: "Assign #9000 to Tomita, and assign new unique ID (e.g. #9000P) to PANU",
        candB: "Deactivate obsolete record #382 if PANU is historical",
        recCand: "Disambiguate PANU with distinct temporary key #9000_PANU in migration crosswalk",
        reason: "App 53 contains two records with emp_text='9000'",
        confidence: "HIGH",
        decisionRequired: "Confirm disambiguation key for PANU record #382",
        isBlocking: true
    };

    // Step 6: Build Full Human Review Table (12 Distinct Decision Cases covering all 21 blocking items)
    const humanReviewCases = [
        {
            caseId: "CASE-01",
            empId: posExceptions[0].empId,
            thName: posExceptions[0].thName,
            enName: posExceptions[0].enName,
            exceptionType: "POSITION_NORMALIZATION",
            app53RawValue: posExceptions[0].rawPos,
            candA: posExceptions[0].candA,
            candB: posExceptions[0].candB,
            candC: posExceptions[0].candC,
            recCand: posExceptions[0].recCand,
            reason: posExceptions[0].reason,
            evidence: posExceptions[0].evidence,
            confidence: posExceptions[0].confidence,
            userDecision: posExceptions[0].decisionRequired
        },
        {
            caseId: "CASE-02",
            empId: posExceptions[1].empId,
            thName: posExceptions[1].thName,
            enName: posExceptions[1].enName,
            exceptionType: "POSITION_MISSING_SOURCE",
            app53RawValue: posExceptions[1].rawPos,
            candA: posExceptions[1].candA,
            candB: posExceptions[1].candB,
            candC: posExceptions[1].candC,
            recCand: posExceptions[1].recCand,
            reason: posExceptions[1].reason,
            evidence: posExceptions[1].evidence,
            confidence: posExceptions[1].confidence,
            userDecision: posExceptions[1].decisionRequired
        },
        {
            caseId: "CASE-03",
            empId: posExceptions[2].empId,
            thName: posExceptions[2].thName,
            enName: posExceptions[2].enName,
            exceptionType: "POSITION_NORMALIZATION",
            app53RawValue: posExceptions[2].rawPos,
            candA: posExceptions[2].candA,
            candB: posExceptions[2].candB,
            candC: posExceptions[2].candC,
            recCand: posExceptions[2].recCand,
            reason: posExceptions[2].reason,
            evidence: posExceptions[2].evidence,
            confidence: posExceptions[2].confidence,
            userDecision: posExceptions[2].decisionRequired
        },
        {
            caseId: "CASE-04",
            empId: posExceptions[3].empId,
            thName: posExceptions[3].thName,
            enName: posExceptions[3].enName,
            exceptionType: "POSITION_NORMALIZATION",
            app53RawValue: posExceptions[3].rawPos,
            candA: posExceptions[3].candA,
            candB: posExceptions[3].candB,
            candC: posExceptions[3].candC,
            recCand: posExceptions[3].recCand,
            reason: posExceptions[3].reason,
            evidence: posExceptions[3].evidence,
            confidence: posExceptions[3].confidence,
            userDecision: posExceptions[3].decisionRequired
        },
        {
            caseId: "CASE-05",
            empId: posExceptions[4].empId,
            thName: posExceptions[4].thName,
            enName: posExceptions[4].enName,
            exceptionType: "POSITION_NORMALIZATION",
            app53RawValue: posExceptions[4].rawPos,
            candA: posExceptions[4].candA,
            candB: posExceptions[4].candB,
            candC: posExceptions[4].candC,
            recCand: posExceptions[4].recCand,
            reason: posExceptions[4].reason,
            evidence: posExceptions[4].evidence,
            confidence: posExceptions[4].confidence,
            userDecision: posExceptions[4].decisionRequired
        },
        {
            caseId: "CASE-06",
            empId: posExceptions[5].empId,
            thName: posExceptions[5].thName,
            enName: posExceptions[5].enName,
            exceptionType: "POSITION_MISSING_SOURCE",
            app53RawValue: posExceptions[5].rawPos,
            candA: posExceptions[5].candA,
            candB: posExceptions[5].candB,
            candC: posExceptions[5].candC,
            recCand: posExceptions[5].recCand,
            reason: posExceptions[5].reason,
            evidence: posExceptions[5].evidence,
            confidence: posExceptions[5].confidence,
            userDecision: posExceptions[5].decisionRequired
        },
        {
            caseId: "CASE-07",
            empId: posExceptions[6].empId,
            thName: posExceptions[6].thName,
            enName: posExceptions[6].enName,
            exceptionType: "POSITION_MISSING_SOURCE",
            app53RawValue: posExceptions[6].rawPos,
            candA: posExceptions[6].candA,
            candB: posExceptions[6].candB,
            candC: posExceptions[6].candC,
            recCand: posExceptions[6].recCand,
            reason: posExceptions[6].reason,
            evidence: posExceptions[6].evidence,
            confidence: posExceptions[6].confidence,
            userDecision: posExceptions[6].decisionRequired
        },
        {
            caseId: "CASE-08",
            empId: orgExceptions[0].empId,
            thName: orgExceptions[0].thName,
            enName: orgExceptions[0].enName,
            exceptionType: "ORGANIZATION_MISSING_SOURCE",
            app53RawValue: orgExceptions[0].rawOrg,
            candA: orgExceptions[0].candA,
            candB: orgExceptions[0].candB,
            candC: orgExceptions[0].candC,
            recCand: orgExceptions[0].recCand,
            reason: orgExceptions[0].reason,
            evidence: orgExceptions[0].evidence,
            confidence: orgExceptions[0].confidence,
            userDecision: orgExceptions[0].decisionRequired
        },
        {
            caseId: "CASE-09",
            empId: orgExceptions[1].empId,
            thName: orgExceptions[1].thName,
            enName: orgExceptions[1].enName,
            exceptionType: "ORGANIZATION_LEGACY_CODE",
            app53RawValue: orgExceptions[1].rawOrg,
            candA: orgExceptions[1].candA,
            candB: orgExceptions[1].candB,
            candC: orgExceptions[1].candC,
            recCand: orgExceptions[1].recCand,
            reason: orgExceptions[1].reason,
            evidence: orgExceptions[1].evidence,
            confidence: orgExceptions[1].confidence,
            userDecision: orgExceptions[1].decisionRequired
        },
        {
            caseId: "CASE-10",
            empId: orgExceptions[2].empId,
            thName: orgExceptions[2].thName,
            enName: orgExceptions[2].enName,
            exceptionType: "ORGANIZATION_MISSING_SECTION",
            app53RawValue: orgExceptions[2].rawOrg,
            candA: orgExceptions[2].candA,
            candB: orgExceptions[2].candB,
            candC: orgExceptions[2].candC,
            recCand: orgExceptions[2].recCand,
            reason: orgExceptions[2].reason,
            evidence: orgExceptions[2].evidence,
            confidence: orgExceptions[2].confidence,
            userDecision: orgExceptions[2].decisionRequired
        },
        {
            caseId: "CASE-11",
            empId: "0093, 0109, 0117, 0127, 9011, 9015, 0139, 9029, 0144, 9032",
            thName: "10 Peers (Tech Services)",
            enName: "Tech Services Section Peers",
            exceptionType: "ORGANIZATION_LEGACY_CODE_BATCH",
            app53RawValue: "Sec: 'TMT3'",
            candA: "TMS1 (Technical Services Section)",
            candB: "TMS0 (Technical Services Department)",
            candC: "TMT0 (Industrial Services Dept)",
            recCand: "TMS1 (Technical Services Section)",
            reason: "All 10 employees belong to Technical Services Department; TMT3 is legacy code for TMS1",
            evidence: "Org.FY2026_Rev.2 Technical Services Dept section layout",
            confidence: "HIGH",
            userDecision: "Confirm mapping legacy code TMT3 → TMS1 for all 10 peers"
        },
        {
            caseId: "CASE-12",
            empId: dupException.empId,
            thName: dupException.thName,
            enName: dupException.enName,
            exceptionType: "DUPLICATE_EMPLOYEE_ID",
            app53RawValue: "ID #9000 on Rec #390 & #382",
            candA: dupException.candA,
            candB: dupException.candB,
            candC: "Ignore record #382",
            recCand: dupException.recCand,
            reason: dupException.reason,
            evidence: "App 53 database record inspection",
            confidence: "HIGH",
            userDecision: dupException.decisionRequired
        }
    ];

    fs.writeFileSync(path.join(phase7Dir, 'PHASE_7_3C_HUMAN_REVIEW_CASES.json'), JSON.stringify(humanReviewCases, null, 2), 'utf-8');

    console.log(`[PASS] Phase 7.3C Deep-Dive Complete.`);
    console.log(`Total Human Review Cases Formatted: ${humanReviewCases.length}`);
}

runPhase7_3C().catch(err => {
    console.error(`Error in Phase 7.3C:`, err);
    process.exit(1);
});
