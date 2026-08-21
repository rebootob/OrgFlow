# ORGFLOW MASTER TODO & TASK TRACKER

## Phase 0: Discovery & Architecture (COMPLETE)
- [x] Scan workspace and analyze project requirements (V2 Prompt & Employee Namelist Update).
- [x] Draft system architecture & identity model documentation (`PROJECT_ANALYSIS.md`, `ARCHITECTURE.md`).
- [x] Draft protected master field inventory (`docs/EMPLOYEE_NAMELIST_FIELD_INVENTORY.md`).
- [x] Draft field dependency map & risk analysis (`docs/FIELD_DEPENDENCY_MAP.md`).
- [x] Draft Kintone app ecosystem relationship topology (`docs/KINTONE_APP_RELATIONSHIP_MAP.md`).
- [x] Draft existing employee field dictionary (`EXISTING_EMPLOYEE_FIELD_MAPPING.md`).
- [x] Draft granular permission matrix (`PERMISSION_MATRIX.md`).
- [x] Draft security & compliance specification (`SECURITY.md`).
- [x] Create comprehensive implementation plan artifact (`implementation_plan.md`).

## Phase 1: Configuration & Foundation Layer
- [ ] Implement Central Kintone Config (`src/config/kintoneConfig.js`) with `Employee Namelist` App ID.
- [ ] Implement Central Field Mappings (`src/config/fieldMappings.js`) with normalized accessor methods.
- [ ] Implement System Access Role Configuration (`src/config/roleConfig.js`).
- [ ] Implement Security Sanitizer & Escaper (`src/utils/sanitizer.js`).
- [ ] Implement Kintone REST API Client Wrapper with batching & cursor pagination (`src/api/kintoneClient.js`).

## Phase 2: Data Services Layer
- [ ] Implement `employeeService.js` (Fetch and normalize `Employee Namelist` records).
- [ ] Implement `departmentService.js` (Department hierarchy loader).
- [ ] Implement `positionService.js` (Position master & vacancy tracking).
- [ ] Implement `assignmentService.js` (OrgFlow Assignment log service for historical/future states).
- [ ] Implement `changeRequestService.js` (Org change workflow requests).
- [ ] Implement `permissionService.js` (Session role evaluation & permission checking).

## Phase 3: Core Business Logic Engines
- [ ] Implement `hierarchyBuilder.js` (O(N) Hash Map tree builder & report counters).
- [ ] Implement `validationEngine.js` (DFS Circular reporting detector, self-manager check, orphan detector).
- [ ] Implement `vacancyCalculator.js` (Approved vs filled headcount calculator).
- [ ] Implement `timeMachineEngine.js` (Snapshot filter for target dates).
- [ ] Implement `impactAnalyzer.js` (Pre-commit change impact analyzer).

## Phase 4: Interactive Org Chart & Portal UI Components
- [ ] Implement CSS variables & modern enterprise styling (`src/styles/variables.css`, `src/styles/main.css`).
- [ ] Implement Navigation Bar & Date Selector component (`src/components/navbar.js`).
- [ ] Implement Role-Based Sidebar component (`src/components/sidebar.js`).
- [ ] Implement Employee Detail Drawer / Side Panel (`src/components/employeeSidePanel.js`).
- [ ] Implement Org Chart Page (`src/pages/orgChartPage.js`) with SVG tree, zoom/pan, search highlight, collapse/expand, and vacant node rendering.

## Phase 5: Employee Directory & Search
- [ ] Implement Employee Directory Page (`src/pages/directoryPage.js`) with search, filter, pagination, and "Show in Org Chart" action.

## Phase 6: Headcount & Vacancy Dashboards
- [ ] Implement Dashboard Page (`src/pages/dashboardPage.js`) with metric cards (Total Employee, Approved HC, Vacancy, Pending Changes) and department headcount charts.
- [ ] Implement Vacancy Management View (`src/pages/vacancyPage.js`).

## Phase 7: Org Change Workflow & Effective Date Scheduler
- [ ] Implement Org Change Request Form & Workflow View (`src/pages/orgChangePage.js`).
- [ ] Implement Before/After visual comparison component.
- [ ] Implement Scheduled Change Processor / Log generator (`APP 06`).

## Phase 8: Role Dashboards & Analytics
- [ ] Implement Executive Dashboard (`EXECUTIVE` role view with Span of Control & Org Layers).
- [ ] Implement Manager "My Team" View (`MANAGER` role view).
- [ ] Implement HR Data Quality Alert Center.

## Phase 9: Security Audit, Build & Bundling
- [ ] Setup build pipeline script to generate `dist/orgflow-main.js` and `dist/orgflow-main.css`.
- [ ] Conduct Shared Account Security Bypass Test & XSS Verification.
- [ ] Prepare User Guide & Admin Guide documentation (`docs/USER_GUIDE.md`, `docs/ADMIN_GUIDE.md`).
