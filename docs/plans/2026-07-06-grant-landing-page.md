# 3 Block — Grant Landing Page + Application Page

## Context

3 Block helps neighbors form resilient hyperlocal community groups. To seed the first groups, it's awarding **10 starter grants of up to $250** to Brooklyn-based organizers. This MVP needs two things: a landing page that establishes the brand, and a grant page that explains the offer, states requirements, and collects applications.

Decisions confirmed with the user:
- **Stack:** Plain HTML/CSS/JS, no build step (two static pages, deployable anywhere)
- **Landing:** Ultra-minimal, in the style of tiny-dinner.com (full-bleed solid color, centered wordmark, tagline, single underlined CTA)
- **Form backend:** Google Sheet via Google Apps Script (I write the script + setup instructions; user pastes in the deployed script URL)
- **Deadline:** none — rolling review until all 10 grants are awarded

## Visual direction (from tiny-dinner.com analysis)

Tiny Dinner is: vivid full-bleed yellow (#FFE501), chunky retro serif wordmark, red 2×3 dot-grid motif, tiny sans tagline, a single understated underlined text link as CTA. Confident, playful, almost empty.

Translation for 3 Block:
- **Main color:** green, as a **full-page soft green gradient** background (e.g. a gentle radial/diagonal blend from a lighter fresh green `#3FAE5A` into a deeper grass green `#0B8A3E`) — used on BOTH pages so the whole experience sits on green
- **Accents:** warm yellow (`#FFDD00`-ish) and blue (`#2B5CE6`-ish), used in the block motif, link underlines/hovers, and section highlights on the apply page
- **Block motif:** a row/grid of 3 solid squares (yellow, blue, cream) next to the wordmark — "3 blocks" echoing Tiny Dinner's six dots
- **Type:** Google Fonts — **Fraunces** (black weight, soft/chunky retro serif) for the wordmark and headings; **Catamaran** (the actual Tiny Dinner body font) for body/UI text
- **CTA style:** plain underlined text links, no button chrome; square corners everywhere (border-radius: 0), matching the inspiration

## Files to create

```
index.html                  Landing page
apply.html                  Grant description + requirements + application form
css/style.css               Shared styles (design tokens as CSS custom properties)
js/apply.js                 Typeform-style step engine, validation, submission to Apps Script
apps-script/Code.gs         Google Apps Script to paste into script.google.com
docs/readme.md              Project docs incl. Apps Script setup walkthrough
docs/log.md                 Log entry (required by CLAUDE.md)
docs/plans/2026-07-06-grant-landing-page.md   Copy of this plan (required by CLAUDE.md)
```

## Page 1: `index.html` (landing)

Single viewport, no scroll. Full-page soft green gradient background.
- Top-right corner (small text, like Tiny Dinner's "Inspire people to host"): "Neighbors, together" or similar micro-line
- Centered: block motif (3 squares) + **"3 Block"** wordmark in Fraunces black, cream/near-black on green
- Tagline beneath, small: *"community groups with the neighbors around you"*
- Single underlined CTA below: **"Apply for a starter grant"** → `apply.html`
- Footer-less; maybe a tiny contact mailto in a corner

## Page 2: `apply.html` (grant page)

Same full-page soft green gradient; content sits directly on it in cream/near-white text, with cream "cards" only where long text needs contrast. Sections:

1. **Hero** — wordmark (links home), heading "Starter Grants", one-liner: 10 grants · up to $250 · Brooklyn
2. **The idea** — short paragraphs from the About/Mission copy: 3 Block helps neighbors with shared interests form resilient community groups that meet regularly and serve their neighborhood
3. **What we fund** — example groups as playful "block" chips: book club, run club, knitting club, repair club, coffee on the stoop… "any interest you can imagine"
4. **Requirements** — checklist:
   - Brooklyn-based
   - Start an ongoing group around a shared interest
   - Meet regularly — at least monthly
   - Do a community/social service activity every quarter (4×/year) — e.g. book drive, block cleanup, blood donation, food drive
5. **How it works** — apply → rolling review until all 10 grants awarded → get funded up to $250 → start your group
6. **Application form — Typeform-style, animated** (see next section)
7. **Footer** — 3 Block wordmark, contact link

## Typeform-style application form

One question at a time, animated, keyboard-friendly — built in vanilla JS (no library):

- **Flow:** a "Start application →" intro card, then 6 steps, one field per screen:
  1. Name (text)
  2. Email (email, format-validated)
  3. Phone (tel)
  4. Brooklyn neighborhood (text)
  5. Describe your group idea (textarea — interest, cadence, community activity)
  6. How much do you need to get started? ($1–$250, styled number input with a `$` prefix; helper text "up to $250")
  then a review-ish final screen with a **Submit** button
- **Interaction model (like Typeform):**
  - Each step slides/fades in (CSS transforms + opacity transitions, ~350ms ease); answered step slides up and out
  - **Enter** advances (Shift+Enter for newline in the textarea, with an "⌘/Ctrl+Enter to continue" hint), an **OK →** button too
  - Up/down arrows or ↑/↓ buttons to go back/forward through answered steps
  - **Progress bar** (thin yellow bar at top of the form) + "3 of 6" counter
  - Question numbers rendered in accent blue; inputs are borderless with a bottom border that thickens/brightens (yellow) on focus — classic Typeform look
  - Inline validation on advance: shake animation + error message if the field is empty/invalid; can't advance until valid
  - `prefers-reduced-motion` respected (transitions collapse to instant)
- **Submission:** final screen shows a loading state on Submit, then an animated success screen (blocks motif animates in + "We got it — we review on a rolling basis and will be in touch"), or a failure state with a contact email fallback
- The form section lives at `apply.html#apply`; the page's "Apply" CTAs scroll to it

## Form backend: Google Apps Script

- `js/apply.js` holds a `SCRIPT_URL` constant (placeholder until user deploys) and POSTs the form as `application/x-www-form-urlencoded` with `fetch` (avoids CORS preflight issues with Apps Script)
- `apps-script/Code.gs`: `doPost(e)` appends `[timestamp, name, email, phone, location, description, grantAmount]` to a sheet, returns JSON
- If `SCRIPT_URL` is still the placeholder, the form shows the success state locally and logs a console warning (so the page demos fine before setup)
- `docs/readme.md` gets a step-by-step: create Sheet → Extensions → Apps Script → paste Code.gs → Deploy as web app (execute as me, access: anyone) → copy URL into `js/apply.js`

## Per CLAUDE.md housekeeping

- Append log entry (top of `docs/log.md`, format per CLAUDE.md)
- Document architecture + Apps Script setup in `docs/readme.md`
- Save this plan to `docs/plans/2026-07-06-grant-landing-page.md`

## Verification

Per CLAUDE.md, visual/UI verification is the user's job — no dev server, browser, or screenshots from me. I will:
- Validate the HTML structure (e.g. quick parse/lint check via `tidy` or node if available; otherwise careful review)
- Exercise the form-validation and step-navigation logic by reviewing edge cases (empty fields, bad email, amount > 250, Enter vs Shift+Enter in textarea, going back and editing an answer)
- Hand off to the user to open `index.html` in their browser and click through landing → apply → submit (placeholder mode shows success without a backend)
