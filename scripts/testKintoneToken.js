import fs from 'fs';
import path from 'path';

const envPath = path.resolve('.env.local');
const content = fs.readFileSync(envPath, 'utf-8');
const lines = content.split(/\r?\n/);
let baseUrl = '';
let appId = '';
let token = '';

lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith('KINTONE_BASE_URL=')) baseUrl = trimmed.split('=')[1].trim();
    if (trimmed.startsWith('KINTONE_APP_ID=')) appId = trimmed.split('=')[1].trim();
    if (trimmed.startsWith('KINTONE_API_TOKEN=')) token = trimmed.split('=')[1].trim();
});

async function testEndpoints() {
    const endpoints = [
        `/k/v1/records.json?app=${appId}&query=limit%201`,
        `/k/v1/app/form/fields.json?app=${appId}`
    ];

    for (const ep of endpoints) {
        const url = `${baseUrl}${ep}`;
        console.log(`Testing GET ${url}...`);
        try {
            const res = await fetch(url, {
                headers: {
                    'X-Cybozu-API-Token': token,
                    'Content-Type': 'application/json'
                }
            });
            console.log(`HTTP Status: ${res.status}`);
            const text = await res.text();
            console.log(`Response Snippet:`, text.substring(0, 200));
        } catch (e) {
            console.error(`Fetch error:`, e);
        }
    }
}

testEndpoints();
