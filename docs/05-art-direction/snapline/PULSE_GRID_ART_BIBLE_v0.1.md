# Snapline Sprint — Pulse Grid Art Bible v0.1

**Scope:** the first C08 game prototype. Direction A selected by owner November 7, 2026 (DEC-022). Screen-level polish is **pending final review**; color values are implementation tokens proposed within the approved art direction.

## Creative thesis
A *precision arcade instrument*: every line conveys an exact collision path, every hazard has sharp boundaries, every action gives unmistakable feedback. Polished and cinematic through light, spacing and timing—not excessive decoration.

## Palette (P2.1 implementation)
| Role | Hex | Use |
| --- | --- | --- |
| Base screen | `#0B1321` | Main phone screen/background |
| Board | `#0E1C2B` | Playfield dark navy |
| Surface | `#142337` | Cards/panels |
| Primary action / path | `#72F3D8` | GO, active route, start |
| Hazard / finish accent | `#FA977C` | Danger outlines, finish, highlight |
| Primary text | `#F3FBFC` | Headings and critical labels |
| Muted text | `#98B1C1` | Secondary instructions (not success/failure alone) |
| Dividers | `#263E53` | Borders / readable structure |
| CTA dark text | `#0A2430` | Text on mint buttons |

Approximate sRGB WCAG contrast: primary text/base 17.72:1, muted/base 8.32:1, mint/base 13.75:1, dark-on-mint 11.87:1 and coral/base 8.66:1. These computed pairs are a starting point; actual rendered small text, gradients and screen brightness must be checked visually.

## Geometry and typography
- Flat 2D orthographic Canvas, virtual board 360×640, route geometry remains pixel-aligned with collision engine.
- Phone reference 390×844; responsive checks at 360×800, 390×844, 412×915 and desktop 1280×960.
- UI corners: 8–15px for controls/board, 16px for cards; no random inconsistent radius.
- Use system sans; bold, tightly kerned editorial headlines, compact uppercase meta-labels.
- Core gameplay HUD text >=10px where practical; no micro-type as sole meaningful instructions.
- Minimum interactive touch heights around 44–48px, visible keyboard focus.
- Route: mint inner stroke with restrained shadow; white thin highlight for clarity.
- Hazards: filled slate boxes outlined coral WITH diagonal stripes, so risk isn't color-only.
- Start and finish: ringed circles carrying S/F letter labels.

## Motion and feel
- P1 runner fixed step of 1/120 second is unchanged.
- Glow is restrained and never alters hitbox outlines.
- Pause on tab visibility loss; don't advance in background.
- No ambient strobing or motion-only information. Honor prefers-reduced-motion for CSS effects.
- Avoid particle noise on mobile until visual and performance budgets are measured.

## UI flows
**Home:** purposeful single CTA, clear thematic promise, optional illustrative route. Not an inaccessible fake menu.
**Game:** actual board, route draw, GO, reset, pause, help, brief ink budget, active status, Home return.
**Result:** appears only after **real successful P1 simulation**. Displays **actual** ink, simulation time and attempts, with replay/next/home actions. A failed run stays in Game with failure reason to avoid hiding collisions.
**Help:** dismissible overlay explaining real rules. No disabled decorative mute button.

## In-engine fidelity policy
1. Treat the P2.1 captured browser screenshots as review candidates. Do not label them final approved visual references until owner accepts.
2. All feature changes must be accompanied by screenshot comparisons at identical course coordinates and viewport.
3. No third-party fonts, stock images, game clips, franchise artwork or unlicensed assets. P2.1 uses only original vector/CSS primitives and system font.
4. A/B/C visual lab remains archived in GitHub, but Pulse Grid is the active game direction.

## Remaining visual choices
Final character style/animation, optional sound, success/failure transitions, path trace embellishments, course thumbnails, visual branding refinements, final accessibility review and art-bible ratification.
