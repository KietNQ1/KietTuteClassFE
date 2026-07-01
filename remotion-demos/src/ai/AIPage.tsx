import React from "react";
import { LAM } from "../calendar/lamTheme";
import { glow } from "../calendar/TextBar";

const FS = 2;
const fz = (n: number) => n * FS;
const PAD = 20;

export type AIPageProps = {
  showQ1?: boolean;
  showA1?: boolean;
  a1Text?: string;
  showQ2?: boolean;
  showA2?: boolean;
  a2Text?: string;
  q1Glow?: number;
  q2Glow?: number;
  scrollY?: number;
};

function UserBubble({
  children,
  glowAmount = 0,
  visible = true,
}: {
  children: React.ReactNode;
  glowAmount?: number;
  visible?: boolean;
}) {
  if (!visible) return null;
  return (
    <div style={{ alignSelf: "flex-end", maxWidth: "82%", ...glow(glowAmount) }}>
      <div
        style={{
          background: LAM.accentSoft,
          borderRadius: 18,
          padding: "14px 18px",
          fontSize: fz(12),
          fontWeight: 700,
          color: LAM.ink,
          border: `1px solid ${glowAmount > 0 ? LAM.accent : "#ffe1b8"}`,
          lineHeight: 1.45,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function AICard({
  children,
  visible = true,
}: {
  children: React.ReactNode;
  visible?: boolean;
}) {
  if (!visible) return null;
  return (
    <div style={{ alignSelf: "flex-start", maxWidth: "92%" }}>
      <div
        style={{
          background: "#fff",
          borderRadius: 20,
          padding: "16px 18px",
          border: `1px solid ${LAM.line}`,
          boxShadow: LAM.shadowSm,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 10,
          }}
        >
          <div
            style={{
              width: fz(14),
              height: fz(14),
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${LAM.violet}, ${LAM.accent})`,
            }}
          />
          <span style={{ fontSize: fz(11), fontWeight: 800, color: LAM.violet }}>
            AI Teaching Assistant
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

const STUDENTS = [
  { name: "Trần Hoàng Bình", note: "ĐTB 5.8 · hay vắng buổi luyện tập" },
  { name: "Lê Thu Chi", note: "Chưa nộp 2/3 bài tập tuần này" },
  { name: "Phạm Quốc Dũng", note: "Yếu phần đạo hàm ứng dụng" },
];

export const AIPage: React.FC<AIPageProps> = ({
  showQ1,
  showA1,
  a1Text = "",
  showQ2,
  showA2,
  a2Text = "",
  q1Glow = 0,
  q2Glow = 0,
  scrollY = 0,
}) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: LAM.bg,
        fontFamily: LAM.fontBody,
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
          padding: `${PAD}px ${PAD + 4}px 14px`,
          background: LAM.sidebar,
          borderBottom: `1px solid ${LAM.line}`,
          flexShrink: 0,
        }}
      >
        <div>
          <div style={{ fontFamily: LAM.font, fontSize: fz(14), fontWeight: 800, color: LAM.ink }}>
            AI Teaching Assistant
          </div>
          <div style={{ fontSize: fz(10), fontWeight: 600, color: LAM.muted, marginTop: 4 }}>
            Lớp Toán 9A · TuteClass AI
          </div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {[LAM.accent, LAM.amber, LAM.green].map((c) => (
            <span key={c} style={{ width: 10, height: 10, borderRadius: 999, background: c }} />
          ))}
        </div>
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: PAD,
            top: PAD,
            bottom: 0,
            width: 4,
            borderRadius: 999,
            background: LAM.violet,
            opacity: 0.3,
            zIndex: 1,
          }}
        />

        <div
          style={{
            height: "100%",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              transform: `translateY(-${scrollY}px)`,
              padding: `${PAD}px ${PAD}px ${PAD + 40}px ${PAD + 12}px`,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
        <UserBubble glowAmount={q1Glow} visible={showQ1}>
          Học sinh nào cần được hỗ trợ thêm trong lớp Toán 9A?
        </UserBubble>

        <AICard visible={showA1}>
          <p style={{ fontSize: fz(11), color: LAM.inkSoft, margin: "0 0 12px", lineHeight: 1.5 }}>
            {a1Text}
            {showA1 && a1Text.length < 72 ? "|" : ""}
          </p>
          {a1Text.length >= 40 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {STUDENTS.map((s, i) => (
                <div
                  key={s.name}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    padding: "10px 12px",
                    borderRadius: 12,
                    background: i === 0 ? LAM.violetBg : LAM.bg,
                    border: `1px solid ${i === 0 ? LAM.violet + "55" : LAM.line}`,
                  }}
                >
                  <span
                    style={{
                      width: fz(10),
                      height: fz(10),
                      borderRadius: "50%",
                      background: i === 0 ? LAM.violet : LAM.muted,
                      flexShrink: 0,
                      marginTop: 4,
                    }}
                  />
                  <div>
                    <div style={{ fontSize: fz(11), fontWeight: 700, color: LAM.ink }}>{s.name}</div>
                    <div style={{ fontSize: fz(10), color: LAM.muted, marginTop: 2 }}>{s.note}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </AICard>

        <UserBubble glowAmount={q2Glow} visible={showQ2}>
          Tình hình học tập của Trần Hoàng Bình thế nào?
        </UserBubble>

        <AICard visible={showA2}>
          <p style={{ fontSize: fz(11), color: LAM.inkSoft, margin: 0, lineHeight: 1.55, whiteSpace: "pre-line" }}>
            {a2Text}
            {showA2 && a2Text.length < 220 ? "|" : ""}
          </p>
          {a2Text.length > 180 && (
            <div
              style={{
                marginTop: 12,
                padding: "10px 12px",
                borderRadius: 10,
                background: LAM.accentSoft,
                border: `1px solid ${LAM.accent}44`,
                fontSize: fz(10),
                fontWeight: 700,
                color: LAM.accent,
                lineHeight: 1.45,
              }}
            >
              Gợi ý: Hẹn Bình ôn lại chương đạo hàm ứng dụng và theo dõi bài tập tuần tới.
            </div>
          )}
        </AICard>
          </div>
        </div>
      </div>

      <div
        style={{
          padding: `12px ${PAD}px ${PAD}px`,
          borderTop: `1px solid ${LAM.line}`,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            padding: "14px 16px",
            borderRadius: 14,
            border: `1px dashed ${LAM.line}`,
            background: "#fff",
            fontSize: fz(11),
            color: LAM.muted,
            fontWeight: 600,
          }}
        >
          Hỏi AI về lớp học, học sinh, bài tập...
        </div>
      </div>
    </div>
  );
};
