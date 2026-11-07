# Snapline Sprint P6.2 — Mode-specific first-run guides

**Version:** 0.6.2 / Pulse Grid browser prototype  
**Stage:** P6.2 onboarding in the approved three-mode game. No new level content or APK in this phase.

## Play
Open `standalone.html` in a modern desktop or Android browser. This offline HTML is self-contained and makes no network calls. From Home choose A, B or C and tap LET'S PLAY. The course list includes a **HOW TO PLAY** button for that specific mode. On entering your first course in a mode, a three-step guide appears. Select the mint START/TRY action or SKIP GUIDE to continue.

- **A — Plan & Run:** Draw from S to F, then tap GO; reset and try a better route.
- **B — Snap & Redirect:** Draw and GO, then use exactly one paused forward-anchor correction.
- **C — Live Drawing:** Draw live from S; the runner auto-starts, and lifting/rejoining at the mint trail tip is possible.

Guides are independently remembered as `viewed` or `skipped` for each mode using only device-local `localStorage` key `snapline-pulse-mode-guides-v1`. Guide preferences do not change saved completion results (`snapline-pulse-progress-v1`). If storage is unavailable, the app remains playable; guide choices persist only until the page is reloaded. The tutorial does not claim player mastery.

You can replay the current mode guide anytime using **HOW TO PLAY** on the course list or **?** in Gameplay. Opening help during a run pauses the runner; close it and press Resume. Escape skips/clears the dialog. Buttons are keyboard focusable and modal focus is kept within the two actions.

## Verification
- `npm run check`: TypeScript 5.8.3 strict compile and **40/40 Node tests** (34 previous + 6 P6.2 guide tests).
- Desktop and Chrome mobile emulation at 360×800 (B), 390×844 (A), 412×915 (C), plus a 1280×960 desktop (B): first guide, 3 steps, dismiss, complete course, revisit guide, no auto repeat after reload with *storage shim*; individual scenarios passed.
- Separate interactive B snapshot: GO → SNAP → pause → move anchor → win passed.
- Separate multi-mode UI check: 3 mode preferences are isolated and don't touch completed-course records.
- Layout: guide actions visible inside phone frame; no page horizontal overflow in checked viewports.
- Local test browser blocks real `file:`/localhost navigation; **native browser-origin storage after closing/reopening and real Android FPS are not verified**. A combined end-to-end harness experienced slow browser teardown after individual scenario passes.

## Scope protection
Approved Pulse Grid palette, game geometry, A/B/C mechanics and P6.1 mode-specific course progress preserved. No additional five course definitions are implemented here. The five levels belong to P6.3 after owner visual/device review.
