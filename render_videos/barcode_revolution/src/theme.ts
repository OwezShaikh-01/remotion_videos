export const THEME = {
  colors: {
    bgDark: '#0b0d12',
    boneWhite: '#f2efe6',
    sand: '#c9a66b',
    sandLight: '#e4caa0',
    sandDark: '#8c683b',
    amber: '#f5b84a',
    amberGlow: 'rgba(245, 184, 74, 0.35)',
    coldBlue: '#5b8def',
    coldBlueGlow: 'rgba(91, 141, 239, 0.3)',
    signalRed: '#ff4d3d',
    signalRedGlow: 'rgba(255, 77, 61, 0.45)',
    mutedGrey: '#4e5462',
    darkCard: 'rgba(18, 22, 30, 0.85)',
    gridLine: 'rgba(242, 239, 230, 0.06)',
  },
  fonts: {
    story: "'Fraunces', Georgia, serif",
    mono: "'JetBrains Mono', 'Courier New', monospace",
    body: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  fps: 30,
  dimensions: {
    width: 1920,
    height: 1080,
  },
};

export const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..800;1,9..144,300..700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;
