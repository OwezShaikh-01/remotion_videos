$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectRoot = Resolve-Path (Join-Path $ScriptDir "..")
Set-Location $ProjectRoot

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  RENDERING SEGMENT 01: The Invisible Pattern" -ForegroundColor Cyan
Write-Host "  Resolution: 1920x1080 @ 30fps" -ForegroundColor Cyan
Write-Host "  Duration:   32.0s (960 frames) [0:00 - 0:32]" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

if (-not (Test-Path "node_modules")) {
    Write-Host ">> node_modules not detected. Installing dependencies..." -ForegroundColor Yellow
    npm install
}

if (-not (Test-Path "out")) {
    New-Item -ItemType Directory -Path "out" | Out-Null
}

Write-Host ">> Starting Remotion render..." -ForegroundColor Green
npx remotion render src/index.ts Segment01 out/segment_1.mp4 --gl=angle --concurrency=4 @args

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  RENDER COMPLETE: out/segment_1.mp4" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
