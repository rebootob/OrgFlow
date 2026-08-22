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

async function checkAndConfigureProcessManagement() {
    const res = await fetch(`${baseUrl}/k/v1/preview/app/status.json?app=793`, { headers: getHeaders(false) });
    const data = await res.json();
    console.log(`Current App 793 Process Management:`, data);

    const statusConfig = {
        app: 793,
        enable: true,
        states: {
            "DRAFT": { name: "DRAFT", index: "0" },
            "SUBMITTED": { name: "SUBMITTED", index: "1" },
            "GM_REVIEW": { name: "GM_REVIEW", index: "2" },
            "HR_REVIEW": { name: "HR_REVIEW", index: "3" },
            "APPROVED": { name: "APPROVED", index: "4" },
            "SYSTEM_APPLY": { name: "SYSTEM_APPLY", index: "5" },
            "APPLIED": { name: "APPLIED", index: "6" }
        },
        actions: [
            { name: "Submit Request", from: "DRAFT", to: "SUBMITTED" },
            { name: "Send to GM Review", from: "SUBMITTED", to: "GM_REVIEW" },
            { name: "GM Approve", from: "GM_REVIEW", to: "HR_REVIEW" },
            { name: "GM Reject / Return to Draft", from: "GM_REVIEW", to: "DRAFT" },
            { name: "HR Approve", from: "HR_REVIEW", to: "APPROVED" },
            { name: "HR Return to GM", from: "HR_REVIEW", to: "GM_REVIEW" },
            { name: "Apply Organization Change", from: "APPROVED", to: "SYSTEM_APPLY" },
            { name: "Commit Successful", from: "SYSTEM_APPLY", to: "APPLIED" },
            { name: "Apply Failed / Rollback", from: "SYSTEM_APPLY", to: "APPROVED" }
        ]
    };

    const putRes = await fetch(`${baseUrl}/k/v1/preview/app/status.json`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify(statusConfig)
    });
    const putData = await putRes.json();
    console.log(`Process Management Update Result:`, putData);

    // Deploy
    const deployRes = await fetch(`${baseUrl}/k/v1/preview/app/deploy.json`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify({ apps: [{ app: 793 }] })
    });
    const deployData = await deployRes.json();
    console.log(`App 793 Deploy Result:`, deployData);

    // Wait for deploy
    let deploying = true;
    while (deploying) {
        await new Promise(r => setTimeout(r, 1000));
        const statusRes = await fetch(`${baseUrl}/k/v1/preview/app/deploy.json?apps[0]=793`, { headers: getHeaders(false) });
        const statusData = await statusRes.json();
        const appStatus = statusData.apps?.find(a => String(a.app) === '793');
        if (appStatus && appStatus.status === 'SUCCESS') deploying = false;
    }
    console.log(`[PASS] App 793 Process Management Deployed Successfully.`);
}

checkAndConfigureProcessManagement().catch(console.error);
