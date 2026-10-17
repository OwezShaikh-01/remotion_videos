$ProjectRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")
Set-Location $ProjectRoot
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " Rendering Segment04: The UV Glow Failure & Miami Escape" -ForegroundColor Cyan
Write-Host " Duration: 31.0s (930 frames @ 30fps) [01:48 - 02:19]" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
npx remotion render src/index.ts Segment04 out/segment_04_uv_glow_failure.mp4 --gl=angle --concurrency=4 @args
