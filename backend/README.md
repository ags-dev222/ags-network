# AGS Network Backend

A comprehensive backend API for the AGS Network Startup Ecosystem built with Node.js, Express, and MongoDB.

## 🚀 Features

- ✅ **MongoDB Integration** - NoSQL database with Mongoose ODM
- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Role-based Authorization** - User, Startup, Investor, Admin roles
- ✅ **Input Validation** - Request validation with express-validator
- ✅ **Rate Limiting** - API rate limiting for security
- ✅ **CORS Support** - Cross-origin resource sharing
- ✅ **HTTPS Support** - SSL/TLS encryption
- ✅ **Logging** - Comprehensive logging with Winston
- ✅ **Error Handling** - Centralized error handling
- ✅ **Health Checks** - Server health monitoring

## 📋 Prerequisites

- Node.js >= 18.18.0
- MongoDB (local or Atlas)
- OpenSSL (for HTTPS certificates)

## 🛠️ Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5000
HTTPS_PORT=5001
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/ags_network
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/ags_network

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Bcrypt Configuration
BCRYPT_ROUNDS=12

# SSL Configuration (optional - for HTTPS)
SSL_KEY_PATH=./ssl/key.pem
SSL_CERT_PATH=./ssl/cert.pem
```

### 3. MongoDB Setup

#### Option A: MongoDB Atlas (Recommended)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Get your connection string
4. Update `MONGODB_URI` in your `.env` file

#### Option B: Local MongoDB
1. Install MongoDB Community Server
2. Start MongoDB service
3. Use `mongodb://localhost:27017/ags_network` as your `MONGODB_URI`

### 4. HTTPS Setup (Optional)
To enable HTTPS for development:

```bash
# Generate self-signed SSL certificates
npm run generate-ssl
```

### 5. Start the Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## 📊 Server Information

Once started, you'll see detailed information about:

- **HTTP Server**: `http://localhost:5000`
- **HTTPS Server**: `https://localhost:5001` (if SSL certificates exist)
- **Health Check**: `http://localhost:5000/health`
- **API Base URL**: `http://localhost:5000/api`

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password

### Startups
- `GET /api/startups` - Get all startups
- `GET /api/startups/:id` - Get startup by ID
- `POST /api/startups` - Create startup
- `PUT /api/startups/:id` - Update startup
- `DELETE /api/startups/:id` - Delete startup
- `GET /api/startups/search` - Search startups

### Investors
- `GET /api/investors` - Get all investors
- `GET /api/investors/:id` - Get investor by ID
- `POST /api/investors` - Create investor profile
- `PUT /api/investors/:id` - Update investor profile
- `DELETE /api/investors/:id` - Delete investor profile
- `GET /api/investors/search` - Search investors

### Analytics
- `GET /api/analytics/dashboard` - Dashboard metrics
- `GET /api/analytics/financial` - Financial insights
- `GET /api/analytics/membership` - Membership analytics
- `GET /api/analytics/startup-performance` - Startup performance

## 🗄️ Database Schema

### User Model
- Basic user information (name, email, password)
- Role-based access control
- Email verification status
- Account activity tracking

### Startup Model
- Company information and description
- Sector and stage classification
- Location and contact details
- Funding and revenue data
- Social media links

### Investor Model
- Investor type and focus areas
- Investment criteria and stages
- Portfolio and deal size information
- Contact preferences

### Event Model
- Event details and scheduling
- Location and capacity management
- Registration and pricing
- Organizer information

## 🔧 Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run generate-ssl` - Generate self-signed SSL certificates

## 🛡️ Security Features

- **Helmet.js** - Security headers
- **Rate Limiting** - Prevent abuse
- **CORS** - Cross-origin protection
- **Input Validation** - Data sanitization
- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - Bcrypt encryption
- **HTTPS Support** - SSL/TLS encryption

## 📝 Logging

The application uses Winston for comprehensive logging:
- Error logs: `logs/error.log`
- Combined logs: `logs/combined.log`
- Console output in development

## 🔍 Health Check

Monitor server health at:
```
GET /health
```

Response includes:
- Server status
- Timestamp
- Environment
- Database connection status
- Protocol information

## 🚨 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check your connection string
- Verify network connectivity

### HTTPS Issues
- Run `npm run generate-ssl` to create certificates
- Check certificate paths in `.env`
- Ensure OpenSSL is installed

### Port Issues
- Change `PORT` and `HTTPS_PORT` in `.env`
- Ensure ports are not in use by other services

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions, please open an issue in the repository. 