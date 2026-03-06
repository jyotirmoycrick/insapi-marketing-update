#!/usr/bin/env python3
"""
Find all <img> tags that are NOT wrapped in EditableImage component
"""

import os
import re
from pathlib import Path

def find_unwrapped_images():
    """Find all img tags not using EditableImage"""
    frontend_src = Path('frontend/src/app')
    
    if not frontend_src.exists():
        print("❌ frontend/src/app directory not found")
        return
    
    unwrapped_files = []
    
    for filepath in frontend_src.rglob('*.tsx'):
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Skip if file already imports EditableImage
            has_editable_image = 'EditableImage' in content
            
            # Find <img tags
            img_tags = re.findall(r'<img[^>]*>', content, re.MULTILINE)
            
            if img_tags and not has_editable_image:
                unwrapped_files.append({
                    'file': str(filepath),
                    'count': len(img_tags),
                    'tags': img_tags
                })
                
        except Exception as e:
            print(f"Error processing {filepath}: {e}")
    
    if unwrapped_files:
        print(f"\n🔍 Found {len(unwrapped_files)} files with unwrapped <img> tags:\n")
        for item in unwrapped_files:
            print(f"📄 {item['file']}")
            print(f"   {item['count']} img tag(s) found")
            for tag in item['tags'][:3]:  # Show first 3
                print(f"   - {tag[:80]}...")
            print()
    else:
        print("✅ All images are wrapped in EditableImage or are special cases (logos, icons, etc.)")

if __name__ == '__main__':
    find_unwrapped_images()
