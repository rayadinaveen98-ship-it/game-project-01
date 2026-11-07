# Snapline Sprint — Playable Prototype Brief v0.5

**Date:** 2026-11-07 | **Working title:** Snapline Sprint | **Concept:** C08  
**Stage:** Pre-production: scoped first prototype approved; specifics PROPOSED  
**Goal:** Test whether a one-finger draw-and-run mechanic feels clear, fair and worth repeating while proving art-to-game fidelity. This is NOT a complete game design document or commercial product.

## Player promise
Draw a route. Attempt the run. Learn from an unmistakably fair result. Try a better route.

## Control model (proposed common base)
- Prototype is 2D, portrait-first and intended for mobile browser; desktop mouse supported.
- The runner advances automatically along the drawn polyline at deterministic speed. The drawn stroke is a *route*, not a physical platform or bridge. No jumping, gravity simulation, or free movement in prototype.
- Start pad and finish pad are fixed, visible objects.
- One continuous stroke starting near the start and ending inside the finish zone (or at a permitted route node for variant B); stroke sampling and smoothing must keep the collision geometry aligned with rendered path.
- Obstacles block the runner if its radius overlaps their collision region. Moving hazards make timing meaningful.
- Path can use limited total length ('ink'); the limit is visible BEFORE the player draws. Crossing an obstacle during route construction is disallowed or flagged immediately. These rules remain PROPOSED until mechanic spike proves the fairest behavior.
- No random failure: seeded hazard motion, fixed-step simulation and deterministic replays.
- Failure shows specific reason (collision, route too short/long, missed checkpoint) and instantaneous restart.
- Success occurs only when runner reaches goal without collision. No ambiguous 'close enough' grade.

## Three mechanic tests (A/B/C)
**A — Plan & Run:** before movement, draw a static route; tap GO. No edits once running. Control is simple, but competitive overlap is high.

**B — Snap & Redirect:** draw a path with one or two visible anchor nodes; during the run, drag ONE anchor to a new valid position as hazards move. The remainder of the route changes locally; once used, edit is spent. The interaction has to have an unambiguous preview before release. This is a proposed signature, not approved or proven original.

**C — Live Drawing:** draw the next portion of the route while a runner moves along existing points. Speed is controlled so a mobile thumb can keep up; pause on loss of focus. High accessibility/dexterity risk.

**Comparison fairness:** same virtual canvas dimensions, same two/three seeded hazard sets, same runner speed, same art placeholder, same UI and restart behavior. Prefer counterbalanced order in tests. Avoid cherry-picking easier courses for a favored mode.

## Scope of prototype v0
- 1 placeholder avatar (abstract capsule/disc), no character lore
- 1 scene with reusable geometric primitives (start, goal, solid hazard, one moving hazard)
- 3 mechanic variants, selectable only from prototype test menu
- 2 shared courses for direct A/B/C comparison: (1) static detour, (2) moving timing gate. If ink scarcity is not comparable, test it later rather than mixing additional complexity.
- 1 pre-run drawing state, 1 active run state, success/failure/reset states
- Safe pause/resume, short neutral feedback, mute toggle
- Optional local-only anonymous test log: level, variant, attempts, time to first valid draw, collisions and retries. No account/ads/network analytics.
- Mobile portrait and desktop browser viewport scaling

**Explicitly excluded:** 50+ levels, story, monetization/ads, payments, account, leaderboard, multiplayer, skins, daily rewards, cloud saves, Android APK, Play Store publishing, paid asset libraries, complicated particle systems, original soundtrack.

## Proposed roadmap and owner approval gates
P0 / Paper plan (current): three candidate mechanics, scope, risk and acceptance criteria **documented**. No code yet.

P1 / Engineering feasibility: first input/collision deterministic spike (unskinned). Confirm drag-on-mobile, line sampling, geometry collisions and comparable scenario loading. If not viable, stop.

P2 / Visual review: provide THREE screen concepts as actual mockups or captured prototype screenshots (home, gameplay, result); compare concept to implementation. OWNER chooses direction. No final asset production without visual approval.

P3 / Playable pilot: implement all three fair variants, two identical test courses, tactile feedback and instant retry. Build, open on phone and desktop browser. Verify controls in actual browser.

P4 / Internal QA: automated geometry/path tests, fixture replays, viewport captures and manual device checks. Do not claim device success until the owner runs it.

P5 / Human comprehension and fun: test with uninformed players, gather counts and verbatim notes. Discuss next-iteration plan before choosing ONE core mechanic.

P6 / Commercial continuation decision: decide whether to expand to a vertical slice with 6–8 tuned levels, visual polish and optional Android packaging. This step is NOT automatically approved.

## Architecture recommendation (not yet approved)
Use a **browser-first TypeScript / Canvas 2D** prototype. Rationale: programmable route geometry, small build, no engine installation for owner, easy unit testing, portable desktop/phone link. Evaluate Phaser only if renderer, input management or scene organization outgrows Canvas. Phaser's input pointer events and Arcade/Matter physics are supported, but route collision still needs custom deterministic geometry. A later native Android engine decision should be independently benchmarked.

Suggested modules:
```
prototypes/snapline/
  index.html
  package.json
  src/
    core/{state,types,rng,fixed-step,vector,geometry}.ts
    gameplay/{runner,path,obstacles,validation,variants}.ts
    renderer/{canvas,camera,particles}.ts
    input/{pointer,keyboard}.ts
    scenes/{menu,course,result}.ts
    data/{courses,configs}.ts
    ui/{hud,buttons,accessibility}.ts
  tests/{geometry,solver,replay,input,viewports}.test.ts
```
No executable files exist yet. No package/tool version is locked.

## Hosting / testing
Because the repository is public, **GitHub Pages** can host a static browser prototype if enabled and successfully deployed. GitHub docs say Pages supports public repositories on Free plans and may use a build workflow. OWNER may need to enable Pages and review deployment permissions. No user-local game-engine installation is necessary for this browser-first path, but working public link must be independently verified before claiming it.

## Quality acceptance — release gate for prototype
- 100% of expected essential states usable: draw, edit (B), go, fail, retry, success, pause and mute.
- Fixed-step deterministic replay for seeded courses; identical path and seed yield identical result in test harness.
- 0 known blocker crash in scripted and manual test session.
- No false visual line versus collision mismatch at test corridor geometry.
- Input must distinguish drawing from tapping buttons, work with one finger, and not scroll the page unintentionally.
- Target 60 FPS, minimum steady ~50 FPS on representative Android midrange *provisional target; record actual measurements*. No false 'measured' claims.
- Viewport checks for 360x800, 390x844, 412x915 and desktop width; no cropped HUD, minimum comfortable targets.
- Fail reason must match actual geometry/timing. Restart under 1s on supported test devices is aspiration; measure rather than assume.
- Approved art reference side-by-side versus in-game captured result, with diff review.
- All 3 variants have comparable difficulty scenarios; no arbitrary selection by developer preference.

## Player study design
Internal owner test is a bug/UX dry-run, NOT independent market evidence. Aim for 5–8 first-time players and 8–12 first-impression responses for the prototype (small exploratory groups, not statistical proof). Capture first legal action, whether failure felt fair, reason given, voluntary retry, frustration, device and screen size; do not collect names or personal identifiers.

**Pilot thresholds (proposals, not measured):**
- Most participants identify draw → run → improve after brief instruction.
- No repeated reports of unpredictable collision or poor touch response.
- At least some players voluntarily retry after completing training.
- No major UI legibility/accessibility failures.
Formal numeric selection criteria will be reviewed after the first QA pilot; do not overfit small samples.

## Business hypotheses for a future game (not features)
- Simple interaction + short levels might suit repeat attempts and shareable replays.
- Potential model is free plus light, optional rewards and one-time no-ads purchase, if earned by play retention and ad-policy review.
- Neither downloads, retention, conversion nor revenue are demonstrated. No monetization code in v0.

## Risk register
R-S01: Established draw-path competitors (*Strike a Line*, *Line Rider*, *Draw Climber*). Mitigation: distinctive action experiment, originality check.
R-S02: Path physics and visible stroke not aligned. Mitigation: geometry invariant tests, replay fixtures.
R-S03: Mobile gesture conflicts with scrolling or buttons. Mitigation: pointer capture/touch-action rules, real phone QA.
R-S04: Too many gameplay mechanics in v0. Mitigation: same course in test-only selectable variants, no production branching after selection.
R-S05: Artwork concept high quality but in-game output poor. Mitigation: explicit visual review and scene screenshots before art lock.
R-S06: No web deployment permissions or successful CI. Mitigation: local HTML artifact fallback, prove GitHub Pages workflow.
R-S07: Short-session F2P business fails to acquire/retain players. Mitigation: measure voluntary retry and later conversion before any revenue estimate.

## Benchmarks and current technical references (2026-11-07)
- Strike a Line: https://strike-a-line.brighteng.org/
- Phaser input docs: https://docs.phaser.io/api-documentation/event/input-events
- Phaser physics: https://www.phaser.io/oss/docs/phaser/concepts/physics
- GitHub Pages overview: https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- GitHub Pages publishing guide: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

**Status: design plan only. The developer has not yet shipped a playable browser build or approved final visual design.**
