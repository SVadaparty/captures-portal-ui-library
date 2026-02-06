function initHrefLinks() {
  document.querySelectorAll("[data-pp-href-link]").forEach(container => {
    if (container._initialized) return;
    container._initialized = true;

    const url = container.dataset.href || "#";
    const text = container.dataset.text || "Click here";
    const imgSrc = container.dataset.imgSrc;
    const imgAlt = container.dataset.alt || text;
    const target = container.dataset.target || "_self";
    const color = container.dataset.color || "#2563eb";
    const underline = container.dataset.underline !== "false";

    // Clear container
    container.innerHTML = "";

    // Create link
    const link = document.createElement("a");
    link.href = url;
    link.target = target;

    // If data-img-src is provided, render an image inside the link
    if (imgSrc) {
      const img = document.createElement("img");
      img.src = imgSrc;
      img.alt = imgAlt;
      if (container.dataset.imgWidth) {
        img.style.width = container.dataset.imgWidth;
      }
      if (container.dataset.imgHeight) {
        img.style.height = container.dataset.imgHeight;
      }
      // img.style.maxWidth = container.dataset.imgWidth || '150px';
      img.style.display = 'block';
      img.style.borderRadius = '6px';
      img.style.border = '1px solid rgba(0,0,0,0.06)';
      link.appendChild(img);
    } else {
      link.textContent = text;

      // Styling for text link
      link.style.color = color;
      link.style.fontWeight = "600";
      link.style.cursor = "pointer";
      link.style.textDecoration = underline ? "underline" : "none";
    }

    // Optional click tracking
    link.addEventListener("click", () => {
      console.log("Redirecting to:", url);
    });

    container.appendChild(link);
  });
}
