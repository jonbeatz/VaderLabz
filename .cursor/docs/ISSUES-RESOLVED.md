# ISSUES-RESOLVED — VaderLabz

Append-only log of verified fixes. Newest first.

---

## 2026-07-01 — Post-refactor behavioral regressions (14+ broken features after Experience Engine Refactor)

**Symptom:** Three routes (`/`, `/vader-experience-v2`, `/vader-experience-v3`) had multiple broken features after the config-driven engine was extracted from the original standalone route files. Problems included: invisible 3D models, full-model red glow (not blade-only), broken scroll-driven animations, missing/incorrect hero layout, HdrPicker positioned wrong and missing cursor dot toggle, invisible cursor when toggling dot off, missing back-to-top button, missing ContactShadows, wrong per-route defaults, and v2 FX controls hidden.

**Root cause:** The refactor consolidated 4 route files (~5,000 lines) into a shared engine but did not perform a behavioral audit — verifying each pixel, interaction, configuration default, and UI element matched the original per-route behavior. Structural extraction ≠ behavioral preservation.

**Verified fixes applied:**
1. **Model selection/scale** — Each route now uses correct GLB model with original scale (darth_vader_lightsaber.glb at 2.1 for `/`, skywalker_lightsaber.glb at 0.18 for v2/v3)
2. **Blade-only emissive** — `SaberModel.tsx` traverse limits emissive to meshes whose name includes "blade"; non-blade materials untouched
3. **Post-processing restored** — `EffectComposer` + `Bloom` re-added to `Scene3D.tsx` with `ACESFilmicToneMapping`
4. **useFrame animation** — Original mouse parallax + scroll-driven scale/camera orbit logic restored
5. **Hero section** — Full-width dark glass strip with letter-animated VADERLABZ title and action buttons
6. **Chapter scroll animations** — GSAP ScrollTrigger fixed by moving `panelRef` to correct inner wrapper
7. **HdrPicker UI** — Collapsed by default, bottom-left, wider (280px), close button bottom-left
8. **Cursor Dot toggle** — Added `cursorEnabled` state via `useCursor()` context, On/Off pill buttons in Mouse FX accordion section
9. **Cursor visibility** — Removed global `body { cursor: none }`; `CustomCursor` now manages it programmatically per toggle state
10. **Back-to-top button** — `BackToTop` component was never imported in engine.tsx; imported and rendered
11. **ContactShadows** — Added `showContactShadows` config option, wired through engine → Scene3D, enabled on v2
12. **Per-route defaults** — `defaultHdrIndex`, `defaultBloomIndex`, `defaultRotationIndex`, `defaultCameraIndex`, `defaultSaberColorIndex` set on all routes
13. **v2 FX controls** — Changed `showHdrPicker: false` → `true`, enabled all control flags
14. **Footer** — Restored dark glass backdrop with radial glow

**Files changed (15 files):** `app/page.tsx`, `app/vader-experience/page.tsx`, `app/vader-experience-v2/page.tsx`, `app/vader-experience-v3/page.tsx`, `lib/experience-engine/engine.tsx`, `lib/experience-engine/ui/HdrPicker.tsx`, `lib/experience-engine/ui/ChapterSection.tsx`, `lib/experience-engine/scene/Scene3D.tsx`, `lib/experience-engine/scene/SaberModel.tsx`, `lib/experience-engine/types.ts`, `components/CustomCursor.tsx`, `app/globals.css`

**Future prevention:** For structural refactors, migrate one route at a time, comparing against original before moving to next. After extraction, run a behavioral checklist: model display, lighting, post-processing, scroll interactions, UI layout, toggle states, cursor behavior, defaults, per-route differences.

---

## 2026-06-29 — Start Project incomplete: no session:start, ngrok offline, Cursor Agent Provider Error

**Symptom:** First **Start Project** on VaderLabz ran docs/Mem0/voice OK, but switching Cursor Agent to `deepseek-v4-pro` showed **Provider Error** / "trouble finding the resource." `deepseek:status` showed LiteLLM `:4000` online but ngrok `:4040` offline.

**Root cause:** Bootstrapped profile had no `session:start` script (ritual expects `npm run session:start -- -Full` to start Mem0 + DeepSeek + ngrok). LiteLLM was already running from a prior session without ngrok; start helpers skip ngrok when `:4000` is already up. Cursor Agent cannot use `http://127.0.0.1:4000/v1` — it needs the ngrok HTTPS URL.

**Verified recovery / fix:**
1. `npm run session:start -- -Full` (or `node .../litellm-start-detached.mjs --ngrok --keep-gateway`) — force-restarts proxy with tunnel.
2. Cursor → Settings → Models → **Override OpenAI Base URL** = `https://<ngrok-host>/v1` (copy fresh URL after each ngrok restart).
3. Skeleton backport: generic `session-start.ps1` / `session-stop.ps1`, wired in `package.json` template; templatized `Start-Project.md`, `workflow.mdc`, `global.mdc`; bootstrap moves `START-HERE.md` to `.cursor/docs/`.

**Files:** `package.json`, `.cursor/prompts/Start-Project.md`, `.cursor/rules/workflow.mdc`, `.cursor/rules/global.mdc`, `.cursor/docs/START-HERE.md` (moved from repo root). Shared fix in `_core-scripts/shared-profile-content`.

---

## 2026-06-29 — deepseek:ngrok and boot:doctor fail with PowerShell parser error

**Symptom:** `npm run deepseek:ngrok` and `npm run boot:doctor` exit with `The string is missing the terminator` / `Missing closing '}'` on Windows PowerShell.

**Root cause:** Unicode em-dash (`—`) inside double-quoted strings in `start-deepseek.ps1` and `check-shared-version.ps1` breaks the PowerShell 5.x parser on some Windows locales.

**Verified recovery / fix:** Replace em-dashes with ASCII hyphen (`-`) in affected `Write-Host` lines. After fix: `deepseek:ngrok` parses; `boot:doctor` reports skeleton v1.9.0+ artifacts OK.

**Files:** `_core-scripts/deepseek-api/scripts/start-deepseek.ps1`, `_core-scripts/shared-profile-content/scripts/check-shared-version.ps1`, `status-deepseek.ps1`

---

## 2026-06-29 — deepseek:test exits crash code despite PASS

**Symptom:** `npm run deepseek:test` printed `[deepseek:verify] PASS` then crashed with `Assertion failed: !(handle->flags & UV_HANDLE_CLOSING)` (exit `-1073740791`).

**Root cause:** `litellm-verify.mjs` called `process.exit()` while undici keep-alive sockets were still open (Windows libuv assertion).

**Verified recovery / fix:** Close global undici dispatcher before exit; set `process.exitCode` instead of `process.exit()`. `npm run deepseek:test` now exits **0** in ~3s.

---

## 2026-07-01 — session-start.ps1 PowerShell parser error on string interpolation

**Symptom:** `npm run session:start -- -Full` exits with `Unexpected token 's' in expression or statement` / `Missing closing '}'` across multiple blocks. Full session stack (Mem0, DeepSeek, ngrok) does not start.

**Root cause:** String interpolation `($($wait * 5)s)` on line 88 of `session-start.ps1` — PowerShell 5.x parser cannot handle a bare character (`s`) immediately after a nested subexpression closing `)`. The parser error cascades, making later valid blocks also appear broken.

**Verified recovery / fix:** Replaced inline expression with separate variable + format operator:
```powershell
# Before (BROKEN):
Write-Host "$Tag Waiting for LM Studio API... ($($wait * 5)s)" -ForegroundColor Gray

# After (FIXED):
$elapsed = $wait * 5
$msg = ('{0} Waiting for LM Studio API... ({1}s)' -f $Tag, $elapsed)
Write-Host $msg -ForegroundColor Gray
```
Also normalized CRLF line endings and replaced remaining em-dashes with ASCII hyphens in the file for PowerShell 5.x safety.

**Files:** `_core-scripts/shared-profile-content/scripts/session-start.ps1`

---

## 2026-06-29 — START-HERE.md path mismatch and JonBeatz-hardcoded rules

**Symptom:** `AGENTS.md` and `TRUTH.md` tell agents to read `.cursor/docs/START-HERE.md`, but bootstrap placed `START-HERE.md` at repo root. `workflow.mdc` / `global.mdc` referenced JonBeatz paths and MSC deploy flows.

**Root cause:** Skeleton copied JonBeatz rules verbatim without placeholder substitution; bootstrap did not move START-HERE into `.cursor/docs/`.

**Verified recovery / fix:** Move `START-HERE.md` → `.cursor/docs/START-HERE.md`; rewrite rules for VaderLabz; bootstrap now templatizes `.mdc` rules and moves START-HERE after Step 4.

**Files:** `.cursor/docs/START-HERE.md`, `.cursor/rules/workflow.mdc`, `.cursor/rules/global.mdc`, `_core-scripts/shared-profile-content/scripts/bootstrap-new-project.ps1`
