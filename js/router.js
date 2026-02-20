// ─── ROUTER ──────────────────────────────────────
const pages = ['home', 'manifesto', 'gallery', 'waitlist', 'contact'];

function showPage(id) {
  pages.forEach(p => {
    const el = document.getElementById(p);
    if (el) el.style.display = 'none';
  });

  const target = document.getElementById(id);
  if (target) target.style.display = 'block';

  // nav active state
  document.querySelectorAll('[data-page]').forEach(a => {
    a.classList.toggle('active', a.dataset.page === id);
  });

  window.scrollTo(0, 0);
}

// init on load
document.addEventListener('DOMContentLoaded', () => {
  // hide all pages first
  pages.forEach(p => {
    const el = document.getElementById(p);
    if (el) el.style.display = 'none';
  });
  showPage('home');
});
