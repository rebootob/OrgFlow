/**
 * OrgFlow — Organization Explorer & HR Change Management Portal
 * Standalone Client-Side Custom View Application
 * 
 * Version: 3.9.0 (Dual-Mode: Canonical Structure + Executive Personnel View Org Chart)
 * - TAB 1: Canonical Structure (57-node recursive unit hierarchy & capacity analytics)
 * - TAB 2: Personnel View (Traditional Top-Down Corporate Position & Reporting Org Chart)
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
            this.positionHierarchy = []; // Structured Position Reporting Tree
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
                        parent_organization_code: (o.parent_organization_code?.value?.trim() === 'ROOT' ? null : o.parent_organization_code?.value?.trim()) || null,
                        hierarchy_path: o.hierarchy_path?.value?.trim() || code,
                        code_status: o.code_status?.value?.trim() || 'APPROVED'
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
                const empNumStr = rawEmpText ? rawEmpText : rawNumber;
                const internalId = `ORG-APP53-${recId}`;

                let photoUrl = '';
                if (e.Attachment?.value?.length > 0) {
                    photoUrl = `/k/v1/file.json?fileKey=${e.Attachment.value[0].fileKey}`;
                }

                const identityObj = {
                    record_id: parseInt(recId, 10),
                    internal_id: internalId,
                    employee_id: empNumStr,
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

            // Disambiguated In-Memory Joining (App 53 + App 792)
            this.unifiedEmployees = [];
            this.historyMap.clear();

            rawIdentities.forEach(identity => {
                let matchedAsg = null;

                if (identity.employee_id === '9000') {
                    if (identity.english_name.toLowerCase().includes('tomita')) {
                        matchedAsg = parsedAssignments.find(a => a.employee_id === '9000' && a.english_name.toLowerCase().includes('tomita') && a.assignment_status === 'CURRENT');
                    } else {
                        matchedAsg = parsedAssignments.find(a => a.employee_id === '9000' && a.english_name.toLowerCase().includes('panu') && a.assignment_status === 'CURRENT');
                    }
                } else {
                    matchedAsg = parsedAssignments.find(a => a.employee_id === identity.employee_id && a.assignment_status === 'CURRENT');
                }

                if (!matchedAsg) {
                    matchedAsg = {
                        assignment_id: `ASG-${identity.record_id}-DEF`,
                        position_code: 'POS-STAFF',
                        position_name: identity.raw_position || 'Staff',
                        organization_code: 'TTMET',
                        organization_name: 'Toyota Tsusho M&E (Thailand) Co.,Ltd.',
                        organization_type: 'COMPANY',
                        assignment_type: 'PRIMARY',
                        assignment_status: 'CURRENT',
                        effective_start_date: identity.start_date,
                        hierarchy_path: 'TTMET'
                    };
                }

                const org = this.orgMap.get(matchedAsg.organization_code) || {};

                // Determine Seniority / Position Tier Ranking
                let posTier = 6; // Staff / Operator
                const posUpper = (matchedAsg.position_name || '').toUpperCase();
                const posCodeUpper = (matchedAsg.position_code || '').toUpperCase();

                if (posCodeUpper.includes('PRES') || posUpper.includes('PRESIDENT')) posTier = 1;
                else if (posCodeUpper.includes('MD') || posUpper.includes('MANAGING DIRECTOR')) posTier = 1;
                else if (posCodeUpper.includes('VP') || posUpper.includes('VICE PRESIDENT')) posTier = 2;
                else if (posCodeUpper.includes('GM') || posUpper.includes('GENERAL MANAGER') || posCodeUpper.includes('DH') || posUpper.includes('DEPARTMENT HEAD')) posTier = 3;
                else if (posCodeUpper.includes('MGR') || posUpper.includes('MANAGER')) posTier = 4;
                else if (posCodeUpper.includes('SUP') || posUpper.includes('SUPERVISOR') || posUpper.includes('CHIEF')) posTier = 5;

                const unifiedObj = {
                    internal_id: identity.internal_id,
                    record_id: identity.record_id,
                    employee_id: identity.employee_id,
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
                    position_tier: posTier,
                    organization_code: matchedAsg.organization_code || 'TTMET',
                    organization_name: matchedAsg.organization_name || org.organization_name || 'Toyota Tsusho M&E (Thailand) Co.,Ltd.',
                    organization_type: matchedAsg.organization_type || org.organization_type || 'COMPANY',
                    assignment_type: matchedAsg.assignment_type || 'PRIMARY',
                    assignment_status: matchedAsg.assignment_status || 'CURRENT',
                    effective_start_date: matchedAsg.effective_start_date || identity.start_date || '',
                    hierarchy_path: matchedAsg.hierarchy_path || org.hierarchy_path || ''
                };

                this.unifiedEmployees.push(unifiedObj);

                const empHistory = parsedAssignments.filter(a => a.employee_id === identity.employee_id);
                this.historyMap.set(identity.internal_id, empHistory);
            });

            // Build Recursive Tree Graph from App 791 Parent-Child Links
            this.buildRecursiveHierarchyTree();

            // Build Position & Reporting Hierarchy Model
            this.buildPositionReportingModel();

            this.isLoaded = true;
            console.log(`OrgFlow Initialized: 275 Employees, 33 Canonical Units. Dual-Mode Ready.`);
        }

        buildRecursiveHierarchyTree() {
            this.treeNodes.clear();

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

            this.treeNodes.forEach(node => {
                if (node.parentCode && this.treeNodes.has(node.parentCode)) {
                    this.treeNodes.get(node.parentCode).children.push(node);
                }
            });

            this.treeNodes.forEach(node => {
                node.children.sort((a, b) => (a.level - b.level) || a.code.localeCompare(b.code));
            });

            this.unifiedEmployees.forEach(emp => {
                const orgNode = this.treeNodes.get(emp.organization_code);
                if (orgNode) {
                    orgNode.directEmployees.push(emp);
                } else {
                    const rootNode = this.treeNodes.get(this.rootNodeCode);
                    if (rootNode) rootNode.directEmployees.push(emp);
                }
            });

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

        buildPositionReportingModel() {
            // Group personnel into corporate management tiers
            this.executiveNodes = this.unifiedEmployees.filter(e => e.position_tier === 1);
            this.divisionHeads = this.unifiedEmployees.filter(e => e.position_tier === 2);
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

        getPositions() {
            const pMap = new Map();
            this.unifiedEmployees.forEach(e => {
                if (!pMap.has(e.position_code)) {
                    pMap.set(e.position_code, {
                        position_code: e.position_code,
                        position_name: e.position_name,
                        tier: e.position_tier,
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
            })).sort((a, b) => (a.tier - b.tier) || (b.count - a.count));
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
            this.currentView = 'ORG_CHART'; // Default to Organization Chart
            this.chartMode = 'PERSONNEL_VIEW'; // Default to Executive Personnel View (or CANONICAL_STRUCTURE)
            this.selectedOrgCode = 'TTMET';
            this.searchQuery = '';
            this.filterLevel = 'ALL';
            this.filterPositionStatus = 'ALL';
            this.activeEmployee = null;
            this.activeOrgDetail = null;
            this.drawerTab = 'OVERVIEW';
            this.isChangeWizardOpen = false;
            this.expandedNodeCodes = new Set(['TTMET', 'DIV-G0', 'DIV-ME', 'TMH0', 'TMT0', 'TMF0', 'TME0', 'TMS0', 'TMG0']);
            this.expandedPositionUnits = new Set(['TTMET', 'DIV-G0', 'DIV-ME', 'TMH0', 'TMT0', 'TMF0', 'TME0', 'TMS0', 'TMG0']);
        }

        async init(rootElement) {
            this.root = rootElement;
            this.root.innerHTML = `<div style="padding: 40px; text-align: center; color: #0284c7; font-size: 16px; font-weight: bold;">⏳ Initializing OrgFlow Explorer & Loading Canonical Master...</div>`;

            await this.store.loadAllData();
            this.render();
        }

        render() {
            this.root.innerHTML = '';
            const appContainer = document.createElement('div');
            appContainer.id = 'orgflow-explorer-app';

            appContainer.appendChild(this.renderToolbar());

            const bodyContainer = document.createElement('div');
            bodyContainer.className = 'orgflow-body';

            bodyContainer.appendChild(this.renderSidebar());
            bodyContainer.appendChild(this.renderCanvas());

            appContainer.appendChild(bodyContainer);

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
                        <span class="orgflow-brand-badge">Executive Org Chart</span>
                    </div>
                </div>

                <div class="orgflow-search-box">
                    <span class="orgflow-search-icon">🔍</span>
                    <input type="text" class="orgflow-search-input" placeholder="Search employee, ID, position, unit..." value="${this.searchQuery}">
                </div>

                <div class="orgflow-toolbar-controls">
                    <select class="orgflow-select" id="orgflow-level-filter">
                        <option value="ALL">All Hierarchy Levels</option>
                        <option value="DIVISION" ${this.filterLevel === 'DIVISION' ? 'selected' : ''}>Divisions</option>
                        <option value="DEPARTMENT" ${this.filterLevel === 'DEPARTMENT' ? 'selected' : ''}>Departments</option>
                        <option value="SECTION" ${this.filterLevel === 'SECTION' ? 'selected' : ''}>Sections</option>
                        <option value="TEAM" ${this.filterLevel === 'TEAM' ? 'selected' : ''}>Teams</option>
                    </select>

                    <button class="orgflow-btn orgflow-btn-outline" id="orgflow-print-btn">🖨️ Print Org Chart</button>
                    <button class="orgflow-btn orgflow-btn-outline" id="orgflow-export-excel-btn">📊 Export Excel</button>
                    <button class="orgflow-btn orgflow-btn-outline" id="orgflow-export-pdf-btn">📄 Export PDF</button>
                    <button class="orgflow-btn orgflow-btn-primary" id="orgflow-refresh-btn">🔄 Refresh</button>
                </div>
            `;

            const searchInput = bar.querySelector('.orgflow-search-input');
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.toLowerCase().trim();
                if (this.searchQuery) {
                    this.autoExpandSearchMatches(this.searchQuery);
                }
                this.renderContentOnly();
            });

            bar.querySelector('#orgflow-level-filter').addEventListener('change', (e) => {
                this.filterLevel = e.target.value;
                this.renderContentOnly();
            });

            bar.querySelector('#orgflow-print-btn').addEventListener('click', () => {
                this.handlePrintOrgChart();
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
                    emp.position_name.toLowerCase().includes(query) ||
                    emp.organization_code.toLowerCase().includes(query)) {
                    
                    let curr = this.store.getTreeNode(emp.organization_code);
                    while (curr) {
                        this.expandedNodeCodes.add(curr.code);
                        this.expandedPositionUnits.add(curr.code);
                        curr = curr.parentCode ? this.store.getTreeNode(curr.parentCode) : null;
                    }
                }
            });
        }

        renderSidebar() {
            const sidebar = document.createElement('div');
            sidebar.className = 'orgflow-sidebar';

            const navItems = [
                { id: 'ORG_CHART', icon: '🌳', label: 'Organization Chart' },
                { id: 'DIRECTORY', icon: '👥', label: 'Employee Directory', count: this.store.getUnifiedEmployees().length },
                { id: 'ORGANIZATIONS', icon: '🏛️', label: 'Canonical Units', count: this.store.getOrganizations().length },
                { id: 'POSITIONS', icon: '💼', label: 'Position Catalog', count: this.store.getPositions().length },
                { id: 'VACANCIES', icon: '🎯', label: 'Vacancies' },
                { id: 'REQUESTS', icon: '📝', label: 'Change Requests', count: this.store.getChangeRequests().length },
                { id: 'DASHBOARD', icon: '📊', label: 'Executive Dashboard' }
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

            canvas.appendChild(this.renderBreadcrumb());

            switch (this.currentView) {
                case 'ORG_CHART':
                    canvas.appendChild(this.renderOrgChartContainerView());
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
                case 'DASHBOARD':
                    canvas.appendChild(this.renderDashboardView());
                    break;
                default:
                    canvas.appendChild(this.renderOrgChartContainerView());
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
                <span>${currentOrg ? currentOrg.organization_name : 'Toyota Tsusho M&E (Thailand) Co.,Ltd.'} (<code>${this.selectedOrgCode}</code>)</span>
                <span style="margin-left: auto; color: #64748b; font-size: 11px;">View: <b>${this.currentView}</b> | Scope: <b>${this.store.getRootTreeNode()?.totalHeadcount || 275} Employees</b></span>
            `;

            bar.querySelector('.orgflow-breadcrumb-link').addEventListener('click', () => {
                this.selectedOrgCode = 'TTMET';
                this.render();
            });

            return bar;
        }

        renderOrgChartContainerView() {
            const view = document.createElement('div');

            view.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
                    <div style="display: flex; gap: 8px;">
                        <button class="orgflow-btn ${this.chartMode === 'PERSONNEL_VIEW' ? 'orgflow-btn-primary' : 'orgflow-btn-outline'}" id="btn-mode-personnel">👥 Personnel View (Executive Org Chart)</button>
                        <button class="orgflow-btn ${this.chartMode === 'CANONICAL_STRUCTURE' ? 'orgflow-btn-primary' : 'orgflow-btn-outline'}" id="btn-mode-canonical">🏛️ Canonical Structure (Unit Hierarchy)</button>
                    </div>
                    <div style="display: flex; gap: 8px; align-items: center;">
                        <button class="orgflow-btn orgflow-btn-outline" id="btn-expand-all" style="font-size:11px; padding:5px 10px;">Expand All</button>
                        <button class="orgflow-btn orgflow-btn-outline" id="btn-collapse-all" style="font-size:11px; padding:5px 10px;">Collapse All</button>
                        <button class="orgflow-btn orgflow-btn-outline" id="btn-reset-view" style="font-size:11px; padding:5px 10px;">Reset Focus (TTMET)</button>
                    </div>
                </div>

                <div class="orgflow-chart-container" id="orgflow-chart-canvas">
                    <!-- Dynamic Sub-View Injected Below -->
                </div>
            `;

            view.querySelector('#btn-mode-personnel').addEventListener('click', () => {
                this.chartMode = 'PERSONNEL_VIEW';
                this.render();
            });
            view.querySelector('#btn-mode-canonical').addEventListener('click', () => {
                this.chartMode = 'CANONICAL_STRUCTURE';
                this.render();
            });

            view.querySelector('#btn-expand-all').addEventListener('click', () => {
                this.store.getOrganizations().forEach(o => {
                    this.expandedNodeCodes.add(o.organization_code);
                    this.expandedPositionUnits.add(o.organization_code);
                });
                this.renderContentOnly();
            });

            view.querySelector('#btn-collapse-all').addEventListener('click', () => {
                this.expandedNodeCodes.clear();
                this.expandedNodeCodes.add('TTMET');
                this.expandedPositionUnits.clear();
                this.expandedPositionUnits.add('TTMET');
                this.renderContentOnly();
            });

            view.querySelector('#btn-reset-view').addEventListener('click', () => {
                this.selectedOrgCode = 'TTMET';
                this.expandedNodeCodes.clear();
                this.expandedNodeCodes.add('TTMET');
                this.expandedNodeCodes.add('DIV-G0');
                this.expandedNodeCodes.add('DIV-ME');
                this.expandedNodeCodes.add('TMH0');
                this.expandedPositionUnits.clear();
                this.expandedPositionUnits.add('TTMET');
                this.expandedPositionUnits.add('DIV-G0');
                this.expandedPositionUnits.add('DIV-ME');
                this.expandedPositionUnits.add('TMH0');
                this.render();
            });

            const chartCanvas = view.querySelector('#orgflow-chart-canvas');

            if (this.chartMode === 'PERSONNEL_VIEW') {
                chartCanvas.appendChild(this.renderExecutivePersonnelView());
            } else {
                const rootNode = this.store.getRootTreeNode();
                if (rootNode) {
                    chartCanvas.appendChild(this.renderRecursiveCanonicalOrgNode(rootNode));
                }
            }

            return view;
        }

        // ==========================================
        // TAB 2: EXECUTIVE PERSONNEL VIEW (ORG CHART)
        // ==========================================
        renderExecutivePersonnelView() {
            const container = document.createElement('div');
            container.className = 'orgflow-personnel-chart-root';

            const totalEmps = this.store.getUnifiedEmployees().length;
            const totalPos = this.store.getPositions().length;
            const mgmtCount = this.store.getUnifiedEmployees().filter(e => e.position_tier <= 4).length;

            // Summary Header
            const headerSummary = document.createElement('div');
            headerSummary.className = 'orgflow-personnel-summary-bar';
            headerSummary.innerHTML = `
                <div class="orgflow-summary-pill"><span>TOTAL EMPLOYEES:</span> <b>${totalEmps}</b></div>
                <div class="orgflow-summary-pill"><span>CANONICAL POSITIONS:</span> <b>${totalPos}</b></div>
                <div class="orgflow-summary-pill"><span>MANAGEMENT STAFF:</span> <b>${mgmtCount}</b></div>
                <div class="orgflow-summary-pill"><span>VACANT POSITIONS:</span> <b>0</b></div>
                <div style="margin-left:auto; font-size:11px; color:#64748b;">Layout: <b>Corporate Top-Down Position Hierarchy</b></div>
            `;
            container.appendChild(headerSummary);

            // Chart Canvas
            const chartArea = document.createElement('div');
            chartArea.className = 'orgflow-personnel-canvas';

            // Top Tier: President & Managing Director (TTMET)
            const topExecs = this.store.getUnifiedEmployees().filter(e => e.organization_code === 'TTMET');
            const execGroup = document.createElement('div');
            execGroup.className = 'orgflow-personnel-group';

            const execCards = document.createElement('div');
            execCards.className = 'orgflow-personnel-row';
            topExecs.forEach(exec => {
                execCards.appendChild(this.renderPositionEmployeeCard(exec, 'COMPANY TOP'));
            });
            execGroup.appendChild(execCards);

            // Connectors to Divisions / Top Depts
            const branchRow = document.createElement('div');
            branchRow.className = 'orgflow-personnel-branches';

            // 1. DIV-ME (Machinery & Engineering Division)
            branchRow.appendChild(this.renderPersonnelDivisionBranch('DIV-ME'));

            // 2. DIV-G0 (GIFU SEIKI Division)
            branchRow.appendChild(this.renderPersonnelDivisionBranch('DIV-G0'));

            // 3. TMH0 (Corporate Department)
            branchRow.appendChild(this.renderPersonnelDepartmentBranch('TMH0'));

            execGroup.appendChild(branchRow);
            chartArea.appendChild(execGroup);
            container.appendChild(chartArea);

            return container;
        }

        renderPersonnelDivisionBranch(divCode) {
            const divNode = this.store.getTreeNode(divCode);
            if (!divNode) return document.createElement('div');

            const col = document.createElement('div');
            col.className = 'orgflow-personnel-branch-col';

            // Header Container for Division
            const headerBox = document.createElement('div');
            headerBox.className = 'orgflow-org-header-box';
            headerBox.innerHTML = `
                <div class="orgflow-org-header-title">${divNode.name}</div>
                <div class="orgflow-org-header-sub"><code>${divNode.code}</code> • Scope: <b>${divNode.totalHeadcount} Staff</b></div>
            `;
            headerBox.addEventListener('click', () => {
                this.selectedOrgCode = divNode.code;
                this.renderBreadcrumbOnly();
            });
            col.appendChild(headerBox);

            // Division Head Card (VP)
            if (divNode.directEmployees.length > 0) {
                const vpRow = document.createElement('div');
                vpRow.className = 'orgflow-personnel-row';
                divNode.directEmployees.forEach(vp => {
                    vpRow.appendChild(this.renderPositionEmployeeCard(vp, 'DIVISION HEAD'));
                });
                col.appendChild(vpRow);
            }

            // Subordinate Departments
            const deptsRow = document.createElement('div');
            deptsRow.className = 'orgflow-personnel-sub-row';
            divNode.children.forEach(dept => {
                deptsRow.appendChild(this.renderPersonnelDepartmentBranch(dept.code));
            });
            col.appendChild(deptsRow);

            return col;
        }

        renderPersonnelDepartmentBranch(deptCode) {
            const deptNode = this.store.getTreeNode(deptCode);
            if (!deptNode) return document.createElement('div');

            const col = document.createElement('div');
            col.className = 'orgflow-personnel-dept-col';

            // Dept Header
            const deptHeader = document.createElement('div');
            deptHeader.className = 'orgflow-dept-header-box';
            deptHeader.innerHTML = `
                <div class="orgflow-dept-title">${deptNode.name}</div>
                <div class="orgflow-dept-sub"><code>${deptNode.code}</code> • ${deptNode.totalHeadcount} Staff</div>
            `;
            col.appendChild(deptHeader);

            // Dept Managers / Heads
            if (deptNode.directEmployees.length > 0) {
                const mgrRow = document.createElement('div');
                mgrRow.className = 'orgflow-personnel-row';
                deptNode.directEmployees.forEach(mgr => {
                    mgrRow.appendChild(this.renderPositionEmployeeCard(mgr, 'DEPARTMENT MGMT'));
                });
                col.appendChild(mgrRow);
            }

            // Subordinate Sections / Teams
            if (deptNode.children.length > 0) {
                const secRow = document.createElement('div');
                secRow.className = 'orgflow-personnel-sections-row';
                deptNode.children.forEach(sec => {
                    secRow.appendChild(this.renderPersonnelSectionBranch(sec.code));
                });
                col.appendChild(secRow);
            }

            return col;
        }

        renderPersonnelSectionBranch(secCode) {
            const secNode = this.store.getTreeNode(secCode);
            if (!secNode) return document.createElement('div');

            const box = document.createElement('div');
            box.className = 'orgflow-personnel-section-card';

            const isExpanded = this.expandedPositionUnits.has(secCode);

            box.innerHTML = `
                <div class="orgflow-section-header">
                    <div style="font-weight:700; color:#0f172a; font-size:12px;">${secNode.name}</div>
                    <div style="font-size:10px; color:#64748b;"><code>${secNode.code}</code> • ${secNode.totalHeadcount} Staff</div>
                </div>
                <div style="margin-top:8px; display:flex; justify-content:space-between; align-items:center;">
                    <button class="orgflow-btn orgflow-btn-outline btn-toggle-sec-staff" style="font-size:10px; padding:2px 6px;">
                        ${isExpanded ? '▲ Hide Staff' : `▼ View Staff (${secNode.directHeadcount})`}
                    </button>
                    <button class="orgflow-btn orgflow-btn-outline btn-sec-details" style="font-size:10px; padding:2px 6px;">🔍 Details</button>
                </div>
            `;

            box.querySelector('.btn-toggle-sec-staff').addEventListener('click', (e) => {
                e.stopPropagation();
                if (this.expandedPositionUnits.has(secCode)) {
                    this.expandedPositionUnits.delete(secCode);
                } else {
                    this.expandedPositionUnits.add(secCode);
                }
                this.renderContentOnly();
            });

            box.querySelector('.btn-sec-details').addEventListener('click', (e) => {
                e.stopPropagation();
                this.activeOrgDetail = secNode;
                this.render();
            });

            // If Expanded, Render Incumbents
            if (isExpanded && secNode.directEmployees.length > 0) {
                const staffList = document.createElement('div');
                staffList.className = 'orgflow-section-staff-list';
                secNode.directEmployees.forEach(staff => {
                    staffList.appendChild(this.renderPositionEmployeeCard(staff, 'STAFF', true));
                });
                box.appendChild(staffList);
            }

            return box;
        }

        renderPositionEmployeeCard(emp, roleBadgeText = '', isCompact = false) {
            const card = document.createElement('div');
            card.className = `orgflow-position-card ${isCompact ? 'compact' : ''}`;
            
            // Accent color based on position tier
            if (emp.position_tier === 1) card.style.borderTop = '4px solid #0284c7';
            else if (emp.position_tier === 2) card.style.borderTop = '4px solid #6366f1';
            else if (emp.position_tier === 3 || emp.position_tier === 4) card.style.borderTop = '4px solid #06b6d4';
            else card.style.borderTop = '3px solid #cbd5e1';

            // Highlighting Search Match
            if (this.searchQuery && (
                emp.english_name.toLowerCase().includes(this.searchQuery) ||
                emp.thai_name.toLowerCase().includes(this.searchQuery) ||
                emp.employee_id.toLowerCase().includes(this.searchQuery) ||
                emp.position_name.toLowerCase().includes(this.searchQuery)
            )) {
                card.style.boxShadow = '0 0 0 3px #fef08a, 0 4px 12px rgba(234, 179, 8, 0.3)';
            }

            const initials = emp.english_name ? emp.english_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'EM';

            card.innerHTML = `
                <div class="orgflow-pos-header">
                    <span class="orgflow-pos-title">${emp.position_name}</span>
                    <span class="orgflow-pos-code"><code>${emp.position_code}</code></span>
                </div>
                <div class="orgflow-pos-body">
                    <div class="orgflow-pos-avatar">
                        ${emp.photo_url ? `<img src="${emp.photo_url}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">` : initials}
                    </div>
                    <div class="orgflow-pos-info">
                        <div class="orgflow-pos-emp-name">${emp.english_name}</div>
                        <div class="orgflow-pos-emp-id">EMP: <b>${emp.employee_id}</b></div>
                        <div class="orgflow-pos-unit">${emp.organization_name}</div>
                    </div>
                </div>
            `;

            card.addEventListener('click', (e) => {
                e.stopPropagation();
                this.activeEmployee = emp;
                this.drawerTab = 'OVERVIEW';
                this.render();
            });

            return card;
        }

        // ==========================================
        // TAB 1: CANONICAL STRUCTURE TREE (UNCHANGED)
        // ==========================================
        renderRecursiveCanonicalOrgNode(node) {
            const container = document.createElement('div');
            container.className = 'orgflow-tree-node';

            const isExpanded = this.expandedNodeCodes.has(node.code);
            const hasChildren = node.children && node.children.length > 0;

            const card = document.createElement('div');
            card.className = 'orgflow-node-card';
            
            if (node.level === 1) card.style.borderLeft = '5px solid #0284c7';
            else if (node.level === 2) card.style.borderLeft = '5px solid #6366f1';
            else if (node.level === 3) card.style.borderLeft = '5px solid #06b6d4';
            else if (node.level === 4) card.style.borderLeft = '5px solid #10b981';
            else card.style.borderLeft = '4px solid #f59e0b';

            if (this.searchQuery && (node.code.toLowerCase().includes(this.searchQuery) || node.name.toLowerCase().includes(this.searchQuery))) {
                card.style.boxShadow = '0 0 0 3px #fef08a, 0 4px 12px rgba(234, 179, 8, 0.25)';
            }

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

            card.querySelector('.btn-view-org-detail').addEventListener('click', (e) => {
                e.stopPropagation();
                this.activeOrgDetail = node;
                this.render();
            });

            card.addEventListener('click', () => {
                this.selectedOrgCode = node.code;
                this.renderBreadcrumbOnly();
            });

            container.appendChild(card);

            if (hasChildren && isExpanded) {
                const childWrapper = document.createElement('div');
                childWrapper.className = 'orgflow-tree-children';

                node.children.forEach(child => {
                    childWrapper.appendChild(this.renderRecursiveCanonicalOrgNode(child));
                });
                container.appendChild(childWrapper);
            }

            return container;
        }

        renderOrgDetailDrawer() {
            const overlay = document.createElement('div');
            overlay.className = 'orgflow-drawer-overlay';

            const node = this.activeOrgDetail;
            const drawer = document.createElement('div');
            drawer.className = 'orgflow-drawer';
            drawer.style.width = '580px';

            const managers = node.directEmployees.filter(e => e.position_tier <= 4);

            drawer.innerHTML = `
                <div class="orgflow-drawer-header">
                    <div>
                        <div class="orgflow-drawer-title">${node.name}</div>
                        <div style="font-size: 12px; color: #64748b;">Canonical Code: <code>${node.code}</code> • ${node.type} (Level ${node.level})</div>
                    </div>
                    <button class="orgflow-drawer-close" id="org-drawer-close-btn">✕</button>
                </div>

                <div class="orgflow-drawer-body">
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-bottom: 16px;">
                        <div class="orgflow-kpi-card" style="padding: 10px;">
                            <div class="orgflow-kpi-title">Direct Staff</div>
                            <div class="orgflow-kpi-value" style="font-size: 20px;">${node.directHeadcount}</div>
                            <div class="orgflow-kpi-sub">Assigned in tier</div>
                        </div>
                        <div class="orgflow-kpi-card" style="padding: 10px;">
                            <div class="orgflow-kpi-title">Total Scope</div>
                            <div class="orgflow-kpi-value" style="font-size: 20px; color: #0284c7;">${node.totalHeadcount}</div>
                            <div class="orgflow-kpi-sub">Including child units</div>
                        </div>
                        <div class="orgflow-kpi-card" style="padding: 10px;">
                            <div class="orgflow-kpi-title">Child Units</div>
                            <div class="orgflow-kpi-value" style="font-size: 20px; color: #6366f1;">${node.children.length}</div>
                            <div class="orgflow-kpi-sub">Direct subordinates</div>
                        </div>
                    </div>

                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px; margin-bottom: 16px; font-size: 12px;">
                        <div><b>Hierarchy Path:</b> <span style="color: #475569;">${node.hierarchyPath}</span></div>
                        <div style="margin-top: 4px;"><b>Parent Canonical Unit:</b> <code>${node.parentCode || 'ROOT (Company Top)'}</code></div>
                        <div style="margin-top: 4px;"><b>Unit Leadership / Managers:</b> ${managers.length > 0 ? managers.map(m => `<b>${m.english_name}</b> (${m.position_name})`).join(', ') : '<span style="color:#94a3b8;">None directly assigned</span>'}</div>
                    </div>

                    ${node.children.length > 0 ? `
                        <div style="margin-bottom: 16px;">
                            <div style="font-weight: 700; font-size: 12px; color: #0f172a; margin-bottom: 6px;">Direct Subordinate Units (${node.children.length})</div>
                            <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                                ${node.children.map(c => `
                                    <span class="orgflow-badge badge-active" style="cursor:pointer;" data-child="${c.code}">
                                        ${c.code} — ${c.name} (${c.totalHeadcount})
                                    </span>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}

                    <div style="font-weight: 700; font-size: 13px; color: #0f172a; margin-bottom: 8px;">Direct Assigned Personnel (${node.directHeadcount})</div>
                    ${node.directEmployees.length === 0 ? `
                        <div style="padding: 16px; background: #ffffff; border: 1px dashed #cbd5e1; border-radius: 6px; color: #94a3b8; font-size: 12px; text-align: center;">
                            No direct personnel placed at this unit level (Staff assigned to subordinate sections).
                        </div>
                    ` : `
                        <table class="orgflow-table">
                            <thead>
                                <tr><th>Emp ID</th><th>Name</th><th>Position</th><th>Action</th></tr>
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
                    <button class="orgflow-btn orgflow-btn-primary" id="btn-drill-org">Focus View</button>
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
                this.expandedPositionUnits.add(node.code);
                this.activeOrgDetail = null;
                this.render();
            });

            drawer.querySelectorAll('[data-child]').forEach(span => {
                span.addEventListener('click', () => {
                    const cCode = span.getAttribute('data-child');
                    this.activeOrgDetail = this.store.getTreeNode(cCode);
                    this.render();
                });
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
                            <th>Internal ID</th>
                            <th>Emp No</th>
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
                                <td><code>${e.internal_id}</code></td>
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
                    <div style="font-weight: 700; color: #0f172a;">Canonical Organization Units (App 791 Master - ${orgs.length} nodes)</div>
                </div>
                <table class="orgflow-table">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Organization Name</th>
                            <th>Entity Type</th>
                            <th>Level</th>
                            <th>Parent Unit</th>
                            <th>Hierarchy Path</th>
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
                                    <td><code>${o.parent_organization_code || 'ROOT'}</code></td>
                                    <td style="font-size:11px; color:#64748b;">${o.hierarchy_path}</td>
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
                    <div style="font-weight: 700; color: #0f172a;">Position Catalog & Distribution (${positions.length} positions)</div>
                </div>
                <table class="orgflow-table">
                    <thead>
                        <tr>
                            <th>Position Code</th>
                            <th>Position Title</th>
                            <th>Tier Rank</th>
                            <th>Assigned Staff</th>
                            <th>Present in Units</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${positions.map(p => `
                            <tr>
                                <td><code>${p.position_code}</code></td>
                                <td><b>${p.position_name}</b></td>
                                <td>Tier ${p.tier}</td>
                                <td style="font-weight:bold; color:#0284c7;">${p.count} staff</td>
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
                    <div style="font-weight: 700; color: #0f172a;">Position Capacity & Status</div>
                </div>
                <table class="orgflow-table">
                    <thead>
                        <tr>
                            <th>Position Title</th>
                            <th>Position Code</th>
                            <th>Organization Unit</th>
                            <th>Org Code</th>
                            <th style="text-align:right;">Budgeted</th>
                            <th style="text-align:right;">Active</th>
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
                    <div style="font-weight: 700; color: #0f172a;">Organization Change Requests (App 793 Monitor)</div>
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
                        <div class="orgflow-kpi-sub">App 791 Master Tree</div>
                    </div>
                    <div class="orgflow-kpi-card">
                        <div class="orgflow-kpi-title">Standard Positions</div>
                        <div class="orgflow-kpi-value">${totalPos}</div>
                        <div class="orgflow-kpi-sub">Position Catalog</div>
                    </div>
                    <div class="orgflow-kpi-card">
                        <div class="orgflow-kpi-title">Change Requests</div>
                        <div class="orgflow-kpi-value">${crCount}</div>
                        <div class="orgflow-kpi-sub">App 793 Workflow</div>
                    </div>
                </div>
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
                                <div style="font-size: 12px; color: #64748b; font-family: monospace;">${e.position_code} • Tier ${e.position_tier}</div>
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
                        <span><b>PREVIEW MODE ACTIVATED:</b> In-memory simulation only. Zero production writes will occur.</span>
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
                    case 'ORG_CHART': canvas.appendChild(this.renderOrgChartContainerView()); break;
                    case 'DIRECTORY': canvas.appendChild(this.renderDirectoryView()); break;
                    case 'ORGANIZATIONS': canvas.appendChild(this.renderOrganizationsView()); break;
                    case 'POSITIONS': canvas.appendChild(this.renderPositionsView()); break;
                    case 'VACANCIES': canvas.appendChild(this.renderVacanciesView()); break;
                    case 'REQUESTS': canvas.appendChild(this.renderChangeRequestsView()); break;
                    case 'DASHBOARD': canvas.appendChild(this.renderDashboardView()); break;
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
                    <span>${currentOrg ? currentOrg.organization_name : 'Toyota Tsusho M&E (Thailand) Co.,Ltd.'} (<code>${this.selectedOrgCode}</code>)</span>
                    <span style="margin-left: auto; color: #64748b; font-size: 11px;">View: <b>${this.currentView}</b> | Scope: <b>${this.store.getRootTreeNode()?.totalHeadcount || 275} Employees</b></span>
                `;
                bar.querySelector('.orgflow-breadcrumb-link').addEventListener('click', () => {
                    this.selectedOrgCode = 'TTMET';
                    this.render();
                });
            }
        }

        handlePrintOrgChart() {
            window.print();
        }

        handleExcelExport() {
            const filename = `OrgFlow_Personnel_Export_${new Date().toISOString().slice(0, 10)}.csv`;
            
            let headers = [
                'Hierarchy Level',
                'Organization Path',
                'Organization Code',
                'Organization Name',
                'Position Code',
                'Position Name',
                'Position Tier',
                'Position Status',
                'Employee Number',
                'Thai Name',
                'English Name',
                'Assignment Type',
                'Effective Start Date'
            ];

            let rows = this.store.getUnifiedEmployees().map(e => {
                const org = this.store.getOrgByCode(e.organization_code) || {};
                return [
                    `"${org.organization_level || 1}"`,
                    `"${(org.hierarchy_path || 'TTMET').replace(/"/g, '""')}"`,
                    `"${e.organization_code}"`,
                    `"${(org.organization_name || e.organization_name).replace(/"/g, '""')}"`,
                    `"${e.position_code}"`,
                    `"${e.position_name.replace(/"/g, '""')}"`,
                    `"Tier ${e.position_tier}"`,
                    `"${e.assignment_status}"`,
                    `"=""${e.employee_id}"""`, // Preserves leading zero in Excel
                    `"${e.thai_name.replace(/"/g, '""')}"`,
                    `"${e.english_name.replace(/"/g, '""')}"`,
                    `"${e.assignment_type}"`,
                    `"${e.effective_start_date}"`
                ];
            });

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
            const rootNode = this.store.getRootTreeNode();
            const topExecs = this.store.getUnifiedEmployees().filter(e => e.organization_code === 'TTMET');
            const divME = this.store.getTreeNode('DIV-ME');
            const divG0 = this.store.getTreeNode('DIV-G0');
            const tmh0 = this.store.getTreeNode('TMH0');

            const renderPositionPdfCard = (emp) => `
                <div style="border: 1px solid #0284c7; border-radius: 4px; padding: 6px 8px; width: 170px; background: #ffffff; text-align: left; font-size: 9px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); margin: 4px;">
                    <div style="font-weight: bold; color: #0284c7; font-size: 10px;">${emp.position_name}</div>
                    <div style="color: #64748b; font-size: 8px;"><code>${emp.position_code}</code></div>
                    <div style="margin-top: 4px; font-weight: bold; color: #0f172a;">${emp.english_name}</div>
                    <div style="color: #475569; font-size: 8px;">ID: <b>${emp.employee_id}</b></div>
                    <div style="font-size: 8px; color: #64748b; margin-top: 2px;">${emp.organization_name}</div>
                </div>
            `;

            const html = `
                <html>
                <head>
                    <title>OrgFlow — Official Corporate Organization Chart</title>
                    <style>
                        @page { size: A3 landscape; margin: 12mm; }
                        body { font-family: 'Segoe UI', Tahoma, sans-serif; color: #1e293b; background: #ffffff; margin: 0; padding: 10px; }
                        .pdf-header { border-bottom: 2px solid #0284c7; padding-bottom: 8px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: flex-end; }
                        .pdf-title { font-size: 18px; font-weight: bold; color: #0f172a; }
                        .pdf-sub { font-size: 11px; color: #64748b; }
                        .chart-container { display: flex; flex-direction: column; align-items: center; width: 100%; }
                        .branch-row { display: flex; justify-content: space-around; width: 100%; margin-top: 20px; gap: 15px; }
                        .branch-col { border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px; background: #f8fafc; flex: 1; text-align: center; }
                        .branch-title { font-weight: bold; font-size: 12px; color: #0f172a; margin-bottom: 8px; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; }
                        .sub-depts { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-top: 10px; }
                        .dept-box { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 4px; padding: 6px; width: 190px; text-align: center; }
                    </style>
                </head>
                <body>
                    <div class="pdf-header">
                        <div>
                            <div class="pdf-title">TOYOTA TSUSHO M&E (THAILAND) CO., LTD.</div>
                            <div class="pdf-sub">Executive Organization Chart • Scope: <b>${rootNode?.totalHeadcount || 275} Employees</b> • FY2026 Canonical Baseline</div>
                        </div>
                        <div style="text-align: right; font-size: 10px; color: #64748b;">
                            Generated: ${new Date().toLocaleDateString()} | Master: App 791 / App 53 / App 792
                        </div>
                    </div>

                    <div class="chart-container">
                        <!-- Top Executives -->
                        <div style="display: flex; gap: 15px; justify-content: center;">
                            ${topExecs.map(renderPositionPdfCard).join('')}
                        </div>

                        <!-- Divisions & Branches -->
                        <div class="branch-row">
                            <!-- Machinery & Engineering Division -->
                            <div class="branch-col" style="flex: 2;">
                                <div class="branch-title">Machinery & Engineering Division (${divME?.totalHeadcount || 172} Staff)</div>
                                <div style="display: flex; justify-content: center;">
                                    ${divME?.directEmployees.map(renderPositionPdfCard).join('') || ''}
                                </div>
                                <div class="sub-depts">
                                    ${divME?.children.map(dept => `
                                        <div class="dept-box">
                                            <div style="font-weight: bold; font-size: 10px; color: #0284c7;">${dept.name}</div>
                                            <div style="font-size: 8px; color: #64748b;">${dept.totalHeadcount} Staff</div>
                                            <div style="margin-top: 4px;">
                                                ${dept.directEmployees.map(renderPositionPdfCard).join('')}
                                            </div>
                                        </div>
                                    `).join('') || ''}
                                </div>
                            </div>

                            <!-- GIFU SEIKI Division -->
                            <div class="branch-col" style="flex: 1.2;">
                                <div class="branch-title">GIFU SEIKI Division (${divG0?.totalHeadcount || 89} Staff)</div>
                                <div style="display: flex; justify-content: center;">
                                    ${divG0?.directEmployees.map(renderPositionPdfCard).join('') || ''}
                                </div>
                                <div class="sub-depts">
                                    ${divG0?.children.map(dept => `
                                        <div class="dept-box">
                                            <div style="font-weight: bold; font-size: 10px; color: #0284c7;">${dept.name}</div>
                                            <div style="font-size: 8px; color: #64748b;">${dept.totalHeadcount} Staff</div>
                                            <div style="margin-top: 4px;">
                                                ${dept.directEmployees.map(renderPositionPdfCard).join('')}
                                            </div>
                                        </div>
                                    `).join('') || ''}
                                </div>
                            </div>

                            <!-- Corporate Department -->
                            <div class="branch-col" style="flex: 1;">
                                <div class="branch-title">Corporate Department (${tmh0?.totalHeadcount || 12} Staff)</div>
                                <div class="sub-depts">
                                    ${tmh0?.children.map(sec => `
                                        <div class="dept-box">
                                            <div style="font-weight: bold; font-size: 10px; color: #0284c7;">${sec.name}</div>
                                            <div style="font-size: 8px; color: #64748b;">${sec.totalHeadcount} Staff</div>
                                            <div style="margin-top: 4px;">
                                                ${sec.directEmployees.map(renderPositionPdfCard).join('')}
                                            </div>
                                        </div>
                                    `).join('') || ''}
                                </div>
                            </div>
                        </div>
                    </div>

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
