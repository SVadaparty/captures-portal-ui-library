function initPdfWrappers() {
  document.querySelectorAll("[data-pp-pdf-wrapper]").forEach(wrapper => {

    // ---------- READ ATTRIBUTES ----------
    const id = wrapper.dataset.id || `pp-pdf-${Math.random().toString(36).slice(2)}`;
    const title = wrapper.dataset.title || "Document";
    const orientation = wrapper.dataset.orientation || "portrait"; // portrait | landscape
    const pageSize = wrapper.dataset.pagesize || "a4";
    const downloadLabel = wrapper.dataset.downloadLabel || "Export PDF";

    wrapper.setAttribute("data-pp-pdf-id", id);
    wrapper.classList.add("pp-pdf-wrapper");

    // ---------- TOOLBAR ----------
    const toolbar = document.createElement("div");
    toolbar.className = "pp-pdf-toolbar";

    const btn = document.createElement("button");
    btn.textContent = downloadLabel;
    btn.className = "pp-pdf-btn";

    btn.addEventListener("click", () => {
      exportWrapperToPdf(wrapper, {
        title,
        orientation,
        pageSize
      });
    });

    toolbar.appendChild(btn);
    wrapper.prepend(toolbar);
  });
}

// Export wrapper content to PDF
function exportWrapperToPdf(wrapper, options = {}) {
  const { title = "Document", orientation = "portrait", pageSize = "a4" } = options;

  // Get the content of the wrapper (excluding the toolbar)
  const contentWrapper = wrapper.cloneNode(true);
  const toolbar = contentWrapper.querySelector(".pp-pdf-toolbar");
  if (toolbar) toolbar.remove();

  // Create a new window for printing
  const printWindow = window.open("", "", "height=800,width=900");
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${title}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: Arial, sans-serif;
          font-size: 12px;
          padding: 20px;
        }
        @page {
          size: ${pageSize.toUpperCase()} ${orientation};
          margin: 20mm;
        }
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }
        table th, table td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        table th {
          background-color: #f0f0f0;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      ${contentWrapper.innerHTML}
    </body>
    </html>
  `);
  printWindow.document.close();

  // Trigger print dialog
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 250);
}
