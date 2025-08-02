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

  // if (!name) {
  //   errorMsg.textContent = "Please enter your name";
  // }

  // if (!stylist) {
  //   errorMsg.textContent = "Please select a stylist";
  // }

  // if (!phone) {
  //   errorMsg.textContent = "Please select a stylist";
  // }

  const phoneReg = /^[0-9]+$/;
  if (!phoneReg.test(phone)) {
    errorMsg.textContent = "Phone should includes numbers only";
    return;
  }

  // if (!service) {
  //   errorMsg.textContent = "Please select a service";
  // }

  const selectedData = new Date(date);
  const today = new Date();
  selectedData.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  if (selectedData <= today) {
    errorMsg.textContent = "Please select a date after today date";
    return;
  }

  // if (!stylist) {
  //   errorMsg.textContent = "Please select a stylist";
  // }
  if (!name || !phone || !stylist || !date || !time || !service) {
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
  bookBtn.addEventListener("click", () => {
    confirmModal.style.display = "block";
  });
});

confirmYes.addEventListener("click", () => {
  document.location.href = "thankyou.html";
  errorMsg.textContent = "";
  confirmModal.style.display = "none";
  timeSlotsContainer.innerHTML =
    "<p class='time-placeholder'>Please select a stylist to view available time slots</p>";
  bookingForm.reset();
  localStorage.removeItem("stylist id");
  stylistSelect.classList.remove("local-saved-active");
  selectedService.classList.remove("local-saved-active");
});

confirmNo.addEventListener("click", () => {
  errorMsg.textContent = "";
  confirmModal.style.display = "none";
});

loadStylists();
stylistSelect.addEventListener("change", handleSelectingChange);
