var hwState = {
  className: "Web Foundation K12",
  activeTab: "session",
  filter: "all",
  expandedSession: null,
  futureExpanded: false,
  shouldScrollToUpcoming: true
};

var HW_BADGE_CLASSES = ["hw-session-badge--violet", "hw-session-badge--green", "hw-session-badge--blue", "hw-session-badge--amber"];

function sessionBadgeClass(num) {
  return HW_BADGE_CLASSES[(num - 1) % HW_BADGE_CLASSES.length];
}

var HW_MENU_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>';
var HW_MSG_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2 11 13"/><path d="M22 2 15 22 11 13 2 9z"/></svg>';
var HW_EYE_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
var HW_ADD_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>';

function padSessionNum(n) {
  return n < 10 ? "0" + n : "" + n;
}

var hwClassData = {
  "Web Foundation K12": {
    sessions: [
      {
        num: 18,
        status: "future",
        title: "JavaScript DOM nâng cao",
        date: "19/06/2026",
        submitted: 0,
        total: 23,
        notSubmitted: 23,
        needGrade: 0,
        assignments: []
      },
      {
        num: 17,
        status: "future",
        title: "Form validation",
        date: "17/06/2026",
        submitted: 0,
        total: 23,
        notSubmitted: 23,
        needGrade: 0,
        assignments: []
      },
      {
        num: 16,
        status: "upcoming",
        title: "Ôn tập chương 2",
        date: "15/06/2026",
        submitted: 0,
        total: 23,
        notSubmitted: 23,
        needGrade: 0,
        assignments: [
          { type: "pdf", title: "Bài tập ôn tập chương 2", submitted: 0, total: 23, needGrade: 0 },
          { type: "quiz", title: "Quiz ôn tập", submitted: 0, total: 23, needGrade: 0 }
        ]
      },
      {
        num: 15,
        status: "taught",
        title: "Hàm số bậc hai",
        date: "13/06/2026",
        submitted: 18,
        total: 23,
        notSubmitted: 5,
        needGrade: 10,
        assignments: [
          { type: "pdf", title: "Bài tập chương 2", submitted: 18, total: 23, needGrade: 8 },
          { type: "docx", title: "Chứng minh đồ thị hàm số", submitted: 15, total: 23, needGrade: 7 },
          { type: "quiz", title: "Quiz 1 – Hàm số bậc hai", submitted: 22, total: 23, needGrade: 0 },
          { type: "quiz", title: "Quiz 2 – Đồ thị", submitted: 21, total: 23, needGrade: 0 },
          { type: "pdf", title: "Quiz 3 – Bất phương trình", submitted: 20, total: 23, needGrade: 0 }
        ]
      },
      {
        num: 14,
        status: "taught",
        title: "Hệ phương trình bậc nhất hai ẩn",
        date: "11/06/2026",
        submitted: 21,
        total: 23,
        notSubmitted: 2,
        needGrade: 5,
        assignments: [
          { type: "pdf", title: "Bài tập SGK trang 32", submitted: 21, total: 23, needGrade: 5 },
          { type: "quiz", title: "Quiz hệ phương trình", submitted: 23, total: 23, needGrade: 0 }
        ]
      },
      {
        num: 13,
        status: "taught",
        title: "Phương trình bậc nhất một ẩn",
        date: "09/06/2026",
        submitted: 23,
        total: 23,
        notSubmitted: 0,
        needGrade: 0,
        assignments: [
          { type: "docx", title: "Bài tập về nhà buổi 13", submitted: 23, total: 23, needGrade: 0 }
        ]
      }
    ],
    courseAssignments: [
      { type: "pdf", tag: "Dự án", title: "Dự án cuối kỳ – Landing page", deadline: "30/06/2026", submitted: 12, total: 23, needGrade: 4 },
      { type: "quiz", tag: "Kiểm tra", title: "Quiz tổng hợp HTML & CSS", deadline: "25/06/2026", submitted: 20, total: 23, needGrade: 6 },
      { type: "docx", tag: "Ôn tập", title: "Checklist chuẩn bị thi thử", deadline: "20/06/2026", submitted: 23, total: 23, needGrade: 0 },
      { type: "pdf", tag: "Tham khảo", title: "Bài tập nâng cao Flexbox", deadline: "Không hạn", submitted: 8, total: 23, needGrade: 2 }
    ],
    urgent: [
      { sessionNum: 15, sessionLabel: "Buổi 15", badge: "green", title: "Hàm số bậc hai", countdown: "Còn 1 ngày", deadline: "Hạn: 14/06/2026", notSubmitted: 5 },
      { sessionNum: 16, sessionLabel: "Buổi 16", badge: "amber", title: "Ôn tập chương 2", countdown: "Còn 2 ngày", deadline: "Hạn: 15/06/2026", notSubmitted: 8 }
    ],
    students: [
      { name: "Minh", initials: "M", color: "#6c8cff", note: "3 lần nộp muộn" },
      { name: "Lan", initials: "L", color: "#e85d75", note: "Chưa nộp 2 bài liên tiếp" },
      { name: "Nam", initials: "N", color: "#2f8f6b", note: "Điểm thấp 3 bài gần nhất" }
    ]
  },
  "Toán 9A": {
    sessions: [
      {
        num: 11,
        status: "future",
        title: "Giải bài toán bằng PT bậc hai",
        date: "28/06/2026",
        submitted: 0,
        total: 30,
        notSubmitted: 30,
        needGrade: 0,
        assignments: []
      },
      {
        num: 10,
        status: "future",
        title: "Định lý Viète",
        date: "26/06/2026",
        submitted: 0,
        total: 30,
        notSubmitted: 30,
        needGrade: 0,
        assignments: []
      },
      {
        num: 9,
        status: "future",
        title: "Phương trình bậc hai – luyện tập",
        date: "24/06/2026",
        submitted: 0,
        total: 30,
        notSubmitted: 30,
        needGrade: 0,
        assignments: []
      },
      {
        num: 8,
        status: "upcoming",
        title: "Phương trình bậc hai",
        date: "22/06/2026",
        submitted: 0,
        total: 30,
        notSubmitted: 30,
        needGrade: 0,
        assignments: [
          { type: "pdf", title: "Bài tập SGK trang 45 – 48", submitted: 0, total: 30, needGrade: 0 },
          { type: "quiz", title: "Quiz – PT bậc hai cơ bản", submitted: 0, total: 30, needGrade: 0 }
        ]
      },
      {
        num: 5,
        status: "taught",
        title: "Hàm số bậc nhất",
        date: "16/06/2026",
        submitted: 28,
        total: 30,
        notSubmitted: 2,
        needGrade: 6,
        assignments: [
          { type: "pdf", title: "Bài tập chương 2", submitted: 28, total: 30, needGrade: 6 },
          { type: "docx", title: "Chứng minh đồ thị hàm số", submitted: 26, total: 30, needGrade: 4 },
          { type: "quiz", title: "Khảo sát và vẽ đồ thị hàm số", submitted: 21, total: 30, needGrade: 5 }
        ]
      }
    ],
    courseAssignments: [
      { type: "pdf", tag: "Ôn thi", title: "Đề cương ôn tập giữa kỳ", deadline: "28/06/2026", submitted: 25, total: 30, needGrade: 3 },
      { type: "quiz", tag: "Kiểm tra", title: "Quiz tổng hợp chương 1–2", deadline: "01/07/2026", submitted: 10, total: 30, needGrade: 0 }
    ],
    urgent: [
      { sessionNum: 8, sessionLabel: "Buổi 08", badge: "green", title: "Phương trình bậc hai", countdown: "Còn 3 ngày", deadline: "Hạn: 25/06/2026", notSubmitted: 30 }
    ],
    students: [
      { name: "Hùng", initials: "H", color: "#7d5fd1", note: "Chưa nộp 3 bài liên tiếp" },
      { name: "Trang", initials: "T", color: "#d98a2b", note: "2 lần nộp muộn" }
    ]
  },
  "Vật lý 9A": {
    sessions: [
      {
        num: 5,
        status: "future",
        title: "Chuyển động tròn đều",
        date: "18/06/2026",
        submitted: 0,
        total: 28,
        notSubmitted: 28,
        needGrade: 0,
        assignments: []
      },
      {
        num: 4,
        status: "upcoming",
        title: "Định luật II Newton",
        date: "16/06/2026",
        submitted: 0,
        total: 28,
        notSubmitted: 28,
        needGrade: 0,
        assignments: [
          { type: "pdf", title: "Bài tập SGK trang 22", submitted: 0, total: 28, needGrade: 0 }
        ]
      },
      {
        num: 3,
        status: "taught",
        title: "Lực ma sát & lực cản",
        date: "14/06/2026",
        submitted: 26,
        total: 28,
        notSubmitted: 2,
        needGrade: 3,
        assignments: [
          { type: "pdf", title: "Bài tập SGK trang 18", submitted: 26, total: 28, needGrade: 3 }
        ]
      }
    ],
    courseAssignments: [
      { type: "pdf", tag: "Tham khảo", title: "Bảng công thức Vật lý 9", deadline: "Không hạn", submitted: 28, total: 28, needGrade: 0 }
    ],
    urgent: [],
    students: [
      { name: "Phúc", initials: "P", color: "#3b82f6", note: "Chưa nộp bài buổi 3" }
    ]
  },
  "Ngữ văn 9A": {
    sessions: [
      {
        num: 5,
        status: "future",
        title: "Luyện viết đoạn kết bài",
        date: "23/06/2026",
        submitted: 0,
        total: 26,
        notSubmitted: 26,
        needGrade: 0,
        assignments: []
      },
      {
        num: 4,
        status: "upcoming",
        title: "Phân tích văn bản trữ tình",
        date: "21/06/2026",
        submitted: 0,
        total: 26,
        notSubmitted: 26,
        needGrade: 0,
        assignments: [
          { type: "docx", title: "Phân tích bài thơ Lượm", submitted: 0, total: 26, needGrade: 0 }
        ]
      },
      {
        num: 3,
        status: "taught",
        title: "Luyện viết đoạn mở bài",
        date: "19/06/2026",
        submitted: 24,
        total: 26,
        notSubmitted: 2,
        needGrade: 5,
        assignments: [
          { type: "docx", title: "Viết đoạn mở bài nghị luận", submitted: 24, total: 26, needGrade: 5 }
        ]
      }
    ],
    courseAssignments: [
      { type: "docx", tag: "Luyện tập", title: "Bài luận mẫu – Thơ ca dân gian", deadline: "22/06/2026", submitted: 20, total: 26, needGrade: 8 }
    ],
    urgent: [
      { sessionNum: 3, sessionLabel: "Buổi 03", badge: "amber", title: "Luyện viết đoạn mở bài", countdown: "Còn 1 ngày", deadline: "Hạn: 21/06/2026", notSubmitted: 2 }
    ],
    students: [
      { name: "Hà", initials: "H", color: "#e85d75", note: "Điểm thấp 2 bài gần nhất" }
    ]
  }
};

function renderAssignIcon(type) {
  var label = type === "quiz" ? "?" : type;
  return '<span class="hw-assign-icon hw-assign-icon--' + type + '">' + label + "</span>";
}

function renderAssignMeta(a) {
  var gradePart = a.needGrade > 0
    ? '<em>' + a.needGrade + " cần chấm</em>"
    : "0 cần chấm";
  return a.submitted + "/" + a.total + " nộp · " + gradePart;
}

function openCreateHomework(ctx) {
  try {
    sessionStorage.setItem("tcCreateHwCtx", JSON.stringify(ctx || {
      className: hwState.className,
      source: "general"
    }));
  } catch (e) { /* ignore */ }
  window.location.href = "homework-create.html";
}

function openAssignmentGrade(ctx) {
  try {
    sessionStorage.setItem("tcGradeCtx", JSON.stringify(ctx));
  } catch (e) { /* ignore */ }
  window.location.href = "homework-grade.html";
}

function openGradeFromSession(sessionNum, assignIndex) {
  var data = hwClassData[hwState.className];
  if (!data) return;
  var session = data.sessions.find(function (s) { return s.num === sessionNum; });
  if (!session || !session.assignments[assignIndex]) return;
  var a = session.assignments[assignIndex];
  openAssignmentGrade({
    className: hwState.className,
    source: "session",
    sessionNum: sessionNum,
    sessionTitle: session.title,
    sessionDate: session.date,
    assignIndex: assignIndex,
    title: a.title,
    type: a.type,
    submitted: a.submitted,
    total: a.total,
    needGrade: a.needGrade
  });
}

function openGradeFromCourse(assignIndex) {
  var data = hwClassData[hwState.className];
  if (!data || !data.courseAssignments[assignIndex]) return;
  var a = data.courseAssignments[assignIndex];
  openAssignmentGrade({
    className: hwState.className,
    source: "course",
    assignIndex: assignIndex,
    title: a.title,
    type: a.type,
    submitted: a.submitted,
    total: a.total,
    needGrade: a.needGrade
  });
}

function renderAssignRows(session) {
  if (!session.assignments.length) {
    return '<div class="hw-assign-empty">Chưa có bài tập</div>';
  }
  return session.assignments.map(function (a, i) {
    return (
      '<div class="hw-assign-row" data-open-grade="1" data-session-num="' + session.num + '" data-assign-idx="' + i + '" role="button" tabindex="0">' +
      '<span class="hw-assign-num">' + (i + 1) + "</span>" +
      renderAssignIcon(a.type) +
      '<span class="hw-assign-title">' + a.title + "</span>" +
      '<span class="hw-assign-meta">' + renderAssignMeta(a) + "</span>" +
      '<button class="hw-assign-menu" type="button" aria-label="Tuỳ chọn">' + HW_MENU_SVG + "</button>" +
      "</div>"
    );
  }).join("");
}

function renderSessionStats(session) {
  if (!session.assignments.length) {
    return '<span class="hw-no-assign">Chưa có bài tập</span>';
  }
  return (
    '<div class="hw-session-stats">' +
    '<span class="hw-stat">' + session.submitted + "/" + session.total + " nộp</span>" +
    (session.notSubmitted > 0 ? '<span class="hw-stat hw-stat--warn">' + session.notSubmitted + " chưa nộp</span>" : "") +
    (session.needGrade > 0 ? '<span class="hw-stat hw-stat--muted">' + session.needGrade + " cần chấm</span>" : "") +
    "</div>"
  );
}

function renderAddAssignBtn(sessionNum) {
  return (
    '<button class="hw-add-assign" type="button" data-create-hw="1" data-session-num="' + sessionNum + '" title="Thêm bài tập" aria-label="Thêm bài tập">' +
    HW_ADD_SVG + "</button>"
  );
}

function renderSessionBlock(session) {
  var isOpen = hwState.expandedSession === session.num;
  var badgeCls = sessionBadgeClass(session.num);
  return (
    '<div class="hw-session-block' + (isOpen ? " is-open" : "") + '" data-session-num="' + session.num + '">' +
    '<div class="hw-session-head">' +
    '<button class="hw-session-toggle" type="button" data-toggle-session="' + session.num + '" aria-expanded="' + (isOpen ? "true" : "false") + '">' +
    '<span class="hw-session-badge ' + badgeCls + '">Buổi ' + padSessionNum(session.num) + "</span>" +
    '<div class="hw-session-info"><b>' + session.title + '</b><small>' + (session.date || "Chưa lên lịch") + "</small></div>" +
    renderSessionStats(session) +
    '<span class="hw-session-chev"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg></span>' +
    "</button>" +
    renderAddAssignBtn(session.num) +
    "</div>" +
    '<div class="hw-session-body"><div class="hw-assign-list">' + renderAssignRows(session) + "</div></div>" +
    "</div>"
  );
}

function renderSessionGroup(title, sessions, opts) {
  opts = opts || {};
  if (!sessions.length) return "";

  var blocks = sessions.map(renderSessionBlock).join("");
  var moreBtn = "";
  if (opts.hiddenCount > 0) {
    moreBtn =
      '<button class="hw-group-more" type="button" data-hw-expand-future>' +
      "Hiện thêm " + opts.hiddenCount + " buổi" +
      "</button>";
  }

  return (
    '<section class="hw-group' + (opts.highlight ? " hw-group-highlight" : "") + '"' +
    (opts.groupKey ? ' data-hw-group="' + opts.groupKey + '"' : "") + ">" +
    '<div class="hw-group-head">' +
    "<h4>" + title + ' <span class="hw-group-count">(' + sessions.length + ")</span></h4>" +
    (opts.collapsible
      ? '<button class="hw-group-toggle" type="button" data-hw-toggle-future aria-expanded="' +
        (hwState.futureExpanded ? "true" : "false") + '">' +
        (hwState.futureExpanded ? "Thu gọn" : "Mở rộng") +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg></button>'
      : "") +
    "</div>" +
    '<div class="hw-group-body">' + blocks + moreBtn + "</div>" +
    "</section>"
  );
}

function shouldShowGroup(groupKey) {
  if (hwState.filter === "all") return true;
  if (hwState.filter === "upcoming") return groupKey === "upcoming";
  if (hwState.filter === "taught") return groupKey === "taught";
  if (hwState.filter === "future") return groupKey === "future";
  return true;
}

function renderSessionList(className) {
  var list = document.getElementById("hwSessionList");
  if (!list) return;
  var data = hwClassData[className];
  if (!data || !data.sessions.length) {
    list.innerHTML = '<div class="hw-side-empty" style="padding:24px;text-align:center;color:var(--muted)">Chưa có buổi học nào.</div>';
    return;
  }

  var sessions = data.sessions;
  var upcoming = sessions.filter(function (s) { return s.status === "upcoming"; })
    .sort(function (a, b) { return a.num - b.num; });
  var taught = sessions.filter(function (s) { return s.status === "taught"; })
    .sort(function (a, b) { return b.num - a.num; });
  var futureAll = sessions.filter(function (s) {
    return s.status === "future" || s.status === "future_unscheduled";
  }).sort(function (a, b) { return b.num - a.num; });

  var collapseFuture = hwState.filter === "all";
  var futureVisible = collapseFuture && !hwState.futureExpanded ? futureAll.slice(-3) : futureAll;
  var futureHidden = collapseFuture && !hwState.futureExpanded ? Math.max(0, futureAll.length - 3) : 0;

  var html = "";
  if (shouldShowGroup("future")) {
    html += renderSessionGroup("Chưa dạy", futureVisible, {
      groupKey: "future",
      collapsible: collapseFuture && futureAll.length > 0,
      hiddenCount: futureHidden
    });
  }
  if (shouldShowGroup("upcoming")) {
    html += renderSessionGroup("Sắp tới", upcoming, { groupKey: "upcoming", highlight: true });
  }
  if (shouldShowGroup("taught")) {
    html += renderSessionGroup("Đã dạy", taught, { groupKey: "taught" });
  }

  if (!html.replace(/\s/g, "")) {
    list.innerHTML = '<div style="padding:24px;text-align:center;color:var(--muted)">Không có buổi nào khớp bộ lọc.</div>';
    return;
  }

  list.innerHTML = html;

  if (hwState.shouldScrollToUpcoming && (hwState.filter === "all" || hwState.filter === "upcoming")) {
    hwState.shouldScrollToUpcoming = false;
    scrollToUpcomingGroup();
  }
}

function scrollToUpcomingGroup() {
  var container = document.getElementById("hwSessionList");
  if (!container) return;
  var target = container.querySelector('[data-hw-group="upcoming"]');
  if (!target) return;

  function doScroll() {
    var containerTop = container.getBoundingClientRect().top;
    var targetTop = target.getBoundingClientRect().top;
    var nextTop = container.scrollTop + (targetTop - containerTop) - 8;
    container.scrollTo({ top: Math.max(0, nextTop), behavior: "smooth" });
  }

  requestAnimationFrame(function () {
    requestAnimationFrame(doScroll);
  });
  setTimeout(doScroll, 120);
}

function syncHwFilterUI() {
  document.querySelectorAll("[data-hw-filter]").forEach(function (btn) {
    btn.classList.toggle("active", btn.getAttribute("data-hw-filter") === hwState.filter);
  });
}

function renderCourseList(className) {
  var list = document.getElementById("hwCourseList");
  if (!list) return;
  var data = hwClassData[className];
  if (!data || !data.courseAssignments.length) {
    list.innerHTML = '<div style="padding:24px;text-align:center;color:var(--muted)">Chưa có bài tập môn học.</div>';
    return;
  }

  list.innerHTML = data.courseAssignments.map(function (a, i) {
    return (
      '<div class="hw-course-row" data-open-grade="1" data-course-idx="' + i + '" role="button" tabindex="0">' +
      renderAssignIcon(a.type) +
      '<div><span class="hw-course-tag">' + a.tag + "</span>" +
      '<div class="hw-assign-title" style="margin-top:6px">' + a.title + "</div>" +
      '<small style="color:var(--muted);font-size:12px">Hạn: ' + a.deadline + "</small></div>" +
      '<span class="hw-assign-meta">' + renderAssignMeta(a) + "</span>" +
      '<button class="hw-assign-menu" type="button" aria-label="Tuỳ chọn">' + HW_MENU_SVG + "</button>" +
      "</div>"
    );
  }).join("");
}

function renderUrgentList(className) {
  var list = document.getElementById("hwUrgentList");
  if (!list) return;
  var items = (hwClassData[className] || {}).urgent || [];
  if (!items.length) {
    list.innerHTML = '<div style="font-size:13px;color:var(--muted);padding:8px 0">Không có việc cần xử lý gấp.</div>';
    return;
  }

  list.innerHTML = items.map(function (item) {
    return (
      '<div class="hw-urgent-item">' +
      '<div class="hw-urgent-top">' +
      '<span class="hw-urgent-badge hw-urgent-badge--' + item.badge + '">' + item.sessionLabel + "</span>" +
      '<span class="hw-urgent-countdown">' + item.countdown + "</span></div>" +
      "<b>" + item.title + "</b>" +
      '<div class="hw-urgent-meta">' + item.deadline + " · " + item.notSubmitted + " HS chưa nộp</div>" +
      "</div>"
    );
  }).join("");
}

function renderStudentList(className) {
  var list = document.getElementById("hwStudentList");
  if (!list) return;
  var students = (hwClassData[className] || {}).students || [];
  if (!students.length) {
    list.innerHTML = '<div style="font-size:13px;color:var(--muted);padding:8px 0">Không có học sinh cần chú ý.</div>';
    return;
  }

  list.innerHTML = students.map(function (s) {
    return (
      '<div class="hw-student-item">' +
      '<span class="hw-student-avatar" style="background:' + s.color + '">' + s.initials + "</span>" +
      '<div class="hw-student-body"><b>' + s.name + "</b><small>" + s.note + "</small></div>" +
      '<div class="hw-student-actions">' +
      '<button class="hw-icon-btn" type="button" title="Nhắn tin">' + HW_MSG_SVG + "</button>" +
      '<button class="hw-icon-btn" type="button" title="Xem hồ sơ">' + HW_EYE_SVG + "</button>" +
      '<button class="hw-icon-btn" type="button" title="Tuỳ chọn">' + HW_MENU_SVG + "</button>" +
      "</div></div>"
    );
  }).join("");
}

function bindCourseEvents() {
  var list = document.getElementById("hwCourseList");
  if (!list || list.dataset.hwCourseBound === "1") return;
  list.dataset.hwCourseBound = "1";

  list.addEventListener("click", function (e) {
    if (e.target.closest(".hw-assign-menu")) return;
    var row = e.target.closest("[data-open-grade][data-course-idx]");
    if (row) {
      openGradeFromCourse(parseInt(row.getAttribute("data-course-idx"), 10));
    }
  });
}

function bindSessionEvents() {
  var list = document.getElementById("hwSessionList");
  if (!list || list.dataset.hwBound === "1") return;
  list.dataset.hwBound = "1";

  list.addEventListener("click", function (e) {
    var addBtn = e.target.closest("[data-create-hw]");
    if (addBtn) {
      var sessionNum = parseInt(addBtn.getAttribute("data-session-num"), 10);
      var data = hwClassData[hwState.className];
      var session = data && data.sessions.find(function (s) { return s.num === sessionNum; });
      openCreateHomework({
        className: hwState.className,
        source: "session",
        sessionNum: sessionNum,
        sessionTitle: session ? session.title : "",
        sessionDate: session ? session.date : ""
      });
      return;
    }

    if (e.target.closest(".hw-assign-menu")) return;

    var gradeRow = e.target.closest("[data-open-grade][data-session-num]");
    if (gradeRow) {
      openGradeFromSession(
        parseInt(gradeRow.getAttribute("data-session-num"), 10),
        parseInt(gradeRow.getAttribute("data-assign-idx"), 10)
      );
      return;
    }

    var toggle = e.target.closest("[data-toggle-session]");
    if (toggle) {
      var num = parseInt(toggle.getAttribute("data-toggle-session"), 10);
      hwState.expandedSession = hwState.expandedSession === num ? null : num;
      renderSessionList(hwState.className);
      return;
    }
    if (e.target.closest("[data-hw-toggle-future]")) {
      hwState.futureExpanded = !hwState.futureExpanded;
      renderSessionList(hwState.className);
      return;
    }
    if (e.target.closest("[data-hw-expand-future]")) {
      hwState.futureExpanded = true;
      renderSessionList(hwState.className);
    }
  });
}

function renderHomeworkPage(className) {
  hwState.className = className;
  var sub = document.getElementById("hwSub");
  if (sub) sub.textContent = "Tổng quan bài tập lớp " + className;

  renderSessionList(className);
  renderCourseList(className);
  renderUrgentList(className);
  renderStudentList(className);
}

function setHwActiveTab(name) {
  hwState.activeTab = name;
  document.querySelectorAll("[data-hw-tab]").forEach(function (t) {
    var active = t.getAttribute("data-hw-tab") === name;
    t.classList.toggle("active", active);
    t.setAttribute("aria-selected", active ? "true" : "false");
  });
  document.querySelectorAll("[data-hw-view]").forEach(function (view) {
    view.classList.toggle("active", view.getAttribute("data-hw-view") === name);
  });
}

function onHomeworkClassChange(className) {
  hwState.filter = "all";
  hwState.expandedSession = null;
  hwState.futureExpanded = false;
  hwState.shouldScrollToUpcoming = true;
  syncHwFilterUI();
  renderHomeworkPage(className);
}

window.onHomeworkClassChange = onHomeworkClassChange;

window.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-hw-tab]").forEach(function (tab) {
    tab.addEventListener("click", function () {
      var name = tab.getAttribute("data-hw-tab");
      setHwActiveTab(name);
      if (name === "session") {
        hwState.shouldScrollToUpcoming = true;
        requestAnimationFrame(function () {
          requestAnimationFrame(scrollToUpcomingGroup);
        });
      }
    });
  });

  var createBtn = document.getElementById("hwCreateBtn");
  if (createBtn) {
    createBtn.addEventListener("click", function (e) {
      e.preventDefault();
      openCreateHomework({ className: hwState.className, source: "general" });
    });
  }

  bindSessionEvents();
  bindCourseEvents();

  document.querySelectorAll("[data-hw-filter]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      hwState.filter = btn.getAttribute("data-hw-filter");
      hwState.futureExpanded = false;
      hwState.expandedSession = null;
      hwState.shouldScrollToUpcoming = hwState.filter === "all" || hwState.filter === "upcoming";
      syncHwFilterUI();
      renderSessionList(hwState.className);
    });
  });

  var origSelect = window.selectClass;
  window.selectClass = function (el) {
    if (origSelect) origSelect(el);
    var name = el.querySelector(".cls");
    if (name) onHomeworkClassChange(name.textContent);
  };

  onHomeworkClassChange("Web Foundation K12");
});
