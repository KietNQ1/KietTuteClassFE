export type SessionSummary = {
  num: number;
  date: string;
  submitted: number;
  total: number;
  needGrade: number;
};

export const SESSION = {
  num: 10,
  title: "Ứng dụng đạo hàm",
  date: "13/06/2026",
  submitted: 21,
  total: 21,
  needGrade: 5,
  assignments: [
    {
      type: "quiz" as const,
      title: "Khảo sát và vẽ đồ thị hàm số",
      submitted: 21,
      total: 21,
      needGrade: 5,
    },
    {
      type: "quiz" as const,
      title: "",
      submitted: 21,
      total: 21,
      needGrade: 0,
      placeholder: true,
    },
  ],
};

export const EARLIER_SESSIONS: SessionSummary[] = [
  { num: 8, date: "11/06", submitted: 30, total: 30, needGrade: 0 },
  { num: 7, date: "09/06", submitted: 29, total: 30, needGrade: 0 },
  { num: 6, date: "07/06", submitted: 28, total: 30, needGrade: 0 },
  { num: 5, date: "05/06", submitted: 30, total: 30, needGrade: 0 },
];

export const COLLAPSED_SESSION: SessionSummary = {
  num: 9,
  date: "12/06",
  submitted: 30,
  total: 30,
  needGrade: 0,
};

export type StudentRow = {
  name: string;
  initials: string;
  color: string;
  status: "need" | "graded" | "late";
  score?: number;
};

export const STUDENTS: StudentRow[] = [
  { name: "Nguyễn Minh Anh", initials: "NA", color: "#6c8cff", status: "need" },
  { name: "Trần Bảo Lan", initials: "TL", color: "#e85d75", status: "graded", score: 8.5 },
  { name: "Phạm Khánh Linh", initials: "PL", color: "#2f8f6b", status: "graded", score: 7.0 },
];

export const GRADING_TITLE = "Khảo sát và vẽ đồ thị hàm số";
