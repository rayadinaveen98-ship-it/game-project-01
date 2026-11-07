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
