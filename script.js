// Reveal .program-card on scroll
document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.program-card');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform += ' scale(1.06)';
        entry.target.style.transition = 'opacity 0.8s, transform 0.8s';
      }
    });
  }, { threshold: 0.2 });
  cards.forEach(card => {
    card.style.opacity = 0;
    observer.observe(card);
  });
});
