import mongoose from 'mongoose';

const navigationItemSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    trim: true
  },
  path: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['link', 'dropdown', 'button'],
    default: 'link'
  },
  children: [{
    label: String,
    path: String,
    order: Number
  }],
  icon: {
    type: String,
    trim: true
  },
  order: {
    type: Number,
    default: 0
  },
  isVisible: {
    type: Boolean,
    default: true
  },
  openInNewTab: {
    type: Boolean,
    default: false
  },
  cssClass: {
    type: String,
    trim: true
  }
});

const navigationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    default: 'main-menu'
  },
  items: [navigationItemSchema],
  settings: {
    logo: String,
    logoAlt: String,
    contactEmail: String,
    contactPhone: String,
    showContactInfo: {
      type: Boolean,
      default: true
    }
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

// Update timestamp on save
navigationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Navigation', navigationSchema);
