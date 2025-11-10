document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll(".slider__valmax");

  sliders.forEach((slider) => {
    const sliderWrapper = slider.querySelector(".slider__valmax-wrapper-slide");
    const slides = Array.from(slider.querySelectorAll(".slider__valmax-slide"));
    const prevButton = slider.querySelector(".prev");
    const nextButton = slider.querySelector(".next");

    let autoplay = slider.dataset.autoplay === "true";
    let speed = parseInt(slider.dataset.speed, 10) * 1000 || 5000;
    let isAnimating = false;
    let autoSlideInterval;

    function updatePositions() {
      sliderWrapper.style.transition = "none";
      sliderWrapper.style.transform = "translateX(-100%)";
      sliderWrapper.prepend(slides[slides.length - 1]);
      slides.unshift(slides.pop());
    }

    function nextSlide() {
      if (isAnimating) return;
      isAnimating = true;

      sliderWrapper.style.transition = "transform 0.3s ease-in-out";
      sliderWrapper.style.transform = "translateX(-200%)";

      setTimeout(() => {
        sliderWrapper.style.transition = "none";
        sliderWrapper.style.transform = "translateX(-100%)";

        sliderWrapper.appendChild(slides[0]);
        slides.push(slides.shift());

        isAnimating = false;
      }, 500);
    }

    function prevSlide() {
      if (isAnimating) return;
      isAnimating = true;

      sliderWrapper.style.transition = "transform 0.3s ease-in-out";
      sliderWrapper.style.transform = "translateX(0%)";

      setTimeout(() => {
        sliderWrapper.style.transition = "none";
        sliderWrapper.style.transform = "translateX(-100%)";

        sliderWrapper.prepend(slides[slides.length - 1]);
        slides.unshift(slides.pop());

        isAnimating = false;
      }, 500);
    }

    function startAutoplay() {
      if (autoplay) {
        autoSlideInterval = setInterval(nextSlide, speed);
      }
    }

    function stopAutoplay() {
      clearInterval(autoSlideInterval);
    }

    slider.addEventListener("mouseenter", stopAutoplay);
    slider.addEventListener("mouseleave", startAutoplay);

    nextButton.addEventListener("click", nextSlide);
    prevButton.addEventListener("click", prevSlide);

    updatePositions();
    if (autoplay) startAutoplay();
  });
});
