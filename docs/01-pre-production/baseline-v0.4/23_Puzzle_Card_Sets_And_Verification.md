# P | Coupled valve distribution - original paper experiment
**Not** an approved game. **Art:** intentionally abstract to isolate the player verb.

## Rules, exact
There are three plants A, B, C. Each valve emits **exactly one sun token and one rain token**. Valve OFF and ON give different recipient pairs. Flipping a valve changes both destinations simultaneously. Tokens do not persist from move to move: after any switch flip, recompute the entire allocation from all valve settings. Win when *every plant's sun and rain count exactly matches its printed goal*; surplus is not allowed. Unlimited flips; no currency, timer, growth or animation.

Each valve's output is listed as `sun -> destination; rain -> destination`:

| Valve | OFF (0) | ON (1) |
|---|---|---|
| V1 | Sun A; Rain B | Sun B; Rain A |
| V2 | Sun B; Rain C | Sun C; Rain B |
| V3 | Sun A; Rain C | Sun C; Rain A |
| V4 | Sun C; Rain B | Sun A; Rain C |

## Board P1: first physical play (3 valves)
- Valves V1, V2, V4. Start **OFF-OFF-OFF** (`000`).
- Targets: A `(sun 1, rain 1)`; B `(1,1)`; C `(1,1)`.
- Initially: A `(1,0)`, B `(1,2)`, C `(1,1)`.
- Facilitator answer (withhold from player): **ON-ON-ON** (`111`).
- Code enumerated all **8** combinations and found exactly **one** matching assignment.

## Board P2: extended physical play (4 valves)
- Valves V1, V2, V3, V4. Start `0110` (V1 OFF, V2 ON, V3 ON, V4 OFF).
- Targets: A `(1,1)`; B `(2,1)`; C `(1,2)`.
- Initially: A `(1,1)`, B `(0,3)`, C `(3,0)`.
- Facilitator answer: **`1000`** (V1 ON; V2/V3/V4 OFF).
- Code enumerated all **16** combinations and found exactly **one** matching assignment.

## Why this differs from rotate-a-pipe games
There are two coupled outputs and an exact allocation target; reversing a single control can fix sun while breaking rain. A conventional routing-pipe skin would undermine the experiment's differentiation. Uniqueness of the two examples is mathematical, not a claim that the resulting mechanic is novel, deep, or fun.

## Flaws to look for
- The player tries to move individual tokens rather than flip whole valves.
- A plant already at goal becomes unsatisfied when another plant is corrected.
- Counting is tedious; two simultaneous outputs are hard to perceive.
- Players find all rules obvious but the action loop dull.

## Unit-cost pilot
Create 6 additional boards with a different number/arrangement of controls; use the included solver technique to reject insoluble/duplicated outcomes. Record authoring time per board. Only then estimate levels/illustrations for a V1 game.

## Verification
`30_Prototype_QA_Results.json` records exact target counts, start counts, tested assignments and uniqueness for P1/P2. The main PDF front-facing cards contain **no answer key** until the facilitator page. The separate five-second stimulus deck has no solutions.