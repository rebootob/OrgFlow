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
    const curStatus = await apiGet('app/status.json?app=793');
    console.log('Current status configuration:', JSON.stringify(curStatus, null, 2));

    // Kintone Process Management valid payload
    const statusPayload = {
        app: 793,
        enable: true,
        states: {
            "DRAFT": {
                name: "DRAFT",
                index: "0",
                assignee: {
                    type: "ONE",
                    entities: []
                }
            },
            "SUBMITTED": {
                name: "SUBMITTED",
                index: "1",
                assignee: {
                    type: "ONE",
                    entities: []
                }
            },
            "HR_REVIEW": {
                name: "HR_REVIEW",
                index: "2",
                assignee: {
                    type: "ONE",
                    entities: []
                }
            },
            "APPROVED": {
                name: "APPROVED",
                index: "3",
                assignee: {
                    type: "ONE",
                    entities: []
                }
            },
            "EXECUTION_PENDING": {
                name: "EXECUTION_PENDING",
                index: "4",
                assignee: {
                    type: "ONE",
                    entities: []
                }
            },
            "EXECUTED": {
                name: "EXECUTED",
                index: "5",
                assignee: {
                    type: "ONE",
                    entities: []
                }
            },
            "RETURNED": {
                name: "RETURNED",
                index: "6",
                assignee: {
                    type: "ONE",
                    entities: []
                }
            },
            "CANCELLED": {
                name: "CANCELLED",
                index: "7",
                assignee: {
                    type: "ONE",
                    entities: []
                }
            },
            "EXECUTION_ERROR": {
                name: "EXECUTION_ERROR",
                index: "8",
                assignee: {
                    type: "ONE",
                    entities: []
                }
            }
        },
        actions: [
            { name: "Submit Request", from: "DRAFT", to: "SUBMITTED" },
            { name: "Start HR Review", from: "SUBMITTED", to: "HR_REVIEW" },
            { name: "Approve Request", from: "HR_REVIEW", to: "APPROVED" },
            { name: "Return to Requester", from: "HR_REVIEW", to: "RETURNED" },
            { name: "Cancel Request", from: "SUBMITTED", to: "CANCELLED" },
            { name: "Re-submit Request", from: "RETURNED", to: "SUBMITTED" },
            { name: "Queue Execution", from: "APPROVED", to: "EXECUTION_PENDING" },
            { name: "Complete Execution", from: "EXECUTION_PENDING", to: "EXECUTED" },
            { name: "Flag Execution Error", from: "EXECUTION_PENDING", to: "EXECUTION_ERROR" },
            { name: "Retry Execution", from: "EXECUTION_ERROR", to: "EXECUTION_PENDING" }
        ]
    };

    console.log('Updating Process Management...');
    const statusRes = await apiPut('preview/app/status.json', statusPayload);
    console.log('Status update result:', statusRes);

    // Deploy
    await deployApp(793);

    // Configure Views after Process Management is deployed
    const viewsPayload = {
        app: 793,
        views: {
            "All Requests — HR/Admin": {
                name: "All Requests — HR/Admin",
                index: "0",
                type: "LIST",
                fields: ["request_id", "request_type", "employee_id", "english_name", "current_organization_code", "proposed_organization_code", "current_position_name", "proposed_position_name", "effective_date", "execution_status"]
            },
            "Draft Requests": {
                name: "Draft Requests",
                index: "1",
                type: "LIST",
                filterCond: 'Status in ("DRAFT", "RETURNED")',
                fields: ["request_id", "request_type", "employee_id", "english_name", "effective_date", "reason"]
            },
            "Pending HR Review": {
                name: "Pending HR Review",
                index: "2",
                type: "LIST",
                filterCond: 'Status in ("SUBMITTED", "HR_REVIEW")',
                fields: ["request_id", "request_type", "employee_id", "english_name", "current_organization_code", "proposed_organization_code", "effective_date", "requested_by"]
            },
            "Approved / Waiting Execution": {
                name: "Approved / Waiting Execution",
                index: "3",
                type: "LIST",
                filterCond: 'Status in ("APPROVED", "EXECUTION_PENDING")',
                fields: ["request_id", "request_type", "employee_id", "english_name", "proposed_organization_code", "proposed_position_name", "effective_date", "approver"]
            },
            "Completed Requests": {
                name: "Completed Requests",
                index: "4",
                type: "LIST",
                filterCond: 'Status in ("EXECUTED")',
                fields: ["request_id", "request_type", "employee_id", "english_name", "proposed_organization_code", "created_assignment_id", "executed_date"]
            },
            "Execution Errors": {
                name: "Execution Errors",
                index: "5",
                type: "LIST",
                filterCond: 'Status in ("EXECUTION_ERROR")',
                fields: ["request_id", "employee_id", "english_name", "effective_date", "execution_error"]
            }
        }
    };
    console.log('Updating Views...');
    const viewsRes = await apiPut('preview/app/views.json', viewsPayload);
    console.log('Views update result:', viewsRes);

    await deployApp(793);
    console.log('App 793 Process Management and Views fully configured and deployed!');
}

run().catch(console.error);
