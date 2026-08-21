/**
 * OrgFlow — Central Field Mapping & Data Normalization Dictionary
 * Version: 1.0.0
 * 
 * Maps raw Kintone Field Codes from 'Employee Namelist' into standardized OrgFlow Concept Properties.
 * Guarantees zero field renaming or modification in protected production Kintone Apps.
 */

export const EMPLOYEE_NAMELIST_FIELDS = {
    employeeId: 'emp_code',         // Protected Primary Key Target for Lookups
    nameTH: 'emp_name_th',          // Full Thai Name
    nameEN: 'emp_name_en',          // Full English Name
    nickname: 'nickname',           // Nickname
    departmentId: 'department',     // Department Code / Title
    section: 'section',             // Section / Sub-unit Title
    positionId: 'position',         // Position Title / Code
    grade: 'grade',                 // Job Level / Grade
    status: 'status',               // Employment Status ('Working', 'Active', 'Resigned')
    employmentType: 'emp_type',     // Full-time, Contract, Outsource
    email: 'email',                 // Corporate Email
    telephone: 'telephone',         // Phone / Extension
    photo: 'photo',                 // Profile Photo File Attachment
    kintoneUser: 'kintone_user',     // Optional Kintone User Selection Mapping
    managerId: 'manager_emp_code'   // Direct Manager Employee ID Pointer
};

/**
 * Confidential & Sensitive Fields to explicitly omit from General UI Payloads
 */
export const EXCLUDED_SENSITIVE_FIELDS = [
    'salary',
    'citizen_id',
    'bank_account',
    'medical_info',
    'private_phone',
    'hr_notes'
];

/**
 * Normalizes a raw Kintone Employee Namelist record object into a safe OrgFlow Employee domain model.
 * 
 * @param {Object} rawRecord Raw record object from kintone.api GET /k/v1/records.json
 * @returns {Object} Normalized OrgFlow Employee Model
 */
export function normalizeEmployeeRecord(rawRecord) {
    if (!rawRecord) return null;

    const getFieldValue = (fieldCode, defaultValue = '') => {
        if (rawRecord[fieldCode] && rawRecord[fieldCode].value !== undefined) {
            return rawRecord[fieldCode].value;
        }
        return defaultValue;
    };

    // Extract photo file key / URL if available
    let photoUrl = '';
    const photoField = rawRecord[EMPLOYEE_NAMELIST_FIELDS.photo];
    if (photoField && Array.isArray(photoField.value) && photoField.value.length > 0) {
        photoUrl = photoField.value[0].fileKey || '';
    }

    return {
        recordId: rawRecord.$id ? rawRecord.$id.value : null,
        employeeId: String(getFieldValue(EMPLOYEE_NAMELIST_FIELDS.employeeId)).trim(),
        nameTH: getFieldValue(EMPLOYEE_NAMELIST_FIELDS.nameTH),
        nameEN: getFieldValue(EMPLOYEE_NAMELIST_FIELDS.nameEN),
        nickname: getFieldValue(EMPLOYEE_NAMELIST_FIELDS.nickname),
        departmentId: getFieldValue(EMPLOYEE_NAMELIST_FIELDS.departmentId),
        section: getFieldValue(EMPLOYEE_NAMELIST_FIELDS.section),
        positionId: getFieldValue(EMPLOYEE_NAMELIST_FIELDS.positionId),
        grade: getFieldValue(EMPLOYEE_NAMELIST_FIELDS.grade),
        status: getFieldValue(EMPLOYEE_NAMELIST_FIELDS.status, 'Active'),
        employmentType: getFieldValue(EMPLOYEE_NAMELIST_FIELDS.employmentType, 'Full-Time'),
        email: getFieldValue(EMPLOYEE_NAMELIST_FIELDS.email),
        telephone: getFieldValue(EMPLOYEE_NAMELIST_FIELDS.telephone),
        photoUrl: photoUrl,
        kintoneUser: getFieldValue(EMPLOYEE_NAMELIST_FIELDS.kintoneUser, null),
        managerId: String(getFieldValue(EMPLOYEE_NAMELIST_FIELDS.managerId)).trim()
    };
}

export default {
    EMPLOYEE_NAMELIST_FIELDS,
    EXCLUDED_SENSITIVE_FIELDS,
    normalizeEmployeeRecord
};
