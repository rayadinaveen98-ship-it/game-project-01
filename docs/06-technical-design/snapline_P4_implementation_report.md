# Snapline Sprint — P4 verified results

**Date:** 2026-11-07
**Build:** v0.4.0 / P4 Practice + QA hardening

## Passed locally

| Area | Result | Evidence |
| --- | --- | --- |
| Strict TypeScript compiler | PASS | `npm run check` |
| Node deterministic geometry/simulation/snap unit tests | **22/22 PASS** | `qa_p4_tests.log` |
| Practice guide is a valid route | PASS | `p4_practice.test.mjs` |
| Guide without snap collides with moving patrol | PASS | deterministic simulation |
| Same guide with timely rightward snap reaches finish | PASS | deterministic event replay, tick 210 |
| Same guide with late snap still collides | PASS | deterministic event replay, tick 260 |
| One correction preserves runner position/tick | PASS | baseline and new tests |
| Seeded random target fuzz (480 targets) | PASS | all accepted snaps preserve run and ink invariants |
| Desktop actual browser run | PASS | Playwright / Chromium, 1050×950 |
| Mobile Chromium emulation | PASS | synthetic touch at 360×800, 390×844, 412×915 |
| Baseline Plan & Run A regression | PASS | separate desktop-emulation 390×844 browser script |
| No horizontal overflow in the 4 verified viewports | PASS | browser assertions |

## Observed browser automation limitation

An immediate synthetic tap following a CDP-injected finger drag was sometimes ignored. The test script now waits 450ms after synthetic touchEnd before tapping GO; the next simulated touch interactions work. **This is an emulation harness timing issue, not evidence of a real Android bug.** A full combined process occasionally exceeded its tool timeout after all four B scenarios passed; the baseline A regression was therefore run separately and passed. Claims are limited to the individual successful scenarios.

## Known gaps / do not overstate

- No measured 60 FPS on real devices, no energy/battery profiling and no physical Android screenshot for P4.
- No independent new-player feedback or A/B preference comparison.
- One tutorial path is proven rescue-capable, but arbitrary user traces can have different outcomes; that is legitimate gameplay.
- The practice course is **B-only** and excluded from direct A/B difficulty comparisons.
- No live deployed URL, Android APK, monetization, external analytics or social system.

## Next gate

1. The owner tests Course 03 on a phone and reports whether the snap cue is understandable and touch target is comfortable.
2. Fix any real-phone input/feedback bugs.
3. Evaluate A/B play appeal with at least 5–8 independent first-time players, with original courses 01 and 02 common to both.
4. Only then decide whether to deepen B, test C/Live Drawing, or move toward a 6–8-level vertical slice.
