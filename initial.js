document.addEventListener("DOMContentLoaded", () => {
  const closeBtn = document.querySelector(".close-btn");
  const landingContainer = document.querySelector(".landing-container");

  closeBtn.addEventListener("click", () => {
    landingContainer.classList.add("fade-out");

    setTimeout(() => {
      window.location.href = "index.html";
    }, 800); // Match CSS transition time
  });
});
