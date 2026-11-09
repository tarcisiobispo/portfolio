/**
 * Simple Navigation Controller
 * Handles mobile menu toggle only - no complex SPA
 */
(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.querySelector('.site-nav__toggle');
    const menu = document.querySelector('.site-nav__menu');

    if (toggle && menu) {
      toggle.addEventListener('click', function() {
        toggle.classList.toggle('is-active');
        menu.classList.toggle('is-open');
        
        // Update aria-expanded
        const isOpen = menu.classList.contains('is-open');
        toggle.setAttribute('aria-expanded', isOpen);
      });

      // Close menu when clicking a link
      menu.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
          toggle.classList.remove('is-active');
          menu.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });

      // Close menu on escape key
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menu.classList.contains('is-open')) {
          toggle.classList.remove('is-active');
          menu.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // Theme Toggle Controller (Global Light/Dark Theme)
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 
          (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', nextTheme);
        if (document.body) {
          document.body.classList.toggle('dark-mode', nextTheme === 'dark');
        }
        try {
          localStorage.setItem('theme', nextTheme);
        } catch (e) { /* fail silently */ }
      });
    }
  });
})();