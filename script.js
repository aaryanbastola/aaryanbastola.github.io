// 🌗 Theme Toggle with localStorage
const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
  themeToggle.textContent = savedTheme === "dark" ? "🌙" : "☀️";
}
themeToggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  themeToggle.textContent = next === "dark" ? "🌙" : "☀️";
});

// ⌨️ Typewriter Effect
const typewriter = document.getElementById("typewriter");
const phrases = [
  "Web Developer 💻",
  "UI/UX Enthusiast 🎨",
  "React Explorer ⚛️",
  "Always Learning 🚀"
];
let i = 0, j = 0, typing = true;
function type() {
  if (typing) {
    if (j < phrases[i].length) {
      typewriter.textContent += phrases[i][j++];
      setTimeout(type, 100);
    } else {
      typing = false;
      setTimeout(type, 1500);
    }
  } else {
    if (j > 0) {
      typewriter.textContent = phrases[i].substring(0, --j);
      setTimeout(type, 50);
    } else {
      typing = true;
      i = (i + 1) % phrases.length;
      setTimeout(type, 500);
    }
  }
}
type();

// 🎬 Scroll-triggered fade-in
const faders = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
faders.forEach(el => observer.observe(el));

// 🧠 Modal Logic
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-description");
const modalLink = document.getElementById("modal-link");
const closeBtn = document.querySelector(".close-btn");

// Open modal
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", () => {
    modalTitle.textContent = card.dataset.title;
    modalDesc.textContent = card.dataset.description;
    modalLink.href = card.dataset.link;
    modal.classList.remove("hidden");
    modal.focus();
  });

  // Keyboard accessibility
  card.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      card.click();
    }
  });
});

// Close modal
closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Close modal with Escape key
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    modal.classList.add("hidden");
  }
});
