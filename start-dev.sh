#!/bin/bash

# Netflix Clone - Development Server Startup Script

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║         🎬 Netflix Clone - Development Environment            ║"
echo "║                                                                ║"
echo "║  This script will start both the backend and frontend servers  ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "✗ Error: Node.js is not installed or not in PATH"
    echo ""
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js version:"
node --version
echo ""

# Start backend server
echo ""
echo "═══════════════════════════════════════════"
echo "⚙️  STARTING BACKEND SERVER ON PORT 5000..."
echo "═══════════════════════════════════════════"
echo ""

cd server

if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
    echo ""
fi

echo "Starting server..."
npm start &
BACKEND_PID=$!
sleep 3

# Start frontend
cd ..

echo ""
echo "═══════════════════════════════════════════"
echo "🎨 STARTING FRONTEND SERVER ON PORT 3000..."
echo "═══════════════════════════════════════════"
echo ""

if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
    echo ""
fi

echo "Starting development server..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  ✓ Both servers are starting...                               ║"
echo "║                                                                ║"
echo "║  🔗 Frontend:  http://localhost:3000                           ║"
echo "║  🔗 Backend:   http://localhost:5000                           ║"
echo "║  🗄️  Database:  Aiven MySQL Connected                          ║"
echo "║                                                                ║"
echo "║  📚 Documentation: See AUTHENTICATION_SETUP.md                 ║"
echo "║                                                                ║"
echo "║  Press Ctrl+C to stop all servers                              ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Wait for signals
wait
