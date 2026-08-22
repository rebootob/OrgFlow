import json
import os
import urllib.request
import urllib.parse
import base64

rootDir = os.getcwd()

# Load environment
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

def fetch_records(app_id):
    query = urllib.parse.quote('limit 500')
    req = urllib.request.Request(f"{base_url}/k/v1/records.json?app={app_id}&query={query}", headers=get_headers())
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode('utf-8'))
        return data.get('records', [])

print("Validating live production counts and identity architecture...")
app53 = fetch_records(53)
app791 = fetch_records(791)
app792 = fetch_records(792)
app793 = fetch_records(793)

assert len(app53) == 275, "App 53 write detected!"
assert len(app791) == 33, "App 791 write detected!"
assert len(app792) == 275, "App 792 write detected!"
assert len(app793) == 0, "App 793 write detected!"

print(f"App 53 Records:  {len(app53)} (Writes: 0)")
print(f"App 791 Records: {len(app791)} (Writes: 0)")
print(f"App 792 Records: {len(app792)} (Writes: 0)")
print(f"App 793 Records: {len(app793)} (Writes: 0)")

# Check 9000 records
records_9000 = [r for r in app53 if (r.get('emp_text', {}).get('value') or r.get('Number', {}).get('value')) == '9000']
assert len(records_9000) == 2, "9000 count mismatch!"
print(f"Employee 9000 records in App 53: {len(records_9000)} (IDs: {[r.get('$id', {}).get('value') for r in records_9000]})")

# Check 0043
somrudee = [r for r in app53 if (r.get('emp_text', {}).get('value') or r.get('Number', {}).get('value')) == '0043']
assert len(somrudee) == 1, "0043 count mismatch!"
print(f"Ms. Somrudee Pannoo (0043) in App 53: Record #{somrudee[0].get('$id', {}).get('value')} (Leading zero preserved: True)")

print("\nALL POST-DEPLOYMENT IDENTITY TESTS PASSED (100% SUCCESS).")
