function initFileUpload() {
  document.querySelectorAll("[data-pp-file]").forEach(input => {
    const onChangeFn = input.dataset.onchange;
    const accept = input.dataset.accept;

    /* =========================
       MAX FILE SIZE (MB)
    ========================= */
    const maxSizeMB =
      parseInt(input.dataset.maxSize, 10) || DEFAULTS.fileMaxSizeMB;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;


    /* =========================
       ATTRIBUTES
    ========================= */
    input.type = "file";
    if (accept) input.accept = accept;

    /* =========================
       SINGLE / MULTI FILE CONTROL
    ========================= */
    const isMultiple = input.dataset.multiple === "true";
    isMultiple ? input.setAttribute("multiple", "") : input.removeAttribute("multiple");

    /* =========================
       ALIGNMENT WRAPPER (FIX)
    ========================= */
    const align = input.dataset.align || "left"; // left | center

    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.width = "100%";
    wrapper.style.height = DEFAULTS.fileInputHeight; // 🔑 key fix
    wrapper.style.justifyContent =
      align === "center" ? "center" : "flex-start";
    wrapper.style.alignItems = "center"; // 🔑 vertical centering

    input.parentNode.insertBefore(wrapper, input);
    wrapper.appendChild(input);

    /* =========================
       WIDTH OVERRIDE
    ========================= */
    const width = input.dataset.width || DEFAULTS.fileInputWidth;
    input.style.width = width;
    input.style.display = "inline-flex"; // 🔑 prevents baseline issue
    input.style.alignItems = "center";

    /* =========================
       STYLES (FROM DEFAULTS)
    ========================= */
    input.style.height = DEFAULTS.fileInputHeight;
    input.style.lineHeight = DEFAULTS.fileInputHeight; // 🔑 key fix
    input.style.padding = DEFAULTS.fileInputPadding;
    input.style.borderRadius = DEFAULTS.fileInputBorderRadius;
    input.style.border = `1px solid ${DEFAULTS.fileInputBorderColor}`;
    input.style.backgroundColor = DEFAULTS.fileInputBgColor;
    input.style.color = DEFAULTS.fileInputTextColor;
    input.style.fontFamily = DEFAULTS.fileInputFontFamily;
    input.style.fontSize = DEFAULTS.fileInputFontSize;
    input.style.fontWeight = DEFAULTS.fileInputFontWeight;
    input.style.cursor = DEFAULTS.fileInputCursor;
    input.style.outline = "none";

    /* =========================
       ERROR MESSAGE
    ========================= */
    const errorEl = document.createElement("div");
    errorEl.style.color = DEFAULTS.fileErrorColor;
    errorEl.style.fontSize = DEFAULTS.fileErrorFontSize;
    errorEl.style.marginTop = DEFAULTS.fileErrorMarginTop;
    errorEl.style.display = "none";

    wrapper.appendChild(errorEl);

    /* =========================
       CHANGE HANDLER
    ========================= */
    input.addEventListener("change", e => {
      errorEl.style.display = "none";

      const files = Array.from(e.target.files);
      const invalidFile = files.find(f => f.size > maxSizeBytes);

      if (invalidFile) {
        errorEl.textContent = `File "${invalidFile.name}" exceeds ${maxSizeMB} MB limit`;
        errorEl.style.display = "block";
        input.value = "";
        return;
      }

      if (onChangeFn && typeof window[onChangeFn] === "function") {
        window[onChangeFn](files, e);
      }
    });
  });
}
