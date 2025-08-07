const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true,
    maxlength: [200, 'Event title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Event description is required'],
    maxlength: [2000, 'Event description cannot exceed 2000 characters']
  },
  type: {
    type: String,
    required: [true, 'Event type is required'],
    enum: ['Conference', 'Workshop', 'Networking', 'Pitch Competition', 'Webinar', 'Hackathon', 'Other']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  location: {
    type: {
      type: String,
      enum: ['Physical', 'Virtual', 'Hybrid'],
      required: [true, 'Location type is required']
    },
    address: String,
    city: String,
    country: String,
    virtualLink: String,
    timezone: {
      type: String,
      default: 'UTC'
    }
  },
  organizer: {
    name: {
      type: String,
      required: [true, 'Organizer name is required']
    },
    email: {
      type: String,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phone: {
      type: String,
      match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
    }
  },
  capacity: {
    type: Number,
    min: [1, 'Capacity must be at least 1']
  },
  registeredAttendees: {
    type: Number,
    default: 0,
    min: [0, 'Registered attendees cannot be negative']
  },
  price: {
    type: Number,
    min: [0, 'Price cannot be negative'],
    default: 0
  },
  currency: {
    type: String,
    default: 'USD',
    enum: ['USD', 'EUR', 'GBP', 'NGN', 'Other']
  },
  tags: [{
    type: String,
    trim: true
  }],
  image: {
    type: String,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  registrationDeadline: {
    type: Date
  },
  status: {
    type: String,
    enum: ['Draft', 'Published', 'Cancelled', 'Completed'],
    default: 'Draft'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for full location
eventSchema.virtual('fullLocation').get(function() {
  if (this.location.type === 'Virtual') {
    return 'Virtual Event';
  } else if (this.location.type === 'Hybrid') {
    return `${this.location.city}, ${this.location.country} (Hybrid)`;
  } else {
    return `${this.location.city}, ${this.location.country}`;
  }
});

// Virtual for availability status
eventSchema.virtual('availabilityStatus').get(function() {
  if (this.registeredAttendees >= this.capacity) {
    return 'Full';
  } else if (this.registeredAttendees >= this.capacity * 0.8) {
    return 'Limited';
  } else {
    return 'Available';
  }
});

// Virtual for price display
eventSchema.virtual('priceDisplay').get(function() {
  if (this.price === 0) {
    return 'Free';
  } else {
    return `${this.currency} ${this.price}`;
  }
});

// Indexes
eventSchema.index({ startDate: 1 });
eventSchema.index({ endDate: 1 });
eventSchema.index({ type: 1 });
eventSchema.index({ 'location.type': 1 });
eventSchema.index({ 'location.country': 1 });
eventSchema.index({ isActive: 1 });
eventSchema.index({ isFeatured: 1 });
eventSchema.index({ status: 1 });
eventSchema.index({ startDate: 1, isActive: 1 });
eventSchema.index({ type: 1, 'location.country': 1 });
eventSchema.index({ isFeatured: 1, startDate: 1 });
eventSchema.index({ title: 'text', description: 'text', 'location.city': 'text', 'location.country': 'text', tags: 'text' });

// Pre-save middleware to validate dates
eventSchema.pre('save', function(next) {
  if (this.startDate && this.endDate && this.startDate >= this.endDate) {
    next(new Error('End date must be after start date'));
  } else {
    next();
  }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = { Event }; 