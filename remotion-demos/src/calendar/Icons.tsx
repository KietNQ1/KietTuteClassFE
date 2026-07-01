import React from "react";

type IconProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
};

function Svg({
  size = 18,
  color = "currentColor",
  strokeWidth = 2,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "block", flexShrink: 0 }}
    >
      {children}
    </svg>
  );
}

export const IconBook: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </Svg>
);

export const IconClipboard: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" />
  </Svg>
);

export const IconClipboardCheck: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" />
    <path d="m9 14 2 2 4-4" />
  </Svg>
);

export const IconCalendar: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </Svg>
);

export const IconVideo: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <path d="M23 7l-7 5 7 5V7z" />
    <rect x="1" y="5" width="15" height="14" rx="2" />
  </Svg>
);

export const IconMapPin: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </Svg>
);

export const IconPencil: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </Svg>
);

export const IconFile: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
  </Svg>
);

export const IconMessage: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </Svg>
);

export const IconImage: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="m21 15-5-5L5 21" />
  </Svg>
);

export const IconDoc: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M16 13H8M16 17H8" />
  </Svg>
);

export const IconLink: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </Svg>
);

export const IconUpload: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </Svg>
);

export const IconGrid: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </Svg>
);

export const IconPlay: React.FC<IconProps> = (p) => (
  <Svg {...p} strokeWidth={2.5}>
    <polygon points="5 3 19 12 5 21 5 3" fill={p.color ?? "currentColor"} stroke="none" />
  </Svg>
);

export const IconBox: React.FC<{
  bg: string;
  color?: string;
  size?: number;
  children: React.ReactNode;
}> = ({ bg, color = "#385178", size = 40, children }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: 10,
      background: bg,
      display: "grid",
      placeItems: "center",
      flexShrink: 0,
      color,
    }}
  >
    {children}
  </div>
);

export const IconBtn: React.FC<{
  size?: number;
  border?: string;
  bg?: string;
  color?: string;
  children: React.ReactNode;
}> = ({ size = 32, border = "#ecd9bd", bg = "#fff", color = "#7d8aa0", children }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: 8,
      border: `1px solid ${border}`,
      background: bg,
      display: "grid",
      placeItems: "center",
      flexShrink: 0,
      color,
    }}
  >
    {children}
  </div>
);
