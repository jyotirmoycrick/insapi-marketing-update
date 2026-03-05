import express from 'express';
import Content from '../models/Content.js';
import Client from '../models/Client.js';
import Portfolio from '../models/Portfolio.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all content for a page
router.get('/page/:page', async (req, res) => {
  try {
    const content = await Content.find({ 
      page: req.params.page,
      isVisible: true 
    });
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get specific content
router.get('/:page/:section/:key', async (req, res) => {
  try {
    const content = await Content.findOne({
      page: req.params.page,
      section: req.params.section,
      key: req.params.key
    });
    
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create or update content (Admin only)
router.post('/', authenticate, isAdmin, async (req, res) => {
  try {
    const { page, section, type, key, value, isVisible } = req.body;

    const content = await Content.findOneAndUpdate(
      { page, section, key },
      {
        page,
        section,
        type,
        key,
        value,
        isVisible: isVisible !== undefined ? isVisible : true,
        updatedAt: Date.now(),
        updatedBy: req.user._id
      },
      { upsert: true, new: true }
    );

    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete content (Admin only)
router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    await Content.findByIdAndDelete(req.params.id);
    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Toggle section visibility (Admin only)
router.patch('/:id/visibility', authenticate, isAdmin, async (req, res) => {
  try {
    const content = await Content.findByIdAndUpdate(
      req.params.id,
      { isVisible: req.body.isVisible },
      { new: true }
    );
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ===== CLIENT ROUTES =====

// Get all clients
router.get('/clients', async (req, res) => {
  try {
    const clients = await Client.find({ isVisible: true }).sort({ order: 1 });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create client (Admin only)
router.post('/clients', authenticate, isAdmin, async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update client (Admin only)
router.put('/clients/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete client (Admin only)
router.delete('/clients/:id', authenticate, isAdmin, async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ===== PORTFOLIO ROUTES =====

// Get all portfolio items
router.get('/portfolio', async (req, res) => {
  try {
    const { category } = req.query;
    const query = { isVisible: true };
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    const portfolio = await Portfolio.find(query).sort({ order: 1 });
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create portfolio item (Admin only)
router.post('/portfolio', authenticate, isAdmin, async (req, res) => {
  try {
    const portfolio = new Portfolio(req.body);
    await portfolio.save();
    res.status(201).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update portfolio item (Admin only)
router.put('/portfolio/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete portfolio item (Admin only)
router.delete('/portfolio/:id', authenticate, isAdmin, async (req, res) => {
  try {
    await Portfolio.findByIdAndDelete(req.params.id);
    res.json({ message: 'Portfolio item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
