# M1 Reactive Jelly — Implementation and QA

**Date:** 2026-11-08  
**Status:** PLAYABLE EXPERIMENT, not shipping artwork.

## Engineering design
- `src/ui/jelly.ts` is a 19×33 bounded damped spring lattice with localized Gaussian impulses. It samples the simulated runner's position/ticks/phase after the existing fixed-step gameplay simulation advances.
- Movement emits short waves, changes in heading strengthen them, and loss emits a larger local impulse. Angularly elongated ring ripples decay at ~1.18 seconds; deformed translucent grid lines render in Canvas under all collision geometry.
- `render.ts` swaps only the background paint when `material=jelly`; the rest of the course rendering remains unchanged. `main.ts` has an accessible 44px-class JELLY ON/OFF toggle, optional device-local preference in a separate key, and reduced-motion fallback. Enabling Jelly or opening another course resets the visual field.
- Material is purely visual, never mutates routes, moving hazard timing or physics state.
- No online calls, external textures or third-party art. The existing three gameplay modes and all eight courses remain.

## Local evidence
- TypeScript strict compile and **65/65 Node tests** pass (59 prior + six material field tests). New tests check zero idle force, actual movement wake, static pause not producing new impulses, collision burst, long-run boundedness, reset and continuous surface sampling.
- Actual Chromium A / Planning Basics route completed with Jelly on at mobile-emulated 360×800, 390×844 and 412×915; visual field energy and movement impulse counters became nonzero and no JS page errors were observed.
- B / Second-Chance Timing completed via actual leftward SNAP while Jelly was on. C / Keep Ahead completed via live-drawn trail while Jelly was on.
- Screenshots of approved static Pulse Grid, static Jelly, running Jelly and Jelly with B SNAP were produced from actual browser gameplay. No generated visual mockups substituted.
- Offline standalone HTML is reproducible with `node scripts/make-single-html.mjs`.

## Remaining limits
- Headless Chromium phone-sized tests are **not physical Android FPS, latency, thermal or accessibility certification**.
- No independent first-time-player enjoyment data. No evidence of revenue or retention. No ten skins, other material types or 100-level production.
- The M1 surface decorates the **gameplay board only**. It is not yet reactive on Home, Result, etc.
- User has authorized experiment but **has not yet approved this new gel art treatment** as the permanent style.
