import json

with open("docs/PRECISE_PDF_CROSS_VALIDATION_REPORT.json", "r", encoding="utf-8") as f:
    data = json.load(f)

print(f"Total Exceptions: {len(data['exceptions'])}\n")
for idx, e in enumerate(data['exceptions']):
    print(f"[{idx+1:02d}] {e['employee_id']} | {e['english_name']} ({e['thai_name']})")
    print(f"     Problem: {e['problem']}")
    print(f"     App 53: {e['app53_pos']} | Current 792: {e['current_pos']} ({e['current_org']}) -> Expected: {e['expected_pos']} ({e['expected_org']})")
    print(f"     Evidence: {e['pdf_evidence']}")
    print(f"     Recommendation: {e['recommendation']}\n")
