const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwRE8geyTMuJUJXwi7M1ESgZZT-Uaws43balKgOHNtqKBMk1T3a1DW5-R0l_7h-mWB72A/exec";
const FALLBACK_URL = "./data/stylists.json";

async function loadStylists() {
  try {
    const res = await fetch(APPS_SCRIPT_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Sheet returned no stylists");
    }
    return data;
  } catch (err) {
    console.warn("Sheet failed, using local JSON:", err);
    const res = await fetch(FALLBACK_URL);
    return res.json();
  }
}

const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");

function closeModal() {
  if (modal) modal.style.display = "none";
  if (modalContent) modalContent.classList.remove("active");
}

function openModal(member) {
  if (!modalContent || !modal) return;
  const servicesList = Array.isArray(member.services)
    ? member.services
    : typeof member.services === "string"
    ? member.services.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  modalContent.innerHTML = `
  <button class="close-btn" id="modal-close">&times;</button>
  <div class="modal-inner">
    <div class="left-col">
      <img src="${member.image}" alt="${member.name}" class="team-popup-img" />
      <a href="./booking.html" class="book-stylist stylist-btn" id="book-btn">Book Now</a>
    </div>
    <div class="right-col">
      <h2>${member.name}</h2>
      <h4>${member.specialty}</h4>
      <p>${member.bio}</p>
      <h4>Services:</h4>
      <ul class="stylist-services">
        ${servicesList.map((service) => `<li>• ${service}</li>`).join("")}
      </ul>
    </div>
  </div>
  `;
  modal.style.display = "flex";
  modalContent.classList.add("active");

  const closeBtn = document.getElementById("modal-close");
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  const bookBtn = document.getElementById("book-btn");
  if (bookBtn) {
    bookBtn.addEventListener("click", () => {
      localStorage.setItem("stylist id", member.id);
      window.location.href = "./booking.html";
    });
  }
}

async function loadTeamCards() {
  const container = document.getElementById("cards-container");
  if (!container) return;

  // Show loading indicator before fetching data
  container.innerHTML = `
    <div class="stylist-loader" role="status" aria-live="polite">
      <div class="stylist-spinner"></div>
      <p class="stylist-loading-text">Loading stylists...</p>
    </div>
  `;

  try {
    const team = await loadStylists();

    container.innerHTML = "";

    if (!Array.isArray(team) || team.length === 0) {
      container.innerHTML = `
        <div class="stylist-error">
          <p>No stylists found at the moment.</p>
        </div>
      `;
      return;
    }

    team.forEach((member, index) => {
      const card = document.createElement("div");
      card.classList.add("team-card");

      card.setAttribute("data-aos", "fade");
      card.setAttribute("data-aos-duration", "600");
      card.setAttribute("data-aos-delay", `${index * 60}`);
      card.innerHTML = `
        <img src="${member.image}" alt="${member.name}" class="team-card-img" loading="lazy"/>
        <div class="card-content">
          <h3>${member.name}</h3>
          <p>${member.specialty}</p>
        </div>
      `;
      card.addEventListener("click", () => openModal(member));
      container.appendChild(card);
    });

    if (typeof AOS !== "undefined") {
      AOS.refresh();
    }
  } catch (error) {
    console.error("Error loading team cards:", error);
    container.innerHTML = `
      <div class="stylist-error">
        <p>Failed to load stylists. Please try again.</p>
        <button class="stylist-retry-btn" id="retry-load-btn">Retry</button>
      </div>
    `;
    const retryBtn = document.getElementById("retry-load-btn");
    if (retryBtn) {
      retryBtn.addEventListener("click", loadTeamCards);
    }
  }
}

loadTeamCards();
