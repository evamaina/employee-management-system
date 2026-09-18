export function initializeSidebar() {
  const menuToggle = document.querySelector(".menu-toggle");
  const sidebar = document.getElementById("sidebar");

  if (!menuToggle || !sidebar) {
    return;
  }

  const closeButton = sidebar.querySelector(".sidebar-close");

  if (!closeButton) {
    return;
  }

  function setSidebarState(isOpen) {
    sidebar.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );
  }

  menuToggle.addEventListener("click", () => {
    setSidebarState(true);
  });

  closeButton.addEventListener("click", () => {
    setSidebarState(false);
  });
}
