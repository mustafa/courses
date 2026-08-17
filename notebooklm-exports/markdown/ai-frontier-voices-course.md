# AI Frontier Voices — Learning from the People Building It

# AI Frontier Voices

Learning from the people building it. A curated course built around 15 must-follow X accounts across Anthropic, OpenAI, Google AI, Cursor, and xAI — who they are, what they've taught us, and what they're saying right now.

Last updated: August 17, 2026 • ~1.5–2 hours reading • 6 Modules

0 / 6 complete

[1Anthropic — Karpathy, Cherny, Thariq](#mod1) [2OpenAI — Brown, Gabriel, Liu](#mod2) [3Google AI — Kilpatrick, Reshi, fofr](#mod3) [4Cursor — Robinson, Zakariasson, Truell](#mod4) [5xAI — milichab, skcd](#mod5) [6Resources — ai\_explorer25 & How to Follow](#mod6)

## Module ★: Latest from the Feed

*A running log of what these 15 accounts have been sharing. Newest first; entries older than 8 weeks are pruned. Updated weekly by an automated task.*

### Week of August 17, 2026

-   **@mntruell (Cursor):** It closed. SpaceX [officially completed the $60B all-stock acquisition of Anysphere on August 15](https://techcrunch.com/2026/08/15/spacex-officially-closes-its-cursor-acquisition/), folding Cursor into its SpaceXAI unit with Truell's team moving into SpaceX's internal software engineering division. Cursor's own announcement leaned hard on compute rather than product, describing access to "the largest fleet of GPUs in the world" including Colossus — the same infrastructure SpaceX rents to Anthropic and Google. Module 4 of this course is now a story about a SpaceX subsidiary.
-   **@OfficialLoganK (Google AI):** Google shipped [Gemini 3.7 Flash on August 14](https://venturebeat.com/technology/googles-gemini-3-7-flash-targets-coding-and-agents-with-a-50-introductory-price-cut) — three weeks after 3.6 Flash — pitched as its "most intelligent workhorse model yet for coding and agents." It jumps to 43.6% on FrontierCode 1.1 Main (3.6 Flash scored 34.4%) and 1588 Elo on Code Arena for web dev, with a 1M context window. Read the pricing carefully: $0.75/$3.75 per Mtok is *introductory through December 31*, then doubles to $1.50/$7.50 on January 1. Kilpatrick attributes the gain to algorithmic improvements rather than compute — which is the only honest explanation available on a three-week cadence.
-   **Still no 3.5 Pro:** Worth stating plainly, since this is now the sixth straight window to pass. Google has shipped 3.6 Flash, 3.5 Flash-Lite, Flash Cyber and now 3.7 Flash since May while the Pro tier sits in limited preview. The Flash line has quietly become Google's actual frontier offering, and the interesting question is no longer when Pro ships but whether it ever does before Gemini 4.
-   **@milichab & @skcd42 (xAI):** Grok 4.6's distribution widened fast — it [landed in GitHub Copilot on August 14 across eight surfaces](https://github.blog/changelog/2026-08-14-grok-4-6-is-now-available-in-github-copilot/) (VS Code, Visual Studio, Copilot CLI, cloud agent, the Copilot app, JetBrains, Xcode, Eclipse) on Pro through Enterprise SKUs, alongside OpenRouter, Vercel and Cloudflare. Note the deadline: the doubled-usage promo in Cursor and Grok Build [closes August 19](https://releasebot.io/updates/xai). Meanwhile [Grok 4.7 slipped to early-to-mid September](https://www.orcarouter.ai/blog/grok-4-7-release-date), and the API model list still tops out at grok-4.6.
-   **Anthropic platform:** The [Claude in Chrome side panel became a full Cowork session on August 12](https://claude.com/blog/cowork-chrome-side-panel) — history, skills and connectors all work inside the browser, and a task started in a tab can be finished on desktop, web or mobile. Max and Team have it now; Pro is rolling out over the coming weeks, and Enterprise is off by default with admin domain allowlisting. This is the first time the browser stopped being a separate surface and became just another place the same session lives.
-   **Anthropic, provenance:** Coverage caught up this week to the [invisible watermarking of all Claude text output](https://the-decoder.com/anthropic-watermarks-all-claude-outputs-globally-with-marks-that-may-persist-through-some-editing/), live since August 2 and applied worldwide rather than only in the EU, in response to Article 50 of the EU AI Act. It works by statistically biasing word choice against a key Anthropic holds — undetectable per sentence, detectable across enough text — and travels through copy-paste and some editing. Files get C2PA provenance metadata instead, which is strippable by format conversion, re-saving, or a screenshot. If you ship Claude-generated text or assets, this now applies to Claude Code and Cowork output too.

### Week of August 14, 2026

-   **@bcherny (Anthropic):** Auto mode [flipped to default in Claude Code today](https://www.theregister.com/ai-and-ml/2026/08/10/claude_code_puts_auto_mode_in_the_drivers_seat/) for new sessions on Pro, Max, and Team — the change trailed last week from the 1,053-tester classifier study. Enterprise, the Claude API, and the cloud platforms (Bedrock, Vertex, Foundry) stay opt-in, with Anthropic saying it plans to make it default there within a month. If you script Claude Code, assume permission behavior changed underneath you.
-   **Anthropic platform:** Two enterprise pieces landed alongside it. [Self-hosted environments went to public beta](https://claude.com/blog/run-claude-code-sessions-on-your-own-compute) (Aug 6) — `claude self-hosted-runner` turns your own machines into the compute layer, so agents sit next to private registries and databases without exposing them. Read the fine print: it is self-hosted *execution*, not self-hosted inference — prompts still go to Anthropic. Separately, the [Compliance API now covers Cowork and Claude Code sessions](https://claude.com/blog/compliance-api-cowork-and-claude-code) with consolidated transcripts.
-   **@karpathy (Anthropic):** Weighed in after Claude Opus generated a [procedural 3D Lord of the Rings world from a single prompt](https://www.benzinga.com/markets/tech/26/08/60861644/andrej-karpathy-says-ai-has-moved-beyond-simple-prompts-after-claude-opus-builds-3d-lord-of-the-rings-world), arguing models have moved past the prompt-a-snippet era into sustained creative construction. It is the same thesis as his loop-engineering post, just with a demo attached rather than a rulebook.
-   **@leerob & @ericzakariasson (Cursor):** Cursor shipped [Builds on August 13](https://cursor.com/changelog) — pre-warmed copies of your dev environment kept ready in the background, so a Cloud Agent boots into a working setup instead of provisioning one per session. Cursor claims 10× faster environment boot and 3× faster time-to-first-token, and it is included with Cloud Agents at no extra cost. Environment setup was the single biggest tax on cloud agents; this is the right thing to have fixed.
-   **@mntruell (Cursor):** SpaceX [finalized regulatory procedures on August 12 to close the $60B all-stock acquisition of Anysphere](https://satnews.com/2026/08/12/spacex-finalizes-regulatory-procedures-to-close-60-billion-acquisition-of-ai-platform-cursor/), keeping the Q3 timeline. The joint SpaceX/xAI/Cursor model intended to ship inside both Cursor and Grok is the thing to watch — it would make Cursor and Grok Build siblings rather than competitors, which reshapes module 4 and module 5 of this course at the same time.
-   **@milichab & @skcd42 (xAI):** With 4.6 out, attention moved to [Grok 4.7 — now roughly 3–4 weeks out as of August 12](https://www.orcarouter.ai/blog/grok-4-7-release-date). Musk says initial training is done and xAI is running a supplemental pass on "a massive amount" of SpaceX engineering data, and frames 4.7 as better than 4.6 in every way except slightly slower to serve, with better token efficiency. Training on proprietary aerospace engineering data is a genuinely new kind of moat, not just more scale.
-   **@OfficialLoganK (Google AI):** The August 12 rumor for Gemini 3.5 Pro [passed with another delay](https://nokiapoweruser.com/gemini-3-5-pro-delayed-again-deployment-issues/), this time attributed to deployment issues rather than quality bars. That is now five missed windows since May. At some point the interesting question stops being "when does 3.5 Pro ship" and becomes "does Google skip it for Gemini 4."
-   **@gabriel1 (OpenAI):** Calendar item for anyone still on Sora: the app shut down back in April, and the [Sora 2 API is scheduled for removal on September 24](https://www.mindstudio.ai/blog/openai-shutting-down-sora-what-happened) in favor of Spud. Six weeks left to migrate any video pipeline built on it.

### Week of August 9, 2026

-   **@milichab & @skcd42 (xAI):** [Grok 4.6 shipped on August 7](https://neomanex.com/news/grok-4-6-august-7-launch-confirmed), on schedule and to the walked-back spec: 1.5T parameters on the same V9 foundation as 4.5, with the gains coming from post-training rather than scale. It went out through xAI's own surfaces first — SuperGrok tiers, the API console, and Grok Build. The 2.1T Grok 4.7 is still a few weeks out.
-   **@bcherny (Anthropic):** Anthropic announced that [auto mode becomes the default in Claude Code on August 14](https://claude.com/blog/auto-mode-default-in-claude-code) for Pro, Max, and Team. The number that carried the argument: across 1,053 paid testers, auto mode's classifier caught 89% of harmful actions versus 13.6% for humans clicking through manual permission prompts. Anthropic also stopped charging for the classifier's token overhead. Enterprise, API, and cloud-platform users stay opt-in for now.
-   **@polynoamial (OpenAI):** The Astra verdict firmed up over the week. Thomas Bloom — the mathematician who took apart OpenAI's 2025 math claim — called this result "big news" and rated it above the May 2026 Erdős work, which is meaningful validation from the most credible skeptic available. OpenAI has also started framing Astra less as a math model and more as a long-horizon system that coordinates multiple agents over extended runs.
-   **@OfficialLoganK (Google AI):** The August 6 window for Gemini 3.5 Pro [came and went with no launch](https://tech.yahoo.com/ai/gemini/articles/where-gemini-3-5-pro-200026497.html) — the model is still in limited preview on Vertex AI. That's the fourth slip since the May 19 I/O announcement, and the new unconfirmed rumor points at August 12. Meanwhile Gemini 4 pre-training continues, which increasingly looks like the real explanation.
-   **@leerob & @ericzakariasson (Cursor):** Cursor [restored the Cost column and historical CSV dollar values on August 2](https://releasebot.io/updates/cursor) after replacing them with raw token counts drew user pushback — a small thing, but a clean example of the pricing-transparency pressure every agent product is under. Cursor for iOS also moved to public beta on all paid plans, and a lower-priced Cursor Start tier launched for developers in India.
-   **@jxnlco (OpenAI):** Worth a calendar note for anyone deep in Codex: [GPT-5.4 and 5.4-mini stop being available in Codex for ChatGPT-authenticated sessions on August 31](https://developers.openai.com/codex/changelog), migrating to the GPT-5.6 Terra and Luna variants. API-key sessions keep access. If your workflows pin a model, they will break silently.

### Week of August 2, 2026

-   **@polynoamial (OpenAI):** The week's biggest story. Brown announced on August 1 that an internal version of [Astra — OpenAI's next major model family — produced new results on ten problems open for at least a decade](https://the-decoder.com/openai-announces-its-next-major-model-astra-by-dropping-ten-previously-unsolved-math-solutions/), across sphere packing, von Neumann algebras, circuit complexity, quantum complexity, lattice cryptography and Ramsey theory. Each came with a machine-checkable Lean certificate, and the whole run cost roughly $2,000 in API compute. Brown's own caveat matters as much as the claim: "sadly no Millennium Prize problems (yet)… we didn't spend a lot on each problem."
-   **Counterpoint worth reading:** Gary Marcus published ["amazing — but vastly oversold"](https://garymarcus.substack.com/p/openais-amazing-but-vastly-oversold) on August 2, arguing the methodology isn't public and that math is a special case: it has symbolic verification and cheap correct synthetic data, so success there doesn't transfer to open-ended reasoning. He also flagged that at least one Astra proof may be wrong. Hold both — the result is real and the generalization claim is unproven.
-   **@milichab & @skcd42 (xAI):** Musk [dated Grok 4.6 to around August 7](https://crypto.news/grok-4-6-gets-aug-7-launch-date-grok-4-7-follows/) on July 28, and the specs walked back last week's numbers: 1.5T parameters on the same V9 foundation as 4.5, not a 2T new base. The improvement is post-training — better SFT and RL — with 4.7 (2.1T) a few weeks out. xAI is now shipping gains from training technique rather than scale, which is a notable shift in its own right.
-   **@trq212 (Anthropic):** His [context-engineering post for Claude 5 models](https://x.com/trq212/status/2080710971228918066) kept spreading all week. Anthropic cut Claude Code's system prompt from ~2,686 words to ~514 with no measurable loss on coding evals — but the instructions were *relocated* into tool descriptions and skills, not deleted. The six shifts he names (rules → judgment, examples → interface design, upfront context → progressive disclosure) are the most directly actionable thing on this list for anyone writing CLAUDE.md files.
-   **@karpathy (Anthropic):** Released a document on agent architecture that [trended on X](https://www.aibuilderclub.com/blog/loop-engineering-karpathy) — nine rules for pushing execution and bookkeeping onto the model and keeping state on disk, so the human sets up a gen-verify loop instead of prompting turn by turn. It's the formal version of the "agentic engineering, not vibe coding" line he's been making since Sequoia Ascent.
-   **@OfficialLoganK (Google AI):** Gemini 3.6 Flash and 3.5 Flash-Lite went [generally available in the API](https://ai.google.dev/gemini-api/docs/changelog), and Kilpatrick has now hinted at an August window for 3.5 Pro after three slips. Four months of Pro delay while Gemini 4 pre-training is already underway is starting to look less like a schedule problem and more like a decision about which model is worth shipping.

### Week of July 26, 2026

-   **@OfficialLoganK (Google AI):** Google [shipped three Gemini models on July 21 — and none of them was 3.5 Pro](https://techcrunch.com/2026/07/21/google-releases-three-new-gemini-models-but-no-3-5-pro/): Gemini 3.6 Flash ($1.50/$7.50 per Mtok, 1M context, ~17% fewer tokens than 3.5 Flash), 3.5 Flash-Lite ($0.30/$2.50), and a gated 3.5 Flash Cyber tuned for finding and fixing vulnerabilities. Kilpatrick said 3.5 Pro is still testing with partners. The footnote was the real news: Google has begun pre-training *Gemini 4*.
-   **@karpathy (Anthropic):** A bio tweak on X plus Anthropic's absence from Jensen Huang's open-weights letter spun up a ["Karpathy quit Anthropic" rumor](https://explainx.ai/blog/karpathy-anthropic-resignation-rumor-debunked-july-2026), which he flatly denied on July 26. He remains on pre-training under Nick Joseph. Worth noting how fast a profile edit became a narrative — a reminder to read primary sources on this list, not the repost layer.
-   **@milichab & @skcd42 (xAI):** Musk announced Grok 4.6 — a 2T-parameter model — [finished its initial training run the week of July 20](https://dataconomy.com/2026/07/20/musk-xai-grok-4-6-2t-model-training-next-week/), with a 4–6T Grok 4.7 already on the roadmap weeks behind it. That's a back-to-back cadence no other frontier lab is matching. xAI also pushed Grok into Google Workspace as a free Sheets/Slides/Docs add-on with cited-cell answers.
-   **@ammaar (Google AI):** Reshi [compiled Command & Conquer: Generals — Zero Hour to run natively on iPhone, iPad and Apple Silicon](https://www.pcgamer.com/software/ai/googles-ai-studio-lead-has-vibe-coded-a-port-of-command-and-conquer-for-ios/) — no emulator — using Claude Code with Fable 5, then open-sourced it. First build in ~40 minutes, roughly two days total. The AI Studio product lead shipping his best demo on a competitor's tool is its own signal about where agentic coding actually stands.
-   **@jxnlco (OpenAI):** Published his full system for running an entire workday inside Codex (July 26) — a "chief of staff" thread that handles Slack and email, plus long-running tasks defined against verifiable goals. The through-line of his Codex-maxxing series: the win isn't code generation, it's giving an agent work that can be checked when it finishes.
-   **Ecosystem context:** Moonshot's [Kimi K3 open weights land July 27](https://www.interconnects.ai/p/kimi-k3-the-open-weights-escalation) — 2.8T parameters, sparse MoE, 1M context, Modified MIT. It benchmarks above Grok 4.5 and is the immediate target Grok 4.6 was built to beat. The catch: ~1.4TB of fast memory even at four-bit, so "open" here means open to whoever owns the hardware.

### Week of July 19, 2026

-   **@bcherny (Anthropic):** Published ["Steps of AI Adoption"](https://shellypalmer.com/2026/07/boris-chernys-steps-of-ai-adoption-a-roadmap/) (July 16), naming five maturity levels — Gated (0) → Assisted (~1) → Parallel (~10) → Supervised autonomy (~100) → AI-native (1,000+ agents). His argument: the 10× gap between teams isn't "more tokens," it's bottlenecks and guardrails at each step, so companies should measure human hours saved, not token burn.
-   **@skcd42 (xAI):** xAI [open-sourced Grok Build under Apache 2.0](https://simonwillison.net/2026/Jul/15/grok-build/) (July 15) and made Grok 4.5 its default model. The terminal agent runs up to 8 parallel subagents in isolated git worktrees; xAI also disabled a data-upload feature after community security feedback. Grok Build going open source is a direct shot at Claude Code and Codex.
-   **@leerob & @ericzakariasson (Cursor):** Cursor [doubled included model usage on all plans](https://x.com/leerob/status/2077552106014154846) (July 16), widening access to Grok 4.5 and Composer 2.5. Cursor in Slack (July 17) now shares a plan before it executes and works across multi-repo environments and threads — agents you can redirect early rather than after the fact.
-   **@karpathy (Anthropic):** His nano series (nanoGPT, nanochat, micrograd) crossed a [combined ~120,000 GitHub stars](https://www.startuphub.ai/ai-news/ai-figures/2026/figure-andrej-karpathy-nano-series-technical-contribution-2026-07-16), cementing him as ML's most-followed educator. Anthropic's hiring run continued alongside his pre-training work — Monzo co-founder Tom Blomfield joined the compute team.
-   **@OfficialLoganK (Google AI):** Gemini 3.5 Pro slipped again — the widely-reported July 17 launch passed with no release after the rebuilt model reportedly missed Google's internal quality bars (its third delay). AI Studio still surfaces gemini-3.5-flash and a 3.1-pro-preview; the new Pro (2M-token context, "Deep Think" reasoning) remains in limited enterprise preview.

### Week of July 12, 2026

-   **@karpathy (Anthropic):** Settling into his pre-training role after joining in May — his team focuses on using Claude to accelerate pre-training research itself. His Sequoia AI Ascent framing keeps circulating: "Vibe coding raises the floor. Agentic engineering is about extrapolating the ceiling."
-   **@polynoamial (OpenAI):** At a Seoul symposium (July 3), Noam Brown argued the future of AI will be defined by *memory*, not raw compute — inference-time scaling makes memory capacity and bandwidth the primary bottleneck, with big implications for the semiconductor market.
-   **@mntruell (Cursor):** Composer 2.5 became the most-chosen model in Cursor; Truell celebrated with 10x usage for a day. Cursor also shipped its native iOS app (June 29) — cloud agents, remote control, voice, and PR merges from your phone.
-   **xAI (@milichab, @skcd42):** Grok 4.5 launched July 8 — Musk calls it an "Opus-class model," priced at $2/$6 per Mtok. Grok 5 (the 6T-parameter model) is still training on Colossus 2, with availability likely slipping to Q3+.
-   **@jxnlco (OpenAI):** Continuing his "Codex-maxxing" series — soliciting community feedback on Codex plugins and sharing workflows for using Codex in non-coding knowledge work (presentations, voice notes, megathreads).

## Module 01: Anthropic — The Claude Builders

### Who to Follow and Why

AK

Andrej Karpathy [@karpathy](https://x.com/karpathy)

OpenAI co-founder, former Tesla AI director, AI's best teacher. Joined Anthropic's pre-training team in May 2026. The single highest signal-to-noise account in AI.

BC

Boris Cherny [@bcherny](https://x.com/bcherny)

Creator of Claude Code. Shares the highest-leverage practical tips on agentic coding anywhere — how he actually uses the tool he built.

TS

Thariq Shihipar [@trq212](https://x.com/trq212)

Claude Code developer at Anthropic. Writes long-form articles on agent design that read like internal engineering docs made public.

### Karpathy: From Teaching AI to Training Claude

Karpathy's [move to Anthropic in May 2026](https://techcrunch.com/2026/05/19/openai-co-founder-andrej-karpathy-joins-anthropics-pre-training-team/) was the biggest talent story of the year. He's starting a team focused on **using Claude to accelerate pre-training research** — models improving models. His announcement: "The next few years at the frontier of LLMs will be especially formative... I remain deeply passionate about education and plan to resume my work on it in time."

His conceptual contributions frame how the whole industry talks:

-   **"Vibe coding" vs "agentic engineering":** At Sequoia's AI Ascent (April 2026) he drew the line between delegating code to AI without reading it, and directing multiple agents on complex tasks. "Vibe coding raises the floor. Agentic engineering is about extrapolating the ceiling."
-   **"AI psychosis":** His March 2026 confession of persistent anxiety about falling behind the frontier of what agents can do — naming a feeling every engineer recognizes.
-   **Education legacy:** CS231n, the "Zero to Hero" neural net series, nanoGPT, and Eureka Labs — the reason a generation of ML engineers exists.

Key Takeaway

Watch Karpathy for **conceptual frames**, not news. He names the patterns everyone else is fumbling to describe, usually 6 months early.

### Cherny: How the Creator Uses Claude Code

Boris Cherny's tips are so followed there's an entire community site cataloguing them ([118+ tips and counting](https://howborisusesclaudecode.com/)). The essentials of his workflow:

-   **Massive parallelism:** 5 Claude Code instances in terminal tabs (numbered 1–5, separate git checkouts), plus 5–10 more sessions on claude.ai/code. Built-in git worktree support (shipped Feb 2026) made this a first-class pattern.
-   **Plan mode first:** Most sessions start in Plan mode (Shift+Tab twice). Iterate on the plan, then switch to auto-accept — Claude usually one-shots the implementation.
-   **Opus with thinking, always:** Bigger and slower per token, but needs less steering and is better at tool use — "almost always faster in the end."
-   **Slash commands for every inner loop:** Repeated workflows become commands in `.claude/commands/`, checked into git so the whole team (and Claude itself) can use them.
-   **The self-improvement loop:** Spot an anti-pattern in a PR → don't just fix it, tell Claude to update CLAUDE.md so future sessions avoid it automatically.

Why This Matters

Cherny's workflow is a preview of every engineer's workflow 12 months out. The pattern — human as reviewer/director, agents as parallel implementers, rules encoded in memory files — is becoming the industry default.

### Thariq: Seeing Like an Agent

Thariq joined Anthropic in July 2025 with a thesis: "We're bottlenecked not by model capabilities, but by creativity and understanding." His long-form writing delivers on it:

-   **"Claude Code is All You Need":** The article that popularized using Claude Code as a *general agent*, not just for code — file management, research, writing, automation.
-   **"Lessons from Building Claude Code: Seeing like an Agent" (Feb 2026):** How to construct an agent's action space and tool design — what the world looks like from inside the loop.
-   **Skills at Anthropic (March 2026):** Lessons from hundreds of skills in active internal use — how to package repeatable workflows agents can invoke.

| Account | Post For | Cadence | Signal |
| --- | --- | --- | --- |
| @karpathy | Concepts, frames, education | Weekly-ish | Very High |
| @bcherny | Claude Code tips, releases | Several/week | Very High |
| @trq212 | Long-form agent design essays | Every few weeks | Very High |

## Module 02: OpenAI — Reasoning, Video, and Codex

### Who to Follow and Why

NB

Noam Brown [@polynoamial](https://x.com/polynoamial)

OpenAI research VP behind the o-series reasoning models. Previously cracked poker (Libratus/Pluribus) and Diplomacy (Cicero) at Meta. Shares real technical detail on reasoning research.

G

Gabriel [@gabriel1](https://x.com/gabriel1)

Sora developer. A window into what it's like building (and sunsetting) frontier generative video products — a great career-path account.

JL

Jason Liu [@jxnlco](https://x.com/jxnlco)

Creator of Instructor (the structured-outputs library), now Developer Experience Engineer on the Codex team. The most practical voice on agentic developer tooling at OpenAI.

### Brown: The Reasoning Bet, Then the Memory Bet

Noam Brown was foundational to o1 and o3 — the models that proved spending more compute at *inference time* dramatically improves math and science performance. His long-standing thesis: reasoning techniques "could've arrived decades ago" — the ideas were simpler than people assumed; what was missing was the conviction to scale them.

His current frame (Seoul symposium, July 3, 2026): **inference-time scaling makes memory the next battleground**. As models spend more time reasoning, memory capacity and bandwidth — not FLOPs — become the binding constraint. If he's right, the hardware winners of the next cycle look different from the last one.

Key Takeaway

Brown's posts are a leading indicator for where OpenAI's research compute is going. He telegraphed the o-series a year early; take the memory thesis seriously.

### Gabriel and the Sora Arc

The Sora story is 2026's biggest product cautionary tale: the consumer web/app experience was **discontinued April 26, 2026**, with the API sunsetting September 24. Reports cited compute shortages and ~$1M/day operating costs, plus a strategic shift toward enterprise. Following a builder like @gabriel1 through that arc teaches more about frontier product reality than any launch thread — what it takes to ship generative video, and what it costs to keep it alive.

### Liu: Codex-maxxing

Jason Liu's account is a live lab notebook for Codex developer experience:

-   **"Codex-maxxing" (May 2026):** His guide to techniques and primitives for daily Codex use in *knowledge work* — presentations, voice notes, running five parallel workstreams as "megathreads."
-   **Skill Installer:** Do something useful once, package it as a skill so Codex repeats it without reteaching — the same convergent pattern as Anthropic's skills and Cursor's skills.
-   **Community-driven DX:** He publicly solicits feedback on what's broken in Codex plugins and ships against it — a rare open feedback loop at a frontier lab.
-   **Instructor legacy:** His structured-outputs library was cited by OpenAI as inspiration for the official structured output feature.

Pattern to Notice

All three labs converged on the same abstraction in 2026: **packaged, reusable agent workflows** (Anthropic skills, Codex skills, Cursor skills). When competitors converge, that's the signal the pattern is real.

## Module 03: Google AI — Gemini, AI Studio, and Vibe Coding

### Who to Follow and Why

LK

Logan Kilpatrick [@OfficialLoganK](https://x.com/OfficialLoganK)

Leads Google AI Studio and the Gemini API at Google DeepMind. Every major Gemini launch goes through his account first. The definitive source for Google AI news.

AR

Ammaar Reshi [@ammaar](https://x.com/ammaar)

Product & Design lead for Google AI Studio. The best account for seeing what vibe-coding can actually build — he demos by shipping.

F

fofr [@fofrAI](https://x.com/fofrAI)

Prolific creative-model explorer. Finds the weird, delightful edges of image/video/audio models before anyone else — a constant source of "I didn't know models could do that."

### Kilpatrick: The Launch Channel

Logan Kilpatrick's account is effectively Google AI's release feed with commentary. Recent arc:

-   **Gemini 3 Pro:** His launch thread ("state of the art across most benchmarks") set the tone for Google's strongest release cycle yet.
-   **Unified Playground:** AI Studio consolidated Gemini, GenMedia (Veo 3.1), TTS, and Live models into one surface without tab-switching.
-   **Cloud Next 2026 (April):** Teased design previews, "tap tap tap" autocomplete, "yap to app" voice input, mobile AI Studio, and on-device Gemma 4.
-   **The thesis:** "We are building AI Studio and Gemini to dramatically accelerate the development of products at Google" — AI Studio as Google's internal accelerant, productized.

### Reshi: Vibe Coding as a Product Discipline

Ammaar Reshi owns product strategy for AI Studio's playground and vibe-coding surfaces, and he leads by building:

-   **Full-stack vibe coding:** Prompt-to-app with multiplayer support, databases, and modern web tooling (Framer Motion et al.) directly in AI Studio.
-   **Antigravity + Firebase (March 2026):** Plain-English prompt to a *deployed* app with auth, database, and backend — in one browser tab.
-   **Design-led demos:** His launch demos are vibe-coded prototypes he builds himself; he's also taught vibe-coding workshops internationally.

### fofr: The Creative Frontier Scout

fofr's account is the answer to "what can generative media actually do this month?" He stress-tests new image, video, and audio models the day they drop and publishes recipes — prompt patterns, model chains, and unexpected capabilities. In a year where video models (Veo 3.1, Grok Imagine 1.5) leapfrogged monthly and Sora exited the stage, an account dedicated to *hands-on comparative exploration* is more valuable than any benchmark table.

Key Takeaway

Google's story in 2026 is **distribution + integration**: models woven into AI Studio, Firebase, and on-device Gemma. Follow Kilpatrick for the what, Reshi for the how, fofr for the what's-possible.

## Module 04: Cursor — The Agent-First IDE

### Who to Follow and Why

LR

Lee Robinson [@leerob](https://x.com/leerob)

Former Vercel VP of Product, now at Cursor working on ML and education. The loudest, clearest voice explaining Cursor releases and AI-assisted development.

EZ

Eric Zakariasson [@ericzakariasson](https://x.com/ericzakariasson)

Cursor product engineer. Shares the practical workflows — model selection guides, context management, agent patterns — that make Cursor users faster.

MT

Michael Truell [@mntruell](https://x.com/mntruell)

Cursor's CEO. Major releases, usage milestones, and the strategic vision for where coding is headed.

### The 2026 Cursor Arc: From IDE to Agent Manager

Cursor's year has been a sprint toward agent-first development:

-   **Composer 1.5 → 2 → 2.5:** Cursor's in-house models, trained with large-scale RL in environments emulating real Cursor usage (Composer 2 built on the open Kimi K2.5 base). By May, **Composer 2.5 was the most-chosen model in Cursor** — an in-house model beating frontier APIs on its home turf.
-   **Cursor 3 (April 2026):** The headline: "simpler, more powerful, and built for a world where all code is written by agents." Lee Robinson's launch thread told the story of redesigning the interface around directing agents rather than editing files.
-   **Truell's "Third Era" essay (Feb 2026):** Era 1: manually editing files. Era 2: agents write most code. Era 3: *fleets of agents working autonomously to ship improvements*.
-   **Cloud ↔ local agent handoff:** Move a running agent session from cloud to desktop and back. Plus the native iOS app (June 29): cloud agents, voice, and PR merges from your phone.
-   **Acquired by SpaceX (closed August 15, 2026):** The $60B all-stock deal for Anysphere completed, making Cursor part of SpaceX's SpaceXAI unit with access to the Colossus GPU fleet. Cursor keeps shipping as a product; the strategic tension below now runs through a parent that also owns xAI and Grok Build.
-   **Always-on CI agents:** Agents that monitor GitHub, investigate CI failures, and open PRs with fixes — unattended.

### Zakariasson's Playbook

-   **Model selection guide:** Match model to task — his guide on thinking through model choice remains the reference.
-   **Plan mode before execution:** Gather context and align on the problem/solution with the model first (same pattern as Cherny — convergent evolution again).
-   **Self-verifiable solutions:** Prompt for solutions the agent can run and check itself.
-   **Skills in Cursor:** Live as of January 2026 — including skills that teach you about your own codebase.
-   **Data on adoption:** Cursor's insights report: accepted AI lines surviving 60+ minutes rose from ~76% to 81% in 2026; lines-per-PR up ~2.5x YoY; 1,000+ line "mega PRs" increasingly common.

> **Warning:** Watch This
>
> Cursor training its own frontier-competitive models (Composer) while being a top customer of Anthropic/OpenAI models is the most interesting strategic tension in dev tools. Truell's account is where that story will break.

## Module 05: xAI — Grok's Fast Followers

### Who to Follow and Why

M

milichab [@milichab](https://x.com/milichab)

Recently joined xAI; shares updates on Grok models and products from inside the fastest-shipping lab.

S

skcd [@skcd42](https://x.com/skcd42)

xAI engineer behind Grok Build, the terminal-native coding agent. Covers major Grok releases with an engineer's eye.

### The Grok Release Cadence

xAI ships faster than any other lab, and these two accounts are how you keep up:

-   **Grok 4.5 (July 8, 2026):** Positioned by Musk as "roughly comparable to Opus 4.7, but much faster" at $2/$6 per Mtok — aggressive pricing aimed at coding, agentic tasks, and knowledge work.
-   **Grok Build (May 2026):** skcd's project — a coding agent "built by engineers who live in the terminal: people who reach for vim, think in keybindings, and treat the alt-screen as home." xAI's answer to Claude Code.
-   **Grok Voice (June 4):** Conversational spoken interaction in the Grok mobile app.
-   **Grok Imagine Video 1.5:** #1 on the Image-to-Video Arena — 720p clips up to 15 seconds with native audio.
-   **Grok 4.6 (shipped August 7, 2026):** Released on schedule and to spec: 1.5T parameters, reusing the same V9 foundation as Grok 4.5 rather than scaling up. The gains come from improved supervised fine-tuning and RL, which keeps 4.5's speed and token efficiency. It launched first on SuperGrok, the xAI API console, and Grok Build. Target: Kimi K3 and the Opus tier.
-   **Grok 4.7 watch:** 2.1T parameters, a few weeks behind 4.6 — "better in every way except slightly slower to serve," with better token efficiency again. The 6T Grok 5 line has effectively been renumbered into this cadence; the largest model remains Q3 2026 or later.

Why Follow xAI Accounts

Even if you never use Grok, xAI's pace forces the other labs to respond. Grok 4.5's pricing and Grok Build's existence are directly shaping Anthropic and OpenAI roadmaps.

## Module 06: Resources — Aggregators and How to Follow Well

### The Aggregator

AE

AI Explorer [@ai\_explorer25](https://x.com/ai_explorer25)

Covers AI content broadly and surfaces free resources — courses, tools, papers, and tutorials. The safety net for anything the specialist accounts miss.

### How to Follow the Frontier Without Drowning

Fifteen accounts is a curriculum, not a feed. A sustainable practice:

-   **Builders over commentators.** Every account in this course ships the thing they talk about. That's the filter: primary sources only.
-   **Watch for convergence.** When Anthropic, OpenAI, and Cursor all ship "skills" within months of each other, that's not coincidence — that's the industry telling you what abstraction won. Cross-company patterns are the highest-value signal on this list.
-   **Read the long-form.** The X posts are pointers; the real payload is in the essays — Thariq's agent-design articles, Truell's "Third Era," Liu's Codex-maxxing, Karpathy's talks.
-   **Weekly beats daily.** The "Latest from the Feed" section at the top of this course exists so a weekly scan replaces doom-scrolling. Frontier news that matters survives seven days.

### The Full Roster

| Ecosystem | Account | Beat |
| --- | --- | --- |
| Anthropic | @karpathy | Pre-training, concepts, education |
| @bcherny | Claude Code tips & releases |  |
| @trq212 | Agent design essays |  |
| OpenAI | @polynoamial | Reasoning research |
| @gabriel1 | Sora / generative video |  |
| @jxnlco | Codex developer experience |  |
| Google AI | @OfficialLoganK | Gemini & AI Studio launches |
| @ammaar | Vibe coding, product & design |  |
| @fofrAI | Creative model exploration |  |
| Cursor | @leerob | Releases & education |
| @ericzakariasson | Workflows & practical tips |  |
| @mntruell | CEO — vision & milestones |  |
| xAI | @milichab | Grok product updates |
| @skcd42 | Grok Build & releases |  |
| General | @ai_explorer25 | Free resources & broad coverage |

Final Takeaway

The frontier moves through people before it moves through papers or products. These 15 accounts are where "what's next" shows up first — and this course updates itself weekly so the roster stays current.

AI Frontier Voices — Learning from the People Building It

Updated weekly by an automated research task. Last updated August 17, 2026.