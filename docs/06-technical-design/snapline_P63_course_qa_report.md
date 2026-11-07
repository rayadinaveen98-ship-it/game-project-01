# Snapline P6.3 — Five new courses and QA overview

**Date:** 2026-11-07  
**Product baseline:** three owner-retained gameplay modes, approved Pulse Grid v0.1, P6.2 mode-specific guides.

## What is implemented
Three original authored courses remain. Five new courses are added: Planning Basics and Efficient Detour (A), Second-Chance Timing (B), Keep Ahead and Continuous Flow (C). All use the shared fixed-step simulation and actual swept collision engine.

Mode-specific order is fixed and explicit:
- A: Planning Basics → Static Detour → Efficient Detour → Moving Hazard.
- B: Static Detour → Patrol Crossing → Second-Chance Timing → Moving Hazard.
- C: Keep Ahead → Static Detour → Continuous Flow → Moving Hazard.

Each mode has four selectable courses, resulting in 12 mode/course assignments but only 8 authored geometry definitions.

## Content quality checks
- New A/C levels: deterministic route fixtures within the ink budget complete using real simulator.
- New C levels: append-only live finger-trail fixtures execute in real live simulation without moving runner position backward.
- New B signature level: ghost-route without correction loses to moving patrol; correctly timed left snap produces a deterministic win and maintains runner position and tick; distinct from original right-snap tutorial.
- Eligibility per mode, result text, course selector options, local save-key isolation and next navigation tested.
- Existing shared-course walls and moving hazard parameters remain unchanged.

## Test record
- TypeScript strict compilation and **48/48 Node tests passed** locally (40 existing + 8 P6.3).
- Desktop Chromium actual UI: each new A/C level routes to a genuine win, displays correct course title and progresses to correct next entry. B new level guide→GO→SNAP left→win passed.
- Emulated touchscreen Chromium: A Planning Basics at 360×800, C Keep Ahead at 390×844, C Continuous Flow at 412×915 and B Second-Chance Timing at 390×844, all passed.
- Three course catalogs screenshot at 390px A, 360px B, 412px C. No horizontal overflow or browser page errors in these specific checks.
- Single-file HTML reproducibly bundled from existing TypeScript/Canvas source with no external runtime imports.

## Not established
Real physical Android input comfort/performance, browser-origin storage persistence after actual navigation, screen reader testing, meaningful difficulty calibration with first-time players, and commercial traction. A deterministic solution proof is not a playtesting satisfaction result.

## Next phase
P6.4: owner review of course fairness and touch targets, dedicated real Android testing, accessibility and performance polish. P6.5: human first-time player study and game business feasibility review. Do not expand level count or monetize until those gates are considered.
