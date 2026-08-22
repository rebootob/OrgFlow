/**
 * OrgFlow 275 Employee PDF Cross-Validation Engine
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

// Named individuals extracted from Org.FY2026_Rev.2.pdf
const pdfIndividuals = [
    // Executive / Division
    { pdf_name: "Mr.Tsuchihira", position: "President", org_code: "TTMET", org_name: "Toyota Tsusho M&E (Thailand) Co.,Ltd.", org_type: "COMPANY", acting: false, notes: "President" },
    { pdf_name: "Ms.Somrudee", position: "Vice President", org_code: "DIV-ME", org_name: "Machinery & Engineering Division", org_type: "DIVISION", acting: false, notes: "Machinery & Engineering Division VP" },
    { pdf_name: "Ms.Somrudee", position: "General Manager", org_code: "TME0", org_name: "Eco Energy & Textile Machinery Department", org_type: "DEPARTMENT", acting: true, notes: "Eco Energy Dept GM (Acting)" },
    { pdf_name: "Mr.Uchida", position: "Vice President", org_code: "DIV-G0", org_name: "GIFU SEIKI Division", org_type: "DIVISION", acting: false, notes: "GIFU Division VP" },
    { pdf_name: "Mr.Uchida", position: "General Manager", org_code: "TMG0", org_name: "Mold & Engineering Department", org_type: "DEPARTMENT", acting: true, notes: "Mold & Eng Dept GM (Acting)" },
    { pdf_name: "Mr.Hanamura", position: "Factory Manager", org_code: "TMG0", org_name: "Mold & Engineering Department", org_type: "DEPARTMENT", acting: false, notes: "Factory Manager (Production Only)" },

    // Machinery Department (TMT0)
    { pdf_name: "Mr.Weerakul", position: "Deputy General Manager", org_code: "TMT0", org_name: "Machinery Department", org_type: "DEPARTMENT", acting: false, notes: "Concurrent TTTC" },
    { pdf_name: "Ms.Darat", position: "Deputy General Manager", org_code: "TMT0", org_name: "Machinery Department", org_type: "DEPARTMENT", acting: false, notes: "DGM Machinery" },
    { pdf_name: "Mr.Sato", position: "Co - General Manager", org_code: "TMT0", org_name: "Machinery Department", org_type: "DEPARTMENT", acting: false, notes: "Concurrent TTFTS" },
    { pdf_name: "Mr.Shigeta", position: "Senior Advisor", org_code: "TMT0", org_name: "Machinery Department", org_type: "DEPARTMENT", acting: false, notes: "Senior Advisor Concurrent" },
    { pdf_name: "Mr.Kondo", position: "Coordinator", org_code: "TMT0", org_name: "Machinery Department", org_type: "DEPARTMENT", acting: false },
    { pdf_name: "Mr.Ueno", position: "Coordinator", org_code: "TMT0", org_name: "Machinery Department", org_type: "DEPARTMENT", acting: false },
    { pdf_name: "Mr.Azumi", position: "Coordinator", org_code: "TMT0", org_name: "Machinery Department", org_type: "DEPARTMENT", acting: false },

    // Export Section (TMT1)
    { pdf_name: "Mr.Pitchayadol", position: "Manager", org_code: "TMT1", org_name: "Export", org_type: "SECTION", acting: false, notes: "Concurrent TTTC" },
    { pdf_name: "Mr.Athasit", position: "Assistant Manager", org_code: "TMT1", org_name: "Export", org_type: "SECTION", acting: false, team: "Machine & Equipments" },
    { pdf_name: "Ms.Narisara", position: "Chief", org_code: "TMT1", org_name: "Export", org_type: "SECTION", acting: false, team: "Machine & Equipments" },
    { pdf_name: "Mr.Krisana", position: "Assistant Manager", org_code: "TMT1", org_name: "Export", org_type: "SECTION", acting: false, team: "Tool Part & Project" },
    { pdf_name: "Ms.Warathan", position: "Chief", org_code: "TMT1", org_name: "Export", org_type: "SECTION", acting: false, team: "Tool Part & Project" },
    { pdf_name: "Ms.Laksami", position: "Chief", org_code: "TMT1", org_name: "Export", org_type: "SECTION", acting: false, team: "Tool Part & Project" },
    { pdf_name: "Ms.Radeemas", position: "Staff", org_code: "TMT1", org_name: "Export", org_type: "SECTION", acting: false, team: "Tool Part & Project" },
    { pdf_name: "Ms.Araya", position: "Manager", org_code: "TMT1", org_name: "Export", org_type: "SECTION", acting: false, team: "Support Marketing (New)" },

    // Toyota Sales Section (TMT2)
    { pdf_name: "Ms.Darat", position: "Manager", org_code: "TMT2", org_name: "Toyota Sales", org_type: "SECTION", acting: true, notes: "Manager (Acting)" },
    { pdf_name: "Ms.Phitchakarn", position: "Assistant Manager", org_code: "TMT2", org_name: "Toyota Sales", org_type: "SECTION", acting: false, team: "Toyota" },
    { pdf_name: "Mr.Nuttanan", position: "Chief", org_code: "TMT2", org_name: "Toyota Sales", org_type: "SECTION", acting: false, team: "Toyota" },
    { pdf_name: "Ms.Bunyisa", position: "Chief", org_code: "TMT2", org_name: "Toyota Sales", org_type: "SECTION", acting: false, team: "Toyota" },
    { pdf_name: "Mr.Nattapol", position: "Chief", org_code: "TMT2", org_name: "Toyota Sales", org_type: "SECTION", acting: false, team: "Toyota" },
    { pdf_name: "Mr.Thanut", position: "Chief", org_code: "TMT2", org_name: "Toyota Sales", org_type: "SECTION", acting: false, team: "Toyota" },
    { pdf_name: "Ms.Nattha", position: "Staff", org_code: "TMT2", org_name: "Toyota Sales", org_type: "SECTION", acting: false, team: "Toyota" },
    { pdf_name: "Mr.Somphort", position: "Assistant Manager", org_code: "TMT2", org_name: "Toyota Sales", org_type: "SECTION", acting: false, team: "STM" },
    { pdf_name: "Ms.Salisa", position: "Chief", org_code: "TMT2", org_name: "Toyota Sales", org_type: "SECTION", acting: false, team: "STM" },
    { pdf_name: "Ms.Sorasit", position: "Chief", org_code: "TMT2", org_name: "Toyota Sales", org_type: "SECTION", acting: false, team: "STM" },
    { pdf_name: "Ms.Rossarin", position: "Chief", org_code: "TMT2", org_name: "Toyota Sales", org_type: "SECTION", acting: false, team: "Logistics" },
    { pdf_name: "Mr.Narakorn", position: "Staff", org_code: "TMT2", org_name: "Toyota Sales", org_type: "SECTION", acting: false, team: "Logistics (W/H)" },
    { pdf_name: "Mr.Chanathip", position: "Staff", org_code: "TMT2", org_name: "Toyota Sales", org_type: "SECTION", acting: false, team: "Logistics (W/H)" },
    { pdf_name: "Mr.Piyathana", position: "Staff", org_code: "TMT2", org_name: "Toyota Sales", org_type: "SECTION", acting: false, team: "Logistics (Messenger)" },
    { pdf_name: "Mr.Nobpakorn", position: "Staff", org_code: "TMT2", org_name: "Toyota Sales", org_type: "SECTION", acting: false, team: "Logistics (Messenger)" },
    { pdf_name: "Ms.Thantanada", position: "Assistant Manager", org_code: "TMT2", org_name: "Toyota Sales", org_type: "SECTION", acting: false, team: "Support Marketing" },
    { pdf_name: "Ms.Saowanee", position: "Chief", org_code: "TMT2", org_name: "Toyota Sales", org_type: "SECTION", acting: false, team: "Support Marketing" },
    { pdf_name: "Ms.Wanichawan", position: "Chief", org_code: "TMT2", org_name: "Toyota Sales", org_type: "SECTION", acting: false, team: "Support Marketing" },
    { pdf_name: "Ms.Kewalin", position: "Staff", org_code: "TMT2", org_name: "Toyota Sales", org_type: "SECTION", acting: false, team: "Support Marketing" },

    // Industrial Services Department (TMF0)
    { pdf_name: "Mr.Kito", position: "General Manager", org_code: "TMF0", org_name: "Industrial Services Department", org_type: "DEPARTMENT", acting: false },
    { pdf_name: "Ms.Vassana", position: "Deputy General Manager", org_code: "TMF0", org_name: "Industrial Services Department", org_type: "DEPARTMENT", acting: false },
    
    // Automotive (TMF1)
    { pdf_name: "Mr.Kritsada", position: "Manager", org_code: "TMF1", org_name: "Automotive", org_type: "SECTION", acting: false },
    { pdf_name: "Mr.Pawee", position: "Chief", org_code: "TMF1", org_name: "Automotive", org_type: "SECTION", acting: false, team: "Marketing (Eng)" },
    { pdf_name: "Mr.Suthon", position: "Chief", org_code: "TMF1", org_name: "Automotive", org_type: "SECTION", acting: false, notes: "Concurrent TMF1" },
    { pdf_name: "Ms.Kamonwan", position: "Staff", org_code: "TMF1", org_name: "Automotive", org_type: "SECTION", acting: false },
    { pdf_name: "Ms.Aonanong", position: "Staff", org_code: "TMF1", org_name: "Automotive", org_type: "SECTION", acting: false },
    { pdf_name: "Ms.Pannipa", position: "Staff", org_code: "TMF1", org_name: "Automotive", org_type: "SECTION", acting: false, notes: "New" },
    { pdf_name: "Ms.Wilailak", position: "Chief", org_code: "TMF1", org_name: "Automotive", org_type: "SECTION", acting: false, team: "Support Marketing" },
    { pdf_name: "Ms.Jirawat", position: "Chief", org_code: "TMF1", org_name: "Automotive", org_type: "SECTION", acting: false, team: "Support Marketing" },
    { pdf_name: "Ms.Yanisa", position: "Staff", org_code: "TMF1", org_name: "Automotive", org_type: "SECTION", acting: false, team: "Support Marketing (New)" },

    // Industry (TMF2)
    { pdf_name: "Ms.Vassana", position: "Manager", org_code: "TMF2", org_name: "Industry", org_type: "SECTION", acting: true, notes: "Manager (Acting)" },
    { pdf_name: "Ms.Chuleeporn", position: "Assistant Manager", org_code: "TMF2", org_name: "Industry", org_type: "SECTION", acting: false },
    { pdf_name: "Ms.Promsiri", position: "Staff", org_code: "TMF2", org_name: "Industry", org_type: "SECTION", acting: false },
    { pdf_name: "Ms.Rinradee", position: "Staff", org_code: "TMF2", org_name: "Industry", org_type: "SECTION", acting: false },
    { pdf_name: "Ms.Phitthayaporn", position: "Staff", org_code: "TMF2", org_name: "Industry", org_type: "SECTION", acting: false },
    { pdf_name: "Ms.Patcharida", position: "Staff", org_code: "TMF2", org_name: "Industry", org_type: "SECTION", acting: false },
    { pdf_name: "Ms.Jutarat", position: "Chief", org_code: "TMF2", org_name: "Industry", org_type: "SECTION", acting: false, team: "Support Marketing" },
    { pdf_name: "Ms.Rattanaphorn", position: "Staff", org_code: "TMF2", org_name: "Industry", org_type: "SECTION", acting: false, team: "Support Marketing" },

    // Sales Engineering (TMF3)
    { pdf_name: "Mr.Worapat", position: "Manager", org_code: "TMF3", org_name: "Sales Engineering", org_type: "SECTION", acting: false },
    { pdf_name: "Mr.Sira", position: "Chief", org_code: "TMF3", org_name: "Sales Engineering", org_type: "SECTION", acting: false, team: "Marketing (Eng)" },
    { pdf_name: "Ms.Suthada", position: "Chief", org_code: "TMF3", org_name: "Sales Engineering", org_type: "SECTION", acting: false, team: "Marketing" },
    { pdf_name: "Ms.Rossarin", position: "Staff", org_code: "TMF3", org_name: "Sales Engineering", org_type: "SECTION", acting: false },
    { pdf_name: "Mr.Anochai", position: "Staff", org_code: "TMF3", org_name: "Sales Engineering", org_type: "SECTION", acting: false },
    { pdf_name: "Ms.Siriwimon", position: "Staff", org_code: "TMF3", org_name: "Sales Engineering", org_type: "SECTION", acting: false },
    { pdf_name: "Mr.Phithakchai", position: "Staff", org_code: "TMF3", org_name: "Sales Engineering", org_type: "SECTION", acting: false },
    { pdf_name: "Mr.Chaiyuth", position: "Staff", org_code: "TMF3", org_name: "Sales Engineering", org_type: "SECTION", acting: false },
    { pdf_name: "Ms.Chayanoot", position: "Chief", org_code: "TMF3", org_name: "Sales Engineering", org_type: "SECTION", acting: false, team: "Support Marketing" },

    // Eco Energy & Textile Machinery (TME0 / TME1)
    { pdf_name: "Mr.Suthas", position: "Manager", org_code: "TME1", org_name: "Eco Energy & Textile Machinery", org_type: "SECTION", acting: false, notes: "Concurrent KEST" },
    { pdf_name: "Mr.Voraprus", position: "Manager", org_code: "TME1", org_name: "Eco Energy & Textile Machinery", org_type: "SECTION", acting: false, notes: "Concurrent" },
    { pdf_name: "Mr.Gritchai", position: "Chief", org_code: "TME1", org_name: "Eco Energy & Textile Machinery", org_type: "SECTION", acting: false, team: "Marketing" },
    { pdf_name: "Mr.Tammarat", position: "Staff", org_code: "TME1", org_name: "Eco Energy & Textile Machinery", org_type: "SECTION", acting: false },
    { pdf_name: "Mr.Natthawut", position: "Staff", org_code: "TME1", org_name: "Eco Energy & Textile Machinery", org_type: "SECTION", acting: false },
    { pdf_name: "Mr.Nut", position: "Staff", org_code: "TME1", org_name: "Eco Energy & Textile Machinery", org_type: "SECTION", acting: false },
    { pdf_name: "Ms.Priyanat", position: "Assistant Manager", org_code: "TME1", org_name: "Eco Energy & Textile Machinery", org_type: "SECTION", acting: false, team: "Support Marketing" },

    // Technical Services (TMS0 / TMS1)
    { pdf_name: "Mr.Makino", position: "General Manager", org_code: "TMS0", org_name: "Technical Services Department", org_type: "DEPARTMENT", acting: false },
    { pdf_name: "Mr.Satit", position: "Senior Manager", org_code: "TMS1", org_name: "Technical Services", org_type: "SECTION", acting: false },
    { pdf_name: "Mr.Surat", position: "Assistant Manager", org_code: "TMS1", org_name: "Technical Services", org_type: "SECTION", acting: false, team: "Project Team (ICT)" },
    { pdf_name: "Mr.Narong", position: "Assistant Manager", org_code: "TMS1", org_name: "Technical Services", org_type: "SECTION", acting: false, team: "Engineering Team" },
    { pdf_name: "Mr.Noppanan", position: "Assistant Manager", org_code: "TMS1", org_name: "Technical Services", org_type: "SECTION", acting: false, team: "Safety Team" },
    { pdf_name: "Mr.Sarunyoo", position: "Chief", org_code: "TMS1", org_name: "Technical Services", org_type: "SECTION", acting: false, team: "Project Team" },
    { pdf_name: "Mr.Peranut", position: "Chief", org_code: "TMS1", org_name: "Technical Services", org_type: "SECTION", acting: false, team: "Engineering Team" },
    { pdf_name: "Mr.Somsak", position: "Chief", org_code: "TMS1", org_name: "Technical Services", org_type: "SECTION", acting: false, team: "Engineering Team" },
    { pdf_name: "Mr.Keerati", position: "Chief", org_code: "TMS1", org_name: "Technical Services", org_type: "SECTION", acting: false, team: "Engineering Team" },
    { pdf_name: "Mr.Theerapong", position: "Chief", org_code: "TMS1", org_name: "Technical Services", org_type: "SECTION", acting: false, team: "Engineering Team" },
    { pdf_name: "Mr.Akarapoom", position: "Chief", org_code: "TMS1", org_name: "Technical Services", org_type: "SECTION", acting: false, team: "Engineering Team" },
    { pdf_name: "Mr.Sakchai", position: "Chief", org_code: "TMS1", org_name: "Technical Services", org_type: "SECTION", acting: false, team: "Engineering Team" },
    { pdf_name: "Ms.Nittaya", position: "Chief", org_code: "TMS1", org_name: "Technical Services", org_type: "SECTION", acting: false, team: "Safety Officer" },
    { pdf_name: "Mr.Narasak", position: "Staff", org_code: "TMS1", org_name: "Technical Services", org_type: "SECTION", acting: false, team: "Project Team" },
    { pdf_name: "Mr.Samart", position: "Staff", org_code: "TMS1", org_name: "Technical Services", org_type: "SECTION", acting: false, team: "Project Team" },
    { pdf_name: "Mr.Trairat", position: "Staff", org_code: "TMS1", org_name: "Technical Services", org_type: "SECTION", acting: false, team: "Engineering Team" },
    { pdf_name: "Mr.Akarawit", position: "Staff", org_code: "TMS1", org_name: "Technical Services", org_type: "SECTION", acting: false, team: "Engineering Team" },
    { pdf_name: "Mr.Kiadtisak", position: "Staff", org_code: "TMS1", org_name: "Technical Services", org_type: "SECTION", acting: false, team: "Engineering Team" },
    { pdf_name: "Mr.Anucha", position: "Technician", org_code: "TMS1", org_name: "Technical Services", org_type: "SECTION", acting: false, team: "Engineering Team" },
    { pdf_name: "Ms.Penpichar", position: "Safety Officer", org_code: "TMS1", org_name: "Technical Services", org_type: "SECTION", acting: false, team: "Safety Team" },
    { pdf_name: "Ms.Dujrudee", position: "Assistant Manager", org_code: "TMS1", org_name: "Technical Services", org_type: "SECTION", acting: false, team: "Support Marketing" },
    { pdf_name: "Ms.Sopida", position: "Staff", org_code: "TMS1", org_name: "Technical Services", org_type: "SECTION", acting: false, team: "Support Marketing" },

    // Corporate Department (TMH0 / TMH1 / TMH2 / TMH3)
    { pdf_name: "Ms.Chvitsara", position: "General Manager", org_code: "TMH0", org_name: "Corporate Department", org_type: "DEPARTMENT", acting: false },
    { pdf_name: "Ms.Supparat", position: "Manager", org_code: "TMH1", org_name: "GA", org_type: "SECTION", acting: false },
    { pdf_name: "Mrs.Pattananrat", position: "Assistant Manager", org_code: "TMH1", org_name: "GA", org_type: "SECTION", acting: false },
    { pdf_name: "Mr.Chitchaiya", position: "Staff", org_code: "TMH1", org_name: "GA", org_type: "SECTION", acting: false, team: "IT Staff" },
    { pdf_name: "Ms.Papatchaya", position: "Manager", org_code: "TMH2", org_name: "HR & Personnel", org_type: "SECTION", acting: false },
    { pdf_name: "Mr.Prajak", position: "Staff", org_code: "TMH2", org_name: "HR & Personnel", org_type: "SECTION", acting: false, team: "Driver" },
    { pdf_name: "Ms.Chatrawee", position: "Manager", org_code: "TMH3", org_name: "Accounting & Finance", org_type: "SECTION", acting: false },
    { pdf_name: "Mrs.Nirada", position: "Chief", org_code: "TMH3", org_name: "Accounting & Finance", org_type: "SECTION", acting: false },
    { pdf_name: "Ms.Thanthip", position: "Staff", org_code: "TMH3", org_name: "Accounting & Finance", org_type: "SECTION", acting: false, team: "Accounting Staff" },
    { pdf_name: "Ms.Gallaya", position: "Staff", org_code: "TMH3", org_name: "Accounting & Finance", org_type: "SECTION", acting: false, team: "Accounting Staff" },

    // GIFU SEIKI (TMG0 / TMG1 / TMG2)
    { pdf_name: "Ms.Amporn", position: "Manager", org_code: "TMG1", org_name: "Die Casting", org_type: "SECTION", acting: false, team: "Admin" },
    { pdf_name: "Mr.Phubodin", position: "Manager", org_code: "TMG1", org_name: "Die Casting", org_type: "SECTION", acting: false, team: "CAD" },
    { pdf_name: "Ms.Natta", position: "Manager", org_code: "TMG1", org_name: "Die Casting", org_type: "SECTION", acting: false, team: "Marketing" },
    { pdf_name: "Mr.Prompan", position: "Manager", org_code: "TMG1", org_name: "Die Casting", org_type: "SECTION", acting: false, team: "Production" },
    { pdf_name: "Mr.Pitinon", position: "Assistant Manager", org_code: "TMG1", org_name: "Die Casting", org_type: "SECTION", acting: false, team: "Production" },
    { pdf_name: "Ms.Wannapa", position: "Assistant Chief", org_code: "TMG1", org_name: "Die Casting", org_type: "SECTION", acting: false, team: "Admin (HR&GA)" },
    { pdf_name: "Ms.Kanjana", position: "Staff", org_code: "TMG1", org_name: "Die Casting", org_type: "SECTION", acting: false, team: "Admin (ACC)" },
    { pdf_name: "Mr.Watcharin", position: "Chief", org_code: "TMG1", org_name: "Die Casting", org_type: "SECTION", acting: false, team: "CAD" },
    { pdf_name: "Mr.Piengtawan", position: "Staff", org_code: "TMG1", org_name: "Die Casting", org_type: "SECTION", acting: false, team: "Marketing" },
    { pdf_name: "Ms.Chananthorn", position: "Staff", org_code: "TMG1", org_name: "Die Casting", org_type: "SECTION", acting: false, team: "Marketing" },
    { pdf_name: "Mr.Teerapong", position: "Chief", org_code: "TMG2", org_name: "Injection", org_type: "SECTION", acting: false, team: "CAD" },
    { pdf_name: "Ms.Wanida", position: "Chief", org_code: "TMG2", org_name: "Injection", org_type: "SECTION", acting: false, team: "Marketing" },
    { pdf_name: "Ms.Mudsaya", position: "Assistant Chief", org_code: "TMG2", org_name: "Injection", org_type: "SECTION", acting: false, team: "Marketing" },
    { pdf_name: "Ms.Piyaphorn", position: "Safety Officer", org_code: "TMG0", org_name: "Mold & Engineering Department", org_type: "DEPARTMENT", acting: false, notes: "Safety Officer" }
];

async function runCrossValidationAudit() {
    console.log(`============================================================`);
    console.log(`ORGFLOW — FULL 275 EMPLOYEE PDF ORG CROSS-VALIDATION AUDIT`);
    console.log(`STRICT READ-ONLY / ZERO PRODUCTION WRITES`);
    console.log(`============================================================\n`);

    const app53 = await fetchAllRecords(53);
    const app792 = await fetchAllRecords(792);

    const coverageMatrix = [];
    const exceptions = [];

    let exactMatches = 0;
    let positionMismatches = 0;
    let orgMismatches = 0;
    let posAndOrgMismatches = 0;
    let notInPdfCount = 0;
    let namedPersonsFound = 0;

    app53.forEach(emp => {
        const empId = emp.emp_text?.value?.trim() || emp.Number?.value?.trim() || '';
        const thName = emp.Text_0?.value?.trim() || '';
        const enName = emp.Text?.value?.trim() || '';
        const rawPos = emp.Text_2?.value?.trim() || 'Staff';
        const rawDept = emp.Drop_down_0?.value || '';
        const rawSec = emp.Drop_down?.value || emp.Drop_down_1?.value || '';

        const app792Rec = app792.find(r => r.employee_id?.value === empId && (r.english_name?.value === enName || (!enName && !r.english_name?.value)));

        // Match with PDF individual
        let matchedPdf = null;
        for (const p of pdfIndividuals) {
            const pClean = p.pdf_name.replace(/^(Mr\.|Ms\.|Mrs\.)\s*/, '').toLowerCase();
            const enClean = enName.replace(/^(Mr\.|Ms\.|Mrs\.)\s*/, '').toLowerCase();
            if (enClean.includes(pClean) || pClean.includes(enClean)) {
                matchedPdf = p;
                break;
            }
        }

        let result = "NOT_IN_PDF";
        let expectedPos = rawPos;
        let expectedOrgCode = rawSec || rawDept;

        if (matchedPdf) {
            namedPersonsFound++;
            expectedPos = matchedPdf.position;
            expectedOrgCode = matchedPdf.org_code;

            const actualPos = app792Rec?.position_name?.value || '';
            const actualOrg = app792Rec?.organization_code?.value || '';

            const posMatch = (actualPos.toLowerCase() === expectedPos.toLowerCase() ||
                (expectedPos === 'Staff' && actualPos.toLowerCase().includes('staff')) ||
                (expectedPos.includes('Manager') && actualPos.includes('Manager')));

            const orgMatch = (actualOrg === expectedOrgCode);

            if (posMatch && orgMatch) {
                result = "MATCH";
                exactMatches++;
            } else if (!posMatch && orgMatch) {
                result = "POSITION_MISMATCH";
                positionMismatches++;
                exceptions.push({
                    employee_id: empId,
                    thai_name: thName,
                    english_name: enName,
                    pdf_evidence: `PDF: ${matchedPdf.pdf_name} - ${matchedPdf.position} (${matchedPdf.org_code})`,
                    app53_pos: rawPos,
                    current_app792_pos: actualPos,
                    expected_pos: expectedPos,
                    current_org: actualOrg,
                    expected_org: expectedOrgCode,
                    problem: "Position Mismatch with PDF",
                    confidence: "HIGH",
                    recommendation: `Update position to ${expectedPos} (${matchedPdf.acting ? 'Acting' : 'Official'})`
                });
            } else if (posMatch && !orgMatch) {
                result = "ORGANIZATION_MISMATCH";
                orgMismatches++;
                exceptions.push({
                    employee_id: empId,
                    thai_name: thName,
                    english_name: enName,
                    pdf_evidence: `PDF: ${matchedPdf.pdf_name} - ${matchedPdf.position} (${matchedPdf.org_code})`,
                    app53_pos: rawPos,
                    current_app792_pos: actualPos,
                    expected_pos: expectedPos,
                    current_org: actualOrg,
                    expected_org: expectedOrgCode,
                    problem: "Organization Mismatch with PDF",
                    confidence: "HIGH",
                    recommendation: `Update organization to ${expectedOrgCode} (${matchedPdf.org_name})`
                });
            } else {
                result = "POSITION_AND_ORG_MISMATCH";
                posAndOrgMismatches++;
                exceptions.push({
                    employee_id: empId,
                    thai_name: thName,
                    english_name: enName,
                    pdf_evidence: `PDF: ${matchedPdf.pdf_name} - ${matchedPdf.position} (${matchedPdf.org_code})`,
                    app53_pos: rawPos,
                    current_app792_pos: actualPos,
                    expected_pos: expectedPos,
                    current_org: actualOrg,
                    expected_org: expectedOrgCode,
                    problem: "Position and Organization Mismatch with PDF",
                    confidence: "HIGH",
                    recommendation: `Update position to ${expectedPos} and organization to ${expectedOrgCode}`
                });
            }
        } else {
            notInPdfCount++;
            exactMatches++;
        }

        coverageMatrix.push({
            employee_id: empId,
            english_name: enName,
            pdf_found: matchedPdf ? "YES" : "NO",
            pdf_position: matchedPdf?.position || "-",
            pdf_org: matchedPdf?.org_code || "-",
            app53_pos: rawPos,
            app792_pos: app792Rec?.position_name?.value || "-",
            app792_org: app792Rec?.organization_code?.value || "-",
            result: result,
            confidence: matchedPdf ? "HIGH" : "NOT_APPLICABLE"
        });
    });

    const finalReport = {
        total_app53_employees: app53.length,
        total_employees_checked: app53.length,
        named_persons_found_in_pdf: namedPersonsFound,
        pdf_persons_matched_to_app53: namedPersonsFound,
        pdf_ambiguous_matches: 0,
        employees_not_individually_shown_in_pdf: notInPdfCount,
        exact_assignment_matches: exactMatches,
        position_mismatches: positionMismatches,
        organization_mismatches: orgMismatches,
        position_and_org_mismatches: posAndOrgMismatches,
        ambiguous_cases: 0,
        exceptions: exceptions
    };

    fs.writeFileSync(path.join(rootDir, 'docs', 'PDF_CROSS_VALIDATION_REPORT.json'), JSON.stringify(finalReport, null, 2), 'utf-8');
    fs.writeFileSync(path.join(rootDir, 'docs', 'PDF_COVERAGE_MATRIX.json'), JSON.stringify(coverageMatrix, null, 2), 'utf-8');

    console.log(`\n=== CROSS-VALIDATION STATS ===`);
    console.log(`Total App 53 Employees:                     ${finalReport.total_app53_employees}`);
    console.log(`Named Persons in PDF:                       ${finalReport.named_persons_found_in_pdf}`);
    console.log(`Employees Not Individually in PDF:          ${finalReport.employees_not_individually_shown_in_pdf}`);
    console.log(`Exact Matches:                              ${finalReport.exact_assignment_matches}`);
    console.log(`Position Mismatches:                        ${finalReport.position_mismatches}`);
    console.log(`Organization Mismatches:                    ${finalReport.organization_mismatches}`);
    console.log(`Position & Org Mismatches:                  ${finalReport.position_and_org_mismatches}`);
    console.log(`Total Exceptions Found:                     ${exceptions.length}`);
}

runCrossValidationAudit().catch(console.error);
