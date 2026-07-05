# OpenAI Realtime API — Interactive Course

## Setup & First WebSocket Connection

*Get your environment ready and establish a live connection to the Realtime API.*

### Prerequisites

You'll need an OpenAI API key with access to the Realtime models, Node.js 18+ or Python 3.10+, and a microphone for later modules. Set your key as an environment variable:

bash

```bash
export OPENAI_API_KEY="sk-..."
```

### Install Dependencies

bash

```bash
# Python
pip install websockets numpy

# Node.js
npm install ws
```

### Your First WebSocket Connection

The Realtime API uses a persistent WebSocket at `wss://api.openai.com/v1/realtime`. When the connection opens, the server sends a `session.created` event confirming you're live.

python

```python
import asyncio
import json
import websockets
import os

API_KEY = os.environ["OPENAI_API_KEY"]
URL = "wss://api.openai.com/v1/realtime?model=gpt-realtime"

async def connect():
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "OpenAI-Beta": "realtime=v1"
    }
    async with websockets.connect(URL, additional_headers=headers) as ws:
        # The first event is always session.created
        event = json.loads(await ws.recv())
        print(f"✅ Connected! Session: {event['session']['id']}")

        # Configure the session
        await ws.send(json.dumps({
            "type": "session.update",
            "session": {
                "instructions": "You are a friendly assistant.",
                "voice": "alloy",
                "input_audio_format": "pcm16",
                "output_audio_format": "pcm16",
                "turn_detection": {
                    "type": "server_vad",
                    "threshold": 0.5,
                    "silence_duration_ms": 600
                }
            }
        }))

        updated = json.loads(await ws.recv())
        print(f"✅ Session configured: {updated['type']}")

asyncio.run(connect())
```

javascript

```javascript
import WebSocket from "ws";

const ws = new WebSocket(
  "wss://api.openai.com/v1/realtime?model=gpt-realtime",
  {
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "OpenAI-Beta": "realtime=v1",
    },
  }
);

ws.on("open", () => {
  ws.send(JSON.stringify({
    type: "session.update",
    session: {
      instructions: "You are a friendly assistant.",
      voice: "alloy",
      input_audio_format: "pcm16",
      output_audio_format: "pcm16",
      turn_detection: { type: "server_vad" },
    },
  }));
});

ws.on("message", (raw) => {
  const event = JSON.parse(raw.toString());
  console.log(`📨 ${event.type}`);
});

ws.on("error", (err) => console.error("Error:", err));
```

> **Tip:** **💡 Tip**Run either script — you should see `session.created` followed by `session.updated`. If you get a 401, double-check your API key.

Exercise 1.1

#### Connect and Inspect

Run the connection script above. After receiving `session.updated`, print the full session config object to see all available settings (voice list, supported formats, default turn detection). Modify the `voice` field to `"coral"` and re-run.

Successfully connected to the Realtime API via WebSocket Sent a session.update and confirmed the configuration Experimented with different voice and turn detection settings

## Voice Chat — Build a Basic Voice Assistant

*Stream microphone audio to GPT-Realtime-2, receive spoken responses, and handle multi-turn conversation.*

### Audio Pipeline Overview

A voice chat has three moving parts: **capture** audio from the microphone, **stream** it to the API as base64-encoded PCM16 chunks, and **play back** the model's audio response. The server's VAD detects when you stop speaking and triggers a response automatically.

### Python — Full Microphone Chat

python

```python
import asyncio, json, base64, os
import websockets
import numpy as np

# pip install sounddevice
import sounddevice as sd

API_KEY = os.environ["OPENAI_API_KEY"]
URL = "wss://api.openai.com/v1/realtime?model=gpt-realtime"
SAMPLE_RATE = 24000
CHUNK_DURATION_MS = 100
CHUNK_SAMPLES = int(SAMPLE_RATE * CHUNK_DURATION_MS / 1000)

async def voice_chat():
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "OpenAI-Beta": "realtime=v1"
    }

    async with websockets.connect(URL, additional_headers=headers) as ws:
        await ws.recv()  # session.created

        await ws.send(json.dumps({
            "type": "session.update",
            "session": {
                "instructions": "You are a concise, friendly voice assistant.",
                "voice": "alloy",
                "input_audio_format": "pcm16",
                "output_audio_format": "pcm16",
                "turn_detection": {
                    "type": "server_vad",
                    "threshold": 0.5,
                    "silence_duration_ms": 700
                }
            }
        }))
        await ws.recv()  # session.updated
        print("🎤 Listening... (Ctrl+C to stop)\n")

        # --- Mic capture task ---
        audio_queue = asyncio.Queue()

        def mic_callback(indata, frames, time_info, status):
            audio_queue.put_nowait(indata.copy())

        stream = sd.InputStream(
            samplerate=SAMPLE_RATE,
            channels=1,
            dtype="int16",
            blocksize=CHUNK_SAMPLES,
            callback=mic_callback,
        )
        stream.start()

        async def send_audio():
            while True:
                chunk = await audio_queue.get()
                encoded = base64.b64encode(chunk.tobytes()).decode()
                await ws.send(json.dumps({
                    "type": "input_audio_buffer.append",
                    "audio": encoded
                }))

        # --- Receive task ---
        async def receive_events():
            playback_buffer = bytearray()
            async for msg in ws:
                event = json.loads(msg)
                t = event["type"]

                if t == "response.audio.delta":
                    audio = base64.b64decode(event["delta"])
                    playback_buffer.extend(audio)

                elif t == "response.audio_transcript.delta":
                    print(event["delta"], end="", flush=True)

                elif t == "response.done":
                    print()  # newline
                    if playback_buffer:
                        samples = np.frombuffer(
                            playback_buffer, dtype=np.int16
                        )
                        sd.play(samples, SAMPLE_RATE)
                        sd.wait()
                        playback_buffer.clear()

                elif t == "error":
                    print(f"\n❌ Error: {event['error']}")

        await asyncio.gather(send_audio(), receive_events())

asyncio.run(voice_chat())
```

**ℹ️ Note**Install `sounddevice` and `numpy` first: `pip install sounddevice numpy`. On macOS you may also need `brew install portaudio`.

### Browser — WebRTC Voice Chat

javascript

```javascript
// browser-voice-chat.js
// Requires a server endpoint POST /api/token that returns
// { client_secret: { value: "ek_..." } }

async function startVoiceChat() {
  // 1. Get ephemeral key
  const res = await fetch("/api/token", { method: "POST" });
  const { client_secret } = await res.json();

  // 2. Set up WebRTC
  const pc = new RTCPeerConnection();

  // Audio playback
  const audio = document.createElement("audio");
  audio.autoplay = true;
  pc.ontrack = (e) => (audio.srcObject = e.streams[0]);

  // Mic capture
  const mic = await navigator.mediaDevices.getUserMedia({ audio: true });
  pc.addTrack(mic.getAudioTracks()[0], mic);

  // Data channel for events
  const dc = pc.createDataChannel("oai-events");
  dc.onopen = () => {
    dc.send(JSON.stringify({
      type: "session.update",
      session: {
        instructions: "You are a helpful assistant.",
        voice: "alloy",
        turn_detection: { type: "server_vad" },
      },
    }));
    document.getElementById("status").textContent = "🎤 Listening...";
  };

  dc.onmessage = (e) => {
    const evt = JSON.parse(e.data);
    if (evt.type === "response.audio_transcript.delta") {
      document.getElementById("transcript").textContent += evt.delta;
    } else if (evt.type === "response.done") {
      document.getElementById("transcript").textContent += "\n";
    }
  };

  // 3. SDP exchange
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);

  const sdpRes = await fetch(
    "https://api.openai.com/v1/realtime?model=gpt-realtime",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${client_secret.value}`,
        "Content-Type": "application/sdp",
      },
      body: offer.sdp,
    }
  );
  await pc.setRemoteDescription({
    type: "answer",
    sdp: await sdpRes.text(),
  });
}

startVoiceChat();
```

Exercise 2.1

#### Multi-Turn Voice Conversation

Using either the Python or browser example, have a 3-turn conversation with the model. Ask it to remember your name, then ask a follow-up question, and verify it retains context. Observe the `speech_started` and `speech_stopped` events in the console.

Exercise 2.2

#### Interruption Handling

Start speaking while the model is responding. Watch for the `response.done` event with `"status": "cancelled"`. Try adjusting `silence_duration_ms` (300 vs 1000) and observe how it affects the conversation feel.

Built a working voice chat (Python or browser) Held a multi-turn conversation with context retention Tested interruption and different VAD settings

## Tool Use — Give Your Voice Agent Abilities

*Connect your agent to external APIs with real-time function calling: weather, search, databases, and more.*

### How Function Calling Works in Realtime

Tool use in a voice conversation follows the same pattern as the Chat API, but happens asynchronously over the WebSocket. You define tools in `session.update`, the model decides when to call them, and you return results via `conversation.item.create`.

GPT-Realtime-2 can call **multiple tools in parallel** and speaks natural filler phrases ("let me check that for you…") while waiting for results.

### Define Tools

python

```python
tools = [
    {
        "type": "function",
        "name": "get_weather",
        "description": "Get the current weather for a location.",
        "parameters": {
            "type": "object",
            "properties": {
                "city": {
                    "type": "string",
                    "description": "City name, e.g. 'Tokyo'"
                }
            },
            "required": ["city"]
        }
    },
    {
        "type": "function",
        "name": "search_web",
        "description": "Search the web for current information.",
        "parameters": {
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "The search query"
                }
            },
            "required": ["query"]
        }
    }
]

await ws.send(json.dumps({
    "type": "session.update",
    "session": {
        "instructions": "You are a helpful assistant with access to weather and search tools.",
        "tools": tools,
        "tool_choice": "auto"
    }
}))
```

### Handle Tool Calls

python

```python
import httpx  # pip install httpx

async def execute_tool(name: str, args: dict) -> str:
    if name == "get_weather":
        # Replace with a real weather API
        return json.dumps({
            "city": args["city"],
            "temp": "22°C",
            "condition": "Partly cloudy"
        })
    elif name == "search_web":
        return json.dumps({
            "query": args["query"],
            "results": ["Result 1", "Result 2"]
        })
    return json.dumps({"error": "Unknown tool"})

async def receive_with_tools(ws):
    async for msg in ws:
        event = json.loads(msg)
        t = event["type"]

        if t == "response.function_call_arguments.done":
            name = event["name"]
            call_id = event["call_id"]
            args = json.loads(event["arguments"])

            print(f"🔧 Calling {name}({args})")
            result = await execute_tool(name, args)

            # Return the result
            await ws.send(json.dumps({
                "type": "conversation.item.create",
                "item": {
                    "type": "function_call_output",
                    "call_id": call_id,
                    "output": result
                }
            }))

            # Tell the model to continue
            await ws.send(json.dumps({
                "type": "response.create"
            }))

        elif t == "response.audio_transcript.delta":
            print(event["delta"], end="", flush=True)

        elif t == "response.done":
            print()
```

> **Tip:** **💡 Parallel Tool Calls**GPT-Realtime-2 may fire multiple `function_call_arguments.done` events before a `response.done`. Collect all results and send them back before calling `response.create`.

Exercise 3.1

#### Weather Voice Agent

Combine the voice chat from Module 2 with the tool-calling code above. Ask the model "What's the weather in Tokyo?" and verify it calls `get_weather`, then speaks the result. Replace the stub with a real weather API (e.g., OpenWeatherMap free tier).

Exercise 3.2

#### Multi-Tool Agent

Add a third tool — `set_reminder` — that logs a reminder to a file. Ask the model: "What's the weather in Paris, and remind me to bring an umbrella if it's rainy." Observe parallel tool calls and the spoken preamble.

Defined tools and received function calls over WebSocket Returned tool results and received spoken responses Connected at least one real external API

## Live Translation with GPT-Realtime-Translate

*Build a real-time speech translator that handles 70+ input languages and 13 output languages.*

### How Realtime-Translate Works

GPT-Realtime-Translate is a purpose-built model for live speech translation. You stream audio in one language, and it outputs translated audio in another. The model auto-detects the input language (or you can specify it), and you set the target language in the instructions.

| Output Languages (13) |
| --- |
| English, Spanish, French, German, Italian, Portuguese, Japanese, Korean, Chinese (Mandarin), Hindi, Arabic, Russian, Dutch |

### Translation Session

python

```python
import asyncio, json, base64, os
import websockets

API_KEY = os.environ["OPENAI_API_KEY"]
TRANSLATE_URL = "wss://api.openai.com/v1/realtime?model=gpt-realtime-translate"

async def live_translate(target_language="Spanish"):
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "OpenAI-Beta": "realtime=v1"
    }

    async with websockets.connect(
        TRANSLATE_URL, additional_headers=headers
    ) as ws:
        await ws.recv()  # session.created

        await ws.send(json.dumps({
            "type": "session.update",
            "session": {
                "instructions": f"Translate all speech to {target_language}.",
                "input_audio_format": "pcm16",
                "output_audio_format": "pcm16",
                "turn_detection": {
                    "type": "server_vad",
                    "silence_duration_ms": 300
                }
            }
        }))
        await ws.recv()  # session.updated
        print(f"🌍 Translating to {target_language}...")

        # In production: stream mic audio in, play translated audio out
        # Same send/receive pattern as Module 2

        async for msg in ws:
            event = json.loads(msg)
            if event["type"] == "response.audio_transcript.delta":
                print(event["delta"], end="", flush=True)
            elif event["type"] == "response.done":
                print()

asyncio.run(live_translate("Japanese"))
```

**⚠️ Latency Note**Translation latency is typically 1–2 seconds depending on phrase length. For live events, consider a slight display delay to ensure smooth output.

Exercise 4.1

#### Build a Bidirectional Translator

Create a two-session setup: one translating English → Spanish, and another translating Spanish → English. Simulate a bilingual conversation by alternating which session receives audio. Display both the original transcript and the translation side by side.

Exercise 4.2

#### Language Auto-Detection

Remove the language hint from the session config and speak in three different languages (e.g., English, French, German). Observe whether the model correctly detects each language and translates to your target.

Set up a live translation session with Realtime-Translate Translated speech between at least two language pairs Tested auto language detection

## Streaming Transcription with Realtime-Whisper

*Build a live speech-to-text system with word-level timestamps and language detection.*

### Realtime-Whisper vs Batch Whisper

| Feature | Batch Whisper | Realtime-Whisper |
| --- | --- | --- |
| Input | Complete file (≤25 MB) | Streaming audio chunks |
| Output | Full transcript after processing | Incremental text as you speak |
| Latency | Seconds–minutes | Sub-second |
| Price | $0.006 / min | $0.017 / min |
| Best for | Recorded audio, podcasts | Live captioning, real-time apps |

### Streaming Transcription

python

```python
import asyncio, json, base64, os, time
import websockets

API_KEY = os.environ["OPENAI_API_KEY"]
WHISPER_URL = "wss://api.openai.com/v1/realtime?model=gpt-realtime-whisper"

async def live_transcribe():
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "OpenAI-Beta": "realtime=v1"
    }

    async with websockets.connect(
        WHISPER_URL, additional_headers=headers
    ) as ws:
        await ws.recv()  # session.created

        await ws.send(json.dumps({
            "type": "session.update",
            "session": {
                "input_audio_format": "pcm16",
                "turn_detection": {
                    "type": "server_vad",
                    "silence_duration_ms": 500
                }
            }
        }))
        await ws.recv()  # session.updated
        print("📝 Transcribing... speak now.\n")

        # Mic capture (same pattern as Module 2)
        # ... send audio chunks ...

        transcript_lines = []
        current_line = ""
        start_time = time.time()

        async for msg in ws:
            event = json.loads(msg)
            t = event["type"]

            if t == "response.audio_transcript.delta":
                current_line += event["delta"]
                elapsed = time.time() - start_time
                # Overwrite the current line
                print(f"\r[{elapsed:6.1f}s] {current_line}", end="", flush=True)

            elif t == "response.done":
                if current_line.strip():
                    transcript_lines.append(current_line.strip())
                    print()  # finalize line
                current_line = ""

        # Save transcript
        with open("transcript.txt", "w") as f:
            f.write("\n".join(transcript_lines))

asyncio.run(live_transcribe())
```

### JavaScript — Browser Captioning

javascript

```javascript
// Uses WebRTC for low-latency browser transcription
async function startCaptioning() {
  const res = await fetch("/api/whisper-token", { method: "POST" });
  const { client_secret } = await res.json();

  const pc = new RTCPeerConnection();
  const mic = await navigator.mediaDevices.getUserMedia({ audio: true });
  pc.addTrack(mic.getAudioTracks()[0], mic);

  const dc = pc.createDataChannel("oai-events");
  const captionEl = document.getElementById("captions");

  dc.onopen = () => {
    dc.send(JSON.stringify({
      type: "session.update",
      session: {
        input_audio_format: "pcm16",
        turn_detection: { type: "server_vad" },
      },
    }));
  };

  let currentLine = "";
  dc.onmessage = (e) => {
    const evt = JSON.parse(e.data);
    if (evt.type === "response.audio_transcript.delta") {
      currentLine += evt.delta;
      captionEl.textContent = currentLine;
    } else if (evt.type === "response.done") {
      const p = document.createElement("p");
      p.textContent = currentLine;
      captionEl.parentElement.insertBefore(p, captionEl);
      currentLine = "";
      captionEl.textContent = "";
    }
  };

  // SDP exchange (same as Module 2 WebRTC pattern)
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  const sdp = await fetch(
    "https://api.openai.com/v1/realtime?model=gpt-realtime-whisper",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${client_secret.value}`,
        "Content-Type": "application/sdp",
      },
      body: offer.sdp,
    }
  );
  await pc.setRemoteDescription({ type: "answer", sdp: await sdp.text() });
}
```

Exercise 5.1

#### Live Captioning App

Build a simple HTML page with a large caption area. Use the browser code above to display real-time captions as you speak. Add timestamps to each finalized line. Test with multiple languages to see auto-detection in action.

Exercise 5.2

#### Meeting Transcriber

Extend the Python transcription script to save a timestamped transcript to a text file. Add speaker detection (hint: use silence gaps > 2 seconds as speaker boundaries). Run it during a conversation and review the output.

Streaming transcription working with Realtime-Whisper Built a live captioning UI (browser or terminal) Saved timestamped transcripts to a file

## Capstone — Build a Complete Voice-Powered App

*Combine everything into a production-grade voice agent with the OpenAI Agents SDK, tool use, translation, and error handling.*

### Project: Multilingual Customer Support Agent

Build an agent that greets the user in their language, answers questions using tools, and can hand off to specialized sub-agents. We'll use the OpenAI Agents SDK for clean orchestration.

### Install the Agents SDK

bash

```bash
pip install 'openai-agents[voice]'
```

### Define the Agent Graph

python

```python
from agents import Agent, function_tool
from agents.realtime import RealtimeAgent, RealtimeSession

# --- Tools ---
@function_tool
def check_order_status(order_id: str) -> str:
    """Look up the current status of a customer order."""
    # Replace with real database lookup
    statuses = {
        "ORD-001": "Shipped — arriving May 10",
        "ORD-002": "Processing — expected ship date May 12",
    }
    return statuses.get(order_id, f"Order {order_id} not found.")

@function_tool
def search_faq(question: str) -> str:
    """Search the FAQ knowledge base."""
    faqs = {
        "return": "Returns accepted within 30 days with receipt.",
        "shipping": "Free shipping on orders over $50.",
        "hours": "Support available Mon-Fri, 9 AM - 6 PM EST.",
    }
    for key, answer in faqs.items():
        if key in question.lower():
            return answer
    return "I couldn't find an answer. Let me connect you with a specialist."

@function_tool
def escalate_to_human(reason: str) -> str:
    """Escalate the conversation to a human agent."""
    return f"Escalation created: {reason}. A human agent will join shortly."

# --- Specialized Agents ---
order_agent = RealtimeAgent(
    name="Order Specialist",
    instructions=(
        "You handle order-related queries. Use check_order_status "
        "to look up orders. Be precise and helpful."
    ),
    tools=[check_order_status],
    model="gpt-realtime",
    voice="coral",
)

faq_agent = RealtimeAgent(
    name="FAQ Specialist",
    instructions=(
        "You answer general questions using the FAQ knowledge base. "
        "If you can't find an answer, escalate to a human."
    ),
    tools=[search_faq, escalate_to_human],
    model="gpt-realtime",
    voice="coral",
)

# --- Triage Agent (entry point) ---
triage_agent = RealtimeAgent(
    name="Support Triage",
    instructions=(
        "You are the front-line customer support agent. Greet the "
        "customer warmly. Determine if they need help with an order "
        "(hand off to Order Specialist) or have a general question "
        "(hand off to FAQ Specialist). If unsure, ask clarifying questions."
    ),
    handoffs=[order_agent, faq_agent],
    model="gpt-realtime",
    voice="alloy",
)
```

### Run the Agent

python

```python
import asyncio

async def main():
    async with RealtimeSession(triage_agent) as session:
        print("🎧 Customer support agent is live!")
        print("   Speak to start a conversation.\n")
        await session.run()

asyncio.run(main())
```

### Adding Guardrails

python

```python
from agents import InputGuardrail, GuardrailFunctionOutput

BLOCKED_TOPICS = ["competitor", "lawsuit", "internal"]

async def content_filter(ctx, agent, user_input):
    """Block off-topic or sensitive requests."""
    is_blocked = any(
        word in user_input.lower() for word in BLOCKED_TOPICS
    )
    return GuardrailFunctionOutput(
        output_info={"filtered": is_blocked},
        tripwire_triggered=is_blocked,
    )

# Add to any agent
safe_triage = RealtimeAgent(
    name="Safe Triage",
    instructions="You are a helpful support agent.",
    handoffs=[order_agent, faq_agent],
    input_guardrails=[
        InputGuardrail(guardrail_function=content_filter)
    ],
    model="gpt-realtime",
    voice="alloy",
)
```

### Error Handling & Reconnection

python

```python
import asyncio
from websockets.exceptions import ConnectionClosed

MAX_RETRIES = 5

async def resilient_agent():
    retries = 0
    while retries < MAX_RETRIES:
        try:
            async with RealtimeSession(triage_agent) as session:
                retries = 0
                await session.run()
        except ConnectionClosed as e:
            retries += 1
            wait = 2 ** retries
            print(f"⚠️  Disconnected ({e.code}). Retry {retries}/{MAX_RETRIES} in {wait}s...")
            await asyncio.sleep(wait)
        except KeyboardInterrupt:
            print("\n👋 Shutting down.")
            break
    else:
        print("❌ Max retries reached.")

asyncio.run(resilient_agent())
```

### Pricing Reference

| Model | Audio In | Audio Out | Text In | Text Out |
| --- | --- | --- | --- | --- |
| GPT-Realtime-2 | $32 / 1M tokens | $64 / 1M tokens | $2.50 / 1M | $10 / 1M |
| Realtime-Translate | $0.034 / minute |  |  |  |
| Realtime-Whisper | $0.017 / minute |  |  |  |

Capstone Exercise

#### Full Voice Support Agent

Bring it all together. Build and run the complete support agent above with these enhancements:

-   Replace the stub tools with real API calls (or more realistic mock data)
-   Add a translation layer so the agent can serve customers in multiple languages
-   Implement the reconnection logic
-   Log all conversations (transcript + tool calls) to a JSON file for review
-   Add at least one custom guardrail

Built the multi-agent support system with the Agents SDK Implemented handoffs between specialized agents Added guardrails and error handling