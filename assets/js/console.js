/* ==========================================================================
   console.js — a small interactive terminal for the portfolio

   Self-contained. Reads nothing private (no IP, no tracking). whoami prints
   a random friendly line per session. Everything the console shows is also
   available in the normal page — this is a second, playful path, never the
   only one.

   To edit content: change the DATA object below. To add a command: add an
   entry to COMMANDS. Nothing else needs touching.
   ========================================================================== */

(function () {
  'use strict';

  var trigger = document.querySelector('.console-trigger');
  var overlay = document.querySelector('.console');
  if (!trigger || !overlay) return;

  var output = overlay.querySelector('.console__output');
  var form   = overlay.querySelector('.console__form');
  var input  = overlay.querySelector('.console__input');

  /* ---- Content. Edit freely. --------------------------------------------
     Keep it true and keep it in sync with the rest of the site. */
  var DATA = {
    about: [
      'Ibrahim Mustafa Opu — self-taught programmer in Toronto,',
      'on a gap year before starting a computer science degree.',
      '',
      'I understand things by building them. I got curious about',
      'how Python runs, so I wrote my own language to find out.'
    ],

    projects: [
      ['Whisper',      'a programming language on PyPI — lexer, parser, interpreter'],
      ['Grocery Split','a real-time shared expense tracker, in daily use'],
      ['Online Diary', 'a private journalling app with authentication'],
      ['NLP Toolkit',  'a CLI running eight spaCy operations on any text']
    ],

    skills: [
      ['confident',    'HTML, CSS, JavaScript, Python, Git, responsive layout'],
      ['working with', 'Firebase, pytest, data structures & algorithms, C, C++, discrete math'],
      ['next up',      'React, TypeScript, SQL']
    ],

    education: [
      ['2022–…',   'Murari Chand College — Mathematics (did not complete; moved to Canada)'],
      ['2022',     'Higher Secondary Certificate — Sylhet Government College'],
      ['2025',     'CS50P — Harvard (certified)'],
      ['ongoing',  'CS50x — Harvard']
    ],

    contact: [
      ['email',    'ibrahimmustafa787898@gmail.com', 'mailto:ibrahimmustafa787898@gmail.com'],
      ['github',   'github.com/ibrahim787898m',      'https://github.com/ibrahim787898m'],
      ['linkedin', 'linkedin.com/in/mibrahimOpu',    'https://www.linkedin.com/in/mibrahimOpu/'],
      ['site',     'ibrahimmustafaopu.com',          'https://ibrahimmustafaopu.com']
    ],

    /* whoami picks one at random per session */
    whoami: [
      'a curious person with good taste in portfolios.',
      'someone who reads the source. respect.',
      'a visitor who found the console. most people never do.',
      'you — hello. thanks for poking around.',
      'clearly the kind of person who types `whoami` into things.',
      'a fellow terminal enjoyer, if I had to guess.'
    ]
  };

  var esc = function (s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  };

  /* ---- Printing helpers -------------------------------------------------- */
  function print(html, cls) {
    var el = document.createElement('div');
    el.className = 'console__line' + (cls ? ' ' + cls : '');
    el.innerHTML = html;
    output.appendChild(el);
    output.scrollTop = output.scrollHeight;
  }
  function blank() { print('&nbsp;'); }
  function block(lines) {
    var wrap = document.createElement('div');
    wrap.className = 'console__block';
    lines.forEach(function (l) {
      var el = document.createElement('div');
      el.className = 'console__line';
      el.innerHTML = l;
      wrap.appendChild(el);
    });
    output.appendChild(wrap);
    output.scrollTop = output.scrollHeight;
  }
  var pad = function (s, n) { s = String(s); while (s.length < n) s += ' '; return s; };

  /* ---- Commands ---------------------------------------------------------- */
  var COMMANDS = {
    help: function () {
      block([
        '<span class="muted">available commands</span>',
        '<span class="key">about</span>      who I am',
        '<span class="key">projects</span>   what I\u2019ve built',
        '<span class="key">skills</span>     what I can be asked about',
        '<span class="key">education</span>  where I studied',
        '<span class="key">whisper</span>    run a line of my language',
        '<span class="key">contact</span>    how to reach me',
        '<span class="key">whoami</span>     you tell me',
        '<span class="key">clear</span>      clear the screen',
        '<span class="muted">everything here is on the page too \u2014 this is just more fun.</span>'
      ]);
    },

    about: function () { block(DATA.about.map(esc)); },

    projects: function () {
      block(DATA.projects.map(function (p) {
        return '<span class="key">' + esc(pad(p[0], 14)) + '</span><span class="muted">' + esc(p[1]) + '</span>';
      }));
    },

    skills: function () {
      block(DATA.skills.map(function (s) {
        return '<span class="key">' + esc(pad(s[0], 14)) + '</span><span class="muted">' + esc(s[1]) + '</span>';
      }));
    },

    education: function () {
      block(DATA.education.map(function (e) {
        return '<span class="key">' + esc(pad(e[0], 10)) + '</span><span class="muted">' + esc(e[1]) + '</span>';
      }));
    },

    contact: function () {
      block(DATA.contact.map(function (c) {
        return '<span class="key">' + esc(pad(c[0], 10)) + '</span>' +
               '<a href="' + c[2] + '" target="_blank" rel="noopener">' + esc(c[1]) + '</a>';
      }));
    },

    whoami: function () {
      var line = DATA.whoami[Math.floor(Math.random() * DATA.whoami.length)];
      block(['<span class="muted">' + esc(line) + '</span>']);
    },

    whisper: function () {
      /* a real line of Whisper, "run" */
      print('<span class="muted">whisper "Thanks for stopping by."</span>');
      setTimeout(function () {
        block(['Thanks for stopping by.']);
      }, 260);
    },

    clear: function () { output.innerHTML = ''; },

    /* ---- easter eggs ---- */
    sudo: function () {
      block(['<span class="muted">nice try. you already have everything you need here.</span>']);
    },
    ls: function () {
      block(['<span class="muted">about  projects  skills  education  contact  \u2026 try `help`</span>']);
    },
    exit: function () { close(); },
    rm: function () {
      block(['<span class="muted">I worked hard on this. let\u2019s not.</span>']);
    },
    coffee: function () {
      block(['<span class="key">\u2615</span> <span class="muted">brewing\u2026 this is how the all-nighters happened.</span>']);
    }
  };

  /* aliases */
  COMMANDS.work = COMMANDS.projects;
  COMMANDS.me   = COMMANDS.about;
  COMMANDS['rm -rf'] = COMMANDS.rm;
  COMMANDS['rm -rf /'] = COMMANDS.rm;

  function run(raw) {
    var cmd = raw.trim();
    print('<span class="prompt">\u203a</span> <span class="cmd">' + esc(cmd) + '</span>');
    if (!cmd) return;

    var key = cmd.toLowerCase();
    if (COMMANDS[key]) { COMMANDS[key](); return; }

    /* tolerate a leading word, e.g. "show projects" */
    var first = key.split(/\s+/)[0];
    if (COMMANDS[first]) { COMMANDS[first](); return; }

    print('<span class="key">' + esc(cmd) + '</span>: command not found. type <span class="key">help</span>.', 'console__line--err');
  }

  /* ---- Open / close ------------------------------------------------------ */
  var greeted = false;
  function open() {
    overlay.classList.add('is-open');
    document.body.classList.add('console-open');
    if (!greeted) {
      block([
        '<span class="muted">ibrahim@portfolio</span> — type <span class="key">help</span> to begin.'
      ]);
      greeted = true;
    }
    setTimeout(function () { input.focus(); }, 40);
  }
  function close() {
    overlay.classList.remove('is-open');
    document.body.classList.remove('console-open');
    trigger.focus();
  }

  trigger.addEventListener('click', open);
  overlay.querySelector('.console__close').addEventListener('click', close);

  /* click the dim backdrop (not the window) to close */
  overlay.addEventListener('mousedown', function (e) {
    if (e.target === overlay) close();
  });

  /* Esc closes; "/" or "~" opens from anywhere */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) { close(); return; }
    if (overlay.classList.contains('is-open')) return;
    var typingElsewhere = /^(input|textarea)$/i.test(document.activeElement.tagName);
    if (!typingElsewhere && (e.key === '`' || e.key === '~')) { e.preventDefault(); open(); }
  });

  /* ---- Input + history --------------------------------------------------- */
  var history = [], hpos = -1;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var val = input.value;
    if (val.trim()) { history.push(val); hpos = history.length; }
    run(val);
    input.value = '';
  });

  input.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowUp') {
      if (hpos > 0) { hpos--; input.value = history[hpos]; }
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      if (hpos < history.length - 1) { hpos++; input.value = history[hpos]; }
      else { hpos = history.length; input.value = ''; }
      e.preventDefault();
    }
  });

})();
