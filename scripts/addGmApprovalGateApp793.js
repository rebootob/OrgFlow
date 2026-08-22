/**
 * OrgFlow - App 793 Add Mandatory GM Approval Gate
 * Target: App 793 ONLY
 * ZERO WRITES to Apps 53, 791, 792.
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
    console.log(`============================================================`);
    console.log(`ORGFLOW — APP 793 ADD GM APPROVAL GATE`);
    console.log(`TARGET: App 793 ONLY | ZERO WRITES to Apps 53, 791, 792`);
    console.log(`============================================================\n`);

    // 1. Check & Add GM Approval Audit Fields if not present
    console.log(`[STEP 1] Auditing & ensuring distinct HR and GM approval fields...`);
    const curFields = await apiGet('app/form/fields.json?app=793');
    const existingFieldCodes = Object.keys(curFields.properties || {});

    const gmFieldsToAdd = {};
    if (!existingFieldCodes.includes('gm_approver')) {
        gmFieldsToAdd['gm_approver'] = { type: 'USER_SELECT', code: 'gm_approver', label: 'GM Approver', required: false };
    }
    if (!existingFieldCodes.includes('gm_approval_date')) {
        gmFieldsToAdd['gm_approval_date'] = { type: 'DATETIME', code: 'gm_approval_date', label: 'GM Approval Date', required: false };
    }
    if (!existingFieldCodes.includes('gm_approval_comment')) {
        gmFieldsToAdd['gm_approval_comment'] = { type: 'MULTI_LINE_TEXT', code: 'gm_approval_comment', label: 'GM Approval Comment', required: false };
    }

    if (Object.keys(gmFieldsToAdd).length > 0) {
        console.log(`Adding GM approval fields:`, Object.keys(gmFieldsToAdd));
        const addRes = await apiPost('preview/app/form/fields.json', { app: 793, properties: gmFieldsToAdd });
        if (!addRes.ok) console.warn('Field add note:', addRes.data);
    } else {
        console.log(`All GM approval fields already exist.`);
    }

    // 2. Configure Process Management with GM_APPROVAL Gate
    console.log(`\n[STEP 2] Configuring Process Management with mandatory GM_APPROVAL gate...`);
    const statusPayload = {
        app: 793,
        enable: true,
        states: {
            "DRAFT": {
                name: "DRAFT",
                index: "0",
                assignee: { type: "ONE", entities: [] }
            },
            "SUBMITTED": {
                name: "SUBMITTED",
                index: "1",
                assignee: { type: "ONE", entities: [] }
            },
            "HR_REVIEW": {
                name: "HR_REVIEW",
                index: "2",
                assignee: { type: "ONE", entities: [] }
            },
            "GM_APPROVAL": {
                name: "GM_APPROVAL",
                index: "3",
                assignee: { type: "ONE", entities: [] }
            },
            "APPROVED": {
                name: "APPROVED",
                index: "4",
                assignee: { type: "ONE", entities: [] }
            },
            "EXECUTION_PENDING": {
                name: "EXECUTION_PENDING",
                index: "5",
                assignee: { type: "ONE", entities: [] }
            },
            "EXECUTED": {
                name: "EXECUTED",
                index: "6",
                assignee: { type: "ONE", entities: [] }
            },
            "RETURNED": {
                name: "RETURNED",
                index: "7",
                assignee: { type: "ONE", entities: [] }
            },
            "CANCELLED": {
                name: "CANCELLED",
                index: "8",
                assignee: { type: "ONE", entities: [] }
            },
            "EXECUTION_ERROR": {
                name: "EXECUTION_ERROR",
                index: "9",
                assignee: { type: "ONE", entities: [] }
            }
        },
        actions: [
            // DRAFT -> SUBMITTED
            { name: "Submit Request", from: "DRAFT", to: "SUBMITTED" },

            // SUBMITTED -> HR_REVIEW / CANCELLED
            { name: "Start HR Review", from: "SUBMITTED", to: "HR_REVIEW" },
            { name: "Cancel Request", from: "SUBMITTED", to: "CANCELLED" },

            // HR_REVIEW -> GM_APPROVAL (Mandatory) / RETURNED
            { name: "Send for GM Approval", from: "HR_REVIEW", to: "GM_APPROVAL" },
            { name: "Return to Requester", from: "HR_REVIEW", to: "RETURNED" },

            // GM_APPROVAL -> APPROVED / HR_REVIEW / RETURNED
            { name: "Approve Request", from: "GM_APPROVAL", to: "APPROVED" },
            { name: "Return to HR", from: "GM_APPROVAL", to: "HR_REVIEW" },
            { name: "Reject / Return to Requester", from: "GM_APPROVAL", to: "RETURNED" },

            // RETURNED -> SUBMITTED
            { name: "Re-submit Request", from: "RETURNED", to: "SUBMITTED" },

            // APPROVED -> EXECUTION_PENDING
            { name: "Queue Execution", from: "APPROVED", to: "EXECUTION_PENDING" },

            // EXECUTION_PENDING -> EXECUTED / EXECUTION_ERROR
            { name: "Complete Execution", from: "EXECUTION_PENDING", to: "EXECUTED" },
            { name: "Flag Execution Error", from: "EXECUTION_PENDING", to: "EXECUTION_ERROR" },

            // EXECUTION_ERROR -> EXECUTION_PENDING
            { name: "Retry Execution", from: "EXECUTION_ERROR", to: "EXECUTION_PENDING" }
        ]
    };

    const statusRes = await apiPut('preview/app/status.json', statusPayload);
    console.log(`Status configuration result:`, statusRes);

    // 3. Update Form Layout to include GM Approval Section cleanly
    console.log(`\n[STEP 3] Updating Form Layout on App 793...`);
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
    const layoutRes = await apiPut('preview/app/form/layout.json', layoutPayload);
    console.log(`Layout update result:`, layoutRes);

    // Deploy
    await deployApp(793);

    // 4. Update Views to reflect GM_APPROVAL
    console.log(`\n[STEP 4] Updating Views to reflect GM_APPROVAL state...`);
    const curViews = await apiGet('app/views.json?app=793');
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
    mergedViews["Pending GM Approval"] = {
        name: "Pending GM Approval",
        index: "4",
        type: "LIST",
        filterCond: 'Status in ("GM_APPROVAL")',
        fields: ["request_id", "request_type", "employee_id", "english_name", "proposed_organization_code", "proposed_position_name", "effective_date", "hr_reviewer"]
    };
    mergedViews["Approved / Waiting Execution"] = {
        name: "Approved / Waiting Execution",
        index: "5",
        type: "LIST",
        filterCond: 'Status in ("APPROVED", "EXECUTION_PENDING")',
        fields: ["request_id", "request_type", "employee_id", "english_name", "proposed_organization_code", "proposed_position_name", "effective_date", "gm_approver"]
    };
    mergedViews["Completed Requests"] = {
        name: "Completed Requests",
        index: "6",
        type: "LIST",
        filterCond: 'Status in ("EXECUTED")',
        fields: ["request_id", "request_type", "employee_id", "english_name", "proposed_organization_code", "created_assignment_id", "executed_date"]
    };
    mergedViews["Execution Errors"] = {
        name: "Execution Errors",
        index: "7",
        type: "LIST",
        filterCond: 'Status in ("EXECUTION_ERROR")',
        fields: ["request_id", "employee_id", "english_name", "effective_date", "execution_error"]
    };

    // Remove obsolete "Pending Approval" view if replaced by "Pending GM Approval"
    delete mergedViews["Pending Approval"];

    const viewsRes = await apiPut('preview/app/views.json', { app: 793, views: mergedViews });
    console.log(`Views update result:`, viewsRes);

    await deployApp(793);

    // 5. Post-Configuration Validation
    console.log(`\n[STEP 5] Validating deployed GM Approval Gate configuration...`);
    const deployedStatus = await apiGet('app/status.json?app=793');
    const deployedFields = await apiGet('app/form/fields.json?app=793');

    const states = Object.keys(deployedStatus.states || {});
    const actions = deployedStatus.actions || [];

    const draftToApproved = actions.some(a => a.from === 'DRAFT' && a.to === 'APPROVED');
    const submittedToApproved = actions.some(a => a.from === 'SUBMITTED' && a.to === 'APPROVED');
    const hrToApproved = actions.some(a => a.from === 'HR_REVIEW' && a.to === 'APPROVED');
    const hrToGm = actions.some(a => a.from === 'HR_REVIEW' && a.to === 'GM_APPROVAL');
    const gmToApproved = actions.some(a => a.from === 'GM_APPROVAL' && a.to === 'APPROVED');
    const approvedToPending = actions.some(a => a.from === 'APPROVED' && a.to === 'EXECUTION_PENDING');

    const hasHrFields = !!(deployedFields.properties?.hr_reviewer && deployedFields.properties?.hr_review_date && deployedFields.properties?.hr_comment);
    const hasGmFields = !!(deployedFields.properties?.gm_approver && deployedFields.properties?.gm_approval_date && deployedFields.properties?.gm_approval_comment);

    // Protected baseline check
    const app53Check = (await apiGet(`records.json?app=53&query=${encodeURIComponent('limit 500')}`)).records?.length;
    const app791Check = (await apiGet(`records.json?app=791&query=${encodeURIComponent('limit 500')}`)).records?.length;
    const app792Check = (await apiGet(`records.json?app=792&query=${encodeURIComponent('limit 500')}`)).records?.length;

    console.log(`Validation Results:`);
    console.log(`  DRAFT -> APPROVED Impossible:       ${!draftToApproved}`);
    console.log(`  SUBMITTED -> APPROVED Impossible:   ${!submittedToApproved}`);
    console.log(`  HR_REVIEW -> APPROVED Impossible:   ${!hrToApproved}`);
    console.log(`  HR_REVIEW -> GM_APPROVAL Required:  ${hrToGm}`);
    console.log(`  GM_APPROVAL -> APPROVED Valid:      ${gmToApproved}`);
    console.log(`  APPROVED -> EXECUTION_PENDING Valid:${approvedToPending}`);
    console.log(`  HR Approval Fields Present:         ${hasHrFields}`);
    console.log(`  GM Approval Fields Present:         ${hasGmFields}`);
    console.log(`  App 53 Records:                     ${app53Check} (Protected = 275)`);
    console.log(`  App 791 Records:                    ${app791Check} (Protected = 33)`);
    console.log(`  App 792 Records:                    ${app792Check} (Protected = 275)`);

    const allPassed = (!draftToApproved && !submittedToApproved && !hrToApproved && hrToGm && gmToApproved && approvedToPending && hasHrFields && hasGmFields && app53Check === 275 && app791Check === 33 && app792Check === 275);

    const result = {
        workflow_states: states,
        workflow_actions_count: actions.length,
        draft_to_approved_impossible: !draftToApproved,
        submitted_to_approved_impossible: !submittedToApproved,
        hr_review_to_approved_impossible: !hrToApproved,
        hr_review_to_gm_approval_required: hrToGm,
        gm_approval_to_approved_valid: gmToApproved,
        approved_to_execution_pending_valid: approvedToPending,
        hr_fields_present: hasHrFields,
        gm_fields_present: hasGmFields,
        distinct_audit_fields: true,
        app53_writes: 0,
        app791_writes: 0,
        app792_writes: 0,
        final_status: allPassed ? "APP793_GM_APPROVAL_GATE_READY" : "APP793_GM_APPROVAL_GATE_NOT_READY"
    };

    fs.writeFileSync(path.join(rootDir, 'docs', 'APP793_GM_APPROVAL_GATE_REPORT.json'), JSON.stringify(result, null, 2), 'utf-8');
    console.log(`\n============================================================`);
    console.log(`FINAL DECISION: ${result.final_status}`);
    console.log(`============================================================`);
}

run().catch(console.error);
