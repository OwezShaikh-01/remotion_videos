#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_ROOT"

echo "=========================================================="
echo "  RENDERING SEGMENT 01: The Invisible Pattern"
echo "  Resolution: 1920x1080 @ 30fps"
echo "  Duration:   32.0s (960 frames) [0:00 - 0:32]"
echo "=========================================================="

if [ ! -d "node_modules" ]; then
    echo ">> node_modules not detected. Installing dependencies..."
    npm install
fi

mkdir -p out

echo ">> Starting Remotion render..."
npx remotion render src/index.ts Segment01 out/segment-01.mp4 --codec=h264 --crf=18 --image-format=jpeg --jpeg-quality=95 "$@"

echo "=========================================================="
echo "  RENDER COMPLETE: out/segment-01.mp4"
echo "=========================================================="
