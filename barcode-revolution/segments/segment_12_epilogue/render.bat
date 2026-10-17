@echo off
cd /d "%~dp0..\.."
echo ==========================================================
echo  Rendering Segment12: Epilogue: The 25-Year Echo
echo  Duration: 26.4s (792 frames @ 30fps) [06:53 - 06:59.4]
echo ==========================================================
call npx remotion render src/index.ts Segment12 out/segment_12_epilogue.mp4 --gl=angle --concurrency=4 %*
