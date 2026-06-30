# VaderLabz — Master Command Reference

**Profile root:** `D:\Hermes\projects\VaderLabz`
**Last updated:** 2026-06-30 · **Version:** 2.2.0

---

## Session rituals

| Command | What it does | When |
|---------|--------------|------|
| `npm run session:start` | LM Studio preflight + probes (light) | Quick check |
| `npm run session:start:full` | Mem0 + DeepSeek LiteLLM + ngrok | **Start Project** |
| `npm run session:stop` | Session closeout (no flags = leaves stack up) | **End Project** |
| `npm run session:stop -- -StopDeepSeek` | Also stop LiteLLM + ngrok | End + free RAM |

## DeepSeek LiteLLM

| Command | What it does |
|---------|--------------|
| `npm run deepseek:on` | Start LiteLLM proxy on `:4000` |
| `npm run deepseek:off` | Stop LiteLLM + switch Hermes to local model |
| `npm run deepseek:status` | Probe `:4000/v1/models` + stack status |
| `npm run deepseek:test` | One-shot LiteLLM chat completion smoke test |

**ngrok (Cursor Agent HTTPS):**

| Command | What it does |
|---------|--------------|
| `npm run deepseek:ngrok` | Force-restart LiteLLM with ngrok tunnel |
| `npm run session:start:full` | Starts DeepSeek + ngrok together |

> **ngrok pitfall:** Free ngrok hostnames change every restart. After any `deepseek:ngrok` or `session:start:full`, copy the fresh HTTPS URL from the console and paste into **Cursor → Settings → Models → Override OpenAI Base URL**.

## Mem0 (per-project memory)

| Command | What it does |
|---------|--------------|
| `npm run mem0:preflight` | Verify LM Studio up |
| `npm run mem0:add -- "text"` | Add memory directly (no LLM inference) |
| `npm run mem0:search -- "query"` | Semantic search |
| `npm run mem0:list` | List all stored memories |

## Draven memory (cross-project AI assistant)

| Command | What it does |
|---------|--------------|
| `npm run draven:add -- "text"` | Store cross-session context |
| `npm run draven:search -- "query"` | Search Draven's memory |
| `npm run draven:list` | List all Draven memories |
| `npm run draven:speak -- "text"` | TTS (OmniVoice, ritual only) |

## Telegram

| Command | What it does |
|---------|--------------|
| `npm run telegram:test` | Send test notification |
| `npm run telegram:ensure` | Sync creds + start gateway |
| `npm run telegram:doctor` | Audit Telegram + LiteLLM health |

## Docs & maintenance

| Command | What it does |
|---------|--------------|
| `npm run docs:sync` | Audit TRUTH / START-HERE / ReCall alignment |
| `npm run encoding:check` | Check for mojibake in `.md` / `.mdc` |
| `npm run log:session -- "summary"` | Append to `project-log.md` |
| `npm run log:fix` | Append to `ISSUES-RESOLVED.md` |
| `npm run backup:quick` | Standard backup, auto-folder, no prompts |

**Backup root:** `G:\Hermes_Project_BackUpz\VaderLabz\`

## Local services

| Service | URL |
|---------|-----|
| LiteLLM (DeepSeek proxy) | http://localhost:4000 |
| LM Studio (Mem0 / free) | http://localhost:1234 |
| ngrok inspector | http://localhost:4040 |
| Next.js dev server | http://localhost:3000 |

---

*Created: 2026-06-29*
