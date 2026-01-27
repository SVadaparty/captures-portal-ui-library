
function initFooters() {
  document.querySelectorAll("[data-pp-footer]").forEach(footer => {

    // ---------- DEFAULTS ----------
    const DEFAULTS = {
      bgMap: {
        primary: "linear-gradient(135deg, #2563eb, #1d4ed8)",
        neutral: "#f8fafc",
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
    const bg = footer.dataset.bg || "neutral";
    const textColor = footer.dataset.textColor || "neutral";
    footer.classList.add("pp-footer");
    footer.style.background = DEFAULTS.bgMap[bg] || bg;
    footer.style.color = textColor;
   

    // ---------- FOOTER LINKS (ANYWHERE INSIDE FOOTER) ----------
    footer.querySelectorAll("[data-pp-footer-link]").forEach(link => {
      link.textContent = link.textContent || "";
      link.href = link.dataset.href || "#";
      link.classList.add("pp-footer-link");
    });
  });
}


