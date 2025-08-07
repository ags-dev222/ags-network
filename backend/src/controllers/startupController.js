const { Startup } = require('../models/Startup');
const { User } = require('../models/User');
const { logger } = require('../utils/logger');

// @desc    Get all startups
// @route   GET /api/startups
// @access  Public
const getAllStartups = async (req, res) => {
  try {
    const { page = 1, limit = 10, sector, stage, location, search } = req.query;
    
    const query = { isActive: true };
    
    // Add filters
    if (sector) query.sector = sector;
    if (stage) query.stage = stage;
    if (location) {
      query.$or = [
        { 'location.country': { $regex: location, $options: 'i' } },
        { 'location.city': { $regex: location, $options: 'i' } }
      ];
    }
    
    // Add text search
    if (search) {
      query.$text = { $search: search };
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const startups = await Startup.find(query)
      .populate('userId', 'firstName lastName email avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Startup.countDocuments(query);
    
    res.json({
      success: true,
      data: {
        startups,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });
  } catch (error) {
    logger.error('Get all startups error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get startups'
    });
  }
};

// @desc    Get startup by ID
// @route   GET /api/startups/:id
// @access  Public
const getStartupById = async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.id)
      .populate('userId', 'firstName lastName email avatar');
    
    if (!startup) {
      return res.status(404).json({
        success: false,
        error: 'Startup not found'
      });
    }
    
    res.json({
      success: true,
      data: { startup }
    });
  } catch (error) {
    logger.error('Get startup by ID error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get startup'
    });
  }
};

// @desc    Create startup
// @route   POST /api/startups
// @access  Private
const createStartup = async (req, res) => {
  try {
    const startupData = {
      ...req.body,
      userId: req.user._id
    };
    
    const startup = new Startup(startupData);
    await startup.save();
    
    await startup.populate('userId', 'firstName lastName email avatar');
    
    res.status(201).json({
      success: true,
      message: 'Startup created successfully',
      data: { startup }
    });
  } catch (error) {
    logger.error('Create startup error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create startup'
    });
  }
};

// @desc    Update startup
// @route   PUT /api/startups/:id
// @access  Private
const updateStartup = async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.id);
    
    if (!startup) {
      return res.status(404).json({
        success: false,
        error: 'Startup not found'
      });
    }
    
    // Check ownership
    if (startup.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this startup'
      });
    }
    
    Object.assign(startup, req.body);
    await startup.save();
    
    await startup.populate('userId', 'firstName lastName email avatar');
    
    res.json({
      success: true,
      message: 'Startup updated successfully',
      data: { startup }
    });
  } catch (error) {
    logger.error('Update startup error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update startup'
    });
  }
};

// @desc    Delete startup
// @route   DELETE /api/startups/:id
// @access  Private
const deleteStartup = async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.id);
    
    if (!startup) {
      return res.status(404).json({
        success: false,
        error: 'Startup not found'
      });
    }
    
    // Check ownership
    if (startup.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this startup'
      });
    }
    
    await Startup.deleteOne({ _id: req.params.id });
    
    res.json({
      success: true,
      message: 'Startup deleted successfully'
    });
  } catch (error) {
    logger.error('Delete startup error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete startup'
    });
  }
};

// @desc    Get user's startup
// @route   GET /api/startups/my-startup
// @access  Private
const getMyStartup = async (req, res) => {
  try {
    const startup = await Startup.findOne({ userId: req.user._id })
      .populate('userId', 'firstName lastName email avatar');
    
    if (!startup) {
      return res.status(404).json({
        success: false,
        error: 'No startup found for this user'
      });
    }
    
    res.json({
      success: true,
      data: { startup }
    });
  } catch (error) {
    logger.error('Get my startup error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get startup'
    });
  }
};

// @desc    Search startups
// @route   GET /api/startups/search
// @access  Public
const searchStartups = async (req, res) => {
  try {
    const { q, sector, stage, location, page = 1, limit = 10 } = req.query;
    
    const query = { isActive: true };
    
    // Text search
    if (q) {
      query.$text = { $search: q };
    }
    
    // Filters
    if (sector) query.sector = sector;
    if (stage) query.stage = stage;
    if (location) {
      query.$or = [
        { 'location.country': { $regex: location, $options: 'i' } },
        { 'location.city': { $regex: location, $options: 'i' } }
      ];
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const startups = await Startup.find(query)
      .populate('userId', 'firstName lastName email avatar')
      .sort(q ? { score: { $meta: 'textScore' } } : { createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Startup.countDocuments(query);
    
    res.json({
      success: true,
      data: {
        startups,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });
  } catch (error) {
    logger.error('Search startups error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search startups'
    });
  }
};

module.exports = {
  getAllStartups,
  getStartupById,
  createStartup,
  updateStartup,
  deleteStartup,
  getMyStartup,
  searchStartups
}; 