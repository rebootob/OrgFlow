import fs from 'fs';
import path from 'path';

const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
envContent.split(/\r?\n/).forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [key, ...values] = trimmed.split('=');
        process.env[key.trim()] = values.join('=').trim();
    }
});

const baseUrl = process.env.KINTONE_BASE_URL.replace(/\/$/, '');
const h = {
    'X-Cybozu-Authorization': Buffer.from(process.env.KINTONE_USERNAME + ':' + process.env.KINTONE_PASSWORD).toString('base64'),
    'Authorization': 'Basic ' + Buffer.from(process.env.BASIC_AUTH_USER + ':' + process.env.BASIC_AUTH_PASS).toString('base64')
};

async function inspect792() {
    // 1. Fields
    const fRes = await fetch(`${baseUrl}/k/v1/app/form/fields.json?app=792`, { headers: h });
    const fData = await fRes.json();
    const existing = Object.keys(fData.properties || {});
    console.log(`\n=== APP 792 LIVE FIELDS (${existing.length} fields) ===`);
    existing.sort().forEach(k => {
        const f = fData.properties[k];
        console.log(`  code: ${f.code.padEnd(25)} | label: ${f.label.padEnd(30)} | type: ${f.type}`);
    });

    const required792 = [
        "assignment_id", "employee_id", "thai_name", "english_name",
        "position_raw", "position_code", "position_name",
        "organization_code", "organization_name", "organization_type", "hierarchy_path",
        "assignment_type", "assignment_status",
        "effective_start_date", "effective_end_date",
        "manager_employee_id", "manager_name",
        "mapping_status", "mapping_confidence",
        "source_employee", "source_organization", "notes"
    ];

    console.log(`\n=== MISSING FIELDS CHECK IN APP 792 ===`);
    const missing = required792.filter(r => !existing.includes(r));
    console.log(`Missing fields count: ${missing.length}`);
    missing.forEach(m => console.log(`  - MISSING: ${m}`));

    // 2. Form Layout
    const lRes = await fetch(`${baseUrl}/k/v1/app/form/layout.json?app=792`, { headers: h });
    const lData = await lRes.json();
    console.log(`\n=== APP 792 LAYOUT ROWS ===`, lData.layout?.length);

    // 3. Views
    const vRes = await fetch(`${baseUrl}/k/v1/app/views.json?app=792`, { headers: h });
    const vData = await vRes.json();
    console.log(`\n=== APP 792 VIEWS ===`, JSON.stringify(vData, null, 2));
}

inspect792().catch(console.error);
