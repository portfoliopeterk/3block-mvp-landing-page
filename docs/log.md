# Change Log

## 2026-07-21 - Evened out header vertical rhythm to 2rem gaps

**What Changed:**
- `.landing-center` gap dropped from `2.5rem` to `2rem`
- `.brand` gap raised from `1.5rem` to `2rem`
- `.wordmark-logo` margin zeroed out (was `1.75rem 0`)

**Why:**
- Previously the logo margin was adding to both the tagline-to-logo and
  logo-to-paragraph gaps, making them (3.25rem / 4.25rem) noticeably
  larger than the ~2rem gap between the paragraph and the tabs. Now all
  three inter-element gaps in the header sit at 2rem for a consistent
  rhythm

**Files Modified:**
- `css/style.css`

---

## 2026-07-21 - Tightened space between the landing header and the tabs

**What Changed:**
- `.landing-center` bottom padding trimmed from `4rem` to `1.5rem`
- `.apply-main` top padding reduced from `3rem` to `0.5rem`
- `.tab-nav` top padding removed (was `1rem`)

**Why:**
- User wanted less vertical space above the About/Apply tabs

**Files Modified:**
- `css/style.css`

---

## 2026-07-21 - Shrunk landing tagline so it fits on one line

**What Changed:**
- Dropped `.tagline` font-size from `clamp(1.25rem, 3vw, 1.75rem)` to
  `clamp(1rem, 2.2vw, 1.35rem)` and removed the `max-width: 26ch` cap so
  the "Build a community with the people around you." headline sits on a
  single line at typical viewport widths

**Why:**
- The 26ch max-width was forcing the tagline to wrap; user wanted it as a
  single, smaller line above the logo

**Files Modified:**
- `css/style.css` - `.tagline` size and width tweak

---

## 2026-07-21 - Added "Apply now" CTA button at the end of the About tab

**What Changed:**
- Added a button-styled `Apply now` link at the bottom of the About tab's
  explanatory text (inside `#hero-more`), directly after the "picking 10
  organizers" paragraph
- Wired up a document-level click handler for any `[data-tab-jump]` element
  so the CTA switches the visible tab to Apply, updates the URL hash, and
  scrolls to the top — reusing the existing `activateTab` logic
- Extended `.btn-primary` styling to work as an anchor (`a.btn-primary` /
  `.btn-link`: `display: inline-block`, no underline, keeps ink color on
  hover) and added a `.section-cta` spacer

**Why:**
- Users reaching the end of the About copy had no clear affordance to move
  on to the application form other than clicking the small "Apply" tab at
  the top of the page

**Files Modified:**
- `index.html` - Added the CTA anchor inside the read-more block
- `js/apply.js` - Added the `[data-tab-jump]` document click handler
- `css/style.css` - Anchor variant of `.btn-primary` + `.section-cta` spacing

---

## 2026-07-16 - Matched intro paragraph width to the logo and left-aligned it

**What Changed:**
- `.landing-about` now uses the same width formula as the wordmark logo
  (`clamp(18rem, 70vw, 36rem)`, was `max-width: 32rem`) so their edges line
  up at every viewport size, and its text is left-aligned instead of
  inheriting the header's centering

**Why:**
- The intro paragraph was narrower than the logo above it and center-aligned,
  which looked uneven in the compacted header

**Files Modified:**
- `css/style.css`

---

## 2026-07-16 - Made About the first and default tab

**What Changed:**
- Reordered the `index.html` tab nav so About comes before Apply
- About panel now visible on load; Apply panel starts `hidden`
- Default-tab logic in `js/apply.js` flipped: `#apply` deep-links to the
  Apply tab, everything else opens About

**Why:**
- Visitors should read what 3Block is before hitting the application form

**Files Modified:**
- `index.html`
- `js/apply.js`

---

## 2026-07-16 - Inlined the "Read more" toggle into the intro paragraph

**What Changed:**
- On `index.html`, moved the "Read more" toggle button from its own
  paragraph below the expander into the end of the "3Block is a community
  platform…" intro paragraph, so it flows with the text
- `.read-more-toggle` CSS: removed the `margin-top` and made font family /
  size inherit from the surrounding paragraph; removed the now-unneeded
  `margin-top` on `.read-more`

**Why:**
- Makes the landing header more compact — the toggle no longer takes its own
  line

**Files Modified:**
- `index.html`
- `css/style.css`

---

## 2026-07-16 - Split index.html main column into Apply / About tabs

**What Changed:**
- Added a `.tab-nav` with two links (Apply, About) at the top of
  `.apply-main` on `index.html`, sitting just above the first section ruler
  (below the landing header)
- The "What's a 3Block group?" section became the About panel (`id="about"`,
  hidden by default); the existing form section (`id="apply"`) is the Apply
  panel and shows by default
- Tab links have inactive (60% cream), hover (full cream), and active
  (full cream + sun underline) states in `css/style.css`
- Toggle logic in `js/apply.js`: clicking a tab shows its panel, marks the
  link `aria-current`, and syncs the URL hash via `history.replaceState`;
  loading the page with `#about` opens the About tab, anything else defaults
  to Apply

**Why:**
- Puts the application form front and center while keeping the explainer
  content one click away, and makes both states deep-linkable

**Files Modified:**
- `index.html`
- `css/style.css`
- `js/apply.js`

---

## 2026-07-16 - Moved index.html intro paragraphs into a "Read more" expander

**What Changed:**
- On `index.html`, moved the three paragraphs ("We believe real neighborhood
  ties…", "We're launching in Brooklyn…", "We're picking 10 organizers…")
  from their own standalone section into a collapsible `.read-more` block
  inside `.landing-about`, directly under the "3Block is a community
  platform…" blurb; the old section was removed
- Added a "Read more" toggle button (styled as an underlined link) that
  expands the block and switches to "Show less" to collapse it, with
  `aria-expanded` / `aria-controls` wiring
- Toggle logic added at the top of `js/apply.js` (loaded by both pages);
  `.read-more` and `.read-more-toggle` styles added to `css/style.css`
- Also synced the textarea single-line change into `index.html`
  (`rows="3"` → `rows="1"` on service/microgrant/notes) — index.html carries
  a full copy of the application form
- This was first applied to `apply.html` by mistake and then reverted there;
  apply.html keeps its original hero + standalone paragraph section

**Why:**
- Shortens the landing page above the fold so visitors reach "What's a
  3Block group?" and the application form sooner, while keeping the mission
  copy one click away

**Files Modified:**
- `index.html`
- `css/style.css`
- `js/apply.js`

---

## 2026-07-16 - Form textareas start as a single line and auto-grow

**What Changed:**
- Changed the three form textareas (service, microgrant, notes) from
  `rows="3"` to `rows="1"` in `apply.html`
- `.field-textarea` CSS: removed the `5.5rem` min-height and the manual
  vertical resize handle; hidden overflow so the height is driven by content
- Added an `autogrow()` helper in `js/apply.js` that sets the textarea height
  to its scroll height (plus border), run once on load and on every input
- Hardened `autogrow()`: it forces `rows = 1` itself (so cached rows="3"
  markup can't set a taller floor) and only writes an inline height once the
  content actually needs a second line — an empty field has no inline height

**Why:**
- Multiline fields looked heavy as fixed three-row boxes; they now match the
  single-line inputs visually and expand smoothly as the user types

**Files Modified:**
- `apply.html`
- `css/style.css`
- `js/apply.js`

---

## 2026-07-16 - Unified apply page main column to a single 640px width

**What Changed:**
- Set `.apply-main` width to `min(640px, 100% - 3rem)` (was `min(42rem, 100% - 3rem)`)
- Removed the inner `max-width` caps that made content blocks narrower than the
  column: `.hero-lede` (38rem), `.section p` (36rem), `.req-list` (36rem),
  `.stacked-form` (36rem), `.form-result` (36rem) — all now fill the column

**Why:**
- The main column and its content blocks used several different widths
  (672px / 608px / 576px), so section edges didn't line up. Everything now
  aligns to one 640px column.

**Files Modified:**
- `css/style.css`

---

## 2026-07-09 - Fixed CORS error on apply form submission

**What Changed:**
- Changed the `fetch` in `js/apply.js` to use `mode: "no-cors"` and treat a
  resolved request as success (previously read `res.ok`, which is unreadable
  cross-origin)

**Why:**
- Google Apps Script's ContentService responses include no
  `Access-Control-Allow-Origin` header, so a normal cross-origin fetch from
  `apply.3block.org` threw a CORS error and the form fell into its failure
  state even though the row was written. `no-cors` lets the (simple,
  form-urlencoded) request through; the response is opaque, so success is now
  inferred from the request resolving.

**Files Modified:**
- `js/apply.js`

---

## 2026-07-07 - Gradient colors updated

**What Changed:**
- Background gradient now blends #509B10 (fresh) into #2C5E00 (deep) — replacing the old three-stop #43ac5c/#0b7a3a/#086030 gradient on both pages
- `og-image.png` regenerated to match

**Why:**
- User provided the final brand greens

**Files Modified:**
- `css/style.css` - `--green-fresh`/`--green-deep` values, gradient stops
- `og-image.png` - regenerated

---

## 2026-07-07 - OG/share image + social meta tags

**What Changed:**
- Created `og-image.png` (1200×630): the logo.svg wordmark centered on the landing page's green gradient (rendered from an SVG source via rsvg-convert)
- Added Open Graph + Twitter card meta tags to both pages (og:title/description/url/image with absolute Pages URLs, summary_large_image card)

**Why:**
- Links shared on social/messaging apps now show a branded preview card

**Files Modified:**
- `og-image.png` - new
- `index.html` - OG/Twitter meta tags
- `apply.html` - OG/Twitter meta tags

---

## 2026-07-07 - Apply page header and footer use logo.svg

**What Changed:**
- The "3 Block" text wordmarks in the apply page header (top left, links home) and footer were replaced with `logo.svg` (8.5rem wide)

**Why:**
- Use the real logo artwork consistently across pages

**Files Modified:**
- `apply.html` - header and footer img
- `css/style.css` - `.home-logo`/`.footer-logo` styles, text wordmark styles removed

---

## 2026-07-07 - Apply page content rewrite + real contact email

**What Changed:**
- Replaced everything above the form on the apply page with new copy: platform intro as the hero ("3Block is a community platform…"), a "What's a 3Block group?" section (built on something real / meet regularly / give back, plus organizer support and microgrant notes), and a closing section on why neighborhood ties matter and the Brooklyn launch
- Old hero ("Starter Grants", 10 grants · up to $250), "The idea", "What we fund", "What we ask", and "How it works" sections removed; unused CSS (hero-title, hero-meta, steps-list) cleaned up
- Swapped the placeholder `hello@3block.org` for the real contact `peter@portfolio.sc` on both pages (footer, failure message, landing corner link)
- Updated the apply page title ("Apply — 3Block") and meta description to match the new positioning

**Why:**
- User provided final page copy and a real contact address

**Files Modified:**
- `apply.html` - content sections replaced, title/meta updated, email swapped
- `index.html` - email swapped
- `css/style.css` - hero restyle (lede in Fraunces light), stale styles removed, section link styling
- `docs/readme.md` - content facts updated

---

## 2026-07-07 - Form rework: all fields at once, new questions

**What Changed:**
- Replaced the Typeform-style one-question-per-screen form with a standard stacked form showing all fields at once; the step engine, progress dots, and navigation arrows were removed
- New question set: name*, email*, neighborhood (cross streets ok)*, kind of group*, already running vs. want to start* (radio), co-organizer* (radio: Yes / Not yet), meeting cadence*, community service ideas, first gathering timing*, microgrant interest ($50–250, free text), anything else
- Old questions removed (phone, Brooklyn-specific location wording, group description, numeric grant amount)
- Radios styled as selectable pill buttons; validation runs on submit with inline errors and scroll-to-first-invalid; success/failure messages replace the form after submission
- Google Apps Script updated to the new columns (requires redeploying the script and a fresh "Applications" tab for anyone who deployed the old version)

**Why:**
- User feedback: single-page form is simpler, and the questions were refined to better screen organizers

**Files Modified:**
- `apply.html` - form section rewritten
- `js/apply.js` - rewritten (validation + submission, no step engine)
- `css/style.css` - step-engine styles removed, stacked form + choice styles added
- `apps-script/Code.gs` - new field names and sheet headers
- `docs/readme.md` - form and backend docs updated

---

## 2026-07-07 - Logo spacing + new favicon artwork

**What Changed:**
- Added vertical breathing room around the landing logo (1.75rem above and below)
- `favicon.svg` replaced with the real "3" glyph artwork (updated by user)

**Why:**
- User feedback: logo felt too tight against the tagline and about text

**Files Modified:**
- `css/style.css` - `.wordmark-logo` margin
- `favicon.svg` - new artwork

---

## 2026-07-07 - Landing logo swapped to logo.svg

**What Changed:**
- Landing page heading now uses `logo.svg` (wide single-line wordmark, 898×173) instead of `logo.avif` (stacked); image sizing widened to suit the new proportions (`clamp(18rem, 70vw, 36rem)`)
- `logo.avif` kept in the repo but no longer referenced

**Why:**
- User provided a new SVG version of the logo

**Files Modified:**
- `index.html` - img src/dimensions
- `css/style.css` - logo width clamp
- `logo.svg` - new (added by user)
- `docs/readme.md` - file inventory updated

---

## 2026-07-06 - Published to GitHub Pages

**What Changed:**
- Fixed a typo in the landing about text ("metups" → "meetups")
- Initialized git, pushed to https://github.com/smombartz/3block-mvp-landing-page, and enabled GitHub Pages from the main branch root
- Live site: https://smombartz.github.io/3block-mvp-landing-page/

**Why:**
- Publish the MVP so it can be shared

**Files Modified:**
- `index.html` - typo fix
- `.gitignore` - new (ignores .DS_Store)

---

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
