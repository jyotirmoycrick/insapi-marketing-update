# Testing Instructions - Step by Step

## Prerequisites Check

1. **Backend .env file** (`backend/.env`):
```env
MONGO_URL=mongodb+srv://malojyotirmoy_db_user:Nowi31GzwngMCPAh@cluster0.msr2ik5.mongodb.net/
DB_NAME=insapi_marketing
```

2. **Frontend .env file** (`frontend/.env`):
```env
VITE_API_URL=http://127.0.0.1:8000/api
```

## Step 1: Start Backend

```bash
cd backend
python server.py
```

**Expected Output:**
```
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000
```

**Test Backend Health:**
Open browser: `http://localhost:8000/api/health`

Should see:
```json
{
  "status": "ok",
  "timestamp": "2024-..."
}
```

## Step 2: Start Frontend

```bash
cd frontend
npm run dev
```

**Expected Output:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

## Step 3: Test Admin Login

1. Open: `http://localhost:5173/fast-admin`
2. Enter credentials:
   - Username: `malo`
   - Password: `1234567890`
3. Click "Login"

**Expected:** Redirects to admin dashboard

## Step 4: Test Navigation Manager

1. Click "Navigation" tab in sidebar
2. You should see navigation settings form
3. Try adding a new menu item:
   - Label: "Test Page"
   - Path: "/test"
   - Type: "link"
4. Click "Save Changes"

**Expected:** Toast message "Navigation saved successfully"

5. Open frontend in new tab: `http://localhost:5173/`
6. Check header - should see "Test Page" link

## Step 5: Test Page Manager

1. Click "Page Manager" tab
2. You should see:
   - List of static pages (if any)
   - List of editable pages

### Test Converting Static Page:
1. Find a static page (e.g., "Home Page")
2. Click "Make Editable" button
3. Wait for conversion

**Expected:** 
- Toast: "Home Page is now editable!"
- Page moves to "Editable Pages" section

### Test Creating New Page:
1. Click "Create New Page" button
2. Enter page name: "Test Page"
3. Page should be created

## Step 6: Test Elementor Page Builder

1. In Page Manager, click edit icon (pencil) on any page
2. **ElementorPageBuilder should open**

### Test Component Library:
1. Left sidebar shows all available components
2. Try dragging "Heading" component to canvas
3. Should see blue drop indicator
4. Drop it - component appears on canvas

### Test Component Selection:
1. Click on the heading you just added
2. Should see:
   - Blue outline around component
   - Toolbar appears above component
   - Properties panel opens on right

### Test Properties Panel:
1. With heading selected, in properties panel:
2. Change "Content" text to "Hello World"
3. Change "Font Size" to "48px"
4. Change "Text Color" to red
5. Changes should apply immediately

### Test Padding & Margin:
1. In properties panel, find "Padding" field
2. Enter: "40px"
3. Component should have more space inside

4. Find "Margin" field
5. Enter: "20px"
6. Component should have more space around it

### Test Container Nesting:
1. Drag "Section" component to canvas
2. Section appears with "Drop components here" text
3. Drag "Text" component
4. Hover over the section - should see blue highlight
5. Drop inside section
6. Text should appear inside section

### Test Keyboard Shortcuts:
1. Select a component (click it)
2. Press **Delete** key
3. Component should be removed

4. Select another component
5. Press **Ctrl+D**
6. Component should be duplicated

7. Press **Escape**
8. Component should be deselected

### Test Drag to Reorder:
1. Add 3 components to canvas
2. Drag the bottom one to the top
3. Should see blue line indicator
4. Drop it - order should change

### Test Save:
1. Click "Save" button in top bar
2. **Expected:** Toast "Page saved successfully"

### Test Preview:
1. Click "Preview" button
2. Should see page without edit controls
3. Click "Edit" to go back

## Step 7: Test Live Page Rendering

1. In Page Manager, make sure page is published
2. Note the page route (e.g., "/test-page")
3. Open new tab: `http://localhost:5173/test-page`

**Expected:**
- All components render correctly
- Styling is applied
- No edit controls visible

### Test Form Widget on Live Page:
1. In page builder, add "Form" component
2. Save and publish page
3. View on frontend
4. Fill out form and submit

**Expected:**
- Form submits successfully
- Success message appears
- Contact saved in database

## Step 8: Test Form Submission Backend

1. After submitting form on frontend
2. Go back to admin dashboard
3. Click "Contacts" tab
4. Should see the submitted contact

## Common Test Scenarios

### Scenario 1: Build a Landing Page
1. Create new page "Landing"
2. Add Hero section
3. Add Stats block
4. Add Form
5. Style each component
6. Save and publish
7. View on frontend

### Scenario 2: Edit Existing Page
1. Open page in builder
2. Change text content
3. Change colors
4. Add new components
5. Reorder components
6. Save
7. Verify changes on frontend

### Scenario 3: Complex Layout
1. Add Section (flexbox)
2. Set direction to "row"
3. Add 3 components inside
4. They should appear side by side
5. Add Grid container
6. Set columns to 3
7. Add 6 components inside
8. Should create 2 rows of 3 columns

## Troubleshooting Tests

### If drag & drop not working:
1. Check browser console for errors
2. Make sure you're not in preview mode
3. Try refreshing page

### If Delete key not working:
1. Make sure component is selected (blue outline)
2. Check browser console
3. Try clicking component again

### If API calls failing:
1. Check backend is running on port 8000
2. Check frontend .env has correct URL
3. Check browser network tab for errors
4. Verify CORS is not blocking requests

### If components not rendering on live page:
1. Check page is published
2. Check browser console for errors
3. Verify component data is saved correctly
4. Check API endpoint returns correct data

## Success Criteria

✅ Admin login works
✅ Navigation manager saves and updates header
✅ Page manager lists pages
✅ Can convert static pages to editable
✅ Page builder opens when clicking edit
✅ Can drag components from library
✅ Can drag to reorder components
✅ Can drag into containers
✅ Delete key removes components
✅ Properties panel updates components
✅ Padding/margin controls work
✅ Save button saves changes
✅ Preview mode works
✅ Live pages render all components correctly
✅ Forms submit successfully
✅ Contacts appear in admin dashboard

## Performance Tests

1. **Load Time**: Page builder should open in < 2 seconds
2. **Drag Smoothness**: No lag when dragging components
3. **Save Speed**: Save should complete in < 1 second
4. **Live Page Load**: Should load in < 1 second

## Browser Compatibility

Test in:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## Mobile Responsiveness

1. Open page builder on mobile
2. Should show warning or simplified interface
3. Live pages should be responsive
4. Forms should work on mobile

---

**All tests passing = System is working correctly** ✅
