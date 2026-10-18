import {staticFile, delayRender, continueRender} from 'remotion';

const faces: [string, string, string, string][] = [
  ['Fraunces', 'fonts/fraunces-latin-300-normal.woff2', '300', 'normal'],
  ['Fraunces', 'fonts/fraunces-latin-400-normal.woff2', '400', 'normal'],
  ['Fraunces', 'fonts/fraunces-latin-400-italic.woff2', '400', 'italic'],
  ['Fraunces', 'fonts/fraunces-latin-600-normal.woff2', '600', 'normal'],
  ['Inter', 'fonts/inter-latin-500-normal.woff2', '500', 'normal'],
  ['Inter', 'fonts/inter-latin-600-normal.woff2', '600', 'normal'],
  ['JetBrains Mono', 'fonts/jetbrains-mono-latin-400-normal.woff2', '400', 'normal'],
  ['JetBrains Mono', 'fonts/jetbrains-mono-latin-700-normal.woff2', '700', 'normal'],
];
let started = false;
export const loadFonts = () => {
  if (started || typeof document === 'undefined') return;
  started = true;
  const h = delayRender('fonts');
  Promise.all(
    faces.map(([family, url, weight, style]) =>
      new FontFace(family, `url(${staticFile(url)})`, {weight, style}).load().then((ff) => {
        (document as any).fonts.add(ff);
      })
    )
  )
    .then(() => continueRender(h))
    .catch((e) => {
      console.error('font load failed', e);
      continueRender(h);
    });
};
