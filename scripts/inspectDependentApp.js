/**
 * OrgFlow — Read-Only Dependent App Inspector Engine
 * Version: 1.0.0
 * 
 * Performs 100% READ-ONLY inspection of downstream dependent App ID 139
 * on https://ttmet.cybozu.com using verified user credentials.
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
const targetAppId = '139';
const masterAppId = '53';
const username = process.env.KINTONE_USERNAME || '';
const password = process.env.KINTONE_PASSWORD || '';
const basicUser = process.env.BASIC_AUTH_USER || '';
const basicPass = process.env.BASIC_AUTH_PASS || '';

const headers = {};
if (username && password) {
    headers['X-Cybozu-Authorization'] = Buffer.from(`${username}:${password}`).toString('base64');
}
if (basicUser && basicPass) {
    headers['Authorization'] = 'Basic ' + Buffer.from(`${basicUser}:${basicPass}`).toString('base64');
}

async function inspectDependentApp() {
    console.log(`================================================`);
    console.log(`ORGFLOW DEPENDENT APP INSPECTOR (APP ID: ${targetAppId})`);
    console.log(`================================================`);
    console.log(`Domain: ${baseUrl}\n`);

    try {
        // 1. Fetch App Metadata
        console.log(`[STEP 1/3] Fetching App Metadata (GET /k/v1/app.json?id=${targetAppId})...`);
        const appRes = await fetch(`${baseUrl}/k/v1/app.json?id=${targetAppId}`, { method: 'GET', headers });
        if (!appRes.ok) {
            const errText = await appRes.text();
            throw new Error(`Failed to fetch App Metadata (${appRes.status}): ${errText}`);
        }
        const appData = await appRes.json();
        console.log(`[PASS] Target App Verified: ID=${appData.appId}, Name="${appData.name}", Revision=${appData.revision}`);

        // 2. Fetch Form Fields Metadata
        console.log(`\n[STEP 2/3] Fetching Form Fields Metadata (GET /k/v1/app/form/fields.json?app=${targetAppId})...`);
        const fieldsRes = await fetch(`${baseUrl}/k/v1/app/form/fields.json?app=${targetAppId}`, { method: 'GET', headers });
        if (!fieldsRes.ok) {
            const errText = await fieldsRes.text();
            throw new Error(`Failed to fetch Form Fields (${fieldsRes.status}): ${errText}`);
        }
        const fieldsData = await fieldsRes.json();
        const fieldProperties = fieldsData.properties || {};
        console.log(`[PASS] Retrieved ${Object.keys(fieldProperties).length} fields from App ${targetAppId}`);

        // 3. Analyze Lookups and References to Employee Namelist (App 53)
        console.log(`\n[STEP 3/3] Analyzing Lookups & References to App ${masterAppId} ("Employee Namelist")...`);
        const lookupsFound = [];

        Object.entries(fieldProperties).forEach(([code, f]) => {
            if (f.lookup) {
                const relatedAppId = f.lookup.relatedApp ? String(f.lookup.relatedApp.app) : '';
                lookupsFound.push({
                    fieldCode: code,
                    label: f.label,
                    type: f.type,
                    relatedAppId: relatedAppId,
                    relatedKeyField: f.lookup.relatedKeyField,
                    copiedFields: f.lookup.fieldMappings ? f.lookup.fieldMappings.map(m => `${m.field} <- ${m.relatedField}`) : []
                });
            }

            if (f.type === 'REFERENCE_TABLE' && f.referenceTable) {
                const relatedAppId = f.referenceTable.relatedApp ? String(f.referenceTable.relatedApp.app) : '';
                lookupsFound.push({
                    fieldCode: code,
                    label: f.label,
                    type: 'REFERENCE_TABLE',
                    relatedAppId: relatedAppId,
                    condition: f.referenceTable.condition ? `${f.referenceTable.condition.field} = ${f.referenceTable.condition.relatedField}` : ''
                });
            }
        });

        console.log(`Found ${lookupsFound.length} lookup/reference fields in App ${targetAppId}:`);
        lookupsFound.forEach(l => {
            console.log(`- Field "${l.label}" (\`${l.fieldCode}\`, Type: ${l.type}):`);
            console.log(`  Target App ID: ${l.relatedAppId} ${l.relatedAppId === masterAppId ? '★ (LOOKUP TO APP 53!)' : ''}`);
            if (l.relatedKeyField) console.log(`  Source Key Field in App 53: \`${l.relatedKeyField}\``);
            if (l.copiedFields && l.copiedFields.length > 0) console.log(`  Copied Fields: ${l.copiedFields.join(', ')}`);
        });

        // Write discovery output JSON
        const outputDir = path.join(rootDir, 'docs', 'discovery');
        fs.mkdirSync(outputDir, { recursive: true });

        const report = {
            appId: targetAppId,
            appName: appData.name,
            revision: appData.revision,
            totalFields: Object.keys(fieldProperties).length,
            lookups: lookupsFound,
            timestamp: new Date().toISOString()
        };

        fs.writeFileSync(path.join(outputDir, `app_${targetAppId}_discovery.json`), JSON.stringify(report, null, 2), 'utf-8');
        console.log(`\n[PASS] Saved discovery output to docs/discovery/app_${targetAppId}_discovery.json`);

    } catch (err) {
        console.error(`\n[CRITICAL ERROR] App ${targetAppId} Inspection Failed:`, err.message);
    }
}

inspectDependentApp();
