# JonBeatz — Master Command Reference

**Profile root:** `D:\Hermes\projects\JonBeatz`  
**Last updated:** 2026-06-25 · **Version:** 4.0.0

---

## Session rituals

| Command | What it does | When |
|---------|--------------|------|
| `npm run dev` | Launch Next.js local Playground UI on **localhost:3000** | Anytime |
| `npm run build` | Compile Playground UI static files | Prior to ship |
| `npm run session:start` | LM Studio preflight + probes + Telegram ensure | Light probe |
| `npm run session:start -- -Full` | Mem0 + DeepSeek + **ngrok** + image doctor | **Start Project** |
| `npm run session:start -- -WithDeepSeek` | Also start DeepSeek stack | Paid cloud prep |
| `npm run session:start -- -WithDeepSeek -WithNgrok` | DeepSeek + ngrok | Cursor Agent boot |
| `npm run session:stop` | Session closeout summary | **End Project** |
| `npm run session:stop -- -StopDeepSeek -StopComfy` | Stop DeepSeek + ComfyUI | End + free VRAM |
| `npm run session:stop -- -StopGoogleApi` | Legacy alias for `-StopDeepSeek` | Same |
| `npm run doctor` | **Unified** health: services, env, image, Google, git | Anytime |
| `npm run boot:setup` | Refresh Master-Startup + DeepSeek + Telegram shortcuts; remove duplicate boot `.vbs` | After boot script changes |
| `npm run boot:doctor` | Audit shortcuts, single Startup entry, ports, LM Studio tuning | Troubleshoot boot |

---

## Boot workflow (PC login)

| Item | Path / command |
|------|----------------|
| **Windows Startup** | `Startup\Master-Startup.lnk` only (hidden) → `Master-Startup.ps1` |
| Boot sequence | DeepSeek + ngrok → Telegram gateway → Hermes Desktop (minimized) |
| Manual boot | `D:\Hermes\Master-Startup.lnk` or `Master-Startup.ps1 -ShowWindows` |
| DeepSeek only | `D:\Hermes\My-DeepSeek-API.lnk` or `npm run deepseek:on` |
| Telegram reconnect | `D:\Hermes\Start Telegram Gateway.lnk` or `npm run telegram:gateway` |

**Do not** use `Master-Startup-Relay.vbs` — duplicates boot. `npm run boot:setup` removes it.

---

## Mem0 (personal memory)

| Command | What it does |
|---------|--------------|
| `npm run mem0:preflight` | Verify LM Studio up; load **qwen3-4b-instruct-2507** @ 32K if no model loaded (no swap) |
| `npm run mem0:add -- "text"` | Add memory directly (`infer=False`, reliable) |
| `npm run mem0:add:infer -- "text"` | Add memory with LLM fact extraction (`infer=True`) |
| `npm run mem0:search -- "query"` | Semantic search personal memory |
| `npm run mem0:list` | List all personal memories |
| `npm run mem0:seed:profile-jedi` | Re-seed Profile Jedi knowledge (infer=False) |

**Requires:** LM Studio local server on **port 1234**.

---

## Image workflow (Hugging Face + ComfyUI)

| Command | What it does |
|---------|--------------|
| `npm run env:setup` | Create `.env.local` from template; merge HF_TOKEN from MSC if present |
| `npm run image:doctor` | Verify HF_TOKEN, ComfyUI paths, Python deps, output dir |
| `npm run image:gen -- "prompt"` | Cloud FLUX.1-schnell → `D:\Hermes\assets\media\JonBeatz` |
| `npm run image:gen:open -- "prompt"` | Same + open in default viewer |
| `npm run image:fal -- "prompt"` | fal.ai pay-per-use bonus (`FAL_API_KEY`) |
| `npm run image:fal:open -- "prompt"` | fal + open in default viewer |
| `npm run comfy:start` | Start shared ComfyUI (:8188) with VRAM guards |
| `npm run comfy:stop` | Stop ComfyUI only (keeps LM Studio) |
| `npm run comfy:restart` | Restart ComfyUI |
| `npm run comfy:status` | JSON: port, queue, PIDs |
| `npm run comfy:repair-symlinks` | Recreate ComfyUI model symlinks (H:\LLM_VAULT → models/) |
| `npm run comfy:compare -- "prompt"` | Run all txt2img workflows + HF cloud comparison |
| `npm run lmstudio:audit` | LM Studio vault + API health check |
| `npm run comfy:idle-watcher` | MSC idle watcher daemon (suggest stop after 15m idle) |

**Docs:** [IMAGE-WORKFLOW.md](./IMAGE-WORKFLOW.md) · [COMFYUI-MODELS.md](./COMFYUI-MODELS.md) · [VRAM-IMAGE.md](./VRAM-IMAGE.md)

**Profile commands** (PowerShell profile, require ComfyUI): `gen-image-local`, `edit-image`, `inpaint-image`, `upscale-image`, `generate-video`, `animate-image`.

---

## Hermes & Google API

| Command | What it does |
|---------|--------------|
| `npm run desktop` | Launch Hermes Desktop (JonBeatz profile) |
| `npm run hermes:lmstudio` | Smart-load **qwen3-4b-instruct-2507** @ 32K (skips if already loaded) |
| `npm run lmstudio:dedupe` | Remove duplicate LM Studio instances (`qwen3-4b` + `qwen3-4b:2`) |
| `npm run lmstudio:switch -- -Model <id>` | Unload other LLMs, load target (before heavy picker switch) |
| `npm run hermes:local` | Set **active** Hermes model to LM Studio default (providers stay dual-registered) |
| `npm run gcp:billing-stop` | Stop LiteLLM/ngrok + switch **active** Hermes model to local LM Studio |
| `npm run gcp:billing-status` | Show LM Studio vs LiteLLM billing mode |
| `npm run gcp:vertex-on` | Re-enable Vertex via LiteLLM (paid) |
| `npm run sync:deepseek-env` | Sync DeepSeek keys from JonBeatz `.env.local` → `deepseek-api/.env.local` |
| `npm run deepseek:ngrok` | Full start + ngrok tunnel (Cursor Agent HTTPS) |
| Shortcut | `D:\Hermes\My-DeepSeek-API.lnk` — sync env + LiteLLM :4000 + Hermes `deepseek-v4-pro` |
| `npm run deepseek:shortcut` | Recreate `My-DeepSeek-API.lnk` (+ Desktop copy) |
| `npm run stop` | Alias for `gcp:billing-stop` |
| `npm run google:doctor` | OAuth token + LiteLLM + setup.py --check |
| `npm run google:status` | JSON status for agents |

## Telegram (iPhone ↔ PC)

| Command | What it does |
|---------|--------------|
| `npm run sync:telegram-env` | Sync `TELEGRAM_*` from `.env.local` → all Hermes profile `.env` files |
| `npm run telegram:ensure` | Sync creds + start gateway for active profile |
| `npm run telegram:gateway` | Full reconnect (LiteLLM + sync + gateway + ping) — same as `D:\Hermes\Start Telegram Gateway.lnk` |
| `npm run telegram:shortcut` | Recreate `Start Telegram Gateway.lnk` (+ Desktop copy) |
| `npm run telegram:sessions` | List recent Telegram chat sessions (Desktop TELEGRAM sidebar data) |
| `npm run telegram:doctor` | Audit creds, gateway, LiteLLM, duplicate pollers |
| `npm run telegram:test` | Send UTF-8-safe boot-style test notification |
| `npm run notify` | Send custom alert (`$env:TELEGRAM_MESSAGE` recommended) |

**Docs:** [TELEGRAM-WORKFLOW.md](./TELEGRAM-WORKFLOW.md)

**Pitfall:** Hermes Desktop UI ≠ Telegram listener. Gateway must be running and profile `.env` must have `TELEGRAM_BOT_TOKEN`. Desktop UI is optional for phone chat; use TELEGRAM sidebar or `telegram:sessions` to view phone threads on PC.

**Shortcut (one-click local prep + Desktop):** `D:\Hermes\Start Hermes Desktop (JonBeatz).lnk`  
Script: `D:\Hermes\projects\_core-scripts\hermes-desktop\Start-JonBeatz-Hermes-Desktop.ps1`

Google API scripts delegate to `D:\Hermes\projects\_core-scripts\google-api\scripts\`.

---

## Switching between DeepSeek and LM Studio in Hermes

**Dual-provider config** (jonbeatz `config.yaml`):

| Provider slug | Endpoint | Models |
|---------------|----------|--------|
| `local-127.0.0.1:4000` | LiteLLM `:4000` | `deepseek-v4-pro`, `deepseek-v4-flash` |
| `local-lm-studio-(free)` | LM Studio `:1234` | `qwen3-4b-instruct-2507`, `qwen3.5-9b`, `qwen2.5-coder-32b-instruct`, `deepseek-r1-distill-qwen-14b` |

**Desktop picker (preferred):** Hermes Desktop → model menu → **Refresh Models** → pick from **LOCAL DEEPSEEK LITELLM (PAID)** or **LOCAL LM STUDIO (FREE)**. Use **Edit Models…** to show/hide rows.

**LM Studio must already be running** (app open → Developer → Local Server → **Running** on `:1234`). Hermes does **not** launch the LM Studio app — it talks to the local server only. When you pick a local model, Hermes sends chat to `:1234`; you'll see the model appear in LM Studio's **Loaded Models** panel (Hermes may JIT-load on first message for models not pre-loaded).

**Avoid duplicate loads:** `hermes:lmstudio` and Mem0 preflight use smart-load (skip if same model already loaded). If you see `qwen3-4b` twice (`:2` suffix), run `npm run lmstudio:dedupe`. Switching local models: `npm run lmstudio:switch -- -Model qwen3.5-9b` (unloads previous LLM first).

| Command | What it does |
|---------|--------------|
| `npm run hermes:lmstudio` | Smart-load default **qwen3-4b-instruct-2507** @ 32K (no duplicate) |
| `npm run lmstudio:switch -- -Model qwen3.5-9b` | Unload other LLMs, load target model |
| `npm run lmstudio:dedupe` | Eject duplicate instances (`model` + `model:2`) |

**CLI default switch** (sets active `model:` block only — both providers stay registered):

| Goal | Command |
|------|---------|
| Paid DeepSeek default | `npm run deepseek:on` |
| Free local default | `npm run hermes:local` or `npm run gcp:billing-stop` |
| Billing status | `npm run gcp:billing-status` |

**Offline:** Start LM Studio server → `npm run hermes:lmstudio` → pick a local model in Desktop — internet optional once loaded.

---

## DeepSeek + LiteLLM (active paid cloud)

**Docs:** [AI-Master-Plan.md](./AI-Master-Plan.md) · [DeepSeek-Master.md](./DeepSeek-Master.md) · [Google-Cloud.md](./Google-Cloud.md)

| Command | What it does |
|---------|--------------|
| `npm run deepseek:on` | Start LiteLLM (DeepSeek yaml, **--keep-gateway**) + switch Hermes to `deepseek-v4-pro` |
| `npm run deepseek:off` | Stop LiteLLM + switch Hermes to local qwen3-4b-instruct-2507 |
| `npm run deepseek:status` | Probe `:4000/v1/models` + Hermes model line |
| `npm run deepseek:test` | One-shot LiteLLM chat completion smoke test |

**Ngrok (Cursor Agent):** From `_core-scripts/google-api`: `npm run msc:litellm:start:ngrok` — use HTTPS URL + `/v1` in Cursor Override. Localhost `:4000` fails Agent ("private networks forbidden").

**Cursor:** `deepseek-v4-pro` + `sk-jonbeatz-deepseek-2026`. OpenRouter alias `deepseek-v4-pro-or` only if Agent breaks on direct path.

**Emergency Vertex rollback:** `npm run gcp:vertex-on` — `litellm_config.vertex.yaml` only; GCP billing risk.

---

## Logging & maintenance

| Command | What it does |
|---------|--------------|
| `npm run version:sync` | Sync README badges + TRUTH/MASTER-COMMANDS from `package.json` (Python UTF-8) |
| `npm run hermes:tune` | Apply Hermes Desktop display + timeout tuning (jonbeatz profile) |
| `npm run release` | Tag `vX.Y.Z`, push, publish GitHub release (`--latest`) |
| `npm run log:session -- "summary"` | Append to `project-log.md` |
| `npm run log:fix` | Append to `ISSUES-RESOLVED.md` (interactive) |
| `npm run log:fix -- --issue "..." --cause "..." --solution "..."` | Non-interactive fix log |
| `npm run backup:project` | Interactive backup (Standard or Full, robocopy) |
| `npm run backup:standard` | Standard backup — skips node_modules, .next, output, logs |
| `npm run backup:full` | Full mirror — includes everything |
| `npm run backup:quick` | Standard quick — auto `jonbeatz-project-v{N}-{a-z}`, no prompts |
| `npm run backup:quick:full` | Full quick — auto folder name, no prompts |
| `npm run backup:hermes-profile` | Hermes runtime only → `hermes-profile-latest/` (config.yaml, .env, memories) |
| `npm run backup:profile` | Alias for `backup:quick` (legacy phrase) |
| `npm run backup:clean` | Retain 10 newest `jonbeatz-project-v*` folders |

**Backup root:** `G:\Hermes_Project_BackUpz\JonBeatz` (`JONBEATZ_BACKUP_ROOT` in `.env.local`). Each backup includes `_hermes-profile-snapshot/jonbeatz/` (`config.yaml`, `.env`, `memories/` — no logs/sessions). Restore Hermes: copy `config.yaml` to `%LOCALAPPDATA%\hermes\profiles\jonbeatz\`.

| `npm run python:setup` | `pip install -r requirements.txt` |
| `npm run draven:speak -- "text"` | Draven TTS — OmniVoice (ritual + explicit only; Ryan fallback) |
| `npm run draven:voice-test` | Short OmniVoice test phrase |
| `npm run draven:omni-daemon` | Warm OmniVoice model on `:18776` (lazy-started by speak) |
| `npm run draven:omni-daemon -- -Stop` | Stop OmniVoice daemon |

**Voice policy:** `DRAVEN_VOICE_POLICY=ritual` — no auto-read of replies or Mem0 recall. See [VOICE-WORKFLOW.md](./VOICE-WORKFLOW.md).

| `npm run env:setup` | Create / refresh `.env.local` |
| `npm run dev:recover` | Free port 3000, clear `.next`/cache, `npm install`, `npm run dev` |
| `npm run sync:mcp-env` | Sync project MCP keys from `.env.local` → `.cursor/mcp.json` |
| `npm run obsidian:distill` | Scan `I:\Vader_Vault` for weekly ReCall.md candidate notes |

---

## Playground UI

| Command | What it does |
|---------|--------------|
| `npm run dev` | Playground UI @ **localhost:3000** |
| `npm run build` | Production build gate |
| `npm run dev:recover` | Hard recovery when stale `.next` or port conflict |

**API routes (server-side, secrets in `.env.local`):**

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/system/status` | GET | Live port probe: LiteLLM, LM Studio, ComfyUI, ngrok |
| `/api/deepseek/chat` | POST | Proxy chat to LiteLLM `deepseek-v4-pro` |
| `/api/comfyui/status` | GET | ComfyUI port 8188 up/down |
| `/api/telegram/sessions` | GET | Recent iPhone Telegram sessions |

---

## MCP (project)

See **`.cursor/docs/MCP-SETUP.md`**. After editing `.env.local` MCP keys: `npm run sync:mcp-env` → reload Cursor Settings → MCP.

---

## Hostinger (MSC reference)

See **`.cursor/docs/HOSTINGER-REFERENCE.md`**. Deploy runs from MSC repo; MCP + docs available here.

| Command | What it does |
|---------|--------------|
| `npm run sync:mcp-env` | Sync project + **global** MCP (github, tavily, hostinger-*) |

| Command | What it does |
|---------|--------------|
| `npm run docs:sync` | Audit TRUTH / START-HERE / ReCall alignment |
| `npm run docs:update` | Same as `docs:sync` (Cursor hook alias) |

---

## VS Code tasks (keyboard shortcuts)

Open **`JonBeatz.code-workspace`** or folder `JonBeatz` in Cursor.

| Shortcut | Task | npm script |
|----------|------|------------|
| **Ctrl+Shift+B** | Start Session | `session:start` |
| **Ctrl+Shift+E** | End Session | `session:stop` |
| **Ctrl+Shift+Alt+D** | Doctor | `doctor` |
| **Ctrl+Shift+Alt+M** | Search Mem0 | `mem0:search` (prompt) |

One-time install into Cursor user keybindings:

```powershell
npm run vscode:keybindings
```

Bindings apply only when `workspaceFolderBasename == 'JonBeatz'` (Explorer shortcut unchanged in other projects).

Run any task: **Ctrl+Shift+P** → **Tasks: Run Task**.

## Direct PowerShell (when npm wrappers aren't enough)

```powershell
# Mem0 via Python
python scripts/mem0_integration.py --action search --query "priorities"

# Hermes desktop launcher
powershell -File scripts/start-hermes-desktop-jonbeatz.ps1

# Google API (_legacy archived — use DeepSeek)
powershell -File D:\Hermes\projects\_core-scripts\deepseek-api\scripts\start-deepseek.ps1
```

---

## Ports (personal stack)

| Port | Service |
|------|---------|
| 1234 | LM Studio (Mem0 LLM + embedder host) |
| 4000 | LiteLLM |
| 4040 | ngrok inspector |
| 7780 | Profile Jedi app |
| 7781 | Profile Jedi tray supervisor |

MSC Kanban ports (3001/3005/9119) live in the **MyStudioChannel** repo — not started by default here.

---

## jon-beatz.com deploy (personal static site — gold only)

| Command | What it does |
|---------|--------------|
| `npm run dev` | Gold Command Center @ :3000 (local APIs, live dashboard) |
| `npm run site:build:static` | Static export → `out/` — **jon-beatz.com** (gold footer) |
| `npm run site:preview` | Serve `out/` at http://localhost:5055 (pre-deploy QA) |
| `npm run site:package` | Build + zip → `.deploy\jonbeatz-site_<ts>.zip` → deploy **jon-beatz.com** |
| `npm run site:ssh -- "cmd"` | SSH remote command (optional; reads `.env.local`) |

**jonbeatz.dev (red site)** — standalone repo `D:\Hermes\projects\JonBeatz.dev` (GitHub `jonbeatz/JonBeatz-Dev`). Deploy with `npm run site:package` from **that** folder. Runbook: `JonBeatz.dev\.cursor\docs\JONBEATZ-DEV-DEPLOY.md`. The old `:dev` scripts here (`dev:devsite`, `site:package:dev`, etc.) print a redirect message.

**After deploy:** hPanel → target domain → **Performance → CDN → Flush cache** (required on updates; first deploy often skips).

**Stale WordPress icon in hPanel?** Website → **Auto Installer** → Delete WP app (**application only** — do not check installation files). See [JONBEATZ-SITE-DEPLOY.md](./JONBEATZ-SITE-DEPLOY.md) → "Clear stale WordPress label".

**Docs:** [JONBEATZ-SITE-DEPLOY.md](./JONBEATZ-SITE-DEPLOY.md) · env: `JONBEATZ_*` + `HOSTINGER_SSH_*` in `.env.local`

---

## Cursor chat triggers

| Say this | Agent runs |
|----------|------------|
| **Start Project** / **Start Session** | `session:start -- -Full` + Start-Project.md |
| **End Project** / **End Session** | End-Project.md + `session:stop` |
| **update docs** | `docs:sync` / Update-Docs.md |
| **backup profile** / **backup quick** | `backup:quick` |
| **backup project** | `backup:project` |
| **backup full** | `backup:quick:full` |
| **push jon-beatz live** / **update jon-beatz site** | `site:package` + MCP deploy + CDN flush |
| **push jonbeatz.dev live** / **update .dev site** | Open `D:\Hermes\projects\JonBeatz.dev` → `npm run site:package` + MCP deploy `jonbeatz.dev` + CDN flush |

See **[Agent-Runbook.md](./Agent-Runbook.md)** for full copy/paste prompts.

---
