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

print("Fetching live data from App 791 and App 792...")
app791_raw = fetch_records(791)
app792_raw = fetch_records(792)
app53_raw = fetch_records(53)

# 1. Parse App 791 Canonical Nodes
nodes = {}
for r in app791_raw:
    code = r.get('organization_code', {}).get('value', '').strip()
    name = r.get('organization_name', {}).get('value', '').strip()
    org_type = r.get('organization_type', {}).get('value', '').strip()
    level = int(r.get('organization_level', {}).get('value', 0) or 0)
    parent = r.get('parent_organization_code', {}).get('value', '').strip()
    h_path = r.get('hierarchy_path', {}).get('value', '').strip()
    status = r.get('code_status', {}).get('value', '').strip()

    nodes[code] = {
        'code': code,
        'name': name,
        'type': org_type,
        'level': level,
        'parent': parent if parent else None,
        'hierarchy_path': h_path,
        'status': status,
        'children': [],
        'direct_employees': [],
        'all_descendants': set(),
        'all_descendant_employees': []
    }

for code, node in nodes.items():
    if node['parent'] and node['parent'] in nodes:
        nodes[node['parent']]['children'].append(code)

# 2. Parse App 792 Assignments
assignments = []
unmatched_assignments = []
for r in app792_raw:
    emp_id = r.get('employee_id', {}).get('value', '').strip()
    emp_name_en = r.get('english_name', {}).get('value', '').strip()
    emp_name_th = r.get('thai_name', {}).get('value', '').strip()
    pos_code = r.get('position_code', {}).get('value', '').strip()
    pos_name = r.get('position_name', {}).get('value', '').strip()
    org_code = r.get('organization_code', {}).get('value', '').strip()
    org_name = r.get('organization_name', {}).get('value', '').strip()
    asg_status = r.get('assignment_status', {}).get('value', '').strip()
    asg_type = r.get('assignment_type', {}).get('value', '').strip()
    h_path = r.get('hierarchy_path', {}).get('value', '').strip()

    asg = {
        'emp_id': emp_id,
        'name_en': emp_name_en,
        'name_th': emp_name_th,
        'pos_code': pos_code,
        'pos_name': pos_name,
        'org_code': org_code,
        'org_name': org_name,
        'status': asg_status,
        'type': asg_type,
        'h_path': h_path
    }
    assignments.append(asg)

    if org_code in nodes:
        nodes[org_code]['direct_employees'].append(asg)
    else:
        unmatched_assignments.append(asg)

# 3. Recursive Descendants Calculation
def get_all_descendant_orgs(code):
    desc = set()
    for child in nodes[code]['children']:
        desc.add(child)
        desc.update(get_all_descendant_orgs(child))
    return desc

for code, node in nodes.items():
    node['all_descendants'] = get_all_descendant_orgs(code)
    # Calculate descendant employees
    desc_emps = []
    for d_code in node['all_descendants']:
        desc_emps.extend(nodes[d_code]['direct_employees'])
    node['all_descendant_employees'] = desc_emps

# Print Full Diagnostic Summary
print(f"\n============================================================")
print(f"DIAGNOSTIC AUDIT RESULTS:")
print(f"Total App 791 Nodes:       {len(nodes)}")
print(f"Total App 792 Assignments: {len(assignments)}")
print(f"Unmatched Assignments:     {len(unmatched_assignments)}")
if unmatched_assignments:
    print(f"Unmatched details: {unmatched_assignments}")
print(f"============================================================\n")

# Reconcile Root
root = nodes.get('TTMET')
if root:
    print(f"ROOT NODE: {root['code']} ({root['name']})")
    print(f"  Direct Staff:       {len(root['direct_employees'])}")
    for e in root['direct_employees']:
        print(f"    - {e['emp_id']}: {e['name_en']} ({e['pos_name']} - {e['pos_code']})")
    print(f"  Descendant Staff:   {len(root['all_descendant_employees'])}")
    print(f"  Total Scope:        {len(root['direct_employees']) + len(root['all_descendant_employees'])}")
    print(f"  Immediate Children ({len(root['children'])}): {root['children']}")

print(f"\n============================================================")
print(f"BRANCH RECONCILIATION:")
print(f"============================================================")
branches = ['DIV-G0', 'DIV-ME', 'TMH0']
for b in branches:
    b_node = nodes.get(b)
    if b_node:
        direct_cnt = len(b_node['direct_employees'])
        desc_cnt = len(b_node['all_descendant_employees'])
        total_cnt = direct_cnt + desc_cnt
        print(f"\nBranch: {b_node['code']} — {b_node['name']} ({b_node['type']}, Level {b_node['level']})")
        print(f"  Parent:               {b_node['parent']}")
        print(f"  Direct Employees:     {direct_cnt}")
        for e in b_node['direct_employees']:
            print(f"    - {e['emp_id']}: {e['name_en']} ({e['pos_name']})")
        print(f"  Immediate Children ({len(b_node['children'])}): {b_node['children']}")
        print(f"  Total Descendant Orgs ({len(b_node['all_descendants'])}): {sorted(list(b_node['all_descendants']))}")
        print(f"  Descendant Employees: {desc_cnt}")
        print(f"  TOTAL SCOPE:          {total_cnt}")
    else:
        print(f"\nBranch {b}: NOT FOUND in App 791!")

# Print Table of all 33 nodes
print(f"\n============================================================")
print(f"{'Code':<12} | {'Type':<10} | {'Lvl':<3} | {'Parent':<10} | {'Direct':<6} | {'Desc':<6} | {'Total':<6} | {'Children':<8} | {'Name'}")
print(f"-" * 105)
for code in sorted(nodes.keys(), key=lambda x: (nodes[x]['level'], nodes[x]['code'])):
    n = nodes[code]
    d_cnt = len(n['direct_employees'])
    desc_cnt = len(n['all_descendant_employees'])
    t_cnt = d_cnt + desc_cnt
    c_cnt = len(n['children'])
    p_code = n['parent'] or '-'
    print(f"{n['code']:<12} | {n['type']:<10} | {n['level']:<3} | {p_code:<10} | {d_cnt:<6} | {desc_cnt:<6} | {t_cnt:<6} | {c_cnt:<8} | {n['name']}")

# Save diagnostic data to JSON
audit_payload = {
    'total_nodes': len(nodes),
    'total_assignments': len(assignments),
    'unmatched_assignments_count': len(unmatched_assignments),
    'unmatched_assignments': unmatched_assignments,
    'nodes': {
        c: {
            'code': n['code'],
            'name': n['name'],
            'type': n['type'],
            'level': n['level'],
            'parent': n['parent'],
            'children': n['children'],
            'direct_count': len(n['direct_employees']),
            'descendant_count': len(n['all_descendant_employees']),
            'total_scope_count': len(n['direct_employees']) + len(n['all_descendant_employees']),
            'direct_employees': n['direct_employees']
        } for c, n in nodes.items()
    }
}

with open(os.path.join(rootDir, 'docs', 'APP791_APP792_RECONCILIATION_AUDIT.json'), 'w', encoding='utf-8') as f:
    json.dump(audit_payload, f, ensure_ascii=False, indent=2)

print(f"\nSaved docs/APP791_APP792_RECONCILIATION_AUDIT.json")
