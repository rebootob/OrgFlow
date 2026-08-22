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

console.log(`Testing Kintone Password Auth...`);
console.log(`Base URL: ${baseUrl}`);
console.log(`App ID: ${appId}`);
console.log(`Username: [${username}]`);

async function testPasswordAuth() {
    const rawAuth = `${username}:${password}`;
    const base64Auth = Buffer.from(rawAuth).toString('base64');
    
    console.log(`Base64 Auth Header Length: ${base64Auth.length}`);
    
    const endpoints = [
        `/k/v1/app/form/fields.json?app=${appId}`,
        `/k/v1/records.json?app=${appId}&query=${encodeURIComponent('limit 1')}`
    ];

    for (const ep of endpoints) {
        const url = `${baseUrl}${ep}`;
        console.log(`\nFetching ${url}...`);
        try {
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-Cybozu-Authorization': base64Auth,
                    'Host': baseUrl.replace('https://', ''),
                    'User-Agent': 'OrgFlow-Client/1.0'
                }
            });
            console.log(`HTTP Status: ${res.status} ${res.statusText}`);
            const text = await res.text();
            if (res.ok) {
                console.log(`[SUCCESS] API Response:`, text.substring(0, 300));
            } else {
                console.log(`[FAILED] Response Snippet:`, text.substring(0, 300));
            }
        } catch (e) {
            console.error(`Fetch Error:`, e);
        }
    }
}

testPasswordAuth();
