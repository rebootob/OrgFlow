# EMPLOYEE NAMELIST — PRODUCTION DISCOVERY REPORT

## 1. Executive Summary & App Metadata
- **App Name:** Employee Namelist
- **App ID:** 53
- **App Revision:** 1
- **Target Domain:** https://ttmet.cybozu.com
- **Total Active Records:** 275
- **Total Form Fields:** 44
- **Read-Only Verification:** **PASS (100% Non-destructive execution)**
- **Production Configuration Modified:** **NO (0 App Settings Changes)**

---

## 2. Complete Form Field Metadata Table

| Label (Display Name) | Field Code | Kintone Type | Required | Unique | Lookup | Attachment | Classification |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **Expiry Date** | `Expiry_Date` | DATE | No | No | No | No | `DATE` |
| **Training Summary Report** | `Related_records` | REFERENCE_TABLE | No | No | No | No | `REFERENCE_TABLE` |
| **บิดา** | `father` | SINGLE_LINE_TEXT | No | No | No | No | `SINGLE_LINE_TEXT` |
| **Section Name** | `Drop_down_1` | DROP_DOWN | No | No | No | No | `DROP_DOWN` |
| **Team** | `Drop_down_2` | DROP_DOWN | No | No | No | No | `DROP_DOWN` |
| **Attachment** | `Attachment` | FILE | No | No | No | **YES** | `FILE` |
| **Updated by** | `Updated_by` | MODIFIER | No | No | No | No | `MODIFIER` |
| **Departmant** | `Drop_down_0` | DROP_DOWN | No | No | No | No | `DROP_DOWN` |
| **มารดา** | `mother` | SINGLE_LINE_TEXT | No | No | No | No | `SINGLE_LINE_TEXT` |
| **Created datetime** | `Created_datetime` | CREATED_TIME | No | No | No | No | `CREATED_TIME` |
| **Branch** | `Radio_button` | RADIO_BUTTON | Yes | No | No | No | `RADIO_BUTTON` |
| **Gender** | `Radio_button_0` | RADIO_BUTTON | Yes | No | No | No | `RADIO_BUTTON` |
| **Code** | `Number` | NUMBER | No | No | No | No | `NUMBER` |
| **Related records** | `Related_records_1` | REFERENCE_TABLE | No | No | No | No | `REFERENCE_TABLE` |
| **Record number** | `Record_number` | RECORD_NUMBER | No | No | No | No | `RECORD_NUMBER` |
| **site_id** | `Text_8` | SINGLE_LINE_TEXT | No | No | No | No | `SINGLE_LINE_TEXT` |
| **Vendor Account Number** | `Text_6` | SINGLE_LINE_TEXT | No | No | No | No | `SINGLE_LINE_TEXT` |
| **Private Car Driving Licence** | `Private_Car_Driving_Licence_0` | RADIO_BUTTON | Yes | No | No | No | `RADIO_BUTTON` |
| **บุตรคนที่ 2** | `second_child` | SINGLE_LINE_TEXT | No | No | No | No | `SINGLE_LINE_TEXT` |
| **Created by** | `Created_by` | CREATOR | No | No | No | No | `CREATOR` |
| **Name - Surname/Section** | `Text_7` | SINGLE_LINE_TEXT | No | No | No | No | `SINGLE_LINE_TEXT` |
| **Email** | `Text_4` | SINGLE_LINE_TEXT | No | No | No | No | `SINGLE_LINE_TEXT` |
| **Section** | `Drop_down` | DROP_DOWN | No | No | No | No | `DROP_DOWN` |
| **Bill Splitting** | `Text_5` | SINGLE_LINE_TEXT | No | No | No | No | `SINGLE_LINE_TEXT` |
| **Position** | `Text_2` | SINGLE_LINE_TEXT | No | No | No | No | `SINGLE_LINE_TEXT` |
| **Section Name-o** | `Text_3` | SINGLE_LINE_TEXT | No | No | No | No | `SINGLE_LINE_TEXT` |
| **Status** | `Status` | STATUS | No | No | No | No | `STATUS` |
| **ชื่อ - นามสกุล** | `Text_0` | SINGLE_LINE_TEXT | No | No | No | No | `SINGLE_LINE_TEXT` |
| **Assignee** | `Assignee` | STATUS_ASSIGNEE | No | No | No | No | `STATUS_ASSIGNEE` |
| **Nickname** | `Text_1` | SINGLE_LINE_TEXT | No | No | No | No | `SINGLE_LINE_TEXT` |
| **Mobile** | `Text_11` | SINGLE_LINE_TEXT | No | No | No | No | `SINGLE_LINE_TEXT` |
| **Categories** | `Categories` | CATEGORY | No | No | No | No | `CATEGORY` |
| **Internal No.** | `Text_12` | SINGLE_LINE_TEXT | No | No | No | No | `SINGLE_LINE_TEXT` |
| **Employee ID** | `emp_text` | SINGLE_LINE_TEXT | No | No | No | No | `SINGLE_LINE_TEXT` |
| **Name - Surname** | `Text` | SINGLE_LINE_TEXT | No | No | No | No | `SINGLE_LINE_TEXT` |
| **Related records** | `Related_records_0` | REFERENCE_TABLE | No | No | No | No | `REFERENCE_TABLE` |
| **Start Date** | `Date` | DATE | No | No | No | No | `DATE` |
| **Department's Hoshin** | `Text_area` | MULTI_LINE_TEXT | No | No | No | No | `MULTI_LINE_TEXT` |
| **Updated datetime** | `Updated_datetime` | UPDATED_TIME | No | No | No | No | `UPDATED_TIME` |
| **Status** | `Number_0` | NUMBER | No | No | No | No | `NUMBER` |
| **คู่สมรส** | `Spouse` | SINGLE_LINE_TEXT | No | No | No | No | `SINGLE_LINE_TEXT` |
| **บุตรคนที่ 3** | `third_child` | SINGLE_LINE_TEXT | No | No | No | No | `SINGLE_LINE_TEXT` |
| **Section's Hoshin** | `Text_area_0` | MULTI_LINE_TEXT | No | No | No | No | `MULTI_LINE_TEXT` |
| **บุตรคนที่ 1** | `first_child` | SINGLE_LINE_TEXT | No | No | No | No | `SINGLE_LINE_TEXT` |

---

## 3. Employee Key Candidate & Data Quality
- **Candidate Key Field:** `emp_text` (Label: "Employee ID")
- **Unique Setting:** **NO**
- **Total Records Evaluated:** 275
- **Empty Key Records:** 79
- **Duplicate Key Records:** 1

---

## 4. Sensitive Field Candidates
- **site_id** (`Text_8` - SINGLE_LINE_TEXT)
- **Employee ID** (`emp_text` - SINGLE_LINE_TEXT)

---

## 5. Baseline Backup Summary
- **Backup Location:** `secure-backup/baseline_app_53_1787375575845/`
- **Records File:** `records_baseline.json` & `records_baseline.csv`
- **Manifest File:** `EMPLOYEE_NAMELIST_BASELINE_MANIFEST.json`
