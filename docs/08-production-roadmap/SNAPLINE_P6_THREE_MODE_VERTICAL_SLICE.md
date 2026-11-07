# Snapline Sprint — P6 three-mode vertical-slice production plan

**Date:** 2026-11-07 | **Status:** Approved concept direction / detailed implementation scope proposed  
**Source:** [DEC-025](../decision-log/DEC-025-snapline-three-distinct-modes.md)  
**Baseline:** P5's A/B/C HTML playable with approved Pulse Grid. 28 automated tests and 6 PR workflows passed as of P5; no outside player study or verified physical FPS.

## What we are building
**One premium-looking game with three distinct gameplay experiences**, not three separate games or a selection tournament:
- **A / Plan & Run — Think:** assess course, draw once, press GO, learn from the attempt, retry.
- **B / Snap & Redirect — Adapt:** draw, press GO, use one paused anchor snap to handle a hazard, retry.
- **C / Live Drawing — React:** draw live while the character moves, reconnect at the line tip; practice anticipation and flow.

### User experience requirements
- Home screen displays three equal-status mode cards with concise goal, action and difficulty **description**, without guessing difficulty rankings.
- One-tap mode selection; all accessible from the start. Never silently switch modes between levels.
- Each mode has its own tutorial/onboarding and course progression. Existing independent game rules stay intact.
- Same Pulse Grid art direction, same core buttons and familiar result layout. Distinguish modes with concise text/iconography, not arbitrary new color themes.
- Clear retry and level completion; return to Home or mode course selector. In-slice progress can be **local-only** with reset; do not require account, cloud sync or permissions.
- Readability on 360×800, 390×844 and 412×915 plus desktop; phone QA is separately required.

## Content budget that avoids tripling effort

Proposed **8 distinct course definitions** for a bounded vertical slice, yielding **12 mode-course playable combinations** (shared courses each played in all 3 modes):

| Content ID | Mechanic / role | Status | Notes |
|---|---|---|---|
| Shared 01 — Static Detour | A/B/C, 3 combinations | EXISTING | First generic route challenge; QA all modes |
| Shared 02 — Moving Gate | A/B/C, 3 combinations | EXISTING | Hazard timing comparison; mode-specific instructions |
| A 01 — Planning Basics | A only, 1 combination | NEW | Introduce drawing, GO, wall/ink clarity |
| A 02 — Efficient Detour | A only, 1 combination | NEW | Show trade-off of budget versus obstacles |
| B 01 — Patrol Crossing | B only, 1 combination | EXISTING | Optional B snap practice, do not score against other modes |
| B 02 — Second-Chance Timing | B only, 1 combination | NEW | New hazard arrangement testing snap choice |
| C 01 — Keep Ahead | C only, 1 combination | NEW | Teaches moving tip, rejoin and initial generous pacing |
| C 02 — Continuous Flow | C only, 1 combination | NEW | Simple live timing and gentle moving hazard |

Total: 2 shared + 6 mode-specific definitions = **8 unique**, **5 new** authored definitions (3 already exist). Across all modes: 2×3 + 6 = 12 playable combinations. This is a target, not an assertion levels are built or playtested.

**Course content principle:** common-course comparisons are useful diagnostics, but each mode also needs bespoke levels that demonstrate its unique decision-making. Maintain deterministic replay/solvability and no false collisions. Do not fabricate course difficulty ratings or estimated playtime.

## Engineering architecture
Keep `prototypes/snapline/pulse-grid/` as the current baseline while shaping a modular codebase. Refactor only where necessary; do not rewrite stable collision code.

```
game/
  core/           shared fixed-step runner, geometry, seeded obstacles, validation
  modes/
    plan-run/     route preparation, GO, retry
    snap-redirect/ pause, forward anchor, one-snap usage, resume
    live-drawing/ append-only line, auto-launch, grace, reconnect
  content/        immutable course fixtures and supportedModes metadata
  progress/       local-only best results by mode+course and reset
  shell/          three-mode selection, HUD, help, result, navigation
  theme/          Pulse Grid tokens, accessibility, animation constraints
```

This is logical organization, not a claim that directories/files already exist. Preserve existing TS/Canvas build unless compelling data requires a new engine.

## Production sequence (P6.1–P6.5)

**P6.1 — Shared mode architecture and course catalog**
- [ ] Define stable mode IDs `plan`, `snap`, `live`.
- [ ] Give every course explicit `supportedModes`, tutorial flag, and deterministic configuration.
- [ ] Keep common simulation and collision behavior identical; do not break existing P1–P5 tests.
- [ ] Add source-level tests that disallowed modes cannot enter B-only courses and that progress keys are mode-isolated.

**P6.2 — Three-mode UI and local progress**
- [ ] Three polished, equally discoverable mode cards in Home, each with a simple goal.
- [ ] Dedicated mode course list and concise instructions, without unsolicited new settings.
- [ ] Local-only best results per (mode, course), reset option and safe migration for prototype progress.
- [ ] Back, pause, retry, next actions preserve selected mode; user is never switched automatically.
- [ ] Respect approved visual tokens and owner screenshot signoff on significant UI additions.

**P6.3 — Five bounded new levels**
- [ ] A tutorial and a second A signature level.
- [ ] B second snap-specific signature level, after existing B practice.
- [ ] C tutorial and C second signature level.
- [ ] Solver/fixture-based tests, seeded timing, ink budgets, content authoring/QA time recorded for every new level.
- [ ] Ensure tutorial is skippable, and replay never consumes currency or ads.

**P6.4 — Hardening**
- [ ] Tests for path/collision determinism, timers, pointer cancellation, pause/focus loss, progress persistence, Android viewport rendering.
- [ ] Actual phone/browser smoke and performance measurements clearly separated from emulation.
- [ ] 0 known blocker crashes and no unfair collision, color-only feedback or layout clipping.
- [ ] Screenshots compared to approved P2.1 Pulse Grid; accessible touch targets and reduced-motion consideration.

**P6.5 — Human gameplay evaluation and owner go/no-go**
- [ ] Owner tests new A/B/C content on physical phone.
- [ ] Optional 5–8 unfamiliar-player exploratory study per mode as practical; count actual people honestly.
- [ ] Observe whether each mode is clear and worth replaying. Do **not** choose a single mode unless owner later requests it.
- [ ] Agree on future level count, costs, optional sound and commercial model only after the slice proves itself.

## Quality and risk gates
- **Architectural complexity:** 3 modes could become 3 diverging codepaths. Mitigation: shared geometry, deterministic engine and common UI shell.
- **Content cost:** 6–8 levels per mode would overexpand. Mitigation: eight unique scene fixtures total, five newly authored.
- **Onboarding confusion:** users may not understand differences; concise three cards and one tutorial per mode.
- **Accidental mode leakage:** GO/SNAP not visible in C; SNAP one-time in B; A route freezes while running.
- **Performance:** touch sampling, fixed-tick simulation and rendering checked on real phone later; no assumed FPS.
- **No revenue evidence:** monetization/distribution still separate. No ads, paywall or account in vertical slice.

## Explicitly excluded
Native APK, Play Store account/signing, multiplayer, 50+ levels, character shop, leaderboards, cloud sync, real-time analytics, paid asset libraries, social sharing and gameplay economies.

## Definition of P6 complete
A functional browser vertical slice with all three working modes, eight verified course definitions (twelve mode-course combinations), mode-specific onboarding and local-only progress, approved visual continuity, CI passing, actual device owner acceptance, and recorded evaluation feedback. Otherwise report partial status accurately.

## Current state
P5 3-mode prototype: IMPLEMENTED. P6 architecture/content expansion: NOT STARTED. Eight-level target: PROPOSED. Physical phone performance benchmark: NOT RECORDED. First-time-player study: NOT PERFORMED.

## P6.2 implementation addendum — November 7, 2026
- [x] Implement three distinct A/B/C first-run, three-step contextual tutorials with one shared Pulse Grid dialog.
- [x] Provide persistent HOW TO PLAY on mode course list and in Gameplay; show once per mode unless reopened.
- [x] Save guide viewed/skipped separately from actual course-win records; guard malformed/stale storage values.
- [x] Pause when opening Help mid-run; keyboard Escape and focus controls supported for dialog.
- [x] 40/40 Node tests (34 P6.1 + 6 new), responsive Chromium desktop and 360/390/412 phone-emulation checks, separate B snap regression locally passed.
- [ ] GitHub CI merge and owner screenshot/physical device review.
- [ ] True origin-owned storage and screen-reader acceptance checks.
- [ ] Five new course definitions in P6.3 and expanded content QA.
**Status:** P6.2 implemented for review, not an approved final release; no new levels beyond original three.

## P6.3 code milestone — November 7, 2026
- [x] Built A Planning Basics and A Efficient Detour.
- [x] Built B Second-Chance Timing with a distinct hazard and an authentic leftward snap rescue solution.
- [x] Built C Keep Ahead and C Continuous Flow with continuous-live-trail tested solutions.
- [x] Eight unique course definitions and twelve mode-course assignments with explicit ordering and navigation.
- [x] All old results use the same local progress key; new results scoped by mode and course.
- [x] Local TypeScript and 48/48 Node regression tests; desktop and touch-emulated browser interaction runs pass on new content.
- [ ] Independent GitHub workflow verification/merge.
- [ ] Physical Android owner testing, touch comfort and progression/difficulty feedback for the five added courses.
- [ ] P6.4 accessibility, input/pause/resume and real-device performance polish.
- [ ] P6.5 unfamiliar-player feedback, monetization feasibility and go/no-go.
**Do not call the entire vertical slice completed** until physical-device acceptance and user study gates are considered. [P6.3 QA report](../06-technical-design/snapline_P63_course_qa_report.md).

## P6.4 input reliability implementation — November 7, 2026
- [x] Pure typed interruption policy and 11 new unit tests; 59/59 automated Node tests including prior P1–P6.3 pass.
- [x] Android-browser pointercancel and unexpected lost capture recovery; A/B planned draft discarded, C validated live trail preserved and runner paused.
- [x] B preview edit cancelled when tab loses focus without spending the one SNAP; frozen runner resumes from the same tick.
- [x] Help while actively drawing revokes pointer capture; late pointerup cannot add a hidden segment.
- [x] Browser mouse and synthetic mobile-touch interruption regressions, C rejoin-to-win, A blur pause-to-win and prior A/B/C gameplay regression passed locally.
- [x] Clarify browser-local storage caveat in the course menu; existing results untouched.
- [ ] Independent GitHub CI and merge.
- [ ] Physical Android background, touch input and FPS validation, authentic browser-origin progress persistence, accessibility QA and owner acceptance.
No additional course content, art redesign, accounts or monetization. [P6.4 QA report](../06-technical-design/snapline_P64_reliability_QA.md).
