export function initializeSidebar() {
  const menuToggle = document.querySelector(".menu-toggle");
  const sidebar = document.getElementById("sidebar");

  if (!menuToggle || !sidebar) {
    return;
  }

  const closeButton = sidebar.querySelector(".sidebar-close");

  function updateMenuButton(isOpen) {
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("is-open");
    updateMenuButton(isOpen);
  });

  closeButton?.addEventListener("click", () => {
    sidebar.classList.remove("is-open");
    updateMenuButton(false);
    menuToggle.focus();
  });
}
