"""
Page Builder API Routes
Complete Elementor-style page builder endpoints
"""

from fastapi import APIRouter, HTTPException, Query
from typing import List, Dict, Any, Optional
from datetime import datetime
import uuid
from page_builder_schema import (
    PageBuilder, Section, Container, Widget, 
    WidgetStyles, WIDGET_TYPES, SECTION_TEMPLATES
)

# This will be integrated into main server.py
# For now, defining the routes structure

def generate_id(prefix: str = "elem") -> str:
    """Generate unique ID for elements"""
    return f"{prefix}_{int(datetime.utcnow().timestamp() * 1000)}_{uuid.uuid4().hex[:8]}"


# ============================================
# PAGE BUILDER ROUTES
# ============================================

async def get_page_builder_data(page_id: str, db):
    """Get complete page builder data"""
    page = await db.pages.find_one({"page_id": page_id})
    if not page:
        raise HTTPException(status_code=404, detail="Page not found")
    
    # Ensure sections field exists
    if "sections" not in page:
        page["sections"] = []
    
    return {
        "page_id": page.get("page_id"),
        "page_name": page.get("page_name"),
        "route": page.get("route"),
        "sections": page.get("sections", []),
        "meta": page.get("meta", {}),
        "is_published": page.get("is_published", False)
    }


async def update_page_builder_data(page_id: str, data: Dict[str, Any], db, token: str):
    """Update complete page structure"""
    # Verify token
    # ... token verification logic
    
    update_data = {
        "sections": data.get("sections", []),
        "meta": data.get("meta", {}),
        "updated_at": datetime.utcnow()
    }
    
    result = await db.pages.update_one(
        {"page_id": page_id},
        {"$set": update_data}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Page not found")
    
    return {"success": True, "message": "Page updated"}


async def add_section(page_id: str, section_data: Dict[str, Any], db, token: str):
    """Add new section to page"""
    # Generate section ID
    section_id = generate_id("section")
    
    # Get current page
    page = await db.pages.find_one({"page_id": page_id})
    if not page:
        raise HTTPException(status_code=404, detail="Page not found")
    
    sections = page.get("sections", [])
    
    # Create new section
    new_section = {
        "id": section_id,
        "name": section_data.get("name", "New Section"),
        "layout": section_data.get("layout", "boxed"),
        "contentWidth": section_data.get("contentWidth", "1200px"),
        "containers": section_data.get("containers", []),
        "background": section_data.get("background", {
            "type": "color",
            "color": "#ffffff"
        }),
        "shapeDividerTop": section_data.get("shapeDividerTop", {"enabled": False}),
        "shapeDividerBottom": section_data.get("shapeDividerBottom", {"enabled": False}),
        "styles": section_data.get("styles", {}),
        "settings": section_data.get("settings", {}),
        "order": len(sections),
        "visibility": section_data.get("visibility", {
            "desktop": True, "tablet": True, "mobile": True
        })
    }
    
    sections.append(new_section)
    
    await db.pages.update_one(
        {"page_id": page_id},
        {"$set": {"sections": sections, "updated_at": datetime.utcnow()}}
    )
    
    return {"success": True, "section": new_section}


async def update_section(page_id: str, section_id: str, updates: Dict[str, Any], db, token: str):
    """Update specific section"""
    page = await db.pages.find_one({"page_id": page_id})
    if not page:
        raise HTTPException(status_code=404, detail="Page not found")
    
    sections = page.get("sections", [])
    
    # Find and update section
    updated = False
    for section in sections:
        if section["id"] == section_id:
            section.update(updates)
            updated = True
            break
    
    if not updated:
        raise HTTPException(status_code=404, detail="Section not found")
    
    await db.pages.update_one(
        {"page_id": page_id},
        {"$set": {"sections": sections, "updated_at": datetime.utcnow()}}
    )
    
    return {"success": True, "message": "Section updated"}


async def delete_section(page_id: str, section_id: str, db, token: str):
    """Delete section"""
    page = await db.pages.find_one({"page_id": page_id})
    if not page:
        raise HTTPException(status_code=404, detail="Page not found")
    
    sections = page.get("sections", [])
    sections = [s for s in sections if s["id"] != section_id]
    
    # Reorder
    for i, section in enumerate(sections):
        section["order"] = i
    
    await db.pages.update_one(
        {"page_id": page_id},
        {"$set": {"sections": sections, "updated_at": datetime.utcnow()}}
    )
    
    return {"success": True, "message": "Section deleted"}


async def duplicate_section(page_id: str, section_id: str, db, token: str):
    """Duplicate section"""
    page = await db.pages.find_one({"page_id": page_id})
    if not page:
        raise HTTPException(status_code=404, detail="Page not found")
    
    sections = page.get("sections", [])
    
    # Find section to duplicate
    section_to_duplicate = None
    for section in sections:
        if section["id"] == section_id:
            section_to_duplicate = section
            break
    
    if not section_to_duplicate:
        raise HTTPException(status_code=404, detail="Section not found")
    
    # Create duplicate with new IDs
    import copy
    new_section = copy.deepcopy(section_to_duplicate)
    new_section["id"] = generate_id("section")
    new_section["name"] = f"{new_section['name']} (Copy)"
    new_section["order"] = len(sections)
    
    # Generate new IDs for all nested elements
    for container in new_section.get("containers", []):
        container["id"] = generate_id("container")
        for widget in container.get("widgets", []):
            widget["id"] = generate_id("widget")
    
    sections.append(new_section)
    
    await db.pages.update_one(
        {"page_id": page_id},
        {"$set": {"sections": sections, "updated_at": datetime.utcnow()}}
    )
    
    return {"success": True, "section": new_section}


async def reorder_sections(page_id: str, section_orders: List[Dict[str, Any]], db, token: str):
    """Reorder sections"""
    page = await db.pages.find_one({"page_id": page_id})
    if not page:
        raise HTTPException(status_code=404, detail="Page not found")
    
    sections = page.get("sections", [])
    
    # Create order map
    order_map = {item["id"]: item["order"] for item in section_orders}
    
    # Update orders
    for section in sections:
        if section["id"] in order_map:
            section["order"] = order_map[section["id"]]
    
    # Sort by order
    sections.sort(key=lambda x: x["order"])
    
    await db.pages.update_one(
        {"page_id": page_id},
        {"$set": {"sections": sections, "updated_at": datetime.utcnow()}}
    )
    
    return {"success": True, "message": "Sections reordered"}


async def add_container(page_id: str, section_id: str, container_data: Dict[str, Any], db, token: str):
    """Add container to section"""
    container_id = generate_id("container")
    
    page = await db.pages.find_one({"page_id": page_id})
    if not page:
        raise HTTPException(status_code=404, detail="Page not found")
    
    sections = page.get("sections", [])
    
    # Find section and add container
    section_found = False
    for section in sections:
        if section["id"] == section_id:
            containers = section.get("containers", [])
            
            new_container = {
                "id": container_id,
                "type": container_data.get("type", "column"),
                "width": container_data.get("width", "100%"),
                "widgets": [],
                "styles": container_data.get("styles", {}),
                "settings": container_data.get("settings", {}),
                "order": len(containers)
            }
            
            containers.append(new_container)
            section["containers"] = containers
            section_found = True
            break
    
    if not section_found:
        raise HTTPException(status_code=404, detail="Section not found")
    
    await db.pages.update_one(
        {"page_id": page_id},
        {"$set": {"sections": sections, "updated_at": datetime.utcnow()}}
    )
    
    return {"success": True, "container": new_container}


async def add_widget(
    page_id: str, 
    section_id: str, 
    container_id: str, 
    widget_data: Dict[str, Any], 
    db, 
    token: str
):
    """Add widget to container"""
    widget_id = generate_id("widget")
    widget_type = widget_data.get("type")
    
    if widget_type not in WIDGET_TYPES:
        raise HTTPException(status_code=400, detail="Invalid widget type")
    
    widget_def = WIDGET_TYPES[widget_type]
    
    page = await db.pages.find_one({"page_id": page_id})
    if not page:
        raise HTTPException(status_code=404, detail="Page not found")
    
    sections = page.get("sections", [])
    
    # Find section, container, and add widget
    widget_added = False
    for section in sections:
        if section["id"] == section_id:
            for container in section.get("containers", []):
                if container["id"] == container_id:
                    widgets = container.get("widgets", [])
                    
                    new_widget = {
                        "id": widget_id,
                        "type": widget_type,
                        "content": widget_data.get("content", widget_def["defaultContent"]),
                        "styles": widget_data.get("styles", widget_def["defaultStyles"]),
                        "settings": widget_data.get("settings", {}),
                        "order": len(widgets),
                        "visibility": widget_data.get("visibility", {
                            "desktop": True, "tablet": True, "mobile": True
                        })
                    }
                    
                    widgets.append(new_widget)
                    container["widgets"] = widgets
                    widget_added = True
                    break
            if widget_added:
                break
    
    if not widget_added:
        raise HTTPException(status_code=404, detail="Section or container not found")
    
    await db.pages.update_one(
        {"page_id": page_id},
        {"$set": {"sections": sections, "updated_at": datetime.utcnow()}}
    )
    
    return {"success": True, "widget": new_widget}


async def update_widget(
    page_id: str,
    section_id: str,
    container_id: str,
    widget_id: str,
    updates: Dict[str, Any],
    db,
    token: str
):
    """Update widget"""
    page = await db.pages.find_one({"page_id": page_id})
    if not page:
        raise HTTPException(status_code=404, detail="Page not found")
    
    sections = page.get("sections", [])
    
    # Find and update widget
    widget_updated = False
    for section in sections:
        if section["id"] == section_id:
            for container in section.get("containers", []):
                if container["id"] == container_id:
                    for widget in container.get("widgets", []):
                        if widget["id"] == widget_id:
                            widget.update(updates)
                            widget_updated = True
                            break
                if widget_updated:
                    break
        if widget_updated:
            break
    
    if not widget_updated:
        raise HTTPException(status_code=404, detail="Widget not found")
    
    await db.pages.update_one(
        {"page_id": page_id},
        {"$set": {"sections": sections, "updated_at": datetime.utcnow()}}
    )
    
    return {"success": True, "message": "Widget updated"}


async def delete_widget(
    page_id: str,
    section_id: str,
    container_id: str,
    widget_id: str,
    db,
    token: str
):
    """Delete widget"""
    page = await db.pages.find_one({"page_id": page_id})
    if not page:
        raise HTTPException(status_code=404, detail="Page not found")
    
    sections = page.get("sections", [])
    
    # Find and delete widget
    widget_deleted = False
    for section in sections:
        if section["id"] == section_id:
            for container in section.get("containers", []):
                if container["id"] == container_id:
                    widgets = container.get("widgets", [])
                    container["widgets"] = [w for w in widgets if w["id"] != widget_id]
                    # Reorder
                    for i, w in enumerate(container["widgets"]):
                        w["order"] = i
                    widget_deleted = True
                    break
            if widget_deleted:
                break
    
    if not widget_deleted:
        raise HTTPException(status_code=404, detail="Widget not found")
    
    await db.pages.update_one(
        {"page_id": page_id},
        {"$set": {"sections": sections, "updated_at": datetime.utcnow()}}
    )
    
    return {"success": True, "message": "Widget deleted"}


async def get_widget_types():
    """Get all available widget types"""
    return {"widgets": WIDGET_TYPES}


async def get_section_templates():
    """Get section templates"""
    return {"templates": SECTION_TEMPLATES}


# ============================================
# HELPER FUNCTIONS FOR CONTENT PARSING
# ============================================

def parse_existing_home_page():
    """Parse existing home page into sections structure"""
    # This will be used to convert existing React components to database structure
    sections = [
        {
            "id": generate_id("section"),
            "name": "Hero Section",
            "layout": "full",
            "contentWidth": "1200px",
            "order": 0,
            "background": {
                "type": "image",
                "image": "/src/assets/home/hero-desktop.png",
                "overlay": "rgba(0,0,0,0.3)"
            },
            "containers": [
                {
                    "id": generate_id("container"),
                    "width": "100%",
                    "order": 0,
                    "widgets": [
                        {
                            "id": generate_id("widget"),
                            "type": "heading",
                            "order": 0,
                            "content": {
                                "text": "Digital Marketing That Delivers Real Results",
                                "tag": "h1"
                            },
                            "styles": {
                                "fontSize": "48px",
                                "fontWeight": "bold",
                                "color": "#ffffff",
                                "textAlign": "center"
                            },
                            "settings": {},
                            "visibility": {"desktop": True, "tablet": True, "mobile": True}
                        },
                        {
                            "id": generate_id("widget"),
                            "type": "text",
                            "order": 1,
                            "content": {
                                "html": "<p>Transform your online presence with data-driven strategies</p>"
                            },
                            "styles": {
                                "fontSize": "20px",
                                "color": "#ffffff",
                                "textAlign": "center"
                            },
                            "settings": {},
                            "visibility": {"desktop": True, "tablet": True, "mobile": True}
                        },
                        {
                            "id": generate_id("widget"),
                            "type": "button",
                            "order": 2,
                            "content": {
                                "text": "Get Started Today",
                                "link": "#contact"
                            },
                            "styles": {
                                "backgroundColor": "#FFCE00",
                                "color": "#000000",
                                "padding": "16px 32px",
                                "borderRadius": "8px",
                                "fontSize": "18px",
                                "fontWeight": "600"
                            },
                            "settings": {},
                            "visibility": {"desktop": True, "tablet": True, "mobile": True}
                        }
                    ]
                }
            ],
            "styles": {
                "padding": "120px 20px"
            },
            "settings": {},
            "shapeDividerTop": {"enabled": False},
            "shapeDividerBottom": {"enabled": False},
            "visibility": {"desktop": True, "tablet": True, "mobile": True}
        }
    ]
    
    return sections
