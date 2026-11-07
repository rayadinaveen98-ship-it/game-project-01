# Quality strategy — release must earn its status

## Test pyramid
1. **Deterministic rule tests:** scoring, timers, unlocking, RNG seeds, save migrations, challenge logic.
2. **Integration tests:** menu→game→pause→resume→result→retry; persistence after restart; input across scenes.
3. **Visual/audio regression:** compare actual captures to approved references for each aspect ratio; sound priority and mute handling.
4. **Device testing:** performance, frame pacing, memory, touchscreen response, screen cutouts, app lifecycle, low-end Android devices.
5. **First-time player observation:** can a new player understand controls and the objective without external explanation?
6. **Release tests:** package, signer, manifest, target API, install/update, offline start, crash-free smoke, store/policy/rights.

## Minimum playable-build acceptance checklist
- [ ] Main menu launches and gameplay starts without errors.
- [ ] Input works at portrait/landscape orientation confirmed in the GDD.
- [ ] Main mechanic produces expected feedback and deterministic results where specified.
- [ ] Pause, resume, restart, app background/foreground behave safely.
- [ ] Win/loss/retry flow is complete and understandable.
- [ ] No soft-locks, invisible controls, clipped interactive UI or placeholders in accepted slice.
- [ ] Audio controls operate correctly; sound does not overwhelm important feedback.
- [ ] Save data is retained and migrated or intentionally not applicable.
- [ ] Test APK installed and exercised on a real device, with device/OS recorded.
- [ ] Build metadata and SHA-256 recorded, including exactly which tests were run.

## Defect policy
- **Blocker:** crashes, loss of saved progress, game cannot proceed, security/rights/store compliance flaw, broken packaging/signing.
- **Critical:** key mechanic fails, severe performance issue, major visual inconsistency obscures gameplay.
- **Major:** confusing onboarding, unresponsive flows, significant sound/visual defects.
- **Minor:** cosmetic mismatches without functional impact.
- Blockers/critical issues must be resolved or the relevant gate cannot pass. Major issues require explicit triage and acceptance.

## Performance targets
Specific FPS, memory size, battery, package-size and load-time thresholds must be determined *after* genre, engine, assets and minimum supported device are chosen. Do not invent target numbers that have not been tested or approved.

## Test evidence template
Test ID | build ID | device/OS | expected | observed | PASS/FAIL/NOT RUN | log/screenshot | issue | owner/date.