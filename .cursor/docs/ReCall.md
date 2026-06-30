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

### 2026-06-30 (Early AM) — vader-experience immersion + polish + git push

- **3D model swap:** DamagedHelmet.glb replaced with `darth_vader_lightsaber.glb` (copied over same filename)
- **Saber positioning:** Adjusted scale (2.5x), Y position (0.6 starting, drops to -1.2 on scroll), camera orbit
- **Background image:** Added `vaderBG-2.jpg` as full-screen background with `brightness(0.65)` + dark gradient overlay
- **Smooth scroll navs:** Converted all nav links from `<a href="#id">` (instant jumps) to `<button>` + `window.scrollTo({ behavior: 'smooth' })`
  - Top nav: `01`-`06` buttons, VADERLABZ logo scrolls to top
  - Right progress bar: clickable dots now scroll to sections, highlighted on scroll position
  - Main homepage: STORY, PHILOSOPHY, PROJECTS, PROOF, CONNECT labels now smooth scroll
- **Right nav 06:** Added to both top nav and progress bar — scrolls to page bottom
- **Back-to-top button:** Bottom-right, fades in after 50% viewport scroll, glass pill with up arrow
- **New motto:** "Build, break, and learn. Forged in the dark." — VaderLabz (replaced Genghis Khan quote)
- **Loading screen:** Changed from logo image back to text "VADERLABZ", now shows white VADER + red LABZ
- **Top nav logo:** Same VADER (white) + LABZ (red) split
- **Glass glow effects:** All 4 glass panels (hero strip, chapter panels, closing quote, footer) now have soft red `radial-gradient` glow behind them
- **Glass rendering fix:** Added `will-change-[backdrop-filter]` and `opacity: 0.99` to force GPU compositing on first paint (removes 1-2 frame blur pop-in)
- **Hydration fix:** Added `suppressHydrationWarning` on `dangerouslySetInnerHTML` elements
- **Scroll prompt fade:** "SCROLL TO START EXPERIENCE" fades out as user scrolls
- **Git:** Committed and pushed to origin/main

### 2026-06-30 (Later) — v2.0 release cycle

- **README:** Added homepage + experience page screenshots, expanded project docs
- **v1.0.0 release:** Tagged `v1.0.0`, pushed to GitHub, created release with release notes
- **Branch cut:** Created `VaderLabz-Project-v2` branch from `main`
- **Version bump:** Updated `package.json`, `TRUTH.md`, `README.md` to 2.0.0
- **CHANGELOG.md:** Created with full version history (v1.0.0 + v2.0.0 entries)
- **project-log.md:** Added v2.0 release entry
- **ReCall.md:** This entry
- **Next:** Create v2.0.0 release on GitHub

### 2026-06-30 (Late) — Route restructuring + README reboot + screenshot cleanup

*(existing content above)*

### 2026-06-30 (Session 2 — Start Project refactor + v3 cleanup + skeleton backport)

- **Start Project ritual overhaul:**
  - `session-start.ps1` now **auto-launches LM Studio** if offline (finds at Program Files, waits 30s for API)
  - Step 2 added to `Start-Project.md`: `mem0:preflight` + `mem0:search -- "test"` smoke test to confirm model loaded
  - `START-HERE.md` checklist updated to include LM Studio check + smoke test
  - Backported to shared-profile-content skeleton as **v1.11.0**
- **V3 folder cleanup:** Removed 3 fossil subdirectories (`vader-experience/`, `vader-experience-v2/`, `archive/`) from `app/vader-experience-v3/` — contained Bloom crash code + callback ref bugs
- **v2 page fix:** Removed `EffectComposer`/`Bloom` import + usage from `app/vader-experience-v2/page.tsx` (would crash build)
- **v2 callback ref fix:** Replaced `ref={el => dotRefs.current[i] = el}` with className-based `.progress-dot` selectors in v2 page
- **Build verified:** `npm run web:build` passes clean — 6 routes, 0 errors
- **Telegram morning conversation notes saved** to both `vaderlabz_memories` and `draven_memories`
- **Voice greeting spoken:** Draven welcome on first Start Project of session
- **Mem0:** Session context added to both collections

- **Route restructure:**
  - `/vader-experience` promoted to new default `/` route (main site)
  - Original homepage moved to `/archive` for reference
  - `/vader-experience-v2` created as safe fallback copy for experiments
  - `/vader-experience` now redirects to `/`
  - Subtle `°` archive link in top nav
- **README revamp:** Replaced with JonBeatz-Command-Center style layout:
  - Badges with `logo=` icons (Platform, Version, Release, Repo, Next.js, Three.js, Cursor)
  - Hero screenshot at top, source of truth banner, numbered sections
  - Status table with emojis, comparison table, architecture diagram
- **New skill:** `GitHub-README-Template` — documents the canonical README format with reference to `D:\Hermes\projects\JonBeatz\README.md`
- **SKILL-INDEX.md:** Added GitHub-README-Template entry
- **Screenshot fix:** Disabled `devIndicators` in `next.config.mjs` to remove Next.js DevTools badge from screenshots
- **Hydration fix:** Replaced callback refs (`ref={el => dotRefs.current[i] = el}`) with className-based selectors to eliminate hydration mismatch errors
- **v2.0.0 release:** Tagged and released on GitHub with full release notes

---

*Last Entry: 2026-06-30 (Session 3)*

### 2026-06-30 (Session 3 — Main page saber + Bloom + HDR picker)

- **Main `/` page overhaul:**
  - Model swapped from `DamagedHelmet.glb` → `darth_vader_lightsaber.glb` (Vader's lightsaber)
  - Component renamed from `HelmetModel` → `SaberModel`
  - Added `EffectComposer` + `Bloom` with tunable intensity
  - Blade emissive boosted for red glow pickup in Bloom
  - Chapter detail text updated from "DamagedHelmet" to accurate model names across all pages
- **Bloom tuning session:**
  - Settled on: `luminanceThreshold: 0.1, luminanceSmoothing: 0.02, intensity: 0.3, mipmapBlur, kernelSize: 1`
  - Blade emissive set to `(0.6, 0.02, 0.0) @ intensity 2` — subtle enough to avoid white halos
- **HDR Environment Picker:**
  - Downloaded 3 new free CC0 HDR environments from Poly Haven: `colorful_studio`, `photo_studio_01`, `poly_haven_studio`
  - Added collapsible bottom-left HDR picker UI (✦ icon → click to reveal presets → click ✕ to collapse)
  - Picker supports instant environment swapping for A/B testing
- **Updated docs + Mem0/Draven memories**

---

*Last Entry: 2026-06-30 (Session 4)*

### 2026-06-30 (Session 4 — Accordion controls panel + glow fix + full interaction tools)

- **Accordion restructure:** Replaced flat HDR+Bloom buttons with collapsible accordion sections: Scene, Bloom, Saber, Camera, Mouse
- **New controls added:**
  - **Saber rotation:** Off, Slow, Norm, Fast — changes `delta * speed` in useFrame
  - **Blade color:** Red, Blue, Green, Purple — updates emissive color on blade mesh
  - **Camera orbit:** Static, Slow, Full — toggles scroll-driven camera orbit
  - **Mouse parallax:** On/Off — toggles saber tilt following cursor
- **Glass card glow fix:** Removed separate `blur-xl` glow divs creating stretched ellipse artifacts on right of cards. Replaced with `boxShadow` containing glow within card bounds. Removed `ContactShadows` from 3D scene (was visible through glass).
- **UI polish:** Larger text, brighter colors, subtle borders on inactive buttons for readability

---

*Last Entry: 2026-06-30 (Session 6)*

### 2026-06-30 (Session 6 — CVE fix + redeploy + deploy content sync)

- **CVE-2026-41305 fixed:** `postcss@8.4.31` dev dependency upgraded to `8.5.16` (latest) — Hostinger security scan flagged moderate XSS via unescaped `</style>` in CSS stringify.
- **Redeployed:** Archive rebuilt and deployed to vaderlabz.com. Build passed clean.
- **503 fixed:** Node.js app restarted via hPanel. All 5 routes returning HTTP 200.
- **Next.js bundled postcss:** `postcss@8.4.31` remains vendored inside next@16.2.9. Cannot be patched externally — zero runtime impact.
- **Version bumped to 2.3.1**
- **Live deploy content synced:** Uncommitted page.tsx changes (v3 deploy swap) committed and pushed.

### 2026-06-30 (Session 5 — v3 revamp + blade color fix + GLB tools)
- **Rebuilt `/vader-experience-v3`** — exact copy of main `/` page with `skywalker_lightsaber.glb` model (matching v2 scale: `0.18 + p * 0.06`, position: `0.6 + p * -1.8`)
- **Blade-only emissive fix:** Split scene clone from blade color update — `useMemo` for cloning, `useEffect` + `bladeMatRef` to patch emissive directly. Removed `includes('saber')` match that was colorizing handle meshes. Colors boosted (Red `0.6→1.0`, Blue `0.8→1.0`, etc.) with intensity `8→15` for vivid glow
- **GLB optimization tools documented:**
  - Added 4 tools to `3D-Modeling` skill: glTF-Transform, glb-compressor, meshoptimizer, gltf-pipeline
  - Added same toolchain to `GLB-Asset-Sourcing` skill
  - Updated `SKILL-INDEX.md` tags
- **Updated docs + Mem0/Draven memories**
