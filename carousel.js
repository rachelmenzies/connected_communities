(() => {
  const carousels = document.querySelectorAll("[data-carousel]");

  carousels.forEach((carousel) => {
    const track = carousel.querySelector("[data-carousel-track]");
    const prevButton = carousel.querySelector("[data-carousel-prev]");
    const nextButton = carousel.querySelector("[data-carousel-next]");
    const dotsContainer = carousel.parentElement?.querySelector("[data-carousel-dots]") || null;
    const statusText = carousel.parentElement?.querySelector("[data-carousel-status]") || null;

    if (!track || !prevButton || !nextButton) {
      return;
    }

    const slides = Array.from(track.children);
    if (slides.length === 0) {
      return;
    }

    let currentIndex = 0;
    const dots = [];

    if (dotsContainer) {
      slides.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "carousel-dot";
        dot.setAttribute("aria-label", `Show image ${index + 1}`);
        dot.addEventListener("click", () => {
          currentIndex = index;
          update();
        });
        dotsContainer.appendChild(dot);
        dots.push(dot);
      });
    }

    const update = () => {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      if (dots.length > 0) {
        dots.forEach((dot, index) => {
          dot.classList.toggle("active", index === currentIndex);
        });
      }
      if (statusText) {
        statusText.textContent = `Image ${currentIndex + 1} of ${slides.length}`;
      }
    };

    prevButton.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      update();
    });

    nextButton.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slides.length;
      update();
    });

    update();
  });
})();
