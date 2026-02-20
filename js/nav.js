// ─── NAV ─────────────────────────────────────────
function toggleMenu() {
  document.getElementById('hamburger').classList.toggle('open');
  document.getElementById('mobileMenu').classList.toggle('open');
}

function closeMenu() {
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobileMenu').classList.remove('open');
}

document.addEventListener('click', e => {
  const menu = document.getElementById('mobileMenu');
  const burger = document.getElementById('hamburger');
  if (menu && menu.classList.contains('open') &&
      !menu.contains(e.target) && !burger.contains(e.target)) {
    closeMenu();
  }
});
