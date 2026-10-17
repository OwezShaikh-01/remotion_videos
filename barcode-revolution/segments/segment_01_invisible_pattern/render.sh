#!/usr/bin/env bash
set -e
PROJECT_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$PROJECT_ROOT"

echo "=========================================================="
echo " Rendering Segment01: The Invisible Pattern"
echo " Duration: 36.0s (1,080 frames @ 30fps) [00:00 - 00:36]"
echo "=========================================================="

npx remotion render src/index.ts Segment01 out/segment_01_invisible_pattern.mp4 --gl=angle --concurrency=4 "$@"
