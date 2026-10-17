$ProjectRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")
Set-Location $ProjectRoot
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " Rendering Segment10: Troy, Ohio & The First Beep" -ForegroundColor Cyan
Write-Host " Duration: 40.0s (1,200 frames @ 30fps) [05:33 - 06:13]" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
npx remotion render src/index.ts Segment10 out/segment_10_troy_first_beep.mp4 --gl=angle --concurrency=4 @args
