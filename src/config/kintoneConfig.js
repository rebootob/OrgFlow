/**
 * OrgFlow — Central Kintone System Configuration
 * Version: 1.0.0
 * Build Commit: 8409d30
 */

export const KINTONE_CONFIG = {
    // Kintone App IDs (Configurable per environment: DEV / UAT / PROD)
    APPS: {
        EMPLOYEE_NAMELIST: 101, // Protected Authoritative Employee Master App
        DEPARTMENT_MASTER: 102, // Department Hierarchy Master App
        POSITION_MASTER: 103,   // Decoupled Position & Headcount Master App
        ASSIGNMENT_LOG: 104,    // Time-based Org Assignment Log App
        CHANGE_REQUEST: 105,    // Org Change Workflow Request App
        CHANGE_LOG: 106         // Business Audit Change Log App
    },

    // API Execution Parameters
    API: {
        MAX_BATCH_SIZE: 500,    // Kintone REST API record limit per request
        REQUEST_TIMEOUT_MS: 15000,
        CACHE_EXPIRATION_MS: 300000 // 5 Minutes client cache
    },

    // Feature Toggles & System Capabilities
    FEATURES: {
        SHOW_VACANCY_TO_GENERAL: true,
        SHOW_EMAIL_TO_GENERAL: true,
        ENABLE_HISTORY_TIME_MACHINE: true,
        ENABLE_FUTURE_ORG_SCHEDULER: true,
        ENABLE_MANAGER_TEAM_DASHBOARD: true,
        ENABLE_EXECUTIVE_ANALYTICS: true,
        ENABLE_CIRCULAR_DETECTION: true
    },

    // System Access Role Constants
    ROLES: {
        GENERAL_SHARED: 'GENERAL_SHARED',
        MANAGER: 'MANAGER',
        HR: 'HR',
        HR_MANAGER: 'HR_MANAGER',
        EXECUTIVE: 'EXECUTIVE',
        SYSTEM_ADMIN: 'SYSTEM_ADMIN'
    }
};

export default KINTONE_CONFIG;
