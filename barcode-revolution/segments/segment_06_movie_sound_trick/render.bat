@echo off
cd /d "%~dp0..\.."
echo ==========================================================
echo  Rendering Segment06: The Movie Trick & The 1949 Patent
echo  Duration: 35.0s (1,050 frames @ 30fps) [02:56 - 03:31]
echo ==========================================================
call npx remotion render src/index.ts Segment06 out/segment_06_movie_sound_trick.mp4 --gl=angle --concurrency=4 %*
