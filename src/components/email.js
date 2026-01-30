function initEmailForms() {
  document.querySelectorAll("[data-pp-email-form]").forEach(container => {
    if (container._initialized) return;
    container._initialized = true;

    const onSubmitFn = container.dataset.onSubmit;

    // ---------- FORM ----------
    const form = document.createElement("form");
    form.style.display = "flex";
    form.style.flexDirection = "column";
    form.style.gap = "16px";
    form.noValidate = true;

    // ---------- FROM (using initInputs) ----------
    const fromLabel = document.createElement("label");
    fromLabel.textContent = "From";
    form.appendChild(fromLabel);
    const fromInput = document.createElement("input");
    fromInput.setAttribute("data-pp-input", "");
    fromInput.dataset.field = "from";
    fromInput.dataset.type = "email";
    fromInput.placeholder = "From email";
    form.appendChild(fromInput);

    // ---------- TO (using initInputs) ----------
    const toLabel = document.createElement("label");
    toLabel.textContent = "To";
    form.appendChild(toLabel);
    const toInput = document.createElement("input");
    toInput.setAttribute("data-pp-input", "");
    toInput.dataset.field = "to";
    toInput.dataset.type = "email";
    toInput.dataset.required = "true";
    toInput.placeholder = "Recipient email";
    form.appendChild(toInput);

    // ---------- CC (using initInputs) ----------
    const ccLabel = document.createElement("label");
    ccLabel.textContent = "CC";
    form.appendChild(ccLabel);
    const ccInput = document.createElement("input");
    ccInput.setAttribute("data-pp-input", "");
    ccInput.dataset.field = "cc";
    ccInput.dataset.type = "email";
    ccInput.placeholder = "CC email";
    form.appendChild(ccInput);

    // ---------- SUBJECT (using initInputs) ----------
    const subjectLabel = document.createElement("label");
    subjectLabel.textContent = "Subject";
    form.appendChild(subjectLabel);
    const subjectInput = document.createElement("input");
    subjectInput.setAttribute("data-pp-input", "");
    subjectInput.dataset.field = "subject";
    subjectInput.dataset.type = "text";
    subjectInput.dataset.required = "true";
    subjectInput.placeholder = "Email subject";
    form.appendChild(subjectInput);

    // ---------- BODY ----------
    const bodyLabel = document.createElement("label");
    bodyLabel.textContent = "Body";
    form.appendChild(bodyLabel);
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

    // ---------- ATTACHMENTS (using initFileUpload) ----------
    const attachLabel = document.createElement("label");
    attachLabel.textContent = "Attachments";
    form.appendChild(attachLabel);
    const fileInput = document.createElement("input");
    fileInput.setAttribute("data-pp-file", "");
    fileInput.dataset.multiple = "true";
    form.appendChild(fileInput);

    // ---------- SUBMIT (using initButtons) ----------
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

    // Re-init internal components (initInputs, initFileUpload, initButtons)
    initInputs();
    initFileUpload();
    initButtons();
  });
}
