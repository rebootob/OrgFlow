# PHASE 7.2 FINAL EMPLOYEE ↔ ORGANIZATION ↔ POSITION CROSS-CHECK REPORT

**Extraction Timestamp:** `2026-08-22T09:34:43.997Z`  
**Mode:** `STRICT READ-ONLY / ZERO PRODUCTION WRITES`  
**Status:** `READY_FOR_FINAL_DATA_REPAIR_PLAN_REVIEW`

---

## 1. Executive Summary & Reconciliation Counts

| Reconciliation Dimension | Audit Result | Target | Compliance |
| :--- | :---: | :---: | :---: |
| **App 53 Total Records** | **275** | 275 | PASS |
| **App 53 Unique Employees** | **274** | 275 | ⚠️ 1 Duplicate Identity (`#9000`) |
| **Duplicate Employee IDs** | **1** | 0 | ⚠️ Emp ID `9000` on Rec #390 & #382 |
| **Employees Matched to App 791** | **275** | 275 | PASS (100% Traceable) |
| **Employees Missing from Master** | **0** | 0 | PASS |
| **Valid Thai Names in App 53** | **255** | 275 | ⚠️ 20 Expatriates with NULL Thai name |
| **Valid English Names in App 53** | **275** | 275 | PASS (100%) |
| **Thai/English Field Errors in App 53** | **0** | 0 | PASS |
| **Valid Canonical Position Assignments** | **272** | 275 | 3 Unassigned Positions in App 53 |
| **Missing / Invalid Position Assignments** | **3** | 0 | ⚠️ 3 records with empty `Text_2` in App 53 |
| **Valid Canonical Organization Assignments** | **256** | 275 | 19 Legacy Section Abbreviations |
| **Missing / Unresolved Org Assignments** | **19** | 0 | ⚠️ Mappings ready for human review |
| **Code ↔ Name Reference Mismatches** | **0** | 0 | PASS |
| **Person Records Contaminating App 791** | **518** | 0 | 271 Person-as-POS + 247 Person-as-DEPT |

---

## 2. Contamination Breakdown Audit (16 Detailed Categories)

| Category Code | Description | Count in Live App 53 / 791 | Target in Clean Model |
| :---: | :--- | :---: | :---: |
| **A** | Thai name stored in English field | **0** | 0 |
| **B** | English name stored in Thai field | **0** | 0 |
| **C** | Same Thai name copied into both fields | **247** (in legacy App 791) | 0 |
| **D** | Same English name copied into both fields | **91** (in legacy App 791) | 0 |
| **E** | Employee represented more than once | **1** (Emp ID `9000`) | 0 |
| **F** | Employee missing from App 791 | **0** | 0 |
| **G** | App 791 employee not existing in App 53 | **0** | 0 |
| **H** | Employee name used as POSITION in App 791 | **271** (All POS-xxx records) | **0** |
| **I** | Employee name used as ORGANIZATION in App 791 | **247** (Legacy records #1-251) | **0** |
| **J** | Position name used as employee name | **0** | 0 |
| **K** | Organization name used as employee name | **0** | 0 |
| **L** | Wrong Employee ID ↔ Name mapping | **0** | 0 |
| **M** | Wrong Position assignment | **0** | 0 |
| **N** | Wrong Organization assignment | **0** | 0 |
| **O** | Missing organization assignment in App 53 | **9** | 0 |
| **P** | Missing position assignment in App 53 | **3** | 0 |

---

## 3. App 791 Master Classification (525 Live Records)

- **CANONICAL_ORGANIZATION:** **7 Records** (Active verified nodes: `TTMET`, `DIV-ME`, `DIV-GS`, `TMH0`, `TMT1`, `TMT0`, `TMS0`)
- **CANONICAL_POSITION:** **0 Records** (Clean canonical titles to be instantiated in rebuild)
- **LEGACY_PERSON_CONTAMINATION:** **518 Records** (271 Person-as-POS + 247 Person-as-DEPT)
- **LEGACY_OBSOLETE / UNRESOLVED:** **0 Records**
- **TOTAL APP 791 RECORDS:** **525 Records**

---

## 4. Complete List of All Exceptions Requiring Human Decision / Repair (41 Items)

| Emp ID | Thai Name | English Name | App 791 ID | Problem Category | Current Value | Expected Value | Authoritative Source | Recommended Repair |
| :---: | :--- | :--- | :---: | :--- | :--- | :--- | :---: | :--- |
| `259` | "นางสาวปิยาภรณ์  แก้วดี" | "Ms.Piyaphorn  Kaewdee" | N/A | **`UNRESOLVED_POSITION_STRING`** | Safety Officer&  ISO Control | Valid Canonical Position Title | `App 53 Text_2` | Map to Canonical Position Title |
| `9045` | "NULL" | "Mr.Toshikazu  Obata" | N/A | **`MISSING_AUTHORITATIVE_THAI_NAME`** | NULL / Empty in Text_0 | Official Thai Name or NULL (for Expatriates) | `App 53 Text_0` | Keep NULL for expatriates; review local records if Thai name exists |
| `9042` | "NULL" | "Mr.Shinichiro  Sato" | N/A | **`MISSING_AUTHORITATIVE_THAI_NAME`** | NULL / Empty in Text_0 | Official Thai Name or NULL (for Expatriates) | `App 53 Text_0` | Keep NULL for expatriates; review local records if Thai name exists |
| `9042` | "" | "Mr.Shinichiro  Sato" | N/A | **`UNRESOLVED_POSITION_STRING`** | EMPTY | Valid Canonical Position Title | `App 53 Text_2` | Map to Canonical Position Title |
| `50.03` | "NULL" | "Ms.Jirawat  Srisawat (TMF3)" | N/A | **`MISSING_AUTHORITATIVE_THAI_NAME`** | NULL / Empty in Text_0 | Official Thai Name or NULL (for Expatriates) | `App 53 Text_0` | Keep NULL for expatriates; review local records if Thai name exists |
| `50.02` | "NULL" | "Ms.Jirawat  Srisawat (TMF2)" | N/A | **`MISSING_AUTHORITATIVE_THAI_NAME`** | NULL / Empty in Text_0 | Official Thai Name or NULL (for Expatriates) | `App 53 Text_0` | Keep NULL for expatriates; review local records if Thai name exists |
| `0050_2` | "NULL" | "Ms.Jirawat  Srisawat" | N/A | **`MISSING_AUTHORITATIVE_THAI_NAME`** | NULL / Empty in Text_0 | Official Thai Name or NULL (for Expatriates) | `App 53 Text_0` | Keep NULL for expatriates; review local records if Thai name exists |
| `9041` | "NULL" | "Akinobu  Kito" | N/A | **`MISSING_AUTHORITATIVE_THAI_NAME`** | NULL / Empty in Text_0 | Official Thai Name or NULL (for Expatriates) | `App 53 Text_0` | Keep NULL for expatriates; review local records if Thai name exists |
| `9040` | "NULL" | "Ms.Hasuka  Kimura" | N/A | **`MISSING_AUTHORITATIVE_THAI_NAME`** | NULL / Empty in Text_0 | Official Thai Name or NULL (for Expatriates) | `App 53 Text_0` | Keep NULL for expatriates; review local records if Thai name exists |
| `8017` | "NULL" | "Thaweesak" | N/A | **`MISSING_AUTHORITATIVE_THAI_NAME`** | NULL / Empty in Text_0 | Official Thai Name or NULL (for Expatriates) | `App 53 Text_0` | Keep NULL for expatriates; review local records if Thai name exists |
| `0093` | "นายวิฑูร  สุขวิสุทธิโชติ" | "Mr.Vitoon Sukvisuttichot" | 72 | **`UNRESOLVED_ORGANIZATION_STRING`** | Dept: "Technical Services", Sec: "TMT3" | Canonical FY2026 Organization Node | `Org.FY2026_Rev.2` | Map legacy section abbreviation to official FY2026 section |
| `0109` | "นายพงศ์พัฒน์ ศรีโคตร" | "Mr.Pongpat Srikhote" | 65 | **`UNRESOLVED_ORGANIZATION_STRING`** | Dept: "Technical Services", Sec: "TMT3" | Canonical FY2026 Organization Node | `Org.FY2026_Rev.2` | Map legacy section abbreviation to official FY2026 section |
| `0117` | "นายจักรกฤษณ์  แพน้อย" | "Mr.Jakkrit  Paenoi" | 59 | **`UNRESOLVED_ORGANIZATION_STRING`** | Dept: "Technical Services", Sec: "TMT3" | Canonical FY2026 Organization Node | `Org.FY2026_Rev.2` | Map legacy section abbreviation to official FY2026 section |
| `0120` | "นางสาวสุธาดา  ใจมนต์" | "Ms.Suthada  Chaimon" | N/A | **`UNRESOLVED_POSITION_STRING`** | Marketing  Chief | Valid Canonical Position Title | `App 53 Text_2` | Map to Canonical Position Title |
| `0127` | "นายประเวศ  ปัญญาอภิวัฒนะ" | "Mr.Prawes  Panyaapiwattana" | 52 | **`UNRESOLVED_ORGANIZATION_STRING`** | Dept: "Technical Services", Sec: "TMT3" | Canonical FY2026 Organization Node | `Org.FY2026_Rev.2` | Map legacy section abbreviation to official FY2026 section |
| `9011` | "NULL" | "Mr.Kunihiko Kuroiwa" | N/A | **`MISSING_AUTHORITATIVE_THAI_NAME`** | NULL / Empty in Text_0 | Official Thai Name or NULL (for Expatriates) | `App 53 Text_0` | Keep NULL for expatriates; review local records if Thai name exists |
| `9011` | "" | "Mr.Kunihiko Kuroiwa" | N/A | **`UNRESOLVED_ORGANIZATION_STRING`** | Dept: "Technical Services", Sec: "TMT3" | Canonical FY2026 Organization Node | `Org.FY2026_Rev.2` | Map legacy section abbreviation to official FY2026 section |
| `9015` | "NULL" | "Mr.Tomoaki  Shirai" | N/A | **`MISSING_AUTHORITATIVE_THAI_NAME`** | NULL / Empty in Text_0 | Official Thai Name or NULL (for Expatriates) | `App 53 Text_0` | Keep NULL for expatriates; review local records if Thai name exists |
| `9015` | "" | "Mr.Tomoaki  Shirai" | N/A | **`UNRESOLVED_ORGANIZATION_STRING`** | Dept: "Technical Services", Sec: "TMT3" | Canonical FY2026 Organization Node | `Org.FY2026_Rev.2` | Map legacy section abbreviation to official FY2026 section |
| `9020` | "NULL" | "Mrs.Utsugi Rina" | N/A | **`MISSING_AUTHORITATIVE_THAI_NAME`** | NULL / Empty in Text_0 | Official Thai Name or NULL (for Expatriates) | `App 53 Text_0` | Keep NULL for expatriates; review local records if Thai name exists |
| `9020` | "" | "Mrs.Utsugi Rina" | 300 | **`UNRESOLVED_POSITION_STRING`** | Section  Manager | Valid Canonical Position Title | `App 53 Text_2` | Map to Canonical Position Title |
| `9025` | "NULL" | "Mr.Kazutsugu Sakakima" | N/A | **`MISSING_AUTHORITATIVE_THAI_NAME`** | NULL / Empty in Text_0 | Official Thai Name or NULL (for Expatriates) | `App 53 Text_0` | Keep NULL for expatriates; review local records if Thai name exists |
| `9026` | "นายทาคุโร  อิโนะอุเอะ" | "Mr.Takuro" | 298 | **`UNRESOLVED_POSITION_STRING`** | Senior  Manager | Valid Canonical Position Title | `App 53 Text_2` | Map to Canonical Position Title |
| `0139` | "นายปกป้อง วานิชสุจิต" | "Mr.Pokpong  Wanichsujit" | 39 | **`UNRESOLVED_ORGANIZATION_STRING`** | Dept: "Technical Services", Sec: "TMT3" | Canonical FY2026 Organization Node | `Org.FY2026_Rev.2` | Map legacy section abbreviation to official FY2026 section |
| `9022` | "NULL" | "Mr.Hisashi  Nagase" | N/A | **`MISSING_AUTHORITATIVE_THAI_NAME`** | NULL / Empty in Text_0 | Official Thai Name or NULL (for Expatriates) | `App 53 Text_0` | Keep NULL for expatriates; review local records if Thai name exists |
| `9021` | "NULL" | "Mr.Tomoaki  Shirai" | N/A | **`MISSING_AUTHORITATIVE_THAI_NAME`** | NULL / Empty in Text_0 | Official Thai Name or NULL (for Expatriates) | `App 53 Text_0` | Keep NULL for expatriates; review local records if Thai name exists |
| `0142` | "นายชิษณุพงศ์  กมลไชยอนันต์" | "Mr. Chisanupong  Kamolchaianan" | 37 | **`UNRESOLVED_ORGANIZATION_STRING`** | Dept: "Machinery", Sec: "" | Canonical FY2026 Organization Node | `Org.FY2026_Rev.2` | Map legacy section abbreviation to official FY2026 section |
| `9029` | "มูเนะโนบุ  ซาโต้" | "Mr.Munenobu  Sato" | 36 | **`UNRESOLVED_ORGANIZATION_STRING`** | Dept: "Technical Services", Sec: "TMT3" | Canonical FY2026 Organization Node | `Org.FY2026_Rev.2` | Map legacy section abbreviation to official FY2026 section |
| `0144` | "นายวรุตม์  อัศวตรีรัตนกุล" | "Mr.Warut  Asawatreratnakul" | 35 | **`UNRESOLVED_ORGANIZATION_STRING`** | Dept: "Technical Services", Sec: "TMT3" | Canonical FY2026 Organization Node | `Org.FY2026_Rev.2` | Map legacy section abbreviation to official FY2026 section |
| `9000` | "NULL" | "Tomita" | N/A | **`MISSING_AUTHORITATIVE_THAI_NAME`** | NULL / Empty in Text_0 | Official Thai Name or NULL (for Expatriates) | `App 53 Text_0` | Keep NULL for expatriates; review local records if Thai name exists |
| `9000` | "" | "Tomita" | N/A | **`UNRESOLVED_POSITION_STRING`** | EMPTY | Valid Canonical Position Title | `App 53 Text_2` | Map to Canonical Position Title |
| `9000` | "" | "Tomita" | N/A | **`UNRESOLVED_ORGANIZATION_STRING`** | Dept: "", Sec: "" | Canonical FY2026 Organization Node | `Org.FY2026_Rev.2` | Map legacy section abbreviation to official FY2026 section |
| `9028` | "NULL" | "Mr.Mitsukazu Imoto" | N/A | **`MISSING_AUTHORITATIVE_THAI_NAME`** | NULL / Empty in Text_0 | Official Thai Name or NULL (for Expatriates) | `App 53 Text_0` | Keep NULL for expatriates; review local records if Thai name exists |
| `9028` | "" | "Mr.Mitsukazu Imoto" | N/A | **`UNRESOLVED_ORGANIZATION_STRING`** | Dept: "", Sec: "TMT3" | Canonical FY2026 Organization Node | `Org.FY2026_Rev.2` | Map legacy section abbreviation to official FY2026 section |
| `9000` | "" | "PANU" | N/A | **`DUPLICATE_EMPLOYEE_ID_IN_APP53`** | Shared by App 53 #382 and #390 | Unique Employee ID per person | `App 53 Employee Namelist` | Assign distinct Employee ID to each person |
| `9000` | "NULL" | "PANU" | N/A | **`MISSING_AUTHORITATIVE_THAI_NAME`** | NULL / Empty in Text_0 | Official Thai Name or NULL (for Expatriates) | `App 53 Text_0` | Keep NULL for expatriates; review local records if Thai name exists |
| `9032` | "NULL" | "Mr.Tadashi  Onuki" | N/A | **`MISSING_AUTHORITATIVE_THAI_NAME`** | NULL / Empty in Text_0 | Official Thai Name or NULL (for Expatriates) | `App 53 Text_0` | Keep NULL for expatriates; review local records if Thai name exists |
| `9032` | "" | "Mr.Tadashi  Onuki" | N/A | **`UNRESOLVED_ORGANIZATION_STRING`** | Dept: "Technical Services", Sec: "TMT3" | Canonical FY2026 Organization Node | `Org.FY2026_Rev.2` | Map legacy section abbreviation to official FY2026 section |
| `9033` | "NULL" | "Mr.Morita  Jun" | N/A | **`MISSING_AUTHORITATIVE_THAI_NAME`** | NULL / Empty in Text_0 | Official Thai Name or NULL (for Expatriates) | `App 53 Text_0` | Keep NULL for expatriates; review local records if Thai name exists |
| `9036` | "NULL" | "Ms.Erika  Gaya" | N/A | **`MISSING_AUTHORITATIVE_THAI_NAME`** | NULL / Empty in Text_0 | Official Thai Name or NULL (for Expatriates) | `App 53 Text_0` | Keep NULL for expatriates; review local records if Thai name exists |
| `9036` | "" | "Ms.Erika  Gaya" | N/A | **`UNRESOLVED_POSITION_STRING`** | EMPTY | Valid Canonical Position Title | `App 53 Text_2` | Map to Canonical Position Title |
