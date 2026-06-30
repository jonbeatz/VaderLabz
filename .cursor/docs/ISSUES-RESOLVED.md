# ISSUES-RESOLVED — VaderLabz

Append-only log of verified fixes. Newest first.

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

**Files:** `_core-scripts/deepseek-api/scripts/litellm-verify.mjs`, `templates/package.json` (`deepseek:test` uses `node` not `powershell -File` on `.mjs`)

---

## 2026-06-29 — START-HERE.md path mismatch and JonBeatz-hardcoded rules

**Symptom:** `AGENTS.md` and `TRUTH.md` tell agents to read `.cursor/docs/START-HERE.md`, but bootstrap placed `START-HERE.md` at repo root. `workflow.mdc` / `global.mdc` referenced JonBeatz paths and MSC deploy flows.

**Root cause:** Skeleton copied JonBeatz rules verbatim without placeholder substitution; bootstrap did not move START-HERE into `.cursor/docs/`.

**Verified recovery / fix:** Move `START-HERE.md` → `.cursor/docs/START-HERE.md`; rewrite rules for VaderLabz; bootstrap now templatizes `.mdc` rules and moves START-HERE after Step 4.

**Files:** `.cursor/docs/START-HERE.md`, `.cursor/rules/workflow.mdc`, `.cursor/rules/global.mdc`, `_core-scripts/shared-profile-content/scripts/bootstrap-new-project.ps1`
