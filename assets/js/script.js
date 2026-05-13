// =============================================
// CUSTOM CURSOR
// =============================================
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';

  setTimeout(() => {
    cursorRing.style.left = e.clientX + 'px';
    cursorRing.style.top  = e.clientY + 'px';
  }, 80);
});

document.querySelectorAll('a, button, .skill-chip').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform  = 'translate(-50%,-50%) scale(2)';
    cursor.style.background = 'var(--magenta)';
    cursorRing.style.opacity = '0';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform  = 'translate(-50%,-50%) scale(1)';
    cursor.style.background = 'var(--cyan)';
    cursorRing.style.opacity = '0.5';
  });
});

// =============================================
// SCROLL REVEAL — Intersection Observer
// =============================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target); // anima só uma vez
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .stat-card, .skill-chip').forEach(el => {
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s, box-shadow 0.3s';
  revealObserver.observe(el);
});

// =============================================
// ACTIVE NAV LINK on scroll
// =============================================
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => navObserver.observe(sec));

// =============================================
// GLITCH TEXT — random flicker reforço
// =============================================
const glitchEl = document.querySelector('.glitch');
if (glitchEl) {
  setInterval(() => {
    glitchEl.style.opacity = Math.random() > 0.97 ? '0.7' : '1';
  }, 100);
}
