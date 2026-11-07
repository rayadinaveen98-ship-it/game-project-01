# Snapline Sprint — P2 design-lab QA
Date: 2026-11-07

## Outcome
- Three distinct screen themes rendered: `pulse`, `ink`, `micro`.
- Nine actual browser-rendered phone screenshots captured (3 themes x Home/Game/Result), plus desktop studio screenshot and game-view contact sheet.
- Existing P1 mechanics unchanged: course geometry, path validation, fixed-step runner and collision.
- Strict TypeScript 5.8.3 compilation: PASS.
- P1 Node unit tests: 10/10 PASS.
- Browser Chromium desktop: valid user-drawn route under all three palettes, GO → finished on course 01; 3/3 PASS.
- Browser Chromium mobile emulation with synthetic touch: drawn route 747/850 ink; GO → finished after 561 simulation ticks; PASS.
- Visual viewport tests: 360x800, 390x844, 412x915, 1280x900: horizontal overflow 0, phone content clipped 0 (after responsive width adjustment); PASS.
- Browser script error capture for desktop screenshot pass: none observed.

## What was NOT tested
- Physical Android phone / real finger latency / FPS; owner must validate P2 later.
- Browser diversity (iOS Safari, Firefox, old Android webviews).
- High contrast, color-blind and reduced-motion usability with human players.
- Home and Result state are illustrative visual previews, not completed UX integration.
- Gameplay variants B/C not implemented and not accepted.

## Relevant art-to-logic invariant
All skins use the same wall coordinates and route geometry from P1. Decorations are contained within the collision geometry; screenshot comparison uses identical courses and a deterministic safe route. Inks and colors are design candidates, not approved production style.

## Gate
**P2 REVIEW PRESENTED — OWNER APPROVAL PENDING**. Do not merge to production/main and do not claim finished art.
