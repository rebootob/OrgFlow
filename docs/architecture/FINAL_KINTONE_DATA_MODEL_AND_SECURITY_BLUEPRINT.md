# ORGFLOW — FINAL KINTONE DATA MODEL & SECURITY BLUEPRINT

## 1. App Optimization & Decision Matrix

OrgFlow re-evaluates the proposed backend architecture to achieve **Minimum Apps, Clear Data Ownership, Simplified HR Operations, 100% History Traceability, and Zero Redundant Data Storage**.

| App Name | Initial Proposal | Final Decision | Purpose & Business Rationale | Can Merge? | Source of Truth | HR Directly Uses? | Recommendation |
| :--- | :--- | :--- | :--- | :---: | :--- | :---: | :---: |
| **`Employee Namelist`** | Primary Master | **Protected Primary Master** | Authoritative Employee Master App (App ID 53). Stores current employee attributes & photo. | **NO** | Kintone App ID 53 | **YES** (Via Portal) | **IMMUTABLE MASTER** |
| **`Department Master`** | Dedicated App | **Merged into `ORG_MASTERS`** | Manages parent-child department hierarchy, Thai/EN titles, and Dept Head. | **YES** | OrgFlow Org Masters | Indirect (Via Portal) | **MERGED** |
| **`Position Master`** | Dedicated App | **Merged into `ORG_MASTERS`** | Manages position titles, job levels, and approved headcount quotas for Vacancy analytics. | **YES** | OrgFlow Org Masters | Indirect (Via Portal) | **MERGED** |
| **`Assignment History`**| Dedicated App | **Standalone Log App (`ASSIGNMENT_LOG`)** | Stores time-based assignment history (Start Date -> End Date) for Effective Date Time Machine. | **NO** | OrgFlow Time Machine | Indirect (Via Portal) | **REQUIRED** |
| **`Change Request`** | Dedicated App | **Standalone Workflow App (`CHANGE_REQUEST`)** | Multi-step approval workflow for transfers, promotions, and org restructuring. | **NO** | OrgFlow Approval Flow | Indirect (Via Portal) | **REQUIRED** |
| **`Change Log Audit`** | Dedicated App | **Eliminated (Merged into Kintone Native History)** | Dedicated audit logger. Native Kintone Record History + Process History provides exact audit trail. | **YES** | Kintone Revision Engine| No | **REMOVED** |

```
===============================================================================
FINAL STREAMLINED APP COUNT SUMMARY
===============================================================================
1. Protected Primary Master App:
   - App ID 53: "Employee Namelist" (Immutable Primary Master)

2. Streamlined Extension Apps:
   - App A: "OrgFlow Organization Masters App" (Combines Department + Position Master)
   - App B: "OrgFlow Assignment History Log App" (Time-based Effective Date Log)
   - App C: "OrgFlow Org Change Request App" (Approval Workflow Flow)

TOTAL KINTONE BACKEND APPS: 4 APPS TOTAL (1 Master + 3 Extension Apps)
===============================================================================
```

---

## 2. System Architecture Topology Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 PROTECTED PRIMARY MASTER (Kintone App ID 53)                 │
│                             "Employee Namelist"                             │
│   - Immutable Current Employee Attributes                                  │
│   - External Employee Reference Key: `Number` (Code)                        │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ (Referenced by `Number`)
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                ORGFLOW STREAMLINED EXTENSION ECOSYSTEM                      │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. OrgFlow Organization Masters App (`ORG_MASTERS`)                         │
│    - Tab A: Department Master (Parent-Child Hierarchy Tree)                │
│    - Tab B: Position Master & Approved Headcount Quotas                     │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. OrgFlow Org Assignment History Log App (`ASSIGNMENT_LOG`)                │
│    - Time-Based Effective Date Timeline (Effective From -> Effective To)    │
│    - Source of Truth for Historical Org Charts & Time Machine Queries      │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. OrgFlow Org Change Request App (`CHANGE_REQUEST`)                        │
│    - Multi-Step Approval Workflow (Draft -> Review -> Approve -> Effective) │
│    - Triggers Automatic Assignment Log append upon Effective Date           │
└─────────────────────────────────────────────────────────────────────────────┘
                                       ▲
                                       │ (Single Unified Custom View SPA)
┌──────────────────────────────────────┴──────────────────────────────────────┐
│                    ORGFLOW UNIFIED HR PORTAL WORKSPACE                      │
│      HR & Employees interact through 1 Single Unified Kintone Custom View    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Comprehensive Data Schemas & Field Dictionaries

### App 1: `Employee Namelist` (App ID 53 - Protected Primary Master)
*Schema is 100% Locked and Read-Only. No fields created or modified.*

- `Number` (NUMBER, Read-Only): **`ORGFLOW_EMPLOYEE_REFERENCE_KEY`** (External Reference Key, 100% Complete)
- `emp_text` (SINGLE_LINE_TEXT): Employee ID attribute (28.7% blank in legacy data)
- `Text_0` (SINGLE_LINE_TEXT): Thai Full Name
- `Text` (SINGLE_LINE_TEXT): English Full Name
- `Text_1` (SINGLE_LINE_TEXT): Nickname
- `Drop_down_0` (DROP_DOWN): Current Department Name
- `Drop_down_1` (DROP_DOWN): Current Section Name
- `Text_2` (SINGLE_LINE_TEXT): Current Position Title
- `Text_4` (SINGLE_LINE_TEXT): Email Contact
- `Text_11` (SINGLE_LINE_TEXT): Mobile Phone
- `Attachment` (FILE): Profile Photo
- `Date` (DATE): Start Date / Joining Date

---

### App 2: `OrgFlow Organization Masters App` (`ORG_MASTERS`)
*Combines Department Master and Position Master into a single unified master app.*

| Field Label | Field Code | Field Type | Required | Unique | Default | Read Only | Source of Truth |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **Master Entity Type** | `master_type` | `DROP_DOWN` | YES | NO | `DEPARTMENT` | NO | OrgFlow Masters |
| **Entity Code / ID** | `entity_code` | `SINGLE_LINE_TEXT` | YES | **YES** | `""` | NO | OrgFlow Masters |
| **Title / Name (TH)**| `title_th` | `SINGLE_LINE_TEXT` | YES | NO | `""` | NO | OrgFlow Masters |
| **Title / Name (EN)**| `title_en` | `SINGLE_LINE_TEXT` | NO | NO | `""` | NO | OrgFlow Masters |
| **Parent Entity Code**| `parent_code` | `SINGLE_LINE_TEXT` | NO | NO | `""` | NO | OrgFlow Masters |
| **Head Employee Ref** | `head_employee_ref`| `SINGLE_LINE_TEXT` | NO | NO | `""` | NO | OrgFlow Masters |
| **Headcount Quota** | `headcount_quota` | `NUMBER` | NO | NO | `0` | NO | HR Executive |
| **Job Grade Level** | `job_level` | `NUMBER` | NO | NO | `1` | NO | HR Master |
| **Display Order** | `display_order` | `NUMBER` | NO | NO | `10` | NO | UI Order |
| **Active Status** | `is_active` | `RADIO_BUTTON` | YES | NO | `ACTIVE` | NO | HR Master |

---

### App 3: `OrgFlow Org Assignment History Log App` (`ASSIGNMENT_LOG`)
*Source of Truth for Time-Based Effective Date Timeline & Org History.*

| Field Label | Field Code | Field Type | Required | Unique | Default | Read Only | Source of Truth |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **Synthetic Internal ID**| `internal_id` | `SINGLE_LINE_TEXT` | YES | **YES** | `""` | YES | OrgFlow System |
| **Employee Reference** | `employee_ref` | `SINGLE_LINE_TEXT` | YES | NO | `""` | YES | App 53 `Number` |
| **Department Code** | `dept_code` | `SINGLE_LINE_TEXT` | YES | NO | `""` | NO | Change Request |
| **Section Code** | `section_code` | `SINGLE_LINE_TEXT` | NO | NO | `""` | NO | Change Request |
| **Position Code** | `pos_code` | `SINGLE_LINE_TEXT` | YES | NO | `""` | NO | Change Request |
| **Manager Employee Ref** | `manager_ref` | `SINGLE_LINE_TEXT` | NO | NO | `""` | NO | Change Request |
| **Assignment Type** | `assignment_type` | `DROP_DOWN` | YES | NO | `PRIMARY` | NO | Workflow Type |
| **Is Acting / Temp** | `is_acting` | `RADIO_BUTTON` | YES | NO | `NO` | NO | HR Workflow |
| **Effective Start Date**| `effective_start_date`| `DATE` | YES | NO | `Today` | NO | Effective Date |
| **Effective End Date** | `effective_end_date` | `DATE` | NO | NO | `""` | NO | Effective Date |
| **Is Current Active** | `is_current` | `RADIO_BUTTON` | YES | NO | `YES` | YES | OrgFlow Engine |

---

### App 4: `OrgFlow Org Change Request App` (`CHANGE_REQUEST`)
*Approval Workflow App for Transfers, Promotions, and Org Restructuring.*

| Field Label | Field Code | Field Type | Required | Unique | Default | Read Only | Source of Truth |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **Request ID** | `request_id` | `SINGLE_LINE_TEXT` | YES | **YES** | `""` | YES | OrgFlow System |
| **Target Employee Ref** | `employee_ref` | `SINGLE_LINE_TEXT` | YES | NO | `""` | NO | Requester |
| **Change Type** | `change_type` | `DROP_DOWN` | YES | NO | `TRANSFER` | NO | Requester |
| **Current Dept Code** | `current_dept_code` | `SINGLE_LINE_TEXT` | YES | NO | `""` | YES | System Snapshot |
| **Proposed Dept Code** | `target_dept_code` | `SINGLE_LINE_TEXT` | YES | NO | `""` | NO | Requester |
| **Current Position Code**| `current_pos_code` | `SINGLE_LINE_TEXT` | YES | NO | `""` | YES | System Snapshot |
| **Proposed Position Code**| `target_pos_code` | `SINGLE_LINE_TEXT` | YES | NO | `""` | NO | Requester |
| **Proposed Manager Ref** | `target_manager_ref`| `SINGLE_LINE_TEXT` | NO | NO | `""` | NO | Requester |
| **Effective Target Date**| `effective_date` | `DATE` | YES | NO | `Today` | NO | Requester |
| **Justification Reason**| `justification` | `MULTI_LINE_TEXT` | YES | NO | `""` | NO | Requester |

---

## 4. Org Change Approval Workflow Flow

```text
┌──────────┐     Submit      ┌──────────┐    HR Review    ┌──────────┐
│  DRAFT   ├────────────────►│ PENDING  ├────────────────►│ PENDING  │
│ (Form)   │                 │ MANAGER  │                 │    HR    │
└──────────┘                 └────┬─────┘                 └────┬─────┘
                                  │ Reject                     │ Approve
                                  ▼                            ▼
                             ┌──────────┐                 ┌──────────┐
                             │ REJECTED │                 │ APPROVED │
                             └──────────┘                 └────┬─────┘
                                                               │ (Target Date Reached)
                                                               ▼
                                                          ┌──────────┐
                                                          │EFFECTIVE │
                                                          │(History) │
                                                          └──────────┘
```

### Role Approval Responsibilities:
- **Requester (Line Manager / HR):** Fills request form -> Saves `DRAFT` or Submits to `PENDING MANAGER`.
- **Line Manager:** Reviews proposed transfer/promotion -> Clicks `APPROVE` (moves to `PENDING HR`) or `REJECT`.
- **HR Manager:** Final verification -> Clicks `APPROVE`. System schedules status to `APPROVED`.
- **OrgFlow Effective Date Daemon:** On `effective_date`, automatically updates App 53 current fields and appends new record to `ASSIGNMENT_LOG` with `is_current = YES`.

---

## 5. Security Model & Granular Permission Matrix

> [!CAUTION]
> **CRITICAL SECURITY ENFORCEMENT:**
> JavaScript UI Restrictions do NOT constitute security.
> True Security is enforced at the **Kintone Platform ACL Level** (`X-Cybozu-Authorization` / User Account Session).

| System Access Role | View Org Chart | View Directory | Create Request | Edit Masters | Approve Request | Export Reports | View Sensitive Data | Kintone Platform Security Mechanism |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **`GENERAL_SHARED`** | **YES** | **YES** | ❌ NO | ❌ NO | ❌ NO | ❌ NO | ❌ NO | **App ACL: View Records Only** (Disable Add/Edit/Delete in Kintone App Settings) |
| **`DEPARTMENT_MANAGER`**| **YES** | **YES** | **YES** (Dept) | ❌ NO | **YES** (Dept) | ❌ NO | ❌ NO | Individual User Account + Process Management Manager Role |
| **`HR`** | **YES** | **YES** | **YES** | **YES** | ❌ NO | **YES** | **YES** | Individual User Account + Kintone Group `HR_Group` |
| **`HR_MANAGER`** | **YES** | **YES** | **YES** | **YES** | **YES** | **YES** | **YES** | Individual User Account + Process Management HR Approval Role |
| **`GM / EXECUTIVE`** | **YES** | **YES** | ❌ NO | ❌ NO | **YES** (High) | **YES** | ❌ NO | Individual User Account + Executive Group |
| **`ADMIN`** | **YES** | **YES** | **YES** | **YES** | **YES** | **YES** | **YES** | Kintone App Administrator |

---

## 6. Shared Account (`GENERAL_SHARED`) Security Protocol

1. **Shared Kintone Account Scope:** `GENERAL_SHARED` is used by staff members accessing public Kintone terminals.
2. **Kintone Permission Enforcement:** In App Settings for App 53 and Extension Apps, `GENERAL_SHARED` has **View Records Only** permission.
3. **Payload Protection:** Sensitive fields (`father`, `mother`, `Spouse`, `bank_account`, `salary`) are excluded from general API response parameters in `employeeService.js`.
4. **Write Action Rejection:** `permissionService.assertWritePermission()` immediately throws a Security Rejection Exception if `GENERAL_SHARED` attempts any write or approval action.
