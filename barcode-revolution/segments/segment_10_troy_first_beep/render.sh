#!/usr/bin/env bash
set -e
PROJECT_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$PROJECT_ROOT"

echo "=========================================================="
echo " Rendering Segment10: Troy, Ohio & The First Beep"
echo " Duration: 40.0s (1,200 frames @ 30fps) [05:33 - 06:13]"
echo "=========================================================="

npx remotion render src/index.ts Segment10 out/segment_10_troy_first_beep.mp4 --gl=angle --concurrency=4 "$@"
