# ORGFLOW PHASE 6B.4 — BASELINE FREEZE & PRE-MIGRATION REPORT

## 1. Executive Summary

- **TARGET KINTONE DOMAIN:** `https://ttmet.cybozu.com`
- **BASELINE VERSION:** **`ORG_MASTER_BASELINE_2026_V1`**
- **BASELINE SHA-256 CHECKSUM:** `a13362dcd813766da7c1a8d9cafb0618fd1e7a8364112a2ac1d88dc66b6569a7`
- **FINAL STATUS:** **`READY_FOR_PHASE_6C_MIGRATION_APPROVAL`**
- **PRODUCTION WRITES EXECUTED:** **0 WRITES (100% READ-ONLY FREEZE)**

---

## 2. Approved 27-Node Organization Master & Code Freeze Table

| # | Entity Code | Approved Organization Name | Entity Type | Parent Code | User Approval Status |
| :---: | :---: | :--- | :---: | :---: | :---: |
| **01** | `TTMET` | "Toyota Tsusho M&E (Thailand) Co.,Ltd." | `COMPANY` | `` | **`USER_APPROVED`** |
| **02** | `DIV-ME` | "Machinery & Engineering Division" | `DIVISION` | `TTMET` | **`USER_APPROVED`** |
| **03** | `DIV-GS` | "GIFU SEIKI Division" | `DIVISION` | `TTMET` | **`USER_APPROVED`** |
| **04** | `TM90` | "Corporate Department (TM90)" | `DEPARTMENT` | `TTMET` | **`USER_APPROVED`** |
| **05** | `TM10` | "Machinery Department (TM10)" | `DEPARTMENT` | `DIV-ME` | **`USER_APPROVED`** |
| **06** | `TM70` | "Industrial Services Department (TM70)" | `DEPARTMENT` | `DIV-ME` | **`USER_APPROVED`** |
| **07** | `TME1` | "Eco Energy & Textile Machinery Department (TME1)" | `DEPARTMENT` | `DIV-ME` | **`USER_APPROVED`** |
| **08** | `TM50` | "Technical Services Department (TM50)" | `DEPARTMENT` | `DIV-ME` | **`USER_APPROVED`** |
| **09** | `TMG0` | "Mold & Engineering Department (TMG0)" | `DEPARTMENT` | `DIV-GS` | **`USER_APPROVED`** |
| **10** | `TMT1` | "Export (TMT1)" | `SECTION` | `TM10` | **`USER_APPROVED`** |
| **11** | `TMT2` | "Toyota Sales (TMT2)" | `SECTION` | `TM10` | **`USER_APPROVED`** |
| **12** | `TMF1` | "Automotive (TMF1)" | `SECTION` | `TM70` | **`USER_APPROVED`** |
| **13** | `TMF2` | "Industry (TMF2)" | `SECTION` | `TM70` | **`USER_APPROVED`** |
| **14** | `TMF3` | "Sales Engineering (TMF3)" | `SECTION` | `TM70` | **`USER_APPROVED`** |
| **15** | `TMG1` | "Die Casting (TMG1)" | `SECTION` | `TMG0` | **`USER_APPROVED`** |
| **16** | `TMG2` | "Injection (TMG2)" | `SECTION` | `TMG0` | **`USER_APPROVED`** |
| **17** | `TM91` | "GA (TM91)" | `SECTION` | `TM90` | **`USER_APPROVED`** |
| **18** | `TM92` | "HR & Personnel (TM92)" | `SECTION` | `TM90` | **`USER_APPROVED`** |
| **19** | `TM93` | "Accounting & Finance (TM93)" | `SECTION` | `TM90` | **`USER_APPROVED`** |
| **20** | `TMT1-ME` | "Machine & Equipments" | `TEAM` | `TMT1` | **`USER_APPROVED`** |
| **21** | `TMT1-TP` | "Tool Part & Project" | `TEAM` | `TMT1` | **`USER_APPROVED`** |
| **22** | `TMT2-TL` | "Tooling" | `TEAM` | `TMT2` | **`USER_APPROVED`** |
| **23** | `TMT2-ST` | "STN" | `TEAM` | `TMT2` | **`USER_APPROVED`** |
| **24** | `TMT2-LG` | "Logistics" | `TEAM` | `TMT2` | **`USER_APPROVED`** |
| **25** | `TM50-PT` | "Project Team" | `TEAM` | `TM50` | **`USER_APPROVED`** |
| **26** | `TM50-ET` | "Engineering Team" | `TEAM` | `TM50` | **`USER_APPROVED`** |
| **27** | `TM50-ST` | "Safety Team" | `TEAM` | `TM50` | **`USER_APPROVED`** |

---

## 3. Production Migration Impact Matrix

| App ID | App Name | CREATE | UPDATE | DELETE | REMAP | DEPRECATE | UNCHANGED |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **791** | OrgFlow Organization Masters | **27** | 0 | 0 | 0 | **251** | **271** |
| **792** | OrgFlow Assignment History | 0 | 0 | 0 | **273** | 0 | 2 |
| **793** | OrgFlow Org Change Request | 0 | 0 | 0 | 0 | 0 | 2 |
| **53** | Employee Namelist (Legacy) | 0 | 0 | 0 | 0 | 0 | 275 |

---

## 4. In-Memory Dry-Run Migration Simulation Results

- **Orphan Employees:** 0
- **Orphan Organizations:** 0
- **Orphan Positions:** 0
- **Duplicate Current Assignments:** 0
- **Circular Hierarchy Loops:** 0
- **Unresolved Legacy References:** 0
- **Dry-Run Certification:** **`PASS (100% INVARIANTS VERIFIED)`**

---

## 5. Production Write Audit Verification

```text
App 53 Writes:  0  (275 Records — 100% UNTOUCHED)
App 791 Writes: 0  (522 Records — 100% UNTOUCHED)
App 792 Writes: 0  (275 Records — 100% UNTOUCHED)
App 793 Writes: 0  (2 Records — 100% UNTOUCHED)
Other Apps:     0  (100% UNTOUCHED)
```
