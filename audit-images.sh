#!/bin/bash

# Image Performance Audit Script
# Scans codebase for image performance issues

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}=========================================="
echo "🔍 Image Performance Audit"
echo -e "==========================================${NC}"
echo ""

# Check if we're in the right directory
if [ ! -d "frontend" ]; then
    echo -e "${RED}Error: frontend directory not found${NC}"
    echo "Please run this script from the project root"
    exit 1
fi

echo -e "${GREEN}[1/7] Scanning for images without dimensions...${NC}"
echo ""

# Find img tags without width/height
MISSING_DIMS=$(grep -r "<img" frontend/src --include="*.tsx" --include="*.jsx" | grep -v "width=" | grep -v "OptimizedImage" | wc -l)

if [ "$MISSING_DIMS" -gt 0 ]; then
    echo -e "${YELLOW}⚠ Found $MISSING_DIMS images without dimensions${NC}"
    echo "Files:"
    grep -r "<img" frontend/src --include="*.tsx" --include="*.jsx" | grep -v "width=" | grep -v "OptimizedImage" | cut -d: -f1 | sort | uniq
else
    echo -e "${GREEN}✓ All images have dimensions${NC}"
fi

echo ""
echo -e "${GREEN}[2/7] Scanning for lazy-loaded above-fold images...${NC}"
echo ""

# Find images with loading="lazy" in critical components
LAZY_CRITICAL=$(grep -r 'loading="lazy"' frontend/src/app/components --include="*.tsx" 2>/dev/null | wc -l)

if [ "$LAZY_CRITICAL" -gt 0 ]; then
    echo -e "${YELLOW}⚠ Found $LAZY_CRITICAL lazy-loaded images in critical components${NC}"
    echo "Files:"
    grep -r 'loading="lazy"' frontend/src/app/components --include="*.tsx" 2>/dev/null | cut -d: -f1 | sort | uniq
else
    echo -e "${GREEN}✓ No lazy loading in critical components${NC}"
fi

echo ""
echo -e "${GREEN}[3/7] Scanning for images without fetchPriority...${NC}"
echo ""

# Find images without fetchPriority in critical paths
NO_PRIORITY=$(grep -r "<img" frontend/src/app/components --include="*.tsx" 2>/dev/null | grep -v "fetchPriority" | grep -v "OptimizedImage" | wc -l)

if [ "$NO_PRIORITY" -gt 0 ]; then
    echo -e "${YELLOW}⚠ Found $NO_PRIORITY images without fetchPriority${NC}"
else
    echo -e "${GREEN}✓ All critical images have fetchPriority${NC}"
fi

echo ""
echo -e "${GREEN}[4/7] Checking for PNG images (should be WebP)...${NC}"
echo ""

# Count PNG files
PNG_COUNT=$(find frontend/src/assets -name "*.png" 2>/dev/null | wc -l)

if [ "$PNG_COUNT" -gt 0 ]; then
    echo -e "${YELLOW}⚠ Found $PNG_COUNT PNG images${NC}"
    echo "Consider converting to WebP for better compression"
    echo ""
    echo "Top 10 largest PNG files:"
    find frontend/src/assets -name "*.png" -exec ls -lh {} \; 2>/dev/null | sort -k5 -hr | head -10 | awk '{print $9, $5}'
else
    echo -e "${GREEN}✓ No PNG images found${NC}"
fi

echo ""
echo -e "${GREEN}[5/7] Checking image file sizes...${NC}"
echo ""

# Find large images (>500KB)
LARGE_IMAGES=$(find frontend/src/assets -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.webp" \) -size +500k 2>/dev/null | wc -l)

if [ "$LARGE_IMAGES" -gt 0 ]; then
    echo -e "${YELLOW}⚠ Found $LARGE_IMAGES images larger than 500KB${NC}"
    echo "Files:"
    find frontend/src/assets -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.webp" \) -size +500k -exec ls -lh {} \; 2>/dev/null | awk '{print $9, $5}'
else
    echo -e "${GREEN}✓ All images under 500KB${NC}"
fi

echo ""
echo -e "${GREEN}[6/7] Checking for preload links...${NC}"
echo ""

# Check if index.html has preload links
if grep -q 'rel="preload".*as="image"' frontend/index.html 2>/dev/null; then
    PRELOAD_COUNT=$(grep -c 'rel="preload".*as="image"' frontend/index.html 2>/dev/null)
    echo -e "${GREEN}✓ Found $PRELOAD_COUNT image preload links${NC}"
else
    echo -e "${YELLOW}⚠ No image preload links found in index.html${NC}"
fi

echo ""
echo -e "${GREEN}[7/7] Checking for OptimizedImage usage...${NC}"
echo ""

# Count OptimizedImage usage
OPTIMIZED_COUNT=$(grep -r "OptimizedImage" frontend/src --include="*.tsx" 2>/dev/null | wc -l)
REGULAR_IMG_COUNT=$(grep -r "<img" frontend/src --include="*.tsx" 2>/dev/null | grep -v "OptimizedImage" | wc -l)

echo "OptimizedImage usage: $OPTIMIZED_COUNT"
echo "Regular <img> tags: $REGULAR_IMG_COUNT"

if [ "$REGULAR_IMG_COUNT" -gt "$OPTIMIZED_COUNT" ]; then
    echo -e "${YELLOW}⚠ More regular <img> tags than OptimizedImage${NC}"
    echo "Consider migrating to OptimizedImage component"
else
    echo -e "${GREEN}✓ Good OptimizedImage adoption${NC}"
fi

echo ""
echo -e "${BLUE}=========================================="
echo "📊 Audit Summary"
echo -e "==========================================${NC}"
echo ""

# Calculate score
ISSUES=0
[ "$MISSING_DIMS" -gt 0 ] && ISSUES=$((ISSUES + 1))
[ "$LAZY_CRITICAL" -gt 0 ] && ISSUES=$((ISSUES + 1))
[ "$NO_PRIORITY" -gt 0 ] && ISSUES=$((ISSUES + 1))
[ "$PNG_COUNT" -gt 10 ] && ISSUES=$((ISSUES + 1))
[ "$LARGE_IMAGES" -gt 0 ] && ISSUES=$((ISSUES + 1))
[ "$REGULAR_IMG_COUNT" -gt "$OPTIMIZED_COUNT" ] && ISSUES=$((ISSUES + 1))

SCORE=$((100 - (ISSUES * 15)))

if [ "$SCORE" -ge 90 ]; then
    echo -e "${GREEN}Performance Score: $SCORE/100 ✓ Excellent${NC}"
elif [ "$SCORE" -ge 70 ]; then
    echo -e "${YELLOW}Performance Score: $SCORE/100 ⚠ Good${NC}"
else
    echo -e "${RED}Performance Score: $SCORE/100 ✗ Needs Improvement${NC}"
fi

echo ""
echo "Issues found: $ISSUES"
echo ""

# Recommendations
echo -e "${BLUE}Recommendations:${NC}"
echo ""

if [ "$MISSING_DIMS" -gt 0 ]; then
    echo "1. Add width/height to $MISSING_DIMS images"
fi

if [ "$LAZY_CRITICAL" -gt 0 ]; then
    echo "2. Remove lazy loading from $LAZY_CRITICAL above-fold images"
fi

if [ "$PNG_COUNT" -gt 10 ]; then
    echo "3. Convert $PNG_COUNT PNG images to WebP"
fi

if [ "$LARGE_IMAGES" -gt 0 ]; then
    echo "4. Compress $LARGE_IMAGES large images"
fi

if [ "$REGULAR_IMG_COUNT" -gt "$OPTIMIZED_COUNT" ]; then
    echo "5. Migrate $REGULAR_IMG_COUNT images to OptimizedImage component"
fi

echo ""
echo -e "${GREEN}For detailed implementation plan, see:${NC}"
echo "  • COMPREHENSIVE_IMAGE_PERFORMANCE_AUDIT.md"
echo "  • OptimizedImage.tsx component"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "  1. Review audit results above"
echo "  2. Follow implementation plan in audit document"
echo "  3. Run this script again after fixes"
echo "  4. Test with Lighthouse"
echo ""
