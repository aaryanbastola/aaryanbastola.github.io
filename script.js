// --- Animated Typewriter Effect ---
const typewriterTexts = [
  "Web Developer • Cybersecurity & Ethical Hacking Enthusiast",
  "Building accessible, beautiful web apps.",
  "Always learning, always creating."
];
let twIndex = 0, twChar = 0, twElem = document.getElementById('typewriter');
function typeWriterLoop() {
  if (!twElem) return;
  if (twChar <= typewriterTexts[twIndex].length) {
    twElem.innerHTML = typewriterTexts[twIndex].substring(0, twChar++) + '<span class="blink">|</span>';
    setTimeout(typeWriterLoop, 50);
  } else {
    setTimeout(() => {
      twChar = 0; twIndex = (twIndex + 1) % typewriterTexts.length;
      typeWriterLoop();
    }, 1500);
  }
}
typeWriterLoop();

// --- Skills Animation on Scroll ---
function animateSkills() {
  document.querySelectorAll('.bar-fill').forEach(bar => {
    bar.style.width = bar.getAttribute('style').split(':')[1];
  });
}
window.addEventListener('DOMContentLoaded', animateSkills);

// --- Theme Switcher ---
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});
// Load theme preference
if(localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  themeBtn.textContent = '☀️';
}

// --- Project Filtering ---
const filterInput = document.getElementById('project-filter');
filterInput.addEventListener('input', function() {
  const filter = this.value.toLowerCase();
  document.querySelectorAll('.project-card').forEach(card => {
    const keywords = card.getAttribute('data-keywords').toLowerCase() + ' ' + card.textContent.toLowerCase();
    card.style.display = keywords.includes(filter) ? 'flex' : 'none';
  });
});

// --- GitHub Stats ---
fetch('https://api.github.com/users/aaryanbastola')
  .then(res => res.json())
  .then(data => {
    document.getElementById('github-repos').textContent = `Repos: ${data.public_repos}`;
    document.getElementById('github-followers').textContent = `Followers: ${data.followers}`;
  });

// --- Contact Form Validation ---
const form = document.getElementById('contact-form');
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = form.name.value.trim() || document.getElementById('name').value.trim();
  const email = form.email.value.trim() || document.getElementById('email').value.trim();
  const message = form.message?.value.trim() || document.getElementById('message').value.trim();
  const msg = document.getElementById('form-msg');

  if(name.length < 2) {
    msg.textContent = "Please enter your name.";
    msg.style.color = "red";
    return;
  }
  if(!email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
    msg.textContent = "Please enter a valid email.";
    msg.style.color = "red";
    return;
  }
  if(message.length < 10) {
    msg.textContent = "Your message is too short.";
    msg.style.color = "red";
    return;
  }
  msg.textContent = "Thank you for your message! (Demo: Not sent)";
  msg.style.color = "green";
  form.reset();
});
