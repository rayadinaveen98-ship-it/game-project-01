# Snapline Sprint — P5 technical QA

**Date:** 2026-11-07

## Actual implementation

- Variant C added in approved Pulse Grid browser game.
- A/B continue to work and their levels / collision rules remain unchanged.
- C auto-launches at ≥85 world units, permits continuous finger input or consecutive strokes joined at trail tip.
- Live trail appends are validated against walls, ink budget and bounds before committing.
- Exact runner position and previous route points remain immutable as the trail grows.
- Reaching an incomplete tip triggers a fixed-step 0.75s grace; collisions and time still advance while stationary, preventing indefinitely frozen hazards.
- C does not display irrelevant GO or SNAP buttons.

## Automated tests

- TypeScript 5.8.3 strict build: PASS.
- Node tests: **28/28 passed** (22 existing plus 6 new C cases).
- New tests include legal/illegal route extension, exact runner continuity, tip-grace failure tick, deterministic replay, and moving hazard collision while waiting.

## Interactive Chromium browser verification

- Desktop 1050×950: Mode C full route, automatic run and real completion result: PASS.
- Android-like mobile synthetic touch at 360×800, 390×844, 412×915: Mode C touch draw and win: PASS at all three widths.
- Secondary-stroke join with mouse (lift at partial route and continue from tip), same attempt and final win: PASS.
- Incomplete route reaches tip and fails with explicit reason after grace period: PASS.
- Prior Mode A full run: PASS.
- Prior Mode B Course 03 mouse/touch snap correction: PASS on desktop + all three phone-sized emulations.
- No JavaScript page exceptions observed in successful C browser cases.
- Representative browser screenshots captured (Home / Active Trail / Real Result) at 390×844.

## NOT verified

- **Physical Android/iOS device** input latency, long-session stability, frame rate or touch ergonomics.
- Real people new to the mechanic (no human study scores, retention or market evidence).
- Third-party competitive novelty and long-term content-production costs.
- C gesture accessibility (limited fine motor control), actual frame pacing under hardware load.
- C versus A/B enjoyment: no user ranking has been measured.

## Verdict

**C mechanic P5 experimental alpha is technically playable in local browser tests.** Full product/gameplay selection is NOT authorized. Next test gate is owner real-phone validation and comparative unfamiliar-player tests of modes A/B/C.
