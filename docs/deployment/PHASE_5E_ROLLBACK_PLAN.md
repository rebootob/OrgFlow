# ORGFLOW PHASE 5E — ROLLBACK PLAN & PROCEDURES

## 1. Executive Summary

This document specifies the exact rollback procedures for Phase 5E Production Execution on Kintone App ID 793 (`OrgFlow Org Change Request`).

---

## 2. Pre-Change Backup Metadata Reference

- **Target App ID:** 793 (`OrgFlow Org Change Request`)
- **Backup Location:** `secure-backup/phase5e_pre_execution_app793_1787382232377/`
- **Git Protection:** Verified excluded by `.gitignore:28:secure-backup/`
- **Backup Artifacts:**
  - `fields.json`
  - `acl.json`
  - `status.json`
  - `PHASE_5E_PRE_CHANGE_MANIFEST.json`

---

## 3. Rollback Execution Procedure

If a failure occurs or upon explicit User direction to revert Process Management:

1. **Disable Process Management via Kintone REST API:**
   ```http
   PUT /k/v1/preview/app/status.json
   Content-Type: application/json

   {
     "app": "793",
     "enable": false
   }
   ```
2. **Deploy Configuration to Live App:**
   ```http
   POST /k/v1/preview/app/deploy.json
   Content-Type: application/json

   {
     "apps": [{ "app": "793" }]
   }
   ```
3. **Read-Back Verification:**
   Query `GET /k/v1/app/status.json?app=793` and verify `enable: false`.
