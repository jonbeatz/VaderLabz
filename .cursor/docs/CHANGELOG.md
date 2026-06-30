# Changelog — VaderLabz Profile

## 1.0.0 — 2026-06-29

### Added
- **Homepage** (`/`): Full marketing landing page with procedural 3D art (Icosahedron crystal, orbiting rings), Lenis smooth scroll, GSAP + ScrollTrigger sections, custom cursor, studio rails
- **Vader Experience** (`/vader-experience`): Dedicated immersive scroll-driven 3D narrative page with:
  - DamagedHelmet.glb 3D model + neon_photostudio HDR environment
  - 5 narrative chapters with glassmorphism content panels
  - Scroll-driven camera orbit + model animation + mouse parallax
  - Article overlay system for expandable chapter details
  - Stats strip, hero letter animation, progress bar, closing quote
  - Loading screen with branded progress indicator
- **Tailwind CSS v3**: Installed and configured with project design tokens
- **PostCSS pipeline**: Configured for Tailwind + Autoprefixer
- **Asset pipeline**: Downloaded DamagedHelmet.glb (3.77MB, CC-BY 4.0) and neon_photostudio_1k.exr (1.4MB, CC0)
- **Reference assets**: Sourced SVGs, frames, and icons from mongols.peachworlds.com for visual reference
- **Blueprint document**: 2026-06-29-vader-experience-blueprint.plan.md — comprehensive architecture docs

### Infrastructure
- Next.js 16.2.9 + React 19.2.7 + TypeScript 6.0.3
- Three.js 0.185.0, @react-three/fiber 9.6.1, @react-three/drei 10.7.7
- GSAP 3.15.0 + ScrollTrigger for scroll-driven animations
- Lenis 1.3.25 for smooth scrolling (homepage)
- 47 npm scripts for session management, DeepSeek LLM, Mem0, Draven, Telegram, backups

### Fixed
- **Critical: Tailwind CSS was not installed** — All `className` utilities were silently ignored. Added tailwindcss@3, postcss, autoprefixer with proper config files.
- **Critical: EffectComposer/Bloom crash** — `@react-three/postprocessing@3.0.4` caused silent WebGL failure with `three@0.185.0`. Removed until version compatibility is resolved.
- **Critical: Float wrapper Suspense deadlock** — `Float` from drei caused Suspense to hang when wrapping GLB models. Replaced with direct useFrame animation.
- **Canvas sizing**: Parent div `fixed inset-0 z-0` was not applying (no Tailwind) — canvas was 150px tall instead of fullscreen.

### Known Issues
- DamagedHelmet.glb loads (200 status) but does not visually render — needs debugging
- Bloom/EffectComposer disabled — version incompatibility
- Lenis smooth scroll not yet applied to vader-experience page (only homepage)
- No real asset loading progress — uses simulated setTimeout
- No ESLint configuration

### Research
- Deep analysis of mongols.peachworlds.com — custom Three.js renderer, Lenis, GSAP, real asset progress tracking
- Analyzed Zera Software Studio design system for pattern reference
- Sourced free CC0 assets: Poly Haven (HDR), Khronos Group (3D models), Pixabay/Pexels (artwork)

## 1.1.0 — 2026-06-29 (evening)

### Added
- **3 new skills added to shared-profile-content skeleton:**
  - `GLB-Asset-Sourcing` — comprehensive guide for finding, validating, and licensing free GLB models + HDR environment maps. Covers 6 sources (Poly Haven, Khronos, Sketchfab, poly.pizza, AmbientCG, Free3D), file validation (magic bytes), and integration patterns.
  - `Nextjs-Tailwind-Bootstrap` — setup checklist for Tailwind CSS on skeleton projects. Documents the critical gap that Tailwind is NOT included in the skeleton and must be installed manually.
  - `R3F-Gotchas` — known React Three Fiber issues with workarounds: EffectComposer+Bloom version crash, Float+Suspense deadlock, GLB model material traversal, Canvas positioning requirements.
- **SKILL-INDEX.md** updated in both shared-profile-content and VaderLabz

### Changed
- Hero section glass box replaced with full-width glass strip — text is no longer squeezed (max-w constraint removed)
- Removed torus knot fallback mesh from 3D scene (user disliked it)
- HelmetModel material traversal improved with proper `needsUpdate` and shadow casting

### Infrastructure
- Skills now shared between `_core-scripts/shared-profile-content/skills/` and `VaderLabz/.cursor/skills/`
