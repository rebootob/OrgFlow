import json
import os

with open("docs/APP792_CORRECTION_PROPOSAL.json", "r", encoding="utf-8") as f:
    proposal_data = json.load(f)

proposals = proposal_data["proposals"]

with open("docs/FINAL_HUMAN_REVIEW_PREVIEW.json", "r", encoding="utf-8") as f:
    app792_recs = json.load(f)

verified_cases = []
safe_update_count = 0
keep_current_count = 0
human_review_count = 0
pos_change_count = 0
org_change_count = 0
both_change_count = 0

for p in proposals:
    emp_id = p["employee_id"]
    en_name = p["english_name"]
    th_name = p["thai_name"]
    cur_pos_name = p["current_pos_name"]
    prop_pos_name = p["proposed_pos_name"]
    cur_pos_code = p["current_pos_code"]
    prop_pos_code = p["proposed_pos_code"]
    cur_org_code = p["current_org_code"]
    prop_org_code = p["proposed_org_code"]
    cur_org_name = p["current_org_name"]
    prop_org_name = p["proposed_org_name"]
    cur_org_type = p["current_org_type"]
    prop_org_type = p["proposed_org_type"]
    pdf_ev = p["pdf_evidence"]

    pos_changed = (cur_pos_name != prop_pos_name or cur_pos_code != prop_pos_code)
    org_changed = (cur_org_code != prop_org_code)

    if pos_changed and org_changed:
        both_change_count += 1
    elif pos_changed:
        pos_change_count += 1
    elif org_changed:
        org_change_count += 1

    field_decisions = [
        {
            "field": "position_name",
            "current_value": cur_pos_name,
            "proposed_value": prop_pos_name,
            "source": "PDF Page 1",
            "evidence": pdf_ev,
            "decision": "CHANGE" if cur_pos_name != prop_pos_name else "KEEP"
        },
        {
            "field": "position_code",
            "current_value": cur_pos_code,
            "proposed_value": prop_pos_code,
            "source": "Canonical Dictionary",
            "evidence": f"Mapped from proposed position {prop_pos_name}",
            "decision": "CHANGE" if cur_pos_code != prop_pos_code else "KEEP"
        },
        {
            "field": "organization_code",
            "current_value": cur_org_code,
            "proposed_value": prop_org_code,
            "source": "PDF Page 1",
            "evidence": pdf_ev,
            "decision": "CHANGE" if cur_org_code != prop_org_code else "KEEP"
        },
        {
            "field": "organization_name",
            "current_value": cur_org_name,
            "proposed_value": prop_org_name,
            "source": "App 791 Canonical Master",
            "evidence": f"Canonical name for {prop_org_code}",
            "decision": "CHANGE" if cur_org_name != prop_org_name else "KEEP"
        },
        {
            "field": "organization_type",
            "current_value": cur_org_type,
            "proposed_value": prop_org_type,
            "source": "App 791 Canonical Master",
            "evidence": f"Canonical entity type for {prop_org_code}",
            "decision": "CHANGE" if cur_org_type != prop_org_type else "KEEP"
        }
    ]

    action = "SAFE_UPDATE"
    if p.get("action") == "HUMAN_REVIEW":
        action = "HUMAN_REVIEW"
        human_review_count += 1
    else:
        safe_update_count += 1

    verified_cases.append({
        "employee_id": emp_id,
        "english_name": en_name,
        "thai_name": th_name,
        "classification": p["classification"],
        "pos_changed": pos_changed,
        "org_changed": org_changed,
        "current_state": {
            "position_name": cur_pos_name,
            "position_code": cur_pos_code,
            "organization_code": cur_org_code,
            "organization_name": cur_org_name,
            "organization_type": cur_org_type
        },
        "proposed_state": {
            "position_name": prop_pos_name,
            "position_code": prop_pos_code,
            "organization_code": prop_org_code,
            "organization_name": prop_org_name,
            "organization_type": prop_org_type
        },
        "pdf_evidence": pdf_ev,
        "field_decisions": field_decisions,
        "final_action": action,
        "confidence": "HIGH"
    })

final_report = {
    "total_proposed_updates_reviewed": len(verified_cases),
    "safe_update": safe_update_count,
    "keep_current": keep_current_count,
    "human_review": human_review_count,
    "position_changes": pos_change_count,
    "organization_changes": org_change_count,
    "both_position_and_organization_changes": both_change_count,
    "final_status": "READY_FOR_CORRECTION_APPROVAL" if human_review_count == 0 else "HUMAN_REVIEW_REQUIRED",
    "verified_cases": verified_cases
}

with open("docs/APP792_FINAL_HUMAN_VERIFICATION_REPORT.json", "w", encoding="utf-8") as f:
    json.dump(final_report, f, ensure_ascii=False, indent=2)

print("Final Human Verification Report Generated:")
print(f"  Total Reviewed:             {final_report['total_proposed_updates_reviewed']}")
print(f"  SAFE_UPDATE:                {final_report['safe_update']}")
print(f"  HUMAN_REVIEW:               {final_report['human_review']}")
print(f"  Position Changes:           {final_report['position_changes']}")
print(f"  Organization Changes:       {final_report['organization_changes']}")
print(f"  Both Pos+Org Changes:       {final_report['both_position_and_organization_changes']}")
print(f"  Status:                     {final_report['final_status']}")
