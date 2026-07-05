# AI Evals & Measurement — Building Trustworthy AI Products

## Module 1: Why Evals Are the Real Moat

Any team can call a frontier model. Almost nobody can tell you, with evidence, whether their last prompt change made the product better or worse. That gap is the moat. In the age of LLMs the model is a commodity you rent; your **understanding of what "good" means for your task, encoded as a measurement system, is the asset you own**. This module makes the case that evaluation is not a QA afterthought but the central discipline of building AI products — and lays out the mindset shift from vibes to rigor.

### The Vibes Trap

Most AI features start the same way: someone writes a prompt, tries five inputs by hand, the outputs "look good," and it ships. This is vibe-based development, and it fails silently in three predictable ways:

-   **Silent regressions.** You tweak the prompt to fix one bad case, and unknowingly break four others you never re-checked. With no eval suite, the breakage surfaces as a customer complaint weeks later — or never, as quiet churn.
-   **Prompt fragility.** LLM behavior is sensitive to wording, ordering, formatting, and model version. A change that helps on your three favorite examples can hurt on the long tail you never look at. "It worked when I tried it" is not a measurement.
-   **Model-swap roulette.** A new model drops (say you move from one Claude generation to the next). It's better on public benchmarks — but is it better on *your* task, your prompts, your edge cases? Without an eval you are guessing, and guessing wrong is expensive.

The deeper problem: LLM systems are **non-deterministic and high-dimensional**. The input space is effectively infinite natural language, and the same input can yield different outputs across runs. Manual spot-checking samples a vanishing fraction of behavior and gives a false sense of safety. The only durable answer is to make quality *measurable and repeatable*.

### Eval-Driven Development

The cure has a name and a clear analogy.

**💡 Eval-driven development (EDD)** is to AI products what **test-driven development** is to software. In TDD you write a failing test that pins down the behavior you want, then make it pass, and the test guards that behavior forever. In EDD you write an *eval* — a dataset of inputs plus a way to score outputs — that defines "good" for your task, then iterate prompts/models/retrieval against it. The crucial difference: software tests are **binary and deterministic** (pass/fail, same every run), while evals are often **graded and statistical** (a quality score, with variance across runs). So EDD borrows TDD's discipline but adds the machinery of sampling, scoring rubrics, and statistics. The mantra is the same: *if it isn't measured, it isn't real.*

In practice EDD reshapes the inner loop. Instead of "edit prompt → eyeball one output → ship," the loop becomes: **edit prompt → run against the eval set → read the score and the failures → decide**. A change is only an improvement if the number says so (and Module 7 covers how to read that number honestly). This converts prompt engineering from an art into an experimental science with a feedback signal.

### The Eval Flywheel

Evals are not a one-time artifact; they are a compounding asset. The teams that win run a flywheel that turns production experience back into measurement power:

```
THE EVAL FLYWHEEL

      ┌─────────────────────────────────────────────────┐
      │                                                 │
      ▼                                                 │
  PRODUCTION LOGS ──► curate interesting / failing ──► DATASETS
  (real traffic,        cases (mine the long tail)     (golden sets,
   user signals)                                        edge cases)
      ▲                                                     │
      │                                                     ▼
      │                                                  SCORERS
  SHIP IMPROVEMENTS ◄── prompt / model / retrieval ◄──  (heuristics,
  (with eval as gate)    changes validated by evals     LLM-judge,
                                                         human review)
```

Each turn of the wheel makes the next easier: more traffic surfaces more failure modes, which become eval cases, which make your scorers sharper, which lets you ship faster with more confidence, which earns more traffic. A competitor who only ships on vibes cannot catch a team whose measurement compounds. **The dataset of your hardest real-world cases is proprietary and hard to copy — it is the durable advantage.**

### The Cost of Not Measuring

Quantify the downside to make the case to leadership. Without evals you pay in: (1) **incident cost** — regressions found by users erode trust and generate support load; (2) **velocity cost** — every change becomes scary because nobody can predict its blast radius, so teams freeze; (3) **opportunity cost** — you can't safely adopt cheaper or faster models because you can't prove they're good enough; and (4) **decision cost** — debates get settled by whoever argues loudest rather than by data. A modest investment in evals (a few dozen cases and a scorer) converts all four into a number you can act on.

**🏷️ The opinionated take:** Start your eval before you optimize your prompt. The most common mistake is spending a week hand-tuning a prompt against vibes, then building an eval and discovering the "improved" prompt was worse. Flip it: spend the first day building a tiny eval set, and let every subsequent change be judged by it. You will move slower for one day and far faster forever after.

## Module 2: Anatomy of an Eval

"Eval" is an overloaded word. Before building one you need a precise mental model of its parts and a taxonomy of the kinds you'll build. Get the vocabulary right and the rest of the course clicks into place.

### The Four Parts of Every Eval

Every eval — from a one-line unit test to a full benchmark — decomposes into the same four components:

1.  **Task definition.** What is the system supposed to do, and what does "good" mean? This is the spec: the input contract, the desired output, and the dimensions of quality (correct? grounded? safe? concise? in the right format?). Vague task definitions produce useless evals — most eval projects that fail, fail here.
2.  **Dataset.** The collection of examples (inputs, often paired with reference outputs or labels) the system runs against. Covered in depth in Module 3.
3.  **Metric.** The number(s) you report — e.g., accuracy, pass rate, mean rubric score, win rate vs. a baseline. The metric is what you compare across versions.
4.  **Scorer.** The mechanism that turns one (input, output) pair into a score: exact match, a regex, a code assertion, an LLM judge, or a human. Covered in Modules 4-5.

A frequent confusion is collapsing **metric** and **scorer**. The scorer grades a single example; the metric aggregates scores across the dataset. You can hold the scorer fixed and report several metrics (mean, p10, pass-rate, per-segment breakdown), and choosing the right aggregation is a real decision, not a formality.

### Golden Sets vs. Live Traffic

Two sources feed eval datasets, and they answer different questions:

-   **Golden / reference sets** are curated, stable, labeled collections you control. They give **reproducibility** — the same cases every run — so you can compare version A to version B fairly and gate releases. The risk is staleness: a frozen golden set drifts away from what users actually do.
-   **Live traffic** evals run scorers over a sample of real production requests. They answer "how are we doing right now, on the real distribution?" and catch drift the golden set misses — but you usually lack ground-truth labels, so you lean on reference-free scorers (Module 5) and proxy signals (Module 6).

Mature teams run both: a golden set as the *regression gate*, and live-traffic monitoring as the *early-warning radar*. The flywheel (Module 1) is exactly the pipe that promotes interesting live cases into the golden set.

### Three Kinds of Eval by Purpose

Conflating these leads to measuring the wrong thing. Keep them distinct:

-   **Capability evals** ask "how good is the *model* at a skill?" — reasoning, coding, extraction, translation. These are usually model-centric, benchmark-style, and reference-heavy. Public leaderboards live here.
-   **Product evals** ask "how good is *our system* at *our job*?" — the whole pipeline including prompt, retrieval, tools, and post-processing, measured on your real task and your distribution. This is where most of your effort belongs; a model that tops every benchmark can still be bad at your specific job.
-   **Safety / guardrail evals** ask "does the system avoid harmful, non-compliant, or out-of-policy behavior?" — refusals, PII leakage, jailbreak resistance, toxicity, prompt-injection robustness. These are often **asymmetric**: a single bad output can be unacceptable, so you care about worst-case and tail behavior, not average score.

### Assertions vs. Graded Quality

There are two fundamentally different shapes a scorer can take, and good eval suites use both:

-   **Unit-test-style assertions** are binary and objective: "the output is valid JSON," "it contains the order ID," "it never returns a phone number," "the function it generated compiles." These are cheap, deterministic, and perfect for hard constraints and guardrails. Treat them like CI tests — any failure blocks.
-   **Graded quality** is continuous and subjective: "how helpful, accurate, and well-written is this answer on a 1-5 rubric?" These capture the things that matter most but resist binary checks, and they require a grader (human or LLM judge) plus statistics to interpret.

A practical pattern: gate hard constraints with assertions (fast, strict), and track soft quality with graded scores (rich, statistical). Don't try to force fuzzy quality into a brittle regex, and don't waste an LLM judge on checking JSON validity.

| Eval type | Question it answers | Typical scorer | Reference needed? | When to reach for it |
| --- | --- | --- | --- | --- |
| Capability | How good is the model at a skill? | Exact/heuristic match, model-graded | Usually yes (gold answers) | Model selection, tracking frontier progress |
| Product | How good is our system at our job? | LLM-judge + assertions on your task | Often partial / reference-free | The daily driver — gating product changes |
| Safety / guardrail | Does it avoid bad behavior? | Assertions, classifiers, red-team judge | Policy-defined, not gold-answer | Anything user-facing or regulated |
| Assertion (unit) | Does it satisfy a hard constraint? | Code: exact match, regex, schema check | No (rule-based) | Format, required fields, forbidden content |
| Graded quality | How good is it, on a spectrum? | Rubric via human or LLM judge | Sometimes (reference helps) | Helpfulness, tone, faithfulness, style |

**💡 Design tip:** Write the task definition as if briefing a careful human contractor who has never seen your product. If you cannot describe "good" clearly enough for a stranger to grade outputs consistently, neither a human annotator nor an LLM judge will be consistent either — and your metric will measure your own ambiguity rather than the system's quality.

## Module 3: Building Eval Datasets

The dataset is where most of the leverage — and most of the failure — lives. A brilliant scorer over a bad dataset measures nothing; a simple scorer over a well-chosen dataset is gold. This module is about sourcing, structuring, and growing the examples your evals run on.

### Start Tiny, Then Grow

The single most important piece of advice: **start with 20-50 examples, not 2,000**. A small, hand-curated set that you have personally read is worth more than a giant scraped one you've never inspected, because you actually understand its failures. A tiny set is enough to catch gross regressions and to force you to define "good" concretely.

**🏷️ The growth path:** 20-50 cases to bootstrap and pin down the task → ~100-300 as you mine production for the failure modes that matter → a few thousand only once you need to detect small deltas (Module 7 explains why detecting a small improvement requires a large N). Grow the dataset in response to *real bugs*: every production incident becomes a new eval case so that bug can never silently return. The dataset should be a living scar-tissue record of everything that's ever gone wrong.

### Sourcing Examples

-   **Real traffic (best).** Sample actual production requests. This is the true distribution and surfaces inputs you'd never imagine. Mine logs for failures, low user-satisfaction signals, escalations, and high-frequency intents. Scrub PII before anything lands in an eval set.
-   **Synthetic generation (fast).** Use an LLM to generate inputs — useful before you have traffic, for covering rare scenarios, and for adversarial cases. The danger: synthetic data reflects the generating model's blind spots and tends to be cleaner and more uniform than reality, so it can flatter your system. Treat synthetic data as a supplement to real traffic, not a replacement, and always have a human review a sample.
-   **Hand-authored (precise).** Experts write targeted cases for known-hard situations and specific requirements. Low volume, high signal — ideal for edge cases and regression pins.

### Stratification & Coverage

A dataset is only as good as its coverage of the situations you care about. An eval that's 95% easy happy-path cases will report a high score while your product fails exactly where it matters. Deliberately **stratify**:

-   **By segment:** language, locale, user tier, device, intent type, document type. Aggregate scores hide per-segment failures (this becomes a Simpson's-paradox trap in Module 7).
-   **Edge cases:** empty inputs, very long inputs, ambiguous requests, multilingual, malformed data, out-of-scope asks.
-   **Adversarial cases:** prompt injections, jailbreak attempts, trick questions, inputs designed to elicit confident-but-wrong answers (hallucination bait).
-   **By difficulty:** keep a mix; if everything is trivial you can't see improvement, and if everything is brutal you can't see regression.

Track coverage explicitly — a simple table of "scenario × count" — so gaps are visible. The question is never just "what's the score?" but "the score *on what distribution?*"

### Leakage & Contamination

**⚠️ Contamination silently inflates every number.** Two failure modes to guard against. (1) Train/eval leakage within your own loop: if you tune prompts against the same cases you report scores on, you overfit to them — the eval becomes a memorization test and stops predicting real-world performance. Keep a held-out set you never look at during iteration. (2) Pretraining contamination: if your eval examples (e.g., a public benchmark or a well-known dataset) were in the model's training data, the model may have effectively memorized the answers, so a high score reflects recall, not capability. Prefer fresh, private, recent examples — ideally drawn from your own traffic — over famous public sets when you want a trustworthy product signal.

### Labeling & Inter-Annotator Agreement

If your eval needs reference labels or human quality judgments, the labels themselves must be trustworthy. The way you check this is inter-annotator agreement (IAA): have two or more people independently label the same items and measure how often they agree, correcting for chance with a statistic like **Cohen's kappa** (κ). The logic is sharp and often missed: **if expert humans can't agree on what "good" means, no scorer can be more reliable than that ceiling, and your task definition is too vague.** Low IAA is a signal to fix the rubric and the task spec — not to push forward. (The same κ machinery reappears in Module 5 to validate an LLM judge against humans.)

### Freshness & Drift

Datasets rot. User behavior shifts, new features change the input distribution, the world changes (new products, events, slang). A golden set assembled a year ago may no longer represent today's traffic — this is dataset drift. Counter it by continuously refreshing from live traffic (the flywheel), versioning your datasets, and periodically re-auditing whether the set still mirrors production. An eval that doesn't evolve becomes a comforting lie.

**💡 Practical starter recipe:** Pull 30 real requests from logs, hand-label the desired behavior for each, and add 10 deliberately nasty edge/adversarial cases. That 40-case set, versioned in your repo, is enough to start eval-driven development today. Add a new case every time something breaks. Do not wait for a "complete" dataset — it never arrives, and the small one already pays for itself.

## Module 4: Scoring Methods

The scorer turns an output into a number. Choosing the right scorer for each dimension of quality is the craft at the center of evals. This module is a taxonomy of methods, when each fits, and where each lies to you.

### The Scoring Taxonomy

#### 1\. Deterministic / heuristic scorers

Rule-based, code-only, no model in the loop. Cheap, instant, perfectly reproducible — reach for these first whenever the thing you want to check is objective.

-   **Exact match** — output equals the reference string. Great for classification labels, multiple-choice answers, canonical IDs. Brittle for free text (`"Paris"` vs `"Paris, France"` both correct but unequal).
-   **Regex / substring / fuzzy match** — checks for required content or patterns; more forgiving than exact match but still rule-bound.
-   **Structural validity** — is it valid JSON? Does it conform to a `JSON schema`? Does it have the required fields? Indispensable for tool-calling and structured-output products, and trivially automatable.
-   **BLEU / ROUGE** — n-gram overlap metrics from machine translation and summarization. They measure surface word overlap with a reference. **Use with great caution:** they reward lexical similarity, not meaning — a correct paraphrase scores low, a fluent-but-wrong answer with overlapping words scores high. They predate good semantic methods and correlate weakly with human judgment on open-ended tasks. Acceptable as a cheap rough signal for narrow, reference-rich tasks; misleading as a headline quality metric.

#### 2\. Code-based assertions

Programmatic checks of properties: "the generated SQL runs and returns the right row count," "the code passes these unit tests," "the answer's number matches the computed ground truth," "no forbidden token appears." This is the most reliable scorer available *when the property is checkable in code* — and it's the backbone of agent and code-gen evals. If you can express "correct" as a function, do it; nothing beats it for trustworthiness.

#### 3\. Model-graded (LLM-as-judge)

Use an LLM to grade an output against a rubric or reference. This unlocks scoring of fuzzy, open-ended quality (helpfulness, tone, faithfulness, coherence) that resists code. It scales far cheaper than human review. It is also the most error-prone method and carries its own biases — important enough that all of Module 5 is devoted to doing it right.

#### 4\. Human evaluation

People rate or compare outputs. The gold standard for nuanced quality and the ultimate ground truth against which every automated scorer is validated. Costs: slow, expensive, hard to scale, and subject to its own inconsistency (hence inter-annotator agreement, Module 3). Use humans to (a) build reference labels, (b) calibrate and audit your LLM judge, and (c) make final calls on the highest-stakes or most-ambiguous cases — not to grade every run.

### Pointwise vs. Pairwise

An orthogonal and important choice: *how* you ask for the judgment.

-   **Pointwise (absolute):** score one output on its own — "rate this 1-5." Simple, gives an absolute level, supports per-example thresholds. But absolute scores are noisy and drift: a "4" today may not mean a "4" next month, and graders anchor inconsistently.
-   **Pairwise (relative / A-B):** show two outputs (e.g., new version vs. baseline) and ask which is better. Humans and LLM judges are **far more reliable at relative comparisons than absolute ratings** — "is A better than B?" is an easier, more stable question than "is A a 7/10?". Pairwise yields a **win rate**, which is ideal for "did my change help?" The cost: it tells you direction, not absolute level, and pairwise comparisons can introduce **position bias** (Module 5).

Rule of thumb: use **pairwise** when comparing two system versions (the most common real question), and **pointwise** when you need an absolute bar to clear (e.g., a guardrail threshold or a per-example pass/fail gate).

### Rubrics

Whether human or LLM, graded scoring needs a rubric: an explicit description of what each score level means, ideally with anchored examples. "Rate helpfulness 1-5" without definitions produces noise; "5 = fully answers the question with correct, sourced detail; 3 = partially answers or has a minor error; 1 = wrong or off-topic" produces consistency. A good rubric is the difference between a metric that means something and a random number generator with extra steps.

| Method | Pros | Cons | Best for |
| --- | --- | --- | --- |
| Exact / regex match | Free, instant, reproducible | Brittle; misses valid paraphrases | Classification, IDs, fixed answers |
| Schema / structural | Objective, cheap, automatable | Only checks form, not correctness | Tool calls, structured output |
| BLEU / ROUGE | Cheap, standard, reference-based | Surface overlap ≠ meaning; weak human correlation | Narrow translation/summary signals only |
| Code assertions | Most trustworthy when applicable | Needs a code-checkable property | Code-gen, SQL, math, agents, guardrails |
| LLM-as-judge | Scales fuzzy quality cheaply | Biased, needs calibration (Module 5) | Helpfulness, tone, faithfulness at scale |
| Human eval | Gold standard; nuanced | Slow, costly, inconsistent without rubric | Labels, judge calibration, high-stakes calls |

**💡 The layered strategy:** Don't pick one scorer — layer them. Run cheap deterministic assertions on every output to catch hard failures (format, forbidden content, validity). Run an LLM judge for soft quality at scale. Reserve human review for calibrating the judge and adjudicating the hardest cases. Each layer catches what the cheaper one below it can't, and you spend expensive judgment only where it pays.

## Module 5: LLM-as-Judge Deep Dive

LLM-as-judge is the workhorse of modern evals — the only way to score fuzzy quality at scale and at reasonable cost. It is also a minefield of biases that will quietly corrupt your metrics if you don't account for them. This module is how to build a judge that actually works, and — crucially — how to evaluate the judge itself.

### Why Use a Judge At All

Human evaluation is the gold standard but doesn't scale to every run of every change. A well-built LLM judge approximates human preference closely enough on many tasks to drive day-to-day iteration, at a tiny fraction of the cost and latency. The strategy is not "judge instead of humans" but "**judge for scale, humans to validate and calibrate the judge.**"

### Reference-Based vs. Reference-Free

-   **Reference-based:** the judge sees a gold/reference answer and grades the candidate against it ("does this match the reference in substance?"). More reliable because the judge has an anchor. Requires you to have references — so it fits golden sets, not raw live traffic.
-   **Reference-free:** the judge grades the output on its own merits against a rubric, with no gold answer ("is this answer faithful to the provided context and helpful?"). Essential for live-traffic eval where you have no labels, but harder and more bias-prone because the judge must hold the standard itself.

### Pairwise vs. Pointwise (revisited for judges)

As in Module 4, judges are generally **more reliable at pairwise preference** ("is A or B better?") than at **pointwise absolute scoring** ("rate A 1-10"). For comparing two versions, prefer pairwise and report a win rate. Just be aware that pairwise opens the door to position bias, addressed below.

### Designing the Judge Prompt

A judge is itself an LLM application, so all of prompt engineering applies. The core ingredients of a judge prompt:

```
SAMPLE LLM-JUDGE RUBRIC PROMPT (reference-free faithfulness)

  ROLE:    You are a strict evaluator. Judge ONLY faithfulness of the
           ANSWER to the provided CONTEXT. Do not reward style or length.

  INPUTS:  [CONTEXT]  the source documents the answer must stay grounded in
           [QUESTION] the user's question
           [ANSWER]   the response to grade

  RUBRIC:  3 = Every claim in ANSWER is directly supported by CONTEXT.
           2 = Mostly supported; one minor unsupported detail.
           1 = A material claim is unsupported or contradicts CONTEXT.
           0 = Largely fabricated / ignores CONTEXT.

  PROCEDURE:
    1. List each factual claim in the ANSWER.
    2. For each claim, cite the CONTEXT span that supports it, or mark
       "UNSUPPORTED".
    3. Assign the lowest score justified by any unsupported material claim.

  OUTPUT (JSON only):
    { "claims": [...], "score": <0-3>, "reason": "" }
```

Principles that make judges work: (1) **narrow the question** — judge one dimension at a time (faithfulness OR helpfulness, not a vague "quality"); (2) **give a concrete rubric with anchors**; (3) **force reasoning before the score** (ask it to enumerate claims/evidence first — chain-of-thought before the verdict improves consistency); (4) **require structured output** so scores are parseable and auditable; (5) **keep it deterministic-ish** (low temperature) for repeatable grading. Using a strong model as the judge (for example an Opus- or Sonnet-class Claude model) generally yields more reliable judgments than a small one — though for high-volume reference-free checks teams often distill to a cheaper judge once it's validated.

### Known Failure Modes (Judge Biases)

**⚠️ Your judge has systematic biases. If you don't correct for them, your metric measures the bias, not the product.** The well-documented ones:

-   **Position bias:** in pairwise comparison, judges tend to favor the answer in a particular position (often the first). *Mitigation:* run each pair in both orders and average, or only count a win if it holds under swap.
-   **Verbosity / length bias:** judges tend to prefer longer, more elaborate answers even when a concise one is better or equally correct. *Mitigation:* instruct the judge to ignore length, and watch whether your "winning" version is just wordier.
-   **Self-preference / self-enhancement bias:** a judge model tends to rate outputs from itself or its own family more highly. *Mitigation:* be cautious using the same model to both generate and judge; cross-check with a different judge family.
-   **Leniency / sycophancy:** judges drift toward generous scores and can be swayed by confident phrasing or by the answer "sounding" authoritative. *Mitigation:* calibrate against human labels and use a strict, evidence-first rubric.
-   **Formatting / style halo:** nicely formatted, polite answers get a quality halo unrelated to correctness. *Mitigation:* separate substance from style in the rubric.

### Calibration

Even a good judge maps to its own scale, not yours. Calibration means checking and adjusting how the judge's scores correspond to ground truth: collect a set of human-labeled examples, run the judge on them, and compare. You may find the judge is systematically lenient, or that its "3" corresponds to humans' "good." Recalibrate the rubric (or apply a correction) until the judge tracks human judgment. Without this step you don't actually know what your judge's number means.

### The Meta-Problem: Who Evaluates the Judge?

This is the part teams skip and shouldn't. An LLM judge is just another model whose quality is unknown until measured — so you must **eval the judge against humans**. The procedure:

1.  Assemble a set of examples with trusted human labels (your ground truth).
2.  Run the judge on the same examples.
3.  Measure **agreement between judge and human** — and report it the right way. Raw agreement (% identical) overstates reliability because some agreement happens by chance, so use Cohen's kappa (κ), which corrects for chance agreement. κ near 1 is strong agreement; near 0 is no better than chance. (Use weighted κ for ordinal rubric scores, or correlation for continuous scores.)
4.  Only deploy a judge whose agreement with humans clears a bar you set in advance. A judge that disagrees with humans is a random number generator wearing a lab coat.

**💡 The non-negotiable rule:** Never trust a judge you haven't validated against humans. The agreement number (e.g., Cohen's κ) is the credential that lets you replace expensive human grading with cheap automated grading. Build that validation set first, re-check it when you change the judge prompt or swap judge models, and report the agreement alongside every judge-based metric — so readers know how much to trust it.

## Module 6: Offline vs. Online Evaluation

Evals live in two worlds with different purposes, speeds, and risks. **Offline** evaluation happens before release, against fixed datasets, to decide whether to ship. **Online** evaluation happens in production, against real users, to learn whether what you shipped actually works. You need both, wired into a loop.

### Offline Evaluation — The Pre-Production Gate

Offline evals run your system against a curated dataset in a controlled setting. Their job is to **catch regressions before users do**. Key forms:

-   **CI regression suites:** run the eval set automatically on every prompt/model/code change, exactly like unit tests. If quality drops below threshold (or a guardrail assertion fails), **block the merge**. This is the mechanism that operationalizes eval-driven development — quality becomes a gate, not a hope.
-   **Pre-prod / release gates:** before promoting a candidate (a new model version, a major prompt rework), run the full suite and require it to meet or beat the incumbent on the metrics that matter, with no regressions on critical segments or guardrails.

Offline's strengths: fast, cheap, reproducible, safe (no users harmed), and comparable (same cases every run). Its limitation: it only tests the distribution in your dataset — it cannot tell you how real users in the wild will actually behave or whether the change moves real outcomes.

### Online Evaluation — Learning in Production

Online evaluation measures the system on live traffic with real users. It answers the question offline can't: "does this actually work for people, at scale, on the true distribution?"

-   **A/B tests:** split traffic between the current system and the candidate, and compare outcome metrics. The rigorous way to attribute a change in user behavior to your change (and Module 7 governs reading the result honestly).
-   **Canary / shadow deployment:** roll the candidate to a small slice of traffic (**canary**) and watch guardrail metrics before widening; or run it in parallel without showing users its output (**shadow**) to compare against production safely. Both limit blast radius.
-   **Online quality & guardrail metrics:** run scorers (often reference-free LLM judges and assertions) over a sample of live outputs to track quality continuously, plus hard guardrails — error rate, latency, refusal rate, safety violations — that trigger alerts or auto-rollback.
-   **User-signal proxies:** real users emit cheap implicit feedback that proxies for quality — **thumbs up/down, edits to the model's output, regenerations, copy events, conversation length, escalation to a human, task completion, retention.** A spike in regenerations or escalations is an early regression alarm. These are noisy and biased (only some users react), so treat them as directional signals, not ground truth.

### The Loop Between Them

The two worlds are not parallel tracks — they form a cycle. Production observability feeds the offline dataset; the improved offline gate makes the next production release safer; production then reveals the next batch of failures. This is the eval flywheel from Module 1, drawn as an operational loop:

```
THE OFFLINE ↔ ONLINE LOOP

   ┌────────────────────┐        gate / block merge        ┌──────────────────┐
   │  OFFLINE EVAL      │ ───────────────────────────────► │  RELEASE         │
   │  (golden set,      │   pass CI + beat incumbent       │  canary → ramp   │
   │   CI regression,   │                                  └────────┬─────────┘
   │   pre-prod gate)   │                                           │
   └─────────▲──────────┘                                           ▼
             │                                            ┌──────────────────┐
             │  promote curated cases                     │  ONLINE EVAL     │
             │  (failures, drift,                         │  A/B, guardrails,│
             │   edge cases)                              │  user signals    │
             │                                            │  (thumbs, edits, │
   ┌─────────┴──────────┐    mine logs & failures         │   regen, escalate)│
   │ PRODUCTION LOGS &  │ ◄────────────────────────────── └────────┬─────────┘
   │ OBSERVABILITY      │                                          │
   └────────────────────┘ ◄────────── real traffic ───────────────┘
```

**💡 The division of labor:** Offline evals tell you whether a change is *safe to ship* (no regressions, meets the bar) — fast, cheap, run on every PR. Online evals tell you whether the change *actually helped real users* — slower, definitive, run on release. Trust neither alone: a change that passes offline can still flop online (distribution gap), and a change that looks good online can be a fluke without the statistics in Module 7. The loop — production failures becoming offline cases — is what makes the whole system compound over time.

## Module 7: Statistics: Reading Results Honestly

This is where most eval programs quietly fail: not in building the eval, but in **misreading its output**. LLMs are noisy, sample sizes are small, and the human brain is a pattern-matching machine that loves to see signal in noise. This module is the practical statistics you need to avoid claiming wins that aren't real — without turning into a stats lecture.

### One Run Lies

LLM outputs are **non-deterministic**: temperature, sampling, and infrastructure mean the same input can produce different outputs and thus different scores across runs. A single run of your eval gives you **one noisy draw**, not the truth. If version B scores 82% and version A scored 80% on one run each, you have learned almost nothing — that gap could easily be run-to-run noise. **Run multiple times** (even at temperature 0, results can vary), and look at the distribution of scores, not a single point.

### Variance & Error Bars

Always report **variability, not just a point estimate**. A score of "80%" is meaningless without a sense of its spread. Compute a confidence interval — a range that, with some confidence (say 95%), contains the true value. If A's interval is 76-84% and B's is 78-86%, those overlap heavily and you cannot claim B is better. **Error bars are not decoration; they are the difference between a real result and a coin flip.** Wide intervals usually mean your sample is too small.

### Sample Size: How Big to Detect a Delta

The smaller the improvement you want to detect, the larger the dataset you need. Detecting a 10-point jump takes few examples; detecting a 1-point improvement takes many, because the signal must rise above the noise. This is why "start tiny" (Module 3) is right for catching gross regressions but you must **grow the set to detect small wins**. Before running, ask: "given my eval's variance, is my sample even large enough to see the size of difference I care about?" If not, more examples or more runs — not a louder claim.

### Paired vs. Unpaired Comparisons

When comparing two versions, run them on **the same examples** and compare per-example (a paired comparison). Pairing cancels out the difficulty variation between examples — a much more sensitive test than comparing two independent runs on different samples (**unpaired**). Pairwise A/B judging (Modules 4-5) is naturally paired and is one reason it's so much more powerful for "did my change help?" than comparing two absolute averages.

### Significance vs. Practical Significance

Two distinct questions. **Statistical significance** asks "is this difference unlikely to be noise?" **Practical significance** asks "is the difference big enough to matter?" With a huge sample, a 0.3% improvement can be statistically significant and still not worth the added cost or latency. Conversely, a large effect on a tiny sample may matter enormously but not yet clear the significance bar. Report both the **effect size** (how big) and the **uncertainty** (how sure) — never just a p-value, and never just a raw delta.

### Multiple-Comparisons Pitfall

**⚠️ Testing many things and reporting the winner is how teams fool themselves.** If you compare 20 prompt variants, by chance alone one will look best even if none is truly better — test enough hypotheses and some will "pass" at p<0.05 purely by luck. Same trap when you slice results across many segments and trumpet the one that improved. *Mitigations:* decide your primary metric and segments **before** looking; correct for multiple comparisons when you must run many; and confirm a surprising win on a fresh, held-out sample before believing it.

### The Segmentation / Simpson's-Paradox Trap

An aggregate score can move the opposite direction of every segment underneath it. Simpson's paradox: version B can be better on mobile *and* better on desktop, yet worse overall — if the traffic mix between segments shifted. The lesson: **always look at results broken down by segment, not just the headline average.** A flat aggregate can hide a big win for one group and a big loss for another that happen to cancel. Stratified datasets (Module 3) are what make this analysis possible.

**💡 "Before you claim a win" checklist:**

-   Did I run it **more than once** and look at the distribution, not a single number?
-   Do I have **error bars / confidence intervals**, and do they actually separate the two versions?
-   Is my **sample large enough** to detect a difference this small above the noise?
-   Did I use a **paired** comparison (same examples for both versions)?
-   Is the effect **practically** significant, not just statistically — big enough to be worth it?
-   Did I pre-register my primary metric, or am I **cherry-picking** the best of many comparisons?
-   Did I check results **by segment** for a Simpson's-paradox reversal?
-   Can I **reproduce** the win on a fresh held-out sample?

If you can't tick these, you have a hypothesis, not a result. Say so honestly.

## Module 8: Production Eval Systems & the Measurement Culture

Concepts become an advantage only when they're operationalized — wired into tooling, dashboards, rituals, and ownership. This final module covers the eval tooling landscape, how tracing connects to evals, the org and process around measurement, a maturity model to locate yourself on, and a concrete plan for your first 30 days.

### The Tooling Landscape

You rarely build all of this from scratch. A representative (*not exhaustive*) map of the eval and observability tooling categories, with examples of tools that operate in each — listed for orientation, without invented benchmarks or rankings:

| Category | What it does | Representative tools |
| --- | --- | --- |
| Eval platforms | Manage datasets, run scorers, track experiments, dashboards for regression. | Braintrust, LangSmith, Langfuse |
| Open-source / framework | Library-style eval harnesses you run in CI or scripts. | OpenAI Evals, Promptfoo, UK AISI's Inspect |
| RAG-specific | Metrics tuned for retrieval-augmented generation (faithfulness, context relevance, answer relevance). | Ragas |
| Tracing / observability | Capture every request's inputs, outputs, tool calls, and latency for debugging and live eval. | Langfuse, LangSmith (and OpenTelemetry-based stacks) |

These categories overlap — several tools span eval + tracing — and the space moves fast, so treat the names as orientation, not endorsement. Pick based on where your team already lives (your language, your stack) and whether you need a hosted dashboard or a library in CI. The principles in Modules 1-7 are tool-agnostic; the tool just removes the plumbing.

### Tracing → Eval Integration

The connective tissue is tracing: instrument your app so every production interaction is captured as a trace (inputs, retrieved context, tool calls, the final output, latency, user signals). Tracing pays off three ways: (1) it's how you **debug** a bad output by replaying exactly what happened; (2) it's the **source of live-traffic evals** — run scorers over sampled traces; and (3) it's the **feed for the flywheel** — interesting or failing traces become new dataset cases in one click. No tracing, no flywheel.

### Regression Dashboards

Make quality visible the way you make uptime visible. A regression dashboard shows your key eval metrics over time and across versions, broken down by segment, with guardrail thresholds marked. When a metric dips, it should be as obvious and as owned as a latency spike. If quality is only known by reading individual outputs, it isn't operationalized.

### The Org & Process

-   **Ownership:** someone must own the eval system — the datasets, the judges, the gates. Evals that are "everyone's job" become no one's. This can be a dedicated role or a clear DRI per product surface.
-   **Eval review rituals:** a regular cadence (e.g., a weekly review of failing cases and new production failure modes, a release-gate review before promotion) keeps the flywheel turning and keeps the dataset fresh.
-   **Cultural norm:** the deepest shift is when "show me the eval" becomes the reflexive response to any claim of improvement — when no prompt or model change merges without passing the gate, the same way no code merges without passing tests.

### The Eval Maturity Model

```
EVAL MATURITY MODEL

  LEVEL 0  VIBES        Ship on manual spot-checks. No dataset, no metric.
                        "It looked good when I tried it."

  LEVEL 1  AD-HOC       A few saved test cases run by hand occasionally.
                        Catches only the most obvious breakage.

  LEVEL 2  SYSTEMATIC   A versioned dataset + scorers run on demand before
                        big changes. Numbers exist, used inconsistently.

  LEVEL 3  AUTOMATED    Evals in CI gate every change. Validated LLM judge.
                        Regression dashboard. Stats read honestly.

  LEVEL 4  CONTINUOUS   Offline gates + online A/B + live-traffic scoring,
   (EDD)                wired in a flywheel. Production failures auto-become
                        eval cases. Eval is owned, ritualized, cultural.
```

Most teams are at Level 0 or 1 and think they're fine — until a silent regression costs them. The goal is to climb deliberately: you don't need Level 4 on day one, but you should always know which level you're on and what the next step is.

### Your First 30 Days of Building an Eval Practice

-   **Days 1-3:** Write the task definition. Pin down what "good" means for your top use case in writing, with quality dimensions. Get one other person to agree with it.
-   **Days 4-7:** Build a 30-50 case dataset from real logs plus a handful of edge/adversarial cases. Version it in the repo. Scrub PII.
-   **Days 8-12:** Add cheap deterministic assertions for hard constraints (format, required fields, forbidden content). Wire them to run on every change.
-   **Days 13-18:** Build an LLM judge for your top quality dimension. Hand-label ~30 examples and measure judge-vs-human agreement (Cohen's κ). Iterate the rubric until it clears your bar.
-   **Days 19-23:** Put the eval in CI as a release gate. A merge that regresses quality or fails a guardrail is blocked. Establish a baseline.
-   **Days 24-27:** Stand up tracing on production and a basic regression dashboard. Start sampling live traffic through your scorers.
-   **Days 28-30:** Run the flywheel once end-to-end: mine a real production failure, turn it into a new eval case, and confirm the gate now catches it. Schedule a weekly eval review.

**💡 The one-sentence thesis:** The teams that win with AI are not the ones with the best model — that's rented and commoditized — but the ones with the best *measurement system*: a living dataset of their hardest real cases, scorers they've validated against humans, gates that block regressions automatically, and the cultural reflex to ask "show me the eval" before believing any claim of improvement — so they ship on evidence while everyone else ships on vibes.