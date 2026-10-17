$ProjectRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")
Set-Location $ProjectRoot
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " Rendering Segment12: Epilogue: The 25-Year Echo" -ForegroundColor Cyan
Write-Host " Duration: 26.4s (792 frames @ 30fps) [06:53 - 06:59.4]" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
npx remotion render src/index.ts Segment12 out/segment_12_epilogue.mp4 --gl=angle --concurrency=4 @args
