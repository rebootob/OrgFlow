# KINTONE APP RELATIONSHIP MAP & SYSTEM TOPOLOGY

## 1. Enterprise Kintone Ecosystem Diagram

OrgFlow operates as a **non-disruptive extension** to the existing Kintone App ecosystem. `Employee Namelist` remains the central hub for employee master data, supplying lookup references to operational apps while serving as the authoritative data source for OrgFlow.

```text
                             +-----------------------------------+
                             |         EMPLOYEE NAMELIST         |
                             |   (Authoritative Employee SSoT)   |
                             +-----------------------------------+
                                               |
           +--------------------+--------------+--------------+--------------------+
           |                    |                             |                    |
           v                    v                             v                    v
  +------------------+ +-----------------+           +------------------+ +------------------+
  | Training App     | | Leave App       |           | Evaluation App   | | Asset App        |
  | (Lookup Key:     | | (Lookup Key:    |           | (Lookup Key:     | | (Lookup Key:     |
  |  emp_code)       | |  emp_code)      |           |  emp_code)       | |  emp_code)       |
  +------------------+ +-----------------+           +------------------+ +------------------+
                                                              |
                                                              | (Non-disruptive READ)
                                                              v
                                             +-----------------------------------+
                                             |             OrgFlow               |
                                             |  (Organization Intelligence SPA)  |
                                             +-----------------------------------+
                                                              |
                                     +------------------------+------------------------+
                                     |                        |                        |
                                     v                        v                        v
                            +------------------+     +------------------+     +------------------+
                            | OrgFlow Position |     | OrgFlow Assignment|    | OrgFlow OrgChange|
                            | Master (App 03)  |     | Log (App 04)     |     | Request (App 05) |
                            +------------------+     +------------------+     +------------------+
```

---

## 2. App Relationship & Responsibility Matrix

| Kintone Application | Ecosystem Role | Relationship to OrgFlow | Primary Keys & Foreign Keys |
| :--- | :--- | :--- | :--- |
| **`Employee Namelist`** | **Protected Employee SSoT** | **Source Data (READ ONLY)** | PK: `emp_code`<br/>FK: `kintone_user` (Optional) |
| **`OrgFlow Department Master`** | Department Hierarchy SSoT | Read / Write (HR Admin) | PK: `Department_ID`<br/>FK: `Parent_Department_ID`, `Department_Manager_ID` |
| **`OrgFlow Position Master`** | Decoupled Position SSoT | Read / Write (HR Admin) | PK: `Position_ID`<br/>FK: `Department_ID`, `Reports_To_Position_ID` |
| **`OrgFlow Organization Assignment`**| Assignment & Time History | Read / Write (System Engine) | PK: `Assignment_ID`<br/>FK: `Employee_ID`, `Position_ID`, `Department_ID`, `Manager_Employee_ID` |
| **`OrgFlow Org Change Request`** | Workflow & Transfer Engine | Read / Write (HR & Approver)| PK: `Request_ID`<br/>FK: `Employee_ID`, `New_Department`, `New_Position`, `New_Manager` |
| **`OrgFlow Org Change Log`** | Business Audit Log | Read / Write (Immutable Engine)| PK: `Change_ID`<br/>FK: `Employee_ID`, `Source_Record_ID` |
| **Existing Enterprise Apps** | Operational Consumers | Untouched / Independent | Consume `Employee Namelist` via native Kintone Lookups |

---

## 3. Data Integrity & Non-Disruption Guarantees
1. **Zero Lookup Breakage:** Existing apps continue retrieving data from `Employee Namelist` with zero interruption.
2. **Current vs. Historical Separation:** `Employee Namelist` reflects the **Current Employee Truth**. Historical transfer states are tracked cleanly within `OrgFlow Organization Assignment`.
3. **Single Point of HR Entry:** HR updates basic employee profile info in `Employee Namelist`. OrgFlow immediately reflects these changes across Org Charts, Directories, Headcount, and Dashboards without redundant data entry.
