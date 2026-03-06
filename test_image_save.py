#!/usr/bin/env python3
"""
Test script to verify image saving to MongoDB
"""

import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os

MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "insapi_marketing")

async def test_content_save():
    """Test if content is being saved to MongoDB"""
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    print("🔍 Checking MongoDB connection...")
    try:
        await client.admin.command('ping')
        print("✅ MongoDB connected successfully")
    except Exception as e:
        print(f"❌ MongoDB connection failed: {e}")
        return
    
    print(f"\n📊 Checking 'content' collection in '{DB_NAME}' database...")
    
    # Count total documents
    count = await db.content.count_documents({})
    print(f"Total content items: {count}")
    
    if count == 0:
        print("⚠️  No content found in database!")
        print("This means images are NOT being saved.")
        return
    
    # Show some examples
    print("\n📝 Sample content items:")
    cursor = db.content.find().limit(10)
    async for doc in cursor:
        print(f"  - Page: {doc.get('page')}, Section: {doc.get('section')}, Key: {doc.get('key')}")
        if doc.get('type') == 'image':
            print(f"    Image URL: {doc.get('value')}")
    
    # Check for home page images
    print("\n🏠 Home page images:")
    home_images = []
    cursor = db.content.find({"page": "home", "type": "image"})
    async for doc in cursor:
        home_images.append(doc)
        print(f"  - Section: {doc.get('section')}, Key: {doc.get('key')}")
        print(f"    URL: {doc.get('value')}")
    
    if len(home_images) == 0:
        print("⚠️  No home page images found in database!")
    else:
        print(f"\n✅ Found {len(home_images)} home page images in database")
    
    client.close()

if __name__ == '__main__':
    asyncio.run(test_content_save())
