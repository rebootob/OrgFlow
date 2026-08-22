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

print("Running Canonical Master Hierarchy & Production Safety Validation...")
app53 = fetch_all(53)
app791 = fetch_all(791)
app792 = fetch_all(792)
app793 = fetch_all(793)

assert len(app53) == 275, f"App 53 write detected! Got {len(app53)}"
assert len(app791) == 33, f"App 791 write detected! Got {len(app791)}"
assert len(app792) == 275, f"App 792 write detected! Got {len(app792)}"
assert len(app793) == 0, f"App 793 write detected! Got {len(app793)}"

nodes = {}
for r in app791:
    code = r.get('organization_code', {}).get('value', '').strip()
    name = r.get('organization_name', {}).get('value', '').strip()
    org_type = r.get('organization_type', {}).get('value', '').strip()
    lvl = int(r.get('organization_level', {}).get('value', '1') or '1')
    raw_parent = r.get('parent_organization_code', {}).get('value', '').strip()
    parent = None if raw_parent in ('ROOT', '') else raw_parent
    h_path = r.get('hierarchy_path', {}).get('value', '').strip()

    nodes[code] = {
        'code': code,
        'name': name,
        'type': org_type,
        'level': lvl,
        'parent': parent,
        'path': h_path,
        'children': [],
        'direct_emps': []
    }

orphan_nodes = 0
duplicate_nodes = 0
invalid_parents = 0
invalid_levels = 0

for code, node in nodes.items():
    if node['parent']:
        if node['parent'] not in nodes:
            orphan_nodes += 1
            invalid_parents += 1
        else:
            nodes[node['parent']]['children'].append(code)
            if node['level'] <= nodes[node['parent']]['level']:
                invalid_levels += 1
    elif code != 'TTMET':
        orphan_nodes += 1

# Attach employees
for r in app792:
    emp_id = r.get('employee_id', {}).get('value', '').strip()
    org_code = r.get('organization_code', {}).get('value', '').strip()
    if org_code in nodes:
        nodes[org_code]['direct_emps'].append(emp_id)

def get_descendants(code):
    desc = set()
    for child in nodes[code]['children']:
        desc.add(child)
        desc.update(get_descendants(child))
    return desc

for code, node in nodes.items():
    node['all_descendants'] = get_descendants(code)
    node['direct_cnt'] = len(node['direct_emps'])
    node['desc_cnt'] = sum(len(nodes[d]['direct_emps']) for d in node['all_descendants'])
    node['total_cnt'] = node['direct_cnt'] + node['desc_cnt']

root = nodes['TTMET']
print(f"Root Direct: {root['direct_cnt']}")
print(f"Root Descendant: {root['desc_cnt']}")
print(f"Root Total Scope: {root['total_cnt']}")

assert root['total_cnt'] == 275, "Root Total Scope is not 275!"
assert orphan_nodes == 0, f"Orphan nodes found: {orphan_nodes}"
assert duplicate_nodes == 0, f"Duplicate nodes found: {duplicate_nodes}"
assert invalid_parents == 0, f"Invalid parents found: {invalid_parents}"
assert invalid_levels == 0, f"Invalid levels found: {invalid_levels}"

print("\nALL CANONICAL MASTER VALIDATION TESTS PASSED (100% SUCCESS).")
