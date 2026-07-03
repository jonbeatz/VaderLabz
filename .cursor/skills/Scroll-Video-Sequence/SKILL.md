---
name: scroll-video-sequence
description: Build Apple AirPods-style "video scrubs as you scroll" hero sections using the reliable canvas image-sequence technique (NOT a scrubbed <video> tag). Covers FFmpeg frame extraction, sticky scroll runway, scroll-to-frame mapping, rAF render decoupling, preloading, and content overlays. Use when the user wants cinematic scroll-driven product reveals or "video frame integration" scroll sites.
---

# Scroll-Video-Sequence — Cinematic Scroll Frame Scrubbing

## When to use this skill
- "Make the video play as I scroll" (Apple AirPods Pro / MacBook style)
- Cinematic product reveal, 360° spin, construction/deconstruction on scroll
- Any "video frame integration scroll site" request

## The golden rule: image sequence, NOT `<video>`
Scrubbing a real `<video>` via `currentTime` is **unreliable** — backward scrubbing stutters, seeking is codec-dependent, and behaviour differs per browser/device. The technique every polished site uses:

> **Video → extract frames → draw the right frame to a `<canvas>` based on scroll progress.**

## Step 1 — Extract frames (design time, FFmpeg)
```bash
# 8-12 fps is plenty; the browser interpolates visually between frames.
ffmpeg -i source.mp4 -vf "fps=12,scale=1280:-1" -q:v 4 frames/frame_%04d.jpg
# WebP is smaller and decodes fast:
ffmpeg -i source.mp4 -vf "fps=12,scale=1280:-1" frames/frame_%04d.webp
```
**Practical budget:** 8–12 fps · 70–80% quality · 1280px wide → usually **< 15 MB** for a ~30s clip. Keep total frames under ~500. Store under `public/sequence/` (or project `media/` per media-asset rules, served statically).

## Step 2 — Sticky scroll runway (the structural trick)
```css
.sequence-scroller { height: 400vh; }          /* the runway: how far the user scrolls */
.sequence-sticky   { position: sticky; top: 0; height: 100vh; overflow: hidden; }
.sequence-sticky canvas { width: 100%; height: 100%; object-fit: cover; }
```

## Step 3 — Preload + decode to ImageBitmap
```ts
const TOTAL = 180; // frame count
const src = (i: number) => `/sequence/frame_${String(i + 1).padStart(4, "0")}.webp`;

async function preload(): Promise<ImageBitmap[]> {
  const frames = await Promise.all(
    Array.from({ length: TOTAL }, async (_, i) => {
      const res = await fetch(src(i));
      return createImageBitmap(await res.blob()); // decoded off main thread
    })
  );
  return frames;
}
```
> For long sequences, preload the first ~20 eagerly and stream the rest, or show a loader until the first N are ready.

## Step 4 — Decouple scroll calc from rendering (critical)
Never draw inside the scroll handler. Scroll fires hundreds of times/sec.
```ts
let targetFrame = 0;
let drawnFrame = -1;

function onScroll() {
  const el = document.querySelector<HTMLElement>(".sequence-scroller")!;
  const rect = el.getBoundingClientRect();
  const scrollable = el.offsetHeight - window.innerHeight;
  const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1); // 0..1
  targetFrame = Math.round(progress * (TOTAL - 1));
}
window.addEventListener("scroll", onScroll, { passive: true }); // passive is essential

function tick() {
  if (targetFrame !== drawnFrame) {
    drawnFrame = targetFrame;
    draw(frames[targetFrame]);
  }
  requestAnimationFrame(tick);
}
```

## Step 5 — Draw with devicePixelRatio + cover fit
```ts
function draw(bitmap: ImageBitmap) {
  const canvas = canvasRef.current!;
  const ctx = canvas.getContext("2d", { alpha: false })!;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = canvas.clientWidth * dpr, h = canvas.clientHeight * dpr;
  if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
  // cover-fit
  const scale = Math.max(w / bitmap.width, h / bitmap.height);
  const dw = bitmap.width * scale, dh = bitmap.height * scale;
  ctx.drawImage(bitmap, (w - dw) / 2, (h - dh) / 2, dw, dh);
}
```

## Step 6 — Overlay content by scroll range (not timers)
```ts
// Fade a card in during 30%-45% of the runway:
const cardOpacity = smoothstep(0.30, 0.45, progress) * (1 - smoothstep(0.55, 0.70, progress));
```
Polish: radial-gradient mask to soft-edge the canvas, subtle rotation for pseudo-3D, glassmorphic overlay cards (`backdrop-filter: blur`), a thin scroll progress bar.

## Alternatives / when to escalate
- **True 3D reveal** (rotate/explode actual geometry): use a **GLB + R3F** driven by scroll instead of a baked sequence → see `3D-Scroll` + `3D-Modeling`. More flexible, no giant frame payload.
- **GSAP ScrollTrigger** can drive the frame index cleanly if you're already using it (`scrub` + `snap`) → see `Scroll-Motion`.
- No-code / quick: `scrollsequence` / `ApfelSequence` libraries wrap this same logic.

## Anti-Slop
- **Never scrub a `<video>` tag** for frame-accurate scroll. Image sequence only.
- **`{ passive: true }`** on the scroll listener; **separate** scroll-calc from rAF draw.
- **`createImageBitmap`** (not `<img>`) so decode happens off the main thread; cache the bitmaps.
- **Cap DPR at 2** — retina canvases at DPR 3 tank performance for negligible gain.
- **Give it a real runway** (300–500vh) — too short = frames blur past; too long = user gets bored.
- **Reduced motion:** if `(prefers-reduced-motion: reduce)`, show a single hero still (first or key frame) and skip the scrub. See `Motion-Accessibility`.
- **Weight budget:** if frames exceed ~20MB, cut fps, width, or trim the clip — don't ship a 60MB hero.

## Related skills
- **Scroll-Motion** — Lenis + GSAP driver if you want ScrollTrigger to own the frame index
- **3D-Scroll / 3D-Modeling** — real-geometry alternative to baked frames
- **Image-Workflow** — generating/upscaling the source clip
- **Motion-Accessibility** — reduced-motion fallback
