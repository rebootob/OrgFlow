import csv
import json
import os
import urllib.request
import urllib.parse
import base64

rootDir = os.getcwd()
env_path = os.path.join(rootDir, '.env.local')
env = {}
if os.path.exists(env_path):
    with open(env_path, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                k, v = line.split('=', 1)
                env[k.strip()] = v.strip()

base_url = env.get('KINTONE_BASE_URL', 'https://ttmet.cybozu.com').rstrip('/')
username = env.get('KINTONE_USERNAME', '')
password = env.get('KINTONE_PASSWORD', '')
basic_user = env.get('BASIC_AUTH_USER', '')
basic_pass = env.get('BASIC_AUTH_PASS', '')

def get_headers():
    h = {}
    if username and password:
        token = base64.b64encode(f"{username}:{password}".encode('utf-8')).decode('utf-8')
        h['X-Cybozu-Authorization'] = token
    if basic_user and basic_pass:
        b_token = base64.b64encode(f"{basic_user}:{basic_pass}".encode('utf-8')).decode('utf-8')
        h['Authorization'] = f"Basic {b_token}"
    return h

def fetch_all(app_id):
    records = []
    offset = 0
    limit = 500
    while True:
        q = urllib.parse.quote(f"limit {limit} offset {offset}")
        req = urllib.request.Request(f"{base_url}/k/v1/records.json?app={app_id}&query={q}", headers=get_headers())
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            recs = data.get('records', [])
            records.extend(recs)
            if len(recs) < limit:
                break
            offset += limit
    return records

app791 = fetch_all(791)
live_codes = {r.get('organization_code', {}).get('value', '').strip(): r for r in app791}

csv_path = os.path.join(rootDir, 'docs', 'OrgFlow_Canonical_Organization_Master.csv')
with open(csv_path, 'r', encoding='utf-8') as f:
    csv_nodes = list(csv.DictReader(f))

print(f"Total Canonical Nodes in CSV: {len(csv_nodes)}")
print(f"Total Live App 791 Records: {len(live_codes)}")

comparison_table = []
for idx, row in enumerate(csv_nodes):
    code = row.get('Canonical Code', '') or row.get('\ufeffCanonical Code', '')
    name = row.get('Organization / Unit Name', '')
    etype = row.get('Entity Type', '')
    lvl = row.get('Level', '')
    parent = row.get('Parent Code', '')
    pname = row.get('Parent Name', '')
    hpath = row.get('Hierarchy Path', '')
    status = row.get('Code Status', '')
    
    if code and code in live_codes:
        renderer_status = "PRESENT (Live App 791)"
    elif not code:
        renderer_status = "FILTERED (NEEDS_CODE_APPROVAL in App 791)"
    else:
        renderer_status = "MISSING"

    comparison_table.append({
        'index': idx + 1,
        'code': code or f"[PENDING-{name}]",
        'name': name,
        'type': etype,
        'level': lvl,
        'parent': parent or pname,
        'path': hpath,
        'status': status,
        'renderer_status': renderer_status
    })

print("\nDetailed Comparison Table:")
for item in comparison_table:
    print(f"| {item['index']:02d} | {item['code']:22s} | {item['name']:35s} | {item['type']:10s} | L{item['level']} | {item['parent']:25s} | {item['renderer_status']} |")

present_cnt = sum(1 for x in comparison_table if "PRESENT" in x['renderer_status'])
filtered_cnt = sum(1 for x in comparison_table if "FILTERED" in x['renderer_status'])
missing_cnt = sum(1 for x in comparison_table if x['renderer_status'] == "MISSING")

print(f"\nSummary:")
print(f"Total Canonical Master Nodes = {len(comparison_table)}")
print(f"Present in App 791 & Renderer = {present_cnt}")
print(f"Filtered (Uncoded in App 791)  = {filtered_cnt}")
print(f"Missing                      = {missing_cnt}")
