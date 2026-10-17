$ProjectRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")
Set-Location $ProjectRoot
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " Rendering Segment02: The $15,000 Tragedy & Circle Tease" -ForegroundColor Cyan
Write-Host " Duration: 33.0s (990 frames @ 30fps) [00:36 - 01:09]" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
npx remotion render src/index.ts Segment02 out/segment_02_circle_tease.mp4 --gl=angle --concurrency=4 @args
