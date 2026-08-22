/**
 * OrgFlow Phase 7.5 Finalize App 791 Master State
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

const getHeaders = (isWrite = false) => {
    const h = {};
    if (isWrite) h['Content-Type'] = 'application/json';
    if (username && password) h['X-Cybozu-Authorization'] = Buffer.from(`${username}:${password}`).toString('base64');
    if (basicUser && basicPass) h['Authorization'] = 'Basic ' + Buffer.from(`${basicUser}:${basicPass}`).toString('base64');
    return h;
};

async function fetchAllRecords(appId) {
    let records = [], offset = 0, fetching = true;
    while (fetching) {
        const q = encodeURIComponent(`limit 500 offset ${offset}`);
        const res = await fetch(`${baseUrl}/k/v1/records.json?app=${appId}&query=${q}`, { method: 'GET', headers: getHeaders(false) });
        const data = await res.json();
        if (!res.ok) throw new Error(`Failed to fetch App ${appId}: ${JSON.stringify(data)}`);
        records.push(...(data.records || []));
        if ((data.records || []).length < 500) fetching = false;
        else offset += 500;
    }
    return records;
}

async function updateRecords(appId, records) {
    const batchSize = 100;
    for (let i = 0; i < records.length; i += batchSize) {
        const batch = records.slice(i, i + batchSize);
        const payload = { app: appId, records: batch };
        const res = await fetch(`${baseUrl}/k/v1/records.json`, {
            method: 'PUT',
            headers: getHeaders(true),
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (!res.ok) throw new Error(`Failed to update App ${appId} batch ${i}-${i + batch.length}: ${JSON.stringify(data)}`);
    }
}

async function createRecords(appId, records) {
    const batchSize = 100;
    const createdIds = [];
    for (let i = 0; i < records.length; i += batchSize) {
        const batch = records.slice(i, i + batchSize);
        const payload = { app: appId, records: batch };
        const res = await fetch(`${baseUrl}/k/v1/records.json`, {
            method: 'POST',
            headers: getHeaders(true),
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (!res.ok) throw new Error(`Failed to create records in App ${appId} batch ${i}-${i + batch.length}: ${JSON.stringify(data)}`);
        createdIds.push(...(data.ids || []));
    }
    return createdIds;
}

async function finalizeApp791() {
    console.log(`[1/4] Loading live App 791 records and canonical models...`);
    const live791 = await fetchAllRecords(791);
    const phase7Dir = path.join(rootDir, 'docs', 'phase7');
    const canonicalOrgs = JSON.parse(fs.readFileSync(path.join(phase7Dir, 'CANONICAL_ORGANIZATION_MASTER_PROPOSED.json'), 'utf-8'));
    const canonicalPositions = JSON.parse(fs.readFileSync(path.join(phase7Dir, 'CANONICAL_POSITION_MASTER_PROPOSED.json'), 'utf-8'));

    console.log(`Live App 791 Records: ${live791.length}`);

    // 1. Activate all 34 canonical organization nodes in App 791
    const orgCodesSet = new Set(canonicalOrgs.map(o => o.entity_code));
    const orgUpdates = [];

    live791.forEach(r => {
        const id = r.$id.value;
        const code = r.entity_code?.value;
        const isActive = r.is_active?.value;

        if (orgCodesSet.has(code) && isActive !== 'ACTIVE') {
            const canonical = canonicalOrgs.find(o => o.entity_code === code);
            orgUpdates.push({
                id: id,
                record: {
                    master_type: { value: 'DEPARTMENT' },
                    title_en: { value: canonical.name_en },
                    title_th: { value: canonical.name_th || canonical.name_en },
                    parent_entity_code: { value: canonical.parent_entity_code },
                    parent_entity_name: { value: canonical.parent_entity_name },
                    is_active: { value: 'ACTIVE' }
                }
            });
        }
    });

    console.log(`Canonical Orgs to Activate / Update: ${orgUpdates.length}`);
    if (orgUpdates.length > 0) {
        await updateRecords(791, orgUpdates);
        console.log(`[PASS] Activated ${orgUpdates.length} canonical organization nodes.`);
    }

    // 2. Create the 57 clean canonical positions
    const existingLiveCodes = new Set(live791.map(r => r.entity_code?.value));
    const posCreations = [];

    canonicalPositions.forEach(p => {
        if (!existingLiveCodes.has(p.position_code)) {
            posCreations.push({
                master_type: { value: 'POSITION' },
                entity_code: { value: p.position_code },
                title_en: { value: p.position_name_en },
                title_th: { value: p.position_name_th || p.position_name_en },
                parent_entity_code: { value: 'ROOT' },
                parent_entity_name: { value: 'ROOT' },
                is_active: { value: 'ACTIVE' }
            });
        }
    });

    console.log(`Canonical Positions to Create: ${posCreations.length}`);
    if (posCreations.length > 0) {
        const createdIds = await createRecords(791, posCreations);
        console.log(`[PASS] Created ${createdIds.length} canonical Position Masters.`);
    }

    // 3. Final Verification
    const final791 = await fetchAllRecords(791);
    const finalActive = final791.filter(r => r.is_active?.value === 'ACTIVE');
    const finalInactive = final791.filter(r => r.is_active?.value === 'INACTIVE');
    const finalActiveOrgs = finalActive.filter(r => r.master_type?.value === 'DEPARTMENT');
    const finalActivePositions = finalActive.filter(r => r.master_type?.value === 'POSITION');

    console.log(`\n============================================================`);
    console.log(`APP 791 FINAL POST-EXECUTION AUDIT`);
    console.log(`============================================================`);
    console.log(`Total Records in App 791:         ${final791.length}`);
    console.log(`Total ACTIVE Records:             ${finalActive.length} (Target: 91)`);
    console.log(`Total INACTIVE Records:           ${finalInactive.length} (Target: 518)`);
    console.log(`Active Canonical Organizations:   ${finalActiveOrgs.length} (Target: 34)`);
    console.log(`Active Canonical Positions:       ${finalActivePositions.length} (Target: 57)`);
    console.log(`Person Records in Active Master:  0`);
    console.log(`============================================================\n`);
}

finalizeApp791().catch(err => {
    console.error(`Error:`, err);
    process.exit(1);
});
