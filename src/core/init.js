window.PP_UI = {
  init() {
    if (typeof initButtons === "function") initButtons();
    if (typeof initInputs === "function") initInputs();
    if (typeof initDropdowns === "function") initDropdowns();
    if (typeof initRadios === "function") initRadios();
    if (typeof initCheckboxes === "function") initCheckboxes();
    if (typeof initDatepicker === "function") initDatepicker();
    if (typeof initFileUpload === "function") initFileUpload();
    if(typeof initTables==="function") initTables();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  window.PP_UI.init();
});
