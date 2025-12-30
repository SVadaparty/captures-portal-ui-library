window.PP_UI = {
  init() {
    if (typeof initButtons === "function") initButtons();
    if (typeof initInputs === "function") initInputs();
    if (typeof initDropdowns === "function") initDropdowns();
    if(typeof initTables==="function") initTables();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  window.PP_UI.init();
});
