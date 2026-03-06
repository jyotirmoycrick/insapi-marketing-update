# 🎯 Visual Step-by-Step Deployment Guide

## For Windows Users

### Method 1: Using PowerShell (Easiest)

#### Step 1: Open PowerShell
1. Press `Windows Key + X`
2. Click "Windows PowerShell" or "Terminal"

#### Step 2: Connect to Your VPS
```powershell
ssh root@187.124.99.185
```

**What you'll see:**
```
The authenticity of host '187.124.99.185' can't be established.
Are you sure you want to continue connecting (yes/no)? 
```
Type: `yes` and press Enter

Then enter your VPS password (it won't show as you type - this is normal!)

**After successful login, you'll see:**
```
Welcome to Ubuntu 20.04 LTS
root@your-vps:~#
```

#### Step 3: Navigate to Your Project
```bash
cd /var/www/insapi
```

**Or find where your project is:**
```bash
# List directories
ls -la

# Common locations:
cd /var/www/insapi
# OR
cd /home/ubuntu/insapi
# OR
cd /root/insapi
```

#### Step 4: Verify Files Are There
```bash
ls -la
```

**You should see:**
```
-rw-r--r-- 1 root root  9891 Mar  6 17:20 deploy-all-fixes.sh
-rw-r--r-- 1 root root  5234 Mar  6 17:15 diagnose-vps.sh
drwxr-xr-x 5 root root  4096 Mar  6 16:30 frontend
drwxr-xr-x 4 root root  4096 Mar  6 16:30 backend
```

#### Step 5: Make Script Executable
```bash
chmod +x deploy-all-fixes.sh
```

**No output means success!**

#### Step 6: Run the Deployment Script
```bash
./deploy-all-fixes.sh
```

**You'll see:**
```
==========================================
🚀 Complete Deployment Script
   InsAPI Marketing CMS
==========================================

This script will:
  1. Update frontend .env configuration
  2. Rebuild frontend with all optimizations
  3. Set up Nginx caching
  4. Configure Nginx proxy for uploads
  5. Restart all services
  6. Verify deployment

Configuration:
  Domain: insapimarketing.com
  Backend: http://187.124.99.185:8000
  App Directory: /var/www/insapi

Continue with deployment? (y/n)
```

Type: `y` and press Enter

#### Step 7: Watch the Magic Happen! ✨

The script will show progress:
```
==========================================
Starting Deployment...
==========================================

[1/8] Updating frontend .env...
✓ Backed up existing .env
✓ Updated .env:
VITE_API_URL=https://insapimarketing.com/api

[2/8] Checking dependencies...
✓ Dependencies already installed

[3/8] Building frontend...
vite v4.3.9 building for production...
✓ 1234 modules transformed.
dist/index.html                   0.45 kB
dist/assets/index-abc123.css     45.67 kB
dist/assets/index-xyz789.js     234.56 kB
✓ Frontend built successfully

[4/8] Setting up Nginx cache...
✓ Cache directories created

[5/8] Backing up Nginx configuration...
✓ Backup created: /etc/nginx/sites-available/insapimarketing.backup.20260306_172030

[6/8] Updating Nginx configuration...
⚠ MANUAL STEP REQUIRED:
...
```

#### Step 8: Update Nginx Config (Manual Step)

When prompted, open another terminal/PowerShell window and run:
```bash
ssh root@187.124.99.185
sudo nano /etc/nginx/sites-available/insapimarketing
```

**Or use your preferred editor:**
```bash
sudo vim /etc/nginx/sites-available/insapimarketing
# OR
sudo vi /etc/nginx/sites-available/insapimarketing
```

Copy the configuration shown in the script output and paste it into the file.

**To save in nano:**
1. Press `Ctrl + X`
2. Press `Y` (yes to save)
3. Press `Enter` (confirm filename)

**To save in vim:**
1. Press `Esc`
2. Type `:wq`
3. Press `Enter`

Go back to the first terminal and press Enter to continue.

#### Step 9: Script Completes

```
[7/8] Testing and restarting Nginx...
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
✓ Nginx config is valid
Restarting Nginx...
✓ Nginx restarted

[8/8] Verifying backend...
✓ Backend is running
✓ Backend API is responding

==========================================
✅ Deployment Complete!
==========================================

What was deployed:
  ✓ Frontend .env updated to use domain
  ✓ Frontend rebuilt with all optimizations
  ✓ Nginx cache directories created
  ✓ Nginx configuration updated
  ✓ Nginx restarted
  ✓ Backend verified/started

Fixes included:
  ✓ /fast-admin route fix
  ✓ Dynamic image URLs
  ✓ Media library full URLs
  ✓ 401 error handling
  ✓ Performance optimizations
  ✓ Image caching (1 year)
  ✓ API caching (5 minutes)
  ✓ Gzip compression

URLs:
  Frontend: https://insapimarketing.com
  Admin: https://insapimarketing.com/fast-admin
  API: https://insapimarketing.com/api
  Uploads: https://insapimarketing.com/uploads

🎉 Your site is now fully optimized and deployed!
```

---

## Method 2: Using PuTTY (Windows)

### Step 1: Download PuTTY
1. Go to: https://www.putty.org/
2. Download and install PuTTY

### Step 2: Open PuTTY
1. Run PuTTY
2. In "Host Name" field, enter: `187.124.99.185`
3. Port: `22`
4. Connection type: `SSH`
5. Click "Open"

### Step 3: Login
1. Login as: `root` (or your username)
2. Enter your password

### Step 4: Follow Steps 3-9 from Method 1 Above

---

## Method 3: Using Git Bash (Windows)

### Step 1: Install Git for Windows
1. Download from: https://git-scm.com/download/win
2. Install with default options

### Step 2: Open Git Bash
1. Right-click on desktop
2. Select "Git Bash Here"

### Step 3: Follow Steps 2-9 from Method 1 Above

---

## For Mac/Linux Users

### Step 1: Open Terminal
- **Mac:** Press `Cmd + Space`, type "Terminal", press Enter
- **Linux:** Press `Ctrl + Alt + T`

### Step 2: Follow Steps 2-9 from Method 1 Above

---

## Visual Checklist

### Before Running Script:
- [ ] Connected to VPS via SSH
- [ ] In correct project directory (`cd /var/www/insapi`)
- [ ] Can see `deploy-all-fixes.sh` when running `ls -la`
- [ ] Made script executable (`chmod +x deploy-all-fixes.sh`)

### During Script Execution:
- [ ] Confirmed deployment (typed `y`)
- [ ] Watched progress messages
- [ ] Updated Nginx config when prompted
- [ ] Saw "✅ Deployment Complete!" message

### After Script Completes:
- [ ] Test frontend: Open https://insapimarketing.com in browser
- [ ] Test admin: Open https://insapimarketing.com/fast-admin
- [ ] Login with: `malo` / `1234567890`
- [ ] Upload an image
- [ ] Copy URL from media library
- [ ] Verify it's a full URL with domain

---

## Common Screens You'll See

### 1. SSH Connection
```
$ ssh root@187.124.99.185
root@187.124.99.185's password: [type password here]
Last login: Fri Mar  6 17:00:00 2026 from xxx.xxx.xxx.xxx
root@vps:~#
```

### 2. Directory Navigation
```
root@vps:~# cd /var/www/insapi
root@vps:/var/www/insapi#
```

### 3. File Listing
```
root@vps:/var/www/insapi# ls -la
total 156
drwxr-xr-x  8 root root  4096 Mar  6 17:20 .
drwxr-xr-x  3 root root  4096 Mar  5 10:00 ..
-rw-r--r--  1 root root  9891 Mar  6 17:20 deploy-all-fixes.sh
-rw-r--r--  1 root root  5234 Mar  6 17:15 diagnose-vps.sh
drwxr-xr-x  5 root root  4096 Mar  6 16:30 frontend
drwxr-xr-x  4 root root  4096 Mar  6 16:30 backend
```

### 4. Making Executable
```
root@vps:/var/www/insapi# chmod +x deploy-all-fixes.sh
root@vps:/var/www/insapi#
```
(No output = success!)

### 5. Running Script
```
root@vps:/var/www/insapi# ./deploy-all-fixes.sh
==========================================
🚀 Complete Deployment Script
...
```

---

## Troubleshooting Visual Guide

### Problem: "Permission denied"
```
root@vps:/var/www/insapi# ./deploy-all-fixes.sh
-bash: ./deploy-all-fixes.sh: Permission denied
```

**Solution:**
```bash
chmod +x deploy-all-fixes.sh
./deploy-all-fixes.sh
```

### Problem: "No such file or directory"
```
root@vps:/var/www/insapi# ./deploy-all-fixes.sh
-bash: ./deploy-all-fixes.sh: No such file or directory
```

**Solution:**
```bash
# Check where you are
pwd

# List files
ls -la

# Find the script
find / -name "deploy-all-fixes.sh" 2>/dev/null

# Go to correct directory
cd /path/to/correct/directory
```

### Problem: "command not found"
```
root@vps:/var/www/insapi# deploy-all-fixes.sh
-bash: deploy-all-fixes.sh: command not found
```

**Solution:** Add `./` before the filename:
```bash
./deploy-all-fixes.sh
```

---

## Quick Copy-Paste Commands

### Complete Deployment (Copy All at Once)
```bash
# Connect to VPS
ssh root@187.124.99.185

# Navigate to project
cd /var/www/insapi

# Make executable and run
chmod +x deploy-all-fixes.sh && ./deploy-all-fixes.sh
```

### Test After Deployment
```bash
# Test frontend
curl https://insapimarketing.com

# Test admin route
curl https://insapimarketing.com/fast-admin

# Test API
curl https://insapimarketing.com/api/components/templates

# Test image caching
curl -I https://insapimarketing.com/uploads/test.jpg
```

---

## Video Tutorial Script

If you want to record yourself or follow along:

1. **[0:00-0:30]** Open PowerShell/Terminal
2. **[0:30-1:00]** Connect to VPS: `ssh root@187.124.99.185`
3. **[1:00-1:30]** Navigate: `cd /var/www/insapi`
4. **[1:30-2:00]** Check files: `ls -la`
5. **[2:00-2:30]** Make executable: `chmod +x deploy-all-fixes.sh`
6. **[2:30-3:00]** Run script: `./deploy-all-fixes.sh`
7. **[3:00-5:00]** Watch deployment progress
8. **[5:00-6:00]** Update Nginx config (manual step)
9. **[6:00-7:00]** Script completes
10. **[7:00-8:00]** Test in browser

**Total time: ~8 minutes**

---

## Success! What Next?

After successful deployment:

1. **Open your browser**
2. **Visit:** https://insapimarketing.com
3. **Go to admin:** https://insapimarketing.com/fast-admin
4. **Login:** `malo` / `1234567890`
5. **Test image upload**
6. **Check media library shows full URLs**
7. **Verify everything works!**

---

## Need More Help?

Run the diagnostic script:
```bash
chmod +x diagnose-vps.sh
./diagnose-vps.sh
```

This will check:
- ✅ Nginx status
- ✅ Backend status
- ✅ MongoDB status
- ✅ File permissions
- ✅ Configuration files
- ✅ Network connectivity

---

**You're all set! The visual guide should make it easy to follow along.** 🎉
