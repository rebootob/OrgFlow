/**
 * OrgFlow — Employee Data Service
 * Version: 2.0.0
 * 
 * Provides clean, normalized access to Employee Master records from Kintone App 53 (Employee Namelist).
 * Enforces zero payload leakage of confidential fields and handles cursor pagination.
 */

import kintoneClient from '../api/kintoneClient.js';
import { EMPLOYEE_NAMELIST_FIELDS, normalizeEmployeeRecord, EXCLUDED_SENSITIVE_FIELDS } from '../config/fieldMappings.js';
import kintoneConfig from '../config/kintoneConfig.js';
import sanitizer from '../utils/sanitizer.js';

export class EmployeeService {
    constructor() {
        this.appId = kintoneConfig.APPS.EMPLOYEE_NAMELIST || 53;
        this.cache = null;
        this.lastCacheTime = 0;
    }

    /**
     * Fetches all active employee records from Employee Namelist App ID 53.
     * Uses client-side caching (5 minutes) and normalization engine.
     * 
     * @param {Boolean} forceRefresh Force bypass cache
     * @returns {Promise<Array<Object>>} List of normalized OrgFlow Employee objects
     */
    async getAllEmployees(forceRefresh = false) {
        const now = Date.now();
        if (!forceRefresh && this.cache && (now - this.lastCacheTime < kintoneConfig.API.CACHE_EXPIRATION_MS)) {
            return this.cache;
        }

        const rawRecords = await kintoneClient.getRecords(this.appId);
        const normalizedList = rawRecords.map(rec => {
            const emp = normalizeEmployeeRecord(rec);
            // Sanitize string properties against XSS
            return sanitizer.sanitizeObject(emp);
        }).filter(emp => emp !== null);

        this.cache = normalizedList;
        this.lastCacheTime = now;
        return this.cache;
    }

    /**
     * Finds a single employee by Employee Business Key (emp_text).
     * 
     * @param {String} employeeId Employee Code / ID (e.g. "0021")
     * @returns {Promise<Object|null>} Normalized Employee object or null
     */
    async getEmployeeById(employeeId) {
        if (!employeeId) return null;
        const employees = await this.getAllEmployees();
        const searchKey = String(employeeId).trim();
        return employees.find(e => String(e.employeeId).trim() === searchKey) || null;
    }

    /**
     * Fetches employees belonging to a specific department.
     * 
     * @param {String} departmentId Department Name/Code
     * @returns {Promise<Array<Object>>} List of matching Employee objects
     */
    async getEmployeesByDepartment(departmentId) {
        if (!departmentId) return [];
        const employees = await this.getAllEmployees();
        const searchDept = String(departmentId).trim().toLowerCase();
        return employees.filter(e => String(e.departmentId || '').trim().toLowerCase() === searchDept);
    }

    /**
     * Searches employees by name, nickname, employee ID, or position.
     * 
     * @param {String} query Query keyword
     * @returns {Promise<Array<Object>>} Matching employees
     */
    async searchEmployees(query) {
        if (!query || typeof query !== 'string') return [];
        const keyword = query.trim().toLowerCase();
        const employees = await this.getAllEmployees();

        return employees.filter(e => {
            const id = (e.employeeId || '').toLowerCase();
            const nameTH = (e.nameTH || '').toLowerCase();
            const nameEN = (e.nameEN || '').toLowerCase();
            const nickname = (e.nickname || '').toLowerCase();
            const position = (e.positionId || '').toLowerCase();

            return id.includes(keyword) || nameTH.includes(keyword) || nameEN.includes(keyword) || nickname.includes(keyword) || position.includes(keyword);
        });
    }

    /**
     * Returns total employee count and department metrics.
     * 
     * @returns {Promise<Object>} Metrics summary
     */
    async getEmployeeMetrics() {
        const employees = await this.getAllEmployees();
        const deptCounts = {};

        employees.forEach(e => {
            const dept = e.departmentId || 'Unassigned';
            deptCounts[dept] = (deptCounts[dept] || 0) + 1;
        });

        return {
            totalEmployees: employees.length,
            departmentBreakdown: deptCounts,
            activeCount: employees.filter(e => e.status !== 'Inactive').length
        };
    }
}

export const employeeService = new EmployeeService();
export default employeeService;
