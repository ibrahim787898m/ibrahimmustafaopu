/* ==========================================================================
   preloader.js — the "compile" loading sequence

   Runs three named stages, counts 0 → 100, then lifts the overlay away.
   Shown once per browser session so you're not sitting through it on every
   navigation. Skipped entirely if the user prefers reduced motion.

   To change the wording, edit the <li> items in index.html.
   To change the timing, edit STAGE_MS and COUNT_MS below.
   ========================================================================== */

(function () {
  'use strict';

  var STAGE_MS = 380;   /* how long each stage sits highlighted */
  var COUNT_MS = 1140;  /* total time for the counter to reach 100 */
  var HOLD_MS  = 220;   /* pause on 100 before the wipe */

  var preloader = document.querySelector('.preloader');
  if (!preloader) return;

  var stages = preloader.querySelectorAll('.preloader__stages li');
  var count  = preloader.querySelector('.preloader__count');
  var rule   = preloader.querySelector('.preloader__rule');

  var reducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Has the sequence already played this session? sessionStorage can throw
     in private mode or on some file:// setups, so it's guarded. */
  var alreadySeen = false;
  try {
    alreadySeen = sessionStorage.getItem('preloaded') === '1';
  } catch (e) { /* storage unavailable — just play it */ }

  function finish() {
    preloader.classList.add('is-done');
    document.documentElement.classList.remove('is-loading');
    /* Let the hero animation start only once the overlay is moving */
    document.dispatchEvent(new CustomEvent('preloader:done'));
    setTimeout(function () { preloader.remove(); }, 1100);
  }

  /* --- Skip path ---------------------------------------------------------- */
  if (reducedMotion || alreadySeen) {
    preloader.remove();
    document.documentElement.classList.remove('is-loading');
    document.dispatchEvent(new CustomEvent('preloader:done'));
    return;
  }

  /* --- Play --------------------------------------------------------------- */
  document.documentElement.classList.add('is-loading');

  try { sessionStorage.setItem('preloaded', '1'); } catch (e) {}

  /* Stages light up one after another */
  stages.forEach(function (stage, i) {
    setTimeout(function () {
      stage.classList.add('is-active');
      setTimeout(function () {
        stage.classList.remove('is-active');
        stage.classList.add('is-done');
      }, STAGE_MS - 60);
    }, i * STAGE_MS);
  });

  /* Counter and rule run on a clock rather than a fixed number of steps,
     so they stay in sync regardless of frame rate. */
  var start = performance.now();

  function tick(now) {
    var progress = Math.min((now - start) / COUNT_MS, 1);
    /* ease-out so it slows as it approaches 100 */
    var eased = 1 - Math.pow(1 - progress, 2);
    var value = Math.round(eased * 100);

    if (count) count.textContent = value < 10 ? '0' + value : String(value);
    if (rule) rule.style.width = eased * 100 + '%';

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      setTimeout(finish, HOLD_MS);
    }
  }

  requestAnimationFrame(tick);

})();
