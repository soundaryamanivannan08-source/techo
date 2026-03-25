import os
import sys
import subprocess
from io import BytesIO

try:
    from PIL import Image
    import requests
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow", "requests"])
    from PIL import Image
    import requests

image_urls = {
    "img_hero": "https://picsum.photos/seed/bio_hero/1000/700",
    "img_lab": "https://picsum.photos/seed/bio_lab1/800/600",
    "img_scientist": "https://picsum.photos/seed/bio_scientist/800/600",
    "img_abstract": "https://picsum.photos/seed/bio_abstract/800/600",
    "img_cells": "https://picsum.photos/seed/bio_cells/800/600",
    "img_plant": "https://picsum.photos/seed/bio_plant/800/600",
    "img_medical": "https://picsum.photos/seed/bio_medical/800/600",
    "img_data": "https://picsum.photos/seed/bio_data/800/600",
    "img_team": "https://picsum.photos/seed/bio_team/800/600",
    "img_future": "https://picsum.photos/seed/bio_future/800/600"
}

os.makedirs("assets", exist_ok=True)
headers = {'User-Agent': 'Mozilla/5.0'}

for name, url in image_urls.items():
    print(f"Downloading {name}...")
    try:
        response = requests.get(url, headers=headers)
        img = Image.open(BytesIO(response.content))
        if img.mode != 'RGB':
            img = img.convert('RGB')
            
        quality = 90
        out_path = f"assets/{name}.webp"
        
        while True:
            if quality < 30:
                width, height = img.size
                img = img.resize((int(width * 0.8), int(height * 0.8)), Image.LANCZOS)
                quality = 80
            
            img.save(out_path, format="webp", quality=quality)
            size_kb = os.path.getsize(out_path) / 1024
            
            if size_kb <= 98:
                print(f"Saved {name} at {size_kb:.1f}KB")
                break
            quality -= 5
    except Exception as e:
        print(f"Failed {name}: {e}")
