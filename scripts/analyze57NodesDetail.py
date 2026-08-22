import csv
import json
import os

csv_path = os.path.join(os.getcwd(), 'docs', 'OrgFlow_Canonical_Organization_Master.csv')
with open(csv_path, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    csv_nodes = list(reader)

print(f"Total nodes in CSV master: {len(csv_nodes)}")

approved_nodes = []
needs_code_nodes = []

for idx, node in enumerate(csv_nodes):
    code = node.get('Canonical Code', '').strip()
    name = node.get('Organization / Unit Name', '').strip()
    etype = node.get('Entity Type', '').strip()
    lvl = node.get('Level', '').strip()
    parent = node.get('Parent Code', '').strip()
    pname = node.get('Parent Name', '').strip()
    hpath = node.get('Hierarchy Path', '').strip()
    status = node.get('Code Status', '').strip()
    
    synthetic_code = code if code else f"NODE-{etype}-{name.replace(' ', '_').replace('.', '_').replace('&', '_').replace('/', '_')}"
    
    print(f"[{idx+1:02d}] Lvl {lvl} | Status: {status:19s} | Code: {code:15s} | Synthetic: {synthetic_code:25s} | Name: {name} (Parent: {parent or pname})")

