#!/usr/bin/env python3
"""
Fix duplicate imports created by the update script
"""

import os
import re
from pathlib import Path

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

def fix_file(filepath):
    """Fix duplicate imports in a file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Remove duplicate contentAPI imports
    content = re.sub(
        r"import { contentAPI } from '@/services/api';\s*import { contentAPI } from '@/services/api';",
        "import { contentAPI } from '@/services/api';",
        content
    )
    
    # Remove duplicate EditableImage imports
    content = re.sub(
        r"import { EditableImage } from '@/components/EditableImage';\s*import { EditableImage } from '@/components/EditableImage';",
        "import { EditableImage } from '@/components/EditableImage';",
        content
    )
    
    # Fix duplicate useEffect imports
    content = re.sub(
        r"import { useState, useEffect } from 'react';\s*import { useState, useEffect } from 'react';",
        "import { useState, useEffect } from 'react';",
        content
    )
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✓ Fixed {filepath}")
        return True
    
    return False

def main():
    """Main function"""
    fixed_count = 0
    
    for dir_path in DIRS_TO_PROCESS:
        if not os.path.exists(dir_path):
            continue
        
        for filename in os.listdir(dir_path):
            if not filename.endswith('.tsx'):
                continue
            
            filepath = os.path.join(dir_path, filename)
            if os.path.isfile(filepath):
                if fix_file(filepath):
                    fixed_count += 1
    
    print(f"\n✓ Fixed {fixed_count} files with duplicate imports")

if __name__ == "__main__":
    main()
