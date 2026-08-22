import pypdfium2 as pdfium
import json
import os

pdf_path = os.path.join("docs", "Org.FY2026_Rev.2.pdf")
pdf = pdfium.PdfDocument(pdf_path)
print("PDF Page Count:", len(pdf))

for i, page in enumerate(pdf):
    textpage = page.get_textpage()
    text = textpage.get_text_range()
    print(f"=== PAGE {i+1} TEXT ===")
    print(text)
