import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Navigation from '../models/Navigation.js';
import Page from '../models/Page.js';

dotenv.config();

const setupDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/marketing-site');
    console.log('✅ Connected to MongoDB');

    // 1. Ensure admin user exists
    console.log('\n📝 Checking admin user...');
    let admin = await User.findOne({ email: 'admin@insapi.com' });
    
    if (!admin) {
      admin = await User.create({
        email: 'admin@insapi.com',
        password: 'admin123456',
        name: 'Admin User',
        role: 'admin'
      });
      console.log('✅ Admin user created');
      console.log('   Email: admin@insapi.com');
      console.log('   Password: admin123456');
    } else {
      console.log('✅ Admin user already exists');
    }

    // 2. Initialize navigation
    console.log('\n📝 Checking navigation...');
    let navigation = await Navigation.findOne({ name: 'main-menu' });
    
    if (!navigation) {
      navigation = await Navigation.create({
        name: 'main-menu',
        items: [
          {
            label: 'Home',
            path: '/',
            type: 'link',
            order: 0,
            isVisible: true,
            openInNewTab: false
          },
          {
            label: 'Services',
            path: '/services',
            type: 'dropdown',
            order: 1,
            isVisible: true,
            children: [
              { label: 'Branding & PR', path: '/branding-pr', order: 0 },
              { label: 'Content Marketing', path: '/content-marketing', order: 1 },
              { label: 'Google Ads', path: '/google-ads', order: 2 },
              { label: 'Meta Ads', path: '/meta-ads', order: 3 },
              { label: 'Shopify Development', path: '/shopify-development', order: 4 },
              { label: 'Social Media Marketing', path: '/social-media-marketing', order: 5 }
            ]
          },
          {
            label: 'About',
            path: '/#about',
            type: 'link',
            order: 2,
            isVisible: true,
            openInNewTab: false
          },
          {
            label: 'Blog',
            path: '/blog',
            type: 'link',
            order: 3,
            isVisible: true,
            openInNewTab: false
          },
          {
            label: 'Contact',
            path: '/contact',
            type: 'link',
            order: 4,
            isVisible: true,
            openInNewTab: false
          }
        ],
        settings: {
          logo: '/src/assets/shared/logo.png',
          logoAlt: 'InsAPI Marketing',
          contactEmail: 'info@insapi.com',
          contactPhone: '+91 1234567890',
          showContactInfo: true
        }
      });
      console.log('✅ Navigation created');
      console.log('   Items:', navigation.items.length);
    } else {
      console.log('✅ Navigation already exists');
    }

    // 3. Check for existing pages
    console.log('\n📝 Checking pages...');
    const pageCount = await Page.countDocuments();
    console.log(`✅ Found ${pageCount} pages in database`);

    console.log('\n🎉 Database setup complete!');
    console.log('\n📋 Summary:');
    console.log('   - Admin user: admin@insapi.com / admin123456');
    console.log('   - Navigation: main-menu with', navigation.items.length, 'items');
    console.log('   - Pages:', pageCount);
    console.log('\n⚠️  Remember to change the admin password after first login!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    process.exit(1);
  }
};

setupDatabase();
