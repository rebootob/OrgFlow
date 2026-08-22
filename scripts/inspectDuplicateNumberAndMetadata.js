/**
 * OrgFlow — Final Pre-Phase-3 Duplicate Number Inspector & Metadata Analyzer
 * Version: 1.0.0
 * 
 * Performs 100% READ-ONLY inspection on the single duplicate 'Number' value in App 53
 * baseline records and analyzes field configuration parameters.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const backupBase = path.join(rootDir, 'secure-backup');
const backupFolders = fs.readdirSync(backupBase).filter(f => f.startsWith('baseline_app_53_'));
const latestBackup = backupFolders.sort().pop();
const backupDir = path.join(backupBase, latestBackup);

const recordsPath = path.join(backupDir, 'records_baseline.json');
const fieldsPath = path.join(backupDir, 'fields_baseline.json');

const records = JSON.parse(fs.readFileSync(recordsPath, 'utf-8'));
const fieldsData = JSON.parse(fs.readFileSync(fieldsPath, 'utf-8'));

console.log(`================================================`);
console.log(`ORGFLOW PRE-PHASE-3 DUPLICATE NUMBER INSPECTION`);
console.log(`================================================\n`);

// 1. Inspect Field 'Number' Metadata Configuration
const numberConfig = fieldsData.properties ? fieldsData.properties.Number : null;
console.log(`=== FIELD 'Number' PRODUCTION METADATA ===`);
if (numberConfig) {
    console.log(`Field Code: Number`);
    console.log(`Label: "${numberConfig.label}"`);
    console.log(`Type: ${numberConfig.type}`);
    console.log(`Required: ${Boolean(numberConfig.required)}`);
    console.log(`Unique Value Setting: ${Boolean(numberConfig.unique)}`);
    console.log(`Min Value: ${numberConfig.minValue !== undefined ? numberConfig.minValue : 'None'}`);
    console.log(`Max Value: ${numberConfig.maxValue !== undefined ? numberConfig.maxValue : 'None'}`);
    console.log(`Default Value: "${numberConfig.defaultValue !== undefined ? numberConfig.defaultValue : ''}"`);
} else {
    console.log(`Field Number not found in metadata!`);
}

// 2. Find Duplicate Number Value & Record IDs
const numberMap = new Map();
records.forEach(r => {
    const val = r.Number && r.Number.value !== null && r.Number.value !== undefined ? String(r.Number.value).trim() : '';
    if (val) {
        if (!numberMap.has(val)) numberMap.set(val, []);
        numberMap.get(val).push(r);
    }
});

let duplicateVal = null;
let duplicateRecords = [];

numberMap.forEach((recs, val) => {
    if (recs.length > 1) {
        duplicateVal = val;
        duplicateRecords = recs;
    }
});

console.log(`\n=== DUPLICATE NUMBER RECORDS INSPECTION ===`);
if (duplicateVal) {
    console.log(`Duplicate Value: ${duplicateVal}`);
    console.log(`Affected Records Count: ${duplicateRecords.length}`);

    duplicateRecords.forEach((r, idx) => {
        const recordId = r.$id ? r.$id.value : 'N/A';
        const empText = r.emp_text ? r.emp_text.value : 'N/A';
        const statusVal = r.Status ? r.Status.value : 'N/A';
        const nameTH = r.Text_0 ? r.Text_0.value : '';
        const nameEN = r.Text ? r.Text.value : '';
        const maskedName = nameTH ? nameTH.substring(0, 3) + '***' : (nameEN ? nameEN.substring(0, 3) + '***' : 'N/A');
        const dept = r.Drop_down_0 ? r.Drop_down_0.value : 'N/A';
        const pos = r.Text_2 ? r.Text_2.value : 'N/A';
        const createdTime = r.Created_datetime ? r.Created_datetime.value : 'N/A';
        const updatedTime = r.Updated_datetime ? r.Updated_datetime.value : 'N/A';

        console.log(`\nRecord #${idx + 1}:`);
        console.log(`- Kintone Record ID ($id): ${recordId}`);
        console.log(`- Field 'Number' Value: ${duplicateVal}`);
        console.log(`- Field 'emp_text' Value: ${empText}`);
        console.log(`- Masked Name: ${maskedName}`);
        console.log(`- Department: ${dept}`);
        console.log(`- Position: ${pos}`);
        console.log(`- Process Status (Status): ${statusVal}`);
        console.log(`- Created Datetime: ${createdTime}`);
        console.log(`- Updated Datetime: ${updatedTime}`);
    });
} else {
    console.log(`No duplicate Number found.`);
}
