# Multi-Worker Authentication Testing Guide

## 🎯 Objective

Verify that the JWT-based authentication fix resolves intermittent 401 errors when running FastAPI with multiple Gunicorn workers.

## 📋 Prerequisites

1. Backend dependencies installed:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. MongoDB running and accessible

3. Gunicorn installed:
   ```bash
   pip install gunicorn
   ```

## 🧪 Test Scenarios

### Test 1: Single Worker (Baseline)

This should work even with the old code.

```bash
# Start with 1 worker
cd backend
gunicorn server:app -k uvicorn.workers.UvicornWorker -w 1 -b 0.0.0.0:8000
```

**Expected Result:** ✅ All authentication works perfectly

### Test 2: Multiple Workers (The Real Test)

This is where the old code fails and the new code succeeds.

```bash
# Start with 2 workers
cd backend
gunicorn server:app -k uvicorn.workers.UvicornWorker -w 2 -b 0.0.0.0:8000
```

**Expected Result with OLD code:** ❌ Random 401 errors (30-50% failure rate)
**Expected Result with NEW code:** ✅ No 401 errors (0% failure rate)

### Test 3: High Concurrency (Stress Test)

```bash
# Start with 4 workers
cd backend
gunicorn server:app -k uvicorn.workers.UvicornWorker -w 4 -b 0.0.0.0:8000
```

**Expected Result:** ✅ Consistent authentication under load

## 🔬 Automated Testing

### Run the Test Script

```bash
# Make sure backend is running with multiple workers
python3 test_multiworker_auth.py
```

### What the Script Tests

1. **Login**: Authenticates and gets a token
2. **Token Verification**: Verifies the token works
3. **Concurrent Requests**: Makes 50 simultaneous authenticated requests
4. **Analysis**: Reports success/failure rates

### Interpreting Results

#### ✅ Success (Fixed)
```
📊 Test Results:
   Total requests: 50
   Verify failures: 0 (0.0%)
   Pages failures: 0 (0.0%)
   Errors: 0

✅ PASS: No authentication issues detected
```

#### ❌ Failure (Broken)
```
📊 Test Results:
   Total requests: 50
   Verify failures: 23 (46.0%)
   Pages failures: 25 (50.0%)
   Errors: 25

❌ FAIL: Authentication issues detected with multiple workers
```

## 🖱️ Manual Testing

### Step 1: Start Backend with Multiple Workers

```bash
cd backend
gunicorn server:app -k uvicorn.workers.UvicornWorker -w 2 -b 0.0.0.0:8000
```

### Step 2: Start Frontend

```bash
# In another terminal
npm run dev
```

### Step 3: Test Admin Dashboard

1. Go to: http://localhost:5173/fast-admin
2. Login with: `malo` / `1234567890`
3. Perform these actions multiple times (10-20 times each):

   **Navigation Manager:**
   - Update contact email
   - Save changes
   - Refresh page
   - Update again

   **Page Manager:**
   - Click "Make Editable" on different pages
   - Create a new page
   - Update page content
   - Delete a page

   **Settings:**
   - Update SMTP settings
   - Save settings
   - Test email

   **File Upload:**
   - Upload multiple images
   - Delete images
   - List uploads

### Step 4: Monitor for 401 Errors

**With OLD code (broken):**
- You'll see random "Unauthorized" errors
- Some requests succeed, others fail
- Refreshing sometimes helps, sometimes doesn't
- Console shows 401 status codes

**With NEW code (fixed):**
- All requests succeed consistently
- No "Unauthorized" errors
- Smooth user experience
- No 401 status codes in console

## 🔍 Debugging

### Check Which Workers Are Running

```bash
ps aux | grep gunicorn
```

You should see:
- 1 master process
- N worker processes (where N is your -w parameter)

### Monitor Worker Logs

```bash
# Run without daemon mode to see logs
cd backend
gunicorn server:app -k uvicorn.workers.UvicornWorker -w 2 -b 0.0.0.0:8000 --access-logfile - --error-logfile -
```

Watch for:
- Which worker handles each request
- Any authentication errors
- Token verification failures

### Test Specific Worker

```bash
# Use curl to test authentication
TOKEN="your-token-here"

# Make multiple requests
for i in {1..20}; do
  curl -s "http://localhost:8000/api/admin/verify?token=$TOKEN" | jq .
  sleep 0.1
done
```

**Expected:** All requests return `{"valid": true}`

## 📊 Performance Comparison

### Before Fix (In-Memory Sessions)

| Workers | Success Rate | Notes |
|---------|--------------|-------|
| 1 | 100% | Works (single process) |
| 2 | ~50% | Random failures |
| 4 | ~25% | Worse with more workers |

### After Fix (JWT)

| Workers | Success Rate | Notes |
|---------|--------------|-------|
| 1 | 100% | Works |
| 2 | 100% | Works |
| 4 | 100% | Works |
| 8 | 100% | Works |

## 🐛 Common Issues

### Issue 1: "ModuleNotFoundError: No module named 'jwt'"

**Solution:**
```bash
pip install PyJWT==2.8.0
```

### Issue 2: "Address already in use"

**Solution:**
```bash
# Kill existing processes
pkill -f "gunicorn.*server:app"
# Wait a moment
sleep 2
# Try again
```

### Issue 3: Still seeing 401 errors

**Check:**
1. Did you restart the backend after applying the fix?
2. Is the frontend using the new token?
3. Clear browser localStorage and login again
4. Check JWT_SECRET is consistent across workers (it should be from environment)

### Issue 4: Token expires too quickly

**Solution:**
Adjust `JWT_EXPIRATION_DAYS` in `server.py`:
```python
JWT_EXPIRATION_DAYS = 7  # Change to desired number of days
```

## ✅ Acceptance Criteria

The fix is successful when:

- [ ] Login works on first attempt (100% success rate)
- [ ] Token verification succeeds consistently with 2 workers
- [ ] Token verification succeeds consistently with 4 workers
- [ ] No 401 errors during 50 concurrent requests
- [ ] Manual testing shows no authentication issues
- [ ] All admin dashboard features work reliably
- [ ] Frontend requires no changes
- [ ] Backward compatible with existing tokens (after re-login)

## 🚀 Production Deployment

Once testing is complete:

1. **Set JWT Secret:**
   ```bash
   # Generate secure secret
   python3 -c "import secrets; print(secrets.token_urlsafe(32))"
   
   # Add to environment
   export JWT_SECRET="your-generated-secret"
   ```

2. **Update systemd service** (if using):
   ```ini
   [Service]
   Environment="JWT_SECRET=your-generated-secret"
   ExecStart=/usr/bin/gunicorn server:app -k uvicorn.workers.UvicornWorker -w 2 -b 127.0.0.1:8000
   ```

3. **Restart service:**
   ```bash
   sudo systemctl restart insapi-backend
   ```

4. **Monitor logs:**
   ```bash
   sudo journalctl -u insapi-backend -f
   ```

5. **Test production:**
   - Login to admin dashboard
   - Perform various operations
   - Monitor for any 401 errors
   - Check application logs

## 📚 Additional Resources

- [JWT.io](https://jwt.io/) - Debug and inspect JWT tokens
- [PyJWT Docs](https://pyjwt.readthedocs.io/) - Library documentation
- [Gunicorn Workers](https://docs.gunicorn.org/en/stable/design.html) - Understanding worker processes
- [FastAPI Security](https://fastapi.tiangolo.com/tutorial/security/) - Security best practices

## 🎓 Understanding the Fix

### Why In-Memory Sessions Fail

```python
# Worker 1's memory
active_sessions = {"abc123": {...}}

# Worker 2's memory (separate process)
active_sessions = {}  # Empty! Token doesn't exist here
```

### Why JWT Works

```python
# Token contains everything needed
token = "eyJ0eXAiOiJKV1QiLCJhbGc..."

# Any worker can verify using shared secret
jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
# ✅ Works in Worker 1
# ✅ Works in Worker 2
# ✅ Works in Worker N
```

The token is **self-contained** and **cryptographically signed**, so any worker can verify it independently without needing to check shared memory or a database.
