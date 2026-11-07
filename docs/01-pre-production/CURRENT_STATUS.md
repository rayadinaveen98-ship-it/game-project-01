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
