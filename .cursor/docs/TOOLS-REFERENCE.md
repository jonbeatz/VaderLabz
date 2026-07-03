d:\Hermes\projects\VaderLabz\.cursor\docs\TOOLS-REFERENCE.md
## React Bits

- **URL:** https://www.reactbits.dev/ | https://github.com/DavidHDev/react-bits
- **Type:** Open-source animated React component library
- **Stars:** 41,000+ (2026-07-01, #2 in JS Rising Stars 2025)
- **License:** MIT + Commons Clause (free) / $99-$299 Pro
- **Stack:** React 19/Next.js 16, Tailwind CSS 4 or vanilla CSS, optional GSAP/Three.js/Matter.js

### What it does

130+ animated, interactive, customizable React components for text effects, animated backgrounds, and UI elements. Standout features:
- **4 variants per component** — JS-CSS, JS-TW, TS-CSS, TS-TW
- **Minimal dependencies** — CSS animations by default, only pulls GSAP/Three.js for components that need them
- **RSC compatible** — CSS-based components work in server components (unlike Framer Motion alternatives)
- **Copy-paste via CLI** — shadcn/jsrepo protocol, you own the code
- **No Framer Motion dependency** — avoids lock-in
- **Pro version** ($99-$299 lifetime): 101+ premium components, 158+ UI blocks, 11+ full Next.js templates, AI-agent SKILL.md

### Our assessment

Useful supplementary component library for new sections or standalone pages outside the Experience Engine. Not worth retrofitting into existing work — our custom implementations are purpose-built for the saber experience.

### When to use

- Building a **new landing page** or standalone section outside the engine
- Want a **fluid cursor, text scramble, particle background** without building from scratch
- Prototyping new UI concepts quickly

---

## Penpot

- **URL:** https://penpot.app/
- **Type:** Open-source design platform (Figma alternative)
- **Stack:** Web-based, self-hostable, open standards (SVG, CSS, JSON)
- **Key Feature:** MCP server for AI agent integration

### What it does

Leading open-source alternative to Figma. Full UI design, wireframing, prototyping, design systems with design tokens, CSS Grid/Flexbox layouts. Key differentiators:
- **Self-hostable** — runs on your infrastructure
- **Open file format** — native SVG/CSS/JSON (no proprietary lock-in)
- **MCP Server** — AI agents (Cursor, Claude) can read/write designs programmatically
- **Code inspection** — developers inspect designs in CSS/HTML format
- **AI Workflows** — code-to-design, design-to-code, design-to-design pipelines

### Our assessment

Excellent tool but VaderLabz doesn't currently have a design-to-code workflow that needs a Figma-like tool. All our UI is built directly in code (Tailwind + React). If we ever collaborate with a non-coding designer, or need to hand off mockups, Penpot is the best open-source option.

### When to use

- Need to **collaborate with a non-coding designer** on a project
- Want to **self-host a design tool** instead of paying Figma
- Exploring **AI-driven design-to-code pipelines** (Penpot MCP + Cursor)

---

## flutter_nocode

- **URL:** https://github.com/hishamnasrallah/flutter_nocode
- **Type:** Django-based no-code Flutter app generator
- **Stars:** 0 (new, unproven)
- **Stack:** Django (Python) + Flutter (Dart)
- **License:** MIT

### What it does

A Django admin interface that generates complete Flutter mobile applications from database configuration. Non-technical users can create apps through a web UI without writing code.

### Our assessment

**Not relevant to VaderLabz.** Flutter-based no-code mobile app builder — entirely different layer of the stack from what we do (Next.js/React web 3D experiences). Zero stars, unproven project. Skip.

---

## SketchIDE

- **URL:** https://github.com/sketchide/SketchIDE
- **Type:** Visual mobile IDE (Flutter-based drag-and-drop app builder)
- **Stars:** 83 (prototype)
- **Stack:** Flutter/Dart
- **License:** MIT
- **Status:** **Prototype** (explicitly stated in README — not production-ready)

### What it does

A visual mobile IDE that lets users build native Android & iOS apps through a drag-and-drop interface on their device. Includes live Flutter code generation, Material 3 widgets, touch-based property editor.

### Our assessment

**Not relevant to VaderLabz.** Also a Flutter-based mobile app builder, and explicitly a prototype (83 stars). No overlap with our web-based 3D experience workflow.

---

## Agent-Reach

- **URL:** https://github.com/Panniantong/Agent-Reach
- **Type:** CLI tool giving AI agents internet reading/search capabilities
- **Stars:** 48,500 (2026-07-01, #1 GitHub Trending)
- **Stack:** Python 3.10+, CLI
- **License:** MIT
- **Status:** Active, v1.5.0 released

### What it does

**Highly relevant to VaderLabz.** Agent-Reach installs and configures the best free tools for AI agents to read/search the internet. One install command and your agent gains:
- **Zero-config:** Read any webpage, YouTube subtitles, GitHub repos, RSS feeds
- **With login:** Search Twitter, Reddit, Bilibili, Xiaohongshu, Facebook, Instagram, LinkedIn
- **Search:** Free semantic web search via Exa (MCP-based, no API key needed)
- **Self-healing:** Multi-backend routing per platform — if one tool breaks, it swaps
- **Diagnostics:** `agent-reach doctor` checks each channel
- **SKILL.md integration:** Registers usage guides so agents know which tool to call
- **Compatible:** Claude Code, Cursor, Windsurf, OpenClaw — any agent that can run shell

### Why this matters for VaderLabz

Our Cursor agent already has WebFetch and WebSearch MCP tools, but Agent-Reach unlocks **platforms we can't currently reach**: YouTube transcripts, Twitter search, Reddit threads, GitHub issue details, RSS monitoring. Useful for competitive research, tracking tool releases, or automated intel gathering.

### When to use

- Want Cursor to **read YouTube videos** (subtitles) for research
- Need **Twitter/Reddit search** for market research or sentiment analysis
- Want automated **RSS monitoring** of competing tools
- Setting up a **research pipeline** where the agent gathers intel autonomously

### Prerequisites

- Python 3.10+
- One-time install: `pip install agent-reach`
- For login-gated platforms: dedicated burner accounts (recommended for safety)

---

## mockit-mcp

- **URL:** https://github.com/karyaboyraz/mockit-mcp
- **Type:** MCP server for generating premium iOS UI mockups from text prompts
- **Stars:** 2 (new)
- **Stack:** TypeScript, Node.js 20+, Playwright, Tailwind CSS
- **License:** MIT
- **Backend:** Claude Opus 4.7 (CLI or API)

### What it does

An MCP server that turns text prompts into premium iOS mobile UI mockups. Claude generates HTML+Tailwind, Playwright renders it as PNG at iPhone viewport. Includes generate_screen, iterate_screen (versioned refinements), list_screens, and get_screen tools. ~$0.50-0.95 per generation on API backend.

### Our assessment

Novel concept (MCP server as UI mockup generator) but **not relevant to VaderLabz**. We build web-based 3D experiences, not iOS mobile apps. The pattern of "LLM + Playwright = screenshot generator" is interesting as a technique, but this specific tool has the wrong target.

### When to use

- If we ever prototype an **iOS companion app** for VaderLabz
- Exploring the pattern of **LLM + Playwright = screenshot generator** as a general technique

---
