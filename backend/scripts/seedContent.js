import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Content from '../models/Content.js';

dotenv.config();

const seedData = [
  // Home Page - Hero Section
  {
    page: 'home',
    section: 'hero',
    type: 'text',
    key: 'title',
    value: 'Transform Your Brand with Data-Driven Marketing',
    isVisible: true
  },
  {
    page: 'home',
    section: 'hero',
    type: 'text',
    key: 'subtitle',
    value: 'We help businesses grow through strategic branding, content marketing, and performance advertising',
    isVisible: true
  },
  
  // Home Page - About Section
  {
    page: 'home',
    section: 'about',
    type: 'text',
    key: 'title',
    value: 'About Us',
    isVisible: true
  },
  {
    page: 'home',
    section: 'about',
    type: 'text',
    key: 'description',
    value: 'We are a full-service digital marketing agency specializing in branding, content marketing, and performance advertising.',
    isVisible: true
  },
];

const seedContent = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/marketing-site');
    console.log('Connected to MongoDB');

    // Clear existing content (optional)
    // await Content.deleteMany({});
    // console.log('Cleared existing content');

    // Insert seed data
    for (const item of seedData) {
      await Content.findOneAndUpdate(
        { page: item.page, section: item.section, key: item.key },
        item,
        { upsert: true, new: true }
      );
    }

    console.log('✅ Content seeded successfully!');
    console.log(`Seeded ${seedData.length} content items`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding content:', error);
    process.exit(1);
  }
};

seedContent();
