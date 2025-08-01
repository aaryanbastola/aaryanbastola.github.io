// 🌙 Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  themeToggle.textContent = newTheme === 'dark' ? '🌙' : '☀️';
});

// ⌨️ Typewriter Effect
const typewriter = document.getElementById('typewriter');
const phrases = [
  "I'm a Web Developer, Programmer, and Cybersecurity Enthusiast.",
  "I build responsive websites and secure systems.",
  "Let's create something amazing together!"
];
let phraseIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < phrases[phraseIndex].length) {
    typewriter.textContent += phrases[phraseIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, 50);
  } else {
    setTimeout(erase, 2000);
  }
}

function erase() {
  if (charIndex > 0) {
    typewriter.textContent = phrases[phraseIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 30);
  } else {
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(type, 500);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  type();
});

// 🎯 Scroll-triggered fade-in animation
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

fadeElements.forEach(el => {
  el.style.animationPlayState = 'paused';
  observer.observe(el);
});
