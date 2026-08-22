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

recs791 = fetch_all(791)
print(f"Total records in App 791: {len(recs791)}")

# Group by code_status and organization_type
status_counts = {}
type_counts = {}
for r in recs791:
    st = r.get('code_status', {}).get('value', 'EMPTY')
    t = r.get('organization_type', {}).get('value', 'EMPTY')
    status_counts[st] = status_counts.get(st, 0) + 1
    type_counts[t] = type_counts.get(t, 0) + 1

print("Status counts in App 791:", status_counts)
print("Type counts in App 791:", type_counts)

# Let's inspect active vs all
active_nodes = [r for r in recs791 if r.get('code_status', {}).get('value') == 'ACTIVE']
print(f"ACTIVE records in App 791: {len(active_nodes)}")
for r in active_nodes:
    code = r.get('organization_code', {}).get('value')
    name = r.get('organization_name', {}).get('value')
    t = r.get('organization_type', {}).get('value')
    p = r.get('parent_organization_code', {}).get('value')
    lvl = r.get('organization_level', {}).get('value')
    print(f"  {code} | {t} | Lvl {lvl} | Parent: {p} | {name}")
