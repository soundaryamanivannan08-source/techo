import glob

replacements = {
    "Stackly": "NeoGenix",
    "BioNova": "NeoGenix",
    "assets/logo.png": "assets/logo.png",   # Assuming logo is unchanged
    "Electric Blue": "Emerald Green",
    "Engineering a Healthier Future": "Architecting a Synthetic Future"
}

for filepath in ["login.html", "404.html", "admin-dashboard.html", "user-dashboard.html"]:
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        
        for old, new in replacements.items():
            content = content.replace(old, new)
            
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated {filepath}")
    except FileNotFoundError:
        pass
