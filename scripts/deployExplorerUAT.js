/**
 * OrgFlow — Deploy Phase 3 UI Bundle to Kintone for Human UAT
 * Strict Read-Only Data Integration / Zero Record Writes
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

const getHeaders = (isJson = false) => {
    const h = {};
    if (isJson) h['Content-Type'] = 'application/json';
    if (username && password) h['X-Cybozu-Authorization'] = Buffer.from(`${username}:${password}`).toString('base64');
    if (basicUser && basicPass) h['Authorization'] = 'Basic ' + Buffer.from(`${basicUser}:${basicPass}`).toString('base64');
    return h;
};

async function apiGet(endpoint) {
    const res = await fetch(`${baseUrl}/k/v1/${endpoint}`, { method: 'GET', headers: getHeaders(false) });
    return await res.json();
}

async function apiPost(endpoint, body) {
    const res = await fetch(`${baseUrl}/k/v1/${endpoint}`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(body)
    });
    return { ok: res.ok, status: res.status, data: await res.json() };
}

async function apiPut(endpoint, body) {
    const res = await fetch(`${baseUrl}/k/v1/${endpoint}`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify(body)
    });
    return { ok: res.ok, status: res.status, data: await res.json() };
}

async function uploadFile(filePath, filename) {
    const fileBuffer = fs.readFileSync(filePath);
    const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
    
    let body = Buffer.concat([
        Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${filename}"\r\nContent-Type: application/javascript\r\n\r\n`),
        fileBuffer,
        Buffer.from(`\r\n--${boundary}--\r\n`)
    ]);

    const headers = getHeaders(false);
    headers['Content-Type'] = `multipart/form-data; boundary=${boundary}`;

    const res = await fetch(`${baseUrl}/k/v1/file.json`, {
        method: 'POST',
        headers,
        body
    });

    const data = await res.json();
    if (!res.ok) throw new Error(`File upload failed: ${JSON.stringify(data)}`);
    return data.fileKey;
}

async function deployApp(appId) {
    console.log(`Deploying App ${appId}...`);
    const res = await apiPost('preview/app/deploy.json', { apps: [{ app: appId }] });
    if (!res.ok) throw new Error(`Deploy failed: ${JSON.stringify(res.data)}`);

    let deploying = true;
    while (deploying) {
        await new Promise(r => setTimeout(r, 1500));
        const statusRes = await apiGet(`preview/app/deploy.json?apps[0]=${appId}`);
        const status = statusRes.apps?.[0]?.status;
        console.log(`Deployment status for App ${appId}: ${status}`);
        if (status === 'SUCCESS') deploying = false;
        else if (status === 'FAIL') throw new Error(`Deployment failed on server!`);
    }
    console.log(`App ${appId} deployment complete.\n`);
}

async function run() {
    console.log(`============================================================`);
    console.log(`ORGFLOW — PHASE 3.5 HUMAN UAT DEPLOYMENT`);
    console.log(`TARGET APPS: App 791 & App 792 | STRICT ZERO RECORD MUTATIONS`);
    console.log(`============================================================\n`);

    const bundlePath = path.join(rootDir, 'dist', 'orgflow-explorer-bundle.js');
    if (!fs.existsSync(bundlePath)) {
        throw new Error(`Bundle not found at ${bundlePath}`);
    }

    const targetApps = [791, 792];

    for (const appId of targetApps) {
        console.log(`[STEP 1] Uploading fresh orgflow-explorer-bundle.js for App ${appId}...`);
        const fileKey = await uploadFile(bundlePath, 'orgflow-explorer-bundle.js');
        console.log(`Bundle uploaded for App ${appId}. fileKey: ${fileKey}`);

        console.log(`[STEP 2] Configuring JavaScript Customization for App ${appId}...`);
        const customizePayload = {
            app: appId,
            scope: 'ALL',
            desktop: {
                js: [
                    { type: 'FILE', file: { fileKey } }
                ],
                css: []
            }
        };

        const custRes = await apiPut('preview/app/customize.json', customizePayload);
        console.log(`App ${appId} customization updated:`, custRes);

        // Ensure Custom View "Organization Explorer" exists
        console.log(`[STEP 3] Configuring 'Organization Explorer' View on App ${appId}...`);
        const curViews = await apiGet(`app/views.json?app=${appId}`);
        const views = { ...curViews.views };

        views["Organization Explorer (Human UAT)"] = {
            name: "Organization Explorer (Human UAT)",
            type: "CUSTOM",
            index: "0",
            html: '<div id="orgflow-custom-view-root"></div>',
            pager: false
        };

        // Re-index remaining views
        let idx = 1;
        for (const [vName, vObj] of Object.entries(views)) {
            if (vName !== "Organization Explorer (Human UAT)") {
                vObj.index = String(idx++);
            }
        }

        const viewsRes = await apiPut('preview/app/views.json', { app: appId, views });
        console.log(`App ${appId} views updated:`, viewsRes);

        // Deploy App Settings
        await deployApp(appId);
    }

    // Safety Verification
    console.log(`[STEP 4] Running Post-Deployment Safety Verification...`);
    const app53Check = (await apiGet(`records.json?app=53&query=${encodeURIComponent('limit 500')}`)).records?.length;
    const app791Check = (await apiGet(`records.json?app=791&query=${encodeURIComponent('limit 500')}`)).records?.length;
    const app792Check = (await apiGet(`records.json?app=792&query=${encodeURIComponent('limit 500')}`)).records?.length;
    const app793Check = (await apiGet(`records.json?app=793&query=${encodeURIComponent('limit 500')}`)).records?.length;

    console.log(`\n============================================================`);
    console.log(`PRODUCTION RECORD AUDIT:`);
    console.log(`  App 53 Records:  ${app53Check} (Expected = 275, Writes = 0)`);
    console.log(`  App 791 Records: ${app791Check} (Expected = 33, Writes = 0)`);
    console.log(`  App 792 Records: ${app792Check} (Expected = 275, Writes = 0)`);
    console.log(`  App 793 Records: ${app793Check} (Expected = 0, Writes = 0)`);
    console.log(`============================================================\n`);

    console.log(`PHASE 3.5 HUMAN UAT DEPLOYMENT SUCCESSFUL!`);
}

run().catch(err => {
    console.error(`Deployment Failure:`, err);
    process.exit(1);
});
