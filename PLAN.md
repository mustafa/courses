# Interactive Course Framework — Plan

Goal: a reusable, self-contained interactive layer that any course HTML can opt into with two `<link>`/`<script>` tags. Enhances, never replaces. Namespaced `cf-`, per-feature `try/catch`, graceful degradation.

## Design principles
- **Namespace isolation**: every class/id/localStorage key is `cf-` / `cf:`-prefixed.
- **Auto-theme**: framework CSS references each course's own vars (`var(--accent, …)`, `var(--bg-card, …)`) with fallbacks, so it visually matches each course.
- **No layout hijack**: framework chrome lives in a fixed bottom-right dock (courses have sticky top navs + their own top progress bars → avoid the top). Top completion bar only added if the course has none.
- **Safe selectors**: quizzes = `.quiz[data-question]`, flashcards = `.flashcards > .flashcard[data-front]`, reveals = `details.reveal`. No existing course uses these, verified.
- **Modules** detected via `.module` token (26 courses have it), nested ones filtered out.

## Files
- [x] `public/course-framework.css` — styling (target <5KB)
- [x] `public/course-framework.js` — all 10 features (target <15KB min)
- [x] `scripts/add-framework.js` — retrofit injector (skips index.html, sw.js, manifest.json, already-injected)
- [x] Quiz/flashcard demo content → genai-state-of-art-2026, pe-playbook-tech-course, loop-engineering-course
- [x] `public/sw.js` — cache the 2 new files + bump cache version
- [ ] Test (Playwright, mobile viewport, offline) → then commit + push (confirm with Mustafa first)

## Features
1. Quizzes `.quiz[data-question][data-options][data-answer][data-explanation]` — click select, instant feedback, explanation, score chip.
2. Flashcards `.flashcards` w/ `.flashcard[data-front][data-back]` — flip, prev/next, swipe, counter.
3. Reveal `details.reveal` — styled, fade-in animation, default "Think about it…" summary.
4. Progress — per-module complete toggle + %, localStorage, dock ring, top bar (guarded), resume, 100% celebration.
5. Reading time — per `.module`, ~200 wpm, badge in module header.
6. Code copy + lightweight safe syntax highlight (plain-text blocks only, guarded).
7. Bookmarks — star on each h2/h3, localStorage, "My Bookmarks" panel.
8. Dark/Light toggle — remaps common course CSS vars for light mode, persisted.
9. Search — overlay, highlight all matches, jump next/prev, `/` to open.
10. Animations — CSS transitions on quiz/reveal/dock/panels/progress + hover states.

---

# Index Tools — Sort, Search & Filter

Goal: sort the landing page by added/updated date, plus search, category filtering, and reading length. All inside `public/index.html` — no new runtime files, no `sw.js` change, no build step.

## Design principles
- **Cards stay in the HTML.** Metadata is stamped onto the existing 42 `<a class="card">` tags, not client-rendered from a manifest. JS-off visitors get exactly today's page; there's no second source of truth to drift.
- **Bake only what the browser can't derive.** The script writes dates, word count, and the video flag. Title, description, type, and category are read from the DOM at runtime, so editing a card's copy never needs a rerun.
- **Churn threshold, not `git log -1`.** Commit `7b6d63b` touched all 42 courses, so a naive last-modified ties 30 of them on 2026-07-15. Walking `--numstat` newest-first and requiring >10 changed lines separates real edits (12+ lines) from the 2-line codemod — while still crediting the 3 courses that genuinely gained quizzes in that commit (173–211 lines).
- **Never cheerio-write `index.html`.** It decodes 60+ hand-typed entities (`&rarr;`, `&#9654;`, `&mdash;`). Cheerio reads course files; the index is rewritten by regex splice, so the diff is exactly one line per card.

## Files
- [x] `scripts/sync-index-data.js` — git dates + word counts → `data-*` on each card; `--dry`, `--check`
- [x] `scripts/index-data.json` — `ignoreCommits` + per-course date overrides (both empty; escape hatch only)
- [x] `public/index.html` — toolbar CSS, `.card-footer` gap, stat ids, inline sort/filter script
- [x] `package.json` — `npm run dates`, `npm run dates:check`
- [x] Verified: 42/42 dates, exact-42-line diff, idempotent, reflow restores curated order byte-for-byte, mobile + no-JS
- [ ] Commit + push (confirm with Mustafa first)

## Data contract
`data-added="YYYY-MM-DD"` · `data-updated` (omitted when same as added) · `data-words` · `data-video="1"`

## Features
1. Sort — By category (curated, default) / Recently updated / Recently added / Title A–Z / Longest / Shortest read.
2. Flatten — non-default sorts move all cards into the first `.grid` and hide category headers; switching back re-homes them in document order, restoring the curated layout exactly.
3. Search — AND across whitespace-separated tokens, matched on title + description + type + category name.
4. Category chips — reuse the `.category-tag` classes, so a new category inherits its colour automatically.
5. Card meta — category dot, reading time (`words / 200`, same formula as the framework), and the date.
6. Badges — `NEW` (added ≤14d) and `UPDATED` (≤21d), computed at runtime so they decay even from a stale SW cache.
7. Live stats — the header's "42 Courses / 14 Categories" now derives from the DOM and tracks the active filter.
8. URL state — `?q=&sort=&cat=` via `replaceState`, restored on load. No localStorage (a persisted filter is a mystery weeks later).
9. Keyboard — `/` focuses search, `Escape` clears.

## Workflow when adding or updating a course
Edit `index.html` as before → commit → `npm run dates` → commit the one-line-per-card diff.
`npm run dates:check` exits non-zero if the index is stale.

## Gotchas (load-bearing)
- `.card { display: flex }` beats the UA's `[hidden] { display: none }`, so `.card[hidden], .category[hidden] { display: none }` is **required** — without it filtering silently does nothing.
- `new Date('2026-07-27')` is UTC midnight → renders as Jul 26 in US timezones. Dates are compared and formatted as ISO strings throughout.
- The search haystack and home grid must be captured at init, before any card moves: once flattened, every card's `closest('.category')` is section 1.
