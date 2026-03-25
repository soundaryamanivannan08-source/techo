import requests
import io
import os
from PIL import Image

keywords_map = {
    "img_hero.webp": "DNA double helix",
    "img_lab.webp": "medical laboratory",
    "img_scientist.webp": "scientist portrait",
    "img_abstract.webp": "technology abstract",
    "img_cells.webp": "microscope cells",
    "img_plant.webp": "agriculture seedling",
    "img_medical.webp": "bacteriophage virus",
    "img_data.webp": "bioinformatics data server",
    "img_team.webp": "scientists laboratory team",
    "img_future.webp": "artificial intelligence brain"
}

URL = "https://commons.wikimedia.org/w/api.php"
S = requests.Session()
S.headers.update({"User-Agent": "NeoGenixDataBot/1.0 (mohammed-refai03@github.com)"})

def search_commons_url(keyword):
    params = {
        "action": "query",
        "generator": "search",
        "gsrsearch": f"filetype:bitmap {keyword}",
        "gsrnamespace": 6,
        "gsrlimit": 1,
        "prop": "imageinfo",
        "iiprop": "url",
        "format": "json"
    }
    r = S.get(url=URL, params=params)
    data = r.json()
    pages = data.get("query", {}).get("pages", {})
    if pages:
        # Get the first page's image URL
        for page_id, page_info in pages.items():
            if "imageinfo" in page_info:
                return page_info["imageinfo"][0]["url"]
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

os.makedirs("assets", exist_ok=True)

for filename, keyword in keywords_map.items():
    print(f"Searching '{keyword}' for {filename}...")
    img_url = search_commons_url(keyword)
    if img_url:
        print(f"  Found: {img_url}")
        img_response = S.get(img_url)
        if img_response.status_code == 200:
            process_and_save(img_response.content, filename)
        else:
            print("  DL Failed.")
    else:
        print("  Not Found.")

print("All exact visual matches generated.")
