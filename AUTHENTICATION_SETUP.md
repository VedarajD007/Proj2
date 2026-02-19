# 🎬 Netflix Clone - Authentication & Streaming System Setup

## ✅ Status: Registration & Login System Complete ✅

We've successfully implemented a **Glass Morphism** Registration & Login system with:

### **Frontend Features**
- ✨ Beautiful glass morphism UI for Login & Registration
- 🔐 Secure password handling with validation
- 💾 User session management with localStorage
- 🎨 Animated backgrounds with gradient effects
- 📱 Fully responsive design
- 👤 User profile menu with logout functionality

### **Backend Features**
- 🔒 MySQL database connection to Aiven
- 📝 User registration with duplicate checking
- 🔑 Secure login with password hashing (bcryptjs)
- ✔️ Automatic database table creation
- 🛡️ CORS enabled for frontend communication

---

## 📋 Setup Instructions

### **Step 1: Install Backend Dependencies**

```bash
cd server
npm install
```

**Dependencies installed:**
- `express` - Web framework
- `cors` - Cross-Origin Resource Sharing
- `body-parser` - Request body parsing
- `mysql2` - MySQL database client
- `bcryptjs` - Password hashing
- `dotenv` - Environment variables

### **Step 2: Database Setup (Aiven MySQL)**

**Database Connection Details:**
See `server/.env.example` for required environment variables

- **Host:** Add your Aiven host to `server/.env`
- **Port:** `23889`
- **User:** Add your Aiven user to `server/.env`
- **Password:** Add your Aiven password to `server/.env`
- **Database:** `defaultdb`
- **SSL Mode:** REQUIRED

**Note:** Never commit actual credentials to GitHub. Use a `.env` file and add it to `.gitignore`

**Database Table (Auto-created on server start):**
```sql
CREATE TABLE users (
  userId VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### **Step 3: Start the Backend Server**

```bash
cd server
npm start
```

**Expected Output:**
```
✓ Database connection test successful
✓ Connected to MySQL database
✓ Users table created/verified successfully
✓ Database indexes created

╔════════════════════════════════════════╗
║  🎬 Netflix Clone Auth Server          ║
║  Server running on port 5000           ║
║  Database: Connected ✓                 ║
║  CORS enabled for localhost:3000       ║
╚════════════════════════════════════════╝
```

### **Step 4: Start the Frontend Development Server**

**In a new terminal:**
```bash
cd Project2
npm install
npm run dev
```

The app will run on `http://localhost:3000`

---

## 🎨 Glass Morphism Design Features

### **Login Page Design**
- 🌌 Animated gradient background
- 💫 Floating orb animations
- 🔵 Glassmorphic card with blur effects
- ✨ Gradient text for titles
- 🎯 Smooth focus animations on inputs
- 🔴 Gradient button with hover effects

### **Registration Page Design**
- 📝 Similar glass morphism styling
- ✅ Form validation with error messages
- 🎭 Success notifications
- 📱 Mobile responsive

---

## 📲 API Endpoints

### **Registration**
```
POST /api/auth/register
Content-Type: application/json

{
  "userId": "kodom01",
  "name": "Omkar",
  "email": "om@kod.com",
  "password": "password123",
  "phone": "8095008123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "userId": "kodom01"
}
```

### **Login**
```
POST /api/auth/login
Content-Type: application/json

{
  "userId": "kodom01",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "userId": "kodom01",
    "name": "Omkar",
    "email": "om@kod.com",
    "phone": "8095008123"
  }
}
```

---

## 🔐 Security Features

1. **Password Hashing:** Bcryptjs with salt rounds = 10
2. **Password Validation:** Minimum 6 characters required
3. **Email Validation:** Unique email addresses in database
4. **SQL Injection Prevention:** Using prepared statements
5. **CORS Security:** Only allows requests from localhost:3000
6. **SSL Connection:** Required for database communication

---

## 📁 Project Structure

```
Project2/
├── src/
│   ├── components/
│   │   ├── Login.jsx          ← Login page
│   │   ├── Login.css          ← Glass morphism styles
│   │   ├── Register.jsx       ← Registration page
│   │   ├── Register.css       ← Registration styles
│   │   └── Header.jsx         ← Updated with user profile
│   ├── services/
│   │   ├── authService.js     ← Authentication API service
│   │   └── tmdbService.js
│   └── App.jsx                ← Updated with auth logic
│
└── server/
    ├── config/
    │   └── database.js        ← Aiven MySQL connection
    ├── controllers/
    │   └── authController.js  ← Auth logic
    ├── routes/
    │   └── auth.js            ← API routes
    ├── middleware/
    │   └── cors.js
    └── index.js               ← Express server
```

---

## ✨ Features Implemented

### **Registration**
- ✅ User ID validation
- ✅ Full name input
- ✅ Email validation & uniqueness check
- ✅ Password hashing before storage
- ✅ Phone number collection
- ✅ Error messages for duplicate accounts
- ✅ Success redirect to login

### **Login**
- ✅ User ID & password verification
- ✅ Secure password comparison
- ✅ Remember me functionality
- ✅ User session management
- ✅ Profile dropdown menu
- ✅ Logout functionality

### **User Experience**
- ✅ Glass morphism design
- ✅ Smooth animations
- ✅ Error notifications
- ✅ Loading states
- ✅ Mobile responsive
- ✅ Session persistence

---

## 🚀 Next Steps

1. **Test Registration:** Create a new account
2. **Test Login:** Sign in with your credentials
3. **Explore Movies:** Browse Netflix-like catalog
4. **User Profile:** View user info and logout

---

## 🐛 Troubleshooting

### **Database Connection Error**
- Check internet connection
- Verify Aiven MySQL credentials
- Ensure SSL mode is REQUIRED
- Check firewall settings

### **CORS Error**
- Make sure backend is running on port 5000
- Frontend should be running on port 3000
- Check CORS configuration in server/index.js

### **Password Hashing Error**
- Install bcryptjs: `npm install bcryptjs`
- Make sure to use `await` when calling bcrypt functions

---

## 📞 Support

For issues or questions:
1. Check the console for error messages
2. Verify all dependencies are installed
3. Ensure database connection details are correct
4. Check that both servers (frontend & backend) are running

---

**Created:** February 2026
**Status:** ✅ Complete and Ready for Use
