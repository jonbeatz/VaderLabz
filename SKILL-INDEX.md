# SKILL-INDEX.md — Shared Domain Skills

Searchable catalog of all portable skills available in `shared-profile-content/skills/`. Each skill includes domain tags so you can `rg "tag" SKILL-INDEX.md` to find the right one.

## Design & UI

| Skill | Tags | Purpose | Source |
|-------|------|---------|--------|
| NovaMira-Design | design, dark-theme, bento, glass, saas, grid | Glassmorphism SaaS design system — dark layered neutrals, Studio Gold (#F5B841), 8px rhythm | JonBeatz |
| MSC-UI-Taste | ui, audit, quality, motion, anti-slop | Anti-slop UI taste layer — audit workflow, motion philosophy, quality gate for generated code | JonBeatz |
| Premium-UI | ui, components, shadcn, animation, micro-interactions | Pre-wired premium component techniques — shadcn registries, micro-interactions, physics animations | JonBeatz |
| DesignMD | design, extraction, cli | Design system extraction from live URLs via @designmdcc/cli | JonBeatz |
| Nova | css, tokens, grid, namespace, cinematic | CSS conventions — jb-/nm- namespaces, Studio Gold tokens, cinematic 16:9 grids | JonBeatz |

## 3D & WebGL

| Skill | Tags | Purpose | Source |
|-------|------|---------|--------|
| 3D-Website-Fusion | 3d, website, fusion, production, scroll, color-shift, particles | **Master fusion skill** — combines Three.js + scroll + particles + wireframe core + color-shift + glassmorphism CSS portal into one production 3D website | JonBeatz |
| Three.js-Ops | 3d, threejs, r3f, webgl, scene, lighting | Three.js/R3F scene setup, lighting, GLTF/GLB loading, animation | JonBeatz |
| WebGL-UI | 3d, webgl, shader, effects, post-processing | Shader effects, post-processing, interactive 3D UI components | JonBeatz |
| 3D-Modeling | 3d, gltf, glb, optimization, animation | GLTF/GLB loading, optimization, animation for web | JonBeatz |
| 3D-Scroll | 3d, scroll, parallax, gsap, transitions | Scroll-triggered 3D transitions, parallax effects, GSAP-style motion | JonBeatz |
| GLB-Asset-Sourcing | 3d, assets, sourcing, licensing, glb, hdr, environment | Finding, downloading, validating free GLB models + HDR environment maps — sources, licenses, file validation | VaderLabz |
| R3F-Gotchas | 3d, r3f, troubleshooting, bugs, workarounds, threejs | Known React Three Fiber issues — EffectComposer crash, Float deadlock, GLB rendering, Canvas positioning | VaderLabz |

## Git & DevOps

| Skill | Tags | Purpose | Source |
|-------|------|---------|--------|
| GitHub-Ops | git, github, repo, automation, api | GitHub API operations, repo management, content fetching, discovery | JonBeatz |

## Workflow & Operations

| Skill | Tags | Purpose | Source |
|-------|------|---------|--------|
| Workflow-Portable/Workflow-Ops | workflow, triggers, commands, operating-model | Trigger-command operating model — natural language to agent actions | MSC |
| Workflow-Portable/Checkpoint-Restore | backup, restore, git, milestone | Restore-point format and branch-cut ritual for project checkpoints | MSC |
| Workflow-Portable/Deploy-FTP-Node | deploy, ftp, node, ssh, hosting | Golden split — local build then server restart. Deploy workflow for Node apps | MSC |
| Workflow-Portable/Docs-Governance | docs, sync, version, audit | Source-of-truth order, drift audits, doc sync governance | MSC |
| Workflow-Portable/Session-Closeout | session, closeout, deploy, wrap-up | End-of-session ritual with optional deploy step | MSC |
| Workflow-Portable/Deploy-Profile-Package | deploy, preflight, build, upload, verify | Repo-first deploy workflow — preflight, build, upload, restart verification | MSC-Projectz |
| Workflow-Portable/Session-Handoff-Restore | handoff, restore, closeout, checkpoint | Unified closeout + checkpoint workflow with handoff notes | MSC-Projectz |

## Code & Automation

| Skill | Tags | Purpose | Source |
|-------|------|---------|--------|
| UI-Generator | ui, components, shadcn, ai-sdk, nextjs | Expert UI component generator — Cult UI, AI SDK patterns, Next.js 16 + Tailwind v4 | Node-Launcher-v2 |
| Git-Commit | git, commit, conventional, format | Conventional commits format (`type(scope): subject`) skill | Node-Launcher-v2 |
| imported/CURATED-INDEX | reference, index, whitelist | Curated whitelist of 15 approved external skill categories for manual sourcing | MSC |
| Nextjs-Tailwind-Bootstrap | nextjs, tailwind, bootstrap, setup, postcss, css | Tailwind CSS setup checklist for skeleton-bootstrapped projects — install, config, verification, troubleshooting | VaderLabz |
| Background-Removal | image, background, transparency, rembg, python, ai | Remove image backgrounds using rembg + U^2-Net AI model — local, free, offline-capable | VaderLabz |

## Automation & Integration

| Skill | Tags | Purpose | Source |
|-------|------|---------|--------|
| Google-Workspace | google, gmail, calendar, drive, automation | Google automation via Hermes — Gmail, Calendar, Drive operations | JonBeatz |
| Image-Workflow | image, hf, comfyui, genai, upscale, video | HF cloud generation + ComfyUI local edit/upscale/video pipeline | JonBeatz |

---

## How to use a skill

Skills are read by the AI agent when relevant to the current task. To invoke a skill:

1. Find the right skill using this index
2. The agent reads `skills/<skill-path>/SKILL.md` for instructions
3. Follow the workflow steps inside the skill file

## Adding a new skill

See `CONTRIBUTING.md` for the workflow to contribute new skills back to the shared library.
