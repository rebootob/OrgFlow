import fs from 'fs';
import path from 'path';

const envPath = path.join(process.cwd(), '.env.local');
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

async function fetchAll(appId) {
    let records = [], offset = 0, fetching = true;
    while (fetching) {
        const q = encodeURIComponent(`limit 500 offset ${offset}`);
        const res = await fetch(`${baseUrl}/k/v1/records.json?app=${appId}&query=${q}`, { method: 'GET', headers: getHeaders() });
        const data = await res.json();
        records.push(...(data.records || []));
        if ((data.records || []).length < 500) fetching = false;
        else offset += 500;
    }
    return records;
}

async function verify() {
    const app53 = await fetchAll(53);
    const app791 = await fetchAll(791);
    const app792 = await fetchAll(792);

    console.log(`\n=== FINAL AUDIT OF REPAIRED APP 792 PRODUCTION DATA ===`);
    console.log(`App 53 Records:  ${app53.length}`);
    console.log(`App 791 Records: ${app791.length}`);
    console.log(`App 792 Records: ${app792.length}`);

    // Check Key Executives
    const somrudee = app792.find(r => r.employee_id?.value === '0043');
    const tsuchihira = app792.find(r => r.employee_id?.value === '9037');
    const makino = app792.find(r => r.employee_id?.value === '9035');
    const weerakul = app792.find(r => r.employee_id?.value === '0148');
    const vassana = app792.find(r => r.employee_id?.value === '0044');
    const sato = app792.find(r => r.employee_id?.value === '9029');
    const shigeta = app792.find(r => r.employee_id?.value === '9031');

    console.log(`\nKey Executive Verification:`);
    console.log(`  Ms.Somrudee (0043):   Pos: ${somrudee.position_name?.value} (${somrudee.position_code?.value}) | Org: ${somrudee.organization_code?.value} (${somrudee.organization_name?.value})`);
    console.log(`  Mr.Tsuchihira (9037): Pos: ${tsuchihira.position_name?.value} (${tsuchihira.position_code?.value}) | Org: ${tsuchihira.organization_code?.value} (${tsuchihira.organization_name?.value})`);
    console.log(`  Mr.Makino (9035):     Pos: ${makino.position_name?.value} (${makino.position_code?.value}) | Org: ${makino.organization_code?.value} (${makino.organization_name?.value})`);
    console.log(`  Mr.Weerakul (0148):   Pos: ${weerakul.position_name?.value} (${weerakul.position_code?.value}) | Org: ${weerakul.organization_code?.value} (${weerakul.organization_name?.value})`);
    console.log(`  Ms.Vassana (0044):    Pos: ${vassana.position_name?.value} (${vassana.position_code?.value}) | Org: ${vassana.organization_code?.value} (${vassana.organization_name?.value})`);
    console.log(`  Mr.Sato (9029):       Pos: ${sato.position_name?.value} (${sato.position_code?.value}) | Org: ${sato.organization_code?.value} (${sato.organization_name?.value})`);
    console.log(`  Mr.Shigeta (9031):    Pos: ${shigeta.position_name?.value} (${shigeta.position_code?.value}) | Org: ${shigeta.organization_code?.value} (${shigeta.organization_name?.value})`);

    const validOrgCodes = new Set(app791.map(r => r.organization_code?.value));
    let orgCodeErrors = 0;
    let blankFields = 0;

    app792.forEach(r => {
        if (!validOrgCodes.has(r.organization_code?.value)) orgCodeErrors++;
        if (!r.employee_id?.value || !r.position_name?.value || !r.position_code?.value || !r.organization_code?.value) {
            blankFields++;
        }
    });

    console.log(`\nIntegrity Metrics:`);
    console.log(`  Invalid Org Codes:    ${orgCodeErrors}`);
    console.log(`  Blank Required Fields: ${blankFields}`);

    const result = {
        app792_count: app792.length,
        app53_count: app53.length,
        app791_count: app791.length,
        invalid_org_codes: orgCodeErrors,
        blank_required_fields: blankFields,
        status: (orgCodeErrors === 0 && blankFields === 0 && app792.length === 275) ? "AUDIT_PASS" : "AUDIT_FAIL"
    };

    fs.writeFileSync(path.join(process.cwd(), 'docs', 'APP792_POST_CORRECTION_FINAL_AUDIT.json'), JSON.stringify(result, null, 2), 'utf-8');
    console.log(`\nFinal Audit Status: ${result.status}`);
}

verify().catch(console.error);
