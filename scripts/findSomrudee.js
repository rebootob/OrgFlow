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

async function findEmployee() {
    const q53 = encodeURIComponent(`Text like "Somrudee" or Text_0 like "สมฤดี" or Text like "Pannoo"`);
    const res53 = await fetch(`${baseUrl}/k/v1/records.json?app=53&query=${q53}`, { headers: h });
    const d53 = await res53.json();
    console.log(`App 53 Records for Somrudee:`, JSON.stringify(d53.records, null, 2));

    const q792 = encodeURIComponent(`english_name like "Somrudee" or thai_name like "สมฤดี" or english_name like "Pannoo"`);
    const res792 = await fetch(`${baseUrl}/k/v1/records.json?app=792&query=${q792}`, { headers: h });
    const d792 = await res792.json();
    console.log(`App 792 Records for Somrudee:`, JSON.stringify(d792.records, null, 2));
}

findEmployee().catch(console.error);
