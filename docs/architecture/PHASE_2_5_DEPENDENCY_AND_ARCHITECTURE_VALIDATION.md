# ORGFLOW — PHASE 2.5 DEPENDENCY VERIFICATION & ARCHITECTURE VALIDATION REPORT

## 1. Reverse Dependency Verification (Existing Enterprise Apps)

The following matrix documents the verification status of downstream enterprise apps that interact with **`Employee Namelist` (App ID 53)**:

| App Name | Target App ID | Verified From Production | Lookup Field Code | Source Key Field | Copied Fields | Verification Status |
| :--- | :---: | :---: | :---: | :---: | :--- | :---: |
| **Training Summary** | *UNVERIFIED* | **NO** | `emp_text` (Expected) | `emp_text` | Name, Department, Position | **`NOT VERIFIED`** |
| **Leave Request** | *UNVERIFIED* | **NO** | `emp_text` (Expected) | `emp_text` | Name, Department, Position | **`NOT VERIFIED`** |
| **Evaluation System** | *UNVERIFIED* | **NO** | `emp_text` (Expected) | `emp_text` | Name, Department, Position | **`NOT VERIFIED`** |
| **Asset & Expense** | *UNVERIFIED* | **NO** | `emp_text` (Expected) | `emp_text` | Name, Department | **`NOT VERIFIED`** |

> [!NOTE]
> **Safety Note:** In accordance with the No-Assumption Governance Policy, downstream lookup apps are classified as **`NOT VERIFIED`** until explicit Kintone REST API Read-Only Discovery is executed on their respective App IDs.

---

## 2. Classification of Phase 2 Findings

| ITEM | VALUE | SOURCE | STATUS |
| :--- | :--- | :--- | :---: |
| **Employee Master App ID** | `53` | Production API (`GET /k/v1/app.json?id=53`) | **`VERIFIED_PRODUCTION`** |
| **Employee Master App Name** | `"Employee Namelist"` | Production API (`GET /k/v1/app.json?id=53`) | **`VERIFIED_PRODUCTION`** |
| **Primary Employee Key** | `emp_text` (Label: "Employee ID") | Form Fields API (`fields_baseline.json`) | **`VERIFIED_PRODUCTION`** |
| **Production Record Count** | `275 Records` | Records Export API (`records_baseline.json`) | **`VERIFIED_PRODUCTION`** |
| **Form Fields Count** | `44 Fields` | Form Fields API (`fields_baseline.json`) | **`VERIFIED_PRODUCTION`** |
| **Profile Photo Field** | `Attachment` (Type: `FILE`) | Form Fields API & Binary Backup | **`VERIFIED_PRODUCTION`** |
| **Thai Name Field** | `Text_0` (Label: "ชื่อ - นามสกุล") | Form Fields API (`fields_baseline.json`) | **`VERIFIED_PRODUCTION`** |
| **English Name Field** | `Text` (Label: "Name - Surname") | Form Fields API (`fields_baseline.json`) | **`VERIFIED_PRODUCTION`** |
| **Department Field** | `Drop_down_0` (Label: "Departmant")| Form Fields API (`fields_baseline.json`) | **`VERIFIED_PRODUCTION`** |
| **Section Field** | `Drop_down_1` (Label: "Section Name")| Form Fields API (`fields_baseline.json`) | **`VERIFIED_PRODUCTION`** |
| **Position Field** | `Text_2` (Label: "Position") | Form Fields API (`fields_baseline.json`) | **`VERIFIED_PRODUCTION`** |
| **Training App Dependency** | Presumed Lookup | Reference Table `Related_records` | **`NOT_VERIFIED`** |
| **Leave App Dependency** | Presumed Lookup | Architectural Hypothesis | **`NOT_VERIFIED`** |
| **Evaluation App Dependency** | Presumed Lookup | Reference Table `Related_records_0` | **`NOT_VERIFIED`** |
| **Department Master App** | Proposed Extension | System Architecture Design | **`PROPOSED_ARCHITECTURE`** |
| **Position Master App** | Proposed Extension | System Architecture Design | **`PROPOSED_ARCHITECTURE`** |
| **Assignment History Log App**| Proposed Extension | System Architecture Design | **`PROPOSED_ARCHITECTURE`** |
| **Org Change Request App** | Proposed Extension | System Architecture Design | **`PROPOSED_ARCHITECTURE`** |
| **Audit Change Log App** | Proposed Extension | System Architecture Design | **`PROPOSED_ARCHITECTURE`** |

---

## 3. Extension Apps Architecture Validation (5-App Evaluation)

### 1. Department Master App (`DEPARTMENT_MASTER`)
- **PURPOSE:** Manages parent-child department hierarchy, Thai/EN department titles, and Department Head assignments.
- **SOURCE OF TRUTH:** OrgFlow Department Master.
- **DATA OWNERSHIP:** HR / Admin.
- **WHY SEPARATE APP:** App 53 only stores department as a simple string dropdown (`Drop_down_0`). It cannot represent parent-child tree relationships or department head links.
- **RELATIONSHIP TO APP 53:** Provides standardized department codes referenced in OrgFlow views.
- **DUPLICATION RISK:** LOW (Departments are master metadata, not transaction records).
- **HISTORY REQUIREMENT:** LOW.
- **SECURITY REQUIREMENT:** Read for all staff, Write for HR Admin.
- **CAN BE COMBINED WITH ANOTHER APP:** **YES** (Can be combined into a single `ORG_MASTERS` app containing both Department & Position tabs if desired).
- **RECOMMENDATION:** **`REQUIRED`** (Either as a dedicated app or combined Master app).

### 2. Position Master App (`POSITION_MASTER`)
- **PURPOSE:** Stores position titles, job grades, and approved headcount quotas for Vacancy analytics.
- **SOURCE OF TRUTH:** OrgFlow Position Master.
- **DATA OWNERSHIP:** HR / Executive.
- **WHY SEPARATE APP:** App 53 stores position as a plain text string (`Text_2`). It has no mechanism for headcount quota tracking or job grade levels.
- **RELATIONSHIP TO APP 53:** Standardizes position titles and provides headcount quota thresholds.
- **DUPLICATION RISK:** LOW.
- **HISTORY REQUIREMENT:** LOW.
- **SECURITY REQUIREMENT:** Read for staff, Write for HR.
- **CAN BE COMBINED WITH ANOTHER APP:** **YES** (Can be combined with Department Master into `ORG_MASTERS`).
- **RECOMMENDATION:** **`REQUIRED`** (For Headcount & Vacancy Management).

### 3. Org Assignment History Log App (`ASSIGNMENT_LOG`)
- **PURPOSE:** Records time-based assignment history (Start Date -> End Date) for employees across departments and positions.
- **SOURCE OF TRUTH:** OrgFlow Assignment Engine.
- **DATA OWNERSHIP:** System / HR.
- **WHY SEPARATE APP:** App 53 only stores current department and position. It overwrites previous values upon transfer, destroying historical timeline data.
- **RELATIONSHIP TO APP 53:** References `emp_text` (Employee ID) to provide "Time Machine" historical org chart views.
- **DUPLICATION RISK:** ZERO (Event log architecture).
- **HISTORY REQUIREMENT:** **CRITICAL (100% Audit Trail)**.
- **SECURITY REQUIREMENT:** Read-only for staff, Append-only for HR workflows.
- **CAN BE COMBINED WITH ANOTHER APP:** **NO** (Must be a dedicated append-only log for integrity).
- **RECOMMENDATION:** **`REQUIRED`** (Required for Effective Date Time Machine feature).

### 4. Org Change Workflow Request App (`CHANGE_REQUEST`)
- **PURPOSE:** Provides approval workflow for transfers, promotions, and department realignments with effective dates.
- **SOURCE OF TRUTH:** OrgFlow Approval Engine.
- **DATA OWNERSHIP:** HR & Line Managers.
- **WHY SEPARATE APP:** App 53 does not support multi-step approval workflows for organization restructuring.
- **RELATIONSHIP TO APP 53:** Upon final approval, automatically updates App 53 and appends to `ASSIGNMENT_LOG`.
- **DUPLICATION RISK:** ZERO.
- **HISTORY REQUIREMENT:** HIGH (Approval trail).
- **SECURITY REQUIREMENT:** Strict Kintone Process Management & Role-based ACL.
- **CAN BE COMBINED WITH ANOTHER APP:** **NO** (Must be separate for Kintone Process Management workflow).
- **RECOMMENDATION:** **`REQUIRED`** (Required for Org Change Governance).

### 5. Audit Change Log App (`CHANGE_LOG`)
- **PURPOSE:** Audit log for system actions.
- **SOURCE OF TRUTH:** System Audit Logger.
- **DATA OWNERSHIP:** System Admin.
- **WHY SEPARATE APP:** Proposed to capture granular API activity.
- **RELATIONSHIP TO APP 53:** Logs API triggers.
- **DUPLICATION RISK:** **HIGH** (Kintone native **Record History** and **Process Management History** already record WHO, WHAT, and WHEN for every change on App 53 and Change Request App!).
- **HISTORY REQUIREMENT:** Handled by Kintone Platform.
- **SECURITY REQUIREMENT:** Admin only.
- **CAN BE COMBINED WITH ANOTHER APP:** **YES** (Redundant with Kintone Native Record Revision History + Change Request Approval Log).
- **RECOMMENDATION:** **`REMOVE`** (Consolidate into `CHANGE_REQUEST` Process History + Kintone Native Revision History to eliminate redundancy!).

---

## 4. CHANGE_LOG Special Review: Dedicated App vs Native History

```
===============================================================================
COMPARISON: DEDICATED CHANGE_LOG APP vs NATIVE KINTONE REVISION HISTORY
===============================================================================

Option A (Dedicated CHANGE_LOG App):
- Requires creating an extra Kintone App (App 06).
- Requires writing double API calls for every action.
- Increases storage overhead and API call consumption.
- Adds maintenance burden.

Option B (CHANGE_REQUEST + Kintone Native Record & Process History) [RECOMMENDED]:
- Kintone natively records exact revision history on every record update (Revision number, Timestamp, Modifier user account, Before/After values).
- Kintone Process Management natively records approval chains (Approver name, Timestamp, Action taken, Comments).
- OrgFlow `CHANGE_REQUEST` app tracks request history natively.
- ZERO extra app required! ZERO redundant data storage!
===============================================================================
```

**Architectural Decision:** **Adopt Option B (Eliminate Dedicated `CHANGE_LOG` App).**

---

## 5. Shared Account Security: UI Restriction vs Kintone Enforced Security

> [!CAUTION]
> **CRITICAL SECURITY PRINCIPLE:**
> **JavaScript / UI Restrictions DO NOT equal Security Enforcement.**
> A user can open Developer Tools (F12) or call REST APIs directly.
> Security MUST be enforced at the **Kintone Platform ACL Level** (`X-Cybozu-Authorization` / User Account Session).

### Proposed Multi-Role Permission Model:

| System Access Role | Identified Account Type | UI Action Allowed | Kintone API Permission Allowed | Security Enforcement Mechanism |
| :--- | :--- | :--- | :--- | :--- |
| **`GENERAL_SHARED`** | Common Shared Kintone Account | View Public Org Chart & Directory | **READ-ONLY (`GET` APIs Only)** | Kintone App ACL: **View Records Only** (Disable Add/Edit/Delete in Kintone App Settings) |
| **`DEPARTMENT_MANAGER`**| Individual User Account | View Team, View Vacancy, Submit Change Request | Read All, Create Change Request | Kintone App ACL + Process Management Role |
| **`HR`** | Individual User Account | View All, Submit Request, Manage Masters | Read/Write Masters, Submit Requests | Kintone App ACL + User Group (`HR_Group`) |
| **`HR_MANAGER`** | Individual User Account | View All, Approve Requests, Execute Transfers | Full Read/Write, Process Approval | Kintone App ACL + Process Approval Role |
| **`GM / EXECUTIVE`** | Individual User Account | Executive Analytics, View Org History, Approve High-Level | Read All, High-Level Process Approval | Kintone App ACL + Executive Group |
| **`ADMIN`** | Individual User Account | Full System Management & Config | Full App Administration | Kintone App Administrator |

---

## 6. Protected Employee Master Field Register (App ID 53)

| Field Code | Field Label | Kintone Type | Master / Derived | Used By OrgFlow | Dependent Apps | Change Risk | Protection Level |
| :--- | :--- | :--- | :---: | :---: | :--- | :---: | :---: |
| **`emp_text`** | Employee ID | `SINGLE_LINE_TEXT` | **MASTER** | **Primary Key** | Training, Leave, Evaluation, Asset | **CRITICAL** | 🔴 **LEVEL 5 (PROTECTED)** |
| **`Text_0`** | ชื่อ - นามสกุล | `SINGLE_LINE_TEXT` | **MASTER** | Thai Name | All Downstream Lookup Apps | **HIGH** | 🔴 **LEVEL 5 (PROTECTED)** |
| **`Text`** | Name - Surname | `SINGLE_LINE_TEXT` | **MASTER** | EN Name | All Downstream Lookup Apps | **HIGH** | 🔴 **LEVEL 5 (PROTECTED)** |
| **`Text_1`** | Nickname | `SINGLE_LINE_TEXT` | **MASTER** | Nickname | Downstream Reports | **MEDIUM** | 🟡 **LEVEL 4 (PROTECTED)** |
| **`Drop_down_0`**| Departmant | `DROP_DOWN` | **MASTER** | Dept Filter | Leave & Expense Apps | **HIGH** | 🔴 **LEVEL 5 (PROTECTED)** |
| **`Drop_down_1`**| Section Name | `DROP_DOWN` | **MASTER** | Section Filter | Internal Section Reports | **HIGH** | 🔴 **LEVEL 5 (PROTECTED)** |
| **`Text_2`** | Position | `SINGLE_LINE_TEXT` | **MASTER** | Position Title| Approval Routing & Lookups | **HIGH** | 🔴 **LEVEL 5 (PROTECTED)** |
| **`Text_4`** | Email | `SINGLE_LINE_TEXT` | **MASTER** | Email Contact | Email Notification Workflows | **HIGH** | 🔴 **LEVEL 5 (PROTECTED)** |

---

## 7. Final Streamlined Architecture Recommendation

```
===============================================================================
FINAL STREAMLINED ORGFLOW ARCHITECTURE
===============================================================================

EXISTING APPS:
- 1 App: "Employee Namelist" (App ID 53 - Primary Employee Master)

NEW EXTENSION APPS REQUIRED:
- 3 Apps (Optimized from 5):
  1. OrgFlow Organization Masters App (Combines Department Master + Position Master)
  2. OrgFlow Org Assignment History Log App (Time-based Effective Date Log)
  3. OrgFlow Org Change Workflow Request App (Approval Flow for Transfers & Promotions)

OPTIONAL APPS:
- 0 Apps (Audit Change Log merged into Native Kintone History + Change Request)

TOTAL SYSTEM APPS:
- 4 Kintone Apps Total (1 Protected Primary Master + 3 Extension Apps)
===============================================================================
```

### 💡 HR Daily Workflow & Experience Target:
> **Question:** How many apps does HR interact with daily?
> **Answer: EXACTLY ONE (1) PORTAL.**
> HR and employees access OrgFlow through a **Single Unified Custom View SPA Portal** inside Kintone.
> HR will **NEVER** need to navigate between multiple Kintone apps manually.
> The SPA Portal presents Org Chart, Directory, Headcount Analytics, and Org Change Requests in a single tabbed interface, while silently coordinating with the 3 backend extension apps behind the scenes.
