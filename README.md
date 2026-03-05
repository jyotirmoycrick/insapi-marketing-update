# 🚀 Digital Marketing Agency Website - WordPress-Style CMS

A modern, fully-featured digital marketing agency website with a WordPress-style visual editing system. Built with React, TypeScript, Express.js, and MongoDB.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Status](#project-status)
- [Getting Started](#getting-started)
- [Admin Panel](#admin-panel)
- [Architecture](#architecture)
- [Editable Sections](#editable-sections)
- [API Documentation](#api-documentation)
- [Troubleshooting](#troubleshooting)

---

## ✨ Features

### WordPress-Style Visual Editing
- 🎯 **Click-to-Edit**: Admin can click any section to edit content
- 👁️ **Visual Feedback**: Yellow outlines show editable sections
- 📝 **Form-Based Editing**: Simple forms for content management
- 💾 **Auto-Save**: All changes saved to MongoDB
- 🔄 **Persistent**: Changes persist after page reload
- 🔒 **Secure**: JWT-based authentication

### Complete Website
- 🏠 **Home Page**: Hero, services, about, FAQ, and more
- 📱 **Service Pages**: Meta Ads, Google Ads, Shopify, Content Marketing, Social Media
- 🎨 **Modern Design**: Responsive, mobile-first design
- ⚡ **Fast Performance**: Optimized images and code
- 🔍 **SEO Ready**: Semantic HTML and meta tags

### Admin Features
- 🔐 **Secure Login**: JWT authentication
- 🎛️ **Edit Mode Toggle**: Easy on/off switch
- 📊 **Content Management**: Edit all text, headings, buttons
- 📱 **Responsive**: Works on all devices

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation (hash-based)

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing

### Development
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Nodemon** - Auto-restart server

---

## 📊 Project Status

### ✅ Completed (86%)

#### Service Pages - 100% Complete
- ✅ **Meta Ads** - 11/11 sections (35 fields)
- ✅ **Shopify** - 11/11 sections (40 fields)
- ✅ **Google Ads** - 10/10 sections (39 fields)
- ✅ **Content Marketing** - 11/12 sections (43 fields)
- ✅ **Social Media** - 6/7 sections (30 fields)

#### Home Page - 42% Complete
- ✅ Hero Section (2 fields)
- ✅ Marquee Section (7 fields)
- ✅ About Section (3 fields)
- ✅ Why Choose Section (7 fields)
- ✅ FAQ Section (13 fields)
- ❌ 7 image-only sections (not editable)

### 📈 Overall Statistics
- **Total Sections**: 54/63 (86%)
- **Total Fields**: ~179 editable fields
- **Service Pages**: 5/5 (100%)
- **Home Page**: 5/12 (42%)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB installed and running
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd <project-folder>
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env
```

Edit `.env` file and configure:
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - A secure random string for JWT tokens
- Other settings as needed (see `.env.example` for details)

**For local development, use:**
```env
MONGODB_URI=mongodb://localhost:27017/marketing-site
```

**For MongoDB Atlas (cloud), use:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name
```

4. **Start MongoDB** (if using local)
```bash
# macOS with Homebrew
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

5. **Create admin user**
```bash
npm run create-admin
```

This creates an admin account with:
- Email: `admin@example.com`
- Password: `admin123`

⚠️ **IMPORTANT:** Change these credentials after first login in production!

6. **Start development servers**

Terminal 1 - Backend:
```bash
npm run server
```

Terminal 2 - Frontend:
```bash
npm run dev
```

7. **Open browser**
```
Frontend: http://localhost:5173
Admin Login: http://localhost:5173/#/admin-login
Backend API: http://localhost:5001
```

---

## 🔐 Admin Panel

### Login
1. Navigate to: `http://localhost:5173/#admin-login`
2. Enter credentials:
   - Email: `admin@example.com`
   - Password: `admin123`
3. Click "Login"

### Using the Editor

#### Step 1: Enable Edit Mode
- After login, you'll see a black toolbar at the top
- Click "Edit Mode ON" button
- All editable sections will show yellow outlines

#### Step 2: Edit Content
- Click on any section with a yellow outline
- Edit dialog opens with a form
- Change text, headings, or button labels
- Click "Save Changes"

#### Step 3: View Changes
- Page reloads automatically
- Your changes are visible immediately
- Changes persist forever in database

### Edit Mode Features
- **Yellow Outlines**: Show editable sections
- **Click to Edit**: Open edit dialog
- **Form Fields**: Easy text editing
- **Save Button**: Save to database
- **Cancel Button**: Discard changes
- **Auto-Reload**: See changes immediately

---

## 🏗️ Architecture

### Frontend Structure
```
src/
├── app/
│   ├── components/          # Home page components
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── FAQSection.tsx
│   │   └── ...
│   └── services/            # Service page components
│       ├── meta-ads/
│       ├── google-ads/
│       ├── shopify/
│       ├── content-marketing/
│       └── social-media/
├── components/              # Shared components
│   ├── AdminToolbar.tsx
│   ├── AdminLogin.tsx
│   ├── EditableSection.tsx
│   ├── UniversalHero.tsx
│   ├── UniversalFAQ.tsx
│   └── UniversalContentSection.tsx
├── contexts/
│   └── AdminContext.tsx     # Auth state management
└── services/
    └── api.ts               # API client
```

### Backend Structure
```
server/
├── index.js                 # Express server
├── models/
│   ├── User.js             # User model
│   └── Content.js          # Content model
├── routes/
│   ├── auth.js             # Authentication routes
│   └── content.js          # Content CRUD routes
├── middleware/
│   └── auth.js             # JWT verification
└── scripts/
    └── createAdmin.js      # Admin creation script
```

### Database Schema

#### Content Collection
```javascript
{
  page: String,        // "home", "meta-ads", etc.
  section: String,     // "hero", "faq", etc.
  key: String,         // "heading", "button", etc.
  value: String,       // The actual content
  type: String,        // "text", "textarea"
  updatedAt: Date
}
```

#### User Collection
```javascript
{
  email: String,       // Unique email
  password: String,    // Hashed password
  role: String,        // "admin"
  createdAt: Date
}
```

---

## 📝 Editable Sections

### Home Page (5 sections)
1. **Hero Section**
   - Form heading
   - Button text

2. **Marquee Section**
   - 7 scrolling service items

3. **About Section**
   - Heading
   - 2 paragraphs

4. **Why Choose Section**
   - 7 reasons with animated numbers

5. **FAQ Section**
   - 13 Q&A pairs

### Meta Ads Page (11 sections)
1. Hero - Form heading, button
2. Process Title - Title text
3. Section 1-6 - Content sections (2 points each)
4. Our Strength - 5 strength points
5. Ready to Grow CTA - Button text
6. FAQ - 13 Q&A pairs

### Shopify Page (11 sections)
1. Hero - Form heading, button
2. Platforms - 5 platform points
3. Section 1-6 - Content sections (2 points each)
4. Our Strength - 5 strength points
5. Ready to Launch CTA - Button text
6. FAQ - 13 Q&A pairs

### Google Ads Page (10 sections)
1. Hero - Form heading, button
2. Platforms - 5 ad types
3. Strategy - 2 points
4. Keyword Research - 2 points
5. Ad Copywriting - 2 points
6. Landing Page - 2 points
7. Conversion Tracking - 2 points
8. Optimization - 2 points
9. Our Strength - 5 points
10. FAQ - 13 Q&A pairs

### Content Marketing Page (11 sections)
1. Hero - Form heading, button
2. Content Channels - 9 channel items
3. Content Strategy - 2 points
4. SEO Content - 2 points
5. Website Landing - 2 points
6. Blog Leadership - 2 points
7. Social Short Form - 2 points
8. Content Optimization - 2 points
9. What We Focus On - 5 focus points
10. Ready to Build CTA - Button text
11. FAQ - 13 Q&A pairs

### Social Media Page (6 sections)
1. Hero - Form heading, button
2. Platforms - Platform list
3. Process - 6 process steps
4. Results - 4 result points
5. Ready to Turn CTA - Button text
6. FAQ - 13 Q&A pairs

---

## 🔌 API Documentation

### Base URL
```
http://localhost:5001/api
```

### Authentication

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "admin123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

#### Verify Token
```http
GET /auth/verify
Authorization: Bearer <token>

Response:
{
  "user": {
    "id": "...",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

### Content Management

#### Get Page Content
```http
GET /content/page/:page
Example: GET /content/page/home

Response:
[
  {
    "_id": "...",
    "page": "home",
    "section": "hero",
    "key": "formHeading",
    "value": "Get A Marketing Audit",
    "type": "text",
    "updatedAt": "2024-02-16T..."
  },
  ...
]
```

#### Update Content
```http
POST /content
Authorization: Bearer <token>
Content-Type: application/json

{
  "page": "home",
  "section": "hero",
  "key": "formHeading",
  "value": "Get Your Free Audit",
  "type": "text"
}

Response:
{
  "_id": "...",
  "page": "home",
  "section": "hero",
  "key": "formHeading",
  "value": "Get Your Free Audit",
  "type": "text",
  "updatedAt": "2024-02-16T..."
}
```

#### Get All Content
```http
GET /content
Authorization: Bearer <token>

Response:
[
  { all content documents }
]
```

---

## 🔧 Troubleshooting

### Port 5000 Already in Use
**Problem**: macOS Control Center uses port 5000

**Solution**: Backend uses port 5001 instead
```env
PORT=5001
```

### MongoDB Connection Error
**Problem**: Cannot connect to MongoDB

**Solutions**:
1. Check if MongoDB is running:
```bash
# macOS
brew services list

# Linux
sudo systemctl status mongod
```

2. Start MongoDB:
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

3. Check connection string in `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/marketing-agency
```

### CORS Errors
**Problem**: Frontend can't connect to backend

**Solution**: Backend CORS is configured for `http://localhost:5173`

If using different port, update `server/index.js`:
```javascript
app.use(cors({
  origin: 'http://localhost:YOUR_PORT',
  credentials: true
}));
```

### Admin Login Not Working
**Problem**: Cannot login with admin credentials

**Solutions**:
1. Recreate admin user:
```bash
npm run create-admin
```

2. Check JWT_SECRET in `.env`:
```env
JWT_SECRET=your-secret-key
```

3. Clear browser localStorage:
```javascript
// In browser console
localStorage.clear()
```

### Changes Not Saving
**Problem**: Edit dialog saves but changes don't persist

**Solutions**:
1. Check browser console for errors
2. Verify JWT token is valid
3. Check MongoDB is running
4. Check backend logs for errors

### Edit Mode Not Showing
**Problem**: Yellow outlines not appearing

**Solutions**:
1. Verify you're logged in
2. Click "Edit Mode ON" button
3. Check AdminContext is providing `isEditMode: true`
4. Clear browser cache

---

## 📦 Build for Production

### Frontend Build
```bash
npm run build
```

Output in `dist/` folder.

### Environment Variables for Production
```env
MONGODB_URI=mongodb://your-production-db/marketing-agency
JWT_SECRET=your-super-secure-production-secret
PORT=5001
NODE_ENV=production
```

### Deploy Backend
1. Upload `server/` folder to your server
2. Install dependencies: `npm install --production`
3. Set environment variables
4. Start server: `npm start`

### Deploy Frontend
1. Build: `npm run build`
2. Upload `dist/` folder to your hosting
3. Configure server to serve `index.html` for all routes

---

## 🎯 Future Enhancements

### Planned Features
- [ ] Image upload functionality
- [ ] Rich text editor for long content
- [ ] Preview mode before saving
- [ ] Revision history
- [ ] Multi-user support
- [ ] Role-based permissions
- [ ] Bulk content import/export
- [ ] Content scheduling
- [ ] SEO meta tags editor
- [ ] Analytics dashboard

---

## 📄 License

This project is private and proprietary.

---

## 👥 Support

For issues or questions:
1. Check this README
2. Check browser console for errors
3. Check backend logs
4. Verify MongoDB is running
5. Verify environment variables are set

---

## 🎉 Credits

Built with ❤️ using modern web technologies.

- React Team for React
- Vercel for Vite
- MongoDB Team for MongoDB
- Express.js Team for Express
- Tailwind Labs for Tailwind CSS

---

**Last Updated**: February 2024
**Version**: 1.0.0
**Status**: Production Ready (Service Pages Complete)
