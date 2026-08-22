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

const getHeaders = (isPost = false) => {
    const h = {};
    if (isPost) {
        h['Content-Type'] = 'application/json';
    }
    if (username && password) {
        h['X-Cybozu-Authorization'] = Buffer.from(`${username}:${password}`).toString('base64');
    }
    if (basicUser && basicPass) {
        h['Authorization'] = 'Basic ' + Buffer.from(`${basicUser}:${basicPass}`).toString('base64');
    }
    return h;
};

async function testCreateDivisions() {
    console.log("Testing POST Division records to App 791...");
    const payload1 = {
        app: 791,
        record: {
            entity_code: { value: 'DIV-ME' },
            title_th: { value: 'Machinery & Engineering Division' },
            title_en: { value: 'Machinery & Engineering Division' },
            master_type: { value: 'DEPARTMENT' },
            parent_code: { value: 'TTMET' },
            is_active: { value: 'ACTIVE' }
        }
    };
    const res1 = await fetch(`${baseUrl}/k/v1/record.json`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(payload1)
    });
    console.log("DIV-ME Status:", res1.status, await res1.json());

    const payload2 = {
        app: 791,
        record: {
            entity_code: { value: 'DIV-GS' },
            title_th: { value: 'GIFU SEIKI Division' },
            title_en: { value: 'GIFU SEIKI Division' },
            master_type: { value: 'DEPARTMENT' },
            parent_code: { value: 'TTMET' },
            is_active: { value: 'ACTIVE' }
        }
    };
    const res2 = await fetch(`${baseUrl}/k/v1/record.json`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(payload2)
    });
    console.log("DIV-GS Status:", res2.status, await res2.json());
}
testCreateDivisions();
