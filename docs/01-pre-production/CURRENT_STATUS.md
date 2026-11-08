# GP-01 — Current project status

Updated: 2026-11-07 · Repository migration v0.4.1

## Approved
- Professional pre-production and controlled development before coding.
- Product objective: 50% creative quality, 50% commercial viability.
- Continue research without choosing a final concept.
- Owner permits repository to remain public.

## Imported in GitHub
- The 32 original UTF-8 Markdown/CSV research and governance documents from the v0.4 baseline.
- v0.4 structured project state and static puzzle verification records.
- Root repository onboarding/governance files.

## Historical truth
The original v0.4 state file said `game_repository_exists=false` because it predated the GitHub repository. That statement is retained unchanged as a historical snapshot. The live GitHub repository now exists.

## Deliberately not yet uploaded
- The original generated printable PDFs (`31_Concept_Lab_Printable_v0.4.pdf`, `32_Five_Second_Stimuli_v0.4.pdf`).
- The archived v0.1–v0.4 ZIP bundles.

These remain available in the previously supplied v0.4 archive. Avoid claiming GitHub contains the complete binary baseline until binary upload and independent SHA-256 verification succeed.

## Current blockers / next gate
1. Human-facilitated comprehension and paper-play tests have **not** happened.
2. No real player data, independent novelty clearance or monetization validation.
3. Proposed Godot/Android choices have **not** passed a remote build spike.
4. Genre, visual style, title, production scope and monetization are undecided.

## Next documented action
Prepare tester briefing with anonymized form; recruit first-time players; record observations without inventing outcomes. Keep three experimental mechanic families open.

No gameplay programming has begun. No APK exists.

## Concept slate expansion — November 7, 2026 (proposed)
Three user-submitted directions have been analyzed without selecting a game:
- C09: untitled young-girl adventure (NEW proposal)
- C08: Snapline Sprint drawing arcade (REVISITED; title not cleared)
- C02-R: cinematic detective mystery (REVISED proposal; no title approved)

See [Three-Idea Comparative Assessment](../03-game-concepts/2026-11-07_three_ideas_comparative_assessment.md) for mechanic briefs, confirmed competitor overlaps, visual and production risk, business assumptions, and proposed independent gameplay tests. This supersedes **no** approved decision and **does not** change the historical v0.4 snapshot. Human playtesting is still pending.

## Prototype focus shift — November 7, 2026 (DEC-020)
**Approved:** C08 Snapline Sprint is the FIRST PLAYABLE PROTOTYPE and active planning workstream. This **does not** select a shipping game. C09 girl-explorer is postponed for future development, not rejected. C02-R remains in concept discovery.

**Current stage:** Snapline v0.5 pre-production planning. No prototype code, playable link, art approval, APK or completed device testing. Three A/B/C mechanic variants are **proposals**, not locked choices.

- [DEC-020 approved selection](../decision-log/DEC-020-first-prototype-selection.md)
- [Snapline prototype brief](../04-game-design/snapline/PROTOTYPE_BRIEF_v0.5.md)
- [Snapline visual approval gate](../05-art-direction/snapline/VISUAL_REVIEW_GATE_v0.5.md)
- [Prototype roadmap](../08-production-roadmap/SNAPLINE_ROADMAP_v0.5.md)

## Snapline P1 implementation — November 7, 2026
- **Built:** C08 Snapline Sprint browser mechanics variant **A / Plan & Run**. Two course fixtures, static + moving hazards, deterministic fixed-step collisions, direct visual route, one-finger stroke capture.
- **Tested locally:** strict TypeScript build, 10/10 Node unit tests, desktop Chromium smoke, Android-viewport mobile **emulation** with synthetic finger drag and GO tap on both courses. Browser JavaScript exceptions: none observed in successful smoke.
- **Distributed:** self-contained offline `prototypes/snapline/standalone.html` and reproducible source build. **Real phone test still pending.** Hosted Pages link is not yet verified.
- **Remaining:** physical Android smoke test, mockup visual approval P2, variant B/C comparison, wider QA, real user playtest, APK/market proof.
- **Important:** initial P1 mechanic code does not authorize a complete game, final art style, or product launch. [Engineering report](../06-technical-design/snapline_P1_implementation_report.md).

## Snapline P2 visual proposals — November 7, 2026
- Owner confirmed P1 movement and collisions work correctly and authorized progression to P2 (see [DEC-021](../decision-log/DEC-021-snapline-p1-owner-feedback.md)). This is owner acceptance, not independent player data.
- Three **proposed**, original HTML/Canvas visual themes built for the same P1 detour course: A Pulse Grid, B Ink Trail, C Micro Runner. Home/Game/Result direction studies are available.
- Gameplay remains working Plan & Run A. Chromium desktop route+win passes in all three palettes; emulated mobile touch and GO succeeds. Base 10 unit tests pass. **Physical P2 testing and final visual approval are pending.**
- See [visual review report](../05-art-direction/snapline/P2_VISUAL_REVIEW_v0.6.md) and [browser source](../../prototypes/snapline/visual-review/README_P2.md).
- No one theme selected, no art bible locked, no B/C mechanics implemented or APK built.

## Snapline Pulse Grid direction approved — November 7, 2026 (DEC-022)
**Owner chose Option A (Pulse Grid)** for the Snapline prototype and authorized the next visual refinement stage. Ink Trail and Micro Runner remain archival concepts, not active production directions. P2 sample lab is merged from PR #13.

**P2.1 refinement implemented for review** in `prototypes/snapline/pulse-grid/`: actual Home→Game→Result flow, accurate run length/time/attempt values (not mock-up figures), Help overlay, next/retry/home actions, responsive Pulse Grid layout and preserved P1 collision simulation. No final screen-level sign-off yet.

**Tests:** original 10/10 unit tests pass; Chromium desktop Home→Game→draw→GO→Result passes; 360, 390 and 412 width mobile **emulation** runs pass with actual finger trace and Next Course. Physical device P2.1 test and approved layout/screenshots remain pending. See [art bible](../05-art-direction/snapline/PULSE_GRID_ART_BIBLE_v0.1.md) and [visual refinement report](../05-art-direction/snapline/P2_1_VISUAL_REVIEW.md).

## Snapline P2.1 visual acceptance and P3 planning — November 7, 2026
- Owner described the refined Pulse Grid implementation as "premium enough and simple" and asked for the next step. This is documented as [DEC-023](../decision-log/DEC-023-pulse-grid-p2-1-visual-acceptance.md).
- Pulse Grid P2.1 PR #14 passed all three GitHub workflows and was merged into `main` as `3cf50709fea660d00f93e6f47a8f702b52069793`.
- **Active next milestone (proposed):** implement and fairly compare B **Snap & Redirect** with the proven A **Plan & Run** baseline. The third, C **Live Drawing**, remains an option for a later separate experiment.
- See [P3 mechanical plan](../04-game-design/snapline/P3_SNAP_REDIRECT_PLAN_v0.7.md) and [P3 checklist](../08-production-roadmap/SNAPLINE_P3_CHECKLIST.md).
- P3 code has **not started**. No external playtest, physical-device performance certification, native APK or commercial monetization approved.

## Snapline P3 Snap & Redirect alpha — November 7, 2026
**Implemented on P3 feature branch for review:** approved Pulse Grid browser prototype now supports A Plan & Run and B Snap & Redirect. One pause-and-drag forward anchor per B run, validated wall clearance and ink budget, deterministic event tick replay, and the existing 2 comparable courses. Baseline P1 collisions and P2.1 Home/Result remain intact.

**Local QA:** 15/15 Node/TypeScript tests pass. Desktop Chromium mouse B draw→GO→snap→win and baseline A draw→GO→win pass. Chromium mobile **emulation** 360×800, 390×844, 412×915 with synthetic touch drawing and anchor drag passed. The user has not yet run this P3 version on a physical phone; real-world player preference and P3 acceptance remain pending.

[Technical implementation report](../06-technical-design/snapline_P3_implementation_report.md) · [Offline playable prototype](../../prototypes/snapline/pulse-grid/standalone.html). No APK, monetization, hosted Pages URL or commercial concept approval.

## Snapline P3 merge and CI confirmation — November 7, 2026
- The P3 **engineering alpha is now on `main`**, merged from PR #16 as commit `8c5d3c1b9c75f9d6be4ac957e145c85c65e5d746`.
- The P3, P2.1, P1 and documentation GitHub Actions checks all **passed** before merge.
- A Plan & Run and B Snap & Redirect (one paused forward anchor correction) are playable via `prototypes/snapline/pulse-grid/standalone.html`.
- **P3 hardware acceptance remains pending** despite successful synthetic-touch browser emulation. No APK, live Pages deployment, external playtest, monetization, production visual expansion or final mechanics choice claimed.
- Track remaining P3 work in [Issue #10](https://github.com/rayadinaveen98-ship-it/game-project-01/issues/10).

## Snapline P4 practice and QA — November 7, 2026
- The owner reviewed P3 and replied "all good bro continue"; treat this as positive owner feedback, not instrumented device performance or independent user-testing evidence.
- **P4 code implemented on feature branch**: optional **Course 03 / Patrol Crossing** in Mode B only. Guide route intentionally collides with the moving patrol if unchanged, while a deterministic, timely rightward snap rescues the same route.
- Original scored A/B comparison Courses 01 and 02 and approved Pulse Grid visual treatment remain unchanged. Mode A cannot access Course 03.
- Added seven tests (22 total): guided collision, timely rescue, late-snap failure, invalid edits, seeded 480-target fuzz, deterministic replay and baseline parity.
- Locally passed strict TS/Node 22/22 and real Chromium desktop + 360/390/412 mobile **emulation** interactive B correction; A baseline regression passed separately. P4 physical-device approval and independent playtesting still pending.
- **No Live Drawing C, monetization, APK or full-game production approved.** [P4 technical report](../06-technical-design/snapline_P4_implementation_report.md).

## P4 merge verification — November 7, 2026
- The playable P4 prototype is **on `main`**, from [PR #17](https://github.com/rayadinaveen98-ship-it/game-project-01/pull/17) at merge commit `cc28c0e7b350ac2a4a99cb475d3cc74fa4218bde`.
- Five GitHub workflows passed: P4 Practice & QA, P3 Snap, P2.1 Pulse Grid, P1 Baseline, and Documentation.
- Mode B adds optional practice **Course 03 / Patrol Crossing**. Modes A/B retain the original first two fair comparison courses. The owner's P4 physical-device acceptance remains pending.
- Offline playable file: `prototypes/snapline/pulse-grid/standalone.html`.
- Next gate: physical P4 phone verification, then independent A/B comprehension/game-feel study. C / Live Drawing is a separate future prototype option, not implemented.

## Snapline P4 acceptance and C mode comparison P5 — November 7, 2026
- Owner replied "all good" after P4 practice, so [DEC-024](../decision-log/DEC-024-snapline-p4-acceptance-p5-experiment.md) authorizes continued prototyping. This does not independently verify physical phone FPS or usability.
- **P5 experimental implementation on feature branch**: C **Live Drawing**, where the runner automatically launches at 85 units while players extend the trail, pause/rejoin by lifting the finger, and get an exact 0.75-second tip grace period with hazards still moving.
- Modes A/B, their two base courses and B-only Practice Course 03 remain intact and selectable. Pulse Grid style unchanged.
- **Local verification:** 28/28 TypeScript/Node tests pass; desktop + 360/390/412 Chromium mobile-emulated interactive C runs passed; partial-stroke continuation and tip-timeout passed. Separate prior A and B interactive regressions passed. Physical P5 phone QA still pending.
- No mode chosen as the final game, no external player study, no APK, no deployed Pages demo or monetization.
- [P5 mechanics/QA report](../06-technical-design/snapline_P5_live_drawing_review.md).

## P5 merge confirmed — November 7, 2026
- **Snapline P5 with Modes A/B/C is on `main`** from [PR #18](https://github.com/rayadinaveen98-ship-it/game-project-01/pull/18) at merge commit `c291c5cb004c9570aeea9a8d4dbaea9dfbc25a4f`.
- **6/6 GitHub workflows passed** before merge (P5, P4, P3, P2, P1, docs). The offline playable file is `prototypes/snapline/pulse-grid/standalone.html`.
- P5 C mode uses an automatically moving runner, append-only trail, join-a-new-stroke support, and fixed-step line-tip grace with real moving hazard collision.
- **Not complete:** owner's physical phone C controls QA, first-time player comparison A/B/C, final mechanic choice, hardware FPS, and any APK / launch. No commercial or retention evidence.

## P6 core-mechanic evaluation — November 7, 2026
- Owner reported the P5 prototype was good and asked for the next step, **without selecting A/B/C**. This is positive owner feedback but not equivalent to a comparative preference or measured performance.
- **P6 next gate:** compare A Plan & Run, B Snap & Redirect and C Live Drawing on common Courses 01/02. Exclude B-only practice Course 03 from head-to-head outcomes. Ask which mode is most fun, controllable and replayable.
- Document actual physical-phone feel, then conduct unfamiliar-player evaluation if feasible, and only then request explicit approval for a **6–8 level vertical slice**.
- [P6 selection and study protocol](../08-production-roadmap/SNAPLINE_P6_SELECTION_GATE.md).
- No final game mechanic is selected; no expansion/APK/monetization authorized by this P6 document.

## P6 product-direction decision — November 7, 2026 (DEC-025)
- The owner explicitly prefers **retaining A Plan & Run, B Snap & Redirect and C Live Drawing as three distinct playable modes**, not choosing one winner. This supersedes the one-mechanic selection gate.
- **One shared game**, one approved Pulse Grid visual identity, one collision/simulation foundation, with mode-specific instruction and appropriate levels. All modes remain directly selectable.
- The proposed first vertical slice targets **8 distinct authored courses total / 12 mode-course combinations**: 2 shared existing courses across all 3 modes; 3 existing/new mode tutorials; and 3 mode-specific signature challenges. Three course definitions already exist; five more are proposed, **not yet built**.
- See [DEC-025](../decision-log/DEC-025-snapline-three-distinct-modes.md) and [active P6 plan](../08-production-roadmap/SNAPLINE_P6_THREE_MODE_VERTICAL_SLICE.md).
- P6 implementation, physical device profiling, independent user studies, commercial model and APK remain pending.

## P6.1 course catalog and local progress implementation — November 7, 2026
- Owner explicitly chose all three gameplay modes as separate choices (DEC-025), not a single-mechanic winner.
- **Built on P6.1 feature branch:** one Pulse Grid Home with A/B/C mode choice, a dedicated course-list screen filtered by each mode, and mode+course-isolated local completion progress. B-only Patrol Crossing is never selectable in A or C. Navigation preserves the selected mode; Next Course no longer loops silently.
- Progress: device-local `localStorage`, storing wins, best time ticks and best route length independently per mode/course; unknown/invalid data safely ignored; explicit reset removes only the game progress key. If browser storage is unavailable, runs work but cannot persist.
- **Local verification:** TypeScript strict compile + **34/34 Node tests passed** (28 earlier + six new catalog/progress tests). Actual Chromium page tests using inline HTML and storage shim: 360×800 (B), 390×844 (A), 412×915 (C) and desktop A all win, report progress, and show it after simulated document reload; separate real B snap correction passes. No browser JS exceptions and no horizontal overflow observed.
- **Important QA limit:** the local browser administrator blocks navigation to localhost/file URLs, so the browser tests use an in-memory storage shim rather than proving actual origin-owned storage persistence. Physical Android P6.1 testing, real browser navigation/storage test and FPS metrics remain pending.
- Existing **three course definitions** only (detour, timing, B-only patrol), not the five future levels proposed for P6.2/P6.3. No native APK, monetization or external player study.
- [P6.1 source and QA report](../../prototypes/snapline/pulse-grid/README_P61.md) · [active P6 plan](../08-production-roadmap/SNAPLINE_P6_THREE_MODE_VERTICAL_SLICE.md).

## P6.1 merge confirmed — November 7, 2026
- **Merged and verified on `main`:** [PR #23](https://github.com/rayadinaveen98-ship-it/game-project-01/pull/23), squash commit `ab9d8bd62f45d0a985b69535336a4f762c8b2e96`.
- **7/7 GitHub checks passed:** P6.1, P5, P4, P3, P2.1, P1 and Documentation Gate.
- Built three-mode course list, filtered eligibility, mode-specific local progress and scoped reset. 34/34 automated tests pass. Offline runnable `prototypes/snapline/pulse-grid/standalone.html` present on main.
- **Pending:** owner physical-phone P6.1 approval; actual browser-managed persistent storage across reopens; real-device FPS/input latency. Current local browser test used a storage shim because file/localhost navigation was prohibited.
- **Not implemented yet:** five more P6 content definitions, true mode-specific first-time tutorials, full native APK, ads or commercial release.
- [P6.1 QA report](../../prototypes/snapline/pulse-grid/QA_REPORT_P61.md) · [remaining issue #22](https://github.com/rayadinaveen98-ship-it/game-project-01/issues/22).

## Snapline P6.2 mode-specific onboarding — November 7, 2026
- Owner reported P6.1 was good and authorized continuing (DEC-026). This is not a measured hardware benchmark.
- **Implemented on P6.2 branch:** A/B/C contextual three-step guide shown on first course entry per mode; read/skip independently saved in browser storage, permanently accessible from Course HOW TO PLAY and Game ? buttons.
- Opening Help mid-run pauses rather than continuing simulation behind a modal; dismissal does not falsely count tutorial mastery. All 3 modes, collision logic, prior course results and approved Pulse Grid design remain.
- **Local verification:** strict TypeScript build and 40/40 Node tests pass; actual Chromium A/B/C guide-to-win and guide reopening flows pass in 360/390/412 phone emulation and desktop B. Separate B SNAP full regression and cross-mode preference isolation pass. Screenshots captured.
- **Limitations:** real browser-origin persistence across physical close/reopen unverified; browser test uses storage shim due sandbox navigation restrictions. Combined multi-device harness stalled during extra teardown after individual passes; no external player study or physical Android FPS.
- **P6.2 owner screen and physical-device approval pending**; five new mode-specific courses P6.3 have not yet been implemented.
- [Mode guide source & QA](../../prototypes/snapline/pulse-grid/README_P62.md) · [P6.2 visual review](../05-art-direction/snapline/P6_2_MODE_GUIDES_REVIEW.md).

## Snapline P6.2 merge verified — November 7, 2026
- [PR #24](https://github.com/rayadinaveen98-ship-it/game-project-01/pull/24) **merged to main** as `abe9f46bd257dc3ee7e59643987b448e510a3bcc`. All **8/8 independent GitHub workflows passed** (P6.2, P6.1, P5, P4, P3, P2, P1, documentation).
- Three mode-specific, short, first-use tutorials and contextual HOW TO PLAY integrated. Read/skip preferences are isolated per mode from actual win/progress values; help during a run pauses it.
- `prototypes/snapline/pulse-grid/standalone.html` on main is the current offline browser playable. 40 Node tests pass.
- Remaining P6.2 owner acceptance: real phone interaction and screen review, physical performance, actual browser-owned local storage after reopening, accessibility/first-time-user feedback. Do not claim them complete from emulator evidence.
- **Next proposed content milestone:** [P6.3 five new mode-specific courses](https://github.com/rayadinaveen98-ship-it/game-project-01/issues/25). Not implemented yet. Other game/IP ideas retained for later.

## P6.3 — Eight authored courses implemented for review (November 7, 2026)
- Owner's "good bro continue" after P6.2 guided expansion is documented in [DEC-027](../decision-log/DEC-027-snapline-p62-acceptance-p63-course-expansion.md). This authorizes content implementation, not claims of measured hardware QA or commercial demand.
- **P6.3 implementation on feature branch:** five NEW authored levels added to original three = **eight unique courses / 12 mode-course assignments**. A Plan & Run: Planning Basics, Static Detour, Efficient Detour, Moving Hazard. B Snap & Redirect: Static Detour, Patrol Crossing, Second-Chance Timing, Moving Hazard. C Live Drawing: Keep Ahead, Static Detour, Continuous Flow, Moving Hazard.
- Dynamic four-course selectors, mode-specific order, text/result labels, next-course navigation and progress keys remain in shared Pulse Grid application. Original A/B/C mechanics and two shared + B-only original course geometry unchanged.
- **Local QA:** TypeScript strict build + **48/48 Node tests passed**, including A/C solvability, C live-trail real-simulation finishing, new B patrol no-snap loss/timed-left-snap deterministic win, eligibility and saved progress isolation. Actual desktop Chromium A/C four new courses and B new snap win passed; mobile emulation 360 A, 390 B/C, 412 C passed.
- **No P6.3 physical phone acceptance, browser-origin storage persistence benchmark, first-time-player difficulty study, FPS benchmark, APK or monetization yet.** [Technical QA](../06-technical-design/snapline_P63_course_qa_report.md).

## P6.3 verified merge — November 7, 2026
- **On main:** [PR #26](https://github.com/rayadinaveen98-ship-it/game-project-01/pull/26) merged as `3f6a1d5f9f1069c3a94ad360f89831ec45e634a2` after **9/9 GitHub CI workflows passed** (P6.3, P6.2, P6.1, P5, P4, P3, P2.1, P1, Docs).
- Five authored levels plus original three give eight unique course definitions and twelve mode-course combinations. A/B/C each have four correctly ordered courses; dynamic HUD/result/title/nav use mode-specific numbering.
- **48/48 Node tests** passed. Desktop and touchscreen mobile-emulated browser interactions passed, including new B leftward one-snap rescue. Original shared and B practice course geometry remains.
- The legacy P4 CI step that expected a fixed `03 SNAP PRACTICE` label was updated to assert practice's stable ID and name; it then passed on PR #26.
- Offline playable is `prototypes/snapline/pulse-grid/standalone.html`. **Owner physical Android P6.3 testing, browser-owned persistent storage on real navigation, measured device performance, accessibility and outside-player difficulty evaluation remain pending**.
- [P6.3 owner acceptance issue](https://github.com/rayadinaveen98-ship-it/game-project-01/issues/25) · [P6.4 hardening issue](https://github.com/rayadinaveen98-ship-it/game-project-01/issues/27).

## Snapline P6.4 touch and pause recovery implemented — November 7, 2026
- Owner replied "ok bro continue" following the P6.3 eight-course build. [DEC-028](../decision-log/DEC-028-snapline-p63-feedback-p64-reliability.md) records authorization to continue *reliability engineering*, not independent Android or unfamiliar-user acceptance.
- **P6.4 implementation on feature branch:** safe pointercancel/lostpointercapture cleanup, window blur/background pause, no hidden route changes when Help opens during a captured gesture; C keeps existing live trail and waits for explicit resume; interrupted B snap edit cancels without spending the snap; A incomplete stroke discarded.
- Mode and course geometry, selected Pulse Grid visual identity, tutorial preferences and local completion storage schema are unchanged. Course list text no longer promises durable progress unconditionally when browser storage is restricted.
- Local strict build, **59/59 Node tests** (48 existing, 11 new), Chromium A/B/C interruption/recovery and browser/mobile-emulated regression tests pass; C real run after rejoin completes, B new left-snap rescue still wins.
- **Not verified:** physical Android input/background behavior, actual browser-origin localStorage across reopen (environment blocks external/local navigation), FPS, screen-reader accessibility, outside-player study, native APK or commercial viability. See [P6.4 QA](../06-technical-design/snapline_P64_reliability_QA.md).

## P6.4 verified merge and user QA handoff — November 7, 2026
- [PR #28](https://github.com/rayadinaveen98-ship-it/game-project-01/pull/28) **merged to main** as `b58e8df0ed291bde0981b8d495dcb2327228e3aa` after **10/10 GitHub Actions workflows passed**.
- Implemented deterministic interruption safety for A/B planned strokes, B one-snap preview, C append-only trail, hidden/blurred tab, and Help during captured input. Active run now pauses on OS/browser interruption, requiring explicit resume; existing runner position, collision system and 8 courses unchanged.
- **59/59 Node/TypeScript tests**, Chromium desktop interruption checks, CDP synthetic-touch cancel and baseline A/B/C regressions locally pass. Screenshot evidence captured from actual browser.
- `prototypes/snapline/pulse-grid/standalone.html` is current P6.4 offline playable in main; no external network dependency.
- Pending [Issue #27](https://github.com/rayadinaveen98-ship-it/game-project-01/issues/27): physical Android touch/notification/background test, measured frame pacing, actual browser-owned progress persistence between sessions, screen reader/keyboard experience and first-time player results. Do **not** imply P6.4 production acceptance from emulation alone.

## P6.5 offline first-time-player study lab — November 7, 2026
- Owner replied "good bro continue" following the P6.4 hardening, authorizing the P6.5 evaluation tooling stage (DEC-029). **No physical Android performance result or real external-player feedback is inferred.**
- **Built as separate research tool, NOT a game redesign:** [P6.5 Offline Playtest Lab](../../playtests/snapline-p65/README.md) embeds the existing P6.4 full game in a sandboxed `srcdoc` iframe. The owner-approved A/B/C modes, eight courses and Pulse Grid production UI are untouched.
- The facilitator can start anonymous consented sessions, use six A/B/C presentation orders, record observed first action, hints, wins on two shared courses, spontaneous retries and optional subjective ratings/quotes, then export CSV or JSON. Observations only exist in memory until explicitly exported; no network upload or participant identifiers are collected.
- **Engineering QA only:** 16/16 study-data Node tests pass. Local Chromium at 1280×920 and 390×844 renders original game and lab without horizontal overflow; embedded actual A Planning Basics Canvas draw→GO→real win passed. Browser automation demonstrated explicit form saving and export controls with throwaway simulated observations; **these are not real player results**.
- **Genuine independent player sessions: 0.** No first-time-user conclusions can be drawn until people participate; physical phone owner/participant testing and P6.4 localStorage/FPS gaps remain pending.
- [Study protocol](../07-research/SNAPLINE_P65_PLAYTEST_PLAN.md) · [Lab QA](../../playtests/snapline-p65/QA_REPORT_P65.md).

## P6.5 offline research kit merged, human study not started — November 7, 2026
- [PR #29](https://github.com/rayadinaveen98-ship-it/game-project-01/pull/29) **merged to main** as `e9b015f08e8ce21551d52c0f31f6ed2e3b1600f3`; **2/2 PR workflows passed** (new P6.5 offline lab build and Documentation Gate). P1–P6.4 gameplay files were not changed.
- A new standalone [Playtest Lab](https://github.com/rayadinaveen98-ship-it/game-project-01/blob/main/playtests/snapline-p65/dist/Snapline_Sprint_P65_Playtest_Lab.html) embeds the unchanged P6.4 browser game and provides anonymous opt-in facilitated observations, balanced A/B/C session order and local-only JSON/CSV export. No network collection, new game UI or additional mode.
- 16/16 lab-unit tests and desktop/mobile-sized Chromium observer flow passed, including a real embedded A-course win; QA-only synthetic form entries were **not exported or represented as people**. **Actual first-time-player sessions = 0**.
- Track the real player study and owner device verification in [P6.5 Issue #30](https://github.com/rayadinaveen98-ship-it/game-project-01/issues/30) and the outstanding [P6.4 Issue #27](https://github.com/rayadinaveen98-ship-it/game-project-01/issues/27). Do not call Snapline production-ready, predict retention/downloads, or claim Android hardware FPS.

## November 8, 2026 — M1 reactive material experiment (pending visual approval)
- Owner requests surfaces that **react to the actual moving player**, not merely gel/slime colors, and authorized a playable Reactive Jelly board prototype. [DEC-030](../decision-log/DEC-030-reactive-material-prototype.md).
- Implemented opt-in **JELLY ON/OFF** control with separate spring-field renderer that consumes runner position, movement direction and phase; waves and collision bursts are **presentation-only**. Approved Pulse Grid remains selectable and is not silently replaced. Reduced-motion preference yields nonanimated Jelly.
- Existing 3 modes, 8 authored courses, progress data, 59 older tests and fixed-step collision engine preserved; **65/65 Node tests pass** locally. Desktop/headless and three phone-sized Chromium A/B/C Jelly runs passed.
- Captured real browser comparison screens and delivered standalone offline HTML + source ZIP for owner review. Owner aesthetic approval, real Android performance/touch verification, physical progress storage test and outside-player impressions remain pending.
- Ten cosmetic characters, slime/water variants, and 100-level content expansion **are ideas, not implemented**. [M1 QA](../06-technical-design/snapline_M1_reactive_material_qa.md).
