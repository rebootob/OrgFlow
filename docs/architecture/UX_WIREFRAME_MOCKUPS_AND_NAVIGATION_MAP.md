# ORGFLOW — HR SINGLE WORKSPACE UX NAVIGATION MAP & WIREFRAME MOCKUPS

## 1. HR Single Workspace Navigation Map

> **Core Experience Goal:** HR and employees interact with OrgFlow through **ONE SINGLE UNIFIED PORTAL WORKSPACE** inside Kintone.
> HR will **NEVER** need to navigate between backend Kintone apps manually.

| Tab Menu Item | Purpose | Read Data Source | Write Data Target | Visible Roles | Editable Roles |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Dashboard** | Executive & HR Metrics | App 53 + `ORG_MASTERS` + `ASSIGNMENT_LOG` | None (Read-only view) | ALL ROLES | None |
| **2. Org Chart** | Interactive Org Tree | App 53 + `ORG_MASTERS` | None (Read-only view) | ALL ROLES | None |
| **3. Directory** | Staff Search & Filter | App 53 | None (Read-only view) | ALL ROLES | None |
| **4. Department** | Dept Master & Tree | `ORG_MASTERS` (Dept) | `ORG_MASTERS` (Dept) | ALL ROLES | HR, ADMIN |
| **5. Position** | Position Master Quota | `ORG_MASTERS` (Pos) | `ORG_MASTERS` (Pos) | ALL ROLES | HR, ADMIN |
| **6. Vacancy** | Vacancy & Headcount | `ORG_MASTERS` + App 53 | None (Read-only view) | ALL ROLES | None |
| **7. Change Request**| Transfer & Promotion Flow| `CHANGE_REQUEST` | `CHANGE_REQUEST` | MANAGER, HR, ADMIN | MANAGER, HR, ADMIN |
| **8. History** | Time Machine Timeline | `ASSIGNMENT_LOG` | None (Read-only view) | HR, MANAGER, ADMIN | None |
| **9. Reports** | Headcount Analytics | App 53 + `ASSIGNMENT_LOG` | None (Read-only view) | HR, EXECUTIVE, ADMIN | None |
| **10. Import/Export**| Data Exchange | App 53 + `ORG_MASTERS` | App 53 (Via Admin) | HR, ADMIN | HR, ADMIN |
| **11. Settings** | System Configuration | Kintone Config | Config / Role ACL | ADMIN | ADMIN |

---

## 2. Interactive Organization Chart Wireframe

```text
===================================================================================
[ORGFLOW PORTAL]  [Dashboard] [Org Chart*] [Directory] [Department] [Vacancy] [Change Req]
===================================================================================
 Search Employee: [ Somchai          ] Filter Dept: [ Corporate v ] Date: [ 2026-08-22 v ]
 Zoom: [-] 100% [+]  |  [Collapse All] [Expand All]  |  [Export SVG] [Print]
===================================================================================

                            ┌─────────────────────────────────┐
                            │   MANUFACTURING DIVISION        │
                            │   Dept Head: Somchai (Code: 1001)│
                            │   Direct Reports: 3 | Total: 18 │
                            └────────────────┬────────────────┘
                                             │
             ┌───────────────────────────────┴───────────────────────────────┐
             ▼                                                               ▼
┌─────────────────────────────────┐                             ┌─────────────────────────────────┐
│  INJECTION SECTION              │                             │  MOLD & ENGINEERING SECTION     │
│  Head: Somying (Code: 1002)     │                             │  Head: Wichai (Code: 1003)      │
│  Reports: 5 | Vacancy: 1        │                             │  Reports: 8 | Vacancy: 2        │
└────────────────┬────────────────┘                             └────────────────┬────────────────┘
                 │                                                               │
                 ▼                                                               ▼
┌─────────────────────────────────┐                             ┌─────────────────────────────────┐
│  [VACANT SEAT]                  │                             │  [VACANT SEAT]                  │
│  Position: Senior Engineer      │                             │  Position: CAD Specialist       │
│  Quota: 2 | Filled: 1 (VACANT)  │                             │  Quota: 3 | Filled: 1 (VACANT)  │
└─────────────────────────────────┘                             └─────────────────────────────────┘
===================================================================================
```

---

## 3. Executive & HR Dashboard Wireframe & Metrics

```text
===================================================================================
[DASHBOARD OVERVIEW]
===================================================================================
┌────────────────────────┐ ┌────────────────────────┐ ┌────────────────────────┐ ┌────────────────────────┐
│ TOTAL HEADCOUNT        │ │ APPROVED QUOTA         │ │ TOTAL VACANCIES        │ │ OVER CAPACITY          │
│ 275 Active Staff       │ │ 290 Positions          │ │ 15 Vacant Seats        │ │ 0 Positions            │
│ (Source: App 53)       │ │ (Source: ORG_MASTERS)  │ │ (Quota - Filled)       │ │ (Filled > Quota)       │
└────────────────────────┘ └────────────────────────┘ └────────────────────────┘ └────────────────────────┘

┌──────────────────────────────────────────────────┐ ┌──────────────────────────────────────────────────┐
│ DEPARTMENT HEADCOUNT BREAKDOWN                   │ │ UPCOMING EFFECTIVE ORG CHANGES (NEXT 30 DAYS)     │
├──────────────────────────────────────────────────┤ ├──────────────────────────────────────────────────┤
│ Corporate                  [████████░░]  28 Staff│ │ 2026-09-01: Transfer Somchai -> Injection Dept    │
│ Industrial Services        [██████████]  45 Staff│ │ 2026-09-15: Promotion Somying -> Asst. Manager    │
│ Mold & Engineering         [██████░░░░]  18 Staff│ │                                                  │
└──────────────────────────────────────────────────┘ └──────────────────────────────────────────────────┘
===================================================================================
```

---

## 4. Org Change Request Form & Workflow Wireframe

```text
===================================================================================
[ORG CHANGE REQUEST FORM]
===================================================================================
 Request Type:    (x) Employee Transfer    ( ) Promotion    ( ) Realignment
 Target Employee: [ 0021 - Mrs.Nirada Thangwichitkul                          v ]
 ---------------------------------------------------------------------------------
 CURRENT ASSIGNMENT                               PROPOSED NEW ASSIGNMENT
 Department: Corporate                            Department: [ Injection Section    v ]
 Position:   Accounting Chief                     Position:   [ Finance Manager      v ]
 Manager:    Somchai (Code: 1001)                 Manager:    [ Somying (Code: 1002) v ]
 ---------------------------------------------------------------------------------
 Target Effective Date: [ 2026-09-01 ]
 Justification Reason:  [ Strategic department restructuring and team expansion.  ]
 ---------------------------------------------------------------------------------
 APPROVAL TRAIL STATUS:
 [DRAFT] ──► [PENDING MANAGER (Somchai)] ──► [PENDING HR (Admin)] ──► [APPROVED]

 Actions:  [ Save Draft ]  [ Submit for Approval ]  [ Cancel ]
===================================================================================
```

---

## 5. Employee History Timeline (Time Machine) Wireframe

```text
===================================================================================
[EMPLOYEE ASSIGNMENT HISTORY TIMELINE — Code: 0021]
===================================================================================
 Target Employee: 0021 - Mrs.Nirada Thangwichitkul | Start Date: 2019-06-21
 ===================================================================================
 TIMELINE SNAPSHOTS:

 [2023-01-01 -> CURRENT ACTIVE]
 Department: Corporate  |  Position: Accounting Chief  |  Manager: Somchai (1001)

 [2020-01-01 -> 2022-12-31] (HISTORICAL)
 Department: Accounting |  Position: Senior Officer     |  Manager: Wichai (1003)

 [2019-06-21 -> 2019-12-31] (HISTORICAL)
 Department: Accounting |  Position: Junior Accountant  |  Manager: Wichai (1003)
===================================================================================
```
