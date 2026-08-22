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

async function deployApp793FieldsClean() {
    console.log(`[1/4] Fetching current preview fields of App 793...`);
    const curRes = await fetch(`${baseUrl}/k/v1/preview/app/form/fields.json?app=793`, {
        headers: {
            'X-Cybozu-Authorization': Buffer.from(process.env.KINTONE_USERNAME + ':' + process.env.KINTONE_PASSWORD).toString('base64'),
            'Authorization': 'Basic ' + Buffer.from(process.env.BASIC_AUTH_USER + ':' + process.env.BASIC_AUTH_PASS).toString('base64')
        }
    });
    const curData = await curRes.json();
    const existingCodes = new Set(Object.keys(curData.properties || {}));
    console.log(`Current existing preview fields:`, Array.from(existingCodes));

    const targetProperties = {
        request_id: {
            type: "SINGLE_LINE_TEXT",
            code: "request_id",
            label: "Request ID",
            required: true,
            unique: true
        },
        request_type: {
            type: "DROP_DOWN",
            code: "request_type",
            label: "Request Type",
            options: {
                "EMPLOYEE_TRANSFER": { label: "EMPLOYEE_TRANSFER", index: "0" },
                "POSITION_CHANGE": { label: "POSITION_CHANGE", index: "1" },
                "ORGANIZATION_CHANGE": { label: "ORGANIZATION_CHANGE", index: "2" },
                "CREATE_ORGANIZATION": { label: "CREATE_ORGANIZATION", index: "3" },
                "UPDATE_ORGANIZATION": { label: "UPDATE_ORGANIZATION", index: "4" },
                "MOVE_ORGANIZATION": { label: "MOVE_ORGANIZATION", index: "5" },
                "RENAME_ORGANIZATION": { label: "RENAME_ORGANIZATION", index: "6" },
                "DEACTIVATE_ORGANIZATION": { label: "DEACTIVATE_ORGANIZATION", index: "7" },
                "MANAGER_CHANGE": { label: "MANAGER_CHANGE", index: "8" }
            },
            defaultValue: "EMPLOYEE_TRANSFER"
        },
        employee_id: {
            type: "SINGLE_LINE_TEXT",
            code: "employee_id",
            label: "Employee ID"
        },
        employee_name: {
            type: "SINGLE_LINE_TEXT",
            code: "employee_name",
            label: "Employee Name"
        },
        current_organization_code: {
            type: "SINGLE_LINE_TEXT",
            code: "current_organization_code",
            label: "Current Organization Code"
        },
        current_organization_name: {
            type: "SINGLE_LINE_TEXT",
            code: "current_organization_name",
            label: "Current Organization Name"
        },
        proposed_organization_code: {
            type: "SINGLE_LINE_TEXT",
            code: "proposed_organization_code",
            label: "Proposed Organization Code"
        },
        proposed_organization_name: {
            type: "SINGLE_LINE_TEXT",
            code: "proposed_organization_name",
            label: "Proposed Organization Name"
        },
        current_position_code: {
            type: "SINGLE_LINE_TEXT",
            code: "current_position_code",
            label: "Current Position Code"
        },
        current_position_name: {
            type: "SINGLE_LINE_TEXT",
            code: "current_position_name",
            label: "Current Position Name"
        },
        proposed_position_code: {
            type: "SINGLE_LINE_TEXT",
            code: "proposed_position_code",
            label: "Proposed Position Code"
        },
        proposed_position_name: {
            type: "SINGLE_LINE_TEXT",
            code: "proposed_position_name",
            label: "Proposed Position Name"
        },
        effective_date: {
            type: "DATE",
            code: "effective_date",
            label: "Effective Date"
        },
        request_reason: {
            type: "MULTI_LINE_TEXT",
            code: "request_reason",
            label: "Request Reason"
        },
        requester: {
            type: "USER_SELECT",
            code: "requester",
            label: "Requester"
        },
        gm_approver: {
            type: "USER_SELECT",
            code: "gm_approver",
            label: "GM Approver"
        },
        hr_approver: {
            type: "USER_SELECT",
            code: "hr_approver",
            label: "HR Approver"
        },
        gm_comment: {
            type: "MULTI_LINE_TEXT",
            code: "gm_comment",
            label: "GM Comment"
        },
        hr_comment: {
            type: "MULTI_LINE_TEXT",
            code: "hr_comment",
            label: "HR Comment"
        },
        reject_reason: {
            type: "MULTI_LINE_TEXT",
            code: "reject_reason",
            label: "Reject Reason"
        },
        returned_from_status: {
            type: "SINGLE_LINE_TEXT",
            code: "returned_from_status",
            label: "Returned From Status"
        },
        applied_at: {
            type: "DATETIME",
            code: "applied_at",
            label: "Applied At"
        },
        applied_by: {
            type: "USER_SELECT",
            code: "applied_by",
            label: "Applied By"
        },
        system_result: {
            type: "MULTI_LINE_TEXT",
            code: "system_result",
            label: "System Result"
        },
        rollback_reference: {
            type: "SINGLE_LINE_TEXT",
            code: "rollback_reference",
            label: "Rollback Reference"
        }
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

    console.log(`[2/4] Fields to Add (${Object.keys(toAdd).length}):`, Object.keys(toAdd));
    console.log(`Fields to Update (${Object.keys(toUpdate).length}):`, Object.keys(toUpdate));

    if (Object.keys(toAdd).length > 0) {
        const addRes = await fetch(`${baseUrl}/k/v1/preview/app/form/fields.json`, {
            method: 'POST',
            headers: h,
            body: JSON.stringify({ app: 793, properties: toAdd })
        });
        const addData = await addRes.json();
        console.log(`Add Fields Response:`, addData);
    }

    if (Object.keys(toUpdate).length > 0) {
        const updateRes = await fetch(`${baseUrl}/k/v1/preview/app/form/fields.json`, {
            method: 'PUT',
            headers: h,
            body: JSON.stringify({ app: 793, properties: toUpdate })
        });
        const updateData = await updateRes.json();
        console.log(`Update Fields Response:`, updateData);
    }

    console.log(`[3/4] Deploying preview schema to live App 793...`);
    const deployRes = await fetch(`${baseUrl}/k/v1/preview/app/deploy.json`, {
        method: 'POST',
        headers: h,
        body: JSON.stringify({ apps: [{ app: 793 }] })
    });
    const deployData = await deployRes.json();
    console.log(`Deploy Response:`, deployData);

    let deploying = true;
    while (deploying) {
        await new Promise(r => setTimeout(r, 1000));
        const statusRes = await fetch(`${baseUrl}/k/v1/preview/app/deploy.json?apps[0]=793`, {
            headers: {
                'X-Cybozu-Authorization': Buffer.from(process.env.KINTONE_USERNAME + ':' + process.env.KINTONE_PASSWORD).toString('base64'),
                'Authorization': 'Basic ' + Buffer.from(process.env.BASIC_AUTH_USER + ':' + process.env.BASIC_AUTH_PASS).toString('base64')
            }
        });
        const statusData = await statusRes.json();
        const appStatus = statusData.apps?.find(a => String(a.app) === '793');
        if (appStatus && appStatus.status === 'SUCCESS') deploying = false;
        else if (appStatus && appStatus.status === 'FAIL') throw new Error(`Deploy failed: ${JSON.stringify(statusData)}`);
    }

    console.log(`[4/4] Verifying live deployed fields in App 793...`);
    const finalRes = await fetch(`${baseUrl}/k/v1/app/form/fields.json?app=793`, {
        headers: {
            'X-Cybozu-Authorization': Buffer.from(process.env.KINTONE_USERNAME + ':' + process.env.KINTONE_PASSWORD).toString('base64'),
            'Authorization': 'Basic ' + Buffer.from(process.env.BASIC_AUTH_USER + ':' + process.env.BASIC_AUTH_PASS).toString('base64')
        }
    });
    const finalData = await finalRes.json();
    const finalCodes = Object.keys(finalData.properties || {});
    console.log(`Total live fields in App 793: ${finalCodes.length}`);
    
    const missing = Object.keys(targetProperties).filter(k => !finalCodes.includes(k));
    if (missing.length === 0) {
        console.log(`[PASS] All 25 required fields are 100% present in App 793!`);
    } else {
        console.error(`[FAIL] Missing fields:`, missing);
    }
}

deployApp793FieldsClean().catch(console.error);
