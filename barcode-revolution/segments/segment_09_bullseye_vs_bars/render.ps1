$ProjectRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")
Set-Location $ProjectRoot
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " Rendering Segment09: Bullseye vs. The Bars" -ForegroundColor Cyan
Write-Host " Duration: 45.0s (1,350 frames @ 30fps) [04:48 - 05:33]" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
npx remotion render src/index.ts Segment09 out/segment_09_bullseye_vs_bars.mp4 --gl=angle --concurrency=4 @args
