# CHANGELOG — ORGFLOW

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
