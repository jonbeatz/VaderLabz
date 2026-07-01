'use client'

import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { KernelSize } from 'postprocessing'
import * as THREE from 'three'
import type { HdrPreset, BloomPreset, CameraPreset, SaberColorPreset, RotationPreset } from '../types'
import { SaberModel } from './SaberModel'

interface Scene3DProps {
  modelPath: string
  defaultScale: number
  scaleScrollFactor: number
  defaultY: number
  yScrollFactor: number
  hdrPreset: HdrPreset
  bloomPreset: BloomPreset
  cameraMode: CameraPreset
  sabers: { bladeMat: THREE.MeshStandardMaterial | null }
  onSaberColorChange: SaberColorPreset
  onRotationSpeed: RotationPreset
}

export function Scene3D(props: Scene3DProps) {
  return (
    <Canvas
      camera={{ position: [0, 0.8, 3.5], fov: 35, near: 0.1, far: 30 }}
      gl={{ antialias: true, toneMapping: 3, toneMappingExposure: 1.0 }}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'auto' }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-3, 2, -3]} intensity={0.3} color="#4466ff" />

      <Environment files={props.hdrPreset.file} background={false} />

      <SaberModel
        modelPath={props.modelPath}
        defaultScale={props.defaultScale}
        scaleScrollFactor={props.scaleScrollFactor}
        defaultY={props.defaultY}
        yScrollFactor={props.yScrollFactor}
        saberColor={props.onSaberColorChange}
        rotationSpeed={props.onRotationSpeed}
        cameraMode={props.cameraMode}
        sabers={props.sabers}
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={props.cameraMode.mode !== 'static'}
        autoRotateSpeed={props.cameraMode.mode === 'full' ? 1.5 : props.cameraMode.mode === 'slow' ? 0.4 : 0}
        enableDamping={false}
        target={[0, 0.8, 0]}
      />

      <EffectComposer>
        <>{props.bloomPreset.intensity > 0 ? (
          <Bloom
            luminanceThreshold={0.05}
            luminanceSmoothing={0.9}
            intensity={props.bloomPreset.intensity}
            mipmapBlur
            kernelSize={KernelSize.LARGE}
          />
        ) : null}</>
      </EffectComposer>
    </Canvas>
  )
}
