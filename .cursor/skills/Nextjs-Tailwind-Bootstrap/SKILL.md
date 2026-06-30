# Nextjs-Tailwind-Bootstrap — Tailwind Setup Checklist

## When to use this skill
- Bootstrapping a new Next.js project from the shared-profile-content skeleton
- Diagnosing why Tailwind utility classes (like `fixed`, `inset-0`, `flex`, `z-30`) appear to do nothing
- Setting up PostCSS pipeline for the first time on a new project

## Critical Context

**Tailwind CSS is NOT included in the shared-profile-content skeleton.** Every new project bootstrapped from the skeleton must have Tailwind manually installed and configured. Without this step, **all `className` utilities are silently ignored** — the page will appear blank, unstyled, or broken because classes like `fixed inset-0 z-0` produce no CSS output.

## Installation

```powershell
npm install -D tailwindcss@3 postcss autoprefixer
```

## Configuration Files

### `tailwind.config.ts`
```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#ff2a36',
        'accent-dim': '#cc1f28',
        'bg-deep': '#000000',
        'bg-canvas': '#0a0a0b',
        'text-primary': '#f0f0f0',
        'text-muted': '#888899',
        'text-dim': '#555566',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif'],
        mono: ['var(--font-space-mono)', 'Space Mono', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
```

### `postcss.config.mjs`
```js
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

export default config
```

## globals.css Updates

The project's `app/globals.css` must include Tailwind directives at the **top** of the file, before any custom CSS:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Your custom CSS below this line */
```

### CSS @import ordering

If using Google Fonts via `@import`, place the font import **above** all other CSS:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom properties and styles */
:root { /* ... */ }
```

## Verification

Run a build and verify Tailwind CSS is being generated:

```powershell
npm run web:build
```

Then in the browser, test that utility classes work:

```js
// In browser console:
const el = document.createElement('div')
el.className = 'fixed inset-0 z-0'
document.body.appendChild(el)
getComputedStyle(el).position  // should be 'fixed'
getComputedStyle(el).zIndex    // should be '0'
el.remove()
```

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `className` has no effect | Tailwind not installed | Run `npm install -D tailwindcss@3 postcss autoprefixer` |
| Build fails with CSS error | Missing `@tailwind` directives | Add `@tailwind base/components/utilities` to globals.css |
| PostCSS not processing | Missing `postcss.config.mjs` | Create file with tailwindcss + autoprefixer plugins |
| VADERLABZ subtitle not found | No font import | Add `@import` for Google Fonts at top of globals.css |
| Canvas renders 150px tall | Parent div `fixed inset-0` not working | Verify Tailwind is correctly installed (see above) |

## Anti-Slop
- **No assuming Tailwind is pre-installed** — the skeleton does NOT include it, always check
- **No writing className-based layouts without verifying** — run build and check computed styles
- **No mixing Tailwind v3 and v4** — use `tailwindcss@3` with `postcss` + `autoprefixer` for Next.js 16 + Turbopack compatibility
