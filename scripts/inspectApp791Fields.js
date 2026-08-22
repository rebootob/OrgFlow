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

async function inspect791() {
    const fRes = await fetch(`${baseUrl}/k/v1/app/form/fields.json?app=791`, { headers: h });
    const fData = await fRes.json();
    const existing = Object.keys(fData.properties || {});
    console.log(`\n=== APP 791 LIVE FIELDS (${existing.length} fields) ===`);
    existing.sort().forEach(k => {
        const f = fData.properties[k];
        console.log(`  code: ${f.code.padEnd(25)} | label: ${f.label.padEnd(30)} | type: ${f.type}`);
    });

    const required791 = [
        "organization_code", "organization_name", "organization_type", "organization_level",
        "parent_organization_code", "parent_organization_name", "hierarchy_path",
        "active_status", "code_status", "source", "source_reference", "notes",
        "effective_start_date", "effective_end_date"
    ];

    console.log(`\n=== MISSING FIELDS CHECK IN APP 791 ===`);
    const missing = required791.filter(r => !existing.includes(r));
    console.log(`Missing fields count: ${missing.length}`);
    missing.forEach(m => console.log(`  - MISSING: ${m}`));
}

inspect791().catch(console.error);
