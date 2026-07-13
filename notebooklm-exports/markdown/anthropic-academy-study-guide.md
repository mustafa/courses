# Anthropic Academy — Complete Study Guide for All Free Courses

# Anthropic Academy
Complete Study Guide

A comprehensive companion covering all 17+ free courses, designed for CCA-F and CCAO-F exam preparation.

17+

Free Courses

8

Study Modules

64

Review Questions

~55h

Total Content

## Module 1: Academy Overview

*Platform orientation, course catalog, learning tracks, and certification mapping*

### What Is Anthropic Academy?

Anthropic Academy is Anthropic's official, free learning platform that launched on **March 2, 2026**. It is hosted at `anthropic.skilljar.com` and offers self-paced courses covering everything from basic AI fluency to advanced developer topics like building agents and working with the Model Context Protocol (MCP). Every course is entirely free. You need only an email address to create an account and enroll. There is no subscription fee, no credit card requirement, and no hidden upsells.

Upon completing a course, you receive an **official Anthropic certificate of completion** that you can share on LinkedIn or include in professional portfolios. These certificates are separate from the proctored CCA-F certification exam, but the Academy courses are the recommended study material for that exam.

### Three Learning Tracks

Anthropic Academy organizes its courses into three main tracks based on the target audience:

-   **AI Fluency (Non-Technical):** Designed for business professionals, educators, students, and nonprofit workers who want to understand AI concepts and use Claude effectively without writing code. Courses focus on frameworks for thinking about AI, ethics and safety considerations, and practical business applications.
-   **Product Training (General Users):** For anyone who uses Claude in their daily work. Covers the Claude interface, prompt structuring, conversation management, Projects and artifacts, and best practices for getting high-quality outputs across different use cases.
-   **Developer Deep-Dives (Engineers):** For software developers and engineers who build applications powered by Claude. Covers the Claude API, Claude Code, Model Context Protocol, agent architecture, subagents, Skills, and cloud platform integrations. These courses are the primary preparation material for the CCA-F (Certified Claude AI - Foundational) certification exam.

### Complete Course Catalog

Below is the full catalog of 17+ courses available as of mid-2026, grouped by category with estimated completion times. Each course consists of video lectures, reading materials, hands-on exercises, and a final assessment.

#### Foundational Courses

| # | Course | Description | Time |
| --- | --- | --- | --- |
| 1 | Claude 101 | Entry-level introduction to Claude. Learn to operate Claude for basic work tasks including prompt structuring, navigating the user interface, understanding conversation management, and learning the difference between Projects, conversations, and artifacts. Covers the fundamentals of interacting with an AI assistant productively. | ~2h |
| 2 | AI Capabilities and Limitations | Build a solid mental model of how generative AI works. Covers system boundaries, large language model mechanics, tokenization, context windows, temperature, and the fundamental strengths and weaknesses of transformer-based models. Essential for understanding what Claude can and cannot do. | ~2h |
| 3 | AI Fluency: Framework & Foundations | Ethics, safety, and operational basics of incorporating AI into business routines. Covers responsible AI use, bias awareness, data privacy considerations, regulatory landscapes, and frameworks for evaluating when AI-assisted approaches outperform traditional methods. | ~3h |
| 4 | AI Fluency for PK-12 Educators | Frameworks for teachers to use Claude for lesson support, curriculum planning, differentiated instruction, and assessment creation. Addresses academic integrity concerns, age-appropriate AI usage guidelines, and strategies for teaching students to interact with AI responsibly. | ~2h |
| 5 | AI Fluency for Students | Responsible use of Claude for research, planning, and study. Teaches students how to use AI as a learning aid without undermining the learning process, including proper citation practices, academic integrity guidelines, and strategies for verifying AI-generated information. | ~2h |

#### Developer Core Courses

| # | Course | Description | Time |
| --- | --- | --- | --- |
| 6 | Building with the Claude API | Comprehensive course on API integration. Covers authentication, routing model requests, JSON outputs, system prompt parameters, streaming, tool use (function calling), vision capabilities, batching, structured output patterns, error handling, and rate limit management. This is the longest and most detailed developer course and is essential for CCA-F preparation. | ~8h |
| 7 | Claude Code 101 | Running Claude Code locally, automating code editing, debugging, terminal command execution, understanding the CLAUDE.md configuration hierarchy, and basic slash commands. Covers the fundamental Explore-Plan-Code-Commit workflow that defines how Claude Code approaches development tasks. | ~3h |
| 8 | Claude Code in Action | Advanced workflows for Claude Code including the hooks lifecycle (UserPromptSubmit, PreToolUse, PostToolUse), custom slash commands with YAML frontmatter, Skills authoring, MCP server configuration within Claude Code, CI/CD integration with the -p flag and headless mode, and comprehensive git workflow automation. | ~4h |

#### Advanced Developer Courses

| # | Course | Description | Time |
| --- | --- | --- | --- |
| 9 | Introduction to Model Context Protocol | Build MCP servers and clients from scratch in Python. Master the three core primitives: tools (executable functions), resources (contextual data sources), and prompts (reusable interaction templates). Covers the host-client-server architecture, JSON-RPC protocol layer, and the stdio transport mechanism. | ~4h |
| 10 | MCP Advanced Topics | Sampling (servers requesting LLM completions), notifications, local filesystem access with root declarations, the Streamable HTTP transport mechanism for remote servers, capability negotiation during initialization, security considerations, and authentication patterns for production MCP deployments. | ~3h |
| 11 | Introduction to Agent Skills | Write and deploy custom Skills in Claude Code. Skills are reusable markdown instruction sets that provide Claude Code with specialized knowledge and workflows. Learn skill file structure, automatic and manual triggering mechanisms, parameterization, and best practices for creating maintainable, composable skills. | ~3h |
| 12 | Introduction to Subagents | Using subagents in Claude Code for task delegation. Covers workspace context management, the hub-and-spoke orchestration pattern, context isolation as a design principle, independent model and tool permission configuration per subagent, and designing multi-agent systems that are robust, cost-efficient, and maintainable. | ~3h |
| 13 | Introduction to Claude Cowork | Collaborating with Claude on large-scale file editing and research tasks. Covers the Cowork interface, coordinating multiple specialized agents within a shared workspace, artifact management, and strategies for tackling complex projects that exceed what a single agent session can handle. | ~2h |

#### Cloud Platform Courses

| # | Course | Description | Time |
| --- | --- | --- | --- |
| 14 | Claude with Amazon Bedrock | Instantiate and query Anthropic models within AWS Bedrock. Covers IAM role configuration, model access requests through the AWS console, the Bedrock Converse API, comparing direct Anthropic API versus Bedrock for different deployment scenarios, and integrating Claude with other AWS services like Lambda and S3. | ~3h |
| 15 | Claude with Google Cloud's Vertex AI | Deploy and call Claude models via Google Cloud's Vertex AI. Covers service account setup, the Vertex AI SDK for Python and Node.js, region selection considerations, quota management, and when to choose Vertex AI over direct API access for compliance or infrastructure reasons. | ~3h |

#### Additional / Specialized Courses

| # | Course | Description | Time |
| --- | --- | --- | --- |
| 16 | AI Fluency for Nonprofits | Tailored AI fluency for nonprofit organizations including grant writing assistance, donor communication optimization, volunteer coordination, program impact reporting, and strategies for deploying AI on limited budgets while maintaining ethical standards. | ~2h |
| 17 | Claude for Enterprise Teams | Managing Claude at scale within enterprise environments. Covers team administration, usage policies and governance, SSO integration, audit logging, cost allocation across departments, and frameworks for establishing organizational AI usage guidelines. | ~3h |

### Recommended Course Order by Track

If you are following the **Developer track** toward CCA-F certification, the recommended order is:

1.  Claude 101 (get comfortable with the product and understand the user experience)
2.  AI Capabilities and Limitations (build your mental model of how LLMs work)
3.  Building with the Claude API (core developer skills, the longest and most important course)
4.  Claude Code 101, then Claude Code in Action (tooling mastery for the 20% Claude Code domain)
5.  Introduction to MCP, then MCP Advanced Topics (protocol fluency for the 18% MCP domain)
6.  Introduction to Agent Skills (skill authoring complements agent architecture knowledge)
7.  Introduction to Subagents (multi-agent design is central to the 27% Agentic Architecture domain)
8.  Introduction to Claude Cowork (collaboration patterns and practical agent orchestration)
9.  One or both cloud platform courses based on your technology stack

For the **AI Fluency track** (non-developers pursuing CCAO-F), the recommended order is: Claude 101, AI Capabilities and Limitations, AI Fluency: Framework & Foundations, then any specialized fluency course relevant to your professional field (Educators, Students, Nonprofits, or Enterprise Teams).

### How Courses Map to CCA-F Certification Domains

**CCA-F Domain Weights:** D1: Agentic Architecture (27%) | D2: Tool Design & MCP (18%) | D3: Claude Code (20%) | D4: Prompt Engineering (20%) | D5: Context & Reliability (15%)

| Domain | Weight | Primary Courses |
| --- | --- | --- |
| D1: Agentic Architecture | 27% | Introduction to Subagents, Introduction to Agent Skills, Claude Code in Action, Introduction to Claude Cowork |
| D2: Tool Design & MCP | 18% | Introduction to MCP, MCP Advanced Topics, Building with the Claude API (Tool Use section) |
| D3: Claude Code | 20% | Claude Code 101, Claude Code in Action |
| D4: Prompt Engineering | 20% | Building with the Claude API (prompting sections), Claude 101 |
| D5: Context & Reliability | 15% | Building with the Claude API (caching, batching, rate limits), MCP Advanced Topics |

**Total estimated study time for all courses:** approximately 50 to 60 hours depending on your pace and prior experience. Most developers report that the Developer Core and Advanced Developer tracks alone take about 30 to 35 hours, which covers the vast majority of CCA-F exam content. The cloud platform courses are recommended but not strictly required for the CCA-F exam.

## Module 2: Claude API Fundamentals

*Authentication, Messages API, streaming, tool use, vision, batching, and error handling*

### Authentication and Setup

All API requests require authentication via an API key passed in the `x-api-key` header. API keys are created in the Anthropic Console at `console.anthropic.com`. Each key is scoped to a specific organization and can be restricted to particular workspaces for security isolation. The base URL for all API calls is `https://api.anthropic.com`. You must also include the `anthropic-version` header with the API version date string (for example, `2024-01-01`) to ensure consistent behavior as the API evolves.

When using organization-scoped keys, include the `anthropic-organization` header with your organization ID. For project-scoped billing, use the `anthropic-project` header. These headers ensure that billing, usage tracking, and rate limits are attributed correctly to the right organizational unit.

Best practices for API key management include storing keys in environment variables or dedicated secret managers (such as AWS Secrets Manager, Google Secret Manager, or HashiCorp Vault), never committing keys to version control, using scoped keys with the minimum necessary permissions, and rotating keys on a regular schedule.

### Available Models

Anthropic offers a family of models at different capability and cost tiers. Choosing the right model for each task is one of the most impactful cost optimization decisions you can make:

-   **Claude Opus (claude-opus-4-6):** The most capable model in the family. Best for complex reasoning, nuanced analysis, multi-step tasks requiring deep thinking, creative writing, and tasks where accuracy is paramount. Highest cost per token. Use when the task genuinely requires superior reasoning ability.
-   **Claude Sonnet (claude-sonnet-4-6):** Balanced performance and cost. Excellent for most production workloads including code generation, analysis, extended conversations, content creation, and general-purpose assistant tasks. The default choice for most applications.
-   **Claude Haiku (claude-haiku-4-5-20251001):** The fastest and most cost-effective model. Ideal for high-volume, lower-complexity tasks like classification, entity extraction, simple question answering, content moderation, and request routing. Use Haiku for any task where speed and cost matter more than depth of reasoning.

A common production pattern is to use Haiku as a router or classifier that determines the complexity of incoming requests, then routes simple requests to Haiku and complex requests to Sonnet or Opus. This tiered approach can reduce overall costs by 60-80% compared to using a single model for all requests.

### The Messages API

The Messages API is the core interface for all conversations with Claude. Every interaction, whether a simple question, a multi-turn conversation, or a complex agentic workflow, goes through the `POST /v1/messages` endpoint.

#### Required Parameters

-   `model` (string): The model identifier, such as `"claude-sonnet-4-6"`. This determines which Claude model processes the request.
-   `max_tokens` (integer): The maximum number of tokens Claude can generate in its response. This acts as an upper bound; Claude may generate fewer tokens if it completes its response earlier.
-   `messages` (array): An array of message objects, each containing a `role` field ("user" or "assistant") and a `content` field. Messages must alternate between user and assistant roles, starting with a user message.

#### System Prompt

The system prompt is passed as a top-level `system` parameter in the request body, not as a message with role "system". This is a critical distinction from some other LLM APIs. The system prompt sets the context, personality, behavioral guidelines, and constraints for the entire conversation. It is processed before any messages and influences how Claude interprets and responds to all subsequent user messages.

Best practices for system prompts include: placing the most critical instructions at the beginning (Claude gives slightly more attention to early instructions), clearly defining the role ("You are a senior security analyst reviewing code for vulnerabilities"), specifying output format expectations, including explicit constraints and guardrails, and keeping the system prompt focused on behavior (how to respond) rather than domain knowledge (which should go in user messages or context).

```python
import anthropic

client = anthropic.Anthropic()  # Uses ANTHROPIC_API_KEY env variable

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system="You are a helpful coding assistant. Always include code examples in your explanations. Use Python unless the user specifies another language.",
    messages=[
        {"role": "user", "content": "How do I read a JSON file in Python?"}
    ]
)
print(message.content[0].text)
```

### Streaming Responses

For real-time applications, the API supports streaming via **Server-Sent Events (SSE)**. Instead of waiting for the entire response to be generated, you receive tokens incrementally as they are produced. This dramatically improves perceived latency in user-facing applications because the user sees the response begin almost immediately rather than waiting for the full generation.

The stream emits a sequence of typed events: `message_start` (contains metadata like model and usage), `content_block_start` (beginning of a text or tool\_use block), `content_block_delta` (incremental content, typically a few tokens at a time), `content_block_stop` (end of the content block), and `message_stop` (end of the entire response). The `content_block_delta` events carry the actual text fragments that you concatenate to build the complete response.

```python
with client.messages.stream(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Explain recursion with a practical example"}]
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)
```

### Message Batches API

The Message Batches API allows you to send up to 10,000 requests in a single batch, processed asynchronously at **50% of the standard per-token cost**. Batches are processed within 24 hours, though most complete much faster (typically within a few hours for moderately sized batches). This is ideal for bulk processing tasks like document analysis, data extraction, evaluation runs, report generation, and any workload where immediate responses are not required.

To use the Batch API, you create a JSONL file where each line contains a complete message request (with its own model, system prompt, and messages). Submit this file to `POST /v1/messages/batches`, and then either poll the batch status endpoint or configure a webhook callback to be notified when processing completes. Each request in the batch is independent and can use different models, system prompts, and parameters.

### Tool Use (Function Calling)

Tool use is the mechanism by which Claude can call external functions that you define. This is the foundation of all agentic applications. The workflow follows a structured cycle:

1.  You define tools with names, descriptions, and JSON Schema input specifications.
2.  You send a message request with the tools parameter included.
3.  Claude analyzes the user's request and decides whether to call a tool.
4.  If a tool call is needed, Claude generates a `tool_use` content block with the tool name, structured input arguments, and a unique `id`.
5.  Your application executes the tool with the provided arguments.
6.  You send the tool result back as a `tool_result` content block, referencing the original `tool_use_id`.
7.  Claude incorporates the tool result and generates its final response (or calls another tool).

This cycle can repeat multiple times in a single interaction, allowing Claude to use multiple tools sequentially or iteratively to accomplish complex tasks.

```python
tools = [
    {
        "name": "get_weather",
        "description": "Get the current weather for a given location. Returns temperature, conditions, and humidity.",
        "input_schema": {
            "type": "object",
            "properties": {
                "location": {
                    "type": "string",
                    "description": "City and state/country, e.g., 'San Francisco, CA' or 'London, UK'"
                },
                "unit": {
                    "type": "string",
                    "enum": ["celsius", "fahrenheit"],
                    "description": "Temperature unit preference"
                }
            },
            "required": ["location"]
        }
    }
]

response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    tools=tools,
    messages=[{"role": "user", "content": "What's the weather in Boston?"}]
)

# Process tool calls
for block in response.content:
    if block.type == "tool_use":
        # Execute the tool with the provided arguments
        result = call_weather_api(block.input["location"],
                                  block.input.get("unit", "fahrenheit"))
        # Continue conversation with tool result
        follow_up = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=1024,
            tools=tools,
            messages=[
                {"role": "user", "content": "What's the weather in Boston?"},
                {"role": "assistant", "content": response.content},
                {"role": "user", "content": [
                    {"type": "tool_result",
                     "tool_use_id": block.id,
                     "content": json.dumps(result)}
                ]}
            ]
        )
```

### Vision Capabilities

Claude can process images sent as part of messages, enabling visual analysis, OCR (optical character recognition), diagram interpretation, UI analysis, and multi-modal reasoning. Images can be provided as base64-encoded data (using `source.type: "base64"` with `media_type` and `data` fields) or referenced by URL. Supported formats include JPEG, PNG, GIF, and WebP.

Images are included in the `content` array of a message as image content blocks alongside text content blocks. Each image consumes tokens based on its pixel dimensions, so for cost optimization, resize images to the minimum resolution needed for your task before sending them. Claude can handle multiple images in a single message for comparison or batch analysis tasks.

### Content Types

The Messages API supports several content types within message content arrays:

-   **text:** Plain text content, the most common type for both user messages and Claude's responses.
-   **image:** Image content, either base64-encoded or URL-referenced, for visual analysis tasks.
-   **tool\_use:** Generated by Claude when it decides to call a tool. Contains the tool name, input arguments, and a unique ID.
-   **tool\_result:** Sent by the client to provide the result of a tool execution. References the tool\_use\_id.
-   **thinking:** Generated when Extended Thinking is enabled. Contains Claude's internal reasoning process.

### Error Handling

The API uses standard HTTP status codes with specific codes that are important for production applications:

-   **400 Bad Request:** Invalid request format, missing required parameters, or malformed JSON. Fix the request before retrying.
-   **401 Unauthorized:** Invalid or missing API key. Verify your `x-api-key` header.
-   **403 Forbidden:** API key lacks permission for the requested resource or model.
-   **429 Too Many Requests:** Rate limit exceeded on one of the three dimensions (RPM, ITPM, or OTPM). Implement exponential backoff with jitter.
-   **500 Internal Server Error:** Server-side issue. Safe to retry with backoff.
-   **529 Overloaded:** API is temporarily overloaded with too many concurrent requests. Different from 429 in that it reflects system-wide capacity rather than per-client limits. Back off and retry.

Rate limits are enforced per-organization across three dimensions: Requests Per Minute (RPM), Input Tokens Per Minute (ITPM), and Output Tokens Per Minute (OTPM). The specific limits depend on your usage tier, which increases as you use more of the API. Always implement retry logic with exponential backoff and jitter for production applications to handle transient errors gracefully.

### Review Questions

## Module 3: Claude Code Mastery

*Installation, CLAUDE.md hierarchy, slash commands, hooks, Skills, CI/CD, and git workflows*

### What Is Claude Code?

Claude Code is Anthropic's official agentic command-line tool for software development. It runs in your terminal and can read, write, and edit files, execute shell commands, search codebases, manage git operations, and orchestrate complex development workflows. It operates as an intelligent pair programmer that understands your project context and can autonomously complete multi-step development tasks. Claude Code is installed globally via npm with `npm install -g @anthropic-ai/claude-code`, and once installed, you simply run `claude` in any project directory to start an interactive session.

### The Explore-Plan-Code-Commit Cycle

Claude Code follows a disciplined development methodology that mirrors best practices for software engineering:

1.  **Explore:** Before making any changes, Claude reads relevant files, searches the codebase for patterns, examines existing tests, and builds a comprehensive understanding of the current state. It uses tools like Glob (file pattern matching), Grep (content searching), and Read (file reading) to gather context.
2.  **Plan:** Based on exploration, Claude formulates a strategy for implementing the requested changes. For complex tasks, you can explicitly request planning by saying "plan this but don't implement yet," which produces an actionable plan you can review and refine before execution.
3.  **Code:** Claude writes, edits, and tests code. It uses the Edit tool for surgical, precise changes to existing files and the Write tool for creating new files. After making changes, it typically runs tests and checks for errors to verify correctness.
4.  **Commit:** Claude creates well-structured, atomic git commits with descriptive messages that explain what changed and why. It can create branches, stage specific files, and produce clean commit histories that facilitate code review.

This cycle ensures that changes are well-understood, carefully planned, properly implemented, and cleanly committed. It prevents the common anti-pattern of making hasty changes without understanding the full context.

### CLAUDE.md Configuration Hierarchy

CLAUDE.md files are markdown files that provide persistent context and instructions to Claude Code. They are automatically loaded based on a three-level hierarchy, with more specific files taking precedence over more general ones when instructions conflict:

#### 1\. User-Level (~/.claude/CLAUDE.md)

Global preferences that apply to every project you work on with Claude Code. This file is private, stored in your home directory, and never committed to any repository. Typical contents include your preferred coding style, default programming language, personal conventions, common abbreviations or project naming patterns, and any global tool restrictions or behavioral preferences. This is where you put instructions that are about you as a developer rather than about any specific project.

#### 2\. Project-Level (./CLAUDE.md)

Project-specific context placed at the repository root. This is the most commonly used level and the most important one for team collaboration. It typically includes a description of the project's architecture, key technologies and frameworks in use, coding standards and conventions specific to this project, testing requirements and patterns, build and deployment commands, and any domain-specific knowledge Claude needs to work effectively in this codebase. This file should be committed to version control so all team members share the same context when using Claude Code.

#### 3\. Directory-Level (./src/components/CLAUDE.md)

Path-specific instructions that apply only when Claude Code is working within that directory subtree. These are useful when different parts of a codebase follow different conventions. For example, your API routes directory might have a CLAUDE.md specifying that all handlers must validate input with Zod schemas and return proper HTTP status codes, while your UI components directory might have a different CLAUDE.md specifying component naming conventions and state management patterns. Directory-level files provide the most granular control without cluttering the project-level file.

### The .claude/rules/ Directory

For even more granular, pattern-based control, create rule files in `.claude/rules/`. Each rule file uses YAML frontmatter with a `glob` pattern to specify exactly which files the rule applies to:

```markdown
---
glob: "src/api/**/*.ts"
---
All API route handlers in this project must:
- Validate all input parameters using zod schemas
- Return appropriate HTTP status codes (not just 200 and 500)
- Include structured error responses with error codes
- Use the shared logger for request/response logging
- Include request timing middleware
```

Rules are automatically activated when Claude Code operates on files matching the glob pattern. They provide surgical precision without requiring you to create CLAUDE.md files in every subdirectory. Multiple rule files can apply to the same file if their glob patterns overlap.

### Slash Commands

#### Built-in Commands

Claude Code ships with several built-in slash commands for common operations:

-   `/help` — Display all available commands with descriptions
-   `/clear` — Clear the current conversation context to start fresh
-   `/compact` — Summarize the conversation to reclaim context window space while preserving key information
-   `/init` — Generate a CLAUDE.md file for the current project by analyzing the codebase
-   `/review` — Review a GitHub pull request, analyzing code changes for issues and improvements
-   `/cost` — Display token usage and estimated cost for the current session

#### Custom Slash Commands

Create project-specific commands by adding markdown files to `.claude/commands/`. The filename (without extension) becomes the command name. For example, `.claude/commands/test-api.md` creates the `/test-api` command. Custom commands support YAML frontmatter with three configuration fields:

```markdown
---
description: Run the API test suite with detailed coverage reporting
allowed-tools: ["Bash", "Read", "Glob"]
model: claude-sonnet-4-6
---
Run the API test suite with coverage and provide analysis:
1. Execute `npm run test:api -- --coverage`
2. Read the coverage summary report
3. Identify any failing tests and explain likely causes
4. List files with less than 80% coverage
5. Suggest specific test cases to improve coverage
```

### Hooks Lifecycle

Hooks allow you to inject custom logic at three specific points in Claude Code's execution pipeline:

#### UserPromptSubmit

Fires after the user submits a prompt but before Claude begins processing it. Common use cases include injecting additional context (like the current git branch name, deployment environment, or timestamp), validating prompts against organizational policies (blocking prompts that reference production databases, for example), logging user interactions for audit purposes, and adding team-specific context like sprint goals or active incidents.

#### PreToolUse

Fires before Claude executes any tool action. This is your primary safety gate. Use cases include blocking dangerous operations (preventing `rm -rf /` or writes to protected directories), requiring confirmation for destructive actions, adding safety checks before file writes (like ensuring backup copies exist), enforcing tool usage policies (preventing direct database writes, requiring tests before commits), and rate-limiting expensive operations.

#### PostToolUse

Fires after a tool completes execution. Use cases include post-processing tool outputs (formatting, filtering sensitive data), triggering notifications (Slack alerts when files in certain directories are modified), collecting metrics on tool usage patterns, running automated lint or format checks after file modifications, and updating external systems based on Claude Code's actions.

### Skills

Skills are reusable markdown instruction sets that give Claude Code specialized knowledge and step-by-step procedures for specific tasks. Unlike CLAUDE.md files which provide always-on project context, Skills are task-specific and activated only when relevant. A Skill might contain detailed instructions for deploying to a specific cloud platform, running a particular type of migration, setting up a development environment, or following a complex debugging procedure. Skills can be triggered manually by the user or automatically based on the task context.

### CI/CD Integration

Claude Code supports non-interactive (headless) mode for CI/CD pipelines:

```bash
# Run a single prompt non-interactively
claude -p "Run the test suite and report any failures"

# Strip all formatting for raw output suitable for scripts
claude -p "Generate a changelog from the last 5 commits" --bare

# Pipe input for processing
cat error.log | claude -p "Analyze these errors and suggest fixes"

# Use in GitHub Actions or CI scripts
claude -p "Review the diff on this branch for security issues" --bare > review.txt
```

The `-p` flag sends a single prompt, processes it, and exits with the response. The `--bare` flag strips all formatting, color codes, and metadata from the output, producing raw text suitable for piping into other commands or storing in files. These flags together enable integration with any CI/CD system including GitHub Actions, GitLab CI, Jenkins, and custom shell scripts.

### Git Integration

Claude Code has comprehensive git integration capabilities. It can create and switch branches, stage and commit changes with descriptive messages, push to remotes, create pull requests via the GitHub CLI, resolve merge conflicts intelligently, perform interactive rebases, generate changelogs from commit history, and maintain clean commit histories. When making changes, Claude Code produces atomic commits where each commit represents a single logical change with a clear, descriptive message.

### MCP Server Configuration in Claude Code

Claude Code can connect to MCP servers for extended capabilities beyond its built-in tools. Servers are configured in `.claude/mcp.json` at the project level (for project-specific integrations like database access or deployment tools) or in `~/.claude/mcp.json` for globally available servers. The configuration specifies the server command, arguments, environment variables, and any transport-specific settings.

### Review Questions

## Module 4: Agent SDK & Subagents

*Agent architecture, orchestration patterns, subagent isolation, dynamic workflows, and crash recovery*

### Agent SDK Architecture Overview

The Claude Agent SDK provides the building blocks for creating AI agents that can reason, use tools, and accomplish complex tasks autonomously. At its core, an agent is a reasoning loop: it receives input, considers what action to take, executes that action (typically a tool call), observes the result, and repeats this cycle until the task is complete or a stopping condition is met. The SDK manages the conversation state, tool execution mechanics, error recovery, and session persistence so developers can focus on defining agent behavior through system prompts, tool definitions, and orchestration logic rather than infrastructure concerns.

### Core Concepts

#### Agents

An agent is defined by three elements: its system prompt (which defines its personality, capabilities, and constraints), its available tools (the actions it can take), and its model (which determines its reasoning capability and cost). The agent processes messages in a loop, reasoning about each step and making tool calls as needed until it produces a final text response. The agent loop automatically handles the back-and-forth of multi-turn tool use, retries on transient errors, and context window management.

#### Tools

Tools are the actions agents can perform. Each tool has a name, a natural-language description (which the model reads to decide when to call it), and a JSON Schema defining its input parameters. The SDK supports synchronous and asynchronous tool execution, tool composition (where one tool's implementation may involve calling other tools), and per-tool error handling. Tool descriptions should be precise, accurate, and include information about when the tool should (and should not) be used, what it returns, and any side effects.

#### Sessions and Conversations

A session represents a continuous interaction context, maintaining the conversation history and any accumulated state. The conversation is the ordered sequence of messages (user messages, assistant messages including tool\_use blocks, and tool\_result messages) that forms the agent's working memory. Sessions can be persisted to storage for long-running agents and resumed after process restarts, enabling agents that work on tasks spanning hours or days.

### Subagent Architecture

For complex, multi-capability systems, the recommended approach is to compose a system of specialized subagents rather than building a single monolithic agent. This is both more effective (each agent can be optimized for its specific task) and more cost-efficient (simpler agents can use cheaper models).

#### Hub-and-Spoke Orchestration

The primary multi-agent pattern is **hub-and-spoke**: one orchestrator agent (the hub) receives the overall task, analyzes it, and delegates subtasks to specialized subagents (the spokes). The orchestrator is responsible for task decomposition, subagent selection, prompt formulation, result synthesis, and error handling. Each subagent focuses on a specific capability (like code analysis, data extraction, web research, or test generation) and returns its results to the orchestrator for integration.

#### Context Isolation

A defining feature of the subagent architecture is that each subagent gets a **fresh context window**. This is a deliberate design principle, not a limitation, providing four critical benefits:

-   **Focused reasoning:** Subagents see only the information relevant to their specific task, avoiding distraction from unrelated conversation history that could reduce accuracy.
-   **Cost control:** Each subagent's context contains only what it needs, preventing the token cost inflation that comes from carrying full conversation histories across every operation.
-   **Security boundaries:** Different subagents can have different tool permissions. A read-only analysis subagent cannot accidentally write files, and a code-generation subagent cannot access production databases.
-   **Parallelism:** Because subagents are isolated, multiple subagents can run concurrently without context conflicts or race conditions in their reasoning.

The orchestrator bears the responsibility of briefing each subagent with sufficient context to complete its task. Think of delegating to a capable colleague who just sat down at their desk: explain what you need, provide the necessary background, specify the output format, and let them work independently.

#### Subagent Configuration

Each subagent can be independently configured with its own model (Haiku for simple extraction, Sonnet for analysis, Opus for complex reasoning), tool permissions (read-only, write-enabled, or full access), system prompt (tailored instructions for its specific role), and timeout and retry policies (shorter timeouts for simple tasks, longer for complex ones). This independent configuration enables right-sizing resources to each subagent's actual requirements.

### Dynamic Workflows

Introduced in June 2026, Dynamic Workflows enable **fan-out parallelism**. An orchestrator can launch multiple subagents simultaneously, have them work concurrently, and await all their results. The orchestrator specifies completion criteria: wait for all subagents to finish, proceed when any one finishes, or use N-of-M completion (proceed when a specified number finish). This pattern is transformative for tasks like multi-source research (query five different data sources simultaneously), parallel code analysis (analyze different modules concurrently), and bulk data processing (process different data partitions in parallel).

### Performance Outcomes

Performance Outcomes implement **grader-based revision loops**, a quality assurance pattern for agent output. After an agent produces its output, a separate grader agent evaluates the result against defined criteria (like correctness, completeness, format compliance, or safety). If the output does not meet the quality threshold, the original agent receives the grader's feedback and produces a revised version. This loop can repeat a configurable number of times, enabling iterative improvement toward quality targets. This pattern is particularly effective for code generation (check for compilation and test passing), data extraction (verify completeness against source), and content creation (check for factual accuracy and style compliance).

### Error Handling and Crash Recovery

Production agent systems must handle failures at multiple levels:

-   **Tool execution failures:** Wrap tool calls in try/catch blocks and provide meaningful error messages back to the agent, allowing it to attempt alternative approaches or report the issue to the user.
-   **Model errors:** Implement automatic retry with exponential backoff for rate limits (429) and server errors (500/529). Configure fallback models so a Sonnet agent can fall back to Haiku if Sonnet is unavailable.
-   **Context overflow:** Monitor token usage actively and implement conversation compaction (summarizing earlier turns) before hitting context limits. The `/compact` command in Claude Code demonstrates this pattern.
-   **Session persistence:** For agents that run for extended periods, persist session state (conversation history, partial results, current task progress) to durable storage. This enables resumption after process crashes, machine restarts, or deployment updates.
-   **Idempotent operations:** Design tool operations to be safely retriable without duplicate side effects. Use unique identifiers for write operations so that retrying a failed database insert does not create duplicate records.

### Review Questions

## Module 5: MCP (Model Context Protocol)

*Architecture, three primitives, transports, building servers and clients, authentication, and security*

### What Is MCP?

The Model Context Protocol (MCP) is an open standard developed by Anthropic and published at `modelcontextprotocol.io`. It defines a universal protocol for connecting AI models to external data sources and tools. Before MCP, every AI integration required custom code: connecting Claude to a database needed one integration, connecting to a file system needed another, and connecting to an API needed a third. MCP replaces this fragmentation with a single standardized protocol. Any MCP-compliant client can communicate with any MCP-compliant server, creating a composable ecosystem of AI capabilities where new integrations can be shared and reused across the entire community.

### Architecture: Host-Client-Server

#### Hosts

Hosts are the user-facing applications that provide the AI experience. Claude Desktop, IDE plugins (VS Code, JetBrains), Claude Code, and custom applications built with the Agent SDK are all hosts. The host manages the user interface, conversation flow, and overall experience. Each host contains one or more MCP clients that handle connections to servers.

#### Clients

Clients live within hosts and manage individual connections to MCP servers. Each client maintains a **1:1 connection** with a specific server. The client handles protocol negotiation during initialization, routes tool calls and resource requests to the server, and manages the connection lifecycle (startup, health checks, reconnection, shutdown). A single host typically runs multiple clients simultaneously, each connected to a different server.

#### Servers

Servers are programs that expose capabilities through the MCP protocol. A server might provide access to a database, a file system, a web API, a code repository, a cloud platform, or any external system. Servers implement the protocol by declaring their capabilities (tools, resources, prompts) during initialization and responding to client requests. Servers can run locally (on the same machine as the host) or remotely (on a separate server or cloud service).

### Three Core Primitives

#### 1\. Tools

Tools are executable functions that perform actions and return results. They are the most commonly used primitive. Examples include file operations (read, write, search, delete), API calls (HTTP requests, database queries, service invocations), computations (data processing, analysis, transformation), and system operations (running commands, managing processes, deploying applications). Each tool is defined with a name, description, and JSON Schema for its input parameters. The model reads the description to decide when and how to call the tool.

#### 2\. Resources

Resources are read-only contextual data sources identified by URIs. They provide information without performing actions or causing side effects. Examples include file contents (`file:///path/to/document.txt`), database records (`db://users/123`), API responses (`https://api.example.com/data`), and configuration values. Resources are used to feed context into the model's reasoning rather than to perform operations. They support subscriptions for real-time updates when the underlying data changes.

#### 3\. Prompts

Prompts are reusable, parameterized interaction templates that encode common workflows. They define a structured way to initiate a specific type of interaction with the AI. Examples include "Analyze this codebase for security vulnerabilities," "Generate a report from this dataset," or "Debug this error with stack trace analysis." Prompts ensure consistent, optimized interaction patterns and can encode domain expertise and best practices.

### Discovery and Invocation

Clients discover server capabilities through standardized methods:

-   `tools/list` — Enumerate all tools with names, descriptions, and input schemas
-   `resources/list` — Enumerate resources with URIs, names, descriptions, and MIME types
-   `prompts/list` — Enumerate prompt templates with names, descriptions, and parameters
-   `tools/call` — Execute a specific tool with provided arguments
-   `resources/read` — Read the content of a resource by URI
-   `prompts/get` — Retrieve a prompt template with resolved parameters

### Transport Layers

#### stdio (Standard I/O)

For local, same-machine communication. The host launches the server as a subprocess and communicates via stdin/stdout using JSON-RPC messages. This is the simplest transport, requiring no network configuration, ports, or authentication. It is the default for most Claude Code MCP servers and is appropriate when the server runs on the same machine as the host. The server process lifecycle is managed by the host.

#### Streamable HTTP

For remote, multi-client communication over HTTPS. The server runs as an HTTP endpoint, clients connect via HTTP POST requests, and the server uses Server-Sent Events (SSE) for streaming responses. This transport supports multiple concurrent clients, authentication (OAuth 2.0, API keys), TLS encryption, and deployment to cloud infrastructure (containers, serverless functions, VMs). It is the appropriate choice for shared team servers, production deployments, and servers that serve multiple users or applications.

### JSON-RPC Protocol Layer

Underneath the transport, all MCP communication uses JSON-RPC 2.0. Every message is either a request (with an id, method, and params), a response (with the same id and a result or error), or a notification (with a method and params but no id, expecting no response). JSON-RPC provides a well-specified, language-agnostic message format with built-in error codes, request/response correlation via message IDs, and clear semantics for success and failure.

### Capability Negotiation

During initialization, the client and server perform a handshake where they exchange capability declarations. The client announces what it supports (for example, sampling, root file access, notification handling), and the server announces its capabilities (which tools, resources, and prompts it offers, along with any experimental features). This negotiation ensures that both parties understand what features are available and prevents errors from attempting to use unsupported operations. If a server offers sampling but the client does not support it, the server knows not to make sampling requests.

### Building an MCP Server in Python

```python
from mcp.server import Server
from mcp.types import Tool, TextContent

# Create a server instance with a descriptive name
server = Server("my-weather-server")

# Define a tool using the decorator pattern
@server.tool()
async def get_weather(location: str, unit: str = "celsius") -> list[TextContent]:
    """Get current weather for a location.

    Args:
        location: City name, e.g., "San Francisco" or "London"
        unit: Temperature unit, "celsius" or "fahrenheit"
    """
    weather_data = await fetch_weather_api(location, unit)
    return [TextContent(
        type="text",
        text=f"Weather in {location}: {weather_data['temp']}"
             f"{'C' if unit == 'celsius' else 'F'}, "
             f"{weather_data['condition']}"
    )]

# Define a resource
@server.resource("weather://forecast/{city}")
async def get_forecast(city: str) -> str:
    """5-day forecast for a city."""
    forecast = await fetch_forecast_api(city)
    return format_forecast(forecast)

# Run with stdio transport
if __name__ == "__main__":
    import asyncio
    from mcp.server.stdio import stdio_server

    async def main():
        async with stdio_server() as (read_stream, write_stream):
            await server.run(read_stream, write_stream)

    asyncio.run(main())
```

### Advanced Topics

#### Sampling

Sampling allows MCP servers to request LLM completions from the host. This means a tool's implementation can itself use Claude's reasoning to process data, creating recursive AI-powered capabilities. The host controls all sampling requests to ensure user oversight and safety, and can modify or reject sampling requests.

#### Notifications

Servers send notifications for resource updates, progress reporting during long operations, capability changes (tools added/removed), and logging events. Notifications are fire-and-forget JSON-RPC messages with no expected response.

#### Security Considerations

Apply the principle of least privilege: restrict filesystem access to declared roots, limit tool capabilities to what is needed. Validate all inputs server-side. Use OAuth 2.0 or API keys for remote server authentication. Run untrusted servers in sandboxes or containers. Implement comprehensive audit logging for all tool invocations and resource accesses.

### Review Questions

## Module 6: Prompt Engineering

*System prompts, XML tags, chain-of-thought, extended thinking, structured output, and anti-patterns*

### Core Principles

Effective prompt engineering with Claude is built on a foundation of clarity, structure, and iteration:

-   **Be specific and explicit:** Claude performs best with clear, detailed instructions. Instead of "summarize this," write "summarize this article in exactly 3 bullet points, each under 20 words, focusing on the business impact of the findings." Specificity eliminates ambiguity and produces consistently better results.
-   **Provide context before the task:** Place background information, relevant data, reference documents, and constraints before the actual instruction. Claude processes content sequentially and benefits from having context established before it encounters the task to perform.
-   **Use structured formats:** When you need structured output (JSON, tables, specific templates), demonstrate the exact format you want. Providing an example of the desired output dramatically improves format consistency over verbal descriptions alone.
-   **Iterate and refine:** Treat prompts as code that requires testing and refinement. Version control your prompts, test them against diverse inputs including edge cases, and refine based on observed outputs. Small wording changes can significantly impact result quality.

### System Prompts: Best Practices

The system prompt defines Claude's behavior, personality, and constraints for the conversation. Critical best practices:

-   **Front-load critical instructions:** Claude has a slight primacy bias, giving more attention to early instructions. Place the most important directives (role definition, critical constraints, output format requirements) at the beginning of the system prompt.
-   **Define the role clearly:** "You are a senior Python developer with 15 years of experience, specializing in security vulnerabilities in web applications. You are reviewing code submitted by junior developers."
-   **Specify output expectations:** Define what to include, what to exclude, desired length, structure, and level of detail. "Always include code examples. Limit explanations to 3 paragraphs. Use bullet points for lists of recommendations."
-   **Include constraints and guardrails:** Explicitly state topics to avoid, information not to fabricate, and boundaries of the task. "If you are unsure about a security recommendation, say so rather than guessing. Do not suggest disabling security features as a solution."
-   **Focus on behavior, not content:** The system prompt should define how Claude responds (communication style, format, reasoning approach), not serve as a content encyclopedia. Domain knowledge belongs in user messages or attached documents.

### The XML Tag Technique

Anthropic specifically recommends XML tags for structuring complex prompts. XML tags provide clear, unambiguous semantic boundaries that Claude reliably understands and respects. They outperform markdown headers, bullet point lists, or plain text separators for delineating different sections of a prompt because they have explicit opening and closing markers that prevent content bleed-through between sections.

```xml
<context>
You are reviewing a Python web application that handles user authentication.
The application uses Flask with SQLAlchemy ORM and serves 50,000 active users.
</context>

<code_to_review>
def login(username, password):
    user = db.query(f"SELECT * FROM users WHERE name='{username}'")
    if user and user.password == password:
        return create_session(user)
    return None
</code_to_review>

<task>
Identify all security vulnerabilities in this code.
For each vulnerability:
1. Name the vulnerability type (e.g., SQL Injection, Insecure Comparison)
2. Explain the specific risk in the context of a user auth system
3. Provide a corrected code snippet with the fix applied
4. Rate the severity as Critical, High, Medium, or Low
</task>
```

Commonly used XML tags include `<context>`, `<instructions>`, `<examples>`, `<constraints>`, `<output_format>`, `<document>`, `<task>`, and `<rules>`. You can define any tag name that is semantically clear for your use case.

### Few-Shot Prompting

Providing examples is one of the most effective techniques for controlling Claude's output format and reasoning approach. Include 2-5 examples that demonstrate the exact input-output pattern you expect. Well-chosen examples communicate format, style, level of detail, and reasoning approach more effectively than verbal instructions.

```xml
<examples>
<example>
<input>Server returned 503 error at 3:42 PM during peak traffic.</input>
<output>{"severity": "high", "category": "availability",
 "timestamp": "15:42", "action": "investigate_immediately",
 "summary": "Service unavailable during peak hours"}</output>
</example>
<example>
<input>CPU usage peaked at 78% during morning batch job.</input>
<output>{"severity": "low", "category": "performance",
 "timestamp": "morning", "action": "monitor",
 "summary": "Expected CPU spike during scheduled batch"}</output>
</example>
</examples>

Now classify this alert:
<input>Database connection pool exhausted at 2:15 AM, 3 retries failed.</input>
```

### Chain-of-Thought Prompting

For tasks requiring multi-step reasoning, math, or complex analysis, explicitly instruct Claude to think step by step: "Think through this problem step by step, showing your reasoning at each stage before giving your final answer." This technique improves accuracy on tasks where the correct answer depends on correctly executing a sequence of logical steps.

Chain-of-thought is valuable when you want to see and verify the reasoning process. For production applications where you need better answers but do not need to inspect the reasoning, Claude's internal reasoning capabilities (particularly Extended Thinking) are usually more efficient.

### Extended Thinking

Extended Thinking, generally available since June 2026, gives Claude a dedicated "thinking" phase before generating its visible response. This is controlled by the `budget_tokens` parameter, which allocates a separate token budget specifically for internal reasoning that is not constrained by the `max_tokens` output limit.

-   **High budget (10,000+ tokens):** Complex multi-step problems, mathematical proofs, code architecture decisions, nuanced ethical analysis, tasks requiring consideration of many interacting factors, and problems where the first answer is often wrong without careful deliberation.
-   **Low budget (1,000-5,000 tokens):** Moderate complexity tasks that benefit from brief reflection: code review, complex document summarization, multi-criteria evaluation, and decisions with a few competing options.
-   **No extended thinking:** Simple, well-defined tasks where the answer is straightforward: classification, entity extraction, format conversion, simple Q&A, and template filling.

The thinking content is returned in a separate `thinking` content block that precedes the main response. You can inspect this block to understand Claude's reasoning process, which is invaluable for debugging, quality assurance, and building trust in AI-generated outputs.

### Structured Output Patterns

#### JSON Mode

For JSON output, explicitly describe the schema you expect in the prompt, including field names, types, allowed values, and structure. Claude will generate valid JSON matching your specification. For best results, include a concrete example of the expected output format.

#### Tool Use for Guaranteed Schema Compliance

For production applications requiring guaranteed schema compliance, define a tool whose `input_schema` matches your desired output format. When Claude "calls" this tool, the input arguments are your structured output, validated against the JSON Schema. This is more reliable than asking for JSON in the prompt text because the schema is programmatically enforced by the API, not just suggested in natural language.

### Temperature and Sampling

Temperature controls randomness in output generation. Temperature 0 produces the most deterministic output (always selecting the highest-probability token at each step). Higher temperatures (0.5-1.0) introduce more variety and creativity. For production applications requiring consistency and reproducibility, use temperature 0. For creative tasks, brainstorming, or generating diverse options, use temperatures of 0.5-0.8. Temperatures above 1.0 are rarely useful as they introduce too much randomness.

### Prompt Chaining

For complex tasks, decompose the work into a pipeline of simpler prompts where each step's output feeds into the next step's input. Benefits include: easier debugging (isolate the failing step), ability to use different models for different steps (Haiku for classification, Opus for analysis), independent optimization of each prompt, and clearer error attribution. Example pipeline: (1) Extract key facts from document, (2) Analyze implications of each fact, (3) Generate actionable recommendations based on analysis.

### Common Anti-Patterns to Avoid

-   **Vague instructions:** "Make it better" provides no criteria. Specify what "better" means in measurable terms.
-   **Contradictory constraints:** "Be extremely concise but cover every detail exhaustively" creates irreconcilable goals. Prioritize when constraints conflict.
-   **Over-prompting:** Including unnecessary instructions dilutes the important ones and can confuse the model. Every instruction should earn its place.
-   **Assuming shared context:** Claude does not remember previous conversations. Always include necessary context in the current interaction.
-   **Neglecting evaluation:** Never deploy prompts to production without testing on diverse inputs including adversarial edge cases.
-   **Ignoring the system prompt:** Putting all instructions in user messages wastes the system prompt's advantages of persistent behavioral configuration across conversation turns.

### Review Questions

## Module 7: Building Production Applications

*Deployment, cost optimization, rate limiting, security, reliability patterns, and testing*

### Deployment Patterns

#### Direct API Integration

Call the Anthropic API directly from your application for maximum control over request parameters, immediate access to latest model versions, and direct access to all API features. Best for teams that want full control and operate outside of regulated cloud environments.

#### Cloud Platform Integration

Use Claude through AWS Bedrock or Google Cloud Vertex AI for existing cloud billing integration, compliance with cloud-specific security and data residency requirements, integration with cloud-native services, and VPC-level network isolation. Trade-offs include potential model version lag and cloud-specific API differences that require adaptation.

#### Agent-Based Architectures

Build autonomous agents for complex, multi-step tasks requiring tool use, decision making, and iterative refinement. Agent architectures enable capabilities that simple request-response patterns cannot achieve, but introduce additional complexity around state management, error recovery, cost control, and observability.

### Cost Optimization

#### Prompt Caching

Mark frequently reused prefixes (system prompts, reference documents, tool definitions) with `cache_control` breakpoints. Cached tokens cost **10% of base input token price**. The first request pays full price to populate the cache; subsequent requests with the same prefix hit the cache. Extremely effective when many conversations share identical system prompts or when you include large reference documents that remain constant across interactions.

#### Batch API

For non-time-sensitive workloads, the Batch API provides **50% cost savings** on up to 10,000 requests processed asynchronously within 24 hours. Ideal for evaluation runs, bulk document processing, data extraction pipelines, and scheduled report generation.

#### Tiered Model Selection

Use **Haiku for routing, classification, and simple tasks**; **Sonnet for standard processing** like code generation and analysis; and **Opus for complex reasoning** requiring deep thinking. A routing layer that classifies incoming requests and directs them to the appropriate model tier can reduce costs by **60-80%** compared to using a single model for all traffic.

#### Context Window Management

Minimize tokens per request: summarize long conversations instead of sending full history, use RAG to include only relevant context, truncate tool results to essential information, and remove redundant instructions already in the system prompt. Set `max_tokens` to the minimum needed for each task type.

### Rate Limiting Strategies

Implement a **token bucket rate limiter** in your application that fills at your rate limit's rate and empties with each request. When empty, queue or reject requests. Add **exponential backoff with jitter** for retry logic: wait 1s, 2s, 4s, 8s with random jitter to prevent thundering herd effects. Set maximum retry counts (3-5) and maximum backoff duration (60s).

### Security Best Practices

-   **API Key Management:** Use secret managers, never version control. Rotate regularly. Use scoped keys with minimum permissions.
-   **Input Validation:** Sanitize all user inputs before including in prompts. Prevent prompt injection by treating user input as data, not instructions. Use XML tags to delineate user content from system instructions.
-   **Output Filtering:** Filter Claude's output for sensitive information, validate format, and check policy compliance before displaying to users.
-   **Data Privacy:** Understand data retention policies. Minimize PII in prompts. Implement data classification to ensure sensitive data is handled appropriately.

### Reliability Patterns

-   **Retry with backoff:** Automatic retries for transient errors (429, 500, 529) with exponential backoff and jitter.
-   **Fallback models:** If Opus is unavailable, fall back to Sonnet; if Sonnet is unavailable, fall back to Haiku. Handle reduced capability gracefully.
-   **Circuit breakers:** Trip after a threshold of consecutive failures to prevent cascading failures. Periodically test for recovery.
-   **Idempotent operations:** Use idempotency keys so retries do not create duplicate side effects.

### Monitoring and Observability

Track: time-to-first-token (TTFT), total response time, tokens per second, tool execution latency, error rates by type and code, and cost per interaction. Use distributed tracing with unique trace IDs spanning agent interactions and subagent calls. Log all API requests and responses with structured logging (JSON format) including model version, token counts, and session IDs. Set up dashboards and alerting for anomalies.

### Testing AI Applications

-   **Evaluation frameworks:** Test prompts against diverse inputs with defined success criteria. Calculate pass rates and track them over time.
-   **Regression testing:** Maintain golden test cases with known-good outputs. Run after every prompt, model, or system change.
-   **A/B testing:** Test prompt variations and model choices against real user interactions. Measure task completion rate, user satisfaction, and cost.

### Review Questions

## Module 8: Certification Readiness Checklist

*Self-assessment, gap analysis, study plans, exam registration, and final tips*

### CCA-F Domain Self-Assessment

Use the interactive checklist below to assess your readiness. Click the buttons to rate each topic as "Confident" (green), "Review" (yellow), or "Learn" (red). Your selections are saved automatically to localStorage.

#### D1: Agentic Architecture (27%)

Design multi-agent systems with orchestrator and specialist subagents

Implement hub-and-spoke orchestration patterns

Apply context isolation principles in subagent design

Use Dynamic Workflows for parallel fan-out

Implement Performance Outcomes (grader-based revision loops)

Design crash recovery and session persistence strategies

Configure subagent model, tools, and permissions independently

#### D2: Tool Design & MCP (18%)

Explain the MCP host-client-server architecture

Build an MCP server with tools, resources, and prompts in Python

Design tool schemas with clear descriptions and JSON Schema

Choose between stdio and Streamable HTTP transports

Implement authentication for remote MCP servers

Handle the tool\_use / tool\_result cycle in the Messages API

#### D3: Claude Code (20%)

Explain the three-level CLAUDE.md hierarchy and precedence rules

Create custom slash commands with YAML frontmatter

Configure hooks (UserPromptSubmit, PreToolUse, PostToolUse)

Use .claude/rules/ with glob-pattern-based contextual rules

Run Claude Code in CI/CD with -p and --bare flags

Configure MCP servers within Claude Code (.claude/mcp.json)

#### D4: Prompt Engineering (20%)

Structure complex prompts with XML tags per Anthropic recommendations

Configure Extended Thinking with appropriate budget\_tokens

Use few-shot examples to control output format and reasoning

Get guaranteed structured output via tool-use JSON Schema

Design and optimize system prompts following best practices

Implement prompt chaining for multi-phase complex tasks

#### D5: Context & Reliability (15%)

Implement prompt caching with cache\_control breakpoints

Handle rate limits with exponential backoff and jitter

Manage context windows efficiently (summarization, RAG, truncation)

Implement circuit breakers and fallback model chains

Design idempotent operations for safe retry behavior

### Study Plans

### Exam Registration and Resources

**Key Links:**

-   **Pearson VUE (CCA-F exam):** pearsonvue.com/us/en/anthropic.html
-   **Anthropic Academy:** anthropic.skilljar.com
-   **Claude Platform Docs:** platform.claude.com/docs
-   **MCP Documentation:** modelcontextprotocol.io
-   **Claude Code Docs:** docs.anthropic.com/en/docs/claude-code

#### CCA-F (Certified Claude AI - Foundational)

The developer-focused proctored exam through Pearson VUE covering five domains: Agentic Architecture (27%), Tool Design & MCP (18%), Claude Code (20%), Prompt Engineering (20%), and Context & Reliability (15%). Study the developer track courses and this guide thoroughly.

#### CCAO-F (Certified Claude AI Operations - Foundational)

Opened **July 13, 2026** for non-developers. Covers 7 domains at **$99**. Designed for business analysts, project managers, product managers, and professionals who use Claude without writing code. The AI Fluency courses are primary preparation material.

### Final Tips

-   **Know domain weights.** D1 (27%) + D3 (20%) = 47% of the exam. Prioritize these if triaging study time.
-   **Hands-on practice matters.** Build MCP servers, design agent systems, write optimized prompts. The exam tests applied knowledge.
-   **Understand "why" not just "how."** Know why context isolation matters, why XML tags are recommended, why caching reduces costs.
-   **Read official docs.** This guide complements but does not replace official Anthropic documentation and Academy courses.
-   **Time management.** Do not dwell on any single question. Flag and return to difficult ones.
-   **Read carefully.** Watch for qualifiers: "always," "never," "best," "most appropriate."
-   **Eliminate wrong answers.** On uncertain questions, eliminate obviously incorrect options first.
-   **Rest before the exam.** A well-rested mind outperforms extra cramming.

Anthropic Academy Complete Study Guide

This guide is an independent study companion. Not officially endorsed by Anthropic.
For the latest information, visit [anthropic.skilljar.com](https://anthropic.skilljar.com) and [docs.anthropic.com](https://docs.anthropic.com).