function initCards() {
  document.querySelectorAll("[data-pp-card]").forEach(card => {

    const title = card.dataset.title;
    const subtitle = card.dataset.subtitle;
    const padding = card.dataset.padding || "24px";
    const radius = card.dataset.radius || "12px";
    const bgColor = card.dataset.bgcolor || "#ffffff";
    const borderColor = card.dataset.bordercolor || "#e5e7eb";
    const shadow = card.dataset.shadow || "md"; // sm | md | lg | none

    /* ===== RESET (SAFE RE-INIT) ===== */
    const bodyContent = document.createElement("div");
    while (card.firstChild) {
      bodyContent.appendChild(card.firstChild);
    }

    card.innerHTML = "";
    card.className = "pp-card";

    /* ===== STYLES ===== */
    card.style.padding = padding;
    card.style.borderRadius = radius;
    card.style.backgroundColor = bgColor;
    card.style.border = `1px solid ${borderColor}`;

    if (shadow !== "none") {
      card.classList.add(`pp-shadow-${shadow}`);
    }

    /* ===== HEADER ===== */
    if (title || subtitle) {
      const header = document.createElement("div");
      header.className = "pp-card-header";

      if (title) {
        const h = document.createElement("h3");
        h.className = "pp-card-title";
        h.textContent = title;
        header.appendChild(h);
      }

      if (subtitle) {
        const s = document.createElement("div");
        s.className = "pp-card-subtitle";
        s.textContent = subtitle;
        header.appendChild(s);
      }

      card.appendChild(header);
    }

    /* ===== BODY ===== */
    const body = document.createElement("div");
    body.className = "pp-card-body";
    body.appendChild(bodyContent);

    card.appendChild(body);
  });
}
