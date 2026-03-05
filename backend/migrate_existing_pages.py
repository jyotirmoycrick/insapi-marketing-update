"""
Migration Script: Add Existing Frontend Pages to Database
This makes existing pages (Home, Services, etc.) editable through the admin panel
"""

import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timezone
import os

# MongoDB connection
MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "insapi_marketing")

async def migrate_pages():
    """Migrate existing frontend pages to database"""
    
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    print("🔄 Starting migration of existing pages...")
    
    # Define existing pages
    pages = [
        {
            "page_id": "home",
            "page_name": "Home",
            "route": "/",
            "is_published": True,
            "components": [],
            "meta": {
                "title": "InsAPI Marketing - Digital Marketing Agency",
                "description": "Professional digital marketing services"
            }
        },
        {
            "page_id": "services",
            "page_name": "Services",
            "route": "/services",
            "is_published": True,
            "components": [],
            "meta": {
                "title": "Our Services - InsAPI Marketing",
                "description": "Explore our digital marketing services"
            }
        },
        {
            "page_id": "meta-ads",
            "page_name": "Meta Ads (Facebook & Instagram)",
            "route": "/meta-ads",
            "is_published": True,
            "components": [],
            "meta": {
                "title": "Meta Ads Services - Facebook & Instagram Advertising",
                "description": "Expert Meta ads management"
            }
        },
        {
            "page_id": "google-ads",
            "page_name": "Google Ads",
            "route": "/google-ads",
            "is_published": True,
            "components": [],
            "meta": {
                "title": "Google Ads Services - PPC Management",
                "description": "Professional Google Ads campaigns"
            }
        },
        {
            "page_id": "shopify",
            "page_name": "Shopify Development",
            "route": "/shopify-development",
            "is_published": True,
            "components": [],
            "meta": {
                "title": "Shopify Development Services",
                "description": "Build your Shopify store with experts"
            }
        },
        {
            "page_id": "content-marketing",
            "page_name": "Content Marketing",
            "route": "/content-marketing",
            "is_published": True,
            "components": [],
            "meta": {
                "title": "Content Marketing Services",
                "description": "Strategic content marketing solutions"
            }
        },
        {
            "page_id": "social-media",
            "page_name": "Social Media Marketing",
            "route": "/social-media-marketing",
            "is_published": True,
            "components": [],
            "meta": {
                "title": "Social Media Marketing Services",
                "description": "Grow your social media presence"
            }
        },
        {
            "page_id": "branding",
            "page_name": "Branding & PR",
            "route": "/branding-pr",
            "is_published": True,
            "components": [],
            "meta": {
                "title": "Branding & PR Services",
                "description": "Build your brand identity"
            }
        }
    ]
    
    # Add timestamps and order
    for i, page in enumerate(pages):
        page["created_at"] = datetime.now(timezone.utc)
        page["updated_at"] = datetime.now(timezone.utc)
        page["order"] = i
        
        # Check if page already exists
        existing = await db.pages.find_one({"page_id": page["page_id"]})
        
        if existing:
            print(f"⏭️  Skipping {page['page_name']} (already exists)")
        else:
            await db.pages.insert_one(page)
            print(f"✅ Added {page['page_name']} to database")
    
    print("\n🎉 Migration complete!")
    print(f"📊 Total pages in database: {await db.pages.count_documents({})}")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(migrate_pages())
