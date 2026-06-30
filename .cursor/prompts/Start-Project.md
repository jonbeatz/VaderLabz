# Start Project - VaderLabz Initialization

## Trigger
**Start Project**, **Begin Project**, **Start Session**, **Cold Start**

---

## Step 1: Session Stack & Engine Check

Run from the **VaderLabz** profile root:

```powershell
npm run session:start -- -Full
```

**Start Project = `-Full`:** Mem0 preflight + **DeepSeek LiteLLM :4000** + **ngrok** (Cursor Agent HTTPS).

| Mode | Command | When |
|------|---------|------|
| **Start Project** | `npm run session:start -- -Full` (or `npm run session:start:full`) | Cold boot - DeepSeek + ngrok + Mem0 |
| Light probes | `npm run session:start` | Quick check only - no paid stack |
| Paid local only | `npm run deepseek:on` | Hermes / Telegram without ngrok |
| ngrok only | `npm run deepseek:ngrok` | Add tunnel (force-restarts proxy with ngrok) |

> **ngrok pitfall:** If LiteLLM `:4000` is already running from a prior session, a plain start may skip ngrok. `session:start -- -Full`, `deepseek:ngrok`, and `start-deepseek.ps1 -Ngrok` all force-restart the proxy so the tunnel always attaches. Confirm `ngrok :4040 [online]` before using Cursor Agent.

**Engine audit:** Verify `D:\Hermes\projects\_core-scripts\` exists - `deepseek-api/`, `telegram-gateway/`, `voice-engine/`, `shared-profile-content/`.

**Voice check:** `DRAVEN_VOICE_POLICY=ritual` in `.env.local` - speak **only** Start greeting, End farewell, explicit "speak/say", optional errors. **Never** auto-read replies.

**Voice greeting (Start Project only):**

```powershell
npm run draven:speak -- "Command Center online Jon. Draven standing by. The Matrix is ready, lets begin."
```

OmniVoice lazy-starts the daemon on first speak (~15s first load). **Do NOT** speak ordinary session summaries aloud.

---

## Step 2: Mandatory Knowledge Sync (INTERNAL ONLY - do not report unless asked)

Read with the editor before running shells or claiming repo state:

1. **`TRUTH.md`** - profile constitution (wins over all other docs).
2. **`.cursor/docs/START-HERE.md`** - daily ritual and source-of-truth order.
3. **`.cursor/docs/ReCall.md`** - recent session history / current focus.
4. **`.cursor/docs/project-log.md`** - last session outcomes.
5. **`.cursor/docs/MASTER-COMMANDS.md`** - command reference (apply known fixes silently).

---

## Step 3: Mem0 & Context Recall

```powershell
npm run mem0:preflight
npm run mem0:search -- "current priorities"
```

If Mem0 returns no results, fall back to **`ReCall.md`** as the source of truth.

---

## Step 4: Environment Handshake (print in chat)

```
Ok Jon - VaderLabz Command Center is ONLINE.

SERVICE STATUS
  LM Studio (1234)       [online/offline]  - free local / Mem0
  DeepSeek LiteLLM (4000)[online/offline]  - paid cloud (Hermes, Telegram, Cursor)
  ngrok (4040)           [online/offline]  - Cursor Agent HTTPS only
  Web dev (3000)         [online/offline]  - not auto-started

RECALL FOCUS
  - [Milestone from ReCall.md]
  - [Priority from Mem0]

What's the mission for today, Operator?
```

---

## Step 5: Paid cloud decision

| Operator needs | Agent action |
|----------------|--------------|
| Free Mem0 / local only | `npm run deepseek:off` if :4000 was left on |
| Hermes / Telegram / Cursor Ask | Already running if **Start Project** (`-Full`) completed |
| Cursor Agent (tools) | Included in **`-Full`** (ngrok). Cursor Override = ngrok HTTPS URL + `/v1` |

**Silent pitfall rule:** If ReCall / project-log documents a known fix, apply it without re-asking.

See **`.cursor/docs/CURSOR-LITELLM-BRIDGE.md`** for the full Cursor model-override + ngrok setup.
