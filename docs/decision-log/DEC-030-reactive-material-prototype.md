# DEC-030 — Interactive material requirement / M1 Reactive Jelly experiment

**Date:** 2026-11-08  
**Status:** APPROVED TO EXPERIMENT — NOT FINAL STYLE APPROVAL

## Owner requirement
The owner clarified that jelly, slime and liquid are **not static backgrounds**. When the *player moves*, the material should visibly react to that movement, with appropriate wobble, displacement and recovery. Owner then said "yes bro continue" to a proposed playable **Reactive Jelly board** experiment while preserving the approved Pulse Grid baseline.

## M1 solution boundary
- Add a one-tap **JELLY ON/OFF** control to the gameplay header. Regular Pulse Grid remains a choice, and is default for users without a saved preference.
- The game runner's **actual simulated world-space movement**, direction changes and collisions power the animated spring surface. The finger alone is not the driver.
- A separate visual-only grid/spring simulation draws underneath the canonical path, walls, moving hazards, runner and hitboxes. The material has **zero authority** over collision geometry or speed.
- Original A Plan & Run, B Snap & Redirect, C Live Drawing, eight courses, progress and tutorial behavior remain available.
- Use existing Pulse Grid mint/navy/coral roles in the experimental gel surface. Do **not** silently replace owner-approved theme or redraw Home/Result.
- Respect OS reduced-motion preference: allow static gel without reactive movement.

## Later variants, not implemented
Viscous trailing slime, liquid ripples with tuned wave response, 10 character/skin selections and 100-level progression require separate design and owner approval. Jelly on the game board is the **first experiment**, not finished character or level production.

## Owner acceptance and evidence
Code and Chromium visuals need real screenshots, transparent test records and independent CI. Hardware FPS, accessibility and thumb comfort require future physical device checks. Owner's final aesthetic approval is **pending**.

[Technical QA](../06-technical-design/snapline_M1_reactive_material_qa.md).
