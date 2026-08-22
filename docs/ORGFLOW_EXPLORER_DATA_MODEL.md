# ORGFLOW — EXPLORER DATA MODEL SPECIFICATION
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
