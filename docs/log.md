# Change Log

## 2026-07-06 - Community service copy, yellow bullets, optional phone, submit on last question

**What Changed:**
- "What we fund" section gained a sentence about the quarterly community service expectation (book drive, block cleanup, blood donation day, food drive)
- "What we ask" list bullets are now all yellow (removed the alternating blue)
- Phone number is now optional (format still validated when provided); question copy notes it's optional
- Removed the "Ready to send?" review screen — the last question (grant amount) now carries the "Send application" submit button, and Enter on that question submits the form

**Why:**
- User feedback on the second review pass

**Files Modified:**
- `apply.html` - copy addition, phone step, review screen removed, submit button moved
- `css/style.css` - blue bullet override removed, review-list styles removed
- `js/apply.js` - review-step logic removed, Enter-submits on last question
- `docs/readme.md` - form description updated

---

## 2026-07-06 - Landing subhead rework + floating form with dot progress

**What Changed:**
- Removed the "Neighbors, together" corner note from the landing page
- Moved the subhead above the logo, changed it to "Build a community with the people around you." and set it in Fraunces light (weight 300, larger size); added the 300 weight to the landing page's Google Fonts request
- Application form no longer has a border/background box — it floats directly on the gradient, under an "Apply" heading styled like the other sections
- Replaced the top progress bar and "n of 6" counter with small square progress dots in the bottom left (yellow = answered, cream/enlarged = current), plus a visually-hidden live region announcing "Question n of 6" for screen readers

**Why:**
- User feedback on the first review pass

**Files Modified:**
- `index.html` - corner note removed, subhead moved/restyled, font weight added
- `apply.html` - form section restructured (heading, form-stage wrapper, dots container)
- `css/style.css` - tagline restyle, form box/progress-bar styles removed, dot styles added
- `js/apply.js` - dot indicator logic replaces progress bar/counter

---

## 2026-07-06 - Landing page logo + about text, favicon, motif removal, simpler grant page

**What Changed:**
- Landing page now uses the hand-drawn `logo.avif` image as the heading instead of the "3 Block" text wordmark, and gained a short about section (mission + Brooklyn grant mention) between the tagline and the CTA
- Added `favicon.svg` (green square with a cream "3") and linked it from both pages
- Removed the three-square accent-block motif everywhere: landing brand, apply-page header, and the form's success screen (celebration animation and related CSS deleted)
- Grant page simplified: example groups are now plain prose instead of colored tag chips; hero meta separators are plain "·" characters instead of blue squares

**Why:**
- User feedback: wanted more context on the landing page, a green favicon, the real logo artwork, and found the block accents and tag chips didn't fit

**Files Modified:**
- `index.html` - logo image heading, about text, favicon link
- `apply.html` - favicon link, motif removal, prose examples, simpler hero meta
- `css/style.css` - removed motif/chip/meta-dot styles; added logo + about styles
- `favicon.svg` - new
- `docs/readme.md` - design system section updated

---

## 2026-07-06 - Initial build: landing page + Starter Grant application page

**What Changed:**
- Created the two-page static site: minimal landing page (`index.html`) and grant page (`apply.html`) with grant description, requirements, and an animated Typeform-style application form (one question per screen, Enter-to-advance, progress bar, shake-on-error validation, animated success screen)
- Created shared stylesheet with the design system: full-page soft green gradient, cream text, sun-yellow + sky-blue accents, Fraunces/Catamaran type, three-block motif (inspired by tiny-dinner.com)
- Created the form step engine with validation (email format, phone, $1–$250 amount) and submission to a Google Apps Script endpoint; runs in placeholder mode (local success + console warning) until the script URL is configured
- Created the Google Apps Script backend (`apps-script/Code.gs`) that appends applications to a Google Sheet, plus setup instructions in `docs/readme.md`

**Why:**
- 3 Block is launching a Starter Grant program (10 grants, up to $250, Brooklyn) and needs an MVP site to explain the program and collect applications

**Files Modified:**
- `index.html` - new
- `apply.html` - new
- `css/style.css` - new
- `js/apply.js` - new
- `apps-script/Code.gs` - new
- `docs/readme.md` - new
- `docs/plans/2026-07-06-grant-landing-page.md` - new (implementation plan)

---
