/**
 * OrgFlow — System Access Role & Permission Configuration
 * Version: 1.0.0
 */

import { KINTONE_CONFIG } from './kintoneConfig.js';

export const SYSTEM_ROLES = KINTONE_CONFIG.ROLES;

export const ROLE_PERMISSIONS = {
    [SYSTEM_ROLES.GENERAL_SHARED]: {
        viewOrgChart: true,
        viewDirectory: true,
        viewBasicProfile: true,
        viewHeadcountSummary: true,
        viewVacancy: KINTONE_CONFIG.FEATURES.SHOW_VACANCY_TO_GENERAL,
        viewMyTeam: false,             // Disabled (No individual identity)
        viewHistory: false,
        viewFutureOrg: false,
        createChangeRequest: false,
        approveChangeRequest: false,
        manageMasterData: false,
        exportBulkData: false,
        accessSystemAdmin: false,
        isReadOnly: true
    },

    [SYSTEM_ROLES.MANAGER]: {
        viewOrgChart: true,
        viewDirectory: true,
        viewBasicProfile: true,
        viewHeadcountSummary: true,
        viewVacancy: true,
        viewMyTeam: true,              // Enabled for individual account manager
        viewHistory: true,
        viewFutureOrg: false,
        createChangeRequest: false,
        approveChangeRequest: false,
        manageMasterData: false,
        exportBulkData: false,
        accessSystemAdmin: false,
        isReadOnly: true
    },

    [SYSTEM_ROLES.HR]: {
        viewOrgChart: true,
        viewDirectory: true,
        viewBasicProfile: true,
        viewHeadcountSummary: true,
        viewVacancy: true,
        viewMyTeam: false,
        viewHistory: true,
        viewFutureOrg: true,
        createChangeRequest: true,     // Can initiate Transfer & Promotion requests
        approveChangeRequest: false,
        manageMasterData: true,
        exportBulkData: true,
        accessSystemAdmin: false,
        isReadOnly: false
    },

    [SYSTEM_ROLES.HR_MANAGER]: {
        viewOrgChart: true,
        viewDirectory: true,
        viewBasicProfile: true,
        viewHeadcountSummary: true,
        viewVacancy: true,
        viewMyTeam: true,
        viewHistory: true,
        viewFutureOrg: true,
        createChangeRequest: true,
        approveChangeRequest: true,    // Approval Authority
        manageMasterData: true,
        exportBulkData: true,
        accessSystemAdmin: false,
        isReadOnly: false
    },

    [SYSTEM_ROLES.EXECUTIVE]: {
        viewOrgChart: true,
        viewDirectory: true,
        viewBasicProfile: true,
        viewHeadcountSummary: true,
        viewVacancy: true,
        viewMyTeam: false,
        viewHistory: true,
        viewFutureOrg: true,
        createChangeRequest: false,
        approveChangeRequest: true,    // Optional approval for executive level
        manageMasterData: false,
        exportBulkData: false,
        accessSystemAdmin: false,
        isReadOnly: true
    },

    [SYSTEM_ROLES.SYSTEM_ADMIN]: {
        viewOrgChart: true,
        viewDirectory: true,
        viewBasicProfile: false,       // Isolated from HR profile details
        viewHeadcountSummary: false,
        viewVacancy: false,
        viewMyTeam: false,
        viewHistory: false,
        viewFutureOrg: false,
        createChangeRequest: false,
        approveChangeRequest: false,
        manageMasterData: false,
        exportBulkData: false,
        accessSystemAdmin: true,       // Platform Config, App IDs & Field Mappings
        isReadOnly: false
    }
};

/**
 * Resolves current user's active OrgFlow System Access Role based on Kintone user context.
 * 
 * @param {Object} kintoneUser User object from kintone.getLoginUser()
 * @returns {string} System Access Role Code
 */
export function resolveUserRole(kintoneUser) {
    if (!kintoneUser) return SYSTEM_ROLES.GENERAL_SHARED;

    // Check Administrator flag
    if (kintoneUser.isAdministrator) {
        return SYSTEM_ROLES.SYSTEM_ADMIN;
    }

    // Role resolution by username / group mapping rules
    const username = (kintoneUser.code || '').toLowerCase();
    
    if (username.includes('hr_mgr') || username.includes('hrmanager')) {
        return SYSTEM_ROLES.HR_MANAGER;
    }
    if (username.includes('hr') || username.includes('personnel')) {
        return SYSTEM_ROLES.HR;
    }
    if (username.includes('gm') || username.includes('president') || username.includes('exec')) {
        return SYSTEM_ROLES.EXECUTIVE;
    }
    if (username.includes('mgr') || username.includes('manager')) {
        return SYSTEM_ROLES.MANAGER;
    }

    // Default for Shared / Common Kintone Accounts or general users
    return SYSTEM_ROLES.GENERAL_SHARED;
}

export default {
    SYSTEM_ROLES,
    ROLE_PERMISSIONS,
    resolveUserRole
};
