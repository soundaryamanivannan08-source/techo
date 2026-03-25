import requests
import io
import os
from PIL import Image

# Specific IDs from picsum that match our generic needs for the remaining 4 images
fallback_map = {
    "img_plant.webp": 106,  # bright flowers
    "img_medical.webp": 250, # macro camera / technical looking
    "img_team.webp": 60,    # office workspace
    "img_future.webp": 9    # computer/tech
}

os.makedirs("assets", exist_ok=True)

def process_and_save(img_content, filepath):
    try:
        img = Image.open(io.BytesIO(img_content)).convert("RGB")
        target_width = 1000
        wpercent = (target_width / float(img.size[0]))
        if wpercent < 1.0:
            hsize = int((float(img.size[1]) * float(wpercent)))
            img = img.resize((target_width, hsize), Image.Resampling.LANCZOS)
        
        quality = 85
        while True:
            buffer = io.BytesIO()
            img.save(buffer, format="WEBP", quality=quality)
            size_kb = len(buffer.getvalue()) / 1024
            if size_kb < 95 or quality <= 10:
                with open(os.path.join("assets", filepath), "wb") as f:
                    f.write(buffer.getvalue())
                print(f"Saved {filepath} at {size_kb:.1f}KB")
                break
            quality -= 5
    except Exception as e:
        print(f"Failed to process {filepath}: {e}")

for filename, pid in fallback_map.items():
    print(f"Fetching fallback {pid} for {filename}...")
    url = f"https://picsum.photos/id/{pid}/1200/800"
    img_response = requests.get(url, headers={"User-Agent": "NeoGenix-Bot/1.0"})
    if img_response.status_code == 200:
        process_and_save(img_response.content, filename)
    else:
        print(f"Failed to download image from {url}")

print("Fallback assets generated.")
