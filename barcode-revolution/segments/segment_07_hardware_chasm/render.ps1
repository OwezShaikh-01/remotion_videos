$ProjectRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")
Set-Location $ProjectRoot
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " Rendering Segment07: The Hardware Chasm" -ForegroundColor Cyan
Write-Host " Duration: 38.0s (1,140 frames @ 30fps) [03:31 - 04:09]" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
npx remotion render src/index.ts Segment07 out/segment_07_hardware_chasm.mp4 --gl=angle --concurrency=4 @args
