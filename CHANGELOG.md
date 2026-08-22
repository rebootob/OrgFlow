# CHANGELOG — ORGFLOW

## [v1.3.4-phase6b2] - 2026-08-22

### Added
- **Phase 6B.2 Organization Master Redesign & Migration Plan (100% Read-Only):** Designed canonical Organization Master based on Organization Chart 2026.
- Classifying 522 App 791 records (271 Position Masters kept intact, 251 legacy raw department values classified for deprecation/migration).
- Designed 27 canonical Organization Master nodes across Company, Division, Department, Section, and Team levels using official business codes (TM10, TM70, TME1, TM50, TMG0, TM90, TMT1, TMT2, TMF1, etc.).
- Separated Position Masters (271 records) cleanly from Organization Units.
- Designed zero-downtime historical assignment preservation plan for App 792 (273 current active assignments).
- Verified 0 production writes across App 53, App 791, App 792, and App 793.
- Created deliverable reports in `docs/phase6b2/` ([`PROPOSED_ORGANIZATION_MASTER.md`](file:///c:/Users/allda/Desktop/Dev/git/OrgFlow/docs/phase6b2/PROPOSED_ORGANIZATION_MASTER.md)).
- Enforced Mandatory Stop Gate (Stopped for User Review & Approval).

---

## [v1.3.3-phase6b1b] - 2026-08-22

### Added
- **Phase 6B.1B Authoritative Org Chart Name Extraction & Master Crosswalk (Strict Read-Only Audit):** Extracted 27 verbatim business hierarchy nodes directly from Organization Chart 2026 (OrgFY2026).
- Conducted strict textual crosswalk comparison against App 791 masters. Identified 27 MISSING_IN_APP791 official English Org Chart structural nodes.
- Discovered structural naming gap between App 791's Thai employee-centric names (`"น.ส.พรหมศิริ พิมพ์สกุลไกร"`) and Org Chart 2026's official English structural names (`"Machinery Department (TM10)"`).
- Verified 0 production writes across App 53, App 791, App 792, and App 793.
- Created deliverable reports in `docs/phase6b1b/` ([`ORG_CHART_TO_APP791_CROSSWALK.md`](file:///c:/Users/allda/Desktop/Dev/git/OrgFlow/docs/phase6b1b/ORG_CHART_TO_APP791_CROSSWALK.md)).
- Enforced Mandatory Stop Gate (Stopped for Business Name Review).

---

## [v1.3.2-phase6b1a] - 2026-08-22

### Added
- **Phase 6B.1A Organization Master Name & Code Reconciliation (Strict Read-Only Audit):** Performed 100% read-only reconciliation of legacy raw strings against App 791 masters.
- Verified 251 EXACT_MATCH department/section master records against App 53 raw strings.
- Preserved exact legacy business names without AI generation, normalization, or English translation changes.
- Verified 0 production writes across App 53, App 791, App 792, and App 793.
- Created deliverable reports in `docs/phase6b1a/` ([`ORGANIZATION_MASTER_RECONCILIATION_MATRIX.md`](file:///c:/Users/allda/Desktop/Dev/git/OrgFlow/docs/phase6b1a/ORGANIZATION_MASTER_RECONCILIATION_MATRIX.md)).
- Enforced Mandatory Stop Gate (Stopped for User Review).

---

## [v1.3.1-phase6b1] - 2026-08-22

### Added
- **Phase 6B.1 Legacy Organization Structure Mapping Audit (100% Read-Only):** Performed 100% read-only three-way reconciliation between Organization Chart 2026 (TTMET business reference), App 53 (Employee Namelist), and App 791 (Org Masters).
- Verified Dynamic Tree capability (`entity_code` -> `parent_code` self-referential hierarchy) supporting Divisions, Departments, Sections, and Teams without schema modifications.
- Verified App 791 schema sufficiency (SUFFICIENT) and App 792 assignment model (SUFFICIENT).
- Verified legacy App 53 field protection (COMPATIBLE: `Text_0` and `Text` remain untouched for third-party Apps).
- Identified 0 architecture gaps.
- Verified 0 production writes across all apps.
- Created deliverable audit reports in `docs/phase6b1/` ([`PHASE_6B1_LEGACY_ORG_MAPPING_AUDIT.md`](file:///c:/Users/allda/Desktop/Dev/git/OrgFlow/docs/phase6b1/PHASE_6B1_LEGACY_ORG_MAPPING_AUDIT.md)).
- Enforced Mandatory Stop Gate (Stopped for User Review).

---

## [v1.3.0-phase6b] - 2026-08-22

### Added
- **Phase 6B Controlled Multi-Scenario Validation & Pre-Bulk-Migration Safety Certification:** Conducted multi-scenario validation of OrgFlow Organization Change Engine.
- Audited and certified 10 core architectural scenarios (same department position change, cross-dept transfer, simultaneous dept+pos atomic change, cross-dept manager, manager without Kintone account, blank manager, GM reject/return, HR reject/return, SYSTEM_APPLY failure recovery, and dynamic org restructuring).
- Audited 27/27 mandatory acceptance gates passed (G01 to G27).
- Verified 1:1 active assignment ratio (273 active eligible employees = 273 current active assignments).
- Verified 0 unintended production writes.
- Created deliverable certification reports in `docs/phase6b/` ([`PHASE_6B_FINAL_CERTIFICATION.md`](file:///c:/Users/allda/Desktop/Dev/git/OrgFlow/docs/phase6b/PHASE_6B_FINAL_CERTIFICATION.md)).
- Enforced Mandatory Stop Gate (Stopped before bulk migration / Phase 6C).

---

## [v1.2.3-phase6a] - 2026-08-22

### Added
- **Phase 6A Controlled End-to-End Transaction Validation (FINAL PASS):** Successfully executed controlled restoration transaction for Employee `173` via App 793 Change Request ID `2` (`REQ-6A-RESTORE-1787384414718`).
- Restored Employee `173` to original baseline position (`POS-001`) while preserving full truthful historical audit trail in App 792.
- Verified 3 assignment timeline records for Employee `173` in App 792 (Record ID `1`: `POS-001` Historical; Record ID `274`: `POS-002` Historical; Record ID `275`: `POS-001` Current Active).
- Verified 1:1 cardinality ratio: Employee `173` has exactly 1 current active assignment.
- Verified 16/16 final acceptance criteria passed.
- Verified 0 writes to App 53 (275 records, 100% untouched) and App 791 (522 records, 100% untouched).
- Created final deliverable report ([`PHASE_6A_FINAL_VERIFICATION_REPORT.md`](file:///c:/Users/allda/Desktop/Dev/git/OrgFlow/docs/phase6/PHASE_6A_FINAL_VERIFICATION_REPORT.md)).

---

## [v1.2.2-phase6a] - 2026-08-22

### Added
- **Phase 6A Controlled SYSTEM_APPLY Execution (Gate #2 Executed):** Successfully executed atomic transaction for Change Request `REQ-6A-1787384162463` (App 793 Record ID `1`).
- Updated old baseline assignment (App 792 Record ID `1`: `effective_end_date = 2026-08-31`).
- Created new current assignment (App 792 Record ID `274`: `pos_code = POS-002`, `effective_start_date = 2026-09-01`, `internal_id = ASG-REQ-1`).
- Transitioned App 793 status `SYSTEM_APPLY` -> `APPLIED` with `applied_assignment_id = ASG-REQ-1`.
- Verified idempotency protection: Re-execution on `APPLIED` record correctly blocked by Process Management.
- Verified 0 writes to App 53 (275 records, 100% untouched) and App 791 (522 records, 100% untouched).
- Created deliverable report ([`PHASE_6A_SYSTEM_APPLY_REPORT.md`](file:///c:/Users/allda/Desktop/Dev/git/OrgFlow/docs/phase6/PHASE_6A_SYSTEM_APPLY_REPORT.md)).
- Enforced Mandatory Stop Gate #3 (Stopped at Gate #3 before restoration).

---

## [v1.2.1-phase6a] - 2026-08-22

### Added
- **Phase 6A Controlled End-to-End Workflow Validation (Gate #1 Executed):** Created controlled Change Request ID `REQ-6A-1787384162463` (App 793 Record ID `1`) for Employee `173`.
- Executed sequential Process Management workflow: `DRAFT` -> `Submit` -> `SUBMITTED` -> `Send to GM Review` -> `GM_REVIEW`.
- Verified Test R1 Rejection: `Reject / Return for Correction` (`GM_REVIEW` -> `DRAFT`).
- Verified Resubmission & Test R2 Rejection: `Reject / Return to GM` (`HR_REVIEW` -> `GM_REVIEW`).
- Re-approved to final human approval state: `HR Approve` -> **`APPROVED`**.
- Generated SYSTEM_APPLY Dry-Run / Preview (`PHASE_6A_SYSTEM_APPLY_PREVIEW.json`) and Restoration Plan.
- Verified 0 writes to App 53, App 791, and App 792.
- Created deliverable report ([`PHASE_6A_WORKFLOW_TEST_REPORT.md`](file:///c:/Users/allda/Desktop/Dev/git/OrgFlow/docs/phase6/PHASE_6A_WORKFLOW_TEST_REPORT.md)).
- Enforced Mandatory Stop Gate #2 (Stopped at `APPROVED` state).

---

## [v1.2.0-phase6a] - 2026-08-22

### Added
- **Phase 6A Controlled End-to-End Transaction Validation (Selection Phase):** Conducted 100% Read-Only discovery and drift check on Production Kintone environment.
- Selected 1 safe test employee candidate (`Number = 173`, App 792 Assignment ID `1`).
- Designed safe reversible position change test (BEFORE: `POS-001` $\rightarrow$ PROPOSED: `POS-002` $\rightarrow$ ROLLBACK: `POS-001`).
- Verified 20/20 Pre-Transaction Safety Gates passed (G01 to G20).
- Created pre-transaction snapshot and report ([`PHASE_6A_PRE_TRANSACTION_REPORT.md`](file:///c:/Users/allda/Desktop/Dev/git/OrgFlow/docs/phase6/PHASE_6A_PRE_TRANSACTION_REPORT.md)).
- Enforced Mandatory Stop Gate #1 with 0 production writes executed.

---

## [v1.1.1] - 2026-08-22

### Added
- **Phase 5H Baseline Integrity & HR Operational Readiness Validation:** Conducted 100% Read-Only audit of live Production Kintone environment.
- Verified 1:1 cardinality ratio: 273 active eligible employees map to exactly 273 current assignments in App 792.
- Verified 100% Department reference resolution and 100% Position reference resolution against App 791 (522 Org Master records).
- Reconciled headcount: Sum of Department Headcounts = 273, Sum of Position Headcounts = 273.
- Verified 0 active assignments created for legacy duplicate `Number = 9000` (Record 390 & Record 382).
- Audited 30/30 acceptance gates passed (G01 to G30).
- Simulated HR business views, tested 12 HR operational scenarios, and generated human-readable Org Tree.
- Created deliverable reports in `docs/phase5h/` ([`PHASE_5H_OPERATIONAL_READINESS_REPORT.md`](file:///c:/Users/allda/Desktop/Dev/git/OrgFlow/docs/phase5h/PHASE_5H_OPERATIONAL_READINESS_REPORT.md)).
- Verified 0 writes executed on Production Kintone Apps 53, 791, 792, and 793.

---

## [v1.1.0] - 2026-08-22

### Added
- **Phase 5G Controlled Production Initialization:** Populated Kintone App 791 (`OrgFlow Organization Masters`) with 522 verified master records (251 Departments + 271 Positions).
- Populated Kintone App 792 (`OrgFlow Org Assignment History Log`) with 273 verified baseline assignment records (1:1 ratio for all 273 active eligible employees).
- Enforced strict exclusion for legacy duplicate `Number = 9000` (Record 390 - Tomita & Record 382 - PANU) resulting in 0 active assignments created for `Number = 9000`.
- Verified 20/20 acceptance gates passed (G01 to G20).
- Generated SHA-256 pre-change backup snapshots in `backup/phase5g/`.
- Verified protected apps remain 100% untouched (`Employee Namelist` App 53: 275 records; App 793: 0 records; Other Apps: 0 writes).
- Created deliverable report ([`PHASE_5G_PRODUCTION_INITIALIZATION_REPORT.md`](file:///c:/Users/allda/Desktop/Dev/git/OrgFlow/docs/phase5g/PHASE_5G_PRODUCTION_INITIALIZATION_REPORT.md)).

---

## [v1.0.3] - 2026-08-22

### Added
- **Phase 5F.1 Legacy Employee Exception Validation:** Confirmed former employee status for Record ID 390 (Tomita) and Record ID 382 (PANU) with duplicate `Number = 9000`.
- Classified Records 390 & 382 as `LEGACY_EXCLUDED` and excluded them from App 792 baseline current assignment initialization (0 Current Assignments created for `Number = 9000`).
- Re-evaluated employee population: 275 Total Source Records $\rightarrow$ **273 Active Eligible Employees** + 2 Legacy Excluded.
- Re-calculated App 792 baseline assignment candidates: **273 Records** (1 Active Employee = Exactly 1 Assignment Candidate).
- Verified Gate `G01-A` (`KNOWN LEGACY EXCEPTION` preserved in App 53) and Gate `G01-B` (`PASS` for current migration integrity).
- Created deliverable report ([`PHASE_5F1_LEGACY_EMPLOYEE_EXCEPTION_REPORT.md`](file:///c:/Users/allda/Desktop/Dev/git/OrgFlow/docs/discovery/PHASE_5F1_LEGACY_EMPLOYEE_EXCEPTION_REPORT.md)).
- Verified 0 writes executed on Production Kintone Apps 53, 791, 792, and 793.

---

## [v1.0.2] - 2026-08-22

### Added
- **Phase 5F Master Data Discovery & Migration Dry-Run:** Analyzed all 275 Production records in `Employee Namelist` (App ID 53) in 100% Read-Only mode.
- Discovered 251 distinct departments and 273 distinct positions.
- Generated in-memory proposed Org Masters for App 791 (524 candidate records) and baseline assignments for App 792 (275 candidate records).
- Audited 12 acceptance gates and generated data quality exception register (21 exception items logged).
- Created deliverable markdown reports and machine-readable JSON artifacts in `docs/discovery/`.
- Verified 0 writes executed on Production Kintone Apps 53, 791, 792, and 793.

---

## [v1.0.1] - 2026-08-22

### Added
- **Phase 5E Reject / Return / System Failure Amendment:** Deployed 3 controlled backward transitions to Kintone App 793 (`GM_REVIEW` -> `DRAFT`, `HR_REVIEW` -> `GM_REVIEW`, `SYSTEM_APPLY` -> `APPROVED`).
- Verified 9 live actions read-back (6 forward + 3 backward) via Kintone REST API.
- Enforced terminal state immutability for `APPLIED` (0 outbound transitions).
- Updated unit test suite to 36 regression test scenarios covering all forward/backward paths, audit preservation, and failure rollbacks (36/36 PASS).
- Verified protected apps remain 100% untouched (`Employee Namelist` App 53: 275 records; App 791: 0 records; App 792: 0 records; App 793: 0 records).
- Created amendment report ([`PHASE_5E_REJECT_RETURN_AMENDMENT_REPORT.md`](file:///c:/Users/allda/Desktop/Dev/git/OrgFlow/docs/architecture/PHASE_5E_REJECT_RETURN_AMENDMENT_REPORT.md)).

---

## [v1.0.0] - 2026-08-22

### Added
- **Phase 5E Controlled Production Execution:** Configured and deployed Canonical 7-State Process Management to `OrgFlow Org Change Request` App (**App ID: 793**) on Kintone Production (`https://ttmet.cybozu.com`).
- Verified 7 live statuses read-back (`DRAFT`, `SUBMITTED`, `GM_REVIEW`, `HR_REVIEW`, `APPROVED`, `SYSTEM_APPLY`, `APPLIED`).
- Implemented configurable, cross-department approver model for `GM_REVIEW` and `HR_REVIEW` (Zero hardcoded usernames).
- Created pre-change configuration backup in `secure-backup/phase5e_pre_execution_app793_1787382232377/`.
- Verified protected apps remain 100% untouched (`Employee Namelist` App 53: 275 records; App 791: 0 records; App 792: 0 records; App 793: 0 records).
- Created execution report ([`PHASE_5E_PRODUCTION_EXECUTION_REPORT.md`](file:///c:/Users/allda/Desktop/Dev/git/OrgFlow/docs/deployment/PHASE_5E_PRODUCTION_EXECUTION_REPORT.md)) and rollback plan ([`PHASE_5E_ROLLBACK_PLAN.md`](file:///c:/Users/allda/Desktop/Dev/git/OrgFlow/docs/deployment/PHASE_5E_ROLLBACK_PLAN.md)).

---

## [v0.9.11] - 2026-08-22

### Added
- **Phase 5E Canonical 7-State Workflow Architecture:** Defined and validated 7-state canonical path (`DRAFT` -> `SUBMITTED` -> `GM_REVIEW` -> `HR_REVIEW` -> `APPROVED` -> `SYSTEM_APPLY` -> `APPLIED`).
- Implemented configurable approver model for `GM_REVIEW` and `HR_REVIEW` (Zero hardcoded usernames or mandatory department constraints).
- Verified `SYSTEM_APPLY` transaction boundary enforcing 11 pre-checks before writing to App 792.
- Built 20 unit regression tests covering all 7 states, cross-dept approvals, security guards, and failure abort gates (20/20 PASS).
- Verified production apps remain 100% untouched (App 53: 275 records, Apps 791/792/793: 0 records).
- Created workflow architecture documentation ([`PHASE_5E_FINAL_WORKFLOW_ARCHITECTURE.md`](file:///c:/Users/allda/Desktop/Dev/git/OrgFlow/docs/architecture/PHASE_5E_FINAL_WORKFLOW_ARCHITECTURE.md)).

---

## [v0.9.8] - 2026-08-22

### Added
- **Phase 5D Production App Deployment:** Created `OrgFlow Org Change Request` App (**App ID: 793**) on Kintone Production (`https://ttmet.cybozu.com`).
- Added 11 approved fields (`request_id`, `employee_ref`, `change_type`, `current_dept_code`, `target_dept_code`, `current_pos_code`, `target_pos_code`, `target_manager_ref`, `effective_date`, `justification`, `applied_assignment_id`).
- Deployed live preview to production and verified read-back schema (11/11 Fields Present, 0 Production Records inserted).
- Verified `Employee Namelist` (App ID 53) remains 100% untouched (275 records, 0 modifications).
- Verified `OrgFlow Organization Masters` (App ID 791) remains 100% untouched (0 records, 0 modifications).
- Verified `OrgFlow Org Assignment History Log` (App ID 792) remains 100% untouched (0 records, 0 modifications).
- Created deployment verification report ([`PHASE_5D_CHANGE_REQUEST_VERIFICATION.md`](file:///c:/Users/allda/Desktop/Dev/git/OrgFlow/PHASE_5D_CHANGE_REQUEST_VERIFICATION.md)).

---

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
