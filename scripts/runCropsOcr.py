from paddleocr import PaddleOCR
import os
import json

ocr = PaddleOCR(lang='en')

crop_files = [
    "crop_header.png",
    "crop_machinery_tmt.png",
    "crop_industrial_tmf.png",
    "crop_eco_energy_tme.png",
    "crop_technical_tms.png",
    "crop_gifu_tmg.png",
    "crop_corporate_tmh.png"
]

all_crops_ocr = {}
for cf in crop_files:
    p = os.path.join("docs", cf)
    print(f"\n--- Running OCR on {cf} ---")
    res = ocr.predict(p)
    crop_texts = []
    for r in res:
        rec_texts = r.get('rec_texts', [])
        rec_scores = r.get('rec_scores', [])
        for t, s in zip(rec_texts, rec_scores):
            print(f"  {t} ({s:.2f})")
            crop_texts.append({"text": t, "score": float(s)})
    all_crops_ocr[cf] = crop_texts

out_json = os.path.join("docs", "ALL_CROPS_OCR.json")
with open(out_json, "w", encoding="utf-8") as f:
    json.dump(all_crops_ocr, f, ensure_ascii=False, indent=2)

print(f"\n[PASS] Saved all crop OCR results to {out_json}")
