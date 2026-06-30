# VaderLabz — Dev Lab & AI Playground

**Building, breaking, and learning. Full-stack AI experiments, personal projects, and new ideas forged in the dark.**

[![Version](https://img.shields.io/badge/version-2.0.0-blue?style=flat-square)]()
[![Status](https://img.shields.io/badge/status-active-brightgreen?style=flat-square)]()
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-gold?style=flat-square)](https://docs.pmnd.rs/react-three-fiber)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)
[![Cursor](https://img.shields.io/badge/Cursor-Agent%20Ready-6C31C9?style=flat-square)](https://cursor.sh)

---

> **Live site:** [vaderlabz.com](https://vaderlabz.com/) — placeholder page until first deploy

> **Source of Truth:** Read **TRUTH.md** for our master project identity, core commands, and architectural blueprint.

---

## 📊 Current Status

| Metric | Value |
|--------|-------|
| **Version** | v2.0.0 ([Latest release](https://github.com/jonbeatz/VaderLabz/releases/latest)) |
| **Stack** | Next.js 16 (App Router) + Three.js / R3F |
| **3D Engine** | React-Three-Fiber + Drei + GSAP ScrollTrigger |
| **Styling** | CSS Modules + Tailwind CSS v3 |
| **Design** | Vader Red (#ff2a36) — dark cinematic palette |
| **AI Backend** | LiteLLM proxy (DeepSeek V4) + LM Studio (local) |
| **Memory** | Mem0 vector store (Qdrant) |
| **Deploy** | Static export → Hostinger hPanel |
| **Status** | 🟢 Active Development |

## 🖼️ Screenshots

![VaderLabz Homepage](public/media/vaderlabz-screenshot.png)

_The immersive 3D narrative homepage — lightsaber model, glassmorphism panels, and scroll-driven camera orbit._

## 🚀 Why VaderLabz?

Most portfolios show what you made. **VaderLabz shows how you build.**

| Capability | VaderLabz | Typical Portfolio |
|------------|-----------|-------------------|
| 3D Interactive Narrative | ✅ | ❌ |
| Scroll-Driven Camera System | ✅ | ❌ |
| Glassmorphism Design System | ✅ | ❌ |
| Clickable Progress Navigation | ✅ | ❌ |
| AI Co-Pilot (Draven) Integration | ✅ | ❌ |
| Cross-Session Memory (Mem0) | ✅ | ❌ |
| Dark Cinematic Palette | ✅ | ❌ |
| Agent-Ready Documentation | ✅ | ❌ |

## 🗺️ Pages

| Route | Description |
|-------|-------------|
| **/** | **Main site** — immersive scroll-driven 3D narrative with lightsaber model, 5 chapters, glassmorphism panels |
| **/vader-experience** | Redirects to `/` (legacy route) |
| **/vader-experience-v2** | Safe fallback copy of the experience page for experimentation |
| **/archive** | Original homepage (kept for reference) |

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router) — React 19 |
| **Language** | TypeScript 5 |
| **3D Engine** | Three.js / React-Three-Fiber / Drei |
| **Animation** | GSAP / ScrollTrigger |
| **Styling** | CSS Modules + Tailwind CSS v3 |
| **Design** | Vader Red (#ff2a36) — dark cinematic palette |
| **AI Backend** | LiteLLM proxy (DeepSeek V4) + LM Studio (local) |
| **Memory** | Mem0 vector store (Qdrant) |
| **Deploy** | Static export → Hostinger hPanel |

## 🚀 Quick Start

```bash
git clone https://github.com/jonbeatz/VaderLabz.git
cd VaderLabz
npm install
npm run web:dev      # Development server on http://localhost:3000
npm run web:build    # Production build
npm run web:start    # Start production server
```

### Available Commands

| Command | Description |
|---------|-------------|
| `npm run web:dev` | Start Next.js dev server |
| `npm run web:build` | Production build |
| `npm run web:start` | Start production server |
| `npm run backup:quick` | Quick project backup |
| `npm run backup:full` | Full project mirror backup |
| `npm run mem0:search` | Search Mem0 vector memory |
| `npm run mem0:add` | Add to Mem0 memory |
| `npm run session:start` | Start project session ritual |
| `npm run session:stop` | Stop project session ritual |

## 🏗️ Architecture

```
VaderLabz
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Main immersive 3D narrative page
│   ├── archive/            # Original homepage (archived)
│   ├── vader-experience/   # Legacy route → redirects to /
│   └── vader-experience-v2/ # Safe fallback copy for experiments
├── components/             # Shared React components
│   ├── ThreeBackground     # 3D particle/starfield background
│   ├── ArtefactScene       # 3D artefact display
│   ├── CustomCursor        # Custom cursor component
│   └── StudioRails         # Vignette + grain overlays
├── lib/                    # Utility libraries & hooks
│   ├── lenis-provider      # Lenis smooth scroll provider
│   └── useGsapScroll       # GSAP ScrollTrigger hooks
├── public/media/           # 3D models, HDR maps, images, screenshots
├── scripts/                # Backup & utility scripts
├── .cursor/                # Agent brain: rules, prompts, skills, docs
└── TRUTH.md                # Project constitution & core rules
```

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [TRUTH.md](TRUTH.md) | Project constitution & core rules |
| [CHANGELOG.md](CHANGELOG.md) | Release history |
| [ENV-VARS-REFERENCE.md](ENV-VARS-REFERENCE.md) | Environment variable registry |
| [SKILL-INDEX.md](SKILL-INDEX.md) | Available domain skills |
| [TROUBLESHOOTING.md](TROUBLESHOOTING.md) | Known issues & fixes |
| [AGENTS.md](AGENTS.md) | Agent instructions |
| `.cursor/docs/START-HERE.md` | Daily ops & doc order |
| `.cursor/docs/MASTER-COMMANDS.md` | Command reference |
| `.cursor/docs/ReCall.md` | Session memory log |
| `.cursor/docs/project-log.md` | Session history |

## 🎨 Design System

- **Primary Accent:** `#ff2a36` (Vader Red)
- **Background:** `#000000` (Deep Black)
- **Text:** `#f0f0f0` / `#888899` / `#555566` (3-tier hierarchy)
- **Glass:** `rgba(0,0,0,0.55)` with `backdrop-filter: blur(12px)`
- **Typography:** Inter (sans-serif) + JetBrains Mono (code/monospace)
- **3D Scene:** Lightsaber model with scroll-driven camera orbit & mouse parallax

## 📄 License

MIT © VaderLabz

---

*Powered by the VaderLabz Dev Engine · v2.0.0*
