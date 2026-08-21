# FIELD DEPENDENCY MAP & BREAKING RISK ANALYSIS

## 1. Overview & Safety Guarantee
`Employee Namelist` serves as the primary master data source for multiple existing Kintone applications across the organization. To guarantee that **OrgFlow causes zero disruption or breakage to existing apps**, all field dependencies are mapped and protected.

---

## 2. Master Field Dependency Matrix

| Source Field | Source App | Consumer App | Dependency Type | Risk Level | Protection Rule |
| :--- | :--- | :--- | :--- | :---: | :--- |
| `emp_code` | Employee Namelist | Training Management | Lookup Key | **CRITICAL** | **DO NOT RENAME / DELETE / MODIFY TYPE** |
| `emp_code` | Employee Namelist | Performance Evaluation | Lookup Key | **CRITICAL** | **DO NOT RENAME / DELETE / MODIFY TYPE** |
| `emp_code` | Employee Namelist | Leave Request App | Lookup Key | **CRITICAL** | **DO NOT RENAME / DELETE / MODIFY TYPE** |
| `emp_code` | Employee Namelist | Asset Management | Lookup Key | **CRITICAL** | **DO NOT RENAME / DELETE / MODIFY TYPE** |
| `emp_name_th` | Employee Namelist | Training Management | Copy Field | **HIGH** | Do not change field code or data type. |
| `department` | Employee Namelist | Performance Evaluation | Copy Field | **HIGH** | Do not change field code or data type. |
| `position` | Employee Namelist | Leave Request App | Copy Field | **HIGH** | Do not change field code or data type. |
| `status` | Employee Namelist | All Consumer Apps | Filter Condition | **HIGH** | Retain existing dropdown option values. |

---

## 3. Change Impact Evaluation Protocol
Before proposing any structural modification to `Employee Namelist`, the solution architect must complete the following evaluation format:

```text
FIELD: [Field Display Label]
FIELD CODE: [Existing Kintone Field Code]
CURRENT TYPE: [SINGLE_LINE_TEXT / DROP_DOWN / etc.]
CURRENT ROLE: [Lookup Key / Copy Field / Standalone Master]
LOOKUP DEPENDENCY: [List of downstream apps using this field as Lookup Target]
APPS AFFECTED: [List of affected Kintone App IDs/Names]
OrgFlow REASON: [Why OrgFlow needs this data]
PROPOSED CHANGE: [Proposed adjustment]
BREAKING RISK: [CRITICAL / HIGH / MEDIUM / LOW]
SAFE ALTERNATIVE: [Separate OrgFlow Extension App / Mapping Layer Adjustment]
```

> [!IMPORTANT]
> **Preferred Safe Alternative:** Store new organization-specific fields (e.g. Effective Date ranges, Historical Position Assignments, Approval Statuses) inside **OrgFlow Extension Apps** (`OrgFlow Assignment App`, `OrgFlow Org Change App`) rather than altering `Employee Namelist`.
