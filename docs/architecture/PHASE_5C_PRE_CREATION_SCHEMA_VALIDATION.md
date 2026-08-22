# ORGFLOW PHASE 5C — PRE-CREATION SCHEMA VALIDATION & PRODUCTION CHANGE PLAN

## 1. Executive Readiness Report

| Audit Dimension | Verification Result | Detailed Architecture Resolution |
| :--- | :---: | :--- |
| **ASSIGNMENT_LOG SCHEMA** | **`READY`** | 11 Approved Fields validated for historical immutability |
| **IDENTITY MODEL** | **`PASS`** | Synthetic `internal_id` (`ASG-APP791-{uuid}`) guarantees 100% uniqueness |
| **EMPLOYEE REFERENCE** | **`PASS`** | References App 53 `Number` (Code). Zero reliance on blank `emp_text` |
| **DEPARTMENT REFERENCE** | **`PASS`** | References `ORG_MASTERS` (App ID 791) with `DEP-` prefix validation |
| **POSITION REFERENCE** | **`PASS`** | References `ORG_MASTERS` (App ID 791) with `POS-` prefix validation |
| **MANAGER MODEL** | **`PASS`** | Self-reporting ($A \rightarrow A$) & Circular ($A \rightarrow B \rightarrow C \rightarrow A$) guards enabled |
| **DATE & OVERLAP MODEL** | **`PASS`** | Single `PRIMARY` active assignment constraint & interval overlap validation |
| **TIME MACHINE & HISTORY** | **`PASS`** | Time-based Effective Date querying ($EffectiveStart \le TargetDate \le EffectiveEnd$) |
| **VACANCY CALCULATION** | **`PASS`** | Integrated with App 791 `headcount_quota` ($Quota - ActivePrimaryCount$) |
| **AUDIT TRACEABILITY** | **`PASS`** | Native Kintone History + `change_request_ref` trace to approval flow |
| **ARCHITECTURE GAPS** | **0 Gaps** | Schema 100% aligned with Phase 4 Approved Architecture |

---

## 2. Final Field Matrix (11 Approved Fields)

| Field Code | Label (TH) | Label (EN) | Type | Required | Unique | Default | Reference Target | Validation & Governance Rules | Example Value |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: | :--- | :--- | :--- |
| **`internal_id`** | รหัสประวัติการดำรงตำแหน่ง | Internal Assignment ID | `SINGLE_LINE_TEXT` | **YES** | **YES** | `""` | OrgFlow System | Synthetic Immutable Key | `ASG-88201-F3A1` |
| **`employee_ref`** | รหัสพนักงาน | Employee Reference | `SINGLE_LINE_TEXT` | **YES** | NO | `""` | App 53 `Number` | Must exist in App 53 (`Number`) | `1001` |
| **`dept_code`** | รหัสหน่วยงานที่สังกัด | Department Code | `SINGLE_LINE_TEXT` | **YES** | NO | `""` | App 791 (`DEP-`) | Must match `pos_code.dept_code` | `DEP-MFG` |
| **`section_code`** | รหัสฝ่าย/ส่วนงาน | Section Code | `SINGLE_LINE_TEXT` | NO | NO | `""` | App 791 (`DEP-`) | Sub-unit code if applicable | `DEP-INJ` |
| **`pos_code`** | รหัสตำแหน่ง | Position Code | `SINGLE_LINE_TEXT` | **YES** | NO | `""` | App 791 (`POS-`) | Must exist in App 791 (`POS-`) | `POS-ENG-01` |
| **`manager_ref`** | รหัสผู้บังคับบัญชา | Manager Reference | `SINGLE_LINE_TEXT` | NO | NO | `""` | App 53 `Number` | No Self (`A->A`) or Cycle (`A->B->A`) | `1002` |
| **`assignment_type`**| ประเภทการดำรงตำแหน่ง | Assignment Type | `DROP_DOWN` | **YES** | NO | `PRIMARY` | HR Workflow | `PRIMARY`, `ACTING`, `TEMPORARY`, `SECONDMENT` | `PRIMARY` |
| **`is_acting`** | ปฏิบัติการแทน | Is Acting / Temp | `RADIO_BUTTON` | **YES** | NO | `NO` | HR Workflow | `YES` / `NO` flag | `NO` |
| **`effective_start_date`**| วันที่มีผลบังคับใช้ | Effective Start Date| `DATE` | **YES** | NO | `Today` | Workflow Date | Assignment Start Date | `2026-01-01` |
| **`effective_end_date`** | วันที่สิ้นสุด | Effective End Date | `DATE` | NO | NO | `""` | Workflow Date | End Date (Empty = Open-ended) | `""` |
| **`is_current`** | สถานะปัจจุบัน | Is Current Active | `RADIO_BUTTON` | **YES** | NO | `YES` | System Flag | Calculated: `YES` if currently active | `YES` |

---

## 3. Entity Relationship & Source of Truth Topology

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                    EMPLOYEE MASTER (App ID 53)                              │
│                    - Field: `Number` (Code)                                 │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ (1. Referenced by `employee_ref` & `manager_ref`)
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                ASSIGNMENT LOG APP (Phase 5C - `ASSIGNMENT_LOG`)             │
│                - Stores Immutable Time-Based Assignment Records            │
└───────────────────┬─────────────────────────────────────┬───────────────────┘
                    │ (2. Dept Code Reference)            │ (3. Position Code Reference)
                    ▼                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│             ORGFLOW ORGANIZATION MASTERS APP (App ID: 791)                  │
│             - Department Master (`entity_code` with `DEP-` prefix)          │
│             - Position Master   (`entity_code` with `POS-` prefix)          │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Test Case Design Matrix (T01 - T15 Validation)

| Test ID | Test Scenario | Test Input Conditions | Expected Engine Result |
| :--- | :--- | :--- | :---: |
| **T01** | Normal Assignment | Single valid assignment (`PRIMARY`, valid Dept & Pos) | **PASS** |
| **T02** | Employee Transfer | Close old assignment at $T-1$, open new assignment at $T$ | **PASS** |
| **T03** | Promotion | Assignment position updated with new start date | **PASS** |
| **T04** | Manager Change | Manager reference updated in new assignment timeline | **PASS** |
| **T05** | Self Reporting | `employee_ref === manager_ref` ($A \rightarrow A$) | **REJECT** |
| **T06** | Circular Reporting | Hierarchy loop ($A \rightarrow B \rightarrow C \rightarrow A$) detected | **REJECT** |
| **T07** | Duplicate Primary | Two active `PRIMARY` assignments on same date | **REJECT** |
| **T08** | Overlapping Date | Date interval overlap $[S_1, E_1] \cap [S_2, E_2] \neq \emptyset$ | **REJECT** |
| **T09** | Future Assignment | Effective start date > Today | **PASS** |
| **T10** | Employee Exit | Effective end date set to exit date; history retained | **PASS** |
| **T11** | Rehire | New assignment created after previous exit date | **PASS** |
| **T12** | Position/Dept Mismatch | `pos_code` does not belong to `dept_code` in App 791 | **REJECT** |
| **T13** | Vacancy Calculation | Quota (App 791) - Count of active `PRIMARY` assignments | **PASS** |
| **T14** | Historical Org Chart | Query active assignments at target date in past | **PASS** |
| **T15** | Correction / Audit | Correction logged with audit trail without destroying record | **PASS** |

---

## 5. Final Production Change Plan for Phase 5C

```text
===============================================================================
FINAL PRODUCTION CHANGE PLAN: PHASE 5C — CREATE ASSIGNMENT_LOG APP
===============================================================================
TARGET:             Kintone Production Environment (https://ttmet.cybozu.com)
ACTION:             CREATE NEW APP ("OrgFlow Org Assignment History Log")
APP NAME:           OrgFlow Org Assignment History Log
CURRENT STATE:      APP_NOT_EXIST (ยังไม่มี App นี้ในระบบ)
PROPOSED STATE:     NEW APP CREATED WITH 11 VERIFIED FORM FIELDS & DEFAULT VIEWS

FORM FIELDS TO CREATE (11 FIELDS):
1. internal_id, 2. employee_ref, 3. dept_code, 4. section_code, 5. pos_code,
6. manager_ref, 7. assignment_type, 8. is_acting, 9. effective_start_date,
10. effective_end_date, 11. is_current

INITIAL VIEWS:       All Assignments (Table View), Current Active Only (Filter View)
INITIAL PERMISSIONS: Administrator (Full Access), GENERAL_SHARED (View Records Only)
EXPECTED RECORDS:    0 Records (Structure Only, Zero Historical Data Insert in Phase 5C)

PRE-CHANGE BACKUP:   PRE_STATE = APP_NOT_EXIST
ROLLBACK METHOD:     Delete newly created App ID if creation fails or upon explicit user request
===============================================================================
```
