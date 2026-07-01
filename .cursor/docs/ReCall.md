# ReCall.md — VaderLabz Memory

## Current Focus
- [2026-06-30] **Experience Engine Refactor** — 4 route files consolidated into config-driven engine.

## Session Log

### 2026-06-29 (PM) — vader-experience page + Tailwind fix + blueprint
*(existing content)*

### 2026-06-29 (Late) — Open Generative AI setup + Logo assets + Background removal skill
*(existing content)*

### 2026-06-30 (Early AM) — vader-experience immersion + polish + git push
*(existing content)*

### 2026-06-30 (Later) — v2.0 release cycle
*(existing content)*

### 2026-06-30 (Late) — Route restructuring + README reboot + screenshot cleanup
*(existing content)*

### 2026-06-30 (Session 3 — Main page saber + Bloom + HDR picker)
*(existing content)*

### 2026-06-30 (Session 4 — Accordion controls panel + glow fix + full interaction tools)
*(existing content)*

### 2026-06-30 (Session 6 — CVE fix + redeploy + deploy content sync)
*(existing content)*

### 2026-06-30 (Session 5 — v3 revamp + blade color fix + GLB tools)
*(existing content)*

### 2026-06-30 (Session 7 — Experience Engine Refactor)

#### Audit Findings (pre-refactor)
- ~5,000 lines of code across 4 route files (`/`, `/vader-experience`, `/vader-experience-v2`, `/vader-experience-v3`)
- ~97% identical code duplicated 4 times
- Each bug fix / feature required 4 manual edits
- `/archive` route preserved as permanent fallback

#### Architecture Delivered
```
lib/experience-engine/
  index.ts          ← barrel export
  engine.tsx        ← createVaderExperience(config) — main engine
  types.ts          ← ExperienceConfig + all shared types
  config.ts         ← HDR_PRESETS, BLOOM_PRESETS, SABER_COLORS, etc.
  scene/
    SaberModel.tsx  ← 3D lightsaber model with emissive/blade logic
    Scene3D.tsx     ← Canvas + lights + Environment + Bloom
  ui/
    AccordionSection.tsx  ← Collapsible accordion sub-component
    ArticleOverlay.tsx    ← Full article detail modal
    BackToTop.tsx         ← Bottom-right scroll-to-top button
    BgOverlay.tsx         ← Background image + gradient layers
    ChapterSection.tsx    ← Chapter content panel with GSAP
    ClosingQuote.tsx      ← "Build, break, and learn" quote
    HdrPicker.tsx         ← Bottom-right accordion controls panel
    HeroAnimation.tsx     ← GSAP letter animation
    LoadingScreen.tsx     ← Loading bar screen
    ProgressBar.tsx       ← Right-side progress dots
    ScrollPrompt.tsx      ← "SCROLL TO START EXPERIENCE"
    StatsStrip.tsx        ← Stats counter strip
    TopNav.tsx            ← Header navigation
```

#### Route Files (config wrappers — ~30 lines each)
| Route | Model | Controls | Archive Link |
|-------|-------|----------|-------------|
| `/` | `skywalker_lightsaber.glb` | Full | Internal `/` |
| `/vader-experience` | `darth_vader_lightsaber.glb` | Full | Internal redirect |
| `/vader-experience-v2` | `skywalker_lightsaber.glb` | None (hardcoded) | None |
| `/vader-experience-v3` | `skywalker_lightsaber.glb` | Full | Internal `/` |

#### Cleanup
- Deleted `app/vader-experience-v3/layout.tsx` — v3 now uses root layout
- Deleted `app/vader-experience-v3/globals.css` — duplicate
- Deleted `app/vader-experience-v3/page.module.css` — duplicate
- Deleted archive/ subfolders inside v3 route
- Deleted orphaned `media/` root dir (duplicate of `public/media/`)
- Removed unused `cursorEnabled` state, `scrollTo` handler, dead `ContactShadows` import

#### Build Verification
- `npm run build` — 6 routes, 0 errors, 0 TypeScript issues
- HTTP smoke tests — `/`, `/vader-experience`, `/vader-experience-v2`, `/vader-experience-v3`, `/archive` all return 200

#### Version
- New branch: `VaderLabz-Project-v3`
- Tagged: `refactor/v2.3.1-base`
- Plan saved: `.cursor/plans/2026-06-30-experience-engine-refactor.plan.md`
- Backup: `G:\Hermes_Project_BackUpz\VaderLabz\vaderlabz-project-v1-i`

---

### 2026-07-01 (Session 8 — session-start.ps1 parser fix)

#### What happened
- `npm run session:start -- -Full` failed with PowerShell parser error on `session-start.ps1` line 88
- Root cause: String interpolation `($($wait * 5)s)` — bare `s` after closing `)` in a nested subexpression breaks PowerShell 5.x parser
- Fix: Separated into `$elapsed = $wait * 5` then used format operator `('{0}...({1}s)' -f $Tag, $elapsed)`
- Also normalized CRLF and replaced remaining em-dashes with ASCII hyphens for parser safety
- This was **not** related to yesterday's Experience Engine refactor — it's a pre-existing bug in shared `_core-scripts/shared-profile-content/scripts/session-start.ps1`

#### Docs updated
- `.cursor/docs/ISSUES-RESOLVED.md` — new entry for 2026-07-01
- Session stack verified: Mem0 online, DeepSeek LiteLLM + ngrok online
- Voice greeting spoken

---

### 2026-07-01 (Session 9 — Post-refactor behavioral fixes + route restoration)

#### Context
After the Experience Engine Refactor (Session 7), three routes (`/`, `/vader-experience-v2`, `/vader-experience-v3`) were broken. The refactor consolidated 4 route files into a shared config-driven engine but lost per-route behavioral nuances.

#### What was broken and what was fixed

| Issue | Route(s) | Root cause | Fix |
|-------|----------|------------|-----|
| **Black canvas / invisible model** | All | `@react-three/postprocessing` dropped; incorrect camera/model scale | Re-added `EffectComposer` + `Bloom`; restored correct `dpr`, `gl` config, `ACESFilmicToneMapping`; fixed per-route `defaultScale` values |
| **Wrong model on /** | `/` | Initially set to `harlons_lightsaber.glb`, user corrected to `darth_vader_lightsaber.glb` | Changed `modelPath` to `darth_vader_lightsaber.glb`, scale 2.1 |
| **Red glow on entire model, not just blade** | All | Emissive applied to ALL meshes in traverse, not just "blade"-named ones | Narrowed emissive logic to `child.name.includes('blade')` only; removed accidental `envMapIntensity`/`roughness`/`metalness` on hilt; reduced intensity 30→15 |
| **Scroll interaction broken** | All | `useFrame` animation logic replaced in refactor, GSAP `panelRef` on wrong element | Restored original mouse parallax + scroll-driven scale/camera orbit in `useFrame`; moved `panelRef` to correct inner wrapper in `ChapterSection` |
| **Hero not full-width glass strip** | All | Refactor dropped original hero layout | Restored original: linear-gradient glass backdrop, letter-animated "VADERLABZ" title, subtitle, "ENTER THE LAB" / "GITHUB" buttons |
| **Chapter section animations not firing** | All | `panelRef` outside GSAP's triggering element | Wrapped content in glow div, applied `panelRef` to correct inner glass panel |
| **HdrPicker — wrong position, not collapsed** | All | Refactored picker lost original defaults | Moved to `bottom-6 left-6`, collapsed by default, wider (`280px`), close button bottom-left |
| **HdrPicker — missing Cursor Dot toggle** | All | `cursorEnabled` state + toggle never wired into engine/HdrPicker | Added `useCursor()` hook, `onCursorToggle` handler, "Cursor Dot" sub-section with On/Off pills in Mouse FX accordion |
| **Mouse FX — wrong toggle UI** | All | Was a single toggle instead of On/Off pill buttons | Replaced with two pill-style buttons (On/Off) for both Saber Move and Cursor Dot |
| **Cursor invisible when toggled Off** | All | `body { cursor: none }` was global CSS, not tied to cursorEnabled state | Removed `cursor: none` from globals.css; `CustomCursor` now sets `document.body.style.cursor = 'none'` only when cursor dot is active, restores on cleanup |
| **Footer missing dark glass background** | All | Refactor dropped original footer styling | Restored: radial glow background, dark glass backdrop-filter panel |
| **Defaults not set per route** | All | Refactor didn't carry over per-route default indices | Set `defaultHdrIndex`, `defaultBloomIndex`, `defaultRotationIndex`, `defaultCameraIndex`, `defaultSaberColorIndex` on each route |
| **Back-to-top button missing** | All | `BackToTop` component existed but was never imported in engine.tsx | Imported and rendered `<BackToTop />` |
| **v2 HdrPicker hidden (FX controls don't work)** | `/vader-experience-v2` | `showHdrPicker: false`, all controls hidden | Changed to `showHdrPicker: true`, all control flags enabled |
| **Build failed — TEXT_DIM missing** | Engine | Import changed from `types.ts` but constant still used inline | Added `const TEXT_DIM = '#555566'` local to engine.tsx |
| **ContactShadows not showing on v2** | `/vader-experience-v2` | `showContactShadows` prop not passed from engine → `Scene3D` | Added `showContactShadows?: boolean` to `ExperienceConfig`, `Scene3DProps`, wired through both layers |

#### Files changed
- `app/page.tsx` — model, scale, defaults
- `app/vader-experience/page.tsx` — defaults
- `app/vader-experience-v2/page.tsx` — defaults + FX controls enabled + contact shadows
- `app/vader-experience-v3/page.tsx` — defaults
- `lib/experience-engine/engine.tsx` — cursorEnabled state, BackToTop, TEXT_DIM
- `lib/experience-engine/ui/HdrPicker.tsx` — cursor dot sub-section, position, collapsed by default, pill buttons
- `lib/experience-engine/ui/ChapterSection.tsx` — glow wrapper, correct panelRef
- `lib/experience-engine/scene/Scene3D.tsx` — ContactShadows conditional
- `lib/experience-engine/scene/SaberModel.tsx` — blade-only emissive, useFrame restored
- `lib/experience-engine/types.ts` — `showContactShadows` config field
- `components/CustomCursor.tsx` — programmatic body cursor toggle
- `app/globals.css` — removed `body { cursor: none }`

#### Key lesson for future refactors
Structural refactors (extracting shared code) must include a **behavioral audit** — verify every pixel, interaction, and default matches the original per-route behavior. Better approach: migrate one route at a time, comparing against the original before moving to the next. Or keep per-route components and only share the absolute common primitives (SaberModel, Scene3D).

---

*Last Entry: 2026-07-01 (Session 9)*
