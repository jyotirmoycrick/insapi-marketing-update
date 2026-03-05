import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true,
    enum: ['home', 'services', 'content-marketing', 'google-ads', 'meta-ads', 'shopify', 'social-media']
  },
  section: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['text', 'image', 'list', 'faq'],
    required: true
  },
  key: {
    type: String,
    required: true
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  isVisible: {
    type: Boolean,
    default: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

// Create compound index for faster queries
contentSchema.index({ page: 1, section: 1, key: 1 }, { unique: true });

export default mongoose.model('Content', contentSchema);
