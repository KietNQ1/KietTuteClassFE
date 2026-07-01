import React from "react";
import { LAM } from "../calendar/lamTheme";
import { glow, TextBar } from "../calendar/TextBar";
import { COLLAPSED_SESSION, EARLIER_SESSIONS, SESSION } from "./homeworkData";
import { fl, ft } from "./learningScale";

export type HomeworkPageProps = {
  expandedSession: boolean;
  sessionGlow: number;
  assignGlow: number;
  highlightAssignIndex: number | null;
};

function AssignIcon({ type }: { type: string }) {
  const isQuiz = type === "quiz";
  return (
    <span
      style={{
        width: fl(18),
        height: fl(18),
        borderRadius: fl(5),
        display: "grid",
        placeItems: "center",
        fontSize: ft(5),
        fontWeight: 800,
        background: isQuiz ? "#ede9fe" : LAM.blueBg,
        color: isQuiz ? LAM.violet : LAM.blue,
        flexShrink: 0,
      }}
    >
      {isQuiz ? "?" : type}
    </span>
  );
}

function SessionBadge({ num }: { num: number }) {
  const label = num < 10 ? `Buổi 0${num}` : `Buổi ${num}`;
  const variants = [
    { bg: LAM.violetBg, color: LAM.violet },
    { bg: LAM.greenBg, color: LAM.green },
    { bg: LAM.blueBg, color: LAM.blue },
    { bg: LAM.amberBg, color: LAM.amber },
  ];
  const v = variants[(num - 1) % variants.length];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: fl(36),
        padding: `${fl(3)}px ${fl(6)}px`,
        borderRadius: 999,
        fontSize: ft(6.5),
        fontWeight: 800,
        background: v.bg,
        color: v.color,
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}
    >
      {label}
    </span>
  );
}

function SessionRow({
  num,
  title,
  date,
  submitted,
  total,
  needGrade,
  isOpen,
  sessionGlow,
  titlePlaceholder,
  children,
}: {
  num: number;
  title?: string;
  date: string;
  submitted: number;
  total: number;
  needGrade: number;
  isOpen: boolean;
  sessionGlow: number;
  titlePlaceholder?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div style={{ borderBottom: `1px solid ${LAM.line}` }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: fl(6),
          padding: `${fl(6)}px ${fl(10)}px`,
          background: sessionGlow > 0 ? LAM.accentSoft : "#fff",
          ...glow(sessionGlow),
        }}
      >
        <button
          type="button"
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr auto auto",
            alignItems: "center",
            gap: `${fl(6)}px ${fl(8)}px`,
            flex: 1,
            minWidth: 0,
            padding: `${fl(2)}px 0`,
            border: "none",
            background: "transparent",
            cursor: "pointer",
            textAlign: "left",
            fontFamily: "inherit",
          }}
        >
          <SessionBadge num={num} />
          <div style={{ minWidth: 0 }}>
            {titlePlaceholder ? (
              <TextBar width="72%" height={fl(8)} style={{ marginBottom: fl(3) }} />
            ) : (
              <b
                style={{
                  display: "block",
                  fontSize: ft(7.5),
                  fontWeight: 700,
                  color: LAM.ink,
                  marginBottom: 2,
                }}
              >
                {title}
              </b>
            )}
            <small style={{ fontSize: ft(6.5), color: LAM.muted, fontWeight: 500 }}>{date}</small>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: `${fl(4)}px ${fl(7)}px`,
              justifyContent: "flex-end",
            }}
          >
            <span style={{ fontSize: ft(6.5), fontWeight: 600, color: LAM.inkSoft, whiteSpace: "nowrap" }}>
              {submitted}/{total}
            </span>
            {needGrade > 0 ? (
              <span style={{ fontSize: ft(6.5), fontWeight: 600, color: LAM.accent, whiteSpace: "nowrap" }}>
                {needGrade} cần chấm
              </span>
            ) : null}
          </div>
          <span style={{ color: LAM.muted, display: "grid", transform: isOpen ? "rotate(180deg)" : undefined }}>
            <svg width={fl(10)} height={fl(10)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
        </button>
      </div>
      {isOpen && children ? (
        <div style={{ borderTop: `1px solid ${LAM.line}`, background: "#fafbfc" }}>{children}</div>
      ) : null}
    </div>
  );
}

function AssignRow({
  index,
  type,
  title,
  submitted,
  total,
  needGrade,
  glowAmount,
  highlighted,
  titlePlaceholder,
}: {
  index: number;
  type: string;
  title: string;
  submitted: number;
  total: number;
  needGrade: number;
  glowAmount: number;
  highlighted: boolean;
  titlePlaceholder?: boolean;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `${fl(14)}px auto 1fr auto`,
        alignItems: "center",
        gap: fl(6),
        padding: `${fl(6)}px ${fl(12)}px`,
        borderBottom: `1px solid ${LAM.line}`,
        background: highlighted ? "#fff" : undefined,
        cursor: "pointer",
        ...glow(glowAmount),
      }}
    >
      <span style={{ fontSize: ft(6.5), fontWeight: 700, color: LAM.muted, textAlign: "center" }}>
        {index + 1}
      </span>
      <AssignIcon type={type} />
      {titlePlaceholder ? (
        <TextBar width="85%" height={fl(8)} />
      ) : (
        <span
          style={{
            fontSize: ft(7),
            fontWeight: 700,
            color: LAM.ink,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </span>
      )}
      <span style={{ fontSize: ft(6), fontWeight: 600, color: LAM.inkSoft, whiteSpace: "nowrap" }}>
        {submitted}/{total}
      </span>
    </div>
  );
}

export const HomeworkPage: React.FC<HomeworkPageProps> = ({
  expandedSession,
  sessionGlow,
  assignGlow,
  highlightAssignIndex,
}) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: LAM.bg,
        fontFamily: LAM.font,
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <div style={{ padding: `${fl(10)}px ${fl(16)}px ${fl(8)}px` }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: fl(7), marginBottom: fl(10) }}>
          <span
            style={{
              width: fl(24),
              height: fl(24),
              borderRadius: fl(7),
              background: LAM.roseBg,
              color: LAM.rose,
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
            }}
          >
            <svg width={fl(12)} height={fl(12)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6M16 13H8M16 17H8" />
            </svg>
          </span>
          <div>
            <h1 style={{ margin: 0, fontSize: ft(12), fontWeight: 800, color: LAM.ink }}>
              Bài tập <b style={{ color: LAM.blue }}>Toán 9A</b>
            </h1>
          </div>
        </div>

        <div
          style={{
            background: LAM.surface,
            border: `1px solid ${LAM.line}`,
            borderRadius: LAM.rLg,
            boxShadow: LAM.shadowSm,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: fl(6),
              padding: `${fl(8)}px ${fl(10)}px`,
              borderBottom: `1px solid ${LAM.line}`,
              flexWrap: "wrap",
            }}
          >
            <h3 style={{ margin: 0, fontSize: ft(7.5), fontWeight: 700, color: LAM.ink }}>
              Theo buổi
            </h3>
            <div style={{ display: "flex", gap: fl(4), flexWrap: "wrap" }}>
              {["Tất cả", "Đã dạy"].map((f, i) => (
                <span
                  key={f}
                  style={{
                    padding: `${fl(4)}px ${fl(7)}px`,
                    borderRadius: 999,
                    border: `1px solid ${i === 1 ? LAM.accent : LAM.line}`,
                    background: i === 1 ? LAM.accentSoft : "#fff",
                    color: i === 1 ? LAM.accent : LAM.inkSoft,
                    fontSize: ft(6.5),
                    fontWeight: 700,
                  }}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: fl(6),
              padding: `${fl(6)}px ${fl(10)}px`,
              background: "#fafbfc",
              borderBottom: `1px solid ${LAM.line}`,
            }}
          >
            <h4
              style={{
                margin: 0,
                fontSize: ft(6.5),
                fontWeight: 800,
                color: LAM.inkSoft,
                textTransform: "uppercase",
                letterSpacing: "0.03em",
              }}
            >
              Đã dạy
            </h4>
          </div>

          <div style={{ maxHeight: fl(200), overflow: "hidden" }}>
            <SessionRow
              num={SESSION.num}
              title={SESSION.title}
              date={SESSION.date}
              submitted={SESSION.submitted}
              total={SESSION.total}
              needGrade={SESSION.needGrade}
              isOpen={expandedSession}
              sessionGlow={sessionGlow}
            >
              {SESSION.assignments.map((a, i) => (
                <AssignRow
                  key={i}
                  index={i}
                  type={a.type}
                  title={a.title}
                  submitted={a.submitted}
                  total={a.total}
                  needGrade={a.needGrade}
                  glowAmount={highlightAssignIndex === i ? assignGlow : 0}
                  highlighted={highlightAssignIndex === i && assignGlow > 0.3}
                  titlePlaceholder={"placeholder" in a && a.placeholder}
                />
              ))}
            </SessionRow>

            <SessionRow
              num={COLLAPSED_SESSION.num}
              date={COLLAPSED_SESSION.date}
              submitted={COLLAPSED_SESSION.submitted}
              total={COLLAPSED_SESSION.total}
              needGrade={COLLAPSED_SESSION.needGrade}
              isOpen={false}
              sessionGlow={0}
              titlePlaceholder
            />

            {EARLIER_SESSIONS.map((s) => (
              <SessionRow
                key={s.num}
                num={s.num}
                date={s.date}
                submitted={s.submitted}
                total={s.total}
                needGrade={s.needGrade}
                isOpen={false}
                sessionGlow={0}
                titlePlaceholder
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
