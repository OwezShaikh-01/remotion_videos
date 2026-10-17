@echo off
cd /d "%~dp0..\.."
echo ==========================================================
echo  Rendering Segment02: The $15,000 Tragedy & Circle Tease
echo  Duration: 33.0s (990 frames @ 30fps) [00:36 - 01:09]
echo ==========================================================
call npx remotion render src/index.ts Segment02 out/segment_02_circle_tease.mp4 --gl=angle --concurrency=4 %*
