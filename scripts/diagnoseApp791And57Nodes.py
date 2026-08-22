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

print("Fetching App 791 (Org Master)...")
app791 = fetch_all(791)
print(f"Total records in App 791: {len(app791)}")

for idx, r in enumerate(app791):
    rec_id = r.get('$id', {}).get('value', '')
    org_code = r.get('organization_code', {}).get('value', '')
    org_name = r.get('organization_name', {}).get('value', '')
    org_type = r.get('organization_type', {}).get('value', '')
    level = r.get('organization_level', {}).get('value', '')
    parent = r.get('parent_organization_code', {}).get('value', '')
    path = r.get('hierarchy_path', {}).get('value', '')
    status = r.get('code_status', {}).get('value', '')
    print(f"[{idx+1}] #{rec_id}: Code='{org_code}', Name='{org_name}', Type='{org_type}', Lvl={level}, Parent='{parent}', Status='{status}'")

print("\nFetching App 53 (Employee Master)...")
app53 = fetch_all(53)
print(f"Total records in App 53: {len(app53)}")

job_titles = set()
for r in app53:
    jt = r.get('Text_2', {}).get('value', '').strip()
    if jt:
        job_titles.add(jt)

print(f"Unique job titles in App 53: {len(job_titles)}")
for jt in sorted(job_titles):
    print(f" - {jt}")
