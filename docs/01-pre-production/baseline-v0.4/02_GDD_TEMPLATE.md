# Game Design Document — master template
**Version:** Not started until a concept is approved.  
**Rule:** This is the gameplay specification, not a pitch deck. Each section must be specific enough to produce and test.

## A. Product identity
- Working title; genre; platforms; audience and accessibility needs; game pillars (max three)
- Competitive references and unique differentiator
- Player fantasy; emotional goal; one-sentence promise

## B. Moment-to-moment game
- Camera, field of view, game space and screen orientation
- Controls and gestures; adjustable settings; input latency expectations
- Player verbs, abilities, restrictions, timing, cooldowns and feel
- Core loop, secondary loop, meta loop; annotated flow and statechart
- Failure/retry/quit states; pause/resume/background handling
- Key feedback: VFX, animation, sound, haptics, score changes

## C. Rules and systems
- Rules and formal win/loss criteria
- Interactions, collision behavior, exploits to prevent
- Pseudocode or formulas for difficulty/scoring if applicable
- RNG policy and fairness, seeded randomness where useful
- Enemy/NPC behavior, AI states and difficulty if applicable
- Save/load, offline behavior, data loss recovery

## D. Levels, content, progression
- Tutorial target time and teaching sequence
- Level map/structure and each mechanic introduction
- Rewards, achievements, collectibles, unlocking logic
- Difficulty curve, pacing, expected session length
- Progression balancing assumptions and test plan
- Content production estimate and reusability assumptions

## E. UI/UX and accessibility
- Menu-to-play flow and retry flow; screen wireframes
- Text scale, contrast, color-blind-safe cues, motion/audio controls where relevant
- Touch sizes, one-hand use vs landscape ergonomics, back navigation
- Language/localization plan and content requirements

## F. Economy and monetization (only if approved)
- Whether free/premium/ads/IAP, and why this serves the audience
- Value proposition, currency sources/sinks, reward fairness
- No misleading ad buttons, forced interruptions or pay-to-win by accident
- Offline/paywall behavior and purchase recovery where applicable

## G. Audio and story
- Music identity, SFX feedback table, voice, sound mixing
- Narrative structure, character list, script/localization, endings (if relevant)

## H. Analytics and privacy (only if approved)
- Event dictionary, consent, age assumptions, no unnecessary personal information
- Player-value metrics and metrics that would falsify design assumptions

## I. Final release boundaries
- **Must have:** ...
- **Should have:** ...
- **Won't have in version 1:** ...
- Trace each must-have to tasks and test IDs.

## J. Open questions and sign-off
- Open question table: owner, evidence needed, due decision phase.
- Decision log links and approved GDD revision.