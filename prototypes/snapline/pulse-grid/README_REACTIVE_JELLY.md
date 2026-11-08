# Snapline Sprint — M1 Reactive Jelly Material Lab

**Date:** November 8, 2026 | **State:** interactive experimental material, not a new approved theme.

## Owner requirement
The background must respond physically when the **player** moves. In a liquid/jelly board the player disturbs the surface; waving a finger without moving the runner must not fake a reaction. Normal Pulse Grid must remain selectable and the existing gameplay must remain fair.

## What is implemented
- Original P6.4 TypeScript/Canvas game with A Plan & Run, B Snap & Redirect and C Live Drawing, all eight original courses and original deterministic collision engine.
- New, optional **JELLY ON/OFF** surface toggle on the game header, using Pulse Grid mint and midnight colors; no other UI redesign. Preference uses an independent localStorage key when browser storage is available.
- `src/ui/jelly.ts`: 19×33 spring lattice at 20-unit spacing, Gaussian kinetic impulses following the **simulated runner's world-space position**, turn-energized ripples, a stronger collision burst, ~1.18-second ring lifetimes, and spring damping to settle after the runner stops. Course resets clear the visual field. 
- Deformed reflective grid ribbons / wave wakes are drawn **under** paths, hazards, terminals, ink bar and runner. No reaction changes authoritative path/hazard geometry, runner speed or collision positions.
- `prefers-reduced-motion: reduce` displays a static gel surface without reactive waves.
- `__jellySnapshot()` is read-only diagnostic instrumentation without telemetry or identity collection.

## Play
Open `standalone.html` in a browser, choose A/B/C, select a course, dismiss the existing guide, and tap **JELLY: OFF** in the top bar. Draw and run. While the runner moves, the grid visibly bends and ripples; once it stops the waves slowly settle. Tap again to compare with approved Pulse Grid.

## Verification
- `npm run check`: TypeScript strict compile and **65/65 Node tests** passed (59 original plus six spring-field tests). `node scripts/make-single-html.mjs` makes self-contained offline HTML.
- Real Chromium app flows on 360×800, 390×844, 412×915 synthetic mobile viewports: A jelly course complete, nonzero field energy and impulses while runner moves; no page exceptions observed.
- Desktop Chromium: B Second-Chance Timing under Jelly with GO → SNAP left → win; C Keep Ahead under Jelly completed with live trail.
- Real browser screenshots of baseline, resting gel, active gel, and B snap. Screenshots are **not mockups**.
- `test_reactive_browser.py` provides the interactive browser harness; note that some long browser shutdown cycles can stall in this hosted environment after all named scenarios have passed.

## Remaining verification
Real Android physical phone thermals/FPS/input comfort, true browser-origin storage on reopening, outside-player enjoyment and final jelly style approval. Slime/liquid variants, ten character skins, and the proposed 100-level expansion **not implemented**. This is a bounded experiment with the same eight-course prototype.
