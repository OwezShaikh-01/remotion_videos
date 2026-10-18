#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_ROOT"

echo "=========================================================="
echo "  RENDERING SEGMENT 03: The Question & The Dean"
echo "  Resolution: 1920x1080 @ 30fps"
echo "  Duration:   27.5s (825 frames) [1:06 - 1:33.5]"
echo "=========================================================="

if [ ! -d "node_modules" ]; then
    echo ">> node_modules not detected. Installing dependencies..."
    npm install
fi

mkdir -p out

echo ">> Starting Remotion render..."
npx remotion render src/index.ts Segment03 out/segment-03.mp4 --codec=h264 --crf=18 --image-format=jpeg --jpeg-quality=95 "$@"

echo "=========================================================="
echo "  RENDER COMPLETE: out/segment-03.mp4"
echo "=========================================================="
