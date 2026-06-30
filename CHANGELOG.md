# Changelog — VaderLabz

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
