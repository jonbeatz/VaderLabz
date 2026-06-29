'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ============================================================================
// FloatingArtefact.tsx — Procedural sci-fi artefact (no download needed)
// ============================================================================
// A floating crystalline asset composed of an icosahedron core, orbiting rings,
// and floating fragments. No external GLTF files required.
// ============================================================================

export interface FloatingArtefactProps {
  accent?: string
  secondary?: string
}

export function FloatingArtefact({ accent = '#ff2a36', secondary = '#ff0033' }: FloatingArtefactProps) {
  const groupRef = useRef<THREE.Group>(null)
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const fragmentsRef = useRef<THREE.Group>(null)

  const mouse = useRef({ x: 0, y: 0 })

  // Build core geometry + materials once
  const core = useMemo(() => {
    const c = new THREE.Color(accent)
    const group = new THREE.Group()

    // Main crystal — icosahedron
    const coreMesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.8, 0),
      new THREE.MeshPhysicalMaterial({
        color: c,
        metalness: 0.3,
        roughness: 0.2,
        transparent: true,
        opacity: 0.6,
        wireframe: false,
        envMapIntensity: 0.5,
      }),
    )
    coreMesh.castShadow = true
    group.add(coreMesh)

    // Wireframe shell
    const wireMesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.0, 0),
      new THREE.MeshBasicMaterial({
        color: c,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      }),
    )
    group.add(wireMesh)

    // Inner glow core
    const glow = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.2, 0),
      new THREE.MeshBasicMaterial({
        color: c,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
      }),
    )
    group.add(glow)

    return group
  }, [accent])

  // Build floating small fragments
  const fragmentPositions = useMemo(() => {
    const positions: { pos: [number, number, number]; speed: number; offset: number }[] = []
    for (let i = 0; i < 20; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const radius = 3 + Math.random() * 1.5
      positions.push({
        pos: [
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi),
        ],
        speed: 0.2 + Math.random() * 0.3,
        offset: Math.random() * Math.PI * 2,
      })
    }
    return positions
  }, [])

  // Mouse listener
  useMemo(() => {
    if (typeof window === 'undefined') return
    const handler = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 0.5,
        y: (e.clientY / window.innerHeight - 0.5) * 0.5,
      }
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  useFrame((_state, delta) => {
    if (!groupRef.current) return

    // Gentle floating rotation
    groupRef.current.rotation.y += delta * 0.15
    groupRef.current.rotation.x = Math.sin(Date.now() * 0.0003) * 0.1

    // Mouse parallax
    groupRef.current.position.x += (mouse.current.x * 1.5 - groupRef.current.position.x) * 0.05
    groupRef.current.position.y += (mouse.current.y * 1.5 - groupRef.current.position.y) * 0.05

    // Rotate rings independently
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.4
      ring1Ref.current.rotation.x += delta * 0.2
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.3
      ring2Ref.current.rotation.y += delta * 0.25
    }

    // Float fragments
    if (fragmentsRef.current) {
      const time = Date.now() * 0.001
      fragmentsRef.current.children.forEach((child, i) => {
        const data = fragmentPositions[i % fragmentPositions.length]
        if (data) {
          const floatY = Math.sin(time * data.speed + data.offset) * 0.3
          child.position.y = data.pos[1] + floatY
        }
      })
      fragmentsRef.current.rotation.y += delta * 0.05
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <primitive object={core} />

      {/* Ring 1 */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.8, 0.04, 16, 64]} />
        <meshBasicMaterial color={accent} transparent opacity={0.25} />
      </mesh>

      {/* Ring 2 */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[3.2, 0.03, 16, 64]} />
        <meshBasicMaterial color={secondary} transparent opacity={0.15} />
      </mesh>

      {/* Floating fragments */}
      <group ref={fragmentsRef}>
        {fragmentPositions.map((data, i) => (
          <mesh key={i} position={data.pos}>
            <octahedronGeometry args={[0.06 + Math.random() * 0.1, 0]} />
            <meshBasicMaterial
              color={i % 3 === 0 ? accent : secondary}
              transparent
              opacity={0.4 + Math.random() * 0.3}
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}
