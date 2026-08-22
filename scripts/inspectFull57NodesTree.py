import json
import os
import csv

json_path = os.path.join(os.getcwd(), 'docs', 'CLEAN_CANONICAL_ORGANIZATION_MASTER.json')
csv_path = os.path.join(os.getcwd(), 'docs', 'OrgFlow_Canonical_Organization_Master.csv')

with open(json_path, 'r', encoding='utf-8') as f:
    json_data = json.load(f)

print(f"JSON nodes: {len(json_data)}")

with open(csv_path, 'r', encoding='utf-8') as f:
    csv_data = list(csv.DictReader(f))

print(f"CSV nodes: {len(csv_data)}")

for i, row in enumerate(csv_data):
    # CSV keys might have BOM or different casing
    code = row.get('Canonical Code', '') or row.get('\ufeffCanonical Code', '')
    name = row.get('Organization / Unit Name', '')
    etype = row.get('Entity Type', '')
    lvl = row.get('Level', '')
    parent = row.get('Parent Code', '')
    status = row.get('Code Status', '')
    print(f"[{i+1:02d}] Lvl {lvl} | Status: {status:20s} | Code: '{code:15s}' | Parent: '{parent:10s}' | Name: {name} ({etype})")
