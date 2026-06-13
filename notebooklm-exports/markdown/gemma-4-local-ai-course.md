# Gemma 4 12B — Local AI Masterclass

Released June 3, 2026 — Google DeepMind

# Master Gemma 4 12B Locally on Your Mac

A complete, offline course on running Google's most capable open model on Apple Silicon. From first install to agentic workflows — no cloud required.

12B

Parameters

256K

Context Window

4

Modalities

Apache 2.0

License

16 GB

Min Memory

0%

Completed

Google DeepMind's Latest Open Model

Gemma 4 12B shipped on **June 3, 2026** as the newest member of Google DeepMind's Gemma family. It packs **11.95 billion parameters** into a single model that handles text, images, audio, and video — making it the first mid-sized open model with native support for all four modalities.

Unlike its predecessors, Gemma 4 uses an **encoder-free architecture**: there's no separate vision encoder or audio encoder. Instead, visual patches and raw audio waveforms are projected directly into the LLM's embedding space via lightweight linear layers. This eliminates multimodal latency and drastically simplifies the model pipeline.

Key architecture details:

-   **Hybrid attention** — interleaves local sliding-window attention with full global attention (final layer always global)
-   **256,000-token context window** — fits ~200 pages of text or ~50 images per prompt
-   **Vision processing** — raw images split into 48×48 pixel patches, each projected to the LLM hidden dimension with a single matrix multiplication
-   **Audio processing** — raw 16 kHz audio cut into 40 ms frames and projected into the LM input space

Apache 2.0 — Fully Open & Commercial

Gemma 4 12B ships under the **Apache 2.0 license** — the most permissive open-source license available. You can:

-   Use it commercially in production products — no royalties, no revenue caps
-   Fine-tune and distribute modified versions
-   Embed in proprietary applications
-   Self-host without usage reporting

This is a meaningful upgrade from Gemma 2's "Gemma Terms of Use" which had some restrictions. Apache 2.0 puts it on par with Meta's Llama licensing.

How It Compares to Competitors

#### Gemma 4 12B

12B params · 4 modalities · 256K context · Apache 2.0 · 16GB RAM · Encoder-free · Native tool calling

#### Llama 4 Scout

109B MoE (17B active) · Text+Image · 10M context · Custom license · 32GB+ RAM · Strong reasoning

#### Mistral Large 2026

675B MoE (41B active) · Multilingual focus · 128K context · Apache 2.0 · 64GB+ RAM · MATH 90.4%

#### Phi-4

14B params · Text only · 16K context · MIT license · 16GB RAM · MATH 80.4% · Microsoft Research

💡 Key Takeaway

Gemma 4 12B is the only model in this class that handles all four modalities (text, image, audio, video) while fitting in 16GB RAM. Llama 4 Scout has a longer context window but requires 2–4× more memory. Mistral and Phi-4 don't support audio input natively.

Benchmark Performance

Google reports that Gemma 4 12B **approaches its larger 26B MoE sibling** on standard benchmarks while requiring roughly half the memory:

DocVQA (Document Understanding)94.9%

InfoVQA (Infographic QA)88.4%

MATH-Vision79.7%

AIME 2026 (Math Competition)77.5%

MMMU Pro (Multimodal Understanding)69.1%

These numbers are remarkable for a 12B-parameter model. DocVQA 94.9% means it can read scanned documents almost as well as dedicated OCR pipelines.

What "Agentic Workflows" Means

Google explicitly designed Gemma 4 for **agentic AI** — models that don't just answer questions, but take actions. Gemma 4 was trained with **6 dedicated special tokens** for the function-calling lifecycle:

```
<|tool_start|>       — signals the model is entering tool-use mode
<|tool_call|>        — begins a structured function call
<|tool_args|>        — wraps the JSON arguments
<|tool_end|>         — closes the tool invocation
<|tool_result|>      — marks the start of tool output
<|tool_result_end|>  — closes the tool output
```

This isn't prompt engineering — these tokens are baked into the model's vocabulary during training. The model also supports **Configurable Thinking Mode**, where you can trigger step-by-step reasoning before it makes a tool call, enabling complex multi-step planning.

The Gemma 4 Family

| Model | Params | Target | Min RAM | Modalities |
| --- | --- | --- | --- | --- |
| Gemma 4 E2B | 2B | Edge / Mobile | 4 GB | Text, Image, Audio |
| Gemma 4 E4B | 4B | Edge / Raspberry Pi | 6 GB | Text, Image, Audio |
| Gemma 4 12B ← | 12B | Laptop / Desktop | 16 GB | Text, Image, Audio, Video |
| Gemma 4 26B MoE | 26B | Workstation | 32 GB | Text, Image, Audio, Video |

This course focuses on the 12B variant — the sweet spot for running locally on your Mac with 16GB+ unified memory.

Where to Get It

Gemma 4 12B is available from multiple sources:

-   **Hugging Face** — `google/gemma-4-12B` (base) and `google/gemma-4-12B-it` (instruction-tuned)
-   **Kaggle** — Google's official distribution channel with notebook examples
-   **Ollama** — `ollama pull gemma4:12b` (pre-quantized, easiest)
-   **LM Studio** — search "Gemma 4 12B" in the model browser
-   **Google AI Edge Gallery** — now available on macOS for running Gemma models locally

For this course, we'll primarily use Ollama and MLX. Module 2 walks you through installation step by step.

Hardware Requirements

🖥️ Your Setup: Apple Silicon Mac

Gemma 4 12B is designed to run on your M-series Mac. Here's what you need.

| Component | Minimum | Recommended | Optimal |
| --- | --- | --- | --- |
| Chip | M1 | M2 Pro / M3 Pro | M3 Max / M4 Pro+ |
| Unified Memory | 16 GB | 32 GB | 64 GB+ |
| Storage | 15 GB free | 30 GB free | 50 GB+ free |
| macOS | Ventura 13.0+ | Sonoma 14+ | Sequoia 15+ |

With **16 GB**, you can run Q4\_K\_M quantization comfortably. With **32 GB**, you can run full Q8\_0 or even the 26B MoE variant. Apple Silicon's unified memory architecture is key — the GPU and CPU share the same RAM, so there's no data-transfer bottleneck.

Option 1: Ollama (Easiest — 5 Minutes)

Ollama is by far the easiest way to get started. It handles downloading, quantization, and serving automatically.

#### Step 1 — Install Ollama

```
# Download and install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Or with Homebrew:
brew install ollama
```

#### Step 2 — Pull Gemma 4 12B

```
# Pull the 12B instruction-tuned model
ollama pull gemma4:12b

# This downloads ~8 GB (Q4_K_M quantized by default)
# On a 100 Mbps connection, expect ~10 minutes
```

#### Step 3 — Run Your First Prompt

```
# Interactive chat mode
ollama run gemma4:12b

# You'll see:
# >>> Send a message (/? for help)
#
# Type your prompt:
>>> Explain quantum computing in 3 sentences.

# Expected output (in ~2-5 seconds):
# Quantum computing uses qubits that can exist in superposition,
# representing both 0 and 1 simultaneously. This allows quantum
# computers to process certain calculations exponentially faster
# than classical computers. Key applications include cryptography,
# drug discovery, and optimization problems.
```

> **Tip:** ✅ Important: Ollama 0.22+
>
> Make sure you have Ollama version **0.22 or newer**. This version ships with the **MLX runner enabled by default** on Apple Silicon, which adds fused top-P/top-K sampling for noticeably faster prompt processing on M-series chips. Check with `ollama --version`.

Option 2: LM Studio (GUI)

If you prefer a graphical interface, LM Studio provides drag-and-drop model management.

#### Steps:

1.  Download **LM Studio** from `lmstudio.ai`
2.  Open it and click **"Discover"** in the left sidebar
3.  Search for `gemma-4-12b`
4.  Select a quantization (Q4\_K\_M recommended for 16GB Macs)
5.  Click **Download** — it pulls the GGUF file automatically
6.  Once downloaded, go to **"Chat"** and select the model
7.  Start chatting — with adjustable temperature, top-p, and system prompts

LM Studio also has a built-in API server (OpenAI-compatible) that we'll use in Module 7.

Option 3: llama.cpp with GGUF Weights

For maximum control, build llama.cpp from source and run quantized GGUF files directly.

```
# Clone and build llama.cpp with Metal support
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp
make LLAMA_METAL=1 -j$(sysctl -n hw.ncpu)

# Download a GGUF quantized model from Hugging Face
# (example: Q4_K_M quantization)
huggingface-cli download google/gemma-4-12B-it-GGUF \
  gemma-4-12b-it-q4_k_m.gguf \
  --local-dir ./models

# Run inference
./llama-cli -m models/gemma-4-12b-it-q4_k_m.gguf \
  -p "Write a Python function to sort a list" \
  -n 256 \
  --temp 0.7 \
  -ngl 99   # offload all layers to GPU (Metal)
```

⚠️ Metal Layer Offloading

The `-ngl 99` flag offloads all transformer layers to the GPU via Metal. On 16GB Macs with Q4\_K\_M, all layers fit in GPU memory. If you see OOM errors, reduce this number — try `-ngl 30` and increase from there.

Option 4: MLX (Apple's ML Framework)

MLX is Apple's open-source machine learning framework, built specifically for Apple Silicon. It's 10–20% faster than Ollama for inference because it bypasses GGUF quantization overhead.

```
# Install MLX and the LM extension
pip3 install mlx mlx-lm

# Download and run Gemma 4 12B
mlx_lm.generate \
  --model google/gemma-4-12B-it \
  --prompt "Explain the attention mechanism in transformers" \
  --max-tokens 512

# Or start an interactive chat
mlx_lm.chat --model google/gemma-4-12B-it
```

MLX uses lazy evaluation and unified memory natively, so it's exceptionally efficient on M-series chips. However, community benchmarks suggest that for Gemma 4 specifically, GGUF via llama.cpp sometimes outpaces MLX on prefill and multi-turn tasks. Test both and see which works better for your workflow.

Downloading from Hugging Face vs Kaggle

**Hugging Face** is the go-to for most developers. Models are available at:

-   `google/gemma-4-12B` — base model (for fine-tuning)
-   `google/gemma-4-12B-it` — instruction-tuned (for chat/prompts)
-   `google/gemma-4-12B-it-assistant` — optimized for assistant workflows

```
# Install the Hugging Face CLI
pip3 install huggingface-hub

# Login (one-time)
huggingface-cli login

# Download the instruction-tuned model
huggingface-cli download google/gemma-4-12B-it \
  --local-dir ~/models/gemma4-12b-it
```

**Kaggle** is Google's preferred distribution channel and often has Jupyter notebook examples. Download via the Kaggle API or the web interface at `kaggle.com/models/google/gemma-4`.

Quantization Options: Quality vs Speed

| Quantization | File Size | RAM Usage | Quality | Speed | Recommendation |
| --- | --- | --- | --- | --- | --- |
| Q4_K_M | ~7 GB | ~9 GB | Good | Fastest | Best for 16GB Macs ✓ |
| Q5_K_M | ~8.5 GB | ~11 GB | Very Good | Fast | Good balance if you have room |
| Q6_K | ~10 GB | ~13 GB | Excellent | Moderate | 32GB Macs |
| Q8_0 | ~12.5 GB | ~15 GB | Near-lossless | Slower | 32GB+ Macs, quality critical |
| FP16 | ~24 GB | ~26 GB | Lossless | Slowest | 64GB+ only |

> **Tip:** ✅ Recommended: Q4\_K\_M
>
> Q4\_K\_M is the sweet spot for most users. It provides minimal quality loss compared to FP16 while being 3× smaller and significantly faster. On a 16GB Mac, it leaves enough headroom for macOS and other apps.

Hands-On: First Prompt in Under 5 Minutes

🔬 Hands-On Exercise

Let's verify everything is working. Open Terminal and run:

```
# 1. Make sure Ollama is running
ollama serve &

# 2. Pull Gemma 4 12B (skip if already done)
ollama pull gemma4:12b

# 3. Run a quick test
ollama run gemma4:12b "What are the top 3 features of Apple Silicon for ML workloads? Be concise."

# Expected output (streaming in real-time):
# 1. **Unified Memory Architecture** — CPU and GPU share the same
#    memory pool, eliminating data transfer bottlenecks
# 2. **Neural Engine** — Dedicated hardware for matrix operations,
#    accelerating transformer inference
# 3. **Energy Efficiency** — High performance-per-watt enables
#    sustained ML workloads without thermal throttling

# 4. Check model info
ollama show gemma4:12b
```

If you see a streaming response, congratulations — you're running a 12-billion-parameter multimodal AI model entirely on your Mac, completely offline.

Tokens/Second Benchmarks on Apple Silicon

Real-world performance varies by chip, quantization, and context length. Here are approximate benchmarks for Gemma 4 12B Q4\_K\_M via Ollama 0.22+ (MLX runner):

| Chip | Memory | Prompt Eval (tok/s) | Generation (tok/s) | Notes |
| --- | --- | --- | --- | --- |
| M1 | 16 GB | ~45 | ~12 | Workable but slow |
| M1 Pro | 16 GB | ~65 | ~18 | Good for development |
| M2 | 16 GB | ~55 | ~15 | Slight improvement over M1 |
| M2 Pro | 32 GB | ~85 | ~25 | Comfortable daily driver |
| M3 | 16 GB | ~70 | ~20 | Best value for 16GB |
| M3 Pro | 36 GB | ~110 | ~32 | Excellent all-rounder |
| M3 Max | 48 GB | ~160 | ~45 | Can run Q8_0 comfortably |
| M4 | 16 GB | ~80 | ~24 | Noticeable gen-over-gen lift |
| M4 Pro | 48 GB | ~140 | ~42 | Production-grade local |
| M4 Max | 64 GB | ~200 | ~55 | Run FP16 with headroom |

For reference, 20+ tok/s feels conversational — fast enough for interactive chat. 12 tok/s is usable but you'll notice the lag.

Memory Usage by Quantization Level

Apple Silicon's unified memory is shared between the OS, apps, and the model. Here's how much Gemma 4 12B actually uses:

Q4\_K\_M — ~9 GB model + ~2 GB context11 GB

Q5\_K\_M — ~11 GB model + ~2 GB context13 GB

Q8\_0 — ~15 GB model + ~2 GB context17 GB

FP16 — ~26 GB model + ~3 GB context29 GB

(Bar shows % of 32 GB total memory)

⚠️ 16GB Mac Users

With Q4\_K\_M (~11 GB loaded), you have about 5 GB left for macOS and apps. Close heavy applications (Chrome, Xcode) before running inference. Monitor with `Activity Monitor → Memory` or `sudo powermetrics --samplers gpu_power -i 1000`.

Context Window Management

Gemma 4 12B supports a **256,000-token context window**, but there's a catch: longer contexts use more memory and slow down inference. Manage this carefully.

```
# Ollama: Set context window size
# Default is 4096 — way too small for Gemma 4's capability!
# Increase it in your Modelfile or via API:

# Create a custom Modelfile
cat << EOF > Modelfile.gemma4
FROM gemma4:12b
PARAMETER num_ctx 32768
PARAMETER temperature 0.7
PARAMETER top_p 0.9
SYSTEM "You are a helpful coding assistant."
EOF

# Build and run with custom context
ollama create gemma4-custom -f Modelfile.gemma4
ollama run gemma4-custom
```

| Context Size | Extra RAM | Speed Impact | Use Case |
| --- | --- | --- | --- |
| 4K tokens | ~0.5 GB | Fastest | Short Q&A, simple tasks |
| 8K tokens | ~1 GB | Fast | Code generation, conversations |
| 32K tokens | ~3 GB | Moderate | Document analysis, long code |
| 128K tokens | ~10 GB | Slow | Book-length analysis (32GB+ Mac) |
| 256K tokens | ~18 GB | Very slow | Extreme cases (64GB+ Mac) |

GPU vs CPU Inference on Apple Silicon

On Apple Silicon, "GPU inference" means using the **Metal API** to run computations on the integrated GPU cores. This is always faster than CPU-only inference:

| Mode | Speed (M3 Pro, Q4_K_M) | How to Enable |
| --- | --- | --- |
| GPU (Metal) — all layers | ~32 tok/s | -ngl 99 in llama.cpp; Ollama does this automatically |
| GPU (Metal) — 20 layers | ~22 tok/s | -ngl 20 in llama.cpp |
| CPU only | ~8 tok/s | -ngl 0 in llama.cpp |

```
# Verify Metal is being used in Ollama
# Look for "metal" in the model info:
ollama show gemma4:12b --modelfile

# In llama.cpp, watch for this line during startup:
# ggml_metal_init: allocating
# ggml_metal_init: loaded kernel_add
# This confirms Metal is active
```

Batch Inference for Throughput

If you need to process many prompts (e.g., analyzing 100 files), batch inference is more efficient than sequential calls:

```
# batch_inference.py — Process multiple prompts efficiently
import requests
import json
import concurrent.futures

OLLAMA_URL = "http://localhost:11434/api/generate"

prompts = [
    "Summarize: Apple released M4 chips with improved Neural Engine.",
    "Summarize: Python 3.13 introduced free-threaded mode.",
    "Summarize: Rust 2024 edition added async closures.",
]

def run_prompt(prompt):
    resp = requests.post(OLLAMA_URL, json={
        "model": "gemma4:12b",
        "prompt": prompt,
        "stream": False,
        "options": {"num_ctx": 2048, "temperature": 0.3}
    })
    return resp.json()["response"]

# Process 3 prompts concurrently
# Ollama handles request queuing internally
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
    results = list(pool.map(run_prompt, prompts))

for i, result in enumerate(results):
    print(f"\n--- Prompt {i+1} ---")
    print(result)
```

💡 Parallel Requests in Ollama

Ollama 0.22+ supports **concurrent requests** via its built-in request queue. Set `OLLAMA_NUM_PARALLEL=2` as an environment variable to allow 2 simultaneous inferences (requires extra memory).

Local Gemma 4 vs Cloud APIs — When to Use Which

| Factor | Local Gemma 4 12B | Cloud API (Claude / GPT) |
| --- | --- | --- |
| Cost per query | $0.00 | $0.003–$0.06 |
| Latency (first token) | ~500 ms | ~200 ms |
| Throughput | ~20–50 tok/s | ~80–150 tok/s |
| Privacy | Data never leaves Mac | Sent to cloud |
| Offline access | Works without internet | Requires internet |
| Reasoning depth | Good for most tasks | Better for complex reasoning |
| Multimodal | Text+Image+Audio+Video | Varies by provider |
| Context window | 256K (memory-limited) | Up to 1M+ |

**Rule of thumb:** Use local Gemma 4 for routine tasks (code review, summarization, data extraction, image analysis) where privacy matters and cost adds up. Use cloud APIs for tasks requiring frontier-level reasoning, very long contexts, or maximum speed.

Sending Images to Gemma 4 for Analysis

Gemma 4 12B processes images natively — no separate vision model needed. The image is split into 48×48 pixel patches and projected directly into the LLM's embedding space.

```
# Via Ollama CLI — analyze an image
ollama run gemma4:12b "Describe this image in detail" --images ./photo.jpg

# Via Ollama API — send image as base64
import requests, base64

with open("screenshot.png", "rb") as f:
    img_b64 = base64.b64encode(f.read()).decode()

response = requests.post("http://localhost:11434/api/generate", json={
    "model": "gemma4:12b",
    "prompt": "What text is visible in this screenshot? Extract all text.",
    "images": [img_b64],
    "stream": False
})
print(response.json()["response"])
```

💡 Image Capacity

With a 256K context window, Gemma 4 12B can process approximately **50 images** in a single prompt. Each image consumes roughly 1,000–5,000 tokens depending on resolution.

Vision Capabilities Deep Dive

Gemma 4's vision capabilities scored **94.9% on DocVQA**, putting it near the top for document understanding. Here's what it can do:

-   **OCR** — Extract text from photos, screenshots, and scanned documents (including multilingual text)
-   **Chart Reading** — Interpret bar charts, line graphs, pie charts, and extract data points
-   **Image Description** — Detailed scene understanding with object identification
-   **UI Understanding** — Parse screenshots of apps and websites, identify buttons and layout
-   **Handwriting Recognition** — Read handwritten notes and convert to text
-   **Document Parsing** — Extract structured data from invoices, receipts, and forms
-   **Pointing** — Identify and locate specific objects within images

```
# Example: Extract data from a chart image
ollama run gemma4:12b \
  "This is a bar chart. Extract all data points as a JSON array \
   with keys 'label' and 'value'." \
  --images ./chart.png

# Example: OCR a receipt
ollama run gemma4:12b \
  "Extract all line items from this receipt. Format as a table \
   with columns: Item, Quantity, Price." \
  --images ./receipt.jpg
```

Audio Understanding

Gemma 4 12B is Google's **first mid-sized model with native audio input**. The audio encoder was removed entirely — raw 16 kHz audio is cut into 40 ms frames and projected directly into the language model input space.

Supported audio capabilities:

-   **Automatic Speech Recognition (ASR)** — transcribe spoken audio to text
-   **Speech Translation** — translate spoken audio directly to another language's text
-   **Audio Understanding** — describe sounds, music, environmental audio

```
# Audio with the Python transformers library
from transformers import AutoProcessor, AutoModelForCausalLM
import soundfile as sf

processor = AutoProcessor.from_pretrained("google/gemma-4-12B-it")
model = AutoModelForCausalLM.from_pretrained(
    "google/gemma-4-12B-it",
    device_map="auto"
)

# Load audio file (16kHz WAV recommended)
audio, sr = sf.read("meeting_recording.wav")

inputs = processor(
    text="Transcribe this audio recording:",
    audios=audio,
    sampling_rate=sr,
    return_tensors="pt"
)

outputs = model.generate(**inputs, max_new_tokens=1024)
transcript = processor.decode(outputs[0], skip_special_tokens=True)
print(transcript)
```

⚠️ Audio Support in Ollama

As of June 2026, Ollama's audio input support for Gemma 4 is still being integrated. For audio tasks, use the **Hugging Face transformers** library directly, or check for Ollama updates at `ollama.com/blog`.

Hands-On: Build a Local Image Analyzer

🔬 Hands-On Exercise

Build a Python script that analyzes any image using Gemma 4 locally:

```
#!/usr/bin/env python3
"""image_analyzer.py — Analyze images locally with Gemma 4 12B"""
import requests, base64, sys, json
from pathlib import Path

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL = "gemma4:12b"

def analyze_image(image_path, prompt="Describe this image in detail."):
    """Send an image to local Gemma 4 for analysis."""
    img_bytes = Path(image_path).read_bytes()
    img_b64 = base64.b64encode(img_bytes).decode("utf-8")

    response = requests.post(OLLAMA_URL, json={
        "model": MODEL,
        "prompt": prompt,
        "images": [img_b64],
        "stream": False,
        "options": {
            "temperature": 0.3,
            "num_ctx": 8192,
        }
    })
    return response.json()["response"]

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python image_analyzer.py  [prompt]")
        sys.exit(1)

    image_path = sys.argv[1]
    prompt = sys.argv[2] if len(sys.argv) > 2 else \
        "Analyze this image. Describe what you see, any text visible, " \
        "and the overall context."

    print(f"Analyzing: {image_path}")
    print(f"Prompt: {prompt}\n")
    result = analyze_image(image_path, prompt)
    print("--- Analysis ---")
    print(result)

# Usage:
# python image_analyzer.py photo.jpg
# python image_analyzer.py receipt.png "Extract all line items and total"
# python image_analyzer.py diagram.png "Explain this architecture diagram"
```

Hands-On: Batch Process Screenshots

🔬 Hands-On Exercise

Process an entire folder of screenshots — extract text from each one:

```
#!/usr/bin/env python3
"""batch_ocr.py — OCR a folder of screenshots with Gemma 4"""
import requests, base64, json, time
from pathlib import Path

OLLAMA_URL = "http://localhost:11434/api/generate"

def ocr_image(image_path):
    img_b64 = base64.b64encode(Path(image_path).read_bytes()).decode()
    resp = requests.post(OLLAMA_URL, json={
        "model": "gemma4:12b",
        "prompt": "Extract ALL visible text from this screenshot. "
                  "Preserve the layout structure. Output only the text.",
        "images": [img_b64],
        "stream": False,
        "options": {"temperature": 0.1, "num_ctx": 4096}
    })
    return resp.json()["response"]

# Process all images in a folder
screenshots_dir = Path("~/Desktop/screenshots").expanduser()
output_file = Path("ocr_results.md")

results = []
image_files = sorted(screenshots_dir.glob("*.png"))
print(f"Found {len(image_files)} screenshots to process\n")

for i, img_path in enumerate(image_files, 1):
    print(f"[{i}/{len(image_files)}] Processing {img_path.name}...")
    start = time.time()
    text = ocr_image(img_path)
    elapsed = time.time() - start
    results.append(f"## {img_path.name}\n\n{text}\n")
    print(f"  Done in {elapsed:.1f}s — extracted {len(text)} chars\n")

# Save all results
output_file.write_text("\n---\n\n".join(results))
print(f"\nAll results saved to {output_file}")
```

What Google Means by "Agentic" Gemma 4

When Google says Gemma 4 is "designed for agentic workflows," they mean the model can:

-   **Plan multi-step actions** — break a complex task into sequential steps
-   **Call external tools** — invoke functions (APIs, file operations, web searches) using structured JSON
-   **React to tool outputs** — read the result of a tool call and decide what to do next
-   **Self-correct** — detect when a step failed and try a different approach

This is powered by the **6 dedicated special tokens** baked into the model vocabulary during training. Unlike models that rely on prompt engineering for tool use, Gemma 4's function calling is a first-class capability.

The model also supports **Configurable Thinking Mode** — you can trigger explicit chain-of-thought reasoning before tool calls, making the agent's decisions transparent and debuggable.

Tool Use & Function Calling

Gemma 4's native function calling follows a structured format. Here's how to define and invoke tools:

```
# function_calling.py — Native tool use with Gemma 4
import requests, json

OLLAMA_URL = "http://localhost:11434/api/chat"

# Define available tools
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Get current weather for a location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "City name, e.g., 'San Francisco'"
                    },
                    "unit": {
                        "type": "string",
                        "enum": ["celsius", "fahrenheit"],
                        "description": "Temperature unit"
                    }
                },
                "required": ["location"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "search_files",
            "description": "Search for files on the local filesystem",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {"type": "string", "description": "Search term"},
                    "directory": {"type": "string", "description": "Directory to search"}
                },
                "required": ["query"]
            }
        }
    }
]

response = requests.post(OLLAMA_URL, json={
    "model": "gemma4:12b",
    "messages": [
        {"role": "user", "content": "What's the weather in Tokyo?"}
    ],
    "tools": tools,
    "stream": False
})

result = response.json()
message = result["message"]

if message.get("tool_calls"):
    for call in message["tool_calls"]:
        print(f"Tool: {call['function']['name']}")
        print(f"Args: {json.dumps(call['function']['arguments'], indent=2)}")
        # In a real agent, you'd execute the function here
        # and feed the result back to the model
```

Building a Local Agent with LangChain + Gemma 4

LangChain integrates with Gemma 4 via Ollama's OpenAI-compatible API. Here's a complete agent setup:

```
# langchain_agent.py — Local agent with LangChain + Gemma 4
# pip3 install langchain langchain-openai langchain-community

from langchain_openai import ChatOpenAI
from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.tools import tool
import subprocess, os

# Connect to local Ollama (OpenAI-compatible)
llm = ChatOpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama",  # Ollama doesn't need a real key
    model="gemma4:12b",
    temperature=0.2,
)

# Define tools the agent can use
@tool
def list_files(directory: str = ".") -> str:
    """List files in a directory on the local filesystem."""
    try:
        files = os.listdir(os.path.expanduser(directory))
        return "\n".join(sorted(files))
    except Exception as e:
        return f"Error: {e}"

@tool
def read_file(filepath: str) -> str:
    """Read the contents of a file."""
    try:
        with open(os.path.expanduser(filepath)) as f:
            return f.read()[:5000]  # Limit to 5000 chars
    except Exception as e:
        return f"Error: {e}"

@tool
def run_shell(command: str) -> str:
    """Run a shell command and return its output."""
    try:
        result = subprocess.run(
            command, shell=True, capture_output=True,
            text=True, timeout=30
        )
        return result.stdout + result.stderr
    except Exception as e:
        return f"Error: {e}"

# Create the agent
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful local AI assistant with access "
               "to the filesystem and shell. Be careful with shell "
               "commands — never delete or modify files without "
               "explicit permission."),
    ("human", "{input}"),
    ("placeholder", "{agent_scratchpad}"),
])

agent = create_tool_calling_agent(llm, [list_files, read_file, run_shell], prompt)
executor = AgentExecutor(agent=agent, tools=[list_files, read_file, run_shell], verbose=True)

# Run it!
result = executor.invoke({
    "input": "What Python files are in my home directory? "
             "Pick the most interesting one and summarize it."
})
print(result["output"])
```

The ReAct Pattern with Local Models

The **ReAct** (Reasoning + Acting) pattern is the foundation of most AI agents. The model alternates between thinking and acting:

```
# react_agent.py — ReAct loop with Gemma 4
import requests, json

OLLAMA_URL = "http://localhost:11434/api/chat"

# Simple tool implementations
def calculator(expression):
    try:
        return str(eval(expression))  # Simple eval for demo
    except: return "Error evaluating expression"

def get_file_size(path):
    import os
    try:
        size = os.path.getsize(os.path.expanduser(path))
        return f"{size:,} bytes ({size/1024/1024:.1f} MB)"
    except: return "File not found"

TOOLS = {"calculator": calculator, "get_file_size": get_file_size}

tool_defs = [
    {"type": "function", "function": {
        "name": "calculator",
        "description": "Evaluate a math expression",
        "parameters": {"type": "object",
            "properties": {"expression": {"type": "string"}},
            "required": ["expression"]}
    }},
    {"type": "function", "function": {
        "name": "get_file_size",
        "description": "Get the size of a file",
        "parameters": {"type": "object",
            "properties": {"path": {"type": "string"}},
            "required": ["path"]}
    }}
]

def react_loop(user_query, max_steps=5):
    messages = [{"role": "user", "content": user_query}]

    for step in range(max_steps):
        resp = requests.post(OLLAMA_URL, json={
            "model": "gemma4:12b",
            "messages": messages,
            "tools": tool_defs,
            "stream": False
        }).json()

        msg = resp["message"]
        messages.append(msg)

        if not msg.get("tool_calls"):
            print(f"\nFinal Answer: {msg['content']}")
            return msg["content"]

        # Execute each tool call
        for call in msg["tool_calls"]:
            fn_name = call["function"]["name"]
            fn_args = call["function"]["arguments"]
            print(f"  Step {step+1}: Calling {fn_name}({fn_args})")

            result = TOOLS[fn_name](**fn_args)
            print(f"  Result: {result}")

            messages.append({
                "role": "tool",
                "content": result
            })

    return "Max steps reached"

# Example usage
react_loop("How large is my .zshrc file, and what's 2^20?")
```

Hands-On: Build a Local File Organizer Agent

🔬 Hands-On Exercise

```
#!/usr/bin/env python3
"""file_organizer.py — AI agent that organizes files into folders"""
import requests, json, os, shutil
from pathlib import Path

OLLAMA_URL = "http://localhost:11434/api/chat"
MODEL = "gemma4:12b"

def classify_files(directory):
    """Ask Gemma 4 to classify files into categories."""
    dir_path = Path(directory).expanduser()
    files = [f.name for f in dir_path.iterdir() if f.is_file()]

    if not files:
        print("No files found.")
        return

    print(f"Found {len(files)} files to organize\n")

    resp = requests.post(OLLAMA_URL, json={
        "model": MODEL,
        "messages": [{
            "role": "user",
            "content": f"""Classify these files into categories for organization.
Return ONLY valid JSON with this structure:
{{"categories": {{"CategoryName": ["file1.ext", "file2.ext"]}}}}

Categories should be like: Documents, Images, Code, Data, Archives, Media, Other

Files to classify:
{json.dumps(files, indent=2)}"""
        }],
        "stream": False,
        "options": {"temperature": 0.1}
    }).json()

    # Parse the classification
    content = resp["message"]["content"]
    # Extract JSON from response
    start = content.find("{")
    end = content.rfind("}") + 1
    categories = json.loads(content[start:end])["categories"]

    # Preview the plan
    print("Proposed organization:")
    for cat, cat_files in categories.items():
        print(f"\n  📁 {cat}/")
        for f in cat_files:
            print(f"    ├── {f}")

    # Ask for confirmation
    confirm = input("\nProceed with organizing? (y/n): ")
    if confirm.lower() != "y":
        print("Cancelled.")
        return

    # Execute the moves
    for cat, cat_files in categories.items():
        cat_dir = dir_path / cat
        cat_dir.mkdir(exist_ok=True)
        for f in cat_files:
            src = dir_path / f
            if src.exists():
                shutil.move(str(src), str(cat_dir / f))
                print(f"  Moved {f} → {cat}/")

    print("\nDone! Files organized.")

# Usage
classify_files("~/Downloads")
```

Hands-On: Build a Local Code Reviewer

🔬 Hands-On Exercise

```
#!/usr/bin/env python3
"""code_reviewer.py — Local AI code review with Gemma 4"""
import requests, sys
from pathlib import Path

OLLAMA_URL = "http://localhost:11434/api/generate"

def review_code(filepath):
    code = Path(filepath).read_text()
    ext = Path(filepath).suffix

    lang_map = {
        ".py": "Python", ".js": "JavaScript", ".ts": "TypeScript",
        ".rs": "Rust", ".go": "Go", ".swift": "Swift",
        ".rb": "Ruby", ".java": "Java", ".cpp": "C++",
    }
    language = lang_map.get(ext, "code")

    prompt = f"""You are an expert {language} code reviewer. Review this code
and provide actionable feedback. Focus on:

1. **Bugs** — logical errors, edge cases, potential crashes
2. **Security** — injection risks, data exposure, auth issues
3. **Performance** — inefficient patterns, memory leaks, N+1 queries
4. **Readability** — naming, structure, documentation
5. **Best Practices** — language-specific idioms and patterns

Be specific: reference line numbers and suggest concrete fixes.

```{language.lower()}
{code}
```"""

    resp = requests.post(OLLAMA_URL, json={
        "model": "gemma4:12b",
        "prompt": prompt,
        "stream": False,
        "options": {"temperature": 0.3, "num_ctx": 16384}
    })
    return resp.json()["response"]

if __name__ == "__main__":
    filepath = sys.argv[1] if len(sys.argv) > 1 else None
    if not filepath:
        print("Usage: python code_reviewer.py ")
        sys.exit(1)

    print(f"Reviewing: {filepath}\n")
    review = review_code(filepath)
    print(review)

# Usage:
# python code_reviewer.py app.py
# python code_reviewer.py server.js
# python code_reviewer.py main.rs
```

LoRA/QLoRA Fine-Tuning Explained

Fine-tuning adapts Gemma 4 to your specific domain or task. **LoRA** (Low-Rank Adaptation) makes this feasible on consumer hardware by only training a small number of adapter parameters instead of the full 12 billion.

-   **LoRA** — inserts small trainable matrices into existing layers. Typically adds 0.1–1% new parameters. Requires ~16 GB VRAM for Gemma 4 12B.
-   **QLoRA** — combines LoRA with 4-bit quantization of the base model. Cuts memory usage by ~60%. Can fine-tune Gemma 4 12B with as little as **8 GB VRAM**.

Key difference: the base model weights stay frozen (no gradient updates). Only the small LoRA adapter matrices are trained, which means:

-   Training is 5–10× faster than full fine-tuning
-   The adapter file is tiny (~50–200 MB vs 24 GB for full weights)
-   You can have multiple adapters for different tasks and swap them at inference time

Using Unsloth for Fast Fine-Tuning

**Unsloth** is the recommended tool for fine-tuning Gemma 4. It's ~1.5× faster than standard setups with ~60% less VRAM usage, with zero accuracy loss.

```
# Install Unsloth
pip3 install unsloth --break-system-packages

# fine_tune_unsloth.py
from unsloth import FastLanguageModel
import torch

# Load Gemma 4 12B with 4-bit quantization (QLoRA)
model, tokenizer = FastLanguageModel.from_pretrained(
    model_name="google/gemma-4-12B-it",
    max_seq_length=4096,
    dtype=None,       # Auto-detect
    load_in_4bit=True # QLoRA — fits in 8GB VRAM
)

# Add LoRA adapters
model = FastLanguageModel.get_peft_model(
    model,
    r=16,               # LoRA rank (8-64, higher = more capacity)
    target_modules=[     # Which layers to adapt
        "q_proj", "k_proj", "v_proj", "o_proj",
        "gate_proj", "up_proj", "down_proj",
    ],
    lora_alpha=16,
    lora_dropout=0,      # Optimized to 0 for speed
    bias="none",
    use_gradient_checkpointing="unsloth",  # 60% less VRAM
)

print(f"Trainable params: {model.print_trainable_parameters()}")
# Output: trainable params: 42,467,328 || all params: 11,950,000,000
# || trainable%: 0.3554
```

💡 Apple Silicon Support

Unsloth's NVIDIA GPU training is mature. For Apple Silicon (MLX-based) training, check the **Unsloth Studio** app — MLX training support is actively being developed as of June 2026. For now, if you only have a Mac, consider using a cloud GPU (Google Colab free tier works for small datasets).

Creating Custom Datasets

Fine-tuning is only as good as your data. Here's how to create a training dataset:

```
# create_dataset.py — Build a fine-tuning dataset
import json

# Format: instruction-input-output (Alpaca format)
# Gemma 4 also supports chat format (messages array)

dataset = [
    {
        "instruction": "Review this Python function for bugs.",
        "input": "def divide(a, b):\n    return a / b",
        "output": "Bug: No handling for division by zero. "
                  "Fix: Add `if b == 0: raise ValueError('Cannot divide by zero')` "
                  "before the return statement."
    },
    {
        "instruction": "Explain this error message.",
        "input": "TypeError: 'NoneType' object is not subscriptable",
        "output": "This error means you're trying to index (use []) on a variable "
                  "that is None. Common causes: a function returned None when you "
                  "expected a list/dict, or an API call failed silently."
    },
    # Add 50-500+ examples for good results
]

# Save as JSONL (one JSON object per line)
with open("training_data.jsonl", "w") as f:
    for item in dataset:
        f.write(json.dumps(item) + "\n")

print(f"Created dataset with {len(dataset)} examples")

# Alternative: Convert existing data
# - CSV: pandas.read_csv → format each row as instruction/output
# - Markdown: split by headers → each section becomes an example
# - Chat logs: each Q&A pair becomes an example
```

> **Tip:** ✅ Dataset Size Guidelines
>
> **50–100 examples** for simple style/format changes. **200–500 examples** for domain adaptation (medical, legal, coding). **1000+ examples** for complex new behaviors. Quality matters more than quantity — 100 carefully curated examples beat 10,000 noisy ones.

Fine-Tuning for Specific Tasks

Common fine-tuning scenarios and how to approach them:

| Task | Dataset Type | Examples Needed | Expected Improvement |
| --- | --- | --- | --- |
| Code review style | Code + review pairs | 200–500 | Matches your team's standards |
| Technical writing | Draft + polished pairs | 100–300 | Consistent tone and format |
| Domain knowledge | Q&A pairs from docs | 500–2000 | Accurate domain answers |
| Output format | Input + structured output | 50–100 | Reliable JSON/XML output |
| Language/dialect | Text in target language | 500–1000 | Natural fluency |

Hands-On: Fine-Tune on a Small Dataset

🔬 Hands-On Exercise

```
# full_finetune.py — Complete fine-tuning pipeline with Unsloth
from unsloth import FastLanguageModel
from trl import SFTTrainer
from transformers import TrainingArguments
from datasets import load_dataset

# 1. Load model with QLoRA
model, tokenizer = FastLanguageModel.from_pretrained(
    model_name="google/gemma-4-12B-it",
    max_seq_length=2048,
    load_in_4bit=True,
)

model = FastLanguageModel.get_peft_model(
    model, r=16,
    target_modules=["q_proj","k_proj","v_proj","o_proj",
                     "gate_proj","up_proj","down_proj"],
    lora_alpha=16, lora_dropout=0, bias="none",
    use_gradient_checkpointing="unsloth",
)

# 2. Load your dataset
dataset = load_dataset("json", data_files="training_data.jsonl", split="train")

# 3. Format for Gemma 4 chat template
def format_prompt(example):
    return {
        "text": f"""user
{example['instruction']}
{example.get('input', '')}

model
{example['output']}
"""
    }

dataset = dataset.map(format_prompt)

# 4. Train!
trainer = SFTTrainer(
    model=model,
    tokenizer=tokenizer,
    train_dataset=dataset,
    dataset_text_field="text",
    max_seq_length=2048,
    args=TrainingArguments(
        per_device_train_batch_size=2,
        gradient_accumulation_steps=4,
        warmup_steps=5,
        num_train_epochs=3,
        learning_rate=2e-4,
        fp16=not torch.cuda.is_bf16_supported(),
        bf16=torch.cuda.is_bf16_supported(),
        logging_steps=1,
        output_dir="outputs",
    ),
)

trainer.train()

# 5. Save the LoRA adapter
model.save_pretrained("gemma4-12b-custom-lora")
tokenizer.save_pretrained("gemma4-12b-custom-lora")

# 6. Merge and export to GGUF for Ollama
model.save_pretrained_gguf(
    "gemma4-12b-custom",
    tokenizer,
    quantization_method="q4_k_m"
)
print("Done! Import into Ollama with:")
print("ollama create mycustom -f Modelfile")
```

When to Fine-Tune vs Prompt-Engineer

| Use Prompt Engineering When… | Use Fine-Tuning When… |
| --- | --- |
| You need flexibility across many tasks | You need consistent behavior on one task |
| You have fewer than 50 examples | You have 100+ high-quality examples |
| The task can be described in natural language | The desired behavior is hard to articulate |
| You want to iterate quickly | You want to reduce prompt length (cost/speed) |
| The base model already does it ~80% right | The base model consistently gets it wrong |

> **Tip:** ✅ Start with Prompts
>
> Always try prompt engineering first. If you can get 90%+ accuracy with a good system prompt + few-shot examples, fine-tuning may not be worth the effort. Fine-tune when you need that last 10%, need faster inference (shorter prompts), or need to encode domain knowledge the base model lacks.

Running as an OpenAI-Compatible API

Both Ollama and LM Studio expose an **OpenAI-compatible API** automatically. This means any app that works with the OpenAI API can be pointed at your local Gemma 4 with zero code changes.

```
# Ollama's API is already running at localhost:11434
# Test it with curl:

curl http://localhost:11434/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gemma4:12b",
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "What is the capital of France?"}
    ],
    "temperature": 0.7,
    "max_tokens": 256
  }'

# Response format is identical to OpenAI's API:
# {
#   "choices": [{
#     "message": {
#       "role": "assistant",
#       "content": "The capital of France is Paris."
#     }
#   }]
# }
```

Ollama's Built-In Server Mode

```
# Ollama runs as a background service automatically
# Start it if not running:
ollama serve

# Key API endpoints:
# POST /api/generate     — single completion
# POST /api/chat         — multi-turn chat
# POST /api/embeddings   — text embeddings
# GET  /api/tags         — list installed models
# POST /api/pull         — download a model
# DELETE /api/delete     — remove a model

# OpenAI-compatible endpoints (Ollama 0.22+):
# POST /v1/chat/completions
# POST /v1/completions
# POST /v1/embeddings
# GET  /v1/models

# Configure Ollama server settings:
export OLLAMA_HOST="0.0.0.0:11434"    # Listen on all interfaces
export OLLAMA_NUM_PARALLEL=2           # Concurrent requests
export OLLAMA_MAX_LOADED_MODELS=2      # Models in memory
export OLLAMA_KEEP_ALIVE="10m"         # Unload after 10 min idle

# Start with custom settings:
OLLAMA_HOST=0.0.0.0:11434 OLLAMA_NUM_PARALLEL=2 ollama serve
```

⚠️ Network Security

Setting `OLLAMA_HOST=0.0.0.0` exposes your model to the local network. Only do this on trusted networks. For remote access, use SSH tunneling or a reverse proxy with authentication.

vLLM for Production Serving

For higher throughput or production workloads, **vLLM** provides continuous batching and PagedAttention:

```
# Install vLLM (requires Python 3.9+)
pip3 install vllm --break-system-packages

# Start vLLM server with Gemma 4 12B
python3 -m vllm.entrypoints.openai.api_server \
  --model google/gemma-4-12B-it \
  --host 0.0.0.0 \
  --port 8000 \
  --max-model-len 32768 \
  --quantization awq \
  --dtype float16

# vLLM provides:
# - Continuous batching (much higher throughput)
# - PagedAttention (better memory management)
# - OpenAI-compatible API at :8000/v1/
# - Streaming support
# - Token usage tracking

# Test it:
curl http://localhost:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "google/gemma-4-12B-it",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

💡 Ollama vs vLLM

**Ollama** is better for personal use — easy setup, auto-manages models, great CLI. **vLLM** is better for serving multiple users or building production apps — higher throughput, better concurrency, more configuration options. For your Mac, Ollama is usually the right choice.

Building a Local ChatGPT-Like Interface

```
#!/usr/bin/env python3
"""local_chat_ui.py — Terminal-based chat interface for Gemma 4"""
import requests, json, sys

OLLAMA_URL = "http://localhost:11434/api/chat"
MODEL = "gemma4:12b"

SYSTEM_PROMPT = """You are Gemma, a helpful AI assistant running locally \
on this Mac. You are Gemma 4 12B, an open model by Google DeepMind. \
Be concise, accurate, and helpful."""

def chat():
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    print("╔══════════════════════════════════════════╗")
    print("║   Local Gemma 4 12B Chat                 ║")
    print("║   Type 'quit' to exit, 'clear' to reset  ║")
    print("╚══════════════════════════════════════════╝\n")

    while True:
        try:
            user_input = input("\033[94mYou:\033[0m ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\nGoodbye!")
            break

        if not user_input:
            continue
        if user_input.lower() == "quit":
            break
        if user_input.lower() == "clear":
            messages = [{"role": "system", "content": SYSTEM_PROMPT}]
            print("  (conversation cleared)\n")
            continue

        messages.append({"role": "user", "content": user_input})

        # Stream the response
        print("\033[92mGemma:\033[0m ", end="", flush=True)
        resp = requests.post(OLLAMA_URL, json={
            "model": MODEL,
            "messages": messages,
            "stream": True,
        }, stream=True)

        full_response = ""
        for line in resp.iter_lines():
            if line:
                chunk = json.loads(line)
                if "message" in chunk:
                    text = chunk["message"]["content"]
                    print(text, end="", flush=True)
                    full_response += text

        print("\n")
        messages.append({"role": "assistant", "content": full_response})

if __name__ == "__main__":
    chat()
```

Integrating with Existing Apps

Since Ollama exposes an OpenAI-compatible API, you can swap cloud APIs for local Gemma 4 in any app that uses the OpenAI SDK:

```
# Python — swap OpenAI for local Gemma 4
# Before (cloud):
from openai import OpenAI
client = OpenAI(api_key="sk-...")

# After (local — just change base_url and model):
from openai import OpenAI
client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama"  # Any string works
)

response = client.chat.completions.create(
    model="gemma4:12b",  # Instead of "gpt-4o"
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Explain recursion simply."}
    ],
    temperature=0.7,
    max_tokens=512,
)
print(response.choices[0].message.content)

# This works with ANY OpenAI-compatible library:
# - LangChain, LlamaIndex, Haystack
# - Continue.dev (VS Code AI extension)
# - Open WebUI, Chatbot UI
# - Any custom app using the OpenAI SDK
```

Hands-On: Set Up a Local API for Your Apps

🔬 Hands-On Exercise

Create a reusable local API wrapper that any of your projects can import:

```
#!/usr/bin/env python3
"""gemma_client.py — Drop-in local AI client for your projects"""
from openai import OpenAI

class GemmaClient:
    """Local Gemma 4 client with OpenAI-compatible interface."""

    def __init__(self, model="gemma4:12b", base_url="http://localhost:11434/v1"):
        self.client = OpenAI(base_url=base_url, api_key="ollama")
        self.model = model

    def chat(self, prompt, system="You are a helpful assistant.",
             temperature=0.7, max_tokens=1024):
        """Simple chat completion."""
        resp = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": system},
                {"role": "user", "content": prompt}
            ],
            temperature=temperature,
            max_tokens=max_tokens,
        )
        return resp.choices[0].message.content

    def analyze_code(self, code, language="python"):
        """Analyze code for bugs, style, and improvements."""
        return self.chat(
            f"Review this {language} code:\n```{language}\n{code}\n```",
            system="Expert code reviewer. Be specific and actionable.",
            temperature=0.2
        )

    def summarize(self, text, max_words=100):
        """Summarize text."""
        return self.chat(
            f"Summarize in {max_words} words:\n\n{text}",
            system="Concise summarizer.",
            temperature=0.3
        )

    def extract_json(self, text, schema_desc=""):
        """Extract structured JSON from text."""
        return self.chat(
            f"Extract as JSON {schema_desc}:\n\n{text}",
            system="Output only valid JSON. No explanation.",
            temperature=0.1
        )

# Usage in any project:
# from gemma_client import GemmaClient
# ai = GemmaClient()
# print(ai.chat("What is machine learning?"))
# print(ai.analyze_code("def f(x): return x+1"))
# print(ai.summarize("Long article text here..."))
```

Privacy: Data Never Leaves Your Machine

The single most compelling reason to run Gemma 4 locally is **privacy**. When you use cloud AI APIs, your data traverses the internet and is processed on third-party servers. With local Gemma 4:

-   **Zero data transmission** — prompts and responses never leave your Mac
-   **No logging** — no usage logs, no training data collection, no telemetry
-   **Offline capability** — works with Wi-Fi off, on airplanes, in air-gapped environments
-   **Compliance friendly** — HIPAA, GDPR, FERPA, SOC 2 considerations simplified

This matters for:

-   **Medical records** — analyze patient data without cloud exposure
-   **Legal documents** — review contracts and privileged communications
-   **Financial data** — process sensitive financial models and reports
-   **Proprietary code** — code review without sending IP to third parties
-   **Personal data** — journal analysis, email drafting, personal finance

Cost Analysis: $0/Query vs API Pricing

Let's do the math on running local vs cloud for typical usage patterns:

| Usage Pattern | Queries/Month | Cloud Cost/Month | Local Cost | Annual Savings |
| --- | --- | --- | --- | --- |
| Light (personal) | 500 | $5–15 | $0 * | $60–180 |
| Moderate (developer) | 3,000 | $30–90 | $0 * | $360–1,080 |
| Heavy (production) | 30,000 | $300–900 | $0 * | $3,600–10,800 |
| Team (5 devs) | 15,000 | $150–450 | $0 * | $1,800–5,400 |

\* Electricity cost is negligible — Apple Silicon draws ~15W under ML load, costing about $0.05/day if running continuously.

> **Tip:** ✅ Break-Even
>
> If you already own an M-series Mac with 16GB+ RAM, the break-even point is **immediate** — there's no additional hardware cost. Even if you're buying a Mac specifically for local AI, a Mac Mini M4 (16GB) at ~$600 pays for itself within 6–18 months of moderate API usage.

When Local Beats APIs (and When It Doesn't)

| Local Gemma 4 Wins | Cloud API Wins |
| --- | --- |
| Privacy-sensitive data processing | Complex reasoning requiring frontier models |
| High-volume repetitive tasks (OCR, classification) | Tasks requiring latest world knowledge |
| Offline environments (travel, air-gapped) | Very long context (100K+ tokens) |
| Cost-sensitive applications | Maximum speed / lowest latency |
| Embedded in local tools and scripts | Multi-model orchestration |
| Development and prototyping | Production apps needing 99.9% uptime |
| Image/audio analysis with sensitive content | State-of-the-art code generation |

Building a Hybrid Architecture

The smartest approach isn't local-only or cloud-only — it's **hybrid**. Route simple tasks to local Gemma 4 and complex tasks to cloud APIs:

```
#!/usr/bin/env python3
"""hybrid_router.py — Route to local or cloud based on task complexity"""
from openai import OpenAI

# Local Gemma 4
local = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")

# Cloud API (for complex tasks)
cloud = OpenAI(api_key="your-api-key-here")

# Task complexity heuristics
SIMPLE_TASKS = [
    "summarize", "extract", "classify", "translate", "format",
    "review", "describe", "list", "convert", "clean"
]

def route_query(prompt, force_local=False, force_cloud=False):
    """Intelligently route to local or cloud model."""

    if force_local:
        return _call_local(prompt)
    if force_cloud:
        return _call_cloud(prompt)

    # Simple heuristic: check if task is "simple"
    prompt_lower = prompt.lower()
    is_simple = any(word in prompt_lower for word in SIMPLE_TASKS)
    is_short = len(prompt) < 2000

    if is_simple and is_short:
        print("  → Routing to LOCAL Gemma 4 (fast, free, private)")
        return _call_local(prompt)
    else:
        print("  → Routing to CLOUD API (complex reasoning)")
        return _call_cloud(prompt)

def _call_local(prompt):
    resp = local.chat.completions.create(
        model="gemma4:12b",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7, max_tokens=1024,
    )
    return resp.choices[0].message.content

def _call_cloud(prompt):
    resp = cloud.chat.completions.create(
        model="claude-sonnet-4-6",  # Or your preferred cloud model
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7, max_tokens=2048,
    )
    return resp.choices[0].message.content

# Usage:
# Simple task → local (free, private)
print(route_query("Summarize this email: ..."))

# Complex task → cloud (better reasoning)
print(route_query("Design a microservices architecture for ..."))
```

Coursera Implications: Offline Learning Experiences

Local AI models like Gemma 4 open up fascinating possibilities for education and learning platforms:

-   **Offline AI tutoring** — students can get AI help without internet, crucial for underserved regions
-   **Privacy-first learning** — student interactions with AI never leave their device
-   **Custom course assistants** — fine-tune Gemma 4 on course materials for specialized tutoring
-   **Assessment assistance** — local grading and feedback on assignments without cloud latency
-   **Accessibility** — local audio-to-text processing for hearing-impaired students
-   **Cost reduction** — eliminate per-query API costs for educational institutions

Imagine a Coursera course that ships with a fine-tuned Gemma 4 model as the "course TA" — available offline, specialized in the course material, and completely private. This could be especially impactful for coding courses, language learning, and medical education.

The Future of Local AI on Consumer Hardware

Gemma 4 12B represents a inflection point in local AI. Here's where things are headed:

-   **Model efficiency is improving faster than hardware** — 12B parameters in 2026 outperforms 70B from 2024 on many benchmarks
-   **Apple Silicon is getting better** — each M-series generation adds ~20% more ML throughput. M5 (expected 2027) will likely run 26B+ models comfortably on base configurations
-   **Quantization keeps improving** — new techniques like QAT (Quantization-Aware Training) close the gap between quantized and full-precision models
-   **Multimodal is the new baseline** — within a year, even edge models (2–4B) will handle text, images, and audio natively
-   **Agentic capabilities are maturing** — local models that can reliably use tools, browse the web, and execute code are becoming practical

💡 The Big Picture

We're moving toward a world where every developer, every knowledge worker, and eventually every consumer has a capable AI model running locally on their device. Gemma 4 12B on your Mac is one of the first practical examples of this future. The skills you've learned in this course — installing, optimizing, building agents, fine-tuning, and serving local models — will remain relevant as models get better and hardware gets faster.

Gemma 4 Local AI Masterclass — Built for Mustafa's Apple Silicon Mac

Gemma 4 12B by Google DeepMind · Apache 2.0 License · Course last updated June 2026

This course is fully offline — no external dependencies, no tracking, no network requests.