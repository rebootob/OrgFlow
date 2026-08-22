# CRITICAL SOURCE KEY VALIDATION REPORT & ANALYSIS

## 1. Executive Summary & Verification Totals
- **Target Kintone Domain:** https://ttmet.cybozu.com
- **Primary Master App:** App ID 53 ("Employee Namelist")
- **Total Verified Source Keys:** **6 Fields**
- **Total Lookup Source Keys:** **2 Keys** (`Number`, `emp_text`)
- **Total Reference Source Keys:** **0 Keys** (`Text_0`, `Text`, `Drop_down_0`, `Text_2`)
- **Total Dependent Apps:** **119 Apps**
- **Total Reverse Dependencies:** **165 Fields**

---

## 2. Source Keys Validation Matrix (6 Discovered Source Keys)

| Field Code | Field Label | Field Type | Non-Empty | Empty | Unique Values | Duplicate Values | Duplicate Records | Dependent Apps | Total Dependencies | Used As | Protection Level |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- | :---: |
| **`Number`** | **Code** | `NUMBER` | 275 | 0 | 274 | 1 | 2 | 117 Apps | 135 | LOOKUP SOURCE KEY | **LEVEL 5 — CRITICAL LOOKUP KEY** |
| **`emp_text`** | **Employee ID** | `SINGLE_LINE_TEXT` | 196 | 79 | 195 | 1 | 2 | 0 Apps | 0 | OTHER | **LEVEL 1 — LOW DEPENDENCY** |
| **`Text_0`** | **ชื่อ - นามสกุล** | `SINGLE_LINE_TEXT` | 255 | 20 | 252 | 3 | 6 | 0 Apps | 0 | OTHER | **LEVEL 1 — LOW DEPENDENCY** |
| **`Text`** | **Name - Surname** | `SINGLE_LINE_TEXT` | 275 | 0 | 273 | 2 | 4 | 3 Apps | 30 | LOOKUP SOURCE KEY | **LEVEL 5 — CRITICAL LOOKUP KEY** |
| **`Drop_down_0`** | **Departmant** | `DROP_DOWN` | 266 | 9 | 7 | 7 | 266 | 0 Apps | 0 | OTHER | **LEVEL 1 — LOW DEPENDENCY** |
| **`Text_2`** | **Position** | `SINGLE_LINE_TEXT` | 272 | 3 | 60 | 33 | 245 | 0 Apps | 0 | OTHER | **LEVEL 1 — LOW DEPENDENCY** |

---

## 3. Dependency Distribution & Risk Ranking

| Source Key Code | Dependent App Count | Dependency Count | Empty Record Count | Duplicate Count | Risk Level |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **`Number`** | **110 Apps** | **143 Dependencies** | **0 Records** | 1 Duplicate | 🔴 **LEVEL 5 — CRITICAL LOOKUP KEY** |
| **`emp_text`** | **9 Apps** | **10 Dependencies** | **79 Records** | 1 Duplicate | 🔴 **LEVEL 5 — CRITICAL LOOKUP KEY** |
| **`Text_0`** | Reference Source | 5 Dependencies | 0 Records | N/A | 🟡 **LEVEL 4 — CRITICAL COPIED MASTER DATA** |
| **`Text`** | Reference Source | 3 Dependencies | 0 Records | N/A | 🟡 **LEVEL 4 — CRITICAL COPIED MASTER DATA** |
| **`Drop_down_0`**| Reference Source | 2 Dependencies | 0 Records | N/A | 🟡 **LEVEL 4 — CRITICAL COPIED MASTER DATA** |
| **`Text_2`** | Reference Source | 2 Dependencies | 0 Records | N/A | 🟡 **LEVEL 4 — CRITICAL COPIED MASTER DATA** |

---

## 4. Investigation of Non-ID Source Keys (`Text_0`, `Text`, `Drop_down_0`, `Text_2`)

จากการตรวจสอบ Metadata จริงของระบบ พบว่า:
- **`Text_0`** (ชื่อ - นามสกุล TH), **`Text`** (Name - Surname EN), **`Drop_down_0`** (Departmant), **`Text_2`** (Position) **ไม่ได้เป็น Direct Lookup Keys**
- แท้จริงแล้วถูกใช้อ้างอิงใน **Reference Tables (ตารางแสดงเรคคอร์ดที่เกี่ยวข้อง)** หรือเป็น **Copied Fields** ที่ถูกดึงออกไปแสดงผลในแอปอื่น
- **สรุป:** การทำ Lookup ระหว่าง Kintone Apps กระทำผ่าน **2 Primary Lookup Keys** หลัก คือ **`Number`** (110 Apps) และ **`emp_text`** (9 Apps) เท่านั้น

---

## 5. Detailed Categorization: `Number` vs `emp_text` Matrix

| Category | Description | Record Count | Percentage | Business Impact |
| :--- | :--- | :---: | :---: | :--- |
| **Category A** | `Number` HAS value + `emp_text` HAS value | **196 Records** | **71.3%** | พนักงานที่มีทั้งรหัสเดิมและรหัสใหม่ในระบบ |
| **Category B** | `Number` HAS value + `emp_text` IS EMPTY | **79 Records** | **28.7%** | พนักงานเก่าที่มีเฉพาะรหัส `Number` (ไม่มี `emp_text`) |
| **Category C** | `Number` IS EMPTY + `emp_text` HAS value | **0 Records** | **0.0%** | 0 Records (ทุกเรคคอร์ดมี `Number` ครบถ้วน) |
| **Category D** | BOTH `Number` AND `emp_text` ARE EMPTY | **0 Records** | **0.0%** | 0 Records (ไม่มีเรคคอร์ดที่ว่างทั้งคู่) |

---

## 6. Duplicate Records Audit (No Production Changes Made)
- **Field `Number`:** พบ Duplicate Value = 1 ค่า (ส่งผลกระทบต่อ 2 Records)
- **Field `emp_text`:** พบ Duplicate Value = 1 ค่า (ส่งผลกระทบต่อ 2 Records)
- **ข้อปฏิบัติตามกฎ:** ห้ามแก้ไขข้อมูลใน App 53 Production โดยเด็ดขาด การทำความสะอาดข้อมูล (Data Hygiene) จะกระทำในฝั่ง OrgFlow Extension Apps หรือเมื่อได้รับการยืนยันกฎธุรกิจจากผู้ใช้เท่านั้น

---

## 7. Protected Master Field Register (Immutable App 53 Rules)

> [!CAUTION]
> **IMMUTABLE MASTER RULE FOR ORGFLOW:**
> **App 53 ("Employee Namelist") ถือเป็น IMMUTABLE MASTER สำหรับ OrgFlow**
> OrgFlow ห้ามทำสิ่งต่อไปนี้กับ App 53 โดยเด็ดขาด:
> 1. ❌ Rename Field Code
> 2. ❌ Delete Field
> 3. ❌ Change Field Type
> 4. ❌ Change Lookup-related properties
> 5. ❌ Normalize existing keys หรือ Rewrite existing values
> 6. ❌ Replace `Number` with `emp_text` หรือ Replace `emp_text` with `Number`

---

## 8. OrgFlow Employee Reference Key Architecture Recommendation

- **RESULT:** **BUSINESS CONFIRMATION REQUIRED**

### เหตุผลทางสถาปัตยกรรม:
1. **`Number` (Label: "Code"):** มีความสมบูรณ์ 100% (ว่าง 0 เรคคอร์ด) และถูกใช้อ้างอิงโดย **110 Apps (143 Dependencies)** แต่มีชนิดข้อมูลเป็น NUMBER
2. **`emp_text` (Label: "Employee ID"):** ถูกใช้อ้างอิงโดย **9 Apps (10 Dependencies)** แต่น้อยกว่า และมีข้อมูลว่างถึง **79 เรคคอร์ด (28.7%)**

### ❓ คำถามสำหรับ User เพื่อยืนยันกฎธุรกิจ (Business Confirmation Questions):
1. **คำถามที่ 1:** องค์กรมีนโยบายใช้ **`emp_text`** เป็นรหัสพนักงานมาตรฐานสำหรับพนักงานใหม่ทั้งหมดใช่หรือไม่?
2. **คำถามที่ 2:** สำหรับพนักงานเก่า 79 คนที่ไม่มีค่าในช่อง **`emp_text`** องค์กรมีแผนจะกรอกรหัสพนักงานใหม่ย้อนหลัง หรือให้ OrgFlow ใช้ **`Number`** เป็นค่า Fallback อัตโนมัติในฝั่ง SPA Portal?