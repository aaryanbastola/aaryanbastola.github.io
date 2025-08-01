// 🌗 Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
  themeToggle.textContent = savedTheme === "dark" ? "🌙" : "☀️";
}

// Toggle theme
themeToggle.addEventListener("click", () => {
  const currentTheme = root.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  themeToggle.textContent = newTheme === "dark" ? "🌙" : "☀️";
});

// ⌨️ Typewriter Effect
const typewriter = document.getElementById("typewriter");
const phrases = [
  "Web Developer 💻",
  "UI/UX Enthusiast 🎨",
  "React & JS Explorer ⚛️",
  "Always Learning 🚀"
];
let phraseIndex = 0;
let charIndex = 0;
let typing = true;

function type() {
  if (typing) {
    if (charIndex < phrases[phraseIndex].length) {
      typewriter.textContent += phrases[phraseIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, 100);
    } else {
      typing = false;
      setTimeout(type, 1500);
    }
  } else {
    if (charIndex > 0) {
      typewriter.textContent = phrases[phraseIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(type, 50);
    } else {
      typing = true;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, 500);
    }
  }
}
type();

// 🎬 Scroll-triggered fade-in
const faders = document.querySelectorAll(".fade-in");

const appearOptions = {
  threshold: 0.3,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});
