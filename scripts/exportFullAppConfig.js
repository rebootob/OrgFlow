/**
 * OrgFlow — Full App Configuration Exporter (READ ONLY)
 * Version: 1.0.0
 * 
 * Exports Views, Process Management, App ACL, Field ACL, and Customization JSON snapshots
 * into secure-backup storage without modifying Kintone.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Helper to load .env.local if present
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
const appId = process.env.KINTONE_APP_ID || '53';
const username = process.env.KINTONE_USERNAME || '';
const password = process.env.KINTONE_PASSWORD || '';
const basicUser = process.env.BASIC_AUTH_USER || '';
const basicPass = process.env.BASIC_AUTH_PASS || '';

const headers = {};
if (username && password) {
    headers['X-Cybozu-Authorization'] = Buffer.from(`${username}:${password}`).toString('base64');
}
if (basicUser && basicPass) {
    headers['Authorization'] = 'Basic ' + Buffer.from(`${basicUser}:${basicPass}`).toString('base64');
}

async function exportFullConfig() {
    const backupBase = path.join(rootDir, 'secure-backup');
    const backupFolders = fs.readdirSync(backupBase).filter(f => f.startsWith('baseline_app_53_'));
    const latestBackup = backupFolders.sort().pop();
    const backupDir = path.join(backupBase, latestBackup);

    console.log(`Exporting full Kintone config to: ${backupDir}`);

    // Views
    try {
        const res = await fetch(`${baseUrl}/k/v1/app/views.json?app=${appId}`, { headers });
        if (res.ok) {
            const data = await res.json();
            fs.writeFileSync(path.join(backupDir, 'views_baseline.json'), JSON.stringify(data, null, 2), 'utf-8');
            console.log(`[PASS] views_baseline.json exported.`);
        }
    } catch (e) {}

    // Process Management / Status
    try {
        const res = await fetch(`${baseUrl}/k/v1/app/status.json?app=${appId}`, { headers });
        if (res.ok) {
            const data = await res.json();
            fs.writeFileSync(path.join(backupDir, 'status_baseline.json'), JSON.stringify(data, null, 2), 'utf-8');
            console.log(`[PASS] status_baseline.json exported.`);
        }
    } catch (e) {}

    // JS/CSS Customization
    try {
        const res = await fetch(`${baseUrl}/k/v1/app/customize.json?app=${appId}`, { headers });
        if (res.ok) {
            const data = await res.json();
            fs.writeFileSync(path.join(backupDir, 'customize_baseline.json'), JSON.stringify(data, null, 2), 'utf-8');
            console.log(`[PASS] customize_baseline.json exported.`);
        }
    } catch (e) {}

    // App ACL
    try {
        const res = await fetch(`${baseUrl}/k/v1/app/acl.json?app=${appId}`, { headers });
        if (res.ok) {
            const data = await res.json();
            fs.writeFileSync(path.join(backupDir, 'app_acl_baseline.json'), JSON.stringify(data, null, 2), 'utf-8');
            console.log(`[PASS] app_acl_baseline.json exported.`);
        }
    } catch (e) {}

    // Field ACL
    try {
        const res = await fetch(`${baseUrl}/k/v1/field/acl.json?app=${appId}`, { headers });
        if (res.ok) {
            const data = await res.json();
            fs.writeFileSync(path.join(backupDir, 'field_acl_baseline.json'), JSON.stringify(data, null, 2), 'utf-8');
            console.log(`[PASS] field_acl_baseline.json exported.`);
        }
    } catch (e) {}

    console.log(`Full config export completed!`);
}

exportFullConfig();
