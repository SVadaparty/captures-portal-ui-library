function initContactForms() {
  document.querySelectorAll("[data-pp-contact-form]").forEach(container => {
    if (container._initialized) return;
    container._initialized = true;

    const onSubmitFn = container.dataset.onSubmit;

    // ---------- FORM ----------
    const form = document.createElement("form");
    form.className = 'pp-contact-form';
    form.style.display = "flex";
    form.style.flexDirection = "column";
    form.style.gap = "16px";
    form.noValidate = true;

    // ---------- NAME ----------
    const nameLabel = document.createElement("label");
    nameLabel.textContent = "Name";
    form.appendChild(nameLabel);

    const nameInput = document.createElement("input");
    nameInput.setAttribute("data-pp-input", "");
    // Use contact-scoped input class to avoid affecting other components
    nameInput.classList.add('pp-contact-input');
    nameInput.dataset.field = "name";
    nameInput.dataset.type = "text";
    nameInput.dataset.required = "true";
    // Use visible label instead of placeholder
    form.appendChild(nameInput);

    // ---------- MOBILE ----------
    const mobileLabel = document.createElement("label");
    mobileLabel.textContent = "Mobile No";
    form.appendChild(mobileLabel);

    const mobileInput = document.createElement("input");
    mobileInput.setAttribute("data-pp-input", "");
    mobileInput.classList.add('pp-contact-input');
    mobileInput.dataset.field = "mobile";
    mobileInput.dataset.type = "number";
    mobileInput.dataset.required = "true";
    // Use visible label instead of placeholder
    form.appendChild(mobileInput);

    // ---------- EMAIL ----------
    const emailLabel = document.createElement("label");
    emailLabel.textContent = "Email";
    form.appendChild(emailLabel);

    const emailInput = document.createElement("input");
    emailInput.setAttribute("data-pp-input", "");
    emailInput.classList.add('pp-contact-input');
    emailInput.dataset.field = "email";
    emailInput.dataset.type = "email";
    // Use visible label instead of placeholder
    form.appendChild(emailInput);

    // ---------- MESSAGE ----------
    const messageLabel = document.createElement("label");
    messageLabel.textContent = "Message";
    form.appendChild(messageLabel);

    // const messageInput = document.createElement("textarea");
    const messageInput = document.createElement("input");
    messageInput.setAttribute("data-pp-input", "");
    messageInput.classList.add('pp-contact-input');
    messageInput.dataset.field = "message";
    messageInput.dataset.required = "true";
    // Use visible label instead of placeholder
    messageInput.style.minHeight = "120px";
    messageInput.style.padding = DEFAULTS.inputPadding;
    messageInput.style.fontFamily = DEFAULTS.inputFontFamily;
    messageInput.style.fontSize = DEFAULTS.inputFontSize;
    messageInput.style.border = `1px solid ${DEFAULTS.inputBorderColor}`;
    messageInput.style.borderRadius = DEFAULTS.inputBorderRadius;
    form.appendChild(messageInput);

    // ---------- SUBMIT ----------
    // If the host element opts in via `data-use-global-button="true"`, create a standard data-pp-button
    let submitBtn;
    if (container.dataset.useGlobalButton === 'true') {
      submitBtn = document.createElement('button');
      submitBtn.type = 'submit';
      submitBtn.setAttribute('data-pp-button', '');
      submitBtn.dataset.label = container.dataset.submitLabel || 'Submit';
      submitBtn.dataset.type = container.dataset.submitType || 'primary';
    } else {
      submitBtn = document.createElement('button');
      submitBtn.type = 'submit';
      submitBtn.classList.add('pp-contact-submit');
      submitBtn.textContent = container.dataset.submitLabel || 'Submit';
    }

    form.appendChild(submitBtn);

    // ---------- SUBMIT HANDLER ----------
    form.addEventListener("submit", e => {
      e.preventDefault();

      const payload = {
        name: nameInput.value,
        mobile: mobileInput.value,
        email: emailInput.value,
        message: messageInput.value
      };

      if (onSubmitFn && typeof window[onSubmitFn] === "function") {
        window[onSubmitFn](payload);
      }
    });

    container.appendChild(form);

    // ---------- RE-INIT ----------
    initInputs();
    initButtons();
  });
}
