# ORGFLOW — ORGANIZATION EXPLORER ARCHITECTURE SPECIFICATION
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
