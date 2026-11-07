# Visual & audio direction bible — template
**State:** The art direction is NOT selected. This document is an enforcement system, not an aesthetic decision.

## Visual north star
- Three descriptive adjectives (e.g. whimsical / tactile / readable) — TBD
- Two explicit *avoid* adjectives/visual failure patterns — TBD
- Moodboard with original references and descriptions, not copied copyrighted assets — TBD
- Target device and pixel density; 2D/3D rendering model — TBD

## Style locks
1. **Shape language:** soft/hard edges, roundness, silhouette vocabulary.
2. **Palette:** primary, secondary, warning, reward and background colors with hex codes and use ratios.
3. **Typography:** legally distributable typefaces, scale and readability hierarchy.
4. **UI grid:** spacing units, touch targets, safe areas, panels, buttons, icons, state variants.
5. **Character and props:** scale chart, line weight, anatomy/proportion rules, perspective and pose consistency.
6. **Materials/lighting:** edge treatment, depth, shadows, outline and texture limits.
7. **Animation:** frame rates, easing, squash/stretch policy, VFX density, readability under motion.
8. **Performance:** sprite atlases, texture sizes, draw calls, particle budget; measured after engine decision.
9. **Brand:** icon, title treatment, store visual constraints and brand-use consistency.
10. **Provenance:** asset source, author, license, attribution, editable master path, export path, revision.

## Art approval workflow
- Concept reference → style exploration (three directions) → chosen target screenshot → approved asset spec → actual exported game screenshot → side-by-side comparison.
- Do not substitute pretty standalone AI art for integrated gameplay quality.
- Maintain an **asset registry** and label temporary art `PLACEHOLDER`; reject release builds with visible placeholders.
- Review all screens at the target phone aspect ratio and in motion, not just static artwork.

## First look test: pass/fail criteria (to customize)
- The player can distinguish interactive objects in a five-second glance.
- Every screen uses the approved palette, type scale, icon system and visual density.
- Characters, backgrounds, VFX and UI share compatible perspective, lighting and stroke language.
- Screens remain legible on a small target device; important actions remain within safe areas.
- Real build screenshots match the approved style target, with discrepancies filed as defects.

## Audio bible
- Emotional palette and musical motifs
- SFX taxonomy: input, success, failure, danger, reward, navigation and ambience
- Relative loudness priorities; ducking rules and mute/accessibility behavior
- Original/licensed source and format metadata; mobile file-size/performance budget
- Audio QA: headphones, speakers, mute/unmute, foreground/background, repeated events