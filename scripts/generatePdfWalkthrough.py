import json
import os

with open("docs/PRECISE_PDF_CROSS_VALIDATION_REPORT.json", "r", encoding="utf-8") as f:
    data = json.load(f)

exceptions = data["exceptions"]
matrix = data["matrix"]

md = f"""# ORGFLOW — FULL 275 EMPLOYEE PDF ORG CROSS-VALIDATION AUDIT REPORT
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
"""

for idx, e in enumerate(exceptions):
    md += f"| {idx+1} | `{e['employee_id']}` | **{e['english_name']}** | {e['thai_name']} | `{e['problem']}` | {e['current_pos']} (`{e['current_org']}`) | **{e['expected_pos']}** (`{e['expected_org']}`) | {e['pdf_evidence']} |\n"

md += """
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
"""

with open("docs/PDF_CROSS_VALIDATION_WALKTHROUGH.md", "w", encoding="utf-8") as f:
    f.write(md)

print("Generated docs/PDF_CROSS_VALIDATION_WALKTHROUGH.md successfully.")
