
function initHeaders() {
  document.querySelectorAll("[data-pp-header]").forEach(header => {

    // ---------- DEFAULTS ----------
    const DEFAULTS = {
      bgMap: {
        primary: "linear-gradient(135deg, #2563eb, #1d4ed8)",
        neutral: "#ffffff",
        dark: "#0f172a",
        accent: "linear-gradient(135deg, #7c3aed, #2563eb)"
      },
      textColorMap: {
        primary: "#ffffff",
        neutral: "#111111",
        dark: "#ffffff",
        accent: "#ffffff"
      }
    };

    // ---------- BASE ----------
    const bg = header.dataset.bg || "primary";
    header.classList.add("pp-header");
    header.style.background = DEFAULTS.bgMap[bg] || bg;
    header.style.color = DEFAULTS.textColorMap[bg] || "#ffffff";

    if (header.dataset.sticky === "true") {
      header.classList.add("pp-header-sticky");
    }

    // ---------- LOGO (OPTIONAL) ----------
    if (header.dataset.logo) {
      const logo = document.createElement("a");
      logo.className = "pp-header-logo";
      logo.textContent = header.dataset.logo;
      logo.href = header.dataset.logoUrl || "#";
      header.prepend(logo);
    }

    // ---------- NAV ITEMS (ANYWHERE INSIDE HEADER) ----------
    header.querySelectorAll("[data-pp-nav-item]").forEach(item => {
      item.textContent = item.dataset.label || item.textContent || "";
      item.href = item.dataset.href || "#";
      item.classList.add("pp-header-link");

      if (item.dataset.active === "true") {
        item.classList.add("pp-nav-active");
      }
    });

    // ---------- CTA (OPTIONAL) ----------
    if (header.dataset.ctaLabel) {
      const cta = document.createElement("button");
      cta.className = "pp-header-cta";
      cta.textContent = header.dataset.ctaLabel;

      const fn = header.dataset.ctaOnclick;
      if (fn && typeof window[fn] === "function") {
        cta.addEventListener("click", window[fn]);
      }

      header.appendChild(cta);
    }
  });
}


