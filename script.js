document.addEventListener('DOMContentLoaded', function() {
    // Update footer year dynamically
    const yearElem = document.getElementById('year');
    if (yearElem) {
        yearElem.textContent = new Date().getFullYear();
    }

    // Smooth scrolling for navigation links, but skip the skip-link
    document.querySelectorAll('a[href^="#"]:not(.skip-link)').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                if (!this.hasAttribute('data-no-sound')) {
                    playBookTurnSound();
                }
                animateButton(this);
            }
        });
    });

    // Rocket cursor
    const rocket = document.createElement('div');
    rocket.className = 'rocket';
    rocket.textContent = '🚀';
    document.body.appendChild(rocket);

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX - 12; // Center the rocket (half of font-size 24px)
        const y = e.clientY - 12;
        rocket.style.left = `${x}px`;
        rocket.style.top = `${y}px`;
    });

    // Book turn sound and button animation
    function playBookTurnSound() {
        const audio = new Audio('https://www.soundjay.com/buttons/beep-01a.mp3');
        audio.onerror = () => {};
        audio.play().catch(() => {});
    }

    function animateButton(button) {
        if (button) {
            button.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                button.style.transform = 'rotate(0deg)';
            }, 300);
        }
    }
});
