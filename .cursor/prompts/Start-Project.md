# Start Project — JonBeatz Command Center Initialization

## Trigger
**Start Project**, **Begin Project**, **Start Session**, **Cold Start**, **Personal Start**, **Jedi Start**

---

## Step 1: Session Stack & Engine Check

**Local (JonBeatz profile root):**

```powershell
npm run session:start -- -Full
```

**Start Project = `-Full`:** Mem0 preflight + **DeepSeek LiteLLM :4000** + **ngrok** (Cursor Agent HTTPS) + image doctor + Telegram gateway ensure.

| Mode | Command | When |
|------|---------|------|
| **Start Project** | `npm run session:start -- -Full` | Cold boot — DeepSeek + ngrok + Mem0 (default ritual) |
| Light probes | `npm run session:start` | Quick check only — no paid stack |
| Paid local only | `npm run deepseek:on` or **`My-DeepSeek-API.lnk`** | Hermes/Telegram without ngrok |
| ngrok only | `npm run deepseek:ngrok` | Add tunnel if DeepSeek already on :4000 |
| iPhone reconnect | **`Start Telegram Gateway.lnk`** | Gateway dropped |

**Engine audit:** Verify `{{CORE_SCRIPTS}}\` exists — `deepseek-api/`, `telegram-gateway/`, `hermes-desktop/`, engines.

**Voice check:** `DRAVEN_VOICE_POLICY=ritual` in `.env.local` — speak **only** Start greeting, End farewell, explicit "speak/say", optional errors. **Never** auto-read replies.

**Voice greeting (Start Project only):**

```powershell
npm run draven:speak -- "Command Center online Jon. Draven standing by. The Matrix is ready, lets begin."
```

OmniVoice lazy-starts daemon on first speak (~15s first load). Optional pre-warm: `npm run draven:omni-daemon`.

**Do NOT** speak ordinary session summaries aloud.

---

## Step 2: Mandatory Knowledge Sync (INTERNAL ONLY — Do not report unless asked)
2. **`HISTORY.md`** — (Root) Last 5 entries for pitfalls/fixes. Apply known fixes silently.
3. **`ENGINEERING.md`** — Images/VRAM workflows.
4. **`INFRASTRUCTURE.md`** — Ports and `_core-scripts` layout.
5. **`DeepSeek-Master.md`** — Paid cloud stack (when using DeepSeek).

---

## Step 3: Mem0 & Context Recall

```powershell
npm run mem0:preflight
npm run mem0:search -- "current priorities"
```

Read **`ReCall.md`** and latest **`project-log.md`**.

---

## Step 4: Environment Handshake (Print in chat & Voice Welcome)

```
Ok Jon — JonBeatz Command Center (D: Drive) is ONLINE.

CORE ENGINES
  Voice Engine (Mouth) [ready]
  Image Engine (Eyes)  [ready]
  Model Engine (Brain) [ready]

SERVICE STATUS
  LM Studio (1234)       [online/offline]  — free local / Mem0
  DeepSeek API (4000)    [online/offline]  — paid cloud (Hermes, Telegram)
  ngrok (4040)           [online/offline]  — Cursor Agent HTTPS only
  Hermes TG Gateway      [online/offline]
  Profile Jedi (7780)    [online/offline]

SHORTCUTS
  My-DeepSeek-API.lnk         — start paid stack
  Start Telegram Gateway.lnk  — reconnect iPhone

RECALL FOCUS
  • [Milestone from ReCall.md]
  • [Priority from Mem0]

What's the mission for today, Operator?
```

**MANDATORY VOICE GREETING:** `npm run draven:speak -- "Command Center online Jon. Draven standing by. The Matrix is ready, lets begin."` — **OmniVoice** (daemon warm ~3s after first load). Fallback: Edge Ryan.

---

## Step 5: Paid cloud decision

| Jon needs | Agent action |
|-----------|--------------|
| Free Mem0 / local only | `npm run deepseek:off` if :4000 was left on |
| Hermes / Telegram / Cursor Ask | Already running if **Start Project** (`-Full`) completed |
| Cursor Agent (tools) | Included in **`-Full`** (ngrok). Cursor Override = ngrok HTTPS URL + `/v1` |

**Silent pitfall rule:** If HISTORY/ReCall documents a known fix, apply it without re-asking.

---

## Step 6: Version milestone branches (v2 → v3 pattern)

1. Bump `package.json` → update HISTORY, ReCall, CHANGELOG
2. `npm run version:sync` + `npm run docs:sync`
3. Commit + push branch
4. `npm run release`

See **`.cursor/prompts/Release-Version.md`** and **`.cursor/docs/VERSION-RELEASE.md`**.
