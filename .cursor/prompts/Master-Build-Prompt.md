# VaderLabz Master Build Prompt

Use this prompt when asking Cursor/Claude to build or modify VaderLabz experience pages. It ensures the agent uses the correct architecture, tools, and conventions.

---

## Project Identity

- **Project:** VaderLabz — Dev Lab & AI Playground
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + custom CSS modules where needed
- **3D Stack:** React Three Fiber + @react-three/drei + @react-three/postprocessing
- **Animation:** GSAP + ScrollTrigger + Lenis
- **Text splitting:** SplitType (for cinematic text reveals)
- **Node:** >= 18

## Architecture

### Routes
Each experience is a config-driven route using the Experience Engine:

```
app/
  page.tsx                    ← main route (Darth Vader saber)
  vader-experience/page.tsx   ← Darth Vader saber alt
  vader-experience-v2/page.tsx ← Skywalker saber, no controls
  vader-experience-v3/page.tsx ← Skywalker saber, full controls
  archive/page.tsx            ← legacy fallback
```

### Experience Engine (lib/experience-engine/)
DO NOT modify engine internals unless explicitly asked. The engine is:

```
lib/experience-engine/
  index.ts          ← barrel export
  engine.tsx        ← createVaderExperience(config) — the main factory
  types.ts          ← ExperienceConfig + shared types
  config.ts         ← HDR_PRESETS, BLOOM_PRESETS, SABER_COLORS, etc.
  scene/
    SaberModel.tsx  ← 3D lightsaber model with emissive/blade logic
    Scene3D.tsx     ← Canvas + lights + Environment + EffectComposer + Bloom
  ui/
    AccordionSection.tsx
    ArticleOverlay.tsx
    BackToTop.tsx
    BgOverlay.tsx
    ChapterSection.tsx
    ClosingQuote.tsx
    HdrPicker.tsx
    HeroAnimation.tsx
    LoadingScreen.tsx
    ProgressBar.tsx
    ScrollPrompt.tsx
    StatsStrip.tsx
    TopNav.tsx
```

### Route File Pattern
Each route file should be ~30 lines — a config wrapper, nothing more:

```typescript
import { createVaderExperience } from '@/lib/experience-engine';

const config = {
  modelPath: '/models/darth_vader_lightsaber.glb',
  defaultScale: 2.1,
  defaultHdrIndex: 6,
  defaultBloomIndex: 2,
  defaultSaberColorIndex: 7,
  // ... other settings
};

export default createVaderExperience(config);
```

## Key Conventions

### Protected Components
The following are HERO components. DO NOT modify them unless explicitly asked:
- `lib/experience-engine/engine.tsx`
- `lib/experience-engine/scene/SaberModel.tsx`
- `lib/experience-engine/scene/Scene3D.tsx`
- `lib/experience-engine/types.ts`
- `lib/experience-engine/config.ts`

### Custom Cursor
The custom red dot is an ADDITIVE OVERLAY on top of the OS cursor.
- NEVER set `document.body.style.cursor = 'none'`
- NEVER set `body { cursor: none }` in CSS
- CustomCursor renders a red dot alongside the normal pointer

### Scroll Animation
- `ChapterSection` uses GSAP + ScrollTrigger with a `panelRef`
- The `panelRef` must be on the inner content wrapper, not the outer section
- Hero text uses `HeroAnimation` component with GSAP letter animation

### 3D Scene
- Canvas parent MUST have `position: fixed` or absolute positioning (via Tailwind)
- Bloom is handled by `EffectComposer` + `Selection`/`Select` in Scene3D
- Saber emissive is applied ONLY to meshes where `child.name.includes('blade')`
- `dpr={[1, 1.5]}`, `gl={{ antialias: false, toneMapping: THREE.ACESFilmicToneMapping }}`

### Colors
- `TEXT_DIM = '#555566'`
- Background: deep black with radial glow
- Glass panels: `backdrop-filter: blur()` with subtle border
- Accent: warm gold / red (#ff3333 for VADER text)

### Media
- Store all media in `public/media/` (or project-root `media/` for uploads)
- Never use absolute host paths for media references
- GLB models in `public/models/`
- Images in `public/images/`
- HDR environments in `public/hdr/`
- Videos in `public/videos/`

## Multi-Agent Safety Rules

1. **Never** rewrite route files as full pages — they are config wrappers
2. **Never** touch the engine or scene components unless the task says "engine" or "scene"
3. **Never** set `cursor: none` — the cursor is always an additive overlay
4. **Never** duplicate globals.css or layout files — routes share the root layout
5. **Always** verify build exits 0 after changes
6. **Always** start dev server on port 3000 after build passes
7. **Always** protect approved hero sections when refining lower sections

## Build Verification

```bash
npm run build    # Must exit 0
```

After build, if port 3000 is free:
```bash
npm run dev      # Verify localhost:3000 responds
```
