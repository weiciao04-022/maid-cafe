const progress = document.querySelector('#progress');
const hero = document.querySelector('.hero');

function updateProgress() {
  const h = document.documentElement.scrollHeight - window.innerHeight;
  const p = h <= 0 ? 0 : (window.scrollY / h) * 100;
  progress.style.width = `${Math.max(0, Math.min(100, p))}%`;
}

const parallaxPanels = document.querySelectorAll('.parallax-panel');

function updateParallax() {
  if (window.innerWidth <= 768) {
    if (hero) hero.style.setProperty('--hero-offset', '0px');
    return;
  }

  if (hero) {
    const heroRect = hero.getBoundingClientRect();
    const heroOffset = Math.max(-20, Math.min(20, heroRect.top * -0.08));
    hero.style.setProperty('--hero-offset', `${heroOffset}px`);
  }

  const scrollY = window.scrollY;
  parallaxPanels.forEach(panel => {
    const speed = parseFloat(panel.dataset.speed || 0.15);
    const rect = panel.getBoundingClientRect();
    const offset = (rect.top + window.scrollY - scrollY) * speed;
    panel.style.transform = `translateY(${offset * -0.08}px)`;
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
  sparkle.style.left = `${e.clientX}px`;
  sparkle.style.top = `${e.clientY}px`;
  document.body.appendChild(sparkle);
  setTimeout(() => {
    sparkle.remove();
  }, 700);
}

if (window.innerWidth > 768) {
  document.addEventListener('mousemove', createSparkle);
}
