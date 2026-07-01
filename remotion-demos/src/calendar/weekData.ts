import type { EvCls } from "./lamTheme";

export type SpanEvent = {
  title: string;
  time: string;
  startDay: number;
  span: number;
  row: number;
  cls: EvCls;
};

export const WEEK_LABELS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
export const WEEK_DATES = ["12", "13", "14", "15", "16", "17", "18"];
export const TODAY_INDEX = 1;

export const WEEK_DAYS = WEEK_LABELS.map((dow, i) => ({
  dow,
  date: WEEK_DATES[i],
  today: i === TODAY_INDEX,
}));

/** Horizontal blocks — each spans 2 consecutive days (like reference mockup) */
export const SPAN_EVENTS: SpanEvent[] = [
  { title: "Toán 9A", time: "08:00 – 10:00", startDay: 0, span: 2, row: 0, cls: "ev-violet" },
  { title: "Lý 10A", time: "10:30 – 12:30", startDay: 2, span: 2, row: 1, cls: "ev-blue" },
  { title: "Anh 8B", time: "14:00 – 16:00", startDay: 0, span: 2, row: 2, cls: "ev-green" },
  { title: "Toán 11A", time: "18:00 – 20:00", startDay: 2, span: 2, row: 3, cls: "ev-green" },
];

export const TIME_ROWS = ["08:00", "10:00", "14:00", "16:00", "18:00"];

export const ATTENDANCE_STUDENTS = [
  { name: "Nguyễn Minh An", rate: "96%" },
  { name: "Trần Hoàng Bình", rate: "88%" },
  { name: "Lê Thu Chi", rate: "94%" },
  { name: "Phạm Quốc Dũng", rate: "91%" },
  { name: "Hoàng Thị Em", rate: "97%" },
];

export const LESSON_DESC =
  "Buổi học tập trung vào định nghĩa đạo hàm, công thức tính đạo hàm và ứng dụng trong bài toán thực tế.";
