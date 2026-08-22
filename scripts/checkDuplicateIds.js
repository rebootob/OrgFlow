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

async function check() {
    const q = encodeURIComponent(`limit 500`);
    const res = await fetch(`${baseUrl}/k/v1/records.json?app=792&query=${q}`, { method: 'GET', headers: getHeaders() });
    const data = await res.json();
    const records = data.records || [];

    const counts = {};
    records.forEach(r => {
        const id = r.employee_id?.value;
        counts[id] = (counts[id] || 0) + 1;
    });

    for (const [id, count] of Object.entries(counts)) {
        if (count > 1) {
            console.log(`Duplicate Employee ID in App 792: "${id}" (Count: ${count})`);
            const dups = records.filter(r => r.employee_id?.value === id);
            dups.forEach(d => {
                console.log(`  RecID: ${d.$id.value} | Name: ${d.english_name?.value} | Thai: ${d.thai_name?.value} | Pos: ${d.position_name?.value} | Org: ${d.organization_code?.value}`);
            });
        }
    }
}

check().catch(console.error);
