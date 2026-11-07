# GP-01 — Concept discovery validation protocol (proposed)
**Version:** 0.2.0 · **Status:** Not run. No testing data exists.

## Objective
Move from eight unvalidated pitches to three distinct hypotheses, then one concept worth building, using user evidence rather than genre popularity.

## Gate D1: benchmark & differentiation audit
For each shortlisted idea, collect **five concrete comparators**:
1. 2 closest direct games (same core input/problem), 1 genre leader, 1 smaller indie, 1 recently released or poorly-reviewed competitor.
2. Capture store links, current platform availability, price, monetization, review counts and review complaints, screenshots and concise gameplay loop, dates checked.
3. Compare our key mechanic and reward system side by side; reject if the difference is merely theme/name/color.
4. Note copyright and trademark risk; no existing game artwork, maps, assets, music, or text become shipping assets.

**Exit:** direct competitor evidence sufficiently detailed for 3 concepts; unmet evidence stays OPEN.

## Gate D2: five-second concept comprehension
- For every shortlisted hypothesis, prepare one static, original schematic plus one short animated explanation with no marketing exaggeration.
- Recruit 8–12 first-time viewers per hypothesis (small qualitative sample, not representative statistically).
- Show 5 seconds; ask: "What does the player actually do? What outcome are they seeking?"
- Suggested directional criterion: at least 2/3 can explain the central action and goal without hints.
- Record exact answers and confusion. Don't claim product-market fit from this test.

## Gate D3: low-fidelity paper and clickable playtests
- Create the simplest possible input → consequence → reward interaction, with no shop/meta and no elaborate effects.
- At least 5–8 first-time testers per retained concept.
- Observe time to first correct action, voluntary retry, frustration, comprehension of failure, first-session duration, accessible play without audio (where applicable).
- Predefine tests and rejection criteria in advance; e.g. majority can act without tutorial; majority voluntarily replay; no blocking confusion in basic interaction.
- Preserve anonymized notes and record videos only with consent.

## Gate D4: genuine playable prototyping (after concept narrowed)
- Build a minimal game interaction to test the core fun hypothesis. Temporary shapes are allowed only for mechanic validation; not considered final visual quality.
- Separate visual vertical-slice gate must prove the exact assets/styles in-engine, on device, before scaling.
- Run instrumented cohort-based retention only after a working distributed build and consent-compliant analytics; no fake estimates.

## Scoring and decision
Reuse the already-approved framework only as a proposed scoring method (still subject to product-owner approval):
- **Creative quality — 50%:** fun potential 25, differentiation 15, art feasibility 10.
- **Business/execution — 50%:** feasible production 20, discovery/marketing 10, revenue compatibility 10, risk/cost safety 10.
- Five-point scores are entered into `10_Concept_Scorecard.csv` only when supported by direct evidence, not model intuition.
- Every score must state source/review, confidence (low/medium/high), and uncertainty; tie or narrow lead means conduct a test rather than guess.
- The product owner authorizes one concept. Formal approval locks its genre, core mechanic, MVP scope, player, control scheme, art direction **as separate decisions**.

## Monetization experiment (later)
Evaluate ad tolerance, willingness to pay for content, and comfort with fairness through real user responses. Revenue benchmarks are inputs, not promised outcomes. No ads/IAP integration during early mechanic tests.

## Shipping and platform gate (independent of concept)
Prove reproducible remote APK export plus Play AAB compliance (API36), signing key management, actual install and device tests. Publishing account fee and personal-account testing requirements must be verified when release distribution is chosen.