import fs from 'fs';
const backup = JSON.parse(fs.readFileSync('docs/phase7/PRE_EXECUTION_BACKUP.json', 'utf-8'));
const orgRecs = backup.app791_records.filter(r => ['TTMET', 'DIV-ME', 'DIV-GS', 'TMH0', 'TMT1', 'TMT0', 'TMS0'].includes(r.entity_code?.value));
orgRecs.forEach(r => console.log(r.$id.value, r.entity_code?.value, 'title_th:', JSON.stringify(r.title_th?.value), 'title_en:', JSON.stringify(r.title_en?.value)));
