const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { authenticateToken } = require('../middleware/auth');

// Protected routes (require authentication)
router.get('/dashboard', authenticateToken, analyticsController.getDashboardAnalytics);
router.get('/financial', authenticateToken, analyticsController.getFinancialInsights);
router.get('/membership', authenticateToken, analyticsController.getMembershipAnalytics);
router.get('/startup-performance', authenticateToken, analyticsController.getStartupPerformance);

module.exports = router; 