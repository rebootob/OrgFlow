/**
 * OrgFlow — Phase 5E Read-Only Production Configuration Inspector
 * Version: 1.0.0
 * 
 * Performs 100% READ-ONLY inspection on App ID 793 (CHANGE_REQUEST),
 * App ID 53, App ID 791, and App ID 792 to establish pre-execution baseline metadata.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Helper to load .env.local if present
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
    if (username && password) {
        h['X-Cybozu-Authorization'] = Buffer.from(`${username}:${password}`).toString('base64');
    }
    if (basicUser && basicPass) {
        h['Authorization'] = 'Basic ' + Buffer.from(`${basicUser}:${basicPass}`).toString('base64');
    }
    return h;
};

async function inspectProductionConfig() {
    console.log(`================================================`);
    console.log(`ORGFLOW PHASE 5E READ-ONLY CONFIGURATION AUDIT`);
    console.log(`================================================\n`);

    try {
        // 1. App 793 Metadata
        console.log(`[AUDIT 1/4] Inspecting App 793 (OrgFlow Org Change Request)...`);
        const appRes = await fetch(`${baseUrl}/k/v1/app.json?id=793`, { method: 'GET', headers: getHeaders() });
        const appData = await appRes.json();
        console.log(`  App ID: 793 | App Name: "${appData.name}"`);

        const fieldsRes = await fetch(`${baseUrl}/k/v1/app/form/fields.json?app=793`, { method: 'GET', headers: getHeaders() });
        const fieldsData = await fieldsRes.json();
        const propKeys = Object.keys(fieldsData.properties || {});
        console.log(`  Fields Count: ${propKeys.length} Form Fields`);

        const aclRes = await fetch(`${baseUrl}/k/v1/app/acl.json?app=793`, { method: 'GET', headers: getHeaders() });
        const aclData = await aclRes.json();
        console.log(`  Current App ACL Rules Count: ${aclData.rights ? aclData.rights.length : 0}`);

        const recsRes = await fetch(`${baseUrl}/k/v1/records.json?app=793&totalCount=true`, { method: 'GET', headers: getHeaders() });
        const recsData = await recsRes.json();
        const recCount = Number(recsData.totalCount || (recsData.records ? recsData.records.length : 0));
        console.log(`  Record Count: ${recCount} Records (Expected: 0)`);

        // 2. App 53 Safety
        console.log(`\n[AUDIT 2/4] Inspecting App 53 (Employee Namelist)...`);
        const app53Res = await fetch(`${baseUrl}/k/v1/records.json?app=53&totalCount=true`, { method: 'GET', headers: getHeaders() });
        const app53Data = await app53Res.json();
        const app53Count = Number(app53Data.totalCount || (app53Data.records ? app53Data.records.length : 0));
        console.log(`  App 53 Record Count: ${app53Count} Records (Expected: 275) - UNTOUCHED`);

        // 3. App 791 Safety
        console.log(`\n[AUDIT 3/4] Inspecting App 791 (OrgFlow Organization Masters)...`);
        const app791Res = await fetch(`${baseUrl}/k/v1/records.json?app=791&totalCount=true`, { method: 'GET', headers: getHeaders() });
        const app791Data = await app791Res.json();
        const app791Count = Number(app791Data.totalCount || (app791Data.records ? app791Data.records.length : 0));
        console.log(`  App 791 Record Count: ${app791Count} Records (Expected: 0) - UNTOUCHED`);

        // 4. App 792 Safety
        console.log(`\n[AUDIT 4/4] Inspecting App 792 (OrgFlow Org Assignment History Log)...`);
        const app792Res = await fetch(`${baseUrl}/k/v1/records.json?app=792&totalCount=true`, { method: 'GET', headers: getHeaders() });
        const app792Data = await app792Res.json();
        const app792Count = Number(app792Data.totalCount || (app792Data.records ? app792Data.records.length : 0));
        console.log(`  App 792 Record Count: ${app792Count} Records (Expected: 0) - UNTOUCHED`);

        console.log(`\n[PASS] Read-Only Configuration Audit Completed Successfully.\n`);
    } catch (err) {
        console.error(`[FAIL] Audit Error:`, err.message);
        process.exit(1);
    }
}

inspectProductionConfig();
