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
            // Check if the link should not play sound (e.g., "See My Work" button)
            if (!this.hasAttribute('data-no-sound')) {
                playBookTurnSound();
            }
            animateButton(this);
        } else {
            console.error(`Element with ID ${targetId} not found`);
        }
    });
});

// Centipede cursor
const centipede = document.createElement('div');
centipede.className = 'centipede';
for (let i = 0; i < 10; i++) { // Create 10 segments for a longer centipede
    const segment = document.createElement('div');
    segment.className = 'centipede-segment';
    centipede.appendChild(segment);
}
document.body.appendChild(centipede);

document.addEventListener('mousemove', (e) => {
    const x = e.clientX - 50; // Offset to center the centipede
    const y = e.clientY - 10;
    centipede.style.left = `${x}px`;
    centipede.style.top = `${y}px`;
    // Add slight rotation for crawling effect
    const speed = e.movementX || e.movementY ? 1 : 0;
    centipede.style.transform = `rotate(${speed * 5}deg)`;
});

// Book turn sound and button animation
function playBookTurnSound() {
    const audio = new Audio('https://www.soundjay.com/buttons/beep-01a.mp3');
    audio.onerror = () => console.warn('Audio file failed to load');
    audio.play().catch(() => console.warn('Audio playback failed due to browser restrictions'));
}

function animateButton(button) {
    if (button) {
        button.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            button.style.transform = 'rotate(0deg)';
        }, 300);
    }
}
