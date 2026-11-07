# GP-01 Snapline Sprint — P6.3 quality report

**Date:** 2026-11-07
**Build:** browser TypeScript/Canvas P6.3, Pulse Grid
**Tester:** Automated local unit/model and Playwright Chromium; physical-device owner feedback pending

## Scope / deliverables
- 8 unique authored course definitions: 3 previously existing, 5 newly created.
- A / B / C each list 4 compatible courses: 12 playable mode+course assignments.
- Explicit, validated mode-specific order, title, selector options, completed-results labels and next-course navigation.
- Prior course geometry, stable progress key and original physics remain intact.

## Source-level validation
- `npm run check`: **PASS 48/48** (40 prior tests, 8 new P6.3 tests).
- Every new A/C level has at least one authored route within ink that wins deterministically with the real simulator.
- Both C levels accept a genuine spaced live finger-trail path; appending a new tail preserves runner position and previous ticks.
- B Second-Chance Timing guide: unchanged → moving-hazard collision; same guide + one valid leftward snap at fixed tick 210, target (180,250) → win, exact replay deterministic and no runner teleport.
- Invalid/out-of-bounds/too-small B correction rejected without mutating prior run or route.
- Original two shared fixtures and B-only Patrol Crossing unchanged.
- All new progress records isolated by mode+course; invalid mode/course combos rejected. Old saved results deserialize unchanged.

## Browser gameplay evidence
**Desktop Chromium (1280×980):** Home → correct mode catalog → correct new course → guide → gameplay → genuine success result → Next Course, for A Planning Basics, A Efficient Detour, C Keep Ahead, C Continuous Flow. Each new course wins and records a local result. Separate B Second-Chance Timing test: guide draw, GO, SNAP left via pointer drag, actual win. No page-script errors observed.

**Mobile Chromium emulation with synthetic touchscreen:**
- 360×800: A Planning Basics draw/GO/win — PASS.
- 390×844: C Keep Ahead live draw/win — PASS.
- 412×915: C Continuous Flow live draw/win — PASS.
- 390×844: B Second-Chance Timing guide draw/GO/paused anchor drag left/win — PASS.
- Mode catalogs captured for A at 390 px, B at 360 px, and C at 412 px; each displays 4 eligible entries and no horizontal overflow.
- Single-file browser artifact rebuilt from source after compiling.

## Known limitations and remaining acceptance
- Browser pages were inserted in-memory due sandbox file/localhost navigation restrictions; tests do not prove actual origin-owned localStorage persistence after restarting the browser. App still writes normal localStorage where permitted.
- Synthetic touch emulation is not a physical Android phone: no verified real-device FPS, battery impact, thumb reach or accessibility screening.
- Test fixtures demonstrate **existence of solutions**, not empirically calibrated level difficulty or representative first-time-user enjoyment.
- New B guide does not yet offer a dedicated visual animated explanation of the left snap. Existing B first-use guide explains mechanics but the player must discover the precise timing.
- No APK, Play Store release, analytics, paid systems or commercial metrics.

## Release gate
Engineering P6.3 is ready for owner review after GitHub Actions CI. It is **not** a final product release. Continue with P6.4 only after real-device review or clearly identify remaining hardware-only QA.
