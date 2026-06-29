# End Project — JonBeatz Personal Closeout

## Trigger

**End Project**, **End Session**, **Close Session**, **Session Closeout**, **Personal End**

---

## Step 1: Summarize

From conversation + any file changes under `D:\Hermes\projects\JonBeatz`:
- What was accomplished
- What's in progress
- Blockers (if any)

---

## Step 2: Update tracking docs

```powershell
npm run log:session -- "[short title]: [summary of session]"
```

Or append to **`.cursor/docs/project-log.md`**.

Update **`ReCall.md`** and **`HISTORY.md`** as needed.

---

## Step 3: Mem0 (if session was substantive)

```powershell
npm run mem0:preflight
npm run mem0:add -- "Session [date]: [one-line takeaway for Jon]"
```

Skip if LM Studio is offline — note in project-log instead.

---

## Step 4: Session stop

**Local (JonBeatz profile root):**

```powershell
npm run draven:speak -- "Great work, Jon. The Matrix holds our progress. Until next time."
npm run session:stop
# Free VRAM:     npm run session:stop -- -StopComfy
# Stop DeepSeek: npm run session:stop -- -StopDeepSeek
# Both:          npm run session:stop -- -StopDeepSeek -StopComfy
```

**Default:** Leaves DeepSeek + LM Studio running (Jon may keep paid stack or Mem0 loaded). **`session:stop`** also stops OmniVoice daemon when `DRAVEN_OMNI_STOP_ON_END=1` (frees ~2–4 GB RAM).

**Voice:** Optional short farewell via `draven:speak` **before** `session:stop`. Ritual-only — do not read session summary aloud.

**`-StopDeepSeek`** (alias `-StopGoogleApi`): Runs `deepseek:off` — stops LiteLLM/ngrok and switches Hermes to free `qwen3-4b-instruct-2507` @ LM Studio.

**Does NOT stop:** LM Studio unless Jon stops it manually.

---

## Step 5: Farewell

```
Great work Jon — personal session saved.

Done today:
  • ...

Next session:
  • ...

Say Start Project when you're ready to continue.
```

---

## Aliases

- Legacy: `.cursor/prompts/Personal-End.md` → this file is canonical.
- `-StopGoogleApi` → same as `-StopDeepSeek` (backward compatible).
