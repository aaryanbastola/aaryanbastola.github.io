document.addEventListener('DOMContentLoaded', () => {
  setupTheme();
  startTypewriter();
  initFadeIn();
  initSkillBars();
  initLightbox();
  initSurprise();
});

/* THEME */
function setDataTheme(theme){document.documentElement.setAttribute('data-theme', theme);localStorage.setItem('theme', theme)}
function getSystemTheme(){return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'}
function setupTheme(){
  const btn = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('theme');
  const theme = saved || getSystemTheme();
  setDataTheme(theme);
  if (btn) btn.textContent = theme === 'dark' ? '🌙' : '☀️';
  if (btn) btn.addEventListener('click', () => { const current = document.documentElement.getAttribute('data-theme'); const next = current === 'dark' ? 'light' : 'dark'; setDataTheme(next); btn.textContent = next === 'dark' ? '🌙' : '☀️'; });
  if (window.matchMedia) window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => { if (!localStorage.getItem('theme')) setDataTheme(e.matches ? 'dark' : 'light'); });
}

/* TYPEWRITER */
function startTypewriter(){
  const el = document.getElementById('typewriter'); if(!el) return;
  const phrases = ['Web Developer 💻','UI/UX Enthusiast 🎨','React Explorer ⚛️','Always Learning 🚀'];
  let pi=0, ci=0, del=100, deleting=false;
  function tick(){
    const p = phrases[pi];
    if(deleting){ ci = Math.max(0, ci-1); } else { ci = Math.min(p.length, ci+1); }
    el.textContent = p.substring(0,ci);
    if(!deleting && ci === p.length){ deleting=true; setTimeout(tick,1500); return; }
    if(deleting && ci===0){ deleting=false; pi=(pi+1)%phrases.length; setTimeout(tick,500); return; }
    setTimeout(tick, deleting ? del/2 : del);
  }
  tick();
}

/* FADE-IN */
function initFadeIn(){ const faders = document.querySelectorAll('.fade-in'); const obs = new IntersectionObserver((entries,o)=>{ entries.forEach(entry=>{ if(entry.isIntersecting){ entry.target.classList.add('visible'); o.unobserve(entry.target);} }); }, {threshold:0.12}); faders.forEach(f=>obs.observe(f)); }

/* SKILL BARS */
function initSkillBars(){ const bars=document.querySelectorAll('.bar-fill'); const section=document.getElementById('skills'); if(!section) return; const obs=new IntersectionObserver((entries,o)=>{ entries.forEach(entry=>{ if(entry.isIntersecting){ bars.forEach(b=>{ const w=b.dataset.width||'50%'; if(/^\d+%$/.test(w)) b.style.width=w; else b.style.width='50%'; }); o.unobserve(entry.target);} }); },{threshold:0.4}); obs.observe(section); }

/* LIGHTBOX */
function initLightbox(){
  const grid = document.getElementById('cert-grid'); const lightbox = document.getElementById('lightbox'); const frame = document.getElementById('lb-frame'); const title = document.getElementById('lb-title'); const openBtn = document.getElementById('lb-open'); const closeBtn = document.getElementById('lb-close'); const prevBtn = document.getElementById('lb-prev'); const nextBtn = document.getElementById('lb-next');
  if(!grid || !lightbox) return;
  const items = Array.from(grid.querySelectorAll('.cert-card'));
  const srcs = items.map(i=>i.dataset.src);
  const titles = items.map(i=>i.dataset.title);
  let current = -1;
  function openAt(index){
    if(index<0||index>=srcs.length) return;
    current=index;
    const url=srcs[current];
    frame.src = url;
    title.textContent = titles[current] || '';
    openBtn.href = url;
    lightbox.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
    frame.style.transform='scale(.99)'; setTimeout(()=>frame.style.transform='scale(1)',50);
  }
  function closeLB(){ lightbox.setAttribute('aria-hidden','true'); frame.src='about:blank'; document.body.style.overflow=''; current=-1; }
  function prev(){ openAt(current>0?current-1:srcs.length-1); }
  function next(){ openAt(current<srcs.length-1?current+1:0); }

  items.forEach((btn, idx)=>{ btn.addEventListener('click', ()=>openAt(idx)); btn.addEventListener('keydown', e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); openAt(idx); } }); });

  closeBtn.addEventListener('click', closeLB);
  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  lightbox.addEventListener('click', e=>{ if(e.target===lightbox) closeLB(); });

  document.addEventListener('keydown', e=>{ if(lightbox.getAttribute('aria-hidden')==='false'){ if(e.key==='Escape') closeLB(); if(e.key==='ArrowLeft') prev(); if(e.key==='ArrowRight') next(); } });
}

/* SURPRISE */
function initSurprise(){
  const btn = document.getElementById('surprise'); if(!btn) return;
  const logo = document.getElementById('logo'); let on=false;
  btn.addEventListener('click', ()=>{ on = !on; if(on){ logo.classList.add('logo-pulse'); btn.textContent = 'Nice! Click again to stop ✨'; } else { logo.classList.remove('logo-pulse'); btn.textContent = 'Curious? Click me ✨'; } });
}
