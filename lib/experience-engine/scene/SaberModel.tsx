'use client'

import { useMemo, useRef, useEffect, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import type { SaberColorPreset, RotationPreset, CameraPreset } from '../types'

useGLTF.preload('/media/skywalker_lightsaber.glb')
useGLTF.preload('/media/darth_vader_lightsaber.glb')
useGLTF.preload('/media/harlons_lightsaber.glb')

interface SaberModelProps {
  modelPath: string
  defaultScale: number
  scaleScrollFactor: number
  defaultY: number
  yScrollFactor: number
  saberColor: SaberColorPreset
  rotationSpeed: RotationPreset
  cameraMode: CameraPreset
  mouseEnabled: boolean
  sabers: { bladeMat: THREE.MeshStandardMaterial | null }
}

export function SaberModel({
  modelPath, defaultScale, scaleScrollFactor, defaultY, yScrollFactor,
  saberColor, rotationSpeed, cameraMode, mouseEnabled, sabers,
}: SaberModelProps) {
  const { scene } = useGLTF(modelPath)
  const groupRef = useRef<THREE.Group>(null!)
  const { camera } = useThree()
  const mouseRef = useRef({ x: 0, y: 0 })
  const [error, setError] = useState(false)
  const progressRef = useRef(0)

  // Track scroll progress
  useEffect(() => {
    const update = () => {
      if (typeof window === 'undefined') return
      const total = document.documentElement.scrollHeight - window.innerHeight
      progressRef.current = total > 0 ? window.scrollY / total : 0
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  // Mouse parallax
  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouse, { passive: true })
    return () => window.removeEventListener('mousemove', onMouse)
  }, [])

  // Blade material ref
  const bladeMatRef = useRef<THREE.MeshStandardMaterial | null>(null)

  // Clone scene and apply materials
  const sceneClone = useMemo(() => {
    try {
      const clone = scene.clone()
      clone.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.frustumCulled = false
          child.castShadow = true
          child.receiveShadow = true
        }
        // Only apply emissive to blade meshes — NOT the hilt or handle
        if (child instanceof THREE.Mesh && child.name && child.name.toLowerCase().includes('blade')) {
          const mat = child.material
          if (mat) {
            if (Array.isArray(mat)) {
              mat.forEach(m => {
                if (m instanceof THREE.MeshStandardMaterial || m instanceof THREE.MeshPhysicalMaterial) {
                  m.toneMapped = false
                  m.emissive = new THREE.Color(...saberColor.color)
                  m.emissiveIntensity = 15
                }
              })
            } else if (mat instanceof THREE.MeshStandardMaterial || mat instanceof THREE.MeshPhysicalMaterial) {
              mat.toneMapped = false
              mat.emissive = new THREE.Color(...saberColor.color)
              mat.emissiveIntensity = 15
              bladeMatRef.current = mat as THREE.MeshStandardMaterial
              sabers.bladeMat = mat as THREE.MeshStandardMaterial
            }
          }
        }
      })
      return clone
    } catch (e) {
      console.error('[SaberModel] clone error:', e)
      setError(true)
      return null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene, modelPath])

  // Update blade emissive when color changes
  useEffect(() => {
    if (bladeMatRef.current) {
      bladeMatRef.current.emissive = new THREE.Color(...saberColor.color)
      bladeMatRef.current.emissiveIntensity = 15
    }
  }, [saberColor])

  // useFrame — handles rotation, position, scale, camera, mouse parallax
  useFrame((state, delta) => {
    const g = groupRef.current
    if (!g) return
    const p = progressRef.current

    // Rotation
    g.rotation.y += delta * rotationSpeed.speed
    g.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.03 + p * 0.08

    // Mouse-follow parallax
    if (mouseEnabled) {
      g.rotation.z += (mouseRef.current.x * 0.03 - g.rotation.z) * 0.03
    }

    // Scale and Y position from config
    g.scale.setScalar(defaultScale + p * scaleScrollFactor)
    g.position.y = defaultY + p * yScrollFactor

    // Camera orbit
    if (cameraMode.mode === 'full') {
      const orbitAngle = p * Math.PI * 2
      camera.position.x = Math.sin(orbitAngle) * 5
      camera.position.z = Math.cos(orbitAngle) * 5
      camera.position.y = 1.0 - p * 0.5
      camera.lookAt(0, 0, 0)
    } else if (cameraMode.mode === 'slow') {
      const orbitAngle = p * Math.PI
      camera.position.x = Math.sin(orbitAngle) * 4
      camera.position.z = Math.cos(orbitAngle) * 4
      camera.position.y = 0.8
      camera.lookAt(0, 0, 0)
    } else {
      camera.position.x = 0
      camera.position.z = 5
      camera.position.y = 0.5
      camera.lookAt(0, 0, 0)
    }
  })

  if (error || !sceneClone) return null

  return <primitive ref={groupRef} object={sceneClone} />
}
