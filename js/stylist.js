const modal = document.getElementById("modal");

function closeModal() {
  modal.style.display = "none";
  modalContent.classList.remove("active");
}

function openModal(member) {
  const modalContent = document.getElementById("modal-content");
  modalContent.innerHTML = `
  <button class="close-btn" id="modal-close">&times;</button>
  <div class="modal-inner">
    <div class="left-col">
      <img src="${member.image}" alt="${member.name}" class="team-popup-img" />
      <a href="/booking.html" class="book-stylist stylist-btn" id="book-btn">Book Now</a>
    </div>
    <div class="right-col">
      <h2>${member.name}</h2>
      <h4>${member.specialty}</h4>
      <p>${member.bio}</p>
      <h4>Services:</h4>
      <ul class="stylist-services">
        ${member.services.map((service) => `<li>• ${service}</li>`).join("")}
      </ul>
    </div>
  </div>
  `;
  modal.style.display = "flex";
  modalContent.classList.add("active");

  const closeBtn = document.getElementById("modal-close");
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  const bookBtn = document.getElementById("book-btn");
  bookBtn.addEventListener("click", () => {
    localStorage.setItem("stylist id", member.id);
    window.location.href = "/booking.html";
  });
}

async function loadTeamCards() {
  try {
    const response = await fetch("../data/stylists.json");
    if (!response.ok) throw new Error("Failed to load team data");
    const team = await response.json();

    const container = document.getElementById("cards-container");
    team.forEach((member, index) => {
      const card = document.createElement("div");
      card.classList.add("team-card");

      card.setAttribute("data-aos", "fade-up");
      card.setAttribute("data-aos-duration", "800");
      card.setAttribute("data-aos-delay", `${index * 100}`);
      card.innerHTML = `
        <img src="${member.image}" alt="${member.name}" class="team-card-img"/>
        <div class="card-content">
          <h3>${member.name}</h3>
          <p>${member.specialty}</p>
        </div>
      `;
      card.addEventListener("click", () => openModal(member));
      container.appendChild(card);
      AOS.refresh();
    });
  } catch (error) {
    console.error(error);
  }
}

loadTeamCards();
