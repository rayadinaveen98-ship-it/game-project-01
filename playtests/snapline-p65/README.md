# Snapline Sprint — P6.5 Offline Playtest Lab

**State:** Research instrument implemented. **No external participants have been tested and no player outcomes are reported.**

This is an independent, single-file facilitator tool, NOT a new game mode and NOT a production UI change. It embeds a pinned, byte-identical P6.4 Snapline game offline and collects only observations deliberately entered by a facilitator (with participant permission).

## Why this exists

Automated geometry tests (59/59 as of P6.4) prove certain programming invariants, not that players enjoy the game. P6.5 gives the owner a practical way to gather real first-impression evidence for the already-approved three-mode, eight-course prototype.

## Files

- `src/shell.html` — separate Pulse-Grid-compatible study UI (not part of the released game screens)
- `src/study_logic.cjs` — pure validation, counterbalanced sequence, anonymous observation structure, summary and CSV/JSON serialization
- `build.mjs` — embeds the **pinned P6.4 baseline** at `fixtures/snapline-p64-locked.html` into one self-contained research HTML in `dist/`, so later material prototypes do not silently change the research control. The baseline bytes match the original P6.4 playable HTML.
- `tests/study_logic.test.cjs` — 16 actual automated study-data tests, no fabricated participant data
- `browser_smoke.py` and `embedded_game_smoke.py` — local Chromium QA; optional Python Playwright dependencies and browser binary required for reproduction
- `QA_REPORT_P65.md` — tested vs unverified items
- `P65_RESEARCH_PROTOCOL.md` — consent, instructions, capture and interpretation

## Running

```sh
node build.mjs
node --test tests/*.test.cjs
```

Open `dist/Snapline_Sprint_P65_Playtest_Lab.html` in a modern browser. Use the **embedded game** for actual playing; use the left panel only for anonymous facilitator notes. It works offline and uses no external fonts, trackers or APIs. On phone, tap EXPAND to play the original game full-screen.

The game is sandboxed with `allow-scripts` only. Its own browser-storage data is intentionally not available in this research frame; no core game code was modified. The study observations are held **in memory only** until exported via JSON or CSV. Closing or reloading without exporting loses them. This avoids unwanted data collection but makes the facilitator responsible for deliberate export.

## Session format

Sessions S01, S02… use six balanced presentation orders. In each mode, ask players to try the two *shared* courses (Static Detour, Moving Hazard), not the mode-specific teaching courses, which are harder to compare. Record actual observed first action, hints, wins out of two, voluntary retry, optional fun/thumb comfort/fairness ratings and optional consented direct quote or issue. Finish can mark partial. A response is not created until a real submit action.

Optional preference A/B/C/none/undecided should not be interpreted as a statistically representative market preference. Data has no personal names, emails, identifiers, IP logging, auto-analytics or network upload.

## Decision boundary

Once the owner collects genuinely independent sessions, review raw observations before prioritizing mode tutorials, input changes or level balancing. This prototype does not perform recruiting or device testing by itself. P6.4 hardware/actual browser persistence remains unverified; do not count emulated results as physical Android evidence.

## Study baseline pinned on November 8, 2026
The material prototype M1 adds a jelly surface to the ordinary game, but the A/B/C first-impression study must remain comparable over multiple sessions. The embedded game is intentionally frozen at P6.4. Any future study-version upgrade requires an explicitly versioned protocol and a new lab build rather than silently switching existing results.
