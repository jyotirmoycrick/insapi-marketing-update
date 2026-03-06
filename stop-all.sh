#!/bin/bash

echo "🛑 Stopping all servers..."

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

# Stop servers using PIDs
if [ -f logs/nodejs.pid ]; then
    PID=$(cat logs/nodejs.pid)
    if kill $PID 2>/dev/null; then
        echo -e "${GREEN}✅ Node.js server stopped${NC}"
    else
        echo -e "${RED}❌ Node.js server not running${NC}"
    fi
    rm logs/nodejs.pid
fi

if [ -f logs/python.pid ]; then
    PID=$(cat logs/python.pid)
    if kill $PID 2>/dev/null; then
        echo -e "${GREEN}✅ Python server stopped${NC}"
    else
        echo -e "${RED}❌ Python server not running${NC}"
    fi
    rm logs/python.pid
fi

if [ -f logs/frontend.pid ]; then
    PID=$(cat logs/frontend.pid)
    if kill $PID 2>/dev/null; then
        echo -e "${GREEN}✅ Frontend stopped${NC}"
    else
        echo -e "${RED}❌ Frontend not running${NC}"
    fi
    rm logs/frontend.pid
fi

# Fallback: kill by port
echo ""
echo "Checking for any remaining processes..."

# Kill Node.js on port 5001
if lsof -ti:5001 > /dev/null 2>&1; then
    lsof -ti:5001 | xargs kill -9 2>/dev/null
    echo -e "${GREEN}✅ Killed process on port 5001${NC}"
fi

# Kill Python on port 8000
if lsof -ti:8000 > /dev/null 2>&1; then
    lsof -ti:8000 | xargs kill -9 2>/dev/null
    echo -e "${GREEN}✅ Killed process on port 8000${NC}"
fi

# Kill Frontend on port 5173
if lsof -ti:5173 > /dev/null 2>&1; then
    lsof -ti:5173 | xargs kill -9 2>/dev/null
    echo -e "${GREEN}✅ Killed process on port 5173${NC}"
fi

echo ""
echo -e "${GREEN}✅ All servers stopped${NC}"
