$ProjectRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")
Set-Location $ProjectRoot
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " Rendering Segment11: The Secret Database & Lie Detector Math" -ForegroundColor Cyan
Write-Host " Duration: 40.0s (1,200 frames @ 30fps) [06:13 - 06:53]" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
npx remotion render src/index.ts Segment11 out/segment_11_modulo10_lie_detector.mp4 --gl=angle --concurrency=4 @args
