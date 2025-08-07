const express = require('express');
const router = express.Router();
const investorController = require('../controllers/investorController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const { validateInvestor, validateSearch, handleValidationErrors } = require('../middleware/validation');

// Public routes (for viewing)
router.get('/', investorController.getAllInvestors);
router.get('/search', validateSearch, handleValidationErrors, investorController.searchInvestors);
router.get('/:id', investorController.getInvestorById);

// Protected routes
router.get('/my-profile', authenticateToken, investorController.getMyInvestorProfile);
router.post('/', authenticateToken, authorizeRoles('investor', 'admin'), validateInvestor, handleValidationErrors, investorController.createInvestor);
router.put('/:id', authenticateToken, authorizeRoles('investor', 'admin'), validateInvestor, handleValidationErrors, investorController.updateInvestor);
router.delete('/:id', authenticateToken, authorizeRoles('investor', 'admin'), investorController.deleteInvestor);

module.exports = router; 