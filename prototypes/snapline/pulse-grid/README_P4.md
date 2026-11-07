# Snapline Sprint — P4 Practice + QA hardening (v0.4.0)

**Current stage:** Controlled browser prototype, not a released game.
**Owner-approved visual language:** Pulse Grid (midnight / mint / coral).
**Playable:** `standalone.html`, self-contained, offline, no account or paid API.

## What P4 adds

- Optional **Course 03 · Patrol Crossing** in Mode B (Snap & Redirect) only. This is a **practice lesson**, not part of the two A/B-comparable courses.
- The faint dashed guide suggests a route that *will collide* with the moving patrol if left unchanged. A timely one-time snap **to the right** can save it. This behavior is verified by a deterministic simulation test, not a claim about every possible drawing.
- Course header, progression, result label, Next Course navigation, and Help distinguish Course 03 from the two common courses.
- A short prompt during the run explains when to tap SNAP. The paused snap gesture preserves the current runner position and consumes only a valid forward-route correction.
- Seven new tests cover course parity, real crossing outcome, successful snap rescue, late-snap failure, invalid edits, seeded snap invariants, and impossible replay events. Total **22 tests**.

## Test the lesson

1. Open the HTML and select **B — Snap & Redirect** on Home.
2. Tap **LET'S PLAY**, then choose **03 ★** using the course dropdown (or finish courses 01 and 02 to reach the practice).
3. Follow the faint dashed guide: start S, bend around the bottom to the right, end at F. Tap GO.
4. When the runner starts heading upward, tap SNAP. Drag the glowing anchor toward the **right**, then release. The paused preview must show a valid route.
5. The result should display **PRACTICE 03 / PATROL CROSSING**, actual ink, elapsed time and attempts.
6. Try restarting without a snap to discover why the patrol is dangerous.

## Testing and constraints

- `npm run check`: strict TypeScript build plus Node tests (22/22 passed locally).
- `node scripts/make-single-html.mjs`: rebuild offline HTML. Source and standalone must stay identical after generation.
- Desktop Chromium Playwright: practice touch path, snap, success (passed).
- Chromium mobile **emulation**: 360×800, 390×844, 412×915 synthetic finger strokes, snap and success (passed); these are not physical devices.
- The owner accepted P3 generally; **P4 physical Android testing is pending**.
- No production A/B winner, final monetization, live hosting, APK or performance benchmark is claimed.
- Optional C / Live Drawing remains an unbuilt idea; it was not introduced in this P4 QA pass.

## Layout and art policy

The Pulse Grid palette, home and success composition, existing courses and collision code are deliberately unchanged. The guide is faint and **not** collision geometry. New controls stay inside the approved screen system, with no style reinterpretation.
