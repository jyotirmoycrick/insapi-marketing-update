# 🎨 Complete WordPress/Elementor-Style CMS - User Guide

## 🎉 Congratulations!

Your complete visual page builder is ready! You now have full control over everything on your website from the backend - just like WordPress with Elementor.

---

## 🔐 Accessing the Admin Panel

### Login Credentials:
- **URL**: `https://drag-drop-builder-11.preview.emergentagent.com/fast-admin`
- **Username**: `malo`
- **Password**: `1234567890`

⚠️ **Important**: Change these credentials in production by updating `/app/backend/server.py`

---

## ✨ What You Can Control (Everything!)

### ✅ Complete Visual Editing
- **Photos/Images**: Upload, change, delete any image
- **Text Content**: Edit all headings, paragraphs, buttons
- **Form Fields**: Modify form inputs, labels, placeholders
- **Sections**: Add, delete, rearrange entire sections
- **Layouts**: Choose between Grid or Flexbox layouts
- **Backgrounds**: Add background images and colors
- **Styles**: Control colors, fonts, spacing, borders, shadows

### ✅ Email & Admin Settings  
- **SMTP Configuration**: Set up your email server
- **Admin Email**: Where form submissions are sent
- **Sender Name**: Custom sender identity
- **Test Email**: Verify SMTP is working

### ✅ Preview & Publish System
- **Live Preview**: See changes before publishing
- **Draft Mode**: Work on pages without making them public
- **Publish/Unpublish**: Control page visibility instantly

---

## 📖 How to Use the Page Builder

### 1. **Dashboard Overview**

When you log in, you'll see 4 main sections in the sidebar:

#### 🏗️ **Page Builder** (Main Editor)
- Visual editor for creating and editing pages
- Component library on the left
- Canvas in the center
- Properties panel on the right

#### 🖼️ **Media Library**
- Upload images, photos, graphics
- View all uploaded files
- Copy image URLs
- Delete unused files

#### 👥 **Contacts**  
- View all form submissions
- See customer details (name, email, phone)
- Track submission sources
- Delete old contacts

#### ⚙️ **Settings**
- Configure SMTP email server
- Set admin email address
- Test email functionality

---

## 🎯 Step-by-Step: Creating a New Page

### Step 1: Create Page
1. Go to **Page Builder** tab
2. Click **+** button in Pages panel (left side)
3. Enter page name (e.g., "About Us")
4. Page is created with empty canvas

### Step 2: Add Components
Click any component from the **Components** panel:

#### Available Components:
- **Text Block** - Paragraphs and content
- **Heading** - H1, H2, H3, H4 headings
- **Image** - Photos and graphics
- **Button** - Call-to-action buttons
- **Section** - Container for other components
- **Grid Container** - Multi-column layouts
- **Flex Container** - Flexible row/column layouts
- **Contact Form** - Lead capture forms
- **Hero Section** - Large banner with background
- **Stats Block** - Number displays (e.g., "100+ Clients")
- **Divider** - Horizontal lines
- **Spacer** - Empty space for spacing

### Step 3: Edit Component
1. **Click** on any component in the canvas to select it
2. **Properties Panel** (right side) will show:
   - **Content Tab**: Edit text, images, links, form fields
   - **Styles Tab**: Colors, spacing, fonts, borders

### Step 4: Style Your Component

#### Content Properties:
- Text: Change the actual content
- Alignment: Left, Center, Right
- Link: Add URLs to buttons
- Image URL: Set image source

#### Style Properties:
- **Colors**: Click color picker or enter hex codes
- **Font Size**: e.g., `16px`, `1.5rem`, `24px`
- **Padding**: Internal spacing (e.g., `20px`)
- **Margin**: External spacing (e.g., `10px 0`)
- **Background**: Color or image URL
- **Border**: Width, style, color, radius
- **Width/Height**: Component dimensions

### Step 5: Reorder Components
- Click **↑** (Move Up) or **↓** (Move Down) buttons in Properties panel
- Components will shift position on the page

### Step 6: Delete Components
- Select component
- Click **🗑️** (Trash) icon in Properties panel
- Confirm deletion

### Step 7: Duplicate Components
- Select component
- Click **📋** (Copy) icon in Properties panel
- Duplicate appears at bottom of page

### Step 8: Save & Publish
1. Click **Save** button (top toolbar) to save draft
2. Click **Preview** to see how it looks
3. Click **Publish** to make page live on your website

---

## 🎨 Advanced Features

### Creating Layouts with Grid

1. Add **Grid Container** component
2. Select it and edit properties:
   - **Columns**: Number of columns (1-12)
   - **Gap**: Space between items (e.g., `20px`)
3. Add child components inside (they'll auto-arrange in grid)

### Creating Layouts with Flexbox

1. Add **Flex Container** component  
2. Select it and edit properties:
   - **Direction**: Row (horizontal) or Column (vertical)
   - **Justify**: Alignment along main axis
   - **Align**: Alignment along cross axis
   - **Gap**: Space between items
3. Add child components inside

### Adding Background Images

#### For Hero Sections:
1. Add **Hero Section** component
2. Select it and edit:
   - **Background Image**: Paste image URL or click Upload
   - **Overlay Color**: Add semi-transparent overlay (e.g., `rgba(0,0,0,0.5)`)

#### For Any Component:
1. Select component
2. Go to **Styles** section
3. Add style property: `backgroundImage`
4. Value: `url(YOUR_IMAGE_URL)`

### Customizing Forms

1. Add **Contact Form** component
2. Select it and edit **Fields** property (JSON format):

```json
[
  {
    "name": "fullName",
    "label": "Full Name",
    "type": "text",
    "required": true
  },
  {
    "name": "email",
    "label": "Email Address",
    "type": "email",
    "required": true
  },
  {
    "name": "phone",
    "label": "Phone Number",
    "type": "tel",
    "required": false
  },
  {
    "name": "message",
    "label": "Your Message",
    "type": "textarea",
    "required": false
  }
]
```

3. Change **Button Text** property
4. Forms automatically send emails to your admin email

---

## 📧 Setting Up Email (SMTP)

### For Gmail:

1. Go to **Settings** tab in admin panel
2. Fill in SMTP details:
   - **SMTP Host**: `smtp.gmail.com`
   - **SMTP Port**: `587`
   - **SMTP User**: Your Gmail address
   - **SMTP Password**: App-specific password (NOT your regular password)
   - **Admin Email**: Where you want to receive notifications
   - **Sender Name**: Your company/website name

3. **Getting Gmail App Password**:
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Factor Authentication
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Generate new app password
   - Copy and paste into SMTP Password field

4. Click **Save Settings**
5. Click **Send Test Email** to verify

### For Other Email Providers:

**Outlook/Office 365**:
- Host: `smtp.office365.com`
- Port: `587`

**Yahoo**:
- Host: `smtp.mail.yahoo.com`
- Port: `587`

**Custom SMTP**: Ask your hosting provider for details

---

## 📱 Responsive Design Tips

Your pages should look good on all devices. Here's how:

### Use Relative Units:
- ❌ Don't use: `width: 800px` (fixed)
- ✅ Use: `width: 100%` or `max-width: 1200px`

### Spacing:
- Use `padding: 20px 10px` (vertical horizontal)
- Use `margin: 0 auto` to center elements

### Images:
- Always set `width: 100%` for responsive images
- Use `max-width` to prevent images from being too large

### Font Sizes:
- Headings: `32px` to `48px`
- Body text: `16px` to `18px`
- Small text: `12px` to `14px`

---

## 🎯 Common Use Cases

### 1. **Change Homepage Hero Image**

1. Go to Page Builder
2. Select "Home" page (or your main page)
3. Click on Hero Section
4. In Properties panel:
   - Find **Background Image** field
   - Click Upload button (📤) or paste URL
5. Click **Save**

### 2. **Update Contact Form Email**

1. Go to **Settings** tab
2. Change **Admin Email** to your preferred email
3. Click **Save Settings**
4. All future form submissions will go to new email

### 3. **Add New Service Page**

1. Go to Page Builder
2. Click **+** to create new page
3. Name it (e.g., "SEO Services")
4. Add components:
   - Hero Section (with service description)
   - Text Blocks (features/benefits)
   - Stats Block (results/numbers)
   - Contact Form (lead capture)
5. Save and Publish

### 4. **Change Button Colors**

1. Select button component
2. Go to **Styles** section
3. Edit:
   - `backgroundColor`: `#FFA500` (orange)
   - `color`: `#000000` (black text)
   - `borderRadius`: `8px` (rounded corners)
   - `padding`: `12px 24px`
4. Click Save

### 5. **Create Multi-Column Layout**

1. Add **Grid Container**
2. Set **Columns**: `3`
3. Set **Gap**: `20px`
4. Add 3 components inside (e.g., Text Blocks or Cards)
5. They'll auto-arrange in 3 columns

---

## 🔧 Technical Details

### Backend (FastAPI)
- **Server**: Python FastAPI on port 8001
- **Database**: MongoDB
- **File Upload**: `/app/backend/uploads/`
- **Configuration**: `/app/backend/.env`

### Frontend (React + TypeScript)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Components**: Material UI + Radix UI

### API Endpoints

All endpoints use: `https://drag-drop-builder-11.preview.emergentagent.com/api`

#### Pages:
- `GET /pages` - List all pages
- `GET /pages/{page_id}` - Get single page
- `POST /pages` - Create new page
- `PUT /pages/{page_id}` - Update page
- `DELETE /pages/{page_id}` - Delete page
- `POST /pages/{page_id}/publish` - Publish page
- `POST /pages/{page_id}/unpublish` - Unpublish page

#### Media:
- `POST /upload` - Upload file
- `GET /uploads` - List all files
- `GET /uploads/{filename}` - Get file
- `DELETE /uploads/{filename}` - Delete file

#### Settings:
- `GET /settings/smtp` - Get SMTP settings
- `POST /settings/smtp` - Save SMTP settings
- `POST /settings/test-email` - Send test email

#### Contacts:
- `GET /contacts` - List contact submissions
- `DELETE /contacts/{id}` - Delete contact

---

## 🚨 Troubleshooting

### Problem: Changes not showing on live site
**Solution**: 
1. Make sure you clicked **Save** button
2. Check if page is **Published** (green dot)
3. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

### Problem: Images not uploading
**Solution**:
1. Check file size (keep under 5MB)
2. Use supported formats: .jpg, .png, .webp, .svg
3. Check `/app/backend/uploads/` folder permissions

### Problem: Form submissions not received
**Solution**:
1. Go to Settings tab
2. Click "Send Test Email"
3. If it fails, check SMTP credentials
4. Make sure you're using app-specific password for Gmail

### Problem: Can't delete page
**Solution**:
1. Make sure page is unpublished first
2. Refresh admin panel
3. Try again

### Problem: Component properties not updating
**Solution**:
1. Click away and re-select component
2. Make sure you're editing correct component (check name at top of Properties panel)
3. Click Save after changes

---

## 🎓 Best Practices

### Performance:
- ✅ Compress images before uploading (use TinyPNG.com)
- ✅ Limit page to 20-30 components max
- ✅ Use external images for large files
- ❌ Don't upload videos to media library (use YouTube/Vimeo instead)

### Design:
- ✅ Use consistent colors across site
- ✅ Maintain proper spacing (20-40px between sections)
- ✅ Keep forms simple (3-5 fields max)
- ✅ Use high-quality images
- ❌ Don't use too many fonts (2-3 max)

### Content:
- ✅ Write clear, concise copy
- ✅ Use descriptive button text ("Get Started" not "Click Here")
- ✅ Include clear calls-to-action
- ✅ Test forms before publishing

### SEO:
- ✅ Use proper heading hierarchy (H1 → H2 → H3)
- ✅ Add descriptive alt text to images
- ✅ Keep URLs clean and descriptive
- ✅ Create unique pages for each service/product

---

## 📊 Data Structure

### Page Object:
```json
{
  "page_id": "unique-page-id",
  "page_name": "About Us",
  "route": "/about-us",
  "components": [...],
  "is_published": true,
  "meta": {}
}
```

### Component Object:
```json
{
  "id": "comp_12345_abcde",
  "type": "heading",
  "props": {
    "content": "Welcome to Our Site",
    "tag": "h1",
    "align": "center"
  },
  "styles": {
    "fontSize": "48px",
    "color": "#1E3A5F",
    "fontWeight": "bold"
  },
  "children": [],
  "order": 0
}
```

---

## 🎉 What You Can Build

With this system, you can create:
- ✅ Landing pages
- ✅ Service pages
- ✅ About pages
- ✅ Contact pages
- ✅ Portfolio pages
- ✅ Pricing pages
- ✅ Blog-style content pages
- ✅ Thank you pages
- ✅ Custom forms
- ✅ Product showcase pages

---

## 🔐 Security Notes

### Change Admin Credentials:
1. Edit `/app/backend/server.py`
2. Find lines:
```python
ADMIN_USERNAME = "malo"
ADMIN_PASSWORD_HASH = hashlib.sha256("1234567890".encode()).hexdigest()
```
3. Change username and generate new hash:
```python
import hashlib
new_password = "your_secure_password"
print(hashlib.sha256(new_password.encode()).hexdigest())
```
4. Replace the hash
5. Restart backend: `sudo supervisorctl restart backend`

### Protect API Keys:
- Never expose SMTP passwords
- Store credentials in `.env` file
- Don't commit `.env` to Git

---

## 📞 Support

If you encounter issues:
1. Check this guide first
2. Look at browser console for errors (F12)
3. Check backend logs: `tail -f /var/log/supervisor/backend.err.log`
4. Check frontend logs: `tail -f /var/log/supervisor/frontend.err.log`

---

## 🎯 Quick Command Reference

### Restart Services:
```bash
sudo supervisorctl restart backend
sudo supervisorctl restart frontend
sudo supervisorctl restart all
```

### View Logs:
```bash
# Backend logs
tail -f /var/log/supervisor/backend.err.log

# Frontend logs  
tail -f /var/log/supervisor/frontend.err.log

# MongoDB logs
tail -f /var/log/supervisor/mongodb.log
```

### Check Status:
```bash
sudo supervisorctl status
```

---

## 🎊 You're All Set!

You now have complete control over your website from the backend - just like WordPress with Elementor!

**Your Admin Panel**: https://drag-drop-builder-11.preview.emergentagent.com/fast-admin

Start building your pages and watch your website come to life! 🚀

---

**Last Updated**: March 2026
**Version**: 1.0.0
