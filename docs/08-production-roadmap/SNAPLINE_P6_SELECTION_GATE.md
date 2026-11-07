# Snapline Sprint — P6 mechanic selection and vertical-slice gate

**Date:** 2026-11-07  
**Status:** PLANNED, NOT EXECUTED. No winning mechanic yet.  
**Owner:** Game project product owner  
**Baseline:** Pulse Grid P2.1 visual direction accepted. A / Plan & Run, B / Snap & Redirect and C / Live Drawing all playable; P5 merged to main, 28 automated tests and six PR CI workflows passed.

## User feedback and interpretation
Following P5, owner: "all good bro whats the next step now". Positive feedback allows next phase planning but does **not** specify preferred A/B/C mechanic or establish independent player enjoyment, real-device FPS or market traction. Do not attribute a winner to the owner.

## P6 outcome
Decide whether A, B, C, or an intentionally simplified variant should become the core of an expanded **6–8 level vertical slice**, using direct owner feedback and a small, honest external first-time-player comparison.

**A full game, engine migration, APK, paid content and monetization are not automatically approved.**

## Part 1 — Owner phone comparison (about 10–15 minutes, flexible)
Use existing P5 build and the same two shared courses (01 Static Detour, 02 Moving Gate) in all three modes. Exclude B-only Course 03 from comparative scores, since A and C do not have it. Optional B practice is allowed separately to learn how snapping works.

1. Play A on Courses 01 and 02. Note satisfaction, control fairness and voluntary extra attempt.
2. Play B on the same two courses. Observe whether the SNAP moment is meaningful and comfortable.
3. Play C on the same two courses. Note whether thumb-drawing pressure feels fun, exhausting or unresponsive.
4. If practical, repeat in reversed mode order to reduce first-play/order effects.
5. Record **not necessarily numeric** judgments:
   - Most fun to repeat?
   - Most clear without instructions?
   - Most natural on phone?
   - Which single moment felt memorable or frustrating?
   - Any collision that felt unfair?
   - Preferred next iteration and why?

Avoid demanding a rating just to produce a number.

## Part 2 — Small unfamiliar-player test (if available)
- Aim for 5–8 distinct first-time testers for short play sessions, with 8–12 brief first-impression exposures where practical. Exploratory evidence, not representative statistical proof.
- Anonymous participation, consent, no PII or photos. No simulated test subjects.
- Counterbalance A/B/C order (ABC, BCA, CAB). Same shared two-course fixtures; give equivalent brief instruction and equal practice, particularly for C's live-trail behavior.
- Record first legal action, hint count, comprehensibility, perceived fairness, voluntary retry and direct quotations. Track number of participants per mode, not just percentages.
- Do **not** compare raw course completion times as though A/B/C involve identical work; compare qualitative motivation and perceived agency as well.
- When B tutorial Course 03 is used, label it B practice not comparable testing.
- There is currently no actual external tester dataset.

## Part 3 — Engineering productization feasibility check
- Profile 60 FPS target and input latency on physical Android (only actual measurements count).
- Ensure stable touch gestures, correct pointer cancellation, readable interaction targets, consistent visual/collision geometry and state transitions.
- Inspect small-screen portrait gameplay and consider screen sizes, aspect ratios, pause/retry state, reduced motion and colorblind differentiation.
- Art bible consistency: approved Pulse Grid palette and controls remain the default; any major screen change requires owner review.
- Record level authoring time and QA for 2 new candidate levels. Do not assume generating many levels is cheap.
- Review game differentiation against existing line-drawing products. Choose distinctive mechanics by player evidence, not by naming.

## Decision rubric (qualitative, no fabricated weighted score)
Compare:
1. Core fun / spontaneous replay
2. Control clarity and perceived fairness
3. Differentiation and expressive decision-making
4. Content/level scalability and engineering cost
5. Mobile touch accessibility and visual consistency
6. Potential long-run monetization fit, **without assuming downloads or revenue**

50% creative quality and 50% commercial feasibility remains the overall product objective. Weighting a detailed score requires real data and explicit owner decision. Underlying empirical evidence belongs in raw observation notes.

## If one mode passes the gate
Develop a **vertical slice, not full game**:
- 6–8 authored and tested levels with intentional difficulty curve
- first-play tutorial that teaches actual mechanic
- polished feedback for win/loss, pause/retry
- basic accessible input and reduced-motion choices
- actual screenshot-based art fidelity checks and performance benchmarks
- playable browser distribution; separately investigate optional Android APK build and requirements
- no ads, purchases or user accounts in the vertical slice

## If none passes
Address specific mechanic flaws and repeat a smaller test; do not build dozens of levels or add monetization to disguise a weak core loop.

## Immediate next actions
- Owner states which mode felt best (A, B, C or mixed and why), ideally after testing all three on the phone.
- Engineering owner documents owner report and any actionable bug evidence without embellishing.
- Run small external usability check if feasible, then present a go/no-go proposal for one 6–8-level vertical slice.
- Only after the owner approves that direction begin the next gameplay production branch.

## Current truth
P5 mechanics implemented: YES. GitHub CI on P5 merged PR: PASS. Physical Android measured hardware performance: NO. Unfamiliar player test: NO. Core gameplay mechanic selected: NO. Monetization verified: NO.
