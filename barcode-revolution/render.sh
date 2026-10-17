#!/usr/bin/env bash
set -e

echo "========================================================"
echo " The Barcode Revolution - Remotion Render Suite"
echo " Target: 1080p @ 30fps (6,540 frames, 03:38.00)"
echo "========================================================"
echo ""

if [ ! -d "node_modules" ]; then
    echo "[1/3] Installing dependencies..."
    npm install
else
    echo "[1/3] Dependencies already installed."
fi

mkdir -p out

echo ""
echo "[2/3] Rendering Barcode Revolution with voiceover..."
echo "Output destination: out/barcode-revolution.mp4"
echo ""

npx remotion render src/index.ts BarcodeRevolution out/barcode-revolution.mp4 --concurrency=4

echo ""
echo "========================================================"
echo "[3/3] RENDER COMPLETE!"
echo "Output saved to: out/barcode-revolution.mp4"
echo "========================================================"
