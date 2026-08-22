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

app53 = fetch_records(53)
app791 = fetch_records(791)
app792 = fetch_records(792)

print(f"Raw record counts: App 53 = {len(app53)}, App 791 = {len(app791)}, App 792 = {len(app792)}")

# Check App 53 IDs
app53_ids = set()
app53_map = {}
for r in app53:
    raw_id = (r.get('emp_text', {}).get('value') or r.get('Number', {}).get('value') or '').strip()
    app53_ids.add(raw_id)
    app53_map[raw_id] = {
        'id': raw_id,
        'name_en': (r.get('Text', {}).get('value') or '').strip(),
        'name_th': (r.get('Text_0', {}).get('value') or '').strip()
    }

# Check App 792 IDs
app792_ids = set()
app792_map = {}
for r in app792:
    raw_id = (r.get('employee_id', {}).get('value') or '').strip()
    app792_ids.add(raw_id)
    app792_map[raw_id] = {
        'id': raw_id,
        'name_en': (r.get('english_name', {}).get('value') or '').strip(),
        'name_th': (r.get('thai_name', {}).get('value') or '').strip(),
        'org_code': (r.get('organization_code', {}).get('value') or '').strip(),
        'org_name': (r.get('organization_name', {}).get('value') or '').strip(),
        'pos_code': (r.get('position_code', {}).get('value') or '').strip(),
        'pos_name': (r.get('position_name', {}).get('value') or '').strip(),
        'status': (r.get('assignment_status', {}).get('value') or '').strip()
    }

print(f"Unique IDs in App 53:  {len(app53_ids)}")
print(f"Unique IDs in App 792: {len(app792_ids)}")

diff_53_minus_792 = app53_ids - app792_ids
diff_792_minus_53 = app792_ids - app53_ids

print(f"IDs in App 53 but not in App 792 ({len(diff_53_minus_792)}): {diff_53_minus_792}")
print(f"IDs in App 792 but not in App 53 ({len(diff_792_minus_53)}): {diff_792_minus_53}")

# Now let's simulate the EXACT JS logic in orgflowExplorerApp.js to see where 274 came from!
# Look at orgflowExplorerApp.js:
# this.empMap:
# this.employees53.forEach(e => {
#     const id = (e.emp_text?.value || e.Number?.value || '').trim();
#     this.empMap.set(id, { ... });
# });
#
# this.unifiedEmployees = [];
# this.empMap.forEach((identity, empId) => {
#     const asg = this.currentAssignmentMap.get(empId) || {};
#     ...
#     this.unifiedEmployees.push(...);
# });

# Let's check in App 53 if any record has emp_text empty, or if two records have the same emp_text!
app53_id_counts = {}
for r in app53:
    raw_id = (r.get('emp_text', {}).get('value') or r.get('Number', {}).get('value') or '').strip()
    app53_id_counts[raw_id] = app53_id_counts.get(raw_id, 0) + 1

duplicates_53 = {k: v for k, v in app53_id_counts.items() if v > 1}
print(f"Duplicate IDs in App 53: {duplicates_53}")

app792_id_counts = {}
for r in app792:
    raw_id = (r.get('employee_id', {}).get('value') or '').strip()
    app792_id_counts[raw_id] = app792_id_counts.get(raw_id, 0) + 1

duplicates_792 = {k: v for k, v in app792_id_counts.items() if v > 1}
print(f"Duplicate IDs in App 792: {duplicates_792}")

# Let's check employee 0043 (Ms. Somrudee)
print("\nMs. Somrudee Pannoo Check:")
print("App 53 record:", app53_map.get('0043') or app53_map.get('43'))
print("App 792 record:", app792_map.get('0043') or app792_map.get('43'))

# Check all employees assigned to DIV-ME
div_me_direct = [e for e in app792_map.values() if e['org_code'] == 'DIV-ME']
print(f"\nDirectly assigned to DIV-ME ({len(div_me_direct)}): {div_me_direct}")

# Check all 4 departments under DIV-ME
tmt0_emps = [e for e in app792_map.values() if e['org_code'].startswith('TMT')]
tmf0_emps = [e for e in app792_map.values() if e['org_code'].startswith('TMF')]
tme0_emps = [e for e in app792_map.values() if e['org_code'].startswith('TME')]
tms0_emps = [e for e in app792_map.values() if e['org_code'].startswith('TMS')]

print(f"TMT: {len(tmt0_emps)}")
print(f"TMF: {len(tmf0_emps)}")
print(f"TME: {len(tme0_emps)}")
print(f"TMS: {len(tms0_emps)}")
print(f"Sum under DIV-ME = Direct ({len(div_me_direct)}) + TMT({len(tmt0_emps)}) + TMF({len(tmf0_emps)}) + TME({len(tme0_emps)}) + TMS({len(tms0_emps)}) = {len(div_me_direct) + len(tmt0_emps) + len(tmf0_emps) + len(tme0_emps) + len(tms0_emps)}")

# Now why did the UI show DIV-ME = 171?
# Let's look at what orgflowExplorerApp.js did in buildRecursiveHierarchyTree:
# node.children.forEach(child => {
#     node.allDescendantCodes.add(child.code);
#     computeMetrics(child);
#     child.allDescendantCodes.forEach(code => node.allDescendantCodes.add(code));
#     descCount += child.totalHeadcount;
# });
# node.descendantHeadcount = descCount;
# node.totalHeadcount = node.directHeadcount + node.descendantHeadcount;

# If DIV-ME totalHeadcount is 172, why did the card show 171 on the screen?
# Let's check orgflowExplorerApp.js:
# In renderRecursiveOrgNode(node):
# <span>Total Scope: <b style="color: #0284c7;">${node.totalHeadcount}</b></span>
# Wait! Where did 171 come from?
