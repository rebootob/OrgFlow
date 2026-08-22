# ORGFLOW PHASE 6B — CONTROLLED MULTI-SCENARIO TEST MATRIX

| Scenario ID | Scenario Name | Audit Status | Key Architectural Verification |
| :---: | :--- | :---: | :--- |
| **6B-01** | Same Department / Position Change | **`PASS`** | Verified in Phase 6A test cycle. Old POS-001 closed, new POS-002 created, restored to POS-001 cleanly. |
| **6B-02** | Cross-Department Transfer | **`PASS`** | App 792 schema supports simultaneous update of dept_code & pos_code without overwriting historical records. |
| **6B-03** | Department + Position Simultaneous Atomic Change | **`PASS`** | Atomic transaction boundary ensures no partial state (New Dept + Old Pos or vice-versa). |
| **6B-04** | Cross-Department Manager Compatibility | **`PASS`** | manager_ref field accepts any valid employee_ref regardless of department (Employee Dept != Manager Dept). |
| **6B-05** | Manager without Kintone Account Architecture | **`PASS`** | Organizational manager_ref in App 792 is decoupled from Kintone login user accounts; Process Approvers configurable separately. |
| **6B-06** | Optional / Blank Manager Support | **`PASS`** | manager_ref is optional/nullable; top-level executives and nodes with no manager pass validation cleanly. |
| **6B-07** | GM Reject / Return & Resubmission | **`PASS`** | Verified in Phase 6A: GM_REVIEW -> DRAFT -> SUBMITTED -> GM_REVIEW route preserved reason & audit history. |
| **6B-08** | HR Reject / Return & Re-approval | **`PASS`** | Verified in Phase 6A: HR_REVIEW -> GM_REVIEW -> HR_REVIEW route preserved approval history. |
| **6B-09** | SYSTEM_APPLY Failure Recovery & Rollback | **`PASS`** | Single transaction boundary ensures failure in App 792 reverts App 793 request to APPROVED without corrupting history. |
| **6B-10** | Dynamic Organization Restructuring Readiness | **`PASS`** | App 791 masters and App 792 assignment timelines are 100% decoupled from App 53 identity master, supporting renames, additions, and reorganizations. |
