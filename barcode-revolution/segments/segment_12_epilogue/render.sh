#!/usr/bin/env bash
set -e
PROJECT_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$PROJECT_ROOT"

echo "=========================================================="
echo " Rendering Segment12: Epilogue: The 25-Year Echo"
echo " Duration: 26.4s (792 frames @ 30fps) [06:53 - 06:59.4]"
echo "=========================================================="

npx remotion render src/index.ts Segment12 out/segment_12_epilogue.mp4 --gl=angle --concurrency=4 "$@"
