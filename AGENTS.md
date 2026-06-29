# Agent Instructions — {PROFILE_NAME} Profile

## First time here?

1. Read **`TRUTH.md`** — constitution, core rules, connections.
2. Read **`.cursor/docs/START-HERE.md`** — daily ritual and doc order.
3. Read **`.cursor/docs/ReCall.md`** — recent session history.
4. Read **`.cursor/docs/MASTER-COMMANDS.md`** — all available commands.
5. Browse **`SKILL-INDEX.md`** — available domain skills and what they cover.

## Shared Brain Reference

This project was bootstrapped from the **shared profile content** at
`D:\Hermes\projects\_core-scripts\shared-profile-content\`. See the ecosystem
layout in **`PROJECT-STRUCTURE.md`** (in that same repo).

## Documentation Hierarchy

| Priority | Document | Purpose |
|----------|----------|---------|
| 1 | `TRUTH.md` | Constitution |
| 2 | START-HERE.md | Daily ops |
| 3 | MASTER-COMMANDS.md | Command reference |
| 4 | MEM0-LMSTUDIO.md | Memory + local LLM |
| 5 | ENV-VARS-REFERENCE.md | Env var registry |
| 6 | TROUBLESHOOTING.md | Known issues |
| 7 | PROJECT-STRUCTURE.md | Ecosystem layout (in _core-scripts) |
| 8 | ReCall.md | Session history |

## Session Rituals

| Trigger | Action |
|---------|--------|
| Start Project / Start Session | Read TRUTH + START-HERE + ReCall, search Mem0, print status |
| End Project / Close Session | Summarize, update ReCall, optionally save Mem0 |
| Update Docs | Sync version, encoding check, align docs |
| Backup Project | Run interactive backup flow per project convention |

## Backup

```powershell
npm run backup:quick    # Standard backup, auto folder name, no prompts
npm run backup:full     # Full mirror — includes everything
```

Backups go to `G:\Hermes_Project_BackUpz\{PROJECT_NAME}\` with sequential naming.

## Skills Index

Available domain skills (see `SKILL-INDEX.md` for full list with tags):

- **Design:** NovaMira-Design, Premium-UI, DesignMD, MSC-UI-Taste
- **3D:** Three.js-Ops, WebGL-UI, 3D-Modeling, 3D-Scroll
- **Git/DevOps:** GitHub-Ops, Workflow-Ops, Checkpoint-Restore
- **Deploy:** Deploy-FTP-Node, Docs-Governance
- **Automation:** Google-Workspace, Image-Workflow

## Core Rules

- **Environment:** Windows 10/11 PowerShell. No bash heredocs.
- **UTF-8:** Never rewrite .md from PowerShell without -Encoding UTF8.
- **Mem0:** Use `{PROFILE_SLUG}_memories` collection only — never other profiles.
- **Boundaries:** Stay within this profile. Do not mix other profiles' context.
- **Recovery:** Run recovery commands yourself — don't only tell the operator.
- **Backup root:** `G:\Hermes_Project_BackUpz\{PROJECT_NAME}\`

---

*Created: {DATE}*
