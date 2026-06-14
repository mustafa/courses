# Fanatics Collect — The Business of Collectibles (CTO Course)

## Module 1: Fanatics 101 — The Direct-to-Fan Empire

Before you can reason about Fanatics Collect as a technology asset, you need to understand the company it lives inside. Fanatics is not a trading-card company that happens to sell jerseys — it is a **direct-to-fan commerce conglomerate** that has assembled rights, equity relationships, and data across the entire sports economy. Collectibles is one of three legs, and "Collect" (the marketplace) is one product inside that leg. The strategic logic of the whole determines what your mandate as a CTO would actually be.

### From GSI Commerce to a Sports Conglomerate

Michael Rubin founded the predecessor business in 1995 (Global Sports Inc.), which became GSI Commerce — an e-commerce fulfillment and services platform that ran online stores for major retailers and brands. In 2011, Rubin sold GSI to **eBay for $2.4B**. eBay wanted the B2B fulfillment engine; Rubin negotiated to **buy back three consumer businesses eBay didn't want — Fanatics, Rue La La, and ShopRunner** — and built the modern company around the Fanatics licensed-merchandise asset.

For roughly a decade Fanatics was known as the dominant online seller of licensed sports apparel — running team and league webstores, with vertically integrated, on-demand manufacturing that let it print "championship moment" merchandise within minutes of a game ending. Around 2021, Rubin deliberately re-platformed the company from "the licensed-merch e-tailer" into a **multi-vertical platform** spanning commerce, collectibles, and betting. Group revenue grew from roughly **$3.5B (2021) to $8.1B (2024)**.

### The Three Divisions

Fanatics organizes around three operating businesses. Understanding their relative scale and margin profile tells you where the company's attention — and where collectibles' strategic weight — actually sits.

| Division | What it does | 2024 scale (est.) | Margin / status |
| --- | --- | --- | --- |
| Fanatics Commerce | Licensed apparel & merchandise e-commerce; team/league webstores; on-demand manufacturing. The legacy core. | ~$6.2B (≈77% of revenue) | Profitable; gross margin >40% |
| Fanatics Collectibles | Trading cards & memorabilia. Anchored by the Topps acquisition; also Fanatics Collect (marketplace) and Fanatics Live. | ~$1.6B (highest-margin unit) | >20% EBITDA — most profitable per dollar |
| Fanatics Betting & Gaming | Fanatics Sportsbook & Casino; built on the PointsBet US platform (acquired 2024). | ~$300M | Unprofitable; land-grab / startup mode |

Third-party analysts (Sacra) estimate 2025 group revenue near **$13B**, with Collectibles surging to roughly a third of the company — but *these are estimates, not audited figures*. The audited datapoint is 2024 at $8.1B. The point that matters for you: **collectibles is the highest-margin business in the portfolio**, which is exactly why Fanatics is investing aggressively to own the entire value chain of the hobby.

### The Flywheel: Why Fanatics Owns Rights, Not Just Storefronts

The strategic thesis is a direct-to-fan flywheel: own the fan relationship across merchandise → cards → betting → live events → tickets, cross-selling within a single identity and a shared data graph. A fan who buys a jersey is a prospect for a rookie's first card; a card collector is a prospect for the sportsbook; every interaction enriches the fan profile that powers the next sale. Rubin has publicly floated that betting could become ~40% of profits within five years and that Fanatics could be a $30-50B revenue company over a decade.

The moat underneath the flywheel is **equity-aligned rights**. Fanatics has put leagues, players' unions, and team owners on its own cap table, so the rights holders share in Fanatics' upside and have a direct incentive to extend exclusivity:

-   The **NHL** took equity in 2015; the **NFL, NFLPA, and MLB** joined in 2017; in the 2022 round, the NFL, NFLPA, NHL, MLB, and MLBPA all increased stakes. Collectively, leagues/unions/owners hold roughly **10% of Fanatics**; the NFL alone invested ~$320M in the 2022 round.
-   Within collectibles, Fanatics granted equity in the card entity to **MLB/MLBPA, NBA/NBPA, and the NFLPA** in exchange for long-term exclusive card licenses (covered in Module 3).

**💡 CTO Talking Point:** The flywheel is the answer to "why is collectibles strategic and not just a side bet?" Cards are the highest-margin, highest-engagement, most-data-rich corner of the fan relationship. A collector transacts dozens of times a year, holds assets in a vault you operate, and generates a continuous stream of pricing and behavioral data. If you frame your CTO mandate as "make the collectibles flywheel spin faster — more liquidity, more data, more cross-sell into Commerce and Betting," you are speaking the language of the people who run the company, not just the language of the hobby.

### Ownership, Funding & Valuation

Fanatics has raised roughly **$4.8B** to date from investors including **SoftBank, Silver Lake, Fidelity, and Clearlake Capital**, alongside the leagues and unions. Valuation milestones:

-   **Dec 2022:** a $700M round (led by Clearlake) set a peak valuation of **~$31B**.
-   **Sep 2024:** an employee tender offer was explored at a **~$25B** valuation (a discount to the peak, reflecting the broader correction).
-   **Late 2025:** a Fidelity fund mark *implied* ~$33.5B — but this is a mutual-fund mark-to-model, not a priced round. *Flag it as such.*

There is **no near-term IPO**; Rubin has said the company is in "absolutely no rush" to go public. For a CTO candidate that means: private-company governance, patient capital, and a board that includes sophisticated financial investors plus league/union representatives.

### Who Runs It

-   **Michael Rubin** — Co-Founder & CEO; controls the company.
-   **Glenn Schiffman** — EVP & CFO (ex-IAC); joined the board in 2025.
-   **Mike Mahan** — CEO, Fanatics Collectibles (runs Topps and the collectibles flywheel).
-   **Nick Bell** — CEO, Fanatics Collect (the marketplace — your likely organizational neighborhood).
-   **Matt King** — CEO, Fanatics Betting & Gaming (former FanDuel CEO).

Headcount is roughly **22,000** across the ecosystem. The recurring public-facing event is **Fanatics Fest** (NYC; ~125k+ attendees in 2025, expanding in 2026 with a FIFA tie-in for the World Cup) — a useful signal that Fanatics treats the fan/collector community as a top-of-funnel marketing engine, not just a transactional base.

## Module 2: The Hobby — How the Collectibles Economy Actually Works

You cannot architect a collectibles platform without internalizing what a collectible *is* as an economic object. A trading card is not a SKU — it is a quasi-financial asset whose value is set by scarcity, condition, authentication, and liquidity. Every one of those four forces becomes a system you must build. This module gives you the domain literacy to talk to collectors, sellers, and the board credibly.

### Market Size & Segments

The collectibles market is large, fragmented, and measured inconsistently (definitions vary by source — treat all sizes as estimates):

-   **Sports cards:** roughly **$13B (2024)** and growing.
-   **Trading Card Games (TCG):** roughly **$7.5B (2025)**, ~8% CAGR. Pokémon is the category leader (~12%+ share) and frequently the single most-traded "card" on every marketplace; Magic: The Gathering and others follow.
-   **Memorabilia & game-used:** autographs, jerseys, equipment, tickets — higher-ticket, harder to authenticate, central to the high end.
-   Broad "trading cards" estimates put the total near **$14-17B (2025)** trending toward ~$30B+ by the mid-2030s.

**🏷️ Why this matters to a CTO:** TCG (especially Pokémon) is not a sideshow — it is enormous, global, and demographically distinct from sports. eBay paid ~$295M for TCGplayer specifically to own it. Any roadmap for Fanatics Collect must decide how aggressively to extend beyond licensed sports cards (Fanatics' rights stronghold) into TCG, where Fanatics has no manufacturing moat and must win purely on marketplace experience and liquidity.

### The Boom, the Bust, and the New Normal

The pandemic triggered a historic bubble. In 2020-2021, nostalgia plus a wave of "cards as an alternative asset class" demand drove transaction volumes and prices to records — culminating in a **1952 Mickey Mantle selling for $12.6M in August 2022**, still the record. Then interest rates rose, speculative money left, and the market corrected sharply in 2022: the biggest pandemic gainers fell the hardest (some modern PSA-10 icons lost 60-70% of peak value).

Since then the market has stabilized into a healthier two-tier structure: **high-end, scarce, graded items remain resilient and set records**, while bulk/common product is liquid but low-margin. This bifurcation is the single most important market fact for product strategy — it explains why every serious player is racing to own the high end (auctions, vaults, authentication) where margins and defensibility live.

### The Four Forces That Set Value

**1\. Scarcity.** Modern cards are deliberately engineered for scarcity: base cards, then numbered parallels (e.g., a refractor numbered `/99`, `/10`, or a one-of-one `1/1` "superfractor"). The serial number is a price-bearing attribute. Vintage scarcity is emergent (survivorship). Your catalog must model parallels and print runs as first-class, queryable dimensions.

**2\. Condition.** Two physically identical cards can differ 10x in price based on condition. This is why grading exists.

**3\. Authentication & Grading.** A third-party grader inspects a card, assigns a numeric grade (typically 1-10), and seals it in a tamper-evident "slab." The grade is the **price-discovery currency of the hobby** — a PSA 10 and a PSA 9 of the same card are effectively different SKUs with different markets. Grading converts a subjective object into a standardized, fungible, tradeable unit. The major graders:

| Grader | Parent | Approx. share (2025) | Notes |
| --- | --- | --- | --- |
| PSA | Collectors Holdings | ~71% (18M+ cards) | Dominant; PSA grade = the market standard. PSA's slab commands the highest resale premium. |
| SGC | Collectors Holdings | small but growing | Strong in vintage; faster turnaround historically. |
| Beckett (BGS) | Collectors (acquiring, Dec 2025) | small | Subgrades; Collectors agreed to acquire Beckett in Dec 2025 — raising consolidation/monopoly concerns. |
| CGC Cards | Certified Collectibles Group (Blackstone majority) | ~18% (fast growth) | Aggressive challenger; on-site grading inside Fanatics' vault (see Module 4). |

Combine PSA + SGC + Beckett and the **Collectors umbrella controls roughly 79% of grading** — and with the Beckett acquisition, more. This concentration is strategically critical: **grading is the chokepoint of the entire hobby**, and the dominant grader sits inside a rival's corporate family (Collectors also owns Goldin auctions; its vault is wired into eBay).

**4\. Liquidity.** Historically, selling a card meant photographing it, listing it, shipping it, and waiting — friction that suppressed how often assets traded. The modern innovation is the vault: hold the physical card in a central insured facility so that ownership can transfer *digitally, instantly, without shipping*. This turns cards into something closer to a tradeable security and is the core of Fanatics Collect's strategy (Module 4).

**💡 CTO Talking Point:** Map the four forces directly onto systems. Scarcity → a catalog/taxonomy that models parallels and serial numbers. Condition + Authentication → a grading-integration workflow and, eventually, computer-vision condition assessment. Liquidity → a vault with digital title transfer plus an auction/marketplace engine. If you can name "the four forces and the four subsystems they imply," you've demonstrated that you understand the business at the altitude the role requires.

## Module 3: Collect vs Collectibles vs Live — The Vertical Stack

This is the single most-confused point in the entire space, and getting it precisely right will immediately signal that you've done your homework. "Fanatics Collectibles," "Fanatics Collect," and "Fanatics Live" are three different things. They are designed to operate as a **vertically integrated stack** — Fanatics owns the card from manufacture, through breaking, to secondary-market trading and custody — but they are distinct products with distinct technology.

```
THE FANATICS COLLECTIBLES VERTICAL STACK

  ┌──────────────────────────────────────────────────────────────┐
  │  FANATICS COLLECTIBLES  (the manufacturer / IP holder)        │
  │  • Topps brand (acquired 2022, ~$500M)                        │
  │  • Exclusive league/union LICENSES (MLB, NBA, NFLPA, UFC...)  │
  │  • Makes the physical cards: Chrome, Bowman, flagship, Now    │
  └───────────────────────────┬──────────────────────────────────┘
                              │ product enters the market via...
            ┌─────────────────┴──────────────────┐
            ▼                                     ▼
  ┌────────────────────┐              ┌──────────────────────────┐
  │  FANATICS LIVE     │              │  Hobby shops / retail /   │
  │  livestream "breaks"│              │  direct-to-consumer       │
  │  open boxes on cam  │              └────────────┬─────────────┘
  └─────────┬──────────┘                           │
            │  cards pulled enter the secondary mkt │
            └──────────────────┬───────────────────┘
                              ▼
  ┌──────────────────────────────────────────────────────────────┐
  │  FANATICS COLLECT  (the secondary-market MARKETPLACE)         │
  │  • Auctions (Weekly + Premier) + Buy-Now fixed price          │
  │  • The VAULT (custody + instant digital title transfer)       │
  │  • Grading integration (PSA/CGC/SGC/BGS) + market data        │
  │  • Built on the acquired PWCC platform (2023)                 │
  └──────────────────────────────────────────────────────────────┘
```

### Fanatics Collectibles — The Manufacturer

This is the IP-and-manufacturing arm. In January 2022 Fanatics acquired the **Topps** Sports & Entertainment division for roughly **$500M** (the candy/gum business was excluded). Topps — founded in 1938, baseball cards since 1951 — had been the dominant force in cards for ~70 years. Critically, Fanatics had *already* won the future MLB card rights in 2021, which devalued Topps and enabled the acquisition.

The disruptive move was securing **long-term exclusive licenses** across the major leagues and their players' unions, granting each equity in the card entity. The timeline (get these right — they are very recent as of 2026):

| League / Union | When Fanatics exclusivity takes hold | Notes |
| --- | --- | --- |
| MLBPA | 2023 (players) | MLB league mark exclusive from 2026 (Topps' old MLB deal ran to 2025). |
| NBA / NBPA | Oct 2025 | Panini's deal ended 2025; first product 2025-26 Topps Basketball. |
| NFL / NFLPA | 20-year exclusive from 2026 | NFLPA-branded since 2023; Panini cannot make licensed NFL cards after Mar 31, 2026. |
| UFC | Jan 2024 | Multi-year exclusive; Topps Chrome UFC. |
| NHL | — (not Fanatics) | Upper Deck retained the NHL license — a notable exception. |

Fanatics holds **\>80%** of the "Fanatics Trading Cards" entity, reportedly valued at **~$10.4B**, with leagues/unions holding the remainder. Key physical product lines: **Topps Chrome** (chromium refractors), **Bowman / Bowman Chrome** (prospect cards — "1st Bowman" rookie cards are the prospector's gold standard), the flagship sets, and **Topps Now** (print-on-demand cards of real events, available only 24 hours, then numbered to exact quantity sold).

**⚠️ The Panini antitrust overhang:** Panini (the displaced incumbent) sued Fanatics in 2023 alleging monopolization — long exclusives plus the Topps buy plus a controlling stake in card-manufacturer GC Packaging. In 2025 a judge let the core antitrust claims proceed, finding Panini adequately pleaded that Fanatics has "monopoly power." Fanatics countersued. As a CTO this matters because: (a) it's an active legal and reputational risk, and (b) it underscores that Fanatics' moat is *rights and exclusivity*, which invites regulatory and litigation scrutiny — your data, audit trails, and marketplace-integrity controls may end up as evidence.

### Fanatics Live — The Breaking & Livestream Channel

Launched in 2023, Fanatics Live is a livestream-shopping app built around "breaking" culture: a seller opens sealed boxes on camera, and buyers who pre-purchased "spots" (random, or "pick-your-team") receive the cards pulled into their slot. It's part QVC, part lottery, part community. Fanatics expanded it into Europe by acquiring the assets of France-based **Voggt** in October 2024. Its direct competitor is **Whatnot** (and TikTok Shop). The technology is low-latency video + real-time bidding/claiming + instant fulfillment — a distinct stack from the marketplace, though pulled cards flow into the same vault.

### Fanatics Collect — The Marketplace (your focus)

Fanatics Collect is the secondary-market marketplace and auction house, built on the acquired **PWCC** platform (covered in depth in Module 4). It is where existing cards are bought, sold, auctioned, vaulted, and graded. This is almost certainly the product surface a "Fanatics Collect CTO" would own.

**💡 CTO Talking Point:** The integration thesis is the prize. Fanatics is the only player that can own a card end-to-end: manufacture it (Collectibles), distribute and "break" it live (Live), then host its entire secondary-market life and custody (Collect). The technical opportunity is a **single identity, single wallet, single vault, and single data graph across all three** — so a card pulled on a Live break can be vaulted and listed on Collect in one tap, and every transaction feeds one pricing engine. Most competitors own only one slice. If you can articulate "the integrated card lifecycle as a platform," you've found the highest-leverage technical narrative in the building.

## Module 4: Inside Fanatics Collect — The Product Deep Dive

This module dissects the actual product you would be responsible for: its origin in PWCC, its surfaces (auctions, marketplace, vault, high-end), its grading integration, its monetization, and its traction. Treat this as the functional spec of the business.

### Origin: PWCC → Fanatics Collect

In May 2023, Fanatics Collectibles acquired PWCC Marketplace (Tigard, Oregon) — one of the world's largest sports-card auction houses (~125 employees transitioned; price undisclosed). PWCC was known for four things, all of which Fanatics inherited and rebranded:

-   **Auctions** — Weekly auctions plus high-end monthly Premier auctions.
-   **The Vault** — a physical custody facility enabling shipping-free trading.
-   **The Vault Marketplace** — fixed-price listings of vaulted cards.
-   **Market data** — the PWCC Indices (PWCC 100/500/2500), framing cards as an alternative asset class with index-style performance tracking.

On **July 15, 2024**, Fanatics retired the PWCC brand and relaunched the whole thing as **Fanatics Collect** (web + iOS/Android), led by CEO **Nick Bell**.

### The Product Surfaces

| Surface | What it is | Mechanics |
| --- | --- | --- |
| Weekly Auctions | High-volume, fast-turn auctions of mid-market cards. | Timed close; proxy bids; anti-snipe extensions. |
| Premier Auctions | Monthly marquee events for high-value lots. | Curated consignment; marketing push; record-setting lots. |
| Buy Now Marketplace | Fixed-price listings of vaulted cards. | "Price you see is price you pay" — no buyer fee. |
| The Vault | Physical custody enabling instant, shipping-free ownership transfer. | Free storage; digital title transfer on sale. |
| Sotheby's "Holy Grails" | Partnership (June 2024) for the rarest items ($100K+). | Live + online; co-branded high-end events. |

### The Vault — The Strategic Core

The Vault is the most important single concept in the product. Cards are stored, insured, in the Oregon facility. Because the asset is already in custody, when it sells, **ownership transfers digitally — nothing ships between trades**. This delivers three things simultaneously:

1.  **Liquidity:** a vaulted card can be relisted and resold in seconds, with no shipping friction, enabling near-real-time trading.
2.  **Trust & fungibility:** custody plus grading means the buyer knows exactly what they're getting; identical graded cards become interchangeable units.
3.  **Data & lock-in:** the vault is the system of record for ownership; the longer a collector's portfolio lives in your vault, the higher the switching cost.

Items enter the vault by purchase, consignment, or grading submission, and owners can request physical **withdrawal/fulfillment** (shipping fee applies). Storage is free; very low-value items (<$50) not sold or auctioned within 30 days incur a small one-time fee. The database — not the warehouse shelf — is the source of truth for who owns the physical slab. *That* is the system you must get exactly right; a custody/ownership reconciliation error is an existential trust failure.

### Grading Integration — and Who Owns Grading

Fanatics Collect **does not operate its own grading company**. It integrates the major third-party graders — **PSA, CGC Cards, Beckett (BGS), SGC** — so a raw card can be submitted, graded, and routed straight into the vault without multi-leg shipping. Two relationships matter:

-   **PSA partnership:** streamlined submission at favorable pricing tiers — important because PSA is the dominant grader and PSA-graded cards carry the highest resale premium.
-   **CGC on-site grading (Sept 2024):** a CGC grading operation physically inside the Tigard facility — grade, then immediately sell or store, collapsing the workflow.

**⚠️ The grading dependency is a strategic vulnerability:** The hobby's price-discovery currency (the PSA grade) is controlled by **Collectors Holdings — which also owns Goldin (a direct auction competitor) and whose vault is wired into eBay (another competitor)**. Fanatics relies on a rival's grading throughput and standard. Michael Rubin holds a *personal* stake in CGC's parent (alongside Blackstone), but Fanatics does not own a grader outright. "Should Fanatics build, buy, or partner its way to grading independence?" is one of the sharpest strategic questions you could be asked — and there's no easy answer, because building grading credibility from scratch is extraordinarily hard.

### Monetization — How Collect Makes Money

-   **Auctions:** ~20% buyer's premium on the hammer price (including Premier); sellers receive the full hammer price plus a seller's bonus starting around 2% for qualifying lots.
-   **Buy Now Marketplace:** no buyer fee; tiered seller fee (~6% if priced near market, rising to ~12-15% for listings well above fair-market value, using market-data benchmarks).
-   **Other:** fulfillment/shipping fees on withdrawal; ~2.9% payment processing; sales tax at checkout.

The fee architecture is itself strategy: **no buyer fee on Buy-Now** drives volume and competes with eBay's friction, while **pricing seller fees against fair-market data** nudges the market toward efficient pricing and makes the platform's pricing data a competitive weapon.

### Traction & Records

Fanatics does not disclose Collect-specific GMV or user counts (flag this), but reported datapoints signal momentum:

-   **March 2025 Premier auction:** ~$10.58M across 232 lots — its strongest since the rebrand.
-   **Record sales:** a 2013 Aaron Judge Bowman Chrome superfractor 1/1 auto at **$5.2M**; a Shohei Ohtani 2025 Topps Chrome 1/1 at **$3M** (Dec 2025, the platform's highest); a LeBron James superfractor at $1.26M; a Caitlin Clark 1/1 at $660K (a record for a female athlete).
-   **Sotheby's events** have added multi-million-dollar single-event totals at the top end.

**💡 CTO Talking Point:** The product is really four businesses fused into one platform: a high-concurrency auction engine, a fixed-price marketplace, a physical custody/logistics operation, and an alternative-asset data product. Each has a different SLA and failure mode. Auctions fail loudly at the moment of close (and integrity matters legally). The vault fails catastrophically and quietly (a custody/ownership mismatch). The data product fails subtly (bad comps erode trust). A strong CTO answer names these as distinct reliability domains rather than "a marketplace."

## Module 5: The Competitive Landscape

The collectibles market has consolidated into **two vertically integrated stacks** — the eBay/Collectors-PSA axis and the Fanatics axis — surrounded by financialized and livestream insurgents. Grading and vault custody are the contested chokepoints; instant-transfer vaulting has become table stakes. Knowing who controls what is essential to any strategy conversation.

### The Two Axes

**The eBay / Collectors-PSA axis:** eBay has the largest buyer base and liquidity; it owns **Goldin** (high-end auctions) and **TCGplayer** (the Pokémon/Magic marketplace), offers an Authenticity Guarantee, and has a commercial alliance with **PSA** (the dominant grader) whose vault is wired into eBay. This axis controls grading + the high end + TCG + the broadest marketplace.

**The Fanatics axis:** Fanatics controls **card manufacturing and exclusive league rights** (Topps), a high-end auction + vault marketplace (**Collect**, ex-PWCC), the leading **livestream/breaking** challenger (Live), and a Sotheby's tie-up for the very top. Its weakness: it depends on a rival's grading standard and has no manufacturing moat in TCG.

### Competitor Map

| Player | Model | Scale (est.) | How it competes with Collect |
| --- | --- | --- | --- |
| eBay | Horizontal marketplace + Authenticity Guarantee; owns Goldin & TCGplayer; PSA Vault tie-in. | ~$80B total GMV; collectibles the top GMV-growth driver. | Biggest buyer base + liquidity; owns the high end (Goldin) and TCG (TCGplayer). The broadest moat. |
| Goldin | Premium consignment auctions (owned by eBay since 2024). | ~$500M+ sales 2024, targeting $1B by 2026. | Direct rival to Premier auctions + the Sotheby's tie-up — now with eBay distribution. |
| Collectors / PSA | Dominant grader; also owns Goldin's grading lineage; runs PSA Vault. | ~$4.3B valuation (2022); 18M+ cards graded. | Controls the grading chokepoint Fanatics depends on; a "frenemy." |
| Alt (alt.xyz) | Financialized exchange: marketplace + Alt Vault + AI valuation + lending against cards. | ~$305M raised; ~$325M valuation (2021). | Closest "cards-as-an-asset-class" rival (vault + valuation + loans). Notably, suing Fanatics/PWCC over alleged shill bidding. |
| COMC | Consignment/logistics: ship in → scanned, stored, listed, fulfilled; store-credit economy. | 40M+ cards listed; eBay strategic investment. | Back-office/vault overlap for mid-market & bulk; tied to eBay. |
| Whatnot | Livestream shopping/auctions/breaks (open marketplace). | ~$8B GMV 2025; ~$11.5B valuation (Oct 2025). | The central threat to Fanatics Live — larger, more liquid, broader categories. |
| Heritage Auctions | World's largest collectibles auctioneer; broad categories. | ~$2.16B sales 2025. | Head-to-head at the high end of cards/memorabilia. |
| StockX | Anonymous bid/ask order-book ("stock market of things") + authentication + vault. | ~$3.8B valuation (2021); Pokémon volume surging. | The architectural template for a liquid, exchange-style card market. |

### Where the Battle Is Actually Fought

-   **Liquidity & the vault:** whoever holds the most assets in custody owns the most frictionless trading and the highest switching costs. eBay (PSA Vault), Alt, COMC, and Fanatics all run vaults — this is now table stakes, and the fight is over depth of inventory and trading velocity.
-   **Grading:** the chokepoint. Fanatics' dependence here is its structural soft spot.
-   **The high end:** Goldin (eBay) vs. Collect + Sotheby's — record-setting lots are marketing and margin.
-   **Livestream:** Whatnot vs. Fanatics Live — the fastest-growing acquisition channel for new collectors.
-   **TCG / Pokémon:** eBay's TCGplayer is entrenched; Fanatics has no manufacturing edge here and must win on experience.

**💡 CTO Talking Point:** Fanatics' defensible edge is the **integrated card lifecycle** (manufacture → break → trade → custody) and league rights — things eBay and Whatnot cannot replicate. Its exposed flank is **grading dependence and TCG**. A credible strategy: lean hard into the integration (one identity/wallet/vault/data-graph across Collectibles + Live + Collect), use exclusive rights to make Collect the canonical home for the cards Fanatics itself prints, and treat grading independence as a deliberate, sequenced bet rather than a reflex.

## Module 6: The Technology & Architecture

This is the heart of the CTO conversation: what a collectibles-marketplace-plus-vault-plus-auctions platform actually has to build and own. Below is a subsystem-by-subsystem architecture, each tied to a business force from earlier modules. These are general best-practice patterns for this domain (not Fanatics' confidential internals), framed so you can reason about trade-offs out loud.

```
FANATICS COLLECT — SYSTEM ARCHITECTURE (REFERENCE MODEL)

  CLIENTS:  Web App   iOS / Android   Fanatics Live (video)
              │            │                │
              └────────────┴────────────────┘
                           │  (API gateway / BFF)
   ┌───────────────────────┼────────────────────────────────────┐
   │                       │                                     │
   ▼                       ▼                                     ▼
 CATALOG &            AUCTION ENGINE                      VAULT / CUSTODY
 SEARCH               (real-time bidding)                 (WMS + digital title)
 • card taxonomy      • proxy / max bids                  • slab barcode/QR
 • parallels, serial  • anti-snipe extend                 • bin/location index
 • dedupe→canonical   • bid ledger (append-only)          • ownership = source
   SKU                • WebSocket fan-out                   of truth (DB)
 • faceted search     • concurrency at close              • intake imaging
   (OpenSearch)       • integrity / anti-shill            • insurance, ship-out
        │                    │                                   │
        └──────────┬─────────┴──────────────┬────────────────────┘
                  ▼                         ▼
         PAYMENTS & TRUST            GRADING / AUTH WORKFLOW
         • escrow, payouts           • image capture stations
         • KYC/AML (high $)          • grader handoff (PSA/CGC/SGC)
         • fraud, chargebacks        • grade → auto-update listing/title
         • multi-state sales tax     • CV: counterfeit / condition (ML)
                  │                         │
                  └────────────┬────────────┘
                              ▼
                  DATA & PRICING PLATFORM
              • sold-comps engine • price guides
              • market indices (PWCC 100/500/2500)
              • valuations → portfolio, lending, fees
                              │
                              ▼
                  IMAGE / MEDIA PIPELINE  +  EVENT BUS (Kafka)
              high-res imaging at warehouse scale; CDN; ML features
```

### 1\. Catalog & Search/Discovery

The hardest unglamorous problem. A card is a deep taxonomy: `sport → set → year → player → parallel/variation → serial number → grade → grader`. Each axis is price-bearing — a PSA-10 `/10` refractor is a different market than a raw base card of the "same" card. You need a **canonical card-entity model** with deduplication so thousands of seller listings collapse onto one catalog SKU, plus faceted search (OpenSearch/Algolia-class) filtering on every axis, and "comp" linking so a listing surfaces sold-comparables of the *same* grade and parallel. Recommendations key on collected sets, favorite players, and "set completion" prompts. Get the catalog wrong and every downstream system (pricing, search, comps) inherits the error.

### 2\. Auction Engine

The highest-risk subsystem. Requirements: **proxy/max bids** (auto-increment to a hidden ceiling), **anti-snipe extensions** (late bids push the close-time out to keep auctions fair), and resilience to **concurrency bursts at close** — thousands of lots ending in clustered windows with bid storms in the final seconds. Architecture: an **append-only bid ledger**, serialized/optimistically-locked writes per lot, idempotent bid handling, a durable event queue (Kafka) feeding WebSocket fan-out for live bid state. And — uniquely critical here — **integrity**: bid-velocity anomaly detection and anti-shill-bidding controls with full auditability. (Recall the Alt v. Fanatics/PWCC shill-bidding allegation: auction integrity is both a trust and a legal requirement.)

### 3\. The Vault — Custody & Logistics

A warehouse-management system fused with a digital ledger. Each slab is tracked by **barcode/QR**, with bin/location indexing, intake imaging, and chain-of-custody logging. The defining capability is **digital title transfer**: ownership changes in the database without the physical asset moving. The database is the authoritative record of who owns each physical slab — so reconciliation between physical inventory and the ledger must be continuous and provably correct. Add all-risk insurance on stored value, sales-tax handling that differs for vaulted vs. shipped items, and a withdrawal/ship-out fulfillment workflow.

**⚠️ The custody invariant:** The single worst failure mode in this business is "the system says member A owns a slab that physically isn't there, or that two members both own." That's not a bug, it's an existential trust and legal event. Treat the ownership ledger like a financial ledger: immutable audit trail, periodic physical-to-digital reconciliation, and strict separation between "listing state" and "title state."

### 4\. Payments & Trust

Escrow-style flow: hold buyer funds, release to seller on transfer/delivery; marketplace payout rails (Stripe Connect / Adyen-class). Because lots reach six and seven figures, **KYC/AML is mandatory at high ticket sizes**, alongside buyer/seller protection, fraud defense (account-takeover, payment fraud, friendly-fraud/chargebacks), and automated **multi-state sales tax** (Avalara-class). High-value, low-frequency transactions have a different fraud profile than typical e-commerce — a single fraudulent seven-figure transaction dwarfs a year of small fraud.

### 5\. Authentication & Grading Workflow

Image-capture stations feed condition assessment and a handoff to graders (PSA/CGC/SGC/BGS). "List/sell at grading" flows mean the grade result must flow *back* and automatically update the listing and the title. The big technology bet here is **computer vision / ML**: counterfeit and alteration detection, pre-grade condition estimation, slab-tamper detection, and label OCR for auto-cataloging. Fanatics images cards at enormous scale — that imagery is a training-data asset most competitors can't match.

### 6\. Data & Pricing (a Product, Not Just Plumbing)

The sold-comps engine, price guides, and **market indices** (the PWCC 100/500/2500 model) turn transaction data into an **alternative-asset data product**. This powers valuations, portfolio tracking, the fair-market-value benchmarks that drive seller fees, and — potentially — collateralized lending (Alt's model). Owning the most transactions means owning the most authoritative pricing, which is a compounding, defensible moat. This is arguably where a CTO can create the most durable, hard-to-copy value.

### 7\. Image / Media Pipeline

High-resolution front/back imaging at warehouse scale (competitors photograph tens of millions of cards). Needs ingestion, derivative generation, CDN delivery, dedupe, and tight binding of images to canonical catalog entities — and it doubles as the feedstock for the CV/ML systems above.

### 8\. Mobile-First Livestream Commerce

For the Fanatics Live surface: low-latency video (WebRTC / LL-HLS) with **real-time bidding/claiming overlaid on the live stream**, break/inventory management, and instant checkout. Latency and concurrency during hot drops are the differentiators against Whatnot. The integration prize is making a card pulled on a live break flow into the same vault, wallet, and catalog as the marketplace — one lifecycle, one data graph.

**💡 CTO Talking Point:** If asked "what's hard here that isn't obvious?", the strongest answers are: (1) the **canonical catalog** — entity resolution across a combinatorial taxonomy is the foundation everything else stands on; (2) **auction concurrency + integrity at close** — correctness under burst load with legal auditability; and (3) the **custody ledger invariant** — treating physical-asset ownership with financial-ledger rigor. Anyone can say "build a marketplace." Naming these three says you understand *this* marketplace.

## Module 7: Build vs Buy & Strategic Technology Bets

A CTO's job is not to build everything — it's to know which capabilities are **moat-building (build and own)** and which are **commodity (buy/partner and move on)**. Here is a defensible framework for Fanatics Collect, followed by the highest-leverage strategic bets.

### The Build / Buy / Partner Matrix

| Capability | Decision | Rationale |
| --- | --- | --- |
| Canonical catalog & entity resolution | BUILD | The foundation of search, comps, and pricing. No vendor knows the card taxonomy like you must. Pure moat. |
| Auction engine & integrity | BUILD | Differentiating, latency- and correctness-critical, and legally sensitive (anti-shill). Inherited from PWCC — modernize, don't outsource. |
| Vault custody ledger | BUILD | The trust core and switching-cost engine. The ownership ledger is yours; the physical WMS layer can use COTS warehouse tooling underneath. |
| Pricing / indices / market data | BUILD | Compounding data moat; a potential standalone product. The more transactions you own, the more authoritative — un-buyable. |
| CV/ML for condition & counterfeit | BUILD (on bought infra) | Your imaging scale is the unfair advantage; build models on commodity ML infra/foundation models. |
| Payments / payouts / tax | BUY | Stripe/Adyen/Avalara are best-in-class; reinventing rails is value-destroying. |
| KYC/AML, fraud scoring | BUY + tune | Buy the engine, own the rules/thresholds for high-value-item risk. |
| Grading | PARTNER (for now) | Building grading credibility is a multi-year trust problem. Partner deeply (PSA/CGC on-site); revisit "own it" only as a deliberate, sequenced bet. |
| Search infra, video infra, CDN | BUY | OpenSearch/Algolia, WebRTC providers, CDNs — commodity; differentiate on what you put on top. |

### The Five Strategic Bets

**1\. Platform unification across Collectibles + Live + Collect.** The single biggest technical prize. One identity, one wallet, one vault, one catalog, one data graph spanning manufacture → break → trade → custody. This is the thing no competitor can copy and it directly compounds the flywheel. Likely the centerpiece of your mandate.

**2\. Pricing & data as a product.** Turn the transaction firehose into the authoritative price index for the hobby — powering valuations, portfolio dashboards, fair-value fee logic, and potentially lending. Whoever owns canonical pricing owns the market's trust.

**3\. ML on proprietary imagery.** Counterfeit detection, automated condition pre-grading, auto-cataloging from photos. Fanatics' imaging scale is a training-data moat; this both reduces operating cost and could, over time, underpin a grading-independence play.

**4\. Liquidity engineering.** Push the vault toward an exchange-like experience (StockX-style bid/ask order books for highly fungible graded lots) so trading frequency — and thus take-rate revenue and data generation — rises. Liquidity is the product.

**5\. International + TCG expansion.** Voggt (Europe) and the Pokémon/TCG opportunity are growth frontiers where Fanatics lacks a rights moat and must win on platform quality. Decide deliberately how far to push beyond licensed sports cards.

**🏷️ The integration debt reality:** Fanatics grew by acquisition — PWCC (Collect), Topps (Collectibles), Voggt (Live in Europe), PointsBet (Betting). That means real **integration debt**: separate codebases, data models, identity systems, and vaults stitched together. A candid CTO narrative acknowledges that the "one platform" vision is as much a *consolidation and migration* program as a greenfield build — and that the sequencing of unification (identity first? catalog first? wallet first?) is the central architectural decision of the first two years.

## Module 8: The CTO Playbook — First 90 Days & Interview Prep

This module converts everything above into action: the metrics that matter, the risks to watch, the board narrative, a first-90-days checklist, and a set of questions you should be ready to answer (and ask) in the interview.

### The Metrics That Define Success

| Domain | Metric | Why it matters |
| --- | --- | --- |
| Liquidity | Vault inventory value; trades per vaulted asset / yr; time-to-resale | The core flywheel; higher velocity = more take-rate + more data. |
| Marketplace | GMV, take rate, active buyers/sellers, sell-through | Top-line health of the marketplace. |
| Auctions | Lots sold, hammer vs. estimate, close-time reliability, integrity flags | The high-margin, high-visibility surface. |
| Trust | Custody reconciliation accuracy, dispute rate, fraud loss, chargeback rate | One trust failure can dwarf a year of growth. |
| Data | Catalog coverage/accuracy, pricing-comp freshness, index adoption | The compounding moat. |
| Integration | Cross-surface conversion (Live→Collect, Commerce→Collect), single-identity adoption | Proof the flywheel is actually spinning. |

### The Risk Register

-   **Custody/ownership integrity** — existential; treat as a financial ledger.
-   **Auction integrity / shill-bidding** — active litigation in the space; auditability is mandatory.
-   **Grading dependence** — strategic reliance on a competitor-owned standard.
-   **Antitrust overhang** — Panini suit; Fanatics' rights-based moat invites scrutiny.
-   **Integration debt** — acquired stacks (PWCC/Topps/Voggt) must be unified.
-   **Market cyclicality** — the hobby boom/bust cycle directly hits GMV; build for resilience to volume swings.
-   **High-value fraud & AML** — six/seven-figure transactions change the fraud math.

### The Board Narrative

This board includes sophisticated financial investors and league/union representatives. They care about four things — translate every initiative into one of them:

-   **Growth / GMV & take rate** — liquidity engineering, integration cross-sell, international/TCG.
-   **Margin** — automation (CV/ML cutting manual cataloging & authentication cost), platform consolidation reducing duplicate spend.
-   **Moat / defensibility** — the integrated lifecycle, the pricing-data product, exclusive-rights advantages.
-   **Risk** — custody integrity, auction integrity, AML, antitrust-relevant auditability.

Never present a roadmap in pure technology terms ("we're rewriting the catalog service"). Present it as "this raises trading velocity X%, which lifts take-rate revenue $Y, while reducing custody risk."

### Your First 90 Days

**Days 1-30 — Listen & assess:**

-   Sit with vault operations for a full day. Watch a slab go from intake → imaging → grading → listing → sale → digital transfer → ship-out. Document every manual step and reconciliation point.
-   Pull the architecture reality: how separate are PWCC (Collect), Topps systems, and Voggt/Live? Where are the identity, wallet, catalog, and vault boundaries today?
-   Audit the custody ledger: how is physical-to-digital reconciliation done, how often, and what's the error rate? This is your highest-risk system.
-   Review auction-integrity controls and the audit trail in light of active shill-bidding litigation in the sector.
-   Map every grader integration (PSA/CGC/SGC/BGS) and quantify the dependency and cost.
-   Read the catalog: how canonical is it? How much listing data is human-entered vs. resolved? This predicts the quality of pricing and search.

**Days 31-60 — Diagnose & plan:**

-   Produce the integration-debt register and a sequenced unification plan (identity → wallet → catalog → vault). Get alignment with the Collectibles and Live leadership.
-   Establish the metrics dashboard above; get 60 days of baseline before claiming improvement.
-   Identify the highest-leverage ML bet on existing imagery (likely auto-cataloging or condition pre-grade) and a quick-win pilot.
-   Pressure-test auction concurrency and the custody reconciliation under stress; close any integrity gaps immediately.

**Days 61-90 — Commit & communicate:**

-   Present a phased roadmap framed in board terms (growth / margin / moat / risk), with the platform-unification thesis as the spine.
-   Define the build/buy/partner framework (Module 7) explicitly so every future decision references it.
-   Ship one visible, integration-proving thing — e.g., a card pulled on a Live break flowing into the Collect vault in one tap, or a real-time pricing widget on listings.
-   Establish rituals: weekly trust/integrity review (custody recon, fraud, auction flags), monthly architecture review, quarterly data-quality review.

### Questions To Be Ready For — and To Ask

**They may ask you:**

-   "How would you architect the vault's ownership ledger to guarantee no double-ownership?" → financial-ledger rigor, immutable audit, continuous reconciliation.
-   "How do you scale an auction engine for thousands of simultaneous closes with bid storms?" → append-only ledger, per-lot serialization, anti-snipe, Kafka + WebSocket fan-out.
-   "What's our biggest strategic technology risk?" → grading dependence + integration debt; the answer to both is the unified platform plus a sequenced grading-independence bet.
-   "Where does AI create the most value?" → ML on proprietary imagery (counterfeit/condition/auto-catalog) and pricing intelligence.
-   "Build vs buy on payments/grading/search?" → use the Module 7 matrix.

**You should ask them:**

-   How unified are Collectibles, Live, and Collect today — and is "one platform" actually the mandate?
-   What's the disclosed-internally state of custody reconciliation and auction integrity?
-   How does the org draw lines between Collect engineering and the broader Fanatics platform/Commerce engineering?
-   What's the appetite for a grading-independence investment, given the Collectors/PSA dependency?
-   How is success measured for this role in year one — GMV, integration milestones, or platform reliability?

**💡 The one-sentence thesis to walk in with:** "Fanatics is the only company that can own a collectible's entire life — printing it (Topps), selling it live (Live), and hosting its secondary market and custody (Collect) — and the CTO's job is to fuse those into one platform with a trustworthy custody ledger, a high-integrity auction engine, and an authoritative pricing-data moat, so the collectibles flywheel spins faster than any single-slice competitor can match."