# Unit Testing Guide - Verify Units Work Correctly

## Quick Test

### 1. Start Services
```bash
# Terminal 1
cd backend && python server.py

# Terminal 2
cd frontend && npm run dev
```

### 2. Login
- URL: http://localhost:5173/admin
- Username: `malo`
- Password: `1234567890`

### 3. Open Page Builder
- Dashboard → Pages → Edit (any page)

## Test 1: Percentage Width

### Steps:
1. Add a Section component (drag from left sidebar)
2. Click to select it
3. Right sidebar opens → Layout panel
4. Width slider: Set to 100
5. Unit dropdown: Select `%`
6. Look at canvas

### Expected Result:
- Component should take full width of canvas
- Right-click → Inspect → Should show `width: 100%` (not `width: 100px`)

### ✅ Pass Criteria:
- [ ] Component fills full width
- [ ] DevTools shows `width: 100%`
- [ ] No `width: 100px` anywhere

## Test 2: Viewport Height

### Steps:
1. Select the same section
2. Height slider: Set to 100
3. Unit dropdown: Select `vh`
4. Look at canvas

### Expected Result:
- Component should take full viewport height
- Right-click → Inspect → Should show `height: 100vh`

### ✅ Pass Criteria:
- [ ] Component fills full height
- [ ] DevTools shows `height: 100vh`
- [ ] No `height: 100px` anywhere

## Test 3: Mixed Units

### Steps:
1. Select the section
2. Set:
   - Width: 80, Unit: `vw`
   - Height: 50, Unit: `vh`
   - Min Height: 300, Unit: `px`
3. Look at canvas

### Expected Result:
- Width: 80% of viewport width
- Height: 50% of viewport height
- Min height: 300 pixels

### ✅ Pass Criteria:
- [ ] DevTools shows `width: 80vw`
- [ ] DevTools shows `height: 50vh`
- [ ] DevTools shows `min-height: 300px`

## Test 4: Em/Rem Units

### Steps:
1. Add a Flexbox container
2. Select it
3. Set Gap: 2, Unit: `rem`
4. Add 2 text components inside
5. Look at spacing

### Expected Result:
- Gap between components should be 2x root font size
- DevTools shows `gap: 2rem`

### ✅ Pass Criteria:
- [ ] Visible spacing between components
- [ ] DevTools shows `gap: 2rem`
- [ ] Spacing scales with font size

## Test 5: Save & Reload

### Steps:
1. Set width to 100, unit to `%`
2. Click "Save" button
3. Wait for success toast
4. Refresh page (F5)
5. Select component again

### Expected Result:
- Width slider shows: 100
- Unit dropdown shows: `%`
- Component still full width

### ✅ Pass Criteria:
- [ ] Width value persists
- [ ] Unit selection persists
- [ ] Component renders correctly

## Test 6: Publish & View Live

### Steps:
1. Set width to 100, unit to `%`
2. Click "Save"
3. Click "Publish"
4. Open live page in new tab
5. Right-click component → Inspect

### Expected Result:
- Live page shows component with `width: 100%`
- Not `width: 100px`

### ✅ Pass Criteria:
- [ ] Live page renders correctly
- [ ] DevTools shows correct units
- [ ] Responsive behavior works

## Test 7: Text Component Typography

### Steps:
1. Add a Text component
2. Select it
3. Typography panel → Font Size: 32, Unit: (should be px)
4. Look at text

### Expected Result:
- Text should be 32px
- DevTools shows `font-size: 32px`

### ✅ Pass Criteria:
- [ ] Text size changes
- [ ] DevTools shows `font-size: 32px`

## Test 8: Heading Component

### Steps:
1. Add a Heading component
2. Select it
3. Content section → Heading Tag: Select `H1`
4. Type some text
5. Look at canvas

### Expected Result:
- Text renders as H1 (large)
- HTML shows `<h1>Your Text</h1>`

### ✅ Pass Criteria:
- [ ] Heading renders as H1
- [ ] DevTools shows `<h1>` tag
- [ ] Font size is H1 default

## Browser DevTools Check

### How to Check:
1. Right-click component on canvas
2. Select "Inspect" or "Inspect Element"
3. Look at "Styles" or "Computed" tab
4. Find the width/height properties

### What to Look For:
```css
/* ✅ CORRECT */
width: 100%;
height: 50vh;
gap: 2rem;

/* ❌ WRONG */
width: 100px;
height: 50px;
gap: 2px;
```

## Common Issues

### Issue 1: Still Showing px
**Symptom**: DevTools shows `width: 100px` instead of `width: 100%`

**Solution**: 
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+F5)
- Restart frontend dev server

### Issue 2: Unit Dropdown Not Showing
**Symptom**: No dropdown next to value input

**Solution**:
- Check SliderControl has `showUnitSelector={true}`
- Check LayoutPanel passes `onUnitChange` prop

### Issue 3: Units Not Saving
**Symptom**: Units reset after reload

**Solution**:
- Check database has `widthUnit`, `heightUnit` fields
- Check `updateComponentStyles` saves unit fields
- Check backend saves all style properties

### Issue 4: Wrong Units on Live Page
**Symptom**: Page builder shows %, live page shows px

**Solution**:
- Check LivePageRenderer uses same `getStyleString` logic
- Ensure published page fetches latest data
- Clear browser cache

## Success Criteria

All tests pass when:
- ✅ Unit dropdowns appear and work
- ✅ Selected units apply to components
- ✅ DevTools shows correct CSS units
- ✅ Units persist after save/reload
- ✅ Units work on published pages
- ✅ No hardcoded px values
- ✅ Responsive behavior works correctly

## Final Verification

### Checklist:
- [ ] Test 1: Percentage width works
- [ ] Test 2: Viewport height works
- [ ] Test 3: Mixed units work
- [ ] Test 4: Em/Rem units work
- [ ] Test 5: Save & reload works
- [ ] Test 6: Publish & live works
- [ ] Test 7: Typography works
- [ ] Test 8: Heading tag works
- [ ] DevTools shows correct units
- [ ] No console errors

### When All Pass:
✅ Unit selector feature is working correctly!
✅ Components use selected units (%, vh, vw, em, rem)
✅ No more hardcoded px values
✅ Ready for production use

---

**Test and verify!** 🎉
