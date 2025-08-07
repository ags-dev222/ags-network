const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors.array().map(error => ({
        field: error.path,
        message: error.msg,
        value: error.value
      }))
    });
  }
  next();
};

// User registration validation
const validateRegistration = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  body('userType')
    .isIn(['startup', 'investor', 'admin'])
    .withMessage('User type must be startup, investor, or admin'),
  body('companyName')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('Company name must be between 2 and 100 characters'),
  handleValidationErrors
];

// User login validation
const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

// Startup creation validation
const validateStartup = [
  body('name')
    .isLength({ min: 2, max: 255 })
    .withMessage('Startup name must be between 2 and 255 characters'),
  body('sector')
    .isIn(['Fin-Tech', 'Ed-Tech', 'Agri-Tech', 'Clean-Tech', 'Health-Tech', 'Prop-Tech', 'E-Commerce', 'Logistics', 'Marketing'])
    .withMessage('Please provide a valid sector'),
  body('stage')
    .isIn(['Idea', 'Prototype', 'Seed', 'Series A', 'Series B', 'Series C', 'Growth', 'Scale', 'Expansion'])
    .withMessage('Please provide a valid stage'),
  body('location')
    .isLength({ min: 2, max: 100 })
    .withMessage('Location must be between 2 and 100 characters'),
  handleValidationErrors
];

// Investor creation validation
const validateInvestor = [
  body('name')
    .isLength({ min: 2, max: 255 })
    .withMessage('Investor name must be between 2 and 255 characters'),
  body('type')
    .isIn(['Angel', 'Venture Capital', 'Corporate', 'Government'])
    .withMessage('Please provide a valid investor type'),
  body('location')
    .isLength({ min: 2, max: 100 })
    .withMessage('Location must be between 2 and 100 characters'),
  handleValidationErrors
];

// Search validation
const validateSearch = [
  body('companyName')
    .optional()
    .isLength({ min: 2, max: 255 })
    .withMessage('Company name must be between 2 and 255 characters'),
  body('amount')
    .optional()
    .matches(/^\$[\d,]+$/)
    .withMessage('Amount must be in format $XXX,XXX'),
  body('fundingRound')
    .optional()
    .isIn(['Seed', 'Series A', 'Series B', 'Series C', 'Growth', 'Scale'])
    .withMessage('Please provide a valid funding round'),
  body('investorType')
    .optional()
    .isIn(['Angel', 'Venture Capital', 'Corporate', 'Government'])
    .withMessage('Please provide a valid investor type'),
  handleValidationErrors
];

module.exports = {
  validateRegistration,
  validateLogin,
  validateStartup,
  validateInvestor,
  validateSearch,
  handleValidationErrors
}; 