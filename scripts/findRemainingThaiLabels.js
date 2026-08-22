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

async function inspectLabels(appId) {
    const res = await fetch(`${baseUrl}/k/v1/app/form/fields.json?app=${appId}`, { headers: h });
    const data = await res.json();
    const isThai = str => /[\u0E00-\u0E7F]/.test(str);
    console.log(`\nApp ${appId} Thai Labels:`);
    Object.values(data.properties || {}).forEach(f => {
        if (isThai(f.label)) {
            console.log(`  code: ${f.code} | label: ${f.label} | type: ${f.type}`);
        }
    });
}

async function main() {
    await inspectLabels(792);
    await inspectLabels(793);
}

main().catch(console.error);
