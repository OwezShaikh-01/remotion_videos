@echo off
cd /d "%~dp0..\.."
echo ==========================================================
echo  Rendering Segment03: Philadelphia 1948: The Grocery Crisis
echo  Duration: 39.0s (1,170 frames @ 30fps) [01:09 - 01:48]
echo ==========================================================
call npx remotion render src/index.ts Segment03 out/segment_03_philadelphia_crisis.mp4 --gl=angle --concurrency=4 %*
