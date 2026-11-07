# Snapline Sprint — P3 Gameplay Expansion Plan v0.7

**Date:** 2026-11-07  
**Current baseline:** P2.1 Pulse Grid, Plan & Run mode working, approved visually  
**Status:** PROPOSED P3 design, not yet implemented or playtested  
**Decision:** The first P3 experiment is **Snap & Redirect** (B), compared against the existing Plan & Run (A). The Live Drawing (C) variant remains scheduled for a later comparative feasibility check; it is not silently dropped or merged into B.

## Why this is the next step
The owner accepted the clean/premium Pulse Grid design. Visual polish cannot by itself differentiate a path-drawing arcade game. Existing products already use drawn bridges, ink budgets and hazards. P3 tests whether **a single player-controlled mid-run reroute** adds meaningful decisions and replay desire without turning the game into unpredictable gesture chaos.

## The experiment: one meaningful correction
Player-facing promise: "Draw the path. Start the run. Snap one point to redirect around a changing hazard."

### Exact proposed sequence
1. Same Home→Course interaction as P2.1. Select A (control) or B (experiment) only via a small internal test selector, not the final commercial UI.
2. Draw a valid route from S to F. Show the route in approved mint style, ink budget and projected safe corridor with the same readable hazard shapes.
3. Press GO. Runner starts moving at a fixed 120Hz simulation step as in P1.
4. Mode B shows a **single movable anchor** placed on a segment *ahead of the runner*. The player can drag the anchor once, using a large enough touch target and a live preview.
5. During the drag, **simulation pauses** to avoid a fast runner travelling while the thumb obscures a hazard; runner stays at its current position. The preview path updates from runner's current point via edited anchor to the original forward route.
6. Invalid edits (through wall, over ink limit, beyond allowed anchor region, or that require a backward discontinuity) are flagged without consuming the snap. Releasing a valid edit commits it and consumes the single snap.
7. Simulation resumes from the **same physical runner position**, with the route before that position frozen. No teleport, instant relocation or retroactive collision.
8. Outcome uses existing exact swept collision detection; player can see why success or failure happened. Reset restores the original course and one available snap.

### Implementation constraints: prevent unfairness and fragile replay
- Runner always advances along a continuous world-space polyline. A snap only changes **untraversed** geometry, never already-completed segments.
- At commit, calculate a new future path starting at current runner coordinates; do not simply rewrite the full path while continuing with the same normalized percentage.
- Use fixed simulation step and seeded hazard phases. A route + snap action recorded with a simulation tick and target point reproduces the same outcome.
- Keep graphics and hitboxes aligned (the route preview is the collision route).
- Touch action must not scroll the document; cancel gestures cleanly on pointer cancel, page hide and focus loss.
- A snap cannot silently push the ink gauge into negative values. Validation must show length delta visibly.
- No timer pressure while dragging in the first version; consider real-time drag only after testing.
- The anchor control must have an accessible pointer/tap alternative or larger hit zone to avoid tiny-thumb targeting.

### Fair control comparison A/B
- Same P2.1 art palette, runner, speed and collision engine.
- Same 2 course fixtures; no favorable obstacle positions for B. For novelty demonstration, create **one additional explicitly labeled B-tutorial challenge** where a moving hazard requires mid-run redirection, but exclude it from direct A/B comparative scores if A cannot complete it.
- A remains selectable in developer/test mode and does not regress.
- B success cannot be awarded for bypassing wall collisions or exceeding path budget.

### Out-of-scope for this first B implementation
- New character art or animated storyboards.
- Additional currencies, skins, campaigns, achievements, sound libraries or in-game shops.
- Multiplayer, leaderboards, cloud sync, ads, purchases, accounts or telemetry.
- Native APK/Play Store deployment.
- Automatically shipping this as the final commercial gameplay style.

## P3 deliverables & gates

### P3.1 Geometry/simulation spike
- Route anchor insertion and mutation as a pure TypeScript function.
- Runner-position continuity invariant across edits.
- Ink-length and obstacle validation for edited route.
- Deterministic snap replay fixture: same input seed + action tick + target coordinate → same outcome.
- Tests for anchor behind runner, path crossing wall, exhausted snap, off-board touch, route change with length budget, and pause cancellation.

### P3.2 Working interactive flow
- Actual Pulse Grid HUD with remaining snap icon/status.
- One real drag gesture on mobile portrait, undo or cancel before commit.
- GO→Snap→Resume→Result; errors are explanatory and reset/next controls remain usable.
- Preserved A/Plan & Run mode as baseline.

### P3.3 QA and visual regression
- CI type checks and unit tests; automated Chromium mouse and emulated touch cases.
- Screenshot comparison against the approved P2.1 home/game/result style.
- Viewport checks 360x800, 390x844, 412x915 + desktop.
- Real Android owner test to check thumb accuracy, perceived collision fairness and frame pacing.
- Record actual failures and limitations; never invent real device performance metrics.

### P3.4 Player-facing trial
- Give participants a short A/B task order and record first successful snap, confusion, mis-taps, voluntary retries, and which mode feels better.
- No fabricated samples; if not enough external testers, report as internal dry-run only.
- Decide whether B is worth pursuing. C/Live Drawing is still an independent alternative worth testing if B fails.

## Risk watch
R-P3-01 B is derivative of competing draw-run games; investigate originality and feel.
R-P3-02 Route changes teleport runner; prevent by physically preserving world position.
R-P3-03 Path collision differs from drawn preview; use shared geometry for drawing/simulation.
R-P3-04 Mid-run edits create frustrating time pressure; pause during drag by default.
R-P3-05 Snap anchor too small for one-handed phone play; large touch area and precise preview.
R-P3-06 Additional variant complexity overshadows first-game simplicity; do not expand past the defined single action without user evidence.

## Immediate engineering entry point
Start on branch `feature/snapline-p3-snap-redirect` after design review. Reuse existing P2.1 TypeScript modules under `prototypes/snapline/pulse-grid/`. Add source, deterministic fixtures, tests and real browser captures. Do not replace approved styles or rewrite the P1 collision core without strong evidence.

### Release boundary
P3 is a **playable prototype iteration only**. Production-ready and native Android assertions require later build and real-device gates.
