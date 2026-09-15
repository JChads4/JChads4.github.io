---
title: "What a PINN actually minimises"
date: 2026-09-02
excerpt: "The loss has two terms, and the second one is not a fit to anything. Understanding what it measures is most of the work."
tags: ["pinns", "training"]
---

A physics-informed neural network is often introduced as a network that is
trained on data plus a differential equation. That description is accurate and
almost useless, because the equation term is not a fit to anything. It is a
residual, evaluated at points where we have made no measurement at all.

## The two terms

Take the damped harmonic oscillator, which is the example I keep coming back to
because it is small enough to hold in your head:

$$
\frac{d^2x}{dt^2} + \mu\frac{dx}{dt} + kx = 0
$$

A PINN represents $x(t)$ with a network $\hat{x}(t;\theta)$ and trains it on the
sum of two losses. The first is a fit to whatever data we have. The second asks
only that the left-hand side above comes out near zero:

$$
\mathcal{L}(\theta) =
\underbrace{\frac{1}{N}\sum_{i=1}^{N}
  \left|\frac{d^2\hat{x}}{dt_i^2} + \mu\frac{d\hat{x}}{dt_i} + k\hat{x}\right|^2
  }_{\text{physics: the ODE residual}}
\;+\;
\underbrace{\left|\hat{x}(0) - 1\right|^2 + \left|\frac{d\hat{x}}{dt}(0)\right|^2
  }_{\text{initial conditions}}
$$

The points $t_i$ are collocation points. They are not measurements, they are
just places where we have decided to insist the equation holds, and we can draw
as many as we like for free. That is the whole trick: the equation supplies
supervision in regions where no data exists.

## Where the derivatives come from

Nothing here is discretised. The derivatives in the residual are taken by
automatic differentiation through the network itself, which is why the physics
term costs one backward pass and no mesh, no stencil and no time stepping.

```python
loss1 = torch.mean(torch.square(dxdt[:,0] + mu*dxdt[:,1] + k*xh))# the ode residual
loss2 = torch.mean(torch.square(xh[0,0] - 1.0) + torch.square(dxdt[0,0]))# initial conditions
loss = loss1+loss2# add two loss terms together
```

The derivatives are obtained the same way, by asking autograd for the gradient
of the network output with respect to its input rather than with respect to its
weights.

## Why it is harder than it looks

Two things go wrong constantly.

The first is that the two loss terms are not commensurate. They have different
units, different magnitudes, and they fight: pushing the residual down in one
region can pull the solution away from the data somewhere else. The relative
weight is a hyperparameter that genuinely matters, and there is no setting that
works for every problem.

The second is that a small residual is not the same as a correct solution. A
network can satisfy the equation in the aggregate while being wrong in exactly
the region you care about, and the loss will not tell you. Which is why the
residual is a diagnostic, not a certificate.

> The data term tells the network what happened. The residual term tells it what
> is allowed. Neither alone is a solution.
