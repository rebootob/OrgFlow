/**
 * OrgFlow — Security Sanitizer & XSS Prevention Utility
 * Version: 1.0.0
 * 
 * Ensures all user-supplied text strings are safely escaped before insertion into DOM elements.
 */

/**
 * Escapes unsafe HTML special characters in string values.
 * 
 * @param {string|any} str Value to escape
 * @returns {string} Safe HTML escaped string
 */
export function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    const stringValue = String(str);
    return stringValue
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/**
 * Recursively sanitizes object properties by escaping string values.
 * 
 * @param {Object} obj Target object
 * @returns {Object} Sanitized object copy
 */
export function sanitizeObject(obj) {
    if (obj === null || typeof obj !== 'object') return obj;

    if (Array.isArray(obj)) {
        return obj.map(item => sanitizeObject(item));
    }

    const sanitizedObj = {};
    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'string') {
            sanitizedObj[key] = escapeHTML(value);
        } else if (typeof value === 'object' && value !== null) {
            sanitizedObj[key] = sanitizeObject(value);
        } else {
            sanitizedObj[key] = value;
        }
    }
    return sanitizedObj;
}

export default {
    escapeHTML,
    sanitizeObject
};
