const mongoose = require('mongoose');

const investorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  investorName: {
    type: String,
    required: [true, 'Investor name is required'],
    trim: true,
    maxlength: [100, 'Investor name cannot exceed 100 characters']
  },
  type: {
    type: String,
    required: [true, 'Investor type is required'],
    enum: ['Angel Investor', 'Venture Capital', 'Private Equity', 'Corporate', 'Government', 'Other']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
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
  investmentFocus: [{
    type: String,
    enum: ['Technology', 'Healthcare', 'Finance', 'Education', 'E-commerce', 'Manufacturing', 'Other']
  }],
  investmentStages: [{
    type: String,
    enum: ['Idea', 'MVP', 'Early Stage', 'Growth', 'Scale-up', 'Mature']
  }],
  minInvestment: {
    type: Number,
    min: [0, 'Minimum investment cannot be negative']
  },
  maxInvestment: {
    type: Number,
    min: [0, 'Maximum investment cannot be negative']
  },
  totalInvested: {
    type: Number,
    min: [0, 'Total invested cannot be negative']
  },
  portfolioSize: {
    type: Number,
    min: [0, 'Portfolio size cannot be negative']
  },
  averageDealSize: {
    type: Number,
    min: [0, 'Average deal size cannot be negative']
  },
  logo: {
    type: String,
    default: null
  },
  socialMedia: {
    linkedin: String,
    twitter: String,
    facebook: String
  },
  contactInfo: {
    email: {
      type: String,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phone: {
      type: String,
      match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  preferredContactMethod: {
    type: String,
    enum: ['email', 'phone', 'linkedin', 'website'],
    default: 'email'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for full location
investorSchema.virtual('fullLocation').get(function() {
  return `${this.location.city}, ${this.location.country}`;
});

// Virtual for investment range
investorSchema.virtual('investmentRange').get(function() {
  if (this.minInvestment && this.maxInvestment) {
    return `${this.minInvestment.toLocaleString()} - ${this.maxInvestment.toLocaleString()}`;
  } else if (this.minInvestment) {
    return `${this.minInvestment.toLocaleString()}+`;
  } else if (this.maxInvestment) {
    return `Up to ${this.maxInvestment.toLocaleString()}`;
  }
  return 'Not specified';
});

// Indexes
investorSchema.index({ userId: 1 });
investorSchema.index({ type: 1 });
investorSchema.index({ 'location.country': 1 });
investorSchema.index({ 'location.city': 1 });
investorSchema.index({ investmentFocus: 1 });
investorSchema.index({ investmentStages: 1 });
investorSchema.index({ isActive: 1 });
investorSchema.index({ isVerified: 1 });
investorSchema.index({ type: 1, 'location.country': 1 });
investorSchema.index({ investmentFocus: 1, investmentStages: 1 });
investorSchema.index({ investorName: 'text', description: 'text', 'location.city': 'text', 'location.country': 'text' });

const Investor = mongoose.model('Investor', investorSchema);

module.exports = { Investor }; 