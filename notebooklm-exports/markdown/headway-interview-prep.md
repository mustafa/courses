# Headway — Head of Provider Experience (Engineering) Interview Prep | Aug 4–5, 2026

Personal Prep · Headway · Aug 4–5, 2026

# Head of Provider Experience — Headway Interview Prep

Everything needed to walk into three interviews with a point of view: what Headway actually is and how it makes money, what the ~40-engineer Provider org owns today, a complete worked PRD for self-serve provider onboarding, STAR story scaffolding for the results interview, five systems designs (onboarding, portal, telehealth, AI notes, 80K→500K scale), a 90-day plan, questions to ask each interviewer, and a day-of runbook.

📚 8 Modules 📝 1 Full PRD + Blank Template 🏗 5 Systems Designs ❓ Quizzes & Flashcards 🔌 Fully Offline

**🎯 For Zeesha.** Three sessions, two days: **Tue Aug 4, 2:00–2:45 PM** PRD Jam with Severin Kibby; **Wed Aug 5, 1:00–1:45 PM** Results & Growth Mindset with Dennis Zhao; **Wed Aug 5, 2:00–3:00 PM** Systems Design with Urmila Nadkarni. Modules 3, 4 and 5 map one-to-one onto those sessions. If time is short: read Modules 1–2 tonight for context, drill Module 3 before Tuesday, and Modules 4–5 Tuesday night. Module 8 is the day-of runbook.

**⚑ On the numbers.** Headway is *private*, so nothing here is audited. Public figures come from Headway press releases, its own job postings, and reported funding news — they are dated in-line so you can see how stale each one is. Org details (~40 engineers growing to 60–70, the 5–6-person Provider Growth team, Salesforce as the lead system of record, ~10K providers onboarded per quarter manually, the internal eval platform) come from *your recruiter and hiring-manager conversations*, not public sources — treat them as directional and worth confirming out loud in the room. Anything labeled **reference pattern** in Module 5 is a standard industry architecture, not Headway’s confidential internals. Never state a number in the interview more precisely than you can defend.

0 / 8 completed

🔍

1.  [1 Understanding Headway — The Business & The Problem](#mod1)
2.  [2 The Provider Experience Org — What You’d Own](#mod2)
3.  [3 PRD Jam Session — Severin Kibby (Tue 2:00 PM)](#mod3)
4.  [4 Results & Growth Mindset — Dennis Zhao (Wed 1:00 PM)](#mod4)
5.  [5 Systems Design — Urmila Nadkarni (Wed 2:00 PM)](#mod5)
6.  [6 Strategy & Vision — The 90-Day Plan](#mod6)
7.  [7 Questions to Ask (Per Interviewer)](#mod7)
8.  [8 Day-of Runbook & Cheat Sheet](#mod8)

### The One-Sentence Version

Headway is a **managed marketplace** that makes it economically and administratively viable for independent therapists to accept health insurance — and in doing so, converts out-of-network mental health capacity into in-network capacity that patients can actually afford. Patients search, filter by their insurance, see their real copay, and book. Providers get credentialed once, get paid reliably, and never touch a claim form. Headway gets paid by the *payers*, not by either side of the marketplace.

The framing that wins the room

Do not describe Headway as “a therapy app.” Describe it as **infrastructure for a broken reimbursement market**. The product is not the directory — the product is credentialing, claims, benefits verification, and guaranteed payment, wrapped in software that a solo practitioner can operate without a billing person. That framing is exactly what makes *Provider Experience* the strategic org rather than a support function.

### The Access Problem They Exist To Solve

The mental health access crisis in the U.S. is not primarily a shortage of therapists. It is a **shortage of therapists who take insurance** — and that shortage is manufactured by economics and paperwork:

18.2%

Out-of-network rate, psychologist office visits

1.7%

Out-of-network rate, medical specialists

−21.8%

Behavioral health reimbursement vs. med/surg

\>1/3

Practicing psychologists who take no insurance

-   **The money is worse.** Reported averages put an insurance-reimbursed session near **$111** against roughly **$159** for private pay. A therapist who takes cash earns more per hour, immediately, with zero claims risk.
-   **The paperwork is brutal.** Surveys of clinicians leaving insurance panels split roughly **34% over low pay** and **26% over administrative burden**. A solo practitioner doing their own credentialing, eligibility checks, claims, and appeals is running a small billing company on nights and weekends.
-   **“Ghost networks” are the visible symptom.** Payer directories list providers who have retired, moved, closed their panel, or never took that plan. The patient calls fifteen numbers and gets zero appointments — while the payer’s network adequacy report says the network is fine.

So the payer has a real, expensive, regulated problem: **network adequacy they cannot actually deliver**. That is the wedge. Headway sells payers usable, bookable, in-network mental health supply, and pays for it by taking a share of the reimbursement it unlocks.

### How The Money Actually Moves

```
PATIENT                    HEADWAY                      PAYER
     |                          |                            |
     |-- searches, filters --->|                            |
     |<-- real copay shown -----|-- eligibility / benefits -->|
     |                          |    verification (270/271)   |
     |-- books (median ~48h) -->|                            |
     |                          |                            |
  PROVIDER                      |                            |
     |<-- session happens ------|                            |
     |                          |-- claim submitted (837) --->|
     |                          |<-- remittance (835) --------|
     |<-- paid on a fixed ------|                            |
     |    biweekly schedule,    |   Headway keeps a share of
     |    Headway absorbs the   |   the reimbursement. Neither
     |    A/R timing risk       |   side pays a subscription.
```

Three consequences of that model that you should be able to say out loud:

1.  **Headway carries working capital and claims risk.** Providers are paid on schedule whether or not the claim has adjudicated. So *claim acceptance rate and denial rate are not back-office metrics — they are margin*. A note that fails an audit is a clawback.
2.  **Supply is the constraint, not demand.** Demand for affordable therapy is effectively unlimited. Every incremental credentialed provider is incremental revenue. This is *why* Provider Growth exists as its own org and why self-serve onboarding is a company-level bet, not a team-level nicety.
3.  **Free software is a customer-acquisition strategy.** The EHR is free because it is not the product — it is the retention and utilization mechanism for supply. That reframing matters when you get asked “how do you prioritize portal work against onboarding work?”

### Scale — And Why The Trajectory Is The Real Story

| When | Providers | Source / context |
| --- | --- | --- |
| 2022 | ~22,000 | 16 states + DC; ~300K appointments/month |
| 2024 | ~34,000 | Series D announcement; all 50 states; 40+ plans; 600K+ appointments/month |
| Mid-2025 | ~45,000 | Headway job postings |
| Sept 2025 | 60,000+ | Expanded free insurance-native EHR launch |
| Mar 2026 | 70,000+ | Tezi team acquisition announcement |
| Aug 2026 | ~80,000 | Per your hiring conversations (not public) |

Do this arithmetic before Tuesday

70K in March to ~80K in August is roughly **10K net adds in five months — about 6K net per quarter**. But you have been told onboarding is running at ~**10K per quarter**. That gap is not a contradiction; it is the *churn number nobody volunteers*. Gross adds minus net adds is attrition. Asking “what’s the delta between gross and net provider adds, and what does month-6 provider retention look like?” signals that you think in funnels, not features — and it is the single best question you can ask Dennis Zhao.

### Funding, Ownership & Who’s Who

-   **Founded April 2019** in New York City by **Andrew Adams** (CEO), **Jake Sussman**, **Dan Ross**, and **Kevin Chan**. Origin story: Adams could not find an insurance-accepting therapist after moving to NYC.
-   **~$325M+ raised** across six rounds. The **$100M Series D** led by **Spark Capital** put the valuation at **$2.3B**, roughly a 130% step-up. Investor set: a16z, Thrive Capital, Accel, Spark, Forerunner Ventures.
-   **Leadership to know by name:** Andrew Adams (CEO/co-founder), **Arnaud Ferreri** (CTO), **Jake Poses** (VP Product), **Dr. Neha Chaudhary** (Chief Medical Officer), and **Raghavendra Prabhu** (VP Engineering, joined March 2026 via the Tezi acquisition — previously Google, Microsoft, Twitter, Pinterest, Thumbtack, Covariant).
-   **Engineering size:** a 2025 posting described the team as “small (~120) but mighty.” If the Provider org alone is ~40 today heading to 60–70, *you would be running roughly a third of all of engineering*. Say that out loud at some point — it shows you understand the weight of the role.

### The Tezi Acquisition — Read The Signal

On **March 31, 2026** Headway acquired the team behind **Tezi**, an AI-native company whose thing was *combining human judgment with AI agents inside complex workflows* — automating the tedious operational parts so the human handles the parts that need a human. Prabhu became VP Engineering; engineers, designers and data scientists came with him. The stated targets: patient–provider matching, administrative logistics, insurance navigation, scheduling.

Why this matters for your role specifically

Headway did not buy a chatbot team. It bought a **human-in-the-loop agentic workflow** team, four months before hiring a Head of Provider Experience whose biggest problem is *10,000 manually-onboarded providers a quarter*. Those two facts point at the same thesis: **onboarding and credentialing are the workflow AI is meant to eat**. If you walk in with a design where AI agents draft and pre-verify while humans adjudicate exceptions, you are not pitching — you are agreeing with a bet they already made and showing you can execute it.

### Competitive Landscape

| Player | Model | How they differ from Headway |
| --- | --- | --- |
| Alma | Membership / subscription for providers (~24K providers) | Provider pays a monthly fee for credentialing + billing support. Headway charges providers nothing and monetizes the payer side — different incentive on provider utilization. |
| Grow Therapy | Insurance marketplace, 100+ plans incl. Medicare & Medicaid | Closest direct analogue. Broader government-payer coverage is their claimed edge; expect Headway to be pushing Medicare Advantage / Medicaid too. |
| Rula | Insurance-first network, heavier care-delivery framing | More clinically-managed positioning; competes for the same providers and the same panels. |
| SonderMind | Insurance + EAP, matching & outcomes tracking | Leans on measurement-based care and structured rates; smaller network, deeper outcome instrumentation. |
| Spring Health / Lyra / Modern Health | Employer-paid behavioral health benefit | Different buyer entirely (HR, not the health plan). Competes for the same provider supply, though — a therapist has finite hours. |
| SimplePractice / TherapyNotes | Paid practice-management SaaS & EHR | Headway’s free EHR is a direct attack on this category’s pricing. Every provider who consolidates onto Headway’s EHR is a provider who is much harder to churn. |

> **Warning:** The uncomfortable strategic truth to have an answer for
>
> Providers **multi-tenant**. The same therapist can be on Headway *and* Alma *and* Grow Therapy, cherry-picking whichever sends the best-fitting referrals and pays fastest. That makes the marketplace far less defensible than it looks. The two things that actually create lock-in are (a) **being the system of record for their practice** — calendar, notes, clients, claims history — which is exactly what the free EHR does, and (b) **utilization**: whoever fills their calendar owns them. If asked “what’s your moat?”, that is the answer, and it is an *engineering* answer: the moat is the depth of the portal, not the size of the directory.

**Q: Who pays Headway?**

-   Providers, via a monthly subscription
-   Patients, via a per-session platform fee
-   Payers — Headway takes a share of the insurance reimbursement **(correct)**
-   Employers, as a benefits contract

*Explanation: Headway is free to both providers and patients. It is paid out of the insurance reimbursement it unlocks, which is why claim acceptance and denial rates are margin, not back-office trivia. Alma is the subscription model; Lyra and Spring Health are the employer-paid model.*

**Q: Why is provider supply the growth constraint rather than patient demand?**

-   Patients rarely want therapy
-   Demand for affordable in-network therapy vastly exceeds the supply of insurance-accepting therapists, so each credentialed provider is incremental revenue **(correct)**
-   Payers cap the number of patients
-   Headway limits patient signups deliberately

*Explanation: More than a third of psychologists take no insurance at all, and the out-of-network rate for psychologist visits is ~10x that of medical specialists. Demand is effectively unlimited; supply is the bottleneck. That is the entire strategic justification for a Provider Growth org.*

**Q: What is the most useful reading of the March 2026 Tezi acquisition?**

-   Headway is pivoting to selling AI tools
-   Headway bought a human-in-the-loop agentic workflow team, signalling that admin workflows like credentialing and onboarding are the target for automation **(correct)**
-   It was purely a talent grab with no product thesis
-   Headway is replacing therapists with AI

*Explanation: Tezi's stated specialty was combining human judgment with AI agents inside complex workflows. Acquiring that team months before hiring a Head of Provider Experience whose core problem is manual onboarding at 10K/quarter points at one thesis: automate the workflow, keep the human on exceptions.*

-   **Headway founding** — April 2019, NYC. Andrew Adams (CEO), Jake Sussman, Dan Ross, Kevin Chan. Adams could not find an in-network therapist after moving to NYC.
-   **Valuation & funding** — $2.3B after a $100M Series D led by Spark Capital. ~$325M+ total across six rounds. Investors: a16z, Thrive, Accel, Spark, Forerunner.
-   **Out-of-network disparity** — 18.2% of psychologist office visits go out-of-network vs 1.7% for medical specialists — roughly a 10x gap. Behavioral health reimburses ~21.8% below med/surg.
-   **Free EHR launch** — September 9, 2025. Insurance-native, free, AI-assisted notes with audit-ready insurance-optimized templates, telehealth, scheduling, billing, client comms, automatic benefits verification.
-   **Tezi acquisition** — March 31, 2026. Human-in-the-loop AI agent team. Cofounder Raghavendra Prabhu became VP Engineering (ex-Google, Microsoft, Twitter, Pinterest, Thumbtack, Covariant).
-   **The multi-tenanting problem** — Providers list on Headway AND Alma AND Grow Therapy simultaneously. Lock-in comes from being the practice system of record (free EHR) and from filling their calendar — not from directory size.

### The Shape Of The Job

Two sub-orgs under one leader, at wildly different maturity levels. That asymmetry *is* the job, and naming it early is one of the strongest things you can do in any of the three interviews.

|  | Provider Growth | Provider Experience |
| --- | --- | --- |
| Headcount | ~5–6 engineers | ~35 engineers |
| Age | ~6 months old | Established |
| Owns | Referral engine, marketing web experiences, lead capture & routing, onboarding funnel | Provider portal, calendar & scheduling, telehealth, transcription, note-taking, post-session summarization, eval platform |
| System of record | Salesforce for leads — sales-owned, not product-owned | Headway’s own platform & EHR |
| Core problem | No self-serve path. ~10K providers/quarter onboarded manually. | Depth, reliability and AI quality in a product that is now the provider’s daily driver |
| Your first job | Build the team and the funnel from near-zero | Don’t break it; raise the ceiling on AI quality |

The sentence to have ready

“These are two different jobs wearing one title. Provider Growth is a **0→1 problem with a startup team** — the work is finding the funnel, instrumenting it, and earning the right to automate it. Provider Experience is a **1→n problem with a mature team** — the work is quality, reliability, and making the AI features actually trustworthy. I’d run them on different cadences, different risk tolerances, and different definitions of done, and I’d be explicit with both teams about which mode they’re in.”

### Provider Growth — The Manual Onboarding Problem

Today the path looks roughly like this, and almost none of it is software the provider drives:

```
Marketing / referral  ──▶  LEAD  ──▶  Salesforce (system of record)
                                          │
                                          ▼
                              Sales rep reaches out (manual)
                                          │
                                          ▼
                              Rep collects: license, NPI, CAQH,
                              malpractice, W-9, practice details
                                          │
                                          ▼
                              Credentialing ops: primary source
                              verification, payer enrollment
                                          │
                                          ▼
                              Panel assignment  ──▶  ACTIVE PROVIDER
                              (target: live in <30 days)

  Every arrow above is a human. At ~10K/quarter that is
  ~110 providers per business day flowing through a
  people-shaped pipeline.
```

#### Run the capacity math — out loud, in the interview

~10,000 providers per quarter is about **110 per business day**. If a rep can meaningfully touch, say, 6–8 new providers a day end-to-end, that pipeline needs on the order of **15–20 full-time humans just to hold current volume**, before any growth. To double provider adds, you hire double the reps — unless the funnel becomes software.

Say the number, then say the caveat

Don’t assert the 6–8/day figure as fact — you don’t have it. Say: *“I don’t know your reps’ actual throughput, but the shape of the problem is linear headcount scaling. If a rep handles roughly N a day, you need 110/N reps to stand still. The first thing I’d instrument is time-per-provider by funnel stage, because that number tells you whether to automate the top of the funnel or the credentialing middle — and those are completely different engineering investments.”* That is a leader reasoning, not a candidate guessing.

#### Why “Salesforce is the SOT” is the interesting part

This one detail tells you more about the org than anything else on the list:

-   **The lead data model is owned by RevOps, not Engineering.** Schema changes go through a different org with a different roadmap. Any self-serve funnel you build either writes into Salesforce or fights it.
-   **You cannot build a great self-serve experience on top of a CRM.** Salesforce is excellent at what a rep needs and wrong for what an applicant needs — no resumable application state, no document upload UX, no idempotent verification workflow, no real-time status for the provider.
-   **But ripping it out on day one is a political and operational mistake.** Sales runs on it. Forecasting runs on it. The correct move is a **strangler-fig migration**: stand up an owned Provider Application service as the SOT for *application state*, keep Salesforce as the SOT for *the commercial relationship*, and sync one direction with a clear contract. Module 5 designs this properly.

### Provider Experience — The ~35-Engineer Product Suite

| Surface | What it does | The hard part |
| --- | --- | --- |
| Provider portal | The daily driver: clients, calendar, documentation, billing status, payouts | It is now the provider’s system of record. Downtime is a cancelled session; a data bug is a compliance event. |
| Calendar & scheduling | Availability, booking, reschedules, no-show handling, external calendar sync | Double-booking, timezone/DST correctness, two-way sync with Google/Outlook, and the fact that a scheduling bug directly destroys provider trust. |
| Telehealth | Embedded video sessions | Real-time media quality on consumer networks, HIPAA-eligible infrastructure and BAAs, graceful degradation, and never being the reason a session fails. |
| Transcription | Session audio → text | Consent capture, PHI handling, speaker diarization, clinical vocabulary, accents, and cost per hour of audio. |
| Note-taking & post-session summarization | Session → insurance-ready progress note (SOAP/DAP style) | The note must survive a payer audit. Hallucinated content in a clinical record is the highest-severity failure mode in the entire product. |
| Eval platform | Measuring AI output quality; teams are centralizing on it | Defining “good” for a clinical note, building gold-standard datasets with clinician labels, and gating deploys on eval regressions. |

> **Warning:** On the eval platform name
>
> You noted it as **“Lenssmith.”** There is no widely-known public product by that name; the closest public tool is **LangSmith** (LangChain’s tracing + evaluation platform: datasets, LLM-as-judge evaluators, human annotation queues, online evals on production traces). It may be an internal codename, or it may be LangSmith heard once in a fast conversation. *Do not guess in the room.* Ask it as a real question — “tell me about the eval platform teams are standardizing on; is that built in-house or on top of something like LangSmith?” — and then talk about eval *practice*, which is what they actually care about: golden datasets, clinician-labeled ground truth, regression gates in CI, and online eval on production traffic. Module 5 has the substance.

### Org Design: 40 → 60–70 In A Year

Growing an org by ~60% in twelve months is the part of this job that most quietly determines whether you succeed. Some structure to bring:

##### The team-shape principle

Cut teams along **durable domain boundaries**, not along projects. A team named “Self-Serve Onboarding” has a lifespan; a team named “Provider Activation” owns a funnel forever. Stream-aligned teams that own an outcome and its on-call, with a small platform capability underneath if and only if two or more streams need the same thing.

##### A plausible target topology

| Team | Owns | Today | Target |
| --- | --- | --- | --- |
| Provider Acquisition | Referral engine, marketing web, lead capture & routing | ~3 | 6–8 |
| Provider Activation / Onboarding | Self-serve application, document intake, status & nudges | ~3 | 8–10 |
| Credentialing Systems | Verification, payer enrollment, ops tooling, exception queues | — | 6–8 new |
| Portal Core | Client management, navigation, permissions, performance | ~10 | 10–12 |
| Scheduling & Calendar | Availability, booking, sync, reminders, no-shows | ~8 | 8–10 |
| Telehealth | Video session experience & reliability | ~5 | 5–7 |
| Clinical AI (notes, summarization) | Capture → transcript → note pipeline, evals | ~8 | 12–15 |

Illustrative, not prescriptivePresent it as a hypothesis you’d test in your first 30 days

##### The hiring math nobody asks about but everyone judges

-   **~25 net hires in a year is roughly 2 per month, sustained.** At a realistic offer-accept and top-of-funnel ratio that is on the order of a hundred-plus screens. That is a *recruiting operation*, and your calendar is the constraint.
-   **You need managers before you need engineers.** Seven teams needs 5–7 EMs. If you have fewer today, your first-quarter hiring priority is leadership and senior ICs, not headcount volume — because every unmanaged team you create becomes your direct report.
-   **Protect the ratio.** Onboarding 25 people into an org of 40 means at peak, a third of your engineers are ramping. Guard senior:junior mix, keep an explicit onboarding buddy system, and expect a temporary velocity dip — say that out loud rather than promising linear output. Leaders who promise linear output from linear headcount get found out in the first quarter.

> **Tip:** A strong, honest line about the 6-month-old team
>
> “A six-month-old team of five that has been shipping into a manual process usually has more *tribal knowledge* than documentation, and their instinct will be to keep unblocking sales one ticket at a time — because that’s what got them praised. The first thing I’d do isn’t reorg them, it’s sit with the reps and the credentialing ops team for a week and watch the actual work. Then I’d give that team one measurable outcome to own instead of a queue.”

**Q: Why is 'Salesforce is the system of record for leads' the most strategically loaded fact about Provider Growth?**

-   Salesforce is slow
-   The lead data model is owned by RevOps rather than Engineering, so any self-serve funnel must either write into it or fight it — and a CRM cannot host a good applicant experience **(correct)**
-   Salesforce cannot store documents
-   It means the team has no engineers

*Explanation: A CRM is built for what a rep needs, not what an applicant needs — no resumable application state, no document intake UX, no real-time provider-facing status. And because RevOps owns the schema, changes cross an org boundary. The answer is a strangler-fig split: own application state, leave the commercial relationship in Salesforce.*

**Q: Roughly how many providers per business day does ~10,000/quarter represent?**

-   About 10
-   About 40
-   About 110 **(correct)**
-   About 400

*Explanation: ~10,000 per quarter over roughly 65 business days is about 110 per day. Being able to convert a quarterly number into a daily operational load in your head is exactly the reflex that reads as 'this person has run a funnel before.'*

**Q: When splitting a growing org into teams, which boundary is more durable?**

-   One team per project currently on the roadmap
-   Teams aligned to a domain or outcome that persists after the project ships **(correct)**
-   One team per technology (frontend team, backend team, mobile team)
-   Teams organised by seniority

*Explanation: Project-named teams have a lifespan and must be re-formed constantly; outcome-aligned teams ('Provider Activation') own a funnel and its on-call indefinitely. Technology-layer teams create a handoff for every user-visible change.*

Tuesday, August 4, 2026 · 2:00–2:45 PM · 45 minutes

Severin Kibby — Product leader, Headway (SF-based)

A working session, not a presentation. You are being evaluated on whether a product leader would *want you in the room* when the roadmap gets decided.

### What A “PRD Jam” Actually Is

Expect one of three formats. Prepare for all three — they share the same core skill.

| Format | What happens | What they’re testing |
| --- | --- | --- |
| Blank page | “Let’s write a PRD for self-serve provider onboarding together.” | Can you frame a problem before jumping to a solution? Do you pick metrics that mean something? |
| Critique | They hand you a real (or deliberately flawed) PRD and ask what you’d change. | Do you find the missing success metric and the unstated assumption — or just the typos? |
| Live collaboration | They start writing and pull you in; it becomes a back-and-forth. | Are you additive or obstructive? Do you build on their idea or restart from yours? |

The single biggest thing they’re measuring

Whether an *engineering* leader can hold a **product** conversation without either (a) collapsing into implementation detail, or (b) waving away feasibility to sound visionary. The winning posture: **you carry the feasibility and sequencing, they carry the customer and the market, and you visibly enjoy the trade.** When you hear a scope idea, your reflex should be “here’s what that costs and here’s a cheaper 80% version” — not “that’s hard.”

### The First Five Minutes — Do Not Skip This

The most common failure in a PRD jam is starting to write immediately. Spend the first 4–5 minutes establishing the frame. Say something close to:

Opening script

“Before I start writing — can I ask four questions so I’m solving the right problem? First, **who is the customer here**: is this the therapist who has never taken insurance, or the one already on Alma who’s adding a second platform? Second, **what breaks if we do nothing** — are we capacity-constrained on ops headcount, or are we losing leads at the top? Third, **what’s the constraint I should design inside** — is credentialing turnaround a hard 30-day commitment we’ve made to providers? And fourth, **what does success look like to you** in a number, six months out? I’ll write toward whatever you tell me.”

Then *write on the shared surface as you go*. If it is a video call with a doc, ask to share and type. A candidate who narrates a PRD is doing a presentation; a candidate who builds one visibly is doing the job.

### The PRD Skeleton To Have Memorized

Eight headings. You should be able to write these from muscle memory in under a minute:

**1\. Problem** — whose pain, how big, evidence.
**2\. Why now** — what changed that makes this urgent.
**3\. Goals & non-goals** — explicitly what we are *not* doing.
**4\. Success metrics** — one primary, 2–3 supporting, 2–3 guardrails.
**5\. Users & jobs** — personas and the job each is hiring us for.
**6\. Solution & user stories** — the experience, then the requirements.
**7\. Technical approach & phasing** — V0 / V1 / V2 with what each proves.
**8\. Risks, dependencies, open questions** — named owners where possible.

> **Tip:** The two headings that separate senior from junior
>
> **Non-goals** and **guardrail metrics**. Anyone can list features. Explicitly writing “we are not automating credentialing decisions in V1” and “we will not ship if provider quality-score distribution shifts more than X” is what tells a product leader you have shipped things that could have gone wrong.

### Worked PRD — Self-Serve Provider Onboarding

This is your prepared artifact. Read it twice before Tuesday; do not recite it. Its job is to make you fluent, so that when Severin pushes on any section you already have three sentences ready.

#### 1\. Problem

Every provider who joins Headway today is onboarded by a human. Marketing and referrals generate a lead, it lands in Salesforce, a sales rep works it manually, and credentialing operations pushes it through license verification and payer enrollment by hand. At roughly **10,000 providers per quarter — about 110 per business day — onboarding capacity is a function of headcount, not software.**

Three costs follow: (a) provider growth is capped by how fast we hire and train ops staff; (b) high-intent providers wait in a queue and some churn to Alma or Grow Therapy while they wait; (c) our most experienced reps spend their day on data entry for providers who would have completed a form unassisted.

##### Evidence to ask for (and to say you’d ask for)

-   Lead → application-start → application-complete → credentialed → first-session conversion, by stage, with time-in-stage.
-   Median and p90 days from lead created to first billable session — the number that actually matters.
-   Rep-hours per activated provider, split by funnel stage.
-   Reason codes for drop-off: missing documents? verification failure? provider went dark? panel closed?

#### 2\. Why now

-   Volume has crossed the point where linear ops scaling is the binding constraint on company growth.
-   The org just acquired a team (Tezi) whose specialty is human-in-the-loop agentic workflow — the exact capability this problem needs.
-   The free EHR gives newly-activated providers somewhere to land, so activation now converts into retention rather than a directory listing.
-   Competitors are advertising fast onboarding directly to the same providers. Time-to-first-session is a competitive surface, not just an internal efficiency metric.

#### 3\. Goals & non-goals

**Goals**

-   A provider can go from “interested” to “submitted, verified application” without talking to a human.
-   Rep time shifts from data collection to exception handling and high-value conversion.
-   Providers get continuous, self-serve visibility into their own status.

**Non-goals (V1)**

-   *We do not automate the credentialing decision.* Software gathers and verifies; a qualified human still approves. This is a regulatory and trust boundary, not a technical limitation.
-   We do not replace Salesforce as the commercial system of record.
-   We do not redesign payer enrollment contracts or negotiate new panel rules.
-   We do not build self-serve for edge segments in V1 (group practices, prescribers with DEA requirements, multi-state licensure) — they route to assisted flow.

#### 4\. Success metrics

| Type | Metric | Why this one |
| --- | --- | --- |
| Primary | % of activated providers who complete onboarding with zero rep touches | Directly measures whether the funnel became software. Resistant to gaming — you cannot fake it with a prettier form. |
| Supporting | Median & p90 days from lead → first billable session | The provider-felt outcome. p90 matters more than median: the tail is where churn lives. |
| Supporting | Rep-hours per activated provider | Converts the win into a capacity number the business can plan against. |
| Supporting | Application start → submit completion rate | Isolates funnel UX quality from downstream credentialing throughput. |
| Guardrail | Credentialing rejection rate & rework rate | If self-serve just floods ops with bad applications, we made things worse. This is the metric that kills the project if ignored. |
| Guardrail | Provider quality mix (licensure type, specialty, geography, panel fit) | Volume that shifts the network toward providers payers do not need is negative value. |
| Guardrail | Provider CSAT / NPS during onboarding, and 90-day retention | Self-serve must not mean abandoned. Retention is the honest test. |

The metric line to deliver deliberately

“I’d resist making *number of providers onboarded* the primary metric. It goes up if we lower the bar, and it goes up if ops just works harder — neither of which is what this project is for. **Percentage completing with zero rep touches** only moves if the software actually did the job, and paired with a credentialing-rejection guardrail it can’t be gamed by shoving junk through.”

#### 5\. Users & jobs to be done

| Persona | Job they’re hiring us for | What they need from onboarding |
| --- | --- | --- |
| The cash-pay convertEstablished private-pay practice, never billed insurance | “Fill my remaining slots without becoming a billing clerk” | Reassurance and plain language. Does not know what CAQH is. Needs to be told exactly what to gather, once. |
| The multi-platform therapistAlready on Alma or Grow Therapy | “Add a second referral source with minimal setup cost” | Speed and zero redundant data entry. Has all documents ready. Will abandon a 40-minute form. |
| The new graduateRecently licensed, building a caseload | “Get me clients and get me paid” | Guidance through credentialing they have never done, plus honest expectation-setting on timelines. |
| Credentialing ops (internal) | “Give me clean, complete, pre-verified applications” | Exception queue with context, not a firehose. Confidence scores and provenance on every auto-verified field. |
| Sales rep (internal) | “Let me spend my day on the providers who need me” | Routing that surfaces stuck or high-value applicants; visibility into self-serve progress from Salesforce. |

#### 6\. Solution & user stories

The experience in one line: **a resumable, progressively-disclosed application that verifies what it can automatically, tells the provider exactly what is missing, and never makes them wonder what happens next.**

```
┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
  │  1. QUALIFY  │──▶│  2. PROFILE  │──▶│  3. VERIFY   │──▶│  4. ENROLL   │
  │  60 seconds  │   │   ~5 min     │   │  automatic   │   │  ops + auto  │
  ├──────────────┤   ├──────────────┤   ├──────────────┤   ├──────────────┤
  │ State        │   │ Identity     │   │ NPI lookup   │   │ Payer panel  │
  │ Licensure    │   │ License #    │   │ License PSV  │   │ selection    │
  │ Specialty    │   │ CAQH / NPI   │   │ Exclusion    │   │ Enrollment   │
  │ ─────────    │   │ Malpractice  │   │  lists       │   │ submission   │
  │ Instant      │   │ W-9 / bank   │   │ Doc parse    │   │ Status       │
  │ eligibility  │   │ Practice     │   │  + validate  │   │  tracking    │
  │ + expected   │   │  details     │   │ ───────────  │   │ ───────────  │
  │ timeline     │   │ ──────────   │   │ Confidence   │   │ HUMAN        │
  └──────────────┘   │ Save &       │   │  scored →    │   │ APPROVES     │
                     │  resume      │   │ auto-pass or │   └──────┬───────┘
                     └──────────────┘   │ exception Q  │          │
                                        └──────────────┘          ▼
                                                          ┌──────────────┐
                                                          │ 5. ACTIVATE  │
                                                          │ Profile live │
                                                          │ Calendar set │
                                                          │ First booking│
                                                          └──────────────┘
```

##### Stage 1 — Qualify (the highest-leverage screen in the product)

-   “As a therapist, I answer 4–5 questions and immediately learn whether Headway can panel me in my state, and roughly how long it will take.”
-   This is where you *disqualify early and kindly*. Telling someone in 60 seconds that their state panel is closed is better product *and* cheaper than a rep discovering it in week three.
-   It is also the honest expectation-setting moment: give a real range, not a marketing number.

##### Stage 2 — Profile

-   “As a therapist, I can start on my phone, stop, and resume on my laptop without losing anything.” Save-on-every-field, magic-link resume, no account-creation wall before value is shown.
-   “As a therapist, if I have a CAQH profile, Headway pulls what it can instead of asking me to retype it.”
-   “As a therapist, I upload a photo of my license and the system reads it rather than making me type the number.”
-   Progressive disclosure: ask for banking details after approval, not before. Every field asked before the provider is committed is a drop-off risk.

##### Stage 3 — Verify (where the AI lives)

-   “As credentialing ops, I receive applications where NPI, license status, and exclusion-list checks are already run, each field carrying a confidence score and a link to its source.”
-   “As credentialing ops, anything below confidence threshold lands in an exception queue with the specific discrepancy highlighted — not the whole application re-presented for re-review.”
-   **Design rule: the AI drafts and verifies, the human decides.** Confidence-thresholded auto-pass on objective machine-checkable facts; everything subjective or ambiguous goes to a person.

##### Stage 4–5 — Enroll & Activate

-   “As a therapist, I see a live status page — what stage I’m in, what’s blocking, what I need to do next — without emailing anyone.” This single feature kills a large share of inbound support volume.
-   “As a therapist, the moment I’m approved I’m walked into setting availability, because an activated provider with an empty calendar is a churned provider.”
-   **Activation is defined as first booked session, not approval.** Say this explicitly — it reframes the whole funnel and it is the kind of definition a product leader remembers you for.

#### 7\. Technical approach & phasing

| Phase | Scope | What it proves | Rough shape |
| --- | --- | --- | --- |
| V0Instrument | No new provider-facing product. Instrument the existing funnel end-to-end: stage events, time-in-stage, rep-hours, drop-off reason codes. | That we know where the time actually goes. Every later decision depends on this. | ~3–4 weeks |
| V1Narrow self-serve | One segment (e.g. independently-licensed therapists in the 3–5 highest-volume states with open panels). Full qualify→profile→submit flow, automated NPI/license/exclusion verification, ops exception queue, provider status page. | That a real provider can complete onboarding with zero rep touches without increasing credentialing rejection rate. | ~1 quarter |
| V2Widen & deepen | More states and licensure types; CAQH ingestion; document parsing; smart routing of edge cases to assisted flow; Salesforce becomes a downstream consumer rather than the source. | That the model generalizes and that ops capacity per provider is genuinely falling. | ~2 quarters |
| V3Agentic | Agents that chase missing documents, pre-fill payer enrollment packets, and monitor license/expiration renewals continuously. | That onboarding becomes a continuously-maintained state rather than a one-time event. | Ongoing |

Why V0 is the answer that impresses

Most candidates jump straight to building the form. Proposing a three-week instrumentation phase first says: *“I’ve been wrong before about where the time goes, and I’d rather find out cheaply.”* Then add the sharp version: **“if instrumentation shows most of the elapsed time is payer-side enrollment latency rather than our collection process, then a beautiful self-serve form barely moves time-to-first-session — and we should be building the pre-verification and payer-submission pipeline instead. I don’t want to build the wrong thing beautifully.”** That single sentence is the highest-scoring thing you can say in this interview.

#### 8\. Risks, dependencies, open questions

| Risk | Mitigation |
| --- | --- |
| Self-serve floods ops with low-quality applications | Guardrail metric on rejection/rework rate with an explicit rollback trigger; strong front-door qualification; confidence-thresholded auto-verify. |
| Third-party verification sources are slow or flaky (state boards, CAQH, exclusion lists) | Async job architecture with retries and circuit breakers; never block the provider’s UI on a third-party call; degrade to manual queue rather than failing the application. |
| Salesforce divergence — two systems disagree about a provider | One-directional sync with a clearly-owned boundary: application state is ours, commercial relationship is theirs. No dual writes. |
| Sales feels displaced | Frame and instrument as capacity reallocation, not headcount reduction; involve RevOps in metric definition from week one. This is an org risk, and naming it shows political awareness. |
| Regulatory / compliance exposure in automating any part of credentialing | Human approval stays in the loop for the decision; full audit trail of who or what verified each field and when; legal and compliance review before V1 launch, not after. |
| We optimize a funnel that isn’t the constraint | V0 instrumentation before V1 build. Explicit kill criteria. |

**Open questions to hand back to the room:** What is our contractual or marketed commitment on credentialing turnaround? Which payer panels are actually open by state right now? What is provider retention at 90 and 180 days, and does it differ between rep-assisted and self-serve cohorts once we have both? Who owns the provider quality bar — is it defined anywhere, or is it in reps’ heads?

### Blank PRD Template — Practice With This

Time yourself: **25 minutes**, out loud, into a doc. Do it once Monday night and once Tuesday morning. Fluency, not memorization, is what survives contact with a live conversation.

```
# PRD: [Feature name]
Author: | Date: | Status: Draft

## 1. Problem
Who hurts, how much, and how do we know?
[ ] Quantified with a real number
[ ] Evidence named (or explicitly flagged as an assumption to validate)

## 2. Why now
What changed? Why is this the right quarter and not next year?

## 3. Goals / Non-goals
Goals:
  - ...
Non-goals (be specific and slightly uncomfortable):
  - ...

## 4. Success metrics
Primary:     _______________  Target: ____  by: ____
Supporting:  _______________ , _______________
Guardrails:  _______________ , _______________
Kill criteria: we stop or roll back if ____________

## 5. Users & jobs to be done
| Persona | Job | What they need | What they fear |

## 6. Solution & user stories
Experience in one sentence: ____________________
As a [persona], I can [action], so that [outcome].
  - ...
Requirements: must / should / won't

## 7. Technical approach & phasing
V0 (learn):  ______  proves: ______  ~__ weeks
V1 (narrow): ______  proves: ______  ~__ weeks
V2 (widen):  ______  proves: ______  ~__ weeks
Key architectural decisions & alternatives rejected:

## 8. Risks, dependencies, open questions
| Risk | Likelihood | Mitigation | Owner |
Open questions for the room:
```

### If They Hand You A PRD To Critique

Work this checklist in order, out loud. The order itself demonstrates judgment — you go for the frame before the detail.

1.  **Is the problem quantified?** A PRD that opens with a solution has already lost. Ask: what number is bad today?
2.  **Is the primary metric gameable?** Try to hit the target in a way that harms the business. If you can, the metric is wrong.
3.  **Are there guardrails and kill criteria?** If nothing could make us stop, we are not running an experiment, we are executing a wish.
4.  **Are non-goals present and real?** “Non-goal: world peace” doesn’t count. Good non-goals are things a reasonable person would have expected to be in scope.
5.  **Is the phasing sequenced by risk?** The riskiest assumption should be tested first and cheapest. If V1 is a six-month build before any learning, that’s the finding.
6.  **Who is missing?** Almost every onboarding PRD forgets the internal user — ops, support, sales. Naming them is an easy, high-value catch.
7.  **What’s the failure mode?** What does this look like when it breaks at 2am, and who gets paged?
8.  **What’s the migration/rollout path?** Feature flag? Cohort? Shadow mode? Reversible?

> **Tip:** Critique etiquette that keeps you likeable
>
> Lead with what is *good and specific* (“the segmentation into licensure types is the right cut — it’s the thing that determines verification path”), then frame gaps as questions rather than verdicts (“what would make us roll this back?” beats “there are no kill criteria”). You are auditioning as a peer to this person for years, not winning an argument in 45 minutes.

### Traps Specific To Engineering Leaders In Product Jams

| Trap | What it sounds like | Do this instead |
| --- | --- | --- |
| Architecting too early | “We’d put Kafka between the verification service and…” | “Technically this is an async workflow with unreliable third parties — happy to go deep on the design tomorrow with Urmila. For the PRD, what matters is that verification is asynchronous, so the UX has to be status-driven rather than blocking.” |
| Feasibility as a veto | “That’s not realistic this quarter.” | “The full version is a quarter. Here’s the two-week version that tests the same assumption — would that answer your question?” |
| Solving instead of framing | Jumping to the form design in minute two | Spend minutes 1–5 on problem and metric. You can always speed up later; you cannot un-skip the frame. |
| Not writing anything down | Purely verbal answers for 45 minutes | Ask to share a doc and type headings as you go. Visible structure reads as clarity. |
| Forgetting the internal user | PRD covers only the provider | Credentialing ops and sales reps are users with their own success metrics. Name them. |
| No opinion | “It depends on what you want to prioritize.” | Have a recommendation, state it, then state what would change your mind. “I’d start with V0 instrumentation. If you told me leadership has already committed to a launch date, I’d run instrumentation in parallel with a narrow V1 instead.” |

### Practice Prompts

Give yourself 10 minutes each, out loud:

1.  Write the PRD skeleton for **“provider status page”** — the smallest thing that reduces support volume. What’s the primary metric?
2.  Severin says: *“Leadership wants 20,000 providers next quarter instead of 10,000. What do you build?”* (Trap: the answer is not “a faster form” until you know where the bottleneck is. But you should still commit to a plan.)
3.  Severin says: *“Why not just hire 20 more ops people? It’s cheaper than a quarter of engineering.”* Argue both sides honestly, then take a position.
4.  Critique this metric: *“Success = 50% reduction in average onboarding time.”* (At least four problems: average vs p90, whose time, gameable by cherry-picking easy providers, no guardrail on quality.)

Model answer to prompt 3 — “why not just hire more ops people?”

“Honestly, for the next two quarters, hiring is probably the faster lever, and I wouldn’t pretend otherwise — a rep is productive in weeks and a platform isn’t. So I’d likely do both.

The reason I wouldn’t *only* hire is that headcount buys throughput but not the three things we actually need. It doesn’t reduce variance — humans onboard inconsistently and quality drifts as you scale the team. It doesn’t produce data — a manual process generates almost no structured signal about why providers drop off, so we stay blind. And it doesn’t compound — the twentieth rep costs the same as the first, whereas the verification pipeline gets cheaper per provider forever.

The way I’d frame the decision: if we believe provider adds need to grow 3–5x over three years, linear ops scaling puts us at a headcount number the business won’t accept, and we’d be starting the platform work then with less data than we have now. So: hire for this quarter’s number, build for next year’s, and make the ops team the design partner rather than the thing being replaced.”

**Q: What should the primary success metric be for self-serve provider onboarding?**

-   Total number of providers onboarded per quarter
-   Percentage of activated providers who complete onboarding with zero rep touches **(correct)**
-   Average time to complete the application form
-   Number of applications started

*Explanation: Total providers onboarded goes up if ops simply works harder or if the quality bar drops — it does not measure whether the funnel became software. Zero-rep-touch completion only moves when the product actually works, and paired with a credentialing-rejection guardrail it cannot be gamed by pushing bad applications through.*

**Q: Why propose a V0 instrumentation phase before building the self-serve flow?**

-   To delay the project
-   Because if most elapsed time is payer-side enrollment latency rather than data collection, a beautiful form barely moves time-to-first-session **(correct)**
-   Because instrumentation is easier than product work
-   Because PRDs require four phases

*Explanation: Three weeks of instrumentation is cheap insurance against a quarter of building the wrong thing beautifully. It also converts the whole discussion from opinion to data, and it demonstrates the kind of intellectual honesty that senior product partners look for.*

**Q: Which non-goal is the most important one to state explicitly in V1?**

-   We will not support dark mode
-   We will not automate the credentialing decision itself — software gathers and verifies, a qualified human approves **(correct)**
-   We will not build a mobile app
-   We will not localise the product

*Explanation: It is a regulatory and trust boundary, not a scoping convenience. Saying it out loud shows you understand that in healthcare the interesting constraint is usually compliance, and it sets up the human-in-the-loop architecture that the Tezi acquisition already points toward.*

**Q: An engineering leader in a PRD jam is asked for something that is clearly a quarter of work. Best response?**

-   Say it is not feasible this quarter
-   Agree and worry about it later
-   Name the full cost, then immediately offer a cheaper version that tests the same assumption **(correct)**
-   Redirect to the systems design interview

*Explanation: Feasibility used as a veto makes you the person product leaders route around. Feasibility used to generate cheaper options that test the same assumption makes you the person they plan with. Always pair the constraint with an alternative.*

-   **The 8 PRD headings** — 1 Problem, 2 Why now, 3 Goals & non-goals, 4 Success metrics, 5 Users & jobs, 6 Solution & user stories, 7 Technical approach & phasing, 8 Risks & open questions.
-   **Primary metric for self-serve onboarding** — % of activated providers completing with ZERO rep touches. Guardrails: credentialing rejection/rework rate, provider quality mix, 90-day retention.
-   **The V1 non-goal that matters most** — We do not automate the credentialing DECISION. AI gathers and verifies with confidence scores; a qualified human approves. Regulatory and trust boundary.
-   **Definition of activation** — First booked session — not approval. An approved provider with an empty calendar is a churned provider.
-   **The best single line in the jam** — ‘If instrumentation shows the elapsed time is payer-side enrollment latency, a beautiful self-serve form barely moves time-to-first-session. I don’t want to build the wrong thing beautifully.’
-   **Handling ‘that’s a quarter of work’** — Never veto. Name the cost, then offer the two-week version that tests the same assumption. Feasibility is a tool for generating options, not for saying no.

Wednesday, August 5, 2026 · 1:00–1:45 PM · 45 minutes

Dennis Zhao — Director of Product, Headway (previously product lead for Cash at Robinhood)

Behavioral interview on *results* and *growth mindset*. Expect metrics-forward questions and follow-ups that dig for what you personally did.

### Read The Interviewer

Someone who led a consumer fintech growth product brings a specific set of instincts to a behavioral interview. Calibrate to them:

-   **Numbers as native language.** “We improved things a lot” will be met with silence, then “by how much?”. Come with baseline → delta → timeframe for every story.
-   **Funnels, cohorts, and experiments.** Growth-product people think in conversion steps, retention curves, and what was actually A/B tested versus asserted. If you shipped something without measurement, say so plainly and say what you’d do differently.
-   **Speed and scrappiness.** Expect appreciation for “we got a crude version in front of users in two weeks” over “we designed it thoroughly for a quarter.”
-   **Regulated-environment fluency.** Fintech and healthtech share a shape: you cannot ship whatever you want, compliance is a real constraint, and the best people treat it as a design input rather than a blocker. Lean into any experience you have here.
-   **Attribution honesty.** Strong interviewers probe hard on “we” versus “I.” Be precise about your own contribution and generous about everyone else’s.

The reframe that makes your stories land at Headway

Whatever domain your stories come from, translate the outcome into **marketplace supply** terms. Headway’s growth is gated by provider supply. So a story about developer adoption, seller onboarding, partner integration, user activation, or content-creator growth is *structurally the same problem* — a supply-side funnel with verification friction. Say the analogy out loud: “the shape of that problem is what you have with providers — high-intent supply stuck behind a manual verification step.”

### Build Your Story Bank First

You need **six to eight** stories, each usable for multiple questions. Fill this table before Tuesday night. Write the numbers down — under pressure, unrehearsed numbers turn into “a significant improvement.”

| # | Story slot | Must contain | Also answers |
| --- | --- | --- | --- |
| 1 | Scaled a team (small → large) | Starting size, ending size, timeframe, how you kept quality, what broke | Org design, hiring, managing managers |
| 2 | Built something from zero in ambiguity | What was undefined, how you created clarity, first milestone you set | New team, 0→1, ambiguity |
| 3 | Moved a business metric | Baseline, target, actual, how you knew it was you | Results, prioritisation, data |
| 4 | Shipped under real constraints | What you cut, why, what it cost, what you protected | Limited resources, trade-offs |
| 5 | Something failed | Your decision that caused it, how you found out, what changed permanently | Growth mindset, failure, learning |
| 6 | Disagreed with a leader or peer | The position, how you argued, the outcome even if you lost | Influence, conflict, backbone |
| 7 | Grew a person | Where they started, what you did specifically, where they got to | People development, coaching, performance |
| 8 | Killed or reversed something | Sunk cost, the signal you acted on, how you handled the team | Judgment, intellectual honesty |

> **Warning:** A real warning about story 5
>
> “My weakness is I care too much” and disguised-success failures (“we launched three weeks late but it was great”) are the fastest way to fail a growth-mindset interview. The failure story must contain **a decision you made that was wrong**, **a cost someone actually paid**, and **a specific durable change in how you operate**. The change is the part being graded. If you cannot name the change, pick a different story.

### STAR — With The Two Adjustments Senior Candidates Need

Standard STAR (Situation, Task, Action, Result) is table stakes. Two modifications separate a manager’s answer from a leader’s:

**S** — Situation: *15 seconds.* Context and stakes only. Not org history.
**T** — Task: *15 seconds.* What *you specifically* were accountable for.
**A** — Action: *60–90 seconds.* 3–4 concrete moves, in order, with the reasoning behind each. This is 70% of the score
**R** — Result: *20 seconds.* Number, timeframe, and how you attributed it.
**+L** — Learning: *15 seconds.* What you do differently now, always.
**+S** — Scale-forward: *10 seconds.* “The version of that problem here would be…”

The **+L** is what the title of this interview is literally about — “growth mindset” is being measured by whether every story ends with evidence that you changed. The **+S** is what makes an interviewer picture you in the role rather than in your last job.

> **Tip:** Length discipline
>
> Target **two to two and a half minutes** per story. Under 60 seconds reads as thin; over three minutes and the interviewer stops being able to take notes. Practise with a timer — this is the single most improvable thing in the next 48 hours. End on the Result or Learning and then *stop talking*. Silence after a strong result is confident; filling it is not.

### The Questions, With Answer Frameworks

Tell me about a time you scaled a team significantly. How did you keep quality from degrading?

**Frame:** numbers first, then the three mechanisms. Growth interviewers want *systems*, not effort.

-   **Hiring bar as a system:** a written rubric, calibrated interviewers, and a specific example of a no-hire you defended when the team was desperate for bodies. That last detail is what proves the bar was real.
-   **Onboarding as a product:** ramp checklist, buddy, a first-week meaningful commit. Cite your actual time-to-first-PR if you have it.
-   **Managers before ICs:** what your span of control did to your calendar and how you fixed it.
-   **Honest cost:** name the velocity dip during heavy onboarding and how long it lasted. Claiming there wasn’t one is not credible.

**Scale-forward:** “Going 40 to 65 here is the same shape — roughly two hires a month sustained, and it means I’d be hiring leadership in the first quarter, not headcount volume.”

A brand-new team with no clear charter and no data. Where do you start?

**Frame:** a sequence, with a deadline attached to each step.

1.  **Go watch the work.** Sit with the humans doing the manual process for a week. Not a survey — observation.
2.  **Instrument before opining.** You cannot prioritise a funnel you cannot see.
3.  **Pick one number the team owns.** An outcome, not a queue. Ambiguity dies when a team knows what its number is.
4.  **Ship something small and visible in weeks, not quarters.** A new team needs a win to establish credibility with its partners.
5.  **Write the charter down and circulate it for disagreement.** The disagreement is the point — it surfaces the stakeholders you didn’t know you had.

**Scale-forward:** “That’s exactly what I’d do with the six-month-old Provider Growth team — and I’d expect the first surprise to be that the bottleneck isn’t where anyone thinks it is.”

Tell me about a result you’re proud of. How did you know it was because of you?

**Frame:** this is an attribution question wearing a results costume. Nail the counterfactual.

-   State baseline, intervention, result, and timeframe in one breath.
-   Then *immediately* address attribution: holdout group, staged rollout, a comparable segment that didn’t get the change, or a pre/post with seasonality accounted for.
-   If you genuinely can’t attribute it cleanly, **say so** and say what you’d instrument next time. With this interviewer, honest attribution uncertainty scores far better than a confident overclaim.

Tell me about a time you failed.

**Frame:** Decision → Cost → Detection → Durable change. Spend the most time on the last two.

-   **Own the decision** in the first sentence. “I decided X. It was wrong.” No context-laundering first.
-   **Name the cost** in real units: weeks lost, a person who left, a customer commitment missed, money.
-   **How you found out** — and be honest if someone else had to tell you. That is a more useful story, and it sets up a better learning.
-   **The durable change**: a specific mechanism you now always use. “I now write down the assumption that would make me wrong, and I put a date on when we’ll check it.”

You have half the resources you need. What do you do?

**Frame:** refuse the false choice of “work harder.” Show a prioritisation mechanism.

-   Rank by *expected value per engineer-week*, not by stakeholder volume.
-   **Say what you will stop doing**, explicitly, to whom, and when. The willingness to make the cut visible is the whole test.
-   Look for the leveraged path — buy instead of build, a manual concierge V0, a partnership, an existing internal system.
-   Renegotiate scope, never quality bars in a healthcare product. Be crisp about which is which.

**Scale-forward:** “Concretely here: if I had to choose between the self-serve funnel and portal depth in the same quarter, I’d instrument both and fund the one where the bottleneck actually is — and I’d tell the other team clearly that they’re not funded this quarter, rather than under-resourcing both.”

How do you decide what your team works on?

**Frame:** name your actual mechanism, not a framework you read about.

-   One company-level number the org is accountable to, decomposed into team-level input metrics.
-   A written, visible ranking that anyone can challenge — disagreement happens against the doc, not in your DMs.
-   A reserved percentage for reliability and platform health, defended when the roadmap gets hungry. Give the actual number you used.
-   A regular re-forecast cadence, because plans made in January are wrong by March and pretending otherwise costs trust.

Tell me about a time you changed your mind about something important.

**Frame:** this is the purest growth-mindset probe. The best version has three parts: what you believed and *why it was reasonable*, the specific evidence that moved you (a metric, a customer conversation, a failed launch), and what you did publicly afterwards — because changing your mind quietly doesn’t teach the org anything. Bonus points if you told the team you had been wrong.

How do you handle an underperformer?

**Frame:** clarity → support → decision, on a timeline, without cruelty or avoidance.

-   Diagnose first: is it skill, will, role fit, or context? The remedies are completely different and most managers skip this.
-   Make expectations unambiguous and written. Most “underperformance” is unstated expectations.
-   Give real support with a real timebox.
-   **Then decide.** The most common failure of engineering leaders is waiting too long — which is unfair to the person and to the team. If you have a story where you waited too long and learned, that is a strong answer for this *and* for the failure question.

Why Headway? Why this role?

**Frame:** three beats, 60 seconds, no flattery.

1.  **The problem is real and specific to you** — the access gap is not abstract; a 10x out-of-network disparity is a system failing on purpose, and the fix is infrastructure, which is what you build.
2.  **The role is unusually well-shaped** — a mature 35-person product org *and* a six-month-old 0→1 team under one leader is a rare combination, and running both modes at once is the work you want.
3.  **The timing** — manual onboarding at 10K/quarter is exactly the kind of constraint that becomes a step-change when it’s solved, and the company has already signalled the bet with the Tezi acquisition.

### Practice Protocol For Tuesday Night

1.  Write all eight story slots with real numbers. **30 minutes.**
2.  Record yourself telling stories 1, 3 and 5 on a phone. Play them back. Cut every story to 2:15. **30 minutes.**
3.  For each story, write one sentence of **+S scale-forward** connecting it to providers, supply, or funnels. **15 minutes.**
4.  Have someone ask you “and what did *you* do?” three times in a row on the same story. It is the most common senior-interview follow-up and it should feel comfortable, not defensive.

**Q: In a senior STAR answer, which section should take the most time?**

-   Situation — full context is essential
-   Task — establishing scope
-   Action — the concrete moves you made and why, roughly 60 to 90 seconds **(correct)**
-   Result — the numbers are what matter

*Explanation: Action is roughly 70% of the score. Situation and Task should be about 15 seconds each; Result 20 seconds. Long setups are the most common way senior candidates run out of clock before reaching the part being evaluated.*

**Q: What must a failure story contain to satisfy a growth-mindset interview?**

-   A failure caused by someone else that you recovered
-   A decision you made that was wrong, a real cost someone paid, and a specific durable change in how you now operate **(correct)**
-   A minor mistake with no consequences
-   A project that succeeded despite being late

*Explanation: The durable change is the part actually being graded. A failure with no owned decision, no real cost, or no permanent change reads as evasion — and disguised-success stories are the fastest way to fail this interview.*

**Q: Dennis Zhao led a consumer fintech growth product. What should you emphasise?**

-   Deep technical architecture detail
-   Baseline-to-delta numbers with timeframes, funnel and cohort thinking, honest attribution, and speed to a crude first version **(correct)**
-   Length and thoroughness of your answers
-   How many people reported to you

*Explanation: Growth-product leaders think in conversion steps, retention curves and experiments. 'We improved things' invites 'by how much?'. And honest attribution uncertainty scores better with this audience than a confident overclaim.*

**Q: What is the '+S scale-forward' addition to STAR?**

-   A summary of the story
-   A closing sentence connecting the story to the version of that problem at Headway **(correct)**
-   A second story on the same theme
-   Stating your salary expectation

*Explanation: One sentence — 'the version of that problem here would be...' — makes the interviewer picture you in this role rather than in your last one. It costs ten seconds and changes how the whole story is remembered.*

-   **STAR+L+S** — Situation 15s, Task 15s, Action 60-90s (70% of the score), Result 20s, Learning 15s, Scale-forward 10s. Total target: 2:00-2:15.
-   **The 8 story slots** — 1 Scaled a team. 2 Zero-to-one in ambiguity. 3 Moved a business metric. 4 Shipped under constraints. 5 Failed. 6 Disagreed with a leader. 7 Grew a person. 8 Killed something.
-   **Failure story test** — Owned wrong decision + real cost someone paid + how you found out + specific durable change. If you cannot name the durable change, pick another story.
-   **Attribution answer** — Baseline, intervention, result, timeframe — then immediately: holdout, staged rollout, comparable untreated segment, or honest 'we could not cleanly attribute, here is what I would instrument now.'
-   **Half the resources** — Rank by expected value per engineer-week. Say explicitly what you will STOP. Look for the leveraged path. Renegotiate scope, never quality bars in healthcare.
-   **Why Headway, 60 seconds** — 1) 10x out-of-network disparity is a fixable infrastructure failure. 2) A mature 35-person org plus a 0-to-1 team under one leader is a rare, well-shaped role. 3) Manual onboarding at 10K/quarter is a step-change waiting to happen, and Tezi shows they have already made the bet.

Wednesday, August 5, 2026 · 2:00–3:00 PM · 60 minutes

Urmila Nadkarni — Engineering Manager, Headway

A full hour, run by an engineer. This is where technical credibility is either established or lost — and a Head of Engineering who cannot hold a design conversation will not be trusted by 40 engineers.

### What A Leadership Systems Design Interview Is Actually Grading

It is *not* the same interview a senior IC gets. Nobody expects you to derive a consensus protocol. What an EM interviewing a prospective Head of Engineering is checking:

| They’re checking | What it looks like when you do it well |
| --- | --- |
| Can you scope? | You spend the first 8 minutes on requirements and constraints and you write them down. |
| Do you reason in trade-offs? | Every choice comes with the alternative you rejected and why. “Postgres, not a queue-first design, because…” |
| Do you know where the hard part is? | You spend your time on the genuinely hard subsystem, not on drawing a load balancer. |
| Do you think about failure? | You bring up what happens when the third party is down before being asked. |
| Do you think about operations? | Who gets paged, what the dashboard shows, how you roll back, what the migration looks like. |
| Would engineers respect you? | You’re specific, you say “I don’t know” cleanly, and you engage with their pushback instead of defending. |
| Do you connect design to org? | “This boundary is also a team boundary — I’d have one team own the verification pipeline end-to-end including its on-call.” This is your edge over an IC candidate |

### The Six-Step Frame — Use It Every Time

**1\. Clarify & scope** (5–8 min) — users, scale, latency, consistency, compliance, what’s out of scope. Write it on the board.
**2\. Define the interface** (3 min) — the handful of API calls or events that matter. This forces concreteness.
**3\. Data model** (5–8 min) — the entities and their lifecycle. In healthcare, also: where does PHI live?
**4\. Happy-path architecture** (10 min) — the boxes. Keep it boring and correct.
**5\. Go deep on the hard part** (15–20 min) — ask which part they want to explore; have an opinion if they don’t.
**6\. Failure, scale, ops, migration** (10 min) — and then: *what would I build first, and how would I staff it?*

Two sentences to open with, every time

“Let me start by writing down what I think we’re optimising for, and you tell me if I’ve got the wrong constraint.” …and later… “There are two or three genuinely hard parts here — which one would be most useful to go deep on? If it’s up to me, I’d pick the verification pipeline, because that’s where correctness, third-party unreliability and compliance all intersect.”

### Ground Yourself In Their Actual Stack

From Headway’s own public job postings (2025–2026). Referencing this naturally is a credibility multiplier — it says you did homework and it lets you design *in their idiom* rather than in the abstract:

| Languages | Python 3, TypeScript |
| --- | --- |
| Backend | FastAPI, SQLAlchemy |
| Frontend | React, Remix, Next.js |
| Datastores | Postgres, Redis |
| Infrastructure | AWS — ECS / Fargate, S3 |
| Data / streaming | Spark, Kafka |
| Observability | Datadog, PagerDuty, Sentry |

Use it like this “I’d put this in a FastAPI service backed by Postgres rather than reaching for anything exotic — you already run that stack and the operational cost of a new datastore usually exceeds the benefit at this scale.”

### Design 1 — Self-Serve Provider Onboarding & Credentialing

Most likely questionDirectly the jobPrepare this one cold

#### Step 1 — Requirements you should state before designing

-   **Functional:** a provider applies without human help; documents are collected; credentials are verified against primary sources; payer enrollment is submitted; a human approves; the provider goes live and can be booked.
-   **Scale:** ~110 applications/business day today, design for 10x. This is *low throughput and high complexity* — say that explicitly, because it means the design is about correctness and workflow, not QPS.
-   **Latency:** the UI must be instant; verification is *minutes to days* and inherently asynchronous. Never block a form submit on a state licensing board.
-   **Consistency:** strong within our own application state; eventual with Salesforce and with payers.
-   **Compliance:** full audit trail — who or what verified which field, from which source, at what time. Document retention. PII and (later) PHI boundaries. Human approval is mandatory.
-   **Out of scope:** patient-side matching, claims, the EHR itself.

#### Step 2 — The core insight: this is a long-running workflow, not a CRUD app

An application lives for days to weeks, spans many external systems that are slow and unreliable, must survive process restarts and deploys, and must be resumable and auditable. Model it as an explicit **state machine with durable execution**, not as a set of nullable columns on a `providers` table.

```
DRAFT ──▶ SUBMITTED ──▶ VERIFYING ──┬──▶ AUTO_PASSED ──▶ PENDING_APPROVAL
    ▲            │                     │                          │
    │            │                     └──▶ EXCEPTION ──▶ (ops)────┘
    └── resume ──┘                                │                │
                                                  ▼                ▼
                                            INFO_REQUESTED     APPROVED
                                                  │                │
                                                  └────────────────┤
                                                                   ▼
                                                            ENROLLING (payer)
                                                                   │
                                                                   ▼
                                                              ACTIVE ──▶ first
                                                                 │       session
                                                                 ▼
                                                     (continuous re-verification:
                                                      license expiry, exclusions)

  REJECTED / WITHDRAWN are terminal from most states.
```

> **Tip:** The detail that lands
>
> “I’d make ACTIVE a state we *keep re-verifying*, not an end state. Licenses expire, exclusion lists update, and a provider who quietly falls out of good standing is a compliance incident and a claims-denial source. So the same verification pipeline runs on a schedule against the active network, not just at onboarding.” Almost no candidate says this, and it’s the difference between designing a form and designing a credentialing system.

#### Step 3 — Architecture

```
┌─────────────────────────────────────────────────────────────────┐
  │  Provider-facing app  (Remix / Next.js)                         │
  │  qualify · profile · document upload · live status page         │
  └──────────────────────────────┬──────────────────────────────────┘
                                 │  REST
  ┌──────────────────────────────▼──────────────────────────────────┐
  │  Application Service  (FastAPI)                                  │
  │  • owns application state  • emits domain events                 │
  │  • idempotent command API  • no third-party calls inline         │
  └───┬──────────────────┬──────────────────────┬───────────────────┘
      │                  │                      │
      │ Postgres         │ S3 (encrypted,       │ Kafka
      │ (SOT for         │  presigned uploads,  │ (domain events)
      │  application     │  versioned docs)     │
      │  state + audit)  │                      │
      │                  │                      ▼
      │                  │         ┌────────────────────────────────┐
      │                  │         │  Verification Orchestrator     │
      │                  │         │  durable workflow per applicant│
      │                  │         └───┬───────┬────────┬───────────┘
      │                  │             │       │        │
      │                  │      ┌──────▼─┐ ┌───▼────┐ ┌─▼─────────┐
      │                  │      │ NPI    │ │ State  │ │ Exclusion │
      │                  │      │ NPPES  │ │ license│ │ OIG/LEIE, │
      │                  │      │        │ │ boards │ │ SAM, state│
      │                  │      └────────┘ └────────┘ └───────────┘
      │                  │      ┌──────────┐ ┌──────────────┐
      │                  └─────▶│ Document │ │ CAQH profile │
      │                         │ extract  │ │ ingestion    │
      │                         │ (AI/OCR) │ └──────────────┘
      │                         └──────────┘
      ▼                                    │
  ┌────────────────────┐                   ▼
  │ Ops Console        │◀──── exception queue (scored, deduped)
  │ review · approve   │
  │ request info       │─────▶ APPROVED ──▶ Payer Enrollment Service
  └────────────────────┘                       │  (packet generation,
                                               │   submission, status
  ┌────────────────────┐                       │   polling per payer)
  │ Salesforce sync    │◀── one-way, event-    ▼
  │ (commercial SOT)   │    driven          ACTIVE provider
  └────────────────────┘
```

#### Step 4 — The five design decisions worth defending

| Decision | Why | Alternative rejected |
| --- | --- | --- |
| Durable workflow engine for verification (Temporal-style, or a hand-rolled Postgres-backed job state machine) | Multi-day workflows must survive deploys, retry per-step with independent backoff, and be inspectable when one provider is stuck. | Celery/SQS fire-and-forget: you lose the ability to answer “why is this provider stuck” without log archaeology — and that question gets asked daily. |
| Never call a third party inline with a user request | State boards go down, rate-limit, and change formats without notice. A synchronous call turns their outage into your outage. | Synchronous verify-on-submit: simpler, but the p99 becomes unbounded and providers see errors that aren’t theirs. |
| Confidence-scored auto-pass with a human decision gate | Objective machine-checkable facts (NPI matches, license active, no exclusion hit) auto-pass above threshold; everything else goes to a person. Compliance and trust both require the human. | Full automation: fails compliance and one bad approval is an existential risk. Full manual: that’s the status quo we’re replacing. |
| Outbox pattern + one-way sync to Salesforce | Application state is ours; commercial relationship is theirs. Transactional outbox guarantees we never emit an event for a transaction that rolled back. | Dual writes: guaranteed divergence, and the reconciliation job becomes someone’s permanent job. |
| Documents in S3, metadata in Postgres, never blobs in the DB | Presigned direct upload, server-side encryption with KMS, versioning, lifecycle policy for retention rules. | Storing files in Postgres: bloats backups, kills replication, and makes retention policy painful. |

#### Step 5 — Failure modes (bring these up unprompted)

-   **A verification source is down for six hours.** Circuit-break, keep the workflow parked in a retrying state, surface “we’re waiting on the state board” to the provider (honest status beats a spinner), and alert ops if the queue depth crosses a threshold. Never fail the application.
-   **A source returns a false negative.** Two providers with the same name; a license recently renewed but not yet reflected. Every automated rejection must be appealable into the exception queue with the raw source response attached. *Design the appeal path, not just the happy path.*
-   **Duplicate submissions.** Idempotency keys on every command; unique constraint on (NPI, state) at the application level so a provider who applies twice is merged, not duplicated.
-   **Partial failure mid-workflow.** Each step is individually idempotent and independently retryable. Never write a workflow step that isn’t safe to run twice.
-   **Ops queue floods.** Queue depth and age-of-oldest-item are first-class SLOs with paging thresholds — the human queue is part of the system, so it gets monitored like part of the system.
-   **Payer enrollment silently stalls.** Poll status per payer, alert on time-in-state exceeding the payer’s own norm, and expose it on the provider’s status page.

#### Step 6 — The Salesforce migration, done properly

1.  **Shadow.** New service consumes lead events and builds its own application state; Salesforce still drives. Compare continuously, alert on divergence. No user impact.
2.  **Read-switch.** The provider-facing status page reads from the new service. Still no write path change.
3.  **Write-switch by cohort.** New self-serve applicants write to the new service first, syncing outward to Salesforce. Rep-assisted flow unchanged.
4.  **Backfill and cut over** per segment, with an explicit rollback: flip the cohort flag back.
5.  **Salesforce becomes a read-model** for the commercial relationship. Nobody has to lose their tooling — which is what makes this politically survivable.

Connect design to org — your differentiator

“These boxes are also team boundaries. I’d have **Provider Activation** own the application service and provider-facing flow, and a **Credentialing Systems** team own the verification orchestrator, the third-party integrations, and the ops console — including its on-call, because the people who own the integrations should feel it when a state board changes its API. The Salesforce sync is a contract between us and RevOps, so I’d write it down as an interface with a named owner on both sides rather than letting it be tribal knowledge.”

### Design 2 — The Provider Portal

Lower probability as a standalone question, but very likely as a follow-up. The framing that matters: **the portal is a clinician’s system of record, so its non-functional requirements are closer to a bank than a consumer app.**

```
┌──────────────────────────────────────────────────────────┐
  │  Provider Portal SPA  (React / Remix)                     │
  └───────────────────────────┬──────────────────────────────┘
                              │
  ┌───────────────────────────▼──────────────────────────────┐
  │  BFF / API gateway  ·  authN + authZ  ·  audit log tap    │
  └──┬────────┬────────┬────────┬────────┬────────┬──────────┘
     │        │        │        │        │        │
  ┌──▼──┐ ┌───▼───┐ ┌──▼───┐ ┌──▼───┐ ┌──▼────┐ ┌─▼──────┐
  │Prov-│ │Sched- │ │Clin- │ │Tele- │ │Billing│ │Notif-  │
  │ider │ │uling  │ │ical  │ │health│ │Claims │ │ication │
  │core │ │       │ │docs  │ │      │ │payouts│ │        │
  └──┬──┘ └───┬───┘ └──┬───┘ └──┬───┘ └──┬────┘ └─┬──────┘
     │        │        │        │        │        │
     └────────┴────────┴───┬────┴────────┴────────┘
                           │
              ┌────────────▼────────────┐   ┌──────────────────┐
              │ Postgres (per-service   │   │ Kafka: domain    │
              │ schemas) · Redis cache  │──▶│ events → Spark   │
              │ · S3 for documents      │   │ → analytics/eval │
              └─────────────────────────┘   └──────────────────┘
```

Points to make:

-   **A BFF, not direct service calls from the browser.** One place to enforce authorization, one place to tap the audit log, one place to shape payloads so the portal isn’t chatty.
-   **Authorization is the hard part, not authentication.** A provider may see only their own clients; a group-practice admin sees a subset; support staff see role-limited views; a Headway employee accessing PHI must be logged and justified. Model it as explicit resource-scoped permissions checked in one layer — scattering `if user.is_admin` across services is how HIPAA incidents happen.
-   **Audit logging is a product requirement.** Every PHI read and write, append-only, queryable, retained. Design it in from the start; retrofitting it is a year of work.
-   **Availability targets differ by surface.** A live telehealth session failing is a clinical event. A payouts dashboard being slow is an annoyance. Say that you’d set different SLOs and different paging policies per surface, rather than one blanket number.
-   **Scheduling deserves its own callout:** timezone and DST correctness (store UTC plus the originating IANA timezone, never a fixed offset), double-booking prevention via a uniqueness constraint at the database level rather than an application check, idempotent external calendar sync with conflict resolution, and reminder delivery as an at-least-once pipeline with dedupe.

### Design 3 — Telehealth / Video

The most important thing to demonstrate here is **knowing when not to build.**

Lead with the build-vs-buy position

“I would not build media infrastructure. WebRTC at quality is a specialist, multi-year investment — SFU operation, global TURN relays, codec and bandwidth adaptation, mobile network churn. I’d buy a HIPAA-eligible platform that will sign a BAA — the realistic candidates are LiveKit, Daily, Twilio Video or a Zoom/Amazon Chime SDK — and I’d spend my engineers on the *session experience*: the waiting room, consent capture, in-session clinical tooling, the transcription tap, reconnect behaviour, and the fallback path. That’s where the differentiation is, and it’s the part a vendor can’t do for us.”

```
PROVIDER                                             PATIENT
  browser/app                                        browser/app
      │                                                    │
      │  1. join session (JWT room token, short TTL)        │
      ├────────────────┐                    ┌───────────────┤
      │                ▼                    ▼               │
      │        ┌───────────────────────────────────┐        │
      │        │ Session Service (FastAPI)         │        │
      │        │ • room lifecycle & tokens         │        │
      │        │ • identity ↔ appointment binding  │        │
      │        │ • consent state (recording ON/OFF)│        │
      │        └───────────┬───────────────────────┘        │
      │                    │ provision room                 │
      │                    ▼                                │
      │      ┌──────────────────────────────┐               │
      └─────▶│  Vendor SFU  (HIPAA + BAA)   │◀──────────────┘
   media     │  media relay · TURN · adapt  │     media
             └───────────┬──────────────────┘
                         │ audio tap (only with consent)
                         ▼
             ┌──────────────────────────────┐
             │ Transcription / notes        │  ─── see Design 4
             │ pipeline                     │
             └──────────────────────────────┘

  Fallback ladder: video ▶ audio-only ▶ dial-in phone bridge.
  A session must never fail closed. Degrade, don't drop.
```

-   **Consent is a first-class state machine**, not a checkbox. Recording and transcription require documented consent, it can be withdrawn mid-session, and withdrawal must actually stop capture and delete what was captured. Two-party consent states raise the bar further. Bring this up before they ask.
-   **Quality telemetry is the product.** Per-session bitrate, packet loss, jitter, reconnect count, join-failure rate — sliced by provider so you can proactively reach out to the therapist whose home wifi is failing every session. That reframes an infrastructure metric as a retention lever, which is a very good thing to say to a marketplace company.
-   **Vendor risk is real.** Keep the vendor behind your own session abstraction so a second provider can be introduced; negotiate the BAA, data residency and retention terms explicitly.

### Design 4 — The AI Note Pipeline (Session → Insurance-Ready Note)

Highest-signal designDirectly ties to the Tezi betHighest-consequence failure mode in the product

```
┌───────────┐   consent    ┌──────────────────────────────────────┐
  │  Session  │─────gate────▶│  Capture: audio chunks → S3 (KMS)    │
  │  (video   │              │  short-lived, encrypted, tagged      │
  │   or in-  │              └──────────────┬───────────────────────┘
  │   person) │                             │
  └───────────┘                             ▼
                              ┌──────────────────────────────────────┐
                              │  ASR + diarization                   │
                              │  • speaker separation                │
                              │  • clinical vocabulary               │
                              │  • confidence per segment            │
                              └──────────────┬───────────────────────┘
                                             ▼
                              ┌──────────────────────────────────────┐
                              │  Structuring / summarization (LLM)   │
                              │  • template-constrained output       │
                              │    (SOAP / DAP / BIRP)               │
                              │  • CPT-code & medical-necessity      │
                              │    fields the payer requires         │
                              │  • every claim traceable to a        │
                              │    transcript span                   │
                              └──────────────┬───────────────────────┘
                                             ▼
                              ┌──────────────────────────────────────┐
                              │  Guardrails & validators             │
                              │  • required-section completeness     │
                              │  • no un-grounded assertions         │
                              │  • risk-flag detection (SI/HI) →     │
                              │    escalate, never auto-summarize    │
                              └──────────────┬───────────────────────┘
                                             ▼
                              ┌──────────────────────────────────────┐
                              │  PROVIDER REVIEW & ATTESTATION       │
                              │  the clinician edits and signs.      │
                              │  Nothing enters the record unsigned. │
                              └──────────────┬───────────────────────┘
                                             ▼
                        ┌────────────────────┴───────────────────────┐
                        ▼                                            ▼
            ┌────────────────────┐                    ┌──────────────────────┐
            │ Clinical record    │                    │ Claim (837) with the │
            │ (immutable,        │                    │ note as documentation│
            │  versioned, audit) │                    └──────────────────────┘
            └────────────────────┘
                        │
                        ▼  edit-distance between draft and signed note
            ┌──────────────────────────────────────────────────────┐
            │  EVAL LOOP: golden datasets, clinician-labeled       │
            │  ground truth, LLM-as-judge + human review,          │
            │  regression gates in CI, online eval on prod traces  │
            └──────────────────────────────────────────────────────┘
```

#### The eight things to say about this pipeline

1.  **The clinician is the accountable author.** The AI produces a *draft*. Nothing enters the medical record without provider review and signature. This is a legal and clinical requirement, and it’s also the right product: it keeps trust intact.
2.  **Grounding beats fluency.** Every assertion in the note should be traceable to a transcript span. A note that reads beautifully and invents a symptom is catastrophic — it’s a false clinical record *and* insurance fraud exposure. Constrain generation to templates and validate against the source.
3.  **The killer metric is edit distance.** How much does the provider change before signing? It is a direct, honest, continuously-available measure of draft quality, per-provider and per-cohort, and it needs no labeling. Pair it with time-to-sign.
4.  **Insurance-readiness is a distinct, testable property.** Payer audits look for medical necessity, the elements matching the billed CPT code, and internal consistency. “Would this note survive an audit?” is a different question from “is this note accurate?” and needs its own validator and its own eval set. Given that a failed audit is a clawback, *this metric is literally revenue*.
5.  **Risk content is never handled by the summarizer alone.** Suicidal or homicidal ideation, abuse disclosure, mandated-reporting triggers — detect, flag prominently to the clinician, and never bury inside a paragraph. Design the escalation path explicitly.
6.  **PHI discipline throughout.** Encryption at rest and in transit; short retention on raw audio (a defined window, then delete) with the note as the durable artifact; BAAs with every model and ASR vendor; zero-retention and no-training terms contractually; a decision on regional processing. Say “I’d want the contract to say zero data retention and no training on our data, in writing” — it shows you’ve actually procured AI in a regulated setting.
7.  **Cost and latency are design constraints, not afterthoughts.** Cost per note against the value of the time saved; a tiered model strategy (a cheaper model for structuring, a stronger one for the hard sections or for low-confidence segments); async generation so the provider isn’t staring at a spinner after a session.
8.  **Evals gate deploys.** A golden set of clinician-labeled sessions; regression tests that block a release when quality drops; online evaluation sampled from production; a human review queue for low-confidence outputs. **This is exactly what the eval platform is for** — and it’s where you should connect back to the “Lenssmith/LangSmith” question from Module 2.

> **Warning:** If asked “how would you know if the AI notes are good?”
>
> Give a four-layer answer and say them in this order: **(1) Offline** — golden dataset of clinician-written notes, scored on completeness, factual grounding, and audit-readiness. **(2) Online implicit** — edit distance and time-to-sign, continuously, per cohort. **(3) Online explicit** — sampled human clinical review, plus a lightweight in-product signal from providers. **(4) Downstream** — claim acceptance and denial rate on AI-drafted notes versus manually-written ones, and audit outcomes. Then add: “Layer 4 is the one that ties model quality to revenue, and it’s the one most teams never build.”

### Design 5 — Scaling 80K → 500K Providers

The trap in this question is answering it as a pure infrastructure question. **6x on 80,000 providers is not a database problem.** Say that first, then show you can also do the infrastructure part.

| What breaks first | Why | What you do |
| --- | --- | --- |
| The human credentialing queue the real bottleneck | Verification and approval are human-rate-limited. 6x volume means 6x reviewers unless the auto-pass rate rises. | Raise confidence-based auto-pass coverage; make exceptions cheaper to resolve (better context, deduped, pre-diagnosed); measure ops-minutes-per-approval as a tracked engineering metric. |
| Third-party rate limits | State boards and registries were not built for your volume and will throttle you. | Aggressive caching with sane TTLs, batch endpoints where offered, per-source token-bucket rate limiting, negotiated bulk access, and scheduled re-verification spread evenly rather than in a monthly spike. |
| Payer enrollment | Often genuinely manual on the payer side. You cannot engineer their process away. | Model each payer’s pipeline separately with its own SLA and alerting; prioritise automation for the highest-volume payers; be honest that some remain manual. |
| Search & matching | Patient-side directory queries over 500K providers with insurance, geography, specialty, modality and availability filters. | Dedicated search index (OpenSearch or similar) fed from the event stream; precomputed availability; relevance as an owned, evaluated system rather than an ORM query. |
| Write-heavy tables | Appointments, notes and audit logs grow far faster than the provider count — 6x providers is much more than 6x sessions. | Partition by time, archive cold data to S3, read replicas for reporting, and get analytics off the primary and onto the Kafka→Spark path. |
| Notification volume | Reminders and nudges scale with sessions, and hitting provider-deliverability limits is a real failure mode. | Rate-limited, deduplicated, at-least-once delivery pipeline with per-recipient frequency caps. |
| The org | Coordination cost grows faster than headcount. | Clear service ownership, an interface contract per boundary, and teams that own their on-call. |

The line that shows seniority

“At 500K providers the interesting scaling problem isn’t Postgres — it’s that **every process with a human in it becomes the constraint**. So the engineering work is measuring human-minutes per provider at each stage and driving that toward zero for the common case, while making the exception path genuinely fast. And I’d want to know whether 500K providers is even the goal — if the network is already deep enough in a metro, the next marginal provider is worth less than the next marginal *utilised* provider. I’d push on whether the target should be supply *or* supply utilisation before optimising for the wrong one.”

### Cross-Cutting Themes To Weave In Naturally

-   **PHI boundaries.** Know which systems touch PHI, minimise that set, encrypt everywhere, BAA every vendor that touches it, and log every access.
-   **Audit trails as a design primitive.** Append-only, queryable, retained per policy. Cheap now, impossible later.
-   **Idempotency everywhere.** Healthcare integrations retry; duplicate claims and duplicate appointments are real incidents.
-   **Boring technology.** They run Postgres, Redis, Kafka, FastAPI on ECS. Adding a datastore has an operational cost that usually exceeds its benefit. Defend simplicity as a leadership stance, not a limitation.
-   **Say “I don’t know” well.** “I don’t know how your payer enrollment integrations work today — my assumption is a mix of APIs and portal automation and some genuinely manual submission. If it’s mostly manual, my design changes here and here.” That is a senior answer. Bluffing in front of an EM is unrecoverable.

**Q: Why model provider onboarding as a durable state machine rather than columns on a providers table?**

-   It is more fashionable
-   Because the workflow spans days, crosses many unreliable external systems, must survive deploys, and must be resumable and auditable per applicant **(correct)**
-   Because state machines are faster
-   Because Postgres cannot store nullable columns

*Explanation: A multi-day workflow with slow, flaky third parties needs per-step retry with independent backoff, must survive process restarts, and must answer 'why is THIS provider stuck?' without log archaeology. Nullable columns give you none of that, and the stuck-provider question gets asked every day.*

**Q: What is the strongest position on building telehealth video?**

-   Build the SFU in-house for full control
-   Buy a HIPAA-eligible platform that signs a BAA and spend engineers on the session experience, transcription tap and fallback ladder **(correct)**
-   Use a consumer video product
-   Avoid video entirely

*Explanation: WebRTC at quality — SFU operation, global TURN, codec and bandwidth adaptation, mobile network churn — is a specialist multi-year investment with no differentiation for Headway. The differentiation is the waiting room, consent capture, in-session clinical tooling and graceful degradation. Knowing when not to build is a leadership signal.*

**Q: What is the single most useful continuously-available quality metric for AI-drafted clinical notes?**

-   Model perplexity
-   Edit distance between the AI draft and the note the provider actually signs **(correct)**
-   Number of notes generated
-   Average note length

*Explanation: Edit distance is a direct, honest measure of draft quality, available on every note with no labeling effort, sliceable by provider and cohort. Pair it with time-to-sign, and with the downstream metric that actually ties to revenue: claim acceptance and audit outcomes on AI-drafted notes versus manual ones.*

**Q: Scaling from 80K to 500K providers — what breaks first?**

-   Postgres write throughput
-   The human credentialing and approval queue, because verification is human-rate-limited **(correct)**
-   The React frontend
-   DNS

*Explanation: 6x on 80,000 records is not a database problem. Every process with a human in it becomes the constraint. The engineering work is measuring human-minutes per provider per stage and driving the common case toward zero while making the exception path fast.*

**Q: Why is the transactional outbox pattern the right way to sync with Salesforce?**

-   It is faster than an API call
-   It guarantees you never emit an event for a database transaction that rolled back, avoiding the permanent divergence that dual writes create **(correct)**
-   Salesforce requires it
-   It removes the need for Kafka

*Explanation: Dual writes to two systems without a shared transaction guarantee divergence, and someone ends up owning a reconciliation job forever. Writing the event into the same transaction as the state change, then publishing from the outbox, makes the sync exactly as consistent as the source of truth.*

-   **Headway's stack** — Python 3 + FastAPI + SQLAlchemy; TypeScript with React, Remix, Next.js; Postgres + Redis; AWS ECS/Fargate + S3; Spark + Kafka; Datadog, PagerDuty, Sentry.
-   **Six-step design frame** — 1 Clarify & scope (write it down). 2 Interface. 3 Data model + where PHI lives. 4 Happy path. 5 Go deep on the hard part. 6 Failure, scale, ops, migration — then what you'd build first and how you'd staff it.
-   **Onboarding: the non-obvious insight** — ACTIVE is not an end state. Licenses expire and exclusion lists update, so the same verification pipeline runs on a schedule against the whole active network. Continuous re-verification, not one-time onboarding.
-   **Third-party integration rule** — Never call a state board, CAQH or an exclusion list inline with a user request. Async durable workflow, per-step retry, circuit breaker, honest status to the provider. Their outage must not become your outage.
-   **AI notes: the four eval layers** — 1 Offline golden dataset (clinician-labeled). 2 Online implicit: edit distance + time-to-sign. 3 Online explicit: sampled clinical review. 4 Downstream: claim acceptance, denial and audit outcomes on AI notes vs manual. Layer 4 ties model quality to revenue.
-   **The leadership differentiator in a design interview** — Map architectural boundaries onto team boundaries and on-call ownership. 'This service boundary is also a team boundary, and this sync is a written contract between us and RevOps.'

This module isn’t tied to one session — it is the material that shows up as the last question in *any* of the three, usually phrased as “what would you do in your first 90 days?” or “how would you prioritise?”. Have it ready in a 90-second version and a five-minute version.

### The 30/60/90

|  | Focus | What you actually do | What exists at the end |
| --- | --- | --- | --- |
| Days 1–30Learn | Understand the machine before touching it | 1:1 with every EM and every senior IC; skip-levels across all seven-ish teams.Sit with credentialing ops and sales reps for a full day each. Watch the manual process. This is the highest-information thing available to you.Talk to 10–15 providers — recently onboarded, long-tenured, and churned. The churned ones tell you the most.Read the last two quarters of incidents and the on-call load per team.Map the funnel end to end and find out what is not instrumented.Meet RevOps, Clinical, Compliance, and the payer-facing team — your dependencies live there. | A written current-state doc with a funnel map, an instrumentation gap list, and your top three hypotheses about the bottleneck — circulated for disagreement. |
| Days 31–60Focus | Commit to a small number of things, publicly | Ship the V0 instrumentation of the onboarding funnel. Now the argument is about data.Publish the team topology and each team’s owned outcome metric.Kill or defer at least one thing in flight, visibly, and say why. New leaders who only add are not trusted.Start the leadership hiring — EMs and senior ICs for the new Credentialing Systems and expanded Activation teams.Agree the AI-quality bar with Clinical and Compliance, in writing. | A one-page strategy: three bets, what each is worth, what you’re not doing. Owned metrics per team. An active hiring pipeline. |
| Days 61–90Deliver | Prove the model with something real | Narrow self-serve V1 in flight for one provider segment, with the guardrail metrics live.Provider status page shipped — small, fast, kills support volume, builds team confidence.Eval regression gates in CI for the notes pipeline.First cohort of hires onboarded; ramp plan working.A quarterly operating cadence people can predict: planning, review, incident review. | One shipped provider-visible win, one credible in-flight bet, a hiring machine running, and a team that knows what it owns. |

> **Tip:** The 90-second spoken version
>
> “First month I’d spend on the ground — with the credentialing ops team, with reps, with providers who churned — and on instrumenting the funnel, because right now I’d be guessing about where the time goes. Second month I’d commit publicly to three bets and, just as importantly, say what we’re not doing, and I’d start hiring leaders rather than headcount. Third month I want one provider-visible win shipped — probably the status page, because it’s small and it kills support volume — and narrow self-serve in flight with guardrails live. The thing I’d be careful about is reorganising in month one. A six-month-old team and a mature 35-person org both deserve to be understood before they’re restructured.”

### The Prioritisation Question: Three Bets, One Budget

You will be asked some version of “self-serve onboarding vs. portal depth vs. AI features — how do you choose?”. Do not pick one and defend it blindly. Show the reasoning, then commit.

| Bet | Case for | Case against | What decides it |
| --- | --- | --- | --- |
| Self-serve onboarding | Supply is the growth constraint; today it scales with headcount. Highest ceiling. | Longest time-to-value; the bottleneck may be payer-side, in which case the ROI collapses. | V0 instrumentation: what share of lead→first-session elapsed time is ours versus the payer’s? |
| Portal depth & reliability | Retention and utilisation. The moat is being the system of record, not the directory. Cheapest to move. | Doesn’t add supply; benefits are diffuse and harder to attribute to a number. | Provider churn curve and support-ticket taxonomy. If churn is concentrated at 30–90 days, this is the growth lever. |
| AI notes & summarization | Biggest per-provider time saving, strongest differentiation, already a public company bet. | Highest risk surface: a wrong note is a clinical and compliance event. Quality ceiling is hard to raise. | Current edit distance and claim-acceptance delta on AI notes. If it’s already good, invest in coverage; if not, invest in evals before features. |

The answer that actually wins

“I’d resist framing it as three competing bets, because they’re one funnel: **acquire → activate → retain → utilise**. If we onboard 10,000 providers a quarter and lose a large share by month six, self-serve onboarding is pouring water into a leaky bucket — and the retention work is the growth work. So the first question I’d answer with data is *where the biggest leak in that funnel is*. My prior, from the numbers I can see — roughly 6K net adds a quarter against ~10K onboarded — is that retention is being underweighted relative to acquisition. But I’d want the cohort curves before I bet a quarter of engineering on it.”

### Build vs. Buy — Have A Position On Each

| Decision | Position | Reasoning |
| --- | --- | --- |
| Video / telehealth infrastructure | Buy | No differentiation in media transport; huge specialist cost. Buy HIPAA-eligible with a BAA, build the session experience. |
| ASR / transcription | Buy, with an abstraction | Commodity and improving fast; wrong thing to own. But keep it behind your own interface so you can swap on quality and price, and demand zero-retention terms. |
| Note generation & clinical structuring | Build on top of a bought model | The model is bought; the templates, grounding constraints, validators, risk detection and eval loop are the product and must be owned. |
| Eval platform | Buy the plumbing, own the datasets | Tracing and experiment tooling is undifferentiated. The clinician-labeled golden datasets and the definition of “good note” are the real asset and can never be bought. |
| Credentialing verification | Hybrid | Buy data access where a vendor genuinely aggregates sources; own the orchestration, decisioning and exception workflow — that’s where the speed advantage lives. |
| EHR | Build — already decided | It is the retention moat and the claims pipeline. Buying it would hand your differentiation to a vendor. |
| CRM / Salesforce | Keep, but bound it | Excellent for sales; wrong for applicant experience. Split by domain rather than fighting a religious war with RevOps. |

### The Metrics Tree

If asked “what metrics would you own?”, don’t list metrics — draw a tree. It shows you understand which numbers are outputs and which are levers.

```
COMPLETED, PAID SESSIONS ON THE PLATFORM
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
  ACTIVE PROVIDERS   ×   UTILISATION      ×   SESSION → PAID
                          (sessions per         CONVERSION
        │                  active provider)          │
        │                        │                   │
   ┌────┴────┐         ┌─────────┴──────┐    ┌───────┴────────┐
   ▼         ▼         ▼                ▼    ▼                ▼
  NEW      RETAINED  Calendar fill   Referral  Claim        Note
  ADDS               rate            quality   acceptance   audit
   │         │       No-show rate    Match     rate         pass
   │         │       Reschedule      quality   Denial       rate
   │         │        friction                  reasons
   ▼         ▼
 Lead→       90/180-day
 activation  provider
 conversion  retention
   │         │
   ▼         ▼
 Zero-touch  Time-to-first
 completion  session (p50/p90)
 rate        Support tickets
             per provider
             Portal reliability
```

Two things to say about this tree:

-   “My org owns the left two branches almost entirely, and we *influence* the third — claim acceptance depends on note quality, which is our AI pipeline. That means my org’s work shows up directly in revenue quality, not just in provider satisfaction.”
-   “The metric I’d put on the wall is **time-to-first-session at p90**, because it’s the one number that is simultaneously the provider’s felt experience, a competitive surface, and a proxy for how much manual work is in the pipe.”

### The Vision Answer

Two-year vision, ~45 seconds

“In two years I’d want the answer to ‘how does a therapist join Headway?’ to be: they answer a few questions on their phone, we verify almost everything automatically in the background, a human reviews only the genuinely ambiguous cases, and they’re seeing patients in days rather than weeks — at a volume that doesn’t require a proportional ops team. And once they’re in, the portal is the thing they open every morning: their calendar is full, their notes are drafted and audit-clean before they finish their coffee, and they’ve stopped thinking about insurance entirely. That’s the real product — **a therapist who forgot that billing insurance used to be hard.** Everything my org would build ladders up to that.”

**Q: What is the strongest response to 'self-serve onboarding vs portal depth vs AI features — pick one'?**

-   Pick self-serve, it has the highest ceiling
-   Reframe them as one funnel — acquire, activate, retain, utilise — and say the first question is where the biggest leak is, then commit to a prior **(correct)**
-   Say all three are equally important
-   Defer to leadership

*Explanation: If ~10K providers are onboarded per quarter but net adds are closer to 6K, retention is the leak and acquisition work is pouring into a leaky bucket. Reframing shows systems thinking; still committing to a prior ('my prior is retention is underweighted, but I want the cohort curves') shows you can decide without data when you have to.*

**Q: Which is the right build-vs-buy split for AI notes?**

-   Build the model in-house for full control
-   Buy everything from a behavioural-health AI scribe vendor
-   Buy the model and ASR, build the templates, grounding constraints, validators, risk detection and eval loop **(correct)**
-   Avoid AI notes entirely

*Explanation: Foundation models and ASR are commodities improving faster than any in-house team could match — but keep them behind your own abstraction with zero-retention terms. The insurance-ready templates, factual grounding, risk-flag escalation and clinician-labeled eval datasets are the actual product and the actual moat.*

**Q: Why is 'time-to-first-session at p90' a better wall metric than the median?**

-   It is easier to compute
-   The tail is where churn lives — the providers who wait longest are the ones who leave, and the median hides them **(correct)**
-   p90 is always lower
-   Payers require it

*Explanation: A median that looks healthy can coexist with a long tail of providers waiting weeks, and those are precisely the ones who go to a competitor. Choosing a tail metric over an average signals that you have watched a funnel in production.*

Bring **four to five per session**, ask two or three, and let the conversation earn the rest. The best questions are the ones that could only come from someone who has already thought about the job.

> **Warning:** Rules
>
> Never ask something answerable from the careers page. Never ask a question that is really a statement about how clever you are. Ask each interviewer about *their* domain — product questions to Severin, growth and metrics to Dennis, engineering reality to Urmila. And **write down what they say** — visible note-taking reads as seriousness, and you’ll want the answers for the offer conversation.

### For Severin Kibby — Product (Tuesday)

1.  **“When you look at the provider funnel today, where do you personally believe the biggest drop-off is — and how confident are you in that belief?”** The second half is the good half. It tells you whether they have data or instinct, and it’s the exact input your V0 phase needs.
2.  “How does product and engineering decide together what goes on the roadmap here — who writes the PRD, and who gets to say no?”
3.  “Providers multi-tenant across Headway, Alma and Grow Therapy. What do you think actually makes a provider choose Headway as their primary — is it referral volume, payment reliability, or the software?”
4.  “How much of the roadmap is set by payer commitments versus provider demand? Where do those two conflict?”
5.  “What’s a product decision Headway got wrong in the last year, and what did the org take from it?”

### For Dennis Zhao — Results & Growth (Wednesday 1:00)

1.  **“What’s the delta between gross and net provider adds, and what does 90- and 180-day provider retention look like?”** Your single best question It shows you did the arithmetic on the public numbers and it goes straight at whether acquisition or retention is the real problem.
2.  “What’s the north-star metric for the Provider org, and has it changed in the last year?”
3.  “How does Headway run experiments in a regulated product — what can and can’t you A/B test when there’s PHI and clinical risk involved?” Ties directly to his fintech background.
4.  “Coming from Robinhood, what surprised you most about how growth works in healthcare versus consumer fintech?” Genuine, specific to him, and the answer will be useful to you.
5.  “What would make you say, twelve months from now, that this hire was a success? What’s the number?”

### For Urmila Nadkarni — Engineering (Wednesday 2:00)

1.  **“What’s the piece of the system everyone knows is a problem but nobody has had time to fix?”** Engineers love being asked this and the answer is genuinely valuable to you.
2.  “Tell me about the eval platform the teams are standardising on — is it built in-house or on top of something like LangSmith, and who owns the golden datasets?” *This is where you resolve the “Lenssmith” question without guessing.*
3.  “What does on-call look like across the Provider teams? What’s the page volume, and what’s the most common cause?”
4.  “How has the engineering culture changed since the Tezi team joined — how are people reacting to the AI push?”
5.  “What do you need from this role that the org hasn’t had? What’s been missing?”
6.  “How much of the provider-facing surface is still tightly coupled to Salesforce, and how painful is that day to day?”

### Universal Closers

-   “What’s the hardest thing about working here that you’d want a candidate to know before saying yes?”
-   “Is there anything about my background that gives you pause? I’d rather address it now than have it go unsaid.” High risk, high reward — only if the rapport is good
-   “What are the next steps, and is there anything I can send you in the meantime?”

> **Tip:** Follow up on the answers
>
> The single most underused technique: when they answer, respond with a real reaction, not “great, thanks.” “That’s interesting — it suggests the bottleneck is downstream of where I’d assumed. Does that change how you’d sequence the self-serve work?” That turns Q&A into a working conversation, which is the mode you want to be remembered in.

**Q: What is the single strongest question to ask Dennis Zhao?**

-   What is the company culture like?
-   What is the delta between gross and net provider adds, and what does 90 and 180 day provider retention look like? **(correct)**
-   How many engineers will I manage?
-   What is your favourite part of working here?

*Explanation: It proves you did arithmetic on the public trajectory (70K in March to ~80K in August is roughly 6K net per quarter against ~10K onboarded), and it goes directly at whether the real problem is acquisition or retention — which determines what the role should actually build first.*

### The Schedule

Tuesday, August 4 · 2:00–2:45 PM (45 min)

PRD Jam — Severin Kibby, Product leader (SF)

**Bring:** the 8-heading PRD skeleton in muscle memory, the self-serve onboarding PRD from Module 3, and the “first five minutes” clarifying script. **Ask to share a doc and type as you go.**

Wednesday, August 5 · 1:00–1:45 PM (45 min)

Results & Growth Mindset — Dennis Zhao, Director of Product (ex-Robinhood Cash)

**Bring:** eight STAR stories with real numbers, each at 2:15, each with a scale-forward sentence. Baseline → delta → timeframe, every time.

Wednesday, August 5 · 2:00–3:00 PM (60 min)

Systems Design — Urmila Nadkarni, Engineering Manager

**Bring:** the six-step frame, the onboarding state machine, the AI note pipeline, and the build-vs-buy positions. Ask which part to go deep on — and have an opinion if they leave it to you.

> **Warning:** Note the Wednesday back-to-back
>
> Dennis ends at 1:45 and Urmila starts at 2:00. **Fifteen minutes.** Stand up, drink water, and reset your head from storytelling mode to design mode — they are genuinely different registers and carrying behavioural-interview energy into a systems design makes you sound vague. Have the Module 5 six-step frame open on a second screen. Don’t schedule anything else on Wednesday afternoon.

### The Numbers Cheat Sheet

| Fact | Number | Confidence |
| --- | --- | --- |
| Founded | April 2019, NYC — Andrew Adams (CEO) + 3 co-founders | Public |
| Valuation / raised | $2.3B after $100M Series D (Spark Capital); ~$325M+ total | Public |
| Providers | 60K+ (Sep 2025) → 70K+ (Mar 2026) → ~80K (now) | First two public |
| Patients | 1M+, all 50 states + DC | Public |
| Appointments | 600K+/month (as of the Series D) | Public, dated |
| Engineering | ~120 total; Provider org ~40 → 60–70 | Public / recruiter |
| Onboarding volume | ~10K/quarter, manual ≈ 110/business day | Recruiter |
| Implied net adds | ~6K/quarter → a churn gap worth asking about | Your inference |
| Out-of-network gap | 18.2% (psychologists) vs 1.7% (medical specialists) | Public research |
| Reimbursement gap | Behavioural health ~21.8% below med/surg | Public research |
| EHR launch | Sept 9, 2025 — free, insurance-native, AI-assisted notes | Public |
| Tezi acquisition | Mar 31, 2026 — human-in-the-loop AI team; Raghavendra Prabhu → VP Eng | Public |
| Stack | Python/FastAPI/SQLAlchemy, TS/React/Remix/Next, Postgres, Redis, AWS ECS+S3, Spark, Kafka, Datadog | Public job posts |

### Your Six Anchor Ideas

If everything else falls out of your head, these six carry all three interviews. Each one is a complete thought you can say in fifteen seconds.

1.  **Supply is the constraint.** Demand for affordable in-network therapy is effectively unlimited; the bottleneck is therapists who will take insurance. Every credentialed provider is incremental revenue. That’s why this org exists.
2.  **Two jobs, one title.** Provider Growth is 0→1 with a six-month-old team; Provider Experience is 1→n with 35 engineers. Different cadences, different risk tolerances, different definitions of done — and I’d be explicit with both about which mode they’re in.
3.  **Instrument before you build.** If the elapsed time in onboarding is payer-side, a beautiful self-serve form barely moves time-to-first-session. Three weeks of instrumentation is cheap insurance against a wasted quarter.
4.  **AI drafts, humans decide.** In credentialing and in clinical notes alike: confidence-scored automation with a mandatory human gate. It’s the compliance answer, the trust answer, and the same bet Headway made when it bought the Tezi team.
5.  **Activation is the first booked session, not approval.** An approved provider with an empty calendar has already churned. Retention and acquisition are the same funnel.
6.  **The moat is depth, not directory.** Providers multi-tenant across Headway, Alma and Grow Therapy. Lock-in comes from being their practice system of record and from filling their calendar — both of which are engineering problems.

### Openers & Closers

“Tell me about yourself” — 60 seconds, three beats

**Now:** what you do today, at what scale, and the outcome you’re accountable for. **Arc:** the through-line of your career in one sentence — the kind of problem you’re repeatedly drawn to. **Why here:** the specific thing about this role that made you take the call. Then stop. Do not narrate your résumé chronologically; nobody has ever been hired for that.

Closing each session — 20 seconds

“This was genuinely fun — the thing that stuck with me is \[*specific thing they said*\]. I’m increasingly convinced the interesting problem here is \[*your read*\], and it’s the kind of problem I want to be working on. Thank you for the time.” Specific beats enthusiastic. Referencing something *they* said proves you were listening rather than performing.

### Logistics Checklist

-   Test the video link, camera, mic and screen-share **the day before**, not five minutes prior.
-   Second screen or printout: the six-step design frame, the eight PRD headings, and your story list with the numbers. Glancing at notes is fine; reading is not.
-   A blank doc open and ready to share for the PRD jam. Practise the share flow once.
-   Pen and paper for notes — visible note-taking during *their* answers reads as respect.
-   Water. Sixty minutes of systems design is a lot of talking.
-   Wednesday: nothing scheduled after 12:30 PM. Protect the block.
-   Names, spelled right, for thank-you notes: **Severin Kibby**, **Dennis Zhao**, **Urmila Nadkarni**.

### Afterwards

-   **Within an hour of each session**, write down what you were asked, what you said, what you wish you’d said, and anything they revealed about the org. Memory decays fast and this is your input for later rounds and the offer conversation.
-   **Thank-you notes within 24 hours**, each one different: reference something specific from that conversation and, ideally, add one sentence of value — a thought you had afterwards, or the cleaner version of an answer you fumbled. That last move is disproportionately effective.
-   If a question landed badly, address it in the note in one sentence and move on. Don’t re-litigate.

> **Tip:** The last thing
>
> You are interviewing them too. Three sessions with a product leader, a growth-product director and an engineering manager is a lot of surface area to learn whether the org is honest about its problems, whether product and engineering actually decide together, and whether the AI push is a thesis or a slogan. Ask like someone deciding, because you are. Candidates who behave like they have a choice interview better — and you do.

-   **Anchor 1** — Supply is the constraint. Demand for affordable in-network therapy is unlimited; therapists willing to take insurance are the bottleneck. Every credentialed provider is incremental revenue.
-   **Anchor 2** — Two jobs, one title. Provider Growth is 0-to-1 with a six-month-old team. Provider Experience is 1-to-n with 35 engineers. Different cadences, risk tolerances and definitions of done.
-   **Anchor 3** — Instrument before you build. If the elapsed time is payer-side, a beautiful self-serve form barely moves time-to-first-session.
-   **Anchor 4** — AI drafts, humans decide. Confidence-scored automation with a mandatory human gate — in credentialing and in clinical notes. Same bet Headway made buying Tezi.
-   **Anchor 5** — Activation is the first booked session, not approval. An approved provider with an empty calendar has already churned.
-   **Anchor 6** — The moat is depth, not directory. Providers multi-tenant. Lock-in comes from being the practice system of record and from filling the calendar.

Built for Zeesha Furniturewala · Headway interviews, August 4–5, 2026 · [All courses](index.html)