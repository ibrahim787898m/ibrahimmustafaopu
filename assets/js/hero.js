/* ==========================================================================
   hero.js — types out the Whisper source line, then "runs" it
   Adds .has-run to .hero when finished, which reveals the output headline.
   ========================================================================== */

(function () {
  'use strict';

  /* --- Edit the hero line here ------------------------------------------
     Each part is typed in order. `cls` is the CSS class used to colour it:
       'kw'  → gold (a keyword in your language)
       'str' → white (a string literal)
     `whisper` is the print keyword in Whisper, your own language — which is
     the whole point of this line. If you change the string, change the <h1>
     in index.html to match it exactly. */
  var SOURCE = [
    { text: 'whisper ', cls: 'kw' },
    { text: '"I take things apart to find out how they work."', cls: 'str' }
  ];

  var TYPE_SPEED_MS = 26;   /* per character */
  var START_DELAY_MS = 500; /* wait before typing begins */
  var RUN_DELAY_MS = 320;   /* pause between last character and output */
  /* ---------------------------------------------------------------------- */

  var hero = document.querySelector('.hero');
  var source = document.querySelector('.hero__source');
  if (!hero || !source) return;

  var total = SOURCE.reduce(function (n, part) { return n + part.text.length; }, 0);

  /* Render the first `count` characters, preserving the colour spans. */
  function render(count) {
    var html = '';
    var used = 0;

    for (var i = 0; i < SOURCE.length; i++) {
      if (used >= count) break;
      var part = SOURCE[i];
      var take = Math.min(part.text.length, count - used);
      var slice = part.text.slice(0, take)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;');
      html += '<span class="' + part.cls + '">' + slice + '</span>';
      used += take;
    }

    source.innerHTML = html + '<span class="hero__caret">&nbsp;</span>';
  }

  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    render(total);
    hero.classList.add('has-run');
    return;
  }

  function play() {
    var typed = 0;
    setTimeout(function step() {
      render(++typed);
      if (typed < total) {
        setTimeout(step, TYPE_SPEED_MS);
      } else {
        setTimeout(function () { hero.classList.add('has-run'); }, RUN_DELAY_MS);
      }
    }, START_DELAY_MS);
  }

  /* Wait for the preloader to lift before typing, so the two sequences
     don't overlap. preloader.js fires this event even when it skips
     itself, so this is safe if the preloader is removed entirely. */
  var started = false;
  function begin() {
    if (started) return;
    started = true;
    play();
  }

  document.addEventListener('preloader:done', begin);

  /* Fallback: if no preloader exists at all, start on our own. */
  if (!document.querySelector('.preloader')) begin();

})();
