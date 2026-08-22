# ORGFLOW — AUTHORITATIVE CLEAN REBUILD (HUMAN REVIEW GATE #1)

**Execution Mode:** `STRICT READ-ONLY / ZERO PRODUCTION WRITES`  
**Target Applications:** `App 791 (Master), App 792 (History), App 793 (Change Requests)`  
**Authoritative Authorities:** `Org.FY2026_Rev.2.pdf (Org Authority) & App 53 (Person Authority)`

---

## 1. Complete Organization Hierarchy Reconstructed from Org.FY2026_Rev.2.pdf

```text
[TTMET] Toyota Tsusho M&E (Thailand) Co.,Ltd. (COMPANY) - Level 1
│
├── [DIV-ME] Machinery & Engineering Division (DIVISION) - Level 2
│   ├── [TMT1] Machinery Department (DEPARTMENT) - Level 3
│   │   ├── [TMT1-EXP] Export (SECTION) - Level 4
│   │   │   ├── [TMT1-MACH] Machine & Equipments (TEAM) - Level 5
│   │   │   └── [TMT1-TOOL] Tool Part & Project (TEAM) - Level 5
│   │   └── [TMT2] Toyota Sales (SECTION) - Level 4
│   │       ├── [TMT2-TOOL] Tooling (TEAM) - Level 5
│   │       ├── [TMT2-STN] STN (TEAM) - Level 5
│   │       └── [TMT2-LOGI] Logistics (TEAM) - Level 5
│   │
│   ├── [TMT0] Industrial Services Department (DEPARTMENT) - Level 3
│   │   ├── [TMF1] Automotive (SECTION) - Level 4
│   │   │   └── [TMF1-MARK] Marketing (Automotive) (TEAM) - Level 5
│   │   ├── [TMF2] Industry (SECTION) - Level 4
│   │   │   └── [TMF2-MARK] Marketing (Industry) (TEAM) - Level 5
│   │   └── [TMF3] Sales Engineering (SECTION) - Level 4
│   │       ├── [TMF3-SALE] Sales (TEAM) - Level 5
│   │       └── [TMF3-MARK] Marketing (Sales Engineering) (TEAM) - Level 5
│   │
│   ├── [TME1] Eco Energy & Textile Machinery Department (DEPARTMENT) - Level 3
│   │   └── [TME3] Eco Energy & Textile Machinery (SECTION) - Level 4
│   │       └── [TME3-MARK] Marketing (Eco Energy) (TEAM) - Level 5
│   │
│   └── [TMS0] Technical Services Department (DEPARTMENT) - Level 3
│       └── [TMS1] Technical Services (SECTION) - Level 4
│           ├── [TMS1-PROJ] Project Management (TEAM) - Level 5
│           ├── [TMS1-ENGI] Engineering (TEAM) - Level 5
│           └── [TMS1-SAFE] Safety & ISO (TEAM) - Level 5
│
├── [DIV-GS] GIFU SEIKI Division (DIVISION) - Level 2
│   └── [TMG0] Mold & Engineering Department (DEPARTMENT) - Level 3
│       ├── [TMG1] Die Casting (SECTION) - Level 4
│       └── [TMG2] Injection (SECTION) - Level 4
│
└── [TMH0] Corporate Department (DEPARTMENT) - Level 3
    ├── [TMH1] GA (SECTION) - Level 4
    ├── [TMH2] HR & Personnel (SECTION) - Level 4
    └── [TMH3] Accounting & Finance (SECTION) - Level 4
```

---

## 2. Canonical Organization Master (All 34 Nodes)

| No. | Entity Code | Entity Type | Level | Official English Name | Official Thai Name | Parent Code | Manager / Leader |
| :---: | :---: | :---: | :---: | :--- | :--- | :---: | :--- |
| 1 | `TTMET` | COMPANY | 1 | Toyota Tsusho M&E (Thailand) Co.,Ltd. | บริษัท โตโยต้า ทูโช เอ็ม แอนด์ อี (ไทยแลนด์) จำกัด | `ROOT` | Tomita (Managing Director) |
| 2 | `DIV-ME` | DIVISION | 2 | Machinery & Engineering Division | ฝ่ายเครื่องจักรและวิศวกรรม | `TTMET` | Mr.Shinichiro Sato (GM) |
| 3 | `DIV-GS` | DIVISION | 2 | GIFU SEIKI Division | ฝ่ายกิฟู เซกิ | `TTMET` | Mr.Uchida (VP) |
| 4 | `TMH0` | DEPARTMENT | 3 | Corporate Department | ฝ่ายบริหารกลาง | `TTMET` | Ms.Chutharat (GM) |
| 5 | `TMT1` | DEPARTMENT | 3 | Machinery Department | ฝ่ายเครื่องจักรกล | `DIV-ME` | Mr.Shinichiro Sato (GM) |
| 6 | `TMT0` | DEPARTMENT | 3 | Industrial Services Department | ฝ่ายบริการอุตสาหกรรม | `DIV-ME` | Mr.Akinobu Kito (GM) |
| 7 | `TME1` | DEPARTMENT | 3 | Eco Energy & Textile Machinery Department | ฝ่ายพลังงานสิ่งแวดล้อมและเครื่องจักรสิ่งทอ | `DIV-ME` | Mr.Keisuke Shigeta (GM) |
| 8 | `TMS0` | DEPARTMENT | 3 | Technical Services Department | ฝ่ายบริการเทคนิค | `DIV-ME` | Mr.Shinichi Makino (GM) |
| 9 | `TMG0` | DEPARTMENT | 3 | Mold & Engineering Department | ฝ่ายแม่พิมพ์และวิศวกรรม | `DIV-GS` | Mr.Takuro Inoue (Senior Manager) |
| 10 | `TMT1-EXP` | SECTION | 4 | Export | แผนกส่งออก | `TMT1` | Mr.Weerakul (DGM) |
| 11 | `TMT1-MACH` | TEAM | 5 | Machine & Equipments | หน่วยเครื่องจักรและอุปกรณ์ | `TMT1-EXP` | Operational Staff |
| 12 | `TMT1-TOOL` | TEAM | 5 | Tool Part & Project | หน่วยอะไหล่และโครงการ | `TMT1-EXP` | Operational Staff |
| 13 | `TMT2` | SECTION | 4 | Toyota Sales | แผนกการขายโตโยต้า | `TMT1` | Ms.Darat (DGM) |
| 14 | `TMT2-TOOL` | TEAM | 5 | Tooling | หน่วยเครื่องมือ | `TMT2` | Operational Staff |
| 15 | `TMT2-STN` | TEAM | 5 | STN | หน่วย STN | `TMT2` | Operational Staff |
| 16 | `TMT2-LOGI` | TEAM | 5 | Logistics | หน่วยโลจิสติกส์ | `TMT2` | Operational Staff |
| 17 | `TMF1` | SECTION | 4 | Automotive | แผนกยานยนต์ | `TMT0` | Mr.Niwat (Manager) |
| 18 | `TMF1-MARK` | TEAM | 5 | Marketing (Automotive) | หน่วยการตลาดยานยนต์ | `TMF1` | Operational Staff |
| 19 | `TMF2` | SECTION | 4 | Industry | แผนกอุตสาหกรรม | `TMT0` | Ms.Vassana (DGM) |
| 20 | `TMF2-MARK` | TEAM | 5 | Marketing (Industry) | หน่วยการตลาดอุตสาหกรรม | `TMF2` | Operational Staff |
| 21 | `TMF3` | SECTION | 4 | Sales Engineering | แผนกวิศวกรรมการขาย | `TMT0` | Mr.Narupot (Manager) |
| 22 | `TMF3-SALE` | TEAM | 5 | Sales | หน่วยงานขาย | `TMF3` | Operational Staff |
| 23 | `TMF3-MARK` | TEAM | 5 | Marketing (Sales Engineering) | หน่วยการตลาดวิศวกรรม | `TMF3` | Operational Staff |
| 24 | `TME3` | SECTION | 4 | Eco Energy & Textile Machinery | แผนกพลังงานสิ่งแวดล้อมและสิ่งทอ | `TME1` | Mr.Worapoj (Manager) |
| 25 | `TME3-MARK` | TEAM | 5 | Marketing (Eco Energy) | หน่วยการตลาดพลังงานสิ่งแวดล้อม | `TME3` | Operational Staff |
| 26 | `TMS1` | SECTION | 4 | Technical Services | แผนกบริการเทคนิค | `TMS0` | Mr.Sato (Senior Manager) |
| 27 | `TMS1-PROJ` | TEAM | 5 | Project Management | หน่วยบริหารโครงการ | `TMS1` | Operational Staff |
| 28 | `TMS1-ENGI` | TEAM | 5 | Engineering | หน่วยวิศวกรรม | `TMS1` | Operational Staff |
| 29 | `TMS1-SAFE` | TEAM | 5 | Safety & ISO | หน่วยความปลอดภัยและ ISO | `TMS1` | Operational Staff |
| 30 | `TMG1` | SECTION | 4 | Die Casting | แผนกแม่พิมพ์หล่อโลหะ | `TMG0` | Mr.Preecha (Manager) |
| 31 | `TMG2` | SECTION | 4 | Injection | แผนกแม่พิมพ์ฉีดพลาสติก | `TMG0` | Mr.Kanisorn (Manager) |
| 32 | `TMH1` | SECTION | 4 | GA | แผนกธุรการทั่วไป | `TMH0` | Ms.Suppaluck (Manager) |
| 33 | `TMH2` | SECTION | 4 | HR & Personnel | แผนกทรัพยากรบุคคล | `TMH0` | Ms.Paonrataya (Manager) |
| 34 | `TMH3` | SECTION | 4 | Accounting & Finance | แผนกบัญชีและการเงิน | `TMH0` | Ms.Charunee (Manager) |

---

## 3. Canonical Position Master (Clean Job Titles)

- Total Clean Job Titles: **57 Positions** (`POS-001` to `POS-057`)
- Examples: Operator (`POS-001`), Marketing Staff (`POS-002`), Coordinator (`POS-005`), Staff (`POS-007`), Assistant Manager (`POS-010`), Chief (`POS-022`), Manager (`POS-029`), General Manager (`POS-038`), Vice President (`POS-039`), President (`POS-050`), Managing Director (`POS-052`), Advisor (`POS-055`).
- **Person records in Position Master:** **0**

---

## 4. Reset & Rebuild Numbers Accounting

| Application | Existing Records to be Deleted | Records to be Recreated After Reset | Notes |
| :--- | :---: | :---: | :--- |
| **App 791 (Org Master)** | **609** | **91** | 34 Canonical Orgs + 57 Canonical Positions |
| **App 792 (Assignment History)** | **275** | **275** | Baseline clean canonical assignments initialized |
| **App 793 (Change Requests)** | **2** | **0** | Clean start (historical test requests purged) |
| **App 53 (Employee Master)** | **0 (Untouched)** | **275** | **STRICT READ-ONLY: ZERO WRITES** |

---

## 5. Review Summary & Decision Items

- **Unmapped Employees:** `0 / 275` (100% resolved)
- **Source Conflicts:** `0`
- **Ambiguous Positions:** `0`
- **Ambiguous Organizations:** `0`
- **Duplicate Canonical Codes:** `0`
- **Orphan Parents:** `0`
- **Circular Hierarchies:** `0`
- **AI-Generated Names:** `0`
- **Blocking Dependencies:** `0`
