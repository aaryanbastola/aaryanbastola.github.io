function setDataTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
setDataTheme(savedTheme);
if (themeToggle) themeToggle.textContent = savedTheme === 'dark' ? '🌙' : '☀️';

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const newTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setDataTheme(newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '🌙' : '☀️';
  });
}

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mainNav = document.getElementById('main-nav');
if (mobileMenuBtn && mainNav) {
  mobileMenuBtn.addEventListener('click', () => mainNav.classList.toggle('active'));
}

const typewriter = document.getElementById('typewriter');
const phrases = ['Web Developer 💻', 'Cybersecurity Enthusiast 🛡️', 'Always Learning 🚀'];
let phraseIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];
  if (isDeleting) charIndex = Math.max(0, charIndex - 1);
  else charIndex = Math.min(currentPhrase.length, charIndex + 1);
  
  if (typewriter) typewriter.textContent = currentPhrase.substring(0, charIndex);

  if (!isDeleting && charIndex === currentPhrase.length) {
    setTimeout(() => { isDeleting = true; typeEffect(); }, 1500); return;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(typeEffect, 500); return;
  }
  setTimeout(typeEffect, isDeleting ? 50 : 100);
}

const faders = document.querySelectorAll('.fade-in');
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
});
faders.forEach(fader => appearOnScroll.observe(fader));

const skillBars = document.querySelectorAll('.bar-fill');
const skillObserver = new IntersectionObserver((entries, observer) => {
  if (entries[0].isIntersecting) {
    skillBars.forEach(bar => bar.style.width = bar.getAttribute('data-width'));
    observer.disconnect();
  }
});
const skillsSection = document.getElementById('skills');
if (skillsSection) skillObserver.observe(skillsSection);

// Project Modal Logic (This bridges the link to your Hand Gesture app!)
const projectModal = document.getElementById('project-modal');
document.querySelectorAll('.project-card').forEach(card => {
  card.querySelector('.project-modal-trigger').addEventListener('click', () => {
    document.getElementById('modal-project-title').textContent = card.dataset.title;
    document.getElementById('modal-project-tech').textContent = card.dataset.tech;
    document.getElementById('modal-project-desc').textContent = card.dataset.desc;
    document.getElementById('modal-project-link').href = card.dataset.url;
    projectModal.showModal();
  });
});

document.getElementById('modal-close-btn').addEventListener('click', () => projectModal.close());

const backBtn = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) backBtn.classList.add('visible');
  else backBtn.classList.remove('visible');
});
backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

document.addEventListener('DOMContentLoaded', typeEffect);
