import subprocess
import shutil
from pathlib import Path

BASE_DIR = Path(r"C:\Users\Owez\Projects\remotion_videos\barcode-revolution\test_frames")
ARTIFACT_DIR = Path(r"C:\Users\Owez\.gemini\antigravity\brain\a58a05be-e1f3-4eb1-93b7-b30968c8488b")
EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

files = [
    ("keyframe_01_invisible_pattern.html", "keyframe_01_invisible_pattern.png"),
    ("keyframe_02_philadelphia_crisis.html", "keyframe_02_philadelphia_crisis.png"),
    ("keyframe_03_uv_glow_failure.html", "keyframe_03_uv_glow_failure.png"),
    ("keyframe_04_morse_in_sand.html", "keyframe_04_morse_in_sand.png"),
    ("keyframe_05_movie_sound_trick.html", "keyframe_05_movie_sound_trick.png"),
    ("keyframe_06_hardware_chasm.html", "keyframe_06_hardware_chasm.png"),
    ("keyframe_07_tech_convergence_1970.html", "keyframe_07_tech_convergence_1970.png"),
    ("keyframe_08_bullseye_vs_bars.html", "keyframe_08_bullseye_vs_bars.png"),
    ("keyframe_09_troy_first_beep.html", "keyframe_09_troy_first_beep.png"),
    ("keyframe_10_modulo10_lie_detector.html", "keyframe_10_modulo10_lie_detector.png"),
]

print("Starting headless 1080p frame rendering for 10 keyframes...")
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
        artifact_dest = ARTIFACT_DIR / png_name
        shutil.copy2(png_path, artifact_dest)
        print(f"Copied to artifact dir: {artifact_dest}")
    else:
        print(f"Failed to generate {png_name}: {res.stderr}")

print("All 10 test frames generated.")
