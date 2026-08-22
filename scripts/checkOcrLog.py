import cv2
import json
import os
import numpy as np

# Let's inspect where text is on Org_FY2026_Rev2_rendered.png
img = cv2.imread("docs/Org_FY2026_Rev2_rendered.png")
h, w, _ = img.shape
print(f"Rendered image size: {w}x{h}")

# Let's check task-1467 log if OCR finished
task_log = "C:/Users/allda/.gemini/antigravity/brain/ede66dde-c310-4b05-90de-5bdd89e3ea5d/.system_generated/tasks/task-1467.log"
if os.path.exists(task_log):
    with open(task_log, "r", encoding="utf-8") as f:
        print("Task-1467 log:\n", f.read()[-1000:])
