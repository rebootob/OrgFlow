import json
import os

with open("docs/FINAL_HUMAN_REVIEW_PREVIEW.json", "r", encoding="utf-8") as f:
    app792_data = json.load(f)

# High-precision dictionary of individuals from Org.FY2026_Rev.2.pdf
# Each entry is uniquely identified by English Name / First Name / Role
pdf_people = [
    # Top Leadership
    {"name_pattern": "Tsuchihira", "pdf_name": "Mr.Takeshi Tsuchihira", "pdf_pos": "President", "pdf_org": "TTMET", "pdf_org_name": "Toyota Tsusho M&E (Thailand) Co.,Ltd.", "acting": False},
    {"name_pattern": "Somrudee", "pdf_name": "Ms.Somrudee Pannoo", "pdf_pos": "Vice President", "pdf_org": "DIV-ME", "pdf_org_name": "Machinery & Engineering Division", "acting": False, "concurrent": "TME0 (GM Acting)"},
    {"name_pattern": "Uchida", "pdf_name": "Mr.Takayoshi Uchida", "pdf_pos": "Vice President", "pdf_org": "DIV-G0", "pdf_org_name": "GIFU SEIKI Division", "acting": False, "concurrent": "TMG0 (GM Acting)"},
    {"name_pattern": "Hanamura", "pdf_name": "Mr.Hanamura", "pdf_pos": "Factory Manager", "pdf_org": "TMG0", "pdf_org_name": "Mold & Engineering Department", "acting": False},
    
    # Machinery Dept (TMT0)
    {"name_pattern": "Weerakul", "pdf_name": "Mr.Weerakul Charoenkul", "pdf_pos": "Deputy General Manager", "pdf_org": "TMT0", "pdf_org_name": "Machinery Department", "acting": False},
    {"name_pattern": "Darat", "pdf_name": "Ms.Darat Pornchuenchuwong", "pdf_pos": "Deputy General Manager", "pdf_org": "TMT0", "pdf_org_name": "Machinery Department", "acting": False, "concurrent": "TMT2 (Manager Acting)"},
    {"name_pattern": "Munenobu  Sato", "pdf_name": "Mr.Munenobu Sato", "pdf_pos": "Co - General Manager", "pdf_org": "TMT0", "pdf_org_name": "Machinery Department", "acting": False},
    {"name_pattern": "Keisuke  Shigeta", "pdf_name": "Mr.Keisuke Shigeta", "pdf_pos": "Senior Advisor", "pdf_org": "TMT0", "pdf_org_name": "Machinery Department", "acting": False},
    {"name_pattern": "Kondo", "pdf_name": "Mr.Kondo", "pdf_pos": "Coordinator", "pdf_org": "TMT0", "pdf_org_name": "Machinery Department", "acting": False},
    {"name_pattern": "Ueno", "pdf_name": "Mr.Ueno", "pdf_pos": "Coordinator", "pdf_org": "TMT0", "pdf_org_name": "Machinery Department", "acting": False},
    {"name_pattern": "Azumi", "pdf_name": "Mr.Masahito Azumi", "pdf_pos": "Coordinator", "pdf_org": "TMT0", "pdf_org_name": "Machinery Department", "acting": False},

    # Export (TMT1)
    {"name_pattern": "Pitchayadol", "pdf_name": "Mr.Pitchayadol", "pdf_pos": "Manager", "pdf_org": "TMT1", "pdf_org_name": "Export", "acting": False},
    {"name_pattern": "Athasit", "pdf_name": "Mr.Athasit", "pdf_pos": "Assistant Manager", "pdf_org": "TMT1", "pdf_org_name": "Export", "acting": False},
    {"name_pattern": "Narisara", "pdf_name": "Ms.Narisara", "pdf_pos": "Chief", "pdf_org": "TMT1", "pdf_org_name": "Export", "acting": False},
    {"name_pattern": "Krisana", "pdf_name": "Mr.Krisana", "pdf_pos": "Assistant Manager", "pdf_org": "TMT1", "pdf_org_name": "Export", "acting": False},
    {"name_pattern": "Warathan", "pdf_name": "Ms.Warathan", "pdf_pos": "Chief", "pdf_org": "TMT1", "pdf_org_name": "Export", "acting": False},
    {"name_pattern": "Laksami", "pdf_name": "Ms.Laksami", "pdf_pos": "Chief", "pdf_org": "TMT1", "pdf_org_name": "Export", "acting": False},
    {"name_pattern": "Radeemas", "pdf_name": "Ms.Radeemas", "pdf_pos": "Staff", "pdf_org": "TMT1", "pdf_org_name": "Export", "acting": False},
    {"name_pattern": "Araya", "pdf_name": "Ms.Araya", "pdf_pos": "Manager", "pdf_org": "TMT1", "pdf_org_name": "Export", "acting": False},

    # Toyota Sales (TMT2)
    {"name_pattern": "Phitchakarn", "pdf_name": "Ms.Phitchakarn", "pdf_pos": "Assistant Manager", "pdf_org": "TMT2", "pdf_org_name": "Toyota Sales", "acting": False},
    {"name_pattern": "Nuttanun", "pdf_name": "Mr.Nuttanan", "pdf_pos": "Chief", "pdf_org": "TMT2", "pdf_org_name": "Toyota Sales", "acting": False},
    {"name_pattern": "Bunyisa", "pdf_name": "Ms.Bunyisa", "pdf_pos": "Chief", "pdf_org": "TMT2", "pdf_org_name": "Toyota Sales", "acting": False},
    {"name_pattern": "Nattapol", "pdf_name": "Mr.Nattapol", "pdf_pos": "Chief", "pdf_org": "TMT2", "pdf_org_name": "Toyota Sales", "acting": False},
    {"name_pattern": "Thanut", "pdf_name": "Mr.Thanut", "pdf_pos": "Chief", "pdf_org": "TMT2", "pdf_org_name": "Toyota Sales", "acting": False},
    {"name_pattern": "Somphort", "pdf_name": "Mr.Somphort", "pdf_pos": "Assistant Manager", "pdf_org": "TMT2", "pdf_org_name": "Toyota Sales", "acting": False},
    {"name_pattern": "Salisa", "pdf_name": "Ms.Salisa", "pdf_pos": "Chief", "pdf_org": "TMT2", "pdf_org_name": "Toyota Sales", "acting": False},
    {"name_pattern": "Sorasit", "pdf_name": "Ms.Sorasit", "pdf_pos": "Chief", "pdf_org": "TMT2", "pdf_org_name": "Toyota Sales", "acting": False},
    {"name_pattern": "Rossarin  Injun", "pdf_name": "Ms.Rossarin Injun", "pdf_pos": "Chief", "pdf_org": "TMT2", "pdf_org_name": "Toyota Sales", "acting": False},
    {"name_pattern": "Thantanada", "pdf_name": "Ms.Thantanada", "pdf_pos": "Assistant Manager", "pdf_org": "TMT2", "pdf_org_name": "Toyota Sales", "acting": False},
    {"name_pattern": "Saowanee", "pdf_name": "Ms.Saowanee", "pdf_pos": "Chief", "pdf_org": "TMT2", "pdf_org_name": "Toyota Sales", "acting": False},
    {"name_pattern": "Wanichawan", "pdf_name": "Ms.Wanichawan", "pdf_pos": "Chief", "pdf_org": "TMT2", "pdf_org_name": "Toyota Sales", "acting": False},
    {"name_pattern": "Kewalin", "pdf_name": "Ms.Kewalin", "pdf_pos": "Staff", "pdf_org": "TMT2", "pdf_org_name": "Toyota Sales", "acting": False},

    # Industrial Services Dept (TMF0)
    {"name_pattern": "Kito", "pdf_name": "Mr.Kito", "pdf_pos": "General Manager", "pdf_org": "TMF0", "pdf_org_name": "Industrial Services Department", "acting": False},
    {"name_pattern": "Vassana", "pdf_name": "Ms.Vassana Maenthong", "pdf_pos": "Deputy General Manager", "pdf_org": "TMF0", "pdf_org_name": "Industrial Services Department", "acting": False, "concurrent": "TMF2 (Manager Acting)"},

    # Automotive (TMF1)
    {"name_pattern": "Kritsada", "pdf_name": "Mr.Kritsada", "pdf_pos": "Manager", "pdf_org": "TMF1", "pdf_org_name": "Automotive", "acting": False},
    {"name_pattern": "Pawee", "pdf_name": "Mr.Pawee", "pdf_pos": "Chief", "pdf_org": "TMF1", "pdf_org_name": "Automotive", "acting": False},
    {"name_pattern": "Kamonwan", "pdf_name": "Ms.Kamonwan", "pdf_pos": "Staff", "pdf_org": "TMF1", "pdf_org_name": "Automotive", "acting": False},
    {"name_pattern": "Aonanong", "pdf_name": "Ms.Aonanong", "pdf_pos": "Staff", "pdf_org": "TMF1", "pdf_org_name": "Automotive", "acting": False},
    {"name_pattern": "Pannipa", "pdf_name": "Ms.Pannipa", "pdf_pos": "Staff", "pdf_org": "TMF1", "pdf_org_name": "Automotive", "acting": False},
    {"name_pattern": "Wilailak", "pdf_name": "Ms.Wilailak", "pdf_pos": "Chief", "pdf_org": "TMF1", "pdf_org_name": "Automotive", "acting": False},
    {"name_pattern": "Jirawat", "pdf_name": "Ms.Jirawat", "pdf_pos": "Chief", "pdf_org": "TMF1", "pdf_org_name": "Automotive", "acting": False},
    {"name_pattern": "Yanisa", "pdf_name": "Ms.Yanisa", "pdf_pos": "Staff", "pdf_org": "TMF1", "pdf_org_name": "Automotive", "acting": False},

    # Industry (TMF2)
    {"name_pattern": "Chuleeporn", "pdf_name": "Ms.Chuleeporn", "pdf_pos": "Assistant Manager", "pdf_org": "TMF2", "pdf_org_name": "Industry", "acting": False},
    {"name_pattern": "Promsiri", "pdf_name": "Ms.Promsiri", "pdf_pos": "Staff", "pdf_org": "TMF2", "pdf_org_name": "Industry", "acting": False},
    {"name_pattern": "Rinradee", "pdf_name": "Ms.Rinradee", "pdf_pos": "Staff", "pdf_org": "TMF2", "pdf_org_name": "Industry", "acting": False},
    {"name_pattern": "Phitthayaporn", "pdf_name": "Ms.Phitthayaporn", "pdf_pos": "Staff", "pdf_org": "TMF2", "pdf_org_name": "Industry", "acting": False},
    {"name_pattern": "Patcharida", "pdf_name": "Ms.Patcharida", "pdf_pos": "Staff", "pdf_org": "TMF2", "pdf_org_name": "Industry", "acting": False},
    {"name_pattern": "Jutarat", "pdf_name": "Ms.Jutarat", "pdf_pos": "Chief", "pdf_org": "TMF2", "pdf_org_name": "Industry", "acting": False},
    {"name_pattern": "Rattanaphorn", "pdf_name": "Ms.Rattanaphorn", "pdf_pos": "Staff", "pdf_org": "TMF2", "pdf_org_name": "Industry", "acting": False},

    # Sales Engineering (TMF3)
    {"name_pattern": "Worapat", "pdf_name": "Mr.Worapat", "pdf_pos": "Manager", "pdf_org": "TMF3", "pdf_org_name": "Sales Engineering", "acting": False},
    {"name_pattern": "Sira", "pdf_name": "Mr.Sira", "pdf_pos": "Chief", "pdf_org": "TMF3", "pdf_org_name": "Sales Engineering", "acting": False},
    {"name_pattern": "Suthada", "pdf_name": "Ms.Suthada", "pdf_pos": "Chief", "pdf_org": "TMF3", "pdf_org_name": "Sales Engineering", "acting": False},
    {"name_pattern": "Rossarin  Saelim", "pdf_name": "Ms.Rossarin Saelim", "pdf_pos": "Staff", "pdf_org": "TMF3", "pdf_org_name": "Sales Engineering", "acting": False},
    {"name_pattern": "Anochai", "pdf_name": "Mr.Anochai", "pdf_pos": "Staff", "pdf_org": "TMF3", "pdf_org_name": "Sales Engineering", "acting": False},
    {"name_pattern": "Siriwimon", "pdf_name": "Ms.Siriwimon", "pdf_pos": "Staff", "pdf_org": "TMF3", "pdf_org_name": "Sales Engineering", "acting": False},
    {"name_pattern": "Phithakchai", "pdf_name": "Mr.Phithakchai", "pdf_pos": "Staff", "pdf_org": "TMF3", "pdf_org_name": "Sales Engineering", "acting": False},
    {"name_pattern": "Chaiyuth", "pdf_name": "Mr.Chaiyuth", "pdf_pos": "Staff", "pdf_org": "TMF3", "pdf_org_name": "Sales Engineering", "acting": False},
    {"name_pattern": "Chayanoot", "pdf_name": "Ms.Chayanoot", "pdf_pos": "Chief", "pdf_org": "TMF3", "pdf_org_name": "Sales Engineering", "acting": False},

    # Eco Energy (TME1)
    {"name_pattern": "Suthas", "pdf_name": "Mr.Suthas", "pdf_pos": "Manager", "pdf_org": "TME1", "pdf_org_name": "Eco Energy & Textile Machinery", "acting": False},
    {"name_pattern": "Voraprus", "pdf_name": "Mr.Voraprus", "pdf_pos": "Manager", "pdf_org": "TME1", "pdf_org_name": "Eco Energy & Textile Machinery", "acting": False},
    {"name_pattern": "Gritchai", "pdf_name": "Mr.Gritchai", "pdf_pos": "Chief", "pdf_org": "TME1", "pdf_org_name": "Eco Energy & Textile Machinery", "acting": False},
    {"name_pattern": "Tammarat", "pdf_name": "Mr.Tammarat", "pdf_pos": "Staff", "pdf_org": "TME1", "pdf_org_name": "Eco Energy & Textile Machinery", "acting": False},
    {"name_pattern": "Natthawut  Kaewkangwan", "pdf_name": "Mr.Natthawut Kaewkangwan", "pdf_pos": "Staff", "pdf_org": "TME1", "pdf_org_name": "Eco Energy & Textile Machinery", "acting": False},
    {"name_pattern": "Priyanat", "pdf_name": "Ms.Priyanat", "pdf_pos": "Assistant Manager", "pdf_org": "TME1", "pdf_org_name": "Eco Energy & Textile Machinery", "acting": False},

    # Technical Services (TMS0 / TMS1)
    {"name_pattern": "Makino", "pdf_name": "Mr.Shiichi Makino", "pdf_pos": "General Manager", "pdf_org": "TMS0", "pdf_org_name": "Technical Services Department", "acting": False},
    {"name_pattern": "Satit", "pdf_name": "Mr.Satit", "pdf_pos": "Senior Manager", "pdf_org": "TMS1", "pdf_org_name": "Technical Services", "acting": False},
    {"name_pattern": "Surat", "pdf_name": "Mr.Surat", "pdf_pos": "Assistant Manager", "pdf_org": "TMS1", "pdf_org_name": "Technical Services", "acting": False},
    {"name_pattern": "Narong", "pdf_name": "Mr.Narong", "pdf_pos": "Assistant Manager", "pdf_org": "TMS1", "pdf_org_name": "Technical Services", "acting": False},
    {"name_pattern": "Noppanan", "pdf_name": "Mr.Noppanan", "pdf_pos": "Assistant Manager", "pdf_org": "TMS1", "pdf_org_name": "Technical Services", "acting": False},
    {"name_pattern": "Sarunyoo", "pdf_name": "Mr.Sarunyoo", "pdf_pos": "Chief", "pdf_org": "TMS1", "pdf_org_name": "Technical Services", "acting": False},
    {"name_pattern": "Suthon", "pdf_name": "Mr.Suthon", "pdf_pos": "Chief", "pdf_org": "TMS1", "pdf_org_name": "Technical Services", "acting": False},
    {"name_pattern": "Peranut", "pdf_name": "Mr.Peranut", "pdf_pos": "Chief", "pdf_org": "TMS1", "pdf_org_name": "Technical Services", "acting": False},
    {"name_pattern": "Somsak", "pdf_name": "Mr.Somsak", "pdf_pos": "Chief", "pdf_org": "TMS1", "pdf_org_name": "Technical Services", "acting": False},
    {"name_pattern": "Keerati", "pdf_name": "Mr.Keerati", "pdf_pos": "Chief", "pdf_org": "TMS1", "pdf_org_name": "Technical Services", "acting": False},
    {"name_pattern": "Theerapong", "pdf_name": "Mr.Theerapong", "pdf_pos": "Chief", "pdf_org": "TMS1", "pdf_org_name": "Technical Services", "acting": False},
    {"name_pattern": "Akarapoom", "pdf_name": "Mr.Akarapoom", "pdf_pos": "Chief", "pdf_org": "TMS1", "pdf_org_name": "Technical Services", "acting": False},
    {"name_pattern": "Sakchai", "pdf_name": "Mr.Sakchai", "pdf_pos": "Chief", "pdf_org": "TMS1", "pdf_org_name": "Technical Services", "acting": False},
    {"name_pattern": "Nittaya", "pdf_name": "Ms.Nittaya", "pdf_pos": "Chief", "pdf_org": "TMS1", "pdf_org_name": "Technical Services", "acting": False},
    {"name_pattern": "Narasak", "pdf_name": "Mr.Narasak", "pdf_pos": "Staff", "pdf_org": "TMS1", "pdf_org_name": "Technical Services", "acting": False},
    {"name_pattern": "Samart", "pdf_name": "Mr.Samart", "pdf_pos": "Staff", "pdf_org": "TMS1", "pdf_org_name": "Technical Services", "acting": False},
    {"name_pattern": "Trairat", "pdf_name": "Mr.Trairat", "pdf_pos": "Staff", "pdf_org": "TMS1", "pdf_org_name": "Technical Services", "acting": False},
    {"name_pattern": "Akarawit", "pdf_name": "Mr.Akarawit", "pdf_pos": "Staff", "pdf_org": "TMS1", "pdf_org_name": "Technical Services", "acting": False},
    {"name_pattern": "Kiadtisak", "pdf_name": "Mr.Kiadtisak", "pdf_pos": "Staff", "pdf_org": "TMS1", "pdf_org_name": "Technical Services", "acting": False},
    {"name_pattern": "Anucha", "pdf_name": "Mr.Anucha", "pdf_pos": "Technician", "pdf_org": "TMS1", "pdf_org_name": "Technical Services", "acting": False},
    {"name_pattern": "Penpichar", "pdf_name": "Ms.Penpichar", "pdf_pos": "Safety Officer", "pdf_org": "TMS1", "pdf_org_name": "Technical Services", "acting": False},
    {"name_pattern": "Dujrudee", "pdf_name": "Ms.Dujrudee", "pdf_pos": "Assistant Manager", "pdf_org": "TMS1", "pdf_org_name": "Technical Services", "acting": False},
    {"name_pattern": "Sopida", "pdf_name": "Ms.Sopida", "pdf_pos": "Staff", "pdf_org": "TMS1", "pdf_org_name": "Technical Services", "acting": False},

    # Corporate Dept (TMH0 / TMH1 / TMH2 / TMH3)
    {"name_pattern": "Chvitsara", "pdf_name": "Ms.Chvitsara", "pdf_pos": "General Manager", "pdf_org": "TMH0", "pdf_org_name": "Corporate Department", "acting": False},
    {"name_pattern": "Supparat", "pdf_name": "Ms.Supparat", "pdf_pos": "Manager", "pdf_org": "TMH1", "pdf_org_name": "GA", "acting": False},
    {"name_pattern": "Pattananrat", "pdf_name": "Mrs.Pattananrat", "pdf_pos": "Assistant Manager", "pdf_org": "TMH1", "pdf_org_name": "GA", "acting": False},
    {"name_pattern": "Chitchaiya", "pdf_name": "Mr.Chitchaiya", "pdf_pos": "Staff", "pdf_org": "TMH1", "pdf_org_name": "GA", "acting": False},
    {"name_pattern": "Papatchaya", "pdf_name": "Ms.Papatchaya", "pdf_pos": "Manager", "pdf_org": "TMH2", "pdf_org_name": "HR & Personnel", "acting": False},
    {"name_pattern": "Prajak", "pdf_name": "Mr.Prajak", "pdf_pos": "Staff", "pdf_org": "TMH2", "pdf_org_name": "HR & Personnel", "acting": False},
    {"name_pattern": "Chatrawee", "pdf_name": "Ms.Chatrawee", "pdf_pos": "Manager", "pdf_org": "TMH3", "pdf_org_name": "Accounting & Finance", "acting": False},
    {"name_pattern": "Nirada", "pdf_name": "Mrs.Nirada", "pdf_pos": "Chief", "pdf_org": "TMH3", "pdf_org_name": "Accounting & Finance", "acting": False},
    {"name_pattern": "Thanthip", "pdf_name": "Ms.Thanthip", "pdf_pos": "Staff", "pdf_org": "TMH3", "pdf_org_name": "Accounting & Finance", "acting": False},
    {"name_pattern": "Gallaya", "pdf_name": "Ms.Gallaya", "pdf_pos": "Staff", "pdf_org": "TMH3", "pdf_org_name": "Accounting & Finance", "acting": False},

    # GIFU (TMG0 / TMG1 / TMG2)
    {"name_pattern": "Amporn", "pdf_name": "Ms.Amporn", "pdf_pos": "Manager", "pdf_org": "TMG1", "pdf_org_name": "Die Casting", "acting": False},
    {"name_pattern": "Phubodin", "pdf_name": "Mr.Phubodin", "pdf_pos": "Manager", "pdf_org": "TMG1", "pdf_org_name": "Die Casting", "acting": False, "concurrent": "TMG2 (Manager Acting)"},
    {"name_pattern": "Prompan", "pdf_name": "Mr.Prompan", "pdf_pos": "Manager", "pdf_org": "TMG1", "pdf_org_name": "Die Casting", "acting": False, "concurrent": "TMG2 (Manager Acting)"},
    {"name_pattern": "Pitinon", "pdf_name": "Mr.Pitinon", "pdf_pos": "Assistant Manager", "pdf_org": "TMG1", "pdf_org_name": "Die Casting", "acting": False, "concurrent": "TMG2 (Asst. Manager Acting)"},
    {"name_pattern": "Wannapa", "pdf_name": "Ms.Wannapa", "pdf_pos": "Assistant Chief", "pdf_org": "TMG1", "pdf_org_name": "Die Casting", "acting": False},
    {"name_pattern": "Kanjana", "pdf_name": "Ms.Kanjana", "pdf_pos": "Staff", "pdf_org": "TMG1", "pdf_org_name": "Die Casting", "acting": False},
    {"name_pattern": "Watcharin", "pdf_name": "Mr.Watcharin", "pdf_pos": "Chief", "pdf_org": "TMG1", "pdf_org_name": "Die Casting", "acting": False},
    {"name_pattern": "Piengtawan", "pdf_name": "Mr.Piengtawan", "pdf_pos": "Staff", "pdf_org": "TMG1", "pdf_org_name": "Die Casting", "acting": False},
    {"name_pattern": "Chananthorn", "pdf_name": "Ms.Chananthorn", "pdf_pos": "Staff", "pdf_org": "TMG1", "pdf_org_name": "Die Casting", "acting": False},
    {"name_pattern": "Wanida", "pdf_name": "Ms.Wanida", "pdf_pos": "Chief", "pdf_org": "TMG2", "pdf_org_name": "Injection", "acting": False},
    {"name_pattern": "Mudsaya", "pdf_name": "Ms.Mudsaya", "pdf_pos": "Assistant Chief", "pdf_org": "TMG2", "pdf_org_name": "Injection", "acting": False},
    {"name_pattern": "Piyaphorn", "pdf_name": "Ms.Piyaphorn", "pdf_pos": "Safety Officer", "pdf_org": "TMG0", "pdf_org_name": "Mold & Engineering Department", "acting": True}
]

# Run Cross-Validation
matrix = []
exceptions = []

for emp in app792_data:
    emp_id = emp["employee_id"]
    en_name = emp["english_name"]
    th_name = emp["thai_name"]
    raw_pos = emp["raw_pos"]
    cur_pos = emp["canonical_pos_name"]
    cur_pos_code = emp["canonical_pos_code"]
    cur_org = emp["org_code"]
    cur_org_name = emp["org_name"]

    matched_pdf = None
    for p in pdf_people:
        if p["name_pattern"].lower() in en_name.lower():
            matched_pdf = p
            break

    if matched_pdf:
        exp_pos = matched_pdf["pdf_pos"]
        exp_org = matched_pdf["pdf_org"]
        exp_org_name = matched_pdf["pdf_org_name"]

        pos_ok = (cur_pos.lower() == exp_pos.lower() or 
                  (exp_pos == 'Staff' and 'staff' in cur_pos.lower()) or
                  (exp_pos == 'Manager' and 'manager' in cur_pos.lower() and 'assistant' not in cur_pos.lower() and 'general' not in cur_pos.lower()) or
                  (exp_pos == 'Deputy General Manager' and cur_pos == 'Deputy General Manager') or
                  (exp_pos == 'General Manager' and cur_pos == 'General Manager') or
                  (exp_pos == 'Vice President' and cur_pos == 'Vice President') or
                  (exp_pos == 'President' and cur_pos == 'President') or
                  (exp_pos == 'Coordinator' and cur_pos == 'Coordinator') or
                  (exp_pos == 'Chief' and 'chief' in cur_pos.lower()) or
                  (exp_pos == 'Assistant Manager' and cur_pos == 'Assistant Manager') or
                  (exp_pos == 'Senior Manager' and cur_pos == 'Senior Manager') or
                  (exp_pos == 'Safety Officer' and cur_pos == 'Safety Officer') or
                  (exp_pos == 'Technician' and cur_pos == 'Technician'))

        org_ok = (cur_org == exp_org)

        if pos_ok and org_ok:
            res = "MATCH"
        elif not pos_ok and org_ok:
            res = "POSITION_MISMATCH"
            exceptions.append({
                "employee_id": emp_id,
                "thai_name": th_name,
                "english_name": en_name,
                "app53_pos": raw_pos,
                "current_pos": cur_pos,
                "expected_pos": exp_pos,
                "current_org": cur_org,
                "expected_org": exp_org,
                "problem": "Position Mismatch with PDF",
                "pdf_evidence": f"PDF: {matched_pdf['pdf_name']} - {exp_pos} ({exp_org})",
                "recommendation": f"Update position to {exp_pos}",
                "confidence": "HIGH"
            })
        elif pos_ok and not org_ok:
            res = "ORGANIZATION_MISMATCH"
            exceptions.append({
                "employee_id": emp_id,
                "thai_name": th_name,
                "english_name": en_name,
                "app53_pos": raw_pos,
                "current_pos": cur_pos,
                "expected_pos": exp_pos,
                "current_org": cur_org,
                "expected_org": exp_org,
                "problem": "Organization Mismatch with PDF",
                "pdf_evidence": f"PDF: {matched_pdf['pdf_name']} - {exp_pos} ({exp_org})",
                "recommendation": f"Update organization to {exp_org} ({exp_org_name})",
                "confidence": "HIGH"
            })
        else:
            res = "POSITION_AND_ORG_MISMATCH"
            exceptions.append({
                "employee_id": emp_id,
                "thai_name": th_name,
                "english_name": en_name,
                "app53_pos": raw_pos,
                "current_pos": cur_pos,
                "expected_pos": exp_pos,
                "current_org": cur_org,
                "expected_org": exp_org,
                "problem": "Position and Organization Mismatch with PDF",
                "pdf_evidence": f"PDF: {matched_pdf['pdf_name']} - {exp_pos} ({exp_org})",
                "recommendation": f"Update position to {exp_pos} and organization to {exp_org}",
                "confidence": "HIGH"
            })
    else:
        res = "NOT_IN_PDF"

    matrix.append({
        "employee_id": emp_id,
        "english_name": en_name,
        "pdf_found": "YES" if matched_pdf else "NO",
        "pdf_position": matched_pdf["pdf_pos"] if matched_pdf else "-",
        "pdf_org": matched_pdf["pdf_org"] if matched_pdf else "-",
        "app53_pos": raw_pos,
        "app792_pos": cur_pos,
        "app792_org": cur_org,
        "result": res,
        "confidence": "HIGH" if matched_pdf else "NOT_APPLICABLE"
    })

print(f"Total Employees: {len(matrix)}")
print(f"Named Persons in PDF Matched: {len([m for m in matrix if m['pdf_found'] == 'YES'])}")
print(f"Not Individually in PDF: {len([m for m in matrix if m['pdf_found'] == 'NO'])}")
print(f"Total Real Exceptions: {len(exceptions)}")
print(f"Exact Matches: {len([m for m in matrix if m['result'] == 'MATCH'])}")

with open("docs/PRECISE_PDF_CROSS_VALIDATION_REPORT.json", "w", encoding="utf-8") as f:
    json.dump({"exceptions": exceptions, "matrix": matrix}, f, ensure_ascii=False, indent=2)
