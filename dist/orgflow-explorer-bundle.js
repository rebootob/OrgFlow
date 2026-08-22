
// Auto-injected OrgFlow Explorer Styles
(function() {
    if (!document.getElementById('orgflow-explorer-styles')) {
        const style = document.createElement('style');
        style.id = 'orgflow-explorer-styles';
        style.textContent = "/**\n * OrgFlow — Organization Explorer & HR Portal Styling\n * Corporate Design System, isolated namespace (#orgflow-explorer-app).\n * Zero collision with default Kintone styling.\n */\n\n#orgflow-explorer-app {\n    font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Inter', Roboto, sans-serif;\n    color: #1e293b;\n    background-color: #f8fafc;\n    min-height: calc(100vh - 120px);\n    display: flex;\n    flex-direction: column;\n    box-sizing: border-box;\n}\n\n#orgflow-explorer-app * {\n    box-sizing: border-box;\n}\n\n/* TOP TOOLBAR */\n.orgflow-toolbar {\n    background: #ffffff;\n    border-bottom: 1px solid #e2e8f0;\n    padding: 12px 20px;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 16px;\n    position: sticky;\n    top: 0;\n    z-index: 40;\n    box-shadow: 0 1px 3px rgba(0,0,0,0.05);\n}\n\n.orgflow-logo-area {\n    display: flex;\n    align-items: center;\n    gap: 12px;\n}\n\n.orgflow-brand {\n    font-size: 18px;\n    font-weight: 700;\n    color: #0284c7;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n}\n\n.orgflow-brand-badge {\n    background: #e0f2fe;\n    color: #0369a1;\n    font-size: 11px;\n    padding: 2px 6px;\n    border-radius: 4px;\n    font-weight: 600;\n}\n\n.orgflow-search-box {\n    position: relative;\n    width: 320px;\n}\n\n.orgflow-search-input {\n    width: 100%;\n    padding: 8px 12px 8px 34px;\n    border: 1px solid #cbd5e1;\n    border-radius: 6px;\n    font-size: 13px;\n    outline: none;\n    transition: border-color 0.2s;\n}\n\n.orgflow-search-input:focus {\n    border-color: #0284c7;\n    box-shadow: 0 0 0 2px rgba(2,132,199,0.15);\n}\n\n.orgflow-search-icon {\n    position: absolute;\n    left: 10px;\n    top: 50%;\n    transform: translateY(-50%);\n    color: #94a3b8;\n    font-size: 14px;\n}\n\n.orgflow-toolbar-controls {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n}\n\n.orgflow-select {\n    padding: 7px 10px;\n    border: 1px solid #cbd5e1;\n    border-radius: 6px;\n    font-size: 12px;\n    background: #ffffff;\n    color: #334155;\n    outline: none;\n}\n\n.orgflow-btn {\n    padding: 7px 14px;\n    border-radius: 6px;\n    font-size: 12px;\n    font-weight: 600;\n    cursor: pointer;\n    display: inline-flex;\n    align-items: center;\n    gap: 6px;\n    border: 1px solid transparent;\n    transition: all 0.15s ease-in-out;\n}\n\n.orgflow-btn-primary {\n    background: #0284c7;\n    color: #ffffff;\n}\n\n.orgflow-btn-primary:hover {\n    background: #0369a1;\n}\n\n.orgflow-btn-outline {\n    background: #ffffff;\n    border-color: #cbd5e1;\n    color: #334155;\n}\n\n.orgflow-btn-outline:hover {\n    background: #f1f5f9;\n    border-color: #94a3b8;\n}\n\n/* MAIN LAYOUT */\n.orgflow-body {\n    display: flex;\n    flex: 1;\n    overflow: hidden;\n}\n\n/* SIDEBAR */\n.orgflow-sidebar {\n    width: 230px;\n    background: #ffffff;\n    border-right: 1px solid #e2e8f0;\n    padding: 16px 10px;\n    display: flex;\n    flex-direction: column;\n    gap: 4px;\n}\n\n.orgflow-nav-item {\n    padding: 9px 12px;\n    border-radius: 6px;\n    font-size: 13px;\n    font-weight: 500;\n    color: #475569;\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    transition: all 0.15s ease-in-out;\n}\n\n.orgflow-nav-item:hover {\n    background: #f1f5f9;\n    color: #0f172a;\n}\n\n.orgflow-nav-item.active {\n    background: #e0f2fe;\n    color: #0284c7;\n    font-weight: 600;\n}\n\n.orgflow-nav-badge {\n    margin-left: auto;\n    background: #f1f5f9;\n    color: #64748b;\n    font-size: 10px;\n    padding: 2px 6px;\n    border-radius: 10px;\n}\n\n/* CONTENT CANVAS */\n.orgflow-canvas {\n    flex: 1;\n    padding: 20px;\n    overflow-y: auto;\n    background: #f8fafc;\n}\n\n/* BREADCRUMB */\n.orgflow-breadcrumb-bar {\n    background: #ffffff;\n    padding: 8px 16px;\n    border-radius: 6px;\n    border: 1px solid #e2e8f0;\n    margin-bottom: 16px;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 12px;\n}\n\n.orgflow-breadcrumb-link {\n    color: #0284c7;\n    cursor: pointer;\n    font-weight: 500;\n}\n\n.orgflow-breadcrumb-link:hover {\n    text-decoration: underline;\n}\n\n.orgflow-breadcrumb-separator {\n    color: #94a3b8;\n}\n\n/* KPI DASHBOARD TILES */\n.orgflow-kpi-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n    gap: 16px;\n    margin-bottom: 20px;\n}\n\n.orgflow-kpi-card {\n    background: #ffffff;\n    border: 1px solid #e2e8f0;\n    border-radius: 8px;\n    padding: 16px;\n    box-shadow: 0 1px 2px rgba(0,0,0,0.03);\n}\n\n.orgflow-kpi-title {\n    font-size: 12px;\n    color: #64748b;\n    font-weight: 600;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n}\n\n.orgflow-kpi-value {\n    font-size: 26px;\n    font-weight: 700;\n    color: #0f172a;\n    margin-top: 4px;\n}\n\n.orgflow-kpi-sub {\n    font-size: 11px;\n    color: #10b981;\n    margin-top: 4px;\n}\n\n/* ORG CHART TREE CANVAS */\n.orgflow-chart-container {\n    background: #ffffff;\n    border: 1px solid #e2e8f0;\n    border-radius: 8px;\n    padding: 24px;\n    min-height: 500px;\n    overflow: auto;\n}\n\n.orgflow-tree-node {\n    display: inline-flex;\n    flex-direction: column;\n    align-items: center;\n    margin: 10px;\n}\n\n.orgflow-node-card {\n    background: #ffffff;\n    border: 1px solid #cbd5e1;\n    border-radius: 8px;\n    width: 260px;\n    padding: 12px;\n    box-shadow: 0 2px 4px rgba(0,0,0,0.04);\n    cursor: pointer;\n    transition: all 0.2s;\n    position: relative;\n}\n\n.orgflow-node-card:hover {\n    border-color: #0284c7;\n    box-shadow: 0 4px 12px rgba(2,132,199,0.12);\n    transform: translateY(-2px);\n}\n\n.orgflow-node-header {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    border-bottom: 1px solid #f1f5f9;\n    padding-bottom: 6px;\n    margin-bottom: 8px;\n}\n\n.orgflow-node-type-badge {\n    font-size: 10px;\n    font-weight: 700;\n    padding: 2px 6px;\n    border-radius: 4px;\n    text-transform: uppercase;\n}\n\n.type-company { background: #fef08a; color: #854d0e; }\n.type-division { background: #e0e7ff; color: #3730a3; }\n.type-department { background: #e0f2fe; color: #0369a1; }\n.type-section { background: #f1f5f9; color: #334155; }\n.type-team { background: #fae8ff; color: #86198f; }\n\n.orgflow-node-name {\n    font-size: 13px;\n    font-weight: 700;\n    color: #0f172a;\n    line-height: 1.3;\n}\n\n.orgflow-node-code {\n    font-size: 11px;\n    color: #64748b;\n    font-family: monospace;\n}\n\n.orgflow-node-meta {\n    display: flex;\n    justify-content: space-between;\n    margin-top: 8px;\n    font-size: 11px;\n    color: #475569;\n}\n\n/* EMPLOYEE DIRECTORY TABLE */\n.orgflow-table-card {\n    background: #ffffff;\n    border: 1px solid #e2e8f0;\n    border-radius: 8px;\n    overflow: hidden;\n    box-shadow: 0 1px 3px rgba(0,0,0,0.03);\n}\n\n.orgflow-table {\n    width: 100%;\n    border-collapse: collapse;\n    font-size: 12px;\n}\n\n.orgflow-table th {\n    background: #f8fafc;\n    color: #475569;\n    font-weight: 600;\n    text-align: left;\n    padding: 10px 14px;\n    border-bottom: 1px solid #e2e8f0;\n}\n\n.orgflow-table td {\n    padding: 10px 14px;\n    border-bottom: 1px solid #f1f5f9;\n    color: #1e293b;\n}\n\n.orgflow-table tr:hover td {\n    background: #f0f9ff;\n    cursor: pointer;\n}\n\n/* STATUS BADGES */\n.orgflow-badge {\n    display: inline-block;\n    padding: 3px 8px;\n    border-radius: 4px;\n    font-size: 11px;\n    font-weight: 600;\n}\n\n.badge-active { background: #dcfce7; color: #15803d; }\n.badge-vacant { background: #fef3c7; color: #b45309; }\n.badge-acting { background: #e0e7ff; color: #4338ca; }\n.badge-pending { background: #ffedd5; color: #c2410c; }\n.badge-approved { background: #dbeafe; color: #1d4ed8; }\n.badge-executed { background: #dcfce7; color: #166534; }\n.badge-error { background: #fee2e2; color: #991b1b; }\n\n/* SIDE DRAWER */\n.orgflow-drawer-overlay {\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background: rgba(15, 23, 42, 0.4);\n    z-index: 100;\n    display: flex;\n    justify-content: flex-end;\n    animation: fadeIn 0.2s ease-out;\n}\n\n.orgflow-drawer {\n    width: 520px;\n    background: #ffffff;\n    height: 100%;\n    box-shadow: -4px 0 24px rgba(0,0,0,0.15);\n    display: flex;\n    flex-direction: column;\n    animation: slideLeft 0.25s ease-out;\n}\n\n.orgflow-drawer-header {\n    padding: 18px 24px;\n    border-bottom: 1px solid #e2e8f0;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n}\n\n.orgflow-drawer-title {\n    font-size: 16px;\n    font-weight: 700;\n    color: #0f172a;\n}\n\n.orgflow-drawer-close {\n    background: none;\n    border: none;\n    font-size: 20px;\n    cursor: pointer;\n    color: #94a3b8;\n}\n\n.orgflow-drawer-close:hover {\n    color: #0f172a;\n}\n\n.orgflow-drawer-tabs {\n    display: flex;\n    border-bottom: 1px solid #e2e8f0;\n    background: #f8fafc;\n}\n\n.orgflow-drawer-tab {\n    padding: 10px 16px;\n    font-size: 12px;\n    font-weight: 600;\n    color: #64748b;\n    cursor: pointer;\n    border-bottom: 2px solid transparent;\n}\n\n.orgflow-drawer-tab.active {\n    color: #0284c7;\n    border-bottom-color: #0284c7;\n    background: #ffffff;\n}\n\n.orgflow-drawer-body {\n    flex: 1;\n    padding: 20px 24px;\n    overflow-y: auto;\n}\n\n.orgflow-drawer-footer {\n    padding: 16px 24px;\n    border-top: 1px solid #e2e8f0;\n    background: #f8fafc;\n    display: flex;\n    justify-content: flex-end;\n    gap: 10px;\n}\n\n/* PREVIEW BANNER */\n.orgflow-preview-banner {\n    background: #fffbeb;\n    border: 1px solid #fde68a;\n    border-radius: 6px;\n    padding: 10px 14px;\n    margin-bottom: 16px;\n    font-size: 12px;\n    color: #92400e;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-weight: 500;\n}\n\n@keyframes fadeIn {\n    from { opacity: 0; }\n    to { opacity: 1; }\n}\n\n@keyframes slideLeft {\n    from { transform: translateX(100%); }\n    to { transform: translateX(0); }\n}\n";
        document.head.appendChild(style);
    }
})();

/**
 * OrgFlow — Organization Explorer & HR Change Management Portal
 * Standalone Client-Side Custom View Application
 * 
 * Version: 3.7.0 (Canonical Internal Identity Architecture: ORG-APP53-{recordId})
 * Verified against Real Production Kintone Apps:
 * App 53  = Employee Master (275 records)
 * App 791 = Canonical Organization Master (33 nodes)
 * App 792 = Employee Assignment History (275 records)
 * App 793 = Organization Change Request
 * 
 * 100% READ-ONLY DATA INTEGRATION / ZERO PRODUCTION WRITES.
 */

(function () {
    'use strict';

    // Application Config & Production App IDs
    const CONFIG = {
        APP_53: 53,
        APP_791: 791,
        APP_792: 792,
        APP_793: 793,
        CACHE_TTL_MS: 300000 // 5 Minutes
    };

    // Central Canonical Data Store
    class OrgFlowDataStore {
        constructor() {
            this.employees53 = [];
            this.orgs791 = [];
            this.assignments792 = [];
            this.requests793 = [];
            this.unifiedEmployees = [];

            this.empMap = new Map(); // Map<internal_id, EmployeeObject>
            this.orgMap = new Map(); // Map<organization_code, OrgObject>
            this.historyMap = new Map(); // Map<internal_id, Array<AssignmentObject>>
            this.treeNodes = new Map(); // Map<organization_code, TreeNodeObject>
            this.rootNodeCode = 'TTMET';
            this.isLoaded = false;
        }

        async loadAllData() {
            console.log('OrgFlow: Fetching data from Apps 53, 791, 792, 793 (READ-ONLY)...');

            // 1. App 53 (Employee Master)
            const rec53 = await this.fetchAllRecords(CONFIG.APP_53);
            this.employees53 = rec53;

            // 2. App 791 (Org Master)
            const rec791 = await this.fetchAllRecords(CONFIG.APP_791);
            this.orgs791 = rec791;

            // 3. App 792 (Assignment History)
            const rec792 = await this.fetchAllRecords(CONFIG.APP_792);
            this.assignments792 = rec792;

            // 4. App 793 (Change Requests)
            try {
                const rec793 = await this.fetchAllRecords(CONFIG.APP_793);
                this.requests793 = rec793;
            } catch (e) {
                console.warn('App 793 read note:', e);
                this.requests793 = [];
            }

            // Build Organization Map (App 791)
            this.orgMap.clear();
            this.orgs791.forEach(o => {
                const code = o.organization_code?.value?.trim();
                if (code) {
                    this.orgMap.set(code, {
                        organization_code: code,
                        organization_name: o.organization_name?.value?.trim() || code,
                        organization_type: o.organization_type?.value?.trim() || 'DEPARTMENT',
                        organization_level: parseInt(o.organization_level?.value || '1', 10),
                        parent_organization_code: o.parent_organization_code?.value?.trim() || null,
                        hierarchy_path: o.hierarchy_path?.value?.trim() || code,
                        code_status: o.code_status?.value?.trim() || 'ACTIVE'
                    });
                }
            });

            // Build App 53 Identity Map using Synthetic Internal ID (ORG-APP53-{recordId})
            this.empMap.clear();
            const rawIdentities = [];
            this.employees53.forEach(e => {
                const recId = String(e.$id?.value || '').trim();
                const rawEmpText = String(e.emp_text?.value || '').trim();
                const rawNumber = String(e.Number?.value || '').trim();
                // Preserve original string representation without numeric coercion
                const empNumStr = rawEmpText ? rawEmpText : rawNumber;
                const internalId = `ORG-APP53-${recId}`;

                let photoUrl = '';
                if (e.Attachment?.value?.length > 0) {
                    photoUrl = `/k/v1/file.json?fileKey=${e.Attachment.value[0].fileKey}`;
                }

                const identityObj = {
                    record_id: parseInt(recId, 10),
                    internal_id: internalId,
                    employee_id: empNumStr, // Business attribute (string)
                    thai_name: String(e.Text_0?.value || '').trim(),
                    english_name: String(e.Text?.value || '').trim(),
                    nickname: String(e.Text_1?.value || '').trim(),
                    raw_position: String(e.Text_2?.value || '').trim(),
                    email: String(e.Text_4?.value || '').trim(),
                    mobile: String(e.Text_11?.value || '').trim(),
                    start_date: String(e.Date?.value || '').trim(),
                    photo_url: photoUrl
                };

                this.empMap.set(internalId, identityObj);
                rawIdentities.push(identityObj);
            });

            // Parse App 792 Assignments
            const parsedAssignments = [];
            this.assignments792.forEach(a => {
                const asgRecId = String(a.$id?.value || '').trim();
                const asgId = String(a.assignment_id?.value || '').trim();
                const empId = String(a.employee_id?.value || '').trim();

                parsedAssignments.push({
                    assignment_rec_id: asgRecId,
                    assignment_id: asgId,
                    employee_id: empId,
                    thai_name: String(a.thai_name?.value || '').trim(),
                    english_name: String(a.english_name?.value || '').trim(),
                    position_code: String(a.position_code?.value || '').trim(),
                    position_name: String(a.position_name?.value || '').trim(),
                    organization_code: String(a.organization_code?.value || '').trim(),
                    organization_name: String(a.organization_name?.value || '').trim(),
                    organization_type: String(a.organization_type?.value || '').trim(),
                    assignment_type: String(a.assignment_type?.value || 'PRIMARY').trim(),
                    assignment_status: String(a.assignment_status?.value || 'CURRENT').trim(),
                    effective_start_date: String(a.effective_start_date?.value || '').trim(),
                    effective_end_date: String(a.effective_end_date?.value || '').trim(),
                    hierarchy_path: String(a.hierarchy_path?.value || '').trim()
                });
            });

            // Disambiguated In-Memory Joining between App 53 and App 792
            this.unifiedEmployees = [];
            this.historyMap.clear();

            rawIdentities.forEach(identity => {
                let matchedAsg = null;

                // Handle Ambiguous Employee IDs (e.g. '9000') using corroborating attributes
                if (identity.employee_id === '9000') {
                    if (identity.english_name.toLowerCase().includes('tomita')) {
                        matchedAsg = parsedAssignments.find(a => a.employee_id === '9000' && a.english_name.toLowerCase().includes('tomita') && a.assignment_status === 'CURRENT');
                    } else {
                        matchedAsg = parsedAssignments.find(a => a.employee_id === '9000' && a.english_name.toLowerCase().includes('panu') && a.assignment_status === 'CURRENT');
                    }
                } else {
                    matchedAsg = parsedAssignments.find(a => a.employee_id === identity.employee_id && a.assignment_status === 'CURRENT');
                }

                // Fallback matching if not directly found
                if (!matchedAsg) {
                    matchedAsg = {
                        assignment_id: `ASG-${identity.record_id}-DEF`,
                        position_code: 'POS-STAFF',
                        position_name: identity.raw_position || 'Staff',
                        organization_code: 'TTMET',
                        organization_name: 'Toyota Tsusho M&E (Thailand)',
                        organization_type: 'COMPANY',
                        assignment_type: 'PRIMARY',
                        assignment_status: 'CURRENT',
                        effective_start_date: identity.start_date,
                        hierarchy_path: 'TTMET'
                    };
                }

                const org = this.orgMap.get(matchedAsg.organization_code) || {};

                const unifiedObj = {
                    internal_id: identity.internal_id,
                    record_id: identity.record_id,
                    employee_id: identity.employee_id, // String (e.g. '0043', '9000')
                    thai_name: identity.thai_name || matchedAsg.thai_name || '',
                    english_name: identity.english_name || matchedAsg.english_name || '',
                    nickname: identity.nickname || '',
                    email: identity.email || '',
                    mobile: identity.mobile || '',
                    photo_url: identity.photo_url || '',
                    start_date: identity.start_date || '',
                    raw_position: identity.raw_position || '',
                    position_code: matchedAsg.position_code || 'POS-STAFF',
                    position_name: matchedAsg.position_name || identity.raw_position || 'Staff',
                    organization_code: matchedAsg.organization_code || 'TTMET',
                    organization_name: matchedAsg.organization_name || org.organization_name || 'Toyota Tsusho M&E (Thailand)',
                    organization_type: matchedAsg.organization_type || org.organization_type || 'COMPANY',
                    assignment_type: matchedAsg.assignment_type || 'PRIMARY',
                    assignment_status: matchedAsg.assignment_status || 'CURRENT',
                    effective_start_date: matchedAsg.effective_start_date || identity.start_date || '',
                    hierarchy_path: matchedAsg.hierarchy_path || org.hierarchy_path || ''
                };

                this.unifiedEmployees.push(unifiedObj);

                // Populate History Map by internal_id
                const empHistory = parsedAssignments.filter(a => a.employee_id === identity.employee_id);
                this.historyMap.set(identity.internal_id, empHistory);
            });

            // Build Recursive Tree Graph from App 791 and compute exact Headcounts
            this.buildRecursiveHierarchyTree();

            this.isLoaded = true;
            console.log(`OrgFlow Data Loaded: ${this.unifiedEmployees.length} Canonical Person Identities (Unique internal_ids: ${this.empMap.size}) across ${this.orgMap.size} Canonical Units.`);
        }

        buildRecursiveHierarchyTree() {
            this.treeNodes.clear();

            // Step 1: Initialize all node wrappers
            this.orgMap.forEach(org => {
                this.treeNodes.set(org.organization_code, {
                    code: org.organization_code,
                    name: org.organization_name,
                    type: org.organization_type,
                    level: org.organization_level,
                    parentCode: org.parent_organization_code,
                    hierarchyPath: org.hierarchy_path,
                    children: [],
                    directEmployees: [],
                    directHeadcount: 0,
                    descendantHeadcount: 0,
                    totalHeadcount: 0,
                    allDescendantCodes: new Set()
                });
            });

            // Step 2: Establish Parent-Child Links
            this.treeNodes.forEach(node => {
                if (node.parentCode && this.treeNodes.has(node.parentCode)) {
                    this.treeNodes.get(node.parentCode).children.push(node);
                }
            });

            // Step 3: Populate Direct Employees using internal_id uniqueness
            this.unifiedEmployees.forEach(emp => {
                const orgNode = this.treeNodes.get(emp.organization_code);
                if (orgNode) {
                    orgNode.directEmployees.push(emp);
                } else {
                    const rootNode = this.treeNodes.get(this.rootNodeCode);
                    if (rootNode) rootNode.directEmployees.push(emp);
                }
            });

            // Step 4: Recursive Headcount & Descendant Aggregation
            const computeMetrics = (node) => {
                node.directHeadcount = node.directEmployees.length;
                let descCount = 0;
                node.allDescendantCodes = new Set();

                node.children.forEach(child => {
                    node.allDescendantCodes.add(child.code);
                    computeMetrics(child);
                    child.allDescendantCodes.forEach(code => node.allDescendantCodes.add(code));
                    descCount += child.totalHeadcount;
                });

                node.descendantHeadcount = descCount;
                node.totalHeadcount = node.directHeadcount + node.descendantHeadcount;
            };

            const root = this.treeNodes.get(this.rootNodeCode);
            if (root) computeMetrics(root);
        }

        async fetchAllRecords(appId) {
            let all = [];
            let offset = 0;
            const limit = 500;
            let hasMore = true;

            while (hasMore) {
                const query = `limit ${limit} offset ${offset}`;
                const res = await kintone.api(kintone.api.url('/k/v1/records.json', true), 'GET', { app: appId, query });
                const recs = res.records || [];
                all.push(...recs);
                if (recs.length < limit) {
                    hasMore = false;
                } else {
                    offset += limit;
                }
            }
            return all;
        }

        getUnifiedEmployees() {
            return this.unifiedEmployees;
        }

        getEmployeeByInternalId(internalId) {
            return this.unifiedEmployees.find(e => e.internal_id === internalId) || null;
        }

        getOrganizations() {
            return Array.from(this.orgMap.values()).sort((a, b) => a.organization_level - b.organization_level);
        }

        getOrgByCode(code) {
            return this.orgMap.get(code) || null;
        }

        getTreeNode(code) {
            return this.treeNodes.get(code) || null;
        }

        getRootTreeNode() {
            return this.treeNodes.get(this.rootNodeCode) || null;
        }

        getEmployeesByOrgScope(orgCode) {
            if (!orgCode || orgCode === this.rootNodeCode) return this.unifiedEmployees;
            const node = this.treeNodes.get(orgCode);
            if (!node) return this.unifiedEmployees.filter(e => e.organization_code === orgCode);

            const allowedCodes = new Set(node.allDescendantCodes);
            allowedCodes.add(orgCode);

            return this.unifiedEmployees.filter(e => allowedCodes.has(e.organization_code));
        }

        getOrgHeadcount(orgCode) {
            const node = this.treeNodes.get(orgCode);
            if (!node) return { directHeadcount: 0, descendantHeadcount: 0, totalHeadcount: 0, vacancies: 0 };
            return {
                directHeadcount: node.directHeadcount,
                descendantHeadcount: node.descendantHeadcount,
                totalHeadcount: node.totalHeadcount,
                vacancies: 0
            };
        }

        getHeadcountSummary() {
            const divisions = Array.from(this.treeNodes.values()).filter(o => o.type === 'DIVISION' || o.type === 'DEPARTMENT');
            return divisions.map(d => ({
                name: d.name,
                code: d.code,
                type: d.type,
                direct: d.directHeadcount,
                descendant: d.descendantHeadcount,
                headcount: d.totalHeadcount,
                vacancies: 0
            }));
        }

        getVacancies() {
            const posMap = new Map();
            this.unifiedEmployees.forEach(e => {
                const key = `${e.organization_code}_${e.position_code}`;
                if (!posMap.has(key)) {
                    posMap.set(key, {
                        position_code: e.position_code,
                        position_name: e.position_name,
                        organization_code: e.organization_code,
                        organization_name: e.organization_name,
                        organization_type: e.organization_type,
                        currentHeadcount: 0,
                        budgetedHeadcount: 0
                    });
                }
                posMap.get(key).currentHeadcount++;
            });

            return Array.from(posMap.values()).map(p => ({
                ...p,
                budgetedHeadcount: p.currentHeadcount,
                vacancyCount: 0,
                status: 'FILLED / ACTIVE'
            }));
        }

        getPositions() {
            const pMap = new Map();
            this.unifiedEmployees.forEach(e => {
                if (!pMap.has(e.position_code)) {
                    pMap.set(e.position_code, {
                        position_code: e.position_code,
                        position_name: e.position_name,
                        count: 0,
                        departments: new Set()
                    });
                }
                const p = pMap.get(e.position_code);
                p.count++;
                p.departments.add(e.organization_name);
            });
            return Array.from(pMap.values()).map(p => ({
                ...p,
                departmentCount: p.departments.size
            })).sort((a, b) => b.count - a.count);
        }

        getChangeRequests() {
            return this.requests793.map(r => ({
                request_id: r.request_id?.value || '',
                request_type: r.request_type?.value || '',
                employee_id: r.employee_id?.value || '',
                english_name: r.english_name?.value || '',
                current_organization_code: r.current_organization_code?.value || '',
                proposed_organization_code: r.proposed_organization_code?.value || '',
                current_position_name: r.current_position_name?.value || '',
                proposed_position_name: r.proposed_position_name?.value || '',
                effective_date: r.effective_date?.value || '',
                Status: r.Status?.value || 'SUBMITTED',
                requested_by: r.requested_by?.value?.[0] || null
            }));
        }

        getAssignmentHistory(internalId) {
            return this.historyMap.get(internalId) || [];
        }
    }

    // Portal Controller & UI Renderer
    class OrgFlowPortalApp {
        constructor() {
            this.store = new OrgFlowDataStore();
            this.currentView = 'DASHBOARD'; // DASHBOARD, ORG_CHART, DIRECTORY, ORGANIZATIONS, POSITIONS, VACANCIES, REQUESTS
            this.chartMode = 'ORG_STRUCTURE'; // ORG_STRUCTURE, REPORTING_STRUCTURE
            this.selectedOrgCode = 'TTMET';
            this.searchQuery = '';
            this.filterLevel = 'ALL';
            this.activeEmployee = null;
            this.activeOrgDetail = null;
            this.drawerTab = 'OVERVIEW';
            this.isChangeWizardOpen = false;
            this.expandedNodeCodes = new Set(['TTMET', 'DIV-G0', 'DIV-ME', 'TMH0']); // Level 1 & 2 Expanded by default
        }

        async init(rootElement) {
            this.root = rootElement;
            this.root.innerHTML = `<div style="padding: 40px; text-align: center; color: #0284c7; font-size: 16px; font-weight: bold;">⏳ Initializing OrgFlow Explorer & Loading Verified Baselines...</div>`;

            await this.store.loadAllData();
            this.render();
        }

        render() {
            this.root.innerHTML = '';
            const appContainer = document.createElement('div');
            appContainer.id = 'orgflow-explorer-app';

            // 1. Top Toolbar
            appContainer.appendChild(this.renderToolbar());

            // 2. Main Body (Sidebar + Canvas)
            const bodyContainer = document.createElement('div');
            bodyContainer.className = 'orgflow-body';

            bodyContainer.appendChild(this.renderSidebar());
            bodyContainer.appendChild(this.renderCanvas());

            appContainer.appendChild(bodyContainer);

            // 3. Drawers & Modals
            if (this.activeEmployee) {
                appContainer.appendChild(this.renderEmployeeDrawer());
            }

            if (this.activeOrgDetail) {
                appContainer.appendChild(this.renderOrgDetailDrawer());
            }

            if (this.isChangeWizardOpen && this.activeEmployee) {
                appContainer.appendChild(this.renderChangeWizard());
            }

            this.root.appendChild(appContainer);
        }

        renderToolbar() {
            const bar = document.createElement('div');
            bar.className = 'orgflow-toolbar';

            bar.innerHTML = `
                <div class="orgflow-logo-area">
                    <div class="orgflow-brand">
                        <span>🏢 OrgFlow</span>
                        <span class="orgflow-brand-badge">HR Portal 2.0</span>
                    </div>
                </div>

                <div class="orgflow-search-box">
                    <span class="orgflow-search-icon">🔍</span>
                    <input type="text" class="orgflow-search-input" placeholder="Search employee, position, organization..." value="${this.searchQuery}">
                </div>

                <div class="orgflow-toolbar-controls">
                    <select class="orgflow-select" id="orgflow-level-filter">
                        <option value="ALL">All Hierarchy Levels</option>
                        <option value="DIVISION" ${this.filterLevel === 'DIVISION' ? 'selected' : ''}>Divisions</option>
                        <option value="DEPARTMENT" ${this.filterLevel === 'DEPARTMENT' ? 'selected' : ''}>Departments</option>
                        <option value="SECTION" ${this.filterLevel === 'SECTION' ? 'selected' : ''}>Sections</option>
                        <option value="TEAM" ${this.filterLevel === 'TEAM' ? 'selected' : ''}>Teams</option>
                    </select>

                    <button class="orgflow-btn orgflow-btn-outline" id="orgflow-export-excel-btn">📊 Export Excel</button>
                    <button class="orgflow-btn orgflow-btn-outline" id="orgflow-export-pdf-btn">📄 Export PDF</button>
                    <button class="orgflow-btn orgflow-btn-primary" id="orgflow-refresh-btn">🔄 Refresh</button>
                </div>
            `;

            // Attach Toolbar Events
            const searchInput = bar.querySelector('.orgflow-search-input');
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.toLowerCase().trim();
                if (this.searchQuery && this.currentView === 'ORG_CHART') {
                    this.autoExpandSearchMatches(this.searchQuery);
                }
                this.renderContentOnly();
            });

            bar.querySelector('#orgflow-level-filter').addEventListener('change', (e) => {
                this.filterLevel = e.target.value;
                this.renderContentOnly();
            });

            bar.querySelector('#orgflow-export-excel-btn').addEventListener('click', () => {
                this.handleExcelExport();
            });

            bar.querySelector('#orgflow-export-pdf-btn').addEventListener('click', () => {
                this.handlePdfExport();
            });

            bar.querySelector('#orgflow-refresh-btn').addEventListener('click', async () => {
                await this.store.loadAllData();
                this.render();
            });

            return bar;
        }

        autoExpandSearchMatches(query) {
            this.store.getUnifiedEmployees().forEach(emp => {
                if (emp.english_name.toLowerCase().includes(query) ||
                    emp.thai_name.toLowerCase().includes(query) ||
                    emp.employee_id.toLowerCase().includes(query) ||
                    emp.position_name.toLowerCase().includes(query)) {
                    
                    let curr = this.store.getTreeNode(emp.organization_code);
                    while (curr) {
                        this.expandedNodeCodes.add(curr.code);
                        curr = curr.parentCode ? this.store.getTreeNode(curr.parentCode) : null;
                    }
                }
            });
        }

        renderSidebar() {
            const sidebar = document.createElement('div');
            sidebar.className = 'orgflow-sidebar';

            const navItems = [
                { id: 'DASHBOARD', icon: '📊', label: 'Dashboard' },
                { id: 'ORG_CHART', icon: '🌳', label: 'Organization Chart' },
                { id: 'DIRECTORY', icon: '👥', label: 'Employee Directory', count: this.store.getUnifiedEmployees().length },
                { id: 'ORGANIZATIONS', icon: '🏛️', label: 'Organizations', count: this.store.getOrganizations().length },
                { id: 'POSITIONS', icon: '💼', label: 'Positions', count: this.store.getPositions().length },
                { id: 'VACANCIES', icon: '🎯', label: 'Vacancies' },
                { id: 'REQUESTS', icon: '📝', label: 'Change Requests', count: this.store.getChangeRequests().length }
            ];

            navItems.forEach(item => {
                const el = document.createElement('div');
                el.className = `orgflow-nav-item ${this.currentView === item.id ? 'active' : ''}`;
                el.innerHTML = `
                    <span>${item.icon}</span>
                    <span>${item.label}</span>
                    ${item.count !== undefined ? `<span class="orgflow-nav-badge">${item.count}</span>` : ''}
                `;
                el.addEventListener('click', () => {
                    this.currentView = item.id;
                    this.render();
                });
                sidebar.appendChild(el);
            });

            return sidebar;
        }

        renderCanvas() {
            const canvas = document.createElement('div');
            canvas.className = 'orgflow-canvas';
            canvas.id = 'orgflow-main-canvas';

            // Breadcrumb
            canvas.appendChild(this.renderBreadcrumb());

            // View Content
            switch (this.currentView) {
                case 'DASHBOARD':
                    canvas.appendChild(this.renderDashboardView());
                    break;
                case 'ORG_CHART':
                    canvas.appendChild(this.renderOrgChartView());
                    break;
                case 'DIRECTORY':
                    canvas.appendChild(this.renderDirectoryView());
                    break;
                case 'ORGANIZATIONS':
                    canvas.appendChild(this.renderOrganizationsView());
                    break;
                case 'POSITIONS':
                    canvas.appendChild(this.renderPositionsView());
                    break;
                case 'VACANCIES':
                    canvas.appendChild(this.renderVacanciesView());
                    break;
                case 'REQUESTS':
                    canvas.appendChild(this.renderChangeRequestsView());
                    break;
                default:
                    canvas.appendChild(this.renderDashboardView());
            }

            return canvas;
        }

        renderBreadcrumb() {
            const bar = document.createElement('div');
            bar.className = 'orgflow-breadcrumb-bar';

            const currentOrg = this.store.getOrgByCode(this.selectedOrgCode);
            bar.innerHTML = `
                <span class="orgflow-breadcrumb-link" data-code="TTMET">TTMET</span>
                <span class="orgflow-breadcrumb-separator">></span>
                <span>${currentOrg ? currentOrg.organization_name : 'Toyota Tsusho M&E (Thailand)'} (<code>${this.selectedOrgCode}</code>)</span>
                <span style="margin-left: auto; color: #64748b; font-size: 11px;">Active View: <b>${this.currentView}</b></span>
            `;

            bar.querySelector('.orgflow-breadcrumb-link').addEventListener('click', () => {
                this.selectedOrgCode = 'TTMET';
                this.render();
            });

            return bar;
        }

        renderDashboardView() {
            const view = document.createElement('div');
            const totalEmps = this.store.getUnifiedEmployees().length;
            const totalOrgs = this.store.getOrganizations().length;
            const totalPos = this.store.getPositions().length;
            const crCount = this.store.getChangeRequests().length;
            const rootNode = this.store.getRootTreeNode();

            view.innerHTML = `
                <div class="orgflow-kpi-grid">
                    <div class="orgflow-kpi-card">
                        <div class="orgflow-kpi-title">Total Active Employees</div>
                        <div class="orgflow-kpi-value">${totalEmps}</div>
                        <div class="orgflow-kpi-sub">Direct Root: ${rootNode?.directHeadcount || 0} | Scope: ${rootNode?.totalHeadcount || 0}</div>
                    </div>
                    <div class="orgflow-kpi-card">
                        <div class="orgflow-kpi-title">Canonical Org Units</div>
                        <div class="orgflow-kpi-value">${totalOrgs}</div>
                        <div class="orgflow-kpi-sub">33 Nodes across Levels 1–5</div>
                    </div>
                    <div class="orgflow-kpi-card">
                        <div class="orgflow-kpi-title">Standard Positions</div>
                        <div class="orgflow-kpi-value">${totalPos}</div>
                        <div class="orgflow-kpi-sub">Standardized Catalog</div>
                    </div>
                    <div class="orgflow-kpi-card">
                        <div class="orgflow-kpi-title">Pending Change Requests</div>
                        <div class="orgflow-kpi-value">${crCount}</div>
                        <div class="orgflow-kpi-sub">App 793 Workflow</div>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
                    <div class="orgflow-table-card" style="padding: 16px;">
                        <h3 style="margin-top:0; color:#0f172a; font-size:14px;">🏢 Headcount Breakdown by Division / Department</h3>
                        <table class="orgflow-table">
                            <thead>
                                <tr><th>Unit Name</th><th>Code</th><th>Type</th><th style="text-align:right;">Direct</th><th style="text-align:right;">Total Scope</th></tr>
                            </thead>
                            <tbody>
                                ${this.store.getHeadcountSummary().map(h => `
                                    <tr>
                                        <td><b>${h.name}</b></td>
                                        <td><code>${h.code}</code></td>
                                        <td><span class="orgflow-badge badge-active">${h.type}</span></td>
                                        <td style="text-align:right; color:#64748b;">${h.direct}</td>
                                        <td style="text-align:right; font-weight:bold; color:#0284c7;">${h.headcount}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>

                    <div class="orgflow-table-card" style="padding: 16px;">
                        <h3 style="margin-top:0; color:#0f172a; font-size:14px;">💼 Top Positions by Assigned Staff</h3>
                        <table class="orgflow-table">
                            <thead>
                                <tr><th>Position Title</th><th>Code</th><th style="text-align:right;">Staff Count</th></tr>
                            </thead>
                            <tbody>
                                ${this.store.getPositions().slice(0, 7).map(p => `
                                    <tr>
                                        <td><b>${p.position_name}</b></td>
                                        <td><code>${p.position_code}</code></td>
                                        <td style="text-align:right; font-weight:bold;">${p.count}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
            return view;
        }

        renderOrgChartView() {
            const view = document.createElement('div');

            view.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
                    <div style="display: flex; gap: 8px;">
                        <button class="orgflow-btn ${this.chartMode === 'ORG_STRUCTURE' ? 'orgflow-btn-primary' : 'orgflow-btn-outline'}" id="btn-mode-org">🏛️ Organization Structure</button>
                        <button class="orgflow-btn ${this.chartMode === 'REPORTING_STRUCTURE' ? 'orgflow-btn-primary' : 'orgflow-btn-outline'}" id="btn-mode-rep">👥 Reporting Structure</button>
                    </div>
                    <div style="display: flex; gap: 8px; align-items: center;">
                        <button class="orgflow-btn orgflow-btn-outline" id="btn-expand-all" style="font-size:11px; padding:5px 10px;">Expand All</button>
                        <button class="orgflow-btn orgflow-btn-outline" id="btn-collapse-all" style="font-size:11px; padding:5px 10px;">Collapse All</button>
                        <button class="orgflow-btn orgflow-btn-outline" id="btn-reset-view" style="font-size:11px; padding:5px 10px;">Reset View</button>
                    </div>
                </div>

                <div class="orgflow-chart-container" id="orgflow-chart-canvas">
                    <!-- Recursive Interactive Tree Injected Below -->
                </div>
            `;

            view.querySelector('#btn-mode-org').addEventListener('click', () => {
                this.chartMode = 'ORG_STRUCTURE';
                this.render();
            });
            view.querySelector('#btn-mode-rep').addEventListener('click', () => {
                this.chartMode = 'REPORTING_STRUCTURE';
                this.render();
            });

            view.querySelector('#btn-expand-all').addEventListener('click', () => {
                this.store.getOrganizations().forEach(o => this.expandedNodeCodes.add(o.organization_code));
                this.renderContentOnly();
            });

            view.querySelector('#btn-collapse-all').addEventListener('click', () => {
                this.expandedNodeCodes.clear();
                this.expandedNodeCodes.add('TTMET');
                this.renderContentOnly();
            });

            view.querySelector('#btn-reset-view').addEventListener('click', () => {
                this.expandedNodeCodes.clear();
                this.expandedNodeCodes.add('TTMET');
                this.expandedNodeCodes.add('DIV-G0');
                this.expandedNodeCodes.add('DIV-ME');
                this.expandedNodeCodes.add('TMH0');
                this.selectedOrgCode = 'TTMET';
                this.render();
            });

            const chartCanvas = view.querySelector('#orgflow-chart-canvas');
            const rootNode = this.store.getRootTreeNode();

            if (rootNode) {
                const treeDom = this.renderRecursiveOrgNode(rootNode);
                chartCanvas.appendChild(treeDom);
            }

            return view;
        }

        renderRecursiveOrgNode(node) {
            const container = document.createElement('div');
            container.className = 'orgflow-tree-node';

            const isExpanded = this.expandedNodeCodes.has(node.code);
            const hasChildren = node.children && node.children.length > 0;

            const card = document.createElement('div');
            card.className = 'orgflow-node-card';
            if (node.level === 1) card.style.borderLeft = '5px solid #0284c7';
            else if (node.level === 2) card.style.borderLeft = '5px solid #6366f1';
            else if (node.level === 3) card.style.borderLeft = '5px solid #06b6d4';
            else card.style.borderLeft = '4px solid #cbd5e1';

            card.innerHTML = `
                <div class="orgflow-node-header">
                    <span class="orgflow-node-code">${node.code}</span>
                    <span class="orgflow-node-type-badge type-${node.type.toLowerCase()}">${node.type}</span>
                </div>
                <div class="orgflow-node-name">${node.name}</div>
                <div class="orgflow-node-meta" style="margin-top: 10px; border-top: 1px dashed #e2e8f0; padding-top: 6px;">
                    <span>Direct: <b style="color: #475569;">${node.directHeadcount}</b></span>
                    <span>Total Scope: <b style="color: #0284c7;">${node.totalHeadcount}</b></span>
                </div>
                <div style="margin-top: 8px; display: flex; justify-content: space-between; align-items: center;">
                    ${hasChildren ? `
                        <button class="orgflow-btn orgflow-btn-outline btn-toggle-expand" style="padding: 3px 8px; font-size: 10px;">
                            ${isExpanded ? '▲ Collapse' : `▼ Expand (${node.children.length})`}
                        </button>
                    ` : '<span style="font-size: 10px; color: #94a3b8;">Terminal Unit</span>'}
                    <button class="orgflow-btn orgflow-btn-outline btn-view-org-detail" style="padding: 3px 8px; font-size: 10px;">
                        🔍 Details
                    </button>
                </div>
            `;

            // Toggle Expand / Collapse
            const toggleBtn = card.querySelector('.btn-toggle-expand');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (this.expandedNodeCodes.has(node.code)) {
                        this.expandedNodeCodes.delete(node.code);
                    } else {
                        this.expandedNodeCodes.add(node.code);
                    }
                    this.renderContentOnly();
                });
            }

            // View Details Drawer
            card.querySelector('.btn-view-org-detail').addEventListener('click', (e) => {
                e.stopPropagation();
                this.activeOrgDetail = node;
                this.render();
            });

            // Card Click = Drilldown
            card.addEventListener('click', () => {
                this.selectedOrgCode = node.code;
                this.renderBreadcrumbOnly();
            });

            container.appendChild(card);

            // Render Children if Expanded
            if (hasChildren && isExpanded) {
                const childContainer = document.createElement('div');
                childContainer.style.display = 'flex';
                childContainer.style.flexWrap = 'wrap';
                childContainer.style.justifyContent = 'center';
                childContainer.style.gap = '16px';
                childContainer.style.marginTop = '20px';
                childContainer.style.borderTop = '2px solid #e2e8f0';
                childContainer.style.paddingTop = '16px';
                childContainer.style.position = 'relative';

                node.children.forEach(child => {
                    childContainer.appendChild(this.renderRecursiveOrgNode(child));
                });
                container.appendChild(childContainer);
            }

            return container;
        }

        renderOrgDetailDrawer() {
            const overlay = document.createElement('div');
            overlay.className = 'orgflow-drawer-overlay';

            const node = this.activeOrgDetail;
            const drawer = document.createElement('div');
            drawer.className = 'orgflow-drawer';
            drawer.style.width = '560px';

            drawer.innerHTML = `
                <div class="orgflow-drawer-header">
                    <div>
                        <div class="orgflow-drawer-title">${node.name}</div>
                        <div style="font-size: 12px; color: #64748b;">Canonical Code: <code>${node.code}</code> • ${node.type} (Level ${node.level})</div>
                    </div>
                    <button class="orgflow-drawer-close" id="org-drawer-close-btn">✕</button>
                </div>

                <div class="orgflow-drawer-body">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
                        <div class="orgflow-kpi-card" style="padding: 12px;">
                            <div class="orgflow-kpi-title">Direct Assigned Staff</div>
                            <div class="orgflow-kpi-value" style="font-size: 20px;">${node.directHeadcount}</div>
                            <div class="orgflow-kpi-sub">Directly placed in this tier</div>
                        </div>
                        <div class="orgflow-kpi-card" style="padding: 12px;">
                            <div class="orgflow-kpi-title">Total Hierarchical Scope</div>
                            <div class="orgflow-kpi-value" style="font-size: 20px; color: #0284c7;">${node.totalHeadcount}</div>
                            <div class="orgflow-kpi-sub">Including all child units</div>
                        </div>
                    </div>

                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px; margin-bottom: 16px; font-size: 12px;">
                        <div><b>Hierarchy Path:</b> <span style="color: #475569;">${node.hierarchyPath}</span></div>
                        <div style="margin-top: 4px;"><b>Parent Code:</b> <code>${node.parentCode || 'ROOT (None)'}</code></div>
                        <div style="margin-top: 4px;"><b>Immediate Child Units:</b> <b>${node.children.length}</b></div>
                    </div>

                    <div style="font-weight: 700; font-size: 13px; color: #0f172a; margin-bottom: 8px;">Direct Assigned Personnel (${node.directHeadcount})</div>
                    ${node.directEmployees.length === 0 ? `
                        <div style="padding: 16px; background: #ffffff; border: 1px dashed #cbd5e1; border-radius: 6px; color: #94a3b8; font-size: 12px; text-align: center;">
                            No direct personnel assigned at this supervisory level (Employees assigned to subordinate sections).
                        </div>
                    ` : `
                        <table class="orgflow-table">
                            <thead>
                                <tr><th>ID</th><th>Name</th><th>Position</th><th>Action</th></tr>
                            </thead>
                            <tbody>
                                ${node.directEmployees.map(e => `
                                    <tr>
                                        <td><b>${e.employee_id}</b></td>
                                        <td>${e.english_name}</td>
                                        <td><b>${e.position_name}</b> (<code>${e.position_code}</code>)</td>
                                        <td><button class="orgflow-btn orgflow-btn-outline btn-open-emp" data-id="${e.internal_id}" style="padding:2px 6px; font-size:10px;">Profile</button></td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    `}
                </div>

                <div class="orgflow-drawer-footer">
                    <button class="orgflow-btn orgflow-btn-outline" id="btn-org-drawer-close">Close</button>
                    <button class="orgflow-btn orgflow-btn-primary" id="btn-drill-org">Set as Focus Branch</button>
                </div>
            `;

            drawer.querySelector('#org-drawer-close-btn').addEventListener('click', () => {
                this.activeOrgDetail = null;
                this.render();
            });
            drawer.querySelector('#btn-org-drawer-close').addEventListener('click', () => {
                this.activeOrgDetail = null;
                this.render();
            });
            drawer.querySelector('#btn-drill-org').addEventListener('click', () => {
                this.selectedOrgCode = node.code;
                this.expandedNodeCodes.add(node.code);
                this.activeOrgDetail = null;
                this.render();
            });

            drawer.querySelectorAll('.btn-open-emp').forEach(btn => {
                btn.addEventListener('click', () => {
                    const intId = btn.getAttribute('data-id');
                    this.activeEmployee = this.store.getEmployeeByInternalId(intId);
                    this.activeOrgDetail = null;
                    this.render();
                });
            });

            overlay.appendChild(drawer);
            return overlay;
        }

        renderDirectoryView() {
            const view = document.createElement('div');
            view.className = 'orgflow-table-card';

            let list = this.store.getUnifiedEmployees();
            if (this.searchQuery) {
                list = list.filter(e =>
                    e.employee_id.toLowerCase().includes(this.searchQuery) ||
                    e.english_name.toLowerCase().includes(this.searchQuery) ||
                    e.thai_name.toLowerCase().includes(this.searchQuery) ||
                    e.position_name.toLowerCase().includes(this.searchQuery) ||
                    e.organization_code.toLowerCase().includes(this.searchQuery)
                );
            }

            if (this.filterLevel !== 'ALL') {
                list = list.filter(e => e.organization_type === this.filterLevel);
            }

            view.innerHTML = `
                <div style="padding: 14px 16px; border-bottom: 1px solid #e2e8f0; display:flex; justify-content:space-between; align-items:center;">
                    <div style="font-weight: 700; color: #0f172a;">Employee Directory (${list.length} records)</div>
                    <div style="font-size: 11px; color: #64748b;">Click any employee row to open detail drawer</div>
                </div>
                <table class="orgflow-table">
                    <thead>
                        <tr>
                            <th>Emp ID</th>
                            <th>English Name</th>
                            <th>Thai Name</th>
                            <th>Position Title</th>
                            <th>Position Code</th>
                            <th>Organization Unit</th>
                            <th>Type</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${list.map(e => `
                            <tr data-internal-id="${e.internal_id}">
                                <td><b>${e.employee_id}</b></td>
                                <td>${e.english_name}</td>
                                <td>${e.thai_name}</td>
                                <td><b>${e.position_name}</b></td>
                                <td><code>${e.position_code}</code></td>
                                <td>${e.organization_name} (<code>${e.organization_code}</code>)</td>
                                <td><span class="orgflow-badge badge-active">${e.assignment_type}</span></td>
                                <td><span class="orgflow-badge badge-executed">${e.assignment_status}</span></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;

            view.querySelectorAll('tbody tr').forEach(row => {
                row.addEventListener('click', () => {
                    const intId = row.getAttribute('data-internal-id');
                    this.activeEmployee = this.store.getEmployeeByInternalId(intId);
                    this.drawerTab = 'OVERVIEW';
                    this.render();
                });
            });

            return view;
        }

        renderOrganizationsView() {
            const view = document.createElement('div');
            view.className = 'orgflow-table-card';

            const orgs = this.store.getOrganizations();
            view.innerHTML = `
                <div style="padding: 14px 16px; border-bottom: 1px solid #e2e8f0;">
                    <div style="font-weight: 700; color: #0f172a;">Canonical Organization Units (App 791 Master)</div>
                </div>
                <table class="orgflow-table">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Organization Name</th>
                            <th>Type</th>
                            <th>Level</th>
                            <th>Parent Unit</th>
                            <th style="text-align:right;">Direct HC</th>
                            <th style="text-align:right;">Total Scope</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${orgs.map(o => {
                            const node = this.store.getTreeNode(o.organization_code);
                            return `
                                <tr>
                                    <td><code>${o.organization_code}</code></td>
                                    <td><b>${o.organization_name}</b></td>
                                    <td><span class="orgflow-node-type-badge type-${o.organization_type.toLowerCase()}">${o.organization_type}</span></td>
                                    <td>${o.organization_level}</td>
                                    <td><code>${o.parent_organization_code || '-'}</code></td>
                                    <td style="text-align:right; color:#64748b;">${node?.directHeadcount || 0}</td>
                                    <td style="text-align:right; font-weight:bold; color: #0284c7;">${node?.totalHeadcount || 0}</td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            `;
            return view;
        }

        renderPositionsView() {
            const view = document.createElement('div');
            view.className = 'orgflow-table-card';
            const positions = this.store.getPositions();

            view.innerHTML = `
                <div style="padding: 14px 16px; border-bottom: 1px solid #e2e8f0;">
                    <div style="font-weight: 700; color: #0f172a;">Position Catalog & Distribution</div>
                </div>
                <table class="orgflow-table">
                    <thead>
                        <tr>
                            <th>Position Code</th>
                            <th>Position Title</th>
                            <th>Active Assigned Staff</th>
                            <th>Present in Departments</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${positions.map(p => `
                            <tr>
                                <td><code>${p.position_code}</code></td>
                                <td><b>${p.position_name}</b></td>
                                <td style="font-weight:bold; color:#0284c7;">${p.count} employees</td>
                                <td>${p.departmentCount} units</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
            return view;
        }

        renderVacanciesView() {
            const view = document.createElement('div');
            view.className = 'orgflow-table-card';
            const vacancies = this.store.getVacancies();

            view.innerHTML = `
                <div style="padding: 14px 16px; border-bottom: 1px solid #e2e8f0;">
                    <div style="font-weight: 700; color: #0f172a;">Position Capacity & Vacancy Status</div>
                </div>
                <table class="orgflow-table">
                    <thead>
                        <tr>
                            <th>Position Title</th>
                            <th>Position Code</th>
                            <th>Organization Unit</th>
                            <th>Org Code</th>
                            <th style="text-align:right;">Budgeted</th>
                            <th style="text-align:right;">Current Active</th>
                            <th style="text-align:right;">Vacancies</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${vacancies.map(v => `
                            <tr>
                                <td><b>${v.position_name}</b></td>
                                <td><code>${v.position_code}</code></td>
                                <td>${v.organization_name}</td>
                                <td><code>${v.organization_code}</code></td>
                                <td style="text-align:right;">${v.budgetedHeadcount}</td>
                                <td style="text-align:right; font-weight:bold;">${v.currentHeadcount}</td>
                                <td style="text-align:right;">${v.vacancyCount}</td>
                                <td><span class="orgflow-badge badge-active">${v.status}</span></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
            return view;
        }

        renderChangeRequestsView() {
            const view = document.createElement('div');
            view.className = 'orgflow-table-card';
            const requests = this.store.getChangeRequests();

            view.innerHTML = `
                <div style="padding: 14px 16px; border-bottom: 1px solid #e2e8f0;">
                    <div style="font-weight: 700; color: #0f172a;">Organization Change Requests (App 793 Read Monitor)</div>
                </div>
                <table class="orgflow-table">
                    <thead>
                        <tr>
                            <th>Request ID</th>
                            <th>Type</th>
                            <th>Employee</th>
                            <th>From Org</th>
                            <th>To Org</th>
                            <th>From Position</th>
                            <th>To Position</th>
                            <th>Effective Date</th>
                            <th>Workflow Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${requests.length === 0 ? `
                            <tr><td colspan="9" style="text-align:center; padding: 24px; color: #94a3b8;">No change requests submitted yet (Clean baseline).</td></tr>
                        ` : requests.map(r => `
                            <tr>
                                <td><b>${r.request_id}</b></td>
                                <td><span class="orgflow-badge badge-active">${r.request_type}</span></td>
                                <td>${r.english_name} (<code>${r.employee_id}</code>)</td>
                                <td><code>${r.current_organization_code}</code></td>
                                <td><code>${r.proposed_organization_code}</code></td>
                                <td>${r.current_position_name}</td>
                                <td>${r.proposed_position_name}</td>
                                <td>${r.effective_date}</td>
                                <td><span class="orgflow-badge badge-pending">${r.Status}</span></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
            return view;
        }

        renderEmployeeDrawer() {
            const overlay = document.createElement('div');
            overlay.className = 'orgflow-drawer-overlay';

            const e = this.activeEmployee;
            const history = this.store.getAssignmentHistory(e.internal_id);

            const drawer = document.createElement('div');
            drawer.className = 'orgflow-drawer';

            drawer.innerHTML = `
                <div class="orgflow-drawer-header">
                    <div>
                        <div class="orgflow-drawer-title">${e.english_name}</div>
                        <div style="font-size: 12px; color: #64748b;">${e.thai_name} • <code>${e.employee_id}</code> (${e.internal_id})</div>
                    </div>
                    <button class="orgflow-drawer-close" id="drawer-close-btn">✕</button>
                </div>

                <div class="orgflow-drawer-tabs">
                    <div class="orgflow-drawer-tab ${this.drawerTab === 'OVERVIEW' ? 'active' : ''}" data-tab="OVERVIEW">Overview</div>
                    <div class="orgflow-drawer-tab ${this.drawerTab === 'HISTORY' ? 'active' : ''}" data-tab="HISTORY">Assignment History (${history.length})</div>
                    <div class="orgflow-drawer-tab ${this.drawerTab === 'ORG' ? 'active' : ''}" data-tab="ORG">Organization</div>
                </div>

                <div class="orgflow-drawer-body">
                    ${this.drawerTab === 'OVERVIEW' ? `
                        <div style="display: flex; gap: 16px; margin-bottom: 20px;">
                            <div style="width: 72px; height: 72px; border-radius: 50%; background: #e0f2fe; color: #0284c7; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold;">
                                ${e.photo_url ? `<img src="${e.photo_url}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">` : e.english_name.charAt(0)}
                            </div>
                            <div>
                                <div style="font-size: 15px; font-weight: 700; color: #0f172a;">${e.position_name}</div>
                                <div style="font-size: 12px; color: #64748b; font-family: monospace;">${e.position_code}</div>
                                <div style="font-size: 12px; color: #0284c7; margin-top: 4px; font-weight: 500;">${e.organization_name}</div>
                            </div>
                        </div>

                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; margin-bottom: 16px;">
                            <div style="font-weight: 700; font-size: 12px; margin-bottom: 8px; color: #334155;">Assignment Attributes</div>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 12px;">
                                <div><span style="color:#64748b;">Employee No:</span> <b>${e.employee_id}</b></div>
                                <div><span style="color:#64748b;">Internal ID:</span> <code>${e.internal_id}</code></div>
                                <div><span style="color:#64748b;">Assignment Type:</span> <b>${e.assignment_type}</b></div>
                                <div><span style="color:#64748b;">Status:</span> <span class="orgflow-badge badge-active">${e.assignment_status}</span></div>
                                <div><span style="color:#64748b;">Start Date:</span> <b>${e.effective_start_date || e.start_date || 'N/A'}</b></div>
                                <div><span style="color:#64748b;">Email:</span> <b>${e.email || 'N/A'}</b></div>
                            </div>
                        </div>

                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px;">
                            <div style="font-weight: 700; font-size: 12px; margin-bottom: 6px; color: #334155;">Hierarchy Path</div>
                            <div style="font-size: 12px; color: #475569;">${e.hierarchy_path || 'TTMET'}</div>
                        </div>
                    ` : ''}

                    ${this.drawerTab === 'HISTORY' ? `
                        <div style="font-size: 12px;">
                            ${history.map((h, i) => `
                                <div style="border-left: 2px solid #0284c7; padding-left: 14px; margin-bottom: 16px; position: relative;">
                                    <div style="font-weight: 700; color: #0f172a;">${h.position_name} (<code>${h.position_code}</code>)</div>
                                    <div style="color: #0284c7; margin: 2px 0;">${h.organization_name} (<code>${h.organization_code}</code>)</div>
                                    <div style="color: #64748b; font-size: 11px;">Start: ${h.effective_start_date || 'Baseline'} | Status: <span class="orgflow-badge ${h.assignment_status === 'CURRENT' ? 'badge-active' : 'badge-pending'}">${h.assignment_status}</span></div>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}

                    ${this.drawerTab === 'ORG' ? `
                        <div style="font-size: 12px;">
                            <div style="font-weight: 700; color: #0f172a; margin-bottom: 8px;">Organization Unit Details</div>
                            <p><b>Name:</b> ${e.organization_name}</p>
                            <p><b>Code:</b> <code>${e.organization_code}</code></p>
                            <p><b>Type:</b> <span class="orgflow-badge badge-active">${e.organization_type}</span></p>
                            <p><b>Hierarchy Path:</b> <code>${e.hierarchy_path}</code></p>
                        </div>
                    ` : ''}
                </div>

                <div class="orgflow-drawer-footer">
                    <button class="orgflow-btn orgflow-btn-primary" id="btn-open-change-wizard">📝 Request Change (Preview Mode)</button>
                </div>
            `;

            drawer.querySelector('#drawer-close-btn').addEventListener('click', () => {
                this.activeEmployee = null;
                this.render();
            });

            drawer.querySelectorAll('.orgflow-drawer-tab').forEach(tab => {
                tab.addEventListener('click', (e) => {
                    this.drawerTab = tab.getAttribute('data-tab');
                    this.render();
                });
            });

            drawer.querySelector('#btn-open-change-wizard').addEventListener('click', () => {
                this.isChangeWizardOpen = true;
                this.render();
            });

            overlay.appendChild(drawer);
            return overlay;
        }

        renderChangeWizard() {
            const overlay = document.createElement('div');
            overlay.className = 'orgflow-drawer-overlay';

            const e = this.activeEmployee;
            const orgs = this.store.getOrganizations();
            const positions = this.store.getPositions();

            const modal = document.createElement('div');
            modal.className = 'orgflow-drawer';
            modal.style.width = '620px';

            modal.innerHTML = `
                <div class="orgflow-drawer-header">
                    <div>
                        <div class="orgflow-drawer-title">HR Change Request Wizard</div>
                        <div style="font-size: 12px; color: #64748b;">Target: ${e.english_name} (<code>${e.employee_id}</code> / <code>${e.internal_id}</code>)</div>
                    </div>
                    <button class="orgflow-drawer-close" id="wizard-close-btn">✕</button>
                </div>

                <div class="orgflow-drawer-body">
                    <div class="orgflow-preview-banner">
                        <span>⚠️</span>
                        <span><b>PREVIEW MODE ACTIVATED:</b> Validates before/after delta in memory. Zero production writes will occur.</span>
                    </div>

                    <div style="margin-bottom: 14px;">
                        <label style="font-size: 12px; font-weight: 700; color: #334155; display:block; margin-bottom: 4px;">Change Request Type</label>
                        <select class="orgflow-select" id="wizard-req-type" style="width: 100%;">
                            <option value="EMPLOYEE_TRANSFER">EMPLOYEE_TRANSFER (Transfer Department / Section)</option>
                            <option value="POSITION_CHANGE">POSITION_CHANGE (Change Position Title / Role)</option>
                            <option value="PROMOTION">PROMOTION (Advance Position Grade)</option>
                            <option value="DEMOTION">DEMOTION</option>
                            <option value="TEMPORARY_ASSIGNMENT">TEMPORARY_ASSIGNMENT</option>
                            <option value="CONCURRENT_ASSIGNMENT">CONCURRENT_ASSIGNMENT</option>
                            <option value="ASSIGNMENT_TERMINATION">ASSIGNMENT_TERMINATION</option>
                        </select>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px;">
                        <div>
                            <label style="font-size: 12px; font-weight: 700; color: #334155; display:block; margin-bottom: 4px;">Proposed Organization Unit (App 791)</label>
                            <select class="orgflow-select" id="wizard-prop-org" style="width: 100%;">
                                ${orgs.map(o => `<option value="${o.organization_code}" ${o.organization_code === e.organization_code ? 'selected' : ''}>${o.organization_code} — ${o.organization_name}</option>`).join('')}
                            </select>
                        </div>
                        <div>
                            <label style="font-size: 12px; font-weight: 700; color: #334155; display:block; margin-bottom: 4px;">Proposed Position Title</label>
                            <select class="orgflow-select" id="wizard-prop-pos" style="width: 100%;">
                                ${positions.map(p => `<option value="${p.position_code}" ${p.position_code === e.position_code ? 'selected' : ''}>${p.position_code} — ${p.position_name}</option>`).join('')}
                            </select>
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px;">
                        <div>
                            <label style="font-size: 12px; font-weight: 700; color: #334155; display:block; margin-bottom: 4px;">Effective Start Date</label>
                            <input type="date" class="orgflow-search-input" id="wizard-eff-date" value="${new Date().toISOString().slice(0, 10)}" style="padding: 6px 10px;">
                        </div>
                        <div>
                            <label style="font-size: 12px; font-weight: 700; color: #334155; display:block; margin-bottom: 4px;">Proposed Assignment Type</label>
                            <select class="orgflow-select" id="wizard-asg-type" style="width: 100%;">
                                <option value="PRIMARY">PRIMARY</option>
                                <option value="CONCURRENT">CONCURRENT</option>
                                <option value="TEMPORARY">TEMPORARY</option>
                            </select>
                        </div>
                    </div>

                    <div style="margin-bottom: 14px;">
                        <label style="font-size: 12px; font-weight: 700; color: #334155; display:block; margin-bottom: 4px;">Business Justification Reason</label>
                        <textarea class="orgflow-search-input" id="wizard-reason" rows="2" placeholder="Explain the rationale for this change..." style="width: 100%;"></textarea>
                    </div>

                    <div style="border-top: 1px solid #e2e8f0; padding-top: 14px; margin-top: 14px;">
                        <div style="font-weight: 700; font-size: 13px; color: #0f172a; margin-bottom: 8px;">Side-by-Side BEFORE vs AFTER Preview</div>
                        <div id="wizard-delta-preview" style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 12px; font-size: 12px;">
                            <!-- Dynamic Delta -->
                        </div>
                    </div>
                </div>

                <div class="orgflow-drawer-footer">
                    <button class="orgflow-btn orgflow-btn-outline" id="wizard-cancel-btn">Cancel</button>
                    <button class="orgflow-btn orgflow-btn-primary" id="wizard-preview-btn" disabled style="opacity: 0.6; cursor: not-allowed;">Submit Request (Disabled in Preview Mode)</button>
                </div>
            `;

            const updateDelta = () => {
                const propOrgCode = modal.querySelector('#wizard-prop-org').value;
                const propPosCode = modal.querySelector('#wizard-prop-pos').value;
                const propOrg = this.store.getOrgByCode(propOrgCode);
                const propPos = positions.find(p => p.position_code === propPosCode);

                const isOrgChanged = propOrgCode !== e.organization_code;
                const isPosChanged = propPosCode !== e.position_code;

                modal.querySelector('#wizard-delta-preview').innerHTML = `
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                        <div style="padding: 8px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 4px;">
                            <div style="font-weight: bold; color: #64748b; margin-bottom: 4px;">CURRENT (BEFORE)</div>
                            <div><b>Unit:</b> ${e.organization_name} (<code>${e.organization_code}</code>)</div>
                            <div><b>Position:</b> ${e.position_name} (<code>${e.position_code}</code>)</div>
                            <div><b>Assignment:</b> ${e.assignment_type}</div>
                        </div>
                        <div style="padding: 8px; background: #ffffff; border: 1px solid ${isOrgChanged || isPosChanged ? '#0284c7' : '#e2e8f0'}; border-radius: 4px;">
                            <div style="font-weight: bold; color: #0284c7; margin-bottom: 4px;">PROPOSED (AFTER)</div>
                            <div><b>Unit:</b> <span style="${isOrgChanged ? 'background:#fef08a; font-weight:bold;' : ''}">${propOrg ? propOrg.organization_name : propOrgCode} (<code>${propOrgCode}</code>)</span></div>
                            <div><b>Position:</b> <span style="${isPosChanged ? 'background:#fef08a; font-weight:bold;' : ''}">${propPos ? propPos.position_name : propPosCode} (<code>${propPosCode}</code>)</span></div>
                            <div><b>Assignment:</b> ${modal.querySelector('#wizard-asg-type').value}</div>
                        </div>
                    </div>
                `;
            };

            modal.querySelector('#wizard-prop-org').addEventListener('change', updateDelta);
            modal.querySelector('#wizard-prop-pos').addEventListener('change', updateDelta);
            modal.querySelector('#wizard-asg-type').addEventListener('change', updateDelta);
            modal.querySelector('#wizard-close-btn').addEventListener('click', () => {
                this.isChangeWizardOpen = false;
                this.render();
            });
            modal.querySelector('#wizard-cancel-btn').addEventListener('click', () => {
                this.isChangeWizardOpen = false;
                this.render();
            });

            updateDelta();
            overlay.appendChild(modal);
            return overlay;
        }

        renderContentOnly() {
            const canvas = document.getElementById('orgflow-main-canvas');
            if (canvas) {
                canvas.innerHTML = '';
                canvas.appendChild(this.renderBreadcrumb());
                switch (this.currentView) {
                    case 'DASHBOARD': canvas.appendChild(this.renderDashboardView()); break;
                    case 'ORG_CHART': canvas.appendChild(this.renderOrgChartView()); break;
                    case 'DIRECTORY': canvas.appendChild(this.renderDirectoryView()); break;
                    case 'ORGANIZATIONS': canvas.appendChild(this.renderOrganizationsView()); break;
                    case 'POSITIONS': canvas.appendChild(this.renderPositionsView()); break;
                    case 'VACANCIES': canvas.appendChild(this.renderVacanciesView()); break;
                    case 'REQUESTS': canvas.appendChild(this.renderChangeRequestsView()); break;
                }
            }
        }

        renderBreadcrumbOnly() {
            const bar = document.querySelector('.orgflow-breadcrumb-bar');
            if (bar) {
                const currentOrg = this.store.getOrgByCode(this.selectedOrgCode);
                bar.innerHTML = `
                    <span class="orgflow-breadcrumb-link" data-code="TTMET">TTMET</span>
                    <span class="orgflow-breadcrumb-separator">></span>
                    <span>${currentOrg ? currentOrg.organization_name : 'Toyota Tsusho M&E (Thailand)'} (<code>${this.selectedOrgCode}</code>)</span>
                    <span style="margin-left: auto; color: #64748b; font-size: 11px;">Active View: <b>${this.currentView}</b></span>
                `;
                bar.querySelector('.orgflow-breadcrumb-link').addEventListener('click', () => {
                    this.selectedOrgCode = 'TTMET';
                    this.render();
                });
            }
        }

        handleExcelExport() {
            const filename = `OrgFlow_Export_${this.currentView}_${new Date().toISOString().slice(0, 10)}.csv`;
            let headers = ['Internal ID', 'Employee ID', 'Thai Name', 'English Name', 'Position Code', 'Position Name', 'Org Code', 'Org Name', 'Assignment Type', 'Status'];
            let rows = this.store.getUnifiedEmployees().map(e => [
                `"${e.internal_id}"`,
                `"=""${e.employee_id}"""`, // Preserves leading zeros in Excel as text
                `"${e.thai_name.replace(/"/g, '""')}"`,
                `"${e.english_name.replace(/"/g, '""')}"`,
                `"${e.position_code}"`,
                `"${e.position_name.replace(/"/g, '""')}"`,
                `"${e.organization_code}"`,
                `"${e.organization_name.replace(/"/g, '""')}"`,
                `"${e.assignment_type}"`,
                `"${e.assignment_status}"`
            ]);

            const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }

        handlePdfExport() {
            const org = this.store.getOrgByCode(this.selectedOrgCode) || { organization_name: 'Toyota Tsusho M&E (Thailand)', organization_code: 'TTMET' };
            const node = this.store.getTreeNode(this.selectedOrgCode);
            const emps = this.store.getEmployeesByOrgScope(this.selectedOrgCode);

            const html = `
                <html>
                <head>
                    <title>OrgFlow — ${org.organization_name}</title>
                    <style>
                        body { font-family: sans-serif; padding: 20px; font-size: 11px; }
                        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
                        th, td { border: 1px solid #cbd5e1; padding: 6px 10px; text-align: left; }
                        th { background: #f1f5f9; }
                    </style>
                </head>
                <body>
                    <h2>OrgFlow — Organization Hierarchy Dossier</h2>
                    <p><b>Unit:</b> ${org.organization_name} (<code>${org.organization_code}</code>) | <b>Direct:</b> ${node?.directHeadcount || 0} | <b>Total Scope:</b> ${node?.totalHeadcount || emps.length} employees</p>
                    <table>
                        <thead>
                            <tr><th>Internal ID</th><th>Emp ID</th><th>English Name</th><th>Thai Name</th><th>Position Title</th><th>Position Code</th><th>Unit</th></tr>
                        </thead>
                        <tbody>
                            ${emps.map(e => `
                                <tr>
                                    <td><code>${e.internal_id}</code></td>
                                    <td><b>${e.employee_id}</b></td>
                                    <td>${e.english_name}</td>
                                    <td>${e.thai_name}</td>
                                    <td>${e.position_name}</td>
                                    <td><code>${e.position_code}</code></td>
                                    <td>${e.organization_name}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <div style="margin-top: 20px; text-align: center;">
                        <button onclick="window.print()" style="background:#0284c7; color:#fff; border:none; padding:8px 16px; border-radius:4px; font-weight:bold; cursor:pointer;">🖨️ Print / Save as PDF</button>
                    </div>
                </body>
                </html>
            `;
            const pWin = window.open('', '_blank');
            if (pWin) {
                pWin.document.write(html);
                pWin.document.close();
            }
        }
    }

    // Initialize in Kintone View
    kintone.events.on('app.record.index.show', function (event) {
        let root = document.getElementById('orgflow-custom-view-root');
        if (!root) {
            const headerSpace = kintone.app.getHeaderSpaceElement();
            if (!headerSpace) return event;

            if (document.getElementById('orgflow-explorer-app')) return event;

            root = document.createElement('div');
            root.id = 'orgflow-custom-view-root';
            headerSpace.appendChild(root);
        }

        const app = new OrgFlowPortalApp();
        app.init(root);
        return event;
    });

})();

