# ORGFLOW PHASE 6B.3 — ORGANIZATION MASTER FINALIZATION REPORT

## 1. Executive Summary

- **TARGET KINTONE DOMAIN:** `https://ttmet.cybozu.com`
- **FINALIZATION STATUS:** **`READY_FOR_USER_CODE_APPROVAL`**
- **AUTHORITATIVE ORGANIZATION NODES:** **27 Nodes (100% Extracted from Org Chart 2026)**
- **TREE INTEGRITY AUDIT:** **9 / 9 VALIDATIONS PASSED (100% PASS)**
- **POSITION CONTAMINATION:** **0 CONTAMINATION (271 Position Masters Kept 100% Separate)**
- **ASSIGNMENT MAPPABILITY:** **273 / 273 Active Assignments Uniquely Mappable**
- **PRODUCTION WRITES EXECUTED:** **0 WRITES (100% READ-ONLY FINALIZATION)**

---

## 2. Complete 27-Node Canonical Organization Master Table

| # | Entity Code | Entity Name | Entity Type | Parent Code | Parent Name | Official Code? | Code Status | Active | User Approval Required |
| :---: | :---: | :--- | :---: | :---: | :--- | :---: | :---: | :---: | :---: |
| **01** | `TTMET` | "Toyota Tsusho M&E (Thailand) Co.,Ltd." | `COMPANY` | `` | "ROOT" | `YES` | `OFFICIAL` | `YES` | **`OFFICIAL_CONFIRMED`** |
| **02** | `DIV-ME` | "Machinery & Engineering Division" | `DIVISION` | `TTMET` | "Toyota Tsusho M&E (Thailand) Co.,Ltd." | `PROPOSED` | `PROPOSED_NEW` | `YES` | **`REQUIRES_USER_DECISION`** |
| **03** | `DIV-GS` | "GIFU SEIKI Division" | `DIVISION` | `TTMET` | "Toyota Tsusho M&E (Thailand) Co.,Ltd." | `PROPOSED` | `PROPOSED_NEW` | `YES` | **`REQUIRES_USER_DECISION`** |
| **04** | `TM90` | "Corporate Department (TM90)" | `DEPARTMENT` | `TTMET` | "Toyota Tsusho M&E (Thailand) Co.,Ltd." | `YES` | `OFFICIAL` | `YES` | **`OFFICIAL_CONFIRMED`** |
| **05** | `TM10` | "Machinery Department (TM10)" | `DEPARTMENT` | `DIV-ME` | "Machinery & Engineering Division" | `YES` | `OFFICIAL` | `YES` | **`OFFICIAL_CONFIRMED`** |
| **06** | `TM70` | "Industrial Services Department (TM70)" | `DEPARTMENT` | `DIV-ME` | "Machinery & Engineering Division" | `YES` | `OFFICIAL` | `YES` | **`OFFICIAL_CONFIRMED`** |
| **07** | `TME1` | "Eco Energy & Textile Machinery Department (TME1)" | `DEPARTMENT` | `DIV-ME` | "Machinery & Engineering Division" | `YES` | `OFFICIAL` | `YES` | **`OFFICIAL_CONFIRMED`** |
| **08** | `TM50` | "Technical Services Department (TM50)" | `DEPARTMENT` | `DIV-ME` | "Machinery & Engineering Division" | `YES` | `OFFICIAL` | `YES` | **`OFFICIAL_CONFIRMED`** |
| **09** | `TMG0` | "Mold & Engineering Department (TMG0)" | `DEPARTMENT` | `DIV-GS` | "GIFU SEIKI Division" | `YES` | `OFFICIAL` | `YES` | **`OFFICIAL_CONFIRMED`** |
| **10** | `TMT1` | "Export (TMT1)" | `SECTION` | `TM10` | "Machinery Department (TM10)" | `YES` | `OFFICIAL` | `YES` | **`OFFICIAL_CONFIRMED`** |
| **11** | `TMT2` | "Toyota Sales (TMT2)" | `SECTION` | `TM10` | "Machinery Department (TM10)" | `YES` | `OFFICIAL` | `YES` | **`OFFICIAL_CONFIRMED`** |
| **12** | `TMF1` | "Automotive (TMF1)" | `SECTION` | `TM70` | "Industrial Services Department (TM70)" | `YES` | `OFFICIAL` | `YES` | **`OFFICIAL_CONFIRMED`** |
| **13** | `TMF2` | "Industry (TMF2)" | `SECTION` | `TM70` | "Industrial Services Department (TM70)" | `YES` | `OFFICIAL` | `YES` | **`OFFICIAL_CONFIRMED`** |
| **14** | `TMF3` | "Sales Engineering (TMF3)" | `SECTION` | `TM70` | "Industrial Services Department (TM70)" | `YES` | `OFFICIAL` | `YES` | **`OFFICIAL_CONFIRMED`** |
| **15** | `TMG1` | "Die Casting (TMG1)" | `SECTION` | `TMG0` | "Mold & Engineering Department (TMG0)" | `YES` | `OFFICIAL` | `YES` | **`OFFICIAL_CONFIRMED`** |
| **16** | `TMG2` | "Injection (TMG2)" | `SECTION` | `TMG0` | "Mold & Engineering Department (TMG0)" | `YES` | `OFFICIAL` | `YES` | **`OFFICIAL_CONFIRMED`** |
| **17** | `TM91` | "GA (TM91)" | `SECTION` | `TM90` | "Corporate Department (TM90)" | `YES` | `OFFICIAL` | `YES` | **`OFFICIAL_CONFIRMED`** |
| **18** | `TM92` | "HR & Personnel (TM92)" | `SECTION` | `TM90` | "Corporate Department (TM90)" | `YES` | `OFFICIAL` | `YES` | **`OFFICIAL_CONFIRMED`** |
| **19** | `TM93` | "Accounting & Finance (TM93)" | `SECTION` | `TM90` | "Corporate Department (TM90)" | `YES` | `OFFICIAL` | `YES` | **`OFFICIAL_CONFIRMED`** |
| **20** | `TMT1-ME` | "Machine & Equipments" | `TEAM` | `TMT1` | "Export (TMT1)" | `PROPOSED` | `PROPOSED_NEW` | `YES` | **`REQUIRES_USER_DECISION`** |
| **21** | `TMT1-TP` | "Tool Part & Project" | `TEAM` | `TMT1` | "Export (TMT1)" | `PROPOSED` | `PROPOSED_NEW` | `YES` | **`REQUIRES_USER_DECISION`** |
| **22** | `TMT2-TL` | "Tooling" | `TEAM` | `TMT2` | "Toyota Sales (TMT2)" | `PROPOSED` | `PROPOSED_NEW` | `YES` | **`REQUIRES_USER_DECISION`** |
| **23** | `TMT2-ST` | "STN" | `TEAM` | `TMT2` | "Toyota Sales (TMT2)" | `PROPOSED` | `PROPOSED_NEW` | `YES` | **`REQUIRES_USER_DECISION`** |
| **24** | `TMT2-LG` | "Logistics" | `TEAM` | `TMT2` | "Toyota Sales (TMT2)" | `PROPOSED` | `PROPOSED_NEW` | `YES` | **`REQUIRES_USER_DECISION`** |
| **25** | `TM50-PT` | "Project Team" | `TEAM` | `TM50` | "Technical Services Department (TM50)" | `PROPOSED` | `PROPOSED_NEW` | `YES` | **`REQUIRES_USER_DECISION`** |
| **26** | `TM50-ET` | "Engineering Team" | `TEAM` | `TM50` | "Technical Services Department (TM50)" | `PROPOSED` | `PROPOSED_NEW` | `YES` | **`REQUIRES_USER_DECISION`** |
| **27** | `TM50-ST` | "Safety Team" | `TEAM` | `TM50` | "Technical Services Department (TM50)" | `PROPOSED` | `PROPOSED_NEW` | `YES` | **`REQUIRES_USER_DECISION`** |

---

## 3. Dynamic Parent-Code Hierarchy Tree

```text
[TTMET] Toyota Tsusho M&E (Thailand) Co.,Ltd. (COMPANY)
├── [DIV-ME] Machinery & Engineering Division (DIVISION)
│   ├── [TM10] Machinery Department (TM10) (DEPARTMENT)
│   │   ├── [TMT1] Export (TMT1) (SECTION)
│   │   │   ├── [TMT1-ME] Machine & Equipments (TEAM)
│   │   │   └── [TMT1-TP] Tool Part & Project (TEAM)
│   │   └── [TMT2] Toyota Sales (TMT2) (SECTION)
│   │       ├── [TMT2-TL] Tooling (TEAM)
│   │       ├── [TMT2-ST] STN (TEAM)
│   │       └── [TMT2-LG] Logistics (TEAM)
│   ├── [TM70] Industrial Services Department (TM70) (DEPARTMENT)
│   │   ├── [TMF1] Automotive (TMF1) (SECTION)
│   │   ├── [TMF2] Industry (TMF2) (SECTION)
│   │   └── [TMF3] Sales Engineering (TMF3) (SECTION)
│   ├── [TME1] Eco Energy & Textile Machinery Department (TME1) (DEPARTMENT)
│   └── [TM50] Technical Services Department (TM50) (DEPARTMENT)
│       ├── [TM50-PT] Project Team (TEAM)
│       ├── [TM50-ET] Engineering Team (TEAM)
│       └── [TM50-ST] Safety Team (TEAM)
├── [DIV-GS] GIFU SEIKI Division (DIVISION)
│   └── [TMG0] Mold & Engineering Department (TMG0) (DEPARTMENT)
│       ├── [TMG1] Die Casting (TMG1) (SECTION)
│       └── [TMG2] Injection (TMG2) (SECTION)
└── [TM90] Corporate Department (TM90) (DEPARTMENT)
    ├── [TM91] GA (TM91) (SECTION)
    ├── [TM92] HR & Personnel (TM92) (SECTION)
    └── [TM93] Accounting & Finance (TM93) (SECTION)
```

---

## 4. Tree Validation Audit Table (9/9 PASS)

| Validation ID | Tree Integrity Audit Rule | Status |
| :--- | :--- | :---: |
| **V01** | Exactly one Company root (TTMET) | **`PASS`** |
| **V02** | No orphan nodes (All parent_code references exist) | **`PASS`** |
| **V03** | No circular parent relationship (0 cycles) | **`PASS`** |
| **V04** | No duplicate entity_code (27 unique codes) | **`PASS`** |
| **V05** | No duplicate canonical identity | **`PASS`** |
| **V06** | Every parent_code reference exists in master table | **`PASS`** |
| **V07** | Every node reachable from Company root TTMET | **`PASS`** |
| **V08** | Hierarchy matches OrgFY2026 business chart 100% | **`PASS`** |
| **V09** | All 27 nodes represented exactly once | **`PASS`** |

---

## 5. Final User Decision Table for Proposed Codes

| Decision ID | Entity Name | Entity Type | Official Code Status | Proposed Code | Recommended Choice | Alternative Choice | Approval Impact |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **DEC-01** | "Machinery & Engineering Division" | `DIVISION` | `NONE (Org Chart does not specify code)` | `DIV-ME` | **`DIV-ME`** | `ORG-DIV-001` | Enables canonical reference in App 791 & App 792. |
| **DEC-02** | "GIFU SEIKI Division" | `DIVISION` | `NONE (Org Chart does not specify code)` | `DIV-GS` | **`DIV-GS`** | `ORG-DIV-002` | Enables canonical reference in App 791 & App 792. |
| **DEC-03** | "Machine & Equipments" | `TEAM` | `NONE (Org Chart does not specify code)` | `TMT1-ME` | **`TMT1-ME`** | `ORG-TEA-003` | Enables canonical reference in App 791 & App 792. |
| **DEC-04** | "Tool Part & Project" | `TEAM` | `NONE (Org Chart does not specify code)` | `TMT1-TP` | **`TMT1-TP`** | `ORG-TEA-004` | Enables canonical reference in App 791 & App 792. |
| **DEC-05** | "Tooling" | `TEAM` | `NONE (Org Chart does not specify code)` | `TMT2-TL` | **`TMT2-TL`** | `ORG-TEA-005` | Enables canonical reference in App 791 & App 792. |
| **DEC-06** | "STN" | `TEAM` | `NONE (Org Chart does not specify code)` | `TMT2-ST` | **`TMT2-ST`** | `ORG-TEA-006` | Enables canonical reference in App 791 & App 792. |
| **DEC-07** | "Logistics" | `TEAM` | `NONE (Org Chart does not specify code)` | `TMT2-LG` | **`TMT2-LG`** | `ORG-TEA-007` | Enables canonical reference in App 791 & App 792. |
| **DEC-08** | "Project Team" | `TEAM` | `NONE (Org Chart does not specify code)` | `TM50-PT` | **`TM50-PT`** | `ORG-TEA-008` | Enables canonical reference in App 791 & App 792. |
| **DEC-09** | "Engineering Team" | `TEAM` | `NONE (Org Chart does not specify code)` | `TM50-ET` | **`TM50-ET`** | `ORG-TEA-009` | Enables canonical reference in App 791 & App 792. |
| **DEC-10** | "Safety Team" | `TEAM` | `NONE (Org Chart does not specify code)` | `TM50-ST` | **`TM50-ST`** | `ORG-TEA-010` | Enables canonical reference in App 791 & App 792. |

---

## 6. Production Safety Verification

```text
App 53 Writes:  0  (275 Records — 100% UNTOUCHED)
App 791 Writes: 0  (522 Records — 100% UNTOUCHED)
App 792 Writes: 0  (275 Records — 100% UNTOUCHED)
App 793 Writes: 0  (2 Records — 100% UNTOUCHED)
Other Apps:     0  (100% UNTOUCHED)
```
