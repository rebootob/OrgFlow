/**
 * OrgFlow — Kintone Custom View Read-Only Discovery & Baseline Backup Tool (Option A)
 * Version: 1.0.0
 * 
 * Runs natively inside Kintone Custom View using the active logged-in browser session.
 * 100% READ-ONLY, non-destructive, zero API token required.
 */

(function () {
    'use strict';

    // Target App ID 53 (Employee Namelist)
    const TARGET_APP_ID = kintone.app.getId() || 53;

    // Listen to App Index Show event
    kintone.events.on('app.record.index.show', function (event) {
        if (document.getElementById('orgflow-discovery-btn')) {
            return event;
        }

        // Create UI Control Bar in Kintone Header
        const headerSpace = kintone.app.getHeaderMenuSpaceElement();
        if (!headerSpace) return event;

        const container = document.createElement('div');
        container.style.display = 'inline-block';
        container.style.marginLeft = '15px';

        const btn = document.createElement('button');
        btn.id = 'orgflow-discovery-btn';
        btn.textContent = '🔍 Run OrgFlow Discovery & Baseline Backup';
        btn.style.backgroundColor = '#1e88e5';
        btn.style.color = '#ffffff';
        btn.style.border = 'none';
        btn.style.padding = '8px 16px';
        btn.style.borderRadius = '4px';
        btn.style.fontWeight = 'bold';
        btn.style.cursor = 'pointer';

        const statusLabel = document.createElement('span');
        statusLabel.id = 'orgflow-discovery-status';
        statusLabel.style.marginLeft = '12px';
        statusLabel.style.fontWeight = 'bold';
        statusLabel.style.color = '#333333';

        container.appendChild(btn);
        container.appendChild(statusLabel);
        headerSpace.appendChild(container);

        btn.addEventListener('click', async function () {
            btn.disabled = true;
            statusLabel.textContent = '⏳ Fetching Form Metadata & Records (READ ONLY)...';
            statusLabel.style.color = '#0277bd';

            try {
                // 1. GET Form Fields
                const fieldsRes = await kintone.api(kintone.api.url('/k/v1/app/form/fields.json', true), 'GET', { app: TARGET_APP_ID });
                
                // 2. GET Form Layout
                const layoutRes = await kintone.api(kintone.api.url('/k/v1/app/form/layout.json', true), 'GET', { app: TARGET_APP_ID });

                // 3. GET Records (Batch Limit 500)
                let allRecords = [];
                let offset = 0;
                const limit = 500;
                let hasMore = true;

                while (hasMore) {
                    const query = `limit ${limit} offset ${offset}`;
                    const recRes = await kintone.api(kintone.api.url('/k/v1/records.json', true), 'GET', { app: TARGET_APP_ID, query });
                    const records = recRes.records || [];
                    allRecords.push(...records);

                    if (records.length < limit) {
                        hasMore = false;
                    } else {
                        offset += limit;
                    }
                }

                statusLabel.textContent = `✅ PASS! Retrieved ${allRecords.length} Records & ${Object.keys(fieldsRes.properties || {}).length} Fields. Downloading Backup JSON...`;
                statusLabel.style.color = '#2e7d32';

                // 4. Trigger Automatic Backup Download (Machine-Readable JSON)
                const backupPackage = {
                    discoveryVersion: "1.0.0",
                    timestamp: new Date().toISOString(),
                    kintoneDomain: location.origin,
                    appId: TARGET_APP_ID,
                    totalRecords: allRecords.length,
                    totalFields: Object.keys(fieldsRes.properties || {}).length,
                    fields: fieldsRes.properties,
                    layout: layoutRes.layout,
                    records: allRecords,
                    verificationStatus: "PASSED",
                    readOnlyExecution: true
                };

                const blob = new Blob([JSON.stringify(backupPackage, null, 2)], { type: 'application/json' });
                const downloadUrl = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = downloadUrl;
                a.download = `employee-namelist-backup-app${TARGET_APP_ID}-${Date.now()}.json`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

                btn.disabled = false;
            } catch (err) {
                console.error('[OrgFlow Discovery Error]', err);
                statusLabel.textContent = `❌ Error: ${err.message || 'API Call Failed'}`;
                statusLabel.style.color = '#c62828';
                btn.disabled = false;
            }
        });

        return event;
    });
})();
