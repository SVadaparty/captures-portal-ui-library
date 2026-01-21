function initTypography() {
  document.querySelectorAll("[data-pp-typography]").forEach(el => {
    const type = el.dataset.type || "body"; // h1–h6, body, label
    const color =
      el.dataset.color || DEFAULTS.typographyTextColor;
    const align = el.dataset.align || "left";

    /* =========================
       BASE STYLES
    ========================= */
    el.style.fontFamily = DEFAULTS.typographyFontFamily;
    el.style.color = color;
    el.style.lineHeight = DEFAULTS.typographyLineHeight;
    el.style.textAlign = align;

    /* =========================
       TYPE MAPPING
    ========================= */
    switch (type) {
      case "h1":
        el.style.fontSize = DEFAULTS.typographyH1Size;
        el.style.fontWeight = DEFAULTS.typographyHeadingWeight;
        break;
      case "h2":
        el.style.fontSize = DEFAULTS.typographyH2Size;
        el.style.fontWeight = DEFAULTS.typographyHeadingWeight;
        break;
      case "h3":
        el.style.fontSize = DEFAULTS.typographyH3Size;
        el.style.fontWeight = DEFAULTS.typographyHeadingWeight;
        break;
      case "h4":
        el.style.fontSize = DEFAULTS.typographyH4Size;
        el.style.fontWeight = DEFAULTS.typographyHeadingWeight;
        break;
      case "h5":
        el.style.fontSize = DEFAULTS.typographyH5Size;
        el.style.fontWeight = DEFAULTS.typographyHeadingWeight;
        break;
      case "h6":
        el.style.fontSize = DEFAULTS.typographyH6Size;
        el.style.fontWeight = DEFAULTS.typographyHeadingWeight;
        break;
      case "label":
        el.style.fontSize = DEFAULTS.typographyLabelSize;
        el.style.fontWeight = DEFAULTS.typographyLabelWeight;
        break;
      default: // body
        el.style.fontSize = DEFAULTS.typographyBodySize;
        el.style.fontWeight = DEFAULTS.typographyBodyWeight;
    }
  });
}
