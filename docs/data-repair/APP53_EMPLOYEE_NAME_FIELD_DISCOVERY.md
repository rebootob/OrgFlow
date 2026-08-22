# APP 53 EMPLOYEE NAME FIELD DISCOVERY
## Authoritative Source: App 53 — Employee Namelist

> **100% READ-ONLY — ZERO PRODUCTION WRITES**

---

## 1. Field Profiling Table (All Candidate Name Fields)

| Field Code | Non-Blank | Thai % | English % | Blank % | Sample 1 | Sample 2 | Likely Meaning | Selected As Authoritative |
| :---: | :---: | :---: | :---: | :---: | :--- | :--- | :---: | :---: |
| `Text_0` | 255 | **93%** | **0%** | 7% | "นายภาณุกร สาธร" | "นายอนุพงษ์ หลงน้อย" | **`LIKELY_THAI_NAME`** | ✅ **THAI** |
| `Drop_down_1` | 261 | **0%** | **95%** | 0% | "Injection" | "Die Casting" | **`LIKELY_ENGLISH_NAME`** | — |
| `Drop_down_0` | 266 | **0%** | **97%** | 0% | "Mold & Engineering" | "Mold & Engineering" | **`LIKELY_ENGLISH_NAME`** | — |
| `Text_2` | 272 | **0%** | **99%** | 1% | "Operator" | "Operator" | **`LIKELY_ENGLISH_NAME`** | — |
| `Text` | 275 | **0%** | **100%** | 0% | "Mr.Panukorn Sathron" | "Mr.Anuphong Longnoi" | **`LIKELY_ENGLISH_NAME`** | ✅ **ENGLISH** |
| `Text_7` | 180 | **0%** | **65%** | 35% | "Mr.Panukorn / TMG2" | "Mr.Anuphong / TMG1" | **`AMBIGUOUS`** | — |
| `Text_3` | 155 | **0%** | **56%** | 44% | "Toyota  Sales" | "Technical Services" | **`AMBIGUOUS`** | — |

---

## 2. Authoritative Field Selection

```text
AUTHORITATIVE_THAI_NAME_FIELD    = Text_0
Thai Source Confidence           = HIGH
Sample Values:
  "นายภาณุกร สาธร"
  "นายอนุพงษ์ หลงน้อย"
  "นายธีรภัทร์ เขียวสะอาด"

AUTHORITATIVE_ENGLISH_NAME_FIELD = Text
English Source Confidence        = HIGH
Sample Values:
  "Mr.Panukorn Sathron"
  "Mr.Anuphong Longnoi"
  "Mr.Theeraphat Khiaosaart"
```

---

## 3. Previous Phase 3 Wrong Mapping Detection

| Phase 3 Thai Source | Phase 3 English Source | Problem |
| :--- | :--- | :--- |
| `Text_0` | `Text` | If `Text_0` contains English names (e.g. "Mr.Sathit Krasae"), it was INCORRECTLY selected as Thai source. |

**Records with PREVIOUS_THAI_SOURCE_MAPPING_INVALID: 0**
