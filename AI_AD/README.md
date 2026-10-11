# AI Motion Designer Commercial (30s Kinetic Motion Graphics)

A high-end, 30-second kinetic typography and motion graphics commercial built with **Remotion** and **React**.

> **Theme:** *"Hire Your Next Lead Motion Designer: AI"*  
> **Aesthetic:** Swiss Modernist & Contemporary Editorial Agency (Pentagram / Studio Dumbar / Buck style). Zero cyberpunk/tech clichés.  
> **Specs:** 30.0 Seconds (`900 frames @ 30 FPS`), 1920×1080 Full HD.

---

## ⚡ 1-Click Quickstart

Clone the repository and launch the interactive preview:

```bash
# 1. Enter the project directory
cd AI_AD

# 2. Install dependencies
npm install

# 3. Start Remotion Studio (One-click interactive preview)
npm run dev
# or: npm start
```

This automatically opens Remotion Studio at `http://localhost:3000` where you can scrub individual frames, inspect spring curves, and watch the full 30s playback.

---

## 🎬 Render to MP4

To render the finished 1080p MP4 video directly:

```bash
npm run render
```

The output file is saved to:
```
out/hire-ai-motion.mp4
```

---

## 📐 Architecture & Key Motion Techniques

1. **Character-Level 3D Kinetic Typography (`ExpressiveText.tsx`):**
   - Per-character staggered wave cascades.
   - 3D perspective flips (`rotateX`, `rotateY`, `translateZ`).
   - Dynamic kerning and optical expansion.

2. **Physics & Animation Principles (`motion.ts`):**
   - **Anticipation Curves:** Recoil backwards before explosive forward motion.
   - **Squash & Stretch:** Dynamic deformation based on instantaneous frame velocity.
   - **Harmonic Drift:** Micro-drift so elements are never frozen dead.
   - **Follow-through & Secondary Action:** Delayed inertia across child elements.

3. **Dynamic 3D Camera Rig (`CameraRig.tsx`):**
   - Continuous focal tracking and parallax depth.
   - Screen shake with decay on impact frames.
   - Chromatic aberration ghosting on explosive hits.

4. **Visual Accents & Graphic Elements:**
   - **`ImpactBurst.tsx`:** Shockwave rings and radial kinetic spark rays.
   - **`BezierGraph.tsx`:** Interactive After Effects-style cubic-bezier speed curve visualizer with live tangent handles.
   - **`LiquidGeometry.tsx`:** Organic harmonic SVG path morphing.
   - **`BadgeSeal.tsx`:** Rotating studio stamp with curved circular text path.
   - **`Marquee.tsx`:** High-speed angled kinetic ticker loops.
   - **`NoiseOverlay.tsx`:** 35mm print-grade SVG turbulence film grain.

---

## 📁 Project Structure

```
AI_AD/
├── src/
│   ├── components/
│   │   ├── BadgeSeal.tsx         # Rotating circular typographic stamp
│   │   ├── BezierGraph.tsx       # Live speed graph curve editor
│   │   ├── CameraRig.tsx         # 3D camera pan, shake, chromatic ghosting
│   │   ├── ExpressiveText.tsx    # Character-level 3D kinetic typography
│   │   ├── GeometricShapes.tsx   # Bauhaus accents, rings, pill tags
│   │   ├── ImpactBurst.tsx       # Shockwave rings & radial spark rays
│   │   ├── LiquidGeometry.tsx    # Harmonic morphing SVG blobs
│   │   ├── Marquee.tsx           # High-speed angled ticker ribbons
│   │   ├── NoiseOverlay.tsx      # Sub-pixel SVG film grain
│   │   └── StudioHeader.tsx      # Live timecode & audio waveform bar
│   ├── scenes/
│   │   ├── Scene1Hook.tsx        # 01 / The Hook (Stark Vermilion & Inversion)
│   │   ├── Scene2Problem.tsx     # 02 / The Reality (3D Card Tumble & OBSOLETE Slam)
│   │   ├── Scene3MeetAI.tsx      # 03 / The Revelation (Speed Bezier Graph)
│   │   ├── Scene4Showcase.tsx    # 04 / The Showreel (Type, Brand, Product Motion)
│   │   ├── Scene5ValueProp.tsx   # 05 / Scale Unlimited (100+ Concepts Counter)
│   │   └── Scene6CallToAction.tsx# 06 / Grand Finale (Magnetic Button & Click)
│   ├── utils/
│   │   └── motion.ts             # Squash & stretch, anticipation, drift
│   ├── Root.tsx                  # Master 30s timeline composition
│   ├── theme.ts                  # Swiss color palette & spring tokens
│   └── index.ts                  # Remotion root registration
├── package.json
└── tsconfig.json
```
