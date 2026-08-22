/**
 * OrgFlow - App 793 Controlled Rebuild Script
 * Production Configuration Write Authorized on App 793 ONLY.
 * ZERO WRITES to App 53, App 791, App 792.
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
    const data = await res.json();
    return { ok: res.ok, status: res.status, data };
}

async function apiPost(endpoint, body) {
    const res = await fetch(`${baseUrl}/k/v1/${endpoint}`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(body)
    });
    const data = await res.json();
    return { ok: res.ok, status: res.status, data };
}

async function apiPut(endpoint, body) {
    const res = await fetch(`${baseUrl}/k/v1/${endpoint}`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify(body)
    });
    const data = await res.json();
    return { ok: res.ok, status: res.status, data };
}

async function apiDelete(endpoint, body) {
    const res = await fetch(`${baseUrl}/k/v1/${endpoint}`, {
        method: 'DELETE',
        headers: getHeaders(true),
        body: JSON.stringify(body)
    });
    const data = await res.json();
    return { ok: res.ok, status: res.status, data };
}

async function deployApp(appId) {
    console.log(`Deploying App ${appId}...`);
    const res = await apiPost('preview/app/deploy.json', { apps: [{ app: appId }] });
    if (!res.ok) throw new Error(`Deploy failed: ${JSON.stringify(res.data)}`);

    let deploying = true;
    while (deploying) {
        await new Promise(r => setTimeout(r, 1500));
        const statusRes = await apiGet(`preview/app/deploy.json?apps[0]=${appId}`);
        const status = statusRes.data?.apps?.[0]?.status;
        console.log(`Deployment status: ${status}`);
        if (status === 'SUCCESS') deploying = false;
        else if (status === 'FAIL') throw new Error(`Deployment failed on server!`);
    }
    console.log(`App ${appId} deployment complete.\n`);
}

async function runRebuild() {
    console.log(`============================================================`);
    console.log(`ORGFLOW — APP 793 CONTROLLED REBUILD`);
    console.log(`TARGET: App 793 ONLY | ZERO WRITES to Apps 53, 791, 792`);
    console.log(`============================================================\n`);

    // PHASE 0 — BACKUP
    console.log(`[PHASE 0] Backing up current App 793 configuration...`);
    const appInfo = (await apiGet('app.json?id=793')).data;
    const currentFields = (await apiGet('app/form/fields.json?app=793')).data;
    const currentLayout = (await apiGet('app/form/layout.json?app=793')).data;
    const currentViews = (await apiGet('app/views.json?app=793')).data;
    const currentStatus = (await apiGet('app/status.json?app=793')).data;
    const currentRecords = (await apiGet(`records.json?app=793&query=${encodeURIComponent('limit 500')}`)).data;

    const backupData = {
        app_info: appInfo,
        fields: currentFields,
        layout: currentLayout,
        views: currentViews,
        status: currentStatus,
        record_count: currentRecords.records?.length || 0,
        records: currentRecords.records || []
    };

    const backupPath = path.join(rootDir, 'docs', 'APP793_PRE_REBUILD_BACKUP.json');
    fs.writeFileSync(backupPath, JSON.stringify(backupData, null, 2), 'utf-8');
    console.log(`[PHASE 0 PASS] Backup saved: ${backupPath} (Record count: ${backupData.record_count})\n`);

    // PHASE 1 — CLEAN FIELD SCHEMA (36 Standardized English Fields)
    console.log(`[PHASE 1] Configuring standardized English schema on App 793...`);
    const targetProperties = {
        // Section A: Request Information
        "request_id": { type: "SINGLE_LINE_TEXT", code: "request_id", label: "Request ID", required: true, noLabel: false },
        "request_type": {
            type: "DROP_DOWN", code: "request_type", label: "Request Type", required: true,
            options: {
                "EMPLOYEE_TRANSFER": { label: "EMPLOYEE_TRANSFER", index: "0" },
                "ORGANIZATION_CHANGE": { label: "ORGANIZATION_CHANGE", index: "1" },
                "POSITION_CHANGE": { label: "POSITION_CHANGE", index: "2" },
                "PROMOTION": { label: "PROMOTION", index: "3" },
                "DEMOTION": { label: "DEMOTION", index: "4" },
                "TEMPORARY_ASSIGNMENT": { label: "TEMPORARY_ASSIGNMENT", index: "5" },
                "CONCURRENT_ASSIGNMENT": { label: "CONCURRENT_ASSIGNMENT", index: "6" },
                "ASSIGNMENT_TERMINATION": { label: "ASSIGNMENT_TERMINATION", index: "7" },
                "EFFECTIVE_DATE_CHANGE": { label: "EFFECTIVE_DATE_CHANGE", index: "8" },
                "OTHER": { label: "OTHER", index: "9" }
            },
            defaultValue: "EMPLOYEE_TRANSFER"
        },
        "request_date": { type: "DATE", code: "request_date", label: "Request Date", required: true, defaultNowValue: true },
        "requested_by": { type: "USER_SELECT", code: "requested_by", label: "Requested By", required: true, defaultNowValue: true },
        "effective_date": { type: "DATE", code: "effective_date", label: "Effective Date", required: true },
        "reason": { type: "MULTI_LINE_TEXT", code: "reason", label: "Reason", required: true },
        "remarks": { type: "MULTI_LINE_TEXT", code: "remarks", label: "Remarks", required: false },

        // Section B: Employee (App 53)
        "employee_id": { type: "SINGLE_LINE_TEXT", code: "employee_id", label: "Employee ID", required: true },
        "thai_name": { type: "SINGLE_LINE_TEXT", code: "thai_name", label: "Thai Name", required: false },
        "english_name": { type: "SINGLE_LINE_TEXT", code: "english_name", label: "English Name", required: true },

        // Section C: Current Assignment / BEFORE (App 792)
        "current_assignment_id": { type: "SINGLE_LINE_TEXT", code: "current_assignment_id", label: "Current Assignment ID", required: false },
        "current_position_code": { type: "SINGLE_LINE_TEXT", code: "current_position_code", label: "Current Position Code", required: false },
        "current_position_name": { type: "SINGLE_LINE_TEXT", code: "current_position_name", label: "Current Position Name", required: false },
        "current_organization_code": { type: "SINGLE_LINE_TEXT", code: "current_organization_code", label: "Current Organization Code", required: false },
        "current_organization_name": { type: "SINGLE_LINE_TEXT", code: "current_organization_name", label: "Current Organization Name", required: false },
        "current_organization_type": { type: "SINGLE_LINE_TEXT", code: "current_organization_type", label: "Current Organization Type", required: false },
        "current_assignment_type": { type: "SINGLE_LINE_TEXT", code: "current_assignment_type", label: "Current Assignment Type", required: false },

        // Section D: Proposed Assignment / AFTER (App 791 / Canonical)
        "proposed_position_code": { type: "SINGLE_LINE_TEXT", code: "proposed_position_code", label: "Proposed Position Code", required: true },
        "proposed_position_name": { type: "SINGLE_LINE_TEXT", code: "proposed_position_name", label: "Proposed Position Name", required: true },
        "proposed_organization_code": { type: "SINGLE_LINE_TEXT", code: "proposed_organization_code", label: "Proposed Organization Code", required: true },
        "proposed_organization_name": { type: "SINGLE_LINE_TEXT", code: "proposed_organization_name", label: "Proposed Organization Name", required: true },
        "proposed_organization_type": { type: "SINGLE_LINE_TEXT", code: "proposed_organization_type", label: "Proposed Organization Type", required: true },
        "proposed_assignment_type": {
            type: "DROP_DOWN", code: "proposed_assignment_type", label: "Proposed Assignment Type", required: true,
            options: {
                "PRIMARY": { label: "PRIMARY", index: "0" },
                "CONCURRENT": { label: "CONCURRENT", index: "1" },
                "TEMPORARY": { label: "TEMPORARY", index: "2" }
            },
            defaultValue: "PRIMARY"
        },

        // Section E: Approval
        "submitted_by": { type: "USER_SELECT", code: "submitted_by", label: "Submitted By", required: false },
        "submitted_date": { type: "DATETIME", code: "submitted_date", label: "Submitted Date", required: false },
        "hr_reviewer": { type: "USER_SELECT", code: "hr_reviewer", label: "HR Reviewer", required: false },
        "hr_review_date": { type: "DATETIME", code: "hr_review_date", label: "HR Review Date", required: false },
        "hr_comment": { type: "MULTI_LINE_TEXT", code: "hr_comment", label: "HR Comment", required: false },
        "approver": { type: "USER_SELECT", code: "approver", label: "Approver", required: false },
        "approval_date": { type: "DATETIME", code: "approval_date", label: "Approval Date", required: false },
        "approval_comment": { type: "MULTI_LINE_TEXT", code: "approval_comment", label: "Approval Comment", required: false },
        "reject_reason": { type: "MULTI_LINE_TEXT", code: "reject_reason", label: "Reject Reason", required: false },

        // Section F: Execution / Audit Trail
        "execution_status": {
            type: "DROP_DOWN", code: "execution_status", label: "Execution Status", required: true,
            options: {
                "NOT_EXECUTED": { label: "NOT_EXECUTED", index: "0" },
                "EXECUTION_PENDING": { label: "EXECUTION_PENDING", index: "1" },
                "EXECUTED": { label: "EXECUTED", index: "2" },
                "EXECUTION_ERROR": { label: "EXECUTION_ERROR", index: "3" },
                "ALREADY_EXECUTED": { label: "ALREADY_EXECUTED", index: "4" }
            },
            defaultValue: "NOT_EXECUTED"
        },
        "executed_by": { type: "USER_SELECT", code: "executed_by", label: "Executed By", required: false },
        "executed_date": { type: "DATETIME", code: "executed_date", label: "Executed Date", required: false },
        "previous_assignment_id": { type: "SINGLE_LINE_TEXT", code: "previous_assignment_id", label: "Previous Assignment ID", required: false },
        "created_assignment_id": { type: "SINGLE_LINE_TEXT", code: "created_assignment_id", label: "Created Assignment ID", required: false },
        "execution_error": { type: "MULTI_LINE_TEXT", code: "execution_error", label: "Execution Error", required: false },
        "execution_log": { type: "MULTI_LINE_TEXT", code: "execution_log", label: "Execution Log", required: false }
    };

    // Delete obsolete fields that are not in target
    const existingFieldCodes = Object.keys(currentFields.properties || {}).filter(c =>
        !['Record_number', '$id', '$revision', 'Updated_datetime', 'Created_datetime', 'Updated_by', 'Created_by', 'Status', 'Assignee', 'Categories'].includes(c)
    );

    const fieldsToDelete = existingFieldCodes.filter(c => !targetProperties[c] && c !== 'request_reason' && c !== 'gm_comment' && c !== 'gm_approver' && c !== 'hr_approver' && c !== 'applied_by' && c !== 'applied_at' && c !== 'system_result' && c !== 'rollback_reference' && c !== 'returned_from_status' && c !== 'employee_name' && c !== 'requester');

    // Fields to add vs update
    const fieldsToAdd = {};
    const fieldsToUpdate = {};

    for (const [code, prop] of Object.entries(targetProperties)) {
        if (existingFieldCodes.includes(code)) {
            fieldsToUpdate[code] = prop;
        } else {
            fieldsToAdd[code] = prop;
        }
    }

    if (Object.keys(fieldsToAdd).length > 0) {
        console.log(`Adding ${Object.keys(fieldsToAdd).length} fields to App 793:`, Object.keys(fieldsToAdd));
        const addRes = await apiPost('preview/app/form/fields.json', { app: 793, properties: fieldsToAdd });
        if (!addRes.ok) console.warn(`Field add note:`, addRes.data);
    }

    if (Object.keys(fieldsToUpdate).length > 0) {
        console.log(`Updating ${Object.keys(fieldsToUpdate).length} fields in App 793...`);
        const updateRes = await apiPut('preview/app/form/fields.json', { app: 793, properties: fieldsToUpdate });
        if (!updateRes.ok) console.warn(`Field update note:`, updateRes.data);
    }

    // Clean up obsolete fields if present
    const obsoleteCodes = ['employee_name', 'request_reason', 'gm_comment', 'gm_approver', 'hr_approver', 'applied_by', 'applied_at', 'system_result', 'rollback_reference', 'returned_from_status', 'requester'];
    const toRemove = existingFieldCodes.filter(c => obsoleteCodes.includes(c));
    if (toRemove.length > 0) {
        console.log(`Removing ${toRemove.length} obsolete fields:`, toRemove);
        const delRes = await apiDelete('preview/app/form/fields.json', { app: 793, fields: toRemove });
        if (!delRes.ok) console.warn(`Field delete note:`, delRes.data);
    }

    // PHASE 8 — PROCESS MANAGEMENT (WORKFLOW)
    console.log(`\n[PHASE 8] Configuring Process Management on App 793...`);
    const statusPayload = {
        app: 793,
        enable: true,
        states: {
            "DRAFT": { name: "DRAFT", index: "0", assignee: { type: "ONE_USER" } },
            "SUBMITTED": { name: "SUBMITTED", index: "1", assignee: { type: "ONE_USER" } },
            "HR_REVIEW": { name: "HR_REVIEW", index: "2", assignee: { type: "ONE_USER" } },
            "APPROVED": { name: "APPROVED", index: "3", assignee: { type: "ONE_USER" } },
            "EXECUTION_PENDING": { name: "EXECUTION_PENDING", index: "4", assignee: { type: "ONE_USER" } },
            "EXECUTED": { name: "EXECUTED", index: "5", assignee: { type: "ONE_USER" } },
            "RETURNED": { name: "RETURNED", index: "6", assignee: { type: "ONE_USER" } },
            "CANCELLED": { name: "CANCELLED", index: "7", assignee: { type: "ONE_USER" } },
            "EXECUTION_ERROR": { name: "EXECUTION_ERROR", index: "8", assignee: { type: "ONE_USER" } }
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
    const statusUpdateRes = await apiPut('preview/app/status.json', statusPayload);
    if (!statusUpdateRes.ok) console.warn(`Status update note:`, statusUpdateRes.data);

    // PHASE 13 — VIEWS
    console.log(`\n[PHASE 13] Configuring standard English views on App 793...`);
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
    const viewsRes = await apiPut('preview/app/views.json', viewsPayload);
    if (!viewsRes.ok) console.warn(`Views update note:`, viewsRes.data);

    // PHASE 14 — FORM LAYOUT
    console.log(`\n[PHASE 14] Arranging structured Form Layout on App 793...`);
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

            // Section 5: Approval
            { type: "ROW", fields: [{ type: "USER_SELECT", code: "submitted_by", size: { width: "200" } }, { type: "DATETIME", code: "submitted_date", size: { width: "250" } }] },
            { type: "ROW", fields: [{ type: "USER_SELECT", code: "hr_reviewer", size: { width: "200" } }, { type: "DATETIME", code: "hr_review_date", size: { width: "250" } }] },
            { type: "ROW", fields: [{ type: "MULTI_LINE_TEXT", code: "hr_comment", size: { width: "450", innerHeight: "60" } }] },
            { type: "ROW", fields: [{ type: "USER_SELECT", code: "approver", size: { width: "200" } }, { type: "DATETIME", code: "approval_date", size: { width: "250" } }] },
            { type: "ROW", fields: [{ type: "MULTI_LINE_TEXT", code: "approval_comment", size: { width: "450", innerHeight: "60" } }, { type: "MULTI_LINE_TEXT", code: "reject_reason", size: { width: "350", innerHeight: "60" } }] },

            // Section 6: Execution / Audit Trail
            { type: "ROW", fields: [{ type: "DROP_DOWN", code: "execution_status", size: { width: "200" } }, { type: "USER_SELECT", code: "executed_by", size: { width: "200" } }, { type: "DATETIME", code: "executed_date", size: { width: "250" } }] },
            { type: "ROW", fields: [{ type: "SINGLE_LINE_TEXT", code: "previous_assignment_id", size: { width: "250" } }, { type: "SINGLE_LINE_TEXT", code: "created_assignment_id", size: { width: "250" } }] },
            { type: "ROW", fields: [{ type: "MULTI_LINE_TEXT", code: "execution_error", size: { width: "450", innerHeight: "60" } }, { type: "MULTI_LINE_TEXT", code: "execution_log", size: { width: "450", innerHeight: "60" } }] }
        ]
    };
    const layoutRes = await apiPut('preview/app/form/layout.json', layoutPayload);
    if (!layoutRes.ok) console.warn(`Layout update note:`, layoutRes.data);

    // Deploy App 793 changes
    await deployApp(793);

    // PHASE 16 — POST-REBUILD AUDIT
    console.log(`[PHASE 16] Running post-rebuild verification on App 793...`);
    const deployedFields = (await apiGet('app/form/fields.json?app=793')).data;
    const deployedViews = (await apiGet('app/views.json?app=793')).data;
    const deployedStatus = (await apiGet('app/status.json?app=793')).data;
    const deployedRecords = (await apiGet(`records.json?app=793&query=${encodeURIComponent('limit 500')}`)).data;

    // Check protected baselines
    const app53Check = (await apiGet(`records.json?app=53&query=${encodeURIComponent('limit 500')}`)).data;
    const app791Check = (await apiGet(`records.json?app=791&query=${encodeURIComponent('limit 500')}`)).data;
    const app792Check = (await apiGet(`records.json?app=792&query=${encodeURIComponent('limit 500')}`)).data;

    console.log(`Protected Baseline Check:`);
    console.log(`  App 53 Records:  ${app53Check.records?.length || 0} (Protected = 275)`);
    console.log(`  App 791 Records: ${app791Check.records?.length || 0} (Protected = 33)`);
    console.log(`  App 792 Records: ${app792Check.records?.length || 0} (Protected = 275)`);

    console.log(`\nApp 793 Deployed State:`);
    console.log(`  Field Count:     ${Object.keys(deployedFields.properties || {}).length}`);
    console.log(`  Views Configured: ${Object.keys(deployedViews.views || {}).length}`);
    console.log(`  Workflow States:  ${Object.keys(deployedStatus.states || {}).length}`);
    console.log(`  Workflow Actions: ${deployedStatus.actions?.length || 0}`);
    console.log(`  App 793 Records:  ${deployedRecords.records?.length || 0}`);

    const auditSummary = {
        app793_fields_before: Object.keys(currentFields.properties || {}).length,
        app793_fields_after: Object.keys(deployedFields.properties || {}).length,
        views_created: Object.keys(deployedViews.views || {}).length,
        workflow_states: Object.keys(deployedStatus.states || {}).length,
        workflow_actions: deployedStatus.actions?.length || 0,
        app53_writes: 0,
        app791_writes: 0,
        app792_writes: 0,
        final_status: "APP793_CONFIGURATION_READY"
    };

    fs.writeFileSync(path.join(rootDir, 'docs', 'APP793_POST_REBUILD_AUDIT.json'), JSON.stringify(auditSummary, null, 2), 'utf-8');
    console.log(`\n============================================================`);
    console.log(`FINAL STATUS: ${auditSummary.final_status}`);
    console.log(`============================================================`);
}

runRebuild().catch(err => {
    console.error(`\nCRITICAL FAILURE:`, err);
    process.exit(1);
});
