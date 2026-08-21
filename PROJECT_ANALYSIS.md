# PROJECT ANALYSIS: OrgFlow — Kintone Organization Management System

## 1. Executive Summary & Authoritative Data Master
- **Project Name:** OrgFlow (OrgFlow — Kintone Organization Management System)
- **Primary Employee Data Master:** **`Employee Namelist`** (Protected Production Kintone App).
- **Core Strategy:** **READ + MAP + REUSE**. OrgFlow acts as a non-disruptive extension layer. It reads directly from `Employee Namelist` without renaming field codes or creating duplicate employee databases.
- **Ecosystem Integrity:** Downstream enterprise Kintone Apps (Training, Leave, Evaluation, Asset) that rely on Lookups from `Employee Namelist` will suffer zero breakage or field alteration.

---

## 2. Fundamental Identity Architecture & Principles

### Critical Identity Model: Employee Identity ≠ Kintone User Identity
- **Business Identity:** `Employee_ID` (e.g. `emp_code = "EMP-0208"`) is the immutable business primary key.
- **Authentication/System Identity:** Kintone User Account (e.g. `user_code = "somchai.prod"`).
- **Core Requirement:** **Not all employees have individual Kintone accounts.** `Kintone_User` field is **OPTIONAL / NULLABLE**.
- **Org Chart Rule:** Org Charts and managerial hierarchies are built strictly from `Employee_ID`, `Position_ID`, `Department_ID`, and `Manager_Employee_ID`, NOT from Kintone's native user directory.

```text
 +-----------------------------------------------------------------------+
 |                     AUTHORITATIVE EMPLOYEE MASTER                     |
 |                       App: Employee Namelist                          |
 |  emp_code: EMP-0300                                                   |
 |  emp_name_th: สมชาย ใจดี                                              |
 |  position: Production Manager                                         |
 |  kintone_user: NULL (No Individual Kintone Account)                   |
 +-----------------------------------------------------------------------+
                                    |
                                    v
     [ Appears in Org Chart | Has Direct Reports | Included in Analytics ]
                                    |
            (Accesses Kintone via Shared/Common Kintone User)
                                    v
                   [ System Access Role: GENERAL_SHARED ]
                  [ Read-Only | No Personalized Dashboard ]
```

---

## 3. System Access Roles & User Matrix

| System Access Role | User Group Target | Authentication Type | Core Permissions & Capabilities |
| :--- | :--- | :--- | :--- |
| **`GENERAL_SHARED`** | General Staff | Shared / Common Account | **Read-Only:** Org Chart, Directory, Basic Dept/Pos Info. **No Write / No Personalization.** |
| **`MANAGER`** | Dept Managers w/ Individual Accounts | Individual Kintone Account | Org Chart, Directory, **My Team Dashboard**, Team Headcount/Vacancy, Team Org View. |
| **`HR`** | HR Staff | Individual Kintone Account | Manage Employee, Org Change Requests (Transfer, Promotion), Department/Position Config. |
| **`HR_MANAGER`** | HR Managers | Individual Kintone Account | Approve Org Change, Time-Machine (Future Org), Scenario Planning, Advanced Analytics. |
| **`EXECUTIVE`** | GM & President | Individual Kintone Account | Executive Dashboard, Span of Control, Org Depth Layers, Headcount Trends. |
| **`SYSTEM_ADMIN`** | IT Administrators | Individual Kintone Account | App ID Config, Field Mappings, System Logs, Technical Settings (Isolated from HR Data). |

---

## 4. Protected App Strategy & Field Code Preservation

```text
DISCOVER  -->  REUSE  -->  EXTEND  -->  CREATE NEW (EXTENSION APPS ONLY)
```
- **Protected Production App:** `Employee Namelist` is protected against field deletion, code renaming, type changes, or constraint removal.
- **Central Field Mapping Layer:** Field mappings are encapsulated inside `src/config/fieldMappings.js`.
- **Extension Strategy:** Organization-specific attributes (Historical Position Assignments, Effective Date ranges, Transfer Approval Workflows) are managed in **OrgFlow Extension Apps** (`OrgFlow Assignment`, `OrgFlow Org Change Request`).

---

## 5. Security & Isolation Model

- **UI Hiding is NOT Security:** Front-end button hiding is supplemented by Kintone App/Field-level permissions and backend authorization checks on all API requests.
- **Shared Account Isolation:**
  - Shared accounts default strictly to `GENERAL_SHARED` (Read-Only).
  - Critical HR actions (Transfer, Promotion, Approval) require an **Individual Kintone Account** for audit trailing (`WHO`, `WHAT`, `WHEN`, `WHY`).
  - Sensitive employee fields (Salary, Citizen ID, Medical Data, HR Notes) are strictly excluded from `GENERAL_SHARED` payloads.

---

## 6. Architecture Feasibility Assessment

- **Kintone Native Feasibility:** **100% FEASIBLE** without external backend servers.
- **Tech Stack:**
  - Single Page Application (SPA) inside Kintone Custom View.
  - ES6+ JavaScript modules compiled to lightweight bundles (`dist/orgflow-main.js` and `dist/orgflow-main.css`).
  - SVG Canvas visualization engine for interactive Org Chart (zoom/pan, node collapse, search highlight).
