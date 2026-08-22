import json
import os

with open("docs/PRECISE_PDF_CROSS_VALIDATION_REPORT.json", "r", encoding="utf-8") as f:
    cv_data = json.load(f)

with open("docs/FINAL_HUMAN_REVIEW_PREVIEW.json", "r", encoding="utf-8") as f:
    app792_recs = json.load(f)

# Approved canonical position code map
valid_pos_codes = {
    "President": "POS-PRES",
    "Vice President": "POS-VP",
    "General Manager": "POS-GM",
    "Co - General Manager": "POS-GM",
    "Deputy General Manager": "POS-DGM",
    "Senior Advisor": "POS-ADV",
    "Advisor": "POS-ADV",
    "Senior Manager": "POS-SR-MGR",
    "Manager": "POS-MGR",
    "Factory Manager": "POS-MGR",
    "Assistant Manager": "POS-AST-MGR",
    "Chief": "POS-CHF",
    "Assistant Chief": "POS-AST-CHF",
    "Senior Chief": "POS-SR-CHF",
    "Senior Engineer": "POS-SR-ENG",
    "Engineer": "POS-ENG",
    "Senior Staff": "POS-SR-STF",
    "Staff": "POS-STAFF",
    "Marketing Staff": "POS-STAFF",
    "IT Staff": "POS-STAFF",
    "Accounting Staff": "POS-STAFF",
    "Engineering Staff": "POS-STAFF",
    "Support Marketing Staff": "POS-STAFF",
    "Coordinator": "POS-CRD",
    "Technician": "POS-TECH",
    "Operator": "POS-OPR",
    "Safety Officer": "POS-SFT",
    "Driver": "POS-STAFF"
}

# Canonical Org Map from App 791
valid_orgs = {
    "TTMET": {"name": "Toyota Tsusho M&E (Thailand) Co.,Ltd.", "type": "COMPANY"},
    "DIV-ME": {"name": "Machinery & Engineering Division", "type": "DIVISION"},
    "DIV-G0": {"name": "GIFU SEIKI Division", "type": "DIVISION"},
    "TMT0": {"name": "Machinery Department", "type": "DEPARTMENT"},
    "TMF0": {"name": "Industrial Services Department", "type": "DEPARTMENT"},
    "TME0": {"name": "Eco Energy & Textile Machinery Department", "type": "DEPARTMENT"},
    "TMS0": {"name": "Technical Services Department", "type": "DEPARTMENT"},
    "TMG0": {"name": "Mold & Engineering Department", "type": "DEPARTMENT"},
    "TMH0": {"name": "Corporate Department", "type": "DEPARTMENT"},
    "TMT1": {"name": "Export", "type": "SECTION"},
    "TMT2": {"name": "Toyota Sales", "type": "SECTION"},
    "TMF1": {"name": "Automotive", "type": "SECTION"},
    "TMF2": {"name": "Industry", "type": "SECTION"},
    "TMF3": {"name": "Sales Engineering", "type": "SECTION"},
    "TME1": {"name": "Eco Energy & Textile Machinery", "type": "SECTION"},
    "TMS1": {"name": "Technical Services", "type": "SECTION"},
    "TMG1": {"name": "Die Casting", "type": "SECTION"},
    "TMG2": {"name": "Injection", "type": "SECTION"},
    "TMH1": {"name": "GA", "type": "SECTION"},
    "TMH2": {"name": "HR & Personnel", "type": "SECTION"},
    "TMH3": {"name": "Accounting & Finance", "type": "SECTION"},
    "TMT1-MACH": {"name": "Machine & Equipments", "type": "TEAM"},
    "TMT1-TRIAL": {"name": "Tool Part & Project", "type": "TEAM"},
    "TMT2-TOYOTA": {"name": "TOYOTA", "type": "TEAM"},
    "TMT2-STM": {"name": "STM", "type": "TEAM"},
    "TMT2-LOGITIC": {"name": "Logistics", "type": "TEAM"},
    "TMF1-AUTOMOTIVE": {"name": "AUTOMOTIVE", "type": "TEAM"},
    "TMF2-INDUSTRY": {"name": "INDUSTRY", "type": "TEAM"},
    "TMF3-DENSO": {"name": "DENSO", "type": "TEAM"},
    "TME1-MARK": {"name": "Marketing (Eco Energy)", "type": "TEAM"},
    "TMS1-PROJ": {"name": "Project Management", "type": "TEAM"},
    "TMS1-ENGI": {"name": "Engineering", "type": "TEAM"},
    "TMS1-SAFE": {"name": "Safety & ISO", "type": "TEAM"}
}

proposal_list = []
human_review_list = []
no_change_list = []

pos_only_count = 0
org_only_count = 0
pos_and_org_count = 0

for emp in app792_recs:
    emp_id = emp["employee_id"]
    en_name = emp["english_name"]
    th_name = emp["thai_name"]
    raw_pos = emp["raw_pos"]
    cur_pos_name = emp["canonical_pos_name"]
    cur_pos_code = emp["canonical_pos_code"]
    cur_org_code = emp["org_code"]
    cur_org_name = emp["org_name"]
    cur_org_type = emp["org_type"]

    # Check if there is an exception for this employee
    matched_exc = next((e for e in cv_data["exceptions"] if e["employee_id"] == emp_id and (e["english_name"] == en_name or not en_name)), None)

    if matched_exc:
        exp_pos_name = matched_exc["expected_pos"]
        exp_pos_code = valid_pos_codes.get(exp_pos_name, "POS-STAFF")
        exp_org_code = matched_exc["expected_org"]
        org_meta = valid_orgs.get(exp_org_code, {"name": exp_org_code, "type": "SECTION"})
        exp_org_name = org_meta["name"]
        exp_org_type = org_meta["type"]

        prob = matched_exc["problem"]
        if prob == "Position Mismatch with PDF":
            classification = "CONFIRMED_POSITION_ERROR"
            pos_only_count += 1
        elif prob == "Organization Mismatch with PDF":
            classification = "CONFIRMED_ORGANIZATION_ERROR"
            org_only_count += 1
        else:
            classification = "CONFIRMED_POSITION_AND_ORGANIZATION_ERROR"
            pos_and_org_count += 1

        action = "UPDATE"
        # Special review cases if any
        if "Tomita" in en_name:
            action = "HUMAN_REVIEW"
            classification = "APP53_PDF_CONFLICT"
            human_review_list.append({
                "employee_id": emp_id,
                "english_name": en_name,
                "thai_name": th_name,
                "reason": "President in PDF is Mr.Takeshi Tsuchihira, Tomita is Managing Director in App 53",
                "proposed_action": "Preserve Managing Director (POS-MD) at TTMET"
            })

        proposal_list.append({
            "employee_id": emp_id,
            "english_name": en_name,
            "thai_name": th_name,
            "classification": classification,
            "current_pos_name": cur_pos_name,
            "proposed_pos_name": exp_pos_name,
            "current_pos_code": cur_pos_code,
            "proposed_pos_code": exp_pos_code,
            "current_org_code": cur_org_code,
            "proposed_org_code": exp_org_code,
            "current_org_name": cur_org_name,
            "proposed_org_name": exp_org_name,
            "current_org_type": cur_org_type,
            "proposed_org_type": exp_org_type,
            "pdf_evidence": matched_exc["pdf_evidence"],
            "action": action,
            "confidence": "HIGH"
        })
    else:
        no_change_list.append({
            "employee_id": emp_id,
            "english_name": en_name,
            "pos_name": cur_pos_name,
            "org_code": cur_org_code
        })

summary = {
    "total_app792_records": len(app792_recs),
    "records_requiring_update": len([p for p in proposal_list if p["action"] == "UPDATE"]),
    "records_human_review": len([p for p in proposal_list if p["action"] == "HUMAN_REVIEW"]),
    "records_no_change": len(no_change_list),
    "position_only_updates": pos_only_count,
    "organization_only_updates": org_only_count,
    "position_and_organization_updates": pos_and_org_count,
    "updated_employee_ids": [p["employee_id"] for p in proposal_list if p["action"] == "UPDATE"],
    "proposals": proposal_list
}

with open("docs/APP792_CORRECTION_PROPOSAL.json", "w", encoding="utf-8") as f:
    json.dump(summary, f, ensure_ascii=False, indent=2)

print("Proposal summary generated successfully:")
print(f"  Total App 792 Records:       {summary['total_app792_records']}")
print(f"  Records Requiring UPDATE:    {summary['records_requiring_update']}")
print(f"  Records HUMAN_REVIEW:        {summary['records_human_review']}")
print(f"  Records NO_CHANGE:           {summary['records_no_change']}")
print(f"  Position-only Updates:       {summary['position_only_updates']}")
print(f"  Organization-only Updates:   {summary['organization_only_updates']}")
print(f"  Position+Org Updates:        {summary['position_and_organization_updates']}")
