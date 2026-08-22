# ORGFLOW — MULTI-FORMAT EXPORT ENGINE DESIGN
**Version:** 2.0.0  
**Phase:** Phase 2 Technical Architecture Design  

---

## 1. EXCEL EXPORT SPECIFICATION (.XLSX)

Client-side generation using SheetJS / ExcelJS with clean English headers:

| Export Report Type | Columns Included | Formatting & Filters |
| :--- | :--- | :--- |
| **Employee Directory** | `Employee ID`, `Thai Name`, `English Name`, `Position Code`, `Position Name`, `Org Code`, `Org Name`, `Org Type`, `Assignment Type`, `Status`, `Start Date` | Filter-aware, autofilter enabled |
| **Organization Structure** | `Organization Code`, `Organization Name`, `Organization Type`, `Level`, `Parent Code`, `Hierarchy Path`, `Headcount`, `Vacancies` | Grouped by Level |
| **Vacancy Analysis** | `Organization Code`, `Organization Name`, `Position Code`, `Position Name`, `Budgeted Headcount`, `Active Headcount`, `Vacancy Count`, `Status` | Highlight vacant rows |
| **Change Request Log** | `Request ID`, `Request Type`, `Employee ID`, `English Name`, `From Org`, `To Org`, `From Pos`, `To Pos`, `Effective Date`, `Status`, `HR Reviewer`, `GM Approver` | Chronological sort |

---

## 2. PDF EXPORT SPECIFICATION (.PDF)

Client-side hierarchy-aware generation using jsPDF / html2canvas:

1. **Scoped Org Chart PDF:**
   - Option A: **Company Scope** (Executive & Division Overview).
   - Option B: **Division Scope** (Division Head, Departments, Sections).
   - Option C: **Department Scope** (Department Head, Sections, Teams, Staff).
2. **Layout & Branding:**
   - Standard A4 Landscape / Portrait.
   - Header: Corporate Logo, Organization Title, Generated Timestamp, Active Filter Badges.
   - Footer: Page X of Y, Confidentiality Notice.
   - Automatic pagination preventing clipped cards.
