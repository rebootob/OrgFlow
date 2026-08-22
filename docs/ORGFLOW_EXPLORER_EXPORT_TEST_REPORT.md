# ORGFLOW — EXPORT TEST REPORT
**Suite:** Export Engine Validation (Excel & Scoped PDF)  

---

## 1. EXCEL EXPORT TESTS
- **Employee Directory Export:** Tested with 275 records. Clean English headers (`Employee ID`, `Thai Name`, `English Name`, `Position Code`, `Position Name`, `Org Code`, `Org Name`, `Assignment Type`, `Status`). UTF-8 BOM encoding verified.
- **Organization Structure Export:** Tested with 33 canonical nodes. Includes headcount metrics and level depth.
- **Position Catalog Export:** Tested with standardized positions and department distribution.
- **Vacancy Report Export:** Tested with capacity and active assignments.

## 2. SCOPED PDF EXPORT TESTS
- **Company Scope:** Generates printable executive summary.
- **Division / Department Scope:** Scoped hierarchy table with metadata header (`Generated Timestamp`, `Unit Code`, `Headcount`) and corporate footer.
