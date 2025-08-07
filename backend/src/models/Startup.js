const mongoose = require('mongoose');

const startupSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  sector: {
    type: String,
    required: [true, 'Sector is required'],
    enum: ['Technology', 'Healthcare', 'Finance', 'Education', 'E-commerce', 'Manufacturing', 'Other']
  },
  stage: {
    type: String,
    required: [true, 'Stage is required'],
    enum: ['Idea', 'MVP', 'Early Stage', 'Growth', 'Scale-up', 'Mature']
  },
  location: {
    country: {
      type: String,
      required: [true, 'Country is required']
    },
    city: {
      type: String,
      required: [true, 'City is required']
    },
    address: String
  },
  website: {
    type: String,
    match: [/^https?:\/\/.+/, 'Please enter a valid website URL']
  },
  foundedYear: {
    type: Number,
    min: [1900, 'Founded year must be after 1900'],
    max: [new Date().getFullYear(), 'Founded year cannot be in the future']
  },
  teamSize: {
    type: Number,
    min: [1, 'Team size must be at least 1'],
    max: [10000, 'Team size cannot exceed 10000']
  },
  fundingStage: {
    type: String,
    enum: ['Bootstrapped', 'Seed', 'Series A', 'Series B', 'Series C', 'Series D+', 'IPO']
  },
  totalFunding: {
    type: Number,
    min: [0, 'Total funding cannot be negative']
  },
  revenue: {
    type: Number,
    min: [0, 'Revenue cannot be negative']
  },
  logo: {
    type: String,
    default: null
  },
  pitchDeck: {
    type: String,
    default: null
  },
  socialMedia: {
    linkedin: String,
    twitter: String,
    facebook: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for full location
startupSchema.virtual('fullLocation').get(function() {
  return `${this.location.city}, ${this.location.country}`;
});

// Indexes
startupSchema.index({ userId: 1 });
startupSchema.index({ sector: 1 });
startupSchema.index({ stage: 1 });
startupSchema.index({ 'location.country': 1 });
startupSchema.index({ 'location.city': 1 });
startupSchema.index({ isActive: 1 });
startupSchema.index({ isVerified: 1 });
startupSchema.index({ 'location.country': 1, 'location.city': 1 });
startupSchema.index({ companyName: 'text', description: 'text', 'location.city': 'text', 'location.country': 'text' });

const Startup = mongoose.model('Startup', startupSchema);

module.exports = { Startup }; 