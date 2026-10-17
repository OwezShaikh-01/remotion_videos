#!/usr/bin/env bash
set -e
PROJECT_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$PROJECT_ROOT"

echo "=========================================================="
echo " Rendering Segment08: The Race of 1970"
echo " Duration: 39.0s (1,170 frames @ 30fps) [04:09 - 04:48]"
echo "=========================================================="

npx remotion render src/index.ts Segment08 out/segment_08_tech_convergence_1970.mp4 --gl=angle --concurrency=4 "$@"
