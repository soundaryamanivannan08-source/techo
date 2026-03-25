import os
import re

# Read index.html to extract the exact navbar HTML
with open("index.html", "r", encoding="utf-8") as f:
    index_content = f.read()

# Extract navbar block using regex
# We assume it starts with <header class="navbar"> and ends with </header>
navbar_match = re.search(r'(<header class="navbar">.*?</header>)', index_content, re.DOTALL)
if not navbar_match:
    print("Could not find navbar in index.html")
    exit(1)

navbar_html = navbar_match.group(1)

# Now, applying the navbar and the global-navbar.css to all HTML files
html_files = [f for f in os.listdir(".") if f.endswith(".html")]

navbar_css_link = '<link rel="stylesheet" href="global-navbar.css">'

for html_file in html_files:
    with open(html_file, "r", encoding="utf-8") as f:
        content = f.read()

    # Step 1: Remove existing <header class="navbar">...</header> if it exists
    content = re.sub(r'<header class="navbar">.*?</header>', '', content, flags=re.DOTALL)
    
    # Step 2: Inject the navbar immediately after <body> tag
    # Handle possible spaces or attributes in body tag, though typically it's just <body>
    content = re.sub(r'(<body[^>]*>)', r'\1\n' + navbar_html + '\n', content, count=1, flags=re.IGNORECASE)

    # Step 3: Inject global-navbar.css link before </head> if not exists
    if 'href="global-navbar.css"' not in content:
        content = re.sub(r'(</head>)', f'    {navbar_css_link}\n\\1', content, flags=re.IGNORECASE)
    
    # Step 4: Inject script.js before </body> if not exists (so navToggle works everywhere)
    if 'src="script.js"' not in content and 'src="app.js"' not in content and 'src="dashboard.js"' not in content:
         # Actually just inject script.js safely if it doesn't exist.
         pass
    
    # Let's ensure script.js exists for toggling the navbar.
    if '<script src="script.js"></script>' not in content:
        content = content.replace('</body>', '<script src="script.js"></script>\n</body>')

    with open(html_file, "w", encoding="utf-8") as f:
        f.write(content)
    
    print(f"Applied global navbar to {html_file}")


# Extract Navbar CSS from style.css
with open("style.css", "r", encoding="utf-8") as f:
    css_content = f.read()

# The navbar CSS in style.css starts around `.navbar {` and includes media queries up to `.hero`.
# Instead of complex regex matching for css blocks, I will provide a clean, standalone global-navbar.css!
