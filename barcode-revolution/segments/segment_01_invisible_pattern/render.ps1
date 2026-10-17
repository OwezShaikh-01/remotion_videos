$ProjectRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")
Set-Location $ProjectRoot
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " Rendering Segment01: The Invisible Pattern" -ForegroundColor Cyan
Write-Host " Duration: 36.0s (1,080 frames @ 30fps) [00:00 - 00:36]" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
npx remotion render src/index.ts Segment01 out/segment_01_invisible_pattern.mp4 --gl=angle --concurrency=4 @args
