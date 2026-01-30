window.PP_UI = {
  init() {
    if (typeof initButtons === "function") initButtons();
    if (typeof initInputs === "function") initInputs();
    if (typeof initDropdowns === "function") initDropdowns();
    if (typeof initRadios === "function") initRadios();
    if (typeof initCheckboxes === "function") initCheckboxes();
    if (typeof initDatepicker === "function") initDatepicker();
    if (typeof initFileUpload === "function") initFileUpload();
    if (typeof initSelectMenus === "function") initSelectMenus();
    if(typeof initTables==="function") initTables();
    if (typeof initModal === "function") initModal();
    if (typeof initToasts === "function") initToasts();
    if (typeof submitAddressForm === "function") submitAddressForm();
    if (typeof submitPPForm === "function") submitPPForm();
    if(typeof initHeaders==="function") initHeaders();
    if(typeof initFooters==="function") initFooters();
    if(typeof initLoader==="function") initLoader();
    if(typeof initAlerts==="function") initAlerts();
    if(typeof initAccordions==="function") initAccordions();
    if(typeof initPdfWrappers==="function") initPdfWrappers();
    if(typeof initTabs==="function") initTabs();
    if(typeof initBreadcrumbs==="function") initBreadcrumbs();
    if(typeof initAccordions==="function") initSidebars();
    if(typeof initSidebars==="function") initCards();
    if(typeof initKPIs==="function") initKPIs();
  }
};

// Expose key functions to window for external calls
if (typeof initSelectMenus === "function") {
  window.initSelectMenus = initSelectMenus;
}

document.addEventListener("DOMContentLoaded", () => {
  window.PP_UI.init();
});
