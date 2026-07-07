# Review Tool — Hermes Watchlist Ritual

## Trigger

Jon pastes a **URL** (GitHub, product site, npm, PyPI) or says **review tool**, **evaluate tool**, **grade this tool**.

---

## Step 1: Research

- Fetch README / docs (fetch MCP, web)
- Tavily for recent reviews if needed
- Context7 if it's a library/SDK
- Compare vs full stack in `TOOLS-SETUP-STATUS.md` production matrix + overlap map

---

## Step 2: Grade (rubric)

| Factor | Weight |
|--------|--------|
| Gap fill | 40% |
| Stack fit | 25% |
| Cost / VRAM / complexity | 20% |
| Maturity / trust | 15% |

Assign letter (A+→F) and score /100. Overlap reduces gap-fill slightly — **does not auto-SKIP**.

---

## Step 3: Verdict + setup status

| Verdict | Meaning |
|---------|---------|
| **IN USE** | Installed and active (after Jon approval) |
| **ADOPT** | Approved on deck — install when asked |
| **WATCH** | Keep on radar |
| **SKIP** | Not pursuing |

| Setup | Meaning |
|-------|---------|
| **READY** | No keys; works now |
| **PARTIAL** | Works with caveats or optional key |
| **NEEDS_KEY** | API token required |
| **NEEDS_LOGIN** | OAuth / desktop app / burner account |
| **NOT_INSTALLED** | Approved but not installed |

---

## Step 4: Update docs (shared canonical)

Edit files under `D:\Hermes\projects\_core-scripts\shared-profile-content\docs\`:

1. **TOOLS-WATCHLIST.md** — quick summary row + review queue
2. **TOOLS-REFERENCE.md** — full write-up + grade breakdown
3. **TOOLS-SETUP-STATUS.md** — setup matrix + configuration queue if not READY

Then mirror to JonBeatz `.cursor/docs/` (same filenames) or run `npm run sync:docs -- -Write` from JonBeatz.

Add env vars to `ENV-VARS-REFERENCE.md` if new keys introduced.

---

## Step 5: Install gate (AskQuestion)

If verdict is **ADOPT** or **IN USE** and not yet installed, use **AskQuestion**:

- **Install now** (Recommended if grade ≥ B+ and gap is clear)
- **Add to queue only** — update docs, no install
- **Skip** — downgrade to WATCH or SKIP

**Never install without Jon's selection or explicit "run install now".**

---

## Step 6: Post-install verification

```powershell
# Tool-specific doctor (examples)
agent-reach doctor
python %USERPROFILE%\.agents\skills\watch\scripts\setup.py --check
npm run sync:mcp-env   # if MCP keys added
```

Update TOOLS-SETUP-STATUS.md: flip Setup → **READY** (or **PARTIAL** with notes).

Optional: `npm run draven:add -- "Tool X: grade, verdict, setup READY"`

---

## Step 7: Handoff

Summarize for Jon: grade, verdict, setup status, overlap notes, and whether anything is in the configuration queue.
