$ProjectRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")
Set-Location $ProjectRoot
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " Rendering Segment08: The Race of 1970" -ForegroundColor Cyan
Write-Host " Duration: 39.0s (1,170 frames @ 30fps) [04:09 - 04:48]" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
npx remotion render src/index.ts Segment08 out/segment_08_tech_convergence_1970.mp4 --gl=angle --concurrency=4 @args
