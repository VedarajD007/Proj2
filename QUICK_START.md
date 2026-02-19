# 🚀 Quick Start Guide - Netflix Clone with Authentication

## What's New? ✨

Your Netflix Clone now includes a complete **registration and login system** with:
- 🎨 Beautiful glass morphism design
- 🔐 Secure authentication with hashed passwords
- 💾 MySQL database (Aiven)
- ✅ Automatic database table creation
- 👤 User profile management

---

## 🎯 Quick Start (3 Easy Steps)

### **Option 1: Automatic Start (Windows)**
```bash
double-click start-dev.bat
```

### **Option 2: Automatic Start (Mac/Linux)**
```bash
chmod +x start-dev.sh
./start-dev.sh
```

### **Option 3: Manual Start**

**Terminal 1 - Backend Server:**
```bash
cd server
npm install
npm start
```

**Terminal 2 - Frontend Development Server:**
```bash
npm install
npm run dev
```

---

## ✅ Verification Checklist

After starting both servers, you should see:

### **Backend Console:**
```
✓ Connected to MySQL database
✓ Users table created/verified successfully
✓ Database indexes created

🎬 Netflix Clone Auth Server
Server running on port 5000
Database: Connected ✓
CORS enabled for localhost:3000
```

### **Frontend Console:**
```
VITE v5.x.x ready in xxx ms

➜  Local:   http://localhost:3000/
➜  press h to show help
```

---

## 🎮 Testing the App

### **1. Create an Account**
- Go to `http://localhost:3000`
- Click "Create account"
- Fill in the registration form:
  - **User ID:** kodom01
  - **Full Name:** Omkar
  - **Email:** om@kod.com
  - **Password:** omkar123 (min 6 chars)
  - **Phone:** 8095008123

### **2. Login**
- Click "Sign In"
- Enter your credentials
- Check "Remember me" to save username
- Click "Sign In"

### **3. Browse Movies**
- See trending, popular, and top-rated movies
- Search for movies
- Click on movie cards to see details

### **4. Logout**
- Click your profile initial in top-right corner
- Click "Sign Out"

---

## 📱 Browser Support

- ✅ Chrome/Chromium (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🔧 Configuration Files

### **Frontend Config**
- **Port:** 3000 (configurable in `vite.config.js`)
- **Backend URL:** `http://localhost:5000`

### **Backend Config**
- **Port:** 5000
- **Database:** Aiven MySQL
- **CORS:** Enabled for `http://localhost:3000`

---

## 📊 Database Info

**Connection Status:** ✅ Ready

```
Host:     YOUR_AIVEN_HOST (add to server/.env)
Port:     23889
Database: defaultdb
User:     YOUR_DB_USER (add to server/.env)
SSL:      REQUIRED
```

**Table:** `users` (auto-created)
- **Columns:** userId, name, password (hashed), email, phone, timestamps

---

## 🎨 Features Overview

### **Login Page**
- 🌈 Animated gradient background
- 💫 Glass morphism card design
- 🔒 Secure password field
- 💾 Remember me checkbox
- 🔗 Link to registration page

### **Registration Page**
- 📝 Multi-field form validation
- ✅ Real-time error messages
- 🎯 Success notifications
- 📱 Mobile responsive

### **Main App**
- 👤 User profile in header
- 🔍 Movie search functionality
- 🎬 Multiple movie carousels
- 🚪 Logout option

---

## 🐛 Troubleshooting

### **Backend Won't Start**
```
❌ Error: Cannot connect to database
```
**Solution:**
- Check internet connection
- Verify MySQL credentials in `server/config/database.js`
- Check firewall settings

### **CORS Error in Console**
```
❌ Access to XMLHttpRequest blocked by CORS
```
**Solution:**
- Make sure backend is running on port 5000
- Frontend should be on port 3000
- Check server/index.js CORS configuration

### **Port Already in Use**
```
❌ Error: Port 3000/5000 already in use
```
**Solution:**
- Find process using the port
- Kill the process or use a different port

### **Database Connection Timeout**
```
❌ Error: Connection timeout
```
**Solution:**
- Check network connection
- Verify database credentials
- Try restarting the server

---

## 📚 Important Files

| File | Purpose |
|------|---------|
| `src/components/Login.jsx` | Login page component |
| `src/components/Register.jsx` | Registration page component |
| `src/services/authService.js` | Authentication logic |
| `server/controllers/authController.js` | Backend auth logic |
| `server/config/database.js` | Database connection |
| `AUTHENTICATION_SETUP.md` | Detailed setup guide |

---

## 🔐 Security Notes

✅ **What's Secured:**
- Passwords hashed with bcryptjs (10 salt rounds)
- Email uniqueness enforced
- User ID uniqueness enforced
- SSL connection to database
- CORS verification

⚠️ **For Production:**
- Add JWT tokens
- Use environment variables for secrets
- Add rate limiting
- Implement refresh tokens
- Add email verification
- Add password reset functionality

---

## 🚀 Performance Tips

- 🔄 First load may take a few seconds (database initialization)
- 📦 All dependencies are cached after first installation
- 🎬 Movie data uses TMDB API (configure your API key for live data)
- 💾 User sessions stored in browser localStorage

---

## 📞 Need Help?

1. **Check Console Logs:** Browser DevTools (F12) → Console tab
2. **Check Server Logs:** Terminal where `npm start` is running
3. **Read Documentation:** See `AUTHENTICATION_SETUP.md`
4. **Verify Setup:** Run verification checklist above

---

## ✨ What's Next?

- [ ] Test registration flow
- [ ] Test login flow
- [ ] Configure TMDB API key for live movie data
- [ ] Explore movie features
- [ ] Deploy to production

---

**Version:** 1.0.0  
**Last Updated:** February 2026  
**Status:** ✅ Ready for Use

Happy Streaming! 🍿🎬

