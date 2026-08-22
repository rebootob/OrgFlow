# ORGFLOW PHASE 5E — FINAL WORKFLOW ARCHITECTURE REPORT

## 1. Final State Machine (Canonical 7-State Successful Path)

```text
┌──────────┐     Submit      ┌───────────┐    Send to GM   ┌───────────┐
│  DRAFT   ├────────────────►│ SUBMITTED ├────────────────►│ GM_REVIEW │
│ (Form)   │                 └───────────┘                 └─────┬─────┘
└──────────┘                                                     │ GM Approve
                                                                 ▼
┌──────────┐   Apply Commit  ┌──────────────┐   HR Approve ┌───────────┐
│ APPLIED  │◄────────────────┤ SYSTEM_APPLY │◄─────────────┤ HR_REVIEW │
│ (App 792)│                 │ (11 Gates)   │              └─────┬─────┘
└──────────┘                 └──────────────┘                    │ All Approved
                                                                 ▼
                                                           ┌───────────┐
                                                           │ APPROVED  │
                                                           └───────────┘
```

---

## 2. Transition Matrix & Action Mechanics

| From State | Action / Event | To State | Who Can Execute | Data Write Allowed? |
| :--- | :--- | :--- | :--- | :---: |
| **`DRAFT`** | `SUBMIT` | **`SUBMITTED`** | Requester (Line Mgr / HR) | NO (Form Draft Only) |
| **`SUBMITTED`** | `SEND_TO_GM` | **`GM_REVIEW`** | Workflow Router | NO |
| **`GM_REVIEW`** | `GM_APPROVE` | **`HR_REVIEW`** | Configured GM Approver | NO |
| **`GM_REVIEW`** | `GM_REJECT` | **`RETURN_TO_DRAFT`** | Configured GM Approver | NO |
| **`HR_REVIEW`** | `HR_APPROVE` | **`APPROVED`** | Configured HR Approver | NO |
| **`HR_REVIEW`** | `HR_REJECT` | **`RETURN_TO_DRAFT`** | Configured HR Approver | NO |
| **`APPROVED`** | `START_APPLY` | **`SYSTEM_APPLY`** | Application Engine | NO (Pre-check Phase) |
| **`SYSTEM_APPLY`**| `COMMIT_SUCCESS`| **`APPLIED`** | Application Engine | **YES (App 792 Write)** |
| **`SYSTEM_APPLY`**| `CHECK_FAILED` | **`APPROVED`** | Application Engine | **NO (Aborted / Rollback)** |

---

## 3. Actor / Permission Matrix

| Role | DRAFT | SUBMITTED | GM_REVIEW | HR_REVIEW | APPROVED | SYSTEM_APPLY | APPLIED |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **`GENERAL_SHARED`** | Create Draft | View Only | DENIED | DENIED | View Only | DENIED | View Only |
| **`DEPT_MANAGER`** | Create/Edit | View Scope | Configured Approver | DENIED | View Scope | DENIED | View Scope |
| **`CONFIGURED_GM`** | View Scope | View Scope | **GM Approve/Reject** | View Scope | View Scope | DENIED | View Scope |
| **`CONFIGURED_HR`** | Create/Edit | View Scope | View Scope | **HR Approve/Reject** | View Scope | DENIED | View Scope |
| **`SYSTEM_ENGINE`** | N/A | N/A | N/A | N/A | Trigger Check | **Execute 11 Gates**| **Write App 792** |

---

## 4. Flexible Approver Model & Non-Department Constraint

> [!NOTE]
> **FINAL BUSINESS RULE:**
> "The workflow stages are fixed, but the people responsible for approval are configurable by the administrator and are not restricted by the employee's department."

- `Employee Department !== Approver Department`: **100% VALID**
- `ORG_MASTERS` Hierarchy = Default Recommendation Source ONLY (NOT a mandatory constraint!)
- `CHANGE_REQUEST.approver_ref` = Authoritative Single Source of Truth for transaction approvers.

---

## 5. GM_REVIEW & HR_REVIEW Configuration Models

- **`GM_REVIEW` Configuration:** Represents the General Manager approval stage. The actual approver is a configurable Kintone user or group assigned by Admin/HR. Cross-department GM is 100% valid. Zero hardcoded usernames in code logic!
- **`HR_REVIEW` Configuration:** Represents the HR verification stage. Configurable by Admin/HR. Zero hardcoded usernames in code logic!

---

## 6. Audit Trail Design (Immutable 6-Property Log)

Every approval transition captures and permanently logs:
1. `WHO`: Authenticated Kintone User (`proxy_kintone_user`)
2. `WHAT`: Action performed (`GM_APPROVE`, `HR_APPROVE`, `REJECT`)
3. `WHEN`: ISO-8601 Timestamp (`approved_at`)
4. `FROM / TO`: State Transition (`GM_REVIEW` $\rightarrow$ `HR_REVIEW`)
5. `ACTUAL APPROVER`: Business Approver Reference (`actual_approver_reference`)
6. `METHOD`: Approval Method (`DIRECT_KINTONE`, `HR_PROXY`, `GROUP_DELEGATED`)

---

## 7. SYSTEM_APPLY Transaction Boundary & 11 Pre-Checks

When a request reaches `SYSTEM_APPLY`, the Application Engine enforces **11 Pre-validations**:
1. Revalidate Request Status (`APPROVED`)
2. Revalidate Employee Status in App 53 (`Active`)
3. Revalidate Department Entity in App 791 (`Active DEP-`)
4. Revalidate Position Entity in App 791 (`Active POS-`)
5. Revalidate Department $\leftrightarrow$ Position Consistency
6. Revalidate Effective Date ($EffectiveDate \le Today$)
7. Perform Self-Reporting Check ($Employee \ne Manager$)
8. Perform DFS Circular Reporting Check
9. Check Primary Assignment Date Overlaps
10. Check Idempotency (`applied_assignment_id` is empty)
11. Write Audit Log & Verify Transaction Integrity

If **ANY** gate fails: Transaction is aborted, status reverts to `APPROVED`, and **ZERO records are written to App 792**!

---

## 8. Failure / Rollback Behavior & Reject Proposals

- **System Apply Failure:** Automatic rollback to `APPROVED` with error details logged. No partial writes.
- **Reject / Return Proposals:**
  - `GM_REVIEW` $\rightarrow$ `RETURN_TO_DRAFT` (Allows requester to correct errors)
  - `HR_REVIEW` $\rightarrow$ `RETURN_TO_DRAFT` (Allows requester to correct errors)

---

## 9. Regression Test Results (20/20 PASS)

| Test ID & Description | Execution Result |
| :--- | :---: |
| **T01-T04: Core Resolver & Security Guards (Self/Circular)** | **PASS** |
| **T05-T10: Canonical 7-State Workflow Transitions (DRAFT to APPLIED)** | **PASS** |
| **T11-T12: Configurable & Cross-Department GM/HR Approvers** | **PASS** |
| **T13-T14: Security Authorization & Audit Trail Immutability** | **PASS** |
| **T15: State Guard - APPROVED Does NOT Modify App 53/792** | **PASS** |
| **T16-T17: SYSTEM_APPLY Failure Abort vs Success Commit** | **PASS** |
| **T18: Reject Design - GM_REVIEW to RETURN_TO_DRAFT** | **PASS** |
| **T19-T20: Production Protection (App 53 275 Recs, Apps 791/792/793 0 Recs)** | **PASS** |

---

## 10. Proposed Production Change Plan & Rollback Plan

```text
===============================================================================
PRODUCTION CHANGE PLAN: PHASE 5E EXECUTION — KINTONE PROCESS MANAGEMENT
===============================================================================
TARGET APP:         App ID 793 (OrgFlow Org Change Request)
ACTION:             Enable & Configure Kintone Process Management
STATES TO CREATE:   DRAFT, SUBMITTED, GM_REVIEW, HR_REVIEW, APPROVED, SYSTEM_APPLY, APPLIED, RETURN_TO_DRAFT
ACTIONS TO CREATE:  Submit, Send to GM Review, GM Approve, HR Approve, System Apply Execution

PRE-CHANGE BACKUP:   Current App 793 Status JSON exported
ROLLBACK PLAN:       Disable Process Management via Kintone REST API if execution fails
===============================================================================
```
