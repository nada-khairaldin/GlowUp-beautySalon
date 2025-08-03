const contactForm = document.getElementById("contact-form");
const confirmModal = document.getElementById("confirm-modal");
const confirmYes = document.getElementById("confirm-yes");
const confirmNo = document.getElementById("confirm-no");
const errorMsg = document.getElementById("error-msg");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputs = contactForm.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.classList.remove("error-input");

    const existingErrorDiv = document.getElementById("error-" + input.id);
    if (existingErrorDiv) {
      existingErrorDiv.remove();
    }
  });

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  let isValid = true;

  function showError(id, message) {
    const input = document.getElementById(id);
    if (input) input.classList.add("error-input");

    let errorDiv = document.getElementById("error-" + id);
    if (!errorDiv) {
      errorDiv = document.createElement("div");
      errorDiv.id = "error-" + id;
      errorDiv.classList.add("error-message");
      input.after(errorDiv);
    }
    errorDiv.textContent = "* " + message;
    isValid = false;
  }

  if (!name) {
    showError("name", "Please enter your name");
  }

  if (!email) {
    showError("email", "Please enter an email.");
  } else if (!validateEmail(email)) {
    showError("email", "Please enter a valid email.");
  }

  if (!message) {
    showError("message", "Please enter a message.");
  }

  if (!isValid) return;

  document.getElementById("contact-btn").addEventListener("click", () => {
    confirmModal.style.display = "block";
  });
});

function validateEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

confirmYes.addEventListener("click", () => {
  confirmModal.style.display = "none";
  document.location.href = "../thankyou.html";
  contactForm.reset();
});

confirmNo.addEventListener("click", () => {
  confirmModal.style.display = "none";
});
