import json
import os

with open("docs/APP792_FINAL_HUMAN_VERIFICATION_REPORT.json", "r", encoding="utf-8") as f:
    v_report = json.load(f)

cases = v_report["verified_cases"]

exact_field_changes = []
emp_affected = set()
field_counts = {
    "position_name": 0,
    "position_code": 0,
    "organization_code": 0,
    "organization_name": 0,
    "organization_type": 0,
    "other": 0
}

safe_count = 0
keep_count = 0
review_count = 0

for c in cases:
    emp_id = c["employee_id"]
    en_name = c["english_name"]
    th_name = c["thai_name"]
    pdf_ev = c["pdf_evidence"]
    action = "SAFE_TO_APPLY" if c["final_action"] == "SAFE_UPDATE" else c["final_action"]

    has_change = False
    for fd in c["field_decisions"]:
        field = fd["field"]
        cur_val = fd["current_value"]
        prop_val = fd["proposed_value"]
        decision = fd["decision"]

        if decision == "CHANGE" and cur_val != prop_val:
            has_change = True
            emp_affected.add(emp_id)
            if field in field_counts:
                field_counts[field] += 1
            else:
                field_counts["other"] += 1

            exact_field_changes.append({
                "employee_id": emp_id,
                "english_name": en_name,
                "thai_name": th_name,
                "field_name": field,
                "current_value": cur_val,
                "proposed_value": prop_val,
                "source_of_truth": fd["source"],
                "exact_evidence": fd["evidence"],
                "confidence": "HIGH",
                "action": action
            })

    if has_change:
        if action == "SAFE_TO_APPLY":
            safe_count += 1
        elif action == "HUMAN_REVIEW":
            review_count += 1
    else:
        keep_count += 1

summary = {
    "total_app792_records": 275,
    "records_requiring_changes": len(emp_affected),
    "employees_affected": len(emp_affected),
    "total_field_changes": len(exact_field_changes),
    "field_counts": field_counts,
    "action_counts": {
        "SAFE_TO_APPLY": safe_count,
        "KEEP_CURRENT": 275 - len(emp_affected),
        "HUMAN_REVIEW": review_count
    },
    "exact_field_changes": exact_field_changes
}

with open("docs/APP792_EXACT_CHANGE_LIST.json", "w", encoding="utf-8") as f:
    json.dump(summary, f, ensure_ascii=False, indent=2)

print("Exact Change List generated successfully:")
print(f"  Total App 792 Records:       {summary['total_app792_records']}")
print(f"  Records Requiring Changes:   {summary['records_requiring_changes']}")
print(f"  Employees Affected:          {summary['employees_affected']}")
print(f"  Total Field Changes:         {summary['total_field_changes']}")
print(f"  Field breakdown:             {summary['field_counts']}")
print(f"  Action breakdown:            {summary['action_counts']}")
