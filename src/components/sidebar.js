function initSidebars() {
  const sidebar = document.querySelector("[data-pp-sidebar]");
  if (!sidebar) return;

  // ---------- READ ATTRIBUTES ----------
  const bg = sidebar.dataset.bg || "#0f172a";
  const textColor = sidebar.dataset.textColor || "#e5e7eb";
  const width = sidebar.dataset.width || "260px";
  const collapsible = sidebar.dataset.collapsible === "true";
  const isOpen = sidebar.dataset.open === "true";

  // ---------- BASE ----------
  sidebar.classList.add("pp-sidebar");
  sidebar.style.background = bg;
  sidebar.style.color = textColor;
  sidebar.style.width = width;

  if (!collapsible) return;

  sidebar.classList.add("pp-sidebar-collapsible");

  // ---------- INITIAL STATE ----------
  sidebar.classList.toggle("pp-sidebar-collapsed", !isOpen);

  // ---------- STATE HELPERS ----------
  sidebar.open = () => {
    sidebar.dataset.open = "true";
    sidebar.classList.remove("pp-sidebar-collapsed");
  };

  sidebar.close = () => {
    sidebar.dataset.open = "false";
    sidebar.classList.add("pp-sidebar-collapsed");
  };

  sidebar.toggle = () => {
    const open = sidebar.dataset.open === "true";
    open ? sidebar.close() : sidebar.open();
  };

  // ---------- WIRE TOGGLE BUTTONS ----------
  document
    .querySelectorAll("[data-pp-sidebar-toggle]")
    .forEach(btn => {
      btn.addEventListener("click", () => {
        sidebar.toggle();
      });
    });
}
