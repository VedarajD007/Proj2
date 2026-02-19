# ⚡ COMMAND QUICK REFERENCE

## 🚀 START APPLICATION

### **Windows - Fastest Way**
```bash
start-dev.bat
```

### **Mac/Linux - Fastest Way**
```bash
chmod +x start-dev.sh
./start-dev.sh
```

### **Windows - Manual**
```bash
# Terminal 1 - Backend
cd server
npm install
npm start

# Terminal 2 - Frontend
npm install
npm run dev
```

### **Mac/Linux - Manual**
```bash
# Terminal 1 - Backend
cd server
npm install
npm start

# Terminal 2 - Frontend
npm install
npm run dev
```

---

## 🔗 IMPORTANT URLS

| Purpose | URL |
|---------|-----|
| **Application** | http://localhost:3000 |
| **Backend API** | http://localhost:5000 |
| **API Health** | http://localhost:5000/api/health |
| **Database** | mysql://...i.aivencloud.com:23889 |

---

## 🗄️ DATABASE CREDENTIALS

```
Host:     YOUR_AIVEN_HOST (add to server/.env)
Port:     23889
User:     YOUR_DB_USER (add to server/.env)
Password: YOUR_DB_PASSWORD (add to server/.env)
Database: defaultdb
SSL:      REQUIRED
```

---

## 📝 API ENDPOINT COMMANDS

### **Register User**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "kodom01",
    "name": "Omkar",
    "email": "om@kod.com",
    "password": "omkar123",
    "phone": "8095008123"
  }'
```

### **Login User**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "kodom01",
    "password": "omkar123"
  }'
```

### **Health Check**
```bash
curl http://localhost:5000/api/health
```

---

## 🛠️ SYSTEM COMMANDS

### **Check Node Version**
```bash
node --version
# Should be v16 or higher
```

### **Check npm Version**
```bash
npm --version
```

### **Kill Process (Windows)**
```powershell
# Find process on port 3000
netstat -ano | findstr :3000

# Kill it (replace PID)
taskkill /PID 12345 /F

# Or for port 5000
netstat -ano | findstr :5000
taskkill /PID 12345 /F
```

### **Kill Process (Mac/Linux)**
```bash
# Find process on port 3000
lsof -i :3000

# Kill it (replace PID)
kill -9 PID

# Or for port 5000
lsof -i :5000
kill -9 PID
```

---

## 📦 NPM COMMANDS

### **Frontend**
```bash
npm install          # Install dependencies
npm run dev          # Start dev server (port 3000)
npm run build        # Build for production
npm run preview      # Preview production build
```

### **Backend**
```bash
cd server
npm install          # Install dependencies
npm start            # Start server (port 5000)
npm install --save bcryptjs  # (if missing)
npm install --save mysql2    # (if missing)
npm install --save express   # (if missing)
```

---

## 🔍 DEBUGGING

### **Open Browser Console**
```
Windows/Linux: F12
Mac: Cmd+Option+I
```

### **View Server Logs**
```
Look in terminal where "npm start" is running
Check for:
✓ Connected to MySQL database
✓ Users table created/verified
✓ Server running on port 5000
```

### **Clear Browser Data**
```
Chrome/Edge: Settings → Clear Cache
Firefox: Preferences → Clear Data
Safari: Develop → Empty Caches
```

### **Reset Application**
```bash
# Frontend
rm -rf node_modules package-lock.json
npm install
npm run dev

# Backend
cd server
rm -rf node_modules package-lock.json
npm install
npm start
```

---

## 🚨 COMMON SOLUTIONS

### **"Cannot find module"**
```bash
npm install
# or
npm install --save package-name
```

### **"Port already in use"**
```bash
# Windows
taskkill /PID 12345 /F

# Mac/Linux
kill -9 12345

# Or use different port
npm run dev -- --port 3001
PORT=5001 npm start
```

### **"CORS error"**
```
1. Make sure backend running (port 5000)
2. Make sure frontend running (port 3000)
3. Restart both servers
```

### **"Database connection error"**
```
1. Check internet connection
2. Verify credentials in server/config/database.js
3. Check firewall allows port 23889
4. Restart server
```

### **"Blank/white screen"**
```
1. Press F12 → Console
2. Look for red errors
3. Check server is running
4. Hard refresh: Ctrl+Shift+R
```

---

## 📊 PERFORMANCE CHECKS

### **Browser Performance**
```
Open DevTools (F12)
→ Performance tab
→ Record action
→ Click Reload
→ Look for blue color (FCP, LCP)
```

### **Network Performance**
```
DevTools (F12)
→ Network tab
→ Check response times
→ Should be <500ms per request
```

### **Database Performance**
```
Check server logs
Should see queries complete <200ms
Look for:
✓ Connection pool active
✓ No timeouts
✓ Smooth responses
```

---

## 🔐 SECURITY CHECKS

### **Verify SSL Connection**
```bash
# Backend should use SSL for database
# Check: server/config/database.js
ssl: { rejectUnauthorized: false }
```

### **Check Password Hashing**
```javascript
// In browser console, check stored user
localStorage.getItem('user')
// Should NOT show plaintext password
// Password is only on server (hashed)
```

### **Verify CORS**
```javascript
// Should work (same origin)
fetch('http://localhost:5000/api/auth/login')

// Should fail (different origin)
fetch('http://malicious-site.com/api')
```

---

## 📱 MOBILE TESTING

### **Chrome DevTools (Recommended)**
```
F12 → Click device icon (top-left)
→ Select device (iPhone, Pixel, Tablet)
→ Refresh page
→ Test all interactions
```

### **Test on Actual Phone**
```
Find your computer's IP:
Windows: ipconfig (look for IPv4 Address)
Mac/Linux: ifconfig (look for inet)

Then on phone browser:
http://192.168.x.x:3000
(replace with your IP)
```

---

## 📚 DOCUMENTATION COMMANDS

### **View All Documents**
```bash
# List all markdown files
ls *.md

# Or on Windows
dir *.md

# Opens documentation
```

### **Read Documentation (Mac/Linux)**
```bash
cat QUICK_START.md
cat AUTHENTICATION_SETUP.md
cat TROUBLESHOOTING.md
```

### **Search Documentation**
```bash
# Windows
findstr /S "keyword" *.md

# Mac/Linux
grep -r "keyword" *.md
```

---

## 📄 FILE LOCATIONS

### **Frontend Files**
```
Login Form:      src/components/Login.jsx
Register Form:   src/components/Register.jsx
Auth Service:    src/services/authService.js
Main App:        src/App.jsx
Global Styles:   src/index.css
```

### **Backend Files**
```
Server:          server/index.js
Database Config: server/config/database.js
Auth Logic:      server/controllers/authController.js
Routes:          server/routes/auth.js
Config Template: server/.env.example
Dependencies:    server/package.json
```

### **Documentation**
```
Quick Start:           QUICK_START.md
Complete Setup:        AUTHENTICATION_SETUP.md
Design Guide:          DESIGN_GUIDE.md
Implementation:        IMPLEMENTATION_SETUP.md
Troubleshooting:       TROUBLESHOOTING.md
Visual Diagrams:       VISUAL_GUIDE.md
This Reference:        COMMAND_REFERENCE.md
```

---

## ✅ VERIFICATION COMMANDS

### **Check Everything Working**
```bash
# All good if you see:
# ✓ Server running on port 5000
# ✓ Database connected
# ✓ VITE ready on port 3000
# ✓ Can navigate to http://localhost:3000
# ✓ Registration form appears
# ✓ Can create account
# ✓ Can login
# ✓ Movies load
```

### **Quick Health Check**
```bash
# Test backend health
curl http://localhost:5000/api/health

# Expected response:
{"status":"Server is running"}

# Test database (in server console, look for):
✓ Connected to MySQL database
✓ Users table created
```

---

## 🎯 FIRST TIME SETUP CHECKLIST

```bash
# 1. Check prerequisites
node --version
npm --version

# 2. Clone/navigate to project
cd Project2

# 3. Start backend
cd server && npm install && npm start
# Wait for: "Server running on port 5000"

# 4. In new terminal, start frontend
npm install && npm run dev
# Wait for: "VITE v5.x.x ready in xxx ms"

# 5. Open browser
# Visit: http://localhost:3000

# 6. Test registration
# Fill form → Click "Create Account"
# See Success -> Auto-redirect to login

# 7. Test login
# Enter credentials → Click "Sign In"
# See movies loaded -> You're logged in!

# 8. Test logout
# Click profile icon → Click "Sign Out"
# Back to login page -> Successfully logged out!

# ✅ All Working!
```

---

## 🆘 EMERGENCY RESET

```bash
# If everything breaks:

# Stop all processes
# Ctrl+C in all terminals

# Frontend reset
rm -rf node_modules package-lock.json
npm install
npm run dev

# Backend reset (in new terminal)
cd server
rm -rf node_modules package-lock.json
npm install
npm start

# Try again
# If still broken, restart computer
```

---

## 🔗 USEFUL LINKS

```
Node.js:      https://nodejs.org
React Docs:   https://react.dev
Express Docs: https://expressjs.com
MySQL Docs:   https://dev.mysql.com/doc
Vite Docs:    https://vitejs.dev
Aiven:        https://www.aivencloud.com
```

---

## 📞 SUPPORT RESOURCES

| Problem | Where to Look |
|---------|---------------|
| Setup help | QUICK_START.md |
| Commands | COMMAND_REFERENCE.md (this file) |
| Technical details | AUTHENTICATION_SETUP.md |
| Design system | DESIGN_GUIDE.md |
| Issues | TROUBLESHOOTING.md |
| Diagrams | VISUAL_GUIDE.md |
| Everything | IMPLEMENTATION_SUMMARY.md |

---

**Last Updated:** February 2026  
**Tested:** ✅  
**Ready:** ✅

Happy coding! 🚀

