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

const baseUrl = envVars.KINTONE_BASE_URL || 'https://ttmet.cybozu.com';
const appId = envVars.KINTONE_APP_ID || '53';
const token = envVars.KINTONE_API_TOKEN || '';
const username = envVars.KINTONE_USERNAME || '';
const password = envVars.KINTONE_PASSWORD || '';
const basicUser = envVars.BASIC_AUTH_USER || '';
const basicPass = envVars.BASIC_AUTH_PASS || '';

console.log(`=== KINTONE AUTH DIAGNOSTIC ===`);
console.log(`Base URL: ${baseUrl}`);
console.log(`App ID: ${appId}`);
console.log(`API Token Present: ${Boolean(token)} (Len: ${token.length})`);
console.log(`Username Present: ${Boolean(username)}`);
console.log(`Basic Auth Present: ${Boolean(basicUser)}`);

async function testCombination(label, customHeaders) {
    console.log(`\n--- Testing ${label} ---`);
    const url = `${baseUrl}/k/v1/records.json?app=${appId}&query=${encodeURIComponent('limit 1')}`;
    try {
        const res = await fetch(url, { headers: customHeaders });
        console.log(`HTTP Status: ${res.status} ${res.statusText}`);
        const text = await res.text();
        if (res.ok) {
            console.log(`SUCCESS! Received JSON response length: ${text.length}`);
            const data = JSON.parse(text);
            console.log(`Records retrieved: ${data.records ? data.records.length : 0}`);
            return true;
        } else {
            console.log(`Response Snippet: ${text.substring(0, 250)}`);
            return false;
        }
    } catch (e) {
        console.error(`Request Failed:`, e.message);
        return false;
    }
}

async function runAllTests() {
    // Test 1: API Token Header
    const h1 = { 'X-Cybozu-API-Token': token };
    if (basicUser && basicPass) {
        h1['Authorization'] = 'Basic ' + Buffer.from(`${basicUser}:${basicPass}`).toString('base64');
    }
    await testCombination('API Token Header', h1);

    // Test 2: Username & Password Auth
    if (username && password) {
        const authStr = Buffer.from(`${username}:${password}`).toString('base64');
        const h2 = { 'X-Cybozu-Authorization': authStr };
        if (basicUser && basicPass) {
            h2['Authorization'] = 'Basic ' + Buffer.from(`${basicUser}:${basicPass}`).toString('base64');
        }
        await testCombination('Username/Password Auth Header', h2);
    }
}

runAllTests();
