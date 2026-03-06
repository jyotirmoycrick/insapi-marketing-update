import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Navigation from '../models/Navigation.js';

dotenv.config();

const initializeNavigation = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/marketing-site');
    console.log('✅ Connected to MongoDB');

    // Check if navigation already exists
    const existing = await Navigation.findOne({ name: 'main-menu' });
    if (existing) {
      console.log('⚠️  Navigation already exists. Skipping initialization.');
      process.exit(0);
    }

    // Create default navigation
    const navigation = await Navigation.create({
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

    console.log('✅ Default navigation created successfully!');
    console.log('📋 Navigation items:', navigation.items.length);
    console.log('🎨 Logo:', navigation.settings.logo);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error initializing navigation:', error);
    process.exit(1);
  }
};

initializeNavigation();
