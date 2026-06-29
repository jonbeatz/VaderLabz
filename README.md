# VaderLabz — Dev Lab & AI Playground

**Building, breaking, and learning. Full-stack AI experiments, personal projects, and new ideas forged in the dark.**

[![Version](https://img.shields.io/badge/version-1.0.0-blue)]()
[![Status](https://img.shields.io/badge/status-active-brightgreen)]()
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-gold)](https://docs.pmnd.rs/react-three-fiber)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

> **Live site:** [vaderlabz.com](https://vaderlabz.com/) — hosted on Hostinger (placeholder page until first deploy)

## Overview

VaderLabz is a personal dev playground and portfolio site showcasing full-stack AI experiments, open-source projects, and tools built across the VaderLabz ecosystem. It features a dark, cinematic 3D UI powered by Three.js with the **Vader Red** (#ff2a36) design palette.

### Projects featured

| Project | Status | Description |
|---------|--------|-------------|
| [Boilerplate-v2](https://github.com/jonbeatz/Boilerplate-v2) | Active | Cursor-native full-stack boilerplate with 52-point self-grader, isolated sandboxes, Biome, MCP |
| [Node-Launcher](https://github.com/jonbeatz/Node-Launcher) | Active | Vader Project Engine — Electron launcher with SQLite, sandboxing, forge automation |
| [MSC-Projectz](https://github.com/jonbeatz/MSC-Projectz) | Building | Project management dashboard for the VaderLabz ecosystem |

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **3D Engine** | Three.js / React-Three-Fiber / Drei |
| **Animation** | Motion |
| **Styling** | CSS Modules |
| **Design** | Vader Red palette (#ff2a36) — see 3D-WEBSITE-TASTE-CATALOG for variants |
| **Deploy** | Static export → Hostinger hPanel |

## Project Structure

| Path | Contents |
|------|----------|
| `app/` | Next.js App Router pages and layouts |
| `components/` | Shared components (ThreeBackground, etc.) |
| `scripts/` | Backup and utility scripts |
| `.cursor/` | Agent brain: rules, prompts, skills, docs, MCP config |
| `TRUTH.md` | Project constitution and core rules |

## Getting Started

```bash
npm install
npm run web:dev      # Development server
npm run web:build    # Production build
npm run web:start    # Start production server
```

## License

MIT
