window.addEventListener("DOMContentLoaded", function () {
  var drawer = document.querySelector("[data-class-drawer]");
  var overlay = document.querySelector("[data-drawer-overlay]");
  var currentPath = window.location.pathname.split("/").pop();

  document.querySelectorAll(".hnav .hic[data-page-link], .hnav a.hic").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href && href !== "#" && href === currentPath) {
      link.classList.add("active");
    }
  });

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
