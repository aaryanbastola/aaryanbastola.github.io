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

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  setDataTheme(savedTheme);
  if (themeToggle) themeToggle.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
} else {
  const sysTheme = getSystemTheme();
  setDataTheme(sysTheme);
  if (themeToggle) themeToggle.textContent = sysTheme === 'dark' ? '🌙' : '☀️';
}

if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      setDataTheme(newTheme);
      if (themeToggle) themeToggle.textContent = newTheme === 'dark' ? '🌙' : '☀️';
    }
  });
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setDataTheme(newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '🌙' : '☀️';
  });
}

// RESPONSIVE MOBILE NAVIGATION MENU
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mainNav = document.getElementById('main-nav');
const navLinks = document.querySelectorAll('.nav-link, .resume-btn');

if (mobileMenuBtn && mainNav) {
  mobileMenuBtn.addEventListener('click', () => {
    const isExpanded = mainNav.classList.toggle('active');
    mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
    const menuIcon = mobileMenuBtn.querySelector('i');
    if (menuIcon) {
      menuIcon.className = isExpanded ? 'fas fa-times' : 'fas fa-bars';
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      const menuIcon = mobileMenuBtn.querySelector('i');
      if (menuIcon) menuIcon.className = 'fas fa-bars';
    });
  });
}

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
  let displayedText = '';

  if (isDeleting) {
    charIndex = Math.max(0, charIndex - 1);
    displayedText = currentPhrase.substring(0, charIndex);
  } else {
    charIndex = Math.min(currentPhrase.length, charIndex + 1);
    displayedText = currentPhrase.substring(0, charIndex);
  }

  if (typewriter) typewriter.textContent = displayedText;

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

// FADE-IN ANIMATIONS
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0, rootMargin: '0px 0px -100px 0px' };

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

// ANIMATED SKILL BARS
const skillBars = document.querySelectorAll('.bar-fill');
const skillSection = document.getElementById('skills');

const animateSkillBars = () => {
  skillBars.forEach(bar => {
    const targetWidth = bar.getAttribute('data-width');
    if (/^\d+%$/.test(targetWidth)) {
      bar.style.width = targetWidth;
    } else {
      bar.style.width = '50%';
    }
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
  { threshold: 0.3 }
);

if (skillSection) {
  skillObserver.observe(skillSection);
}

// PARALLAX MOUSE SCROLL SHAPES
const shape1 = document.querySelector('.shape1');
const shape2 = document.querySelector('.shape2');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY || window.pageYOffset;
  if (shape1) shape1.style.transform = `translateY(${scrollY * 0.4}px)`;
  if (shape2) shape2.style.transform = `translateY(${scrollY * 0.2}px)`;
});

// DYNAMIC MODAL HYDRATION OVERLAY CONTROLLER
const projectModal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-project-title');
const modalTech = document.getElementById('modal-project-tech');
const modalDesc = document.getElementById('modal-project-desc');
const modalLink = document.getElementById('modal-project-link');
const modalCloseBtn = document.getElementById('modal-close-btn');
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  const triggerBtn = card.querySelector('.project-modal-trigger');
  if (triggerBtn) {
    triggerBtn.addEventListener('click', () => {
      const title = card.getAttribute('data-title');
      const tech = card.getAttribute('data-tech');
      const desc = card.getAttribute('data-desc');
      const url = card.getAttribute('data-url');

      if (modalTitle) modalTitle.textContent = title;
      if (modalTech) modalTech.textContent = tech;
      if (modalDesc) modalDesc.textContent = desc;
      if (modalLink) modalLink.href = url;

      if (projectModal) {
        if (typeof projectModal.showModal === 'function') {
          projectModal.showModal();
        } else {
          projectModal.style.display = 'block';
        }
      }
    });
  }
});

if (modalCloseBtn && projectModal) {
  modalCloseBtn.addEventListener('click', () => {
    if (typeof projectModal.close === 'function') {
      projectModal.close();
    } else {
      projectModal.style.display = 'none';
    }
  });
  
  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      if (typeof projectModal.close === 'function') projectModal.close();
      else projectModal.style.display = 'none';
    }
  });
}

// BACK-TO-TOP BUTTON SCROLL LOOPS
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// EASTER EGG MANAGER
const logo = document.getElementById('logo');
const easterEgg = document.getElementById('easter-egg');
const eggCloseBtn = document.getElementById('egg-close');
let clickCount = 0;
const requiredClicks = 5;
const clickTimeout = 2000;
let clickTimer;

if (logo) {
  logo.addEventListener('click', (e) => {
    if(window.location.hash === "#home" || e.preventDefault) {
      e.preventDefault();
    }
    clickCount++;
    if (clickCount === requiredClicks) {
      if (easterEgg && typeof easterEgg.showModal === 'function') {
        easterEgg.showModal();
      } else if (easterEgg) {
        easterEgg.style.display = 'block';
      }
      clickCount = 0;
      clearTimeout(clickTimer);
    } else {
      clearTimeout(clickTimer);
      clickTimer = setTimeout(() => { clickCount = 0; }, clickTimeout);
    }
  });

  logo.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      logo.click();
    }
  });
}

if (eggCloseBtn && easterEgg) {
  eggCloseBtn.addEventListener('click', () => {
    if (typeof easterEgg.close === 'function') {
      easterEgg.close();
    } else {
      easterEgg.style.display = 'none';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  typeEffect();
});
