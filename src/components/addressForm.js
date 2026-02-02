function initAddressForms() {
  document.querySelectorAll("[data-pp-address-form]").forEach(container => {
    if (container._initialized) return;
    container._initialized = true;

    const onSubmitFn = container.dataset.onSubmit;

    // ---------- FORM ----------
    const form = document.createElement("form");
    form.style.display = "flex";
    form.style.flexDirection = "column";
    form.style.gap = "16px";
    form.noValidate = true;

    // ---------- ADDRESS LINE 1 ----------
    const addr1Label = document.createElement("label");
    addr1Label.textContent = "Address Line 1";
    form.appendChild(addr1Label);

    const addr1Input = document.createElement("input");
    addr1Input.setAttribute("data-pp-input", "");
    addr1Input.dataset.field = "addressLine1";
    addr1Input.dataset.type = "text";
    addr1Input.dataset.required = "true";
    addr1Input.placeholder = "Address Line 1";
    form.appendChild(addr1Input);

    // ---------- ADDRESS LINE 2 ----------
    const addr2Label = document.createElement("label");
    addr2Label.textContent = "Address Line 2";
    form.appendChild(addr2Label);

    const addr2Input = document.createElement("input");
    addr2Input.setAttribute("data-pp-input", "");
    addr2Input.dataset.field = "addressLine2";
    addr2Input.dataset.type = "text";
    addr2Input.placeholder = "Address Line 2";
    form.appendChild(addr2Input);

    // ---------- CITY ----------
    const cityLabel = document.createElement("label");
    cityLabel.textContent = "City";
    form.appendChild(cityLabel);

    const cityInput = document.createElement("input");
    cityInput.setAttribute("data-pp-input", "");
    cityInput.dataset.field = "city";
    cityInput.dataset.type = "text";
    cityInput.dataset.required = "true";
    cityInput.placeholder = "City";
    form.appendChild(cityInput);

    // ---------- STATE ----------
    const stateLabel = document.createElement("label");
    stateLabel.textContent = "State";
    form.appendChild(stateLabel);

    const stateInput = document.createElement("input");
    stateInput.setAttribute("data-pp-input", "");
    stateInput.dataset.field = "state";
    stateInput.dataset.type = "text";
    stateInput.dataset.required = "true";
    stateInput.placeholder = "State";
    form.appendChild(stateInput);

    // ---------- COUNTRY ----------
    const countryLabel = document.createElement("label");
    countryLabel.textContent = "Country";
    form.appendChild(countryLabel);

    const countryInput = document.createElement("input");
    countryInput.setAttribute("data-pp-input", "");
    countryInput.dataset.field = "country";
    countryInput.dataset.type = "text";
    countryInput.dataset.required = "true";
    countryInput.placeholder = "Country";
    form.appendChild(countryInput);

    // ---------- LOCATION ----------
    const locationLabel = document.createElement("label");
    locationLabel.textContent = "Location";
    form.appendChild(locationLabel);

    const locationInput = document.createElement("input");
    locationInput.setAttribute("data-pp-input", "");
    locationInput.dataset.field = "location";
    locationInput.dataset.type = "text";
    locationInput.placeholder = "Location / Area";
    form.appendChild(locationInput);

    // ---------- PINCODE ----------
    const pincodeLabel = document.createElement("label");
    pincodeLabel.textContent = "Pincode";
    form.appendChild(pincodeLabel);

    const pincodeInput = document.createElement("input");
    pincodeInput.setAttribute("data-pp-input", "");
    pincodeInput.dataset.field = "pincode";
    pincodeInput.dataset.type = "number";
    pincodeInput.dataset.required = "true";
    pincodeInput.placeholder = "Pincode";
    form.appendChild(pincodeInput);

    // ---------- SUBMIT ----------
    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.setAttribute("data-pp-button", "");
    submitBtn.dataset.label = "Save Address";
    form.appendChild(submitBtn);

    // Add asterisks to required fields (except Address Line 2)
    if (addr1Input.dataset.required === "true") addr1Label.innerHTML += ' <span style="color:red">*</span>';
    if (cityInput.dataset.required === "true") cityLabel.innerHTML += ' <span style="color:red">*</span>';
    if (stateInput.dataset.required === "true") stateLabel.innerHTML += ' <span style="color:red">*</span>';
    if (countryInput.dataset.required === "true") countryLabel.innerHTML += ' <span style="color:red">*</span>';
    if (pincodeInput.dataset.required === "true") pincodeLabel.innerHTML += ' <span style="color:red">*</span>';

    // Helper to show validation error
    function showError(input, message) {
      // remove existing error
      const next = input.nextElementSibling;
      if (next && next.classList && next.classList.contains('pp-error')) next.remove();

      const err = document.createElement('div');
      err.className = 'pp-error';
      err.style.color = 'red';
      err.style.fontSize = '12px';
      err.style.marginTop = '4px';
      err.textContent = message;
      input.style.borderColor = 'red';
      input.parentNode.insertBefore(err, input.nextSibling);
    }

    function clearErrors(formEl) {
      formEl.querySelectorAll('.pp-error').forEach(el => el.remove());
      formEl.querySelectorAll('[data-pp-input]').forEach(i => i.style.borderColor = '');
    }

    // ---------- SUBMIT HANDLER ----------
    form.addEventListener("submit", e => {
      e.preventDefault();

      clearErrors(form);

      const inputs = form.querySelectorAll('[data-pp-input]');
      const errors = [];

      inputs.forEach(input => {
        const isRequired = input.dataset.required === 'true';
        const value = (input.value || '').toString().trim();

        if (isRequired && value === '') {
          errors.push({ field: input.dataset.field || input.name || 'field', message: input.dataset.requiredmessage || 'This field is required' });
          showError(input, input.dataset.requiredmessage || 'This field is required');
        }

        // Additional checks: if pincode has a data-length attribute validate length
        if (input.dataset.type === 'number' && input.dataset.length) {
          const expected = parseInt(input.dataset.length, 10);
          if (value && value.length !== expected) {
            errors.push({ field: input.dataset.field || 'pincode', message: input.dataset.errormessage || `Must be ${expected} digits` });
            showError(input, input.dataset.errormessage || `Must be ${expected} digits`);
          }
        }
      });

      if (errors.length > 0) {
        // focus first invalid input
        const firstInvalid = form.querySelector('.pp-error');
        if (firstInvalid) firstInvalid.previousElementSibling.focus();
        alert('Please fill all required fields.');
        return;
      }

      const payload = {
        addressLine1: addr1Input.value,
        addressLine2: addr2Input.value,
        city: cityInput.value,
        state: stateInput.value,
        country: countryInput.value,
        location: locationInput.value,
        pincode: pincodeInput.value
      };

      // Show JSON alert for user
      alert('Address submitted:\n' + JSON.stringify(payload, null, 2));

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
