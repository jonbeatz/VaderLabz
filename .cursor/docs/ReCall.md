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

---

*Last Entry: 2026-06-29*
