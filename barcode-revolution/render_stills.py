import subprocess
import shutil
from pathlib import Path

BASE_DIR = Path(r"C:\Users\Owez\.gemini\antigravity\scratch\barcode-revolution\test_frames")
ARTIFACT_DIR = Path(r"C:\Users\Owez\.gemini\antigravity\brain\a58a05be-e1f3-4eb1-93b7-b30968c8488b")
EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

files = [
    ("frame_a_morse_stretch.html", "frame_A_morse_stretch.png"),
    ("frame_b_bullseye_vs_bars.html", "frame_B_bullseye_vs_bars.png"),
    ("frame_c_troy_laser_beep.html", "frame_C_troy_laser_beep.png"),
]

print("Starting headless 1080p frame rendering...")
ARTIFACT_DIR.mkdir(parents=True, exist_ok=True)

for html_name, png_name in files:
    html_path = BASE_DIR / html_name
    png_path = BASE_DIR / png_name
    
    file_url = html_path.as_uri()
    
    cmd = [
        EDGE_PATH,
        "--headless",
        "--disable-gpu",
        "--hide-scrollbars",
        "--window-size=1920,1080",
        f"--screenshot={png_path}",
        file_url
    ]
    
    print(f"Rendering {html_name} -> {png_name} at 1920x1080...")
    res = subprocess.run(cmd, capture_output=True, text=True)
    
    if png_path.exists():
        print(f"Successfully generated: {png_path} ({png_path.stat().st_size} bytes)")
        # Copy to artifact directory so Antigravity can embed and display it
        artifact_dest = ARTIFACT_DIR / png_name
        shutil.copy2(png_path, artifact_dest)
        print(f"Copied to artifact dir: {artifact_dest}")
    else:
        print(f"Failed to generate {png_name}: {res.stderr}")

print("All test frames generated.")
