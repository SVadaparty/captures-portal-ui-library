function initCards() {
  document.querySelectorAll("[data-pp-card]").forEach(card => {

    // ---------- CARD STYLES ----------
    const bg = card.dataset.bg || "#ffffff";
    const borderColor = card.dataset.borderColor || "#dee2e6";
    const borderRadius = card.dataset.borderRadius || "0.375rem";

    card.classList.add("pp-card");
    card.style.background = bg;
    card.style.border = `1px solid ${borderColor}`;
    card.style.borderRadius = borderRadius;
    card.style.overflow = "hidden";

    // ---------- IMAGE ----------
    const img = card.querySelector("[data-pp-card-img]");
    if (img) {
      img.classList.add("pp-card-img-top");
    }

    // ---------- HEADER ----------
    const header = card.querySelector("[data-pp-card-header]");
    if (header) {
      header.classList.add("pp-card-header");
    }

    // ---------- BODY ----------
    const body = card.querySelector("[data-pp-card-body]");
    if (body) {
      body.classList.add("pp-card-body");
    }

    // ---------- TITLE ----------
    const title = card.querySelector("[data-pp-card-title]");
    if (title) {
      title.classList.add("pp-card-title");
    }

    // ---------- TEXT ----------
    const text = card.querySelector("[data-pp-card-text]");
    if (text) {
      text.classList.add("pp-card-text");
    }

    // ---------- BUTTONS ----------
    card.querySelectorAll("[data-pp-card-btn]").forEach(btn => {
      const label = btn.dataset.label || "Button";
      btn.classList.add("pp-card-btn");
      btn.textContent = label;
    });

    // ---------- FOOTER ----------
    const footer = card.querySelector("[data-pp-card-footer]");
    if (footer) {
      footer.classList.add("pp-card-footer");
    }
  });
}