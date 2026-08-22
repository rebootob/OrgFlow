# ORGFLOW PHASE 6B.3R — AUTHORITATIVE ORG RECONCILIATION REPORT

## 1. Executive Summary

- **PRIMARY AUTHORITATIVE SOURCE:** `Org.FY2026_Rev.2.pdf` (Official TTMET Organization Chart 2026)
- **STATUS:** **`READY_FOR_USER_ORG_STRUCTURE_REVIEW`**
- **CRITICAL CORRECTIONS EXECUTED:**
  - **Machinery Department Code:** Corrected to **`TMT1`** (Previously misclassified as TM10)
  - **Industrial Services Department Code:** Corrected to **`TMT0`** (Previously misclassified as TM70)
  - **Technical Services Department Code:** Corrected to **`TMS0`** (Previously misclassified as TM50)
  - **Corporate Department Code:** Corrected to **`TMH0`** (Previously misclassified as TM90)
  - **Synthetic Division Codes (DIV-ME, DIV-GS):** Set to **`NULL`** (`CODE_NOT_PRESENT_IN_ORG_CHART`) pending explicit user decision.
- **ORGANIZATION VS FUNCTION SEPARATION:** Non-organization function/team boxes (Admin, CAD, Marketing, Project Team, etc.) extracted and categorized in a separate table.
- **PRODUCTION WRITES EXECUTED:** **0 WRITES (100% READ-ONLY RECONCILIATION)**

---

## 2. Complete Organization Master Candidate Table (Confirmed Org Units)

| Row | Official Organization Name | Official Code | Parent Name | Observed Level | Proposed Entity Type | Include in Org Master? | Code Status | User Review Required? |
| :---: | :--- | :---: | :--- | :---: | :---: | :---: | :---: | :---: |
| **1** | "Toyota Tsusho M&E (Thailand) Co.,Ltd." | `TTMET` | "ROOT" | Level 0 | `COMPANY` | `YES` | `OFFICIAL` | **`NO`** |
| **2** | "Machinery & Engineering Division" | `NULL` | "Toyota Tsusho M&E (Thailand) Co.,Ltd." | Level 1 | `DIVISION` | `YES` | `CODE_NOT_PRESENT_IN_ORG_CHART` | **`YES`** |
| **3** | "GIFU SEIKI Division" | `NULL` | "Toyota Tsusho M&E (Thailand) Co.,Ltd." | Level 1 | `DIVISION` | `YES` | `CODE_NOT_PRESENT_IN_ORG_CHART` | **`YES`** |
| **4** | "Corporate Department" | `TMH0` | "Toyota Tsusho M&E (Thailand) Co.,Ltd." | Level 1 | `DEPARTMENT` | `YES` | `OFFICIAL` | **`NO`** |
| **5** | "Machinery Department" | `TMT1` | "Machinery & Engineering Division" | Level 2 | `DEPARTMENT` | `YES` | `OFFICIAL` | **`NO`** |
| **6** | "Industrial Services Department" | `TMT0` | "Machinery & Engineering Division" | Level 2 | `DEPARTMENT` | `YES` | `OFFICIAL` | **`NO`** |
| **7** | "Eco Energy & Textile Machinery Department" | `TME1` | "Machinery & Engineering Division" | Level 2 | `DEPARTMENT` | `YES` | `OFFICIAL` | **`NO`** |
| **8** | "Technical Services Department" | `TMS0` | "Machinery & Engineering Division" | Level 2 | `DEPARTMENT` | `YES` | `OFFICIAL` | **`NO`** |
| **9** | "Mold & Engineering Department" | `TMG0` | "GIFU SEIKI Division" | Level 2 | `DEPARTMENT` | `YES` | `OFFICIAL` | **`NO`** |
| **10** | "Export" | `TMT1` | "Machinery Department" | Level 3 | `SECTION` | `YES` | `OFFICIAL` | **`NO`** |
| **11** | "Toyota Sales" | `TMT2` | "Machinery Department" | Level 3 | `SECTION` | `YES` | `OFFICIAL` | **`NO`** |
| **12** | "Automotive" | `TMF1` | "Industrial Services Department" | Level 3 | `SECTION` | `YES` | `OFFICIAL` | **`NO`** |
| **13** | "Industry" | `TMF2` | "Industrial Services Department" | Level 3 | `SECTION` | `YES` | `OFFICIAL` | **`NO`** |
| **14** | "Sales Engineering" | `TMF3` | "Industrial Services Department" | Level 3 | `SECTION` | `YES` | `OFFICIAL` | **`NO`** |
| **15** | "Eco Energy & Textile Machinery" | `TME1` | "Eco Energy & Textile Machinery Department" | Level 3 | `SECTION` | `YES` | `OFFICIAL` | **`NO`** |
| **16** | "Technical Services" | `TMS0` | "Technical Services Department" | Level 3 | `SECTION` | `YES` | `OFFICIAL` | **`NO`** |
| **17** | "Die Casting" | `TMG1` | "Mold & Engineering Department" | Level 3 | `SECTION` | `YES` | `OFFICIAL` | **`NO`** |
| **18** | "Injection" | `TMG2` | "Mold & Engineering Department" | Level 3 | `SECTION` | `YES` | `OFFICIAL` | **`NO`** |
| **19** | "GA" | `TM91` | "Corporate Department" | Level 2 | `SECTION` | `YES` | `OFFICIAL` | **`NO`** |
| **20** | "HR & Personnel" | `TM92` | "Corporate Department" | Level 2 | `SECTION` | `YES` | `OFFICIAL` | **`NO`** |
| **21** | "Accounting & Finance" | `TM93` | "Corporate Department" | Level 2 | `SECTION` | `YES` | `OFFICIAL` | **`NO`** |

---

## 3. Non-Organization Box Classification Table (Functions, Teams, Positions)

| Box Display Name | Parent Unit | Classification | Reason Excluded from Org Master | Recommended Storage | User Review Required? |
| :--- | :--- | :---: | :--- | :---: | :---: |
| "Machine & Equipments" | "Export (TMT1)" | `FUNCTION_REFERENCE` | Work responsibility / product grouping under Section Export | `FUNCTION_REFERENCE` | **`YES`** |
| "Tool Part & Project" | "Export (TMT1)" | `FUNCTION_REFERENCE` | Work responsibility / product grouping under Section Export | `FUNCTION_REFERENCE` | **`YES`** |
| "Tooling" | "Toyota Sales (TMT2)" | `FUNCTION_REFERENCE` | Product group under Section Toyota Sales | `FUNCTION_REFERENCE` | **`YES`** |
| "STN" | "Toyota Sales (TMT2)" | `FUNCTION_REFERENCE` | Product group under Section Toyota Sales | `FUNCTION_REFERENCE` | **`YES`** |
| "Logistics" | "Toyota Sales (TMT2)" | `FUNCTION_REFERENCE` | Function under Section Toyota Sales | `FUNCTION_REFERENCE` | **`YES`** |
| "Project Team" | "Technical Services (TMS0)" | `SUPPORT_GROUP` | Project / functional work team under TMS0 | `FUNCTION_REFERENCE` | **`YES`** |
| "Engineering Team" | "Technical Services (TMS0)" | `SUPPORT_GROUP` | Engineering work team under TMS0 | `FUNCTION_REFERENCE` | **`YES`** |
| "Safety Team" | "Technical Services (TMS0)" | `SUPPORT_GROUP` | Safety work team under TMS0 | `FUNCTION_REFERENCE` | **`YES`** |
| "Admin" | "Die Casting (TMG1)" | `FUNCTION_REFERENCE` | Functional task group under TMG1 | `FUNCTION_REFERENCE` | **`YES`** |
| "CAD" | "Die Casting (TMG1)" | `FUNCTION_REFERENCE` | Functional task group under TMG1 | `FUNCTION_REFERENCE` | **`YES`** |
| "Marketing" | "Die Casting (TMG1)" | `FUNCTION_REFERENCE` | Functional task group under TMG1 | `FUNCTION_REFERENCE` | **`YES`** |
| "Production" | "Die Casting (TMG1)" | `FUNCTION_REFERENCE` | Functional task group under TMG1 | `FUNCTION_REFERENCE` | **`YES`** |
| "Support Marketing" | "Various Sections" | `SUPPORT_FUNCTION` | Support function boxes (Green boxes 1, 2, 3, 4, 5, 6) | `NOT_REQUIRED` | **`YES`** |
| "Board of Directors" | "ROOT" | `GOVERNANCE_BODY` | Governance body above Executive level | `NOT_REQUIRED` | **`NO`** |
| "President" | "ROOT" | `POSITION` | Executive position held by Mr. Tsuchihira | `POSITION_MASTER` | **`NO`** |
| "Vice President" | "ROOT" | `POSITION` | Executive position held by Ms. Somrudee, Mr. Uchida, Mr. Takeshi Tsuchihira | `POSITION_MASTER` | **`NO`** |

---

## 4. Code Correction Matrix (Phase 6B.3 vs Authoritative PDF)

| Organization Unit | Previous Phase 6B.3 Code | Corrected Authoritative Code | Status | PDF Evidence |
| :--- | :---: | :---: | :---: | :--- |
| "Machinery Department" | `TM10 (AI Generated)` | **`TMT1`** | **`CORRECTED`** | Explicit code TMT1 on PDF box |
| "Industrial Services Department" | `TM70 (AI Generated)` | **`TMT0`** | **`CORRECTED`** | Explicit code TMT0 on PDF box |
| "Technical Services Department" | `TM50 (AI Generated)` | **`TMS0`** | **`CORRECTED`** | Explicit code TMS0 on PDF box |
| "Corporate Department" | `TM90 (AI Generated)` | **`TMH0`** | **`CORRECTED`** | Explicit code TMH0 on PDF box |
| "Machinery & Engineering Division" | `DIV-ME (Synthetic)` | **`NULL (User Decision Req.)`** | **`REJECTED_SYNTHETIC`** | No printed code on PDF box; code set to NULL |
| "GIFU SEIKI Division" | `DIV-GS (Synthetic)` | **`NULL (User Decision Req.)`** | **`REJECTED_SYNTHETIC`** | No printed code on PDF box; code set to NULL |

---

## 5. Items Requiring User Decision

| Decision ID | Decision Subject | Current State | Issue / Problem | Recommended Choice |
| :---: | :--- | :---: | :--- | :--- |
| **DEC-01** | Machinery & Engineering Division Code | `NULL` | No printed code on PDF box. | **`Approve synthetic code DIV-ME or leave parent relationship to TTMET.`** |
| **DEC-02** | GIFU SEIKI Division Code | `NULL` | No printed code on PDF box. | **`Approve synthetic code DIV-GS or leave parent relationship to TTMET.`** |
| **DEC-03** | Team & Function Boxes Inclusion | `N/A` | Boxes such as Machine & Equipments, Tool Part & Project, Project Team. | **`Exclude from Organization Master; store as Function / Team attributes in App 792.`** |

---

## 6. Production Safety Verification

```text
App 53 Writes:  0  (275 Records — 100% UNTOUCHED)
App 791 Writes: 0  (522 Records — 100% UNTOUCHED)
App 792 Writes: 0  (275 Records — 100% UNTOUCHED)
App 793 Writes: 0  (2 Records — 100% UNTOUCHED)
Other Apps:     0  (100% UNTOUCHED)
```
