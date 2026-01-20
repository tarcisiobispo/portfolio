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

    // Cookie Banner
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const declineBtn = document.getElementById('decline-cookies');

    if (cookieBanner && acceptBtn && declineBtn) {
      // Check if user has already made a choice
      const cookieChoice = localStorage.getItem('cookie-consent');
      if (cookieChoice === 'accepted' || cookieChoice === 'declined') {
        cookieBanner.style.display = 'none';
        cookieBanner.setAttribute('aria-hidden', 'true');
      } else {
        // Show banner
        cookieBanner.setAttribute('aria-hidden', 'false');
      }

      acceptBtn.addEventListener('click', function() {
        localStorage.setItem('cookie-consent', 'accepted');
        cookieBanner.style.display = 'none';
        cookieBanner.setAttribute('aria-hidden', 'true');
      });

      declineBtn.addEventListener('click', function() {
        localStorage.setItem('cookie-consent', 'declined');
        cookieBanner.style.display = 'none';
        cookieBanner.setAttribute('aria-hidden', 'true');
        // Optionally disable tracking scripts here, but since they are already loaded, just hide banner
      });
    }
  });
})();