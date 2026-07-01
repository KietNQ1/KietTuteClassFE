/** Lam theme tokens — mirrors teacher-overview-redesign/styles/theme-lam.css */
export const LAM = {
  bg: "#fffaf1",
  surface: "#ffffff",
  ink: "#0b2f66",
  inkSoft: "#385178",
  muted: "#7d8aa0",
  line: "#ecd9bd",
  sidebar: "#fff8ea",
  accent: "#ff5c00",
  accentSoft: "#fff0e2",
  green: "#21b37b",
  greenBg: "#e8f7ef",
  amber: "#f6a23a",
  amberBg: "#fff7ea",
  rose: "#ec4899",
  roseBg: "#fce7f3",
  blue: "#2f7cff",
  blueBg: "#e8f0ff",
  violet: "#8b5cf6",
  violetBg: "#f3ecff",
  shadowSm: "0 8px 24px rgba(15, 47, 102, 0.06)",
  rLg: 24,
  rMd: 20,
  rSm: 16,
  font: '"Plus Jakarta Sans", Inter, system-ui, sans-serif',
  fontBody: 'Inter, system-ui, sans-serif',
} as const;

export const HOUR_H = 44;
export const CAL_START = 0;
export const CAL_END = 23;

export type EvCls = "ev-green" | "ev-violet" | "ev-amber" | "ev-blue" | "ev-rose";

export const EV_STYLES: Record<
  EvCls,
  { bg: string; border: string; color: string; bar: string }
> = {
  "ev-green": { bg: LAM.greenBg, border: LAM.green, color: "#1f6b4a", bar: LAM.green },
  "ev-violet": { bg: LAM.violetBg, border: LAM.violet, color: "#5a3fa8", bar: LAM.violet },
  "ev-amber": { bg: LAM.amberBg, border: LAM.amber, color: "#9a5f12", bar: LAM.amber },
  "ev-blue": { bg: LAM.blueBg, border: LAM.blue, color: "#2a5a9e", bar: LAM.blue },
  "ev-rose": { bg: LAM.roseBg, border: LAM.rose, color: "#a83d52", bar: LAM.rose },
};
