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
| `logo.avif` | Hand-drawn "3 BLOCK" wordmark (white on transparent), used as the landing heading |
| `favicon.svg` | Green square favicon with a cream "3", linked from both pages |
| `apply.html` | Grant description, requirements, and application form |
| `css/style.css` | All styles; design tokens as CSS custom properties in `:root` |
| `js/apply.js` | Form step engine, validation, submission |
| `apps-script/Code.gs` | Google Apps Script backend (paste into script.google.com) |

## Design system

- **Colors:** green gradient background (`#43ac5c` → `#0b7a3a` → `#086030`),
  cream text `#f7f3e7`, sun yellow `#ffd500` + sky blue `#2b5be2` accents,
  ink `#0a2416` for text on light chips/buttons.
- **Type:** Fraunces (900, soft optical axis) for wordmark/headings; Catamaran
  for body/UI. Loaded from Google Fonts.
- **Signature:** the hand-drawn `logo.avif` wordmark on the landing page.
  (An earlier three-square "block motif" was removed by request.)
- Square corners everywhere; CTAs are underlined text links (per the
  tiny-dinner.com inspiration). Group/service examples are written as plain
  prose, not tag chips.

## Application form

One question per screen, vanilla JS (`js/apply.js`):

- Enter advances (⌘/Ctrl+Enter in the textarea); ↑/↓ buttons navigate back and
  forward; invalid answers shake with an inline error and block advancing.
- Progress shown as small square dots bottom-left (yellow = answered, cream =
  current); a hidden live region announces "Question n of 6" to screen readers.
- The form floats directly on the page under an "Apply" section heading — no
  bordered box.
- Fields: name, email, phone (optional), Brooklyn neighborhood, group
  description, grant amount ($1–$250). No separate review screen — the last
  question carries the "Send application" submit button.
- `prefers-reduced-motion` collapses all animation.
- **Placeholder mode:** until a real Apps Script URL is set, submitting shows
  the success screen locally and logs a console warning — nothing is sent.

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

## Content facts (for future edits)

- 10 grants, up to $250 each; Brooklyn only; rolling review until all are
  awarded (no deadline shown).
- Requirements: ongoing interest group, meets at least monthly, community
  service activity every quarter (4×/year).
- Contact address used throughout: `hello@3block.org` (placeholder — update if
  the real address differs).
