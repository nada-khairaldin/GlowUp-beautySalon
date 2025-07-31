const hamburgerIcon = document.getElementById("hamburger-icon");
const sideBar = document.getElementById("sidebar");
const closeBtn = document.getElementById("close-btn");
const savedCategory = localStorage.getItem("service category");
const images = document.querySelectorAll(".gallery-img");

hamburgerIcon.addEventListener("click", () => {
  sideBar.style.right = "0";
});

closeBtn.addEventListener("click", () => {
  sideBar.style.right = "-100%";
});

const categoryFilter = document.getElementById("category-filter");
const ImagesCards = document.querySelectorAll(".img-wrapper");

categoryFilter.addEventListener("change", function () {
  const selectedCategory = this.value;
  ImagesCards.forEach((img) => {
    if (
      selectedCategory === "all" ||
      selectedCategory === img.dataset.category
    ) {
      img.style.display = "block";
    } else {
      img.style.display = "none";
    }
  });
  AOS.refresh();
});
if (savedCategory) {
  categoryFilter.value = savedCategory;
  categoryFilter.dispatchEvent(new Event("change"));
}

images.forEach((img) => {
  img.addEventListener("click", enlargeImg);
});

function enlargeImg() {
  const overlay = document.createElement("div");
  overlay.classList.add("lightbox-overlay");

  const largeImg = document.createElement("img");
  largeImg.src = this.src;
  largeImg.alt = this.alt;
  largeImg.classList.add("lightbox-img");

  const closeBtn = document.createElement("span");
  closeBtn.innerHTML = "&times;";
  closeBtn.classList.add("lightbox-close");

  overlay.appendChild(largeImg);
  overlay.appendChild(closeBtn);
  document.body.appendChild(overlay);

  closeBtn.addEventListener("click", () => overlay.remove());
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.remove();
  });
}
