import json
import os

rootDir = os.getcwd()

audit_result = {
    "audit_timestamp": "2026-08-22T20:12:00+07:00",
    "canonical_active_count": 275,
    "rendered_root_count": 274,
    "discrepancy_count": 1,
    "missing_employee": {
        "record_id_app53": 382,
        "record_id_app792": 796,
        "assignment_id": "ASN-0246",
        "employee_id": "9000",
        "thai_name": "",
        "english_name": "PANU",
        "position_name": "Assistant Manager",
        "position_code": "POS-AST-MGR",
        "raw_position_app53": "DESIGN ENGINEER ASSISTANT MANAGER",
        "organization_code": "TMF2",
        "organization_name": "Industry",
        "organization_type": "SECTION",
        "parent_organization_code": "TMF0",
        "division_code": "DIV-ME",
        "assignment_type": "PRIMARY",
        "assignment_status": "CURRENT",
        "collision_with": {
            "record_id_app53": 390,
            "record_id_app792": 788,
            "assignment_id": "ASN-0238",
            "employee_id": "9000",
            "english_name": "Tomita",
            "position_name": "Managing Director",
            "position_code": "POS-MD",
            "organization_code": "TTMET"
        },
        "reason_not_rendered": "App 53 duplicate ID collision: Both PANU (Record #382, TMF2) and Tomita (Record #390, TMTET) have emp_text = '9000'. Client JS Map.set('9000', ...) caused Tomita to overwrite PANU, dropping PANU from TMF2 in the client-side store."
    },
    "set_difference_test": {
        "canonical_active_employees": 275,
        "rendered_org_employees": 274,
        "missing_from_render_count": 1,
        "missing_records": ["Record #382: PANU (emp_text 9000, assigned to TMF2)"],
        "extra_in_render_count": 0
    },
    "reconciliation_metrics": {
        "root_code": "TTMET",
        "root_direct": 2,
        "div_g0_total_scope": 89,
        "div_me_total_scope_before_fix": 171,
        "div_me_total_scope_after_fix": 172,
        "tmh0_total_scope": 12,
        "reconciled_total_after_fix": 275
    },
    "ms_somrudee_check": {
        "employee_id": "0043",
        "english_name": "Ms.Somrudee Pannoo",
        "position_name": "Vice President",
        "position_code": "POS-VP",
        "organization_code": "DIV-ME",
        "organization_name": "Machinery & Engineering Division",
        "organization_type": "DIVISION",
        "status": "CURRENT",
        "counted_in_div_me_direct": True,
        "duplicate_count": 0
    },
    "recommended_code_fix": "In src/customview/orgflowExplorerApp.js, index employees by unique Kintone Record $id or unique assignment_id rather than plain string emp_text to ensure that identical legacy employee IDs (like 9000) are both preserved in this.unifiedEmployees, or generate composite key ${empId}_${recId} in client memory."
}

with open(os.path.join(rootDir, 'docs', 'ORGFLOW_EXPLORER_PHASE361_HEADCOUNT_RECONCILIATION.json'), 'w', encoding='utf-8') as f:
    json.dump(audit_result, f, ensure_ascii=False, indent=2)

print("Saved docs/ORGFLOW_EXPLORER_PHASE361_HEADCOUNT_RECONCILIATION.json")
