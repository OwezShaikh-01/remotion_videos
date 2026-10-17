$ProjectRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")
Set-Location $ProjectRoot
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " Rendering Segment03: Philadelphia 1948: The Grocery Crisis" -ForegroundColor Cyan
Write-Host " Duration: 39.0s (1,170 frames @ 30fps) [01:09 - 01:48]" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
npx remotion render src/index.ts Segment03 out/segment_03_philadelphia_crisis.mp4 --gl=angle --concurrency=4 @args
