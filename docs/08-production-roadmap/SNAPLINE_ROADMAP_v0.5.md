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
