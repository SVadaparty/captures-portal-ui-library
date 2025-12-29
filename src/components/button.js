
function initButtons() {
  document.querySelectorAll("[data-pp-button]").forEach(btn => {
    // ---------- DEFAULT CONFIG ----------

    // ---------- READ ATTRIBUTES (WITH FALLBACKS) ----------
    const type = btn.dataset.type || DEFAULTS.type;
    const label = btn.dataset.label || DEFAULTS.label;
    const bgColor = btn.dataset.bgcolor || DEFAULTS.bgColor;
    const textColor = btn.dataset.color || DEFAULTS.textColor;
    const fontFamily = btn.dataset.font || DEFAULTS.fontFamily;
    const fontSize = btn.dataset.fontsize || DEFAULTS.fontSize;
    const fontWeight = btn.dataset.fontweight || DEFAULTS.fontWeight;
    const onClickFn = btn.dataset.onclick;

    // ---------- CLASSES ----------
    btn.classList.add("pp-btn", `pp-btn-${type}`);

    // ---------- STYLES ----------
    btn.style.backgroundColor = bgColor;
    btn.style.color = textColor;
    btn.style.fontFamily = fontFamily;
    btn.style.fontSize = fontSize;
    btn.style.fontWeight = fontWeight;
    btn.style.minWidth = DEFAULTS.minWidth;
    btn.style.height = DEFAULTS.height;
    btn.style.padding = DEFAULTS.padding;
    btn.style.border = "none";
    btn.style.borderRadius = DEFAULTS.borderRadius;
    btn.style.cursor = DEFAULTS.cursor;

    // ---------- LABEL ----------
    btn.textContent = label;

    // ---------- ONCLICK (SAFE HANDLER) ----------
    if (onClickFn && typeof window[onClickFn] === "function") {
      btn.addEventListener("click", window[onClickFn]);
    }
  });
}
