@echo off
setlocal enabledelayedexpansion

cd /d "%~dp0.."

echo ==========================================================
echo   RENDERING SEGMENT 01: The Invisible Pattern
echo   Resolution: 1920x1080 @ 30fps
echo   Duration:   32.0s (960 frames) [0:00 - 0:32]
echo ==========================================================

if not exist "node_modules\" (
    echo ^>^> node_modules not detected. Installing dependencies...
    call npm install
)

if not exist "out\" (
    mkdir out
)

echo ^>^> Starting Remotion render...
call npx remotion render src/index.ts Segment01 out/segment_1.mp4 --gl=angle --concurrency=4 %*

echo ==========================================================
echo   RENDER COMPLETE: out\segment_1.mp4
echo ==========================================================
