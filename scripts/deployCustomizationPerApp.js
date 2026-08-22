import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
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
    const bundlePath = path.join(rootDir, 'dist', 'orgflow-explorer-bundle.js');

    // Deploy on App 791 and App 792
    for (const appId of [791, 792]) {
        console.log(`Uploading bundle for App ${appId}...`);
        const fileKey = await uploadFile(bundlePath, 'orgflow-explorer-bundle.js');
        console.log(`FileKey for App ${appId}: ${fileKey}`);

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

        await deployApp(appId);
    }
    console.log('Apps 791 and 792 JavaScript customization active!');
}

run().catch(console.error);
