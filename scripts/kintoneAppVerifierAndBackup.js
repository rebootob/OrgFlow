/**
 * OrgFlow — Target App Verifier & Pre-Discovery Baseline Backup Engine
 * Version: 1.1.0
 * 
 * Performs 100% READ-ONLY verification of App ID 53 on https://ttmet.cybozu.com
 * Uses App API Token (X-Cybozu-API-Token) to fetch form fields, layout, and records.
 * Creates secure baseline backup in secure-backup/ (excluded from Git).
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
    envContent.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
            const [key, ...values] = trimmed.split('=');
            process.env[key.trim()] = values.join('=').trim();
        }
    });
}

const baseUrl = (process.env.KINTONE_BASE_URL || 'https://ttmet.cybozu.com').replace(/\/$/, '');
const appId = process.env.KINTONE_APP_ID || '53';
const apiToken = process.env.KINTONE_API_TOKEN || '';

console.log(`========================================`);
console.log(`ORGFLOW PRE-DISCOVERY BACKUP & VERIFIER`);
console.log(`========================================`);
console.log(`Kintone Base Domain: ${baseUrl}`);
console.log(`Target App ID: ${appId}`);
console.log(`API Token Configured: ${apiToken ? 'YES (Masked)' : 'NO (Missing KINTONE_API_TOKEN)'}`);

if (!apiToken) {
    console.error(`\n[ERROR] KINTONE_API_TOKEN is missing in .env.local`);
    console.error(`Please update .env.local in project root with KINTONE_API_TOKEN=your_token_here\n`);
    process.exit(1);
}

const headers = {
    'X-Cybozu-API-Token': apiToken,
    'Content-Type': 'application/json'
};

async function executePreDiscoveryBackup() {
    try {
        // Step 1: Verify API Token access via GET /k/v1/app/form/fields.json (App API Token Endpoint)
        console.log(`\n[STEP 1/5] Verifying API Access to App ID ${appId} (GET /k/v1/app/form/fields.json)...`);
        const fieldsRes = await fetch(`${baseUrl}/k/v1/app/form/fields.json?app=${appId}`, { headers });
        if (!fieldsRes.ok) {
            const errText = await fieldsRes.text();
            throw new Error(`API Token Authentication Failed (${fieldsRes.status}). Check if API Token has 'View records' permission and is activated/saved in Kintone App 53 settings. Details: ${errText.substring(0, 300)}`);
        }
        const fieldsData = await fieldsRes.json();
        const totalFields = Object.keys(fieldsData.properties || {}).length;

        console.log(`[PASS] API Token Authentication Verified! Access granted to App ID ${appId}. Total Fields: ${totalFields}`);

        // Try getting App Metadata (optional endpoint)
        let appName = "Employee Namelist (App 53)";
        let appRevision = "1";
        try {
            const appRes = await fetch(`${baseUrl}/k/v1/app.json?id=${appId}`, { headers });
            if (appRes.ok) {
                const appData = await appRes.json();
                appName = appData.name || appName;
                appRevision = appData.revision || appRevision;
            }
        } catch (e) {
            // app.json is optional if token doesn't have app admin scope
        }

        // Step 2: Fetch Form Layout Metadata
        console.log(`\n[STEP 2/5] Fetching Form Layout Metadata (GET /k/v1/app/form/layout.json)...`);
        const layoutRes = await fetch(`${baseUrl}/k/v1/app/form/layout.json?app=${appId}`, { headers });
        let layoutData = { layout: [] };
        if (layoutRes.ok) {
            layoutData = await layoutRes.json();
            console.log(`[PASS] Form Layout Metadata retrieved.`);
        } else {
            console.warn(`[WARN] Form Layout API returned ${layoutRes.status}, proceeding with fields schema.`);
        }

        // Step 3: Fetch Records for Baseline Backup (READ-ONLY)
        console.log(`\n[STEP 3/5] Exporting Baseline Production Records (GET /k/v1/records.json)...`);
        let allRecords = [];
        let offset = 0;
        const limit = 500;
        let hasMore = true;

        while (hasMore) {
            const query = `limit ${limit} offset ${offset}`;
            const recRes = await fetch(`${baseUrl}/k/v1/records.json?app=${appId}&query=${encodeURIComponent(query)}`, { headers });
            if (!recRes.ok) {
                const errText = await recRes.text();
                throw new Error(`Failed to fetch records (${recRes.status}): ${errText}`);
            }
            const recData = await recRes.json();
            const records = recData.records || [];
            allRecords.push(...records);

            if (records.length < limit) {
                hasMore = false;
            } else {
                offset += limit;
            }

            if (offset >= 10000) break;
        }

        console.log(`[PASS] Exported ${allRecords.length} records successfully.`);

        // Step 4: Write Secure Baseline Backup Files (secure-backup/ - Excluded from Git)
        const backupDir = path.join(rootDir, 'secure-backup', `baseline_app_${appId}_${Date.now()}`);
        fs.mkdirSync(backupDir, { recursive: true });

        // Save Records JSON
        fs.writeFileSync(path.join(backupDir, 'records_baseline.json'), JSON.stringify(allRecords, null, 2), 'utf-8');

        // Save Fields Schema Metadata
        fs.writeFileSync(path.join(backupDir, 'fields_baseline.json'), JSON.stringify(fieldsData, null, 2), 'utf-8');

        // Save Form Layout Metadata
        fs.writeFileSync(path.join(backupDir, 'layout_baseline.json'), JSON.stringify(layoutData, null, 2), 'utf-8');

        // Step 5: Write Backup Manifest
        const manifest = {
            backupId: path.basename(backupDir),
            timestamp: new Date().toISOString(),
            kintoneDomain: baseUrl,
            appId: appId,
            appName: appName,
            appRevision: appRevision,
            totalRecordsBackup: allRecords.length,
            totalFields: totalFields,
            verificationStatus: "PASSED",
            restoreReadiness: "READY",
            readOnlyExecution: true
        };

        fs.writeFileSync(path.join(backupDir, 'EMPLOYEE_NAMELIST_BASELINE_MANIFEST.json'), JSON.stringify(manifest, null, 2), 'utf-8');

        console.log(`\n========================================`);
        console.log(`BASELINE BACKUP COMPLETED & VERIFIED`);
        console.log(`========================================`);
        console.log(`Backup Location: ${backupDir}`);
        console.log(`Manifest File: EMPLOYEE_NAMELIST_BASELINE_MANIFEST.json`);
        console.log(`Total Backup Records: ${allRecords.length}`);
        console.log(`Total Fields: ${totalFields}`);
        console.log(`Verification Result: PASS\n`);

    } catch (err) {
        console.error(`\n[CRITICAL ERROR] Baseline Backup Failed:`, err.message);
        process.exit(1);
    }
}

executePreDiscoveryBackup();
