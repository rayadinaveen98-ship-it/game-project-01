# M1 Reactive Jelly QA — November 8, 2026

## Engineering boundary
A distinct spring-field renderer consumes `Run.position`, `Run.ticks`, and `Run.phase`. It has **no write access** to the authoritative `Run`, wall geometry, moving hazards, snap routes, or progress records. `material` controls presentation only. Normal Pulse Grid remains unchanged by default unless the user has saved a Jelly preference.

## Validated
- `npm run check`: 65 Node cases passed and TypeScript 5.8.3 strict compile successful (six new material-specific tests plus 59 previous). Tests include static no-impulse, moving runner impulse, paused-run no new kicks, collision burst, 1,400-cycle stress/finite bounds, reset and continuous bilinear sampling.
- Interactive Chromium (actual HTML, headless) tested at 360×800, 390×844 and 412×915 using synthetic mobile sizing and gestures. A Planning Basics route validates and wins. Material debug telemetry shows nonzero spring energy (>1,100), >60 impulses and >150 world units of runner travel around the sampled position. This is internal visual debug data, **not FPS or player data**.
- Desktop B signature course: GO, timed leftward SNAP correction and real win while Jelly selected.
- Desktop C live drawing: path drawn, runner auto-moves, visual impulses generated and win achieved.
- Screenshots include idle Normal/Jelly comparison and actual animated-state screenshots. Surface tile distortion observed in run, not simply a static background image.
- `prefers-reduced-motion: reduce` freezes all dynamic material impulses; the jelly remains a static, legible surface.
- No new fonts, paid assets, network dependencies, audio or character rights required.

## Pending / explicit constraints
- Hardware performance and browser-origin storage persistence have not been measured on real Android; Chromium emulation cannot establish real device FPS or thermal behavior.
- No independent aesthetic approval yet. The approved **Pulse Grid** should not be replaced without owner viewing actual captured screens/video and accepting the direction.
- Jelly currently **changes the board only**, not Home/Result/Settings background screens. Expand only after evaluating this experiment.
- No skins, slime viscosity variant, water fluid variant, 100-course production, APK or monetization in this prototype.
