import glob

replacements = {
    "#0ea5e9": "#10b981", 
    "#2dd4bf": "#047a55", 
    "#0284c7": "#059669",
    "rgba(14, 165, 233": "rgba(16, 185, 129",
    "rgba(45, 212, 191": "rgba(4, 122, 85"
}

for filepath in glob.glob("*.css"):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    content = content.replace('linear-gradient(135deg, #047a55 0%, #10b981 100%)', 'linear-gradient(135deg, #10b981 0%, #059669 100%)')
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

print("Colors updated globally!")
