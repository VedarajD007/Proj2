const bcrypt = require('bcryptjs');
const pool = require('../config/database');

// User Registration
const register = async (req, res) => {
  try {
    const { userId, name, password, email, phone } = req.body;

    // Validation
    if (!userId || !name || !password || !email || !phone) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    const connection = await pool.getConnection();

    try {
      // Check if user already exists
      const [existingUser] = await connection.query(
        'SELECT userId FROM users WHERE userId = ? OR email = ?',
        [userId, email]
      );

      if (existingUser.length > 0) {
        return res.status(409).json({ 
          success: false, 
          message: 'User ID or Email already exists' 
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user
      const [result] = await connection.query(
        'INSERT INTO users (userId, name, password, email, phone) VALUES (?, ?, ?, ?, ?)',
        [userId, name, hashedPassword, email, phone]
      );

      res.status(201).json({ 
        success: true, 
        message: 'User registered successfully',
        userId: userId
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Registration failed',
      error: error.message 
    });
  }
};

// User Login
const login = async (req, res) => {
  try {
    const { userId, password } = req.body;

    // Validation
    if (!userId || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'User ID and password are required' 
      });
    }

    const connection = await pool.getConnection();

    try {
      // Find user
      const [users] = await connection.query(
        'SELECT * FROM users WHERE userId = ?',
        [userId]
      );

      if (users.length === 0) {
        return res.status(401).json({ 
          success: false, 
          message: 'Invalid User ID or password' 
        });
      }

      const user = users[0];

      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ 
          success: false, 
          message: 'Invalid User ID or password' 
        });
      }

      // Successful login
      res.status(200).json({ 
        success: true, 
        message: 'Login successful',
        user: {
          userId: user.userId,
          name: user.name,
          email: user.email,
          phone: user.phone
        }
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Login failed',
      error: error.message 
    });
  }
};

module.exports = {
  register,
  login
};
