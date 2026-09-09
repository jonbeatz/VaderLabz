# Hostinger Pitfalls — VaderLabz

| Mistake | Fix |
|---------|-----|
| Staging updated, live stale | Sync to `VADERLABZ_APP_ROOT`, hPanel Restart |
| Partial `.next` upload | Upload complete build folder |
| Wrong repo for MSC deploy | MSC = MyStudioChannel; this profile = VaderLabz |
| Committed `.env.local` | Never — gitignored |
| MCP red after env change | `npm run sync:mcp-env` + reload Cursor MCP |

---

*Bootstrap template — 2026-09-05*
