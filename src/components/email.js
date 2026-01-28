function initEmailForms() {
  document.querySelectorAll("[data-pp-email-form]").forEach(container => {
    if (container._initialized) return;
    container._initialized = true;

    const onSubmitFn = container.dataset.onSubmit;

    // ---------- FORM ----------
    const form = document.createElement("form");
    form.style.display = "flex";
    form.style.flexDirection = "column";
    form.style.gap = "12px";
    form.noValidate = true;

    // ---------- HELPERS ----------
    function createInput(type, placeholder, required = false) {
      const input = document.createElement("input");
      input.setAttribute("data-pp-input", "");
      input.type = type;
      input.placeholder = placeholder;
      if (required) input.required = true;
      return input;
    }

    function createLabel(text) {
      const label = document.createElement("label");
      label.textContent = text;
      label.style.fontFamily = DEFAULTS.inputFontFamily;
      label.style.fontSize = "14px";
      label.style.fontWeight = "500";
      return label;
    }

    // ---------- FROM ----------
    form.appendChild(createLabel("From"));
    const fromInput = createInput("email", "From email");
    form.appendChild(fromInput);

    // ---------- TO ----------
    form.appendChild(createLabel("To"));
    const toInput = createInput("email", "Recipient email", true);
    form.appendChild(toInput);

    // ---------- CC ----------
    form.appendChild(createLabel("CC"));
    const ccInput = createInput("email", "CC email");
    form.appendChild(ccInput);

    // ---------- SUBJECT ----------
    form.appendChild(createLabel("Subject"));
    const subjectInput = createInput("text", "Email subject", true);
    form.appendChild(subjectInput);

    // ---------- BODY ----------
    form.appendChild(createLabel("Body"));
    const bodyInput = document.createElement("textarea");
    bodyInput.placeholder = "Write your message...";
    bodyInput.style.minHeight = "120px";
    bodyInput.style.padding = DEFAULTS.inputPadding;
    bodyInput.style.fontFamily = DEFAULTS.inputFontFamily;
    bodyInput.style.fontSize = DEFAULTS.inputFontSize;
    bodyInput.style.border =
      `1px solid ${DEFAULTS.inputBorderColor}`;
    bodyInput.style.borderRadius = DEFAULTS.inputBorderRadius;
    form.appendChild(bodyInput);

    // ---------- ATTACHMENTS ----------
    form.appendChild(createLabel("Attachments"));
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.multiple = true;
    fileInput.setAttribute("data-pp-file", "");
    form.appendChild(fileInput);

    // ---------- SUBMIT ----------
    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.setAttribute("data-pp-button", "");
    submitBtn.dataset.label = "Send Email";
    form.appendChild(submitBtn);

    // ---------- SUBMIT HANDLER ----------
    form.addEventListener("submit", e => {
      e.preventDefault();

      const payload = {
        from: fromInput.value,
        to: toInput.value,
        cc: ccInput.value,
        subject: subjectInput.value,
        body: bodyInput.value,
        attachments: Array.from(fileInput.files || [])
      };

      if (
        onSubmitFn &&
        typeof window[onSubmitFn] === "function"
      ) {
        window[onSubmitFn](payload);
      }
    });

    container.appendChild(form);

    // Re-init internal components
    initInputs();
    initButtons();
  });
}
