# Vader Experience — Blueprint for Scroll-Driven 3D Websites

**Date:** 2026-06-29
**Project:** VaderLabz Profile
**Reference Site:** mongols.peachworlds.com
**Status:** v1 foundation complete — fine-tuning & debugging phase

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Tech Stack & Versions](#2-tech-stack--versions)
3. [Project Bootstrap & Critical Setup](#3-project-bootstrap--critical-setup)
4. [Page Structure](#4-page-structure)
5. [3D Scene Architecture](#5-3d-scene-architecture)
6. [Scroll-Driven Narrative System](#6-scroll-driven-narrative-system)
7. [Asset Pipeline](#7-asset-pipeline)
8. [Design Token System](#8-design-token-system)
9. [Known Issues & Gotchas](#9-known-issues--gotchas)
10. [Next Steps / Phase 2](#10-next-steps--phase-2)
11. [Reference Architecture — mongols.peachworlds.com](#11-reference-architecture--mongolspeachworldscom)

---

## 1. Architecture Overview

```
VaderLabz (Next.js 16 + React 19)
│
├── app/layout.tsx          ← Root layout — fonts, providers, shell
├── app/globals.css          ← Tailwind + design tokens + utilities
├── app/page.tsx             ← Homepage (marketing landing page)
├── app/vader-experience/    ← Immersive 3D scroll-driven narrative page
│   └── page.tsx             ← *This blueprint's subject*
│
├── components/
│   ├── CustomCursor.tsx     ← Crosshair dot cursor
│   ├── StudioRails.tsx      ← Fixed sidebar navigation rails
│   ├── ThreeBackground.tsx  ← Hero 3D background (used on homepage)
│   ├── FloatingArtefact.tsx ← Procedural 3D crystal (used on homepage)
│   └── ArtefactScene.tsx    ← Scene wrapper for FloatingArtefact
│
├── lib/
│   ├── lenis-provider.tsx   ← Lenis smooth scroll provider
│   └── useGsapScroll.ts     ← GSAP + ScrollTrigger hooks
│
├── public/media/            ← All 3D assets, images, SVGs
│
├── tailwind.config.ts       ← Tailwind v3 config
├── postcss.config.mjs       ← PostCSS with tailwindcss + autoprefixer
├── next.config.mjs          ← Next.js config (3D transpilation)
└── package.json             ← Dependencies & scripts
```

---

## 2. Tech Stack & Versions

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.2.9 | App router, static generation |
| React | 19.2.7 | UI framework |
| TypeScript | 6.0.3 | Type safety |
| Three.js | 0.185.0 | 3D rendering engine |
| @react-three/fiber | 9.6.1 | React renderer for Three.js (R3F) |
| @react-three/drei | 10.7.7 | R3F utilities (useGLTF, Environment, ContactShadows) |
| @react-three/postprocessing | 3.0.4 | Bloom, effect composer (currently disabled — crashes) |
| GSAP | 3.15.0 | Scroll-driven animations |
| Lenis | 1.3.25 | Smooth scrolling |
| Tailwind CSS | 3.4.19 | Utility-first CSS |
| PostCSS | 8.5.16 | CSS processing pipeline |

### Dependency Installation Notes

**Tailwind is NOT auto-installed by the skeleton system.** It must be manually added:
```bash
npm install -D tailwindcss@3 postcss autoprefixer
```

Then create:
- `tailwind.config.ts` — content paths, theme extensions
- `postcss.config.mjs` — tailwindcss + autoprefixer plugins
- Update `globals.css` — add `@tailwind base/components/utilities` directives

**Without this step, every `className` utility is silently ignored.**

---

## 3. Project Bootstrap & Critical Setup

### 3.1 Skeleton System

The project was bootstrapped from `D:\Hermes\projects\_core-scripts\shared-profile-content\`. This provides:
- `.cursor/rules/` — Agent operational rules (workflow, voice, mem0, etc.)
- `.cursor/prompts/` — Start-Project and End-Project rituals
- `.cursor/docs/` — START-HERE.md, MASTER-COMMANDS.md, MEM0-LMSTUDIO.md, etc.
- `package.json` — Script skeleton (47 scripts across web, session, mem0, draven, telegram, docs, backup, sync)
- `TRUTH.md` — Project constitution
- `AGENTS.md` — Agent instructions
- `SKILL-INDEX.md` — Skill catalog

### 3.2 Critical Bootstrap Gotchas

| Issue | Root Cause | Fix |
|-------|------------|-----|
| Tailwind not working | Tailwind + PostCSS not installed | Install tailwindcss@3, postcss, autoprefixer; create config files |
| `EffectComposer` crash | `@react-three/postprocessing` 3.0.4 + R3F 9.x incompatibility | Remove EffectComposer and Bloom imports; skip post-processing |
| `Float` wrapper hang | `@react-three/drei` Float may cause Suspense deadlock with some GLB models | Remove Float wrapper; animate directly in useFrame |
| 3D canvas renders black | Missing Tailwind means `fixed inset-0 z-0` doesn't apply; parent is `position: static` | Install Tailwind (see above) |
| GLB model fetch issues | Large models (>2MB) can timeout in dev mode | Preload with `useGLTF.preload('/path/to/model.glb')` at module level |
| `useGSAP` import from `@gsap/react` | Package not installed; GSAP 3.15 doesn't need the React-specific hook | Use `gsap.context()` directly instead |
| Canvas too small (150px) | Parent div missing Tailwind classes | Fixed by correcting Tailwind setup |

### 3.3 Project-Level Configuration Requirements

**`next.config.mjs`:**
```js
transpilePackages: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing']
```

**`layout.tsx`:**
- Load `Cormorant_Garamond` and `Space_Mono` via `next/font/google` as CSS variables
- Wrap children in `<LenisProvider>`, include `<StudioRails />` and `<CustomCursor />`

---

## 4. Page Structure

### 4.1 Page Component Architecture

```
VaderExperiencePage (client component)
│
├── LoadingScreen            ← Fullscreen overlay with progress bar + VADERLABZ logo
├── TopNav                   ← Fixed top nav (STORY, PHILOSOPHY, PROJECTS, PROOF, CONNECT) + dot nav
│
├── BgOverlay                ← Fixed root div:
│   ├── Canvas (fixed, fullscreen)  ← 3D scene (z-0)
│   ├── Vignette overlay (z-20)    ← radial-gradient vignette
│   ├── Red glow (z-0)             ← accent ambient glow
│   └── Content container (z-30)   ← All scroll-driven sections
│       │
│       ├── HeroSection            ← "VADERLABZ" animated lettering + tagline
│       │   └── ScrollPrompt       ← "SCROLL TO START EXPERIENCE" at bottom
│       │
│       ├── ChapterSection × 5    ← One per chapter (min-h-screen, glass panel)
│       │   ├── Chapter marker (01-05)
│       │   ├── Title + subtitle
│       │   ├── Summary paragraph
│       │   └── Read More button → opens ArticleOverlay
│       │
│       ├── Stats Strip            ← 4 stats with animated counters
│       ├── Closing Quote          ← Genghis Khan quote + "VADER PROTOCOL v1.0"
│       └── Footer / StudioRails   ← Navigation links
│
├── ArticleOverlay           ← Modal overlay for chapter details (z-200)
│
└── ProgressBar              ← Right-side vertical progress indicator
```

### 4.2 Z-Index Layer Cake

| z-index | Element | Notes |
|---------|---------|-------|
| 0 | 3D Canvas | Fixed fullscreen background |
| 0 | Red glow | Ambient accent glow |
| 20 | Vignette | Dark radial vignette overlay |
| 30 | Content | All scroll sections |
| 40 | Right nav rail | Chapter dot navigation |
| 90 | Studio rails | Sidebar labels + progress |
| 200 | Article overlay | Modal overlay |
| 9999 | Loading screen | On mount only, fades out |

---

## 5. 3D Scene Architecture

### 5.1 Scene Setup

```tsx
<Canvas
  camera={{ position: [0, 1.2, 4], fov: 45, near: 0.1, far: 100 }}
  gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
>
  <Scene3D progressRef={progressRef} />
</Canvas>
```

The `Scene3D` component contains:
- **Ambient light** (intensity: 0.5)
- **Directional lights**: key light (white, intensity 4), fill light (red accent, intensity 2), rim light (orange, intensity 1)
- **HelmetModel**: GLB model with animated rotation, scroll-driven camera orbit, mouse parallax
- **Environment**: HDR environment map for reflections (`neon_photostudio_1k.exr`)
- **ContactShadows**: Soft ground shadow

### 5.2 Helmet Model Component

```tsx
function HelmetModel({ progressRef }) {
  const groupRef = useRef<THREE.Group>(null!)
  const { scene } = useGLTF('/media/DamagedHelmet.glb')
  const { camera } = useThree()
  const mouseRef = useRef({ x: 0, y: 0 })

  // Mouse parallax
  useEffect(() => { /* tracks mouse position */ }, [])

  // Per-frame animation
  useFrame((state, delta) => {
    // Slow Y rotation + scroll-driven X tilt
    // Mouse-follow subtle Z rotation
    // Scale: 1.2 → 1.6 based on scroll progress
    // Position drifts downward on scroll
    // Camera orbits around origin based on scroll progress
  })

  const cloned = useMemo(() => scene.clone(), [scene])
  return <primitive ref={groupRef} object={cloned} />
}
```

### 5.3 Camera Animation (Scroll-Driven)

| Scroll % | Camera Position | Camera LookAt |
|----------|----------------|---------------|
| 0% | (0, 1.2, 4) | (0, 0, 0) |
| 25% | (4, 0.8, 0) | (0, 0, 0) |
| 50% | (0, 0.5, -4) | (0, 0, 0) |
| 75% | (-4, 0.2, 0) | (0, 0, 0) |
| 100% | (0, -0.1, 4) | (0, 0, 0) |

Formula: `orbitAngle = scrollProgress * Math.PI * 2`
```tsx
camera.position.x = Math.sin(orbitAngle) * 4
camera.position.z = Math.cos(orbitAngle) * 4
camera.position.y = 1.2 - p * 1.5
camera.lookAt(0, 0, 0)
```

### 5.4 Debugging the 3D Scene

If the 3D scene renders as a black canvas:

1. **Check parent element positioning** — the Canvas wrapper must have `position: fixed` (requires Tailwind or manual CSS)
2. **Remove Float wrapper** — can cause Suspense deadlocks with some GLB models
3. **Remove EffectComposer + Bloom** — known compatibility issues with R3F 9.x / drei 10.x
4. **Add a test mesh** (torus knot or box) to confirm basic 3D rendering works
5. **Preload the GLB** with `useGLTF.preload()` at module level
6. **Check WebGL context** — `canvas.getContext('webgl2')` should not be null
7. **Verify asset serving** — `fetch('/media/model.glb')` should return 200

---

## 6. Scroll-Driven Narrative System

### 6.1 Scroll Progress Tracking

```tsx
function getScrollProgress(): number {
  if (typeof window === 'undefined') return 0
  const total = document.documentElement.scrollHeight - window.innerHeight
  return total > 0 ? Math.min(window.scrollY / total, 1) : 0
}
```

Used via `useRef` with `useEffect` listening to `scroll` events for continuous updates passed to the Canvas.

### 6.2 Chapter Section Pattern

Each chapter is a `<section className="relative min-h-screen flex items-center">` containing a glassmorphism panel:

```tsx
<div
  className="max-w-[440px] ml-[6%] md:ml-[15%] p-6 md:p-8 rounded-xl md:rounded-2xl"
  style={{
    background: 'rgba(0,0,0,0.55)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.04)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
  }}
>
  {/* Chapter marker, title, subtitle, summary, Read More button */}
</div>
```

### 6.3 GSAP Reveal Animation

```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'top 40%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [sectionRef, panelRef])
  return () => ctx.revert()
}, [])
```

### 6.4 Article Overlay

```tsx
function ArticleOverlay({ chapter, onClose }) {
  // Fixed fullscreen modal with glassmorphism
  // Fades in with blur transition
  // Close on backdrop click or button
  // Contains full chapter detail text
}
```

---

## 7. Asset Pipeline

### 7.1 Asset Sourcing

| Asset | Source | License | Size | Notes |
|-------|--------|---------|------|-------|
| `DamagedHelmet.glb` | Khronos Group glTF-Sample-Assets (GitHub) | CC-BY 4.0 | 3.6 MB | High detail, PBR, sub-surface scattering |
| `neon_photostudio_1k.exr` | Poly Haven API (via CDN) | CC0 | 1.4 MB | Neon studio lighting, good for metallic reflections |
| Artwork | Pixabay / Pexels / Unsplash | CC0 / Free | varies | For chapter article backgrounds |

### 7.2 Asset Storage

All assets go under `public/media/` for static serving:
```
public/media/
├── DamagedHelmet.glb           ← 3D model
├── neon_photostudio_1k.exr     ← HDR environment map
├── logo.svg                    ← Brand logo
├── *.png / *.webp              ← Images
├── *.svg                       ← Icons
└── mongols_ref/                ← Reference assets (dev only)
```

### 7.3 Loading Strategy

- `useGLTF.preload()` at module level for GLB models
- `<Suspense fallback={null}>` wraps all 3D content
- Loading screen with simulated progress bar (setTimeout-based, not real asset loading — needs improvement)

---

## 8. Design Token System

### 8.1 CSS Custom Properties (globals.css)

```css
:root {
  --accent: #ff2a36;
  --accent-dim: #cc1f28;
  --accent-glow: rgba(255, 42, 54, 0.3);
  --accent-subtle: rgba(255, 42, 54, 0.08);
  --bg-deep: #000000;
  --bg-canvas: #0a0a0b;
  --bg-card: rgba(15, 15, 18, 0.7);
  --border-subtle: rgba(255, 255, 255, 0.06);
  --border-accent: rgba(255, 42, 54, 0.15);
  --text-primary: #f0f0f0;
  --text-muted: #888899;
  --text-dim: #555566;
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-display: var(--font-cormorant), 'Cormorant Garamond', serif;
  --font-mono: var(--font-space-mono), 'Space Mono', monospace;
  --ease-vader: cubic-bezier(0.22, 1, 0.36, 1);
  --rail-width: 42px;
}
```

### 8.2 Tailwind Theme Extensions

```ts
colors: {
  accent: '#ff2a36',
  'accent-dim': '#cc1f28',
  'bg-deep': '#000000',
  'bg-canvas': '#0a0a0b',
  'text-primary': '#f0f0f0',
  'text-muted': '#888899',
  'text-dim': '#555566',
}
fontFamily: {
  display: ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
  mono: ['var(--font-space-mono)', 'Space Mono', 'monospace'],
}
```

### 8.3 Key Visual Effects

| Effect | Implementation | Status |
|--------|---------------|--------|
| Glassmorphism panels | `backdrop-filter: blur(12px)` + `rgba(0,0,0,0.55)` bg | Working |
| Vignette | `radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 90%, ...)` | Working |
| Red accent glow | `radial-gradient(circle, #ff2a36 0%, transparent 70%)` | Working |
| Bloom on 3D | `EffectComposer` + `Bloom` from `@react-three/postprocessing` | **Broken** — see gotchas |
| Custom cursor | 8px accent dot with `mix-blend-mode: difference` | Working |
| Thin scrollbar | Custom `::-webkit-scrollbar` styling | Working |
| HDR environment | `Environment` component with `.exr` file | Working |
| Contact shadows | `ContactShadows` from drei | Working |

---

## 9. Known Issues & Gotchas

### 9.1 @react-three/postprocessing Crash
- **Symptom:** WebGL canvas renders black when EffectComposer + Bloom is used
- **Probable cause:** Version incompatibility between `@react-three/postprocessing@3.0.4`, `three@0.185.0`, and `@react-three/fiber@9.6.1`
- **Status:** Removed — needs investigation or version pinning
- **Reference:** The EffectComposer may also require specific three.js version compatibility

### 9.2 Float Wrapper + GLB Models
- **Symptom:** Suspense boundary hangs when Float wraps a GLB model loaded via useGLTF
- **Probable cause:** Float attempts to animate properties that conflict with the cloned scene's animation state
- **Workaround:** Animate the group directly in useFrame instead

### 9.3 DamagedHelmet Model Not Appearing
- **Symptom:** Model loads (200 status, 3.77MB) but doesn't render
- **Probable causes:**
  - Model uses specific Three.js version features not compatible with 0.185.0
  - Sub-surface scattering material doesn't light well with the scene lighting
  - The cloned scene object may have scale/rotation issues
- **Diagnosis needed:** Test with simpler GLB models, check for console errors

### 9.4 Tailwind Build Integration
- **Symptom:** className utilities silently don't apply
- **Root cause:** Tailwind not installed or configured
- **Fix:** Install tailwindcss@3, postcss, autoprefixer; create config files; add @tailwind directives to globals.css

### 9.5 Canvas Position: Static
- **Symptom:** 3D canvas only ~150px tall
- **Root cause:** Parent div's `fixed inset-0 z-0` className does nothing without Tailwind
- **Fix:** Properly install and configure Tailwind

---

## 10. Next Steps / Phase 2

### 10.1 High Priority
- [ ] Debug DamagedHelmet.glb rendering (test with simpler mesh, check console errors)
- [ ] Re-enable Bloom/EffectComposer with correct version pinning
- [ ] Add real asset loading progress (not simulated setTimeout)
- [ ] Implement responsive breakpoints for mobile layouts

### 10.2 Design Refinement
- [ ] Add Lenis smooth scroll to vader-experience page (currently only on homepage)
- [ ] Improve GSAP scroll-triggered letter animations in hero
- [ ] Add transition effects between chapters (camera cuts, not continuous orbit)
- [ ] Refine glassmorphism panel backgrounds for better readability
- [ ] Add hover states on Read More buttons and navigation links

### 10.3 Performance
- [ ] Optimize GLB model (reduce polygon count, compress textures)
- [ ] Lazy load chapter content
- [ ] Add WebGL error boundary with fallback UI
- [ ] Reduce bundle size (code splitting for 3D libraries)

### 10.4 Content
- [ ] Replace demo content with final VaderLabz narrative
- [ ] Add real project links and screenshots
- [ ] Add social proof (testimonial quotes, GitHub stars)
- [ ] Localize chapter detail articles

### 10.5 Infrastructure
- [ ] Add proper ESLint configuration
- [ ] Set up Playwright tests for critical user flows
- [ ] Add CI/CD pipeline for preview deployments

---

## 11. Reference Architecture — mongols.peachworlds.com

The reference site uses a sophisticated scroll-driven 3D experience. Key architectural observations:

### Detected Stack

| Feature | Implementation |
|---------|----------------|
| Smooth scroll | Lenis (v1.x) |
| Scroll animations | GSAP 3.x + ScrollTrigger |
| WebGL 3D | Three.js via custom renderer (not R3F) |
| Loading screen | Animated SVG progress ring with real asset tracking |
| Custom cursor | CSS-based crosshair/ring that follows mouse |
| Typography | Serif headings, mono accents, sans-serif body |
| Color scheme | Deep black background, warm gold/amber accent, white text |
| Glassmorphism | Content panels with backdrop-filter: blur() |
| Parallax | Multi-layered depth with scroll-driven camera |

### Notable UX Patterns

1. **Loading → Content transition:** Assets load → progress ring fills → loading screen fades with blur → 3D scene starts
2. **Scroll-driven camera:** Camera orbits around the 3D subject in a circular path, synchronized with scroll position
3. **Chapter markers:** Numeric markers (01, 02) are large, semi-transparent, and fixed-position overlays
4. **Narrative pacing:** Each chapter triggers a camera position + model rotation change, giving the feel of "moving through" the story
5. **Visual layering:** Vignette + 3D scene + glass content panels + ambient glow create cinematic depth

### Differences from Our Implementation

| Aspect | mongols.peachworlds.com | Our vader-experience |
|--------|------------------------|---------------------|
| 3D rendering | Custom Three.js (non-React) | React Three Fiber |
| Camera control | Manual orbit with GSAP | useFrame math |
| Asset loading | Real progress tracking | Simulated setTimeout |
| Smooth scroll | Lenis | Not yet implemented (homepage has it) |
| Chapter transitions | Camera cuts + model pose changes | Continuous camera orbit |
| Bloom/glow | Yes, working | Currently disabled |

---

*This blueprint serves as both documentation and implementation guide for the VaderLabz Vader Experience page. Update as the project evolves.*
