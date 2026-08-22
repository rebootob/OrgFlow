# ORGFLOW PHASE 6B.3R2 — AUTHORITATIVE RECONCILIATION REPORT

## 1. Executive Summary

- **AUTHORITATIVE REFERENCE:** TTMET FY2026 Organization Chart (`Org.FY2026_Rev.2.pdf`)
- **STATUS:** **`READY_FOR_USER_ORG_TREE_REVIEW`**
- **PRODUCTION WRITES EXECUTED:** **0 WRITES (100% READ-ONLY AUDIT)**
- **KEY STRUCTURAL REALIGNMENTS:**
  - **Corporate Department (`TMH0`):** Placed at Level 1 reporting directly to Company root `TTMET`.
  - **Section Eco Energy & Textile Machinery:** Official code **`TME3`** (Department code `TME1`).
  - **Section Technical Services:** Official code **`TMS1`** (Department code `TMS0`).
  - **Corporate Sections:** **`TMH1`** (GA), **`TMH2`** (HR & Personnel), **`TMH3`** (Accounting & Finance).
  - **Division Codes:** Set to **`NULL`** (`CODE_NOT_PRESENT_IN_ORG_CHART`) pending explicit user decision.

---

## 2. Official Org Chart vs Current App 791 Comparison Table

| Official Org Chart Name | Official Code | Official Parent | Entity Type | Current App 791 Name | Current Code | Correct Code | Current Parent | Correct Parent | Action Required |
| :--- | :---: | :--- | :---: | :--- | :---: | :---: | :---: | :---: | :---: |
| "Toyota Tsusho M&E (Thailand) Co.,Ltd." | `TTMET` | "ROOT" | `COMPANY` | "N/A (Missing in App 791)" | `N/A` | **`TTMET`** | `N/A` | **`NULL`** | **`CREATE`** |
| "Machinery & Engineering Division" | `NULL` | "Toyota Tsusho M&E (Thailand) Co.,Ltd." | `DIVISION` | "N/A (Missing in App 791)" | `N/A` | **`NULL`** | `N/A` | **`TTMET`** | **`CREATE`** |
| "GIFU SEIKI Division" | `NULL` | "Toyota Tsusho M&E (Thailand) Co.,Ltd." | `DIVISION` | "N/A (Missing in App 791)" | `N/A` | **`NULL`** | `N/A` | **`TTMET`** | **`CREATE`** |
| "Corporate Department" | `TMH0` | "Toyota Tsusho M&E (Thailand) Co.,Ltd." | `DEPARTMENT` | "N/A (Missing in App 791)" | `N/A` | **`TMH0`** | `N/A` | **`TTMET`** | **`CREATE`** |
| "Machinery Department" | `TMT1` | "Machinery & Engineering Division" | `DEPARTMENT` | "N/A (Missing in App 791)" | `N/A` | **`TMT1`** | `N/A` | **`NULL`** | **`CREATE`** |
| "Industrial Services Department" | `TMT0` | "Machinery & Engineering Division" | `DEPARTMENT` | "N/A (Missing in App 791)" | `N/A` | **`TMT0`** | `N/A` | **`NULL`** | **`CREATE`** |
| "Eco Energy & Textile Machinery Department" | `TME1` | "Machinery & Engineering Division" | `DEPARTMENT` | "N/A (Missing in App 791)" | `N/A` | **`TME1`** | `N/A` | **`NULL`** | **`CREATE`** |
| "Technical Services Department" | `TMS0` | "Machinery & Engineering Division" | `DEPARTMENT` | "N/A (Missing in App 791)" | `N/A` | **`TMS0`** | `N/A` | **`NULL`** | **`CREATE`** |
| "Mold & Engineering Department" | `TMG0` | "GIFU SEIKI Division" | `DEPARTMENT` | "N/A (Missing in App 791)" | `N/A` | **`TMG0`** | `N/A` | **`NULL`** | **`CREATE`** |
| "Export" | `TMT1` | "Machinery Department" | `SECTION` | "N/A (Missing in App 791)" | `N/A` | **`TMT1`** | `N/A` | **`TMT1`** | **`CREATE`** |
| "Toyota Sales" | `TMT2` | "Machinery Department" | `SECTION` | "N/A (Missing in App 791)" | `N/A` | **`TMT2`** | `N/A` | **`TMT1`** | **`CREATE`** |
| "Automotive" | `TMF1` | "Industrial Services Department" | `SECTION` | "N/A (Missing in App 791)" | `N/A` | **`TMF1`** | `N/A` | **`TMT0`** | **`CREATE`** |
| "Industry" | `TMF2` | "Industrial Services Department" | `SECTION` | "N/A (Missing in App 791)" | `N/A` | **`TMF2`** | `N/A` | **`TMT0`** | **`CREATE`** |
| "Sales Engineering" | `TMF3` | "Industrial Services Department" | `SECTION` | "N/A (Missing in App 791)" | `N/A` | **`TMF3`** | `N/A` | **`TMT0`** | **`CREATE`** |
| "Eco Energy & Textile Machinery" | `TME3` | "Eco Energy & Textile Machinery Department" | `SECTION` | "N/A (Missing in App 791)" | `N/A` | **`TME3`** | `N/A` | **`TME1`** | **`CREATE`** |
| "Technical Services" | `TMS1` | "Technical Services Department" | `SECTION` | "N/A (Missing in App 791)" | `N/A` | **`TMS1`** | `N/A` | **`TMS0`** | **`CREATE`** |
| "Die Casting" | `TMG1` | "Mold & Engineering Department" | `SECTION` | "N/A (Missing in App 791)" | `N/A` | **`TMG1`** | `N/A` | **`TMG0`** | **`CREATE`** |
| "Injection" | `TMG2` | "Mold & Engineering Department" | `SECTION` | "N/A (Missing in App 791)" | `N/A` | **`TMG2`** | `N/A` | **`TMG0`** | **`CREATE`** |
| "GA" | `TMH1` | "Corporate Department" | `SECTION` | "N/A (Missing in App 791)" | `N/A` | **`TMH1`** | `N/A` | **`TMH0`** | **`CREATE`** |
| "HR & Personnel" | `TMH2` | "Corporate Department" | `SECTION` | "N/A (Missing in App 791)" | `N/A` | **`TMH2`** | `N/A` | **`TMH0`** | **`CREATE`** |
| "Accounting & Finance" | `TMH3` | "Corporate Department" | `SECTION` | "N/A (Missing in App 791)" | `N/A` | **`TMH3`** | `N/A` | **`TMH0`** | **`CREATE`** |

---

## 3. Production Write Audit Verification

```text
App 53 Writes:  0  (275 Records — 100% UNTOUCHED)
App 791 Writes: 0  (522 Records — 100% UNTOUCHED)
App 792 Writes: 0  (275 Records — 100% UNTOUCHED)
App 793 Writes: 0  (2 Records — 100% UNTOUCHED)
Other Apps:     0  (100% UNTOUCHED)
```
