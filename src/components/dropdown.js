function initDropdowns() {
  document.querySelectorAll("[data-pp-dropdown]").forEach(select => {
    const optionsRaw = select.dataset.options;
    const onChangeFn = select.dataset.onchange;

    // Reset (safe re-init)
    select.innerHTML = "";

    /* =========================
       OPTIONS (ARRAY OR STRING)
    ========================= */
    let options = [];

    if (optionsRaw) {
      try {
        // Try parsing as JSON array
        const parsed = JSON.parse(optionsRaw);
        if (Array.isArray(parsed)) {
          options = parsed;
        }
      } catch (e) {
        // Fallback to comma-separated
        options = optionsRaw.split(",").map(o => o.trim());
      }
    }

    options.forEach(opt => {
      const optionEl = document.createElement("option");

      // Support value-label objects later if needed
      optionEl.value = opt;
      optionEl.textContent = opt;

      select.appendChild(optionEl);
    });

    /* =========================
       STYLES (FROM DEFAULTS)
    ========================= */
    select.style.width =
      select.dataset.width || DEFAULTS.dropdownWidth;

    select.style.height =
      select.dataset.height || DEFAULTS.dropdownHeight;

    select.style.padding =
      select.dataset.padding || DEFAULTS.dropdownPadding;

    select.style.fontFamily =
      select.dataset.fontfamily || DEFAULTS.dropdownFontFamily;

    select.style.fontSize =
      select.dataset.fontsize || DEFAULTS.dropdownFontSize;

    select.style.fontWeight =
      select.dataset.fontweight || DEFAULTS.dropdownFontWeight;

    select.style.color =
      select.dataset.color || DEFAULTS.dropdownTextColor;

    select.style.backgroundColor =
      select.dataset.bgcolor || DEFAULTS.dropdownBgColor;

    select.style.border = `1px solid ${
      select.dataset.bordercolor || DEFAULTS.dropdownBorderColor
    }`;

    select.style.borderRadius =
      select.dataset.borderradius || DEFAULTS.dropdownBorderRadius;

    select.style.cursor =
      select.dataset.cursor || DEFAULTS.dropdownCursor;

    select.style.outline = "none";

    /* =========================
       FOCUS HANDLING
    ========================= */
    select.addEventListener("focus", () => {
      select.style.borderColor =
        DEFAULTS.dropdownFocusBorderColor;
    });

    select.addEventListener("blur", () => {
      select.style.borderColor =
        select.dataset.bordercolor || DEFAULTS.dropdownBorderColor;
    });

    /* =========================
       onchange (CSP-safe)
    ========================= */
    if (onChangeFn && typeof window[onChangeFn] === "function") {
      select.addEventListener("change", e =>
        window[onChangeFn](e.target.value, e)
      );
    }
  });
}
