# Unit Selector - Visual Guide

## Before vs After

### BEFORE (Fixed px only)
```
┌─────────────────────────────┐
│ Width                       │
│ [━━━━━━●━━━━━] 800 px       │
│                      ↑       │
│                  Fixed unit  │
└─────────────────────────────┘
```

### AFTER (Selectable units)
```
┌─────────────────────────────┐
│ Width                       │
│ [━━━━━━●━━━━━] 800 [px ▼]  │
│                      ↑       │
│                  Dropdown!   │
│                              │
│ Click dropdown:              │
│ ┌──────┐                     │
│ │ px   │ ← Selected          │
│ │ %    │                     │
│ │ vw   │                     │
│ │ em   │                     │
│ │ rem  │                     │
│ └──────┘                     │
└─────────────────────────────┘
```

## Layout Panel with Unit Selectors

```
┌─────────────────────────────────────┐
│ ▼ Layout                            │
├─────────────────────────────────────┤
│                                     │
│ Width                               │
│ [━━━━━━━━●━━━━━━━] 800 [px ▼]      │
│                                     │
│ Height                              │
│ [━━━━━━━━●━━━━━━━] 500 [vh ▼]      │
│                                     │
│ Min Height                          │
│ [━━━━━━━━●━━━━━━━] 200 [px ▼]      │
│                                     │
│ ─── Container Controls ───          │
│                                     │
│ Flex Direction                      │
│ [→][↓][←][↑]                        │
│                                     │
│ Justify Content                     │
│ [⊣][⊢][⊤][⊥][⟷]                    │
│                                     │
│ Align Items                         │
│ [⊣][⊢][⊤][↕]                        │
│                                     │
│ Gap                                 │
│ [━━━━━━━━●━━━━━━━] 20 [px ▼]       │
│                                     │
└─────────────────────────────────────┘
```

## Unit Dropdown Options

### Width Units
```
┌──────┐
│ px   │ ← Pixels (default)
│ %    │ ← Percentage of parent
│ vw   │ ← Viewport width
│ em   │ ← Relative to font size
│ rem  │ ← Relative to root font
└──────┘
```

### Height Units
```
┌──────┐
│ px   │ ← Pixels (default)
│ %    │ ← Percentage of parent
│ vh   │ ← Viewport height
│ em   │ ← Relative to font size
│ rem  │ ← Relative to root font
└──────┘
```

### Gap Units (Containers)
```
┌──────┐
│ px   │ ← Pixels (default)
│ em   │ ← Relative to font size
│ rem  │ ← Relative to root font
└──────┘
```

## Usage Examples

### Example 1: Full Width Container
```
┌─────────────────────────────┐
│ Width                       │
│ [━━━━━━━━━━●] 100 [% ▼]    │
│                             │
│ Result: width: 100%         │
│ (Full width of parent)      │
└─────────────────────────────┘
```

### Example 2: Full Viewport Height
```
┌─────────────────────────────┐
│ Height                      │
│ [━━━━━━━━━━●] 100 [vh ▼]   │
│                             │
│ Result: height: 100vh       │
│ (Full viewport height)      │
└─────────────────────────────┘
```

### Example 3: Responsive Width
```
┌─────────────────────────────┐
│ Width                       │
│ [━━━━━━━━●━━] 80 [vw ▼]    │
│                             │
│ Result: width: 80vw         │
│ (80% of viewport width)     │
└─────────────────────────────┘
```

### Example 4: Relative Sizing
```
┌─────────────────────────────┐
│ Width                       │
│ [━━━━●━━━━━━] 20 [em ▼]    │
│                             │
│ Result: width: 20em         │
│ (20x current font size)     │
└─────────────────────────────┘
```

### Example 5: Flexible Gap
```
┌─────────────────────────────┐
│ Gap                         │
│ [━━●━━━━━━━━] 2 [rem ▼]    │
│                             │
│ Result: gap: 2rem           │
│ (2x root font size)         │
└─────────────────────────────┘
```

## Heading Tag Selector

Already exists in Content section:

```
┌─────────────────────────────┐
│ ▼ Content                   │
├─────────────────────────────┤
│                             │
│ Heading Text                │
│ [My Awesome Title]          │
│                             │
│ Heading Tag                 │
│ [H2 ▼]                      │
│  ↓                          │
│ ┌────┐                      │
│ │ H1 │                      │
│ │ H2 │ ← Selected           │
│ │ H3 │                      │
│ │ H4 │                      │
│ │ H5 │                      │
│ │ H6 │                      │
│ └────┘                      │
│                             │
│ Result: <h2>My Awesome...</h2>
└─────────────────────────────┘
```

## Interactive Flow

### Step 1: Select Component
```
Canvas → Click Element → Right Sidebar Opens
```

### Step 2: Open Layout Panel
```
Right Sidebar → Layout Panel (already open)
```

### Step 3: Adjust Width
```
Width Slider → Drag to 800
```

### Step 4: Change Unit
```
Unit Dropdown → Click → Select "%"
Result: width: 800% (probably too much!)
```

### Step 5: Adjust Value
```
Width Slider → Drag to 100
Result: width: 100% (perfect!)
```

### Step 6: See Live Preview
```
Canvas → Component updates immediately
Shows full width of parent
```

### Step 7: Save
```
Top Bar → Click "Save"
Both value (100) and unit (%) saved
```

### Step 8: Publish
```
Top Bar → Click "Publish"
Live page shows width: 100%
```

## Common Use Cases

### 1. Full-Width Hero Section
```
Width: 100
Unit: %
Height: 100
Unit: vh

Result:
width: 100%   (full width)
height: 100vh (full viewport)
```

### 2. Centered Container
```
Width: 80
Unit: %
Max Width: 1200
Unit: px

Result:
width: 80%        (responsive)
max-width: 1200px (limit)
```

### 3. Sidebar Layout
```
Sidebar:
  Width: 300
  Unit: px

Main:
  Width: calc(100% - 300px)
  (use % for responsive)
```

### 4. Card Grid
```
Card:
  Width: 30
  Unit: %
  
Gap:
  Value: 2
  Unit: rem

Result:
3 cards per row with flexible spacing
```

### 5. Mobile-First
```
Mobile:
  Width: 100
  Unit: %

Tablet:
  Width: 50
  Unit: %

Desktop:
  Width: 33.33
  Unit: %
```

## Unit Comparison

### Absolute Units
```
px  - Pixels (fixed size)
      Example: 800px = 800 pixels
      Use: Fixed layouts, borders
```

### Relative Units
```
%   - Percentage of parent
      Example: 50% = half of parent
      Use: Responsive layouts

em  - Relative to element font size
      Example: 2em = 2x font size
      Use: Scalable components

rem - Relative to root font size
      Example: 2rem = 2x root font
      Use: Consistent spacing
```

### Viewport Units
```
vw  - Viewport width percentage
      Example: 50vw = half viewport width
      Use: Full-width sections

vh  - Viewport height percentage
      Example: 100vh = full viewport height
      Use: Full-height sections
```

## Best Practices

### Use % for:
- Responsive widths
- Fluid layouts
- Child elements

### Use vh/vw for:
- Full-screen sections
- Hero banners
- Viewport-based sizing

### Use em/rem for:
- Spacing (margin, padding, gap)
- Scalable components
- Accessible designs

### Use px for:
- Borders
- Small fixed elements
- Precise control

## Summary

✅ Unit selector dropdown added
✅ Available units: px, %, vh, vw, em, rem
✅ Works on: Width, Height, Min Height, Gap
✅ Live preview updates
✅ Saves to database
✅ Applies correctly to CSS
✅ Heading tag selector already exists

The page builder now supports flexible, responsive design with multiple unit types!

---

**Visual guide complete!** 🎉
