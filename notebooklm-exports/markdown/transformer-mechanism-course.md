# The Mechanism — What a Transformer Actually Computes

# The Mechanism

Stage 1 of the path. What a transformer actually computes between the text going in and the logits coming out — attention as routing, the residual stream as a sequence of additive edits, and where the parameters really live. Taught so that at the end you can write the forward pass from a blank file, and read a `config.json` as a spec sheet.

9 modules

~30 h stage budget

$0 compute

1 interactive tool

~75 min read

28 Aug 2026 verified

Stage 1 of five · the path is in [Intermediate to Advanced AI](ai-path-intermediate-to-advanced-course.html) · next: [The Training Stack](training-stack-course.html)

What this course is for

This is the first of five stage courses that teach the path laid out in [Intermediate to Advanced AI](ai-path-intermediate-to-advanced-course.html). That course tells you what the stages are and in what order. This one teaches the first stage.

**Everything downstream depends on this.** Learning-rate schedules, loss spikes, LoRA, KV caches, quantization error, why fine-tuning cannot add facts — all of it is a statement about the object described here. Skip this stage and the other four become folklore you are memorising rather than mechanics you are reasoning about.

The prose is written to be understood, not skimmed. But the course does not end in understanding — it ends in a **clearing test** that produces a file. Reading this page is not the test.

## Course Modules

1.  [Text in, logits outThe whole pass](#m1)
2.  [Attention is a soft dictionary lookupRouting](#m2)
3.  [The residual streamThe load-bearing idea](#m3)
4.  [The MLP, and where parameters liveArithmetic](#m4)
5.  [Norms and positionsThe plumbing](#m5)
6.  [Heads — multi, grouped, and what they doAnd its limits](#m6)
7.  [The objective is one lineCross-entropy](#m7)
8.  [Reading a config like a spec sheetApplied](#m8)
9.  [The Forward Pass LedgerInteractive](#m9)

## Module 1: Text in, logits out

By the end of this module you will

-   Be able to name every step between a string and a probability distribution, in order
-   Know the shape of the tensor at each step, in terms of B, T, C and V
-   Understand what "the model" is doing that is *not* the neural network — and why that matters

### The whole thing, uncompressed

A decoder-only transformer — the architecture behind essentially every current language model — is a function from a sequence of integers to a matrix of scores. That is the entire contract. Everything else is detail about how the function is computed.

Here is the whole pass, with nothing hidden. Four dimensions carry the argument throughout: **B** is batch size, **T** is sequence length in tokens, **C** is the model dimension (the width of the residual stream, called `hidden_size` or `d_model` in configs), and **V** is vocabulary size.

```
# 0. OUTSIDE THE NETWORK — tokenization
"The cat sat"  →  [791, 8415, 7731]              # (T,)  ints, not floats

# 1. EMBEDDING — integers become vectors
x = W_embed[ids]                                  # (B,T,C)

# 2. N IDENTICAL BLOCKS — each one reads the stream and adds to it
for block in blocks:
    x = x + attention(norm(x))                    # (B,T,C) — unchanged shape
    x = x + mlp(norm(x))                          # (B,T,C) — unchanged shape

# 3. FINAL NORM
x = norm(x)                                       # (B,T,C)

# 4. UNEMBEDDING — vectors become scores over the vocabulary
logits = x @ W_unembed                            # (B,T,V)
```

Read that again and notice the thing that is easy to miss: **the shape never changes in the middle.** From step 1 to step 3, the tensor is `(B,T,C)` the entire way. Forty blocks, eighty blocks, a hundred and twenty — the object being passed along is the same size at every point. That is not an implementation convenience. It is the central architectural fact, and Module 3 is about what follows from it.

The output is not "the next token"

Step 4 produces `(B,T,V)` — a full distribution over the vocabulary at *every* position, not just the last one. Position 0 predicts what follows token 0, position 1 predicts what follows token 1, and so on, all in the same forward pass.

This is why training is so efficient. One pass over a 4,096-token document yields 4,096 supervised prediction problems, not one. And it is why the causal mask (Module 2) is load-bearing rather than decorative: without it, position 5 could see token 6 while being asked to predict token 6, and the task would be trivial.

At *inference* you usually throw away all but the last row, which is why people picture the model as producing one distribution. That is a property of how you use it, not of what it computes.

### The step that is not a neural network

Step 0 deserves separate billing because it is not learned by gradient descent, it happens before the model sees anything, and it is responsible for a startling share of confusing model behaviour.

Tokenization is a deterministic, greedy compression scheme — usually byte-pair encoding — fitted once on a corpus and then frozen. It merges frequent byte sequences into single symbols. Common English words become one token. Rare words fragment. Numbers fragment in ways that depend on the exact digits. Whitespace attaches to the following word in some schemes and not others.

The consequences are not cosmetic:

-   **Arithmetic is harder than it looks** because the digits of a number may not align with token boundaries in any consistent way, so "carry the one" is not a local operation in the model's input representation.
-   **Character-level tasks are structurally awkward.** Counting the letters in a word the model sees as a single opaque symbol requires it to have memorised the spelling of that symbol rather than to look.
-   **Cost and context length are measured in tokens, not characters**, and the tokens-per-character ratio varies by more than a factor of two across languages, which is a real and under-discussed pricing asymmetry.

Byte-pair encoding as a compression algorithm is due to [Gage (1994)](https://dl.acm.org/doi/10.5555/177910.177914); its application to neural text was [Sennrich, Haddow and Birch (2016)](https://arxiv.org/abs/1508.07909), who introduced it to handle rare and unseen words in machine translation. If a model's behaviour on some input seems inexplicable, tokenization is the first place to look and it is right an unreasonable share of the time.

Module 1 takeaways

-   A decoder-only transformer maps `(B,T)` integers to `(B,T,V)` scores.
-   The tensor is `(B,T,C)` at every point between embedding and final norm. The shape never changes.
-   Every position gets a prediction in every pass — that is why training is efficient and why the causal mask matters.
-   Tokenization happens outside the network, is frozen, and explains a large share of odd behaviour.

## Module 2: Attention is a soft dictionary lookup

By the end of this module you will

-   Be able to derive attention from a Python dictionary in four steps
-   Know precisely why the scores are divided by the square root of the head dimension
-   Understand the causal mask, why it is implemented with negative infinity, and what breaks without it
-   Be able to state the real reason attention displaced recurrence — which is not the usual answer

### Start from something that already makes sense

A Python dictionary does a hard lookup. You supply a key, it finds the one entry whose key matches exactly, and it returns that entry's value. One winner, no partial credit, and — crucially for our purposes — no derivative. You cannot ask a dictionary how its output would change if the key were slightly different, because the answer is a step function.

Attention is that operation made differentiable, in four moves.

1.  **Every position emits three vectors instead of being a key-value pair.** The **query** is what this position is looking for. The **key** is the label this position advertises. The **value** is what it will hand over if selected. All three are linear projections of the position's current residual-stream vector, so all three are learned.
2.  **Replace exact matching with a similarity score.** Dot the query at position *i* against the key at every position *j*. High dot product means "these match."
3.  **Replace "pick the winner" with a softmax.** The scores become weights that are positive and sum to one. Now every position contributes something; the good matches just contribute more.
4.  **Return a weighted average of the values** rather than one value.

That is the whole operation. Hard lookup becomes soft lookup, and soft lookup has a gradient everywhere — which means the model can learn what to look for and what to advertise, by backpropagation, from nothing but next-token prediction.

\# one head, ignoring batch. Q,K: (T, d\_head) V: (T, d\_head)
scores = Q @ K.T / **sqrt(d\_head)** \# (T, T)
scores = scores.masked\_fill(causal\_mask, **\-inf**)
weights = softmax(scores, dim=-1) \# (T, T), each row sums to 1
out = weights @ V \# (T, d\_head)

### Why divide by the square root of the head dimension

This is the detail people skip, and it is the difference between a model that trains and one that does not.

Take two vectors of dimension *d* whose components are independent with mean zero and unit variance. Their dot product is a sum of *d* such products, so its variance is proportional to *d* and its typical magnitude grows like the square root of *d*. At a head dimension of 128, raw scores routinely land in the tens.

Now feed scores of that size into a softmax. Softmax exponentiates, so a gap of ten between the largest and second-largest score becomes a ratio of about 22,000 to one. The distribution collapses to nearly one-hot — and the gradient of a saturated softmax with respect to its inputs is nearly zero. The layer stops learning. Dividing by the square root of the head dimension rescales the scores back to order one, which is where softmax has usable gradients.

Check it yourself in thirty seconds

This is one of the few claims in this course you can verify in a REPL without training anything. Draw `q, k = torch.randn(128), torch.randn(128)`, compute `q @ k` over a thousand draws, and look at the standard deviation. You should see roughly `sqrt(128) ≈ 11.3`. Then softmax a vector of scores at that scale and look at the max weight. Do it — the number is more convincing than the paragraph.

The original paper ([Vaswani et al., 2017](https://arxiv.org/abs/1706.03762), footnote 4) gives exactly this argument: they suspect that for large values of the key dimension, the dot products grow large in magnitude and push the softmax into regions of extremely small gradients.

### The causal mask

A language model must not see the future. When predicting the token at position *t*+1 from positions 0 through *t*, position *t* must not be allowed to attend to *t*+1 — otherwise the answer is in the input.

The implementation is one line: before the softmax, set every score where *j* > *i* to negative infinity. Exponentiating negative infinity gives exactly zero, so those positions receive zero weight and, importantly, receive zero gradient. Masking *after* the softmax would be a bug: the masked entries would still have consumed probability mass from the normalisation.

What actually breaks if you remove it — and which direction the loss moves

This is a favourite interview question because the intuitive answer is backwards.

Remove the causal mask and the **training loss falls**, often dramatically and immediately. It does not rise. The model can now see the token it is being asked to predict, so it learns the trivial identity mapping — copy position *t*+1's information into position *t*'s prediction — and drives loss towards zero.

What breaks is *generation*. At inference the future does not exist, so the model is asked to run in a regime it never trained for, and produces nonsense. This is the cleanest example in the field of a metric improving while the system gets worse, and it is worth holding as a template: a loss that drops suspiciously fast is usually leakage, not learning.

### Why it beat recurrence — the honest answer

The usual story is that RNNs forget long-range context and attention does not. That is real, and it is secondary. **The primary reason attention won is that it parallelises and recurrence does not.**

An RNN computes the state at position *t* from the state at position *t*−1. That is a sequential dependency by construction: step 500 cannot start until step 499 finishes. A GPU with tens of thousands of arithmetic units can therefore do almost nothing at once along the sequence axis and spends the run mostly idle.

In attention, every position's output depends on the full input sequence but on no other position's *output*. So all positions compute simultaneously, as one large matrix multiply — precisely the operation the hardware is built for. The paper is titled *Attention Is All You Need*; a fair subtitle would have been *and it parallelises*.

Hold on to this, because it generalises. Architecture in this field is jointly determined by mathematics and by silicon, and when a design choice looks arbitrary the hardware is usually the missing half of the explanation. That framing is what makes the training and inference stages legible rather than a list of tricks.

The cost, stated fairly

Attention's parallelism is bought with quadratic cost: the score matrix is T×T, so doubling the context quadruples the attention compute and memory. Recurrence is linear in sequence length and constant in memory. The trade was overwhelmingly worth it at the sequence lengths that mattered in 2017, and the entire long-context research programme since is an attempt to recover some of recurrence's scaling without giving up the parallelism.

This is also why modern state-space and linear-attention hybrids keep reappearing. They are not nostalgia. They are attempts to get a recurrent-shaped cost curve with a parallelisable training formulation, and whether any of them displaces softmax attention at frontier scale is genuinely unsettled as of 2026 — treat confident claims in either direction with suspicion.

Module 2 takeaways

-   Attention is a dictionary lookup with exact matching replaced by softmax over dot-product similarity.
-   The 1/√dhead scale exists because dot-product magnitude grows like √d and saturated softmax has no gradient.
-   The causal mask is applied before the softmax with −∞, so masked positions get zero weight and zero gradient.
-   Removing the mask makes training loss *fall* and generation fail — leakage, not learning.
-   Attention displaced recurrence primarily on parallelism, at the price of quadratic cost in sequence length.

## Module 3: The residual stream

By the end of this module you will

-   Be able to say why the standard "stack of transformations" picture of a transformer is wrong
-   Know the four things the additive view explains that the pipeline view cannot
-   Be able to state the honest limits of each of those four claims

### The picture in your head is probably wrong

Almost every diagram draws a transformer as a stack: input enters at the bottom, block 1 transforms it, block 2 transforms that, and so on to the top. It is the natural way to draw a deep network and it will actively mislead you.

Because of the residual connections, a block does not transform its input. It *reads* its input, computes something, and *adds* the result back:

```
# NOT this — a pipeline of transformations
x = block(x)

# but this — read, compute, add back
x = x + attention(norm(x))
x = x + mlp(norm(x))
```

So there is a single vector per position — the **residual stream** — running unbroken from the embedding to the final norm. Every sublayer is a side channel that reads from the stream and writes an increment into it. Nothing is ever replaced. Things are only ever added.

The term and the framing come from [Elhage et al., *A Mathematical Framework for Transformer Circuits*](https://transformer-circuits.pub/2021/framework/index.html) (Anthropic, 2021), which treats the stream as a communication channel that components read from and write to. It is the single most useful reframing available for this architecture, and it costs nothing to adopt.

One consequence, stated in linear algebra

Because every contribution is added, the final residual-stream vector is a *sum*: the embedding, plus one term per attention sublayer, plus one term per MLP sublayer. For a 40-layer model that is 81 addends.

Two things fall out of that immediately. First, every component's output can influence every later component, so the computational graph between layers is fully connected rather than a chain. Second, you can ask what any individual addend contributed to the final answer — project it through the unembedding and look at which logits it pushed on. That is the basis of most mechanistic-interpretability tooling, and it is only well defined because the combination is a sum.

### Four things this explains — and what each claim actually supports

#### 1\. Deleting a middle layer degrades gracefully

Delete stage 7 of a seven-stage pipeline and everything downstream receives garbage. Delete one addend from a sum of 81 and the sum is slightly wrong. The additive structure predicts graceful rather than catastrophic degradation, and that is what is observed — the effect was first characterised for residual networks generally by [Veit, Wilber and Belongie (2016)](https://arxiv.org/abs/1605.06431), who argued residual networks behave like ensembles of relatively shallow paths.

**The limit, stated honestly:** this is not uniform across depth. Work on layer pruning in LLMs — for example [Gromov et al., *The Unreasonable Ineffectiveness of the Deeper Layers*](https://arxiv.org/abs/2403.17887) — finds that a substantial fraction of the *deeper* layers can be removed with modest degradation, while early layers cannot. So the correct claim is "later blocks are individually low-impact," not "any block is deletable." If you repeat the strong version you will be wrong in front of someone who has tried it.

#### 2\. Activation steering is writing in the model's native format

If a concept corresponds to a direction in the residual stream, then adding a multiple of that vector at some layer is exactly the same kind of operation the model's own sublayers perform. You are not injecting a foreign signal; you are doing what block 12 does, with a vector you chose. The additive view is why this is even a coherent thing to attempt.

**The limit:** "concepts are directions" is a working hypothesis with substantial supporting evidence, not a theorem. Steering often works, sometimes fails, and can degrade unrelated capabilities. Treat it as an empirical technique with a good mechanistic story rather than a settled account of representation.

#### 3\. Depth buys refinement, not re-representation

Layer 30 does not receive a foreign encoding produced by layer 29. It receives the accumulated draft that all 29 previous sublayers have been editing, in the same basis it started in. The model is doing successive editing, not successive translation. This is why intermediate layers can be decoded with the output unembedding at all — the "logit lens" technique — which would be meaningless if each layer re-encoded into a private space.

#### 4\. Why low-rank adaptation is plausible

If capability changes correspond to modest edits in a shared space rather than to wholesale rewiring, then a small low-rank perturbation to each weight matrix is a sensible thing to expect to work. That is not a proof that LoRA works, but it is why the idea is not obviously absurd, and it is the intuition to carry into Stage 3.

The one place the picture is genuinely incomplete

The residual stream has fixed width C and every sublayer writes into it, so its capacity is finite and contested — components must share a limited number of usable directions. The interpretability literature discusses this as bandwidth pressure and treats it as a partial explanation for *superposition*, where a model represents more features than it has dimensions by using non-orthogonal directions and tolerating interference.

You do not need superposition to write a forward pass. You do need it the moment someone claims a neuron or a direction "is" a concept, because in a superposed representation that claim is usually false in the strong form. Know the word and know that it is an active research area, not a solved one.

Module 3 takeaways

-   Blocks read from and add to a persistent per-position vector; nothing is replaced.
-   The final vector is a sum of the embedding plus one term per sublayer — 81 addends in a 40-layer model.
-   Graceful layer deletion, activation steering, the logit lens and LoRA's plausibility all follow from additivity.
-   The honest version of the deletion claim is about *deeper* layers, not arbitrary ones.
-   Fixed stream width is finite bandwidth, which is where superposition enters — an open area, not a settled one.

## Module 4: The MLP, and where the parameters live

By the end of this module you will

-   Be able to state the division of labour between attention and MLP in one sentence
-   Be able to compute the parameter count of any decoder-only model by hand from its config
-   Know why the familiar "one-third attention, two-thirds MLP" rule is true for GPT-2 and false for Llama 3

### The division of labour

Attention — movement between positions

The only component in the architecture that lets information travel from one token position to another. It is routing: it decides *what to fetch from where*.

It cannot do position-wise nonlinear computation beyond the value projection.

MLP — computation at a position

Operates on each position completely independently — it literally cannot see other tokens. It transforms whatever is currently in that position's residual stream.

It cannot move anything. Every fact it uses must already have been routed there by attention.

Say it as one sentence and keep it: **attention moves information between positions; the MLP transforms information at a position.** Once you hold that, several empirical results stop being surprising — that factual recall interventions tend to localise to MLP layers, that mixture-of-experts routes MLPs rather than attention heads, and that long-context work is almost entirely attention work.

The MLP itself is deliberately boring: project up to a wider dimension (`d_ff`, called `intermediate_size` in configs), apply a nonlinearity, project back down. The width ratio is conventionally about four in the classic form. Whatever computation happens at a position happens in that wide middle.

### Now count the parameters, because the count is where the intuition lives

This is arithmetic you should be able to do on a whiteboard. Per block, ignoring biases and norm scales, which are negligible:

\# classic (GPT-2 style): multi-head attention, 2-matrix MLP, d\_ff = 4C
attention = 4C² \# W\_Q, W\_K, W\_V, W\_O, each C×C
mlp = 2 · C · d\_ff = 8C²
**block = 12C² → attention 33.3%, MLP 66.7%**

That is where the familiar one-third / two-thirds rule comes from, and it is exactly right for GPT-2. Check it against a published number: GPT-2 small has C = 768, 12 layers, d\_ff = 3072, vocab 50,257, learned position embeddings for 1,024 positions, tied embeddings.

blocks = 12 × 12 × 768² = 84,934,656
token emb = 50,257 × 768 = 38,597,376
pos emb = 1,024 × 768 =    786,432
**total = 124,318,464 → the "124M" in the model card**

If your hand-count lands on the published number, you have understood where the parameters are. That is a better test of this module than any quiz.

And the rule is wrong for every current model

Two changes since GPT-2 break it, and they push in the same direction.

**Grouped-query attention** shrinks W\_K and W\_V by the ratio of key-value heads to query heads, because several query heads share one key-value head. **SwiGLU MLPs** use three matrices instead of two. Run the same arithmetic on Llama 3 70B, whose published config is C = 8192, d\_ff = 28,672, 80 layers, 64 query heads, 8 key-value heads, vocab 128,256, untied:

Q, O = 2 × 8192² = 134,217,728
K, V = 2 × 8192 × (8 × 128) =  16,777,216
attention                     = 150,994,944  **(17.6%)**
mlp = 3 × 8192 × 28,672 = 704,643,072  **(82.4%)**
block = 855,638,016
× 80 layers = 68,451,041,280
\+ 2 × 128,256 × 8192 (untied) =  2,101,346,304
**total = 70,552,387,584 → "70B"**

So the split for Llama 3 70B is roughly **18% attention, 82% MLP** — not 33/67. The intuition survives and gets stronger: the MLP holds most of the parameters, and more of them than it used to. The specific fraction does not survive, and quoting "a third" about a modern model is the kind of small error that costs credibility in a room where someone has read the config.

### What "knowledge lives in the MLP" does and does not mean

You will hear that the MLP is where facts are stored, often justified by the observation that it looks like a key-value memory: the up-projection produces a sparse-ish activation pattern, the down-projection sums the corresponding rows. Interventions that edit specific factual associations do typically target MLP weights in the middle layers, and they work well enough to be a research subfield.

Be careful with the strong reading. What is supported is that *editing MLP weights at particular layers reliably changes particular factual outputs*. What is not supported is that each fact has a tidy address, or that MLPs are a lookup table with attention as the index. Model editing has known failure modes — edits that do not generalise to paraphrases, edits that damage unrelated behaviour, edits that revert under further training. Hold the localisation result; do not upgrade it to a filing cabinet.

Module 4 takeaways

-   Attention moves information between positions; the MLP transforms it at a position. Neither can do the other's job.
-   Classic block = 12C²: attention 4C², MLP 8C². That is the source of the one-third/two-thirds rule.
-   You can hand-derive GPT-2 small's 124M from its config. Do it once.
-   GQA and SwiGLU shift Llama 3 70B to about 18% attention / 82% MLP. The old ratio no longer holds.
-   MLP localisation of facts is a real empirical result, not a claim that facts have addresses.

## Module 5: Norms and positions

By the end of this module you will

-   Know why normalisation moved inside the residual branch, and what that bought
-   Understand why RMSNorm replaced LayerNorm and what was dropped
-   Be able to explain rotary position embeddings as a rotation, and why they extrapolate better than learned positions

### Pre-norm versus post-norm

The 2017 paper puts the normalisation *after* the residual addition: `x = norm(x + sublayer(x))`. Every current model puts it *inside* the branch: `x = x + sublayer(norm(x))`. That reordering looks like a detail and is not.

In the post-norm arrangement there is no unnormalised path from input to output — every residual addition is immediately renormalised, so gradients are repeatedly rescaled on the way back. [Xiong et al. (ICML 2020)](https://arxiv.org/abs/2002.04745) showed that post-norm transformers have large expected gradients near the output layer at initialisation, which is why the original recipe needed a learning-rate warm-up to train at all, and that pre-norm transformers are well behaved at initialisation and can drop the warm-up entirely.

Pre-norm gives you the clean picture from Module 3: an unbroken additive stream, with each branch seeing a normalised copy. GPT-2 made the switch and effectively nobody has switched back.

What pre-norm costs, since nothing is free

Because nothing rescales the stream itself, the residual stream's magnitude grows monotonically with depth — every block adds, nothing normalises the accumulator. In very deep models this produces a stream whose norm at the top is much larger than at the bottom, which effectively shrinks the relative contribution of later blocks.

Practical stacks respond with a final normalisation before the unembedding (universal), and sometimes with additional normalisation of the queries and keys inside attention — "QK norm" — which bounds the attention logits directly and is one of the standard mitigations when attention logits blow up mid-run. If you see QK norm in a modern config, that is what it is for.

### RMSNorm, and what it dropped

LayerNorm does two things per position: subtract the mean, then divide by the standard deviation, then apply a learned scale and shift. [RMSNorm](https://arxiv.org/abs/1910.07467) (Zhang and Sennrich, NeurIPS 2019) keeps only the rescaling: divide by the root-mean-square of the vector, apply a learned scale. No mean subtraction, no bias.

The finding that made it stick is that the mean-centring was not doing much of the work. Dropping it removes a reduction pass over the vector and a subtraction, which matters because normalisation is a memory-bandwidth-bound elementwise operation executed twice per block — exactly the kind of cheap-looking op that shows up embarrassingly high in a profile. Same quality, fewer bytes moved. Llama and essentially every model that followed use RMSNorm.

### Positions: the model has no idea what order the tokens are in

Attention is permutation-equivariant. Shuffle the input positions and the outputs shuffle with them — the mechanism has no notion of sequence at all. Order has to be injected deliberately, and how you inject it determines what happens when you exceed the lengths seen in training.

| Scheme | How | Behaviour past training length |
| --- | --- | --- |
| Learned absolute (GPT-2) | A trainable vector per position, added to the embedding. | Undefined. There is literally no parameter for position 1,025. Hard ceiling. |
| Sinusoidal (2017) | Fixed sines and cosines at geometric frequencies, added to the embedding. | Defined everywhere, but quality degrades quickly; extrapolation was never as good as hoped. |
| Rotary — RoPE (current default) | Rotate each query and key by an angle proportional to its position, before the dot product. | Defined everywhere; degrades, but is cheaply extendable by rescaling frequencies. |

[RoPE](https://arxiv.org/abs/2104.09864) (Su et al., 2021) is worth understanding properly because it is what you will meet. Split each query and key vector into two-dimensional pairs, and rotate each pair by an angle equal to the position times a frequency that depends on which pair it is. Low-index pairs rotate fast, high-index pairs rotate slowly — so the vector encodes position at multiple scales at once, like the hands of a clock.

The property that makes it work: the dot product of two rotated vectors depends only on the *difference* of the two angles. So attention scores become a function of *relative* position automatically, without ever adding a position vector to the residual stream. Position information is injected into the query-key comparison only, and never occupies stream bandwidth.

Why this is the thing that makes long context tractable

Because the position dependence is a rotation frequency rather than a learned table, you can change the frequencies after training. Divide all the angles by a factor and positions that used to be 8,000 apart now look 2,000 apart — the model is running in a regime it has seen. That family of tricks (frequency scaling, and its refinements) is how models get extended from an 8K training context to 128K without retraining from scratch, and it is only available because position was encoded as an angle.

You can see the parameter in any modern config. Llama 3's `rope_theta` is 500,000, against the 10,000 of the original formulation — a much longer wavelength base chosen so the low-frequency components still vary usefully across a 128K context. Configs are readable once you know what the fields mean, which is what Module 8 is about.

Module 5 takeaways

-   Pre-norm moved normalisation inside the residual branch; it removed the need for LR warm-up and gave a clean additive stream.
-   Its cost is a stream whose norm grows with depth, mitigated by a final norm and sometimes QK norm.
-   RMSNorm drops mean-centring, saving a bandwidth-bound pass with no quality loss.
-   Attention is permutation-equivariant; order must be injected deliberately.
-   RoPE rotates queries and keys so scores depend on relative position — which is what makes context extension possible.

## Module 6: Heads — multi, grouped, and what they actually do

By the end of this module you will

-   Know why heads exist and what is lost by having only one
-   Understand grouped-query attention as an inference-cost decision, and be able to predict its effect
-   Be able to state what head-interpretation results support, and where the popular version overreaches

### One attention pattern is not enough

A single attention operation produces one softmax distribution per position: one set of weights, one blended answer. But a token frequently needs several unrelated things at once. Resolving a pronoun means finding its antecedent. Getting the verb agreement right means finding the subject. Continuing a list means finding the list's previous items. One distribution cannot point at three places with full weight.

So run several attentions in parallel over slices of the stream. Split the C-dimensional vector into H heads of dimension C/H, run the whole query-key-value-softmax operation independently in each, concatenate the results, and pass them through one output projection. Total compute is roughly unchanged — you split the width rather than adding to it — and you buy H independent routing patterns per layer.

The output projection is not a formality

People read `concat(heads) @ W_O` as bookkeeping to restore the shape. It is doing more than that. Because W\_O is a full C×C matrix applied to the concatenation, each head's output is mapped into the residual stream through its own slice of W\_O's rows — which means each head writes into a direction it effectively chooses. Heads do not deposit their output at a fixed address; where they write is learned.

This is why the interpretability literature talks about the OV circuit (what a head writes, given what it attends to) separately from the QK circuit (where a head attends). They are separately learnable and separately analysable, and the framing comes from the same Anthropic circuits work as the residual stream.

### Grouped-query attention is a memory decision

In classic multi-head attention every head has its own W\_K and W\_V, so at inference you must cache one key vector and one value vector per head per token. That cache is what Stage 5 will show you is usually the binding constraint on how many users a GPU can serve at once.

**Grouped-query attention** keeps all H query heads but gives them fewer key-value heads to share. Llama 3 70B has 64 query heads and 8 key-value heads, so each key-value head serves eight queries. The cache shrinks by exactly that ratio — eight times — and so do the K and V parameter matrices, which is half of what shifted the parameter split in Module 4.

The quality cost is small and the memory saving is enormous, which is why it is universal. But notice what kind of decision this is: **an architecture choice made to reduce inference memory, accepted at a small quality cost, before the model was ever trained.** That is the mathematics-and-silicon pattern from Module 2 showing up again, and once you see it you will see it everywhere in modern configs.

### What heads "do", and where that story stops

You have read that particular heads perform particular functions. Some of that is genuinely established. Induction heads — which find a previous occurrence of the current token and copy what followed it — are a real, mechanistically characterised circuit, described in [Olsson et al. (2022)](https://transformer-circuits.pub/2022/in-context-learning-and-induction-heads/index.html), and their formation is visible as a discrete phase change during training. Previous-token heads are similarly well characterised. These are not stories; they are circuits people have traced.

Where the popular version overreaches

The move from "this head implements copying in this setting" to "heads are modules with jobs" is not supported, and it is the version that circulates.

Three specific problems. **Polysemanticity:** a head that behaves cleanly on one distribution frequently does something unrelated on another. **Redundancy:** ablating a head that appears essential often barely moves behaviour, because another head compensates — which the additive stream makes easy. **Selection effects:** most published head stories come from small models on narrow tasks, chosen partly because the story was findable there.

The defensible position is that specific circuits have been identified in specific models for specific behaviours, and that this is real progress, and that a general functional decomposition of a frontier model into labelled heads does not currently exist. If you present the strong version to someone who works on interpretability, expect to be corrected.

Module 6 takeaways

-   Heads exist because one softmax cannot attend to several unrelated things at once; you split the width, not add to it.
-   W\_O lets each head choose where in the stream it writes — QK (where to look) and OV (what to write) are separate circuits.
-   GQA shares key-value heads across query heads; Llama 3 70B's 64:8 ratio shrinks the KV cache eightfold.
-   GQA is an inference-memory decision baked into the architecture before training.
-   Induction heads are real and traced; "each head has a job" is not supported for frontier models.

## Module 7: The objective is one line

By the end of this module you will

-   Be able to state the pretraining loss precisely, including what the units mean
-   Know the relationship between loss, perplexity and bits, and roughly what loss values indicate
-   Understand why the simplicity of the objective is what makes Stage 3 necessary

### The whole objective

Show the model a prefix. Ask for a distribution over the next token. Penalise it by the negative logarithm of the probability it assigned to the token that actually came next. Average over every position of every document. That is the entire pretraining objective.

loss = − (1/N) Σi log pθ( tokeni+1 | token≤i )

There is no auxiliary term for reasoning. No supervision signal for truthfulness. No objective encoding helpfulness or harmlessness. Everything that later looks like capability is a side effect of compressing a very large corpus under that single loss.

It is worth being concrete about the units, because they let you sanity-check a training run. Natural-log cross-entropy is in *nats per token*. Divide by ln 2 to get *bits per token* — the number of yes/no questions you would need to identify the next token given a perfect code. Exponentiate the loss to get *perplexity*, which behaves like an effective branching factor: perplexity 20 means the model is about as uncertain as if it were choosing uniformly among 20 options.

Two reference points, and a warning about comparing them

A model that has learned nothing sits at loss = ln(V). For a 128,000-token vocabulary that is about **11.8**. Any run that starts materially away from ln(V) has an initialisation bug, and this is the cheapest sanity check in all of training — it costs one step.

Trained models land in a much lower band, but **loss values are not comparable across models with different tokenizers.** A tokenizer that packs more characters into each token has fewer, harder predictions to make, and its per-token loss will look worse for the same underlying quality. Comparing raw loss across tokenizers is one of the most common unforced errors in this field. If you must compare, normalise to bits per *character* or bits per byte.

### Why this is what makes post-training necessary

Take the objective literally and the behaviour of a base model stops being mysterious. Ask a faithful next-token predictor "What is the capital of France?" and it may well continue with "What is the capital of Germany?" — because in a very large corpus, that string most often appears in a list of quiz questions. The model is not confused. It is doing exactly what it was optimised to do.

A base model is a **document completer**. It has enormous knowledge and no notion that it is supposed to answer you. Post-training — Stage 3 of this path — exists entirely to close that gap, and it is much easier to understand once you have accepted that pretraining was never trying to produce an assistant.

This also gives you the sharpest available refutation of a common enterprise mistake. If the loss is next-token prediction over your documents, then fine-tuning on your documents optimises the model to *produce text like your documents*. It does not optimise for knowing what is in them. That is why fine-tuning does not reliably add facts, and the argument is available to you from the objective alone, before any empirical evidence.

Module 7 takeaways

-   Pretraining is average negative log probability of the next token. There is no other term.
-   Loss is nats/token; ÷ ln 2 for bits, exp() for perplexity as an effective branching factor.
-   Untrained loss is ln(V) — about 11.8 for a 128K vocabulary. Check it on step one.
-   Loss is not comparable across tokenizers. Normalise to bits per byte if you must compare.
-   The objective produces a document completer, which is precisely why post-training exists.

## Module 8: Reading a config like a spec sheet

By the end of this module you will

-   Know what every field in a modern model config controls
-   Be able to go from a config to parameters, weight memory and KV cache per token, unaided
-   Have a habit that will save you repeatedly: checking the arithmetic before believing the marketing

### The fields that matter

A `config.json` is a small document and most of it is boilerplate. Nine fields carry the architecture:

| Field | Is | What it decides |
| --- | --- | --- |
| hidden_size | C | Residual stream width. Drives parameters quadratically. |
| num_hidden_layers | L | Depth. Drives parameters and KV cache linearly. |
| intermediate_size | d_ff | MLP width. With SwiGLU this is the single largest parameter block. |
| num_attention_heads | H | Query heads. C/H is the head dimension. |
| num_key_value_heads | Hkv | The GQA ratio. Divides KV cache size by H/Hkv. |
| vocab_size | V | Embedding and unembedding size. Significant in small models, minor in large ones. |
| tie_word_embeddings | — | Whether the unembedding reuses the embedding matrix. Worth V×C parameters. |
| max_position_embeddings | Tmax | The advertised context. Says nothing about quality at that length. |
| rope_theta | — | RoPE frequency base. A large value signals a long-context design. |

### The three derivations to have at your fingertips

**1\. Parameters**
per layer = \[ 2C² + 2C·(Hkv·C/H) \] + \[ 3·C·d\_ff \]  \# attention + SwiGLU MLP
total = L × per\_layer + (1 or 2) × V·C

**2\. Weight memory**
bytes = total\_params × bytes\_per\_param  \# BF16 = 2, FP8 = 1, INT4 = 0.5

**3\. KV cache, per token, per sequence**
bytes = 2 × L × Hkv × (C/H) × bytes\_per\_element  \# the 2 is K and V

Run the third one on Llama 3 70B: 2 × 80 × 8 × 128 × 2 bytes = **327,680 bytes**, or 320 KiB, *per token*. At the advertised 131,072-token context that is **41 GiB for a single sequence** — more than half an H100's 80 GB, on top of 141 GB of weights that already do not fit on one card. Without grouped-query attention it would be eight times that.

This is the moment the spec sheet stops being abstract

Nobody serves a single 131K-token sequence per GPU. So the config has just told you something the marketing did not: the advertised context length and the achievable concurrency are in direct competition for the same memory, and the trade is fully determined by numbers printed in a public JSON file.

You now have a habit worth keeping. When someone quotes a context length, a model size or a throughput number, the arithmetic above takes ninety seconds and frequently disagrees with the claim. Stage 5 turns this into a full cost model; for now it is enough that you can do the three calculations and are inclined to.

### What the config cannot tell you

Be equally clear about the limits, because config-reading breeds overconfidence. The file gives you shape and therefore cost. It says nothing about the training data, the number of tokens trained, the post-training recipe, or quality at any context length short of the maximum. Two models with byte-identical configs can differ by an enormous margin on every benchmark. Architecture determines what a model costs; data and training determine what it knows.

Module 8 takeaways

-   Nine config fields carry the architecture; the rest is boilerplate.
-   Parameters, weight memory and KV-cache-per-token are three short derivations. Memorise them.
-   Llama 3 70B is 320 KiB of KV cache per token — 41 GiB for one full-context sequence.
-   Advertised context and achievable concurrency compete for the same memory, and the config proves it.
-   Config gives you cost, never quality. Data and training decide the rest.

## Module 9: The Forward Pass Ledger

By the end of this module you will

-   Have seen every tensor shape in a real model's forward pass, with the numbers filled in
-   Know whether your intuition about the parameter split survives contact with an actual config
-   Have watched specific ablations change specific numbers, which is how the mechanism becomes yours

The tool asks you to guess the MLP's share of the parameters *before* it computes one. That ordering is deliberate: if you see the answer first you will find reasons to have expected it, and the useful case is the one where your guess and the arithmetic disagree. Module 4 gave you two worked examples that point in different directions, so this is a fair test of whether you took the right lesson from them.

Interactive

### Forward Pass Ledger

Stage 1 of 3

1

Configure and commit

Open

Pick a real config or build your own, choose a batch and sequence length, then commit to a guess before anything is computed.

Model

hidden\_size — C768

num\_hidden\_layers — L12

num\_attention\_heads — H12

num\_key\_value\_heads — Hkv12

Equal to H is classic multi-head attention. Lower is grouped-query. Must divide H.

intermediate\_size — d\_ff3072

Sequence length T for the trace1024

Batch size B4

Before you look: what share of this model's parameters are in the MLPs? 50%

Count the embeddings in the denominator. Module 4 worked two examples that disagree with each other — the question is whether you know which one this config resembles.

Your guess is locked before the ledger is computed.

2

The ledger

Locked

3

Break it on purpose

Locked

Each switch removes something the architecture depends on. Turn one on and read what it does to the numbers and to the model. These are the questions the clearing test asks.

What this tool is and is not

The parameter counts are exact arithmetic on the stated configs, and the four presets reproduce their published sizes — GPT-2 small at 124M, GPT-2 XL at ~1.56B, Llama 3 8B at ~8.03B, Llama 3 70B at ~70.6B. If a preset here disagrees with a model card, the tool is wrong and you should trust the card.

The FLOP figures use the standard approximation from [Kaplan et al. (2020)](https://arxiv.org/abs/2001.08361): forward cost per token ≈ 2N + 2·L·T·C, where N excludes embeddings. It ignores normalisation, activation functions, softmax and every elementwise operation. Those are cheap in FLOPs and, as Stage 2 will show, not at all cheap in time — which is the first hint that FLOPs are the wrong unit for predicting speed.

Activation memory is reported for the attention score matrix only, because that is the term that grows quadratically and the one that motivates FlashAttention. Real activation memory during training is larger and depends on what the framework chooses to keep for the backward pass.

Clearing test — Stage 1

**Open a blank editor and write a decoder-only transformer forward pass in PyTorch from memory.** Token embeddings, positional information, causal multi-head self-attention with the scale factor, an MLP, pre-norm residual blocks, a final norm, and an output head. Train it on a text file small enough to overfit. Watch the loss fall towards zero, and sample from it.

Then answer these five unaided — no reference, no model writing them for you.

-   State the shape of every tensor at every step given B, T, C, H and Hkv.
-   Explain what specifically breaks if you remove the causal mask, and say *which direction the training loss moves* and why.
-   Point at the line where the residual stream is written to, and say what the model loses if `x = x + attn(...)` becomes `x = attn(...)`.
-   Given a config file you have not seen, produce the parameter count, the BF16 weight memory and the KV cache per token — and be within a percent of the published size.
-   Explain why the scale factor is there in terms of the variance of a dot product, and say what you would observe in training if it were missing.

**You have cleared Stage 1 when you can write the forward pass from a blank file and answer all five without looking anything up.** Not when you have read this course.

**Not the test:** having read this page. Having a repo you followed along with. Being able to describe attention fluently in words. The characteristic failure of this stage is *fluency without construction* — you can explain queries and keys beautifully and still not produce the code, and only one of those is load-bearing for everything that comes after.

Where to go for the depth

This course teaches the concepts. It is not a substitute for building the thing, and these are the resources worth your hours — all free, all checked on 28 August 2026.

-   [Karpathy, **Let's build GPT: from scratch, in code, spelled out**](https://www.youtube.com/watch?v=kCc8FmEb1nY) — still the single best artefact for this stage. Type it, do not watch it. ~2 hours of video, budget six of work.
-   [Karpathy, **Let's build the GPT Tokenizer**](https://www.youtube.com/watch?v=zduSFxRajkE) — Module 1's step 0, done properly. Skipping tokenization is a debt you pay later with interest.
-   [**Stanford CS336**, lectures 1–3](https://stanford-cs336.github.io/spring2025/) — the rigorous version, plus modern architecture variants.
-   [**A Mathematical Framework for Transformer Circuits**](https://transformer-circuits.pub/2021/framework/index.html) — where the residual stream framing in Module 3 comes from. Read it after you can write the forward pass.
-   [**Attention Is All You Need**](https://arxiv.org/abs/1706.03762) — read it *after* the videos, at which point it is short and mostly familiar. That is the correct experience of this paper, and it is not the one most people have.

Module 9 takeaways

-   The shape is `(B,T,C)` from embedding to final norm, however deep the model.
-   The attention score tensor is `(B,H,T,T)` and it is the term that explodes with context.
-   Modern configs put roughly 80% of block parameters in the MLP, not 67% — GQA and SwiGLU moved it.
-   Every ablation in stage 3 changes a number you can point at. That is the difference between knowing and having read.

Stage 1 of five. Built 28 August 2026; every link and figure checked the same day.

[The path](ai-path-intermediate-to-advanced-course.html) [Stage 2 — Training stack](training-stack-course.html) [Stage 3 — Post-training](post-training-course.html) [Stage 4 — Evals](llm-evals-error-analysis-course.html) [Stage 5 — Inference](inference-economics-course.html)

[Attention Is All You Need](https://arxiv.org/abs/1706.03762) [Transformer Circuits](https://transformer-circuits.pub/2021/framework/index.html) [RoPE](https://arxiv.org/abs/2104.09864) [Pre-LN](https://arxiv.org/abs/2002.04745) [Scaling Laws](https://arxiv.org/abs/2001.08361) [CS336](https://stanford-cs336.github.io/spring2025/)

Architecture claims decay slowly, but they do decay. The parameter splits here are computed from configs published as of August 2026; if a model family changes its attention or MLP shape, Module 4's Llama 3 arithmetic is a snapshot rather than a rule. The interpretability claims in Modules 3 and 6 are the ones most likely to be revised — they are stated with their limits for that reason.