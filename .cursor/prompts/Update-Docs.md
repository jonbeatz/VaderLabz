# Update Docs — JonBeatz Personal

**Triggers:** `update docs`, `Update Docs`, `sync docs`

**With Mem0:** `update docs and mem0` (includes Phase 5b)

---

## Phase 1: Scan

Read and cross-check:

| Path | Purpose |
|------|---------|
| `TRUTH.md` | Version, profile root, source-of-truth order |
| `package.json` | Version matches TRUTH |
| `.cursor/docs/START-HERE.md` | Doc order, rituals |
| `.cursor/docs/MASTER-COMMANDS.md` | All npm scripts listed |
| `.cursor/docs/Custom-Prompts.md` | Chat triggers |
| `.cursor/docs/CHANGELOG.md` | Recent releases |
| `.cursor/docs/Checkpoint.md` | Milestones |
| `.cursor/docs/ReCall.md` | Current focus |
| `.cursor/docs/IMAGE-WORKFLOW.md` | Image pipeline |
| `.cursor/docs/GOOGLE-WORKSPACE.md` | Google automation |
| `.cursor/rules/*.mdc` | Workflow rules |
| `AGENTS.md`, `README.md`, `HERMES.md` | Entry points |

---

## Phase 2: Fix drift

1. Sync **version** across `package.json`, `TRUTH.md`, `MASTER-COMMANDS.md`, `CHANGELOG.md`
2. Run **`npm run version:sync`** — README shields + badge repo slug (`JonBeatz-Command-Center`); Python UTF-8 safe
3. Run **`npm run encoding:check`** — fail fast on mojibake in `.md` / `.mdc` before any doc commit
4. Ensure new npm scripts appear in **MASTER-COMMANDS** + **Custom-Prompts**
5. Fix broken internal links
6. Update **Checkpoint.md** if milestone shipped

### Phase 2b — GitHub tag + release (version milestone)

When Jon bumps version (e.g. v2 → v3 on a new branch):

```powershell
npm run version:sync
npm run docs:sync
# commit + push branch
npm run release          # tag vX.Y.Z + GitHub release --latest
```

See **`.cursor/docs/VERSION-RELEASE.md`** for full checklist.

---

## Phase 3: Run auditor

```powershell
npm run encoding:check
npm run docs:sync
```

Fix any alignment warnings (profile root, TRUTH link, version, UTF-8 mojibake).

---

## Phase 4: ISSUES-RESOLVED

If this session fixed a bug, append to `.cursor/docs/ISSUES-RESOLVED.md` or run:

```powershell
npm run log:fix
```

---

## Phase 5: Report

Print summary:

- Files updated
- Version line
- Any remaining drift

End with: **"Ready to commit when you say so."**

---

## Phase 5b (only if `update docs and mem0`)

```powershell
npm run mem0:preflight
npm run mem0:add -- "Docs sync [date]: [one-line summary of doc changes]"
```

Skip if LM Studio offline — note in project-log.

---

## Do NOT

- Apply MSC Hostinger/deploy doc changes unless Jon opened MSC repo
- Auto-commit unless Jon asks
