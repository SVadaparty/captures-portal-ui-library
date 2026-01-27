function initModal() {
  document.querySelectorAll("[data-pp-modal]").forEach(wrapper => {
    const modalId = wrapper.dataset.id || `pp-modal-${Math.random().toString(36).slice(2)}`;
    const triggerText = wrapper.dataset.triggerText || "Open Modal";

    // --- CREATE TRIGGER FIRST ---
    let trigger = document.createElement("button");
    trigger.type = "button";
    trigger.textContent = triggerText;
    trigger.style.cursor = "pointer";
    trigger.style.backgroundColor = "#FFA500";
    trigger.style.padding = "10px 20px";
    trigger.style.fontSize = "16px";
    trigger.style.color = "#fff";
    trigger.style.border = "none";
    trigger.style.borderRadius = "6px";
    trigger.style.width = "160px";
    trigger.style.textAlign = "center";

    trigger.setAttribute("data-pp-modal-trigger", "");
    trigger.dataset.target = modalId;

    // 🔥 IMPORTANT: insert trigger BEFORE wrapper
    wrapper.parentNode.insertBefore(trigger, wrapper);

    // --- CREATE MODAL ---
    if (!document.getElementById(modalId)) {
      const modal = document.createElement("div");
      modal.id = modalId;
      modal.style.position = "fixed";
      modal.style.top = "0";
      modal.style.left = "0";
      modal.style.width = "100%";
      modal.style.height = "100%";
      modal.style.backgroundColor = "rgba(0,0,0,0.5)";
      modal.style.display = "none";
      modal.style.justifyContent = "center";
      modal.style.alignItems = "center";
      modal.style.zIndex = "1000";

      const modalContent = document.createElement("div");
      modalContent.style.background = "#fff";
      modalContent.style.padding = "20px";
      modalContent.style.borderRadius = "8px";
      modalContent.style.maxWidth = "500px";
      modalContent.style.width = "90%";
      modalContent.style.position = "relative";

      // Extract body & footer
      const body = wrapper.querySelector("[data-pp-modal-body]");
      const footer = wrapper.querySelector("[data-pp-modal-footer]");

      // Clear wrapper AFTER extracting content
      wrapper.innerHTML = "";

      const bodyContainer = document.createElement("div");
      if (body) bodyContainer.appendChild(body);

      const footerContainer = document.createElement("div");
      footerContainer.style.marginTop = "20px";
      footerContainer.style.borderTop = "1px solid #eee";
      footerContainer.style.paddingTop = "10px";
      if (footer) footerContainer.appendChild(footer);

      // Close button
      const closeBtn = document.createElement("button");
      closeBtn.innerHTML = "✕";
      closeBtn.setAttribute("data-pp-modal-close", "");
      closeBtn.style.position = "absolute";
      closeBtn.style.top = "10px";
      closeBtn.style.right = "10px";
      closeBtn.style.background = "transparent";
      closeBtn.style.border = "none";
      closeBtn.style.fontSize = "18px";
      closeBtn.style.cursor = "pointer";

      modalContent.appendChild(closeBtn);
      modalContent.appendChild(bodyContainer);
      modalContent.appendChild(footerContainer);
      modal.appendChild(modalContent);
      document.body.appendChild(modal);
    }
  });

  // --- EVENTS ---
  document.querySelectorAll("[data-pp-modal-trigger]").forEach(trigger => {
    const modal = document.getElementById(trigger.dataset.target);
    if (!modal) return;

    trigger.addEventListener("click", () => {
      modal.style.display = "flex";
    });

    modal.querySelector("[data-pp-modal-close]").addEventListener("click", () => {
      modal.style.display = "none";
    });

    modal.addEventListener("click", e => {
      if (e.target === modal) modal.style.display = "none";
    });
  });
}
