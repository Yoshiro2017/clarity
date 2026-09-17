/*
MIT License
Copyright (c) 2026 Clarity
*/

const html = document.documentElement;
const toggle = document.querySelector('.theme-toggle');
const navLinks = document.querySelectorAll('[data-page]');
const pages = document.querySelectorAll('.page');

// Theme Management
function applyTheme(theme) {
  if (theme === 'system') {
    html.removeAttribute('data-theme');
  } else {
    html.setAttribute('data-theme', theme);
  }
}

// Load saved preference
const saved = localStorage.getItem('theme') || 'system';
applyTheme(saved);

// Cycle: system → light → dark → system
toggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  let next;
  if (!current) next = 'light';
  else if (current === 'light') next = 'dark';
  else next = 'system';
  
  localStorage.setItem('theme', next);
  applyTheme(next);
});

// Page Navigation
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    const targetId = link.getAttribute('data-page');
    if (!targetId) return;
    e.preventDefault();

    // Update active links
    navLinks.forEach(l => l.classList.remove('active'));
    document.querySelectorAll(`[data-page="${targetId}"]`).forEach(l => l.classList.add('active'));

    // Show target page
    pages.forEach(p => p.classList.remove('active'));
    document.getElementById(targetId).classList.add('active');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
