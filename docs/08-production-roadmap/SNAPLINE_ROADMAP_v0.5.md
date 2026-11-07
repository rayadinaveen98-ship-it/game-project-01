# Snapline Sprint — first prototype roadmap

**Approved:** C08 selected as GP-01's FIRST PROTOTYPE. C09 girl adventure deferred to concept library.
**Not approved:** commercial release, final mechanics, art style, native APK, title, full game scope.

| Gate | Deliverable | Exit criteria | Status |
|------|-------------|---------------|--------|
| P0 | Prototype brief / variants / risk register | Scope agreed; development bounded | PLANNED FOR REVIEW |
| P1 | Unskinned drawing+runner feasibility spike | Pointer draw, deterministic follow, collisions with tests | NOT STARTED |
| P2 | Three art concepts + sample interactive UI/screenshot comparison | Owner explicitly approves visual style | NOT STARTED |
| P3 | Browser build with A/B/C mechanic modes on 2 comparable courses | Working on desktop/mobile browsers; reset/failure/success | NOT STARTED |
| P4 | QA and documented real-device testing | Build checks, geometry tests, screenshot fidelity | NOT STARTED |
| P5 | Uninformed player usability and enjoyment tests | Real observations, failures and participation counts | NOT STARTED |
| P6 | Go/no-go to grow to 6–8 level vertical slice | Owner decision based on play evidence and cost | NOT STARTED |

## Dependencies
P0 → P1. P2 can begin after P1 shows that mechanics and viewport are viable; final visual polish after P2 explicit approval. P3 → P4 → P5 → P6.

## Deferred projects
C09 young-girl puzzle adventure remains saved in `docs/03-game-concepts/`; not canceled, no implementation started.
C02-R detective also remains a concept.

No release date or APK claim. Do not broaden the prototype midstream.

## P1 implementation addendum — November 7, 2026
**Engineering build achieved:** TypeScript/Canvas browser prototype, Plan & Run A, 2 courses, collision detection and route input, 10 automated tests passed. Desktop and emulated touch Chromium smoke passed. **Owner's physical Android test is outstanding**, so P1 is **implemented / partially verified**, not formally accepted. P2/P3 remain not started. See [implementation evidence](../06-technical-design/snapline_P1_implementation_report.md).

## November 7, 2026 — P1 accepted; P2 implemented as review lab
The product owner reported the P1 collisions and movement worked perfectly and authorized the next step. P2 original visual comparisons have been built (actual HTML/Canvas) with Home/Game/Result previews for A/B/C on the same P1 engine. They are **pending owner style approval**, not finished production visuals. P2 mechanical QA: 10/10 tests, desktop runs in each theme and mobile emulated touch pass; physical device check pending. [Visual report](../05-art-direction/snapline/P2_VISUAL_REVIEW_v0.6.md).

## November 7, 2026 — P2.1 update
- [x] Owner selected Pulse Grid / A as the **visual direction** (DEC-022).
- [x] Implemented P2.1 real Home/Game/Result/Help browser flow, rather than preview-only Home/Result.
- [x] Produced art bible v0.1 and original browser screenshots for review.
- [x] Local strict build + 10 existing unit tests pass; desktop and 360/390/412-width mobile emulated UI flows pass.
- [ ] Owner signs off final P2.1 screen treatment after viewing screenshots and testing on physical phone.
- [ ] B/C mechanic experiments, art production, hardware profiling and independent playtesting remain pending.
This does NOT authorize full-game production or native APK work.

## November 7, 2026 — P2.1 accepted and next technical gate scoped
- [x] Owner confirmed the refined Pulse Grid visual as sufficiently premium and simple (DEC-023).
- [x] Merge P2.1 implementation and art bible to main after all CI checks passed (PR #14).
- [ ] Start P3 experimental B Snap & Redirect prototype while preserving A.
- [ ] Verify continuity when changing a forward anchor without teleporting the runner.
- [ ] Cross-check geometric route visualization, ink budget, and seeded replay.
- [ ] Capture actual desktop and phone-emulated browser evidence; perform physical phone QA.
- [ ] Evaluate B against A, then revisit C if necessary.
[P3 technical plan](../04-game-design/snapline/P3_SNAP_REDIRECT_PLAN_v0.7.md) · [Checklist](SNAPLINE_P3_CHECKLIST.md).

## P3 B mechanic alpha implementation — November 7, 2026
- [x] Added Plan & Run A/B test selector, preserving approved Pulse Grid screen system.
- [x] One-time pause-and-drag forward anchor, trajectory continuity, valid/invalid path previews, exact ink accounting and reset/cancel.
- [x] Implemented deterministic snap event replay and 5 new unit tests; **15/15 tests pass locally**.
- [x] Local desktop Chromium and touch-based emulated phone tests on 360/390/412 widths passed.
- [ ] CI on GitHub must pass before merging implementation.
- [ ] Owner physical Android P3 acceptance of responsiveness, collision fairness and visual simplicity.
- [ ] External uninformed A/B player comparisons and B-specific tutorial refinement.
- [ ] Live Drawing C experiment, a potential alternative, not implemented yet.
The work is an alpha mechanics prototype; do not claim production completion.

## November 7, 2026 — P4 focused extension
- [x] Preserve P3 A/B implementation and approved Pulse Grid visuals.
- [x] Implement optional B-only practice Course 03 with a clearly meaningful snap rescue and traceable guide.
- [x] Add seven automated tests (22/22 pass locally), deterministic collision/late rescue comparisons and 480 seeded target checks.
- [x] Run interactive Chromium desktop + 360/390/412 emulated-touch exercise and separate A regression.
- [ ] Inspect independent GitHub CI and merge P4.
- [ ] Owner physical phone acceptance of P4 and any touch/guide refinements.
- [ ] Independent first-time A/B game-feel evaluation and C/Live Drawing decision.
The practice course is **not** included in A/B comparison scores. See [P4 report](../06-technical-design/snapline_P4_implementation_report.md).

## P5 Live Drawing comparison alpha — November 7, 2026
- [x] Owner reported P4 good and authorized continued prototype work (DEC-024).
- [x] Add Mode C Live Drawing while retaining approved Pulse Grid design and existing A/B.
- [x] Implement fixed-step moving runner, append-only trail, wall/ink validation and deterministic 0.75s tip grace.
- [x] Add 6 new automated live-geometry/time tests (28/28 total passed).
- [x] Browser test mouse and 360/390/412 CSS-pixel emulated touch; pass.
- [x] Regression test existing A and B modes, pass in automated browser.
- [ ] GitHub PR/CI verification and final merge.
- [ ] P5 physical-phone control and comfort approval.
- [ ] Independent unfamiliar-player comparison for A/B/C, counterbalanced where possible.
- [ ] Product/visual continuity review before expanding to content or monetization.
See [P5 review](../06-technical-design/snapline_P5_live_drawing_review.md).

## November 7, 2026 — P6 pivot: three complementary modes retained
**APPROVED by owner (DEC-025):** A Plan & Run, B Snap & Redirect, and C Live Drawing all remain separately selectable in the ONE Snapline Sprint game. Do not choose or delete a winner as directed by the earlier P6 selection proposal. Preserve approved Pulse Grid design, shared collision engine and existing three-mode P5 baseline.

**New vertical-slice target, pending implementation:** 8 distinct courses total (2 shared across all modes + 6 mode-only, yielding 12 playable mode-course combinations), 5 new course definitions beyond the 3 already present; mode-specific onboarding, local progress, actual phone QA, and small player study. New features and paid systems excluded. [Detailed active P6 plan](SNAPLINE_P6_THREE_MODE_VERTICAL_SLICE.md).

## November 7, 2026 — P6.1 built (pending owner acceptance)
- [x] Stable mode IDs and type-checked course eligibility (A/B/C share 01/02; practice 03 B-only).
- [x] Equal-status mode picker leads to dedicated course list; preserve mode on navigation.
- [x] Best results/win counters stored by mode+course in local browser storage, safe corrupted-data handling and clear results control.
- [x] Actual offline HTML and source; 34 Node tests passing and desktop/mobile-emulated UI smoke with storage shim. Original B snap correction passes.
- [ ] Independent GitHub CI before merging.
- [ ] Owner physical phone test of course navigation, snapping, result and persistent local progress after reopening. Browser-owned storage across real navigation unverified by local environment.
- [ ] P6.2/P6.3 five new course definitions, tutorials and extra content; **not implemented**.
- [ ] External player feedback, physical FPS and Play Store release checks.

## P6.3 new-content engineering milestone — November 7, 2026
- [x] Five additional course definitions (A×2, B×1, C×2); eight total definitions, twelve playable mode-course assignments.
- [x] Dynamic 4-entry course selection and next navigation, accurate titles/results, normal P6.1 isolated progress storage.
- [x] Deterministic solvability tests and real browser checks for all five levels (including B's snap).
- [x] 48/48 Node/TypeScript regression tests locally passed; 360/390/412 CSS px mobile browser emulation passes.
- [ ] Github PR CI and merge; actual device owner review remains pending.
- [ ] P6.4 reliability, accessibility, measured physical performance.
- [ ] P6.5 user study and next product decision.
[QA report](../06-technical-design/snapline_P63_course_qa_report.md).
