/* ==========================================================================
   reveal.js — fades elements up as they scroll into view
   Anything with class="reveal" in the HTML is handled automatically.
   ========================================================================== */

(function () {
  'use strict';

  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  /* No IntersectionObserver (very old browser): show everything immediately
     rather than leaving the page invisible. */
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target); /* reveal once, then stop watching */
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -8% 0px'
  });

  items.forEach(function (el, index) {
    /* Small stagger so items in the same section don't all pop at once.
       Capped at 3 so later sections aren't slow. */
    el.style.transitionDelay = (Math.min(index, 3) * 60) + 'ms';
    observer.observe(el);
  });

})();
