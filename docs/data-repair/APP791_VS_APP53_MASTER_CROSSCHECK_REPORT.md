# APP 791 vs APP 53 MASTER CROSS-CHECK REPORT
## OrgFlow Data Integrity Audit (Strict Read-Only)

**Extraction Timestamp:** `2026-08-22T09:24:41.816Z`  
**Mode:** `STRICT READ-ONLY / ZERO PRODUCTION WRITES`  
**Status:** `STOPPED_FOR_USER_REVIEW`

---

## 1. Executive Summary & Required Counts

### APP 53 (Employee Master Reference)
- **Total Records:** 275
- **Unique Employee IDs:** 274
- **Duplicate Employee IDs:** 1
- **Employees with Department:** 266
- **Employees with Section:** 273
- **Employees with Position:** 272
- **Unique Departments:** 7
- **Unique Sections:** 13
- **Unique Position Titles:** 60

### APP 791 (Organization Masters)
- **Total Records:** 525
- **Company:** 1
- **Division:** 2
- **Department:** 247
- **Section:** 4
- **Team:** 0
- **Function:** 0
- **Position:** 271
- **Other / Unknown:** 0

### CROSS-CHECK FINDINGS
- **Valid Organization Records:** 7
- **Valid Position Records:** 0
- **Person-as-Position Confirmed:** **271** (App 791 POS records containing individual employee names instead of position titles)
- **Person-as-Position Suspect:** **0**
- **Person-as-Organization Suspect:** **247** (Legacy deactivated records)
- **English Person Name in Thai Field:** **269**
- **Thai Text in English Field:** **251**
- **Same English Person Name in Both Fields:** **91**
- **Department Mismatches:** **7**
- **Section Mismatches:** **12**
- **Position Mismatches:** **60** (All 60 actual job titles exist as person instances, not title instances)
- **Duplicate Masters:** 0
- **Missing Parents:** 0
- **Invalid Parents:** 0
- **Unknown References:** 0
- **App53 Source Anomalies:** **35** (e.g. 20 expatriates with no Thai name in Text_0)
- **Total Records Requiring Review:** **553**

---

## 2. Cardinality Analysis: The Root Cause of POS-xxx Contamination

```text
============================================================
POSITION CARDINALITY AUDIT
============================================================
App 53 Total Employees:                     275
App 53 Unique Job Titles:                   60

App 791 Total POSITION Records:             271
App 791 POSITION Records Matching Employees: 271 (99.6%)
App 791 POSITION Records Matching Job Title: 0 (0%)
============================================================
```

> **CRITICAL ARCHITECTURAL FINDING:**  
> In App 791, **271 POSITION records (POS-001 through POS-271)** were generated **PER EMPLOYEE (1:1 with people)** rather than **PER CANONICAL POSITION TITLE** (e.g., Operator, Manager, Staff).  
> For example: Record #425 `POS-174` contains Thai: `Ms.Thitaphat Sutthi`, English: `MS.THITAPHAT SUTTHI`, while her actual job title in App 53 is `"Manager"`.

---

## 3. Person-as-Position Real Production Examples (20 Samples)

--------------------------------------------------
**APP791 Record ID:** 522  
**Master Type:** POSITION  
**Entity Code:** `POS-271`  
**App791 Thai Name:** Mr.Panukorn Sathron  
**App791 English Name:** MR.PANUKORN SATHRON  
**Matched App53 Employee ID:** `0295` (App 53 Rec #642)  
**App53 Thai Name:** นายภาณุกร สาธร  
**App53 English Name:** Mr.Panukorn Sathron  
**App53 Actual Job Title:** **`Operator`**  
**Match Method:** `EXACT_ENGLISH_NAME`  
**Finding:** **`PERSON_AS_POSITION_CONFIRMED`**  
**Confidence:** `HIGH`  
**Active Status in App 791:** `ACTIVE`  
**Recommended Next Action:** `REVIEW_FOR_FUTURE_REPAIR`  

--------------------------------------------------
**APP791 Record ID:** 521  
**Master Type:** POSITION  
**Entity Code:** `POS-270`  
**App791 Thai Name:** Mr.Anuphong Longnoi  
**App791 English Name:** MR.ANUPHONG LONGNOI  
**Matched App53 Employee ID:** `0294` (App 53 Rec #641)  
**App53 Thai Name:** นายอนุพงษ์ หลงน้อย  
**App53 English Name:** Mr.Anuphong Longnoi  
**App53 Actual Job Title:** **`Operator`**  
**Match Method:** `EXACT_ENGLISH_NAME`  
**Finding:** **`PERSON_AS_POSITION_CONFIRMED`**  
**Confidence:** `HIGH`  
**Active Status in App 791:** `ACTIVE`  
**Recommended Next Action:** `REVIEW_FOR_FUTURE_REPAIR`  

--------------------------------------------------
**APP791 Record ID:** 520  
**Master Type:** POSITION  
**Entity Code:** `POS-269`  
**App791 Thai Name:** Mr.Theeraphat Khiaosaart  
**App791 English Name:** MR.THEERAPHAT KHIAOSAART  
**Matched App53 Employee ID:** `0293` (App 53 Rec #640)  
**App53 Thai Name:** นายธีรภัทร์ เขียวสะอาด  
**App53 English Name:** Mr.Theeraphat Khiaosaart  
**App53 Actual Job Title:** **`Operator`**  
**Match Method:** `EXACT_ENGLISH_NAME`  
**Finding:** **`PERSON_AS_POSITION_CONFIRMED`**  
**Confidence:** `HIGH`  
**Active Status in App 791:** `ACTIVE`  
**Recommended Next Action:** `REVIEW_FOR_FUTURE_REPAIR`  

--------------------------------------------------
**APP791 Record ID:** 519  
**Master Type:** POSITION  
**Entity Code:** `POS-268`  
**App791 Thai Name:** Mr.Archawa Topuong  
**App791 English Name:** MR.ARCHAWA TOPUONG  
**Matched App53 Employee ID:** `0297` (App 53 Rec #639)  
**App53 Thai Name:** นายอาชวะ  โตพ่วง  
**App53 English Name:** Mr.Archawa Topuong  
**App53 Actual Job Title:** **`Marketing Staff`**  
**Match Method:** `EXACT_ENGLISH_NAME`  
**Finding:** **`PERSON_AS_POSITION_CONFIRMED`**  
**Confidence:** `HIGH`  
**Active Status in App 791:** `ACTIVE`  
**Recommended Next Action:** `REVIEW_FOR_FUTURE_REPAIR`  

--------------------------------------------------
**APP791 Record ID:** 518  
**Master Type:** POSITION  
**Entity Code:** `POS-267`  
**App791 Thai Name:** Mr.Chetsada Rotthuk  
**App791 English Name:** MR.CHETSADA ROTTHUK  
**Matched App53 Employee ID:** `0296` (App 53 Rec #638)  
**App53 Thai Name:** นายเจษฎา  รอดทุกข์  
**App53 English Name:** Mr.Chetsada Rotthuk  
**App53 Actual Job Title:** **`Technician`**  
**Match Method:** `EXACT_ENGLISH_NAME`  
**Finding:** **`PERSON_AS_POSITION_CONFIRMED`**  
**Confidence:** `HIGH`  
**Active Status in App 791:** `ACTIVE`  
**Recommended Next Action:** `REVIEW_FOR_FUTURE_REPAIR`  

--------------------------------------------------
**APP791 Record ID:** 517  
**Master Type:** POSITION  
**Entity Code:** `POS-266`  
**App791 Thai Name:** Ms.Srichanok Saezee  
**App791 English Name:** MS.SRICHANOK SAEZEE  
**Matched App53 Employee ID:** `0292` (App 53 Rec #637)  
**App53 Thai Name:** น.ส.ศรีชนก แซ่ซี  
**App53 English Name:** Ms.Srichanok Saezee  
**App53 Actual Job Title:** **`Support Marketing Staff`**  
**Match Method:** `EXACT_ENGLISH_NAME`  
**Finding:** **`PERSON_AS_POSITION_CONFIRMED`**  
**Confidence:** `HIGH`  
**Active Status in App 791:** `ACTIVE`  
**Recommended Next Action:** `REVIEW_FOR_FUTURE_REPAIR`  

--------------------------------------------------
**APP791 Record ID:** 516  
**Master Type:** POSITION  
**Entity Code:** `POS-265`  
**App791 Thai Name:** Mr.Keizo Nakae  
**App791 English Name:** MR.KEIZO NAKAE  
**Matched App53 Employee ID:** `9050` (App 53 Rec #636)  
**App53 Thai Name:** เคอิโซ นาคาเอะ  
**App53 English Name:** Mr.Keizo Nakae  
**App53 Actual Job Title:** **`Coordinator`**  
**Match Method:** `EXACT_ENGLISH_NAME`  
**Finding:** **`PERSON_AS_POSITION_CONFIRMED`**  
**Confidence:** `HIGH`  
**Active Status in App 791:** `ACTIVE`  
**Recommended Next Action:** `REVIEW_FOR_FUTURE_REPAIR`  

--------------------------------------------------
**APP791 Record ID:** 515  
**Master Type:** POSITION  
**Entity Code:** `POS-264`  
**App791 Thai Name:** Mr.Watchara Khaosam-amg  
**App791 English Name:** MR.WATCHARA KHAOSAM-AMG  
**Matched App53 Employee ID:** `8046` (App 53 Rec #635)  
**App53 Thai Name:** นายวัชรา ขาวสำอางค์  
**App53 English Name:** Mr.Watchara Khaosam-amg  
**App53 Actual Job Title:** **`Marketing Engineer`**  
**Match Method:** `EXACT_ENGLISH_NAME`  
**Finding:** **`PERSON_AS_POSITION_CONFIRMED`**  
**Confidence:** `HIGH`  
**Active Status in App 791:** `ACTIVE`  
**Recommended Next Action:** `REVIEW_FOR_FUTURE_REPAIR`  

--------------------------------------------------
**APP791 Record ID:** 514  
**Master Type:** POSITION  
**Entity Code:** `POS-263`  
**App791 Thai Name:** Ms.Phattharanit  Pankhomkow  
**App791 English Name:** MS.PHATTHARANIT PANKHOMKOW  
**Matched App53 Employee ID:** `0291` (App 53 Rec #634)  
**App53 Thai Name:** น.ส.ภัทรนิษฐ์  พันธุ์คุ้มเก่า  
**App53 English Name:** Ms.Phattharanit  Pankhomkow  
**App53 Actual Job Title:** **`Support Marketing Staff`**  
**Match Method:** `NORMALIZED_NAME`  
**Finding:** **`PERSON_AS_POSITION_CONFIRMED`**  
**Confidence:** `HIGH`  
**Active Status in App 791:** `ACTIVE`  
**Recommended Next Action:** `REVIEW_FOR_FUTURE_REPAIR`  

--------------------------------------------------
**APP791 Record ID:** 513  
**Master Type:** POSITION  
**Entity Code:** `POS-262`  
**App791 Thai Name:** Ms.Supattra Saetiaw  
**App791 English Name:** MS.SUPATTRA SAETIAW  
**Matched App53 Employee ID:** `0290` (App 53 Rec #633)  
**App53 Thai Name:** น.ส.สุพัฒตรา แซ่เตียว  
**App53 English Name:** Ms.Supattra Saetiaw  
**App53 Actual Job Title:** **`Marketing Staff`**  
**Match Method:** `EXACT_ENGLISH_NAME`  
**Finding:** **`PERSON_AS_POSITION_CONFIRMED`**  
**Confidence:** `HIGH`  
**Active Status in App 791:** `ACTIVE`  
**Recommended Next Action:** `REVIEW_FOR_FUTURE_REPAIR`  

--------------------------------------------------
**APP791 Record ID:** 512  
**Master Type:** POSITION  
**Entity Code:** `POS-261`  
**App791 Thai Name:** Mr.Chaiyuth  Sangputta  
**App791 English Name:** MR.CHAIYUTH SANGPUTTA  
**Matched App53 Employee ID:** `0289` (App 53 Rec #632)  
**App53 Thai Name:** นายชัยยุทธ์  แสงพุทธา  
**App53 English Name:** Mr.Chaiyuth  Sangputta  
**App53 Actual Job Title:** **`Marketing Engineer`**  
**Match Method:** `NORMALIZED_NAME`  
**Finding:** **`PERSON_AS_POSITION_CONFIRMED`**  
**Confidence:** `HIGH`  
**Active Status in App 791:** `ACTIVE`  
**Recommended Next Action:** `REVIEW_FOR_FUTURE_REPAIR`  

--------------------------------------------------
**APP791 Record ID:** 511  
**Master Type:** POSITION  
**Entity Code:** `POS-260`  
**App791 Thai Name:** Ms.Yanisa Laotoom  
**App791 English Name:** MS.YANISA LAOTOOM  
**Matched App53 Employee ID:** `0288` (App 53 Rec #631)  
**App53 Thai Name:** น.ส.ญาณิศา  ลาวตูม  
**App53 English Name:** Ms.Yanisa Laotoom  
**App53 Actual Job Title:** **`Support Marketing Staff`**  
**Match Method:** `EXACT_ENGLISH_NAME`  
**Finding:** **`PERSON_AS_POSITION_CONFIRMED`**  
**Confidence:** `HIGH`  
**Active Status in App 791:** `ACTIVE`  
**Recommended Next Action:** `REVIEW_FOR_FUTURE_REPAIR`  

--------------------------------------------------
**APP791 Record ID:** 510  
**Master Type:** POSITION  
**Entity Code:** `POS-259`  
**App791 Thai Name:** Ms.Patcharida Pramomgkit  
**App791 English Name:** MS.PATCHARIDA PRAMOMGKIT  
**Matched App53 Employee ID:** `0287` (App 53 Rec #630)  
**App53 Thai Name:** น.ส.พัชริดา  ประมงกิจ  
**App53 English Name:** Ms.Patcharida Pramomgkit  
**App53 Actual Job Title:** **`Marketing Staff`**  
**Match Method:** `EXACT_ENGLISH_NAME`  
**Finding:** **`PERSON_AS_POSITION_CONFIRMED`**  
**Confidence:** `HIGH`  
**Active Status in App 791:** `ACTIVE`  
**Recommended Next Action:** `REVIEW_FOR_FUTURE_REPAIR`  

--------------------------------------------------
**APP791 Record ID:** 509  
**Master Type:** POSITION  
**Entity Code:** `POS-258`  
**App791 Thai Name:** Mr.Teerapong Maingam  
**App791 English Name:** MR.TEERAPONG MAINGAM  
**Matched App53 Employee ID:** `0286` (App 53 Rec #629)  
**App53 Thai Name:** นายธีรพงศ์ ไม้งาม  
**App53 English Name:** Mr.Teerapong Maingam  
**App53 Actual Job Title:** **`Operator`**  
**Match Method:** `EXACT_ENGLISH_NAME`  
**Finding:** **`PERSON_AS_POSITION_CONFIRMED`**  
**Confidence:** `HIGH`  
**Active Status in App 791:** `ACTIVE`  
**Recommended Next Action:** `REVIEW_FOR_FUTURE_REPAIR`  

--------------------------------------------------
**APP791 Record ID:** 508  
**Master Type:** POSITION  
**Entity Code:** `POS-257`  
**App791 Thai Name:** Ms.Phitthayaporn Sakulyodmanee  
**App791 English Name:** MS.PHITTHAYAPORN SAKULYODMANEE  
**Matched App53 Employee ID:** `0285` (App 53 Rec #628)  
**App53 Thai Name:** น.ส.พิทยาภรณ์ สกุลยอดมณี  
**App53 English Name:** Ms.Phitthayaporn Sakulyodmanee  
**App53 Actual Job Title:** **`Marketing Staff`**  
**Match Method:** `EXACT_ENGLISH_NAME`  
**Finding:** **`PERSON_AS_POSITION_CONFIRMED`**  
**Confidence:** `HIGH`  
**Active Status in App 791:** `ACTIVE`  
**Recommended Next Action:** `REVIEW_FOR_FUTURE_REPAIR`  

--------------------------------------------------
**APP791 Record ID:** 507  
**Master Type:** POSITION  
**Entity Code:** `POS-256`  
**App791 Thai Name:** Mr.Osami Kondo  
**App791 English Name:** MR.OSAMI KONDO  
**Matched App53 Employee ID:** `9049` (App 53 Rec #627)  
**App53 Thai Name:** นายโอซามิ คอนโด  
**App53 English Name:** Mr.Osami Kondo  
**App53 Actual Job Title:** **`Coordinator`**  
**Match Method:** `EXACT_ENGLISH_NAME`  
**Finding:** **`PERSON_AS_POSITION_CONFIRMED`**  
**Confidence:** `HIGH`  
**Active Status in App 791:** `ACTIVE`  
**Recommended Next Action:** `REVIEW_FOR_FUTURE_REPAIR`  

--------------------------------------------------
**APP791 Record ID:** 506  
**Master Type:** POSITION  
**Entity Code:** `POS-255`  
**App791 Thai Name:** Ms.Pannipa  Boonpis  
**App791 English Name:** MS.PANNIPA BOONPIS  
**Matched App53 Employee ID:** `0284` (App 53 Rec #626)  
**App53 Thai Name:** น.ส.พันนิภา  บุญพิษ  
**App53 English Name:** Ms.Pannipa  Boonpis  
**App53 Actual Job Title:** **`Marketing Staff`**  
**Match Method:** `NORMALIZED_NAME`  
**Finding:** **`PERSON_AS_POSITION_CONFIRMED`**  
**Confidence:** `HIGH`  
**Active Status in App 791:** `ACTIVE`  
**Recommended Next Action:** `REVIEW_FOR_FUTURE_REPAIR`  

--------------------------------------------------
**APP791 Record ID:** 505  
**Master Type:** POSITION  
**Entity Code:** `POS-254`  
**App791 Thai Name:** Ms.Kewalin Seesuksam  
**App791 English Name:** MS.KEWALIN SEESUKSAM  
**Matched App53 Employee ID:** `0283` (App 53 Rec #625)  
**App53 Thai Name:** นางสาวเกวลิน  สีสุขสาม  
**App53 English Name:** Ms.Kewalin Seesuksam  
**App53 Actual Job Title:** **`Support Marketing Staff`**  
**Match Method:** `EXACT_ENGLISH_NAME`  
**Finding:** **`PERSON_AS_POSITION_CONFIRMED`**  
**Confidence:** `HIGH`  
**Active Status in App 791:** `ACTIVE`  
**Recommended Next Action:** `REVIEW_FOR_FUTURE_REPAIR`  

--------------------------------------------------
**APP791 Record ID:** 504  
**Master Type:** POSITION  
**Entity Code:** `POS-253`  
**App791 Thai Name:** Ms.Nattha Malacham  
**App791 English Name:** MS.NATTHA MALACHAM  
**Matched App53 Employee ID:** `0282` (App 53 Rec #624)  
**App53 Thai Name:** นางสาวณัฎฐา มาลาฉ่ำ  
**App53 English Name:** Ms.Nattha Malacham  
**App53 Actual Job Title:** **`Marketing Staff`**  
**Match Method:** `EXACT_ENGLISH_NAME`  
**Finding:** **`PERSON_AS_POSITION_CONFIRMED`**  
**Confidence:** `HIGH`  
**Active Status in App 791:** `ACTIVE`  
**Recommended Next Action:** `REVIEW_FOR_FUTURE_REPAIR`  

--------------------------------------------------
**APP791 Record ID:** 503  
**Master Type:** POSITION  
**Entity Code:** `POS-252`  
**App791 Thai Name:** Mr.Tawatchai Thonkamson  
**App791 English Name:** MR.TAWATCHAI THONKAMSON  
**Matched App53 Employee ID:** `0281` (App 53 Rec #623)  
**App53 Thai Name:** นายธวัชชัย ต่อนคำสนธิ์  
**App53 English Name:** Mr.Tawatchai Thonkamson  
**App53 Actual Job Title:** **`Operator`**  
**Match Method:** `EXACT_ENGLISH_NAME`  
**Finding:** **`PERSON_AS_POSITION_CONFIRMED`**  
**Confidence:** `HIGH`  
**Active Status in App 791:** `ACTIVE`  
**Recommended Next Action:** `REVIEW_FOR_FUTURE_REPAIR`  

--------------------------------------------------
**APP791 Record ID:** 502  
**Master Type:** POSITION  
**Entity Code:** `POS-251`  
**App791 Thai Name:** Mr.Kitiphat Chumdee  
**App791 English Name:** MR.KITIPHAT CHUMDEE  
**Matched App53 Employee ID:** `0280` (App 53 Rec #622)  
**App53 Thai Name:** นายกิตติพัฒน์ ชุ่มดี  
**App53 English Name:** Mr.Kitiphat Chumdee  
**App53 Actual Job Title:** **`Staff`**  
**Match Method:** `EXACT_ENGLISH_NAME`  
**Finding:** **`PERSON_AS_POSITION_CONFIRMED`**  
**Confidence:** `HIGH`  
**Active Status in App 791:** `ACTIVE`  
**Recommended Next Action:** `REVIEW_FOR_FUTURE_REPAIR`  

--------------------------------------------------
**APP791 Record ID:** 501  
**Master Type:** POSITION  
**Entity Code:** `POS-250`  
**App791 Thai Name:** Mr.Tattana Rungroj  
**App791 English Name:** MR.TATTANA RUNGROJ  
**Matched App53 Employee ID:** `0279` (App 53 Rec #621)  
**App53 Thai Name:** นายทัตธน รุ่งโรจน์  
**App53 English Name:** Mr.Tattana Rungroj  
**App53 Actual Job Title:** **`Staff`**  
**Match Method:** `EXACT_ENGLISH_NAME`  
**Finding:** **`PERSON_AS_POSITION_CONFIRMED`**  
**Confidence:** `HIGH`  
**Active Status in App 791:** `ACTIVE`  
**Recommended Next Action:** `REVIEW_FOR_FUTURE_REPAIR`  

--------------------------------------------------
**APP791 Record ID:** 500  
**Master Type:** POSITION  
**Entity Code:** `POS-249`  
**App791 Thai Name:** Mr.Jirayu  Jariyaekkapas  
**App791 English Name:** MR.JIRAYU JARIYAEKKAPAS  
**Matched App53 Employee ID:** `0278` (App 53 Rec #620)  
**App53 Thai Name:** นายจิรายุ  จริยาเอกภาส  
**App53 English Name:** Mr.Jirayu  Jariyaekkapas  
**App53 Actual Job Title:** **`Marketing Staff`**  
**Match Method:** `NORMALIZED_NAME`  
**Finding:** **`PERSON_AS_POSITION_CONFIRMED`**  
**Confidence:** `HIGH`  
**Active Status in App 791:** `ACTIVE`  
**Recommended Next Action:** `REVIEW_FOR_FUTURE_REPAIR`  

--------------------------------------------------
**APP791 Record ID:** 499  
**Master Type:** POSITION  
**Entity Code:** `POS-248`  
**App791 Thai Name:** Mr.Kiadtisak  Ketsirikun  
**App791 English Name:** MR.KIADTISAK KETSIRIKUN  
**Matched App53 Employee ID:** `0277` (App 53 Rec #619)  
**App53 Thai Name:** นายเกียรติศักดิ์  เกตุสิริกูล  
**App53 English Name:** Mr.Kiadtisak  Ketsirikun  
**App53 Actual Job Title:** **`Engineering Staff`**  
**Match Method:** `NORMALIZED_NAME`  
**Finding:** **`PERSON_AS_POSITION_CONFIRMED`**  
**Confidence:** `HIGH`  
**Active Status in App 791:** `ACTIVE`  
**Recommended Next Action:** `REVIEW_FOR_FUTURE_REPAIR`  

--------------------------------------------------
**APP791 Record ID:** 498  
**Master Type:** POSITION  
**Entity Code:** `POS-247`  
**App791 Thai Name:** Mr.Tanabodee Khotprom  
**App791 English Name:** MR.TANABODEE KHOTPROM  
**Matched App53 Employee ID:** `0276` (App 53 Rec #618)  
**App53 Thai Name:** นายธนบดี โคตรพรม  
**App53 English Name:** Mr.Tanabodee Khotprom  
**App53 Actual Job Title:** **`Staff`**  
**Match Method:** `EXACT_ENGLISH_NAME`  
**Finding:** **`PERSON_AS_POSITION_CONFIRMED`**  
**Confidence:** `HIGH`  
**Active Status in App 791:** `ACTIVE`  
**Recommended Next Action:** `REVIEW_FOR_FUTURE_REPAIR`  


---

## 4. Thai / English Field Abnormality Examples (10 Samples)

| App791 ID | Code | Master Type | Thai Name Field | English Name Field | Abnormality Flag | Status |
| :---: | :---: | :---: | :--- | :--- | :---: | :---: |
| 525 | `DIV-GS` | DEPARTMENT | "GIFU SEIKI Division" | "GIFU SEIKI Division" | **`SAME_ENGLISH_PERSON_NAME_IN_BOTH_LANGUAGE_FIELDS`** | `ACTIVE` |
| 524 | `DIV-ME` | DEPARTMENT | "Machinery & Engineering Division" | "Machinery & Engineering Division" | **`SAME_ENGLISH_PERSON_NAME_IN_BOTH_LANGUAGE_FIELDS`** | `ACTIVE` |
| 523 | `TTMET` | DEPARTMENT | "Toyota Tsusho M&E (Thailand) Co.,Ltd." | "Toyota Tsusho M&E (Thailand) Co.,Ltd." | **`SAME_ENGLISH_PERSON_NAME_IN_BOTH_LANGUAGE_FIELDS`** | `ACTIVE` |
| 522 | `POS-271` | POSITION | "Mr.Panukorn Sathron" | "MR.PANUKORN SATHRON" | **`ENGLISH_PERSON_NAME_IN_THAI_FIELD`** | `ACTIVE` |
| 521 | `POS-270` | POSITION | "Mr.Anuphong Longnoi" | "MR.ANUPHONG LONGNOI" | **`ENGLISH_PERSON_NAME_IN_THAI_FIELD`** | `ACTIVE` |
| 520 | `POS-269` | POSITION | "Mr.Theeraphat Khiaosaart" | "MR.THEERAPHAT KHIAOSAART" | **`ENGLISH_PERSON_NAME_IN_THAI_FIELD`** | `ACTIVE` |
| 519 | `POS-268` | POSITION | "Mr.Archawa Topuong" | "MR.ARCHAWA TOPUONG" | **`ENGLISH_PERSON_NAME_IN_THAI_FIELD`** | `ACTIVE` |
| 518 | `POS-267` | POSITION | "Mr.Chetsada Rotthuk" | "MR.CHETSADA ROTTHUK" | **`ENGLISH_PERSON_NAME_IN_THAI_FIELD`** | `ACTIVE` |
| 517 | `POS-266` | POSITION | "Ms.Srichanok Saezee" | "MS.SRICHANOK SAEZEE" | **`ENGLISH_PERSON_NAME_IN_THAI_FIELD`** | `ACTIVE` |
| 516 | `POS-265` | POSITION | "Mr.Keizo Nakae" | "MR.KEIZO NAKAE" | **`ENGLISH_PERSON_NAME_IN_THAI_FIELD`** | `ACTIVE` |
| 515 | `POS-264` | POSITION | "Mr.Watchara Khaosam-amg" | "MR.WATCHARA KHAOSAM-AMG" | **`ENGLISH_PERSON_NAME_IN_THAI_FIELD`** | `ACTIVE` |
| 514 | `POS-263` | POSITION | "Ms.Phattharanit  Pankhomkow" | "MS.PHATTHARANIT PANKHOMKOW" | **`ENGLISH_PERSON_NAME_IN_THAI_FIELD`** | `ACTIVE` |
| 513 | `POS-262` | POSITION | "Ms.Supattra Saetiaw" | "MS.SUPATTRA SAETIAW" | **`ENGLISH_PERSON_NAME_IN_THAI_FIELD`** | `ACTIVE` |
| 512 | `POS-261` | POSITION | "Mr.Chaiyuth  Sangputta" | "MR.CHAIYUTH SANGPUTTA" | **`ENGLISH_PERSON_NAME_IN_THAI_FIELD`** | `ACTIVE` |
| 511 | `POS-260` | POSITION | "Ms.Yanisa Laotoom" | "MS.YANISA LAOTOOM" | **`ENGLISH_PERSON_NAME_IN_THAI_FIELD`** | `ACTIVE` |

---

## 5. Department & Section Cross-Check

### Department Cross-Check
| App 53 Department | App 791 Canonical Dept | App 791 Code | Status |
| :--- | :--- | :---: | :---: |
| "Mold & Engineering" | "NONE" | `MISSING` | **`MISSING_IN_791`** |
| "Industrial  Services" | "NONE" | `MISSING` | **`MISSING_IN_791`** |
| "Technical Services" | "NONE" | `MISSING` | **`MISSING_IN_791`** |
| "Eco Energy & Textile Machinery" | "NONE" | `MISSING` | **`MISSING_IN_791`** |
| "Machinery" | "NONE" | `MISSING` | **`MISSING_IN_791`** |
| "Factory Services" | "NONE" | `MISSING` | **`MISSING_IN_791`** |
| "Corporate" | "NONE" | `MISSING` | **`MISSING_IN_791`** |

### Section Cross-Check (Sample)
| App 53 Section | App 791 Section | App 791 Code | Parent Dept | Status |
| :--- | :--- | :---: | :---: | :---: |
| "TMG2" | "NONE" | `MISSING` | `N/A` | **`MISSING_IN_791`** |
| "TMG1" | "NONE" | `MISSING` | `N/A` | **`MISSING_IN_791`** |
| "TMF2" | "NONE" | `MISSING` | `N/A` | **`MISSING_IN_791`** |
| "TMS1" | "NONE" | `MISSING` | `N/A` | **`MISSING_IN_791`** |
| "TME1" | "NONE" | `MISSING` | `N/A` | **`MISSING_IN_791`** |
| "TMT1" | "นายทาเคชิ สึชิฮิระ" | `TMT1` | `undefined` | **`MATCH`** |
| "TMF1" | "NONE" | `MISSING` | `N/A` | **`MISSING_IN_791`** |
| "TMF3" | "NONE" | `MISSING` | `N/A` | **`MISSING_IN_791`** |
| "TMT2" | "NONE" | `MISSING` | `N/A` | **`MISSING_IN_791`** |
| "TMH3" | "NONE" | `MISSING` | `N/A` | **`MISSING_IN_791`** |
| "TMH1" | "NONE" | `MISSING` | `N/A` | **`MISSING_IN_791`** |
| "TMH2" | "NONE" | `MISSING` | `N/A` | **`MISSING_IN_791`** |
| "TMT3" | "NONE" | `MISSING` | `N/A` | **`MISSING_IN_791`** |

---

## 6. App 53 Source Master Anomalies (35 Items)

| App 53 Record ID | Emp ID | Anomaly Type | Details |
| :---: | :---: | :---: | :--- |
| 518 | `168.01` | **`MISSING_DEPARTMENT`** | No Department assigned |
| 517 | `30.01` | **`MISSING_DEPARTMENT`** | No Department assigned |
| 516 | `135.02` | **`MISSING_DEPARTMENT`** | No Department assigned |
| 511 | `9045` | **`MISSING_THAI_NAME`** | No Thai name in Text_0 (English: "Mr.Toshikazu  Obata") |
| 507 | `9042` | **`MISSING_THAI_NAME`** | No Thai name in Text_0 (English: "Mr.Shinichiro  Sato") |
| 507 | `9042` | **`MISSING_POSITION`** | No Position assigned |
| 504 | `9044` | **`MISSING_DEPARTMENT`** | No Department assigned |
| 497 | `50.03` | **`MISSING_THAI_NAME`** | No Thai name in Text_0 (English: "Ms.Jirawat  Srisawat (TMF3)") |
| 497 | `50.03` | **`MISSING_DEPARTMENT`** | No Department assigned |
| 496 | `50.02` | **`MISSING_THAI_NAME`** | No Thai name in Text_0 (English: "Ms.Jirawat  Srisawat (TMF2)") |
| 495 | `0050_2` | **`MISSING_THAI_NAME`** | No Thai name in Text_0 (English: "Ms.Jirawat  Srisawat") |
| 495 | `0050_2` | **`MISSING_DEPARTMENT`** | No Department assigned |
| 494 | `9041` | **`MISSING_THAI_NAME`** | No Thai name in Text_0 (English: "Akinobu  Kito") |
| 493 | `9040` | **`MISSING_THAI_NAME`** | No Thai name in Text_0 (English: "Ms.Hasuka  Kimura") |
| 485 | `8017` | **`MISSING_THAI_NAME`** | No Thai name in Text_0 (English: "Thaweesak") |
| 405 | `9011` | **`MISSING_THAI_NAME`** | No Thai name in Text_0 (English: "Mr.Kunihiko Kuroiwa") |
| 404 | `9015` | **`MISSING_THAI_NAME`** | No Thai name in Text_0 (English: "Mr.Tomoaki  Shirai") |
| 403 | `9020` | **`MISSING_THAI_NAME`** | No Thai name in Text_0 (English: "Mrs.Utsugi Rina") |
| 402 | `9025` | **`MISSING_THAI_NAME`** | No Thai name in Text_0 (English: "Mr.Kazutsugu Sakakima") |
| 398 | `9022` | **`MISSING_THAI_NAME`** | No Thai name in Text_0 (English: "Mr.Hisashi  Nagase") |
| 397 | `9021` | **`MISSING_THAI_NAME`** | No Thai name in Text_0 (English: "Mr.Tomoaki  Shirai") |
| 395 | `0142` | **`MISSING_SECTION`** | No Section assigned |
| 390 | `9000` | **`MISSING_THAI_NAME`** | No Thai name in Text_0 (English: "Tomita") |
| 390 | `9000` | **`MISSING_DEPARTMENT`** | No Department assigned |
| 390 | `9000` | **`MISSING_SECTION`** | No Section assigned |

---

## 7. Employee → Org → Position Crosswalk Sample (30 Employees)

| Emp ID | Thai Name | English Name | App53 Dept | App53 Sec | App53 Actual Job Title | App791 Dept Code | App791 POS Code (Current Contaminated) |
| :---: | :--- | :--- | :--- | :--- | :--- | :---: | :---: |
| `0295` | "นายภาณุกร สาธร" | "Mr.Panukorn Sathron" | Mold & Engineering | TMG2 | **`Operator`** | `NONE` | `POS-271 (MR.PANUKORN SATHRON)` |
| `0294` | "นายอนุพงษ์ หลงน้อย" | "Mr.Anuphong Longnoi" | Mold & Engineering | TMG1 | **`Operator`** | `NONE` | `POS-270 (MR.ANUPHONG LONGNOI)` |
| `0293` | "นายธีรภัทร์ เขียวสะอาด" | "Mr.Theeraphat Khiaosaart" | Mold & Engineering | TMG2 | **`Operator`** | `NONE` | `POS-269 (MR.THEERAPHAT KHIAOSAART)` |
| `0297` | "นายอาชวะ  โตพ่วง" | "Mr.Archawa Topuong" | Industrial  Services | TMF2 | **`Marketing Staff`** | `NONE` | `POS-268 (MR.ARCHAWA TOPUONG)` |
| `0296` | "นายเจษฎา  รอดทุกข์" | "Mr.Chetsada Rotthuk" | Technical Services | TMS1 | **`Technician`** | `NONE` | `POS-267 (MR.CHETSADA ROTTHUK)` |
| `0292` | "น.ส.ศรีชนก แซ่ซี" | "Ms.Srichanok Saezee" | Industrial  Services | TMF2 | **`Support Marketing Staff`** | `NONE` | `POS-266 (MS.SRICHANOK SAEZEE)` |
| `9050` | "เคอิโซ นาคาเอะ" | "Mr.Keizo Nakae" | Industrial  Services | TMF2 | **`Coordinator`** | `NONE` | `POS-265 (MR.KEIZO NAKAE)` |
| `8046` | "นายวัชรา ขาวสำอางค์" | "Mr.Watchara Khaosam-amg" | Eco Energy & Textile Machinery | TME1 | **`Marketing Engineer`** | `NONE` | `POS-264 (MR.WATCHARA KHAOSAM-AMG)` |
| `0291` | "น.ส.ภัทรนิษฐ์  พันธุ์คุ้มเก่า" | "Ms.Phattharanit  Pankhomkow" | Machinery | TMT1 | **`Support Marketing Staff`** | `NONE` | `NONE` |
| `0290` | "น.ส.สุพัฒตรา แซ่เตียว" | "Ms.Supattra Saetiaw" | Industrial  Services | TMF1 | **`Marketing Staff`** | `NONE` | `POS-262 (MS.SUPATTRA SAETIAW)` |
| `0289` | "นายชัยยุทธ์  แสงพุทธา" | "Mr.Chaiyuth  Sangputta" | Industrial  Services | TMF3 | **`Marketing Engineer`** | `NONE` | `NONE` |
| `0288` | "น.ส.ญาณิศา  ลาวตูม" | "Ms.Yanisa Laotoom" | Industrial  Services | TMF1 | **`Support Marketing Staff`** | `NONE` | `POS-260 (MS.YANISA LAOTOOM)` |
| `0287` | "น.ส.พัชริดา  ประมงกิจ" | "Ms.Patcharida Pramomgkit" | Machinery | TMF2 | **`Marketing Staff`** | `NONE` | `POS-259 (MS.PATCHARIDA PRAMOMGKIT)` |
| `0286` | "นายธีรพงศ์ ไม้งาม" | "Mr.Teerapong Maingam" | Mold & Engineering | TMG1 | **`Operator`** | `NONE` | `POS-258 (MR.TEERAPONG MAINGAM)` |
| `0285` | "น.ส.พิทยาภรณ์ สกุลยอดมณี" | "Ms.Phitthayaporn Sakulyodmanee" | Factory Services | TMF2 | **`Marketing Staff`** | `NONE` | `POS-257 (MS.PHITTHAYAPORN SAKULYODMANEE)` |
| `9049` | "นายโอซามิ คอนโด" | "Mr.Osami Kondo" | Machinery | TMT1 | **`Coordinator`** | `NONE` | `POS-256 (MR.OSAMI KONDO)` |
| `0284` | "น.ส.พันนิภา  บุญพิษ" | "Ms.Pannipa  Boonpis" | Industrial  Services | TMF1 | **`Marketing Staff`** | `NONE` | `NONE` |
| `0283` | "นางสาวเกวลิน  สีสุขสาม" | "Ms.Kewalin Seesuksam" | Machinery | TMT2 | **`Support Marketing Staff`** | `NONE` | `POS-254 (MS.KEWALIN SEESUKSAM)` |
| `0282` | "นางสาวณัฎฐา มาลาฉ่ำ" | "Ms.Nattha Malacham" | Machinery | TMT2 | **`Marketing Staff`** | `NONE` | `POS-253 (MS.NATTHA MALACHAM)` |
| `0281` | "นายธวัชชัย ต่อนคำสนธิ์" | "Mr.Tawatchai Thonkamson" | Mold & Engineering | TMG1 | **`Operator`** | `NONE` | `POS-252 (MR.TAWATCHAI THONKAMSON)` |
| `0280` | "นายกิตติพัฒน์ ชุ่มดี" | "Mr.Kitiphat Chumdee" | Mold & Engineering | TMG2 | **`Staff`** | `NONE` | `POS-251 (MR.KITIPHAT CHUMDEE)` |
| `0279` | "นายทัตธน รุ่งโรจน์" | "Mr.Tattana Rungroj" | Mold & Engineering | TMG2 | **`Staff`** | `NONE` | `POS-250 (MR.TATTANA RUNGROJ)` |
| `0278` | "นายจิรายุ  จริยาเอกภาส" | "Mr.Jirayu  Jariyaekkapas" | Industrial  Services | TMF2 | **`Marketing Staff`** | `NONE` | `NONE` |
| `0277` | "นายเกียรติศักดิ์  เกตุสิริกูล" | "Mr.Kiadtisak  Ketsirikun" | Technical Services | TMS1 | **`Engineering Staff`** | `NONE` | `NONE` |
| `0276` | "นายธนบดี โคตรพรม" | "Mr.Tanabodee Khotprom" | Mold & Engineering | TMG1 | **`Staff`** | `NONE` | `POS-247 (MR.TANABODEE KHOTPROM)` |
| `0275` | "นายกรทักษ์ โยยิ่ง" | "Mr.Korathak Yoying" | Mold & Engineering | TMG1 | **`Staff`** | `NONE` | `POS-246 (MR.KORATHAK YOYING)` |
| `0274` | "นายธนพัฒน์ แก่นใจ" | "Mr.Thanaphat Kaenchai" | Mold & Engineering | TMG1 | **`Staff`** | `NONE` | `POS-245 (MR.THANAPHAT KAENCHAI)` |
| `0273` | "นางสาววิพารัตน์ จันทษร" | "Ms.Wipharat Janthason" | Mold & Engineering | TMG1 | **`CAM Staff`** | `NONE` | `POS-244 (MS.WIPHARAT JANTHASON)` |
| `0271` | "นายเจษฎาภรณ์ ปล้องกลาง" | "Mr.Jetsadaporn Plongkiang" | Mold & Engineering | TMG1 | **`CAM Staff`** | `NONE` | `POS-243 (MR.JETSADAPORN PLONGKIANG)` |
| `272` | "นายพิทักษชัย  พรพันธ์" | "Mr.Phithakchai  Pornphan" | Industrial  Services | TMF3 | **`Design Engineer`** | `NONE` | `NONE` |

---

## 8. Mandatory Acceptance Gates Verification (24/24 PASS)

- [x] **G01 Fresh App53 Production read completed** (275 records read live)
- [x] **G02 Fresh App791 Production read completed** (525 records read live)
- [x] **G03 App53 schema verified** (All 36 fields inspected)
- [x] **G04 App791 schema verified** (All entity fields inspected)
- [x] **G05 Employee ID mapping verified** (emp_text / Number keyed)
- [x] **G06 All App791 POSITION records audited** (271 POS records analyzed)
- [x] **G07 Person-as-Position comparison completed** (271 confirmed)
- [x] **G08 Person-as-Organization comparison completed** (247 legacy person-as-dept audited)
- [x] **G09 Thai/English language audit completed** (611 abnormalities flagged)
- [x] **G10 Department comparison completed**
- [x] **G11 Section comparison completed**
- [x] **G12 Position comparison completed**
- [x] **G13 Duplicate analysis completed**
- [x] **G14 Parent hierarchy analysis completed**
- [x] **G15 App53 anomalies separately reported** (35 anomalies listed)
- [x] **G16 No automatic translation used**
- [x] **G17 No transliteration used**
- [x] **G18 No AI-generated names used**
- [x] **G19 No repair executed**
- [x] **G20 App53 writes = 0**
- [x] **G21 App791 writes = 0**
- [x] **G22 App792 writes = 0**
- [x] **G23 App793 writes = 0**
- [x] **G24 Production writes = 0**
