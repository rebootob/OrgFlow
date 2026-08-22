/**
 * OrgFlow — Central Field Mapping & Data Normalization Dictionary
 * Version: 2.0.0
 * 
 * Verified against Real Kintone Production App 53 (Employee Namelist).
 * Guarantees zero field renaming or modification in protected production Kintone Apps.
 */

export const EMPLOYEE_NAMELIST_FIELDS = {
    employeeId: 'emp_text',         // Real Discovered Code for "Employee ID"
    nameTH: 'Text_0',               // Real Discovered Code for "ชื่อ - นามสกุล"
    nameEN: 'Text',                 // Real Discovered Code for "Name - Surname"
    nickname: 'Text_1',             // Real Discovered Code for "Nickname"
    departmentId: 'Drop_down_0',    // Real Discovered Code for "Departmant"
    section: 'Drop_down_1',         // Real Discovered Code for "Section Name"
    team: 'Drop_down_2',            // Real Discovered Code for "Team"
    positionId: 'Text_2',           // Real Discovered Code for "Position"
    email: 'Text_4',                // Real Discovered Code for "Email"
    telephone: 'Text_11',           // Real Discovered Code for "Mobile"
    internalNo: 'Text_12',          // Real Discovered Code for "Internal No."
    photo: 'Attachment',            // Real Discovered Code for "Attachment"
    joinDate: 'Date',               // Real Discovered Code for "Start Date"
    status: 'Status',               // Real Discovered Code for Kintone Process Status
    codeNumber: 'Number',           // Real Discovered Code for "Code"
    branch: 'Radio_button',         // Real Discovered Code for "Branch" (BKK, AMT)
    gender: 'Radio_button_0'        // Real Discovered Code for "Gender"
};

/**
 * Confidential & Sensitive Fields to explicitly omit from General UI Payloads
 */
export const EXCLUDED_SENSITIVE_FIELDS = [
    'salary',
    'citizen_id',
    'bank_account',
    'father',
    'mother',
    'Spouse',
    'first_child',
    'second_child',
    'third_child'
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
        if (rawRecord[fieldCode] && rawRecord[fieldCode].value !== undefined && rawRecord[fieldCode].value !== null) {
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
        team: getFieldValue(EMPLOYEE_NAMELIST_FIELDS.team),
        positionId: getFieldValue(EMPLOYEE_NAMELIST_FIELDS.positionId),
        email: getFieldValue(EMPLOYEE_NAMELIST_FIELDS.email),
        telephone: getFieldValue(EMPLOYEE_NAMELIST_FIELDS.telephone),
        internalNo: getFieldValue(EMPLOYEE_NAMELIST_FIELDS.internalNo),
        photoUrl: photoUrl,
        joinDate: getFieldValue(EMPLOYEE_NAMELIST_FIELDS.joinDate),
        status: getFieldValue(EMPLOYEE_NAMELIST_FIELDS.status, 'Active'),
        branch: getFieldValue(EMPLOYEE_NAMELIST_FIELDS.branch),
        gender: getFieldValue(EMPLOYEE_NAMELIST_FIELDS.gender)
    };
}

export default {
    EMPLOYEE_NAMELIST_FIELDS,
    EXCLUDED_SENSITIVE_FIELDS,
    normalizeEmployeeRecord
};
