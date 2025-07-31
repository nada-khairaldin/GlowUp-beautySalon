let stylistData = [];

const stylistSelect = document.getElementById("stylist");
const hiddenInput = document.getElementById("selected-time");
const confirmModal = document.getElementById("confirm-modal");
const confirmYes = document.getElementById("confirm-yes");
const confirmNo = document.getElementById("confirm-no");
const errorMsg = document.getElementById("error-msg");
const bookingForm = document.getElementById("booking-form");
const selectedService = document.getElementById("service");
const timeSlotsContainer = document.getElementById("time-slots");

async function loadStylists() {
  try {
    const response = await fetch("/data/stylists.json");
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

    const savedService = localStorage.getItem("service category");
    if (savedService) {
      selectedService.value = savedService;
      selectedService.classList.add("local-saved-active");
    }
  } catch (error) {
    console.log("Error in loading Stylists data : ", error);
  }
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

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();

  const stylist = document.getElementById("stylist").value;
  const date = document.getElementById("date").value;
  const service = document.getElementById("service").value;
  const time = hiddenInput.value;

  if (!name || !phone || !stylist || !date || !time) {
    errorMsg.textContent = "Please fill out all required fields.";
    return;
  }

  document.getElementById("confirm-name").textContent = name;
  document.getElementById("confirm-phone").textContent = phone;
  document.getElementById("confirm-service").textContent = service;
  document.getElementById("confirm-stylist").textContent = stylist;
  document.getElementById("confirm-date").textContent = date;
  document.getElementById("confirm-time").textContent = time;

  const bookingData = {
    name,
    phone,
    service,
    date,
    stylist,
    time,
  };

  let oldBookings = JSON.parse(localStorage.getItem("bookings")) || [];

  oldBookings.push(bookingData);

  localStorage.setItem("bookings", JSON.stringify(oldBookings));

  errorMsg.textContent = "";
  confirmModal.style.display = "block";
});

confirmYes.addEventListener("click", () => {
  document.location.href = "thankyou.html";
  resetForm();
});

confirmNo.addEventListener("click", resetForm);

function resetForm() {
  errorMsg.textContent = "";
  confirmModal.style.display = "none";
  bookingForm.reset();
  timeSlotsContainer.innerHTML =
    "<p class='time-placeholder'>Please select a stylist to view available time slots</p>";
  localStorage.removeItem("stylist id");
  stylistSelect.classList.remove("local-saved-active");
  selectedService.classList.remove("local-saved-active");
}

loadStylists();
stylistSelect.addEventListener("change", handleSelectingChange);
