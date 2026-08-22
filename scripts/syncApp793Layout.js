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

async function apiDelete(endpoint, body) {
    const res = await fetch(`${baseUrl}/k/v1/${endpoint}`, {
        method: 'DELETE',
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
    // 1. Delete generic redundant approver fields
    console.log('Cleaning redundant generic approval fields in favor of gm_approver...');
    const delRes = await apiDelete('preview/app/form/fields.json', {
        app: 793,
        fields: ['approver', 'approval_date', 'approval_comment']
    });
    console.log('Delete redundant fields result:', delRes);

    // 2. Set clean Layout
    const layoutPayload = {
        app: 793,
        layout: [
            // Section 1: Request Info
            { type: "ROW", fields: [{ type: "SINGLE_LINE_TEXT", code: "request_id", size: { width: "200" } }, { type: "DROP_DOWN", code: "request_type", size: { width: "250" } }] },
            { type: "ROW", fields: [{ type: "DATE", code: "request_date", size: { width: "200" } }, { type: "USER_SELECT", code: "requested_by", size: { width: "250" } }, { type: "DATE", code: "effective_date", size: { width: "200" } }] },
            { type: "ROW", fields: [{ type: "MULTI_LINE_TEXT", code: "reason", size: { width: "450", innerHeight: "80" } }, { type: "MULTI_LINE_TEXT", code: "remarks", size: { width: "350", innerHeight: "80" } }] },

            // Section 2: Employee Info
            { type: "ROW", fields: [{ type: "SINGLE_LINE_TEXT", code: "employee_id", size: { width: "150" } }, { type: "SINGLE_LINE_TEXT", code: "thai_name", size: { width: "250" } }, { type: "SINGLE_LINE_TEXT", code: "english_name", size: { width: "250" } }] },

            // Section 3: Current Assignment (BEFORE)
            { type: "ROW", fields: [{ type: "SINGLE_LINE_TEXT", code: "current_assignment_id", size: { width: "200" } }, { type: "SINGLE_LINE_TEXT", code: "current_assignment_type", size: { width: "200" } }] },
            { type: "ROW", fields: [{ type: "SINGLE_LINE_TEXT", code: "current_position_code", size: { width: "150" } }, { type: "SINGLE_LINE_TEXT", code: "current_position_name", size: { width: "250" } }] },
            { type: "ROW", fields: [{ type: "SINGLE_LINE_TEXT", code: "current_organization_code", size: { width: "150" } }, { type: "SINGLE_LINE_TEXT", code: "current_organization_name", size: { width: "250" } }, { type: "SINGLE_LINE_TEXT", code: "current_organization_type", size: { width: "150" } }] },

            // Section 4: Proposed Assignment (AFTER)
            { type: "ROW", fields: [{ type: "SINGLE_LINE_TEXT", code: "proposed_position_code", size: { width: "150" } }, { type: "SINGLE_LINE_TEXT", code: "proposed_position_name", size: { width: "250" } }, { type: "DROP_DOWN", code: "proposed_assignment_type", size: { width: "200" } }] },
            { type: "ROW", fields: [{ type: "SINGLE_LINE_TEXT", code: "proposed_organization_code", size: { width: "150" } }, { type: "SINGLE_LINE_TEXT", code: "proposed_organization_name", size: { width: "250" } }, { type: "SINGLE_LINE_TEXT", code: "proposed_organization_type", size: { width: "150" } }] },

            // Section 5A: HR Review Info
            { type: "ROW", fields: [{ type: "USER_SELECT", code: "submitted_by", size: { width: "200" } }, { type: "DATETIME", code: "submitted_date", size: { width: "250" } }] },
            { type: "ROW", fields: [{ type: "USER_SELECT", code: "hr_reviewer", size: { width: "200" } }, { type: "DATETIME", code: "hr_review_date", size: { width: "250" } }] },
            { type: "ROW", fields: [{ type: "MULTI_LINE_TEXT", code: "hr_comment", size: { width: "450", innerHeight: "60" } }] },

            // Section 5B: GM Approval Info
            { type: "ROW", fields: [{ type: "USER_SELECT", code: "gm_approver", size: { width: "200" } }, { type: "DATETIME", code: "gm_approval_date", size: { width: "250" } }] },
            { type: "ROW", fields: [{ type: "MULTI_LINE_TEXT", code: "gm_approval_comment", size: { width: "450", innerHeight: "60" } }, { type: "MULTI_LINE_TEXT", code: "reject_reason", size: { width: "350", innerHeight: "60" } }] },

            // Section 6: Execution / Audit Trail
            { type: "ROW", fields: [{ type: "DROP_DOWN", code: "execution_status", size: { width: "200" } }, { type: "USER_SELECT", code: "executed_by", size: { width: "200" } }, { type: "DATETIME", code: "executed_date", size: { width: "250" } }] },
            { type: "ROW", fields: [{ type: "SINGLE_LINE_TEXT", code: "previous_assignment_id", size: { width: "250" } }, { type: "SINGLE_LINE_TEXT", code: "created_assignment_id", size: { width: "250" } }] },
            { type: "ROW", fields: [{ type: "MULTI_LINE_TEXT", code: "execution_error", size: { width: "450", innerHeight: "60" } }, { type: "MULTI_LINE_TEXT", code: "execution_log", size: { width: "450", innerHeight: "60" } }] }
        ]
    };

    console.log('Updating Layout...');
    const layoutRes = await apiPut('preview/app/form/layout.json', layoutPayload);
    console.log('Layout update result:', layoutRes);

    await deployApp(793);
    console.log('App 793 layout and fields 100% synchronized!');
}

run().catch(console.error);
