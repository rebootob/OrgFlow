import fs from 'fs';
import path from 'path';

const envPath = path.resolve('.env.local');
const content = fs.readFileSync(envPath, 'utf-8');
const lines = content.split(/\r?\n/);
const envVars = {};

lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [k, ...v] = trimmed.split('=');
        envVars[k.trim()] = v.join('=').trim();
    }
});

const baseUrl = (envVars.KINTONE_BASE_URL || 'https://ttmet.cybozu.com').replace(/\/$/, '');
const appId = envVars.KINTONE_APP_ID || '53';
const token = envVars.KINTONE_API_TOKEN || '';
const username = envVars.KINTONE_USERNAME || '';
const password = envVars.KINTONE_PASSWORD || '';
const basicUser = envVars.BASIC_AUTH_USER || '';
const basicPass = envVars.BASIC_AUTH_PASS || '';

console.log(`=== TESTING ALL AUTH COMBINATIONS ===`);
console.log(`Domain: ${baseUrl}`);
console.log(`App ID: ${appId}`);
console.log(`API Token Present: ${Boolean(token)}`);
console.log(`Username Present: ${Boolean(username)}`);

async function test(label, headers) {
    console.log(`\nTesting: [${label}]`);
    const url = `${baseUrl}/k/v1/records.json?app=${appId}&query=${encodeURIComponent('limit 1')}`;
    try {
        const res = await fetch(url, { headers });
        console.log(`Status: ${res.status} ${res.statusText}`);
        const text = await res.text();
        if (res.ok) {
            console.log(`>>> SUCCESS! <<< Response length: ${text.length}`);
            return true;
        } else {
            console.log(`Snippet: ${text.substring(0, 150)}`);
            return false;
        }
    } catch (e) {
        console.error(`Error:`, e.message);
        return false;
    }
}

async function run() {
    if (token) {
        const h = { 'X-Cybozu-API-Token': token };
        if (basicUser && basicPass) h['Authorization'] = 'Basic ' + Buffer.from(`${basicUser}:${basicPass}`).toString('base64');
        await test('API Token Only', h);
    }
    if (username && password) {
        const h = { 'X-Cybozu-Authorization': Buffer.from(`${username}:${password}`).toString('base64') };
        if (basicUser && basicPass) h['Authorization'] = 'Basic ' + Buffer.from(`${basicUser}:${basicPass}`).toString('base64');
        await test('Password Auth Only', h);
    }
    if (token && username && password) {
        const h = {
            'X-Cybozu-API-Token': token,
            'X-Cybozu-Authorization': Buffer.from(`${username}:${password}`).toString('base64')
        };
        if (basicUser && basicPass) h['Authorization'] = 'Basic ' + Buffer.from(`${basicUser}:${basicPass}`).toString('base64');
        await test('Token + Password Combined', h);
    }
}

run();
