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

/* ===================== 0.0 – 3.6  SCENE 1: THE BLIND SHELVES ===================== */
const Shelves: React.FC<{t: number}> = ({t}) => {
  if (t > 3.6) return null;
  const a = win(t, 0.0, 3.6, 0.2, 0.5);
  const sc = lerp(1.08, 1.0, eo(t, 0, 3.4));
  const glitch = rnd(Math.floor(t * 12)) > 0.82;

  // 3 shelving levels with unidentifiable cartons
  const shelfY = [340, 560, 780];
  const boxes = [
    {x: 260, y: 340, w: 140, h: 160, id: 'A-12', err: true},
    {x: 430, y: 340, w: 180, h: 130, id: 'A-13', err: false},
    {x: 640, y: 340, w: 120, h: 170, id: 'A-14', err: true},
    {x: 790, y: 340, w: 200, h: 140, id: 'A-15', err: false},
    {x: 1020, y: 340, w: 160, h: 155, id: 'A-16', err: true},
    {x: 1210, y: 340, w: 130, h: 160, id: 'A-17', err: false},
    {x: 1370, y: 340, w: 190, h: 145, id: 'A-18', err: true},
    {x: 1590, y: 340, w: 150, h: 170, id: 'A-19', err: false},

    {x: 220, y: 560, w: 210, h: 150, id: 'B-04', err: false},
    {x: 460, y: 560, w: 150, h: 165, id: 'B-05', err: true},
    {x: 640, y: 560, w: 170, h: 140, id: 'B-06', err: false},
    {x: 840, y: 560, w: 190, h: 160, id: 'B-07', err: true},
    {x: 1060, y: 560, w: 130, h: 150, id: 'B-08', err: false},
    {x: 1220, y: 560, w: 180, h: 140, id: 'B-09', err: true},
    {x: 1430, y: 560, w: 160, h: 160, id: 'B-10', err: false},
    {x: 1620, y: 560, w: 170, h: 150, id: 'B-11', err: true},

    {x: 280, y: 780, w: 160, h: 150, id: 'C-21', err: true},
    {x: 470, y: 780, w: 180, h: 160, id: 'C-22', err: false},
    {x: 680, y: 780, w: 140, h: 145, id: 'C-23', err: true},
    {x: 850, y: 780, w: 170, h: 155, id: 'C-24', err: false},
    {x: 1050, y: 780, w: 200, h: 150, id: 'C-25', err: true},
    {x: 1280, y: 780, w: 150, h: 160, id: 'C-26', err: false},
    {x: 1460, y: 780, w: 170, h: 140, id: 'C-27', err: true},
  ];

  return (
    <div style={{...fill, opacity: a, transform: `scale(${sc})`, transformOrigin: '50% 50%'}}>
      {/* Background shadow & warehouse ceiling girder lines */}
      <svg style={fill} width={W} height={H}>
        <defs>
          <linearGradient id="beamG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(242,239,230,0.08)" />
            <stop offset="100%" stopColor="rgba(242,239,230,0)" />
          </linearGradient>
        </defs>
        {/* Vertical shelf supports */}
        {[180, 520, 860, 1200, 1540, 1780].map((x, i) => (
          <line key={i} x1={x} y1={120} x2={x} y2={960} stroke={C.bone} strokeOpacity={0.12} strokeWidth={4} />
        ))}
        {/* Horizontal shelf planks */}
        {shelfY.map((y, i) => (
          <g key={i}>
            <rect x={120} y={y} width={1680} height={12} fill={C.bone} fillOpacity={0.18} />
            <rect x={120} y={y + 12} width={1680} height={4} fill={C.bone} fillOpacity={0.06} />
          </g>
        ))}
      </svg>

      {/* Cartons sitting on shelves */}
      {boxes.map((b, i) => {
        const p = prog(t, 0.05 + i * 0.03, 0.35 + i * 0.03);
        const tag = (Math.floor(rnd(i * 17.3 + Math.floor(t * 3)) * 89) + 10);
        return (
          <div key={i} style={abs({left: b.x, top: b.y - b.h, width: b.w, height: b.h, opacity: p})}>
            {/* Box body */}
            <div
              style={abs({
                inset: 0,
                borderRadius: 4,
                background: b.err ? 'linear-gradient(170deg,#1b202e,#111520)' : 'linear-gradient(170deg,#242836,#151822)',
                border: `1.5px solid rgba(242,239,230,${b.err ? 0.15 : 0.08})`,
                boxShadow: '0 12px 24px rgba(0,0,0,0.5)',
              })}
            >
              {/* Ghost question mark or unknown identifier */}
              <div
                style={abs({
                  left: 0,
                  right: 0,
                  top: b.h * 0.28,
                  textAlign: 'center',
                  fontFamily: F.mono,
                  fontSize: b.err ? 26 : 18,
                  fontWeight: 700,
                  color: b.err ? (glitch ? C.red : C.sand) : C.bone,
                  opacity: b.err ? 0.8 : 0.25,
                })}
              >
                {b.err ? (t > 1.2 ? '?' : `QTY: ${tag}`) : `SKU-${tag}`}
              </div>
              {/* Jittery status bar */}
              <div
                style={abs({
                  left: 12,
                  right: 12,
                  bottom: 12,
                  height: 3,
                  background: b.err ? C.red : C.bone,
                  opacity: b.err ? 0.6 : 0.15,
                })}
              />
            </div>
          </div>
        );
      })}

      {/* HUD overlay: INVENTORY BLINDNESS */}
      <div style={abs({left: 120, top: 140, fontFamily: F.mono, color: C.bone})}>
        <div style={{fontSize: 14, letterSpacing: '0.45em', opacity: 0.5}}>STOCK LEVEL RECORD</div>
        <div style={{fontSize: 54, fontWeight: 700, color: C.red, letterSpacing: '0.05em', marginTop: 4}}>
          {t > 1.4 ? 'UNACCOUNTED' : 'COUNT MISMATCH'}
        </div>
      </div>
      <div style={abs({right: 160, top: 150, textAlign: 'right', fontFamily: F.mono, fontSize: 16, color: C.sand, opacity: 0.7})}>
        <div>STORE INVENTORY : BLIND</div>
        <div style={{color: C.bone, opacity: 0.4, marginTop: 4}}>1948 RETAIL ARCHITECTURE</div>
      </div>
    </div>
  );
};

/* ===================== 3.0 – 6.0  SCENE 2: THE DEAN'S CORRIDOR ===================== */
const DeanCorridor: React.FC<{t: number}> = ({t}) => {
  if (t < 2.9 || t > 6.2) return null;
  const a = win(t, 3.0, 6.0, 0.4, 0.4);
  const zoom = eio(t, 3.0, 5.8);
  const sc = lerp(0.88, 1.08, zoom);
  const lampGlow = 0.8 + 0.15 * Math.sin(t * 8);

  return (
    <div style={{...fill, opacity: a}}>
      <div style={{...fill, transform: `scale(${sc})`, transformOrigin: '50% 50%'}}>
        {/* Hallway perspective floor & ceiling */}
        <svg style={fill} width={W} height={H}>
          {/* Hallway perspective lines converging to center */}
          <line x1={0} y1={0} x2={680} y2={380} stroke={C.bone} strokeOpacity={0.14} strokeWidth={2} />
          <line x1={W} y1={0} x2={1240} y2={380} stroke={C.bone} strokeOpacity={0.14} strokeWidth={2} />
          <line x1={0} y1={H} x2={680} y2={760} stroke={C.bone} strokeOpacity={0.18} strokeWidth={2} />
          <line x1={W} y1={H} x2={1240} y2={760} stroke={C.bone} strokeOpacity={0.18} strokeWidth={2} />

          {/* Wall panel moldings */}
          {[200, 420, 600].map((y, i) => (
            <line key={i} x1={0} y1={y} x2={680} y2={380 + (y / H) * 380} stroke={C.bone} strokeOpacity={0.08} strokeWidth={1.5} />
          ))}
          {[200, 420, 600].map((y, i) => (
            <line key={i} x1={W} y1={y} x2={1240} y2={380 + (y / H) * 380} stroke={C.bone} strokeOpacity={0.08} strokeWidth={1.5} />
          ))}
        </svg>

        {/* Overhead amber hallway lamp casting cone of light */}
        <div style={abs({left: 960 - 240, top: 120, width: 480, height: 320, background: `radial-gradient(ellipse at 50% 10%, rgba(245,184,74,${0.24 * lampGlow}) 0%, rgba(0,0,0,0) 70%)`, pointerEvents: 'none'})} />

        {/* The Dean's Door at the end of the hall */}
        <div
          style={abs({
            left: 960 - 230,
            top: 540 - 290,
            width: 460,
            height: 580,
            borderRadius: '6px 6px 0 0',
            background: 'linear-gradient(180deg,#181c28,#0c0e14)',
            border: '8px solid rgba(242,239,230,0.22)',
            boxShadow: '0 40px 90px rgba(0,0,0,0.8), inset 0 0 60px rgba(0,0,0,0.6)',
          })}
        >
          {/* Frosted glass top pane */}
          <div
            style={abs({
              left: 40,
              top: 40,
              right: 40,
              height: 280,
              borderRadius: 4,
              background: 'linear-gradient(145deg,rgba(245,215,160,0.18),rgba(242,239,230,0.06))',
              border: '2px solid rgba(245,215,160,0.3)',
              boxShadow: 'inset 0 0 40px rgba(245,184,74,0.15)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0 24px',
            })}
          >
            <div style={{fontFamily: F.serif, fontStyle: 'italic', fontSize: 15, letterSpacing: '0.3em', color: C.sand, opacity: 0.85}}>
              DREXEL INSTITUTE
            </div>
            <div style={{fontFamily: F.serif, fontWeight: 600, fontSize: 26, letterSpacing: '0.12em', color: C.bone, marginTop: 8, textAlign: 'center'}}>
              OFFICE OF THE DEAN
            </div>
            <div style={{width: 80, height: 2, background: C.sand, opacity: 0.5, margin: '14px 0'}} />
            <div style={{fontFamily: F.mono, fontSize: 11, letterSpacing: '0.4em', color: C.bone, opacity: 0.5}}>
              FOUNDED 1891
            </div>
          </div>

          {/* Lower wooden panel molding */}
          <div style={abs({left: 40, bottom: 40, right: 40, height: 180, border: '2px solid rgba(242,239,230,0.12)', borderRadius: 4, background: 'rgba(0,0,0,0.3)'})}>
            {/* Brass door knob */}
            <div style={abs({left: 30, top: 76, width: 22, height: 22, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%,#ffe4a0,#c9a66b)', boxShadow: '0 4px 10px rgba(0,0,0,0.5)'})} />
          </div>
        </div>

        {/* Subtitle label */}
        <div style={abs({left: 0, width: W, top: 880, textAlign: 'center', fontFamily: F.mono, fontSize: 16, letterSpacing: '0.5em', color: C.bone, opacity: 0.4})}>
          PHILADELPHIA, 1948
        </div>
      </div>
    </div>
  );
};

/* ===================== 5.2 – 9.8  SCENE 3: THE IMPOSSIBLE QUESTION ===================== */
const TheQuestion: React.FC<{t: number}> = ({t}) => {
  if (t < 5.1 || t > 9.9) return null;
  const a = win(t, 5.2, 9.7, 0.4, 0.5);
  const qProg = eo(t, 5.3, 7.5);
  const beamX = lerp(640, 1280, eio(t, 6.5, 9.2));

  return (
    <div style={{...fill, opacity: a}}>
      {/* Background radial technical blueprint grid */}
      <div style={abs({left: W / 2 - 400, top: H / 2 - 400, width: 800, height: 800, borderRadius: '50%', border: '1px dashed rgba(242,239,230,0.1)', transform: `scale(${qProg})`})} />
      <div style={abs({left: W / 2 - 250, top: H / 2 - 250, width: 500, height: 500, borderRadius: '50%', border: '1px solid rgba(245,184,74,0.15)', transform: `scale(${qProg})`})} />

      {/* The monumental question text */}
      <div style={abs({left: 240, top: 220, width: 1440, textAlign: 'center'})}>
        <div style={{fontFamily: F.mono, fontSize: 16, letterSpacing: '0.5em', color: C.sand, opacity: 0.8, textTransform: 'uppercase'}}>
          The Food Chain President's Proposal
        </div>
        <div
          style={{
            fontFamily: F.serif,
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 78,
            lineHeight: 1.25,
            color: C.bone,
            marginTop: 24,
            letterSpacing: '-0.01em',
            textShadow: '0 8px 30px rgba(0,0,0,0.6)',
          }}
        >
          “Could you build a way for a store to read a product automatically?”
        </div>
      </div>

      {/* Blueprint schematic: Conveyor + Optical Scanner (Theoretical) */}
      <div style={abs({left: 960 - 350, bottom: 150, width: 700, height: 210, opacity: prog(t, 6.2, 7.0)})}>
        <svg width={700} height={210} style={{display: 'block'}}>
          {/* Conveyor track */}
          <line x1={40} y1={170} x2={660} y2={170} stroke={C.bone} strokeWidth={3} strokeOpacity={0.4} />
          {Array.from({length: 16}).map((_, i) => (
            <circle key={i} cx={55 + i * 40} cy={170} r={5} fill={C.bone} fillOpacity={0.3} />
          ))}

          {/* Scanner Optical Head */}
          <polygon points="310,40 390,40 430,90 270,90" fill="none" stroke={C.sand} strokeWidth={2} strokeOpacity={0.8} />
          <line x1={350} y1={10} x2={350} y2={40} stroke={C.sand} strokeWidth={2} strokeOpacity={0.6} />
          <circle cx={350} cy={65} r={16} fill="none" stroke={C.bone} strokeWidth={1.5} strokeOpacity={0.5} />

          {/* Optical projection cone onto the passing item */}
          <polygon points="320,90 380,90 470,165 230,165" fill="url(#scanCone)" opacity={0.35} />

          {/* Carton moving on conveyor */}
          <rect x={beamX - 1000} y={115} width={90} height={52} rx={3} fill="#232734" stroke={C.bone} strokeWidth={1.5} strokeOpacity={0.5} />
          <text x={beamX - 955} y={145} fontFamily={F.mono} fontSize={10} fill={C.bone} opacity={0.6} textAnchor="middle">ITEM</text>

          <defs>
            <linearGradient id="scanCone" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={C.blue} stopOpacity={0.8} />
              <stop offset="100%" stopColor={C.blue} stopOpacity={0} />
            </linearGradient>
          </defs>
        </svg>

        <div style={abs({left: 0, right: 0, bottom: -10, textAlign: 'center', fontFamily: F.mono, fontSize: 13, letterSpacing: '0.35em', color: C.blue, opacity: 0.85})}>
          CONCEPT: AUTOMATIC OPTICAL READOUT [THEORETICAL]
        </div>
      </div>
    </div>
  );
};

/* ===================== 9.4 – 11.8  SCENE 4: THE DEAN SAYS NO ===================== */
const TheDeanSaysNo: React.FC<{t: number}> = ({t}) => {
  if (t < 9.3 || t > 11.9) return null;
  const a = win(t, 9.4, 11.8, 0.15, 0.35);
  const slam = eb(t, 9.55, 9.85);
  const flash = prog(t, 9.66, 9.75) * (1 - prog(t, 9.75, 10.3));

  return (
    <div style={{...fill, opacity: a}}>
      {/* Harsh light flash on rejection */}
      <div style={{...fill, background: C.red, opacity: flash * 0.18}} />

      {/* Massive stark typographic rejection */}
      <div style={abs({left: 0, top: 0, width: W, height: H, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'})}>
        <div style={{fontFamily: F.mono, fontSize: 20, letterSpacing: '0.6em', color: C.bone, opacity: 0.5, marginBottom: 12}}>
          DREXEL UNIVERSITY FACULTY RESPONSE
        </div>
        <div
          style={{
            fontFamily: F.serif,
            fontWeight: 700,
            fontSize: 260,
            lineHeight: 0.9,
            color: C.bone,
            letterSpacing: '-0.02em',
            transform: `scale(${lerp(1.28, 1.0, slam)})`,
            textShadow: '0 20px 80px rgba(0,0,0,0.8)',
          }}
        >
          “NO.”
        </div>
        <div
          style={{
            marginTop: 34,
            padding: '8px 24px',
            border: `2px solid ${C.red}`,
            color: C.red,
            fontFamily: F.mono,
            fontSize: 18,
            letterSpacing: '0.4em',
            borderRadius: 6,
            opacity: prog(t, 9.85, 10.15),
          }}
        >
          IMPOSSIBLE & UNFEASIBLE (1948)
        </div>
      </div>
    </div>
  );
};

/* ===================== 11.3 – 21.8  SCENE 5: SILVER & WOODLAND ===================== */
const SilverAndWoodland: React.FC<{t: number}> = ({t}) => {
  if (t < 11.2 || t > 21.9) return null;
  const a = win(t, 11.3, 21.8, 0.4, 0.5);

  // Acoustic propagation ring from doorway to Silver (t 11.3 - 14.5)
  const soundRadius = lerp(40, 680, eo(t, 11.4, 13.8));
  const soundOp = 1 - prog(t, 13.5, 14.8);

  // Silver card entrance (t 11.8)
  const silverIn = eb(t, 11.6, 12.3);

  // Transmission line to Woodland (t 16.4 - 17.6)
  const wireProg = eo(t, 16.3, 17.6);

  // Woodland card entrance (t 17.2)
  const woodIn = eb(t, 17.2, 17.9);

  // Woodland obsession spiral loop (t 19.5 - 21.8)
  const obsess = prog(t, 19.5, 20.8);
  const rotLoop = (t - 19.5) * 180;

  return (
    <div style={{...fill, opacity: a}}>
      {/* Acoustic wave radiating from Dean's door (left edge) */}
      <svg style={fill} width={W} height={H}>
        <defs>
          <radialGradient id="acousticG" cx="10%" cy="50%" r="70%">
            <stop offset="0%" stopColor={C.amber} stopOpacity={0.3} />
            <stop offset="60%" stopColor={C.amber} stopOpacity={0.08} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle cx={140} cy={540} r={soundRadius} fill="none" stroke={C.amber} strokeWidth={2.5} strokeOpacity={soundOp * 0.75} strokeDasharray="6 6" />
        <circle cx={140} cy={540} r={soundRadius * 0.75} fill="none" stroke={C.amber} strokeWidth={1.5} strokeOpacity={soundOp * 0.5} />
        <circle cx={140} cy={540} r={soundRadius * 0.5} fill="none" stroke={C.amber} strokeWidth={1} strokeOpacity={soundOp * 0.3} />

        {/* Transmission connection wire between Silver & Woodland */}
        {wireProg > 0 && (
          <line
            x1={620}
            y1={540}
            x2={lerp(620, 1300, wireProg)}
            y2={540}
            stroke={C.sand}
            strokeWidth={3}
            strokeDasharray="8 6"
            strokeOpacity={0.8}
          />
        )}
      </svg>

      {/* NODE 1: BERNARD SILVER (Left Side) */}
      <div
        style={abs({
          left: 420 - 180,
          top: 540 - 240,
          width: 360,
          height: 480,
          opacity: silverIn,
          transform: `scale(${0.8 + 0.2 * silverIn})`,
        })}
      >
        <div
          style={abs({
            inset: 0,
            borderRadius: 14,
            background: 'linear-gradient(165deg,#1c2130,#111520)',
            border: '2px solid rgba(245,184,74,0.35)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.65)',
            padding: 30,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          })}
        >
          {/* Avatar frame */}
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 40% 35%,#2b334a,#141824)',
              border: '2px solid rgba(242,239,230,0.3)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <div style={{fontFamily: F.mono, fontSize: 32, fontWeight: 700, color: C.bone}}>BS</div>
            {/* Listening ear icon ring */}
            <div style={abs({inset: -10, borderRadius: '50%', border: '2px dashed rgba(245,184,74,0.6)', animation: 'spin 20s linear infinite'})} />
          </div>

          <div style={{fontFamily: F.serif, fontWeight: 600, fontSize: 28, color: C.bone, marginTop: 24, textAlign: 'center'}}>
            Bernard Silver
          </div>
          <div style={{fontFamily: F.mono, fontSize: 13, letterSpacing: '0.25em', color: C.sand, marginTop: 6}}>
            GRADUATE STUDENT
          </div>
          <div style={{width: 60, height: 2, background: C.bone, opacity: 0.2, margin: '16px 0'}} />
          <div style={{fontFamily: F.sans, fontSize: 15, color: C.bone, opacity: 0.7, textAlign: 'center', lineHeight: 1.4}}>
            Overhears the Dean's refusal in the hallway.
          </div>
        </div>
      </div>

      {/* NODE 2: NORMAN JOSEPH WOODLAND (Right Side) */}
      <div
        style={abs({
          left: 1420 - 180,
          top: 540 - 240,
          width: 360,
          height: 480,
          opacity: woodIn,
          transform: `scale(${0.8 + 0.2 * woodIn})`,
        })}
      >
        <div
          style={abs({
            inset: 0,
            borderRadius: 14,
            background: 'linear-gradient(165deg,#1c2130,#111520)',
            border: `2px solid rgba(${obsess > 0 ? '255,77,61' : '91,141,239'}, 0.45)`,
            boxShadow: `0 30px 60px rgba(0,0,0,0.65), 0 0 ${60 * obsess}px rgba(255,77,61,${0.4 * obsess})`,
            padding: 30,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          })}
        >
          {/* Avatar frame */}
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 40% 35%,#2b334a,#141824)',
              border: `2px solid ${obsess > 0 ? C.red : C.bone}`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <div style={{fontFamily: F.mono, fontSize: 32, fontWeight: 700, color: C.bone}}>NJW</div>

            {/* Obsessive spinning mathematical loops when Woodland can't let it go */}
            {obsess > 0 && (
              <svg style={abs({inset: -30, width: 200, height: 200, transform: `rotate(${rotLoop}deg)`})}>
                <circle cx={100} cy={100} r={80} fill="none" stroke={C.red} strokeWidth={2} strokeDasharray="12 8" strokeOpacity={0.8} />
                <circle cx={100} cy={100} r={92} fill="none" stroke={C.amber} strokeWidth={1.5} strokeDasharray="4 16" strokeOpacity={0.6} />
              </svg>
            )}
          </div>

          <div style={{fontFamily: F.serif, fontWeight: 600, fontSize: 26, color: C.bone, marginTop: 24, textAlign: 'center'}}>
            N. Joseph Woodland
          </div>
          <div style={{fontFamily: F.mono, fontSize: 13, letterSpacing: '0.25em', color: obsess > 0 ? C.red : C.blue, marginTop: 6}}>
            {obsess > 0 ? 'OBSESSIVE PURSUIT' : 'TEACHER & INVENTOR'}
          </div>
          <div style={{width: 60, height: 2, background: C.bone, opacity: 0.2, margin: '16px 0'}} />
          <div style={{fontFamily: F.sans, fontSize: 15, color: C.bone, opacity: 0.85, textAlign: 'center', lineHeight: 1.4}}>
            {obsess > 0 ? (
              <span style={{color: C.amber, fontWeight: 600}}>“And Woodland can't let it go.”</span>
            ) : (
              'Befriends Silver. Accepts the challenge.'
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ===================== 21.5 – 27.5  SCENE 6: ULTRAVIOLET INK & THE FAILURE ===================== */
const UltravioletLab: React.FC<{t: number}> = ({t}) => {
  if (t < 21.4) return null;
  const a = prog(t, 21.5, 22.3);

  // UV lamp powers on (t 22.2)
  const lampOn = prog(t, 22.2, 23.4);

  // The ink failure & heat bleed (t 25.8 - 27.2)
  const bleed = prog(t, 25.8, 27.1);
  const blurAmount = lerp(0, 24, bleed);

  // Lamp flicker & burnout (t 26.8 - 27.5)
  const dying = prog(t, 26.68, 27.45);
  const flicker = dying > 0 ? (Math.sin(t * 38) > 0 ? 0.3 : 0.9) * (1 - dying) : 1;

  return (
    <div style={{...fill, opacity: a * flicker, background: `radial-gradient(ellipse at 50% 50%, rgba(138,43,226,${0.35 * lampOn}) 0%, ${C.ink} 75%)`}}>
      {/* UV Blacklight Ray Cones */}
      <div
        style={abs({
          left: 960 - 450,
          top: 0,
          width: 900,
          height: 600,
          background: 'linear-gradient(180deg, rgba(168,85,247,0.4) 0%, rgba(168,85,247,0.08) 60%, rgba(0,0,0,0) 100%)',
          clipPath: 'polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)',
          opacity: lampOn,
          pointerEvents: 'none',
        })}
      />

      {/* Lab Desk / Package with Glowing UV Ink */}
      <div
        style={abs({
          left: 960 - 260,
          top: 540 - 180,
          width: 520,
          height: 360,
          borderRadius: 12,
          background: 'linear-gradient(160deg,#1c1b26,#100e18)',
          border: '2px solid rgba(168,85,247,0.3)',
          boxShadow: `0 30px 80px rgba(0,0,0,0.8), 0 0 ${120 * lampOn}px rgba(168,85,247,${0.35 * lampOn})`,
          padding: 36,
          overflow: 'hidden',
        })}
      >
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{fontFamily: F.mono, fontSize: 13, letterSpacing: '0.3em', color: '#c084fc'}}>
            TEST SPECIMEN : 01
          </div>
          <div style={{fontFamily: F.mono, fontSize: 12, color: C.bone, opacity: 0.5}}>
            365nm UV SOURCE
          </div>
        </div>

        {/* Fluorescent Glowing Patterns (simulated barcode/dots) */}
        <div style={{marginTop: 36, filter: `blur(${blurAmount}px)`, transition: 'filter 0.2s'}}>
          <svg width={448} height={120} viewBox="0 0 448 120">
            {Array.from({length: 28}).map((_, i) => {
              const x = 20 + i * 15;
              const w = i % 4 === 0 ? 8 : i % 2 === 0 ? 5 : 3;
              return (
                <rect
                  key={i}
                  x={x}
                  y={10}
                  width={w + bleed * 6}
                  height={100}
                  fill="#c084fc"
                  fillOpacity={0.9}
                  style={{
                    filter: `drop-shadow(0 0 ${12 + bleed * 8}px #a855f7)`,
                  }}
                />
              );
            })}
          </svg>
        </div>

        {/* Warning label when it smears & fails */}
        {bleed > 0 && (
          <div
            style={abs({
              left: 36,
              bottom: 24,
              right: 36,
              padding: '8px 16px',
              background: 'rgba(255,77,61,0.25)',
              border: `1.5px solid ${C.red}`,
              borderRadius: 6,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: F.mono,
              fontSize: 12,
              color: C.bone,
              opacity: prog(t, 26.0, 26.5),
            })}
          >
            <span style={{color: C.red, fontWeight: 700}}>ERROR: THERMAL BLEED</span>
            <span>INK SMUDGES UNDER INCANDESCENCE</span>
          </div>
        )}
      </div>

      {/* Editorial title: "ULTRAVIOLET INK" */}
      <div style={abs({left: 0, width: W, top: 180, textAlign: 'center', opacity: lampOn})}>
        <div style={{fontFamily: F.mono, fontSize: 15, letterSpacing: '0.45em', color: '#c084fc', textTransform: 'uppercase'}}>
          Initial Attempt
        </div>
        <div style={{fontFamily: F.serif, fontStyle: 'italic', fontSize: 62, color: C.bone, marginTop: 8}}>
          Glowing Ultraviolet Pigments
        </div>
      </div>

      {/* "It doesn't work." stamp */}
      {t > 26.65 && (
        <div
          style={abs({
            left: 0,
            width: W,
            top: 540 - 50,
            textAlign: 'center',
            fontFamily: F.serif,
            fontWeight: 700,
            fontSize: 96,
            color: C.red,
            letterSpacing: '0.04em',
            textShadow: '0 10px 40px rgba(0,0,0,0.9)',
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
      <Shelves t={t} />
      <DeanCorridor t={t} />
      <TheQuestion t={t} />
      <TheDeanSaysNo t={t} />
      <SilverAndWoodland t={t} />
      <UltravioletLab t={t} />
      <Overlays frame={frame} />
      <Subs t={t} sentences={sentences} words={WORDS} />
    </AbsoluteFill>
  );
};
