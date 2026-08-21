# OrgFlow — Technical Architecture & System Design Document

## 1. System Overview & Layered Architecture

OrgFlow is an Enterprise Organization Management System designed to run as a Kintone Custom View application. It strictly follows a decoupled, 4-tier architecture pattern:

```text
 +---------------------------------------------------------------------------------+
 |                           PRESENTATION LAYER (UI SPA)                           |
 |  Navbar | Sidebar | Dashboard | Org Chart SVG Engine | Directory | Change Portal|
 +---------------------------------------------------------------------------------+
                                         |
                                         v
 +---------------------------------------------------------------------------------+
 |                              BUSINESS LOGIC LAYER                               |
 |  HierarchyBuilder | ValidationEngine | VacancyCalculator | TimeMachineEngine   |
 +---------------------------------------------------------------------------------+
                                         |
                                         v
 +---------------------------------------------------------------------------------+
 |                              DATA SERVICES LAYER                                |
 |  EmployeeService | DepartmentService | PositionService | ChangeRequestService   |
 +---------------------------------------------------------------------------------+
                                         |
                                         v
 +---------------------------------------------------------------------------------+
 |                         KINTONE INTEGRATION LAYER API                           |
 |  KintoneClient (Batch Query, Cursor Pagination, Session Permission Check)       |
 +---------------------------------------------------------------------------------+
                                         |
                                         v
 +---------------------------------------------------------------------------------+
 |                             KINTONE CORE PLATFORM                               |
 |  Employee Master | Dept Master | Position Master | Assignment | Change Request   |
 +---------------------------------------------------------------------------------+
```

---

## 2. Decoupled Identity Architecture

### Employee Identity vs. Kintone User Mapping
OrgFlow maintains a strict separation between Business Identity (`Employee_ID`) and System Identity (`Kintone_User`):

- **Employee Master:** Stores `Employee_ID` as the primary key.
- **Kintone_User:** Optional text field storing the login username (e.g. `john.doe`).
- **Hierarchy Construction:** The Org Chart tree is built using `Manager_Employee_ID` lookup pointers:

$$\text{Node}_{\text{Parent}} = \text{FindNodeByEmployeeID}(\text{Node}_{\text{Current}}.\text{Manager\_Employee\_ID})$$

If an employee has `Kintone_User = NULL`, they are fully rendered in the tree, assigned headcount, and calculated in analytics, but cannot log into personalized views.

---

## 3. Core Engine Specifications

### 3.1 Hierarchy & Tree Builder Engine (`hierarchyBuilder.js`)
- Constructs N-ary tree structures from flat Kintone record lists in $O(N)$ time using Hash Maps (`Map<Employee_ID, EmployeeNode>`).
- Performs recursive rollup calculations for:
  - **Direct Reports Count:** Immediate child nodes.
  - **Indirect Reports Count:** All descendant nodes.
  - **Organization Depth Layer:** Maximum tree height from root node to current leaf.

### 3.2 Data Quality & Safety Engine (`validationEngine.js`)
- **Circular Reporting Detector:** Implements Depth-First Search (DFS) with visited state tracking to flag cycle patterns ($A \rightarrow B \rightarrow C \rightarrow A$).
- **Self-Reporting Prevention:** Rejects updates where `Manager_Employee_ID == Employee_ID`.
- **Orphan Node Detector:** Identifies active employees whose manager, department, or position ID cannot be resolved in active master records.

### 3.3 Vacancy & Headcount Engine (`vacancyCalculator.js`)
- Calculates vacancy figures per position and department:

$$\text{Vacancy} = \text{Approved\_Headcount} - \text{Count}(\text{Active\_Filled\_Employees})$$

- Renders `VACANT` nodes dynamically within the Org Chart structure for unfilled positions.

### 3.4 Time-Machine Engine (`timeMachineEngine.js`)
- Evaluates active assignments based on target snapshot date ($T_{\text{target}}$):

$$\text{IsActive}(R, T_{\text{target}}) = (R.\text{Effective\_From} \le T_{\text{target}}) \land (R.\text{Effective\_To} \ge T_{\text{target}} \lor R.\text{Effective\_To} = \text{NULL})$$

- Enables switching between Past, Present, and Scheduled Future organizational states.

---

## 4. Frontend Architecture & Folder Structure

```text
src/
├── api/
│   └── kintoneClient.js          # Standardized Kintone REST API wrapper (Batching & Pagination)
├── config/
│   ├── kintoneConfig.js          # App ID & Global System Constants
│   ├── fieldMappings.js          # Central Field Code Mapping Dictionary
│   └── roleConfig.js             # Access Roles & Feature Permissions
├── services/
│   ├── employeeService.js        # Employee Data CRUD & Lookup
│   ├── departmentService.js     # Department Master Service
│   ├── positionService.js       # Position & Vacancy Service
│   ├── assignmentService.js     # Historical Assignment Service
│   └── changeRequestService.js  # Transfer & Promotion Workflow Service
├── business/
│   ├── hierarchyBuilder.js       # Hierarchy Tree Generator
│   ├── validationEngine.js       # Circular, Self-Manager, & Orphan Validation
│   ├── vacancyCalculator.js      # Headcount & Vacancy Rollup Engine
│   ├── impactAnalyzer.js         # Pre-commit Change Impact Assessment
│   └── timeMachineEngine.js      # Time-based Snapshot Filter Engine
├── components/
│   ├── navbar.js                 # Top Navigation Bar with Date Selector
│   ├── sidebar.js                # Role-based Sidebar Navigation
│   ├── orgChartNode.js           # SVG Org Chart Node Card
│   ├── employeeSidePanel.js      # Interactive Employee Detail Drawer
│   ├── modal.js                  # Standardized Modal Dialog
│   └── dataTable.js              # Searchable Data Grid component
├── pages/
│   ├── dashboardPage.js          # Role-based Dashboard Views
│   ├── orgChartPage.js           # Interactive Org Chart View
│   ├── directoryPage.js          # Searchable Employee Directory View
│   ├── vacancyPage.js            # Vacancy Management View
│   ├── orgChangePage.js          # Workflow & Transfer Request View
│   └── planningPage.js           # Workforce Planning & Scenario View
├── styles/
│   ├── variables.css             # Theme Color Variables & CSS Custom Properties
│   └── main.css                  # Enterprise Layout & Component Styling
└── index.js                      # Custom View Entry Point & Client Router
```
