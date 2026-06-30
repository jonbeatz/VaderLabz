# Changelog — VaderLabz

## 2.3.0 - 2026-06-30

### Added
- **Rebuilt `/vader-experience-v3`** — Exact copy of main `/` page with `skywalker_lightsaber.glb` model (Skywalker saber from v2). Full accordion controls, Bloom, HDR picker, saber rotation, blade color, camera orbit, mouse parallax.
- **Blade-only emissive fix** — Split scene clone from color update. Blade material cached via `bladeMatRef` and patched directly with `useEffect`. No more colorizing the handle mesh.
- **GLB optimization tools** — Documented 4 tools in `3D-Modeling` & `GLB-Asset-Sourcing` skills: glTF-Transform, glb-compressor, meshoptimizer, gltf-pipeline

### Fixed
- **Blade color was colorizing entire handle** — Removed `includes('saber')` match, only matches `'blade'` now. Colors boosted for vivid glow (intensity `8→15`).
- **Saber was too large on v3** — Scale changed from `2.1 + p * 0.6` to `0.18 + p * 0.06` matching v2 defaults

### Changed
- **SKILL-INDEX.md** — 3D-Modeling tags updated with `compression, pipeline`

## 2.2.0 - 2026-06-30

### Added
- **Accordion controls panel** — Collapsible bottom-left widget with 5 sections: Scene, Bloom, Saber, Camera, Mouse
- **Saber rotation control** — Off, Slow, Norm, Fast rotation speed via `useFrame`
- **Blade color picker** — Red, Blue, Green, Purple — live updates emissive on blade mesh
- **Camera orbit modes** — Static, Slow, Full (scroll-driven orbit)
- **Mouse parallax toggle** — On/Off control for saber tilt following cursor

### Fixed
- **Glass card glow artifact** — Removed separate `blur-xl` glow divs that created stretched ellipse shadows to the right of chapter cards. Replaced with `boxShadow` contained within card bounds.
- **ContactShadows removed** — Was visible through semi-transparent glass panels causing visual artifacts

### Changed
- **UI polish** — Larger text (`0.6rem` buttons, `0.65rem` headers), brighter colors, subtle borders on inactive buttons

## 2.1.0 - 2026-06-30

### Added
- **Main `/` page Vader saber** — Switched from `DamagedHelmet.glb` to `darth_vader_lightsaber.glb` with Bloom glow
- **HDR Environment Picker** — Collapsible bottom-left UI (✦ icon) for testing 4 HDR environments: Neon Studio, Colorful, Photo Studio, Office
- **3 new HDR maps** — Downloaded from Poly Haven: `colorful_studio_1k.exr`, `photo_studio_01_1k.exr`, `poly_haven_studio_1k.exr` (all CC0)

### Changed
- **Bloom settings** — Tuned to `intensity: 0.3, kernelSize: 1, mipmapBlur` for subtle blade glow without white halos
- **Model references** — All chapter `detail` texts updated to reference actual model names across all pages

## 2.0.2 - 2026-06-30

### Fixed
- **Bloom/EffectComposer crash** — Removed `@react-three/postprocessing` imports from `vader-experience-v2/page.tsx` (crashed build with `three@0.185.0`)
- **Callback ref hydration bug** — Replaced `ref={el => ...}` with className-based selectors in `vader-experience-v2/page.tsx`
- **V3 fossil files** — Cleaned 3 leftover subdirectories from `app/vader-experience-v3/` (contained crash-causing code)
- **Build verified** — `npm run web:build` passes clean, 0 errors

### Added
- **LM Studio auto-launch** — `session-start.ps1` now launches LM Studio if offline (waits up to 30s for API)
- **Mem0 smoke test** — `Start-Project.md` now runs `mem0:search -- "test"` to confirm model is loaded
- **Skeleton v1.11.0** — All Start Project improvements backported to shared-profile-content

## 2.0.1 - 2026-06-30

### Fixed
- **Recursive nesting crash** (`app/vader-experience-v3`) — 285 levels of self-nesting detected and eliminated. Caused Next.js file watcher to exhaust 32GB RAM during dev. Root cause: test-version iteration created `vader-experience-v3` inside itself during a copy operation. Lesson: when creating versioned test directories, verify no recursive nesting before running dev server.

## 2.0.0 - 2026-06-30

### Added
- `/vader-experience` page — immersive scroll-driven 3D narrative
- Darth Vader lightsaber 3D model with scroll-driven camera orbit
- Full-screen background image (vaderBG-2.jpg) with dark overlay
- Smooth scroll navigation (top nav + right side progress bar dots)
- 06 nav marker scrolling to page bottom
- Fade-in back-to-top button on bottom-right
- Soft red glow shadows behind all glass panels
- Glass blur rendering optimization (will-change + opacity layer)
- VaderLabz motto: "Build, break, and learn. Forged in the dark."
- README with screenshots of homepage and experience page

### Changed
- 3D model swapped from DamagedHelmet.glb to darth_vader_lightsaber.glb
- Loading screen: logo image replaced with VADER (white) + LABZ (red) text
- Top nav: VADERLABZ text now white VADER + red LABZ
- Main homepage nav links converted to smooth-scroll buttons
- Glass panels now render instantly (no blur pop-in delay)

### Removed
- Genghis Khan quote replaced with VaderLabz motto

## 1.0.0 - 2026-06-28

### Added
- Initial project bootstrap from shared-profile-content skeleton
- Main homepage with hero, story, philosophy, projects, proof sections
- 3D animated background (Three.js / R3F)
- Vader Red (#ff2a36) design palette
- Project structure: rules, prompts, skills, docs, MCP config
- Backup system with quick and full backup scripts
- Draven co-pilot integration with cross-session Mem0 memory
