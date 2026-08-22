/**
 * OrgFlow Phase 7.3G: Final Position Verification Engine
 * STRICT READ-ONLY / ZERO PRODUCTION WRITES
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const envPath = path.join(rootDir, '.env.local');
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

async function fetchAllRecords(appId) {
    let records = [], offset = 0, fetching = true;
    while (fetching) {
        const q = encodeURIComponent(`limit 500 offset ${offset}`);
        const res = await fetch(`${baseUrl}/k/v1/records.json?app=${appId}&query=${q}`, { method: 'GET', headers: getHeaders() });
        const data = await res.json();
        if (!res.ok) throw new Error(`Failed to fetch App ${appId}: ${JSON.stringify(data)}`);
        records.push(...(data.records || []));
        if ((data.records || []).length < 500) fetching = false;
        else offset += 500;
    }
    return records;
}

async function runVerification() {
    console.log(`Fetching App 53 records...`);
    const app53 = await fetchAllRecords(53);

    // 1. Inspect Case 02, 06, 07, 12
    const targetIds = ['9042', '9000', '9036'];
    const targetRecs = app53.filter(r => {
        const empId = r.emp_text?.value?.trim() || r.Number?.value?.trim();
        return targetIds.includes(empId);
    });

    console.log(`\nTarget Records Found: ${targetRecs.length}`);
    targetRecs.forEach(r => {
        console.log({
            record_id: r.$id.value,
            emp_id: r.emp_text?.value || r.Number?.value,
            thai_name: r.Text_0?.value,
            english_name: r.Text?.value,
            dept: r.Drop_down_0?.value,
            sec: r.Drop_down?.value || r.Drop_down_1?.value,
            pos_text2: r.Text_2?.value,
            raw: Object.keys(r).reduce((acc, k) => {
                if (r[k].value && typeof r[k].value === 'string' && r[k].value.trim()) {
                    acc[k] = r[k].value;
                }
                return acc;
            }, {})
        });
    });

    // 2. Peer Cross Check for GM, MD, Advisor
    console.log(`\n=== PEER CROSS CHECK IN APP 53 ===`);
    const gms = app53.filter(r => (r.Text_2?.value || '').toLowerCase().includes('general manager'));
    const mds = app53.filter(r => (r.Text_2?.value || '').toLowerCase().includes('managing director') || (r.Text_2?.value || '').toLowerCase().includes('director'));
    const advisors = app53.filter(r => (r.Text_2?.value || '').toLowerCase().includes('advisor'));

    console.log(`\nGeneral Managers in App 53: ${gms.length}`);
    gms.forEach(r => console.log(`  #${r.$id.value} ID:${r.emp_text?.value || r.Number?.value} | ${r.Text?.value} | Pos:${r.Text_2?.value} | Dept:${r.Drop_down_0?.value}`));

    console.log(`\nDirectors/MDs in App 53: ${mds.length}`);
    mds.forEach(r => console.log(`  #${r.$id.value} ID:${r.emp_text?.value || r.Number?.value} | ${r.Text?.value} | Pos:${r.Text_2?.value} | Dept:${r.Drop_down_0?.value}`));

    console.log(`\nAdvisors in App 53: ${advisors.length}`);
    advisors.forEach(r => console.log(`  #${r.$id.value} ID:${r.emp_text?.value || r.Number?.value} | ${r.Text?.value} | Pos:${r.Text_2?.value} | Dept:${r.Drop_down_0?.value}`));
}

runVerification().catch(console.error);
