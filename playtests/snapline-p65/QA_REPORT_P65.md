# Snapline Sprint P6.5 — Study Instrument QA

**Date:** 2026-11-07  
**Product:** P6.4 game embedded inside an independent P6.5 offline player-study tool.  
**Actual recruited participants:** **0**. This report is ENGINEERING QA only.

## Verified

- `node build.mjs`: generated one self-contained HTML file embedding the real P6.4 standalone game. No external library, CDN, SDK or website dependency.
- `node --test tests/*.test.cjs`: **16/16 tests PASS**. Includes all six counterbalanced presentation orders, data-validation bounds, isolated mode observations, correct partial vs complete sessions, no default fake observations, CSV escaped quotes, JSON raw structure, and empty-results behavior.
- Actual Chromium browser page rendering at **1280×920 and 390×844**: game iframe appeared and its A/B/C selection was present. No page JavaScript errors or horizontal page overflow in the tested viewports. Main and phone screenshots captured from the actual code.
- Browser simulated facilitator actions: consent gate, Session S01 and expected initial ABC order, mode observation saves A/B/C, Complete status, observed ratings aggregation, JSON/CSV export buttons enabled only after results are explicitly entered, second session rotates to BCA. The submitted observations in this **transient automated test page were synthetic QA inputs only** and are **NOT human data**, are not saved in any deliverable, and are not included in reports.
- Embedded **real game** end-to-end: select A, Home → course list → Planning Basics, draw route on actual Canvas, tap GO, reach **real win** via engine. Study session count remained zero; no passive gameplay tracking.
- Mobile viewport expanded game overlay could be entered and exited; no horizontal scroll. `sandbox=allow-scripts` deliberately blocks frame access to normal origin storage.

## Unverified / not claimed

- Physical Android phone install/browser touch comfort, actual FPS/latency, portrait cutouts / safe-area specifics, browser-owned persistence in regular non-embedded prototype.
- Actual native download behavior on every mobile browser and Clipboard API permission on nonsecure file-origin pages. JSON/CSV rendering and content are unit-tested; Playwright did not independently inspect operating-system file downloads.
- Accessibility screen-reader quality, physical gesture cancellation and non-pointer gameplay.
- First-time-player clarity, satisfaction, willingness to replay, retention or commercial viability. **No human tests performed.**

## Quality boundaries

- Normal P6.4 game HTML is never changed by this study tool; no gameplay mechanics or visual art decisions are made.
- Session data stays in browser memory until facilitator exports; closing/reloading removes it. No auto-save or server endpoint.
- No real participant data is bundled in code, screenshots, sources or test reports. Browser smoke uses intentionally synthetic form entries solely for control validation.
- Use the user-approved Pulse Grid language only for the separate study shell; do not claim owner approved a new production game screen.
