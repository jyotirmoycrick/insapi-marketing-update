@echo off
echo Starting InsAPI Marketing CMS
echo ================================

REM Setup database
echo.
echo Setting up database...
cd backend
call node scripts\setupDatabase.js
if %errorlevel% neq 0 (
    echo Database setup failed
    pause
    exit /b 1
)

REM Start Node.js server
echo.
echo Starting Node.js server (port 5001)...
start "Node.js Server" cmd /k "npm start"
timeout /t 3 /nobreak >nul

REM Start Python server
echo Starting Python server (port 8000)...
start "Python Server" cmd /k "python server.py"
timeout /t 3 /nobreak >nul

REM Start Frontend
echo Starting Frontend (port 5173)...
cd ..\frontend
start "Frontend" cmd /k "npm run dev"

echo.
echo ================================
echo All servers started!
echo ================================
echo.
echo Access points:
echo    Frontend:  http://localhost:5173
echo    Admin:     http://localhost:5173/fast-admin
echo    Node API:  http://localhost:5001
echo    Python API: http://localhost:8000
echo.
echo Admin credentials:
echo    Email:    admin@insapi.com
echo    Password: admin123456
echo.
echo Press any key to exit (servers will keep running)
pause >nul
