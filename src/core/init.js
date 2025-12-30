window.PP_UI = {
  init() {
    if (typeof initButtons === "function") initButtons();
    if (typeof initInputs === "function") initInputs();
    if (typeof initDropdowns === "function") initDropdowns();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  window.PP_UI.init();
});
