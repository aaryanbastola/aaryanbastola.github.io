// ==========================================
// 1. OS THEME SYNC & TOGGLE
// ==========================================
const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');

function getSystemTheme() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  
  if (themeToggle) {
    themeToggle.innerHTML = theme === 'dark' 
      ? '<i class="fas fa-moon icon-spin"></i>' 
      : '<i class="fas fa-sun icon-spin"></i>';
      
    const icon = themeToggle.querySelector('i');
    icon.classList.remove('icon-spin');
    void icon.offsetWidth; 
    icon.classList.add('icon-spin');
  }
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  setTheme(savedTheme);
} else {
  setTheme(getSystemTheme());
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) setTheme(e.matches ? 'dark' : 'light');
  });
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const newTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });
}

// ==========================================
// 2. ADVANCED UI / UX INTERACTIONS
// ==========================================

// --- Scroll Progress Bar ---
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = document.getElementById('scroll-progress');
  if(progress) progress.style.width = (winScroll / height) * 100 + "%";
});

// --- Dynamic Favicon Generator ---
function updateFavicon(svgContent) {
  let link = document.getElementById('dynamic-favicon');
  if (link) {
    link.href = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${svgContent}</text></svg>`;
  }
}

// --- 3D Mouse-Tracking Cards (Vanilla-Tilt) ---
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.tilt-target').forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const tiltX = ((y - (rect.height / 2)) / 15).toFixed(2);
      const tiltY = (((rect.width / 2) - x) / 15).toFixed(2);
      el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });
}

// --- "Explain Like I'm 5" (ELI5) Toggle ---
document.querySelectorAll('.eli5-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation(); 
    const p = e.target.closest('.project-card').querySelector('.desc-text');
    if(p) {
        const currentText = p.textContent;
        p.textContent = p.dataset.simple;
        p.dataset.simple = currentText;
        
        btn.classList.toggle('active');
        if(btn.classList.contains('active')) {
            btn.style.background = 'var(--accent)';
            btn.style.color = 'var(--bg-dark)';
        } else {
            btn.style.background = 'transparent';
            btn.style.color = 'var(--accent)';
        }
    }
  });
});

// --- Decryption Hover Effect ---
document.querySelectorAll('.desc-text').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (el.dataset.decrypting || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    el.dataset.decrypting = "true";
    const original = el.textContent;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let i = 0;
    const interval = setInterval(() => {
      el.textContent = original.split("").map((char, idx) => 
        idx < i ? char : chars[Math.floor(Math.random() * chars.length)]
      ).join("");
      if (i >= original.length) {
        clearInterval(interval);
        el.dataset.decrypting = "";
        el.textContent = original; 
      }
      i += 1; 
    }, 15);
  });
});

// ==========================================
// 3. GAMIFICATION: CTF & TERMINAL SSH (With XSS Fix)
// ==========================================
fetch('/api/v1/status?token=flag{n3tw0rk_1nt3rc3pt10n}').catch(()=>null);

const ctfFlags = {
  'flag{source_code_recon}': false,
  'flag{n3tw0rk_1nt3rc3pt10n}': false,
  'flag{root_access_granted}': false
};

let isSSHMode = false;

const termInput = document.getElementById('terminal-command');
const termOutput = document.getElementById('terminal-output');
const promptUser = document.getElementById('prompt-user');

if (termInput && termOutput) {
  termInput.addEventListener('focus', () => updateFavicon('💻'));
  termInput.addEventListener('blur', () => {
      if(!document.body.classList.contains('secret-mode')) document.getElementById('dynamic-favicon').href = 'logo.png';
  });

  termInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const rawInput = termInput.value;
      const cmd = rawInput.trim();
      const cmdLower = cmd.toLowerCase();
      
      const sanitizedInput = rawInput.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      
      if (isSSHMode) {
        termOutput.innerHTML += `<p>> *********</p>`;
      } else {
        termOutput.innerHTML += `<p>> ${sanitizedInput}</p>`;
      }
      
      if (isSSHMode) {
        if (cmd === 'cyberpunk2026') { 
          termOutput.innerHTML += `<p style="color:#27c93f">Access Granted. [FLAG 3/3: flag{root_access_granted}]</p>`;
          if(promptUser) {
              promptUser.textContent = "root@portfolio:~#";
              promptUser.style.color = "#ff4757";
          }
        } else {
          termOutput.innerHTML += `<p style="color:#ff4757">Access Denied. Incorrect password.</p>`;
        }
        isSSHMode = false;
        termInput.value = '';
        termOutput.scrollTop = termOutput.scrollHeight;
        return;
      }

      if (cmdLower.startsWith('submit ')) {
        const submittedFlag = cmd.split(' ')[1];
        if (ctfFlags[submittedFlag] !== undefined) {
          if (ctfFlags[submittedFlag]) {
            termOutput.innerHTML += `<p>Flag already claimed.</p>`;
          } else {
            ctfFlags[submittedFlag] = true;
            const flagsFound = Object.values(ctfFlags).filter(Boolean).length;
            termOutput.innerHTML += `<p style="color:#27c93f">Flag accepted! [${flagsFound}/3]</p>`;
            
            if (flagsFound === 3) {
              termOutput.innerHTML += `<br><p style="color:#ffbd2e">🎉 SYSTEM COMPROMISED. ALL FLAGS FOUND.</p>`;
              termOutput.innerHTML += `<p style="color:#ffbd2e">Initiating reward payload...</p>`;
              setTimeout(() => {
                window.open('cv.pdf', '_blank'); 
              }, 2000);
            }
          }
        } else {
          termOutput.innerHTML += `<p style="color:#ff4757">Invalid flag format or incorrect flag.</p>`;
        }
        termInput.value = '';
        termOutput.scrollTop = termOutput.scrollHeight;
        return;
      }
      
      switch(cmdLower) {
        case 'help': termOutput.innerHTML += `<p>Commands: about, clear, ls, login, secret, metrics, submit flag{...}</p>`; break;
        case 'about': termOutput.innerHTML += `<p>I am Aaryan, building secure web apps.</p>`; break;
        case 'clear': termOutput.innerHTML = ''; break;
        case 'ls': termOutput.innerHTML += `<p style="color: #bbb;">resume.pdf &nbsp; sys32 &nbsp; root.sh &nbsp; hints.txt</p>`; break;
        case 'cat hints.txt': termOutput.innerHTML += `<p>1. Check the source.<br>2. Check the network.<br>3. Get root access.</p>`; break;
        case 'login': 
        case 'su root':
          isSSHMode = true;
          termOutput.innerHTML += `<p>Enter password for root user:</p>`;
          break;
        case 'secret': toggleSecretMode(); break;
        case 'metrics': 
          toggleMetrics();
          termOutput.innerHTML += `<p style="color: #00ffcc;">[SYSTEM] Performance overlay toggled.</p>`;
          break;
        case '': break; 
        default: termOutput.innerHTML += `<p>Command not found: ${sanitizedInput}</p>`;
      }
      termInput.value = '';
      termOutput.scrollTop = termOutput.scrollHeight; 
    }
  });
}

// ==========================================
// 4. HERO SECTION ANIMATIONS
// ==========================================
const whoamiEl = document.getElementById('whoami-terminal');
const heroNameContainer = document.getElementById('hero-name');
const typewriter = document.getElementById('typewriter');

const whoamiText = "visitor@system:~$ whoami";
let whoamiIndex = 0;

function typeWhoami() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    if(whoamiEl) whoamiEl.textContent = whoamiText;
    if(heroNameContainer) heroNameContainer.style.display = 'block';
    typeEffect();
    return;
  }
  
  if (whoamiIndex < whoamiText.length) {
    if(whoamiEl) whoamiEl.textContent += whoamiText.charAt(whoamiIndex);
    whoamiIndex++;
    setTimeout(typeWhoami, 50 + Math.random() * 50);
  } else {
    if(whoamiEl) whoamiEl.classList.add('done');
    setTimeout(() => {
      if(heroNameContainer) {
          heroNameContainer.style.display = 'block';
          const scrambleTarget = heroNameContainer.querySelector('.scramble-text');
          if (scrambleTarget) {
              scrambleText(scrambleTarget);
              scrambleTarget.dataset.scrambled = "true"; 
          }
      }
      setTimeout(typeEffect, 800); 
    }, 400);
  }
}

const phrases = [
  { text: 'Web Developer 💻', color: '#00bcd4' },
  { text: 'Cybersecurity Enthusiast 🛡️', color: '#27c93f' },
  { text: 'System Architect ⚙️', color: '#ffbd2e' } 
];
let phraseIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) { 
     if(typewriter) typewriter.textContent = "Web Developer | Cybersecurity"; 
     return; 
  }
  
  const currentObj = phrases[phraseIndex];
  if (isDeleting) charIndex = Math.max(0, charIndex - 1);
  else charIndex = Math.min(currentObj.text.length, charIndex + 1);
  
  if(typewriter) typewriter.textContent = currentObj.text.substring(0, charIndex);

  if (!isDeleting && charIndex === 1 && !document.body.classList.contains('secret-mode')) {
      document.documentElement.style.setProperty('--accent', currentObj.color);
  }

  if (!isDeleting && charIndex === currentObj.text.length) {
    setTimeout(() => { isDeleting = true; typeEffect(); }, 1500); 
    return;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false; 
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(typeEffect, 500); 
    return;
  }
  setTimeout(typeEffect, isDeleting ? 40 : 100);
}

function scrambleText(element) {
  const finalString = element.getAttribute('data-original');
  const chars = "!@#$%^&*()_+<>?|{}[]";
  let iteration = 0;
  clearInterval(element.dataset.interval);
  element.dataset.interval = setInterval(() => {
    element.innerText = finalString.split("").map((letter, index) => {
      if(index < iteration) return finalString[index];
      return chars[Math.floor(Math.random() * chars.length)];
    }).join("");
    if(iteration >= finalString.length) clearInterval(element.dataset.interval);
    iteration += 1 / 3;
  }, 30);
}

document.addEventListener('DOMContentLoaded', () => typeWhoami());

// ==========================================
// 5. ACCESSIBILITY, COMMAND PALETTE, UTILS
// ==========================================
const readingToggle = document.getElementById('reading-toggle');
const readingContent = document.getElementById('reading-content');
if (readingToggle) {
  readingToggle.addEventListener('click', () => {
    document.body.classList.toggle('reading-mode');
    const isReading = document.body.classList.contains('reading-mode');
    readingToggle.innerHTML = isReading ? '<i class="fas fa-times"></i>' : '<i class="fas fa-book-open"></i>';
    if(isReading) {
        if(readingContent) { readingContent.style.display = 'block'; setTimeout(() => readingContent.classList.add('visible'), 50); }
    } else {
        if(readingContent) { readingContent.classList.remove('visible'); setTimeout(() => readingContent.style.display = 'none', 600); }
    }
  });
}

const audioToggle = document.getElementById('audio-toggle');
const ambientAudio = document.getElementById('ambient-audio');
let isAudioPlaying = false;
if (audioToggle && ambientAudio) {
  ambientAudio.volume = 0.2;
  audioToggle.addEventListener('click', () => {
    if (isAudioPlaying) { ambientAudio.pause(); audioToggle.innerHTML = '<i class="fas fa-volume-mute"></i>'; } 
    else { ambientAudio.play().catch(e => console.log("Audio play blocked.")); audioToggle.innerHTML = '<i class="fas fa-volume-up"></i>'; }
    isAudioPlaying = !isAudioPlaying;
  });
}

const dyslexiaToggle = document.getElementById('dyslexia-toggle');
if (dyslexiaToggle) {
  dyslexiaToggle.addEventListener('click', () => {
    document.body.classList.toggle('dyslexia-mode');
    const isActive = document.body.classList.contains('dyslexia-mode');
    dyslexiaToggle.innerHTML = isActive ? '<i class="fas fa-text-height" style="color:var(--accent)"></i>' : '<i class="fas fa-universal-access"></i>';
  });
}

const cmdPalette = document.getElementById('cmd-palette-modal');
const cmdInput = document.getElementById('cmd-input');
const cmdResults = document.querySelectorAll('#cmd-results li');
let currentFocusIndex = -1;

function openCommandPalette() {
  if (cmdPalette && typeof cmdPalette.showModal === 'function') {
    cmdPalette.showModal();
    if(cmdInput) { cmdInput.value = ''; cmdInput.focus(); }
    filterCommands('');
    currentFocusIndex = -1;
  }
}
function closeCommandPalette() {
  if (cmdPalette && typeof cmdPalette.close === 'function') cmdPalette.close();
}

document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    if (cmdPalette) cmdPalette.open ? closeCommandPalette() : openCommandPalette();
  }
  if (e.key === 'Escape' && cmdPalette && cmdPalette.open) closeCommandPalette();
});

const triggerBtn = document.getElementById('cmd-trigger-btn');
if (triggerBtn) triggerBtn.addEventListener('click', openCommandPalette);

if (cmdInput) {
  cmdInput.addEventListener('input', (e) => filterCommands(e.target.value));
  cmdInput.addEventListener('keydown', (e) => {
    const visibleItems = Array.from(cmdResults).filter(li => li.style.display !== 'none');
    if (e.key === 'ArrowDown') { e.preventDefault(); currentFocusIndex = (currentFocusIndex + 1) % visibleItems.length; updateCmdFocus(visibleItems); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); currentFocusIndex = (currentFocusIndex - 1 + visibleItems.length) % visibleItems.length; updateCmdFocus(visibleItems); }
    else if (e.key === 'Enter' && currentFocusIndex >= 0) { e.preventDefault(); visibleItems[currentFocusIndex].click(); }
  });
}

function filterCommands(query) {
  query = query.toLowerCase();
  cmdResults.forEach(li => {
    if (li.textContent.toLowerCase().includes(query)) li.style.display = 'flex';
    else li.style.display = 'none';
    li.classList.remove('active-item');
  });
  currentFocusIndex = -1;
}

function updateCmdFocus(items) {
  cmdResults.forEach(li => li.classList.remove('active-item'));
  if (items[currentFocusIndex]) {
    items[currentFocusIndex].classList.add('active-item');
    items[currentFocusIndex].scrollIntoView({ block: 'nearest' });
  }
}

cmdResults.forEach(li => {
  li.addEventListener('click', () => {
    if (li.dataset.target) document.querySelector(li.dataset.target).scrollIntoView({ behavior: 'smooth' });
    else if (li.dataset.action === 'theme' && themeToggle) themeToggle.click();
    else if (li.dataset.action === 'reading' && readingToggle) readingToggle.click();
    closeCommandPalette();
  });
});

const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
if (window.matchMedia("(pointer: fine)").matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
  function animateCursor() {
    if (cursorDot) { cursorDot.style.left = `${mouseX}px`; cursorDot.style.top = `${mouseY}px`; }
    ringX += (mouseX - ringX) * 0.15; ringY += (mouseY - ringY) * 0.15;
    if (cursorRing) { cursorRing.style.left = `${ringX}px`; cursorRing.style.top = `${ringY}px`; }
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
}

// ==========================================
// 6. BACKGROUND CANVASES (NODES & MATRIX)
// ==========================================
const nodeCanvas = document.getElementById('node-canvas');
const nodeCtx = nodeCanvas.getContext('2d');
let nodes = [];
function initNodes() {
  nodeCanvas.width = window.innerWidth;
  nodeCanvas.height = window.innerHeight;
  nodes = Array.from({ length: 70 }, () => ({
    x: Math.random() * nodeCanvas.width, y: Math.random() * nodeCanvas.height,
    vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
    baseVx: (Math.random() - 0.5) * 0.5, baseVy: (Math.random() - 0.5) * 0.5
  }));
}
function drawNodes() {
  nodeCtx.clearRect(0, 0, nodeCanvas.width, nodeCanvas.height);
  nodeCtx.fillStyle = 'rgba(0, 188, 212, 0.4)';
  nodes.forEach((n, i) => {
    const dx = mouseX - n.x; const dy = mouseY - n.y; const dist = Math.hypot(dx, dy);
    if (dist < 130) {
      const force = (130 - dist) / 130;
      n.vx -= (dx / dist) * force * 0.08; n.vy -= (dy / dist) * force * 0.08;
      nodeCtx.strokeStyle = `rgba(0, 188, 212, ${0.25 - dist/500})`;
      nodeCtx.beginPath(); nodeCtx.moveTo(n.x, n.y); nodeCtx.lineTo(mouseX, mouseY); nodeCtx.stroke();
    } else {
      n.vx += (n.baseVx - n.vx) * 0.01; n.vy += (n.baseVy - n.vy) * 0.01;
    }
    n.x += n.vx; n.y += n.vy;
    if (n.x < 0 || n.x > nodeCanvas.width) { n.vx *= -1; n.baseVx *= -1; }
    if (n.y < 0 || n.y > nodeCanvas.height) { n.vy *= -1; n.baseVy *= -1; }
    nodeCtx.beginPath(); nodeCtx.arc(n.x, n.y, 2.5, 0, Math.PI * 2); nodeCtx.fill();
    nodes.slice(i + 1).forEach(n2 => {
      const dist2 = Math.hypot(n.x - n2.x, n.y - n2.y);
      if (dist2 < 120) {
        nodeCtx.strokeStyle = `rgba(0, 188, 212, ${0.15 - dist2/800})`;
        nodeCtx.beginPath(); nodeCtx.moveTo(n.x, n.y); nodeCtx.lineTo(n2.x, n2.y); nodeCtx.stroke();
      }
    });
  });
  requestAnimationFrame(drawNodes);
}

const mCanvas = document.getElementById('matrix-canvas');
const mCtx = mCanvas.getContext('2d');
const hexChars = '0123456789ABCDEF'.split('');
let drops = [];
let matrixInterval;
function initMatrix() {
  mCanvas.width = window.innerWidth;
  mCanvas.height = window.innerHeight;
  const cols = mCanvas.width / 14;
  drops = Array(Math.floor(cols)).fill(1);
}
function drawMatrix() {
  mCtx.fillStyle = 'rgba(5, 0, 10, 0.05)';
  mCtx.fillRect(0, 0, mCanvas.width, mCanvas.height);
  mCtx.fillStyle = '#ff00ff'; mCtx.font = '14px monospace';
  drops.forEach((y, i) => {
    const text = hexChars[Math.floor(Math.random() * hexChars.length)];
    mCtx.fillText(text, i * 14, y * 14);
    if (y * 14 > mCanvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  });
}
window.addEventListener('resize', () => { initNodes(); initMatrix(); });
initNodes(); drawNodes(); initMatrix();

function toggleSecretMode() {
  const isSecret = document.body.classList.toggle('secret-mode');
  if (isSecret) {
      updateFavicon('💀');
      if (termOutput) {
          termOutput.innerHTML += `<p style="color: #ff00ff; font-weight: bold;">[SYSTEM OVERRIDE] => SECRET MODE ACTIVATED.</p>`;
          termOutput.scrollTop = termOutput.scrollHeight;
      }
      matrixInterval = setInterval(drawMatrix, 50);
  } else {
      document.getElementById('dynamic-favicon').href = 'logo.png';
      clearInterval(matrixInterval);
      mCtx.clearRect(0, 0, mCanvas.width, mCanvas.height);
      if (termOutput) {
          termOutput.innerHTML += `<p style="color: #00ffcc;">[SYSTEM] Reality restored.</p>`;
          termOutput.scrollTop = termOutput.scrollHeight;
      }
  }
}

// Konami Code with optimization
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiPosition = 0;
document.addEventListener('keydown', (e) => {
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  if (key === konamiCode[konamiPosition]) {
    konamiPosition++;
    if (konamiPosition === konamiCode.length) { toggleSecretMode(); konamiPosition = 0; }
  } else {
    konamiPosition = (key === konamiCode[0]) ? 1 : 0;
  }
});

// ==========================================
// 7. SCROLL OBSERVERS & MODALS & PARTICLES
// ==========================================
const faders = document.querySelectorAll('.fade-in, .timeline-item, .project-card');
const appearOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    const scrambleTarget = entry.target.querySelector('.scramble-text');
    if (scrambleTarget && !scrambleTarget.classList.contains('name-glitch') && !scrambleTarget.dataset.scrambled && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        scrambleText(scrambleTarget);
        scrambleTarget.dataset.scrambled = "true"; 
    }
    observer.unobserve(entry.target);
  });
}, appearOptions);
faders.forEach(fader => appearOnScroll.observe(fader));

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mainNav = document.getElementById('main-nav');
if(mobileMenuBtn) mobileMenuBtn.addEventListener('click', () => mainNav.classList.toggle('active'));

const projectModal = document.getElementById('project-modal');
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    const t = document.getElementById('modal-project-title');
    const d = document.getElementById('modal-project-desc');
    if(t) t.textContent = card.dataset.title;
    if(d) d.textContent = card.dataset.desc;
    if (projectModal) projectModal.showModal();
  });
});
document.querySelectorAll('.modal-close-secondary').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const parentDialog = e.target.closest('dialog');
    if (parentDialog && typeof parentDialog.close === 'function') parentDialog.close();
  });
});

const demoModal = document.getElementById('demo-modal');
const demoTrigger = document.getElementById('demo-trigger');
const demoCloseBtn = document.getElementById('demo-close-btn');
if (demoTrigger && demoModal) demoTrigger.addEventListener('click', () => demoModal.showModal());
if (demoCloseBtn && demoModal) demoCloseBtn.addEventListener('click', () => demoModal.close());

const perfMetrics = document.getElementById('perf-metrics');
const fpsCounter = document.getElementById('fps-counter');
let lastTime = performance.now(); let frames = 0; let metricsReqId;
function updateMetrics() {
  if (perfMetrics && !perfMetrics.classList.contains('perf-hidden')) {
    const now = performance.now(); frames++;
    if (now - lastTime >= 1000) {
      if (fpsCounter) fpsCounter.textContent = frames;
      frames = 0; lastTime = now;
      if (performance.memory && document.getElementById('mem-counter')) {
        document.getElementById('mem-counter').textContent = (performance.memory.usedJSHeapSize / 1048576).toFixed(2) + ' MB';
      }
    }
    metricsReqId = requestAnimationFrame(updateMetrics);
  }
}
function toggleMetrics() {
  if (perfMetrics) {
    perfMetrics.classList.toggle('perf-hidden');
    if (!perfMetrics.classList.contains('perf-hidden')) { lastTime = performance.now(); frames = 0; updateMetrics(); } 
    else { cancelAnimationFrame(metricsReqId); }
  }
}

const cCanvas = document.getElementById('contact-particles');
if (cCanvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const cCtx = cCanvas.getContext('2d');
  let cParticles = [];
  function resizeCCanvas() {
    cCanvas.width = document.getElementById('contact').offsetWidth;
    cCanvas.height = document.getElementById('contact').offsetHeight;
  }
  window.addEventListener('resize', resizeCCanvas); resizeCCanvas();
  
  for (let i = 0; i < 100; i++) cParticles.push({
    x: Math.random() * cCanvas.width, y: Math.random() * cCanvas.height,
    vx: (Math.random() - 0.5), vy: (Math.random() - 0.5), size: Math.random() * 2 + 1
  });

  function animContact() {
    cCtx.clearRect(0, 0, cCanvas.width, cCanvas.height);
    cParticles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if(p.x < 0 || p.x > cCanvas.width) p.vx *= -1;
      if(p.y < 0 || p.y > cCanvas.height) p.vy *= -1;
      cCtx.beginPath(); cCtx.arc(p.x, p.y, p.size, 0, Math.PI*2);
      cCtx.fillStyle = `rgba(0, 188, 212, 0.3)`; cCtx.fill();
    });
    requestAnimationFrame(animContact);
  }
  animContact();
}
