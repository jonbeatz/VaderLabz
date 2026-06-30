# START HERE — VaderLabz Daily Ops

If an agent is new to this profile, read this file first.

**Profile root:** D:\Hermes\projects\VaderLabz
**Hermes slug:** vaderlabz

---

## Operator Profile

- **Operator:** Operator
- **Handshake (required):**
  - Startup: **"Ok Operator — VaderLabz profile loaded, ready."**
  - Closeout: **"Great work Operator — session saved."**

---

## Source-of-Truth Order

When docs differ, use this priority:

1. `TRUTH.md` — Profile constitution
2. `START-HERE.md` (this file)
3. `MASTER-COMMANDS.md` — Command reference
4. `MEM0-LMSTUDIO.md` — Memory + local LLM
5. Skills in SKILL-INDEX.md — Domain expertise
6. `ReCall.md` / `project-log.md` — Session history

---

## Start Project (cold boot)

Say **Start Project**, **Start Session**, or **Cold Start**.

**Agent must:**
1. Run session startup from profile root
2. Read `TRUTH.md`, this file, and `ReCall.md`
3. Optionally search Mem0 for "current priorities"
4. Print session status card (ports, services, Mem0)

---

## End Project (closeout)

Say **End Project**, **End Session**, or **Close Session**.

**Agent must:**
1. Summarize what was done
2. Update `ReCall.md` and `project-log.md`
3. Optionally add key takeaways to Mem0
4. Run session stop

---

## Local Services

| Service | URL |
|---------|-----|
| LiteLLM (paid) | http://localhost:4000 |
| LM Studio (free) | http://localhost:1234 |
| ngrok inspector | http://localhost:4040 |

---

## Mem0 Quick Reference

```powershell
npm run mem0:preflight   # Verify LM Studio
npm run mem0:search -- "query"
npm run mem0:add -- "text to remember"
npm run mem0:list
```

Default model: **qwen3-4b-instruct-2507** @ LM Studio `:1234`
Collection: `vaderlabz_memories`

---

## Environment Variables

See `ENV-VARS-REFERENCE.md` for the full registry of env vars this profile uses. Key vars are set in `.env.local`.

---

## Docs & UTF-8 Hygiene

Before doc commits:

```powershell
npm run encoding:check   # mojibake scan
npm run docs:sync        # alignment audit
```

Never bulk-rewrite markdown from PowerShell without `-Encoding UTF8`.

---

*Created: 2026-06-28*
