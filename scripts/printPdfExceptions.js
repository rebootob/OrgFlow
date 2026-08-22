import fs from 'fs';
import path from 'path';

const report = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'docs', 'PDF_CROSS_VALIDATION_REPORT.json'), 'utf-8'));

console.log(`\n=== ALL ${report.exceptions.length} EXCEPTIONS FOUND AGAINST PDF ===`);
report.exceptions.forEach((e, idx) => {
    console.log(`\n[${idx + 1}] EmpID: ${e.employee_id} | Name: ${e.english_name} (${e.thai_name})`);
    console.log(`    Problem: ${e.problem}`);
    console.log(`    App 53 Pos: ${e.app53_pos} | Current 792 Pos: ${e.current_app792_pos} -> Expected: ${e.expected_pos}`);
    console.log(`    Current 792 Org: ${e.current_org} -> Expected Org: ${e.expected_org}`);
    console.log(`    Evidence: ${e.pdf_evidence}`);
    console.log(`    Recommendation: ${e.recommendation}`);
});
