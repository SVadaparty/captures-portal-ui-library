function initKPIs() {
  document.querySelectorAll("[data-pp-kpi]").forEach(tile => {

    const label = tile.dataset.label || "";
    const value = tile.dataset.value || "";
    const delta = tile.dataset.delta || "";
    const trend = tile.dataset.trend || "neutral"; // up | down | neutral
    const icon = tile.dataset.icon || "";

    const bgColor = tile.dataset.bgcolor || "#ffffff";
    const borderColor = tile.dataset.bordercolor || "#e5e7eb";
    const radius = tile.dataset.radius || "14px";
    const padding = tile.dataset.padding || "20px";
    const shadow = tile.dataset.shadow || "md";

    /* ===== RESET (SAFE RE-INIT) ===== */
    tile.innerHTML = "";
    tile.className = "pp-kpi";

    /* ===== STYLES ===== */
    tile.style.backgroundColor = bgColor;
    tile.style.border = `1px solid ${borderColor}`;
    tile.style.borderRadius = radius;
    tile.style.padding = padding;

    if (shadow !== "none") {
      tile.classList.add(`pp-shadow-${shadow}`);
    }

    /* ===== HEADER ===== */
    const header = document.createElement("div");
    header.className = "pp-kpi-header";

    const labelEl = document.createElement("div");
    labelEl.className = "pp-kpi-label";
    labelEl.textContent = label;

    header.appendChild(labelEl);

    if (icon) {
      const iconEl = document.createElement("div");
      iconEl.className = "pp-kpi-icon";
      iconEl.textContent = icon;
      header.appendChild(iconEl);
    }

    /* ===== VALUE ===== */
    const valueEl = document.createElement("div");
    valueEl.className = "pp-kpi-value";
    valueEl.textContent = value;

    /* ===== FOOTER (DELTA) ===== */
    const footer = document.createElement("div");
    footer.className = `pp-kpi-footer pp-kpi-${trend}`;

    if (delta) {
      const arrow =
        trend === "up" ? "▲" :
        trend === "down" ? "▼" : "●";

      footer.textContent = `${arrow} ${delta}`;
    }

    tile.appendChild(header);
    tile.appendChild(valueEl);

    if (delta) {
      tile.appendChild(footer);
    }
  });
}
