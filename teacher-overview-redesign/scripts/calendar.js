var HOUR_H = 44;
    var START = 0;
    var END = 23;
    var now = new Date();
    var NOW_MIN = now.getHours() * 60 + now.getMinutes();
    var NOW_LABEL = pad2(now.getHours()) + ":" + pad2(now.getMinutes());
    var NOW_HOUR = now.getHours();
    var TODAY = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    function pad2(n) { return n < 10 ? "0" + n : "" + n; }

    function isEventDimmed(className) {
      return window.selectedClassFilter && className !== window.selectedClassFilter;
    }
    window.applyClassFilter = function applyClassFilter() {
      document.querySelectorAll(".cal-event").forEach(function (el) {
        el.classList.toggle("dimmed", isEventDimmed(el.getAttribute("data-class")));
      });
      document.querySelectorAll(".up-item").forEach(function (el) {
        el.classList.toggle("dimmed", isEventDimmed(el.getAttribute("data-class")));
      });
      document.querySelectorAll(".mini-dot").forEach(function (el) {
        el.classList.toggle("dimmed", isEventDimmed(el.getAttribute("data-class")));
      });
      document.querySelectorAll(".day-sess-item").forEach(function (el) {
        el.classList.toggle("dimmed", isEventDimmed(el.getAttribute("data-class")));
      });
    }

    var CALENDAR_YEAR = 2026;
    var SCHEDULE_START = new Date(2026, 5, 8);
    var SCHEDULE_END = new Date(2026, 7, 15);
    SCHEDULE_START.setHours(0, 0, 0, 0);
    SCHEDULE_END.setHours(23, 59, 59, 999);

    var DOW_NAMES = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];
    var DOW_FULL = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];

    var weekTemplate = [
      [
        { title: "Toán 9A", time: "08:00 – 10:00", room: "Phòng 201", start: 8, end: 10, cls: "ev-green" },
        { title: "Toán 10B", time: "19:00 – 21:00", room: "Phòng 101", start: 19, end: 21, cls: "ev-blue" }
      ],
      [
        { title: "Toán 10A", time: "14:00 – 16:00", room: "Phòng 203", start: 14, end: 16, cls: "ev-violet" },
        { title: "Toán 11A", time: "18:00 – 20:00", room: "Phòng 202", start: 18, end: 20, cls: "ev-amber" }
      ],
      [
        { title: "Toán 9A", time: "08:00 – 10:00", room: "Phòng 201", start: 8, end: 10, cls: "ev-green" },
        { title: "Toán 10A", time: "14:00 – 16:00", room: "Phòng 203", start: 14, end: 16, cls: "ev-violet" },
        { title: "Toán 10B", time: "19:00 – 21:00", room: "Phòng 101", start: 19, end: 21, cls: "ev-blue" }
      ],
      [
        { title: "Toán 11A", time: "18:00 – 20:00", room: "Phòng 202", start: 18, end: 20, cls: "ev-amber" }
      ],
      [
        { title: "Toán 9A", time: "08:00 – 10:00", room: "Phòng 201", start: 8, end: 10, cls: "ev-green" },
        { title: "Toán 10B", time: "19:00 – 21:00", room: "Phòng 101", start: 19, end: 21, cls: "ev-blue" }
      ],
      [
        { title: "Toán 12", time: "09:00 – 11:00", room: "Phòng 301", start: 9, end: 11, cls: "ev-rose" }
      ],
      [
        { title: "Toán 10A", time: "14:00 – 16:00", room: "Phòng 203", start: 14, end: 16, cls: "ev-violet" }
      ]
    ];

    function getWeekStart(d) {
      var result = new Date(d);
      var offset = (result.getDay() + 6) % 7;
      result.setDate(result.getDate() - offset);
      result.setHours(0, 0, 0, 0);
      return result;
    }

    function sameDate(a, b) {
      return a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate();
    }

    function toDateParts(d) {
      return { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
    }

    function formatDayLabel(date) {
      var d = new Date(date.year, date.month - 1, date.day);
      return DOW_FULL[d.getDay()] + ", " + pad2(date.day) + "/" + pad2(date.month) + "/2026";
    }

    function formatRangeDate(d) {
      return pad2(d.getDate()) + "/" + pad2(d.getMonth() + 1);
    }

    function eventKey(ev) {
      return ev.date.year + "-" + ev.date.month + "-" + ev.date.day + "-" + ev.title + "-" + ev.start;
    }

    function generateAllEvents() {
      var all = [];
      var cursor = new Date(SCHEDULE_START);
      while (cursor <= SCHEDULE_END) {
        var weekday = (cursor.getDay() + 6) % 7;
        var templates = weekTemplate[weekday] || [];
        var parts = toDateParts(cursor);
        templates.forEach(function (tpl) {
          all.push(Object.assign({}, tpl, {
            date: parts,
            day: weekday
          }));
        });
        cursor.setDate(cursor.getDate() + 1);
      }
      return all;
    }

    var allEvents = generateAllEvents();
    var days = [];
    var events = [];
    var todayIndex = 0;
    var currentWeekStart = getWeekStart(TODAY);

    var miniCalMonth = TODAY.getMonth() + 1;
    var miniCalYear = TODAY.getFullYear();
    var todayDateParts = toDateParts(TODAY);

    function eventCalendarDate(ev) {
      return ev.date || null;
    }

    function getEventsOnDate(year, month, day) {
      return allEvents.filter(function (ev) {
        var dt = eventCalendarDate(ev);
        return dt && dt.year === year && dt.month === month && dt.day === day;
      });
    }

    function buildWeekDays(weekStart) {
      var arr = [];
      for (var i = 0; i < 7; i++) {
        var d = new Date(weekStart);
        d.setDate(d.getDate() + i);
        arr.push({
          dow: DOW_NAMES[i],
          date: pad2(d.getDate()) + "/" + pad2(d.getMonth() + 1),
          today: sameDate(d, TODAY),
          fullDate: d
        });
      }
      return arr;
    }

    function getWeekEvents(weekStart) {
      var weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);
      return allEvents.filter(function (ev) {
        var d = new Date(ev.date.year, ev.date.month - 1, ev.date.day);
        return d >= weekStart && d <= weekEnd;
      }).map(function (ev) {
        var d = new Date(ev.date.year, ev.date.month - 1, ev.date.day);
        return Object.assign({}, ev, { day: (d.getDay() + 6) % 7 });
      });
    }

    function clampWeekStart(ws) {
      var minStart = getWeekStart(SCHEDULE_START);
      var maxStart = getWeekStart(SCHEDULE_END);
      if (ws < minStart) return new Date(minStart);
      if (ws > maxStart) return new Date(maxStart);
      return ws;
    }

    function updateDateRangeLabel() {
      var end = new Date(currentWeekStart);
      end.setDate(end.getDate() + 6);
      var el = document.getElementById("calDateRange");
      el.textContent = formatRangeDate(currentWeekStart) + " - " + formatRangeDate(end) + "/" + end.getFullYear();
    }

    function getBarColor(cls) {
      var map = {
        "ev-green": "var(--green)",
        "ev-violet": "var(--violet)",
        "ev-amber": "var(--amber)",
        "ev-blue": "var(--blue)",
        "ev-rose": "var(--rose)"
      };
      return map[cls] || "var(--accent)";
    }

    function eventDateTime(ev) {
      return new Date(ev.date.year, ev.date.month - 1, ev.date.day, ev.start, 0, 0, 0);
    }

    function getUpcomingWhenLabel(ev) {
      var d = new Date(ev.date.year, ev.date.month - 1, ev.date.day);
      d.setHours(0, 0, 0, 0);
      if (sameDate(d, TODAY)) {
        return { primary: "Hôm nay", secondary: DOW_FULL[d.getDay()] };
      }
      var tomorrow = new Date(TODAY);
      tomorrow.setDate(tomorrow.getDate() + 1);
      if (sameDate(d, tomorrow)) {
        return { primary: "Ngày mai", secondary: DOW_FULL[d.getDay()] };
      }
      return {
        primary: pad2(ev.date.day) + "/" + pad2(ev.date.month),
        secondary: DOW_FULL[d.getDay()]
      };
    }

    function renderUpcomingList() {
      var list = document.querySelector(".up-list");
      if (!list) return;
      var nowMs = now.getTime();
      var upcoming = allEvents.filter(function (ev) {
        return eventDateTime(ev).getTime() >= nowMs;
      }).sort(function (a, b) {
        return eventDateTime(a) - eventDateTime(b);
      }).slice(0, 3);

      list.innerHTML = "";
      if (!upcoming.length) {
        list.innerHTML = '<div class="lm-empty-hint" style="padding:12px 0">Không còn buổi học sắp tới.</div>';
        return;
      }
      upcoming.forEach(function (ev) {
        var when = getUpcomingWhenLabel(ev);
        var item = document.createElement("div");
        item.className = "up-item" + (isEventDimmed(ev.title) ? " dimmed" : "");
        item.setAttribute("data-class", ev.title);
        item.innerHTML =
          '<span class="up-bar" style="background:' + getBarColor(ev.cls) + '"></span>' +
          '<div class="up-body"><b>' + ev.title + '</b><small>' + ev.time + " · " + getEventPlaceLabel(ev) + '</small></div>' +
          '<div class="up-when"><b>' + when.primary + '</b>' + when.secondary + '</div>';
        item.addEventListener("click", function () { openLessonModal(ev); });
        list.appendChild(item);
      });
    }

    function isDateInSchedule(year, month, day) {
      var dt = new Date(year, month - 1, day);
      dt.setHours(0, 0, 0, 0);
      return dt >= SCHEDULE_START && dt <= SCHEDULE_END;
    }

    function getEventDotColor(cls) {
      var map = {
        "ev-green": "var(--green)",
        "ev-violet": "var(--violet)",
        "ev-amber": "var(--amber)",
        "ev-blue": "var(--blue)",
        "ev-rose": "var(--rose)"
      };
      return map[cls] || "var(--accent)";
    }

    function updateMonthRangeLabel() {
      document.getElementById("calDateRange").textContent = "Tháng " + miniCalMonth + ", " + miniCalYear;
    }

    function renderMonthCalendar(year, month) {
      miniCalYear = year;
      miniCalMonth = month;
      if (calViewMode === "month") updateMonthRangeLabel();
      var grid = document.getElementById("mainMonthGrid");
      if (!grid) return;
      grid.innerHTML = "";
      ["CN", "Th2", "Th3", "Th4", "Th5", "Th6", "Th7"].forEach(function (label) {
        var wk = document.createElement("span");
        wk.className = "wk";
        wk.textContent = label;
        grid.appendChild(wk);
      });

      var first = new Date(year, month - 1, 1);
      var startOffset = first.getDay();
      var daysInMonth = new Date(year, month, 0).getDate();
      var prevMonthDays = new Date(year, month - 1, 0).getDate();
      var totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7;

      for (var i = 0; i < totalCells; i++) {
        var cellYear = year;
        var cellMonth = month;
        var cellDay;
        var muted = false;

        if (i < startOffset) {
          cellDay = prevMonthDays - startOffset + i + 1;
          cellMonth = month - 1;
          if (cellMonth < 1) { cellMonth = 12; cellYear = year - 1; }
          muted = true;
        } else if (i >= startOffset + daysInMonth) {
          cellDay = i - startOffset - daysInMonth + 1;
          cellMonth = month + 1;
          if (cellMonth > 12) { cellMonth = 1; cellYear = year + 1; }
          muted = true;
        } else {
          cellDay = i - startOffset + 1;
        }

        var dayEl = document.createElement("div");
        dayEl.className = "mini-day" + (muted ? " muted" : "");
        if (!muted &&
            cellDay === todayDateParts.day &&
            cellMonth === todayDateParts.month &&
            cellYear === todayDateParts.year) {
          dayEl.classList.add("today");
        }

        var num = document.createElement("span");
        num.className = "mini-day-num";
        num.textContent = cellDay;
        dayEl.appendChild(num);

        var dayEvents = isDateInSchedule(cellYear, cellMonth, cellDay)
          ? getEventsOnDate(cellYear, cellMonth, cellDay) : [];
        if (dayEvents.length) {
          var dots = document.createElement("span");
          dots.className = "mini-dots";
          dayEvents.forEach(function (ev) {
            var dot = document.createElement("span");
            dot.className = "mini-dot" + (isEventDimmed(ev.title) ? " dimmed" : "");
            dot.setAttribute("data-class", ev.title);
            dot.style.background = getEventDotColor(ev.cls);
            dot.title = ev.title;
            dots.appendChild(dot);
          });
          dayEl.appendChild(dots);
          dayEl.classList.add("has-events");
          (function (y, m, d) {
            dayEl.addEventListener("click", function () {
              openDaySessionsModal(y, m, d);
            });
          })(cellYear, cellMonth, cellDay);
        }

        grid.appendChild(dayEl);
      }
    }

    var daySessionsModal = document.getElementById("daySessionsModal");

    function openDaySessionsModal(year, month, day) {
      var dayEvents = getEventsOnDate(year, month, day);
      if (!dayEvents.length) return;
      document.getElementById("daySessTitle").textContent = formatDayLabel({ year: year, month: month, day: day });
      var list = document.getElementById("daySessList");
      list.innerHTML = "";
      dayEvents.sort(function (a, b) { return a.start - b.start; }).forEach(function (ev) {
        var item = document.createElement("div");
        item.className = "day-sess-item" + (isEventDimmed(ev.title) ? " dimmed" : "");
        item.setAttribute("data-class", ev.title);
        item.innerHTML =
          '<span class="day-sess-bar" style="background:' + getBarColor(ev.cls) + '"></span>' +
          '<div class="day-sess-body"><b>' + ev.title + '</b><small>' + ev.time + " · " + getEventPlaceLabel(ev) + '</small></div>';
        item.addEventListener("click", function () {
          closeDaySessionsModal();
          openLessonModal(ev);
        });
        list.appendChild(item);
      });
      daySessionsModal.classList.add("open");
      daySessionsModal.setAttribute("aria-hidden", "false");
    }

    function closeDaySessionsModal() {
      daySessionsModal.classList.remove("open");
      daySessionsModal.setAttribute("aria-hidden", "true");
    }

    var calViewMode = "week";

    function switchCalView(mode) {
      calViewMode = mode;
      document.getElementById("calWeekPanel").hidden = mode !== "week";
      document.getElementById("calMonthPanel").hidden = mode !== "month";
      document.getElementById("calLegend").hidden = mode !== "week";
      document.getElementById("btnViewWeek").classList.toggle("active", mode === "week");
      document.getElementById("btnViewMonth").classList.toggle("active", mode === "month");
      if (mode === "month") {
        renderMonthCalendar(miniCalYear, miniCalMonth);
        updateMonthRangeLabel();
      } else {
        updateDateRangeLabel();
      }
    }

    function updateWeekStatsCard() {
      var weekEv = getWeekEvents(currentWeekStart);
      var total = weekEv.length;
      var classMap = {};
      weekEv.forEach(function (ev) { classMap[ev.title] = true; });
      var classNames = Object.keys(classMap);
      var classCount = classNames.length;

      var studentTotal = 0;
      var attendSum = 0;
      var attendCount = 0;
      classNames.forEach(function (title) {
        var tpl = typeof lessonTemplates !== "undefined" ? lessonTemplates[title] : null;
        if (tpl && tpl.attendance) {
          var parts = tpl.attendance.split("/");
          if (parts.length === 2) {
            studentTotal += parseInt(parts[1], 10) || 0;
            var present = parseInt(parts[0], 10) || 0;
            var cap = parseInt(parts[1], 10) || 1;
            attendSum += (present / cap) * 100;
            attendCount++;
          }
        }
      });

      var taught = weekEv.filter(function (ev) {
        var d = new Date(ev.date.year, ev.date.month - 1, ev.date.day);
        d.setHours(0, 0, 0, 0);
        return d < TODAY;
      }).length;
      var remaining = Math.max(0, total - taught);
      var pct = total ? Math.round((taught / total) * 100) : 0;
      var attendPct = attendCount ? Math.round(attendSum / attendCount) : 96;

      document.getElementById("wsSessions").textContent = total;
      document.getElementById("wsClasses").textContent = classCount;
      document.getElementById("wsStudents").textContent = studentTotal || 0;
      document.getElementById("wsAttend").textContent = attendPct + "%";
      document.getElementById("wsTaught").textContent = taught;
      document.getElementById("wsTotal").textContent = total;
      document.getElementById("wsProgressFill").style.width = pct + "%";
      document.getElementById("wsTaughtLabel").textContent = taught + " buổi đã dạy";
      document.getElementById("wsRemaining").textContent = "Còn " + remaining + " buổi";
    }

    function topPx(hour) {
      return (hour - START) * HOUR_H;
    }
    function heightPx(start, end) {
      return (end - start) * HOUR_H - 4;
    }

    var grid = document.getElementById("calGrid");
    var calScroll = document.querySelector(".cal-scroll");

    grid.innerHTML = '<div class="cal-time-head"></div>';
    for (var hi = 0; hi < 7; hi++) {
      grid.innerHTML += '<div class="cal-day-head" style="grid-column:' + (hi + 2) + '">' +
        '<span class="dow"></span><span class="date"></span></div>';
    }

    for (var col = 0; col < 7; col++) {
      grid.innerHTML += '<div class="cal-day-col" data-day="' + col + '" style="grid-column:' + (col + 2) + '"></div>';
    }

    grid.innerHTML += '<div class="cal-now-overlay"></div>';
    grid.innerHTML += '<div class="cal-time-gutter" id="calTimeGutter"></div>';

    function renderWeekEvents() {
      grid.querySelectorAll(".cal-event").forEach(function (el) { el.remove(); });
      var cols = grid.querySelectorAll(".cal-day-col");
      events.forEach(function (ev) {
        var col = cols[ev.day];
        if (!col) return;
        var el = document.createElement("div");
        el.className = "cal-event " + ev.cls + (isEventDimmed(ev.title) ? " dimmed" : "");
        el.setAttribute("data-class", ev.title);
        el.setAttribute("data-event-key", eventKey(ev));
        el.style.top = topPx(ev.start) + 2 + "px";
        el.style.height = heightPx(ev.start, ev.end) + "px";
        el.innerHTML = "<b>" + ev.title + "</b><span>" + ev.time + "</span><span>" + getEventPlaceHtml(ev) + "</span>";
        el.addEventListener("click", function () { openLessonModal(ev); });
        col.appendChild(el);
      });
    }

    function renderWeekCalendar() {
      currentWeekStart = clampWeekStart(currentWeekStart);
      days = buildWeekDays(currentWeekStart);
      todayIndex = -1;
      days.forEach(function (d, i) { if (d.today) todayIndex = i; });
      events = getWeekEvents(currentWeekStart);

      var heads = grid.querySelectorAll(".cal-day-head");
      days.forEach(function (d, i) {
        if (!heads[i]) return;
        heads[i].className = "cal-day-head" + (d.today ? " today" : "");
        heads[i].querySelector(".dow").textContent = d.dow;
        heads[i].querySelector(".date").textContent = d.date.split("/")[0];
      });

      var cols = grid.querySelectorAll(".cal-day-col");
      cols.forEach(function (col, i) {
        col.classList.toggle("today", !!(days[i] && days[i].today));
      });

      renderWeekEvents();
      updateDateRangeLabel();
      renderUpcomingList();
      updateWeekStatsCard();
    }

    var nowTop = (NOW_MIN / 60) * HOUR_H;
    var nowOverlay = grid.querySelector(".cal-now-overlay");
    if (nowOverlay) {
      var line = document.createElement("div");
      line.className = "cal-now-line";
      line.style.top = nowTop + "px";
      nowOverlay.appendChild(line);
    }

    var timeGutter = document.getElementById("calTimeGutter");
    for (var h = 1; h <= END; h++) {
      var tick = document.createElement("span");
      tick.className = "t-label";
      tick.style.top = (h * HOUR_H) + "px";
      tick.textContent = pad2(h) + ":00";
      timeGutter.appendChild(tick);
    }

    var nowBadge = document.createElement("span");
    nowBadge.className = "cal-now-badge";
    nowBadge.style.top = nowTop + "px";
    nowBadge.textContent = NOW_LABEL;
    timeGutter.appendChild(nowBadge);

    var lessonTemplates = {
      "Toán 9A": {
        topic: "Đạo hàm và ứng dụng cơ bản",
        session: 12,
        attendance: "28/30",
        status: "Sắp diễn ra",
        materials: 8,
        desc: [
          "Buổi học tập trung vào định nghĩa đạo hàm, công thức tính đạo hàm của các hàm số thường gặp và ứng dụng trong bài toán thực tế.",
          "Học sinh thực hành tính đạo hàm, tìm tiếp tuyến và giải bài toán cực trị đơn giản. Cuối buổi có 15 phút hỏi đáp và giao bài tập về nhà.",
          "Chuẩn bị cho kiểm tra 15 phút vào buổi học tuần sau."
        ],
        tags: ["Đạo hàm", "Tiếp tuyến", "Cực trị", "Ứng dụng"],
        homework: [
          { title: "Bài tập SGK trang 45 – 48", due: "Hạn nộp: 22:00, 30/06/2026" },
          { title: "Tìm tiếp tuyến hàm số cho sẵn", due: "Hạn nộp: 22:00, 01/07/2026" },
          { title: "Ôn tập công thức đạo hàm", due: "Hạn nộp: 08:00, 02/07/2026" }
        ],
        tests: [
          { title: "Đạo hàm cơ bản", meta: "Trắc nghiệm – 15 phút" },
          { title: "Ứng dụng đạo hàm", meta: "Tự luận – 20 phút" },
          { title: "Kiểm tra giữa kỳ", meta: "Trắc nghiệm + Tự luận – 45 phút" }
        ],
        comments: [
          { user: "Phạm Tuấn", init: "PT", color: "#e85d75", time: "20:30, 26/06/2026", text: "Cả lớp ơi, ai làm xong bài 3 SGK chưa? Em bí chỗ tìm điểm cực đại rồi 😅", reply: false },
          { user: "Lê Thu Hà", init: "TH", color: "#3b82f6", time: "20:45, 26/06/2026", text: "Mình làm rồi! Nhớ đặt y' = 0 rồi giải phương trình là ra. Thử lại bài 3b nhé Tuấn.", reply: true },
          { user: "Nguyễn Minh Anh", init: "MA", color: "#6c8cff", time: "09:15, 27/06/2026", text: "Cô ơi em chưa hiểu cách tìm tiếp tuyến ạ?", reply: true },
          { user: "Cô Nguyễn Lan", init: "NL", color: "#2f8f6b", time: "10:02, 27/06/2026", text: "Em xem lại ví dụ mẫu buổi 11 và làm thêm bài 3, 4 SGK. Cô sẽ hướng dẫn lại đầu buổi mai nhé.", teacher: true, reply: true },
          { user: "Võ Đăng Khoa", init: "VK", color: "#d98a2b", time: "11:20, 27/06/2026", text: "Slide buổi này cô upload sớm được không ạ? Em muốn xem trước phần cực trị.", reply: false },
          { user: "Cô Nguyễn Lan", init: "NL", color: "#2f8f6b", time: "11:48, 27/06/2026", text: "Cô đã đính kèm slide và video trong mục Tài liệu rồi nhé. Các em ôn kỹ phần đạo hàm hàm hợp trước buổi học.", teacher: true, reply: true },
          { user: "Trần Bảo Ngọc", init: "BN", color: "#7d5fd1", time: "16:05, 27/06/2026", text: "Em xem video hướng dẫn giải rồi, thấy dễ hiểu hơn nhiều! Cảm ơn cô 🙌", reply: true },
          { user: "Hoàng Minh Đức", init: "MD", color: "#16a34a", time: "18:22, 27/06/2026", text: "Mọi người nhớ mang máy tính cầm tay buổi mai nhé, có phần kiểm tra 15 phút đó!", reply: false }
        ],
        media: [
          { type: "image", label: "Đồ thị hàm số", color: "#6c8cff" },
          { type: "image", label: "Tiếp tuyến", color: "#2f8f6b" },
          { type: "video", label: "Video bài giảng", color: "#7d5fd1" },
          { type: "image", label: "Ví dụ mẫu", color: "#d98a2b" },
          { type: "image", label: "Bài tập SGK", color: "#e85d75" },
          { type: "video", label: "Hướng dẫn giải", color: "#3b82f6" }
        ],
        docs: [
          { name: "Slide bài giảng – Đạo hàm.pptx", ext: "pptx", size: "2.4 MB" },
          { name: "Bài tập về nhà buổi 12.docx", ext: "docx", size: "856 KB" },
          { name: "Đề kiểm tra 15 phút.pdf", ext: "pdf", size: "412 KB" },
          { name: "Bảng công thức đạo hàm.xlsx", ext: "xlsx", size: "128 KB" }
        ],
        links: [
          { title: "Khan Academy – Đạo hàm", url: "https://vi.khanacademy.org/math/calculus" },
          { title: "SGK Toán 11 – Chương 2", url: "https://sachgiaokhoa.vn" },
          { title: "Desmos – Vẽ đồ thị hàm số", url: "https://www.desmos.com/calculator" }
        ]
      },
      "Toán 10A": {
        topic: "Hệ phương trình bậc nhất hai ẩn",
        session: 8,
        attendance: "26/28",
        format: "online",
        onlineLink: "https://meet.google.com/abc-defg-hij",
        status: "Sắp diễn ra",
        materials: 6,
        desc: [
          "Ôn lại phương pháp thế, phương pháp cộng đại số để giải hệ phương trình bậc nhất hai ẩn.",
          "Thực hành giải bài toán lời văn dẫn đến hệ phương trình trong các tình huống thực tế."
        ],
        tags: ["Hệ PT", "Phương pháp thế", "Bài toán lời văn"],
        homework: [
          { title: "Giải 5 hệ PT bậc nhất", due: "Hạn nộp: 22:00, 29/06/2026" },
          { title: "Bài tập nâng cao – hệ PT", due: "Hạn nộp: 22:00, 30/06/2026" }
        ],
        tests: [
          { title: "Hệ phương trình cơ bản", meta: "Trắc nghiệm – 15 phút" },
          { title: "Bài toán ứng dụng", meta: "Tự luận – 25 phút" }
        ],
        comments: [
          { user: "Trần Hoàng", init: "TH", color: "#d98a2b", time: "14:30, 26/06/2026", text: "Buổi học này có kiểm tra không ạ?", reply: false },
          { user: "Cô Nguyễn Lan", init: "NL", color: "#2f8f6b", time: "15:10, 26/06/2026", text: "Có em nhé, kiểm tra 15 phút cuối buổi. Em ôn lại phần phương pháp thế.", teacher: true, reply: true },
          { user: "Ngô Lan Chi", init: "LC", color: "#6c8cff", time: "16:40, 26/06/2026", text: "Em làm thử 3 hệ PT trong sách, thấy PP cộng đại số nhanh hơn PP thế nhiều!", reply: true },
          { user: "Bùi Quốc An", init: "QA", color: "#e85d75", time: "19:05, 26/06/2026", text: "Ai có bài toán lời văn mẫu không? Em muốn luyện thêm trước buổi mai.", reply: false },
          { user: "Lê Thảo My", init: "TM", color: "#7d5fd1", time: "19:18, 26/06/2026", text: "Có trong file docx mục Tài liệu nè, có 5 bài lời văn hay lắm!", reply: true },
          { user: "Cô Nguyễn Lan", init: "NL", color: "#2f8f6b", time: "20:00, 26/06/2026", text: "Tốt lắm! Các em làm thêm bài nâng cao và thảo luận thêm ở đây nếu gặp khó nhé.", teacher: true, reply: true }
        ],
        media: [
          { type: "image", label: "Minh họa hệ PT", color: "#6c8cff" },
          { type: "video", label: "PP thế & cộng", color: "#7d5fd1" },
          { type: "image", label: "Bài toán lời văn", color: "#2f8f6b" }
        ],
        docs: [
          { name: "Bài giảng hệ PT.pptx", ext: "pptx", size: "1.8 MB" },
          { name: "Bài tập hệ PT.docx", ext: "docx", size: "620 KB" }
        ],
        links: [
          { title: "Mathway – Giải hệ PT", url: "https://www.mathway.com" }
        ]
      },
      "Toán 10B": {
        topic: "Lượng giác – công thức cơ bản",
        session: 10,
        attendance: "27/29",
        status: "Sắp diễn ra",
        materials: 7,
        desc: [
          "Hệ thống lại các công thức lượng giác cơ bản, rút gọn biểu thức và chứng minh đẳng thức.",
          "Vận dụng công thức lượng giác trong bài toán tính toán góc và cạnh tam giác."
        ],
        tags: ["Lượng giác", "Công thức", "Tam giác"],
        homework: [
          { title: "Rút gọn biểu thức lượng giác", due: "Hạn nộp: 22:00, 29/06/2026" },
          { title: "Chứng minh đẳng thức – bài 1-5", due: "Hạn nộp: 22:00, 01/07/2026" }
        ],
        tests: [
          { title: "Công thức lượng giác", meta: "Trắc nghiệm – 15 phút" },
          { title: "Chứng minh đẳng thức", meta: "Tự luận – 20 phút" }
        ],
        comments: [
          { user: "Đặng Huyền", init: "DH", color: "#3b82f6", time: "13:20, 27/06/2026", text: "Cô ơi công thức sin(a+b) với sin(a-b) em hay nhầm dấu, có mẹo nào không ạ?", reply: false },
          { user: "Cô Nguyễn Lan", init: "NL", color: "#2f8f6b", time: "13:55, 27/06/2026", text: "Em nhớ: sin(a+b) = sin a cos b + cos a sin b — dấu cộng giữa hai góc thì dấu cộng giữa hai tích. Cô có bảng công thức trong Tài liệu.", teacher: true, reply: true },
          { user: "Phan Minh Quân", init: "MQ", color: "#d98a2b", time: "15:30, 27/06/2026", text: "Mình dùng GeoGebra vẽ đồ thị sin/cos xong thấy trực quan hơn hẳn, recommend cả lớp thử!", reply: true },
          { user: "Trương Ngọc Ánh", init: "NA", color: "#e85d75", time: "17:10, 27/06/2026", text: "Buổi mai có chứng minh đẳng thức không? Em hơi lo phần tự luận.", reply: true },
          { user: "Lê Văn Phúc", init: "VP", color: "#16a34a", time: "17:45, 27/06/2026", text: "Có video chứng minh đẳng thức trong mục Ảnh & video, xem 1 lần là hiểu luôn!", reply: true }
        ],
        media: [
          { type: "image", label: "Tam giác vuông", color: "#d98a2b" },
          { type: "image", label: "Công thức LG", color: "#6c8cff" },
          { type: "image", label: "Đồ thị sin", color: "#2f8f6b" },
          { type: "video", label: "Chứng minh đẳng thức", color: "#7d5fd1" }
        ],
        docs: [
          { name: "Công thức lượng giác.pdf", ext: "pdf", size: "540 KB" },
          { name: "Bài tập lượng giác.xlsx", ext: "xlsx", size: "96 KB" }
        ],
        links: [
          { title: "GeoGebra – Lượng giác", url: "https://www.geogebra.org" }
        ]
      },
      "Toán 11A": {
        topic: "Tích phân – nguyên hàm",
        session: 6,
        attendance: "24/26",
        status: "Sắp diễn ra",
        materials: 9,
        desc: [
          "Giới thiệu nguyên hàm, các dạng tích phân cơ bản và quy tắc tính tích phân.",
          "Áp dụng tích phân tính diện tích hình phẳng và thể tích khối tròn xoay."
        ],
        tags: ["Tích phân", "Nguyên hàm", "Diện tích"],
        homework: [
          { title: "Tính tích phân các hàm số cơ bản", due: "Hạn nộp: 22:00, 30/06/2026" }
        ],
        tests: [
          { title: "Nguyên hàm cơ bản", meta: "Trắc nghiệm – 15 phút" },
          { title: "Tích phân ứng dụng", meta: "Tự luận – 30 phút" }
        ],
        comments: [
          { user: "Nguyễn Thành Đạt", init: "TD", color: "#6c8cff", time: "08:40, 28/06/2026", text: "Cô ơi tích phân dạng u'/u có áp dụng cho mọi hàm số không ạ?", reply: false },
          { user: "Cô Nguyễn Lan", init: "NL", color: "#2f8f6b", time: "09:05, 28/06/2026", text: "Đúng em nhé, miễn là tử là đạo hàm của mẫu. Cô có bảng nguyên hàm trong Tài liệu, em in ra mang theo buổi học.", teacher: true, reply: true },
          { user: "Vũ Khánh Linh", init: "KL", color: "#7d5fd1", time: "10:30, 28/06/2026", text: "Nhóm em đã làm xong 8 bài tập tích phân cơ bản, ai cần đối chiếu đáp án inbox nhé!", reply: true },
          { user: "Trần Gia Huy", init: "GH", color: "#d98a2b", time: "12:15, 28/06/2026", text: "Phần tính diện tích hình phẳng khó quá, mong cô giải thêm ví dụ đầu buổi 🙏", reply: true },
          { user: "Cô Nguyễn Lan", init: "NL", color: "#2f8f6b", time: "12:40, 28/06/2026", text: "Cô sẽ dành 20 phút đầu buổi ôn lại và giải 2 bài mẫu diện tích. Các em xem trước slide nhé.", teacher: true, reply: true }
        ],
        media: [
          { type: "image", label: "Nguyên hàm", color: "#6c8cff" },
          { type: "video", label: "Tích phân cơ bản", color: "#7d5fd1" },
          { type: "image", label: "Diện tích", color: "#2f8f6b" }
        ],
        docs: [
          { name: "Bài giảng tích phân.pptx", ext: "pptx", size: "3.1 MB" },
          { name: "Bảng nguyên hàm.pdf", ext: "pdf", size: "780 KB" },
          { name: "Bài tập tích phân.docx", ext: "docx", size: "1.2 MB" }
        ],
        links: [
          { title: "Wolfram Alpha – Tích phân", url: "https://www.wolframalpha.com" },
          { title: "Symbolab – Calculator", url: "https://www.symbolab.com" }
        ]
      },
      "Toán 12": {
        topic: "Xác suất có điều kiện",
        session: 4,
        attendance: "22/24",
        status: "Sắp diễn ra",
        materials: 5,
        desc: [
          "Khái niệm xác suất có điều kiện, công thức Bayes và bài toán liên quan.",
          "Thực hành giải bài tập xác suất trong các tình huống thi THPT Quốc gia."
        ],
        tags: ["Xác suất", "Bayes", "THPT QG"],
        homework: [
          { title: "Bài tập xác suất có điều kiện", due: "Hạn nộp: 22:00, 02/07/2026" }
        ],
        tests: [
          { title: "Xác suất cơ bản", meta: "Trắc nghiệm – 15 phút" }
        ],
        comments: [
          { user: "Lê Hoàng Nam", init: "HN", color: "#3b82f6", time: "21:00, 27/06/2026", text: "Công thức Bayes em đọc mấy lần vẫn rối, có ai giải thích đơn giản được không?", reply: false },
          { user: "Phạm Thu Trang", init: "TT", color: "#e85d75", time: "21:25, 27/06/2026", text: "Mình nghĩ theo kiểu 'xác suất mới = xác suất cũ × điều kiện / tổng' là dễ nhớ nhất. Xem video trong Tài liệu nha!", reply: true },
          { user: "Cô Nguyễn Lan", init: "NL", color: "#2f8f6b", time: "22:10, 27/06/2026", text: "Trang giải thích đúng rồi. Các em làm thêm đề luyện THPT QG trong Tài liệu, buổi mai mình chữa bài nhé.", teacher: true, reply: true },
          { user: "Đỗ Minh Tuấn", init: "MT", color: "#16a34a", time: "07:50, 28/06/2026", text: "Em làm thử 5 câu đề luyện, được 4/5. Câu Bayes ngược vẫn hay sai 😅", reply: true },
          { user: "Nguyễn Bảo Châu", init: "BC", color: "#7d5fd1", time: "08:15, 28/06/2026", text: "Cả lớp cố lên, môn này ra thi nhiều lắm! Hẹn gặp mọi người buổi học chiều nay.", reply: false }
        ],
        media: [
          { type: "image", label: "Sơ đồ xác suất", color: "#e85d75" },
          { type: "video", label: "Công thức Bayes", color: "#7d5fd1" }
        ],
        docs: [
          { name: "Đề luyện THPT QG.pdf", ext: "pdf", size: "920 KB" },
          { name: "Bài tập xác suất.docx", ext: "docx", size: "445 KB" }
        ],
        links: [
          { title: "Violet – Đề thi thử", url: "https://violet.vn" }
        ]
      }
    };

    var studentNamePool = [
      "Nguyễn Minh Anh", "Phạm Tuấn", "Lê Thu Hà", "Võ Đăng Khoa", "Trần Bảo Ngọc",
      "Hoàng Minh Đức", "Đặng Huyền", "Phan Minh Quân", "Trương Ngọc Ánh", "Lê Văn Phúc",
      "Nguyễn Thành Đạt", "Vũ Khánh Linh", "Trần Gia Huy", "Lê Hoàng Nam", "Phạm Thu Trang",
      "Đỗ Minh Tuấn", "Nguyễn Bảo Châu", "Trần Hoàng", "Ngô Lan Chi", "Bùi Quốc An",
      "Lê Thảo My", "Phạm Đức Anh", "Hoàng Thùy Linh", "Võ Minh Khang", "Đinh Bảo Trân",
      "Lý Ngọc Hân", "Mai Gia Bảo", "Trịnh Quốc Huy", "Cao Thị Mai", "Nguyễn Quốc Bình"
    ];

    var currentAttStudents = [];
    var currentLessonSession = 1;
    var currentLessonClass = "";
    var currentLessonEvent = null;
    var currentDescBackup = "";
    var attendanceModal = document.getElementById("attendanceModal");

    function formatCheckInNow() {
      var n = new Date();
      return pad2(n.getHours()) + ":" + pad2(n.getMinutes()) + ", " + pad2(n.getDate()) + "/06/2026";
    }

    function cloneStudents(list) {
      return list.map(function (s) {
        return {
          name: s.name,
          sessionsAttended: s.sessionsAttended,
          present: s.present,
          late: s.late,
          checkIn: s.checkIn
        };
      });
    }

    function buildStudents(tpl) {
      if (tpl.students && tpl.students.length) {
        return cloneStudents(tpl.students);
      }
      var parts = tpl.attendance.split("/");
      var presentCount = parseInt(parts[0], 10) || 0;
      var total = parseInt(parts[1], 10) || 30;
      var session = tpl.session;
      var list = [];
      for (var i = 0; i < total; i++) {
        var isPresent = i < presentCount;
        var attended = isPresent
          ? Math.max(1, session - (i % 4 === 0 ? 0 : i % 3))
          : Math.max(0, session - 1 - (i % 2 === 0 ? 1 : 2));
        if (isPresent && attended >= session) attended = session - (i % 5 === 0 ? 0 : 1);
        list.push({
          name: studentNamePool[i] || ("Học sinh " + (i + 1)),
          sessionsAttended: attended,
          present: isPresent,
          late: isPresent && i === 5,
          checkIn: isPresent ? ("08:" + pad2(Math.min(3 + (i % 20) * 2, 55)) + ", 28/06/2026") : null
        });
      }
      return list;
    }

    function renderDescParagraphs(descEl, paragraphs) {
      descEl.innerHTML = paragraphs.map(function (p) {
        return "<p>" + p + "</p>";
      }).join("");
    }

    function getAttStatus(s) {
      if (!s.present) return "absent";
      if (s.late) return "late";
      return "present";
    }

    function setAttStatus(s, status) {
      if (status === "absent") {
        s.present = false;
        s.late = false;
        s.checkIn = null;
      } else if (status === "late") {
        s.present = true;
        s.late = true;
        if (!s.checkIn) s.checkIn = formatCheckInNow();
      } else {
        s.present = true;
        s.late = false;
        if (!s.checkIn) s.checkIn = formatCheckInNow();
      }
    }

    function formatAttRate(attended, session) {
      var pct = session > 0 ? Math.round((attended / session) * 100) : 0;
      return attended + '/' + session + '<span class="att-rate-pct">' + pct + '%</span>';
    }

    function attStatusSelectHtml(status) {
      return '<select class="att-status-select" data-status="' + status + '" aria-label="Trạng thái điểm danh">' +
        '<option value="present"' + (status === "present" ? " selected" : "") + '>Có mặt</option>' +
        '<option value="late"' + (status === "late" ? " selected" : "") + '>Đi muộn</option>' +
        '<option value="absent"' + (status === "absent" ? " selected" : "") + '>Vắng</option>' +
        '</select>';
    }

    function updateAttendMeta() {
      var present = currentAttStudents.filter(function (s) { return s.present; }).length;
      var total = currentAttStudents.length;
      document.getElementById("lmMetaAttend").textContent = "Điểm danh: " + present + "/" + total + " học sinh";
      document.getElementById("attPresentCount").textContent = present;
      document.getElementById("attTotalCount").textContent = total;
    }

    function renderAttendanceTable() {
      var tbody = document.getElementById("attList");
      tbody.innerHTML = "";
      currentAttStudents.forEach(function (s, idx) {
        var tr = document.createElement("tr");
        tr.setAttribute("data-idx", idx);
        var status = getAttStatus(s);
        tr.innerHTML =
          '<td class="col-stt">' + (idx + 1) + '</td>' +
          '<td class="col-name">' + s.name + '</td>' +
          '<td class="col-attend">' + attStatusSelectHtml(status) + '</td>' +
          '<td class="col-rate"><span class="att-rate">' + formatAttRate(s.sessionsAttended, currentLessonSession) + '</span></td>' +
          '<td class="col-time att-time-cell">' + (s.checkIn || "—") + '</td>';
        tbody.appendChild(tr);
      });
      updateAttendMeta();
    }

    function openAttendanceModal() {
      document.getElementById("attClassName").textContent = currentLessonClass;
      document.getElementById("attSessionNum").textContent = currentLessonSession;
      renderAttendanceTable();
      attendanceModal.classList.add("open");
      attendanceModal.setAttribute("aria-hidden", "false");
    }

    function closeAttendanceModal() {
      attendanceModal.classList.remove("open");
      attendanceModal.setAttribute("aria-hidden", "true");
    }

    function getLessonSubject(className) {
      var tpl = lessonTemplates[className];
      if (tpl && tpl.subject) return tpl.subject;
      return (className.split(/\s+/)[0] || className);
    }

    function getLessonFormat(className) {
      var tpl = lessonTemplates[className];
      return {
        format: (tpl && tpl.format) || "offline",
        onlineLink: (tpl && tpl.onlineLink) || "",
        location: (tpl && tpl.location) || ""
      };
    }

    function isLessonOnline(className) {
      return getLessonFormat(className).format === "online";
    }

    function getEventPlaceLabel(ev) {
      var fmt = getLessonFormat(ev.title);
      if (fmt.format === "online") return "Online";
      return fmt.location || ev.room;
    }

    function getEventPlaceHtml(ev) {
      if (isLessonOnline(ev.title)) {
        return '<span class="cal-ev-online"><span class="cal-ev-online-dot" aria-hidden="true"></span>Online</span>';
      }
      return getEventPlaceLabel(ev);
    }

    function setEventPlaceSpan(spanEl, ev) {
      if (isLessonOnline(ev.title)) {
        spanEl.innerHTML = getEventPlaceHtml(ev);
      } else {
        spanEl.textContent = getEventPlaceLabel(ev);
      }
    }

    function refreshEventPlaceLabels(className) {
      document.querySelectorAll(".cal-event").forEach(function (el) {
        var key = el.getAttribute("data-event-key");
        var ev = events.find(function (e) { return eventKey(e) === key; });
        if (!ev) return;
        if (className && ev.title !== className) return;
        var spans = el.querySelectorAll("span");
        if (spans.length >= 2) setEventPlaceSpan(spans[1], ev);
      });
      renderUpcomingList();
    }

    function normalizeOnlineLink(value) {
      var link = (value || "").trim();
      if (!link) return "";
      if (!/^https?:\/\//i.test(link)) link = "https://" + link;
      return link;
    }

    function updateFormatDetailField() {
      var isOnline = document.getElementById("lmFormatTypeSelect").value === "online";
      var label = document.getElementById("lmFormatDetailLabel");
      var input = document.getElementById("lmFormatDetailInput");
      label.textContent = isOnline ? "Link online" : "Nơi học";
      input.placeholder = isOnline ? "VD: meet.google.com/abc-defg-hij" : "VD: Phòng 201";
    }

    function closeFormatPopover() {
      document.getElementById("lmFormatPopover").classList.remove("open");
    }

    function openFormatPopover() {
      var tpl = lessonTemplates[currentLessonClass] || {};
      var fmt = getLessonFormat(currentLessonClass);
      document.getElementById("lmFormatTypeSelect").value = fmt.format;
      var detail = fmt.format === "online"
        ? (fmt.onlineLink || "")
        : (fmt.location || (currentLessonEvent && currentLessonEvent.room) || "");
      document.getElementById("lmFormatDetailInput").value = detail.replace(/^https?:\/\//, "");
      updateFormatDetailField();
      document.getElementById("lmFormatPopover").classList.add("open");
      document.getElementById("lmFormatDetailInput").focus();
    }

    function saveFormatEdit() {
      if (!currentLessonClass) return;
      var tpl = lessonTemplates[currentLessonClass];
      if (!tpl) return;
      var format = document.getElementById("lmFormatTypeSelect").value;
      var detail = document.getElementById("lmFormatDetailInput").value.trim();
      tpl.format = format;
      if (format === "online") {
        tpl.onlineLink = normalizeOnlineLink(detail);
        if (currentLessonEvent) currentLessonEvent.room = tpl.onlineLink;
      } else {
        tpl.location = detail;
        if (currentLessonEvent) currentLessonEvent.room = detail;
      }
      var d = getLessonDetail(currentLessonEvent || { title: currentLessonClass, room: detail, day: 0, time: "" });
      updateFormatMeta(d);
      refreshEventPlaceLabels(currentLessonClass);
      closeFormatPopover();
    }

    var formatIconOffline = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>';
    var formatIconOnline = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>';

    function updateFormatMeta(d) {
      var isOnline = d.format === "online";
      document.getElementById("lmMetaFormat").textContent = "Hình thức: " + (isOnline ? "Online" : "Offline");
      var detailEl = document.getElementById("lmMetaFormatDetail");
      if (isOnline && d.onlineLink) {
        var shortLink = d.onlineLink.replace(/^https?:\/\//, "");
        detailEl.innerHTML = '<a href="' + d.onlineLink + '" target="_blank" rel="noopener">' + shortLink + '</a>';
      } else {
        detailEl.textContent = d.location || "—";
      }
      var iconEl = document.getElementById("lmMetaFormatIcon");
      iconEl.className = "ic " + (isOnline ? "ic-violet" : "ic-amber");
      iconEl.innerHTML = isOnline ? formatIconOnline : formatIconOffline;
    }

    function getLessonDetail(ev) {
      var tpl = lessonTemplates[ev.title] || lessonTemplates["Toán 9A"];
      var fmt = getLessonFormat(ev.title);
      var dayLabel = ev.date ? formatDayLabel(ev.date) : "";
      return {
        title: ev.title,
        subject: getLessonSubject(ev.title),
        topic: tpl.topic,
        time: ev.time,
        room: ev.room,
        location: fmt.location || ev.room,
        format: fmt.format,
        onlineLink: fmt.onlineLink,
        dayLabel: dayLabel,
        dayShort: ev.date ? pad2(ev.date.day) + "/" + pad2(ev.date.month) + "/2026" : "",
        session: tpl.session,
        attendance: tpl.attendance,
        status: tpl.status,
        materials: tpl.materials,
        desc: tpl.desc,
        tags: tpl.tags,
        homework: tpl.homework,
        tests: tpl.tests,
        comments: tpl.comments,
        media: tpl.media || [],
        docs: tpl.docs || [],
        links: tpl.links || []
      };
    }

    var modal = document.getElementById("lessonModal");
    var lmLinksContainer = document.getElementById("lmLinks");

    var menuDotsSvg = '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="12" cy="19" r="1.6"/></svg>';
    var delSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>';

    function closeAllItemMenus() {
      document.querySelectorAll(".lm-item-menu.open").forEach(function (m) {
        m.classList.remove("open");
      });
    }

    function itemMenuHtml() {
      return '<div class="lm-item-menu">' +
        '<button class="lm-menu-btn" type="button" aria-label="Tùy chọn">' + menuDotsSvg + '</button>' +
        '<div class="lm-menu-dropdown">' +
        '<button type="button" class="lm-menu-opt" data-action="edit">Chỉnh sửa</button>' +
        '<button type="button" class="lm-menu-opt lm-menu-opt--danger" data-action="delete">Xoá</button>' +
        '</div></div>';
    }

    function renderListItems(container, items, type) {
      container.innerHTML = "";
      items.forEach(function (item) {
        var row = document.createElement("div");
        row.className = "lm-list-item";
        var iconCls = type === "hw" ? "ic-green" : "ic-rose";
        var iconBg = type === "hw" ? "var(--green-bg)" : "var(--rose-bg)";
        var iconColor = type === "hw" ? "var(--green)" : "var(--rose)";
        row.innerHTML =
          '<div class="lic ' + iconCls + '" style="background:' + iconBg + ';color:' + iconColor + '">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg></div>' +
          '<div class="txt"><b>' + item.title + '</b><small>' + (item.due || item.meta) + '</small></div>' +
          itemMenuHtml();
        container.appendChild(row);
      });
    }

    function renderMedia(container, items) {
      container.innerHTML = "";
      if (!items.length) {
        container.innerHTML = '<div class="lm-empty-hint">Chưa có ảnh hoặc video.</div>';
        return;
      }
      items.forEach(function (item) {
        var el = document.createElement("div");
        el.className = "lm-media-item" + (item.type === "video" ? " is-video" : "");
        el.title = item.label;
        var inner = '<div class="lm-media-bg" style="background:linear-gradient(135deg,' + item.color + ',' + item.color + 'cc)">' + item.label + '</div>';
        if (item.type === "video") {
          inner += '<span class="lm-media-play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>';
        }
        el.innerHTML = inner;
        container.appendChild(el);
      });
    }

    function renderDocs(container, items) {
      container.innerHTML = "";
      if (!items.length) {
        container.innerHTML = '<div class="lm-empty-hint">Chưa có tài liệu đính kèm.</div>';
        return;
      }
      items.forEach(function (item) {
        var ext = (item.ext || "other").toLowerCase();
        var row = document.createElement("div");
        row.className = "lm-doc-item";
        row.innerHTML =
          '<div class="lm-doc-icon ' + ext + '">' + ext + '</div>' +
          '<div class="txt"><b>' + item.name + '</b><small>' + (item.size || "") + '</small></div>' +
          '<button class="lm-del" type="button" aria-label="Xoá tài liệu">' + delSvg + '</button>';
        container.appendChild(row);
      });
    }

    function createLinkRow(item) {
      var row = document.createElement("div");
      row.className = "lm-link-item";
      row.innerHTML =
        '<a class="lm-link-body" href="' + item.url + '" target="_blank" rel="noopener noreferrer">' +
        '<div class="lm-link-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></div>' +
        '<div class="txt"><b>' + item.title + '</b><small>' + item.url + '</small></div></a>' +
        '<button class="lm-del" type="button" aria-label="Xoá link">' + delSvg + '</button>';
      return row;
    }

    function renderLinks(container, items) {
      container.innerHTML = "";
      if (!items.length) {
        container.innerHTML = '<div class="lm-empty-hint">Chưa có link tham khảo.</div>';
        return;
      }
      items.forEach(function (item) {
        container.appendChild(createLinkRow(item));
      });
    }

    function updateMatFooter(viewName) {
      document.getElementById("lmUploadZone").hidden = viewName === "links";
      document.getElementById("lmLinkAdd").hidden = viewName !== "links";
    }

    function switchMatView(viewName) {
      document.querySelectorAll(".lm-mat-btn").forEach(function (btn) {
        var active = btn.getAttribute("data-mat") === viewName;
        btn.classList.toggle("active", active);
        btn.setAttribute("aria-selected", active ? "true" : "false");
      });
      document.getElementById("lmMatMedia").classList.toggle("active", viewName === "media");
      document.getElementById("lmMatDocs").classList.toggle("active", viewName === "docs");
      document.getElementById("lmMatLinks").classList.toggle("active", viewName === "links");
      updateMatFooter(viewName);
    }

    document.querySelectorAll(".lm-mat-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        switchMatView(btn.getAttribute("data-mat"));
      });
    });

    document.getElementById("lmUploadBtn").addEventListener("click", function (e) {
      e.stopPropagation();
      document.getElementById("lmMatUpload").click();
    });
    document.getElementById("lmUploadZone").addEventListener("click", function () {
      document.getElementById("lmMatUpload").click();
    });
    document.getElementById("lmUploadZone").addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        document.getElementById("lmMatUpload").click();
      }
    });
    document.getElementById("lmMatUpload").addEventListener("change", function () {
      if (!this.files || !this.files.length) return;
      this.value = "";
    });

    document.getElementById("lmLinkAddBtn").addEventListener("click", function () {
      var input = document.getElementById("lmLinkInput");
      var url = (input.value || "").trim();
      if (!url) {
        input.focus();
        return;
      }
      if (!/^https?:\/\//i.test(url)) url = "https://" + url;
      var title = url.replace(/^https?:\/\/(www\.)?/, "").split("/")[0];
      var empty = lmLinksContainer.querySelector(".lm-empty-hint");
      if (empty) empty.remove();
      lmLinksContainer.appendChild(createLinkRow({ title: title, url: url }));
      input.value = "";
    });
    document.getElementById("lmLinkInput").addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        document.getElementById("lmLinkAddBtn").click();
      }
    });

    document.getElementById("lmAttendOpen").addEventListener("click", openAttendanceModal);
    document.getElementById("lmEditSchedule").addEventListener("click", function () {
      /* placeholder: đổi lịch học */
    });
    document.getElementById("lmEditFormat").addEventListener("click", function (e) {
      e.stopPropagation();
      var pop = document.getElementById("lmFormatPopover");
      if (pop.classList.contains("open")) closeFormatPopover();
      else openFormatPopover();
    });
    document.getElementById("lmFormatTypeSelect").addEventListener("change", updateFormatDetailField);
    document.getElementById("lmFormatCancel").addEventListener("click", closeFormatPopover);
    document.getElementById("lmFormatSave").addEventListener("click", saveFormatEdit);
    document.getElementById("lmFormatDetailInput").addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        saveFormatEdit();
      }
    });
    document.addEventListener("click", function (e) {
      var pop = document.getElementById("lmFormatPopover");
      if (!pop.classList.contains("open")) return;
      if (pop.contains(e.target) || e.target.id === "lmEditFormat" || e.target.closest("#lmEditFormat")) return;
      closeFormatPopover();
    });
    document.getElementById("attClose").addEventListener("click", closeAttendanceModal);
    document.getElementById("attSaveBtn").addEventListener("click", function () {
      updateAttendMeta();
      closeAttendanceModal();
    });
    attendanceModal.addEventListener("click", function (e) {
      if (e.target === attendanceModal) closeAttendanceModal();
    });

    document.getElementById("attList").addEventListener("change", function (e) {
      if (!e.target.classList.contains("att-status-select")) return;
      var tr = e.target.closest("tr");
      var idx = parseInt(tr.getAttribute("data-idx"), 10);
      var s = currentAttStudents[idx];
      if (!s) return;
      var status = e.target.value;
      setAttStatus(s, status);
      e.target.setAttribute("data-status", status);
      tr.querySelector(".att-time-cell").textContent = s.checkIn || "—";
      updateAttendMeta();
    });

    document.getElementById("lmEditDesc").addEventListener("click", function () {
      var descEl = document.getElementById("lmDesc");
      if (descEl.querySelector(".lm-desc-edit")) return;
      var paragraphs = Array.from(descEl.querySelectorAll("p")).map(function (p) { return p.textContent; });
      currentDescBackup = descEl.innerHTML;
      descEl.innerHTML = "";
      var ta = document.createElement("textarea");
      ta.className = "lm-desc-edit";
      ta.id = "lmDescTextarea";
      ta.value = paragraphs.join("\n\n");
      var actions = document.createElement("div");
      actions.className = "lm-desc-edit-actions";
      actions.innerHTML =
        '<button type="button" class="lm-desc-cancel" id="lmDescCancel">Huỷ</button>' +
        '<button type="button" class="lm-desc-save" id="lmDescSave">Lưu</button>';
      descEl.appendChild(ta);
      descEl.appendChild(actions);
      ta.focus();
    });

    modal.querySelector(".lesson-modal").addEventListener("click", function (e) {
      if (e.target.id === "lmDescSave") {
        var text = document.getElementById("lmDescTextarea").value.trim();
        var parts = text ? text.split(/\n\s*\n/) : [""];
        renderDescParagraphs(document.getElementById("lmDesc"), parts);
        return;
      }
      if (e.target.id === "lmDescCancel") {
        document.getElementById("lmDesc").innerHTML = currentDescBackup;
        return;
      }
      var menuBtn = e.target.closest(".lm-menu-btn");
      if (menuBtn) {
        e.stopPropagation();
        var menu = menuBtn.closest(".lm-item-menu");
        var wasOpen = menu.classList.contains("open");
        closeAllItemMenus();
        if (!wasOpen) menu.classList.add("open");
        return;
      }
      var opt = e.target.closest(".lm-menu-opt");
      if (opt) {
        e.stopPropagation();
        var row = opt.closest(".lm-list-item");
        var action = opt.getAttribute("data-action");
        if (row && action === "delete") row.remove();
        if (row && action === "edit") {
          var titleEl = row.querySelector(".txt b");
          var subEl = row.querySelector(".txt small");
          var newTitle = window.prompt("Chỉnh sửa tiêu đề:", titleEl ? titleEl.textContent : "");
          if (newTitle && newTitle.trim() && titleEl) titleEl.textContent = newTitle.trim();
          var newSub = window.prompt("Chỉnh sửa mô tả:", subEl ? subEl.textContent : "");
          if (newSub !== null && newSub.trim() && subEl) subEl.textContent = newSub.trim();
        }
        closeAllItemMenus();
        return;
      }
      var delBtn = e.target.closest(".lm-doc-item .lm-del, .lm-link-item .lm-del");
      if (delBtn) {
        e.stopPropagation();
        var item = delBtn.closest(".lm-doc-item, .lm-link-item");
        if (item) item.remove();
        return;
      }
      if (!e.target.closest(".lm-item-menu")) closeAllItemMenus();
    });

    function switchSidebarTab(tabName) {
      document.querySelectorAll(".lm-tab").forEach(function (btn) {
        var active = btn.getAttribute("data-tab") === tabName;
        btn.classList.toggle("active", active);
        btn.setAttribute("aria-selected", active ? "true" : "false");
      });
      document.getElementById("lmPanelHomework").classList.toggle("active", tabName === "homework");
      document.getElementById("lmPanelTests").classList.toggle("active", tabName === "tests");
      document.getElementById("lmPanelMaterials").classList.toggle("active", tabName === "materials");
      if (tabName === "materials") switchMatView("media");
      else closeAllItemMenus();
    }

    document.querySelectorAll(".lm-tab").forEach(function (btn) {
      btn.addEventListener("click", function () {
        switchSidebarTab(btn.getAttribute("data-tab"));
      });
    });

    function renderComments(container, comments) {
      container.innerHTML = "";
      if (!comments.length) {
        container.innerHTML = '<div class="lm-comment"><div class="lm-comment-body"><p style="color:var(--muted)">Chưa có bình luận nào.</p></div></div>';
      } else {
        comments.forEach(function (c) {
          var div = document.createElement("div");
          div.className = "lm-comment" + (c.reply ? " reply" : "");
          div.innerHTML =
            '<div class="lm-avatar" style="background:' + c.color + '">' + c.init + '</div>' +
            '<div class="lm-comment-body">' +
            '<div class="lm-comment-top"><b>' + c.user + '</b>' +
            (c.teacher ? '<span class="lm-badge-gv">Giáo viên</span>' : '') +
            '<time>' + c.time + '</time></div>' +
            '<p>' + c.text + '</p>' +
            (!c.teacher ? '<div class="lm-reply-link">Trả lời</div>' : '') +
            '</div>';
          container.appendChild(div);
        });
      }
      var inputRow = document.createElement("div");
      inputRow.className = "lm-comment-input";
      inputRow.innerHTML =
        '<div class="lm-avatar" style="background:#7d5fd1">NL</div>' +
        '<input type="text" placeholder="Thêm bình luận..." />';
      container.appendChild(inputRow);
    }

    function openLessonModal(ev) {
      currentLessonEvent = ev;
      var d = getLessonDetail(ev);
      document.getElementById("lmCrumbClass").textContent = d.title;
      document.getElementById("lmCrumbId").textContent = "Buổi " + d.session;
      document.getElementById("lmTitle").textContent = "Chi tiết buổi học – " + d.topic;
      document.getElementById("lmMetaSubject").textContent = "Môn học: " + d.subject;
      document.getElementById("lmMetaScheduleDate").textContent = d.dayLabel;
      document.getElementById("lmMetaScheduleTime").textContent = d.time;
      closeFormatPopover();
      updateFormatMeta(d);
      switchSidebarTab("homework");
      switchMatView("media");
      updateMatFooter("media");
      document.getElementById("lmLinkInput").value = "";
      closeAllItemMenus();
      var descEl = document.getElementById("lmDesc");
      renderDescParagraphs(descEl, d.desc.slice());
      currentLessonClass = d.title;
      currentLessonSession = d.session;
      var tpl = lessonTemplates[ev.title] || lessonTemplates["Toán 9A"];
      currentAttStudents = buildStudents(tpl);
      updateAttendMeta();
      renderListItems(document.getElementById("lmHomework"), d.homework, "hw");
      renderListItems(document.getElementById("lmTests"), d.tests, "test");
      renderMedia(document.getElementById("lmMedia"), d.media);
      renderDocs(document.getElementById("lmDocs"), d.docs);
      renderLinks(document.getElementById("lmLinks"), d.links);
      renderComments(document.getElementById("lmComments"), d.comments);
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    function closeLessonModal() {
      closeAttendanceModal();
      closeFormatPopover();
      currentLessonEvent = null;
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    document.getElementById("lmClose").addEventListener("click", closeLessonModal);
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeLessonModal();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        if (attendanceModal.classList.contains("open")) {
          closeAttendanceModal();
          return;
        }
        if (document.getElementById("lmFormatPopover").classList.contains("open")) {
          closeFormatPopover();
          return;
        }
        if (daySessionsModal.classList.contains("open")) {
          closeDaySessionsModal();
          return;
        }
        if (modal.classList.contains("open")) {
          if (document.querySelector(".lm-item-menu.open")) {
            closeAllItemMenus();
          } else {
            closeLessonModal();
          }
        }
      }
    });

    document.getElementById("daySessClose").addEventListener("click", closeDaySessionsModal);
    daySessionsModal.addEventListener("click", function (e) {
      if (e.target === daySessionsModal) closeDaySessionsModal();
    });

    function scrollToNow(smooth) {
      var headerH = 52;
      var target = nowTop + headerH - calScroll.clientHeight * 0.38;
      calScroll.scrollTo({
        top: Math.max(0, target),
        behavior: smooth ? "smooth" : "auto"
      });
    }

    renderWeekCalendar();

    requestAnimationFrame(function () {
      scrollToNow(false);
    });

    document.getElementById("btnToday").addEventListener("click", function () {
      currentWeekStart = getWeekStart(TODAY);
      miniCalMonth = TODAY.getMonth() + 1;
      miniCalYear = TODAY.getFullYear();
      if (calViewMode === "month") {
        renderMonthCalendar(miniCalYear, miniCalMonth);
        updateMonthRangeLabel();
      } else {
        renderWeekCalendar();
        scrollToNow(true);
      }
    });

    document.getElementById("btnWeekPrev").addEventListener("click", function () {
      if (calViewMode === "month") {
        var m = miniCalMonth - 1;
        var y = miniCalYear;
        if (m < 1) { m = 12; y--; }
        renderMonthCalendar(y, m);
        return;
      }
      var prev = new Date(currentWeekStart);
      prev.setDate(prev.getDate() - 7);
      if (prev < getWeekStart(SCHEDULE_START)) return;
      currentWeekStart = prev;
      renderWeekCalendar();
    });

    document.getElementById("btnWeekNext").addEventListener("click", function () {
      if (calViewMode === "month") {
        var m = miniCalMonth + 1;
        var y = miniCalYear;
        if (m > 12) { m = 1; y++; }
        renderMonthCalendar(y, m);
        return;
      }
      var next = new Date(currentWeekStart);
      next.setDate(next.getDate() + 7);
      if (next > getWeekStart(SCHEDULE_END)) return;
      currentWeekStart = next;
      renderWeekCalendar();
    });

    document.getElementById("btnViewWeek").addEventListener("click", function () {
      switchCalView("week");
    });
    document.getElementById("btnViewMonth").addEventListener("click", function () {
      switchCalView("month");
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeDrawer();
    });