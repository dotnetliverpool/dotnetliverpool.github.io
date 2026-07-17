@echo off
setlocal

cd /d "%~dp0"

echo Installing dependencies (if needed)...
call bundle install
if errorlevel 1 (
  echo.
  echo bundle install failed. Make sure Ruby and Bundler are installed.
  pause
  exit /b 1
)

echo.
echo Starting Dot Net Liverpool site...
echo Open http://127.0.0.1:4000/ in your browser
echo Press Ctrl+C to stop the server.
echo.

start "" "http://127.0.0.1:4000/"
call bundle exec jekyll serve --host 127.0.0.1 --port 4000

pause
