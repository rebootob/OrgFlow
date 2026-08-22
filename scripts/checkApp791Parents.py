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
        h['X-Cybozu-Authorization'] = base64.b64encode(f"{username}:{password}".encode('utf-8')).decode('utf-8')
    if basic_user and basic_pass:
        h['Authorization'] = f"Basic {base64.b64encode(f'{basic_user}:{basic_pass}'.encode('utf-8')).decode('utf-8')}"
    return h

q = urllib.parse.quote('limit 500')
req = urllib.request.Request(f"{base_url}/k/v1/records.json?app=791&query={q}", headers=get_headers())
res = json.loads(urllib.request.urlopen(req).read().decode('utf-8'))
recs = res.get('records', [])

for r in recs:
    code = r.get('organization_code', {}).get('value', '').strip()
    name = r.get('organization_name', {}).get('value', '').strip()
    p_code = r.get('parent_organization_code', {}).get('value', '').strip()
    p_name = r.get('parent_organization_name', {}).get('value', '').strip()
    lvl = r.get('organization_level', {}).get('value', '').strip()
    t = r.get('organization_type', {}).get('value', '').strip()
    print(f"Code: {code:<15} | Type: {t:<10} | Lvl: {lvl} | ParentCode: {p_code:<12} | ParentName: {p_name}")
