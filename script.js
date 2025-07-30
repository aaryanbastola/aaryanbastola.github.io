// Update footer year dynamically
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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
        } else {
            console.error(`Element with ID ${targetId} not found`);
        }
    });
});

// Rocket cursor
const rocket = document.createElement('div');
rocket.className = 'rocket';
rocket.textContent = '🚀';
document.body.appendChild(rocket);
console.log('Rocket added to body'); // Debug log

document.addEventListener('mousemove', (e) => {
    const x = e.clientX - 12; // Center the rocket (half of font-size 24px)
    const y = e.clientY - 12;
    rocket.style.left = `${x}px`;
    rocket.style.top = `${y}px`;
    console.log('Cursor moved', x, y); // Debug log
});

// Book turn sound and button animation
function playBookTurnSound() {
    const audio = new Audio('https://www.soundjay.com/buttons/beep-01a.mp3');
    audio.onerror = () => console.warn('Audio file failed to load');
    audio.play().catch(() => console.warn('Audio playback failed'));
}

function animateButton(button) {
    if (button) {
        button.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            button.style.transform = 'rotate(0deg)';
        }, 300);
    }
}
