AOS.init();
document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".gallery-swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: false,
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

const contactForm = document.getElementById("contact-form");
const confirmModal = document.getElementById("confirm-modal");
const confirmYes = document.getElementById("confirm-yes");
const confirmNo = document.getElementById("confirm-no");
const errorMsg = document.getElementById("error-msg");
const sections = document.querySelectorAll(".section");

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
  contactForm.reset();
});

confirmNo.addEventListener("click", () => {
  contactForm.reset();
  confirmModal.style.display = "none";
});

function activateSectionOnScroll() {
  let scrollPosition = window.scrollY + window.innerHeight / 2;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      sections.forEach((sec) => sec.classList.remove("active-section"));
      section.classList.add("active-section");
    }
  });
}

window.addEventListener("scroll", activateSectionOnScroll);

document.getElementById("plus-icon").addEventListener("click", function () {
  window.location.href = "gallery.html";
});
