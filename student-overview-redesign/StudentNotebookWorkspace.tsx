import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  BarChart3,
  Bell,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Clock3,
  CreditCard,
  Download,
  FileText,
  Home,
  Link2,
  MessageSquare,
  Paperclip,
  Plus,
  Search,
  Send,
  Sparkles,
  UserRound,
  X
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { notebookPages } from "./builders/notebookPages";
import { classTabs, DEFAULT_NOTEBOOK_LOCATION, sectionMarkers } from "./config/navigation";
import { overviewDashboardContent } from "./content/overviewDashboardContent";
import type {
  AssignmentStatus,
  AssignmentsSpreadData,
  ClassKey,
  DiscussionMessage,
  DiscussionSpreadData,
  NotebookPage,
  ResourceFileType,
  ResourceFilter,
  ResourcesSpreadData,
  ScheduleEvent,
  ScheduleSpreadData,
  SectionKey
} from "./domain/types";
import "./StudentNotebookWorkspace.css";

type StudentRouteState = {
  classKey: ClassKey;
  sectionKey: SectionKey;
};

const sectionIconMap: Record<SectionKey, LucideIcon> = {
  overview: Home,
  schedule: CalendarDays,
  assignments: ClipboardCheck,
  resources: FileText,
  discussion: MessageSquare
};

const paperClasses = ["paper-yellow", "paper-blue", "paper-pink", "paper-green", "paper-violet"];

const assignmentStatusLabels: Record<AssignmentStatus, string> = {
  graded: "Đã chấm",
  "in-progress": "Đang làm",
  "not-started": "Chưa làm",
  submitted: "Đã nộp"
};

const resourceTypeLabels: Record<ResourceFileType, string> = {
  doc: "Word",
  image: "Ảnh",
  link: "Link",
  pdf: "PDF",
  video: "Video"
};

function isClassKey(value: string): value is ClassKey {
  return classTabs.some((item) => item.key === value);
}

function isSectionKey(value: string): value is SectionKey {
  return sectionMarkers.some((item) => item.key === value);
}

function parseStudentHash(hash: string): StudentRouteState {
  const [, sectionFromHash, classFromHash] = hash.replace(/^#/, "").split("/");

  return {
    classKey: classFromHash && isClassKey(classFromHash) ? classFromHash : DEFAULT_NOTEBOOK_LOCATION.classKey,
    sectionKey: sectionFromHash && isSectionKey(sectionFromHash) ? sectionFromHash : DEFAULT_NOTEBOOK_LOCATION.sectionKey
  };
}

function writeStudentHash(sectionKey: SectionKey, classKey: ClassKey) {
  const nextHash = `#student/${sectionKey}/${classKey}`;

  if (window.location.hash !== nextHash) {
    window.history.pushState(null, "", nextHash);
  }
}

function getCurrentDateLabel() {
  const today = new Date();
  const days = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");

  return `${days[today.getDay()]}, ${day}/${month}/${today.getFullYear()}`;
}

function findStudentPage(classKey: ClassKey, sectionKey: SectionKey): NotebookPage {
  return (
    notebookPages.find((page) => page.classKey === classKey && page.sectionKey === sectionKey) ??
    notebookPages.find((page) => page.classKey === DEFAULT_NOTEBOOK_LOCATION.classKey && page.sectionKey === DEFAULT_NOTEBOOK_LOCATION.sectionKey) ??
    notebookPages[0]
  );
}

function getScheduleData(classKey: ClassKey) {
  const page = findStudentPage(classKey, "schedule");

  return page.spreadType === "schedule" ? page.data : null;
}

function getAssignmentsData(classKey: ClassKey) {
  const page = findStudentPage(classKey, "assignments");

  return page.spreadType === "assignments" ? page.data : null;
}

function getDayIndex(event: ScheduleEvent, fallback: number, totalDays: number) {
  const match = event.left.match(/\*\s*(\d+)/);
  const parsed = match ? Number(match[1]) : fallback;

  return Math.min(Math.max(parsed, 0), Math.max(totalDays - 1, 0));
}

function getIconForQuickCard(icon: string) {
  if (icon === "wallet") return CreditCard;
  if (icon === "assignment") return ClipboardCheck;
  if (icon === "calendar") return CalendarDays;
  return BarChart3;
}

function StudentKpiCard({
  icon: Icon,
  label,
  note,
  tone,
  trend,
  value
}: {
  icon: LucideIcon;
  label: string;
  note: string;
  tone: "green" | "amber" | "rose" | "blue" | "violet";
  trend: string;
  value: string;
}) {
  return (
    <article className="student-kpi">
      <div className="student-kpi-top">
        <span className={`student-kpi-badge b-${tone}`}>
          <Icon aria-hidden="true" />
        </span>
        <span className={`student-kpi-trend b-${tone}`}>{trend}</span>
      </div>
      <span className="student-kpi-label">{label}</span>
      <strong className="student-kpi-value">{value}</strong>
      <span className="student-kpi-note">{note}</span>
    </article>
  );
}

function StudentPanel({
  children,
  icon: Icon,
  more,
  tone,
  title
}: {
  children: ReactNode;
  icon: LucideIcon;
  more?: string;
  tone: "green" | "amber" | "rose" | "blue" | "violet";
  title: string;
}) {
  return (
    <section className="student-panel">
      <header className="student-panel-head">
        <div className="student-panel-title">
          <span className={`student-panel-icon b-${tone}`}>
            <Icon aria-hidden="true" />
          </span>
          <h3>{title}</h3>
        </div>
        {more ? <span className="student-panel-more">{more}</span> : null}
      </header>
      {children}
    </section>
  );
}

function OverviewPage({ classKey, className, teacher }: { classKey: ClassKey; className: string; teacher: string }) {
  const content = overviewDashboardContent[classKey];
  const schedule = getScheduleData(classKey);
  const assignmentData = getAssignmentsData(classKey);
  const pendingAssignments = assignmentData?.items.filter((item) => item.status === "not-started" || item.status === "in-progress") ?? [];

  return (
    <>
      <div className="student-page-head">
        <div>
          <div className="student-breadcrumb">Trang học sinh / <b>{className}</b></div>
          <h2>Tổng quan lớp {className}</h2>
          <p>Chào Minh Anh, đây là nhịp học hôm nay với {teacher}.</p>
        </div>
        <div className="student-date-pill">
          <span>{getCurrentDateLabel()}</span>
          <CalendarDays aria-hidden="true" />
        </div>
      </div>

      <div className="student-kpis">
        {content.quickCards.map((card) => {
          const Icon = getIconForQuickCard(card.icon);
          const tone = card.tone === "teal" ? "green" : card.tone === "orange" ? "amber" : card.tone === "violet" ? "violet" : "blue";

          return (
            <StudentKpiCard
              icon={Icon}
              key={card.title}
              label={card.title}
              note={card.detail}
              tone={tone}
              trend={card.meta}
              value={card.value}
            />
          );
        })}
        <StudentKpiCard
          icon={CheckCircle2}
          label={content.attendanceTitle}
          note={content.attendanceDetail}
          tone="rose"
          trend="Điểm danh"
          value={content.attendanceValue}
        />
      </div>

      <div className="student-grid three-cols">
        <StudentPanel icon={CalendarDays} more="Tuần này" title="Lịch sắp tới" tone="violet">
          <div className="student-schedule-list">
            {(schedule?.sessions ?? []).slice(0, 4).map((session) => (
              <article className="student-schedule-item" key={session.id}>
                <div className="student-day-chip">
                  <strong>{session.date.split(",")[0].replace("Vào ngày mai (", "").replace(")", "")}</strong>
                  <span>{session.time}</span>
                </div>
                <div>
                  <strong>{session.subject}</strong>
                  <span>{session.teacher}</span>
                </div>
              </article>
            ))}
          </div>
        </StudentPanel>

        <StudentPanel icon={ClipboardCheck} more={`${pendingAssignments.length} việc`} title={content.taskTitle} tone="rose">
          <div className="student-task-list">
            {content.taskItems.slice(0, 5).map((item) => (
              <label className="student-task-row" key={`${item.label}-${item.meta}`}>
                <span className="student-check-dot" />
                <span>{item.label}</span>
                <strong>{item.meta}</strong>
              </label>
            ))}
          </div>
        </StudentPanel>

        <StudentPanel icon={Sparkles} more="Cá nhân" title="Kế hoạch học tập" tone="green">
          <div className="student-plan-list">
            {content.planItems.map((item) => (
              <label key={item}>
                <input type="checkbox" />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </StudentPanel>
      </div>
    </>
  );
}

function SchedulePage({ data }: { data: ScheduleSpreadData }) {
  const groupedEvents = data.days.map(([day, date], dayIndex) => ({
    date,
    day,
    events: data.events.filter((event, eventIndex) => getDayIndex(event, eventIndex, data.days.length) === dayIndex)
  }));

  return (
    <>
      <div className="student-page-head">
        <div>
          <div className="student-breadcrumb">Trang học sinh / <b>{data.accent}</b></div>
          <h2>{data.heading}</h2>
          <p>{data.subtitle}</p>
        </div>
        <div className="student-date-pill">
          <span>{data.monthLabel}</span>
          <CalendarDays aria-hidden="true" />
        </div>
      </div>

      <div className="student-kpis compact">
        <StudentKpiCard icon={Clock3} label="Buổi hôm nay" note="Theo agenda cá nhân" tone="green" trend="Hôm nay" value={`${data.todayAgenda.length} buổi`} />
        <StudentKpiCard icon={CalendarDays} label="Sắp tới" note={data.sessions[0]?.date ?? "Đang cập nhật"} tone="blue" trend="Tuần này" value={`${data.sessions.length} lịch`} />
        <StudentKpiCard icon={Bell} label="Nhắc nhở" note={data.reminders[0]?.text ?? "Không có nhắc nhở"} tone="amber" trend="Cần xem" value={`${data.reminders.length} mục`} />
      </div>

      <div className="student-grid schedule-grid">
        <StudentPanel icon={CalendarDays} more={data.weekLabel} title="Thời khóa biểu" tone="blue">
          <div className="student-week-board">
            {groupedEvents.map((group) => (
              <section className="student-week-day" key={`${group.day}-${group.date}`}>
                <header>
                  <strong>{group.day}</strong>
                  <span>{group.date}</span>
                </header>
                {group.events.length ? (
                  group.events.map((event) => (
                    <article className="student-lesson-pill" key={`${event.subject}-${event.time}-${event.teacher}`}>
                      <strong>{event.subject}</strong>
                      <span>{event.time}</span>
                      <small>{event.teacher}</small>
                    </article>
                  ))
                ) : (
                  <p>Tự học</p>
                )}
              </section>
            ))}
          </div>
        </StudentPanel>

        <div className="student-side-stack">
          <StudentPanel icon={Clock3} more="Hôm nay" title="Agenda" tone="green">
            <div className="student-agenda-list">
              {data.todayAgenda.map((item) => (
                <article key={item.id}>
                  <time>{item.time}</time>
                  <strong>{item.subject}</strong>
                  <span>{item.detail}</span>
                </article>
              ))}
            </div>
          </StudentPanel>

          <StudentPanel icon={Bell} title="Nhắc nhở" tone="amber">
            <ul className="student-simple-list">
              {data.reminders.map((item) => (
                <li key={item.id}>{item.text}</li>
              ))}
            </ul>
          </StudentPanel>
        </div>
      </div>
    </>
  );
}

function AssignmentsPage({ data }: { data: AssignmentsSpreadData }) {
  const submittedCount = data.items.filter((item) => item.status === "submitted" || item.status === "graded").length;
  const pendingCount = data.items.length - submittedCount;

  return (
    <>
      <div className="student-page-head">
        <div>
          <div className="student-breadcrumb">Trang học sinh / <b>{data.accent}</b></div>
          <h2>{data.heading}</h2>
          <p>{data.subtitle}</p>
        </div>
        <button className="student-primary-action" type="button">
          <Plus aria-hidden="true" />
          Nộp bài
        </button>
      </div>

      <div className="student-kpis compact">
        <StudentKpiCard icon={ClipboardCheck} label="Tổng bài" note="Theo lớp hiện tại" tone="violet" trend="Bài tập" value={`${data.items.length}`} />
        <StudentKpiCard icon={CheckCircle2} label="Đã nộp" note="Bao gồm bài đã chấm" tone="green" trend="Tiến độ" value={`${submittedCount}`} />
        <StudentKpiCard icon={Clock3} label="Cần làm" note="Chưa làm hoặc đang làm" tone="rose" trend="Ưu tiên" value={`${pendingCount}`} />
      </div>

      <div className="student-grid page-with-sidebar">
        <StudentPanel icon={ClipboardCheck} more="Danh sách" title="Bài tập được giao" tone="violet">
          <div className="student-table assignment-table-shell">
            <div className="student-table-head">
              <span>Bài tập</span>
              <span>Buổi/Chủ đề</span>
              <span>Hạn nộp</span>
              <span>Trạng thái</span>
              <span>Điểm</span>
              <span></span>
            </div>
            {data.items.map((item) => (
              <article className="student-table-row" key={item.id}>
                <div className="student-title-cell">
                  <span className={`student-symbol status-${item.status}`}>{item.icon}</span>
                  <strong>{item.title}</strong>
                </div>
                <div>
                  <strong>{item.lesson}</strong>
                  <span>{item.topic}</span>
                </div>
                <span>{item.deadline}</span>
                <span className={`student-status status-${item.status}`}>{assignmentStatusLabels[item.status]}</span>
                <strong>{item.score ?? "--"}</strong>
                <button type="button">Mở</button>
              </article>
            ))}
          </div>
        </StudentPanel>

        <aside className="student-side-stack">
          {data.notes.map((note) => (
            <section className={`student-note-card note-${note.tone}`} key={note.id}>
              <span className="student-note-pin" />
              <h3>{note.title}</h3>
              {note.items ? (
                <ul>
                  {note.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
              {note.text ? <p>{note.text}</p> : null}
              {note.stats ? (
                <div className="student-note-stats">
                  {note.stats.map((stat) => (
                    <div key={stat.id}>
                      <span>{stat.label}</span>
                      <strong>{stat.value}</strong>
                    </div>
                  ))}
                </div>
              ) : null}
            </section>
          ))}
        </aside>
      </div>
    </>
  );
}

function ResourcesPage({ data }: { data: ResourcesSpreadData }) {
  const [activeFilter, setActiveFilter] = useState<ResourceFilter["id"]>("all");
  const filteredItems = useMemo(
    () => (activeFilter === "all" ? data.items : data.items.filter((item) => item.type === activeFilter)),
    [activeFilter, data.items]
  );

  useEffect(() => {
    setActiveFilter("all");
  }, [data.accent]);

  return (
    <>
      <div className="student-page-head">
        <div>
          <div className="student-breadcrumb">Trang học sinh / <b>{data.accent}</b></div>
          <h2>{data.heading}</h2>
          <p>{data.subtitle}</p>
        </div>
        <button className="student-primary-action" type="button">
          <Download aria-hidden="true" />
          Tải mới
        </button>
      </div>

      <div className="student-grid page-with-sidebar">
        <StudentPanel icon={BookOpen} more={`${filteredItems.length} tài liệu`} title="Kho tài liệu" tone="blue">
          <div className="student-filter-row">
            {data.filters.map((filter) => (
              <button className={activeFilter === filter.id ? "is-active" : ""} key={filter.id} onClick={() => setActiveFilter(filter.id)} type="button">
                {filter.label}
              </button>
            ))}
          </div>
          <div className="student-table resource-table-shell">
            <div className="student-table-head">
              <span>Tài liệu</span>
              <span>Buổi/Chủ đề</span>
              <span>Loại</span>
              <span>Ngày đăng</span>
              <span>Người đăng</span>
              <span></span>
            </div>
            {filteredItems.map((item) => (
              <article className="student-table-row" key={item.id}>
                <div className="student-title-cell">
                  <span className={`student-file-badge file-${item.type}`}>{item.type === "image" ? "IMG" : item.type.toUpperCase()}</span>
                  <strong>{item.name}</strong>
                </div>
                <div>
                  <strong>{item.lesson}</strong>
                  <span>{item.topic}</span>
                </div>
                <span className={`student-status file-${item.type}`}>{resourceTypeLabels[item.type]}</span>
                <span>{item.date}</span>
                <span>{item.owner}</span>
                <button type="button">{item.action === "open" ? "Mở" : item.action === "download" ? "Tải" : "Xem"}</button>
              </article>
            ))}
          </div>
        </StudentPanel>

        <aside className="student-side-stack">
          {data.notes.map((note) => (
            <section className={`student-note-card note-${note.tone}`} key={note.id}>
              <span className="student-note-pin" />
              <h3>{note.title}</h3>
              {note.items ? (
                <ul>
                  {note.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
              {note.text ? <p>{note.text}</p> : null}
              {note.stats ? (
                <div className="student-note-stats">
                  {note.stats.map((stat) => (
                    <div key={stat.id}>
                      <span>{stat.label}</span>
                      <strong>{stat.value}</strong>
                    </div>
                  ))}
                </div>
              ) : null}
            </section>
          ))}
        </aside>
      </div>
    </>
  );
}

function DiscussionPage({ data }: { data: DiscussionSpreadData }) {
  const [activeTab, setActiveTab] = useState<"class" | "teacher">("class");
  const [classFeed, setClassFeed] = useState<DiscussionMessage[]>(data.classFeed);
  const [teacherFeed, setTeacherFeed] = useState<DiscussionMessage[]>(data.teacherFeed);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    setActiveTab("class");
    setClassFeed(data.classFeed);
    setTeacherFeed(data.teacherFeed);
    setDraft("");
  }, [data]);

  const activeFeed = activeTab === "class" ? classFeed : teacherFeed;

  const handleSend = () => {
    const message = draft.trim();

    if (!message) return;

    const newMessage: DiscussionMessage = {
      author: "Minh Anh",
      id: `discussion-${Date.now()}`,
      likes: 0,
      message,
      role: "student",
      time: "Vừa xong"
    };

    if (activeTab === "class") {
      setClassFeed((items) => [...items, newMessage]);
    } else {
      setTeacherFeed((items) => [...items, newMessage]);
    }

    setDraft("");
  };

  return (
    <>
      <div className="student-page-head">
        <div>
          <div className="student-breadcrumb">Trang học sinh / <b>{data.accent}</b></div>
          <h2>{data.heading}</h2>
          <p>{data.subtitle}</p>
        </div>
        <button className="student-primary-action" type="button">
          <MessageSquare aria-hidden="true" />
          Tin mới
        </button>
      </div>

      <div className="student-grid discussion-grid">
        <StudentPanel icon={MessageSquare} more={activeTab === "class" ? data.classTabLabel : data.teacherTabLabel} title="Trao đổi" tone="green">
          <div className="student-seg">
            <button className={activeTab === "class" ? "active" : ""} onClick={() => setActiveTab("class")} type="button">
              {data.classTabLabel}
            </button>
            <button className={activeTab === "teacher" ? "active" : ""} onClick={() => setActiveTab("teacher")} type="button">
              {data.teacherTabLabel}
            </button>
          </div>

          <div className="student-chat-feed">
            {activeFeed.map((item) => (
              <article className={`student-message role-${item.role}`} key={item.id}>
                <div className="student-avatar">{item.author.slice(0, 2).toUpperCase()}</div>
                <div>
                  <div className="student-message-meta">
                    <strong>{item.author}</strong>
                    <span>{item.time}</span>
                  </div>
                  <p>{item.message}</p>
                  {item.likes ? <small>{item.likes} lượt thích</small> : null}
                </div>
              </article>
            ))}
          </div>

          <div className="student-chat-input">
            <input onChange={(event) => setDraft(event.target.value)} placeholder="Nhập tin nhắn..." value={draft} />
            <button aria-label="Đính kèm" type="button">
              <Paperclip aria-hidden="true" />
            </button>
            <button aria-label="Gửi" onClick={handleSend} type="button">
              <Send aria-hidden="true" />
            </button>
          </div>
        </StudentPanel>

        <aside className="student-side-stack">
          <section className="student-note-card note-green">
            <span className="student-note-pin" />
            <h3>{data.pinnedTitle}</h3>
            <ul>
              {data.pinnedItems.map((item) => (
                <li key={item.id}>{item.text}</li>
              ))}
            </ul>
          </section>

          <section className="student-note-card note-purple">
            <span className="student-note-pin" />
            <h3>Tệp đã chia sẻ</h3>
            <div className="student-shared-files">
              {data.sharedFiles.map((file) => (
                <article key={file.id}>
                  <span className={`student-file-badge file-${file.type}`}>{file.type.toUpperCase()}</span>
                  <div>
                    <strong>{file.name}</strong>
                    <span>{file.meta}</span>
                  </div>
                  <Link2 aria-hidden="true" />
                </article>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}

function renderStudentPage(page: NotebookPage) {
  if (page.spreadType === "schedule") {
    return <SchedulePage data={page.data} />;
  }

  if (page.spreadType === "assignments") {
    return <AssignmentsPage data={page.data} />;
  }

  if (page.spreadType === "resources") {
    return <ResourcesPage data={page.data} />;
  }

  if (page.spreadType === "discussion") {
    return <DiscussionPage data={page.data} />;
  }

  return <OverviewPage classKey={page.classKey} className={page.className} teacher={page.teacher} />;
}

export function StudentNotebookWorkspace() {
  const initialRoute = useMemo(() => parseStudentHash(window.location.hash), []);
  const [activeClassKey, setActiveClassKey] = useState<ClassKey>(initialRoute.classKey);
  const [activeSectionKey, setActiveSectionKey] = useState<SectionKey>(initialRoute.sectionKey);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isJoinClassOpen, setIsJoinClassOpen] = useState(false);
  const currentPage = findStudentPage(activeClassKey, activeSectionKey);
  const activeClass = classTabs.find((item) => item.key === activeClassKey) ?? classTabs[0];

  useEffect(() => {
    const syncFromHash = () => {
      const nextRoute = parseStudentHash(window.location.hash);
      setActiveClassKey(nextRoute.classKey);
      setActiveSectionKey(nextRoute.sectionKey);
    };

    window.addEventListener("hashchange", syncFromHash);
    window.addEventListener("popstate", syncFromHash);

    return () => {
      window.removeEventListener("hashchange", syncFromHash);
      window.removeEventListener("popstate", syncFromHash);
    };
  }, []);

  useEffect(() => {
    document.title = `Tuteclass - ${currentPage.navLabel} lớp ${currentPage.className}`;
  }, [currentPage]);

  const handleSectionChange = (sectionKey: SectionKey) => {
    setActiveSectionKey(sectionKey);
    writeStudentHash(sectionKey, activeClassKey);
  };

  const handleClassChange = (classKey: ClassKey) => {
    setActiveClassKey(classKey);
    setIsDrawerOpen(false);
    writeStudentHash(activeSectionKey, classKey);
  };

  return (
    <main className="student-shell-app">
      <header className="student-topbar">
        <button className="student-brand" onClick={() => handleSectionChange("overview")} type="button">
          tute<span>class</span>
        </button>

        <nav className="student-hnav" aria-label="Student sections">
          {sectionMarkers.map((item) => {
            const Icon = sectionIconMap[item.key];

            return (
              <button className={activeSectionKey === item.key ? "active" : ""} key={item.key} onClick={() => handleSectionChange(item.key)} type="button">
                <Icon aria-hidden="true" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <label className="student-search">
            <Search aria-hidden="true" />
            <input placeholder="Tìm lớp, bài tập, tài liệu..." />
          </label>
        </nav>

        <div className="student-top-actions">
          <button className="student-icon-btn" title="Thông báo" type="button">
            <span />
            <Bell aria-hidden="true" />
          </button>
          <button className="student-profile" type="button">
            <span className="student-profile-avatar">MA</span>
            <span className="student-profile-meta">
              <strong>Minh Anh</strong>
              <small>Học sinh</small>
            </span>
            <ChevronDown aria-hidden="true" />
          </button>
        </div>
      </header>

      <section className="student-main-stage">
        <div className="student-content">
          <div className="student-class-switch-row">
            <button className="student-title-switch" onClick={() => setIsDrawerOpen(true)} type="button">
              <span>Lớp đang học</span>
              <strong>{activeClass.name}</strong>
              <ChevronDown aria-hidden="true" />
            </button>
            <button className="student-join-inline" onClick={() => setIsJoinClassOpen(true)} type="button">
              <Plus aria-hidden="true" />
              Tham gia lớp
            </button>
          </div>
          {renderStudentPage(currentPage)}
        </div>
      </section>

      <div className="student-dock-wrap" aria-hidden="true">
        <svg className="student-dock-bg" viewBox="0 0 524 56" preserveAspectRatio="xMidYMax meet">
          <path d="M 56 0 L 468 0 A 26 26 0 0 1 494 26 A 30 30 0 0 0 524 56 L 0 56 A 30 30 0 0 0 30 26 A 26 26 0 0 1 56 0 Z" />
        </svg>
      </div>

      <nav className="student-dock" aria-label="Student quick navigation">
        {sectionMarkers.map((item) => {
          const Icon = sectionIconMap[item.key];

          return (
            <button className={activeSectionKey === item.key ? "active" : ""} key={item.key} onClick={() => handleSectionChange(item.key)} title={item.label} type="button">
              <span>
                <Icon aria-hidden="true" />
              </span>
            </button>
          );
        })}
      </nav>

      <div className={`student-drawer-overlay ${isDrawerOpen ? "open" : ""}`} onClick={() => setIsDrawerOpen(false)} role="presentation" />
      <aside className={`student-class-drawer ${isDrawerOpen ? "open" : ""}`}>
        <header>
          <h3>Lớp của tôi</h3>
          <button aria-label="Đóng danh sách lớp" onClick={() => setIsDrawerOpen(false)} type="button">
            <X aria-hidden="true" />
          </button>
        </header>
        <div className="student-class-notes">
          {classTabs.map((item, index) => (
            <button className={`${paperClasses[index % paperClasses.length]} ${activeClassKey === item.key ? "active" : ""}`} key={item.key} onClick={() => handleClassChange(item.key)} type="button">
              <strong>{item.name}</strong>
              <span>{item.teacher}</span>
              <small>
                <UserRound aria-hidden="true" />
                Đang theo học
              </small>
            </button>
          ))}
          <button
            className="add-class"
            onClick={() => {
              setIsDrawerOpen(false);
              setIsJoinClassOpen(true);
            }}
            type="button"
          >
            <Plus aria-hidden="true" />
            Thêm lớp
          </button>
        </div>
      </aside>

      {isJoinClassOpen ? (
        <div className="student-join-backdrop" onMouseDown={() => setIsJoinClassOpen(false)} role="presentation">
          <section aria-label="Tham gia lớp học" aria-modal="true" className="student-join-modal" onMouseDown={(event) => event.stopPropagation()} role="dialog">
            <button aria-label="Đóng popup tham gia lớp học" className="student-join-close" onClick={() => setIsJoinClassOpen(false)} type="button">
              <X aria-hidden="true" />
            </button>
            <header>
              <span>
                <Plus aria-hidden="true" />
              </span>
              <div>
                <h2>Tham gia lớp học</h2>
                <p>Nhập mã lớp hoặc link mời do giáo viên cung cấp.</p>
              </div>
            </header>
            <div className="student-join-grid">
              <label>
                <span>Mã lớp</span>
                <input placeholder="Ví dụ: MATH9A" />
              </label>
              <label>
                <span>Link mời</span>
                <input placeholder="https://tuteclass.vn/join/..." />
              </label>
            </div>
            <div className="student-join-actions">
              <button onClick={() => setIsJoinClassOpen(false)} type="button">Hủy</button>
              <button type="button">Tham gia lớp</button>
            </div>
          </section>
        </div>
      ) : null}
    </main>
  );
}
