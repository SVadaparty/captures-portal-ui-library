function initAccordions() {
  document.querySelectorAll("[data-pp-accordion]").forEach(accordion => {

    const title = accordion.dataset.title || "Accordion";
    const isOpen = accordion.dataset.open === "true";

    /* ========= STRUCTURE ========= */
    const wrapper = document.createElement("div");
    const header = document.createElement("div");
    const icon = document.createElement("span");
    const content = document.createElement("div");

    // Move existing content into accordion body
    while (accordion.firstChild) {
      content.appendChild(accordion.firstChild);
    }

    /* ========= HEADER ========= */
    header.textContent = title;
    header.appendChild(icon);

    header.style.display = "flex";
    header.style.justifyContent = "space-between";
    header.style.alignItems = "center";
    header.style.cursor = "pointer";

    /* ========= ICON ========= */
    icon.textContent =
      isOpen ? DEFAULTS.accordionOpenIcon : DEFAULTS.accordionIcon;

    /* ========= STYLES ========= */
    wrapper.style.border = `1px solid ${DEFAULTS.accordionBorderColor}`;
    wrapper.style.borderRadius = DEFAULTS.accordionBorderRadius;
    wrapper.style.backgroundColor = DEFAULTS.accordionBgColor;

    header.style.padding = DEFAULTS.accordionPadding;
    header.style.backgroundColor = DEFAULTS.accordionHeaderBg;
    header.style.color = DEFAULTS.accordionHeaderTextColor;
    header.style.fontFamily = DEFAULTS.accordionFontFamily;
    header.style.fontSize = DEFAULTS.accordionFontSize;
    header.style.fontWeight = DEFAULTS.accordionFontWeight;

    content.style.padding = DEFAULTS.accordionPadding;
    content.style.backgroundColor = DEFAULTS.accordionContentBg;
    content.style.color = DEFAULTS.accordionTextColor;
    content.style.display = isOpen ? "block" : "none";
    content.style.transition = DEFAULTS.accordionTransition;

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

    accordion.appendChild(wrapper);
  });
}
