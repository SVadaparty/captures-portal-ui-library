function initCarousel() {
  document.querySelectorAll("[data-pp-carousel]").forEach(carousel => {

    // ===== GUARD =====
    if (carousel._initialized) return;
    carousel._initialized = true;

    carousel.style.minHeight = "300px";

    // ===== READ ATTRIBUTES =====
    const visible = parseInt(carousel.dataset.visible || "3");
    const gap = parseInt(carousel.dataset.gap || "16");
    const autoplay = carousel.dataset.autoplay === "true";
    const autoplayInterval = parseInt(
      carousel.dataset.autoplayInterval || "1000"
    );

    /* ===== STRUCTURE ===== */
    const track = document.createElement("div");
    track.className = "pp-carousel-track";

    const items = Array.from(carousel.children);

    items.forEach(item => {
      const slide = document.createElement("div");
      slide.className = "pp-carousel-slide";
      slide.appendChild(item);
      track.appendChild(slide);
    });

    carousel.innerHTML = "";
    carousel.appendChild(track);

    /* ===== NAVIGATION ===== */
    const prevBtn = document.createElement("button");
    prevBtn.className = "pp-carousel-prev";
    prevBtn.innerHTML = "‹";

    const nextBtn = document.createElement("button");
    nextBtn.className = "pp-carousel-next";
    nextBtn.innerHTML = "›";

    carousel.appendChild(prevBtn);
    carousel.appendChild(nextBtn);

    /* ===== STYLES ===== */
    carousel.style.position = "relative";
    carousel.style.overflow = "hidden";

    track.style.display = "flex";
    track.style.gap = `${gap}px`;
    track.style.transition = "transform 0.4s ease";

    function updateLayout() {
      const carouselWidth = carousel.clientWidth;
      const slideWidth =
        (carouselWidth - gap * (visible - 1)) / visible;

      track.querySelectorAll(".pp-carousel-slide").forEach(slide => {
        slide.style.flex = `0 0 ${slideWidth}px`;
      });
    }

    updateLayout();
    window.addEventListener("resize", updateLayout);

    /* ===== LOGIC ===== */
    let index = 0;
    const maxIndex = Math.max(0, items.length - visible);

    function update() {
      const slide = track.querySelector(".pp-carousel-slide");
      if (!slide) return;

      const slideWidth = slide.offsetWidth + gap;
      track.style.transform =
        `translateX(-${index * slideWidth}px)`;
    }

    prevBtn.addEventListener("click", () => {
      index = Math.max(0, index - 1);
      update();
    });

    nextBtn.addEventListener("click", () => {
      index = Math.min(maxIndex, index + 1);
      update();
    });

    /* ===== AUTOPLAY ===== */
    let autoplayTimer = null;

    function startAutoplay() {
      if (!autoplay) return;

      autoplayTimer = setInterval(() => {
        if (index >= maxIndex) {
          index = 0; // loop back
        } else {
          index++;
        }
        update();
      }, autoplayInterval);
    }

    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    // Pause on hover
    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);

    // Start autoplay
    startAutoplay();
  });
}

/* ===== STYLES (ONCE) ===== */
if (!document.getElementById("pp-carousel-style")) {
  const style = document.createElement("style");
  style.id = "pp-carousel-style";
  style.textContent = `
    .pp-carousel-prev,
    .pp-carousel-next {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: none;
      background: rgba(0,0,0,0.6);
      color: #fff;
      font-size: 20px;
      cursor: pointer;
      z-index: 10;
    }
    .pp-carousel-prev { left: 8px; }
    .pp-carousel-next { right: 8px; }
  `;
  document.head.appendChild(style);
}

/* ===== EXPOSE GLOBAL ===== */
window.initCarousel = initCarousel;

/* ===== INIT AFTER DOM LOAD ===== */
document.addEventListener("DOMContentLoaded", () => {
  initCarousel();
});
