# Snapline Sprint — P2.1 Pulse Grid refinement report

**Date:** 2026-11-07 | **Branch:** design/snapline-pulse-grid-p2-1 | **Status:** implementation ready for owner's review, not final artwork approval.

## Design review findings from P2 Option A
1. **False statistics:** The P2 Result visual contained illustrative 747px/850px values. P2.1 now computes result data from the real route and deterministic simulation.
2. **Fake screen flow:** P2 Home/Result were selectable previews. P2.1 Home→Game→Result is a true interactive flow, and Next Course opens the moving-hazard course.
3. **Misleading disabled audio:** Replaced with a functional Help button. Audio is not claimed.
4. **Small-screen clipping:** Adjusted the board/phone layout and tested 360, 390 and 412 width viewports with real route drawing in mobile emulation; no measured horizontal overflow.
5. **Legibility:** Raised important gameplay micro-type and moved label pairs into clear hierarchy; hazards remain coral outlined + hatched, start/finish carry S/F labels.
6. **Progress labels:** Board header and course badge reflect Course 01 or 02, not a hardcoded Path 01.
7. **Attempt count:** Reset and replay preserve actual attempts on same course; new course resets count.

## Preserved
- Original P1 collision calculations, runner simulation, route sampling, 2 level geometry and successful owner-accepted behavior.
- Pulse Grid core palette and overall art direction.
- User decision to postpone C09 girl adventure.

## QA in local Chromium
- TypeScript strict compilation, 10 Node unit tests: PASS.
- Desktop Home→Game→draw→GO→Result, accurate result metrics, replay, Help and Home navigation: PASS.
- Mobile-emulated touch draw/GO→Result and Next Course at 360×800, 390×844 and 412×915: PASS across separate automated runs.
- Screenshots captured from HTML/Canvas, not image-generation mockups.
- NO known desktop/mobile-emulation page errors during successful checks.
- Physical Android P2.1 acceptance, visual sign-off, accessibility audits, real-player studies and hosted browser link: PENDING.

## Owner review
Inspect three screenshots on the same device size and play the standalone HTML. Evaluate route visibility, dark/mint/coral balance, Home/Game/Result unity, text size, touch controls and result readability. Submit requested adjustments or explicit final screen sign-off. Do **not** infer art-bible final approval from direction selection alone.
