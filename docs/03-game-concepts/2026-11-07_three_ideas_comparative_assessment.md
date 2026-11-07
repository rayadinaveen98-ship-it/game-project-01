# GP-01 — Three new/revised concept directions: professional assessment

**Report ID:** GP01-CR-005  
**Date:** 2026-11-07  
**Status:** PROPOSED, NOT APPROVED  
**Product objective:** 50% creative quality, 50% commercial viability  
**Sources:** Public official developer pages and store listings, as listed below. NOT hands-on competitor playtesting. Store installation badges are cumulative and do not establish revenue, retention, user acquisition cost or profitability.

## Executive summary

The owner proposed:
1. **C09 / Girl Explorer — untitled:** Play a young girl aged around five or six who explores strange places, solves environmental puzzles and mysteries, and reaches an important destination or unknown world. Inspired by the *broad appeal of exploration* in Dora the Explorer, **not** an adaptation or permission to copy that franchise.
2. **C08 / Snapline Sprint — revisited:** Draw a line/path, then attempt a short, reactive obstacle course (original C08 concept). Working name not trademark-cleared.
3. **C02-R / Cinematic Detective Mystery — revised:** A characterful investigation focused on observation, fair deduction, cinematographic clues, contradictions and narrative progression. C02 name previously flagged for collision; no product title approved.

All three remain open. C09 offers highest character/IP-building potential; C08 the most contained gameplay spike and potentially quickest repeatable prototype; C02-R the best balance of original storytelling and systems-driven mysteries if its clue-authoring pipeline proves sustainable. None is a commercial winner without playtest and distribution evidence.

### No premature commitment

- Genre, final concept, audience, visual bible, title, engine, target platform, monetization and schedule are all **UNDECIDED**.
- Browser interactive experiments are proposed for user testing, not approved production.
- Existing C02/C08 concepts are being refined, not silently replaced; C09 is an additional proposal.
- Historical v0.4 documents and their decisions remain unchanged.

## C09 — Girl Explorer (untitled)

### One-sentence promise
A curious young child journeys through unfamiliar places, observing an extraordinary world, making friends, solving connected environmental mysteries, and progressing toward a personally meaningful destination.

### Genre and audience variants
- **Genre:** Story-driven 2D puzzle adventure with exploration and tactile interactions; optional light platforming only if controls are proven.
- **Audience A (proposal):** All-ages/older family players who enjoy visually rich narrative puzzle games. Young protagonist does not by itself mean preschool audience.
- **Audience B (proposal):** Deliberately child-directed game for 5–8-year-old players. This would require non-reader-friendly onboarding, much gentler difficulty, adult consideration, and rigorous Google Play Families/privacy/ad compliance.
- **Decision required before design lock:** intended PLAYER age and content tone, independent from character age.

### Proposed experience pillars
1. Curiosity rather than combat; player learns by observing cause and effect.
2. Environmental reasoning, not unrelated minigames: puzzles serve the world and the story.
3. Emotional progress is perceptible every 5–10 minutes in a prototype, not only at the ending.
4. Original heroine design, rules and world; no Dora likeness, wardrobe, catchphrases, talking navigation device, backpack/map formula, copied character relationships, or protected visual features.

### Core loop
Arrive at a location → observe interactions and strange patterns → gather/interpret clues → manipulate environmental mechanism → unlock a meaningful new path → reveal story information → travel onwards.

### Three possible mechanical hooks — experiments, not features
- **Observation and restoration:** find how a place used to work, then repair it using visual cause-and-effect clues (preferred first spike due to clarity).
- **Reality and imagined function:** tap an ordinary object to reveal an alternate interpretation, but impose strict observable rules. Art cost may double.
- **Layered storybook:** fold or slide scene layers to reveal physical passages. Existing map-rearrangement mechanics (Carto) require substantial differentiation.

### Visual style options
- **Layered cut-paper/storybook 2D:** soft shapes, hand-textured layers, modest parallax, fixed orthographic camera, reusable character rig. Preferred exploratory look, contingent on testing.
- **Atmospheric illustrated silhouette:** dramatic color/light, lower character-detail load, higher risk of mis-signaling horror to younger players.
- **Painterly frame-by-frame animation:** beautiful but high cost and inconsistent with initial single-developer pipeline; not a first choice.
Art production rules: style bible, reusable master rig, approved turnaround sheet, fixed palette, texture library, animation list, screenshots from real engine; do not assume concept art translates to shipping quality.

### Potential first playable slice
One compact connected environment, one fully animated main character with limited actions, one side character, two connected environmental puzzles, one mystery, one meaningful payoff; proposed 10–15 minutes of content. No giant world, combat, voice cast, procedural map or large cast in first slice.

### Production/release
- Systems: navigation, hotspot interaction, puzzle state, save/checkpoint, hint system, scene/state manager, camera, mobile accessibility.
- High-cost drivers: illustrated backgrounds, animation cycles, handcrafted puzzles, dialogue/visual narrative, localization.
- Monetization hypothesis: free introductory chapter then single unlock; alternative premium upfront; avoid frequent interruptive ads. Revenue only if conversion and willingness to pay are validated.
- Critical policy: Google Play evaluates declared target audience AND marketing/visual appeal. If intentionally child-directed, comply with Families and relevant legal rules; ad SDK and data collection restrictions apply. Child protagonist != automatically a child audience, but design can impact assessment.
- Falsification: first-time players fail to understand world interactions, skip story, or production takes too many unique assets per minute.

### Competing benchmarks
- Lost in Play: young sibling exploration and imaginative puzzle worlds, mobile, 30+ minigames/puzzles; confirmed strong overlap; requires original core mechanic and story.
- Carto: young heroine map manipulation and reunification; rules out map-reassembly-as-novel-hook.
- Monument Valley 3 and Little Nightmares: different visual/mood benchmarks, not direct substitutes.
This concept's **key issue is distinctiveness and cost**, not whether such a genre exists.

## C08 — Snapline Sprint (working name)

### One-sentence promise
In very short sessions, a player draws a route that a moving character must navigate while hazards change, trying to reach a clear finish with a limited ink budget.

### Genre / audience
Arcade drawing/action-puzzle or hybrid-casual; broad mobile audience if control is fair; no age targeting decided.

### Essential question
Is the player planning the route, improvising a rescue in real time, or manipulating moving geometry as a puzzle? Those are distinct games and require competing tests.

### Candidate core-loop variants
- **S-A Pre-draw then execute:** scan course → draw route → press run → observe physics → retry. Very intuitive but closest to established competition.
- **S-B Time-window redraw:** draw a short-lived next segment as runner moves; real-time judgment and precise feedback. Higher dexterity burden.
- **S-C Two-phase route strategy:** limited ink allocated to a persistent safety route and an emergency correction. Potential depth; less immediate clarity.
Do not combine variants before testing.

### Technical minimum
Continuous touch sample path, curve smoothing, collision/hit testing, deterministic or seeded runner movement, frame-independent physics, restart/ghost/undo, level reset, touch scaling, Android-safe frame budget.
Content experiment: 12–15 tiny stages covering gaps, movers, timing gates, moving platforms and ink scarcity; proposal only. Investigate whether a level generator can produce fair, solvable states and how content costs scale.

### Visual options
- Bold neon motion graphics on dark canvas: strong visual identity, low art burden, but resembles many arcade games.
- Warm pencil/sketchbook: immediately communicates drawn routes; visual overlap with drawing games.
- Minimal courier silhouette + precise trajectories: best for readability and automated visual tests.
Avoid visual effects that obscure hitboxes or make failure look random.

### Business hypothesis
Free-to-play with limited, voluntary reward ads (cosmetics/extra optional retries) and a fair one-time remove-ads purchase. Ad-led economics depends on retained users, impressions per player, fill rate, eCPM, and acquisition/distribution—not simply downloads. A good prototype is not evidence of profitability. Forced ads after every short failure damage trust.

### Competitor collision
- **Strike a Line** explicitly uses “Draw bridges and paths to help Milo reach the goal” with moving hazards and an ink reserve; strikingly close to the baseline C08 pitch.
- **Line Rider** has long established user-drawn traversal lines.
- **Draw Climber** has 100M+ Google Play downloads and monetization with ads/IAP; changes avatar motion by drawing.
- **Save the Doge** has 100M+ downloads, line-drawing physics protection; shows market demand but saturation.
Differentiation must come from a genuinely tested control/timing mechanic, not a renamed courier or different colors.

### Production/release
- Low artwork per level, but game feel, determinism, input latency and replay depth are make-or-break.
- First playable slice: 3 variants, same obstacle set, 3 attempts each; capture comprehension and voluntary replay.
- Falsification: viewers do not understand why failure happened, or no desire to replay after several minutes.

## C02-R — Cinematic Detective Mystery (revisited)

### One-sentence promise
Investigate layered cases by observing stylized scenes, comparing testimony against visual evidence, rebuilding timelines, and making only conclusions that clues logically support.

### Genre / audience
Single-player narrative mystery / deduction / investigative puzzle; proposed older teen/adult audiences; not approved.

### Why “cinematic” must be a mechanic
A film look alone is not differentiating. The player should be able to compare camera angles, continuity, reflections, timed shots, shadows, framing and chronology as **evidence**. A player need not know filmmaking terminology. All conclusions must be derivable from on-screen facts and fixed scene rules.

### Proposed loop
Arrive at an incident → inspect scene and camera views → collect clues → interview/sort statements → link objective records and contradictions → reconstruct sequence of events → submit a reasoned conclusion → unlock story and next case.

### Mechanic experiments
- **D-A Contradiction board:** link one exact statement with adequate evidence and explicit world rule; v0.4 has 3 constructed examples.
- **D-B Camera perspective audit:** compare two rendered views of the same room; evidence depends on occlusion, light and geometry, with no random object-hunting.
- **D-C Timeline reconstruction:** put evidence-backed actions in a sequence; test whether players can justify their order.
Favor a combined vertical slice only after individual elements test well.

### Visual options
- Illustrated noir / 2D cinematic panels: repeatable backgrounds, layered lighting, expressive character portraits, stylized clue zooms; recommended for first feasibility.
- Isometric crime-scene dioramas: visually rich but expensive environment and interactive camera controls.
- Live-action/photorealistic FMV: high capture, cast, location and consistency costs; not recommended at initial scope.

### Commercial hypothesis
Free first case then one-time episode or season unlock (e.g., short coherent case packs); alternatively a premium full mystery. Rewarded ads for minor convenience are possible but must not hide essential evidence or compromise fairness. No ad inside dramatic reveals.
One 2–3 hour detective game can work without daily retention if it produces sales and good word of mouth; don't impose casual arcade engagement metrics on a finite narrative game.

### Competitors
- **Duck Detective: The Secret Salami:** first two levels free and full unlock; Google Play listing advertises a 2–3 hour cozy mystery and 500K+ installs.
- **Tiny Room Stories: Town Mystery:** 10M+ Google Play installs with physical room exploration and puzzle progression.
- **Duskwood:** 10M+ Google Play installs, ad/IAP-backed phone-message investigation.
- **The Roottrees are Dead:** strong deduction-led investigation precedent; original prototype eventually remade with new art, voice and refined gameplay.
Existing audience validates genre interest, not new-product revenue.
### Main risks
- Fair-play narrative logic is costly to author and QA.
- Excessive text on phones causes fatigue; improve scene interaction and typography.
- Visual clues are fragile to screen size/low vision.
- First episode must be satisfying without predatory cliffhangers.
- Too few authored cases limits total content value; assess hours of writing/QA per case.
- Mystery/film references are not blanket rights to use clips from existing movies; all primary visual assets must be original or licensed.

### First playable slice
One self-contained case (8–12 clues, 2–3 characters or statements, one scene with alternate views, one timeline reconstruction, one conclusion) targeting 10–15 minutes; narrative epilogue. Initial story, character, and exact evidence are all proposed and must be designed.

### Falsification
Players can guess conclusions without reading evidence, repeatedly need hidden facilitator assumptions, or find investigation mechanically identical to spotting differences.

## Comparisons — directional, qualitative, not validated scores

| Factor | C09 Girl Explorer | C08 Snapline Sprint | C02-R Cinematic Detective |
| --- | --- | --- | --- |
| Primary player emotion | Wonder, attachment | Momentum, mastery | Curiosity, discovery |
| Core action | Explore / manipulate | Draw / execute / retry | Inspect / connect / deduce |
| Prototype technical burden | Medium | Low–Medium | Low–Medium |
| Full art/animation burden | High | Low–Medium | Medium |
| Ongoing authored content burden | High | Medium | High |
| Biggest novelty collision | Lost in Play, Carto | Strike a Line, Draw Climber | Golden Idol, Duck Detective, Tiny Room |
| Most plausible initial revenue model | Opening chapter + unlock | Free + light ads / no-ads | Free case + unlock |
| Biggest commercial risk | Upfront cost versus paid conversion | Distribution and retention | Story content cost versus episodic conversion |
| IP/brand-building opportunity | High but unproven | Medium, tied to brand style | High if characters/cases resonate |
| Natural first-play session | 10–20 min exploration | 20–90 sec attempt | 10–20 min investigation |
| Audience/platform policy caution | Child-directed classification if applicable | Advertising quality / privacy | Content rating and sensitive themes |

**Qualitative judgments are not empirical scores**. No changes to the historical blank weighted concept scorecard until comparable player evidence exists.

## Separate, fair prototype gates

**C09:** browser-based one-area exploration scene with 2 causally linked puzzles, hotspot guidance, narrative payoff and small reusable character rig.
- Observe: percentage who discover first legal action; where they get lost; sense of purpose; voluntary exploration; time spent versus assets required.

**C08:** three drawing-control variants on the SAME obstacle set, with input timing instrumentation, seeded failure/replay and concise feedback.
- Observe: perceived control; fairness of failure; touch precision; first-play understanding; voluntary retry.

**C02-R:** short evidence investigation with self-contained case, readable clue board, inspectable scene and multiple outcome checks.
- Observe: proof-based deductions; guessing frequency; ambiguity; reading/interaction burden; desire for next case.

Explore 5–8 uninformed playtesters per slice for early usability, and at least 8–12 for first-impression comprehension; these are exploratory, not statistical thresholds. Include negative findings, respect consent/anonymity, and never invent testers.

## Decision gates / what is open

1. C09: story destination and intended player age group; mechanism distinct from Lost in Play and Carto.
2. C08: drawing action mode and why it is not a small variant of Strike a Line; retention and distribution experiment.
3. C02-R: what “cinematic investigation” offers as provable deduction, minimum authoring-cost baseline.
4. All: art consistency feasibility, realistic content production time, accessibility and Android touch behavior, legal/asset rights, monetization acceptability, build environment proof.
5. **No single concept approved.** No game-engine code or commercial results are claimed.

## Proposed next actions
1. Preserve this assessment as a PROPOSED report in GitHub; create tracking issue.
2. Design three ultra-small touch-browser prototypes, not full games. Scope may still be revised.
3. Conduct repeated internal QA and then independent human testing; record results.
4. Pilot content creation costs: 2 new puzzle scenes, 10 new arcade obstacles, one new mystery case, all with tracked authoring/QA time.
5. Update the original scorecard and seek explicit owner approval for one direction only after evidence.

## References (verified public sources, accessed Nov 7, 2026)
- Lost in Play official press kit: https://www.happyjuice.games/press-kit
- Lost in Play Google Play: https://play.google.com/store/apps/details?id=com.snapbreak.lip
- Apple Developer interview on Lost in Play: https://developer.apple.com/news/?id=n4w6zydm
- Carto publisher listing: https://www.playstation.com/en-in/games/carto/
- Strike a Line official site: https://strike-a-line.brighteng.org/
- Draw Climber Google Play: https://play.google.com/store/apps/details?id=com.appadvisory.drawclimber
- Save the Doge Google Play: https://play.google.com/store/apps/details?id=com.miracle.savethedoge.an
- Duck Detective Google Play: https://play.google.com/store/apps/details?id=com.snapbreak.duckdetective
- Tiny Room Stories Google Play: https://play.google.com/store/apps/details?id=com.kiarygames.tinyroom
- Duskwood Google Play: https://play.google.com/store/apps/details?id=com.everbytestudio.interactive.text.chat.story.rpg.cyoa.duskwood
- The Roottrees are Dead creator: https://jjohnstongames.itch.io/the-roottrees-are-dead
- Google Play Families policy: https://support.google.com/googleplay/android-developer/answer/9893335?hl=en
- Google Play target audience/content guidance: https://support.google.com/googleplay/android-developer/answer/9867159?hl=en-IN
- Google Play developer registration: https://support.google.com/googleplay/android-developer/answer/6112435

**Research limitation:** These are public documentation/listing comparisons; not competitor hands-on sessions, sales reports, qualitative user interviews, novelty clearance or legal advice. No factual promises of downloads, revenue, or profitability.
