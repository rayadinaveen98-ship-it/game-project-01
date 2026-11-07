# Snapline Sprint — P3 Snap & Redirect Alpha (v0.3.0)

**Working interactive browser prototype**, built from the owner-approved Pulse Grid visual style. No game engine, user account, network requests or advertisements are required to play the standalone HTML.

## Play

1. Open `standalone.html` in a browser. The compiled `dist/index.html` also works when served over HTTP.
2. Home: choose **A — Plan & Run** (the previous baseline) or **B — Snap & Redirect** (the new experiment).
3. Tap LET'S PLAY, draw one route from S to F and press GO.
4. In B, while running, tap **SNAP** to pause. Drag the mint handle onto a revised route ahead of the runner. A valid edit turns mint and shows its ink cost; invalid edits stay coral and do not use your one snap.
5. Release a valid edit to spend the one snap and resume. Cancel instead to keep the original route. You can restart anytime.
6. Reach F for real completion time, route distance and attempt count. NEXT COURSE opens the moving-hazard fixture.

## Mechanical invariants

- Original P1 fixed-step (1/120 sec) runner and swept static/moving collision logic is preserved.
- Edited geometry begins **ahead of the runner**. Passed route segments, current world coordinates and simulation tick do not change during a snap.
- One committed snap per run; invalid edits do not consume it.
- Geometric wall intersection and full ink limit are validated before commit; preview uses exactly the route supplied to the simulation.
- Snap event (tick, target x/y) is logged only in ephemeral in-memory debug state. No user data collected.
- Replay of an identical initial route plus deterministic snap tick and target returns an identical simulation outcome.

## Scope and evidence

- 15 Node unit tests pass, including 5 new snap geometry/replay tests.
- Chromium desktop interactive draw→GO→SNAP→valid drag→result passed; Plan & Run A regression passed.
- Emulated mobile Chrome at 360, 390 and 412 CSS pixels: **actual synthetic touch** used to draw and drag the snap anchor; success and result state observed. These are not measurements from a physical phone.
- Art matches the approved Pulse Grid palette. Only the mode picker, one snap control and inline feedback were introduced.
- No real hardware FPS/performance measured. Physical-device P3 owner test and independent player evaluation remain pending.
- P3 alpha includes 2 comparable fixtures (existing Detour and Moving Hazard); no separate custom B tutorial level yet. The final A/B mechanics decision remains open.

## Development

`npm install --ignore-scripts --no-audit --no-fund` then `npm run check`; `node scripts/make-single-html.mjs` rebuilds offline HTML.

`src/core/snap.ts` contains pure correction geometry. `src/main.ts` handles one-shot state, paused gestures, mode switching, and user feedback. `src/ui/render.ts` displays a geometrically faithful correction preview. See `QA_REPORT_P3.md` for evidence and limitations.
