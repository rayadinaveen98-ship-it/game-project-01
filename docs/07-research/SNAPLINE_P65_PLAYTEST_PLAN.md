# Snapline Sprint — P6.5 First-Play Study

**Status:** Offline playtest tool built and automated verified. **Zero actual independent participant sessions.**

## Why

The product owner selected A Plan & Run, B Snap & Redirect and C Live Drawing as independent modes within one game (DEC-025). Earlier 59 passing gameplay unit tests and Chrome emulation show code quality, not whether an unfamiliar player finds the modes clear or fun.

## Field study

Use the [P6.5 Offline Playtest Lab](../../playtests/snapline-p65/README.md) for facilitated anonymous sessions. Participants may decline; don't record identifying details. Session sequence cycles six A/B/C permutations. Ask each to try the shared Static Detour and Moving Hazard (not B-only practice or mode-exclusive tutorials). Record understanding, hints, wins out of two, voluntary retries, optional 1–5 fun/comfort/fairness ratings, issues and permissioned quotations. Export real data in CSV/JSON; no server or automatic tracking.

The lab can play the actual P6.4 browser game offline in a sandbox; deliberately does not persist game progress inside the study frame. This prevents participant sessions from inheriting previous local saves. The study instrument itself stores observations **in active page memory only** until exported.

## Interpretation

Analyze first-action comprehension and voluntary retry by mode, friction and perceived fairness, but do not compare completion time directly across modes with different action rules. Report participant counts, denominators and raw observations without claiming statistically representative outcomes from a small convenience sample.

## Acceptance

- Study UI present, actual game embedded and playable, no external network dependency.
- Empty results until someone explicitly records a session.
- Validated session and mode observations, partial session labeling, safe CSV/JSON exports.
- Privacy and consent clear, no personal data request or automatic capture.
- GitHub source, tests, independent CI, desktop and mobile-emulated smoke checks.
- **Not yet:** genuine participant data, real Android performance, user research conclusions, production UI approval or commercial launch.

After collecting genuine sessions, use the evidence to prioritize tutorial improvement, thumb target sizes, hazard clarity, difficulty and fairness. Do not discard one mode without owner approval.
