function initLoader() {
  document.querySelectorAll("[data-pp-loader]").forEach(container => {

    const text = container.dataset.text || "Loading...";
    const size = container.dataset.size || "40px";
    const color = container.dataset.color || "#2563eb";
    const bgColor = container.dataset.bgcolor || "#e5e7eb";
    const align = container.dataset.align || "center";

    // Reset (IMPORTANT)
    container.innerHTML = "";

    // Alignment
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = align;
    container.style.justifyContent = "center";
    container.style.gap = "12px";

    // Spinner
    const spinner = document.createElement("div");
    spinner.style.width = size;
    spinner.style.height = size;
    spinner.style.border = `4px solid ${bgColor}`;
    spinner.style.borderTop = `4px solid ${color}`;
    spinner.style.borderRadius = "50%";
    spinner.style.animation = "pp-spin 1s linear infinite";

    // Text
    const label = document.createElement("div");
    label.textContent = text;
    label.style.fontSize = "14px";
    label.style.color = "#374151";
    label.style.fontFamily = "Segoe UI, system-ui, sans-serif";

    container.appendChild(spinner);
    container.appendChild(label);
  });
}

/* Keyframes (inject once) */
if (!document.getElementById("pp-loader-style")) {
  const style = document.createElement("style");
  style.id = "pp-loader-style";
  style.textContent = `
    @keyframes pp-spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}
