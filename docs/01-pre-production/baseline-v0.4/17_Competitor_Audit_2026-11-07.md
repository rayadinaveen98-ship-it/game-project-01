# GP-01 — Competitor audit, first detailed pass (v0.3)
**Verified:** 2026-11-07  
**Stage:** Pre-production / research  
**Status:** 19 named competitors analyzed across three families. **No competitors were physically played**, no proprietary analytics purchased, and review coverage is sampled rather than exhaustive. Store data and regional prices can change.

## Method and evidence hierarchy
- Primary evidence: Google Play store listings (developer identity, marketed gameplay, labelled ads/IAP, download *bands*, ratings, selected publicly visible reviews). Developer site for one newer film-sim if relevant.
- Secondary qualitative evidence: Reddit threads. Useful to generate hypotheses, **not** representative user research.
- Observed facts and assistant interpretations are kept in separate CSV columns. No estimated player revenues, conversion rates, retention, DAU, or ad yield asserted.
- This is **a first detailed public-info audit**; completing gate D1 will require actual-play notes, more reviews by date/star cohort, screenshot annotation and direct mechanic comparison for each finalist.
- Ratings and install bands are *store snapshots*, not a standardized quality metric across genres, regions or ages.

## Puzzle / systemic spatial — seven benchmarks
| App | Gameplay/market observation | Implication for us |
|---|---|---|
| **Block Blast!** | Familiar 8×8 block placement, combos; free ads + IAP; Play 1B+ install band. [Store](https://play.google.com/store/apps/details?id=com.block.juggle) | Huge proof of mass accessibility. **DO NOT** copy board/placement; distribution barrier extremely high. |
| **Arrows – Puzzle Escape** | Tap arrows out while avoiding collisions, daily challenges; free ads + IAP; Play 100M+ installs. [Store](https://play.google.com/store/apps/details?id=com.ecffri.arrows) | Single-touch readability works. A visible review complains about ads; peaceful puzzle promise should survive monetization. |
| **Energy: Anti-Stress Loops** | Rotate pipes/wires to connect lamps and energy; free with ads + IAP; Play 10M+ installs. [Store](https://play.google.com/store/apps/details?id=com.infinitygames.loopenergy) | **Direct conflict** with GP-01's first 'rotate light into garden' premise: skin/theme variation is not differentiation. |
| **Prune** | Swipe tree pruning/physics toward sunlight; fixed paid, no ads/IAP; 48 handcrafted levels. [Store](https://play.google.com/store/apps/details?id=com.Polyculture.Prune) | Minimalist original actions can feel premium. Content length a visible review complaint; test content throughput early. |
| **Monument Valley 2** | Manipulate stylized architecture to make paths; fixed paid; Play 1M+ installs. [Store](https://play.google.com/store/apps/details?id=com.ustwo.monumentvalley2) | Visuals and mechanics must reinforce each other. Store reviews include shorter/easier-than-expected comments. High illustrative level cost. |
| **Mini Metro** | Draw and optimize routes as stations grow; fixed paid, no ads/IAP; Play 1M+ installs. [Store](https://play.google.com/store/apps/details?id=nz.co.codepoint.minimetro) | Procedural system can provide hours of replay with very limited art variety. |
| **Railbound** | Rearrange train tracks to reunite carriages, 240+ puzzles; fixed paid. [Store](https://play.google.com/store/apps/details?id=com.Afterburn.Railbound) | Reusable visual rules are feasible; puzzle generation and hand-tuning remain a real cost. |

**Working takeaway:** Solve for a genuinely *new player decision*, not just a beautiful garden theme or alternate tile art. The high-reach ad-led subgenre and finite premium puzzle subgenre are **different businesses**, so do not combine their download benchmarks.

## Detective / mystery — six benchmarks
| App | Gameplay/market observation | Implication for us |
|---|---|---|
| **The Case of the Golden Idol** | Deduce people/events from clues; Android relaunched 2026, first two cases free, one-time unlock, no ads. [Store](https://play.google.com/store/apps/details?id=com.playstack.TheCaseOfTheGoldenIdol) | A niche of reasoning-led play; entirely hand-written logical case content. Criticism about evidence retrieval surfaced in [this qualitative Reddit discussion](https://www.reddit.com/r/patientgamers/comments/1fgpn0k). |
| **Duskwood** | Messenger-based missing-person story, choice and side minigames; free ads + IAP; Play 10M+ downloads. [Store](https://play.google.com/store/apps/details?id=com.everbytestudio.interactive.text.chat.story.rpg.cyoa.duskwood) | Familiar phone interface can be immersive. A visible Aug-2026 review objects to plot info behind paywalls and irrelevant mini-games: our story mechanics should be coherent. |
| **Tiny Room Stories Town Mystery** | Rotatable 3D exploration and clues with escape puzzles; free ads + IAP; Play 10M+. [Store](https://play.google.com/store/apps/details?id=com.kiarygames.tinyroom) | Search/discovery + mystery appeal; 3D scene authoring is high effort. |
| **NOX – Mystery Adventure Escape** | Point-and-click inspection, combine items, escape rooms and story; free ads + IAP; Play 1M+. [Store](https://play.google.com/store/apps/details?id=com.everbytestudio.escape.room.hidden.object.puzzle.games) | Touch inspection can be the core verb. Avoid complex inventories and disconnected puzzles. |
| **The Room Three** | Tactile close-up 3D mechanisms in atmospheric puzzle mystery; paid; Play 1M+. [Store](https://play.google.com/store/apps/details?id=com.FireproofStudios.TheRoom3) | Premium tactile fantasy, but requires polished 3D modeling and effect expertise. |
| **SIMULACRA** | Lost-phone mystery via simulated apps, videos and VO; upfront paid model. [Store](https://play.google.com/store/apps/details?id=com.kaigan.simulacra) | Mobile-native interface can reduce 3D requirements, but production of high-quality fictional media is still costly. |

**Working takeaway:** Deduction-first systems (player proving contradictions) may be a direction worth testing, but there is already strong direct competition. The evidence-entry and touch controls must be usable on a phone, with accessible text sizes and no audio-required clues.

## Tycoon / film management — six benchmarks
| App | Gameplay/market observation | Implication for us |
|---|---|---|
| **Game Dev Tycoon** | Choose games, prioritize work, recruit, research; paid, no ads/IAP; Play 1M+. [Store](https://play.google.com/store/apps/details?id=com.greenheartgames.gdt) | System feedback and experimentation deliver quality without graphics-heavy scenes. |
| **Silver Screen Story** | Film studio facilities, casting, genre, themes, locations and crew; paid; Play 100K+. [Store](https://play.google.com/store/apps/details?id=net.kairosoft.android.pictures) | Extremely close to proposed GP-01 film tycoon; store reviews criticize frequent popups, unclear stats and limited control. |
| **Movie Tycoon: Film Studio Sim** | Released 2026; film script story cards, cast, crew, technology, awards; free trial then one unlock, no ads; Play 1K+ at audit. [Store](https://play.google.com/store/apps/details?id=dev.blacksnow.movietycoon) | The planned 'select scripts, cast, balance budgets, release' is already present. Brand-new competitors cannot be ignored, but low early install band does not validate/unvalidate demand. |
| **Idle Cinema Empire Idle Games** | Upgrade cinema services, movie lineup, offline income; free ads + IAP; Play 10M+. [Store](https://play.google.com/store/apps/details?id=com.idle.cinema.empire.sim.tycoon) | Film *exhibition* idle game is different from studio production. Visible review criticizes excessive ads. |
| **Call The Shots – Movie Sim** | Studio budgets, film negotiations, market calendars, streaming, awards; paid; Play 50+ in snapshot. [Store](https://play.google.com/store/apps/details?id=com.catmacho.calltheshots) | Feature breadth possible but cannot be imitated by an unresourced first release; too-small store sample to assess traction. |
| **Movie Studio Tycoon** | Hiring, studio departments, film releases, daily rewards/idle progression; 2026 Android title. [Store](https://play.google.com/store/apps/details?id=com.tinikugames.moviestudiotycoon) | Generic progression is already covered. We would need one meaningful film-craft decision unavailable in generic tycoons. |

**Working takeaway:** The cinema theme is not an open market gap. If film management stays in exploration, it requires a defensible mechanic (e.g., visible storytelling edits or audience-testing feedback), not only making movies and earning ticket sales.

## Cross-genre player-complaint hypotheses (not statistical findings)
1. Intrusive/forced ads erode relaxation and storytelling. Examples: visible reviews for Arrows, Duskwood, Idle Cinema Empire.
2. Disconnected puzzles/story paywalls undermine coherent detective fantasy. Example: Duskwood reviews.
3. Cinematic art does not compensate for short/easy premium content. Example: Monument Valley 2 review excerpts.
4. Tycoon players dislike uninformative statistics and repetitive UI interruptions. Example: Silver Screen Story reviews.
5. A small player audience is vocal about high-quality paid/no-ad games. [Reddit](https://www.reddit.com/r/AndroidGaming/comments/1vsf7qm/do_you_think_premium_games_are_worth_buying_on/) — **self-selected**, no prevalence estimate.
6. Film tycoon players report dissatisfaction with unfinished/excessively narrative experiences in [r/tycoon](https://www.reddit.com/r/tycoon/comments/1m1ynom/best_movie_tycoon_game/); treat as a lead, not a quantified unmet need.

## Business interpretation (explicit uncertainty)
- **Ad-led accessible puzzle:** likely easiest frictionless install, but requires material organic discovery or marketing spend plus retained play; ad yield untested.
- **Premium / trial-unlock story game:** tighter quality promise; acquisition/purchase conversion risk significant, especially across geographies; **no forecast**.
- **Tycoon (premium or fair trial):** more systems depth but heavier tuning and support; movie-specific market scale unclear.
- **Do not** compare 1B free installs against 1M premium installs as if the same unit economics.

## Remaining audit work
- [ ] 60+ review sample (balanced across positive/negative and recent/old) with links, coding schema and bias warnings; current sampled excerpts are not systematic.
- [ ] Hands-on tests of 3 direct competitors per potential finalist where compatible and legitimately accessible.
- [ ] Annotated flow screenshots of onboarding + purchase/ads and short gameplay recording for internal assessment.
- [ ] Regional pricing, storefront competition and discovery keywords (India + potential global audiences) with dated results.
- [ ] Accessibility checks (low-end phone, text scale, color vision, audio-off, offline).
- [ ] Tested original mechanic vs direct comparators; concept scorecard stays blank.