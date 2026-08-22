# ORGFLOW — DEPENDENCY MAP & DATA MODEL ARCHITECTURE

## 1. Executive Overview & Design Principles
This document defines the **Enterprise Dependency Map** for the primary Employee Master App (**`Employee Namelist` - App ID 53**) and specifies the decoupled **OrgFlow Data Model Architecture**.

### Core Governance Rule:
> **`Employee Namelist` (App ID 53) is a PROTECTED PRIMARY MASTER.**
> Zero field deletions, zero field code renames, and zero structural changes are allowed on App 53.
> All modern organization features (Time-based Org Assignment History, Headcount & Vacancy Analytics, Org Change Approval Workflows) are handled via separate **OrgFlow Extension Apps**.

---

## 2. Downstream Lookup Topology & Dependency Map

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                   PRIMARY EMPLOYEE MASTER (App ID 53)                        │
│                           "Employee Namelist"                               │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
            ┌──────────────────────────┼──────────────────────────┐
            ▼                          ▼                          ▼
┌───────────────────────┐  ┌───────────────────────┐  ┌───────────────────────┐
│  Training Summary App │  │  Leave Request App    │  │ Evaluation System App │
│  Lookup Key: emp_text │  │  Lookup Key: emp_text │  │  Lookup Key: emp_text │
└───────────────────────┘  └───────────────────────┘  └───────────────────────┘
            │                          │                          │
            └──────────────────────────┼──────────────────────────┘
                                       ▼
                     ┌───────────────────────────────────┐
                     │   Asset & Expense Tracking Apps   │
                     │   Lookup Key: emp_text            │
                     └───────────────────────────────────┘
```

---

## 3. Protected Field Inventory (App ID 53)

The following fields in `Employee Namelist` (App ID 53) are **CRITICAL & PROTECTED FROM ANY MODIFICATION**:

| Field Name (Display Label) | Verified Field Code | Kintone Type | Lookup Role | Downstream Usage / Impact | Protection Level |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **Employee ID** | `emp_text` | `SINGLE_LINE_TEXT` | **PRIMARY LOOKUP KEY** | Referenced by all enterprise apps for employee identification | **MAXIMUM (CRITICAL)** |
| **ชื่อ - นามสกุล** | `Text_0` | `SINGLE_LINE_TEXT` | Copied Field | Copied out for Thai full name display in forms & reports | **HIGH** |
| **Name - Surname** | `Text` | `SINGLE_LINE_TEXT` | Copied Field | Copied out for English full name display | **HIGH** |
| **Nickname** | `Text_1` | `SINGLE_LINE_TEXT` | Copied Field | Copied out for internal team references | **MEDIUM** |
| **Departmant** | `Drop_down_0` | `DROP_DOWN` | Copied Field | Copied out for department filtering in leave & expense apps | **HIGH** |
| **Section Name** | `Drop_down_1` | `DROP_DOWN` | Copied Field | Copied out for section filtering | **HIGH** |
| **Position** | `Text_2` | `SINGLE_LINE_TEXT` | Copied Field | Copied out for approval routing & position checks | **HIGH** |
| **Email** | `Text_4` | `SINGLE_LINE_TEXT` | Copied Field | Copied out for automated email notifications | **HIGH** |
| **Mobile** | `Text_11` | `SINGLE_LINE_TEXT` | Copied Field | Copied out for urgent contact | **MEDIUM** |
| **Attachment** | `Attachment` | `FILE` | Media Field | Profile photos and document attachments | **MEDIUM** |
| **Start Date** | `Date` | `DATE` | Attribute | Tenure calculations | **MEDIUM** |

---

## 4. OrgFlow Decoupled Data Model Architecture

To extend `Employee Namelist` (App ID 53) without altering its schema, OrgFlow introduces **5 Extension Apps**:

```
                       ┌──────────────────────────────┐
                       │  Employee Namelist (App 53)  │
                       └──────────────┬───────────────┘
                                      │ (Business Key: emp_text)
                                      ▼
               ┌──────────────────────────────────────────────┐
               │    OrgFlow Assignment History Log App        │
               │  - Record ID                                 │
               │  - Employee ID (Lookup emp_text)             │
               │  - Effective Date Range (Start -> End)       │
               │  - Department ID & Position ID               │
               │  - Is Current Assignment Flag                │
               └──────────────────────┬───────────────────────┘
                                      │
           ┌──────────────────────────┴──────────────────────────┐
           ▼                                                     ▼
┌──────────────────────────────┐                      ┌──────────────────────────────┐
│  Department Master App       │                      │  Position Master App         │
│  - Department ID             │                      │  - Position ID               │
│  - Department Name (TH/EN)   │                      │  - Position Title            │
│  - Parent Department ID      │                      │  - Headcount Quota           │
│  - Department Head emp_text  │                      │  - Department ID             │
└──────────────────────────────┘                      └──────────────────────────────┘
           ▲                                                     ▲
           └──────────────────────────┬──────────────────────────┘
                                      │
               ┌──────────────────────┴───────────────────────┐
               │  Org Change Workflow Request App             │
               │  - Request ID & Status                       │
               │  - Effective Date                            │
               │  - Target Employee ID                        │
               │  - New Dept ID & New Position ID             │
               │  - Approver Chain & Audit Log                │
               └──────────────────────────────────────────────┘
```

---

## 5. Extension Apps Schema Definition

### App 1: Department Master App (`DEPARTMENT_MASTER`)
- `dept_code` (SINGLE_LINE_TEXT, Unique = True): Department Business Key (e.g. `DEP-001`)
- `dept_name_th` (SINGLE_LINE_TEXT): Department Name in Thai
- `dept_name_en` (SINGLE_LINE_TEXT): Department Name in English
- `parent_dept_code` (SINGLE_LINE_TEXT): Parent Department Code (Hierarchy tree node)
- `head_emp_code` (SINGLE_LINE_TEXT): Employee ID of Department Head
- `is_active` (RADIO_BUTTON): Status (`Active`, `Inactive`)

### App 2: Position Master App (`POSITION_MASTER`)
- `pos_code` (SINGLE_LINE_TEXT, Unique = True): Position Business Key (e.g. `POS-001`)
- `pos_title_th` (SINGLE_LINE_TEXT): Position Title in Thai
- `pos_title_en` (SINGLE_LINE_TEXT): Position Title in English
- `dept_code` (SINGLE_LINE_TEXT): Department Code
- `headcount_quota` (NUMBER): Approved Headcount Quota for Vacancy calculation
- `pos_level` (NUMBER): Job Level / Grade for hierarchy ordering

### App 3: Org Assignment History Log App (`ASSIGNMENT_LOG`)
- `assignment_id` (SINGLE_LINE_TEXT, Unique = True): Assignment Record Key
- `emp_code` (SINGLE_LINE_TEXT): Employee Business Key (`emp_text`)
- `dept_code` (SINGLE_LINE_TEXT): Assigned Department Code
- `pos_code` (SINGLE_LINE_TEXT): Assigned Position Code
- `effective_start_date` (DATE): Start Date of Assignment
- `effective_end_date` (DATE): End Date of Assignment (Empty if current)
- `is_current` (RADIO_BUTTON): `YES` / `NO`

### App 4: Org Change Request App (`CHANGE_REQUEST`)
- `request_id` (SINGLE_LINE_TEXT, Unique = True): Workflow Request ID
- `emp_code` (SINGLE_LINE_TEXT): Target Employee ID (`emp_text`)
- `change_type` (DROP_DOWN): `Transfer`, `Promotion`, `Department Realignment`
- `target_dept_code` (SINGLE_LINE_TEXT): Proposed Department
- `target_pos_code` (SINGLE_LINE_TEXT): Proposed Position
- `effective_date` (DATE): Effective Target Date
- `approval_status` (STATUS): Process Management Approval Flow (`Draft`, `Pending HR`, `Pending Manager`, `Approved`, `Rejected`)

---

## 6. Phase 2 Architecture Verification Checklist
- [x] Target Primary App ID 53 verified (`Employee Namelist`).
- [x] Primary Lookup Key identified (`emp_text`).
- [x] Protected Fields dictionary defined.
- [x] Downstream Lookup Topology mapped.
- [x] 4-Tier Decoupled Architecture & Extension Apps specified.
