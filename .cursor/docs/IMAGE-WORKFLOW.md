# Image Workflow — JonBeatz Complete Guide

**Profile root:** `D:\Hermes\projects\JonBeatz`  
**Canonical model inventory:** [COMFYUI-MODELS.md](./COMFYUI-MODELS.md)  
**VRAM playbook:** [VRAM-IMAGE.md](./VRAM-IMAGE.md)  
**Environment:** `.env.local` (from `.env.local.example` — run `npm run env:setup`)

This is the **JonBeatz agent source of truth** for Hugging Face cloud generation + local ComfyUI editing, upscaling, and video.

---

## Two pipelines (when to use which)

| Goal | Pipeline | VRAM | Speed | Cost |
|------|----------|------|-------|------|
| Quick photorealistic still (1024²) | **Hugging Face** `image:gen` / FLUX.1-schnell | **0** (cloud) | ~10–15 s | Free/cheap (HF token) |
| Paid bonus still / premium models | **fal.ai** `image:fal` | **0** (cloud) | ~5–30 s | Pay-per-use (~$0.003+ / image) |
| Local GPU txt2img, edit, inpaint, upscale, video | **ComfyUI** @ `:8188` | Uses GPU | 30 s – 5 min | $0 API |

**Rule:** Prefer **HF cloud** when LM Studio is loaded or VRAM is tight. Use **fal** for premium models (Nano Banana 2, GPT Image 2) or when HF is capped. Use **ComfyUI** when Jon asks for local GPU, img2img, inpaint, upscale, or video.

---

## Environment setup (first time)

```powershell
cd D:\Hermes\projects\JonBeatz
npm run env:setup          # creates .env.local; merges HF_TOKEN from MSC if present
npm run image:doctor       # verify HF_TOKEN, ComfyUI paths, Python deps
pip install huggingface_hub pillow python-dotenv
```

Required in **`.env.local`:**

| Variable | Purpose |
|----------|---------|
| `HF_TOKEN` | Hugging Face Inference API (FLUX.1-schnell) |
| `FAL_API_KEY` | fal.ai pay-per-use wallet ([fal.ai](https://fal.ai/pricing)) |
| `FAL_IMAGE_MODEL` | Default fal model id for `image:fal` (default `fal-ai/flux/schnell`) |
| `COMFYUI_ROOT` | Shared install `H:\AI_Models\ComfyUI` |
| `IMAGE_OUTPUT_DIR` | Hermes media vault `D:\Hermes\assets\media\JonBeatz` |
| `LMSTUDIO_*` / `MEM0_*` | Personal memory stack |

---

## Quick reference card

| What Jon wants | Command (JonBeatz) | Where it runs |
|----------------|-------------------|---------------|
| Cloud image from text | `npm run image:gen -- "prompt"` | Hugging Face API |
| Cloud image + open viewer | `npm run image:gen:open -- "prompt"` | HF + default photo app |
| **Paid bonus** cloud image | `npm run image:fal -- "prompt"` | fal.ai API (prepaid credits) |
| **Paid bonus** + open | `npm run image:fal:open -- "prompt"` | fal.ai + viewer |
| fal premium model | `npm run image:fal -- "prompt" -- --model fal-ai/nano-banana` | fal.ai |
| Start ComfyUI | `npm run comfy:start` | Local GPU :8188 |
| Stop ComfyUI (keep LM Studio) | `npm run comfy:stop` | Local |
| ComfyUI status JSON | `npm run comfy:status` | Local |
| Repair model symlinks (post H: migration) | `npm run comfy:repair-symlinks` | Local |
| Full model comparison test | `npm run comfy:compare -- "prompt"` | Local GPU |
| LM Studio vault audit | `npm run lmstudio:audit` | Local |
| Health check | `npm run image:doctor` | Local |
| ComfyUI web UI | Browser → http://127.0.0.1:8188 | Local |

### PowerShell profile commands (workstation-wide)

These live in Jon's **PowerShell profile** (shared with MSC). They call ComfyUI workflows under `H:\AI_Models\ComfyUI\workflows\`:

| Command | Purpose |
|---------|---------|
| `gen-image "prompt"` | HF FLUX cloud (same as MSC — uses repo `.env.local` when run from JonBeatz) |
| `gen-image-local "prompt"` | ComfyUI z-image-turbo GGUF |
| `edit-image -InputPath ... -Prompt ...` | img2img |
| `inpaint-image -InputPath ... -MaskPath ...` | inpaint |
| `upscale-image -InputPath ... -TargetSize 4K` | upscale |
| `fix-face -InputPath ...` | face restore |
| `generate-video -Prompt ...` | CogVideoX text-to-video |
| `animate-image -InputPath ...` | SVD image-to-video |

**Natural language:** Jon can say *"make me a chicken playing golf"* → agent runs cloud `gen-image` or asks cloud vs local.

Full cheat sheet (all parameters): MSC [IMAGE-VIDEO-CHEATSHEET.md](file:///D:/Cursor_Projectz/MyStudioChannel/.cursor/docs/IMAGE-VIDEO-CHEATSHEET.md) — same workstation commands.

---

## A. Hugging Face cloud (`npm run image:gen`)

Architecture:

```
npm run image:gen → scripts/gen-image.ps1 → scripts/generate-image.py
  → reads .env.local HF_TOKEN
  → Hugging Face InferenceClient (FLUX.1-schnell)
  → saves PNG to IMAGE_OUTPUT_DIR
```

Examples:

```powershell
npm run image:gen -- "a beautiful recording studio with gold accent lighting, photorealistic, 4k"
npm run image:gen -- "cyberpunk city" -- --width 1920 --height 1080
powershell -File scripts/gen-image.ps1 "portrait of astronaut" -Width 1920 -Height 1080 -Open
```

Output default: `D:\Hermes\assets\media\JonBeatz\generated-YYYYMMDD-HHMMSS.png`

---

## C. fal.ai cloud bonus (`npm run image:fal`)

Pay-per-use prepaid wallet — use when HF is capped or Jon wants premium models. Docs: [fal.ai pricing](https://fal.ai/pricing).

Architecture:

```
npm run image:fal → scripts/gen-image-fal.ps1 → scripts/generate-image-fal.py
  → reads .env.local FAL_API_KEY
  → POST https://fal.run/{model}
  → saves PNG to IMAGE_OUTPUT_DIR (fal-*.png)
```

**Cursor MCP:** `npm run sync:mcp-env` writes **fal-ai** to `%USERPROFILE%\.cursor\mcp.json` → reload Cursor Settings → MCP.

| Model id (fal) | Use | ~Cost |
|----------------|-----|-------|
| `fal-ai/flux/schnell` | Default cheap still (same family as HF) | ~$0.003 |
| `fal-ai/nano-banana` | Fast Google, text in image | ~$0.08 @ 1K |
| `fal-ai/nano-banana-pro` | Hero / 4K / character consistency | $0.15–0.30 |
| `fal-ai/gpt-image-2` | Product shots, layouts | ~$0.005–0.21 by quality |

Examples:

```powershell
npm run image:fal -- "cinematic studio hero, dark gold, music producer"
npm run image:fal:open -- "product card with readable text"
powershell -File scripts/gen-image-fal.ps1 "portrait" -Model "fal-ai/nano-banana"
```

**Policy:** Daily stills → `image:gen` (HF). fal = bonus only when Jon asks or agent needs premium model.

---

## D. ComfyUI local workflow

### Start / stop (JonBeatz npm wrappers → MSC scripts)

JonBeatz delegates to the **shared MSC ComfyUI scripts** (same engine, same VRAM guards):

```powershell
npm run comfy:start              # VRAM pre-flight, then launch
npm run comfy:start -- -LowVram -UnloadLMStudio   # 16 GB GPU + LM Studio loaded
npm run comfy:stop               # ComfyUI only — does NOT kill LM Studio
npm run comfy:restart
npm run comfy:status
```

**Agent rule:** Never auto-start ComfyUI unless Jon asks or `JONBEATZ_COMFYUI_AUTO_START=1`. See `.cursor/rules/image-workflow.mdc`.

### Web UI

http://127.0.0.1:8188 — drag workflow PNGs to load graphs; debug node execution visually.

### Default local txt2img workflow

- **Workflow:** `H:\AI_Models\ComfyUI\workflows\txt2img-gen-image-local.json`
- **Model:** z-image-turbo GGUF + Qwen3-4B CLIP + ae.safetensors VAE
- **Profile command:** `gen-image-local "prompt"`

### Edit / inpaint / upscale / video

Requires ComfyUI running. Use profile `edit-image`, `inpaint-image`, `upscale-image`, `generate-video`, `animate-image` — see cheat sheet above.

---

## E. Complete recipe examples

### 1. Cloud generate → local upscale

```powershell
npm run image:gen -- "mountain landscape at sunset"
npm run comfy:start
# Then in profile or agent: upscale-image -InputPath "D:\Hermes\assets\media\JonBeatz\generated-*.png" -TargetSize 4K
npm run comfy:stop
```

### 2. Local generate → edit → stop ComfyUI

```powershell
npm run comfy:start
gen-image-local "futuristic studio desk, photorealistic"
edit-image -InputPath "D:\Hermes\assets\media\JonBeatz\generated-local-*.png" -Prompt "add gold accent lighting" -Strength 0.45
npm run comfy:stop
```

### 3. Mem0 + image session

After a good prompt/style Jon wants to reuse:

```powershell
npm run mem0:add -- "Preferred image style: gold accent studio lighting, photorealistic 4k, FLUX cloud"
```

---

## F. Model & path reference

| Resource | Path |
|----------|------|
| ComfyUI engine | `D:\AI_Models\ComfyUI\` |
| Workflows | `H:\AI_Models\ComfyUI\workflows\` |
| Model cache (H:) | `H:\AI_Models\` |
| JonBeatz outputs | `D:\Hermes\assets\media\JonBeatz\` |
| MSC outputs (website) | `D:\Cursor_Projectz\MyStudioChannel\public\media\` |
| Restore symlinks | `D:\AI_Models\ComfyUI\scripts\repair-comfyui-symlinks.ps1` |
| Download SD1.5 fp16 | `hf download Comfy-Org/stable-diffusion-v1-5-archive v1-5-pruned-emaonly-fp16.safetensors` → checkpoints folder |

See **[COMFYUI-MODELS.md](./COMFYUI-MODELS.md)** for full model matrix.

---

## E. Troubleshooting

| Issue | Fix |
|-------|-----|
| `HF_TOKEN not configured` | `npm run env:setup` then set token in `.env.local` |
| ComfyUI not reachable | `npm run comfy:start` then open :8188 |
| CUDA OOM | `npm run comfy:stop`; use `-LowVram`; reduce resolution; unload LM Studio |
| Missing checkpoint | Run restore scripts; see COMFYUI-MODELS.md |
| Wrong output folder | Check `IMAGE_OUTPUT_DIR` in `.env.local` |

---

## F. Agent instructions

1. Read **this file** before any image/video task in JonBeatz.
2. Run **`npm run image:doctor`** if env or ComfyUI state is unclear.
3. **Cloud first** unless Jon says local/GPU/ComfyUI.
4. **Stop ComfyUI** when done (`npm run comfy:stop`) to free VRAM for LM Studio / Mem0.
5. Save outputs under **`public/media/`** for personal work. This keeps assets served root-relatively by Next.js.
6. Log reusable prompts/styles to **Mem0** + **ReCall.md**.

---

*Last updated: 2026-06-19 · JonBeatz v1.2 image workflow layer*
