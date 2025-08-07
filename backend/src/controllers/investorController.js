const { Investor } = require('../models/Investor');
const { User } = require('../models/User');
const { logger } = require('../utils/logger');

// @desc    Get all investors
// @route   GET /api/investors
// @access  Public
const getAllInvestors = async (req, res) => {
  try {
    const { page = 1, limit = 10, type, location, investmentFocus, investmentStages, search } = req.query;
    
    const query = { isActive: true };
    
    // Add filters
    if (type) query.type = type;
    if (location) {
      query.$or = [
        { 'location.country': { $regex: location, $options: 'i' } },
        { 'location.city': { $regex: location, $options: 'i' } }
      ];
    }
    if (investmentFocus) query.investmentFocus = { $in: [investmentFocus] };
    if (investmentStages) query.investmentStages = { $in: [investmentStages] };
    
    // Add text search
    if (search) {
      query.$text = { $search: search };
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const investors = await Investor.find(query)
      .populate('userId', 'firstName lastName email avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Investor.countDocuments(query);
    
    res.json({
      success: true,
      data: {
        investors,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });
  } catch (error) {
    logger.error('Get all investors error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get investors'
    });
  }
};

// @desc    Get investor by ID
// @route   GET /api/investors/:id
// @access  Public
const getInvestorById = async (req, res) => {
  try {
    const investor = await Investor.findById(req.params.id)
      .populate('userId', 'firstName lastName email avatar');
    
    if (!investor) {
      return res.status(404).json({
        success: false,
        error: 'Investor not found'
      });
    }
    
    res.json({
      success: true,
      data: { investor }
    });
  } catch (error) {
    logger.error('Get investor by ID error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get investor'
    });
  }
};

// @desc    Create investor
// @route   POST /api/investors
// @access  Private
const createInvestor = async (req, res) => {
  try {
    const investorData = {
      ...req.body,
      userId: req.user._id
    };
    
    const investor = new Investor(investorData);
    await investor.save();
    
    await investor.populate('userId', 'firstName lastName email avatar');
    
    res.status(201).json({
      success: true,
      message: 'Investor profile created successfully',
      data: { investor }
    });
  } catch (error) {
    logger.error('Create investor error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create investor profile'
    });
  }
};

// @desc    Update investor
// @route   PUT /api/investors/:id
// @access  Private
const updateInvestor = async (req, res) => {
  try {
    const investor = await Investor.findById(req.params.id);
    
    if (!investor) {
      return res.status(404).json({
        success: false,
        error: 'Investor not found'
      });
    }
    
    // Check ownership
    if (investor.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this investor profile'
      });
    }
    
    Object.assign(investor, req.body);
    await investor.save();
    
    await investor.populate('userId', 'firstName lastName email avatar');
    
    res.json({
      success: true,
      message: 'Investor profile updated successfully',
      data: { investor }
    });
  } catch (error) {
    logger.error('Update investor error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update investor profile'
    });
  }
};

// @desc    Delete investor
// @route   DELETE /api/investors/:id
// @access  Private
const deleteInvestor = async (req, res) => {
  try {
    const investor = await Investor.findById(req.params.id);
    
    if (!investor) {
      return res.status(404).json({
        success: false,
        error: 'Investor not found'
      });
    }
    
    // Check ownership
    if (investor.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this investor profile'
      });
    }
    
    await Investor.deleteOne({ _id: req.params.id });
    
    res.json({
      success: true,
      message: 'Investor profile deleted successfully'
    });
  } catch (error) {
    logger.error('Delete investor error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete investor profile'
    });
  }
};

// @desc    Get user's investor profile
// @route   GET /api/investors/my-profile
// @access  Private
const getMyInvestorProfile = async (req, res) => {
  try {
    const investor = await Investor.findOne({ userId: req.user._id })
      .populate('userId', 'firstName lastName email avatar');
    
    if (!investor) {
      return res.status(404).json({
        success: false,
        error: 'No investor profile found for this user'
      });
    }
    
    res.json({
      success: true,
      data: { investor }
    });
  } catch (error) {
    logger.error('Get my investor profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get investor profile'
    });
  }
};

// @desc    Search investors
// @route   GET /api/investors/search
// @access  Public
const searchInvestors = async (req, res) => {
  try {
    const { q, type, location, investmentFocus, investmentStages, page = 1, limit = 10 } = req.query;
    
    const query = { isActive: true };
    
    // Text search
    if (q) {
      query.$text = { $search: q };
    }
    
    // Filters
    if (type) query.type = type;
    if (location) {
      query.$or = [
        { 'location.country': { $regex: location, $options: 'i' } },
        { 'location.city': { $regex: location, $options: 'i' } }
      ];
    }
    if (investmentFocus) query.investmentFocus = { $in: [investmentFocus] };
    if (investmentStages) query.investmentStages = { $in: [investmentStages] };
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const investors = await Investor.find(query)
      .populate('userId', 'firstName lastName email avatar')
      .sort(q ? { score: { $meta: 'textScore' } } : { createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Investor.countDocuments(query);
    
    res.json({
      success: true,
      data: {
        investors,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });
  } catch (error) {
    logger.error('Search investors error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search investors'
    });
  }
};

module.exports = {
  getAllInvestors,
  getInvestorById,
  createInvestor,
  updateInvestor,
  deleteInvestor,
  getMyInvestorProfile,
  searchInvestors
}; 