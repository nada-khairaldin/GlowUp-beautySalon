if (typeof AOS !== "undefined") {
  AOS.init({
    once: true,
    offset: 120,
    delay: 0,
  });
}

window.addEventListener("load", () => {
  if (typeof AOS !== "undefined") {
    AOS.refresh();
  }
});

const hamburgerIcon = document.getElementById("hamburger-icon");
const sideBar = document.getElementById("sidebar");
const closeBtn = document.getElementById("close-btn");

if (hamburgerIcon && sideBar) {
  hamburgerIcon.addEventListener("click", () => {
    sideBar.style.right = "0";
  });
}

if (closeBtn && sideBar) {
  closeBtn.addEventListener("click", () => {
    sideBar.style.right = "-100%";
  });
}

// Close sidebar smoothly when clicking outside or clicking a nav link
document.addEventListener("click", (e) => {
  if (!sideBar) return;
  const isOpen = sideBar.style.right === "0px" || sideBar.style.right === "0";
  if (isOpen && !sideBar.contains(e.target) && (!hamburgerIcon || !hamburgerIcon.contains(e.target))) {
    sideBar.style.right = "-100%";
  }
});

document.querySelectorAll(".sidebar-links-list a").forEach((link) => {
  link.addEventListener("click", () => {
    if (sideBar) sideBar.style.right = "-100%";
  });
});

// Auto-detect and mark active page in navbar
const currentFile = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-link-list a, .sidebar-links-list a").forEach((link) => {
  const href = link.getAttribute("href")?.split("/").pop();
  if (href === currentFile || (currentFile === "" && href === "index.html")) {
    link.classList.add("current-page");
  }
});

/* ===================================================
   Tactile Button & Navbar Link Press Ripple & Motion Feedback
   =================================================== */
document.addEventListener("pointerdown", (e) => {
  const target = e.target.closest(
    "button, .btn-show, .stylist-btn, .modal-btn, .time-slot-btn, input[type='submit'], input[type='button'], .more-circle, .nav-link-list a, .sidebar-links-list a"
  );
  if (
    !target ||
    target.classList.contains("close-btn") ||
    target.classList.contains("swiper-button-prev") ||
    target.classList.contains("swiper-button-next")
  ) {
    return;
  }

  const rect = target.getBoundingClientRect();
  const ripple = document.createElement("span");
  ripple.className = "btn-press-ripple";

  const size = Math.max(rect.width, rect.height) * 2.2;
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;

  ripple.style.width = `${size}px`;
  ripple.style.height = `${size}px`;
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;

  target.classList.add("has-press-ripple");
  target.appendChild(ripple);

  const cleanup = () => {
    ripple.remove();
  };

  ripple.addEventListener("animationend", cleanup);
  setTimeout(cleanup, 600);
});


