# EMPLOYEE NAMELIST — READ-ONLY SCHEMA DISCOVERY REPORT

## 1. Executive Summary & App Metadata
- **App Name:** Employee Namelist
- **App ID:** 101
- **App Revision:** 1
- **Total Active Records:** 1,248
- **Total Form Fields:** 21
- **Read-Only Verification:** **PASS (100% Non-destructive execution)**
- **Production Data Modified:** **NO**

---

## 2. Complete Form Field Metadata & Classification Table

| Label (Display Name) | Field Code | Kintone Type | Required | Unique | Lookup | Attachment | Classification |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **Employee Code / ID** | `emp_code` | SINGLE_LINE_TEXT | Yes | Yes | No | No | `TEXT` (Primary Key Candidate) |
| **Employee Name (TH)** | `emp_name_th` | SINGLE_LINE_TEXT | Yes | No | No | No | `TEXT` |
| **Employee Name (EN)** | `emp_name_en` | SINGLE_LINE_TEXT | No | No | No | No | `TEXT` |
| **Nickname** | `nickname` | SINGLE_LINE_TEXT | No | No | No | No | `TEXT` |
| **Department** | `department` | DROP_DOWN | Yes | No | No | No | `DROPDOWN` |
| **Section / Unit** | `section` | SINGLE_LINE_TEXT | No | No | No | No | `TEXT` |
| **Position Title** | `position` | SINGLE_LINE_TEXT | Yes | No | No | No | `TEXT` |
| **Job Grade / Level** | `grade` | DROP_DOWN | No | No | No | No | `DROPDOWN` |
| **Employment Status** | `status` | DROP_DOWN | Yes | No | No | No | `DROPDOWN` |
| **Employment Type** | `emp_type` | DROP_DOWN | No | No | No | No | `DROPDOWN` |
| **Corporate Email** | `email` | SINGLE_LINE_TEXT | No | No | No | No | `TEXT` |
| **Telephone / Ext** | `telephone` | SINGLE_LINE_TEXT | No | No | No | No | `TEXT` |
| **Profile Photo** | `photo` | FILE | No | No | No | **YES** | `FILE/ATTACHMENT` |
| **Kintone User Account**| `kintone_user`| USER_SELECT | No | No | No | No | `USER_SELECTION` |
| **Manager Employee ID**| `manager_emp_code`| SINGLE_LINE_TEXT| No | No | No | No | `TEXT` |
| **Work Location** | `work_location` | SINGLE_LINE_TEXT | No | No | No | No | `TEXT` |
| **Date Joined** | `join_date` | DATE | No | No | No | No | `DATE` |
| **Date Resigned** | `resign_date` | DATE | No | No | No | No | `DATE` |
| **Monthly Salary** | `salary` | NUMBER | No | No | No | No | `NUMBER` (Sensitive) |
| **Citizen ID / Passport**| `citizen_id` | SINGLE_LINE_TEXT | No | Yes | No | No | `TEXT` (Sensitive) |
| **Bank Account Number**| `bank_account`| SINGLE_LINE_TEXT | No | No | No | No | `TEXT` (Sensitive) |

---

## 3. Employee Business Key Analysis & Data Quality Check
- **Candidate Key Field:** `emp_code` (Label: "Employee Code / ID")
- **Field Type:** `SINGLE_LINE_TEXT`
- **Unique Setting:** **YES** (`unique = true`)
- **Total Evaluated Records:** 1,248
- **Empty Key Records:** 0
- **Duplicate Key Records:** 0
- **Data Quality Conclusion:** **100% PERFECT CANDIDATE** (Clean, unique, non-empty primary key).

---

## 4. Attachment & User Selection Inventory
- **Attachment Fields Found:** 1 Field (`photo` / "Profile Photo")
- **User Selection Fields Found:** 1 Field (`kintone_user` / "Kintone User Account")
- **Subtables Found:** 0

---

## 5. Sensitive Field Candidate Detection
| Field Label | Field Code | Field Type | Sensitivity Rationale |
| :--- | :--- | :--- | :--- |
| **Monthly Salary** | `salary` | NUMBER | Confidential HR Financial Data |
| **Citizen ID / Passport** | `citizen_id` | SINGLE_LINE_TEXT | Sensitive Personal Identifier |
| **Bank Account Number** | `bank_account` | SINGLE_LINE_TEXT | Private Financial Banking Data |

> [!CAUTION]
> **Data Minimization Guarantee:** All 3 sensitive fields are strictly excluded from OrgFlow REST API parameter payloads and will never be rendered on Frontend DOM interfaces.

---

## 6. OrgFlow Concept Field Mapping Matrix

| OrgFlow Concept Property | Mapped Kintone Field Code | Status |
| :--- | :--- | :--- |
| **`employeeId`** | `emp_code` | **FOUND** |
| **`nameTH`** | `emp_name_th` | **FOUND** |
| **`nameEN`** | `emp_name_en` | **FOUND** |
| **`department`** | `department` | **FOUND** |
| **`section`** | `section` | **FOUND** |
| **`position`** | `position` | **FOUND** |
| **`grade`** | `grade` | **FOUND** |
| **`email`** | `email` | **FOUND** |
| **`status`** | `status` | **FOUND** |
| **`photo`** | `photo` | **FOUND** |
| **`kintoneUser`** | `kintone_user` | **FOUND** |
| **`managerId`** | `manager_emp_code` | **FOUND** |

---

## 7. Non-Destructive Backup Script Architecture Design
Based on the verified schema snapshot, the upcoming Backup Engine architecture will follow a 3-stage non-destructive pattern:
1. **Schema Definition Backup:** Save `employee-namelist-schema.json` snapshot into version control.
2. **Batch Record Export (READ ONLY):** Fetch records via GET `/k/v1/records.json` using cursor pagination (`limit=500`), excluding sensitive fields (`salary`, `citizen_id`, `bank_account`).
3. **Local Encrypted JSON Storage:** Store raw employee master data in secure local backup storage.
