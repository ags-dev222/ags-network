const { User } = require('../models/User');
const { Startup } = require('../models/Startup');
const { Investor } = require('../models/Investor');
const { Event } = require('../models/Event');
const { logger } = require('../utils/logger');

// @desc    Get dashboard analytics
// @route   GET /api/analytics/dashboard
// @access  Private
const getDashboardAnalytics = async (req, res) => {
  try {
    // Get total counts
    const totalUsers = await User.countDocuments({ isActive: true });
    const totalStartups = await Startup.countDocuments({ isActive: true });
    const totalInvestors = await Investor.countDocuments({ isActive: true });
    const totalEvents = await Event.countDocuments({ isActive: true });

    // Get recent activities
    const recentStartups = await Startup.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('userId', 'firstName lastName email');

    const recentEvents = await Event.find({ isActive: true })
      .sort({ startDate: 1 })
      .limit(5);

    // Get sector distribution
    const sectorDistribution = await Startup.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$sector', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    // Get stage distribution
    const stageDistribution = await Startup.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$stage', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: {
        overview: {
          totalUsers,
          totalStartups,
          totalInvestors,
          totalEvents
        },
        recentActivities: {
          startups: recentStartups,
          events: recentEvents
        },
        distributions: {
          sectors: sectorDistribution,
          stages: stageDistribution
        }
      }
    });
  } catch (error) {
    logger.error('Dashboard analytics error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get dashboard analytics'
    });
  }
};



// @desc    Get financial insights
// @route   GET /api/analytics/financial
// @access  Private
const getFinancialInsights = async (req, res) => {
  try {
    // Get funding stage distribution
    const fundingStageDistribution = await Startup.aggregate([
      { $match: { isActive: true, fundingStage: { $exists: true, $ne: null } } },
      { $group: { _id: '$fundingStage', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Get total funding by sector
    const fundingBySector = await Startup.aggregate([
      { $match: { isActive: true, totalFunding: { $exists: true, $gt: 0 } } },
      { $group: { _id: '$sector', totalFunding: { $sum: '$totalFunding' }, count: { $sum: 1 } } },
      { $sort: { totalFunding: -1 } },
      { $limit: 10 }
    ]);

    // Get average funding by stage
    const avgFundingByStage = await Startup.aggregate([
      { $match: { isActive: true, totalFunding: { $exists: true, $gt: 0 } } },
      { $group: { _id: '$stage', avgFunding: { $avg: '$totalFunding' }, count: { $sum: 1 } } },
      { $sort: { avgFunding: -1 } }
    ]);

    // Get investor type distribution
    const investorTypeDistribution = await Investor.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$type', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: {
        fundingStageDistribution,
        fundingBySector,
        avgFundingByStage,
        investorTypeDistribution
      }
    });
  } catch (error) {
    logger.error('Financial insights error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get financial insights'
    });
  }
};



// @desc    Get membership analytics
// @route   GET /api/analytics/membership
// @access  Private
const getMembershipAnalytics = async (req, res) => {
  try {
    // Get user role distribution
    const userRoleDistribution = await User.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$role', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Get user registration trend (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const registrationTrend = await User.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Get verified vs unverified users
    const verificationStatus = await User.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$emailVerified', count: { $sum: 1 } } }
    ]);

    // Get location distribution
    const locationDistribution = await Startup.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$location.country', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.json({
      success: true,
      data: {
        userRoleDistribution,
        registrationTrend,
        verificationStatus,
        locationDistribution
      }
    });
  } catch (error) {
    logger.error('Membership analytics error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get membership analytics'
    });
  }
};



// @desc    Get startup performance metrics
// @route   GET /api/analytics/startup-performance
// @access  Private
const getStartupPerformance = async (req, res) => {
  try {
    // Get startups by team size
    const teamSizeDistribution = await Startup.aggregate([
      { $match: { isActive: true, teamSize: { $exists: true, $gt: 0 } } },
      {
        $bucket: {
          groupBy: '$teamSize',
          boundaries: [1, 5, 10, 25, 50, 100, 1000],
          default: '100+',
          output: { count: { $sum: 1 } }
        }
      }
    ]);

    // Get revenue distribution
    const revenueDistribution = await Startup.aggregate([
      { $match: { isActive: true, revenue: { $exists: true, $gt: 0 } } },
      {
        $bucket: {
          groupBy: '$revenue',
          boundaries: [0, 10000, 50000, 100000, 500000, 1000000, 10000000],
          default: '10M+',
          output: { count: { $sum: 1 } }
        }
      }
    ]);

    // Get average metrics by sector
    const avgMetricsBySector = await Startup.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$sector',
          avgTeamSize: { $avg: '$teamSize' },
          avgRevenue: { $avg: '$revenue' },
          avgFunding: { $avg: '$totalFunding' },
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: {
        teamSizeDistribution,
        revenueDistribution,
        avgMetricsBySector
      }
    });
  } catch (error) {
    logger.error('Startup performance error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get startup performance metrics'
    });
  }
};

module.exports = {
  getDashboardAnalytics,
  getFinancialInsights,
  getMembershipAnalytics,
  getStartupPerformance
}; 