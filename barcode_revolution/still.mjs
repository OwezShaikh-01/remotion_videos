// Render preview PNGs:  COMP=Segment02 node still.mjs 12.6 25.9      (times in seconds, local to the segment)
// Optional: BROWSER=/path/to/chrome node still.mjs ...
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import fs from 'fs';
const times = process.argv.slice(2).map(Number);
const id = process.env.COMP || 'Segment02';
const serveUrl = await bundle({entryPoint: './src/index.ts', publicDir: './public'});
const opts = process.env.BROWSER ? {browserExecutable: process.env.BROWSER, chromiumOptions: {gl: 'swiftshader'}} : {};
const comp = await selectComposition({serveUrl, id, ...opts});
fs.mkdirSync('out', {recursive: true});
for (const t of times) {
  await renderStill({composition: comp, serveUrl, frame: Math.round(t * 30), output: `out/still-${id}-${t.toFixed(2)}.png`, ...opts});
  console.log('wrote', `out/still-${id}-${t.toFixed(2)}.png`);
}
