# Animation Brief — "The Agentic Loop"

**Source course:** Loop Engineering
**Design system:** Coursera Skills OS Design (already selected — pull palette/type from it; accent = Coursera blue)
**Format:** Looping explainer animation, ~30–45s, 16:9. Should loop seamlessly (it's a loop about loops).
**Tone:** Clean, editorial, confident. Generous whitespace, minimal chrome, one idea on screen at a time. Motion is smooth and purposeful — ease-in-out, nothing bouncy.

---

## The one idea
Software has moved from **writing a single prompt** to **designing a loop that runs itself**. The hero of this animation is the loop cycle: an agent that acts, checks its own work, and repeats until a goal is met — with hard stops so it never runs off a cliff.

If only ONE thing gets built well, build **Act 2 (The Loop Cycle)**. Everything else is supporting.

---

## Storyboard (scene by scene)

### Act 1 — The Shift (0–5s)
- Open on centered text: **"Prompt Engineering"** — then it dissolves/slides out and **"Loop Engineering"** slides in and locks.
- Sub-line fades under it: *"The leverage point moved — from phrasing one prompt to designing the loop."*
- Keep it stark: title only, lots of negative space, Coursera blue accent on the word "Loop."

### Act 2 — The Loop Cycle (5–22s)  ← THE HERO
Build a vertical/circular flow of 5 nodes, appearing one at a time as they're named:

1. **READ STATE** — *reads the codebase, tasks, test results*
2. **PLAN** — *decides the next action*
3. **EXECUTE** — *writes code, runs commands*  ← label a small tag: "Generator"
4. **VERIFY** — *tests, linters, type-checks*  ← label a small tag: "Verifier"
5. Branch after VERIFY:
   - **FAIL →** arrow curves back up to PLAN, node **"ADJUST & RETRY"** flashes
   - **PASS →** **COMMIT** → **DONE?** → arrow loops all the way back to READ STATE

**Motion — the key move:** a glowing **pulse (a dot/token)** travels along the arrows through the cycle.
- **Lap 1:** pulse reaches VERIFY, VERIFY flashes **red / ✗**, pulse routes back through ADJUST & RETRY. (The loop failed and is retrying — this is the point.)
- **Lap 2:** pulse reaches VERIFY, it flashes **green / ✓**, routes through COMMIT → DONE → and back to the top.
- The pulse keeps circling as the scene holds. This is the seamless loop point.

Callout that fades in beside VERIFY on lap 1:
> **"The verifier is the bottleneck — not the model."**

### Act 3 — Generator vs Verifier (22–30s)
- Camera/focus pulls to just two nodes: **EXECUTE (Generator)** on the left, **VERIFY (Verifier)** on the right, arrow between them.
- Left label: *"Creative. Probabilistic. Sometimes wrong."*
- Right label: *"Deterministic. Pass / fail. The real quality lever."*
- Punch line text: **"A strong verifier + an average model beats a weak verifier + the best model."**

### Act 4 — The Three-Agent Pattern (30–40s)  *(optional if time allows)*
Three boxes appear left→right:
- **PLANNER** — *1 prompt → full product spec*  →
- **GENERATOR** — *builds one sprint at a time*  ⇄  **EVALUATOR** — *clicks through the running app, sends bugs back*
- Animate a ping-pong arrow between GENERATOR and EVALUATOR (build → test → send back → fix), 2–3 bounces.
- Caption: *"Split the maker from the checker — agents grading their own work just praise it."*

### Act 5 — Hard Stops (40–45s)  *(the safety beat)*
- Three small chips snap in beneath the loop: **Turn ceiling** · **No-progress detection** · **Budget cap**
- One-line: *"Every production loop needs an off switch."*
- Then return to the hero loop still circling → seamless loop back to start.

---

## Exact on-screen text (copy verbatim)
- Title: `Prompt Engineering → Loop Engineering`
- Cycle nodes: `READ STATE` · `PLAN` · `EXECUTE` · `VERIFY` · `ADJUST & RETRY` · `COMMIT` · `DONE?`
- Tags: `Generator` (on EXECUTE), `Verifier` (on VERIFY)
- Callout: `The verifier is the bottleneck — not the model.`
- Act 3 punch line: `A strong verifier + an average model beats a weak verifier + the best model.`
- Three agents: `PLANNER` · `GENERATOR` · `EVALUATOR`
- Hard stops: `Turn ceiling` · `No-progress detection` · `Budget cap`
- Optional closing quote (attribution on screen):
  > "Prompt phrasing stopped being the bottleneck in early 2026. What replaced it is loop design." — Cobus Greyling

---

## Visual direction
- **Palette:** Coursera blue as the primary accent (nodes/active state), neutral grays for inactive, one green for PASS/✓ and one muted red for FAIL/✗. Everything else white/off-white background.
- **Type:** Coursera Skills OS type scale — one weight for node labels (medium), lighter for descriptions.
- **Nodes:** rounded rectangles, subtle shadow, thin connector arrows. Inactive nodes are low-opacity; the node the pulse is currently at is full-color + slight scale-up.
- **The pulse** is the star — a small blue dot with a soft glow trail moving along the arrows at a readable, unhurried pace.
- **Loop seamlessly:** last frame of Act 5 should match the resting state of Act 2 so it can play forever.

## What to prioritize if scope is tight
1. Act 2 (loop cycle + traveling pulse + fail-then-pass) — non-negotiable, this IS the animation.
2. Act 1 title shift.
3. Act 3 Generator vs Verifier.
4. Act 5 hard stops.
5. Act 4 three-agent pattern (nice-to-have).
