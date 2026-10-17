#!/usr/bin/env bash
set -e
PROJECT_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$PROJECT_ROOT"

echo "=========================================================="
echo " Rendering Segment04: The UV Glow Failure & Miami Escape"
echo " Duration: 31.0s (930 frames @ 30fps) [01:48 - 02:19]"
echo "=========================================================="

npx remotion render src/index.ts Segment04 out/segment_04_uv_glow_failure.mp4 --gl=angle --concurrency=4 "$@"
