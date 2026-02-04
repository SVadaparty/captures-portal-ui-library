function initToast() {
  document.querySelectorAll("[data-pp-toast]").forEach(container => {

    if (container._initialized) return;
    container._initialized = true;

    const position = container.dataset.position || "top-right";
    const duration = parseInt(container.dataset.duration || "3000");

    // Reset
    container.innerHTML = "";

    const positions = {
      "top-right": { top: "20px", right: "20px" },
      "top-left": { top: "20px", left: "20px" },
      "bottom-right": { bottom: "20px", right: "20px" },
      "bottom-left": { bottom: "20px", left: "20px" }
    };

    container.style.position = "fixed";
    container.style.zIndex = "9999";
    Object.assign(container.style, positions[position]);
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "10px";
    container.style.pointerEvents = "none";

    window.showToast = function (message, type = "success") {
      const toast = document.createElement("div");
      toast.style.pointerEvents = "auto";

      const colors = {
        success: "#16a34a",
        error: "#dc2626",
        warning: "#d97706"
      };

      toast.textContent = message;
      toast.style.padding = "12px 16px";
      toast.style.borderRadius = "6px";
      toast.style.background = colors[type];
      toast.style.color = "#fff";
      toast.style.fontSize = "14px";
      toast.style.fontFamily = "Segoe UI, system-ui, sans-serif";
      toast.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)";
      toast.style.animation = "pp-toast-in 0.3s ease";

      container.appendChild(toast);

      setTimeout(() => {
        toast.style.animation = "pp-toast-out 0.3s ease";
        toast.addEventListener("animationend", () => toast.remove());
      }, duration);
    };
  });
}

/* Inject styles once */
if (!document.getElementById("pp-toast-style")) {
  const style = document.createElement("style");
  style.id = "pp-toast-style";
  style.textContent = `
    @keyframes pp-toast-in {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pp-toast-out {
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(-10px); }
    }
  `;
  document.head.appendChild(style);
}

/* 🔥 IMPORTANT: init after DOM load */
document.addEventListener("DOMContentLoaded", () => {
  initToast();

 function initInputForm() {
  document.querySelectorAll("[data-pp-input-form]").forEach(container => {

    // 🔐 guard
    if (container._initialized) return;
    container._initialized = true;

    const placeholder = container.dataset.placeholder || "Enter value";
    const onSubmitFn = container.dataset.onSubmit;

    // Render component UI
    container.innerHTML = `
      <input data-pp-input type="text" placeholder="${placeholder}" />
      <button type="button" data-pp-submit>Submit</button>
    `;

    const input = container.querySelector("[data-pp-input]");
    const button = container.querySelector("[data-pp-submit]");

    button.addEventListener("click", () => {
      const value = input.value;

      // ❌ Empty
      if (value === "") {
        showToast("Input cannot be empty", "error");
        return;
      }

      // ⚠️ Short
      if (value.trim().length < 3) {
        showToast("Input is too short", "warning");
        return;
      }

      // ❌ Failure
      if (value.trim() === "123") {
        showToast("Submission failed", "error");
        return;
      }

      // ✅ Success
      showToast("Submitted successfully!", "success");

      // 🔁 Optional callback
      if (onSubmitFn && typeof window[onSubmitFn] === "function") {
        window[onSubmitFn](value);
      }

      input.value = "";
    });
  });
}
    initInputForm();



});

// Optional global exposure
window.initToast = initToast;
