#!/usr/bin/env bash
set -e
PROJECT_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$PROJECT_ROOT"

echo "=========================================================="
echo " Rendering Segment05: Morse Code in the Sand"
echo " Duration: 37.0s (1,110 frames @ 30fps) [02:19 - 02:56]"
echo "=========================================================="

npx remotion render src/index.ts Segment05 out/segment_05_morse_in_sand.mp4 --gl=angle --concurrency=4 "$@"
