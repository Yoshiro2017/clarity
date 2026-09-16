/*
MIT License
Copyright (c) 2026 Clarity
Full license: see LICENSE file
*/

const htmlEl = document.documentElement;
const toggleBtn = document.querySelector('.theme-toggle');

// Load saved preference or use system default
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  htmlEl.setAttribute('data-theme', 'dark');
} else if (savedTheme === 'light') {
  htmlEl.setAttribute('data-theme', 'light');
}

// Toggle theme
toggleBtn.addEventListener('click', () => {
  const isDark = htmlEl.getAttribute('data-theme') === 'dark';
  htmlEl.setAttribute('data-theme', isDark ? 'light' : 'dark');
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
});

// Page navigation
const navLinks = document.querySelectorAll('[data-page]');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(link.dataset.page).classList.add('active');
    navLinks.forEach(l => l.classList.remove('active'));
    document.querySelectorAll(`[data-page="${link.dataset.page}"]`).forEach(l => l.classList.add('active'));
    window.scrollTo(0, 0);
  });
});
