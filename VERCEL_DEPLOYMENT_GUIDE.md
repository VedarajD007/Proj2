# 🚀 MovieMaster - Vercel Deployment Guide

## Overview

MovieMaster can be deployed on Vercel. This guide covers:
- Frontend deployment on Vercel
- Static site hosting
- Environment configuration
- Troubleshooting CSS and asset issues

---

## 📋 Prerequisites

1. **GitHub Account** - For connecting to Vercel
2. **MovieMaster Repository** - https://github.com/VedarajD007/MovieMaster
3. **Vercel Account** - Free at https://vercel.com
4. **Backend API** - Deployed separately (Heroku, AWS, Azure, etc.)

---

## 🎛️ Configuration for Vercel

### Environment Variables Setup

**For Vercel Deployments with Backend API:**

1. Go to Vercel Dashboard → Select your project
2. Click "Settings" → "Environment Variables"
3. Add this variable:

   | Key | Value |
   |-----|-------|
   | `VITE_API_BASE_URL` | `https://your-backend-api.com/api/auth` |

**Example Values:**
- If backend on Heroku: `https://your-app.herokuapp.com/api/auth`
- If backend on Railway: `https://your-railway-app.up.railway.app/api/auth`
- For development: `http://localhost:5000/api/auth` (not needed on Vercel)

**❗ Important:**
- Do NOT use `@` prefix - that's only for secrets
- Just enter the plain URL value
- Save and redeploy after updating

### If Backend Not Deployed Yet

If you don't have a deployed backend, the app will:
1. Still load and display movies (from mock data)
2. Show error when trying to register/login
3. This is expected until backend is deployed

---

## 📦 Vercel Configuration Files

### vite.config.js
```javascript
export default defineConfig({
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    cssCodeSplit: true
  }
})
```

✅ Already configured in the project!

### vercel.json
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev"
}
```

✅ Already created in the project!

---

## 🔧 Step-by-Step Deployment

### Step 1: Import Repository

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select "GitHub"
4. Choose `MovieMaster` repository
5. Click "Import"

### Step 2: Configure Project

1. **Framework Preset**: Select "Vite"
2. **Build Settings**:
   - Build Command: `npm run build` ✅ (auto-detected)
   - Output Directory: `dist` ✅ (auto-detected)
   - Install Command: `npm install` ✅ (auto-detected)

3. **Environment Variables** (if using backend API):
   ```
   VITE_API_BASE_URL=https://your-api-domain.com
   ```

### Step 3: Deploy

1. Click "Deploy"
2. Wait for build to complete (~2-3 minutes)
3. Your site will be live at `https://moviemaster.vercel.app`

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] App loads at https://moviemaster.vercel.app
- [ ] All CSS is visible and styled correctly
- [ ] Images load (if using TMDB API)
- [ ] Responsive design works on mobile
- [ ] Console has no errors (F12)

**Common Issue**: If CSS doesn't load, it's usually due to:
- ❌ Incorrect asset paths
- ✅ Fixed in vite.config.js with proper build settings
- ✅ CSS files are imported directly in components

---

## 🔄 Deployment Workflow

### For Updates:

1. Make changes locally
2. Push to GitHub:
   ```bash
   git add .
   git commit -m "Update: description"
   git push origin main
   ```
3. Vercel auto-deploys on push to `main` branch

### Disable Auto-Deploy (if needed):

1. Go to Vercel Dashboard
2. Project Settings → Git
3. Uncheck "Automatic Deployments"

---

## 📡 Backend API Configuration

### For Deployed Application

If your backend is also deployed, update:

**File:** `src/services/authService.js`

```javascript
// For production (Vercel)
const API_BASE_URL = process.env.VITE_API_BASE_URL || 'https://moviemaster-api.herokuapp.com/api/auth';

// For development (local)
// const API_BASE_URL = 'http://localhost:5000/api/auth';
```

### Backend Deployment Options:

1. **Heroku** - Free tier available
2. **AWS** - EC2, Lambda, Lightsail
3. **Azure** - App Service
4. **DigitalOcean** - Droplets, App Platform
5. **Railway** - Easy deployment
6. **Render** - Free tier available

---

## 🎨 CSS & Asset Troubleshooting

### If CSS doesn't load:

**Solution 1: Clear Cache**
- Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
- Open DevTools (F12) → Network tab
- Check if CSS files are loading (status 200)

**Solution 2: Verify Imports**
All CSS imports should be relative:
```javascript
import './Hero.css'  // ✅ Correct
import '/src/components/Hero.css'  // ❌ Wrong (absolute path)
```

**Solution 3: Check Build Output**
```bash
npm run build
# Check if dist/assets/ contains CSS files
```

**Solution 4: Vercel Logs**
1. Go to Vercel Dashboard
2. Select your project
3. Click "Deployments"
4. Check build logs for errors

---

## 🚨 Common Issues & Solutions

### Issue: White screen / No content

**Solution:**
- Check browser console for JS errors
- Verify environment variables are set
- Ensure build completed successfully

### Issue: 404 errors on assets

**Solution:**
- CSS and image files not loading
- Check Vercel build logs
- Verify `vite.config.js` build settings

### Issue: API requests fail

**Solution:**
- Backend not deployed or unreachable
- CORS not configured on backend
- Environment variable not set

Set VITE_API_BASE_URL in Vercel project settings.

---

## 📊 Performance Optimization

### Vercel provides:
- ✅ Automatic CDN distribution
- ✅ Edge caching for assets
- ✅ Zero-config HTTPS
- ✅ Automatic image optimization
- ✅ Analytics dashboard

### To monitor:
1. Vercel Dashboard → Analytics
2. Check Core Web Vitals
3. Monitor build times

---

## 🔐 Security

### Environment Variables
- ❌ Never commit `.env` file
- ✅ Add to Vercel project settings
- ✅ Use for API URLs, API keys, etc.

### CORS Configuration
Ensure backend allows requests from:
```
https://moviemaster.vercel.app
```

---

## 📞 Support

**Vercel Documentation:**
- https://vercel.com/docs
- Vite: https://vitejs.dev/guide/ssr.html#setting-up-the-dev-server
- Troubleshooting: https://vercel.com/docs/platform/limits

**For Issues:**
1. Check Vercel Deployment Logs
2. Check browser console (F12)
3. Check GitHub Issues

---

## 🎉 Success!

Your MovieMaster app is now live on Vercel! 🚀

**Deployment URL:** https://moviemaster.vercel.app

Share with others and enjoy your Netflix clone! 🍿🎬

