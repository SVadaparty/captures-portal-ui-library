function initTabs() {
  document.querySelectorAll("[data-pp-tabs]").forEach(container => {

    const tabs = (container.dataset.tabs || "")
      .split(",")
      .map(t => t.trim())
      .filter(Boolean);

    if (!tabs.length) return;

    const activeIndex = parseInt(container.dataset.active || "0", 10);
    const onSelectFn = container.dataset.onselect;

    // ---------- CONFIG ----------
    const textColor = container.dataset.textColor || "#475569";
    const activeBg = container.dataset.activeBg || "#2563eb";
    const activeColor = container.dataset.activeColor || "#2563eb";
    const hoverColor = container.dataset.hoverColor || "#1d4ed8";
    const activeBgStyle = container.dataset.activeBgStyle || "underline"; // DEFAULT

    // ---------- CSS VARIABLES ----------
    container.style.setProperty("--pp-tab-text", textColor);
    container.style.setProperty("--pp-tab-active-bg", activeBg);
    container.style.setProperty("--pp-tab-active-color", activeColor);
    container.style.setProperty("--pp-tab-hover-color", hoverColor);

    container.classList.add("pp-tabs");

    const list = document.createElement("div");
    list.className = "pp-tabs-list";
    container.appendChild(list);

    tabs.forEach((label, index) => {
      const btn = document.createElement("button");
      btn.className = "pp-tab";
      btn.textContent = label;

      if (index === activeIndex) {
        setActive(btn);
      }

      btn.addEventListener("click", () => activate(index));

      list.appendChild(btn);
    });

    function activate(index) {
      list.querySelectorAll(".pp-tab").forEach((tab, i) => {
        tab.classList.remove("pp-tab-active", "pp-tab-underline", "pp-tab-block");

        if (i === index) {
          setActive(tab);
        }
      });

      container.dataset.active = index;

      if (onSelectFn && typeof window[onSelectFn] === "function") {
        window[onSelectFn](index, tabs[index]);
      }
    }

    function setActive(tab) {
      tab.classList.add("pp-tab-active");

      if (activeBgStyle === "block") {
        tab.classList.add("pp-tab-block");
      } else {
        tab.classList.add("pp-tab-underline");
      }
    }
  });
}
