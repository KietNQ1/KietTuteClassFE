(() => {
  const grid = document.querySelector("[data-calendar-grid]");

  if (!grid) return;

  const rangeLabel = document.querySelector("[data-calendar-range]");
  const weekPanel = document.querySelector("[data-calendar-week-panel]");
  const monthPanel = document.querySelector("[data-calendar-month-panel]");
  const monthGrid = document.querySelector("[data-calendar-month-grid]");
  const legend = document.querySelector("[data-calendar-legend]");
  const daySessionsModal = document.querySelector("[data-day-sessions-modal]");
  const daySessionsTitle = document.querySelector("[data-day-sessions-title]");
  const daySessionsList = document.querySelector("[data-day-sessions-list]");
  const startHour = 7;
  const endHour = 21;
  const hourHeight = 48;
  const baseWeek = new Date(2024, 4, 13);
  let weekStart = new Date(baseWeek);
  let view = "week";

  const lessons = [
    { day: 0, start: 7.5, end: 9, title: "Toán 9A", time: "07:30 - 09:00", detail: "Cô Lan · Phòng online 2", color: "green" },
    { day: 0, start: 19, end: 20.5, title: "Toán 9A", time: "19:00 - 20:30", detail: "Cô Lan · Ôn tập", color: "green" },
    { day: 2, start: 19, end: 20.5, title: "Tiếng Anh 9A", time: "19:00 - 20:30", detail: "Thầy Nam · Phòng online 1", color: "blue" },
    { day: 3, start: 15.5, end: 17, title: "Tự học Toán", time: "15:30 - 17:00", detail: "Ôn bài chương 3", color: "violet" },
    { day: 3, start: 17, end: 18.5, title: "Thực hành", time: "17:00 - 18:30", detail: "Lab 03", color: "amber" },
    { day: 4, start: 19, end: 20.5, title: "Toán 9A", time: "19:00 - 20:30", detail: "Cô Lan · Hàm số bậc hai", color: "green" }
  ];

  const dayNames = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"];
  const monthWeekdays = ["CN", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
  const pad = (value) => String(value).padStart(2, "0");
  const addDays = (date, count) => {
    const next = new Date(date);
    next.setDate(next.getDate() + count);
    return next;
  };
  const sameDay = (a, b) => a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate();
  const formatShort = (date) => `${pad(date.getDate())}/${pad(date.getMonth() + 1)}`;
  const fullDayNames = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];

  function closeDaySessions() {
    daySessionsModal?.classList.remove("open");
  }

  function openDaySessions(date, dayLessons) {
    if (!daySessionsModal || !daySessionsTitle || !daySessionsList) return;
    daySessionsTitle.textContent = `${fullDayNames[date.getDay()]}, ${formatShort(date)}/${date.getFullYear()}`;
    daySessionsList.innerHTML = "";

    dayLessons.forEach((lesson) => {
      const item = document.createElement("button");
      item.className = "day-session-item";
      item.type = "button";
      item.dataset.modalTarget = "lesson-detail";
      item.innerHTML = `<i class="${lesson.color}"></i><div><strong>${lesson.title}</strong><span>${lesson.time} · ${lesson.detail}</span></div><span class="icon" data-icon="right"></span>`;
      item.addEventListener("click", closeDaySessions);
      daySessionsList.appendChild(item);
    });

    if (typeof hydrateIcons === "function") hydrateIcons();
    daySessionsModal.classList.add("open");
  }

  function renderRange() {
    if (view === "month") {
      rangeLabel.textContent = `Tháng ${weekStart.getMonth() + 1}, ${weekStart.getFullYear()}`;
      return;
    }

    const end = addDays(weekStart, 6);
    rangeLabel.textContent = `${formatShort(weekStart)} - ${formatShort(end)}/${end.getFullYear()}`;
  }

  function buildLessonButton(lesson, className) {
    const button = document.createElement("button");
    button.className = `${className} ${lesson.color}`;
    button.type = "button";
    button.dataset.modalTarget = "lesson-detail";
    button.innerHTML = className === "student-cal-event"
      ? `<strong>${lesson.title}</strong><span>${lesson.time}</span><small>${lesson.detail}</small>`
      : `${lesson.time.split(" - ")[0]} · ${lesson.title}`;
    return button;
  }

  function renderWeek() {
    grid.innerHTML = '<div class="student-cal-time-head"></div>';
    const highlightedDay = 0;

    dayNames.forEach((name, index) => {
      const date = addDays(weekStart, index);
      const header = document.createElement("div");
      header.className = `student-cal-day-head${index === highlightedDay ? " is-highlighted" : ""}`;
      header.style.gridColumn = index + 2;
      header.innerHTML = `<span>${name}</span><strong>${pad(date.getDate())}</strong>`;
      grid.appendChild(header);
    });

    for (let day = 0; day < 7; day += 1) {
      const column = document.createElement("div");
      column.className = `student-cal-day-column${day === highlightedDay ? " is-highlighted" : ""}`;
      column.style.gridColumn = day + 2;

      lessons.filter((lesson) => lesson.day === day).forEach((lesson) => {
        const event = buildLessonButton(lesson, "student-cal-event");
        event.style.top = `${(lesson.start - startHour) * hourHeight + 2}px`;
        event.style.height = `${Math.max(38, (lesson.end - lesson.start) * hourHeight - 4)}px`;
        column.appendChild(event);
      });

      grid.appendChild(column);
    }

    const gutter = document.createElement("div");
    gutter.className = "student-cal-time-gutter";
    for (let hour = startHour; hour <= endHour; hour += 1) {
      const label = document.createElement("span");
      label.style.top = `${(hour - startHour) * hourHeight}px`;
      label.textContent = `${pad(hour)}:00`;
      gutter.appendChild(label);
    }
    grid.appendChild(gutter);
    renderRange();
  }

  function renderMonth() {
    const year = weekStart.getFullYear();
    const month = weekStart.getMonth();
    const first = new Date(year, month, 1);
    const start = addDays(first, -first.getDay());
    monthGrid.innerHTML = "";

    monthWeekdays.forEach((name) => {
      const heading = document.createElement("div");
      heading.className = "student-month-weekday";
      heading.textContent = name;
      monthGrid.appendChild(heading);
    });

    for (let index = 0; index < 42; index += 1) {
      const date = addDays(start, index);
      const cell = document.createElement("div");
      const inMonth = date.getMonth() === month;
      cell.className = `student-month-day${inMonth ? "" : " muted"}${sameDay(date, baseWeek) ? " is-highlighted" : ""}`;
      cell.innerHTML = `<strong>${date.getDate()}</strong>`;

      if (inMonth) {
        const mondayIndex = (date.getDay() + 6) % 7;
        const dayLessons = lessons.filter((lesson) => lesson.day === mondayIndex);

        if (dayLessons.length) {
          const dots = document.createElement("span");
          dots.className = "student-month-dots";
          dayLessons.forEach((lesson) => {
            const dot = document.createElement("i");
            dot.className = `student-month-dot ${lesson.color}`;
            dot.title = `${lesson.title} · ${lesson.time}`;
            dots.appendChild(dot);
          });
          cell.appendChild(dots);
          cell.classList.add("has-events");
          cell.tabIndex = 0;
          cell.setAttribute("role", "button");
          cell.addEventListener("click", () => openDaySessions(date, dayLessons));
          cell.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              openDaySessions(date, dayLessons);
            }
          });
        }
      }

      monthGrid.appendChild(cell);
    }
    renderRange();
  }

  function switchView(nextView) {
    view = nextView;
    weekPanel.hidden = view !== "week";
    monthPanel.hidden = view !== "month";
    legend.hidden = view !== "week";
    document.querySelectorAll("[data-calendar-view]").forEach((button) => {
      button.classList.toggle("active", button.dataset.calendarView === view);
    });
    if (view === "week") renderWeek();
    else renderMonth();
  }

  document.querySelectorAll("[data-calendar-view]").forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.calendarView));
  });

  document.querySelector("[data-calendar-prev]").addEventListener("click", () => {
    weekStart = addDays(weekStart, view === "week" ? -7 : -28);
    if (view === "week") renderWeek();
    else renderMonth();
  });

  document.querySelector("[data-calendar-next]").addEventListener("click", () => {
    weekStart = addDays(weekStart, view === "week" ? 7 : 28);
    if (view === "week") renderWeek();
    else renderMonth();
  });

  document.querySelector("[data-calendar-today]").addEventListener("click", () => {
    weekStart = new Date(baseWeek);
    if (view === "week") renderWeek();
    else renderMonth();
  });

  document.querySelector("[data-close-day-sessions]")?.addEventListener("click", closeDaySessions);
  daySessionsModal?.addEventListener("click", (event) => {
    if (event.target === daySessionsModal) closeDaySessions();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeDaySessions();
  });

  renderWeek();
  requestAnimationFrame(() => {
    weekPanel.scrollTop = (15 - startHour) * hourHeight;
  });
})();
