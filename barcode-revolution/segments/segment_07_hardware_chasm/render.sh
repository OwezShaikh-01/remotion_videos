#!/usr/bin/env bash
set -e
PROJECT_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$PROJECT_ROOT"

echo "=========================================================="
echo " Rendering Segment07: The Hardware Chasm"
echo " Duration: 38.0s (1,140 frames @ 30fps) [03:31 - 04:09]"
echo "=========================================================="

npx remotion render src/index.ts Segment07 out/segment_07_hardware_chasm.mp4 --gl=angle --concurrency=4 "$@"
