import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CalendarPage } from "../calendar/CalendarPage";

function frameRange(
  frame: number,
  startSec: number,
  endSec: number,
  fps: number
): number {
  return interpolate(frame, [startSec * fps, endSec * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

function glowPulse(frame: number, fps: number, atSec: number): number {
  return spring({
    frame: frame - Math.round(atSec * fps),
    fps,
    config: { damping: 14, stiffness: 220 },
  });
}

export const SolutionCalendar: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 200 } });

  const eventGlow = frame >= Math.round(0.6 * fps) && frame < Math.round(1.25 * fps)
    ? glowPulse(frame, fps, 0.6)
    : 0;

  const clickPulse = spring({
    frame: frame - Math.round(1.2 * fps),
    fps,
    config: { damping: 14, stiffness: 200 },
  });

  const lessonIn = frameRange(frame, 1.4, 1.9, fps);
  const lessonOut = 1 - frameRange(frame, 13, 14.2, fps);
  const showLesson = lessonIn > 0 && lessonOut > 0;

  const attendBtnGlow =
    showLesson && !frameRange(frame, 5.3, 5.8, fps) && frame >= Math.round(4.2 * fps) && frame < Math.round(5.35 * fps)
      ? glowPulse(frame, fps, 4.2)
      : 0;

  const attendIn = frameRange(frame, 5.3, 5.8, fps);
  const attendOut = 1 - frameRange(frame, 10.2, 10.7, fps);
  const showAttend = attendIn > 0 && attendOut > 0;

  const saveBtnGlow =
    showAttend && frame >= Math.round(9 * fps) && frame < Math.round(9.6 * fps)
      ? glowPulse(frame, fps, 9)
      : 0;

  const absent1 = frame >= Math.round(6.2 * fps);
  const absent2 = frame >= Math.round(7 * fps);
  const absentIndices = new Set<number>();
  if (absent1) absentIndices.add(1);
  if (absent2) absentIndices.add(5);

  const saved = frame >= Math.round(9.5 * fps);
  const attendCount = saved ? 28 : 30;

  const savePulse = spring({
    frame: frame - Math.round(9.4 * fps),
    fps,
    config: { damping: 12 },
  });

  const endPulse = interpolate(
    frame,
    [13 * fps, 13.8 * fps, 15 * fps],
    [0, 1, 0.4],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) }
  );

  const highlightEvent = frame >= Math.round(0.5 * fps) ? "Toán 9A" : undefined;

  return (
    <AbsoluteFill style={{ background: "#fffaf1" }}>
      <div style={{ width: "100%", height: "100%", opacity: enter }}>
        <CalendarPage
          highlightEvent={highlightEvent}
          clickPulse={clickPulse + endPulse * 0.3}
          eventGlow={eventGlow}
          showLessonModal={showLesson}
          showAttendanceModal={showAttend}
          attendCount={attendCount}
          attendTotal={30}
          absentIndices={absentIndices}
          savePulse={savePulse}
          attendBtnGlow={attendBtnGlow}
          saveBtnGlow={saveBtnGlow}
        />
      </div>
    </AbsoluteFill>
  );
};
