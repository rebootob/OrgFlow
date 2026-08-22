# ORGFLOW — ROLE-BASED PERMISSION MATRIX
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
