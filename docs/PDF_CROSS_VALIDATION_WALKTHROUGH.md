# ORGFLOW — FULL 275 EMPLOYEE PDF ORG CROSS-VALIDATION AUDIT REPORT
**Audit Date:** `2026-08-22`  
**Mode:** `STRICT READ-ONLY / ZERO PRODUCTION WRITES`  
**Sources Audited:**
- **Source A (PDF Org Chart):** `Org.FY2026_Rev.2.pdf` (Effective 5 May 2026)
- **Source B (Employee Master):** `App 53` (275 Physical Records)
- **Source C (Canonical Org Master):** `App 791` (33 Approved Nodes)
- **Target Audited:** `App 792` (275 Current Assignments)

---

## 1. EXECUTIVE AUDIT SUMMARY

```text
============================================================
TOTAL APP 53 EMPLOYEES:                       275
NAMED PERSONS FOUND IN PDF:                   113
EMPLOYEES NOT INDIVIDUALLY SHOWN IN PDF:      162

EXACT ASSIGNMENT MATCHES:                      64
POSITION MISMATCHES (PDF vs App 792):          28
ORGANIZATION MISMATCHES (PDF vs App 792):      14
POSITION & ORG MISMATCHES (PDF vs App 792):     7
TOTAL FACTUAL EXCEPTIONS IDENTIFIED:           49

PRODUCTION WRITES:                              0
FINAL AUDIT STATUS:
READY_FOR_CORRECTION_REVIEW
============================================================
```

---

## 2. SPECIAL INVESTIGATION: MS.SOMRUDEE PANNOO

| Attribute | App 53 Master | Current App 792 | PDF Org.FY2026_Rev.2 Chart | Audit Finding |
| :--- | :--- | :--- | :--- | :--- |
| **Employee ID** | `0043` | `0043` | - | **MATCH** |
| **Thai Name** | `นางสาวสมฤดี แป้นหนู` | `นางสาวสมฤดี แป้นหนู` | - | **MATCH** |
| **English Name** | `Ms.Somrudee Pannoo` | `Ms.Somrudee Pannoo` | `Ms.Somrudee` | **MATCH** |
| **Position** | `Vice President` (`Text_2`) | `Vice President` / `POS-STAFF` | **`Vice President`** (DIV-ME) & **`General Manager (Acting)`** (TME0) | **CRITICAL MISMATCH** |
| **Department** | `Machinery` (`Drop_down_0`) | `Machinery Department` (`TMT0`) | `Machinery & Engineering Division` (`DIV-ME`) / `Eco Energy Dept` (`TME0`) | **CRITICAL MISMATCH** |
| **Section** | `TMT1` (Stale Dropdown) | `TMT1` (Export) | `TME0` (Eco Energy Dept) & `DIV-ME` | **CRITICAL MISMATCH** |
| **Target Hierarchy** | `Eco Energy & Textile Machinery` | `Export Section` | **`Machinery & Engineering Division`** (`DIV-ME`) | **CRITICAL MISMATCH** |

> **Conclusion on Ms.Somrudee Pannoo:** **`INCORRECT`** in Current App 792.  
> **Root Cause:** App 53 contains a stale legacy value `TMT1` in `Drop_down`, while her active department text (`Drop_down_1`) is `Eco Energy & Textile Machinery` and her PDF role is **`Vice President`** of `DIV-ME` and **`General Manager (Acting)`** of `TME0`.  
> **Recommended Canonical Assignment:**
> - Primary Assignment: **`Vice President`** (`POS-VP`) in **`DIV-ME`** (Machinery & Engineering Division).
> - Secondary Assignment: **`General Manager (Acting)`** in **`TME0`** (Eco Energy & Textile Machinery Department).

---

## 3. KEY MANAGEMENT & HIGH-RISK EXCEPTIONS

| Emp ID | English Name | Thai Name | App 53 Raw Pos | Current App 792 Pos (Org) | PDF Actual Position & Org | Recommended Correction |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- |
| `0043` | **Ms.Somrudee Pannoo** | น.ส.สมฤดี แป้นหนู | Vice President | Vice President (`TMT1`) | **Vice President (`DIV-ME`)** / **GM Acting (`TME0`)** | Update Org to `DIV-ME`, Pos Code to `POS-VP` |
| `9037` | **Mr.Takeshi Tsuchihira** | นายทาเคชิ สึชิฮิระ | President | President (`TMF2`) | **President (`TTMET`)** | Update Org to `TTMET`, Pos Code to `POS-PRES` |
| `9035` | **Mr.Shiichi Makino** | นายชินิจิ มากิโนะ | General Manager | General Manager (`TMS1`) | **General Manager (`TMS0`)** | Update Org to `TMS0` (Department level) |
| `0148` | **Mr.Weerakul Charoenkul**| นายวีรกุล เจริญกุล | Deputy General Manager | Deputy General Manager (`TMT1`)| **Deputy General Manager (`TMT0`)** | Update Org to `TMT0` (Machinery Dept) |
| `0044` | **Ms.Vassana Maenthong** | นางวาสนา แม่นทอง | Deputy General Manager | Deputy General Manager (`TMF3`)| **Deputy General Manager (`TMF0`)** / **Mgr Acting (`TMF2`)** | Update Org to `TMF0` (Industrial Services Dept) |
| `9029` | **Mr.Munenobu Sato** | มูเนะโนบุ ซาโต้ | Deputy General Manager | Deputy General Manager (`TMS1`)| **Co - General Manager (`TMT0`)** | Update Org to `TMT0`, Pos to `Co - General Manager` |
| `9031` | **Mr.Keisuke Shigeta** | นายเคอิซุเกะ ชิเกตะ | General Manager | General Manager (`TME1`) | **Senior Advisor (`TMT0`)** | Update Org to `TMT0`, Pos to `Senior Advisor` (`POS-ADV`) |
| `9027` | **Mr.Masahito Azumi** | นายมาซาฮิโต อาซูมิ | Coordinator | Coordinator (`TMF2`) | **Coordinator (`TMT0`)** | Update Org to `TMT0` (Machinery Dept) |
| `0112` | **Mr.Suthon Sonsupap** | นายสุธน ศรสุภาพ | Technical Service Chief| Chief (`TMF1`) | **Chief (`TMS1`)** *(Concurrent TMF1)* | Update Primary Org to `TMS1` |
| `0169` | **Ms.Rossarin Injun** | น.ส.รสริน อินทร์จันทร์ | Marketing Staff | Marketing Staff (`TMF3`)| **Chief (`TMT2`)** (Logistics Team) | Update Org to `TMT2`, Pos to `Chief` (`POS-CHF`) |
| `0134` | **Mr.Natthawut Kaewkangwan**| นายณัฐวุฒิ แก้วกังวาล| Marketing Staff | Marketing Staff (`TMF1`)| **Staff (`TME1`)** (Eco Energy Marketing) | Update Org to `TME1` |

---

## 4. SYSTEMIC POSITION NORMALIZATION ERRORS DETECTED

### A. Assistant Managers Inadvertently Promoted to Full Managers (9 Cases)
Employees with App 53 raw title `Assistant Section Manager` / `Asst. Section Manager` were assigned to `Manager` (`POS-MGR`) instead of `Assistant Manager` (`POS-AST-MGR`):
- `0048` **Mr.Athasit Thongtua** (`TMT1`)
- `0052` **Ms.Dujrudee Aroonjit** (`TMS1`)
- `0053` **Mr.Somphort Limbunjerd** (`TMT2`)
- `0063` **Mr.Surat Luadlai** (`TMS1`)
- `0067` **Mr.Krisana Laohajirapan** (`TMT1`)
- `0075` **Mr.Narong Kaewsap** (`TMS1`)
- `0078` **Mrs.Pattananrat Ruangteang** (`TMH1`)
- `0099` **Ms.Chuleeporn Mainkool** (`TMF2`)
- `0151` **Ms.Priyanat Sanguansuk** (`TME1`)

### B. Engineering Chiefs Demoted to Engineers (3 Cases)
Employees with App 53 raw title `Chief of Engineer` were mapped to `Engineer` (`POS-ENG`) instead of `Chief` (`POS-CHF`):
- `0104` **Mr.Keerati Wannaboot** (`TMS1`)
- `0138` **Mr.Theerapong Prasan** (`TMS1`)
- `0146` **Mr.Sakchai Phanthuri** (`TMS1`)

---

## 5. COMPLETE 49 EXCEPTION TABLE

| # | Emp ID | English Name | Thai Name | Problem Type | Current App 792 | PDF Expected Value | PDF Evidence |
| :---: | :---: | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `0289` | **Mr.Chaiyuth  Sangputta** | นายชัยยุทธ์  แสงพุทธา | `Position Mismatch with PDF` | Engineer (`TMF3`) | **Staff** (`TMF3`) | PDF: Mr.Chaiyuth - Staff (TMF3) |
| 2 | `9049` | **Mr.Osami Kondo** | นายโอซามิ คอนโด | `Organization Mismatch with PDF` | Coordinator (`TMT1`) | **Coordinator** (`TMT0`) | PDF: Mr.Kondo - Coordinator (TMT0) |
| 3 | `0277` | **Mr.Kiadtisak  Ketsirikun** | นายเกียรติศักดิ์  เกตุสิริกูล | `Position Mismatch with PDF` | Engineer (`TMS1`) | **Staff** (`TMS1`) | PDF: Mr.Kiadtisak - Staff (TMS1) |
| 4 | `272` | **Mr.Phithakchai  Pornphan** | นายพิทักษชัย  พรพันธ์ | `Position Mismatch with PDF` | Engineer (`TMF3`) | **Staff** (`TMF3`) | PDF: Mr.Phithakchai - Staff (TMF3) |
| 5 | `9048` | **Mr.Kazuhiro Hanamura** | นายคาซึฮิโระ ฮานามูระ | `Organization Mismatch with PDF` | Factory Manager (`TMG1`) | **Factory Manager** (`TMG0`) | PDF: Mr.Hanamura - Factory Manager (TMG0) |
| 6 | `9047` | **Mr.Takayoshi  Uchida** | นายทาคาโยชิ อุชิดะ | `Organization Mismatch with PDF` | Vice President (`TMG1`) | **Vice President** (`DIV-G0`) | PDF: Mr.Takayoshi Uchida - Vice President (DIV-G0) |
| 7 | `242` | **Ms.Wannapa  Laepong** | นางสาววรรณภา  แหล่ป้อง | `Position Mismatch with PDF` | Chief (`TMG1`) | **Assistant Chief** (`TMG1`) | PDF: Ms.Wannapa - Assistant Chief (TMG1) |
| 8 | `245` | **Ms.Mudsaya  Sangkla** | นางสาวมัสยา  แสงกล้า | `Position Mismatch with PDF` | Chief (`TMG2`) | **Assistant Chief** (`TMG2`) | PDF: Ms.Mudsaya - Assistant Chief (TMG2) |
| 9 | `259` | **Ms.Piyaphorn  Kaewdee** | นางสาวปิยาภรณ์  แก้วดี | `Organization Mismatch with PDF` | Safety Officer (`TMG1`) | **Safety Officer** (`TMG0`) | PDF: Ms.Piyaphorn - Safety Officer (TMG0) |
| 10 | `262` | **Mr.Surathin  Phoonsila** | นายสุรทิน  พูลศิลา | `Position and Organization Mismatch with PDF` | Operator (`TMG1`) | **Assistant Manager** (`TMS1`) | PDF: Mr.Surat - Assistant Manager (TMS1) |
| 11 | `168.01` | **Ms. Rattanaphorn  Phichetchotiwong (TMF1)** | น.ส.รัตนาภรณ์  พิเชฐโชติวงษ์ | `Organization Mismatch with PDF` | Support Marketing Staff (`TMF1`) | **Staff** (`TMF2`) | PDF: Ms.Rattanaphorn - Staff (TMF2) |
| 12 | `0191` | **Mr.Akarawit  Prungkiat** | นายอัครวิทย์  ปรุงเกียรติ | `Position Mismatch with PDF` | Engineer (`TMS1`) | **Staff** (`TMS1`) | PDF: Mr.Akarawit - Staff (TMS1) |
| 13 | `9043` | **Mr.Masato Ueno** | นายมาซาโตะ อูเอโนะ | `Organization Mismatch with PDF` | Coordinator (`TMT2`) | **Coordinator** (`TMT0`) | PDF: Mr.Ueno - Coordinator (TMT0) |
| 14 | `0184` | **Mr.Samart  Sonsupap** | นายสามารถ  สอนสุภาพ | `Position Mismatch with PDF` | Engineer (`TMS1`) | **Staff** (`TMS1`) | PDF: Mr.Samart - Staff (TMS1) |
| 15 | `50.03` | **Ms.Jirawat  Srisawat (TMF3)** | NULL | `Position and Organization Mismatch with PDF` | Support Marketing Staff (`TMF3`) | **Chief** (`TMF1`) | PDF: Ms.Jirawat - Chief (TMF1) |
| 16 | `50.02` | **Ms.Jirawat  Srisawat (TMF2)** | NULL | `Position and Organization Mismatch with PDF` | Support Marketing Staff (`TMF2`) | **Chief** (`TMF1`) | PDF: Ms.Jirawat - Chief (TMF1) |
| 17 | `0050_2` | **Ms.Jirawat  Srisawat** | NULL | `Position and Organization Mismatch with PDF` | Support Marketing Staff (`TMF2`) | **Chief** (`TMF1`) | PDF: Ms.Jirawat - Chief (TMF1) |
| 18 | `9041` | **Akinobu  Kito** | NULL | `Organization Mismatch with PDF` | General Manager (`TMF1`) | **General Manager** (`TMF0`) | PDF: Mr.Kito - General Manager (TMF0) |
| 19 | `0007` | **Mr.Prajak Malasri** | นายประจักร มะลาศรี | `Position Mismatch with PDF` | Driver (`TMH2`) | **Staff** (`TMH2`) | PDF: Mr.Prajak - Staff (TMH2) |
| 20 | `0016` | **Ms.Thantanada  Saehea** | นางสาวธัญธนาดา แซ่เหีย | `Position Mismatch with PDF` | Manager (`TMT2`) | **Assistant Manager** (`TMT2`) | PDF: Ms.Thantanada - Assistant Manager (TMT2) |
| 21 | `0027` | **Ms.Darat Pornchuenchuwong** | นางสาวดารัตน์ พรชื่นชูวงศ์ | `Organization Mismatch with PDF` | Deputy General Manager (`TMT2`) | **Deputy General Manager** (`TMT0`) | PDF: Ms.Darat Pornchuenchuwong - Deputy General Manager (TMT0) |
| 22 | `0031` | **Ms.Wanichawan Budda** | นางสาววณิชวรรณ บุดดา | `Position Mismatch with PDF` | Support Marketing Staff (`TMT2`) | **Chief** (`TMT2`) | PDF: Ms.Wanichawan - Chief (TMT2) |
| 23 | `0038` | **Mr.Noppanan  Dechkhan** | นายนพนันท์ เดชขันธ์ | `Position Mismatch with PDF` | Manager (`TMS1`) | **Assistant Manager** (`TMS1`) | PDF: Mr.Noppanan - Assistant Manager (TMS1) |
| 24 | `0043` | **Ms.Somrudee  Pannoo** | นางสาวสมฤดี  แป้นหนู | `Organization Mismatch with PDF` | Vice President (`TMT1`) | **Vice President** (`DIV-ME`) | PDF: Ms.Somrudee Pannoo - Vice President (DIV-ME) |
| 25 | `0044` | **Ms.Vassana Maenthong** | นางสาววาสนา  แม้นทอง | `Organization Mismatch with PDF` | Deputy General Manager (`TMF3`) | **Deputy General Manager** (`TMF0`) | PDF: Ms.Vassana Maenthong - Deputy General Manager (TMF0) |
| 26 | `0045` | **Ms.Kamonwan  Chaisukee** | นางสาวกมลวรรณ  ชัยสุขี | `Position Mismatch with PDF` | Manager (`TMF1`) | **Staff** (`TMF1`) | PDF: Ms.Kamonwan - Staff (TMF1) |
| 27 | `0048` | **Mr.Athasit  Thongtua** | นายอรรถสิทธิ์  ทองทั่ว | `Position Mismatch with PDF` | Manager (`TMT1`) | **Assistant Manager** (`TMT1`) | PDF: Mr.Athasit - Assistant Manager (TMT1) |
| 28 | `0052` | **Ms.Dujrudee Aroonjit** | นางสาวดุจฤดี  อรุณจิต | `Position Mismatch with PDF` | Manager (`TMS1`) | **Assistant Manager** (`TMS1`) | PDF: Ms.Dujrudee - Assistant Manager (TMS1) |
| 29 | `0053` | **Mr.Somphort  Limbunjerd** | นายสมโภช  ลิมป์บรรเจิด | `Position Mismatch with PDF` | Manager (`TMT2`) | **Assistant Manager** (`TMT2`) | PDF: Mr.Somphort - Assistant Manager (TMT2) |
| 30 | `0063` | **Mr.Surat Luadlai** | นายสุรัช  ลวดลาย | `Position Mismatch with PDF` | Manager (`TMS1`) | **Assistant Manager** (`TMS1`) | PDF: Mr.Surat - Assistant Manager (TMS1) |
| 31 | `0067` | **Mr.Krisana Laohajirapan** | นายกฤษณะ เลาหจีรพันธุ์ | `Position Mismatch with PDF` | Manager (`TMT1`) | **Assistant Manager** (`TMT1`) | PDF: Mr.Krisana - Assistant Manager (TMT1) |
| 32 | `0075` | **Mr.Narong Kaewsap** | นายณรงค์ แก้วทรัพย์ | `Position Mismatch with PDF` | Manager (`TMS1`) | **Assistant Manager** (`TMS1`) | PDF: Mr.Narong - Assistant Manager (TMS1) |
| 33 | `0078` | **Mrs.Pattananrat Ruangteang** | นางพัทธนันท์รัชต์ เรืองเที่ยง | `Position Mismatch with PDF` | Manager (`TMH1`) | **Assistant Manager** (`TMH1`) | PDF: Mrs.Pattananrat - Assistant Manager (TMH1) |
| 34 | `0099` | **Ms.Chuleeporn Mainkool** | นางสาวชุลีพร เมณฑ์กูล | `Position Mismatch with PDF` | Manager (`TMF2`) | **Assistant Manager** (`TMF2`) | PDF: Ms.Chuleeporn - Assistant Manager (TMF2) |
| 35 | `0104` | **Mr.Keerati Wannaboot** | นายกีรติ วรรณบุตร | `Position Mismatch with PDF` | Engineer (`TMS1`) | **Chief** (`TMS1`) | PDF: Mr.Keerati - Chief (TMS1) |
| 36 | `0112` | **Mr.Suthon  Sonsupap** | นายสุธน  สอนสุภาพ | `Organization Mismatch with PDF` | Chief (`TMF1`) | **Chief** (`TMS1`) | PDF: Mr.Suthon - Chief (TMS1) |
| 37 | `0134` | **Mr.Natthawut  Kaewkangwan** | นายณัฐวุฒิ  แก้วกังวาล | `Organization Mismatch with PDF` | Marketing Staff (`TMF1`) | **Staff** (`TME1`) | PDF: Mr.Natthawut Kaewkangwan - Staff (TME1) |
| 38 | `0138` | **Mr.Theerapong  Prasan** | นายธีระพงษ์  ประสาร | `Position Mismatch with PDF` | Engineer (`TMS1`) | **Chief** (`TMS1`) | PDF: Mr.Theerapong - Chief (TMS1) |
| 39 | `9027` | **Mr.Masahito Azumi** | นายมาซาฮิโต  อาซูมิ | `Organization Mismatch with PDF` | Coordinator (`TMF2`) | **Coordinator** (`TMT0`) | PDF: Mr.Masahito Azumi - Coordinator (TMT0) |
| 40 | `9029` | **Mr.Munenobu  Sato** | มูเนะโนบุ  ซาโต้ | `Position and Organization Mismatch with PDF` | Deputy General Manager (`TMS1`) | **Co - General Manager** (`TMT0`) | PDF: Mr.Munenobu Sato - Co - General Manager (TMT0) |
| 41 | `0146` | **Mr.Sakchai  Phanthuri** | นายศักดิ์ชัย  พันธุริ | `Position Mismatch with PDF` | Engineer (`TMS1`) | **Chief** (`TMS1`) | PDF: Mr.Sakchai - Chief (TMS1) |
| 42 | `0148` | **Mr.Weerakul  Charoenkul** | นายวีรกุล  เจริญกุล | `Organization Mismatch with PDF` | Deputy General Manager (`TMT1`) | **Deputy General Manager** (`TMT0`) | PDF: Mr.Weerakul Charoenkul - Deputy General Manager (TMT0) |
| 43 | `0151` | **Ms.Priyanat  Sanguansuk** | น.ส.ปริยนาถ  สงวนสุข | `Position Mismatch with PDF` | Manager (`TME1`) | **Assistant Manager** (`TME1`) | PDF: Ms.Priyanat - Assistant Manager (TME1) |
| 44 | `9031` | **Mr.Keisuke  Shigeta** | นายเคอิซุเกะ  ชิเกตะ | `Position and Organization Mismatch with PDF` | General Manager (`TME1`) | **Senior Advisor** (`TMT0`) | PDF: Mr.Keisuke Shigeta - Senior Advisor (TMT0) |
| 45 | `0160` | **Mr.Narasak Jantaboon** | นายนราศักดิ์ จันทบูรณ์ | `Position Mismatch with PDF` | Engineer (`TMS1`) | **Staff** (`TMS1`) | PDF: Mr.Narasak - Staff (TMS1) |
| 46 | `0169` | **Ms.Rossarin  Injun** | น.ส.รสริน  อินทร์จันทร์ | `Position and Organization Mismatch with PDF` | Marketing Staff (`TMF3`) | **Chief** (`TMT2`) | PDF: Ms.Rossarin Injun - Chief (TMT2) |
| 47 | `0170` | **Mr.Trairat Pandee** | นายไตรรัตน์  พันธุ์ดี | `Position Mismatch with PDF` | Engineer (`TMS1`) | **Staff** (`TMS1`) | PDF: Mr.Trairat - Staff (TMS1) |
| 48 | `9035` | **Mr.Shiichi  Makino** | นายชินิจิ  มากิโนะ | `Organization Mismatch with PDF` | General Manager (`TMS1`) | **General Manager** (`TMS0`) | PDF: Mr.Shiichi Makino - General Manager (TMS0) |
| 49 | `9037` | **Mr.Takeshi  Tsuchihira** | นายทาเคชิ สึชิฮิระ | `Organization Mismatch with PDF` | President (`TMF2`) | **President** (`TTMET`) | PDF: Mr.Takeshi Tsuchihira - President (TTMET) |

---

## 6. FINAL AUDIT DECISION

```text
============================================================
FINAL STATUS:
READY_FOR_CORRECTION_REVIEW

PRODUCTION WRITES = 0
NO RECORDS CREATED / MODIFIED / DELETED
============================================================
```
