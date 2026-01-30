function submitPPForm(formId, title = "Form Data") {
  const form = document.getElementById(formId);
  if (!form) {
    alert("Form not found: " + formId);
    return;
  }

  const inputs = form.querySelectorAll("[data-pp-input]");
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

  let message = `${title}:\n\n`;
  Object.entries(data).forEach(([k, v]) => {
    message += `${k}: ${v || "-"}\n`;
  });

  alert(message);
}

// expose globally (required for onclick)
window.submitPPForm = submitPPForm;
