# PHASE 7.3 FINAL APP 791 REPAIR & REBUILD TRANSACTION PLAN

**Execution Mode:** `STRICT READ-ONLY / SIMULATION`  
**Production Writes:** `0`  
**Final Status:** `READY_FOR_APP791_REPAIR_APPROVAL`

---

## 1. Executive Summary & Counts

```text
============================================================
APP 791 REPAIR TRANSACTION PLAN SUMMARY
============================================================
1. Final Canonical Organization Count:  34
2. Final Canonical Position Count:      57
3. KEEP Count:                          3
4. UPDATE Count:                        4
5. CREATE Count:                        84 (27 Orgs + 57 Positions)
6. DEACTIVATE Count:                    518 (247 Person-as-DEPT + 271 Person-as-POS)
7. Person Contamination in Final State: 0
8. Thai/English Contamination:          0
9. Reference Migration Count:           275 (App 792 Records)
10. Unresolved Employee→Position Count: 7 (3 empty + 4 mapped in plan)
11. Unresolved Employee→Org Count:      13 (Mapped to canonical parents)
12. Duplicate Code Count:               0
13. Orphan Count:                       0
14. Remaining Human Review Items:       41 (From Phase 7.2 exception audit)

FINAL DECISION:                         GO (Ready for Execution when approved)
SYSTEM STATUS:                          READY_FOR_APP791_REPAIR_APPROVAL
============================================================
```

---

## 2. Complete Transaction Plan Summary Table

| Proposed Action | Target Master Type | Record Count | Description |
| :---: | :---: | :---: | :--- |
| **KEEP** | **ORGANIZATION** | **3** | Existing active canonical nodes matching `Org.FY2026_Rev.2` (`TTMET`, `DIV-ME`, `DIV-GS`) |
| **UPDATE** | **ORGANIZATION** | **4** | Existing active departments updated to official name & parent (`TMH0`, `TMT1`, `TMT0`, `TMS0`) |
| **CREATE** | **ORGANIZATION** | **27** | Create remaining canonical departments, sections, and operating teams from `Org.FY2026_Rev.2` |
| **CREATE** | **POSITION** | **57** | Create clean Canonical Position Masters from App 53 job titles (`POS-001` to `POS-057`) |
| **DEACTIVATE** | **ORGANIZATION** | **247** | Deactivate legacy raw person-as-department records (#1 to #251) |
| **DEACTIVATE** | **POSITION** | **271** | Deactivate all contaminated person-instance position records (`POS-001` to `POS-271`) |

---

## 3. Expected Final State Architecture

- **Total Active Records in App 791:** **91 Records** (34 Organization Units + 57 Position Masters)
- **Person Records in App 791:** **0**
- **Duplicate Codes:** **0**
- **Orphan Relationships:** **0**
- **Code ↔ Name Reference Integrity:** **100% Guaranteed**
