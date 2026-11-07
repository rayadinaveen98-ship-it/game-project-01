# Snapline Sprint — P6.4 Reliability & Input-Hardening Alpha

**Scope:** Preserve approved Pulse Grid design, A Plan & Run, B Snap & Redirect, C Live Drawing, P6.1/P6.2 mode-aware course guides and progress, and all eight P6.3 course definitions. **No new levels, sounds, accounts or monetization.**

## What improved

- **Android/browser touch interruption policy:** `src/game/interruption.ts` defines pure, testable safe handling for pointercancel, lostpointercapture, tab visibility loss, blur, navigation and manual pause.
- **A/B planned strokes:** A route partially drawn during a touch cancellation is discarded, never treated as a valid full route.
- **Live Drawing C:** An unexpected touch cancellation or lost capture preserves the existing validated line, pauses the simulation and prevents unseen obstacle collisions. The player resumes explicitly, then re-joins the existing trail. A normal finger lift remains the original continuous-play behavior.
- **B Snap & Redirect:** An interrupted snap preview is cancelled without spending the player's only edit; the runner stays paused and can resume before trying SNAP again.
- **Help and navigation:** Opening Help during an active finger drag revokes capture and pauses. A late pointerup cannot add a hidden segment behind the dialog. Leaving the gameplay view, resetting, and backgrounding also clear captured gestures safely.
- **Progress truthfulness:** The course menu no longer guarantees persistent results if browser storage is restricted. Each mode's existing progress/version key is unchanged.
- **Pulse Grid:** No palette, typography, board geometry, course collision or approved visual structure changed. Version label only updated.

## Run

Open `standalone.html` in the browser. Select A, B or C from Home and choose a course. Run/complete courses as in P6.3. During an active run, click Pause or switch apps: the runner freezes; press ▶ Resume to continue from the identical simulation state.

## Local checks

`npm run check` — **59/59 TypeScript + Node tests** passed (48 inherited + 11 new interruption-policy cases).

Chromium mouse behavior verified: A pointercancel resets draft; C pointercancel freezes run and preserves existing trail; C resumes, rejoins and wins; A blur freezes runner position, time and resumes to actual result; B mid-snap blur keeps edit unspent and retryable; opening Help with a captured C pointer stops gameplay and blocks hidden route mutation. Chromium synthetic touchscreen `touchCancel` also freezes C and keeps its trail.

P6.3 regressions re-run successfully on A 360×800, C 390×844, C 412×915 and B desktop + 390×844. No JS exceptions observed in the recorded local browser cases.

## Remaining acceptance gates

- **Physical Android phone** behavior, real device FPS/latency and Android Chrome background/return remain untested here.
- **Real URL navigation** is blocked in the test browser (`ERR_BLOCKED_BY_ADMINISTRATOR` even when all requests are intercepted); origin-backed localStorage across closing/reopening is not verified. Browser tests use an in-memory shim. No claim about retaining save data between separately downloaded HTML files.
- Accessibility screen-reader/keyboard-only gameplay input has not been resolved. The canvas remains primarily pointer driven.
- First-time-player level difficulty and gameplay comfort study still pending.

P6.4 is a **reliability alpha**. It is not an Android APK, a published web app, a full-game release or proof of commercial demand.
