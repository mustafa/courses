# The Agent–UI Protocol — Interactive Course

# The Agent–UI Protocol

What a standard protocol between an agent and a user interface actually buys you — built on Anthropic's CopilotKit × AG-UI quickstart, and stress-tested against a whiteboard tutor that already reinvented four fifths of it by hand.

10 modules

1 decision simulator

1 cost instrument

~100 min

Aug 2026 verified

Spine repo: [anthropics/claude-quickstarts → managed-agents/copilot-kit-ag-ui](https://github.com/anthropics/claude-quickstarts/tree/main/managed-agents/copilot-kit-ag-ui) — read from source, not from the rendered page

How to read this course

This is not a walkthrough of a README. The quickstart is 400 lines of glue and you could read it yourself in twenty minutes. The question worth a hundred minutes is the one the quickstart doesn't ask: **what does a standard protocol between an agent and a UI actually buy you, and when is it overkill?**

Three kinds of block recur. **Quickstart code** is real code from the Anthropic repo, unmodified and attributed. **Learn Imagine** is real code from your whiteboard tutor at `~/projects/learn-imagine-v4`. **Illustration** is mine — written to make a point, never run anywhere. Every claim about AG-UI, CopilotKit and Managed Agents was checked against source or primary docs in August 2026, and where the docs contradict the code I say which one I believe.

**Module 4 is a simulator. Do it before you read modules 5–10.** It makes you commit to a state-ownership call and write down why, then shows you what your call does on refresh, on interruption, and on a second tab. Committing before the reveal is the entire point; skipping ahead converts the module into agreement, which is worth nothing.

## Course Modules

1.  [What the quickstart actually isSource](#m1)
2.  [AG-UI, preciselyProtocol](#m2)
3.  [What breaks when you hand-roll itThe case for](#m3)
4.  [The State DeskSimulator](#m4)
5.  [What the abstraction costsThe case against](#m5)
6.  [The alternatives, fairlyComparison](#m6)
7.  [Learn Imagine: you already built itYour code](#m7)
8.  [Learn Imagine: the verdictDecision](#m8)
9.  [Coursera, at platform scaleExec](#m9)
10.  [Generative UI meets instructional designSynthesis](#m10)

## Module 1: What the quickstart actually is

Learning objectives

-   Name the four components and say which organisation owns each
-   Explain why the repo contains no bridge code of its own
-   Distinguish Managed Agents from the Agent SDK and from the Messages API
-   Identify the two design notes in the repo that are really bug reports about the ecosystem

### The one-sentence version, from the README

> A chat app where a Claude Managed Agent acts as a personal finance assistant. Anthropic hosts the agent loop and its container, CopilotKit renders the chat, and replies stream token by token. — `managed-agents/copilot-kit-ag-ui/README.md`

That is accurate and it hides the interesting thing. Four organisations' code has to agree on a wire format for that sentence to be true, and only one of the four pieces is Anthropic's.

| Piece | Who owns it | What it does here |
| --- | --- | --- |
| Claude Managed Agents | Anthropic | Hosts the agent loop and the Linux container. One financial-assistant agent on claude-fable-5 with the built-in toolset |
| @ag-ui/claude-managed-agents | AG-UI project (CopilotKit-led) | The whole Managed Agents ↔ AG-UI translation. Sessions, token streaming, tool events, interrupts, turn caps |
| CopilotKit v2 runtime | CopilotKit (Tawkit, Inc.) | Self-hosted CopilotSseRuntime on Express, serving /api/copilotkit |
| CopilotKit React v2 | CopilotKit | Stock CopilotChat. No custom chat code in the repo |

The line that tells you what this repo is

From `CLAUDE.md`, describing the adapter: *“This repo contains no bridge code of its own.”*

That is unusual for a quickstart and it is the strongest single signal about where the ecosystem is. Anthropic did not write a Managed Agents→UI adapter. They wired up someone else's, published three weeks earlier, at version `0.0.1`.

### The whole server integration, unabridged

This is the entire runtime wiring. Sixteen lines do the work that a hand-rolled streaming endpoint usually spends three hundred on.

QUICKSTART CODE — server/src/index.ts

```
const runtime = new CopilotSseRuntime({
  agents: {
    'financial-assistant': new ManagedAgentsAgent({
      managedAgentId: ids.agentId,
      agentVersion: ids.agentVersion,
      environmentId: ids.environmentId,
      backendTools: vizTools,
      sessionStore: store,
      sessionTitle: (threadId) => `Finance assistant thread ${threadId}`,
    }),
  },
});

const app = express();
app.use(
  createCopilotExpressHandler({
    runtime,
    basePath: '/api/copilotkit',
    cors: allowedOrigins ? { origin: allowedOrigins } : true,
  }),
);
```

`ManagedAgentsAgent` is a plain AG-UI `AbstractAgent`. That is the load-bearing fact of the whole architecture: because it implements one interface — `run(input): Observable<BaseEvent>` — the CopilotKit runtime doesn't know or care that Anthropic is on the other end. Swap in a LangGraph agent, a CrewAI crew, or a Bedrock AgentCore endpoint and the frontend does not change.

### Managed Agents is not the Agent SDK

The quickstart lives in a `managed-agents/` folder for a reason, and the distinction matters because it is where your infrastructure decision actually gets made.

|  | Messages API | Agent SDK | Managed Agents |
| --- | --- | --- | --- |
| Where the loop runs | You write it | A process you operate | Anthropic's infrastructure |
| Where the sandbox is | Yours | Yours | Anthropic's (Ubuntu 22.04, up to 8 GB RAM / 10 GB disk) |
| Conversation state | You resend it all | You hold it | Persisted server-side; you send only the newest event |
| Billing | Tokens | Tokens | Tokens + $0.08 per session-hour, metered while running |

The docs put it plainly: *“The difference is where they run: the SDK runs in a process you operate, while Managed Agents runs in Anthropic's infrastructure.”* Things you lose moving from SDK to Managed Agents and must reimplement client-side: plan mode, output styles, slash commands, `PreToolUse`/`PostToolUse` hooks, and `max_turns`.

Compliance constraint, and it is bigger than the model

Two independent blockers, both verified against Anthropic's own docs in August 2026:

-   `claude-fable-5` requires 30-day data retention and is **not available under zero data retention**. The README says this.
-   The README does **not** say this: **Managed Agents as a feature is ZDR-ineligible and HIPAA-ineligible regardless of model**, because *“sessions are stateful resources; transcripts persist until you delete them.”* That applies to `/v1/agents`, `/v1/sessions` and `/v1/environments`, including self-hosted sandboxes.

For a learning platform holding student work, that second one is a procurement conversation, not a config flag. Note it before you prototype, not after.

### The security posture is the most instructive file in the repo

The setup script provisions an environment with no outbound network at all, and turns off exactly one built-in tool. The comment explaining why is better security writing than most threat models:

QUICKSTART CODE — server/src/setup.ts

```
// The chat endpoint that fronts this agent is unauthenticated in the demo, so
// keep the blast radius small: the container gets no outbound network (bash
// and files still work for calculations), and web_fetch stays off because
// arbitrary URL fetches are the classic prompt-injection + exfil channel.
// web_search stays on for current rates and limits.
const environment = await client.beta.environments.create({
  name: `financial-assistant-demo-${Date.now().toString(36)}`,
  config: {
    type: 'cloud',
    networking: {
      type: 'limited',
      allowed_hosts: [],
      allow_package_managers: false,
      allow_mcp_servers: false,
    },
  },
});
```

The subtlety the comment doesn't mention

Anthropic's environments docs state that the `networking` field *“does not affect the `web_search` or `web_fetch` tools, which run on Anthropic's servers.”*

So `allowed_hosts: []` does not disable web fetching — it disables the *container's* egress. Turning off `web_fetch` in the toolset is what actually closes that door, and the quickstart does both, correctly. But if you copy only the networking block and leave `web_fetch` on, you have a container with no egress and a model that can still fetch arbitrary URLs through Anthropic. Restricting those two tools is a *separate* control (`allowed_domains` per tool, which unlike `allowed_hosts` rejects wildcards).

### Two design notes that are really ecosystem bug reports

Buried in `CLAUDE.md` are two notes that tell you more about the maturity of this stack than any version number:

The rxjs pin

*“`package.json` pins one `rxjs` version via `overrides` so the whole workspace shares a single copy: the AG-UI client and the CopilotKit runtime exchange RxJS observables, and two copies in the tree can break `instanceof` checks.”*

Two packages exchanging *objects* rather than *bytes* is not a protocol boundary. It is an in-process API boundary wearing a protocol's clothes.

The repl prompt line

*“The agent's system prompt tells it to call visual tools directly, never from inside repl scripts: a repl-wrapped custom tool call parks the session on the repl call itself, a state the adapter (0.0.1) reads as unanswerable and interrupts. Drop that prompt line once the adapter handles repl suspension.”*

An adapter bug, worked around in English, in the model's system prompt. That is a real production pattern and nobody enjoys it.

Takeaways

-   The quickstart is glue. The interesting engineering is in a third-party adapter at version `0.0.1`, first published 30 July 2026.
-   `ManagedAgentsAgent` implements one interface — that single fact is what makes the frontend vendor-neutral.
-   Managed Agents buys you a hosted loop and a hosted container, and costs you $0.08/session-hour plus ZDR and HIPAA eligibility.
-   Shared RxJS objects across the “protocol” boundary tell you this integration is tighter than the protocol framing implies.

## Module 2: AG-UI, precisely

Learning objectives

-   State what AG-UI is as an artifact — and what it is not
-   Enumerate the event categories and explain what each solves
-   Describe the snapshot/delta state model and its reconciliation failure mode
-   Say accurately what “transport agnostic” means in practice today

### What it is, as an artifact

| Full name | Agent–User Interaction Protocol |
| --- | --- |
| Who | CopilotKit. The docs say it was “born from CopilotKit's initial partnership with LangChain and CrewAI.” It lives in a separate GitHub org, ag-ui-protocol, but is CopilotKit-led in practice |
| Since | First npm publish 30 April 2025; repo created 7 May 2025 |
| Version | 0.0.58 — pre-1.0, 73 published versions, MIT |
| Traction | 14,207 GitHub stars, 333 open issues, releases roughly twice a week |

Is it a spec, or a TypeScript package?

Closer to the package end, and you should know this before you standardise on it. There is **no RFC-style normative document** with MUST/SHOULD language, **no versioned protocol revision**, and **no conformance suite**. What exists is a prose docs site, Zod schemas in TypeScript, Pydantic models in Python, and a `.proto` file.

The `EventType` enum in `sdks/typescript/packages/core/src/events.ts` is the de-facto normative artifact. Everything else — the Python, .NET, Kotlin, Go, Rust, Ruby, Dart and C++ SDKs — is ported against it.

Practical consequence: “we're AG-UI compliant” is currently an unfalsifiable claim. Nobody can test it.

### The event vocabulary

The widely repeated figure is “16 event types.” That was the May 2025 launch set, and AG-UI's own architecture page still says it. The current enum has **33 members: 28 active and 5 deprecated**. If a blog post tells you 16, it is a year out of date — and so, on this page, are the official docs.

| Category | Events | The problem it solves |
| --- | --- | --- |
| Lifecycle (5) | RUN_STARTED RUN_FINISHED RUN_ERROR STEP_STARTED STEP_FINISHED | Turn boundaries. RUN_FINISHED carries usage and an outcome of success or interrupt |
| Text message (4) | TEXT_MESSAGE_START _CONTENT _END _CHUNK | Token streaming with explicit framing. _CONTENT carries a delta |
| Tool call (5) | TOOL_CALL_START _ARGS _END _CHUNK _RESULT | Streaming tool arguments as JSON fragments, with an explicit end. This is where generative UI hangs |
| State (3) | STATE_SNAPSHOT STATE_DELTA MESSAGES_SNAPSHOT | A shared state object between agent and UI. The most consequential category |
| Activity (2) | ACTIVITY_SNAPSHOT ACTIVITY_DELTA | Structured progress ("PLAN", "SEARCH") that is not a message |
| Reasoning (7) | REASONING_START REASONING_MESSAGE_START _CONTENT _END _CHUNK REASONING_END REASONING_ENCRYPTED_VALUE | Thinking, renderable separately from the answer |
| Special (2) | RAW CUSTOM | The escape hatches. See below — they matter more than they look |
| Deprecated (5) | THINKING_START THINKING_END THINKING_TEXT_MESSAGE_START _CONTENT _END | Superseded by REASONING_*. Removal targeted for 1.0.0 — a scheduled breaking change |

Note that the rename was not a clean prefix swap: `THINKING_TEXT_MESSAGE_START` became `REASONING_MESSAGE_START`, dropping the `TEXT_` segment. Every event also carries `type`, optional `timestamp`, `rawEvent` and `metadata`, and the Zod schemas are `.passthrough()`, so unknown fields survive.

### Why this is not just streaming tokens

The difference is not the streaming. It is the **framing**. Compare:

Streaming tokens

One channel, one meaning. Everything is text. A tool call is text you have to detect. A partial JSON argument is text you have to try parsing. The end of a thought is text you have to guess.

Your client is a parser, and every parser is a place bugs live.

A framed event stream

`TOOL_CALL_START` tells you a tool call is beginning and names it. `TOOL_CALL_ARGS` gives you fragments you know are incomplete. `TOOL_CALL_END` tells you it is safe to parse.

Your client is a dispatcher. There is nothing to guess.

Module 7 shows what happens when you don't have that framing, using real code from Learn Imagine that exists *only* because a chunk boundary inside a JSON string still parses as valid JSON.

### The state model — and its soft failure

This is the part with real intellectual content, and the part with the real hazard.

-   **`STATE_SNAPSHOT`** carries the complete state object. The docs are emphatic: frontends should *“replace their existing state model with the contents of this snapshot rather than trying to merge it with previous state.”*
-   **`STATE_DELTA`** carries an array of **JSON Patch operations (RFC 6902)** with JSON Pointer paths (RFC 6901). The reference client applies them with `fast-json-patch` as `applyPatch(state, delta, true, false)` — validate on, mutate off, so patches apply atomically to a new document.

Read this before you build on shared state

On patch failure the reference client **`console.warn`s and calls `emitNoUpdate()`** — it silently drops the patch and continues. The docs say that if a frontend detects inconsistency it *“may request a fresh `STATE_SNAPSHOT`”*, but **there is no protocol event for the client to request one**.

There are no sequence numbers, no version vectors, no checksums. **Divergence detection is entirely your application's problem.** Stream resumption exists only as a reserved, unimplemented transport flag.

If you are building a system where a silently-diverged UI would be worse than a visibly-broken one — a tutor drawing a diagram, say, or a grader showing a rubric — you must build your own reconciliation on top. The protocol gives you the transport and hands the correctness back.

### “Transport agnostic” means SSE

The docs claim support for *“Server-Sent Events (SSE), webhooks, WebSockets, and more.”* Checked against the repo in August 2026:

| Transport | Reality |
| --- | --- |
| HTTP SSE | The real transport. EventEncoder.encode() unconditionally calls encodeSSE(). The reference HttpAgent hardcodes Accept: text/event-stream |
| Protobuf | TypeScript only, and the .proto enum is frozen at the 16 launch events — no TOOL_CALL_RESULT, no REASONING_*, no ACTIVITY_*. The binary transport silently carries about half the protocol |
| WebSockets | Not implemented in the core SDKs. Open feature requests. AWS Bedrock AgentCore exposes a /ws endpoint, but that is AWS's own contract, not AG-UI core |
| Webhooks / resumable | Boolean capability flags with no implementation |

The honest reading: *transport agnostic* means the event schema embeds no transport assumptions — they are JSON objects with a `type` discriminator, so you could put them on anything. It does not mean the SDKs give you a choice today. Design as if it is SSE, because it is.

The sentence most people get wrong

Verbatim from AG-UI's own docs: **“AG-UI is not a generative UI specification.”**

It positions itself as the *transport* that carries generative-UI payloads defined elsewhere — A2UI (Google), Open-JSON-UI (OpenAI), MCP-UI. The generative UI in the Anthropic quickstart is not an AG-UI feature at all: it is CopilotKit matching a `TOOL_CALL_START` name against a React component it was told about. The protocol carries the tool call. **CopilotKit does the generative UI.**

This distinction decides your lock-in exposure, so it recurs in Module 5.

### Where it sits in the protocol landscape

The three-legged framing — MCP for agent-to-tool, A2A for agent-to-agent, AG-UI for agent-to-user — is **verbatim from AG-UI's own docs**, on a page called *agentic-protocols*. Two caveats worth carrying:

-   It is **self-positioning by the party that benefits from it**. Neither Anthropic nor Google has endorsed a three-legged stool. It is a useful mental model and a marketing frame at the same time.
-   The boundary is already blurring: AG-UI declares `MultiAgentCapabilities` with `delegation`, `handoffs` and `subAgents`, and there is an open issue proposing subagent support in the protocol. That is A2A's layer.

The docs also describe AG-UI, approvingly, as the *“kitchen sink protocol — informed by bottom-up, real-world needs”* whose mandate is *“to support the full set of building blocks required by modern agentic applications.”* Hold that sentence next to “33 event types and growing” and you have a fair prediction of where it goes.

Takeaways

-   AG-UI is a pre-1.0 TypeScript-schema-as-spec at 0.0.58, with no conformance suite. Real adoption, immature governance.
-   33 events, not 16. The official architecture page is wrong; the enum is right.
-   `STATE_DELTA` is RFC 6902 JSON Patch. Failure is **silent** and there is no way to ask for a resync.
-   Transport agnostic means SSE. Protobuf carries half the protocol; WebSockets do not exist.
-   AG-UI explicitly is **not** a generative UI spec. That is CopilotKit's layer, and it is where lock-in lives.

## Module 3: What breaks when you hand-roll it

Learning objectives

-   Name the five recurring failures of hand-rolled agent→UI streaming
-   Explain why partial-JSON streaming produces a class of bug that framing eliminates
-   Recognise out-of-band signalling as a symptom, not a technique
-   Predict which of the five your own system already has

Every team that ships an agent with a non-trivial UI hits the same five walls. The order is remarkably consistent, because each one is only visible once you've solved the previous one.

### 1\. No frame boundary, so you write a parser

You stream JSON. The client wants to render as it arrives. But a chunk can split anywhere — including inside a string — and the truncated result is often *still valid JSON*. So `{"text": "Hel"}` parses cleanly and you render “Hel” as a finished sentence.

Every team invents the same fix: never trust the last element. Then they invent the second fix: repair known model near-misses. Then the third: rescue turns the model double-encoded. Module 7 has all three, from your own repo, with dates in the comments.

A framed protocol deletes this category. `TOOL_CALL_ARGS` deltas are *declared* incomplete; `TOOL_CALL_END` declares them complete. There is nothing to infer.

### 2\. State divergence, with no shared source of truth

The agent believes the UI shows one thing. The UI shows another. Nothing detects it.

This is the expensive one, because it does not fail loudly. It fails as a tutor referring to a diagram the student cannot see, or a copilot citing a row that scrolled away. The hand-rolled fix is almost always the same: **re-send the entire state to the model every turn, serialised as prose**. It works, and it costs tokens linearly in state size, forever. Module 9 puts a number on that.

### 3\. Tool-call rendering, and the args-shape problem

Rendering a tool call as a component sounds trivial until you meet the wire format. The quickstart's comment on this is one of the most useful things in the repo:

QUICKSTART CODE — web/src/viz/renderers.tsx

```
/** Tool args have arrived in several shapes across CopilotKit versions: a
 *  typed object, an object with every number stringified, and an object whose
 *  nested arrays/objects are JSON strings. Normalize the structure here and
 *  let the schemas' z.coerce handle stringified leaf numbers. */
const asRecord = (parameters: unknown): unknown => {
  let value = parameters;
  if (typeof value === 'string') {
    try { value = JSON.parse(value); } catch { return parameters; }
  }
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, field]) => [key, parseStructured(field)]),
    );
  }
  return value;
};
```

Read the design note that goes with it, from `CLAUDE.md`: *“blind-spreading `props.parameters` breaks silently when the wire format shifts.”*

Score this honestly against the protocol argument

This is a defensive parser **inside the protocol-adopting solution**. AG-UI standardised the event envelope; it did not standardise the payload shape well enough for CopilotKit to keep it stable across its own versions. The quickstart still has to coerce.

So “adopt a protocol and stop writing parsers” is overclaiming. The accurate claim is narrower and still worth a lot: **you stop writing parsers for framing, and you keep writing them for payloads.**

### 4\. Interruption and resumption

What happens when the user hits stop, or closes the tab, or the network drops mid-turn?

Hand-rolled systems usually pick one of three unsatisfying answers: lock the input so interruption is impossible; let the user interrupt and throw away the partial turn; or let the user interrupt and keep a partial turn that nobody can reconstruct. AG-UI's answer is `RUN_FINISHED` with `outcome.type === "interrupt"` — a first-class, renderable, resumable outcome, which CopilotKit surfaces through `useInterrupt`.

Worth knowing that the protocol's own record here is imperfect: an open issue reports that a user-triggered `stopGeneration` produces a server `ECONNRESET` rather than a clean abort. The *model* is right; the implementation is 0.0.58.

### 5\. Human-in-the-loop approvals

The moment an agent can do something consequential, someone will ask for an approval step. Hand-rolled, this means inventing a pause-and-resume protocol inside your own stream: a message type that means “I am waiting,” a way to carry the user's answer back into the same turn, and a way to not lose it on refresh.

CopilotKit v2 gives you two distinct mechanisms, and the distinction is worth learning because people conflate them:

| Hook | Who pauses | Use when |
| --- | --- | --- |
| useHumanInTheLoop | The model, by calling a registered client-side tool | The agent decides it needs a human. No handler — the render gets a respond callback, defined only while status is Executing |
| useInterrupt | The graph/runtime, calling interrupt(...) | Your orchestration decides. Render receives { event, resolve, cancel } |

API drift worth knowing before you write code

CopilotKit v2 renamed most of its surface, and a lot of tutorials on the web are v1:

-   `useCopilotAction` → `useFrontendTool` (Zod schemas now, not parameter arrays)
-   `useCopilotReadable` → `useAgentContext`
-   `useCoAgent` → `useAgent`
-   `useLangGraphInterrupt` → `useInterrupt`
-   `renderAndWaitForResponse` → **gone**; it is the `respond` callback now

And `useRenderTool` — the hook the quickstart uses — is **not** the successor to `useCopilotAction`. It is a different, render-only hook with no handler, which is exactly right for a tool that executes server-side in the managed session.

### The symptom checklist

You can diagnose a hand-rolled pipeline without reading its architecture doc. Look for these:

| Symptom | What it means |
| --- | --- |
| A function called repair, rescue, normalize or coerce on inbound model output | No frame boundary. You are parsing, not dispatching |
| Signals travelling in HTTP response headers | No event channel for anything that isn't the main payload |
| The full UI state re-serialised into the prompt every turn | No shared state. You are paying tokens for reconciliation |
| Input disabled while the agent works | No interrupt outcome. Interruption was made impossible rather than handled |
| A bespoke fixture-replay harness for the UI | You have an event log and no standard way to inspect it |
| A no-transform or X-Accel-Buffering header that is load-bearing | An unframed stream that a CDN can truncate without anything noticing |

Learn Imagine has **all six**. That is not a criticism — it is what a well-built system looks like when it solves these problems before a standard existed. Module 7 walks each one with the file and line.

Takeaways

-   The five walls: framing, state divergence, tool rendering, interruption, approvals. In that order, always.
-   Framing is the one a protocol genuinely deletes. The rest it standardises but does not solve for you.
-   The quickstart still needs a defensive args parser — adopting a protocol reduces parsing, it does not end it.
-   Out-of-band signalling (headers, side channels) is the clearest diagnostic that your stream has no event vocabulary.

## Module 4: The State Desk

Learning objectives

-   Assign a piece of application state to the layer that should own it, and defend the call
-   Predict the behaviour of each assignment under refresh, interruption, and a second client
-   Recognise that the protocol-maximalist answer is sometimes the impossible one
-   Read your own recorded reasoning back against the consequence

How this works

You are the architect on an AI tutor with a whiteboard. Five pieces of state come across your desk. For each one you decide which layer owns it — **the agent** (server-side, in the model's session), **the protocol** (an AG-UI event carries it), or **the UI** (the client derives or holds it) — and you write one line saying why.

The results stay locked until you have both. Then each call is run through three stress tests: **a browser refresh mid-lesson**, **a student interruption**, and **a second tab**. Every consequence is precomputed and deterministic — nothing here is generated, and the same call always produces the same result.

Two of the five have an answer that will annoy you. One of them is a trap: the layer that looks most principled cannot actually do the job, because the protocol does not implement the thing its own docs advertise.

Simulator

### Loading…

1 / 5

Divergence ledger 0

-   Nothing broken yet. Every call you make adds its failure modes here.

One line: why this layer? (You cannot see the results until you write it.)

Pick a layer and write one line of reasoning to unlock.

Your decision ledger

#### Transfer exercise

Deliberately not a whiteboard problem, and the mechanism involved was never shown to you above. Nothing is graded — but if you can't answer these, the simulator taught you a pattern rather than a principle.

1\. A course-authoring copilot lets an instructor and the agent co-edit a syllabus outline. Two instructors have it open at once. Which layer owns the outline, and what does AG-UI give you and not give you here?

2\. You adopt `STATE_DELTA` for the outline. On Tuesday a patch fails to apply on one client. Describe exactly what the learner sees, and what you had to build yourself for anyone to ever find out.

3\. Give one piece of state in a learning product where the right owner is *the agent*, and explain why deriving it in the UI would be wrong rather than merely inconvenient.

What the desk was actually teaching

-   **Derived beats stored.** Three of the five have a UI answer that wins, and it wins for the same reason each time: a pure function of an append-only log survives refresh, interruption and a second client for free.
-   **The protocol's job is the turn, not the truth.** AG-UI is excellent at carrying pause, resume and tool activity. It is not a store, and treating it as one is how you get silent divergence.
-   **Check whether the feature exists before you architect on it.** Round 4 is a trap because resumable streams are advertised in the capability surface and implemented nowhere.
-   **Determinism is a load-bearing property.** The layout answer only works because the function is pure. One `Date.now()` and the whole argument collapses.

## Module 5: What the abstraction costs

Learning objectives

-   Locate where lock-in actually lives — it is not the protocol
-   Describe the debugging surface a protocol layer adds
-   State the honest latency and bundle costs
-   Make the “just use SSE” argument well enough to have to answer it

### Lock-in is in the client, not the protocol

The protocol is MIT, has nine community SDKs, and three hyperscalers ship it. On paper it is the least lock-in-shaped thing in your stack. The lock-in is one layer up.

Recall that AG-UI states plainly it **is not a generative UI specification**. So the thing you actually want — a tool call becoming a React component, sliders that recompute client-side, an approval gate that pauses the agent — is **CopilotKit's**. Concretely, in the quickstart: `useRenderTool`, `CopilotKitProvider`, `CopilotChat`, `CopilotSseRuntime`, `createCopilotExpressHandler`. Those are the five symbols that would have to be rewritten if you left. The AG-UI events would survive; the surface that makes them useful would not.

CopilotKit is MIT and self-hostable, which is genuinely more than most of the category offers. But the commercial gradient is real and worth reading before you commit:

| Capability | OSS | Paid platform |
| --- | --- | --- |
| Chat UI, frontend tools, generative UI, agent state | ✓ |  |
| Any AG-UI integration, self-hosted runtime | ✓ |  |
| Conversation history surviving reload or device change |  | ✓ |
| Thread API, realtime cross-tab / cross-device sync |  | ✓ |
| Hosted inspector, admin console, multi-tenancy |  | ✓ |

Pricing is Developer free, Pro $39/mo, Team $100/seat/mo, Enterprise custom. Note precisely which rows are paid: **persistence and multi-client sync** — which is to say, three of the five stress tests from Module 4. The protocol does not standardise persistence, and the reference implementation sells it. That is a coherent business model and you should still see it clearly.

The clearest public criticism

From Hacker News, and it is the recurring one: *“But even with AG-UI, CopilotKit is a paid service. Everyone's trying to do vendor…”*

The docs partly concede the shape of it. Describing their OpenTag product, they note the agent is self-hosted *“while platform credentials and message delivery are handled by CopilotKit Intelligence — a hosted service, not part of the protocol.”* An open protocol that funnels toward a commercial client is a well-worn pattern. It is not disqualifying. It is a thing to price in.

### Debugging through a protocol layer

When your hand-rolled stream misbehaves, there are two places to look: your server and your client. With this stack there are five, and the failure can be in any of them:

1.  The Managed Agents session (Anthropic's infrastructure — you get the Console trace)
2.  The `@ag-ui/claude-managed-agents` adapter, at 0.0.1
3.  The AG-UI event stream itself
4.  The CopilotKit runtime's transformation of those events
5.  Your React renderers

Two of those five you cannot step through. The quickstart's own troubleshooting list is the evidence: `instanceof` errors mentioning Observable (duplicate rxjs), a repl-parked session the adapter interprets as unanswerable, tool args arriving in three different shapes across runtime versions. None of those are bugs in the finance assistant. All of them cost the author time.

The mitigation is real, and it is the best thing about the Managed Agents half of this stack: every session logs a Console trace URL, and the Console gives you a timeline minimap, a full transcript grouped by model request with thinking and tool inputs/results, and an inspector with Session, Events, Tools, Resources and Threads tabs, downloadable as JSON. That is genuinely better observability than most teams build for themselves.

### Latency and bundle

| Cost | Honest size |
| --- | --- |
| Per-event overhead | Negligible. SSE framing plus a JSON envelope. Nobody's tutor is slow because of this |
| Extra hop | One. Browser → your runtime → Anthropic. Real but constant, and you were going to proxy anyway to keep the API key off the client |
| Bundle | Measurable. Protobuf is force-bundled into @ag-ui/client and cannot be tree-shaken — there is an open issue asking to expose the HTTP client without it. You ship a binary codec that carries half the protocol and that the reference client never even offers in its Accept header |
| Turn cap | The adapter defaults to a 300s per-turn timeout. Fine for finance, worth checking for anything longer-running |

### The “just use SSE” argument, made properly

Sourcing note

I went looking for this argument in public and could not find anyone making it — not on HN, not in GitHub issues, not in blog posts. So the version below is mine, not a citation. Treat it as a steelman to argue with, not as evidence of a backlash.

The argument runs like this. You already have SSE. You already have JSON. A discriminated union over a `type` field is thirty lines of TypeScript and a Zod schema. What AG-UI adds is not a capability — it is *agreement*, and agreement is only valuable if you are actually going to interoperate with someone.

So the question is not “is a protocol good?” It is: **who is the second party?**

| Your situation | Verdict |
| --- | --- |
| One agent, one frontend, one team, one repo | Roll your own. There is no second party. You are paying interop tax for interop you will never do |
| You want CopilotKit's components without rewriting them | Adopt. This is the honest, sufficient reason and most adopters' actual reason |
| Multiple agent runtimes behind one UI, or one agent surfaced in several UIs | Adopt. This is what the protocol is for and it earns its keep immediately |
| You are a platform and third parties will build agents that appear in your product | Adopt, and go further — you need a contract you can publish and version |
| You need pause/resume, approvals and tool rendering, and you have not built them yet | Adopt. You would be rebuilding a well-specified vocabulary from scratch |

The counter to the counter: your second party is often **future you**. The event vocabulary you invent this quarter is the one you are stuck with in three years, and it will not have an interrupt outcome in it, because you did not need one yet. That is exactly what happened in Learn Imagine, and Module 7 shows the line of code where it happened.

### What AG-UI does not standardise

There is no published non-goals section. I looked. The boundaries below are inferred from absence plus one first-party integrator's docs, which means **they are not commitments and could change**:

-   **Auth.** Nothing. Microsoft's integration docs say it plainly: *“AG-UI does not include a built-in authorization mechanism”*, adding *“do not expose AG-UI servers directly to untrusted clients”* and documenting five injection vectors — message list, client-side tool, state, context, and forwarded-properties injection. They recommend a trusted-frontend/BFF pattern.
-   **Persistence.** `threadId` and `runId` are opaque strings. No store, no history endpoint, no retention semantics. Microsoft again: *“don't treat a thread ID as proof of identity or ownership.”*
-   **State shape.** `snapshot` is typed `any`. AG-UI standardises how state moves, never what is in it.
-   **Error taxonomy.** `RunError.code` is a free string. AWS had to invent its own `UNAUTHORIZED`/`SESSION_BUSY`/`AGENT_ERROR` codes to make it usable.
-   **Ordering, delivery guarantees, rate limiting, retry, billing.** All yours.

Takeaways

-   Lock-in lives in CopilotKit's React surface, not in AG-UI. Five symbols is the switching cost.
-   Persistence and multi-client sync — three of the five Module 4 stress tests — are the paid tier.
-   Five debugging surfaces, two of which you cannot step through. The Console trace is the real mitigation.
-   “Just use SSE” is a good argument and the answer is always “who is the second party?”
-   No auth, no persistence, no state shape, no error taxonomy, no non-goals document. Plan for all five.

## Module 6: The alternatives, fairly

Learning objectives

-   Place four alternatives on the same axes as AG-UI
-   Explain why the Vercel AI SDK is the real competitor and what it deliberately omits
-   Distinguish MCP-UI from AG-UI — and A2UI from both
-   Pick the right one for a stated situation without defaulting

| Option | Wins when | Loses when |
| --- | --- | --- |
| Raw SSE + your own event union | One agent, one UI, one team. Total control, zero dependency risk, no version churn, smallest bundle | You need pause/resume, approvals or shared state — you will rebuild all of it, worse, later |
| Vercel AI SDK (useChat, streamObject) | Next.js, chat-shaped, provider-agnostic. Best-in-class DX. Streaming structured output is genuinely excellent — it is what Learn Imagine runs on | You need a protocol rather than a library. There is no shared-state channel, no standard interrupt outcome, and the wire format is an implementation detail rather than a contract |
| LangGraph's own UI bindings | You are already all-in on LangGraph. Interrupts, checkpointing and time travel come from the graph runtime, which is a genuinely stronger resumption story than AG-UI has | You are not on LangGraph. Note that LangChain is an AG-UI launch partner — these are complements, and @ag-ui/langgraph is the second most downloaded package in the ecosystem |
| MCP-UI | A tool wants to return a piece of interface. The unit is a resource returned from a tool call, not a stream of agent events | You want to render the agent's process — its thinking, its progress, its pause. MCP-UI has nothing to say about that. Different layer, not a competitor |
| A2UI (Google) / Open-JSON-UI (OpenAI) | You want a portable declarative description of UI a model can emit | You want the transport. AG-UI's docs position these as payloads AG-UI carries, not rivals. The name collision with AG-UI is unfortunate and their docs apologise for it |

### The comparison that actually matters

For your stack the real fork is **Vercel AI SDK versus AG-UI**, because you are already on the former and it is not obviously worse. The distinction is not quality — it is category.

The AI SDK is a library

It gives you excellent primitives for getting model output into React. `streamObject` with `output: "array"` streams a growing typed array; `useObject` reconstructs partials. That is a very good library.

The wire is `text/plain` chunked partial JSON. That is fine, because the library owns both ends and nobody else is meant to read it.

AG-UI is a contract

It gives you a named, enumerable, versioned vocabulary that a second party can implement without talking to you.

The cost is that it is pre-1.0 with a scheduled breaking change, has no conformance suite, and its best client is commercial above a line. The benefit is that the vocabulary includes concepts — interrupt outcome, state delta, activity, reasoning — that you would not have invented until you needed them.

The non-obvious point

These are not exclusive, and the cheapest useful move is to steal the **vocabulary** without adopting the **stack**.

You can keep `streamObject` and still name your events after AG-UI's, still add an explicit end-of-args frame, still model interruption as a first-class outcome rather than a disabled input. That gets you most of the design benefit at zero dependency cost, and it leaves a real migration path open if the ecosystem consolidates. Module 8 makes this the recommendation.

### Adoption signal, read carefully

The npm numbers look enormous and are partly an artifact. `@ag-ui/core` shows ~5.9M downloads a month, but `@ag-ui/proto` (4.33M) and `@ag-ui/encoder` (4.33M) sit within 2% of `@ag-ui/client` (4.27M) — exactly what you would expect if they are forced transitive dependencies, which the open bundle-size issue confirms. So read it as roughly **one number around 4.3M, counted four times**, plus ~1.5M direct `core` installs. Real, and not 6M-distinct-adopters real.

The signal that *is* strong is institutional: **AWS** documents AG-UI as a Bedrock AgentCore Runtime protocol contract alongside A2A, **Microsoft** publishes dedicated AG-UI security and integration docs for Agent Framework, and **Google** ADK has a supported middleware. Three hyperscalers shipping it is meaningfully beyond “one startup's protocol.”

The counter-signal: the Show HN launch got **36 points and 5 comments**, two of them from CopilotKit staff, and the most substantive outside comment was straightforward confusion about what it was for. Later AG-UI stories got 7 and 6 points. Star count and practitioner traction are badly out of step, and that gap is worth watching rather than dismissing.

Takeaways

-   MCP-UI and A2UI are different layers, not competitors. Only the AI SDK and raw SSE actually compete.
-   The AI SDK is a better library; AG-UI is a contract. Pick by whether you have a second party.
-   You can adopt the vocabulary without the stack. That is the cheapest 80%.
-   Hyperscaler adoption is the strong signal; npm downloads are inflated by forced transitives; HN traction is thin.

## Module 7: Learn Imagine: you already built four fifths of it

Learning objectives

-   Map the board action vocabulary onto AG-UI event types, and identify what has no equivalent
-   Locate the four pieces of scar tissue that framing would have prevented
-   Explain why the layout engine is the strongest part of the design and the hardest to migrate
-   State exactly which files a migration touches

What this module is reading

`~/projects/learn-imagine-v4` — a single Next.js 16 app (App Router, React 19, Vercel AI SDK v6, Neon Postgres + Drizzle, zod v4). No Python, no separate model backend. The board pipeline is **30 non-test files, 7,176 lines — about 48% of the codebase**. Its own `CLAUDE.md` and `PLAN.md` are unusually accurate; I checked their claims against the code and found no drift.

### The vocabulary you already have

The whiteboard's wire format is a zod v4 discriminated union on `op`. Its header comment states the design intent better than most protocol specs do:

LEARN IMAGINE — lib/board/actions.ts

```
// The whiteboard's wire format. The LLM emits a stream of these validated
// actions — never markup, never pixels. The shape model IS the wire format
// IS the prompt serialization IS the DB row: zero impedance mismatch.
//
// ONE stable schema forever: the action array is part of the Anthropic
// prompt-cache prefix (jsonTool mode) — never mint per-turn variants.

export const BoardAction = z.discriminatedUnion("op", [
  SayAction, AddTextAction, AddMathAction, AddArrowAction, AddShapeAction,
  AddGraphAction, AddTableAction, HighlightAction, AnnotateAction,
  DeleteAction, MoveViewAction, AskCheckAction, PauseAction,
]);
```

Thirteen ops. Plus a separate student vocabulary (`student_pen`, `student_text`, `student_erase`, `message`, `check_answer`, `look_at_work`, `start`) and a system vocabulary (`turn_end`, `session_end`), wrapped in an actor-tagged envelope:

LEARN IMAGINE — lib/board/actions.ts

```
export type BoardEventPayload =
  | { actor: "ai"; action: BoardActionT }
  | { actor: "student"; event: StudentEvent }
  | { actor: "system"; event: { kind: "turn_end"; turnId?: string }
                            | { kind: "session_end" } };
```

Stop and notice what that is. An **actor-tagged, append-only event log with a closed vocabulary and server-assigned sequence numbers**, persisted to `board_events` with a `unique(board_session_id, seq)` constraint, where `fold(events)` reconstructs the entire board. You did not build a chat app that happens to draw. You built an event-sourced system.

### The mapping

| Learn Imagine | AG-UI equivalent | Fit |
| --- | --- | --- |
| say | TEXT_MESSAGE_START / _CONTENT / _END | Clean. You would gain token-level streaming of speech, which you currently don't have — a whole say arrives at once |
| add_text add_math add_arrow add_shape add_graph add_table | TOOL_CALL_START / _ARGS / _END, rendered by useRenderTool | Clean, and this is the headline. Six of your thirteen ops are precisely the quickstart's show_payoff_timeline pattern — a named call with typed args that mounts a component |
| ask_check answer handling | TOOL_CALL_RESULT | Note this event is one of the ones the protobuf transport silently drops. Irrelevant on SSE; a landmine if anyone ever enables binary |
| highlight annotate delete move_view | Also TOOL_CALL_*, but semantically these are mutations of existing board state | Awkward. These are the cleanest argument for STATE_DELTA instead: highlight on shape m2 is a JSON Patch replace on /shapes/m2/tone, not a new tool call |
| ask_check | useHumanInTheLoop — a tool the model calls that pauses until respond fires | Very clean, and an upgrade. Today your check gate is enforced by the client refusing input. Under the protocol the agent is genuinely paused |
| pause_for_student | RUN_FINISHED, or an interrupt outcome | Clean. This is your turn terminator; it maps to the lifecycle layer |
| The board itself — fold(board_events) | STATE_SNAPSHOT / STATE_DELTA | This is the real prize, and the real risk. See below |
| Layout positions | No equivalent | Does not fit, and should not. Positions are derived. Putting them on the wire would be a category error — you covered this in Module 4, round 1 |
| student_pen ink | No equivalent | Does not fit. AG-UI is agent→user. There is no standard event for user-generated canvas content flowing the other way; you would use CUSTOM, which is the “we didn't standardise this” escape hatch |
| Vision snapshot (board rasterised to PNG, sent as an image content part) | No equivalent | Does not fit. This rides on the model request, not the event stream, and AG-UI has nothing to say about model inputs |

### What the mapping looks like in code

Here is the quickstart's tool contract — the thing the agent sees, which the adapter registers on each session and CopilotKit renders as a React component. Compare its shape to your `AddMathAction`:

QUICKSTART CODE — server/src/vizTools.ts

```
/** ... The rendering IS the result, so the handlers ignore
 * their input and just confirm. */
const rendered = (name: string) => () =>
  `Rendered "${name}" to the user as an interactive visual.`;

export const vizTools: BackendCustomTool[] = [
  {
    name: 'show_payoff_timeline',
    description:
      'Render an interactive debt-payoff chart in the chat: remaining balance by month, ' +
      'payoff date, and total interest, with a payment slider the user can drag ...',
    parameters: {
      type: 'object',
      properties: {
        title:          { type: 'string', description: 'Short chart title' },
        principal:      { type: 'number', exclusiveMinimum: 0 },
        aprPercent:     { type: 'number', minimum: 0, maximum: 100 },
        monthlyPayment: { type: 'number', exclusiveMinimum: 0 },
      },
      required: ['title', 'principal', 'aprPercent', 'monthlyPayment'],
    },
    handler: rendered('show_payoff_timeline'),
  },
  // ... show_growth_projection, show_budget_breakdown, show_comparison
];
```

Three things to notice, because all three are already true of your board and none of them is obvious.

**The handler ignores its input and returns an acknowledgement.** The rendering *is* the result; the ack exists only to let the turn keep flowing. That is exactly your `add_math` — the model does not need a return value, it needs the shape to appear.

**The visual tools are deliberately not registered on the agent.** Per `CLAUDE.md`: *“setup does not put them on the agent. The adapter registers them on each session as tool overrides… so changing a tool contract never requires re-provisioning.”* This is the architectural inverse of your cache law and worth sitting with: the quickstart optimises for *changing the vocabulary cheaply*; Learn Imagine optimises for *never changing it*, because the vocabulary is the cache prefix. Neither is wrong. They are different bets about how settled your vocabulary is.

**Sliders recompute client-side without another agent turn.** Also from `CLAUDE.md`: *“The agent supplies starting numbers, and the sliders recompute everything client-side without another agent turn.”* That is the single most transferable idea in the quickstart for a tutoring product. A student dragging a parameter on a graph should not cost a model call — and today, in Learn Imagine, exploring a graph means asking the tutor.

For contrast, the same contract expressed as an AG-UI event sequence rather than a tool definition. This one is mine, written to show the framing — it is not from either repo:

ILLUSTRATION — not from either repo

```
// what the browser would actually receive, one SSE frame per line
{ "type": "TOOL_CALL_START", "toolCallId": "tc_7", "toolCallName": "add_math" }
{ "type": "TOOL_CALL_ARGS",  "toolCallId": "tc_7", "delta": "{\"id\":\"m2\",\"la" }
{ "type": "TOOL_CALL_ARGS",  "toolCallId": "tc_7", "delta": "tex\":\"(x+5)(x-2)=0\"" }
{ "type": "TOOL_CALL_ARGS",  "toolCallId": "tc_7", "delta": ",\"place\":{\"col\":\"work\",\"below\":\"m1\"}}" }
{ "type": "TOOL_CALL_END",   "toolCallId": "tc_7" }   // <- now, and only now, parse
```

The second frame is `{"id":"m2","la` — unparseable, and *declared* unparseable. Under your current transport the equivalent moment is a growing array whose tail happens to parse as a complete action. That single difference is the whole tail-holding problem, and it is the first piece of scar tissue below.

### The four pieces of scar tissue

Each of these exists because the transport has no frames. Each has a dated comment. This is the strongest evidence in the course for what framing buys, because it is evidence from your own repo.

#### 1\. The tail element is never trusted

LEARN IMAGINE — components/board/useActionPlayer.ts

```
/** Feed the streaming partial array. The TAIL element is never applied —
 *  a chunk boundary inside a string still parses ({"text":"Hel"} is a
 *  valid say), so the tail only commits via finish() or once the stream
 *  grows past it. */
```

That comment is the entire case for `TOOL_CALL_END` in three lines. Under a framed protocol there is no tail problem, because incompleteness is *declared* rather than inferred.

#### 2\. A whole repair layer

`lib/board/guard.ts` contains `repairRawAction` (fixes `add_math` arriving with `text` instead of `latex`, missing `color`, leaked top-level `col`, legacy `x`/`y`), `rescueTurnArray` (unwraps a turn the model double-encoded as a JSON string inside `{"text": "..."}`), `normalizeAction` and `clampTurn`. One comment reads *“observed live 2026-08-02.”*

Be precise about what a protocol fixes here: **roughly half.** The double-encoding rescue is a framing problem and would go away. The field-name repairs are the model getting the schema slightly wrong — that happens under any protocol, and the quickstart's own coercing zod layer is the same thing. Module 3 made this point; here is the receipt.

#### 3\. Signals travelling in HTTP headers

LEARN IMAGINE — app/api/board/turn/route.ts

```
return result.toTextStreamResponse({
  headers: {
    "Cache-Control": "no-cache, no-transform",
    "X-Accel-Buffering": "no",
    ...(verdict ? { "x-board-verdict": verdict } : {}),
    ...(verdictCheckId ? { "x-board-check": encodeURIComponent(verdictCheckId) } : {}),
  },
});
```

The judge's verdict on a student's short answer rides in a response header, because there is no event channel to put it on. That is textbook out-of-band signalling — the Module 3 symptom. Under AG-UI it is a `CUSTOM` event, or better, a `STATE_DELTA` on the check's status.

And note `no-transform` is load-bearing: per `CLAUDE.md`, *“the CDN's brotli otherwise truncates slow token streams in browsers (curl hides the bug).”* A `text/plain` stream can be silently truncated by infrastructure and nothing notices, because there is no frame whose absence would be detectable. SSE has a media type that intermediaries know not to touch. That is a real, unglamorous operational benefit.

#### 4\. Interruption made impossible rather than handled

LEARN IMAGINE — components/board/useActionPlayer.ts

```
/** Fast-forward the rest of the current turn (caller cancels voice). */
const skip = useCallback(() => {
  fastRef.current = true;
  flushSleeps();
}, [flushSleeps]);
```

`skip()` fast-forwards *playback*. It does not cancel generation. While `busy`, the text input, Send, “Look at my work” and “I'm stuck” are all disabled, with the placeholder *“The tutor is drawing…”*. `PLAN.md` records this as deliberate: *“input stays locked — no mid-stream race.”*

That was the correct engineering call given the transport. It is a bad pedagogical outcome, and Module 8 argues it is the single strongest reason to change something.

### The layout engine — the best thing in the codebase

The model emits **no coordinates**. It says where a thing belongs semantically:

LEARN IMAGINE — lib/board/actions.ts

```
export const Placement = z.object({
  col: z.enum(["work", "visuals"])
    .describe("work = derivations/steps/checks; visuals = graphs/tables/diagrams"),
  below: z.string().optional()
    .describe("existing shape id: stack aligned under it (its column wins)"),
  beside: z.string().optional()
    .describe("existing shape id: sit to its right when it fits, else below"),
});
```

And pixels are decided inside the fold — the one code path shared by client render, server prompt serialisation, and replay:

LEARN IMAGINE — lib/board/state.ts

```
// Layout happens inside the fold — the only code path shared by client
// render, server prompt serialization, and replay — so a position can never
// desync between what the student watched and what the server persisted.
// The engine (lib/board/layout.ts) owns every pixel; the model's actions
// carry only semantic placement.
```

`lib/board/layout.ts` guarantees no-overlap *by construction* rather than by mitigation: disjoint regions, monotone column cursors, `beside` admitted only after an explicit intersection test, and a new section opened below when one fills. 384 lines with 606 lines of tests. There is no persisted layout state at all — `LayoutState` is created fresh inside every `foldEvents()` call.

Would shared state fix or complicate this? It would complicate it.

The temptation is obvious: put the board in `STATE_SNAPSHOT`, patch it with `STATE_DELTA`, drop the 1–2k tokens per turn you currently spend re-serialising the whole board in prose. Real saving, and Module 9 prices it.

But look at what you would be giving up. **Right now, layout cannot desync, because it is not synced — it is recomputed.** A patch stream is synchronisation, and synchronisation can fail. AG-UI's failure mode for a bad patch is `console.warn` plus `emitNoUpdate()`, with no sequence numbers, no checksums, and no protocol event to request a fresh snapshot. You would be trading a class of bug you have provably eliminated for a class of bug that fails silently, in a product where the failure looks like a tutor pointing at a diagram the student cannot see.

**The right shape, if you do this:** patch the *semantic* board — shapes, ids, relationships, check statuses — and keep layout as a pure function on top. Never put a pixel in a `STATE_DELTA`. That keeps the token saving and keeps the determinism guarantee.

### /board-lab is the tell

The fixture harness at `app/board-lab/page.tsx` exists, per its own header, to prove *“the canvas + animation player with ZERO AI cost… if a scripted turn plays smoothly here, the live path only adds transport.”* Its playback loop deliberately simulates ragged chunking:

LEARN IMAGINE — app/board-lab/page.tsx

```
const tick = () => {
  i = Math.min(fixture.length, i + Math.ceil(Math.random() * 3));
  if (i < fixture.length) {
    feedPartial(fixture.slice(0, i));
    setTimeout(tick, 250 + Math.random() * 900);
  } else {
    // Mirror the live client: feedPartial holds the tail element
    // back; stream end flushes it via finish().
    finish(fixture);
```

You built a bespoke event-log replay harness because you have an event log and no standard tooling for it. That is not a flaw — the sims memo would call this the highest-ROI artifact in the repo (flavour F3, replay & fork: real, faithful, never drifts). It is also the clearest possible signal that you converged on the protocol's model independently.

The scorecard

**You already have:** actor-tagged events · a closed op vocabulary · an append-only log with server-assigned sequence · a pure fold · idempotency keys · a replay harness. That is four fifths of AG-UI's model, arrived at independently.

**You do not have:** event framing · an out-of-band signal channel · an interrupt outcome · incremental state. Those four absences are exactly the four pieces of scar tissue above, one for one.

### Where the mobile story actually stands

One correction to the brief: **there is a mobile layout**, and it is more considered than “none.” `PLAN.md` records a verified 390px pass, the desktop transcript rail is `hidden md:block` with a 70vh bottom sheet below `md`, the check overlay switches from centred modal to bottom sheet, and the input bar has icon-only fallbacks.

**What is desktop-bound is the board itself:** a fixed 1600×900 logical viewBox squeezed into 390px; `COLUMNS` in `layout.ts` hardcoded as a two-column 1600px partition with 112px annotation gutters and no responsive branch anywhere (it can't have one — it runs server-side too); `serializeBoard` hardcoding `x < 800` as the column boundary; and zoom that is **wheel-only** with no pinch handler. The chrome is responsive; the canvas is not.

This matters to the protocol question in one specific way: a responsive board means **layout becomes viewport-dependent**, which means the isomorphic-pure-function guarantee breaks. If you ever ship a phone layout, you will be forced to choose between server-side layout for the prompt and client-side layout for the render — which is precisely the moment shared state stops being optional. Worth knowing that the mobile decision and the protocol decision are coupled.

Takeaways

-   Six of thirteen ops map cleanly to `TOOL_CALL_*`. Four are really state mutations and argue for `STATE_DELTA`. Three have no equivalent at all.
-   The four pieces of scar tissue — tail-holding, the repair layer, header signalling, locked input — are one-for-one what framing would have prevented.
-   The layout engine is the best-designed thing here and shared state would **weaken** it unless you patch semantics and derive pixels.
-   Ink, vision snapshots and student events have no AG-UI equivalent. The protocol is agent→user; half your traffic isn't.
-   Going responsive breaks the isomorphic-layout guarantee, which is what makes not-migrating cheap today.

## Module 8: Learn Imagine: the verdict

Learning objectives

-   Size the migration in files, lines and non-code cost
-   State the three constraints in the codebase that would fight it
-   Design a human-in-the-loop tutoring flow that is pedagogically motivated, not technically motivated
-   Reach a defensible verdict and name what would change it

### The code cost is small. That is the surprise.

The board is 48% of the codebase, but the **transport** touches only four files, because the original author enforced the separation:

| Transport-coupled — would change | Lines |
| --- | --- |
| app/api/board/turn/route.ts — streamObject + toTextStreamResponse + verdict headers | 478 |
| app/api/board/record/route.ts — exists only because of the transport | 77 |
| components/board/BoardSurface.tsx — the stream plumbing portion | ~150 of 1,158 |
| components/board/useActionPlayer.ts — the ingestion half | ~90 of 298 |

**Transport-independent and untouched:** `actions.ts` (the schema is already a valid event vocabulary), `state.ts`, `layout.ts`, `bounds.ts`, all 13 render components, `lib/db/repo/boards.ts`, and **2,681 lines of tests** — which test the fold, the layout and the guard, not the wire. **Six to eight files, roughly 800–1,000 lines.**

### The non-code cost is the real one

| Constraint | Why it fights you |
| --- | --- |
| The cache law“ONE stable action-array schema… every change is a cache invalidation” | The action array is the Anthropic prompt-cache prefix in jsonTool mode. Wrapping actions in AG-UI tool-call envelopes changes the tool schema and goes cold. The team has done this once, deliberately, and treats it as expensive. This is the single largest cost of migration and it is not a code cost. |
| “No in-memory session state, ever” | Serverless. Every request rehydrates from Postgres. AG-UI's shared-state model assumes a mutable state object living somewhere between agent and UI. Not incompatible — but it is a genuine architectural change, and arguably a simplifying one, since it would replace the full-board reserialisation every turn |
| Client-driven persistence | /api/board/record exists because “server post-stream writes are unreliable in dev.” A framed protocol with a server-authored RUN_FINISHED would let the server commit its own turn and delete this route, the turnId idempotency machinery, and the double retry. This is a cost that turns into a saving |
| The adapter is 0.0.1 | One published version, 30 July 2026, three weeks old at time of writing. The quickstart already documents a bug it works around in a system prompt. AG-UI itself is 0.0.58 with a scheduled breaking change at 1.0.0 |

### What human-in-the-loop should mean in tutoring

The generic framing — “approve this action before the agent does it” — is the wrong shape for a tutor. Nobody wants to approve a rectangle. The tutoring version of HITL is **interruption as a pedagogical event**, and there are three distinct kinds:

| Kind | What the student does | What should happen | Mechanism |
| --- | --- | --- | --- |
| Interject | “Wait — why is it minus five?” at second 12 of a 40-second explanation | Tutor stops where it is. The half-drawn board is kept, because it is the context for the question. Next turn anchors to what is actually on the board | user.interrupt + user.message in one POST (Managed Agents' canonical pattern); RUN_FINISHED with outcome: interrupt |
| Correct | “That's wrong, it should be x+2” | Tutor accepts the correction as a first-class event, not a chat message. The board mutates — the wrong step gets struck, not silently replaced | A frontend tool the student triggers; STATE_DELTA on the shape. Today this would be student_text ink, which the model sees as “uninterpreted ink” |
| Redirect | “Skip the factoring, just show me the graph” | Abandon the current plan, keep the board, replan from here | Interrupt + a directive. This is the one your pending_directive mechanism already half-implements, at turn boundaries only |

The pedagogical argument, stated plainly

Your current design disables input for the duration of a turn. Turns run up to 12 actions with intrinsic durations of 200–900ms each plus speech, so a rich turn is **tens of seconds during which the student cannot speak**.

The moment a student says “wait, why?” is the highest-value moment in the entire lesson. It is unprompted, specific, and located exactly at the boundary of their understanding. Your system's response to it is a greyed-out input box reading *“The tutor is drawing…”*, and by the time it clears, the moment has passed and the student has either forgotten the question or decided not to ask it.

Everything else in this course is an engineering trade. This one is not. **This is the feature.** If migration is the cheapest way to get it, migrate. If it isn't, build it anyway.

### Where CopilotKit's components would help, and where they would fight

Would help

`useRenderTool` matching a tool name to a component is *exactly* your `op`→`ShapeView` dispatch. The wildcard `"*"` registration for unrecognised tools is a pattern you should copy regardless.

`useHumanInTheLoop`'s `respond` callback is a cleaner `ask_check` gate than deriving one from the fold, because it pauses the agent rather than the input box.

`useInterrupt` is the thing you don't have.

Would fight

`CopilotChat` is a **transcript**. Your transcript is a secondary rail; the primary surface is a single persistent 1600×900 SVG that accumulates. Mounting shapes inline in a scrolling message list is the wrong geometry, and you would end up using CopilotKit headless (`@copilotkit/react-core/v2/headless`) — which means you take the runtime and events and throw away the components, i.e. most of what you were adopting it for.

Your animation queue — sequential playback with intrinsic per-op durations, so a burst of tokens still *draws* at tutor pace — has no equivalent and no hook to hang it on. It is the thing that makes the product feel like teaching rather than a JSON dump, and you would be reimplementing it inside a foreign render lifecycle.

### The verdict

Recommendation: do not migrate. Steal the vocabulary instead.

**Do not adopt AG-UI + CopilotKit for the Learn Imagine board.** Four reasons, in order of weight:

1.  **The component layer is what you'd be paying for and it is the part that fits worst.** A scrolling chat transcript is the wrong geometry for a persistent canvas. Going headless means paying the dependency cost for the events alone.
2.  **The prompt-cache invalidation is a real, recurring cost** against a benefit that is mostly hygiene. Your own `CLAUDE.md` treats schema changes as expensive, and it is right to.
3.  **Adapter 0.0.1, protocol 0.0.58, breaking change scheduled at 1.0.0.** You would be taking a dependency at its most volatile on the 48% of your codebase that is the product.
4.  **There is no second party.** One agent, one frontend, one repo, one author. The interop you would be buying has no counterparty today.

**Do these five things instead**, in this order. Together they are perhaps 400 lines and they capture most of the benefit:

1.  **Ship interruption.** Thread a real abort through `skip()`, persist the partial turn server-side, and let the student type mid-turn. Model it as an explicit outcome — literally borrow the name, `outcome: "interrupt"` — so the vocabulary is already right if you ever migrate. This is the pedagogy fix and it is worth more than everything else here combined.
2.  **Move persistence server-side.** Emit and commit events as the turn streams rather than POSTing from `onFinish`. Deletes `/api/board/record`, the `turnId` idempotency dance and the double retry, and fixes the mid-stream-refresh data loss you found in Module 4 round 4.
3.  **Add a real event frame.** You do not need SSE to stop guessing at tails: emit one newline-delimited JSON object per action (NDJSON) instead of a growing array. That single change deletes the tail-holding logic and half of `rescueTurnArray`, and costs you one prompt-cache invalidation you are going to spend anyway.
4.  **Get the verdict out of the headers.** Once you have frames, the judge verdict is just another frame. Headers are a dead end the moment you need two of them.
5.  **Then, and only then, consider incremental state** — patching the semantic board rather than re-serialising 1–2k tokens of prose every turn. Patch semantics, derive pixels, never put a coordinate on the wire.

What would change this verdict

Name the triggers now, while you are not under pressure:

-   **A second surface.** A native app, an LMS embed, a Coursera-hosted player. The moment two clients render the same tutor, you have a second party and the calculus inverts.
-   **A second agent runtime.** If the board should also be drivable by something that isn't your `streamObject` call.
-   **AG-UI reaching 1.0** with the `THINKING_*` removal done, a conformance suite, and a resumable-stream design that is implemented rather than reserved.
-   **A responsive board.** As Module 7 notes, viewport-dependent layout breaks the isomorphic guarantee and shared state stops being optional.
-   **Someone other than you working on it.** A published contract is worth far more with three engineers than with one.

Takeaways

-   The migration is 6–8 files and ~800–1,000 lines. The code is not the cost; the prompt cache is.
-   Verdict: **don't migrate.** Steal the vocabulary, ship interruption, move persistence server-side, add NDJSON frames.
-   Interruption is a pedagogy feature wearing an engineering costume. Build it regardless of the protocol decision.
-   CopilotKit's chat transcript is the wrong geometry for a persistent canvas; headless mode means paying for what you throw away.
-   Five named triggers would flip the verdict. Write them down now.

## Module 9: Coursera, at platform scale

Learning objectives

-   Identify the four platform surfaces where an agent–UI protocol changes the economics
-   Apply a build-vs-adopt test that survives a procurement review
-   Quantify why richer agent UIs make the token bill go up, not down
-   List what you would need to see before standardising a platform on a 0.0.x protocol

### Four surfaces where it matters

| Surface | Why a protocol changes the economics | Priority |
| --- | --- | --- |
| Tutoring | The richest generative UI in the product and the one with real interruption semantics. Also the one most likely to need a second client (web, mobile, embedded in a partner LMS) | Highest — and the hardest, per Modules 7–8 |
| Grading feedback loops | The strongest human-in-the-loop case in the whole company. A grader that proposes a rubric application and waits is useHumanInTheLoop, exactly. And the approval must be auditable, which means the pause has to be an event you can log, not a UI state | High, and underrated |
| Course-authoring copilots | Multi-user shared state is the canonical STATE_SNAPSHOT/STATE_DELTA use case — and the canonical place its silent-failure mode bites. Two instructors, one outline, one dropped patch, no detection | High risk, high reward |
| Learner support | Mostly chat. Genuinely well served by an off-the-shelf runtime, and the least differentiated surface you own | Adopt something; don't build |

The platform-scale asymmetry

The single biggest difference between your side project and Coursera is **the number of second parties**. Module 5's test — “who is the second party?” — answers itself at platform scale: partner institutions, a mobile client, an enterprise LMS integration, an internal team in another org, and a vendor you will replace in three years.

The verdict that was “don't migrate” for a one-author repo becomes “you need *a* contract” for a platform. What is **not** settled is whether that contract should be AG-UI at 0.0.58.

### The token bill: richer UI means more tokens, not fewer

There is a comforting story that model prices fall roughly 50% a year, so agent products get cheaper. The story is wrong in a specific way: **price per token falls while tokens per task rise**, and in agentic products the second effect is at least as fast as the first. A 50% price decline is exactly cancelled by a doubling of tokens per interaction, and richer agent UIs are a machine for doubling tokens per interaction.

Three mechanisms, all visible in the systems in this course:

-   **State reconciliation.** With no shared-state channel, you re-send the UI state to the model every turn. Learn Imagine spends **1–2k tokens per turn** re-serialising the board in prose. This grows with the board, every turn, forever.
-   **It is uncacheable by construction.** This is the sharp bit. That serialisation sits in the *user* message specifically so the system prefix stays cache-hot — and it changes every turn, so it can never be cached itself. Prompt caching does not rescue you here; the architecture guarantees a cache miss on exactly the tokens that grow.
-   **Generative UI invites more turns.** A tutor that draws gets asked more questions than a tutor that types. That is the product working. It is also the bill going up.

#### Reconciliation cost instrument

Deterministic. Pure arithmetic on the numbers you set — no model calls, nothing fetched, no hidden assumptions. Compares re-sending full UI state every turn against sending a snapshot once plus deltas. Everything here is *input tokens for state reconciliation only* — it excludes the conversation, the system prompt and all output tokens, so treat it as a floor, not a forecast.

Active learners per month**50,000**

Tutoring sessions per learner per month**4**

Agent turns per session**12**

UI state re-serialised per turn (tokens)**1,500**

What actually changed per turn (tokens)**80**

Input price, $ per million tokens**$10.00**

—

Full re-send / yr

—

Snapshot + delta / yr

—

Difference / yr

—

Reconciliation tokens / yr

Incremental as a share of full re-send: **—** Per learner per year: **—**

The half-price trap

—

Argue with this instrument

It is deliberately narrow and you should know its limits. It counts **only** state reconciliation input tokens. It ignores output tokens (more expensive), the conversation history, the system prompt, and — for Managed Agents specifically — the **$0.08 per session-hour** runtime charge, which at platform scale is a line item of its own and is not a token cost at all.

It also assumes the delta is small, which is true for a board that accumulates and false for one that is frequently rewritten. And it assumes you would *otherwise* have re-sent everything; a smarter prompt that sends a windowed summary sits somewhere in between. **The instrument's job is to show you the shape of the curve, not to produce a number you put in a budget.**

### Build vs adopt, at platform scale

The question is not “is AG-UI good.” It is “what layer are we standardising, and what is the exit.” Three separable decisions that people wrongly bundle into one:

| Decision | Recommendation | Reasoning |
| --- | --- | --- |
| The event vocabulary | Adopt AG-UI's names, even if you implement them yourself | Nearly free, reversible, and it means your internal contract is already legible to anyone you hire or acquire. The vocabulary is the durable part — the concepts have a half-life measured in years, unlike the packages |
| The transport and runtime | Adopt per surface, not platform-wide | Learner support: adopt now, low risk. Grading: adopt for the HITL semantics. Authoring: pilot, because shared state is where the silent-failure risk lives. Tutoring: last, because the component layer fits worst |
| The React component library | Do not standardise | This is where lock-in and the paid tier both live, and it is the layer with the shortest half-life. Use it where it fits; never let it become the platform's UI contract |

### Vendor risk, itemised

| Risk | Status, August 2026 | Mitigation |
| --- | --- | --- |
| Protocol immaturity | 0.0.58, no conformance suite, breaking change scheduled at 1.0.0, docs demonstrably out of sync with the enum | Pin versions. Own an internal adapter so a protocol change is one file, not fifty |
| Single-vendor governance | Separate GitHub org, but CopilotKit-led, CopilotKit-authored, CopilotKit-funded ($27M Series A, May 2026) | Watch for a genuine multi-vendor governance move. Three hyperscalers shipping it is a partial hedge, since none would accept unilateral breakage quietly |
| Commercial gradient | Persistence, thread APIs and cross-device sync are the paid tier. Self-hostable via Helm, which is better than most | Assume you will pay or build those. Never architect as if OSS persistence exists |
| Adapter risk | @ag-ui/claude-managed-agents is at 0.0.1, one published version, one maintainer | For anything production, vendor the adapter into your repo. It is a few hundred lines and you will need to patch it |
| Compliance | Managed Agents is ZDR- and HIPAA-ineligible as a feature; AG-UI has no auth story and Microsoft explicitly warns against exposing servers to untrusted clients | Trusted-frontend/BFF pattern, mandatory. Get legal in the room before the pilot, not after |

### What you would need to see before standardising

1.  **1.0 with a conformance suite.** Today “AG-UI compliant” is untestable. A platform cannot make an untestable claim a requirement of its partners.
2.  **Multi-vendor governance** in something more than name. A foundation, or a spec editor who does not work for the reference client's vendor.
3.  **A resumable-stream design that exists.** It is currently a reserved capability flag. For a learning session on a phone on a train, resumption is not optional.
4.  **An auth and multi-tenancy story** in the protocol or an authoritative pattern from it. Not a third party's security page.
5.  **A second reference client.** One protocol, one usable client, one company is a library with extra steps.

Takeaways

-   Grading is the strongest HITL case in the company and the most auditable. Start there, not with tutoring.
-   Adopt the vocabulary platform-wide; adopt the runtime per surface; never standardise the component library.
-   Reconciliation tokens are uncacheable by construction. Richer UI raises the bill; falling prices don't rescue you.
-   Managed Agents' $0.08/session-hour is a non-token line item that platform models routinely omit.
-   Five gates before standardisation. None of them is met today.

## Module 10: Generative UI meets instructional design

Learning objectives

-   State the accessibility obligations that generative UI creates and that no protocol addresses
-   Apply the cognitive-load evidence to a tutor that draws
-   Explain why an agent that decides its own interface is an instructional-design problem, not just an engineering one
-   Name the measurement that would actually tell you if any of this works

### Accessibility: a model choosing your DOM is a compliance surface

Generative UI means a language model decides, at runtime, what interface a learner sees. For a learning platform with accessibility obligations that is not a feature detail. It is a category of compliance risk that did not exist when interfaces were written by people.

| Obligation | What generative UI breaks | What to do |
| --- | --- | --- |
| Screen reader semantics | An SVG board built by a model has no reliable reading order, no landmarks, and no guarantee a label exists | Make the semantic event log, not the rendered canvas, the accessible artifact. Learn Imagine is unusually well placed here: serializeBoard() already produces a coordinate-free textual description of the board for the model. That is most of a screen-reader view, already written and already tested |
| Live-region announcements | Content appearing progressively over 40 seconds either floods a screen reader or is silent | Announce at op granularity, not token granularity — another argument for framed events. polite, coalesced, one announcement per completed action |
| Keyboard operability | Model-generated interactive elements (sliders, checks) may not be reachable or may appear mid-focus | Renderers must come from a fixed registry of accessible components. The model chooses which component and supplies data; it never authors markup. Both the quickstart and Learn Imagine already work this way — preserve that property deliberately rather than accidentally |
| Predictability (WCAG 3.2) | An interface that reorganises itself mid-task is a violation waiting to happen | Constrain layout mutation. move_view and section rollover should be announced and, ideally, learner-controllable |
| Reduced motion | An animation queue that draws at tutor pace is motion | Honour prefers-reduced-motion by collapsing durations to zero and rendering the completed board. The framework CSS on this very page does exactly that |

No protocol will do this for you

AG-UI has nothing to say about accessibility. Neither does CopilotKit's component set beyond what its individual components happen to do. If a model can choose the interface, then **the registry of what it may choose from is your accessibility control surface**, and it is the only one you have. Design it as a control, audit it as a control, and never let the model emit markup.

### Cognitive load: a tutor that draws can teach worse

The instinct that a richer interface teaches better is not supported, and in places is contradicted. Four results worth holding when someone proposes adding a panel:

| Finding | Implication for a drawing tutor |
| --- | --- |
| Spatial contiguity — integrating labels into a visual rather than placing them alongside: g = 0.63 (58 comparisons, N = 2,426) | Labels belong on the shape. Learn Imagine's annotate gutters are adjacent, not integrated — worth testing against inline labelling |
| Redundancy — duplicating narration as on-screen text is a cost, not a bonus | The tutor speaks a say and writes it to the transcript rail. That is the redundancy effect by construction. Consider making the rail a history, not a live duplicate |
| Seductive details — interesting-but-irrelevant material: g ≈ −0.33 (68 effects) | Every decorative flourish a model adds because it looks good is a tax. Constrain the vocabulary; do not enrich it |
| Split attention — splitting one simulation across two screens to lower visual complexity improved comprehension and transfer, especially for low-prior-knowledge learners (N = 257) | The novice view should be smaller than the expert view. A board that accumulates 14 shapes is an expert view being shown to a novice |

And the finding that should govern the whole programme: high- versus low-fidelity simulation differs by **1–2%** across 24 studies. Realism is a cost centre. The best-documented simulation win in the physics education literature happened *because* the simulation was less realistic than the real equipment — it made the invisible visible and deleted irrelevant variables.

The instructional-design version of the state-ownership question

Module 4 asked which layer owns a piece of state. Here is the pedagogical twin: **which layer owns the instructional decision?**

When the model chooses whether to draw a graph or a table, it is making an instructional-design decision at inference time, with no learner model, no record of what worked, and no accountability. Generative UI quietly moves pedagogy from a designed artifact into a per-turn model judgment.

That can be right — responsiveness is genuinely valuable. But it should be a decision you made, not one that fell out of the architecture. The healthy pattern is the one both systems in this course already use without naming it: **the model picks from a curriculum-designed vocabulary; it does not invent the vocabulary.** Thirteen ops chosen by a human is a pedagogy. Arbitrary markup is not.

### The measurement that would actually settle it

The failure mode is measuring engagement and calling it learning. The relevant evidence is uncomfortable and specific: a preregistered study of ~1,000 students found that a plain AI tutor produced **+48% performance while using it and −17% on the unassisted exam**; a guardrailed version got **+127% with the tool and a null result unassisted**. The guardrails removed the harm and delivered nothing. A separate semester-long study of a RAG chatbot with ~500 undergraduates found *“no statistically significant impact on any measured outcome.”*

The rule that follows

**Improvement measured while the learner is inside your tool is not evidence of anything.** Measure unassisted, measure delayed, measure on novel items the tutor never displayed.

Second rule, from the same literature: treat “learners found it easy and enjoyable” as a **negative** signal. In the study where students learned more, they reported feeling they had learned less. Time-in-tool and satisfaction are the two metrics an agent UI is best at moving and worst at justifying.

### Where this lands

A protocol between an agent and a UI is a good idea whose value is almost entirely a function of how many parties have to agree. For a solo whiteboard tutor, that number is one, and the honest answer is to steal the vocabulary and skip the dependency. For a platform, that number is large and rising, and the honest answer is that you need a contract — while the leading candidate is at 0.0.58 with no conformance suite and a commercial gradient running through the middle of it.

The part that is not contingent on any of that: **a student who says “wait, why?” should be able to say it.** Everything else in these ten modules is an engineering trade with a defensible answer on both sides. That one isn't.

Takeaways

-   The renderer registry is your accessibility control surface. The model picks components; it never emits markup.
-   The semantic event log — not the canvas — is the accessible artifact. Learn Imagine's `serializeBoard()` is already 80% of a screen-reader view.
-   Richer is not better: contiguity, redundancy, seductive details and split attention all argue for a narrower vocabulary.
-   Generative UI moves pedagogy into a per-turn model judgment. Constrain the vocabulary so that judgment stays inside a designed space.
-   Measure unassisted, delayed, on novel items. Enjoyment is a negative signal.

Sourcing and method

Quickstart code was read from `raw.githubusercontent.com` at `anthropics/claude-quickstarts@main` — `README.md`, `CLAUDE.md`, `server/src/index.ts`, `server/src/setup.ts`, `server/src/vizTools.ts`, `web/src/App.tsx`, `web/src/viz/renderers.tsx` — not from the rendered GitHub page. Learn Imagine excerpts are from `~/projects/learn-imagine-v4` at commit `d52c481`, with file paths given inline.

AG-UI facts are from the `ag-ui-protocol/ag-ui` source of truth (`sdks/typescript/packages/core/src/events.ts`) and `docs.ag-ui.com`, checked August 2026. Where the two disagree — the architecture page still says 16 event types; the SDK events page publishes an incomplete enum — the source wins and the disagreement is noted in Module 2. CopilotKit v2 API names are from `docs.copilotkit.ai/migrate/v2` and the v2 hook exports in `packages/react-core/src/v2/hooks/index.ts`. Managed Agents facts are from `platform.claude.com/docs/en/managed-agents/*`.

**Two discrepancies I could not resolve and am flagging rather than smoothing over.** (1) CopilotKit's v2 migration guide says *“keep the `<CopilotKit>` provider name, but import it from `@copilotkit/react-core/v2`”*, and describes `CopilotKitProvider` as the React Native and Vue name — yet the Anthropic quickstart's `App.tsx` imports `CopilotKitProvider` from `@copilotkit/react-core/v2` in React and evidently works. Either both are exported or the docs are stale; I did not verify which. (2) The quickstart's `CLAUDE.md` says session tool overrides are *“merged with the agent's own toolset”*, but Anthropic's sessions docs are explicit that *“overrides never merge… a `tools` override must list every tool the session should have.”* The merge is real but happens **client-side in the adapter**, which calls `agents.retrieve()`, drops same-named custom tools, appends its own, and sends the whole list. Accurate in effect, imprecise in mechanism.

**Excluded as unverifiable:** a “just use SSE” public backlash — I looked on HN, in GitHub issues and in blog posts and could not find anyone making that argument, so the version in Module 5 is labelled as mine. Also excluded: the exact Console sessions URL path, which is undocumented and only empirically confirmed. **Corrected against the brief:** Learn Imagine *does* have a mobile layout for the chrome — it is the 1600×900 board that is desktop-bound. And AG-UI has 33 event types, not 16.

**Re-check before you rely on them:** AG-UI was 0.0.58 and `@ag-ui/claude-managed-agents` was 0.0.1 with a single published version at time of writing; both move fast. The `THINKING_*` removal at 1.0.0 is a scheduled breaking change. Managed Agents pricing was $0.08/session-hour plus tokens.

[The quickstart](https://github.com/anthropics/claude-quickstarts/tree/main/managed-agents/copilot-kit-ag-ui) [AG-UI docs](https://docs.ag-ui.com/introduction) [AG-UI source](https://github.com/ag-ui-protocol/ag-ui) [CopilotKit v2 migration](https://docs.copilotkit.ai/migrate/v2) [Managed Agents](https://platform.claude.com/docs/en/managed-agents/overview)

Built as an interactive course. Quickstart code is Anthropic's and is reproduced unmodified; Learn Imagine excerpts are from the local repo; illustrations are labelled as such. Everything time-sensitive was verified in August 2026 against source — verify again before you cite it.