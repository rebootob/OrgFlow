# ORGFLOW — FINAL PRE-PHASE-3 KEY VALIDATION & IDENTITY ARCHITECTURE REPORT

## 1. Executive Summary & Key Architecture Decision
This document finalizes the Key Validation and Identity Architecture for OrgFlow prior to Phase 3.

### Primary Decision:
- **`EMPLOYEE_REFERENCE_KEY` = App 53 Field `Number` (Label: "Code")**
- **`ORGFLOW_INTERNAL_ID` = Synthetic Immutable ID (App ID + Kintone Record `$id`)**
- **`EMPLOYEE_BUSINESS_ATTRIBUTES` = `emp_text`, `Text_0`, `Text`, `Drop_down_0`, `Text_2`, etc.**

---

## 2. Field `Number` Production Metadata Verification

| Metadata Property | Verified Value | Empirical Impact |
| :--- | :--- | :--- |
| **Field Code** | `Number` | Verified in `fields_baseline.json` |
| **Field Label** | `"Code"` | Display name in App 53 form |
| **Field Type** | `NUMBER` | Kintone Numeric Data Type |
| **Required** | `false` | Form setting (`required = false`) |
| **Unique Setting** | `false` | Form setting (`unique = false`) |
| **Min / Max Value** | *None* | No range boundary defined in Kintone |
| **Default Value** | `""` (Empty string) | No default auto-fill in form |

---

## 3. Duplicate `Number` Value Empirical Inspection (1 Value / 2 Records)

| Metric | Empirical Finding |
| :--- | :--- |
| **Duplicate Value** | `9000` (Temporary / Dummy Placeholder Code) |
| **Affected Records Count** | **2 Records** (Record ID **`390`** and Record ID **`382`**) |
| **Record #1 Details** | Kintone `$id`: `390` \| `Number`: `9000` \| `emp_text`: `9000` \| Masked Name: `To***` \| Created: `2023-06-12` |
| **Record #2 Details** | Kintone `$id`: `382` \| `Number`: `9000` \| `emp_text`: `9000` \| Masked Name: `PAN***` \| Created: `2023-06-12` |
| **Root Cause Evidence** | ทั้งสองเรคคอร์ดถูกสร้างขึ้นในวันเดียวกัน (`2023-06-12`) และถูกกำหนดรหัสชั่วคราว `9000` |
| **Duplicate Data Action** | **0 Changes Made** (ห้ามแก้ไขข้อมูลใน Production App 53 โดยเด็ดขาด) |

---

## 4. Decoupled Identity Architecture Model

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       ORGFLOW IDENTITY ARCHITECTURE                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. ORGFLOW_INTERNAL_ID (Synthetic Key)                                      │
│    - Format: `ORG-APP53-{recordId}` (e.g. `ORG-APP53-390`, `ORG-APP53-382`) │
│    - Role: Internal immutable primary key for OrgFlow engines & SPA UI     │
│    - Guarantee: 100% Unique, Immutable, Zero Key Collision Risk              │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. EMPLOYEE_REFERENCE_KEY                                                   │
│    - App 53 Field: `Number` (Code)                                          │
│    - Role: External reference key to interface with 117 downstream apps    │
│    - Completeness: 100% (275/275 Records Non-Empty)                         │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. EMPLOYEE_BUSINESS_ATTRIBUTES                                             │
│    - Fields: `emp_text`, `Text_0` (Thai Name), `Text` (EN Name), `Text_2`   │
│    - Role: Business display attributes & secondary lookup support          │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Historical Truth & Current State Governance Rule

```
===============================================================================
CURRENT STATE vs HISTORICAL TIMELINE TRUTH
===============================================================================

Current Employee State:
- Source: Kintone App 53 ("Employee Namelist")
- Role: Represents the LATEST CURRENT STATE of employees in production.

Organization Historical Assignment Timeline:
- Source: OrgFlow Org Assignment History Log App (`ASSIGNMENT_LOG`)
- Role: Represents time-based Effective Date snapshots (Start Date -> End Date).

GOVERNANCE RULE:
OrgFlow NEVER treats Department/Position in App 53 as Historical Truth.
All historical org chart views (Time Machine) query the Effective Date timeline
stored in `ASSIGNMENT_LOG`.
===============================================================================
```

---

## 6. Final Verification Summary Statuses

```text
NUMBER KEY SUITABILITY:
PASS WITH LIMITATION (273/275 Records 100% Unique; 2 Records with dummy 9000 handled via ORGFLOW_INTERNAL_ID)

DUPLICATE RISK:
VERY LOW (0.73% / 2 Records affected by dummy code 9000; Risk fully mitigated by Synthetic Internal ID)

ORGFLOW REFERENCE KEY:
Number (App 53 Field "Number")

INTERNAL ID STRATEGY:
OrgFlow Synthetic Immutable ID (ORG-APP53-{recordId})
```
