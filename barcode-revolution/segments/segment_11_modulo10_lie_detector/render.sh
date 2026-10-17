#!/usr/bin/env bash
set -e
PROJECT_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$PROJECT_ROOT"

echo "=========================================================="
echo " Rendering Segment11: The Secret Database & Lie Detector Math"
echo " Duration: 40.0s (1,200 frames @ 30fps) [06:13 - 06:53]"
echo "=========================================================="

npx remotion render src/index.ts Segment11 out/segment_11_modulo10_lie_detector.mp4 --gl=angle --concurrency=4 "$@"
