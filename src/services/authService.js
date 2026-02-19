import axios from 'axios';

// Use environment variable for production Vercel/Railway, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/auth';

// Simple localStorage-based user database
const getStoredUsers = () => {
  const stored = localStorage.getItem('allUsers');
  return stored ? JSON.parse(stored) : {};
};

const saveUsers = (users) => {
  localStorage.setItem('allUsers', JSON.stringify(users));
};

// Initialize with some demo users
const initializeDemoUsers = () => {
  const users = getStoredUsers();
  if (Object.keys(users).length === 0) {
    users['demo@example.com'] = {
      userId: 'demo',
      name: 'Demo User',
      email: 'demo@example.com',
      password: 'password123'
    };
    users['test@test.com'] = {
      userId: 'test',
      name: 'Test User',
      email: 'test@test.com',
      password: 'test123'
    };
    saveUsers(users);
  }
};

initializeDemoUsers();

const authService = {
  // Register new user
  register: async (userData) => {
    try {
      const { userId, name, email, password, phone } = userData;
      
      // Validation
      if (!userId || !name || !email || !password) {
        return { success: false, message: 'All fields are required' };
      }
      
      const users = getStoredUsers();
      
      // Check if email exists
      if (users[email]) {
        return { success: false, message: 'Email already registered' };
      }
      
      // Check if userId exists
      const userExists = Object.values(users).some(u => u.userId === userId);
      if (userExists) {
        return { success: false, message: 'User ID already taken' };
      }
      
      // Create new user
      const newUser = { userId, name, email, password, phone };
      users[email] = newUser;
      saveUsers(users);
      
      // Auto login
      const storeUser = { userId, name, email };
      localStorage.setItem('user', JSON.stringify(storeUser));
      localStorage.setItem('isAuthenticated', 'true');
      
      return { success: true, message: 'Registration successful!', user: storeUser };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Registration failed: ' + error.message };
    }
  },

  // Login user
  login: async (userId, password) => {
    try {
      const users = getStoredUsers();
      
      // Find user by userId or email
      const user = Object.values(users).find(u => 
        (u.userId === userId || u.email === userId) && u.password === password
      );
      
      if (user) {
        const userData = { userId: user.userId, name: user.name, email: user.email };
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isAuthenticated', 'true');
        return { success: true, user: userData, message: 'Login successful!' };
      }
      
      return { success: false, message: 'Invalid credentials' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Login failed: ' + error.message };
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return localStorage.getItem('isAuthenticated') === 'true';
  },

  // Update user profile
  updateProfile: async (userId, userData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/profile/${userId}`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

export default authService;
