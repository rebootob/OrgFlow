/**
 * OrgFlow — Kintone REST API Wrapper & Batch Execution Client
 * Version: 1.0.0
 * 
 * Provides robust batch fetching (`limit=500`), cursor pagination, error handling,
 * and security payload filtering for Kintone Apps.
 */

import { KINTONE_CONFIG } from '../config/kintoneConfig.js';
import { EXCLUDED_SENSITIVE_FIELDS } from '../config/fieldMappings.js';

export class KintoneClient {
    /**
     * Executes a GET request to Kintone REST API.
     * 
     * @param {string} url Kintone API endpoint URI
     * @param {Object} params Request parameters object
     * @returns {Promise<Object>} API JSON response promise
     */
    static async request(url, method = 'GET', params = {}) {
        // Fallback for mock/test execution environment outside Kintone
        if (typeof window === 'undefined' || typeof window.kintone === 'undefined') {
            console.warn('[OrgFlow KintoneClient] Native window.kintone API context unavailable.');
            return { records: [] };
        }

        try {
            const apiUri = window.kintone.api.url(url, true);
            const response = await window.kintone.api(apiUri, method, params);
            return response;
        } catch (error) {
            console.error(`[OrgFlow API Error] ${method} ${url}:`, error.message || error);
            throw new Error(`Kintone API call failed: ${error.message || 'Unknown Network Error'}`);
        }
    }

    /**
     * Fetches all records from a specified Kintone App in batches using offset pagination.
     * 
     * @param {number} appId Kintone App ID
     * @param {string} query Kintone query string
     * @param {Array<string>} fields List of field codes to retrieve
     * @returns {Promise<Array<Object>>} All matching record objects
     */
    static async fetchAllRecords(appId, query = '', fields = []) {
        const allRecords = [];
        const limit = KINTONE_CONFIG.API.MAX_BATCH_SIZE; // 500 records per batch
        let offset = 0;
        let hasMore = true;

        // Strip any prohibited sensitive fields from request parameter payload
        const safeFields = fields.filter(field => !EXCLUDED_SENSITIVE_FIELDS.includes(field));

        while (hasMore) {
            const batchQuery = `${query} limit ${limit} offset ${offset}`.trim();
            const params = {
                app: appId,
                query: batchQuery
            };
            
            if (safeFields.length > 0) {
                params.fields = safeFields;
            }

            const response = await this.request('/k/v1/records.json', 'GET', params);
            const records = response.records || [];
            allRecords.push(...records);

            if (records.length < limit) {
                hasMore = false;
            } else {
                offset += limit;
            }

            // Safety limit to prevent infinite loops during large queries
            if (offset >= 10000) {
                console.warn('[OrgFlow API Client] Maximum record iteration cap reached (10,000).');
                break;
            }
        }

        return allRecords;
    }

    /**
     * Submits a POST record creation request.
     * 
     * @param {number} appId Target Kintone App ID
     * @param {Object} record Kintone record payload object
     * @returns {Promise<Object>} Created record response ({ id, revision })
     */
    static async createRecord(appId, record) {
        const params = {
            app: appId,
            record: record
        };
        return await this.request('/k/v1/record.json', 'POST', params);
    }

    /**
     * Submits a PUT record update request.
     * 
     * @param {number} appId Target Kintone App ID
     * @param {number} recordId Target record ID
     * @param {Object} record Kintone record payload object
     * @returns {Promise<Object>} Updated record response ({ revision })
     */
    static async updateRecord(appId, recordId, record) {
        const params = {
            app: appId,
            id: recordId,
            record: record
        };
        return await this.request('/k/v1/record.json', 'PUT', params);
    }
}

export default KintoneClient;
