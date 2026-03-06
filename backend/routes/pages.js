import express from 'express';
import Page from '../models/Page.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Middleware to verify admin token (accepts Python admin token)
const verifyAdminToken = (req, res, next) => {
  const token = req.query.token || req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'No authentication token' });
  }
  
  // Accept any token for now (Python admin token)
  req.isAuthenticated = true;
  next();
};

// Get all pages
router.get('/', async (req, res) => {
  try {
    const { includeUnpublished } = req.query;
    const query = includeUnpublished === 'true' ? {} : { is_published: true };
    
    const pages = await Page.find(query).sort({ order: 1 });
    res.json(pages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single page by ID or route
router.get('/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params;
    
    // Try to find by page_id first, then by route
    let page = await Page.findOne({ page_id: identifier });
    if (!page) {
      page = await Page.findOne({ route: identifier });
    }
    
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    
    // Check if published (unless admin)
    if (!page.is_published && !req.user) {
      return res.status(404).json({ message: 'Page not found' });
    }
    
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create page (Admin only)
router.post('/', verifyAdminToken, async (req, res) => {
  try {
    const pageData = {
      ...req.body
    };
    
    const page = await Page.create(pageData);
    res.status(201).json(page);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Page with this ID or route already exists' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update page (Admin only)
router.put('/:page_id', verifyAdminToken, async (req, res) => {
  try {
    const { page_id } = req.params;
    const updates = {
      ...req.body,
      updated_at: Date.now()
    };
    
    const page = await Page.findOneAndUpdate(
      { page_id },
      updates,
      { new: true, runValidators: true }
    );
    
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete page (Admin only)
router.delete('/:page_id', verifyAdminToken, async (req, res) => {
  try {
    const { page_id } = req.params;
    
    const page = await Page.findOneAndDelete({ page_id });
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    
    res.json({ message: 'Page deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Publish/Unpublish page (Admin only)
router.patch('/:page_id/publish', verifyAdminToken, async (req, res) => {
  try {
    const { page_id } = req.params;
    const { is_published } = req.body;
    
    const page = await Page.findOneAndUpdate(
      { page_id },
      { 
        is_published,
        published_at: is_published ? Date.now() : null
      },
      { new: true }
    );
    
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Convert static page to editable (Admin only)
router.post('/:page_id/convert-to-editable', verifyAdminToken, async (req, res) => {
  try {
    const { page_id } = req.params;
    const { sections, components } = req.body;
    
    let page = await Page.findOne({ page_id });
    
    if (!page) {
      // Create new page entry for existing static page
      page = await Page.create({
        page_id,
        page_name: req.body.page_name || page_id,
        route: req.body.route || `/${page_id}`,
        type: 'builder',
        sections: sections || [],
        components: components || [],
        is_published: true,
        is_editable: true
      });
    } else {
      // Update existing page
      page.sections = sections || page.sections || [];
      page.components = components || page.components || [];
      page.is_editable = true;
      page.type = 'builder';
      await page.save();
    }
    
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
