# The 2026 AI Model Landscape — A Complete Course

Self-paced course · 10 modules

# The 2026 AI Model Landscape

A comprehensive, offline guide to every major model family shaping AI in 2026 — from Thinking Machines Lab's Inkling to the Mixture-of-Experts architecture that quietly took over the industry.

📚 10 Modules ⏱️ ~90 min read 📝 15,000+ words 🗓️ Updated July 29, 2026

0 of 10 modules complete

[

1

The 2026 Model LandscapeA map of frontier, open, reasoning, and small models

](#mod1)[

2

Inkling by Thinking Machines LabDeep dive on Mira Murati's first release

](#mod2)[

3

Mixture of ExpertsThe architecture that won 2026

](#mod3)[

4

Open Weight ModelsThe full roster, license by license

](#mod4)[

5

Closed Frontier ModelsClaude, GPT-5.6, Gemini 3.6, Grok 4.5

](#mod5)[

6

Multimodal ModelsBeyond text: image, audio, video

](#mod6)[

7

Reasoning ModelsChain-of-thought to extended thinking

](#mod7)[

8

Small & Efficient ModelsPhi-4, Gemma 4, and local inference

](#mod8)[

9

The Business of ModelsPricing, hosting, and enterprise strategy

](#mod9)[

10

What's NextRoadmap, regulation, and predictions

](#mod10)

## Module ★: Weekly Updates

*A running log of significant developments since this course was written. Newest first; entries older than 8 weeks are pruned.*

### Week of July 26, 2026

-   **Anthropic — Claude Opus 5 (July 24):** The new Opus flagship ships at $5/$25 per Mtok — unchanged from Opus 4.8 — with a 1M-token context window, 128K max output, and a low/medium/high effort toggle. It posts roughly 96% on SWE-bench Verified, effectively saturating the benchmark, and Anthropic positions it as approaching Fable 5's intelligence at half the price. A research-preview fast mode runs $10/$50 on the first-party API. Module 5 and the master table are updated.
-   **Moonshot AI — Kimi K3 open weights (July 26):** 2.8T parameters and a 1M-token context, released publicly — the largest open-weight model available. Roughly 594 GB in native MXFP4, up to 1.4 TB quantized, across 96 Hugging Face shards; Together AI and Modal announced day-zero hosting. See Module 4.
-   **Google — Gemini 3.6 Flash (July 21):** $1.50/$7.50 per Mtok, 1M context, day-one availability in AI Studio, the Gemini API, and the Gemini app. It uses ~17% fewer output tokens than 3.5 Flash while scoring higher on coding, long-context, and computer-use benchmarks. Google also shipped 3.5 Flash-Lite and a gated 3.5 Flash Cyber.
-   **Google — Gemini 3.5 Pro still has not shipped:** Promised at I/O on May 19, it missed the implied June target and a leaked July 17 target. DeepMind abandoned the base iteration over multi-step math and SVG generation ceilings, and reporting indicates the team moved to pretraining Gemini 4. Google remains the only major frontier lab without a 2026 flagship in general production.
-   **xAI — Grok 4.6 announced, not shipped:** Confirmed by Musk on July 18 with pre-training finished the week of July 20; a ~2T-parameter model targeting Kimi K3's capability at Grok 4.5's speed. No pricing, context window, or benchmarks confirmed. Grok 4.7 is claimed to follow about two weeks behind it.

## Module 1: The 2026 Model Landscape — A Map

If you last checked in on the AI model landscape when GPT-4 was the undisputed king, you would barely recognize the market today. In mid-2023, there were perhaps five models worth taking seriously. By July 2026, there are more than fifty models in active production use that can credibly claim frontier or near-frontier performance on at least one axis — reasoning, coding, multimodal understanding, cost-efficiency, or on-device deployment. The story of the last three years is not just "models got better." It's that the market fragmented into distinct categories, each optimizing for a different constraint, and no single lab dominates every category anymore.

Key Takeaway

The 2026 landscape is no longer a single leaderboard. It is at least six overlapping leaderboards — frontier closed, frontier open-weight, reasoning-specialized, multimodal-native, small/efficient, and domain-specific — and the "best" model depends entirely on which axis you're optimizing for.

### From monoculture to six categories

Through 2023 and much of 2024, "which model is best" was a simple question because there was essentially one dimension that mattered: raw capability on general benchmarks like MMLU. OpenAI's GPT-4 held that crown for over a year. Two structural shifts broke that monoculture.

The first shift was the maturation of Mixture-of-Experts (MoE) architectures, covered in depth in Module 3, which let labs decouple total parameter count from inference cost. This made it economically viable for many more organizations — not just the handful with the largest compute budgets — to train and serve genuinely large, capable models. The second shift was the open-weight movement gaining real parity with closed labs. Where open models were once a generation behind, families like GLM-5.2, Llama 4, and now Inkling are shipping within a few points of frontier closed models on many benchmarks, while being fully downloadable.

The result is a landscape best understood as six categories:

-   **Frontier closed models** — Claude (Anthropic), GPT-5.6 (OpenAI), Gemini (Google), Grok 4.5 (xAI). These are proprietary, API-only or app-gated, and represent the highest general-purpose capability ceiling, particularly for complex agentic coding and long-form reasoning.
-   **Frontier open-weight models** — Inkling (Thinking Machines Lab), GLM-5.2 (Zhipu AI), Llama 4 (Meta), Qwen 3/3.5 (Alibaba), DeepSeek V4, Mistral Large 3. Downloadable weights, often permissive licenses, competitive benchmarks.
-   **Reasoning-specialized models** — OpenAI's o-series, DeepSeek-R1, Claude's extended thinking mode, Gemini Deep Think. These trade inference-time compute for higher accuracy on math, logic, and multi-step problems.
-   **Multimodal-native models** — Inkling, Gemini, GPT-5.6 with vision/audio, increasingly treating text, image, audio, and video as first-class citizens rather than bolted-on encoders.
-   **Small and efficient models** — Phi-4, Gemma 4 (E4B/E2B), Mistral Small 4. Designed to run on a laptop, phone, or single consumer GPU.
-   **Domain-specific models** — Nemotron 3 Super (open training tooling), Gemini 3.5 Flash Cyber (gated security model), and a long tail of fine-tuned specialists for legal, medical, and scientific tasks.

### Who's actually competing in each lane

It's worth naming the organizations, because the roster looks very different than it did two years ago. Anthropic, OpenAI, and Google remain the three closed-frontier incumbents, but they're no longer alone at the top — xAI's Grok 4 has carved out a durable niche through tight X/Twitter integration and real-time data access. On the open-weight side, the most interesting development of 2026 is the arrival of Thinking Machines Lab, founded by former OpenAI CTO Mira Murati, which shipped its first model, Inkling, on July 15, 2026 — the same day this course was written. We cover Inkling in exhaustive detail in Module 2, but its existence alone reshuffles the open-weight conversation: it's the first genuinely frontier-adjacent open-weight model release from a Western lab funded at the same scale as the closed labs ($2B seed at a $12B valuation).

Chinese labs — Zhipu AI (GLM), Alibaba (Qwen), DeepSeek, and Moonshot (Kimi) — continue to release extremely competitive, often MIT or Apache-licensed models at a pace that Western open-weight players struggle to match. Meta's Llama 4 family remains the default "safe choice" for enterprises wanting an open-weight model with a recognizable brand and legal backing, even though its license (the Llama Community License) is more restrictive than a true open-source license. Microsoft continues to own the "small model done exceptionally well" lane with Phi-4, and Google's Gemma 4 family targets on-device and edge use cases that none of the frontier labs bother optimizing for.

### The master comparison table

Below is the most complete snapshot of the 2026 landscape we can offer in a single table. Treat parameter counts and benchmark numbers as representative of publicly disclosed figures as of July 2026 — exact numbers shift with model updates, but relative positioning is durable enough to plan around.

| Model | Organization | Total Params | Active Params | Architecture | Context | License | Price (in/out per 1M) | Standout Strength |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Claude Opus 5 | Anthropic | Undisclosed | Undisclosed | Dense/Transformer | 1M | Closed | $5 / $25 | ~96% SWE-bench Verified, effort toggle |
| Claude Opus 4.8 | Anthropic | Undisclosed | Undisclosed | Dense/Transformer | 1M+ | Closed | $5 / $25 | Previous Opus flagship, ~88.6% SWE-bench |
| Claude Fable 5 | Anthropic | Undisclosed | Undisclosed | Dense/Transformer | 1M+ | Closed | $10 / $50 | 95.0% SWE-Bench, 84.2% MMMU Pro |
| Claude Sonnet 5 | Anthropic | Undisclosed | Undisclosed | Dense/Transformer | 1M+ | Closed | $2 / $10 → $3 / $15 Sep 1 | Balanced cost/performance |
| Claude Haiku 4.5 | Anthropic | Undisclosed | Undisclosed | Dense/Transformer | 200K | Closed | $1 / $5 | Fast, cheap, high-volume |
| GPT-5.6 Sol | OpenAI | Undisclosed | Undisclosed | Undisclosed (MoE rumored) | Large | Closed | $5 / $30 | 88.8% Terminal-Bench 2.1, 92.5% ARC-AGI-2 |
| GPT-5.6 Terra | OpenAI | Undisclosed | Undisclosed | Undisclosed | Large | Closed | $2.50 / $15 | Mid-tier balance |
| GPT-5.6 Luna | OpenAI | Undisclosed | Undisclosed | Undisclosed | Large | Closed | $1 / $6 | Cheap high-volume tasks |
| Gemini 3.6 Flash | Google | Undisclosed | Undisclosed | Undisclosed (MoE) | 1M | Closed | $1.50 / $7.50 | ~17% fewer output tokens than 3.5 Flash |
| Gemini 3.1 Pro | Google | Undisclosed | Undisclosed | Undisclosed (MoE) | 2M | Closed | $2 / $12 | GPQA Diamond leader; 3.5 Pro never shipped |
| Gemini 3.1 Flash-Lite | Google | Undisclosed | Undisclosed | Undisclosed (MoE) | 1M | Closed | $0.10 / $0.40 | Cheapest frontier-adjacent option |
| Grok 4.5 | xAI | ~1.5T | Undisclosed | Undisclosed (MoE) | Large | Closed | ~$2 / $6 | Real-time X integration; 4.6 announced, unshipped |
| Inkling | Thinking Machines Lab | 975B | 41B | MoE, encoder-free multimodal | 1M | Open weights | Free (self-host) / hosted tiers | Adaptability, Tinker fine-tuning |
| GLM-5.2 | Zhipu AI | 750B | 40B | MoE | 1M | MIT | Free / hosted | Strongest all-round open-weight |
| Llama 4 Maverick | Meta | 400B | ~17B (per expert config) | MoE | 1M | Llama Community License | Free / hosted | Enterprise familiarity |
| Llama 4 Scout | Meta | 109B | 17B | MoE | 10M | Llama Community License | Free / hosted | Enormous context window |
| Qwen 3.5 (235B-A22B) | Alibaba | 235B | 22B | MoE | Large | Apache 2.0 | Free / hosted | 201 languages, strong reasoning |
| DeepSeek V4 | DeepSeek | Undisclosed (MoE) | Undisclosed | MoE | Large | MIT | $0.14/token (Flash) | Reasoning specialist, cheap |
| Mistral Large 3 | Mistral AI | Undisclosed | Undisclosed | Dense | Large | Apache 2.0 | Free / hosted | 80+ languages, European champion |
| Kimi K3 | Moonshot AI | 2.8T | Undisclosed | MoE | 1M | Kimi K3 License | Free / hosted | Largest open-weight model available |
| Gemma 4 (12B) | Google | 12B | Dense | Dense | Medium | Apache 2.0 | Free | Local-friendly, strong for size |
| Gemma 4 E4B | Google | 4.5B effective | Dense | Dense (edge) | Medium | Apache 2.0 | Free | 69.4% MMLU-Pro on-device |
| Phi-4 | Microsoft | 14B | Dense | Dense | Medium | MIT | Free | 84.8% MMLU, fits 12GB GPU |
| Nemotron 3 Super | NVIDIA | Undisclosed | Undisclosed | Dense/MoE hybrid | Large | Open (NVIDIA terms) | Free | Open training pipeline/resources |

Industry Perspective

A common refrain among AI infrastructure engineers in 2026 is that "the model is no longer the moat." With open-weight models trailing closed frontier models by only a few points on most benchmarks, competitive advantage increasingly comes from data, fine-tuning pipelines, retrieval systems, and product integration — not from having exclusive access to the single best base model.

### How to read this landscape as a builder

If you're choosing a model for a production system in mid-2026, the decision tree looks roughly like this. First, ask whether you need frontier-level reasoning or agentic coding capability where a few percentage points of accuracy matter — if so, you're likely looking at Claude Opus 4.8, Claude Fable 5, or GPT-5.6 Sol, and you'll pay premium pricing. Second, ask whether you need to self-host for data residency, cost, or customization reasons — if so, Inkling, GLM-5.2, or Llama 4 become your candidates, with the choice between them driven by license terms and how much you need the biggest possible active-parameter reasoning budget. Third, ask whether your task is genuinely simple (classification, extraction, short-form generation) — if so, small models like Phi-4 or Gemma 4 E4B, run locally, will save you enormous amounts of money with negligible quality loss. Finally, if your task involves audio, image, or video natively rather than as an afterthought, multimodal-native architectures like Inkling deserve a serious look, as detailed in Module 6.

The rest of this course walks through each category in depth, starting with the single most newsworthy release of the year: Inkling.

### How the benchmarks themselves have evolved

It's worth pausing on why the benchmark suite referenced throughout this course looks different from the one you'd have seen in 2024. MMLU, once the default headline number, has been substantially saturated by frontier models — enough top-tier systems now score in the low-to-mid 90s that it no longer discriminates well between them. In response, the field has shifted toward harder, more adversarially-constructed evaluations: MMLU-Pro adds harder distractor answers and more reasoning-heavy questions; ARC-AGI-2 is specifically designed to resist memorization by requiring genuine abstract pattern induction on novel puzzle-like tasks; Humanity's Last Exam (HLE) intentionally sources extremely difficult, expert-authored questions across dozens of fields specifically because easier benchmarks were becoming uninformative at the frontier; and SWE-Bench and Terminal-Bench measure real-world, verifiable task completion (does the code actually pass the test suite; did the agent actually accomplish the shell task) rather than static question answering, which is a better proxy for the agentic use cases that dominate 2026 production deployments.

This matters for how you should read every benchmark table in this course: a model's score is only as meaningful as the benchmark's resistance to gaming and its relevance to your actual workload. Treat benchmark numbers as directional evidence to be combined with your own evaluation on representative tasks, not as a substitute for it.

### Geography and the global model map

One more axis worth naming explicitly: geography. The frontier closed labs (Anthropic, OpenAI, Google, xAI) are all US-based. The open-weight landscape is far more globally distributed — Zhipu AI, Alibaba, DeepSeek, and Moonshot are all Chinese labs shipping some of the strongest MIT/Apache-licensed models available, Mistral represents Europe, and Thinking Machines Lab's Inkling adds a new US-based open-weight entrant to a category that, until mid-2026, was dominated by non-US labs. This geographic spread has real practical consequences: export control regimes, data sovereignty requirements, and regional regulatory frameworks (like the EU AI Act, covered in Module 10) increasingly factor into which models an organization is even permitted to evaluate, not just which one performs best.

## Module 2: Inkling by Thinking Machines Lab — Deep Dive

On July 15, 2026, Thinking Machines Lab released Inkling, its first flagship model, alongside a preview of a smaller sibling called Inkling-Small. This is arguably the single most closely watched model launch of the year — not because Inkling tops every leaderboard (it doesn't), but because of who built it, how fast they built it, and the strategic bet embedded in how they're releasing it.

### The Mira Murati story

Mira Murati served as OpenAI's Chief Technology Officer through some of the company's most consequential years, including the launch of ChatGPT and GPT-4. She departed OpenAI in September 2024, one of a wave of senior departures from the company that year. Rather than joining an existing lab, Murati set out to build her own — founding Thinking Machines Lab in February 2025 alongside John Schulman, a co-founder of OpenAI and one of the primary architects of the RLHF (reinforcement learning from human feedback) techniques that made ChatGPT possible, and Lilian Weng, another high-profile OpenAI alum known for her widely-read technical writing on agents, diffusion models, and safety.

The founding team's pedigree let Thinking Machines Lab raise an unusually large seed round: $2 billion at a $12 billion valuation, led by a16z, with participation from Accel, Nvidia, and AMD — notably, two of the largest chip makers in the world backing a model lab directly — plus Jane Street, a proprietary trading firm with deep quantitative and infrastructure expertise. This is one of the largest seed rounds in technology history, reflecting investor confidence that a team with this specific combination of research and engineering leadership could execute quickly.

Thinking Machines Lab is structured as a public benefit corporation (PBC), a legal structure that allows the company to weigh public benefit alongside shareholder returns in its decision-making — a structure Anthropic and OpenAI's nonprofit-adjacent structures have popularized in the AI industry as a way to signal mission alignment to employees, regulators, and the public without fully forgoing commercial upside.

Key Takeaway

Inkling went from company founding (February 2025) to public model release (July 15, 2026) in roughly 18 months — a pace the company itself highlighted as evidence that a small, senior, well-funded team can compress the traditional multi-year timeline to a frontier-adjacent model.

### Architecture deep dive

Inkling is a Mixture-of-Experts model with 975 billion total parameters, of which only 41 billion are active for any given token — a sparsity ratio in line with other leading MoE systems (see Module 3 for the general mechanics). It was trained on 45 trillion tokens spanning text, image, audio, and video, making it multimodal from the ground up rather than through post-hoc adapter layers.

The most technically distinctive choice in Inkling's design is that it is **encoder-free** for two of its modalities. Most multimodal models pair a language model backbone with a separate pretrained encoder for each additional modality — a CLIP-style vision encoder for images, a Whisper-style encoder for audio — and then project those encoder outputs into the language model's embedding space. Inkling instead represents audio as discrete **dMel spectrograms** (a discretized mel-spectrogram tokenization scheme) and images as raw **40x40 pixel patches**, feeding both directly into the same token stream the language model already processes. This removes an entire class of architecture (the modality-specific encoder) and lets a single unified transformer/MoE stack learn cross-modal relationships end-to-end.

This is a meaningful bet: encoder-free multimodal architectures are harder to train stably (there's no pretrained encoder doing representation-learning heavy lifting up front) but can, in principle, capture cross-modal correlations that encoder-based approaches structurally cannot, because nothing is lost in a lossy encoder bottleneck before the main model even sees the data.

Inkling supports a 1 million token context window and offers **controllable thinking effort** — a user- or API-exposed parameter that trades inference latency and cost for deeper chain-of-thought reasoning, similar in spirit to reasoning-effort controls in other 2026 frontier models (see Module 7).

### Benchmark performance

Inkling's benchmark profile paints a consistent picture: strong, broadly competent, but not the outright leader on the hardest agentic coding and terminal-use benchmarks.

| Benchmark | Inkling Score | What It Measures |
| --- | --- | --- |
| MMMU Pro | 73.5% | Graduate-level multimodal reasoning |
| VoiceBench | 91.4% | Spoken language understanding |
| FORTRESS Adversarial | 78.0% | Robustness to adversarial prompts |
| AIME 2026 | 97.1% | Competition mathematics |
| SWE-Bench | 77.6% | Real-world software engineering tasks |
| MCP Atlas | 74.1% | Tool-use / Model Context Protocol tasks |
| Humanity's Last Exam (HLE) | 30.0% | Extremely hard cross-domain expert questions |

Two comparisons are worth calling out explicitly because they define the honest competitive positioning of the model. On SWE-Bench, Inkling's 77.6% trails Claude Fable 5's 95.0% by a wide margin — nearly 18 points — which matters enormously for anyone evaluating models specifically for autonomous coding agents. On Terminal-Bench, GPT-5.6 Sol's 89.5% versus Inkling's comparatively weaker showing (63.8% in the data available) tells a similar story: for pure terminal-driving agentic tasks, the closed frontier labs still have a clear edge.

> **Warning:** Important
>
> Inkling is not, on current public benchmarks, the strongest model for autonomous coding or terminal-agent workloads. If your use case is specifically "build me an agent that operates a shell and ships PRs unsupervised," Claude Fable 5 or GPT-5.6 Sol currently outperform it by a wide margin. Inkling's strength lies elsewhere.

### Where Inkling actually wins: adaptability

Thinking Machines Lab has been explicit and consistent in its own positioning: Inkling is "not the strongest, but the most adaptable." This is a deliberate strategic choice rather than a consolation prize, and it rests on two pillars.

The first pillar is the **Tinker platform**, Thinking Machines Lab's customization and fine-tuning offering built specifically around Inkling. Tinker is designed to make it straightforward for a team to adapt Inkling's weights to a specific domain, style, or task distribution without needing the enormous infrastructure typically required for large-model fine-tuning. Because Inkling is fully open-weight, Tinker can operate directly on the underlying parameters rather than working through the constrained fine-tuning APIs that closed labs expose.

The second pillar is distribution. Inkling shipped simultaneously on HuggingFace, Together AI, Fireworks, Modal, Databricks, and Baseten — essentially every major inference and MLOps platform that serious AI teams already use. This is a stark contrast to a typical closed-model launch, which is usually API-only and single-vendor at first. It signals that Thinking Machines Lab is optimizing for "meet developers wherever they already are" rather than building a walled garden.

For lighter interactive use, Thinking Machines Lab also offers the **Inkling Playground**, a hosted chat interface comparable to ChatGPT or Claude.ai, aimed at less technical users who want to try the model without touching an API or downloading weights.

### The open-weights strategic bet

Releasing a 975-billion-parameter model with open weights is a significant strategic choice with real trade-offs. On one hand, it forgoes the ability to charge premium API-only pricing the way Anthropic and OpenAI do for their top-tier models. On the other hand, it builds enormous developer goodwill and distribution reach immediately, and it makes the Tinker fine-tuning business model viable — you can't sell customization tooling for a model people can't touch.

It also positions Thinking Machines Lab favorably against regulatory headwinds. As discussed in Module 10, open-weight models receive certain exemptions and lighter-touch treatment under frameworks like the EU AI Act relative to closed frontier systems, even though core obligations around copyright and training-data transparency still apply to everyone.

Industry Perspective

Several analysts have framed Inkling's release as validation of a broader thesis: that the next wave of AI competition will not be won purely on benchmark leaderboards, but on how cheaply and flexibly an organization can adapt a capable base model to its own proprietary data and workflows. If that thesis holds, "adaptable" may prove to be a more durable competitive position than "strongest," even if it reads as a hedge on launch day.

### What Inkling means for the rest of the industry

Inkling's existence changes the calculus for every other lab in a few concrete ways. It proves that a team of roughly a few hundred people, operating for about 18 months, can produce a model within striking distance of the frontier on many axes — compressing what used to be considered a multi-year, thousand-person undertaking. It adds a credible, Western, well-capitalized, open-weight competitor to a category that had been dominated by Chinese labs (GLM, Qwen, DeepSeek, Kimi) and Meta. And it puts pressure on Anthropic and OpenAI specifically, given the founders' direct lineage from OpenAI — this is in some sense "the OpenAI alumni model," and its performance and adoption will be read by the market as a referendum on how much of frontier model capability lives in institutional knowledge that walks out the door with senior researchers.

### Inkling-Small and the roadmap beyond launch day

Alongside the flagship Inkling release, Thinking Machines Lab previewed Inkling-Small, a lighter-weight sibling aimed at the same use cases as the small/efficient model category discussed in Module 8: local deployment, lower-latency applications, and cost-sensitive high-volume workloads where the full 975B/41B-active flagship would be overkill. Full benchmark and parameter disclosures for Inkling-Small were not yet complete at launch, but its existence signals a deliberate multi-tier product strategy rather than a single-model release — mirroring the tiered approach every other major lab (Claude's Opus/Fable/Sonnet/Haiku ladder, GPT-5.6's Sol/Terra/Luna ladder) has already converged on.

The company has also signaled that Tinker and the Inkling Playground will continue to receive iteration independent of the base model itself, treating the surrounding tooling as a first-class product rather than a thin wrapper around the weights. For teams evaluating Inkling, this means the honest comparison point isn't just "Inkling vs. GLM-5.2 on a benchmark table" — it's "Inkling plus Tinker's fine-tuning workflow vs. whatever customization path a competing open-weight model offers," which is a fundamentally different, and for many teams more relevant, comparison.

> **Warning:** Important
>
> As with any model released on the same day this course was written, treat Inkling's benchmark figures as the company's own initial disclosures. Independent, third-party reproduction of these numbers — and real-world performance on your specific workload — should inform any final model-selection decision, not launch-day marketing figures alone.

## Module 3: Mixture of Experts (MoE) — The Architecture That Won

If there is one architectural decision that defines the 2026 model landscape more than any other, it is the near-total industry shift toward Mixture-of-Experts (MoE) architectures. Over 60% of open-source AI releases in 2026 use MoE, and every model in Module 1's comparison table with a disclosed architecture other than the very smallest edge models is either MoE or MoE-adjacent. Understanding how MoE works — and why it won — is essential to understanding everything else in this course.

### The core idea: sparse activation

A traditional "dense" transformer uses every one of its parameters to process every token. If you have a 70-billion-parameter dense model, generating a single token requires computation that touches all 70 billion parameters. This is simple and has been the default architecture for most of the history of large language models, but it means model size and inference cost are locked together: to get a bigger, more capable model, you must pay for proportionally more compute on every single token you generate, whether or not that token actually needed all that capacity.

MoE breaks this coupling. Instead of one enormous feed-forward network that every token passes through, an MoE layer contains many smaller "expert" networks — often 8, 16, 64, or more — plus a small **gating network**, also called a **router**. For each token, the router looks at that token's representation and decides which small subset of experts should process it. A common configuration is **top-2 routing with 8 experts**, meaning each token is sent to just 2 of the 8 available experts — only 25% of the expert parameters are actually activated for that token, even though all 8 experts' weights exist and were trained.

Key Takeaway

MoE lets you scale a model's total parameter count — and therefore its total learned knowledge and capacity — far beyond what you could afford to run densely, because inference cost tracks the smaller "active parameter" count, not the total parameter count. This is why you'll see models described with two numbers, like Inkling's "975B total, 41B active."

### How the router actually works

Mechanically, the gating network is typically a small linear layer followed by a softmax (or a similar normalization) that takes the incoming token's hidden-state vector and produces a score for each expert. The top-k experts by score are selected — in top-2 routing, the two highest-scoring experts. The token is processed by both selected experts, and their outputs are combined, usually as a weighted sum using the router's own scores as weights. This means the router isn't just picking experts, it's also learning how much to trust each one for a given token.

Crucially, this routing decision is learned end-to-end along with everything else during training. Nobody hand-assigns "this expert handles math, this expert handles poetry." In practice, researchers observe experts specializing along various axes — sometimes semantic (a cluster of experts that activate heavily for code), sometimes more diffuse and harder to interpret — but the specialization emerges from gradient descent, not from design.

### Why this makes both training and inference cheaper

The efficiency gains from MoE are substantial and well-documented across 2026's major releases. Compared to an equivalently capable dense model, well-tuned MoE architectures deliver up to 70% lower computation per token, roughly 10x faster inference in production serving conditions, and about one-tenth the cost per token generated. This is the single biggest reason API pricing across the industry has fallen 60-80% since early 2025 (see Module 9) — it is far cheaper to serve a 975B-total/41B-active MoE model than it would be to serve a dense 975B model, even though the MoE model may match or exceed the dense model's quality on many tasks.

The training-side economics are more nuanced. You still need to store, checkpoint, and update the gradients for all the experts, including ones a given batch of data rarely routes to — so MoE doesn't proportionally reduce training compute the way it reduces inference compute. But it does let a lab reach a higher total-parameter, higher-capacity model within a fixed training compute budget, which is why virtually every lab racing for larger effective model capacity in 2026 has adopted MoE rather than continuing to scale dense architectures.

### The MoE roster in 2026

| Model | Organization | Total Params | Active Params | Active Ratio |
| --- | --- | --- | --- | --- |
| Inkling | Thinking Machines Lab | 975B | 41B | ~4.2% |
| GLM-5.2 | Zhipu AI | 750B | 40B | ~5.3% |
| Llama 4 Maverick | Meta | 400B | ~17B | ~4.3% |
| DeepSeek V3/V4 | DeepSeek | Large (undisclosed exact) | Small subset | Low single digits |
| Qwen3-Coder | Alibaba | 480B | Subset (coder-tuned) | Low single digits |
| Kimi K3 | Moonshot AI | 2.8T | Subset | Low single digits |
| MiniMax M3 | MiniMax | Large (undisclosed exact) | Subset | Low single digits |

Notice the pattern: active-parameter ratios across the industry cluster in the low single digits to roughly 5%. This isn't a coincidence — it reflects a fairly convergent understanding among researchers of the sweet spot between "enough active capacity per token to reason well" and "sparse enough to get the cost benefits that justify going MoE in the first place."

### Training challenges that don't show up in the marketing

MoE is not free complexity. Labs that have shipped production MoE systems consistently report two recurring failure modes.

**Expert collapse** occurs when the router learns to favor a small subset of experts disproportionately, starving the rest of training signal. Once an expert receives little gradient update, it tends to stay unattractive to the router (because it never improves), reinforcing the imbalance in a vicious cycle. Left unaddressed, a model can effectively degrade toward using only a handful of its many experts, wasting most of the parameter budget it was trained with.

**Load imbalance** is the systems-engineering sibling of expert collapse. Even short of full collapse, if some experts are routed to far more often than others, the GPUs or TPUs hosting the popular experts become bottlenecks while the ones hosting rarely-used experts sit idle — a serious problem in distributed training and serving where experts are typically sharded across many devices.

Both problems are commonly addressed with **auxiliary load-balancing losses** added to the training objective, which penalize the model for uneven routing distributions, alongside capacity limits that simply drop or reroute tokens once an expert's per-batch capacity is exceeded. A third, subtler challenge is **communication overhead**: because experts are sharded across devices in large-scale training, routing a token to an expert on a different device requires an all-to-all communication step, which can dominate wall-clock training time if not carefully optimized with high-bandwidth interconnects and clever batching.

### When MoE beats dense — and when it doesn't

MoE's advantages are largest when you want maximum capability at a given inference budget, and you have enough training data and compute to justify a very large total parameter count. This describes essentially every frontier lab in 2026. MoE is less obviously advantageous for small models — an edge model like Gemma 4 E2B, meant to run entirely on a phone with 6GB of RAM, gains little from MoE's sparsity trick, because the entire point is to keep total memory footprint small, and MoE's efficiency gain comes precisely from having a large total parameter pool you don't fully activate. For genuinely small models, dense architectures paired with aggressive quantization (Module 8) remain the more practical choice.

### Deploying an MoE model with vLLM

In production, MoE models are typically served with inference engines that have been specifically optimized for sparse expert routing, expert parallelism across GPUs, and efficient batching. vLLM is the most widely adopted open-source engine for this in 2026, with native support for expert-parallel serving of models like Llama 4, Qwen3, DeepSeek, and Mixtral-family architectures.

Python — Serving an MoE model with vLLM

```
# Install vLLM with MoE / expert-parallel support
# pip install vllm

from vllm import LLM, SamplingParams

# Load an MoE model with tensor + expert parallelism across 4 GPUs.
# vLLM automatically detects the MoE architecture from the model config
# and shards experts across the available devices.
llm = LLM(
    model="meta-llama/Llama-4-Maverick",
    tensor_parallel_size=4,
    enable_expert_parallel=True,   # route experts across GPU shards
    max_model_len=32768,
    gpu_memory_utilization=0.90,
    dtype="bfloat16",
)

sampling_params = SamplingParams(
    temperature=0.7,
    top_p=0.9,
    max_tokens=1024,
)

prompts = [
    "Summarize the trade-offs between dense and MoE architectures "
    "for a team deciding how to serve a 400B-parameter model."
]

outputs = llm.generate(prompts, sampling_params)
for output in outputs:
    print(output.outputs[0].text)

# Notes:
# - enable_expert_parallel splits experts (not just layers) across GPUs,
#   which reduces per-GPU memory pressure for very large MoE models.
# - Only "active" experts contribute to the forward pass per token, so
#   observed inference latency tracks the active-parameter count, not
#   the total parameter count, even though all experts occupy VRAM.
# - For multi-node serving of models like Inkling (975B total / 41B
#   active) you would additionally configure pipeline_parallel_size
#   and a high-bandwidth interconnect (NVLink/InfiniBand) between nodes.
```

> **Warning:** Important
>
> Even though only a fraction of an MoE model's parameters are active per token, you still need enough total GPU memory (VRAM) to hold every expert, because you can't predict in advance which experts a given request will route to. A 975B-parameter MoE model needs memory provisioning closer to its total parameter count than its active parameter count, even though its compute cost tracks the active count.

### MoE versus other sparsity and efficiency techniques

It's worth situating MoE against other efficiency techniques it's sometimes confused with. Quantization (covered in depth in Module 8) reduces the numerical precision of every weight uniformly and is orthogonal to MoE — you can and often do quantize an MoE model's experts, stacking both techniques for compounded savings. Pruning removes individual weights or whole neurons deemed unimportant after training, a static, one-time compression step, whereas MoE's sparsity is dynamic and input-dependent, decided fresh for every token at inference time. Speculative decoding, another popular 2026 efficiency technique, uses a small draft model to propose multiple tokens that a larger model then verifies in parallel — this speeds up generation latency without touching parameter count or architecture at all, and is also commonly layered on top of MoE-served models for additional throughput gains. Understanding that these techniques are complementary rather than competing is important: a well-optimized 2026 production deployment of a model like Inkling or GLM-5.2 will typically combine MoE's architectural sparsity, aggressive quantization of the active experts, and speculative decoding at the serving layer simultaneously.

### A brief history: how MoE went from research curiosity to default

Sparse mixture-of-experts layers have existed in the machine learning literature since well before the current generation of large language models, but they remained a research niche through most of the 2010s due to the engineering difficulty of efficiently routing and parallelizing token-to-expert assignment at scale. The technique moved from curiosity to production reality only once distributed training infrastructure matured enough to handle the all-to-all communication patterns MoE requires without that communication overhead swamping the compute savings. By 2023-2024, several labs had demonstrated MoE models matching or exceeding dense models of similar active-parameter budgets, and by 2026 the pattern has fully inverted: it would now be unusual, not innovative, for a lab targeting frontier-adjacent total capability to choose a dense architecture over MoE, barring a specific reason (like targeting extreme edge-device deployment) to prioritize total memory footprint over total capacity.

## Module 4: Open Weight Models — The Full Roster

Open-weight models — models whose trained parameters are published for anyone to download, run, and in most cases fine-tune — have gone from a curiosity to a genuine parallel ecosystem to frontier closed models. This module walks through every major family in detail, because the differences between them (architecture, license, language coverage, intended use case) matter enormously once you're actually choosing one to deploy.

### Inkling (Thinking Machines Lab)

975B / 41B active Open weights

Covered in full in Module 2. The headline open-weight release of 2026: a 975B-total, 41B-active MoE model with encoder-free native multimodality (dMel spectrograms for audio, 40x40 pixel patches for images), a 1M token context window, and controllable thinking effort. Available across HuggingFace, Together AI, Fireworks, Modal, Databricks, and Baseten, with the Tinker platform for fine-tuning. Positioned explicitly as "not the strongest, but the most adaptable," trailing Claude Fable 5 on SWE-Bench (77.6% vs 95.0%) and GPT-5.6 Sol on Terminal-Bench, but leading on cost of customization and breadth of distribution.

### GLM-5.2 (Zhipu AI)

750B / 40B active MIT License

Widely regarded heading into mid-2026 as the strongest all-round open-weight model, GLM-5.2 is a 750-billion-parameter MoE model with 40 billion active parameters and a 1 million token context window. Its MIT license is about as permissive as open-source licensing gets — no field-of-use restrictions, no attribution requirements beyond standard MIT terms, full commercial use permitted. Zhipu AI (also known internationally as Z.ai) has built a reputation for consistently shipping close to state-of-the-art open-weight performance on general reasoning and coding benchmarks, and GLM-5.2 continues that trend. For teams wanting maximum legal simplicity alongside frontier-adjacent capability, GLM-5.2 is frequently the default recommendation.

### Llama 4 (Meta)

Maverick: 400B MoE Scout: 10M context Llama Community License

Meta's Llama 4 family ships in two primary configurations. **Maverick** is a 400-billion-parameter MoE model tuned for general-purpose capability. **Scout** trades some raw parameter count for an extraordinary 10 million token context window, making it the go-to choice within the Llama family for tasks involving enormous documents, codebases, or multi-document synthesis that would exceed the context limits of nearly every other model on the market. The Llama Community License is not a true open-source license by OSI standards — it includes restrictions (notably requiring large companies above a certain monthly active user threshold to obtain a separate commercial license from Meta) — but it remains free and unrestricted for the overwhelming majority of developers and companies. Llama's biggest advantage is ecosystem maturity: more fine-tuning tooling, more community documentation, and more enterprise vendor support has been built around Llama than almost any other open-weight family, simply because it's been around longest at scale.

### Gemma 4 (Google)

12B dense / E4B / E2B edge Apache 2.0

Gemma 4 is Google's answer to "what if the open-weight model was designed for phones and laptops, not data centers." The flagship 12B dense model is a strong general-purpose model in its own right, but the E4B (4.5B effective parameters) and E2B edge variants are the more distinctive offering: E4B reaches 69.4% on MMLU-Pro while remaining small enough to run on a smartphone at around 5GB RAM with 4-bit quantization, and E2B is tuned to run on Android devices with as little as 6GB RAM, achieving 10-25 tokens per second on a Pixel 9 Pro. Apache 2.0 licensing makes it fully unrestricted for commercial use. See Module 8 for hands-on local deployment details.

### Qwen 3 / 3.5 (Alibaba)

235B-A22B Apache 2.0

Alibaba's Qwen family has become one of the most respected open-weight lines specifically for reasoning-heavy tasks, with the 235B-total/22B-active MoE configuration ("235B-A22B" in Qwen's own naming shorthand) delivering strong math, code, and logic performance. Qwen's standout differentiator is language coverage: it supports 201 languages, making it the strongest open-weight choice by a wide margin for multilingual applications, particularly for lower-resource languages that most Western labs undertrain. Apache 2.0 licensing keeps it fully permissive. Alibaba also ships Qwen3-Coder-480B as a dedicated coding-specialist MoE variant.

### DeepSeek V4 (DeepSeek)

Reasoning specialist MIT License

DeepSeek has built its brand specifically around reasoning capability delivered at extremely low cost — DeepSeek V4 continues the lineage established by DeepSeek-R1 (Module 7) of using reinforcement-learning-heavy training to produce strong chain-of-thought reasoning without the largest possible parameter count. MIT licensing and famously aggressive pricing (DeepSeek V4 Flash runs at roughly $0.14 per million tokens) have made DeepSeek a default choice for cost-sensitive reasoning workloads, particularly in contexts where teams are running very high request volumes.

### Mistral Large 3 / Small 4 (Mistral AI)

Dense Apache 2.0

Mistral remains Europe's flagship AI lab and the closest thing to a European "national champion" in the model landscape. Mistral Large 3 targets general frontier-adjacent capability, while Mistral Small 4 targets efficient deployment. The family's language coverage (80+ languages) and Apache 2.0 licensing make it a common default for European enterprises navigating GDPR and EU AI Act compliance who want a model developed under EU jurisdiction from the outset (see Module 10).

### Phi-4 (Microsoft)

14B dense MIT License

Covered in depth in Module 8. A 14-billion-parameter dense model achieving 84.8% on MMLU while fitting comfortably on a single 12GB consumer GPU, MIT licensed. Phi-4 is Microsoft's proof point that careful data curation and training methodology can substitute for raw parameter count, and it remains one of the most efficient "quality per parameter" models on the market.

### Kimi K3 (Moonshot AI)

MoE, largest open-weight model available

Moonshot AI's Kimi K-series positioned itself as a coding specialist among open-weight MoE models, competing with Qwen3-Coder and DeepSeek for developer mindshare. The K2.6/K2.7 line continued that incremental cadence — and then **Kimi K3 changed the category**.

Moonshot released K3's weights publicly on **July 26, 2026**: **2.8 trillion parameters** with a **1M-token context window**, making it the largest open-weight model publicly available by a wide margin. Together AI and Modal both announced day-zero hosted access timed to the drop, so you can evaluate it without owning the hardware.

The catch is inference economics. The weights are roughly **594 GB in native MXFP4 format, and up to 1.4 TB depending on quantization** — the official Hugging Face repository ships 96 weight shards alongside the Kimi K3 License and deployment configs. "Open weights" here does not mean "runs on your workstation"; it means a well-funded team can self-host a frontier-adjacent model without vendor permission. That is a meaningful strategic difference, but the capital requirement is real.

The release also landed squarely in the open-weights policy debate. Anthropic CEO Dario Amodei addressed it directly, saying Anthropic "has never advocated for a ban on open-weights models" and describing non-dangerous open models as "a public good," while continuing to push for chip export controls, anti-distillation enforcement, and mandatory safety testing.

### Nemotron 3 Super (NVIDIA)

Dense/MoE hybrid

NVIDIA's Nemotron 3 Super line is notable less for topping benchmarks and more for what it represents strategically: NVIDIA, as the dominant supplier of the GPUs everyone else trains and serves models on, has increasingly opened its own training resources, recipes, and tooling alongside the model itself. This makes Nemotron a useful reference implementation for teams who want to understand or replicate NVIDIA's own training pipeline rather than treating the model purely as a black-box download.

### Comparing licenses at a glance

| Model | License | Commercial Use | Restrictions |
| --- | --- | --- | --- |
| GLM-5.2 | MIT | Unrestricted | None beyond standard MIT terms |
| DeepSeek V4 | MIT | Unrestricted | None beyond standard MIT terms |
| Phi-4 | MIT | Unrestricted | None beyond standard MIT terms |
| Qwen 3/3.5 | Apache 2.0 | Unrestricted | Patent grant included |
| Gemma 4 | Apache 2.0 (+ usage terms) | Mostly unrestricted | Google's supplementary usage policy applies |
| Mistral Large 3 / Small 4 | Apache 2.0 | Unrestricted | Patent grant included |
| Inkling | Open weights | Broadly permitted | Review Thinking Machines Lab's release terms per use case |
| Llama 4 | Llama Community License | Conditional | Separate license required above large MAU threshold |
| Kimi K3 | Kimi K3 License | Conditional | Check attribution/field-of-use terms |

Key Takeaway

"Open-weight" is not one thing. MIT and Apache 2.0 licensed models (GLM-5.2, DeepSeek V4, Phi-4, Qwen, Mistral) give you essentially unrestricted commercial rights. Llama's Community License and Kimi's modified terms are free for most users but carry conditions that matter once you're operating at large scale — always read the actual license text before betting a product on one.

### Choosing between them

For maximum legal simplicity with frontier-adjacent capability: GLM-5.2. For the largest possible context window on genuinely enormous documents: Llama 4 Scout. For multilingual coverage: Qwen 3.5. For cheap, strong reasoning at scale: DeepSeek V4. For on-device/edge deployment: Gemma 4 E4B/E2B or Phi-4. For maximum fine-tuning adaptability with a well-funded platform behind it: Inkling via Tinker. For coding-specific workloads: Kimi K3 (if you can serve 2.8T parameters) or Qwen3-Coder-480B. There is rarely a single "best" open-weight model — the right choice is a function of your license constraints, your context length needs, and your deployment target.

### The community and tooling ecosystem around open-weight models

A model's raw weights are only part of what makes it usable in practice. HuggingFace remains the central hub where nearly every open-weight family in this module gets published, discussed, and iterated on by the community — quantized variants, fine-tuned derivatives, and evaluation harnesses for a given base model typically appear within days of release. Inference platforms like Together AI, Fireworks, Modal, Replicate, and Baseten compete on serving these models with optimized latency and pricing, effectively turning open weights into a commodity API experience without requiring self-hosting. And a rich derivative ecosystem has grown up around the most popular base models specifically — community fine-tunes of Llama and Qwen models for narrow domains (legal document review, customer support, creative writing in specific styles) number in the tens of thousands on HuggingFace alone, illustrating that the value of an open-weight release compounds well beyond the original lab's own roadmap once the community starts building on it.

This ecosystem effect is itself a selection criterion. A newer entrant like Inkling starts with less of this derivative ecosystem than a multi-year-mature family like Llama, even if its base capability is competitive — for teams that rely heavily on community fine-tunes or third-party tooling rather than building their own, ecosystem maturity can be as important a factor as raw benchmark scores.

## Module 5: Closed/Proprietary Frontier Models

Despite the rapid rise of open-weight competitors, the four major closed labs — Anthropic, OpenAI, Google, and xAI — retain a clear edge on the hardest agentic and reasoning tasks in mid-2026. This module covers each family and the pricing trade-offs between tiers.

### Why closed labs still command premium pricing

It's worth being explicit about what closed labs are actually selling at a premium, because it isn't simply "a good model" — open-weight alternatives are good models too, often at a fraction of the API cost. What closed frontier labs sell is a bundle: the single highest capability ceiling on the hardest tasks (particularly agentic coding and tool use, where Claude Fable 5 and GPT-5.6 Sol maintain clear leads), a fully managed inference experience with no infrastructure burden, continuous silent model improvements without requiring the customer to re-evaluate or re-deploy anything, enterprise-grade support, uptime SLAs, and compliance certifications that many regulated industries require as a condition of vendor approval, and a brand and track record that materially shortens procurement and legal review cycles inside large organizations. For a startup optimizing purely for cost per token, this bundle may not be worth the premium. For an enterprise where engineering time, compliance risk, and reliability guarantees dominate the total cost calculation, it frequently is.

### Claude family (Anthropic)

Anthropic's Claude lineup is widely regarded as the overall capability leader in 2026, with particular strength in coding and long-form writing quality. The family spans several tiers:

-   **Claude Opus 5** — released July 24, 2026 and now the flagship Opus tier. Priced at $5/$25 per million input/output tokens (unchanged from Opus 4.8), with a 1M-token context window, 128K max output, and a low/medium/high effort toggle that trades latency and cost against depth. It posts roughly 96% on SWE-bench Verified, essentially saturating the industry's standard software-engineering benchmark, and Anthropic positions it as approaching Fable 5's intelligence at half the price. A research-preview "fast mode" is available on the first-party API at $10/$50.
-   **Claude Opus 4.8** — the previous Opus flagship, still available at the same $5/$25 pricing and ~88.6% on SWE-bench Verified. Worth keeping in mind for workloads already tuned against it.
-   **Claude Fable 5** — priced at $10/$50 per million input/output tokens, Fable 5 posts a striking 95.0% on SWE-Bench and 84.2% on MMMU Pro, making it a top choice for autonomous coding agents and multimodal reasoning workloads where accuracy justifies premium pricing. Note that Opus 5's ~96% SWE-bench Verified result is reported from a different source than Fable 5's 95.0%; the two figures may not use identical methodology, so treat them as "both effectively saturate the benchmark" rather than as a precise ranking.
-   **Claude Sonnet 5** — the balanced workhorse tier for teams that need strong general capability without Opus/Fable-tier pricing, with a 1M-token context window. Introductory pricing of **$2/$10 runs through August 31, 2026**, after which it moves to standard $3/$15 — budget for the step-up if you are costing out a long-lived workload.
-   **Claude Haiku 4.5** — the fast, cheap tier for high-volume, latency-sensitive tasks, priced at $1/$5.

Claude also offers an extended thinking mode (Module 7), refined since its introduction in the Claude 4 generation, which lets the model allocate additional inference-time compute to harder problems. Claude 4.6 and later include the full 1M-token context window at standard pricing, with no long-context premium.

A pricing trap worth knowing about

Claude 4.7 and later models use a newer tokenizer that produces roughly **30% more tokens for the same text** than Claude 4.6 and earlier. Because you are billed per token, a model at the same headline $/Mtok rate can still cost meaningfully more to run on identical inputs. Always benchmark on your own workload before assuming a same-price upgrade is cost-neutral.

### GPT-5.6 family (OpenAI)

OpenAI released GPT-5.6 on July 9, 2026 — just six days before Inkling's launch — across three tiers named Sol, Terra, and Luna:

-   **GPT-5.6 Sol** — priced at $5/$30, Sol is the top-tier model and currently leads two of the most demanding agentic benchmarks in the industry: Terminal-Bench 2.1 at 88.8% and ARC-AGI-2 at 92.5%. These are meaningful results — Terminal-Bench specifically measures a model's ability to autonomously operate a command-line environment to complete real tasks, and ARC-AGI-2 is designed to resist simple pattern-memorization, making genuine gains on it a strong signal of general fluid reasoning capability.
-   **GPT-5.6 Terra** — priced at $2.50/$15, a mid-tier option balancing cost and capability.
-   **GPT-5.6 Luna** — priced at $1/$6, the cheapest tier, aimed at high-volume, cost-sensitive applications.

### Gemini 3.6 Flash (Google) — and the flagship that never shipped

Google shipped **Gemini 3.6 Flash** on July 21, 2026 at $1.50/$7.50 per million input/output tokens with a 1M-token context window, available day one in AI Studio, the Gemini API, and the Gemini app. It is positioned as the everyday workhorse for coding, knowledge work, and multimodal tasks, and it uses roughly **17% fewer output tokens** than Gemini 3.5 Flash while scoring higher on coding, long-context, and computer-use benchmarks — so its effective cost advantage is larger than the sticker price implies. Google launched two companions alongside it: **Gemini 3.5 Flash-Lite**, a cheaper and faster tier for high-volume work, and **Gemini 3.5 Flash Cyber**, a gated security model restricted to governments and trusted partners.

The more strategically important fact is what Google *hasn't* shipped. **Gemini 3.5 Pro has never launched.** Sundar Pichai promised it on stage at Google I/O on May 19, 2026, telling developers to "give us until next month"; it missed that implied June target, then missed a leaked July 17 target as well. Bloomberg reported Google was working to improve the model's coding capability, and that a late-June retraining pass on updated data produced disappointing results. DeepMind ultimately abandoned the base iteration over ceilings in multi-step mathematical reasoning and SVG scene generation, and reporting indicates the team has moved on to pretraining Gemini 4. **As of late July 2026, Google is the only major frontier lab without a 2026 flagship model in general production** — GPT-5.6 Sol launched publicly on July 9, Grok 4.5 opened to the public the same day, and Anthropic's Fable 5 had shipped in June. **Gemini 3.1 Pro** remains Google's available Pro-tier flagship at $2/$12, still holding a lead on GPQA Diamond and still supporting up to 2 million tokens of context — the largest window of any proprietary frontier model.

> **Warning:** Planning implication
>
> If your architecture assumes a Gemini Pro-tier model arriving on a specific date, de-risk it. Google's Flash tier is excellent and shipping on schedule; its Pro tier has now slipped past three separate targets across more than two months. Build against what is generally available.

### Grok 4.5 (xAI)

xAI's Grok line differentiates primarily through deep integration with the X (formerly Twitter) platform, giving it access to real-time social data and discourse that other frontier models, trained on more static or delayed data snapshots, structurally lack. For use cases requiring awareness of breaking news, trending topics, or real-time public sentiment, that integration is a genuine and hard-to-replicate advantage rather than a marketing point.

**Grok 4.5** is the current publicly available model — roughly 1.5T parameters, opened to the public on July 9, 2026, and priced around $2/$6 per million input/output tokens, which makes it one of the cheaper frontier-tier options.

**Grok 4.6 has been announced but has not shipped.** Musk confirmed it publicly on July 18, 2026; initial pre-training finished the week of July 20, and his July 25 statements pointed at a ship date roughly two weeks out, with Grok 4.7 about four weeks out. It is reported as a ~2T-parameter model aimed at matching or exceeding Kimi K3's capability while preserving Grok 4.5's speed and token efficiency. No pricing, context window, or benchmark results have been officially confirmed. Treat the back-to-back 4.6/4.7 cadence as a stated intention rather than a delivered roadmap — xAI's public timelines have slipped before.

### Side-by-side pricing comparison

| Model | Input ($/1M tokens) | Output ($/1M tokens) | Positioning |
| --- | --- | --- | --- |
| Claude Fable 5 | $10 | $50 | Top-tier coding & multimodal |
| Claude Opus 5 | $5 | $25 | ~96% SWE-bench Verified; effort toggle |
| Claude Opus 4.8 | $5 | $25 | Previous Opus flagship |
| GPT-5.6 Sol | $5 | $30 | Top-tier agentic/terminal reasoning |
| GPT-5.6 Terra | $2.50 | $15 | Balanced workhorse |
| Claude Sonnet 5 | $2 ($3 from Sep 1) | $10 ($15 from Sep 1) | Balanced workhorse; intro pricing ends Aug 31 |
| Gemini 3.1 Pro | $2 | $12 | Long context (2M), science reasoning |
| Gemini 3.6 Flash | $1.50 | $7.50 | Everyday multimodal workhorse |
| Grok 4.5 | ~$2 | ~$6 | Real-time X data |
| GPT-5.6 Luna | $1 | $6 | High-volume, low-cost |
| Claude Haiku 4.5 | $1 | $5 | Fast, cheap, high-throughput |
| Gemini 3.1 Flash-Lite | $0.10 | $0.40 | Cheapest frontier-adjacent tier |

Key Takeaway

There is no single "best" closed model in 2026 — Anthropic's top tier leads coding (Fable 5 at 95.0% SWE-Bench, Opus 5 at ~96% SWE-bench Verified for half Fable's price), GPT-5.6 Sol leads terminal/agentic reasoning (Terminal-Bench 88.8%, ARC-AGI-2 92.5%), and Gemini 3.1 Pro leads scientific reasoning (GPQA Diamond) and context length (2M tokens). Model selection should be benchmark-matched to your actual workload, not based on a single aggregate leaderboard. And note what the leaderboard hides: Google has no shipped 2026 Pro flagship, and xAI's announced Grok 4.6 has not landed — availability is part of the selection criteria, not a footnote.

### When closed beats open

Despite the open-weight ecosystem's rapid progress (Module 4), closed frontier models retain a durable edge in a few specific situations. For autonomous, unsupervised coding agents where a small accuracy gap compounds across many sequential actions, Claude Fable 5's SWE-Bench lead is significant enough to matter economically even at premium pricing — a coding agent that fails 5% more often than another can mean the difference between a task completing autonomously versus requiring human intervention. For terminal-driving and tool-use agentic workflows, GPT-5.6 Sol's benchmark lead suggests similar dynamics. And for teams without the infrastructure or expertise to self-host a large open-weight model, the operational simplicity of an API-only closed model — no GPU provisioning, no expert-parallel serving configuration, no load-balancing tuning — often outweighs the cost savings of self-hosting, especially at low-to-moderate request volumes. Module 9 covers this self-hosting-versus-API economics trade-off in detail.

## Module 6: Multimodal Models — Beyond Text

Every frontier model shipping in 2026 handles images to some degree, and most handle audio. But "handles images" hides an important architectural distinction that affects both capability and cost: is the model natively multimodal, trained from the start on mixed modalities as first-class tokens, or is it a strong text model with modality-specific encoders bolted on afterward?

### Native multimodal vs. bolt-on architectures

The "bolt-on" pattern, which dominated the 2023-2024 era of multimodal models, works roughly like this: take a pretrained text-only language model, freeze or lightly fine-tune it, and attach a separate pretrained encoder for each additional modality — commonly a CLIP-style vision transformer for images or a Whisper-style encoder for audio. A small projection layer maps the encoder's output into the language model's embedding space, and the combined system is fine-tuned so the language model learns to attend to these injected embeddings. This approach is fast to build (you're reusing two already-trained components) and has produced genuinely strong systems, but it has a structural ceiling: the encoder was trained with its own objective, on its own data distribution, and can only pass along whatever information survives its own bottleneck. Fine-grained cross-modal reasoning — noticing a subtle visual detail that's only meaningful in light of an ambiguous phrase in the accompanying text, for instance — is harder for a system that never learned to represent image and text in a genuinely unified space.

The "native multimodal" pattern, by contrast, represents every modality as tokens (or token-like discrete units) from the very start of training and lets one unified architecture learn everything jointly. Inkling (Module 2) is the clearest 2026 example: audio becomes discrete dMel spectrogram tokens, images become raw 40x40 pixel patches, and both flow into the same token stream as text, processed by the same MoE transformer stack, trained on the same combined 45-trillion-token corpus of text, image, audio, and video. Nothing is lost to a separately-trained encoder's bottleneck, and the model has the opportunity to learn cross-modal relationships end-to-end.

Key Takeaway

Bolt-on multimodal architectures are faster and cheaper to build by reusing pretrained components, but native multimodal architectures like Inkling's encoder-free design have a higher capability ceiling for genuine cross-modal reasoning, at the cost of harder, more expensive joint training from scratch.

### Text + image

Text-plus-image is the most mature multimodal capability across the industry — every model discussed in Modules 4 and 5 handles it to some degree. Evaluation here typically centers on benchmarks like MMMU Pro (graduate-level multimodal reasoning across disciplines like chemistry, engineering, and art history), where Inkling scores 73.5% and Claude Fable 5 scores 84.2%, illustrating that even strong multimodal models show meaningful spread on genuinely hard cross-modal reasoning tasks, unlike simpler image-captioning-style benchmarks where most frontier models now cluster near saturation.

### Text + audio

Audio is a more differentiated modality in 2026 than image, because it splits into two quite different use cases: understanding spoken language content (transcription-adjacent tasks, measured by benchmarks like VoiceBench, where Inkling scores 91.4%) and understanding non-speech audio more broadly (music, environmental sound, tone/emotion in speech). Models with strong VoiceBench performance tend to be well-suited for voice assistants, meeting transcription and summarization tools, and accessibility applications. The dMel spectrogram tokenization approach Inkling uses for audio is a notable architectural choice specifically aimed at this modality — discretizing the audio signal into a token vocabulary the same way text is tokenized, rather than treating audio as a continuous signal requiring a specialized encoder.

### Text + video

Video remains the hardest and least mature multimodal capability industry-wide, because it combines the challenges of image understanding (spatial reasoning within a frame) with long-context temporal reasoning (what changed between frames, over what timescale, and why). Models trained on video data as part of their pretraining corpus — Inkling's 45-trillion-token training set explicitly includes video — have an advantage here over models that only handle video via frame-sampling tricks bolted onto an image-only encoder.

### Use cases that specifically benefit from native multimodality

Certain applications lean particularly hard on tight cross-modal reasoning rather than treating modalities as independent, loosely-coupled inputs. Real-time voice agents that need to reason jointly about tone, content, and conversational context benefit from unified audio-text representations. Technical document understanding that mixes diagrams, equations, and prose (common in engineering, medical, and scientific domains, which is exactly what MMMU Pro is designed to test) benefits from a model that can relate a specific visual detail to a specific textual claim without losing fidelity through an encoder bottleneck. And content moderation or adversarial-robustness applications — reflected in Inkling's FORTRESS Adversarial score of 78.0% — benefit from a model that can't be fooled by adversarial inputs crafted to exploit the seams between separately-trained modality encoders.

### Evaluation challenges

Multimodal evaluation is meaningfully harder than text-only evaluation for a few structural reasons. Ground truth is often more subjective or requires domain expertise to grade (evaluating whether a model correctly interpreted a chest X-ray or a circuit diagram isn't something a general crowd-worker can reliably grade the way a math-answer-checking benchmark can be graded automatically). Benchmarks can also become stale or gamed faster, because multimodal training data is harder to fully audit for benchmark contamination than text data, which is comparatively easier to deduplicate against known test sets. And aggregate scores like MMMU Pro can mask large capability gaps between modalities — a model might excel at image understanding while lagging badly at audio, and a single blended score won't tell you which is which. When evaluating a multimodal model for a specific application, always look at the modality-specific benchmark relevant to your use case (VoiceBench for audio, MMMU Pro for image/document reasoning) rather than relying on a single headline number.

> **Warning:** Important
>
> A model's overall "multimodal" reputation can hide large per-modality gaps. Always check the specific benchmark for the modality you actually need (audio, image, or video) rather than assuming a strong image score implies strong audio performance, or vice versa.

### Tokenization strategy as a design choice

The choice of how to turn a raw modality into tokens a transformer can process is one of the more consequential and underappreciated design decisions in a multimodal architecture, because it directly shapes what information survives to reach the model at all. Inkling's choice of 40x40 pixel patches for images is a relatively fine-grained tokenization compared to some competing approaches that use larger patches or pre-extracted visual features, trading a larger number of tokens per image (and therefore more compute and more context-window budget consumed per image) for finer visual detail retention. Similarly, dMel's discretized spectrogram approach to audio makes a deliberate trade-off: discretization loses some of the continuous fine structure a raw waveform contains, but it lets audio be represented in the same discrete-token vocabulary framework that has made text modeling so successful, allowing the same architectural and training machinery (attention, next-token prediction, MoE routing) to apply uniformly across modalities rather than requiring modality-specific special-casing. Different labs will continue to make different trade-offs here — coarser tokenization for cheaper inference and longer effective context, finer tokenization for higher fidelity — and this single design axis is often a better predictor of a model's real-world multimodal strengths and weaknesses than any single benchmark number.

### Adversarial robustness as a multimodal concern

Multimodal systems introduce attack surfaces that pure text models don't have to the same degree — an adversarially crafted image can contain visual patterns designed to trigger unintended model behavior, and audio can be manipulated in ways imperceptible to humans but that shift a model's interpretation significantly. This is precisely what benchmarks like FORTRESS Adversarial (where Inkling scores 78.0%) are designed to measure: how robust a model's outputs remain when the input has been deliberately perturbed to mislead it. As multimodal models take on more autonomous, high-stakes roles — parsing uploaded documents in an agentic workflow, interpreting camera feeds in a robotics context, screening user-submitted images or audio in a content pipeline — adversarial robustness stops being an academic concern and becomes a production security requirement. Teams deploying multimodal models in any context where inputs come from untrusted or semi-trusted sources should treat adversarial robustness benchmarks as seriously as raw accuracy benchmarks, and should assume that any single-modality safety filtering applied only to text will miss image- or audio-borne attacks entirely.

## Module 7: Reasoning Models

The single biggest shift in how models are used since 2024 has been the mainstreaming of inference-time reasoning: instead of generating an answer in one forward pass, a model generates an extended internal chain of reasoning steps before committing to a final answer, trading latency and compute cost for meaningfully higher accuracy on hard, multi-step problems.

### From chain-of-thought prompting to built-in reasoning

Chain-of-thought (CoT) started as a prompting technique — you'd literally ask a model to "think step by step" in your prompt, and it would produce better answers on math and logic problems as a result. This worked, but it was manual, inconsistent, and the model had no training-time incentive to reason well; it was just pattern-matching to instructions.

The reasoning models that emerged from 2024 onward internalize this: they're trained (typically with reinforcement learning against verifiable reward signals, like "did this math problem get the right final answer") to generate their own extended reasoning traces before answering, without needing to be prompted to do so. Tree-of-thought approaches extend this further by having the model explore multiple candidate reasoning paths in parallel or with backtracking, rather than committing to a single linear chain, at the cost of even more inference compute.

### The major reasoning-model lineages

**OpenAI's o-series** (o1, o3, o4-mini) established the "reasoning effort" pattern in the mainstream market — models that visibly spend variable amounts of inference-time compute "thinking" before answering, with o3 achieving 45.1% on ARC-AGI-2, a benchmark specifically designed to resist simple memorization and reward genuine abstract reasoning.

**DeepSeek-R1** took a distinctive approach: pure reinforcement-learning-based reasoning training, released under an MIT license with the model's full chain-of-thought exposed rather than hidden from users. This openness — both in license and in showing the actual reasoning trace rather than a summarized version — made DeepSeek-R1 an important reference point for the research community trying to understand how RL-trained reasoning actually works internally.

**Claude's extended thinking mode**, introduced with the Claude 4 generation and refined through Claude 4.7, gives users and developers a controllable thinking budget: you can ask Claude to spend more or less inference-time compute reasoning before responding, trading cost and latency for accuracy on demand rather than having reasoning mode be all-or-nothing.

**Gemini Deep Think** represents Google's entry in this space, similarly offering an extended, higher-compute reasoning mode distinct from the model's standard response path.

### How the reasoning market has split

By 2026, "reasoning model" isn't a single category anymore — it's split into recognizable sub-lanes, each optimized for a different trade-off:

-   **General high-reasoning** (exemplified by OpenAI's o3) — maximize accuracy on hard, general reasoning benchmarks, largely regardless of cost, for use cases where correctness matters more than latency or price.
-   **Long-context dense reasoning** (exemplified by Claude Opus) — combine strong reasoning with very large context windows, suited to tasks that require reasoning over huge amounts of input material simultaneously.
-   **Parallel exploration** (exemplified by Gemini's Deep Think) — explore multiple reasoning paths rather than committing to one linear chain, useful for problems with multiple plausible solution strategies.
-   **Open-weight, cost-efficient reasoning** (exemplified by DeepSeek-R1 and QwQ) — deliver a large fraction of frontier reasoning capability at a fraction of the cost and with full self-hosting control.

Key Takeaway

Reasoning capability is now a controllable dial, not a fixed model property. Claude's extended thinking, Inkling's "controllable thinking effort," and OpenAI's variable reasoning effort settings all let you spend more inference compute on harder problems and less on easy ones — treat this as a cost-management lever, not a fixed choice you make once per model.

### When to use a reasoning model

Reasoning models earn their extra latency and cost on tasks with a few specific characteristics: the problem has a verifiable or checkable structure (math, logic puzzles, code that must pass tests, structured multi-step planning), getting the wrong answer is costly enough that extra inference-time compute is a good trade, and the task genuinely benefits from exploring or backtracking through multiple solution paths rather than pattern-matching to a memorized answer. Conversely, reasoning mode is usually wasted — and sometimes counterproductive — on tasks that are fundamentally about style, tone, or creative generation rather than correctness, on high-volume low-stakes classification tasks where the extra latency and cost outweigh any accuracy gain, and on tasks where the model already reliably gets the right answer without extended reasoning, making the extra compute pure overhead.

### Cost implications

Extended reasoning multiplies both latency and token cost, because the model is generating a (often hidden or summarized) internal reasoning trace in addition to its final answer, and you're typically billed for those reasoning tokens even when they're not shown to the end user. This is why reasoning-effort controls matter operationally: a well-designed system routes only the subset of requests that actually need deep reasoning into a high-effort mode, while handling the bulk of simpler requests with low or no extended reasoning, keeping average cost per request manageable. Teams building production systems in 2026 increasingly implement this as an explicit routing layer — a cheap classifier or heuristic decides whether an incoming request warrants reasoning-mode inference before it's ever sent to the expensive path.

Industry Perspective

Several practitioners have noted that the single biggest cost-control lever available to teams building on reasoning models in 2026 isn't picking a cheaper model — it's building a good router that only sends genuinely hard requests into high-effort reasoning mode, since reasoning tokens can easily 5-10x the cost of an otherwise-equivalent request.

### Failure modes specific to reasoning models

Reasoning models introduce failure modes that don't exist, or exist less prominently, in standard single-pass generation. Overthinking is a real and documented phenomenon: a model given a high reasoning-effort budget on an easy problem can sometimes talk itself out of a correct initial instinct, second-guessing a right answer into a wrong one through unnecessary additional reasoning steps. Reasoning traces can also be unfaithful — the visible or summarized chain-of-thought a model produces does not always accurately reflect the actual computation driving its final answer, which matters for any application treating the reasoning trace as a genuine explanation rather than as a loosely-correlated byproduct of generation. And extended reasoning can amplify rather than dampen certain biases or errors present in a model's training data, if the reasoning process itself repeatedly reinforces an incorrect premise rather than questioning it. None of this means reasoning models aren't valuable — the accuracy gains on genuinely hard, verifiable problems are real and well-documented — but it does mean reasoning-mode output should be evaluated for correctness the same way any other model output would be, rather than trusted more simply because it "shows its work."

### Verifiable rewards: why math and code lead the reasoning gains

It's not a coincidence that the most dramatic reasoning-model gains have shown up on math (AIME-style competition problems) and code (SWE-Bench-style software tasks) rather than, say, open-ended essay writing. Reinforcement learning training for reasoning depends on a reward signal, and math and code are unusually well-suited to this because correctness is mechanically checkable — a final numeric answer either matches the known solution or it doesn't, and code either passes the test suite or it doesn't. This gives training algorithms a clean, unambiguous signal to optimize against, at massive scale, without requiring human judgment for every single training example. Domains without this kind of clean verifiability — creative writing quality, nuanced ethical judgment calls, open-ended strategic advice — are inherently harder to improve through the same RL-with-verifiable-rewards recipe, which is part of why reasoning models show their largest, most consistent gains specifically on quantitative and code benchmarks rather than uniformly across all task types.

## Module 8: Small & Efficient Models

Not every task needs a 975-billion-parameter frontier model. A huge and growing share of production AI usage in 2026 runs on small, efficient models — sometimes on a single consumer GPU, sometimes entirely on a phone — and the quality gap between these models and frontier systems has narrowed dramatically for well-scoped tasks.

### The leading small models

**Phi-4** (Microsoft), at 14 billion dense parameters, is the standard-bearer for "small model punching above its weight." It scores 84.8% on MMLU — genuinely competitive with much larger models — and notably outperforms GPT-4o on math benchmarks despite its dramatically smaller size, a result largely attributed to Microsoft's heavy investment in high-quality, carefully filtered and synthetically-augmented training data rather than raw scale. It fits comfortably on a single 12GB consumer GPU, and it's MIT licensed, making it fully unrestricted for commercial use.

**Gemma 4 E4B** (Google) targets the edge/mobile tier specifically: 4.5 billion effective parameters, 69.4% on MMLU-Pro, and small enough to run on a smartphone at around 5GB of RAM using 4-bit quantization. **Gemma 4 E2B** goes even smaller, designed to run on Android devices with as little as 6GB of total device RAM, achieving 10-25 tokens per second on a Pixel 9 Pro — fast enough for a genuinely responsive on-device chat experience with no network round-trip required.

**Mistral Small 4** rounds out the leading small-model roster, offering Mistral's characteristic multilingual strength (drawing on the broader Mistral family's 80+ language coverage) in an efficient, Apache 2.0 licensed package suited to self-hosted deployment.

### Quantization: the technique that makes local inference practical

Quantization reduces the numerical precision used to store a model's weights — typically from 16-bit floating point (FP16) down to 8-bit integers (Q8/INT8), 4-bit (Q4), or specialized schemes like GPTQ and AWQ that use more sophisticated calibration to minimize quality loss at very low bit-widths. The practical impact is dramatic: **Phi-4-Mini quantized to 4-bit with AWQ** requires roughly 1.2GB of memory, down from 7.6GB at full FP16 precision — an 84% memory reduction — while retaining approximately 95% of the original model's benchmark performance. This is the difference between "needs a dedicated GPU" and "runs fine on a laptop's integrated memory."

| Quantization Scheme | Typical Bit-Width | Memory Reduction vs FP16 | Typical Quality Retention |
| --- | --- | --- | --- |
| Q8 / INT8 | 8-bit | ~50% | ~99%+ |
| Q4 | 4-bit | ~75% | ~90-95% |
| GPTQ | 4-bit (calibrated) | ~75-80% | ~93-97% |
| AWQ | 4-bit (activation-aware) | ~75-84% | ~95%+ |

AWQ (Activation-aware Weight Quantization) tends to outperform plain Q4 or even GPTQ at similar bit-widths because it specifically identifies and preserves precision for the small subset of weights that activations are most sensitive to, rather than quantizing all weights uniformly — this is the mechanism behind Phi-4-Mini's strong 95% quality retention at 4-bit.

### Distillation: teaching a small model to imitate a large one

Distillation is a complementary technique to quantization: rather than compressing an existing model's weights, you train a new, smaller "student" model to mimic the outputs (or internal representations) of a larger "teacher" model. This lets a small model inherit much of a large model's learned behavior without needing to independently discover it through its own from-scratch training process. Many of 2026's strongest small models — including variants across the Phi, Gemma, and Qwen families — use distillation from larger sibling models as part of their training pipeline, which helps explain why small models in 2026 substantially outperform similarly-sized models from just two years earlier.

### Running models locally: Ollama, llama.cpp, and MLX

**Ollama** has become the most popular entry point for running open-weight models locally, wrapping the lower-level inference engines in a simple command-line and API interface with a built-in model library. **llama.cpp** is the underlying high-performance C/C++ inference engine that much of the local-LLM ecosystem (including Ollama) builds on, optimized for CPU and consumer GPU inference with extensive quantization support. **MLX** is Apple's machine learning framework, purpose-built to take advantage of Apple Silicon's unified memory architecture, and has become the preferred choice for running models efficiently on Mac hardware specifically.

Shell — Running Phi-4 locally with Ollama

```
# Install Ollama (macOS/Linux)
curl -fsSL https://ollama.com/install.sh | sh

# Pull a quantized Phi-4 model (Q4 quantization by default)
ollama pull phi4

# Run it interactively
ollama run phi4 "Explain the trade-off between Q4 and Q8 quantization
in two sentences."

# Or serve it as a local API endpoint for your application
ollama serve
# then, from your app:
# curl http://localhost:11434/api/generate -d '{
#   "model": "phi4",
#   "prompt": "Summarize this document...",
#   "stream": false
# }'
```

Python — Local inference with MLX on Apple Silicon

```
# pip install mlx-lm

from mlx_lm import load, generate

# Loads a 4-bit quantized model, taking advantage of Apple Silicon's
# unified memory to avoid CPU<->GPU transfer overhead entirely.
model, tokenizer = load("mlx-community/gemma-4-E4B-4bit")

prompt = "List three reasons a team might choose a 4-bit quantized " \
         "small model over a hosted frontier API for a mobile app."

response = generate(
    model,
    tokenizer,
    prompt=prompt,
    max_tokens=300,
    verbose=True,   # streams tokens as they're generated
)
print(response)

# On an M-series MacBook, a 4-bit Gemma 4 E4B or Phi-4-Mini will
# typically generate at well above interactive speed (dozens of
# tokens/second), with zero network dependency and zero per-token cost.
```

Key Takeaway

Quantization plus a modern local inference engine (Ollama, llama.cpp, or MLX) makes it realistic to run a genuinely capable model — 84.8% MMLU-class performance from Phi-4 — entirely on consumer hardware with no API costs, no network dependency, and full data privacy, at roughly 95% of the unquantized model's quality.

### When small models are the right call

Small, locally-run models are the right choice whenever data privacy or offline operation is a hard requirement, when request volume is high enough that per-token API costs would be prohibitive, when latency needs to be near-instant with no network round trip, or when the task itself is well-scoped enough (classification, extraction, short-form drafting, simple Q&A over a known domain) that a frontier model's extra capability wouldn't meaningfully change the outcome. The gap between "good enough" and "frontier" has narrowed enough by 2026 that defaulting to a small local model and only escalating to a larger hosted model for genuinely hard cases is an increasingly common and cost-effective production architecture.

### Hardware landscape for local inference

The consumer and prosumer hardware landscape for running small models locally has matured substantially. On the Apple Silicon side, the unified memory architecture of M-series chips means a Mac with 16-32GB of RAM can comfortably run a 4-bit quantized model in the 7-14B parameter range (covering Phi-4 and similarly-sized Gemma and Mistral variants) at genuinely interactive speeds, without a discrete GPU at all. On Windows and Linux, a single consumer GPU with 12GB of VRAM — a widely available and relatively affordable tier — comfortably fits Phi-4 at full precision or considerably larger models once quantized to 4-bit. At the very low end, Gemma 4 E2B's design target of 6GB of total device RAM makes it viable on mid-range Android phones released in the last two to three years, not just flagship devices, which meaningfully broadens the addressable footprint for genuinely on-device AI applications. This hardware accessibility is itself a strategic factor: any application built around a small model that fits comfortably within these common hardware tiers avoids the cloud dependency, per-request cost, and data transmission that a hosted API requires, which is precisely why 2026 has seen a wave of "AI-native" mobile and desktop applications built around bundled, quantized small models rather than API calls.

### Benchmarking small models fairly

A common mistake when evaluating small models is comparing their raw benchmark scores directly against frontier model scores and concluding the gap is disqualifying. The more useful comparison is capability-per-dollar or capability-per-watt for your specific task distribution. Phi-4's 84.8% MMLU score looks unremarkable next to a frontier model's high-90s score in isolation, but on a per-parameter or per-dollar basis, it represents an extraordinary efficiency achievement, and for a huge share of real production tasks — the well-scoped classification, extraction, and short-form generation tasks described above — the marginal accuracy gap simply doesn't translate into a marginal difference in user-visible outcome. The right evaluation methodology is to test the small model directly against your specific task and quality bar, not against a frontier model's leaderboard position.

## Module 9: The Business of Models

Choosing a model is ultimately a business decision as much as a technical one. This module lays out the economics — API pricing, self-hosting trade-offs, fine-tuning costs, and how organizations are structuring multi-model strategies in 2026.

### The full API pricing picture

| Model | Input ($/1M tokens) | Output ($/1M tokens) |
| --- | --- | --- |
| Claude Fable 5 | $10 | $50 |
| GPT-5.6 Sol | $5 | $30 |
| Claude Sonnet 5 | $3 | $15 |
| GPT-5.6 Terra | $2.50 | $15 |
| Gemini 3.1 Pro | $2 | $12 |
| GPT-5.6 Luna | $1 | $6 |
| Gemini 3.1 Flash-Lite | $0.10 | $0.40 |
| DeepSeek V4 Flash | ~$0.14 per token (see provider docs for exact input/output split) |  |

The headline economic story of the last eighteen months is straightforward: average API costs have dropped 60-80% since early 2025. This is driven by the combination of MoE architectures (Module 3) dramatically reducing inference compute per token, intensifying competition across at least four credible closed-frontier labs plus a growing set of open-weight alternatives, and continued hardware efficiency gains. The practical effect is that capability once available only at premium pricing is now accessible at a fraction of the cost a year or two later — Gemini 3.1 Flash-Lite's $0.10/$0.40 pricing would have been unthinkable for anything resembling frontier-adjacent capability in 2024.

### Self-hosting economics

Self-hosting an open-weight model (Module 4) becomes economically attractive once your request volume is high enough that the fixed cost of GPU infrastructure is lower than the variable cost of equivalent API usage — and once you have, or can hire, the MLOps expertise to run production inference reliably (expert-parallel serving for MoE models, load balancing, monitoring, failover). For a model like GLM-5.2 or Llama 4 Maverick, this typically means provisioning enough GPU memory to hold the full parameter set (not just the active parameters — see Module 3's warning on this) across a multi-GPU node, plus the engineering time to tune serving configuration with an engine like vLLM. Self-hosting also brings non-cost advantages that pure economics doesn't capture: data never leaves your infrastructure (important for regulated industries and for EU AI Act compliance, Module 10), you have full control over model versioning and update timing rather than being subject to a provider silently changing model behavior, and you can fine-tune the weights directly rather than working through a constrained fine-tuning API.

The trade-off is real, though: self-hosting means you own uptime, scaling, and security, and GPU capacity — especially for the largest models — remains expensive and sometimes hard to source at all. For low-to-moderate request volumes, or for teams without dedicated infrastructure staff, API-based access to a closed or hosted-open model remains the more practical default.

### Fine-tuning costs and approaches

Fine-tuning economics vary enormously by model size and technique. Full fine-tuning of a large model (updating all parameters) is the most expensive and infrastructure-intensive approach, generally reserved for teams with substantial compute budgets and a strong reason to need it. Parameter-efficient fine-tuning techniques like LoRA (Low-Rank Adaptation) dramatically reduce this cost by only training a small number of additional parameters layered on top of the frozen base model, making fine-tuning accessible on much more modest hardware while retaining most of full fine-tuning's benefit for many tasks. Platforms purpose-built for this — like Thinking Machines Lab's Tinker for Inkling (Module 2) — aim to make this process as close to turnkey as possible, abstracting away much of the underlying infrastructure complexity. For closed models, fine-tuning is generally only available through the provider's own constrained API (if offered at all), which limits flexibility but also removes the infrastructure burden entirely.

### Open-weight business models

A natural question about the open-weight ecosystem is: if the weights are free, how do these companies make money? The answer varies by organization, but common patterns in 2026 include charging for hosted inference of the "free" model (Together AI, Fireworks, Baseten, and similar platforms monetize this directly, while the model creator may or may not take a cut), charging for fine-tuning and customization tooling (Thinking Machines Lab's Tinker platform is a direct example), building an enterprise support and SLA layer around an otherwise-free model, and — for organizations like Meta or Alibaba where the model isn't the primary revenue driver — using open-weight releases as an ecosystem and talent-recruitment play, where broad adoption of the model creates downstream value for the parent company's other products even without directly monetizing the model itself.

### Enterprise considerations

Enterprises evaluating models in 2026 typically weigh a broader set of factors than raw benchmark performance: data residency and privacy requirements (often decisively favoring self-hosted open-weight models for regulated industries), vendor lock-in risk (a multi-model strategy, discussed below, is a common hedge), procurement and legal review timelines (which favor well-established vendors like the major closed labs, simply because legal teams already have precedent and contract templates in place), and total cost of ownership including the engineering overhead of self-hosting versus the simplicity premium of an API.

A related and increasingly important enterprise consideration is model governance: as organizations move from experimenting with a single model to running a portfolio of models across different teams and use cases, they need a consistent way to track which model version powers which production system, what evaluation results justified that choice, and how a model update (whether a silent API-side update from a closed provider or a deliberate version bump on a self-hosted open-weight model) gets tested and rolled out. Several enterprise AI platforms that emerged over the past two years exist specifically to manage this governance layer — centralized model registries, automated regression testing against a company's own evaluation suite before any model swap goes to production, and cost/usage dashboards spanning every model a company has deployed. This governance overhead is itself a cost worth budgeting for, separate from the per-token API price or the GPU bill for self-hosting, and it scales with the number of distinct models and use cases an organization runs rather than with raw request volume.

### Multi-model strategies

Very few sophisticated AI teams in 2026 rely on a single model for everything. The dominant pattern is a routing architecture: cheap, fast models (small local models or the lowest API tier, like GPT-5.6 Luna or Gemini 3.1 Flash-Lite) handle the bulk of simple, high-volume requests; mid-tier models (Claude Sonnet 5, GPT-5.6 Terra) handle the majority of general-purpose work; and the most expensive frontier tiers (Claude Fable 5, GPT-5.6 Sol) are reserved for genuinely hard tasks — complex coding, high-stakes reasoning — where their benchmark edge translates into real value. Increasingly, teams also maintain at least one open-weight, self-hostable option in this mix specifically as a fallback for data-sensitive workloads or as leverage in negotiating pricing with closed-model providers, even if it isn't the primary workhorse day to day.

Industry Perspective

A recurring theme among enterprise AI leads in 2026 is that model selection has become a continuous, routed decision rather than a one-time architectural choice — the "right" model increasingly means "the right model for this specific request," decided programmatically, rather than a single model an entire product commits to.

### Hidden costs beyond the per-token price

Sticker-price API pricing tells only part of the cost story. Prompt engineering and evaluation overhead — the ongoing engineering time spent testing, tuning, and re-testing prompts against a given model, especially after that model receives a silent update — is a real and often underestimated cost, and it recurs continuously rather than being a one-time setup expense. Context and retrieval costs compound quickly for any application that stuffs large amounts of retrieved context into every request; a system processing 50,000 tokens of retrieved context per request at even a modest $2 per million input tokens spends $0.10 per request before the model generates a single output token, which adds up fast at scale. Latency-driven infrastructure costs also matter — a slower model may require additional caching layers, speculative pre-fetching, or user-experience workarounds that carry their own engineering cost. And switching costs, while not a per-token expense, are real: migrating a production system from one model family to another typically requires re-running evaluation suites, re-tuning prompts, and sometimes re-architecting parts of an application built around a specific model's quirks, which is exactly why the multi-model routing architecture described above has become popular — it's cheaper to build model-agnostic infrastructure once than to repeatedly pay switching costs every time a cheaper or better model becomes available.

## Module 10: What's Next — The Model Roadmap

Having mapped the landscape as it stands in July 2026, this final module looks at the forces likely to reshape it over the next year: convergence trends across architectures, the ongoing commoditization debate, the strategic bet Thinking Machines Lab is making on customization over raw capability, the regulatory environment taking shape in the EU, and where to look for signal as things keep moving.

### Convergence trends

Several architectural and product patterns that were differentiated bets a year or two ago have converged into industry-wide defaults by mid-2026. MoE is now the default architecture for any model targeting frontier or near-frontier capability (Module 3) — the debate over "MoE vs dense" for large models is largely settled. Controllable reasoning effort — a user- or API-exposed dial trading latency and cost for accuracy — has become standard across closed models (OpenAI, Anthropic) and is now appearing in open-weight releases too (Inkling's "controllable thinking effort"). Native or near-native multimodality is converging toward table stakes for any model marketed as general-purpose, even if the underlying architecture (bolt-on encoders vs. encoder-free) still varies meaningfully in quality. And massive context windows — once a differentiator worth marketing heavily — are becoming commoditized, with 1M+ token windows now common across both closed (Claude, Gemini) and open (Inkling, GLM-5.2, Llama 4 Scout) models.

### The commoditization debate

A genuine and unresolved debate in the industry is whether base model capability itself is becoming commoditized — whether the gap between the best closed model and the best open-weight model will continue narrowing until it's negligible for most practical purposes, the way it has already narrowed substantially between, say, GLM-5.2 and the mid-tier closed models. The evidence cuts both ways. On one hand, benchmark gaps between top open-weight and top closed models on many general tasks are now single digits, and Inkling's arrival — a credible frontier-adjacent open-weight model from a brand-new, 18-month-old lab — is strong evidence that the resources and know-how required to reach near-frontier capability are becoming more widely distributed, not more concentrated. On the other hand, on the very hardest agentic and reasoning benchmarks (SWE-Bench, Terminal-Bench, ARC-AGI-2), meaningful double-digit gaps persist between the closed frontier leaders and the best open-weight alternatives, suggesting the very top of the capability curve remains harder to commoditize than the broad middle.

Key Takeaway

Commoditization is happening faster in the "broad middle" of model capability than at the very top. If your use case doesn't require the absolute state of the art, you likely already have multiple genuinely competitive options, both closed and open. If it does require the state of the art — particularly for autonomous coding or terminal-driving agents — the closed frontier labs retain a real, if narrowing, edge.

### Customization over benchmarks

Thinking Machines Lab's explicit positioning of Inkling as "not the strongest, but the most adaptable" (Module 2) reflects a broader strategic bet worth taking seriously: that as base model capability commoditizes at the middle of the distribution, the more durable competitive advantage shifts from "who has the single best model" to "who can most easily and cheaply adapt a good-enough model to a specific domain, dataset, or workflow." This is the thesis behind the Tinker platform, and it's echoed in the broader industry's growing investment in fine-tuning tooling, retrieval-augmented generation, and agent-orchestration frameworks — infrastructure that sits on top of a base model and captures value regardless of exactly which underlying model is used. If this thesis proves correct, the next wave of competitive differentiation in AI may look less like "we trained a bigger model" and more like "we built the best tooling for making any sufficiently good model work for your specific problem."

### The EU AI Act and regulatory landscape

Regulation is becoming a first-order factor in model strategy, not an afterthought. The EU AI Act's obligations for General Purpose AI (GPAI) models have been in force since August 2025, and the more demanding requirements for high-risk AI systems take full effect on August 2, 2026 — a deadline arriving within weeks of this course's writing. These requirements include detailed risk management, transparency, and human oversight obligations for AI systems used in high-stakes contexts (employment, credit, law enforcement, and similar domains). Open-weight/open-source models receive certain exemptions from some of the Act's more onerous provisions relative to closed frontier systems, reflecting an EU policy judgment that transparency (inherent in publishing weights) partially substitutes for some of the compliance burden imposed on opaque systems. However, this exemption is not blanket: copyright compliance obligations and training-data summary/transparency requirements apply regardless of whether a model is open or closed. Any organization deploying models — open or closed — into the EU market in the second half of 2026 needs a clear-eyed compliance plan, and this is increasingly influencing model selection itself, with European organizations in particular gravitating toward EU-developed models like Mistral's family partly for jurisdictional clarity.

> **Warning:** Important
>
> The EU AI Act's full high-risk system requirements take effect August 2, 2026. If you are deploying any AI system into the EU market that touches a high-risk use case, this deadline is imminent — do not assume open-weight licensing alone satisfies your compliance obligations, since copyright and training-data transparency requirements apply broadly.

### Talent flows and the founder-led lab pattern

Thinking Machines Lab is not an isolated data point — it is the clearest example so far of a pattern that has repeated across the industry since 2024: a small group of senior researchers with a strong public track record departs an established frontier lab, raises an unusually large seed round on the strength of their reputation and prior work rather than a demonstrated product, and ships a competitive model within roughly a year and a half. This pattern depends on a specific set of conditions that were largely absent before 2024: a deep pool of investors willing to write nine- and ten-figure checks purely on team pedigree, cloud and chip vendors (as seen in Thinking Machines Lab's Nvidia and AMD-backed round) willing to provide compute access as a strategic investment rather than a pure commercial transaction, and a mature enough open-source and open-research ecosystem that a new lab doesn't need to rediscover basic training and infrastructure techniques from scratch. As long as these conditions persist, expect the founder-led lab pattern to keep producing new entrants, which has the secondary effect of keeping talent mobility high across the industry — researchers know that leaving an established lab to found a new one is a viable, well-funded path, which in turn affects retention strategy at every existing frontier lab.

### Predictions for 2027

Extrapolating from the trends covered across this course, a few reasonably confident predictions for the year ahead: expect continued narrowing of the gap between top open-weight and closed frontier models on general benchmarks, with the closed labs' remaining edge increasingly concentrated specifically in autonomous agentic and terminal-use tasks rather than general knowledge or reasoning. Expect API pricing to continue falling, though likely at a slower rate than the dramatic 60-80% drop of the last eighteen months, as the easiest efficiency gains from the MoE transition have already been captured. Expect fine-tuning and customization platforms (Tinker and its competitors) to become a more central battleground than raw base-model benchmarks, validating or refuting Thinking Machines Lab's strategic bet within the next year or two. Expect regulatory compliance, particularly around the EU AI Act's evolving requirements, to become a more explicit line item in enterprise model-selection criteria rather than a downstream legal concern. And expect at least one more credible new entrant — likely another lab founded by senior alumni from an existing frontier lab, following the Thinking Machines Lab playbook — to emerge with a notable release, given how compressed the "founding to frontier-adjacent release" timeline has become.

### Resources to stay current

Given how fast this landscape moves, treat any static snapshot — including this course — as a starting framework rather than a permanent reference. To stay current: track model provider release notes and technical reports directly (Anthropic, OpenAI, Google DeepMind, Thinking Machines Lab, Zhipu AI, Alibaba, DeepSeek, Meta, Mistral, and Microsoft all publish detailed model cards and benchmark disclosures on release); follow independent benchmark aggregators and leaderboards that track SWE-Bench, Terminal-Bench, ARC-AGI, MMLU/MMLU-Pro, GPQA Diamond, and MMMU Pro scores across models as they update, since self-reported numbers can lag or differ from independently reproduced results; and pay attention to pricing pages directly rather than relying on secondhand summaries, since API pricing changes frequently and is often the fastest-moving signal of competitive pressure in the market.

Industry Perspective

The consistent lesson of the last three years is that today's frontier is next year's mid-tier, and today's expensive premium model is next year's cheap commodity option. The most durable skill for anyone building on these models isn't picking the single right model today — it's building systems flexible enough to swap models as the landscape continues to shift underneath them.

### A closing framework for revisiting this course

Because this landscape will look meaningfully different within months, it's worth closing with a compact framework for re-evaluating it yourself rather than a fixed set of conclusions. Ask, for any new model release: what is its total-to-active parameter ratio and does that architecture choice make sense for its stated use case (Module 3)? What license actually governs it, and does that license's fine print change your calculus at your organization's scale (Module 4)? Where does it sit on the closed-versus-open spectrum, and what bundle of non-benchmark value (support, compliance, managed infrastructure) does its pricing reflect (Modules 5 and 9)? Is its multimodal support native or bolted-on, and does that distinction matter for your specific cross-modal reasoning needs (Module 6)? Does it expose a controllable reasoning-effort dial, and have you built the routing logic to use it economically (Module 7)? Could a small, quantized, locally-run alternative handle the bulk of your workload at a fraction of the cost, reserving the frontier model only for genuinely hard cases (Module 8)? And finally, what regulatory obligations attach to your specific deployment context, and does your model choice help or hinder meeting them (Module 10)? Running any new model through this seven-question framework will keep you oriented in a landscape that, by design, this course cannot fully future-proof you against — but the framework itself should remain useful long after the specific numbers in these tables are out of date.

The 2026 AI Model Landscape — A Complete Course · 10 modules · Offline reference document

Content current as of July 29, 2026. The AI model landscape moves fast — verify pricing and benchmark figures against primary sources before making production decisions. See Weekly Updates at the top for developments since the course was written.