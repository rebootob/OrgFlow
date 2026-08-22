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
const username = process.env.KINTONE_USERNAME || '';
const password = process.env.KINTONE_PASSWORD || '';
const basicUser = process.env.BASIC_AUTH_USER || '';
const basicPass = process.env.BASIC_AUTH_PASS || '';

const getHeaders = (isWrite = false) => {
    const h = {};
    if (isWrite) h['Content-Type'] = 'application/json';
    if (username && password) h['X-Cybozu-Authorization'] = Buffer.from(`${username}:${password}`).toString('base64');
    if (basicUser && basicPass) h['Authorization'] = 'Basic ' + Buffer.from(`${basicUser}:${basicPass}`).toString('base64');
    return h;
};

async function fixParentCodes() {
    const phase7Dir = path.join(process.cwd(), 'docs', 'phase7');
    const canonicalOrgs = JSON.parse(fs.readFileSync(path.join(phase7Dir, 'CANONICAL_ORGANIZATION_MASTER_PROPOSED.json'), 'utf-8'));

    // Fetch all 791 records
    const res = await fetch(`${baseUrl}/k/v1/records.json?app=791&query=${encodeURIComponent('limit 500')}`, { headers: getHeaders(false) });
    const data = await res.json();
    const res2 = await fetch(`${baseUrl}/k/v1/records.json?app=791&query=${encodeURIComponent('limit 500 offset 500')}`, { headers: getHeaders(false) });
    const data2 = await res2.json();
    const all = [...(data.records || []), ...(data2.records || [])];

    const updates = [];
    all.forEach(r => {
        const code = r.entity_code?.value;
        const matched = canonicalOrgs.find(o => o.entity_code === code);
        if (matched) {
            updates.push({
                id: r.$id.value,
                record: {
                    master_type: { value: 'DEPARTMENT' },
                    parent_code: { value: matched.parent_entity_code },
                    title_en: { value: matched.name_en },
                    title_th: { value: matched.name_th || matched.name_en },
                    is_active: { value: 'ACTIVE' }
                }
            });
        }
    });

    console.log(`Canonical Org records to update parent_code: ${updates.length}`);
    for (let i = 0; i < updates.length; i += 100) {
        const batch = updates.slice(i, i + 100);
        const upRes = await fetch(`${baseUrl}/k/v1/records.json`, {
            method: 'PUT',
            headers: getHeaders(true),
            body: JSON.stringify({ app: 791, records: batch })
        });
        const upData = await upRes.json();
        console.log(`Batch ${i}-${i + batch.length} result:`, upData);
    }
}

fixParentCodes();
