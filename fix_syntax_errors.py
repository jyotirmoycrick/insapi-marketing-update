#!/usr/bin/env python3
"""
Fix syntax errors created by the update script
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
    """Fix syntax errors in a file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Fix incorrect import syntax: { useState } , useEffect } -> { useState, useEffect }
    content = re.sub(
        r"import { (\w+) \s*,\s*(\w+) } from 'react';",
        r"import { \1, \2 } from 'react';",
        content
    )
    
    # Fix: { useState } , useEffect } -> { useState, useEffect }
    content = re.sub(
        r"{ (\w+) \s*,\s*(\w+) }",
        r"{ \1, \2 }",
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
    
    print(f"\n✓ Fixed {fixed_count} files with syntax errors")

if __name__ == "__main__":
    main()
