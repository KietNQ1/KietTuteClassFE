import { LAM } from "./lamTheme";

type TextBarProps = {
  width?: number | string;
  height?: number;
  style?: React.CSSProperties;
};

export const TextBar: React.FC<TextBarProps> = ({
  width = "100%",
  height = 10,
  style,
}) => (
  <div
    style={{
      width,
      height,
      borderRadius: 999,
      background: "#e8ecf2",
      flexShrink: 0,
      ...style,
    }}
  />
);

export function glow(intensity: number) {
  if (intensity <= 0) return {};
  return {
    boxShadow: `0 0 0 ${2 + intensity * 4}px rgba(255,92,0,${0.25 + intensity * 0.35}), 0 4px 20px rgba(255,92,0,${0.15 * intensity})`,
    borderColor: LAM.accent,
    background: intensity > 0.5 ? LAM.accentSoft : undefined,
    transform: `scale(${1 + intensity * 0.02})`,
  };
}
