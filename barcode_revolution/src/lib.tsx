import React from 'react';
import {Easing} from 'remotion';

export const W = 1920;
export const H = 1080;
export const FPS = 30;

export const C = {
  ink: '#0b0d12',
  ink2: '#141824',
  bone: '#f2efe6',
  sand: '#c9a66b',
  amber: '#f5b84a',
  blue: '#5b8def',
  red: '#ff4d3d',
};
export const F = {
  serif: 'Fraunces, "GFS Baskerville", serif',
  sans: 'Inter, Carlito, sans-serif',
  mono: '"JetBrains Mono", "DejaVu Sans Mono", monospace',
};

export const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
export const prog = (t: number, a: number, b: number) => clamp01((t - a) / Math.max(0.0001, b - a));
export const E = {
  out: Easing.bezier(0.16, 1, 0.3, 1),
  io: Easing.bezier(0.65, 0, 0.35, 1),
  inn: Easing.bezier(0.5, 0, 0.75, 0),
  back: Easing.bezier(0.34, 1.56, 0.64, 1),
};
export const eo = (t: number, a: number, b: number) => E.out(prog(t, a, b));
export const eio = (t: number, a: number, b: number) => E.io(prog(t, a, b));
export const ein = (t: number, a: number, b: number) => E.inn(prog(t, a, b));
export const eb = (t: number, a: number, b: number) => E.back(prog(t, a, b));
export const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
/** fade-in over fi seconds after a, fade-out over fo seconds before b */
export const win = (t: number, a: number, b: number, fi: number, fo: number) =>
  Math.min(prog(t, a, a + fi), 1 - prog(t, b - fo, b));

/** deterministic hash noise 0..1 (Remotion forbids Math.random) */
export const rnd = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/* ------------------------------ UPC-A ------------------------------ */
const L = ['0001101', '0011001', '0010011', '0111101', '0100011', '0110001', '0101111', '0111011', '0110111', '0001011'];
const R = L.map((s) => s.split('').map((c) => (c === '1' ? '0' : '1')).join(''));

export const checkDigit = (d11: string) => {
  let odd = 0, even = 0;
  for (let i = 0; i < 11; i++) (i % 2 === 0 ? (odd += +d11[i]) : (even += +d11[i]));
  return String((10 - ((odd * 3 + even) % 10)) % 10);
};
export const makeDigits = (seed: number) => {
  let s = '';
  for (let i = 0; i < 11; i++) s += Math.floor(rnd(seed * 31 + i * 7.7) * 10);
  return s + checkDigit(s);
};
/** the hero code used throughout the film (also the one in the check-digit walkthrough) */
export const HERO = '036000291452';

export const upcBits = (d: string) => {
  let s = '101';
  for (let i = 0; i < 6; i++) s += L[+d[i]];
  s += '01010';
  for (let i = 6; i < 12; i++) s += R[+d[i]];
  return s + '101';
};

export const Barcode: React.FC<{
  digits: string;
  w: number;
  h: number;
  fg?: string;
  bg?: string;
  digitsText?: boolean;
  reveal?: number;
  id?: string;
  radius?: number;
  hide?: number[];
}> = ({digits, w, h, fg = C.ink, bg, digitsText = false, reveal = 1, id = 'bc', radius = 0, hide = []}) => {
  const bits = upcBits(digits);
  const Q = 9;
  const total = 95 + Q * 2;
  const mw = w / total;
  const topY = h * 0.07;
  const barH = digitsText ? h * 0.66 : h * 0.86;
  const guardH = digitsText ? h * 0.78 : h * 0.86;
  const isGuard = (i: number) => i < 3 || (i >= 45 && i < 50) || i >= 92;
  let d = '';
  let i = 0;
  while (i < 95) {
    if (bits[i] === '1') {
      const g = isGuard(i);
      let j = i;
      while (j < 95 && bits[j] === '1' && isGuard(j) === g) j++;
      d += `M${(Q + i) * mw} ${topY}h${(j - i) * mw}v${g ? guardH : barH}h${-(j - i) * mw}z`;
      i = j;
    } else i++;
  }
  const fs = h * 0.125;
  const dy = h * 0.93;
  const cell = (start: number, k: number) => (Q + start + k * 7 + 3.5) * mw;
  const txt: React.ReactNode[] = [];
  if (digitsText) {
    if (!hide.includes(0)) txt.push(<text key="f" x={Q * mw * 0.45} y={dy} fontSize={fs} textAnchor="middle">{digits[0]}</text>);
    for (let k = 1; k <= 5; k++) if (!hide.includes(k)) txt.push(<text key={'l' + k} x={cell(3, k)} y={dy} fontSize={fs} textAnchor="middle">{digits[k]}</text>);
    for (let k = 0; k <= 4; k++) if (!hide.includes(6 + k)) txt.push(<text key={'r' + k} x={cell(50, k)} y={dy} fontSize={fs} textAnchor="middle">{digits[6 + k]}</text>);
    if (!hide.includes(11)) txt.push(<text key="c" x={w - Q * mw * 0.45} y={dy} fontSize={fs} textAnchor="middle">{digits[11]}</text>);
  }
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{display: 'block'}}>
      <defs>
        <clipPath id={id}>
          <rect x={0} y={0} width={Math.max(0.01, w * reveal)} height={h} />
        </clipPath>
      </defs>
      {bg ? <rect width={w} height={h} rx={radius} fill={bg} /> : null}
      <g clipPath={`url(#${id})`}>
        <path d={d} fill={fg} />
        <g fill={fg} fontFamily={F.mono} fontWeight={700}>{txt}</g>
      </g>
    </svg>
  );
};

/* --------------------------- narration timing --------------------------- */
export type Part = {s: number; e: number; text: string};
export type Sentence = {id: string; parts: Part[]};

/** Speech intervals come from silence detection on the real voiceover (pauses >= 0.18s). */
export const sentences: Sentence[] = [
  {id: 's1', parts: [{s: 0.34, e: 1.2, text: 'Look around you.'}]},
  {id: 's2', parts: [{s: 2.05, e: 3.79, text: "Somewhere within arm's reach,"}, {s: 4.33, e: 6.06, text: "there's a pattern of black lines."}]},
  {id: 's3', parts: [{s: 6.7, e: 7.55, text: 'Probably several.'}]},
  {id: 's4', parts: [{s: 8.45, e: 10.53, text: "You've seen them 10,000 times."}]},
  {id: 's5', parts: [{s: 11.3, e: 12.61, text: "You've never really looked."}]},
  {
    id: 's6',
    parts: [
      {s: 13.53, e: 14.26, text: 'That pattern'},
      {s: 14.49, e: 17.53, text: 'was first sketched in the sand of a Florida beach'},
      {s: 17.89, e: 19.32, text: 'in 1949.'},
    ],
  },
  {id: 's7', parts: [{s: 20.19, e: 23.81, text: 'And then it did absolutely nothing for 25 years.'}]},
  {id: 's8', parts: [{s: 24.7, e: 27.63, text: 'Its inventors sold the rights for $15,000'}, {s: 27.87, e: 28.55, text: 'and moved on.'}]},
  {id: 's9', parts: [{s: 29.24, e: 31.08, text: 'One of them died before it ever worked.'}]},
];

const OV: Record<string, number> = {
  '10,000': 3, '$15,000': 6, '1949': 5, '25': 3, somewhere: 2, within: 2, probably: 3, several: 3,
  theres: 1, lines: 1, times: 1, absolutely: 4, arms: 1, '1948': 5, supposedly: 4, mistakes: 2, everywhere: 3, every: 2, video: 3, philadelphia: 5,
};
const syl = (w: string) => {
  const k = w.toLowerCase().replace(/[^a-z0-9$,]/g, '').replace(/,$/, '');
  if (OV[k] !== undefined) return OV[k];
  const m = k.replace(/[^a-z]/g, '');
  let g = (m.match(/[aeiouy]+/g) || []).length;
  if (/e$/.test(m) && !/le$/.test(m) && g > 1) g--;
  if (/ed$/.test(m) && !/[td]ed$/.test(m) && g > 1) g--;
  return Math.max(1, g);
};

export type Word = {text: string; t0: number; t1: number};
export const buildWords = (s: Sentence): Word[] => {
  const out: Word[] = [];
  for (const p of s.parts) {
    const ws = p.text.split(' ');
    const wt = ws.map(syl);
    const tot = wt.reduce((a, b) => a + b, 0);
    let acc = 0;
    ws.forEach((w, i) => {
      const t0 = p.s + ((p.e - p.s) * acc) / tot;
      acc += wt[i];
      out.push({text: w, t0, t1: p.s + ((p.e - p.s) * acc) / tot});
    });
  }
  return out;
};
export const WORDS: Record<string, Word[]> = Object.fromEntries(sentences.map((s) => [s.id, buildWords(s)]));
