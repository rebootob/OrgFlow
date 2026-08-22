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

const getHeaders = (isWrite = false) => {
    const head = {};
    if (isWrite) head['Content-Type'] = 'application/json';
    if (process.env.KINTONE_USERNAME && process.env.KINTONE_PASSWORD) head['X-Cybozu-Authorization'] = Buffer.from(`${process.env.KINTONE_USERNAME}:${process.env.KINTONE_PASSWORD}`).toString('base64');
    if (process.env.BASIC_AUTH_USER && process.env.BASIC_AUTH_PASS) head['Authorization'] = 'Basic ' + Buffer.from(`${process.env.BASIC_AUTH_USER}:${process.env.BASIC_AUTH_PASS}`).toString('base64');
    return head;
};

async function fetchAllRecords(appId) {
    let records = [], offset = 0, fetching = true;
    while (fetching) {
        const q = encodeURIComponent(`limit 500 offset ${offset}`);
        const res = await fetch(`${baseUrl}/k/v1/records.json?app=${appId}&query=${q}`, { method: 'GET', headers: getHeaders(false) });
        const data = await res.json();
        if (!res.ok) throw new Error(`Failed to fetch App ${appId}: ${JSON.stringify(data)}`);
        records.push(...(data.records || []));
        if ((data.records || []).length < 500) fetching = false;
        else offset += 500;
    }
    return records;
}

async function deleteRecords(appId, ids) {
    const batchSize = 100;
    for (let i = 0; i < ids.length; i += batchSize) {
        const batch = ids.slice(i, i + batchSize);
        const res = await fetch(`${baseUrl}/k/v1/records.json`, {
            method: 'DELETE',
            headers: getHeaders(true),
            body: JSON.stringify({ app: appId, ids: batch })
        });
        if (!res.ok) throw new Error(`Failed to delete App ${appId}`);
    }
}

async function createRecords(appId, records) {
    const batchSize = 100;
    const createdIds = [];
    for (let i = 0; i < records.length; i += batchSize) {
        const batch = records.slice(i, i + batchSize);
        const res = await fetch(`${baseUrl}/k/v1/records.json`, {
            method: 'POST',
            headers: getHeaders(true),
            body: JSON.stringify({ app: appId, records: batch })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(`Failed to create records in App ${appId}: ${JSON.stringify(data)}`);
        createdIds.push(...(data.ids || []));
    }
    return createdIds;
}

async function deployApp792Full() {
    console.log(`[1/5] Checking App 792 Preview Fields...`);
    const curRes = await fetch(`${baseUrl}/k/v1/preview/app/form/fields.json?app=792`, { headers: getHeaders(false) });
    const curData = await curRes.json();
    const existingCodes = new Set(Object.keys(curData.properties || {}));

    const targetProperties = {
        assignment_id: { type: "SINGLE_LINE_TEXT", code: "assignment_id", label: "Assignment ID", required: true, unique: true },
        employee_id: { type: "SINGLE_LINE_TEXT", code: "employee_id", label: "Employee ID", required: true },
        thai_name: { type: "SINGLE_LINE_TEXT", code: "thai_name", label: "Thai Name" },
        english_name: { type: "SINGLE_LINE_TEXT", code: "english_name", label: "English Name" },
        position_raw: { type: "SINGLE_LINE_TEXT", code: "position_raw", label: "Position Raw" },
        position_code: { type: "SINGLE_LINE_TEXT", code: "position_code", label: "Position Code" },
        position_name: { type: "SINGLE_LINE_TEXT", code: "position_name", label: "Position Name" },
        organization_code: { type: "SINGLE_LINE_TEXT", code: "organization_code", label: "Organization Code", required: true },
        organization_name: { type: "SINGLE_LINE_TEXT", code: "organization_name", label: "Organization Name" },
        organization_type: { type: "SINGLE_LINE_TEXT", code: "organization_type", label: "Organization Type" },
        hierarchy_path: { type: "MULTI_LINE_TEXT", code: "hierarchy_path", label: "Hierarchy Path" },
        assignment_type: {
            type: "DROP_DOWN",
            code: "assignment_type",
            label: "Assignment Type",
            options: {
                "PRIMARY": { label: "PRIMARY", index: "0" },
                "SECONDARY": { label: "SECONDARY", index: "1" },
                "ACTING": { label: "ACTING", index: "2" },
                "TEMPORARY": { label: "TEMPORARY", index: "3" }
            },
            defaultValue: "PRIMARY"
        },
        assignment_status: {
            type: "DROP_DOWN",
            code: "assignment_status",
            label: "Assignment Status",
            options: {
                "CURRENT": { label: "CURRENT", index: "0" },
                "HISTORICAL": { label: "HISTORICAL", index: "1" },
                "PLANNED": { label: "PLANNED", index: "2" },
                "CANCELLED": { label: "CANCELLED", index: "3" }
            },
            defaultValue: "CURRENT"
        },
        effective_start_date: { type: "DATE", code: "effective_start_date", label: "Effective Start Date" },
        effective_end_date: { type: "DATE", code: "effective_end_date", label: "Effective End Date" },
        manager_employee_id: { type: "SINGLE_LINE_TEXT", code: "manager_employee_id", label: "Manager Employee ID" },
        manager_name: { type: "SINGLE_LINE_TEXT", code: "manager_name", label: "Manager Name" },
        mapping_status: {
            type: "DROP_DOWN",
            code: "mapping_status",
            label: "Mapping Status",
            options: {
                "MATCHED": { label: "MATCHED", index: "0" },
                "MATCHED_WITH_REVIEW": { label: "MATCHED_WITH_REVIEW", index: "1" },
                "UNRESOLVED": { label: "UNRESOLVED", index: "2" }
            },
            defaultValue: "MATCHED"
        },
        mapping_confidence: {
            type: "DROP_DOWN",
            code: "mapping_confidence",
            label: "Mapping Confidence",
            options: {
                "HIGH": { label: "HIGH", index: "0" },
                "MEDIUM": { label: "MEDIUM", index: "1" },
                "LOW": { label: "LOW", index: "2" }
            },
            defaultValue: "HIGH"
        },
        source_employee: { type: "SINGLE_LINE_TEXT", code: "source_employee", label: "Source Employee" },
        source_organization: { type: "SINGLE_LINE_TEXT", code: "source_organization", label: "Source Organization" },
        notes: { type: "MULTI_LINE_TEXT", code: "notes", label: "Notes" }
    };

    const toAdd = {};
    const toUpdate = {};

    Object.keys(targetProperties).forEach(k => {
        if (existingCodes.has(k)) {
            toUpdate[k] = targetProperties[k];
        } else {
            toAdd[k] = targetProperties[k];
        }
    });

    console.log(`[2/5] Fields to Add in App 792 (${Object.keys(toAdd).length}):`, Object.keys(toAdd));
    console.log(`Fields to Update in App 792 (${Object.keys(toUpdate).length}):`, Object.keys(toUpdate));

    if (Object.keys(toAdd).length > 0) {
        const addRes = await fetch(`${baseUrl}/k/v1/preview/app/form/fields.json`, {
            method: 'POST',
            headers: getHeaders(true),
            body: JSON.stringify({ app: 792, properties: toAdd })
        });
        console.log(`Add Fields Response:`, await addRes.json());
    }

    if (Object.keys(toUpdate).length > 0) {
        const updateRes = await fetch(`${baseUrl}/k/v1/preview/app/form/fields.json`, {
            method: 'PUT',
            headers: getHeaders(true),
            body: JSON.stringify({ app: 792, properties: toUpdate })
        });
        console.log(`Update Fields Response:`, await updateRes.json());
    }

    // Configure Views for App 792 so the fields appear cleanly in the default list view
    console.log(`[3/5] Configuring Default View for App 792...`);
    const viewConfig = {
        app: 792,
        views: {
            "All Assignments": {
                name: "All Assignments",
                index: "0",
                type: "LIST",
                fields: [
                    "assignment_id",
                    "employee_id",
                    "thai_name",
                    "english_name",
                    "position_name",
                    "position_code",
                    "organization_code",
                    "organization_name",
                    "organization_type",
                    "assignment_type",
                    "assignment_status",
                    "effective_start_date",
                    "mapping_status"
                ]
            }
        }
    };
    await fetch(`${baseUrl}/k/v1/preview/app/views.json`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify(viewConfig)
    });

    // Deploy App 792
    console.log(`[4/5] Deploying App 792 schema...`);
    await fetch(`${baseUrl}/k/v1/preview/app/deploy.json`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify({ apps: [{ app: 792 }] })
    });

    let deploying = true;
    while (deploying) {
        await new Promise(r => setTimeout(r, 1000));
        const statusRes = await fetch(`${baseUrl}/k/v1/preview/app/deploy.json?apps[0]=792`, { headers: getHeaders(false) });
        const statusData = await statusRes.json();
        const appStatus = statusData.apps?.find(a => String(a.app) === '792');
        if (appStatus && appStatus.status === 'SUCCESS') deploying = false;
    }

    // Repopulate all 275 records with complete field values
    console.log(`[5/5] Repopulating App 792 with full assignment data...`);
    const existingRecs = await fetchAllRecords(792);
    if (existingRecs.length > 0) {
        await deleteRecords(792, existingRecs.map(r => r.$id.value));
    }

    const previewData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'docs', 'FINAL_HUMAN_REVIEW_PREVIEW.json'), 'utf-8'));
    const payloads = previewData.map((e, idx) => ({
        assignment_id: { value: `ASN-${String(idx + 1).padStart(4, '0')}` },
        employee_id: { value: e.employee_id },
        thai_name: { value: e.thai_name === 'NULL' ? '' : e.thai_name },
        english_name: { value: e.english_name === 'NULL' ? '' : e.english_name },
        position_raw: { value: e.raw_pos },
        position_code: { value: e.canonical_pos_code },
        position_name: { value: e.canonical_pos_name },
        organization_code: { value: e.org_code },
        organization_name: { value: e.org_name },
        organization_type: { value: e.org_type },
        hierarchy_path: { value: e.hierarchy_path },
        assignment_type: { value: e.assignment_type },
        assignment_status: { value: "CURRENT" },
        effective_start_date: { value: "2026-01-01" },
        mapping_status: { value: e.mapping_status },
        mapping_confidence: { value: e.mapping_confidence },
        source_employee: { value: "App 53 Employee Master" },
        source_organization: { value: "OrgFlow_Canonical_Organization_Master.xlsx" },
        notes: { value: e.mapping_evidence }
    }));

    const createdIds = await createRecords(792, payloads);
    console.log(`[PASS] Successfully created ${createdIds.length} complete records in App 792!`);
}

deployApp792Full().catch(console.error);
