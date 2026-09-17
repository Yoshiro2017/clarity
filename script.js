/*
MIT License
Copyright (c) 2026 Clarity
*/

const html = document.documentElement;
const toggle = document.querySelector('.theme-toggle');
const navLinks = document.querySelectorAll('[data-page]');
const pages = document.querySelectorAll('.page');
const moreToggle = document.querySelector('.nav-more-toggle');
const submenu = document.querySelector('.nav-more-submenu');

function applyTheme(theme) {
  if (theme === 'system') {
    html.removeAttribute('data-theme');
  } else {
    html.setAttribute('data-theme', theme);
  }
}

const saved = localStorage.getItem('theme') || 'system';
applyTheme(saved);

toggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  let next;
  if (!current) next = 'light';
  else if (current === 'light') next = 'dark';
  else next = 'system';
  
  localStorage.setItem('theme', next);
  applyTheme(next);
});

function toggleSubmenu(open) {
  moreToggle.setAttribute('aria-expanded', String(open));
  submenu.setAttribute('aria-hidden', String(!open));
}

moreToggle.addEventListener('click', () => {
  const isOpen = moreToggle.getAttribute('aria-expanded') === 'true';
  toggleSubmenu(!isOpen);
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-more')) {
    toggleSubmenu(false);
  }
});

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    const targetId = link.getAttribute('data-page');
    if (!targetId) return;
    e.preventDefault();

    toggleSubmenu(false);

    navLinks.forEach(l => l.classList.remove('active'));
    document.querySelectorAll(`[data-page="${targetId}"]`).forEach(l => l.classList.add('active'));

    pages.forEach(p => p.classList.remove('active'));
    document.getElementById(targetId).classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
