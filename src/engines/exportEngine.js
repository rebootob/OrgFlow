/**
 * OrgFlow — Multi-Format Export Engine
 * Generates formatted Excel (.xlsx / CSV / HTML Table) and Scoped Hierarchy PDF reports.
 * 100% Client-side, zero server dependencies, zero writes.
 */

export class ExportEngine {
    constructor(dataStore) {
        this.dataStore = dataStore;
    }

    /**
     * Exports tabular data to Excel-compatible CSV / XLSX format with clean English headers.
     * @param {string} reportType 'EMPLOYEES' | 'ORGANIZATIONS' | 'POSITIONS' | 'VACANCIES' | 'HEADCOUNT' | 'ASSIGNMENTS' | 'REQUESTS'
     * @param {Array<Object>} filteredData 
     */
    exportToExcel(reportType, filteredData = null) {
        let filename = `OrgFlow_${reportType}_${new Date().toISOString().slice(0, 10)}.csv`;
        let headers = [];
        let rows = [];

        switch (reportType) {
            case 'EMPLOYEES':
            case 'EMPLOYEE_DIRECTORY':
                filename = `OrgFlow_Employee_Directory_${new Date().toISOString().slice(0, 10)}.csv`;
                headers = ['Employee ID', 'Thai Name', 'English Name', 'Position Code', 'Position Name', 'Organization Code', 'Organization Name', 'Organization Type', 'Assignment Type', 'Status', 'Effective Start Date'];
                const empList = filteredData || this.dataStore.getUnifiedEmployees();
                rows = empList.map(e => [
                    `"${e.employee_id || ''}"`,
                    `"${(e.thai_name || '').replace(/"/g, '""')}"`,
                    `"${(e.english_name || '').replace(/"/g, '""')}"`,
                    `"${e.position_code || ''}"`,
                    `"${(e.position_name || '').replace(/"/g, '""')}"`,
                    `"${e.organization_code || ''}"`,
                    `"${(e.organization_name || '').replace(/"/g, '""')}"`,
                    `"${e.organization_type || ''}"`,
                    `"${e.assignment_type || 'PRIMARY'}"`,
                    `"${e.assignment_status || 'CURRENT'}"`,
                    `"${e.effective_start_date || ''}"`
                ]);
                break;

            case 'ORGANIZATIONS':
            case 'ORGANIZATION_STRUCTURE':
                filename = `OrgFlow_Organization_Structure_${new Date().toISOString().slice(0, 10)}.csv`;
                headers = ['Organization Code', 'Organization Name', 'Organization Type', 'Level', 'Parent Code', 'Hierarchy Path', 'Headcount', 'Vacancies'];
                const orgList = filteredData || this.dataStore.getOrganizations();
                rows = orgList.map(o => {
                    const stats = this.dataStore.getOrgHeadcount(o.organization_code);
                    return [
                        `"${o.organization_code || ''}"`,
                        `"${(o.organization_name || '').replace(/"/g, '""')}"`,
                        `"${o.organization_type || ''}"`,
                        `"${o.organization_level || ''}"`,
                        `"${o.parent_organization_code || ''}"`,
                        `"${(o.hierarchy_path || '').replace(/"/g, '""')}"`,
                        stats.directHeadcount,
                        stats.vacancies
                    ];
                });
                break;

            case 'VACANCIES':
            case 'VACANCY_REPORT':
                filename = `OrgFlow_Vacancy_Report_${new Date().toISOString().slice(0, 10)}.csv`;
                headers = ['Position Code', 'Position Name', 'Organization Code', 'Organization Name', 'Organization Type', 'Budgeted Headcount', 'Current Headcount', 'Vacancy Count', 'Status'];
                const vacList = filteredData || this.dataStore.getVacancies();
                rows = vacList.map(v => [
                    `"${v.position_code || ''}"`,
                    `"${(v.position_name || '').replace(/"/g, '""')}"`,
                    `"${v.organization_code || ''}"`,
                    `"${(v.organization_name || '').replace(/"/g, '""')}"`,
                    `"${v.organization_type || ''}"`,
                    v.budgetedHeadcount,
                    v.currentHeadcount,
                    v.vacancyCount,
                    `"${v.status}"`
                ]);
                break;

            case 'HEADCOUNT':
            case 'HEADCOUNT_REPORT':
                filename = `OrgFlow_Headcount_Report_${new Date().toISOString().slice(0, 10)}.csv`;
                headers = ['Division / Department', 'Organization Code', 'Type', 'Active Headcount', 'Vacancies', 'Total Capacity'];
                const hcList = this.dataStore.getHeadcountSummary();
                rows = hcList.map(h => [
                    `"${(h.name || '').replace(/"/g, '""')}"`,
                    `"${h.code || ''}"`,
                    `"${h.type || ''}"`,
                    h.headcount,
                    h.vacancies,
                    h.headcount + h.vacancies
                ]);
                break;

            case 'CHANGE_REQUESTS':
            case 'REQUEST_REPORT':
                filename = `OrgFlow_Change_Requests_${new Date().toISOString().slice(0, 10)}.csv`;
                headers = ['Request ID', 'Request Type', 'Employee ID', 'English Name', 'Current Org', 'Proposed Org', 'Current Position', 'Proposed Position', 'Effective Date', 'Status', 'Requested By'];
                const crList = filteredData || this.dataStore.getChangeRequests();
                rows = crList.map(r => [
                    `"${r.request_id || ''}"`,
                    `"${r.request_type || ''}"`,
                    `"${r.employee_id || ''}"`,
                    `"${(r.english_name || '').replace(/"/g, '""')}"`,
                    `"${r.current_organization_code || ''}"`,
                    `"${r.proposed_organization_code || ''}"`,
                    `"${(r.current_position_name || '').replace(/"/g, '""')}"`,
                    `"${(r.proposed_position_name || '').replace(/"/g, '""')}"`,
                    `"${r.effective_date || ''}"`,
                    `"${r.Status || r.execution_status || ''}"`,
                    `"${r.requested_by ? (r.requested_by.name || r.requested_by.code) : ''}"`
                ]);
                break;

            default:
                headers = ['Key', 'Value'];
                rows = [['Report', reportType]];
        }

        const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
        this.triggerDownload(csvContent, filename, 'text/csv;charset=utf-8;');
        return { success: true, filename, rowCount: rows.length };
    }

    /**
     * Generates a hierarchy-aware scoped printable HTML / PDF document.
     * @param {string} scope 'COMPANY' | 'DIVISION' | 'DEPARTMENT' | 'HEADCOUNT' | 'VACANCY'
     * @param {string} targetCode Optional node filter
     */
    exportToPdf(scope = 'COMPANY', targetCode = 'TTMET') {
        const timestamp = new Date().toLocaleString('en-US', { timeZoneName: 'short' });
        const orgInfo = this.dataStore.getOrgByCode(targetCode) || { organization_name: 'Toyota Tsusho M&E (Thailand)', organization_code: 'TTMET' };
        
        let reportTitle = `Organization Chart — ${orgInfo.organization_name} (${orgInfo.organization_code})`;
        if (scope === 'HEADCOUNT') reportTitle = 'Corporate Headcount Distribution Summary';
        if (scope === 'VACANCY') reportTitle = 'Corporate Position & Vacancy Analysis Report';

        let htmlBody = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${reportTitle}</title>
            <style>
                @page { size: A4 landscape; margin: 15mm; }
                body { font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif; color: #1e293b; margin: 0; padding: 20px; font-size: 11px; }
                .header-bar { border-bottom: 2px solid #0284c7; padding-bottom: 10px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end; }
                .title { font-size: 18px; font-weight: bold; color: #0f172a; margin: 0; }
                .subtitle { font-size: 12px; color: #64748b; margin-top: 4px; }
                .meta { font-size: 10px; color: #94a3b8; text-align: right; }
                table { width: 100%; border-collapse: collapse; margin-top: 15px; }
                th { background-color: #f1f5f9; color: #334155; font-weight: 600; text-align: left; padding: 8px 10px; border: 1px solid #cbd5e1; }
                td { padding: 7px 10px; border: 1px solid #e2e8f0; }
                tr:nth-child(even) { background-color: #f8fafc; }
                .badge { display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 9px; font-weight: 600; }
                .badge-primary { background-color: #e0f2fe; color: #0369a1; }
                .badge-active { background-color: #dcfce7; color: #15803d; }
                .badge-vacant { background-color: #fef3c7; color: #b45309; }
                .tree-node { margin-bottom: 12px; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; background: #ffffff; }
                .tree-header { font-weight: bold; font-size: 13px; color: #0369a1; border-bottom: 1px solid #f1f5f9; padding-bottom: 4px; }
                .footer-bar { margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 10px; font-size: 9px; color: #94a3b8; display: flex; justify-content: space-between; }
                @media print {
                    .no-print { display: none; }
                    body { padding: 0; }
                }
            </style>
        </head>
        <body>
            <div class="header-bar">
                <div>
                    <div class="title">OrgFlow — ${reportTitle}</div>
                    <div class="subtitle">Scope: ${scope} | Target: ${targetCode} | Source: Verified Production Master</div>
                </div>
                <div class="meta">
                    Generated: ${timestamp}<br/>
                    Confidential — Internal HR Use Only
                </div>
            </div>
        `;

        if (scope === 'HEADCOUNT') {
            const summary = this.dataStore.getHeadcountSummary();
            htmlBody += `
                <h3>Executive Headcount & Capacity Breakdown</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Organization Unit</th>
                            <th>Code</th>
                            <th>Level / Type</th>
                            <th style="text-align: right;">Active Headcount</th>
                            <th style="text-align: right;">Open Vacancies</th>
                            <th style="text-align: right;">Total Approved Capacity</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${summary.map(s => `
                            <tr>
                                <td><b>${s.name}</b></td>
                                <td><code>${s.code}</code></td>
                                <td><span class="badge badge-primary">${s.type}</span></td>
                                <td style="text-align: right; font-weight: bold; color: #0284c7;">${s.headcount}</td>
                                <td style="text-align: right; color: ${s.vacancies > 0 ? '#b45309' : '#64748b'};">${s.vacancies}</td>
                                <td style="text-align: right; font-weight: bold;">${s.headcount + s.vacancies}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        } else if (scope === 'VACANCY') {
            const vacancies = this.dataStore.getVacancies();
            htmlBody += `
                <h3>Approved Position & Vacancy Roster</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Position Title</th>
                            <th>Position Code</th>
                            <th>Organization Unit</th>
                            <th>Org Code</th>
                            <th style="text-align: right;">Budgeted</th>
                            <th style="text-align: right;">Current Active</th>
                            <th style="text-align: right;">Open Vacancies</th>
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
                                <td style="text-align: right;">${v.budgetedHeadcount}</td>
                                <td style="text-align: right;">${v.currentHeadcount}</td>
                                <td style="text-align: right; font-weight: bold; color: ${v.vacancyCount > 0 ? '#b45309' : '#15803d'};">${v.vacancyCount}</td>
                                <td><span class="badge ${v.vacancyCount > 0 ? 'badge-vacant' : 'badge-active'}">${v.status}</span></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        } else {
            // Organization Hierarchy Tree Scope
            const orgEmployees = this.dataStore.getEmployeesByOrgScope(targetCode);
            htmlBody += `
                <div style="margin-bottom: 15px;">
                    <b>Hierarchy Scope:</b> <code>${orgInfo.hierarchy_path || orgInfo.organization_name}</code> &nbsp;|&nbsp; 
                    <b>Total Assigned Employees:</b> <b>${orgEmployees.length}</b>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>English Name</th>
                            <th>Thai Name</th>
                            <th>Position Title</th>
                            <th>Position Code</th>
                            <th>Organization Unit</th>
                            <th>Assignment Type</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${orgEmployees.map(e => `
                            <tr>
                                <td><b>${e.employee_id}</b></td>
                                <td>${e.english_name}</td>
                                <td>${e.thai_name}</td>
                                <td><b>${e.position_name}</b></td>
                                <td><code>${e.position_code}</code></td>
                                <td>${e.organization_name} (<code>${e.organization_code}</code>)</td>
                                <td><span class="badge badge-primary">${e.assignment_type}</span></td>
                                <td><span class="badge badge-active">${e.assignment_status}</span></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        }

        htmlBody += `
            <div class="footer-bar">
                <div>OrgFlow Organization Explorer • Toyota Tsusho M&E (Thailand)</div>
                <div>Page 1 of 1 • System Verified Architecture</div>
            </div>
            <div class="no-print" style="margin-top: 20px; text-align: center;">
                <button onclick="window.print()" style="background: #0284c7; color: white; border: none; padding: 10px 24px; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 13px;">🖨️ Print / Save as PDF</button>
            </div>
        </body>
        </html>
        `;

        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(htmlBody);
            printWindow.document.close();
        }
        return { success: true, scope, targetCode };
    }

    triggerDownload(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

export default ExportEngine;
