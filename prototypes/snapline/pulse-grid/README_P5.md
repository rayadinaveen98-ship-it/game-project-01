# Snapline Sprint P5 — Live Drawing Experiment

**Stage:** P5 experimental variant C. **Status:** Implemented in browser and automated-tested; physical device and external players not yet verified.

This build preserves approved **Pulse Grid**, both existing course definitions and the P1/P4 mechanics. The Home screen has three test choices:

- **A · Plan & Run:** draw the full route then tap GO.
- **B · Snap & Redirect:** draw, GO, then one paused correction (Course 03 is B-only training).
- **C · Live Drawing:** draw from S; after the first 85 world units the runner automatically starts following the current trail. Continue drawing ahead of it. You may lift and start another stroke at the highlighted trail tip. If the runner reaches the tip, you have 0.75 seconds of fixed-simulation grace to extend it. Hazard movement and collision checks continue during the grace period.

### Current intentional limitations

The grace timer is an experimental interaction rule, not a settled difficulty specification. There is no separate C tutorial level, no audio polish, no game economy, no APK and no hosted Pages link. P5 does NOT select C as the final game.

### Run

Open `standalone.html` locally in a modern browser, or run the browser build from `dist/`. The single HTML contains all CSS and gameplay JS without external requests.

### Tests

`npm run check` (TypeScript 5.8.3, 28 Node tests). Browser QA scripts used Chromium for A, B and C; C desktop mouse and 360×800 / 390×844 / 412×915 synthetic touch. Physical-device testing is still required.

### Fairness and determinism

The runner follows exactly the visible trail. Old trail segments cannot change. The runner does not teleport when more points are appended. All simulation ticks, movement, collision and tip-grace counting are fixed-step. A stationary runner at the trail tip is **still vulnerable to moving hazards**. Attempts use no user accounts or network analytics.
