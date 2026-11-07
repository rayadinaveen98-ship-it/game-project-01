# Snapline Sprint P6.3 — Eight-Course Three-Mode Vertical Slice

**Stage:** P6.3 authored prototype content. **Visual direction:** owner-approved Pulse Grid. **Status:** implemented and locally tested; physical-device user acceptance and external playtesting not yet complete.

## What's included
This is **one game** with three selectable modes, four eligible courses per mode, and **8 distinct course definitions / 12 playable mode–course assignments**. Three original course definitions are retained, five are new.

| Mode | Course progression | New P6.3 content |
|---|---|---|
| **A Plan & Run** | Planning Basics → Static Detour → Efficient Detour → Moving Hazard | Planning Basics, Efficient Detour |
| **B Snap & Redirect** | Static Detour → Patrol Crossing → Second-Chance Timing → Moving Hazard | Second-Chance Timing |
| **C Live Drawing** | Keep Ahead → Static Detour → Continuous Flow → Moving Hazard | Keep Ahead, Continuous Flow |

The existing B-only Patrol Crossing remains accessible to B alone. The second B challenge has a **different patrol path and a leftward rescue** (unlike the older rightward practice). The suggested B guide intentionally loses if no snap is applied. The test route survives after one timely leftward correction; this outcome was verified in the real browser interface and model replay tests. Neither failure nor successful correction relies on teleportation.

## What changed in the code
- Typed course IDs/metadata for eight levels and new `signature` family.
- Stable, mode-specific course ordering rather than inferring from shared source-array order.
- Dynamically rebuilt accessible course selector (no stale three-option markup).
- Course title, ordinal, result text, challenge/practice/specialty labels, and board captions derive from selected course + selected mode.
- B-only visual faint guide for the new Second-Chance Timing level, with separate leftward timing prompt.
- Unchanged engine: fixed-step 120Hz simulation, swept collision detection, one-snap B correction, append-only C trails, P6.1 local results and P6.2 first-run guides.

## Verify
Open `standalone.html` in a browser, or use the archived offline HTML release artifact. Choose a mode, view four courses, open one of the new levels, clear it, and check its entry in the course list. New result keys remain scoped by `(mode, course)` in local storage.

For **B Second-Chance Timing**, select the third B course, trace the faint suggested path, press GO, SNAP around the middle of the approach, then drag the mint anchor **left** (roughly toward x=180, y=250 on the 360×640 virtual board). A timed, valid correction can finish the run.

## Tests and honest limitations
- `npm run check`: TypeScript strict build and **48/48** automated tests, including 8 new P6.3 suite checks.
- Desktop Chromium: successful interactive runs for both new A levels, both new C levels, and actual paused anchor correction of the new B level.
- Mobile Chromium emulation: A Planning Basics at 360×800, C Keep Ahead at 390×844, C Continuous Flow at 412×915 and B Second-Chance Timing at 390×844, with real synthetic touch gestures.
- Three mode-specific, four-card course menus visually captured at 390/360/412 widths; no horizontal overflow in tested flows.
- Browser-origin storage across real navigation/reopen and physical Android performance/gesture comfort remain unverified because the automated browser uses in-memory HTML and a storage shim under sandbox navigation restrictions.
- **No APK, production release, commercial validation, native performance benchmark or unfamiliar-player data** are claimed.

## Follow-up gates
User tests P6.3 on a physical phone, checks each new course and saved progress, reports design fairness and thumb comfort; then proceed to P6.4 polish/QA and P6.5 unfamiliar-player testing. Do not add an unrelated visual theme or monetization before those checks.
