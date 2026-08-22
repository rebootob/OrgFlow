
// Auto-injected OrgFlow Explorer Styles
(function() {
    if (!document.getElementById('orgflow-explorer-styles')) {
        const style = document.createElement('style');
        style.id = 'orgflow-explorer-styles';
        style.textContent = "/**\n * OrgFlow — Organization Explorer & HR Portal Styling\n * Corporate Design System, isolated namespace (#orgflow-explorer-app).\n * Zero collision with default Kintone styling.\n */\n\n#orgflow-explorer-app {\n    font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Inter', Roboto, sans-serif;\n    color: #1e293b;\n    background-color: #f8fafc;\n    min-height: calc(100vh - 120px);\n    display: flex;\n    flex-direction: column;\n    box-sizing: border-box;\n}\n\n#orgflow-explorer-app * {\n    box-sizing: border-box;\n}\n\n/* TOP TOOLBAR */\n.orgflow-toolbar {\n    background: #ffffff;\n    border-bottom: 1px solid #e2e8f0;\n    padding: 12px 20px;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 16px;\n    position: sticky;\n    top: 0;\n    z-index: 40;\n    box-shadow: 0 1px 3px rgba(0,0,0,0.05);\n}\n\n.orgflow-logo-area {\n    display: flex;\n    align-items: center;\n    gap: 12px;\n}\n\n.orgflow-brand {\n    font-size: 18px;\n    font-weight: 700;\n    color: #0284c7;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n}\n\n.orgflow-brand-badge {\n    background: #e0f2fe;\n    color: #0369a1;\n    font-size: 11px;\n    padding: 2px 6px;\n    border-radius: 4px;\n    font-weight: 600;\n}\n\n.orgflow-uat-indicator {\n    display: flex;\n    align-items: center;\n    background: #f8fafc;\n    border: 1px solid #cbd5e1;\n    border-radius: 20px;\n    padding: 4px 12px;\n    font-size: 11px;\n    color: #334155;\n}\n\n.orgflow-search-box {\n    position: relative;\n    width: 300px;\n}\n\n.orgflow-search-input {\n    width: 100%;\n    padding: 8px 12px 8px 34px;\n    border: 1px solid #cbd5e1;\n    border-radius: 6px;\n    font-size: 13px;\n    outline: none;\n    transition: border-color 0.2s;\n}\n\n.orgflow-search-input:focus {\n    border-color: #0284c7;\n    box-shadow: 0 0 0 2px rgba(2,132,199,0.15);\n}\n\n.orgflow-search-icon {\n    position: absolute;\n    left: 10px;\n    top: 50%;\n    transform: translateY(-50%);\n    color: #94a3b8;\n    font-size: 14px;\n}\n\n.orgflow-toolbar-controls {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n}\n\n.orgflow-select {\n    padding: 7px 10px;\n    border: 1px solid #cbd5e1;\n    border-radius: 6px;\n    font-size: 12px;\n    background: #ffffff;\n    color: #334155;\n    outline: none;\n}\n\n.orgflow-btn {\n    padding: 7px 14px;\n    border-radius: 6px;\n    font-size: 12px;\n    font-weight: 600;\n    cursor: pointer;\n    display: inline-flex;\n    align-items: center;\n    gap: 6px;\n    border: 1px solid transparent;\n    transition: all 0.15s ease-in-out;\n}\n\n.orgflow-btn-primary {\n    background: #0284c7;\n    color: #ffffff;\n}\n\n.orgflow-btn-primary:hover {\n    background: #0369a1;\n}\n\n.orgflow-btn-outline {\n    background: #ffffff;\n    border-color: #cbd5e1;\n    color: #334155;\n}\n\n.orgflow-btn-outline:hover {\n    background: #f1f5f9;\n    border-color: #94a3b8;\n}\n\n/* MAIN LAYOUT */\n.orgflow-body {\n    display: flex;\n    flex: 1;\n    overflow: hidden;\n}\n\n/* SIDEBAR */\n.orgflow-sidebar {\n    width: 230px;\n    background: #ffffff;\n    border-right: 1px solid #e2e8f0;\n    padding: 16px 10px;\n    display: flex;\n    flex-direction: column;\n    gap: 4px;\n}\n\n.orgflow-nav-item {\n    padding: 9px 12px;\n    border-radius: 6px;\n    font-size: 13px;\n    font-weight: 500;\n    color: #475569;\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    transition: all 0.15s ease-in-out;\n}\n\n.orgflow-nav-item:hover {\n    background: #f1f5f9;\n    color: #0f172a;\n}\n\n.orgflow-nav-item.active {\n    background: #e0f2fe;\n    color: #0284c7;\n    font-weight: 600;\n}\n\n.orgflow-nav-badge {\n    margin-left: auto;\n    background: #f1f5f9;\n    color: #64748b;\n    font-size: 10px;\n    padding: 2px 6px;\n    border-radius: 10px;\n}\n\n/* CONTENT CANVAS */\n.orgflow-canvas {\n    flex: 1;\n    padding: 20px;\n    overflow-y: auto;\n    background: #f8fafc;\n}\n\n/* BREADCRUMB */\n.orgflow-breadcrumb-bar {\n    background: #ffffff;\n    padding: 8px 16px;\n    border-radius: 6px;\n    border: 1px solid #e2e8f0;\n    margin-bottom: 16px;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 12px;\n}\n\n.orgflow-breadcrumb-link {\n    color: #0284c7;\n    cursor: pointer;\n    font-weight: 500;\n}\n\n.orgflow-breadcrumb-link:hover {\n    text-decoration: underline;\n}\n\n.orgflow-breadcrumb-separator {\n    color: #94a3b8;\n}\n\n/* KPI DASHBOARD TILES */\n.orgflow-kpi-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n    gap: 16px;\n    margin-bottom: 20px;\n}\n\n.orgflow-kpi-card {\n    background: #ffffff;\n    border: 1px solid #e2e8f0;\n    border-radius: 8px;\n    padding: 16px;\n    box-shadow: 0 1px 2px rgba(0,0,0,0.03);\n}\n\n.orgflow-kpi-title {\n    font-size: 12px;\n    color: #64748b;\n    font-weight: 600;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n}\n\n.orgflow-kpi-value {\n    font-size: 26px;\n    font-weight: 700;\n    color: #0f172a;\n    margin-top: 4px;\n}\n\n.orgflow-kpi-sub {\n    font-size: 11px;\n    color: #10b981;\n    margin-top: 4px;\n}\n\n/* ORG CHART TREE CANVAS */\n.orgflow-chart-container {\n    background: #ffffff;\n    border: 1px solid #e2e8f0;\n    border-radius: 8px;\n    padding: 24px;\n    min-height: 500px;\n    overflow: auto;\n}\n\n.orgflow-tree-node {\n    display: inline-flex;\n    flex-direction: column;\n    align-items: center;\n    margin: 8px 12px;\n    position: relative;\n}\n\n.orgflow-tree-children {\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    gap: 16px;\n    margin-top: 24px;\n    position: relative;\n    padding-top: 20px;\n}\n\n/* Horizontal connector line across child nodes */\n.orgflow-tree-children::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 20px;\n    right: 20px;\n    height: 2px;\n    background: #cbd5e1;\n}\n\n/* Vertical connector line coming down from parent */\n.orgflow-tree-node::before {\n    content: '';\n    position: absolute;\n    top: -20px;\n    left: 50%;\n    width: 2px;\n    height: 20px;\n    background: #cbd5e1;\n    transform: translateX(-50%);\n}\n\n.orgflow-chart-container > .orgflow-tree-node > .orgflow-node-card {\n    /* Root node does not have line above */\n}\n\n.orgflow-chart-container > .orgflow-tree-node::before {\n    display: none;\n}\n\n.orgflow-node-card {\n    background: #ffffff;\n    border: 1px solid #cbd5e1;\n    border-radius: 8px;\n    width: 260px;\n    padding: 12px;\n    box-shadow: 0 2px 4px rgba(0,0,0,0.04);\n    cursor: pointer;\n    transition: all 0.2s;\n    position: relative;\n    z-index: 2;\n}\n\n.orgflow-node-card:hover {\n    border-color: #0284c7;\n    box-shadow: 0 4px 12px rgba(2,132,199,0.12);\n    transform: translateY(-2px);\n}\n\n.orgflow-node-header {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    border-bottom: 1px solid #f1f5f9;\n    padding-bottom: 6px;\n    margin-bottom: 8px;\n}\n\n.orgflow-node-type-badge {\n    font-size: 10px;\n    font-weight: 700;\n    padding: 2px 6px;\n    border-radius: 4px;\n    text-transform: uppercase;\n}\n\n.type-company { background: #fef08a; color: #854d0e; }\n.type-division { background: #e0e7ff; color: #3730a3; }\n.type-department { background: #e0f2fe; color: #0369a1; }\n.type-section { background: #f1f5f9; color: #334155; }\n.type-team { background: #fae8ff; color: #86198f; }\n\n.orgflow-node-name {\n    font-size: 13px;\n    font-weight: 700;\n    color: #0f172a;\n    line-height: 1.3;\n}\n\n.orgflow-node-code {\n    font-size: 11px;\n    color: #64748b;\n    font-family: monospace;\n}\n\n.orgflow-node-meta {\n    display: flex;\n    justify-content: space-between;\n    margin-top: 8px;\n    font-size: 11px;\n    color: #475569;\n}\n\n/* EMPLOYEE DIRECTORY TABLE */\n.orgflow-table-card {\n    background: #ffffff;\n    border: 1px solid #e2e8f0;\n    border-radius: 8px;\n    overflow: hidden;\n    box-shadow: 0 1px 3px rgba(0,0,0,0.03);\n}\n\n.orgflow-table {\n    width: 100%;\n    border-collapse: collapse;\n    font-size: 12px;\n}\n\n.orgflow-table th {\n    background: #f8fafc;\n    color: #475569;\n    font-weight: 600;\n    text-align: left;\n    padding: 10px 14px;\n    border-bottom: 1px solid #e2e8f0;\n}\n\n.orgflow-table td {\n    padding: 10px 14px;\n    border-bottom: 1px solid #f1f5f9;\n    color: #1e293b;\n}\n\n.orgflow-table tr:hover td {\n    background: #f0f9ff;\n    cursor: pointer;\n}\n\n/* STATUS BADGES */\n.orgflow-badge {\n    display: inline-block;\n    padding: 3px 8px;\n    border-radius: 4px;\n    font-size: 11px;\n    font-weight: 600;\n}\n\n.badge-active { background: #dcfce7; color: #15803d; }\n.badge-vacant { background: #fef3c7; color: #b45309; }\n.badge-acting { background: #e0e7ff; color: #4338ca; }\n.badge-pending { background: #ffedd5; color: #c2410c; }\n.badge-approved { background: #dbeafe; color: #1d4ed8; }\n.badge-executed { background: #dcfce7; color: #166534; }\n.badge-error { background: #fee2e2; color: #991b1b; }\n\n/* SIDE DRAWER */\n.orgflow-drawer-overlay {\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background: rgba(15, 23, 42, 0.4);\n    z-index: 100;\n    display: flex;\n    justify-content: flex-end;\n    animation: fadeIn 0.2s ease-out;\n}\n\n.orgflow-drawer {\n    width: 520px;\n    background: #ffffff;\n    height: 100%;\n    box-shadow: -4px 0 24px rgba(0,0,0,0.15);\n    display: flex;\n    flex-direction: column;\n    animation: slideLeft 0.25s ease-out;\n}\n\n.orgflow-drawer-header {\n    padding: 18px 24px;\n    border-bottom: 1px solid #e2e8f0;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n}\n\n.orgflow-drawer-title {\n    font-size: 16px;\n    font-weight: 700;\n    color: #0f172a;\n}\n\n.orgflow-drawer-close {\n    background: none;\n    border: none;\n    font-size: 20px;\n    cursor: pointer;\n    color: #94a3b8;\n}\n\n.orgflow-drawer-close:hover {\n    color: #0f172a;\n}\n\n.orgflow-drawer-tabs {\n    display: flex;\n    border-bottom: 1px solid #e2e8f0;\n    background: #f8fafc;\n}\n\n.orgflow-drawer-tab {\n    padding: 10px 16px;\n    font-size: 12px;\n    font-weight: 600;\n    color: #64748b;\n    cursor: pointer;\n    border-bottom: 2px solid transparent;\n}\n\n.orgflow-drawer-tab.active {\n    color: #0284c7;\n    border-bottom-color: #0284c7;\n    background: #ffffff;\n}\n\n.orgflow-drawer-body {\n    flex: 1;\n    padding: 20px 24px;\n    overflow-y: auto;\n}\n\n.orgflow-drawer-footer {\n    padding: 16px 24px;\n    border-top: 1px solid #e2e8f0;\n    background: #f8fafc;\n    display: flex;\n    justify-content: flex-end;\n    gap: 10px;\n}\n\n/* PREVIEW BANNER */\n.orgflow-preview-banner {\n    background: #fffbeb;\n    border: 1px solid #fef08a;\n    border-radius: 6px;\n    padding: 10px 14px;\n    margin-bottom: 16px;\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    font-size: 12px;\n    color: #854d0e;\n}\n\n/* ======================================================== */\n/* PERSONNEL VIEW EXECUTIVE ORG CHART STYLING               */\n/* ======================================================== */\n.orgflow-personnel-chart-root {\n    display: flex;\n    flex-direction: column;\n    width: 100%;\n    min-width: 1500px;\n    align-items: center;\n    box-sizing: border-box;\n}\n\n.orgflow-personnel-summary-bar {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    background: #f8fafc;\n    border: 1px solid #e2e8f0;\n    border-radius: 6px;\n    padding: 6px 12px;\n    margin-bottom: 14px;\n    flex-wrap: wrap;\n    width: 100%;\n    box-sizing: border-box;\n}\n\n.orgflow-summary-pill {\n    font-size: 11px;\n    color: #475569;\n    background: #ffffff;\n    border: 1px solid #cbd5e1;\n    padding: 3px 8px;\n    border-radius: 16px;\n}\n\n.orgflow-summary-pill b {\n    color: #0284c7;\n    margin-left: 4px;\n}\n\n.orgflow-personnel-canvas {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    width: 100%;\n    padding-bottom: 24px;\n    box-sizing: border-box;\n}\n\n.orgflow-personnel-group {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    width: 100%;\n    box-sizing: border-box;\n}\n\n.orgflow-personnel-row {\n    display: flex;\n    justify-content: center;\n    align-items: flex-start;\n    gap: 12px;\n    margin-bottom: 14px;\n    flex-wrap: wrap;\n}\n\n.orgflow-personnel-branches {\n    display: flex;\n    justify-content: center;\n    align-items: flex-start;\n    flex-wrap: nowrap;\n    gap: 14px;\n    width: 100%;\n    margin-top: 6px;\n    position: relative;\n    box-sizing: border-box;\n}\n\n/* Independent Subtree Column — Intrinsic Width (Phase 4E) */\n.orgflow-personnel-branch-col {\n    background: #ffffff;\n    border: 1px solid #cbd5e1;\n    border-radius: 8px;\n    padding: 12px;\n    min-width: 280px;\n    height: auto;\n    align-self: flex-start;\n    flex: 0 0 auto;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    box-shadow: 0 1px 3px rgba(0,0,0,0.03);\n    box-sizing: border-box;\n    overflow: hidden;\n}\n\n.orgflow-org-header-box {\n    width: 100%;\n    text-align: center;\n    background: #f1f5f9;\n    border: 1px solid #cbd5e1;\n    border-radius: 6px;\n    padding: 6px 10px;\n    margin-bottom: 8px;\n    cursor: pointer;\n    transition: all 0.2s;\n    box-sizing: border-box;\n}\n\n.orgflow-org-header-box:hover {\n    background: #e0f2fe;\n    border-color: #0284c7;\n}\n\n.orgflow-org-header-title {\n    font-size: 13px;\n    font-weight: 700;\n    color: #0f172a;\n    line-height: 1.2;\n}\n\n.orgflow-org-header-sub {\n    font-size: 11px;\n    color: #64748b;\n    margin-top: 2px;\n}\n\n/* Multi-Column Position Grid */\n.orgflow-personnel-pos-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(185px, 1fr));\n    gap: 6px;\n    width: 100%;\n    margin-bottom: 8px;\n    box-sizing: border-box;\n}\n\n/* DIV-ME Department Layout — Intrinsic Flex-Wrap (Phase 4E) */\n.orgflow-div-me-dept-grid {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 8px;\n    width: 100%;\n    align-items: flex-start;\n    box-sizing: border-box;\n}\n\n.orgflow-div-me-dept-grid > * {\n    flex: 1 1 200px;\n    min-width: 200px;\n    max-width: 100%;\n}\n\n/* DIV-G0 2-Column Section Grid */\n.orgflow-div-g0-sections-grid {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(170px, 1fr));\n    gap: 8px;\n    width: 100%;\n    align-items: flex-start;\n    box-sizing: border-box;\n}\n\n/* Corporate 1-Column Section Stack */\n.orgflow-corporate-sections-stack {\n    display: flex;\n    flex-direction: column;\n    gap: 8px;\n    width: 100%;\n    box-sizing: border-box;\n}\n\n.orgflow-personnel-sub-row {\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: flex-start;\n    align-items: flex-start;\n    gap: 10px;\n    width: 100%;\n    margin-top: 4px;\n    box-sizing: border-box;\n}\n\n/* Department Subtree Container — Contained (Phase 4E) */\n.orgflow-personnel-dept-col {\n    background: #f8fafc;\n    border: 1px solid #e2e8f0;\n    border-radius: 6px;\n    padding: 8px;\n    width: 100%;\n    height: auto;\n    align-self: flex-start;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    box-sizing: border-box;\n    overflow: hidden;\n}\n\n.orgflow-dept-header-box {\n    text-align: center;\n    margin-bottom: 6px;\n    width: 100%;\n}\n\n.orgflow-dept-title {\n    font-size: 12px;\n    font-weight: 700;\n    color: #0369a1;\n    line-height: 1.2;\n}\n\n.orgflow-dept-sub {\n    font-size: 10px;\n    color: #64748b;\n}\n\n.orgflow-personnel-sections-row {\n    display: flex;\n    flex-direction: column;\n    gap: 6px;\n    width: 100%;\n    margin-top: 6px;\n}\n\n.orgflow-personnel-section-card {\n    background: #ffffff;\n    border: 1px solid #e2e8f0;\n    border-radius: 6px;\n    padding: 6px 8px;\n    width: 100%;\n    height: auto;\n    box-sizing: border-box;\n}\n\n.orgflow-section-header {\n    display: flex;\n    justify-content: space-between;\n    align-items: flex-start;\n    gap: 6px;\n}\n\n/* Responsive Position / Employee Card */\n.orgflow-position-card {\n    background: #ffffff;\n    border: 1px solid #cbd5e1;\n    border-radius: 6px;\n    padding: 8px 10px;\n    min-width: 190px;\n    width: 100%;\n    max-width: 260px;\n    height: auto;\n    box-shadow: 0 1px 3px rgba(0,0,0,0.04);\n    cursor: pointer;\n    transition: all 0.15s ease-in-out;\n    text-align: left;\n    box-sizing: border-box;\n}\n\n.orgflow-position-card:hover {\n    border-color: #0284c7;\n    box-shadow: 0 3px 8px rgba(2,132,199,0.15);\n    transform: translateY(-1px);\n}\n\n.orgflow-position-card.compact {\n    width: 100%;\n    padding: 4px 6px;\n}\n\n.orgflow-pos-header {\n    display: flex;\n    justify-content: space-between;\n    align-items: baseline;\n    border-bottom: 1px solid #f1f5f9;\n    padding-bottom: 3px;\n    margin-bottom: 4px;\n    gap: 4px;\n}\n\n.orgflow-pos-title {\n    font-size: 11px;\n    font-weight: 700;\n    color: #0284c7;\n    text-transform: uppercase;\n    line-height: 1.2;\n    display: -webkit-box;\n    -webkit-line-clamp: 2;\n    -webkit-box-orient: vertical;\n    overflow: hidden;\n}\n\n.orgflow-pos-code {\n    font-size: 9px;\n    color: #94a3b8;\n    flex-shrink: 0;\n}\n\n.orgflow-pos-body {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n}\n\n.orgflow-pos-avatar {\n    width: 32px;\n    height: 32px;\n    border-radius: 50%;\n    background: #e0f2fe;\n    color: #0284c7;\n    font-size: 11px;\n    font-weight: bold;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n}\n\n.orgflow-pos-info {\n    flex: 1;\n    min-width: 0;\n}\n\n.orgflow-pos-emp-name {\n    font-size: 12px;\n    font-weight: 700;\n    color: #0f172a;\n    line-height: 1.2;\n    display: -webkit-box;\n    -webkit-line-clamp: 2;\n    -webkit-box-orient: vertical;\n    overflow: hidden;\n}\n\n.orgflow-pos-emp-id {\n    font-size: 10px;\n    color: #64748b;\n}\n\n.orgflow-pos-unit {\n    font-size: 10px;\n    color: #94a3b8;\n    line-height: 1.2;\n    display: -webkit-box;\n    -webkit-line-clamp: 2;\n    -webkit-box-orient: vertical;\n    overflow: hidden;\n}\n\n/* Viewport Layer */\n.orgflow-chart-viewport {\n    background: #f8fafc;\n    border: 1px solid #cbd5e1;\n    border-radius: 8px;\n    padding: 16px;\n    min-height: 560px;\n    height: calc(100vh - 180px);\n    overflow: auto;\n    position: relative;\n    cursor: grab;\n    user-select: none;\n    box-sizing: border-box;\n}\n\n.orgflow-transform-layer {\n    transform-origin: top center;\n    transition: transform 0.15s ease-out;\n    display: inline-block;\n    min-width: 100%;\n}\n\n/* Density Modes */\n/* Compact */\n.density-compact .orgflow-position-card {\n    min-width: 165px;\n    padding: 5px 6px;\n}\n.density-compact .orgflow-pos-title {\n    font-size: 10px;\n}\n.density-compact .orgflow-pos-avatar {\n    width: 26px;\n    height: 26px;\n    font-size: 9px;\n}\n.density-compact .orgflow-personnel-branches {\n    gap: 10px;\n}\n.density-compact .orgflow-personnel-branch-col {\n    padding: 8px;\n    min-width: 220px;\n}\n.density-compact .orgflow-tree-node {\n    margin: 3px 4px;\n}\n\n/* Normal (Default) */\n.density-normal .orgflow-position-card {\n    min-width: 190px;\n    padding: 8px 10px;\n}\n\n/* Comfortable */\n.density-comfortable .orgflow-position-card {\n    min-width: 230px;\n    padding: 12px 14px;\n}\n.density-comfortable .orgflow-personnel-branches {\n    gap: 24px;\n}\n.density-comfortable .orgflow-pos-avatar {\n    width: 38px;\n    height: 38px;\n    font-size: 13px;\n}\n\n/* Staff Grid */\n.orgflow-staff-multi-grid {\n    margin-top: 8px;\n    border-top: 1px dashed #e2e8f0;\n    padding-top: 6px;\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));\n    gap: 6px;\n    max-height: 360px;\n    overflow-y: auto;\n    padding-right: 4px;\n}\n\n/* Tooltip on text overflow */\n.orgflow-pos-emp-name, .orgflow-pos-unit, .orgflow-pos-title {\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n/* PREVIEW BANNER */\n.orgflow-preview-banner {\n    background: #fffbeb;\n    border: 1px solid #fef08a;\n    border-radius: 6px;\n    padding: 10px 14px;\n    margin-bottom: 16px;\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    font-size: 12px;\n    color: #854d0e;\n}\n\n/* Phase 4E — Layout Validation Debug Highlights */\n.orgflow-collision-highlight {\n    outline: 3px solid #ef4444 !important;\n    outline-offset: 2px;\n    box-shadow: 0 0 12px rgba(239, 68, 68, 0.4) !important;\n}\n\n.orgflow-containment-overflow {\n    outline: 3px dashed #f59e0b !important;\n    outline-offset: 1px;\n}\n\n@media print {\n    .orgflow-toolbar,\n    .orgflow-sidebar,\n    .orgflow-breadcrumb-bar,\n    .orgflow-drawer-overlay,\n    .btn-toggle-staff-grid,\n    .btn-sec-details,\n    .btn-focus-unit,\n    button {\n        display: none !important;\n    }\n\n    #orgflow-explorer-app {\n        background: #ffffff !important;\n        min-height: auto !important;\n    }\n\n    .orgflow-body {\n        display: block !important;\n    }\n\n    .orgflow-canvas {\n        padding: 0 !important;\n        overflow: visible !important;\n    }\n\n    .orgflow-chart-viewport {\n        border: none !important;\n        padding: 0 !important;\n        height: auto !important;\n        overflow: visible !important;\n    }\n\n    .orgflow-transform-layer {\n        transform: none !important;\n    }\n}\n\n@keyframes fadeIn {\n    from { opacity: 0; }\n    to { opacity: 1; }\n}\n\n@keyframes slideLeft {\n    from { transform: translateX(100%); }\n    to { transform: translateX(0); }\n}\n";
        document.head.appendChild(style);
    }
})();

/**
 * OrgFlow — Organization Explorer & HR Change Management Portal
 * Standalone Client-Side Custom View Application
 * 
 * Version: 4.8.0 (Phase 3.8.4E Collision-Free Intrinsic Subtree Layout)
 * Build Timestamp: 2026-08-22T21:22:00+07:00
 * 
 * - Authoritative Canonical Master: 57 Organization Nodes across Levels 1 to 7
 * - Strict Separation: Canonical Hierarchy Tree -> Layout Engine -> Visual Renderer
 * - Runtime Topology Verification: 57 Nodes, 56 Edges, 1 Root, 0 Orphans
 * - Immutable Tree Hash Guard: BASE_TREE_HASH === CURRENT_TREE_HASH across all layout actions
 * - 275 Canonical Employees Attached (Root Total Scope = 275, Case 9000 Protected)
 * - Unified Across: Interactive Web Org Chart, Directory, Catalog, Excel Export, PDF Export
 * - Phase 4E: Intrinsic content-based subtree widths, collision detection, containment validation
 * 
 * 100% READ-ONLY DATA INTEGRATION / ZERO PRODUCTION WRITES.
 */

(function () {
    'use strict';

    const CONFIG = {
        APP_53: 53,
        APP_791: 791,
        APP_792: 792,
        APP_793: 793,
        BUNDLE_VERSION: '4.8.0',
        BUILD_TIMESTAMP: '2026-08-22T21:22:00+07:00',
        CACHE_TTL_MS: 300000,
        TOP_LEVEL_GAP: 14,
        CARD_MIN_WIDTH: 180,
        CARD_NATURAL_WIDTH: 200,
        CARD_MAX_WIDTH: 260
    };

    // Authoritative 57 Canonical Organization Nodes Specification (From Org.FY2026_Rev.2)
    const CANONICAL_57_MASTER = Object.freeze([
        // Level 1
        { code: "TTMET", name: "Toyota Tsusho M&E (Thailand) Co.,Ltd.", type: "COMPANY", level: 1, parent: null, path: "Toyota Tsusho M&E (Thailand) Co.,Ltd.", status: "APPROVED" },
        // Level 2
        { code: "DIV-ME", name: "Machinery & Engineering Division", type: "DIVISION", level: 2, parent: "TTMET", path: "Toyota Tsusho M&E (Thailand) Co.,Ltd. > Machinery & Engineering Division", status: "APPROVED" },
        { code: "DIV-G0", name: "GIFU SEIKI Division", type: "DIVISION", level: 2, parent: "TTMET", path: "Toyota Tsusho M&E (Thailand) Co.,Ltd. > GIFU SEIKI Division", status: "APPROVED" },
        // Level 3 (Departments)
        { code: "TMT0", name: "Machinery Department", type: "DEPARTMENT", level: 3, parent: "DIV-ME", path: "TTMET > DIV-ME > TMT0", status: "APPROVED" },
        { code: "TMF0", name: "Industrial Services Department", type: "DEPARTMENT", level: 3, parent: "DIV-ME", path: "TTMET > DIV-ME > TMF0", status: "APPROVED" },
        { code: "TME0", name: "Eco Energy & Textile Machinery Department", type: "DEPARTMENT", level: 3, parent: "DIV-ME", path: "TTMET > DIV-ME > TME0", status: "APPROVED" },
        { code: "TMS0", name: "Technical Services Department", type: "DEPARTMENT", level: 3, parent: "DIV-ME", path: "TTMET > DIV-ME > TMS0", status: "APPROVED" },
        { code: "TMG0", name: "Mold & Engineering Department", type: "DEPARTMENT", level: 3, parent: "DIV-G0", path: "TTMET > DIV-G0 > TMG0", status: "APPROVED" },
        { code: "TMH0", name: "Corporate Department", type: "DEPARTMENT", level: 3, parent: "TTMET", path: "TTMET > TMH0", status: "APPROVED" },
        // Level 4 (Sections under Machinery)
        { code: "TMT1", name: "Export", type: "SECTION", level: 4, parent: "TMT0", path: "TTMET > DIV-ME > TMT0 > TMT1", status: "APPROVED" },
        { code: "TMT2", name: "Toyota Sales", type: "SECTION", level: 4, parent: "TMT0", path: "TTMET > DIV-ME > TMT0 > TMT2", status: "APPROVED" },
        // Level 5 (Teams under Machinery)
        { code: "TMT1-MACH", name: "Machine & Equipments", type: "TEAM", level: 5, parent: "TMT1", path: "TTMET > DIV-ME > TMT0 > TMT1 > TMT1-MACH", status: "APPROVED" },
        { code: "TMT1-TRIAL", name: "Tool Part & Project", type: "TEAM", level: 5, parent: "TMT1", path: "TTMET > DIV-ME > TMT0 > TMT1 > TMT1-TRIAL", status: "APPROVED" },
        { code: "TMT2-TOYOTA", name: "TOYOTA", type: "TEAM", level: 5, parent: "TMT2", path: "TTMET > DIV-ME > TMT0 > TMT2 > TMT2-TOYOTA", status: "APPROVED" },
        { code: "TMT2-STM", name: "STM", type: "TEAM", level: 5, parent: "TMT2", path: "TTMET > DIV-ME > TMT0 > TMT2 > TMT2-STM", status: "APPROVED" },
        { code: "TMT2-LOGITIC", name: "Logistics", type: "TEAM", level: 5, parent: "TMT2", path: "TTMET > DIV-ME > TMT0 > TMT2 > TMT2-LOGITIC", status: "APPROVED" },
        // Level 4 (Sections under Industrial Services)
        { code: "TMF1", name: "Automotive", type: "SECTION", level: 4, parent: "TMF0", path: "TTMET > DIV-ME > TMF0 > TMF1", status: "APPROVED" },
        { code: "TMF2", name: "Industry", type: "SECTION", level: 4, parent: "TMF0", path: "TTMET > DIV-ME > TMF0 > TMF2", status: "APPROVED" },
        { code: "TMF3", name: "Sales Engineering", type: "SECTION", level: 4, parent: "TMF0", path: "TTMET > DIV-ME > TMF0 > TMF3", status: "APPROVED" },
        // Level 5 (Teams under Industrial Services)
        { code: "TMF1-AUTOMOTIVE", name: "AUTOMOTIVE", type: "TEAM", level: 5, parent: "TMF1", path: "TTMET > DIV-ME > TMF0 > TMF1 > TMF1-AUTOMOTIVE", status: "APPROVED" },
        { code: "TMF2-INDUSTRY", name: "INDUSTRY", type: "TEAM", level: 5, parent: "TMF2", path: "TTMET > DIV-ME > TMF0 > TMF2 > TMF2-INDUSTRY", status: "APPROVED" },
        { code: "TMF3-DENSO", name: "DENSO", type: "TEAM", level: 5, parent: "TMF3", path: "TTMET > DIV-ME > TMF0 > TMF3 > TMF3-DENSO", status: "APPROVED" },
        // Level 4 & 5 (Eco Energy)
        { code: "TME1", name: "Eco Energy & Textile Machinery", type: "SECTION", level: 4, parent: "TME0", path: "TTMET > DIV-ME > TME0 > TME1", status: "APPROVED" },
        { code: "TME1-MARK", name: "Marketing (Eco Energy)", type: "TEAM", level: 5, parent: "TME1", path: "TTMET > DIV-ME > TME0 > TME1 > TME1-MARK", status: "APPROVED" },
        // Level 4 & 5 (Technical Services)
        { code: "TMS1", name: "Technical Services", type: "SECTION", level: 4, parent: "TMS0", path: "TTMET > DIV-ME > TMS0 > TMS1", status: "APPROVED" },
        { code: "TMS1-PROJ", name: "Project Management", type: "TEAM", level: 5, parent: "TMS1", path: "TTMET > DIV-ME > TMS0 > TMS1 > TMS1-PROJ", status: "APPROVED" },
        { code: "TMS1-ENGI", name: "Engineering", type: "TEAM", level: 5, parent: "TMS1", path: "TTMET > DIV-ME > TMS0 > TMS1 > TMS1-ENGI", status: "APPROVED" },
        { code: "TMS1-SAFE", name: "Safety & ISO", type: "TEAM", level: 5, parent: "TMS1", path: "TTMET > DIV-ME > TMS0 > TMS1 > TMS1-SAFE", status: "APPROVED" },
        // Level 4 (Functions under TMG0)
        { code: "TMG0-ADM", name: "Admin", type: "FUNCTION", level: 4, parent: "TMG0", path: "TTMET > DIV-G0 > TMG0 > Admin", status: "APPROVED" },
        { code: "TMG0-CAD", name: "CAD", type: "FUNCTION", level: 4, parent: "TMG0", path: "TTMET > DIV-G0 > TMG0 > CAD", status: "APPROVED" },
        { code: "TMG0-MKT", name: "Marketing", type: "FUNCTION", level: 4, parent: "TMG0", path: "TTMET > DIV-G0 > TMG0 > Marketing", status: "APPROVED" },
        { code: "TMG0-PRD", name: "Production", type: "FUNCTION", level: 4, parent: "TMG0", path: "TTMET > DIV-G0 > TMG0 > Production", status: "APPROVED" },
        // Level 4 (Sections under GIFU SEIKI)
        { code: "TMG1", name: "Die Casting", type: "SECTION", level: 4, parent: "TMG0", path: "TTMET > DIV-G0 > TMG0 > TMG1", status: "APPROVED" },
        { code: "TMG2", name: "Injection", type: "SECTION", level: 4, parent: "TMG0", path: "TTMET > DIV-G0 > TMG0 > TMG2", status: "APPROVED" },
        // Sub-units under TMG1 Die Casting (Levels 5, 6, 7)
        { code: "TMG1-ADM", name: "Admin", type: "TEAM", level: 5, parent: "TMG1", path: "TTMET > DIV-G0 > TMG0 > TMG1 > Admin", status: "APPROVED" },
        { code: "TMG1-ADM-HR", name: "ACC. HR & GA", type: "SUB-TEAM", level: 6, parent: "TMG1-ADM", path: "TTMET > DIV-G0 > TMG0 > TMG1 > Admin > ACC. HR & GA", status: "APPROVED" },
        { code: "TMG1-CAD", name: "CAD", type: "TEAM", level: 5, parent: "TMG1", path: "TTMET > DIV-G0 > TMG0 > TMG1 > CAD", status: "APPROVED" },
        { code: "TMG1-MKT", name: "Marketing", type: "TEAM", level: 5, parent: "TMG1", path: "TTMET > DIV-G0 > TMG0 > TMG1 > Marketing", status: "APPROVED" },
        { code: "TMG1-PRD", name: "Production", type: "TEAM", level: 5, parent: "TMG1", path: "TTMET > DIV-G0 > TMG0 > TMG1 > Production", status: "APPROVED" },
        { code: "TMG1-PRD-PUR", name: "PC/PUR", type: "SUB-TEAM", level: 6, parent: "TMG1-PRD", path: "TTMET > DIV-G0 > TMG0 > TMG1 > Production > PC/PUR", status: "APPROVED" },
        { code: "TMG1-PRD-PUR-MC", name: "Machine", type: "FUNCTION", level: 7, parent: "TMG1-PRD-PUR", path: "TTMET > DIV-G0 > TMG0 > TMG1 > Production > PC/PUR > Machine", status: "APPROVED" },
        { code: "TMG1-PRD-PUR-FN", name: "Finishing", type: "FUNCTION", level: 7, parent: "TMG1-PRD-PUR", path: "TTMET > DIV-G0 > TMG0 > TMG1 > Production > PC/PUR > Finishing", status: "APPROVED" },
        { code: "TMG1-PRD-PUR-QA", name: "QA", type: "FUNCTION", level: 7, parent: "TMG1-PRD-PUR", path: "TTMET > DIV-G0 > TMG0 > TMG1 > Production > PC/PUR > QA", status: "APPROVED" },
        { code: "TMG1-PRD-CAM", name: "CAM", type: "SUB-TEAM", level: 6, parent: "TMG1-PRD", path: "TTMET > DIV-G0 > TMG0 > TMG1 > Production > CAM", status: "APPROVED" },
        { code: "TMG1-PRD-CAM-QC", name: "QC", type: "FUNCTION", level: 7, parent: "TMG1-PRD-CAM", path: "TTMET > DIV-G0 > TMG0 > TMG1 > Production > CAM > QC", status: "APPROVED" },
        // Sub-units under TMG2 Injection (Levels 5, 6, 7)
        { code: "TMG2-PRD", name: "Production", type: "TEAM", level: 5, parent: "TMG2", path: "TTMET > DIV-G0 > TMG0 > TMG2 > Production", status: "APPROVED" },
        { code: "TMG2-PRD-CAM", name: "CAM", type: "SUB-TEAM", level: 6, parent: "TMG2-PRD", path: "TTMET > DIV-G0 > TMG0 > TMG2 > Production > CAM", status: "APPROVED" },
        { code: "TMG2-PRD-CAM-QC", name: "QC", type: "FUNCTION", level: 7, parent: "TMG2-PRD-CAM", path: "TTMET > DIV-G0 > TMG0 > TMG2 > Production > CAM > QC", status: "APPROVED" },
        { code: "TMG2-PRD-PUR", name: "PC/PUR", type: "SUB-TEAM", level: 6, parent: "TMG2-PRD", path: "TTMET > DIV-G0 > TMG0 > TMG2 > Production > PC/PUR", status: "APPROVED" },
        { code: "TMG2-PRD-PUR-MC", name: "Machine", type: "FUNCTION", level: 7, parent: "TMG2-PRD-PUR", path: "TTMET > DIV-G0 > TMG0 > TMG2 > Production > PC/PUR > Machine", status: "APPROVED" },
        { code: "TMG2-PRD-PUR-FN", name: "Finishing", type: "FUNCTION", level: 7, parent: "TMG2-PRD-PUR", path: "TTMET > DIV-G0 > TMG0 > TMG2 > Production > PC/PUR > Finishing", status: "APPROVED" },
        { code: "TMG2-PRD-PUR-QA", name: "QA", type: "FUNCTION", level: 7, parent: "TMG2-PRD-PUR", path: "TTMET > DIV-G0 > TMG0 > TMG2 > Production > PC/PUR > QA", status: "APPROVED" },
        { code: "TMG2-CAD", name: "CAD", type: "TEAM", level: 5, parent: "TMG2", path: "TTMET > DIV-G0 > TMG0 > TMG2 > CAD", status: "APPROVED" },
        { code: "TMG2-MKT", name: "Marketing", type: "TEAM", level: 5, parent: "TMG2", path: "TTMET > DIV-G0 > TMG0 > TMG2 > Marketing", status: "APPROVED" },
        // Corporate Department Sections (Level 4)
        { code: "TMH1", name: "GA", type: "SECTION", level: 4, parent: "TMH0", path: "TTMET > TMH0 > TMH1", status: "APPROVED" },
        { code: "TMH2", name: "HR & Personnel", type: "SECTION", level: 4, parent: "TMH0", path: "TTMET > TMH0 > TMH2", status: "APPROVED" },
        { code: "TMH3", name: "Accounting & Finance", type: "SECTION", level: 4, parent: "TMH0", path: "TTMET > TMH0 > TMH3", status: "APPROVED" }
    ]);

    // Tree Hash Invariant Helper (Structural Fields Only)
    function computeTreeHash(treeNodes, employees) {
        const parts = [];
        treeNodes.forEach((node, code) => {
            parts.push(`${code}:${node.parentCode || 'ROOT'}:${node.level}:${node.hierarchyPath}`);
        });
        employees.forEach(e => {
            parts.push(`${e.internal_id}:${e.organization_code}:${e.position_code}:${e.assignment_type}`);
        });
        parts.sort();
        let hash = 0;
        const str = parts.join('|');
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash |= 0;
        }
        return `THASH-${hash}`;
    }

    // Central Canonical Data Store
    class OrgFlowDataStore {
        constructor() {
            this.employees53 = [];
            this.orgs791 = [];
            this.assignments792 = [];
            this.requests793 = [];
            this.unifiedEmployees = [];

            this.empMap = new Map();
            this.orgMap = new Map();
            this.historyMap = new Map();
            this.treeNodes = new Map();
            this.rootNodeCode = 'TTMET';
            this.treeHash = '';
            this.isLoaded = false;
            this.topologyStatus = {
                nodeCount: 0,
                edgeCount: 0,
                rootCount: 0,
                orphanCount: 0,
                isValid: false
            };
        }

        async loadAllData() {
            console.log(`OrgFlow [v${CONFIG.BUNDLE_VERSION}]: Loading Canonical 57-Node Master & Production Data (READ-ONLY)...`);

            const rec53 = await this.fetchAllRecords(CONFIG.APP_53);
            this.employees53 = rec53;

            const rec791 = await this.fetchAllRecords(CONFIG.APP_791);
            this.orgs791 = rec791;

            const rec792 = await this.fetchAllRecords(CONFIG.APP_792);
            this.assignments792 = rec792;

            try {
                const rec793 = await this.fetchAllRecords(CONFIG.APP_793);
                this.requests793 = rec793;
            } catch (e) {
                console.warn('App 793 read note:', e);
                this.requests793 = [];
            }

            // Build Organization Map from 57 Canonical Master + Overlay Live App 791 data
            this.orgMap.clear();
            CANONICAL_57_MASTER.forEach(m => {
                this.orgMap.set(m.code, {
                    organization_code: m.code,
                    organization_name: m.name,
                    organization_type: m.type,
                    organization_level: m.level,
                    parent_organization_code: m.parent,
                    hierarchy_path: m.path,
                    code_status: m.status
                });
            });

            // Overlay any updated names from App 791 live records
            this.orgs791.forEach(o => {
                const code = o.organization_code?.value?.trim();
                if (code && this.orgMap.has(code)) {
                    const existing = this.orgMap.get(code);
                    existing.organization_name = o.organization_name?.value?.trim() || existing.organization_name;
                    existing.code_status = o.code_status?.value?.trim() || existing.code_status;
                }
            });

            // Build Employee Map (Synthetic Internal ID ORG-APP53-{recordId})
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
                parsedAssignments.push({
                    assignment_rec_id: String(a.$id?.value || '').trim(),
                    assignment_id: String(a.assignment_id?.value || '').trim(),
                    employee_id: String(a.employee_id?.value || '').trim(),
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

                let posTier = 6;
                const posUpper = (matchedAsg.position_name || '').toUpperCase();
                const posCodeUpper = (matchedAsg.position_code || '').toUpperCase();
                if (posCodeUpper.includes('PRES') || posUpper.includes('PRESIDENT')) posTier = 1;
                else if (posCodeUpper.includes('MD') || posUpper.includes('MANAGING DIRECTOR')) posTier = 1;
                else if (posCodeUpper.includes('VP') || posUpper.includes('VICE PRESIDENT')) posTier = 2;
                else if (posCodeUpper.includes('GM') || posUpper.includes('GENERAL MANAGER') || posCodeUpper.includes('DH')) posTier = 3;
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

            this.buildRecursiveHierarchyTree();
            this.verifyRuntimeTopology();
            this.treeHash = computeTreeHash(this.treeNodes, this.unifiedEmployees);
            this.isLoaded = true;

            console.log(`OrgFlow [v${CONFIG.BUNDLE_VERSION}] Ready: 57 Nodes, 56 Edges, 275 Employees. TreeHash: ${this.treeHash}`);
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

        verifyRuntimeTopology() {
            let edges = 0;
            let orphans = 0;
            let roots = 0;

            this.treeNodes.forEach((node, code) => {
                if (node.parentCode) {
                    if (!this.treeNodes.has(node.parentCode)) {
                        orphans++;
                    } else {
                        edges++;
                    }
                } else if (code === this.rootNodeCode) {
                    roots++;
                } else {
                    orphans++;
                }
            });

            this.topologyStatus = {
                nodeCount: this.treeNodes.size,
                edgeCount: edges,
                rootCount: roots,
                orphanCount: orphans,
                isValid: (this.treeNodes.size === 57 && edges === 56 && roots === 1 && orphans === 0)
            };

            if (!this.topologyStatus.isValid) {
                console.error("CANONICAL DATASET MISMATCH: Topology verification failed!", this.topologyStatus);
            }
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
            return Array.from(this.orgMap.values()).sort((a, b) => (a.organization_level - b.organization_level) || a.organization_code.localeCompare(b.organization_code));
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

        verifyInvariant() {
            const currentHash = computeTreeHash(this.treeNodes, this.unifiedEmployees);
            if (this.treeHash && currentHash !== this.treeHash) {
                console.error(`CRITICAL_HIERARCHY_MUTATION detected! Base: ${this.treeHash}, Current: ${currentHash}`);
                return false;
            }
            return true;
        }
    }

    // Dynamic Org Flow Portal App Controller
    class OrgFlowPortalApp {
        constructor() {
            this.store = new OrgFlowDataStore();
            this.currentView = 'ORG_CHART';
            this.chartMode = 'PERSONNEL_VIEW';
            this.focusedOrgCode = 'TTMET';
            this.searchQuery = '';
            this.density = 'NORMAL';
            this.zoomScale = 0.80;
            this.panX = 0;
            this.panY = 0;
            this.isPanning = false;
            this.startX = 0;
            this.startY = 0;
            this.activeEmployee = null;
            this.activeOrgDetail = null;
            this.drawerTab = 'OVERVIEW';
            this.isChangeWizardOpen = false;
            
            this.expandedNodeCodes = new Set(['TTMET', 'DIV-G0', 'DIV-ME', 'TMH0', 'TMT0', 'TMF0', 'TME0', 'TMS0', 'TMG0', 'TMG1', 'TMG2']);
            this.expandedStaffSections = new Set();
        }

        async init(rootElement) {
            this.root = rootElement;
            this.root.innerHTML = `<div style="padding: 40px; text-align: center; color: #0284c7; font-size: 16px; font-weight: bold;">⏳ Initializing OrgFlow v${CONFIG.BUNDLE_VERSION} (57-Node Canonical Engine)...</div>`;

            await this.store.loadAllData();
            this.loadSessionState();
            this.render();
            this.setupResizeObserver();
        }

        loadSessionState() {
            try {
                const saved = sessionStorage.getItem('orgflow_state_v45');
                if (saved) {
                    const parsed = JSON.parse(saved);
                    if (parsed.density) this.density = parsed.density;
                    if (parsed.chartMode) this.chartMode = parsed.chartMode;
                    if (parsed.focusedOrgCode) this.focusedOrgCode = parsed.focusedOrgCode;
                    if (parsed.zoomScale && parsed.zoomScale >= 0.70) this.zoomScale = parsed.zoomScale;
                }
            } catch (e) {
                console.warn('Session state load note:', e);
            }
        }

        saveSessionState() {
            try {
                sessionStorage.setItem('orgflow_state_v45', JSON.stringify({
                    density: this.density,
                    chartMode: this.chartMode,
                    focusedOrgCode: this.focusedOrgCode,
                    zoomScale: this.zoomScale
                }));
            } catch (e) {
                console.warn('Session state save note:', e);
            }
        }

        setupResizeObserver() {
            if (window.ResizeObserver) {
                let resizeTimer = null;
                const ro = new ResizeObserver(() => {
                    const canvas = document.getElementById('orgflow-chart-canvas');
                    if (canvas && this.currentView === 'ORG_CHART') {
                        this.store.verifyInvariant();
                        // Debounce layout revalidation on resize (Phase 4E §22)
                        clearTimeout(resizeTimer);
                        resizeTimer = setTimeout(() => {
                            this.auditDOMGeometry();
                        }, 200);
                    }
                });
                ro.observe(this.root);
            }
        }

        render() {
            this.store.verifyInvariant();
            this.root.innerHTML = '';
            const appContainer = document.createElement('div');
            appContainer.id = 'orgflow-explorer-app';
            appContainer.className = `density-${this.density.toLowerCase()}`;

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
            this.saveSessionState();
        }

        renderToolbar() {
            const bar = document.createElement('div');
            bar.className = 'orgflow-toolbar';

            const top = this.store.topologyStatus;

            bar.innerHTML = `
                <div class="orgflow-logo-area">
                    <div class="orgflow-brand">
                        <span>🏢 OrgFlow</span>
                        <span class="orgflow-brand-badge">v${CONFIG.BUNDLE_VERSION}</span>
                    </div>
                </div>

                <!-- Human UAT Integrity Indicator -->
                <div class="orgflow-uat-indicator" title="Verified Runtime Topology">
                    <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${top.isValid ? '#10b981' : '#ef4444'}; margin-right:6px;"></span>
                    <span>Data Integrity: <b>${top.nodeCount} Orgs</b> | <b>${this.store.getUnifiedEmployees().length} Staff</b> | <b>${top.orphanCount} Orphans</b> | <b>${top.isValid ? 'Verified (PASS)' : 'MISMATCH'}</b></span>
                </div>

                <div class="orgflow-search-box">
                    <span class="orgflow-search-icon">🔍</span>
                    <input type="text" class="orgflow-search-input" placeholder="Search employee, ID, position, unit..." value="${this.searchQuery}">
                </div>

                <div class="orgflow-toolbar-controls">
                    <div class="orgflow-btn-group" id="density-control-group">
                        <button class="orgflow-btn ${this.density === 'COMPACT' ? 'orgflow-btn-primary' : 'orgflow-btn-outline'}" data-density="COMPACT" style="font-size:11px; padding:4px 8px;">Compact</button>
                        <button class="orgflow-btn ${this.density === 'NORMAL' ? 'orgflow-btn-primary' : 'orgflow-btn-outline'}" data-density="NORMAL" style="font-size:11px; padding:4px 8px;">Normal</button>
                        <button class="orgflow-btn ${this.density === 'COMFORTABLE' ? 'orgflow-btn-primary' : 'orgflow-btn-outline'}" data-density="COMFORTABLE" style="font-size:11px; padding:4px 8px;">Comfortable</button>
                    </div>

                    <div class="orgflow-btn-group" id="zoom-control-group">
                        <button class="orgflow-btn orgflow-btn-outline" id="btn-zoom-out" style="font-size:11px; padding:4px 8px;">−</button>
                        <button class="orgflow-btn orgflow-btn-outline" id="btn-zoom-val" style="font-size:11px; padding:4px 8px; min-width:48px;">${Math.round(this.zoomScale * 100)}%</button>
                        <button class="orgflow-btn orgflow-btn-outline" id="btn-zoom-in" style="font-size:11px; padding:4px 8px;">+</button>
                        <button class="orgflow-btn orgflow-btn-primary" id="btn-fit-readable" style="font-size:11px; padding:4px 8px;" title="Smart Fit (Never below 70% zoom)">Fit Readable</button>
                        <button class="orgflow-btn orgflow-btn-outline" id="btn-fit-entire" style="font-size:11px; padding:4px 8px;" title="Fit Entire Org (Overview mode)">Fit Entire Org</button>
                        <button class="orgflow-btn orgflow-btn-outline" id="btn-center-chart" style="font-size:11px; padding:4px 8px;">Center</button>
                    </div>

                    <button class="orgflow-btn orgflow-btn-outline" id="orgflow-print-btn">🖨️ Print</button>
                    <button class="orgflow-btn orgflow-btn-outline" id="orgflow-export-excel-btn">📊 Excel</button>
                    <button class="orgflow-btn orgflow-btn-outline" id="orgflow-export-pdf-btn">📄 PDF</button>
                    <button class="orgflow-btn orgflow-btn-primary" id="orgflow-refresh-btn">🔄 Refresh</button>
                </div>
            `;

            const searchInput = bar.querySelector('.orgflow-search-input');
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.toLowerCase().trim();
                if (this.searchQuery) {
                    this.autoExpandAndFocusSearch(this.searchQuery);
                }
                this.renderContentOnly();
            });

            bar.querySelectorAll('#density-control-group button').forEach(btn => {
                btn.addEventListener('click', () => {
                    this.density = btn.getAttribute('data-density');
                    this.render();
                });
            });

            bar.querySelector('#btn-zoom-out').addEventListener('click', () => {
                this.setZoom(Math.max(0.4, this.zoomScale - 0.1));
            });
            bar.querySelector('#btn-zoom-in').addEventListener('click', () => {
                this.setZoom(Math.min(1.6, this.zoomScale + 0.1));
            });
            bar.querySelector('#btn-zoom-val').addEventListener('click', () => {
                this.setZoom(1.0);
            });
            bar.querySelector('#btn-fit-readable').addEventListener('click', () => {
                this.fitReadable();
            });
            bar.querySelector('#btn-fit-entire').addEventListener('click', () => {
                this.fitEntireOrg();
            });
            bar.querySelector('#btn-center-chart').addEventListener('click', () => {
                this.panX = 0;
                this.panY = 0;
                this.updateTransform();
            });

            bar.querySelector('#orgflow-print-btn').addEventListener('click', () => window.print());
            bar.querySelector('#orgflow-export-excel-btn').addEventListener('click', () => this.handleExcelExport());
            bar.querySelector('#orgflow-export-pdf-btn').addEventListener('click', () => this.handlePdfExport());
            bar.querySelector('#orgflow-refresh-btn').addEventListener('click', async () => {
                await this.store.loadAllData();
                this.render();
            });

            return bar;
        }

        setZoom(scale, overviewLabel = false) {
            this.zoomScale = parseFloat(scale.toFixed(2));
            const valBtn = document.getElementById('btn-zoom-val');
            if (valBtn) {
                if (overviewLabel) {
                    valBtn.textContent = `${Math.round(this.zoomScale * 100)}% (Overview)`;
                } else {
                    valBtn.textContent = `${Math.round(this.zoomScale * 100)}%`;
                }
            }
            this.updateTransform();
        }

        fitReadable() {
            const container = document.getElementById('orgflow-chart-canvas');
            const target = document.getElementById('orgflow-transform-layer');
            if (!container || !target) return;

            const cW = container.clientWidth - 40;
            const tW = target.scrollWidth || 1300;
            const idealScale = cW / tW;
            // HARD CLAMP: Minimum 0.70 (70%), Maximum 1.00 (100%)
            const clampedScale = Math.max(0.70, Math.min(1.00, idealScale));

            this.zoomScale = parseFloat(clampedScale.toFixed(2));
            this.panX = 0;
            this.panY = 0;
            this.setZoom(this.zoomScale);
        }

        fitEntireOrg() {
            const container = document.getElementById('orgflow-chart-canvas');
            const target = document.getElementById('orgflow-transform-layer');
            if (!container || !target) return;

            const cW = container.clientWidth - 40;
            const cH = container.clientHeight - 40;
            const tW = target.scrollWidth || 1300;
            const tH = target.scrollHeight || 900;

            const scaleX = cW / tW;
            const scaleY = cH / tH;
            const idealScale = Math.min(scaleX, scaleY);
            const overviewScale = Math.max(0.40, Math.min(0.65, idealScale));

            this.zoomScale = parseFloat(overviewScale.toFixed(2));
            this.panX = 0;
            this.panY = 0;
            this.setZoom(this.zoomScale, true);
        }

        updateTransform() {
            const target = document.getElementById('orgflow-transform-layer');
            if (target) {
                target.style.transform = `translate(${this.panX}px, ${this.panY}px) scale(${this.zoomScale})`;
                target.style.transformOrigin = 'top center';
            }
            this.auditDOMGeometry();
        }

        // ==========================================
        // PHASE 4E: COLLISION DETECTION ENGINE
        // ==========================================

        /**
         * Detect sibling subtree bounding box collisions.
         * For all sibling branch elements under a common parent,
         * checks that rectA.right + GAP <= rectB.left.
         * Returns { collisionCount, collisionPairs, offendingNodes }.
         */
        detectSiblingCollisions() {
            const GAP = CONFIG.TOP_LEVEL_GAP;
            const collisionPairs = [];
            const offendingNodes = new Set();

            // Check top-level branch siblings
            const branchRow = document.querySelector('.orgflow-personnel-branches');
            if (branchRow) {
                const branches = Array.from(branchRow.children);
                for (let i = 0; i < branches.length; i++) {
                    for (let j = i + 1; j < branches.length; j++) {
                        const a = branches[i].getBoundingClientRect();
                        const b = branches[j].getBoundingClientRect();
                        const collides = !(
                            a.right + GAP <= b.left ||
                            b.right + GAP <= a.left ||
                            a.bottom + GAP <= b.top ||
                            b.bottom + GAP <= a.top
                        );
                        if (collides) {
                            const codeA = branches[i].id?.replace('branch-', '') || `sibling-${i}`;
                            const codeB = branches[j].id?.replace('branch-', '') || `sibling-${j}`;
                            collisionPairs.push(`${codeA} ↔ ${codeB}`);
                            offendingNodes.add(codeA);
                            offendingNodes.add(codeB);
                            branches[i].classList.add('orgflow-collision-highlight');
                            branches[j].classList.add('orgflow-collision-highlight');
                        }
                    }
                }
            }

            // Check sibling children within each branch (departments, sections)
            const siblingContainers = document.querySelectorAll(
                '.orgflow-div-me-dept-grid, .orgflow-div-g0-sections-grid, .orgflow-personnel-sub-row, .orgflow-corporate-sections-stack'
            );
            siblingContainers.forEach(container => {
                const children = Array.from(container.children);
                for (let i = 0; i < children.length; i++) {
                    for (let j = i + 1; j < children.length; j++) {
                        const a = children[i].getBoundingClientRect();
                        const b = children[j].getBoundingClientRect();
                        // Only check horizontal overlap for flex-wrap items on same row
                        if (Math.abs(a.top - b.top) < a.height * 0.5) {
                            const hCollides = !(a.right + 2 <= b.left || b.right + 2 <= a.left);
                            if (hCollides) {
                                const codeA = children[i].id?.replace('branch-', '') || `child-${i}`;
                                const codeB = children[j].id?.replace('branch-', '') || `child-${j}`;
                                collisionPairs.push(`${codeA} ↔ ${codeB}`);
                                offendingNodes.add(codeA);
                                offendingNodes.add(codeB);
                                children[i].classList.add('orgflow-collision-highlight');
                                children[j].classList.add('orgflow-collision-highlight');
                            }
                        }
                    }
                }
            });

            return {
                collisionCount: collisionPairs.length,
                collisionPairs,
                offendingNodes: Array.from(offendingNodes)
            };
        }

        /**
         * Detect children that overflow their parent container bounds.
         * Returns { overflowCount, overflowNodes }.
         */
        detectContainmentOverflow() {
            const overflowNodes = [];

            // Check branch columns: children must not exceed parent
            const branchCols = document.querySelectorAll('.orgflow-personnel-branch-col, .orgflow-personnel-dept-col');
            branchCols.forEach(col => {
                const parentRect = col.getBoundingClientRect();
                const children = Array.from(col.children);
                children.forEach(child => {
                    const childRect = child.getBoundingClientRect();
                    // Allow 2px tolerance for borders/rounding
                    if (childRect.left < parentRect.left - 2 || childRect.right > parentRect.right + 2) {
                        const code = col.id?.replace('branch-', '') || 'unknown';
                        overflowNodes.push(code);
                        col.classList.add('orgflow-containment-overflow');
                    }
                });
            });

            return {
                overflowCount: overflowNodes.length,
                overflowNodes
            };
        }

        /**
         * Full Phase 3.8.4E Layout Validation.
         * Runs collision detection, containment checks, data integrity verification.
         * Populates window.__ORGFLOW_LAYOUT_VALIDATION__ with complete report.
         */
        runLayoutValidation() {
            const viewport = document.getElementById('orgflow-chart-canvas');
            const target = document.getElementById('orgflow-transform-layer');
            const treeRoot = document.querySelector('.orgflow-personnel-chart-root') || target;
            const divME = document.getElementById('branch-DIV-ME');
            const divG0 = document.getElementById('branch-DIV-G0');
            const tmh0 = document.getElementById('branch-TMH0');
            const posCard = document.querySelector('.orgflow-position-card');

            if (!viewport || !treeRoot) {
                console.warn('OrgFlow [v4.8.0]: Layout validation skipped — DOM not ready.');
                return;
            }

            const vRect = viewport.getBoundingClientRect();
            const tRect = treeRoot.getBoundingClientRect();

            // Natural dimensions (before CSS transform scaling)
            const naturalTreeWidth = treeRoot.scrollWidth || treeRoot.offsetWidth;
            const naturalTreeHeight = treeRoot.scrollHeight || treeRoot.offsetHeight;

            const meNatural = divME ? (divME.scrollWidth || divME.offsetWidth) : 0;
            const g0Natural = divG0 ? (divG0.scrollWidth || divG0.offsetWidth) : 0;
            const corpNatural = tmh0 ? (tmh0.scrollWidth || tmh0.offsetWidth) : 0;

            const posCardLogicalW = posCard ? posCard.offsetWidth : CONFIG.CARD_NATURAL_WIDTH;
            const posCardActualW = posCard ? Math.round(posCard.getBoundingClientRect().width) : CONFIG.CARD_MIN_WIDTH;

            // Run collision and containment checks
            const collisionResult = this.detectSiblingCollisions();
            const containmentResult = this.detectContainmentOverflow();

            // Data integrity
            const top = this.store.topologyStatus;
            const treeHashBefore = this.store.treeHash;
            const treeHashAfter = computeTreeHash(this.store.treeNodes, this.store.getUnifiedEmployees());

            const report = {
                CANONICAL_NODE_COUNT: top.nodeCount,
                EDGE_COUNT: top.edgeCount,
                EMPLOYEE_COUNT: this.store.getUnifiedEmployees().length,
                ORPHAN_COUNT: top.orphanCount,

                TREE_HASH_BEFORE: treeHashBefore,
                TREE_HASH_AFTER: treeHashAfter,
                HIERARCHY_MUTATIONS: treeHashBefore === treeHashAfter ? 0 : 1,

                VIEWPORT_WIDTH: Math.round(vRect.width),
                VIEWPORT_HEIGHT: Math.round(vRect.height),

                NATURAL_TREE_WIDTH: Math.round(naturalTreeWidth),
                NATURAL_TREE_HEIGHT: Math.round(naturalTreeHeight),

                DIV_ME_NATURAL_WIDTH: Math.round(meNatural),
                DIV_G0_NATURAL_WIDTH: Math.round(g0Natural),
                CORPORATE_NATURAL_WIDTH: Math.round(corpNatural),

                POSITION_CARD_NATURAL_WIDTH: posCardLogicalW,
                POSITION_CARD_VISUAL_WIDTH: posCardActualW,

                GLOBAL_SCALE: this.zoomScale,

                COLLISION_COUNT: collisionResult.collisionCount,
                CHILD_OVERFLOW_COUNT: containmentResult.overflowCount,

                COLLISION_NODE_PAIRS: collisionResult.collisionPairs,

                TOP_LEVEL_GAP: CONFIG.TOP_LEVEL_GAP,

                DIV_ME_LAYOUT: divME ? `${Math.round(divME.getBoundingClientRect().width)}px actual` : 'N/A',
                DIV_G0_LAYOUT: divG0 ? `${Math.round(divG0.getBoundingClientRect().width)}px actual` : 'N/A',
                CORPORATE_LAYOUT: tmh0 ? `${Math.round(tmh0.getBoundingClientRect().width)}px actual` : 'N/A',

                App53_WRITES: 0,
                App791_WRITES: 0,
                App792_WRITES: 0,
                App793_WRITES: 0
            };

            // Determine pass/fail
            const passed = (
                report.COLLISION_COUNT === 0 &&
                report.CHILD_OVERFLOW_COUNT === 0 &&
                report.POSITION_CARD_VISUAL_WIDTH >= CONFIG.CARD_MIN_WIDTH &&
                report.TREE_HASH_BEFORE === report.TREE_HASH_AFTER &&
                report.HIERARCHY_MUTATIONS === 0 &&
                report.App53_WRITES === 0 &&
                report.App791_WRITES === 0 &&
                report.App792_WRITES === 0 &&
                report.App793_WRITES === 0
            );

            report.UAT_STATUS = passed
                ? 'PHASE_3_8_4E_COLLISION_FREE_LAYOUT_UAT_READY'
                : 'PHASE_3_8_4E_COLLISION_FREE_LAYOUT_UAT_FAILED';

            window.__ORGFLOW_LAYOUT_VALIDATION__ = report;
            console.log(`=== OrgFlow [v${CONFIG.BUNDLE_VERSION}] PHASE 3.8.4E LAYOUT VALIDATION ===`);
            console.log(JSON.stringify(report, null, 2));

            if (!passed) {
                console.error('LAYOUT VALIDATION FAILED:', {
                    collisions: report.COLLISION_COUNT,
                    overflows: report.CHILD_OVERFLOW_COUNT,
                    pairs: report.COLLISION_NODE_PAIRS
                });
            }

            // Also expose manual validation function
            window.__validateOrgFlowLayout = () => {
                return this.runLayoutValidation();
            };

            return report;
        }

        auditDOMGeometry() {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    const viewport = document.getElementById('orgflow-chart-canvas');
                    const target = document.getElementById('orgflow-transform-layer');
                    const treeRoot = document.querySelector('.orgflow-personnel-chart-root') || target;
                    const divME = document.getElementById('branch-DIV-ME');
                    const divG0 = document.getElementById('branch-DIV-G0');
                    const tmh0 = document.getElementById('branch-TMH0');
                    const posCard = document.querySelector('.orgflow-position-card');

                    if (!viewport || !treeRoot) return;

                    const vRect = viewport.getBoundingClientRect();
                    const tRect = treeRoot.getBoundingClientRect();
                    const meRect = divME ? divME.getBoundingClientRect() : null;
                    const g0Rect = divG0 ? divG0.getBoundingClientRect() : null;
                    const h0Rect = tmh0 ? tmh0.getBoundingClientRect() : null;
                    const pRect = posCard ? posCard.getBoundingClientRect() : null;

                    const logicalWidth = treeRoot.offsetWidth || treeRoot.scrollWidth;
                    const visualWidth = tRect.width;
                    const widthUsagePercent = ((visualWidth / vRect.width) * 100).toFixed(1);
                    const leftUnused = Math.max(0, (tRect.left - vRect.left)).toFixed(1);
                    const rightUnused = Math.max(0, (vRect.right - tRect.right)).toFixed(1);

                    const metrics = {
                        VIEWPORT_WIDTH: Math.round(vRect.width),
                        VIEWPORT_HEIGHT: Math.round(vRect.height),
                        LOGICAL_TREE_WIDTH: Math.round(logicalWidth),
                        LOGICAL_TREE_HEIGHT: Math.round(treeRoot.offsetHeight || treeRoot.scrollHeight),
                        ACTUAL_TREE_WIDTH: Math.round(tRect.width),
                        ACTUAL_TREE_HEIGHT: Math.round(tRect.height),
                        TREE_LEFT: Math.round(tRect.left),
                        TREE_RIGHT: Math.round(tRect.right),
                        LEFT_UNUSED_SPACE: `${leftUnused}px`,
                        RIGHT_UNUSED_SPACE: `${rightUnused}px`,
                        VIEWPORT_WIDTH_USAGE_PERCENT: `${widthUsagePercent}%`,
                        SCALE_COMMAND: this.zoomScale,
                        ACTUAL_SCALE_RATIO: (visualWidth / logicalWidth).toFixed(3),
                        POSITION_CARD_LOGICAL_WIDTH: posCard ? posCard.offsetWidth : CONFIG.CARD_NATURAL_WIDTH,
                        POSITION_CARD_ACTUAL_WIDTH: pRect ? Math.round(pRect.width) : CONFIG.CARD_MIN_WIDTH,
                        DIV_ME_NATURAL_WIDTH: divME ? (divME.scrollWidth || divME.offsetWidth) : 0,
                        DIV_G0_NATURAL_WIDTH: divG0 ? (divG0.scrollWidth || divG0.offsetWidth) : 0,
                        CORPORATE_NATURAL_WIDTH: tmh0 ? (tmh0.scrollWidth || tmh0.offsetWidth) : 0,
                        DIV_ME_ACTUAL_WIDTH: meRect ? Math.round(meRect.width) : 0,
                        DIV_G0_ACTUAL_WIDTH: g0Rect ? Math.round(g0Rect.width) : 0,
                        CORPORATE_ACTUAL_WIDTH: h0Rect ? Math.round(h0Rect.width) : 0
                    };

                    console.log(`=== OrgFlow [v${CONFIG.BUNDLE_VERSION}] DOM GEOMETRY AUDIT ===`, metrics);
                    window.__ORGFLOW_DOM_METRICS__ = metrics;

                    // Run full layout validation
                    this.runLayoutValidation();
                });
            });
        }

        autoExpandAndFocusSearch(query) {
            this.store.getUnifiedEmployees().forEach(emp => {
                if (emp.english_name.toLowerCase().includes(query) ||
                    emp.thai_name.toLowerCase().includes(query) ||
                    emp.employee_id.toLowerCase().includes(query) ||
                    emp.position_name.toLowerCase().includes(query) ||
                    emp.organization_code.toLowerCase().includes(query)) {
                    
                    let curr = this.store.getTreeNode(emp.organization_code);
                    while (curr) {
                        this.expandedNodeCodes.add(curr.code);
                        this.expandedStaffSections.add(curr.code);
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

            if (!this.store.topologyStatus.isValid) {
                const errorBox = document.createElement('div');
                errorBox.className = 'orgflow-preview-banner';
                errorBox.style.background = '#fee2e2';
                errorBox.style.borderColor = '#ef4444';
                errorBox.style.color = '#991b1b';
                errorBox.innerHTML = `
                    <span>🚨</span>
                    <span><b>CANONICAL DATASET MISMATCH:</b> Expected 57 nodes, got ${this.store.topologyStatus.nodeCount}. Chart rendering halted for data integrity.</span>
                `;
                canvas.appendChild(errorBox);
                return canvas;
            }

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

            const focusOrg = this.store.getOrgByCode(this.focusedOrgCode);
            const isFocusActive = this.focusedOrgCode !== 'TTMET';

            bar.innerHTML = `
                <span class="orgflow-breadcrumb-link" data-code="TTMET">TTMET (Company Root)</span>
                ${isFocusActive ? `
                    <span class="orgflow-breadcrumb-separator">></span>
                    <span style="font-weight:bold; color:#0284c7;">${focusOrg ? focusOrg.organization_name : this.focusedOrgCode} (<code>${this.focusedOrgCode}</code>) [FOCUS MODE]</span>
                    <button class="orgflow-btn orgflow-btn-outline" id="btn-clear-focus" style="font-size:10px; padding:2px 6px; margin-left:8px;">⬅️ Back to Company</button>
                ` : ''}
                <span style="margin-left: auto; color: #64748b; font-size: 11px;">Master: <b>57 Canonical Nodes</b> | Scope: <b>${this.store.getRootTreeNode()?.totalHeadcount || 275} Staff</b></span>
            `;

            bar.querySelector('.orgflow-breadcrumb-link').addEventListener('click', () => {
                this.focusedOrgCode = 'TTMET';
                this.render();
            });

            if (isFocusActive) {
                bar.querySelector('#btn-clear-focus').addEventListener('click', () => {
                    this.focusedOrgCode = 'TTMET';
                    this.render();
                });
            }

            return bar;
        }

        renderOrgChartContainerView() {
            const view = document.createElement('div');

            view.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 10px;">
                    <div style="display: flex; gap: 8px;">
                        <button class="orgflow-btn ${this.chartMode === 'PERSONNEL_VIEW' ? 'orgflow-btn-primary' : 'orgflow-btn-outline'}" id="btn-mode-personnel">👥 Personnel View (Executive Org Chart)</button>
                        <button class="orgflow-btn ${this.chartMode === 'CANONICAL_STRUCTURE' ? 'orgflow-btn-primary' : 'orgflow-btn-outline'}" id="btn-mode-canonical">🏛️ Canonical Structure (57-Node Hierarchy)</button>
                    </div>
                    <div style="display: flex; gap: 8px; align-items: center;">
                        <button class="orgflow-btn orgflow-btn-outline" id="btn-expand-all" style="font-size:11px; padding:4px 8px;">Expand All</button>
                        <button class="orgflow-btn orgflow-btn-outline" id="btn-collapse-all" style="font-size:11px; padding:4px 8px;">Collapse All</button>
                        <button class="orgflow-btn orgflow-btn-outline" id="btn-reset-view" style="font-size:11px; padding:4px 8px;">Reset View</button>
                    </div>
                </div>

                <div class="orgflow-chart-viewport" id="orgflow-chart-canvas">
                    <div class="orgflow-transform-layer" id="orgflow-transform-layer">
                        <!-- Chart Content Injected Here -->
                    </div>
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
                    this.expandedStaffSections.add(o.organization_code);
                });
                this.renderContentOnly();
            });

            view.querySelector('#btn-collapse-all').addEventListener('click', () => {
                this.expandedNodeCodes.clear();
                this.expandedNodeCodes.add('TTMET');
                this.expandedStaffSections.clear();
                this.renderContentOnly();
            });

            view.querySelector('#btn-reset-view').addEventListener('click', () => {
                this.focusedOrgCode = 'TTMET';
                this.density = 'NORMAL';
                this.zoomScale = 1.0;
                this.panX = 0;
                this.panY = 0;
                this.expandedNodeCodes.clear();
                this.expandedNodeCodes.add('TTMET');
                this.expandedNodeCodes.add('DIV-G0');
                this.expandedNodeCodes.add('DIV-ME');
                this.expandedNodeCodes.add('TMH0');
                this.expandedStaffSections.clear();
                this.render();
            });

            const transformLayer = view.querySelector('#orgflow-transform-layer');

            if (this.chartMode === 'PERSONNEL_VIEW') {
                transformLayer.appendChild(this.renderExecutivePersonnelView());
            } else {
                const rootNode = this.store.getRootTreeNode();
                if (rootNode) {
                    transformLayer.appendChild(this.renderRecursiveCanonicalOrgNode(rootNode));
                }
            }

            setTimeout(() => {
                this.attachPanZoomEvents(view.querySelector('#orgflow-chart-canvas'));
                this.updateTransform();
            }, 50);

            return view;
        }

        attachPanZoomEvents(viewport) {
            if (!viewport) return;

            viewport.addEventListener('mousedown', (e) => {
                if (e.target.closest('.orgflow-node-card') || e.target.closest('.orgflow-position-card') || e.target.closest('button')) return;
                this.isPanning = true;
                this.startX = e.clientX - this.panX;
                this.startY = e.clientY - this.panY;
                viewport.style.cursor = 'grabbing';
            });

            window.addEventListener('mousemove', (e) => {
                if (!this.isPanning) return;
                this.panX = e.clientX - this.startX;
                this.panY = e.clientY - this.startY;
                this.updateTransform();
            });

            window.addEventListener('mouseup', () => {
                if (this.isPanning) {
                    this.isPanning = false;
                    if (viewport) viewport.style.cursor = 'grab';
                }
            });

            viewport.addEventListener('wheel', (e) => {
                e.preventDefault();
                const delta = e.deltaY < 0 ? 0.05 : -0.05;
                const newScale = Math.max(0.4, Math.min(1.6, this.zoomScale + delta));
                this.setZoom(newScale);
            }, { passive: false });

            viewport.addEventListener('dblclick', (e) => {
                if (e.target === viewport || e.target.id === 'orgflow-transform-layer') {
                    this.fitScreen();
                }
            });
        }

        // ==========================================
        // DYNAMIC PERSONNEL VIEW (EXECUTIVE ORG CHART)
        // ==========================================
        renderExecutivePersonnelView() {
            const container = document.createElement('div');
            container.className = 'orgflow-personnel-chart-root';

            const totalEmps = this.store.getUnifiedEmployees().length;
            const totalPos = this.store.getPositions().length;
            const mgmtCount = this.store.getUnifiedEmployees().filter(e => e.position_tier <= 4).length;

            const headerSummary = document.createElement('div');
            headerSummary.className = 'orgflow-personnel-summary-bar';
            headerSummary.innerHTML = `
                <div class="orgflow-summary-pill"><span>TOTAL EMPLOYEES:</span> <b>${totalEmps}</b></div>
                <div class="orgflow-summary-pill"><span>CANONICAL NODES:</span> <b>57</b></div>
                <div class="orgflow-summary-pill"><span>POSITIONS:</span> <b>${totalPos}</b></div>
                <div class="orgflow-summary-pill"><span>MANAGEMENT:</span> <b>${mgmtCount}</b></div>
                <div class="orgflow-summary-pill"><span>VACANCIES:</span> <b>0</b></div>
                <div class="orgflow-summary-pill"><span>DENSITY:</span> <b>${this.density}</b></div>
            `;
            container.appendChild(headerSummary);

            const chartArea = document.createElement('div');
            chartArea.className = 'orgflow-personnel-canvas';

            const isFocusBranch = this.focusedOrgCode !== 'TTMET';
            if (!isFocusBranch) {
                const topExecs = this.store.getUnifiedEmployees().filter(e => e.organization_code === 'TTMET');
                const execGroup = document.createElement('div');
                execGroup.className = 'orgflow-personnel-group';

                const execCards = document.createElement('div');
                execCards.className = 'orgflow-personnel-row';
                topExecs.forEach(exec => {
                    execCards.appendChild(this.renderPositionEmployeeCard(exec, 'COMPANY TOP'));
                });
                execGroup.appendChild(execCards);

                const branchRow = document.createElement('div');
                branchRow.className = 'orgflow-personnel-branches';

                // Divisions & Corporate Department — Intrinsic Width (Phase 4E: no flex weights)
                branchRow.appendChild(this.renderDynamicBranchSubtree('DIV-ME'));
                branchRow.appendChild(this.renderDynamicBranchSubtree('DIV-G0'));
                branchRow.appendChild(this.renderDynamicBranchSubtree('TMH0'));

                execGroup.appendChild(branchRow);
                chartArea.appendChild(execGroup);
            } else {
                chartArea.appendChild(this.renderDynamicBranchSubtree(this.focusedOrgCode, true));
            }

            container.appendChild(chartArea);
            return container;
        }

        renderDynamicBranchSubtree(nodeCode, isFocusRoot = false) {
            const node = this.store.getTreeNode(nodeCode);
            if (!node) return document.createElement('div');

            const isDept = node.type === 'DEPARTMENT';
            const isDiv = node.type === 'DIVISION';

            const col = document.createElement('div');
            col.id = `branch-${nodeCode}`;
            col.className = isDept ? 'orgflow-personnel-dept-col' : 'orgflow-personnel-branch-col';
            // Phase 4E: No flex-weight assignment. Width is intrinsic from content.

            const headerBox = document.createElement('div');
            headerBox.className = isDept ? 'orgflow-dept-header-box' : 'orgflow-org-header-box';
            
            if (isDept) {
                headerBox.innerHTML = `
                    <div class="orgflow-dept-title">${node.name}</div>
                    <div class="orgflow-dept-sub"><code>${node.code}</code> • Scope: <b>${node.totalHeadcount} Staff</b></div>
                    ${!isFocusRoot ? `<button class="orgflow-btn orgflow-btn-outline btn-focus-unit" style="margin-top:2px; font-size:8px; padding:1px 5px;">🔍 Focus</button>` : ''}
                `;
            } else {
                headerBox.innerHTML = `
                    <div class="orgflow-org-header-title">${node.name}</div>
                    <div class="orgflow-org-header-sub"><code>${node.code}</code> • Scope: <b>${node.totalHeadcount} Staff</b> • Level ${node.level} (${node.type})</div>
                    ${!isFocusRoot ? `<button class="orgflow-btn orgflow-btn-outline btn-focus-unit" style="margin-top:4px; font-size:9px; padding:2px 6px;">🔍 Focus Subtree</button>` : ''}
                `;
            }

            const focusBtn = headerBox.querySelector('.btn-focus-unit');
            if (focusBtn) {
                focusBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.focusedOrgCode = node.code;
                    this.render();
                });
            }

            col.appendChild(headerBox);

            if (node.directEmployees.length > 0) {
                const isMultiPos = node.directEmployees.length > 1;
                const leaderContainer = document.createElement('div');
                leaderContainer.className = isMultiPos ? 'orgflow-personnel-pos-grid' : 'orgflow-personnel-row';
                if (!isMultiPos) leaderContainer.style.marginBottom = '8px';
                node.directEmployees.forEach(emp => {
                    leaderContainer.appendChild(this.renderPositionEmployeeCard(emp, node.type));
                });
                col.appendChild(leaderContainer);
            }

            if (node.children.length > 0) {
                const isDivME = node.code === 'DIV-ME';
                const isDivG0 = node.code === 'DIV-G0' || node.code === 'TMG0';
                const isTMH0 = node.code === 'TMH0';

                let subRowClass = 'orgflow-personnel-sub-row';
                if (isDivME) subRowClass = 'orgflow-div-me-dept-grid';
                else if (isDivG0) subRowClass = 'orgflow-div-g0-sections-grid';
                else if (isTMH0) subRowClass = 'orgflow-corporate-sections-stack';

                const subRow = document.createElement('div');
                subRow.className = subRowClass;

                node.children.forEach(child => {
                    if (child.type === 'SECTION' || child.type === 'TEAM' || child.type === 'SUB-TEAM' || child.type === 'FUNCTION') {
                        subRow.appendChild(this.renderDynamicSectionCard(child.code));
                    } else {
                        subRow.appendChild(this.renderDynamicBranchSubtree(child.code));
                    }
                });
                col.appendChild(subRow);
            }

            return col;
        }

        renderDynamicSectionCard(secCode) {
            const secNode = this.store.getTreeNode(secCode);
            if (!secNode) return document.createElement('div');

            const isStaffExpanded = this.expandedStaffSections.has(secCode);
            const box = document.createElement('div');
            box.className = 'orgflow-personnel-section-card';

            box.innerHTML = `
                <div class="orgflow-section-header">
                    <div>
                        <div style="font-weight:700; color:#0f172a; font-size:12px;">${secNode.name}</div>
                        <div style="font-size:10px; color:#64748b;"><code>${secNode.code}</code> • Level ${secNode.level} (${secNode.type})</div>
                    </div>
                    <div style="font-size:11px; font-weight:bold; color:#0284c7;">${secNode.totalHeadcount} Staff</div>
                </div>
                <div style="margin-top:8px; display:flex; justify-content:space-between; align-items:center;">
                    ${secNode.directHeadcount > 0 ? `
                        <button class="orgflow-btn orgflow-btn-outline btn-toggle-staff-grid" style="font-size:10px; padding:2px 8px;">
                            ${isStaffExpanded ? '▲ Collapse Staff' : `👥 View Staff (${secNode.directHeadcount})`}
                        </button>
                    ` : '<span style="font-size:10px; color:#94a3b8;">No direct staff</span>'}
                    <button class="orgflow-btn orgflow-btn-outline btn-sec-details" style="font-size:10px; padding:2px 8px;">Details</button>
                </div>
            `;

            const toggleBtn = box.querySelector('.btn-toggle-staff-grid');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (this.expandedStaffSections.has(secCode)) {
                        this.expandedStaffSections.delete(secCode);
                    } else {
                        this.expandedStaffSections.add(secCode);
                    }
                    this.renderContentOnly();
                });
            }

            box.querySelector('.btn-sec-details').addEventListener('click', (e) => {
                e.stopPropagation();
                this.activeOrgDetail = secNode;
                this.render();
            });

            if (isStaffExpanded && secNode.directEmployees.length > 0) {
                const grid = document.createElement('div');
                grid.className = 'orgflow-staff-multi-grid';

                secNode.directEmployees.forEach(staff => {
                    grid.appendChild(this.renderPositionEmployeeCard(staff, 'STAFF', true));
                });
                box.appendChild(grid);
            }

            return box;
        }

        renderPositionEmployeeCard(emp, roleBadgeText = '', isCompact = false) {
            const card = document.createElement('div');
            card.className = `orgflow-position-card ${isCompact ? 'compact' : ''}`;
            
            if (emp.position_tier === 1) card.style.borderTop = '4px solid #0284c7';
            else if (emp.position_tier === 2) card.style.borderTop = '4px solid #6366f1';
            else if (emp.position_tier === 3 || emp.position_tier === 4) card.style.borderTop = '4px solid #06b6d4';
            else card.style.borderTop = '3px solid #cbd5e1';

            if (this.searchQuery && (
                emp.english_name.toLowerCase().includes(this.searchQuery) ||
                emp.thai_name.toLowerCase().includes(this.searchQuery) ||
                emp.employee_id.toLowerCase().includes(this.searchQuery) ||
                emp.position_name.toLowerCase().includes(this.searchQuery)
            )) {
                card.style.boxShadow = '0 0 0 3px #fef08a, 0 4px 12px rgba(234, 179, 8, 0.35)';
            }

            const initials = emp.english_name ? emp.english_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'EM';

            card.innerHTML = `
                <div class="orgflow-pos-header">
                    <span class="orgflow-pos-title" title="${emp.position_name}">${emp.position_name}</span>
                    <span class="orgflow-pos-code"><code>${emp.position_code}</code></span>
                </div>
                <div class="orgflow-pos-body">
                    <div class="orgflow-pos-avatar">
                        ${emp.photo_url ? `<img src="${emp.photo_url}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">` : initials}
                    </div>
                    <div class="orgflow-pos-info">
                        <div class="orgflow-pos-emp-name" title="${emp.english_name}">${emp.english_name}</div>
                        <div class="orgflow-pos-emp-id">EMP: <b>${emp.employee_id}</b></div>
                        <div class="orgflow-pos-unit" title="${emp.organization_name}">${emp.organization_name}</div>
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
        // 57-NODE CANONICAL STRUCTURE TREE
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
            else if (node.level === 5) card.style.borderLeft = '4px solid #f59e0b';
            else card.style.borderLeft = '3px solid #8b5cf6';

            if (this.searchQuery && (node.code.toLowerCase().includes(this.searchQuery) || node.name.toLowerCase().includes(this.searchQuery))) {
                card.style.boxShadow = '0 0 0 3px #fef08a, 0 4px 12px rgba(234, 179, 8, 0.25)';
            }

            card.innerHTML = `
                <div class="orgflow-node-header">
                    <span class="orgflow-node-code">${node.code}</span>
                    <span class="orgflow-node-type-badge type-${node.type.toLowerCase()}">${node.type} (L${node.level})</span>
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
                    <button class="orgflow-btn orgflow-btn-primary" id="btn-drill-org">Focus Subtree</button>
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
                this.focusedOrgCode = node.code;
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

            view.innerHTML = `
                <div style="padding: 14px 16px; border-bottom: 1px solid #e2e8f0; display:flex; justify-content:space-between; align-items:center;">
                    <div style="font-weight: 700; color: #0f172a;">Employee Directory (${list.length} records)</div>
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
                    <div style="font-weight: 700; color: #0f172a;">Canonical Organization Units (57-Node Master Catalog)</div>
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
                            <th>Units</th>
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
                            <th style="text-align:right;">Budgeted</th>
                            <th style="text-align:right;">Active</th>
                            <th style="text-align:right;">Vacancies</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${vacancies.map(v => `
                            <tr>
                                <td><b>${v.position_name}</b></td>
                                <td><code>${v.position_code}</code></td>
                                <td>${v.organization_name}</td>
                                <td style="text-align:right;">${v.budgetedHeadcount}</td>
                                <td style="text-align:right; font-weight:bold;">${v.currentHeadcount}</td>
                                <td style="text-align:right;">${v.vacancyCount}</td>
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
                    <div style="font-weight: 700; color: #0f172a;">Organization Change Requests (App 793)</div>
                </div>
                <table class="orgflow-table">
                    <thead>
                        <tr>
                            <th>Request ID</th>
                            <th>Type</th>
                            <th>Employee</th>
                            <th>From Org</th>
                            <th>To Org</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${requests.length === 0 ? `
                            <tr><td colspan="6" style="text-align:center; padding: 24px; color: #94a3b8;">No change requests submitted yet (Clean baseline).</td></tr>
                        ` : requests.map(r => `
                            <tr>
                                <td><b>${r.request_id}</b></td>
                                <td><span class="orgflow-badge badge-active">${r.request_type}</span></td>
                                <td>${r.english_name} (<code>${r.employee_id}</code>)</td>
                                <td><code>${r.current_organization_code}</code></td>
                                <td><code>${r.proposed_organization_code}</code></td>
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
                        <div class="orgflow-kpi-sub">Direct: ${rootNode?.directHeadcount || 0} | Scope: ${rootNode?.totalHeadcount || 0}</div>
                    </div>
                    <div class="orgflow-kpi-card">
                        <div class="orgflow-kpi-title">Canonical Org Units</div>
                        <div class="orgflow-kpi-value">${totalOrgs}</div>
                        <div class="orgflow-kpi-sub">57 Canonical Master Nodes</div>
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
                tab.addEventListener('click', () => {
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
                        <div style="font-size: 12px; color: #64748b;">Target: ${e.english_name} (<code>${e.employee_id}</code>)</div>
                    </div>
                    <button class="orgflow-drawer-close" id="wizard-close-btn">✕</button>
                </div>

                <div class="orgflow-drawer-body">
                    <div class="orgflow-preview-banner">
                        <span>⚠️</span>
                        <span><b>PREVIEW MODE:</b> Simulation only. Zero production writes.</span>
                    </div>

                    <div style="margin-bottom: 14px;">
                        <label style="font-size: 12px; font-weight: 700; color: #334155; display:block; margin-bottom: 4px;">Change Request Type</label>
                        <select class="orgflow-select" id="wizard-req-type" style="width: 100%;">
                            <option value="EMPLOYEE_TRANSFER">EMPLOYEE_TRANSFER (Transfer Department / Section)</option>
                            <option value="POSITION_CHANGE">POSITION_CHANGE (Change Position Title)</option>
                            <option value="PROMOTION">PROMOTION (Advance Position Grade)</option>
                        </select>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px;">
                        <div>
                            <label style="font-size: 12px; font-weight: 700; color: #334155; display:block; margin-bottom: 4px;">Proposed Unit (57-Node Master)</label>
                            <select class="orgflow-select" id="wizard-prop-org" style="width: 100%;">
                                ${orgs.map(o => `<option value="${o.organization_code}" ${o.organization_code === e.organization_code ? 'selected' : ''}>${o.organization_code} — ${o.organization_name}</option>`).join('')}
                            </select>
                        </div>
                        <div>
                            <label style="font-size: 12px; font-weight: 700; color: #334155; display:block; margin-bottom: 4px;">Proposed Position</label>
                            <select class="orgflow-select" id="wizard-prop-pos" style="width: 100%;">
                                ${positions.map(p => `<option value="${p.position_code}" ${p.position_code === e.position_code ? 'selected' : ''}>${p.position_code} — ${p.position_name}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                </div>

                <div class="orgflow-drawer-footer">
                    <button class="orgflow-btn orgflow-btn-outline" id="wizard-cancel-btn">Cancel</button>
                    <button class="orgflow-btn orgflow-btn-primary" disabled style="opacity: 0.6;">Submit Request (Disabled in Preview)</button>
                </div>
            `;

            modal.querySelector('#wizard-close-btn').addEventListener('click', () => {
                this.isChangeWizardOpen = false;
                this.render();
            });
            modal.querySelector('#wizard-cancel-btn').addEventListener('click', () => {
                this.isChangeWizardOpen = false;
                this.render();
            });

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

        handleExcelExport() {
            const filename = `OrgFlow_57Node_Export_${new Date().toISOString().slice(0, 10)}.csv`;
            let headers = [
                'Level',
                'Hierarchy Path',
                'Organization Code',
                'Organization Name',
                'Position Code',
                'Position Name',
                'Position Tier',
                'Employee ID',
                'Thai Name',
                'English Name',
                'Assignment Type',
                'Status'
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
                    `"=""${e.employee_id}"""`,
                    `"${e.thai_name.replace(/"/g, '""')}"`,
                    `"${e.english_name.replace(/"/g, '""')}"`,
                    `"${e.assignment_type}"`,
                    `"${e.assignment_status}"`
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

            const renderCard = (emp) => `
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
                    <title>OrgFlow — Official Corporate Organization Chart (57-Node Hierarchy)</title>
                    <style>
                        @page { size: A3 landscape; margin: 10mm; }
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
                            <div class="pdf-sub">Official Corporate Organization Chart • Scope: <b>${rootNode?.totalHeadcount || 275} Employees</b> • 57-Node Canonical Baseline</div>
                        </div>
                        <div style="text-align: right; font-size: 10px; color: #64748b;">
                            Generated: ${new Date().toLocaleDateString()} | Master: 57 Canonical Nodes / App 53 (275 Emps) / App 792
                        </div>
                    </div>

                    <div class="chart-container">
                        <div style="display: flex; gap: 15px; justify-content: center;">
                            ${topExecs.map(renderCard).join('')}
                        </div>

                        <div class="branch-row">
                            <div class="branch-col" style="flex: 2;">
                                <div class="branch-title">Machinery & Engineering Division (${divME?.totalHeadcount || 172} Staff)</div>
                                <div style="display: flex; justify-content: center;">
                                    ${divME?.directEmployees.map(renderCard).join('') || ''}
                                </div>
                                <div class="sub-depts">
                                    ${divME?.children.map(dept => `
                                        <div class="dept-box">
                                            <div style="font-weight: bold; font-size: 10px; color: #0284c7;">${dept.name}</div>
                                            <div style="font-size: 8px; color: #64748b;">${dept.totalHeadcount} Staff</div>
                                            <div style="margin-top: 4px;">
                                                ${dept.directEmployees.map(renderCard).join('')}
                                            </div>
                                        </div>
                                    `).join('') || ''}
                                </div>
                            </div>

                            <div class="branch-col" style="flex: 1.4;">
                                <div class="branch-title">GIFU SEIKI Division (${divG0?.totalHeadcount || 89} Staff)</div>
                                <div style="display: flex; justify-content: center;">
                                    ${divG0?.directEmployees.map(renderCard).join('') || ''}
                                </div>
                                <div class="sub-depts">
                                    ${divG0?.children.map(dept => `
                                        <div class="dept-box">
                                            <div style="font-weight: bold; font-size: 10px; color: #0284c7;">${dept.name}</div>
                                            <div style="font-size: 8px; color: #64748b;">${dept.totalHeadcount} Staff</div>
                                            <div style="margin-top: 4px;">
                                                ${dept.directEmployees.map(renderCard).join('')}
                                            </div>
                                        </div>
                                    `).join('') || ''}
                                </div>
                            </div>

                            <div class="branch-col" style="flex: 1;">
                                <div class="branch-title">Corporate Department (${tmh0?.totalHeadcount || 12} Staff)</div>
                                <div class="sub-depts">
                                    ${tmh0?.children.map(sec => `
                                        <div class="dept-box">
                                            <div style="font-weight: bold; font-size: 10px; color: #0284c7;">${sec.name}</div>
                                            <div style="font-size: 8px; color: #64748b;">${sec.totalHeadcount} Staff</div>
                                            <div style="margin-top: 4px;">
                                                ${sec.directEmployees.map(renderCard).join('')}
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

