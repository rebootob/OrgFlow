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

def fetch_records(app_id, query='limit 500'):
    q = urllib.parse.quote(query)
    req = urllib.request.Request(f"{base_url}/k/v1/records.json?app={app_id}&query={q}", headers=get_headers())
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode('utf-8'))
        return data.get('records', [])

print("Auditing records for ID 9000...")
app53_9000 = fetch_records(53, 'emp_text = "9000" or Number = "9000"')
app792_9000 = fetch_records(792, 'employee_id = "9000"')

print("\nApp 53 Records for 9000:")
for r in app53_9000:
    print(f"Record $id: {r.get('$id', {}).get('value')}")
    print(f"  emp_text:   {r.get('emp_text', {}).get('value')}")
    print(f"  Number:     {r.get('Number', {}).get('value')}")
    print(f"  English:    {r.get('Text', {}).get('value')}")
    print(f"  Thai:       {r.get('Text_0', {}).get('value')}")
    print(f"  Position:   {r.get('Text_2', {}).get('value')}")
    print(f"  Department: {r.get('Drop_down_0', {}).get('value')}")
    print(f"  Status:     {r.get('Status', {}).get('value')}")

print("\nApp 792 Records for 9000:")
for r in app792_9000:
    print(f"Record $id: {r.get('$id', {}).get('value')}")
    print(f"  assignment_id:   {r.get('assignment_id', {}).get('value')}")
    print(f"  employee_id:     {r.get('employee_id', {}).get('value')}")
    print(f"  English:         {r.get('english_name', {}).get('value')}")
    print(f"  Position:        {r.get('position_name', {}).get('value')} ({r.get('position_code', {}).get('value')})")
    print(f"  Org Code:        {r.get('organization_code', {}).get('value')}")
    print(f"  Org Name:        {r.get('organization_name', {}).get('value')}")
    print(f"  Assignment Type: {r.get('assignment_type', {}).get('value')}")
    print(f"  Status:          {r.get('assignment_status', {}).get('value')}")
