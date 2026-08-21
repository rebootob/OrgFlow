# EMPLOYEE NAMELIST — PROTECTED MASTER FIELD INVENTORY

## 1. Master Strategy & Protection Overview
`Employee Namelist` is the **Authoritative Primary Employee Master App** for the entire enterprise. Multiple downstream Kintone Apps (e.g. Training, Leave, Performance Evaluation) depend on Lookup fields referencing `Employee Namelist`.

> [!CAUTION]
> **PROTECTED PRODUCTION MASTER APP RULE:**
> Under no circumstances shall fields in `Employee Namelist` be deleted, renamed, re-typed, or stripped of Unique/Required constraints. OrgFlow accesses `Employee Namelist` via a **READ-ONLY Mapping Layer** (`src/config/fieldMappings.js`).

---

## 2. Field Inventory & Classification Dictionary

| Label (Display Name) | Candidate Field Code | Kintone Type | Required | Unique | Lookup Dependency | Used by OrgFlow | Classification | Notes & Protective Strategy |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :--- | :--- |
| **Employee ID / Code** | `emp_code` / `Employee_ID` | SINGLE_LINE | Yes | Yes | **HIGH-RISK KEY** | Yes | `PROTECTED_EXISTING_FIELD` | Immutable Primary Key. Referenced by all downstream Lookups. |
| **Full Name (TH)** | `emp_name_th` | SINGLE_LINE | Yes | No | Copy Field | Yes | `REUSE` | Thai full name. Safe for read mapping. |
| **Full Name (EN)** | `emp_name_en` | SINGLE_LINE | No | No | Copy Field | Yes | `REUSE` | English full name. Safe for read mapping. |
| **Nickname** | `nickname` | SINGLE_LINE | No | No | No | Yes | `REUSE` | Safe for read mapping. |
| **Department** | `department` / `dept_code` | DROP_DOWN / TEXT | Yes | No | Copy Field | Yes | `REUSE` | Current Department string/code. OrgFlow reads for SSoT. |
| **Section / Unit** | `section` | SINGLE_LINE | No | No | Copy Field | Yes | `REUSE` | Section / Sub-unit title. |
| **Position Name** | `position` / `pos_title` | DROP_DOWN / TEXT | Yes | No | Copy Field | Yes | `REUSE` | Current Position Title. |
| **Job Grade** | `grade` / `job_level` | DROP_DOWN | No | No | No | Yes | `REUSE` | Employee Level / Grade. |
| **Employment Status** | `status` | DROP_DOWN | Yes | No | No | Yes | `REUSE` | E.g. 'Working', 'Active', 'Resigned'. |
| **Employment Type** | `emp_type` | DROP_DOWN | No | No | No | Yes | `REUSE` | E.g. Full-time, Contract, Outsource. |
| **Corporate Email** | `email` | SINGLE_LINE | No | No | No | Yes | `REUSE` | Work email address. |
| **Telephone / Ext** | `telephone` | SINGLE_LINE | No | No | No | Yes | `REUSE` | Work extension or phone number. |
| **Profile Photo** | `photo` / `attachment` | FILE | No | No | No | Yes | `REUSE` | Kintone file attachment field for avatar. |
| **Kintone User** | `kintone_user` / `user_select`| USER_SELECT | No | No | No | Yes | `EXTEND` | **Optional Mapping**. Can be NULL for non-user staff. |
| **Manager Employee ID** | `manager_emp_code` | SINGLE_LINE | No | No | No | Yes | `NEEDS_VERIFICATION` | If missing, stored in `OrgFlow Assignment App`. |
| **Salary / Compensation**| `salary` | NUMBER | Restr. | No | No | No | `NOT_REQUIRED` | **Confidential HR Field.** Excluded from OrgFlow payloads. |
| **Citizen ID / Passport**| `citizen_id` | SINGLE_LINE | Restr. | Yes | No | No | `NOT_REQUIRED` | **Sensitive Data.** Excluded from OrgFlow payloads. |
| **Bank Account No.** | `bank_account` | SINGLE_LINE | Restr. | No | No | No | `NOT_REQUIRED` | **Sensitive Data.** Excluded from OrgFlow payloads. |

---

## 3. Metadata Verification Status
- **Schema Discovery Source:** Form Metadata API (`/k/v1/app/form/fields.json`).
- **Live Metadata State:** `NEEDS_VERIFICATION` (Pending runtime API validation against production App ID).
