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
