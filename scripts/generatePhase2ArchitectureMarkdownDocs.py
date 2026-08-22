import os

rootDir = os.getcwd()
docsDir = os.path.join(rootDir, 'docs')

# 1. ORGFLOW_EXPLORER_ARCHITECTURE.md
arch_md = """# ORGFLOW — ORGANIZATION EXPLORER ARCHITECTURE SPECIFICATION
**Version:** 2.0.0  
**Phase:** Phase 2 Technical Architecture Design  
**Target Systems:** App 53 (Employee Master), App 791 (Org Master), App 792 (Assignment History), App 793 (Change Request)

---

## 1. SYSTEM ARCHITECTURE & COMPONENT TOPOLOGY

```mermaid
graph TB
    subgraph Kintone_Apps ["<b>Production Kintone Applications (Data Layer)</b>"]
        App53["<b>App 53: Employee Master</b><br/>• Employee Identity (emp_text, Text_0, Text)<br/>• Read-Only for Explorer"]
        App791["<b>App 791: Canonical Org Master</b><br/>• 33 Canonical Org Nodes (Level 1–5)<br/>• Hierarchy Paths & Types"]
        App792["<b>App 792: Assignment History</b><br/>• 275 Active Assignments + History<br/>• Position & Org Placement"]
        App793["<b>App 793: Change Request Workflow</b><br/>• 10-State Process Management<br/>• HR Review & Mandatory GM Approval"]
    end

    subgraph OrgFlow_Core ["<b>OrgFlow Explorer Portal (Client-Side Architecture)</b>"]
        DataEngine["<b>OrgFlow Unified Data Engine</b><br/>(Batch Fetching, O(1) Index Maps, Cache)"]
        HierarchyEngine["<b>Hierarchy & Placement Engine</b><br/>(O(N) Tree Builder, Reporting Resolver)"]
        SimulationEngine["<b>Before/After Simulation Engine</b><br/>(In-Memory Org Delta & Impact Analyzer)"]
        ExportEngine["<b>Multi-Format Export Engine</b><br/>(Excel XLSX & Scoped Paginated PDF)"]
    end

    subgraph OrgFlow_UI ["<b>User Interface & Interaction Layer</b>"]
        TopNav["<b>Top Toolbar</b><br/>Search, Level Filters, Position Filters, View Switcher"]
        Sidebar["<b>Left Navigation Sidebar</b><br/>Dashboard, Org Chart, Directory, Vacancies, Requests, Reports"]
        MainCanvas["<b>Multi-View Main Canvas</b><br/>• Interactive Org Chart (Lazy Loading, Zoom/Pan)<br/>• Employee Directory Table<br/>• Vacancy Matrix"]
        DetailDrawer["<b>Employee Detail Drawer</b><br/>Profile, Current Placement, Reporting, Assignment Timeline"]
        ChangeWizard["<b>HR Change Request Wizard</b><br/>Transfer, Promotion, Position/Org Change, Before/After Preview"]
    end

    App53 & App791 & App792 --> DataEngine
    DataEngine --> HierarchyEngine & SimulationEngine & ExportEngine
    HierarchyEngine --> MainCanvas & DetailDrawer
    SimulationEngine --> ChangeWizard
    ChangeWizard -.->|Submit Request (Zero Direct Writes to 792)| App793
    App793 -.->|Post-Approval Execution Engine| App792
```

---

## 2. SOURCE-OF-TRUTH ENFORCEMENT RULES

1. **Employee Identity (App 53):** Primary authority for Employee ID, Thai Name, English Name, Nickname, Email, Photo.
2. **Canonical Organization Structure (App 791):** Primary authority for 33 Approved Organization Nodes, Organization Levels, Parent Codes, and Full Hierarchy Paths.
3. **Operational Employee Placement (App 792):** Primary authority for Current Active Assignments (`assignment_status = 'CURRENT'`) and historical assignment logs.
4. **Change Request Workflow & Audit (App 793):** Primary authority for initiating, reviewing, approving, and tracing organizational changes.
5. **Explorer Guardrail:** Organization Explorer is the **Control Interface**. It never writes directly to App 792. Every employee change must pass through App 793.

---

## 3. CORE ENGINES & TECHNICAL SPECIFICATIONS

### A. Unified Data Access Engine (`src/services/dataEngine.js`)
- **Batch Query Optimizer:** Executes parallel 500-record batch fetches from Apps 53, 791, and 792 on startup with a 5-minute client-side in-memory cache.
- **Index Maps for \(O(1)\) Lookups:**
  - `employeeMap`: Map<employee_id, App53Record>
  - `orgNodeMap`: Map<organization_code, App791Record>
  - `currentAssignmentMap`: Map<employee_id, App792Record>
  - `assignmentHistoryMap`: Map<employee_id, Array<App792Record>>

### B. Hierarchy & Reporting Engine (`src/engines/hierarchyBuilder.js`)
- Constructs two distinct trees:
  1. **Organization Hierarchy Tree:** Built from App 791 parent-child codes (`TTMET` → `DIV-ME` → `TMT0` → `TMT1` → `TMT1-MACH`).
  2. **Manager Reporting Tree:** Derived by identifying Department/Section Heads (e.g. GM, DGM, Manager, Chief) and linking subordinates within the same organizational scope.

### C. Before / After Simulation Engine (`src/engines/simulationEngine.js`)
- Operates strictly in memory.
- Takes the current App 792 record, applies proposed App 793 changes, and renders a visual side-by-side delta without modifying production.

### D. Export Engine (`src/engines/exportEngine.js`)
- **Excel:** Generates multi-sheet formatted workbooks using clean English headers.
- **PDF:** Generates vector-rendered scoped organization charts (Company, Division, or Department scope) with corporate headers and metadata.
"""

# 2. ORGFLOW_EXPLORER_DATA_MODEL.md
data_model_md = """# ORGFLOW — EXPLORER DATA MODEL SPECIFICATION
**Version:** 2.0.0  
**Phase:** Phase 2 Technical Architecture Design  

---

## 1. CLIENT-SIDE ENTITY RELATIONSHIP MODEL

```mermaid
erDiagram
    EMPLOYEE ||--o{ ASSIGNMENT : has
    ORGANIZATION ||--o{ ASSIGNMENT : contains
    ORGANIZATION ||--o{ ORGANIZATION : parent_of
    ORGANIZATION ||--o{ VACANCY : defines
    POSITION ||--o{ ASSIGNMENT : classifies
    POSITION ||--o{ VACANCY : specifies
    EMPLOYEE ||--o{ CHANGE_REQUEST : target_of
    CHANGE_REQUEST }|--|| ORGANIZATION : proposes_org
    CHANGE_REQUEST }|--|| POSITION : proposes_pos

    EMPLOYEE {
        string employee_id PK "App 53 emp_text"
        string thai_name "App 53 Text_0"
        string english_name "App 53 Text"
        string email "App 53 Text_4"
        string raw_position "App 53 Text_2"
        string photo_url "App 53 Attachment"
    }

    ORGANIZATION {
        string organization_code PK "App 791 organization_code"
        string organization_name "App 791 organization_name"
        string organization_type "COMPANY | DIVISION | DEPARTMENT | SECTION | TEAM"
        int organization_level "1 to 5"
        string parent_organization_code FK "App 791 parent_organization_code"
        string hierarchy_path "Full breadcrumb"
        string status "ACTIVE | INACTIVE"
    }

    ASSIGNMENT {
        string assignment_id PK "App 792 assignment_id"
        string employee_id FK "App 792 employee_id"
        string position_code "App 792 position_code"
        string position_name "App 792 position_name"
        string organization_code FK "App 792 organization_code"
        string assignment_type "PRIMARY | CONCURRENT | TEMPORARY"
        string assignment_status "CURRENT | HISTORICAL | FUTURE"
        date effective_start_date "Start Date"
        date effective_end_date "End Date"
    }

    CHANGE_REQUEST {
        string request_id PK "App 793 request_id"
        string request_type "TRANSFER | PROMOTION | POSITION_CHANGE | etc."
        string employee_id FK "App 793 employee_id"
        string current_assignment_id FK "App 793 current_assignment_id"
        string proposed_organization_code FK "App 793 proposed_organization_code"
        string proposed_position_code "App 793 proposed_position_code"
        date effective_date "Target Date"
        string status "DRAFT | SUBMITTED | HR_REVIEW | GM_APPROVAL | APPROVED | EXECUTION_PENDING | EXECUTED"
        string hr_reviewer "User"
        string gm_approver "User"
    }

    VACANCY {
        string vacancy_id PK
        string organization_code FK
        string position_code
        string position_name
        int budgeted_headcount
        int active_headcount
        int vacancy_count
    }
```

---

## 2. COMPUTED RUNTIME AGGREGATIONS

1. **`headcountByOrg`:** Map<organization_code, { direct: int, totalRecursive: int }>
2. **`directReportsByEmployee`:** Map<employee_id, Array<EmployeeNode>>
3. **`vacanciesByOrg`:** Map<organization_code, Array<VacancyNode>>
"""

# 3. ORGFLOW_EXPLORER_PERMISSION_MATRIX.md
perm_md = """# ORGFLOW — ROLE-BASED PERMISSION MATRIX
**Version:** 2.0.0  
**Phase:** Phase 2 Technical Architecture Design  

---

## 1. ACCESS CONTROL MATRIX BY ROLE

| System Capability | General User | Section Manager | Department Head (GM) | HR Specialist | HR Manager / Admin | Integration Engine |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **View Organization Chart** | Permitted (All) | Permitted (All) | Permitted (All) | Permitted (All) | Permitted (All) | Permitted (All) |
| **Search Employee Directory** | Permitted (All) | Permitted (All) | Permitted (All) | Permitted (All) | Permitted (All) | Permitted (All) |
| **View Employee Detail Drawer** | Public Info Only | Scope Hierarchy | Scope Hierarchy | Full Details | Full Details | Full Details |
| **View Assignment Timeline History**| Hidden | Hidden | Permitted | Permitted | Permitted | Permitted |
| **View Vacancy Analytics** | Summary Only | Section Scope | Dept Scope | Permitted (All) | Permitted (All) | Permitted (All) |
| **Export Excel / PDF** | Hidden | Scope Export | Scope Export | Full Export | Full Export | Full Export |
| **Create Change Request (Wizard)** | Hidden | Scope Requests | Scope Requests | Permitted (All) | Permitted (All) | Permitted (All) |
| **Perform HR Review Transition** | Forbidden | Forbidden | Forbidden | Permitted | Permitted | Forbidden |
| **Perform GM Approval Transition** | Forbidden | Forbidden | **Mandatory Gate** | Forbidden | Permitted (Proxy) | Forbidden |
| **Queue Execution Transition** | Forbidden | Forbidden | Forbidden | Forbidden | Permitted | Auto Trigger |
| **Execute App 792 Assignment Write**| **FORBIDDEN** | **FORBIDDEN** | **FORBIDDEN** | **FORBIDDEN** | **FORBIDDEN** | **AUTHORIZED (Post-Approval)** |

---

## 2. SECURITY ENFORCEMENT ARCHITECTURE

1. **Client-Side UI Rendering:** Buttons, action drawers, and export triggers are conditionally mounted based on `kintone.getLoginUser()`.
2. **Kintone App-Level ACLs:** Permissions configured directly on App 793 ensure that unauthorized users cannot execute API mutations regardless of UI state.
3. **Execution Isolation:** No user role (including HR and GM) has permission to mutate App 792 directly from the browser; execution is restricted to the post-approval pipeline.
"""

# 4. ORGFLOW_EXPLORER_UI_COMPONENT_MAP.md
ui_comp_md = """# ORGFLOW — UI COMPONENT ARCHITECTURE & LAYOUT MAP
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
"""

# 5. ORGFLOW_EXPLORER_SIMULATION_DESIGN.md
sim_md = """# ORGFLOW — BEFORE / AFTER SIMULATION ENGINE DESIGN
**Version:** 2.0.0  
**Phase:** Phase 2 Technical Architecture Design  

---

## 1. SIMULATION ARCHITECTURE & WORKFLOW

```mermaid
sequenceDiagram
    participant HR as HR Specialist
    participant Wizard as Change Wizard UI
    participant SimEngine as Simulation Engine (Memory)
    participant Validator as Integrity Validator
    participant App793 as App 793 API

    HR->>Wizard: Selects Target Org & Position
    Wizard->>SimEngine: Passes (Current App 792, Proposed App 793)
    SimEngine->>SimEngine: Clones Active In-Memory Hierarchy
    SimEngine->>SimEngine: Applies Delta (Move Node, Update Headcount)
    SimEngine->>Validator: Validates Delta
    Validator-->>SimEngine: Returns (0 Errors, Impact Metrics)
    SimEngine-->>Wizard: Renders Side-by-Side BEFORE vs AFTER
    HR->>Wizard: Clicks "Submit Request"
    Wizard->>App793: POST /k/v1/record.json (ZERO Writes to App 792)
    App793-->>Wizard: Request Created (CR-YYYYMM-XXXX)
```

---

## 2. IMPACT ANALYSIS METRICS CALCULATED IN-MEMORY

1. **Position Delta:** Old Position Title & Code vs New Position Title & Code.
2. **Organization Delta:** Source Org Node vs Destination Org Node.
3. **Reporting Line Delta:** Previous Manager vs New Manager.
4. **Headcount Rebalancing:** Source Org Count \(-1\), Destination Org Count \(+1\).
5. **Vacancy Impact:** Source Org Vacancy \(+1\), Destination Org Vacancy \(-1\).
6. **Integrity Rule Validation:**
   - Detect circular manager reporting.
   - Detect self-reporting.
   - Validate proposed organization code exists in App 791.
   - Validate proposed position code exists in canonical dictionary.
"""

# 6. ORGFLOW_EXPLORER_EXPORT_DESIGN.md
export_md = """# ORGFLOW — MULTI-FORMAT EXPORT ENGINE DESIGN
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
"""

# 7. PROPOSED_SCHEMA_EXTENSION.md
ext_md = """# ORGFLOW — PROPOSED SCHEMA EXTENSION AUDIT
**Version:** 2.0.0  
**Phase:** Phase 2 Technical Architecture Design  

---

## 1. PRODUCTION APPS SCHEMA EVALUATION

| Application | Required Fields for Explorer | Deployed Status | Missing Fields Detected | Schema Action |
| :--- | :--- | :---: | :---: | :---: |
| **App 53 (Employee Master)** | `emp_text`, `Text_0`, `Text`, `Text_2`, `Attachment` | **Deployed (44 fields)** | **None** | **ZERO MODIFICATIONS (Protected)** |
| **App 791 (Org Master)** | `organization_code`, `organization_name`, `organization_type`, `organization_level`, `parent_organization_code`, `hierarchy_path` | **Deployed (22 fields)** | **None** | **ZERO MODIFICATIONS (Protected)** |
| **App 792 (Assignment History)** | `assignment_id`, `employee_id`, `position_code`, `position_name`, `organization_code`, `organization_name`, `organization_type`, `assignment_status`, `effective_start_date` | **Deployed (30 fields)** | **None** | **ZERO MODIFICATIONS (Protected)** |
| **App 793 (Change Request)** | `request_id`, `request_type`, `employee_id`, `thai_name`, `english_name`, `current_assignment_id`, `proposed_organization_code`, `proposed_position_code`, `effective_date`, `hr_reviewer`, `gm_approver`, `execution_status` | **Deployed (47 fields)** | **None** | **ZERO MODIFICATIONS (Protected)** |

---

## 2. CONCLUSION

> **Zero Schema Extensions Required.**  
> All 4 production Kintone applications already contain 100% of the required fields, relationships, and workflow states to support the complete Organization Explorer and HR Change Management Portal.  
> **Production App Schema Modification: ZERO.**
"""

with open(os.path.join(docsDir, 'ORGFLOW_EXPLORER_ARCHITECTURE.md'), 'w', encoding='utf-8') as f:
    f.write(arch_md)

with open(os.path.join(docsDir, 'ORGFLOW_EXPLORER_DATA_MODEL.md'), 'w', encoding='utf-8') as f:
    f.write(data_model_md)

with open(os.path.join(docsDir, 'ORGFLOW_EXPLORER_PERMISSION_MATRIX.md'), 'w', encoding='utf-8') as f:
    f.write(perm_md)

with open(os.path.join(docsDir, 'ORGFLOW_EXPLORER_UI_COMPONENT_MAP.md'), 'w', encoding='utf-8') as f:
    f.write(ui_comp_md)

with open(os.path.join(docsDir, 'ORGFLOW_EXPLORER_SIMULATION_DESIGN.md'), 'w', encoding='utf-8') as f:
    f.write(sim_md)

with open(os.path.join(docsDir, 'ORGFLOW_EXPLORER_EXPORT_DESIGN.md'), 'w', encoding='utf-8') as f:
    f.write(export_md)

with open(os.path.join(docsDir, 'PROPOSED_SCHEMA_EXTENSION.md'), 'w', encoding='utf-8') as f:
    f.write(ext_md)

print("Generated all 7 Phase 2 Technical Architecture Markdown documents successfully.")
