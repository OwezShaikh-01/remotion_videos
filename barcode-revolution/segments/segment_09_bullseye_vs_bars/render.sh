#!/usr/bin/env bash
set -e
PROJECT_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$PROJECT_ROOT"

echo "=========================================================="
echo " Rendering Segment09: Bullseye vs. The Bars"
echo " Duration: 45.0s (1,350 frames @ 30fps) [04:48 - 05:33]"
echo "=========================================================="

npx remotion render src/index.ts Segment09 out/segment_09_bullseye_vs_bars.mp4 --gl=angle --concurrency=4 "$@"
