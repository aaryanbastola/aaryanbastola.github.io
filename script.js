// Typewriter/Animated Headline
const typewriterTexts = [
  "Web Developer • Cybersecurity Enthusiast",
  "React.js, JavaScript, Python",
  "Welcome to my portfolio!",
  "Let's build something amazing together."
];
let twIndex = 0, twChar = 0, isDeleting = false, delay = 70;
const twElem = document.getElementById('typewriter');
function typeWriterLoop() {
  if (!twElem) return;
  let txt = typewriterTexts[twIndex];
  if (isDeleting) {
    twElem.innerHTML = txt.substring(0, twChar--) + '<span class="blink">|</span>';
    if (twChar < 0) {
      isDeleting = false;
      twIndex = (twIndex + 1) % typewriterTexts.length;
      setTimeout(typeWriterLoop, 500);
    } else {
      setTimeout(typeWriterLoop, 28);
    }
  } else {
    twElem.innerHTML = txt.substring(0, twChar++) + '<span class="blink">|</span>';
    if (twChar <= txt.length) {
      setTimeout(typeWriterLoop, delay);
    } else {
      isDeleting = true;
      setTimeout(typeWriterLoop, 1100);
    }
  }
}
typeWriterLoop();

// Dynamic Statistics Counters
function animateCounter(id, target, duration) {
  const elem = document.getElementById(id);
  let start = 0;
  const increment = Math.ceil(target / (duration / 27));
  function update() {
    start += increment;
    if (start < target) {
      elem.textContent = start;
      requestAnimationFrame(update);
    } else {
      elem.textContent = target;
    }
  }
  update();
}
// Example stats:
animateCounter('years-exp', 3, 1100);
animateCounter('projects', 12, 1300);
animateCounter('coding-hours', 2500, 1500);

// Theme Switcher in Hero
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});
if(localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  themeBtn.textContent = '☀️';
}
