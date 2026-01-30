function initAccordions() {
  document.querySelectorAll("[data-pp-accordion]").forEach(accordion => {

    const title = accordion.dataset.title || "Accordion";
    const isOpen = accordion.dataset.open === "true";

    const bg = accordion.dataset.bg;
    const color = accordion.dataset.color;
    const fontSize = accordion.dataset.fontsize;
    const fontWeight = accordion.dataset.fontweight;
    const align = accordion.dataset.align;

    const contentBg = accordion.dataset.contentBg;
    const contentColor = accordion.dataset.contentColor;

    /* ========= STRUCTURE ========= */
    const wrapper = document.createElement("div");
    const header = document.createElement("div");
    const titleSpan = document.createElement("span");
    const icon = document.createElement("span");
    const content = document.createElement("div");

    // Move existing content into accordion body
    while (accordion.firstChild) {
      content.appendChild(accordion.firstChild);
    }

    /* ========= HEADER ========= */
    titleSpan.textContent = title;
    titleSpan.style.flex = "1";
    
    header.appendChild(titleSpan);
    header.appendChild(icon);

    header.style.display = "flex";
    header.style.justifyContent = "space-between";
    header.style.alignItems = "center";
    header.style.cursor = "pointer";

    /* ========= ICON ========= */
    icon.textContent =
      isOpen ? DEFAULTS.accordionOpenIcon : DEFAULTS.accordionIcon;

    /* ========= DEFAULT STYLES ========= */
    wrapper.style.border = `1px solid ${DEFAULTS.accordionBorderColor}`;
    wrapper.style.borderRadius = DEFAULTS.accordionBorderRadius;
    wrapper.style.backgroundColor = DEFAULTS.accordionBgColor;

    header.style.padding = DEFAULTS.accordionPadding;
    header.style.backgroundColor = DEFAULTS.accordionHeaderBg;
    header.style.color = DEFAULTS.accordionHeaderTextColor;
    header.style.fontFamily = DEFAULTS.accordionFontFamily;
    header.style.fontSize = DEFAULTS.accordionFontSize;
    header.style.fontWeight = DEFAULTS.accordionFontWeight;
    
    titleSpan.style.textAlign = "left";

    /* ========= ✅ PLAYBOOK OVERRIDES ========= */
    if (bg) header.style.backgroundColor = bg;
    if (color) header.style.color = color;
    if (fontSize) header.style.fontSize = fontSize;
    if (fontWeight) header.style.fontWeight = fontWeight;
    if (align) titleSpan.style.textAlign = align;

    /* ========= CONTENT ========= */
    content.style.padding = DEFAULTS.accordionPadding;
    content.style.backgroundColor = DEFAULTS.accordionContentBg;
    content.style.color = DEFAULTS.accordionTextColor;
    content.style.display = isOpen ? "block" : "none";
    content.style.transition = DEFAULTS.accordionTransition;

    /* ========= ✅ CONTENT PLAYBOOK OVERRIDES ========= */
    if (contentBg) content.style.backgroundColor = contentBg;
    if (contentColor) content.style.color = contentColor;

    /* ========= TOGGLE ========= */
    header.addEventListener("click", () => {
      const expanded = content.style.display === "block";
      content.style.display = expanded ? "none" : "block";
      icon.textContent = expanded
        ? DEFAULTS.accordionIcon
        : DEFAULTS.accordionOpenIcon;
    });

    /* ========= ASSEMBLE ========= */
    wrapper.appendChild(header);
    wrapper.appendChild(content);

    accordion.innerHTML = ""; // 🔑 important for re-init
    accordion.appendChild(wrapper);
  });
}
