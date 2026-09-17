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

// Theme Management
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

// Submenu Toggle — FIXED
function toggleSubmenu(open) {
  if (!moreToggle || !submenu) return;
  moreToggle.setAttribute('aria-expanded', String(open));
  submenu.setAttribute('aria-hidden', String(!open));
  submenu.style.display = open ? 'block' : 'none';
}

// Initialize submenu as closed
document.addEventListener('DOMContentLoaded', () => {
  if (submenu) submenu.style.display = 'none';
});

moreToggle?.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  const isOpen = moreToggle.getAttribute('aria-expanded') === 'true';
  toggleSubmenu(!isOpen);
});

// Close when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-more')) {
    toggleSubmenu(false);
  }
});

// Page Navigation
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    const targetId = link.getAttribute('data-page');
    if (!targetId) return;
    e.preventDefault();

    toggleSubmenu(false);

    navLinks.forEach(l => l.classList.remove('active'));
    document.querySelectorAll(`[data-page="${targetId}"]`).forEach(l => l.classList.add('active'));

    pages.forEach(p => p.classList.remove('active'));
    document.getElementById(targetId)?.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
