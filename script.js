/*
MIT License
Copyright (c) 2026 Clarity
*/

const body = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const navLinks = document.querySelectorAll('[data-page]');
const pages = document.querySelectorAll('.page');

const STORAGE_KEY = 'clarity-theme';

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getSavedTheme() {
  return localStorage.getItem(STORAGE_KEY);
}

function setTheme(theme) {
  if (theme === 'auto') {
    body.removeAttribute('data-theme');
    localStorage.removeItem(STORAGE_KEY);
  } else {
    body.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }
}

function toggleTheme() {
  const current = body.getAttribute('data-theme');
  if (current === 'dark') {
    setTheme('light');
  } else if (current === 'light') {
    setTheme('auto');
  } else {
    setTheme('dark');
  }
}

function switchPage(pageId) {
  pages.forEach(page => {
    page.classList.remove('active');
    if (page.id === pageId) page.classList.add('active');
  });
  navLinks.forEach(link => {
    if (link.tagName === 'A') {
      link.classList.remove('active');
      if (link.getAttribute('data-page') === pageId) link.classList.add('active');
    }
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize
const saved = getSavedTheme();
if (saved) setTheme(saved);

themeToggle.addEventListener('click', toggleTheme);

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetPage = link.getAttribute('data-page');
    if (targetPage) switchPage(targetPage);
  });
});

document.querySelector('.nav-brand').addEventListener('click', () => switchPage('home'));

// Respect system changes when no explicit preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (!getSavedTheme()) {
    const current = body.getAttribute('data-theme');
    if (!current) {
      body.style.display = 'none';
      body.offsetHeight; // force reflow
      body.style.display = '';
    }
  }
});
