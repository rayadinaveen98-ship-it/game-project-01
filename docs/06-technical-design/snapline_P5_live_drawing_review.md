# GP-01 / P5: Third mechanics hypothesis — Live Drawing

**Owner feedback:** P4 reported "all good", authorized proceeding. This is a positive acceptance report, not a scientific playtest sample.

**State:** Mechanic C implemented for **comparison**, not approved as final. Visual direction remains Pulse Grid; the previous two mechanic modes remain available.

### Mechanic C: What changed
- Finger or mouse starts at S and draws the trail.
- Runner launches automatically after 85 world-unit trail length; GO and SNAP are hidden.
- While running, append to the same trail; old vertices and runner position never change.
- Lift and rejoin at the mint endpoint to continue.
- Wall crossings, off-board vertices and ink overflow are rejected before committing.
- Reaching an incomplete endpoint gives 90 deterministic 120Hz steps (0.75 seconds) to extend. Hazard movement continues during the grace window.
- Hitting F with a continuous legal route completes the stage through the original collision engine and live metrics.

### Commercial/creative question
Does drawing while the avatar moves produce greater momentum and a stronger repeat impulse than route planning (A) or one-time rerouting (B), or does it overload a single thumb?

### Comparison cautions
- A and B are plan-and-replay; C is a continuous manual-action loop. Raw completion times, retry counts and success rate are not directly fair across modes without controlled training and exposure.
- Our C mode currently has no dedicated beginner course. Its 0.75-second catch-up rule is a *test variable* and may be too harsh; don't finalize without actual player observations.
- Existing B-only Course 03 must not be included in A/B/C cross-mode outcome comparisons.
- The current test has only two shared levels; more content would be a vertical slice expansion, not included here.

### Player evaluation study (proposed)
Blind first-time users can try A/B/C in counterbalanced sequences across the same base course (or matched versions of equal challenge), with uncoached first-action comprehension and short practice. Record first legal interaction, number of restarts, failure fairness, voluntary retry, and comments on the mode's feel. Keep raw responses, no invented results. Sample counts are exploratory, not statistically sufficient for product claims.

### Technical QA record
- 28 automated tests passed (P1–P4 plus 6 new C tests).
- Desktop and 360/390/412 phone-size Chrome synthetic-touch tests passed.
- Lift-and-rejoin and automatic end-of-trail fail passed in browser.
- Baseline A full run and B snap-rescue regressions passed in desktop and emulated mobile Chromium.
- Physical Android phone test **not yet completed** for P5; no measured FPS or multi-hour stability.

### Follow-up
User selects/compares modes after real phone test. Then either improve dominant mechanic, tune tutorial/difficulty, or run external unfamiliar-player study. **Do not replace any approved art or start monetization yet.**