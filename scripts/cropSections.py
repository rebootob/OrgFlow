from PIL import Image
import os

img = Image.open("docs/Org_FY2026_Rev2_rendered.png")
w, h = img.size
print(f"Image size: {w}x{h}")

# Crop regions:
# Top header & Board: x: 0.3*w to 0.7*w, y: 0 to 0.3*h
# Machinery Dept (TMT0): x: 0.05*w to 0.3*w, y: 0.2*h to 0.8*h
# Industrial Services (TMF0): x: 0.25*w to 0.45*w, y: 0.2*h to 0.8*h
# Eco Energy & Textile (TME0): x: 0.4*w to 0.55*w, y: 0.2*h to 0.8*h
# Technical Services (TMS0): x: 0.5*w to 0.65*w, y: 0.2*h to 0.8*h
# GIFU SEIKI (DIV-G0 / TMG0): x: 0.6*w to 0.9*w, y: 0.2*h to 0.8*h
# Corporate (TMH0): x: 0.85*w to 1.0*w, y: 0.2*h to 0.8*h

crops = {
    "crop_header.png": (int(0.2*w), 0, int(0.8*w), int(0.25*h)),
    "crop_machinery_tmt.png": (int(0.02*w), int(0.2*h), int(0.26*w), int(0.9*h)),
    "crop_industrial_tmf.png": (int(0.24*w), int(0.2*h), int(0.42*w), int(0.9*h)),
    "crop_eco_energy_tme.png": (int(0.40*w), int(0.2*h), int(0.55*w), int(0.9*h)),
    "crop_technical_tms.png": (int(0.52*w), int(0.2*h), int(0.68*w), int(0.9*h)),
    "crop_gifu_tmg.png": (int(0.65*w), int(0.2*h), int(0.88*w), int(0.9*h)),
    "crop_corporate_tmh.png": (int(0.85*w), int(0.2*h), int(0.99*w), int(0.9*h)),
}

for name, box in crops.items():
    c = img.crop(box)
    c.save(os.path.join("docs", name))
    print(f"Saved {name}: {c.size}")
