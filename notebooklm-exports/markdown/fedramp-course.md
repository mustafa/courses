# FedRAMP for SaaS Leaders — A Coursera Decision Guide

# FedRAMP for SaaS Leaders

The 2026 rules changed everything — new certification classes, machine-readable requirements, and a 3-month automation-first path that didn't exist two years ago. This is a decision guide for whether Coursera should pursue federal authorization, what it costs, and how to lead an engineering org through it.

Last updated: July 27, 2026 • ~3–4 hours • 14 Modules

Written for Mustafa Furniturewala · VP Engineering, Coursera

0 / 14 complete

[1Foundations — What FedRAMP Actually Is](#mod1) [2CR26 — The 2026 Overhaul](#mod2) [3FedRAMP 20x — The Fast Track](#mod3) [4The Rev5 Exit & Your Deadline Map](#mod4) [5Does Coursera Actually Need It?](#mod5) [6The Business Case — Market & Rivals](#mod6) [7Engineering Implications](#mod7) [8Cost & Timeline Estimation](#mod8) [9Org Readiness — Build vs Buy](#mod9) [10Continuous Monitoring](#mod10) [11CMMC — The Defense Adjacent Path](#mod11) [12FedRAMP vs SOC 2 / ISO / StateRAMP](#mod12) [13Coursera Readiness Checklist](#mod13) [14The Decision & 90-Day Plan](#mod14)

## Module ★: Executive Summary — Read This First

If you read nothing else, read this. Five paragraphs that contain the whole argument.

**1\. Coursera can already sell to the federal government — FedRAMP is a different lock.** Coursera's services sit on the GSA Multiple Award Schedule, which is a *procurement* vehicle: it makes buying easy. FedRAMP is a *security authorization*: it governs whether a federal agency may put its data into your cloud service. These get conflated constantly, including inside sales orgs. You have one and not the other, and which one you need depends entirely on what data crosses the boundary.

**2\. The trigger is federal data, not federal customers.** An agency buying seats so employees can take a Python course — Coursera storing only a name, a work email, and a completion record — is a defensible no-FedRAMP posture that many agencies accept today under a low-risk determination. The moment you do SSO against an agency identity provider, sync rosters from a government HR system, write completion data back into a federal system of record, or hold anything resembling CUI, you are processing federal information and the exemption evaporates. Module 5 gives you the five-rung ladder and where each Coursera product lands.

**3\. The economics changed in your favor this year, and the window is narrow.** The traditional Rev5 path was 12–36 months and $800K–$2M for the Moderate baseline, plus roughly $260K a year in continuous monitoring. FedRAMP 20x — the automation-first path built for exactly your kind of cloud-native SaaS — targets roughly three months and $100K–$300K. Its pipelines open to all qualifying providers in August 2026. Simultaneously, Rev5 stops accepting new applications on **June 11, 2027**. That is the arbitrage: for the next several quarters, the cheap path is the new path, and the expensive path is the one that's closing.

**4\. Your closest competitor already has it; the one you were evaluating does not.** Blackboard/Anthology holds a FedRAMP Moderate authorization — now carried forward as Class C — for its LMS on AWS GovCloud. Class Technologies has a FedRAMP-certified offering for government training deployed with Zoom for Government. Instructure's Canvas, by contrast, shows no evidence of holding its own FedRAMP certification; the federal Canvas story runs through Class as a wrapper. That is a genuine competitive opening and a genuine reason not to assume the field is already lost.

**5\. The real cost is not the audit — it's the permanent tax on engineering velocity.** The 3PAO invoice is the visible number. The invisible number is what continuous monitoring does to your release process: significant-change requests, 30-day patch SLAs on high vulnerabilities, monthly authenticated scans, evidence collection that must be machine-readable, and a boundary you cannot casually refactor. Budget for a permanent function, not a project. Module 10 is the one to make your staff engineers read.

The recommendation, stated plainly

Do not start a FedRAMP program on speculation. Do run a 90-day, ~$75K qualification sprint: scope a minimal Coursera for Government boundary, confirm or kill the agency-sponsor hypothesis with real pipeline, and run a KSI gap assessment against the 20x indicators. If the sponsor is real, go 20x Class C and go before June 2027. If the sponsor is not real, stay on GSA MAS with a no-federal-data posture and revisit in a year. Module 14 has the full plan, the budget, and the kill criteria.

## Module 1: Foundations — What FedRAMP Actually Is

Before you can decide whether to pursue it, you need a precise mental model of what FedRAMP is, what problem it solved, and — critically — what it is *not*.

### The origin story, in the shortest useful form

Three legal instruments stack up to create the thing you're evaluating:

-   **FISMA (2002, substantially amended 2014).** The Federal Information Security Modernization Act requires every federal agency to run an information security program and to authorize every information system it uses. That authorization is called an **ATO** — Authority to Operate — and it is granted by an agency official, the Authorizing Official (AO), who is personally accountable for accepting the residual risk.
-   **OMB's "Cloud First" policy (December 2010).** Federal CIO Vivek Kundra pushed agencies to adopt cloud by default. This immediately created a problem: FISMA required every agency to independently authorize every system, so twenty agencies buying the same SaaS product meant twenty independent, redundant, wildly inconsistent security assessments — each costing the vendor months and hundreds of thousands of dollars.
-   **The FedRAMP memo (December 2011), operational June 2012.** OMB established FedRAMP to solve exactly that redundancy with the principle that still defines the program: **"assess once, use many."** A cloud service provider undergoes one standardized assessment; the resulting package is reusable by any agency that wants to grant its own ATO on top of it.
-   **The FedRAMP Authorization Act (December 2022),** passed as part of the FY2023 NDAA, codified the program in statute rather than leaving it as policy. This matters more than it sounds: it gave FedRAMP a legal mandate for reciprocity — agencies are expected to reuse existing FedRAMP packages rather than demanding their own bespoke assessment — and it created the political cover for the aggressive modernization you're seeing in 2026.

The one sentence to remember

FedRAMP is a *standardized, reusable security assessment* for cloud services sold to the federal government. It does not itself grant permission to operate — an agency still issues the ATO. FedRAMP makes that ATO cheap and fast instead of expensive and slow.

### The three actors and what each one wants

| Actor | Who they are | What they actually want |
| --- | --- | --- |
| CSPYou | Cloud Service Provider — the company offering the Cloud Service Offering (CSO). In your case, some scoped version of Coursera. | To sell to agencies without re-running an assessment per customer. To not have compliance eat the roadmap. |
| 3PAOAssessor | Third Party Assessment Organization — an accredited independent auditor (A-LIGN, Schellman, Coalfire, Kratos, and peers). Accredited under the A2LA program. | To produce a defensible assessment. They are not your consultant and cannot both advise and assess the same scope. |
| Agency / PMOAuthorizer | The sponsoring federal agency's Authorizing Official, working with the FedRAMP Program Management Office (PMO). | To not be the person who signed the ATO on the system that got breached. This is the single most underrated fact in the whole process. |

### Agency authorization vs. the JAB — and what CR26 did to it

Historically there were two routes to the FedRAMP Marketplace:

-   **Agency ATO** — a single sponsoring agency assesses and authorizes you; other agencies then reuse the package. Faster, but you must *find a sponsoring agency*, which is a business-development problem masquerading as a compliance problem.
-   **JAB P-ATO** — the Joint Authorization Board (DoD, DHS, GSA) granted a Provisional ATO. Prestigious, government-wide, and a brutal queue: FedRAMP Connect admitted only a handful of CSPs per year.

The JAB has been retired. Under the modernized program, authorizations run through the FedRAMP PMO in coordination with agency sponsors, and the emphasis has moved decisively toward automated validation over board review. If you read older FedRAMP guidance that tells you to "apply to FedRAMP Connect," it is out of date.

### The Marketplace and why "assess once, use many" is a real moat

The **FedRAMP Marketplace** is the public, searchable registry of cloud service offerings that have achieved a FedRAMP designation. It is where a contracting officer at the Department of Labor goes when someone says "we want to use a learning platform." Three practical consequences:

1.  **Presence is discovery.** Being on the Marketplace means you appear in the set of options an agency considers. Absence means you frequently do not get considered at all, regardless of product quality.
2.  **Reuse compounds.** The first agency is expensive to land. Agencies two through twenty inherit the package. Your marginal cost per federal customer collapses, which is precisely why the moat is real — a competitor without certification cannot match your sales cycle at any price.
3.  **Status is visible.** The Marketplace distinguishes between designations — "In Process," "Ready," and full certification. A sales team can and will use a competitor's status against them, and vice versa.

> **Warning:** The trap that catches most SaaS companies
>
> FedRAMP is not a certificate you earn and hang on the wall. It is a *continuous* state. Monthly vulnerability scanning, monthly reporting, annual reassessment, and formal review of significant changes are permanent obligations. Companies routinely budget for the audit and forget to budget for the next ten years of continuous monitoring. That is the mistake that turns a compliance win into a velocity crisis.

### What FedRAMP is *not*

Four things people assume FedRAMP covers, but it doesn't

Not

**A procurement vehicle.** FedRAMP does not let anyone buy anything. GSA schedules, SEWP, CIO-SP, and similar contracts do that. Coursera is on the GSA MAS and has no FedRAMP certification — those facts are entirely consistent.

Not

**An ATO.** The agency still issues the ATO. FedRAMP supplies the reusable evidence package that makes issuing one tractable.

Not

**A guarantee of federal revenue.** Plenty of certified products sit on the Marketplace selling nothing. Certification removes a blocker; it does not create demand.

Not

**Applicable to state and local.** That's StateRAMP / TX-RAMP / StateRAMP-adjacent programs — related lineage, separate authorization. Relevant to Coursera for Campus at public universities. See Module 12.

Coursera lens

The most important thing in this module for you: the gap between *can sell to federal* and *can hold federal data*. Coursera is already in the first category. Every question in this course is really about whether the second category is worth entering, and if so, on which product surface. Keep that distinction sharp in every exec conversation — the two get merged constantly, and merging them is how companies end up spending $1M on a certification nobody asked for.

### ✅ Knowledge Check

### 🃏 Flashcards

## Module 2: CR26 — The 2026 Overhaul That Reset Everything

Consolidated Rules for 2026 took effect three weeks ago. Almost every FedRAMP article, consultant deck, and internal wiki page written before this summer is now describing a program that no longer exists.

### What CR26 is

The **Consolidated Rules for 2026 (CR26)** replaced a decade-plus accumulation of memos, Requests for Comment, notices, and baseline documents with a single consolidated rulebook. It took effect **July 4, 2026**, with enforcement beginning **January 1, 2027**, and the ruleset is intended to hold through **December 31, 2028** before the next consolidated set replaces it.

The framing that matters for you: *CR26 changed the vocabulary, the document formats, and the operating model — not, for the most part, the underlying security requirements.* A service authorized at Moderate today carries forward as Class C with the same controls and the same boundary. If you are starting from zero, this is good news: you are learning one clean rulebook instead of reverse-engineering a decade of accreted policy.

### Change 1 — Impact levels became Certification Classes

The FIPS 199 labels of Low / Moderate / High are retired in favor of Certification Classes A through D.

| Class | Replaces | Meaning | Relevance to Coursera |
| --- | --- | --- | --- |
| Class A | — (new) | A new, lighter-weight pilot baseline below the old Low. Designed for low-risk services with minimal federal data exposure. | Worth investigating as an entry point. Its pipeline opened first, on Aug 3, 2026. |
| Class B | Low | Loss of confidentiality, integrity, or availability has limited adverse effect. | Plausible if the boundary holds only training records and no PII beyond work identity. |
| Class C | Moderate | Serious adverse effect. The overwhelming majority of federal SaaS lands here. | The realistic target. Any real LMS integration or federal employee record storage will be scoped here. Blackboard's LMS is Class C. |
| Class D | High | Severe or catastrophic effect. Law enforcement, emergency services, financial systems, health data. | Not applicable. If someone proposes Class D for a learning platform, they have mis-scoped the system. |

### Change 2 — "Authorized" became "Certified"

FedRAMP Authorization is now **FedRAMP Certification**. This is not cosmetic in one respect: it removes the ambiguity between the FedRAMP designation and the agency's ATO, which were both loosely called "authorization" and were constantly confused. Update your marketing copy, your trust center, your RFP boilerplate, and your sales enablement — using retired terminology in a federal proposal reads as "this vendor has not been paying attention."

### Change 3 — Prose documents became machine-readable requirements

This is the deepest change and the one with the most engineering consequence.

-   Requirements are now published as discrete, versioned, **MUST / MUST NOT / SHOULD** statements maintained in public repositories on GitHub, rather than as narrative PDFs. You can diff them. You can subscribe to changes. You can write tests against them.
-   The **System Security Plan (SSP)** — historically a 300-plus-page Word document describing how each of hundreds of controls is implemented — has been retired in its prose form, replaced by machine-readable representations.
-   The **Plan of Action and Milestones (POA&M)** — the spreadsheet of known deficiencies and remediation dates — is likewise replaced by structured formats.
-   Authorization materials are submitted in **JSON and Markdown**. Related guidance (RFC-0024) requires machine-readable packages, including **OSCAL**, for FedRAMP providers by **September 2026**.

Why this is genuinely good for an engineering org

The old model rewarded companies that were good at writing documents. This model rewards companies that are good at building systems that emit evidence. That is a straight advantage for a modern platform team, and it is why the whole 20x program is viable. Your compliance artifacts become build artifacts: generated from infrastructure-as-code, validated in CI, versioned in git, reviewed in PRs. If you have a strong platform engineering practice, CR26 turns your existing strength into a compliance advantage. If your compliance evidence is a shared drive full of screenshots, CR26 is going to hurt.

### Change 4 — Broader and more automated continuous monitoring

CR26 widens ongoing obligations in four specific directions:

-   **New incident reporting triggers.** More categories of event now require notification, on tighter clocks. Your incident response runbook needs a federal branch with its own severity mapping and reporting timeline — not a footnote in the existing one.
-   **Availability reporting.** Uptime and service availability are now reportable, not just a contractual SLA matter. Your existing SLO tooling likely covers the measurement; what you need is the reporting pipeline and the definitions that match FedRAMP's, not yours.
-   **Configuration guides.** You must publish secure configuration guidance for how agencies should deploy and configure your service — a customer-facing artifact that has to stay accurate as the product changes.
-   **Balance Improvement Releases are mandatory.** Previously optional improvement cycles are now required. FedRAMP has also begun issuing responses to CISA Binding Operational Directives (for example, BOD 26-04 on prioritizing security updates based on risk) that flow through to providers. Translation: the compliance target moves on a schedule, and you must move with it. Staffing a program at "enough people to pass the audit" leaves you understaffed by design.

### The timeline you need on a slide

June 25, 2026

FedRAMP publishes the Consolidated Rules for 2026.

July 4, 2026

CR26 takes effect. New terminology, classes, and formats become the operative rulebook.

August 3, 2026

FedRAMP 20x **Class A** submission pipeline opens.

August 10, 2026

Ready Conversion and Lost Sponsor pipelines open — the routes for existing Rev5 providers to move into the new certification classes.

August 31, 2026

FedRAMP 20x **Class B and Class C** pipelines open. This is the date that matters for Coursera.

September 2026

RFC-0024 machine-readable package requirement (including OSCAL) applies to FedRAMP providers.

January 1, 2027

CR26 enforcement begins for all stakeholders, subject to specific effective dates and grace periods.

June 11, 2027

FedRAMP stops accepting **new Rev5 applications**. After this date, 20x is the only on-ramp.

December 31, 2028

Existing Rev5 authorizations sunset. CR26 itself is scheduled for replacement by the next consolidated ruleset.

Coursera lens

Two concrete action items independent of whether you pursue certification. First, purge retired vocabulary from anything federal-facing — "FedRAMP Authorized," "Moderate baseline," "we'll submit our SSP" all signal staleness to a knowledgeable buyer. Second, if a security questionnaire or RFP asks about your FedRAMP posture, the honest and strong answer today is: *"Coursera is available via GSA MAS. We are evaluating FedRAMP 20x Class C certification and can discuss timeline against your requirement."* That is credible, accurate, and buys you the conversation without committing $1M.

### ✅ Knowledge Check

### 🃏 Flashcards

## Module 3: FedRAMP 20x — The Fast Track, and Why It Was Built for You

If Coursera pursues federal certification, this is almost certainly the path. It is faster, dramatically cheaper, and structurally biased toward exactly the kind of company Coursera is.

### The core idea: outcomes, not paperwork

Traditional Rev5 asks: *"Describe, in narrative prose, how you implement each of roughly 325 NIST SP 800-53 controls, and let an assessor sample your evidence."* The output is a document. The document is stale the day it ships.

FedRAMP 20x asks a different question: *"Demonstrate, through automated validation against your running infrastructure, that these security outcomes are true right now."* The output is a continuously-verifiable claim.

The unit of that model is the **Key Security Indicator (KSI)**.

### Key Security Indicators

A KSI is a **measurable security outcome that can be validated through automation**. Each KSI maps to a set of underlying NIST SP 800-53 controls — the security rigor is not reduced, the *expression* of it is. Instead of writing prose about your access control policy, you demonstrate programmatically that MFA is enforced, that privileged access is time-bound, that keys rotate.

The published counts are **56 KSIs for Low and 61 for Moderate** (Class B and Class C respectively). Treat those numbers as a version, not a constant — the indicator set is actively maintained in public repositories, and different sources snapshot different revisions. AWS's own deep-dive, for instance, walks through 63. **Always validate against the live repository before planning a gap assessment.**

KSIs are organized into capability clusters. The recurring themes:

| Cluster theme | What it asks you to prove | Typical automated evidence |
| --- | --- | --- |
| Cloud Native Architecture | Immutable infrastructure, IaC, no persistent manual access to production | Terraform/CDK state, deployment pipeline logs, absence of long-lived SSH |
| Identity & Access Management | MFA everywhere, least privilege, no shared accounts, prompt deprovisioning | IdP configuration export, IAM policy analysis, access review records |
| Encryption | Validated cryptography in transit and at rest, managed key lifecycle | TLS configuration scans, KMS policy, key rotation events |
| Configuration Management | Hardened baselines, drift detection, change control | CIS benchmark scan output, config-drift alerts, PR history |
| Monitoring, Logging & Auditing | Comprehensive logging, tamper resistance, defined retention, alerting | Log pipeline config, retention policy, immutability settings |
| Service Configuration & Vulnerability Management | Scanning cadence, remediation inside SLA, dependency hygiene | Scanner output, SBOM, time-to-remediate metrics |
| Incident Response & Recovery | Tested IR plan, tested backup and recovery, defined RTO/RPO | Tabletop records, restore test results, runbooks |
| Third Party Information Resources | Vendor inventory, subservice organizations, supply chain assurance | Vendor register, subprocessor list, upstream FedRAMP inheritance |

### The completeness bar

The Phase 2 pilot set an explicit standard that is the best available guide to what Phase 3 will expect:

What "done" means in a 20x submission

Bar 1

**Automated validation must cover at least 70% of KSIs.** The remainder may be manually evidenced, but automation is the default expectation and manual evidence is the exception you have to justify.

Bar 2

**Every KSI must be addressed.** There is no partial submission. A KSI you cannot satisfy is a gap you must close or explicitly justify — not one you can omit.

Bar 3

**Evidence must exist in both human-readable and machine-readable form.** An auditor must be able to read it; a validator must be able to parse it. Build the machine format first and render the human view from it, never the reverse.

### The rollout

| Phase | When | Who | What it established |
| --- | --- | --- | --- |
| Phase 1 | Apr – Sep 2025 | Open pilot, ~10 vendors | Proved that KSI-based validation could work at the Low baseline. Public, iterative, unusually transparent for a federal program. |
| Phase 2 | Late 2025 – 2026 | Closed pilot, 13 participants | Extended the model to Moderate and set the completeness bar (70% automation, all KSIs, dual-format evidence). GRC vendors including Secureframe participated. |
| Phase 3 | Q3–Q4 2026 | Open to all qualifying providers | Wide-scale public adoption for Class B and Class C. Pipelines open Aug 3 (Class A) and Aug 31 (Class B/C), 2026. |

### Why 20x favors Coursera specifically

The program's design assumptions read like a description of a modern SaaS platform team, and they cut against legacy vendors:

-   **Cloud-native is assumed, not accommodated.** If you run containers on managed cloud infrastructure with everything defined as code, you are the reference architecture. If you run a virtualized data center with a change advisory board, you will struggle to hit 70% automation.
-   **Inheritance does heavy lifting.** Building on an already-certified IaaS provider lets you inherit a large fraction of infrastructure-layer indicators rather than proving them yourself. This is the single biggest lever on both cost and timeline.
-   **Continuous validation replaces annual theater.** Instead of a once-a-year evidence scramble, the same automation that produces your submission keeps producing it. The marginal cost of staying certified drops toward the cost of running the pipeline.
-   **Small scope wins.** Because every KSI must be addressed, a narrow boundary is dramatically cheaper than a broad one. A scoped "Coursera for Government" service is a far better 20x candidate than "all of Coursera."

The number that should anchor your exec conversation

**18+ months and $800K–$2M** under Rev5 Moderate, versus **roughly 3 months and $100K–$300K** under 20x. That is not an incremental improvement; it changes which side of the build/no-build line this decision falls on. It is also why the answer to "should we do FedRAMP?" may be genuinely different in 2026 than it was when the question was last asked at Coursera.

> **Warning:** The honest caveats
>
> **The 3-month figure is assessment duration, not readiness duration.** It assumes you already satisfy the KSIs. If MFA is not universal, if you have long-lived production credentials, if logs are not immutable — the clock starts after you fix that, and fixing it is the real project.
>
> **You still need an agency sponsor.** 20x compresses assessment, not business development. No sponsor, no certification, regardless of how automated your evidence is.
>
> **The program is young.** Phase 3 opened at scale weeks ago. Expect process friction, evolving guidance, and KSI revisions. Early movers get advantage and pay for it in ambiguity.

### ✅ Knowledge Check

### 🃏 Flashcards

## Module 4: The Rev5 Exit — Deadlines, Doors Closing, and the Arbitrage Window

Two dates govern the strategic timing of this decision, and they point in opposite directions. Understanding why creates a genuine, time-limited advantage.

### The two dates

The deadlines that shape your options

Jun 11 2027

**FedRAMP stops accepting new Rev5 applications.** After this date there is no legacy on-ramp. Every new entrant goes through 20x, at whatever the program looks like then.

Dec 31 2028

**Existing Rev5 authorizations sunset.** Anyone holding a Rev5 certification must have converted by then. This is why the Ready Conversion and Lost Sponsor pipelines opened Aug 10, 2026.

### Why this creates a window rather than a deadline

Read the two dates together with the cost figures from Module 3 and something interesting appears. Normally, a compliance regime tightens over time: early participants get an easy standard, latecomers face a harder one. Here the opposite is happening. The *expensive, slow* path is the one being retired, and the *cheap, fast* path is the one opening up. For roughly the next four to six quarters, three conditions hold simultaneously:

1.  **20x is open to all qualifying providers** at Class B and Class C (since August 31, 2026), at roughly a fifth of the Rev5 cost.
2.  **Legacy competitors are distracted.** Vendors holding Rev5 certifications are spending their compliance budget on *conversion* — moving an existing authorization into the new class structure before the 2028 sunset — not on new capability. That is defensive spend. Yours would be offensive spend.
3.  **The Marketplace is thin in your category.** Federal learning platforms are not a crowded FedRAMP category. That thinness will not last if 20x makes entry cheap for everyone.

The strategic read

The cost of certification is falling by roughly 80%. That is exactly the kind of change that converts a market from "nobody bothers" to "table stakes" — and it usually happens faster than incumbents expect. The question for Coursera is not only "is this worth $250K?" but "what does this category look like in 2028 when it costs everyone $250K?" If the answer is "every serious learning platform will have it," then the value of moving now is not the certification itself — it is the 18–24 months of being the only one your buyer can say yes to.

The counter-argument deserves equal weight: if the federal learning market is genuinely small for Coursera, then being first into a small market is still being in a small market. Module 6 is where that gets tested with numbers rather than narrative.

### The Rev5 → CR26 conversion paths (context, not your path)

You would be a new entrant, so these do not apply to Coursera — but you will hear them referenced constantly and should recognize them:

-   **Ready Conversion pipeline** (opened Aug 10, 2026) — for providers with an existing Rev5 designation moving into the new certification classes.
-   **Lost Sponsor pipeline** (opened Aug 10, 2026) — for providers whose sponsoring agency relationship ended, a historically fatal event that stranded otherwise-compliant vendors. Its existence is a meaningful signal that FedRAMP is trying to reduce the brutality of sponsor dependency.

### Format migration: JSON, Markdown, OSCAL

Whichever path a provider is on, the submission format is changing. Authorization materials must be submitted in **JSON and Markdown**, and RFC-0024 requires machine-readable packages including **OSCAL** by **September 2026**.

For a new entrant this is pure upside: you never build the legacy artifact. Design your evidence pipeline to emit OSCAL-shaped JSON from day one, and render any human-readable view from that source. Providers who spent a decade maintaining Word documents are the ones paying a migration tax; you would not be.

```
Evidence pipeline — the shape to build toward

  infrastructure-as-code  ──┐
  IdP / IAM configuration ──┤
  scanner + SBOM output   ──┼──▶  collector  ──▶  ksi-evidence.json  (OSCAL-aligned)
  log pipeline config     ──┤                            │
  CI/CD + change records  ──┘                            ├──▶ machine validation (CI gate)
                                                         └──▶ rendered Markdown (human review)

  Rule: the machine format is the source of truth.
        The human-readable document is a build artifact, never hand-maintained.
```

Coursera lens

If the decision in Module 14 is "go," the timing constraint is not June 2027 — it is *the sponsor*. Assessment under 20x takes about a quarter; finding and closing an agency sponsor takes two to four. Working backwards from a target of holding certification before the category fills in, sponsor conversations need to be live by roughly Q1 2027. That makes the qualification sprint a Q4 2026 activity, not a 2027 one. The engineering readiness work can run in parallel and is valuable regardless of the outcome.

### ✅ Knowledge Check

### 🃏 Flashcards

## Module 5: Does Coursera Actually Need FedRAMP? The Data-Trigger Test

This is the module that either saves Coursera a million dollars or tells you the million dollars is unavoidable. Everything turns on one question: what federal information crosses the boundary?

### The rule, stated precisely

FedRAMP applies when a cloud service **processes, stores, or transmits federal information** on behalf of an agency. It is triggered by *data*, not by *customer*. An agency can be your customer without triggering FedRAMP; an agency can trigger FedRAMP with a single integration that never involves a purchase order change.

Two corollaries that people consistently get wrong:

-   **A federal customer alone does not trigger it.** Agencies routinely buy commercial services under low-risk determinations where no agency information enters the service. This is the posture Coursera operates in today.
-   **The agency's Authorizing Official makes the call, not you.** You can build a strong argument for a low-risk determination. You cannot make the determination. Different agencies — and different AOs within the same agency — reach different conclusions on identical facts. Plan for the strictest reading you are likely to encounter in a deal you actually want.

### The five-rung ladder

Map any proposed federal engagement onto this ladder. Coursera's current posture is Rung 1. Every rung up is a product decision that carries a compliance consequence.

1

Open content access — no agency data

Federal employees use Coursera with personal or work email. Coursera holds a name, an email, and a completion record. No integration with agency systems. Purchased through GSA MAS.

FedRAMP generally not required · Coursera's posture today

2

Bulk licensing with agency-provided roster

The agency supplies a list of employees to provision. Coursera now holds an agency-attributed roster — names and work emails tied to a specific federal organization.

Usually still defensible · but the argument gets thinner, and some AOs will say no

3

SSO federation with an agency identity provider

Coursera federates authentication with a `.gov` IdP — SAML or OIDC against agency Entra ID, Login.gov, or a PIV/CAC-backed provider. You are now inside the agency's identity trust boundary.

Frequently triggers FedRAMP · assume it will

4

LMS / HR system integration and write-back

Coursera reads from and writes to a federal system of record — an agency LMS, a talent management system, an HR platform. Completion data becomes part of an official personnel record. Skills data may inform assignment or promotion.

FedRAMP required · Class C is the realistic scope

5

Federal employee records, CUI, or mission-specific content

Coursera stores federal employee PII beyond work identity, hosts agency-authored content that may be Controlled Unclassified Information, or supports role-based training tied to sensitive functions.

FedRAMP required · CUI raises CMMC questions too — see Module 11

### Where each Coursera product line lands

| Product | Federal relevance | Likely rung | Assessment |
| --- | --- | --- | --- |
| Coursera Plus / consumer | Individual federal employees using it on their own | 1 | Out of scope entirely. Do not let it into the boundary discussion. |
| Coursera for Campus | Federal service academies, military-affiliated institutions, and public universities | 1–2 | The federal exposure is narrow. The public university exposure is real but points at StateRAMP, not FedRAMP. See Module 12. |
| Coursera for Business | Federal contractors and agency-adjacent enterprises | 2–3 | Defense contractors may push CMMC requirements at you before any agency pushes FedRAMP. Watch this channel — it is the underrated one. |
| Coursera for Government | The direct federal offering | 3–5 | This is the whole question. The rung depends entirely on how deep the integration goes — and that is a product decision you control. |

The most valuable insight in this course

**The rung is a product decision, not a compliance fact.** Coursera chooses how deeply Coursera for Government integrates. A deliberately shallow integration — no write-back to federal systems of record, no storage of federal PII beyond work identity, SSO handled at a boundary you scope narrowly — can hold the line at Rung 2 and stay out of FedRAMP for years.

That is a legitimate, defensible strategy. It is also a ceiling: it caps deal size, excludes you from the engagements where learning data actually matters to an agency, and hands the deep-integration segment to Blackboard. The decision is not "do we need FedRAMP" — it is **"which federal business do we want, and are we willing to pay the entry fee for it?"** Frame it that way for your exec team and the conversation improves immediately.

### The questions to ask your GTM team before spending anything

1.  **Show me the pipeline.** How many federal opportunities have we lost specifically to a FedRAMP requirement in the last eight quarters? Names, dollar values, and the actual language of the disqualification. Anecdote is not evidence here — "customers keep asking" is a very different fact from "we lost these four deals."
2.  **Was it FedRAMP or something else?** Losses get attributed to FedRAMP that were really about price, incumbency, contract vehicle, or Section 508 accessibility. Read the debriefs.
3.  **What did the winner have?** If the winner also lacked FedRAMP, it was never the binding constraint.
4.  **Is there a named agency willing to sponsor?** Not "interested in Coursera" — willing to put an Authorizing Official's name on a sponsorship. This is the single highest-information question in the entire evaluation, and it is answerable in weeks.
5.  **What does the target integration actually require?** Have a solutions architect map the top three federal opportunities onto the ladder. You may find the real requirement is Rung 2 and everyone assumed Rung 4.

> **Warning:** The failure mode to avoid
>
> Sales says "we keep losing federal deals because we don't have FedRAMP." Engineering spends 18 months and $1M. Certification lands. Federal revenue does not materially move — because the actual constraint was that Coursera had two federal sellers, no capture manager, and no relationship with the contracting officers who write the requirements. FedRAMP removes a technical blocker. It does not build a federal sales motion, and it does not create demand. Both of those cost money too, and they are not on the compliance budget.

### ✅ Knowledge Check

### 🃏 Flashcards

## Module 6: The Business Case — Market Size, Competitors, and Honest ROI

The compliance question is tractable. The business question is where this decision actually lives — and it is the one most engineering leaders under-prepare for.

### Sizing the federal opportunity

Public data on federal learning spend is fragmentary, so build the estimate bottom-up and label the assumptions explicitly. Anchors worth using:

-   The federal civilian workforce is roughly **2.1 million employees** — before counting the uniformed military or the far larger contractor base.
-   US training spend overall reached about **$102.8 billion in 2025**, up 4.9% year over year — useful for context on the commercial baseline, not a federal figure.
-   GSA has actively solicited learning content providers to support federal workforce modernization, seeking pay-for-access content mapped to **54 competency areas** with emphasis on data, technology, and financial management skills — exactly Coursera's catalog strength.
-   Coursera already partners with **900+ organizations** including federal agencies, and is on the GSA MAS.

A defensible sizing frame for your exec deck

Rather than quoting a market-research TAM nobody believes, build it as: *(addressable federal seats) × (realistic per-seat annual price) × (achievable penetration over 3 years)*, and show the sensitivity. If 2.1M civilian employees is the pool, even a conservative 3% penetration at a modest enterprise per-seat rate produces a number that justifies a $250K certification several times over. The honest caveat: penetration is gated by sales capacity and contract vehicles, not by certification. Present both the size and the gate, and you will be believed.

### The competitive landscape — and a correction worth having

This is where a widely-repeated assumption in ed-tech turns out to be wrong, and the correction favors Coursera.

| Competitor | FedRAMP status | Detail | What it means for Coursera |
| --- | --- | --- | --- |
| Blackboard / Anthology | Certified | FedRAMP Moderate authorization for the Blackboard LMS on AWS GovCloud, carrying forward as Class C under CR26. | The genuine threat. A certified LMS incumbent with a federal footprint. Any Rung 4 opportunity is theirs to lose. |
| Class Technologies | Certified (scoped) | FedRAMP-certified offering for government training, deployed with Zoom for Government, and DISA Impact Level 2. | Adjacent rather than head-on — virtual instructor-led training, not self-paced catalog. Note the pattern: they certified a scoped offering, not the whole company. |
| Instructure / Canvas | No evidence of its own | No indication Canvas itself holds FedRAMP certification. The federal Canvas story runs through Class as an integration wrapper. | Correct the record internally. "Canvas has FedRAMP" is repeated often and appears to be wrong. It changes the competitive math. |
| Coursera | GSA MAS only | On the Multiple Award Schedule; no FedRAMP certification. 900+ partner organizations including federal agencies. | Easy to buy, limited in what data you may hold. Rungs 1–2 available, 3–5 closed. |

Read the Class Technologies pattern carefully

Class did not certify "Class." They certified a *specific offering deployed in a specific environment* — government training on Zoom for Government. That is the scoping playbook, executed well: minimum viable boundary, maximum inherited controls, fastest path to a Marketplace listing. It is exactly what a "Coursera for Government" scoped offering should look like. Do not certify Coursera. Certify a deliberately small thing that lets agencies do the specific job they need done.

### Building the ROI case honestly

Three components, and most business cases only include the first:

1.  **Revenue unlocked.** Deals you cannot bid today. Requires the pipeline evidence from Module 5 — real opportunities, real dollars, real disqualification language.
2.  **Deal size expansion on existing federal relationships.** Often the larger number and almost always omitted. An agency at Rung 1 buying seats is a small contract. The same agency at Rung 4, with Coursera integrated into its talent system, is a materially larger and stickier one. Certification is what makes the expansion motion legal.
3.  **Defensive value.** If Blackboard or a certified newcomer bundles a federal learning offering, what does Coursera lose in accounts it holds today? This is speculative but not zero, and it belongs in the case explicitly labeled as speculative.

Against that, the full cost — not just the audit:

| Cost line | Nature | Frequently forgotten? |
| --- | --- | --- |
| Readiness remediation (engineering) | One-time, but often the largest line | Yes — usually |
| 3PAO assessment | One-time, then annual | No |
| GRC platform or compliance engineering | Recurring | No |
| Continuous monitoring operations | Recurring, permanent | Yes |
| Velocity tax on the product org | Recurring, permanent, hard to quantify | Almost always |
| Federal sales capacity + capture management | Recurring, and not on the compliance budget | Yes — and it is the one that kills ROI |
| GovCloud / separate-environment infrastructure | Recurring, depends on architecture | Sometimes |

Coursera lens — the argument that will actually persuade your CEO and board

Not "we need FedRAMP to be compliant." That reads as cost. Instead: *"The cost of federal certification just fell about 80% because of a program change this year. There is a 4–6 quarter window before this becomes table stakes in our category. Our closest LMS competitor already has it and the one we've been evaluating does not. For roughly $250K and one quarter of platform work — most of which hardens the commercial product anyway — we can be the only self-paced learning catalog an agency can integrate deeply. I want $75K and 90 days to prove there is a sponsor before we commit the rest."*

That framing wins because it is bounded, time-sensitive, competitively grounded, and asks for a small first commitment rather than the whole budget.

### ✅ Knowledge Check

### 🃏 Flashcards

## Module 7: Engineering Implications — What Actually Has to Change

This is your module. Everything above is strategy; this is the work your teams would actually do, and the architectural decision that determines whether it is a quarter or two years.

### Decision zero: the authorization boundary

Before any control work, one architectural choice dominates cost, timeline, and permanent operating burden: **what is inside the boundary?** Everything inside is assessed, monitored, and change-controlled forever. Everything outside is not.

| Approach | What it means | Pros | Cons |
| --- | --- | --- | --- |
| Separate GovCloud instanceRecommended | A distinct deployment of a scoped Coursera for Government service in AWS GovCloud (or equivalent), with its own data stores and no shared runtime with commercial. | Smallest possible boundary. Clean data residency and personnel story. Commercial product keeps shipping at full speed, entirely outside scope. | Duplicate infrastructure cost. Real deployment-pipeline work. Feature drift between environments is a genuine ongoing product-management burden. |
| Logical separation in commercial cloud | Same infrastructure, federal tenant isolated by account/VPC/encryption boundaries and access controls. | No duplicate infrastructure. One codebase, one deployment. | The boundary is much harder to argue and much larger in practice. Shared components pull into scope. Some agencies will simply refuse. Your commercial release process inherits federal change control. |
| Whole-platform authorization | All of Coursera inside the boundary. | No feature drift; one product. | Do not do this. Every commercial release becomes a federal change-control event. Cost and timeline multiply. There is no upside that a scoped boundary does not also deliver. |

The one architectural principle

Make the boundary as small as the federal use case allows, and inherit as much as possible from an already-certified infrastructure provider. Under 20x, where every KSI must be addressed, boundary size maps almost linearly to cost — and inheritance is the largest single discount available. A scoped GovCloud deployment of a purpose-built federal service is both the cheapest thing to certify and the easiest thing to keep certified.

### The control domains, and what each demands

#### Identity and access management

-   **Phishing-resistant MFA for all privileged access**, with no exceptions and no break-glass account that bypasses it. Break-glass exists, but it is monitored, alarmed, and time-bound.
-   **PIV/CAC support** for federal end users where the agency requires it, alongside standard SAML/OIDC federation.
-   **No long-lived credentials.** Short-lived, automatically-rotated credentials for all machine access. Static keys in CI are one of the most common findings.
-   **Just-in-time privileged access** with approval and full session recording. Standing production admin is the finding auditors love most.
-   **Documented, evidenced access reviews** on a defined cadence — and prompt deprovisioning that you can prove, with timestamps.

#### Cryptography — the one with a hard technical gate

-   **FIPS 140-3 validated cryptographic modules.** This is not "we use strong encryption." It is: the specific module must appear on the NIST validated list. This has real implementation consequences — FIPS-mode TLS libraries, specific managed-service configurations, sometimes different runtime images.
-   **Encryption in transit** everywhere, including service-to-service inside your own network. Internal plaintext traffic is a finding.
-   **Encryption at rest** for all data stores, backups, and snapshots. Backups are the commonly-missed one.
-   **Managed key lifecycle** — documented rotation, separation of duties, and access to keys that is itself logged and reviewed.

> **Warning:** FIPS 140-3 is the sleeper risk
>
> Teams assume this is a configuration flag. Sometimes it is. Often it means a specific library build, a specific instance type, a restricted cipher suite that breaks an old client, or a managed service whose FIPS-mode variant lacks a feature you depend on. Audit your cryptographic dependency chain *early* — this is the item most likely to surface a genuinely unpleasant surprise three months in.

#### Logging, monitoring, and audit

-   **Comprehensive audit logging** of authentication, authorization decisions, data access, configuration change, and privileged operations.
-   **Tamper resistance.** Write-once or append-only storage with integrity verification. An engineer who can delete audit logs is a finding.
-   **Defined retention** meeting federal requirements — typically longer than commercial defaults, with cost implications you should model up front.
-   **Time synchronization** to an authoritative source, with the correlation story that depends on it.
-   **Alerting on security-relevant events**, with documented response procedures and evidence they were followed.

#### Vulnerability and configuration management

-   **Authenticated scanning on a defined cadence** — infrastructure, containers, web application, and database layers.
-   **Remediation SLAs by severity.** The traditional expectation is roughly 30 days for high, 90 for moderate, 180 for low. Under CR26, FedRAMP's response to CISA BOD 26-04 pushes toward risk-based prioritization, so treat those numbers as a floor and track the current guidance.
-   **Hardened baselines** (CIS or equivalent) with automated drift detection.
-   **An SBOM and dependency provenance** for the software supply chain.
-   **Formal change control** for anything touching the boundary — with a defined threshold for what constitutes a "significant change" requiring agency review before deployment.

#### Incident response

-   **A federal branch of your IR plan** with its own severity mapping, notification obligations, and clocks — CR26 added triggers and tightened timelines.
-   **Tested annually** with documented tabletop exercises. "We have a plan" is not evidence; "here is the exercise record and what we changed afterward" is.
-   **Defined RTO and RPO** with *tested* restores. Untested backups are a finding, and the test evidence is what gets sampled.

#### Personnel and supply chain

-   **Background screening** for personnel with access to the federal boundary — a real HR process change, and one with lead time.
-   **US-person requirements** may apply depending on agency and data sensitivity. This is the constraint that most often collides with a distributed engineering org, and it is worth checking before you promise anything. It is a strong argument for a small, dedicated federal platform team rather than "everyone can operate it."
-   **Vendor and subprocessor inventory** with a clear story for every third party in the boundary — including which upstream FedRAMP certifications you inherit from.

### The order to do it in

```
Sequencing — highest KSI leverage first

  Q1  Identity          MFA universal, kill long-lived creds, JIT privileged access
      Boundary          Decide scoped GovCloud vs logical; write it down; freeze it
      Crypto audit      Map every cryptographic dependency to FIPS 140-3 validation

  Q2  Logging           Immutable audit pipeline, retention, alerting, time sync
      Config mgmt       Hardened baselines + automated drift detection
      Vuln mgmt         Authenticated scanning cadence + SLA tracking dashboard

  Q3  Evidence          Automated collector emitting OSCAL-aligned JSON in CI
      IR + recovery     Federal IR branch, tabletop, tested restore, RTO/RPO
      Supply chain      SBOM, subprocessor register, inheritance mapping

  Q4  Gap assessment    3PAO readiness review against live KSI set
      Submission        Package, validate, submit

  Identity and Logging gate the most KSIs. Do them first regardless of
  whether the FedRAMP decision is ultimately go or no-go.
```

Coursera lens — the case for doing most of this anyway

Look hard at that list. Universal phishing-resistant MFA, no standing production admin, no long-lived credentials, immutable audit logs, hardened baselines with drift detection, tested restores, an SBOM. Every one of those is something you would want to be true of Coursera's commercial platform on its own merits — and most of them will show up in enterprise security reviews and SOC 2 audits regardless.

That is the argument that gets this funded even under a "no" decision on federal: **roughly 70% of FedRAMP readiness work is platform hardening you should do anyway.** The FedRAMP-specific residue — FIPS 140-3 validated modules, US-person constraints, GovCloud deployment, the formal evidence pipeline — is the genuinely incremental part, and it is much smaller than the total. Fund the hardening on its own merits; treat federal certification as an option you buy the right to exercise later.

### ✅ Knowledge Check

### 🃏 Flashcards

## Module 8: Cost & Timeline Estimation

Numbers you can put in a budget request, with the ranges stated honestly and the assumptions visible.

### Published cost bands

These are market ranges as of 2026. Treat them as planning figures, not quotes — actual 3PAO pricing varies substantially with boundary size, architecture, and how much remediation the assessor has to wait on.

| Path / class | 3PAO assessment | Total program (year 1) | Continuous monitoring (annual) | Timeline |
| --- | --- | --- | --- | --- |
| Rev5 — Low Class B | $100K – $250K | $350K – $500K | ~$120K – $200K | 12+ months |
| Rev5 — Moderate Class C | $350K – $650K | $800K – $2M | ~$260K | 12–18 months (agency route); 12–36 months end-to-end is common |
| Rev5 — High Class D | $250K – $500K+ | $2.5M+ | $350K+ | Up to 24 months |
| 20x — Low/Moderate Class B / C | $100K – $300K all-in | Materially lower — the same automation that produces the submission sustains it | ~3 months assessment, given readiness |  |

> **Warning:** Read the timeline numbers carefully
>
> Every one of these figures describes *assessment and authorization*, starting from a system that already meets the controls. The readiness work comes first and is not in these numbers. For a company that has never done federal compliance, readiness is typically 2–4 quarters of platform engineering — and it is usually the single largest line item in the true total.

### Estimate your number

Adjust the inputs below. The model applies published base bands, then multiplies for boundary scope, engineering maturity, and tooling approach. It is a planning instrument, not a quote — but the shape of the sensitivity is the useful part.

#### FedRAMP cost & timeline estimator

Authorization path

Certification class

Authorization boundary

Current engineering maturity (MFA, IaC, immutable logs, no standing admin)

Compliance tooling approach

—

—

Time to certified

—

ConMon / year

—

Dedicated staffing

—

3-year total

—

What the estimator is really showing you

Toggle boundary from "Scoped GovCloud service" to "Whole platform" and watch the number roughly double while the timeline stretches by nearly half a year. Then toggle maturity. Those two levers — **boundary size and engineering readiness** — dominate everything else, including the choice of path and the choice of tooling. If you take one number from this module into a budget conversation, take that: the decisions that determine your FedRAMP cost are architectural decisions you make before you ever talk to a 3PAO.

### The line items behind the number

| Line item | Typical range | Notes |
| --- | --- | --- |
| Readiness remediation (internal engineering) | 2–4 quarters of a small team | Usually the largest true cost and almost never in the vendor quote. Load it at fully-burdened cost. |
| Advisory / readiness consulting | $50K – $200K | Optional but valuable for a first-timer. Must be a different firm than your 3PAO. |
| GRC platform subscription | $40K – $150K / yr | Secureframe, Drata, Vanta, Paramify and peers. Federal/FedRAMP modules are priced above the SOC 2 tiers. |
| 3PAO assessment | See table above | Get three quotes. Ask specifically about their 20x KSI experience — it is a young practice and depth varies widely. |
| GovCloud / separate infrastructure | Highly variable | Model it as a full duplicate environment at federal-scale traffic, plus the pipeline work to deploy to two targets. |
| Dedicated compliance headcount | 1.5–3 FTE (20x, scoped) | At minimum: one compliance-focused engineer, one program/GRC owner. Grows with boundary size. |
| Continuous monitoring operations | See table above | Permanent. Model it for ten years, not one. |
| Federal sales + capture capability | Not on this budget | But without it the ROI does not land. Raise it in the same conversation or the program gets blamed for a GTM gap. |

### ✅ Knowledge Check

### 🃏 Flashcards

## Module 9: Organizational Readiness — Build vs Buy the Compliance Function

You are being asked to stand up a permanent capability, not run a project. The org design decisions here outlive the certification.

### The three roles you must fill

| Role | Owns | Build or buy? |
| --- | --- | --- |
| Compliance program owner | The FedRAMP relationship, agency sponsor management, submission packaging, ConMon reporting cadence, audit coordination. | Hire — this must be internal. It is a permanent accountability and it needs someone who can hold a room with an Authorizing Official. |
| Compliance engineering | The evidence pipeline, control automation, KSI validators, scanner integration, drift detection. | Internal, from platform — this is platform engineering wearing a compliance hat. Do not outsource it; the automation must live with the people who own the infrastructure. |
| Assessment & advisory | Independent assessment (3PAO) and, separately, readiness advisory. | Buy — and they must be two different firms. |

### GRC platform: what you are actually buying

Secureframe, Drata, Vanta, Paramify and peers all offer FedRAMP-oriented modules. Notably, Secureframe participated in the 20x Phase 2 Moderate pilot, which is a meaningful signal about which vendors have real depth in the new model versus a repackaged SOC 2 product.

What a GRC platform genuinely gives you:

-   **A control framework already mapped** to KSIs and NIST 800-53, so you are not building the crosswalk yourself.
-   **Connectors** that pull evidence automatically from AWS, your IdP, your scanners, your HR system, your ticketing.
-   **Package generation** in the required machine-readable formats — increasingly the main reason to buy rather than build.
-   **Continuous monitoring workflow** — the recurring cadence, the reporting, the reminders that keep you certified.
-   **Multi-framework reuse.** The same evidence serves SOC 2, ISO 27001, and FedRAMP. If Coursera already runs one of these platforms for SOC 2, extending it is usually the right call.

Build vs buy — the honest cut

Buy

**If you have not done federal compliance before.** The mapping work alone — KSIs to controls to your actual infrastructure — is months of specialist effort you would be reinventing. Buy the framework, build the connectors you need beyond what ships.

Hybrid

**The realistic answer for most platform-strong companies.** GRC platform for framework, mapping, workflow and package generation; your own evidence collectors for anything Coursera-specific the connectors don't cover. This is where most 20x participants land.

Build

**Only if federal is a core strategic line of business** with multiple offerings to certify over time. For a single scoped offering, building the whole apparatus is a poor use of senior platform engineers who could be shipping product.

> **Warning:** The trap in every GRC sales demo
>
> The demo shows green checkmarks flowing in automatically. What the demo does not show is that a connector *reports* your configuration — it does not *fix* it. If MFA is not enforced, the platform will tell you clearly and repeatedly that MFA is not enforced. The remediation is still your engineers' quarter. GRC platforms compress the evidence and reporting burden, not the engineering burden. Budget accordingly, and be skeptical of any timeline that assumes otherwise.

### Choosing a 3PAO

Five questions, in priority order:

1.  **How many 20x KSI-based assessments have you actually completed?** Not Rev5 assessments — 20x. It is a young practice and depth varies enormously. Ask for the count and for references.
2.  **Who is on my team, specifically?** Firms sell with principals and staff with juniors. Name the assessors and their experience.
3.  **How do you handle automated evidence?** A 3PAO that wants screenshots will erase your automation advantage entirely.
4.  **What is your capacity and calendar?** Phase 3 opened to everyone weeks ago. Good assessors are booking out. This is a real constraint on your timeline.
5.  **Fixed fee or time-and-materials?** Fixed fee with a clearly defined scope protects you from a remediation cycle turning into an open-ended invoice.

### Finding an agency sponsor

The genuinely hard part, and it is business development, not compliance:

-   **Start from existing relationships.** Which agencies already buy Coursera through GSA MAS? Which have an active champion? A sponsor almost always emerges from a customer who already wants more of you, not from cold outreach.
-   **Find the mission need, then the sponsor.** An agency sponsors because it wants your capability, not to do you a favor. Lead with the workforce-development outcome the agency is already accountable for.
-   **Talk to the CIO org, not only procurement.** The Authorizing Official sits in the security organization. Procurement can want you and the AO can still decline.
-   **Understand what you are asking.** Sponsorship costs the agency real staff time and puts an official's name on a risk acceptance. Reduce that friction: bring a complete package, a clean architecture, and inherited controls that make review easy.
-   **Note the safety net.** The Lost Sponsor pipeline now exists, which materially reduces the historical catastrophic risk of a sponsor evaporating mid-process. That is worth knowing when you weigh the bet.

Coursera lens — org design

Do not create a compliance department. Create a **small federal platform team** — two to four engineers who own the scoped federal deployment end to end, plus one compliance program owner reporting into security or your org — and give it a product mandate, not just an audit mandate. Compliance orgs that sit outside engineering generate tickets for engineers who resent them. A federal platform team that owns its own environment, its own pipeline, and its own evidence generation will move faster and produce better evidence, because the people generating the evidence are the people who control the systems.

It also solves your US-person problem cleanly: staffing constraints apply to a small named team rather than to your entire engineering organization.

### ✅ Knowledge Check

### 🃏 Flashcards

## Module 10: Continuous Monitoring — Life After Certification

The certification is the beginning of the obligation, not the end of it. This is the module to make your staff engineers read before anyone signs up for this.

### The recurring obligations

| Cadence | Obligation | Engineering impact |
| --- | --- | --- |
| Continuous | Automated KSI validation against the running system | The pipeline must stay green. A failing validator is a compliance event, not just a red build. |
| Monthly | Authenticated vulnerability scans across infrastructure, containers, application, and database layers | Scanning cadence plus triage capacity. Findings have clocks attached. |
| Monthly | Deficiency reporting to the agency (the structured successor to the POA&M) | A recurring reporting cycle someone owns by name. |
| Per severity | Remediation inside SLA — roughly 30 days high, 90 moderate, 180 low as a floor, moving toward risk-based prioritization under CR26 | This is the real velocity tax. A high finding in a dependency preempts roadmap work. Non-negotiably. |
| As triggered | Significant Change Request — agency review before deploying material changes to the boundary | Some changes require approval before deployment. Architectural refactors need lead time you are not used to budgeting. |
| As triggered | Incident reporting on CR26's expanded triggers and tightened clocks | A federal branch in the IR runbook with its own escalation path and notification obligations. |
| Annual | Assessment, penetration test, IR tabletop, contingency-plan test, access reviews | A predictable annual spike. Plan roadmap capacity around it rather than pretending it will not happen. |
| Ongoing | Mandatory Balance Improvement Releases and responses to CISA Binding Operational Directives | The target moves. Staff for change, not for a steady state. |

### The Significant Change Request — the concept most likely to surprise your teams

In commercial SaaS, you ship when it is ready. Inside a FedRAMP boundary, changes above a defined threshold require agency notification and, for the most material ones, review before deployment. What typically qualifies:

-   New subservice providers or third-party components in the boundary
-   Material changes to authentication or authorization architecture
-   Changes to encryption implementation or key management
-   New data types entering the boundary
-   Significant infrastructure or topology change
-   Changes to the boundary itself

The cultural collision, stated plainly

An engineering org that ships continuously and refactors opportunistically will experience this as a hostile constraint, and telling them otherwise will not help. The honest framing for your teams: *the federal environment is a different product with a different release model, operated by a small team that opted into that model.* That is precisely why the scoped-boundary architecture from Module 7 matters so much — it confines the constraint to the people who signed up for it, and lets the commercial platform keep its velocity entirely untouched.

If you instead put the whole platform in the boundary, you have imposed federal change control on every engineer at Coursera. That is the decision that turns a compliance win into an engineering-culture problem, and it is very hard to reverse.

### Automating the drag away

The 20x model is genuinely better here, and this is where the investment pays back:

-   **Evidence generation runs in CI.** The same pipeline that validated your submission runs on every deploy. Compliance state is always current because it is computed, not assembled.
-   **Validators are tests.** A KSI check that fails should fail a build, not surface in a quarterly review three months later. Shift compliance left in exactly the way you already shifted security left.
-   **Deficiency tracking lives in your issue tracker**, with severity-derived due dates, not in a parallel spreadsheet that only the compliance team looks at.
-   **Dashboards over documents.** Current KSI status, open findings by age against SLA, and days-to-next-obligation, visible to the team that owns them.

```
ConMon as a build pipeline — the target state

  every deploy ──▶ collect evidence ──▶ validate KSIs ──▶ publish status
                        │                     │                 │
                        │                     ├─ fail ──▶ block deploy + open issue
                        │                     └─ pass ──▶ update evidence store
                        │
                        └──▶ monthly: render agency report from the same store

  Principle: there is no separate "compliance activity."
             There is a pipeline, and compliance is one of its outputs.
```

Coursera lens — the number to socialize

Model continuous monitoring at roughly **1.5–3 dedicated FTE** for a scoped 20x boundary, permanently, plus an annual assessment cost. Over five years that is a larger number than the initial certification. Say that out loud in the funding conversation. A program approved on the initial cost and then starved on the recurring cost is worse than not starting — a lapsed certification is a public, visible failure on the Marketplace, and it is far more damaging to federal credibility than never having certified at all.

### ✅ Knowledge Check

### 🃏 Flashcards

## Module 11: CMMC — The Defense-Adjacent Path You Might Hit First

Complementary to FedRAMP, aimed at a different population, and currently in an unusual state of flux. For Coursera for Business, this channel may generate a compliance requirement before any agency does.

### What CMMC is and how it differs

The **Cybersecurity Maturity Model Certification** is the Department of Defense's program for verifying that companies in the defense industrial base adequately protect **Controlled Unclassified Information (CUI)** and Federal Contract Information (FCI). The key structural differences:

|  | FedRAMP | CMMC |
| --- | --- | --- |
| Who it applies to | Cloud service providers selling to federal agencies | Defense contractors and their supply chain — including subcontractors |
| What it protects | Federal information in a cloud service | CUI and FCI anywhere in a contractor's environment |
| Underlying standard | NIST SP 800-53, expressed as KSIs under 20x | NIST SP 800-171 (Level 2), plus 800-172 elements at Level 3 |
| Scope of assessment | A cloud service offering (a scoped boundary) | The contractor's own environment handling CUI |
| Enforcement | Agency ATO, program-level | A contract clause — flowed down through the supply chain |

### The three levels

-   **Level 1 — Foundational.** Basic safeguarding of FCI. Annual self-assessment.
-   **Level 2 — Advanced.** Protection of CUI against NIST SP 800-171. Self-assessment for some contracts, third-party (C3PAO) certification for others. This is where most of the defense industrial base sits.
-   **Level 3 — Expert.** The highest tier, adding NIST SP 800-172 elements, assessed by DIBCAC. Reserved for the most sensitive programs.

### Where the program actually stands — July 2026

November 10, 2025

**Phase 1 began.** The 48 CFR acquisition rule took effect and CMMC requirements started appearing in selected new contracts, largely on self-assessment for Level 1 and certain Level 2 contracts.

July 13, 2026

**DoD paused the transition to Phase 2** and opened a 60-day program review under a CMMC Reform Task Force. Phase 1 self-assessment requirements remain in effect; the move to mandatory C3PAO certification is on hold. Further guidance expected around mid-September 2026.

November 10, 2026

Phase 2 was originally scheduled here — mandatory C3PAO certification for Level 2 in applicable CUI contracts. **Currently suspended pending the review.**

November 10, 2027

Phase 3 — Level 3 / DIBCAC requirements. Timeline subject to the ongoing review.

November 10, 2028

Phase 4 — full implementation of the CMMC program.

> **Warning:** Read the pause correctly
>
> The July 13 pause is a reason to *watch*, not a reason to dismiss. Phase 1 obligations remain live and contract clauses continue to flow down. Reform reviews of this kind typically adjust scope, thresholds, and timing rather than cancel a program with an in-force acquisition rule behind it. The right posture is a calendar reminder for mid-September 2026 guidance, not a decision to ignore the channel.

### Does Coursera care?

Three scenarios, three answers

No

**Coursera sells commercial training to a defense contractor with no CUI involved.** Generic professional-development content, no contract-specific material, no CUI in the platform. CMMC does not reach you. This describes most Coursera for Business defense-adjacent revenue today.

Maybe

**A defense contractor flows requirements down contractually.** Contractors increasingly push security requirements to every vendor touching their environment, sometimes beyond what CMMC strictly requires. You may face a CMMC-shaped questionnaire regardless of whether the program formally applies — and answering it well is a sales asset.

Yes

**Coursera hosts CUI.** If an agency or contractor uploads controlled technical data, export-controlled material, or contract-specific content into Coursera, CUI is in your environment and CMMC becomes directly relevant. **This is a product-policy decision worth making explicitly and early:** decide now whether Coursera for Government will accept customer-uploaded content, and if so, what the acceptable-use policy prohibits.

Coursera lens — the underrated channel

The plausible sequence is not "an agency demands FedRAMP." It is: **a large defense contractor in Coursera for Business asks a CMMC-shaped security question, and the answer determines a renewal.** That channel is live now, it does not wait for FedRAMP, and it is currently owned by nobody in particular.

Two cheap actions worth taking regardless of the FedRAMP decision: (1) build a defensible CMMC-adjacent security response for defense-sector Coursera for Business accounts, grounded in your existing SOC 2 posture and the NIST 800-171 crosswalk; (2) write an explicit product policy on customer-uploaded content in federal and defense contexts, so nobody accidentally makes Coursera a CUI environment through a feature request.

### ✅ Knowledge Check

### 🃏 Flashcards

## Module 12: FedRAMP vs SOC 2 vs ISO 27001 vs StateRAMP

Coursera almost certainly holds SOC 2. Understanding what carries over — and what emphatically does not — determines both the real cost and the right sequencing.

### The comparison

|  | SOC 2 Type II | ISO 27001 | FedRAMP | StateRAMP |
| --- | --- | --- | --- | --- |
| Who requires it | Enterprise buyers (US-centric) | Enterprise buyers (global, esp. EU/APAC) | US federal agencies | US state and local government |
| Nature | Attestation on your chosen controls | Certification of a management system (ISMS) | Certification against a prescribed baseline | Certification against a FedRAMP-derived baseline |
| Who assesses | A CPA firm | An accredited certification body | A 3PAO, plus agency authorization | A 3PAO, plus the StateRAMP PMO |
| Flexibility | High — you scope the controls | Medium — risk-based, you justify scope | Low — the baseline is prescribed | Low |
| Continuous obligation | Annual audit period | Surveillance audits, 3-year cycle | Continuous — monthly reporting | Continuous |
| Typical cost | $30K – $100K | $40K – $120K | $100K – $2M+ depending on path | Lower than FedRAMP; reciprocity often applies |
| Coursera relevance | Have it; enterprise table stakes | Valuable for international enterprise | The decision this course exists to inform | Underrated — Coursera for Campus at public universities and state workforce agencies |

### What actually carries over from SOC 2

Reuse, honestly assessed

Reuses

**The underlying control implementations.** Access control, change management, encryption, logging, vendor management, incident response — the actual engineering is largely the same work. This is the majority of the technical overlap and it is real.

Reuses

**The evidence collection apparatus.** If you already run a GRC platform for SOC 2, the same connectors feed FedRAMP. This is the strongest practical argument for extending an existing platform rather than buying a new one.

Partial

**Policies and procedures.** You have them; they will need federal-specific additions — incident reporting timelines, personnel screening, configuration guides for agency customers.

Does not

**Scope flexibility.** SOC 2 lets you choose your Trust Services Criteria and define your own control set. FedRAMP prescribes the baseline. Every KSI must be addressed. This is the single biggest mental adjustment for a team that has only done SOC 2.

Does not

**The specifically federal requirements.** FIPS 140-3 validated cryptography, US-person constraints, government data residency, agency-specific incident reporting, significant change control. None of this appears in SOC 2 and all of it is real work.

Does not

**The operating rhythm.** SOC 2 is an annual audit period. FedRAMP is a continuous state with monthly obligations. This is an operational change, not a documentation change.

The rule of thumb

SOC 2 Type II gets you perhaps **40–50% of the way** to FedRAMP readiness on the engineering substance, and considerably less on the operating model. It is a real head start, and it is not close to sufficient. Anyone who tells you "we have SOC 2, so FedRAMP is mostly paperwork" has not read the KSI list.

### StateRAMP — the one Coursera may be under-weighting

StateRAMP applies the FedRAMP model to state and local government, with its own program office and authorization process. It matters more to Coursera than the federal question in at least two places:

-   **Coursera for Campus at public universities.** Public institutions are state entities. Some states extend StateRAMP-style requirements to systems handling student data at public institutions — a far larger slice of Coursera for Campus than federal service academies.
-   **State workforce and labor agencies** running reskilling programs are a natural Coursera buyer, and they procure under state rules.
-   **Reciprocity runs one way and it favors you.** A FedRAMP certification generally satisfies StateRAMP requirements; the reverse is not true. If you certify federally, you get the state market largely for free — and that materially improves the ROI arithmetic in Module 6.

Coursera lens — sequencing

The right sequence for Coursera is almost certainly: **maintain SOC 2 → harden the platform against the KSI list (valuable regardless) → pursue FedRAMP 20x Class C on a scoped federal offering → inherit StateRAMP reciprocity**. Do not pursue StateRAMP first as a cheaper trial run; you would pay twice and gain little, since federal certification largely subsumes it.

And add the state-market value to the federal business case explicitly. A FedRAMP certification that also unlocks public universities and state workforce agencies is a materially different investment than one that only unlocks federal agencies — and Coursera for Campus makes that second market genuinely large.

### ✅ Knowledge Check

### 🃏 Flashcards

## Module 13: The Coursera FedRAMP Readiness Checklist

Work through this with your platform and security leads. Check only what is *true today and evidenceable* — not what is planned, not what is mostly true. Your score is saved locally, so you can return to it.

0%

Check the items that are true today.

A · Business qualification — do this before any engineering spend

Named federal opportunities exist with dollar values attachedNot "agencies are interested" — specific opportunities, sized, in the CRM. Losses attributed to FedRAMP have been verified in written debriefsAnd the winner in each case actually held certification. A named agency has expressed willingness to sponsorThe single highest-information signal. Willingness to put an Authorizing Official's name on it, not general enthusiasm. Target opportunities have been mapped onto the five-rung ladderBy a solutions architect, not by sales. You may find the real requirement is Rung 2. Federal sales and capture capability is funded separatelyCertification without a federal sales motion produces no revenue.

B · Boundary & architecture

A scoped federal offering is defined as a product, not just a deploymentNamed feature set, named owner, explicit exclusions. The authorization boundary is documented and agreed by engineering and securityWritten down, diagrammed, and frozen before assessment work begins. Infrastructure is fully defined as code with no manual production changesTerraform/CDK or equivalent; console changes are the exception and are alarmed. The deployment pipeline can target a separate government regionOr the work to make it so is scoped and estimated. Inherited controls from the underlying cloud provider are mappedThe single biggest cost lever under 20x.

C · Identity & access — gates the most KSIs

Phishing-resistant MFA is enforced for all privileged access, with no exceptionsBreak-glass exists but is monitored, alarmed, and time-bound. No long-lived static credentials exist anywhere in the pipelineShort-lived, automatically rotated. Static keys in CI are a top finding. Privileged production access is just-in-time, approved, and session-recordedStanding production admin is the finding auditors look for first. Access reviews run on a defined cadence with retained evidenceAnd deprovisioning is provably prompt, with timestamps. SAML/OIDC federation is supported, with a path to PIV/CACRequired for Rung 3 and above.

D · Cryptography

Every cryptographic dependency has been mapped to FIPS 140-3 validation statusThe sleeper risk. Audit this early — it is where the unpleasant surprises live. All traffic is encrypted in transit, including service-to-service internallyInternal plaintext is a finding. All data is encrypted at rest — including backups and snapshotsBackups are the commonly-missed one. Key lifecycle is managed with documented rotation and separation of dutiesAnd access to keys is itself logged and reviewed.

E · Logging, monitoring & audit — gates the second-most KSIs

Auth, authorization, data access, config change and privileged operations are all loggedComprehensive coverage, not just application logs. Audit logs are tamper-resistant with integrity verificationAn engineer who can delete audit logs is a finding. Retention meets federal requirements and the cost is modeledTypically longer than commercial defaults. Security-relevant events alert, with documented and evidenced response proceduresEvidence that the procedure was followed, not just that it exists.

F · Vulnerability & configuration management

Authenticated scanning runs on a defined cadence across all layersInfrastructure, container, web application, database. Remediation SLAs by severity are defined and actually met~30/90/180 days as a floor, trending toward risk-based prioritization under CR26. Hardened baselines are in place with automated drift detectionCIS benchmarks or equivalent. An SBOM is generated and dependency provenance is trackedSupply chain assurance is its own KSI cluster. A significant-change threshold is defined for the federal boundaryEveryone knows what requires agency review before deployment.

G · Incident response & recovery

The IR plan has a federal branch with its own severity mapping and clocksCR26 added triggers and tightened timelines. Tabletop exercises run annually with documented outcomes and changes made"We have a plan" is not evidence. RTO and RPO are defined, and restores are actually testedUntested backups are a finding; the test record is what gets sampled.

H · Personnel, supply chain & evidence automation

Background screening exists for personnel with boundary accessA real HR process change with lead time. US-person requirements have been checked against the target agenciesBefore promising anything. This constrains who can operate the boundary. A complete vendor and subprocessor inventory exists for the boundaryIncluding which upstream FedRAMP certifications you inherit from. Evidence is generated automatically and emitted in machine-readable formOSCAL-aligned JSON as the source of truth; human-readable views generated from it. A GRC platform is in place or a build-vs-buy decision has been madeExtending an existing SOC 2 platform is usually right. A named compliance program owner exists with permanent accountabilityNot a project manager on rotation.

How to read your score

Section A is disqualifying. If you score well on B through H and poorly on A, you have a technically-ready platform and no business reason to certify — which means the answer is *not yet*, and the right move is the qualification sprint in Module 14. If you score well on A and poorly on C and E, you have a real opportunity and 2–3 quarters of identity and logging work standing between you and it. That is a fundable, well-understood platform program, and it is worth doing regardless.

## Module 14: The Decision — Recommendation & 90-Day Plan

Synthesis. What to actually do, in what order, with what budget, and — most importantly — what would make you stop.

### The recommendation

Do not commit to FedRAMP. Commit to finding out.

The evidence supports a **bounded 90-day qualification sprint at roughly $75K**, not a full program commitment. Three things are simultaneously true: the cost of entry has fallen roughly 80%, the competitive window is real but finite, and the single binding constraint — an agency sponsor — is answerable in one quarter for a small fraction of the program cost. Any exec who would approve $1M on this evidence is not being rigorous; any exec who would refuse $75K to resolve the biggest unknown is not being strategic.

### The 90-day qualification sprint

| Weeks | Workstream | Owner | Output |
| --- | --- | --- | --- |
| 1–4 | Demand validation. Pull every federal opportunity from the last eight quarters. Read the debriefs. Verify which losses were genuinely FedRAMP and what the winners held. Size the pipeline honestly. | GTM + Finance | A sized, evidence-backed federal pipeline — or the finding that there isn't one. |
| 1–6 | Sponsor hunt. Start from agencies already buying through GSA MAS. Reach the CIO organization, not only procurement. Ask the direct question about sponsorship willingness. | Federal GTM + you | A named agency and a named Authorizing Official contact — or a clear no. |
| 2–8 | Boundary design. Define the minimum viable Coursera for Government offering. Diagram the boundary. Map inherited controls. Estimate the GovCloud deployment work. | Platform architecture | A boundary document and an engineering estimate you would defend. |
| 4–10 | KSI gap assessment. Pull the live KSI set. Assess honestly against the current platform. Categorize each as met / partially met / gap, with effort estimates. Use the Module 13 checklist as the intake. | Security + Platform | A gap register with a sequenced remediation plan. |
| 6–10 | 3PAO and GRC market scan. Three 3PAO conversations focused on actual 20x KSI experience and calendar availability. Price extending your existing GRC platform versus alternatives. | Compliance owner | Quotes, references, and a realistic assessment calendar. |
| 11–13 | Decision package. Synthesize into a go/no-go recommendation with a full-cost model, a timeline, an org proposal, and explicit kill criteria. | You | An exec decision, made on evidence. |

#### Sprint budget

-   Readiness advisory / gap assessment support — **$40K–$60K**
-   Internal effort — roughly **0.5 FTE across a quarter**, spread over platform, security, and GTM
-   No infrastructure spend, no GRC commitment, no 3PAO engagement yet

### If the answer is go

Quarter 1

Stand up the federal platform team (2–4 engineers + compliance program owner). Close the identity and logging gaps — the two domains that gate the most KSIs. Freeze the boundary.

Quarter 2

Build the GovCloud deployment. Complete configuration management, vulnerability management, and the crypto/FIPS work. Stand up the evidence pipeline emitting OSCAL-aligned JSON in CI.

Quarter 3

Close remaining KSI gaps. Federal IR branch, tabletop, tested restore. 3PAO readiness review. Formalize the sponsor relationship.

Quarter 4

Assessment and submission. Target certification before the June 2027 Rev5 cutoff creates a rush of new 20x entrants into your category.

### If the answer is no

A "no" is not a null result — it comes with a real plan:

-   **Hold the line at Rung 2 deliberately.** Write the product policy: no write-back to federal systems of record, no federal PII beyond work identity, no customer-uploaded content that could be CUI. Make it a documented constraint so nobody erodes it via a feature request.
-   **Do the platform hardening anyway.** Roughly 70% of the readiness work is generic hardening that serves SOC 2, enterprise security reviews, and your own risk posture. Fund it on those merits.
-   **Build the CMMC-adjacent response** for defense-sector Coursera for Business accounts. That channel is live now and costs almost nothing to prepare for.
-   **Set a review trigger, not a review date.** Revisit when any of these fires: a sponsor emerges, a named competitor certifies in your exact segment, or federal pipeline crosses a dollar threshold you set now.
-   **Watch the June 11, 2027 date** so a future "yes" is not made under time pressure.

### Kill criteria — agree these before you start

Stop the program if any of these becomes true

Kill

**No agency sponsor identified within two quarters of active pursuit.** Without a sponsor there is no certification, regardless of engineering readiness.

Kill

**Verified federal pipeline falls below the threshold you set in week 4.** Set the number before you are emotionally invested in the answer.

Kill

**The KSI gap assessment implies more than four quarters of remediation.** At that point the arbitrage window has closed and you are entering a crowded category late.

Kill

**The full-cost model with continuous monitoring at ten years exceeds the risk-adjusted revenue case.** Model ten years, not one.

Pause

**Federal sales capacity is not funded.** Do not certify into an organization that cannot sell federal. Fix that first or the program will be blamed for a GTM gap it never owned.

### The one-paragraph version for your CEO

Say this

"FedRAMP changed this year in a way that matters to us. A new automation-first path cut the cost of federal certification from roughly $1M and eighteen months to roughly $250K and one quarter, and it opened to everyone in August. Blackboard already has it. Instructure's Canvas does not, contrary to what people assume. Our closest analogue, Class, got certified by scoping a narrow government offering rather than certifying their whole platform — which is exactly what we'd do. About 70% of the engineering work is hardening we should do for our commercial platform anyway, and a federal certification also largely covers state and public-university requirements, which matters for Coursera for Campus. The one thing I can't answer from a desk is whether an agency will sponsor us, and that's the gate on everything else. I want $75K and 90 days to answer it. If the sponsor is real, I'll come back with a full plan. If it isn't, we hold our current posture deliberately, we do the hardening anyway, and we've spent 7% of the program cost to avoid the other 93%."

### ✅ Knowledge Check

### 🃏 Flashcards

## Module §: Sources & Where to Verify

FedRAMP requirements are versioned and actively maintained. This course reflects the landscape as of **July 27, 2026**. Before making commitments, validate specifics against primary sources.

### Primary — always check these first

-   [FedRAMP Consolidated Rules for 2026](https://www.fedramp.gov/2026/) — the operative rulebook, including the Marketplace section.
-   [FedRAMP Marketplace](https://www.fedramp.gov/marketplace/products/) — verify any competitor's actual status here rather than trusting a press release.
-   [FedRAMP: Propelling Change — Consolidated Rules for 2026](https://www.fedramp.gov/2026-06-25-propelling-change-fedramp-launches-consolidated-rules-for-2026/) (June 25, 2026 announcement).
-   [FedRAMP response to CISA BOD 26-04](https://www.fedramp.gov/notices/0014/) — risk-based prioritization of security updates.
-   The FedRAMP requirement repositories on GitHub — the live, versioned KSI set. **Validate KSI counts and content here before planning any gap assessment.**

### Analysis used in building this course

-   [Crowell & Moring — CR26, Rev5 sunset, and critical deadlines](https://www.crowell.com/en/insights/client-alerts/time-for-a-change-fedramp-fundamentally-revamps-program-with-consolidated-rules-for-2026)
-   [Quzara — Certification Classes A–D](https://quzara.com/fedramp/certification-classes) and [the 20x roadmap through 2028](https://quzara.com/fedramp/20x-roadmap)
-   [Secureframe — FedRAMP 20x goals and timeline](https://secureframe.com/blog/fedramp-20x), [KSI reference](https://secureframe.com/hub/fedramp/key-security-indicators-ksi), and [Rev5 vs 20x cost breakdown](https://secureframe.com/hub/fedramp/costs)
-   [AWS Public Sector — deep dive on the KSIs](https://aws.amazon.com/blogs/publicsector/deep-dive-into-fedramp-20x-key-security-indicators-decoding-the-63-ksis/) (note: walks 63, a different revision than the 56/61 figures — evidence the set is versioned)
-   [Workstreet — Phase 3 rollout](https://www.workstreet.com/blog/fedramp-20x-phase-3) and [20x vs Rev5](https://www.workstreet.com/blog/fedramp-20x-vs-rev5)
-   [RKON — why the SSP is being replaced](https://www.rkon.com/articles/fedramp-cr26-deleted-300-page-ssp/)
-   [FedRAMP cost analysis (2026)](https://fedrampcost.com/) and [Paramify cost breakdown](https://www.paramify.com/blog/fedramp-cost)

### Competitive & market

-   [Blackboard / Anthology — security & certifications](https://www.blackboard.com/government/security-certifications) and the [FedRAMP Moderate announcement](https://www.prnewswire.com/news-releases/blackboard-secures-fedramp-moderate-certification-for-flagship-learning-management-system-301046200.html)
-   [Class — FedRAMP-certified offering for government training](https://www.class.com/newsroom/class-announces-fedramp-certified-offering-for-government-training/)
-   [MeriTalk — Coursera services added to the GSA MAS contract](https://www.meritalk.com/articles/coursera-services-added-to-gsa-mas-contract/)
-   [Coursera for Government](https://www.coursera.org/government)
-   [GSA — learning content providers for federal workforce modernization](https://www.gsa.gov/about-us/newsroom/news-releases/gsa-seeks-applications-from-learning-content-providers-to-revolutionize-federal-workforce-modernization-09022021)

### CMMC

-   [CMMC timeline & key implementation dates](https://www.webcti.com/cmmc-timeline-news/)
-   [Summit 7 — the 48 CFR final rule and the CMMC contract clause](https://summit7.us/blog/final-rule-update-48-cfr-and-the-cmmc)
-   [BDO — 48 CFR and CMMC in federal acquisition](https://www.bdo.com/insights/advisory/defense-contractors-new-reality-the-final-48-cfr-rule-is-bringing-cmmc-into-federal-acquisition)

> **Warning:** A note on precision
>
> Published KSI counts differ between sources (56/61 versus 63) because the indicator set is versioned and actively maintained. The same is true of remediation SLAs, which are shifting toward risk-based prioritization under CR26. Treat every specific number in this course as a planning figure with a timestamp, and confirm against the live repositories before it appears in a budget, a contract, or a commitment to an agency.

**FedRAMP for SaaS Leaders — A Coursera Decision Guide**

Built for Mustafa Furniturewala · VP Engineering, Coursera · July 2026

Reflects the Consolidated Rules for 2026 (effective July 4, 2026) and the FedRAMP 20x Phase 3 rollout. FedRAMP requirements are versioned and actively maintained — validate specifics against fedramp.gov and the official requirement repositories before making commitments.

[← Back to all courses](index.html)