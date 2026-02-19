@echo off
REM Netflix Clone - Development Server Startup Script

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║         🎬 Netflix Clone - Development Environment            ║
echo ║                                                                ║
echo ║  This script will start both the backend and frontend servers  ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ✗ Error: Node.js is not installed or not in PATH
    echo.
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js version:
node --version
echo.

REM Start backend server
echo.
echo ═══════════════════════════════════════════
echo ⚙️  STARTING BACKEND SERVER ON PORT 5000...
echo ═══════════════════════════════════════════
echo.

cd server

if not exist node_modules (
    echo 📦 Installing backend dependencies...
    call npm install
    echo.
)

echo Starting server...
start cmd /k "npm start"
timeout /t 3 /nobreak

REM Start frontend
cd ..

echo.
echo ═══════════════════════════════════════════
echo 🎨 STARTING FRONTEND SERVER ON PORT 3000...
echo ═══════════════════════════════════════════
echo.

if not exist node_modules (
    echo 📦 Installing frontend dependencies...
    call npm install
    echo.
)

echo Starting development server...
start cmd /k "npm run dev"

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║  ✓ Both servers are starting...                               ║
echo ║                                                                ║
echo ║  🔗 Frontend:  http://localhost:3000                           ║
echo ║  🔗 Backend:   http://localhost:5000                           ║
echo ║  🗄️  Database:  Aiven MySQL Connected                          ║
echo ║                                                                ║
echo ║  📚 Documentation: See AUTHENTICATION_SETUP.md                 ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

pause
