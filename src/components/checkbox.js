function initCheckboxes() {
  document.querySelectorAll("[data-pp-checkbox-group]").forEach(group => {
    const optionsRaw = group.dataset.options;
    const onChangeFn = group.dataset.onchange;
    const layout = group.dataset.layout || "column"; // NEW

    /* =========================
       GROUP LAYOUT
    ========================= */
    group.style.display = "flex";
    group.style.flexDirection = layout === "row" ? "row" : "column";
    group.style.flexWrap = layout === "row" ? "wrap" : "nowrap";
    group.style.gap = DEFAULTS.checkboxGroupGap;

    // Reset (safe re-init)
    group.innerHTML = "";

    /* =========================
       OPTIONS (ARRAY OR STRING)
    ========================= */
    let options = [];

    if (optionsRaw) {
      try {
        const parsed = JSON.parse(optionsRaw);
        if (Array.isArray(parsed)) {
          options = parsed;
        }
      } catch {
        options = optionsRaw.split(",").map(o => o.trim());
      }
    }

    /* =========================
       CHECKBOX RENDERING
    ========================= */
    options.forEach(opt => {
      const wrapper = document.createElement("label");
      wrapper.style.display = "flex";
      wrapper.style.alignItems = "center";
      wrapper.style.cursor = DEFAULTS.checkboxCursor;
      wrapper.style.fontFamily = DEFAULTS.checkboxFontFamily;
      wrapper.style.fontSize = DEFAULTS.checkboxFontSize;
      wrapper.style.fontWeight = DEFAULTS.checkboxFontWeight;
      wrapper.style.color = DEFAULTS.checkboxTextColor;

      // spacing between options when row layout
      wrapper.style.marginRight =
        layout === "row" ? DEFAULTS.checkboxGroupGap : "0";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = opt;
      checkbox.style.marginRight = DEFAULTS.checkboxGap;
      checkbox.style.cursor = DEFAULTS.checkboxCursor;

      /* =========================
         onchange (CSP-safe)
      ========================= */
      if (onChangeFn && typeof window[onChangeFn] === "function") {
        checkbox.addEventListener("change", e => {
          const checkedValues = Array.from(
            group.querySelectorAll("input[type='checkbox']:checked")
          ).map(cb => cb.value);

          window[onChangeFn](checkedValues, e);
        });
      }

      const text = document.createTextNode(opt);

      wrapper.appendChild(checkbox);
      wrapper.appendChild(text);
      group.appendChild(wrapper);
    });
  });
}
