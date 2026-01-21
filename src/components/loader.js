function initLoader() {
  document.querySelectorAll("[data-pp-loader]").forEach(container => {
    const text =
      container.dataset.text || DEFAULTS.loaderText;

    const size =
      container.dataset.size || DEFAULTS.loaderSize;

    const color =
      container.dataset.color || DEFAULTS.loaderColor;

    const bgColor =
      container.dataset.bgcolor || DEFAULTS.loaderBgColor;

    const alignment =
      container.dataset.align || DEFAULTS.loaderAlignment;

    // Reset (safe re-init)
    container.innerHTML = "";

    /* =========================
       CONTAINER STYLES
    ========================= */
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = alignment;
    container.style.justifyContent = "center";
    container.style.gap = DEFAULTS.loaderGap;

    /* =========================
       SPINNER
    ========================= */
    const spinner = document.createElement("div");
    spinner.style.width = size;
    spinner.style.height = size;
    spinner.style.border = `${DEFAULTS.loaderBorderWidth} solid ${bgColor}`;
    spinner.style.borderTop =
      `${DEFAULTS.loaderBorderWidth} solid ${color}`;
    spinner.style.borderRadius = DEFAULTS.loaderBorderRadius;
    spinner.style.animation =
      `pp-spin ${DEFAULTS.loaderAnimationDuration} linear infinite`;

    /* =========================
       TEXT
    ========================= */
    const label = document.createElement("span");
    label.textContent = text;
    label.style.color = DEFAULTS.loaderTextColor;
    label.style.fontFamily = DEFAULTS.loaderFontFamily;
    label.style.fontSize = DEFAULTS.loaderFontSize;

    container.appendChild(spinner);
    container.appendChild(label);
  });
}
(function addLoaderAnimation() {
  if (document.getElementById("pp-loader-style")) return;

  const style = document.createElement("style");
  style.id = "pp-loader-style";
  style.textContent = `
    @keyframes pp-spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
})();
