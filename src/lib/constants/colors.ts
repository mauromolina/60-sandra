export const COLORS = {
  cream: "#FDF8F0",
  creamDark: "#F5EDE0",
  gold: "#B8963E",
  goldLight: "#D4AF37",
  goldMuted: "#C9A84C",
  sage: "#8A9A7B",
  sageLight: "#A3B18A",
  sageDark: "#6B7F5E",
  charcoal: "#2C2C2C",
  charcoalLight: "#4A4A4A",
  warmGray: "#8E8E8E",
  white: "#FFFFFF",
  error: "#C0392B",
  success: "#27AE60",
} as const;

export type ColorToken = keyof typeof COLORS;
