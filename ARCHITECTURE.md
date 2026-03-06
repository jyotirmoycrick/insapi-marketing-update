# System Architecture

## Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│  ┌────────────────────┐         ┌─────────────────────────┐ │
│  │   Public Pages     │         │    Admin Panel          │ │
│  │                    │         │                         │ │
│  │  - DynamicHeader   │         │  - NavigationManager    │ │
│  │  - HomePage        │         │  - PageManager          │ │
│  │  - ServicePages    │         │  - PageBuilder          │ │
│  │  - PageRenderer    │         │  - MediaLibrary         │ │
│  └────────────────────┘         └─────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                           │
                           │ HTTP/REST API
                           │
┌─────────────────────────────────────────────────────────────┐
│                         Backend                              │
│  ┌────────────────────┐         ┌─────────────────────────┐ │
│  │   Node.js Server   │         │   Python Server         │ │
│  │                    │         │                         │ │
│  │  - Auth Routes     │         │  - Page Builder API     │ │
│  │  - Navigation API  │         │  - Widget Management    │ │
│  │  - Pages API       │         │  - Section Templates    │ │
│  │  - Content API     │         │  - File Upload          │ │
│  └────────────────────┘         └─────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                           │
                           │ MongoDB Driver
                           │
┌─────────────────────────────────────────────────────────────┐
│                        MongoDB                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Collections:                                          │ │
│  │  - navigations  (menu structure)                       │ │
│  │  - pages        (page content)                         │ │
│  │  - users        (admin users)                          │ │
│  │  - contents     (legacy content)                       │ │
│  │  - contacts     (form submissions)                     │ │
│  │  - clients      (client logos)                         │ │
│  │  - portfolios   (portfolio items)                      │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Navigation Management Flow

```
Admin Panel (NavigationManager)
         │
         │ 1. Admin edits menu
         ▼
    PUT /api/navigation/main-menu?token=xxx
         │
         │ 2. Validate token
         ▼
    Navigation Model
         │
         │ 3. Save to MongoDB
         ▼
    navigations collection
         │
         │ 4. Return updated data
         ▼
    Admin Panel (success message)


Public Site (DynamicHeader)
         │
         │ 1. Component mounts
         ▼
    GET /api/navigation/main-menu
         │
         │ 2. Fetch from MongoDB
         ▼
    navigations collection
         │
         │ 3. Return menu data
         ▼
    DynamicHeader (render menu)
```

### 2. Page Management Flow

```
Admin Panel (PageManager)
         │
         │ 1. Click "Make Editable"
         ▼
    POST /api/pages/:id/convert-to-editable?token=xxx
         │
         │ 2. Validate token
         ▼
    Page Model
         │
         │ 3. Create/Update page
         │    with basic template
         ▼
    pages collection
         │
         │ 4. Return page data
         ▼
    Admin Panel (show success)
         │
         │ 5. Click "Edit"
         ▼
    Page Builder
         │
         │ 6. Edit sections/widgets
         ▼
    PUT /api/pages/:id?token=xxx
         │
         │ 7. Save changes
         ▼
    pages collection


Public Site (PageRenderer)
         │
         │ 1. Navigate to page
         ▼
    GET /api/pages/:id
         │
         │ 2. Fetch from MongoDB
         ▼
    pages collection
         │
         │ 3. Return page data
         ▼
    PageRenderer (render page)
```

## Component Hierarchy

### Admin Panel

```
ImprovedAdminDashboard
├── Sidebar
│   ├── Page Builder (tab)
│   ├── Page Manager (tab) ← NEW
│   ├── Navigation (tab) ← NEW
│   ├── Media Library (tab)
│   ├── Contacts (tab)
│   └── Settings (tab)
│
├── Page Builder Tab
│   ├── Pages Panel
│   ├── Component Library
│   ├── Canvas
│   └── Properties Panel
│
├── Page Manager Tab ← NEW
│   ├── Static Pages List
│   │   └── Convert Button
│   └── Editable Pages List
│       ├── Edit Button
│       ├── Publish Toggle
│       └── Delete Button
│
└── Navigation Tab ← NEW
    ├── Settings Section
    │   ├── Logo Input
    │   ├── Contact Email Input
    │   └── Contact Phone Input
    └── Menu Items List
        ├── Add Item Button
        ├── Menu Item
        │   ├── Edit Button
        │   ├── Delete Button
        │   ├── Visibility Toggle
        │   ├── Reorder Arrows
        │   └── Dropdown Children
        └── Save Changes Button
```

### Public Site

```
App
├── DynamicHeader ← NEW
│   ├── Logo
│   ├── Desktop Navigation
│   │   ├── Menu Item (Link)
│   │   ├── Menu Item (Dropdown)
│   │   │   └── Sub Items
│   │   └── Menu Item (Button)
│   ├── Contact Info
│   └── Mobile Menu
│       └── Collapsible Items
│
├── Routes
│   ├── Static Pages
│   │   ├── HomePage
│   │   ├── ServicesPage
│   │   └── ...
│   └── Dynamic Pages
│       └── PageRenderer
│           └── Render sections/widgets
│
└── Footer
```

## Database Schema

### navigations Collection

```javascript
{
  _id: ObjectId,
  name: "main-menu",
  items: [
    {
      _id: ObjectId,
      label: "Services",
      path: "/services",
      type: "dropdown",
      order: 1,
      isVisible: true,
      openInNewTab: false,
      children: [
        {
          label: "Google Ads",
          path: "/google-ads",
          order: 0
        }
      ]
    }
  ],
  settings: {
    logo: "/path/to/logo.png",
    logoAlt: "Company Name",
    contactEmail: "info@company.com",
    contactPhone: "+91 1234567890",
    showContactInfo: true
  },
  updatedAt: ISODate,
  updatedBy: ObjectId
}
```

### pages Collection

```javascript
{
  _id: ObjectId,
  page_id: "home",
  page_name: "Home Page",
  route: "/",
  type: "builder", // static, dynamic, builder
  
  // Page Builder format (new)
  sections: [
    {
      id: "section_123",
      name: "Hero Section",
      layout: "full",
      containers: [
        {
          id: "container_456",
          width: "100%",
          widgets: [
            {
              id: "widget_789",
              type: "heading",
              content: { text: "Welcome", tag: "h1" },
              styles: { fontSize: "48px" },
              order: 0
            }
          ]
        }
      ],
      order: 0
    }
  ],
  
  // Legacy format (old)
  components: [
    {
      id: "comp_123",
      type: "text",
      props: { content: "Hello" },
      styles: {},
      order: 0
    }
  ],
  
  meta: {
    title: "Home - Company",
    description: "Welcome to our site",
    keywords: ["marketing", "digital"],
    ogImage: "/og-image.jpg"
  },
  
  is_published: true,
  is_editable: true,
  order: 0,
  
  created_at: ISODate,
  updated_at: ISODate,
  published_at: ISODate,
  created_by: ObjectId,
  updated_by: ObjectId
}
```

## API Routes

### Navigation Routes (`/api/navigation`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/:name` | Public | Get navigation menu |
| PUT | `/:name` | Admin | Update entire navigation |
| POST | `/:name/items` | Admin | Add menu item |
| PUT | `/:name/items/:id` | Admin | Update menu item |
| DELETE | `/:name/items/:id` | Admin | Delete menu item |
| POST | `/:name/reorder` | Admin | Reorder menu items |

### Page Routes (`/api/pages`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | Public | List all published pages |
| GET | `/:id` | Public | Get single page |
| POST | `/` | Admin | Create new page |
| PUT | `/:id` | Admin | Update page |
| DELETE | `/:id` | Admin | Delete page |
| PATCH | `/:id/publish` | Admin | Publish/unpublish page |
| POST | `/:id/convert-to-editable` | Admin | Convert static to editable |

## Authentication Flow

```
Admin Login
     │
     │ 1. POST /api/auth/login
     │    { email, password }
     ▼
Verify Credentials
     │
     │ 2. Generate JWT token
     ▼
Return Token
     │
     │ 3. Store in localStorage
     ▼
Subsequent Requests
     │
     │ 4. Include token in requests
     │    ?token=xxx or
     │    Authorization: Bearer xxx
     ▼
Middleware Verification
     │
     │ 5. Verify token
     │    Check expiration
     │    Load user data
     ▼
Allow/Deny Request
```

## File Structure

```
project/
├── backend/
│   ├── models/
│   │   ├── Navigation.js ← NEW
│   │   ├── Page.js ← NEW
│   │   ├── User.js
│   │   ├── Content.js
│   │   ├── Client.js
│   │   └── Portfolio.js
│   │
│   ├── routes/
│   │   ├── navigation.js ← NEW
│   │   ├── pages.js ← NEW
│   │   ├── auth.js
│   │   └── content.js
│   │
│   ├── middleware/
│   │   └── auth.js
│   │
│   ├── scripts/
│   │   ├── initializeNavigation.js ← NEW
│   │   └── createAdmin.js
│   │
│   ├── index.js (Node.js server)
│   └── server.py (Python server)
│
├── frontend/
│   └── src/
│       ├── components/
│       │   └── admin/
│       │       ├── NavigationManager.tsx ← NEW
│       │       ├── PageManager.tsx ← NEW
│       │       ├── ImprovedAdminDashboard.tsx (updated)
│       │       └── ...
│       │
│       └── app/
│           └── components/
│               ├── DynamicHeader.tsx ← NEW
│               ├── Header.tsx (old)
│               └── ...
│
└── docs/
    ├── FEATURE_SUMMARY.md ← NEW
    ├── SETUP_INSTRUCTIONS.md ← NEW
    ├── NAVIGATION_AND_PAGE_MANAGEMENT_GUIDE.md ← NEW
    ├── IMPLEMENTATION_CHECKLIST.md ← NEW
    ├── QUICK_REFERENCE.md ← NEW
    └── ARCHITECTURE.md ← NEW (this file)
```

## Technology Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Build**: Vite

### Backend
- **Node.js**: Express.js
- **Python**: FastAPI
- **Database**: MongoDB
- **ODM**: Mongoose
- **Auth**: JWT (jsonwebtoken)
- **Validation**: express-validator

### Database
- **MongoDB**: Document database
- **Collections**: navigations, pages, users, contents, contacts, clients, portfolios

## Security Considerations

1. **Authentication**
   - JWT tokens with expiration
   - Secure password hashing (bcrypt)
   - Token validation on every request

2. **Authorization**
   - Admin-only endpoints
   - Role-based access control
   - User verification middleware

3. **Data Validation**
   - Input sanitization
   - Schema validation
   - Type checking

4. **API Security**
   - CORS configuration
   - Rate limiting (recommended)
   - Request size limits

## Performance Optimizations

1. **Frontend**
   - Lazy loading components
   - Memoization of expensive operations
   - Debounced API calls
   - Optimistic UI updates

2. **Backend**
   - Database indexing
   - Query optimization
   - Caching (recommended)
   - Connection pooling

3. **Database**
   - Indexed fields (page_id, route, name)
   - Efficient queries
   - Projection (select only needed fields)

## Scalability

### Horizontal Scaling
- Stateless backend servers
- Load balancer ready
- Session management via JWT

### Vertical Scaling
- MongoDB sharding support
- Replica sets for high availability
- Read replicas for performance

### Caching Strategy
- Redis for session storage (recommended)
- CDN for static assets
- API response caching

## Monitoring & Logging

### Recommended Tools
- **Application**: PM2, Winston
- **Database**: MongoDB Atlas monitoring
- **Frontend**: Sentry, LogRocket
- **Infrastructure**: Datadog, New Relic

### Key Metrics
- API response times
- Database query performance
- Error rates
- User activity
- Page load times

## Deployment Architecture

```
┌─────────────────────────────────────────┐
│           Load Balancer                 │
└─────────────────────────────────────────┘
                  │
        ┌─────────┴─────────┐
        │                   │
┌───────▼────────┐  ┌───────▼────────┐
│  Frontend      │  │  Frontend      │
│  (Nginx/CDN)   │  │  (Nginx/CDN)   │
└────────────────┘  └────────────────┘
                  │
        ┌─────────┴─────────┐
        │                   │
┌───────▼────────┐  ┌───────▼────────┐
│  Backend       │  │  Backend       │
│  (Node.js)     │  │  (Node.js)     │
└────────────────┘  └────────────────┘
                  │
        ┌─────────┴─────────┐
        │                   │
┌───────▼────────┐  ┌───────▼────────┐
│  MongoDB       │  │  MongoDB       │
│  (Primary)     │  │  (Replica)     │
└────────────────┘  └────────────────┘
```

## Summary

This architecture provides:
- ✅ Separation of concerns
- ✅ Scalable design
- ✅ Secure authentication
- ✅ Flexible data model
- ✅ RESTful API design
- ✅ Modern tech stack
- ✅ Easy maintenance
- ✅ WordPress-like functionality

All while maintaining clean code and best practices!
