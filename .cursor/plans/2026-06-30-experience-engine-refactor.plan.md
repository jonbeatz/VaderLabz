# VaderLabz Experience Engine Refactor Plan

## Goal
Eliminate ~4,600 lines of duplicated code across 4 route page files by extracting a shared `experience-engine` with a config-driven API. Each route becomes a ~20-line config wrapper.

## Current State
- 4 route files: `/`, `/vader-experience`, `/vader-experience-v2`, `/vader-experience-v3`
- ~97% identical code (~5,000 total lines)
- Every bug fix, style change, or feature addition must be applied 4x

## Architecture

```
lib/experience-engine/
  index.tsx       ← createVaderExperience(config) — main export
  types.ts        ← ExperienceConfig, ChapterData, all types
  config.ts       ← Shared preset arrays (HDR_PRESETS, BLOOM_PRESETS, etc.)
  scene/
    SaberModel.tsx    ← 3D model component with emissive/blade logic
    Scene3D.tsx       ← Scene wrapper (lights, environment, bloom)
  ui/
    HdrPicker.tsx         ← Accordion controls panel
    AccordionSection.tsx  ← Accordion sub-component
    TopNav.tsx            ← Header nav
    ProgressBar.tsx       ← Side progress dots
    ChapterSection.tsx    ← Chapter content panel
    ArticleOverlay.tsx    ← Article detail modal
    LoadingScreen.tsx     ← Loading bar
    ScrollPrompt.tsx      ← Bottom scroll hint
    BackToTop.tsx         ← Back-to-top button
    StatsStrip.tsx        ← Stats section
    ClosingQuote.tsx      ← Closing quote
    HeroAnimation.tsx     ← GSAP letter animation
    BgOverlay.tsx         ← Background layers
```

## Safety Strategy
1. Git tag `refactor/v2.3.1-base` before any changes
2. Each phase committed separately for granular revert
3. `/archive` route never touched — permanent fallback
4. Backup at `G:\Hermes_Project_BackUpz\VaderLabz\vaderlabz-project-v1-i`

## Phases

### Phase 0: Tag base
- `git tag refactor/v2.3.1-base HEAD`
- `git push origin refactor/v2.3.1-base`

### Phase 1: Extract pure UI components
- Move: TopNav, ProgressBar, ChapterSection, ArticleOverlay, LoadingScreen,
  ScrollPrompt, BackToTop, StatsStrip, ClosingQuote, HeroAnimation,
  BgOverlay, AccordionSection → `lib/experience-engine/ui/`
- Pure cut/paste — no logic changes
- Build verify

### Phase 2: Extract 3D scene components
- Move: SaberModel, Scene3D → `lib/experience-engine/scene/`
- Types → `lib/experience-engine/types.ts`
- Config arrays → `lib/experience-engine/config.ts`
- Build verify

### Phase 3: Create engine
- Create `lib/experience-engine/index.tsx` with `createVaderExperience(config)`
- Engine handles: loading state, scroll tracking, HdrPicker wiring,
  page layout, 3D Canvas mounting
- Build verify

### Phase 4: Rewrite route files
- Each route file becomes ~20 lines — import + config + export
- Different config values per variant
- Build verify

### Phase 5: Cleanup
- Delete `media/` root dir (orphaned duplicate)
- Delete `app/vader-experience-v3/globals.css` (duplicate)
- Delete `app/vader-experience-v3/layout.tsx` (now uses root layout)
- Remove unused `ContactShadows` import from v2 config
- Build verify

## Key Design Decisions
1. `useMemo` with `setError` inside is fixed — moved to `useEffect`
2. Dead no-op `useEffect` in `ProgressBar` is removed
3. `aria-label` added to icon-only buttons
4. `React.memo` applied to major UI components
