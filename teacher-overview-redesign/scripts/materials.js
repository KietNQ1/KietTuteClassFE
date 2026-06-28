var matCourseData = {
  "Web Foundation K12": [
    { cat: "docs", ext: "pdf", label: "Sách", title: "Head First HTML & CSS", meta: "Sách tham khảo · PDF · 18.2 MB · 02/06/2026" },
    { cat: "docs", ext: "pdf", label: "Sách", title: "Giáo trình Web Foundation K12", meta: "Giáo trình chính · PDF · 24.6 MB · 28/05/2026" },
    { cat: "link", title: "MDN Web Docs – Tra cứu HTML/CSS/JS", meta: "Tài liệu tham khảo trực tuyến · 15/05/2026", url: "https://developer.mozilla.org" },
    { cat: "docs", ext: "pdf", label: "Tài liệu", title: "Checklist dự án cuối kỳ", meta: "Hướng dẫn làm bài · PDF · 1.2 MB · 10/06/2026" },
    { cat: "docs", ext: "pptx", label: "Slide", title: "Bộ slide tổng hợp cả môn", meta: "Slide giảng dạy · PPTX · 8.4 MB · 20/06/2026" },
    { cat: "media", mediaType: "image", title: "Sơ đồ cấu trúc HTML", meta: "PNG · 1.4 MB · 05/06/2026", color: "#6c8cff" },
    { cat: "media", mediaType: "video", title: "Video giới thiệu Flexbox", meta: "MP4 · 12 phút · 18/06/2026", color: "#7d5fd1" }
  ],
  "Toán 9A": [
    { cat: "docs", ext: "pdf", label: "Sách", title: "Bài tập Toán nâng cao lớp 9", meta: "Tập sách bài tập · PDF · 15.8 MB · 01/06/2026" },
    { cat: "docs", ext: "pdf", label: "Sách", title: "Giáo trình Toán 9 – Kết nối tri thức", meta: "Sách giáo khoa · PDF · 22.1 MB · 20/05/2026" },
    { cat: "docs", ext: "pdf", label: "Tài liệu", title: "Đề cương ôn tập giữa kỳ", meta: "Tài liệu ôn tập · PDF · 2.4 MB · 12/06/2026" },
    { cat: "docs", ext: "xlsx", label: "Bảng", title: "Bảng công thức Toán 9", meta: "Excel · XLSX · 0.6 MB · 08/06/2026" },
    { cat: "link", title: "Kho đề thi Toán 9 – Violet.vn", meta: "Ngân hàng đề · 08/06/2026", url: "https://violet.vn" },
    { cat: "link", title: "Khan Academy – Đại số lớp 9", meta: "Video & bài tập · 01/06/2026", url: "https://vi.khanacademy.org" },
    { cat: "media", mediaType: "image", title: "Sơ đồ tư duy chương 2", meta: "PNG · 2.1 MB · 10/06/2026", color: "#2f8f6b" },
    { cat: "media", mediaType: "image", title: "Minh họa parabol", meta: "JPG · 890 KB · 15/06/2026", color: "#d98a2b" },
    { cat: "media", mediaType: "video", title: "Ôn tập phương trình bậc hai", meta: "MP4 · 18 phút · 19/06/2026", color: "#7d5fd1" }
  ],
  "Vật lý 9A": [
    { cat: "docs", ext: "pdf", label: "Sách", title: "Vật lý 9 – Chân trời tri thức", meta: "Sách giáo khoa · PDF · 19.5 MB · 18/05/2026" },
    { cat: "docs", ext: "pdf", label: "Tài liệu", title: "Bảng công thức Vật lý 9", meta: "PDF · 0.8 MB · 05/06/2026" },
    { cat: "media", mediaType: "video", title: "Thí nghiệm định luật I Newton", meta: "MP4 · 8 phút · 12/06/2026", color: "#3b82f6" }
  ],
  "Ngữ văn 9A": [
    { cat: "docs", ext: "pdf", label: "Sách", title: "Tập làm văn nghị luận xã hội", meta: "Sách tham khảo · PDF · 6.2 MB · 25/05/2026" },
    { cat: "docs", ext: "pdf", label: "Sách", title: "Ngữ văn 9 – Cánh diều", meta: "Sách giáo khoa · PDF · 20.3 MB · 10/05/2026" },
    { cat: "link", title: "Thư viện số – Truyện ngắn Nam Cao", meta: "Link tham khảo · 14/06/2026", url: "https://example.com" }
  ]
};

var BADGE_CLASSES = ["mat-badge-violet", "mat-badge-green", "mat-badge-amber", "mat-badge-blue"];

var TOAN9A_TITLES = [
  "Phương trình bậc nhất",
  "Hệ thức lượng",
  "Ôn tập chương 1",
  "Bất phương trình bậc nhất",
  "Hàm số bậc nhất",
  "Hệ phương trình bậc nhất",
  "Hàm số bậc nhất — luyện tập",
  "Phương trình bậc hai",
  "Định lý Viète",
  "Giải bài toán bằng PT bậc hai",
  "Hệ thức lượng nâng cao",
  "Bất phương trình bậc hai",
  "Ôn tập chương 2",
  "Hệ bất phương trình bậc nhất",
  "Hàm số bậc hai",
  "Đồ thị parabol",
  "Phương trình quy về PT bậc hai",
  "Bài toán thực tế — Đại số",
  "Ôn tập giữa học kỳ II",
  "Kiểm tra 15 phút chương 3",
  "Hệ thức lượng — tổng hợp",
  "Phương trình chứa ẩn",
  "Bất phương trình một ẩn",
  "Ôn tập chương 4",
  "Hình học tọa độ",
  "Phương trình đường thẳng",
  "Phương trình đường tròn",
  "Tọa độ giao điểm",
  "Ôn tập hình học tọa độ",
  "Thống kê — thu thập dữ liệu",
  "Biểu đồ và bảng tần số",
  "Số trung bình cộng",
  "Ôn tập thống kê",
  "Tổng ôn cuối năm I",
  "Đề thi thử số 1",
  "Tổng kết & hướng dẫn ôn thi"
];

function padSessionNum(n) {
  return n < 10 ? "0" + n : "" + n;
}

function hasMaterials(s) {
  return (s.links || 0) + (s.files || 0) + (s.images || 0) > 0;
}

function buildToan9ASessions() {
  var sessions = [];
  var startDate = new Date(2026, 5, 8);
  for (var i = 1; i <= 36; i++) {
    var taught = i <= 7;
    var scheduled = i <= 12;
    var d = scheduled ? new Date(startDate) : null;
    if (d) d.setDate(startDate.getDate() + (i - 1) * 2);
    var dateStr = d
      ? pad2(d.getDate()) + "/" + pad2(d.getMonth() + 1) + "/" + d.getFullYear()
      : null;

    var links = 0;
    var files = 0;
    var images = 0;
    var status;

    if (i <= 5) {
      links = 2 + (i % 3);
      files = 1 + (i % 2);
      images = 2 + (i % 3);
      status = "taught_ready";
    } else if (i <= 7) {
      status = "taught_empty";
    } else if (i === 8) {
      links = 2;
      files = 1;
      images = 3;
      status = "upcoming_ready";
    } else {
      status = scheduled ? "future" : "future_unscheduled";
    }

    sessions.push({
      num: i,
      numStr: padSessionNum(i),
      title: TOAN9A_TITLES[i - 1] || "Buổi " + i,
      date: dateStr,
      scheduled: scheduled,
      taught: taught,
      links: links,
      files: files,
      images: images,
      status: status,
      shared: status === "upcoming_ready" || (status === "taught_ready" && i <= 5)
    });
  }
  return sessions;
}

function pad2(n) {
  return n < 10 ? "0" + n : "" + n;
}

function buildSimpleSessions(items) {
  return items.map(function (item, idx) {
    return {
      num: idx + 1,
      numStr: item.num || padSessionNum(idx + 1),
      title: item.title,
      date: item.meta ? item.meta.split(" · ")[0] : null,
      scheduled: true,
      taught: true,
      links: item.links || 0,
      files: item.files || 0,
      images: item.images || 0,
      status: "taught_ready",
      shared: true
    };
  });
}

var matSessionData = {
  "Toán 9A": buildToan9ASessions(),
  "Web Foundation K12": buildSimpleSessions([
    { num: "01", title: "Giới thiệu HTML & cấu trúc trang", meta: "08/06/2026", links: 3, files: 2, images: 4 },
    { num: "02", title: "CSS cơ bản & bố cục Flexbox", meta: "10/06/2026", links: 2, files: 1, images: 3 },
    { num: "03", title: "Responsive & Media queries", meta: "12/06/2026", links: 4, files: 2, images: 2 },
    { num: "04", title: "JavaScript DOM cơ bản", meta: "15/06/2026", links: 1, files: 1, images: 5 },
    { num: "05", title: "Form & xử lý sự kiện", meta: "18/06/2026", links: 3, files: 2, images: 3 },
    { num: "06", title: "Dự án mini: Landing page", meta: "20/06/2026", links: 2, files: 1, images: 1 }
  ]),
  "Vật lý 9A": buildSimpleSessions([
    { num: "01", title: "Chuyển động thẳng đều", meta: "09/06/2026", links: 2, files: 1, images: 2 },
    { num: "02", title: "Định luật I Newton", meta: "11/06/2026", links: 1, files: 2, images: 3 },
    { num: "03", title: "Lực ma sát & lực cản", meta: "14/06/2026", links: 3, files: 1, images: 1 }
  ]),
  "Ngữ văn 9A": buildSimpleSessions([
    { num: "01", title: "Thơ ca dân gian", meta: "07/06/2026", links: 2, files: 1, images: 2 },
    { num: "02", title: "Văn bản nghị luận xã hội", meta: "13/06/2026", links: 1, files: 2, images: 1 },
    { num: "03", title: "Luyện viết đoạn mở bài", meta: "19/06/2026", links: 2, files: 1, images: 3 }
  ])
};

var matClassMeta = {
  "Toán 9A": { totalSessions: 36, grouped: true },
  "Web Foundation K12": { totalSessions: 6, grouped: false },
  "Vật lý 9A": { totalSessions: 3, grouped: false },
  "Ngữ văn 9A": { totalSessions: 3, grouped: false }
};

var matTypeLabels = { book: "Sách", link: "Link", doc: "Tài liệu", slide: "Slide" };
var matTypeClass = { book: "mat-type-book", link: "mat-type-link", doc: "mat-type-doc", media: "mat-type-media" };

var matCatBadge = {
  media: { cls: "mat-type-media", text: "Ảnh/Video" },
  docs: { cls: "mat-type-doc", text: "Tài liệu" },
  link: { cls: "mat-type-link", text: "Link" }
};

var pillSvg = {
  link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
  doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>',
  image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>'
};

var matState = {
  className: "Toán 9A",
  activeTab: "session",
  filter: "all",
  futureExpanded: false,
  selectedSession: null,
  shouldScrollToUpcoming: true,
  courseView: "list",
  courseCategory: "all"
};

var matPinnedData = {
  "Toán 9A": [
    { courseTitle: "Giáo trình Toán 9 – Kết nối tri thức", label: "Sách GK" },
    { courseTitle: "Bài tập Toán nâng cao lớp 9", label: "SBT" },
    { courseTitle: "Khan Academy – Đại số lớp 9", label: "Link hay dùng" },
    { courseTitle: "Bảng công thức Toán 9", label: "Bảng công thức" }
  ],
  "Web Foundation K12": [
    { courseTitle: "Giáo trình Web Foundation K12", label: "Giáo trình" },
    { courseTitle: "MDN Web Docs – Tra cứu HTML/CSS/JS", label: "MDN" },
    { courseTitle: "Head First HTML & CSS", label: "Sách tham khảo" }
  ],
  "Vật lý 9A": [
    { courseTitle: "Vật lý 9 – Chân trời tri thức", label: "Sách GK" },
    { courseTitle: "Bảng công thức Vật lý 9", label: "Công thức" }
  ],
  "Ngữ văn 9A": [
    { courseTitle: "Ngữ văn 9 – Cánh diều", label: "Sách GK" },
    { courseTitle: "Tập làm văn nghị luận xã hội", label: "TL tham khảo" },
    { courseTitle: "Thư viện số – Truyện ngắn Nam Cao", label: "Thư viện số" }
  ]
};

var matRecentActivity = {
  "Toán 9A": [
    { when: "Hôm qua", time: "17:30", kind: "upload", text: "Thêm 3 ảnh vào <b>Buổi 08 · Phương trình bậc hai</b>", sessionNum: 8 },
    { when: "2 ngày trước", time: "09:15", kind: "session", text: "Upload slide vào <b>Buổi 05 · Hàm số bậc nhất</b>", sessionNum: 5 },
    { when: "3 ngày trước", time: "", kind: "course", text: "Thêm <b>Đề cương ôn tập giữa kỳ</b> vào kho môn", courseTitle: "Đề cương ôn tập giữa kỳ" },
    { when: "5 ngày trước", time: "", kind: "upload", text: "Thêm video <b>Ôn tập phương trình bậc hai</b> vào kho môn", courseTitle: "Ôn tập phương trình bậc hai" },
    { when: "1 tuần trước", time: "", kind: "link", text: "Ghim link <b>Khan Academy</b> vào kho môn", courseTitle: "Khan Academy – Đại số lớp 9" }
  ],
  "Web Foundation K12": [
    { when: "Hôm qua", time: "14:00", kind: "upload", text: "Thêm video <b>Video giới thiệu Flexbox</b> vào kho môn", courseTitle: "Video giới thiệu Flexbox" },
    { when: "3 ngày trước", time: "", kind: "session", text: "Upload tài liệu vào <b>Buổi 06 · Dự án mini</b>", sessionNum: 6 },
    { when: "5 ngày trước", time: "", kind: "course", text: "Thêm <b>Bộ slide tổng hợp cả môn</b> vào kho môn", courseTitle: "Bộ slide tổng hợp cả môn" }
  ],
  "Vật lý 9A": [
    { when: "2 ngày trước", time: "11:20", kind: "session", text: "Thêm ảnh thí nghiệm vào <b>Buổi 02 · Định luật I Newton</b>", sessionNum: 2 },
    { when: "1 tuần trước", time: "", kind: "course", text: "Upload <b>Bảng công thức Vật lý 9</b> vào kho môn", courseTitle: "Bảng công thức Vật lý 9" }
  ],
  "Ngữ văn 9A": [
    { when: "Hôm qua", time: "16:45", kind: "link", text: "Thêm link <b>Thư viện số – Truyện ngắn Nam Cao</b>", courseTitle: "Thư viện số – Truyện ngắn Nam Cao" },
    { when: "4 ngày trước", time: "", kind: "session", text: "Upload tài liệu vào <b>Buổi 03 · Luyện viết đoạn mở bài</b>", sessionNum: 3 }
  ]
};

var MAT_PINNED_SVG = {
  link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
  media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>'
};

var MAT_ACTIVITY_SVG = {
  upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',
  session: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
  course: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'
};

var MAT_MEDIA_COLORS = ["#6c8cff", "#2f8f6b", "#7d5fd1", "#d98a2b", "#e85d75", "#3b82f6"];
var matDelSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>';

function computeSessionStats(sessions, meta) {
  var total = meta && meta.totalSessions ? meta.totalSessions : sessions.length;
  var taught = sessions.filter(function (s) { return s.taught; }).length;
  var withMat = sessions.filter(function (s) { return hasMaterials(s); }).length;
  var missing = sessions.filter(function (s) { return s.status === "taught_empty"; }).length;
  var upcoming = sessions.filter(function (s) {
    return s.status === "upcoming_ready" || s.status === "upcoming_empty";
  });
  var next = upcoming[0] || null;
  return { total: total, taught: taught, withMat: withMat, missing: missing, next: next };
}

function renderSessionSummary(className) {
  var el = document.getElementById("matSessionSummary");
  if (!el) return;
  var sessions = matSessionData[className] || [];
  var meta = matClassMeta[className] || {};
  var stats = computeSessionStats(sessions, meta);

  if (!meta.grouped) {
    el.innerHTML =
      '<span><b>' + sessions.length + '</b> buổi</span>' +
      '<span class="mat-sum-dot">·</span>' +
      '<span><b>' + stats.withMat + '</b> buổi có tài liệu</span>';
    el.classList.toggle("mat-session-summary-hidden", sessions.length === 0);
    return;
  }

  var nextLine = stats.next
    ? 'Buổi tiếp theo: <b>Buổi ' + stats.next.numStr + '</b>' +
      (stats.next.date ? ' · ' + stats.next.date : "")
    : "";

  el.innerHTML =
    '<span><b>' + stats.taught + '/' + stats.total + '</b> buổi đã dạy</span>' +
    '<span class="mat-sum-dot">·</span>' +
    '<span><b>' + stats.withMat + '</b> buổi có tài liệu</span>' +
    (nextLine ? '<span class="mat-sum-dot">·</span><span class="mat-sum-next">' + nextLine + '</span>' : "");
  el.classList.remove("mat-session-summary-hidden");
}

function sessionBadgeClass(num) {
  return BADGE_CLASSES[(num - 1) % BADGE_CLASSES.length];
}

function renderSessionPills(s) {
  return (
    '<div class="mat-resource-pills">' +
    '<span class="mat-pill mat-pill-link">' + pillSvg.link + s.links + '</span>' +
    '<span class="mat-pill mat-pill-doc">' + pillSvg.doc + s.files + '</span>' +
    '<span class="mat-pill mat-pill-image">' + pillSvg.image + s.images + '</span>' +
    '</div>'
  );
}

function renderNoMaterialsNotice() {
  return '<span class="mat-no-materials">Không có tài liệu</span>';
}

function renderSessionRow(s) {
  var rowClass = "mat-session-row";
  if (matState.selectedSession === s.num) rowClass += " is-selected";
  var tags = "";
  var meta = "";
  var side = "";
  var pills = "";

  if (s.status === "upcoming_ready") {
    rowClass += " mat-session-upcoming";
    tags = '<span class="mat-tag mat-tag-ready">Sắp dạy · Đã chuẩn bị</span>';
    meta = (s.date || "—") + " · Học sinh có thể xem trước";
    pills = renderSessionPills(s);
    side = pills;
  } else if (s.status === "upcoming_empty") {
    rowClass += " mat-session-upcoming";
    meta = (s.date || "—");
    side = renderNoMaterialsNotice();
  } else if (s.status === "taught_ready") {
    rowClass += " mat-session-ready";
    meta = (s.date || "—") + " · " + s.links + " link · " + s.files + " file · " + s.images + " ảnh";
    side = renderSessionPills(s);
  } else if (s.status === "taught_empty") {
    rowClass += " mat-session-ready";
    meta = s.date || "—";
    side = renderNoMaterialsNotice();
  } else if (s.status === "future") {
    rowClass += " mat-session-future";
    meta = s.date || "—";
    side = renderNoMaterialsNotice();
  } else {
    rowClass += " mat-session-future mat-session-unscheduled";
    meta = "Chưa lên lịch";
    side = renderNoMaterialsNotice();
  }

  var tagHtml = tags ? '<div class="mat-session-tags">' + tags + "</div>" : "";

  return (
    '<div class="' + rowClass + '" data-session-num="' + s.num + '" data-status="' + s.status + '">' +
    '<div class="mat-session-badge ' + sessionBadgeClass(s.num) + '">Buổi<small>' + s.numStr + "</small></div>" +
    "<div class=\"mat-session-main\">" +
    '<div class="mat-session-title">' + s.title + "</div>" +
    tagHtml +
    '<span class="mat-session-meta">' + meta + "</span>" +
    "</div>" +
    side +
    (hasMaterials(s)
      ? '<span class="mat-row-chev"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg></span>'
      : '<span class="mat-row-chev mat-row-chev-muted"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg></span>') +
    "</div>"
  );
}

function matchesFilter(s, filter) {
  if (filter === "all") return true;
  if (filter === "taught") return s.status === "taught_ready" || s.status === "taught_empty";
  if (filter === "upcoming") return s.status === "upcoming_ready" || s.status === "upcoming_empty";
  if (filter === "future") return s.status === "future" || s.status === "future_unscheduled";
  return true;
}

function renderSessionGroup(title, sessions, opts) {
  opts = opts || {};
  if (!sessions.length) return "";

  var rows = sessions.map(renderSessionRow).join("");
  var collapseBtn = "";
  if (opts.collapsible && opts.hiddenCount > 0) {
    collapseBtn =
      '<button class="mat-group-more" type="button" data-mat-expand-future>' +
      "Hiện thêm " + opts.hiddenCount + " buổi" +
      "</button>";
  }

  return (
    '<section class="mat-group' + (opts.highlight ? " mat-group-highlight" : "") + '"' +
    (opts.groupKey ? ' data-mat-group="' + opts.groupKey + '"' : "") + ">" +
    '<div class="mat-group-head">' +
    "<h4>" + title + ' <span class="mat-group-count">(' + sessions.length + ")</span></h4>" +
    (opts.collapsible
      ? '<button class="mat-group-toggle" type="button" data-mat-toggle-future aria-expanded="' +
        (matState.futureExpanded ? "true" : "false") + '">' +
        (matState.futureExpanded ? "Thu gọn" : "Mở rộng") +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg></button>'
      : "") +
    "</div>" +
    '<div class="mat-group-body">' + rows + collapseBtn + "</div>" +
    "</section>"
  );
}

function renderGroupedSessionList(className) {
  var sessions = matSessionData[className] || [];
  var filter = matState.filter;
  var upcoming = sessions.filter(function (s) {
    return (s.status === "upcoming_ready" || s.status === "upcoming_empty") && matchesFilter(s, filter);
  }).sort(function (a, b) { return a.num - b.num; });
  var taughtAll = sessions.filter(function (s) {
    return (s.status === "taught_empty" || s.status === "taught_ready") && matchesFilter(s, filter);
  }).sort(function (a, b) { return b.num - a.num; });
  var futureAll = sessions.filter(function (s) {
    return (s.status === "future" || s.status === "future_unscheduled") && matchesFilter(s, filter);
  }).sort(function (a, b) { return b.num - a.num; });

  var futureVisible = matState.futureExpanded ? futureAll : futureAll.slice(-3);
  var futureHidden = matState.futureExpanded ? 0 : Math.max(0, futureAll.length - 3);

  var html = "";
  html += renderSessionGroup(
    "Chưa dạy",
    futureVisible,
    { groupKey: "future", collapsible: futureAll.length > 0, hiddenCount: futureHidden }
  );
  html += renderSessionGroup("Sắp tới", upcoming, { groupKey: "upcoming", highlight: true });
  html += renderSessionGroup("Đã dạy", taughtAll, { groupKey: "taught" });

  if (!html.replace(/\s/g, "")) {
    return '<div class="mat-empty-filter">Không có buổi nào khớp bộ lọc.</div>';
  }
  return html;
}

function renderFlatSessionList(className) {
  var sessions = (matSessionData[className] || []).slice().sort(function (a, b) { return b.num - a.num; });
  var filter = matState.filter;
  var filtered = sessions.filter(function (s) { return matchesFilter(s, filter); });
  if (!filtered.length) {
    return '<div class="mat-empty-filter">Không có buổi nào khớp bộ lọc.</div>';
  }
  return filtered.map(renderSessionRow).join("");
}

function renderSessionList(className) {
  var list = document.getElementById("matSessionList");
  if (!list) return;
  var meta = matClassMeta[className] || {};
  matState.className = className;

  renderSessionSummary(className);

  if (meta.grouped) {
    list.className = "mat-session-groups";
    list.innerHTML = renderGroupedSessionList(className);
  } else {
    list.className = "mat-session-list";
    list.innerHTML = renderFlatSessionList(className);
  }

  bindSessionListEvents(list);

  if (matState.shouldScrollToUpcoming && meta.grouped && (matState.filter === "all" || matState.filter === "upcoming")) {
    matState.shouldScrollToUpcoming = false;
    scrollToUpcomingGroup();
  }
}

function scrollToUpcomingGroup() {
  var container = document.getElementById("matSessionList");
  if (!container) return;
  var target = container.querySelector('[data-mat-group="upcoming"]');
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

function findSession(className, num) {
  var sessions = matSessionData[className] || [];
  for (var i = 0; i < sessions.length; i++) {
    if (sessions[i].num === num) return sessions[i];
  }
  return null;
}

function getSessionMaterials(className, session) {
  if (!hasMaterials(session)) {
    return { media: [], docs: [], links: [] };
  }
  if (className === "Toán 9A" && session.num === 8) {
    return {
      media: [
        { type: "image", label: "Dạng Δ > 0", color: "#6c8cff" },
        { type: "image", label: "Đồ thị parabol", color: "#2f8f6b" },
        { type: "video", label: "Video giảng bài", color: "#7d5fd1" }
      ],
      docs: [
        { name: "Slide Phương trình bậc hai.pptx", ext: "pptx", size: "1.8 MB" },
        { name: "Bài tập về nhà buổi 08.docx", ext: "docx", size: "620 KB" }
      ],
      links: [
        { title: "Khan Academy – PT bậc hai", url: "https://vi.khanacademy.org" },
        { title: "Desmos – Vẽ parabol", url: "https://www.desmos.com/calculator" }
      ]
    };
  }
  var media = [];
  var imgCount = session.images || 0;
  var i;
  for (i = 0; i < imgCount && i < 6; i++) {
    media.push({
      type: i === 2 && imgCount > 2 ? "video" : "image",
      label: "Ảnh " + (i + 1),
      color: MAT_MEDIA_COLORS[i % MAT_MEDIA_COLORS.length]
    });
  }
  var docs = [];
  for (i = 0; i < (session.files || 0); i++) {
    var exts = ["pdf", "docx", "pptx"];
    docs.push({
      name: "Tài liệu buổi " + session.numStr + " – " + (i + 1) + "." + exts[i % 3],
      ext: exts[i % 3],
      size: (400 + i * 120) + " KB"
    });
  }
  var links = [];
  for (i = 0; i < (session.links || 0); i++) {
    links.push({
      title: "Link tham khảo " + (i + 1),
      url: "https://example.com/ref-" + session.num + "-" + (i + 1)
    });
  }
  return { media: media, docs: docs, links: links };
}

function matRenderMedia(container, items) {
  container.innerHTML = "";
  if (!items.length) {
    container.innerHTML = '<div class="lm-empty-hint">Chưa có ảnh hoặc video.</div>';
    return;
  }
  items.forEach(function (item) {
    var el = document.createElement("div");
    el.className = "lm-media-item" + (item.type === "video" ? " is-video" : "");
    el.title = item.label;
    var inner = '<div class="lm-media-bg" style="background:linear-gradient(135deg,' + item.color + "," + item.color + 'cc)">' + item.label + "</div>";
    if (item.type === "video") {
      inner += '<span class="lm-media-play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>';
    }
    el.innerHTML = inner;
    container.appendChild(el);
  });
}

function matRenderDocs(container, items) {
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
      '<div class="lm-doc-icon ' + ext + '">' + ext + "</div>" +
      '<div class="txt"><b>' + item.name + "</b><small>" + (item.size || "") + "</small></div>" +
      '<button class="lm-del" type="button" aria-label="Xoá tài liệu">' + matDelSvg + "</button>";
    container.appendChild(row);
  });
}

function matRenderLinks(container, items) {
  container.innerHTML = "";
  if (!items.length) {
    container.innerHTML = '<div class="lm-empty-hint">Chưa có link tham khảo.</div>';
    return;
  }
  items.forEach(function (item) {
    var row = document.createElement("div");
    row.className = "lm-link-item";
    row.innerHTML =
      '<a class="lm-link-body" href="' + item.url + '" target="_blank" rel="noopener noreferrer">' +
      '<div class="lm-link-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></div>' +
      '<div class="txt"><b>' + item.title + "</b><small>" + item.url + "</small></div></a>" +
      '<button class="lm-del" type="button" aria-label="Xoá link">' + matDelSvg + "</button>";
    container.appendChild(row);
  });
}

function matSwitchMatView(viewName) {
  document.querySelectorAll("#matLmFilters .lm-mat-btn").forEach(function (btn) {
    var active = btn.getAttribute("data-mat") === viewName;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-selected", active ? "true" : "false");
  });
  document.getElementById("matLmMedia").classList.toggle("active", viewName === "media");
  document.getElementById("matLmDocs").classList.toggle("active", viewName === "docs");
  document.getElementById("matLmLinks").classList.toggle("active", viewName === "links");
  document.getElementById("matLmUploadZone").hidden = viewName === "links";
  document.getElementById("matLmLinkAdd").hidden = viewName !== "links";
}

function openSessionDrawer(session, className) {
  var drawer = document.querySelector("[data-mat-session-drawer]");
  var overlay = document.querySelector("[data-mat-drawer-overlay]");
  if (!drawer || !session) return;

  matState.selectedSession = session.num;
  document.querySelectorAll(".mat-session-row").forEach(function (row) {
    row.classList.toggle("is-selected", parseInt(row.getAttribute("data-session-num"), 10) === session.num);
  });

  document.getElementById("matDrawerClass").textContent = className;
  document.getElementById("matDrawerTitle").textContent = "Buổi " + session.numStr + " · " + session.title;
  document.getElementById("matDrawerDate").textContent = session.date || "Chưa lên lịch";

  var materials = getSessionMaterials(className, session);
  matSwitchMatView("media");
  matRenderMedia(document.getElementById("matLmMediaGrid"), materials.media);
  matRenderDocs(document.getElementById("matLmDocsList"), materials.docs);
  matRenderLinks(document.getElementById("matLmLinksList"), materials.links);

  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
  if (overlay) overlay.classList.add("open");
}

function closeSessionDrawer() {
  var drawer = document.querySelector("[data-mat-session-drawer]");
  var overlay = document.querySelector("[data-mat-drawer-overlay]");
  if (drawer) {
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
  }
  if (overlay) overlay.classList.remove("open");
  matState.selectedSession = null;
  document.querySelectorAll(".mat-session-row.is-selected").forEach(function (row) {
    row.classList.remove("is-selected");
  });
}

function bindSessionListEvents(list) {
  list.querySelectorAll("[data-mat-toggle-future]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      matState.futureExpanded = !matState.futureExpanded;
      renderSessionList(matState.className);
    });
  });
  list.querySelectorAll("[data-mat-expand-future]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      matState.futureExpanded = true;
      renderSessionList(matState.className);
    });
  });

  list.querySelectorAll(".mat-session-row").forEach(function (row) {
    row.addEventListener("click", function () {
      var num = parseInt(row.getAttribute("data-session-num"), 10);
      var session = findSession(matState.className, num);
      if (session) openSessionDrawer(session, matState.className);
    });
  });
}

function filterCourseItems(items) {
  if (matState.courseCategory === "all") return items;
  return items.filter(function (item) { return item.cat === matState.courseCategory; });
}

function courseItemBadge(item) {
  if (item.cat === "media") return matCatBadge.media;
  if (item.cat === "link") return matCatBadge.link;
  return { cls: "mat-type-book", text: item.label || "Tài liệu" };
}

function renderCourseListRow(item) {
  var badge = courseItemBadge(item);
  return (
    '<div class="mat-resource-row" data-course-cat="' + item.cat + '">' +
    '<span class="mat-type-badge ' + badge.cls + '">' + badge.text + '</span>' +
    '<div><div class="mat-resource-title">' + item.title + '</div>' +
    '<span class="mat-resource-meta">' + item.meta + '</span></div>' +
    '<span class="mat-row-chev"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg></span>' +
    '</div>'
  );
}

function renderCourseGridThumb(item) {
  if (item.cat === "media") {
    var video = item.mediaType === "video";
    return (
      '<div class="mat-course-tile-thumb mat-course-tile-thumb--media' + (video ? " is-video" : "") + '">' +
      '<div class="mat-course-tile-bg" style="background:linear-gradient(135deg,' + (item.color || "#6c8cff") + "," + (item.color || "#6c8cff") + 'bb)"></div>' +
      (video
        ? '<span class="mat-course-tile-play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>'
        : '<span class="mat-course-tile-media-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg></span>') +
      '</div>'
    );
  }
  if (item.cat === "link") {
    return (
      '<div class="mat-course-tile-thumb mat-course-tile-thumb--link">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>' +
      '</div>'
    );
  }
  var ext = (item.ext || "pdf").toLowerCase();
  return (
    '<div class="mat-course-tile-thumb mat-course-tile-thumb--doc">' +
    '<span class="lm-doc-icon ' + ext + '">' + ext + '</span>' +
    '</div>'
  );
}

function renderCourseListGrid(item) {
  return (
    '<div class="mat-course-tile" data-course-cat="' + item.cat + '" title="' + item.title + '">' +
    renderCourseGridThumb(item) +
    '<div class="mat-course-tile-name">' + item.title + '</div>' +
    '<div class="mat-course-tile-meta">' + item.meta + '</div>' +
    '</div>'
  );
}

function renderCourseList(className) {
  var list = document.getElementById("matCourseList");
  if (!list) return;
  var items = filterCourseItems(matCourseData[className] || []);
  var isGrid = matState.courseView === "grid";

  list.classList.toggle("mat-resource-list", !isGrid);
  list.classList.toggle("mat-course-grid", isGrid);

  if (!items.length) {
    list.innerHTML = '<div class="mat-empty-filter">Không có tài liệu trong loại này.</div>';
    return;
  }

  list.innerHTML = isGrid
    ? items.map(renderCourseListGrid).join("")
    : items.map(renderCourseListRow).join("");
}

function syncCourseToolbarUI() {
  document.querySelectorAll("[data-course-view]").forEach(function (btn) {
    var active = btn.getAttribute("data-course-view") === matState.courseView;
    btn.classList.toggle("active", active);
  });
  document.querySelectorAll("[data-course-cat]").forEach(function (btn) {
    var active = btn.getAttribute("data-course-cat") === matState.courseCategory;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-selected", active ? "true" : "false");
  });
}

function findCourseItem(className, title) {
  var items = matCourseData[className] || [];
  for (var i = 0; i < items.length; i++) {
    if (items[i].title === title) return items[i];
  }
  return null;
}

function pinnedIconMeta(item) {
  if (item.cat === "link") return { cls: "mat-pinned-icon--link", svg: MAT_PINNED_SVG.link };
  if (item.cat === "media") return { cls: "mat-pinned-icon--media", svg: MAT_PINNED_SVG.media };
  if (item.label === "Sách" || (item.meta && item.meta.indexOf("Sách") >= 0)) {
    return { cls: "mat-pinned-icon--book", svg: MAT_PINNED_SVG.book };
  }
  return { cls: "mat-pinned-icon--doc", svg: MAT_PINNED_SVG.doc };
}

function renderPinnedList(className) {
  var list = document.getElementById("matPinnedList");
  if (!list) return;
  var pins = matPinnedData[className] || [];
  if (!pins.length) {
    list.innerHTML = '<div class="mat-side-empty">Chưa có tài liệu ghim.</div>';
    return;
  }
  list.innerHTML = pins.map(function (pin) {
    var item = findCourseItem(className, pin.courseTitle);
    var icon = item ? pinnedIconMeta(item) : { cls: "mat-pinned-icon--doc", svg: MAT_PINNED_SVG.doc };
    return (
      '<button class="mat-pinned-item" type="button" data-pinned-title="' + pin.courseTitle + '">' +
      '<span class="mat-pinned-icon ' + icon.cls + '">' + icon.svg + "</span>" +
      '<span class="mat-pinned-body"><b>' + pin.label + "</b>" +
      "<small>" + pin.courseTitle + "</small></span></button>"
    );
  }).join("");
}

function renderActivityList(className) {
  var list = document.getElementById("matActivityList");
  if (!list) return;
  var entries = matRecentActivity[className] || [];
  if (!entries.length) {
    list.innerHTML = '<div class="mat-side-empty">Chưa có hoạt động gần đây.</div>';
    return;
  }
  list.innerHTML = entries.map(function (entry, idx) {
    var when = entry.when + (entry.time ? " · " + entry.time : "");
    var kind = entry.kind || "course";
    var actionAttr = entry.sessionNum || entry.courseTitle ? ' data-activity-index="' + idx + '"' : "";
    return (
      '<div class="mat-activity-item"' + actionAttr + '>' +
      '<span class="mat-activity-dot mat-activity-dot--' + kind + '">' + (MAT_ACTIVITY_SVG[kind] || MAT_ACTIVITY_SVG.course) + "</span>" +
      '<div class="mat-activity-body">' +
      '<span class="mat-activity-when">' + when + "</span>" +
      '<p class="mat-activity-text">' + entry.text + "</p></div></div>"
    );
  }).join("");
}

function renderMatSidebar(className) {
  renderPinnedList(className);
  renderActivityList(className);
}

function setMatActiveTab(name) {
  matState.activeTab = name;
  document.querySelectorAll("[data-mat-tab]").forEach(function (t) {
    var active = t.getAttribute("data-mat-tab") === name;
    t.classList.toggle("active", active);
    t.setAttribute("aria-selected", active ? "true" : "false");
  });
  document.querySelectorAll("[data-mat-view]").forEach(function (view) {
    view.classList.toggle("active", view.getAttribute("data-mat-view") === name);
  });
}

function openPinnedItem(className, courseTitle) {
  var item = findCourseItem(className, courseTitle);
  if (!item) return;
  setMatActiveTab("course");
  closeSessionDrawer();
  matState.courseCategory = item.cat;
  syncCourseToolbarUI();
  renderCourseList(className);
  if (item.url) window.open(item.url, "_blank", "noopener,noreferrer");
}

function handleActivityClick(entry) {
  if (!entry) return;
  if (entry.sessionNum) {
    setMatActiveTab("session");
    closeSessionDrawer();
    if (matState.filter !== "all") {
      matState.filter = "all";
      document.querySelectorAll("[data-mat-filter]").forEach(function (btn) {
        btn.classList.toggle("active", btn.getAttribute("data-mat-filter") === "all");
      });
      renderSessionList(matState.className);
    }
    var session = findSession(matState.className, entry.sessionNum);
    if (session) openSessionDrawer(session, matState.className);
  } else if (entry.courseTitle) {
    openPinnedItem(matState.className, entry.courseTitle);
  }
}

function bindMatSidebarEvents() {
  var pinnedList = document.getElementById("matPinnedList");
  if (pinnedList) {
    pinnedList.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-pinned-title]");
      if (!btn) return;
      openPinnedItem(matState.className, btn.getAttribute("data-pinned-title"));
    });
  }
  var activityList = document.getElementById("matActivityList");
  if (activityList) {
    activityList.addEventListener("click", function (e) {
      var row = e.target.closest("[data-activity-index]");
      if (!row) return;
      var idx = parseInt(row.getAttribute("data-activity-index"), 10);
      var entries = matRecentActivity[matState.className] || [];
      handleActivityClick(entries[idx]);
    });
  }
}

function onMaterialsClassChange(className) {
  var courseLabel = document.getElementById("matCourseLabel");
  if (courseLabel) courseLabel.textContent = className;
  matState.filter = "all";
  matState.futureExpanded = false;
  matState.shouldScrollToUpcoming = true;
  matState.courseCategory = "all";
  closeSessionDrawer();
  document.querySelectorAll("[data-mat-filter]").forEach(function (btn) {
    btn.classList.toggle("active", btn.getAttribute("data-mat-filter") === "all");
  });
  var filtersEl = document.getElementById("matSessionFilters");
  if (filtersEl) {
    filtersEl.classList.toggle("mat-filters-hidden", !(matClassMeta[className] || {}).grouped);
  }
  renderCourseList(className);
  syncCourseToolbarUI();
  renderSessionList(className);
  renderMatSidebar(className);
}

window.onMaterialsClassChange = onMaterialsClassChange;

window.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-mat-tab]").forEach(function (tab) {
    tab.addEventListener("click", function () {
      var name = tab.getAttribute("data-mat-tab");
      setMatActiveTab(name);
      if (name === "session") {
        matState.shouldScrollToUpcoming = true;
        requestAnimationFrame(function () {
          requestAnimationFrame(scrollToUpcomingGroup);
        });
      } else {
        closeSessionDrawer();
      }
    });
  });

  bindMatSidebarEvents();

  document.querySelectorAll("#matLmFilters .lm-mat-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      matSwitchMatView(btn.getAttribute("data-mat"));
    });
  });

  document.querySelectorAll("[data-close-mat-drawer]").forEach(function (btn) {
    btn.addEventListener("click", closeSessionDrawer);
  });
  var matOverlay = document.querySelector("[data-mat-drawer-overlay]");
  if (matOverlay) matOverlay.addEventListener("click", closeSessionDrawer);

  document.getElementById("matLmUploadBtn").addEventListener("click", function (e) {
    e.stopPropagation();
    document.getElementById("matLmFileInput").click();
  });
  document.getElementById("matLmUploadZone").addEventListener("click", function () {
    document.getElementById("matLmFileInput").click();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeSessionDrawer();
  });

  document.querySelectorAll("[data-course-view]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      matState.courseView = btn.getAttribute("data-course-view");
      syncCourseToolbarUI();
      renderCourseList(matState.className);
    });
  });

  document.querySelectorAll("[data-course-cat]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      matState.courseCategory = btn.getAttribute("data-course-cat");
      syncCourseToolbarUI();
      renderCourseList(matState.className);
    });
  });

  syncCourseToolbarUI();

  document.querySelectorAll("[data-mat-filter]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      matState.filter = btn.getAttribute("data-mat-filter");
      document.querySelectorAll("[data-mat-filter]").forEach(function (b) {
        b.classList.toggle("active", b === btn);
      });
      matState.shouldScrollToUpcoming = matState.filter === "all" || matState.filter === "upcoming";
      renderSessionList(matState.className);
    });
  });

  var origSelect = window.selectClass;
  window.selectClass = function (el) {
    if (origSelect) origSelect(el);
    var name = el.querySelector(".cls");
    if (name) onMaterialsClassChange(name.textContent);
  };

  onMaterialsClassChange("Toán 9A");
});
