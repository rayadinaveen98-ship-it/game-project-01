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
