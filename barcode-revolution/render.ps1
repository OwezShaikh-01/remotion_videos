Write-Host "========================================================" -ForegroundColor Cyan
Write-Host " The Barcode Revolution - Remotion Render Suite" -ForegroundColor Cyan
Write-Host " Target: 1080p @ 30fps (6,540 frames, 03:38.00)" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""

if (-not (Test-Path "node_modules")) {
    Write-Host "[1/3] Installing dependencies..." -ForegroundColor Yellow
    npm install
} else {
    Write-Host "[1/3] Dependencies already installed." -ForegroundColor Green
}

if (-not (Test-Path "out")) {
    New-Item -ItemType Directory -Path "out" | Out-Null
}

Write-Host ""
Write-Host "[2/3] Rendering Barcode Revolution with voiceover..." -ForegroundColor Yellow
Write-Host "Output destination: out/barcode-revolution.mp4" -ForegroundColor Gray
Write-Host ""

npx remotion render src/index.ts BarcodeRevolution out/barcode-revolution.mp4 --concurrency=4 --gl=angle

Write-Host ""
Write-Host "========================================================" -ForegroundColor Green
Write-Host "[3/3] RENDER COMPLETE!" -ForegroundColor Green
Write-Host "Output saved to: out/barcode-revolution.mp4" -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Green
