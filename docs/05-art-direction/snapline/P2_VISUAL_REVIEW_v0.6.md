# Snapline Sprint — P2 visual option review

**Date:** 2026-11-07  
**State:** VISUAL OPTIONS IMPLEMENTED, APPROVAL PENDING  
**Reference:** [visual lab source](../../../prototypes/snapline/visual-review/README_P2.md)

The three designs are REAL HTML/Canvas implementations of the same working P1 detour course, not AI-generated game screenshots. Their collision geometry and route-following code are identical.

## A — Pulse Grid
Dark midnight blue, luminous turquoise polyline, crisp coral danger edges, technical typography and measured grid. Prioritizes precision and modern arcade appeal. Risk: generic cyberpunk/neon look if not further differentiated.

## B — Ink Trail
Warm paper background with subtle repeatable grain, deep green pen route, terracotta barriers, expressive serif italic accents. Prioritizes warmth and tactile delight. Risk: excess texture can obscure exact collision boundary.

## C — Micro Runner
Soft lilac environment, bright violet trajectory, glossy pink toy barriers and rounded controls. Prioritizes accessible playful energy. Risk: strong decorative layering makes hitboxes feel soft or ambiguous.

## Screens and interaction
Each option includes Home, Gameplay and Result presentations. Gameplay uses an actual P1 line drawing and runs to completion. Home and Result are illustrative design states; gameplay result panel in P1 remains unchanged.

**Screenshot verification:** nine Chromium browser phone-frame screenshots captured, three per direction, with identical Gameplay route of 747/850 ink. Master PNG contact sheets and offline self-contained review HTML are included as separate conversation artifacts; GitHub houses the source, CSS palettes and standalone reviewer.

## QA evidence
- TypeScript strict build: PASS
- P1 existing automated tests: 10/10 PASS
- Desktop Chromium: real draw and GO to 'won' across all three themes: PASS
- Emulated mobile touch: touch-drawn 747 ink route, GO and completion: PASS
- Viewport widths 360, 390, 412 and desktop: no horizontal page overflow; tested phone component fits after responsive CSS adjustment.
- **Physical P2 device testing NOT YET COMPLETED.**

## Owner review checklist
1. Compare A/B/C Gameplay screenshots for precision and brand feeling.
2. Review Home, Game and Result for consistent design language.
3. State preferred option **A**, **B**, **C**, or a precise hybrid and requested adjustments.
4. Only after explicit approval: create locked Art Bible (palette, tokens, motion, assets, animation), update visual direction and implement P2 final.
5. Then require real-device screenshot and functional comparison, accessibility pass and regression tests.

## Scope guard
No final visuals or game title approved; gameplay B/C variants, monetization, APK and release are still separate gates.

## Subsequent owner decision — DEC-022
The owner selected **A / Pulse Grid** on 2026-11-07. The side-by-side A/B/C lab remains a historical comparison, not the current style decision. The live screen refinement is in [Pulse Grid P2.1](P2_1_VISUAL_REVIEW.md); do not read this original P2 report as pending direction selection anymore. Final screen-level visual review remains open.
