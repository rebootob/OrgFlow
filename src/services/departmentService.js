/**
 * OrgFlow — Department Master Data & Hierarchy Service
 * Version: 2.0.0
 * 
 * Manages Department Master metadata, hierarchy trees, and department head assignments.
 */

import employeeService from './employeeService.js';
import sanitizer from '../utils/sanitizer.js';

export class DepartmentService {
    constructor() {
        this.cache = null;
    }

    /**
     * Extracts unique departments from Employee Namelist records (App ID 53)
     * and builds department master objects.
     * 
     * @returns {Promise<Array<Object>>} List of Department objects
     */
    async getAllDepartments() {
        const employees = await employeeService.getAllEmployees();
        const deptMap = new Map();

        employees.forEach(emp => {
            const deptName = emp.departmentId || 'Unassigned';
            if (!deptMap.has(deptName)) {
                deptMap.set(deptName, {
                    id: deptName,
                    code: deptName.toUpperCase().replace(/\s+/g, '_'),
                    nameTH: deptName,
                    nameEN: deptName,
                    employeeCount: 0,
                    sections: new Set()
                });
            }

            const dept = deptMap.get(deptName);
            dept.employeeCount++;
            if (emp.section) dept.sections.add(emp.section);
        });

        const result = Array.from(deptMap.values()).map(d => ({
            ...d,
            sections: Array.from(d.sections)
        }));

        return sanitizer.sanitizeObject(result);
    }

    /**
     * Constructs a hierarchical tree structure of departments and sections.
     * 
     * @returns {Promise<Object>} Root hierarchy node
     */
    async getDepartmentTree() {
        const departments = await this.getAllDepartments();
        return {
            id: 'ROOT',
            name: 'Enterprise Organization Structure',
            children: departments.map(d => ({
                id: d.code,
                name: d.nameTH,
                type: 'DEPARTMENT',
                employeeCount: d.employeeCount,
                children: d.sections.map(s => ({
                    id: `${d.code}_${s.toUpperCase().replace(/\s+/g, '_')}`,
                    name: s,
                    type: 'SECTION'
                }))
            }))
        };
    }
}

export const departmentService = new DepartmentService();
export default departmentService;
