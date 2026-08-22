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
recs792 = fetch_all(792)
recs53 = fetch_all(53)

print(f"Live App 791 Canonical Nodes: {len(recs791)}")
print(f"Live App 792 Assignments:     {len(recs792)}")
print(f"Live App 53 Employees:        {len(recs53)}")

nodes = {}
for r in recs791:
    code = r.get('organization_code', {}).get('value', '').strip()
    name = r.get('organization_name', {}).get('value', '').strip()
    org_type = r.get('organization_type', {}).get('value', '').strip()
    lvl = int(r.get('organization_level', {}).get('value', '1') or '1')
    parent = r.get('parent_organization_code', {}).get('value', '').strip()
    h_path = r.get('hierarchy_path', {}).get('value', '').strip()
    status = r.get('code_status', {}).get('value', '').strip()

    nodes[code] = {
        'code': code,
        'name': name,
        'type': org_type,
        'level': lvl,
        'parent': parent if parent else None,
        'hierarchy_path': h_path,
        'status': status,
        'children': [],
        'direct_emps': [],
        'all_descendants': set()
    }

orphan_nodes = []
duplicate_nodes = []
invalid_parents = []
invalid_levels = []

for code, node in nodes.items():
    if node['parent']:
        if node['parent'] not in nodes:
            orphan_nodes.append(code)
            invalid_parents.append(f"{code} -> {node['parent']} (Not found)")
        else:
            nodes[node['parent']]['children'].append(code)
            parent_lvl = nodes[node['parent']]['level']
            if node['level'] <= parent_lvl:
                invalid_levels.append(f"{code} (Lvl {node['level']}) under {node['parent']} (Lvl {parent_lvl})")
    elif code != 'TTMET':
        orphan_nodes.append(code)

print(f"Orphan Nodes: {len(orphan_nodes)}")
print(f"Duplicate Nodes: {len(duplicate_nodes)}")
print(f"Invalid Parents: {len(invalid_parents)}")
print(f"Invalid Levels: {len(invalid_levels)}")

# Calculate headcounts
for r in recs792:
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

for code, node in nodes.items():
    node['direct_count'] = len(node['direct_emps'])
    node['descendant_count'] = sum(len(nodes[d]['direct_emps']) for d in node['all_descendants'])
    node['total_count'] = node['direct_count'] + node['descendant_count']

root = nodes['TTMET']
print(f"\nRoot (TTMET): Direct = {root['direct_count']}, Descendant = {root['descendant_count']}, Total Scope = {root['total_count']}")

# Print recursive hierarchy tree text view
def print_tree(code, indent=0):
    n = nodes[code]
    prefix = "  " * indent + ("└── " if indent > 0 else "")
    print(f"{prefix}[{n['code']}] {n['name']} ({n['type']}, Lvl {n['level']}) - Direct: {n['direct_count']}, Total: {n['total_count']}")
    for child in sorted(n['children'], key=lambda x: (nodes[x]['level'], nodes[x]['code'])):
        print_tree(child, indent + 1)

print("\nRECURSIVE CANONICAL TREE:")
print_tree('TTMET')
