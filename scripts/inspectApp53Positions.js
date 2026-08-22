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

async function inspect() {
    let records = [], offset = 0;
    while (true) {
        const q = encodeURIComponent(`limit 500 offset ${offset}`);
        const res = await fetch(`${baseUrl}/k/v1/records.json?app=53&query=${q}`, { headers: h });
        const data = await res.json();
        records.push(...(data.records || []));
        if ((data.records || []).length < 500) break;
        offset += 500;
    }

    console.log(`Total App 53 records: ${records.length}`);

    const gm = records.filter(r => (r.Text_2?.value || '').toLowerCase().includes('general manager'));
    const md = records.filter(r => (r.Text_2?.value || '').toLowerCase().includes('managing director'));
    const adv = records.filter(r => (r.Text_2?.value || '').toLowerCase().includes('advisor'));

    console.log(`\n=== EMPLOYEES WITH "General Manager" (${gm.length}) ===`);
    gm.forEach(r => console.log(`EmpID: ${r.emp_text?.value || r.Number?.value} | Th: ${r.Text_0?.value} | En: ${r.Text?.value} | Pos: "${r.Text_2?.value}" | Dept: ${r.Drop_down_0?.value} | Sec: ${r.Drop_down?.value}`));

    console.log(`\n=== EMPLOYEES WITH "Managing Director" (${md.length}) ===`);
    md.forEach(r => console.log(`EmpID: ${r.emp_text?.value || r.Number?.value} | Th: ${r.Text_0?.value} | En: ${r.Text?.value} | Pos: "${r.Text_2?.value}" | Dept: ${r.Drop_down_0?.value} | Sec: ${r.Drop_down?.value}`));

    console.log(`\n=== EMPLOYEES WITH "Advisor" (${adv.length}) ===`);
    adv.forEach(r => console.log(`EmpID: ${r.emp_text?.value || r.Number?.value} | Th: ${r.Text_0?.value} | En: ${r.Text?.value} | Pos: "${r.Text_2?.value}" | Dept: ${r.Drop_down_0?.value} | Sec: ${r.Drop_down?.value}`));

    const recs = records.filter(r => ['507', '390', '358', '382'].includes(r.$id.value));
    console.log(`\n=== TARGET RECORDS FULL FIELD DUMP ===`);
    recs.forEach(r => {
        const nonNullFields = {};
        Object.keys(r).forEach(k => {
            if (r[k].value !== '' && r[k].value !== null && r[k].value !== undefined && !(Array.isArray(r[k].value) && r[k].value.length === 0)) {
                nonNullFields[k] = r[k].value;
            }
        });
        console.log(`Record #${r.$id.value}:`, JSON.stringify(nonNullFields, null, 2));
    });
}

inspect();
