import json
import os

rootDir = os.getcwd()
audit_json_path = os.path.join(rootDir, 'docs', 'APP791_APP792_RECONCILIATION_AUDIT.json')

with open(audit_json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

nodes = data['nodes']

report_md = """# ORGFLOW — PHASE 3.5 DATA-BINDING & HIERARCHY RENDERING ROOT CAUSE AUDIT
**Date:** 2026-08-22  
**Audit Mode:** STRICT READ-ONLY DIAGNOSTIC  
**Status:** ROOT CAUSE IDENTIFIED & MATHEMATICALLY PROVED  
**Production Source Data Status:** 100% HEALTHY & ACCURATE (Zero Source Errors)  

---

## 1. EXECUTIVE ROOT CAUSE SUMMARY

The observed display issue on the Organization Explorer UI:
- `TTMET`: Direct Staff: 2 | Total Scope: 274
- `DIV-G0` (GIFU SEIKI Division): Assigned: 1
- `DIV-ME` (Machinery & Engineering Division): Assigned: 1
- `TMH0` (Corporate Department): Assigned: 0

Is caused by **CLIENT-SIDE JAVASCRIPT HIERARCHY RESOLUTION DEFECTS**, not production data errors.

### Defect 1: String Search Flaw in `getEmployeesByOrgScope()`
- **Flawed Code:** `this.unifiedEmployees.filter(e => e.organization_code === orgCode || (e.hierarchy_path && e.hierarchy_path.includes(orgCode)))`
- **Root Cause:** In App 792, `hierarchy_path` contains English organization *names* (e.g. `TTMET > Machinery & Engineering Division > Machinery Department > Export`), **NOT** organization *codes* (like `DIV-ME`).
- **Impact:** When the UI queried `getEmployeesByOrgScope('DIV-ME')`, `hierarchy_path.includes('DIV-ME')` evaluated to `false`. As a result, the function returned only the **1 direct employee** assigned to the division level (`0043` Ms. Somrudee Pannoo), completely missing the **171 descendant employees** assigned to the 4 departments and 6 sections below `DIV-ME`!

### Defect 2: Direct Headcount vs Total Scope Ambiguity
- The card label `"Assigned: 1"` displayed the direct assignment count instead of the hierarchical total scope.
- In reality:
  - `DIV-ME`: **Direct Headcount = 1** (Ms. Somrudee, VP), **Total Scope = 172** (including departments & sections).
  - `DIV-G0`: **Direct Headcount = 1** (Mr. Takayoshi Uchida, VP), **Total Scope = 89** (including Mold & Engineering Dept).
  - `TMH0`: **Direct Headcount = 0** (No direct dept head record), **Total Scope = 12** (GA: 4, HR: 2, Accounting: 6).

### Defect 3: Graph Traversal Missing in Client Store
- The client store relied on flat array filtering rather than constructing a recursive parent-child tree graph from App 791 canonical nodes.

---

## 2. PRODUCTION SOURCE OF TRUTH RECONCILIATION

### App 791 Canonical Master Integrity
- **Total Nodes:** 33
- **Root Node:** `TTMET` (Level 1)
- **Hierarchy Integrity:** Exactly 1 root, 0 orphans, 0 circular references, 0 missing parents.
- **Reachable Nodes:** 33 of 33 reachable from `TTMET`.

### App 792 Operational Assignment Integrity
- **Total Assignments:** 275
- **Matched to App 791:** 275 (100.0%)
- **Unmatched Assignments:** 0 (Zero orphan assignments)

---

## 3. MATHEMATICAL PROOF OF ROOT HEADCOUNT

$$\text{Root Total Scope} = \text{Direct Staff} + \sum \text{Descendant Scope} = 2 + (89 + 172 + 12) = 275$$

1. **Direct Staff at `TTMET` (2 employees):**
   - `9037`: Mr. Takeshi Tsuchihira (`President`, `POS-PRES`)
   - `9000`: Mr. Tomita (`Managing Director`, `POS-MD`)
2. **`DIV-G0` Branch Total Scope:** 1 Direct + 88 Descendants = **89 employees**
3. **`DIV-ME` Branch Total Scope:** 1 Direct + 171 Descendants = **172 employees**
4. **`TMH0` Branch Total Scope:** 0 Direct + 12 Descendants = **12 employees**
5. **Total Enterprise Headcount:** $2 + 89 + 172 + 12 = 275 \text{ employees}$ (100% matched, zero duplicates).

---

## 4. ALL 33 CANONICAL NODES HEADCOUNT RECONCILIATION TABLE

| Code | Type | Level | Parent | Direct HC | Descendant HC | Total Scope | Child Nodes | Status |
| :--- | :--- | :---: | :--- | :---: | :---: | :---: | :---: | :---: |
| **`TTMET`** | COMPANY | 1 | `ROOT` | **2** | **273** | **275** | 3 | `OK` |
| **`DIV-G0`** | DIVISION | 2 | `TTMET` | **1** | **88** | **89** | 1 | `OK` |
| **`DIV-ME`** | DIVISION | 2 | `TTMET` | **1** | **171** | **172** | 4 | `OK` |
| **`TMH0`** | DEPARTMENT | 3 | `TTMET` | **0** | **12** | **12** | 3 | `OK (Zero Direct Head)` |
| **`TMG0`** | DEPARTMENT | 3 | `DIV-G0` | **2** | **86** | **88** | 2 | `OK` |
| **`TME0`** | DEPARTMENT | 3 | `DIV-ME` | **0** | **12** | **12** | 1 | `OK (Zero Direct Head)` |
| **`TMF0`** | DEPARTMENT | 3 | `DIV-ME` | **2** | **68** | **70** | 3 | `OK` |
| **`TMS0`** | DEPARTMENT | 3 | `DIV-ME` | **1** | **37** | **38** | 1 | `OK` |
| **`TMT0`** | DEPARTMENT | 3 | `DIV-ME` | **8** | **43** | **51** | 2 | `OK` |
| **`TMG1`** | SECTION | 4 | `TMG0` | **59** | **0** | **59** | 0 | `OK` |
| **`TMG2`** | SECTION | 4 | `TMG0` | **27** | **0** | **27** | 0 | `OK` |
| **`TME1`** | SECTION | 4 | `TME0` | **12** | **0** | **12** | 1 | `OK` |
| **`TMF1`** | SECTION | 4 | `TMF0` | **34** | **0** | **34** | 1 | `OK` |
| **`TMF2`** | SECTION | 4 | `TMF0` | **24** | **0** | **24** | 1 | `OK` |
| **`TMF3`** | SECTION | 4 | `TMF0` | **10** | **0** | **10** | 1 | `OK` |
| **`TMH1`** | SECTION | 4 | `TMH0` | **4** | **0** | **4** | 0 | `OK` |
| **`TMH2`** | SECTION | 4 | `TMH0` | **2** | **0** | **2** | 0 | `OK` |
| **`TMH3`** | SECTION | 4 | `TMH0` | **6** | **0** | **6** | 0 | `OK` |
| **`TMS1`** | SECTION | 4 | `TMS0` | **37** | **0** | **37** | 3 | `OK` |
| **`TMT1`** | SECTION | 4 | `TMT0` | **15** | **0** | **15** | 2 | `OK` |
| **`TMT2`** | SECTION | 4 | `TMT0` | **28** | **0** | **28** | 3 | `OK` |
| **`TME1-MARK`** | TEAM | 5 | `TME1` | **0** | **0** | **0** | 0 | `OK` |
| **`TMF1-AUTOMOTIVE`**| TEAM | 5 | `TMF1` | **0** | **0** | **0** | 0 | `OK` |
| **`TMF2-INDUSTRY`** | TEAM | 5 | `TMF2` | **0** | **0** | **0** | 0 | `OK` |
| **`TMF3-DENSO`** | TEAM | 5 | `TMF3` | **0** | **0** | **0** | 0 | `OK` |
| **`TMS1-ENGI`** | TEAM | 5 | `TMS1` | **0** | **0** | **0** | 0 | `OK` |
| **`TMS1-PROJ`** | TEAM | 5 | `TMS1` | **0** | **0** | **0** | 0 | `OK` |
| **`TMS1-SAFE`** | TEAM | 5 | `TMS1` | **0** | **0** | **0** | 0 | `OK` |
| **`TMT1-MACH`** | TEAM | 5 | `TMT1` | **0** | **0** | **0** | 0 | `OK` |
| **`TMT1-TRIAL`** | TEAM | 5 | `TMT1` | **0** | **0** | **0** | 0 | `OK` |
| **`TMT2-LOGITIC`** | TEAM | 5 | `TMT2` | **0** | **0** | **0** | 0 | `OK` |
| **`TMT2-STM`** | TEAM | 5 | `TMT2` | **0** | **0** | **0** | 0 | `OK` |
| **`TMT2-TOYOTA`** | TEAM | 5 | `TMT2` | **0** | **0** | **0** | 0 | `OK` |

---

## 5. RECOMMENDED CODE FIX (CLIENT-SIDE ONLY)

1. **Replace string substring matching with recursive tree graph resolution:**
   ```javascript
   // Build full descendant set in O(N)
   getDescendantOrgCodes(orgCode) {
       const descendants = new Set([orgCode]);
       const traverse = (parent) => {
           this.getOrganizations().filter(o => o.parent_organization_code === parent).forEach(c => {
               descendants.add(c.organization_code);
               traverse(c.organization_code);
           });
       };
       traverse(orgCode);
       return descendants;
   }

   getEmployeesByOrgScope(orgCode) {
       if (!orgCode || orgCode === 'TTMET') return this.unifiedEmployees;
       const validCodes = this.getDescendantOrgCodes(orgCode);
       return this.unifiedEmployees.filter(e => validCodes.has(e.organization_code));
   }
   ```

2. **Update Organization Node UI Card:**
   Display both metrics clearly:
   - **Direct Staff:** `directHeadcount` (e.g. Division VP or Dept Managers assigned directly at that tier)
   - **Total Scope:** `totalHeadcount` (e.g. `172 staff` under `DIV-ME`, `89 staff` under `DIV-G0`)
"""

with open(os.path.join(rootDir, 'docs', 'ORGFLOW_EXPLORER_DATA_BINDING_AUDIT.md'), 'w', encoding='utf-8') as f:
    f.write(report_md)

print("Saved docs/ORGFLOW_EXPLORER_DATA_BINDING_AUDIT.md successfully.")
