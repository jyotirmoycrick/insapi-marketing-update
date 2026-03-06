#!/usr/bin/env python3
"""
Remove duplicate Footer imports and usages from service pages
"""

import re
from pathlib import Path

mobile_pages = [
    'frontend/src/app/services/google-ads/GoogleAdsMobilePage.tsx',
    'frontend/src/app/services/meta-ads/MetaAdsMobilePage.tsx',
    'frontend/src/app/services/shopify/ShopifyMobilePage.tsx',
    'frontend/src/app/services/social-media/SocialMediaMobilePage.tsx',
    'frontend/src/app/services/content-marketing/ContentMarketingMobilePage.tsx',
    'frontend/src/app/services/build-a-brand/BuildABrandMobilePage.tsx',
]

def remove_footer_from_file(filepath):
    """Remove Footer import and usage from a file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Remove Footer import line
        content = re.sub(r"import\s+\{\s*Footer\s*\}\s+from\s+['\"].*Footer['\"];\s*\n", '', content)
        
        # Remove <Footer /> usage
        content = re.sub(r'\s*<Footer\s*/>\s*\n', '\n', content)
        
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return False

def main():
    """Remove Footer from all mobile pages"""
    fixed_count = 0
    
    for filepath in mobile_pages:
        if Path(filepath).exists():
            if remove_footer_from_file(filepath):
                print(f"✓ Removed Footer from: {filepath}")
                fixed_count += 1
        else:
            print(f"⚠️  File not found: {filepath}")
    
    print(f"\n✓ Fixed {fixed_count} mobile pages")

if __name__ == '__main__':
    main()
