# PHASE 7 PRODUCTION MIGRATION PLAN (DRAFT)
## Clean Rebuild Architecture

> **STATUS: DRAFT SIMULATION ONLY — ZERO PRODUCTION WRITES**

### 1. Strategy Overview
- **Rebuild App 791 from Scratch:** Create clean Canonical Organization Master (34 nodes) and Canonical Position Master (57 positions).
- **Preserve App 792 History:** Remap historical assignment foreign keys to canonical IDs.
- **Preserve App 793 Workflows:** Retain change request references.
- **Rollback Safety:** Full JSON snapshot taken before any execution.

### 2. Proposed Canonical Structure
- **Company:** 1 (`TTMET`)
- **Divisions:** 2 (`DIV-ME`, `DIV-GS`)
- **Departments:** 6 (`TMH0`, `TMT1`, `TMT0`, `TME1`, `TMS0`, `TMG0`)
- **Sections:** 11 (`TMT1`, `TMT2`, `TMF1`, `TMF2`, `TMF3`, `TME3`, `TMS1`, `TMG1`, `TMG2`, `TMH1`, `TMH2`, `TMH3`)
- **Teams / Operating Units:** 14
- **Positions:** 57 Canonical Job Titles
