function initSelectMenus() {
  document.querySelectorAll("[data-pp-select]").forEach(container => {

    const optionsRaw = container.dataset.options;
    const isMultiple = container.dataset.multiple === "true";
    const enableSearch = container.dataset.search === "true";
    const onChangeFn = container.dataset.onchange || container.dataset.onChange;
    const placeholder = container.dataset.placeholder || "Select";
    const searchPlaceholder =
      container.dataset.searchPlaceholder ||
      container.dataset.searchplaceholder ||
      "Search...";
    const width = container.dataset.width || DEFAULTS.dropdownWidth;

    /* ⭐ NEW: STYLE ATTRIBUTES */
    const bg = container.dataset.bg;
    const color = container.dataset.color;
    const borderColor = container.dataset.bordercolor;
    const fontSize = container.dataset.fontsize;
    const fontWeight = container.dataset.fontweight;
    const hoverBg = container.dataset.hoverBg || "#eef3ff";

    // Highlight colors (existing)
    const ACTIVE_BG = hoverBg;
    const ACTIVE_FONT_WEIGHT = "500";

    container.innerHTML = "";

    /* =========================
       OPTIONS
    ========================= */
    let options = [];
    try {
      options = JSON.parse(optionsRaw);
    } catch {
      options = optionsRaw.split(",").map(o => o.trim());
    }

    /* =========================
       STATE
    ========================= */
    const selectedValues = new Set();
    let singleSelectedValue = null;

    /* =========================
       WRAPPER
    ========================= */
    const wrapper = document.createElement("div");
    wrapper.classList.add("pp-select-wrapper");
    wrapper.style.position = "relative";
    wrapper.style.width = width;

    /* =========================
       DISPLAY FIELD
    ========================= */
    const display = document.createElement("div");
    display.textContent = placeholder;
    display.style.padding = DEFAULTS.dropdownPadding;
    display.style.border = `1px solid ${DEFAULTS.dropdownBorderColor}`;
    display.style.borderRadius = DEFAULTS.dropdownBorderRadius;
    display.style.cursor = "pointer";
    display.style.backgroundColor = DEFAULTS.dropdownBgColor;
    display.style.fontFamily = DEFAULTS.dropdownFontFamily;
    display.style.fontSize = DEFAULTS.dropdownFontSize;

    /* ⭐ NEW: DISPLAY STYLE OVERRIDES */
    if (bg) display.style.backgroundColor = bg;
    if (color) display.style.color = color;
    if (borderColor) display.style.borderColor = borderColor;
    if (fontSize) display.style.fontSize = fontSize;
    if (fontWeight) display.style.fontWeight = fontWeight;

    /* =========================
       DROPDOWN MENU
    ========================= */
    const menu = document.createElement("div");
    menu.style.position = "absolute";
    menu.style.top = "100%";
    menu.style.left = "0";
    menu.style.right = "0";
    menu.style.border = `1px solid ${DEFAULTS.dropdownBorderColor}`;
    menu.style.backgroundColor = "#fff";
    menu.style.borderRadius = DEFAULTS.dropdownBorderRadius;
    menu.style.zIndex = "1000";
    menu.style.display = "none";
    menu.style.maxHeight = "240px";
    menu.style.overflowY = "auto";

    if (borderColor) menu.style.borderColor = borderColor;

    // Prevent menu click from closing
    menu.addEventListener("click", e => e.stopPropagation());

    /* =========================
       SEARCH INPUT
    ========================= */
    let searchInput;
    if (enableSearch) {
      searchInput = document.createElement("input");
      searchInput.placeholder = searchPlaceholder;
      searchInput.style.width = "100%";
      searchInput.style.padding = "8px 12px";
      searchInput.style.border = "none";
      searchInput.style.borderBottom = "1px solid #ddd";
      searchInput.style.outline = "none";
      searchInput.style.fontSize = DEFAULTS.dropdownFontSize;

      searchInput.addEventListener("click", e => e.stopPropagation());
      searchInput.addEventListener("keydown", e => e.stopPropagation());

      menu.appendChild(searchInput);
    }

    /* =========================
       OPTION LIST
    ========================= */
    const optionBox = document.createElement("div");

    options.forEach(opt => {
      const row = document.createElement("div");
      row.dataset.value = opt.toLowerCase();
      row.style.display = "flex";
      row.style.alignItems = "center";
      row.style.padding = "8px 12px";
      row.style.cursor = "pointer";
      row.style.fontFamily = DEFAULTS.dropdownFontFamily;
      row.style.fontSize = DEFAULTS.dropdownFontSize;

      if (color) row.style.color = color;

      let checkbox;

      if (isMultiple) {
        checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = opt;
        checkbox.style.marginRight = "8px";
        row.appendChild(checkbox);
      }

      row.appendChild(document.createTextNode(opt));

      row.addEventListener("mouseenter", () => {
        row.style.backgroundColor = ACTIVE_BG;
      });

      row.addEventListener("mouseleave", () => {
        if (
          !isMultiple &&
          singleSelectedValue !== opt
        ) row.style.backgroundColor = "";
      });

      row.addEventListener("click", () => {
        if (isMultiple) {
          checkbox.checked = !checkbox.checked;

          checkbox.checked
            ? selectedValues.add(opt)
            : selectedValues.delete(opt);

          row.style.backgroundColor = checkbox.checked ? ACTIVE_BG : "";

          display.textContent =
            selectedValues.size > 0
              ? Array.from(selectedValues).join(", ")
              : placeholder;

          if (onChangeFn && typeof window[onChangeFn] === "function") {
            window[onChangeFn](Array.from(selectedValues));
          }
        } else {
          [...optionBox.children].forEach(r => {
            r.style.backgroundColor = "";
            r.style.fontWeight = "normal";
          });

          singleSelectedValue = opt;
          display.textContent = opt;
          row.style.backgroundColor = ACTIVE_BG;
          row.style.fontWeight = ACTIVE_FONT_WEIGHT;
          menu.style.display = "none";

          if (onChangeFn && typeof window[onChangeFn] === "function") {
            window[onChangeFn](opt);
          }
        }
      });

      optionBox.appendChild(row);
    });


    /* =========================
       SEARCH FILTER
    ========================= */
    if (enableSearch) {
      searchInput.addEventListener("input", () => {
        const keyword = searchInput.value.toLowerCase().trim();
        [...optionBox.children].forEach(row => {
          row.style.display = row.dataset.value.includes(keyword)
            ? "flex"
            : "none";
        });
      });
    }

    menu.appendChild(optionBox);

    /* =========================
       OPEN / CLOSE
    ========================= */
    display.addEventListener("click", e => {
      e.stopPropagation();
      menu.style.display = menu.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", () => {
      menu.style.display = "none";
    });

    wrapper.appendChild(display);
    wrapper.appendChild(menu);
    container.appendChild(wrapper);
  });
}
