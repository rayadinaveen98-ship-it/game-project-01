# Technical design and feasibility — research baseline
**State:** Candidate architecture only. No build/export proof yet.

## Candidate stack
- **Game engine:** Godot 4.7.2 stable — candidate, not approved. As of 2026-11-07, 4.8 is beta2; avoid a beta baseline without a compelling reason.
- **Language:** GDScript as default candidate for straightforward single-player 2D development; choose only after game scope.
- **Target:** Android-first **proposed**, browser demo optional. APK for direct testing; signed Android App Bundle (AAB) for Google Play.
- **Source control:** dedicated Git repository when project creation approved; no game repo exists yet.
- **Asset pipeline:** source assets separate from generated/exported assets; preserve provenance and reproducibility.

## Facts requiring engineering proof
1. This execution workspace has Java and javac, but **does not currently have Godot, sdkmanager, Gradle or adb available on PATH**. A reproducible remote Linux build setup is therefore **not yet demonstrated**.
2. Godot command-line docs support `--headless --export-release` once editor, templates and Android tooling are installed/configured. This supports the *possibility* of build without local PC installation, not proof that it works here.
3. Godot 4.7's Android docs show SDK Platform 35 in example setup, whereas Google Play requires new standard Android apps to target **Android 16 / API 36** from 2026-08-31. Must explicitly establish a supported API 36 build/target path and inspect the compiled manifest before publishing. May require verified Gradle configuration/patch, upgraded stable engine later, or other supported toolchain.
4. Godot 4.7 docs recommend OpenJDK 17 for Android exports. Godot is MIT-licensed; engine use has no royalty, but preserve its license notices where required.
5. Google Play production distribution may require an enrollment fee and closed testing for applicable newer personal developer accounts. Account status has not been checked.

## Architecture planning checklist (complete after genre selection)
- Scene/state machine boundaries and folder layout
- Data-driven content definitions; deterministic transitions where helpful
- Input abstraction (touch, keyboard optional), safe-area handling
- Save schema, version migrations, backup and recovery plan
- Game loop lifecycle and background/resume logic
- Performance and memory budgets by target devices, measured not guessed
- Crash/error logging and privacy boundaries
- Dependency/license inventory and security update policy
- Tests: unit for deterministic rules; smoke for transitions; packaging checks

## Build pipeline — proposed verification experiment
- [ ] Pin exact Godot stable version and matching export templates.
- [ ] Set up reproducible JDK/Android SDK/NDK/Gradle on a permitted CI/remote runner.
- [ ] Build minimal Godot sample, run headless import and export debug APK.
- [ ] Record build logs and SHA-256 digest of produced APK.
- [ ] Inspect `targetSdkVersion`, architecture, package name and permissions.
- [ ] Install and run on at least one physical Android device; collect test result.
- [ ] Verify reproducibility and update path under the same signing identity.
- [ ] Create secure non-debug release signing policy without exposing keystore/passwords in repository or chat attachments.
- [ ] Export signed AAB and validate Google Play readiness independently of successful APK build.

## Security and continuity
- Never commit keystores, credentials or API secrets.
- Every artifact manifest includes source commit, build time, versionName/versionCode, target API, output hashes and tests run.
- Failed tests block relevant release gates; reports must include what could not be tested.

## Sources
- Official archive: https://godotengine.org/download/archive/
- Godot 4.7 Android docs: https://docs.godotengine.org/en/4.7/tutorials/export/exporting_for_android.html
- Godot command line: https://docs.godotengine.org/en/latest/tutorials/editor/command_line_tutorial.html (latest may describe unstable features; verify against pinned stable)
- Godot MIT license: https://godotengine.org/license/
- Android export documentation: https://developer.android.com/games/engines/godot/godot-export
- Google target API policy: https://support.google.com/googleplay/android-developer/answer/11926878