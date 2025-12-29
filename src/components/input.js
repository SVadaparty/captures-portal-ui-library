function initInputs() {
  document.querySelectorAll("[data-pp-input]").forEach(input => {
    const placeholder = input.dataset.placeholder || "";
    const type = input.dataset.type || "text";
    input.classList.add("pp-input");
    input.placeholder = placeholder;
    input.type = type;
  });
}
