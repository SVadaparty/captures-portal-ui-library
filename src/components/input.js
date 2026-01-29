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

    // Create error element (hidden by default)
    const errorEl = document.createElement("div");
    errorEl.style.color = input.dataset.errorcolor || "#d93025";
    errorEl.style.fontSize = input.dataset.errorfontsize || "12px";
    errorEl.style.marginTop = "6px";
    errorEl.style.display = "none";
    if (input.parentNode) input.parentNode.insertBefore(errorEl, input.nextSibling);

    // Focus styles
    input.addEventListener("focus", () => {
      input.style.borderColor = DEFAULTS.inputFocusBorderColor;
    });

    input.addEventListener("blur", () => {
      // validate on blur
      validate();
      input.style.borderColor =
        input.dataset.bordercolor || DEFAULTS.inputBorderColor;
    });

    // Live validation on input
    input.addEventListener("input", () => {
      validate();
    });

    function showError(msg) {
      errorEl.textContent = msg;
      errorEl.style.display = "block";
      input.style.borderColor = input.dataset.errorborder || "#d93025";
    }

    function hideError() {
      errorEl.textContent = "";
      errorEl.style.display = "none";
      input.style.borderColor = input.dataset.bordercolor || DEFAULTS.inputBorderColor;
    }

    function validate() {
      const val = (input.value || "").trim();

      // required
      if (input.dataset.required === "true" && !val) {
        showError(input.dataset.requiredmessage || "This field is required");
        return false;
      }

      // type-based validations
      if (type === "email") {
        const re = /^\S+@\S+\.\S+$/;
        if (val && !re.test(val)) {
          showError(input.dataset.errormessage || input.dataset.error || "Please enter a valid email address");
          return false;
        }
      }

      if (type === "password") {
        const min = parseInt(input.dataset.minlength || input.dataset.minLength || "8", 10);
        if (val && val.length < min) {
          showError(input.dataset.errormessage || `Password must be at least ${min} characters`);
          return false;
        }
      }

      if (type === "pincode") {
        const len = parseInt(input.dataset.length || input.dataset.len || "6", 10);
        const pinRe = new RegExp(`^\\d{${len}}$`);
        if (val && !pinRe.test(val)) {
          showError(input.dataset.errormessage || `Pincode must be ${len} digits`);
          return false;
        }
      }

      if (type === "mobile" || type === "phone") {
        const len = parseInt(input.dataset.length || input.dataset.len || "10", 10);
        const phoneRe = new RegExp(`^\\d{${len}}$`);
        if (val && !phoneRe.test(val)) {
          showError(input.dataset.errormessage || `Mobile number must be ${len} digits`);
          return false;
        }
      }

      hideError();
      return true;
    }

    // onchange (CSP-safe) — still call, but ensure validation runs first
    if (onChangeFn && typeof window[onChangeFn] === "function") {
      input.addEventListener("change", e => {
        const valid = validate();
        window[onChangeFn](e.target.value, e, valid);
      });
    }
  });
}


function submitAddressForm(formId) {
  const form = document.getElementById(formId);
  if (!form) {
    alert("Form not found: " + formId);
    return;
  }

  const inputs = form.querySelectorAll("[data-pp-input]");

  console.log("Inputs found:", inputs.length);

  if (!inputs.length) {
    alert("No inputs found in form");
    return;
  }

  const data = {};
  let allValid = true;

  inputs.forEach(input => {
    input.dispatchEvent(new Event("blur"));

    if (input.dataset.required === "true" && !input.value.trim()) {
      allValid = false;
    }

    const key =
      input.dataset.name ||
      input.dataset.placeholder ||
      "field";

    data[key] = input.value.trim();
  });

  if (!allValid) {
    alert("Please fill all required fields correctly.");
    return;
  }

  let message = "Address Form Data:\n\n";
  Object.entries(data).forEach(([k, v]) => {
    message += `${k}: ${v || "-"}\n`;
  });

  alert(message);
}

window.submitAddressForm = submitAddressForm;

