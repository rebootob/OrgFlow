# EMPLOYEE NAMELIST (APP 53) — RESTORE RUNBOOK & RECOVERY PROCEDURE

## 1. Overview & Emergency Scenarios
This document details the step-by-step restoration procedures for **`Employee Namelist` (App ID 53)** using the baseline backup snapshot stored in `secure-backup/baseline_app_53_<timestamp>/`.

---

## 2. Component Restore Map & Procedures

### Scenario A: Record Data Loss or Corruption
- **Backup Files:** `records_baseline.json`, `records_baseline.csv`
- **Restore Procedure:**
  1. Inspect `records_baseline.json` or `records_baseline.csv` to isolate deleted/corrupted records.
  2. Use Kintone REST API (`POST /k/v1/records.json`) or Kintone Native CSV File Import (`App Settings -> Import from File`) to re-import missing records using `emp_text` (Employee ID) as the primary key.
  3. Verify record count matches baseline count (275 records).

### Scenario B: Form Fields or Layout Corruption
- **Backup Files:** `fields_baseline.json`, `layout_baseline.json`
- **Restore Procedure:**
  1. Inspect `fields_baseline.json` to verify field properties, codes, and options.
  2. Re-create any missing field via Kintone REST API (`POST /k/v1/app/form/fields.json`) or Kintone Form Settings GUI using exact field codes (e.g. `emp_text`, `Text_0`, `Drop_down_0`).
  3. Apply Layout settings using `layout_baseline.json` (`PUT /k/v1/app/form/layout.json`).
  4. Click **Update App (นำแอปไปใช้)** to apply changes.

### Scenario C: Views Configuration Corruption
- **Backup File:** `views_baseline.json`
- **Restore Procedure:**
  1. Inspect `views_baseline.json` for custom view IDs and query filters.
  2. Re-apply views using Kintone API (`PUT /k/v1/app/views.json`) or View Settings GUI.

### Scenario D: Process Management / Status Workflow Corruption
- **Backup File:** `status_baseline.json`
- **Restore Procedure:**
  1. Inspect `status_baseline.json` for workflow states and actions.
  2. Re-apply status configuration via API (`PUT /k/v1/app/status.json`) or Process Management GUI.

### Scenario E: App & Field Permission (ACL) Corruption
- **Backup Files:** `app_acl_baseline.json`, `field_acl_baseline.json`
- **Restore Procedure:**
  1. Inspect `app_acl_baseline.json` and `field_acl_baseline.json` for role mappings and permissions.
  2. Re-apply ACLs via API (`PUT /k/v1/app/acl.json` & `PUT /k/v1/field/acl.json`) or Permissions Settings GUI.

---

## 3. Post-Restore Verification Checklist
- [ ] Record count equals 275 records.
- [ ] Field count equals 44 fields.
- [ ] Key field `emp_text` resolves correctly.
- [ ] Downstream lookup references in Training/Evaluation apps operate without error.
