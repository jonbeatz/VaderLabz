'use client'

import { useMemo, useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import type { SaberColorPreset, RotationPreset, CameraPreset } from '../types'

interface SaberModelProps {
  modelPath: string
  defaultScale: number
  scaleScrollFactor: number
  defaultY: number
  yScrollFactor: number
  saberColor: SaberColorPreset
  rotationSpeed: RotationPreset
  cameraMode: CameraPreset
  sabers: { bladeMat: THREE.MeshStandardMaterial | null }
}

export function SaberModel({
  modelPath, defaultScale, scaleScrollFactor, defaultY, yScrollFactor,
  saberColor, rotationSpeed, sabers,
}: SaberModelProps) {
  const { scene } = useGLTF(modelPath)
  const groupRef = useRef<THREE.Group>(null)

  const sceneClone = useMemo(() => {
    const clone = scene.clone(true)
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.frustumCulled = false
      }
    })
    return clone
  }, [scene])

  // Blade material reference — populate once
  useEffect(() => {
    sceneClone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        const mat = mesh.material
        if (mat instanceof THREE.MeshStandardMaterial || mat instanceof THREE.MeshPhysicalMaterial) {
          mat.envMapIntensity = 0.4
          mat.roughness = 0.6
          mat.metalness = 0.3
          if (mesh.name.toLowerCase().includes('blade')) {
            mat.toneMapped = false
            sabers.bladeMat = mat
          }
        }
      }
    })
  }, [sceneClone, sabers])

  // Apply saber color directly via ref
  useEffect(() => {
    if (sabers.bladeMat) {
      sabers.bladeMat.emissive = new THREE.Color(...saberColor.color)
      sabers.bladeMat.emissiveIntensity = 15
    }
  }, [saberColor, sabers])

  // Scroll-driven scaling and Y
  useEffect(() => {
    if (!groupRef.current) return
    const update = () => {
      const p = typeof window !== 'undefined'
        ? Math.min(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight), 1)
        : 0
      groupRef.current!.scale.setScalar(defaultScale + p * scaleScrollFactor)
      groupRef.current!.position.y = defaultY + p * yScrollFactor
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [defaultScale, scaleScrollFactor, defaultY, yScrollFactor])

  // Rotation animation
  useEffect(() => {
    if (!groupRef.current || rotationSpeed.speed === 0) return
    let raf: number
    const animate = () => {
      if (groupRef.current) groupRef.current.rotation.y += rotationSpeed.speed * 0.01
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [rotationSpeed])

  return (
    <group ref={groupRef}>
      <primitive object={sceneClone} />
    </group>
  )
}
