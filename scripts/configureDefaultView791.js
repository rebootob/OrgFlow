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
    'Content-Type': 'application/json',
    'X-Cybozu-Authorization': Buffer.from(process.env.KINTONE_USERNAME + ':' + process.env.KINTONE_PASSWORD).toString('base64'),
    'Authorization': 'Basic ' + Buffer.from(process.env.BASIC_AUTH_USER + ':' + process.env.BASIC_AUTH_PASS).toString('base64')
};

async function setView791() {
    const viewConfig = {
        app: 791,
        views: {
            "All Organizations": {
                name: "All Organizations",
                index: "0",
                type: "LIST",
                fields: [
                    "organization_code",
                    "organization_name",
                    "organization_type",
                    "organization_level",
                    "parent_organization_code",
                    "parent_organization_name",
                    "hierarchy_path",
                    "active_status",
                    "code_status",
                    "source"
                ]
            }
        }
    };
    await fetch(`${baseUrl}/k/v1/preview/app/views.json`, { method: 'PUT', headers: h, body: JSON.stringify(viewConfig) });
    await fetch(`${baseUrl}/k/v1/preview/app/deploy.json`, { method: 'POST', headers: h, body: JSON.stringify({ apps: [{ app: 791 }] }) });

    let deploying = true;
    while (deploying) {
        await new Promise(r => setTimeout(r, 1000));
        const statusRes = await fetch(`${baseUrl}/k/v1/preview/app/deploy.json?apps[0]=791`, {
            headers: {
                'X-Cybozu-Authorization': Buffer.from(process.env.KINTONE_USERNAME + ':' + process.env.KINTONE_PASSWORD).toString('base64'),
                'Authorization': 'Basic ' + Buffer.from(process.env.BASIC_AUTH_USER + ':' + process.env.BASIC_AUTH_PASS).toString('base64')
            }
        });
        const statusData = await statusRes.json();
        const appStatus = statusData.apps?.find(a => String(a.app) === '791');
        if (appStatus && appStatus.status === 'SUCCESS') deploying = false;
    }
    console.log(`[PASS] Default View configured and deployed for App 791.`);
}

setView791().catch(console.error);
