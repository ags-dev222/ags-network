const { connectDB } = require('./database');
const { User } = require('../models/User');
const { Startup } = require('../models/Startup');
const { Investor } = require('../models/Investor');
const { Event } = require('../models/Event');
const { logger } = require('../utils/logger');

const initDatabase = async () => {
  try {
    logger.info('Connecting to MongoDB...');
    
    // Connect to MongoDB
    await connectDB();
    logger.info('MongoDB connection established successfully');
    logger.info('Database initialization starting...');

    // Create admin user if it doesn't exist
    const adminExists = await User.findOne({ email: 'admin@agsnetwork.com' });
    
    if (!adminExists) {
      logger.info('👤 Creating admin user...');
      const adminUser = new User({
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@agsnetwork.com',
        password: 'admin123456',
        role: 'admin',
        emailVerified: true,
        isActive: true
      });
      await adminUser.save();
      logger.info('Admin user created successfully');
    } else {
      logger.info('👤 Admin user already exists');
    }

    // Create sample events if none exist
    const eventCount = await Event.countDocuments();
    if (eventCount === 0) {
      logger.info('Creating sample events...');
      const sampleEvents = [
        {
          title: 'Ghana Startup & SMEs Week',
          description: 'Annual startup ecosystem event in Ghana',
          type: 'Conference',
          startDate: new Date('2024-12-15T09:00:00Z'),
          endDate: new Date('2024-12-17T18:00:00Z'),
          location: {
            type: 'Physical',
            city: 'Accra',
            country: 'Ghana',
            address: 'Accra International Conference Centre'
          },
          organizer: {
            name: 'AGS Network',
            email: 'events@agsnetwork.com'
          },
          capacity: 500,
          price: 0,
          currency: 'USD',
          tags: ['startup', 'ecosystem', 'networking'],
          isActive: true,
          isFeatured: true,
          status: 'Published'
        },
        {
          title: 'Tech Innovation Summit',
          description: 'Technology innovation and networking event',
          type: 'Conference',
          startDate: new Date('2024-11-20T09:00:00Z'),
          endDate: new Date('2024-11-22T18:00:00Z'),
          location: {
            type: 'Physical',
            city: 'Kumasi',
            country: 'Ghana',
            address: 'Kumasi Conference Centre'
          },
          organizer: {
            name: 'Tech Ghana',
            email: 'info@techghana.com'
          },
          capacity: 300,
          price: 50,
          currency: 'USD',
          tags: ['technology', 'innovation', 'networking'],
          isActive: true,
          isFeatured: true,
          status: 'Published'
        },
        {
          title: 'Investment Forum',
          description: 'Connect startups with investors',
          type: 'Networking',
          startDate: new Date('2024-10-30T14:00:00Z'),
          endDate: new Date('2024-10-30T18:00:00Z'),
          location: {
            type: 'Physical',
            city: 'Accra',
            country: 'Ghana',
            address: 'Ghana Investment Promotion Centre'
          },
          organizer: {
            name: 'Investment Ghana',
            email: 'forum@investmentghana.com'
          },
          capacity: 200,
          price: 25,
          currency: 'USD',
          tags: ['investment', 'startups', 'pitching'],
          isActive: true,
          isFeatured: false,
          status: 'Published'
        }
      ];
      
      await Event.insertMany(sampleEvents);
      logger.info('Sample events created successfully');
    } else {
      logger.info(` Found ${eventCount} existing events`);
    }

    logger.info(' Database initialization completed successfully');
    logger.info(' Ready to handle API requests');
    
  } catch (error) {
    logger.error(' Database initialization failed:', error);
    throw error;
  }
};

module.exports = { initDatabase }; 