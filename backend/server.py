from fastapi import FastAPI, HTTPException, UploadFile, File, Form, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime, timezone, timedelta
import os
import shutil
import secrets
import hashlib
import smtplib
import json
import uuid
import copy
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId

# Import page builder modules
from page_builder_schema import WIDGET_TYPES, SECTION_TEMPLATES
from page_builder_api import (
    generate_id,
    get_page_builder_data,
    update_page_builder_data,
    add_section,
    update_section,
    delete_section,
    duplicate_section,
    reorder_sections,
    add_container,
    add_widget,
    update_widget,
    delete_widget,
    get_widget_types,
    get_section_templates
)

app = FastAPI(title="InsAPI Marketing CMS API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "insapi_marketing")

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

# Ensure uploads directory exists
UPLOAD_DIR = "/app/backend/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Admin credentials
ADMIN_USERNAME = "malo"
ADMIN_PASSWORD_HASH = hashlib.sha256("1234567890".encode()).hexdigest()

# Active sessions
active_sessions: Dict[str, dict] = {}


# ============== MODELS ==============

class LoginRequest(BaseModel):
    username: str
    password: str

class LoginResponse(BaseModel):
    success: bool
    token: Optional[str] = None
    message: str

class SMTPSettings(BaseModel):
    smtp_host: str
    smtp_port: int
    smtp_user: str
    smtp_pass: str
    admin_email: str
    sender_name: str

class PageComponent(BaseModel):
    id: str
    type: str  # text, image, button, form, section, hero, grid, flexbox
    props: Dict[str, Any]
    children: Optional[List[Dict[str, Any]]] = []
    styles: Dict[str, Any] = {}
    order: int = 0

class PageData(BaseModel):
    page_id: str
    page_name: str
    route: str
    components: List[Dict[str, Any]]
    is_published: bool = False
    meta: Dict[str, Any] = {}

class ContactFormRequest(BaseModel):
    name: str
    email: EmailStr
    phone: str
    subject: Optional[str] = "Contact Form Submission"
    source: Optional[str] = "home"


# ============== AUTH HELPERS ==============

def verify_password(password: str) -> bool:
    return hashlib.sha256(password.encode()).hexdigest() == ADMIN_PASSWORD_HASH

def create_session_token() -> str:
    return secrets.token_urlsafe(32)

def verify_token(token: str) -> bool:
    if token in active_sessions:
        session = active_sessions[token]
        if datetime.now(timezone.utc) < session["expires"]:
            return True
        else:
            del active_sessions[token]
    return False


# ============== SMTP HELPERS ==============

async def get_smtp_settings():
    """Get SMTP settings from database"""
    settings = await db.settings.find_one({"type": "smtp"})
    if settings:
        return {
            "smtp_host": settings.get("smtp_host", ""),
            "smtp_port": settings.get("smtp_port", 587),
            "smtp_user": settings.get("smtp_user", ""),
            "smtp_pass": settings.get("smtp_pass", ""),
            "admin_email": settings.get("admin_email", "malojyotirmoy@gmail.com"),
            "sender_name": settings.get("sender_name", "InsAPI Marketing")
        }
    return None

async def send_email_async(to_email: str, subject: str, html_content: str):
    """Send email using SMTP settings from database"""
    settings = await get_smtp_settings()
    
    if not settings or not settings["smtp_host"] or not settings["smtp_user"]:
        print(f"[SIMULATED] Email to: {to_email}, Subject: {subject}")
        return True
    
    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = f"{settings['sender_name']} <{settings['smtp_user']}>"
        msg["To"] = to_email
        msg.attach(MIMEText(html_content, "html"))
        
        with smtplib.SMTP(settings["smtp_host"], settings["smtp_port"]) as server:
            server.starttls()
            server.login(settings["smtp_user"], settings["smtp_pass"])
            server.sendmail(settings["smtp_user"], to_email, msg.as_string())
        
        print(f"Email sent to: {to_email}")
        return True
    except Exception as e:
        print(f"Email error: {e}")
        return False


# ============== AUTH ROUTES ==============

@app.post("/api/admin/login", response_model=LoginResponse)
async def admin_login(request: LoginRequest):
    if request.username == ADMIN_USERNAME and verify_password(request.password):
        token = create_session_token()
        active_sessions[token] = {
            "username": request.username,
            "expires": datetime.now(timezone.utc) + timedelta(hours=24)
        }
        return LoginResponse(success=True, token=token, message="Login successful")
    raise HTTPException(status_code=401, detail="Invalid credentials")

@app.post("/api/admin/logout")
async def admin_logout(token: str):
    if token in active_sessions:
        del active_sessions[token]
    return {"success": True}

@app.get("/api/admin/verify")
async def verify_admin_token(token: str):
    return {"valid": verify_token(token)}


# ============== SETTINGS ROUTES ==============

@app.get("/api/settings/smtp")
async def get_smtp_settings_route(token: str):
    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    settings = await get_smtp_settings()
    if settings:
        # Don't send password back for security
        settings["smtp_pass"] = "********" if settings["smtp_pass"] else ""
    return settings or {
        "smtp_host": "",
        "smtp_port": 587,
        "smtp_user": "",
        "smtp_pass": "",
        "admin_email": "malojyotirmoy@gmail.com",
        "sender_name": "InsAPI Marketing"
    }

@app.post("/api/settings/smtp")
async def save_smtp_settings(settings: SMTPSettings, token: str):
    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    # Get existing settings to preserve password if not changed
    existing = await db.settings.find_one({"type": "smtp"})
    
    update_data = {
        "type": "smtp",
        "smtp_host": settings.smtp_host,
        "smtp_port": settings.smtp_port,
        "smtp_user": settings.smtp_user,
        "admin_email": settings.admin_email,
        "sender_name": settings.sender_name,
        "updated_at": datetime.now(timezone.utc)
    }
    
    # Only update password if it's not masked
    if settings.smtp_pass and settings.smtp_pass != "********":
        update_data["smtp_pass"] = settings.smtp_pass
    elif existing:
        update_data["smtp_pass"] = existing.get("smtp_pass", "")
    
    await db.settings.update_one(
        {"type": "smtp"},
        {"$set": update_data},
        upsert=True
    )
    
    return {"success": True, "message": "SMTP settings saved"}

@app.post("/api/settings/test-email")
async def test_email(token: str):
    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    settings = await get_smtp_settings()
    if not settings or not settings["smtp_host"]:
        return {"success": False, "message": "SMTP not configured"}
    
    try:
        html = "<h1>Test Email</h1><p>Your SMTP settings are working correctly!</p>"
        result = await send_email_async(settings["admin_email"], "Test Email from InsAPI CMS", html)
        return {"success": result, "message": "Test email sent" if result else "Failed to send"}
    except Exception as e:
        return {"success": False, "message": str(e)}


# ============== PAGE BUILDER ROUTES ==============

@app.get("/api/pages")
async def get_all_pages(token: str = None):
    """Get all pages - public for published, all for admin"""
    try:
        query = {} if (token and verify_token(token)) else {"is_published": True}
        pages = []
        cursor = db.pages.find(query).sort("order", 1)
        async for doc in cursor:
            doc["_id"] = str(doc["_id"])
            pages.append(doc)
        return pages
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/pages/{page_id}")
async def get_page(page_id: str, token: str = None):
    """Get single page"""
    try:
        page = await db.pages.find_one({"page_id": page_id})
        if not page:
            raise HTTPException(status_code=404, detail="Page not found")
        
        # Check if published or admin
        if not page.get("is_published") and not (token and verify_token(token)):
            raise HTTPException(status_code=404, detail="Page not found")
        
        page["_id"] = str(page["_id"])
        return page
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/pages")
async def create_page(page: PageData, token: str):
    """Create new page"""
    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    try:
        page_dict = page.dict()
        page_dict["created_at"] = datetime.now(timezone.utc)
        page_dict["updated_at"] = datetime.now(timezone.utc)
        page_dict["order"] = await db.pages.count_documents({})
        
        result = await db.pages.insert_one(page_dict)
        return {"success": True, "id": str(result.inserted_id), "page_id": page.page_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/api/pages/{page_id}")
async def update_page(page_id: str, page: PageData, token: str):
    """Update page"""
    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    try:
        page_dict = page.dict()
        page_dict["updated_at"] = datetime.now(timezone.utc)
        
        result = await db.pages.update_one(
            {"page_id": page_id},
            {"$set": page_dict}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Page not found")
        
        return {"success": True, "message": "Page updated"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/pages/{page_id}")
async def delete_page(page_id: str, token: str):
    """Delete page"""
    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    try:
        result = await db.pages.delete_one({"page_id": page_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Page not found")
        return {"success": True, "message": "Page deleted"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/pages/{page_id}/publish")
async def publish_page(page_id: str, token: str):
    """Publish page"""
    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    try:
        result = await db.pages.update_one(
            {"page_id": page_id},
            {"$set": {"is_published": True, "published_at": datetime.now(timezone.utc)}}
        )
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Page not found")
        return {"success": True, "message": "Page published"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/pages/{page_id}/unpublish")
async def unpublish_page(page_id: str, token: str):
    """Unpublish page"""
    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    try:
        result = await db.pages.update_one(
            {"page_id": page_id},
            {"$set": {"is_published": False}}
        )
        return {"success": True, "message": "Page unpublished"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ============== COMPONENT TEMPLATES ==============

@app.get("/api/components/templates")
async def get_component_templates():
    """Get available component templates"""
    return {
        "components": [
            {
                "type": "text",
                "name": "Text Block",
                "icon": "Type",
                "defaultProps": {
                    "content": "Enter your text here",
                    "tag": "p",
                    "align": "left"
                },
                "defaultStyles": {
                    "fontSize": "16px",
                    "color": "#333333",
                    "fontWeight": "normal",
                    "padding": "10px"
                }
            },
            {
                "type": "heading",
                "name": "Heading",
                "icon": "Heading",
                "defaultProps": {
                    "content": "Heading Text",
                    "tag": "h2",
                    "align": "left"
                },
                "defaultStyles": {
                    "fontSize": "32px",
                    "color": "#1E3A5F",
                    "fontWeight": "bold",
                    "padding": "10px"
                }
            },
            {
                "type": "image",
                "name": "Image",
                "icon": "Image",
                "defaultProps": {
                    "src": "",
                    "alt": "Image",
                    "objectFit": "cover"
                },
                "defaultStyles": {
                    "width": "100%",
                    "height": "auto",
                    "borderRadius": "8px"
                }
            },
            {
                "type": "button",
                "name": "Button",
                "icon": "MousePointer",
                "defaultProps": {
                    "text": "Click Me",
                    "link": "#",
                    "variant": "primary"
                },
                "defaultStyles": {
                    "backgroundColor": "#F59E0B",
                    "color": "#000000",
                    "padding": "12px 24px",
                    "borderRadius": "8px",
                    "fontWeight": "bold"
                }
            },
            {
                "type": "section",
                "name": "Section",
                "icon": "Layout",
                "defaultProps": {
                    "layout": "flexbox",
                    "direction": "column",
                    "gap": "20px"
                },
                "defaultStyles": {
                    "padding": "40px 20px",
                    "backgroundColor": "#ffffff"
                }
            },
            {
                "type": "grid",
                "name": "Grid Container",
                "icon": "Grid",
                "defaultProps": {
                    "columns": 3,
                    "gap": "20px"
                },
                "defaultStyles": {
                    "padding": "20px"
                }
            },
            {
                "type": "flexbox",
                "name": "Flex Container",
                "icon": "Columns",
                "defaultProps": {
                    "direction": "row",
                    "justify": "flex-start",
                    "align": "stretch",
                    "gap": "20px",
                    "wrap": "wrap"
                },
                "defaultStyles": {
                    "padding": "20px"
                }
            },
            {
                "type": "form",
                "name": "Contact Form",
                "icon": "FileText",
                "defaultProps": {
                    "heading": "Talk To Our Expert",
                    "buttonText": "GET STARTED NOW",
                    "fields": [
                        {"name": "fullName", "label": "Full Name", "type": "text", "required": True},
                        {"name": "email", "label": "Business Email", "type": "email", "required": True},
                        {"name": "phone", "label": "Phone Number", "type": "tel", "required": True}
                    ]
                },
                "defaultStyles": {
                    "backgroundColor": "#ffffff",
                    "padding": "20px",
                    "borderRadius": "12px",
                    "boxShadow": "0 4px 20px rgba(0,0,0,0.1)"
                }
            },
            {
                "type": "hero",
                "name": "Hero Section",
                "icon": "Star",
                "defaultProps": {
                    "title": "Your Main Headline",
                    "subtitle": "Your subtitle text goes here",
                    "backgroundImage": "",
                    "overlayColor": "rgba(30, 58, 95, 0.8)"
                },
                "defaultStyles": {
                    "minHeight": "500px",
                    "padding": "60px 40px"
                }
            },
            {
                "type": "stats",
                "name": "Stats Block",
                "icon": "BarChart2",
                "defaultProps": {
                    "items": [
                        {"number": "10+", "label": "Years Experience"},
                        {"number": "200+", "label": "Happy Clients"},
                        {"number": "500+", "label": "Projects Done"}
                    ]
                },
                "defaultStyles": {
                    "padding": "20px"
                }
            },
            {
                "type": "divider",
                "name": "Divider",
                "icon": "Minus",
                "defaultProps": {
                    "style": "solid"
                },
                "defaultStyles": {
                    "borderTop": "1px solid #e0e0e0",
                    "margin": "20px 0"
                }
            },
            {
                "type": "spacer",
                "name": "Spacer",
                "icon": "Square",
                "defaultProps": {},
                "defaultStyles": {
                    "height": "40px"
                }
            }
        ]
    }


# ============== FILE UPLOAD ==============

@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...), token: str = Form(...)):
    """Upload file (images, etc.)"""
    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    try:
        # Generate unique filename
        ext = os.path.splitext(file.filename)[1]
        filename = f"{secrets.token_hex(16)}{ext}"
        filepath = os.path.join(UPLOAD_DIR, filename)
        
        # Save file
        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Return URL
        return {
            "success": True,
            "url": f"/api/uploads/{filename}",
            "filename": filename
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/uploads/{filename}")
async def get_uploaded_file(filename: str):
    """Serve uploaded files with cache headers"""
    from fastapi.responses import FileResponse
    filepath = os.path.join(UPLOAD_DIR, filename)
    if not os.path.exists(filepath):
        raise HTTPException(status_code=404, detail="File not found")
    
    # Add cache headers for better performance
    return FileResponse(
        filepath,
        headers={
            "Cache-Control": "public, max-age=31536000, immutable",
            "ETag": f'"{os.path.getmtime(filepath)}"'
        }
    )

@app.get("/api/uploads")
async def list_uploads(token: str):
    """List all uploaded files"""
    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    try:
        files = []
        for filename in os.listdir(UPLOAD_DIR):
            filepath = os.path.join(UPLOAD_DIR, filename)
            files.append({
                "filename": filename,
                "url": f"/api/uploads/{filename}",
                "size": os.path.getsize(filepath),
                "modified": datetime.fromtimestamp(os.path.getmtime(filepath)).isoformat()
            })
        return files
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/uploads/{filename}")
async def delete_upload(filename: str, token: str):
    """Delete uploaded file"""
    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    try:
        filepath = os.path.join(UPLOAD_DIR, filename)
        if os.path.exists(filepath):
            os.remove(filepath)
        return {"success": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ============== CONTACT FORM ==============

@app.post("/api/contact/submit")
async def submit_contact_form(form_data: ContactFormRequest):
    try:
        if len(form_data.phone.replace(" ", "")) < 10:
            raise HTTPException(status_code=400, detail="Valid phone required")
        
        contact_doc = {
            "name": form_data.name.strip(),
            "email": form_data.email.lower().strip(),
            "phone": form_data.phone.strip(),
            "subject": form_data.subject,
            "source": form_data.source,
            "created_at": datetime.now(timezone.utc),
            "status": "new"
        }
        
        result = await db.contacts.insert_one(contact_doc)
        submission_id = str(result.inserted_id)
        
        # Get admin email from settings
        settings = await get_smtp_settings()
        admin_email = settings["admin_email"] if settings else "malojyotirmoy@gmail.com"
        
        # Send admin notification
        admin_html = f"""
        <div style="font-family:Arial;max-width:600px;margin:0 auto;">
            <div style="background:linear-gradient(135deg,#1E3A5F,#4A90E2);color:white;padding:30px;text-align:center;border-radius:10px 10px 0 0;">
                <h2>New Lead Received!</h2>
            </div>
            <div style="background:#f9f9f9;padding:30px;border:1px solid #e0e0e0;">
                <p><strong>Name:</strong> {form_data.name}</p>
                <p><strong>Email:</strong> {form_data.email}</p>
                <p><strong>Phone:</strong> +91 {form_data.phone}</p>
                <p><strong>Source:</strong> {form_data.source}</p>
            </div>
        </div>
        """
        await send_email_async(admin_email, f"New Lead: {form_data.name}", admin_html)
        
        # Send user confirmation
        user_html = f"""
        <div style="font-family:Arial;max-width:600px;margin:0 auto;">
            <div style="background:linear-gradient(135deg,#1E3A5F,#4A90E2);color:white;padding:40px;text-align:center;border-radius:10px 10px 0 0;">
                <h2>Thank You!</h2>
            </div>
            <div style="background:#fff;padding:40px;border:1px solid #e0e0e0;">
                <p>Hello {form_data.name},</p>
                <p>Thank you for reaching out! Our team will contact you within 24-48 hours.</p>
            </div>
        </div>
        """
        await send_email_async(form_data.email, "Thank you - InsAPI Marketing", user_html)
        
        return {
            "status": "success",
            "message": "Thank you for your response! We will reach you soon ASAP.",
            "submissionId": submission_id
        }
    except Exception as e:
        print(f"Contact error: {e}")
        raise HTTPException(status_code=500, detail="Error processing request")

@app.get("/api/contacts")
async def get_contacts(token: str):
    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    contacts = []
    cursor = db.contacts.find().sort("created_at", -1)
    async for doc in cursor:
        doc["_id"] = str(doc["_id"])
        if "created_at" in doc:
            doc["created_at"] = doc["created_at"].isoformat()
        contacts.append(doc)
    return contacts

@app.delete("/api/contacts/{contact_id}")
async def delete_contact(contact_id: str, token: str):
    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    await db.contacts.delete_one({"_id": ObjectId(contact_id)})
    return {"success": True}


# ============== PAGE BUILDER ROUTES ==============

@app.get("/api/page-builder/{page_id}")
async def get_page_builder(page_id: str, token: str = Query(...)):
    """Get complete page builder data for visual editor"""
    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    return await get_page_builder_data(page_id, db)


@app.put("/api/page-builder/{page_id}")
async def update_page_builder(page_id: str, data: Dict[str, Any], token: str = Query(...)):
    """Update complete page structure"""
    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    return await update_page_builder_data(page_id, data, db, token)


@app.post("/api/page-builder/{page_id}/section")
async def create_section(page_id: str, section_data: Dict[str, Any], token: str = Query(...)):
    """Add new section to page"""
    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    return await add_section(page_id, section_data, db, token)


@app.put("/api/page-builder/{page_id}/section/{section_id}")
async def modify_section(page_id: str, section_id: str, updates: Dict[str, Any], token: str = Query(...)):
    """Update specific section"""
    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    return await update_section(page_id, section_id, updates, db, token)


@app.delete("/api/page-builder/{page_id}/section/{section_id}")
async def remove_section(page_id: str, section_id: str, token: str = Query(...)):
    """Delete section from page"""
    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    return await delete_section(page_id, section_id, db, token)


@app.post("/api/page-builder/{page_id}/section/{section_id}/duplicate")
async def copy_section(page_id: str, section_id: str, token: str = Query(...)):
    """Duplicate section with new IDs"""
    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    return await duplicate_section(page_id, section_id, db, token)


@app.post("/api/page-builder/{page_id}/sections/reorder")
async def reorder(page_id: str, section_orders: List[Dict[str, Any]], token: str = Query(...)):
    """Reorder sections"""
    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    return await reorder_sections(page_id, section_orders, db, token)


@app.post("/api/page-builder/{page_id}/section/{section_id}/container")
async def create_container(page_id: str, section_id: str, container_data: Dict[str, Any], token: str = Query(...)):
    """Add container to section"""
    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    return await add_container(page_id, section_id, container_data, db, token)


@app.post("/api/page-builder/{page_id}/section/{section_id}/container/{container_id}/widget")
async def create_widget(
    page_id: str, 
    section_id: str, 
    container_id: str, 
    widget_data: Dict[str, Any], 
    token: str = Query(...)
):
    """Add widget to container"""
    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    return await add_widget(page_id, section_id, container_id, widget_data, db, token)


@app.put("/api/page-builder/{page_id}/section/{section_id}/container/{container_id}/widget/{widget_id}")
async def modify_widget(
    page_id: str, 
    section_id: str, 
    container_id: str, 
    widget_id: str, 
    updates: Dict[str, Any], 
    token: str = Query(...)
):
    """Update widget content, styles, or settings"""
    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    return await update_widget(page_id, section_id, container_id, widget_id, updates, db, token)


@app.delete("/api/page-builder/{page_id}/section/{section_id}/container/{container_id}/widget/{widget_id}")
async def remove_widget(
    page_id: str, 
    section_id: str, 
    container_id: str, 
    widget_id: str, 
    token: str = Query(...)
):
    """Delete widget from container"""
    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    return await delete_widget(page_id, section_id, container_id, widget_id, db, token)


@app.get("/api/page-builder/widgets/types")
async def widget_types():
    """Get all available widget types and their definitions"""
    return await get_widget_types()


@app.get("/api/page-builder/templates/sections")
async def section_templates():
    """Get pre-built section templates"""
    return await get_section_templates()


# ============== HEALTH CHECK ==============

@app.get("/api/health")
async def health_check():
    return {
        "status": "ok",
        "timestamp": datetime.now(timezone.utc).isoformat()
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
