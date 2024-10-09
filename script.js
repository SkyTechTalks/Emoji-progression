const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const emojiMessage = document.getElementById('emoji-message');
const confettiCanvas = document.getElementById('confetti-canvas');
const emojis = document.querySelectorAll('.emoji');

const confettiContext = confettiCanvas.getContext('2d');
let confettiParticles = [];

function setProgressBar(progressValue, progressColor, message) {
  progressBar.style.width = `${progressValue}%`;
  progressBar.style.backgroundColor = progressColor;
  progressText.textContent = `${progressValue}%`;
  emojiMessage.textContent = message;

  if (progressValue === "100") {
    document.body.style.background = "linear-gradient(135deg, #ff9a9e, #fad0c4)";
    emojiMessage.textContent += " 🎉";
    launchConfetti(); 
  }
}

emojis.forEach(emoji => {
  emoji.addEventListener('click', () => {
    const progressValue = emoji.getAttribute('data-progress');
    const progressColor = emoji.getAttribute('data-color');
    const message = emoji.getAttribute('data-message');
    setProgressBar(progressValue, progressColor, message);

    emojis.forEach(e => e.classList.remove('selected'));
    emoji.classList.add('selected');
  });
});

function launchConfetti() {
  confettiParticles = Array.from({ length: 200 }, () => ({
    x: Math.random() * confettiCanvas.width,
    y: Math.random() * confettiCanvas.height,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    size: Math.random() * 5 + 2,
    velocityX: Math.random() * 2 - 1,
    velocityY: Math.random() * 2 + 1,
  }));
}

function animateConfetti() {
  confettiContext.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiParticles.forEach(particle => {
    particle.x += particle.velocityX;
    particle.y += particle.velocityY;
    confettiContext.fillStyle = particle.color;
    confettiContext.beginPath();
    confettiContext.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    confettiContext.fill();
  });
  requestAnimationFrame(animateConfetti);
}
animateConfetti();
