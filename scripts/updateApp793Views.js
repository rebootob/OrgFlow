import fs from 'fs';
import path from 'path';

const envPath = path.join(process.cwd(), '.env.local');
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

async function apiPut(endpoint, body) {
    const res = await fetch(`${baseUrl}/k/v1/${endpoint}`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify(body)
    });
    return { ok: res.ok, status: res.status, data: await res.json() };
}

async function apiPost(endpoint, body) {
    const res = await fetch(`${baseUrl}/k/v1/${endpoint}`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(body)
    });
    return { ok: res.ok, status: res.status, data: await res.json() };
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
        console.log(`Deployment status: ${status}`);
        if (status === 'SUCCESS') deploying = false;
        else if (status === 'FAIL') throw new Error(`Deployment failed on server!`);
    }
    console.log(`App ${appId} deployment complete.\n`);
}

async function run() {
    const curViews = await apiGet('app/views.json?app=793');
    console.log('Current views:', JSON.stringify(curViews, null, 2));

    const mergedViews = { ...curViews.views };

    mergedViews["(Assigned to me)"].index = "0";

    mergedViews["All Requests — HR/Admin"] = {
        name: "All Requests — HR/Admin",
        index: "1",
        type: "LIST",
        fields: ["request_id", "request_type", "employee_id", "english_name", "current_organization_code", "proposed_organization_code", "current_position_name", "proposed_position_name", "effective_date", "execution_status"]
    };
    mergedViews["Draft Requests"] = {
        name: "Draft Requests",
        index: "2",
        type: "LIST",
        filterCond: 'Status in ("DRAFT", "RETURNED")',
        fields: ["request_id", "request_type", "employee_id", "english_name", "effective_date", "reason"]
    };
    mergedViews["Pending HR Review"] = {
        name: "Pending HR Review",
        index: "3",
        type: "LIST",
        filterCond: 'Status in ("SUBMITTED", "HR_REVIEW")',
        fields: ["request_id", "request_type", "employee_id", "english_name", "current_organization_code", "proposed_organization_code", "effective_date", "requested_by"]
    };
    mergedViews["Approved / Waiting Execution"] = {
        name: "Approved / Waiting Execution",
        index: "4",
        type: "LIST",
        filterCond: 'Status in ("APPROVED", "EXECUTION_PENDING")',
        fields: ["request_id", "request_type", "employee_id", "english_name", "proposed_organization_code", "proposed_position_name", "effective_date", "approver"]
    };
    mergedViews["Completed Requests"] = {
        name: "Completed Requests",
        index: "5",
        type: "LIST",
        filterCond: 'Status in ("EXECUTED")',
        fields: ["request_id", "request_type", "employee_id", "english_name", "proposed_organization_code", "created_assignment_id", "executed_date"]
    };
    mergedViews["Execution Errors"] = {
        name: "Execution Errors",
        index: "6",
        type: "LIST",
        filterCond: 'Status in ("EXECUTION_ERROR")',
        fields: ["request_id", "employee_id", "english_name", "effective_date", "execution_error"]
    };

    console.log('Updating Views with merged views...');
    const viewsRes = await apiPut('preview/app/views.json', { app: 793, views: mergedViews });
    console.log('Views update result:', viewsRes);

    await deployApp(793);
    console.log('Views deployed successfully!');
}

run().catch(console.error);
