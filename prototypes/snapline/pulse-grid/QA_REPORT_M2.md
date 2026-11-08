# M2 Reactive Slime — QA record

**Date:** 2026-11-08  
**Scope:** second optional, movement-reactive board material. All previous modes, eight courses, collision geometry, game progression and original approved Pulse Grid remain.

## Implemented
- New `SlimeField` in `src/ui/slime.ts`: bounded directional wake, localized visual distortion, time-based decay, stronger turn/collision pulses; no mutation of the runner or any game physics.
- In-game selector cycles NORMAL 1/3, JELLY 2/3, SLIME 3/3; visual field resets on material/course switch and optional material preference handles existing Jelly and new Slime.
- Visually distinct rest state and motion response: gelatin Slime with stretched wake versus spring/ripple Jelly. The material background is behind the route and obstacle visuals.
- `prefers-reduced-motion` renders the chosen material in static mode.

## Verification performed
- Strict TypeScript compile passed.
- **73/73 automated Node tests** passed (65 prior tests plus 8 focused Slime tests): idle no fake motion, actual runner wake, pausing without new deposits, decay, loss pulse without run mutation, thousands of bounded updates, reset cleanup, finger-only activity not creating wakes.
- Browser used real Chromium and `page.set_content(standalone.html)` because localhost and file navigation are prohibited in this test environment.
- A / Planning Basics successfully drew route and won in mobile-emulated **360×800, 390×844 and 412×915** viewports with Slime enabled. Runtime snapshot confirmed nonzero wake deposits, visual energy and traveled distance.
- B / Second-Chance Timing successfully performed GO→SNAP→left drag→real win at 390×844 with Slime enabled.
- C / Keep Ahead completed continuous drawn course and reached real win at 412×915 with Slime enabled.
- Three-way material selector cycling, accessible material label, no horizontal overflow and reduced-motion static-field behavior passed in actual Chromium (360×800).
- Screenshots are **real browser captures** of Normal, Jelly, idle Slime, moving Slime and B snap with Slime; not generative mockups.
- No page JS exceptions observed in the tested scenarios.

## Limitations / open questions
- No physical Android testing, measured FPS/input lag/heat/battery usage, screen-reader certification, or real user satisfaction data.
- No native APK, ads, subscriptions, player skin system, third Liquid material, 100-level production or final Slime art signoff.
- User visual approval is for experimentation/progression only; the material must be reviewed on a phone before defaulting to it.
- All visual-only effects remain in a separate renderer; no gameplay difficulty score should change because of material choice.
