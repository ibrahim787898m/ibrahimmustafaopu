/* ==========================================================================
   nav.js — header border on scroll, reading-progress bar, active nav link
   ========================================================================== */

(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var progress = document.querySelector('.site-header__progress');
  var links = Array.prototype.slice.call(
    document.querySelectorAll('.site-nav a')
  );

  if (!header) return;

  /* Match each nav link to the section it points at. */
  var sections = links.map(function (link) {
    return document.querySelector(link.getAttribute('href'));
  });

  /* Fraction of the viewport height at which a section counts as "current" */
  var ACTIVE_POINT = 0.4;

  function update() {
    var scrolled = window.scrollY;

    header.classList.toggle('is-stuck', scrolled > 20);

    if (progress) {
      var scrollable = document.documentElement.scrollHeight - window.innerHeight;
      var pct = scrollable > 0 ? (scrolled / scrollable) * 100 : 0;
      progress.style.width = pct + '%';
    }

    var current = -1;
    sections.forEach(function (section, i) {
      if (!section) return;
      if (section.getBoundingClientRect().top <= window.innerHeight * ACTIVE_POINT) {
        current = i;
      }
    });

    links.forEach(function (link, i) {
      link.classList.toggle('is-active', i === current);
    });
  }

  /* rAF throttle so the scroll handler doesn't run more than once a frame */
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      update();
      ticking = false;
    });
  }, { passive: true });

  window.addEventListener('resize', update, { passive: true });
  update();

})();
