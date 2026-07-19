/* ==========================================================================
   cursor.js — custom cursor

   A gold dot that tracks the pointer exactly, and a ring that lags behind
   and expands over anything clickable. Also writes the pointer position to
   --mx / --my so the ambient hero glow can follow it.

   Only runs on devices with a fine pointer (mouse/trackpad). Touch devices
   and reduced-motion users get nothing, which is correct.
   ========================================================================== */

(function () {
  'use strict';

  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!finePointer || reducedMotion) return;

  var EASING = 0.18; /* how fast the ring catches up. Lower = more lag. */

  var dot = document.querySelector('.cursor-dot');
  var ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  document.documentElement.classList.add('has-custom-cursor');

  var pointerX = 0, pointerY = 0;   /* actual pointer */
  var ringX = 0, ringY = 0;         /* lagging ring */
  var live = false;

  window.addEventListener('mousemove', function (e) {
    pointerX = e.clientX;
    pointerY = e.clientY;

    if (!live) {
      /* Snap the ring into place on first move so it doesn't fly in
         from the top-left corner */
      ringX = pointerX;
      ringY = pointerY;
      live = true;
      dot.classList.add('is-live');
      ring.classList.add('is-live');
    }

    /* Ambient glow follows the pointer */
    document.body.style.setProperty('--mx', (pointerX / window.innerWidth) * 100 + '%');
    document.body.style.setProperty('--my', (pointerY / window.innerHeight) * 40 - 10 + '%');
  }, { passive: true });

  /* Hide when the pointer leaves the window */
  document.addEventListener('mouseleave', function () {
    dot.classList.remove('is-live');
    ring.classList.remove('is-live');
  });
  document.addEventListener('mouseenter', function () {
    if (!live) return;
    dot.classList.add('is-live');
    ring.classList.add('is-live');
  });

  /* Expand the ring over anything clickable */
  document.addEventListener('mouseover', function (e) {
    if (e.target.closest('a, button, [data-magnetic]')) {
      ring.classList.add('is-hovering');
    }
  }, { passive: true });

  document.addEventListener('mouseout', function (e) {
    if (e.target.closest('a, button, [data-magnetic]')) {
      ring.classList.remove('is-hovering');
    }
  }, { passive: true });

  /* Render loop. The dot is exact; the ring interpolates toward the
     pointer each frame, which is what produces the trailing feel. */
  (function frame() {
    ringX += (pointerX - ringX) * EASING;
    ringY += (pointerY - ringY) * EASING;

    dot.style.transform  = 'translate3d(' + pointerX + 'px,' + pointerY + 'px,0)';
    ring.style.transform = 'translate3d(' + ringX + 'px,' + ringY + 'px,0)';

    requestAnimationFrame(frame);
  })();

})();
