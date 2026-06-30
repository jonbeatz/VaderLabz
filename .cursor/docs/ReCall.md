# ReCall.md — VaderLabz Memory

## Current Focus
- [2026-06-28] **VaderLabz profile is live** at D:\Hermes\projects\VaderLabz.

## Session Log

### 2026-06-29 (PM) — vader-experience page + Tailwind fix + blueprint
- **Built:** `/vader-experience` — dedicated immersive scroll-driven 3D narrative page
  - 5 chapters (Genesis, Skeleton System, Draven, Command Center, Design System)
  - Glassmorphism content panels with `backdrop-filter: blur(12px)`
  - 3D scene: `DamagedHelmet.glb` (Khronos CC-BY 4.0) + `neon_photostudio_1k.exr` HDR (Poly Haven CC0)
  - Scroll-driven camera orbit + model rotation + mouse parallax
  - Article overlays for each chapter with full detail content
  - Stats strip, closing quote, hero animation, progress bar
- **Critical fix:** Installed Tailwind CSS v3 + PostCSS — was **completely missing** from the skeleton
  - Created `tailwind.config.ts`, `postcss.config.mjs`
  - Updated `globals.css` with `@tailwind` directives
  - Without this, all `className` utilities were silently ignored (page appeared blank)
- **Critical fix:** Removed `Float` wrapper and `EffectComposer`/`Bloom`
  - `Float` caused Suspense deadlock with GLB models
  - `EffectComposer@3.0.4` crashed silently with `three@0.185.0` + R3F@9
- **Asset pipeline:** Downloaded `DamagedHelmet.glb` (3.77MB) and `neon_photostudio_1k.exr` (1.4MB)
- **Reference research:** Deep analysis of mongols.peachworlds.com — custom Three.js (non-R3F), Lenis, GSAP, real loading progress
- **Deliverable:** `2026-06-29-vader-experience-blueprint.plan.md` — full architecture blueprint
- **Design polish:** Added full-width glass strip to hero section for text legibility; removed torus fallback mesh
- **3 new skills** created and added to shared-profile-content skeleton:
  - `GLB-Asset-Sourcing` — how to find, validate, and license free GLB models + HDR maps
  - `Nextjs-Tailwind-Bootstrap` — Tailwind setup checklist for skeleton projects
  - `R3F-Gotchas` — known R3F issues with workarounds (EffectComposer crash, Float deadlock, etc.)
- **SKILL-INDEX.md** updated in both shared skeleton and VaderLabz
- **Next phase:** Debug helmet model rendering, re-enable bloom, add Lenis, refine design

### 2026-06-29 (Late) — Open Generative AI setup + Logo assets + Background removal skill
- **Open Generative AI** (Anil-matcha) set up at `D:\Hermes\projects\Open-Generative-AI` (independent from VaderLabz)
  - Cloned from GitHub, built workspace packages (studio, workflow-builder, ai-agent, design-agent)
  - Runs on port 3001 (no conflict with VaderLabz on 3000)
  - Tested with Muapi API key — generates via Nano Banana, Flux, etc. (pay-per-gen at muapi.ai)
  - Easy to remove: just delete the folder
- **Logo designs** created via Nano Banana (VaderLabz-Logo-v1, v5, VLlogo-v1, JonBeatz-Logo-v1/v2, backgrounds)
- **Background removal** with rembg + U^2-Net AI model:
  - Turned VLlogo-v1.jpg into clean transparent `VaderLabz-Logo.png` at `public/media/`
  - rembg is free, open-source, runs locally — no API costs
  - U^2-Net model cached at `%USERPROFILE%\.u2net\u2net.onnx`
  - Backed up to `H:\LLM_VAULT\models\u2net\u2net.onnx`
- **New skill created:** `Background-Removal` in shared skeleton — docs, CLI usage, Python script, best practices
- **SKILL-INDEX.md** updated in both repos

---

*Last Entry: 2026-06-29*
