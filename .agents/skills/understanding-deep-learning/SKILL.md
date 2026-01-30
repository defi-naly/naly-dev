---
name: understanding-deep-learning
description: "Apply Simon Prince's comprehensive deep learning framework for understanding neural networks, architectures, and training. Use when building ML models, understanding neural networks, debugging training, choosing architectures, or when user mentions: deep learning, neural networks, transformers, CNNs, backpropagation, loss functions, regularization, or model architecture."
---

# Understanding Deep Learning

## Core Concepts

Deep learning is function approximation using compositions of simple nonlinear functions. Neural networks learn hierarchical representations from data.

```
INPUT ──► [Layer 1] ──► [Layer 2] ──► ... ──► [Layer N] ──► OUTPUT
              │              │                    │
         Low-level      Mid-level            High-level
         features       features             features
```

**Why deep?** Depth enables hierarchical representations. Each layer builds on the previous, creating increasingly abstract features.

## The Supervised Learning Framework

### The Setup

```
Given: Training data {(x₁, y₁), (x₂, y₂), ..., (xₙ, yₙ)}
Goal: Learn function f(x, θ) that predicts y from x
Method: Minimize loss L(θ) over parameters θ
```

### Loss Functions

| Task | Loss Function | Formula |
|------|---------------|---------|
| Regression | Mean Squared Error | L = (1/n)Σ(y - ŷ)² |
| Binary Classification | Binary Cross-Entropy | L = -Σ[y·log(ŷ) + (1-y)·log(1-ŷ)] |
| Multi-class | Cross-Entropy | L = -Σ y·log(ŷ) |

**Key insight**: The loss function defines what "good" means. Choose it carefully—the model optimizes exactly what you specify.

### Gradient Descent

```
Repeat:
    1. Compute gradient: ∇L(θ)
    2. Update parameters: θ ← θ - η·∇L(θ)
Until convergence
```

**Learning rate (η)**: Too high = unstable, too low = slow. This is the most important hyperparameter.

### Stochastic Gradient Descent (SGD)

Use mini-batches instead of full dataset:
- **Faster**: Don't need full dataset for each update
- **Regularizing**: Noise helps escape local minima
- **Memory efficient**: Fits in GPU memory

**Batch size tradeoffs:**
- Smaller → more noise, better generalization, slower
- Larger → less noise, faster, may overfit

## Neural Network Building Blocks

### The Neuron (Perceptron)

```
        x₁ ──w₁──┐
        x₂ ──w₂──┼──► Σ ──► activation ──► output
        x₃ ──w₃──┘    + b
```

`output = activation(w₁x₁ + w₂x₂ + w₃x₃ + b)`

### Activation Functions

| Function | Formula | Use Case |
|----------|---------|----------|
| ReLU | max(0, x) | Default for hidden layers |
| Sigmoid | 1/(1+e⁻ˣ) | Binary output, gates |
| Tanh | (eˣ-e⁻ˣ)/(eˣ+e⁻ˣ) | Centered output [-1,1] |
| Softmax | eˣⁱ/Σeˣʲ | Multi-class probabilities |
| GELU | x·Φ(x) | Transformers |
| SiLU/Swish | x·σ(x) | Modern architectures |

**Why nonlinearity?** Without it, stacked layers collapse to single linear transformation. Nonlinearity enables learning complex functions.

### Layers

**Dense (Fully Connected):**
Every neuron connects to every input. `output = activation(Wx + b)`

**Convolutional:**
Local connectivity with shared weights. Translation invariant.

**Recurrent:**
Connections through time. Maintains hidden state.

**Attention:**
Dynamic weighting of inputs. Learns what to focus on.

## Backpropagation

The algorithm for computing gradients efficiently through the chain rule.

```
Forward pass: Compute outputs layer by layer
Backward pass: Compute gradients layer by layer (in reverse)
```

### Chain Rule Application

For loss L with intermediate computations:
```
∂L/∂w = ∂L/∂output · ∂output/∂w
```

Gradients flow backward through the computation graph.

### Gradient Problems

**Vanishing gradients:**
- Gradients shrink exponentially through layers
- Caused by: saturating activations, deep networks
- Solutions: ReLU, residual connections, careful initialization

**Exploding gradients:**
- Gradients grow exponentially
- Solutions: gradient clipping, normalization, careful initialization

## Regularization

Techniques to prevent overfitting (memorizing training data).

### Weight Decay (L2 Regularization)

Add penalty for large weights: `L_total = L_data + λ·||w||²`

Encourages smaller, more distributed weights.

### Dropout

Randomly zero out neurons during training (typically p=0.5 for hidden, p=0.2 for input).

**Effect**: Forces redundancy, prevents co-adaptation.

**At inference**: Use all neurons but scale by (1-p).

### Data Augmentation

Create variations of training data:
- Images: rotation, flip, crop, color jitter
- Text: synonym replacement, back-translation
- Audio: pitch shift, time stretch, noise

**Philosophy**: More diverse training data > more complex model.

### Early Stopping

Stop training when validation loss stops improving.

```
Training loss: keeps decreasing
Validation loss: decreases, then increases ← stop here
```

### Batch Normalization

Normalize activations within each mini-batch:
```
x̂ = (x - μ_batch) / σ_batch
output = γx̂ + β  (learned scale and shift)
```

**Benefits**: Faster training, higher learning rates, some regularization.

### Layer Normalization

Normalize across features (not batch). Preferred for transformers and RNNs.

## Optimization

### Optimizers

| Optimizer | Key Idea | When to Use |
|-----------|----------|-------------|
| SGD | Basic gradient descent | With momentum, still competitive |
| SGD + Momentum | Accumulate velocity | Faster convergence |
| Adam | Adaptive learning rates + momentum | Default choice |
| AdamW | Adam with decoupled weight decay | Large models, transformers |

### Learning Rate Schedules

**Warmup**: Start low, increase gradually. Helps stability early in training.

**Decay**: Reduce over time.
- Step decay: Drop by factor every N epochs
- Cosine: Smooth decrease following cosine curve
- Linear: Steady decrease

**Cyclical**: Oscillate between bounds. Can help escape local minima.

## Convolutional Neural Networks (CNNs)

For grid-structured data (images, audio spectrograms).

### Key Components

**Convolutional layer:**
- Slides filter/kernel across input
- Detects local patterns
- Parameters: kernel size, stride, padding, channels

**Pooling layer:**
- Downsamples spatially
- Max pooling (most common) or average pooling
- Provides translation invariance

### Typical Architecture

```
INPUT ──► [Conv + ReLU + Pool] × N ──► Flatten ──► [Dense] × M ──► OUTPUT
          (feature extraction)                     (classification)
```

### Famous Architectures

| Architecture | Key Innovation |
|--------------|----------------|
| LeNet | First successful CNN |
| AlexNet | Deep CNNs work, ReLU, dropout |
| VGG | Smaller filters (3×3), deeper |
| ResNet | Residual connections |
| Inception | Multiple filter sizes in parallel |
| EfficientNet | Compound scaling |

### Residual Connections

```
x ──────────────────────┐
│                       │
└──► [Conv] ──► [Conv] ─┴──► x + F(x)
```

**Why it works**: Gradients flow directly through skip connections. Enables very deep networks (100+ layers).

## Recurrent Neural Networks (RNNs)

For sequential data (text, time series).

### Basic RNN

```
h_t = tanh(W_h · h_{t-1} + W_x · x_t + b)
```

Hidden state h carries information through time.

**Problem**: Vanishing/exploding gradients over long sequences.

### LSTM (Long Short-Term Memory)

Gated architecture that controls information flow:

```
Forget gate: f_t = σ(W_f · [h_{t-1}, x_t])     ← what to forget
Input gate:  i_t = σ(W_i · [h_{t-1}, x_t])     ← what to add
Output gate: o_t = σ(W_o · [h_{t-1}, x_t])     ← what to output

Cell state:  c_t = f_t ⊙ c_{t-1} + i_t ⊙ tanh(W_c · [h_{t-1}, x_t])
Hidden:      h_t = o_t ⊙ tanh(c_t)
```

**Key insight**: Cell state provides highway for gradients. Gates learn what to remember/forget.

### GRU (Gated Recurrent Unit)

Simplified LSTM with two gates (reset, update). Fewer parameters, similar performance.

## Transformers

The dominant architecture for sequences (and increasingly everything else).

### Self-Attention

Compute weighted combination of all positions:

```
Attention(Q, K, V) = softmax(QK^T / √d_k) · V
```

- **Q (Query)**: What am I looking for?
- **K (Key)**: What do I contain?
- **V (Value)**: What do I provide?

**Scaled dot-product**: Divide by √d_k to prevent softmax saturation.

### Multi-Head Attention

Multiple attention operations in parallel:

```
MultiHead(Q, K, V) = Concat(head_1, ..., head_h) · W^O
where head_i = Attention(QW_i^Q, KW_i^K, VW_i^V)
```

**Why multiple heads?** Different heads can attend to different types of relationships.

### Transformer Block

```
x ──► LayerNorm ──► Multi-Head Attention ──► + ──► LayerNorm ──► FFN ──► + ──► output
│                                           │ │                         │
└───────────────────────────────────────────┘ └─────────────────────────┘
                  (residual)                        (residual)
```

### Positional Encoding

Attention is permutation-invariant—needs position information injected.

**Sinusoidal**: Fixed pattern of sines/cosines at different frequencies.
**Learned**: Trainable embedding per position.
**Rotary (RoPE)**: Encode relative positions through rotation.

### Encoder vs Decoder

**Encoder**: Bidirectional attention (sees all positions). BERT-style.
**Decoder**: Causal attention (only sees previous positions). GPT-style.
**Encoder-Decoder**: Encoder for input, decoder for output. T5-style.

## Generative Models

### Autoencoders

```
Input ──► Encoder ──► Latent Space ──► Decoder ──► Reconstruction
                         z
```

Learn compressed representation. Loss = reconstruction error.

### Variational Autoencoders (VAEs)

Latent space is probability distribution, not point.
Loss = reconstruction + KL divergence (regularizes latent space).

Enables generation by sampling from latent space.

### GANs (Generative Adversarial Networks)

Two networks competing:
- **Generator**: Creates fake samples
- **Discriminator**: Distinguishes real from fake

Training is adversarial game. Generator improves to fool discriminator.

### Diffusion Models

Learn to reverse a noise-adding process:
1. Forward: Gradually add noise until pure noise
2. Reverse: Learn to denoise step by step
3. Generate: Start from noise, denoise to sample

State-of-the-art for image generation (DALL-E, Stable Diffusion, Midjourney).

## Practical Training Guide

### Debugging Checklist

| Symptom | Possible Causes | Solutions |
|---------|-----------------|-----------|
| Loss not decreasing | LR too low/high, bug in code | Check gradients, try different LR |
| Loss NaN/Inf | LR too high, numerical issues | Lower LR, gradient clipping, check data |
| Overfitting | Model too complex, not enough data | Regularization, more data, simpler model |
| Underfitting | Model too simple, LR too low | Bigger model, higher LR, train longer |
| Slow convergence | LR too low, bad initialization | Increase LR, use standard init |

### Hyperparameter Priority

1. **Learning rate** (most important)
2. **Batch size**
3. **Architecture (depth, width)**
4. **Regularization (dropout, weight decay)**
5. **Optimizer settings**

### Training Recipe

1. **Start simple**: Small model, verify it can overfit small batch
2. **Scale up**: Gradually increase model size and data
3. **Tune LR**: Find highest stable learning rate
4. **Add regularization**: Only when overfitting
5. **Extend training**: More epochs if still improving

## Model Selection Guide

| Data Type | Recommended Architecture |
|-----------|-------------------------|
| Tabular | Gradient boosting, then MLP |
| Images | CNN (ResNet, EfficientNet) or ViT |
| Text | Transformer (BERT, GPT) |
| Sequences | Transformer or LSTM |
| Graphs | GNN (GCN, GAT) |
| Generation (images) | Diffusion models |
| Generation (text) | Autoregressive transformers |

## Key Equations Reference

| Concept | Equation |
|---------|----------|
| Linear layer | y = Wx + b |
| ReLU | f(x) = max(0, x) |
| Softmax | p_i = e^{x_i} / Σe^{x_j} |
| Cross-entropy | L = -Σ y_i log(ŷ_i) |
| SGD update | θ ← θ - η∇L |
| Attention | softmax(QK^T/√d)V |
| BatchNorm | (x - μ)/σ · γ + β |
