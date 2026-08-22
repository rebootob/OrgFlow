# COMPLETE REVERSE DEPENDENCY MAP & PRODUCTION KEY ANALYSIS

## 1. Executive Metrics & Summary
- **Target Kintone Domain:** https://ttmet.cybozu.com
- **Primary Master App:** App ID 53 ("Employee Namelist")
- **Total Accessible Apps Scanned:** 268
- **Total Form Fields Inspected:** 9289
- **Total Apps Depending on App 53:** **119 Apps**
- **Total Lookup / Reference Dependencies Found:** **165 Fields**
- **Unique Source Keys Utilized in App 53:** `Number`, `Text`

---

## 2. Complete Reverse Dependency Matrix

| Dependent App ID | Dependent App Name | Lookup Field Code (Label) | Source Key in App 53 | Copied Fields Summary | Verification Source | Risk Level |
| :---: | :--- | :--- | :---: | :--- | :---: | :---: |
| **20** | **Visiting Report** | `Lookup` ("Create By /Staff's ID") | **`Number`** | `Text_0` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **96** | **Report  Incidence  Case ( For IT )** | `customer_lookup` ("Emp ID") | **`Number`** | `Text_4` <- `Text`, `section` <- `Drop_down`, `Text_1` <- `Text_2`, `Text_3` <- `Drop_down_0`, `Text_6` <- `Drop_down_1` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **98** | **REQUEST FOR HOLIDAY AND OVERNIGHT (GA )** | `Lookup` ("Staff's ID /  รหัสพนักงาน") | **`Number`** | `Text_0` <- `Text`, `Text_2` <- `Drop_down`, `Text_5` <- `Text_2`, `Text_7` <- `Drop_down_2` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **99** | **Training Request- ( H2 )** | `Lookup` ("Emp.code / รหัส") | **`Number`** | `Text` <- `Text`, `Text_0` <- `Drop_down`, `Text_1` <- `Text_2`, `Text_2` <- `Text_4`, `Team` <- `Drop_down_2` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **104** | **PPE Request Form** | `Lookup` ("EMP.CODE. / รหัสพนักงาน") | **`Number`** | `Text` <- `Text`, `Text_0` <- `Drop_down`, `Text_1` <- `Text_2`, `Text_6` <- `Text_4`, `Text_7` <- `Text_6`, `Team` <- `Drop_down_2` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **107** | **Toyota Visiting Report- ( A2 )** | `Lookup` ("Emp ID") | **`Number`** | `Text` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **106** | **Man Power Requistion Form /แบบขออนุมัติกำลัง** | `Lookup` ("Emp.code / รหัส") | **`Number`** | `Text` <- `Text`, `Text_0` <- `Drop_down`, `Text_1` <- `Text_2`, `Text_2` <- `Text_4`, `Team` <- `Drop_down_2` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **106** | **Man Power Requistion Form /แบบขออนุมัติกำลัง** | `Lookup_0` ("Emp.code / รหัส") | **`Number`** | `Text_6` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **106** | **Man Power Requistion Form /แบบขออนุมัติกำลัง** | `Lookup_1` ("Emp.code / รหัส") | **`Number`** | `Text_5` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **113** | **Request  Mobile  phone  or  Pocket  Wifi** | `Lookup` ("Staff's ID /  รหัสพนักงาน") | **`Number`** | `Text_0` <- `Text`, `Text_2` <- `Drop_down`, `Text_5` <- `Text_2`, `Text_8` <- `Drop_down_2` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **114** | **Printing  name  card  form** | `Lookup` ("Staff's ID /  รหัสพนักงาน") | **`Number`** | `Text_0` <- `Text`, `Text_2` <- `Drop_down`, `Text_4` <- `Text_2`, `Text_8` <- `Text_4`, `Text_5` <- `Drop_down_1`, `Text_6` <- `Drop_down_0`, `Text_1` <- `Text_0`, `Text_3` <- `Drop_down_2` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **115** | **Request Air Ticket Booking / จองตั๋วเครื่องบิน (GA)** | `Lookup_0` ("Emp.Code / รหัสพนักงาน") | **`Number`** | `Text_10` <- `Text`, `Text_11` <- `Text_2`, `Text_14` <- `Drop_down`, `Team` <- `Drop_down_2` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **119** | **Request Hotel Booking (GA)** | `Lookup` ("Staff's ID / รหัสพนักงาน") | **`Number`** | `Text_0` <- `Text`, `Text_5` <- `Text_2`, `Text_9` <- `Drop_down`, `Team` <- `Drop_down_2` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **120** | **REQUEST RENTAL CAR & DRIVER (GA)** | `Lookup` ("Staff's ID / รหัสพนักงาน") | **`Number`** | `Text_0` <- `Text`, `Text_5` <- `Text_2`, `Text_6` <- `Drop_down`, `Text_7` <- `Text_4`, `Team` <- `Drop_down_2` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **139** | **SLIP FOR WELFARE / สำหรับเบิกสวัสดิการ** | `Lookup` ("EMP.CODE. / รหัสพนักงาน") | **`Number`** | `Text` <- `Text`, `Text_0` <- `Drop_down`, `Text_1` <- `Text_2`, `Text_2` <- `Text_6`, `Number` <- `Number`, `Number_0` <- `Number_0`, `Text_8` <- `Drop_down_2`, `Text_4` <- `Text_5` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **161** | **SLIP FOR ENTERTAIN** | `Lookup` ("EMP.CODE. / รหัสพนักงาน") | **`Number`** | `Text` <- `Text`, `Text_0` <- `Drop_down`, `Text_1` <- `Text_2`, `Text_2` <- `Text_6`, `Number` <- `Number`, `Number_0` <- `Number_0`, `Text_8` <- `Drop_down_2`, `Text_4` <- `Text_5` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **163** | **SLIP FOR COST / สำหรับเบิกเพื่อซื้อสินค้ามาขาย** | `Lookup` ("EMP.CODE. / รหัสพนักงาน") | **`Number`** | `Text` <- `Text`, `Text_0` <- `Drop_down`, `Text_1` <- `Text_2`, `Text_2` <- `Text_6`, `Number` <- `Number`, `Team` <- `Drop_down_2` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **164** | **SLIP FOR OTHERS EXPENSE / สำหรับเบิกค่าใช้จ่ายอื่นๆ** | `Lookup` ("EMP.CODE. / รหัสพนักงาน") | **`Number`** | `Text` <- `Text`, `Text_0` <- `Drop_down`, `Text_10` <- `Text_4`, `Text_1` <- `Text_2`, `Text_2` <- `Text_6`, `Number` <- `Number`, `Number_0` <- `Number_0`, `Text_8` <- `Drop_down_2`, `Text_7` <- `Text_5` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **166** | **Request  Bring In / Out / Return  IT Equipments** | `Lookup` ("Staff's ID /  รหัสพนักงาน") | **`Number`** | `Text_0` <- `Text`, `Text_2` <- `Drop_down`, `Text_3` <- `Text_0`, `Text_4` <- `Text_2`, `Text_5` <- `Drop_down_1`, `Text_6` <- `Drop_down_0` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **168** | **Request New Computer/ User Access /Software/System** | `Lookup` ("Staff's ID /  รหัสพนักงาน") | **`Number`** | `Text_0` <- `Text`, `Text_2` <- `Drop_down`, `Text_3` <- `Text_0`, `Text_4` <- `Text_2`, `Text_5` <- `Drop_down_1`, `Text_6` <- `Drop_down_0`, `Text_10` <- `Text_4`, `Team` <- `Drop_down_2` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **170** | **Meeting documents** | `Lookup` ("Staff's ID /  รหัสพนักงาน") | **`Number`** | `Text` <- `Text`, `Text_0` <- `Text_2`, `Text_1` <- `Text_4` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **181** | **TRAVELLING REPORT** | `Lookup` ("EMP.CODE. / รหัสพนักงาน") | **`Number`** | `Text` <- `Text`, `Text_0` <- `Drop_down`, `Text_1` <- `Text_2`, `Text_2` <- `Text_6`, `Number` <- `Number`, `Number_0` <- `Number_0`, `Text_8` <- `Drop_down_2`, `Text_6` <- `Text_5` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **185** | **OVERSEA TRAVELLING REPORT** | `Lookup` ("EMP.CODE. / รหัสพนักงาน") | **`Number`** | `Text` <- `Text`, `Text_0` <- `Drop_down`, `Text_1` <- `Text_2`, `Text_2` <- `Text_6`, `Number` <- `Number`, `Text_8` <- `Drop_down_2`, `Text_3` <- `Text_5` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **186** | **DOMESTIC TRAVELLING REPORT** | `Lookup` ("EMP.CODE. / รหัสพนักงาน") | **`Number`** | `Text` <- `Text`, `Text_0` <- `Drop_down`, `Text_10` <- `Text_4`, `Text_1` <- `Text_2`, `Text_2` <- `Text_6`, `Number` <- `Number`, `Number_0` <- `Number_0`, `Text_8` <- `Drop_down_2`, `Text_9` <- `Text_5` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **190** | **Weekly Report** | `Lookup` ("EMP.CODE. / รหัสพนักงาน") | **`Number`** | `Text` <- `Text`, `Text_0` <- `Drop_down`, `Text_10` <- `Text_4`, `Text_1` <- `Text_2`, `Text_2` <- `Text_6`, `Number` <- `Number` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **191** | **CAR BOOKING ( Calendar Colour )** | `Lookup_0` ("Lookup") | **`Number`** | `name` <- `Text`, `section` <- `Drop_down` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **192** | **CASH ON DELIVERY ( COD )** | `Lookup` ("EMP.CODE. / รหัสพนักงาน") | **`Number`** | `Text` <- `Text`, `Text_0` <- `Drop_down`, `Text_1` <- `Text_2`, `Text_2` <- `Text_6`, `Number` <- `Number`, `Team` <- `Drop_down_2` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **193** | **REMITTANCE SLIP / จ่ายต่างประเทศ** | `Lookup` ("EMP.CODE. / รหัสพนักงาน") | **`Number`** | `Text` <- `Text`, `Text_0` <- `Drop_down`, `Text_1` <- `Text_2`, `Text_2` <- `Text_6`, `Number` <- `Number`, `Text_10` <- `Drop_down_2`, `Text_3` <- `Text_5` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **204** | **COST Version 2** | `Lookup` ("EMP.CODE. / รหัสพนักงาน") | **`Number`** | `Text` <- `Text`, `Text_0` <- `Drop_down`, `Text_1` <- `Text_2`, `Text_2` <- `Text_6`, `Number` <- `Number`, `Team` <- `Drop_down_2` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **211** | **IT INVENTORY** | `Lookup` ("ID EMP") | **`Number`** | `Text_4` <- `Text`, `Text_3` <- `Drop_down`, `Text_5` <- `Text_2` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **215** | **Request Create / Edit / Delete  Application on Kintone System** | `Lookup` ("Staff's ID /  รหัสพนักงาน") | **`Number`** | `Text_0` <- `Text`, `Text_2` <- `Drop_down`, `Text_3` <- `Text_0`, `Text_4` <- `Text_2`, `Text_5` <- `Drop_down_1`, `Text_6` <- `Drop_down_0` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **215** | **Request Create / Edit / Delete  Application on Kintone System** | `Lookup_6` ("Modify By") | **`Number`** | `Text_12` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **227** | **Training Summary Report ( HR Only )** | `Lookup_0` ("Emp ID") | **`Number`** | `Text` <- `Text`, `Text_0` <- `Text_2`, `Text_1` <- `Drop_down_1` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **237** | **SLIP FOR PPE/ สำหรับเบิกอุปกรณ์เซฟตี้** | `Lookup` ("EMP.CODE. / รหัสพนักงาน") | **`Number`** | `Text` <- `Text`, `Text_0` <- `Drop_down`, `Text_10` <- `Text_4`, `Text_1` <- `Text_2`, `Text_2` <- `Text_6`, `Number` <- `Number` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **238** | **Request Gate Pass Card Or  Fingerprint Record** | `Lookup` ("Staff's ID /  รหัสพนักงาน") | **`Number`** | `Text_0` <- `Text`, `Text_2` <- `Drop_down`, `Text_3` <- `Text_0`, `Text_4` <- `Text_2`, `Text_5` <- `Drop_down_1`, `Text_6` <- `Drop_down_0`, `Text_10` <- `Text_4` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **238** | **Request Gate Pass Card Or  Fingerprint Record** | `Lookup_0` ("Lookup") | **`Number`** | `Text_14` <- `Text`, `Text_15` <- `Text_2`, `Text_16` <- `Text_3`, `Text_17` <- `Text_4` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **238** | **Request Gate Pass Card Or  Fingerprint Record** | `Lookup_2` ("Card issuer") | **`Number`** | `Text_7` <- `Text`, `Text_13` <- `Text_2`, `Text_18` <- `Drop_down` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **239** | **Gate Pass DB** | `Lookup` ("Staff's ID /  รหัสพนักงาน") | **`Number`** | `Text` <- `Text`, `Text_0` <- `Drop_down_1`, `Text_1` <- `Drop_down_0`, `Text_5` <- `Text_2`, `Text_6` <- `Text_4` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **241** | **Monthly Schedule** | `Lookup` ("Lookup") | **`Text`** | `Text` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **241** | **Monthly Schedule** | `Lookup_1` ("Lookup") | **`Text`** | `Text_4` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **243** | **PROJECT STATUS ( T3 )** | `Lookup_6` ("Lookup") | **`Text`** | `Text_17` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **243** | **PROJECT STATUS ( T3 )** | `Lookup_8` ("Lookup") | **`Text`** | `Text_10` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **243** | **PROJECT STATUS ( T3 )** | `Lookup_7` ("Lookup") | **`Text`** | `Text_18` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **243** | **PROJECT STATUS ( T3 )** | `Lookup_12` ("Lookup") | **`Text`** | `Text_21` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **243** | **PROJECT STATUS ( T3 )** | `Lookup_9` ("Lookup") | **`Text`** | `Text_11` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **243** | **PROJECT STATUS ( T3 )** | `Lookup_13` ("Lookup") | **`Text`** | `Text_28` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **243** | **PROJECT STATUS ( T3 )** | `Lookup_10` ("Lookup") | **`Text`** | `Text_19` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **243** | **PROJECT STATUS ( T3 )** | `Lookup_11` ("Lookup") | **`Text`** | `Text_20` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **243** | **PROJECT STATUS ( T3 )** | `Lookup_14` ("Lookup") | **`Text`** | `Text_30` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **243** | **PROJECT STATUS ( T3 )** | `Lookup_15` ("Lookup") | **`Text`** | `Text_31` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **243** | **PROJECT STATUS ( T3 )** | `Lookup_0` ("Lookup") | **`Text`** | `pic_main` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **243** | **PROJECT STATUS ( T3 )** | `Lookup_2` ("Lookup") | **`Text`** | `Text_5` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **243** | **PROJECT STATUS ( T3 )** | `Lookup_1` ("Lookup") | **`Text`** | `Text` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **244** | **PROJECT STATUS ( T3 )- Version 2** | `Lookup_6` ("Lookup") | **`Text`** | `Text_17` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **244** | **PROJECT STATUS ( T3 )- Version 2** | `Lookup_5` ("Case Customers contacted by telephone or email") | **`Number`** | `Text_35` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **244** | **PROJECT STATUS ( T3 )- Version 2** | `Lookup_8` ("Lookup") | **`Text`** | `Text_10` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **244** | **PROJECT STATUS ( T3 )- Version 2** | `Lookup_7` ("Lookup") | **`Text`** | `Text_18` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **244** | **PROJECT STATUS ( T3 )- Version 2** | `Lookup_12` ("Lookup") | **`Text`** | `Text_21` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **244** | **PROJECT STATUS ( T3 )- Version 2** | `Lookup_9` ("Lookup") | **`Text`** | `Text_11` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **244** | **PROJECT STATUS ( T3 )- Version 2** | `Lookup_13` ("Lookup") | **`Text`** | `Text_28` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **244** | **PROJECT STATUS ( T3 )- Version 2** | `Lookup_10` ("Lookup") | **`Text`** | `Text_19` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **244** | **PROJECT STATUS ( T3 )- Version 2** | `Lookup_11` ("Lookup") | **`Text`** | `Text_20` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **244** | **PROJECT STATUS ( T3 )- Version 2** | `Lookup_16` ("Case Get information from internal  ( Employee No)") | **`Number`** | `Text_39` <- `Text`, `Text_40` <- `Drop_down` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **244** | **PROJECT STATUS ( T3 )- Version 2** | `Lookup_17` ("Lookup") | **`Text`** | `pic_main_0` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **244** | **PROJECT STATUS ( T3 )- Version 2** | `Lookup_14` ("Lookup") | **`Text`** | `Text_30` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **244** | **PROJECT STATUS ( T3 )- Version 2** | `Lookup_15` ("Lookup") | **`Text`** | `Text_31` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **244** | **PROJECT STATUS ( T3 )- Version 2** | `Lookup_18` ("Lookup") | **`Text`** | `pic_main_1` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **244** | **PROJECT STATUS ( T3 )- Version 2** | `Lookup_0` ("Lookup") | **`Text`** | `pic_main` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **244** | **PROJECT STATUS ( T3 )- Version 2** | `Lookup_2` ("Lookup") | **`Text`** | `Text_5` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **244** | **PROJECT STATUS ( T3 )- Version 2** | `Lookup_1` ("Lookup") | **`Text`** | `Text` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **246** | **PROJECT STATUS ( T3 )- Version 3** | `Lookup_5` ("Case Customers contacted by telephone or email") | **`Number`** | `Text_35` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **246** | **PROJECT STATUS ( T3 )- Version 3** | `Lookup_8` ("PIC Assembly Part (EMP NO)") | **`Number`** | `Text_14` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **246** | **PROJECT STATUS ( T3 )- Version 3** | `Lookup_9` ("PIC  Punch List  ( VTO ) (EMP NO)") | **`Number`** | `Text_16` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **246** | **PROJECT STATUS ( T3 )- Version 3** | `Lookup_10` ("TTMET PIC (Making Punc List Chart  For Power On Test Running)") | **`Number`** | `Text_31` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **246** | **PROJECT STATUS ( T3 )- Version 3** | `Lookup_16` ("Case Get information from internal  ( Employee No)") | **`Number`** | `Text_39` <- `Text`, `Text_40` <- `Drop_down` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **246** | **PROJECT STATUS ( T3 )- Version 3** | `Lookup_0` ("Emp No") | **`Number`** | `Text_43` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **246** | **PROJECT STATUS ( T3 )- Version 3** | `Lookup_2` ("PIC Part Delivery (EMP NO)") | **`Number`** | `Text_10` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **246** | **PROJECT STATUS ( T3 )- Version 3** | `Lookup_3` ("Lookup") | **`Number`** | `Text_30` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **247** | **Request  External Media & System tools** | `Lookup` ("Staff's ID /  รหัสพนักงาน") | **`Number`** | `Text_0` <- `Text`, `Text_2` <- `Drop_down`, `Text_4` <- `Text_2`, `Text_5` <- `Drop_down_1`, `Team` <- `Drop_down_2` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **250** | **CAR BOOKING** | `Lookup` ("ID / รหัสพนักงาน") | **`Number`** | `section` <- `Drop_down`, `name` <- `Text`, `E_mail` <- `Text_4`, `Private_Car_Driving_Licence` <- `Private_Car_Driving_Licence_0`, `Expiry_Date` <- `Expiry_Date` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **253** | **Sales Control ( T3 )** | `Lookup_0` ("EMP ID ( Project Header)") | **`Number`** | `prj_head` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **255** | **DAILY REPORT ( T3 )** | `Lookup` ("EMP ID") | **`Number`** | `Text` <- `Text`, `Text_0` <- `Drop_down` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **256** | **COST ( T3 )** | `Lookup` ("EMP ID") | **`Number`** | `Text` <- `Text`, `Text_0` <- `Drop_down` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **261** | **Request Create / Edit / Delete  Application on Kintone  V2** | `Lookup` ("Staff's ID /  รหัสพนักงาน") | **`Number`** | `Text_0` <- `Text`, `Text_2` <- `Drop_down`, `Text_3` <- `Text_0`, `Text_4` <- `Text_2`, `Text_5` <- `Drop_down_1`, `Text_6` <- `Drop_down_0` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **261** | **Request Create / Edit / Delete  Application on Kintone  V2** | `Lookup_6` ("Modify By") | **`Number`** | `Text_12` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **264** | **TMAC** | `Lookup` ("Lookup") | **`Number`** | `create_by` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **265** | **Report Create / Edit / Delete  Application on Kintone** | `Lookup` ("Staff's ID /  รหัสพนักงาน") | **`Number`** | `Text_0` <- `Text`, `Text_2` <- `Drop_down`, `Text_3` <- `Text_0`, `Text_4` <- `Text_2`, `Text_5` <- `Drop_down_1`, `Text_6` <- `Drop_down_0` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **267** | **Training Need Survey ( TMH2 )** | `Lookup` ("EMP ID") | **`Number`** | `Text` <- `Text`, `Text_0` <- `Drop_down`, `Text_1` <- `Text_2`, `Text_2` <- `Text_4`, `Number` <- `Number_0`, `Text_3` <- `Text_6` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **270** | **Email Security Report** | `Lookup` ("Recipient") | **`Number`** | `Text_4` <- `Text`, `Text_5` <- `Drop_down`, `Text` <- `Text_0`, `Text_1` <- `Text_2`, `Text_2` <- `Text_4`, `Text_3` <- `Drop_down_0`, `Text_6` <- `Drop_down_1` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **271** | **Cloud Storage Usage Report** | `Lookup` ("Recipient") | **`Number`** | `Text_4` <- `Text`, `Text_5` <- `Drop_down`, `Text` <- `Text_0`, `Text_1` <- `Text_2`, `Text_2` <- `Text_4`, `Text_3` <- `Drop_down_0`, `Text_6` <- `Drop_down_1` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **273** | **ACTION PLAN** | `pic_Lookup` ("Lookup") | **`Number`** | `name_surname` <- `Text`, `section` <- `Drop_down`, `position` <- `Text_2`, `email` <- `Text_4`, `westcode` <- `Text_6`, `status_Number` <- `Number_0` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **278** | **DAILY REPORT ( F2 )** | `Lookup` ("EMP ID") | **`Number`** | `Text` <- `Text`, `Text_0` <- `Drop_down` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **279** | **Daily Report - Work Form Home** | `Lookup` ("EMP.CODE. / รหัสพนักงาน") | **`Number`** | `Text` <- `Text`, `Text_0` <- `Drop_down`, `Text_10` <- `Text_4`, `Text_1` <- `Text_2`, `Text_2` <- `Text_6`, `Number` <- `Number`, `Number_0` <- `Number_0`, `Text_5` <- `Radio_button`, `emp_id_text` <- `emp_text`, `site_id` <- `Text_8` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **282** | **Management By Objectives for Staff & Chief** | `Lookup_id` ("Emp. ID.") | **`Number`** | `Text_name` <- `Text`, `Text_section` <- `Drop_down`, `Text_position` <- `Text_2`, `Text_dep` <- `Drop_down_0`, `Date` <- `Date` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **283** | **PMS Staff & Chief** | `Lookup_id` ("Emp. ID.") | **`Number`** | `Text_name` <- `Text`, `Text_section` <- `Drop_down`, `Text_position` <- `Text_2`, `Text_dep` <- `Drop_down_0`, `Date` <- `Date`, `Text_area` <- `Text_area`, `Text_area_0` <- `Text_area_0` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **286** | **Workforce Demand Analysis** | `Lookup` ("EMP ID") | **`Number`** | `Text` <- `Text`, `Text_0` <- `Text_2`, `Text_1` <- `Drop_down`, `Text_2` <- `Text_4` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **289** | **Asst. Manager** | `Lookup_id` ("Emp. ID.") | **`Number`** | `Text_name` <- `Text`, `Text_section` <- `Drop_down`, `Text_position` <- `Text_2`, `Text_dep` <- `Drop_down_0`, `Date` <- `Date`, `Text_area` <- `Text_area`, `Text_area_0` <- `Text_area_0` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **290** | **DGM** | `Lookup_id` ("Emp. ID.") | **`Number`** | `Text_name` <- `Text`, `Text_section` <- `Drop_down`, `Text_position` <- `Text_2`, `Text_dep` <- `Drop_down_0`, `Date` <- `Date` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **291** | **BCP / Link of Daily Status for Employee** | `Lookup` ("EMP ID") | **`Number`** | `Text` <- `Text`, `Text_0` <- `Text_2`, `Text_1` <- `Drop_down`, `Text_2` <- `Text_4` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **292** | **DHL** | `Lookup` ("Staff's ID / รหัสพนักงาน") | **`Number`** | `Text_0` <- `Text`, `Text_5` <- `Text_2`, `Text_9` <- `Drop_down`, `Text_12` <- `Text_4`, `Team` <- `Drop_down_2` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **298** | **Competency** | `Lookup` ("EMP ID") | **`Number`** | `Text` <- `Text`, `Text_0` <- `Text_2`, `Text_1` <- `Drop_down`, `Text_2` <- `Text_4` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **299** | **PMS V3** | `Lookup_id` ("Emp. ID.") | **`Number`** | `Text_name` <- `Text`, `Text_section` <- `Drop_down`, `Text_position` <- `Text_2`, `Text_dep` <- `Drop_down_0`, `Date` <- `Date`, `Text_area` <- `Text_area`, `Text_area_0` <- `Text_area_0` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **305** | **PMS Sect.Mgr** | `Lookup_id` ("Emp. ID.") | **`Number`** | `Text_name` <- `Text`, `Text_section` <- `Drop_down`, `Text_position` <- `Text_2`, `Text_dep` <- `Drop_down_0`, `Date` <- `Date`, `Text_area` <- `Text_area`, `Text_area_0` <- `Text_area_0` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **307** | **PMS DGM** | `Lookup_id` ("Emp. ID.") | **`Number`** | `Text_name` <- `Text`, `Text_section` <- `Drop_down`, `Text_position` <- `Text_2`, `Text_dep` <- `Drop_down_0`, `Date` <- `Date`, `Text_area` <- `Text_area`, `Text_area_0` <- `Text_area_0` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **310** | **PMS Assistant Manager** | `Lookup_id` ("Emp. ID.") | **`Number`** | `Text_name` <- `Text`, `Text_section` <- `Drop_down`, `Text_position` <- `Text_2`, `Text_dep` <- `Drop_down_0`, `Date` <- `Date`, `Text_area` <- `Text_area`, `Text_area_0` <- `Text_area_0` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **312** | **PMS Specialist 1** | `Lookup_id` ("Emp. ID.") | **`Number`** | `Text_name` <- `Text`, `Text_section` <- `Drop_down`, `Text_position` <- `Text_2`, `Text_dep` <- `Drop_down_0`, `Date` <- `Date`, `Text_area` <- `Text_area`, `Text_area_0` <- `Text_area_0` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **314** | **Special 2** | `Lookup_id` ("Emp. ID.") | **`Number`** | `Text_name` <- `Text`, `Text_section` <- `Drop_down`, `Text_position` <- `Text_2`, `Text_dep` <- `Drop_down_0`, `Date` <- `Date`, `Text_area` <- `Text_area`, `Text_area_0` <- `Text_area_0` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **325** | **Cost Saving Report** | `Lookup` ("EMP.CODE. / รหัสพนักงาน") | **`Number`** | `Text` <- `Text`, `Text_0` <- `Drop_down`, `Text_10` <- `Text_4`, `Text_1` <- `Text_2`, `Text_2` <- `Text_6`, `Number` <- `Number` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **327** | **User Manual** | `Lookup` ("จัดทำหรือ Upload โดย. / รหัสพนักงาน") | **`Number`** | `Text` <- `Text`, `Text_0` <- `Drop_down`, `Text_10` <- `Text_4`, `Text_1` <- `Text_2`, `Text_2` <- `Text_6`, `Number` <- `Number` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **328** | **Tracking claim and repair status of the device** | `Lookup` ("รหัสพนักงาน") | **`Number`** | `Text` <- `Text`, `Text_0` <- `Drop_down`, `Text_10` <- `Text_4`, `Text_1` <- `Text_2`, `Text_2` <- `Text_6`, `Number` <- `Number` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **338** | **Request for Important Company Documents** | `Lookup` ("Staff's ID /  รหัสพนักงาน") | **`Number`** | `Text_3` <- `Text`, `Text_4` <- `Drop_down`, `Text_5` <- `Text_2`, `Text_6` <- `Text_4`, `Team` <- `Drop_down_2` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **358** | **Report Link Down** | `Lookup` ("Recipient") | **`Number`** | `Text_4` <- `Text`, `Text_5` <- `Drop_down`, `Text` <- `Text_0`, `Text_1` <- `Text_2`, `Text_2` <- `Text_4`, `Text_3` <- `Drop_down_0`, `Text_6` <- `Drop_down_1` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **366** | **Running Number QT** | `Lookup_0` ("Lookup") | **`Number`** | `Text_3` <- `Text`, `Text_5` <- `Text_11` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **371** | **Request  Bring In / Out / Return  IT Equipments- V2** | `Lookup` ("Staff's ID /  รหัสพนักงาน") | **`Number`** | `Text_0` <- `Text`, `Text_2` <- `Drop_down`, `Text_3` <- `Text_0`, `Text_4` <- `Text_2`, `Text_5` <- `Drop_down_1`, `Text_6` <- `Drop_down_0` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **527** | **Leave Summary** | `Lookup` ("Employee Number") | **`Number`** | `Text` <- `Text`, `Text_0` <- `Drop_down_0`, `Text_1` <- `Text_2`, `Date` <- `Date` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **542** | **Requisition for Leave** | `Lookup` ("Employee Number") | **`Number`** | `Text` <- `Text`, `Text_0` <- `Drop_down_0`, `Text_1` <- `Text_2`, `Date` <- `Date` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **544** | **Employee In Class** | `Lookup` ("EMP.CODE. / รหัสพนักงาน") | **`Number`** | `Text_5` <- `Text`, `Text_6` <- `Drop_down`, `Text_7` <- `Text_2`, `Text_8` <- `Text_4` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **548** | **Access Door Record** | `Lookup` ("Employee ID") | **`Number`** | `Text_0` <- `Text`, `Text_1` <- `Drop_down_1`, `Text_2` <- `Text_2`, `Text_3` <- `Text_4` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **564** | **Inventory Movement** | `Lookup_0` ("ID Emp") | **`Number`** | `Text_3` <- `Text`, `Text_4` <- `Drop_down_0`, `Text` <- `Radio_button`, `Text_0` <- `Drop_down_1` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **569** | **CONTROL PO** | `Lookup` ("ID EMP") | **`Number`** | `create_by` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **575** | **Monthly Schedule** | `Lookup_0` ("PIC Request") | **`Number`** | `name` <- `Text`, `section` <- `Drop_down` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **578** | **System Company ( Additional / Revise / Deactivate )** | `Lookup` ("Staff's ID /  รหัสพนักงาน") | **`Number`** | `Text_0` <- `Text`, `Text_2` <- `Drop_down`, `Text_3` <- `Text_0`, `Text_4` <- `Text_2`, `Text_5` <- `Drop_down_1`, `Text_6` <- `Drop_down_0`, `Text_10` <- `Text_4` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **580** | **Record Remote Work** | `Lookup` ("EMP ID") | **`Number`** | `Text_0` <- `Text`, `Text_2` <- `Drop_down`, `Text_3` <- `Text_0`, `Text_4` <- `Text_2`, `Text_5` <- `Drop_down_1`, `Text_6` <- `Drop_down_0`, `Text_10` <- `Text_4` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **587** | **Transfer  Asset** | `Lookup_0` ("รหัสพนักงาน ( ผู้รับผิดชอบปัจจุบัน )") | **`Number`** | `re_after` <- `Text`, `Text_7` <- `Text_3`, `new_sec` <- `Drop_down` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **590** | **LIST  OF  AGREEMENTS** | `Lookup` ("EMP.CODE. / รหัสพนักงาน") | **`Number`** | `NAME` <- `Text`, `SECTION` <- `Drop_down`, `POSITION` <- `Text_2`, `Team` <- `Drop_down_2` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **595** | **PURCHASE  REQUEST** | `Lookup` ("Staff's ID / รหัสพนักงาน") | **`Number`** | `Text_0` <- `Text`, `Text_5` <- `Text_2`, `Text_9` <- `Drop_down`, `Text_12` <- `Text_4`, `Team` <- `Drop_down_2` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **596** | **CANCELLATION  ASSET  REQUST** | `Lookup` ("Lookup") | **`Number`** | `Text_0` <- `Text`, `Text_2` <- `Drop_down`, `Text_4` <- `Text_2`, `Team` <- `Drop_down_2` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **609** | **SLIP FOR OTHERS EXPENSE  ( IN MONTH)** | `Lookup` ("EMP.CODE. / รหัสพนักงาน") | **`Number`** | `Text` <- `Text`, `Text_0` <- `Drop_down`, `Text_10` <- `Text_4`, `Text_1` <- `Text_2`, `Text_2` <- `Text_6`, `Number` <- `Number`, `Number_0` <- `Number_0` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **615** | **SLIP FOR COST ( Pay in Month )** | `Lookup` ("EMP.CODE. / รหัสพนักงาน") | **`Number`** | `Text` <- `Text`, `Text_0` <- `Drop_down`, `Text_10` <- `Text_4`, `Text_1` <- `Text_2`, `Text_2` <- `Text_6`, `Number` <- `Number` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **620** | **Export** | `Lookup` ("EMP.CODE.") | **`Number`** | `Text` <- `Text`, `Text_0` <- `Drop_down` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **622** | **Import** | `Lookup` ("EMP.CODE.") | **`Number`** | `Text` <- `Text`, `Text_0` <- `Drop_down` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **633** | **แบบฟอร์มขอหนังสือรับรอง** | `Lookup` ("EMP.CODE.") | **`Number`** | `Text` <- `Text`, `Text_0` <- `Drop_down`, `Text_1` <- `Text_2`, `Date` <- `Date` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **640** | **PMS GM** | `Lookup_id` ("Emp. ID.") | **`Number`** | `Text_name` <- `Text`, `Text_section` <- `Drop_down`, `Text_position` <- `Text_2`, `Text_dep` <- `Drop_down_0`, `Date` <- `Date`, `Text_area` <- `Text_area`, `Text_area_0` <- `Text_area_0` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **643** | **PMS Senior Manager** | `Lookup_id` ("Emp. ID.") | **`Number`** | `Text_name` <- `Text`, `Text_section` <- `Drop_down`, `Text_position` <- `Text_2`, `Text_dep` <- `Drop_down_0`, `Date` <- `Date`, `Text_area` <- `Text_area`, `Text_area_0` <- `Text_area_0` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **646** | **Notification for time record / แบบแจ้งขอบันทึกเวลาทำงาน** | `Lookup` ("EMP.CODE. / รหัสพนักงาน") | **`Number`** | `Text` <- `Text`, `Text_0` <- `Drop_down`, `Text_1` <- `Text_2`, `Number` <- `Number`, `Number_0` <- `Number_0`, `emp_id_text` <- `emp_text`, `site_id` <- `Text_8`, `Team` <- `Drop_down_2` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **650** | **Work permit / ใบอนุญาตทำงาน** | `Lookup` ("EMP.CODE. / รหัสพนักงาน") | **`Number`** | `NAME_SURNAME` <- `Text`, `SECTION` <- `Drop_down`, `POSITION` <- `Text_2`, `Number` <- `Number`, `Number_0` <- `Number_0`, `Team` <- `Drop_down_2` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **667** | **Mileage Tracking** | `Lookup_EMP_CODE` ("Lookup EMP.CODE.") | **`Number`** | `EMP_CODE` <- `emp_text`, `NAME_SURNAME` <- `Text_0`, `SECTION_User` <- `Drop_down_0` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **672** | **Request permission confidential documents outside** | `Lookup` ("Staff's ID /  รหัสพนักงาน") | **`Number`** | `Text_3` <- `Text`, `Text_4` <- `Drop_down`, `Text_5` <- `Text_2`, `Text_6` <- `Text_4`, `Team` <- `Drop_down_2` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **673** | **Return the computer to the IT** | `Lookup` ("Staff's ID /  รหัสพนักงาน") | **`Number`** | `Text_2` <- `Drop_down`, `Text_3` <- `Text_0`, `Text_4` <- `Text_2`, `Text_5` <- `Drop_down_1`, `Text_6` <- `Drop_down_0`, `Text_10` <- `Text_4` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **674** | **Request Data Erase for Notebook** | `Lookup` ("Staff's ID /  รหัสพนักงาน") | **`Number`** | `Text_0` <- `Text`, `Text_2` <- `Drop_down`, `Text_4` <- `Text_2`, `Text_5` <- `Drop_down_1` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **682** | **Checklist Offboarding** | `Lookup` ("Staff's ID /  รหัสพนักงาน") | **`Number`** | `Text_0` <- `Text`, `Text_2` <- `Drop_down`, `Text_4` <- `Text_2`, `Text_5` <- `Drop_down_1` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **683** | **Set View** | `Lookup` ("EMP.CODE. / รหัสพนักงาน") | **`Number`** | `Text` <- `Text`, `section` <- `Drop_down`, `Text_1` <- `Text_2`, `Text_2` <- `Text_6`, `Number` <- `Number`, `Number_0` <- `Number_0` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **705** | **Notification for time record / แบบแจ้งขอบันทึกเวลาทำงาน- Copy** | `Lookup` ("EMP.CODE. / รหัสพนักงาน") | **`Number`** | `Text` <- `Text`, `Text_0` <- `Drop_down`, `Text_1` <- `Text_2`, `emp_id` <- `Number`, `Number_0` <- `Number_0`, `emp_id_text` <- `emp_text`, `site_id` <- `Text_8` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **706** | **Check In-Out** | `Lookup` ("EMP.CODE. / รหัสพนักงาน") | **`Number`** | `user` <- `Text`, `Text_0` <- `Drop_down`, `Text_1` <- `Text_2`, `Text_2` <- `Text_6`, `Number` <- `Number`, `Number_0` <- `Number_0` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **708** | **Check sheet of Safety patrol** | `Lookup` ("EMP.CODE. / รหัสพนักงาน") | **`Number`** | `NAME_SURNAME` <- `Text`, `SECTION` <- `Drop_down`, `POSITION` <- `Text_2` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **709** | **Credit Control Alert** | `Lookup` ("Staff's ID /  รหัสพนักงาน") | **`Number`** | `Text_3` <- `Text`, `Text_4` <- `Drop_down`, `Text_5` <- `Text_2`, `Text_6` <- `Text_4` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **711** | **TEST MBO STAFF** | `Lookup_id` ("Emp. ID.") | **`Number`** | `Text_name` <- `Text`, `Text_section` <- `Drop_down`, `Text_position` <- `Text_2`, `Text_dep` <- `Drop_down_0`, `Date` <- `Date`, `Text_area` <- `Text_area`, `Text_area_0` <- `Text_area_0` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **712** | **COST FOR GIFU** | `Lookup` ("EMP.CODE. / รหัสพนักงาน") | **`Number`** | `Text` <- `Text`, `Text_0` <- `Drop_down`, `Text_1` <- `Text_2`, `Text_2` <- `Text_6`, `Number` <- `Number`, `Text_8` <- `Drop_down_2`, `Text_9` <- `Text_5` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **715** | **PMS VP** | `Lookup_id` ("Emp. ID.") | **`Number`** | `Text_name` <- `Text`, `Text_section` <- `Drop_down`, `Text_position` <- `Text_2`, `Text_dep` <- `Drop_down_0`, `Date` <- `Date`, `Text_area` <- `Text_area`, `Text_area_0` <- `Text_area_0` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **716** | **Japan Staff** | `Lookup_id` ("Emp. ID.") | **`Number`** | `Text_name` <- `Text`, `Text_section` <- `Drop_down`, `Text_position` <- `Text_2`, `Text_dep` <- `Drop_down_0`, `Date` <- `Date`, `Text_area` <- `Text_area`, `Text_area_0` <- `Text_area_0` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **719** | **ข้อมูลพัสดุ/อุปกรณ์ (Asset Master Data)** | `Lookup` ("ID / รหัสพนักงาน") | **`Number`** | `section` <- `Drop_down`, `name` <- `Text`, `E_mail` <- `Text_4` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **720** | **เบิกยืม-คืนพัสดุ/อุปกรณ์ สํานักงาน** | `Lookup` ("ID / รหัสพนักงาน ผู้ดำเนินการ") | **`Number`** | `section` <- `Drop_down`, `name` <- `Text`, `E_mail` <- `Text_4` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **723** | **360 feedback V1** | `Lookup` ("EMP.CODE. / รหัสพนักงาน") | **`Number`** | `assessment_name` <- `Text`, `Text_0` <- `Drop_down`, `Text_10` <- `Text_4`, `Text_1` <- `Text_2`, `Text_2` <- `Text_6`, `emp_code` <- `Number`, `Number_0` <- `Number_0`, `Text_8` <- `Drop_down_2` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **723** | **360 feedback V1** | `Lookup_0` ("Evaluator No. 1") | **`Number`** | `evaluator_name_1` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **723** | **360 feedback V1** | `Lookup_2` ("Evaluator No. 3") | **`Number`** | `evaluator_name_3` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **723** | **360 feedback V1** | `Lookup_1` ("Evaluator No. 2") | **`Number`** | `evaluator_name_2` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **723** | **360 feedback V1** | `Lookup_3` ("Evaluator No. 4") | **`Number`** | `evaluator_name_4` <- `Text` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **734** | **Golf Membership** | `Lookup` ("Staff's ID / รหัสพนักงาน") | **`Number`** | `Text_0` <- `Text`, `Text_5` <- `Text_2`, `Text_9` <- `Drop_down`, `Text_12` <- `Text_4`, `Team` <- `Drop_down_2` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **740** | **Contractor Training  Request** | `Lookup` ("Emp.code / รหัส") | **`Number`** | `Text` <- `Text`, `Text_0` <- `Drop_down`, `Text_1` <- `Text_2`, `Text_2` <- `Text_4`, `Team` <- `Drop_down_2` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **750** | **TEST SLIP FOR WELFARE / สำหรับเบิกสวัสดิการ- Copy** | `Lookup` ("EMP.CODE. / รหัสพนักงาน") | **`Number`** | `Text` <- `Text`, `Text_0` <- `Drop_down`, `Text_1` <- `Text_2`, `Text_2` <- `Text_6`, `Number` <- `Number`, `Number_0` <- `Number_0`, `Text_8` <- `Drop_down_2`, `Text_4` <- `Text_5` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **760** | **Network Change Request Form** | `Lookup` ("Staff's ID /  รหัสพนักงาน") | **`Number`** | `Text_0` <- `Text`, `Text_2` <- `Drop_down`, `Text_4` <- `Text_2`, `Text_5` <- `Drop_down_1` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **765** | **Asset Master IT** | `Lookup` ("EMP.CODE. / รหัสพนักงาน") | **`Number`** | `Current_User` <- `Text`, `Staff_ID` <- `emp_text`, `SECTION` <- `Drop_down`, `Team` <- `Drop_down_2`, `POSITION` <- `Text_2` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **767** | **MANUFACTURING INSTRUCTION** | `Lookup` ("EMP.CODE. / รหัสพนักงาน") | **`Number`** | `NAME_SURNAME` <- `Text`, `SECTION` <- `Drop_down`, `Team` <- `Drop_down_2`, `EMP_CODE` <- `Number` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **774** | **TEST PMS Staff & Chief** | `Lookup_id` ("Emp. ID.") | **`Number`** | `Text_name` <- `Text`, `Text_section` <- `Drop_down`, `Text_position` <- `Text_2`, `Text_dep` <- `Drop_down_0`, `Date` <- `Date`, `Text_area` <- `Text_area`, `Text_area_0` <- `Text_area_0` | Kintone Production API | **LEVEL 5 (CRITICAL)** |
| **776** | **Work permit Request** | `Lookup` ("EMP.CODE. / รหัสพนักงาน") | **`Number`** | `NAME_SURNAME` <- `Text`, `SECTION` <- `Drop_down`, `POSITION` <- `Text_2` | Kintone Production API | **LEVEL 5 (CRITICAL)** |

---

## 3. Production Key Analysis: 'Number' (Code) vs 'emp_text' (Employee ID)

| Metric | Field: `Number` (Label: "Code") | Field: `emp_text` (Label: "Employee ID") | Analysis / Findings |
| :--- | :---: | :---: | :--- |
| **Total Production Records** | 275 | 275 | Total records evaluated from App 53 |
| **Empty Values** | **0** | **79** | `Number` has **0 empty records** (100% complete) vs `emp_text` has 79 empty records |
| **Duplicate Values** | **1** | **1** | `Number` has 0 duplicates (100% unique) vs `emp_text` has 1 duplicate |
| **Key Identity Comparison** | **43 Records Equal** | **153 Records Different** | `Number` serves as the **Legacy Primary Key** used by legacy & welfare apps |

> [!IMPORTANT]
> **KEY ARCHITECTURAL FINDING:**
> - **`Number` (Label: "Code"):** เป็น Primary Key ดั้งเดิมของระบบ Kintone (100% Complete, 0 Duplicates) ถูกใช้อย่างเป็นทางการโดยแอปปลายทาง เช่น App 139 (Welfare Slip)
> - **`emp_text` (Label: "Employee ID"):** เป็น Business Key ปัจจุบันสำหรับพนักงานใหม่ แต่มีข้อมูลว่าง 79 เรคคอร์ดในระบบเดิม
> - **สรุปนโยบาย:** **ทั้งสอง Field เป็น CRITICAL PROTECTED FIELDS (LEVEL 5)** ห้ามลบหรือเปลี่ยน Field Code ทั้งคู่!

---

## 4. Protected Field Register (Verified from Production Dependencies)

| Field Code | Field Label | Kintone Type | Protection Level | Reason / Usage |
| :--- | :--- | :--- | :---: | :--- |
| **`Number`** | Code | `NUMBER` | **LEVEL 5 (CRITICAL LOOKUP KEY)** | Primary Lookup Key for App 139 and legacy enterprise apps |
| **`emp_text`** | Employee ID | `SINGLE_LINE_TEXT` | **LEVEL 5 (CRITICAL LOOKUP KEY)** | Primary Business Key for modern employee lookups |
| **`Text_0`** | ชื่อ - นามสกุล | `SINGLE_LINE_TEXT` | **LEVEL 4 (COPIED MASTER DATA)** | Copied out for Thai name display |
| **`Text`** | Name - Surname | `SINGLE_LINE_TEXT` | **LEVEL 4 (COPIED MASTER DATA)** | Copied out by App 139 and English lookups |
| **`Text_2`** | Position | `SINGLE_LINE_TEXT` | **LEVEL 4 (COPIED MASTER DATA)** | Copied out by App 139 for Position title |
| **`Text_6`** | Vendor Account Number | `SINGLE_LINE_TEXT` | **LEVEL 4 (COPIED MASTER DATA)** | Copied out by App 139 for welfare payments |
| **`Drop_down_0`**| Departmant | `DROP_DOWN` | **LEVEL 4 (COPIED MASTER DATA)** | Department master dropdown |
| **`Drop_down_2`**| Team | `DROP_DOWN` | **LEVEL 4 (COPIED MASTER DATA)** | Copied out by App 139 for Team division |
