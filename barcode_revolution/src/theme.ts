export const THEME = {
  colors: {
    bgDark: '#080a0f',
    bgNavy: '#0c121e',
    paperCream: '#f3efe6',
    paperAged: '#e5ded0',
    boneWhite: '#ffffff',
    electricCyan: '#00d2ff',
    kleinBlue: '#1044ff',
    amberGold: '#ffaa00',
    sandOchre: '#d4a359',
    laserRed: '#ff2828',
    laserGlow: 'rgba(255, 40, 40, 0.45)',
    gridLine: 'rgba(243, 239, 230, 0.08)',
    borderMuted: 'rgba(243, 239, 230, 0.15)',
  },
  fonts: {
    hero: "'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif",
    serif: "'Fraunces', Georgia, serif",
    mono: "'JetBrains Mono', 'Courier New', monospace",
  },
  dimensions: {
    width: 1920,
    height: 1080,
  },
  fps: 30,
};

export const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..900;1,9..144,400..700&family=JetBrains+Mono:wght@400;500;700;800&family=Space+Grotesk:wght@500;600;700;800&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;
