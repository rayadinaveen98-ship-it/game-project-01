# DEC-025 — Keep all three Snapline Sprint gameplay modes

**Date:** 2026-11-07  
**Status:** APPROVED — PRODUCT DIRECTION FOR NEXT VERTICAL SLICE  
**Owner statement:** "all are good we can keep all in different modes."

## Decision
Do **not** select one winner and discard the other two. The next Snapline Sprint vertical-slice direction retains **three individually selectable modes** within **one game**, using the approved Pulse Grid visual identity and shared movement/collision engine:

1. **A — Plan & Run:** draw an entire route before pressing GO. Calm strategy and route planning.
2. **B — Snap & Redirect:** plan route then use one deliberate mid-run forward anchor correction. Tactical decisions.
3. **C — Live Drawing:** continuously extend the trail while the runner moves. Reactive arcade pressure.

Each has its **own introductory instruction**, progression representation and suitable challenge types. All modes remain directly accessible from the Home screen. Do not make one mode a compulsory prerequisite for another.

## Rationale
The owner enjoyed all three existing playable mechanics. They provide complementary player experiences instead of being interchangeable skins. Preserve this preference and evaluate accessibility/difficulty **within each mode**, not force a single mode-selection contest.

## Production constraints
- One shared game shell, runner simulation, collision geometry, rendering pipeline and Pulse Grid design tokens. No triple codebase.
- Distinct rules/controllers, tutorials, appropriate course data and optional mode-specific locally stored progress.
- Avoid tripling art/content scope: first slice target **8 distinct course definitions**, with 2 already shared across A/B/C and 6 mode-specific content entries (including existing B-only practice); twelve mode-course playable combinations in total.
- No fabricated performance/retention or user cohort tests. Owner statement validates preference, not outside demand.
- Future revision may redesign or even remove a mechanic **only with explicit owner approval and evidence**. The three modes are the active plan.
- No native APK, monetization, Play Store release, purchases or full game expansion is authorized by this decision.
- C09 girl-adventure remains deferred for later, unaffected.

## Follow-up
See [P6 three-mode production plan](../08-production-roadmap/SNAPLINE_P6_THREE_MODE_VERTICAL_SLICE.md). The historical one-winner selection proposal is superseded by this decision.
