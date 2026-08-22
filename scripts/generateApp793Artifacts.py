import json
import os

rootDir = os.getcwd()

# 1. GAP ANALYSIS
gap_analysis = {
    "app_id": 793,
    "app_name": "OrgFlow Org Change Request",
    "total_records": 0,
    "gaps": [
        {
            "category": "EMPLOYEE_IDENTITY",
            "item": "Separate Thai and English Names",
            "severity": "HIGH",
            "current_design": "Only generic 'employee_name' field exists",
            "problem": "App 53 maintains separate 'thai_name' and 'english_name'",
            "risk": "Data loss or ambiguity between Thai official records and English org charts",
            "required_design": "Add 'thai_name' and 'english_name' sourced directly from App 53",
            "recommended_fix": "Add thai_name (SINGLE_LINE_TEXT) and english_name (SINGLE_LINE_TEXT)"
        },
        {
            "category": "CURRENT_ASSIGNMENT_BEFORE",
            "item": "Current Organization Type & Assignment Type",
            "severity": "HIGH",
            "current_design": "current_organization_type and current_assignment_type are missing",
            "problem": "Cannot verify the entity level (COMPANY/DIVISION/DEPARTMENT/SECTION) or assignment nature (PRIMARY/CONCURRENT)",
            "risk": "Loss of structural context before transfer",
            "required_design": "Store current_organization_type and current_assignment_type from App 792",
            "recommended_fix": "Add current_organization_type (SINGLE_LINE_TEXT) and current_assignment_type (SINGLE_LINE_TEXT)"
        },
        {
            "category": "PROPOSED_ASSIGNMENT_AFTER",
            "item": "Proposed Organization Type & Assignment Type",
            "severity": "HIGH",
            "current_design": "proposed_organization_type and proposed_assignment_type are missing",
            "problem": "Cannot validate whether the proposed assignment matches App 791 entity type or whether it is PRIMARY/CONCURRENT/ACTING",
            "risk": "Invalid assignment creation in App 792",
            "required_design": "Store proposed_organization_type (from App 791) and proposed_assignment_type (DROP_DOWN: PRIMARY, CONCURRENT, TEMPORARY)",
            "recommended_fix": "Add proposed_organization_type (SINGLE_LINE_TEXT) and proposed_assignment_type (DROP_DOWN)"
        },
        {
            "category": "EXECUTION_INFORMATION",
            "item": "Assignment IDs & Execution Status Audit Trail",
            "severity": "CRITICAL",
            "current_design": "created_assignment_id and previous_assignment_id missing, execution tracking uses generic system_result",
            "problem": "Cannot trace exact App 792 record IDs that were closed vs created",
            "risk": "Failure of bidirectional traceability between App 793 and App 792",
            "required_design": "Store created_assignment_id, previous_assignment_id, execution_status (PENDING, EXECUTED, ERROR), execution_error",
            "recommended_fix": "Add created_assignment_id, previous_assignment_id, execution_status, execution_error"
        },
        {
            "category": "HISTORY_PROTECTION",
            "item": "App 792 Historical Assignment Preservation Protocol",
            "severity": "CRITICAL",
            "current_design": "No explicit enforcement that old App 792 assignment is archived to HISTORICAL",
            "problem": "Risk of overwriting active record or leaving duplicate CURRENT records",
            "risk": "Destruction of employee assignment history or active assignment collision",
            "required_design": "Strict two-step transaction: 1. Update old record (CURRENT -> HISTORICAL + end date), 2. Create new record (CURRENT + start date)",
            "recommended_fix": "Implement idempotent execution handler enforcing history protection protocol"
        },
        {
            "category": "PROCESS_MANAGEMENT",
            "item": "Standardized Workflow States",
            "severity": "MEDIUM",
            "current_design": "States: DRAFT, SUBMITTED, GM_REVIEW, HR_REVIEW, APPROVED, SYSTEM_APPLY, APPLIED",
            "problem": "Missing explicit EXECUTION_PENDING and EXECUTION_ERROR states, and clear cancellation/returned paths",
            "risk": "Ambiguity during automated execution failures",
            "required_design": "DRAFT -> SUBMITTED -> HR_REVIEW -> APPROVED -> EXECUTION_PENDING -> EXECUTED (with RETURNED, CANCELLED, EXECUTION_ERROR branches)",
            "recommended_fix": "Refine Process Management states and actions"
        }
    ]
}

with open(os.path.join(rootDir, 'docs', 'APP793_GAP_ANALYSIS.json'), 'w', encoding='utf-8') as f:
    json.dump(gap_analysis, f, ensure_ascii=False, indent=2)

# 2. PROPOSED FINAL SCHEMA (100% English, snake_case)
proposed_schema = {
    "app_id": 793,
    "app_name": "OrgFlow Org Change Request",
    "fields": [
        # Request Info
        {"field_name": "Request ID", "field_code": "request_id", "type": "SINGLE_LINE_TEXT", "required": True, "source": "System Generated", "editable_by": "System", "purpose": "Unique Change Request Identifier (CR-YYYYMM-XXXX)"},
        {"field_name": "Request Type", "field_code": "request_type", "type": "DROP_DOWN", "required": True, "options": ["TRANSFER", "ORGANIZATION_CHANGE", "POSITION_CHANGE", "PROMOTION", "DEMOTION", "CONCURRENT_ASSIGNMENT", "TERMINATION"], "source": "Requester", "editable_by": "Requester / HR", "purpose": "Classification of organizational change"},
        {"field_name": "Request Date", "field_code": "request_date", "type": "DATE", "required": True, "source": "System / Requester", "editable_by": "Requester", "purpose": "Date when request was initiated"},
        {"field_name": "Requested By", "field_code": "requested_by", "type": "USER_SELECT", "required": True, "source": "User Session", "editable_by": "Requester", "purpose": "User who initiated request"},
        {"field_name": "Effective Date", "field_code": "effective_date", "type": "DATE", "required": True, "source": "Requester / HR", "editable_by": "Requester / HR", "purpose": "Target effective start date of change"},
        {"field_name": "Request Reason", "field_code": "request_reason", "type": "MULTI_LINE_TEXT", "required": True, "source": "Requester", "editable_by": "Requester", "purpose": "Business justification for request"},
        {"field_name": "Remarks", "field_code": "remarks", "type": "MULTI_LINE_TEXT", "required": False, "source": "User", "editable_by": "Requester / HR", "purpose": "Additional notes"},

        # Employee Info (App 53)
        {"field_name": "Employee ID", "field_code": "employee_id", "type": "SINGLE_LINE_TEXT", "required": True, "source": "App 53", "editable_by": "Requester (Lookup)", "purpose": "Target Employee ID (Stable Key)"},
        {"field_name": "Thai Name", "field_code": "thai_name", "type": "SINGLE_LINE_TEXT", "required": False, "source": "App 53", "editable_by": "Auto-filled", "purpose": "Thai full name"},
        {"field_name": "English Name", "field_code": "english_name", "type": "SINGLE_LINE_TEXT", "required": True, "source": "App 53", "editable_by": "Auto-filled", "purpose": "English full name"},

        # Current Assignment (BEFORE - App 792)
        {"field_name": "Current Position Code", "field_code": "current_position_code", "type": "SINGLE_LINE_TEXT", "required": False, "source": "App 792", "editable_by": "Auto-filled", "purpose": "Active position code before change"},
        {"field_name": "Current Position Name", "field_code": "current_position_name", "type": "SINGLE_LINE_TEXT", "required": False, "source": "App 792", "editable_by": "Auto-filled", "purpose": "Active position name before change"},
        {"field_name": "Current Organization Code", "field_code": "current_organization_code", "type": "SINGLE_LINE_TEXT", "required": False, "source": "App 792", "editable_by": "Auto-filled", "purpose": "Active organization code before change"},
        {"field_name": "Current Organization Name", "field_code": "current_organization_name", "type": "SINGLE_LINE_TEXT", "required": False, "source": "App 792", "editable_by": "Auto-filled", "purpose": "Active organization name before change"},
        {"field_name": "Current Organization Type", "field_code": "current_organization_type", "type": "SINGLE_LINE_TEXT", "required": False, "source": "App 792", "editable_by": "Auto-filled", "purpose": "Active organization level before change"},
        {"field_name": "Current Assignment Type", "field_code": "current_assignment_type", "type": "SINGLE_LINE_TEXT", "required": False, "source": "App 792", "editable_by": "Auto-filled", "purpose": "PRIMARY or CONCURRENT"},

        # Proposed Assignment (AFTER - App 791 / Dictionary)
        {"field_name": "Proposed Position Code", "field_code": "proposed_position_code", "type": "SINGLE_LINE_TEXT", "required": True, "source": "Canonical Dictionary", "editable_by": "HR / Requester", "purpose": "Target position code after change"},
        {"field_name": "Proposed Position Name", "field_code": "proposed_position_name", "type": "SINGLE_LINE_TEXT", "required": True, "source": "Canonical Dictionary", "editable_by": "HR / Requester", "purpose": "Target position title after change"},
        {"field_name": "Proposed Organization Code", "field_code": "proposed_organization_code", "type": "SINGLE_LINE_TEXT", "required": True, "source": "App 791", "editable_by": "HR / Requester", "purpose": "Target canonical organization node"},
        {"field_name": "Proposed Organization Name", "field_code": "proposed_organization_name", "type": "SINGLE_LINE_TEXT", "required": True, "source": "App 791", "editable_by": "Auto-filled", "purpose": "Target canonical organization title"},
        {"field_name": "Proposed Organization Type", "field_code": "proposed_organization_type", "type": "SINGLE_LINE_TEXT", "required": True, "source": "App 791", "editable_by": "Auto-filled", "purpose": "COMPANY, DIVISION, DEPARTMENT, SECTION, TEAM"},
        {"field_name": "Proposed Assignment Type", "field_code": "proposed_assignment_type", "type": "DROP_DOWN", "required": True, "options": ["PRIMARY", "CONCURRENT", "TEMPORARY"], "source": "Requester / HR", "editable_by": "HR / Requester", "purpose": "Nature of proposed assignment"},

        # Approval & Review Info
        {"field_name": "Submitted By", "field_code": "submitted_by", "type": "USER_SELECT", "required": False, "source": "Workflow", "editable_by": "System", "purpose": "User who submitted request"},
        {"field_name": "Submitted Date", "field_code": "submitted_date", "type": "DATETIME", "required": False, "source": "Workflow", "editable_by": "System", "purpose": "Submission timestamp"},
        {"field_name": "HR Reviewer", "field_code": "hr_reviewer", "type": "USER_SELECT", "required": False, "source": "Workflow", "editable_by": "System", "purpose": "HR reviewer user"},
        {"field_name": "HR Review Date", "field_code": "hr_review_date", "type": "DATETIME", "required": False, "source": "Workflow", "editable_by": "System", "purpose": "HR review timestamp"},
        {"field_name": "HR Comment", "field_code": "hr_comment", "type": "MULTI_LINE_TEXT", "required": False, "source": "HR", "editable_by": "HR", "purpose": "HR notes/review comments"},
        {"field_name": "Approver", "field_code": "approver", "type": "USER_SELECT", "required": False, "source": "Workflow", "editable_by": "System", "purpose": "Executive/GM Approver"},
        {"field_name": "Approval Date", "field_code": "approval_date", "type": "DATETIME", "required": False, "source": "Workflow", "editable_by": "System", "purpose": "Approval timestamp"},
        {"field_name": "Approval Comment", "field_code": "approval_comment", "type": "MULTI_LINE_TEXT", "required": False, "source": "Approver", "editable_by": "Approver", "purpose": "Final approval comment"},
        {"field_name": "Reject Reason", "field_code": "reject_reason", "type": "MULTI_LINE_TEXT", "required": False, "source": "Approver / HR", "editable_by": "Approver / HR", "purpose": "Reason if rejected/returned"},

        # Execution & History Protection Info
        {"field_name": "Execution Status", "field_code": "execution_status", "type": "DROP_DOWN", "required": True, "options": ["NOT_EXECUTED", "EXECUTION_PENDING", "EXECUTED", "EXECUTION_ERROR", "ALREADY_EXECUTED"], "source": "System Handler", "editable_by": "System", "purpose": "Idempotent execution state"},
        {"field_name": "Executed By", "field_code": "executed_by", "type": "USER_SELECT", "required": False, "source": "System Handler", "editable_by": "System", "purpose": "Service/Admin account executing change"},
        {"field_name": "Executed Date", "field_code": "executed_date", "type": "DATETIME", "required": False, "source": "System Handler", "editable_by": "System", "purpose": "Execution timestamp"},
        {"field_name": "Previous Assignment ID", "field_code": "previous_assignment_id", "type": "SINGLE_LINE_TEXT", "required": False, "source": "App 792", "editable_by": "System", "purpose": "Closed historical assignment ID in App 792"},
        {"field_name": "Created Assignment ID", "field_code": "created_assignment_id", "type": "SINGLE_LINE_TEXT", "required": False, "source": "App 792", "editable_by": "System", "purpose": "Newly created active assignment ID in App 792"},
        {"field_name": "Execution Error", "field_code": "execution_error", "type": "MULTI_LINE_TEXT", "required": False, "source": "System Handler", "editable_by": "System", "purpose": "Diagnostic error log if execution fails"}
    ]
}

with open(os.path.join(rootDir, 'docs', 'APP793_PROPOSED_FINAL_SCHEMA.json'), 'w', encoding='utf-8') as f:
    json.dump(proposed_schema, f, ensure_ascii=False, indent=2)

# 3. PROPOSED PROCESS MANAGEMENT
proposed_workflow = {
    "enable": True,
    "states": {
        "DRAFT": {"index": 0, "assignee": {"type": "CREATOR"}},
        "SUBMITTED": {"index": 1, "assignee": {"type": "GROUP", "code": "HR_Group"}},
        "HR_REVIEW": {"index": 2, "assignee": {"type": "GROUP", "code": "HR_Managers"}},
        "APPROVED": {"index": 3, "assignee": {"type": "ADMIN"}},
        "EXECUTION_PENDING": {"index": 4, "assignee": {"type": "SYSTEM"}},
        "EXECUTED": {"index": 5, "assignee": {"type": "NONE"}},
        "RETURNED": {"index": 6, "assignee": {"type": "CREATOR"}},
        "CANCELLED": {"index": 7, "assignee": {"type": "NONE"}},
        "EXECUTION_ERROR": {"index": 8, "assignee": {"type": "ADMIN"}}
    },
    "actions": [
        {"name": "Submit Request", "from": "DRAFT", "to": "SUBMITTED", "role": "Requester", "validation": "Required fields filled, Employee ID valid in App 53"},
        {"name": "Start HR Review", "from": "SUBMITTED", "to": "HR_REVIEW", "role": "HR Staff", "validation": "Current assignment verified against App 792"},
        {"name": "Approve Request", "from": "HR_REVIEW", "to": "APPROVED", "role": "HR Manager", "validation": "Proposed Org exists in App 791, Position valid in dictionary"},
        {"name": "Return to Requester", "from": "HR_REVIEW", "to": "RETURNED", "role": "HR Staff / Manager", "validation": "Reject Reason filled"},
        {"name": "Cancel Request", "from": "SUBMITTED", "to": "CANCELLED", "role": "Requester / HR", "validation": "Cancellation reason filled"},
        {"name": "Re-submit Request", "from": "RETURNED", "to": "SUBMITTED", "role": "Requester", "validation": "Corrected fields filled"},
        {"name": "Queue Execution", "from": "APPROVED", "to": "EXECUTION_PENDING", "role": "System / Admin", "validation": "Effective Date reached / Approved status confirmed"},
        {"name": "Complete Execution", "from": "EXECUTION_PENDING", "to": "EXECUTED", "role": "Integration Engine", "validation": "Old App 792 set to HISTORICAL, New App 792 created CURRENT"},
        {"name": "Flag Execution Error", "from": "EXECUTION_PENDING", "to": "EXECUTION_ERROR", "role": "Integration Engine", "validation": "Preserve transaction diagnostic error in execution_error"}
    ]
}

with open(os.path.join(rootDir, 'docs', 'APP793_PROPOSED_WORKFLOW.json'), 'w', encoding='utf-8') as f:
    json.dump(proposed_workflow, f, ensure_ascii=False, indent=2)

# 4. IMPLEMENTATION PLAN
impl_plan = {
    "phases": [
        {"phase": 1, "title": "Schema Optimization & Field Alignment", "tasks": ["Deploy 36 standardized English fields (lower_snake_case codes)", "Configure Lookup fields from App 53 and App 791"]},
        {"phase": 2, "title": "Form Layout & Views Configuration", "tasks": ["Arrange logical sections (Request, Employee, Before, After, Approval, Execution)", "Create default views (All Requests, Pending My Approval, Executed, Errors)"]},
        {"phase": 3, "title": "Process Management Deployment", "tasks": ["Configure 9 workflow states and 9 action transitions", "Set branch conditions and assignee groups"]},
        {"phase": 4, "title": "Role & Field Permissions", "tasks": ["Lock executed records from modification", "Restrict Execution Information fields to System/Admin only"]},
        {"phase": 5, "title": "Idempotent Execution Engine Implementation", "tasks": ["Build atomic two-step App 792 history protection handler", "Implement duplicate execution guard (check request_id / created_assignment_id)"]},
        {"phase": 6, "title": "Referential Integrity Validation", "tasks": ["Test pre-approval validator (App 53 existence, App 792 active assignment match, App 791 node validation)"]},
        {"phase": 7, "title": "Sandbox Simulation & Audit Verification", "tasks": ["Simulate end-to-end transfer request for test employee", "Verify App 792 historical archival + new assignment creation"]},
        {"phase": 8, "title": "Production Readiness Sign-Off", "tasks": ["Verify 0 production writes during setup", "Obtain human architecture approval"]}
    ]
}

with open(os.path.join(rootDir, 'docs', 'APP793_IMPLEMENTATION_PLAN.json'), 'w', encoding='utf-8') as f:
    json.dump(impl_plan, f, ensure_ascii=False, indent=2)

print("Generated all 5 App 793 Audit and Design Artifacts successfully.")
