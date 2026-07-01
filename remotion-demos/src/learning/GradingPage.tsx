import React from "react";
import { LAM } from "../calendar/lamTheme";
import { glow, TextBar } from "../calendar/TextBar";
import { GRADING_TITLE, STUDENTS, type StudentRow } from "./homeworkData";
import { fl, ft } from "./learningScale";

export type GradingPageProps = {
  selectedStudentIndex: number;
  studentGlow: number;
  essayScore: number;
  totalScore: number;
  submitGlow: number;
  scrollY: number;
  showEssayFocus: boolean;
};

function Avatar({ s, size }: { s: StudentRow; size: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: s.color,
        color: "#fff",
        display: "grid",
        placeItems: "center",
        fontSize: size * 0.38,
        fontWeight: 800,
        flexShrink: 0,
      }}
    >
      {s.initials}
    </div>
  );
}

function StatusBadge({ s }: { s: StudentRow }) {
  if (s.status === "need") {
    return (
      <span style={{ fontSize: ft(5.5), fontWeight: 700, color: LAM.accent, whiteSpace: "nowrap" }}>
        Cần chấm
      </span>
    );
  }
  if (s.status === "late") {
    return (
      <span style={{ fontSize: ft(5.5), fontWeight: 700, color: LAM.rose, whiteSpace: "nowrap" }}>
        Nộp muộn
      </span>
    );
  }
  return (
    <span style={{ fontSize: ft(6), fontWeight: 800, color: LAM.green, whiteSpace: "nowrap" }}>
      {s.score?.toFixed(1)}
    </span>
  );
}

function McQuestion({
  num,
  correct,
  selectedOption,
}: {
  num: number;
  correct: boolean;
  selectedOption: string;
}) {
  const keys = ["A", "B", "C", "D"];
  return (
    <div
      style={{
        background: "#fff",
        border: `1px solid ${LAM.line}`,
        borderRadius: fl(8),
        padding: `${fl(8)}px ${fl(10)}px`,
        marginBottom: fl(8),
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: fl(6), marginBottom: fl(6) }}>
        <div style={{ display: "flex", alignItems: "center", gap: fl(5) }}>
          <span style={{ fontSize: ft(7), fontWeight: 800, color: LAM.ink }}>Câu {num}</span>
          <span
            style={{
              fontSize: ft(5.5),
              fontWeight: 700,
              padding: `${fl(2)}px ${fl(5)}px`,
              borderRadius: 999,
              background: LAM.blueBg,
              color: LAM.blue,
            }}
          >
            TN
          </span>
        </div>
        <span style={{ fontSize: ft(6), fontWeight: 700, color: correct ? LAM.green : LAM.rose }}>
          {correct ? "Đúng · +2" : "Sai"}
        </span>
      </div>
      <TextBar height={fl(9)} style={{ marginBottom: fl(6) }} />
      <div style={{ display: "flex", flexDirection: "column", gap: fl(4) }}>
        {keys.map((key) => {
          const isSelected = key === selectedOption;
          const isCorrect = correct && isSelected;
          return (
            <div
              key={key}
              style={{
                display: "flex",
                alignItems: "center",
                gap: fl(5),
                padding: `${fl(4)}px ${fl(7)}px`,
                borderRadius: fl(6),
                border: `1.5px solid ${isCorrect ? LAM.green : LAM.line}`,
                background: isCorrect ? LAM.greenBg : "#fafbfc",
              }}
            >
              <span
                style={{
                  width: fl(10),
                  height: fl(10),
                  borderRadius: "50%",
                  border: `2px solid ${isCorrect ? LAM.green : LAM.line}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: fl(6),
                  lineHeight: 1,
                  fontWeight: 800,
                  color: isCorrect ? LAM.green : LAM.inkSoft,
                  flexShrink: 0,
                }}
              >
                {key}
              </span>
              <TextBar width={key === "B" || key === "A" ? "78%" : "62%"} height={fl(7)} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function EssayQuestion({ score, focused }: { score: number; focused: boolean }) {
  const graded = score > 0;
  return (
    <div
      style={{
        background: "#fff",
        border: `1.5px solid ${focused ? LAM.accent : LAM.line}`,
        borderRadius: fl(8),
        padding: `${fl(8)}px ${fl(10)}px`,
        boxShadow: focused ? `0 0 0 ${fl(2)}px rgba(255,92,0,0.15)` : undefined,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: fl(5), marginBottom: fl(6) }}>
        <span style={{ fontSize: ft(7), fontWeight: 800, color: LAM.ink }}>Câu 3</span>
        <span
          style={{
            fontSize: ft(5.5),
            fontWeight: 700,
            padding: `${fl(2)}px ${fl(5)}px`,
            borderRadius: 999,
            background: LAM.amberBg,
            color: LAM.amber,
          }}
        >
          Tự luận
        </span>
      </div>
      <TextBar height={fl(9)} style={{ marginBottom: fl(8) }} />
      <div
        style={{
          marginBottom: fl(8),
          padding: `${fl(7)}px ${fl(8)}px`,
          borderRadius: fl(6),
          border: `1px solid ${LAM.line}`,
          background: "#fffdf8",
          display: "flex",
          flexDirection: "column",
          gap: fl(5),
        }}
      >
        <TextBar width="92%" height={fl(7)} />
        <TextBar width="85%" height={fl(7)} />
        <TextBar width="78%" height={fl(7)} />
        <TextBar width="65%" height={fl(7)} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: fl(8) }}>
        <span style={{ fontSize: ft(6.5), fontWeight: 700, color: LAM.ink }}>Điểm:</span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: fl(4),
            padding: `${fl(4)}px ${fl(8)}px`,
            borderRadius: fl(6),
            border: `2px solid ${graded || focused ? LAM.accent : LAM.line}`,
            background: graded || focused ? LAM.accentSoft : "#fafbfc",
          }}
        >
          <span
            style={{
              fontSize: ft(10),
              fontWeight: 800,
              color: graded ? LAM.accent : LAM.muted,
              minWidth: fl(16),
              textAlign: "center",
            }}
          >
            {graded ? score.toFixed(1) : "—"}
          </span>
          <span style={{ fontSize: ft(7), fontWeight: 600, color: LAM.muted }}>/ 6</span>
        </div>
      </div>
    </div>
  );
}

export const GradingPage: React.FC<GradingPageProps> = ({
  selectedStudentIndex,
  studentGlow,
  essayScore,
  totalScore,
  submitGlow,
  scrollY,
  showEssayFocus,
}) => {
  const student = STUDENTS[selectedStudentIndex];
  const gradedCount = 16;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: LAM.bg,
        fontFamily: LAM.font,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: `${fl(8)}px ${fl(12)}px ${fl(6)}px`,
          borderBottom: `1px solid ${LAM.line}`,
          background: LAM.surface,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: fl(8) }}>
          <div style={{ minWidth: 0 }}>
            <h1 style={{ margin: 0, fontSize: ft(9), fontWeight: 800, color: LAM.ink, lineHeight: 1.25 }}>
              Chấm bài: {GRADING_TITLE}
            </h1>
            <TextBar width={fl(120)} height={fl(6)} style={{ marginTop: fl(4) }} />
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div style={{ fontSize: ft(6.5), fontWeight: 700, color: LAM.inkSoft, marginBottom: fl(3) }}>
              {gradedCount}/21
            </div>
            <div
              style={{
                width: fl(80),
                height: fl(5),
                borderRadius: 999,
                background: "#e8ecf2",
                overflow: "hidden",
                marginLeft: "auto",
              }}
            >
              <div
                style={{
                  width: `${(gradedCount / 21) * 100}%`,
                  height: "100%",
                  background: LAM.blue,
                  borderRadius: 999,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3-column body */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: `${fl(95)}px 1fr ${fl(108)}px`, minHeight: 0 }}>
        {/* Left — student list */}
        <div
          style={{
            borderRight: `1px solid ${LAM.line}`,
            background: LAM.surface,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          <div style={{ padding: `${fl(6)}px ${fl(7)}px`, borderBottom: `1px solid ${LAM.line}` }}>
            <div style={{ fontSize: ft(6.5), fontWeight: 800, color: LAM.ink, marginBottom: fl(4) }}>
              Học sinh
            </div>
            <span
              style={{
                fontSize: ft(5),
                fontWeight: 700,
                padding: `${fl(2)}px ${fl(4)}px`,
                borderRadius: 999,
                background: LAM.accentSoft,
                color: LAM.accent,
                border: `1px solid ${LAM.accent}`,
              }}
            >
              Cần chấm 5
            </span>
          </div>
          <div style={{ flex: 1, overflow: "hidden" }}>
            {STUDENTS.map((s, i) => {
              const selected = i === selectedStudentIndex;
              const rowGlow = i === 0 ? studentGlow : 0;
              return (
                <div
                  key={s.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: fl(5),
                    padding: `${fl(5)}px ${fl(7)}px`,
                    borderBottom: `1px solid ${LAM.line}`,
                    background: selected ? LAM.accentSoft : rowGlow > 0 ? "#fff8f3" : "#fff",
                    cursor: "pointer",
                    ...(i === 0 ? glow(rowGlow) : {}),
                  }}
                >
                  <Avatar s={s} size={fl(14)} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: ft(6),
                        fontWeight: selected ? 800 : 700,
                        color: LAM.ink,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {s.name}
                    </div>
                  </div>
                  <StatusBadge s={s} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Center — questions */}
        <div
          style={{
            minHeight: 0,
            overflow: "hidden",
            background: "#fafbfc",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: `${fl(7)}px ${fl(10)}px`,
              borderBottom: `1px solid ${LAM.line}`,
              background: LAM.surface,
              display: "flex",
              alignItems: "center",
              gap: fl(6),
              flexShrink: 0,
            }}
          >
            <Avatar s={student} size={fl(16)} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: ft(7.5), fontWeight: 800, color: LAM.ink }}>{student.name}</div>
              <span style={{ fontSize: ft(5.5), color: LAM.muted, fontWeight: 600 }}>16/21</span>
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
                transform: `translateY(-${scrollY}px)`,
                willChange: "transform",
              }}
            >
              <div style={{ padding: `${fl(8)}px ${fl(10)}px ${fl(24)}px` }}>
              <McQuestion num={1} correct selectedOption="B" />
              <McQuestion num={2} correct selectedOption="A" />
              <EssayQuestion score={essayScore} focused={showEssayFocus} />
              </div>
            </div>
          </div>
        </div>

        {/* Right — score panel */}
        <div
          style={{
            borderLeft: `1px solid ${LAM.line}`,
            background: LAM.surface,
            display: "flex",
            flexDirection: "column",
            padding: `${fl(8)}px ${fl(8)}px ${fl(10)}px`,
          }}
        >
          <div style={{ fontSize: ft(6.5), fontWeight: 800, color: LAM.ink, marginBottom: fl(6) }}>
            Chấm điểm
          </div>
          <div style={{ textAlign: "center", marginBottom: fl(8) }}>
            <div style={{ fontSize: ft(18), fontWeight: 800, color: LAM.accent, lineHeight: 1 }}>
              {totalScore.toFixed(1)}
            </div>
            <div style={{ fontSize: ft(7), fontWeight: 600, color: LAM.muted }}>/ 10</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: fl(5), marginBottom: fl(8) }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: ft(6), fontWeight: 600, color: LAM.inkSoft }}>Tự động (TN)</span>
              <span style={{ fontSize: ft(6.5), fontWeight: 800, color: LAM.green }}>4 / 4</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: ft(6), fontWeight: 600, color: LAM.inkSoft }}>Giáo viên (TL)</span>
              <span style={{ fontSize: ft(6.5), fontWeight: 800, color: essayScore > 0 ? LAM.accent : LAM.muted }}>
                {essayScore > 0 ? `${essayScore.toFixed(1)} / 6` : "— / 6"}
              </span>
            </div>
          </div>
          <div style={{ marginBottom: fl(8) }}>
            <div style={{ fontSize: ft(5.5), fontWeight: 700, color: LAM.muted, marginBottom: fl(4) }}>
              Chi tiết từng câu
            </div>
            {[
              { q: "Câu 1", s: "2/2" },
              { q: "Câu 2", s: "2/2" },
              { q: "Câu 3", s: essayScore > 0 ? `${essayScore.toFixed(1)}/6` : "—/6" },
            ].map((row) => (
              <div
                key={row.q}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: `${fl(3)}px 0`,
                  borderBottom: `1px solid ${LAM.line}`,
                  fontSize: ft(6),
                  fontWeight: 600,
                }}
              >
                <span style={{ color: LAM.inkSoft }}>{row.q}</span>
                <span style={{ color: LAM.ink, fontWeight: 800 }}>{row.s}</span>
              </div>
            ))}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: ft(5.5), fontWeight: 700, color: LAM.muted, marginBottom: fl(4) }}>
              Nhận xét
            </div>
            <div
              style={{
                padding: `${fl(5)}px ${fl(6)}px`,
                borderRadius: fl(6),
                border: `1px solid ${LAM.line}`,
                background: "#fafbfc",
                display: "flex",
                flexDirection: "column",
                gap: fl(4),
                minHeight: fl(28),
              }}
            >
              <TextBar width="100%" height={fl(6)} />
              <TextBar width="88%" height={fl(6)} />
            </div>
          </div>
          <button
            type="button"
            style={{
              marginTop: fl(8),
              width: "100%",
              padding: `${fl(7)}px ${fl(8)}px`,
              border: "none",
              borderRadius: fl(8),
              background: LAM.blue,
              color: "#fff",
              fontFamily: "inherit",
              fontSize: ft(6.5),
              fontWeight: 800,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: fl(5),
              ...glow(submitGlow),
            }}
          >
            <svg width={fl(8)} height={fl(8)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2 11 13M22 2 15 22 11 13 2 9z" />
            </svg>
            Chấm & tiếp theo
          </button>
        </div>
      </div>
    </div>
  );
};
