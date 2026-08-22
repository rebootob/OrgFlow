# ORGFLOW PHASE 6A — WORKFLOW & REJECT/RETURN TEST REPORT

## 1. Executive Summary

- **TARGET KINTONE DOMAIN:** `https://ttmet.cybozu.com`
- **CONTROLLED CHANGE REQUEST ID:** `REQ-6A-1787384162463` (App 793 Record ID: `1`)
- **CURRENT REQUEST STATUS:** **`APPROVED`**
- **PRODUCTION WRITES EXECUTED:**
  - App 53: **0 Writes**
  - App 791: **0 Writes**
  - App 792: **0 Writes**
  - App 793: **1 Record Created** (Controlled Request ID: `1`)
- **SYSTEM STATUS:** **`STOPPED AT MANDATORY USER APPROVAL GATE #2`**

---

## 2. Process Management Workflow & Reject/Return Timeline

| Step | Action Performed | Source State | Destination State | Audit Result | Timestamp |
| :---: | :--- | :---: | :---: | :---: | :--- |
| **01** | Record Created | N/A | `DRAFT` | **SUCCESS** | 2026-08-22T07:36:03.090Z |
| **02** | Submit | `DRAFT` | `SUBMITTED` | **SUCCESS** | 2026-08-22T07:36:03.404Z |
| **03** | Send to GM Review | `SUBMITTED` | `GM_REVIEW` | **SUCCESS** | 2026-08-22T07:36:03.923Z |
| **04** | **Reject / Return for Correction (Test R1)** | `GM_REVIEW` | **`DRAFT`** | **PASS (R1)** | 2026-08-22T07:36:04.337Z |
| **05** | Submit (Resubmit) | `DRAFT` | `SUBMITTED` | **SUCCESS** | 2026-08-22T07:36:04.734Z |
| **06** | Send to GM Review | `SUBMITTED` | `GM_REVIEW` | **SUCCESS** | 2026-08-22T07:36:05.094Z |
| **07** | GM Approve | `GM_REVIEW` | `HR_REVIEW` | **SUCCESS** | 2026-08-22T07:36:05.503Z |
| **08** | **Reject / Return to GM (Test R2)** | `HR_REVIEW` | **`GM_REVIEW`** | **PASS (R2)** | 2026-08-22T07:36:05.877Z |
| **09** | GM Approve (Re-approve) | `GM_REVIEW` | `HR_REVIEW` | **SUCCESS** | 2026-08-22T07:36:06.228Z |
| **10** | HR Approve | `HR_REVIEW` | **`APPROVED`** | **PASS (FINAL)** | 2026-08-22T07:36:06.635Z |

---

## 3. SYSTEM_APPLY Dry-Run / Preview (DO NOT EXECUTE)

```json
{
  "targetRecordId": "1",
  "targetRequestId": "REQ-6A-1787384162463",
  "employeeRef": "173",
  "currentAssignmentId": "1",
  "currentAssignment": {
    "dept_code": "DEP-001",
    "pos_code": "POS-001",
    "effective_start_date": "2026-01-01",
    "is_current": "YES"
  },
  "proposedAssignment": {
    "internal_id": "ASG-REQ-1",
    "employee_ref": "173",
    "dept_code": "DEP-001",
    "section_code": "",
    "pos_code": "POS-002",
    "manager_ref": "",
    "assignment_type": "PRIMARY",
    "effective_start_date": "2026-09-01",
    "effective_end_date": "",
    "source_request_id": "REQ-6A-1787384162463",
    "is_current": "YES"
  },
  "actionOnOldAssignment": "Update effective_end_date = 2026-08-31, set is_current = NO",
  "actionOnNewAssignment": "Insert 1 new record into App 792",
  "proposedApp53Writes": 0,
  "proposedApp791Writes": 0,
  "proposedApp792Writes": 1,
  "proposedApp793Updates": 1
}
```

---

## 4. Restoration Plan Preview

```json
{
  "step1": "After SYSTEM_APPLY test is approved and executed, create controlled Restoration Request in App 793",
  "restorationRequest": {
    "employee_ref": "173",
    "change_type": "POSITION_CHANGE",
    "current_dept_code": "DEP-001",
    "target_dept_code": "DEP-001",
    "current_pos_code": "POS-002",
    "target_pos_code": "POS-001",
    "effective_date": "2026-09-02",
    "justification": "Restoration to baseline after Phase 6A test"
  },
  "step2": "Pass Restoration Request through Workflow to APPROVED and SYSTEM_APPLY",
  "step3": "Verify Employee 173 current assignment returns to POS-001 while preserving full audit trail in App 792"
}
```
