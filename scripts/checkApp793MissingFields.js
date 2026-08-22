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

async function checkApp793() {
    const res = await fetch(`${baseUrl}/k/v1/app/form/fields.json?app=793`, { headers: h });
    const data = await res.json();
    console.log(`\n=== APP 793 CURRENT FIELDS (${Object.keys(data.properties || {}).length} fields) ===`);
    const existing = Object.keys(data.properties || {});
    existing.sort().forEach(k => {
        const f = data.properties[k];
        console.log(`  code: ${f.code.padEnd(30)} | label: ${f.label.padEnd(35)} | type: ${f.type}`);
    });

    const required = [
        "request_id", "request_type", "employee_id", "employee_name",
        "current_organization_code", "current_organization_name",
        "proposed_organization_code", "proposed_organization_name",
        "current_position_code", "current_position_name",
        "proposed_position_code", "proposed_position_name",
        "effective_date", "request_reason",
        "requester", "gm_approver", "hr_approver",
        "gm_comment", "hr_comment", "reject_reason",
        "returned_from_status", "applied_at", "applied_by",
        "system_result", "rollback_reference"
    ];

    console.log(`\n=== MISSING FIELDS CHECK ===`);
    const missing = required.filter(r => !existing.includes(r));
    console.log(`Missing fields count: ${missing.length}`);
    missing.forEach(m => console.log(`  - MISSING: ${m}`));
}

checkApp793().catch(console.error);
