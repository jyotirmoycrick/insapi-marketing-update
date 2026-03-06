# ElementorPageBuilder - Testing Checklist

## Quick Start

### 1. Start Services
```bash
# Terminal 1 - Backend
cd backend
python server.py

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 2. Login
- URL: http://localhost:5173/admin
- Username: `malo`
- Password: `1234567890`

### 3. Open Page Builder
- Dashboard → Pages → Edit (any page)

## Testing Checklist

### ✅ Basic Functionality
- [ ] Page builder loads without errors
- [ ] Left sidebar shows component templates
- [ ] Canvas shows page preview
- [ ] Can drag components from left sidebar
- [ ] Can click components to select
- [ ] Right sidebar appears when component selected
- [ ] Right sidebar hides when clicking X or Escape
- [ ] Top bar shows Save/Publish buttons

### ✅ Layout Panel
- [ ] Panel appears for all components
- [ ] Width slider (0-2000px) works
- [ ] Height slider (0-1000px) works
- [ ] Min Height slider (0-1000px) works
- [ ] Flex Direction buttons work (containers only)
  - [ ] Row →
  - [ ] Column ↓
  - [ ] Row Reverse ←
  - [ ] Column Reverse ↑
- [ ] Justify Content buttons work (containers only)
  - [ ] Flex Start
  - [ ] Center
  - [ ] Flex End
  - [ ] Space Between
  - [ ] Space Around
- [ ] Align Items buttons work (containers only)
  - [ ] Flex Start
  - [ ] Center
  - [ ] Flex End
  - [ ] Stretch
- [ ] Gap slider works (containers only)
- [ ] Changes update live on canvas

### ✅ Spacing Panel
- [ ] Panel appears for all components
- [ ] Margin controls work
  - [ ] Top input
  - [ ] Right input
  - [ ] Bottom input
  - [ ] Left input
  - [ ] Link button synchronizes all sides
  - [ ] Unlink allows individual control
- [ ] Padding controls work
  - [ ] Top input
  - [ ] Right input
  - [ ] Bottom input
  - [ ] Left input
  - [ ] Link button synchronizes all sides
  - [ ] Unlink allows individual control
- [ ] Visual box model updates
- [ ] Changes update live on canvas

### ✅ Background Panel
- [ ] Panel appears for all components
- [ ] Tab switcher works
  - [ ] Classic tab
  - [ ] Gradient tab
  - [ ] Image tab
- [ ] Classic tab:
  - [ ] Color picker opens
  - [ ] Color changes background
  - [ ] Hex input works
  - [ ] Preset colors work
- [ ] Image tab:
  - [ ] Upload button works
  - [ ] Drag & drop works
  - [ ] Image preview shows
  - [ ] Change button works
  - [ ] Remove button works
  - [ ] Position selector works (9 options)
  - [ ] Size selector works (auto, cover, contain)
  - [ ] Repeat selector works
- [ ] Overlay section:
  - [ ] Overlay color picker works
  - [ ] Overlay opacity slider works
- [ ] Changes update live on canvas

### ✅ Border Panel
- [ ] Panel appears for all components
- [ ] Border type selector works
  - [ ] None
  - [ ] Solid
  - [ ] Dashed
  - [ ] Dotted
  - [ ] Double
- [ ] Width slider works (0-20px)
- [ ] Color picker works
- [ ] Border radius controls work
  - [ ] Top-left input
  - [ ] Top-right input
  - [ ] Bottom-right input
  - [ ] Bottom-left input
  - [ ] Link button synchronizes all corners
  - [ ] Unlink allows individual control
- [ ] Width/color hide when type is "none"
- [ ] Changes update live on canvas

### ✅ Shadow Panel
- [ ] Panel appears for all components
- [ ] Horizontal offset slider works (-50 to 50px)
- [ ] Vertical offset slider works (-50 to 50px)
- [ ] Blur radius slider works (0-100px)
- [ ] Spread radius slider works (-50 to 50px)
- [ ] Shadow color picker works
- [ ] Alpha/opacity works
- [ ] Shadow visible on canvas
- [ ] Changes update live on canvas

### ✅ Typography Panel
- [ ] Panel ONLY appears for text/heading/button
- [ ] Panel does NOT appear for image/section/etc
- [ ] Font family dropdown works
  - [ ] Arial
  - [ ] Helvetica
  - [ ] Georgia
  - [ ] Times New Roman
  - [ ] Courier New
  - [ ] Verdana
  - [ ] Poppins
  - [ ] Roboto
  - [ ] Inter
- [ ] Font size slider works (8-120px)
- [ ] Font weight dropdown works (100-900)
- [ ] Line height slider works (0.5-3em)
- [ ] Letter spacing slider works (-5 to 10px)
- [ ] Text align buttons work
  - [ ] Left
  - [ ] Center
  - [ ] Right
  - [ ] Justify
- [ ] Text transform dropdown works
  - [ ] None
  - [ ] UPPERCASE
  - [ ] lowercase
  - [ ] Capitalize
- [ ] Text color picker works
- [ ] Italic toggle works
- [ ] Underline toggle works
- [ ] Changes update live on canvas

### ✅ Content Section
- [ ] Shows component-specific controls
- [ ] Text component:
  - [ ] Textarea for content
  - [ ] Content updates live
- [ ] Heading component:
  - [ ] Input for content
  - [ ] Dropdown for tag (H1-H6)
  - [ ] Content updates live
- [ ] Button component:
  - [ ] Input for button text
  - [ ] Text updates live
- [ ] Image component:
  - [ ] Input for URL
  - [ ] Upload button
  - [ ] Alt text input
  - [ ] Image updates live
- [ ] Hero component:
  - [ ] Input for title
  - [ ] Input for subtitle
  - [ ] Input for button text
  - [ ] All update live

### ✅ Actions Section
- [ ] Duplicate button works
  - [ ] Creates copy of component
  - [ ] Copy has new ID
  - [ ] Copy appears on canvas
- [ ] Delete button works
  - [ ] Removes component from canvas
  - [ ] Shows success toast
  - [ ] Sidebar closes

### ✅ Keyboard Shortcuts
- [ ] Delete key removes selected component
- [ ] Escape key deselects component
- [ ] Ctrl+D duplicates component
- [ ] Backspace does NOT delete (safe for text editing)

### ✅ Save & Publish
- [ ] Save button works
  - [ ] Shows "Saving..." state
  - [ ] Shows success toast
  - [ ] Styles persist after reload
- [ ] Publish button works
  - [ ] Shows success toast
  - [ ] Page status changes to "Published"
  - [ ] Styles visible on live page
- [ ] Unpublish button works (if published)
  - [ ] Shows success toast
  - [ ] Page status changes to "Draft"

### ✅ Live Preview
- [ ] All style changes update immediately
- [ ] No lag or delay
- [ ] Canvas reflects exact styles
- [ ] Preview mode works (Eye button)

### ✅ Error Handling
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Image upload errors show toast
- [ ] Save errors show toast
- [ ] Publish errors show toast

## Bug Report Template

If you find any issues, report them like this:

```
### Bug: [Short description]

**Steps to Reproduce**:
1. 
2. 
3. 

**Expected**: 
**Actual**: 
**Console Errors**: 
**Screenshot**: 
```

## Performance Checklist

- [ ] Page builder loads in < 2 seconds
- [ ] Component selection is instant
- [ ] Style updates are instant
- [ ] No lag when typing
- [ ] No lag when dragging sliders
- [ ] Save completes in < 1 second
- [ ] Publish completes in < 1 second

## Browser Testing

Test in multiple browsers:
- [ ] Chrome
- [ ] Firefox
- [ ] Edge
- [ ] Safari (if available)

## Mobile Responsive (Optional)

- [ ] Page builder works on tablet
- [ ] Panels are scrollable
- [ ] Controls are usable

## Final Verification

- [ ] All panels work correctly
- [ ] All controls work correctly
- [ ] Styles save to database
- [ ] Styles show on live page
- [ ] No errors in console
- [ ] No TypeScript errors
- [ ] Performance is good

## Success Criteria

✅ All checkboxes checked
✅ No critical bugs found
✅ Styles persist after save
✅ Styles visible on live page
✅ No console errors

---

**When all tests pass, Phase 1 & 2 integration is complete!** 🎉
