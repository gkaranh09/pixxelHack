const avatars = document.querySelectorAll(".avatar");
const nameItems = document.querySelectorAll(".name");

function showAvatar(index) {
  avatars.forEach((img, i) => {
    img.classList.toggle("active", i === index);
  });
  nameItems.forEach((item, i) => {
    item.classList.toggle("selected", i === index);
  });
}


window.addEventListener("DOMContentLoaded", () => {
  showAvatar(0);
});

const scrollContainer = document.querySelector(".scroll-container");


const pauseScroll = () => {
  const scrollContent = document.querySelector(".scroll-content");
  scrollContent.style.animationPlayState = "paused";
};

const resumeScroll = () => {
  const scrollContent = document.querySelector(".scroll-content");
  scrollContent.style.animationPlayState = "running";
};

scrollContainer.addEventListener("mouseenter", pauseScroll);
scrollContainer.addEventListener("mouseleave", resumeScroll);

scrollContainer.addEventListener("touchstart", pauseScroll);
scrollContainer.addEventListener("touchend", resumeScroll);
