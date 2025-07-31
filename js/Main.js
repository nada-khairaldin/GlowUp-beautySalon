AOS.init();
const hamburgerIcon = document.getElementById("hamburger-icon");
const sideBar = document.getElementById("sidebar");
const closeBtn = document.getElementById("close-btn");

hamburgerIcon.addEventListener("click", () => {
  sideBar.style.right = "0";
});

closeBtn.addEventListener("click", () => {
  sideBar.style.right = "-100%";
});
