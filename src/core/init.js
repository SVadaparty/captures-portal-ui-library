window.PP_UI = {
  init() {
    if (typeof initButtons === "function") initButtons();
    if (typeof initInputs === "function") initInputs();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  window.PP_UI.init();
});
