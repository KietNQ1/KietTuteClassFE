window.addEventListener("DOMContentLoaded", () => {
  const drawer = document.querySelector("[data-class-drawer]");
  const overlay = document.querySelector("[data-drawer-overlay]");
  const openButtons = document.querySelectorAll("[data-open-drawer]");
  const closeButtons = document.querySelectorAll("[data-close-drawer]");
  const currentPath = window.location.pathname.split("/").pop();
  const modalTriggers = document.querySelectorAll("[data-modal-target]");
  const modals = document.querySelectorAll("[data-modal]");
  const assignmentViews = document.querySelectorAll("[data-assignment-view]");
  const assignmentViewTriggers = document.querySelectorAll("[data-assignment-view-target]");

  document.querySelectorAll("[data-page-link]").forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === currentPath);
  });

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

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => openModal(trigger.dataset.modalTarget));
    trigger.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openModal(trigger.dataset.modalTarget);
      }
    });
  });

  assignmentViewTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => showAssignmentView(trigger.dataset.assignmentViewTarget));
  });

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
