---
title: "A place to write things down"
date: 2026-09-14
excerpt: "I spent years on experimental nuclear physics. This is where I write up the move into machine learning and physics-informed neural networks."
tags: ["meta"]
---

I spent years doing experimental nuclear physics, largely on the spectroscopy of
heavy and superheavy nuclei. This is where I write up the move into machine
learning, and specifically into physics-informed neural networks.

Most of what I work out in a week never leaves a notebook or a git log. A
training run that only converges if you weight the loss a particular way, a
residual that looks fine until you check it away from the data, an
implementation detail that turns out to be the whole difference. This is where
the parts worth keeping will go.

The plan is short posts, written while the detail is still fresh. Expect:

- what PINNs actually minimise, and why the answer is less obvious than it sounds
- training behaviour: losses that stall, stiffness, and the tricks that help
- ML for physics data, where the noise model matters more than the architecture
- code, mostly small and mostly PyTorch

Nothing here is a paper and nothing here is peer reviewed. If something is
wrong, tell me and I will fix it.

Posts are Markdown files in `src/content/blog/`, so writing one means dropping
in a file with a few lines of frontmatter. Maths works, both inline like
$\mathcal{L} = \mathcal{L}_{\text{data}} + \lambda\mathcal{L}_{\text{physics}}$
and displayed:

$$
\frac{\partial u}{\partial t} + \mathcal{N}[u] = 0
$$
