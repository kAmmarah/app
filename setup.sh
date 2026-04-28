#!/bin/bash

echo "🚀 LIGMA Workspace - Setup Script"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"
echo ""

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install
echo ""

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server
npm install
cd ..
echo ""

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client
npm install
cd ..
echo ""

echo "✅ All dependencies installed successfully!"
echo ""
echo "📝 Next steps:"
echo "1. Edit server/.env and add your MongoDB Atlas connection string"
echo "2. Run 'npm run dev' to start both servers"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "🎉 Happy collaborating with LIGMA!"
echo "   Created by Ammara Dawood"
