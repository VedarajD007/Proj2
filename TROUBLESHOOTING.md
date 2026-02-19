# 🔧 Troubleshooting Guide

## 🎯 Common Issues & Solutions

---

## ❌ Backend Issues

### **Issue 1: "Cannot connect to database"**

**Error Message:**
```
Error: Connection timeout exceeded
or
PROTOCOL_CONNECTION_LOST
```

**Causes:**
- ❌ Internet connection down
- ❌ Aiven credentials wrong
- ❌ Firewall blocking port 23889
- ❌ Database service down

**Solutions:**
```bash
# 1. Check internet connection
ping google.com

# 2. Verify credentials in server/config/database.js
# Should have:
# host: 'YOUR_AIVEN_HOST' (set in server/.env)
# port: 23889
# user: 'YOUR_DB_USER' (set in server/.env)
# password: 'YOUR_DB_PASSWORD' (set in server/.env)
# database: 'defaultdb'

# 3. Check firewall - allows port 23889

# 4. Restart server
npm start
```

---

### **Issue 2: "Port 5000 already in use"**

**Error Message:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Causes:**
- ❌ Another app using port 5000
- ❌ Previous process not terminated

**Solutions - Windows:**
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID)
taskkill /PID 12345 /F

# Or use different port - edit server/index.js
const PORT = process.env.PORT || 5001
```

**Solutions - Mac/Linux:**
```bash
# Find process
lsof -i :5000

# Kill process
kill -9 <PID>

# Or use different port
PORT=5001 npm start
```

---

### **Issue 3: "Table creation failed"**

**Error Message:**
```
Database Error: You have an error in your SQL syntax
or
Access denied for user
```

**Causes:**
- ❌ Database permissions insufficient
- ❌ User doesn't have CREATE privileges
- ❌ SQL syntax error

**Solutions:**
```bash
# 1. Check if user has proper permissions
# Contact Aiven support or check your account

# 2. Verify database.js doesn't have typos

# 3. Check server logs for detailed error
# Scroll up in terminal where npm start runs

# 4. Restart server
npm start
```

---

### **Issue 4: "Dependencies not installed"**

**Error Message:**
```
Cannot find module 'express'
or
Cannot find module 'bcryptjs'
```

**Causes:**
- ❌ npm install not run
- ❌ node_modules deleted
- ❌ Network error during install

**Solution:**
```bash
cd server
rm -rf node_modules package-lock.json
npm install
npm start
```

---

## ❌ Frontend Issues

### **Issue 5: "CORS error in console"**

**Error Message:**
```
Access to XMLHttpRequest at 'http://localhost:5000...'
from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Causes:**
- ❌ Backend not running
- ❌ Backend on wrong port
- ❌ CORS not configured

**Solutions:**
```bash
# 1. Verify backend is running
# Check Terminal 1 - should see "Server running on port 5000"

# 2. Verify frontend URL
# Should be http://localhost:3000

# 3. Check server/index.js has CORS enabled
# Should have:
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

# 4. If still failing, restart both servers
```

---

### **Issue 6: "Port 3000 already in use"**

**Error Message:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID 12345 /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>

# Start on different port
npm run dev -- --port 3001
```

---

### **Issue 7: "Blank/white screen on localhost:3000"**

**Possible Causes:**
- ❌ Vite server not started
- ❌ React compilation error
- ❌ Browser cache issue

**Solutions:**
```bash
# 1. Check terminal has "VITE v5.x.x ready in xxx ms"

# 2. Hard refresh browser
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (Mac)

# 3. Clear browser cache
Settings → Clear files/cache

# 4. Check browser console for errors
F12 → Console tab

# 5. Restart frontend
Ctrl+C to stop npm run dev
npm run dev
```

---

### **Issue 8: "npm install fails"**

**Error Message:**
```
npm ERR! code ERESOLVE
or
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Causes:**
- ❌ Node version incompatible
- ❌ Package conflicts
- ❌ Network issue

**Solutions:**
```bash
# 1. Check Node version
node --version
# Should be v16 or higher

# 2. Update npm
npm install -g npm@latest

# 3. Force install (use with caution)
npm install --force

# 4. Delete cache
npm cache clean --force
npm install
```

---

## ❌ Database Issues

### **Issue 9: "Can't connect to MySQL server"**

**Error Message:**
```
Error: connect ECONNREFUSED
or
Error: getaddrinfo ENOTFOUND mysql-67f0b3c...
```

**Causes:**
- ❌ Wrong host name
- ❌ DNS resolution failed
- ❌ Network connection lost

**Solutions:**
```bash
# 1. Test connectivity
ping YOUR_AIVEN_HOST

# 2. Verify hostname is correct (typo check)

# 3. Try different network
# Switch WiFi or use hotspot

# 4. Disable VPN if using one
# Some VPNs block database connections

# 5. Check Aiven status
# Visit https://www.aivencloud.com/
```

---

### **Issue 10: "Table doesn't exist"**

**Error Message (in console):**
```
Error: Table 'defaultdb.users' doesn't exist
```

**Causes:**
- ❌ Server didn't create table
- ❌ Database credentials wrong
- ❌ ALTER privilege missing

**Solutions:**
```bash
# 1. Check server logs for errors
# Look for "Users table created/verified successfully"

# 2. Verify user is registered
# Registration form → Submit
# Check server console for success message

# 3. Table created manually (if needed):
# Connect to Aiven via console and run:

CREATE TABLE IF NOT EXISTS users (
  userId VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

## ❌ Authentication Issues

### **Issue 11: "Registration fails with no error message"**

**Causes:**
- ❌ Backend not responding
- ❌ Validation failed silently
- ❌ Network timeout

**Solutions:**
```bash
# 1. Check browser console (F12)
# Look for network errors

# 2. Check backend console
# Should see POST request to /api/auth/register

# 3. Verify validation rules:
# - userId: required, not empty
# - name: required, not empty
# - email: required, valid format
# - password: required, min 6 characters
# - phone: required, not empty

# 4. Try with different data
# Maybe email already exists?
```

---

### **Issue 12: "Login works but redirects back to login page"**

**Causes:**
- ❌ localStorage not working
- ❌ Auth state not updating
- ❌ Browser in private mode

**Solutions:**
```bash
# 1. Check browser console (F12)
# Look for "localStorage not available" or CORS errors

# 2. Check if in private/incognito mode
# Switch to normal browsing

# 3. Clear browser data
# Settings → Clear cache/cookies

# 4. Check server console
# Should see successful login response

# 5. Verify code in App.jsx:
# Should have:
localStorage.setItem('isAuthenticated', 'true')
```

---

### **Issue 13: "User stays logged in after logout"**

**Causes:**
- ❌ localStorage not cleared
- ❌ Button not working
- ❌ Page caching issue

**Solutions:**
```bash
# 1. Check logout button was clicked
# Look in browser console

# 2. Manual logout
F12 → Console
localStorage.clear()
location.reload()

# 3. Check Header.jsx has proper logout handler

# 4. Clear browser cache
# Sometimes page from cache
```

---

## ⚠️ Performance Issues

### **Issue 14: "App loads very slowly"**

**Possible Causes:**
- ❌ Large movie data
- ❌ TMDB API slow
- ❌ Browser tab isn't focused
- ❌ Many network requests

**Solutions:**
```bash
# 1. Check if using mock data
# Look for mock data banner in app

# 2. Configure TMDB API key properly
# See src/services/tmdbService.js

# 3. Check network tab (F12)
# Look for slow requests

# 4. Reduce data
# Fewer movies in carousel
```

---

### **Issue 15: "Animations are stuttering"**

**Causes:**
- ❌ GPU acceleration disabled
- ❌ Too many animations
- ❌ Browser compatibility issue

**Solutions:**
```bash
# 1. Check if backdrop-filter is supported
# Modern browser required (Chrome 76+, Safari 9+)

# 2. Disable animations for testing
# Edit CSS and remove @keyframes

# 3. Update browser to latest version

# 4. Check GPU acceleration
# Chrome: Settings → Advanced → System
# Enable Hardware Acceleration
```

---

## 🔍 Debugging Tips

### **Enable Debug Logging**

**In server/index.js, add:**
```javascript
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});
```

**In authService.js, add:**
```javascript
console.log('Sending request to:', url);
console.log('With data:', data);
```

### **Check All Network Requests**

```javascript
// In browser console
localStorage // View stored data
sessionStorage // View session data
document.cookie // View cookies
```

---

## ✅ Health Check Checklist

Before reporting issue, verify:

- [ ] Node.js installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Backend running (`npm start` shows "Server running")
- [ ] Frontend running (`npm run dev` shows VITE ready)
- [ ] Both ports are correct (backend 5000, frontend 3000)
- [ ] Database connection works (no errors in console)
- [ ] Internet connection is stable
- [ ] Using modern browser (Chrome, Firefox, Safari, Edge)
- [ ] Not in private/incognito mode
- [ ] No errors in browser console (F12)
- [ ] backend server logs showing requests

---

## 📞 When to Seek Help

If issue persists after trying solutions:

1. **Collect information:**
   - Error message (screenshot)
   - Browser console error (F12)
   - Server/terminal logs
   - Node version (`node --version`)
   - npm version (`npm --version`)

2. **Check documentation:**
   - QUICK_START.md
   - AUTHENTICATION_SETUP.md
   - IMPLEMENTATION_SUMMARY.md

3. **Try fresh install:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm start
   ```

4. **Restart completely:**
   - Close all terminals
   - Close all browser tabs
   - Restart computer
   - Try again fresh

---

## 🆘 Emergency Reset

If everything is broken:

```bash
# Stop all processes (Ctrl+C everywhere)

# Windows
cd server
rmdir /s /q node_modules
del package-lock.json
npm install
npm start

# In new terminal
cd ..
rmdir /s /q node_modules
del package-lock.json
npm install
npm run dev
```

---

**Last Updated:** February 2026  
**Questions?** Check console logs first! 🔍

