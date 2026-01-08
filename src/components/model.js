function initModal() {
  // Render shorthand holders: <div data-pp-modal ...></div>
  document.querySelectorAll("[data-pp-modal]").forEach(wrapper => {
    const modalId = wrapper.dataset.id || `pp-modal-${Math.random().toString(36).slice(2)}`;
    const triggerText = wrapper.dataset.triggerText || "Open Modal";
    const title = wrapper.dataset.title || "";
    const contentText = wrapper.dataset.content || "";
    const triggerBg = wrapper.dataset.triggerBg || "#FFA500";
    const triggerPadding = wrapper.dataset.triggerPadding || "10px 20px";
    const triggerFontSize = wrapper.dataset.triggerFontsize || "16px";
    const triggerMarginTop = wrapper.dataset.triggerMarginTop || "0px";

    // avoid destroying existing content if user placed a trigger
    let trigger = wrapper.querySelector('[data-pp-modal-trigger]');
    if (!trigger) {
      trigger = document.createElement("button");
      trigger.type = "button";
      trigger.textContent = triggerText;
      trigger.style.cursor = "pointer";
      trigger.style.backgroundColor = triggerBg;
      trigger.style.padding = triggerPadding;
      trigger.style.fontSize = triggerFontSize;
      trigger.style.marginTop = triggerMarginTop;
      trigger.style.color = "#fff";
      trigger.style.border = "none";
      trigger.style.borderRadius = "6px";
      wrapper.appendChild(trigger);
    }
    trigger.setAttribute('data-pp-modal-trigger', '');
    trigger.dataset.target = modalId;

    // create modal element if missing
    if (!document.getElementById(modalId)) {
      const modal = document.createElement("div");
      modal.id = modalId;
      modal.style.display = "none";
      modal.style.position = "fixed";
      modal.style.top = "0";
      modal.style.left = "0";
      modal.style.width = "100%";
      modal.style.height = "100%";
      modal.style.backgroundColor = "rgba(0,0,0,0.5)";
      modal.style.display = "none";
      modal.style.flexDirection = "column";
      modal.style.justifyContent = "center";
      modal.style.alignItems = "center";
      modal.style.zIndex = "1000";

      const modalContent = document.createElement("div");
      modalContent.className = "pp-modal-content";
      modalContent.style.background = "#fff";
      modalContent.style.padding = "20px";
      modalContent.style.borderRadius = "8px";
      modalContent.style.maxWidth = "500px";
      modalContent.style.width = "90%";

      if (title) {
        const h2 = document.createElement("h2");
        h2.textContent = title;
        modalContent.appendChild(h2);
      }

      if (contentText) {
        const p = document.createElement("p");
        p.textContent = contentText;
        modalContent.appendChild(p);
      }

      const closeBtn = document.createElement("button");
      closeBtn.textContent = "Close";
      closeBtn.setAttribute("data-pp-modal-close", "");
      modalContent.appendChild(closeBtn);

      modal.appendChild(modalContent);
      document.body.appendChild(modal);
    }
  });

  // Bind behavior to all modal triggers (including ones created above)
  document.querySelectorAll("[data-pp-modal-trigger]").forEach(trigger => {
    const modalId = trigger.dataset.target;
    const modal = document.getElementById(modalId);
    if (!modal) return;

    const modalContent = modal.querySelector('.pp-modal-content');

    trigger.addEventListener('click', () => {
      modal.style.display = 'flex';
    });

    const closeBtn = modal.querySelector('[data-pp-modal-close]');
    if (closeBtn) closeBtn.addEventListener('click', () => (modal.style.display = 'none'));

    modal.addEventListener('click', e => {
      if (e.target === modal) modal.style.display = 'none';
    });
  });
}
