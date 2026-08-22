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

async function check() {
    const res = await fetch(`${baseUrl}/k/v1/records.json?app=791&query=${encodeURIComponent('limit 500')}`, { headers: h });
    const data = await res.json();
    const active = (data.records || []).filter(r => r.is_active?.value === 'ACTIVE' && r.master_type?.value === 'DEPARTMENT');
    console.log('Active Depts:', active.length);
    active.forEach(r => {
        console.log(r.$id.value, r.entity_code?.value, 'parent_code:', JSON.stringify(r.parent_entity_code?.value), 'parent_name:', JSON.stringify(r.parent_entity_name?.value));
    });
}

check();
