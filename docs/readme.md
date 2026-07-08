# 3 Block — MVP Landing Page

Two-page static site for 3 Block's Starter Grant program: a minimal landing
page and a grant page with an animated, Typeform-style application form that
submits to a Google Sheet.

## Architecture

Plain HTML/CSS/JS — no build step, no dependencies. Deployable by dragging the
folder to Netlify/Vercel/GitHub Pages or any static host.

| File | Purpose |
| --- | --- |
| `index.html` | Landing page (Tiny Dinner-inspired: gradient, logo, about, one CTA) |
| `logo.svg` | "3 BLOCK" wordmark (white, single line), used as the landing heading (`logo.avif` is the older stacked version, kept but unused) |
| `favicon.svg` | Green square favicon with a "3" glyph, linked from both pages |
| `og-image.png` | 1200×630 social share image (logo on the green gradient), referenced by OG/Twitter meta tags on both pages |
| `apply.html` | Grant description, requirements, and application form |
| `css/style.css` | All styles; design tokens as CSS custom properties in `:root` |
| `js/apply.js` | Form step engine, validation, submission |
| `apps-script/Code.gs` | Google Apps Script backend (paste into script.google.com) |

## Design system

- **Colors:** green gradient background (`#509b10` → `#2c5e00`),
  cream text `#f7f3e7`, sun yellow `#ffd500` + sky blue `#2b5be2` accents,
  ink `#0a2416` for text on light chips/buttons.
- **Type:** Fraunces (900, soft optical axis) for wordmark/headings; Catamaran
  for body/UI. Loaded from Google Fonts.
- **Signature:** the `logo.svg` wordmark on the landing page.
  (An earlier three-square "block motif" was removed by request.)
- Square corners everywhere; CTAs are underlined text links (per the
  tiny-dinner.com inspiration). Group/service examples are written as plain
  prose, not tag chips.

## Application form

All questions shown at once (standard stacked form), vanilla JS (`js/apply.js`):

- Validates on submit; invalid fields get an inline error, the page scrolls to
  the first one, and errors clear as you edit. Radio questions ("running or
  starting", "co-organizer") render as selectable pill buttons.
- Fields (name attribute → sheet column): `name`*, `email`*, `neighborhood`*,
  `group`* (kind of group), `status`* (radio: Already running it / Want to
  start one), `coorganizer`* (radio: Yes / Not yet), `cadence`* (how often),
  `service` (community service ideas), `first_gathering`*, `microgrant`
  ($50–250 interest, free text), `notes` (anything else). * = required.
- **Placeholder mode:** until a real Apps Script URL is set, submitting shows
  the success message locally and logs a console warning — nothing is sent.

## Google Sheet backend — setup (~5 minutes)

1. Create a new Google Sheet (e.g. "3 Block grant applications").
2. In the Sheet: **Extensions → Apps Script**.
3. Delete the default code and paste the contents of `apps-script/Code.gs`.
   Save.
4. Click **Deploy → New deployment**. Choose type **Web app**:
   - Description: `grant form`
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy**, authorize when prompted, and copy the **Web app URL**
   (ends in `/exec`).
6. In `js/apply.js`, replace `PASTE_YOUR_APPS_SCRIPT_URL_HERE` with that URL.
7. Test: submit the form once; a row should appear in the "Applications" tab
   (created automatically, with headers).

To change what's stored, edit `HEADERS` and the `appendRow` call in `Code.gs`,
then **Deploy → Manage deployments → Edit → New version**.

**Note (2026-07-07):** the form questions changed (phone and numeric amount
removed; neighborhood, kind of group, running/starting, co-organizer, cadence,
service ideas, first gathering, microgrant, notes added). If you deployed the
script before this date, paste the updated `Code.gs` and redeploy a new
version; delete the old "Applications" sheet tab (or rename it) so the new
headers are created.

## Content facts (for future edits)

- 10 grants, up to $250 each; Brooklyn only; rolling review until all are
  awarded (no deadline shown).
- Requirements: ongoing interest group, meets at least monthly, community
  service activity every quarter (4×/year).
- Contact address used throughout: `peter@portfolio.sc`.
- Positioning (2026-07-07): 3Block is a community platform for hyperlocal
  neighborhood groups; launching in Brooklyn, picking up to 10 organizers;
  microgrants of $50–250 (more available for groups that stay active).
