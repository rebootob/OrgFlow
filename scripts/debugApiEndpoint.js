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
const username = envVars.KINTONE_USERNAME || '';
const password = envVars.KINTONE_PASSWORD || '';
const basicUser = envVars.BASIC_AUTH_USER || '';
const basicPass = envVars.BASIC_AUTH_PASS || '';

console.log(`=== TESTING KINTONE API ENDPOINT FORMAT ===`);
console.log(`Domain: ${baseUrl}`);
console.log(`App ID: ${appId}`);

const headers = {};
if (username && password) {
    headers['X-Cybozu-Authorization'] = Buffer.from(`${username}:${password}`).toString('base64');
}
if (basicUser && basicPass) {
    headers['Authorization'] = 'Basic ' + Buffer.from(`${basicUser}:${basicPass}`).toString('base64');
}

async function testUrl(url) {
    console.log(`\nTesting GET ${url}...`);
    try {
        const res = await fetch(url, { method: 'GET', headers });
        console.log(`Status: ${res.status} ${res.statusText}`);
        const text = await res.text();
        console.log(`Response Snippet:`, text.substring(0, 300));
    } catch (e) {
        console.error(`Fetch Error:`, e.message);
    }
}

async function run() {
    // Test 1: GET /k/v1/app/form/fields.json?app=53
    await testUrl(`${baseUrl}/k/v1/app/form/fields.json?app=${appId}`);

    // Test 2: GET /k/v1/records.json?app=53
    await testUrl(`${baseUrl}/k/v1/records.json?app=${appId}`);

    // Test 3: GET /k/v1/app.json?id=53
    await testUrl(`${baseUrl}/k/v1/app.json?id=${appId}`);
}

run();
