function initBreadcrumbs() {
  document.querySelectorAll("[data-pp-breadcrumb]").forEach(container => {

    // ---------- READ ATTRIBUTES ----------
    const items = (container.dataset.items || "")
      .split(",")
      .map(v => v.trim())
      .filter(Boolean);

    const links = (container.dataset.links || "")
      .split(",")
      .map(v => v.trim());

    const icons = (container.dataset.icons || "")
      .split(",")
      .map(v => v.trim());

    const separator = container.dataset.separator || "/";

    const textColor = container.dataset.textColor || "#64748b";
    const linkColor = container.dataset.linkColor || "#2563eb";
    const activeColor = container.dataset.activeColor || "#0f172a";
    const fontSize = container.dataset.fontSize || "15px";

    if (!items.length) return;

    // ---------- BASE ----------
    container.innerHTML = "";
    container.classList.add("pp-breadcrumb");
    container.setAttribute("aria-label", "breadcrumb");

    container.style.setProperty("--pp-bc-text", textColor);
    container.style.setProperty("--pp-bc-link", linkColor);
    container.style.setProperty("--pp-bc-active", activeColor);
    container.style.setProperty("--pp-bc-fontSize", fontSize);

    const ol = document.createElement("ol");
    ol.className = "pp-breadcrumb-list";

    // ---------- BUILD ----------
    items.forEach((label, index) => {
      const li = document.createElement("li");
      li.className = "pp-breadcrumb-item";

      const isLast = index === items.length - 1;
      const link = links[index];
      const icon = icons[index];

      let el;

      if (!isLast && link) {
        el = document.createElement("a");
        el.href = link;
      } else {
        el = document.createElement("span");
        if (isLast) el.classList.add("pp-breadcrumb-active");
      }

      // Icon (optional)
      if (icon) {
        const iconSpan = document.createElement("span");
        iconSpan.className = "pp-breadcrumb-icon";
        iconSpan.textContent = icon;
        el.appendChild(iconSpan);
      }

      const textSpan = document.createElement("span");
      textSpan.textContent = label;
      el.appendChild(textSpan);


      li.appendChild(el);
      ol.appendChild(li);

      // Separator
      if (index < items.length - 1) {
        const sep = document.createElement("li");
        sep.className = "pp-breadcrumb-separator";
        sep.textContent = separator;
        ol.appendChild(sep);
      }
    });

    container.appendChild(ol);
  });
}
