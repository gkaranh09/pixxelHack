const wordBoxWrappers = document.querySelectorAll(".word-box-wrapper");

function checkAllDivs() {
  wordBoxWrappers.forEach((wrapper, index) => {
    const rect = wrapper.getBoundingClientRect();
    const wordBox = wrapper.querySelector(".word-box");

    const viewportHeight = window.innerHeight;

    const baseDisappearPoint = viewportHeight * 0.5;

    const scrollOffset = viewportHeight * 0.1;

    const startDisappearing = (index + 1) * scrollOffset;

    const fullyDisappeared = startDisappearing - 100;

    const divCenter = rect.top + rect.height / 2;

    const scrollProgress = startDisappearing - divCenter;

    const progressClamped = Math.max(0, Math.min(scrollProgress, 100));

    const slidePercentage = progressClamped / 100;

    const translateYValue = slidePercentage * 100;

    wordBox.style.transform = `translateY(${translateYValue}%)`;
  });
}

window.addEventListener("scroll", checkAllDivs);
