// Helper to set theme safely and persist
function setDataTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// THEME TOGGLE WITH SYSTEM PREFERENCE DETECTION
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

function getSystemTheme() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Initialize theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  setDataTheme(savedTheme);
  themeToggle.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
} else {
  const sysTheme = getSystemTheme();
  setDataTheme(sysTheme);
  themeToggle.textContent = sysTheme === 'dark' ? '🌙' : '☀️';
}

// Listen for system theme changes (only if no manual user override)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (!localStorage.getItem('theme')) {
    const newTheme = e.matches ? 'dark' : 'light';
    setDataTheme(newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '🌙' : '☀️';
  }
});

// On toggle button click
themeToggle.addEventListener('click', () => {
  const currentTheme = root.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setDataTheme(newTheme);
  themeToggle.textContent = newTheme === 'dark' ? '🌙' : '☀️';
});

// TYPEWRITER EFFECT
const typewriter = document.getElementById('typewriter');
const phrases = [
  'Web Developer 💻',
  'UI/UX Enthusiast 🎨',
  'React Explorer ⚛️',
  'Always Learning 🚀'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeSpeed = 100;

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
    setTimeout(() => {
      isDeleting = true;
      typeEffect();
    }, 1500);
    return;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(typeEffect, 500);
    return;
  }

  const delay = isDeleting ? typeSpeed / 2 : typeSpeed;
  setTimeout(typeEffect, delay);
}

document.addEventListener('DOMContentLoaded', () => {
  typeEffect();
});

// FADE-IN ON SCROLL
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0,
  rootMargin: '0px 0px -100px 0px'
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// ANIMATED SKILL BARS WHEN IN VIEW
const skillBars = document.querySelectorAll('.bar-fill');
const skillSection = document.getElementById('skills');

const animateSkillBars = () => {
  skillBars.forEach(bar => {
    const targetWidth = bar.getAttribute('data-width');
    bar.style.width = targetWidth;
  });
};

const skillObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillBars();
        observer.unobserve(entry.target);
      }
    });
  }, 
  {
    threshold: 0.5
  }
);

if (skillSection) {
  skillObserver.observe(skillSection);
}

// PARALLAX BACKGROUND EFFECT
const shape1 = document.querySelector('.shape1');
const shape2 = document.querySelector('.shape2');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  if (shape1) {
    shape1.style.transform = `translateY(${scrollY * 0.4}px)`;
  }
  if (shape2) {
    shape2.style.transform = `translateY(${scrollY * 0.2}px)`;
  }
});

// EASTER EGG: CLICK 5 TIMES ON LOGO TO REVEAL MODAL
const logo = document.getElementById('logo');
const easterEgg = document.getElementById('easter-egg');
const eggCloseBtn = document.getElementById('egg-close');
let clickCount = 0;
const requiredClicks = 5;
const clickTimeout = 2000; // 2 seconds reset
let clickTimer;

logo.addEventListener('click', () => {
  clickCount++;
  if (clickCount === requiredClicks) {
    easterEgg.showModal();
    clickCount = 0;
    clearTimeout(clickTimer);
  } else {
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => {
      clickCount = 0;
    }, clickTimeout);
  }
});

// Accessibility: Allow Enter/Space key trigger for logo Easter egg
logo.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    logo.click();
  }
});

eggCloseBtn.addEventListener('click', () => {
  easterEgg.close();
});
