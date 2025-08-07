const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const https = require('https');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const { logger } = require('./utils/logger');
const { initDatabase } = require('./config/initDatabase');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/auth');
const startupRoutes = require('./routes/startups');
const investorRoutes = require('./routes/investors');
const membershipRoutes = require('./routes/membership');
const analyticsRoutes = require('./routes/analytics');
const eventRoutes = require('./routes/events');

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    database: 'Connected',
    protocol: req.protocol
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/startups', startupRoutes);
app.use('/api/investors', investorRoutes);
app.use('/api/membership', membershipRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/events', eventRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl
  });
});
 
// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const HTTPS_PORT = process.env.HTTPS_PORT || 5001;

// Initialize database and start server
const startServer = async () => {
  try {
    logger.info('🔄 Initializing database connection...');
    await initDatabase();
    logger.info('✅ MongoDB connected successfully!');
    
    // Check if SSL certificates exist for HTTPS
    const sslKeyPath = process.env.SSL_KEY_PATH || path.join(__dirname, '../ssl/key.pem');
    const sslCertPath = process.env.SSL_CERT_PATH || path.join(__dirname, '../ssl/cert.pem');
    
    const hasSSLCerts = fs.existsSync(sslKeyPath) && fs.existsSync(sslCertPath);
    
    if (hasSSLCerts) {
      // Start HTTPS server
      const httpsOptions = {
        key: fs.readFileSync(sslKeyPath),
        cert: fs.readFileSync(sslCertPath)
      };
      
      https.createServer(httpsOptions, app).listen(HTTPS_PORT, () => {
        logger.info(`🚀 HTTPS Server running on port ${HTTPS_PORT} in ${process.env.NODE_ENV} mode`);
        logger.info(`🔗 HTTPS URL: https://localhost:${HTTPS_PORT}`);
        logger.info(`📊 Health check: https://localhost:${HTTPS_PORT}/health`);
        logger.info(`🔐 API Base URL: https://localhost:${HTTPS_PORT}/api`);
      });
    }
    
    // Start HTTP server (always available)
    app.listen(PORT, () => {
      logger.info(`🚀 HTTP Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
      logger.info(`🔗 HTTP URL: http://localhost:${PORT}`);
      logger.info(`📊 Health check: http://localhost:${PORT}/health`);
      logger.info(`🔐 API Base URL: http://localhost:${PORT}/api`);
      
      if (!hasSSLCerts) {
        logger.info(`💡 To enable HTTPS, add SSL certificates to the ssl/ directory`);
        logger.info(`   or set SSL_KEY_PATH and SSL_CERT_PATH environment variables`);
      }
    });
    
    logger.info('🎉 Server startup completed successfully!');
    
  } catch (error) {
    logger.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app; 