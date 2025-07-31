// Animation for project cards on scroll (like mitnepal.edu.np)
function onScrollAnim() {
  const cards = document.querySelectorAll('.project-card');
  const windowBottom = window.innerHeight + window.scrollY;
  cards.forEach((card, i) => {
    const cardTop = card.getBoundingClientRect().top + window.scrollY;
    if (windowBottom > cardTop + 100) {
      setTimeout(() => card.classList.add('visible'), i * 160);
    }
  });
}
window.addEventListener('scroll', onScrollAnim);
window.addEventListener('load', onScrollAnim);
