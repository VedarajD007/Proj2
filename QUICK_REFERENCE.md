# 📍 Quick Reference - URLs & Credentials

## 🎬 Application URLs

| Service | URL | Status |
|---------|-----|--------|
| **Frontend** | http://localhost:3000 | ✅ Ready |
| **Backend API** | http://localhost:5000 | ✅ Ready |
| **Health Check** | http://localhost:5000/api/health | ✅ Ready |
| **API Docs** | See AUTHENTICATION_SETUP.md | 📖 Available |

---

## 🗄️ Database Connection

```
Service:           Aiven MySQL
Host:              YOUR_AIVEN_HOST (set in server/.env)
Port:              23889
Username:          YOUR_DB_USER (set in server/.env)
Password:          YOUR_DB_PASSWORD (set in server/.env)
Database:          defaultdb
SSL Mode:          REQUIRED ⚠️ MUST USE
Connection Type:   mysql2 (Node.js driver)
```

### **Connection String (for reference)**
```
mysql://YOUR_USER:YOUR_PASSWORD@YOUR_HOST:23889/defaultdb?ssl-mode=REQUIRED
```

---

## 📦 Dependencies

### **Frontend (npm packages)**
```
✅ react@18.2.0
✅ react-dom@18.2.0
✅ vite@5.0.8
✅ axios@1.6.5
✅ react-icons@4.12.0
```

### **Backend (npm packages)**
```
✅ express@4.18.2
✅ cors@2.8.5
✅ body-parser@1.20.2
✅ mysql2@3.6.5
✅ bcryptjs@2.4.3
✅ dotenv@16.3.1
```

---

## 🚀 Startup Commands

### **Option 1: Automatic (Windows)**
```batch
start-dev.bat
```

### **Option 2: Automatic (Mac/Linux)**
```bash
chmod +x start-dev.sh
./start-dev.sh
```

### **Option 3: Manual Backend**
```bash
cd server
npm install
npm start
```

### **Option 4: Manual Frontend**
```bash
npm install
npm run dev
```

---

## 📁 Important File Locations

| Purpose | Path |
|---------|------|
| **Backend Entry** | `server/index.js` |
| **Database Config** | `server/config/database.js` |
| **Auth Controller** | `server/controllers/authController.js` |
| **Login Component** | `src/components/Login.jsx` |
| **Register Component** | `src/components/Register.jsx` |
| **Auth Service** | `src/services/authService.js` |
| **Main App** | `src/App.jsx` |
| **Setup Guide** | `AUTHENTICATION_SETUP.md` |

---

## 🔐 Test Credentials (After Registration)

```
First Account (to create):
- User ID: kodom01
- Name: Omkar
- Email: om@kod.com
- Password: omkar123
- Phone: 8095008123
```

---

## 🔑 API Endpoints

### **Register User**
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "userId": "username",
  "name": "Full Name",
  "email": "user@example.com",
  "password": "password123",
  "phone": "1234567890"
}
```

### **Login User**
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "userId": "username",
  "password": "password123"
}
```

### **Health Check**
```
GET http://localhost:5000/api/health
```

---

## 💾 Database Table Schema

```sql
CREATE TABLE users (
  userId VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

---

## 🎮 User Journey

```
1. Visit http://localhost:3000
                    ↓
2. Click "Create account"
                    ↓
3. Fill registration form
                    ↓
4. Click "Create Account"
                    ↓
5. See success message
                    ↓
6. Auto-redirect to login
                    ↓
7. Enter credentials
                    ↓
8. Click "Sign In"
                    ↓
9. See movie library
                    ↓
10. Click profile icon (top-right)
                    ↓
11. Click "Sign Out" to logout
```

---

## 🛠️ Configuration Files

### **Backend (.env template)**
Location: `server/.env.example`
```
DB_HOST=your_aiven_host_here
DB_PORT=23889
DB_USER=your_db_user_here
DB_PASSWORD=your_aiven_password_here
DB_NAME=defaultdb
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### **Frontend Vite Config**
Location: `vite.config.js`
```javascript
server: {
  port: 3000,
  proxy: {
    '/api': 'http://localhost:5000'
  }
}
```

---

## 📊 Port Configuration

| Service | Port | Can Change |
|---------|------|-----------|
| Frontend (Vite) | 3000 | ✅ Yes |
| Backend (Express) | 5000 | ✅ Yes |
| MySQL (Aiven) | 23889 | ❌ No (fixed) |

---

## 🎯 Key Features

### **Security** 🔐
- Password hashing with bcryptjs
- Email/UserID uniqueness
- SQL injection prevention
- CORS protection
- SSL database connection

### **UI/UX** 🎨
- Glass morphism design
- Animated backgrounds
- Smooth transitions
- Mobile responsive
- Dark mode optimized

### **Performance** ⚡
- Connection pooling
- Async operations
- CSS-only animations
- Optimized queries
- Small bundle size

### **Documentation** 📚
- Setup guide
- API documentation
- Design guide
- Troubleshooting
- Code comments

---

## 🗂️ Directory Structure

```
Project2/
├── src/
│   ├── components/     ← React components
│   ├── services/       ← API services
│   ├── App.jsx        ← Main app
│   └── index.css      ← Global styles
│
├── server/            ← Backend Express app
│   ├── config/        ← Database config
│   ├── controllers/   ← Business logic
│   └── routes/        ← API routes
│
├── docs/              ← Documentation
│   ├── QUICK_START.md
│   ├── TROUBLESHOOTING.md
│   └── ...
│
├── package.json       ← Frontend dependencies
├── vite.config.js     ← Vite config
└── index.html         ← Entry point
```

---

## 🚨 Troubleshooting Quick Links

| Issue | Solution File |
|-------|----------------|
| Can't connect to database | [TROUBLESHOOTING.md](TROUBLESHOOTING.md#issue-1) |
| Port already in use | [TROUBLESHOOTING.md](TROUBLESHOOTING.md#issue-2) |
| CORS error | [TROUBLESHOOTING.md](TROUBLESHOOTING.md#issue-5) |
| Blank screen | [TROUBLESHOOTING.md](TROUBLESHOOTING.md#issue-7) |
| npm install fails | [TROUBLESHOOTING.md](TROUBLESHOOTING.md#issue-8) |

---

## ✅ Pre-Launch Checklist

Before starting, verify you have:

- [ ] Node.js installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Internet connection
- [ ] Port 3000 available
- [ ] Port 5000 available
- [ ] Modern browser installed

---

## 📞 When You Need Help

1. **Check:** Browser console (F12)
2. **Check:** Backend console logs
3. **Read:** TROUBLESHOOTING.md
4. **Read:** QUICK_START.md
5. **Check:** AUTHENTICATION_SETUP.md

---

## 🎓 Learning Resources

- **Glass Morphism:** https://glassmorphism.com/
- **React Docs:** https://react.dev
- **Express Docs:** https://expressjs.com
- **MySQL Docs:** https://dev.mysql.com/doc/
- **Vite Docs:** https://vitejs.dev

---

## 🎉 You're Ready!

Everything is set up and ready to go:

```
✅ Frontend Component  - Login & Register
✅ Backend API Server  - Express running
✅ Database           - Aiven MySQL connected
✅ Documentation      - Complete
✅ Security           - Implemented
✅ Design             - Glass morphism
✅ Responsive         - Mobile ready

🚀 START: npm run dev (or double-click start-dev.bat)
🌐 VISIT: http://localhost:3000
📝 REGISTER: Create an account
🔑 LOGIN: Sign in with your credentials
🍿 ENJOY: Browse Netflix clone!
```

---

**Last Updated:** February 2026  
**Status:** ✅ Ready for Use  
**Questions?** See QUICK_START.md

