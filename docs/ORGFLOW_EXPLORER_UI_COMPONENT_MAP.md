# ORGFLOW — UI COMPONENT ARCHITECTURE & LAYOUT MAP
**Version:** 2.0.0  
**Phase:** Phase 2 Technical Architecture Design  

---

## 1. COMPONENT HIERARCHY TREE

```text
OrgFlowExplorerApp (Root Container)
├── TopHeaderBar
│   ├── OrgFlowLogo & Breadcrumbs
│   ├── GlobalSearchInput (Debounced 300ms)
│   ├── FilterGroup (Org Level, Position, Assignment Type, Status)
│   ├── ViewModeSwitcher (OrgChart, Directory, Vacancy, Requests)
│   ├── ZoomControls (Zoom In, Zoom Out, Fit Screen)
│   └── ExportDropdownMenu (Excel XLSX, Scoped PDF)
│
├── LeftNavigationSidebar
│   ├── NavItem: Dashboard Overview
│   ├── NavItem: Interactive Org Chart
│   ├── NavItem: Employee Directory
│   ├── NavItem: Organization Hierarchy
│   ├── NavItem: Position Directory
│   ├── NavItem: Vacancy Management
│   ├── NavItem: Change Requests
│   └── NavItem: Reports & Analytics
│
├── MainContentViewArea
│   ├── View: OrgChartCanvas (Interactive D3/SVG Node Grid, Lazy Expansion)
│   │   ├── OrgNodeCard (Header, Leader Card, Subordinate Counter, Expand/Collapse)
│   │   └── EmployeeBadgeCard (Photo, Name, ID, Title, Status Tag)
│   ├── View: EmployeeDirectoryTable (Sortable, Searchable, Filterable, Pagination)
│   ├── View: VacancyMatrixView (Budget vs Actual, Open Positions, Fill Action)
│   ├── View: ChangeRequestDashboard (Pending HR, Pending GM, Execution Queue)
│   └── View: HeadcountAnalyticsDashboard (Charts, Metrics, Division/Dept breakdown)
│
├── EmployeeDetailDrawer (Right Slide-out Panel)
│   ├── EmployeeProfileHeader (Photo, Name TH/EN, ID, Email, Phone)
│   ├── CurrentAssignmentCard (Org Node, Level, Position Code/Title, Type, Start Date)
│   ├── ManagerReportingCard (Immediate Manager, Direct Reports Count)
│   ├── AssignmentHistoryTimeline (Chronological timeline of past assignments)
│   └── ActionButtonBar ([Request Change], [View Org Path], [Export Dossier])
│
└── ChangeRequestWizardDrawer (Right Slide-out Workflow Wizard)
    ├── WizardStep 1: Change Type Selector (Transfer, Promotion, Position/Org Change)
    ├── WizardStep 2: Target Organization & Position Picker (App 791 / Dictionary)
    ├── WizardStep 3: Effective Date & Business Justification
    ├── WizardStep 4: Before / After Impact Preview & Validation Check
    └── WizardStep 5: Confirmation & Submission to App 793
```

---

## 2. MODAL & OVERLAY SUBSYSTEMS

1. **`BeforeAfterSimulationModal`:** Side-by-side comparative preview of changed attributes + visual delta org chart.
2. **`ConfirmActionDialog`:** User confirmation modal before submitting change requests.
3. **`ToastNotificationSystem`:** Non-blocking feedback for success, warnings, and errors.
