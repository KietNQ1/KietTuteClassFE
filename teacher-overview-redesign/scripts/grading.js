var grState = {
  ctx: null,
  students: [],
  questions: [],
  maxScore: 10,
  selectedIndex: 0,
  filter: "all",
  search: ""
};

var GR_DEMO_COUNT = 10;

var GR_QUIZ_TEMPLATE = {
  questions: [
    {
      type: "mc",
      text: "Miền xác định của hàm số y = √(x − 1) là:",
      options: ["(−∞; +∞)", "[1; +∞)", "(1; +∞)", "[0; +∞)"],
      correctKey: "B",
      points: 1
    },
    {
      type: "mc",
      text: "Hàm số y = x² − 4x + 3 có giá trị nhỏ nhất bằng:",
      options: ["−1", "0", "1", "3"],
      correctKey: "A",
      points: 1
    },
    {
      type: "mc",
      text: "Hàm số y = −3x + 5 trên ℝ là hàm:",
      options: ["Đồng biến", "Nghịch biến", "Không đơn điệu", "Hằng số"],
      correctKey: "B",
      points: 1
    },
    {
      type: "mc",
      text: "Phương trình 2x² − 5x + 2 = 0 có nghiệm:",
      options: ["x = 2", "x = 1/2", "x = 2 hoặc x = 1/2", "Vô nghiệm"],
      correctKey: "C",
      points: 1
    },
    {
      type: "mc",
      text: "Đạo hàm của hàm số y = x³ − 3x là:",
      options: ["3x² − 3x", "3x² − 3", "x² − 3", "3x² + 3"],
      correctKey: "B",
      points: 1
    },
    {
      type: "essay",
      text: "Khảo sát và vẽ đồ thị hàm số y = x³ − 3x. Trình bày: miền xác định, đạo hàm, cực trị, bảng biến thiên và nhận xét đồ thị.",
      maxPoints: 5
    }
  ]
};

var GR_ESSAY_SAMPLES = {
  full:
    "1. Miền xác định: D = ℝ.\n\n" +
    "2. Đạo hàm: y′ = 3x² − 3 = 3(x² − 1).\n   Cho y′ = 0 ⇔ x = −1 hoặc x = 1.\n\n" +
    "3. Bảng biến thiên:\n" +
    "   • x < −1: y′ > 0 → hàm đồng biến\n" +
    "   • −1 < x < 1: y′ < 0 → hàm nghịch biến\n" +
    "   • x > 1: y′ > 0 → hàm đồng biến\n\n" +
    "4. Cực trị:\n" +
    "   • Cực đại: x = −1, y = 2\n" +
    "   • Cực tiểu: x = 1, y = −2\n\n" +
    "5. Đồ thị: Parabol 3 nhánh, cắt trục Ox tại (−√3; 0), (0; 0), (√3; 0). Đi qua (−2; −2) và (2; 2).",
  good:
    "MXĐ: D = ℝ.\ny′ = 3x² − 3. y′ = 0 khi x = ±1.\n\n" +
    "x < −1: đồng biến; −1 < x < 1: nghịch biến; x > 1: đồng biến.\n" +
    "CĐ (−1; 2), CT (1; −2).\n\n" +
    "Vẽ đồ thị qua O, (−√3; 0), (√3; 0). Nhánh phải đi lên, nhánh trái đi xuống rồi lên.",
  average:
    "Tập xác định: tất cả số thực.\nĐạo hàm y′ = 3x² − 3.\nGiải y′ = 0 được x = 1 và x = −1.\n\n" +
    "Tại x = −1 đạt max, x = 1 đạt min.\nEm vẽ đồ thị dạng chữ S qua gốc tọa độ.",
  weak:
    "MXĐ: R. y′ = 3x² − 3 = 0 ⇒ x = 1.\nHàm đồng biến rồi nghịch biến.\nEm vẽ như parabol lật ngược."
};

var GR_DEMO_STUDENTS = [
  {
    name: "Nguyễn Minh Anh", initials: "NA", color: "#6c8cff",
    status: "need", submittedAt: "13/06/2026 · 20:15",
    mc: ["B", "A", "B", "C", "B"],
    essayKey: "full", essayScore: null, essayComment: "",
    generalComment: ""
  },
  {
    name: "Trần Bảo Lan", initials: "TL", color: "#e85d75",
    status: "graded", submittedAt: "13/06/2026 · 19:42",
    mc: ["B", "C", "B", "C", "B"],
    essayKey: "good", essayScore: 4, essayComment: "Trình bày tốt, cần vẽ đồ thị rõ hơn.",
    generalComment: "Làm tốt phần trắc nghiệm, sai 1 câu."
  },
  {
    name: "Phạm Khánh Linh", initials: "PL", color: "#2f8f6b",
    status: "graded", submittedAt: "13/06/2026 · 20:01",
    mc: ["B", "A", "B", "C", "B"],
    essayKey: "full", essayScore: 4.5, essayComment: "Bài làm xuất sắc.",
    generalComment: "Hoàn thành đầy đủ và chính xác."
  },
  {
    name: "Lê Hoàng Nam", initials: "LN", color: "#7d5fd1",
    status: "late", submittedAt: "14/06/2026 · 23:45",
    mc: ["B", "A", "A", "C", "B"],
    essayKey: "good", essayScore: null, essayComment: "",
    generalComment: ""
  },
  {
    name: "Võ Thị Mai", initials: "VM", color: "#d98a2b",
    status: "graded", submittedAt: "13/06/2026 · 21:08",
    mc: ["B", "C", "B", "A", "A"],
    essayKey: "average", essayScore: 3.5, essayComment: "Thiếu bảng biến thiên chi tiết.",
    generalComment: "Cần ôn lại phương trình bậc hai."
  },
  {
    name: "Đặng Quốc Huy", initials: "DH", color: "#3b82f6",
    status: "need", submittedAt: "13/06/2026 · 20:33",
    mc: ["B", "A", "B", "C", "B"],
    essayKey: "good", essayScore: null, essayComment: "",
    generalComment: ""
  },
  {
    name: "Bùi Thu Hà", initials: "BH", color: "#ec4899",
    status: "graded", submittedAt: "13/06/2026 · 19:55",
    mc: ["B", "A", "B", "C", "A"],
    essayKey: "average", essayScore: 4, essayComment: "Sai đạo hàm ở câu TN nhưng tự luận ổn.",
    generalComment: "Cẩn thận hơn phần đạo hàm."
  },
  {
    name: "Ngô Văn Phúc", initials: "NP", color: "#14b8a6",
    status: "graded", submittedAt: "13/06/2026 · 20:22",
    mc: ["B", "A", "B", "C", "B"],
    essayKey: "full", essayScore: 4.5, essayComment: "",
    generalComment: "Bài làm rất tốt."
  },
  {
    name: "Hoàng Thị Trang", initials: "HT", color: "#f97316",
    status: "need", submittedAt: "13/06/2026 · 22:10",
    mc: ["B", "A", "B", "C", "B"],
    essayKey: "average", essayScore: null, essayComment: "",
    generalComment: ""
  },
  {
    name: "Đỗ Minh Tuấn", initials: "DT", color: "#6366f1",
    status: "graded", submittedAt: "13/06/2026 · 18:50",
    mc: ["A", "A", "B", "C", "B"],
    essayKey: "weak", essayScore: 2.5, essayComment: "Khảo sát chưa đủ bước, đồ thị chưa chính xác.",
    generalComment: "Cần xem lại cách khảo sát hàm bậc ba."
  }
];

function readGradeContext() {
  try {
    var raw = sessionStorage.getItem("tcGradeCtx");
    if (raw) return JSON.parse(raw);
  } catch (e) { /* ignore */ }
  return {
    className: "Toán 9A",
    source: "session",
    sessionNum: 5,
    sessionTitle: "Hàm số bậc nhất",
    sessionDate: "16/06/2026",
    assignIndex: 2,
    title: "Khảo sát và vẽ đồ thị hàm số",
    type: "quiz",
    submitted: 10,
    total: 30,
    needGrade: 4
  };
}

function buildMcAnswer(q, selectedKey) {
  var correct = selectedKey === q.correctKey;
  return {
    type: "mc",
    selected: selectedKey,
    correct: correct,
    points: correct ? q.points : 0
  };
}

function buildSubmissionFromDemo(demo) {
  var tpl = GR_QUIZ_TEMPLATE;
  var answers = tpl.questions.map(function (q, qi) {
    if (q.type === "mc") {
      return buildMcAnswer(q, demo.mc[qi]);
    }
    return {
      type: "essay",
      body: GR_ESSAY_SAMPLES[demo.essayKey] || GR_ESSAY_SAMPLES.average,
      score: demo.essayScore,
      comment: demo.essayComment || ""
    };
  });
  return { answers: answers };
}

function buildStudents() {
  return GR_DEMO_STUDENTS.map(function (demo) {
    var submission = buildSubmissionFromDemo(demo);
    var student = {
      name: demo.name,
      initials: demo.initials,
      color: demo.color,
      status: demo.status,
      submittedAt: demo.submittedAt,
      generalComment: demo.generalComment || "",
      submission: submission
    };
    if (demo.status === "graded") {
      student.score = calcTotalForStudent(student);
    }
    return student;
  });
}

function calcTotalForStudent(student) {
  var sum = 0;
  student.submission.answers.forEach(function (a, i) {
    var q = GR_QUIZ_TEMPLATE.questions[i];
    if (!q) return;
    if (q.type === "mc") sum += a.points || 0;
    else if (a.score != null) sum += a.score;
  });
  return sum;
}

function getQuestionsForCtx(ctx) {
  if (ctx.type === "quiz") return GR_QUIZ_TEMPLATE.questions;
  return GR_QUIZ_TEMPLATE.questions;
}

function calcMcTotal(student) {
  var sum = 0;
  student.submission.answers.forEach(function (a, i) {
    if (grState.questions[i] && grState.questions[i].type === "mc") sum += a.points || 0;
  });
  return sum;
}

function calcEssayTotal(student) {
  var sum = 0;
  student.submission.answers.forEach(function (a, i) {
    if (grState.questions[i] && grState.questions[i].type === "essay" && a.score != null) {
      sum += a.score;
    }
  });
  return sum;
}

function calcTotal(student) {
  return calcMcTotal(student) + calcEssayTotal(student);
}

function getGradedCount() {
  return grState.students.filter(function (s) { return s.status === "graded"; }).length;
}

function statusLabel(s) {
  if (s.status === "need") return '<span class="gr-student-status gr-student-status--need">Cần chấm</span>';
  if (s.status === "late") return '<span class="gr-student-status gr-student-status--late">Nộp muộn</span>';
  return '<span class="gr-student-status gr-student-status--graded">' + (s.score != null ? s.score.toFixed(1) : calcTotal(s).toFixed(1)) + "</span>";
}

function filteredStudents() {
  return grState.students.filter(function (s) {
    if (grState.filter === "need" && s.status !== "need" && s.status !== "late") return false;
    if (grState.search) {
      var q = grState.search.toLowerCase();
      if (s.name.toLowerCase().indexOf(q) === -1) return false;
    }
    return true;
  });
}

function renderStudentList() {
  var list = document.getElementById("grStudentList");
  if (!list) return;

  var filtered = filteredStudents();

  list.innerHTML = filtered.map(function (s) {
    var idx = grState.students.indexOf(s);
    var active = idx === grState.selectedIndex ? " active" : "";
    return (
      '<div class="gr-student-row' + active + '" data-student-idx="' + idx + '">' +
      '<span class="gr-student-avatar" style="background:' + s.color + '">' + s.initials + "</span>" +
      '<div class="gr-student-info"><b>' + s.name + "</b><small>" + s.submittedAt + "</small></div>" +
      statusLabel(s) +
      "</div>"
    );
  }).join("");
}

function renderMcQuestion(q, ans, num) {
  var keys = ["A", "B", "C", "D"];
  var opts = q.options.map(function (opt, i) {
    var key = keys[i];
    var cls = "";
    if (key === ans.selected) cls = ans.correct ? " selected-correct" : " selected-wrong";
    return (
      '<div class="gr-q-option' + cls + '">' +
      '<span class="gr-q-option-key">' + key + "</span>" +
      "<span>" + opt + "</span></div>"
    );
  }).join("");

  return (
    '<div class="gr-question">' +
    '<div class="gr-q-head">' +
    '<div class="gr-q-head-left"><span class="gr-q-num">Câu ' + num + '</span><span class="gr-q-type gr-q-type--tn">TN</span></div>' +
    '<div class="gr-q-result ' + (ans.correct ? "gr-q-result--ok" : "gr-q-result--bad") + '">' +
    (ans.correct ? "Đúng · +" + q.points : "Sai") +
    "<small>Tự động chấm</small></div></div>" +
    '<p class="gr-q-text">' + q.text + "</p>" +
    '<div class="gr-q-options">' + opts + "</div>" +
    '<div class="gr-q-note"><b>Đáp án đúng:</b> ' + q.correctKey + " — " + q.options[keys.indexOf(q.correctKey)] + "</div>" +
    "</div>"
  );
}

function renderEssayQuestion(q, ans, num, studentIdx) {
  var scoreVal = ans.score != null ? ans.score : "";
  return (
    '<div class="gr-question" data-essay-q="' + (num - 1) + '">' +
    '<div class="gr-q-head">' +
    '<div class="gr-q-head-left"><span class="gr-q-num">Câu ' + num + '</span><span class="gr-q-type gr-q-type--tl">Tự luận</span></div>' +
    (ans.score != null ? '<div class="gr-q-result gr-q-result--ok">' + ans.score + "/" + q.maxPoints + "<small>Đã chấm</small></div>" : "") +
    "</div>" +
    '<p class="gr-q-text">' + q.text + "</p>" +
    '<div class="gr-q-essay-body">' + ans.body + "</div>" +
    '<div class="gr-q-grade-row">' +
    "<label>Điểm:</label>" +
    '<div class="gr-q-score-input">' +
    '<input type="number" min="0" max="' + q.maxPoints + '" step="0.5" data-essay-score data-student="' + studentIdx + '" data-q-idx="' + (num - 1) + '" value="' + scoreVal + '" placeholder="0" />' +
    "<span>/ " + q.maxPoints + "</span></div></div>" +
    '<div class="gr-q-comment"><textarea data-essay-comment data-student="' + studentIdx + '" data-q-idx="' + (num - 1) + '" placeholder="Nhận xét cho câu này...">' + (ans.comment || "") + "</textarea></div>" +
    "</div>"
  );
}

function renderWorkArea() {
  var student = grState.students[grState.selectedIndex];
  if (!student) return;

  var head = document.getElementById("grWorkHead");
  var questions = document.getElementById("grQuestions");
  if (!head || !questions) return;

  var prevDisabled = grState.selectedIndex <= 0 ? " disabled" : "";
  var nextDisabled = grState.selectedIndex >= grState.students.length - 1 ? " disabled" : "";

  head.innerHTML =
    '<span class="gr-student-avatar" style="background:' + student.color + '">' + student.initials + "</span>" +
    '<div class="gr-work-head-info"><b>' + student.name + "</b>" +
    '<div class="gr-work-head-meta">' +
    "<span>Nộp: " + student.submittedAt + "</span>" +
    (student.status === "late" ? '<span class="gr-tag-late">Nộp muộn</span>' : "") +
    "</div></div>" +
    '<div class="gr-work-nav">' +
    '<button type="button" data-gr-prev' + prevDisabled + ' aria-label="Học sinh trước"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg></button>' +
    '<button type="button" data-gr-next' + nextDisabled + ' aria-label="Học sinh sau"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></button>' +
    "</div>";

  var html = "";
  grState.questions.forEach(function (q, i) {
    var ans = student.submission.answers[i];
    if (q.type === "mc") html += renderMcQuestion(q, ans, i + 1);
    else html += renderEssayQuestion(q, ans, i + 1, grState.selectedIndex);
  });
  questions.innerHTML = html;

  var general = document.getElementById("grGeneralComment");
  if (general) general.value = student.generalComment || "";

  renderScorePanel(student);
}

function renderScorePanel(student) {
  var mc = calcMcTotal(student);
  var essay = calcEssayTotal(student);
  var total = mc + essay;
  var maxMc = grState.questions.filter(function (q) { return q.type === "mc"; }).reduce(function (s, q) { return s + q.points; }, 0);
  var maxEssay = grState.questions.filter(function (q) { return q.type === "essay"; }).reduce(function (s, q) { return s + q.maxPoints; }, 0);

  var totalEl = document.getElementById("grTotalScore");
  var maxEl = document.getElementById("grTotalMax");
  if (totalEl) totalEl.textContent = total > 0 || student.status === "graded" ? total.toFixed(1) : "—";
  if (maxEl) maxEl.textContent = "/ " + grState.maxScore + " điểm";

  var breakdown = document.getElementById("grBreakdown");
  if (breakdown) {
    breakdown.innerHTML =
      '<div class="gr-breakdown-row"><span>Trắc nghiệm</span><b class="ok">' + mc + "/" + maxMc + "</b></div>" +
      '<div class="gr-breakdown-row"><span>Tự luận</span><b class="accent">' + (essay > 0 ? essay.toFixed(1) : "—") + "/" + maxEssay + "</b></div>";
  }

  var detail = document.getElementById("grDetailRows");
  if (detail) {
    detail.innerHTML = grState.questions.map(function (q, i) {
      var ans = student.submission.answers[i];
      var pts = q.type === "mc" ? (ans.points || 0) + "/" + q.points : (ans.score != null ? ans.score + "/" + q.maxPoints : "—/" + q.maxPoints);
      return '<div class="gr-detail-row"><span>Câu ' + (i + 1) + "</span><span>" + pts + "</span></div>";
    }).join("");
  }
}

function renderProgress() {
  var graded = getGradedCount();
  var total = grState.students.length;
  var label = document.getElementById("grProgressLabel");
  var fill = document.getElementById("grProgressFill");
  var hint = document.getElementById("grProgressHint");
  if (label) label.textContent = graded + "/" + total + " đã chấm";
  if (fill) fill.style.width = total ? Math.round((graded / total) * 100) + "%" : "0%";
  if (hint) {
    var need = grState.students.filter(function (s) { return s.status === "need" || s.status === "late"; }).length;
    hint.textContent = need > 0 ? need + " bài còn cần chấm" : "Đã chấm xong tất cả";
  }
}

function renderHeader() {
  var ctx = grState.ctx;
  var title = document.getElementById("grTitle");
  var sub = document.getElementById("grSub");
  if (title) title.textContent = "Chấm bài: " + ctx.title;
  if (sub) {
    var parts = [ctx.className];
    if (ctx.source === "session") parts.push("Buổi " + ctx.sessionNum + " · " + ctx.sessionTitle);
    else parts.push("Bài tập môn học");
    if (ctx.sessionDate) parts.push(ctx.sessionDate);
    sub.textContent = parts.join(" · ");
  }
  document.title = "TuteClass · Chấm bài · " + ctx.title;
}

function selectStudent(idx) {
  if (idx < 0 || idx >= grState.students.length) return;
  grState.selectedIndex = idx;
  renderStudentList();
  renderWorkArea();
}

function gradeAndNext() {
  var student = grState.students[grState.selectedIndex];
  if (!student) return;

  var essayInputs = document.querySelectorAll("[data-essay-score]");
  essayInputs.forEach(function (input) {
    var qIdx = parseInt(input.getAttribute("data-q-idx"), 10);
    var val = parseFloat(input.value);
    if (!isNaN(val)) student.submission.answers[qIdx].score = val;
  });

  var commentInputs = document.querySelectorAll("[data-essay-comment]");
  commentInputs.forEach(function (ta) {
    var qIdx = parseInt(ta.getAttribute("data-q-idx"), 10);
    student.submission.answers[qIdx].comment = ta.value;
  });

  var general = document.getElementById("grGeneralComment");
  if (general) student.generalComment = general.value;

  student.score = calcTotal(student);
  student.status = "graded";

  renderProgress();
  renderStudentList();
  renderWorkArea();

  var nextNeed = grState.students.findIndex(function (s, i) {
    return i > grState.selectedIndex && (s.status === "need" || s.status === "late");
  });
  if (nextNeed === -1) {
    nextNeed = grState.students.findIndex(function (s) { return s.status === "need" || s.status === "late"; });
  }
  if (nextNeed !== -1 && nextNeed !== grState.selectedIndex) {
    selectStudent(nextNeed);
  }
}

function bindEvents() {
  document.getElementById("grStudentList").addEventListener("click", function (e) {
    var row = e.target.closest("[data-student-idx]");
    if (row) selectStudent(parseInt(row.getAttribute("data-student-idx"), 10));
  });

  document.querySelectorAll("[data-gr-filter]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      grState.filter = btn.getAttribute("data-gr-filter");
      document.querySelectorAll("[data-gr-filter]").forEach(function (b) {
        b.classList.toggle("active", b === btn);
      });
      renderStudentList();
    });
  });

  var search = document.getElementById("grStudentSearch");
  if (search) {
    search.addEventListener("input", function () {
      grState.search = search.value.trim();
      renderStudentList();
    });
  }

  document.getElementById("grWorkHead").addEventListener("click", function (e) {
    if (e.target.closest("[data-gr-prev]")) selectStudent(grState.selectedIndex - 1);
    if (e.target.closest("[data-gr-next]")) selectStudent(grState.selectedIndex + 1);
  });

  document.getElementById("grQuestions").addEventListener("input", function (e) {
    if (e.target.matches("[data-essay-score]")) {
      renderScorePanel(grState.students[grState.selectedIndex]);
    }
  });

  document.getElementById("grSubmitBtn").addEventListener("click", gradeAndNext);
}

function initGradingPage() {
  grState.ctx = readGradeContext();
  grState.questions = getQuestionsForCtx(grState.ctx);
  grState.maxScore = grState.questions.reduce(function (s, q) {
    return s + (q.type === "mc" ? q.points : q.maxPoints);
  }, 0);
  grState.students = buildStudents();

  var firstNeed = grState.students.findIndex(function (s) { return s.status === "need" || s.status === "late"; });
  grState.selectedIndex = firstNeed !== -1 ? firstNeed : 0;

  renderHeader();
  renderProgress();
  renderStudentList();
  renderWorkArea();
  bindEvents();
}

window.addEventListener("DOMContentLoaded", initGradingPage);
