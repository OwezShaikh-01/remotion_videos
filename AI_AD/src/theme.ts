export const COLORS = {
  // Luxury Architectural Palette (Apple / Pentagram / Stripe aesthetic)
  obsidian: "#090A0E",        // Deep velvet obsidian
  obsidianSurface: "#13151B", // Dark surface card
  titanium: "#F8F9FA",       // Pure refined crisp titanium
  galleryIvory: "#F4F2EC",   // Warm architectural gallery cream
  ivorySurface: "#FFFFFF",   // Pure ivory card surface
  mutedTextDark: "#8E95A5",  // Editorial muted secondary text for dark backgrounds
  mutedTextLight: "#6B7280", // Editorial muted secondary text for light backgrounds
  cobalt: "#0D25F4",         // International Klein Blue / Hyper Cobalt
  cobaltGlow: "rgba(13, 37, 244, 0.25)",
  amber: "#FF9800",          // Warm editorial amber
  amberGlow: "rgba(255, 152, 0, 0.2)",
  emerald: "#10B981",        // Refined mint status green
  borderDark: "rgba(255, 255, 255, 0.08)",
  borderLight: "rgba(9, 10, 14, 0.08)",
  // Compatibility aliases
  white: "#FFFFFF",
  vermilion: "#0D25F4",      // mapped to luxury cobalt
  acidYellow: "#FF9800",     // mapped to luxury amber
  ink: "#090A0E",
  ivory: "#F4F2EC",
  gray: "#8E95A5",
  cobaltLight: "#3B55FF",
};

export const FONTS = {
  display: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Helvetica Neue', Arial, sans-serif",
  mono: "'SF Mono', 'SFMono-Regular', ui-monospace, Menlo, Consolas, monospace",
  serif: "'Editorial New', 'New York', Georgia, serif",
};

// Luxury Fluid Spring Configurations (Zero harsh jitter, buttery smooth deceleration)
export const SPRINGS = {
  silky: { damping: 28, mass: 1.0, stiffness: 85 },
  gentle: { damping: 24, mass: 1.0, stiffness: 105 },
  responsive: { damping: 26, mass: 0.8, stiffness: 125 },
  floating: { damping: 32, mass: 1.2, stiffness: 65 },
  // Compatibility fallbacks with refined smooth damping
  snappy: { damping: 26, mass: 0.8, stiffness: 130 },
  bouncy: { damping: 24, mass: 0.9, stiffness: 110 },
  smooth: { damping: 28, mass: 1.0, stiffness: 90 },
  heavy: { damping: 30, mass: 1.2, stiffness: 80 },
  punchy: { damping: 25, mass: 0.8, stiffness: 120 },
};
