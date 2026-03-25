import requests
import io
import os
from PIL import Image

keywords = {
    "img_hero.webp": "CRISPR",
    "img_lab.webp": "Laboratory",
    "img_scientist.webp": "Scientist",
    "img_abstract.webp": "Synthetic biology",
    "img_cells.webp": "Cell (biology)",
    "img_plant.webp": "Botany",
    "img_medical.webp": "Virology",
    "img_data.webp": "Bioinformatics",
    "img_team.webp": "Research team",
    "img_future.webp": "Artificial intelligence"
}

S = requests.Session()
S.headers.update({"User-Agent": "NeoGenix-Bot/1.0 (contact@example.com)"})
URL = "https://en.wikipedia.org/w/api.php"

os.makedirs("assets", exist_ok=True)

def fetch_image_url(query):
    params = {
        "action": "query",
        "format": "json",
        "titles": query,
        "prop": "pageimages",
        "pithumbsize": 1000
    }
    try:
        r = S.get(url=URL, params=params)
        data = r.json()
        pages = data.get("query", {}).get("pages", {})
        for page_id, page_info in pages.items():
            if "thumbnail" in page_info:
                return page_info["thumbnail"]["source"]
    except Exception as e:
        print(f"Error fetching URL for {query}: {e}")
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

for filename, keyword in keywords.items():
    print(f"Fetching '{keyword}' for {filename}...")
    img_url = fetch_image_url(keyword)
    
    if img_url:
        img_response = requests.get(img_url, headers={"User-Agent": "NeoGenix-Bot/1.0"})
        if img_response.status_code == 200:
            process_and_save(img_response.content, filename)
        else:
            print(f"Failed to download image content from {img_url}")
    else:
        print(f"No image found for {keyword}")

print("Assets generated.")
