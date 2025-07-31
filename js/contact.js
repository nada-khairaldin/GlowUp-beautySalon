const contactForm = document.getElementById("contact-form");
const confirmModal = document.getElementById("confirm-modal");
const confirmYes = document.getElementById("confirm-yes");
const confirmNo = document.getElementById("confirm-no");
const errorMsg = document.getElementById("error-msg");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name) {
    errorMsg.textContent = "Please enter your name";
    return;
  }
  if (!validateEmail(email)) {
    errorMsg.textContent = "Please enter a valid email.";
    return;
  }
  if (!message) {
    errorMsg.textContent = "Please enter a message.";
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
