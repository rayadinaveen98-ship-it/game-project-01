# Snapline Sprint — M2 Reactive Slime (optional material experiment)

**State:** Browser prototype implemented and tested; final visual direction and physical Android device performance are not yet approved.

## Why M2 exists
The owner asked for material backgrounds that react to the moving character, not simply static illustrations. M1 introduced bouncing Jelly; **M2 adds a different Slime response**: sticky, directionally stretched motion that lingers after movement before fading. The previously approved **Pulse Grid** remains the default and can be selected anytime.

## How to try
1. Open `standalone.html` offline, choose gameplay mode A/B/C and a course.
2. In the game header, tap the board material selector to cycle **NORMAL → JELLY → SLIME → NORMAL** (labels 1/3, 2/3, 3/3).
3. Draw a route, press GO (A/B), or draw continuously (C). The surface reacts to the actual **world-space runner movement**, not touch position. Compare the same course/route on all three materials.
4. If you prefer reduced motion, your system's `prefers-reduced-motion: reduce` setting disables material animation but retains a static material background.

## Architecture
- **Pure visual:** `src/ui/slime.ts` is a capped 54-element directional viscoelastic wake that reads the authoritative `Run` state. No gameplay physics/collision geometry is altered.
- **Distinct feel:** Slime deposits elongated translucent slugs along movement, creates stronger distortion at turns and a local elastic pulse at collisions, and fades over ~2.4 seconds. Jelly retains its existing spring lattice and quicker elastic ripples.
- **No cosmetic character yet:** the glowing runner is deliberately unchanged. 10 skin options and 100 levels remain separate proposed features.
- **Preserves game:** all three A/B/C modes, eight authored courses, mode-specific guides, progress and pause/recovery behavior remain.
- **Material persistence:** optional existing `snapline-material-v01` local preference now recognizes `pulse`, `jelly`, `slime`. Earlier saved Jelly preference still loads. The game works if storage is unavailable.
- **Performance/comfort guard:** localized bounded wakes, 60Hz capped visual updates, loss/background pause, UI screenshots at 360/390/412 widths, reduced-motion fallback. Real hardware frame pacing needs testing.

## Build and QA
```sh
npm install --no-audit --no-fund
npm run check
node scripts/make-single-html.mjs
```
This produces an offline `standalone.html` without runtime imports or online dependencies. The test suite has **73 tests** (65 retained and 8 new Slime material tests). `test_m2_browser.py` and `test_m2_accessibility.py` use actual Chromium via Python Playwright in the development container; the automated browser checks are **emulation, not physical Android tests**.

## Remaining gates
Actual Android frame rate, input responsiveness and battery impact, real browser-origin preference after closing/reopening, owner visual approval of Slime, and human player enjoyment. Do not treat this as a final material theme approval. The separate P6.5 Playtest Lab remains pinned to P6.4 to avoid uncontrolled study changes.
