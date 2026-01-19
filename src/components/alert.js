function initAlerts() {
  document.querySelectorAll("[data-pp-alert]").forEach(alert => {
    const type = alert.dataset.type || "primary";
    const dismissible = alert.dataset.dismissible === "true";

    /* =========================
       BASE STYLES
    ========================= */
    alert.style.padding = DEFAULTS.alertPadding;
    alert.style.borderRadius = DEFAULTS.alertBorderRadius;
    alert.style.fontFamily = DEFAULTS.alertFontFamily;
    alert.style.fontSize = DEFAULTS.alertFontSize;
    alert.style.fontWeight = DEFAULTS.alertFontWeight;
    alert.style.marginBottom = DEFAULTS.alertMarginBottom;
    alert.style.position = "relative";

    /* =========================
       TYPE COLORS
    ========================= */
    const bgKey = `alert${capitalize(type)}Bg`;
    const textKey = `alert${capitalize(type)}Text`;

    // Only set backgroundColor if not already inline-styled
    if (!alert.style.backgroundColor) {
      alert.style.backgroundColor =
        DEFAULTS[bgKey] || DEFAULTS.alertPrimaryBg;
    }

    // Only set color if not already inline-styled
    if (!alert.style.color) {
      alert.style.color =
        DEFAULTS[textKey] || DEFAULTS.alertPrimaryText;
    }

    /* =========================
       ROLE
    ========================= */
    alert.setAttribute("role", "alert");

    /* =========================
       DISMISS BUTTON
    ========================= */
    if (dismissible) {
      const closeBtn = document.createElement("button");
      closeBtn.innerHTML = "&times;";
      closeBtn.style.position = "absolute";
      closeBtn.style.right = "12px";
      closeBtn.style.top = "8px";
      closeBtn.style.border = "none";
      closeBtn.style.background = "transparent";
      closeBtn.style.fontSize = "18px";
      closeBtn.style.cursor = "pointer";

      closeBtn.addEventListener("click", () => {
        alert.style.display = "none";
      });

      alert.appendChild(closeBtn);
    }
  });
}

/* Helper */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
