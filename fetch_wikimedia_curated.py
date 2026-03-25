import requests
import io
import os
from PIL import Image

# 10 exact File names from Wikimedia Commons that are known, high quality, and relevant
file_maps = {
    "img_hero.webp": "File:CRISPR-associated_protein_9_(Cas9)_01.png",            # DNA/CRISPR
    "img_lab.webp": "File:Modern_medical_laboratory.jpg",                           # Lab
    "img_scientist.webp": "File:A_Scientist_At_Work.jpg",                           # Scientist
    "img_abstract.webp": "File:Artificial_neural_network_-_colored_version.svg",    # Abstract / Neural
    "img_cells.webp": "File:Blood_cells.jpg",                                       # Cells
    "img_plant.webp": "File:Plant_tissue_culture_2.jpg",                            # Agriculture
    "img_medical.webp": "File:Bacteriophage_T4_3D.png",                             # Virus/Medical
    "img_data.webp": "File:Bioinformatics_visualization.png",                       # Data
    "img_team.webp": "File:Scientists_working_in_laboratory.jpg",                   # Team
    "img_future.webp": "File:Artificial_Intelligence_&_AI_&_Machine_Learning.jpg"   # AI/Future
}

URL = "https://en.wikipedia.org/w/api.php"
S = requests.Session()
S.headers.update({"User-Agent": "NeoGenixDataBot/1.0 (mohammed-refai03@github.com)"})

def get_image_url(filename):
    params = {
        "action": "query",
        "format": "json",
        "prop": "imageinfo",
        "iiprop": "url",
        "titles": filename
    }
    r = S.get(url=URL, params=params)
    data = r.json()
    pages = data.get("query", {}).get("pages", {})
    for page_id, page_info in pages.items():
        if "imageinfo" in page_info:
            return page_info["imageinfo"][0]["url"]
    return None

def process_and_save(img_content, filepath):
    try:
        # Some SVGs or weird PNGs might throw an error in PIL, handle generic exceptions
        img = Image.open(io.BytesIO(img_content)).convert("RGB")
        target_width = 1000
        wpercent = (target_width / float(img.size[0]))
        if wpercent < 1.0:
            hsize = int((float(img.size[1]) * float(wpercent)))
            img = img.resize((target_width, hsize), Image.Resampling.LANCZOS)
        else:
            img = img.resize((target_width, target_width), Image.Resampling.LANCZOS)
        
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

for local_name, wiki_name in file_maps.items():
    print(f"Fetching {wiki_name}...")
    img_url = get_image_url(wiki_name)
    if img_url:
        img_response = S.get(img_url)
        if img_response.status_code == 200:
            process_and_save(img_response.content, local_name)
        else:
            print(f"  DL Failed for {wiki_name}")
    else:
        print(f"  Not Found: {wiki_name}")

print("Curated assets downloaded and processed.")
