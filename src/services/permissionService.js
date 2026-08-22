/**
 * OrgFlow — Permission & Security Service
 * Version: 2.0.0
 * 
 * Enforces strict read-only restrictions on shared accounts (GENERAL_SHARED)
 * and resolves individual account roles for auditability.
 */

import { SYSTEM_ROLES, ROLE_PERMISSIONS, resolveUserRole } from '../config/roleConfig.js';

export class PermissionService {
    constructor() {
        this.currentUser = null;
        this.currentRole = SYSTEM_ROLES.GENERAL_SHARED;
    }

    /**
     * Initializes the permission service with current Kintone user credentials.
     * 
     * @param {Object} user Kintone User Object (from kintone.getLoginUser())
     * @returns {String} Resolved System Role
     */
    initializeUser(user = null) {
        if (!user && typeof kintone !== 'undefined' && kintone.getLoginUser) {
            user = kintone.getLoginUser();
        }

        this.currentUser = user;
        this.currentRole = resolveUserRole(user);
        return this.currentRole;
    }

    /**
     * Checks if current user has permission to perform a specific action.
     * 
     * @param {String} permissionKey Permission constant from ROLE_PERMISSIONS
     * @returns {Boolean} True if permitted
     */
    can(permissionKey) {
        const rolePerms = ROLE_PERMISSIONS[this.currentRole] || [];
        return rolePerms.includes(permissionKey);
    }

    /**
     * Enforces Read-Only protection for Shared Account.
     * Throws an Security Exception if GENERAL_SHARED attempts a write operation.
     * 
     * @param {String} actionName Name of attempted action
     */
    assertWritePermission(actionName = 'Write Operation') {
        if (this.currentRole === SYSTEM_ROLES.GENERAL_SHARED) {
            throw new Error(`[SECURITY ACCESS DENIED] Shared/Common Account (GENERAL_SHARED) is strictly READ-ONLY. Action "${actionName}" requires logging in with an Individual Kintone Account for audit traceability.`);
        }
    }

    /**
     * Returns User Security Profile for UI rendering.
     * 
     * @returns {Object} Security Context
     */
    getUserSecurityContext() {
        return {
            userCode: this.currentUser ? this.currentUser.code : 'GENERAL_SHARED',
            userName: this.currentUser ? this.currentUser.name : 'General Staff (Shared)',
            role: this.currentRole,
            isSharedAccount: this.currentRole === SYSTEM_ROLES.GENERAL_SHARED,
            isReadOnly: this.currentRole === SYSTEM_ROLES.GENERAL_SHARED,
            canApproveRequests: this.can('APPROVE_CHANGE_REQUEST'),
            canEditOrgStructure: this.can('EDIT_ORG_STRUCTURE')
        };
    }
}

export const permissionService = new PermissionService();
export default permissionService;
