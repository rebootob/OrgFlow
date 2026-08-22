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

async function checkForm(appId) {
    const res = await fetch(`${baseUrl}/k/v1/app/form/fields.json?app=${appId}`, { headers: getHeaders() });
    const data = await res.json();
    console.log(`\n=== APP ${appId} FIELDS (${Object.keys(data.properties || {}).length} fields) ===`);
    Object.keys(data.properties || {}).forEach(k => {
        const f = data.properties[k];
        console.log(`  code: ${f.code.padEnd(25)} | label: ${f.label.padEnd(30)} | type: ${f.type}`);
    });
}

async function main() {
    await checkForm(791);
    await checkForm(792);
    await checkForm(793);
}

main().catch(console.error);
