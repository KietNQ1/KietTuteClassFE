import { ReactNode } from "react";

type DemoShellProps = {
  title: string;
  subtitle: string;
  accent: string;
  children: ReactNode;
};

export const DemoShell: React.FC<DemoShellProps> = ({
  title,
  subtitle,
  accent,
  children,
}) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      background: "#fffaf1",
      fontFamily: "Arial, Helvetica, sans-serif",
      color: "#0b2f66",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 20px",
        background: "#fff8ea",
        borderBottom: "1px solid #ecd9bd",
      }}
    >
      <div>
        <div style={{ fontSize: 18, fontWeight: 800 }}>{title}</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#7d8aa0", marginTop: 2 }}>
          {subtitle}
        </div>
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {["#ff5c00", "#f7c56b", "#21b37b"].map((c) => (
          <span
            key={c}
            style={{ width: 10, height: 10, borderRadius: 999, background: c }}
          />
        ))}
      </div>
    </div>
    <div style={{ flex: 1, padding: 20, position: "relative" }}>
      <div
        style={{
          position: "absolute",
          left: 20,
          top: 20,
          bottom: 20,
          width: 4,
          borderRadius: 999,
          background: accent,
          opacity: 0.35,
        }}
      />
      {children}
    </div>
  </div>
);
