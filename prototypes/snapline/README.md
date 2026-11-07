# Snapline Sprint — P1 Mechanical Spike

**Game Project 01 • P1 engineering prototype • Not a finished game**

This is a purposely unskinned, offline-capable browser prototype for verifying the control system before choosing any art direction or implementing variants B/C.

## Play it immediately (no engine installation)
Open [`standalone.html`](standalone.html) in a modern browser, or use the single-file artifact shared in chat (`Snapline_Sprint_P1_Playable.html`). It includes the code and styles inline, so there is **no server, account or internet dependency**.

Controls:
1. Press on the circle labelled **S** and drag a **single continuous route** toward the circle **F**.
2. Release inside F. The route must fit within the visible ink allowance.
3. Press **GO**. The runner follows the line at fixed speed.
4. If an obstacle is hit, you get a specific error. Press **Reset** and redraw.
5. Switch between **Static Detour** and **Moving Hazard** courses. **Pause** works mid-run.

There are two test courses; neither is a finished level. The dark diagnostic interface is **not a proposed final visual style**.

## Build and test

Source files: TypeScript and browser Canvas 2D. The generated `standalone.html` is an optional self-contained demo.

```bash
npm install
npm run check
node scripts/make-single-html.mjs
```

- Compiler: TypeScript **5.8.3** (dev dependency, pin exact version)
- Runtime: static HTML/CSS/JavaScript, no third-party game libraries
- Tests: Node's built-in test runner (geometry, route validity, swept collisions, determinism)
- Browser QA: `python scripts/browser_smoke.py` requires Python Playwright plus Chromium and reads the generated standalone file via browser injection. This script is not part of the CI gate.
- Some development environments block headless browser navigation to local addresses. The smoke test loads the same self-contained HTML via `page.set_content` to avoid treating such restrictions as a gameplay defect.

## Files and current scope

`src/core` contains geometry/simulation, `src/game` defines courses and stroke sampling, `src/ui` draws a diagnostic canvas, `src/main.ts` binds input and controls.

**P1 proves only Plan & Run (variant A).** It does **not** implement B (Snap & Redirect) or C (Live Drawing). Do not treat the absence as a bug: those belong in a later gameplay comparison phase after P1 is reviewed.

- No ads, accounts, story, final character, finished animations, in-game purchases, Android APK, or Google Play release.
- No final art style or colors approved.
- No phone hardware has been tested; Playwright mobile emulation is not a physical-device test.
- Player retention, commercial uniqueness and fun are not validated.

## Code quality and fidelity

- World coordinates are fixed at 360×640 and scaled into the actual canvas.
- Constant runner speed with fixed 120 Hz simulation steps.
- Swept-circle collisions against walls and relative swept-circle hazard collisions (to prevent tunnelling).
- No random or time-seeded game-state dependencies.
- Same rendered route is used as the collision-motion path.
- Tab visibility automatically pauses, preventing jumps after returning.
- User can test the stage in desktop or mobile browsers without installing a game engine.

See GP-01 documentation `docs/04-game-design/snapline/PROTOTYPE_BRIEF_v0.5.md`, visual gate and roadmap for the planned next steps.
