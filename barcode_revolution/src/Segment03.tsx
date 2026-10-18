import React from 'react';
import {AbsoluteFill, Audio, staticFile, useCurrentFrame} from 'remotion';
import {C, F, W, H, FPS, prog, eo, eio, ein, eb, lerp, win, rnd, Sentence, Word} from './lib';
import {buildWordsX, Subs, Overlays} from './shared';
import {loadFonts} from './fonts';

loadFonts();

const fill: React.CSSProperties = {position: 'absolute', left: 0, top: 0, width: W, height: H};
const abs = (s: React.CSSProperties): React.CSSProperties => ({position: 'absolute', ...s});

/* Times are LOCAL to this segment (global time 66.0s to 93.5s). */
const sentences: Sentence[] = [
  {id: 'c1', parts: [{s: 0.14, e: 2.58, text: "And nobody knows what's really sitting on the shelves."}]},
  {id: 'c2', parts: [{s: 3.52, e: 4.44, text: 'He asks the dean,'}, {s: 5.22, e: 8.76, text: 'could you build a way for a store to read a product automatically?'}]},
  {id: 'c3', parts: [{s: 9.66, e: 10.60, text: 'The dean says no.'}]},
  {id: 'c4', parts: [{s: 11.54, e: 13.86, text: 'But a graduate student named Bernard Silver'}, {s: 14.08, e: 15.66, text: 'is standing close enough to hear.'}]},
  {id: 'c5', parts: [{s: 16.58, e: 17.38, text: 'He tells his friend,'}, {s: 17.64, e: 19.02, text: 'Norman Joseph Woodland.'}]},
  {id: 'c6', parts: [{s: 19.74, e: 21.40, text: "And Woodland can't let it go."}]},
  {id: 'c7', parts: [{s: 22.32, e: 23.14, text: 'Their first idea'}, {s: 23.46, e: 25.80, text: 'is ink that glows under ultraviolet light.'}]},
  {id: 'c8', parts: [{s: 26.68, e: 27.30, text: "It doesn't work."}]},
];
const WORDS: Record<string, Word[]> = Object.fromEntries(sentences.map((s) => [s.id, buildWordsX(s)]));

/* ===================== 0.0 – 3.6  SCENE 1: THE INVENTORY LEDGER & BLIND SHELVES ===================== */
const InventoryLedger: React.FC<{t: number}> = ({t}) => {
  if (t > 3.6) return null;
  const a = win(t, 0.0, 3.6, 0.2, 0.5);
  const sc = lerp(1.06, 1.0, eo(t, 0, 3.4));
  const panY = lerp(20, -10, eo(t, 0, 3.4));

  // Ledger rows with discrepancies
  const rows = [
    {aisle: 'A-02', item: "Campbell's Tomato Soup", exp: '480', act: '312', diff: '-168', err: true},
    {aisle: 'A-09', item: 'Domino Pure Cane Sugar 5lb', exp: '250', act: '???', diff: 'UNKNOWN', err: true},
    {aisle: 'B-04', item: "Kellogg's Corn Flakes 18oz", exp: '180', act: '180', diff: 'OK', err: false},
    {aisle: 'B-14', item: 'Ivory Bar Soap 4-Pack', exp: '600', act: '740', diff: '+140', err: true},
    {aisle: 'C-01', item: "Maxwell House Ground Coffee", exp: '320', act: '???', diff: 'SHRINK', err: true},
    {aisle: 'C-08', item: 'Pillsbury Enriched Flour 5lb', exp: '150', act: '114', diff: '-36', err: true},
  ];

  const circleProgress = eo(t, 1.1, 2.2);

  return (
    <div style={{...fill, opacity: a, transform: `scale(${sc}) translateY(${panY}px)`, transformOrigin: '50% 50%'}}>
      {/* Background dark warehouse shelving silhouettes */}
      <svg style={fill} width={W} height={H}>
        <defs>
          <linearGradient id="shelfGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a1e2b" />
            <stop offset="100%" stopColor="#0b0d12" />
          </linearGradient>
        </defs>
        {/* Receding shelf uprights */}
        {[140, 360, 1560, 1780].map((x, i) => (
          <rect key={i} x={x} y={60} width={24} height={960} fill="#141824" stroke="rgba(242,239,230,0.06)" strokeWidth={1} />
        ))}
        {/* Ghost cartons on dark perimeter shelves */}
        {[180, 240, 300, 780, 840].map((y, i) => (
          <line key={i} x1={80} y1={y} x2={440} y2={y} stroke="rgba(242,239,230,0.12)" strokeWidth={2} />
        ))}
        {[180, 240, 300, 780, 840].map((y, i) => (
          <line key={i} x1={1480} y1={y} x2={1840} y2={y} stroke="rgba(242,239,230,0.12)" strokeWidth={2} />
        ))}
      </svg>

      {/* Hero Physical Object: 1948 Retail Inventory Ledger Clipboard */}
      <div
        style={abs({
          left: 960 - 440,
          top: 540 - 320,
          width: 880,
          height: 640,
          borderRadius: 8,
          background: 'linear-gradient(160deg,#3d2c1d,#231910)',
          boxShadow: '0 40px 90px rgba(0,0,0,0.85), inset 1.5px 1.5px 0 rgba(255,255,255,0.1)',
          padding: 24,
        })}
      >
        {/* Brass Clipboard Clip at top */}
        <div
          style={abs({
            left: 880 / 2 - 90,
            top: -18,
            width: 180,
            height: 48,
            borderRadius: 6,
            background: 'linear-gradient(180deg,#d4b068,#8e6e30)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.6), inset 1px 1px 0 rgba(255,255,255,0.4)',
            border: '1px solid #ffe6a3',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          })}
        >
          <div style={{width: 70, height: 8, borderRadius: 4, background: '#543f16', opacity: 0.6}} />
        </div>

        {/* Aged yellowed ruled paper sheet */}
        <div
          style={abs({
            left: 24,
            top: 36,
            right: 24,
            bottom: 24,
            borderRadius: 4,
            background: 'linear-gradient(175deg,#f4ebd4,#e5d7b5)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
            padding: '28px 34px',
            color: '#2a241b',
            overflow: 'hidden',
          })}
        >
          {/* Header */}
          <div style={{display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #5a4b35', paddingBottom: 10}}>
            <div>
              <div style={{fontFamily: F.serif, fontWeight: 700, fontSize: 24, letterSpacing: '0.04em', color: '#1f1b14'}}>
                WEEKLY PHYSICAL INVENTORY AUDIT
              </div>
              <div style={{fontFamily: F.mono, fontSize: 11, letterSpacing: '0.25em', color: '#685740', marginTop: 2}}>
                STORE NO. 14 — PHILADELPHIA DISTRICT (1948)
              </div>
            </div>
            <div style={{textAlign: 'right', fontFamily: F.mono, fontSize: 12, color: '#8b251e', fontWeight: 700}}>
              DISCREPANCY DETECTED
            </div>
          </div>

          {/* Table column headers */}
          <div style={{display: 'flex', marginTop: 16, borderBottom: '1.5px solid #8e795c', paddingBottom: 6, fontFamily: F.mono, fontSize: 11, fontWeight: 700, color: '#6b583e', letterSpacing: '0.1em'}}>
            <div style={{width: 90}}>LOCATION</div>
            <div style={{flex: 1}}>MERCHANDISE DESCRIPTION</div>
            <div style={{width: 100, textAlign: 'right'}}>BOOK COUNT</div>
            <div style={{width: 110, textAlign: 'right'}}>ACTUAL ON SHELF</div>
            <div style={{width: 110, textAlign: 'right'}}>VARIANCE</div>
          </div>

          {/* Table rows */}
          <div style={{marginTop: 8}}>
            {rows.map((r, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '11px 0',
                  borderBottom: '1px dashed rgba(110,90,60,0.25)',
                  fontFamily: F.mono,
                  fontSize: 13,
                  color: '#262016',
                }}
              >
                <div style={{width: 90, color: '#7a6549'}}>{r.aisle}</div>
                <div style={{flex: 1, fontFamily: F.sans, fontWeight: 500, fontSize: 14}}>{r.item}</div>
                <div style={{width: 100, textAlign: 'right', color: '#544634'}}>{r.exp}</div>
                <div style={{width: 110, textAlign: 'right', fontWeight: 700, color: r.err ? '#ab231a' : '#2b573a'}}>
                  {r.act}
                </div>
                <div style={{width: 110, textAlign: 'right', fontWeight: 700, color: r.err ? '#ab231a' : '#2b573a'}}>
                  {r.diff}
                </div>
              </div>
            ))}
          </div>

          {/* Red grease-pencil hand-drawn circle over unknown row */}
          <svg style={abs({left: 450, top: 120, width: 380, height: 160, pointerEvents: 'none'})}>
            <ellipse
              cx={240}
              cy={46}
              rx={110}
              ry={32}
              fill="none"
              stroke="#cc291e"
              strokeWidth={3.5}
              strokeDasharray={`${circleProgress * 500} 500`}
              strokeLinecap="round"
              transform="rotate(-4 240 46)"
              opacity={circleProgress}
            />
          </svg>

          {/* Red handwritten grease pencil note */}
          <div
            style={abs({
              right: 36,
              bottom: 24,
              fontFamily: F.serif,
              fontStyle: 'italic',
              fontWeight: 600,
              fontSize: 20,
              color: '#ab231a',
              transform: 'rotate(-3deg)',
              opacity: prog(t, 1.4, 2.0),
            })}
          >
            “Nobody knows what is sitting on these shelves.”
          </div>
        </div>
      </div>

      {/* Atmospheric darkness overlay around the document */}
      <div style={{...fill, background: 'radial-gradient(ellipse at 50% 50%, rgba(11,13,18,0) 45%, rgba(11,13,18,0.7) 100%)', pointerEvents: 'none'}} />
    </div>
  );
};

/* ===================== 3.0 – 6.2  SCENE 2: THE DREXEL CORRIDOR & DEAN'S DOOR ===================== */
const DrexelCorridor: React.FC<{t: number}> = ({t}) => {
  if (t < 2.9 || t > 6.4) return null;
  const a = win(t, 3.0, 6.2, 0.4, 0.4);
  const zoom = eio(t, 3.0, 5.8);
  const sc = lerp(0.85, 1.05, zoom);
  const lampFlicker = 0.95 + 0.05 * Math.sin(t * 14);

  return (
    <div style={{...fill, opacity: a}}>
      <div style={{...fill, transform: `scale(${sc})`, transformOrigin: '50% 50%'}}>
        {/* Polished parquet / checkerboard hallway perspective */}
        <svg style={fill} width={W} height={H}>
          {/* Ceiling and floor perspective lines converging to office center (960, 500) */}
          <line x1={0} y1={0} x2={740} y2={420} stroke={C.bone} strokeOpacity={0.16} strokeWidth={2} />
          <line x1={W} y1={0} x2={1180} y2={420} stroke={C.bone} strokeOpacity={0.16} strokeWidth={2} />
          <line x1={0} y1={H} x2={740} y2={760} stroke={C.bone} strokeOpacity={0.25} strokeWidth={2} />
          <line x1={W} y1={H} x2={1180} y2={760} stroke={C.bone} strokeOpacity={0.25} strokeWidth={2} />

          {/* Wall Wainscot moldings */}
          <polygon points="0,520 740,520 740,760 0,H" fill="#131722" fillOpacity={0.8} />
          <polygon points="1920,520 1180,520 1180,760 1920,H" fill="#131722" fillOpacity={0.8} />
          <line x1={0} y1={520} x2={740} y2={520} stroke={C.bone} strokeOpacity={0.15} strokeWidth={2} />
          <line x1={W} y1={520} x2={1180} y2={520} stroke={C.bone} strokeOpacity={0.15} strokeWidth={2} />

          {/* Floor tile reflections */}
          {Array.from({length: 8}).map((_, i) => {
            const y = lerp(760, 1080, Math.pow((i + 1) / 8, 1.8));
            return (
              <line key={i} x1={lerp(740, 0, (y - 760) / 320)} y1={y} x2={lerp(1180, W, (y - 760) / 320)} y2={y} stroke={C.bone} strokeOpacity={0.08} strokeWidth={1} />
            );
          })}
        </svg>

        {/* Overhead amber lantern glow */}
        <div style={abs({left: 960 - 300, top: 100, width: 600, height: 420, background: `radial-gradient(ellipse at 50% 15%, rgba(245,184,74,${0.28 * lampFlicker}) 0%, rgba(0,0,0,0) 70%)`, pointerEvents: 'none'})} />

        {/* Vintage wall sconce */}
        <div style={abs({left: 960 - 20, top: 220, width: 40, height: 60, borderRadius: 6, background: '#8a6a2a', border: '1px solid #f5b84a'})}>
          <div style={abs({left: 10, top: 12, width: 20, height: 28, borderRadius: '50%', background: '#fff2cb', boxShadow: '0 0 30px #f5b84a'})} />
        </div>

        {/* The Dean's Office Doorway */}
        <div
          style={abs({
            left: 960 - 220,
            top: 500 - 240,
            width: 440,
            height: 520,
            borderRadius: '6px 6px 0 0',
            background: 'linear-gradient(180deg,#191e2b,#0e111a)',
            border: '8px solid rgba(242,239,230,0.25)',
            boxShadow: '0 40px 90px rgba(0,0,0,0.9), inset 0 0 50px rgba(0,0,0,0.7)',
          })}
        >
          {/* Frosted Ribbed Glass Window with Backlight Silhouette */}
          <div
            style={abs({
              left: 36,
              top: 36,
              right: 36,
              height: 260,
              borderRadius: 4,
              background: 'radial-gradient(ellipse at 50% 50%, rgba(245,200,120,0.35) 0%, rgba(200,150,70,0.12) 100%)',
              border: '2px solid rgba(245,184,74,0.4)',
              boxShadow: 'inset 0 0 35px rgba(245,184,74,0.3)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              overflow: 'hidden',
            })}
          >
            {/* Silhouettes of the two men talking inside behind the frosted glass */}
            <svg style={abs({left: 0, top: 0, width: 360, height: 260, opacity: 0.65})}>
              {/* Executive standing, leaning forward */}
              <circle cx={110} cy={110} r={28} fill="#0d1017" />
              <path d="M70,260 L70,165 Q110,140 145,165 L150,260 Z" fill="#0d1017" />
              {/* Dean sitting behind desk */}
              <circle cx={250} cy={130} r={26} fill="#0d1017" />
              <path d="M210,260 L215,180 Q250,165 285,180 L290,260 Z" fill="#0d1017" />
              {/* Desk silhouette line */}
              <rect x={140} y={190} width={180} height={70} fill="#0a0c12" />
            </svg>

            {/* Gold leaf hand-lettered text on frosted door glass */}
            <div style={{position: 'relative', zIndex: 2, textAlign: 'center'}}>
              <div style={{fontFamily: F.serif, fontStyle: 'italic', fontSize: 13, letterSpacing: '0.3em', color: C.sand, opacity: 0.9}}>
                DREXEL INSTITUTE OF TECHNOLOGY
              </div>
              <div style={{fontFamily: F.serif, fontWeight: 700, fontSize: 24, letterSpacing: '0.15em', color: C.bone, marginTop: 8}}>
                OFFICE OF THE DEAN
              </div>
              <div style={{width: 70, height: 2, background: C.sand, opacity: 0.6, margin: '12px auto'}} />
              <div style={{fontFamily: F.mono, fontSize: 10, letterSpacing: '0.4em', color: C.bone, opacity: 0.6}}>
                DIVISION OF ENGINEERING
              </div>
            </div>
          </div>

          {/* Lower Door Panel with brass knob */}
          <div style={abs({left: 36, bottom: 36, right: 36, height: 160, border: '2px solid rgba(242,239,230,0.14)', borderRadius: 4, background: 'rgba(0,0,0,0.35)'})}>
            <div style={abs({left: 28, top: 68, width: 22, height: 22, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%,#ffe4a0,#947432)', boxShadow: '0 4px 12px rgba(0,0,0,0.8)'})} />
          </div>
        </div>

        {/* Date stamp in floor reflection */}
        <div style={abs({left: 0, width: W, top: 880, textAlign: 'center', fontFamily: F.mono, fontSize: 16, letterSpacing: '0.5em', color: C.sand, opacity: 0.5})}>
          PHILADELPHIA, 1948
        </div>
      </div>
    </div>
  );
};

/* ===================== 5.0 – 9.8  SCENE 3: THE MONUMENTAL QUESTION & BLUEPRINT ===================== */
const TheMonumentalQuestion: React.FC<{t: number}> = ({t}) => {
  if (t < 4.9 || t > 9.9) return null;
  const a = win(t, 5.0, 9.8, 0.4, 0.4);
  const qProg = eo(t, 5.1, 7.2);
  const beamX = lerp(480, 1440, eio(t, 6.4, 9.4));
  const gridSpin = (t - 5.0) * 8;

  return (
    <div style={{...fill, opacity: a, background: 'radial-gradient(ellipse at 50% 50%, #0d1726 0%, #080c14 80%)'}}>
      {/* 1948 Blueprint Grid & Technical Drafting Coordinate Marks */}
      <svg style={fill} width={W} height={H}>
        <defs>
          <pattern id="blueGrid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(91,141,239,0.08)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#blueGrid)" />

        {/* Large technical compass angle arcs */}
        <circle cx={960} cy={540} r={420} fill="none" stroke={C.blue} strokeWidth={1.5} strokeOpacity={0.18} strokeDasharray="6 12" transform={`rotate(${gridSpin} 960 540)`} />
        <circle cx={960} cy={540} r={280} fill="none" stroke={C.sand} strokeWidth={1} strokeOpacity={0.2} strokeDasharray="4 8" transform={`rotate(${-gridSpin * 0.7} 960 540)`} />
      </svg>

      {/* The Question Text in Grand Editorial Typography */}
      <div style={abs({left: 200, top: 160, width: 1520, textAlign: 'center'})}>
        <div style={{fontFamily: F.mono, fontSize: 15, letterSpacing: '0.5em', color: C.sand, opacity: 0.85, textTransform: 'uppercase'}}>
          The Question Overheard in a Hallway
        </div>
        <div
          style={{
            fontFamily: F.serif,
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 74,
            lineHeight: 1.25,
            color: C.bone,
            marginTop: 20,
            letterSpacing: '-0.01em',
            textShadow: '0 8px 34px rgba(0,0,0,0.85)',
          }}
        >
          “Could you build a way for a store<br />to read a product automatically?”
        </div>
      </div>

      {/* Blueprint Schematic: Vacuum Phototube Optical Scanner Concept */}
      <div style={abs({left: 960 - 450, bottom: 120, width: 900, height: 260, opacity: prog(t, 6.0, 6.8)})}>
        <svg width={900} height={260} style={{display: 'block'}}>
          {/* Conveyor track bed */}
          <line x1={60} y1={200} x2={840} y2={200} stroke={C.bone} strokeWidth={3} strokeOpacity={0.4} />
          {Array.from({length: 22}).map((_, i) => (
            <circle key={i} cx={75 + i * 36} cy={200} r={4.5} fill={C.bone} fillOpacity={0.25} />
          ))}

          {/* Optical Sensor Assembly (Phototube + Lens Housing) */}
          <rect x={410} y={20} width={80} height={70} rx={6} fill="#141c2c" stroke={C.sand} strokeWidth={2} />
          <circle cx={450} cy={55} r={22} fill="none" stroke={C.blue} strokeWidth={2} strokeOpacity={0.8} />
          <circle cx={450} cy={55} r={6} fill={C.amber} />
          {/* Lens cone */}
          <polygon points="415,90 485,90 535,145 365,145" fill="none" stroke={C.sand} strokeWidth={1.5} strokeOpacity={0.7} strokeDasharray="3 3" />

          {/* Optical Ray Cone striking the moving goods */}
          <polygon points="420,90 480,90 620,195 280,195" fill="url(#opticalRay)" opacity={0.4} />

          {/* The moving grocery item */}
          <rect x={beamX - 600} y={135} width={110} height={65} rx={4} fill="#1b2436" stroke={C.bone} strokeWidth={2} strokeOpacity={0.8} />
          <line x1={beamX - 580} y1={155} x2={beamX - 510} y2={155} stroke={C.sand} strokeWidth={2} strokeOpacity={0.6} />
          <line x1={beamX - 580} y1={170} x2={beamX - 530} y2={170} stroke={C.bone} strokeWidth={2} strokeOpacity={0.4} />

          {/* Ray hits package reticle */}
          <circle cx={450} cy={165} r={18} fill="none" stroke={C.blue} strokeWidth={2} strokeDasharray="4 4" />

          <defs>
            <linearGradient id="opticalRay" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5b8def" stopOpacity={0.85} />
              <stop offset="100%" stopColor="#5b8def" stopOpacity={0} />
            </linearGradient>
          </defs>
        </svg>

        {/* Blueprint annotation labels */}
        <div style={abs({left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'space-between', fontFamily: F.mono, fontSize: 12, color: C.blue, letterSpacing: '0.3em'})}>
          <span>FIG 01. VACUUM PHOTOCELL PICKUP</span>
          <span>OPTICAL TARGETING AXIS</span>
          <span>THEORETICAL SPEED: 120 UNITS/MIN</span>
        </div>
      </div>
    </div>
  );
};

/* ===================== 9.4 – 11.8  SCENE 4: THE DEAN SAYS NO ===================== */
const TheDeanSaysNo: React.FC<{t: number}> = ({t}) => {
  if (t < 9.3 || t > 11.9) return null;
  const a = win(t, 9.4, 11.8, 0.15, 0.3);
  const slam = eb(t, 9.55, 9.85);
  const flash = prog(t, 9.66, 9.75) * (1 - prog(t, 9.75, 10.3));

  return (
    <div style={{...fill, opacity: a}}>
      {/* Shockwave flash on refusal */}
      <div style={{...fill, background: C.red, opacity: flash * 0.22}} />

      <div style={abs({left: 0, top: 0, width: W, height: H, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'})}>
        <div style={{fontFamily: F.mono, fontSize: 18, letterSpacing: '0.6em', color: C.sand, opacity: 0.6, marginBottom: 16}}>
          DREXEL INSTITUTE DEAN'S DECISION
        </div>
        {/* Massive typographic NO */}
        <div
          style={{
            fontFamily: F.serif,
            fontWeight: 700,
            fontSize: 280,
            lineHeight: 0.85,
            color: C.bone,
            letterSpacing: '-0.02em',
            transform: `scale(${lerp(1.3, 1.0, slam)})`,
            textShadow: '0 25px 90px rgba(0,0,0,0.95)',
          }}
        >
          “No.”
        </div>

        {/* Official rejection rubber stamp */}
        <div
          style={{
            marginTop: 40,
            padding: '10px 32px',
            border: `3px solid ${C.red}`,
            color: C.red,
            fontFamily: F.mono,
            fontWeight: 700,
            fontSize: 22,
            letterSpacing: '0.45em',
            borderRadius: 8,
            transform: 'rotate(-4deg)',
            opacity: prog(t, 9.8, 10.15),
            boxShadow: '0 8px 30px rgba(255,77,61,0.25)',
          }}
        >
          RESEARCH DECLINED — OUT OF REACH
        </div>
      </div>
    </div>
  );
};

/* ===================== 11.3 – 21.8  SCENE 5: SILVER, WOODLAND & OBSESSION ===================== */
const SilverAndWoodland: React.FC<{t: number}> = ({t}) => {
  if (t < 11.2 || t > 21.9) return null;
  const a = win(t, 11.3, 21.8, 0.4, 0.5);

  // Soundwave ripples under door (t 11.3 - 14.5)
  const soundWave = lerp(60, 900, eo(t, 11.4, 14.2));
  const soundOp = 1 - prog(t, 13.8, 15.2);

  // Silver card entrance (t 11.6)
  const silverPop = eb(t, 11.5, 12.3);

  // Transmission pulse from Silver to Woodland (t 16.3 - 17.8)
  const wireProg = eo(t, 16.2, 17.6);
  const sparkX = lerp(640, 1280, wireProg);

  // Woodland card entrance (t 17.2)
  const woodPop = eb(t, 17.1, 17.9);

  // Woodland obsession spiral loop (t 19.5 - 21.8)
  const obsess = prog(t, 19.5, 20.8);
  const rotLoop = (t - 19.5) * 160;

  return (
    <div style={{...fill, opacity: a}}>
      {/* Soundwaves rippling from the Dean's doorway on the left edge */}
      <svg style={fill} width={W} height={H}>
        <circle cx={80} cy={540} r={soundWave} fill="none" stroke={C.amber} strokeWidth={2.5} strokeOpacity={soundOp * 0.7} strokeDasharray="8 8" />
        <circle cx={80} cy={540} r={soundWave * 0.75} fill="none" stroke={C.amber} strokeWidth={1.5} strokeOpacity={soundOp * 0.45} />
        <circle cx={80} cy={540} r={soundWave * 0.5} fill="none" stroke={C.amber} strokeWidth={1} strokeOpacity={soundOp * 0.25} />

        {/* Transmission link between Silver & Woodland */}
        {wireProg > 0 && (
          <>
            <line x1={640} y1={540} x2={sparkX} y2={540} stroke={C.sand} strokeWidth={3} strokeDasharray="6 6" strokeOpacity={0.8} />
            <circle cx={sparkX} cy={540} r={8} fill={C.amber} style={{filter: 'drop-shadow(0 0 12px #f5b84a)'}} />
          </>
        )}
      </svg>

      {/* CARD 1: BERNARD SILVER (Left Side) */}
      <div
        style={abs({
          left: 420 - 200,
          top: 540 - 270,
          width: 400,
          height: 540,
          opacity: silverPop,
          transform: `scale(${0.8 + 0.2 * silverPop})`,
        })}
      >
        <div
          style={abs({
            inset: 0,
            borderRadius: 16,
            background: 'linear-gradient(165deg,#1b202e,#10131d)',
            border: '2px solid rgba(245,184,74,0.4)',
            boxShadow: '0 30px 70px rgba(0,0,0,0.7), inset 1.5px 1.5px 0 rgba(255,255,255,0.1)',
            padding: 32,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          })}
        >
          {/* Institutional Stamp Header */}
          <div style={{fontFamily: F.mono, fontSize: 11, letterSpacing: '0.35em', color: C.sand, opacity: 0.85}}>
            DREXEL GRADUATE DIVISION
          </div>

          {/* Silhouette Portrait Badge */}
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%,#2b344a,#121622)',
              border: '2px solid rgba(242,239,230,0.3)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              marginTop: 20,
              boxShadow: '0 10px 24px rgba(0,0,0,0.5)',
            }}
          >
            {/* Vintage glasses silhouette */}
            <svg width={80} height={40} viewBox="0 0 80 40">
              <circle cx={24} cy={20} r={16} fill="none" stroke={C.bone} strokeWidth={2.5} />
              <circle cx={56} cy={20} r={16} fill="none" stroke={C.bone} strokeWidth={2.5} />
              <path d="M40,20 Q40,14 40,20" stroke={C.bone} strokeWidth={2} />
              <line x1={40} y1={17} x2={40} y2={17} stroke={C.bone} strokeWidth={2} />
              <line x1={8} y1={20} x2={0} y2={16} stroke={C.bone} strokeWidth={2} />
              <line x1={72} y1={20} x2={80} y2={16} stroke={C.bone} strokeWidth={2} />
            </svg>
            {/* Concentric sound-reception rings */}
            <div style={abs({inset: -8, borderRadius: '50%', border: '1.5px dashed rgba(245,184,74,0.6)'})} />
          </div>

          <div style={{fontFamily: F.serif, fontWeight: 700, fontSize: 30, color: C.bone, marginTop: 24, textAlign: 'center'}}>
            Bernard Silver
          </div>
          <div style={{fontFamily: F.mono, fontSize: 12, letterSpacing: '0.28em', color: C.sand, marginTop: 6}}>
            ELECTRICAL ENGINEERING
          </div>
          <div style={{width: 60, height: 2, background: C.bone, opacity: 0.2, margin: '18px 0'}} />
          <div style={{fontFamily: F.sans, fontSize: 15, color: C.bone, opacity: 0.8, textAlign: 'center', lineHeight: 1.45}}>
            Standing close enough to overhear the dean say no.
          </div>
        </div>
      </div>

      {/* CARD 2: NORMAN JOSEPH WOODLAND (Right Side) */}
      <div
        style={abs({
          left: 1500 - 200,
          top: 540 - 270,
          width: 400,
          height: 540,
          opacity: woodPop,
          transform: `scale(${0.8 + 0.2 * woodPop})`,
        })}
      >
        <div
          style={abs({
            inset: 0,
            borderRadius: 16,
            background: 'linear-gradient(165deg,#1b202e,#10131d)',
            border: `2px solid rgba(${obsess > 0 ? '255,77,61' : '91,141,239'}, 0.55)`,
            boxShadow: `0 30px 70px rgba(0,0,0,0.7), 0 0 ${70 * obsess}px rgba(255,77,61,${0.45 * obsess})`,
            padding: 32,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          })}
        >
          {/* Header */}
          <div style={{fontFamily: F.mono, fontSize: 11, letterSpacing: '0.35em', color: obsess > 0 ? C.red : C.blue, opacity: 0.9}}>
            {obsess > 0 ? 'THE INVENTOR POSSESSED' : 'MECHANICAL ENGINEERING FACULTY'}
          </div>

          {/* Portrait frame with spinning mental gears */}
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%,#2b344a,#121622)',
              border: `2px solid ${obsess > 0 ? C.red : C.bone}`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              marginTop: 20,
              boxShadow: '0 10px 24px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{fontFamily: F.mono, fontSize: 32, fontWeight: 700, color: C.bone}}>NJW</div>

            {/* Obsessive spinning mathematical gear spirals */}
            {obsess > 0 && (
              <svg style={abs({inset: -36, width: 212, height: 212, transform: `rotate(${rotLoop}deg)`})}>
                <circle cx={106} cy={106} r={86} fill="none" stroke={C.red} strokeWidth={2.5} strokeDasharray="14 10" strokeOpacity={0.85} />
                <circle cx={106} cy={106} r={98} fill="none" stroke={C.amber} strokeWidth={1.5} strokeDasharray="6 18" strokeOpacity={0.7} />
              </svg>
            )}
          </div>

          <div style={{fontFamily: F.serif, fontWeight: 700, fontSize: 28, color: C.bone, marginTop: 24, textAlign: 'center'}}>
            Norman Woodland
          </div>
          <div style={{fontFamily: F.mono, fontSize: 12, letterSpacing: '0.25em', color: obsess > 0 ? C.red : C.blue, marginTop: 6}}>
            {obsess > 0 ? '“CANNOT LET IT GO”' : 'MANHATTAN PROJECT VETERAN'}
          </div>
          <div style={{width: 60, height: 2, background: C.bone, opacity: 0.2, margin: '18px 0'}} />
          <div style={{fontFamily: F.sans, fontSize: 15, color: C.bone, opacity: 0.85, textAlign: 'center', lineHeight: 1.45}}>
            {obsess > 0 ? (
              <span style={{color: C.amber, fontWeight: 600}}>
                A problem that grips his mind completely.
              </span>
            ) : (
              'Silver tells his friend. The partnership begins.'
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ===================== 21.5 – 27.5  SCENE 6: ULTRAVIOLET INK EXPERIMENT & THE FAILURE ===================== */
const UltravioletExperiment: React.FC<{t: number}> = ({t}) => {
  if (t < 21.4) return null;
  const a = prog(t, 21.5, 22.3);

  // 365nm UV Blacklight lamp turns on (t 22.2 - 23.4)
  const lampOn = prog(t, 22.2, 23.4);

  // Thermal ink failure & bleed (t 25.4 - 27.2)
  const bleed = prog(t, 25.4, 27.0);
  const blurAmount = lerp(0, 32, bleed);
  const smearY = lerp(0, 48, bleed);

  // Burnout flicker and death (t 26.68 - 27.45)
  const dying = prog(t, 26.68, 27.45);
  const flicker = dying > 0 ? (Math.sin(t * 42) > 0 ? 0.25 : 0.85) * (1 - dying) : 1;

  return (
    <div
      style={{
        ...fill,
        opacity: a * flicker,
        background: `radial-gradient(ellipse at 50% 50%, rgba(147,51,234,${0.38 * lampOn}) 0%, ${C.ink} 78%)`,
      }}
    >
      {/* 365nm UV Blacklight Lamp Cone from above */}
      <div
        style={abs({
          left: 960 - 500,
          top: 0,
          width: 1000,
          height: 640,
          background: 'linear-gradient(180deg, rgba(168,85,247,0.45) 0%, rgba(168,85,247,0.12) 65%, rgba(0,0,0,0) 100%)',
          clipPath: 'polygon(38% 0%, 62% 0%, 100% 100%, 0% 100%)',
          opacity: lampOn,
          pointerEvents: 'none',
        })}
      />

      {/* Lab Bench: Test Package with Fluorescent UV Ink Bars */}
      <div
        style={abs({
          left: 960 - 320,
          top: 540 - 200,
          width: 640,
          height: 420,
          borderRadius: 14,
          background: 'linear-gradient(160deg,#1c1b28,#0e0d16)',
          border: '2px solid rgba(168,85,247,0.35)',
          boxShadow: `0 40px 90px rgba(0,0,0,0.85), 0 0 ${140 * lampOn}px rgba(168,85,247,${0.4 * lampOn})`,
          padding: 40,
          overflow: 'hidden',
        })}
      >
        {/* Lab Specimen Tag */}
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div>
            <div style={{fontFamily: F.mono, fontSize: 13, letterSpacing: '0.3em', color: '#c084fc', fontWeight: 700}}>
              WOODLAND-SILVER EXPERIMENT 01
            </div>
            <div style={{fontFamily: F.mono, fontSize: 11, color: C.bone, opacity: 0.5, marginTop: 3}}>
              PIGMENT: SYNTHETIC FLUORESCENT DYES
            </div>
          </div>
          <div style={{fontFamily: F.mono, fontSize: 12, color: '#38bdf8', letterSpacing: '0.2em'}}>
            λ = 365nm
          </div>
        </div>

        {/* The Glowing Fluorescent Ink Pattern (blurs & bleeds under heat) */}
        <div
          style={{
            marginTop: 48,
            filter: `blur(${blurAmount}px)`,
            transform: `translateY(${smearY}px)`,
            transition: 'filter 0.1s',
          }}
        >
          <svg width={560} height={140} viewBox="0 0 560 140">
            {Array.from({length: 32}).map((_, i) => {
              const x = 20 + i * 16.5;
              const w = i % 5 === 0 ? 9 : i % 2 === 0 ? 6 : 3;
              return (
                <rect
                  key={i}
                  x={x}
                  y={15}
                  width={w + bleed * 10}
                  height={110 + (bleed > 0 ? (i % 3) * 15 * bleed : 0)}
                  fill="#c084fc"
                  fillOpacity={0.95}
                  style={{
                    filter: `drop-shadow(0 0 ${16 + bleed * 12}px #a855f7)`,
                  }}
                />
              );
            })}
          </svg>
        </div>

        {/* Oscilloscope Signal Monitor / Error Warning */}
        {bleed > 0 && (
          <div
            style={abs({
              left: 40,
              bottom: 24,
              right: 40,
              padding: '10px 20px',
              background: 'rgba(255,77,61,0.25)',
              border: `1.5px solid ${C.red}`,
              borderRadius: 8,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: F.mono,
              fontSize: 13,
              color: C.bone,
              opacity: prog(t, 25.8, 26.5),
            })}
          >
            <span style={{color: C.red, fontWeight: 700}}>ERROR: THERMAL BLEED</span>
            <span>INK SMUDGES UNDER INCANDESCENCE</span>
          </div>
        )}
      </div>

      {/* Editorial Header */}
      <div style={abs({left: 0, width: W, top: 140, textAlign: 'center', opacity: lampOn})}>
        <div style={{fontFamily: F.mono, fontSize: 16, letterSpacing: '0.45em', color: '#c084fc', textTransform: 'uppercase'}}>
          Their First Hypothesis
        </div>
        <div style={{fontFamily: F.serif, fontStyle: 'italic', fontSize: 68, color: C.bone, marginTop: 8}}>
          Ink that glows under ultraviolet light.
        </div>
      </div>

      {/* "It doesn't work." stamp upon total failure */}
      {t > 26.65 && (
        <div
          style={abs({
            left: 0,
            width: W,
            top: 540 - 60,
            textAlign: 'center',
            fontFamily: F.serif,
            fontWeight: 700,
            fontSize: 104,
            color: C.red,
            letterSpacing: '0.04em',
            textShadow: '0 15px 50px rgba(0,0,0,0.95)',
          })}
        >
          It doesn't work.
        </div>
      )}
    </div>
  );
};

/* ================================== ROOT COMPOSITION ================================== */
export const Segment03: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;

  return (
    <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 45%, ${C.ink2} 0%, ${C.ink} 72%)`}}>
      <Audio src={staticFile('audio/seg03.wav')} />
      <InventoryLedger t={t} />
      <DrexelCorridor t={t} />
      <TheMonumentalQuestion t={t} />
      <TheDeanSaysNo t={t} />
      <SilverAndWoodland t={t} />
      <UltravioletExperiment t={t} />
      <Overlays frame={frame} />
      <Subs t={t} sentences={sentences} words={WORDS} />
    </AbsoluteFill>
  );
};
