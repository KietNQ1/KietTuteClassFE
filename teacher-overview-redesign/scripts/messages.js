var msgState = {
  className: "Toán 9A",
  search: "",
  activeId: "lan",
  infoTab: "overview",
  unreadOnly: false
};

var MSG_AVATAR_COLORS = ["#5b7cfa", "#e85d75", "#2f8f6b", "#f59e0b", "#8b5cf6", "#06b6d4"];

var MSG_DL_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>';
var MSG_READ_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>';
var MSG_MORE_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>';
var MSG_EDIT_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>';
var MSG_BACK_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>';
var MSG_WARN_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';
var MSG_ALERT_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';

var MSG_QUICK_REPLIES = ["Đã nhận được", "Giải thích thêm", "Gửi bài tập", "Hẹn trao đổi", "Khác"];

function msgInitials(name) {
  var parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[parts.length - 2][0] + parts[parts.length - 1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

function msgAvatarColor(id) {
  var sum = 0;
  for (var i = 0; i < id.length; i++) sum += id.charCodeAt(i);
  return MSG_AVATAR_COLORS[sum % MSG_AVATAR_COLORS.length];
}

var msgClassData = {
  "Toán 9A": {
    subject: "Toán học",
    conversations: [
      {
        id: "lan",
        name: "Lan Nguyễn",
        type: "student",
        initials: "LN",
        tag: { text: "Chưa hiểu bài", tone: "violet" },
        preview: "Em không hiểu câu 5 bài 2 ạ...",
        time: "09:23",
        unread: 2,
        studentId: "HS0123",
        online: true,
        stats: { attendance: "93%", homework: "18/20", gpa: "8.2" },
        alert: "1 bài tập chưa nộp",
        warning: "Nộp bài trễ 2 lần trong tuần qua",
        note: "Em học tốt phần đại số, cần luyện thêm hình học không gian.",
        activities: [
          { icon: "violet", label: "Hỏi bài", time: "Hôm nay · 09:20" },
          { icon: "green", label: "Nộp bài", time: "Hôm qua · 18:45" },
          { icon: "blue", label: "Phản hồi từ GV", time: "19/05 · 14:30" }
        ],
        messages: [
          { date: "20/05/2024", items: [
            { from: "in", text: "Cô ơi em không hiểu câu 5 bài 2 phần phương trình ạ.", time: "09:15" },
            { from: "in", text: "Em có gửi bài làm ạ.", time: "09:18", file: { name: "bt_toan_phuong_trinh.pdf", size: "245 KB", type: "pdf" } },
            { from: "out", text: "Cô đã nhận bài của em. Câu 5 em thử đặt ẩn số x rồi rút gọn vế trái về dạng ax + b nhé.", time: "09:22", read: true },
            { from: "out", text: "Cô gửi em lời giải mẫu câu 5.", time: "09:23", read: true, file: { name: "Loi_giai_cau_5_bai_2.pdf", size: "128 KB", type: "doc" } }
          ]}
        ]
      },
      {
        id: "minh",
        name: "Minh Trần",
        type: "student",
        initials: "MT",
        tag: { text: "Bài tập", tone: "blue" },
        preview: "Em nộp bài tập buổi 15 ạ",
        time: "08:45",
        unread: 1,
        studentId: "HS0087",
        online: false,
        stats: { attendance: "96%", homework: "19/20", gpa: "8.8" },
        alert: null,
        warning: null,
        note: "Học sinh chăm chỉ, thường xuyên nộp bài đúng hạn.",
        activities: [
          { icon: "green", label: "Nộp bài", time: "Hôm nay · 08:40" },
          { icon: "blue", label: "Phản hồi từ GV", time: "18/05 · 10:00" }
        ],
        messages: [
          { date: "20/05/2024", items: [
            { from: "in", text: "Cô ơi em nộp bài tập buổi 15 ạ.", time: "08:45" }
          ]}
        ]
      },
      {
        id: "hoa",
        name: "Hoa Lê",
        type: "student",
        initials: "HL",
        tag: { text: "Điểm số", tone: "amber" },
        preview: "Em muốn hỏi điểm kiểm tra 15 phút",
        time: "Hôm qua",
        unread: 0,
        studentId: "HS0156",
        online: false,
        stats: { attendance: "88%", homework: "16/20", gpa: "7.5" },
        alert: "2 bài tập chưa nộp",
        warning: "Điểm TB giảm so với tháng trước",
        note: "Cần nhắc nhở về việc ôn tập trước kiểm tra.",
        activities: [
          { icon: "violet", label: "Hỏi điểm", time: "Hôm qua · 16:20" }
        ],
        messages: [
          { date: "19/05/2024", items: [
            { from: "in", text: "Cô ơi em muốn hỏi điểm bài kiểm tra 15 phút ạ.", time: "16:20" }
          ]}
        ]
      },
      {
        id: "duc",
        name: "Đức Phạm",
        type: "student",
        initials: "ĐP",
        tag: { text: "Chưa hiểu bài", tone: "violet" },
        preview: "Em hỏi về hệ phương trình",
        time: "18/05",
        unread: 0,
        studentId: "HS0201",
        online: true,
        stats: { attendance: "91%", homework: "17/20", gpa: "7.9" },
        alert: null,
        warning: null,
        note: "",
        activities: [],
        messages: [
          { date: "18/05/2024", items: [
            { from: "in", text: "Cô ơi em không hiểu cách giải hệ phương trình ạ.", time: "14:10" },
            { from: "out", text: "Em thử dùng phương pháp thế nhé, cô sẽ giải thích thêm buổi sau.", time: "15:30", read: true }
          ]}
        ]
      }
    ]
  },
  "Web Foundation K12": {
    subject: "Lập trình web",
    conversations: [
      {
        id: "khanh",
        name: "Khánh Ngô",
        type: "student",
        initials: "KN",
        tag: { text: "Bài tập", tone: "blue" },
        preview: "Em gặp lỗi khi chạy JavaScript",
        time: "10:15",
        unread: 3,
        studentId: "HS0301",
        online: true,
        stats: { attendance: "95%", homework: "12/14", gpa: "8.5" },
        alert: null,
        warning: null,
        note: "Có năng khiếu lập trình, cần bài tập nâng cao.",
        activities: [
          { icon: "violet", label: "Hỏi bài", time: "Hôm nay · 10:10" }
        ],
        messages: [
          { date: "20/05/2024", items: [
            { from: "in", text: "Cô ơi em chạy code JavaScript bị lỗi undefined ạ.", time: "10:15" }
          ]}
        ]
      }
    ]
  },
  "Vật lý 9A": {
    subject: "Vật lý",
    conversations: []
  },
  "Ngữ văn 9A": {
    subject: "Ngữ văn",
    conversations: []
  }
};

function getMsgClassData() {
  return msgClassData[msgState.className] || { subject: "", conversations: [] };
}

function getActiveConversation() {
  var data = getMsgClassData();
  for (var i = 0; i < data.conversations.length; i++) {
    if (data.conversations[i].id === msgState.activeId) return data.conversations[i];
  }
  return data.conversations[0] || null;
}

function getFilteredConversations() {
  var data = getMsgClassData();
  var list = data.conversations.slice();
  if (msgState.unreadOnly) list = list.filter(function (c) { return c.unread > 0; });
  if (msgState.search.trim()) {
    var q = msgState.search.trim().toLowerCase();
    list = list.filter(function (c) {
      return c.name.toLowerCase().indexOf(q) !== -1 || c.preview.toLowerCase().indexOf(q) !== -1;
    });
  }
  return list;
}

function renderConvList() {
  var container = document.getElementById("msgConvList");
  if (!container) return;
  var list = getFilteredConversations();
  if (!list.length) {
    container.innerHTML = '<p style="padding:24px 18px;color:var(--muted);font-size:13px;text-align:center">Chưa có hội thoại</p>';
    return;
  }
  container.innerHTML = list.map(function (c) {
    var active = c.id === msgState.activeId ? " active" : "";
    var unread = c.unread > 0 ? '<span class="msg-conv-unread">' + c.unread + "</span>" : "";
    return (
      '<div class="msg-conv-item' + active + '" data-conv-id="' + c.id + '">' +
        '<div class="msg-conv-avatar" style="background:' + msgAvatarColor(c.id) + '">' + c.initials + "</div>" +
        '<div class="msg-conv-top">' +
          '<span class="msg-conv-name">' + c.name + "</span>" +
          '<span class="msg-conv-tag msg-conv-tag--' + c.tag.tone + '">' + c.tag.text + "</span>" +
        "</div>" +
        '<div class="msg-conv-preview">' + c.preview + "</div>" +
        '<span class="msg-conv-time">' + c.time + "</span>" +
        unread +
      "</div>"
    );
  }).join("");
}

function renderFileCard(file) {
  var iconClass = file.type === "pdf" ? "msg-file-icon--pdf" : "msg-file-icon--doc";
  var label = file.type === "pdf" ? "PDF" : "DOC";
  return (
    '<div class="msg-file-card">' +
      '<div class="msg-file-icon ' + iconClass + '">' + label + "</div>" +
      '<div class="msg-file-body"><b>' + file.name + "</b><small>" + file.size + "</small></div>" +
      '<button class="msg-file-dl" type="button" title="Tải xuống">' + MSG_DL_SVG + "</button>" +
    "</div>"
  );
}

function renderChatHead(conv) {
  var head = document.getElementById("msgChatHead");
  if (!head) return;
  if (!conv) {
    head.innerHTML = "";
    return;
  }
  var meta = "Lớp " + msgState.className.replace(/^[^\s]+\s/, "") + " · Mã HS: " + conv.studentId;
  head.innerHTML =
    '<button class="msg-chat-back" type="button" id="msgChatBack" title="Quay lại">' + MSG_BACK_SVG + "</button>" +
    '<div class="msg-chat-head-avatar" style="background:' + msgAvatarColor(conv.id) + '">' + conv.initials + "</div>" +
    '<div class="msg-chat-head-info">' +
      "<b>" + conv.name + "</b>" +
      '<div class="msg-chat-head-meta">' +
        '<span class="msg-conv-tag msg-conv-tag--' + conv.tag.tone + '">' + conv.tag.text + "</span>" +
        "<span>" + meta + "</span>" +
      "</div>" +
    "</div>" +
    '<div class="msg-chat-actions">' +
      '<button class="msg-icon-btn" type="button" title="Thêm">' + MSG_MORE_SVG + "</button>" +
    "</div>";
}

function renderChatBody(conv) {
  var body = document.getElementById("msgChatBody");
  if (!body) return;
  if (!conv) {
    body.innerHTML = '<p style="text-align:center;color:var(--muted);padding:40px">Chọn hội thoại để bắt đầu</p>';
    return;
  }
  var html = "";
  conv.messages.forEach(function (group) {
    html += '<div class="msg-date-divider">' + group.date + "</div>";
    group.items.forEach(function (m) {
      var rowClass = m.from === "out" ? "msg-bubble-row--out" : "msg-bubble-row--in";
      var read = m.read ? '<span class="msg-read-icon">' + MSG_READ_SVG + "</span>" : "";
      var file = m.file ? renderFileCard(m.file) : "";
      html +=
        '<div class="msg-bubble-row ' + rowClass + '">' +
          '<div class="msg-bubble">' +
            m.text +
            file +
            '<div class="msg-bubble-time">' + m.time + read + "</div>" +
          "</div>" +
        "</div>";
    });
  });
  body.innerHTML = html;
  body.scrollTop = body.scrollHeight;
}

function renderQuickReplies() {
  var el = document.getElementById("msgQuickReplies");
  if (!el) return;
  el.innerHTML = MSG_QUICK_REPLIES.map(function (t) {
    return '<button class="msg-quick-btn" type="button" data-quick="' + t + '">' + t + "</button>";
  }).join("");
}

function renderInfoPanel(conv) {
  var panel = document.getElementById("msgInfoPanel");
  if (!panel) return;
  if (!conv) {
    panel.innerHTML = "";
    return;
  }

  var tabs = [
    { id: "overview", label: "Tổng quan" },
    { id: "docs", label: "Tài liệu" },
    { id: "notes", label: "Ghi chú" }
  ];

  var tabHtml = tabs.map(function (t) {
    return '<button class="msg-info-tab' + (msgState.infoTab === t.id ? " active" : "") + '" type="button" data-info-tab="' + t.id + '">' + t.label + "</button>";
  }).join("");

  var idLabel = "Mã HS: " + conv.studentId;
  var onlineDot = conv.online ? '<span class="msg-info-online"></span>' : "";

  var bodyHtml = "";
  if (msgState.infoTab === "overview") {
    var notesHtml = "";
    if (conv.alert || conv.warning) {
      var noteItems = "";
      if (conv.alert) {
        noteItems += '<span class="msg-note-tag msg-note-tag--amber">' + MSG_ALERT_SVG + conv.alert + "</span>";
      }
      if (conv.warning) {
        noteItems += '<span class="msg-note-tag msg-note-tag--rose">' + MSG_WARN_SVG + conv.warning + "</span>";
      }
      notesHtml =
        '<div class="msg-info-section">' +
          '<div class="msg-info-section-head"><h4>Lưu ý</h4></div>' +
          '<div class="msg-note-tags">' + noteItems + "</div>" +
        "</div>";
    }
    var noteHtml = conv.note
      ? '<div class="msg-info-section"><div class="msg-info-section-head"><h4>Ghi chú của giáo viên</h4><button class="msg-icon-btn msg-edit-btn" type="button" title="Thêm ghi chú">' + MSG_EDIT_SVG + '</button></div><div class="msg-note-box">' + conv.note + '</div></div>'
      : "";
    var actHtml = conv.activities.length
      ? conv.activities.map(function (a) {
          return (
            '<div class="msg-activity-item">' +
              '<div class="msg-activity-icon msg-activity-icon--' + a.icon + '">' +
                (a.icon === "violet" ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' :
               a.icon === "green" ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>' :
               '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>') +
              "</div>" +
              '<div class="msg-activity-body"><b>' + a.label + "</b><small>" + a.time + "</small></div>" +
            "</div>"
          );
        }).join("")
      : '<p style="font-size:13px;color:var(--muted)">Chưa có tương tác</p>';

    bodyHtml =
      '<div class="msg-stat-grid">' +
        '<div class="msg-stat-card"><b>' + conv.stats.attendance + "</b><small>Chuyên cần</small></div>" +
        '<div class="msg-stat-card"><b>' + conv.stats.homework + "</b><small>Bài tập</small></div>" +
        '<div class="msg-stat-card"><b>' + conv.stats.gpa + "</b><small>Điểm TB</small></div>" +
      "</div>" +
      notesHtml + noteHtml +
      '<div class="msg-info-section"><div class="msg-info-section-head"><h4>Tương tác gần đây</h4></div>' + actHtml + "</div>";
  } else if (msgState.infoTab === "notes") {
    bodyHtml = conv.note
      ? '<div class="msg-note-box">' + conv.note + "</div>"
      : '<p style="font-size:13px;color:var(--muted)">Chưa có ghi chú</p>';
  } else {
    var tabLabel = "Nội dung";
    for (var ti = 0; ti < tabs.length; ti++) {
      if (tabs[ti].id === msgState.infoTab) { tabLabel = tabs[ti].label; break; }
    }
    bodyHtml = '<p style="font-size:13px;color:var(--muted);padding:8px 0">Nội dung tab "' + tabLabel + '" sẽ được bổ sung.</p>';
  }

  panel.innerHTML =
    '<div class="msg-info-head"><h3>Thông tin học sinh</h3><button class="msg-icon-btn" type="button">' + MSG_MORE_SVG + "</button></div>" +
    '<div class="msg-info-profile">' +
      '<div class="msg-info-avatar-wrap">' +
        '<div class="msg-info-avatar" style="background:' + msgAvatarColor(conv.id) + '">' + conv.initials + "</div>" +
        onlineDot +
      "</div>" +
      "<b>" + conv.name + "</b>" +
      "<small>Học sinh</small>" +
      '<div class="msg-info-id">' + idLabel + "</div>" +
    "</div>" +
    '<div class="msg-info-tabs">' + tabHtml + "</div>" +
    '<div class="msg-info-body">' + bodyHtml + "</div>";
}

function renderMessages() {
  var subjectEl = document.getElementById("msgSubject");
  var data = getMsgClassData();
  if (subjectEl) subjectEl.textContent = data.subject || "";

  var conv = getActiveConversation();
  if (!conv && data.conversations.length) {
    msgState.activeId = data.conversations[0].id;
    conv = data.conversations[0];
  }

  renderConvList();
  renderChatHead(conv);
  renderChatBody(conv);
  renderQuickReplies();
  renderInfoPanel(conv);
}

function sendMessage(text) {
  var conv = getActiveConversation();
  if (!conv || !text.trim()) return;
  var lastGroup = conv.messages[conv.messages.length - 1];
  if (!lastGroup) {
    lastGroup = { date: "Hôm nay", items: [] };
    conv.messages.push(lastGroup);
  }
  var now = new Date();
  var time = (now.getHours() < 10 ? "0" : "") + now.getHours() + ":" + (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();
  lastGroup.items.push({ from: "out", text: text.trim(), time: time, read: false });
  conv.preview = text.trim();
  conv.time = time;
  var input = document.getElementById("msgComposeInput");
  if (input) input.value = "";
  renderConvList();
  renderChatBody(conv);
}

window.applyClassFilter = function () {
  var currentClass = document.getElementById("currentClass");
  if (currentClass) msgState.className = currentClass.textContent.trim();
  var data = getMsgClassData();
  if (data.conversations.length) msgState.activeId = data.conversations[0].id;
  else msgState.activeId = null;
  msgState.infoTab = "overview";
  renderMessages();
};

document.addEventListener("DOMContentLoaded", function () {
  if (!document.getElementById("msgConvList")) return;

  renderMessages();

  document.getElementById("msgConvList").addEventListener("click", function (e) {
    var item = e.target.closest("[data-conv-id]");
    if (!item) return;
    msgState.activeId = item.getAttribute("data-conv-id");
    var conv = getActiveConversation();
    if (conv) conv.unread = 0;
    msgState.infoTab = "overview";
    renderMessages();
    if (window.innerWidth <= 760) {
      document.querySelector(".msg-list-panel").classList.remove("msg-mobile-show");
      document.getElementById("msgChatPanel").classList.remove("msg-mobile-hide");
    }
  });

  var searchInput = document.getElementById("msgSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      msgState.search = searchInput.value;
      renderConvList();
    });
  }

  var unreadBtn = document.querySelector(".msg-list-toolbar .msg-link-btn");
  if (unreadBtn) {
    unreadBtn.addEventListener("click", function () {
      msgState.unreadOnly = !msgState.unreadOnly;
      unreadBtn.style.fontWeight = msgState.unreadOnly ? "800" : "700";
      renderConvList();
    });
  }

  document.getElementById("msgQuickReplies").addEventListener("click", function (e) {
    var btn = e.target.closest("[data-quick]");
    if (!btn) return;
    var input = document.getElementById("msgComposeInput");
    if (input) input.value = btn.getAttribute("data-quick");
    input.focus();
  });

  document.getElementById("msgSendBtn").addEventListener("click", function () {
    var input = document.getElementById("msgComposeInput");
    if (input) sendMessage(input.value);
  });

  document.getElementById("msgComposeInput").addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e.target.value);
    }
  });

  document.getElementById("msgInfoPanel").addEventListener("click", function (e) {
    var tab = e.target.closest("[data-info-tab]");
    if (!tab) return;
    msgState.infoTab = tab.getAttribute("data-info-tab");
    renderInfoPanel(getActiveConversation());
  });

  document.getElementById("msgChatPanel").addEventListener("click", function (e) {
    if (e.target.closest("#msgChatBack")) {
      document.querySelector(".msg-list-panel").classList.add("msg-mobile-show");
      document.getElementById("msgChatPanel").classList.add("msg-mobile-hide");
    }
  });
});
