#!/usr/bin/env python3
"""
Script to automatically update all React components to use EditableImage
"""

import os
import re
from pathlib import Path

# Directories to process
DIRS_TO_PROCESS = [
    "frontend/src/app/components",
    "frontend/src/app/services",
    "frontend/src/app/services/content-marketing",
    "frontend/src/app/services/google-ads",
    "frontend/src/app/services/meta-ads",
    "frontend/src/app/services/shopify",
    "frontend/src/app/services/social-media",
    "frontend/src/app/services/build-a-brand",
]

def get_page_name_from_path(filepath):
    """Extract page name from file path"""
    if "services/content-marketing" in filepath:
        return "content-marketing"
    elif "services/google-ads" in filepath:
        return "google-ads"
    elif "services/meta-ads" in filepath:
        return "meta-ads"
    elif "services/shopify" in filepath:
        return "shopify"
    elif "services/social-media" in filepath:
        return "social-media"
    elif "services/build-a-brand" in filepath:
        return "build-a-brand"
    elif "services" in filepath:
        return "services"
    else:
        return "home"

def get_section_name_from_filename(filename):
    """Extract section name from filename"""
    # Remove .tsx and convert to kebab-case
    name = filename.replace(".tsx", "").replace(".ts", "")
    # Convert CamelCase to kebab-case
    name = re.sub('(.)([A-Z][a-z]+)', r'\1-\2', name)
    name = re.sub('([a-z0-9])([A-Z])', r'\1-\2', name).lower()
    return name

def process_file(filepath):
    """Process a single file to add EditableImage support"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Skip if already using EditableImage
    if 'EditableImage' in content:
        print(f"✓ Skipping {filepath} - already uses EditableImage")
        return False
    
    # Skip if no images
    if '<img' not in content and 'src=' not in content:
        return False
    
    # Skip certain files
    filename = os.path.basename(filepath)
    if filename in ['Header.tsx', 'DynamicHeader.tsx', 'AdminToolbar.tsx']:
        return False
    
    page_name = get_page_name_from_path(filepath)
    section_name = get_section_name_from_filename(filename)
    
    print(f"Processing {filepath} (page: {page_name}, section: {section_name})")
    
    # Add imports if not present
    if 'useState' not in content:
        content = content.replace(
            "import ",
            "import { useState, useEffect } from 'react';\nimport ",
            1
        )
    elif 'useEffect' not in content:
        content = content.replace(
            "from 'react'",
            ", useEffect } from 'react'",
            1
        )
    
    if 'EditableImage' not in content:
        # Add EditableImage import after react imports
        react_import_match = re.search(r"import.*from ['\"]react['\"];", content)
        if react_import_match:
            insert_pos = react_import_match.end()
            content = (
                content[:insert_pos] +
                "\nimport { EditableImage } from '@/components/EditableImage';" +
                "\nimport { contentAPI } from '@/services/api';" +
                content[insert_pos:]
            )
    
    # Find all image imports
    image_imports = re.findall(r"import\s+(\w+)\s+from\s+['\"]@/assets/[^'\"]+['\"];", content)
    
    if not image_imports:
        return False
    
    # Create state variables for each image
    state_declarations = []
    useeffect_loads = []
    
    for i, img_var in enumerate(image_imports):
        state_var = f"{img_var}Src"
        state_declarations.append(f"const [{state_var}, set{img_var.capitalize()}Src] = useState({img_var});")
        
        key = f"image-{i}" if len(image_imports) > 1 else "image"
        useeffect_loads.append(f"""
        const {img_var}Saved = content.find((c: any) => c.section === '{section_name}' && c.key === '{key}');
        if ({img_var}Saved?.value) set{img_var.capitalize()}Src({img_var}Saved.value);""")
    
    # Find the function component
    func_match = re.search(r"export\s+function\s+(\w+)\s*\([^)]*\)\s*{", content)
    if not func_match:
        return False
    
    func_start = func_match.end()
    
    # Insert state and useEffect
    state_code = "\n  ".join(state_declarations)
    useeffect_code = f"""
  
  useEffect(() => {{
    const loadImages = async () => {{
      try {{
        const content = await contentAPI.getPageContent('{page_name}');
        {''.join(useeffect_loads)}
      }} catch (error) {{
        // Use defaults
      }}
    }};
    loadImages();
  }}, []);
"""
    
    content = content[:func_start] + "\n  " + state_code + useeffect_code + content[func_start:]
    
    # Replace <img> tags with EditableImage
    for i, img_var in enumerate(image_imports):
        state_var = f"{img_var}Src"
        setter = f"set{img_var.capitalize()}Src"
        key = f"image-{i}" if len(image_imports) > 1 else "image"
        
        # Find and replace img tags using this variable
        img_pattern = rf'<img\s+src={{{img_var}}}([^>]*)/>'
        
        def replace_img(match):
            attrs = match.group(1)
            # Extract alt and className
            alt_match = re.search(r'alt="([^"]*)"', attrs)
            class_match = re.search(r'className="([^"]*)"', attrs)
            
            alt = alt_match.group(1) if alt_match else ""
            class_name = class_match.group(1) if class_match else ""
            
            return f'''<EditableImage
          src={{{state_var}}}
          alt="{alt}"
          className="{class_name}"
          imageKey="{key}"
          page="{page_name}"
          section="{section_name}"
          onImageChange={{{setter}}}
        />'''
        
        content = re.sub(img_pattern, replace_img, content)
    
    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✓ Updated {filepath}")
    return True

def main():
    """Main function"""
    updated_count = 0
    
    for dir_path in DIRS_TO_PROCESS:
        if not os.path.exists(dir_path):
            continue
        
        for filename in os.listdir(dir_path):
            if not filename.endswith('.tsx'):
                continue
            
            filepath = os.path.join(dir_path, filename)
            if os.path.isfile(filepath):
                if process_file(filepath):
                    updated_count += 1
    
    print(f"\n✓ Updated {updated_count} files")
    print("\nAll images are now editable!")
    print("Login as admin, enable edit mode, and hover over any image to edit it.")

if __name__ == "__main__":
    main()
