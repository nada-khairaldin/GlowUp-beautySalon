const categoryFilter = document.getElementById("category-filter");
const servicesCards = document.querySelectorAll(".service-container");
const bookBtns = document.querySelectorAll(".book-now-btn");
const galleryBtns = document.querySelectorAll(".view-gallery-btn");

categoryFilter.addEventListener("change", function () {
  const selectedCategory = this.value;
  servicesCards.forEach((card) => {
    if (
      selectedCategory === "all" ||
      selectedCategory === card.dataset.category
    ) {
      card.classList.remove("hidden");
      AOS.refresh();
    } else {
      card.classList.add("hidden");
    }
  });
});

bookBtns.forEach((btn) => {
  getServiceCategory(btn, "../booking.html");
});

galleryBtns.forEach((btn) => {
  getServiceCategory(btn, "../gallery.html");
});

function getServiceCategory(btn, page) {
  btn.addEventListener("click", () => {
    const container = btn.closest(".service-container");
    const category = container.dataset.category;
    localStorage.setItem("service category", category);
    window.location.href = page;
  });
}
