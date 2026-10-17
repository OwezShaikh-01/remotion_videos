# The Barcode Revolution (Remotion Documentary)

A high-end, 1080p 30fps documentary motion graphics video created with **Remotion & React**.

* **Exact Duration:** `03:38.00` = `218.00 seconds`
* **Total Frame Budget:** **`6,540 frames`** (Frame `0` to `6539`)
* **Framerate:** `30 fps`
* **Resolution:** `1920 × 1080` (Full HD, 16:9)

---

## 🎬 Act Structure & Exact Script Synchronization

| Act | Frames | Timestamp Range | Visual Anchor / Beat |
| :--- | :--- | :--- | :--- |
| **Act 1: The Invisible Pattern** | `0 – 1102` (1102f) | `00:00.00 – 00:36.74` | Macro zoom into everyday items revealing parallel vertical lines; 10,000x ticker; 1949 beach teaser; $15,000 patent transfer; Circle vs. Straight Line hook. |
| **Act 2: The Drexel Hallway** | `1102 – 2060` (958f) | `00:36.74 – 01:08.67` | 1948 Philadelphia Drexel Institute hallway; manual register bottleneck; human error popups; the Dean’s refusal ("NO."); Bernard Silver and Norman Woodland's obsession. |
| **Act 3: Morse in the Sand** | `2060 – 3348` (1288f) | `01:08.67 – 01:51.60` | Failed UV ink experiment; Miami beach sand dune; Morse code dots & dashes pulling downward into vertical bars; 35mm optical sound-on-film light sensing. |
| **Act 4: The Hardware Chasm** | `3348 – 4578` (1230f) | `01:51.60 – 02:32.59` | 3 missing technologies blueprint (laser, phototube, minicomputer); Silver dies in 1962; 1969 patent expires; 1971 Intel 4004 & gas laser convergence; grocery committee forms. |
| **Act 5: Bullseye vs. Bars** | `4578 – 5790` (1212f) | `02:32.59 – 03:13.00` | RCA concentric Bullseye pitch; rotary press ink smear catastrophe; George Laurer refuses manager; IBM straight bars parallel ink flow; Woodland endorses Laurer; April 1973 victory. |
| **Act 6: The First Beep** | `5790 – 6540` (750f) | `03:13.00 – 03:38.00` | June 26, 1974 8:01 AM in Troy, Ohio; 2.5D Wrigley's Juicy Fruit 10-pack slides across checkout glass; ruby He-Ne laser line sweep; massive **BEEP!** impact; $0.67 receipt payout; $4,000 ($25,000 today) scanner cost punch. |

---

## 🚀 Execution & Rendering (On Powerful Machine)

### 1. Install Dependencies
```bash
npm install
```

### 2. Preview in Remotion Studio
To inspect the timeline, scrub frames, and preview live with audio:
```bash
npm start
```

### 3. Render Master Video (1080p MP4)
To render the final `video.mp4` using GPU hardware acceleration and multi-core concurrency:
```bash
npm run render
```
*(Custom output command)*:
```bash
npx remotion render src/index.ts BarcodeRevolution out/video.mp4 --concurrency=8 --gl=angle
```

### 4. Adding Voiceover Audio
Place your voiceover audio file as `voiceover.mp3` inside a `public/` directory, and uncomment the `<Audio>` tag in `src/MainVideo.tsx`:
```tsx
<Audio src={staticFile("voiceover.mp3")} />
```
All frame boundaries (`Series.Sequence`) are pre-calibrated to match the exact audio timestamps in your script.

---

## 🎨 Creative & Technical System
* **Procedural Film Grain & Lighting:** Custom SVG noise filter `<feTurbulence>` with organic frame-by-frame flicker and edge vignette in `src/components/GrainOverlay.tsx`.
* **2.5D Camera Rig:** Natural camera zoom, pan, tilt, and micro-sway breathing in `src/components/CameraRig.tsx`.
* **Kinetic Spring Physics:** Text reveals and physical transforms powered by Remotion's spring math (`damping: 11-14`, `stiffness: 80-160`).
* **Zero UI Template Clutter:** Editorial mixed-media storytelling using physical paper cutouts, vintage polaroids, tactile scotch tape, grease-pencil annotations, and optical laser flares.
