// Mobile nav toggle
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));
}

// Contact form
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = 'Gesendet ✓';
    btn.style.background = 'var(--sage)';
    setTimeout(() => { form.reset(); btn.innerHTML = original; btn.style.background = ''; }, 2200);
  });
}

// Header blur on scroll
(() => {
  const header = document.querySelector('.header');
  if (!header) return;
  const onScroll = () => {
    if (window.scrollY > 20) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// Scrollspy — automatic active nav based on visible section
(() => {
  const navLinks = document.querySelectorAll('.nav-links a[data-section]');
  if (!navLinks.length) return;
  const sections = Array.from(navLinks)
    .map(a => document.getElementById(a.dataset.section))
    .filter(Boolean);
  if (!sections.length) return;

  const setActive = (id) => {
    navLinks.forEach(a => a.classList.toggle('active', a.dataset.section === id));
  };

  const onScroll = () => {
    const scrollPos = window.scrollY + 120;
    let current = sections[0].id;
    for (const sec of sections) {
      if (sec.offsetTop <= scrollPos) current = sec.id;
    }
    // If near bottom, leave current; reviews stays active
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
      current = sections[sections.length - 1].id;
    }
    setActive(current);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
