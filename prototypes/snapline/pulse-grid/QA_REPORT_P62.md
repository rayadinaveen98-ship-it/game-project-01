# Snapline Sprint — P6.2 onboarding QA

**Date:** 2026-11-07  
**Build:** 0.6.2 / Pulse Grid  
**Owner sign-off:** P6.1 reported good; P6.2 device/screen acceptance still pending.

## Actual code changes
- Three mode-specific short instructions and contextual guide UI, no global wall of instructions.
- Automatic first-course guide **once per mode** with View/Skip choices; permanent How to Play access on Course and Game screens.
- Guide choices saved independently by mode and not mixed with actual course-win progress.
- Opening guide mid-run pauses the simulation; runner stays stationary. The existing Pause/Resume flow remains available.
- Improved overlay layout for 360/390/412-width portrait and 1280 desktop; approved Pulse Grid colors and original game board retained.

## Automated checks
- `npm run check`: **40/40 PASS**, TS strict compile.
- New 6 tests cover copy boundaries, mode independence, storage persistence, malformed input, security-restricted storage, separation from game results.
- Standalone rebuilt from source and is self-contained without external runtime dependencies.

## Browser evidence (Chromium with in-memory HTML and emulated mobile touch)
- 390×844 A guide → actual route → GO → genuine result → guide replay → reentry no auto-repeat → storage shim reload: PASS.
- 360×800 B guide → route → GO → result → guide replay → no repeat → shim reload: PASS.
- 412×915 C guide → live route → result → guide replay → no repeat → shim reload: PASS.
- 1280×960 desktop B guide → route → GO → result → guide replay → shim reload: PASS.
- Separate desktop B snap flow after first-use SKIP → GO → snap pause/drag → result: PASS.
- Separate browser check: A/B/C guide preference changes do not alter course progress: PASS.
- Guide primary and skip buttons inside phone frame on tested sizes; no measured horizontal page overflow: PASS.
- The long all-in-one Playwright harness ran the above individual cases but stalled during cleanup/extra iterations in this environment; it is NOT counted as an independently clean all-scenarios completion. Individual success lines and screenshots were preserved.

## Outstanding / nonclaims
- Real phone/touch/device performance, motion comfort, TalkBack/VoiceOver accessibility and true localStorage persistence across closing/reopening the actual HTML/browser: **not independently verified**.
- No data from unfamiliar players or measured improvements in first-action comprehension.
- No new levels, APK, Play Store readiness, hosting/CI deployment, monetization or final release.

**Review gate:** owner inspects three screenshots and tests actual Android browser first-run, skip, reopen, progress, and whether Help pauses/resumes the running route fairly.
