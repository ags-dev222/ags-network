const express = require('express');
const router = express.Router();
const startupController = require('../controllers/startupController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const { validateStartup, handleValidationErrors } = require('../middleware/validation');

// Public routes (for viewing)
router.get('/', startupController.getAllStartups);
router.get('/search', startupController.searchStartups);
router.get('/:id', startupController.getStartupById);

// Protected routes (for startup owners and admins)
router.get('/my-startup', authenticateToken, startupController.getMyStartup);
router.post('/', authenticateToken, authorizeRoles('startup', 'admin'), validateStartup, handleValidationErrors, startupController.createStartup);
router.put('/:id', authenticateToken, authorizeRoles('startup', 'admin'), validateStartup, handleValidationErrors, startupController.updateStartup);
router.delete('/:id', authenticateToken, authorizeRoles('startup', 'admin'), startupController.deleteStartup);

module.exports = router; 