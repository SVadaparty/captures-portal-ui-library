function initRadios() {
  document.querySelectorAll("[data-pp-radio-group]").forEach(group => {
    const optionsRaw = group.dataset.options;
    const name = group.dataset.name || `pp-radio-${Math.random()}`;
    const onChangeFn = group.dataset.onchange;
    const layout = (group.dataset.layout || "column").toLowerCase();

    /* =========================
       GROUP LAYOUT
       Supports data-layout="row" or "column". Defaults to column.
    ========================= */
    group.style.display = "flex";
    if (layout === "row") {
      group.style.flexDirection = "row";
      group.style.flexWrap = "wrap";
      group.style.columnGap = DEFAULTS.radioGroupGap;
      group.style.rowGap = "0";
    } else {
      group.style.flexDirection = "column";
      group.style.flexWrap = "nowrap";
      group.style.rowGap = DEFAULTS.radioGroupGap;
      group.style.columnGap = "0";
    }

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
       RADIO RENDERING
    ========================= */
    options.forEach(opt => {
      const wrapper = document.createElement("label");
      wrapper.style.display = "flex";
      wrapper.style.alignItems = "center";
      wrapper.style.cursor = DEFAULTS.radioCursor;
      wrapper.style.fontFamily = DEFAULTS.radioFontFamily;
      wrapper.style.fontSize = DEFAULTS.radioFontSize;
      wrapper.style.fontWeight = DEFAULTS.radioFontWeight;
      wrapper.style.color = DEFAULTS.radioTextColor;

      // spacing between radio + text
      wrapper.style.marginRight =
        layout === "row" ? DEFAULTS.radioGroupGap : "0";

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = name;
      radio.value = opt;
      radio.style.marginRight = DEFAULTS.radioGap;
      radio.style.cursor = DEFAULTS.radioCursor;

      // onchange (CSP-safe)
      if (onChangeFn && typeof window[onChangeFn] === "function") {
        radio.addEventListener("change", e => {
          if (e.target.checked) {
            window[onChangeFn](e.target.value, e);
          }
        });
      }

      const text = document.createTextNode(opt);

      wrapper.appendChild(radio);
      wrapper.appendChild(text);
      group.appendChild(wrapper);
    });
  });
}
