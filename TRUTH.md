# TRUTH.md — VaderLabz Profile

**Version:** 2.0.0
**Profile root:** D:\Hermes\projects\VaderLabz

## Identity & Governance

- **Name:** VaderLabz
- **Slug:** vaderlabz
- **Type:** Self-contained Hermes AI profile
- **OS/Shell:** Windows 10/11 + PowerShell
- **Purpose:** VaderLabz Dev Lab & AI Playground

## Core Connections

- **Paid AI Backend:** LiteLLM proxy at `http://127.0.0.1:4000/v1` (DeepSeek V4)
- **Free Local Brain:** LM Studio at `http://127.0.0.1:1234` (qwen3-4b-instruct or similar)
- **Memory Store:** Mem0 — collection `vaderlabz_memories`
- **Telegram Gateway:** Hermes profile gateway for iPhone two-way chat

## Core Rules

- **Voice:** OmniVoice primary for ritual speaks (Start/End Project, explicit `draven:speak`). Edge TTS backup only if Omni fails. Ritual-only — never auto-read chat replies or Mem0 recall.
- **Pathing:** All global scripts reside in `D:\Hermes\projects\_core-scripts\`. Profile switcher registry must use workspace paths (git repo roots).
- **JSON Security:** Never use PowerShell to write JSON (BOM issues). Use Python or write_file.
- **UTF-8 / Markdown:** Never rewrite .md / .mdc with PowerShell Get-Content / Set-Content without -Encoding UTF8. Prefer Python scripts for version badge updates. Run encoding checks before doc commits.
- **PowerShell:** This is a Windows environment. All scripts are PowerShell (.ps1). No bash heredocs.

## Telegram (iPhone ↔ PC)

- **Outbound:** `npm run telegram:test` / `telegram-notify.mjs`
- **Two-way chat:** Hermes profile gateway — NOT Hermes Desktop UI alone
- **Sync ritual:** `npm run sync:telegram-env` after token change or new profile
- **Ensure listener:** `npm run telegram:ensure` (sync + start gateway for active profile)
- **Pitfall:** Profile .env must contain TELEGRAM_* or gateway logs "No messaging platforms enabled"

## Profile Reading Order

1. `TRUTH.md` — This file (identity)
2. `.cursor/docs/START-HERE.md` — Daily rituals
3. `.cursor/docs/ReCall.md` — Ongoing memory
4. `.cursor/docs/MASTER-COMMANDS.md` — Command reference
5. Skills referenced in SKILL-INDEX.md — Domain expertise

## Isolation Rules

- This profile is self-contained in D:\Hermes\projects\VaderLabz.
- Keep memories in the `vaderlabz_memories` collection only.
- All changes stay within this workspace.

---

*Created: 2026-06-28*
