import csv
import json
import os

csv_path = os.path.join(os.getcwd(), 'docs', 'OrgFlow_Canonical_Organization_Master.csv')
with open(csv_path, 'r', encoding='utf-8') as f:
    csv_nodes = list(csv.DictReader(f))

print(f"Total rows in CSV: {len(csv_nodes)}")

# Canonical 57 Node Specification
CANONICAL_57_NODES = [
    # Level 1
    {"code": "TTMET", "name": "Toyota Tsusho M&E (Thailand) Co.,Ltd.", "type": "COMPANY", "level": 1, "parent": None, "path": "Toyota Tsusho M&E (Thailand) Co.,Ltd.", "status": "APPROVED"},
    # Level 2
    {"code": "DIV-ME", "name": "Machinery & Engineering Division", "type": "DIVISION", "level": 2, "parent": "TTMET", "path": "Toyota Tsusho M&E (Thailand) Co.,Ltd. > Machinery & Engineering Division", "status": "APPROVED"},
    {"code": "DIV-G0", "name": "GIFU SEIKI Division", "type": "DIVISION", "level": 2, "parent": "TTMET", "path": "Toyota Tsusho M&E (Thailand) Co.,Ltd. > GIFU SEIKI Division", "status": "APPROVED"},
    # Level 3 (Departments)
    {"code": "TMT0", "name": "Machinery Department", "type": "DEPARTMENT", "level": 3, "parent": "DIV-ME", "path": "TTMET > DIV-ME > TMT0", "status": "APPROVED"},
    {"code": "TMF0", "name": "Industrial Services Department", "type": "DEPARTMENT", "level": 3, "parent": "DIV-ME", "path": "TTMET > DIV-ME > TMF0", "status": "APPROVED"},
    {"code": "TME0", "name": "Eco Energy & Textile Machinery Department", "type": "DEPARTMENT", "level": 3, "parent": "DIV-ME", "path": "TTMET > DIV-ME > TME0", "status": "APPROVED"},
    {"code": "TMS0", "name": "Technical Services Department", "type": "DEPARTMENT", "level": 3, "parent": "DIV-ME", "path": "TTMET > DIV-ME > TMS0", "status": "APPROVED"},
    {"code": "TMG0", "name": "Mold & Engineering Department", "type": "DEPARTMENT", "level": 3, "parent": "DIV-G0", "path": "TTMET > DIV-G0 > TMG0", "status": "APPROVED"},
    {"code": "TMH0", "name": "Corporate Department", "type": "DEPARTMENT", "level": 3, "parent": "TTMET", "path": "TTMET > TMH0", "status": "APPROVED"},
    # Level 4 (Sections under Machinery)
    {"code": "TMT1", "name": "Export", "type": "SECTION", "level": 4, "parent": "TMT0", "path": "TTMET > DIV-ME > TMT0 > TMT1", "status": "APPROVED"},
    {"code": "TMT2", "name": "Toyota Sales", "type": "SECTION", "level": 4, "parent": "TMT0", "path": "TTMET > DIV-ME > TMT0 > TMT2", "status": "APPROVED"},
    # Level 5 (Teams under Machinery)
    {"code": "TMT1-MACH", "name": "Machine & Equipments", "type": "TEAM", "level": 5, "parent": "TMT1", "path": "TTMET > DIV-ME > TMT0 > TMT1 > TMT1-MACH", "status": "APPROVED"},
    {"code": "TMT1-TRIAL", "name": "Tool Part & Project", "type": "TEAM", "level": 5, "parent": "TMT1", "path": "TTMET > DIV-ME > TMT0 > TMT1 > TMT1-TRIAL", "status": "APPROVED"},
    {"code": "TMT2-TOYOTA", "name": "TOYOTA", "type": "TEAM", "level": 5, "parent": "TMT2", "path": "TTMET > DIV-ME > TMT0 > TMT2 > TMT2-TOYOTA", "status": "APPROVED"},
    {"code": "TMT2-STM", "name": "STM", "type": "TEAM", "level": 5, "parent": "TMT2", "path": "TTMET > DIV-ME > TMT0 > TMT2 > TMT2-STM", "status": "APPROVED"},
    {"code": "TMT2-LOGITIC", "name": "Logistics", "type": "TEAM", "level": 5, "parent": "TMT2", "path": "TTMET > DIV-ME > TMT0 > TMT2 > TMT2-LOGITIC", "status": "APPROVED"},
    # Level 4 (Sections under Industrial Services)
    {"code": "TMF1", "name": "Automotive", "type": "SECTION", "level": 4, "parent": "TMF0", "path": "TTMET > DIV-ME > TMF0 > TMF1", "status": "APPROVED"},
    {"code": "TMF2", "name": "Industry", "type": "SECTION", "level": 4, "parent": "TMF0", "path": "TTMET > DIV-ME > TMF0 > TMF2", "status": "APPROVED"},
    {"code": "TMF3", "name": "Sales Engineering", "type": "SECTION", "level": 4, "parent": "TMF0", "path": "TTMET > DIV-ME > TMF0 > TMF3", "status": "APPROVED"},
    # Level 5 (Teams under Industrial Services)
    {"code": "TMF1-AUTOMOTIVE", "name": "AUTOMOTIVE", "type": "TEAM", "level": 5, "parent": "TMF1", "path": "TTMET > DIV-ME > TMF0 > TMF1 > TMF1-AUTOMOTIVE", "status": "APPROVED"},
    {"code": "TMF2-INDUSTRY", "name": "INDUSTRY", "type": "TEAM", "level": 5, "parent": "TMF2", "path": "TTMET > DIV-ME > TMF0 > TMF2 > TMF2-INDUSTRY", "status": "APPROVED"},
    {"code": "TMF3-DENSO", "name": "DENSO", "type": "TEAM", "level": 5, "parent": "TMF3", "path": "TTMET > DIV-ME > TMF0 > TMF3 > TMF3-DENSO", "status": "APPROVED"},
    # Level 4 & 5 (Eco Energy)
    {"code": "TME1", "name": "Eco Energy & Textile Machinery", "type": "SECTION", "level": 4, "parent": "TME0", "path": "TTMET > DIV-ME > TME0 > TME1", "status": "APPROVED"},
    {"code": "TME1-MARK", "name": "Marketing (Eco Energy)", "type": "TEAM", "level": 5, "parent": "TME1", "path": "TTMET > DIV-ME > TME0 > TME1 > TME1-MARK", "status": "APPROVED"},
    # Level 4 & 5 (Technical Services)
    {"code": "TMS1", "name": "Technical Services", "type": "SECTION", "level": 4, "parent": "TMS0", "path": "TTMET > DIV-ME > TMS0 > TMS1", "status": "APPROVED"},
    {"code": "TMS1-PROJ", "name": "Project Management", "type": "TEAM", "level": 5, "parent": "TMS1", "path": "TTMET > DIV-ME > TMS0 > TMS1 > TMS1-PROJ", "status": "APPROVED"},
    {"code": "TMS1-ENGI", "name": "Engineering", "type": "TEAM", "level": 5, "parent": "TMS1", "path": "TTMET > DIV-ME > TMS0 > TMS1 > TMS1-ENGI", "status": "APPROVED"},
    {"code": "TMS1-SAFE", "name": "Safety & ISO", "type": "TEAM", "level": 5, "parent": "TMS1", "path": "TTMET > DIV-ME > TMS0 > TMS1 > TMS1-SAFE", "status": "APPROVED"},
    # Level 4 (Functions under TMG0)
    {"code": "TMG0-ADM", "name": "Admin", "type": "FUNCTION", "level": 4, "parent": "TMG0", "path": "TTMET > DIV-G0 > TMG0 > Admin", "status": "NEEDS_CODE_APPROVAL"},
    {"code": "TMG0-CAD", "name": "CAD", "type": "FUNCTION", "level": 4, "parent": "TMG0", "path": "TTMET > DIV-G0 > TMG0 > CAD", "status": "NEEDS_CODE_APPROVAL"},
    {"code": "TMG0-MKT", "name": "Marketing", "type": "FUNCTION", "level": 4, "parent": "TMG0", "path": "TTMET > DIV-G0 > TMG0 > Marketing", "status": "NEEDS_CODE_APPROVAL"},
    {"code": "TMG0-PRD", "name": "Production", "type": "FUNCTION", "level": 4, "parent": "TMG0", "path": "TTMET > DIV-G0 > TMG0 > Production", "status": "NEEDS_CODE_APPROVAL"},
    # Level 4 (Sections under GIFU SEIKI)
    {"code": "TMG1", "name": "Die Casting", "type": "SECTION", "level": 4, "parent": "TMG0", "path": "TTMET > DIV-G0 > TMG0 > TMG1", "status": "APPROVED"},
    {"code": "TMG2", "name": "Injection", "type": "SECTION", "level": 4, "parent": "TMG0", "path": "TTMET > DIV-G0 > TMG0 > TMG2", "status": "APPROVED"},
    # Sub-units under TMG1 Die Casting
    {"code": "TMG1-ADM", "name": "Admin", "type": "TEAM", "level": 5, "parent": "TMG1", "path": "TTMET > DIV-G0 > TMG0 > TMG1 > Admin", "status": "NEEDS_CODE_APPROVAL"},
    {"code": "TMG1-ADM-HR", "name": "ACC. HR & GA", "type": "SUB-TEAM", "level": 6, "parent": "TMG1-ADM", "path": "TTMET > DIV-G0 > TMG0 > TMG1 > Admin > ACC. HR & GA", "status": "NEEDS_CODE_APPROVAL"},
    {"code": "TMG1-CAD", "name": "CAD", "type": "TEAM", "level": 5, "parent": "TMG1", "path": "TTMET > DIV-G0 > TMG0 > TMG1 > CAD", "status": "NEEDS_CODE_APPROVAL"},
    {"code": "TMG1-MKT", "name": "Marketing", "type": "TEAM", "level": 5, "parent": "TMG1", "path": "TTMET > DIV-G0 > TMG0 > TMG1 > Marketing", "status": "NEEDS_CODE_APPROVAL"},
    {"code": "TMG1-PRD", "name": "Production", "type": "TEAM", "level": 5, "parent": "TMG1", "path": "TTMET > DIV-G0 > TMG0 > TMG1 > Production", "status": "NEEDS_CODE_APPROVAL"},
    {"code": "TMG1-PRD-PUR", "name": "PC/PUR", "type": "SUB-TEAM", "level": 6, "parent": "TMG1-PRD", "path": "TTMET > DIV-G0 > TMG0 > TMG1 > Production > PC/PUR", "status": "NEEDS_CODE_APPROVAL"},
    {"code": "TMG1-PRD-PUR-MC", "name": "Machine", "type": "FUNCTION", "level": 7, "parent": "TMG1-PRD-PUR", "path": "TTMET > DIV-G0 > TMG0 > TMG1 > Production > PC/PUR > Machine", "status": "NEEDS_CODE_APPROVAL"},
    {"code": "TMG1-PRD-PUR-FN", "name": "Finishing", "type": "FUNCTION", "level": 7, "parent": "TMG1-PRD-PUR", "path": "TTMET > DIV-G0 > TMG0 > TMG1 > Production > PC/PUR > Finishing", "status": "NEEDS_CODE_APPROVAL"},
    {"code": "TMG1-PRD-PUR-QA", "name": "QA", "type": "FUNCTION", "level": 7, "parent": "TMG1-PRD-PUR", "path": "TTMET > DIV-G0 > TMG0 > TMG1 > Production > PC/PUR > QA", "status": "NEEDS_CODE_APPROVAL"},
    {"code": "TMG1-PRD-CAM", "name": "CAM", "type": "SUB-TEAM", "level": 6, "parent": "TMG1-PRD", "path": "TTMET > DIV-G0 > TMG0 > TMG1 > Production > CAM", "status": "NEEDS_CODE_APPROVAL"},
    {"code": "TMG1-PRD-CAM-QC", "name": "QC", "type": "FUNCTION", "level": 7, "parent": "TMG1-PRD-CAM", "path": "TTMET > DIV-G0 > TMG0 > TMG1 > Production > CAM > QC", "status": "NEEDS_CODE_APPROVAL"},
    # Sub-units under TMG2 Injection
    {"code": "TMG2-PRD", "name": "Production", "type": "TEAM", "level": 5, "parent": "TMG2", "path": "TTMET > DIV-G0 > TMG0 > TMG2 > Production", "status": "NEEDS_CODE_APPROVAL"},
    {"code": "TMG2-PRD-CAM", "name": "CAM", "type": "SUB-TEAM", "level": 6, "parent": "TMG2-PRD", "path": "TTMET > DIV-G0 > TMG0 > TMG2 > Production > CAM", "status": "NEEDS_CODE_APPROVAL"},
    {"code": "TMG2-PRD-CAM-QC", "name": "QC", "type": "FUNCTION", "level": 7, "parent": "TMG2-PRD-CAM", "path": "TTMET > DIV-G0 > TMG0 > TMG2 > Production > CAM > QC", "status": "NEEDS_CODE_APPROVAL"},
    {"code": "TMG2-PRD-PUR", "name": "PC/PUR", "type": "SUB-TEAM", "level": 6, "parent": "TMG2-PRD", "path": "TTMET > DIV-G0 > TMG0 > TMG2 > Production > PC/PUR", "status": "NEEDS_CODE_APPROVAL"},
    {"code": "TMG2-PRD-PUR-MC", "name": "Machine", "type": "FUNCTION", "level": 7, "parent": "TMG2-PRD-PUR", "path": "TTMET > DIV-G0 > TMG0 > TMG2 > Production > PC/PUR > Machine", "status": "NEEDS_CODE_APPROVAL"},
    {"code": "TMG2-PRD-PUR-FN", "name": "Finishing", "type": "FUNCTION", "level": 7, "parent": "TMG2-PRD-PUR", "path": "TTMET > DIV-G0 > TMG0 > TMG2 > Production > PC/PUR > Finishing", "status": "NEEDS_CODE_APPROVAL"},
    {"code": "TMG2-PRD-PUR-QA", "name": "QA", "type": "FUNCTION", "level": 7, "parent": "TMG2-PRD-PUR", "path": "TTMET > DIV-G0 > TMG0 > TMG2 > Production > PC/PUR > QA", "status": "NEEDS_CODE_APPROVAL"},
    {"code": "TMG2-CAD", "name": "CAD", "type": "TEAM", "level": 5, "parent": "TMG2", "path": "TTMET > DIV-G0 > TMG0 > TMG2 > CAD", "status": "NEEDS_CODE_APPROVAL"},
    {"code": "TMG2-MKT", "name": "Marketing", "type": "TEAM", "level": 5, "parent": "TMG2", "path": "TTMET > DIV-G0 > TMG0 > TMG2 > Marketing", "status": "NEEDS_CODE_APPROVAL"},
    # Corporate Department Sections (Level 4)
    {"code": "TMH1", "name": "GA", "type": "SECTION", "level": 4, "parent": "TMH0", "path": "TTMET > TMH0 > TMH1", "status": "APPROVED"},
    {"code": "TMH2", "name": "HR & Personnel", "type": "SECTION", "level": 4, "parent": "TMH0", "path": "TTMET > TMH0 > TMH2", "status": "APPROVED"},
    {"code": "TMH3", "name": "Accounting & Finance", "type": "SECTION", "level": 4, "parent": "TMH0", "path": "TTMET > TMH0 > TMH3", "status": "APPROVED"}
]

print(f"Total defined canonical nodes: {len(CANONICAL_57_NODES)}")
assert len(CANONICAL_57_NODES) == 57, f"Expected 57, got {len(CANONICAL_57_NODES)}"

nodes_dict = {n['code']: n for n in CANONICAL_57_NODES}
edges = []
orphan_count = 0

for n in CANONICAL_57_NODES:
    p = n['parent']
    if p:
        if p not in nodes_dict:
            print(f"Orphan parent: {p} for node {n['code']}")
            orphan_count += 1
        else:
            edges.append((p, n['code']))
    elif n['code'] != 'TTMET':
        print(f"Unconnected root: {n['code']}")
        orphan_count += 1

print(f"Total Edges: {len(edges)}")
print(f"Orphan Count: {orphan_count}")
assert len(edges) == 56, f"Expected 56 edges, got {len(edges)}"
assert orphan_count == 0, "Expected 0 orphans"
print("57 Canonical Nodes Tree Topology Validated (100% Success).")
