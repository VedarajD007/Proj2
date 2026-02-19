import axios from 'axios';

// Use environment variable for production Vercel/Railway, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/auth';

// Mock database for standalone deployment (when backend not available)
const mockUsers = {
  'demo@example.com': {
    userId: 'demo',
    name: 'Demo User',
    email: 'demo@example.com',
    password: 'password123'
  },
  'test@test.com': {
    userId: 'test',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test123'
  }
};

const authService = {
  // Register new user
  register: async (userData) => {
    try {
      // Try real backend first
      const response = await axios.post(`${API_BASE_URL}/register`, userData, { timeout: 2000 });
      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('isAuthenticated', 'true');
      }
      return response.data;
    } catch (error) {
      // Fallback to mock registration
      console.log('Backend unavailable, using mock registration');
      const { userId, name, email, password, phone } = userData;
      if (!userId || !name || !email || !password) {
        return { success: false, message: 'All fields are required' };
      }
      if (mockUsers[email]) {
        return { success: false, message: 'Email already registered' };
      }
      const newUser = { userId, name, email, password, phone };
      mockUsers[email] = newUser;
      
      // Store user info in localStorage
      const storeUser = { userId, name, email };
      localStorage.setItem('user', JSON.stringify(storeUser));
      localStorage.setItem('isAuthenticated', 'true');
      
      return { success: true, message: 'Registration successful', user: storeUser };
    }
  },

  // Login user
  login: async (userId, password) => {
    try {
      // Try real backend first
      const response = await axios.post(`${API_BASE_URL}/login`, {
        userId,
        password
      }, { timeout: 2000 });
      
      if (response.data.success) {
        // Store user info
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('isAuthenticated', 'true');
      }
      
      return response.data;
    } catch (error) {
      // Fallback to mock login
      console.log('Backend unavailable, using mock login');
      const user = Object.values(mockUsers).find(u => 
        (u.userId === userId || u.email === userId) && u.password === password
      );
      
      if (user) {
        const userData = { userId: user.userId, name: user.name, email: user.email };
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isAuthenticated', 'true');
        return { success: true, user: userData, message: 'Login successful' };
      }
      
      return { success: false, message: 'Invalid credentials' };
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
