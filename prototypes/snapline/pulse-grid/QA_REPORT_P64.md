# Snapline Sprint P6.4 — Input-interruption and pause/recovery QA

**Date:** 2026-11-07
**Scope:** One game, three modes, 8 existing distinct course definitions, approved Pulse Grid.

## Fixed regressions

| Scenario | Expected | Evidence |
| --- | --- | --- |
| A route being drawn receives `pointercancel` | Discard incomplete planned route; GO remains unavailable | Browser PASS |
| C drawing receives `pointercancel` | Preserve validated trail, clear pointer, pause fixed-step simulation | Browser PASS |
| C loses Android touch (`Input.dispatchTouchEvent:touchCancel`) | Preserve trail, do not let runner advance behind OS interruptions | Mobile Chromium emulation PASS |
| C resumes after interrupted touch and draws from saved tip | No teleport, real run completion | Chromium PASS |
| C opens Help while drawing with captured pointer | Release capture, pause run, no hidden route mutation on late pointerup | Chromium PASS |
| A loses focus mid-run | Ticks and world-position freeze; resume to finish | Chromium PASS |
| B loses focus during SNAP editing | Cancel preview, snap not spent; resume and edit available again | Chromium PASS |
| UI storage notice when storage may be blocked | Do not promise unconditional persistence | Source review PASS |

## Test suite

- 48 previous deterministic unit tests: **PASS**
- 11 new pure interruption-policy tests: **PASS**
- Combined TypeScript strict compile + Node: **59/59 PASS**
- Existing mode A 360 mobile synthetic-touch win: **PASS**
- Existing mode C 390 & 412 mobile synthetic-touch wins: **PASS**
- Existing mode B signature snap correction desktop and 390 mobile: **PASS**
- No JavaScript exceptions in the above browser checks.
- Single-file offline HTML rebuilt from matching source.

## Verified artifacts

`standalone.html` — offline playable HTML/CSS/JS, no network runtime dependency.
`evidence_p64/p64_live_interruption_390.png` — real Chromium display of C paused after cancelled input.
`evidence_p64/p64_snap_interrupted_412.png` — real Chromium display of B paused with snap unspent.
`evidence_p64/p64_plan_paused_360.png` — real Chromium display of A paused after browser blur.

## Honest limits

1. **Physical-phone testing NOT PERFORMED** for P6.4; Android background, OS pointer lifecycles and actual FPS can vary. Browser used emulated touch and synthetic cancellation.
2. **Browser-owned persistent localStorage NOT verified:** local browser navigation to file:// or intercepted localhost/test origin is blocked by administrator. In-memory storage shim used in browser UI tests. Previous pure store serialization tests pass.
3. **Not all accessibility goals solved:** no complete non-pointer game input, screen reader tests, color vision/user testing or reduced motion hardware validation.
4. **External player study not performed**; no retention or revenue claims.

## Exit gate

Owner tests P6.4 on real Android and confirms A/B/C normal gameplay and pause/interrupt recovery. Real device performance/storage persistence tracked separately. The P6.4 reliability code may merge with passing CI, but this is *not* device or product release acceptance.
