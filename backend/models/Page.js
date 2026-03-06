import mongoose from 'mongoose';

const pageSchema = new mongoose.Schema({
  page_id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  page_name: {
    type: String,
    required: true,
    trim: true
  },
  route: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['static', 'dynamic', 'builder'],
    default: 'builder'
  },
  // For builder pages
  sections: [{
    type: mongoose.Schema.Types.Mixed
  }],
  // For legacy component-based pages
  components: [{
    type: mongoose.Schema.Types.Mixed
  }],
  meta: {
    title: String,
    description: String,
    keywords: [String],
    ogImage: String,
    canonical: String,
    noindex: Boolean,
    nofollow: Boolean
  },
  is_published: {
    type: Boolean,
    default: false
  },
  is_editable: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  published_at: {
    type: Date
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  updated_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

// Update timestamp on save
pageSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

export default mongoose.model('Page', pageSchema);
