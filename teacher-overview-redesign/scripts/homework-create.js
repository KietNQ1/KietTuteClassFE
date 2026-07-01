var hcState = { filter: "all" };

var HC_CHECK_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>';
var HC_MENU_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>';

var HC_AI_STEPS = [
  { label: "Nhận diện văn bản (OCR)", status: "done" },
  { label: "Phân tích cấu trúc đề bài", status: "done" },
  { label: "Nhận diện câu hỏi trắc nghiệm", status: "done" },
  { label: "Phân loại câu hỏi và trích xuất nội dung", status: "pending" }
];

var HC_QUESTIONS = [
  {
    num: 1,
    type: "mc",
    points: 2,
    confidence: 95,
    text: "Phương trình x² − 5x + 6 = 0 có nghiệm là:",
    options: [
      { key: "A", text: "x = 1, x = 6" },
      { key: "B", text: "x = 2, x = 3", correct: true },
      { key: "C", text: "x = −2, x = −3" },
      { key: "D", text: "Vô nghiệm" }
    ]
  },
  {
    num: 2,
    type: "mc",
    points: 2,
    confidence: 92,
    text: "Phương trình x² − 4x + m = 0 có 2 nghiệm phân biệt khi:",
    options: [
      { key: "A", text: "m > 4" },
      { key: "B", text: "m < 4" },
      { key: "C", text: "m > −4", correct: true },
      { key: "D", text: "m = 4" }
    ]
  },
  {
    num: 3,
    type: "essay",
    points: 4,
    confidence: 88,
    text: "Giải hệ phương trình:\n\n2x + y = 5\n\nx − y = 1"
  },
  {
    num: 4,
    type: "mc",
    points: 2,
    confidence: 90,
    text: "Tập nghiệm của bất phương trình 2x − 3 > 0 là:",
    options: [
      { key: "A", text: "x > 3/2", correct: true },
      { key: "B", text: "x < 3/2" },
      { key: "C", text: "x ≥ 3/2" },
      { key: "D", text: "x ≤ 3/2" }
    ]
  },
  {
    num: 5,
    type: "essay",
    points: 3,
    confidence: 85,
    text: "Cho hàm số y = x² − 2x − 3. Tìm giá trị nhỏ nhất của hàm số và vẽ đồ thị."
  },
  {
    num: 6,
    type: "mc",
    points: 2,
    confidence: 94,
    text: "Phương trình |x − 2| = 3 có nghiệm:",
    options: [
      { key: "A", text: "x = 5 hoặc x = −1", correct: true },
      { key: "B", text: "x = 5" },
      { key: "C", text: "x = −1" },
      { key: "D", text: "Vô nghiệm" }
    ]
  },
  {
    num: 7,
    type: "mc",
    points: 2,
    confidence: 91,
    text: "Hệ phương trình { x + y = 4; x − y = 0 } có nghiệm:",
    options: [
      { key: "A", text: "(2; 2)", correct: true },
      { key: "B", text: "(4; 0)" },
      { key: "C", text: "(0; 4)" },
      { key: "D", text: "Vô nghiệm" }
    ]
  },
  {
    num: 8,
    type: "essay",
    points: 3,
    confidence: 87,
    text: "Giải và biện luận phương trình: x² − (m + 1)x + m = 0 theo tham số m."
  },
  {
    num: 9,
    type: "essay",
    points: 3,
    confidence: 86,
    text: "Một hình chữ nhật có chu vi 40 cm. Chiều dài hơn chiều rộng 4 cm. Tính diện tích hình chữ nhật."
  },
  {
    num: 10,
    type: "mc",
    points: 2,
    confidence: 93,
    text: "Đồ thị hàm số y = ax + b (a ≠ 0) là đường thẳng:",
    options: [
      { key: "A", text: "Song song với trục Ox" },
      { key: "B", text: "Song song với trục Oy" },
      { key: "C", text: "Cắt cả hai trục tọa độ", correct: true },
      { key: "D", text: "Đi qua gốc tọa độ" }
    ]
  },
  {
    num: 11,
    type: "mc",
    points: 2,
    confidence: 89,
    text: "Phương trình (x − 1)(x + 2) = 0 có nghiệm:",
    options: [
      { key: "A", text: "x = 1 hoặc x = −2", correct: true },
      { key: "B", text: "x = −1 hoặc x = 2" },
      { key: "C", text: "x = 1" },
      { key: "D", text: "x = 2" }
    ]
  },
  {
    num: 12,
    type: "mc",
    points: 2,
    confidence: 90,
    text: "Biểu thức √(x − 3) xác định khi:",
    options: [
      { key: "A", text: "x ≥ 3", correct: true },
      { key: "B", text: "x > 3" },
      { key: "C", text: "x ≤ 3" },
      { key: "D", text: "Mọi x ∈ ℝ" }
    ]
  }
];

function readCreateContext() {
  try {
    var raw = sessionStorage.getItem("tcCreateHwCtx");
    if (raw) return JSON.parse(raw);
  } catch (e) { /* ignore */ }
  return null;
}

function renderAiChecklist() {
  var list = document.getElementById("hcAiChecklist");
  if (!list) return;
  list.innerHTML = HC_AI_STEPS.map(function (step) {
    var icon = step.status === "done"
      ? '<span class="hc-ai-item-icon">' + HC_CHECK_SVG + "</span>"
      : '<span class="hc-ai-item-icon"><span class="hc-ai-spinner"></span></span>';
    return (
      '<div class="hc-ai-item ' + step.status + '">' +
      icon + step.label +
      "</div>"
    );
  }).join("");
}

function renderMcCard(q) {
  var opts = q.options.map(function (o) {
    var cls = o.correct ? " correct" : "";
    var check = o.correct
      ? '<span class="hc-q-opt-check">' + HC_CHECK_SVG + "</span>"
      : "";
    return (
      '<div class="hc-q-opt' + cls + '">' +
      '<span class="hc-q-opt-key">' + o.key + "</span>" +
      "<span>" + o.text + "</span>" + check +
      "</div>"
    );
  }).join("");

  return (
    '<div class="hc-q-options">' + opts + "</div>"
  );
}

function renderQuestionCard(q) {
  var typeLabel = q.type === "mc" ? "Trắc nghiệm" : "Tự luận";
  var badgeCls = q.type === "mc" ? "hc-q-badge--tn" : "hc-q-badge--tl";
  var body = q.type === "mc"
    ? renderMcCard(q)
    : '<p class="hc-q-text" style="white-space:pre-line;margin:0">' + q.text + "</p>";

  return (
    '<article class="hc-q-card" data-q-type="' + q.type + '">' +
    '<div class="hc-q-card-head">' +
    '<div class="hc-q-card-head-left">' +
    '<span class="hc-q-label">Câu ' + q.num + "</span>" +
    '<span class="hc-q-badge ' + badgeCls + '">' + typeLabel + "</span>" +
    '<span class="hc-q-meta">' + q.points + " điểm</span>" +
    '<span class="hc-q-confidence">Độ tin cậy: ' + q.confidence + "%</span>" +
    "</div>" +
    '<div class="hc-q-actions">' +
    '<button class="hc-q-edit" type="button">Chỉnh sửa</button>' +
    '<button class="hc-q-menu" type="button" aria-label="Tuỳ chọn">' + HC_MENU_SVG + "</button>" +
    "</div></div>" +
    (q.type === "mc" ? '<p class="hc-q-text">' + q.text + "</p>" + body : body) +
    "</article>"
  );
}

function filteredQuestions() {
  if (hcState.filter === "all") return HC_QUESTIONS;
  if (hcState.filter === "mc") return HC_QUESTIONS.filter(function (q) { return q.type === "mc"; });
  return HC_QUESTIONS.filter(function (q) { return q.type === "essay"; });
}

function renderQuestions() {
  var container = document.getElementById("hcQuestions");
  if (!container) return;
  var items = filteredQuestions();
  container.innerHTML =
    items.map(renderQuestionCard).join("") +
    '<button class="hc-add-q" type="button">' +
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>' +
    "Thêm câu hỏi thủ công</button>";
}

function applyContext(ctx) {
  if (!ctx) return;
  var sub = document.getElementById("hcSub");
  if (sub && ctx.sessionNum) {
    sub.textContent = "Giao bài nhanh cho Buổi " + ctx.sessionNum + (ctx.sessionTitle ? " · " + ctx.sessionTitle : "");
  }
  if (ctx.className) {
    var tags = document.getElementById("hcClassTags");
    if (tags) {
      tags.innerHTML =
        '<span class="hc-tag">' + ctx.className + "</span>" +
        '<button class="hc-tag-add" type="button">+ Thêm lớp</button>';
    }
    var title = document.getElementById("hcTitle");
    if (title && ctx.sessionTitle) {
      title.value = "Bài tập Buổi " + ctx.sessionNum + " – " + ctx.sessionTitle;
    }
  }
  if (ctx.sessionNum) {
    var session = document.getElementById("hcSession");
    if (session) {
      var opt = document.createElement("option");
      opt.selected = true;
      opt.textContent = "Buổi " + ctx.sessionNum + (ctx.sessionTitle ? " – " + ctx.sessionTitle : "");
      session.insertBefore(opt, session.firstChild);
    }
  }
}

function setActiveFilter(filter) {
  hcState.filter = filter;
  document.querySelectorAll("[data-hc-filter]").forEach(function (btn) {
    var active = btn.getAttribute("data-hc-filter") === filter;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-selected", active ? "true" : "false");
  });
  renderQuestions();
}

function bindEvents() {
  document.querySelectorAll("[data-hc-filter]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setActiveFilter(btn.getAttribute("data-hc-filter"));
    });
  });

  var publishBtn = document.getElementById("hcPublishBtn");
  if (publishBtn) {
    publishBtn.addEventListener("click", function () {
      window.location.href = "homework.html";
    });
  }
}

function initCreatePage() {
  applyContext(readCreateContext());
  renderAiChecklist();
  renderQuestions();
  bindEvents();
}

window.addEventListener("DOMContentLoaded", initCreatePage);
