const progress = document.querySelector('#progress');
const storyImages = document.querySelectorAll('.story-image img');

function updateProgress() {
  const h = document.documentElement.scrollHeight - window.innerHeight;
  const p = h <= 0 ? 0 : (window.scrollY / h) * 100;
  progress.style.width = `${Math.max(0, Math.min(100, p))}%`;
}

function updateParallax() {
  if (window.innerWidth <= 768) {
    storyImages.forEach((img) => {
      img.style.transform = 'translateY(0)';
    });
    return;
  }

  storyImages.forEach((img) => {
    const section = img.closest('.story-section');
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const offset = Math.max(-44, Math.min(44, rect.top * -0.1));
    img.style.transform = `translateY(${offset}px) scale(1.06)`;
  });
}

window.addEventListener('scroll', () => {
  updateProgress();
  updateParallax();
}, { passive: true });
window.addEventListener('load', () => {
  updateProgress();
  updateParallax();
});
window.addEventListener('resize', () => {
  updateProgress();
  updateParallax();
});

document.querySelectorAll('.game-start-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.target;
    const section = document.getElementById(targetId);
    if (!section) return;
    const overlay = section.querySelector('.game-overlay');
    if (!overlay) return;
    overlay.classList.add('is-hidden');
  });
});

function createSparkle(e) {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.textContent = '✶';
  sparkle.style.left = `${e.clientX}px`;
  sparkle.style.top = `${e.clientY}px`;
  sparkle.style.width = `${10 + Math.random() * 12}px`;
  sparkle.style.height = sparkle.style.width;
  sparkle.style.animationDuration = `${900 + Math.random() * 500}ms`;
  document.body.appendChild(sparkle);
  setTimeout(() => {
    sparkle.remove();
  }, 1500);
}

if (window.innerWidth > 768) {
  document.addEventListener('mousemove', createSparkle);
}
