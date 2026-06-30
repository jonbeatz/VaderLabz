# 3D-Modeling — GLTF/GLB Loading & Optimization

## When to use this skill
- Adding 3D models (avatars, objects, scenes) to the Playground
- Optimizing models for web delivery
- Animating models
- Compressing and converting GLB/GLTF files for production

## Available GLB Optimization Tools

| Tool | Purpose | Install |
|------|---------|---------|
| [glTF-Transform](https://github.com/donmccurdy/glTF-Transform) | Optimize, compress (Draco), texture-compress, convert GLTF/GLB — single pipeline command | `npm install -g @gltf-transform/cli` |
| [glb-compressor](https://github.com/kjanat/glb-compressor) | Fast binary GLB compression — strips unnecessary data, smaller files | `pip install glb-compressor` |
| [meshoptimizer](https://github.com/zeux/meshoptimizer) | Mesh geometry simplification + vertex optimization for GLTF/GLB | `npm install -g meshoptimizer` |
| [gltf-pipeline](https://github.com/CesiumGS/gltf-pipeline) | Cesium's official GLTF pipeline — Draco compression, quantize, optimize | `npm install -g gltf-pipeline` |

## Core Workflow

## Core Workflow

### Model Preparation (offline optimization)
```bash
# Compress GLTF with gltf-transform
gltf-transform optimize input.gltf output.gltf
gltf-transform draco input.gltf output.gltf
gltf-transform texture-compress input.gltf output.gltf
```

### Loading in Next.js
```javascript
import { useGLTF } from '@react-three/drei'
import { useMemo } from 'react'

function OptimizedModel({ url }) {
  const { scene } = useGLTF(url)
  const optimized = useMemo(() => scene, [scene])
  return <primitive object={optimized} />
}
```

### Animating Models
```javascript
import { useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

function AnimatedModel({ url }) {
  const { scene, animations } = useGLTF(url)
  const { actions } = useAnimations(animations, scene)
  
  useEffect(() => {
    actions?.idle?.play()
  }, [actions])
  
  return <primitive object={scene} />
}
```

## Model Best Practices
1. **Draco Compression** — Always Draco-compress models before committing them to public asset folders. This reduces typical GLTF files by 70-90%.
2. **Limit Triangles** — Max 50k triangles per scene, ideally keeping individual models <15k triangles.
3. **Texture Limits** — Max 1024x1024 compressed textures (using Basis Universal, KTX2, or high-compression WebP).
4. **Caching** — Cache models globally to prevent redundant HTTP requests and re-parsing.

## Anti-Slop
- **No loading > 5MB models without a loading warning** — Always display a progress indicator or percentage loader for models exceeding 2MB.
- **No animating without useMemo** — Avoid running render/animations checks on raw unmemoized scene hierarchies.
- **No missing Draco compression** — Draco-loaders must be active and configured in production components to avoid blocking the main rendering thread.
