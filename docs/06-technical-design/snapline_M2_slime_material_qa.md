# M2 Reactive Slime — Implementation and QA

**Date:** 2026-11-08  
**Status:** PLAYABLE EXPERIMENT, not a locked new art style.

## What was built
- `src/ui/slime.ts` provides a bounded, visual-only `SlimeField` with directional deposits, local displacement sampling and easing decay. Maximum 54 wake elements and 9 collision/turn pulses; wake fades after approximately 2.4 seconds.
- The material selection button cycles **NORMAL 1/3**, **JELLY 2/3**, **SLIME 3/3**. Previous Jelly preference remains readable. Material and level changes clear visual history without touching game progress or gameplay state.
- The Slime board uses original navy, soft pearly green and translucent layering; actual world-space runner motion creates a stretched translucent trail rather than Jelly's primarily elastic wave response.
- The existing M1 Jelly field, canonical physics/geometry and all A/B/C rules and eight courses remain unchanged.

## Tests and browser evidence
- **73/73 Node + strict TypeScript tests pass** (65 retained; 8 new Slime unit tests).
- New tests verify idle with no fake motion, runner displacement being the only wake source, paused ticks avoiding new deposits, slow decay, collision pulse without mutating run, bounded updates over 2,500 samples, reset cleanup and finger-only query not creating wakes.
- Real Chromium responsive interaction: A / Planning Basics with Slime enabled completed at **360×800, 390×844 and 412×915** mobile-sized viewports. Browser material snapshot confirmed nonzero Slime energy and wake deposits after movement.
- B / Second-Chance Timing actual GO→SNAP→left drag→successful result in 390×844 Chromium with Slime enabled.
- C / Keep Ahead actual live drawing and completion in 412×915 Chromium with Slime enabled.
- Selector cycles in order, exposes accessible label, does not cause horizontal overflow, and respects reduced-motion static-field behavior in Chromium.
- Screenshots of Normal, idle Jelly, idle Slime, moving Slime and active B Slime snap were captured **from the real browser**, not generated style artwork.
- Standalone HTML built offline and reproduced from TypeScript sources without external runtime fetches.

## Limitations
- Headless Chrome and synthetic phone dimensions are **not physical Android testing**, and no hardware FPS, battery, heat or input latency data was obtained.
- No independent first-time-player satisfaction data, genuine change in retention or monetization claims.
- User has approved **continuing the material experiment**, not necessarily chosen Slime as the default.
- The glow-circle runner, 10 proposed skins and 100-level roadmap remain outside M2. Liquid variant not implemented.
