#!/bin/bash

echo "🚀 Starting InsAPI Marketing CMS"
echo "================================"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if MongoDB is running
echo -e "\n${YELLOW}Checking MongoDB...${NC}"
if pgrep -x "mongod" > /dev/null; then
    echo -e "${GREEN}✅ MongoDB is running${NC}"
else
    echo -e "${RED}❌ MongoDB is not running${NC}"
    echo "Please start MongoDB first:"
    echo "  sudo systemctl start mongod"
    echo "  or"
    echo "  mongod"
    exit 1
fi

# Setup database
echo -e "\n${YELLOW}Setting up database...${NC}"
cd backend
node scripts/setupDatabase.js
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Database setup complete${NC}"
else
    echo -e "${RED}❌ Database setup failed${NC}"
    exit 1
fi

# Start Node.js server
echo -e "\n${YELLOW}Starting Node.js server (port 5001)...${NC}"
npm start > ../logs/nodejs.log 2>&1 &
NODEJS_PID=$!
echo -e "${GREEN}✅ Node.js server started (PID: $NODEJS_PID)${NC}"

# Start Python server
echo -e "\n${YELLOW}Starting Python server (port 8000)...${NC}"
python server.py > ../logs/python.log 2>&1 &
PYTHON_PID=$!
echo -e "${GREEN}✅ Python server started (PID: $PYTHON_PID)${NC}"

# Start Frontend
echo -e "\n${YELLOW}Starting Frontend (port 5173)...${NC}"
cd ../frontend
npm run dev > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
echo -e "${GREEN}✅ Frontend started (PID: $FRONTEND_PID)${NC}"

# Save PIDs
cd ..
mkdir -p logs
echo $NODEJS_PID > logs/nodejs.pid
echo $PYTHON_PID > logs/python.pid
echo $FRONTEND_PID > logs/frontend.pid

echo -e "\n${GREEN}================================${NC}"
echo -e "${GREEN}🎉 All servers started!${NC}"
echo -e "${GREEN}================================${NC}"
echo ""
echo "📝 Access points:"
echo "   Frontend:  http://localhost:5173"
echo "   Admin:     http://localhost:5173/fast-admin"
echo "   Node API:  http://localhost:5001"
echo "   Python API: http://localhost:8000"
echo ""
echo "🔑 Admin credentials:"
echo "   Email:    admin@insapi.com"
echo "   Password: admin123456"
echo ""
echo "📋 Logs:"
echo "   Node.js:  logs/nodejs.log"
echo "   Python:   logs/python.log"
echo "   Frontend: logs/frontend.log"
echo ""
echo "🛑 To stop all servers:"
echo "   ./stop-all.sh"
echo ""
echo "⏳ Waiting for servers to start..."
sleep 5

# Check if servers are running
echo ""
if curl -s http://localhost:5001/api/health > /dev/null; then
    echo -e "${GREEN}✅ Node.js server is responding${NC}"
else
    echo -e "${RED}❌ Node.js server is not responding${NC}"
fi

if curl -s http://localhost:8000/api/health > /dev/null; then
    echo -e "${GREEN}✅ Python server is responding${NC}"
else
    echo -e "${RED}❌ Python server is not responding${NC}"
fi

if curl -s http://localhost:5173 > /dev/null; then
    echo -e "${GREEN}✅ Frontend is responding${NC}"
else
    echo -e "${RED}❌ Frontend is not responding${NC}"
fi

echo ""
echo -e "${GREEN}🚀 Ready to go! Open http://localhost:5173/fast-admin${NC}"
