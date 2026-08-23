# Reading the AI Labs' S-1s — Interactive Course

# Reading the AI Labs' S-1s

OpenAI and Anthropic have both moved toward an IPO. Neither has published an S-1. This course is about what that distinction is worth — and what the knowable numbers do to anyone whose product economics run on model API pricing.

8 modules

1 economics simulator

~75 min

18 Aug 2026 verified

Primary sources: [OpenAI Rule 135 notice](https://openai.com/index/openai-submits-confidential-s-1/) · [Anthropic Rule 135 notice](https://www.anthropic.com/news/confidential-draft-s1-sec) · [Coursera 10-Q, Q2 2026](https://www.sec.gov/Archives/edgar/data/1651562/000165156226000063/cour-20260630.htm)

Read this before anything else

**Neither company has filed a public S-1.** Both have *confidentially submitted a draft registration statement*, which is a different legal act with different consequences. There is no public risk-factors section, no audited financial statements, no use-of-proceeds table, no share-structure exhibit, no underwriter list, no ticker. I searched EDGAR full-text, the company index, and the complete CIK lookup file on 18 August 2026: **there is no registrant named OpenAI or Anthropic.**

That is not a disappointing footnote. It is the most useful thing in this course, because a very large volume of confident commentary is currently citing "the S-1" for numbers that no member of the public has read. Learning to notice that is worth more than any single figure.

So every factual claim here carries a provenance chip. Filed means it is in a document on EDGAR you can open right now. Company means the company published it. Reported means credible journalism or analyst work, unverifiable against a filing. Inference is mine. Unknown means nobody outside the company knows and you should distrust anyone who says otherwise.

**Module 4 is a simulator.** Do it before you read modules 5–8. It asks you to commit to a number before it shows you anything.

## Course Modules

1.  [What actually happenedFacts](#m1)
2.  [Provenance disciplineMethod](#m2)
3.  [The economics, as far as they're knowableAnalysis](#m3)
4.  [The Inference BudgetSimulator](#m4)
5.  [The commitment asymmetryBalance sheet](#m5)
6.  [Governance after the bellControl](#m6)
7.  [What neither is sayingOmissions](#m7)
8.  [What you do about itSynthesis](#m8)

## Module 1: What actually happened

By the end of this module you will

-   State precisely what each company did, and on what date
-   Explain what a confidential draft registration statement discloses (nothing) and why companies use one
-   Know what Rule 135 permits a company to say, and why both notices are so short
-   Be able to check EDGAR yourself in under a minute

### The two announcements, in full

These are short enough to quote almost completely, which is itself the point. Anthropic, 1 June 2026:

> "Today, Anthropic, PBC **confidentially submitted a draft registration statement on Form S-1** to the U.S. Securities and Exchange Commission for a proposed initial public offering of our common stock. This gives us the option to go public after the SEC completes its review. The proposed initial public offering will depend on market conditions and other factors. **The number of shares to be offered and the price have not yet been set.**" [anthropic.com/news/confidential-draft-s1-sec](https://www.anthropic.com/news/confidential-draft-s1-sec) — Company

OpenAI, 8 June 2026, in a notice with a markedly different register:

> "We recently submitted a confidential S-1. **We expect it to leak so we're just announcing it.** We have not decided on timing yet; it may be a while because there are things we want to do that are likely easier as a private company. But it's a complicated set of tradeoffs and this gives us the option to go public sooner if that ends up being best." [openai.com/index/openai-submits-confidential-s-1](https://openai.com/index/openai-submits-confidential-s-1/) — Company

Verified on EDGAR, 18 August 2026

I checked three independent ways. EDGAR company search for `company=openai` returns *"No matching companies."* The complete `cik-lookup-data.txt` master file (40 MB, every registrant that has ever filed) contains entries like `OPENAI STARTUP FUND I, L.P.` and dozens of SPV feeder funds with "Anthropic" in the name — but **no operating company registrant for either lab.** EDGAR full-text search for "OpenAI" restricted to S-1 forms returns 45–146 hits, all of them *other companies' filings that mention OpenAI* — Cerebras, SpaceX, Pershing Square Holdco, Entrata, Ambiq Micro.

Try it yourself: `https://www.sec.gov/cgi-bin/browse-edgar?company=anthropic&action=getcompany`

### What a confidential submission actually is

The mechanism comes from the JOBS Act of 2012, extended by the SEC to all issuers in 2017. A company hands the SEC a complete draft registration statement — financials, risk factors, the lot — and the staff reviews it privately over several rounds of comment letters. The company fixes what the staff objects to before anyone outside sees a word.

The public filing happens later, and the rule is that the issuer must publicly file the registration statement **at least 15 days before the roadshow.** When that happens, the previously confidential drafts and all SEC comment correspondence get published too. So the document everyone wants to read does exist. It is simply not available, and the date on which it becomes available is not yet set.

What a confidential submission tells you

That the company wants the *option* to list, and is willing to spend real money and management attention to hold it open.

That auditors have signed something. You cannot submit a DRS without financial statements.

That the SEC review clock has started — typically 3–6 months of comment rounds before a public flip is possible.

What it does not tell you

Any number whatsoever. Not revenue, not margin, not burn, not commitments.

Whether they will actually list. OpenAI explicitly says timing is undecided and "it may be a while."

Valuation, ticker, exchange, underwriters, share count, or the structure of the offering.

### Why both notices are so short: Rule 135

Both announcements carry an identical legal footer, and it is not boilerplate you should skip. Rule 135 under the Securities Act creates a narrow safe harbour: an issuer may announce a proposed offering *without* that announcement counting as an illegal offer to sell, provided it sticks to a short permitted list — the fact of the offering, its purpose, the amount and type of security, and the anticipated timing. Anything more is "gun jumping."

This is why Anthropic's notice reads like it was written by counsel: it was, and the sentence "the number of shares to be offered and the price have not yet been set" is there because Rule 135 requires that kind of restraint. OpenAI's is the more interesting document precisely because it strains against the form — "we expect it to leak so we're just announcing it" is a candid sentence in a genre that almost never contains one.

The inference worth drawing

Inference OpenAI's notice contains a genuine strategic tell that Anthropic's does not: *"there are things we want to do that are likely easier as a private company."* A company that is enthusiastic about listing does not write that sentence. Read alongside the scale of its reported compute obligations, the most natural reading is that OpenAI wants the financing optionality a public listing provides while delaying the disclosure and quarterly-guidance regime that comes with it. Anthropic's notice makes no such reservation.

That is my reading, not a fact. A defensible alternative: it is simply expectation management, so that a 2027 listing does not read as a failure.

Module 1 takeaways

-   Anthropic submitted 1 June 2026; OpenAI announced 8 June 2026. Both confidential drafts, both Rule 135 notices.
-   No public S-1 exists for either as of 18 August 2026. This is checkable in one minute on EDGAR.
-   A public filing must precede any roadshow by 15 days — that is your early-warning signal.
-   Anyone quoting "the S-1" for a specific number is quoting something they have not read.

## Module 2: Provenance discipline

By the end of this module you will

-   Sort claims by evidence tier rather than by plausibility
-   Recognise the specific failure mode of "annualised run-rate" and similar constructions
-   Have a default policy for how much weight to put on unverifiable numbers in your own planning

There is a large and confident body of writing about these two filings. Much of it contains precise figures — gross margins to the percentage point, loss projections by year, cash-flow break-even dates. None of it can be checked against a filing, because there is no filing. The numbers are some combination of investor-deck leaks, analyst modelling, and repetition.

This is not an argument for ignoring them. Reported numbers from good outlets are often roughly right. It is an argument for **never letting a reported number and a filed number sit in the same sentence at the same weight**, which is exactly what most commentary does.

### The five tiers

| Tier | Means | How much weight |
| --- | --- | --- |
| Filed | In a document on EDGAR. Signed, audited or officer-certified, legally actionable if false. | Plan on it. |
| Company | Published by the company, not filed. A press release or blog post. | True but curated. Note what is omitted. |
| Reported | Credible journalism or analyst estimate, sourced to people or documents you cannot see. | Directionally useful. Never load-bearing. |
| Inference | Someone's derivation from the above, including mine. | Only as good as its stated assumptions. |
| Unknown | Not knowable outside the company. | Treat confident claims here as a signal about the speaker. |

The construction to watch: "annualised run-rate"

Anthropic's own Series H announcement says *"our run-rate revenue crossed $47 billion earlier this month"* Company. That is a real number the company chose to publish, and there is no reason to doubt it. But note what it is: **one month's revenue multiplied by twelve.** It is not $47 billion of revenue. It is not GAAP revenue. It has no bearing on whether that month was seasonal, front-loaded by an enterprise contract, or inclusive of prepaid commitments.

Run-rate is the standard private-company metric and using it is not dishonest. But when these companies file publicly, they will report trailing GAAP revenue, and **the two numbers will not match.** Anyone comparing a private run-rate to a public company's trailing revenue is comparing different objects.

### Sort these yourself

Below are six claims currently in circulation about these two companies. Assign each a tier before you check. There is no partial credit and two of them are genuinely arguable — the reveal says which.

Assign a tier to all six.

Module 2 takeaways

-   Tier every number before you use it. The tier matters more than the magnitude.
-   Run-rate is a legitimate private metric that does not survive translation to GAAP reporting.
-   The confident precision of a claim is uncorrelated with its evidentiary tier — often inversely so.
-   When these companies do file, expect reported figures to be revised, not confirmed.

## Module 3: The economics, as far as they're knowable

By the end of this module you will

-   Hold the reported financial shape of both companies, correctly tiered
-   Articulate where their business models actually diverge, rather than where the narrative says they do
-   Understand why gross margin is the number to watch and what moves it

### What each company has published itself

Start with the highest-quality material available: what the companies said in their own names. This is Company tier — curated, but not fabricated.

|  | Anthropic | OpenAI |
| --- | --- | --- |
| Last published raise | $65B Series H at $965B post-money, 28 May 2026 Company | Recapitalisation completed Oct 2025; no comparable published round since Company |
| Revenue figure company has stated | Run-rate "crossed $47 billion" in May 2026 Company | None published directly; ~$20–25B annualised widely reported Reported |
| Corporate form | Anthropic, PBC (Delaware public benefit corporation) Company | OpenAI Group PBC, controlled by the OpenAI Foundation Company |
| Disclosed compute partners | Amazon (up to 5 GW, primary cloud + training partner), Google/Broadcom (5 GW TPU), SpaceX (Colossus 1 & 2); Micron, Samsung, SK hynix as memory partners Company | Microsoft, Oracle, Amazon, Stargate consortium Reported |
| Distribution | First frontier model on all three major clouds — AWS, Google Cloud, Azure Company | Azure-primary historically; ChatGPT as direct consumer channel Reported |

The one genuinely striking company-published fact

Anthropic's Series H names its investor list, and it is not a venture list. Capital Group, Coatue, D1, GIC, ICONIQ, XN as co-leads; then Baillie Gifford, Blackstone, Brookfield, Fidelity, Jane Street, T. Rowe Price (twice, two separate entities), Temasek. **Those are crossover and sovereign-wealth names — the investors who buy the private round in order to be positioned for the public one.** The round composition is itself a pre-IPO signal, published two working days before the confidential submission.

### The reported financials, clearly marked

Everything in this table is Reported. I am including it because you need a working model, not because it is verified. Where sources conflict I have given the range rather than picking.

| Metric | OpenAI | Anthropic |
| --- | --- | --- |
| Revenue, annualised (mid-2026) | ~$20–25B | ~$47B run-rate (company-stated) |
| Gross margin | ~33% (2025), reported recovering toward ~39% in Q1 2026 | Not reliably reported |
| Inference cost | $8.4B (2025) → ~$14.1B (2026E) | Not reliably reported |
| Cash burn | ~$27B (2026E), ~$63B (2027E) | Not reliably reported |
| Cash-flow positive | Not before 2030 | Unknown Unknown |
| Multi-year compute obligations | ~$665B (Mar 2026) up to ~$1.4T through 2033 depending on source and horizon | Not disclosed in aggregate Unknown |

The asymmetry in this table is the finding

Look at the right-hand column. **For Anthropic, most rows are empty.** We have a company-stated run-rate and a valuation, and essentially nothing on cost structure, margin, or burn. For OpenAI we have detailed — if unverifiable — figures on all of it.

Inference That asymmetry is probably not about Anthropic being more disciplined. It is about OpenAI having far more investors, far more counterparties, and a far larger consumer surface, each of which is a leak vector. The volume of available information about a private company is a function of how many people have seen the numbers, not of how the company behaves. Do not read Anthropic's opacity as either virtue or concealment.

### Where the two businesses genuinely diverge

The lazy framing is "OpenAI is consumer, Anthropic is enterprise." That is roughly true and not very useful. Three sharper distinctions:

#### 1\. Channel control versus channel reach

OpenAI owns its primary demand channel. ChatGPT is a direct relationship with hundreds of millions of users, which means pricing power, first-party data, and no intermediary — but also the full cost of serving a consumer free tier. Anthropic has taken the opposite bet: Company Claude is "the first frontier model available on all three of the world's largest cloud platforms." That is reach without ownership. The margin structures those imply are different, and neither is obviously better.

#### 2\. Revenue durability

Enterprise API and platform revenue is stickier than consumer subscription revenue but concentrates risk. Reported Anthropic counts 8 of the Fortune 10 as customers. That is an impressive sentence and also a customer-concentration disclosure waiting to happen: when a public S-1 arrives, the revenue-concentration paragraph is one of the first things to read. Consumer subscriptions churn but no single cancellation moves the quarter.

#### 3\. How each frames the moat

Read the two companies' own language. Anthropic's Series H release talks about Claude becoming "increasingly indispensable," about enterprises deploying it "in their core operations," and about Claude "learning how businesses actually operate: the context, the processes, the judgment." That is a *workflow-embedding* moat argument. OpenAI's public positioning leans on consumer ubiquity and model capability. Inference Workflow embedding is the more defensible claim if it is true, because it survives a competitor shipping a better model; capability leads do not.

Module 3 takeaways

-   Anthropic's published run-rate ($47B) exceeds OpenAI's reported annualised revenue. Note the metrics are not comparable.
-   Anthropic's Series H investor list is a crossover/sovereign list — a pre-IPO signal in itself.
-   OpenAI's reported gross margin (~33–39%) is the single most consequential number in this course.
-   We know far less about Anthropic's cost structure than OpenAI's, and that is about leak surface, not conduct.

## Module 4: The Inference Budget

By the end of this module you will

-   Have committed to a forecast before seeing any model output
-   Understand why falling token prices and rising unit costs are simultaneously true
-   Know the breakeven relationship between price decline and token growth, and be able to derive it
-   Have a defensible planning assumption for AI cost of goods sold

The most common planning error in AI product economics right now is a reasonable-sounding syllogism: *token prices have collapsed roughly 99% in three years; my product consumes tokens; therefore my AI cost of goods sold will fall.*

Both premises are true. The conclusion does not follow, and the reason it does not follow is arithmetic rather than opinion. This simulator makes you commit to a number first, then builds the model with your own assumptions, then shows you the gap between the two. **The gap is the lesson** — not whether you were right.

Simulator

### The Inference Budget

Stage 1 of 3

1

Commit to a forecast

Required

Before you see any sliders or any output. A learner interaction — one tutoring exchange, one graded response, one generated study plan — costs you some amount in model API spend today. Call that **100**. What will the same interaction cost you in **three years**, in real terms, as an index?

Your forecast: cost per interaction in 2029 (today = 100) 100

Same as today.

One line: what is driving your number? — required

Move the slider and write one line to unlock.

2

Now build the model

Locked

Four assumptions. The defaults are deliberately the ones most people reach for — they are not my recommendation, and one of them is the trap.

Price per million tokens — annual decline 50%

Observed 2023–2026 was steep: GPT-4 launched at $30/M input in Mar 2023; budget-tier frontier models were near $0.10/M by 2026. Frontier-to-frontier decline is slower than floor-to-floor.

Tokens consumed per interaction — annual growth 0%

Reasoning models emit long hidden chains. Agentic loops make many calls per user action. Context windows grew and got filled. Set this to 0 only if you believe your product will consume the same tokens per task in 2029 as today.

Interaction volume — annual growth 40%

How fast AI-touched interactions grow across your product surface.

Revenue — annual growth 12%

The denominator. Baseline is $1.23B — Coursera's FY2026 revenue outlook midpoint, from the Q2 2026 shareholder letter. Filed

3

What your assumptions imply

Locked

### The relationship underneath it

Strip the model to two variables. Let `d` be the annual fractional decline in price per token and `g` the annual fractional growth in tokens per task. Unit cost is flat when:

```
(1 − d) × (1 + g) = 1

// which rearranges to the only line worth memorising:

gbreakeven = 1/(1 − d) − 1
```

| Price falls by | Unit cost is flat if tokens/task grow by | In plain terms |
| --- | --- | --- |
| 30% / yr | +43% / yr | 1.4× the tokens |
| 50% / yr | +100% / yr | Exactly a doubling |
| 70% / yr | +233% / yr | 3.3× the tokens |
| 80% / yr | +400% / yr | 5× the tokens |

The line to take into planning

**A 50% annual fall in price per token is exactly cancelled by a doubling of tokens per task.** Both of those are happening right now. The industry has been reporting the first and under-reporting the second, which is why so many 2026 AI budgets assume margin expansion that has not arrived.

This is Jevons' paradox with a compute meter attached: when a resource gets cheaper, consumption of it rises, and whether your bill falls depends entirely on which effect is larger. The honest planning assumption for a product that is actively adopting reasoning and agentic patterns is **flat to modestly rising unit cost**, with total cost rising with volume.

Where this argument is weakest

Three honest objections. **One:** token growth per task is not unbounded — there is a ceiling on how much reasoning a given task benefits from, and once products saturate it, `g` collapses toward zero and the price decline wins outright. **Two:** the model treats a blended price as if capability is constant, but a 2029 cheap model is roughly a 2026 frontier model, so some of the "price decline" is really quality-adjusted and understated. **Three:** aggressive caching, distillation, routing to smaller models, and batch processing are all real levers that this model folds into `d` rather than treating as separate decisions you control.

The third objection is the operationally important one, and it cuts *for* the conclusion rather than against it: those levers are things you must actively build. They do not arrive by waiting for vendor price cuts.

### Transfer check — a case the simulator never ran

This is deliberately outside the model. Answer from the principle, not from the sliders.

**1.** A vendor announces a 60% price cut on its mid-tier model and simultaneously ships a new reasoning mode that is on by default. Your finance partner books the 60% as a cost saving in next year's plan. What do you tell them, in one sentence, and what single number do you ask for before agreeing?

**2.** Your AI unit cost has been flat for four quarters while token prices fell 45%. Your CFO reads this as your team failing to capture vendor savings. Give the two measurements that would distinguish "we failed to optimise" from "we shipped more capability per interaction."

**3.** You are asked to commit to a three-year AI COGS line for a board plan. You genuinely do not know `g`. What do you put in the plan, and what do you attach to it?

Reveal — including where reasonable people disagree

**1.** Tell them the price cut is per token and the reasoning mode changes tokens per task, so the two numbers multiply rather than one of them being the answer. The single number to ask for: **mean tokens per completed task, before and after the new mode** — measured on your own traffic, not the vendor's benchmark. If that rises more than 2.5×, the 60% cut is a cost *increase*.

**2.** Measure (a) **tokens per completed task** and (b) **task success rate or containment rate**. Flat cost with rising tokens and rising success means you bought capability. Flat cost with flat tokens means you genuinely did not capture the price decline — check routing, caching, and whether you are still pinned to an old model SKU. The common third case: rising tokens with flat success, which means you shipped a more expensive product that is not better, and that is the one worth catching early.

**3.** Put in a **range with the breakeven identity attached**, not a point estimate: state the plan at flat unit cost, show the sensitivity at `g` = 0, 1, and 2, and name the tripwire. Attach a monthly instrument for tokens per task so the assumption is falsifiable within a quarter rather than at year end. *Where people disagree:* plenty of experienced operators would argue you should just plan the optimistic case and manage to it, on the grounds that a range invites the board to pick the bad end and cut your budget. That is a real political argument and not a stupid one — but it is an argument about how to present a forecast, not about what the forecast is.

Module 4 takeaways

-   Unit cost is flat when `(1−d)(1+g) = 1`. At a 50% price decline, breakeven is exactly a doubling of tokens per task.
-   Falling token prices and rising AI COGS are simultaneously true and not in tension.
-   Tokens per completed task is the instrument almost nobody measures and everybody should.
-   Cost reduction from caching, routing and distillation is built, not received.

## Module 5: The commitment asymmetry

By the end of this module you will

-   Know where purchase obligations live in a filing and why they matter more than the income statement
-   Be able to compare your own company's compute commitments to a frontier lab's, in the correct units
-   Understand what pre-committed capacity does to a vendor's future pricing behaviour

Here is the part where a real filing is available — just not the one everyone is waiting for. **Coursera's Q2 2026 Form 10-Q was filed on 5 August 2026 and you can read every word of it.** Note 10, Commitments and Contingencies:

> "Our purchase obligations primarily relate to **third-party cloud infrastructure agreements**, subscription arrangements, service agreements used to facilitate our operations, and paid advertising and sponsorship vendors. As of June 30, 2026, we had approximately **$27.5 million** in future minimum payments due under our non-cancelable purchase obligations with a remaining term in excess of one year. These are expected to be paid through 2030." [Coursera, Inc. Form 10-Q, Q2 2026, Note 10](https://www.sec.gov/Archives/edgar/data/1651562/000165156226000063/cour-20260630.htm) — Filed

Now put that beside OpenAI's reported figure. As of March 2026, roughly **$665 billion** in purchase commitments Reported, with longer-horizon estimates running to **$1.4 trillion** through 2033.

|  | Coursera | OpenAI (reported) | Ratio |
| --- | --- | --- | --- |
| Non-cancelable purchase obligations | $27.5M Filed | ~$665B – $1.4T Reported | 24,000× – 51,000× |
| Annual revenue | ~$1.23B (FY26 outlook midpoint) Filed | ~$25B annualised Reported | ~20× |
| Obligations ÷ annual revenue | 0.022× (2.2%) | 26.6× – 56× | ~1,200× – 2,500× |

The single sharpest number in this course

Coursera has pre-committed **2.2% of one year's revenue** to non-cancelable purchases, spread through 2030. OpenAI has reportedly pre-committed somewhere between **27 and 56 years of current revenue.** Adjusted for company size, its commitment intensity is on the order of **a thousand times greater.**

Do not read that as "OpenAI is reckless." Read it as: **these are not the same kind of company, and the constraint they operate under is not the one you operate under.** Coursera can walk away from most of its infrastructure spend in a year. OpenAI cannot walk away from any of it.

### What pre-committed capacity does to pricing

Inference This is the load-bearing strategic consequence and it is worth being precise about, because the intuition most people have is backwards.

The common assumption is that huge commitments mean prices must rise to cover them. The opposite is closer to true in the short run. Contracted capacity is a **sunk, take-or-pay obligation**: the datacentre is paid for whether or not tokens flow through it. Marginal revenue on idle capacity is nearly pure contribution. So a lab with vast pre-committed capacity has a powerful incentive to *fill* it — which means aggressive pricing, generous free tiers, and volume deals.

That is a real subsidy, and it is why current API pricing is probably below long-run sustainable levels for the frontier tier. But it is a subsidy with a specific shape and a specific expiry:

-   **It persists while capacity exceeds demand.** Cheap tokens are how you fill a contracted datacentre.
-   **It inverts when demand exceeds capacity.** At that point the scarce resource is serving capacity, and rationing happens by price and by tier — which shows up first as rate limits and priority tiers, not as a headline price rise.
-   **Public markets change the clock.** A private company can run negative gross margin on a strategic tier indefinitely. A public one explains it quarterly.

The planning consequence

Do not plan on today's price per token persisting, and do not plan on it falling either. Plan on **the terms changing shape**: rate limits, priority tiers, committed-use discounts, and enterprise agreements that trade price for volume commitment. The price of a token is a less useful planning variable than **the price of guaranteed throughput at a given latency**, and that second thing is what gets negotiated once the vendor is public.

### Where to look when the filings arrive

When either company does publicly file, four sections will tell you more than the rest of the document combined. In reading order:

1.  **Contractual Obligations table** (in MD&A) and the Commitments note. This is where the take-or-pay compute deals become a legally characterised liability rather than a press release. Check whether they sit on the balance sheet or only in the note — that distinction is the entire question of how binding they are.
2.  **Cost of revenue detail.** Whether inference compute is broken out separately, or buried in a single line, is itself a disclosure choice worth noting.
3.  **Revenue concentration** in the risk factors and the segment note. "8 of the Fortune 10" becomes a percentage.
4.  **Related-party transactions.** Microsoft is simultaneously OpenAI's largest shareholder, a major compute supplier, and a distribution channel. Amazon and Google occupy overlapping roles for Anthropic. Circular arrangements between an investor, a supplier and a customer are exactly what this section exists to expose.

Module 5 takeaways

-   Coursera: $27.5M non-cancelable obligations, 2.2% of annual revenue — a readable, filed fact.
-   OpenAI: reportedly 27–56 years of current revenue pre-committed. ~1,000× the intensity.
-   Vast contracted capacity subsidises prices *downward* while capacity exceeds demand.
-   Watch the shape of terms, not the headline price. Throughput guarantees are the real currency.

## Module 6: Governance after the bell

By the end of this module you will

-   Describe both governance structures accurately, including what is and is not verified
-   Identify the specific pressure points where mission-control provisions meet public shareholders
-   Know what to look for in the governance section when a filing appears

### OpenAI: the Foundation and the PBC

Company Reported OpenAI completed its recapitalisation in October 2025. The nonprofit, renamed the **OpenAI Foundation**, holds roughly a 26% equity stake in **OpenAI Group PBC**, the Delaware public benefit corporation that is the operating company. Microsoft holds roughly 27%; employees, former employees and investors hold roughly 47%.

The critical provision is not the equity split. It is that the Foundation's board holds **special voting and governance rights that let it appoint every member of the OpenAI Group board.** Microsoft, despite the largest single stake, reportedly holds no board seat.

The question the filing will have to answer

A public offering introduces shareholders who bought a security, expect a return, and have litigation as a remedy. Delaware PBC law requires directors to *balance* shareholder value against the stated public benefit and the interests of those materially affected — it does not subordinate one to the other, and the balancing is largely protected by the business judgment rule.

So the honest answer is that PBC status gives directors **latitude to deprioritise profit, not an obligation to.** Whether that latitude survives a determined activist, a proxy fight, or a capability decision that visibly costs money is untested at this scale. Unknown Anyone who tells you confidently how this resolves is speculating.

### Anthropic: the Long-Term Benefit Trust

Company Anthropic is a Delaware PBC governed in part by the **Long-Term Benefit Trust** — an independent body of financially disinterested trustees holding a special class of stock with the right to elect a growing portion of the board, ultimately a majority.

Reported The mechanism is a **Class T** share class with negligible economic value and substantial governance power, and the anticipated IPO structure would give public buyers ordinary common stock while the Trust retains its Class T rights. I want to be careful here: the existence and general design of the LTBT is well documented by Anthropic itself, but **the precise share-class mechanics as they would apply post-IPO are reported, not filed.**

Why this is genuinely novel

Dual-class structures are common — founders keep super-voting stock. That is concentrated *ownership* power.

The LTBT is different in kind: an **independent body that is not a shareholder in any economic sense** holds escalating authority over board composition. Its trustees do not benefit financially from the company's performance.

No company has gone public with that arrangement at scale.

Why an index investor may object

Governance screens at large institutions penalise structures where economic and voting rights diverge. Some indices exclude or underweight multi-class issuers outright.

A body accountable to a mission rather than to shareholders is, from a pure stewardship standpoint, an unaccountable one — that is the objection in its strongest form, and it is not a bad-faith objection.

The counter is that this is disclosed in advance and nobody is required to buy.

What to actually watch for

In any governance section that appears, three specific things carry more information than the narrative around them:

-   **Sunset provisions.** Do the special rights expire on a date, on a shareholding threshold, or on a founder's departure? A structure with a sunset is a temporary arrangement being described as a permanent one.
-   **Amendment mechanics.** Who can change the governance provisions, and by what vote? A mission-control provision amendable by a simple majority of common shareholders is decorative.
-   **What the trustees or Foundation directors can actually compel.** Appointing directors is weaker than it sounds if the appointed board still owes ordinary fiduciary duties and faces ordinary liability.

Module 6 takeaways

-   OpenAI Foundation appoints the entire OpenAI Group PBC board; Microsoft holds ~27% and no seat.
-   Anthropic's LTBT is structurally novel: non-economic trustees with escalating board authority.
-   Delaware PBC status permits deprioritising profit; it does not require it. That is the whole ambiguity.
-   Read sunsets and amendment mechanics before you read the mission language.

## Module 7: What neither is saying

By the end of this module you will

-   Have a list of specific absences to check against any filing that appears
-   Distinguish "not yet disclosed because confidential" from "conspicuously unaddressed"

With no public filings, we cannot analyse risk-factor language. What we *can* do is inventory what neither company has addressed voluntarily, in a period when both were actively communicating with the market. That inventory is a genuine analytical object.

#### 1\. Neither has published a gross margin

Anthropic published a valuation, a raise size, an investor list and a run-rate. It did not publish a margin, a cost figure, or a burn rate. OpenAI has published none of these directly. Inference For a company whose reported gross margin is in the 33–39% range against software comparables at 70–80%, this is the number with the most explaining attached, and both are letting others estimate it rather than setting the anchor themselves.

#### 2\. Neither has quantified copyright exposure

Unknown Both face active litigation over training data. Neither has published a reserve, a range of reasonably possible loss, or a contingency estimate. When a filing appears, the legal-proceedings note and the loss-contingency language will be the most carefully lawyered text in the document — and the phrase to search for is whether they can "reasonably estimate" the loss. A statement that they cannot is itself informative.

#### 3\. Neither has addressed key-person dependence in public

Both companies are unusually identified with a small number of individuals. Standard S-1s carry a key-person risk factor. Neither company's public communications acknowledge it. This is entirely normal pre-filing behaviour — nobody volunteers a risk factor — but worth flagging as an absence rather than an absence of risk.

#### 4\. Anthropic's compute disclosure is notably specific; its cost disclosure is not

The Series H release names gigawatts, partners, and chip suppliers with real precision: up to 5 GW from Amazon, 5 GW of TPU capacity with Google and Broadcom, GPU access via SpaceX, and memory relationships with Micron, Samsung and SK hynix. Inference That is a company demonstrating *supply security* to an audience worried about compute scarcity — and simultaneously not saying what any of it costs or over what term. The specificity of the first half makes the silence in the second half more legible, not less.

#### 5\. Neither has said anything about pricing trajectory

This is the omission that matters most to anyone building on these APIs. No published commitment on price stability, deprecation windows, or notice periods for enterprise terms. Inference That silence is rational — committing to price floors or ceilings before an IPO would be strategically foolish — but it means every downstream business is planning on an input whose supplier has made no forward commitment whatsoever.

The counter-argument to this whole module

An honest objection: **companies in a confidential SEC review process are constrained in what they can say.** Rule 135 is narrow, gun-jumping rules are real, and reading meaning into silence during a quiet period is close to unfalsifiable. Much of what I have listed above is better explained by "their lawyers told them not to" than by anything strategic.

I think that is right for items 2 and 3 and weaker for items 1, 4 and 5 — because Anthropic demonstrably *did* publish selectively during this window, and selection is a choice even when the constraint is real. But you should hold this module more loosely than the others.

Module 7 takeaways

-   Neither company has anchored its own gross margin. Both are letting others estimate it.
-   Copyright loss contingencies are unquantified in public. Watch for "cannot reasonably estimate."
-   Anthropic disclosed compute supply in detail and compute cost not at all.
-   No forward commitment on pricing exists from either. Every downstream plan rests on that.

## Module 8: What you do about it

By the end of this module you will

-   Have five concrete actions, each with an owner-sized scope
-   Have a small watchlist of observable signals with defined thresholds

### What this means for education specifically

Education has a structural problem that most AI-consuming sectors do not: **the willingness to pay per interaction is low and the number of interactions per outcome is high.** A learner working through a course may generate hundreds of AI interactions across weeks against a subscription price that is fixed. That is the worst possible shape for exposure to a rising per-interaction cost, and it is precisely the shape that Module 4's arithmetic threatens.

Two consequences follow, and they point in different directions:

The pressure

Consumer education has the thinnest cushion. Coursera's Consumer segment gross margin is **65%**; Enterprise is **79%** Filed. A rising AI COGS line lands hardest on the consumer side, where price is fixed and usage is unbounded.

Anything priced per-seat with unlimited AI usage is a short position on inference cost.

The opportunity

Education is one of the few sectors where *outcome* is measurable, which means AI spend can in principle be tied to a demonstrable result — completion, credential, placement.

That makes it possible to price on value rather than on usage, which is the only pricing model that is robust to input-cost volatility.

### Five things to do differently

1.  **Instrument tokens per completed task, monthly, and put it in the operating review.** Not tokens, not spend — tokens per *completed task*, alongside task success rate. This is the single measurement that distinguishes "we shipped more capability" from "we lost control of the loop," and almost nobody has it. Everything else in this list depends on it existing.
2.  **Re-underwrite any product where AI usage is unbounded and price is fixed.** Identify every SKU where a single user can drive arbitrary inference against a flat fee. Model each at the Module 4 breakeven — flat unit cost, not falling. If a SKU only works on falling unit cost, it does not work.
3.  **Build the cost levers now, while they are optional.** Prompt caching, model routing to smaller SKUs, distillation of high-volume paths, batch processing for anything not interactive. These are the difference between your effective `d` and the vendor's headline `d`. They take two to three quarters to build and you want them before you need them, not after.
4.  **Negotiate for throughput terms, not unit price.** When these vendors are public, the negotiable surface shifts from price per token toward committed-use discounts, priority tiers, and rate-limit guarantees. Ask now for notice periods on deprecation and pricing changes, and get them in writing. A 90-day deprecation notice is worth more than a 10% discount.
5.  **Keep at least two frontier vendors genuinely wired in.** Not as a slide — as a routing layer that is exercised in production on real traffic. Company Claude is now available on AWS, Google Cloud and Azure, which makes multi-vendor materially easier than it was. The value of this is not price arbitrage; it is that it converts a supplier relationship into a market.

### The watchlist

| Signal | Where to see it | What it would mean |
| --- | --- | --- |
| A public S-1 appears on EDGAR | EDGAR full-text search; a roadshow must follow by at least 15 days | The first verifiable numbers. Read Contractual Obligations and revenue concentration first. |
| Rate limits tighten or priority tiers appear | Your own API dashboards and vendor changelogs | Demand has caught capacity. This precedes price changes and is the earlier signal. |
| Deprecation windows shorten | Model lifecycle pages | Cost discipline arriving ahead of public reporting. Directly raises your migration cost. |
| Free tiers narrow | Consumer product pages | The subsidy is being withdrawn from the least-monetised surface first. |
| Enterprise agreements start requiring volume commitments | Your own renewals | The vendor is converting to a take-or-pay model, pushing its commitment risk to you. |
| Tokens per completed task rises >2× year over year | Your own instrumentation | You are at or past the Module 4 breakeven. Unit costs are rising regardless of vendor pricing. |

On the Instructure decision specifically

If you are weighing a CPTO role at an LMS company against a platform role, this analysis has one direct implication worth stating plainly. **An LMS sits closer to the institution and further from the per-interaction cost than a consumer learning platform does.** Institutional contracts are annual, negotiated, and priced per seat with usage patterns that are far more predictable than consumer engagement. That is a materially better position from which to absorb input-cost volatility.

The corresponding weakness is that institutional buyers move slowly, which means less ability to reprice quickly if inference costs move against you mid-contract. Inference The question worth asking in any such process is not "what is your AI strategy" but **"what is your AI cost per active user, and what happens to your contribution margin if it triples?"** The quality of the answer — whether they have the number at all — tells you most of what you need to know about the engineering organisation.

This is analysis, not advice. I am not in a position to weigh a career decision for you and the inputs that matter most here are not financial.

Module 8 takeaways

-   Education's shape — low willingness to pay, high interactions per outcome — is maximally exposed to unit-cost rises.
-   Instrument tokens per completed task before anything else. It gates every other decision.
-   Any fixed-price SKU with unbounded AI usage needs re-underwriting at flat unit cost.
-   Negotiate throughput, notice periods and deprecation windows — not headline price.
-   The earliest observable signal of the subsidy ending is rate limits, not price.

Built 18 August 2026. All EDGAR checks performed the same day.

[Check EDGAR yourself](https://www.sec.gov/cgi-bin/browse-edgar?company=anthropic&action=getcompany) [OpenAI notice](https://openai.com/index/openai-submits-confidential-s-1/) [Anthropic notice](https://www.anthropic.com/news/confidential-draft-s1-sec) [Coursera 10-Q](https://www.sec.gov/Archives/edgar/data/1651562/000165156226000063/cour-20260630.htm)

If a public S-1 has appeared since this was written, this course is out of date and the filing supersedes every reported figure in it.