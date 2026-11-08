# DEC-031 — M2 Slime as a second reactive material experiment

**Date:** 2026-11-08  
**Status:** OWNER AUTHORIZED EXPERIMENT; FINAL VISUAL SIGN-OFF PENDING

## Owner direction
The owner positively reviewed the first player-driven Jelly prototype ("yeah good bro continue") and authorized continuing. This warrants a **distinct Slime experiment** but is not a formal approval to replace the existing Pulse Grid art, redesign the character or launch a new game.

## Decision and implementation
- Maintain **NORMAL / JELLY / SLIME** as equally selectable surface modes in the gameplay header. Pulse Grid remains approved and default when no saved preference exists.
- M2 Slime is deliberately different from Jelly: a **directionally elongated, viscous wake** deposited by actual authoritative runner travel, stronger deformation around turns, a loss pulse, and slower settling than the M1 spring/ripple field.
- Presentation only: no material can move the runner, walls, hazard, collision radius, route ink budget or simulated time.
- Keep all three game modes (Plan & Run, Snap & Redirect, Live Drawing), eight authored courses, current 44px-ish header control sizing and existing mode progress/tutorial rules.
- Honor system reduced-motion preference with a static material substrate. No external textures, network calls or licensing dependencies.
- Keep P6.5 research instrument pinned to the old P6.4 game baseline, rather than quietly changing the game under a comparative research study.

## Acceptance gates
Strict build, deterministic material tests, actual browser interaction with screenshots, and independent CI before merge. Actual Android device frame pacing, input comfort and aesthetic acceptance still need direct owner verification.

## Not yet built
A distinct Liquid material, the requested ten selectable player looks/skins, and the proposed 100-level campaign. They remain separate design/production scopes, **not completed tasks**.

[Technical and QA evidence](../06-technical-design/snapline_M2_slime_material_qa.md).
