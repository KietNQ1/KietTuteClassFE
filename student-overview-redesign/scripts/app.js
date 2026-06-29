window.addEventListener("DOMContentLoaded", () => {
  const drawer = document.querySelector("[data-class-drawer]");
  const overlay = document.querySelector("[data-drawer-overlay]");
  const openButtons = document.querySelectorAll("[data-open-drawer]");
  const closeButtons = document.querySelectorAll("[data-close-drawer]");
  const currentPath = window.location.pathname.split("/").pop();
  const modals = document.querySelectorAll("[data-modal]");
  const assignmentViews = document.querySelectorAll("[data-assignment-view]");
  const assignmentViewTriggers = document.querySelectorAll("[data-assignment-view-target]");
  const app = document.querySelector(".student-app");
  const dock = document.querySelector(".dock");

  document.querySelectorAll("[data-page-link]").forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === currentPath);
  });

  if (app && dock) {
    const dockToggle = document.createElement("button");
    dockToggle.className = "dock-toggle";
    dockToggle.type = "button";
    dockToggle.title = "Thu gọn thanh điều hướng";
    dockToggle.setAttribute("aria-label", "Thu gọn thanh điều hướng");
    dockToggle.innerHTML = '<span class="icon" data-icon="chev"></span>';
    app.appendChild(dockToggle);

    let dockCollapsed = false;
    try {
      dockCollapsed = window.localStorage.getItem("studentDockCollapsed") === "true";
    } catch (error) {
      dockCollapsed = false;
    }

    function setDockCollapsed(collapsed) {
      app.classList.toggle("dock-collapsed", collapsed);
      dockToggle.title = collapsed ? "Mở thanh điều hướng" : "Thu gọn thanh điều hướng";
      dockToggle.setAttribute("aria-label", dockToggle.title);
      try {
        window.localStorage.setItem("studentDockCollapsed", String(collapsed));
      } catch (error) {
        /* Local previews can disable storage. */
      }
    }

    dockToggle.addEventListener("click", () => {
      setDockCollapsed(!app.classList.contains("dock-collapsed"));
    });
    setDockCollapsed(dockCollapsed);
    if (typeof hydrateIcons === "function") hydrateIcons();
  }

  function showAssignmentView(name) {
    if (!assignmentViews.length) {
      return;
    }

    assignmentViews.forEach((view) => {
      view.classList.toggle("active", view.dataset.assignmentView === name);
    });

    assignmentViewTriggers.forEach((trigger) => {
      trigger.classList.toggle("active", trigger.dataset.assignmentViewTarget === name && trigger.closest(".assignment-view-tabs"));
    });
  }

  function closeDrawer() {
    drawer?.classList.remove("open");
    overlay?.classList.remove("open");
  }

  function closeModals() {
    modals.forEach((modal) => modal.classList.remove("open"));
    document.body.classList.remove("modal-open");
  }

  function openModal(name) {
    const modal = document.querySelector(`[data-modal="${name}"]`);

    if (!modal) {
      return;
    }

    closeDrawer();
    closeModals();
    modal.classList.add("open");
    document.body.classList.add("modal-open");
  }

  openButtons.forEach((button) => {
    button.addEventListener("click", () => {
      drawer?.classList.add("open");
      overlay?.classList.add("open");
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeDrawer);
  });

  overlay?.addEventListener("click", closeDrawer);

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-modal-target]");

    if (trigger) {
      openModal(trigger.dataset.modalTarget);
    }
  });

  document.addEventListener("keydown", (event) => {
    const trigger = event.target.closest("[data-modal-target]");

    if (trigger && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      openModal(trigger.dataset.modalTarget);
    }
  });

  assignmentViewTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => showAssignmentView(trigger.dataset.assignmentViewTarget));
  });

  const assignmentCatalog = {
    "chapter-2": { symbol: "π", title: "Bài tập chương 2: Hàm số bậc nhất", due: "25/05 21:00", duration: "45 phút", status: "Chưa làm" },
    "chapter-3": { symbol: "√x", title: "Trắc nghiệm chương 3", due: "28/05 21:00", duration: "30 phút", status: "Đang làm" },
    "quick-review": { symbol: "%", title: "Phiếu ôn tập hàm số", due: "01/06 17:00", duration: "25 phút", status: "Chưa làm" },
    equations: { symbol: "x²", title: "Bài tập phương trình bậc hai", due: "05/06 21:00", duration: "40 phút", status: "Chưa làm" },
    geometry: { symbol: "△", title: "Bài trắc nghiệm hình học", due: "08/06 21:00", duration: "40 phút", status: "Chưa làm" },
    advanced: { symbol: "Σ", title: "Luyện tập tổng hợp nâng cao", due: "12/06 20:00", duration: "35 phút", status: "Chưa làm" }
  };

  const pageParams = new URLSearchParams(window.location.search);
  const requestedView = pageParams.get("view");
  const requestedAssignment = assignmentCatalog[pageParams.get("assignment")];

  if (requestedView && Array.from(assignmentViews).some((view) => view.dataset.assignmentView === requestedView)) {
    showAssignmentView(requestedView);
  }

  if (requestedAssignment) {
    const symbol = document.querySelector("[data-assignment-work-symbol]");
    const title = document.querySelector("[data-assignment-work-title]");
    const due = document.querySelector("[data-assignment-work-due]");
    const duration = document.querySelector("[data-assignment-work-duration]");
    const status = document.querySelector("[data-assignment-work-status]");
    if (symbol) symbol.textContent = requestedAssignment.symbol;
    if (title) title.textContent = requestedAssignment.title;
    if (due) due.textContent = `Hạn nộp: ${requestedAssignment.due}`;
    if (duration) duration.textContent = `Thời gian: ${requestedAssignment.duration}`;
    if (status) status.textContent = requestedAssignment.status;
  }

  modals.forEach((modal) => {
    modal.addEventListener("click", closeModals);
    modal.querySelector("[role='dialog']")?.addEventListener("click", (event) => event.stopPropagation());
    modal.querySelectorAll("[data-close-modal]").forEach((button) => {
      button.addEventListener("click", closeModals);
    });
  });

  document.querySelectorAll("[data-append-comment]").forEach((button) => {
    button.addEventListener("click", () => {
      const form = button.closest(".lesson-comment-form");
      const input = form?.querySelector("input");
      const list = document.querySelector("[data-lesson-comments]");
      const message = input?.value.trim();

      if (!message || !list) {
        return;
      }

      const item = document.createElement("article");
      item.className = "lesson-comment";
      item.innerHTML = '<div class="lesson-avatar">BA</div><div><strong>Bạn</strong><span>Vừa xong</span><p></p></div><div class="lesson-like">♡ 0</div>';
      item.querySelector("p").textContent = message;
      list.appendChild(item);
      input.value = "";
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModals();
      closeDrawer();
    }
  });
});
