let stylistData = [];

const stylistSelect = document.getElementById("stylist");
const hiddenInput = document.getElementById("selected-time");
const bookBtn = document.getElementById("Book-btn");
const confirmModal = document.getElementById("confirm-modal");
const confirmYes = document.getElementById("confirm-yes");
const confirmNo = document.getElementById("confirm-no");
const errorMsg = document.getElementById("error-msg");
const bookingForm = document.getElementById("booking-form");
const selectedService = document.getElementById("service");
const timeSlotsContainer = document.getElementById("time-slots");
let bookingData;
async function loadStylists() {
  try {
    const response = await fetch("../data/stylists.json");
    stylistData = await response.json();
    stylistData.forEach((stylist) => {
      const option = document.createElement("option");
      option.value = stylist.id;
      option.textContent = stylist.name;
      stylistSelect.append(option);
    });

    const savedStylistID = localStorage.getItem("stylist id");
    if (savedStylistID) {
      stylistSelect.value = savedStylistID;
      stylistSelect.classList.add("local-saved-active");
      handleSelectingChange();
    }
  } catch (error) {
    console.log("Error in loading Stylists data : ", error);
  }
}
const savedService = localStorage.getItem("service category");
if (savedService) {
  selectedService.value = savedService;
  selectedService.classList.add("local-saved-active");
}

function handleSelectingChange() {
  const stylistId = document.getElementById("stylist").value;
  timeSlotsContainer.innerHTML = "";

  if (!stylistId) {
    timeSlotsContainer.innerHTML =
      "<p class='time-placeholder'>Please select a stylist to view available time slots</p>";
    return;
  }
  const selectedStylist = stylistData.find(
    (stylist) => stylist.id === stylistId
  );

  if (selectedStylist && selectedStylist.availableTimes.length > 0) {
    selectedStylist.availableTimes.forEach((time) => {
      const button = document.createElement("button");
      button.textContent = time;
      button.type = "button";
      button.classList.add("time-slot-btn");
      button.addEventListener("click", () => selectTime(time, button));
      timeSlotsContainer.appendChild(button);
    });
  } else {
    timeSlotsContainer.innerHTML =
      "<p class='time-placeholder'>No available time slots for this stylist</p>";
  }
}

function selectTime(time, clickedButton) {
  hiddenInput.value = time;
  const allButtons = document.querySelectorAll(".time-slot-btn");
  allButtons.forEach((btn) => btn.classList.remove("selected"));

  clickedButton.classList.add("selected");
}

bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputs = bookingForm.querySelectorAll("input, select");
  inputs.forEach((input) => {
    input.classList.remove("error-input");

    const existingErrorDiv = document.getElementById("error-" + input.id);
    if (existingErrorDiv) {
      existingErrorDiv.remove();
    }
  });
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const stylist = document.getElementById("stylist").value;
  const date = document.getElementById("date").value;
  const service = document.getElementById("service").value;
  const time = hiddenInput.value;

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

  if (!name) showError("name", "This field is required.");
  if (!phone) showError("phone", "This field is required.");
  else if (!/^[0-9]+$/.test(phone))
    showError("phone", "Phone should contain numbers only.");

  if (!stylist) showError("stylist", "Please select a stylist.");
  if (!service) showError("service", "Please select a service.");

  if (!date) showError("date", "Please select a date.");
  else {
    const selectedDate = new Date(date);
    const today = new Date();
    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      showError(
        "date",
        "Please select a date that is today or later. Past dates are not allowed."
      );
    }
  }

  if (!time) {
    const timeBtns = document.querySelectorAll(".time-slot-btn");
    if (timeBtns.length > 0) {
      let errorDiv = document.getElementById("error-time");
      if (!errorDiv) {
        errorDiv = document.createElement("div");
        errorDiv.id = "error-time";
        errorDiv.textContent = "* Please select a time slot.";
        errorDiv.style.marginBottom = "15px";
        errorDiv.classList.add("error-message");
        document.getElementById("time-slots").after(errorDiv);

        isValid = false;
      }
    }
  } else {
    const errorTimeSlot = document.getElementById("error-time");
    if (errorTimeSlot) errorTimeSlot.textContent = "";
  }

  if (!isValid) return;

  document.getElementById("confirm-name").textContent = name;
  console.log(document.getElementById("confirm-name"));
  console.log(document.getElementById("confirm-name").textContent);
  document.getElementById("confirm-phone").textContent = phone;
  document.getElementById("confirm-service").textContent = service;
  document.getElementById("confirm-stylist").textContent = stylist;
  document.getElementById("confirm-date").textContent = date;
  document.getElementById("confirm-time").textContent = time;

  bookingData = { name, phone, service, date, stylist, time };

  document.getElementById("Book-btn").addEventListener("click", () => {
    confirmModal.style.display = "block";
  });
});

confirmYes.addEventListener("click", () => {
  let oldBookings = JSON.parse(localStorage.getItem("bookings")) || [];
  oldBookings.push(bookingData);
  localStorage.setItem("bookings", JSON.stringify(oldBookings));

  document.location.href = "../thankyou.html";
  confirmModal.style.display = "none";
  timeSlotsContainer.innerHTML =
    "<p class='time-placeholder'>Please select a stylist to view available time slots</p>";
  bookingForm.reset();
  localStorage.removeItem("stylist id");
  stylistSelect.classList.remove("local-saved-active");
  selectedService.classList.remove("local-saved-active");
});

confirmNo.addEventListener("click", () => {
  confirmModal.style.display = "none";
});

loadStylists();
stylistSelect.addEventListener("change", handleSelectingChange);
