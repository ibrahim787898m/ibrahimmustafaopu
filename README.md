# Portfolio — Ibrahim Mustafa Opu

Personal site. Plain HTML, CSS and JavaScript. No build step, no dependencies.

Live: https://ibrahimmustafaopu.com

---

## Structure

```
.
├── index.html              Home page
├── archive.html            Older work, coursework, previous portfolios
├── README.md               This file
├── .gitignore
└── assets/
    ├── css/
    │   ├── tokens.css      Colours, typefaces, spacing. Change values here.
    │   ├── base.css        Reset, typography primitives, reduced-motion
    │   ├── layout.css      Container, header, section rhythm, footer
    │   ├── components.css  Hero, project cards, skill tiers, now list
    │   └── effects.css     Preloader, cursor, magnetic links (optional)
    ├── js/
    │   ├── hero.js         Types the source line, then reveals the headline
    │   ├── reveal.js       Reveals elements on scroll
    │   ├── nav.js          Header state, progress bar, active nav link
    │   ├── preloader.js    The "compile" loading sequence
    │   ├── cursor.js       Custom cursor + ambient glow
    │   └── magnetic.js     Links that drift toward the pointer
    └── img/
        └── favicon.svg
```

CSS is loaded in the order listed above; later files override earlier ones.
Each JS file is independent — deleting one won't break the others.

---

## Running it locally

Open `index.html` in a browser. That's it — no server needed.

If you'd prefer a local server (useful for testing links and caching):

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

---

## Common edits

**Change a colour or typeface** → `assets/css/tokens.css`. Every value is used
by name elsewhere, so changing it once updates the whole site.

**Add a project** → in `index.html`, find the `WORK` section. Copy one
`<article class="project">` block, paste it in the order you want, edit the
text, and set both links at the bottom.

Each card carries two links: **Code** (the repository) and **Live** (the
deployed site). Code comes first on purpose — for a programmer's portfolio the
repo is the more informative destination. If a project has no live version,
use the `project__link--none` span instead of pointing a link at `#`; a dead
link reads worse than an honest "No live demo".

**Change the hero line** → the text is in `assets/js/hero.js` at the top, in
the `SOURCE` array. The `<h1>` in `index.html` must say the same thing.

**Move a skill between tiers** → in `index.html`, `SKILLS` section. Move the
`<span>` from one `tier__items` list to another.

**Add an archive item** → in `archive.html`, copy one `<div class="archive-item">`
block and edit the year, name, description and links. Archive entries are
deliberately plainer than homepage project cards — keeping them quiet is what
protects the three projects on the front page.

**Update the Now section** → `index.html`, `NOW` section. This is the part
that goes stale fastest. Check it every few months.

**Change the preloader wording** → the stage names are `<li>` items in
`index.html`. The timing constants are at the top of `assets/js/preloader.js`.

**Turn off all the effects** → delete the `effects.css` link and the last three
`<script>` tags in `index.html`. Nothing breaks; the site just gets calmer.

---

## Deploying

The site is static, so anything that serves files will work.

**GitHub Pages** — push to GitHub, then Settings → Pages → deploy from
`main` branch, root folder.

**Netlify / Vercel / Cloudflare Pages** — connect the repo. No build command,
publish directory is the repo root.

Then point the custom domain at it in the host's DNS settings.

---

## Notes on the design

Three typefaces, each with one job: Newsreader for headings, IBM Plex Sans for
body copy, IBM Plex Mono for labels and tags. One accent colour (gold).
Adding a second accent will break the look.

Projects are written directly in the HTML rather than loaded from a JSON file.
That's deliberate — it keeps the content in the page source for search engines,
means the site works with JavaScript disabled, and avoids needing a local
server to preview. With four projects, a data file would cost more than it saves.
If the list grows past a dozen, revisit that.

---

## Effects

Five, deliberately:

1. **Preloader** — a short compile sequence (reading source → parsing →
   evaluating), once per browser session.
2. **Custom cursor** — gold dot plus a lagging ring that expands over links.
   Desktop pointing devices only.
3. **Line-mask reveals** — headings slide up from behind a mask.
4. **Magnetic links** — the socials and the footer email drift toward the cursor.
5. **Ambient glow** — the warm light at the top of the page follows the pointer.

All five are switched off automatically when the OS reports
`prefers-reduced-motion`, and the cursor and magnetic effects never run on
touch devices. Headings stay visible with JavaScript disabled.

Deliberately not included: smooth-scroll hijacking. It fights the user's
trackpad, breaks find-in-page and keyboard scrolling, and is the single most
common reason a heavily-animated site feels worse than a plain one.

---

## Quality checklist before deploying changes

- [ ] Every project `href` points somewhere real
- [ ] Works down to 360px wide
- [ ] Tab through the page — focus is always visible
- [ ] Nothing on the page is a claim you can't back up in an interview
- [ ] Reload twice — the preloader should only appear the first time
- [ ] Turn on "reduce motion" in OS settings; the page should be static and fine
