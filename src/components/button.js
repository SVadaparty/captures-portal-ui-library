function initButtons() {
  document.querySelectorAll("[data-pp-button]").forEach(btn => {
    const type = btn.dataset.type || "primary";
    const label = btn.dataset.label || "Button";
    btn.classList.add("pp-btn", `pp-btn-${type}`);
    btn.textContent = label;
  });
}
