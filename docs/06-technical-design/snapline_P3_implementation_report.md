# Snapline Sprint — P3 implementation evidence (2026-11-07)

**Scope:** First playable P3 B Snap & Redirect mechanics alpha with existing A Plan & Run as baseline. Visual design remains the user-approved Pulse Grid. This is **not** final production or Android release.

## Delivered
- Mode picker in Home: A Plan & Run, B Snap & Redirect; same 2 course layouts and collision engine.
- In B, one available SNAP button pauses the runner and activates a draggable anchor ahead of its position.
- Edits change only the untraversed route, keeping runner world coordinates, traversed path, simulation tick and elapsed time invariant.
- Only valid, wall-free, within-ink edits consume the single snap. Live mint/red feedback matches edit validation.
- One committed correction automatically resumes the runner. CANCEL preserves original route and resumes; touching wrong spot does not spend the edit.
- Original fixed-step 120 Hz movement and swept static/moving collision remain intact.
- Real Home→Game→Result metrics continue from P2.1, with snap usage documented in result.

## Evidence
- TypeScript 5.8.3 build, reproducible standalone HTML and Node tests: **15/15 PASS**, including 5 new forward-only/collision/replay tests.
- Desktop Chromium automated mouse interaction: B draw→GO→snap pause→anchor drag→commit→win, and original A mode win: PASS.
- Mobile Chromium emulation with **synthetic touch**: 360x800, 390x844 and 412x915, draw→GO→SNAP→drag→win; no horizontal overflow: PASS.
- Generated actual browser screenshots for Home, mid-run correction and live Result, delivered in conversation.
- GitHub Actions CI must be checked before claiming remote verification.

## Open/limits
- Physical Android P3 owner verification not performed yet. No confirmed FPS metrics on a real phone.
- P3 is an **alpha**; no independent external user research, mode-choice evidence, custom B-only tutorial, C Live Drawing or monetization.
- No APK and no hosted Pages deployment verified.
- Approved game style (Pulse Grid) is retained; small new controls are reviewable rather than assumed approved forever.

## Next
1. Confirm CI and preserve the repo commit.
2. User tests B mode's actual touch, visible ink, collisions and reset on their physical phone.
3. Fix any defects and compare A and B before making permanent mechanics choice.
