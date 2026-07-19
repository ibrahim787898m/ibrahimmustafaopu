/* ==========================================================================
   magnetic.js — links drift toward the cursor

   Add data-magnetic to any element to give it a slight pull. Keep it for a
   small number of important targets (the social links, the email) — if
   everything is magnetic, nothing feels special.

   Optional attribute: data-magnetic-strength (default 0.3)
   ========================================================================== */

(function () {
  'use strict';

  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!finePointer || reducedMotion) return;

  var RADIUS = 70; /* px beyond the element's edge where the pull begins */

  document.querySelectorAll('[data-magnetic]').forEach(function (el) {
    var strength = parseFloat(el.dataset.magneticStrength) || 0.3;

    function onMove(e) {
      var box = el.getBoundingClientRect();
      var centreX = box.left + box.width / 2;
      var centreY = box.top + box.height / 2;

      var dx = e.clientX - centreX;
      var dy = e.clientY - centreY;
      var distance = Math.hypot(dx, dy);
      var reach = Math.max(box.width, box.height) / 2 + RADIUS;

      if (distance < reach) {
        el.classList.add('is-pulled');
        el.style.transform =
          'translate(' + dx * strength + 'px,' + dy * strength + 'px)';
      } else {
        release();
      }
    }

    function release() {
      el.classList.remove('is-pulled');
      el.style.transform = '';
    }

    window.addEventListener('mousemove', onMove, { passive: true });
    el.addEventListener('mouseleave', release);
    /* Reset when tabbing away, so keyboard users never see a stuck offset */
    el.addEventListener('blur', release);
  });

})();
