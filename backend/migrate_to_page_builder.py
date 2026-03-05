"""
Page Migration Script
Converts existing React-based pages to database-driven page builder format
"""

import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timezone
import os
import sys

# Add parent directory to path for imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from page_builder_api import generate_id

MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "insapi_marketing")

async def migrate_home_page():
    """Migrate Home page to page builder format"""
    
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    print("🔄 Starting Home page migration...")
    
    # Clear existing sections for home page
    await db.pages.update_one(
        {"page_id": "home"},
        {"$set": {"sections": []}}
    )
    
    # Define Home page sections
    sections = []
    
    # ========================================
    # SECTION 1: Hero Section
    # ========================================
    hero_section_id = generate_id("section")
    hero_container_id = generate_id("container")
    
    sections.append({
        "id": hero_section_id,
        "name": "Hero Section",
        "layout": "full",
        "contentWidth": "1200px",
        "order": 0,
        "background": {
            "type": "image",
            "image": "/src/assets/home/hero-desktop.png",
            "overlay": "rgba(30, 58, 95, 0.3)",
            "overlayOpacity": 0.3,
            "attachment": "scroll",
            "position": "center center",
            "size": "cover"
        },
        "shapeDividerTop": {"enabled": False},
        "shapeDividerBottom": {
            "enabled": True,
            "type": "wave",
            "color": "#ffffff",
            "height": "100px",
            "flip": False
        },
        "styles": {
            "padding": "120px 20px",
            "minHeight": "600px",
            "display": "flex",
            "alignItems": "center",
            "justifyContent": "center"
        },
        "settings": {},
        "visibility": {"desktop": True, "tablet": True, "mobile": True},
        "containers": [{
            "id": hero_container_id,
            "type": "column",
            "width": "100%",
            "order": 0,
            "styles": {
                "maxWidth": "800px",
                "margin": "0 auto",
                "textAlign": "center"
            },
            "settings": {},
            "widgets": [
                {
                    "id": generate_id("widget"),
                    "type": "heading",
                    "order": 0,
                    "content": {
                        "text": "Digital Marketing That Delivers Real Results",
                        "tag": "h1",
                        "link": None
                    },
                    "styles": {
                        "fontSize": "56px",
                        "fontWeight": "bold",
                        "color": "#ffffff",
                        "textAlign": "center",
                        "marginBottom": "20px",
                        "lineHeight": "1.2"
                    },
                    "settings": {},
                    "visibility": {"desktop": True, "tablet": True, "mobile": True}
                },
                {
                    "id": generate_id("widget"),
                    "type": "text",
                    "order": 1,
                    "content": {
                        "html": "<p>Transform your online presence with data-driven strategies and proven results</p>"
                    },
                    "styles": {
                        "fontSize": "20px",
                        "color": "#ffffff",
                        "textAlign": "center",
                        "marginBottom": "30px",
                        "lineHeight": "1.6"
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
                        "link": "#contact",
                        "icon": None,
                        "iconPosition": "left"
                    },
                    "styles": {
                        "backgroundColor": "#FFCE00",
                        "color": "#000000",
                        "padding": "16px 40px",
                        "borderRadius": "8px",
                        "fontSize": "18px",
                        "fontWeight": "600",
                        "border": "none",
                        "cursor": "pointer"
                    },
                    "settings": {},
                    "visibility": {"desktop": True, "tablet": True, "mobile": True}
                }
            ]
        }]
    })
    
    # ========================================
    # SECTION 2: Services Grid
    # ========================================
    services_section_id = generate_id("section")
    services_container_id = generate_id("container")
    
    services = [
        {"icon": "📱", "title": "Meta Ads", "desc": "Facebook & Instagram advertising campaigns", "link": "/meta-ads"},
        {"icon": "🔍", "title": "Google Ads", "desc": "PPC campaigns that drive conversions", "link": "/google-ads"},
        {"icon": "🛍️", "title": "Shopify Development", "desc": "Build your online store with experts", "link": "/shopify-development"},
        {"icon": "✍️", "title": "Content Marketing", "desc": "Strategic content that engages", "link": "/content-marketing"},
        {"icon": "📢", "title": "Social Media", "desc": "Grow your social presence", "link": "/social-media-marketing"},
        {"icon": "🎨", "title": "Branding & PR", "desc": "Build your brand identity", "link": "/branding-pr"},
        {"icon": "📧", "title": "Email Marketing", "desc": "Engage with personalized campaigns", "link": "#"},
        {"icon": "🎥", "title": "Video Marketing", "desc": "Tell your story with video", "link": "#"}
    ]
    
    service_widgets = []
    for i, service in enumerate(services):
        service_widgets.append({
            "id": generate_id("widget"),
            "type": "service-card",
            "order": i,
            "content": {
                "icon": service["icon"],
                "title": service["title"],
                "description": service["desc"],
                "link": service["link"],
                "linkText": "Learn More"
            },
            "styles": {
                "padding": "30px",
                "backgroundColor": "#ffffff",
                "borderRadius": "12px",
                "boxShadow": "0 4px 6px rgba(0,0,0,0.1)",
                "transition": "transform 0.3s ease"
            },
            "settings": {},
            "visibility": {"desktop": True, "tablet": True, "mobile": True}
        })
    
    sections.append({
        "id": services_section_id,
        "name": "Services Section",
        "layout": "boxed",
        "contentWidth": "1200px",
        "order": 1,
        "background": {
            "type": "color",
            "color": "#f9fafb"
        },
        "shapeDividerTop": {"enabled": False},
        "shapeDividerBottom": {"enabled": False},
        "styles": {
            "padding": "80px 20px"
        },
        "settings": {},
        "visibility": {"desktop": True, "tablet": True, "mobile": True},
        "containers": [
            {
                "id": generate_id("container"),
                "type": "column",
                "width": "100%",
                "order": 0,
                "styles": {
                    "marginBottom": "50px",
                    "textAlign": "center"
                },
                "settings": {},
                "widgets": [
                    {
                        "id": generate_id("widget"),
                        "type": "heading",
                        "order": 0,
                        "content": {
                            "text": "Our Services",
                            "tag": "h2"
                        },
                        "styles": {
                            "fontSize": "42px",
                            "fontWeight": "bold",
                            "color": "#1E3A5F",
                            "marginBottom": "20px"
                        },
                        "settings": {},
                        "visibility": {"desktop": True, "tablet": True, "mobile": True}
                    },
                    {
                        "id": generate_id("widget"),
                        "type": "text",
                        "order": 1,
                        "content": {
                            "html": "<p>Comprehensive digital marketing solutions to grow your business</p>"
                        },
                        "styles": {
                            "fontSize": "18px",
                            "color": "#6b7280"
                        },
                        "settings": {},
                        "visibility": {"desktop": True, "tablet": True, "mobile": True}
                    }
                ]
            },
            {
                "id": services_container_id,
                "type": "grid",
                "width": "100%",
                "order": 1,
                "styles": {
                    "display": "grid",
                    "gridTemplateColumns": "repeat(auto-fit, minmax(280px, 1fr))",
                    "gap": "30px"
                },
                "settings": {
                    "columns": 4,
                    "gap": "30px"
                },
                "widgets": service_widgets
            }
        ]
    })
    
    # ========================================
    # SECTION 3: Stats Section
    # ========================================
    stats_section_id = generate_id("section")
    
    sections.append({
        "id": stats_section_id,
        "name": "Stats Section",
        "layout": "boxed",
        "contentWidth": "1200px",
        "order": 2,
        "background": {
            "type": "gradient",
            "gradient": "linear-gradient(135deg, #1E3A5F 0%, #2c5282 100%)"
        },
        "shapeDividerTop": {"enabled": False},
        "shapeDividerBottom": {"enabled": False},
        "styles": {
            "padding": "60px 20px"
        },
        "settings": {},
        "visibility": {"desktop": True, "tablet": True, "mobile": True},
        "containers": [{
            "id": generate_id("container"),
            "type": "column",
            "width": "100%",
            "order": 0,
            "styles": {},
            "settings": {},
            "widgets": [{
                "id": generate_id("widget"),
                "type": "stats-section",
                "order": 0,
                "content": {
                    "stats": [
                        {"number": "500", "suffix": "+", "label": "Happy Clients"},
                        {"number": "1000", "suffix": "+", "label": "Projects Completed"},
                        {"number": "50", "suffix": "+", "label": "Industry Awards"},
                        {"number": "98", "suffix": "%", "label": "Client Satisfaction"}
                    ]
                },
                "styles": {
                    "color": "#ffffff"
                },
                "settings": {},
                "visibility": {"desktop": True, "tablet": True, "mobile": True}
            }]
        }]
    })
    
    # ========================================
    # SECTION 4: CTA Section
    # ========================================
    cta_section_id = generate_id("section")
    
    sections.append({
        "id": cta_section_id,
        "name": "CTA Section",
        "layout": "boxed",
        "contentWidth": "1000px",
        "order": 3,
        "background": {
            "type": "gradient",
            "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        },
        "shapeDividerTop": {
            "enabled": True,
            "type": "curve",
            "color": "#ffffff",
            "height": "80px",
            "flip": False
        },
        "shapeDividerBottom": {
            "enabled": True,
            "type": "curve",
            "color": "#ffffff",
            "height": "80px",
            "flip": True
        },
        "styles": {
            "padding": "100px 20px"
        },
        "settings": {},
        "visibility": {"desktop": True, "tablet": True, "mobile": True},
        "containers": [{
            "id": generate_id("container"),
            "type": "column",
            "width": "100%",
            "order": 0,
            "styles": {
                "textAlign": "center"
            },
            "settings": {},
            "widgets": [
                {
                    "id": generate_id("widget"),
                    "type": "heading",
                    "order": 0,
                    "content": {
                        "text": "Ready to Grow Your Business?",
                        "tag": "h2"
                    },
                    "styles": {
                        "fontSize": "48px",
                        "fontWeight": "bold",
                        "color": "#ffffff",
                        "marginBottom": "20px"
                    },
                    "settings": {},
                    "visibility": {"desktop": True, "tablet": True, "mobile": True}
                },
                {
                    "id": generate_id("widget"),
                    "type": "text",
                    "order": 1,
                    "content": {
                        "html": "<p>Join hundreds of businesses that trust us with their digital marketing</p>"
                    },
                    "styles": {
                        "fontSize": "20px",
                        "color": "rgba(255,255,255,0.9)",
                        "marginBottom": "30px"
                    },
                    "settings": {},
                    "visibility": {"desktop": True, "tablet": True, "mobile": True}
                },
                {
                    "id": generate_id("widget"),
                    "type": "button",
                    "order": 2,
                    "content": {
                        "text": "Start Your Free Consultation",
                        "link": "#contact"
                    },
                    "styles": {
                        "backgroundColor": "#FFCE00",
                        "color": "#000000",
                        "padding": "18px 40px",
                        "borderRadius": "8px",
                        "fontSize": "18px",
                        "fontWeight": "600"
                    },
                    "settings": {},
                    "visibility": {"desktop": True, "tablet": True, "mobile": True}
                }
            ]
        }]
    })
    
    # Update home page with sections
    result = await db.pages.update_one(
        {"page_id": "home"},
        {
            "$set": {
                "sections": sections,
                "updated_at": datetime.now(timezone.utc)
            }
        }
    )
    
    if result.modified_count > 0:
        print(f"✅ Home page migrated successfully!")
        print(f"   - {len(sections)} sections created")
        print(f"   - Hero, Services, Stats, CTA sections")
    else:
        print("❌ Failed to update home page")
    
    client.close()


async def migrate_service_pages():
    """Migrate Service pages to page builder format"""
    
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    print("\n🔄 Starting Service pages migration...")
    
    service_pages = [
        {
            "page_id": "meta-ads",
            "hero_title": "Meta Ads (Facebook & Instagram)",
            "hero_desc": "Drive engagement and conversions with targeted Meta advertising",
            "hero_bg": "/src/assets/services/meta-ads-bg.jpg"
        },
        {
            "page_id": "google-ads",
            "hero_title": "Google Ads Management",
            "hero_desc": "Dominate search results with strategic PPC campaigns",
            "hero_bg": "/src/assets/services/google-ads-bg.jpg"
        }
    ]
    
    for service in service_pages:
        # Create basic hero section for each service
        hero_section = {
            "id": generate_id("section"),
            "name": "Hero Section",
            "layout": "boxed",
            "contentWidth": "1200px",
            "order": 0,
            "background": {
                "type": "gradient",
                "gradient": "linear-gradient(135deg, #1E3A5F 0%, #4A90E2 100%)"
            },
            "shapeDividerTop": {"enabled": False},
            "shapeDividerBottom": {
                "enabled": True,
                "type": "wave",
                "color": "#ffffff",
                "height": "100px"
            },
            "styles": {
                "padding": "100px 20px",
                "textAlign": "center"
            },
            "settings": {},
            "visibility": {"desktop": True, "tablet": True, "mobile": True},
            "containers": [{
                "id": generate_id("container"),
                "type": "column",
                "width": "100%",
                "order": 0,
                "styles": {},
                "settings": {},
                "widgets": [
                    {
                        "id": generate_id("widget"),
                        "type": "heading",
                        "order": 0,
                        "content": {
                            "text": service["hero_title"],
                            "tag": "h1"
                        },
                        "styles": {
                            "fontSize": "48px",
                            "fontWeight": "bold",
                            "color": "#ffffff",
                            "marginBottom": "20px"
                        },
                        "settings": {},
                        "visibility": {"desktop": True, "tablet": True, "mobile": True}
                    },
                    {
                        "id": generate_id("widget"),
                        "type": "text",
                        "order": 1,
                        "content": {
                            "html": f"<p>{service['hero_desc']}</p>"
                        },
                        "styles": {
                            "fontSize": "20px",
                            "color": "rgba(255,255,255,0.9)"
                        },
                        "settings": {},
                        "visibility": {"desktop": True, "tablet": True, "mobile": True}
                    }
                ]
            }]
        }
        
        result = await db.pages.update_one(
            {"page_id": service["page_id"]},
            {
                "$set": {
                    "sections": [hero_section],
                    "updated_at": datetime.now(timezone.utc)
                }
            }
        )
        
        if result.modified_count > 0:
            print(f"✅ {service['page_id']} migrated")
        else:
            print(f"⏭️  {service['page_id']} skipped (not found or already migrated)")
    
    client.close()


async def main():
    """Run all migrations"""
    print("=" * 60)
    print("🚀 PAGE MIGRATION SCRIPT")
    print("=" * 60)
    
    try:
        await migrate_home_page()
        await migrate_service_pages()
        
        print("\n" + "=" * 60)
        print("✅ MIGRATION COMPLETE!")
        print("=" * 60)
        print("\nYou can now:")
        print("1. View migrated pages: https://your-domain.com/test-builder")
        print("2. Edit pages in admin: https://your-domain.com/fast-admin/dashboard")
        print("3. All content is now fully editable!")
        
    except Exception as e:
        print(f"\n❌ Error during migration: {str(e)}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    asyncio.run(main())
