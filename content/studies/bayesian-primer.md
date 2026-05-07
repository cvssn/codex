---
title: bayesian inference primer
category: study
date: 2026-03-05
tags: [statistics, probability, math]
summary: priors, likelihoods, posteriors, and a small worked example
---

## the rule

bayes' theorem in one line:

```
p(h | d) = p(d | h) · p(h) / p(d)
```

- `p(h)` — prior, what you believed before
- `p(d | h)` — likelihood, how the data behaves under the hypothesis
- `p(h | d)` — posterior, what you believe now
- `p(d)` — evidence, a normalising constant

## a small example

a test for a rare disease has 99% sensitivity and 99% specificity. the disease affects 1 in 10,000 people. you test positive. how worried should you be?

- prior: `p(disease) = 0.0001`
- likelihood: `p(positive | disease) = 0.99`
- false positive rate: `p(positive | healthy) = 0.01`
- evidence: `0.99 · 0.0001 + 0.01 · 0.9999 ≈ 0.0101`
- posterior: `0.99 · 0.0001 / 0.0101 ≈ 0.0098`

less than 1%. the prior dominates.

## intuition

a noisy test on a rare event is mostly noise. the more skewed the prior, the more confident the test must be to overturn it.

## why it generalises

every belief update — a/b test results, model weights, a doctor's diagnosis — has the same shape. you start somewhere, you see something, you move proportionally to how surprised you are.
