# ORGFLOW PHASE 5B — PRE-CREATION SCHEMA VALIDATION & PRODUCTION CHANGE PLAN

## 1. Executive Summary & Schema Readiness Status

| Metric / Audit Area | Verification Status | Detailed Architecture Resolution |
| :--- | :---: | :--- |
| **ORG_MASTERS SCHEMA** | **`READY`** | Resolved all 5 architecture gaps (added `dept_code`, `effective_from`, `effective_to`) |
| **ARCHITECTURE GAPS CLOSED** | **5 Gaps Closed** | 1. Position->Dept Link (`dept_code`), 2. Effective Dates, 3. Prefix Uniqueness, 4. Head Cache Policy, 5. Soft Delete Policy |
| **TOTAL FORM FIELDS** | **13 Fields** | 4 Shared, 3 Department Only, 4 Position Only, 2 Timeline Fields |
| **HISTORICAL INTEGRITY** | **PASS** | Soft Delete Policy (`is_active = INACTIVE` + `effective_to`). Zero Hard Delete. |
| **VACANCY MODEL** | **PASS** | Authoritative Position Quota stored in `POSITION` entity (`headcount_quota`) |
| **TIME MACHINE COMPATIBILITY**| **PASS** | Time-based snapshots supported via `effective_from` & `effective_to` |

---

## 2. Comprehensive Field-by-Field Final Schema Matrix

| Field Code | Label (TH) | Label (EN) | Kintone Type | Required | Unique | Default | Used By Department | Used By Position | Purpose & Validation Rules | Example Value |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- | :--- |
| **`master_type`** | ประเภทข้อมูล | Master Type | `DROP_DOWN` | **YES** | NO | `DEPARTMENT` | YES | YES | Discriminator (`DEPARTMENT` / `POSITION`) | `DEPARTMENT` |
| **`entity_code`** | รหัสหน่วยงาน/ตำแหน่ง | Entity Code | `SINGLE_LINE_TEXT` | **YES** | **YES** | `""` | YES | YES | Primary Key with Prefix (`DEP-` / `POS-`) | `DEP-MFG` |
| **`title_th`** | ชื่อภาษาไทย | Thai Title | `SINGLE_LINE_TEXT` | **YES** | NO | `""` | YES | YES | Display Title in Thai | `ฝ่ายการผลิต` |
| **`title_en`** | ชื่อภาษาอังกฤษ | English Title | `SINGLE_LINE_TEXT` | NO | NO | `""` | YES | YES | Display Title in English | `Manufacturing Department` |
| **`parent_code`** | รหัสหน่วยงานแม่ | Parent Unit Code | `SINGLE_LINE_TEXT` | NO | NO | `""` | **YES** | NO | Parent Dept (`DEP-`). Prevents Self/Circular Parent. | `DEP-CORP` |
| **`dept_code`** | รหัสหน่วยงานที่สังกัด | Department Code | `SINGLE_LINE_TEXT` | NO | NO | `""` | NO | **YES** | Links Position to Organization Unit (`DEP-`) | `DEP-MFG` |
| **`head_employee_ref`**| รหัสผู้บังคับบัญชา | Head Employee Ref| `SINGLE_LINE_TEXT` | NO | NO | `""` | **YES** | NO | Current Head Cache (Authoritative truth in Log) | `1001` |
| **`headcount_quota`** | โควต้าอัตรากำลัง | Headcount Quota | `NUMBER` | NO | NO | `0` | NO | **YES** | Approved Headcount Quota for Vacancy calculation | `5` |
| **`job_level`** | ระดับตำแหน่ง | Job Grade Level | `NUMBER` | NO | NO | `1` | NO | **YES** | Position Grade Hierarchy (1 to 10) | `4` |
| **`display_order`** | ลำดับการแสดงผล | Display Order | `NUMBER` | NO | NO | `10` | YES | YES | UI Sorting Index in Org Tree | `10` |
| **`is_active`** | สถานะการใช้งาน | Active Status | `RADIO_BUTTON` | **YES** | NO | `ACTIVE` | YES | YES | `ACTIVE` / `INACTIVE` (Soft Delete Protocol) | `ACTIVE` |
| **`effective_from`** | วันที่มีผลบังคับใช้ | Effective From | `DATE` | **YES** | NO | `2020-01-01` | YES | YES | Time Machine Start Date | `2020-01-01` |
| **`effective_to`** | วันที่สิ้นสุดผลบังคับใช้| Effective To | `DATE` | NO | NO | `""` | YES | YES | Time Machine End Date (Empty = Current Active) | `""` |

---

## 3. Key Architecture & Resolution Rules

### A. Prefix Naming Convention (`entity_code`)
- **Department / Org Unit Code:** MUST begin with `DEP-` prefix (e.g. `DEP-CORP`, `DEP-MFG`, `DEP-INJ`).
- **Position Code:** MUST begin with `POS-` prefix (e.g. `POS-MGR-MFG`, `POS-ENG-INJ`).
- **Uniqueness Enforcement:** `entity_code` has `unique = true` in Kintone form configuration, guaranteeing zero key collisions between Departments and Positions.

### B. Department Hierarchy & Validation Rules (`parent_code`)
- `parent_code` is used ONLY when `master_type = DEPARTMENT`.
- **Validation Rules:**
  1. `parent_code !== entity_code` (Self-parenting strictly forbidden).
  2. `parent_code` must exist as an active record in `ORG_MASTERS` with `master_type = DEPARTMENT`.
  3. Circular ancestry ($A \rightarrow B \rightarrow A$) is trapped and rejected by `validationEngine.js`.

### C. Position to Department Relationship (`dept_code`)
- `dept_code` is used ONLY when `master_type = POSITION`.
- Stores the `entity_code` of the parent Organization Unit where the position belongs, providing exact 1-to-N department-to-position mapping.

### D. Data Source of Truth & Cache Boundaries
- **Authoritative Source of Truth for Department Head & Manager Assignments:** `ASSIGNMENT_LOG` (App 5C).
- **Role of `head_employee_ref` in `ORG_MASTERS`:** Optional Current Display Cache only.

---

## 4. Final Production Change Plan for Phase 5B

```text
===============================================================================
FINAL PRODUCTION CHANGE PLAN: PHASE 5B — CREATE ORG_MASTERS APP
===============================================================================
TARGET:             Kintone Production Environment (https://ttmet.cybozu.com)
ACTION:             CREATE NEW APP ("OrgFlow Organization Masters")
APP NAME:           OrgFlow Organization Masters
CURRENT STATE:      APP_NOT_EXIST (ยังไม่มี App นี้ในระบบ)
PROPOSED STATE:     NEW APP CREATED WITH 13 VERIFIED FORM FIELDS & DEFAULT VIEWS

FORM FIELDS SPECIFICATION (13 FIELDS):
1.  master_type        (DROP_DOWN, Required, Default: DEPARTMENT)
2.  entity_code        (SINGLE_LINE_TEXT, Required, Unique)
3.  title_th           (SINGLE_LINE_TEXT, Required)
4.  title_en           (SINGLE_LINE_TEXT, Optional)
5.  parent_code        (SINGLE_LINE_TEXT, Optional)
6.  dept_code          (SINGLE_LINE_TEXT, Optional)
7.  head_employee_ref  (SINGLE_LINE_TEXT, Optional)
8.  headcount_quota    (NUMBER, Optional, Default: 0)
9.  job_level          (NUMBER, Optional, Default: 1)
10. display_order      (NUMBER, Optional, Default: 10)
11. is_active          (RADIO_BUTTON, Required, Default: ACTIVE)
12. effective_from     (DATE, Required, Default: 2020-01-01)
13. effective_to       (DATE, Optional)

INITIAL VIEWS:       All Records (Table View), Departments Only (Tree View), Positions Only (Quota View)
INITIAL PERMISSIONS: Administrator (Full Access), GENERAL_SHARED (View Records Only)

PRE-CHANGE BACKUP:   PRE_STATE = APP_NOT_EXIST
ROLLBACK METHOD:     Delete newly created App ID if creation fails or upon explicit user request
===============================================================================
```
