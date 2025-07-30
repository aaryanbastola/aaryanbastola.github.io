// Update footer year dynamically
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth' });
        playBookTurnSound();
        animateButton(this);
    });
});

// Centipede cursor
const centipede = document.createElement('div');
centipede.className = 'centipede';
document.body.appendChild(centipede);

document.addEventListener('mousemove', (e) => {
    const x = e.clientX - 20;
    const y = e.clientY - 20;
    centipede.style.left = `${x}px`;
    centipede.style.top = `${y}px`;
});

// Book turn sound and button animation
function playBookTurnSound() {
    const audio = new Audio('https://www.soundjay.com/buttons/beep-01a.mp3');
    audio.play();
}

function animateButton(button) {
    button.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        button.style.transform = 'rotate(0deg)';
    }, 300);
}
