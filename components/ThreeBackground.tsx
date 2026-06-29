'use client'

import React, { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

// ============================================================================
// ThreeBackground.tsx — Premium 3D Background with Bloom
// ============================================================================
//
// Upgrades: bloom post-processing for accent glow, DPR management.
// ============================================================================

// ---- Scroll progress: called from useFrame (no React re-render) ------------
function getScrollProgress(): number {
  if (typeof window === 'undefined') return 0
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight
  return totalHeight > 0 ? window.scrollY / totalHeight : 0
}

// ---- Scene: Particle Starfield --------------------------------------------
function ParticleFlyThrough({ accentColor }: { accentColor: string }) {
  const pointsRef = useRef<THREE.Points>(null)
  const accent = new THREE.Color(accentColor)

  const positions = useMemo(() => {
    const count = 2000
    const coords = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      coords[i * 3] = (Math.random() - 0.5) * 40
      coords[i * 3 + 1] = (Math.random() - 0.5) * 40
      coords[i * 3 + 2] = (Math.random() - 0.5) * 50
    }
    return coords
  }, [])

  useFrame((_state, delta) => {
    if (!pointsRef.current) return
    const progress = getScrollProgress()
    pointsRef.current.position.z = THREE.MathUtils.lerp(
      pointsRef.current.position.z,
      progress * 40,
      0.08,
    )
    pointsRef.current.rotation.y += delta * 0.015
    pointsRef.current.rotation.x += delta * 0.008
    ;(pointsRef.current.material as THREE.PointsMaterial).color.lerp(accent, 0.02)
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={accentColor}
        size={0.15}
        sizeAttenuation
        depthWrite={false}
        opacity={0.35}
      />
    </Points>
  )
}

// ---- Scene: Crystalline Core + Orbiting Ring ------------------------------
function HeroCore({
  accentColor,
  secondaryColor = '#ff0033',
}: {
  accentColor: string
  secondaryColor?: string
}) {
  const mouse = useRef({ x: 0, y: 0 })
  const accent = new THREE.Color(accentColor)
  const secondary = new THREE.Color(secondaryColor)

  const result = useMemo(() => {
    const grp = new THREE.Group()
    const c = new THREE.Color(accentColor)

    const coreMesh = new THREE.Mesh(
      new THREE.OctahedronGeometry(5.2, 1),
      new THREE.MeshBasicMaterial({ color: c, wireframe: true, transparent: true, opacity: 0.16 }),
    )
    grp.add(coreMesh)

    const glowMesh = new THREE.Mesh(
      new THREE.OctahedronGeometry(5.4, 1),
      new THREE.MeshBasicMaterial({
        color: c,
        wireframe: true,
        transparent: true,
        opacity: 0.25,
        blending: THREE.AdditiveBlending,
      }),
    )
    grp.add(glowMesh)

    const shellMesh = new THREE.Mesh(
      new THREE.BoxGeometry(7.8, 7.8, 7.8),
      new THREE.MeshBasicMaterial({ color: c, wireframe: true, transparent: true, opacity: 0.06 }),
    )
    shellMesh.rotation.set(Math.PI / 4, Math.PI / 4, 0)
    grp.add(shellMesh)

    const ringMesh = new THREE.Mesh(
      new THREE.TorusGeometry(9.2, 0.18, 16, 100),
      new THREE.MeshBasicMaterial({ color: c, wireframe: true, transparent: true, opacity: 0.22 }),
    )
    ringMesh.rotation.set(Math.PI / 3, Math.PI / 6, 0)
    grp.add(ringMesh)

    return { grp, coreMesh, glowMesh, shellMesh, ringMesh, color: c }
  }, [accentColor])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouse.current = {
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      }
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  useFrame((_state, delta) => {
    const { grp, coreMesh, glowMesh, shellMesh, ringMesh, color } = result
    const progress = getScrollProgress()

    grp.position.y = THREE.MathUtils.lerp(grp.position.y, -1.2 + progress * -25, 0.08)
    grp.scale.setScalar(
      THREE.MathUtils.lerp(grp.scale.x, Math.max(0.2, 1.2 - progress * 2.0), 0.08),
    )

    grp.position.x = THREE.MathUtils.lerp(grp.position.x, mouse.current.x * 2.2, 0.06)
    grp.position.z = THREE.MathUtils.lerp(grp.position.z, -mouse.current.y * 2.2, 0.06)

    coreMesh.rotation.y += delta * 0.35
    coreMesh.rotation.x += delta * 0.15
    glowMesh.rotation.y += delta * 0.35
    glowMesh.rotation.x += delta * 0.15
    shellMesh.rotation.y -= delta * 0.25
    shellMesh.rotation.z += delta * 0.15
    ringMesh.rotation.z += delta * 0.45

    if (progress > 0.5) {
      const factor = (progress - 0.5) / 0.5
      grp.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          ;(child.material as THREE.MeshBasicMaterial).color.lerpColors(color, secondary, factor)
        }
      })
    } else {
      grp.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          ;(child.material as THREE.MeshBasicMaterial).color.copy(color)
        }
      })
    }
  })

  return <primitive object={result.grp} position={[0, -1.2, -6]} />
}

// ---- Scene: Dynamic Accent Lighting ---------------------------------------
function DynamicLights({ accentColor }: { accentColor: string }) {
  const lights = useMemo(() => {
    const group = new THREE.Group()
    const ambient = new THREE.AmbientLight(accentColor, 0.5)
    const dir1 = new THREE.DirectionalLight('#ffffff', 2.0)
    const dir2 = new THREE.DirectionalLight(accentColor, 1.0)
    dir1.position.set(10, 15, 5)
    dir2.position.set(-10, -15, -5)
    group.add(ambient, dir1, dir2)
    return { group, ambient, dir1, dir2, defaultColor: new THREE.Color(accentColor) }
  }, [accentColor])

  useFrame(() => {
    const progress = getScrollProgress()
    if (progress > 0.5 && lights) {
      const f = (progress - 0.5) / 0.5
      lights.ambient.color.lerpColors(lights.defaultColor, new THREE.Color('#ff2a36'), f)
      lights.dir1.color.lerpColors(new THREE.Color('#ffffff'), new THREE.Color('#ff0033'), f)
      lights.dir2.color.lerpColors(lights.defaultColor, new THREE.Color('#000000'), f)
    }
  })

  return <primitive object={lights.group} />
}

// ---- Main Component -------------------------------------------------------
export interface ThreeBackgroundProps {
  accent?: string
  secondary?: string
  bgColor?: string
  bloom?: boolean
  children?: React.ReactNode
}

export function ThreeBackground({
  accent = '#F5B841',
  secondary = '#ff0033',
  bgColor = '#000000',
  bloom = false,
  children,
}: ThreeBackgroundProps) {
  // Disable bloom on touch/mobile for perf
  const isMobile =
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0)
  const enableBloom = bloom && !isMobile

  return (
    <div
      className="fixed inset-0 w-full h-full"
      style={{
        position: 'fixed' as const,
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        backgroundColor: bgColor,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
        dpr={[1, 1.5]}
        gl={{ antialias: false }}
      >
        <DynamicLights accentColor={accent} />
        <ParticleFlyThrough accentColor={accent} />
        <HeroCore accentColor={accent} secondaryColor={secondary} />

        {enableBloom && (
          <EffectComposer>
            <Bloom
              intensity={0.3}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  )
}
