# Claude Instructions

## Project Overview



**Key Features:**
- 
- 

---

## Documentation

When new features, integrations, architecture decisions, or other noteworthy information comes up during work, document it in `docs/readme.md`. Keep it updated as a living reference for the project.

---

## Plans

All implementation plans must be saved to `docs/plans/`. Filenames must start with the date in `YYYY-MM-DD` format, followed by a descriptive name (e.g., `docs/plans/2026-03-27-auth-system.md`, `docs/plans/2026-03-27-cms-migration.md`). This ensures plans are versioned, reviewable, and accessible across sessions.

---

## Verification

**Visual/UI verification is the user's job — don't do it.** Do not start a
preview/dev server, drive a browser, or take screenshots to check how something
looks. The user runs their own dev server and verifies the UI themselves.
Functional/logic verification you *should* still do (type-check, lint, build,
and exercising behavior via `curl`/scripts against the running server is fine).
When a change is visually observable, finish your logic checks and hand it to
the user to look at rather than asking which browser to use.

---

## Apply form ↔ Apps Script sync

**CRITICAL:** The apply form and the Google Sheets backend are tightly coupled.
`js/apply.js` collects form fields by `name` and POSTs them; `apps-script/Code.gs`
maps those same field names into sheet columns via its `HEADERS` list and
`appendRow` call.

Whenever you change the apply form (`apply.html` / `js/apply.js`) — add, remove,
rename, or reorder any field — you MUST:

1. **Update `apps-script/Code.gs` to match** — adjust `HEADERS` and the
   `appendRow(...)` block so every form field still lands in the right column,
   in the right order.
2. **Flag it prominently** in your response to the user, calling out that
   `Code.gs` changed and must be **redeployed** (Apps Script →
   Deploy → Manage deployments → Edit → New version) for the change to take
   effect. Code edits alone do nothing until redeployed.
3. Note whether the existing "Applications" sheet tab needs to be renamed or
   deleted so the updated headers get regenerated.

Never change form fields without doing the corresponding `Code.gs` update in the
same change.

---

## Logging Requirements

**CRITICAL:** For every code change or feature addition:

1. **Write a log entry** describing what was changed and why
2. **Save to `docs/log.md`** in the following format:

### Log Entry Format

```markdown
## [YYYY-MM-DD] - [Brief Change Title]

**What Changed:**
- Specific file(s) modified or created
- Description of the change

**Why:**
- Reason for the change (feature request, bug fix, refactor, etc.)

**Files Modified:**
- `path/to/file.ext`
- `path/to/file.ext`

---
```

### Example

```markdown
## 2026-03-27 - Added Parent Name field to notification form

**What Changed:**
- Added "Parent Name" input field to the email notification modal
- Updated `submitNotify()` to collect and send parent name to Google Apps Script

**Why:**
- Parents want to be identified when registering interest, not just by email

**Files Modified:**
- `index.html` - Added input field and updated form submission logic

---
```

### When to Log

Log entries are needed for:
- ✅ New features
- ✅ Bug fixes
- ✅ File modifications
- ✅ New file creation
- ✅ Schema/structure changes (e.g., adding columns to Google Sheet)

Don't log:
- ❌ Reading files to understand context
- ❌ Running tests/verification
- ❌ Responding to questions without code changes



### Workflow

1. **Make the code change(s)**
2. **Write the log entry** in the format above
3. **Append to `docs/log.md`**
4. **Inform the user** of what was done in your response

---

### How to Update `docs/log.md`

```javascript
// Pseudocode - in practice, use Read → Edit/Write
const logEntry = `
## [YYYY-MM-DD] - [Title]

**What Changed:**
- ...

**Why:**
- ...

**Files Modified:**
- ...

---
`;

// Append to docs/log.md
```

Always preserve existing log entries. New entries go at the **top** (most recent first) for easy scanning.

---

## Current Project State

### File Inventory


### Active Features
