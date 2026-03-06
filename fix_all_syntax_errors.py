#!/usr/bin/env python3
"""
Comprehensive syntax error fixer for the frontend codebase.
Fixes common issues introduced by automated updates.
"""

import os
import re
from pathlib import Path

def fix_file(filepath):
    """Fix syntax errors in a single file."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        changes = []
        
        # Fix 1: Space before comma in imports (useState } , useEffect)
        if re.search(r'\}\s+,\s+', content):
            content = re.sub(r'\}\s+,\s+', '}, ', content)
            changes.append("Fixed space before comma in imports")
        
        # Fix 2: Duplicate imports on consecutive lines
        lines = content.split('\n')
        seen_imports = {}
        new_lines = []
        for i, line in enumerate(lines):
            # Check if this is an import line
            import_match = re.match(r'^import\s+.*from\s+[\'"](.+)[\'"];?\s*$', line.strip())
            if import_match:
                import_key = import_match.group(1)
                if import_key in seen_imports:
                    # Skip duplicate import
                    changes.append(f"Removed duplicate import from '{import_key}'")
                    continue
                seen_imports[import_key] = True
            new_lines.append(line)
        
        if len(new_lines) != len(lines):
            content = '\n'.join(new_lines)
        
        # Fix 3: Missing semicolons at end of imports
        content = re.sub(r"(import\s+.*from\s+['\"][^'\"]+['\"])\s*$", r"\1;", content, flags=re.MULTILINE)
        
        # Only write if changes were made
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True, changes
        
        return False, []
    
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return False, []

def main():
    """Main function to fix all TypeScript/React files."""
    frontend_src = Path('frontend/src')
    
    if not frontend_src.exists():
        print("❌ frontend/src directory not found")
        return
    
    fixed_count = 0
    total_changes = []
    
    # Find all .tsx and .ts files
    for filepath in frontend_src.rglob('*.tsx'):
        was_fixed, changes = fix_file(filepath)
        if was_fixed:
            fixed_count += 1
            print(f"✓ Fixed: {filepath}")
            for change in changes:
                print(f"  - {change}")
            total_changes.extend(changes)
    
    for filepath in frontend_src.rglob('*.ts'):
        # Skip .d.ts files
        if filepath.name.endswith('.d.ts'):
            continue
        was_fixed, changes = fix_file(filepath)
        if was_fixed:
            fixed_count += 1
            print(f"✓ Fixed: {filepath}")
            for change in changes:
                print(f"  - {change}")
            total_changes.extend(changes)
    
    print(f"\n✓ Fixed {fixed_count} files with {len(total_changes)} total changes")

if __name__ == '__main__':
    main()
