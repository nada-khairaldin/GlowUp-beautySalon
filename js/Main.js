AOS.init();
document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".gallery-swiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      480: {
        slidesPerView: 1,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
});

const hamburgerIcon = document.getElementById("hamburger-icon");
const sideBar = document.getElementById("sidebar");
const closeBtn = document.getElementById("close-btn");

hamburgerIcon.addEventListener("click", () => {
  sideBar.style.right = "0";
});

closeBtn.addEventListener("click", () => {
  sideBar.style.right = "-100%";
});

const contactForm = document.getElementById("contact-form");
const confirmModal = document.getElementById("confirm-modal");
const confirmYes = document.getElementById("confirm-yes");
const confirmNo = document.getElementById("confirm-no");
const errorMsg = document.getElementById("error-msg");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (message === "How can we help" || !message) {
    errorMsg.textContent = "Please enter a message.";
    return;
  }
  if (!validateEmail(email)) {
    errorMsg.textContent = "Please enter a valid email.";
    return;
  }
  errorMsg.textContent = "";
  confirmModal.style.display = "block";
});

function validateEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

confirmYes.addEventListener("click", () => {
  confirmModal.style.display = "none";
  document.location.href = "thankyou.html";
  email.textContent = "";
  message.textContent = "";
});

confirmNo.addEventListener("click", () => {
  confirmModal.style.display = "none";
  email.textContent = "";
  message.textContent = "";
});
