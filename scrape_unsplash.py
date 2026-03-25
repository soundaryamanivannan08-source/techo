import requests
import re
import io
import os
from PIL import Image

keywords_map = {
    "img_hero.webp": "dna",
    "img_lab.webp": "science+laboratory",
    "img_scientist.webp": "scientist",
    "img_abstract.webp": "abstract+technology",
    "img_cells.webp": "microscope",
    "img_plant.webp": "seedling",
    "img_medical.webp": "virus",
    "img_data.webp": "data+server",
    "img_team.webp": "science+team",
    "img_future.webp": "artificial+intelligence"
}

os.makedirs("assets", exist_ok=True)

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
}

def get_unsplash_url(keyword):
    search_url = f"https://unsplash.com/s/photos/{keyword}"
    try:
        r = requests.get(search_url, headers=headers, timeout=10)
        # Find the first high-quality image URL from Unsplash
        match = re.search(r'https://images\.unsplash\.com/photo-[a-zA-Z0-9\-]+', r.text)
        if match:
            # Append parameters to get a reasonable starting resolution
            return match.group(0) + "?w=1200&q=80"
    except Exception as e:
        print(f"Failed to scrape {keyword}: {e}")
    return None

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

for filename, keyword in keywords_map.items():
    print(f"Scraping '{keyword}' for {filename}...")
    img_url = get_unsplash_url(keyword)
    
    if img_url:
        print(f"  Found URL: {img_url}")
        img_response = requests.get(img_url, headers=headers)
        if img_response.status_code == 200:
            process_and_save(img_response.content, filename)
        else:
            print(f"  Failed to download content.")
    else:
        print(f"  No image found for '{keyword}'.")

print("Done generating flawlessly matched Unsplash assets.")
