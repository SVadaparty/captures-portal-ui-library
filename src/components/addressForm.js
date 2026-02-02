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

    // ---------- SUBMIT HANDLER ----------
    form.addEventListener("submit", e => {
      e.preventDefault();

      const payload = {
        addressLine1: addr1Input.value,
        addressLine2: addr2Input.value,
        city: cityInput.value,
        state: stateInput.value,
        country: countryInput.value,
        location: locationInput.value,
        pincode: pincodeInput.value
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
