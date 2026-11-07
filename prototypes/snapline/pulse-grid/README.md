# Snapline Sprint — Pulse Grid P2.1

**Status:** real coded visual refinement for owner review. The owner selected visual direction A; the exact UI polish still needs approval. This is an engineering/browser prototype, not an APK or commercial release.

## Open and play
Open `standalone.html` directly in any modern browser; no install, backend or external assets required. The prototype starts at the Home screen. Tap **LET'S PLAY**, draw one continuous path from S to F, then press **GO**. On success, a real result screen shows the route length, elapsed simulation time, and number of attempts. **NEXT COURSE** opens the moving-hazard course. `?` shows instructions, `↻` resets, `Ⅱ` pauses.

## Source layout
- `src/core/*` P1 deterministic math/simulation (unchanged)
- `src/game/*` P1 course data and pointer sampling (unchanged)
- `src/ui/render.ts` Pulse Grid Canvas rendering and level-aware headings
- `src/main.ts` real Home → Game → Result UI and actual result metrics
- `style.css` approved-direction tokens and mobile-responsive layout
- `scripts/make-single-html.mjs` builds offline single-file HTML
- `tests/` original geometry/simulation tests and optional Playwright script

## Build
`npm install --no-audit --no-fund` (Node 22 and pinned TypeScript 5.8.3)
`npm run check`
`node scripts/make-single-html.mjs`

Offline user artifact: `standalone.html`.

## Quality evidence
- 10/10 existing unit tests pass.
- Headless Chromium desktop route/collision/success and real result flow pass.
- Android-viewport Chromium mobile-emulation finger strokes tested at 360×800, 390×844, 412×915 with route/GO/win and Next Course; no horizontal overflow measured.
- Playwright checks are a local optional QA utility; no assertion of real-device testing or real-player studies for P2.1.

## Known limits
- Plan & Run A only (B/C experiments still pending).
- No audio, backend, account, ad, in-game monetization, APK, or hosted page.
- Home art is decorative vector geometry; gameplay remains the existing two demonstration courses.
- The final visual treatment must be reviewed and explicitly accepted before declaring this gate complete.
