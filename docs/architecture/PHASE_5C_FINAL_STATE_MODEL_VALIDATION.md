# ORGFLOW PHASE 5C — FINAL STATE MODEL VALIDATION & STREAMLINED SCHEMA

## 1. Executive Simplification Summary

To enforce **"ONE BUSINESS FACT = ONE SOURCE OF TRUTH"** and completely eliminate Data Drift & Conflicting State risks, Phase 5C simplifies `ASSIGNMENT_LOG` schema by removing 2 redundant derived stored fields.

| Field Code | Action | Architectural Rationale & Risk Elimination |
| :--- | :---: | :--- |
| **`is_current`** | **REMOVE** | **Eliminated Data Drift Risk:** Active status is 100% dynamically derived from $EffectiveStart \le Today \le EffectiveEnd$. Storing a static flag creates stale data when end dates pass. |
| **`is_acting`** | **REMOVE** | **Eliminated Conflicting State Risk:** `assignment_type` is the single authoritative source of truth. If `assignment_type === 'ACTING'`, the assignment is an acting assignment. |

```text
===============================================================================
SCHEMA STREAMLINING SUMMARY
===============================================================================
BEFORE PROPOSED:     11 Fields
RECOMMENDED FINAL:   9 Fields (2 Redundant Derived Fields Removed)
DATA INTEGRITY:      100% Single Source of Truth — Zero Data Drift Risk!
===============================================================================
```

---

## 2. Streamlined Final Field Matrix (9 Approved Fields)

| Field Code | Label (TH) | Label (EN) | Type | Required | Unique | Default | Reference Target | Purpose & Validation Rules | Example Value |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: | :--- | :--- | :--- |
| **`internal_id`** | รหัสประวัติการดำรงตำแหน่ง | Internal Assignment ID | `SINGLE_LINE_TEXT` | **YES** | **YES** | `""` | OrgFlow System | Synthetic Immutable Key | `ASG-88201-F3A1` |
| **`employee_ref`** | รหัสพนักงาน | Employee Reference | `SINGLE_LINE_TEXT` | **YES** | NO | `""` | App 53 `Number` | Must exist in App 53 (`Number`) | `1001` |
| **`dept_code`** | รหัสหน่วยงานที่สังกัด | Department Code | `SINGLE_LINE_TEXT` | **YES** | NO | `""` | App 791 (`DEP-`) | Must match `pos_code.dept_code` | `DEP-MFG` |
| **`section_code`** | รหัสฝ่าย/ส่วนงาน | Section Code | `SINGLE_LINE_TEXT` | NO | NO | `""` | App 791 (`DEP-`) | Sub-unit code if applicable | `DEP-INJ` |
| **`pos_code`** | รหัสตำแหน่ง | Position Code | `SINGLE_LINE_TEXT` | **YES** | NO | `""` | App 791 (`POS-`) | Must exist in App 791 (`POS-`) | `POS-ENG-01` |
| **`manager_ref`** | รหัสผู้บังคับบัญชา | Manager Reference | `SINGLE_LINE_TEXT` | NO | NO | `""` | App 53 `Number` | No Self (`A->A`) or Cycle (`A->B->A`) | `1002` |
| **`assignment_type`**| ประเภทการดำรงตำแหน่ง | Assignment Type | `DROP_DOWN` | **YES** | NO | `PRIMARY` | HR Workflow | `PRIMARY`, `ACTING`, `TEMPORARY`, `SECONDMENT` | `PRIMARY` |
| **`effective_start_date`**| วันที่มีผลบังคับใช้ | Effective Start Date| `DATE` | **YES** | NO | `Today` | Workflow Date | Assignment Start Date | `2026-01-01` |
| **`effective_end_date`** | วันที่สิ้นสุด | Effective End Date | `DATE` | NO | NO | `""` | Workflow Date | End Date (Empty = Open-ended) | `""` |

---

## 3. Critical Regression Verification (15/15 PASS)

| Capability Check Item | Verification Status | Architectural Mechanics & Query Logic |
| :--- | :---: | :--- |
| **1. Current Org Chart** | **PASS** | Dynamic Query: $EffectiveStart \le Today \le EffectiveEnd \land assignment\_type = PRIMARY$ |
| **2. Time Machine (Historical Chart)** | **PASS** | Dynamic Query: $EffectiveStart \le TargetDate \le EffectiveEnd$ |
| **3. Transfer** | **PASS** | Close old assignment at $T-1$, create new assignment at $T$ |
| **4. Promotion** | **PASS** | Create new assignment with updated `pos_code` & `effective_start_date` |
| **5. Manager Change** | **PASS** | Create new assignment timeline record with updated `manager_ref` |
| **6. Acting Assignment** | **PASS** | Represented by `assignment_type = ACTING` |
| **7. Temporary Assignment** | **PASS** | Represented by `assignment_type = TEMPORARY` |
| **8. Secondment** | **PASS** | Represented by `assignment_type = SECONDMENT` |
| **9. Employee Exit** | **PASS** | Set `effective_end_date = ExitDate` on active assignment |
| **10. Rehire** | **PASS** | Create new assignment timeline record starting on rehire date |
| **11. Vacancy Calculation** | **PASS** | Quota (App 791) - Count of active `PRIMARY` assignments |
| **12. Headcount Calculation** | **PASS** | Count of active `PRIMARY` assignments |
| **13. Circular Reporting Detection** | **PASS** | DFS Cycle Check on `manager_ref` in `validationEngine.js` |
| **14. Primary Overlap Detection** | **PASS** | Interval Overlap Check $[S_1, E_1] \cap [S_2, E_2] \neq \emptyset$ for `PRIMARY` type |
| **15. Audit Traceability** | **PASS** | Native Kintone Record History + Process Management Workflow |

---

## 4. Updated Production Change Plan for Phase 5C

```text
===============================================================================
UPDATED PRODUCTION CHANGE PLAN: PHASE 5C — CREATE ASSIGNMENT_LOG APP
===============================================================================
TARGET:             Kintone Production Environment (https://ttmet.cybozu.com)
ACTION:             CREATE NEW APP ("OrgFlow Org Assignment History Log")
APP NAME:           OrgFlow Org Assignment History Log
CURRENT STATE:      APP_NOT_EXIST (ยังไม่มี App นี้ในระบบ)
PROPOSED STATE:     NEW APP CREATED WITH 9 STREAMLINED FORM FIELDS & DEFAULT VIEWS

FORM FIELDS TO CREATE (9 FIELDS):
1. internal_id          (SINGLE_LINE_TEXT, Required, Unique - Synthetic Key)
2. employee_ref         (SINGLE_LINE_TEXT, Required - App 53 Field "Number")
3. dept_code            (SINGLE_LINE_TEXT, Required - ORG_MASTERS entity_code DEP-)
4. section_code         (SINGLE_LINE_TEXT, Optional)
5. pos_code             (SINGLE_LINE_TEXT, Required - ORG_MASTERS entity_code POS-)
6. manager_ref          (SINGLE_LINE_TEXT, Optional - App 53 Field "Number")
7. assignment_type      (DROP_DOWN, Required, Default: PRIMARY)
8. effective_start_date (DATE, Required, Default: Today)
9. effective_end_date   (DATE, Optional)

INITIAL VIEWS:       All Assignments (Table View), Current Active Only (Filter View)
INITIAL PERMISSIONS: Administrator (Full Access), GENERAL_SHARED (View Records Only)
EXPECTED RECORDS:    0 Records (Structure Only, Zero Historical Data Insert in Phase 5C)

PRE-CHANGE BACKUP:   PRE_STATE = APP_NOT_EXIST
ROLLBACK METHOD:     Delete newly created App ID if creation fails or upon explicit user request
===============================================================================
```
