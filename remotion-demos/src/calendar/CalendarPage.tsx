import React from "react";
import { EV_STYLES, LAM } from "./lamTheme";
import { glow, TextBar } from "./TextBar";
import {
  IconBook,
  IconBox,
  IconBtn,
  IconCalendar,
  IconClipboard,
  IconDoc,
  IconFile,
  IconGrid,
  IconImage,
  IconLink,
  IconMessage,
  IconPencil,
  IconPlay,
  IconUpload,
  IconVideo,
} from "./Icons";
import {
  ATTENDANCE_STUDENTS,
  SPAN_EVENTS,
  TIME_ROWS,
  TODAY_INDEX,
  WEEK_DAYS,
  type SpanEvent,
} from "./weekData";

export type CalendarPageProps = {
  highlightEvent?: string;
  clickPulse?: number;
  eventGlow?: number;
  showLessonModal?: boolean;
  showAttendanceModal?: boolean;
  attendCount?: number;
  attendTotal?: number;
  absentIndices?: Set<number>;
  savePulse?: number;
  attendBtnGlow?: number;
  saveBtnGlow?: number;
};

const ROW_H = 100;
const PAD = 20;
const FS = 2;
const fz = (n: number) => n * FS;

const labelStyle: React.CSSProperties = {
  fontSize: fz(11),
  fontWeight: 600,
  color: LAM.inkSoft,
  lineHeight: 1.3,
};

const subLabelStyle: React.CSSProperties = {
  fontSize: fz(10),
  color: LAM.muted,
  lineHeight: 1.3,
};

function SpanEventBlock({
  ev,
  highlighted,
  clickPulse,
  glowAmount = 0,
}: {
  ev: SpanEvent;
  highlighted: boolean;
  clickPulse: number;
  glowAmount?: number;
}) {
  const st = EV_STYLES[ev.cls];
  const active = highlighted && (clickPulse > 0.3 || glowAmount > 0);
  return (
    <div
      style={{
        gridColumn: `${ev.startDay + 2} / span ${ev.span}`,
        gridRow: ev.row + 2,
        margin: "5px 6px",
        borderRadius: 14,
        padding: "10px 12px",
        background: active ? LAM.accentSoft : st.bg,
        border: `1px solid ${active ? LAM.accent : st.border + "66"}`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 4,
        minHeight: ROW_H - 12,
        transform: highlighted ? `scale(${1 - clickPulse * 0.02})` : undefined,
        zIndex: highlighted ? 2 : 1,
        ...glow(glowAmount),
      }}
    >
      <span style={{ fontSize: fz(12), fontWeight: 700, color: st.color }}>{ev.title}</span>
      <span style={{ fontSize: fz(10), fontWeight: 600, color: LAM.muted }}>{ev.time}</span>
    </div>
  );
}

function ScheduleGrid({
  highlightEvent,
  clickPulse = 0,
  eventGlow = 0,
}: {
  highlightEvent?: string;
  clickPulse?: number;
  eventGlow?: number;
}) {
  return (
    <div
      style={{
        flex: 1,
        minHeight: 0,
        display: "grid",
        gridTemplateColumns: "64px repeat(7, 1fr)",
        gridTemplateRows: `56px repeat(${TIME_ROWS.length}, ${ROW_H}px)`,
        border: `1px solid ${LAM.line}`,
        borderRadius: 16,
        overflow: "hidden",
        background: "#fff",
      }}
    >
      <div style={{ gridColumn: 1, gridRow: 1, background: "#fff", borderBottom: `1px solid ${LAM.line}` }} />
      {WEEK_DAYS.map((d, i) => (
        <div
          key={d.dow}
          style={{
            gridColumn: i + 2,
            gridRow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            borderBottom: `1px solid ${LAM.line}`,
            borderLeft: `1px solid ${LAM.line}`,
            background: d.today ? LAM.green : "transparent",
            padding: "4px 0",
          }}
        >
          <span
            style={{
              fontSize: fz(d.today ? 13 : 11),
              fontWeight: d.today ? 800 : 600,
              fontFamily: d.today ? LAM.font : LAM.fontBody,
              color: d.today ? "#fff" : LAM.muted,
            }}
          >
            {d.dow}
          </span>
        </div>
      ))}

      {TIME_ROWS.map((t, row) => (
        <React.Fragment key={t}>
          <div
            style={{
              gridColumn: 1,
              gridRow: row + 2,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-end",
              padding: "6px 6px 0 0",
              fontSize: fz(11),
              fontWeight: 600,
              color: LAM.muted,
              borderBottom: row < TIME_ROWS.length - 1 ? `1px solid ${LAM.line}` : undefined,
            }}
          >
            {t}
          </div>
          {WEEK_DAYS.map((_, col) => (
            <div
              key={`cell-${row}-${col}`}
              style={{
                gridColumn: col + 2,
                gridRow: row + 2,
                borderLeft: `1px solid ${LAM.line}`,
                borderBottom: row < TIME_ROWS.length - 1 ? `1px solid ${LAM.line}` : undefined,
                background:
                  col === TODAY_INDEX || col === TODAY_INDEX - 1 ? "rgba(232,247,239,0.35)" : "#fff",
              }}
            />
          ))}
        </React.Fragment>
      ))}

      {SPAN_EVENTS.map((ev) => (
        <SpanEventBlock
          key={ev.title + ev.row}
          ev={ev}
          highlighted={ev.title === highlightEvent}
          clickPulse={ev.title === highlightEvent ? clickPulse : 0}
          glowAmount={ev.title === highlightEvent ? eventGlow : 0}
        />
      ))}
    </div>
  );
}

function MetaChip({
  icon,
  iconBg,
  iconColor,
  label,
  sub,
  highlight,
  glowAmount = 0,
}: {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  label: string;
  sub?: string;
  highlight?: boolean;
  glowAmount?: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 12px",
        borderRadius: 12,
        border: `1px solid ${highlight || glowAmount > 0 ? LAM.accent : LAM.line}`,
        background: highlight || glowAmount > 0 ? LAM.accentSoft : "#fff",
        minWidth: 0,
        flex: 1,
        ...glow(glowAmount),
      }}
    >
      <IconBox bg={iconBg} color={iconColor} size={52}>
        {icon}
      </IconBox>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={labelStyle}>{label}</div>
        {sub && <div style={subLabelStyle}>{sub}</div>}
      </div>
    </div>
  );
}

function LessonDetailModal({
  attendCount = 30,
  attendTotal = 30,
  attendBtnGlow = 0,
}: {
  attendCount?: number;
  attendTotal?: number;
  attendBtnGlow?: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(14, 17, 24, 0.52)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: PAD,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#fff",
          borderRadius: 14,
          boxShadow: "0 24px 80px rgba(14,17,24,0.35)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "18px 22px 14px", borderBottom: `1px solid ${LAM.line}`, flexShrink: 0 }}>
          <TextBar width="72%" height={40} style={{ marginBottom: 10 }} />
          <TextBar width="48%" height={28} style={{ marginBottom: 14 }} />
          <div style={{ display: "flex", gap: 8 }}>
            <MetaChip
              icon={<IconBook size={32} color={LAM.green} />}
              iconBg={LAM.greenBg}
              iconColor={LAM.green}
              label="Môn Toán"
            />
            <MetaChip
              icon={<IconClipboard size={32} color={LAM.violet} />}
              iconBg={LAM.violetBg}
              iconColor={LAM.violet}
              label={`Điểm danh: ${attendCount}/${attendTotal}`}
              glowAmount={attendBtnGlow}
              highlight={attendBtnGlow > 0.3}
            />
            <MetaChip
              icon={<IconCalendar size={32} color={LAM.blue} />}
              iconBg={LAM.blueBg}
              iconColor={LAM.blue}
              label="13/6/2026"
            />
            <MetaChip
              icon={<IconVideo size={32} color={LAM.violet} />}
              iconBg={LAM.violetBg}
              iconColor={LAM.violet}
              label="Online"
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", flex: 1, minHeight: 0, overflow: "hidden" }}>
          <div style={{ padding: "16px 22px", overflow: "hidden", borderRight: `1px solid ${LAM.line}` }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
                <IconBox bg={LAM.blueBg} color={LAM.blue} size={40}>
                  <IconFile size={28} color={LAM.blue} />
                </IconBox>
                <TextBar width="55%" height={22} />
              </div>
              <IconBtn size={40}>
                <IconPencil size={26} />
              </IconBtn>
            </div>
            <div
              style={{
                padding: "14px 16px",
                borderRadius: 12,
                border: `1px solid ${LAM.line}`,
                background: LAM.bg,
                marginBottom: 16,
              }}
            >
              <TextBar width="100%" height={18} style={{ marginBottom: 8 }} />
              <TextBar width="96%" height={18} style={{ marginBottom: 8 }} />
              <TextBar width="92%" height={18} style={{ marginBottom: 8 }} />
              <TextBar width="88%" height={18} style={{ marginBottom: 8 }} />
              <TextBar width="76%" height={18} style={{ marginBottom: 8 }} />
              <TextBar width="64%" height={18} />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <IconBox bg={LAM.violetBg} color={LAM.violet} size={40}>
                <IconMessage size={28} color={LAM.violet} />
              </IconBox>
              <TextBar width="38%" height={22} />
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#f6a23a,#ff5c00)",
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1 }}>
                <TextBar width="100%" height={18} style={{ marginBottom: 8 }} />
                <TextBar width="88%" height={18} style={{ marginBottom: 8 }} />
                <TextBar width="72%" height={18} />
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#f6a23a,#ff5c00)",
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1 }}>
                <TextBar width="100%" height={18} style={{ marginBottom: 8 }} />
                <TextBar width="80%" height={18} />
              </div>
            </div>
          </div>

          <aside style={{ background: "#fafbfc", display: "flex", flexDirection: "column", minHeight: 0 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderBottom: `1px solid ${LAM.line}` }}>
              {(["Bài tập", "Kiểm tra", "Tài liệu"] as const).map((tab, i) => (
                <div key={tab} style={{ padding: "12px 8px", textAlign: "center" }}>
                  <span
                    style={{
                      fontSize: fz(11),
                      fontWeight: i === 2 ? 700 : 600,
                      color: i === 2 ? LAM.accent : LAM.muted,
                    }}
                  >
                    {tab}
                  </span>
                  {i === 2 && (
                    <div style={{ height: 2, background: LAM.accent, borderRadius: 2, marginTop: 8 }} />
                  )}
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 14,
                padding: "12px 10px",
                borderBottom: `1px solid ${LAM.line}`,
              }}
            >
              {[
                { label: "Ảnh & video", active: true, icon: <IconImage size={36} color={LAM.accent} /> },
                { label: "Tài liệu", active: false, icon: <IconDoc size={36} /> },
                { label: "Link", active: false, icon: <IconLink size={36} /> },
              ].map((f) => (
                <div key={f.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      border: `2px solid ${f.active ? LAM.accent : LAM.line}`,
                      background: f.active ? LAM.accentSoft : "#fff",
                      display: "grid",
                      placeItems: "center",
                      color: f.active ? LAM.accent : LAM.muted,
                    }}
                  >
                    {f.icon}
                  </div>
                  <span style={{ fontSize: fz(9), fontWeight: 600, color: f.active ? LAM.accent : LAM.muted }}>
                    {f.label}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ padding: "12px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, flex: 1 }}>
              {[
                { bg: "#dbeafe", play: false },
                { bg: "#ede9fe", play: true },
                { bg: "#dcfce7", play: false },
              ].map((tile, i) => (
                <div
                  key={i}
                  style={{
                    aspectRatio: "1",
                    borderRadius: 12,
                    background: tile.bg,
                    display: "grid",
                    placeItems: "center",
                    position: "relative",
                  }}
                >
                  {tile.play && (
                    <div
                      style={{
                        position: "absolute",
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.92)",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%,-50%)",
                        display: "grid",
                        placeItems: "center",
                        color: LAM.violet,
                      }}
                    >
                      <IconPlay size={24} color={LAM.violet} />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div style={{ padding: "12px", borderTop: `1px solid ${LAM.line}` }}>
              <div
                style={{
                  border: `2px dashed ${LAM.line}`,
                  borderRadius: 12,
                  padding: "14px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: 10,
                    background: LAM.accent,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    color: "#fff",
                    fontSize: fz(11),
                    fontWeight: 700,
                  }}
                >
                  <IconUpload size={32} color="#fff" />
                  Tải lên tài liệu
                </div>
                <span style={{ fontSize: fz(9), color: LAM.muted, textAlign: "center" }}>
                  Ảnh, video, PDF, Word, Excel...
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function AttendanceModal({
  attendCount,
  attendTotal,
  absentIndices,
  savePulse,
  saveBtnGlow = 0,
}: {
  attendCount: number;
  attendTotal: number;
  absentIndices: Set<number>;
  savePulse: number;
  saveBtnGlow?: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(14, 17, 24, 0.55)",
        zIndex: 110,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: PAD,
      }}
    >
      <div
        style={{
          width: "100%",
          maxHeight: "92%",
          background: "#fff",
          borderRadius: 14,
          overflow: "hidden",
          boxShadow: "0 24px 64px rgba(14,17,24,0.4)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${LAM.line}` }}>
          <h2 style={{ margin: 0, fontSize: fz(16), fontWeight: 800, color: LAM.ink }}>
            Điểm danh – Toán 9A
          </h2>
          <p style={{ margin: "6px 0 0", fontSize: fz(11), color: LAM.muted }}>
            Có mặt: <b style={{ color: LAM.ink }}>{attendCount}</b>/{attendTotal} học sinh
          </p>
        </div>
        <div style={{ flex: 1, overflow: "hidden" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "48px 1fr 120px 90px",
              gap: 8,
              padding: "10px 16px",
              background: "#fafbfc",
              borderBottom: `1px solid ${LAM.line}`,
            }}
          >
            {["STT", "Học sinh", "Điểm danh", "Chuyên cần"].map((h) => (
              <span key={h} style={{ fontSize: fz(10), fontWeight: 700, color: LAM.muted }}>
                {h}
              </span>
            ))}
          </div>
          {ATTENDANCE_STUDENTS.map((student, i) => {
            const absent = absentIndices.has(i);
            return (
              <div
                key={student.name}
                style={{
                  display: "grid",
                  gridTemplateColumns: "48px 1fr 120px 90px",
                  gap: 8,
                  padding: "10px 16px",
                  borderBottom: `1px solid ${LAM.line}`,
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: fz(11), color: LAM.muted }}>{i + 1}</span>
                <span style={{ fontSize: fz(11), fontWeight: 600, color: LAM.inkSoft }}>{student.name}</span>
                <span
                  style={{
                    fontSize: fz(10),
                    fontWeight: 700,
                    padding: "4px 8px",
                    borderRadius: 6,
                    textAlign: "center",
                    background: absent ? "#fee2e2" : LAM.greenBg,
                    color: absent ? "#b91c1c" : "#15803d",
                    border: `1px solid ${absent ? "#fca5a5" : LAM.green + "55"}`,
                  }}
                >
                  {absent ? "Vắng" : "Có mặt"}
                </span>
                <span style={{ fontSize: fz(10), fontWeight: 600, color: LAM.accent }}>{student.rate}</span>
              </div>
            );
          })}
        </div>
        <div style={{ padding: "14px 20px", borderTop: `1px solid ${LAM.line}`, textAlign: "right" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "11px 22px",
              borderRadius: 10,
              background: LAM.accent,
              color: "#fff",
              fontSize: fz(12),
              fontWeight: 700,
              transform: `scale(${1 + savePulse * 0.04})`,
              ...glow(saveBtnGlow),
            }}
          >
            Lưu điểm danh
          </div>
        </div>
      </div>
    </div>
  );
}

export const CalendarPage: React.FC<CalendarPageProps> = ({
  highlightEvent,
  clickPulse = 0,
  eventGlow = 0,
  showLessonModal,
  showAttendanceModal,
  attendCount = 30,
  attendTotal = 30,
  absentIndices = new Set<number>(),
  savePulse = 0,
  attendBtnGlow = 0,
  saveBtnGlow = 0,
}) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: LAM.bg,
        fontFamily: LAM.fontBody,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        padding: PAD,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 14,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: LAM.green }} />
          <span style={{ fontFamily: LAM.font, fontSize: fz(18), fontWeight: 800, color: LAM.ink }}>Lịch dạy</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <IconBtn size={48} border={LAM.line}>
            <IconGrid size={32} />
          </IconBtn>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              padding: "4px 6px",
              borderRadius: 999,
              border: `1px solid ${LAM.line}`,
              background: "#fff",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: `1px solid ${LAM.line}`,
                display: "grid",
                placeItems: "center",
                fontSize: fz(18),
                color: LAM.muted,
                lineHeight: 1,
              }}
            >
              ‹
            </div>
            <span
              style={{
                fontSize: fz(12),
                fontWeight: 700,
                color: LAM.inkSoft,
                padding: "0 6px",
                whiteSpace: "nowrap",
              }}
            >
              Tuần này
            </span>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: `1px solid ${LAM.line}`,
                display: "grid",
                placeItems: "center",
                fontSize: fz(18),
                color: LAM.muted,
                lineHeight: 1,
              }}
            >
              ›
            </div>
          </div>
        </div>
      </div>

      <ScheduleGrid highlightEvent={highlightEvent} clickPulse={clickPulse} eventGlow={eventGlow} />

      {showLessonModal && (
        <LessonDetailModal
          attendCount={attendCount}
          attendTotal={attendTotal}
          attendBtnGlow={attendBtnGlow}
        />
      )}
      {showAttendanceModal && (
        <AttendanceModal
          attendCount={attendCount}
          attendTotal={attendTotal}
          absentIndices={absentIndices}
          savePulse={savePulse}
          saveBtnGlow={saveBtnGlow}
        />
      )}
    </div>
  );
};
