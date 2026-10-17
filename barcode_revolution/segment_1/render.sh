#!/usr/bin/env bash
set -e

# Resolve directory of this script and project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_ROOT"

echo "=========================================================="
echo "  RENDERING SEGMENT 01: The Invisible Pattern"
echo "  Resolution: 1920x1080 @ 30fps"
echo "  Duration:   32.0s (960 frames) [0:00 - 0:32]"
echo "=========================================================="

# Auto-install dependencies if node_modules is missing
if [ ! -d "node_modules" ]; then
    echo ">> node_modules not detected. Installing dependencies..."
    npm install
fi

# Ensure output directory exists
mkdir -p out

# Execute Remotion render
echo ">> Starting Remotion render..."
npx remotion render src/index.ts Segment01 out/segment_1.mp4 --gl=angle --concurrency=4 "$@"

echo "=========================================================="
echo "  RENDER COMPLETE: out/segment_1.mp4"
echo "=========================================================="
