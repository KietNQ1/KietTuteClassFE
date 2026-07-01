window.addEventListener("DOMContentLoaded", function () {
  var drawer = document.querySelector("[data-class-drawer]");
  var overlay = document.querySelector("[data-drawer-overlay]");
  var currentPath = window.location.pathname.split("/").pop();
  var app = document.querySelector(".teacher-app");
  var dockWrap = document.querySelector(".dock-wrap");
  var dock = document.querySelector(".dock");

  document.querySelectorAll(".hnav .hic[data-page-link], .hnav a.hic").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href && href !== "#" && href === currentPath) {
      link.classList.add("active");
    }
  });

  document.querySelectorAll("[data-dock-link]").forEach(function (btn) {
    if (btn.getAttribute("data-dock-link") === currentPath) {
      document.querySelectorAll(".dock-btn").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
    }
  });

  if (app && dockWrap && dock) {
    var dockToggle = document.createElement("button");
    dockToggle.className = "dock-toggle";
    dockToggle.type = "button";
    dockToggle.title = "Thu gọn thanh điều hướng";
    dockToggle.setAttribute("aria-label", "Thu gọn thanh điều hướng");
    dockToggle.innerHTML =
      '<span class="icon">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
      '<path d="m6 9 6 6 6-6"/>' +
      "</svg></span>";
    app.appendChild(dockToggle);

    var dockCollapsed = false;
    try {
      dockCollapsed = window.localStorage.getItem("teacherDockCollapsed") === "true";
    } catch (error) {
      dockCollapsed = false;
    }

    function setDockCollapsed(collapsed) {
      app.classList.toggle("dock-collapsed", collapsed);
      dockToggle.title = collapsed ? "Mở thanh điều hướng" : "Thu gọn thanh điều hướng";
      dockToggle.setAttribute("aria-label", dockToggle.title);
      try {
        window.localStorage.setItem("teacherDockCollapsed", String(collapsed));
      } catch (error) {
        /* Local previews can disable storage. */
      }
    }

    dockToggle.addEventListener("click", function () {
      setDockCollapsed(!app.classList.contains("dock-collapsed"));
    });
    setDockCollapsed(dockCollapsed);
  }

  function closeDrawer() {
    if (drawer) drawer.classList.remove("open");
    if (overlay) overlay.classList.remove("open");
  }

  function openDrawer() {
    if (drawer) drawer.classList.add("open");
    if (overlay) overlay.classList.add("open");
  }

  window.openDrawer = openDrawer;
  window.closeDrawer = closeDrawer;

  document.querySelectorAll("[data-open-drawer]").forEach(function (btn) {
    btn.addEventListener("click", openDrawer);
  });
  document.querySelectorAll("[data-close-drawer]").forEach(function (btn) {
    btn.addEventListener("click", closeDrawer);
  });
  if (overlay) overlay.addEventListener("click", closeDrawer);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeDrawer();
  });
});

window.selectedClassFilter = null;

function selectClass(el) {
  document.querySelectorAll(".drawer .note-tab, [data-class-drawer] .note-tab").forEach(function (n) {
    n.classList.remove("active");
  });
  el.classList.add("active");
  var labelEl = el.querySelector(".cls");
  if (el.hasAttribute("data-class")) {
    var cls = el.getAttribute("data-class");
    window.selectedClassFilter = cls || null;
    var label = cls && labelEl ? labelEl.textContent : "Chung";
    var currentClass = document.getElementById("currentClass");
    if (currentClass) currentClass.textContent = label;
  } else if (labelEl) {
    var currentClassEl = document.getElementById("currentClass");
    if (currentClassEl) currentClassEl.textContent = labelEl.textContent;
  }
  if (typeof window.closeDrawer === "function") window.closeDrawer();
  if (typeof window.applyClassFilter === "function") window.applyClassFilter();
}
window.selectClass = selectClass;
