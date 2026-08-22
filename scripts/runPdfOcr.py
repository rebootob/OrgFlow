from paddleocr import PaddleOCR
import os
import json

img_path = os.path.join("docs", "Org_FY2026_Rev2_rendered.png")
ocr = PaddleOCR(lang='en')
result = ocr.predict(img_path)

ocr_data = []
for res in result:
    # res is a dict or result object
    rec_texts = res.get('rec_texts', [])
    rec_scores = res.get('rec_scores', [])
    rec_polys = res.get('rec_polys', [])
    if hasattr(rec_polys, 'tolist'):
        rec_polys = rec_polys.tolist()
    for txt, score, poly in zip(rec_texts, rec_scores, rec_polys):
        ocr_data.append({
            "text": str(txt),
            "score": float(score),
            "box": poly
        })

out_json = os.path.join("docs", "PDF_OCR_EXTRACTED_DATA.json")
with open(out_json, "w", encoding="utf-8") as f:
    json.dump(ocr_data, f, ensure_ascii=False, indent=2)

print(f"Extracted {len(ocr_data)} OCR text segments. Saved to {out_json}")
for item in ocr_data:
    if "somrudee" in item["text"].lower() or "pannoo" in item["text"].lower() or "vice president" in item["text"].lower() or "president" in item["text"].lower():
        print("MATCH:", item)
