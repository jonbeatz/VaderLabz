"""Remove background from image using rembg core directly."""
import sys
import os
from PIL import Image

# Suppress onnxruntime warnings
os.environ["REMBG_USE_SILICON"] = "0"

from rembg import remove, new_session

input_path = sys.argv[1]
output_path = sys.argv[2] if len(sys.argv) > 2 else os.path.splitext(input_path)[0] + "-nobg.png"

print("Loading rembg AI model (first run downloads model)...")
session = new_session()

with open(input_path, "rb") as f:
    input_data = f.read()

print("Removing background...")
output_data = remove(input_data, session=session)

with open(output_path, "wb") as f:
    f.write(output_data)

print(f"Saved: {output_path}")

# Dark bg preview
img = Image.open(output_path).convert("RGBA")
dark_bg = Image.new("RGBA", img.size, (5, 5, 15, 255))
dark_bg.paste(img, (0, 0), img)
preview_path = os.path.splitext(output_path)[0] + "-on-dark.png"
dark_bg.save(preview_path, "PNG")
print(f"Dark bg preview: {preview_path}")
