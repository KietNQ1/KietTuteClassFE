import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AIPage } from "../ai/AIPage";

function glowPulse(frame: number, fps: number, atSec: number): number {
  return spring({
    frame: frame - Math.round(atSec * fps),
    fps,
    config: { damping: 14, stiffness: 220 },
  });
}

const A1_INTRO =
  "Có 3 học sinh trong lớp Toán 9A cần được hỗ trợ thêm:";

const A2_DETAIL = `Trần Hoàng Bình — Toán 9A

• Điểm TB môn Toán: 5.8/10 (giảm 0.6 so với tháng trước)
• Chuyên cần: 88% — vắng 3/25 buổi
• Bài tập chưa nộp: 2 bài (tuần 11–12)
• Điểm yếu: Đạo hàm ứng dụng, bài toán thực tế`;

export const SolutionAI: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 200 } });

  const q1Glow =
    frame >= Math.round(0.5 * fps) && frame < Math.round(1.1 * fps)
      ? glowPulse(frame, fps, 0.5)
      : 0;

  const showQ1 = frame >= Math.round(0.85 * fps);

  const showA1 = frame >= Math.round(1.4 * fps);
  const a1Len = Math.floor(
    interpolate(frame, [1.4 * fps, 2.6 * fps], [0, A1_INTRO.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const a1Text = A1_INTRO.slice(0, a1Len);

  const q2Glow =
    frame >= Math.round(5.2 * fps) && frame < Math.round(5.8 * fps)
      ? glowPulse(frame, fps, 5.2)
      : 0;

  const showQ2 = frame >= Math.round(5.5 * fps);

  const showA2 = frame >= Math.round(6.0 * fps);
  const a2Len = Math.floor(
    interpolate(frame, [6.0 * fps, 9.2 * fps], [0, A2_DETAIL.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const a2Text = A2_DETAIL.slice(0, a2Len);

  const scrollY =
    spring({
      frame: frame - Math.round(5.15 * fps),
      fps,
      config: { damping: 28, stiffness: 72 },
    }) * 480;

  const chatOpacity = interpolate(
    frame,
    [0, 0.4 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ background: "#fffaf1" }}>
      <div style={{ width: "100%", height: "100%", opacity: enter * chatOpacity }}>
        <AIPage
          showQ1={showQ1}
          showA1={showA1}
          a1Text={a1Text}
          showQ2={showQ2}
          showA2={showA2}
          a2Text={a2Text}
          q1Glow={q1Glow}
          q2Glow={q2Glow}
          scrollY={scrollY}
        />
      </div>
    </AbsoluteFill>
  );
};
