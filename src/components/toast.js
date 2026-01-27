function initToasts() {
  if (document.querySelector(".pp-toast-container")) return;

  const container = document.createElement("div");
  container.className = "pp-toast-container";
  document.body.appendChild(container);
}

function showToast(message, type = "success", duration = 3000) {
  initToasts();

  const toast = document.createElement("div");
  toast.className = `pp-toast pp-toast-${type}`;
  toast.textContent = message;

  const container = document.querySelector(".pp-toast-container");
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

function initToastForms() {
  document.querySelectorAll("[data-pp-toast-form]").forEach(form => {
    const input = form.querySelector("[data-pp-toast-input]");
    const button = form.querySelector("[data-pp-toast-submit]");

    button.addEventListener("click", () => {
      const value = input.value.trim();
       console.log("VALUE:", value, "LENGTH:", value.length);

      // ❌ Error case
      if (!value) {
        showToast("Input cannot be empty", "error");
        return;
      }

      // ⚠️ Warning case
      if (value.length < 3) {
        showToast("Input is too short", "warning");
        return;
      }

      // ❌ Failure case (example condition)
      if (value === "123") {
        showToast("Submission failed", "error");
        return;
      }

      // ✅ Success case
      showToast("Submitted successfully!", "success");
      input.value = "";
    });
  });
}


initToastForms();