@echo off
echo ========================================================
echo  The Barcode Revolution - Remotion Render Suite
echo  Target: 1080p @ 30fps (6,540 frames, 03:38.00)
echo ========================================================
echo.

if not exist node_modules (
    echo [1/3] Installing dependencies...
    call npm install
) else (
    echo [1/3] Dependencies already installed.
)

if not exist out (
    mkdir out
)

echo.
echo [2/3] Rendering Barcode Revolution with voiceover...
echo Output destination: out\barcode-revolution.mp4
echo.

call npx remotion render src/index.ts BarcodeRevolution out/barcode-revolution.mp4 --concurrency=4 --gl=angle

echo.
echo ========================================================
echo [3/3] RENDER COMPLETE!
echo Output saved to: out\barcode-revolution.mp4
echo ========================================================
pause
