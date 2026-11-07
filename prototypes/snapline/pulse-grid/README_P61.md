# Snapline Sprint P6.1 — Three-mode foundation

**Build:** 0.6.1 (browser prototype)  
**Visuals:** Previously owner-approved Pulse Grid theme  
**Stage:** P6.1 architecture and mode-specific course selection, not five new levels

## Play
Open `standalone.html` in a modern browser, or run the static build. The HTML includes its own CSS and JS; no paid engine, server, accounts or network requests are needed to play. On the Home screen select A, B or C, then select a course. Each mode has its own eligible course list:

- **A – Plan & Run:** Static Detour, Moving Hazard (2 shared courses)
- **B – Snap & Redirect:** Static Detour, Moving Hazard, and Patrol Crossing (B-only practice)
- **C – Live Drawing:** Static Detour, Moving Hazard (2 shared courses)

After a win, the course screen displays a cleared indicator, wins and best time for **that mode + course only**. Results are stored only in browser `localStorage` under `snapline-pulse-progress-v1`. The reset action removes only this app's progress key. Browser private mode/file-origin restrictions may prevent persistence; the game remains playable and labels the result as session-only when storage fails.

## Preserved
- Exact existing deterministic collision and motion engine, P1–P5.
- Three mechanics and B-only practice course.
- Approved Pulse Grid tokens and primary Home, Gameplay, Result layouts.
- Offline standalone HTML; no SDK, paid library or usage analytics.

## Testing
- `npm run check`: TypeScript strict compilation + 34 unit tests (28 existing + 6 catalog/progress tests).
- Browser smoke `python test_p61_browser.py` and `python test_p61_snap.py` (Python Playwright + Chrome/Chromium required; these are outside GitHub CI). Environment restrictions currently prohibit localhost/file browser navigation, so the UI test uses `page.set_content` and an in-memory `localStorage` shim to verify same-page persistence/reinitialization. **Real browser-owned storage across actual navigation is not independently confirmed** here.
- Emulated viewports: 360×800, 390×844, 412×915, and 1280×960; A/B/C course-selection + run/win checks; separate B SNAP correction.
- Pending: physical Android phone testing, actual device FPS, any new level content, unfamiliar-player study, release APK.

## Project documentation
`docs/08-production-roadmap/SNAPLINE_P6_THREE_MODE_VERTICAL_SLICE.md` defines the next five course designs and future work; this P6.1 build doesn't claim those levels exist.
