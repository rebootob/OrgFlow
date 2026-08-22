/**
 * App 793 Comprehensive Discovery & Audit Script
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

async function fetchApi(endpoint) {
    const res = await fetch(`${baseUrl}/k/v1/${endpoint}`, { method: 'GET', headers: getHeaders() });
    const data = await res.json();
    return { ok: res.ok, status: res.status, data };
}

async function auditApp793() {
    console.log(`============================================================`);
    console.log(`ORGFLOW — APP 793 FULL DISCOVERY & AUDIT`);
    console.log(`STRICT READ-ONLY / ZERO PRODUCTION WRITES`);
    console.log(`============================================================\n`);

    // 1. App Info
    const appRes = await fetchApi(`app.json?id=793`);
    console.log(`App Info (793):`, appRes.data);

    // 2. Records
    const recordsRes = await fetchApi(`records.json?app=793&query=${encodeURIComponent('limit 500')}`);
    console.log(`Records count in App 793: ${recordsRes.data.records?.length || 0}`);

    // 3. Form Fields
    const formRes = await fetchApi(`app/form/fields.json?app=793`);
    console.log(`Form fields count in App 793: ${Object.keys(formRes.data.properties || {}).length}`);

    // 4. Form Layout
    const layoutRes = await fetchApi(`app/form/layout.json?app=793`);

    // 5. Views
    const viewsRes = await fetchApi(`app/views.json?app=793`);

    // 6. Process Management (Workflow)
    const statusRes = await fetchApi(`app/status.json?app=793`);

    // 7. JS / CSS Customization
    const customizeRes = await fetchApi(`app/customize.json?app=793`);

    // 8. Permissions
    const aclRes = await fetchApi(`app/acl.json?app=793`);
    const recordAclRes = await fetchApi(`record/acl.json?app=793`);
    const fieldAclRes = await fetchApi(`field/acl.json?app=793`);

    const fullAudit = {
        app_info: appRes.data,
        record_count: recordsRes.data.records?.length || 0,
        records: recordsRes.data.records || [],
        form_fields: formRes.data.properties || {},
        layout: layoutRes.data.layout || [],
        views: viewsRes.data.views || {},
        process_management: statusRes.data || {},
        customization: customizeRes.data || {},
        acl: {
            app_acl: aclRes.data || {},
            record_acl: recordAclRes.data || {},
            field_acl: fieldAclRes.data || {}
        }
    };

    const outPath = path.join(rootDir, 'docs', 'APP793_CURRENT_STATE_AUDIT.json');
    fs.writeFileSync(outPath, JSON.stringify(fullAudit, null, 2), 'utf-8');
    console.log(`\nSaved App 793 Current State Audit to: ${outPath}`);

    // Print summary of fields
    console.log(`\n--- CURRENT FORM FIELDS IN APP 793 ---`);
    for (const [code, prop] of Object.entries(formRes.data.properties || {})) {
        if (prop.type !== 'RECORD_NUMBER' && prop.type !== 'MODIFIER' && prop.type !== 'CREATOR' && prop.type !== 'UPDATED_TIME' && prop.type !== 'CREATED_TIME' && prop.type !== 'STATUS' && prop.type !== 'STATUS_ASSIGNEE') {
            console.log(`  [${prop.type}] Code: "${code}" | Label: "${prop.label}" | Required: ${prop.required || false}`);
        }
    }

    // Print process management
    console.log(`\n--- CURRENT PROCESS MANAGEMENT (WORKFLOW) ---`);
    console.log(`Enable Process: ${statusRes.data.enable || false}`);
    if (statusRes.data.states) {
        console.log(`States:`);
        for (const [sName, sObj] of Object.entries(statusRes.data.states)) {
            console.log(`  - "${sName}" (Index: ${sObj.index})`);
        }
    }
    if (statusRes.data.actions) {
        console.log(`Actions:`);
        for (const a of statusRes.data.actions) {
            console.log(`  - "${a.name}": From "${a.from}" -> To "${a.to}" (Filter: ${a.filterCond || 'None'})`);
        }
    }
}

auditApp793().catch(console.error);
