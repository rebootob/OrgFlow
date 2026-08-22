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

async function search791() {
    let records = [];
    let offset = 0;
    while (true) {
        const res = await fetch(`${baseUrl}/k/v1/records.json?app=791&limit=500&offset=${offset}`, { headers: h });
        const data = await res.json();
        records.push(...(data.records || []));
        if ((data.records || []).length < 500) break;
        offset += 500;
    }

    const matches = records.filter(r => {
        const en = (r.title_en?.value || '').toLowerCase();
        const th = (r.title_th?.value || '').toLowerCase();
        const code = (r.entity_code?.value || '').toLowerCase();
        return en.includes('sato') || en.includes('tomita') || en.includes('gaya') || en.includes('panu') ||
               th.includes('ซาโต้') || th.includes('โทมิตะ') || th.includes('กายะ') || th.includes('ภานุ') ||
               code === '9042' || code === '9000' || code === '9036';
    });
    console.log('App 791 matching records:', matches.length);
    matches.forEach(r => console.log({ id: r.$id.value, type: r.master_type?.value, code: r.entity_code?.value, th: r.title_th?.value, en: r.title_en?.value, is_active: r.is_active?.value }));
}
search791();
