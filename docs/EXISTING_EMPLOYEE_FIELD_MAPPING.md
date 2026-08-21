# EXISTING EMPLOYEE FIELD MAPPING & DISCOVERY DICTIONARY

## 1. Protected Master Principle (`Employee Namelist`)
To prevent breaking existing Kintone customizations, workflows, or downstream Lookups in operational apps (Training, Leave, Evaluation, Asset), OrgFlow **never renames, deletes, or alters existing field codes in `Employee Namelist`**. All field accesses are routed through a central JavaScript mapping layer (`src/config/fieldMappings.js`).

Decision Types:
- **`PROTECTED_EXISTING_FIELD`**: Immutable primary lookup key in `Employee Namelist`. High risk. Must remain unchanged.
- **`REUSE`**: Directly map to existing active field in `Employee Namelist`.
- **`EXTEND`**: Field exists but requires permission verification or optional user mapping.
- **`NEW`**: Field does not exist in `Employee Namelist`; will be maintained in separate OrgFlow Extension Apps (`OrgFlow Assignment App`).
- **`NOT_REQUIRED`**: Confidential HR field (Salary, Citizen ID) omitted from OrgFlow runtime UI to preserve data minimization.

---

## 2. Master Field Mapping Table

| OrgFlow Concept Field | Default Candidate Code | Target Kintone Type | Decision | Description & Protective Strategy |
| :--- | :--- | :--- | :--- | :--- |
| **`employeeId`** | `emp_code` / `Employee_ID` | SINGLE_LINE | `PROTECTED_EXISTING_FIELD` | Immutable Primary Key. Target of all downstream Lookups. |
| **`nameTH`** | `emp_name_th` / `Name_TH` | SINGLE_LINE | `REUSE` | Full Name in Thai. Safe for read mapping. |
| **`nameEN`** | `emp_name_en` / `Name_EN` | SINGLE_LINE | `REUSE` | Full Name in English. Safe for read mapping. |
| **`nickname`** | `nickname` | SINGLE_LINE | `REUSE` | Employee Nickname. Safe for read mapping. |
| **`photo`** | `photo` / `attachment` | FILE | `REUSE` | Employee Profile Picture Attachment. |
| **`email`** | `email` | SINGLE_LINE | `REUSE` | Corporate Email Address. |
| **`telephone`** | `telephone` | SINGLE_LINE | `REUSE` | Work Telephone / Extension. |
| **`company`** | `company` | DROP_DOWN / TEXT | `REUSE` | Legal Entity Company Name. |
| **`businessUnit`** | `business_unit` | DROP_DOWN / TEXT | `REUSE` | Business Unit Name. |
| **`division`** | `division` | DROP_DOWN / TEXT | `REUSE` | Division Name. |
| **`departmentId`** | `department` / `dept_code`| DROP_DOWN / TEXT | `REUSE` | Current Department Code/Title. |
| **`section`** | `section` | SINGLE_LINE | `REUSE` | Section / Sub-unit Name. |
| **`positionId`** | `position` / `pos_code` | DROP_DOWN / TEXT | `REUSE` | Current Position Title/Code. |
| **`managerId`** | `manager_emp_code` | SINGLE_LINE | `EXTEND` | If missing in `Employee Namelist`, managed in `OrgFlow Assignment`. |
| **`employmentType`** | `emp_type` | DROP_DOWN | `REUSE` | Full-Time, Contract, Outsource, Temp. |
| **`grade`** | `grade` / `level` | DROP_DOWN | `REUSE` | Job Grade / Level Code. |
| **`workLocation`** | `work_location` | SINGLE_LINE | `REUSE` | Office Location / Branch / Factory. |
| **`joinDate`** | `join_date` | DATE | `REUSE` | Date Joined Organization. |
| **`resignDate`** | `resign_date` | DATE | `REUSE` | Date Resigned / Left Organization. |
| **`status`** | `status` | DROP_DOWN | `REUSE` | Active ('Working'), Resigned, Inactive. |
| **`kintoneUser`** | `kintone_user` / `user_select`| USER_SELECT / TEXT | `EXTEND` | **Optional Mapping**. Nullable for non-user staff. |
| **`effectiveFrom`** | `Effective_From` | DATE | `NEW` | Managed in `OrgFlow Assignment App`. |
| **`effectiveTo`** | `Effective_To` | DATE | `NEW` | Managed in `OrgFlow Assignment App`. |
| **`salary`** | `salary` | NUMBER | `NOT_REQUIRED` | Confidential HR Field (Excluded from OrgFlow). |
| **`citizenId`** | `citizen_id` | SINGLE_LINE | `NOT_REQUIRED` | Sensitive Personal Data (Excluded). |
| **`bankAccount`** | `bank_account` | SINGLE_LINE | `NOT_REQUIRED` | Sensitive Financial Data (Excluded). |

---

## 3. Data Normalization Example

```javascript
// Raw Record fetched from Kintone 'Employee Namelist' App:
const rawKintoneRecord = {
    "emp_code": { "type": "SINGLE_LINE_TEXT", "value": "EMP-0208" },
    "emp_name_th": { "type": "SINGLE_LINE_TEXT", "value": "สมชาย ใจดี" },
    "department": { "type": "DROP_DOWN", "value": "Quality" },
    "position": { "type": "SINGLE_LINE_TEXT", "value": "QC Staff" }
};

// Normalized OrgFlow Business Object (via fieldMappings.js):
const normalizedEmployee = {
    employeeId: rawKintoneRecord.emp_code.value,
    nameTH: rawKintoneRecord.emp_name_th.value,
    departmentId: rawKintoneRecord.department.value,
    positionId: rawKintoneRecord.position.value
};
```
