import fs from 'fs';
const backup = JSON.parse(fs.readFileSync('docs/phase7/PRE_EXECUTION_BACKUP.json', 'utf-8'));
const r = backup.app791_records.find(rec => rec.$id.value === '524' || rec.$id.value === '3');
console.log('Fields of record:', Object.keys(r).map(k => ({ code: k, type: r[k].type, value: r[k].value })));
