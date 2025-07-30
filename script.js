// Smooth scroll for anchor links
document.querySelectorAll('a.nav-link').forEach(function(link) {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').replace('#', '');
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
