# ORGFLOW PERMISSION MATRIX & SECURITY ACCESS CONTROL

## 1. System Access Roles & User Identity Mapping

OrgFlow implements a granular, role-based access control matrix. Roles are assigned based on Kintone user groups or explicitly mapped in `src/config/roleConfig.js`.

```text
 +--------------------------------------------------------------------------------+
 |                             SYSTEM ACCESS ROLES                                |
 |                                                                                |
 |  [ GENERAL_SHARED ]  Shared account for staff (Read-only, no personal data)  |
 |  [ MANAGER ]         Department Manager with individual Kintone account        |
 |  [ HR ]              HR Operational Staff                                      |
 |  [ HR_MANAGER ]      HR Leadership & Approval Authority                        |
 |  [ EXECUTIVE ]       GM & President Executive level                            |
 |  [ SYSTEM_ADMIN ]    Technical Platform Administrator                          |
 +--------------------------------------------------------------------------------+
```

---

## 2. Feature & Navigation Permission Matrix

| Feature / UI Module | `GENERAL_SHARED` | `MANAGER` | `HR` | `HR_MANAGER` | `EXECUTIVE` | `SYSTEM_ADMIN` |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Org Chart View (Current)** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Org Chart View (Historical / Past)** | ❌ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Org Chart View (Scheduled / Future)**| ❌ | ❌ | ✅ | ✅ | ✅ | ❌ |
| **Employee Directory View** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Basic Profile Side Panel** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Personalized "My Team" View** | ❌ (No ID) | ✅ | ❌ | ✅ | ❌ | ❌ |
| **Headcount Summary Dashboard** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Vacancy View & Details** | Configurable | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Span of Control & Layer Analytics** | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ |
| **Create Transfer / Promotion Request**| ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |
| **Approve Org Change Request** | ❌ | ❌ | ❌ | ✅ | ✅ (Optional)| ❌ |
| **Workforce Scenario Planning** | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| **Data Quality Alert Center** | ❌ | ❌ | ✅ | ✅ | ❌ | ✅ |
| **Bulk Import / Export** | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |
| **System & Field Mapping Config** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |

---

## 3. Data Field Permission Matrix

| Employee Field | `GENERAL_SHARED` | `MANAGER` | `HR` / `HR_MANAGER` | `EXECUTIVE` |
| :--- | :---: | :---: | :---: | :---: |
| **`Employee_ID`, Name, Nickname, Photo** | Read | Read | Read / Write | Read |
| **Department, Section, Position, Manager** | Read | Read | Read / Write | Read |
| **Work Location, Join Date, Email** | Read | Read | Read / Write | Read |
| **Employment Type, Status, Grade** | Read | Read | Read / Write | Read |
| **Personal Phone Number / Address** | ❌ Excluded | ❌ Excluded | Read (Restricted) | ❌ Excluded |
| **Salary, Bank Account, Citizen ID** | ❌ Excluded | ❌ Excluded | ❌ Excluded from UI | ❌ Excluded |

---

## 4. Operational Principles for Shared Account (`GENERAL_SHARED`)
1. **Zero Personal Identity Assumption:** `kintone.getLoginUser()` returns the shared username (`shared_staff`). The system MUST NOT render "My Profile", "My Manager", or "My Approvals".
2. **Absolute Read-Only Enforcement:** All HTTP POST, PUT, DELETE, and PATCH API calls originating from a `GENERAL_SHARED` session are intercepted and blocked.
3. **Sensitive Field Omission:** Payloads requested by `GENERAL_SHARED` explicitly exclude sensitive fields at the API parameter layer.
