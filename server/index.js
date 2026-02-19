require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./config/database');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests from localhost (development) and Vercel (production)
    if (!origin || 
        origin.startsWith('http://localhost:') || 
        origin.startsWith('http://127.0.0.1:') ||
        origin.includes('vercel.app') ||
        origin.includes('railway.app')) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize Database Tables
const initializeDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✓ Connected to MySQL database');

    try {
      // Create users table if it doesn't exist
      const createTableSQL = `
        CREATE TABLE IF NOT EXISTS users (
          userId VARCHAR(50) PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          password VARCHAR(255) NOT NULL,
          email VARCHAR(100) NOT NULL UNIQUE,
          phone VARCHAR(20) NOT NULL,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `;

      await connection.query(createTableSQL);
      console.log('✓ Users table created/verified successfully');

      // Create indexes for better performance (handle if it already exists)
      try {
        await connection.query('CREATE INDEX idx_email ON users(email)');
        console.log('✓ Database indexes created');
      } catch (indexError) {
        // Index might already exist, which is fine
        if (indexError.code !== 'ER_DUP_KEY_NAME') {
          console.log('✓ Database indexes verified');
        }
      }

    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Database initialization error:', error);
    process.exit(1);
  }
};

// Test database connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    const result = await connection.query('SELECT 1');
    connection.release();
    console.log('✓ Database connection test successful');
    return true;
  } catch (error) {
    console.error('✗ Database connection test failed:', error.message);
    return false;
  }
};

// Routes
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error',
    error: err.message 
  });
});

// Start server
const startServer = async () => {
  try {
    console.log('🚀 Initializing server...');
    
    // Test connection first
    const isConnected = await testConnection();
    if (!isConnected) {
      throw new Error('Cannot connect to database');
    }

    // Initialize database tables
    await initializeDatabase();

    app.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════╗
║  🎬 MovieMaster Auth Server            ║
║  Server running on port ${PORT}          ║
║  Database: Connected ✓                 ║
║  CORS enabled for localhost:3000       ║
╚════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();

module.exports = app;
