# ORGFLOW SECURITY & COMPLIANCE SPECIFICATION

## 1. Security Core Principles

```text
  SECURITY BEFORE CONVENIENCE  |  LEAST PRIVILEGE  |  DATA MINIMIZATION
```

OrgFlow handles sensitive organizational and personal employee data. The security model ensures zero unauthorized data leakage or privilege escalation across all access levels.

---

## 2. Shared Account Operational Security Protocol

### Challenge & Vulnerability
In enterprise environments, operational staff frequently log into Kintone via a single **Shared/Common Account** (`GENERAL_SHARED`). 

### Mitigation Strategies
1. **No Individual Identity Association:** Shared accounts are strictly decoupled from individual `Employee_ID` records. Personalized features (e.g. "My Team", "My Profile") are disabled.
2. **Immutable Read-Only Access:** Front-end button hiding is backed by API request interception. Any write call (`POST`, `PUT`, `DELETE`) executed by a `GENERAL_SHARED` session will be blocked immediately by Kintone App Record Permissions.
3. **Shared Account Audit Boundary:** Documentation explicitly states that write actions performed under shared accounts cannot be attributed to specific individuals. Therefore, **all write actions (Transfers, Promotions, Approvals) require login via an Individual Kintone Account**.

---

## 3. Defense Against Web Vulnerabilities

### 3.1 Cross-Site Scripting (XSS) Prevention
- **HTML Escaping Standard:** User-provided text strings (Names, Nicknames, Position Titles, Department Names, Remarks) MUST NOT be inserted using `innerHTML` or `document.write()` without sanitization.
- **Sanitization Utility:** Standardized text sanitizer helper (`src/utils/sanitizer.js`):

```javascript
export function escapeHTML(str) {
    if (typeof str !== 'string') return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
```

### 3.2 Secret Key & Credential Management
- **Zero Plain-Text Credentials:** JavaScript code deployed to Kintone Custom View runs on the user's browser. **NO API TOKENS, PASSWORDS, OR SECRETS SHALL EVER BE STORED IN JAVASCRIPT SOURCE CODE.**
- **Session Authentication:** All REST API queries execute using native browser session credentials (`kintone.api`), ensuring Kintone enforces field-level permissions natively.

---

## 4. Sensitive Employee Data Isolation & Minimization
- **Data Payload Filtering:** REST API requests only request field codes necessary for Org Chart and Directory views (e.g. `fields: ['Employee_ID', 'Employee_Name_TH', 'Department_ID', 'Position_ID', 'Manager_Employee_ID']`).
- **Exclusion of Confidential HR Data:** Fields like Salary, National ID, Bank Account Number, Home Address, and Performance Ratings are never requested or cached in client memory.

---

## 5. Security Audit & Pre-Production Checklist
Prior to production deployment, the following security verification scenarios must be executed:

- [ ] **Bypass Test:** Direct REST API invocation using developer console under `GENERAL_SHARED` login -> Verify write requests are rejected (`403 Forbidden`).
- [ ] **XSS Test:** Insert test string `<script>alert(1)</script>` in Employee Name field -> Verify text renders safely escaped in Org Chart node card.
- [ ] **Data Minimization Audit:** Inspect browser network panel responses -> Verify zero confidential fields (Salary, Citizen ID) present in JSON responses.
- [ ] **Session Timeout Test:** Ensure long-idle sessions cleanly prompt session expiration without corrupting DOM state.
