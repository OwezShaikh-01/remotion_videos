$ProjectRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")
Set-Location $ProjectRoot
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " Rendering Segment05: Morse Code in the Sand" -ForegroundColor Cyan
Write-Host " Duration: 37.0s (1,110 frames @ 30fps) [02:19 - 02:56]" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
npx remotion render src/index.ts Segment05 out/segment_05_morse_in_sand.mp4 --gl=angle --concurrency=4 @args
