# CHANGELOG — ORGFLOW

## [v0.9.5] - 2026-08-22

### Added
- **Phase 5C Production App Deployment:** Created `OrgFlow Org Assignment History Log` App (**App ID: 792**) on Kintone Production (`https://ttmet.cybozu.com`).
- Added 9 approved streamlined fields (`internal_id`, `employee_ref`, `dept_code`, `section_code`, `pos_code`, `manager_ref`, `assignment_type`, `effective_start_date`, `effective_end_date`).
- Verified removal of redundant derived fields (`is_current_active` & `is_acting_temp`) to enforce 100% Single Source of Truth architecture.
- Deployed live preview to production and verified read-back schema (9/9 Fields Present, 0 Production Records inserted).
- Verified `Employee Namelist` (App ID 53) remains 100% untouched (275 records, 0 modifications).
- Verified `OrgFlow Organization Masters` (App ID 791) remains 100% untouched (0 records, 0 modifications).
- Created deployment verification report ([`PHASE_5C_ASSIGNMENT_LOG_VERIFICATION.md`](file:///c:/Users/allda/Desktop/Dev/git/OrgFlow/PHASE_5C_ASSIGNMENT_LOG_VERIFICATION.md)).

---

## [v0.9.2] - 2026-08-22

### Added
- **Phase 5B Production App Deployment:** Created `OrgFlow Organization Masters` App (**App ID: 791**) on Kintone Production (`https://ttmet.cybozu.com`).
- Added 13 approved fields (`master_type`, `entity_code`, `title_th`, `title_en`, `parent_code`, `dept_code`, `head_employee_ref`, `headcount_quota`, `job_level`, `display_order`, `is_active`, `effective_from`, `effective_to`).
- Deployed live preview to production and verified read-back schema (13/13 Fields Present, 0 Production Records inserted).
- Verified `Employee Namelist` (App ID 53) remains 100% untouched (275 records, 0 modifications).
- Created deployment verification report ([`PHASE_5B_ORG_MASTERS_VERIFICATION.md`](file:///c:/Users/allda/Desktop/Dev/git/OrgFlow/PHASE_5B_ORG_MASTERS_VERIFICATION.md)).

---

## [v0.2.0] - 2026-08-22

### Added
- Created central system configuration (`src/config/kintoneConfig.js`).
- Created field mapping & data normalization engine (`src/config/fieldMappings.js`) ensuring zero modifications to protected `Employee Namelist` field codes.
- Created System Access Role & permission rules (`src/config/roleConfig.js`).
- Created security sanitizer utility for XSS prevention (`src/utils/sanitizer.js`).
- Created Kintone REST API batch client (`src/api/kintoneClient.js`) supporting batch queries (`limit=500`), cursor pagination, and sensitive field payload filtering.

### Security
- Excluded confidential fields (`salary`, `citizen_id`, `bank_account`) from client API parameter payloads.
- Added string HTML escaping across data sanitizer utilities.

---

## [v0.1.0-baseline] - 2026-08-22

### Added
- Initial baseline repository setup and governance documentation.
- Architecture specification (`docs/ARCHITECTURE.md`).
- Master field inventory (`docs/EMPLOYEE_NAMELIST_FIELD_INVENTORY.md`).
- Field dependency map & breaking risk analysis (`docs/FIELD_DEPENDENCY_MAP.md`).
- Kintone ecosystem relationship map (`docs/KINTONE_APP_RELATIONSHIP_MAP.md`).
- Permission matrix (`docs/PERMISSION_MATRIX.md`).
- Security compliance specification (`docs/SECURITY.md`).
