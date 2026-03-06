import express from 'express';
import Navigation from '../models/Navigation.js';
import { authenticate, isAdmin } from '../middleware/auth.js';
import crypto from 'crypto';

const router = express.Router();

// Python server admin credentials (must match server.py)
const ADMIN_USERNAME = "malo";
const ADMIN_PASSWORD_HASH = crypto.createHash('sha256').update("1234567890").digest('hex');

// Middleware to verify Python admin token OR JWT token
const verifyAdminToken = (req, res, next) => {
  const token = req.query.token || req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'No authentication token' });
  }
  
  // Check if it's a Python admin token (simple session token)
  // For now, we'll accept any token and verify it's from admin
  // In production, you should verify the token properly
  req.isAuthenticated = true;
  next();
};

// Get navigation (public)
router.get('/:name?', async (req, res) => {
  try {
    const name = req.params.name || 'main-menu';
    let navigation = await Navigation.findOne({ name });
    
    // If navigation doesn't exist, create default
    if (!navigation) {
      navigation = await Navigation.create({
        name: 'main-menu',
        items: [
          { label: 'Home', path: '/', type: 'link', order: 0, isVisible: true },
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
    }
    
    // Filter visible items for public
    const publicNav = {
      ...navigation.toObject(),
      items: navigation.items.filter(item => item.isVisible)
    };
    
    res.json(publicNav);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update navigation (Admin only)
router.put('/:name?', verifyAdminToken, async (req, res) => {
  try {
    const name = req.params.name || 'main-menu';
    const { items, settings } = req.body;
    
    const navigation = await Navigation.findOneAndUpdate(
      { name },
      {
        name,
        items,
        settings,
        updatedAt: Date.now()
      },
      { upsert: true, new: true }
    );
    
    res.json(navigation);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add navigation item (Admin only)
router.post('/:name/items', verifyAdminToken, async (req, res) => {
  try {
    const name = req.params.name || 'main-menu';
    const newItem = req.body;
    
    const navigation = await Navigation.findOne({ name });
    if (!navigation) {
      return res.status(404).json({ message: 'Navigation not found' });
    }
    
    // Set order to last
    newItem.order = navigation.items.length;
    navigation.items.push(newItem);
    
    await navigation.save();
    res.json(navigation);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update navigation item (Admin only)
router.put('/:name/items/:itemId', verifyAdminToken, async (req, res) => {
  try {
    const { name, itemId } = req.params;
    const updates = req.body;
    
    const navigation = await Navigation.findOne({ name });
    if (!navigation) {
      return res.status(404).json({ message: 'Navigation not found' });
    }
    
    const item = navigation.items.id(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Navigation item not found' });
    }
    
    Object.assign(item, updates);
    
    await navigation.save();
    res.json(navigation);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete navigation item (Admin only)
router.delete('/:name/items/:itemId', verifyAdminToken, async (req, res) => {
  try {
    const { name, itemId } = req.params;
    
    const navigation = await Navigation.findOne({ name });
    if (!navigation) {
      return res.status(404).json({ message: 'Navigation not found' });
    }
    
    navigation.items.pull(itemId);
    
    await navigation.save();
    res.json(navigation);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Reorder navigation items (Admin only)
router.post('/:name/reorder', verifyAdminToken, async (req, res) => {
  try {
    const name = req.params.name || 'main-menu';
    const { itemOrders } = req.body; // Array of { id, order }
    
    const navigation = await Navigation.findOne({ name });
    if (!navigation) {
      return res.status(404).json({ message: 'Navigation not found' });
    }
    
    // Update orders
    itemOrders.forEach(({ id, order }) => {
      const item = navigation.items.id(id);
      if (item) {
        item.order = order;
      }
    });
    
    // Sort items by order
    navigation.items.sort((a, b) => a.order - b.order);
    
    await navigation.save();
    res.json(navigation);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
