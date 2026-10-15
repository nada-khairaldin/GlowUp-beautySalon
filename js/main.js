if (typeof AOS !== "undefined") {
  AOS.init({
    once: true,
    offset: 50,
  });
}

window.addEventListener("load", () => {
  if (typeof AOS !== "undefined") {
    AOS.refresh();
  }
});

const hamburgerIcon = document.getElementById("hamburger-icon");
const sideBar = document.getElementById("sidebar");
const closeBtn = document.getElementById("close-btn");

if (hamburgerIcon && sideBar) {
  hamburgerIcon.addEventListener("click", () => {
    sideBar.style.right = "0";
  });
}

if (closeBtn && sideBar) {
  closeBtn.addEventListener("click", () => {
    sideBar.style.right = "-100%";
  });
}
