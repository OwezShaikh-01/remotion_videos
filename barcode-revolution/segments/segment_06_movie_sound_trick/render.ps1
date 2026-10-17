$ProjectRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")
Set-Location $ProjectRoot
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " Rendering Segment06: The Movie Trick & The 1949 Patent" -ForegroundColor Cyan
Write-Host " Duration: 35.0s (1,050 frames @ 30fps) [02:56 - 03:31]" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
npx remotion render src/index.ts Segment06 out/segment_06_movie_sound_trick.mp4 --gl=angle --concurrency=4 @args
