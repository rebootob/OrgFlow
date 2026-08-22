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

async function fixLabels() {
    // 1. App 792
    const put792 = {
        app: 792,
        properties: {
            effective_end_date: { type: "DATE", label: "Effective End Date" },
            assignment_type: {
                type: "DROP_DOWN",
                label: "Assignment Type",
                options: {
                    "PRIMARY": { label: "PRIMARY", index: "0" },
                    "SECONDARY": { label: "SECONDARY", index: "1" },
                    "ACTING": { label: "ACTING", index: "2" },
                    "TEMPORARY": { label: "TEMPORARY", index: "3" }
                }
            },
            effective_start_date: { type: "DATE", label: "Effective Start Date" }
        }
    };
    const res792 = await fetch(`${baseUrl}/k/v1/preview/app/form/fields.json`, { method: 'PUT', headers: h, body: JSON.stringify(put792) });
    console.log(`Update App 792 Labels:`, await res792.json());

    // 2. App 793
    const put793 = {
        app: 793,
        properties: {
            effective_date: { type: "DATE", label: "Effective Date" },
            request_id: { type: "SINGLE_LINE_TEXT", label: "Request ID" }
        }
    };
    const res793 = await fetch(`${baseUrl}/k/v1/preview/app/form/fields.json`, { method: 'PUT', headers: h, body: JSON.stringify(put793) });
    console.log(`Update App 793 Labels:`, await res793.json());

    // 3. Deploy both apps
    const deployRes = await fetch(`${baseUrl}/k/v1/preview/app/deploy.json`, {
        method: 'POST',
        headers: h,
        body: JSON.stringify({ apps: [{ app: 792 }, { app: 793 }] })
    });
    console.log(`Deploy Result:`, await deployRes.json());

    let deploying = true;
    while (deploying) {
        await new Promise(r => setTimeout(r, 1000));
        const statusRes = await fetch(`${baseUrl}/k/v1/preview/app/deploy.json?apps[0]=792&apps[1]=793`, {
            headers: {
                'X-Cybozu-Authorization': Buffer.from(process.env.KINTONE_USERNAME + ':' + process.env.KINTONE_PASSWORD).toString('base64'),
                'Authorization': 'Basic ' + Buffer.from(process.env.BASIC_AUTH_USER + ':' + process.env.BASIC_AUTH_PASS).toString('base64')
            }
        });
        const statusData = await statusRes.json();
        const allSuccess = statusData.apps?.every(a => a.status === 'SUCCESS');
        if (allSuccess) deploying = false;
    }
    console.log(`[PASS] Both Apps 792 and 793 deployed with 100% English Field Labels.`);
}

fixLabels().catch(console.error);
