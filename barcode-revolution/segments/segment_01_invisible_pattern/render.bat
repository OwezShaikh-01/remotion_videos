@echo off
cd /d "%~dp0..\.."
echo ==========================================================
echo  Rendering Segment01: The Invisible Pattern
echo  Duration: 36.0s (1,080 frames @ 30fps) [00:00 - 00:36]
echo ==========================================================
call npx remotion render src/index.ts Segment01 out/segment_01_invisible_pattern.mp4 --gl=angle --concurrency=4 %*
