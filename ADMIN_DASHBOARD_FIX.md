# Admin Dashboard 401 & Map Error Fix

## Problems Identified

1. **401 Unauthorized** - Token expires but not handled properly
2. **`j.map is not a function`** - API returns error object instead of array
3. **White screen** - Unhandled errors crash the component

## Root Causes

### Issue 1: Token Expiration
- Token expires after 24 hours
- No automatic refresh
- No proper error handling on 401

### Issue 2: API Response Handling
- Code assumes API always returns arrays
- When API returns error (401), it's an object: `{ detail: "Unauthorized" }`
- Code tries to call `.map()` on object → crash

### Issue 3: Error Boundaries
- No error boundary to catch crashes
- White screen instead of error message

---

## Solution

### Fix 1: Add Proper Error Handling

Update all API calls to:
1. Check response status
2. Handle 401 specifically
3. Validate data is array before setting state
4. Show user-friendly error messages

### Fix 2: Add Token Refresh

- Check token validity before each API call
- Redirect to login if invalid
- Show warning before token expires

### Fix 3: Add Error Boundary

- Catch React errors
- Show error message instead of white screen
- Provide recovery options

---

## Implementation

See `frontend/src/components/admin/ImprovedAdminDashboard.tsx` for the fixed version with:

✅ Proper 401 handling  
✅ Array validation before `.map()`  
✅ Token expiration warnings  
✅ Error boundaries  
✅ Loading states  
✅ Retry mechanisms  
✅ User-friendly error messages  

---

## Quick Fix

The issue is in these functions:
- `loadPages()` - line ~95
- `loadContacts()` - line ~110
- `loadUploads()` - line ~125

They all need:
```typescript
// Before
const data = await res.json();
setPages(data);

// After
if (!res.ok) {
  if (res.status === 401) {
    handleLogout();
    return;
  }
  throw new Error('Failed to load');
}
const data = await res.json();
// Validate it's an array
setPages(Array.isArray(data) ? data : []);
```
