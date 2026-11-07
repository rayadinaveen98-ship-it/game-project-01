# Snapline Sprint — P6.1 QA report

**Date:** November 7, 2026  
**Build:** P6.1 three-mode course catalog / local progress

## Verified in local environment
- `npm run check` → **34/34 tests pass**, strict TypeScript compilation pass (28 existing gameplay tests + 6 new catalog/progress unit tests).
- Browser emulation at 390×844 (A), 360×800 (B), 412×915 (C), and 1280×960 desktop (A): Home mode selection → eligible courses → draw/run → actual win and Result → course cleared label → progress rehydration in test browser shim → pass.
- Correct B-only practice level access, disallowed from A/C; A/C share two base courses.
- Separate B snap regression in Chromium 390×844: GO → SNAP → pause → drag valid anchor → win, progress under B only → pass.
- Browser UI test also verified progress reset, per-mode isolation, and no observed JavaScript page errors or horizontal scroll overflow.
- Actual browser-rendered screenshots are included with the review package.

## Verification distinction / blockers
- Browser automation blocked direct navigation to localhost and file origins (`ERR_BLOCKED_BY_ADMINISTRATOR`). Tests used `page.set_content` and a small in-memory localStorage shim. This exercises the application storage API and state reinitialization but **does not establish persistence in a real browser origin across true page reloads**. Pure Node unit tests validate serialized storage round-trip and exception handling.
- Phone-size testing is synthetic touch emulation, **not a physical Android test**.
- No real-world device frame-rate, input latency, battery, interruption stress-test or outside player feedback yet.
- No new levels in P6.1: 3 existing course definitions; 5 proposed new definitions remain future work.
- No APK, hosted URL, monetization or production-complete claim.

## Owner review
Check that the Home mode picker, course selection, actual completion result, and returning to course list look consistent and simple. Confirm that the completed-course tag remains after you close and reopen the HTML in your mobile browser; if it does not, send details of how the file was opened and browser name.
