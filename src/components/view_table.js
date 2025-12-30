/* ======================================================
   SHARED INPUT STYLE HELPER
   ====================================================== */
function applyInputStyles(input, overrides = {}) {
  input.style.height =
    overrides.height || DEFAULTS.tableInputHeight;
  input.style.padding =
    overrides.padding || DEFAULTS.tableInputPadding;
  input.style.border = `1px solid ${
    overrides.borderColor || DEFAULTS.tableInputBorderColor
  }`;
  input.style.borderRadius =
    overrides.borderRadius || DEFAULTS.tableInputBorderRadius;
  input.style.fontSize =
    overrides.fontSize || DEFAULTS.tableInputFontSize;
  input.style.outline = "none";

  input.addEventListener("focus", () => {
    input.style.borderColor =
      overrides.focusBorderColor ||
      DEFAULTS.tableInputFocusBorderColor;
  });

  input.addEventListener("blur", () => {
    input.style.borderColor =
      overrides.borderColor || DEFAULTS.tableInputBorderColor;
  });
}

function getAttr(el, attr, defaultValue) {
  return el.dataset[attr] !== undefined
    ? el.dataset[attr]
    : defaultValue;
}


/* ======================================================
   TABLE COMPONENT
   ====================================================== */
function initTables() {
  document.querySelectorAll("[data-pp-table]").forEach(container => {
    const dataSourceName = container.dataset.datasource;
    const data = window[dataSourceName];

    if (!Array.isArray(data) || data.length === 0) {
      container.innerHTML = "<p>No data available</p>";
      return;
    }

    /* ===== CONFIG ===== */
    const config = {
      pageSize: parseInt(container.dataset.pageSize || "5", 10),
      stickyHeader: container.dataset.stickyHeader !== "false",
      columnToggle: container.dataset.columnToggle !== "false",
      enableSearch: container.dataset.search !== "false",

      width: getAttr(container, "width", DEFAULTS.tableWidth),
      fontFamily: getAttr(container, "fontFamily", DEFAULTS.tableFontFamily),
      fontSize: getAttr(container, "fontSize", DEFAULTS.tableFontSize),
      textColor: getAttr(container, "textColor", DEFAULTS.tableTextColor),
      borderColor: getAttr(container, "borderColor", DEFAULTS.tableBorderColor),
      headerBg: getAttr(container, "headerBg", DEFAULTS.tableHeaderBg),
      headerTextColor: getAttr(container, "headerTextColor", DEFAULTS.tableHeaderTextColor),
      rowHoverBg: getAttr(container, "rowHoverBg", DEFAULTS.tableRowHoverBg),
      searchPlaceholder: getAttr(container, "searchPlaceholder", DEFAULTS.searchPlaceholder)
    };

    const columns = Object.keys(data[0]);
    let visibleColumns = [...columns];
    let filteredData = [...data];

    let currentPage = 1;
    let sortColumn = null;
    let sortDirection = "asc";

    container.innerHTML = "";
    container.style.fontFamily = config.fontFamily;
    container.style.fontSize = config.fontSize;
    container.style.color = config.textColor;

    /* ================= TOP BAR ================= */
    const topBar = document.createElement("div");
    topBar.style.display = "flex";
    topBar.style.justifyContent = "space-between";
    topBar.style.alignItems = "center";
    topBar.style.marginBottom = "10px";

    const leftBar = document.createElement("div");
    const rightBar = document.createElement("div");

    topBar.appendChild(leftBar);
    topBar.appendChild(rightBar);
    container.appendChild(topBar);

    /* ========== SEARCH (RIGHT) ========== */
    if (config.enableSearch) {
      const searchInput = document.createElement("input");
      searchInput.placeholder = config.searchPlaceholder;
      applyInputStyles(searchInput);
      searchInput.style.minWidth = "220px";

      searchInput.addEventListener("input", e => {
        const val = e.target.value.toLowerCase();
        filteredData = data.filter(row =>
          columns.some(col =>
            String(row[col]).toLowerCase().includes(val)
          )
        );
        currentPage = 1;
        applySorting();
        renderTable();
      });

      rightBar.appendChild(searchInput);
    }

    /* ================= TABLE ================= */
    const tableWrapper = document.createElement("div");
    tableWrapper.style.maxHeight = "360px";
    tableWrapper.style.overflow = "auto";

    const table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";

    tableWrapper.appendChild(table);
    container.appendChild(tableWrapper);

    /* ================= PAGINATION ================= */
    const pagination = document.createElement("div");
    pagination.style.display = "flex";
    pagination.style.justifyContent = "flex-end";
    pagination.style.alignItems = "center";
    pagination.style.gap = "6px";
    pagination.style.marginTop = "10px";
    container.appendChild(pagination);

    /* ================= SORTING ================= */
    function applySorting() {
      if (!sortColumn) return;

      filteredData.sort((a, b) => {
        const A = a[sortColumn];
        const B = b[sortColumn];

        if (!isNaN(A) && !isNaN(B)) {
          return sortDirection === "asc" ? A - B : B - A;
        }

        return sortDirection === "asc"
          ? String(A).localeCompare(String(B))
          : String(B).localeCompare(String(A));
      });
    }

    function toggleSort(col) {
      if (sortColumn === col) {
        sortDirection = sortDirection === "asc" ? "desc" : "asc";
      } else {
        sortColumn = col;
        sortDirection = "asc";
      }
      applySorting();
      renderTable();
    }

    /* ================= RENDER ================= */
    function renderTable() {
      table.innerHTML = "";
      pagination.innerHTML = "";

      const start = (currentPage - 1) * config.pageSize;
      const pageData = filteredData.slice(start, start + config.pageSize);

      /* HEADER */
      const thead = document.createElement("thead");
      const headerRow = document.createElement("tr");

      visibleColumns.forEach(col => {
        const th = document.createElement("th");
        th.textContent =
          col +
          (sortColumn === col
            ? sortDirection === "asc"
              ? " ▲"
              : " ▼"
            : "");

        th.style.padding = DEFAULTS.tablePadding;
        th.style.border = `1px solid ${config.borderColor}`;
        th.style.background = config.headerBg;
        th.style.color = config.headerTextColor;
        th.style.cursor = "pointer";
        th.style.userSelect = "none";
        th.style.position = config.stickyHeader ? "sticky" : "";
        th.style.top = config.stickyHeader ? "0" : "";
        th.style.textTransform="capitalize"

        th.addEventListener("click", () => toggleSort(col));
        headerRow.appendChild(th);
      });

      thead.appendChild(headerRow);
      table.appendChild(thead);

      /* BODY */
      const tbody = document.createElement("tbody");

      pageData.forEach(row => {
        const tr = document.createElement("tr");

        tr.addEventListener("mouseenter", () => {
          tr.style.background = config.rowHoverBg;
        });
        tr.addEventListener("mouseleave", () => {
          tr.style.background = "";
        });

        visibleColumns.forEach(col => {
          const td = document.createElement("td");
          td.textContent = row[col];
          td.style.padding = DEFAULTS.tablePadding;
          td.style.border = `1px solid ${config.borderColor}`;
          tr.appendChild(td);
        });

        tbody.appendChild(tr);
      });

      table.appendChild(tbody);

      /* PAGINATION UI */
      const totalPages = Math.ceil(filteredData.length / config.pageSize);

      const prevBtn = document.createElement("button");
      prevBtn.textContent = "Prev";
      stylePageButton(prevBtn, currentPage === 1);
      prevBtn.onclick = () => {
        if (currentPage > 1) {
          currentPage--;
          renderTable();
        }
      };

      const nextBtn = document.createElement("button");
      nextBtn.textContent = "Next";
      stylePageButton(nextBtn, currentPage === totalPages);
      nextBtn.onclick = () => {
        if (currentPage < totalPages) {
          currentPage++;
          renderTable();
        }
      };

      const pageInfo = document.createElement("span");
      pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
      pageInfo.style.margin = "0 6px";

      pagination.appendChild(prevBtn);
      pagination.appendChild(pageInfo);
      pagination.appendChild(nextBtn);
    }

    function stylePageButton(btn, disabled) {
      btn.disabled = disabled;
      btn.style.padding = "6px 12px";
      btn.style.borderRadius = "4px";
      btn.style.border = "1px solid #ccc";
      btn.style.cursor = disabled ? "not-allowed" : "pointer";
      btn.style.background = disabled ? "#f2f2f2" : "#fff";
    }

    renderTable();
  });
}

