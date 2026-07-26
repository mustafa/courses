# Learning That Proves Itself | Comprehensive Course

Learning Science · AI-Native Product Design · July 2026

# Learning That Proves Itself

The same GPT-4, in the same classrooms, produced opposite results: unguarded access raised practice scores 48% and left students 17% *worse* on the exam they took without it — while a hints-only variant raised practice performance 127% and erased the harm entirely. This course works through the causal evidence on AI-native learning, the market that has commoditized every AI feature except proof, and an architecture in which every convenience is paired with an unaided moment that would expose it if hollow.

📚 15 Modules ⏱ ~2.5 hour read 🔬 60+ studies & trials ▶ Animated explainer 🛠 Practitioner Level 🔌 Fully Offline

0 / 15 completed

🔍

1.  [1 The One Study That Reframes Everything](#mod1)
2.  [2 The Replicated Core: Levers That Actually Work](#mod2)
3.  [3 Boundary Conditions: When the Core Backfires](#mod3)
4.  [4 Honest Effect Sizes: Retiring the 2-Sigma Myth](#mod4)
5.  [5 The Consumer & K–12 Landscape](#mod5)
6.  [6 Enterprise Convergence & the Vacant Position](#mod6)
7.  [7 Four Zombie Ideas to Bury](#mod7)
8.  [8 Easy but Empty: How AI Hollows Out Learning](#mod8)
9.  [9 Content Integrity, Sycophancy & Stage-Dependence](#mod9)
10.  [10 The Counter-Evidence: Designed Tutoring Works](#mod10)
11.  [11 The Seven Principles](#mod11)
12.  [12 The Six-Level Architecture](#mod12)
13.  [13 The Lesson Loop & the Learner Model](#mod13)
14.  [14 Proof: Applied Checks, Judges & Badge States](#mod14)
15.  [15 Shipping It: Risk, Governance & Measurement](#mod15)

▶ Animated explainer · 61s

## The whole argument, in one minute

The reframe from assisted performance to unaided learning, the two arms of the Bastani trial, the lesson loop failing its gate and then passing, the badge that can expire, and why unreviewed generation never gets to mint a credential. Use the chapters to jump to an act.

**Key takeaway:** the model is not the variable — the interaction architecture is. Pair every convenience with an unaided, delayed moment that would expose it if hollow.

▶ 12s The two arms, animated — same GPT-4, same classrooms. One arm's practice gains survive the tool being taken away; the other's do not.

### Same Model, Opposite Outcomes

In June 2025, *PNAS* published a pre-registered randomized controlled trial that should be the starting point for anyone building or buying AI learning products. Hamsa Bastani, Osbert Bastani, Alp Sungu, Haosen Ge, Özge Kabakçı and Rei Mariman gave roughly a thousand high-school mathematics students access to GPT-4 during in-class practice — then took the tool away and tested them.

The headline is not that AI helped or that AI hurt. It is that **the same underlying model produced opposite results depending on how the interaction was designed**.

| Arm | Assisted practice | Unassisted exam |
| --- | --- | --- |
| GPT Base — a plain ChatGPT-style interface | +48% vs control | −17% vs control |
| GPT Tutor — hints, never answers | +127% vs control | Statistically indistinguishable from control |
| Control — notes and textbook, no devices | — | — |

Unfettered access to a frontier model did not merely fail to help. It made students measurably worse at doing the mathematics themselves. And the fix was not a better model — both arms ran on the same GPT-4. The fix was a prompt that refused to hand over solutions.

The Load-Bearing Claim

The discriminating variable in AI-native learning is not *which model* a product uses. It is **whether the model does cognitive work the learner should have done**. Every documented harm in this course shares that structure; every documented gain avoids it.

### How the Study Was Built

The design matters, because the design is what makes this evidence load-bearing rather than suggestive.

-   **Population.** Nearly 1,000 students across 9th, 10th and 11th grade at a large high school in Turkey, Fall semester of the 2023–24 academic year.
-   **Dosage.** Four 90-minute sessions per grade, covering roughly 15% of the semester's mathematics curriculum.
-   **Randomization at the classroom level.** Students are randomly assigned to classrooms at this school; each classroom was then assigned to Control, GPT Base, or GPT Tutor. Honors-designated classrooms — not randomly populated — were excluded from the main sample.
-   **Pre-registered.** The primary analysis — comparing *unassisted* exam scores across arms — was specified in advance on AsPredicted. That is what converts "we found an interesting pattern" into "we tested a stated hypothesis."

Each session had three parts, and the middle one was the only thing that varied:

SESSION STRUCTURE parts 1 and 3 are identical across all three arms ┌─────────────────────────────────────────────────────────┐ │ 1. TEACHER LECTURE topic review, worked examples │ ├─────────────────────────────────────────────────────────┤ │ 2. ASSISTED PRACTICE ← THE ONLY RANDOMIZED DIFFERENCE │ │ Control : notes + textbook, no devices │ │ GPT Base : ChatGPT-style chat on a laptop │ │ GPT Tutor : hint-gated chat, teacher-seeded │ ├─────────────────────────────────────────────────────────┤ │ 3. UNASSISTED EXAM closed-book, closed-laptop │ │ each exam problem mirrors a practice problem │ └─────────────────────────────────────────────────────────┘ The tool was removed before the measurement.

That third part is the whole point, and it is what most edtech evaluation skips. **The tool was removed before the measurement.** Practice-time metrics were collected too — and they told the opposite story.

### What the Regression Actually Says

Intention-to-treat estimates on normalized performance (0–1 scale), with session, grader, grade-level and teacher fixed effects, standard errors clustered at the classroom level:

| Coefficient | Practice performance | Exam performance |
| --- | --- | --- |
| GPT Base | +0.137** | −0.054* |
| GPT Tutor | +0.361** | −0.004 (n.s.) |
| Control arm mean | 0.284 | 0.321 |
| n = 2,848 student–session observations. * p < 0.05, ** p < 0.01. |  |  |

Divide through by the control means and you get the numbers everyone quotes: 0.137/0.284 ≈ +48% and 0.361/0.284 ≈ +127% on practice; 0.054/0.321 ≈ −17% on the exam. The GPT Tutor exam coefficient is not just insignificant — it is an *order of magnitude* smaller than GPT Base's.

> **Warning:** Read the Ranking Carefully
>
> GPT Tutor was **better on practice** (+127% vs +48%) *and* better on the exam. The arm that gave away less produced more. If your intuition says constraining the tutor is a trade-off against helpfulness, this trial says otherwise — the constraint improved both numbers.

### The Mechanism: A Crutch, Not a Tutor

The authors did the work of showing *why*, and this is the part product teams should sit with.

**The model was wrong a lot.** The researchers re-queried GPT Base ten times on each of the 57 practice problems using the most common student message — literally *"What is the answer?"* — and hand-classified the responses. GPT Base gave a correct answer only about **51% of the time**: logical errors (the steps themselves were wrong) 42% of the time, arithmetic errors (right steps, wrong computation) 8%.

**Students copied anyway.** Interaction analysis using NLP clustering of student messages found that GPT Base users overwhelmingly repeated the question text or asked for the answer. Restricting to the very first interaction of the very first session, 56% of GPT Base messages were superficial versus 42% for GPT Tutor — but across all problems in that first session the numbers *diverge*: 67% for GPT Base, falling to 37% for GPT Tutor. GPT Tutor students also sent significantly more messages per problem, and the gap widened with experience.

**The error channel confirms copying.** If students were reading and understanding the solutions, arithmetic errors (which students can catch) should hurt less than logical errors. Instead both had similar negative coefficients on practice performance — consistent with students transcribing output rather than evaluating it.

From the Paper

"Without guardrails, students attempt to use GPT-4 as a 'crutch' during practice problem sessions, and subsequently perform worse on their own."

### They Did Not Notice

End-of-session surveys asked students how they thought they had done. GPT Base students performed worse on the exam and **did not perceive that they had performed worse or learned less**. GPT Tutor students did *not* outperform control on the exam, yet believed they had performed significantly better.

Hold onto this. It is the reason "let the learner decide how much AI help to use" is not a neutral design choice: the signal learners would need to make that decision is exactly the signal AI assistance corrupts. Module 8 develops the mechanism.

### What the Guardrail Actually Was

GPT Tutor was not a different model or a fine-tune. It was the same GPT-4 with a different system prompt, doing two things:

1.  **Hints, not answers.** Explicit instruction to help the student work the problem out, never to hand over the full solution — including a rule to ignore requests to role-play or override those instructions.
2.  **Teacher-authored grounding.** Each prompt carried problem-specific content written by two hired mathematics teachers: one or more correct solutions, the common student mistakes for that problem, and how to respond to each. The paper is candid that this is *labor-intensive* — and that it is what prevents GPT-4 from giving incorrect feedback.

That second point is the one most implementations skip, and it recurs throughout this course: the highest-performing AI tutors in the literature are the ones grounded in expert-authored solutions, not the ones with the cleverest persona.

### Two Findings Worth Not Over-Reading

**Grade dispersion.** Using the Herfindahl–Hirschman index, both arms *reduced* performance dispersion during assisted practice — the familiar "AI lifts the weakest most" result. But there was no significant effect on dispersion in the unassisted exam. The skill-gap narrowing did not survive removal of the tool.

**Heterogeneity.** The authors looked for pre-registered subgroup effects by ability, resources and effort, and found essentially none, particularly on unassisted exam performance. The harm was not concentrated in one identifiable group you could exclude.

### The Authors' Own Limits

A course about honest evidence should carry the caveats the authors carry:

-   Two tutor designs, one subject (mathematics, where objective evaluation is easy), one high school, one country.
-   Deployed in Fall 2023, when generative AI was new to these students; interaction norms have shifted since, and both closed and open-weight models have improved substantially.
-   **Short-term outcomes only** — constrained by what the partner school allowed. The authors name long-run outcomes as a key direction for future work.
-   Mechanism analyses are observational within the trial; controlled experiments with finer-grained monitoring would sharpen them.

> **Tip:** Provenance Note
>
> Bastani et al., *PNAS* 122(26), e2422633122, published 25 June 2025. Anonymized data, conversation logs and code are public. A correction was later issued (10.1073/pnas.2518204122) — it is non-substantive: a production error in one author's listed affiliation. No result changed.

### Why This Is Module 1

Everything that follows is either an explanation of this result or a design response to it. The learning science in Modules 2–4 says *why* removing effort removes learning. Modules 5–7 show a market that measures the practice number and not the exam number. Modules 8–10 establish that the pattern generalizes far beyond high-school algebra. Modules 11–15 build the architecture in which a result like this cannot hide.

### Four Decades, One Convergent Answer

The good news for anyone building learning software is that the effective techniques are old, replicated across hundreds of studies, and cheap to encode. They do not require a frontier model. They require correct sequencing and honest instrumentation.

The unifying property is worth stating before the evidence: **every technique that reliably produces durable learning works by structuring effort the learner still performs.** Every documented failure in Module 8 comes from removing that effort.

### Lever 1: Retrieval Practice

The most robust finding in applied learning science is that *taking a test teaches more than restudying*. In the classic crossover experiment, restudy won after five minutes (≈83% vs ≈71% recall) and lost after a week (≈40% vs ≈61%). Massed restudy wins immediately and loses at delay — which is precisely the shape of the Bastani result at a different timescale.

Meta-analyses across more than a hundred studies put the advantage of practice testing at **g ≈ 0.5–0.6**, amplified by feedback and by *recall*\-type formats (produce the answer) over *recognition*\-type formats (choose the answer).

> **Warning:** The Limit Nobody Quotes
>
> Test-enhanced learning transfers only weakly beyond the tested content: **d = 0.40 overall, and statistically indistinguishable from restudy without moderating conditions**. Quizzing alone will not produce transfer. Transfer needs its own item types — application and defense tasks in varied contexts.

### Lever 2: Feedback — Where the Sign Is Set by the Content

Feedback is the multiplier on retrieval, and its *quality* determines its *sign*. The most rigorous re-analysis of the literature (435 studies, N > 61,000) finds a medium pooled effect of **d = 0.48** — concealing enormous heterogeneity:

| Feedback type | Effect |
| --- | --- |
| Reinforcement and punishment (scores, praise) | d = 0.24 |
| Corrective feedback | d = 0.46 |
| High-information feedback — what was wrong, why, what to do next | d = 0.99 |

Two cautions. The widely quoted 0.70–0.79 figure for feedback does not survive rigorous re-analysis — the defensible claim is the *mechanism*, not the magnitude. And roughly **one third of feedback interventions have negative effects**, concentrated in feedback that directs attention to the self (scores, praise) rather than the task.

Design Implication

A generated "Great job!" is not a neutral pleasantry — it is the weakest documented form of feedback, deployed at scale. An AI tutor tuned for warmth is optimizing directly into the d = 0.24 bucket. Specify feedback *content*, never feedback *presence*.

### Lever 3: Spacing, and the Fiction of Permanent Mastery

Distributing practice beats massing it — among the oldest and most replicated effects in the field. Across 254 studies and 271 direct comparisons, **spaced study won 96% of the time**, with the optimal review gap scaling to roughly 10–20% of the interval over which the material must be retained. Combine spacing with testing and the meta-analytic effect is large: **g = 0.74**.

The design corollary is the single most consequential finding for anyone building a mastery model. In Karpicke and Roediger's *Science* study, when learners dropped items from practice after a first correct answer, one-week retention collapsed to **~35%**, versus **~80%** when correctly answered items stayed in rotation.

Read That Again

A mastery score that freezes at first success certifies **the least durable version of the knowledge**. Most progress bars in most learning products do exactly this.

Spacing also has a production-scale existence proof. Duolingo's **half-life regression** (HLR) fits an individualized forgetting curve per item per learner and cut recall-prediction error by **at least 45%** relative to hand-crafted schedulers like Leitner and SM-2 heuristics, trained on 12.7 million practice sessions. There is no universal review calendar — the schedule must adapt to individual forgetting rates and to when the knowledge is needed.

And assessment data locate where decay bites: across **6.1 million ALEKS assessments**, success rates drop steepest in the first days after learning and **flatten between one and two weeks**. Remember that window — Module 14 turns it into a credential.

### Lever 4: Worked Examples and Attempt-First Sequencing

For novices, studying fully worked-out solutions beats solving unaided from the start — the worked-example effect, established by Sweller and Cooper in 1985 and replicated across decades, ages and domains. But *timing* is the design variable that separates a sound architecture from a helpfulness feature.

Learners who first attempt novel problems — and fail — before receiving instruction outperform instruction-first learners on conceptual understanding and transfer: meta-analytic **g = 0.36** \[0.20–0.51\], rising to 0.37–0.58 under high-fidelity implementations, with effects concentrated in *older* learners and domain-specific concepts. The mechanism is receptivity: instruction delivered after a learner has committed to a wrong model lands on prepared ground — Schwartz and Bransford's *"time for telling."*

Koedinger and Aleven named the underlying tension the **assistance dilemma**: help improves practice performance while often reducing learning. There is no closed-form optimum. It is a tunable policy, not a fixed rule — which means it must be A/B-tested against delayed transfer, not against session metrics.

### Lever 5: Scaffolding That Fades — and the Fading Trap

Scaffolding works in software: a meta-analysis of 144 studies of computer-based scaffolding in STEM found **ḡ = 0.46** \[0.41–0.50\], with the largest effects at the level of principles and, notably, **among adult learners**.

But the metaphor imposes three requirements most implementations fail: contingency (support calibrated to current level), fading (gradual withdrawal), and transfer of responsibility. Fading is where architectures break:

> **Warning:** The Counterintuitive Result
>
> Cognitive outcomes were **worse when scaffolding was faded on a fixed schedule than when it was not faded at all**. A calendar-based fade is worse than doing nothing. Fade on demonstrated mastery or do not fade.

And when support is removed, the residue matters. Faded worked examples paired with **self-explanation prompts** (prompts requiring the learner to explain why each step follows) outperform either feature alone — because a merely *read* example is a passive activity near the bottom of the cognitive-engagement hierarchy. Inducing self-explanation is itself a meta-analytically supported lever at **g ≈ 0.46–0.55**.

### The Anchors, With Source Quality Attached

| Technique | Best replicated estimate | Comparator | Source quality |
| --- | --- | --- | --- |
| Retrieval practice vs restudy | g ≈ 0.5–0.6 | Delayed retention | Meta-analysis, 100+ studies |
| Spaced retrieval | g = 0.74 | Massed practice | Meta-analysis, 29 studies |
| Feedback (all types pooled) | d = 0.48 | No / less feedback | Meta-analysis, 435 studies |
| High-information feedback | d = 0.99 (vs 0.24 praise/punishment) | Feedback subtypes | Meta-analysis moderator |
| Testing → transfer | d = 0.40; ≈0 without moderators | Restudy | Meta-analysis |
| Worked examples (novices) | Less study time, fewer errors | Unguided problem solving | Replicated primary studies |
| Productive failure (PS-I) | g = 0.36 [0.20–0.51] | Instruction-first | Meta-analysis |
| Computer-based scaffolding | ḡ = 0.46 [0.41–0.50] | No scaffolding | Meta-analysis, 144 studies |

Three readings should govern everything downstream. **First**, the strongest levers are cheap to encode: recall-first checks, feed-forward feedback, decaying mastery and contingent remediation need correct sequencing, not a frontier model. **Second**, the feedback moderator range (0.24 to 0.99) spans the difference between a feature and a liability — and the same "AI feedback" label covers both. **Third**, where an estimate is moderator-dependent, the correct response is instrumentation to verify it works in *your* deployment, not hesitation about using the technique.

### The Replicated Core Fails in Predictable Ways

Module 2's techniques are not universal goods. Each has an operating envelope, and outside it the same technique produces the opposite result. These are not caveats to mention in a footnote — they are specification requirements. A system that cannot check the boundary condition should not apply the technique.

### Boundary 1: Desirable Difficulties Require Prerequisite Background

Bjork's **desirable difficulties** framework holds that conditions slowing apparent learning — spacing, testing, interleaving, generation — often improve long-term retention and transfer, while conditions that make practice feel smooth often do the reverse.

The framework's own boundary condition is less quoted and more important: **a difficulty is desirable only if the learner has the background knowledge to overcome it.** Without it, the same difficulty is simply undesirable — it is just failure.

Compounding this is the **learning–performance dissociation**. In-session performance indexes *retrieval strength* (temporary ease of access), not *storage strength* (durable learning), and the two can move in opposite directions. Learners systematically misread fluency as learning: in one well-controlled study, students *felt* they learned more from fluent lectures while actually learning more from active engagement.

Design Implication

The prerequisite concept graph is what keeps difficulty in the desirable zone. A check that fails *because prerequisites are missing* demands remediation, not more difficulty. And because learners with artificially high fluency — recent exposure, AI assistance — misjudge their own state, the **system, not self-report, must gate difficulty calibration**.

There is a second-order consequence for analytics that deserves its own line: **within-session metrics are the wrong optimization target.** An engine tuned to immediate accuracy will systematically select *against* the techniques that produce durable learning, because those techniques depress immediate accuracy by design.

### Boundary 2: Expertise Reversal

This is the single most important boundary condition for an adult, workplace audience — and the one most likely to be violated by a product built for "learners" in the abstract.

Techniques highly effective for inexperienced learners **lose effectiveness and can actively interfere as knowledge grows**, because guidance a novice needs becomes redundant information imposing extraneous cognitive load on someone who already has the schema. The effect replicates in professional, ill-structured domains: worked examples helped novice law students reason about legal cases, but more advanced students learned more from solving cases unaided. In tutored problem-solving environments, *adaptively* fading example support as the learner model shows growth outperforms any fixed ratio of examples to problems.

> **Warning:** What This Forbids
>
> Remediation triggered by **a single local error**. One failed check from a credentialed professional is more likely a slip than a misconception. Inserting a generated beginner example imposes redundancy load — and reads as condescension, which costs you the learner as well as the effect size.

The correct trigger weights the *global* concept mastery estimate and the error pattern (systematic misconception vs. slip). For high-mastery learners, prefer a minimal contrastive hint or delayed feedback over a full worked example. Module 13 implements this as expertise gating.

### Boundary 3: Interleaving Is Material-Dependent

Interleaving — mixing practice across problem types rather than blocking by type — shows a moderate overall meta-analytic effect (**g = 0.42**), with striking classroom results when categories are confusable: interleaved mathematics practice produced **77% versus 38%** on a delayed test with spacing held constant.

But the average conceals a reversal. For word-like material, **blocking wins (g = −0.39)**, and effects for expository text are ambiguous.

The mechanism is *discrimination* — forcing learners to distinguish similar categories. That is why interleaving pays off for confusable concepts and visual classification, and why indiscriminate mixing adds difficulty without benefit. Combined with the weak transfer of test-enhanced learning from Module 2, the conclusion is that **transfer must be taught explicitly**: varied-context application items and deliberate contrast of confusable concepts, not quizzing alone.

### The Operating Envelope, Tabulated

| Technique | When it works | When it backfires |
| --- | --- | --- |
| Retrieval practice | Recall-format, low-stakes, feedback-wrapped; items kept in rotation | Items dropped after first success (retention ~80% → ~35%); expected to produce transfer alone |
| Feedback | Task/process level: what was wrong, why, what next | Self-directed feedback (scores, praise) — ~1/3 of interventions are negative |
| Desirable difficulties | Prerequisites in place; learner can overcome the difficulty | Missing background knowledge — difficulty becomes pure failure |
| Worked examples / guidance | Novices; after an attempt (failure-triggered) | Credentialed professionals — redundancy load; pre-emptive insertion forfeits the generation benefit |
| Scaffolding | Mastery-contingent fading; self-explanation residue | Fixed-schedule fading — worse than never fading |
| Interleaving | Similar, confusable categories; mathematics; visual classification | Word-like material (g = −0.39); ambiguous for expository text |

### What the Table Is Really Telling You

Every "works" column is a condition the system must *verify*. Every "backfires" column is a default the system must *refuse*. And here is the load-bearing observation:

Four of Six Are Timing Errors

Dropped items, pre-emptive insertion, calendar fading, single-error remediation — **wrong learner, wrong moment, wrong stopping rule**. Not content errors. A pedagogy architecture is therefore fundamentally a *policy layer* sitting on top of content: when to test, when to help, when to withdraw help, what to mix.

Which makes the learner model's accuracy the binding constraint. Gating on a noisy mastery estimate does not fail gracefully — it reproduces the entire "backfires" column at random. Module 13 is about why the estimate needs a confidence band and Module 15 about how you validate that it means anything.

The second-order implication is metacognitive, and it is uncomfortable: **several backfire modes feel good to the learner.** Dropping mastered items feels like progress. Fluent re-exposure feels like studying. Unsolicited help feels like service. The architecture cannot outsource these decisions to learner preference. It must enforce them — and explain why, which is what Module 11's auditable-adaptation principle is for.

### Why This Module Exists

A product planned against an inflated benchmark will be misdesigned *and* mismarketed. If you believe two standard deviations is available, you will over-invest in the tutor and under-invest in the measurement, and you will make claims the market has already learned to discount. This module sets the honest band.

### Bloom's 2-Sigma: The Most Cited, Least Replicated Number in Education

Bloom's 1984 report that one-to-one tutored students outperformed classroom students by two standard deviations is the field's founding marketing claim. The underlying studies were:

-   **Small** — roughly 30 students per condition.
-   **Short** — about three weeks.
-   **Experimenter-run**, not deployed at scale.
-   Measuring the *combination* of tutoring with mastery learning, not tutoring alone.

And critically: **Bloom framed 2σ as a problem to solve, not a validated target.** It has never been replicated. Every product deck that opens with it is citing an unreplicated 40-year-old result as a benchmark its author explicitly did not offer as one.

### The Real Ceiling: VanLehn's Plateau

VanLehn's landmark meta-analysis established what is actually achievable:

| Condition | Effect vs no tutoring |
| --- | --- |
| Human tutoring | d = 0.79 |
| Step-based intelligent tutoring systems | d = 0.76 |
| Answer-based systems | d = 0.31 |

Two things about this table are more important than the numbers. First, VanLehn's own conclusion: *"the effect sizes seem to be a plateau."* Second, the active ingredient is **interaction granularity** — step-based versus answer-based — *not* the human or machine identity of the tutor. A step-based machine (0.76) nearly matches a human (0.79) and more than doubles an answer-based machine (0.31).

The Through-Line

Answer-based: 0.31. Step-based: 0.76. That is the same distinction as GPT Base versus GPT Tutor in Module 1, measured twenty years earlier in a different technology. **Granularity of interaction is the variable that keeps reappearing.**

Subsequent work converges. Intelligent tutoring systems beat classroom instruction at a median effect of 0.66 but show **no advantage over human tutoring**. Modern high-dosage human tutoring pools to **~0.37 SD across roughly 100 randomized trials**.

### Scale Erodes Effects

Cognitive Tutor is the cautionary case. Developer-run efficacy studies showed 0.3–1.2 SD. An independent trial across **147 schools** found **no significant first-year effect**. (Module 5 has the second-year figure — the story is not simply "it failed.")

The general pattern: efficacy studies run by the people who built the thing, in conditions they control, produce effects that do not survive independent replication at scale. This is not fraud; it is the ordinary difference between an efficacy trial and an effectiveness trial. But it means you must discount vendor figures by default.

### The Generative-AI RCTs: The Spread Is the Finding

| Study | Result | What to make of it |
| --- | --- | --- |
| Kestin et al., Harvard physics | g = 0.73–1.3 over best-practice active learning | Single-site, not pre-registered, researcher-designed immediate tests, motivated elite students. The authors themselves caution results "may not generalize." |
| Bastani et al., PNAS (Module 1) | −17% on unaided exam under unguarded access; harm eliminated by guardrails | Pre-registered, ~1,000 students, tool removed before measurement. The strongest causal evidence of harm. |
| Field RCT, ~450 undergraduates | No significant effect on any measured outcome | The null that rarely gets cited. |
| Bias-corrected meta-analysis | g ≈ 0.38 | LLM-based tutors performed no better than older rule-based tutors. |

That last row deserves emphasis. Pooling across the literature and correcting for publication bias, the arrival of large language models did not move the tutoring effect size. The plateau held.

### The Failure Mechanism Is Consistent

When AI does the cognitive work, performance inflates and learning collapses. Randomized evidence shows AI-supported learners producing the *best* task output with *zero* knowledge gain or transfer — offloading planning and monitoring to the tool. The pattern extends to knowledge workers, for whom high trust in AI is associated with reduced critical engagement. Module 8 develops this.

### The Planning Band

Plan To This

**0.3–0.8σ on delayed, independently measured outcomes, with 0.3–0.5 as the honest central target.** Where you land in that band is set by design variables, not model choice: guardrails that keep effort with the learner, feedback quality, decaying mastery with re-checks, expertise-gated assistance.

And the corresponding skepticism rule: **treat any claim above ~1σ as marketing** until it arrives with pre-registration, delayed retention measures, and independent replication.

### Why Modesty Is a Position, Not a Concession

The OECD reports that roughly **90% of edtech companies have no research evidence behind their learning claims**. In a market where nine out of ten claims are unevidenced — and whose trust was destroyed by 2-sigma marketing — publishing realistic targets and verifying them against delayed, unaided assessment is itself the differentiator.

The asymmetry is the strategic point: you are not lowering expectations. You are becoming the only player making a *verifiable* promise. Module 15 turns this into published targets.

### Two Worlds With Opposite Failure Modes

The AI learning market splits cleanly. Consumer and K–12 products have *real pedagogical engineering* — spacing models, knowledge graphs, guardrailed tutors — but almost no independent evidence that the AI layer itself improves outcomes. Enterprise platforms (Module 6) have distribution and budget but have converged on an identical feature set measured by completions and satisfaction.

This module reads the first world for copyable engineering. The pattern to watch: **evidence quality runs inverse to marketing volume.**

### Khanmigo: The Quality-Assurance Architecture Is the Contribution

Khanmigo's most instructive feature is not its tutor. It is the machinery behind the chat window.

The system is deliberately Socratic — it refuses to hand over answers, flags problematic student messages, and exposes all chats to parents and teachers. Behind that, Khan Academy runs a **generate → verify → approve** loop: a dedicated math-verification agent checks the LLM's arithmetic before it reaches the student.

The Natural Experiment

An internal experiment *removed* the verification agent. Math errors **doubled**. The change was rolled back immediately. If you build one thing from this module, build the verifier.

The release process is equally instructive. Every prompt or architecture change ships only if it wins a large-scale A/B test — more than **15 million tutoring threads over six months** — on **"next-item correctness"**: whether the student solves the *next* problem on the same skill *unaided*. That is a deliberate rejection of assisted performance as the success metric, and it is the closest thing in production to the Bastani unassisted exam.

Two published results matter for anyone designing an adaptive engine:

| Change | Effect on next-item correctness | Scale |
| --- | --- | --- |
| Inject the learner's recent problem-solving history into the prompt | +3.4% | 608,000 threads |
| Surface unmastered prerequisites before a hard problem | +2.7% | 1.36 million threads |

**Prerequisite-graph context is not a navigation nicety.** It measurably improves tutoring outcomes at production scale — which is the empirical warrant for the concept graph in Module 12.

The outcome evidence is thinner than the engineering, and honesty requires saying so. Independent RCTs of the underlying Khan Academy *mastery platform* (not Khanmigo itself) show **0.12–0.22 SD** on end-of-year mathematics scores. Khanmigo-specific efficacy remains scant: adoption grew from roughly 40,000 to 700,000 students in a year, but the only public effect figures are internal and non-randomized.

### Duolingo: Real Spacing Science, Real Objective Drift

Duolingo embeds one of the few peer-reviewed machine-learning models in commercial learning: **half-life regression**, which estimates each item's forgetting rate per learner and schedules review just before predicted forgetting — cutting prediction error by at least 45% against the Leitner heuristic.

Its efficacy evidence is genuine but inflated by selection: self-selected learners who finished Unit 5 scored comparably to fourth-semester university students on reading and listening, in vendor-conducted but peer-reviewed studies. The strongest independent-led study (n = 48, within-subjects, *no control group*) found significant gains after ~27 hours — and one finding that indicts the rest of the product:

> **Warning:** The Finding That Indicts the Engagement Layer
>
> **Weekly time-on-app did not predict outcomes. Session accuracy did.** Learners repeat easy sessions to farm experience points and protect streaks — extrinsic-reward focus displacing the processing that produces learning.

Duolingo demonstrates both halves of the AI-native bargain: a world-class adaptation engine, and a retention-optimization layer whose objectives can drift from the learning objective. **A product that A/B-tests against daily active users without chaining experiments to mastery evidence will eventually optimize the wrong thing.** Module 15 returns to this as a cautionary template.

### ALEKS: The Most Rigorous Theory, and the Most Honest Verdict

ALEKS rests on **Knowledge Space Theory** — a model in which a domain is the combinatorial space of possible knowledge states, and assessment locates which state a learner occupies. Its 25–30-question assessment returns both what the student knows and the *"outer fringe"*: what they are ready to learn next.

The honest efficacy verdict comes from an independent meta-analysis of 33 studies and 9,238 students:

| Deployment mode | Effect |
| --- | --- |
| ALEKS as a replacement for instruction | g = 0.05, 95% CI [−0.01, 0.20] — indistinguishable from a teacher |
| ALEKS as a supplement to instruction | g = 0.43 |

Same software. The deployment model, not the algorithm, produced the difference.

### MATHia and DreamBox: What Rigorous Evaluation Looks Like

MATHia (Carnegie Learning) carries the field's strongest RCT. A U.S. Department of Education–funded trial across **147 schools and ~18,700 students** found **no effect in year one** and roughly **0.20 SD (≈8 percentile points) in year two** — only after teachers learned to run the blended model. Effects were not in the software; they were in the software plus a year of teacher practice.

DreamBox holds an ESSA "Strong" rating (two RCTs, 13,320 students, average +0.10 SD, concentrated in K–2) — yet the What Works Clearinghouse rated its one qualifying study *"no discernible effects."* Two credible evidence bodies, opposite verdicts, same product. Evidence tiers are not interchangeable.

### The Knewton Post-Mortem

Knewton raised more than **$180 million** on "robot tutor in the sky" claims and sold its assets to Wiley for a reported **~$10 million**. Post-mortems concluded that black-box *"adaptive mystique"* destroyed trust — and defunded the next wave of adaptive providers.

Why This Is a Design Fact, Not a Business Anecdote

Opacity is **commercially fatal** in this category. It is also, since the EU AI Act, legally untenable for high-risk educational uses (Module 15). The transparency features in Module 13 are not UX garnish — they are the thing that keeps a company alive.

### The Scorecard

| Product | Pedagogy model | Evidence quality | Honest effect size |
| --- | --- | --- | --- |
| Khanmigo | Socratic LLM tutor + mastery platform | Platform RCTs; Khanmigo-specific data internal only | 0.12–0.22 SD (platform); AI-tutor delta unproven |
| Duolingo | Implicit instruction + gamification; HLR/Birdbrain spacing | Vendor-conducted peer review; completer bias; 1 independent-led quasi-experiment | Real receptive-skill gains for completers; causal size uncertain |
| ALEKS | Knowledge Space Theory, "ready-to-learn" fringe | Independent meta-analysis, 33 studies, 9,238 students | g = 0.05 replacement; g = 0.43 supplement |
| MATHia | Model-tracing cognitive tutor + Bayesian knowledge tracing | RAND RCT, 147 schools, ~18,700 students | ~0.20 SD, year two only |
| Century Tech | "Neuroscience" micro-lessons + diagnostics | No RCT as of Dec 2023; vendor correlational case studies; unpublished claims | Unknown |
| Squirrel AI | Mastery + ~10,000-point knowledge graph | Vendor-authored studies; vendor-sponsored "world record" event; no independent RCT | Unverifiable |

### Three Conclusions

1.  **Evidence quality runs inverse to marketing volume.** The loudest claims — Squirrel AI's vendor-run 1,662-student event, Century Tech's unpublished "commercially sensitive" study — have no independent trials. The quietest publishers (ALEKS, MATHia) have the strongest.
2.  **Transparency tracks trust.** ALEKS's visible knowledge-state pie and MATHia's mastery bars are the commercial ancestors of the open-learner-model pattern. Knewton's opacity is what killed it.
3.  **Granularity is not efficacy.** Squirrel's ~10,000 knowledge points versus ALEKS's ~1,000 is an engineering claim, not an outcome claim. Experts characterize such systems as *adaptive* (diagnosing what learners know) rather than *personalized* (attending to what learners want).

The copyable assets are concrete and unglamorous: visible knowledge state, prerequisite-driven remediation, step-level feedback, unaided-transfer metrics, published methodology.

### Everyone Shipped the Same Five Features

Between 2024 and 2026, every major enterprise learning platform shipped an essentially identical AI feature set. Not similar — identical in kind:

1.  A conversational coach grounded in proprietary content
2.  Generative authoring
3.  AI role-play for applied practice
4.  Skills inference and auto-tagging
5.  Natural-language analytics

Workday's **~$1.1 billion acquisition of Sana** (signed September 2025, completed November 2025) is the market's own admission that AI-native architecture cannot be retrofitted: Workday bought what it could not build. Analyst Josh Bersin — whose firm discloses a commercial relationship with Sana — frames the deal as Workday jumping ahead of a corporate-training market he sizes at $400 billion.

Features are already sliding into consumption pricing: Docebo meters coaching and generation through "AI credits," SAP charges premium generative features in "AI units." **That is the commercial signature of a commoditizing capability.**

What Commoditization Means for Strategy

"AI-native" is no longer a differentiator; it is table stakes. Market forecasts ($6.3 billion in 2025 growing at ~19% CAGR, with research-house estimates diverging tenfold) reward bundling, not novelty. If your pitch is "we have an AI coach," you are describing 2024.

### The Convergence Table — and Its Empty Row

| AI feature cluster | Representative shippers (2024–2026) | Evidence behind it |
| --- | --- | --- |
| Conversational coach grounded in content | Coursera Coach, LinkedIn AI coaching, Degreed Maestro, Docebo Harmony, SAP Joule | Vendor platform analytics only: Coursera reports +9.5% first-attempt quiz passes and 34M+ messages — observational, selection-biased |
| Generative authoring | Sana, Docebo Creator, 360Learning, Arist, LearnUpon | Vendor-reported time savings ("months to days"); no published quality controls |
| AI role-play / applied practice | Docebo Virtual Coaching, Degreed Maestro, Coursera/Udemy/LinkedIn Role Play | Vendor/analyst effect claims (15–20% quota lift); no independent RCTs |
| Skills inference + auto-tagging | Degreed, Docebo Skills Engine, Udemy skills tree, Cornerstone, Workday/SAP | Inferred from content metadata and profiles, not demonstrated mastery |
| Natural-language analytics | Docebo Harmony, Sana dashboards | Analytics over enrollments, completions, time — completion-centric |
| Credentials minted from demonstrated applied work | None at scale (Degreed added "skill-validation partners" — a gap admission) | — |

The entire stack optimizes the *supply* of learning — more content, faster authoring, friendlier coaching — while the *verification* row is empty.

Coursera's own data hints at unmet appetite. When it let AI grade free-text work, average scores dropped from **88% under human graders to 72%**, and learners submitted *more* attempts to pass. Rigor is a feature learners respond to. Axonify's "skip what you know" test-out model validates demand for prior-knowledge recognition — but recognition there rests on content exposure, not evidence of durable mastery.

### The Credential-Trust Crisis Is Measured, Not Anecdotal

The gap is precise: **no major platform issues credentials backed by demonstrated applied work, at scale, with evidence an employer can inspect.** The demand-side failure is documented:

-   **38%** of hiring managers cannot tell what skills a microcredential certifies; **57%** "almost always" have to look one up to understand it — destroying the efficiency promise that justified badges in the first place.
-   The Burning Glass Institute / Harvard Business School analysis of **11,300+ job postings** found dropped degree requirements nearly **quadrupled from 2014 to 2023** — yet **fewer than 1 in 700 hires in 2023 actually benefited**. 45% of firms adopted skills-based hiring "in name only."
-   Hiring managers value microcredentials mostly as signals of "learning mindset" rather than verified skill.

> **Warning:** The Bottleneck Is Not the Standard
>
> Open Badges 3.0 — a W3C Verifiable Credential with native *evidence* and skill-alignment fields — is **final and verifiable offline**. VC 2.0 became a full W3C Recommendation in May 2025. The cryptography works. What is missing is **a trusted evidence chain behind the badge**.

The market is groping toward the gap. LinkedIn's **Verified AI Skills Certificates** (January 2026) are issued by partner tools based on real product usage rather than tests or self-report; Degreed's skill-validation partnerships acknowledge that inferred skills need external proof. Neither closes the loop: *usage logs certify exposure, not competence under unaided conditions.*

And this is the strategically interesting part: the gap sits exactly where incumbents' **completion-based data models cannot follow without rebuilding their evidence layer**. Proof is not a feature you add. It is a data model.

### The Buyer's Actual Pain: Measurement

Enterprise L&D's instruments are close to worthless:

-   Learner-reaction surveys — "smile sheets" — correlate with measured learning at roughly **r ≈ 0.09** across meta-analyses. Virtually nothing.
-   The Kirkpatrick four-level model remains the industry standard, but the causal links between its levels are empirically weak, and most organizations stop at Levels 1–2 (reaction and learning), never reaching behavior or results.
-   LinkedIn's Workplace Learning Report 2025 (937 L&D professionals): **49%** say executives worry employees lack the skills to execute strategy, yet most organizations still default to completion and satisfaction metrics — and while **80%** call AI important, only **25%** use it routinely.

The science-aligned alternative exists and grades the field's habits as failing. Thalheimer's **Learning-Transfer Evaluation Model (LTEM)** — an eight-tier rubric ranking evidence from attendance to organizational effects — classifies attendance, completion and poorly designed smile sheets as *inadequate* to validate learning. Adequate evidence starts at delayed retrieval, decision-making and task performance.

LTEM Is a Product Specification in Disguise

A dashboard that reports delayed retrieval, decision quality and demonstrated task performance — rather than completions — sells the exact upgrade the market says it needs and cannot currently buy. **Measurement is the wedge.** Module 15 builds the stack.

### Inherited Liabilities

A new entrant inherits a field littered with zombie ideas — claims that were never supported, or were traced to nothing, and refuse to die. Repeating any of them in product copy or design rationale is a credibility liability with exactly the buyers who can evaluate you. Four deserve explicit burial.

### 1\. Learning Styles

Matching instruction to "visual / auditory / kinesthetic" preferences has, in Pashler et al.'s definitive review, **"no adequate evidence base"** — with replicated failures since. Yet **80–95% of educators still believe it**, and AI-vendor marketing ("content in a format suited to the learner's preferences") continues to launder the myth into personalization claims.

The Replacement Rule

**Adapt on demonstrated mastery and goals. Never on claimed modality.** If a product's personalization story cannot be stated without invoking a learning style, it does not have a personalization story.

This one matters more than the others for AI products specifically, because generative models make style-matching *trivially easy to ship*. The capability exists; the warrant does not.

### 2\. 70-20-10

The rule that 70% of learning is experiential, 20% social and 10% formal derives from **1980s retrospective self-reports by successful executives**. ATD's own assessment is that *"it is neither a scientific fact nor a recipe."*

It may start a useful conversation about blending experience with formal learning. It must never anchor a design ratio, a budget split, or a roadmap.

### 3\. The Goldfish Attention Span

The "8-second attention span, shorter than a goldfish" claim traces to an **unverifiable marketing citation** — neither the credited research organizations nor the Associated Press could locate any source.

The defensible observation is Gloria Mark's: average on-screen task focus fell from **~150 seconds (2004) to ~47 seconds (2020s)**. That is an *interruption phenomenon*, not a biological limit — a claim about environments, not brains.

> **Tip:** Keep the Conclusion, Fix the Warrant
>
> Short lessons are still correct. Justify them with **spacing science and time scarcity** — both well evidenced — not with goldfish. The 10–15-minute lesson in Module 12 rests on the former.

### 4\. The 10%-Transfer Legend

L&D's most-cited statistic — that only ~10% of training transfers to the job — has fabricated provenance. Thalheimer traced it to a **1982 opinion survey of imaginary training directors**.

Note carefully what is and is not being said: **the transfer problem is real. The number is not.** Citing a fabricated figure to describe a genuine problem hands a sophisticated buyer a reason to discount everything else you say.

### The Meta-Problem — and the Opportunity

Behind all four sits one statistic. The OECD's *Digital Education Outlook 2026* finds, citing industry analysis, that roughly **90% of edtech companies have no research evidence behind their learning claims**.

What the market does

-   Cites 2-sigma as a target
-   Personalizes on claimed modality
-   Anchors design ratios to 70-20-10
-   Justifies microlearning with goldfish
-   Quotes a fabricated transfer number

What is unoccupied

-   Publishes targets in the honest band (0.3–0.5 SD, delayed and independent)
-   Adapts on demonstrated mastery
-   Sizes lessons from spacing evidence
-   Pre-registers evaluations
-   Reports unaided delayed transfer as the north star

That is the entire strategic argument of this course in one comparison. In a market where nine out of ten claims are unevidenced, **the bar is unoccupied** — and clearing it costs discipline rather than capital.

### The Pattern Generalizes Well Beyond Algebra

Module 1 established the harm in one subject with one population. This module shows the same structure appearing in essay writing, programming, and general knowledge work — across universities, professional developers and knowledge workers — with converging mechanisms.

Every case shares one shape: **the AI performs cognitive work the learner should have performed.** Performance inflates. Learning collapses. The learner does not notice.

### Metacognitive Laziness

In a four-arm RCT of 117 university students, the ChatGPT group produced the **best essays — better even than the human-expert arm — yet showed no significant knowledge gain or transfer.** The authors label the pattern *metacognitive laziness*: learners revised by conversing with the AI instead of re-reading source material, offloading the self-regulation that produces learning.

Note the trap for product analytics: *artifact quality* was the winning metric in the failing condition.

### Cognitive Debt — Handled Precisely

The MIT Media Lab's "Your Brain on ChatGPT" study (2025) extended this to the neural level: LLM-assisted essay writers showed the weakest EEG connectivity of three conditions, the lowest ownership of their essays, and could not accurately quote their own work — *"cognitive debt,"* in the authors' term.

> **Warning:** Handle This One Carefully
>
> The study went viral and is routinely over-claimed. A formal academic comment challenges its **small sample** (only 18 participants in the critical session-4 crossover), its EEG methodology, and reporting inconsistencies — and the **authors themselves publicly rejected "brain rot" framings**. The finding is suggestive, not settled. Its value is that its *direction* converges with stronger designs.

### The Strongest Design: Interaction Pattern Determines Everything

Anthropic's pre-registered RCT of 52 developers learning a new Python library is the cleanest evidence in this space:

-   AI-assisted participants scored about **17 percentage points lower on comprehension (50% vs 67%, d = 0.738)**.
-   There was **no significant time saved**. The trade was not speed for depth. It was depth for nothing.
-   Outcomes split sharply *by how people used the tool*: delegation-style use scored **24–39%**; cognitively engaged patterns — conceptual questions, asking for explanations, generate-then-comprehend — scored **65–86%**.

The Central Number of This Module

**24–39% versus 65–86%, within the same tool, same task, same population.** Interaction pattern — not access, not model, not time — determines whether skill accrues.

A large-N program (N = 1,222) adds a persistence channel: after only **~10 minutes** of AI assistance, learners give up more readily and perform worse once assistance is removed. Instant answers condition away tolerance for struggle — and quickly.

This is the pre-LLM cognitive-offloading trade — aids raise current performance at the cost of the practice that builds internal skill — now extended from lookup to reasoning.

### The Unsupervised Default Is Delegation

Telemetry from real deployments confirms which pattern people fall into on their own: roughly **47% of real student–AI conversations are low-engagement answer-seeking**, with the highest-order tasks delegated most.

This is the finding that kills "let the user choose." The harmful pattern is not an edge case — it is the default. And Module 1 showed that in GPT Base, 67% of first-session interactions across all problems were superficial. Two independent measurements, same conclusion.

### Why the Harm Is Invisible: Fluency Illusions

These harms persist because learners cannot detect them.

Decades of experimental work show that current performance and durable learning dissociate, and that **fluency — the felt ease of processing — is misread as mastery**. Learners overestimate later recall whenever the answer is visible during study. In a randomized crossover at Harvard, students in active-learning classrooms learned measurably more but *felt* they learned less than peers in polished passive lectures — actual and perceived learning were **anticorrelated**.

The Structural Problem

Generative AI is the most powerful fluency pump ever built into a learning product. Smooth, instant, personalized explanations maximize exactly the signal that miscalibrates self-judgment.

Experiments confirm it: ChatGPT use lowers perceived difficulty, reduces invested effort, and inflates inaccurate judgments of learning. The downstream consequence is **artifact inflation** — in a documented AI/ML course, polished AI-assisted submissions masked an inability to explain basic design choices under live questioning. The artifact had stopped measuring understanding. (Module 14 is the response to that sentence.)

### The Harm Register

| Study (quality) | Key finding | Mechanism | Design implication |
| --- | --- | --- | --- |
| Bastani et al., PNAS 2025large pre-registered field RCT | +48% practice, −17% unaided exam; guardrails removed harm | Solution copying; errors transmitted; harm unperceived | Hints not answers; measure delayed unaided performance |
| Fan et al., BJET 2024peer-reviewed RCT, N=117 | Best artifacts, no knowledge gain or transfer | Metacognitive laziness — AI replaces self-regulation | Scaffold evaluation and monitoring; supplement, never replace |
| Kosmyna et al., MIT 2025preprint; small session-4 n; critiqued | Weakest EEG connectivity, poor memory of own text | Cognitive debt — reduced encoding of AI-mediated output | Require learner-authored attempts before assistance |
| Shen & Tamkin, Anthropic 2026pre-registered RCT, N=52 | −17pp comprehension; delegation 24–39% vs engagement 65–86% | Interaction pattern determines whether skill accrues | Constrain default interactions toward engagement patterns |
| Liu et al. 2026large-N RCT program, preprint | Reduced persistence and unaided performance after ~10 min | Instant answers condition away tolerance for struggle | Budget productive struggle; track unaided recovery |
| Prather et al., ICER 2024peer-reviewed observational, 21 lab sessions | Prepared students accelerate; struggling students finish with an illusion of competence | Compounded metacognitive difficulties for weak learners | Stage-dependent scaffolding and pacing |
| Steinbach et al., L@S 2025pre-registered RCT, N=252 | 0% vs 100% erroneous feedback: gains inseparable — for adults who detected the errors; more confusion, lower trust | Error tolerance depends on learner error-detection skill | Never rely on novices as the error-detection layer |

### Three Patterns Cut Across the Table

1.  **No failure is a model failure.** In every row, the architecture around the model — answers vs hints, delegation vs engagement, reviewed vs unreviewed — determines the sign of the outcome.
2.  **The harms are invisible at the moment they occur.** Awareness arrives, if at all, at the unaided test.
3.  **The harm concentrates on the least-prepared learners** — which makes "let the user choose" a *regressive* policy, not a neutral one.

> **Warning:** The Analytics Warning
>
> In every failing condition above, **practice scores, artifact quality, session engagement and satisfaction all rose.** A team optimizing those metrics would ship every one of these harms — and their dashboard would be green the entire time.

### Three Risks That Survive a Good Interaction Design

Module 8 was about what happens when the *interaction* is wrong. This module covers three risks that persist even when the interaction is right: the content can be wrong, the tutor can be agreeable, and the same design can help one learner while harming another.

### Risk 1: Unreviewed Generation Fails at Material Rates

Even a well-scaffolded interaction fails if the content is wrong, and unreviewed LLM-generated educational content fails often enough to matter:

| Context | Measured error rate |
| --- | --- |
| AI-generated medical multiple-choice questions (systematic review) | <1% to 45% across studies |
| Thoracic-surgery exam, Claude-generated items | 40% contained major errors — versus zero for the expert-written exam |
| GPT-4 generated school mathematics tasks | 16% had the wrong answer key |
| ChatGPT-generated algebra hints | 30% failed quality checks — every rejection for wrong answers or steps |

These errors are *fluent*. Detection requires effortful expert review, not a glance.

> **Warning:** The Compounding Problem
>
> **Remediation fires precisely when a learner has failed — and it depends on the model's weakest capability.** LLM feedback matches teachers overall but is significantly weaker at *diagnosing the learner's actual error in context*. Correctness-checking of student code runs only **57–79%** accurate. The moment you most need the model to be right is the moment it is least reliable.

The harms are real but bounded. A pre-registered RCT (N = 252) found that even **100%-erroneous** mathematics feedback produced gains inseparable from accurate feedback — *for adult learners who scrutinized it* — at the cost of confusion and reduced trust. But learners systematically over-trust AI content, so **they cannot serve as the error-detection layer**. Novices least of all.

### The Mitigation Is Quantified

This is not an unsolved problem. It is a solved problem that most products skip:

-   **Grounding plus human pre-send review** dropped factual errors to **0.1% of 3,617 drafted tutor messages** in the Google/Eedi deployment.
-   **Deterministic verification:** Khan Academy found that removing its math-verification agent doubled math errors, prompting immediate rollback (Module 5).

Design Requirement: Tier Generation by Stakes

**Never unreviewed for scored or credential-bearing content.** For live remediation: deterministic verification, grounding in authored solutions, a static fallback, and a visible label. This becomes the two-lane generation principle in Module 11 and the four guards in Module 13.

### Risk 2: Sycophancy

A tutor that validates errors is worse than no tutor — and current models are trained toward validation.

Anthropic's analysis shows RLHF-trained assistants systematically agree with users' stated beliefs, *even wrong ones*, because preference data rewards agreement. A user-suggested wrong answer cut model accuracy by **up to 27%** in testing.

Three pre-registered experiments (N = 3,285) confirm the demand side: users **prefer** sycophantic chatbots, while brief sycophantic interaction **increases overconfidence**.

The tension is structural, not incidental. Tuning models to be "warm and empathetic" makes them *less reliable and more sycophantic*, and OpenAI's April 2025 GPT-4o rollback shows engagement pressure pushing production systems this way in practice.

State It Plainly

The warm, encouraging persona users love is **the persona most likely to confirm a misconception at the exact moment correction matters**. And thumbs-up feedback data literally trains for flattery over truth.

Combine this with Module 2's feedback moderator (praise = d 0.24, high-information = d 0.99) and the conclusion is unambiguous: **praise must be calibrated to verified unaided performance**, the model must never confirm a stated misconception to be agreeable, and optimization must run on learning outcomes rather than preference signals.

### Risk 3: The Same AI Must Behave Differently by Stage

The final risk is distributional: **AI assistance is a lever for the prepared and a trap for the struggling.**

In Prather and colleagues' ICER 2024 study of novice programmers, students who already could succeed used generative AI to accelerate work they understood, while struggling students had known metacognitive difficulties compounded and *"finished with an illusion of competence."*

The pattern recurs throughout this course's evidence:

-   Error-detection ability moderates tolerance for hallucinated feedback (the N=252 RCT above).
-   Higher-baseline students gained most in the Nigeria RCT (Module 10).
-   Novices accept confident AI answers uncritically.
-   Correlational evidence (self-report, so directional only) links heavy AI use to lower critical-thinking scores, mediated by cognitive offloading and concentrated in the youngest users.

This mirrors the expertise reversal effect from Module 3 exactly: guidance that helps novices can hinder experts, and unguided freedom that suits experts harms novices. **A uniform AI experience therefore widens the gaps it promises to close.**

> **Warning:** And a "Better Conversation" Does Not Fix It
>
> A randomized experiment (N = 122, ages 14–16) found **Socratic AI produced richer dialogue than direct-answer AI with no measurable learning advantage**. Dialogue quality is an engagement metric unless it terminates in retrieval and unaided demonstration.

That last finding is worth sitting with, because "make the tutor more Socratic" is the most common proposed fix in the category. It is necessary and insufficient. The Bastani guardrail worked not because it was conversational but because it *refused to do the work* and was *grounded in teacher-authored solutions*.

### The Resulting Policy

For novices / low mastery

-   Maximal scaffolding
-   Mandatory attempt-first
-   Delayed AI availability
-   Never used as the error-detection layer

For verified competence

-   Acceleration and open interaction
-   Minimal contrastive hints over full examples
-   Reduced redundancy load
-   Reliance-decay patterns detected and interrupted

Note that this policy is only implementable if the system has a trustworthy mastery estimate to condition on. Which is Module 13's problem, and why Module 13 spends so long on why the estimate needs a confidence band.

### Risk Analysis Requires the Other Column

Two modules of documented harm invite the wrong conclusion. The evidence does not say AI cannot teach. It says **the risk is a design choice** — and the same literature contains substantial positive results, all sharing one structural property.

### Kestin et al. — and What Actually Made It Work

A pedagogy-engineered GPT-4 tutor at Harvard **more than doubled median learning gains** versus the institution's own best-practice active-learning classroom — in less time, with higher motivation.

Module 4 established the caveats on the magnitude (single-site, not pre-registered, immediate researcher-designed tests, elite students, authors' own generalization warning). But the *mechanism* is the transferable part, and it is unglamorous:

-   **Grounding the model in instructor-written solutions.**
-   **Sequencing problems stepwise** rather than letting the conversation wander.

The Sentence Worth Memorizing

A system prompt alone *"could not reliably provide enough structure."*

Compare with Module 1's GPT Tutor: the same two ingredients — teacher-authored solutions and per-problem grounding — in a completely different study, on a different continent, with different students. The convergence is the finding.

### Edo State, Nigeria: Cost-Effective at Scale

A six-week, **teacher-supervised** GPT-4 tutoring program in Edo State, Nigeria produced **+0.31 SD** on a combined assessment — among the most cost-effective education interventions measured.

Two things to hold together. First, +0.31 SD sits squarely inside Module 4's honest planning band, which is what a credible result looks like. Second, and less comfortably: **gains were largest for higher-baseline students**, foreshadowing the widening-gap problem from Module 9. A positive average effect can still be distributionally regressive.

### Tutor CoPilot: Augment the Human

Stanford's Tutor CoPilot RCT (~900 tutors, 1,800 students) shows a different and underexplored pattern — the AI coaches the *human tutor* rather than the student:

| Group | Effect on topic mastery |
| --- | --- |
| Overall | +4 percentage points |
| Lowest-rated tutors | +9 percentage points |

This is the inverse of the distributional problem: the benefit concentrated where capability was weakest, because the AI was upgrading the *helper*, not substituting for the *learner*. Worth noting when the obvious product move is always "put a chatbot in front of the student."

### The Rule the Whole Literature Supports

Harm appears when AI…

-   Substitutes for learner cognition
-   Provides complete solutions on request
-   Is available before an attempt
-   Is evaluated on assisted performance
-   Runs unreviewed in evidence-bearing content
-   Behaves identically for novice and expert

Gain appears when AI…

-   Structures effort the learner still performs
-   Gives hints grounded in authored solutions
-   Arrives after diagnosed failure
-   Is evaluated on unaided delayed performance
-   Is verified before it reaches the learner
-   Upgrades human capability (tutors, teachers)

The Whole Course in One Line

**Gains appear where AI structures learner effort or upgrades human capability. Harms appear where AI substitutes for learner cognition.** Everything in Modules 11–15 is machinery for staying on the right side of that line, and for detecting when you have drifted to the wrong side.

### What This Means for a Roadmap

The positive cases have an inconvenient property in common: **they are labor-intensive up front.** Instructor-written solutions. Teacher-authored misconception inventories. Human supervision. Per-problem grounding.

That is not a coincidence — it is the cost structure of keeping cognitive work with the learner while keeping content correct. A product that wants Kestin-scale results without Kestin-scale authoring is asking for the GPT Base arm. Module 12 is about making that authoring burden explicit and locating it precisely (in skill rubrics and concept graphs), rather than pretending it can be generated away.

### The Convergence Is Itself the Finding

Three independent bodies of evidence — replicated learning science (Modules 2–4), market failure modes (Modules 5–7), and documented AI harms (Modules 8–10) — point to the same seven commitments. Each is stated as a testable claim: **a design that violates any one inherits a documented failure mode.**

Each principle below carries three parts: *why* (its evidence anchor), what it **forbids**, and what it **demands**. The "forbids" column is the operational content — every prohibition names a pattern currently shipping in mainstream platforms.

### 1\. Verified Convenience

**Principle.** Every feature that makes learning easier — generated explanations, skips, hints, shortened paths — must ship with a scheduled, *unaided* proof moment that measures the same capability.

**Why.** Identical GPT-4-class models produce opposite outcomes depending purely on interaction architecture (−17% unaided exam under unguarded help; harm removed by hint-gating). The discriminator within a single study is behavioral: delegation-style use 24–39% versus 65–86% for engagement-style. Verification must be unaided *and* delayed, because current performance is an unreliable and sometimes inverse proxy for durable learning.

**Forbids:** any convenience feature justified by assisted practice metrics, session engagement, or satisfaction scores.
**Demands:** delayed AI-free retrieval as the north-star metric, and a proof mechanism specified *at design time* for every convenience feature.

### 2\. Auditable Adaptation

**Principle.** When the engine changes what a learner sees next — sequence, difficulty, remediation — the action is displayed with its reason, can be contested, and is written to an inspectable log.

**Why.** Three independent pressures converge. *Regulation:* the EU AI Act classifies adaptive learning pathways and learner assessment as Annex III high-risk. *Market history:* Knewton raised $180M+ on opaque "adaptive mystique" and was asset-sold for ~$10M. *Learning science:* open learner models improve learning and self-assessment accuracy, especially for novices — but the displayed model must never visibly contradict observed reality, since one disagreement damages whole-system trust. Calibrated transparency, not maximal disclosure, builds appropriate reliance.

**Forbids:** hidden re-sequencing, unexplained difficulty shifts, confidence displayed as certainty.
**Demands:** "why this item" explanations, re-plan notices, a contest path, and a display layer showing confidence bands rather than bare integers.

### 3\. Evidence-Emitting Structure

**Principle.** Every unit of the learning structure — lesson, level, module — must name the capability it builds *and* the assessment evidence it emits. **A unit that cannot name its evidence does not ship.**

**Why.** Enterprise measurement is in crisis because structures emit the wrong evidence: reaction surveys correlate with learning at r ≈ 0.09, and evaluation frameworks grade attendance and completion as inadequate. The fix is structural because the strongest techniques are structural — practice testing g ≈ 0.5–0.6, high-information feedback d = 0.99 vs 0.24. A level that embeds no retrieval with feedback makes those effects unavailable downstream.

**Forbids:** content-only lessons, seat-time completion as a success signal, "engagement" screens with no teach–check map.
**Demands:** a declared evidence contract per node — what it teaches, which check items prove it, where those items feed the mastery model.

### 4\. Mastery With Uncertainty

**Principle.** Mastery is a probabilistic estimate — a posterior with uncertainty, subject to decay, refreshed by re-checks — **never a percentage that only goes up**.

**Why.** The modelling evidence rules out the alternatives: deep knowledge tracing exhibits reconstruction and waviness failures; LLM-based tracing does not beat purpose-built models while costing 600–12,000× more; unconstrained Bayesian knowledge tracing produces degenerate fits. Decay is not optional — dropping items after first success collapses retention from ~80% to ~35%, and forgetting curves over 6M+ ALEKS assessments fall steepest in the first days before flattening at one to two weeks. Estimates must also admit failure states: 31–38% of student–skill pairs show "wheel-spinning" (no mastery after ten-plus attempts), requiring escape hatches rather than infinite drilling.

**Forbids:** absorbing mastery counters, fiat cut scores without standard-setting, single-event state changes.
**Demands:** confidence-banded posteriors, a decay layer, random unaided probe items, and revocable skips.

### 5\. Attempt-First, Scaffold-Second, Fade-on-Proof

**Principle.** A genuine learner attempt precedes any scaffold; scaffolds are removed contingent on demonstrated mastery *elsewhere*, never on a fixed schedule.

**Why.** Productive failure meta-analysis g = 0.36; attempted problem-solving before instruction creates the "time for telling." Scaffolding works (ḡ = 0.46, largest for adults) but its *removal* is the critical design act: fixed-schedule fading performed worse than no fading. Insertion is equally risky — expertise reversal means guidance that helps novices imposes redundancy load on experienced professionals, so remediation must be gated on global mastery evidence, not a single local error.

**Forbids:** default upfront worked solutions, calendar-based fading, single-error remediation triggers.
**Demands:** mastery-contingent fading, globally-gated remediation, and help policies A/B-tested against delayed learning outcomes rather than engagement.

### 6\. Two-Lane Generation

**Principle.** Generation runs in two lanes. **Lane 1** — anything that mints evidence (checks, assessments, credentialing items) — is authored or AI-drafted with *active human approval* before use. **Lane 2** — live remediation and practice — is generated on demand but verified, grounded, labeled, and **never used as gating evidence**.

**Why.** Unreviewed generated content fails at 16–45% rates (40% major errors in one AI-generated specialist exam versus zero expert-written), while verified pipelines show the ceiling: grounding plus pre-send human review held factual errors to 0.1% of 3,617 messages. Automation does not remove the audit burden — LLM judges match humans only about 80% of the time with documented position, verbosity and self-preference biases, and must be validated per deployment.

**Forbids:** live-generated content inside scored or credential-bearing checks; unlabeled generation.
**Demands:** human approval queues for Lane 1; solver-in-the-loop verification, static-hint fallback, provenance labels, and ~10% human audit sampling for Lane 2.

### 7\. Credentials as Evidence Chains

**Principle.** A credential is a chain — item evidence → applied check → structured defense → delayed re-verification — with explicit states, **not a record that an event occurred**.

**Why.** A badge minted at pass-time certifies the least trustworthy signal in the system, since momentary performance proxies learning poorly — while decay flattening at one to two weeks makes a delayed AI-free re-check both cheap and decisive. The market case is equally direct: 38% of hiring managers cannot tell what microcredentials prove, fewer than 1 in 700 hires were affected by skills-based hiring rhetoric, and employer choice experiments find no hiring-probability lift. The standards to carry such chains are ready (Open Badges 3.0 evidence field, W3C VC 2.0), as is the sector-endorsed produce-and-defend format, whose structured defenses reach reliability α 0.75–0.80 versus roughly 0.50 unstructured.

**Forbids:** artifact-only assessment, permanent badges minted at a single pass.
**Demands:** a spaced re-check near the one-to-two-week flattening point, evidence-linked credential payloads, and "time since last verification" displayed as a first-class signal.

### The Seven, Condensed

| # | Principle | Evidence anchor | What it forbids |
| --- | --- | --- | --- |
| 1 | Verified convenience | −17% unaided exam under unguarded help vs harm removed by hint-gating; delegation 24–39% vs engagement 65–86% | Convenience features justified by assisted-practice or satisfaction metrics |
| 2 | Auditable adaptation | EU AI Act Annex III high-risk; Knewton $180M → ~$10M; open-learner-model benefits; one contradiction damages whole-system trust | Hidden re-sequencing; unexplained engine actions; certainty theater |
| 3 | Evidence-emitting structure | Smile sheets r ≈ 0.09; adequate evidence starts at delayed retrieval; testing g ≈ 0.5–0.6 | Content-only units; completion as success |
| 4 | Mastery with uncertainty | DKT failures; constrained BKT gating at P ≥ 0.95; decay flattens at 1–2 weeks | Bare integers; absorbing mastery; unrevocable skips |
| 5 | Attempt-first, scaffold-second, fade-on-proof | Productive failure g = 0.36; fixed-schedule fading worse than none; expertise reversal | Default upfront solutions; calendar-based fading; single-error remediation |
| 6 | Two-lane generation | Unreviewed generation 16–45% errors; verified pipeline 0.1%; verifier removal doubled errors | Live generation in evidence-bearing checks; unlabeled generation |
| 7 | Credentials as evidence chains | Performance ≠ learning; <1 in 700 hires affected; produce-and-defend endorsed; structured defense α 0.75–0.80 | Event-record badges; artifact-only assessment; permanent pass-time minting |

Read as a System

These are not seven independent features. They are **one argument applied at seven layers**: every proxy the system optimizes — convenience, adaptation, mastery, generation, credentials — must be counterweighted by unaided, delayed, contestable evidence. They are mutually reinforcing: auditable adaptation (2) is only safe if mastery carries uncertainty (4), and evidence chains (7) only mean something if evidence-bearing objects come from the approved lane (6).

### The Three Anti-Principles

**Engagement-as-learning proxies** is the foundational error. In every documented failure case, the failing condition improved practice scores, artifact polish, session length and satisfaction while learning stalled or reversed — and telemetry shows ~47% of real student–AI conversations are low-engagement answer-seeking. *A dashboard that cannot show delayed unaided performance is measuring the harm.*

**Black-box mystique** — marketing adaptation as proprietary magic rather than inspectable policy — is the strategic error. It destroyed the sector's flagship company and is now legally untenable for high-risk educational uses in the EU.

**Gamification that controls rather than informs** is the motivational error. Gamification's cognitive effects are real (meta-analytic g ≈ 0.49), but badges and leaderboards *reduced* motivation in already-interested learners in controlled study over 16 weeks — precisely the enterprise demographic. The celebrated counter-case (IBM's reported 694% completion increase) is vendor-reported with no controls. The mechanism is overjustification: expected extrinsic rewards on engaging tasks undermine intrinsic motivation.

> **Tip:** The Resolution
>
> Badges must be **informational, hard-won and proof-gated** — competence information, not behavior-control instruments. No public leaderboards. Streaks are permissible purely as a return-behavior device (they work through loss aversion; Duolingo's large-scale but vendor-run experiments raised 7-day streak rates over 40% with easier-to-keep streaks). *A streak protects the habit; the badge state machine protects the meaning.*

### The Promise, and the Structural Claim

The concept's promise is one sentence: *name your goal, walk a path that proves itself, and leave with evidence a skeptical third party can inspect.*

"Name your goal" answers the persistence literature — adults who articulate concrete goals persist markedly longer (71% vs 45% completion with structured goal-setting), and MOOC learners declaring certificate intent certify at ~22% against a ~5% baseline. "Provable capability" answers the credential-trust crisis from Module 6.

The structural claim is that **adaptivity, assessment and credentialing only work if they share one data model**. Six levels, one contract:

The Contract

**Every level declares what it teaches and what evidence it emits.** That single rule lets instructors author into the structure learners walk, lets engines adapt without guessing, and lets badges cite their own provenance.

### Level 1 — Goal

The learner-named outcome, sharpened by an AI guide into an assessable target. Goal-setting theory adds a constraint most onboarding flows miss: **an *assigned* goal motivates as well as a self-set one provided the rationale is given.** The guide's job is therefore negotiation, not passivity.

And goals are revisited on schedule — adult goal-setting effects decay when treated as one-shot onboarding.

### Level 2 — Pathway

A route through a *directed graph of prerequisite concepts*, not a table of contents. The existence proof that such graphs carry real inferential weight at scale is ALEKS: an algebra domain of 350–500 problem types induces **millions** of feasible knowledge states, yet adaptive assessment locates a learner's state in **25–30 questions** — the graph inferring mastery of items never directly asked.

Two cautions temper the ambition:

-   **Item-to-concept mapping matters more than the tracing model.** Lumping two distinct skills into one node produces permanently plateaued estimates — a data-modelling error no algorithm can recover from.
-   **AI can draft the graph but cannot own it.** Current pipelines produce small, instructor-auditable drafts (one documented construction: 54 nodes, 47 edges, from 26 lecture PDFs) to be validated against response data.

Unlocking is *by proof*: the next skill opens when the current badge is minted — not when a schedule says so.

### Level 3 — Skill

The credential-bearing level. A Skill declares three things:

1.  An **operational definition** — what a holder can do, in which contexts.
2.  An **analytic scoring rubric** with behaviorally anchored dimensions.
3.  An **evidence contract** — what mints its badge: an applied check of artifact plus structured defense, followed by delayed re-verification.

Every concept inside the skill declares which rubric dimensions its items inform, so the applied check samples a space the lessons actually taught. **That makes the skill the join point between pedagogy and measurement** — not a container with a quiz at the end.

### Level 4 — Concept

The grain at which the learner model operates: one teachable idea, one probabilistic mastery estimate *with an explicit confidence band*, prerequisite edges, and a decay curve.

Three things the evidence forces here:

**The number must be a posterior, not an observed percentage.** Observed percentages conflate lucky guesses with knowledge and careless slips with ignorance.

**The bar must be honest about its status.** A fiat "70%" cut is psychometrically indefensible — though pooled modified-Angoff standard-setting studies (expert judges estimating the minimally competent learner's expected performance) land between roughly **61% and 78%**, so 70 works as a *rounded policy value* only if a lightweight standard-setting exercise per skill family stands behind it. The stronger option is to gate on the posterior itself: field conventions run **P(mastery) ≥ 0.95** for advancement, with 2025 evidence favoring **0.98** for performance on the *next* lesson.

**Mastery decays.** Without spaced retrieval the estimate visibly ages, because unverified knowledge is an assumption, not a fact.

### Level 5 — Lesson

One to three related concepts in a 10–15-minute unit with a *live route* — the check at step two decides step three.

Lessons are where insertion and fading become visible (*"Re-planned · a worked example was inserted · 2 min added"*) and where the two generation lanes meet: the authored spine is pre-approved content; inserted remediation is live-generated, verified and labeled. The small grain is what keeps the route legible — the learner can see which evidence moved which estimate.

### Level 6 — Item

The atom: one interactive element typed by **pedagogical function**, emitting **typed evidence**.

One format decision propagates through the whole psychometric stack: where the interaction allows, check and apply items favor **constructed response over multiple choice**. ALEKS made this choice deliberately — open-ended answers make "the lucky guesses common with multiple-choice questioning virtually non-existent," simplifying the guess/slip problem at the source. Where multiple choice is used, **distractors are authored from the concept's misconception inventory**, so a wrong answer is diagnostic rather than merely wrong.

### The Architecture Contract

| Level | Grain | Declares | Emits | Adapts by |
| --- | --- | --- | --- | --- |
| 1 Goal | One learner-named outcome | Target capability, rationale, review dates | Intent statement; sharpened outcome spec | Re-negotiation with AI guide |
| 2 Pathway | Route through concept graph | Prerequisite edges; unlock conditions | Entry-state diagnosis; re-plan events | Next-skill selection from graph + posteriors |
| 3 Skill | Unit of proof (2–6 concepts) | Operational definition; analytic rubric; evidence contract | Badge (provisional → durable) with evidence chain | Applied-check scheduling; defense protocol |
| 4 Concept | One teachable idea | Prerequisites; mastery posterior + band; decay curve; bar | Mastery estimate per item evidence | Next-concept selection; remediation trigger |
| 5 Lesson | 1–3 concepts, 10–15 min | Authored route; item sequence; insertion/fading rules | Route-completion events; re-plan log | In-lesson branching on check outcomes |
| 6 Item | One interaction, typed | Pedagogical function; misconception map; evidence type | Typed evidence (correctness, error class, latency, help used) | Item selection within function |

The table answers the question every adaptive system eventually faces: *what is the unit of adaptation, and what justifies each adaptive act?* Systems organized around courses can only adapt pacing. Because every level here both declares and emits, **adaptation happens where the evidence lives.**

It also locates the authoring burden honestly: rows three and four — skill rubrics and concept graphs — are where expert effort concentrates, and the literature is unambiguous that **graph quality, not model sophistication, bounds everything downstream**.

### The Item Taxonomy — and the Asymmetry That Matters

| Item type | Pedagogical function | Evidence emitted | Key design rule |
| --- | --- | --- | --- |
| Explainer (Explain) | Introduce one concept; manage load | Weak: exposure only — never updates mastery | Authored/approved (Lane 1); short segments |
| Quick check (Check) | Retrieval practice; diagnose misconception | Strong: correctness + error class per concept | Hinge design: distractors = named misconceptions |
| Worked example (support) | Convert failure into schema | Moderate: step engagement; prompt responses | Failure-triggered, verified, faded on transfer |
| Sandbox (Try) | Attempt-first application in a safe environment | Strong: artifact + process trace | Attempt precedes any support |
| Critique (Apply) | Transfer to a varied context; evaluative judgment | Strong: judgment quality vs rubric anchors | Context differs from teaching context |
| Applied check (Prove) | Certify the skill: artifact + defense | Decisive: rubric-scored artifact + defense transcript | Lane 1 rubric; AI-free conditions |
| Optional lecture (Reference) | Depth on demand | None — reference, not evidence | Clearly optional; never required |

Exposure Is Not Evidence

Explainers and lectures emit **no mastery evidence at all** — a deliberate break from platforms where watching a video nudges a progress bar. Treating exposure as evidence manufactures exactly the fluency illusion Module 8 documented. Checks and attempts emit concept-level evidence; **only the applied check emits credential-bearing evidence**. No number of watched explainers mints a badge.

This asymmetry does two more jobs. It is the instructor's **authoring grammar** — a designer who cannot say which function an item serves has produced content, not pedagogy. And it makes the Lane 1 / Lane 2 boundary concrete: **only the support row may be live-generated**, and it emits no gating evidence.

### One Question, One Answer

The lesson loop operationalizes Principle 5. It answers a single question: *in what order should a learner encounter explanation, retrieval, application and help?*

The evidence gives a specific answer. Explanation is always followed by retrieval. Application is attempted before support. Support arrives only after diagnosed failure. Support is withdrawn only after demonstrated transfer.

THE LESSON LOOP ┌───────────────────────────────┐ │ EXPLAINER │ Lane 1: authored, pre-approved └───────────────┬───────────────┘ ▼ ┌───────────────────────────────┐ │ QUICK CHECK │ recall-first, misconception-keyed └───┬───────────┬───────────┬───┘ │ │ │ correct wrong: wrong: likely slip, │ systematic high global mastery │ misconception │ │ │ ▼ │ ▼ ┌──────────────────┐ │ ┌─────────────┐ │ MINIMAL │ │ │ STRUGGLE │ │ CONTRASTIVE HINT │ │ │ BUDGET │ └────────┬─────────┘ │ └──────┬──────┘ │ │ budget exhausted │ │ ▼ │ │ ┌────────────────────┐ │ │ │ WORKED EXAMPLE │ │ Lane 2: solver-verified, │ │ generated, labeled │ │ grounded, self-explanation │ └──────────┬─────────┘ │ wrapped │ ▼ │ │ ┌──────────────┐ │ │ │ ISOMORPHIC │◄──────┘ │ │ RE-CHECK │ │ └──────┬───────┘ │ │ ▼ ▼ ┌───────────────────────────────┐ │ SANDBOX / TRY │ attempt-first application └───────────────┬───────────────┘ ▼ ┌───────────────────────────────┐ │ CRITIQUE / APPLY │ varied context, transfer └───────────────┬───────────────┘ ▼ concept posterior over bar, with confidence? ┌──────┴──────┐ yes no ──► back to STRUGGLE BUDGET │ ▼ ┌───────────────────────────────┐ │ FADE inserted support │ the self-explanation prompt stays │ → next concept in route │ └───────────────┬───────────────┘ ▼ APPLIED CHECK at skill end: produce and defend

▶ 12s The loop, animated — the pulse fails the verify gate once and routes back to a fresh attempt, then passes. Support never arrives before the attempt.

### Recall-First Checks With High-Information Feedback

Every explainer is followed immediately by a recall-format quick check — the most replicated decision in the architecture (practice testing g ≈ 0.5–0.6, larger for recall than recognition). The check does double duty: a learning event *and* the evidence stream the engine routes on.

Its feedback is high-information — what was wrong, why, what next — reaching d = 0.99 against 0.24 for praise and punishment. **A generated "Good try!" is a defect**, not a nicety.

Checks are built as **hinge questions**: items placed where the next step depends on the answer, with each distractor mapped to a *named misconception* so the wrong answer says *why*. The misconception inventory is authored content — and it doubles as the grounding document for any generated remediation.

### Attempt-First, With a Budget

Application items are always attempted before worked support appears. Problem-solving-before-instruction beats instruction-first at g = 0.36 (0.37–0.58 under high fidelity), concentrated in older learners and domain-specific concepts — the enterprise demographic.

But struggle is *budgeted, not romanticized*. The assistance dilemma has no closed-form optimum, so it is operationalized as a small, visible budget: **one genuine attempt plus one prompted retry** — an A/B-testable policy evaluated against delayed transfer, not a product constant.

### Generated Remediation: Four Guards

The boldest move in the concept is that a missed check visibly re-plans the route and inserts a worked example that was never in the authored lesson. It is also the highest-risk component (Module 9: 16–45% error rates, and error diagnosis is the model's weakest capability).

Four guards make it survivable:

1.  **Verify before insert.** Any maths, code or data example is checked by a deterministic solver or rule-based verification agent before display — the pattern Khan Academy productionized, where removing the verifier doubled errors.
2.  **Ground in authored solutions.** Generation is conditioned on the authored solution and misconception map — the hallucination-control method behind the field's most-cited positive trial. The best-documented production error rate (0.1% of 3,617 messages) combines grounding with 100% human pre-send review.
3.  **Degrade gracefully.** Live generation fails at runtime roughly **one call in seven** in field deployments, so a static authored hint always sits behind the generated one.
4.  **Label and audit.** Every Lane 2 item carries a "Generated" label — also the posture EU AI Act Article 50 effectively requires from August 2026 — plus one-tap error reporting and post-hoc expert sampling audits.

Unverified generated content **never serves as gating evidence**. Unverifiable artifacts are discarded, or converted into deliberately flagged "find the flaw" items — *unflagged* erroneous help confuses; *flagged* erroneous examples can teach.

### Two More Guards From the Learner Model

**Expertise gating.** Guidance that rescues a novice imposes redundancy load on a credentialed professional. Insertion decisions therefore weight the *global* concept posterior and error pattern: one failed check from a high-mastery learner earns a minimal contrastive hint, not a beginner example.

**Self-explanation wrapping.** A merely *read* worked example is near-inert, so every inserted example ends in a constructive demand — predict the next step, explain why the 98% accuracy figure was misleading — leveraging the self-explanation effect (g ≈ 0.46–0.55).

### Fading: The Critical Design Act

Inserted support is withdrawn on **one condition**: the learner demonstrates the concept *elsewhere*, on a non-isomorphic item. Fading on a fixed schedule produced worse cognitive outcomes than never fading; performance-contingent fading is the defensible policy.

"Demonstrated elsewhere" must mean *transfer*, not an immediate re-test — which only indexes temporary retrieval strength. And removal is never silent: **the self-explanation prompt stays behind.** Fading is also the structural answer to metacognitive laziness, which makes the fade criterion a *product invariant*, not a settings toggle.

### The Learner Model: Interpretable, or Nothing

Three requirements select the technology: every displayed number must have a defensible meaning; the model must never visibly contradict observed reality; every adaptive act must be explainable from the model's state.

The engine of record is an interpretable probabilistic model — **constrained Bayesian Knowledge Tracing** (a two-state hidden Markov model per concept with four readable parameters: prior, learning rate, guess, slip) or an Elo-family online rating model with explicit uncertainty.

Each fashionable alternative fails a documented requirement:

| Approach | Documented failure |
| --- | --- |
| Unconstrained BKT | Degenerate parameters — slip rates above 50%, implying knowers answer wrong more often than right — in roughly three-quarters of skills. Constrained estimation eliminates it. |
| Deep knowledge tracing | Estimates that can fall after correct answers — on-screen incoherence — with a small, unstable predictive edge over enhanced BKT and logistic models. |
| LLMs as trackers | Purpose-built models beat GPT-4-class LLMs at 600–12,000× lower deployment cost; even fine-tuned LLMs top out at parity with BKT. |

The LLM's Role, Delineated

**It elicits, explains and authors. It never tracks.** Where dialogue adds evidential value, the LLM conducts the elicitation — but its output enters the model as typed item evidence. The probabilistic engine alone owns the estimate.

### Posterior, Band, Decay

What the learner sees per concept is not "56%" but a mastery posterior with a confidence band — the probability the concept is mastered, *plus how much evidence stands behind it*.

The band does real work. Adaptive testing reaches reliability ≈ 0.9 in 4–12 items, and tracing models are near-chance for a new learner's first ten interactions. Early estimates are *legitimately* low-confidence, and the honest interface says so with wide bands and provisional language.

Layered on top is **decay**. Classic BKT mastery is absorbing — it silently overstates stale knowledge. The correction follows production precedent: a half-life-style forgetting component per concept (Duolingo's HLR cut recall-prediction error by at least 45% on 12.7M sessions), displayed as a visibly aging estimate. The scheduling anchor remains the ALEKS corpus: steepest decay in the first days, flattening at one to two weeks, with concepts exercised as prerequisites decaying slowest.

### Three Failure Guards

-   **Wheel-spinning escape hatches.** Roughly **31–38%** of student–skill pairs fail to reach mastery in ten opportunities under standard criteria. Struggle triggers prerequisite backtracking, alternate representations and human escalation — not infinite drilling.
-   **Unbiased evidence.** The selection policy shapes the data the model fits on, and documented feedback loops (rapid guessing corrupting the estimates that governed mastery) mean a stream of *randomly selected probe items* must be reserved — the ALEKS "extra problem" technique — so the evidence base is never fully determined by the adaptive policy.
-   **Gaming detection.** Frequent gamers learn roughly **two-thirds as much** as comparable non-gamers, so gaming signatures (systematic rapid guessing, help abuse) are monitored and excluded from evidence.

### Calibrated Transparency, Not Maximal Disclosure

The "Why this item" panel, re-plan notices and adaptation log are Principle 2 made concrete — and open-learner-model research says they are pedagogically *active*, not cosmetic. Classroom experiments show open learner models causally improve learning and self-assessment accuracy, **strongest when a visible model is paired with shared control over task selection**. The pairing matters because raw learner control alone has an essentially zero meta-analytic effect (g = 0.05).

Persuadable, Not Editable

A learner who disputes a path decision can **contest** it. The engine presents its evidence. The learner persuades it the only way that counts — *by demonstrating competence on a short probe*. Learners rate persuasion more trustable than editing, and a single visible disagreement between model and reality damages trust in the whole system.

Transparency is *calibrated*. Moderate transparency protects trust after expectation violations while excessive transparency erodes it; in automated-scoring studies, lengthy explanations were rated overwhelming and moved neither trust nor motivation. So the explanation stack is layered: **one-sentence rationale inline, expandable evidence, full log behind**. Every log entry carries trigger evidence, a human-readable rule, the consequence and a contest path — but never exploitable thresholds.

Where the learner holds a control, its consequence is shown as a *what-if* display — the pattern that produced the strongest trust gains in controlled experiments. Confidence bands and occasional visible corrections are trust infrastructure, not UX garnish: **explanations must be able to calibrate trust downward.**

### The Design Problem in One Sentence

**Artifact quality and understanding have decoupled in the AI era, so a credential minted from an artifact alone certifies the wrong thing.**

Module 8 supplied the concrete case: in a documented AI/ML course, polished submissions repeatedly could not be explained by their own authors under live questioning. The answer here is a three-part pipeline — produce-and-defend applied checks, guardrailed AI judging, and a badge state machine that certifies *durability* rather than the moment of performance.

### Produce and Defend

Each skill ends with an applied check: the learner produces an artifact and defends it in a structured dialogue.

The format tracks the authentic-assessment literature's three dimensions — realism, cognitive challenge, and *evaluative judgment* — and the defense supplies the third, which artifact-only tasks lack. It is also the integrity layer, and this is now sector doctrine: the Australian regulator-endorsed **dual-track assessment model** reserves trustworthy summative judgment for secured, interactive formats and treats open AI-assisted work as *learning, not evidence*.

The protocol is **structured**, not conversational — standardized questions per rubric dimension:

-   Justify a design choice.
-   Name the weakest assumption.
-   Respond to a counter-case.

Why Structure, Specifically

Structure is what makes oral assessment reliable: **α ≈ 0.75–0.80 structured versus ~0.50 unstructured**, and analytic scoring beats holistic. An unstructured "tell me about your work" conversation is not an assessment instrument — it is an interview.

### LLM-as-Judge: Neither Blind Trust Nor Refusal

Scaling defenses requires AI scoring, and the evidence justifies a guardrail stack rather than a verdict either way:

-   GPT-4-class judges reach roughly **80% agreement** with human preferences.
-   They carry documented **position, verbosity and self-preference** biases.
-   On expert-level tasks, SME–LLM agreement has measured as low as **64–68%**.

That suffices for formative feedback. It does not suffice for an unsupervised credential gate. The stack:

1.  **Locked rubrics** — versioned and frozen at assessment time.
2.  **Evidence-before-score** — the judge must extract and cite artifact and transcript evidence per dimension *before* assigning any level.
3.  **Coarse scales** — dimensions scored 0–4 and mapped arithmetically to any 0–100 display, because human–LLM alignment is highest on coarse scales and collapses on direct 0–100 scoring.
4.  **Cross-family second judges** on borderline cases.
5.  **~10% stratified human audit**, with judge–human agreement tracked per dimension and high-disagreement cases routed to humans *before* any badge mints.

The judge is validated against human experts on the platform's own artifacts before deployment — never assumed from public benchmarks.

> **Warning:** One Absolute Exclusion
>
> **AI-text detectors are never used for gating.** They flagged **61% of non-native writers' genuine essays** as AI-generated in controlled testing. A tool with that false-positive profile cannot touch a credential decision.

▶ 12s The state machine, animated — the badge converts only after a spaced AI-free re-check, and can fall back to Decayed when its evidence expires.

### The Badge State Machine

The obvious design mints the badge when the applied check passes. The memory literature says that is *the least trustworthy moment to certify*: performance at acquisition indexes temporary retrieval strength, and dropping practice items after first success collapses delayed retention from ~80% to ~35%.

Combine that with the ALEKS decay curve — steepest in the first days, flattening at one to two weeks — and the implication is precise: **a re-check at the flattening point is cheap and certifies what a pass-moment check cannot.**

Provisional → Durable → Decayed → Re-verified · Lapsed

BADGE STATE MACHINE applied check passed (artifact + defense) │ ▼ ┌─────────────────┐ re-check ┌───────────┐ │ PROVISIONAL │ failed twice │ LAPSED │ │ ├───────────────►│ │ └────────┬────────┘ └─────┬─────┘ │ │ spaced AI-free re-check applied check re-taken passed at 1–2 weeks │ │ │ ▼ │ ┌─────────────────┐ │ ┌─────►│ DURABLE │◄─────────────────────┘ │ └────────┬────────┘ │ │ retention interval elapsed │ │ without re-verification │ ▼ │ ┌─────────────────┐ └──────┤ DECAYED │ └─────────────────┘ re-verification passed DURABLE also loops to itself on scheduled periodic re-verification, paced by the concept decay curve.

| State | Entry condition | What it certifies |
| --- | --- | --- |
| Provisional | Applied check passed: rubric-scored artifact + structured defense | Demonstrated performance at a point in time, under AI-free conditions |
| Durable | Spaced AI-free re-check at 1–2 weeks passed | Retained capability after forgetting has had time to act — the state employers should read as "skill" |
| Decayed | Retention interval elapsed without re-verification | Formerly durable skill; the evidence has expired, not the learner's history |
| Re-verified | Re-verification check passed from Decayed | Current capability restored; resets the decay clock |
| Lapsed | Re-check failed twice | Provisional claim withdrawn; pathway re-opens the skill — the honesty mechanism |

Three Consequences

**Decayed is not punitive.** It distinguishes "never demonstrated" from "demonstrated, now stale," and the way back is a short re-verification, not a repeated course.

**Lapsed keeps the system honest.** A badge that cannot be lost is attendance certification with extra steps. The *possibility* of lapsing is what makes Durable informative.

**The wallet display changes.** Badge, state, and *time since verification* — which answers the question employers actually ask ("what can this person do *now*?") and that completion records cannot.

### Prior Learning: Triage, Never a Terminal Judgment

A tempting convenience is letting a prior badge plus a short check-in skip an entire skill. Recognition-of-prior-learning doctrine across jurisdictions demands evidence be **valid, sufficient, authentic and current**, using multiple evidence types — and even validated "short" screening instruments run around **24 items**. Four questions cannot certify six hours of skill; they produce false positives (certified incompetence) and false negatives (resentful experts).

The refinement keeps the convenience and changes its epistemics. The *prior credential's evidence* does the heavy lifting; the check-in is an **adaptive triage**:

-   **Pass confidently** → the skill is skipped, *revocably*.
-   **Land borderline** → route directly to the skill's *applied check* — take the proof, skip the lessons.
-   **Fail** → the full skill opens, with no penalty.

Skips are audited: a sample of skipped learners is re-probed later, and skip accuracy is tracked as a platform health metric. **The asymmetry is deliberate** — a false negative (an expert re-takes a check) is recoverable; a false positive is not.

The convenience is worth protecting: prior-learning credit is associated with **22-percentage-point higher credential completion across 230,000 adult students**. And the rule generalizes the whole course: *the skip survives because the proof mechanisms would catch it failing.*

### The Skills Wallet

The architecture is settled by standards; the business case by realism.

Open Badges 3.0 (final June 2024) is a W3C Verifiable Credential, and VC 2.0 became a full W3C Recommendation in May 2025 — providing offline cryptographic verification, selective disclosure and revocation via status lists. Every badge is issued as an OB 3.0 credential with **evidence fields populated**: artifact reference, rubric and criteria, defense provenance, verification state, skill-framework alignment. Verification never depends on the issuer's servers staying up — the failure mode that killed the hosted-badge generation's wallets.

> **Warning:** On Portability: A Promise, Not a Product
>
> Skills-based hiring moved job postings but "not even 1 in 700 hires," and 57% of employers almost always look up a microcredential to interpret it. **The bottleneck is trust and governance, not cryptography.** Sell the *internal* ledger first — readiness heat maps, team formation, mobility — and treat OB 3.0 export as insurance for when the external market matures.

Credential-inflation guardrails apply from day one: **few badges, high minting cost, published rubrics, expiring states.** (The often-cited IBM figures — 694% completion increase, 2× retention when training is paired with recognition — are vendor-reported with no control groups. Useful as a directional signal, not as an effect size.)

### The Adaptive Engine Is Also the Principal Liability

Every lever that personalizes the experience optimizes a proxy — speed, ease, pass rate, motivation — and each proxy can diverge from the learning it serves. The assistance dilemma is therefore not a caveat but the design brief: **each engine action must be treated as a hypothesis about learning, instrumented so the hypothesis can fail.**

### The Risk Register

Read in four columns. *Proxy risk*: how the lever's target decouples from durable learning. *Unaided probe*: the detection mechanism — always a measurement taken without engine assistance. *Reversal path*: how the action is revoked when the probe fires.

| Adaptive lever | Proxy risk | Unaided probe | Reversal path |
| --- | --- | --- | --- |
| Content skipping | Short check-ins certify false mastery; RPL doctrine demands sufficient evidence and validated short instruments run ~24 items, not 4 | Check-in acts as triage only; uncertain results route to the full applied check; random audit sample of granted skips re-tested unaided | Skips are revocable — failed items on downstream concepts automatically re-open the skipped concept |
| Generated remediation | LLMs are weakest exactly at error diagnosis, the remediation use case; unreviewed items carry 16–45% error rates | Deterministic solver verifies each maths/code item before display; post-hoc expert sampling of live items | Static authored-hint fallback on generation or verification failure; the live lane never gates progression, credentials or analytics |
| Scaffold fading | Fixed-schedule fading produced worse outcomes than no fading; premature removal strands learners | Removal fires only on unaided demonstration of the concept elsewhere in the graph, never on time or exposure | Scaffold re-inserts on the next failed probe; the self-explanation prompt remains after the example vanishes |
| Visible mastery display | One visible contradiction damages trust in the whole system; visible rules invite gaming — frequent gamers learn ~2/3 as much | Randomly injected probe items outside the adaptive policy keep an unbiased evidence stream and surface gaming loops | Publish rationales and evidence, never exploitable thresholds; suppress incoherent updates from display; show bands, not bare integers |
| Badge incentives | Controlling or easily earned rewards erode intrinsic motivation in already-motivated adults; pass-time badges certify momentary performance | Provisional → spaced AI-free re-check at 1–2 weeks, where retention curves flatten; only re-verified badges reach Durable | Badges visibly enter Decayed, with re-verification as the path back; designs stay informational and proof-gated — no leaderboards, no badge quotas |
| Self-pacing | Pure self-pacing benefits only learners who allocate effort adaptively; maximum-flexibility schedules raise low-grade rates via procrastination | Planned-vs-actual cadence comparison; lagging learners get unaided progress checks before schedule drift compounds | Default stragglers into Guided mode, where the engine allocates effort — an artificial discrepancy-reducer for non-self-regulators |
| LLM judging | ~80% human agreement with position, verbosity and self-preference biases; SME–judge agreement falls to 64–68% on expert tasks | Rubric-locked coarse-scale scoring; cross-family judge panels; ~10% human audit calibrated against expert raters | No credential mints on LLM judgment alone; human-review escalation on contest; AI-text detectors banned from gating |

Three Features Matter More Than Any Row

**1.** Every probe is unaided and, where possible, delayed — the only evidence class that separates learning from performance.
**2.** The counter-lever is structurally identical across rows (verify unaided, gate globally, revoke cleanly), so *one* instrumentation layer — item-level event logging plus a reserved random probe stream — services the entire register.
**3.** Failure modes compound: a gamed mastery display feeds a false skip, which triggers mistimed remediation, which an unvalidated judge then certifies.

And the operational rule that follows: **audit the probes as a portfolio. If no probe has fired in a quarter, the probes — not the engine — are the first thing to inspect.**

### Governance: The EU AI Act as a Design Constraint

Regulation converts the register from good practice into legal obligation. **Annex III point 3** classifies AI systems that evaluate learning outcomes and use them to steer the learning process as *high-risk*. Because adaptive platforms profile learners, they **cannot use the Article 6(3) filter exception** to escape classification.

The obligations map directly onto the architecture already built:

| Obligation | Satisfied by |
| --- | --- |
| Art. 9 risk management | The risk register above |
| Art. 10 data governance + documented bias examination | Subgroup calibration audits (below) |
| Art. 11 technical documentation | Concept graph, rubrics, engine policy documentation |
| Art. 12 automatic event logging | The item-level adaptation log |
| Art. 14 human oversight | The Lane 1 approval queue and audit escalation |
| Art. 15 accuracy and robustness | Mastery-estimate validation (below) |

Capped by conformity assessment, EU database registration and post-market monitoring. The June 2026 Digital Omnibus moved the core Annex III deadline to **2 December 2027**, but the obligations themselves are settled. **Emotion recognition on students is prohibited outright** and has no place in the design.

**Article 50 provenance labeling** is the second load-bearing obligation, operationalized by the June 2026 Code of Practice: visible labeling of AI-generated content and machine-readable marking — with a key exemption where content has passed *human review under named editorial responsibility*. This maps cleanly onto two-lane generation. The instructor-approval lane, with shot-by-shot human sign-off and versioned provenance logs (model, prompt, reviewer, timestamps), qualifies for the editorial-responsibility exemption and exclusively carries credential-bearing content. The live lane is precisely what regulators expect to be labeled — the "Generated · not in the authored lesson" label is arguably legally required for EU deployment.

> **Warning:** The Automation-Bias Trap in the Approval Lane
>
> Passive approval degrades into rubber-stamping: **teacher-reviewers using AI authoring tools introduced *more* item-writing flaws** through automation bias. The approval interface must run automated flaw detection that *actively surfaces* suspect answer keys and distractors — a queue that only asks "approve?" will manufacture the errors it exists to catch.

The US policy anchor points the same direction: the Department of Education's first recommendation is a human in the loop, with AI that is inspectable, explainable and overridable.

The governance bottom line: **auditability is not overhead, it is the trust engine.** The adaptation log doubles as the Art. 12 record, the approval queue doubles as the Art. 14 oversight mechanism, and the probe stream doubles as post-market monitoring. Build them as one system and conformity assessment is a documentation exercise; bolt them on later and it is a rebuild.

### The North Star: What You Refuse to Optimize

The most consequential measurement decision is what the product *refuses* to optimize for. Everything observable in-session — accuracy, speed, streaks, completion, engagement scores — is *performance*, and performance during training is an unreliable, sometimes inverse index of learning.

The Case That Makes It Concrete

In a calculus field study, the spaced-practice condition scored **lower** on weekly quizzes and **higher** on the final criterial test. An analytics program pointed at immediate quiz accuracy would have selected the worse design.

So the north star is **unaided delayed performance**: what the learner can still do, without AI support, days to weeks later, on items and tasks not directly trained. The badge state machine makes this measurable rather than aspirational.

### The Metrics Stack, Graded by LTEM

| Tier | Metric reported | LTEM adequacy | Cadence |
| --- | --- | --- | --- |
| T1–3 Participation | Enrollment, completion, seat time, badges issued | Red zone — cannot validate learning | Continuous (ops) |
| In-session engagement | Session accuracy, streaks, cognitive-engagement score | Inadequate as efficacy evidence; validated leading indicator only | Per session |
| T4 Immediate retrieval | End-of-lesson checks | Certifies momentary performance, not learning | Per module |
| T5–6 Applied performance | Produce-and-defend applied check (provisional badge) | Adequate to certify learning success | At module completion |
| T4 Delayed retrieval | Spaced AI-free re-check; decay-adjusted mastery | Adequate — the durability gate at the 1–2-week flattening point | 1–2 weeks, then quarterly |
| T7 Transfer | Unseen item types, novel skill clusters, manager-verified work samples | Adequate — strongest learning evidence; report dimension-by-dimension | Quarterly |
| T8 Organizational | Team readiness, internal mobility, isolation-adjusted business impact | Adequate for results claims only with effect-isolation controls | Semi-annual |

Three rules follow. **Red-zone metrics are demoted, not deleted** — completion and badges remain useful operational telemetry but can never appear in an efficacy claim. **The cadence column is the hard part**: because learning metrics are inherently lagged, dashboards must make the lag legible (a concept reads "pending durability verification" until its re-check), or teams will drift back to the metrics they can move this sprint. And **the stack is the buyer-facing artifact** — publishing which LTEM tier each of your own metrics reaches converts the credibility gap into a differentiator.

### Experimenting Without Fooling Yourself

Khanmigo's program is the working template. Four elements transfer directly:

1.  The primary metric is a **learning-science construct** — cognitive engagement, adapted from the ICAP framework — chosen because prior efficacy research showed it predicts proficiency on *third-party* assessments.
2.  Subject-matter experts hand-labeled chat transcripts until **inter-rater agreement reached 85%**, then an LLM judge scaled the rubric to roughly 20% of conversations nightly.
3.  Randomization runs at the **conversation-thread level** — the pedagogically meaningful unit, not the user level.
4.  Guardrail metrics include non-desirable behaviors such as **giving the answer away**, plus verbosity and latency.

The cautionary counterexample is Duolingo: more than **750 A/B tests per quarter** on roughly 2.3 billion tracking events per day — an experimentation culture overwhelmingly optimized for engagement and retention. Notably, *Duolingo's efficacy claims do not come from that machinery.* They come from a separate in-house efficacy lab using third-party standardized assessments (ACTFL, Avant STAMP), because in-app metrics like XP and time-on-platform are gameable and correlate weakly with outcomes.

The Rule

**Delayed retention and far-transfer probes are guard metrics that no A/B winner may violate. Engagement is never sufficient evidence to ship.**

### Validating the Number You Display

The displayed mastery posterior is itself a product claim requiring validation:

-   BKT carries **irreducible error of roughly 1.4 practice opportunities** even at true parameters, and small-sample fits produce extreme, semantically degenerate parameters **up to 42%** of the time.
-   Published minimums: roughly **25 learners and six opportunities per skill** before estimates are trustworthy, with guess/slip parameters bounded so mastery cannot fall after correct answers.
-   Reported knowledge-tracing AUC is inflated by cold-start predictions driven by item popularity and cross-skill performance rather than mastery of the current skill — so evaluation must **separate the first two opportunities per skill from steady-state prediction**.

**The decisive external test:** does the displayed estimate predict held-out, delayed, third-party performance?

Two standing practices protect the evidence stream: reserve randomly selected probe items so the adaptive policy does not fully determine what gets measured, and **audit calibration within demographic subgroups quarterly** — a model can be globally accurate while systematically under-estimating one subgroup and silently throttling its pathway. That audit is simultaneously the Art. 10 bias-examination evidence. *Measurement is not overhead on the compliance budget; it is the compliance budget.*

### Publish the Targets Before the Results

| Target | Value | Why that number |
| --- | --- | --- |
| Effect size | d ≈ 0.3–0.5 on delayed, researcher-independent assessments | The band between the best-in-class ITS plateau (d ≈ 0.66–0.79) and the near-zero baseline of typical corporate e-learning |
| Normalized learning gain | ≥ 0.4, reported pretest-stratified | Against the ~0.23 Hake's 6,542-student study documented for passive instruction; normalized gain is statistically biased in favour of high-pretest populations, hence the stratification |
| Far transfer | Reported dimension-by-dimension: knowledge domain, physical and functional context, temporal delay | A century of transfer research shows undifferentiated "transfer effect sizes" are uninterpretable |

Public claims should be graded against What Works Clearinghouse-style evidence tiers, so buyers can see exactly how strong each causal warrant is.

> **Tip:** Where the Course Ends
>
> The OECD finds roughly 90% of edtech companies have no research evidence behind their learning claims. In a sector whose trust was destroyed by 2-sigma marketing, a vendor that pre-registers targets in the honest band, reports delayed and unaided outcomes, and labels the evidence tier of every claim is **not lowering expectations — it is the only player making a verifiable promise**. Realistic ambition, verified in public, compounds. Unverified ambition is what the market has already learned to discount.

An interactive course on the evidence behind AI-native learning · Built on *Learning That Proves Itself: AI-Native Learning Experiences, the Pedagogy Evidence, and a Concept Architecture for Verified Skill* (July 2026), and on Bastani, Bastani, Sungu, Ge, Kabakçı & Mariman, *"Generative AI without guardrails can harm learning: Evidence from high school mathematics,"* PNAS 122(26), 2025.

Figures and quotations are from those sources; effect sizes are reported with the source quality the originals attach to them. Educational summary · [← Back to all courses](index.html)