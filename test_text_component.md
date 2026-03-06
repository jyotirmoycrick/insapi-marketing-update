# Text Component & Text Align Test

## Issue 1: Text Block Not Adding

**Possible Causes**:
1. Component templates not loading from backend
2. Frontend not fetching templates
3. Template data structure mismatch

**Test**:
1. Open browser console (F12)
2. Go to page builder
3. Check Network tab for `/api/components/templates` request
4. Should return list of components including "Text Block"

## Issue 2: Text Align Not Working

**Root Cause**: Text align is being saved in `styles.textAlign` but the component might have old data in `props.align`.

**Current Flow**:
1. User clicks center align in Typography panel
2. Saves to `styles.textAlign = 'center'`
3. getStyleString converts to `css.textAlign = 'center'`
4. Applied to `<p style={style}>`
5. Should work!

**Possible Issues**:
1. Old components have `props.align` instead of `styles.textAlign`
2. Component not re-rendering after style change
3. Style not being saved to database

## Quick Fix

### For Text Align:

The text and heading components should use the style from getStyleString which includes textAlign.

Current rendering:
```typescript
case 'text':
  return <p style={style}>{comp.props.content}</p>;

case 'heading':
  const HeadingTag = comp.props.tag || 'h2';
  return React.createElement(HeadingTag, { style }, comp.props.content);
```

This should work! The `style` object from `getStyleString` includes `textAlign`.

### For Text Block Not Adding:

Check if:
1. Backend is running
2. `/api/components/templates` endpoint works
3. Frontend is fetching templates
4. Templates are being displayed in left sidebar

## Testing Steps

### Test 1: Check Templates Loading
1. Open page builder
2. Open browser console (F12)
3. Run: `fetch('http://localhost:8000/api/components/templates').then(r => r.json()).then(console.log)`
4. Should see list of components

### Test 2: Check Text Block Appears
1. Look at left sidebar in page builder
2. Should see "Text Block" component
3. Try dragging it to canvas
4. Should add successfully

### Test 3: Check Text Align
1. Add a text or heading component
2. Select it
3. Open Typography panel
4. Click center align button
5. Component should center immediately
6. Click Save
7. Reload page
8. Should still be centered

### Test 4: Check Live Page
1. After saving and publishing
2. Open live page
3. Text should be centered
4. Right-click → Inspect
5. Should show `text-align: center` in styles

## Debug Commands

### Check if templates are loading:
```javascript
// In browser console
fetch('http://localhost:8000/api/components/templates')
  .then(r => r.json())
  .then(data => {
    console.log('Templates:', data);
    console.log('Text component:', data.components.find(c => c.type === 'text'));
  });
```

### Check component styles:
```javascript
// In browser console, after selecting a component
console.log('Selected component:', selectedComponent);
console.log('Styles:', selectedComponent.styles);
console.log('Text align:', selectedComponent.styles.textAlign);
```

### Check rendered style:
```javascript
// Right-click component → Inspect
// In Elements tab, check computed styles
// Look for text-align property
```

## Expected Behavior

### Text Block:
- ✅ Should appear in left sidebar
- ✅ Should be draggable to canvas
- ✅ Should have default text "Enter your text here"
- ✅ Should be editable

### Text Align:
- ✅ Should update immediately when clicked
- ✅ Should persist after save
- ✅ Should show on live page
- ✅ Should show in DevTools as `text-align: center`

## If Still Not Working

### For Text Block:
1. Check backend console for errors
2. Check frontend console for errors
3. Verify API_URL is correct
4. Try hard refresh (Ctrl+Shift+F5)

### For Text Align:
1. Check if style is being saved (console.log in updateComponentStyles)
2. Check if getStyleString is being called
3. Check if textAlign is in the style object
4. Check if component is re-rendering
5. Check database to see if textAlign is saved
