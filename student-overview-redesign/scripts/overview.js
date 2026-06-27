window.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector("[data-attendance-list]");
  const sort = document.querySelector("[data-attendance-sort]");
  const sortToggle = document.querySelector("[data-attendance-sort-toggle]");
  const sortLabel = document.querySelector("[data-attendance-sort-label]");
  const sortOptions = document.querySelectorAll("[data-attendance-sort-value]");

  if (!list || !sort || !sortToggle || !sortLabel) return;

  const sessions = [
    { date: "2024-05-17", day: "Thứ 6", time: "19:00 - 20:30", topic: "Ôn tập chương 3", status: "present" },
    { date: "2024-05-15", day: "Thứ 4", time: "19:00 - 20:30", topic: "Hàm số bậc hai", status: "present" },
    { date: "2024-05-10", day: "Thứ 6", time: "19:00 - 20:30", topic: "Luyện tập đồ thị", status: "absent" },
    { date: "2024-05-08", day: "Thứ 4", time: "19:00 - 20:30", topic: "Đồ thị hàm số", status: "present" },
    { date: "2024-05-03", day: "Thứ 6", time: "19:00 - 20:30", topic: "Kiểm tra giữa chương", status: "present" },
    { date: "2024-04-26", day: "Thứ 6", time: "19:00 - 20:30", topic: "Phương trình bậc hai", status: "present" },
    { date: "2024-04-24", day: "Thứ 4", time: "19:00 - 20:30", topic: "Công thức nghiệm", status: "present" },
    { date: "2024-04-19", day: "Thứ 6", time: "19:00 - 20:30", topic: "Biến đổi biểu thức", status: "present" },
    { date: "2024-04-17", day: "Thứ 4", time: "19:00 - 20:30", topic: "Căn thức bậc hai", status: "present" },
    { date: "2024-04-12", day: "Thứ 6", time: "19:00 - 20:30", topic: "Ôn tập chương 2", status: "present" },
    { date: "2024-04-10", day: "Thứ 4", time: "19:00 - 20:30", topic: "Hệ phương trình", status: "present" },
    { date: "2024-04-05", day: "Thứ 6", time: "19:00 - 20:30", topic: "Giải bài toán bằng hệ", status: "absent" },
    { date: "2024-04-03", day: "Thứ 4", time: "19:00 - 20:30", topic: "Phương pháp cộng", status: "present" },
    { date: "2024-03-29", day: "Thứ 6", time: "19:00 - 20:30", topic: "Phương pháp thế", status: "present" },
    { date: "2024-03-27", day: "Thứ 4", time: "19:00 - 20:30", topic: "Hệ hai phương trình", status: "present" },
    { date: "2024-03-22", day: "Thứ 6", time: "19:00 - 20:30", topic: "Luyện tập tổng hợp", status: "present" },
    { date: "2024-03-20", day: "Thứ 4", time: "19:00 - 20:30", topic: "Bất phương trình", status: "present" },
    { date: "2024-03-15", day: "Thứ 6", time: "19:00 - 20:30", topic: "Ôn tập học kỳ", status: "present" },
    { date: "2024-03-13", day: "Thứ 4", time: "19:00 - 20:30", topic: "Hàm số bậc nhất", status: "present" },
    { date: "2024-03-08", day: "Thứ 6", time: "19:00 - 20:30", topic: "Khảo sát đầu kỳ", status: "present" }
  ];

  const formatDate = (value) => {
    const [year, month, day] = value.split("-");
    return `${day}/${month}/${year}`;
  };

  function renderSessions(order) {
    const direction = order === "oldest" ? 1 : -1;
    const sorted = [...sessions].sort((a, b) => a.date.localeCompare(b.date) * direction);
    list.innerHTML = "";

    sorted.forEach((session) => {
      const present = session.status === "present";
      const item = document.createElement("article");
      item.className = "attendance-session";
      item.innerHTML = `
        <div class="attendance-date"><strong>${session.day}</strong><span>${formatDate(session.date)}</span></div>
        <div class="attendance-session-info"><strong>${session.topic}</strong><span>${session.time} · Cô Lan</span></div>
        <span class="attendance-status ${session.status}"><i></i>${present ? "Có điểm danh" : "Vắng"}</span>
      `;
      list.appendChild(item);
    });
  }

  function closeSort() {
    sort.classList.remove("open");
    sortToggle.setAttribute("aria-expanded", "false");
  }

  sortToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const open = sort.classList.toggle("open");
    sortToggle.setAttribute("aria-expanded", String(open));
  });

  sortOptions.forEach((option) => {
    option.addEventListener("click", () => {
      const value = option.dataset.attendanceSortValue;
      sortLabel.textContent = option.textContent;
      sortOptions.forEach((item) => item.classList.toggle("active", item === option));
      renderSessions(value);
      closeSort();
    });
  });

  document.addEventListener("click", (event) => {
    if (!sort.contains(event.target)) closeSort();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeSort();
  });

  renderSessions("newest");

  const gradesList = document.querySelector("[data-grades-list]");
  const gradesSort = document.querySelector("[data-grades-sort]");
  const gradesSortToggle = document.querySelector("[data-grades-sort-toggle]");
  const gradesSortLabel = document.querySelector("[data-grades-sort-label]");
  const gradesSortOptions = document.querySelectorAll("[data-grades-sort-value]");

  if (!gradesList || !gradesSort || !gradesSortToggle || !gradesSortLabel) return;

  const tests = [
    { date: "2024-05-12", title: "Kiểm tra cuối chương 3", type: "Kiểm tra 1 tiết", score: 9.5 },
    { date: "2024-05-05", title: "Bài kiểm tra số 4", type: "Kiểm tra 15 phút", score: 8.6 },
    { date: "2024-04-28", title: "Phương trình bậc hai", type: "Bài kiểm tra 1 tiết", score: 9.2 },
    { date: "2024-04-21", title: "Bài kiểm tra số 3", type: "Kiểm tra 15 phút", score: 8.8 },
    { date: "2024-04-14", title: "Kiểm tra giữa kỳ II", type: "Kiểm tra định kỳ", score: 9.0 },
    { date: "2024-04-07", title: "Hệ phương trình", type: "Bài kiểm tra số 2", score: 7.5 },
    { date: "2024-03-31", title: "Bài kiểm tra nhanh", type: "Kiểm tra 15 phút", score: 8.5 },
    { date: "2024-03-24", title: "Hàm số bậc nhất", type: "Bài kiểm tra số 1", score: 8.0 },
    { date: "2024-03-17", title: "Ôn tập học kỳ", type: "Bài luyện tập có điểm", score: 8.9 },
    { date: "2024-03-10", title: "Bất phương trình", type: "Kiểm tra 15 phút", score: 8.3 },
    { date: "2024-03-03", title: "Căn thức bậc hai", type: "Bài kiểm tra 1 tiết", score: 8.7 },
    { date: "2024-02-25", title: "Khảo sát đầu kỳ II", type: "Kiểm tra khảo sát", score: 8.4 }
  ];

  function scoreClass(score) {
    if (score >= 9) return "excellent";
    if (score >= 8) return "good";
    return "average";
  }

  function renderTests(order) {
    const direction = order === "oldest" ? 1 : -1;
    const sorted = [...tests].sort((a, b) => a.date.localeCompare(b.date) * direction);
    gradesList.innerHTML = "";

    sorted.forEach((test) => {
      const item = document.createElement("article");
      item.className = "grades-test-item";
      item.innerHTML = `
        <div class="grades-test-icon"><span class="icon" data-icon="checklist"></span></div>
        <div class="grades-test-info"><strong>${test.title}</strong><span>${test.type} · ${formatDate(test.date)}</span></div>
        <div class="grades-test-score ${scoreClass(test.score)}"><strong>${test.score.toFixed(1)}</strong><span>/10</span></div>
      `;
      gradesList.appendChild(item);
    });

    if (typeof hydrateIcons === "function") hydrateIcons();
  }

  function closeGradesSort() {
    gradesSort.classList.remove("open");
    gradesSortToggle.setAttribute("aria-expanded", "false");
  }

  gradesSortToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const open = gradesSort.classList.toggle("open");
    gradesSortToggle.setAttribute("aria-expanded", String(open));
  });

  gradesSortOptions.forEach((option) => {
    option.addEventListener("click", () => {
      const value = option.dataset.gradesSortValue;
      gradesSortLabel.textContent = option.textContent;
      gradesSortOptions.forEach((item) => item.classList.toggle("active", item === option));
      renderTests(value);
      closeGradesSort();
    });
  });

  document.addEventListener("click", (event) => {
    if (!gradesSort.contains(event.target)) closeGradesSort();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeGradesSort();
  });

  renderTests("newest");

  const overviewMonthGrid = document.querySelector("[data-overview-month-grid]");
  const overviewMonthLabel = document.querySelector("[data-overview-month-label]");
  const overviewMonthPrev = document.querySelector("[data-overview-month-prev]");
  const overviewMonthNext = document.querySelector("[data-overview-month-next]");
  const overviewDayModal = document.querySelector("[data-overview-day-sessions-modal]");
  const overviewDayTitle = document.querySelector("[data-overview-day-sessions-title]");
  const overviewDayList = document.querySelector("[data-overview-day-sessions-list]");
  let overviewMonthCursor = new Date(2024, 4, 1);

  if (!overviewMonthGrid || !overviewMonthLabel || !overviewMonthPrev || !overviewMonthNext) return;

  const overviewMonthWeekdays = ["CN", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
  const overviewToday = new Date(2024, 4, 17);
  const sameOverviewDay = (firstDate, secondDate) => firstDate.getFullYear() === secondDate.getFullYear()
    && firstDate.getMonth() === secondDate.getMonth()
    && firstDate.getDate() === secondDate.getDate();
  const overviewFullDayNames = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];

  function closeOverviewDaySessions() {
    overviewDayModal?.classList.remove("open");
  }

  function openOverviewDaySessions(date, events) {
    if (!overviewDayModal || !overviewDayTitle || !overviewDayList) return;
    const dateLabel = `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
    overviewDayTitle.textContent = `${overviewFullDayNames[date.getDay()]}, ${dateLabel}`;
    overviewDayList.innerHTML = "";

    events.forEach((event) => {
      const item = document.createElement("article");
      item.className = "day-session-item";
      item.innerHTML = `<i class="${event.color}"></i><div><strong>${event.title}</strong><span>${event.time} · ${event.place}</span></div>`;
      overviewDayList.appendChild(item);
    });
    overviewDayModal.classList.add("open");
  }

  function getOverviewDayEvents(date) {
    const events = [];
    const day = date.getDay();

    if (day === 3 || day === 5) events.push({ color: "green", title: "Toán 9A", time: "18:30 - 20:00", place: "Phòng online 2" });
    if (day === 3 && date.getDate() % 2 === 0) events.push({ color: "blue", title: "Tiếng Anh 9A", time: "19:00 - 20:30", place: "Phòng online 1" });
    if (day === 4 && date.getDate() % 2 === 0) events.push({ color: "violet", title: "Tự học Toán", time: "15:30 - 17:00", place: "Ôn bài chương 3" });
    if (date.getDate() === 16) events.push({ color: "amber", title: "Thực hành", time: "17:00 - 18:30", place: "Lab 03" });
    return events;
  }

  function renderOverviewMonth() {
    const year = overviewMonthCursor.getFullYear();
    const month = overviewMonthCursor.getMonth();
    const first = new Date(year, month, 1);
    const start = new Date(year, month, 1 - first.getDay());
    overviewMonthLabel.textContent = `Tháng ${month + 1}, ${year}`;
    overviewMonthGrid.innerHTML = "";

    overviewMonthWeekdays.forEach((name) => {
      const heading = document.createElement("div");
      heading.className = "student-month-weekday";
      heading.textContent = name;
      overviewMonthGrid.appendChild(heading);
    });

    for (let index = 0; index < 42; index += 1) {
      const date = new Date(start);
      date.setDate(start.getDate() + index);
      const inMonth = date.getMonth() === month;
      const cell = document.createElement("div");
      cell.className = `student-month-day${inMonth ? "" : " muted"}${sameOverviewDay(date, overviewToday) ? " is-highlighted" : ""}`;
      cell.innerHTML = `<strong>${date.getDate()}</strong>`;

      if (inMonth) {
        const events = getOverviewDayEvents(date);
        if (events.length) {
          const dots = document.createElement("span");
          dots.className = "student-month-dots";
          events.forEach((event) => {
            const dot = document.createElement("i");
            dot.className = `student-month-dot ${event.color}`;
            dots.appendChild(dot);
          });
          cell.appendChild(dots);
          cell.classList.add("has-events");
          cell.tabIndex = 0;
          cell.setAttribute("role", "button");
          cell.addEventListener("click", () => openOverviewDaySessions(date, events));
          cell.addEventListener("keydown", (keyEvent) => {
            if (keyEvent.key === "Enter" || keyEvent.key === " ") {
              keyEvent.preventDefault();
              openOverviewDaySessions(date, events);
            }
          });
        }
      }
      overviewMonthGrid.appendChild(cell);
    }
  }

  overviewMonthPrev.addEventListener("click", () => {
    overviewMonthCursor = new Date(overviewMonthCursor.getFullYear(), overviewMonthCursor.getMonth() - 1, 1);
    renderOverviewMonth();
  });

  overviewMonthNext.addEventListener("click", () => {
    overviewMonthCursor = new Date(overviewMonthCursor.getFullYear(), overviewMonthCursor.getMonth() + 1, 1);
    renderOverviewMonth();
  });

  document.querySelector("[data-close-overview-day-sessions]")?.addEventListener("click", closeOverviewDaySessions);
  overviewDayModal?.addEventListener("click", (event) => {
    if (event.target === overviewDayModal) closeOverviewDaySessions();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeOverviewDaySessions();
  });

  renderOverviewMonth();
});
