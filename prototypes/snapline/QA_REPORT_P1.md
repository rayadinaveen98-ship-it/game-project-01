# P1 Mechanics Test — Engineering QA Report

**Date:** 2026-11-07 | **Version:** 0.1.0 engineering spike | **Stage:** Not approved as final art or production game

## Completed local verification

- TypeScript strict compilation using TypeScript 5.8.3: **PASS**.
- Ten independent unit tests: **10/10 PASS**, including swept collisions, point interpolation, route validation, deterministic replay, and two safe playable routes.
- Chromium headless desktop test: valid mouse stroke, GO, successful static course, reset, and correctly detected direct-wall collision.
- Chromium **emulated mobile** touch test (390×844, DPR 2): simulated finger stroke to goal, GO tap after touch release, successful course 1 and course 2.
- No JavaScript runtime exceptions during successful combined smoke test.
- Captured screenshots of initial state, drawn route, and success result on desktop and mobile emulation.

## Known caveats

- **Real Android-device test pending.** Mobile emulation is not a substitute for touch latency/device QA.
- Playwright headless emulation exhibits synthetic tap suppression if immediately tapped after a dispatched synthetic drag. Allowing a brief 400ms interval resolves the automated test. This is a **test-environment observation**, not proof that a real Android tap is affected or unaffected. User must verify on phone.
- No benchmarked FPS numbers are claimed.
- P1 covers only static Plan & Run mechanic A. B/C remain proposals.
- Visual effects, character rig, music, sound, art bible and monetization intentionally excluded.
- Current UI is diagnostic and unapproved.
- GitHub Pages configuration is not yet confirmed to be enabled; downloadable HTML works offline without hosting.

## Suggested owner smoke test

On Android, open the standalone HTML in Chrome (Files → Open with browser if allowed) or use the hosted site once verified. Choose Static Detour. Draw from S along the right edge, then up to F. Tap GO, observe a successful run. Reset, draw directly from S to F, tap GO, and confirm the runner visibly collides with a wall. Choose Moving Hazard and test pause/resume. Record device, browser, result and any touch issues.

## Exit gate

P1 implementation: working locally, automated pass. **Owner's real-phone verification pending**. Art style approval and production development are still explicitly blocked.
