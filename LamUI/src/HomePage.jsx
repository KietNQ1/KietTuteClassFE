import {
  useEffect,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  ArrowRight,
  Calendar,
  ChatBubble as MessageCircle,
  ClipboardCheck,
  CheckCircle as ShieldCheck,
  CreditCard,
  Headset as Headphones,
  Page as FileText,
  StatsReport as BarChart3,
  UserSquare as Users,
} from "iconoir-react";

const BookOpen = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 6.5C10.45 5.45 8.45 4.8 6.25 4.8H4.7c-.9 0-1.7.75-1.7 1.7v11.65c0 .55.45.95 1 .9l1.35-.1c2.45-.2 4.8.3 6.65 1.65V6.5Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M12 6.5c1.55-1.05 3.55-1.7 5.75-1.7h1.55c.9 0 1.7.75 1.7 1.7v11.65c0 .55-.45.95-1 .9l-1.35-.1c-2.45-.2-4.8.3-6.65 1.65V6.5Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M7 8.7c1.15.1 2.2.4 3.05.9M17 8.7c-1.15.1-2.2.4-3.05.9M7 12.1c1.15.1 2.2.4 3.05.9M17 12.1c-1.15.1-2.2.4-3.05.9"
      stroke="currentColor"
      strokeWidth="1.45"
      strokeLinecap="round"
    />
  </svg>
);

import img1 from "./assets/sticker/img1.png";
import img2 from "./assets/sticker/img2.png";
import img3 from "./assets/sticker/img3.png";
import img4 from "./assets/sticker/img4.png";
import img5 from "./assets/sticker/img5.png";
import img6 from "./assets/sticker/img6.png";
import img7 from "./assets/sticker/img7.png";
import img8 from "./assets/sticker/img8.png";
import img9 from "./assets/sticker/img9.png";
import img10 from "./assets/sticker/img10.png";
import img11 from "./assets/sticker/img11.png";
import img12 from "./assets/sticker/img12.png";
import img13 from "./assets/sticker/img13.png";
import pre1 from "./assets/preview/pre1.png";
import pre2 from "./assets/preview/pre2.png";
import pre3 from "./assets/preview/pre3.png";
import pre4 from "./assets/preview/pre4.png";
import featureAssignment from "./assets/card-feature/feature-assignment.svg";
import featureClass from "./assets/card-feature/feature-class.svg";
import featureGrading from "./assets/card-feature/feature-grading.svg";
import featureProgress from "./assets/card-feature/feature-progress.svg";
import featureChat from "./assets/card-feature/feature-chat.svg";
import openBookSparkle from "./assets/orbit-core.png";
import logoRmbg from "./assets/logo-rmbg.png";

const ASSETS = {
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
};

const MiniAppShell = ({ title, subtitle, activeIcon = 1, children }) => (
  <div className="h-[520px] overflow-hidden rounded-[32px] border border-[#ead6b8] bg-white shadow-[0_24px_70px_rgba(15,47,102,.08)]">
    <div className="flex h-[68px] items-center justify-between border-b border-[#ecd9bd] bg-[#fff8ea] px-5">
      <div><div className="text-sm font-black text-[#0b2f66]">{title}</div><div className="text-xs font-bold text-[#7d8aa0]">{subtitle}</div></div>
      <div className="flex gap-2"><span className="h-3 w-3 rounded-full bg-[#ff5c00]" /><span className="h-3 w-3 rounded-full bg-[#f7c56b]" /><span className="h-3 w-3 rounded-full bg-[#21b37b]" /></div>
    </div>
    <div className="grid h-[452px] grid-cols-[64px_1fr] bg-[#fffaf1]">
      <aside className="border-r border-[#ecd9bd] bg-[#fff4e3] p-3">
        {[BookOpen, Calendar, ClipboardCheck, BarChart3, MessageCircle].map((Icon, i) => <div key={i} className={`mb-3 grid h-10 w-10 place-items-center rounded-2xl ${i === activeIcon ? "bg-[#0b2f66] text-white" : "bg-white text-[#0b2f66]"}`}><Icon className="h-5 w-5" /></div>)}
      </aside>
      <div className="h-full p-5">{children}</div>
    </div>
  </div>
);

const SlideGrid = ({ children }) => (
  <div className="grid h-full grid-cols-[210px_1fr_260px] gap-5">{children}</div>
);

const SlideCard = ({ children, className = "" }) => (
  <div className={`h-full overflow-hidden rounded-3xl bg-white p-5 shadow-sm ${className}`}>{children}</div>
);

// Legacy JSX previews retained for reference while the carousel uses image previews.
// eslint-disable-next-line no-unused-vars
const ScheduleSlide = () => (
  <MiniAppShell title="Lịch học" subtitle="Tuần 17 · Tháng 6"><SlideGrid>
    <SlideCard><b>Hôm nay</b><div className="mt-5 space-y-3">{["07:00 Toán 9A", "08:30 Toán 12A", "14:00 Lý 11B", "18:00 Hóa 10C"].map((x, i) => <div key={x} className={`rounded-2xl px-4 py-3 text-sm font-black ${i === 0 ? "bg-[#fff0e2] text-[#ff5c00]" : "bg-[#fffaf1]"}`}>{x}</div>)}</div><button className="mt-5 w-full rounded-2xl bg-[#0b2f66] py-3 text-sm font-black text-white">Vào lớp học</button></SlideCard>
    <SlideCard className="bg-[#fffaf1]">
      <b>Lịch học tuần này</b>
      <div className="mt-5 grid grid-cols-5 gap-3 text-center text-xs font-black text-[#61708a]">
        {["T2", "T3", "T4", "T5", "T6"].map((d) => <div key={d} className="rounded-2xl bg-white py-3">{d}</div>)}
      </div>
      <div className="mt-4 grid grid-cols-5 gap-3">
        {["", "Toán 12A", "", "Lý 11B", "Hóa 10C"].map((x, i) => (
          <div key={i} className="min-h-[190px] rounded-3xl bg-white p-3">
            {x && <div className="rounded-2xl bg-[#fff0e2] p-3 text-left"><div className="text-xs font-black text-[#ff5c00]">08:00</div><div className="mt-1 text-sm font-black">{x}</div><div className="mt-1 text-xs font-bold text-[#7d8aa0]">32 học sinh</div></div>}
          </div>
        ))}
      </div>
    </SlideCard>
    <SlideCard><b>Buổi sắp tới</b><div className="mt-5 rounded-3xl bg-[#fff0e2] p-4"><div className="text-xs font-black text-[#ff5c00]">07:00 - 08:30</div><div className="mt-2 text-xl font-black">Toán 9A</div><div className="mt-2 text-xs font-bold text-[#7d8aa0]">Phòng A2 · Ôn chương hàm số</div></div></SlideCard>
  </SlideGrid></MiniAppShell>
);

// eslint-disable-next-line no-unused-vars
const GradingSlide = () => (
  <MiniAppShell title="Chấm bài" subtitle="Bài tự luận · Nguyên hàm" activeIcon={2}><SlideGrid>
    <div className="rounded-3xl bg-white p-4 shadow-sm"><b>Học sinh</b><div className="mt-4 space-y-3">{["Minh Anh", "Gia Bảo", "Hoàng Nam", "Khánh Linh"].map((name, i) => <div key={name} className={`rounded-2xl px-4 py-3 ${i === 1 ? "bg-[#fff0e2]" : "bg-[#fffaf1]"}`}><div className="text-sm font-black">{name}</div><div className="text-xs font-bold text-[#7d8aa0]">{i === 1 ? "Đang chấm" : "Chờ nhận xét"}</div></div>)}</div></div>
    <div className="rounded-3xl bg-[#fffaf1] p-6"><b>Chấm bài tự luận</b><div className="mt-5 space-y-4"><div className="max-w-[78%] rounded-[22px] bg-white p-4 shadow-sm"><div className="text-sm font-black">Câu 3: Trình bày lời giải tích phân</div><p className="mt-2 text-xs font-bold leading-5 text-[#7d8aa0]">Học sinh làm đúng hướng nhưng thiếu bước biến đổi trung gian.</p></div><div className="ml-auto max-w-[78%] rounded-[22px] bg-[#fff0e2] p-4 shadow-sm"><div className="text-xs font-black uppercase text-[#ff5c00]">Nhận xét giáo viên</div><p className="mt-2 text-sm font-bold leading-6">Cần bổ sung điều kiện và trình bày rõ bước đổi biến.</p></div><div className="ml-auto inline-flex rounded-full bg-[#21b37b] px-4 py-2 text-xs font-black text-white">Đã chấm · 8/10</div></div></div>
    <div className="rounded-3xl bg-white p-6 shadow-sm"><b>Trao đổi nhận xét</b><div className="mt-5 space-y-4"><div className="mr-6 rounded-[22px] bg-[#fffaf1] p-4 text-sm font-bold">Câu này em thiếu bước biến đổi trung gian.</div><div className="ml-6 rounded-[22px] bg-[#fff0e2] p-4 text-sm font-bold">Cần bổ sung điều kiện và ghi rõ hằng số C.</div><div className="ml-auto inline-flex rounded-full bg-[#21b37b] px-4 py-2 text-xs font-black text-white">Đã gửi nhận xét</div></div></div>
  </SlideGrid></MiniAppShell>
);

// eslint-disable-next-line no-unused-vars
const AssignmentSlide = () => (
  <MiniAppShell title="Tạo bài tập" subtitle="AI scan đề · Toán 12" activeIcon={2}><SlideGrid>
    <div className="rounded-3xl bg-[#fffaf1] p-5"><b>Tạo bài tập</b><div className="mt-5 space-y-3">{["AI scan đề", "Chọn chương", "Trắc nghiệm", "Tự luận"].map((x) => <div key={x} className="rounded-2xl bg-white px-4 py-3 text-sm font-black shadow-sm">{x}</div>)}</div></div>
    <div className="rounded-3xl bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><b>Đề Toán 12 · Nguyên hàm</b><span className="rounded-full bg-[#fff0e2] px-3 py-1 text-xs font-black text-[#ff5c00]">12 câu</span></div><div className="mt-5 grid grid-cols-6 gap-2">{Array.from({ length: 12 }).map((_, i) => <div key={i} className={`grid h-10 place-items-center rounded-xl text-xs font-black ${i % 3 === 0 ? "bg-[#e8f7ef] text-[#20a66a]" : "bg-[#fff0e2] text-[#ff5c00]"}`}>{i + 1}</div>)}</div><div className="mt-5 rounded-2xl bg-[#fffaf1] p-4"><div className="text-sm font-black">Câu 1 · Trắc nghiệm</div><div className="mt-2 text-xs font-bold text-[#7d8aa0]">Tìm nguyên hàm của hàm số f(x) = 2x + 1.</div><div className="mt-4 grid grid-cols-2 gap-2">{["A. x² + x + C", "B. 2x² + C", "C. x + C", "D. x² - x + C"].map((x, i) => <div key={x} className={`rounded-xl bg-white p-2 text-xs font-bold ${i === 0 ? "text-[#20a66a]" : ""}`}>{x}</div>)}</div></div></div>
    <div className="rounded-3xl bg-white p-5 shadow-sm"><b>Cài đặt</b><div className="mt-5 space-y-4">{[["Thời gian", "45 phút"], ["Điểm", "10 điểm"], ["Trạng thái", "Sẵn sàng"]].map(([k, v]) => <div key={k} className="rounded-2xl bg-[#fffaf1] p-4"><div className="text-xs font-black text-[#7d8aa0]">{k}</div><div className="mt-1 text-sm font-black">{v}</div></div>)}</div></div>
  </SlideGrid></MiniAppShell>
);

const pageSections = [
  { id: "hero", label: "Trang đầu" },
  { id: "features", label: "TuteClass giúp bạn" },
  { id: "preview", label: "Trải nghiệm nhanh" },
  { id: "cta", label: "Đăng ký" },
];

export default function TuteClassHomePage() {
  const [activeSection, setActiveSection] = useState("hero");
  const navItems = [
    [Calendar, "Tổng quan"],
    [Calendar, "Lịch học"],
    [ClipboardCheck, "Bài tập"],
    [FileText, "Tài liệu"],
    [MessageCircle, "Trao đổi"],
  ];

  const features = [
    { title: "Tạo & giao bài tập", desc: "Soạn nhanh – Giao dễ dàng", stat: "12", unit: "câu", note: "đã tạo hôm nay", image: featureAssignment, color: "#ff5c00", span: "md:col-span-2" },
    { title: "Quản lý lớp học", desc: "Tổ chức và theo dõi lớp học", stat: "32", unit: "học sinh", note: "2 lớp đang hoạt động", image: featureClass, color: "#2f7cff", span: "md:col-span-2" },
    { title: "Chấm bài & nhận xét", desc: "Chấm nhanh – Nhận xét chi tiết", stat: "8.7", unit: "/10", note: "điểm trung bình", image: featureGrading, color: "#20a66a", span: "md:col-span-2" },
    { title: "Theo dõi tiến độ", desc: "Nắm bắt sự tiến bộ của học sinh", stat: "78", unit: "%", note: "học sinh tiến bộ", image: featureProgress, color: "#8b5cf6", span: "md:col-span-2 md:col-start-2" },
    { title: "Trao đổi dễ dàng", desc: "Kết nối mọi lúc, mọi nơi", stat: "247", unit: "", note: "tin nhắn hôm nay", image: featureChat, color: "#ff5c00", span: "md:col-span-2" },
  ];

  const previewSlides = [
    {
      label: "Tổng quan bài tập",
      title: "Mọi bài tập trong một góc nhìn",
      desc: "Theo dõi bài cần chấm, học sinh chưa nộp, hạn sắp tới và tiến độ từng buổi học.",
      time: "01",
      image: pre1,
    },
    {
      label: "Chấm bài",
      title: "Chấm điểm rõ ràng đến từng câu",
      desc: "Xem bài làm, chấm tự luận, ghi nhận xét và theo dõi tiến độ chấm ngay trên một màn hình.",
      time: "02",
      image: pre2,
    },
    {
      label: "Trao đổi",
      title: "Trao đổi riêng, hỗ trợ đúng lúc",
      desc: "Nhắn tin, gửi tài liệu và lưu ghi chú học sinh để mỗi phản hồi đều sát với tình hình học tập.",
      time: "03",
      image: pre3,
    },
    {
      label: "Phân tích bài tập",
      title: "Hiểu kết quả phía sau từng câu hỏi",
      desc: "Xem tỷ lệ chọn đáp án, phân bố điểm và mức độ hoàn thành để điều chỉnh bài giảng chính xác hơn.",
      time: "04",
      image: pre4,
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.2, rootMargin: "-15% 0px -45% 0px" }
    );

    pageSections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % previewSlides.length);
    }, 4200);

    return () => clearInterval(timer);
  }, [previewSlides.length]);

  const orbitRadiusX = 295;
  const orbitRadiusY = 205;
  const orbitIcons = [
    [Calendar, -90, "#ff5c00", "Lịch học", "Quản lý lịch học"],
    [BarChart3, -30, "#8b5cf6", "Tiến độ", "Theo dõi kết quả"],
    [Users, 30, "#2f7cff", "Lớp học", "Quản lý học sinh"],
    [MessageCircle, 90, "#20a66a", "Trao đổi", "Kết nối tức thì"],
    [ClipboardCheck, 150, "#f59e0b", "Bài tập", "Tạo và giao bài"],
    [ShieldCheck, 210, "#ec4899", "Chấm bài", "Nhận xét rõ ràng"],
  ].map(([Icon, angle, color, label, caption]) => {
    const radians = (angle * Math.PI) / 180;
    return {
      Icon,
      color,
      label,
      caption,
      x: Math.cos(radians) * orbitRadiusX,
      y: Math.sin(radians) * orbitRadiusY,
    };
  });

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fffaf1] text-[#082d66]">
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes floatSoft {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes fadeDecor {
          0%,100% { opacity: .16; transform: translateY(0); }
          50% { opacity: .28; transform: translateY(-8px); }
        }

        @keyframes dashMove {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -120; }
        }

        @keyframes orbitSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes orbitSpinReverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        @keyframes dashFlow { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -220; } }
        @keyframes glowPulse {
          0%,100% { opacity: .35; filter: drop-shadow(0 0 0 rgba(255,92,0,0)); }
          50% { opacity: .9; filter: drop-shadow(0 0 16px rgba(255,92,0,.55)); }
        }
        @keyframes coreSparkle {
          0%,100% { opacity: .18; transform: scale(.55) rotate(0deg); filter: drop-shadow(0 0 0 rgba(255,194,102,0)); }
          45% { opacity: 1; transform: scale(1.2) rotate(16deg); filter: drop-shadow(0 0 14px rgba(255,194,102,.85)); }
          72% { opacity: .55; transform: scale(.86) rotate(-10deg); filter: drop-shadow(0 0 8px rgba(255,255,255,.75)); }
        }
        @keyframes coreSparkleHover {
          0%,100% { opacity: .55; transform: scale(.85) rotate(0deg); filter: drop-shadow(0 0 10px rgba(255,194,102,.7)); }
          45% { opacity: 1; transform: scale(1.45) rotate(18deg); filter: drop-shadow(0 0 22px rgba(255,194,102,1)); }
          72% { opacity: .8; transform: scale(1.05) rotate(-10deg); filter: drop-shadow(0 0 16px rgba(255,255,255,.9)); }
        }
        @keyframes coreGlowSweep {
          0%,100% { opacity: .2; transform: translate(-50%, -50%) scale(.85); }
          50% { opacity: .65; transform: translate(-50%, -50%) scale(1.06); }
        }
        @keyframes bookSpineGlow {
          0%,100% { opacity: .32; transform: translate(-50%, -50%) scale(.82); filter: blur(13px); }
          50% { opacity: .88; transform: translate(-50%, -50%) scale(1.08); filter: blur(18px); }
        }
        @keyframes nodePulse {
          0%,100% { transform: scale(1); box-shadow: 0 18px 44px rgba(15,47,102,.08); }
          50% { transform: scale(1.08); box-shadow: 0 24px 70px rgba(255,92,0,.22); }
        }
        .orbit-layer-slow { transform-origin: center; animation: orbitSpin 42s linear infinite; }
        .orbit-layer-fast { transform-origin: center; animation: orbitSpinReverse 24s linear infinite; }
        .orbit-dash { stroke-dasharray: 10 14; animation: dashFlow 7s linear infinite; }
        .orbit-glow-dot { animation: glowPulse 2.4s ease-in-out infinite; }
        .orbit-node { animation: nodePulse 4.8s ease-in-out infinite; }
        .planet-ring { animation: orbitSpin 8s linear infinite; }
        .planet-status { animation: glowPulse 2.2s ease-in-out infinite; }
        .orbit-core-glow { animation: coreGlowSweep 3.4s ease-in-out infinite; }
        .orbit-core-sparkle { animation: coreSparkle 2.4s ease-in-out infinite; }
        .group\\/core:hover .orbit-core-sparkle { animation-name: coreSparkleHover; }
        .book-spine-glow { animation: bookSpineGlow 2.6s ease-in-out infinite; }


        @keyframes bounceRise {
          0% {
            opacity: .15;
            transform: translateY(82px) scale(.98);
          }
          68% {
            opacity: 1;
            transform: translateY(-10px) scale(1.01);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .float-soft {
          animation: floatSoft 5s ease-in-out infinite;
        }

        .rotate-slow {
          animation: rotateSlow 58s linear infinite;
        }

        .fade-decor {
          animation: fadeDecor 7s ease-in-out infinite;
        }

        .dash-path {
          stroke-dasharray: 8 10;
          animation: dashMove 8s linear infinite;
        }

        .glass {
          background: rgba(255,255,255,.72);
          border: 1px solid rgba(236,213,180,.75);
          box-shadow: 0 22px 70px rgba(15,47,102,.07);
          backdrop-filter: blur(16px);
        }

        .scroll-bounce {
          opacity: 1;
          transform: translateY(0);
        }

        @supports (animation-timeline: view()) {
          .scroll-bounce {
            opacity: .15;
            transform: translateY(82px) scale(.98);
            animation: bounceRise .9s cubic-bezier(.2,.9,.2,1.15) both;
            animation-timeline: view();
            animation-range: entry 5% cover 32%;
          }

          .scroll-bounce-stagger {
            animation-range: entry 8% cover 28%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .float-soft,
          .rotate-slow,
          .fade-decor,
          .dash-path,
          .scroll-bounce,
          .scroll-bounce-stagger {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      <nav className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 rounded-full bg-transparent px-2 py-4 lg:block">
        <div className="flex flex-col gap-3">
          {pageSections.map((section, index) => {
            const active = activeSection === section.id;
            return (
              <button key={section.id} type="button" onClick={() => { setActiveSection(section.id); document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }} className={`group/item flex origin-right cursor-pointer items-center justify-end gap-3 transition-transform duration-200 ease-out ${active ? "hover:scale-110" : "hover:scale-[1.03]"}`}>
                <span className={`pointer-events-none translate-x-2 whitespace-nowrap rounded-full bg-transparent px-3 py-1.5 text-xs font-black text-[#0b2f66] opacity-0 transition-all duration-500 ease-out group-hover/item:translate-x-0 group-hover/item:bg-white/60 group-hover/item:opacity-100 group-hover/item:shadow-[0_10px_32px_rgba(15,47,102,.14)] group-hover/item:backdrop-blur-md ${active ? "text-[#ff5c00]" : ""}`}>
                  {String(index + 1).padStart(2, "0")} · {section.label}
                </span>
                <span className={`block rounded-full transition-all duration-300 ease-out ${active ? "h-10 w-1.5 bg-[#ff5c00] shadow-[0_0_18px_rgba(255,92,0,.45)]" : "h-6 w-1 bg-[#d8c8b2]/70 group-hover/item:bg-[#0b2f66]/35"}`} />
              </button>
            );
          })}
        </div>
      </nav>

      {/* HERO */}
      <section id="hero"
                className="relative mx-auto min-h-screen max-w-[1500px] scroll-mt-4 px-4 pt-5 sm:px-6 lg:min-h-[760px] lg:px-10 lg:pt-8">
        {/* Background decor */}
        <img
          src={ASSETS.img3}
          className="fade-decor pointer-events-none absolute right-12 top-28 w-44 opacity-20"
        />
        <img
          src={ASSETS.img9}
          className="fade-decor pointer-events-none absolute bottom-16 right-16 w-40 opacity-12"
        />

        {/* Header */}
        <header className="relative z-20 flex items-center justify-between gap-4">
          <div className="flex translate-x-4 items-center gap-3">
            <img src={logoRmbg} alt="TuteClass" className="h-8 w-auto object-contain sm:h-10" />
          </div>

          <nav className="hidden items-center justify-center gap-8 text-sm font-bold lg:flex">
            {navItems.map(([Icon, label]) => (
              <button
                key={label}
                className="flex cursor-pointer items-center gap-2 transition hover:text-[#ff5c00]"
              >
                <Icon className="h-5 w-5" />
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <button className="hidden cursor-pointer rounded-xl border border-[#0b2f66]/15 bg-[#0b2f66] px-6 py-3 text-sm font-black text-white shadow-[0_12px_28px_rgba(11,47,102,.2)] transition hover:-translate-y-0.5 hover:bg-[#ff5c00] hover:shadow-[0_16px_32px_rgba(255,92,0,.24)] md:block">
              Đăng nhập
            </button>
          </div>
        </header>

        {/* Hero content */}
        <div className="relative z-10 grid min-h-[auto] grid-cols-1 items-center gap-10 py-10 lg:min-h-[650px] lg:grid-cols-[0.9fr_1.1fr] lg:py-0">
          <section className="relative">
            <div>
              <div className="mb-5 flex items-center gap-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#ffe1b8] bg-[#fff7ea]/75 px-4 py-2 text-xs font-bold text-[#a94d00]">
                  ✦ Dành riêng cho giáo viên dạy thêm
                </div>

                <img
                  src={ASSETS.img1}
                  alt=""
                  className="hidden w-20 shrink-0 object-contain opacity-80 sm:block"
                />
              </div>

              <h1 className="relative max-w-[620px] text-[42px] font-black leading-[1.08] tracking-[-0.04em] sm:text-5xl md:text-6xl">
                <span className="text-[#082d66]">Dạy dễ dàng.</span>
                <br />
                <span className="bg-[linear-gradient(90deg,#ff5c00_0%,#f6a23a_100%)] bg-clip-text text-transparent">Quản lý thông minh.</span>
              </h1>
            </div>

            <p className="mt-6 max-w-[540px] text-base font-semibold leading-7 text-[#385178] md:text-lg">
              Tất cả công cụ bạn cần để quản lý lớp học, giao dạy hiệu quả và nâng cao kết quả học tập.
            </p>

            <div className="mt-9 flex items-center gap-4">
              <button className="flex cursor-pointer items-center gap-3 rounded-2xl bg-[#ff5c00] px-7 py-4 text-base font-black text-white shadow-[0_18px_36px_rgba(255,92,0,.25)] transition hover:-translate-y-0.5 hover:bg-[#0b2f66] hover:shadow-[0_20px_40px_rgba(11,47,102,.24)]">
                Bắt đầu miễn phí
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-9 flex flex-wrap gap-8 text-sm font-bold text-[#385178]">
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#0b2f66]" />
                Miễn phí 14 ngày
              </span>

              <span className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-[#0b2f66]" />
                Không cần thẻ tín dụng
              </span>

              <span className="flex items-center gap-2">
                <Headphones className="h-4 w-4 text-[#0b2f66]" />
                Hỗ trợ mọi lúc
              </span>
            </div>

            <img
              src={ASSETS.img2}
              alt=""
              className="mt-6 w-44 object-contain opacity-80"
            />
          </section>

          {/* Orbit hero */}
          <section className="relative flex min-h-[360px] scale-[0.72] items-center justify-center sm:min-h-[460px] sm:scale-90 lg:min-h-[560px] lg:scale-100">
            <div className="pointer-events-none absolute h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,177,95,.28)_0%,rgba(255,250,241,.12)_48%,rgba(255,250,241,0)_72%)] blur-sm" />
            <div className="pointer-events-none absolute h-[390px] w-[390px] rounded-full border border-[#ffb15f]/20 bg-white/20" />
            <svg
              className="pointer-events-none absolute h-[600px] w-[680px] max-w-full overflow-visible"
              viewBox="0 0 680 600"
              fill="none"
            >
              <g className="orbit-layer-slow">
                <circle cx="340" cy="300" r="245" stroke="#ff8a3d" strokeWidth="1.4" opacity="0.52" />
                <circle className="orbit-dash" cx="340" cy="300" r="245" stroke="#ff5c00" strokeWidth="1.3" opacity="0.46" />
                <ellipse cx="340" cy="300" rx="245" ry="150" stroke="#0b2f66" strokeWidth="1.1" opacity="0.24" />
                <circle className="orbit-glow-dot" cx="585" cy="300" r="7" fill="#ff5c00" />
                <circle className="orbit-glow-dot" cx="340" cy="55" r="5" fill="#0b2f66" />
                <circle className="orbit-glow-dot" cx="128" cy="423" r="4" fill="#ffb15f" />
              </g>
              <g className="orbit-layer-fast">
                <ellipse className="orbit-dash" cx="340" cy="300" rx="150" ry="245" stroke="#0b2f66" strokeWidth="1.1" opacity="0.3" />
                <circle className="orbit-glow-dot" cx="340" cy="545" r="5" fill="#ff5c00" />
                <circle className="orbit-glow-dot" cx="552" cy="178" r="6" fill="#0b2f66" />
              </g>
            </svg>

            <motion.div className="relative z-10 grid h-[230px] w-[230px] place-items-center">
              <div className="group/core relative grid h-[310px] w-[310px] -translate-x-[28px] -translate-y-[29px] cursor-pointer place-items-center">
                <span className="orbit-core-glow pointer-events-none absolute left-1/2 top-1/2 h-[230px] w-[230px] rounded-full bg-[#ffd27a]/25 blur-2xl transition-all duration-500 group-hover/core:h-[260px] group-hover/core:w-[260px] group-hover/core:bg-[#ffd27a]/40" />
                {[
                  ["left-[48px] top-[46px] h-10 w-10", "0s"],
                  ["right-[40px] top-[70px] h-8 w-8", ".35s"],
                  ["right-[28px] top-[142px] h-7 w-7", ".75s"],
                  ["bottom-[64px] right-[82px] h-4 w-4", "1.1s"],
                  ["bottom-[82px] left-[54px] h-3.5 w-3.5", "1.45s"],
                  ["left-[82px] top-[24px] h-5 w-5", "1.8s"],
                ].map(([className, delay], index) => (
                  <span
                    key={index}
                    className={`orbit-core-sparkle pointer-events-none absolute ${className}`}
                    style={{ animationDelay: delay }}
                  >
                    <svg viewBox="0 0 24 24" className="h-full w-full fill-[#ffd27a]">
                      <path d="M12 1.8L14.8 9.2L22.2 12L14.8 14.8L12 22.2L9.2 14.8L1.8 12L9.2 9.2L12 1.8Z" />
                    </svg>
                  </span>
                ))}
                <span className="book-spine-glow pointer-events-none absolute left-[50%] top-[50%] h-[260px] w-[260px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,.6)_0%,rgba(255,226,155,.46)_32%,rgba(255,151,44,.24)_58%,rgba(255,151,44,0)_76%)] mix-blend-screen transition-all duration-500 group-hover/core:h-[292px] group-hover/core:w-[292px] group-hover/core:bg-[radial-gradient(circle,rgba(255,255,255,.78)_0%,rgba(255,226,155,.62)_34%,rgba(255,151,44,.36)_62%,rgba(255,151,44,0)_80%)]" />
                <img src={openBookSparkle} alt="" className="relative h-[310px] w-[310px] object-contain drop-shadow-[0_18px_38px_rgba(255,151,44,.18)]" />
              </div>
            </motion.div>

            {orbitIcons.map(({ Icon, x, y, color, label, caption }, i) => (
              <div
                key={label}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                }}
              >
                <motion.div whileHover={{ scale: 1.06, y: -4 }}>
                <motion.div
                  className="group orbit-node relative flex h-[104px] w-[104px] cursor-pointer flex-col items-center justify-center rounded-[30px] border border-white/80 bg-white/80 shadow-[0_22px_70px_rgba(15,47,102,.13)] backdrop-blur-xl"
                  style={{ animationDelay: `${i * 0.4}s` }}
                >
                  <div className="absolute inset-[-10px] rounded-[36px] opacity-40 blur-2xl transition group-hover:opacity-70" style={{ backgroundColor: color }} />
                  <div className="planet-ring absolute inset-[-5px] rounded-[34px] opacity-70" style={{ background: `conic-gradient(from 0deg, transparent, ${color}, transparent 35%, transparent 100%)`, padding: "1px" }}>
                    <div className="h-full w-full rounded-[33px] bg-white/70" />
                  </div>
                  <span className="planet-status absolute right-3 top-3 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 18px ${color}` }} />
                  <div className="relative grid h-12 w-12 place-items-center rounded-2xl text-white shadow-lg transition group-hover:rotate-[-6deg]" style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)`, boxShadow: `0 14px 34px ${color}45` }}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="relative mt-2 text-[11px] font-black text-[#0b2f66]">{label}</div>
                  <div className="pointer-events-none absolute top-[108px] whitespace-nowrap rounded-full border border-[#ead6b8] bg-white/90 px-3 py-1.5 text-[11px] font-black text-[#385178] opacity-0 shadow-lg transition-all group-hover:translate-y-1 group-hover:opacity-100">{caption}</div>
                </motion.div>
                </motion.div>
              </div>
            ))}

            <motion.div className="pointer-events-none absolute inset-0 m-auto h-[490px] w-[490px] rounded-full" animate={{ rotate: 360 }} transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}>
              <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-[#ff5c00] shadow-[0_0_24px_rgba(255,92,0,.8)]" />
            </motion.div>
          </section>
        </div>
      </section>

      {/* FEATURE SECTION */}
      <section className="scroll-bounce relative scroll-mt-4 overflow-hidden border-t border-[#f1ddc0] bg-white/45 px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
        <img src={ASSETS.img10} alt="" className="fade-decor pointer-events-none absolute left-3 top-52 w-40 rotate-[-8deg] opacity-20" />
        <img src={ASSETS.img11} alt="" className="fade-decor pointer-events-none absolute right-3 top-52 w-36 rotate-[8deg] opacity-20" style={{ animationDelay: "1s" }} />
        <img src={ASSETS.img12} alt="" className="fade-decor pointer-events-none absolute bottom-8 left-[5%] w-44 rotate-[6deg] opacity-15" style={{ animationDelay: "2s" }} />
        <img src={ASSETS.img13} alt="" className="fade-decor pointer-events-none absolute bottom-8 right-[5%] w-40 rotate-[-6deg] opacity-[.18]" style={{ animationDelay: "1.5s" }} />
        <img
          src={ASSETS.img7}
          className="fade-decor pointer-events-none absolute left-[calc(50%-500px)] top-28 w-60 opacity-15"
        />
        <div id="features"
         className="relative z-10 mx-auto max-w-[1240px] text-center">
          <div className="mx-auto mb-5 inline-flex rounded-full border border-[#ffd9b8] bg-[#fff5e9] px-4 py-2 text-xs font-black uppercase text-[#ff5c00]">
            TuteClass giúp bạn
          </div>

          <h2 className="mx-auto max-w-[680px] text-4xl font-black leading-tight tracking-[-0.035em]">
            Tập trung vào giảng dạy
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-6 lg:mt-14">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className={`group relative min-h-[170px] overflow-hidden rounded-[20px] border bg-white/70 p-4 text-left shadow-[0_14px_38px_rgba(15,47,102,.07)] backdrop-blur-xl transition ${feature.span}`}
                style={{ borderColor: `${feature.color}35`, animationDelay: `${index * 80}ms` }}
                whileHover={{ y: -8, scale: 1.015 }}
              >
                <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-10 blur-3xl transition group-hover:opacity-25" style={{ backgroundColor: feature.color }} />
                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div><div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: feature.color }} /><h3 className="text-lg font-black text-[#0b2f66]">{feature.title}</h3></div><p className="mt-2 text-sm font-semibold text-[#60708a]">{feature.desc}</p></div>
                </div>
                <div className="relative z-10 mt-2 grid grid-cols-[0.82fr_1.18fr] items-end gap-2">
                  <div>
                    <div className="flex items-end gap-2"><motion.span className="text-6xl font-black leading-none" style={{ color: feature.color }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08, duration: 0.5 }} viewport={{ once: true }}>{feature.stat}</motion.span><span className="pb-2 text-xl font-black text-[#385178]">{feature.unit}</span></div>
                    <p className="mt-3 text-sm font-semibold text-[#60708a]">{feature.note}</p>
                    <div className="mt-6 h-1.5 w-28 overflow-hidden rounded-full bg-[#eadcc8]"><motion.div className="h-full rounded-full" style={{ backgroundColor: feature.color }} initial={{ width: "24%" }} whileInView={{ width: index === 3 ? "78%" : "62%" }} transition={{ delay: 0.25 + index * 0.08, duration: 0.7 }} viewport={{ once: true }} /></div>
                  </div>
                  <motion.img src={feature.image} alt={feature.title} className="h-[145px] w-full object-contain object-right-bottom transition duration-500 group-hover:scale-110" initial={{ opacity: 0, y: 16, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.12 + index * 0.08, duration: 0.5 }} viewport={{ once: true }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PREVIEW SECTION */}
      <section className="scroll-bounce relative scroll-mt-4 overflow-hidden px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
        <img
          src={ASSETS.img5}
          alt=""
          className="fade-decor pointer-events-none absolute left-4 top-24 z-20 w-32 rotate-[-8deg] opacity-70"
        />
        <img
          src={ASSETS.img6}
          alt=""
          className="fade-decor pointer-events-none absolute bottom-20 right-5 z-20 w-36 rotate-[7deg] opacity-70"
          style={{ animationDelay: "1.2s" }}
        />
        <div id="preview" 
                className="relative z-10 mx-auto max-w-[1320px]">
        <div className="glass relative overflow-hidden rounded-[28px] p-4 sm:p-6 lg:rounded-[38px] lg:p-10">
          {/* Paper plane animation */}
          <img
            src={ASSETS.img7}
            className="pointer-events-none absolute bottom-28 left-32 w-64 opacity-90"
          />

          <div className="grid items-center gap-8 lg:grid-cols-[0.58fr_1.42fr]">
            <div>
              <div className="mb-5 inline-flex rounded-full bg-[#fff0e2] px-4 py-2 text-xs font-black uppercase text-[#ff5c00]">
                Trải nghiệm nhanh
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.45 }}
                >
                  <h3 className="text-4xl font-black tracking-[-0.035em]">
                    {previewSlides[activeSlide].title}
                  </h3>

                  <p className="mt-5 max-w-[430px] text-lg font-medium leading-8 text-[#385178]">
                    {previewSlides[activeSlide].desc}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="relative mt-16">
                <div className="text-3xl font-black">
                  {previewSlides[activeSlide].time}{" "}
                  <span className="text-lg text-[#9aa6b8]">/ {String(previewSlides.length).padStart(2, "0")}</span>
                </div>

                <div className="mt-4 flex gap-2">
                  {previewSlides.map((slide, index) => (
                    <button
                      key={slide.label}
                      onClick={() => setActiveSlide(index)}
                      className={`h-2 cursor-pointer rounded-full transition-all ${
                        activeSlide === index
                          ? "w-8 bg-[#0b2f66]"
                          : "w-2 bg-[#d8c8b2]"
                      }`}
                      type="button"
                    />
                  ))}
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{ duration: 0.45 }}
                  className="h-[260px] overflow-hidden rounded-[24px] border border-[#ead6b8] bg-white p-2 shadow-[0_24px_80px_rgba(15,47,102,.08)] sm:h-[380px] lg:h-[560px] lg:rounded-[36px]"
                >
                  <img
                    src={previewSlides[activeSlide].image}
                    alt={previewSlides[activeSlide].label}
                    className="h-full w-full rounded-[28px] object-contain"
                  />
                </motion.div>
              </AnimatePresence>
          </div>

        </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="scroll-bounce relative mx-auto max-w-[1280px] scroll-mt-4 px-4 pb-16 pt-8 text-center sm:px-6 lg:px-10 lg:pb-24">
        <img
          src={ASSETS.img4}
          className="pointer-events-none absolute bottom-6 left-0 w-56 opacity-80"
        />

        <img
          src={ASSETS.img9}
          className="pointer-events-none absolute bottom-8 right-4 w-48 opacity-16"
        />

        <h2 className="text-4xl font-black tracking-[-0.035em]">
          Cùng hơn <span className="text-[#ff5c00]">10.000+</span> giáo viên nâng tầm giảng dạy
        </h2>

        <p className="mx-auto mt-4 max-w-[660px] text-base font-medium text-[#385178]">
          TuteClass — Nền tảng quản lý lớp học toàn diện cho giáo viên dạy thêm.
        </p>

        <form
          className="relative z-10 mx-auto mt-9 flex max-w-[560px] flex-col gap-3 rounded-[22px] border border-[#ead6b8] bg-white/85 p-2 shadow-[0_18px_50px_rgba(15,47,102,.1)] backdrop-blur-xl sm:flex-row"
          onSubmit={(event) => event.preventDefault()}
        >
          <input
            type="email"
            required
            aria-label="Email đăng ký"
            placeholder="Nhập email của bạn"
            className="min-w-0 flex-1 rounded-2xl bg-transparent px-5 py-3.5 text-sm font-semibold text-[#0b2f66] outline-none placeholder:text-[#8b98aa]"
          />
          <button
            type="submit"
            className="cursor-pointer rounded-2xl bg-[#ff5c00] px-7 py-3.5 text-sm font-black text-white shadow-[0_14px_30px_rgba(255,92,0,.25)] transition hover:-translate-y-0.5 hover:bg-[#e65300]"
          >
            Đăng ký ngay →
          </button>
        </form>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 text-sm font-bold text-[#385178] sm:flex-row sm:gap-10">
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#ff5c00]" />
            Miễn phí 14 ngày
          </span>

          <span className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-[#ff5c00]" />
            Không cần thẻ tín dụng
          </span>

          <span className="flex items-center gap-2">
            <Headphones className="h-4 w-4 text-[#ff5c00]" />
            Hỗ trợ mọi lúc
          </span>
        </div>
      </section>
    </main>
  );
}
