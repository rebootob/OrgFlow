# ORGFLOW PHASE 5D — PRE-CREATION WORKFLOW & SCHEMA VALIDATION REPORT

## 1. Executive Readiness & Verification Report

| Audit Area / Metric | Verification Result | Detailed Architecture Resolution |
| :--- | :---: | :--- |
| **CHANGE_REQUEST SCHEMA** | **`READY`** | 10 Form Fields validated for multi-step approval workflow |
| **WORKFLOW STATE MACHINE** | **`PASS`** | 8 States (`DRAFT` $\rightarrow$ `SUBMITTED` $\rightarrow$ `REVIEW` $\rightarrow$ `APPROVED` $\rightarrow$ `SCHEDULED` $\rightarrow$ `APPLIED`) |
| **EMPLOYEE REFERENCE** | **`PASS`** | References App 53 `Number` (Code). Zero reliance on `emp_text` |
| **CURRENT STATE SNAPSHOT** | **`PASS`** | Dynamic derivation from `ASSIGNMENT_LOG` (App 792). No manual HR entry! |
| **TARGET STATE VALIDATION** | **`PASS`** | Position $\leftrightarrow$ Dept consistency & active status verified against App 791 |
| **MANAGER & CIRCULAR GUARD**| **`PASS`** | Pre-simulation DFS Cycle check prevents invalid reporting lines before write |
| **APPLICATION ENGINE & SAFETY**| **`PASS`** | Separation of Approval vs Execution. Transaction pre-checks prevent partial write |
| **IDEMPOTENCY & AUDIT** | **`PASS`** | `request_id` idempotency prevents double-apply. Full trace to Approval History |
| **ARCHITECTURE GAPS** | **0 Gaps** | 100% aligned with Phase 4 Approved Architecture & Security Matrix |
| **BUSINESS CONFIRMATIONS** | **0 Pending** | Approval routes & roles aligned with Phase 4 Permission Matrix |

---

## 2. Final Form Fields Matrix for `CHANGE_REQUEST` (10 Approved Fields)

| Field Code | Label (TH) | Label (EN) | Type | Required | Unique | Default | Reference Target | Purpose & Validation Rules | Example Value |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: | :--- | :--- | :--- |
| **`request_id`** | รหัสคำร้องขอเปลี่ยนแปลง | Request ID | `SINGLE_LINE_TEXT` | **YES** | **YES** | `""` | System Generated | Synthetic Unique ID (`REQ-2026-XXXX`) | `REQ-2026-0801` |
| **`employee_ref`** | รหัสพนักงาน | Employee Reference | `SINGLE_LINE_TEXT` | **YES** | NO | `""` | App 53 `Number` | References Target Employee | `1001` |
| **`change_type`** | ประเภทการเปลี่ยนแปลง | Change Type | `DROP_DOWN` | **YES** | NO | `TRANSFER` | Workflow Type | `TRANSFER`, `PROMOTION`, `MANAGER_CHANGE`, `EXIT`, etc. | `TRANSFER` |
| **`current_dept_code`**| หน่วยงานปัจจุบัน | Current Dept Code | `SINGLE_LINE_TEXT` | **YES** | NO | `""` | App 792 Dynamic | Auto-populated snapshot | `DEP-CORP` |
| **`target_dept_code`** | หน่วยงานใหม่ที่เสนอ | Target Dept Code | `SINGLE_LINE_TEXT` | Conditional | NO | `""` | App 791 (`DEP-`) | Must be Active Dept in App 791 | `DEP-MFG` |
| **`current_pos_code`** | ตำแหน่งปัจจุบัน | Current Pos Code | `SINGLE_LINE_TEXT` | **YES** | NO | `""` | App 792 Dynamic | Auto-populated snapshot | `POS-ENG-01` |
| **`target_pos_code`** | ตำแหน่งใหม่ที่เสนอ | Target Pos Code | `SINGLE_LINE_TEXT` | Conditional | NO | `""` | App 791 (`POS-`) | Must match `target_dept_code` | `POS-ENG-02` |
| **`target_manager_ref`**| ผู้บังคับบัญชาใหม่ | Target Manager Ref | `SINGLE_LINE_TEXT` | Conditional | NO | `""` | App 53 `Number` | No Self (`A->A`) or Cycle | `1002` |
| **`effective_date`** | วันที่มีผลบังคับใช้ | Effective Date | `DATE` | **YES** | NO | `Today` | Workflow Date | Start date for new assignment | `2026-09-01` |
| **`justification`** | เหตุผลและความจำเป็น | Justification | `MULTI_LINE_TEXT` | **YES** | NO | `""` | HR Workflow | Reason for Change Request | `Department expansion` |

---

## 3. Workflow State Machine & Approval Routes

```text
┌──────────┐     Submit      ┌─────────────────┐    Dept Mgr     ┌───────────┐
│  DRAFT   ├────────────────►│MANAGER_REVIEW   ├────────────────►│ HR_REVIEW │
│ (Form)   │                 │ (Line Manager)  │                 │(HR Officer│
└──────────┘                 └────────┬────────┘                 └─────┬─────┘
                                      │ Reject                         │ Approve
                                      ▼                                ▼
                                 ┌──────────┐                 ┌───────────────────┐
                                 │ REJECTED │                 │ HR_MANAGER_REVIEW │
                                 └──────────┘                 └─────────┬─────────┘
                                                                        │ Approve
                                                                        ▼
                                                                  ┌───────────┐
                                                                  │ APPROVED  │
                                                                  └─────┬─────┘
                                                                        │ (Check Effective Date)
                                                                        ▼
                                                                  ┌───────────┐
                                                                  │ SCHEDULED │
                                                                  └─────┬─────┘
                                                                        │ (Effective Date Reached)
                                                                        ▼
                                                                  ┌───────────┐
                                                                  │  APPLIED  │
                                                                  │ (App 792) │
                                                                  └───────────┘
```

---

## 4. Test Case Design Matrix (T01 - T24 Validation)

| Test ID | Test Scenario | Description & Input Conditions | Expected Result |
| :--- | :--- | :--- | :---: |
| **T01** | Normal Transfer | Valid Dept, Pos, Manager, Future Effective Date | **PASS (SCHEDULED)** |
| **T02** | Promotion | Valid Position Grade upgrade with justification | **PASS** |
| **T03** | Dept Change | Target Dept updated, Pos updated | **PASS** |
| **T04** | Position Change | Same Dept, Position Grade updated | **PASS** |
| **T05** | Manager Change | Target Manager updated; Dept & Pos remain same | **PASS** |
| **T06** | Acting Assignment | `change_type = ACTING_ASSIGNMENT` | **PASS** |
| **T07** | Temporary Assignment | `change_type = TEMPORARY_ASSIGNMENT` | **PASS** |
| **T08** | Secondment | `change_type = SECONDMENT` | **PASS** |
| **T09** | Employee Exit | `change_type = EMPLOYEE_EXIT`, Target fields empty | **PASS** |
| **T10** | Rehire | `change_type = REHIRE`, Target fields populated | **PASS** |
| **T11** | Self Reporting | Target Manager === Target Employee | **REJECT** |
| **T12** | Circular Reporting | DFS cycle detected in simulation | **REJECT** |
| **T13** | Pos/Dept Mismatch | Target Pos does not belong to Target Dept in App 791 | **REJECT** |
| **T14** | Future Effective Date| Effective Date > Today; Status set to `SCHEDULED` | **PASS** |
| **T15** | Duplicate Apply | Re-submitting an already applied request | **REJECT (IDEMPOTENT)** |
| **T16** | Partial Failure | Pre-check fails on execution date; No partial write | **PASS (FAILED_REVIEW)** |
| **T17** | Rejected Request | Approver clicks Reject; No assignment generated | **PASS (REJECTED)** |
| **T18** | Cancelled Request | Requester cancels Draft; No assignment generated | **PASS (CANCELLED)** |
| **T19** | Invalid Employee | Employee ID does not exist in App 53 | **REJECT** |
| **T20** | Inactive Dept | Target Dept is `INACTIVE` in App 791 | **REJECT** |
| **T21** | Inactive Pos | Target Pos is `INACTIVE` in App 791 | **REJECT** |
| **T22** | Unauthorized Approval| Non-manager attempts to approve request | **REJECT (SECURITY)** |
| **T23** | Historical Integrity | Previous assignment end date set to $T-1$; History intact | **PASS** |
| **T24** | Assignment Trace | Assignment record traces back to `request_id` | **PASS** |

---

## 5. Final Production Change Plan for Phase 5D

```text
===============================================================================
FINAL PRODUCTION CHANGE PLAN: PHASE 5D — CREATE CHANGE_REQUEST APP
===============================================================================
TARGET:             Kintone Production Environment (https://ttmet.cybozu.com)
ACTION:             CREATE NEW APP ("OrgFlow Org Change Request")
APP NAME:           OrgFlow Org Change Request
CURRENT STATE:      APP_NOT_EXIST (ยังไม่มี App นี้ในระบบ)
PROPOSED STATE:     NEW APP CREATED WITH 10 VERIFIED FORM FIELDS & DEFAULT VIEWS

FORM FIELDS TO CREATE (10 FIELDS):
1. request_id, 2. employee_ref, 3. change_type, 4. current_dept_code,
5. target_dept_code, 6. current_pos_code, 7. target_pos_code,
8. target_manager_ref, 9. effective_date, 10. justification

INITIAL VIEWS:       All Requests (Table View), Pending Approval (Filter View)
INITIAL PERMISSIONS: Administrator (Full Access), GENERAL_SHARED (View Records Only)
EXPECTED RECORDS:    0 Records (Structure Only, Zero Requests Created in Phase 5D)

PRE-CHANGE BACKUP:   PRE_STATE = APP_NOT_EXIST
ROLLBACK METHOD:     Delete newly created App ID if creation fails or upon explicit user request
===============================================================================
```
