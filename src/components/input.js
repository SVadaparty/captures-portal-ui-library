function initInputs() {
  document.querySelectorAll("[data-pp-input]").forEach(input => {
    const type = input.dataset.type || DEFAULTS.inputType;
    const placeholder =
      input.dataset.placeholder || DEFAULTS.inputPlaceholder;
    const onChangeFn = input.dataset.onchange;

    // Attributes
    input.type = type;
    input.placeholder = placeholder;
  

    // Styles (from DEFAULTS) — allow per-instance override via data-width / data-height
    input.style.width = input.dataset.width || DEFAULTS.inputWidth;
    input.style.height = input.dataset.height || DEFAULTS.inputHeight;
    input.style.padding = DEFAULTS.inputPadding;
    input.style.fontFamily = DEFAULTS.inputFontFamily;
    input.style.fontSize = DEFAULTS.inputFontSize;
    input.style.fontWeight = DEFAULTS.inputFontWeight;
    input.style.color = input.dataset.color || DEFAULTS.inputTextColor;
    input.style.backgroundColor =
      input.dataset.bgcolor || DEFAULTS.inputBgColor;
    input.style.border = `1px solid ${
      input.dataset.bordercolor || DEFAULTS.inputBorderColor
    }`;
    input.style.borderRadius = DEFAULTS.inputBorderRadius;
    input.style.outline = "none";

    // Focus styles
    input.addEventListener("focus", () => {
      input.style.borderColor = DEFAULTS.inputFocusBorderColor;
    });

    input.addEventListener("blur", () => {
      input.style.borderColor =
        input.dataset.bordercolor || DEFAULTS.inputBorderColor;
    });

    // onchange (CSP-safe)
    if (onChangeFn && typeof window[onChangeFn] === "function") {
      input.addEventListener("change", e =>
        window[onChangeFn](e.target.value, e)
      );
    }
  });
}
