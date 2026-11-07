# Snapline Sprint — P1 implementation report

**Project:** GP-01 | **Date:** 2026-11-07 | **Status:** IMPLEMENTED LOCALLY, OWNER DEVICE VALIDATION PENDING

## What was actually built
- One functioning Plan & Run variant (A), browser-first TypeScript + Canvas 2D.
- Pointer capture for desktop mouse and emulated mobile touch strokes.
- Two test courses: static detour and moving hazard.
- Runner follows the exact drawn geometric route at fixed speed using 120Hz fixed-step simulation.
- Swept collision for circle-vs-axis-aligned walls and relative swept circle-vs-moving hazard.
- Ink budget, explicit invalid route feedback, deterministic run results, pause, reset, victory and specific collision reason.
- One offline standalone HTML file containing all code and CSS inline. No game engine installation needed to open it.
- Source and generated demo in [prototypes/snapline](../../prototypes/snapline/README.md).

## Validation evidence (locally completed)
- TypeScript 5.8.3 strict compilation: PASS.
- Built static artifact without third-party runtime libraries: PASS.
- Node unit tests: 10/10 PASS.
- Chromium automated desktop smoke: route drawing / win / reset / failed direct-wall collision: PASS.
- Chromium Android-sized **emulation**, 390×844 at DPR2: synthetic finger input / GO tap / 2 wins across 2 courses: PASS.
- Browser page JavaScript exceptions observed in the successful smoke: none.

## Caveats and risk
- Mobile results are browser emulation, **not a physical Android device**.
- No claimed FPS measurement or real-device input latency benchmark.
- Chromium headless automation exhibited synthetic-tap timing interference immediately after a synthetic touch drag; adding 400ms between synthetic gestures resolved the test. This is a test harness observation, not a verified phone defect or a guarantee.
- Only first mechanic A is implemented; B and C remain planned.
- Neutral diagnostic UI is neither a final game aesthetic nor an approved mockup.
- No APK, approved art assets, monetization, player retention, or public hosted browser link verified.
- Build CI checks to be inspected after PR.

## Next gates
1. Owner opens offline HTML in browser on phone and reports exact device/browser and issues.
2. Owner reviews three original visual directions as comparable mockups before art implementation (Issue #9).
3. Decide whether to implement A/B/C within a common control interface (Issue #10).
4. Prove public Pages deployment independently before promising a hosted URL.
5. Fix any actual phone blockers before progressing from P1 to P2/P3.

**Decision boundary:** This P1 technical experiment does not set Godot/Unity choice, final game's mechanic, or production style.
