# 📘 How to Run .sh Scripts on VPS

## Step-by-Step Guide

### Step 1: Upload Files to VPS

First, you need to get your files to the VPS. You have several options:

#### Option A: Using SCP (Secure Copy)
```bash
# From your local computer (Windows/Mac/Linux)
# Replace 'your-vps-ip' with your actual VPS IP (187.124.99.185)
# Replace 'your-username' with your VPS username

scp -r /path/to/your/local/project your-username@your-vps-ip:/path/on/vps/

# Example:
scp -r C:\Users\YourName\insapi_updated-main root@187.124.99.185:/var/www/
```

#### Option B: Using Git
```bash
# On your VPS, clone or pull your repository
ssh your-username@your-vps-ip

# Once logged in to VPS:
cd /var/www/
git clone https://github.com/your-repo/insapi.git
# OR if already cloned:
cd /var/www/insapi
git pull
```

#### Option C: Using FileZilla (GUI)
1. Download FileZilla Client
2. Connect to your VPS using SFTP
3. Drag and drop files from local to VPS

---

### Step 2: Connect to Your VPS

```bash
# From your local computer terminal
ssh your-username@187.124.99.185

# Example:
ssh root@187.124.99.185
# OR
ssh ubuntu@187.124.99.185
```

You'll be prompted for your password.

---

### Step 3: Navigate to Your Project Directory

```bash
# Once logged into VPS
cd /path/to/your/project

# Example:
cd /var/www/insapi
# OR
cd /home/ubuntu/insapi
# OR wherever you uploaded the files
```

---

### Step 4: Make Scripts Executable

Before running any `.sh` file, you need to make it executable:

```bash
# Make a single script executable
chmod +x deploy-all-fixes.sh

# OR make all .sh files executable at once
chmod +x *.sh
```

**What this does:** `chmod +x` gives the file "execute" permission, allowing it to run as a program.

---

### Step 5: Run the Script

Now you can run the script:

```bash
# Run the deployment script
./deploy-all-fixes.sh
```

**Note:** The `./` before the filename is important! It tells the system to run the file from the current directory.

---

## Complete Example Session

Here's what a complete session looks like:

```bash
# 1. Connect to VPS from your local computer
ssh root@187.124.99.185

# 2. Navigate to project
cd /var/www/insapi

# 3. Make script executable
chmod +x deploy-all-fixes.sh

# 4. Run the script
./deploy-all-fixes.sh
```

---

## All Available Scripts

Here are all the scripts you can run:

### Main Deployment Script
```bash
chmod +x deploy-all-fixes.sh
./deploy-all-fixes.sh
```
**What it does:** Deploys ALL fixes at once (recommended)

### Individual Fix Scripts
```bash
# Fix /fast-admin route only
chmod +x quick-fix-fast-admin.sh
./quick-fix-fast-admin.sh

# Fix image URLs only
chmod +x deploy-image-fix.sh
./deploy-image-fix.sh

# Fix performance only
chmod +x deploy-performance-boost.sh
./deploy-performance-boost.sh

# Setup Nginx proxy
chmod +x setup-nginx-proxy.sh
./setup-nginx-proxy.sh
```

### Diagnostic Script
```bash
# Check what's wrong
chmod +x diagnose-vps.sh
./diagnose-vps.sh
```

### Start/Stop Scripts
```bash
# Start all services
chmod +x start-all.sh
./start-all.sh

# Stop all services
chmod +x stop-all.sh
./stop-all.sh
```

---

## Troubleshooting

### Error: "Permission denied"

**Problem:** Script is not executable

**Solution:**
```bash
chmod +x deploy-all-fixes.sh
./deploy-all-fixes.sh
```

### Error: "No such file or directory"

**Problem:** You're in the wrong directory or file doesn't exist

**Solution:**
```bash
# Check where you are
pwd

# List files in current directory
ls -la

# Navigate to correct directory
cd /var/www/insapi

# Verify script exists
ls -la deploy-all-fixes.sh
```

### Error: "command not found"

**Problem:** Missing the `./` before filename

**Wrong:**
```bash
deploy-all-fixes.sh  # ❌ Won't work
```

**Correct:**
```bash
./deploy-all-fixes.sh  # ✅ Works
```

### Error: "bash: bad interpreter"

**Problem:** Script has Windows line endings (CRLF instead of LF)

**Solution:**
```bash
# Install dos2unix if not already installed
sudo apt-get install dos2unix

# Convert line endings
dos2unix deploy-all-fixes.sh

# Now run it
./deploy-all-fixes.sh
```

---

## Alternative: Run Without Making Executable

If you don't want to make the file executable, you can run it directly with bash:

```bash
bash deploy-all-fixes.sh
```

This works without `chmod +x`, but the standard way is to make it executable first.

---

## Step-by-Step Video Guide

Here's exactly what to type:

### 1. Connect to VPS
```bash
ssh root@187.124.99.185
# Enter password when prompted
```

### 2. Go to project folder
```bash
cd /var/www/insapi
# OR wherever your project is
```

### 3. Check files are there
```bash
ls -la
# You should see deploy-all-fixes.sh in the list
```

### 4. Make executable
```bash
chmod +x deploy-all-fixes.sh
```

### 5. Run it
```bash
./deploy-all-fixes.sh
```

### 6. Follow prompts
The script will ask you to confirm. Type `y` and press Enter.

---

## What Happens When You Run deploy-all-fixes.sh?

The script will:

1. ✅ Show you what it's going to do
2. ✅ Ask for confirmation (type `y`)
3. ✅ Update frontend .env file
4. ✅ Rebuild frontend
5. ✅ Setup Nginx cache directories
6. ✅ Ask you to update Nginx config (manual step)
7. ✅ Test Nginx configuration
8. ✅ Restart Nginx
9. ✅ Check backend is running
10. ✅ Show you a summary of what was done

**Total time:** About 2-5 minutes

---

## Quick Reference Card

```bash
# Connect to VPS
ssh root@187.124.99.185

# Go to project
cd /var/www/insapi

# Make executable
chmod +x deploy-all-fixes.sh

# Run script
./deploy-all-fixes.sh

# Check if it worked
curl https://insapimarketing.com
curl https://insapimarketing.com/fast-admin
```

---

## Common Questions

### Q: Do I need to run this on my local computer or VPS?
**A:** On your VPS! These scripts are meant to run on the server where your site is hosted.

### Q: Can I run this on Windows?
**A:** These are Linux/Unix scripts. They need to run on your VPS (which is Linux). If you're on Windows locally, you'll use SSH to connect to your VPS first.

### Q: What if I'm using Windows locally?
**A:** Use one of these to connect to your VPS:
- **PowerShell/CMD:** `ssh root@187.124.99.185`
- **PuTTY:** Download PuTTY and connect to your VPS IP
- **Windows Terminal:** Built-in SSH support
- **Git Bash:** Comes with Git for Windows

### Q: How do I know if it worked?
**A:** The script will show you:
- ✅ Green checkmarks for successful steps
- ❌ Red X for errors
- At the end, it shows a summary and test commands

### Q: Can I run it multiple times?
**A:** Yes! It's safe to run multiple times. It will just update everything again.

### Q: What if something goes wrong?
**A:** Run the diagnostic script:
```bash
chmod +x diagnose-vps.sh
./diagnose-vps.sh
```

---

## Need Help?

If you get stuck:

1. **Check you're on the VPS:**
   ```bash
   hostname
   # Should show your VPS hostname, not your local computer
   ```

2. **Check you're in the right directory:**
   ```bash
   pwd
   ls -la
   # Should see deploy-all-fixes.sh in the list
   ```

3. **Check the script exists:**
   ```bash
   cat deploy-all-fixes.sh
   # Should show the script content
   ```

4. **Try running with bash directly:**
   ```bash
   bash deploy-all-fixes.sh
   ```

---

## Summary

**To run any .sh script:**

1. Connect to VPS: `ssh root@187.124.99.185`
2. Go to project: `cd /var/www/insapi`
3. Make executable: `chmod +x script-name.sh`
4. Run it: `./script-name.sh`

**That's it!** 🎉

The most important script to run is:
```bash
./deploy-all-fixes.sh
```

This will deploy all the fixes at once.
