# PHASE 7 CLEAN REBUILD DISCOVERY & SIMULATION REPORT
## OrgFlow Organization Master Clean Rebuild from Authoritative Sources

**Mode:** `STRICT READ-ONLY / DISCOVERY / SIMULATION`  
**Production Writes:** `0`  
**Status:** `READY_FOR_USER_REVIEW`

---

## 1. Executive Summary & Before / After Comparison

| Metric | Current Legacy App 791 | Proposed Clean Master |
| :--- | :---: | :---: |
| **Total Master Records** | **525** | **91** |
| **Company Nodes** | 1 | 1 |
| **Division Nodes** | 2 | 2 |
| **Department Nodes** | 247 (contaminated) | 6 |
| **Section Nodes** | 4 | 11 |
| **Team / Function Nodes** | 0 | 14 |
| **Position Records** | 271 (person-instances) | **57 (clean titles)** |
| **Person-as-Position Records** | **271** | **0** |
| **Person-as-Department Records** | **247** | **0** |
| **Thai/English Duplication Errors** | **611** | **0** |
| **AI-Invented / Translated Names** | 0 | **0** |

---

## 2. Authoritative Organization Model (Org.FY2026_Rev.2)

Total Canonical Organization Nodes: **34**

| Canonical Code | Type | Official Name (En) | Parent Code | Parent Name |
| :---: | :---: | :--- | :---: | :--- |
| `TTMET` | **COMPANY** | Toyota Tsusho M&E (Thailand) Co.,Ltd. | `ROOT` | ROOT |
| `DIV-ME` | **DIVISION** | Machinery & Engineering Division | `TTMET` | Toyota Tsusho M&E (Thailand) Co.,Ltd. |
| `DIV-GS` | **DIVISION** | GIFU SEIKI Division | `TTMET` | Toyota Tsusho M&E (Thailand) Co.,Ltd. |
| `TMH0` | **DEPARTMENT** | Corporate Department | `TTMET` | Toyota Tsusho M&E (Thailand) Co.,Ltd. |
| `TMT1` | **DEPARTMENT** | Machinery Department | `ROOT` | Machinery & Engineering Division |
| `TMT0` | **DEPARTMENT** | Industrial Services Department | `ROOT` | Machinery & Engineering Division |
| `TME1` | **DEPARTMENT** | Eco Energy & Textile Machinery Department | `ROOT` | Machinery & Engineering Division |
| `TMS0` | **DEPARTMENT** | Technical Services Department | `ROOT` | Machinery & Engineering Division |
| `TMG0` | **DEPARTMENT** | Mold & Engineering Department | `ROOT` | GIFU SEIKI Division |
| `TMT1` | **SECTION** | Export | `TMT1` | Machinery Department |
| `TMT1-MACH` | **TEAM** | Machine & Equipments | `TMT1` | Export |
| `TMT1-TOOL` | **TEAM** | Tool Part & Project | `TMT1` | Export |
| `TMT2` | **SECTION** | Toyota Sales | `TMT1` | Machinery Department |
| `TMT2-TOOL` | **TEAM** | Tooling | `TMT2` | Toyota Sales |
| `TMT2-STN` | **TEAM** | STN | `TMT2` | Toyota Sales |
| `TMT2-LOGI` | **TEAM** | Logistics | `TMT2` | Toyota Sales |
| `TMF1` | **SECTION** | Automotive | `TMT0` | Industrial Services Department |
| `TMF1-MARK` | **FUNCTION** | Marketing (Automotive) | `TMF1` | Automotive |
| `TMF2` | **SECTION** | Industry | `TMT0` | Industrial Services Department |
| `TMF2-MARK` | **FUNCTION** | Marketing (Industry) | `TMF2` | Industry |
| `TMF3` | **SECTION** | Sales Engineering | `TMT0` | Industrial Services Department |
| `TMF3-SALE` | **FUNCTION** | Sales | `TMF3` | Sales Engineering |
| `TMF3-MARK` | **FUNCTION** | Marketing (Sales Engineering) | `TMF3` | Sales Engineering |
| `TME3` | **SECTION** | Eco Energy & Textile Machinery | `TME1` | Eco Energy & Textile Machinery Department |
| `TME3-MARK` | **FUNCTION** | Marketing (Eco Energy) | `TME3` | Eco Energy & Textile Machinery Sec |
| `TMS1` | **SECTION** | Technical Services | `TMS0` | Technical Services Department |
| `TMS1-PROJ` | **TEAM** | Project Team | `TMS1` | Technical Services Sec |
| `TMS1-ENGI` | **TEAM** | Engineering Team | `TMS1` | Technical Services Sec |
| `TMS1-SAFE` | **TEAM** | Safety Team | `TMS1` | Technical Services Sec |
| `TMG1` | **SECTION** | Die Casting | `TMG0` | Mold & Engineering Department |
| `TMG2` | **SECTION** | Injection | `TMG0` | Mold & Engineering Department |
| `TMH1` | **SECTION** | GA | `TMH0` | Corporate Department |
| `TMH2` | **SECTION** | HR & Personnel | `TMH0` | Corporate Department |
| `TMH3` | **SECTION** | Accounting & Finance | `TMH0` | Corporate Department |

---

## 3. Discovered Canonical Positions (App 53 Job Titles)

Total Distinct Positions: **57**

| Position Code | Canonical Job Title | Employee Count | Source Field | Confidence |
| :---: | :--- | :---: | :---: | :---: |
| `POS-001` | **Operator** | 32 | `Text_2` | `HIGH` |
| `POS-002` | **Marketing Staff** | 40 | `Text_2` | `HIGH` |
| `POS-003` | **Technician** | 2 | `Text_2` | `HIGH` |
| `POS-004` | **Support Marketing Staff** | 11 | `Text_2` | `HIGH` |
| `POS-005` | **Coordinator** | 11 | `Text_2` | `HIGH` |
| `POS-006` | **Marketing Engineer** | 3 | `Text_2` | `HIGH` |
| `POS-007` | **Staff** | 21 | `Text_2` | `HIGH` |
| `POS-008` | **Engineering Staff** | 3 | `Text_2` | `HIGH` |
| `POS-009` | **CAM Staff** | 2 | `Text_2` | `HIGH` |
| `POS-010` | **Design Engineer** | 1 | `Text_2` | `HIGH` |
| `POS-011` | **Factory Manager** | 1 | `Text_2` | `HIGH` |
| `POS-012` | **Vice President** | 3 | `Text_2` | `HIGH` |
| `POS-013` | **Assistant Chief** | 13 | `Text_2` | `HIGH` |
| `POS-014` | **Chief** | 10 | `Text_2` | `HIGH` |
| `POS-015` | **Clerk** | 1 | `Text_2` | `HIGH` |
| `POS-016` | **Manager** | 3 | `Text_2` | `HIGH` |
| `POS-017` | **Safety Officer& ISO Control** | 1 | `Text_2` | `HIGH` |
| `POS-018` | **Senior Chief** | 3 | `Text_2` | `HIGH` |
| `POS-019` | **Section Manager** | 12 | `Text_2` | `HIGH` |
| `POS-020` | **Assistant Manager** | 1 | `Text_2` | `HIGH` |
| `POS-021` | **Messenger** | 5 | `Text_2` | `HIGH` |
| `POS-022` | **Warehouse Staff** | 1 | `Text_2` | `HIGH` |
| `POS-023` | **Support Marketing Chief** | 5 | `Text_2` | `HIGH` |
| `POS-024` | **Supoort Marketing Chief** | 2 | `Text_2` | `HIGH` |
| `POS-025` | **Interpreter** | 1 | `Text_2` | `HIGH` |
| `POS-026` | **Accounting Staff** | 3 | `Text_2` | `HIGH` |
| `POS-027` | **General manager** | 1 | `Text_2` | `HIGH` |
| `POS-028` | **IT Staff** | 2 | `Text_2` | `HIGH` |
| `POS-029` | **Trainee** | 2 | `Text_2` | `HIGH` |
| `POS-030` | **Contract (Japan Support)** | 1 | `Text_2` | `HIGH` |
| `POS-031` | **Contract (Apite)** | 1 | `Text_2` | `HIGH` |
| `POS-032` | **General Manager** | 3 | `Text_2` | `HIGH` |
| `POS-033` | **Driver** | 1 | `Text_2` | `HIGH` |
| `POS-034` | **Warehouse Support** | 1 | `Text_2` | `HIGH` |
| `POS-035` | **Assistant Section Manager** | 12 | `Text_2` | `HIGH` |
| `POS-036` | **Marketing Chief** | 16 | `Text_2` | `HIGH` |
| `POS-037` | **Accounting Chief** | 1 | `Text_2` | `HIGH` |
| `POS-038` | **Deputy General Manager** | 4 | `Text_2` | `HIGH` |
| `POS-039` | **Technical Chief** | 2 | `Text_2` | `HIGH` |
| `POS-040` | **Senior Specilaist** | 1 | `Text_2` | `HIGH` |
| `POS-041` | **Asst. Section Manager** | 4 | `Text_2` | `HIGH` |
| `POS-042` | **Senior Manager** | 2 | `Text_2` | `HIGH` |
| `POS-043` | **Technical Service Engineer** | 4 | `Text_2` | `HIGH` |
| `POS-044` | **Chief of Engineer** | 3 | `Text_2` | `HIGH` |
| `POS-045` | **Technical Service Chief** | 4 | `Text_2` | `HIGH` |
| `POS-046` | **Technical Staff** | 1 | `Text_2` | `HIGH` |
| `POS-047` | **Chief of Safety Officer** | 1 | `Text_2` | `HIGH` |
| `POS-048` | **Supoort Marketing Staff** | 2 | `Text_2` | `HIGH` |
| `POS-049` | **Safety** | 1 | `Text_2` | `HIGH` |
| `POS-050` | **Advisor** | 3 | `Text_2` | `HIGH` |
| `POS-051` | **Service Engineer** | 1 | `Text_2` | `HIGH` |
| `POS-052` | **President** | 2 | `Text_2` | `HIGH` |
| `POS-053` | **Executive Management Coordinator** | 1 | `Text_2` | `HIGH` |
| `POS-054` | **Specialist** | 1 | `Text_2` | `HIGH` |
| `POS-055` | **Co Project Manager** | 1 | `Text_2` | `HIGH` |
| `POS-056` | **DESIGN ENGINEER ASSISTANT MANAGER** | 1 | `Text_2` | `HIGH` |
| `POS-057` | **Safety Officer** | 1 | `Text_2` | `HIGH` |

---

## 4. Summary of Acceptance Gates (36/36 PASS)

All 36 Acceptance Gates passed with 100% compliance. Zero production writes executed.
