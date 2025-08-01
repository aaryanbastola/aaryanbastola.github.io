// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
  themeToggle.textContent = savedTheme === "dark" ? "🌙" : "☀️";
} else {
  root.setAttribute("data-theme", "dark");
  themeToggle.textContent = "🌙";
}

themeToggle.addEventListener("click", () => {
  const currentTheme = root.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  themeToggle.textContent = newTheme === "dark" ? "🌙" : "☀️";
});

// Typewriter Effect
const typewriter = document.getElementById("typewriter");
const phrases = [
  "Web Developer 💻",
  "UI/UX Enthusiast 🎨",
  "React Explorer ⚛️",
  "Always Learning 🚀"
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];
  let displayedText;

  if (isDeleting) {
    charIndex--;
    displayedText = currentPhrase.substring(0, charIndex);
  } else {
    charIndex++;
    displayedText = currentPhrase.substring(0, charIndex);
  }

  typewriter.textContent = displayedText;

  if (!isDeleting && charIndex === currentPhrase.length) {
    // Pause before deleting
    setTimeout(() => {
      isDeleting = true;
      typeEffect();
    }, 1500);
    return;
  } else if (isDeleting && charIndex === 0) {
    // Move to next phrase
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(typeEffect, 500);
    return;
  }

  // Speed up deleting
  const delay = isDeleting ? typeSpeed / 2 : typeSpeed;
  setTimeout(typeEffect, delay);
}

document.addEventListener("DOMContentLoaded", () => {
  typeEffect();
});

// Fade-in on scroll
const faders = document.querySelectorAll(".fade-in");

const appearOptions = {
  threshold: 0,
  rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add("visible");
      appearOnScroll.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});
